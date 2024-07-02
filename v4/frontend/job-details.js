function fetchData(jobId, language) {
    fetch(`/api/job/${jobId}?language=${language}`)
    .then(response => response.json())
    .then(job => {
        if (!job) {
            document.getElementById('job-details').innerHTML = 'Job not found.';
            return;
        }

        const jobTitle = `
            <h2>${job.title}</h2>
        `;
        document.getElementById('job-title').innerHTML = jobTitle;

        const jobMV = `
            <div class="job-mv-inner">
                <img src="${job.image_urls[0]}" alt="${job.title}" class="job-image">
            </div>
        `;
        document.getElementById('job-mv').innerHTML = jobMV;



        const jobDetails = `
            <p class="job-description">${job.description}</p>
            <p><strong>${language === 'ja' ? '企業名' : 'Company Name'}:</strong> ${job.name}</p>
            <p><strong>${language === 'ja' ? '時給' : 'Hourly Wage'}:</strong> ${job.wage} ${language === 'ja' ? '円' : 'yen'}</p>
            <p><strong>${language === 'ja' ? 'エリア' : 'Area'}:</strong> ${job.area}</p>
            <p><strong>${language === 'ja' ? '駅' : 'Station'}:</strong> ${job.station}</p>
            <p><strong>${language === 'ja' ? '職種' : 'Job Type'}:</strong> ${job.job_type}</p>
            <p><strong>${language === 'ja' ? 'バイトの種類' : 'Job Duaration'}:</strong> ${job.is_single ? (language === 'ja' ? '単発バイト' : 'Single Job') : (language === 'ja' ? '長期バイト' : 'Long Job')}</p>

        `;
        document.getElementById('job-details').innerHTML = jobDetails;

        const jobImagesTitle = document.getElementById('job-images-title');
        jobImagesTitle.innerHTML = `${language === 'ja' ? 'ギャラリー' : 'Gallary'}`;
        const jobImagesList = document.getElementById('job-images-list');
        jobImagesList.innerHTML = ``;

        job.image_urls.forEach((url, index) => {
            if (index == 0) {
                return;
            }
            console.log(index);
            const jobImage = document.createElement('li');
            jobImage.innerHTML = `
                <img src="${url}" alt="${job.title}" class="job-image">
            `;
            jobImagesList.appendChild(jobImage);
        });


        const jobMap = document.getElementById('job-map');
        jobMap.innerHTML = `
            <div>
                <p><strong>${language === 'ja' ? '住所' : 'Address'}:</strong> ${job.address}</p>
            </div>
            <iframe src="http://maps.google.co.jp/maps?q=${job.name}&output=embed&t=m&z=16&hl=${language}"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            width="600"
            height="450"></iframe>
        `;
        
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const jobId = new URLSearchParams(window.location.search).get('id');
    let language = new URLSearchParams(window.location.search).get('language');
    // const toggleSwitch = document.getElementById('language-toggle');
    const switchCheckbox = document.getElementById('switch-checkbox');
    const switchCheckboxEn = document.getElementById('switch-checkbox-en');
    const switchCheckboxJa = document.getElementById('switch-checkbox-ja');

    if (language === 'ja') {
        // toggleSwitch.checked = true;]
        switchCheckboxJa.checked = true;
    }
    fetchData(jobId, language);


    document.querySelectorAll('input[name="language"]').forEach(radio => {
        radio.addEventListener('change', () => {
            if (language === 'ja') {
                language = 'en';
            } else {
                language = 'ja';
            }
            fetchData(jobId, language);
        });
    });


    // toggleSwitch.addEventListener('click',() => {
    //     // let language = new URLSearchParams(window.location.search).get('language') || 'ja';
    
    //     if (language === 'ja') {
    //         language = 'en';
    //     } else {
    //         language = 'ja';
    //     }
    //     toggleSwitch.addEventListener('change', fetchData(jobId, language))
    // }, true);



    // document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    //     const savedState = localStorage.getItem(checkbox.name);
    //     if (savedState !== null) {
    //       checkbox.checked = JSON.parse(savedState);
    //     }
    //   });

});


