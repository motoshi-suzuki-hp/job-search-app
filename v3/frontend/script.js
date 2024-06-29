const areaStationMap_ja = {
    "東京": ["渋谷", "新宿"],
    "大阪": ["梅田"],
    // 他のエリアと駅名を追加
};

const areaStationMap_en = {
    "Tokyo": ["Shibuya", "Shinjuku"],
    "Osaka": ["Umeda"],
    // 他のエリアと駅名を追加
};

const jobTypeList_ja = ['飲食', '小売', '事務', 'IT'];
const jobTypeList_en = ['Food', 'Retail', 'Office', 'IT'];



function updateAreaJobOptions() {
    const toggleSwitch = document.getElementById('language-toggle');
    const areaSelect = document.getElementById('area-select');

    const stationSelect = document.getElementById('station-select');
    const jobTypeSelect = document.getElementById('job-type-select');

    if (toggleSwitch.checked) {
        // 駅名のオプションをクリア
        areaSelect.innerHTML = '<option value="">すべて</option>';
        Object.keys(areaStationMap_ja).forEach(area => {
            const option = document.createElement('option');
            option.value = area;
            option.text = area;
            areaSelect.appendChild(option);
        });
        stationSelect.innerHTML = '<option value="">すべて</option>';

        jobTypeSelect.innerHTML = '<option value="">すべて</option>';
        jobTypeList_ja.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.text = type;
            jobTypeSelect.appendChild(option);
        })
    } else {
        // 駅名のオプションをクリア
        areaSelect.innerHTML = '<option value="">All</option>';
        Object.keys(areaStationMap_en).forEach(area => {
            const option = document.createElement('option');
            option.value = area;
            option.text = area;
            areaSelect.appendChild(option);
        });

        stationSelect.innerHTML = '<option value="">All</option>';

        jobTypeSelect.innerHTML = '<option value="">All</option>';
        jobTypeList_en.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.text = type;
            jobTypeSelect.appendChild(option);
        })
    }

}

function updateStationOptions() {
    const toggleSwitch = document.getElementById('language-toggle');
    
    const areaSelect = document.getElementById('area-select');
    const stationSelect = document.getElementById('station-select');
    const selectedArea = areaSelect.value;

    if (toggleSwitch.checked) {
        // 駅名のオプションをクリア
        stationSelect.innerHTML = '<option value="">すべて</option>';

        if (selectedArea && areaStationMap_ja[selectedArea]) {
            areaStationMap_ja[selectedArea].forEach(station => {
                const option = document.createElement('option');
                option.value = station;
                option.text = station;
                stationSelect.appendChild(option);
            });
        }
    } else {
        // 駅名のオプションをクリア
        stationSelect.innerHTML = '<option value="">All</option>';

        if (selectedArea && areaStationMap_en[selectedArea]) {
            areaStationMap_en[selectedArea].forEach(station => {
                const option = document.createElement('option');
                option.value = station;
                option.text = station;
                stationSelect.appendChild(option);
            });
        }
    }
}


document.addEventListener("DOMContentLoaded", updateAreaJobOptions);
document.getElementById('language-toggle').addEventListener('click',updateAreaJobOptions, true);
document.getElementById('area-select').addEventListener('change', updateStationOptions);

function searchJobs() {
    const keyword = document.getElementById('search-input').value;
    const area = document.getElementById('area-select').value;
    const station = document.getElementById('station-select').value;
    const jobType = document.getElementById('job-type-select').value;
    const jobDuration = document.querySelector('input[name="job-duration"]:checked').value;
    const language = document.getElementById('language-toggle').checked ? 'ja' : 'en';

    fetch(`/api/jobs?keyword=${keyword}&area=${area}&station=${station}&jobType=${jobType}&jobDuration=${jobDuration}&language=${language}`)
        .then(response => response.json())
        .then(data => displayJobs(data));
}


function displayJobs(jobs) {
    const toggleSwitch = document.getElementById('language-toggle');

    const jobCount = document.getElementById('job-count');
    jobCount.firstElementChild.innerText = toggleSwitch.checked ? jobs.length + '件の求人が見つかりました' : jobs.length + ' jobs found';

    const jobList = document.getElementById('job-list'); // 結果を表示するための要素を取得
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
                <p><strong>issingle:</strong> ${job.is_single ? 'single' : 'long'}</p>
                <a href="/job/${job.id}">description</a>
            `;
        }
        jobList.appendChild(jobItem); // jobList要素に追加
    });
}
