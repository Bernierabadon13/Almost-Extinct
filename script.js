(function () {
"use strict";
var C = window.AE_CONFIG || {}, MAX = 50;
var LIVE = !!(C.SUPABASE_URL && C.SUPABASE_ANON_KEY && window.supabase);
var sb = LIVE ? window.supabase.createClient(C.SUPABASE_URL, C.SUPABASE_ANON_KEY) : null;
var plants = [], canSubmit = true;
function $(i) { return document.getElementById(i); }
function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }

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

function renderFeatured() {
  var f = plants.slice().sort(function (a, b) { return !!b.image_path - !!a.image_path; }).slice(0, 3);
  $("featured").hidden = !f.length;
  $("feat").innerHTML = f.map(function (p) {
    return '<article class="fp">' + fig(p) + '<h3>' + esc(p.common_name) + '</h3><p class="sci">' + esc(p.scientific_name) + '</p><div class="meta"><span class="tag">' + esc(p.status) + '</span><span>' + esc(p.population) + '</span></div></article>';
  }).join("");
}
function render() {
  var q = $("q").value.trim().toLowerCase(), s = $("fs").value, l = $("fl").value;
  var r = plants.filter(function (p) { return (!q || ((p.common_name || "") + " " + (p.scientific_name || "")).toLowerCase().indexOf(q) > -1) && (!s || p.status === s) && (!l || p.location === l); });
  $("result").textContent = plants.length ? r.length + " of " + plants.length + " shown" : "";
  $("grid").innerHTML = r.length ? r.map(function (p) {
    return '<article class="card">' + fig(p) + '<h3>' + esc(p.common_name) + '</h3><p class="sci">' + esc(p.scientific_name) + '</p><div class="meta"><span class="tag">' + esc(p.status) + '</span><span>' + esc(p.location) + '</span></div><button data-id="' + esc(p.id) + '">View full details</button></article>';
  }).join("") : '<p class="empty">' + (plants.length ? "No plants match your search." : "The archive is just beginning. Be the first to contribute.") + '</p>';
}
["q", "fs", "fl"].forEach(function (i) { $(i).addEventListener("input", render); });
$("grid").addEventListener("click", function (e) {
  var id = e.target.getAttribute("data-id"); if (!id) return;
  var p = plants.filter(function (x) { return x.id === id; })[0]; if (!p) return;
  $("dlg").innerHTML = fig(p) + '<div class="dlg"><h3>' + esc(p.common_name) + '</h3><p class="sci">' + esc(p.scientific_name) + '</p><dl><dt>Status</dt><dd>' + esc(p.status) + '</dd><dt>Location</dt><dd>' + esc(p.location) + '</dd><dt>Population</dt><dd>' + esc(p.population || "Unknown") + '</dd></dl><p>' + esc(p.description) + '</p><button class="btn" id="x">Close</button></div>';
  $("dlg").showModal(); $("x").onclick = function () { $("dlg").close(); };
});
$("dlg").addEventListener("click", function (e) { if (e.target === this) this.close(); });

function slots() {
  var n = plants.length, full = n >= MAX;
  $("cc").textContent = n; $("statCount").textContent = n;
  $("slotMsg").textContent = full ? "The collection is full. Public submissions are closed." : !canSubmit ? "Submissions are temporarily closed. Please check back soon." : n === MAX - 1 ? "Only one slot remains." : (MAX - n) + " slots remain.";
  $("openForm").disabled = full || !canSubmit;
  if (full || !canSubmit) $("formBox").hidden = true;
}
$("openForm").onclick = function () { $("formBox").hidden = false; $("fn").focus(); };

function shrink(file) {
  return new Promise(function (res, rej) {
    var u = URL.createObjectURL(file), i = new Image();
    i.onload = function () {
      URL.revokeObjectURL(u);
      var s = Math.min(1, 1600 / Math.max(i.width, i.height)), c = document.createElement("canvas");
      c.width = Math.round(i.width * s); c.height = Math.round(i.height * s);
      c.getContext("2d").drawImage(i, 0, 0, c.width, c.height);
      c.toBlob(function (b) { b ? res(b) : rej(new Error("The photo could not be processed.")); }, "image/jpeg", 0.82);
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
  opts($("fs"), "All statuses", uniq("status")); opts($("fl"), "All locations", uniq("location"));
  renderFeatured(); render(); slots();
});
})();
