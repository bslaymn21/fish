// Theme Manager Logic for Matamkom

(function() {
    // Initial check for theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.add(savedTheme);
    document.documentElement.classList.remove(savedTheme === 'light' ? 'dark' : 'light');

    document.addEventListener('DOMContentLoaded', () => {
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            updateToggleIcon(savedTheme);
            toggleBtn.addEventListener('click', toggleTheme);
        }
    });

    function toggleTheme() {
        const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.classList.remove(currentTheme);
        document.documentElement.classList.add(newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateToggleIcon(newTheme);
    }

    function updateToggleIcon(theme) {
        const icon = document.querySelector('#theme-toggle .material-symbols-outlined');
        if (icon) {
            icon.textContent = theme === 'light' ? 'dark_mode' : 'light_mode';
        }
    }
})();
