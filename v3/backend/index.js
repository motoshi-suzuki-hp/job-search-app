const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000; 

// ミドルウェアの設定
app.use(express.json());

// 静的ファイルの提供
app.use(express.static(path.join(__dirname, '../frontend')));



// ルートハンドラの追加
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// フリーワード検索のエンドポイント
app.get('/api/jobs', (req, res) => {
    const keyword = req.query.keyword;
    const area = req.query.area;
    const station = req.query.station;
    const jobType = req.query.jobType;
    const jobDuration = req.query.jobDuration;
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
                    job.station.includes(word) ||
                    job.job_type.includes(word)
                )
            );
        }

        if (area) {
            jobs = jobs.filter(job => job.area === area);
        }
        if (station) {
            jobs = jobs.filter(job => job.station === station);
        }
        if (jobType) {
            jobs = jobs.filter(job => job.job_type === jobType);
        }
        if (jobDuration === 'single') {
            jobs = jobs.filter(job => job.is_single);
        } else if (jobDuration === 'long') {
            jobs = jobs.filter(job => !job.is_single);
        }

        res.json(jobs);
    });
});

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
