(function() {
    // Hide preloader as soon as page is ready (no artificial delay)
    var loader = document.getElementById('site-preloader');
    if (loader) {
        if (document.readyState === 'complete') {
            loader.classList.add('fade-out');
            document.body.style.overflow = '';
        } else {
            window.addEventListener('load', function() {
                loader.classList.add('fade-out');
                document.body.style.overflow = '';
            });
            // Fallback: hide after 1s even if load event is slow
            setTimeout(function() {
                if (loader && !loader.classList.contains('fade-out')) {
                    loader.classList.add('fade-out');
                    document.body.style.overflow = '';
                }
            }, 1000);
        }
    }
})();
