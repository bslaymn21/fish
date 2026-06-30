(function() {
    'use strict';

    // ----- Features Data -----
    const MAIN_FEATURES = [
        { icon: '🍽️', title: 'قائمة طعام تفاعلية', desc: 'تصفح المنيو بكل سهولة مع تصنيفات ذكية وأسعار محدثة', badge: 'جديد' },
        { icon: '🛒', title: 'سلة طلب ذكية', desc: 'أضف طلبك بضغطة وعدّل الكميات قبل الإرسال', badge: '' },
        { icon: '🏷️', title: 'عروض حصرية', desc: 'استفد من العروض والتخفيضات المميزة يومياً', badge: 'مشهور' },
        { icon: '🪑', title: 'حجز طاولة', desc: 'احجز طاولتك مسبقاً واختر الوقت واليوم المناسب', badge: '' },
        { icon: '🎫', title: 'كوبونات خصم', desc: 'أدخل كود الخصم واحصل على تخفيض فوري', badge: '' },
        { icon: '💬', title: 'تواصل عبر واتساب', desc: 'أرسل طلبك مباشرة عبر واتساب بضغطة زر', badge: 'مشهور' },
        { icon: '⭐', title: 'آراء العملاء', desc: 'شاهد تقييمات العملاء وشارك بتجربتك', badge: '' },
        { icon: '📍', title: 'معلومات المطعم', desc: 'الموقع، ساعات العمل، وطرق التواصل', badge: '' },
    ];

    const ADMIN_FEATURES = [
        { icon: '📊', title: 'لوحة التحكم', desc: 'إحصائيات يومية وأسبوعية لأداء المطعم', badge: '' },
        { icon: '📝', title: 'إدارة المنيو', desc: 'أضف، عدّل، أو احذف أصناف المنيو بسهولة', badge: 'جديد' },
        { icon: '📦', title: 'إدارة الطلبات', desc: 'تابع الطلبات الجديدة والمنتهية', badge: '' },
        { icon: '🎯', title: 'التحكم بالعروض', desc: 'فعّل أو أوقف العروض وحدد الخصم', badge: '' },
        { icon: '🏷️', title: 'نظام الكوبونات', desc: 'أنشئ كوبونات خصم (نسبة أو مبلغ ثابت)', badge: '' },
        { icon: '📈', title: 'التقارير', desc: 'تحليل أفضل وأقل الأصناف مبيعاً برسوم بيانية', badge: '' },
        { icon: '⚙️', title: 'الإعدادات', desc: 'رقم واتساب، العنوان، روابط التواصل', badge: '' },
        { icon: '📱', title: 'رمز QR', desc: 'رمز QR سريع للمنيو والموقع', badge: '' },
    ];

    // ----- Detect Context -----
    function isAdmin() {
        return window.location.pathname.indexOf('/admin/') !== -1;
    }

    // ----- Build DOM -----
    function buildPopup() {
        if (document.getElementById('features-badge')) return;

        const features = isAdmin() ? ADMIN_FEATURES : MAIN_FEATURES;

        // Badge
        const badge = document.createElement('div');
        badge.id = 'features-badge';
        badge.innerHTML = '<span class="badge-icon">✨</span><span class="badge-text">شاهد المميزات</span>';
        badge.setAttribute('onclick', 'window.__toggleFeaturesPopup()');
        document.body.appendChild(badge);

        // Overlay
        const overlay = document.createElement('div');
        overlay.id = 'features-overlay';
        overlay.setAttribute('onclick', 'window.__toggleFeaturesPopup()');
        document.body.appendChild(overlay);

        // Panel
        const panel = document.createElement('div');
        panel.id = 'features-panel';

        let itemsHTML = '';
        features.forEach((f, i) => {
            const badgeTag = f.badge ? `<span class="fi-badge fi-badge-${f.badge === 'جديد' ? 'new' : 'popular'}">${f.badge}</span>` : '';
            itemsHTML += `
                <div class="feature-item" style="transition-delay:${(i * 0.05).toFixed(2)}s">
                    <div class="fi-icon">${f.icon}</div>
                    <div class="fi-text">
                        <h4>${f.title}</h4>
                        <p>${f.desc}</p>
                    </div>
                    ${badgeTag}
                </div>
            `;
        });

        panel.innerHTML = `
            <div class="panel-header">
                <div>
                    <h2>${isAdmin() ? 'مميزات لوحة التحكم' : 'مميزات المنصة'}</h2>
                    <p class="subtitle">${isAdmin() ? 'كل أدوات الإدارة في مكان واحد' : 'اكتشف كل ما يقدمه مطعمكم'}</p>
                </div>
                <button class="close-btn" onclick="window.__toggleFeaturesPopup()">✕</button>
            </div>
            <div class="features-scroll">
                ${itemsHTML}
            </div>
        `;

        document.body.appendChild(panel);
    }

    // ----- Toggle -----
    window.__toggleFeaturesPopup = function() {
        const panel = document.getElementById('features-panel');
        const overlay = document.getElementById('features-overlay');
        const badge = document.getElementById('features-badge');

        if (!panel) return;

        const isOpen = panel.classList.contains('open');

        if (isOpen) {
            panel.classList.remove('open');
            overlay.classList.remove('open');
        } else {
            panel.classList.add('open');
            overlay.classList.add('open');
            badge.classList.add('badge-hidden');

            // Re-trigger stagger: remove then add items
            const items = panel.querySelectorAll('.feature-item');
            items.forEach((el, i) => {
                el.style.opacity = '0';
                el.style.transform = 'translateX(30px)';
                el.style.transitionDelay = (i * 0.05).toFixed(2) + 's';
                requestAnimationFrame(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateX(0)';
                });
            });
        }
    };

    // Close on Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const panel = document.getElementById('features-panel');
            if (panel && panel.classList.contains('open')) {
                window.__toggleFeaturesPopup();
            }
        }
    });

    // Initialize on DOM ready — retry if body not ready
    function tryBuild() {
        if (!document.body) { setTimeout(tryBuild, 50); return; }
        buildPopup();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryBuild);
    } else {
        tryBuild();
    }
})();
