function initScrollFloat(container) {
  const scope = container || document;
  const els = scope.querySelectorAll('[data-scroll-float]');
  if (!els.length) return;

  // Register ScrollTrigger plugin if not already
  if (gsap && gsap.registerPlugin) gsap.registerPlugin(ScrollTrigger);

  els.forEach((el) => {
    if (el._scrollFloatInitialized) return;
    el._scrollFloatInitialized = true;

    const type = el.getAttribute('data-scroll-float') || 'text';

    if (type === 'text' || type === '') {
      // --- Text character reveal ---
      const text = el.textContent || '';
      const chars = text.split('').map((c) => (c === ' ' ? '\u00A0' : c));
      el.innerHTML = `<span class="scroll-float-text">${chars
        .map((c) => `<span class="char">${c}</span>`)
        .join('')}</span>`;

      const charEls = el.querySelectorAll('.char');
      if (!charEls.length) return;

      gsap.fromTo(
        charEls,
        { opacity: 0, yPercent: 120, scaleY: 2.3, scaleX: 0.7, transformOrigin: '50% 0%' },
        {
          duration: 1,
          ease: 'back.inOut(2)',
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger: 0.03,
          scrollTrigger: {
            trigger: el,
            start: 'top bottom-=20',
            end: 'top center',
            toggleActions: 'play none none none',
          },
        }
      );
    } else if (type === 'card') {
      // --- Card reveal (fade+slide up) — واضح وبطيء ---
      gsap.fromTo(
        el,
        { opacity: 0, y: 80, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom-=60',
            end: 'top center-=120',
            toggleActions: 'play none none none',
          },
        }
      );
    } else if (type === 'stagger') {
      // --- Stagger children (e.g. grid of cards) — واضح وبطيء ---
      const children = el.children;
      if (!children.length) return;

      gsap.fromTo(
        children,
        { opacity: 0, y: 70, scale: 0.93 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: el,
            start: 'top bottom-=50',
            end: 'top center-=100',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  });
}

// On DOM ready, scan the whole page
document.addEventListener('DOMContentLoaded', function() {
  // Give other inline scripts (like renderMenu) a chance to run first
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      initScrollFloat();
    });
  });
});
