(function () {
  'use strict'

  const MAIN_FEATURES = [
    { icon: '🍽️', title: 'قائمة طعام تفاعلية', desc: 'تصفح المنيو بكل سهولة مع تصنيفات ذكية وأسعار محدثة', link: 'index.html', badge: 'جديد' },
    { icon: '🛒', title: 'سلة طلب ذكية', desc: 'أضف طلبك بضغطة وعدّل الكميات قبل الإرسال', link: 'index.html', badge: '' },
    { icon: '🏷️', title: 'عروض حصرية', desc: 'استفد من العروض والتخفيضات المميزة يومياً', link: 'offers.html', badge: 'مشهور' },
    { icon: '🪑', title: 'حجز طاولة', desc: 'احجز طاولتك مسبقاً واختر الوقت واليوم المناسب', link: 'reservation.html', badge: '' },
    { icon: '🎫', title: 'كوبونات خصم', desc: 'أدخل كود الخصم واحصل على تخفيض فوري', link: 'index.html', badge: '' },
    { icon: '💬', title: 'تواصل عبر واتساب', desc: 'أرسل طلبك مباشرة عبر واتساب بضغطة زر', link: 'index.html', badge: 'مشهور' },
    { icon: '⭐', title: 'آراء العملاء', desc: 'شاهد تقييمات العملاء وشارك بتجربتك', link: 'about.html', badge: '' },
    { icon: '📍', title: 'معلومات المطعم', desc: 'الموقع، ساعات العمل، وطرق التواصل', link: 'contact.html', badge: '' }
  ]

  const ADMIN_FEATURES = [
    { icon: '📊', title: 'لوحة التحكم', desc: 'إحصائيات يومية وأسبوعية لأداء المطعم', link: 'admin/index.html#content-dashboard', badge: '' },
    { icon: '📝', title: 'إدارة المنيو', desc: 'أضف، عدّل، أو احذف أصناف المنيو بسهولة', link: 'admin/index.html#content-menu', badge: 'جديد' },
    { icon: '📦', title: 'إدارة الطلبات', desc: 'تابع الطلبات الجديدة والمنتهية', link: 'admin/index.html#content-orders', badge: '' },
    { icon: '🎯', title: 'التحكم بالعروض', desc: 'فعّل أو أوقف العروض وحدد الخصم', link: 'admin/index.html#content-offers', badge: '' },
    { icon: '🏷️', title: 'نظام الكوبونات', desc: 'أنشئ كوبونات خصم (نسبة أو مبلغ ثابت)', link: 'admin/index.html#content-coupons', badge: '' },
    { icon: '📈', title: 'التقارير', desc: 'تحليل أفضل وأقل الأصناف مبيعاً برسوم بيانية', link: 'admin/index.html#content-reports', badge: '' },
    { icon: '⚙️', title: 'الإعدادات', desc: 'رقم واتساب، العنوان، روابط التواصل', link: 'admin/index.html#content-settings', badge: '' },
    { icon: '📱', title: 'رمز QR', desc: 'رمز QR سريع للمنيو والموقع', link: 'admin/index.html#content-qrcode', badge: '' }
  ]

  function isAdmin() {
    return window.location.pathname.indexOf('/admin/') !== -1
  }

  function buildPopup() {
    if (document.getElementById('features-panel')) return

    const features = isAdmin() ? ADMIN_FEATURES : MAIN_FEATURES

    if (!document.getElementById('features-overlay')) {
      const overlay = document.createElement('div')
      overlay.id = 'features-overlay'
      overlay.addEventListener('click', closePopup)
      document.body.appendChild(overlay)
    }

    const panel = document.createElement('div')
    panel.id = 'features-panel'

    let itemsHTML = ''
    features.forEach((f, i) => {
      const badgeTag = f.badge ? `<span class="fi-badge fi-badge-${f.badge === 'جديد' ? 'new' : 'popular'}">${f.badge}</span>` : ''
      itemsHTML += `
        <a href="${f.link}" class="feature-item" style="transition-delay:${(i * 0.05).toFixed(2)}s" onclick="window.__closeFeaturesPopup()">
          <div class="fi-icon">${f.icon}</div>
          <div class="fi-text">
            <h4>${f.title}</h4>
            <p>${f.desc}</p>
          </div>
          ${badgeTag}
          <span class="fi-arrow material-symbols-outlined">chevron_left</span>
        </a>
      `
    })

    panel.innerHTML = `
      <div class="panel-header">
        <div>
          <h2>${isAdmin() ? 'مميزات لوحة التحكم' : 'مميزات المنصة'}</h2>
          <p class="subtitle">${isAdmin() ? 'كل أدوات الإدارة في مكان واحد' : 'اكتشف كل ما يقدمه مطعمكم'}</p>
        </div>
        <button class="close-btn" onclick="window.__closeFeaturesPopup()">✕</button>
      </div>
      <div class="features-scroll">
        ${itemsHTML}
      </div>
    `

    document.body.appendChild(panel)
  }

  function closePopup() {
    const panel = document.getElementById('features-panel')
    if (!panel) return
    panel.classList.remove('open')
    const overlay = document.getElementById('features-overlay')
    if (overlay) overlay.classList.remove('open')
  }

  window.__closeFeaturesPopup = closePopup

  window.__toggleFeaturesPopup = function () {
    const panel = document.getElementById('features-panel')
    const overlay = document.getElementById('features-overlay')
    const badge = document.getElementById('features-badge')
    if (!panel) return

    const isOpen = panel.classList.contains('open')

    if (isOpen) {
      closePopup()
    } else {
      if (typeof trackAction === 'function') trackAction('open_features_popup')
      panel.classList.add('open')
      overlay.classList.add('open')

      const items = panel.querySelectorAll('.feature-item')
      items.forEach((el, i) => {
        el.style.opacity = '0'
        el.style.transform = 'translateX(30px)'
        el.style.transitionDelay = (i * 0.05).toFixed(2) + 's'
        requestAnimationFrame(() => {
          el.style.opacity = '1'
          el.style.transform = 'translateX(0)'
        })
      })
    }
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const panel = document.getElementById('features-panel')
      if (panel && panel.classList.contains('open')) closePopup()
    }
  })

  function tryBuild() {
    if (!document.body) { setTimeout(tryBuild, 50); return }
    buildPopup()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryBuild)
  } else {
    tryBuild()
  }
})()
