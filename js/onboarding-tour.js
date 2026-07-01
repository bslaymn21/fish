(function () {
  'use strict'

  if (localStorage.getItem('matamkom_tour_done') === '1') return

  const steps = [
    {
      selector: '#lang-toggle, [data-action="toggle-language"], .lang-toggle',
      title: 'اللغة',
      text: 'من هنا تقدر تبدل بين العربية والإنجليزية',
      icon: 'translate',
      highlight: 'language'
    },
    {
      selector: '#theme-toggle, [data-action="toggle-theme"], .theme-toggle',
      title: 'الثيم',
      text: 'من هنا بدل بين الوضع النهاري والليلي حسب راحتك',
      icon: 'dark_mode',
      highlight: 'theme'
    },
    {
      selector: '#features-badge',
      title: 'مميزات المنصة',
      text: 'اضغط هنا تشوف كل مميزات الموقع وأدوات التحكم',
      icon: 'stars',
      highlight: 'features'
    },
    {
      selector: '#cart-fab, .cart-fab, [onclick*="toggleCart"]',
      title: 'سلة الطلبات',
      text: 'هنا بتظهر طلباتك اللي أضفتها تقدر تراجعها وتعدلها',
      icon: 'shopping_cart',
      highlight: 'cart'
    },
    {
      selector: '#bottom-nav, .bottom-nav, nav.fixed.bottom-0',
      title: 'قائمة التصفح',
      text: 'القائمة السريعة للتنقل بين أقسام الموقع',
      icon: 'menu',
      highlight: 'nav'
    }
  ]

  let currentStep = 0
  let overlay = null
  let tooltip = null
  let isActive = false

  function createElements() {
    overlay = document.createElement('div')
    overlay.id = 'tour-overlay'
    overlay.style.cssText = 'position:fixed;inset:0;z-index:99998;background:rgba(0,0,0,0.5);pointer-events:auto;transition:opacity 0.3s;opacity:0'
    document.body.appendChild(overlay)
    requestAnimationFrame(() => overlay.style.opacity = '1')

    tooltip = document.createElement('div')
    tooltip.id = 'tour-tooltip'
    tooltip.style.cssText = 'position:fixed;z-index:99999;background:#fff;color:#001e40;border-radius:20px;padding:20px 24px;box-shadow:0 20px 60px rgba(0,0,0,0.3),0 0 0 4px rgba(0,102,204,0.15);max-width:320px;width:calc(100vw - 48px);direction:rtl;text-align:right;opacity:0;transform:translateY(10px);transition:all 0.35s cubic-bezier(0.34,1.56,0.64,1);pointer-events:auto'
    document.body.appendChild(tooltip)
  }

  function getElement(selector) {
    try { return document.querySelector(selector) } catch (e) { return null }
  }

  function showStep(index) {
    if (index >= steps.length) { finish(); return }
    const step = steps[index]
    const el = getElement(step.selector)
    if (!el) { currentStep++; showStep(currentStep); return }

    const rect = el.getBoundingClientRect()
    const isMobile = window.innerWidth < 768
    const scrollX = window.scrollX || window.pageXOffset
    const scrollY = window.scrollY || window.pageYOffset

    const highlightStyle = document.createElement('style')
    highlightStyle.id = 'tour-highlight-style'
    const existing = document.getElementById('tour-highlight-style')
    if (existing) existing.remove()

    const pad = isMobile ? 4 : 8
    highlightStyle.textContent = `
      #tour-highlight {
        position:fixed;z-index:99998;pointer-events:none;
        top:${rect.top - pad}px;left:${rect.left - pad}px;
        width:${rect.width + pad * 2}px;height:${rect.height + pad * 2}px;
        border-radius:${getComputedStyle(el).borderRadius || '12px'};
        box-shadow:0 0 0 4px rgba(0,102,204,0.5),0 0 30px rgba(0,102,204,0.2);
        animation: tour-pulse 1.5s ease-in-out infinite;
        transition:all 0.3s ease;
      }
      @keyframes tour-pulse {
        0%,100% { box-shadow:0 0 0 4px rgba(0,102,204,0.5),0 0 30px rgba(0,102,204,0.2); }
        50% { box-shadow:0 0 0 8px rgba(0,102,204,0.3),0 0 50px rgba(0,102,204,0.1); }
      }
    `
    document.head.appendChild(highlightStyle)

    let highlight = document.getElementById('tour-highlight')
    if (!highlight) {
      highlight = document.createElement('div')
      highlight.id = 'tour-highlight'
      document.body.appendChild(highlight)
    }
    highlight.style.top = (rect.top - pad) + 'px'
    highlight.style.left = (rect.left - pad) + 'px'
    highlight.style.width = (rect.width + pad * 2) + 'px'
    highlight.style.height = (rect.height + pad * 2) + 'px'

    const titleIcons = {
      language: 'translate', theme: 'dark_mode', features: 'stars', cart: 'shopping_cart', nav: 'menu'
    }

    tooltip.innerHTML = `
      <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:12px">
        <div style="width:40px;height:40px;background:#003366;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <span class="material-symbols-outlined" style="font-size:20px;color:#fff;font-variation-settings:'FILL' 1">${step.icon}</span>
        </div>
        <div style="flex-grow">
          <div style="font-weight:900;font-size:15px;margin-bottom:2px;font-family:'Noto Kufi Arabic',sans-serif">${step.title}</div>
          <div style="font-size:13px;opacity:0.7;line-height:1.5;font-family:'Noto Kufi Arabic',sans-serif">${step.text}</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:12px;padding-top:12px;border-top:1px solid rgba(0,0,0,0.06)">
        <div style="display:flex;gap:6px">
          ${steps.map((_, i) => `<div style="width:${i === index ? 20 : 8}px;height:8px;border-radius:4px;background:${i === index ? '#003366' : 'rgba(0,0,0,0.12)'};transition:all 0.3s"></div>`).join('')}
        </div>
        <button class="tour-next-btn" style="background:#003366;color:#fff;border:none;padding:8px 24px;border-radius:12px;font-weight:900;font-size:13px;cursor:pointer;transition:all 0.2s;font-family:'Noto Kufi Arabic',sans-serif">
          ${index < steps.length - 1 ? 'تمام' : 'خلينا نبدأ'}
        </button>
      </div>
    `

    const btn = tooltip.querySelector('.tour-next-btn')
    btn.onmouseenter = () => btn.style.transform = 'scale(1.05)'
    btn.onmouseleave = () => btn.style.transform = 'scale(1)'
    btn.onclick = () => {
      currentStep++
      showStep(currentStep)
    }

    tooltip.style.opacity = '0'
    tooltip.style.transform = 'translateY(10px)'
    tooltip.style.display = 'block'

    requestAnimationFrame(() => {
      const tipRect = tooltip.getBoundingClientRect()
      const spaceAbove = rect.top - 16
      const spaceBelow = window.innerHeight - rect.bottom - 16
      const tipHeight = tipRect.height

      let top, left
      if (spaceBelow >= tipHeight + 16) {
        top = rect.bottom + 12
      } else if (spaceAbove >= tipHeight + 16) {
        top = rect.top - tipHeight - 12
      } else {
        top = Math.max(16, Math.min(window.innerHeight - tipHeight - 16, rect.top - tipHeight / 2))
      }

      left = Math.max(16, Math.min(window.innerWidth - tipRect.width - 16, rect.left + rect.width / 2 - tipRect.width / 2))

      tooltip.style.top = top + 'px'
      tooltip.style.left = left + 'px'
      tooltip.style.opacity = '1'
      tooltip.style.transform = 'translateY(0)'
    })

    if (isMobile) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    isActive = true
  }

  function finish() {
    localStorage.setItem('matamkom_tour_done', '1')
    cleanup()
  }

  function cleanup() {
    isActive = false
    const h = document.getElementById('tour-highlight')
    if (h) h.remove()
    const s = document.getElementById('tour-highlight-style')
    if (s) s.remove()
    if (overlay) { overlay.style.opacity = '0'; setTimeout(() => overlay.remove(), 300) }
    if (tooltip) { tooltip.style.opacity = '0'; tooltip.style.transform = 'translateY(10px)'; setTimeout(() => tooltip.remove(), 300) }
  }

  function startTour() {
    if (localStorage.getItem('matamkom_tour_done') === '1') return
    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', startTour); return }
    const existing = document.querySelector('#tour-overlay, #tour-tooltip, #tour-highlight')
    if (existing) return
    createElements()
    setTimeout(() => showStep(0), 500)
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isActive) { finish() }
  })

  startTour()
})()
