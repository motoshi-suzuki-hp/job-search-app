const areaStationMap_ja = {
    "東京": ["渋谷", "新宿", "品川", "六本木", "上野"],
    "大阪": ["梅田", "難波", "心斎橋","天王寺", "鶴橋"],
    // 他のエリアと駅名を追加
};

const areaStationMap_en = {
    "Tokyo": ["Shibuya", "Shinjuku", "Shinagawa", "Roppongi", "Ueno"],
    "Osaka": ["Umeda", "Namba", "Shinsaibashi", "Tennoji", "Tsuruhashi"],
    // 他のエリアと駅名を追加
};

const jobTypeList_ja = ['飲食', '小売', '事務', 'IT', '美容', '営業', '教育', 'サービス', '軽作業'];
const jobTypeList_en = ['Food', 'Retail', 'Office', 'IT', 'Beauty', 'Sales', 'Education', 'Hospitality', 'Light work'];



function updateAreaJobOptions() {
    // const toggleSwitch = document.getElementById('language-toggle');
    
    const language = document.querySelector('input[name="language"]:checked').value;
    const areaSelect = document.getElementById('area-select');

    const stationSelect = document.getElementById('station-select');
    const jobTypeSelect = document.getElementById('job-type-select');

    if (language === 'ja') {
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
    // const toggleSwitch = document.getElementById('language-toggle');
    
    const language = document.querySelector('input[name="language"]:checked').value;

    
    const areaSelect = document.getElementById('area-select');
    const stationSelect = document.getElementById('station-select');
    const selectedArea = areaSelect.value;

    if (language === 'ja') {
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
// document.getElementById('switch-checkbox').addEventListener('click',updateAreaJobOptions, true);


var searchJobsFlag = false;
document.querySelectorAll('input[name="language"]').forEach(radio => {
    radio.addEventListener('change', () => {
        updateAreaJobOptions();
        if (searchJobsFlag) searchJobs();
    });
});


document.getElementById('area-select').addEventListener('change', updateStationOptions);

function searchJobs() {
    searchJobsFlag = true;
    const keyword = document.getElementById('search-input').value;
    const area = document.getElementById('area-select').value;
    const station = document.getElementById('station-select').value;
    const jobType = document.getElementById('job-type-select').value;
    const jobDuration = document.querySelector('input[name="job-duration"]:checked').value;
    // const language = document.getElementById('language-toggle').checked ? 'ja' : 'en';
    const language = document.querySelector('input[name="language"]:checked').value;

    fetch(`/api/jobs?keyword=${keyword}&area=${area}&station=${station}&jobType=${jobType}&jobDuration=${jobDuration}&language=${language}`)
        .then(response => response.json())
        .then(data => displayJobs(data));
}


function displayJobs(jobs) {
    // const toggleSwitch = document.getElementById('language-toggle');
    // const language = toggleSwitch.checked ? 'ja' : 'en';

    const language = document.querySelector('input[name="language"]:checked').value;

    const jobCount = document.getElementById('job-count');
    jobCount.firstElementChild.innerText = language === 'ja' ? jobs.length + '件の求人が見つかりました' : jobs.length + ' jobs found';

    const jobList = document.getElementById('job-list'); // 結果を表示するための要素を取得
    jobList.innerHTML = '';
    jobs.forEach(job => {
        const jobItem = document.createElement('div');
        jobItem.className = 'job-item';
        
        jobItem.innerHTML = `
            <a href="/job?id=${job.id}&language=${language}">
                <div class="job-item-inner">
                    <div class="job-item-text">
                        <h2>${job.title}</h2>
                        <p>${job.summary}</p>
                        <p><strong>${language === 'ja' ? 'エリア' : 'Area'}:</strong> ${job.area}</p>
                        <p><strong>${language === 'ja' ? '駅' : 'Station'}:</strong> ${job.station}</p>
                        <p><strong>${language === 'ja' ? '職種' : 'Job Type'}:</strong> ${job.job_type}</p>
                        <p><strong>${language === 'ja' ? 'バイトの種類' : 'Job Type'}:</strong> ${job.is_single ? (language === 'ja' ? '単発バイト' : 'Single Job') : (language === 'ja' ? '長期バイト' : 'Long Job')}</p>
                    </div>
                    <div class="job-item-image">
                        <img src="${job.image_urls[0]}" alt="${job.title}" class="job-image">
                    </div>
                </div>
            </a>
        `;
        
        jobList.appendChild(jobItem);
    });
}
