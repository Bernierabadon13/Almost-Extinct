(function () {
"use strict";
var C = window.AE_CONFIG || {}, MAX = 50;
var LIVE = !!(C.SUPABASE_URL && C.SUPABASE_ANON_KEY && window.supabase);
var sb = LIVE ? window.supabase.createClient(C.SUPABASE_URL, C.SUPABASE_ANON_KEY) : null;
var plants = [], canSubmit = true, firstRender = true;
var RM = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
function $(i) { return document.getElementById(i); }
function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }

document.documentElement.classList.add("js");

/* IUCN Red List categories in the official order, with rough population guides (mature plants in the wild) */
var IUCN = [
 {n:"Critically Endangered", c:"CR", num:"< 250", help:"Extremely high risk of extinction in the wild. Roughly fewer than 250 mature plants remain."},
 {n:"Endangered", c:"EN", num:"< 2,500", help:"Very high risk of extinction in the wild. Roughly fewer than 2,500 mature plants remain."},
 {n:"Vulnerable", c:"VU", num:"< 10,000", help:"High risk of extinction in the wild. Roughly fewer than 10,000 mature plants remain."},
 {n:"Near Threatened", c:"NT", num:"near 10,000", help:"Not threatened yet, but close to qualifying as Vulnerable (around 10,000 mature plants, or declining)."},
 {n:"Least Concern", c:"LC", num:"> 10,000", help:"Widespread and plentiful. Usually more than 10,000 mature plants."},
 {n:"Extinct in the Wild", c:"EW", num:"0 in the wild", help:"None are left in nature. It survives only in gardens, nurseries or seed banks."},
 {n:"Extinct", c:"EX", num:"0 left", help:"No living plants are known to remain anywhere."},
 {n:"Data Deficient", c:"DD", num:"unknown", help:"There is not enough information to tell how many remain."},
 {n:"Not Evaluated", c:"NE", num:"not assessed", help:"The IUCN has not assessed this plant yet."}
];
function sLabel(name) { for (var i = 0; i < IUCN.length; i++) if (IUCN[i].n === name) return name + " (" + IUCN[i].c + ")"; return name || ""; }
function sRank(name) { for (var i = 0; i < IUCN.length; i++) if (IUCN[i].n === name) return i; return 99; }
(function buildStatus() {
  var sel = $("fst"), dflt = "Pick the closest match. The numbers are rough guides for mature plants in the wild.";
  sel.innerHTML = '<option value="" disabled selected>Choose a status</option>' + IUCN.map(function (x) { return '<option value="' + esc(x.n) + '">' + esc(x.n + " (" + x.c + ") · " + x.num) + '</option>'; }).join("");
  function help() { var x = IUCN.filter(function (y) { return y.n === sel.value; })[0]; $("stHelp").textContent = x ? x.help : dflt; }
  sel.addEventListener("change", help);
  $("form").addEventListener("reset", function () { setTimeout(help, 0); });
  help();
})();

/* opening animation (the animation itself runs in CSS; this only locks scrolling until it ends) */
var intro = $("intro");
if (intro) {
  if (RM) { intro.remove(); }
  else {
    document.body.classList.add("lock");
    setTimeout(function () { document.body.classList.remove("lock"); intro.remove(); }, 4300);
  }
}

/* scroll reveal */
var rvIO = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
  es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); rvIO.unobserve(en.target); } });
}, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }) : null;
function reveal(root) {
  [].forEach.call((root || document).querySelectorAll(".rv:not(.in)"), function (el) { if (rvIO) rvIO.observe(el); else el.classList.add("in"); });
}
reveal();

/* Demo data, shown only until Supabase is configured in config.js */
var MOCK = [
 {id:"1",common_name:"Wollemi Pine",image_path:"images/wollemi-pine.jpg",scientific_name:"Wollemia nobilis",status:"Critically Endangered",location:"Australia",population:"About 100 mature trees",description:"A living relic once known only from fossils."},
 {id:"2",common_name:"Waling-waling",image_path:"images/waling-waling.jpg",scientific_name:"Vanda sanderiana",status:"Endangered",location:"Philippines",population:"",description:"A prized orchid threatened by collection and forest loss."},
 {id:"3",common_name:"Rafflesia",image_path:"images/rafflesia.jpg",scientific_name:"Rafflesia schadenbergi",status:"Endangered",location:"Philippines",population:"",description:"A parasitic giant that blooms only briefly."},
 {id:"4",common_name:"Venus Flytrap",image_path:"images/venus-flytrap.jpg",scientific_name:"Dionaea muscipula",status:"Vulnerable",location:"United States",population:"Declining",description:"Native to a small region of coastal wetlands."}
];

