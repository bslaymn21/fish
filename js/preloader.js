(function() {
    var loader = document.getElementById('site-preloader');
    if (!loader) return;

    function hideLoader() {
        loader.classList.add('fade-out');
        setTimeout(function() { if (loader.parentNode) loader.remove(); }, 500);
    }

    var checks = 0;
    function ready() {
        checks++;
        if (checks >= 2) {
            // Extra paint delay after both fonts + window are ready
            setTimeout(hideLoader, 400);
        }
    }

    // 1) Fonts ready (Material Symbols + Epilogue)
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(ready);
    } else {
        ready();
    }

    // 2) Window fully loaded (images, Tailwind CSS)
    if (document.readyState === 'complete') {
        ready();
    } else {
        window.addEventListener('load', ready);
    }

    // 3) Fallback: hide after 3s no matter what
    setTimeout(function() {
        if (!loader.classList.contains('fade-out')) hideLoader();
    }, 3000);
})();
