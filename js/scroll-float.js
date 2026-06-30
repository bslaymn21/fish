function initScrollFloat() {
  const els = document.querySelectorAll('[data-scroll-float]');
  if (!els.length) return;

  els.forEach((el) => {
    if (el._scrollFloatInitialized) return;

    const text = el.textContent || '';
    const chars = text.split('').map((c) => (c === ' ' ? '\u00A0' : c));
    el.innerHTML = `<span class="scroll-float-text">${chars
      .map((c) => `<span class="char">${c}</span>`)
      .join('')}</span>`;
    el._scrollFloatInitialized = true;

    const charEls = el.querySelectorAll('.char');
    if (!charEls.length) return;

    gsap.fromTo(
      charEls,
      {
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: '50% 0%',
      },
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
          start: 'center bottom+=50%',
          end: 'bottom bottom-=40%',
          scrub: true,
        },
      }
    );
  });
}

document.addEventListener('DOMContentLoaded', initScrollFloat);
