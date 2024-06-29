const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// 静的ファイルの提供
app.use(express.static(path.join(__dirname, '../frontend')));

// ミドルウェアの設定
app.use(express.json());

// ルートハンドラの追加
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// JSONファイルからジョブデータを読み込む
app.get('/api/jobs', (req, res) => {
    fs.readFile('jobs.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            res.status(500).send('Failed to read job data.');
            return;
        }
        
        try {
            const jobs = JSON.parse(data);
            const filteredJobs = filterJobs(jobs, req.query); // リクエストに応じてフィルタリングする関数を呼び出し
            
            res.json(filteredJobs);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).send('Failed to parse job data.');
        }
    });
});

// 関数：リクエストに基づいてジョブをフィルタリングする
function filterJobs(jobs, filters) {
    // リクエストパラメータに基づいてフィルタリングロジックを追加する
    // 例えば、filters.keyword を含むジョブをフィルタリングするなど
    // 現在の実装はデモ用ですので、実際のフィルタリングロジックに置き換えてください
    let filteredJobs = jobs;

    // キーワードによるフィルタリング例
    if (filters.keyword) {
        filteredJobs = filteredJobs.filter(job =>
            job.title.includes(filters.keyword) ||
            job.description.includes(filters.keyword) ||
            job.area.includes(filters.keyword) ||
            job.station.includes(filters.keyword) ||
            job.job_type.includes(filters.keyword)
        );
    }

    // 他のフィルタリング条件を追加する場合はここに追加してください

    return filteredJobs;
}

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
