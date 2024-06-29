function fetchData(jobId, language) {
    fetch(`/api/job/${jobId}?language=${language}`)
    .then(response => response.json())
    .then(job => {
        if (!job) {
            document.getElementById('job-details').innerHTML = 'Job not found.';
            return;
        }

        const jobDetails = `
            <img src="${job.image_url}" alt="${job.title}" class="job-image">
            <h2>${job.title}</h2>
            <p>${job.description}</p>
            <p><strong>${language === 'ja' ? 'エリア' : 'Area'}:</strong> ${job.area}</p>
            <p><strong>${language === 'ja' ? '駅' : 'Station'}:</strong> ${job.station}</p>
            <p><strong>${language === 'ja' ? '職種' : 'Job Type'}:</strong> ${job.job_type}</p>
            <p><strong>${language === 'ja' ? 'バイトの種類' : 'Job Type'}:</strong> ${job.is_single ? (language === 'ja' ? '単発バイト' : 'Single Job') : (language === 'ja' ? '長期バイト' : 'Long Job')}</p>
        `;
        document.getElementById('job-details').innerHTML = jobDetails;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const jobId = new URLSearchParams(window.location.search).get('id');
    let language = new URLSearchParams(window.location.search).get('language');
    // const toggleSwitch = document.getElementById('language-toggle');
    const switchCheckbox = document.getElementById('switch-checkbox');

    if (language === 'ja') {
        // toggleSwitch.checked = true;
        switchCheckbox.lastChild.firstChild.checked = true;
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


