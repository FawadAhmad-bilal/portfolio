const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const root = document.documentElement;

// 1. Theme (dark by default; remembers the visitor's choice)
const themeBtn = document.getElementById("theme");
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
function setTheme(mode) {
  root.dataset.theme = mode;
  themeBtn.textContent = mode === "dark" ? "Light" : "Dark";
  try { localStorage.setItem("theme", mode); } catch (e) {}
}
setTheme(saved || "dark");
themeBtn.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

// 2. Mobile menu
const menu = document.getElementById("menu"), nav = document.getElementById("nav");
menu.addEventListener("click", () => menu.setAttribute("aria-expanded", nav.classList.toggle("open")));
nav.addEventListener("click", e => { if (e.target.tagName === "A") nav.classList.remove("open"); });

// 3. Scroll reveal: add class "in" when an element enters the screen
const seen = new IntersectionObserver(items => items.forEach(i => {
  if (i.isIntersecting) { i.target.classList.add("in"); seen.unobserve(i.target); setTimeout(() => i.target.classList.add("done"), 900); }
}), { threshold: 0.15 });
function watch() {
  document.querySelectorAll(".reveal:not(.in)").forEach((el, n) => {
    el.style.setProperty("--d", (n % 4) * 0.08 + "s"); // small stagger
    seen.observe(el);
  });
}

// 4. Typing effect in the hero
const roles = ["AI/ML engineer in training", "Agentic AI builder", "Computer vision developer", "Honest ML evaluator"];
const typed = document.getElementById("typed");
let r = 0, c = 0, erasing = false;
function type() {
  const word = roles[r];
  c += erasing ? -1 : 1;
  typed.textContent = word.slice(0, c);
  let wait = erasing ? 35 : 75;
  if (!erasing && c === word.length) { erasing = true; wait = 1600; }
  else if (erasing && c === 0) { erasing = false; r = (r + 1) % roles.length; wait = 400; }
  setTimeout(type, wait);
}
if (reduce) typed.textContent = roles[0]; else type();

// 5. Projects: one card for every entry in projects.js
const PROFILE_REPOS = GITHUB + "?tab=repositories";
const STREAMLIT = "https://share.streamlit.io/user/fawadahmad-bilal";
const ORDER = ["Featured", "Deployed", "Deep learning", "Research", "Client"];
const grid = document.getElementById("project-grid");
const filterBox = document.getElementById("filters");
const has = (p, c) => p.cats.includes(c);

function card(p) {
  // If an exact link is missing, point to the profile page so the button still works.
  const code = has(p, "Research") && !p.repo ? "" :
    `<a href="${p.repo ? GITHUB + p.repo : PROFILE_REPOS}" aria-label="Code for ${p.title} on GitHub">Code on GitHub</a>`;
  const live = p.demo || (has(p, "Deployed") || has(p, "Featured") ? STREAMLIT : "");
  const demo = live ? `<a href="${live}" aria-label="Live app for ${p.title}">Live app</a>` : "";
  return `<article class="card reveal ${has(p, "Featured") ? "wide" : ""}">
    <h3>${p.title}</h3><p>${p.text}</p>${p.note ? `<p class="remark">${p.note}</p>` : ""}
    <ul class="tags">${p.tags.map(t => `<li>${t}</li>`).join("")}</ul>
    <p class="links">${code}${demo}</p></article>`;
}
function show(cat) {
  grid.innerHTML = projects.filter(p => cat === "All" || has(p, cat)).map(card).join("");
  filterBox.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b.dataset.kind === cat));
  watch();
}
["All", ...ORDER.filter(c => projects.some(p => has(p, c)))].forEach(cat => {
  const b = document.createElement("button");
  b.type = "button"; b.textContent = cat; b.dataset.kind = cat;
  b.addEventListener("click", () => show(cat));
  filterBox.appendChild(b);
});
show("All");

// Stats count up when they appear on screen
const counts = { "n-projects": projects.length, "n-live": projects.filter(p => has(p, "Deployed")).length, "n-intern": 4 };
function countUp() {
  Object.entries(counts).forEach(([id, to]) => {
    const el = document.getElementById(id);
    if (reduce) { el.textContent = to; return; }
    const t0 = performance.now();
    (function step(t) {
      const k = Math.min((t - t0) / 1200, 1);
      el.textContent = Math.round(to * k);
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  });
}
new IntersectionObserver((e, o) => { if (e[0].isIntersecting) { countUp(); o.disconnect(); } }).observe(document.querySelector(".stats"));

// 6. Contact form: open the visitor's email app with the message filled in
document.getElementById("mailform").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target;
  const body = `${f.msg.value}\n\nFrom: ${f.name.value} (${f.email.value})`;
  location.href = "mailto:fawadahmad19991@gmail.com?subject=" + encodeURIComponent("Portfolio message from " + f.name.value) + "&body=" + encodeURIComponent(body);
});

// 7. Scroll progress bar
const bar = document.getElementById("progress");
addEventListener("scroll", () => {
  const max = root.scrollHeight - innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
}, { passive: true });

// 8. 3D tilt and spotlight on project cards (mouse devices only)
if (matchMedia("(hover: hover)").matches && !reduce) {
  grid.addEventListener("pointermove", e => {
    const c = e.target.closest(".card");
    if (!c || !c.classList.contains("done")) return;
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    c.style.setProperty("--mx", x * 100 + "%");
    c.style.setProperty("--my", y * 100 + "%");
    c.style.transform = `perspective(800px) rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 8}deg) translateY(-4px)`;
  });
  grid.addEventListener("mouseout", e => {
    const c = e.target.closest(".card");
    if (c && !c.contains(e.relatedTarget)) c.style.transform = "";
  });
}

// 9. Neural-network canvas behind the hero (pauses when hidden, off by default for reduced motion)
(function () {
  const cv = document.getElementById("net");
  if (!cv || reduce) return;
  const ctx = cv.getContext("2d");
  let W, H, pts = [], mouse = { x: -999, y: -999 }, visible = true, col = "#2dd4bf", frame = 0;
  function size() {
    const d = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * d; cv.height = H * d;
    ctx.setTransform(d, 0, 0, d, 0, 0);
    const n = Math.min(60, Math.floor(W / 20));
    pts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4 }));
  }
  function line(a, b, max) {
    const d = Math.hypot(a.x - b.x, a.y - b.y);
    if (d < max) { ctx.globalAlpha = (1 - d / max) * 0.5; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
  }
  function draw() {
    requestAnimationFrame(draw);
    if (!visible || document.hidden) return;
    if (frame++ % 30 === 0) col = getComputedStyle(root).getPropertyValue("--accent").trim() || col;
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = col; ctx.fillStyle = col;
    pts.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.globalAlpha = 0.7; ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, 6.3); ctx.fill();
      for (let j = i + 1; j < pts.length; j++) line(p, pts[j], 120);
      line(p, mouse, 160);
    });
  }
  cv.parentElement.addEventListener("pointermove", e => {
    const r = cv.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
  });
  new IntersectionObserver(e => { visible = e[0].isIntersecting; }).observe(cv);
  addEventListener("resize", size);
  size(); draw();
})();
