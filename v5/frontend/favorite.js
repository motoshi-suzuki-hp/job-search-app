// お気に入り
function addToFavorites(jobId, language) {
    console.log(jobId);
    fetch(`/add_to_favorites`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({job_id: jobId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const favoriteButton = document.getElementById('favorite-button-' + jobId);
            favoriteButton.innerHTML = `
                <button onclick="removeFromFavorites(${jobId}, '${language}')" class="unlikeButton">
                    <svg class="unlikeButton__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M91.6 13A28.7 28.7 0 0 0 51 13l-1 1-1-1A28.7 28.7 0 0 0 8.4 53.8l1 1L50 95.3l40.5-40.6 1-1a28.6 28.6 0 0 0 0-40.6z"/></svg>
                </button>
            `;
            alert('お気に入りに追加しました');
        } else {
            alert('エラーが発生しました');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function removeFromFavorites(jobId, language) {
    console.log(jobId);
    fetch(`/remove_from_favorites`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({job_id: jobId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const favoriteButton = document.getElementById('favorite-button-' + jobId);
            favoriteButton.innerHTML = `
                <button onclick="addToFavorites(${jobId}, '${language}')" class="likeButton">
                    <svg class="likeButton__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M91.6 13A28.7 28.7 0 0 0 51 13l-1 1-1-1A28.7 28.7 0 0 0 8.4 53.8l1 1L50 95.3l40.5-40.6 1-1a28.6 28.6 0 0 0 0-40.6z"/></svg>
                </button>
            `;
            alert('お気に入りから削除しました');
        } else {
            alert('エラーが発生しました');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}