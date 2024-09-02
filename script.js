const totalPages = 604;
let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;

const pageImage = document.getElementById('quran-page');
const pageWrapper = document.querySelector('.page-wrapper');
const progressBar = document.getElementById('progress-bar');

function updatePage() {
    pageImage.src = `source/pages/${currentPage}.png`;
    localStorage.setItem('currentPage', currentPage);

    // Update reading progress
    const progress = (currentPage / totalPages) * 100;
    progressBar.style.width = `${progress}%`;
}

function handleSwipe(direction) {
    if (direction === 'left' && currentPage > 1) {
        currentPage--; // Go to previous page
    } else if (direction === 'right' && currentPage < totalPages) {
        currentPage++; // Go to next page
    }
    updatePage();
}

document.addEventListener('DOMContentLoaded', () => {
    updatePage();
});

let touchStartX = 0;

pageWrapper.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
});

pageWrapper.addEventListener('touchend', (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const touchDiff = touchEndX - touchStartX; // Positive if swiping right, negative if swiping left

    if (Math.abs(touchDiff) > 50) { // Swipe threshold
        handleSwipe(touchDiff > 0 ? 'right' : 'left'); // Right swipe goes to the next page, left swipe goes to the previous page
    }
});
