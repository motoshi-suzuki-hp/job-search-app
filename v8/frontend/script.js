

const areaCityMap_ja = {
    "東京": ["渋谷区", "新宿区"],
    "大阪": ["北区"],
    // 他のエリアと駅名を追加
};

const areaCityMap_en = {
    "Tokyo": ["Shibuya Ward", "Shinjuku Ward"],
    "Osaka": ["Kita Ward"],
    // 他のエリアと駅名を追加
};

const lineStationMap_ja = {
    "丸の内線": ["新宿駅"],
    "銀座線": ["渋谷駅"],
    "副都心線": ["渋谷駅"],
    "山手線": ["新宿駅"],
    "御堂筋線": ["梅田駅"],
    "阪急線": ["梅田駅"],
    // 他のエリアと駅名を追加
};

const lineStationMap_en = {
    "Marunouchi Line": ["Shinjuku Station"],
    "Ginza Line": ["Shibuya Station"],
    "Fukutoshin Line": ["Shibuya Station"],
    "Yamanote Line": ["Shinjuku Station"],
    "Midosuji Line": ["Umeda Station"],
    "Hankyu Line": ["Umeda Station"],
    // 他のエリアと駅名を追加
};

const jobTypeList_ja = ['飲食', '小売', '事務'];
const jobTypeList_en = ['Food', 'Retail', 'Office'];


