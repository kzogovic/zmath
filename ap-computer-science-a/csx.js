/* Z-AP CS A practice center: question rendering, quizzes, unit tests, level practice, FRQ practice and study decks.
   Needs csbank.js, csbank2.js, csfrq.js and csdeck.js. Used inside each unit of the book and by the exam pages. */
(function(){
"use strict";
const E=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const LV={1:"Easy",2:"Medium",3:"Hard"}, AB="ABCD";
const css=`.cx{margin:8px 0 18px}.cx .lead{font-size:16px;color:#444;margin:4px 0 10px}
.cx-tabs{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 12px}.cx-tabs button,.cx-btn{font:600 14px system-ui;border:1.5px solid #1f2937;background:#fff;color:#1f2937;border-radius:999px;padding:6px 14px;cursor:pointer}
.cx-tabs button[aria-pressed="true"],.cx-btn.dark{background:#1f2937;color:#fff}.cx-btn:disabled{opacity:.45;cursor:default}
.cx-q{background:#fff;border:1px solid #e3e0d8;border-radius:14px;padding:12px 14px;margin:10px 0;font:16px/1.5 system-ui;color:#111}
.cx-qh{display:flex;flex-wrap:wrap;gap:6px;align-items:center;font:600 13px system-ui;color:#555;margin-bottom:6px}.cx-tag{border-radius:999px;padding:2px 9px;background:#eef2ff;color:#3730a3}.cx-tag.l1{background:#dcfce7;color:#166534}.cx-tag.l2{background:#fef3c7;color:#92400e}.cx-tag.l3{background:#fee2e2;color:#991b1b}
.cx pre,.cx-q pre,.cx-f pre{background:#0f172a;color:#e2e8f0;border-radius:10px;padding:10px 12px;overflow-x:auto;font:14px/1.45 ui-monospace,Menlo,Consolas,monospace;margin:8px 0;white-space:pre}
.cx-ch{display:grid;gap:6px;margin:8px 0}.cx-ch button{display:flex;gap:10px;align-items:flex-start;text-align:left;font:15px ui-monospace,Menlo,Consolas,monospace;background:#faf9f6;border:1.5px solid #d6d1c4;border-radius:10px;padding:8px 10px;cursor:pointer;color:#111;white-space:pre-wrap}
.cx-ch button b{font-family:system-ui;min-width:18px}.cx-ch button.sel{border-color:#1d4ed8;background:#eff6ff}.cx-ch button.ok{border-color:#16a34a;background:#f0fdf4}.cx-ch button.no{border-color:#dc2626;background:#fef2f2}
.cx-ex{border-left:4px solid #1d4ed8;background:#f8fafc;border-radius:0 10px 10px 0;padding:8px 12px;margin-top:8px;font:15px/1.55 system-ui}.cx-ex ol{margin:4px 0 4px 18px;padding:0}.cx-ex li{margin:3px 0}
.cx-ex .verdict{font-weight:700}.cx-ex .verdict.ok{color:#166534}.cx-ex .verdict.no{color:#991b1b}.cx-ex details{margin-top:6px}.cx-ex code{background:#e5e7eb;border-radius:4px;padding:0 4px}
.trc{border-collapse:collapse;margin:6px 0;font:14px ui-monospace,Menlo,monospace}.trc td,.trc th{border:1px solid #cbd5e1;padding:2px 8px;text-align:center}.trc th{background:#e2e8f0;font-family:system-ui}
.cx-score{font:700 18px system-ui;background:#eef2ff;border-radius:12px;padding:10px 14px;margin:10px 0}
.cx-deck{max-width:560px}.cx-card{min-height:170px;border-radius:16px;border:2px solid #1f2937;background:#fff;display:flex;align-items:center;justify-content:center;text-align:center;padding:18px;font:600 20px/1.4 system-ui;cursor:pointer;margin:8px 0}.cx-card.back{font:500 17px/1.5 system-ui;background:#f8fafc}
.cx-f{background:#fff;border:1px solid #e3e0d8;border-radius:14px;padding:12px 14px;margin:10px 0;font:16px/1.5 system-ui}.cx-f textarea{width:100%;min-height:200px;box-sizing:border-box;font:14px/1.45 ui-monospace,Menlo,monospace;border:1.5px solid #c9c4b8;border-radius:10px;padding:8px;tab-size:4}
.cx-pt{border:1px solid #e5e7eb;border-radius:10px;padding:6px 10px;margin:6px 0;background:#fafafa;font-size:15px}.cx-pt .e{color:#166534}.cx-pt .n{color:#991b1b}.cx-pt .w{color:#b45309;font-weight:600}
.cx-why{margin:4px 0 8px 18px;padding:0;font-size:15px}.cx-why li{margin:5px 0}.cx-why code{background:#e5e7eb;border-radius:4px;padding:1px 5px;font-size:13px;word-break:break-word}.cx-line{border-collapse:collapse;width:100%;font-size:14px;margin:6px 0}.cx-line td{border-top:1px solid #e5e7eb;padding:3px 6px;vertical-align:top}.cx-line td:first-child{font:13px ui-monospace,Menlo,monospace;white-space:pre;background:#0f172a;color:#e2e8f0}.cx-line td:last-child{color:#334155}
.cx-f table.ex{border-collapse:collapse;font-size:14px;margin:6px 0}.cx-f table.ex td,.cx-f table.ex th{border:1px solid #d6d1c4;padding:3px 8px}.cx-f table.ex th{background:#f1efe9}
.cx-list{display:grid;gap:8px}.cx-list button{text-align:left;font:15px system-ui;border:1px solid #d6d1c4;border-radius:12px;background:#fff;padding:10px 12px;cursor:pointer}.cx-list button b{display:block}`;
if(typeof document!=="undefined"&&!document.getElementById("cx-css")){ const st=document.createElement("style"); st.id="cx-css"; st.textContent=css; document.head.appendChild(st); }

/* ---------- picking questions ---------- */
const unitNum=id=>+String(id).replace("unit-","");
function pick(opts){ /* opts: {units:[1..4], lvls:[1,2,3], n, avoidQuick} */
 const B=CSBANK.B.filter(t=>opts.units.includes(t.u)&&(!opts.lvls||opts.lvls.includes(t.lvl)));
 const pool=B.filter(t=>t.topic!=="Quick check"), quick=B.filter(t=>t.topic==="Quick check");
 const out=[], used=new Set(); let guard=0;
 while(out.length<opts.n&&guard++<400){ const src=(quick.length&&Math.random()<(opts.quick||0.2))||!pool.length?quick:pool; const t=src[Math.floor(Math.random()*src.length)];
  const key=t.topic+t.u+t.lvl+(t.topic==="Quick check"?String(CSBANK.B.indexOf(t)):""); if(used.has(key)&&guard<300) continue; const q=CSBANK.make(t); if(q){ used.add(key); out.push(q); } }
 return out; }

/* ---------- one question ---------- */
function qHTML(q,i,mode){ /* mode: "practice" shows feedback immediately; "quiz" waits for submit */
 return `<div class="cx-q" data-i="${i}" data-ai="${q.ai}"><div class="cx-qh"><span>Question ${i+1}</span><span class="cx-tag l${q.lvl}">${LV[q.lvl]}</span><span class="cx-tag">Unit ${q.u} · ${E(q.topic)}</span></div>
 <div>${q.q}</div>${q.code?`<pre>${E(q.code)}</pre>`:""}
 <div class="cx-ch">${q.ch.map((c,j)=>`<button type="button" data-j="${j}"><b>${AB[j]}</b><span>${E(c)}</span></button>`).join("")}</div><div class="cx-out"></div></div>`; }
function explain(q,chosen){ const ok=chosen===q.ai;
 const wrong=q.ch.map((c,j)=>j!==q.ai&&q.why[j]?`<li><b>${AB[j]}</b> (${E(c)}): ${E(q.why[j])}</li>`:"").join("");
 return `<div class="cx-ex">${chosen==null?`<span class="verdict no">Not answered.</span>`:ok?`<span class="verdict ok">✓ Correct.</span>`:`<span class="verdict no">✕ You chose ${AB[chosen]}.</span> ${q.why[chosen]?E(q.why[chosen]):""}`}
 <div style="margin-top:4px"><b>Answer: ${AB[q.ai]}</b> (${E(q.ch[q.ai])})</div><b>Step by step</b><ol>${q.steps.map(s=>`<li>${s}</li>`).join("")}</ol>${wrong?`<details><summary>Why the other choices are wrong</summary><ul>${wrong}</ul></details>`:""}</div>`; }
function wireQ(root,qs,mode,onAns){
 root.querySelectorAll(".cx-q").forEach(el=>{ const q=qs[+el.dataset.i];
  el.querySelectorAll(".cx-ch button").forEach(b=>b.onclick=()=>{ if(el.dataset.done) return; const j=+b.dataset.j;
   if(mode==="practice"){ el.dataset.done=1; el.querySelectorAll(".cx-ch button").forEach((x,k)=>{ if(k===q.ai) x.classList.add("ok"); else if(k===j) x.classList.add("no"); }); el.querySelector(".cx-out").innerHTML=explain(q,j); }
   else { el.querySelectorAll(".cx-ch button").forEach(x=>x.classList.toggle("sel",x===b)); el.dataset.sel=j; }
   onAns&&onAns(+el.dataset.i,j); }); }); }
function grade(root,qs){ let right=0; root.querySelectorAll(".cx-q").forEach(el=>{ const q=qs[+el.dataset.i], j=el.dataset.sel!=null?+el.dataset.sel:null; el.dataset.done=1; if(j===q.ai) right++;
  el.querySelectorAll(".cx-ch button").forEach((x,k)=>{ x.classList.remove("sel"); if(k===q.ai) x.classList.add("ok"); else if(k===j) x.classList.add("no"); }); el.querySelector(".cx-out").innerHTML=explain(q,j); }); return right; }

/* ---------- FRQ ---------- */
function codeLines(model){ const rows=model.split("\n").map(l=>{ const m=l.match(/^(.*?)\s{2,}\/\/\s?(.*)$/); return m?[m[1],m[2]]:[l,""]; });
 return `<pre>${E(rows.map(r=>r[0].replace(/\s+$/,"")).join("\n"))}</pre><b>What each line does</b><ol class="cx-why">${rows.filter(r=>r[1]).map(r=>`<li><code>${E(r[0].trim())}</code><br>${E(r[1])}</li>`).join("")}</ol>`; }
function frqHTML(f,key){ const n=f.parts.reduce((s,p)=>s+p.points,0);
 return `<div class="cx-f" data-f="${f.id}" data-key="${key||""}"><div class="cx-qh"><span class="cx-tag">Q${f.type}: ${CSFRQ.TYPES[f.type]}</span><span>${n} points</span></div><h3 style="margin:.2em 0">${E(f.title)}</h3>${f.intro}
 ${f.parts.map(p=>`<div class="cx-part" data-p="${p.id}"><p>${f.parts.length>1?`<b>Part (${p.id})</b> (${p.points} points). `:""}${p.prompt}</p><textarea spellcheck="false" autocapitalize="off" autocomplete="off" data-p="${p.id}" placeholder="${E(p.sig)}\n{\n    \n}"></textarea>
 <div class="cx-sg" hidden>${p.pts.map((x,k)=>`<div class="cx-pt"><label><input type="checkbox" data-pt="${p.id}${k}"> <b>${E(x.t)}</b> (1 point)</label><div class="e"><b>Earns the point:</b> ${E(x.earn)}</div>${x.not?`<div class="n"><b>Does not earn it:</b> ${E(x.not)}</div>`:""}<div class="chk"></div></div>`).join("")}
 <details open><summary><b>Model solution, line by line</b></summary>${codeLines(p.model)}</details></div></div>`).join("")}
 <div class="cx-sg" hidden><b>Common mistakes</b><ul>${f.mistakes.map(m=>`<li>${E(m)}</li>`).join("")}</ul></div>
 <div class="cx-score" hidden>Your score: <span>0</span> / ${n}</div><button type="button" class="cx-btn dark cx-show">Show the scoring guide</button></div>`; }
function quickChecks(txt,p){ const w=[]; const t=txt||"";
 if(!t.trim()) return ["No code written."];
 if(!/\bvoid\b/.test(p.sig)&&!/\bclass\b/.test(p.sig)&&!/\breturn\b/.test(t)) w.push("This method must return a value, but there is no return statement.");
 if(/==\s*"|"\s*==/.test(t)) w.push("Strings compared with ==: use .equals.");
 if(/<=\s*\w+\.(length|size)\b/.test(t)) w.push("A loop condition uses <= length or <= size(): check for an off-by-one error.");
 if(/for\s*\(\s*\w+\s+\w+\s*:\s*\w+\s*\)[\s\S]*\.remove\(/.test(t)) w.push("remove inside an enhanced for loop throws a ConcurrentModificationException.");
 if(/\bclass\b/.test(p.sig)&&/public\s+\w+\s+\w+\s*;/.test(t)) w.push("Instance variables should be private.");
 return w; }
function wireFRQ(root){ root.querySelectorAll(".cx-f").forEach(el=>{ const f=CSFRQ.F.find(x=>x.id===el.dataset.f); const key="csfrq-"+(el.dataset.key||f.id);
  let saved={}; try{ saved=JSON.parse(localStorage.getItem(key))||{}; }catch(e){}
  el.querySelectorAll("textarea").forEach(t=>{ t.value=saved[t.dataset.p]||""; t.oninput=()=>{ saved[t.dataset.p]=t.value; try{ localStorage.setItem(key,JSON.stringify(saved)); }catch(e){} };
   t.onkeydown=e=>{ if(e.key==="Tab"){ e.preventDefault(); const s=t.selectionStart; t.value=t.value.slice(0,s)+"    "+t.value.slice(t.selectionEnd); t.selectionStart=t.selectionEnd=s+4; t.oninput(); } }; });
  const upd=()=>{ let s=0; el.querySelectorAll("[data-pt]").forEach(c=>{ if(c.checked) s++; }); el.querySelector(".cx-score span").textContent=s; };
  el.querySelectorAll("[data-pt]").forEach(c=>c.onchange=upd);
  el.querySelector(".cx-show").onclick=()=>{ el.querySelectorAll(".cx-sg,.cx-score").forEach(x=>x.hidden=false);
   f.parts.forEach(p=>{ const ta=el.querySelector(`textarea[data-p="${p.id}"]`), w=quickChecks(ta.value,p); const box=el.querySelector(`.cx-part[data-p="${p.id}"] .chk`); if(box) box.innerHTML=w.map(x=>`<div class="w">⚠ ${E(x)}</div>`).join("");
    if(!ta.value.trim()) el.querySelectorAll(`[data-pt^="${p.id}"]`).forEach(c=>{ c.checked=false; c.disabled=true; }); });
   el.querySelector(".cx-show").outerHTML=`<p class="lead">Compare your code with each scoring point and the model solution. Tick only the points your code earns.</p>`; upd(); }; }); }

/* ---------- study deck ---------- */
function deckHTML(uid){ const extra=(window.PRACTICE&&PRACTICE.CARDS[uid])||[]; const cards=[...(CSDECK[uid]||[]),...extra];
 return `<div class="cx-deck" data-u="${uid}" data-n="${cards.length}"><p class="lead">${cards.length} cards. Tap the card to flip it. Use “Again” for cards you need to see more.</p><div class="cx-card">…</div><div class="cx-tabs"><button type="button" class="d-prev">← Back</button><button type="button" class="d-again">Again</button><button type="button" class="d-got">Got it ✓</button><button type="button" class="d-sh">Shuffle</button></div><p class="lead d-st"></p></div>`; }
function wireDeck(root){ root.querySelectorAll(".cx-deck").forEach(el=>{ const uid=el.dataset.u; const extra=(window.PRACTICE&&PRACTICE.CARDS[uid])||[]; let cards=[...(CSDECK[uid]||[]),...extra], i=0, back=false, known=0; const card=el.querySelector(".cx-card"), st=el.querySelector(".d-st");
  const show=()=>{ const c=cards[i]; card.classList.toggle("back",back); card.textContent=back?c[1]:c[0]; st.textContent=`Card ${i+1} of ${cards.length} · ${known} marked “got it”`; };
  card.onclick=()=>{ back=!back; show(); }; el.querySelector(".d-prev").onclick=()=>{ i=(i-1+cards.length)%cards.length; back=false; show(); };
  el.querySelector(".d-got").onclick=()=>{ known++; cards.splice(i,1); if(!cards.length){ card.textContent="All done! Shuffle to start again."; st.textContent=""; cards=[...(CSDECK[uid]||[]),...extra]; i=0; known=0; return; } i=i%cards.length; back=false; show(); };
  el.querySelector(".d-again").onclick=()=>{ const c=cards.splice(i,1)[0]; cards.splice(Math.min(cards.length,i+3),0,c); i=i%cards.length; back=false; show(); };
  el.querySelector(".d-sh").onclick=()=>{ for(let k=cards.length-1;k>0;k--){ const j=Math.floor(Math.random()*(k+1)); [cards[k],cards[j]]=[cards[j],cards[k]]; } i=0; back=false; show(); };
  show(); }); }

/* ---------- unit practice center ---------- */
function center(uid){ const u=unitNum(uid);
 return `<div class="cx" data-u="${uid}"><div class="cx-tabs cx-modes"><button type="button" data-m="quiz" aria-pressed="true">Quiz (10)</button><button type="button" data-m="test">Unit test (20 + FRQ)</button><button type="button" data-m="lvl1">Easy</button><button type="button" data-m="lvl2">Medium</button><button type="button" data-m="lvl3">Hard</button><button type="button" data-m="frq">FRQ practice</button><button type="button" data-m="deck">Study deck</button></div><div class="cx-body"></div></div>`; }
function runMode(el,m){ const uid=el.dataset.u, u=unitNum(uid), body=el.querySelector(".cx-body");
 el.querySelectorAll(".cx-modes button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.m===m)));
 if(m==="deck"){ body.innerHTML=deckHTML(uid); wireDeck(body); return; }
 if(m==="frq"){ const list=CSFRQ.F.filter(f=>CSFRQ.UNITOF[f.type].includes(u));
  body.innerHTML=`<p class="lead">Free-response problems in the AP format that use this unit's skills. Write your code, then open the scoring guide and score yourself point by point. Your code is saved on this device.</p><div class="cx-list">${list.map(f=>`<button type="button" data-f="${f.id}"><b>${E(f.title)}</b>Q${f.type}: ${CSFRQ.TYPES[f.type]} · ${f.parts.reduce((s,p)=>s+p.points,0)} points</button>`).join("")}</div><div class="cx-fbox"></div>`;
  body.querySelectorAll("[data-f]").forEach(b=>b.onclick=()=>{ const f=CSFRQ.F.find(x=>x.id===b.dataset.f); const box=body.querySelector(".cx-fbox"); box.innerHTML=frqHTML(f); wireFRQ(box); box.scrollIntoView({block:"start",behavior:"smooth"}); }); return; }
 if(/^lvl/.test(m)){ const lv=+m.slice(3); const go=()=>{ const qs=pick({units:[u],lvls:[lv],n:5,quick:lv===1?0.35:0});
   body.innerHTML=`<p class="lead">${LV[lv]} problems from Unit ${u}. Choose an answer to see a step-by-step explanation and why each wrong choice is wrong. Every answer was checked by running the code in Java.</p>${qs.map((q,i)=>qHTML(q,i)).join("")}<button type="button" class="cx-btn dark cx-new">New set ↻</button>`; wireQ(body,qs,"practice"); body.querySelector(".cx-new").onclick=go; }; go(); return; }
 const test=m==="test", n=test?20:10;
 const go=()=>{ const qs=pick({units:[u],lvls:test?null:null,n,quick:test?0.1:0.2}).sort((a,b)=>a.lvl-b.lvl); const fr=test?(()=>{ const l=CSFRQ.F.filter(f=>CSFRQ.UNITOF[f.type].includes(u)); return l[Math.floor(Math.random()*l.length)]; })():null;
  body.innerHTML=`<p class="lead">${test?`Unit ${u} test: 20 multiple-choice questions from easy to hard, plus one free-response problem. Suggested time: 45 minutes.`:`Unit ${u} quiz: 10 questions. Answer them all, then submit to see your score and every explanation.`}</p>${qs.map((q,i)=>qHTML(q,i)).join("")}${fr?`<h3>Free response</h3>${frqHTML(fr,"unit-test-"+u)}`:""}<div class="cx-score" hidden></div><button type="button" class="cx-btn dark cx-sub">Submit ${test?"multiple choice":"quiz"}</button> <button type="button" class="cx-btn cx-new">New ${test?"test":"quiz"} ↻</button>`;
  wireQ(body,qs,"quiz"); if(fr) wireFRQ(body);
  body.querySelector(".cx-sub").onclick=()=>{ const r=grade(body,qs); const sc=body.querySelector(".cx-score"); sc.hidden=false; const p=Math.round(100*r/qs.length); sc.innerHTML=`Score: ${r} / ${qs.length} (${p}%). ${p>=85?"Excellent.":p>=70?"Good: review the explanations for the ones you missed.":"Review the explanations below, then try the Easy and Medium sets."}`; sc.scrollIntoView({block:"center",behavior:"smooth"}); body.querySelector(".cx-sub").disabled=true; };
  body.querySelector(".cx-new").onclick=go; };
 go(); }
function bind(root){ root.querySelectorAll(".cx").forEach(el=>{ if(el.dataset.wired) return; el.dataset.wired=1; el.querySelectorAll(".cx-modes button").forEach(b=>b.onclick=()=>runMode(el,b.dataset.m)); runMode(el,"quiz"); }); }
window.CSX={center,bind,pick,qHTML,explain,wireQ,grade,frqHTML,wireFRQ,codeLines,quickChecks,E};
})();
