document.getElementById('yr').textContent = new Date().getFullYear();

// reveal on scroll, staggered within each grid
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const siblings = [...e.target.parentElement.children].filter(el => el.classList.contains('reveal'));
    e.target.style.transitionDelay = Math.min(siblings.indexOf(e.target), 6) * 60 + 'ms';
    e.target.classList.add('in');
    io.unobserve(e.target);
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// clear the stagger delay once revealed so hover feels instant
document.addEventListener('transitionend', e => {
  if (e.target.classList?.contains('in')) e.target.style.transitionDelay = '';
});

// highlight the nav link for the section in view
const links = [...document.querySelectorAll('.nav nav a')];
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.hash === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));