// 言語切替
function updateAreaLineJobOptions() {
    
    const language = sessionStorage.getItem('language') || 'en';
    const areaSelect = document.getElementById('area-select');
    const citySelect = document.getElementById('city-select');
    const lineSelect = document.getElementById('line-select');

    const stationSelect = document.getElementById('station-select');
    const jobTypeSelect = document.getElementById('job-type-select');

    if (language === 'ja') {
        areaSelect.innerHTML = '<option value="">すべて</option>';
        Object.keys(areaCityMap_ja).forEach(area => {
            const option = document.createElement('option');
            option.value = area;
            option.text = area;
            areaSelect.appendChild(option);
        });
        citySelect.innerHTML = '<option value="">すべて</option>';

        lineSelect.innerHTML = '<option value="">すべて</option>';
        Object.keys(lineStationMap_ja).forEach(line => {
            const option = document.createElement('option');
            option.value = line;
            option.text = line;
            lineSelect.appendChild(option);
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
        areaSelect.innerHTML = '<option value="">All</option>';
        Object.keys(areaCityMap_en).forEach(area => {
            const option = document.createElement('option');
            option.value = area;
            option.text = area;
            areaSelect.appendChild(option);
        });

        citySelect.innerHTML = '<option value="">All</option>';

        lineSelect.innerHTML = '<option value="">All</option>';
        Object.keys(lineStationMap_en).forEach(line => {
            const option = document.createElement('option');
            option.value = line;
            option.text = line;
            lineSelect.appendChild(option);
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

// エリアが変更されたときに市区のオプションを更新
function updateCityOptions() {
    const language = sessionStorage.getItem('language');

    const areaSelect = document.getElementById('area-select');
    const citySelect = document.getElementById('city-select');
    const selectedArea = areaSelect.value;

    if (language === 'ja') {
        // 市区のオプションをクリア
        citySelect.innerHTML = '<option value="">すべて</option>';

        if (selectedArea && areaCityMap_ja[selectedArea]) {
            areaCityMap_ja[selectedArea].forEach(area => {
                const option = document.createElement('option');
                option.value = area;
                option.text = area;
                citySelect.appendChild(option);
            });
        }
    } else {
        // 市区のオプションをクリア
        citySelect.innerHTML = '<option value="">All</option>';

        if (selectedArea && areaCityMap_en[selectedArea]) {
            areaCityMap_en[selectedArea].forEach(area => {
                const option = document.createElement('option');
                option.value = area;
                option.text = area;
                citySelect.appendChild(option);
            });
        }
    }
}



// 路線が変更されたときに駅名のオプションを更新
function updateStationOptions() {
    const language = sessionStorage.getItem('language');

    const lineSelect = document.getElementById('line-select');
    const stationSelect = document.getElementById('station-select');
    const selectedLine = lineSelect.value;

    if (language === 'ja') {
        // 駅名のオプションをクリア
        stationSelect.innerHTML = '<option value="">すべて</option>';

        if (selectedLine && lineStationMap_ja[selectedLine]) {
            lineStationMap_ja[selectedLine].forEach(station => {
                const option = document.createElement('option');
                option.value = station;
                option.text = station;
                stationSelect.appendChild(option);
            });
        }
    } else {
        // 駅名のオプションをクリア
        stationSelect.innerHTML = '<option value="">All</option>';

        if (selectedLine && lineStationMap_en[selectedLine]) {
            lineStationMap_en[selectedLine].forEach(station => {
                const option = document.createElement('option');
                option.value = station;
                option.text = station;
                stationSelect.appendChild(option);
            });
        }
    }
}



document.addEventListener("DOMContentLoaded", () => {
    updateAreaLineJobOptions();
    // sessionStorage.setItem('language', 'en');
    language = sessionStorage.getItem('language');
    if (language === 'ja') {
        document.getElementById("switch-checkbox-ja").checked = true;
        document.getElementById("switch-checkbox-en").checked = false;
    } else if (language === 'en') {
        document.getElementById("switch-checkbox-ja").checked = false;
        document.getElementById("switch-checkbox-en").checked = true;
    }




    fetch(`/api/ads`)
        .then(response => response.json())
        .then(data => {
            // const rand_left = Math.floor(Math.random() * data.length);
            const rand_left = 0;

            const ad_left = document.getElementById('ad_left');
            const adItem_left = document.createElement('div');

            var ad = data[rand_left];
            adItem_left.className = 'ad-inner';
            adItem_left.innerHTML = `
                <a href="${ad.url}" target="_blank">
                    <img src="${ad.image}" alt="${ad.title}" class="ad-image">
                </a>
            `;
            ad_left.appendChild(adItem_left);

            // const rand_right = Math.floor(Math.random() * data.length);
            const rand_right = 0;

            const ad_right = document.getElementById('ad_right');
            const adItem_right = document.createElement('div');

            var ad = data[rand_right];
            adItem_right.className = 'ad-inner';
            adItem_right.innerHTML = `
                <a href="${ad.url}" target="_blank">
                    <img src="${ad.image}" alt="${ad.title}" class="ad-image">
                </a>
            `;
            ad_right.appendChild(adItem_right);


        });
});

const select = document.getElementById('switch-checkbox');
select.addEventListener('change', (e) => {
    const language = e.target.value;
    sessionStorage.setItem('language', language);

    if (language === 'ja') {
        document.getElementById("switch-checkbox-ja").checked = true;
        document.getElementById("switch-checkbox-en").checked = false;
    } else if (language === 'en') {
        document.getElementById("switch-checkbox-ja").checked = false;
        document.getElementById("switch-checkbox-en").checked = true;
    }

    updateAreaLineJobOptions();
    // if (searchJobsFlag) searchJobs();
    const jobCount = document.getElementById('job-count');
    jobCount.firstElementChild.innerText = '';
    const jobList = document.getElementById('job-list'); // 結果を表示するための要素を取得
    jobList.innerHTML = '';


    if (language === 'ja') {
        document.getElementById("switch-checkbox-ja").checked = true;
    } else if (language === 'en') {
        document.getElementById("switch-checkbox-en").checked = true;
    }
});


document.getElementById('area-select').addEventListener('change', updateCityOptions);
document.getElementById('line-select').addEventListener('change', updateStationOptions);


function searchJobs() {
    // searchJobsFlag = true;
    const keyword = document.getElementById('search-input').value;
    const area = document.getElementById('area-select').value;
    const city = document.getElementById('city-select').value;
    const line = document.getElementById('line-select').value;
    const station = document.getElementById('station-select').value;
    const jobType = document.getElementById('job-type-select').value;
    const jobDuration = document.querySelector('input[name="job-duration"]:checked').value;
    const language = sessionStorage.getItem('language') || 'en';
    const date = document.getElementById('job-date').value;

    const minWage = document.getElementById('min-wage').value;
    const maxWage = document.getElementById('max-wage').value;



    const languageLevel = document.querySelector('input[name="language-level"]:checked').value;


    // console.log(minWage);

    // console.log(line);

    document.getElementById('job-count').scrollIntoView({  
        behavior: 'smooth'
    });

    fetch(`/api/jobs?keyword=${keyword}&area=${area}&city=${city}&line=${line}&station=${station}&jobType=${jobType}&date=${date}&jobDuration=${jobDuration}&language=${language}&minWage=${minWage}&maxWage=${maxWage}&languageLevel=${languageLevel}`)
        .then(response => response.json())
        .then(data => displayJobs(data));
}

function languageLevelNumberToString(levelNumber) {
    let levelString = '';
    console.log('levelNumber: ' + levelNumber);
    if (levelNumber === 1) levelString = 'Beginner';
    else if (levelNumber === 2) levelString = 'Intermediate';
    else if (levelNumber === 3) levelString = 'Proficient';
    else if (levelNumber === 4) levelString = 'Fluent';
    else if (levelNumber === 5) levelString = 'Native';
    console.log('levelString: ' + levelString);
    return levelString;
}


// 絞り込み結果の表示
function displayJobs(jobs) {
    fetch(`/api/userData`)
        .then(response => response.json())
        .then(data => {

            var favoriteList = data[0].favoriteJobs;
            
            const language = sessionStorage.getItem('language');

            const jobCount = document.getElementById('job-count');
            jobCount.firstElementChild.innerText = language === 'ja' ? jobs.length + '件の求人が見つかりました' : jobs.length + ' jobs found';

            const jobList = document.getElementById('job-list'); // 結果を表示するための要素を取得
            jobList.innerHTML = '';
            jobs.forEach(job => {
                // console.log(job.japaneseLevel);
                const jobItem = document.createElement('div');
                jobItem.className = 'job-item';
                
                jobItem.innerHTML = `
                    <a href="/job?id=${job.id}&language=${language}">
                        <div class="job-item-inner">
                            <div class="job-item-text">
                                <h2>${job.title}</h2>
                                <p>${job.summary}</p>
                                <p><strong>${language === 'ja' ? '企業名' : 'Company Name'}:</strong> ${job.name}</p>
                                <p><strong>${language === 'ja' ? '時給' : 'Hourly Wage'}:</strong> ${job.wage} ${language === 'ja' ? '円' : 'yen'}</p>
                                <p><strong>${language === 'ja' ? 'エリア' : 'Area'}:</strong> ${job.area}</p>
                                <p><strong>${language === 'ja' ? '市区' : 'City'}:</strong> ${job.city}</p>
                                <p><strong>${language === 'ja' ? '路線' : 'Line'}:</strong> ${job.line}</p>
                                <p><strong>${language === 'ja' ? '駅' : 'Station'}:</strong> ${job.station}</p>
                                <p><strong>${language === 'ja' ? '職種' : 'Job Type'}:</strong> ${job.job_type}</p>
                                <p><strong>${language === 'ja' ? '日時' : 'Job Date'}:</strong> ${job.date} ${job.beginTime} ~ ${job.endTime}</p>
                                <p><strong>${language === 'ja' ? 'バイトの種類' : 'Job Duration'}:</strong> ${job.is_single ? (language === 'ja' ? '単発バイト' : 'Single Job') : (language === 'ja' ? '長期バイト' : 'Long Job')}</p>
                                <p><strong>${language === 'ja' ? '日本語レベル' : 'Japanese Level'}:</strong> ${languageLevelNumberToString(job.japaneseLevel)}</p>
                                <p><strong>${language === 'ja' ? '英語レベル' : 'English Level'}:</strong> ${languageLevelNumberToString(job.englishLevel)}</p>

                            </div>
                            <div class="job-item-image">
                                <img src="${job.image_urls[0]}" alt="${job.title}" class="job-image">
                            </div>

                        </div>

                    </a>

                `;


                const faboriteButtonDiv = document.createElement('div');
                faboriteButtonDiv.id = 'favorite-button-' + job.id;
                if (favoriteList.includes(job.id)) {
                    faboriteButtonDiv.innerHTML = `
                        <button onclick="removeFromFavorites(${job.id}, '${language}')" class="unlikeButton">
                            <svg class="unlikeButton__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M91.6 13A28.7 28.7 0 0 0 51 13l-1 1-1-1A28.7 28.7 0 0 0 8.4 53.8l1 1L50 95.3l40.5-40.6 1-1a28.6 28.6 0 0 0 0-40.6z"/></svg>
                            ${language === 'ja' ? 'お気に入りから削除' : 'Remove from favorites'}
                        </button>
                    `
                } else {
                    faboriteButtonDiv.innerHTML = `
                        <button onclick="addToFavorites(${job.id}, '${language}')" class="likeButton">
                            <svg class="likeButton__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M91.6 13A28.7 28.7 0 0 0 51 13l-1 1-1-1A28.7 28.7 0 0 0 8.4 53.8l1 1L50 95.3l40.5-40.6 1-1a28.6 28.6 0 0 0 0-40.6z"/></svg>
                            ${language === 'ja' ? 'お気に入りに追加' : 'Add to favorites'}
                        </button>
                    `
                }
                jobItem.appendChild(faboriteButtonDiv);
                
                jobList.appendChild(jobItem);
            });
        });

}







