(function () {
"use strict";
var C = window.AE_CONFIG || {};
function $(i) { return document.getElementById(i); }
function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
if (!(C.SUPABASE_URL && C.SUPABASE_ANON_KEY && window.supabase)) { $("loginMsg").textContent = "Add your Supabase URL and anon key to config.js first."; return; }
var sb = window.supabase.createClient(C.SUPABASE_URL, C.SUPABASE_ANON_KEY), rows = [], tab = "pending";
var STATUS = ["Critically Endangered", "Endangered", "Vulnerable", "Near Threatened", "Least Concern", "Extinct in the Wild", "Extinct", "Data Deficient", "Not Evaluated"];

function flash(t) { var f = $("flash"); f.textContent = t; f.hidden = !t; }
function show(on) { $("login").hidden = on; $("panel").hidden = !on; }
async function gate() {
  var s = (await sb.auth.getSession()).data.session;
  if (!s) { show(false); return; }
  var a = await sb.rpc("is_admin");
  if (a.data !== true) { await sb.auth.signOut(); $("loginMsg").textContent = "This account does not have admin access."; show(false); return; }
  show(true); load();
}
$("loginForm").onsubmit = async function (e) {
  e.preventDefault(); $("loginMsg").textContent = "";
  var r = await sb.auth.signInWithPassword({ email: $("em").value.trim(), password: $("pw").value });
  if (r.error) { $("loginMsg").textContent = "Sign in failed. Check your email and password."; return; }
  $("pw").value = ""; gate();
};
$("out").onclick = async function () { await sb.auth.signOut(); show(false); };

async function load() {
  var r = await sb.from("plants").select("*").order("created_at", { ascending: false });
  if (r.error) { flash(r.error.message); return; }
  rows = r.data; render();
}
function imgUrl(p) { return p.image_path ? sb.storage.from("plant-images").getPublicUrl(p.image_path).data.publicUrl : ""; }
function render() {
  var n = function (s) { return rows.filter(function (p) { return p.state === s; }).length; };
  $("tally").textContent = "Approved " + n("approved") + " / 50 · Pending " + n("pending");
  [].forEach.call($("tabs").children, function (b) { b.classList.toggle("on", b.dataset.t === tab); });
  var list = rows.filter(function (p) { return p.state === tab; });
  $("list").innerHTML = list.length ? list.map(function (p) {
    var u = imgUrl(p), b = function (a, label, cls) { return '<button class="btn ' + cls + '" data-a="' + a + '" data-id="' + p.id + '">' + label + '</button>'; };
    var acts = p.state === "pending" ? b("approved", "Approve", "sm") + b("rejected", "Reject", "alt") : p.state === "approved" ? b("pending", "Unpublish", "alt") : b("pending", "Restore", "alt");
    return '<article class="row"><div class="ph th">' + (u ? '<img loading="lazy" alt="" src="' + esc(u) + '">' : '<span>No photo</span>') + '</div><div><h3>' + esc(p.common_name) + '</h3><p class="sci">' + esc(p.scientific_name) + '</p><p>' + esc(p.status) + ' · ' + esc(p.location) + ' · ' + esc(p.population || "population unknown") + '</p><p>' + esc(p.description) + '</p><p class="small">By ' + esc(p.submitter_name || "anonymous") + (p.submitter_email ? ' (' + esc(p.submitter_email) + ')' : '') + ' · ' + new Date(p.created_at).toLocaleDateString() + '</p></div><div class="acts">' + acts + b("edit", "Edit", "alt") + b("delete", "Delete", "danger") + '</div></article>';
  }).join("") : '<p class="lead">Nothing here.</p>';
}
$("tabs").onclick = function (e) { if (e.target.dataset.t) { tab = e.target.dataset.t; flash(""); render(); } };

async function setState(id, state) {
  var r = await sb.from("plants").update({ state: state }).eq("id", id);
  if (r.error) { flash(/collection_full/.test(r.error.message) ? "The collection already has 50 approved plants. Unpublish one first." : r.error.message); return; }
  flash(""); load();
}
async function del(p) {
  if (!confirm("Permanently delete \"" + p.common_name + "\" and its photo?")) return;
  if (p.image_path) await sb.storage.from("plant-images").remove([p.image_path]);
  var r = await sb.from("plants").delete().eq("id", p.id);
  if (r.error) { flash(r.error.message); return; }
  flash(""); load();
}
function edit(p) {
  var f = function (id, label, val, tag) { return '<div class="field"><label for="e_' + id + '">' + label + '</label>' + (tag === "ta" ? '<textarea id="e_' + id + '" rows="4" maxlength="1500">' + esc(val) + '</textarea>' : '<input id="e_' + id + '" value="' + esc(val) + '" maxlength="160">') + '</div>'; };
  $("edit").innerHTML = '<form class="dlg" id="ef"><h3>Edit entry</h3>' + f("cn", "Common name", p.common_name) + f("sn", "Scientific name", p.scientific_name) +
    '<div class="field"><label for="e_st">Status</label><select id="e_st">' + STATUS.map(function (s) { return '<option' + (s === p.status ? " selected" : "") + '>' + s + '</option>'; }).join("") + '</select></div>' +
    f("lo", "Location", p.location) + f("po", "Population", p.population) + f("de", "Description", p.description, "ta") +
    '<button class="btn" type="submit">Save</button> <button class="btn alt" type="button" id="ec">Cancel</button><p class="msg err" id="em2"></p></form>';
  $("edit").showModal(); $("ec").onclick = function () { $("edit").close(); };
  $("ef").onsubmit = async function (e) {
    e.preventDefault();
    var v = function (id) { return $(id).value.trim() || null; };
    var r = await sb.from("plants").update({ common_name: v("e_cn"), scientific_name: v("e_sn"), status: $("e_st").value, location: v("e_lo"), population: v("e_po"), description: v("e_de") }).eq("id", p.id);
    if (r.error) { $("em2").textContent = r.error.message; return; }
    $("edit").close(); load();
  };
}
$("list").onclick = function (e) {
  var a = e.target.dataset.a, id = e.target.dataset.id; if (!a) return;
  var p = rows.filter(function (x) { return x.id === id; })[0];
  if (a === "edit") edit(p); else if (a === "delete") del(p); else setState(id, a);
};
gate();
})();
