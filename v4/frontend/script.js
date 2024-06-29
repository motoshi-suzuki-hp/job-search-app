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
const jobTypeList_en = ['Food Service', 'Retail', 'Office', 'IT'];



function updateAreaJobOptions() {
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
// document.getElementById('language-toggle').addEventListener('click',updateAreaJobOptions, true);
document.querySelectorAll('input[name="language"]').forEach(radio => {
    radio.addEventListener('change', () => {
        updateAreaJobOptions();
    });
});

document.getElementById('area-select').addEventListener('change', updateStationOptions);
let currentPage = 1;


document.getElementById('area-select').addEventListener('change', updateStationOptions);

function searchJobs(page = 1) {
    const keyword = document.getElementById('search-input').value;
    const area = document.getElementById('area-select').value;
    const station = document.getElementById('station-select').value;
    const jobType = document.getElementById('job-type-select').value;
    const jobDuration = document.querySelector('input[name="job-duration"]:checked').value;
    const toggleSwitch = document.getElementById('language-toggle');
    // const language = toggleSwitch.checked ? 'ja' : 'en';

    const language = document.querySelector('input[name="language"]:checked').value;

    fetch(`/api/jobs?keyword=${keyword}&area=${area}&station=${station}&jobType=${jobType}&jobDuration=${jobDuration}&page=${page}&language=${language}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayJobs(data.jobs);
            updatePagination(data.totalPages, data.currentPage);
        });
}

function displayJobs(jobs) {
    const jobList = document.getElementById('job-list');
    // const toggleSwitch = document.getElementById('language-toggle');
    // const language = toggleSwitch.checked ? 'ja' : 'en';
    const language = document.querySelector('input[name="language"]:checked').value;

    const jobCount = document.getElementById('job-count');
    jobCount.firstElementChild.innerText = language === 'ja' ? jobs.length + '件の求人が見つかりました' : jobs.length + ' jobs found';

    
    jobList.innerHTML = '';
    jobs.forEach(job => {
        const jobItem = document.createElement('div');
        jobItem.className = 'job-item';
        
        jobItem.innerHTML = `
            <img src="${job.image_url}" alt="${job.title}" class="job-image">
            <h2>${job.title}</h2>
            <p>${job.description}</p>
            <p><strong>${language === 'ja' ? 'エリア' : 'Area'}:</strong> ${job.area}</p>
            <p><strong>${language === 'ja' ? '駅' : 'Station'}:</strong> ${job.station}</p>
            <p><strong>${language === 'ja' ? '職種' : 'Job Type'}:</strong> ${job.job_type}</p>
            <p><strong>${language === 'ja' ? 'バイトの種類' : 'Job Type'}:</strong> ${job.is_single ? (language === 'ja' ? '単発バイト' : 'Single Job') : (language === 'ja' ? '長期バイト' : 'Long Job')}</p>
            <a href="job_details.html?id=${job.id}&language=${language}">${language === 'ja' ? '詳細を見る' : 'View Details'}</a>
        `;
        
        jobList.appendChild(jobItem);
    });
}

function updatePagination(totalPages, currentPage) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('button');
        pageItem.textContent = i;
        pageItem.disabled = i === currentPage;
        pageItem.addEventListener('click', () => searchJobs(i));
        pagination.appendChild(pageItem);
    }
}

document.getElementById('search-button').addEventListener('click', () => {
    currentPage = 1;
    searchJobs(currentPage);
});

// document.addEventListener('DOMContentLoaded', () => {
//     searchJobs(currentPage);
// });
