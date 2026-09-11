/* Hero carousel. One app at a time, five seconds each. Pauses on hover,
   touch and focus, obeys reduced motion (then it just shows the first app
   and the dots still work), and re-arms after ClientRouter navigations. */
const INTERVAL = 5000;
const stops = new Set<() => void>();

const start = (root: HTMLElement) => {
  const slides = [...root.querySelectorAll<HTMLElement>('[data-slide]')];
  const dots = [...root.querySelectorAll<HTMLButtonElement>('[data-dot]')];
  if (slides.length < 2) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let i = 0;
  let timer = 0;

  const show = (n: number) => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => {
      s.classList.toggle('is-active', k === i);
      s.setAttribute('aria-hidden', String(k !== i));
      s.querySelectorAll<HTMLAnchorElement>('a').forEach((a) => (a.tabIndex = k === i ? 0 : -1));
    });
    dots.forEach((d, k) => {
      d.classList.toggle('is-active', k === i);
      d.setAttribute('aria-selected', String(k === i));
    });
    root.style.setProperty('--accent', slides[i].dataset.accent ?? '');
  };
  const stop = () => window.clearInterval(timer);
  const play = () => {
    stop();
    if (reduce) return;
    timer = window.setInterval(() => show(i + 1), INTERVAL);
  };

  dots.forEach((d, k) =>
    d.addEventListener('click', () => {
      show(k);
      play();
    }),
  );
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', play);
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', play);
  root.addEventListener('touchstart', stop, { passive: true });
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') show(i + 1);
    if (e.key === 'ArrowLeft') show(i - 1);
  });
  const onVisibility = () => (document.hidden ? stop() : play());
  document.addEventListener('visibilitychange', onVisibility);

  stops.add(() => {
    stop();
    document.removeEventListener('visibilitychange', onVisibility);
  });
  play();
};

document.addEventListener('astro:page-load', () => {
  document.querySelectorAll<HTMLElement>('[data-showcase]').forEach(start);
});
document.addEventListener('astro:before-swap', () => {
  stops.forEach((fn) => fn());
  stops.clear();
});
