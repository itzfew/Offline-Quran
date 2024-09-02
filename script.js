const totalPages = 604;
let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;

const pageImage = document.getElementById('quran-page');
const pageWrapper = document.querySelector('.page-wrapper');
const progressBar = document.getElementById('progress-bar');
const themeToggle = document.getElementById('theme-toggle');

function updatePage() {
    pageImage.src = `source/pages/${currentPage}.png`;
    localStorage.setItem('currentPage', currentPage);

    // Update reading progress
    const progress = (currentPage / totalPages) * 100;
    progressBar.style.width = `${progress}%`;
}

function handleSwipe(direction) {
    if (direction === 'left' && currentPage < totalPages) {
        currentPage++;
    } else if (direction === 'right' && currentPage > 1) {
        currentPage--;
    }
    updatePage();
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    updatePage();
});

themeToggle.addEventListener('click', toggleTheme);

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
