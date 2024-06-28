const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 3000; // ポート番号を3001に変更

// MySQLデータベースへの接続設定
const db = mysql.createConnection({
    host: 'localhost',
    user: 'user',      // あなたが設定したMySQLユーザー名に置き換えてください
    password: 'password',  // あなたが設定したMySQLパスワードに置き換えてください
    database: 'job_search_app'     // あなたが作成したデータベース名に置き換えてください
});

// MySQLデータベースへの接続
db.connect(err => {
    if (err) {
        console.error('MySQL connection error:', err);
        process.exit(1); // エラー発生時にプロセスを終了
    } else {
        console.log('MySQL connected.');
    }
});

// テーブルの作成
db.query(`
    CREATE TABLE IF NOT EXISTS jobs_v2 (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        area VARCHAR(255),
        station VARCHAR(255),
        job_type VARCHAR(255),
        is_single BOOLEAN
    )
`, (err, result) => {
    if (err) {
        console.error('Table creation error:', err);
    } else {
        console.log('Table created or already exists.');
    }
});

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
    const keyword = req.query.keyword; // クエリパラメータからキーワードを取得
    const area = req.query.area; // クエリパラメータからエリアを取得
    const station = req.query.station; // クエリパラメータから駅名を取得
    const jobType = req.query.jobType; // クエリパラメータから職種を取得
    const jobDuration = req.query.jobDuration; // クエリパラメータからジョブの期間を取得
    const keywords = keyword.split(/[\s　]+/); // 正規表現を使って半角スペースと全角スペースで分割
    
    let query = "SELECT * FROM jobs_v2 WHERE (";
    let queryParams = [];
    
    keywords.forEach((word, index) => {
        if (index > 0) {
            query += " OR ";
        }
        query += "title LIKE ? OR description LIKE ? OR area LIKE ? OR station LIKE ? OR job_type LIKE ?";
        const param = `%${word}%`;
        queryParams.push(param, param, param, param, param);
    });
    query += ")";

    if (area) {
        query += " AND area = ?";
        queryParams.push(area);
    }
    if (station) {
        query += " AND station = ?";
        queryParams.push(station);
    }
    if (jobType) {
        query += " AND job_type = ?";
        queryParams.push(jobType);
    }
    if (jobDuration === 'single') {
        query += " AND is_single = 1";
    } else if (jobDuration === 'long') {
        query += " AND is_single = 0";
    }

    db.query(query, queryParams, (err, results) => {
        if (err) {
            res.status(500).send(err.message); // エラーがあれば500ステータスコードとエラーメッセージを送信
        } else {
            res.json(results); // 検索結果をJSON形式でクライアントに送信
        }
    });
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
        process.exit(1); // エラー発生時にプロセスを終了
    } else {
        console.log(`Server running at http://localhost:${port}`);
    }
});
