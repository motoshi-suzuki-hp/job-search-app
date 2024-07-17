function fetchFavoriteJobData(jobId, language) {
    fetch(`/api/job/${jobId}?language=${language}`)
    .then(response => response.json())
    .then(job => {
        if (!job) {
            document.getElementById('job-details').innerHTML = 'Job not found.';
            return;
        }
    });
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

function fetchUserData(language) {
    fetch(`/api/userData`)
    .then(response => response.json())
    .then(userData => {
        if (!userData) {
            document.getElementById('user-data').innerHTML = 'user data not found.';
            return;
        }

        console.log(userData[0].japaneseLevel);
        console.log(languageLevelNumberToString(userData[0].japaneseLevel));



        const userDetails = `
            <div class="user-left">
                <div class="user-image">
                    <img src="${userData[0].profilePicture}" alt="${userData[0].name}">
                </div>
                <div class="user-document">
                    <a href="${userData[0].resume}" download>${language === 'ja' ? '履歴書' : 'resume'}</a>
                </div>
            </div>
            <div class="user-text">
                <table>
                    <tr>
                        <td>
                            <p><strong>${language === 'ja' ? '名前' : 'Name'}:</strong></p>
                        </td>
                        <td>
                            <p>${userData[0].name}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p><strong>${language === 'ja' ? '性別' : 'Gender'}:</strong></p>
                        </td>
                        <td>
                            <p>${userData[0].gender}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p><strong>${language === 'ja' ? '生年月日' : 'Birthday'}:</strong></p>
                        </td>
                        <td>
                            <p>${userData[0].birthday}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p><strong>${language === 'ja' ? '国籍' : 'Nationality'}:</strong></p>
                        </td>
                        <td>
                            <p>${userData[0].nationality}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p><strong>${language === 'ja' ? 'ビザの種類' : 'Visa Type'}:</strong></p>
                        </td>
                        <td>
                            <p>${userData[0].visa}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p><strong>${language === 'ja' ? '電話番号' : 'Phone Number'}:</strong></p>
                        </td>
                        <td>
                            <p>${userData[0].phone}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p><strong>${language === 'ja' ? '住所' : 'Address'}:</strong></p>
                        </td>
                        <td>
                            <p>${userData[0].address}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p><strong>${language === 'ja' ? 'メールアドレス' : 'E-mail'}:</strong></p>
                        </td>
                        <td>
                            <p>${userData[0].email}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p><strong>${language === 'ja' ? 'プロフィール' : 'Biography'}:</strong></p>
                        </td>
                        <td>
                            <p>${userData[0].bio}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p><strong>${language === 'ja' ? '日本語レベル' : 'Japanese Level'}:</strong></p>
                        </td>
                        <td>
                            <p>${languageLevelNumberToString(parseInt(userData[0].japaneseLevel))}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p><strong>${language === 'ja' ? '英語レベル' : 'English Level'}:</strong></p>
                        </td>
                        <td>
                            <p>${languageLevelNumberToString(parseInt(userData[0].englishLevel))}</p>
                        </td>
                    </tr>
                </table>
            </div>

            
        `;
        document.getElementById('user-data').innerHTML = userDetails;

        const favoriteList = userData[0].favoriteJobs;
        console.log(favoriteList);

        const favoriteJobsList = document.getElementById('favoriteJobsList');
        favoriteJobsList.innerHTML = '';

        userData[0].favoriteJobs.forEach(jobId => {
            fetch(`/api/job/${jobId}?language=${language}`)
            .then(response => response.json())
            .then(job => {
                if (!job) {
                    document.getElementById('job-details').innerHTML = 'Job not found.';
                    return;
                }

                const jobItem = document.createElement('div');
                jobItem.className = 'job-item';
                jobItem.innerHTML = `
                    <a href="/job?id=${jobId}&language=${language}">
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
                                <p><strong>${language === 'ja' ? 'バイトの種類' : 'Job Duration'}:</strong> ${job.is_single ? (language === 'ja' ? '単発バイト' : 'Temporary Work') : (language === 'ja' ? '長期バイト' : 'Long Job')}</p>
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
                faboriteButtonDiv.id = 'favorite-button-' + jobId;
                if (favoriteList.includes(jobId)) {
                    faboriteButtonDiv.innerHTML = `
                        <button onclick="removeFromFavorites(${job.id}, '${language}')" class="unlikeButton">
                            <svg class="unlikeButton__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M91.6 13A28.7 28.7 0 0 0 51 13l-1 1-1-1A28.7 28.7 0 0 0 8.4 53.8l1 1L50 95.3l40.5-40.6 1-1a28.6 28.6 0 0 0 0-40.6z"/></svg>
                            ${language === 'ja' ? 'お気に入りから削除' : 'Remove from favorites'}
                        </button>
                    `
                } else {
                    faboriteButtonDiv.innerHTML = `
                        <button onclick="addToFavorites(${jobId}, '${language}')" class="likeButton">
                            <svg class="likeButton__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M91.6 13A28.7 28.7 0 0 0 51 13l-1 1-1-1A28.7 28.7 0 0 0 8.4 53.8l1 1L50 95.3l40.5-40.6 1-1a28.6 28.6 0 0 0 0-40.6z"/></svg>
                            ${language === 'ja' ? 'お気に入りに追加' : 'Add to favorites'}
                        </button>
                    `
                }
                jobItem.appendChild(faboriteButtonDiv);
                
                favoriteJobsList.appendChild(jobItem);

            });

        });

    });
}

document.addEventListener('DOMContentLoaded', () => {
    const switchCheckboxJa = document.getElementById('switch-checkbox-ja');
    
    let language = sessionStorage.getItem('language');

    if (language === 'ja') {
        document.getElementById("switch-checkbox-ja").checked = true;
        document.getElementById("switch-checkbox-en").checked = false;
    } else if (language === 'en') {
        document.getElementById("switch-checkbox-ja").checked = false;
        document.getElementById("switch-checkbox-en").checked = true;
    }



    console.log('language: ' + language);
    fetchUserData(language);

    // document.querySelectorAll('input[name="language"]').forEach(radio => {
    //     radio.addEventListener('change', () => {
    //         console.log('radio change');
    //         if (language === 'ja') {
    //             language = 'en';
    //         } else {
    //             language = 'ja';
    //         }
    //         console.log(language);
    //         fetchUserData(language);
    //     });
    // });

    // const select = document.getElementById('switch-checkbox');
    // select.addEventListener('change', (e) => {
    //     sessionStorage.setItem('language', e.target.value);
    //     fetchUserData(e.target.value);
    // });

});


const select = document.getElementById('switch-checkbox');
    select.addEventListener('change', (e) => {
        sessionStorage.setItem('language', e.target.value);
        fetchUserData(e.target.value);
    });
