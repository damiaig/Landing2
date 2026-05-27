
document.addEventListener('wheel', e => { if (e.ctrlKey) e.preventDefault(); }, { passive: false });
document.addEventListener('gesturestart', e => e.preventDefault());

/* Nav */
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60));

/* Typewriter */
const typeEl = document.getElementById('typewriter');
const fullText = "TIRED OF\nBEING\nAVERAGE?";
let charIdx = 0;
function type() {
  if (charIdx < fullText.length) {
    const ch = fullText[charIdx];
    const blink = typeEl.querySelector('.cursor-blink');
    if (ch === '\n') { blink.before(document.createElement('br')); }
    else { blink.before(document.createTextNode(ch)); }
    charIdx++;
    setTimeout(type, 90);
  }
}
setTimeout(type, 600);

/* Parallax hero */
const heroBg = document.getElementById('heroBg');
window.addEventListener('scroll', () => {
  heroBg.style.transform = `scale(1.1) translateY(${window.scrollY * 0.22}px)`;
}, { passive: true });

/* Learn More */
document.getElementById('learnMoreBtn').addEventListener('click', () => {
  document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

/* Scroll reveal */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));

/* Counters */
const counters = [
  { id: 'students-count', max: 100, suffix: '+' },
  { id: 'trades-count', max: 100, suffix: '+' },
  { id: 'countries-count', max: 20, suffix: '+' },
];
let started = false;
const statsObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !started) { started = true; runCounters(); }
}, { threshold: 0.2 });
const statsEl = document.getElementById('stats');
if (statsEl) statsObs.observe(statsEl);

function runCounters() {
  let step = 0;
  const steps = 60;
  const timer = setInterval(() => {
    step++;
    const ease = 1 - Math.pow(1 - step / steps, 3);
    counters.forEach(c => {
      const el = document.getElementById(c.id);
      const val = Math.floor(c.max * ease);
      el.textContent = (val >= c.max ? c.max : val) + c.suffix;
    });
    if (step >= steps) {
      clearInterval(timer);
      setTimeout(() => { started = false; }, 5000);
      setTimeout(runCounters, 5000);
    }
  }, 33);
}