function imgUrl(p) {
  if (!p.image_path) return "";
  if (/^images\//.test(p.image_path)) return p.image_path;   /* local file in the images folder */
  return LIVE ? sb.storage.from("plant-images").getPublicUrl(p.image_path).data.publicUrl : "";
}
/* if a photo file is missing, fall back to the placeholder */
document.addEventListener("error", function (e) { if (e.target.tagName === "IMG" && e.target.closest(".ph")) e.target.remove(); }, true);
function fig(p) {
  var u = imgUrl(p);
  return '<div class="ph">' + (u ? '<img loading="lazy" decoding="async" alt="' + esc(p.common_name) + '" src="' + esc(u) + '">' : '') + '<span>' + esc(p.common_name) + '</span></div>';
}
function setImg(id, src, alt, eager) {
  if (!src) return;
  var e = $(id), i = document.createElement("img");
  i.alt = alt; i.src = src; i.decoding = "async"; if (!eager) i.loading = "lazy";
  e.appendChild(i); e.firstElementChild.style.display = "none";
}
setImg("heroPh", C.HERO_SRC, "Plants", true); setImg("introPh", C.INTRO_SRC, "Plants"); setImg("whyPh", C.WHY_SRC, "Plants");

async function load() {
  if (!LIVE) { plants = MOCK; return; }
  var r = await sb.from("public_plants").select("*").order("approved_at", { ascending: false });
  if (r.error) { $("result").textContent = "The collection could not be loaded. Please try again later."; return; }
  plants = r.data || [];
  var s = await sb.rpc("can_submit");
  canSubmit = s.data !== false;
}

function opts(sel, label, vals) { sel.innerHTML = '<option value="">' + label + '</option>' + vals.map(function (v) { return '<option>' + esc(v) + '</option>'; }).join(""); }
function uniq(k) { return plants.map(function (p) { return p[k]; }).filter(function (v, i, a) { return v && a.indexOf(v) === i; }); }

/* ---------- featured carousel: photo + contributor only, no plant name ---------- */
var carTimer = null;
function renderFeatured() {
  var f = plants.filter(function (p) { return p.image_path; }).slice(0, 3);
  $("featured").hidden = !f.length;
  $("feat").innerHTML = f.map(function (p) {
    var who = String(p.submitter_name || "").trim() || "Anonymous";
    return '<figure class="slide"><div class="ph"><img decoding="async" alt="Featured plant photograph" src="' + esc(imgUrl(p)) + '"><span>Photograph</span></div><figcaption class="by">Contributor: ' + esc(who) + '</figcaption></figure>';
  }).join("");
  $("dots").innerHTML = f.length > 1 ? f.map(function (p, i) { return '<button type="button" aria-label="Show photo ' + (i + 1) + '"' + (i === 0 ? ' class="on"' : '') + '></button>'; }).join("") : "";
  startCarousel(f.length);
}
function startCarousel(n) {
  var tr = $("feat"), dots = $("dots").children, i = 0, busyUntil = 0, hold = false, resume = 0;
  if (carTimer) { clearInterval(carTimer); carTimer = null; }
  if (n < 2) return;
  function mark(k) { i = k; [].forEach.call(dots, function (d, j) { d.classList.toggle("on", j === k); }); }
  function go(k) {
    k = (k + n) % n; busyUntil = Date.now() + 800; mark(k);
    tr.scrollTo({ left: k * tr.clientWidth, behavior: RM ? "auto" : "smooth" });
  }
  function pause(ms) { hold = true; clearTimeout(resume); resume = setTimeout(function () { hold = false; }, ms); }
  tr.addEventListener("scroll", function () {
    if (Date.now() < busyUntil) return;
    var k = Math.round(tr.scrollLeft / tr.clientWidth); if (k !== i) mark(k);
  }, { passive: true });
  [].forEach.call(dots, function (d, j) { d.addEventListener("click", function () { go(j); pause(7000); }); });
  var box = $("car");
  box.addEventListener("pointerdown", function () { pause(7000); });
  box.addEventListener("mouseenter", function () { clearTimeout(resume); hold = true; });
  box.addEventListener("mouseleave", function () { hold = false; });
  box.addEventListener("focusin", function () { clearTimeout(resume); hold = true; });
  box.addEventListener("focusout", function () { hold = false; });
  addEventListener("resize", function () { tr.scrollTo({ left: i * tr.clientWidth, behavior: "auto" }); });
  if (!RM) carTimer = setInterval(function () { if (!hold && !document.hidden) go(i + 1); }, 4500);
}

/* ---------- contributor thank-you pop-ups ----------
   Every contributor who typed a name gets their own glass pop-up at a random spot on the first
   page. They appear one after another, stay about 5 seconds, then fade out. */
function thankContributors() {
  var hero = $("home"), layer = $("pops"); if (!hero || !layer) return;
  var seen = {}, names = [];
  plants.forEach(function (p) {
    var n = String(p.submitter_name || "").trim(), k = n.toLowerCase();
    if (n && !seen[k]) { seen[k] = 1; names.push(n); }
  });
  if (!names.length) return;
  for (var j = names.length - 1; j > 0; j--) { var r = Math.floor(Math.random() * (j + 1)), t = names[j]; names[j] = names[r]; names[r] = t; }
  names = names.slice(0, window.innerWidth < 600 ? 3 : 6);

  var placed = [], start = RM ? 600 : Math.max(0, 4500 - performance.now()), delay = start;
  names.forEach(function (name) {
    delay += 700 + Math.random() * 1100;
    setTimeout(function () { popOne(name); }, delay);
  });
  function popOne(name) {
    var el = document.createElement("div"); el.className = "pop-note";
    el.innerHTML = '<span class="toast-ic" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M12 3c5 3.4 6.6 8.4 0 18-6.6-9.6-5-14.6 0-18z"/></svg></span><div class="toast-tx"><p><b></b> is one of our contributors</p><small>Thank you for helping protect rare plants.</small></div>';
    el.querySelector("b").textContent = name;
    layer.appendChild(el);
    var W = layer.clientWidth, H = layer.clientHeight, w = el.offsetWidth, h = el.offsetHeight;
    var low = hero.querySelector(".hero-in"), reserve = low ? low.offsetHeight + 20 : 260;   /* keep clear of the title and buttons */
    var top0 = 70, top1 = Math.max(top0, H - reserve - h), x = 0, y = top0, ok = false;
    for (var tries = 0; tries < 30 && !ok; tries++) {
      x = 12 + Math.random() * Math.max(0, W - w - 24); y = top0 + Math.random() * (top1 - top0);
      ok = placed.every(function (q) { return x + w + 10 < q.x || q.x + q.w + 10 < x || y + h + 10 < q.y || q.y + q.h + 10 < y; });
    }
    if (!ok) { el.remove(); return; }
    var spot = { x: x, y: y, w: w, h: h }; placed.push(spot);
    el.style.left = x + "px"; el.style.top = y + "px";
    requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add("show"); }); });
    setTimeout(function () {
      el.classList.remove("show");
      setTimeout(function () { el.remove(); placed.splice(placed.indexOf(spot), 1); }, 800);
    }, 5000);
  }
}

