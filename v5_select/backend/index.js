const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const favicon = require('serve-favicon');
const app = express();
const port = 3000;




// アップロードディレクトリのパス
const imageUploadDir = path.join(__dirname, 'uploads', 'images');
const documentUploadDir = path.join(__dirname, 'uploads', 'documents');

// ディレクトリを確認・作成
[imageUploadDir, documentUploadDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// ファイルの保存先を決定するストレージ設定
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, imageUploadDir);
        } else if (file.mimetype === 'application/pdf') {
            cb(null, documentUploadDir);
        } else {
            cb(new Error('Unsupported file type'), null);
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // オリジナルファイル名の拡張子を保つ
    }
});

const upload = multer({ storage: storage });




// ミドルウェアの設定
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// ファビコンのパスを指定
app.use(favicon(path.join(__dirname, '../frontend/favicon/favicon.ico')));

// 静的ファイルの提供
// app.use(express.static(path.join(__dirname, '../frontend')));

// ルートハンドラの追加
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// フリーワード検索のエンドポイント
app.get('/api/jobs', (req, res) => {
    const keyword = req.query.keyword;
    const area = req.query.area;
    const city = req.query.city;
    const line = req.query.line;
    const station = req.query.station;
    const jobType = req.query.jobType;
    const jobDuration = req.query.jobDuration;
    const date = req.query.date;
    const language = req.query.language || 'en';
    
    const filePath = language === 'en' ? './data/jobs_en.json' : './data/jobs_ja.json';
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }

        let jobs = JSON.parse(data);

        if (keyword) {
            const keywords = keyword.split(/[ 　]+/);
            jobs = jobs.filter(job =>
                keywords.some(word =>
                    job.title.includes(word) ||
                    job.description.includes(word) ||
                    job.area.includes(word) ||
                    job.city.includes(word) ||
                    job.line.includes(word) ||
                    job.station.includes(word) ||
                    job.job_type.includes(word)
                )
            );
        }

        console.log(jobs);

        if (area) {
            jobs = jobs.filter(job => job.area === area);
        }
        if (city) {
            jobs = jobs.filter(job => job.city === city);
        }
        if (line) {
            jobs = jobs.filter(job => job.line.includes(line));
        }
        if (station) {
            jobs = jobs.filter(job => job.station === station);
        }
        if (jobType) {
            jobs = jobs.filter(job => job.job_type === jobType);
        }
        if (date) {
            jobs = jobs.filter(job => job.date === date);
        }
        if (jobDuration === 'single') {
            jobs = jobs.filter(job => job.is_single);
        } else if (jobDuration === 'long') {
            jobs = jobs.filter(job => !job.is_single);
        }

        res.json(jobs);
    });
});

// 詳細ページのhandler
app.get('/job', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'job-details.html'));
});

// 詳細データ取得のAPIエンドポイント
app.get('/api/job/:id', (req, res) => {
    const jobId = parseInt(req.params.id, 10);
    const language = req.query.language || 'ja';
    const filePath = path.join(__dirname, 'data', `jobs_${language}.json`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Failed to read job data.');
            return;
        }
        const jobs = JSON.parse(data);
        const job = jobs.find(j => j.id === jobId);

        if (!job) {
            res.status(404).send('Job not found.');
            return;
        }
        res.json(job);
    });
});



// お気に入り機能の設定
const filePath_users = path.join(__dirname, 'data', 'userData.json');

// ユーザーデータ用のJSONファイルが存在しない場合は作成
if (!fs.existsSync(filePath_users)) {
    fs.writeFileSync(filePath_users, JSON.stringify({ users: [] }, null, 4));
}

// ユーザーデータの読み込み
function loadUserData(filePath, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return callback(err);
        }
        try {
            const jsonData = JSON.parse(data);
            callback(null, jsonData);
        } catch (err) {
            callback(err);
        }
    });
}

// ユーザーデータの保存
function saveUserData(filePath, data, callback) {
    const jsonData = JSON.stringify(data, null, 4);
    fs.writeFile(filePath, jsonData, 'utf8', callback);
}

// お気に入りに追加する関数
function addToFavorites(jobId, filePath, callback) {
    loadUserData(filePath, (err, data) => {
        if (err) {
            return callback(err);
        }

        data[0].favoriteJobs.push(jobId);

        saveUserData(filePath, data, callback);
    });
}

// APIエンドポイント
app.post('/add_to_favorites', (req, res) => {

    const job_id = req.body.job_id;
    // console.log(filePath_users);
    addToFavorites(job_id, filePath_users, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'エラーが発生しました' });
        }
        res.json({ success: true });
    });
});



