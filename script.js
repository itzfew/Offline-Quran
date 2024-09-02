const totalPages = 604;
let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;

const pageImage = document.getElementById('quran-page');
const pageWrapper = document.querySelector('.page-wrapper');
const progressBar = document.getElementById('progress-bar');
const prevButton = document.getElementById('prev-page');
const nextButton = document.getElementById('next-page');
const juzMenuBtn = document.getElementById('juz-menu-btn');
const juzMenu = document.getElementById('juz-menu');
const navArrows = document.querySelector('.nav-arrows');

let hideArrowsTimeout;

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

function showNavArrows() {
    navArrows.classList.remove('hidden');
    clearTimeout(hideArrowsTimeout);
    hideArrowsTimeout = setTimeout(() => {
        navArrows.classList.add('hidden');
    }, 60000); // Hide after 1 minute
}

document.addEventListener('DOMContentLoaded', () => {
    updatePage();
    // Initialize arrows visibility timeout
    hideArrowsTimeout = setTimeout(() => {
        navArrows.classList.add('hidden');
    }, 60000); // Hide arrows after 1 minute
});

let touchStartX = 0;

pageWrapper.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
    showNavArrows(); // Show arrows on touch
});

pageWrapper.addEventListener('touchend', (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const touchDiff = touchEndX - touchStartX; // Positive if swiping right, negative if swiping left

    if (Math.abs(touchDiff) > 50) { // Swipe threshold
        handleSwipe(touchDiff > 0 ? 'right' : 'left'); // Right swipe goes to the next page, left swipe goes to the previous page
    }
});

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updatePage();
        showNavArrows();
    }
});

nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        updatePage();
        showNavArrows();
    }
});

juzMenuBtn.addEventListener('click', () => {
    juzMenu.classList.toggle('hidden');
});

juzMenu.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        const pageNumber = parseInt(event.target.getAttribute('data-page'));
        goToPage(pageNumber);
        juzMenu.classList.add('hidden'); // Auto-close the menu
    }
});

// Show navigation arrows when user interacts with the page
document.addEventListener('mousemove', showNavArrows);
document.addEventListener('keydown', showNavArrows);
