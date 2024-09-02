const totalPages = 604;
let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

const pageImage = document.getElementById('quran-page');
const pageWrapper = document.querySelector('.page-wrapper');
const audioRecitation = document.getElementById('audio-recitation');
const progressBar = document.getElementById('progress-bar');
const themeToggle = document.getElementById('theme-toggle');
const searchBar = document.getElementById('search-bar');
const bookmarkBtn = document.getElementById('bookmark-btn');

function updatePage() {
    pageImage.src = `source/pages/${currentPage}.png`;
    audioRecitation.src = `audio/page${currentPage}.mp3`;
    localStorage.setItem('currentPage', currentPage);

    // Update reading progress
    const progress = (currentPage / totalPages) * 100;
    progressBar.style.width = `${progress}%`;

    // Check if the current page is bookmarked
    if (bookmarks.includes(currentPage)) {
        bookmarkBtn.textContent = 'Remove Bookmark';
    } else {
        bookmarkBtn.textContent = 'Bookmark';
    }
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

function handleBookmark() {
    if (bookmarks.includes(currentPage)) {
        bookmarks = bookmarks.filter(page => page !== currentPage);
        bookmarkBtn.textContent = 'Bookmark';
    } else {
        bookmarks.push(currentPage);
        bookmarkBtn.textContent = 'Remove Bookmark';
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function searchPage(query) {
    // Implement search logic here
    // For example, you might want to map chapter/verse to pages or use some other mechanism
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    updatePage();
});

themeToggle.addEventListener('click', toggleTheme);
searchBar.addEventListener('input', (event) => searchPage(event.target.value));
bookmarkBtn.addEventListener('click', handleBookmark);

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
