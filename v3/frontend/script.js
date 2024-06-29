
const areaStationMap = {
    "東京": ["渋谷", "新宿"],
    "大阪": ["梅田"],
    // 他のエリアと駅名を追加
};

function updateStationOptions() {
    const areaSelect = document.getElementById('area-select');
    const stationSelect = document.getElementById('station-select');
    const selectedArea = areaSelect.value;

    // 駅名のオプションをクリア
    stationSelect.innerHTML = '<option value="">すべて</option>';

    if (selectedArea && areaStationMap[selectedArea]) {
        areaStationMap[selectedArea].forEach(station => {
            const option = document.createElement('option');
            option.value = station;
            option.text = station;
            stationSelect.appendChild(option);
        });
    }
}

document.getElementById('area-select').addEventListener('change', updateStationOptions);

function searchJobs() {
    const keyword = document.getElementById('search-input').value; // ユーザーが入力したキーワードを取得
    const area = document.getElementById('area-select').value; // 選択されたエリアを取得
    const station = document.getElementById('station-select').value; // 選択された駅名を取得
    const jobType = document.getElementById('job-type-select').value; // 選択された職種を取得
    const jobDuration = document.querySelector('input[name="job-duration"]:checked').value; // 選択されたラジオボタンの値を取得

    fetch(`/api/jobs?keyword=${keyword}&area=${area}&station=${station}&jobType=${jobType}&jobDuration=${jobDuration}`) // バックエンドのエンドポイントにリクエストを送信
        .then(response => response.json()) // レスポンスをJSON形式でパース
        .then(data => displayJobs(data)); // 取得したデータを表示する関数を呼び出す
}

function displayJobs(jobs) {
    const jobList = document.getElementById('job-list'); // 結果を表示するための要素を取得
    const toggleSwitch = document.getElementById('language-toggle');
    jobList.innerHTML = ''; // 前回の結果をクリア
    jobs.forEach(job => {
        const jobItem = document.createElement('div'); // 各ジョブの情報を表示するためのdiv要素を作成
        jobItem.className = 'job-item';
        if (toggleSwitch.checked) {
            jobItem.innerHTML = `
            <h2>${job.title}</h2>
            <p>${job.description}</p>
            <p><strong>エリア:</strong> ${job.area}</p>
            <p><strong>駅:</strong> ${job.station}</p>
            <p><strong>職種:</strong> ${job.job_type}</p>
            <p><strong>バイトの種類:</strong> ${job.is_single ? '単発バイト' : '長期バイト'}</p>
            <a href="/job/${job.id}">詳細を見る</a>
        `;
        } else {
            jobItem.innerHTML = `
                <h2>${job.title}</h2>
                <p>${job.description}</p>
                <p><strong>area:</strong> ${job.area}</p>
                <p><strong>station:</strong> ${job.station}</p>
                <p><strong>jobtype:</strong> ${job.job_type}</p>
                <p><strong>issingle:</strong> ${job.is_single ? '単発バイト' : '長期バイト'}</p>
                <a href="/job/${job.id}">description</a>
            `;
        }
        jobList.appendChild(jobItem); // jobList要素に追加
    });
}
