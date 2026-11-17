/* Released AP free-response questions, kept on Z-Math:
   1) official PDFs open in a viewer window on the page (the file still comes from its original site);
   2) "Z-Math version": an original AP-style question of the same type, with a scoring guide, worked solution and new numbers on demand.
   Loads in the book page after zbook.js, the book content, apexam/core.js and the course FRQ templates. */
(function(){
"use strict";
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const css=`.zrv{position:fixed;inset:0;z-index:1000;background:rgba(17,24,39,.6);display:flex;align-items:stretch;justify-content:center;padding:10px}
.zrv-box{background:#fff;border-radius:14px;width:100%;max-width:980px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,.35)}
.zrv-bar{display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:8px 10px;background:#111827;color:#fff;font:600 15px system-ui}
.zrv-bar .tt{flex:1;min-width:160px}.zrv-bar button,.zrv-bar a{font:600 13px system-ui;border-radius:999px;padding:5px 12px;border:1.5px solid #fff;background:transparent;color:#fff;cursor:pointer;text-decoration:none}
.zrv-bar .x{background:#fff;color:#111}.zrv iframe{flex:1;border:0;width:100%;background:#f3f4f6}
.zrv-body{flex:1;overflow:auto;hyphens:none;-webkit-hyphens:none;padding:14px 16px;font:16px/1.55 system-ui;color:#111}.zrv-body .note{font-size:.85rem;color:#555}
.zrv-body textarea{width:100%;min-height:90px;font:15px system-ui;border:1.5px solid #c9c4b8;border-radius:10px;padding:8px;box-sizing:border-box}
.zrv-part{border-top:1px dashed #d6d1c4;padding:10px 0}.zrv-pt{border:1px solid #e5e7eb;border-radius:10px;padding:8px 10px;margin:6px 0;background:#fafafa}
.zrv-pt .e{color:#166534}.zrv-pt .n{color:#991b1b}.zrv-pt .w{color:#b45309;font-weight:600}.zrv-sg{display:none}.zrv-show .zrv-sg{display:block}
.zrv-score{font:700 15px system-ui;background:#eef2ff;border-radius:10px;padding:8px 12px;margin:10px 0}
.zrv-body .tb,.zrv-body .fq-tb{border-collapse:collapse;margin:6px 0}.zrv-body .tb td,.zrv-body .tb th{border:1px solid #d6d1c4;padding:4px 8px;text-align:center}.zrv-body .tb th{background:#f1efe9}
.zrv-body .zplot{max-width:420px;margin:8px auto;border:1px solid #e5e7eb;border-radius:10px;padding:6px}.zrv-body .zplot .cap{text-align:center;font-size:.85rem;color:#555}
.zrv-btn{font:600 14px system-ui;border-radius:999px;padding:6px 14px;border:1.5px solid #111;background:#111;color:#fff;cursor:pointer;margin:4px 6px 4px 0}.zrv-btn.l{background:#fff;color:#111}
.rl-b.zm{border-color:#b45309;color:#b45309;background:#fff;cursor:pointer;font-family:inherit}.rl-b.zm:hover{background:#b45309;color:#fff}`;
const st=document.createElement("style"); st.textContent=css; document.head.appendChild(st);

function shell(title,inner,extra){ document.querySelectorAll(".zrv").forEach(x=>x.remove()); const d=document.createElement("div"); d.className="zrv";
 d.innerHTML=`<div class="zrv-box"><div class="zrv-bar"><span class="tt">${title}</span>${extra||""}<button class="x">Close ✕</button></div>${inner}</div>`;
 document.body.appendChild(d); document.documentElement.style.overflow="hidden";
 const close=()=>{ d.remove(); document.documentElement.style.overflow=""; };
 d.querySelector(".x").onclick=close; d.addEventListener("click",e=>{ if(e.target===d) close(); });
 document.addEventListener("keydown",function k(e){ if(e.key==="Escape"){ close(); document.removeEventListener("keydown",k); } }); return d; }

/* ---------- 1) PDF viewer ---------- */
const gv=u=>"https://docs.google.com/viewer?embedded=true&url="+encodeURIComponent(u);
function openPDF(url,label){
 const d=shell(esc(label)+' <span style="font-weight:400;opacity:.75">· official PDF</span>',`<iframe title="${esc(label)}" src="${gv(url)}"></iframe>`,
  `<button class="rl">Reload</button><a href="${esc(url)}" target="_blank" rel="noopener">Open original ↗</a>`);
 d.querySelector(".rl").onclick=()=>{ const f=d.querySelector("iframe"); f.src=gv(url)+"&r="+Date.now(); }; }
document.addEventListener("click",e=>{ const a=e.target.closest("a.rl-b"); if(!a||e.ctrlKey||e.metaKey||e.shiftKey) return; const h=a.getAttribute("href")||""; if(!/^https?:/.test(h)) return;
 e.preventDefault(); const row=a.closest("tr"); const ex=row?row.querySelector(".rl-ex"):null; openPDF(h,(ex?ex.textContent.replace(/(No calculator|Calculator)$/,"").trim()+" · ":"")+a.textContent.trim()); },true);

/* ---------- 2) Z-Math versions ---------- */
const isCalcQ=(y,q)=>{ const n=parseInt(y); return n>=2011?q<=2:q<=3; };
function kind(t){ t=String(t);
 const R=[["polar",/polar/i],["param",/parametric|vector|plane|xy-plane/i],["series",/series|taylor|maclaurin|convergen|power|lagrange|error bound|polynomial approx/i],["logistic",/logistic|euler/i],["de",/differential equation|slope field|separa|\bDE\b/i],["rr",/related|cone|ladder|balloon|shadow|conical|trough/i],["implicit",/implicit|curve given|tangent line to the curve/i],
  ["fprime",/derivative graph|graph of f′|from f′|f′ graph/i],["piecewise",/piecewise|continuity|differentiab/i],["graph",/graph of|accumulation function|integral-defined|integral function|piecewise|defined by an integral|g\(x\)|function g/i],["motion",/particle|velocity|motion|position|train|runner|rocket|bike|cyclist/i],["areavol",/area|volume|region|solid/i],
  ["table",/table|tabular|riemann|trapez|estimate|average value|temperature|density|blood/i],["rates",/rate|flow|enter|leav|tank|water|people|accumulat|traffic|snow|sand|gallons|entries|species/i]];
 const r=R.find(r=>r[1].test(t)); return r?r[0]:"analysis"; }
const LBL={rates:"Rates in context",motion:"Particle motion",areavol:"Area and volume",table:"Data in a table",graph:"Graphical analysis",implicit:"Implicit differentiation",de:"Differential equations",rr:"Related rates",param:"Parametric and vector motion",polar:"Polar curves",series:"Taylor series",fprime:"Graph of f′",piecewise:"Continuity and differentiability",analysis:"Function analysis",logistic:"Logistic growth and Euler's method",q1:"Function Concepts",q2:"Modeling a Non-Periodic Context",q3:"Modeling a Periodic Context",q4:"Symbolic Manipulations"};
function pickTemplate(course,x){
 if(course==="pc"){ const s=Math.min(4,Math.max(1,+x.q||1)), L=ZX.frq.pc[s]; return {k:"q"+s,calc:s<=2,f:L[Math.floor(Math.random()*L.length)]}; }
 const F=course==="bc"?ZX.frq.bc:ZX.frq.ab, calc=isCalcQ(x.y,x.q); let k=kind(x.t);
 if(course==="ab"&&/series|logistic|param|polar/.test(k)) k="graph";
 const A=F.A, B=F.B, map={rates:[A[0]],areavol:[A[2]],motion:[calc?A[1]:B[4]],table:[calc?A[3]:B[1]],graph:[B[0]],implicit:[B[2]],de:[B[3]],rr:[B[5]],fprime:[B[8]],piecewise:[B[7]],analysis:[B[6]],
  param:[calc?(F.Abc||[])[0]:(F.Bbc||[])[1]],polar:[(F.Abc||[])[1]],series:[(F.S||[])[/converg|interval|ratio|power/i.test(x.t)?1:0]],logistic:[(F.Bbc||[])[0]]};
 const f=(map[k]||[B[0]])[0]||B[0]; const calcT=/^(rates|areavol|polar)$/.test(k)||(/^(motion|table|param)$/.test(k)&&calc);
 return {k,calc:calcT,f}; }
const RNG=()=>ZX.rng(1+Math.floor(Math.random()*2e9));
function build(t){ for(let i=0;i<30;i++){ try{ const q=t.f(RNG(),ZX.H); if(q) return q; }catch(e){} } return null; }
const test=(c,s)=>typeof c==="function"?c(s):new RegExp(c.source||c,"i").test(s);
function openZM(x){
 const course=ZC.relKey, t=pickTemplate(course,x), q=build(t); if(!q){ alert("Could not build this question. Please try again."); return; }
 let id=0; q.parts.forEach(p=>p.pts.forEach(pt=>{ pt.k="p"+(id++); pt.v=pt.v||1; })); const max=q.parts.reduce((s,p)=>s+p.pts.reduce((a,b)=>a+b.v,0),0);
 const tag=t.calc?'<b style="color:#991b1b">Graphing calculator required</b>':'<b>No calculator</b>';
 const body=`<div class="zrv-body"><p class="note">An original Z-Math question of the same type as ${esc(x.y)} Question ${x.q} (${esc(x.t)}). It is not the College Board question: the setting and numbers are new each time. ${tag} · ${max} points.</p>
  <h3 style="margin:.3em 0">${esc(q.title)}</h3><div>${q.stem}</div>
  ${q.parts.map(p=>`<div class="zrv-part"><p><b>(${p.id})</b> ${p.q}</p><textarea data-p="${p.id}" placeholder="Show your setup and work, then your answer."></textarea>
   <div class="zrv-sg">${p.pts.map(pt=>`<div class="zrv-pt"><label><input type="checkbox" data-k="${pt.k}" data-v="${pt.v}"> <b>${esc(pt.t)}</b> (${pt.v} pt${pt.v>1?"s":""})</label><div class="e"><b>Earns the point:</b> ${pt.earn}</div>${pt.not?`<div class="n"><b>Does not earn the point:</b> ${pt.not}</div>`:""}<div class="chk" data-c="${pt.k}"></div></div>`).join("")}
   <details><summary><b>Model solution for (${p.id})</b></summary><div>${p.model}</div></details></div></div>`).join("")}
  <div class="zrv-score" id="zrvS" style="display:none">Your score: <span>0</span> / ${max}</div>
  <button class="zrv-btn" id="zrvG">Check my answers & show the scoring guide</button><button class="zrv-btn l" id="zrvN">⟳ New version</button></div>`;
 const d=shell(`Z-Math version · ${esc(LBL[t.k]||"AP-style question")}`,body,"");
 d.querySelector("#zrvN").onclick=()=>openZM(x);
 const upd=()=>{ let s=0; d.querySelectorAll("[data-k]").forEach(c=>{ if(c.checked) s+=+c.dataset.v; }); d.querySelector("#zrvS span").textContent=s; };
 d.querySelectorAll("[data-k]").forEach(c=>c.onchange=upd);
 d.querySelector("#zrvG").onclick=()=>{ d.querySelector(".zrv-body").classList.add("zrv-show"); d.querySelector("#zrvS").style.display="block";
  q.parts.forEach(p=>{ const txt=d.querySelector(`textarea[data-p="${p.id}"]`).value; p.pts.forEach(pt=>{ const box=d.querySelector(`[data-c="${pt.k}"]`), cb=d.querySelector(`[data-k="${pt.k}"]`);
   if(!txt.trim()){ box.innerHTML='<span class="n">✕ No answer written for this part.</span>'; cb.checked=false; cb.disabled=true; return; }
   box.innerHTML=(pt.need||[]).filter(([c])=>!test(c,txt)).map(([,m])=>`<div class="w">⚠ Check: ${m}</div>`).join(""); }); });
  d.querySelector("#zrvG").textContent="Scoring guide shown: tick each point you earned"; upd(); };
}
window.ZRV={btn:x=>`<button type="button" class="rl-b zm" data-zv="${esc(JSON.stringify({y:x.y,q:x.q,t:x.t}))}">Z-Math version</button>`};
document.addEventListener("click",e=>{ const b=e.target.closest("[data-zv]"); if(!b) return; e.preventDefault(); openZM(JSON.parse(b.dataset.zv)); });
})();
