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

function fetchUserData(language) {
    fetch(`/api/userData`)
    .then(response => response.json())
    .then(userData => {
        if (!userData) {
            document.getElementById('user-data').innerHTML = 'user data not found.';
            return;
        }

        console.log(userData);



        const userDetails = `
            <div class="user-image">
                <img src="${userData[0].profilePicture}" alt="${userData[0].name}">
            </div>
            <div class="user-text">
                <p><strong>${language === 'ja' ? '名前' : 'Name'}:</strong> ${userData[0].name}</p>
                <p><strong>${language === 'ja' ? 'メールアドレス' : 'E-mail'}:</strong> ${userData[0].email}</p>
                <p><strong>${language === 'ja' ? 'プロフィール' : 'Biography'}:</strong> ${userData[0].bio}</p>
                <p><strong>${language === 'ja' ? '日本語レベル' : 'Japanese Level'}:</strong> ${userData[0].japaneseLevel}</p>
                <p><strong>${language === 'ja' ? '英語レベル' : 'English Level'}:</strong> ${userData[0].englishLevel}</p>
            </div>
            <div class="user-document">
                <a href="${userData[0].resume}" download>${language === 'ja' ? '履歴書' : 'resume'}</a>
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
                                <p><strong>${language === 'ja' ? 'バイトの種類' : 'Job Duaration'}:</strong> ${job.is_single ? (language === 'ja' ? '単発バイト' : 'Single Job') : (language === 'ja' ? '長期バイト' : 'Long Job')}</p>
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
                        </button>
                    `
                } else {
                    faboriteButtonDiv.innerHTML = `
                        <button onclick="addToFavorites(${jobId}, '${language}')" class="likeButton">
                            <svg class="likeButton__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M91.6 13A28.7 28.7 0 0 0 51 13l-1 1-1-1A28.7 28.7 0 0 0 8.4 53.8l1 1L50 95.3l40.5-40.6 1-1a28.6 28.6 0 0 0 0-40.6z"/></svg>
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
    console.log(switchCheckboxJa.checked);

    if (language === 'ja') {
        // toggleSwitch.checked = true;
        switchCheckboxJa.checked = true;
    }



    console.log('language: ' + language);
    fetchUserData(language);

    document.querySelectorAll('input[name="language"]').forEach(radio => {
        radio.addEventListener('change', () => {
            console.log('radio change');
            if (language === 'ja') {
                language = 'en';
            } else {
                language = 'ja';
            }
            console.log(language);
            fetchUserData(language);
        });
    });

    

});


document.querySelectorAll('input[name="language"]').forEach(radio => {
    radio.addEventListener('change', () => {
        sessionStorage.setItem('language', radio.value);
    });
});