/* ---------- archive grid ---------- */
function render() {
  var q = $("q").value.trim().toLowerCase(), s = $("fs").value, l = $("fl").value;
  var r = plants.filter(function (p) { return (!q || ((p.common_name || "") + " " + (p.scientific_name || "")).toLowerCase().indexOf(q) > -1) && (!s || p.status === s) && (!l || p.location === l); });
  $("result").textContent = plants.length ? r.length + " of " + plants.length + " shown" : "";
  var g = $("grid");
  g.innerHTML = r.length ? r.map(function (p) {
    return '<article class="card">' + fig(p) + '<h3>' + esc(p.common_name) + '</h3><p class="sci">' + esc(p.scientific_name) + '</p><div class="meta"><span class="tag">' + esc(sLabel(p.status)) + '</span><span>' + esc(p.location) + '</span></div><button data-id="' + esc(p.id) + '">View full details</button></article>';
  }).join("") : '<p class="empty">' + (plants.length ? "No plants match your search." : "The archive is just beginning. Be the first to contribute.") + '</p>';
  [].forEach.call(g.children, function (el, i) {
    if (firstRender) { el.classList.add("rv"); el.style.setProperty("--d", (i % 4) * 70 + "ms"); }
    else el.classList.add("pop");
  });
  if (firstRender) reveal(g);
  firstRender = false;
}
["q", "fs", "fl"].forEach(function (i) { $(i).addEventListener("input", render); });
$("grid").addEventListener("click", function (e) {
  var id = e.target.getAttribute("data-id"); if (!id) return;
  var p = plants.filter(function (x) { return x.id === id; })[0]; if (!p) return;
  $("dlg").innerHTML = fig(p) + '<div class="dlg"><h3>' + esc(p.common_name) + '</h3><p class="sci">' + esc(p.scientific_name) + '</p><dl><dt>Status</dt><dd>' + esc(sLabel(p.status)) + '</dd><dt>Location</dt><dd>' + esc(p.location) + '</dd><dt>Population</dt><dd>' + esc(p.population || "Unknown") + '</dd></dl><p>' + esc(p.description) + '</p><button class="btn" id="x">Close</button></div>';
  $("dlg").showModal(); $("x").onclick = function () { $("dlg").close(); };
});
$("dlg").addEventListener("click", function (e) { if (e.target === this) this.close(); });

