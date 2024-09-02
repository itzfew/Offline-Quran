const totalPages = 604;
let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;

const pageImage = document.getElementById('quran-page');
const progressBar = document.getElementById('progress-bar');
const fullscreenBtn = document.getElementById('fullscreen-btn');

function updatePage() {
    pageImage.src = `source/pages/${currentPage}.png`;
    localStorage.setItem('currentPage', currentPage);

    // Update reading progress
    const progress = (currentPage / totalPages) * 100;
    progressBar.style.width = `${progress}%`;
}

function handleSwipe(direction) {
    if (direction === 'right' && currentPage < totalPages) {
        currentPage++; // Go to next page
    } else if (direction === 'left' && currentPage > 1) {
        currentPage--; // Go to previous page
    }
    updatePage();
}

function goToPage(pageNumber) {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
        currentPage = pageNumber;
        updatePage();
    }
}

// Handle swipe gestures
let touchStartX = 0;

document.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
});

document.addEventListener('touchend', (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const touchDiff = touchEndX - touchStartX; // Positive if swiping right, negative if swiping left

    if (Math.abs(touchDiff) > 50) { // Swipe threshold
        handleSwipe(touchDiff > 0 ? 'right' : 'left'); // Right swipe goes to the next page, left swipe goes to the previous page
    }
});

fullscreenBtn.addEventListener('click', () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
});

updatePage();
