// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Show/Hide scroll to top button
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**No functionnal see this later 
//SYNC side bar with bottom bar
const codeContent = document.getElementById('code-content');
const scrollbarArea = document.getElementById('horizontal-scrollbar-area');

codeContent.addEventListener('scroll', () => {
    scrollbarArea.scrollLeft = codeContent.scrollLeft;
});

scrollbarArea.addEventListener('scroll', () => {
    codeContent.scrollLeft = scrollbarArea.scrollLeft;
});

const updateScrollbarWidth = () => {
    scrollbarArea.querySelector('div').style.width = codeContent.scrollWidth + 'px';
};
window.addEventListener('load', updateScrollbarWidth);
window.addEventListener('resize', updateScrollbarWidth);
*/