const totalPages = 604;
let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;

const pageImage = document.getElementById('quran-page');
const pageWrapper = document.querySelector('.page-wrapper');

function updatePage() {
    pageImage.src = `source/pages/${currentPage}.png`;
    localStorage.setItem('currentPage', currentPage);
}

function handleSwipe(direction) {
    if (direction === 'left' && currentPage < totalPages) {
        currentPage++;
    } else if (direction === 'right' && currentPage > 1) {
        currentPage--;
    }
    updatePage();
}

let touchStartX = 0;

pageWrapper.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
});

pageWrapper.addEventListener('touchend', (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const touchDiff = touchStartX - touchEndX;

    if (Math.abs(touchDiff) > 50) { // Swipe threshold
        handleSwipe(touchDiff > 0 ? 'left' : 'right');
    }
});

// Initialize the first page
updatePage();
