// apply
function applyJob(jobId, language) {
    console.log(jobId);
    fetch(`/apply_job`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({job_id: jobId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const applyJobButton = document.getElementById('applyJob-button');
            applyJobButton.innerHTML = `
                <button class="applyJobButton">
                    ${language === 'ja' ? '応募済' : 'Applied'}
                </button>
            `
            alert('応募しました');
        } else {
            alert('エラーが発生しました');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}