/* ---------- counts ---------- */
function countUp(el, n) {
  if (RM || n < 1) { el.textContent = n; return; }
  var t0;
  function step(t) { t0 = t0 || t; var p = Math.min(1, (t - t0) / 900); el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); }
  requestAnimationFrame(step);
}
function slots() {
  var n = plants.length, full = n >= MAX;
  $("cc").textContent = n;
  var sc = $("statCount");
  if (rvIO && !RM) {
    var so = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { so.disconnect(); countUp(sc, n); } }, { threshold: 0.6 });
    so.observe(sc);
  } else sc.textContent = n;
  $("slotMsg").textContent = full ? "The collection is full. Public submissions are closed." : !canSubmit ? "Submissions are temporarily closed. Please check back soon." : n === MAX - 1 ? "Only one slot remains." : (MAX - n) + " slots remain.";
  $("openForm").disabled = full || !canSubmit;
  if (full || !canSubmit) $("formBox").hidden = true;
}
$("openForm").onclick = function () { $("formBox").hidden = false; $("fn").focus(); };
var hc = $("heroCta");
if (hc) hc.addEventListener("click", function () { if (!$("openForm").disabled) $("formBox").hidden = false; });

/* ---------- submissions ---------- */
function shrink(file) {
  return new Promise(function (res, rej) {
    var u = URL.createObjectURL(file), i = new Image();
    i.onload = function () {
      URL.revokeObjectURL(u);
      var s = Math.min(1, 1280 / Math.max(i.width, i.height)), c = document.createElement("canvas");
      c.width = Math.round(i.width * s); c.height = Math.round(i.height * s);
      c.getContext("2d").drawImage(i, 0, 0, c.width, c.height);
      c.toBlob(function (b) { b ? res(b) : rej(new Error("The photo could not be processed.")); }, "image/jpeg", 0.8);
    };
    i.onerror = function () { rej(new Error("That photo could not be read.")); };
    i.src = u;
  });
}
function say(t, bad) { var s = $("sent"); s.textContent = t; s.className = "msg " + (bad ? "err" : "ok"); }
$("form").onsubmit = async function (e) {
  e.preventDefault();
  if ($("website").value) return;                       /* honeypot */
  if (!LIVE) { say("Demo mode: add your Supabase keys to config.js to accept real submissions.", true); return; }
  var btn = $("send"), f = $("fp").files[0];
  btn.disabled = true; say("Sending…");
  try {
    if (!f || !/^image\/(jpeg|png|webp)$/.test(f.type)) throw new Error("Please attach a JPG, PNG or WebP photograph.");
    var blob = await shrink(f), path = "submissions/" + crypto.randomUUID() + ".jpg";
    var up = await sb.storage.from("plant-images").upload(path, blob, { contentType: "image/jpeg", cacheControl: "31536000" });
    if (up.error) throw up.error;
    var v = function (id) { return $(id).value.trim() || null; };
    var ins = await sb.from("plants").insert({ common_name: v("fn"), scientific_name: v("fs2"), status: $("fst").value, location: v("floc"), population: v("fpop"), description: v("fd"), image_path: path, submitter_name: v("fyn"), submitter_email: v("fem") });
    if (ins.error) throw ins.error;
    $("form").reset();
    say("Thank you. Your submission is pending administrator approval and will appear only once approved.");
  } catch (err) {
    say(err && err.code === "42501" ? "Submissions are currently closed." : (err && err.message) || "Something went wrong. Please try again.", true);
  }
  btn.disabled = false;
};

/* active nav */
var links = document.querySelectorAll("nav a"), map = { home: 0, explore: 1, contribute: 2, why: 3 };
if ("IntersectionObserver" in window) {
  var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { var k = map[en.target.id]; links.forEach(function (a, i) { a.classList.toggle("on", i === k); }); } }); }, { rootMargin: "-45% 0px -50% 0px" });
  ["home", "explore", "contribute", "why"].forEach(function (i) { io.observe($(i)); });
}
/* fit the closing quote to one line */
var qp = document.querySelector(".closing p"), qb = qp.parentNode;
function fit() {
  if (window.innerWidth < 600) { qp.style.fontSize = ""; return; }
  var cs = getComputedStyle(qb), w = qb.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  qp.style.fontSize = "100px"; qp.style.fontSize = (100 * w / qp.scrollWidth) + "px";
}
fit(); addEventListener("resize", fit);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);

load().then(function () {
  $("fs").innerHTML = '<option value="">All statuses</option>' + uniq("status").sort(function (a, b) { return sRank(a) - sRank(b); }).map(function (v) { return '<option value="' + esc(v) + '">' + esc(sLabel(v)) + '</option>'; }).join(""); opts($("fl"), "All locations", uniq("location"));
  renderFeatured(); render(); slots(); thankContributors();
});
})();
