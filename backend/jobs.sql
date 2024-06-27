-- jobs.sql

USE job_search_app; -- データベース名に合わせて変更してください

-- テーブルが存在しない場合は作成します
CREATE TABLE IF NOT EXISTS jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    area VARCHAR(255),
    station VARCHAR(255),
    job_type VARCHAR(255),
    is_single BOOLEAN
);

-- データの挿入
INSERT INTO jobs (title, description, area, station, job_type, is_single) VALUES
('カフェスタッフ', 'カフェでの接客と清掃業務', '東京', '渋谷', '飲食', 1),
('販売スタッフ', 'アパレルショップでの接客とレジ業務', '大阪', '梅田', '小売', 0),
('事務アシスタント', 'オフィスでの書類整理と電話対応', '名古屋', '栄', '事務', 1),
('配達ドライバー', '地元エリアでの食品配達', '福岡', '天神', '配送', 0),
('イベントスタッフ', 'イベント会場での設営と案内', '札幌', '大通', 'イベント', 1),
('看護師', '病院での看護業務', '東京', '新宿', '医療', 0),
('ソフトウェアエンジニア', 'Webアプリケーションの開発とテスト', '京都', '四条', 'IT', 1);

