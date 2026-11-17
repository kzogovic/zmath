/* Z-Physics engine: shared by Z-AP Physics 1, 2, C: Mechanics and C: E&M.
   Course files register a course with ZP.course({...}); question banks register generators with ZP.add(on, lvl, topic, fn)
   and free-response templates with ZP.frq({on, type, title, gen}). `on` is a list of "course:unit" keys, e.g. ["p1:1","cm:1"]. */
(function(){
"use strict";
const ZP=window.ZP={C:{},B:[],F:[]};
const E=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
ZP.E=E;

/* ---------- numbers ---------- */
const SUP={"-":"⁻","0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹"};
function fmt(v,sf=3){ if(typeof v!=="number") return String(v); if(!isFinite(v)) return "undefined"; if(v===0) return "0";
 const a=Math.abs(v); const sup=n=>String(n).split("").map(c=>SUP[c]).join("");
 if(a>=1e5||a<1e-3){ let e=Math.floor(Math.log10(a)); let ms=(v/10**e).toPrecision(sf); if(Math.abs(+ms)>=10){ e++; ms=(v/10**e).toPrecision(sf); } return ms.replace(/^-/,"−")+" × 10"+sup(e); }
 let s=v.toPrecision(sf); if(s.includes("e")) s=String(+s); return s.replace(/^-/,"−"); }
ZP.fmt=fmt;
ZP.R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
ZP.P=a=>a[Math.floor(Math.random()*a.length)];
ZP.r=(a,b,d=1)=>+(a+Math.random()*(b-a)).toFixed(d);
ZP.SH=a=>{ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
ZP.g=9.8;
ZP.FR=(n,d)=>`<span class="zf"><span>${n}</span><span>${d}</span></span>`;

/* ---------- registration ---------- */
ZP.course=c=>{ ZP.C[c.id]=c; };
ZP.add=(on,lvl,topic,fn)=>ZP.B.push({on,lvl,topic,fn});
ZP.frq=f=>ZP.F.push(f);
/* conceptual question: items [topic, question, answer, [[wrong, why]x3], [steps]] */
ZP.cq=(on,lvl,items)=>items.forEach(([topic,q,a,dis,steps,fig])=>ZP.add(on,lvl,topic,()=>({q,a,dis,steps:Array.isArray(steps)?steps:[steps],fig})));
const key=(c,u)=>c+":"+u;

/* build a multiple-choice question from a generator.
   gen returns {q, a (number|string), u (unit text), sf, dis:[[value, why]], steps:[...], fig} */
function make(t,tries=40){ for(let k=0;k<tries;k++){ let g; try{ g=t.fn(); }catch(e){ if(window.ZP_DEBUG) console.error(t.topic,e); g=null; } if(!g) continue;
  const sf=g.sf||3, unit=g.u?(" "+g.u):"", F=v=>typeof v==="number"?fmt(v,sf)+unit:String(v);
  const ans=F(g.a), seen=new Set([ans]), dis=[];
  for(const [v,why] of g.dis||[]){ if(typeof v==="number"&&(!isFinite(v))) continue; const s=F(v); if(!seen.has(s)){ seen.add(s); dis.push([s,why]); } if(dis.length===3) break; }
  if(dis.length<3) continue;
  const ch=ZP.SH([[ans,""],...dis]); return {lvl:t.lvl,topic:t.topic,q:g.q,fig:g.fig||"",ch:ch.map(c=>c[0]),why:ch.map(c=>c[1]),ai:ch.findIndex(c=>c[0]===ans),steps:g.steps||[],num:typeof g.a==="number"?g.a:null}; }
 return null; }
ZP.make=make;
ZP.pool=(c,u,lvls)=>ZP.B.filter(t=>t.on.includes(key(c,u))&&(!lvls||lvls.includes(t.lvl)));
function pick(c,units,lvls,n){ const pool=ZP.B.filter(t=>units.some(u=>t.on.includes(key(c,u)))&&(!lvls||lvls.includes(t.lvl))); const out=[], used=new Map(); let guard=0;
 while(out.length<n&&guard++<500&&pool.length){ const t=pool[Math.floor(Math.random()*pool.length)]; const k=t.topic+t.lvl; if((used.get(k)||0)>=(guard>300?3:1)) continue; const q=make(t); if(q){ used.set(k,(used.get(k)||0)+1); q.u=units.find(u=>t.on.includes(key(c,u))); out.push(q); } }
 return out; }
ZP.pick=pick;

/* ---------- styles ---------- */
const css=`
:root{--ink:#111;--muted:#555;--line:#e3e0d8;--paper:#fffdf8}
*{box-sizing:border-box}body{margin:0;background:#fbfaf6;color:var(--ink);font:17px/1.55 system-ui,-apple-system,"Segoe UI",sans-serif}
.zt{max-width:1000px;margin:0 auto;padding:12px 16px 0;display:flex;flex-wrap:wrap;gap:8px}
.zt a{color:#111;font-weight:600;text-decoration:none;border:1.5px solid #111;border-radius:999px;padding:4px 14px;font-size:15px;background:#fff}
.zh{text-align:center;padding:22px 16px 10px}.zh .w{max-width:860px;margin:0 auto;border-top:3px double #111;border-bottom:3px double #111;padding:18px 10px 14px}
.zh .k{text-transform:uppercase;letter-spacing:.3em;font-size:12px;margin:0 0 8px}.zh h1{font:800 clamp(34px,7vw,56px)/1.05 "EB Garamond",Georgia,serif;margin:0 0 6px}.zh p{margin:0 auto;font:italic 18px/1.45 "EB Garamond",Georgia,serif;color:#333;max-width:640px}
.zn{position:sticky;top:0;z-index:20;background:#fbfaf6ee;backdrop-filter:blur(6px);border-bottom:1px solid var(--line)}.zn .w{max-width:1000px;margin:0 auto;padding:8px 12px;display:flex;gap:6px;overflow-x:auto;scrollbar-width:thin}
.zn a{flex:none;text-decoration:none;color:#111;border:1.5px solid #c9c4b8;border-radius:999px;padding:5px 12px;font:600 14px system-ui;background:#fff;white-space:nowrap}.zn a.on{background:var(--c);border-color:var(--c);color:#fff}
main.zm{max-width:1000px;margin:0 auto;padding:16px 14px 70px}
h2.zt2{font:800 30px/1.15 "EB Garamond",Georgia,serif;margin:6px 0 4px}.zsub{color:var(--muted);margin:0 0 12px}
.zcard{background:#fff;border:1px solid var(--line);border-radius:14px;padding:12px 16px;margin:10px 0}
.zgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:10px}
.zu{display:block;text-decoration:none;color:inherit;background:#fff;border:1px solid var(--line);border-left:6px solid var(--c);border-radius:14px;padding:10px 14px}.zu b{display:block;font-size:17px}.zu span{font-size:14px;color:var(--muted)}
.ztabs{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0 12px}.ztabs button,.zbtn{font:600 14px system-ui;border:1.5px solid #1f2937;background:#fff;color:#1f2937;border-radius:999px;padding:6px 13px;cursor:pointer}
.ztabs button[aria-pressed="true"],.zbtn.dark{background:#1f2937;color:#fff}.zbtn:disabled{opacity:.45}
.zq{background:#fff;border:1px solid var(--line);border-radius:14px;padding:12px 14px;margin:10px 0}
.zqh{display:flex;flex-wrap:wrap;gap:6px;align-items:center;font:600 13px system-ui;color:#555;margin-bottom:6px}.ztag{border-radius:999px;padding:2px 9px;background:#eef2ff;color:#3730a3}.ztag.l1{background:#dcfce7;color:#166534}.ztag.l2{background:#fef3c7;color:#92400e}.ztag.l3{background:#fee2e2;color:#991b1b}
.zch{display:grid;gap:6px;margin:8px 0}.zch button{display:flex;gap:10px;text-align:left;font:16px system-ui;background:#faf9f6;border:1.5px solid #d6d1c4;border-radius:10px;padding:8px 10px;cursor:pointer;color:#111}
.zch button b{min-width:18px}.zch button.sel{border-color:#1d4ed8;background:#eff6ff}.zch button.ok{border-color:#16a34a;background:#f0fdf4}.zch button.no{border-color:#dc2626;background:#fef2f2}
.zex{border-left:4px solid var(--c);background:#f8fafc;border-radius:0 10px 10px 0;padding:8px 12px;margin-top:8px;font-size:16px}.zex ol{margin:4px 0 4px 20px;padding:0}.zex li{margin:3px 0}
.zv{font-weight:700}.zv.ok{color:#166534}.zv.no{color:#991b1b}
.zf{display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;font-size:.88em;line-height:1.15;margin:0 .15em}.zf span+span{border-top:1.3px solid currentColor}
.zfig{margin:8px auto;max-width:420px;background:#fff;border:1px solid var(--line);border-radius:10px;padding:6px}.zfig svg{display:block;margin:0 auto;max-width:100%}.zfig .cap{text-align:center;font-size:13px;color:#555}
table.zt3{border-collapse:collapse;margin:6px 0;font-size:15px;background:#fff}table.zt3 td,table.zt3 th{border:1px solid #d6d1c4;padding:4px 9px;text-align:center}table.zt3 th{background:#f1efe9}
.zscore{font:700 18px system-ui;background:#eef2ff;border-radius:12px;padding:10px 14px;margin:10px 0}
.zdeck{max-width:560px}.zcardf{min-height:160px;border-radius:16px;border:2px solid var(--c);background:#fff;display:flex;align-items:center;justify-content:center;text-align:center;padding:18px;font:600 20px/1.4 system-ui;cursor:pointer;margin:8px 0}.zcardf.back{font:500 17px/1.5 system-ui;background:#f8fafc}
.zfr textarea{width:100%;min-height:120px;font:16px system-ui;border:1.5px solid #c9c4b8;border-radius:10px;padding:8px}
.zpt{border:1px solid #e5e7eb;border-radius:10px;padding:6px 10px;margin:6px 0;background:#fafafa;font-size:15px}.zpt .e{color:#166534}.zpt .n{color:#991b1b}.zpt .w{color:#b45309;font-weight:600}
.zref h3{margin:16px 0 6px;font:700 19px system-ui;border-bottom:2px solid var(--c);padding-bottom:3px}.zref table{width:100%;border-collapse:collapse;font-size:15.5px}.zref td{border-bottom:1px solid #eee;padding:5px 6px;vertical-align:top}.zref td:first-child{white-space:nowrap;font-family:"Cambria Math","STIX Two Math",Georgia,serif;font-size:17px}
.zcalc td:first-child{font-weight:600}.zcalc code,.zkey{background:#f1f5f9;border:1px solid #e2e8f0;border-radius:6px;padding:1px 6px;font:14px ui-monospace,Menlo,monospace;white-space:nowrap}
.zlist li{margin:4px 0}.zhint{font-size:14px;color:#555}
details.zd{background:#fff;border:1px solid var(--line);border-radius:12px;padding:8px 12px;margin:8px 0}details.zd summary{cursor:pointer;font-weight:700}
@media print{.zn,.zt,.ztabs{display:none}}
`;
const st=document.createElement("style"); st.textContent=css; document.head.appendChild(st);

/* ---------- small SVG helpers for figures ---------- */
ZP.svg=(w,h,body,cap)=>`<div class="zfig"><svg viewBox="0 0 ${w} ${h}" width="${w}">${body}</svg>${cap?`<div class="cap">${cap}</div>`:""}</div>`;
ZP.graph=function(o){ /* {xmin,xmax,ymin,ymax,xs,ys,pts:[[x,y]] or f, xl,yl, dots} */ const W=360,H=240,L=44,R=W-12,T=12,B=H-34;
 const X=v=>L+(v-o.xmin)/(o.xmax-o.xmin)*(R-L), Y=v=>B-(v-o.ymin)/(o.ymax-o.ymin)*(B-T); let s="";
 for(let v=o.xmin;v<=o.xmax+1e-9;v+=o.xs) s+=`<line x1="${X(v)}" y1="${T}" x2="${X(v)}" y2="${B}" stroke="#e5e7eb"/><text x="${X(v)}" y="${B+15}" font-size="11" text-anchor="middle">${+v.toFixed(3)}</text>`;
 for(let v=o.ymin;v<=o.ymax+1e-9;v+=o.ys) s+=`<line x1="${L}" y1="${Y(v)}" x2="${R}" y2="${Y(v)}" stroke="#e5e7eb"/><text x="${L-5}" y="${Y(v)+4}" font-size="11" text-anchor="end">${+v.toFixed(3)}</text>`;
 if(o.ymin<0&&o.ymax>0) s+=`<line x1="${L}" y1="${Y(0)}" x2="${R}" y2="${Y(0)}" stroke="#111"/>`;
 s+=`<line x1="${L}" y1="${B}" x2="${R}" y2="${B}" stroke="#111"/><line x1="${L}" y1="${T}" x2="${L}" y2="${B}" stroke="#111"/>`;
 const pts=o.pts||Array.from({length:121},(_,i)=>{ const x=o.xmin+(o.xmax-o.xmin)*i/120; return [x,o.f(x)]; });
 s+=`<path d="${pts.map(([x,y],i)=>(i?"L":"M")+X(x).toFixed(1)+","+Y(y).toFixed(1)).join(" ")}" fill="none" stroke="#1d4ed8" stroke-width="2.4"/>`;
 (o.dots||[]).forEach(([x,y])=>s+=`<circle cx="${X(x)}" cy="${Y(y)}" r="3.5" fill="#1d4ed8"/>`);
 s+=`<text x="${R}" y="${B-5}" font-size="12" text-anchor="end" font-style="italic">${o.xl||"t (s)"}</text><text x="${L+5}" y="${T+10}" font-size="12" font-style="italic">${o.yl||""}</text>`;
 return `<div class="zfig"><svg viewBox="0 0 ${W} ${H}" width="${W}">${s}</svg>${o.cap?`<div class="cap">${o.cap}</div>`:""}</div>`; };
ZP.table=(head,rows)=>`<table class="zt3"><tr>${head.map(h=>`<th>${h}</th>`).join("")}</tr>${rows.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join("")}</tr>`).join("")}</table>`;

/* ---------- question views ---------- */
const AB="ABCD", LV={1:"Easy",2:"Medium",3:"Advanced"};
function qHTML(q,i){ return `<div class="zq" data-i="${i}"><div class="zqh"><span>Question ${i+1}</span><span class="ztag l${q.lvl}">${LV[q.lvl]}</span><span class="ztag">${E(q.topic)}</span></div><div>${q.q}</div>${q.fig||""}
 <div class="zch">${q.ch.map((c,j)=>`<button type="button" data-j="${j}"><b>${AB[j]}</b><span>${c}</span></button>`).join("")}</div><div class="zout"></div></div>`; }
function explain(q,j){ const ok=j===q.ai; const wrong=q.ch.map((c,k)=>k!==q.ai&&q.why[k]?`<li><b>${AB[k]}</b> (${c}): ${q.why[k]}</li>`:"").join("");
 return `<div class="zex">${j==null?`<span class="zv no">Not answered.</span>`:ok?`<span class="zv ok">✓ Correct.</span>`:`<span class="zv no">✕ You chose ${AB[j]}.</span> ${q.why[j]||""}`}<div style="margin-top:3px"><b>Answer: ${AB[q.ai]}</b> (${q.ch[q.ai]})</div><b>Step by step</b><ol>${q.steps.map(s=>`<li>${s}</li>`).join("")}</ol>${wrong?`<details><summary>Why the other choices are wrong</summary><ul>${wrong}</ul></details>`:""}</div>`; }
function wire(root,qs,mode){ root.querySelectorAll(".zq").forEach(el=>{ const q=qs[+el.dataset.i]; el.querySelectorAll(".zch button").forEach(b=>b.onclick=()=>{ if(el.dataset.done) return; const j=+b.dataset.j;
  if(mode==="practice"){ el.dataset.done=1; el.querySelectorAll(".zch button").forEach((x,k)=>{ if(k===q.ai) x.classList.add("ok"); else if(k===j) x.classList.add("no"); }); el.querySelector(".zout").innerHTML=explain(q,j); }
  else { el.querySelectorAll(".zch button").forEach(x=>x.classList.toggle("sel",x===b)); el.dataset.sel=j; } }); }); }
function grade(root,qs){ let r=0; root.querySelectorAll(".zq").forEach(el=>{ const q=qs[+el.dataset.i], j=el.dataset.sel!=null?+el.dataset.sel:null; el.dataset.done=1; if(j===q.ai) r++;
  el.querySelectorAll(".zch button").forEach((x,k)=>{ x.classList.remove("sel"); if(k===q.ai) x.classList.add("ok"); else if(k===j) x.classList.add("no"); }); el.querySelector(".zout").innerHTML=explain(q,j); }); return r; }
ZP.qHTML=qHTML; ZP.explain=explain; ZP.wire=wire; ZP.grade=grade;

/* ---------- FRQ ---------- */
const FT={MR:["Mathematical Routines",10],TBR:["Translation Between Representations",12],EDA:["Experimental Design and Analysis",10],QQT:["Qualitative/Quantitative Translation",8]};
ZP.FT=FT;
const UNSUP={"⁻":"-","⁰":"0","¹":"1","²":"2","³":"3","⁴":"4","⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9"};
function numsIn(t){ return (String(t).replace(/×\s*10([⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g,(m,e)=>"×10^"+e.split("").map(c=>UNSUP[c]).join("")).replace(/[*x]\s*10\^/g,"×10^").replace(/−/g,"-").replace(/,(?=\d{3})/g,"").replace(/\s*×\s*10\^?\s*(-?\d+)/g,"e$1").match(/-?\d*\.?\d+(?:e-?\d+)?/gi)||[]).map(Number).filter(isFinite); }
ZP.NUM=(x,rel=0.03)=>t=>numsIn(t).some(v=>Math.abs(v-x)<=Math.abs(x)*rel+1e-12);
function buildFRQ(f){ for(let i=0;i<30;i++){ try{ const q=f.gen(); if(q){ q.type=f.type; q.title=q.title||f.title; return q; } }catch(e){ if(window.ZP_DEBUG) console.error(f.title,e); } } return null; }
ZP.buildFRQ=buildFRQ;
function frqHTML(q,key){ const n=q.parts.reduce((s,p)=>s+p.pts.length,0);
 return `<div class="zcard zfr" data-key="${key}"><div class="zqh"><span class="ztag">${FT[q.type][0]}</span><span>${n} points</span></div><h3 style="margin:.2em 0">${E(q.title)}</h3><div>${q.stem}</div>
 ${q.parts.map((p,i)=>`<div class="zpart" data-p="${i}"><p><b>(${p.id})</b> ${p.q}</p><textarea data-p="${i}" placeholder="Write your answer, equations and reasoning. Include units."></textarea>
  <div class="zsg" hidden>${p.pts.map((x,k)=>`<div class="zpt"><label><input type="checkbox" data-pt="${i}-${k}"> <b>${x.t}</b> (1 point)</label><div class="e"><b>Earns the point:</b> ${x.earn}</div>${x.not?`<div class="n"><b>Does not earn it:</b> ${x.not}</div>`:""}<div class="chk" data-c="${i}-${k}"></div></div>`).join("")}
  <details open><summary><b>Model answer for (${p.id})</b></summary><div class="zex">${p.model}</div></details></div></div>`).join("")}
 <div class="zscore" hidden>Your score: <span>0</span> / ${n}</div><button type="button" class="zbtn dark zshow">Check my answers & show the scoring guide</button> <button type="button" class="zbtn znewf">⟳ New version</button></div>`; }
function wireFRQ(root,regen){ root.querySelectorAll(".zfr").forEach(el=>{ const q=el._q; if(!q) return;
  const upd=()=>{ let s=0; el.querySelectorAll("[data-pt]").forEach(c=>{ if(c.checked) s++; }); el.querySelector(".zscore span").textContent=s; };
  el.querySelectorAll("[data-pt]").forEach(c=>c.onchange=upd);
  el.querySelector(".zshow").onclick=()=>{ el.querySelectorAll(".zsg,.zscore").forEach(x=>x.hidden=false);
   q.parts.forEach((p,i)=>{ const txt=el.querySelector(`textarea[data-p="${i}"]`).value; p.pts.forEach((x,k)=>{ const box=el.querySelector(`[data-c="${i}-${k}"]`), cb=el.querySelector(`[data-pt="${i}-${k}"]`);
    if(!txt.trim()){ box.innerHTML='<span class="n">✕ No answer written for this part.</span>'; cb.checked=false; cb.disabled=true; return; }
    box.innerHTML=(x.need||[]).filter(([c])=>!(typeof c==="function"?c(txt):c.test(txt))).map(([,m])=>`<div class="w">⚠ Check: ${m}</div>`).join(""); }); });
   el.querySelector(".zshow").outerHTML=`<p class="zhint">Compare your answer with each scoring point and the model answer. Tick only the points you earned.</p>`; upd(); };
  const nb=el.querySelector(".znewf"); if(nb) nb.onclick=regen; }); }
ZP.frqHTML=frqHTML; ZP.wireFRQ=wireFRQ;

/* ---------- book ---------- */
ZP.book=function(cid){ const C=ZP.C[cid]; document.documentElement.style.setProperty("--c",C.color); const app=document.getElementById("app");
 const tabs=[["home","Course"],...C.units.map(u=>["u"+u.n,"Unit "+u.n]),["practice","Practice exam"],["ref","Reference sheet"],["calc","Calculators"],["exam","Exam format"]];
 app.innerHTML=`<div class="zt"><a href="../">← Z-Math: all courses</a></div>
 <header class="zh"><div class="w"><p class="k">${E(C.kicker)}</p><h1>${E(C.title)}</h1><p>${E(C.tag)}</p></div></header>
 <nav class="zn"><div class="w">${tabs.map(([k,l])=>`<a href="#${k}" data-k="${k}">${l}</a>`).join("")}</div></nav><main class="zm" id="zm"></main>`;
 const M=document.getElementById("zm");
 const route=()=>{ const h=(location.hash||"#home").slice(1); const k=h.split("/")[0]; document.querySelectorAll(".zn a").forEach(a=>a.classList.toggle("on",a.dataset.k===k));
  const on=document.querySelector(".zn a.on"); if(on) on.scrollIntoView({inline:"center",block:"nearest"});
  if(k==="ref") refPage(); else if(k==="calc") calcPage(); else if(k==="exam") examPage(); else if(k==="practice") practicePage(); else if(/^u\d+$/.test(k)) unitPage(+k.slice(1),h.split("/")[1]); else home();
  scrollTo(0,0); };
 addEventListener("hashchange",route);
 function home(){ M.innerHTML=`<h2 class="zt2">${E(C.name)}</h2><p class="zsub">${E(C.about)}</p>
  <div class="zgrid">${C.units.map(u=>`<a class="zu" href="#u${u.n}"><b>Unit ${u.n}: ${E(u.name)}</b><span>${u.w} of the multiple-choice score · ${u.topics.length} topics</span></a>`).join("")}</div>
  <div class="zgrid" style="margin-top:12px"><a class="zu" href="#practice"><b>Full practice exam</b><span>42 multiple choice + 4 free response, timed, new every time</span></a><a class="zu" href="#ref"><b>Reference sheet</b><span>Every equation and constant, grouped by unit</span></a><a class="zu" href="#calc"><b>Calculators</b><span>What is allowed, plus calculator steps for every unit</span></a><a class="zu" href="#exam"><b>Exam format</b><span>Sections, timing, the 4 free-response types</span></a></div>
  <div class="zcard"><b>In every unit:</b> the CED topics with key ideas, solved examples (new ones on every tap), Easy · Medium · Advanced practice with step-by-step explanations, a 10-question quiz, a unit test, AP-style free-response questions with scoring guides, a study deck and calculator steps.</div>`; }
 function unitPage(n,sub){ const u=C.units.find(x=>x.n===n); if(!u) return home(); sub=sub||"topics";
  const T=[["topics","Topics"],["ex","Solved examples"],["e","Easy"],["m","Medium"],["h","Advanced"],["quiz","Quiz"],["test","Unit test"],["frq","Free response"],["deck","Study deck"],["calc","Calculator"]];
  M.innerHTML=`<h2 class="zt2">Unit ${n}: ${E(u.name)}</h2><p class="zsub">${u.w} of the multiple-choice score · ${E(u.blurb||"")}</p><div class="ztabs">${T.map(([k,l])=>`<button type="button" data-s="${k}" aria-pressed="${k===sub}">${l}</button>`).join("")}</div><div id="zb"></div>`;
  M.querySelectorAll(".ztabs button").forEach(b=>b.onclick=()=>{ history.replaceState(null,"","#u"+n+"/"+b.dataset.s); unitPage(n,b.dataset.s); });
  const Bx=M.querySelector("#zb");
  if(sub==="topics"){ Bx.innerHTML=u.topics.map(([c,t,k])=>`<details class="zd"${c===u.topics[0][0]?" open":""}><summary>${c} ${E(t)}</summary><div>${k}</div></details>`).join("")+(u.mistakes?`<div class="zcard"><b>Common mistakes in this unit</b><ul class="zlist">${u.mistakes.map(m=>`<li>${m}</li>`).join("")}</ul></div>`:""); return; }
  if(sub==="calc"){ Bx.innerHTML=calcTable(u.calc||[]); return; }
  if(sub==="deck"){ deck(Bx,u.deck||[]); return; }
  if(sub==="frq"){ const L=ZP.F.filter(f=>f.on.includes(key(cid,n)));
   Bx.innerHTML=L.length?`<p class="zhint">AP-style free-response questions for this unit. Each tap of “New version” gives new numbers. Write your answer, then open the scoring guide and score yourself point by point.</p><div class="zgrid">${L.map((f,i)=>`<a class="zu" href="javascript:void 0" data-f="${i}"><b>${E(f.title)}</b><span>${FT[f.type][0]} · ${FT[f.type][1]} points</span></a>`).join("")}</div><div id="zfbox"></div>`:`<p>Free-response questions for this unit are coming soon.</p>`;
   Bx.querySelectorAll("[data-f]").forEach(a=>a.onclick=()=>{ const f=L[+a.dataset.f]; const show=()=>{ const q=buildFRQ(f), box=Bx.querySelector("#zfbox"); box.innerHTML=frqHTML(q,f.title); box.firstChild._q=q; wireFRQ(box,show); box.scrollIntoView({behavior:"smooth",block:"start"}); }; show(); }); return; }
  if(sub==="ex"){ const go=()=>{ const qs=[1,2,3].map(l=>pick(cid,[n],[l],1)[0]).filter(Boolean);
    Bx.innerHTML=`<p class="zhint">One Easy, one Medium and one Advanced problem, fully worked. Tap “New examples” for different problems.</p>${qs.map((q,i)=>`<div class="zq"><div class="zqh"><span>Example ${i+1}</span><span class="ztag l${q.lvl}">${LV[q.lvl]}</span><span class="ztag">${E(q.topic)}</span></div><div>${q.q}</div>${q.fig}<div class="zex"><b>Answer: ${q.ch[q.ai]}</b><ol>${q.steps.map(s=>`<li>${s}</li>`).join("")}</ol></div></div>`).join("")}<button type="button" class="zbtn dark" id="zn">↻ New examples</button>`;
    Bx.querySelector("#zn").onclick=go; }; go(); return; }
  if(/^[emh]$/.test(sub)){ const lv={e:1,m:2,h:3}[sub]; const go=()=>{ const qs=pick(cid,[n],[lv],5);
    Bx.innerHTML=`<p class="zhint">${LV[lv]} problems. Choose an answer to see the full solution and why each wrong answer is wrong. Every answer is computed by the page, so the numbers are new each time.</p>${qs.map(qHTML).join("")}<button type="button" class="zbtn dark" id="zn">↻ New set</button>`; wire(Bx,qs,"practice"); Bx.querySelector("#zn").onclick=go; }; go(); return; }
  if(sub==="quiz"||sub==="test"){ const N=sub==="quiz"?10:20; const go=()=>{ const qs=pick(cid,[n],null,N).sort((a,b)=>a.lvl-b.lvl); const F=sub==="test"?ZP.F.filter(f=>f.on.includes(key(cid,n))):[]; const f=F.length?F[Math.floor(Math.random()*F.length)]:null; const fq=f?buildFRQ(f):null;
    Bx.innerHTML=`<p class="zhint">${sub==="quiz"?"10 questions. Answer them all, then submit to see your score and every explanation.":"Unit test: 20 multiple-choice questions from easy to advanced"+(fq?", plus one free-response question":"")+". Suggested time: "+(fq?"60":"40")+" minutes. A calculator is allowed, as on the AP exam."}</p>${qs.map(qHTML).join("")}${fq?`<h3>Free response</h3>${frqHTML(fq,"t")}`:""}<div class="zscore" id="zsc" hidden></div><button type="button" class="zbtn dark" id="zsub">Submit multiple choice</button> <button type="button" class="zbtn" id="zn">↻ New ${sub==="quiz"?"quiz":"test"}</button>`;
    wire(Bx,qs,"quiz"); if(fq){ Bx.querySelector(".zfr")._q=fq; wireFRQ(Bx,go); }
    Bx.querySelector("#zsub").onclick=()=>{ const r=grade(Bx,qs), p=Math.round(100*r/qs.length), s=Bx.querySelector("#zsc"); s.hidden=false; s.textContent=`Score: ${r} / ${qs.length} (${p}%). ${p>=85?"Excellent.":p>=70?"Good: read the explanations for the ones you missed.":"Read the explanations below, then practice the Easy and Medium sets."}`; s.scrollIntoView({behavior:"smooth",block:"center"}); Bx.querySelector("#zsub").disabled=true; };
    Bx.querySelector("#zn").onclick=go; }; go(); return; }
 }
 function deck(Bx,cards){ let d=[...cards], i=0, back=false;
  Bx.innerHTML=`<div class="zdeck"><p class="zhint">${cards.length} cards. Tap the card to flip it.</p><div class="zcardf"></div><div class="ztabs"><button type="button" data-a="p">← Back</button><button type="button" data-a="a">Again</button><button type="button" data-a="g">Got it ✓</button><button type="button" data-a="s">Shuffle</button></div><p class="zhint" id="zds"></p></div>`;
  const c=Bx.querySelector(".zcardf"), s=Bx.querySelector("#zds"); const show=()=>{ if(!d.length){ c.textContent="All done! Shuffle to start again."; s.textContent=""; return; } c.classList.toggle("back",back); c.innerHTML=back?d[i][1]:d[i][0]; s.textContent=`Card ${i+1} of ${d.length}`; };
  c.onclick=()=>{ back=!back; show(); };
  Bx.querySelectorAll("[data-a]").forEach(b=>b.onclick=()=>{ const a=b.dataset.a; if(a==="s"){ d=ZP.SH(cards); i=0; } else if(!d.length) return; else if(a==="p") i=(i-1+d.length)%d.length; else if(a==="g"){ d.splice(i,1); i=d.length?i%d.length:0; } else if(a==="a"){ const x=d.splice(i,1)[0]; d.splice(Math.min(d.length,i+3),0,x); i=i%d.length; } back=false; show(); });
  show(); }
 function calcTable(rows){ return `<div class="zcard zcalc"><p class="zhint">Steps for a TI-84 Plus and for the Desmos graphing calculator built into Bluebook. Put the calculator in <b>degree mode</b> for angles given in degrees (MODE → DEGREE on a TI-84; the wrench → Degrees in Desmos), and <b>radian mode</b> for ωt in oscillations.</p><table class="zt3" style="width:100%"><tr><th>Task</th><th>TI-84 Plus</th><th>Desmos (Bluebook)</th></tr>${rows.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("")}</table></div>`; }
 function refPage(){ M.innerHTML=`<h2 class="zt2">${E(C.short)} Reference Sheet</h2><p class="zsub">The equations and constants you can use on the exam, grouped by unit, with what each symbol means. On exam day the official College Board table of information and equations is provided in Bluebook and on paper: <a href="${C.refPDF}" target="_blank" rel="noopener">official equation sheet (PDF)</a>.</p><div class="zref">${C.ref.map(([h,rows])=>`<h3>${h}</h3><table>${rows.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join("")}</table>`).join("")}</div><button class="zbtn" onclick="window.print()">Print this sheet</button>`; }
 function calcPage(){ M.innerHTML=`<h2 class="zt2">Calculators on the ${E(C.short)} Exam</h2><div class="zcard"><ul class="zlist"><li>A <b>4-function, scientific, or graphing calculator</b> is allowed on <b>both sections</b> (multiple choice and free response).</li><li>The <b>Desmos graphing calculator</b> is built into Bluebook. Only the Bluebook version may be used during the exam, not the Desmos website or app.</li><li>You may bring up to two approved handheld calculators. Calculators with QWERTY keyboards, internet access, cameras, or that make noise are not allowed; phones and computers cannot be used as calculators.</li><li>Clear any stored programs or notes your teacher tells you to. Write all physics reasoning on paper: a calculator result alone does not earn free-response points.</li></ul><p class="zhint">Source: College Board AP Exams Calculator Policy. The approved-calculator list is updated each year, so check it before May: <a href="https://apstudents.collegeboard.org/exam-policies-guidelines/calculator-policies" target="_blank" rel="noopener">apstudents.collegeboard.org</a>.</p></div>
  <div class="zcard"><b>Popular approved models</b><ul class="zlist"><li><b>Graphing:</b> TI-84 Plus family (including CE), TI-83 Plus, TI-Nspire CX / CX II (non-CAS and CAS), Casio fx-9750GIII, fx-9860GIII, fx-CG50, HP Prime.</li><li><b>Scientific:</b> TI-30XS MultiView, TI-36X Pro, Casio fx-115ES PLUS, fx-991EX.</li></ul></div>
  <h3>Calculator steps for every unit</h3>${C.units.map(u=>`<details class="zd"><summary>Unit ${u.n}: ${E(u.name)}</summary>${calcTable(u.calc||[])}</details>`).join("")}`; }
 function practicePage(){ const wts=C.units.map(u=>{ const [a,b]=u.w.replace("%","").split("–").map(Number); return (a+b)/2; }), tot=wts.reduce((a,b)=>a+b,0);
  let cnt=wts.map(w=>Math.floor(42*w/tot)); let rem=42-cnt.reduce((a,b)=>a+b,0); const fr=wts.map((w,i)=>[42*w/tot-cnt[i],i]).sort((a,b)=>b[0]-a[0]); for(let i=0;i<rem;i++) cnt[fr[i][1]]++;
  M.innerHTML=`<h2 class="zt2">Full Practice Exam</h2><p class="zsub">Same format as the real ${E(C.short)} exam: Section I has 42 multiple-choice questions (85 minutes), Section II has 4 free-response questions (95 minutes), in the order Mathematical Routines, Translation Between Representations, Experimental Design and Analysis, Qualitative/Quantitative Translation. Units are weighted like the real exam. Use a calculator and the <a href="#ref">reference sheet</a>.</p><button type="button" class="zbtn dark" id="zgo">Start Section I</button>`;
  M.querySelector("#zgo").onclick=()=>{ const qs=[]; C.units.forEach((u,i)=>{ const L=[1,2,2,3,2,3]; const got=[]; for(let j=0;j<cnt[i];j++){ const q=pick(cid,[u.n],[L[j%L.length]],1)[0]||pick(cid,[u.n],null,1)[0]; if(q){ q.topic="Unit "+u.n+" · "+q.topic; got.push(q);} } qs.push(...got); }); const Q=ZP.SH(qs);
   const fr=["MR","TBR","EDA","QQT"].map(t=>{ const L=ZP.F.filter(f=>f.type===t&&C.units.some(u=>f.on.includes(key(cid,u.n)))); return L.length?buildFRQ(L[Math.floor(Math.random()*L.length)]):null; }).filter(Boolean);
   let end=Date.now()+85*60000; M.innerHTML=`<div class="zscore" id="ztm" style="position:sticky;top:52px;z-index:5">Section I · time left <span>85:00</span></div><div id="zs1">${Q.map(qHTML).join("")}</div><button type="button" class="zbtn dark" id="zs1b">Finish Section I → Section II</button><div id="zs2"></div>`;
   const tick=setInterval(()=>{ if(!document.body.contains(M.querySelector("#ztm"))){ clearInterval(tick); return; } const s=Math.max(0,Math.round((end-Date.now())/1000)); M.querySelector("#ztm span").textContent=`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`; if(s===0&&M.querySelector("#zs1b")) M.querySelector("#zs1b").click(); },1000);
   const S1=M.querySelector("#zs1"); wire(S1,Q,"quiz");
   M.querySelector("#zs1b").onclick=()=>{ const raw=grade(S1,Q); S1.hidden=true; M.querySelector("#zs1b").remove(); end=Date.now()+95*60000; M.querySelector("#ztm").firstChild.textContent="Section II · time left ";
    const S2=M.querySelector("#zs2"); S2.innerHTML=`<div class="zcard">Section I score: <b>${raw} / ${Q.length}</b>. <button type="button" class="zbtn" id="zrev">Review Section I answers</button></div>`+fr.map((q,i)=>`<h3>Question ${i+1}</h3>`+frqHTML(q,"x"+i)).join("")+`<button type="button" class="zbtn dark" id="zfin">Compute my estimated AP score</button><div id="zres"></div>`;
    S2.querySelector("#zrev").onclick=()=>{ S1.hidden=!S1.hidden; };
    S2.querySelectorAll(".zfr").forEach((el,i)=>{ el._q=fr[i]; el.querySelector(".znewf").remove(); }); wireFRQ(S2,()=>{});
    S2.querySelector("#zfin").onclick=()=>{ let fp=0, fmax=0; S2.querySelectorAll(".zfr").forEach(el=>{ fmax+=el.querySelectorAll("[data-pt]").length; el.querySelectorAll("[data-pt]").forEach(c=>{ if(c.checked) fp++; }); }); const comp=50*raw/Q.length+50*fp/Math.max(1,fmax); const est=comp>=70?5:comp>=55?4:comp>=40?3:comp>=25?2:1;
     S2.querySelector("#zres").innerHTML=`<div class="zscore">Multiple choice ${raw}/${Q.length} · Free response ${fp}/${fmax} (scored by you with the guides) · Composite ${comp.toFixed(0)}% → estimated AP score <b>${est}</b>.</div><p class="zhint">The estimate uses approximate cutoffs (5 ≈ 70%, 4 ≈ 55%, 3 ≈ 40%, 2 ≈ 25%); the real cutoffs change each year. Open each free-response scoring guide and tick the points you earned before computing.</p>`; clearInterval(tick); }; scrollTo(0,0); }; }; }
 function examPage(){ const X=C.exam; M.innerHTML=`<h2 class="zt2">The ${E(C.short)} Exam</h2><div class="zcard"><table class="zt3" style="width:100%"><tr><th>Section</th><th>Questions</th><th>Time</th><th>Score</th></tr><tr><td>I: Multiple choice</td><td>${X.mc}</td><td>${X.mcT}</td><td>50%</td></tr><tr><td>II: Free response</td><td>4</td><td>${X.frT}</td><td>50%</td></tr></table><p class="zhint">${X.note}</p></div>
  <div class="zcard"><b>The four free-response questions (always in this order)</b><ol class="zlist"><li><b>Mathematical Routines</b> (10 points): solve a problem with equations and calculations; may ask for a derivation.</li><li><b>Translation Between Representations</b> (12 points): draw a diagram (often a free-body or energy bar chart), write equations from it, sketch a graph, and connect them.</li><li><b>Experimental Design and Analysis</b> (10 points): describe a procedure, choose what to graph to get a straight line, and find a quantity from the slope.</li><li><b>Qualitative/Quantitative Translation</b> (8 points): make a claim, justify it in words, derive an equation, and show the two agree.</li></ol></div>
  <div class="zcard"><b>Unit weights (multiple choice)</b><table class="zt3">${C.units.map(u=>`<tr><td style="text-align:left">Unit ${u.n}: ${E(u.name)}</td><td>${u.w}</td></tr>`).join("")}</table></div>`; }
 route(); };
})();
