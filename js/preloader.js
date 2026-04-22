/**
 * Preloader and Page Transition Logic
 */

(function() {
    // 1. Define the Preloader HTML
    const preloaderHtml = `
    <div id="site-preloader" class="preloader-container">
        <!-- Background Gradient -->
        <div class="absolute inset-0 z-0 opacity-40 pointer-events-none preloader-gradient"></div>
        
        <!-- Decorative Bubbles -->
        <div class="absolute inset-0 pointer-events-none preloader-bubbles">
            <div class="absolute top-[15%] left-[20%] w-2 h-2 bg-secondary rounded-full opacity-10 blur-[1px]"></div>
            <div class="absolute top-[45%] right-[15%] w-3 h-3 bg-primary rounded-full opacity-10 blur-[2px]"></div>
            <div class="absolute bottom-[25%] left-[30%] w-2 h-2 bg-secondary rounded-full opacity-15 blur-[1px]"></div>
        </div>

        <div class="relative z-10 flex flex-col items-center">
            <div class="mb-lg animate-swim">
                <div class="animate-glow">
                    <svg class="text-primary" fill="none" height="120" viewBox="0 0 200 100" width="180" xmlns="http://www.w3.org/2000/svg">
                        <path class="fish-body" d="M10 50C10 50 40 10 90 10C140 10 180 50 180 50C180 50 140 90 90 90C40 90 10 50 10 50Z" stroke="currentColor" stroke-width="2"></path>
                        <path class="animate-tail" d="M10 50L-20 20V80L10 50Z" fill="currentColor" opacity="0.6"></path>
                        <path d="M80 50C80 44.4772 84.4772 40 90 40C95.5228 40 100 44.4772 100 50C100 55.5228 95.5228 60 90 60C84.4772 60 80 55.5228 80 50Z" fill="#000" fill-opacity="0.05"></path>
                        <circle cx="150" cy="45" fill="currentColor" r="3"></circle>
                        <path class="animate-fin" d="M90 35C90 35 110 20 120 35" stroke="currentColor" stroke-linecap="round" stroke-width="2"></path>
                        <path class="animate-fin" d="M90 65C90 65 110 80 120 65" stroke="currentColor" stroke-linecap="round" stroke-width="2"></path>
                        <path d="M120 50Q140 50 160 50" opacity="0.2" stroke="currentColor" stroke-dasharray="2 4" stroke-width="1"></path>
                    </svg>
                </div>
            </div>
            <div class="w-full text-center space-y-md">
                <h1 class="font-label-caps text-label-caps text-primary tracking-[0.3em] uppercase" data-i18n="loader_title">Matamkom</h1>
                <p class="font-body-md text-sm text-slate-500 italic opacity-60" data-i18n="loader_desc">Preparing your fresh catch...</p>
                <div class="preloader-progress mx-auto">
                    <div class="preloader-progress-bar animate-loading"></div>
                </div>
            </div>
        </div>
        
        <div class="absolute bottom-12 flex flex-col items-center gap-xs">
            <span class="material-symbols-outlined text-primary opacity-60 animate-pulse">restaurant</span>
            <span class="font-label-caps text-[10px] text-slate-400 tracking-widest uppercase">Est. 2024</span>
        </div>
    </div>
    `;

    // 2. Inject Preloader immediately if document.body is available, otherwise on DOMContentLoaded
    function injectPreloader() {
        if (document.getElementById('site-preloader')) return;
        document.body.insertAdjacentHTML('afterbegin', preloaderHtml);
    }

    if (document.body) {
        injectPreloader();
    } else {
        document.addEventListener('DOMContentLoaded', injectPreloader);
    }

    // 3. Hide Preloader when page is fully loaded
    window.addEventListener('load', () => {
        const loader = document.getElementById('site-preloader');
        if (loader) {
            // Artificial delay for smooth feel
            setTimeout(() => {
                loader.classList.add('fade-out');
                document.body.style.overflow = '';
            }, 800);
        }
    });

    // 4. Handle Page Transitions (Interceptor)
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        
        // Only intercept internal links that don't open in new tab and aren't hashes
        if (href && 
            !href.startsWith('#') && 
            !href.startsWith('mailto:') && 
            !href.startsWith('tel:') && 
            !href.startsWith('http') && // Assuming internal links are relative
            !link.hasAttribute('download') &&
            link.target !== '_blank') {
            
            e.preventDefault();
            const loader = document.getElementById('site-preloader');
            if (loader) {
                loader.classList.remove('fade-out');
                // Restart animation if needed (by re-adding)
                const bar = loader.querySelector('.preloader-progress-bar');
                bar.classList.remove('animate-loading');
                void bar.offsetWidth; // Trigger reflow
                bar.classList.add('animate-loading');
            }
            
            setTimeout(() => {
                window.location.href = href;
            }, 500); // Small delay to show the "leaving" animation
        }
    });
})();
