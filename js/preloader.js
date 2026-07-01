(function() {
    var loader = document.getElementById('site-preloader');
    if (!loader) return;

    function hideLoader() {
        // Tiny delay to let Tailwind/fonts paint, then fade out
        setTimeout(function() {
            loader.classList.add('fade-out');
            // Remove from DOM after transition
            setTimeout(function() { loader.remove(); }, 500);
        }, 200);
    }

    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        document.addEventListener('DOMContentLoaded', hideLoader);
        // Fallback: hide after 2s even if page is slow
        setTimeout(hideLoader, 2000);
    }
})();
