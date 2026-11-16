/* Z-AP Computer Science A practice exam engine (May 2026+ format):
   Section I: 42 multiple choice, 90 min (55%). Section II: 4 free response, 90 min (45%): Q1 7 pts, Q2 7, Q3 5, Q4 6.
   The page sets window.CSEXAM = {seed, key, label, title}. Answers save in localStorage. */
(function(){
"use strict";
const CFG=window.CSEXAM, KEY="zmx-csa-"+CFG.key, E=CSX.E, AB="ABCD";
const W={1:8,2:13,3:6,4:15}, MIN_MC=90, MIN_FR=90, BRK=10, MCW=55;
function rng(seed){ let a=(seed>>>0)||1; return ()=>{ a=(a+0x6D2B79F5)>>>0; let t=a; t=Math.imul(t^(t>>>15),t|1); t^=t+Math.imul(t^(t>>>7),t|61); return ((t^(t>>>14))>>>0)/4294967296; }; }
/* build the test with a seeded Math.random so a fixed seed always gives the same exam */
function build(seed,n){ const old=Math.random; Math.random=rng(seed);
 try{ const mc=[]; const used=new Set();
  for(const u of [1,2,3,4]){ let got=0, tries=0; while(got<W[u]&&tries++<300){ const r=Math.random(), lv=r<0.3?1:r<0.7?2:3;
    const pool=CSBANK.B.filter(t=>t.u===u&&t.lvl===lv&&(t.topic!=="Quick check"||Math.random()<0.25)); if(!pool.length) continue; const t=pool[Math.floor(Math.random()*pool.length)];
    const k=t.topic==="Quick check"?"q"+CSBANK.B.indexOf(t):t.topic; if(used.has(k)&&tries<250) continue; const q=CSBANK.make(t); if(!q) continue; used.add(k); mc.push(q); got++; } }
  for(let i=mc.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [mc[i],mc[j]]=[mc[j],mc[i]]; }
  mc.sort((a,b)=>a.lvl-b.lvl);
  const fr=[1,2,3,4].map(t=>{ const l=CSFRQ.F.filter(f=>f.type===t); return n?l[(n-1+t)%l.length]:l[Math.floor(Math.random()*l.length)]; });
  return {mc,fr}; } finally { Math.random=old; } }
const T=build(CFG.seed,CFG.n); const app=document.getElementById("app"); const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
let S; try{ S=JSON.parse(localStorage.getItem(KEY))||null; }catch(e){ S=null; }
if(!S) S={phase:"intro",name:"",timed:true,mc:{},flag:{},fr:{},self:{},cur:0,fcur:0,away:[],paste:0};
const save=()=>{ try{ localStorage.setItem(KEY,JSON.stringify(S)); }catch(e){} };

/* ---------- shared bits: chime, timer, modal, Java Quick Reference, integrity ---------- */
let AC=null; const unlock=()=>{ try{ AC=AC||new (window.AudioContext||window.webkitAudioContext)(); if(AC.state==="suspended") AC.resume(); }catch(e){} };
function chime(){ try{ unlock(); [0,.35,.7].forEach((t,i)=>{ const o=AC.createOscillator(), g=AC.createGain(); o.frequency.value=[880,660,990][i]; g.gain.setValueAtTime(.0001,AC.currentTime+t); g.gain.exponentialRampToValueAtTime(.35,AC.currentTime+t+.03); g.gain.exponentialRampToValueAtTime(.0001,AC.currentTime+t+.6); o.connect(g); g.connect(AC.destination); o.start(AC.currentTime+t); o.stop(AC.currentTime+t+.65); }); }catch(e){} }
let tick=null; const fmt=s=>s===Infinity?"untimed":`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`;
function timer(k,min,end){ clearInterval(tick); const run=()=>{ const r=S.timed?Math.max(0,min*60-(Date.now()-S[k])/1000):Infinity, el=$("#timer"); if(el){ el.textContent=fmt(r); el.classList.toggle("low",r<300); } if(r<=0){ clearInterval(tick); chime(); end(); } }; run(); if(S.timed) tick=setInterval(run,1000); }
function modal(html,btns){ const m=document.createElement("div"); m.className="modal"; m.innerHTML=`<div class="mbox">${html}<div class="mbtn">${btns.map((b,i)=>`<button class="pill ${b.p?"dark":""}" data-i="${i}">${b.t}</button>`).join("")}</div></div>`; document.body.appendChild(m); m.querySelectorAll("[data-i]").forEach(x=>x.onclick=()=>{ m.remove(); const f=btns[+x.dataset.i].f; f&&f(); }); }
const JQR=`<div class="ref"><h2>Java Quick Reference (summary)</h2><p class="note">On exam day, Bluebook shows the official Java Quick Reference. This summary lists the classes and methods it covers.</p>
<div class="card"><h3>String</h3><pre class="jq">String(String str)
int length()
String substring(int from, int to)   // from to to − 1
String substring(int from)           // from to the end
int indexOf(String str)              // first index, or −1
boolean equals(Object other)
int compareTo(String other)          // &lt; 0, 0, &gt; 0
String[] split(String del)</pre></div>
<div class="card"><h3>Integer and Double</h3><pre class="jq">Integer.MIN_VALUE   Integer.MAX_VALUE
static int Integer.parseInt(String s)
static double Double.parseDouble(String s)</pre></div>
<div class="card"><h3>Math</h3><pre class="jq">static int abs(int x)
static double abs(double x)
static double pow(double base, double exponent)
static double sqrt(double x)
static double random()     // 0.0 &lt;= result &lt; 1.0</pre></div>
<div class="card"><h3>ArrayList&lt;E&gt;</h3><pre class="jq">int size()
boolean add(E obj)          // adds to the end
void add(int index, E obj)  // inserts, shifting right
E get(int index)
E set(int index, E obj)     // returns the old element
E remove(int index)         // shifts left, returns removed</pre></div>
<div class="card"><h3>File and Scanner</h3><pre class="jq">File(String pathname)
Scanner(File f)
int nextInt()   double nextDouble()   boolean nextBoolean()
String nextLine()   String next()
boolean hasNext()   void close()</pre></div>
<div class="card"><h3>Object</h3><pre class="jq">boolean equals(Object other)
String toString()</pre></div></div>`;
document.addEventListener("click",e=>{ if(!e.target.closest("[data-jqr]")) return; const d=document.createElement("div"); d.className="sheet"; d.innerHTML=`<div class="sbox"><button class="pill dark close">Close ✕</button>${JQR}<button class="pill dark close">Close ✕</button></div>`; document.body.appendChild(d); d.querySelectorAll(".close").forEach(c=>c.onclick=()=>d.remove()); });
const live=()=>/^(mc|fr)$/.test(S.phase); let awayAt=null;
const gone=()=>{ if(live()&&!awayAt) awayAt=Date.now(); }, back=()=>{ if(!awayAt) return; const d=Math.round((Date.now()-awayAt)/1000); if(d>=1){ S.away.push({t:awayAt,d,ph:S.phase}); save(); const w=document.createElement("div"); w.className="awaywarn"; w.textContent=`⚠ You left the test for ${d} s. This has been recorded and will appear on your results page.`; document.body.appendChild(w); setTimeout(()=>w.remove(),5000); } awayAt=null; };
document.addEventListener("visibilitychange",()=>document.hidden?gone():back()); addEventListener("blur",gone); addEventListener("focus",back);
["copy","cut","contextmenu","dragstart"].forEach(ev=>document.addEventListener(ev,e=>{ if(live()&&!e.target.closest("textarea")) e.preventDefault(); }));
document.addEventListener("paste",e=>{ if(live()&&e.target.closest("textarea")){ e.preventDefault(); S.paste++; save(); } });
const bar=(t)=>`<div class="bar"><div class="bt"><b>${E(CFG.label)}</b><span> · ${t}</span></div><div class="timer" id="timer">--:--</div><button class="pill" data-jqr>Java Quick Reference</button></div>`;
const PCT=s=>Math.round(s*10)/10, ap=p=>p>=91?5:p>=70?4:p>=50?3:p>=30?2:1;

/* ---------- intro ---------- */
function intro(){ app.innerHTML=`<div class="wrap"><p class="kick">Z-AP Computer Science A · Exam Prep</p><h1>${E(CFG.label)}</h1><p class="lead">${E(CFG.title)} · Follows the AP Computer Science A exam format used since May 2026.</p>
 <div class="purpose"><h3>Why these practice exams?</h3><p>These tests are made to help you prepare for the AP Computer Science A Exam. This is the place to make mistakes: <b>make them here, learn from them, and don't repeat them on the real exam.</b></p><p>After you submit, every multiple-choice question shows a step-by-step trace and why each wrong answer is wrong, and every free-response question has a scoring guide and a model solution explained line by line.</p></div>
 <div class="secs"><div class="card"><b>Section I</b>42 multiple choice · 90 min · 55%</div><div class="card"><b>Section II</b>4 free response · 90 min · 45%<br>Q1 Methods and Control Structures (7) · Q2 Class Design (7) · Q3 ArrayList (5) · Q4 2D Array (6)</div></div>
 <div class="card"><h3>How it works</h3><ol><li>Section I: 42 questions, 90 minutes. You can move between questions and mark them for review.</li><li>A ${BRK}-minute break with a chime at the end.</li><li>Section II: write Java code for 4 questions in 90 minutes. Your code saves as you type.</li><li>After you submit: your multiple-choice score with full explanations, then you score your code point by point with the scoring guide, and see your predicted AP score.</li></ol>
 <p class="note">No calculator. The Java Quick Reference is available in both sections (button at the top). Composite = (MC correct ÷ 42) × 55 + (FRQ points ÷ 25) × 45. Predicted AP score: 91–100% → 5 · 70–90% → 4 · 50–69% → 3 · 30–49% → 2 · below 30% → 1.</p>
 <div class="row"><button class="pill" data-jqr>Java Quick Reference</button><a class="pill" href="../">All practice exams</a></div></div>
 <div class="card"><label class="lab">Your name (appears on your results page)<input id="nm" value="${E(S.name)}" placeholder="First and last name"></label><label class="chk"><input type="checkbox" id="tm" ${S.timed?"checked":""}> Timed, like the real exam (recommended)</label>
 <div class="rules"><b>Test rules</b><ul><li>Stay on this page. Every time you switch apps or tabs is recorded with the time and length and shown on your results page.</li><li>Copying questions and pasting code are turned off. No IDE, compiler or notes: write the code yourself, as on the exam.</li><li>Turn on Do Not Disturb before you start.</li></ul><label class="chk"><input type="checkbox" id="agree"> I will follow these rules and do my own work.</label></div>
 <button class="pill dark big" id="go">Start Section I</button></div></div>`;
 $("#go").onclick=()=>{ if(!$("#agree").checked) return modal("<h3>Please read the test rules</h3><p>Tick the box to agree before you start.</p>",[{t:"OK",p:1}]); if(!$("#nm").value.trim()) return modal("<h3>Enter your name</h3>",[{t:"OK",p:1}]);
  try{ document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen(); }catch(e){} unlock(); S.name=$("#nm").value.trim(); S.timed=$("#tm").checked; S.phase="mc"; S.mcStart=Date.now(); save(); render(); }; }

/* ---------- Section I ---------- */
function mc(){ const i=Math.min(S.cur,T.mc.length-1), q=T.mc[i];
 app.innerHTML=`${bar("Section I: Multiple Choice")}<div class="wrap"><div class="qnav">${T.mc.map((x,j)=>`<button class="qn${j===i?" on":""}${S.mc[j]!=null?" done":""}${S.flag[j]?" fl":""}" data-q="${j}">${j+1}</button>`).join("")}</div>
 <div class="cx-q"><div class="cx-qh"><span>Question ${i+1} of ${T.mc.length}</span></div><div>${q.q}</div>${q.code?`<pre>${E(q.code)}</pre>`:""}<div class="cx-ch">${q.ch.map((c,j)=>`<button type="button" data-j="${j}" class="${S.mc[i]===j?"sel":""}"><b>${AB[j]}</b><span>${E(c)}</span></button>`).join("")}</div>
 <div class="row"><button class="pill" id="fl">${S.flag[i]?"★ Marked for review":"☆ Mark for review"}</button></div><div class="row sp"><button class="pill" id="pv" ${i?"":"disabled"}>← Previous</button><button class="pill dark" id="nx">${i===T.mc.length-1?"Review & finish Section I":"Next →"}</button></div></div>
 <p class="note">Answered ${Object.keys(S.mc).length} of ${T.mc.length}.</p></div>`;
 $$(".cx-ch button").forEach(b=>b.onclick=()=>{ S.mc[i]=+b.dataset.j; save(); $$(".cx-ch button").forEach(x=>x.classList.toggle("sel",x===b)); $$(".qn")[i].classList.add("done"); });
 $$(".qn").forEach(b=>b.onclick=()=>{ S.cur=+b.dataset.q; save(); mc(); scrollTo(0,0); });
 $("#fl").onclick=()=>{ S.flag[i]=!S.flag[i]; save(); mc(); }; $("#pv").onclick=()=>{ S.cur=i-1; save(); mc(); scrollTo(0,0); };
 $("#nx").onclick=()=>{ if(i<T.mc.length-1){ S.cur=i+1; save(); mc(); scrollTo(0,0); } else { const un=T.mc.length-Object.keys(S.mc).length; modal(`<h3>Finish Section I?</h3><p>${un?`<b>${un}</b> unanswered. There is no penalty for guessing.`:"All questions answered."}</p><p>You cannot return to Section I after you finish it.</p>`,[{t:"Keep working"},{t:"Finish Section I",p:1,f:endMC}]); } };
 timer("mcStart",MIN_MC,endMC); }
function endMC(){ S.phase="brk"; S.brStart=Date.now(); save(); render(); }
function brk(){ app.innerHTML=`${bar("Break")}<div class="wrap center"><h1>Section I is complete</h1><p class="lead">Take a ${BRK}-minute break. A chime will sound when it's over.</p><p>Section II: 4 free-response questions in 90 minutes. Write complete Java code. Read each question carefully, including the class it belongs to and the examples.</p><button class="pill dark big" id="go">Start Section II now</button></div>`;
 const go=()=>{ S.phase="fr"; S.frStart=Date.now(); save(); render(); }; $("#go").onclick=()=>{ unlock(); go(); }; if(S.timed) timer("brStart",BRK,go); else $("#timer").textContent="untimed"; }

/* ---------- Section II ---------- */
function fr(){ const i=Math.min(S.fcur,3), f=T.fr[i];
 app.innerHTML=`${bar("Section II: Free Response")}<div class="wrap"><div class="qnav">${T.fr.map((x,k)=>`<button class="qn wide${k===i?" on":""}" data-f="${k}">Q${k+1}</button>`).join("")}</div>
 <div class="cx-f"><div class="cx-qh"><span class="cx-tag">Question ${i+1}: ${CSFRQ.TYPES[f.type]}</span><span>${f.parts.reduce((s,p)=>s+p.points,0)} points</span></div><h3 style="margin:.2em 0">${E(f.title)}</h3>${f.intro}
 ${f.parts.map(p=>`<p>${f.parts.length>1?`<b>Part (${p.id})</b> (${p.points} points). `:""}${p.prompt}</p><textarea spellcheck="false" autocapitalize="off" autocomplete="off" data-k="${i}-${p.id}" placeholder="${E(p.sig)}\n{\n    \n}">${E(S.fr[i+"-"+p.id]||"")}</textarea>`).join("")}
 <div class="row sp"><button class="pill" id="pv" ${i?"":"disabled"}>← Previous question</button><button class="pill dark" id="nx">${i===3?"Submit test":"Next question →"}</button></div></div></div>`;
 $$("textarea").forEach(t=>{ t.oninput=()=>{ S.fr[t.dataset.k]=t.value; save(); }; t.onkeydown=e=>{ if(e.key==="Tab"){ e.preventDefault(); const s=t.selectionStart; t.value=t.value.slice(0,s)+"    "+t.value.slice(t.selectionEnd); t.selectionStart=t.selectionEnd=s+4; t.oninput(); } }; });
 $$("[data-f]").forEach(b=>b.onclick=()=>{ S.fcur=+b.dataset.f; save(); fr(); scrollTo(0,0); });
 $("#pv").onclick=()=>{ S.fcur=i-1; save(); fr(); scrollTo(0,0); };
 $("#nx").onclick=()=>{ if(i<3){ S.fcur=i+1; save(); fr(); scrollTo(0,0); } else modal("<h3>Submit your test?</h3><p>After you submit you can't change your answers. Your scores and the scoring guides will appear.</p>",[{t:"Keep working"},{t:"Submit",p:1,f:submit}]); };
 timer("frStart",MIN_FR,submit); }
function submit(){ clearInterval(tick); S.phase="done"; S.submitted=Date.now(); save(); render(); scrollTo(0,0); }

/* ---------- results ---------- */
function done(){ const right=T.mc.filter((q,i)=>S.mc[i]===q.ai).length; const byU={}; T.mc.forEach((q,i)=>{ byU[q.u]=byU[q.u]||[0,0]; byU[q.u][1]++; if(S.mc[i]===q.ai) byU[q.u][0]++; });
 const frMax=T.fr.reduce((s,f)=>s+f.parts.reduce((a,p)=>a+p.points,0),0);
 const tot=()=>{ let fp=0; T.fr.forEach((f,i)=>f.parts.forEach(p=>p.pts.forEach((x,k)=>{ if(S.self[`${i}-${p.id}-${k}`]) fp++; }))); return {fp,pct:PCT(right/42*MCW+fp/frMax*(100-MCW))}; };
 const away=S.away.reduce((a,b)=>a+b.d,0);
 app.innerHTML=`<div class="wrap"><div class="res-h"><p class="kick">Z-AP Computer Science A · ${E(CFG.label)} · Results</p><h1>${E(S.name||"Student")}</h1><p>Submitted ${new Date(S.submitted).toLocaleString()}${S.timed?" · timed":" · untimed"}</p></div>
 <div class="score"><div><span>Multiple choice</span><b>${right} / 42</b></div><div><span>Free response (self-scored)</span><b id="frs">0 / ${frMax}</b></div><div><span>Composite</span><b id="pc">0%</b></div><div class="ap"><span>Predicted AP score</span><b id="ap">1</b></div></div>
 <div class="row"><button class="pill dark" onclick="window.print()">Print / save as PDF for your teacher</button></div>
 <div class="integ ${S.away.length||S.paste?"flag":"ok"}"><h3>${S.away.length||S.paste?`⚠ Left the test ${S.away.length} time${S.away.length===1?"":"s"} (${away} s in total); paste attempts: ${S.paste}`:"✓ Test integrity: no time away from the test recorded"}</h3>${S.away.length?`<ul>${S.away.map(x=>`<li>${new Date(x.t).toLocaleTimeString()}: ${x.d} s (${x.ph==="mc"?"Section I":"Section II"})</li>`).join("")}</ul>`:""}</div>
 <div class="purpose"><h3>Learn from your mistakes</h3><p>For each question you missed, read the trace and find the exact step where your thinking went wrong. For your code, compare it with the model line by line: most lost points come from the same few mistakes (off-by-one loops, == with Strings, removing while traversing forward, integer division).</p></div>
 <h2>Multiple choice by unit</h2><table class="tb wide"><tr><th>Unit</th><th>Correct</th></tr>${[1,2,3,4].map(u=>`<tr><td>Unit ${u}</td><td>${(byU[u]||[0,0])[0]} / ${(byU[u]||[0,0])[1]}</td></tr>`).join("")}</table>
 <h2>Section II: score your code</h2><p>For each point, read what earns it and what does not, compare with your code and the model, and tick it only if your code earns it. Points for blank answers are locked at 0. ⚠ notes flag common errors the page found in your code.</p>
 ${T.fr.map((f,i)=>`<div class="cx-f"><h3>Question ${i+1}: ${E(f.title)} <span class="cx-tag">${CSFRQ.TYPES[f.type]}</span> <span class="fq" data-fq="${i}"></span></h3><details><summary>Show the question</summary>${f.intro}</details>
  ${f.parts.map(p=>{ const txt=S.fr[i+"-"+p.id]||""; const w=CSX.quickChecks(txt,p); return `<div class="part"><p>${f.parts.length>1?`<b>Part (${p.id})</b> `:""}${p.prompt}</p><div class="ya"><span>Your code</span><pre>${E(txt)||"(blank)"}</pre></div>${w.map(x=>`<div class="warn">⚠ ${E(x)}</div>`).join("")}
   ${p.pts.map((x,k)=>{ const id=`${i}-${p.id}-${k}`; if(!txt.trim()) S.self[id]=false; return `<div class="cx-pt"><label><input type="checkbox" data-pt="${id}" ${S.self[id]?"checked":""} ${txt.trim()?"":"disabled"}> <b>${E(x.t)}</b> (1 point)</label><div class="e"><b>Earns the point:</b> ${E(x.earn)}</div>${x.not?`<div class="n"><b>Does not earn it:</b> ${E(x.not)}</div>`:""}</div>`; }).join("")}
   <details><summary><b>Model solution, line by line</b></summary>${CSX.codeLines(p.model)}</details></div>`; }).join("")}
  <p><b>Common mistakes:</b> ${f.mistakes.map(E).join(" ")}</p></div>`).join("")}
 <h2>Section I: every question explained</h2>${T.mc.map((q,i)=>`<div class="cx-q"><div class="cx-qh"><span>Question ${i+1}</span><span class="cx-tag l${q.lvl}">${{1:"Easy",2:"Medium",3:"Hard"}[q.lvl]}</span><span class="cx-tag">Unit ${q.u} · ${E(q.topic)}</span></div><div>${q.q}</div>${q.code?`<pre>${E(q.code)}</pre>`:""}<div class="cx-ch">${q.ch.map((c,j)=>`<button type="button" class="${j===q.ai?"ok":j===S.mc[i]?"no":""}"><b>${AB[j]}</b><span>${E(c)}</span></button>`).join("")}</div>${CSX.explain(q,S.mc[i]!=null?S.mc[i]:null)}</div>`).join("")}
 <div class="card"><h3>Keep practicing</h3><div class="row"><a class="pill dark" href="../new/">⟳ Generate a new test</a><button class="pill" id="rs">Retake this test</button><a class="pill" href="../">All practice exams</a><a class="pill" href="../../">Back to the book</a></div></div></div>`;
 save(); const upd=()=>{ const t=tot(); T.fr.forEach((f,i)=>{ let s=0,n=0; f.parts.forEach(p=>p.pts.forEach((x,k)=>{ n++; if(S.self[`${i}-${p.id}-${k}`]) s++; })); $(`[data-fq="${i}"]`).textContent=`${s} / ${n}`; }); $("#frs").textContent=`${t.fp} / ${frMax}`; $("#pc").textContent=t.pct+"%"; $("#ap").textContent=ap(Math.round(t.pct)); };
 $$("[data-pt]").forEach(c=>c.onchange=()=>{ S.self[c.dataset.pt]=c.checked; save(); upd(); }); upd();
 $("#rs").onclick=()=>modal(`<h3>Retake ${E(CFG.label)}?</h3><p>This erases your answers for this test on this device.</p>`,[{t:"Cancel"},{t:"Erase and restart",p:1,f:()=>{ localStorage.removeItem(KEY); location.reload(); }}]); }

function render(){ clearInterval(tick); ({intro,mc,brk,fr,done}[S.phase]||intro)(); }
render();
window.CSEXAM_BUILD=build;
})();
