document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const navLinks = document.querySelectorAll('.sidebar nav ul li a');

    function toggleDarkMode() {
        body.dataset.theme = body.dataset.theme === 'light' ? 'dark' : 'light';
    }

    darkModeToggle.addEventListener('click', toggleDarkMode);

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });
});
