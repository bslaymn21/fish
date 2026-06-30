(function () {
  'use strict'

  const FEATURES_KEY = 'features_popup_dismissed'

  const MAIN_FEATURES = [
    {
      icon: '🍽️', title: 'قائمة طعام تفاعلية',
      desc: 'تصفح المنيو بكل سهولة مع تصنيفات ذكية وأسعار محدثة',
      detail: 'صفحة المنيو الرئيسية تعرض كل الأصناف مقسمة حسب التصنيف (مقبلات، وجبات رئيسية، أطباق مميزة). كل صنف عليه صورة واسم وسعر وشعارات تدل على إنه الأكثر مبيعاً أو عليه عرض. تقدر تضغط على أي صنف عشان تشوف التفاصيل الكاملة: طرق الطهي المتاحة (مشوي، مقلي، مجمد)، الأحجام (وسط، كبير، صغير)، وتختار الكمية.' +
        '\n\nأيضاً فيه شريط تصفية في الأعلى عشان تظهر أصناف تصنيف معين، وفلتر عشان تشوف الأطباق المميزة أو الأكثر طلباً. كل ده عشان تلاقي اللي عاوزه بسرعة.',
      link: 'index.html', badge: 'جديد'
    },
    {
      icon: '🛒', title: 'سلة طلب ذكية',
      desc: 'أضف طلبك بضغطة وعدّل الكميات قبل الإرسال',
      detail: 'السلة بتجمع كل اللي اخترته من الأكل في مكان واحد. تقدر تزود وتقلل الكميات، تشوف إجمالي السعر، وتحذف أي صنف. السلة بتظهر في الأجهزة المحمولة كزر عائم (Floating Button) في أسفل الشاشة.' +
        '\n\nلما تضغط على "إرسال الطلب"، بيفتح لك واتساب مباشرة مع رسالة مرتبة فيها كل طلبك: الأصناف، الكميات، الأحجام، وطرق الطهي، إجمالي السعر. ولو عندك كود خصم، في مكان مخصص لكتابته قبل الإرسال.',
      link: 'index.html', badge: ''
    },
    {
      icon: '🏷️', title: 'عروض حصرية',
      desc: 'استفد من العروض والتخفيضات المميزة يومياً',
      detail: 'صفحة العروض بتجمع كل التخفيضات والعروض الخاصة اللي شغالة حالياً. العرض بيتكون من: اسم العرض، نسبة الخصم، وقائمة بالأصناف المشمولة.' +
        '\n\nلما تضيف أصناف من العرض، الخصم بينحسب تلقائياً وبيظهرلك السعر قبل الخصم وبعده. كل عرض ليه كارت منفصل، ولو العرض خلص أو اتوقف، بيظهر عليه علامة "انتهى". في footer العرض فيه ملخص لكل المطلوب.',
      link: 'offers.html', badge: 'مشهور'
    },
    {
      icon: '🪑', title: 'حجز طاولة',
      desc: 'احجز طاولتك مسبقاً واختر الوقت واليوم المناسب',
      detail: 'نظام حجز الطاولات بيسهل عليك اختيار اليوم والوقت المناسبين. تقدر تحدد عدد الأشخاص وتكتب ملاحظاتك.' +
        '\n\nالحجز بيتأكد عبر واتساب برضو، عشان تكون مرتاح إن طلبك وصل. في رابط سريع "Don\'t want to reserve? Order now" لو حابب تطلب أكل بدل ما تحجز.',
      link: 'reservation.html', badge: ''
    },
    {
      icon: '🎫', title: 'كوبونات خصم',
      desc: 'أدخل كود الخصم واحصل على تخفيض فوري',
      detail: 'في مكان مخصص في شاشة الدفع عشان تدخل كود الخصم. الكوبونات ممكن تكون نسبة مئوية (زي 20%) أو خصم بقيمة ثابتة (زي 50 جم).' +
        '\n\nالكود بيتحقق من الصلاحية (تاريخ الانتهاء، الحد الأقصى للاستخدام، الحد الأدنى للطلب). لو الكود صحيح، الخصم بينحسب تلقائياً في إجمالي الفاتورة.',
      link: 'index.html', badge: ''
    },
    {
      icon: '💬', title: 'تواصل عبر واتساب',
      desc: 'أرسل طلبك مباشرة عبر واتساب بضغطة زر',
      detail: 'بدل ما تكتب الطلب بنفسك، الموقع بجهزلك رسالة كاملة بالطلب: كل صنف مع الكمية والحجم وطريقة الطهي، وإجمالي السعر.' +
        '\n\nبضغطة واحدة، بتتنقل للواتساب والرسالة جاهزة عندك. كل اللي عليك إنك تضغط "إرسال". رقم الواتساب بيتحدد من الإعدادات بتاعة المطعم.',
      link: 'index.html', badge: 'مشهور'
    },
    {
      icon: '⭐', title: 'آراء العملاء',
      desc: 'شاهد تقييمات العملاء وشارك بتجربتك',
      detail: 'في صفحة "عن المطعم" فيه قسم كامل لآراء العملاء. كل واحد يقدر يضيف تقييم بالنجوم (من 1 لـ 5) ويكتب تعليق.' +
        '\n\nالتعليقات بتظهر بشكل مرتب، وتقدر تشوف آخر التقييمات من الزباين. كمان في إحصائيات بسيطة عن متوسط التقييمات.',
      link: 'about.html', badge: ''
    },
    {
      icon: '📍', title: 'معلومات المطعم',
      desc: 'الموقع، ساعات العمل، وطرق التواصل',
      detail: 'صفحة "اتصل بنا" فيها كل المعلومات اللي محتاجها: العنوان، رقم التليفون، ساعات العمل، روابط السوشيال ميديا (فيسبوك، إنستغرام، تيك توك).' +
        '\n\nكل المعلومات دي المطعم يقدر يعدلها من لوحة التحكم (الإعدادات). فيه كروت مرتبة عشان توصّل المعلومة بسرعة.',
      link: 'contact.html', badge: ''
    }
  ]

  const ADMIN_FEATURES = [
    {
      icon: '📊', title: 'لوحة التحكم',
      desc: 'إحصائيات يومية وأسبوعية لأداء المطعم',
      detail: 'اللوحة الرئيسية بتعرضلك 4 كروت مهمة: عدد طلبات اليوم، إجمالي الأصناف في المنيو، إجمالي المبيعات، وأفضل صنف مبيعاً.' +
        '\n\nتحت كمان في رسم بياني (Chart) بيظهر أداء المبيعات على مدار الأسبوع، وفيه نصيحة اليوم بناءً على تحليل البيانات.',
      link: 'admin/index.html#content-dashboard', badge: ''
    },
    {
      icon: '📝', title: 'إدارة المنيو',
      desc: 'أضف، عدّل، أو احذف أصناف المنيو بسهولة',
      detail: 'من هنا تقدر تتحكم في كل حاجة في المنيو: تضيف وجبة جديدة بصورة واسم ووصف وسعر وتصنيف، وتعدل في الوجبات الموجودة، وتحذف أي وجبة.' +
        '\n\n\nكمان تقدر تتحكم في: طريقة الطهي (مشوي/مقلي)، الأحجام المتاحة، وتشوف إحصائيات الطلب لكل وجبة. وفيه toggle عشان تخفي الوجبة من المنيو (زي لو خلصت).',
      link: 'admin/index.html#content-menu', badge: 'جديد'
    },
    {
      icon: '📦', title: 'إدارة الطلبات',
      desc: 'تابع الطلبات الجديدة والمنتهية',
      detail: 'شاشة بتعرض كل الطلبات اللي جت من العملاء. كل طلب عليه: اسم العميل، الأصناف المطلوبة مع الكميات، السعر الإجمالي، ورقم الواتساب.' +
        '\n\nتقدر تحذف أي طلب بعد ما تخلصه. الطلبات بتظهر في جدول مرتب، وبرضو في كروت عشان تشوفها بسرعة.',
      link: 'admin/index.html#content-orders', badge: ''
    },
    {
      icon: '🎯', title: 'التحكم بالعروض',
      desc: 'فعّل أو أوقف العروض وحدد الخصم',
      detail: 'من هنا بتتحكم في العرض (عرض واحد نشط في كل مرة). تقدر تحدد: اسم العرض، نسبة الخصم (مثلاً 20%، 50%)، والأصناف المشمولة في العرض.' +
        '\n\nفيه toggle عشان تشغل العرض أو توقفه. الأصناف اللي مشمولة في العرض بتظهر بسعر مخفض للعملاء.',
      link: 'admin/index.html#content-offers', badge: ''
    },
    {
      icon: '🏷️', title: 'نظام الكوبونات',
      desc: 'أنشئ كوبونات خصم (نسبة أو مبلغ ثابت)',
      detail: 'تقدر تنشئ أكواد خصم للعملاء. كل كوبون ليه: كود مميز (مثلاً WELCOME20)، نوع الخصم (نسبة مئوية أو قيمة ثابتة)، قيمة الخصم.' +
        '\n\nكمان في: الحد الأدنى للطلب عشان الكود يشتغل، الحد الأقصى لعدد مرات الاستخدام، وتقدر تفعّل أو تعطّل أي كوبون.',
      link: 'admin/index.html#content-coupons', badge: ''
    },
    {
      icon: '📈', title: 'التقارير',
      desc: 'تحليل أفضل وأقل الأصناف مبيعاً برسوم بيانية',
      detail: 'التقارير بتظهرلك تحليل كامل للمبيعات. فيه: أفضل 5 أصناف مبيعاً (Best Sellers) مرتبة حسب الأكثر طلباً، أقل 5 أصناف مبيعاً (Worst Sellers).' +
        '\n\nورسم بياني (Bar Chart) يوضح توزيع المبيعات على الأصناف عشان تشوف بسرعة مين الـ star في المنيو.',
      link: 'admin/index.html#content-reports', badge: ''
    },
    {
      icon: '⚙️', title: 'الإعدادات',
      desc: 'رقم واتساب، العنوان، روابط التواصل',
      detail: 'من هنا بتحدد بيانات المطعم الأساسية: رقم الواتساب (اللي بيتبعت عليه الطلبات)، رقم التليفون، العنوان.' +
        '\n\nكمان روابط السوشيال ميديا: فيسبوك، إنستغرام، تيك توك. كل المعلومات دي بتظهر في صفحات الموقع تلقائياً.',
      link: 'admin/index.html#content-settings', badge: ''
    },
    {
      icon: '📱', title: 'رمز QR',
      desc: 'رمز QR سريع للمنيو والموقع',
      detail: 'بتوّلد QR Code للموقع عشان تطبعه وتحطه على طاولات المطعم. الزباين يقدروا يمسحوا الكود بدل ما يكتبوا الرابط.' +
        '\n\nفيه زر تحميل عشان تنزل صورة الـ QR Code وتطبعها.',
      link: 'admin/index.html#content-qrcode', badge: ''
    }
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
      overlay.setAttribute('onclick', 'window.__toggleFeaturesPopup()')
      document.body.appendChild(overlay)
    }

    const panel = document.createElement('div')
    panel.id = 'features-panel'

    let itemsHTML = ''
    features.forEach((f, i) => {
      const badgeTag = f.badge ? `<span class="fi-badge fi-badge-${f.badge === 'جديد' ? 'new' : 'popular'}">${f.badge}</span>` : ''
      itemsHTML += `
        <div class="feature-item" data-feature-index="${i}" style="transition-delay:${(i * 0.05).toFixed(2)}s">
          <div class="fi-icon">${f.icon}</div>
          <div class="fi-text">
            <h4>${f.title}</h4>
            <p>${f.desc}</p>
          </div>
          ${badgeTag}
          <span class="fi-arrow material-symbols-outlined">chevron_left</span>
        </div>
      `
    })

    panel.innerHTML = `
      <div class="panel-header">
        <div>
          <h2 id="fp-title">${isAdmin() ? 'مميزات لوحة التحكم' : 'مميزات المنصة'}</h2>
          <p class="subtitle" id="fp-subtitle">${isAdmin() ? 'كل أدوات الإدارة في مكان واحد' : 'اكتشف كل ما يقدمه مطعمكم'}</p>
        </div>
        <button class="close-btn" onclick="window.__toggleFeaturesPopup()">✕</button>
      </div>
      <div class="features-scroll" id="fp-scroll">
        ${itemsHTML}
      </div>
      <div class="feature-detail hidden" id="fp-detail">
        <button class="detail-back" onclick="window.__showFeaturesList()">
          <span class="material-symbols-outlined">chevron_right</span>
          <span>عودة للمميزات</span>
        </button>
        <div id="fp-detail-content"></div>
      </div>
    `

    document.body.appendChild(panel)

    // Add click listeners to feature items
    panel.querySelectorAll('.feature-item').forEach(el => {
      el.addEventListener('click', function () {
        const idx = parseInt(this.getAttribute('data-feature-index'))
        showFeatureDetail(idx)
      })
    })
  }

  let _currentDetailIndex = -1

  window.__showFeaturesList = function () {
    const panel = document.getElementById('features-panel')
    if (!panel) return
    document.getElementById('fp-scroll').classList.remove('hidden')
    document.getElementById('fp-detail').classList.add('hidden')
    document.getElementById('fp-title').textContent = isAdmin() ? 'مميزات لوحة التحكم' : 'مميزات المنصة'
    document.getElementById('fp-subtitle').textContent = isAdmin() ? 'كل أدوات الإدارة في مكان واحد' : 'اكتشف كل ما يقدمه مطعمكم'
    _currentDetailIndex = -1
  }

  function showFeatureDetail(index) {
    const features = isAdmin() ? ADMIN_FEATURES : MAIN_FEATURES
    const f = features[index]
    if (!f) return

    _currentDetailIndex = index
    const panel = document.getElementById('features-panel')
    if (!panel) return

    document.getElementById('fp-scroll').classList.add('hidden')
    document.getElementById('fp-detail').classList.remove('hidden')
    document.getElementById('fp-title').textContent = f.title
    document.getElementById('fp-subtitle').textContent = 'شرح تفصيلي للميزة'

    const detailContent = document.getElementById('fp-detail-content')
    const detailLines = f.detail.split('\n').filter(l => l.trim())
    let linesHTML = ''
    detailLines.forEach(line => {
      if (line.startsWith('لكن')) {
        linesHTML += `<p class="detail-line detail-line-sub">${line}</p>`
      } else {
        linesHTML += `<p class="detail-line">${line}</p>`
      }
    })

    detailContent.innerHTML = `
      <div class="detail-hero">
        <span class="detail-icon">${f.icon}</span>
        <div>
          <h3>${f.title}</h3>
          <p>${f.desc}</p>
        </div>
      </div>
      <div class="detail-body">
        ${linesHTML}
      </div>
      <a href="${f.link}" class="detail-cta" onclick="window.__toggleFeaturesPopup()">
        <span class="material-symbols-outlined">open_in_new</span>
        <span>فتح الصفحة</span>
      </a>
    `
  }

  window.__toggleFeaturesPopup = function () {
    const panel = document.getElementById('features-panel')
    const overlay = document.getElementById('features-overlay')
    const badge = document.getElementById('features-badge')

    if (!panel) return

    const isOpen = panel.classList.contains('open')

    if (isOpen) {
      panel.classList.remove('open')
      overlay.classList.remove('open')
      // Reset to list view when closing
      window.__showFeaturesList()
    } else {
      panel.classList.add('open')
      overlay.classList.add('open')
      badge.classList.add('badge-hidden')

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
      if (panel && panel.classList.contains('open')) {
        window.__toggleFeaturesPopup()
      }
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