// お気に入りから削除する関数
function removeFromFavorites(jobId, filePath, callback) {
    loadUserData(filePath, (err, data) => {
        if (err) {
            return callback(err);
        }

        data[0].favoriteJobs = data[0].favoriteJobs.filter(n => n !== jobId);

        // console.log(`after: array = ${newArray}`);

        saveUserData(filePath, data, callback);
    });
}

// APIエンドポイント
app.post('/remove_from_favorites', (req, res) => {

    const job_id = req.body.job_id;
    // console.log(filePath_users);
    removeFromFavorites(job_id, filePath_users, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'エラーが発生しました' });
        }
        res.json({ success: true });
    });
});


// userData取得のAPIエンドポイント
app.get('/api/userData', (req, res) => {

    fs.readFile(filePath_users, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Failed to read job data.');
            return;
        }
        const userData = JSON.parse(data);

        if (!userData) {
            res.status(404).send('Job not found.');
            return;
        }
        res.json(userData);
    });
});



// お気に入りに追加する関数
function applyJob(jobId, filePath, callback) {
    loadUserData(filePath, (err, data) => {
        if (err) {
            return callback(err);
        }

        data[0].appliedJobs.push(jobId);

        saveUserData(filePath, data, callback);
    });
}


// APIエンドポイント
app.post('/apply_job', (req, res) => {

    const job_id = req.body.job_id;
    // console.log(filePath_users);
    applyJob(job_id, filePath_users, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'エラーが発生しました' });
        }
        res.json({ success: true });
    });
});




// myページのhandler
app.get('/mypage', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'mypage.html'));
});


// myページ更新のhandler
app.get('/mypage-update', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'mypage-update.html'));
});



// function updateUserData(userData, filePath, callback) {
    
//     loadUserData(filePath, (err, data) => {
//         if (err) {
//             return callback(err);
//         }

//         // console.log(data);
//         // console.log(userData);
//         data[0].name = userData.name;
//         data[0].email = userData.email;
//         data[0].bio = userData.bio;
//         data[0].japaneseLevel = userData.japaneseLevel;
//         data[0].englishLevel = userData.englishLevel;


//         saveUserData(filePath, data, callback);
//     });
// }

function updateUserData(userData, filePath, callback) {
    loadUserData(filePath, (err, data) => {
        if (err) {
            return callback(err);
        }

        console.log(data);
        console.log(userData);
        data[0].name = userData.name;
        data[0].email = userData.email;
        data[0].bio = userData.bio;
        data[0].japaneseLevel = userData.japaneseLevel;
        data[0].englishLevel = userData.englishLevel;

        // プロフィール写真のパスを更新
        if (userData.profilePicture) {
            data[0].profilePicture = userData.profilePicture;
        }

        // 履歴書のパスを更新
        if (userData.resume) {
            data[0].resume = userData.resume;
        }

        saveUserData(filePath, data, callback);
    });
}


// // update用APIエンドポイント
// app.post('/mypage-update', (req, res) => {
//     const userData = req.body;
//     // console.log(req);
//     updateUserData(userData, filePath_users, (err) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).json({ success: false, message: 'エラーが発生しました' });
//         }
//         res.json({ success: true });
//     });
// });

app.use(express.urlencoded({ extended: true }));

// uploadsディレクトリを静的ファイルとして提供
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// mypage-updateエンドポイント
app.post('/mypage-update', upload.fields([{ name: 'profilePicture' }, { name: 'resume' }]), (req, res) => {
    const userData = req.body;
    const profilePicture = req.files['profilePicture'] ? req.files['profilePicture'][0] : null;
    const resume = req.files['resume'] ? req.files['resume'][0] : null;

    // プロフィール写真のファイルパスをユーザーデータに追加
    if (profilePicture) {
        userData.profilePicture = `/uploads/images/${profilePicture.filename}`;
    }

    // 履歴書のファイルパスをユーザーデータに追加
    if (resume) {
        userData.resume = `/uploads/documents/${resume.filename}`;
    }

    updateUserData(userData, filePath_users, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'エラーが発生しました' });
        }
        res.json({
            success: true,
            profilePicturePath: profilePicture ? `/uploads/images/${profilePicture.filename}` : null,
            resumePath: resume ? `/uploads/documents/${resume.filename}` : null
        });
    });
});








// Custom 404 page
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../frontend', '404.html'));
});

// エラーハンドリングミドルウェア
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).send('Something went wrong!');
});


// サーバーの起動
app.listen(port, (err) => {
    if (err) {
        console.error('Server start error:', err);
        process.exit(1);
    } else {
        console.log(`Server running at http://localhost:${port}`);
    }
});
