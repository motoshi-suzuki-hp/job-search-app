document.addEventListener('DOMContentLoaded', function() {
    var likeButtons = document.getElementsByClassName('likeButton');
    Array.from(likeButtons).forEach(function(likeButton) {
        likeButton.addEventListener('click', function() {
            likeButton.classList.toggle('liked');
        });
    });
    var unlikeButtons = document.getElementsByClassName('unlikeButton');
    Array.from(unlikeButtons).forEach(function(unlikeButton) {
        unlikeButton.addEventListener('click', function() {
            unlikeButton.classList.toggle('unliked');
        });
    });
}, false);