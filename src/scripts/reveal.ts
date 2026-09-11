/* Scroll reveal and header state. Runs on first load and after every
   ClientRouter navigation (astro:page-load). With reduced motion or without
   IntersectionObserver every block is shown at once. */
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealAll = () => {
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)');
  if (reduceMotion() || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );
  items.forEach((el) => io.observe(el));
};

let headerBound = false;
const bindHeader = () => {
  const update = () => document.querySelector('.hd')?.classList.toggle('is-scrolled', window.scrollY > 40);
  update();
  if (!headerBound) {
    window.addEventListener('scroll', update, { passive: true });
    headerBound = true;
  }
};

document.addEventListener('astro:page-load', () => {
  revealAll();
  bindHeader();
});
