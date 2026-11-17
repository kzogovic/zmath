/* Z-Math AP Exam Prep engine for AP Calculus AB, AP Calculus BC and AP Precalculus.
   The page sets window.ZTEST (from ZX.build) with n, course, title before this script loads.
   Phases: intro → mcA → mcB → brk → frA → frB → done. Answers are saved in localStorage as the student works. */
(function(){
"use strict";
const T=window.ZTEST, C=ZX.COURSES[T.course], KEY=`zmx-${T.course}exam-${T.key||("t"+T.n)}`;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
let S; try{ S=JSON.parse(localStorage.getItem(KEY))||null; }catch(e){ S=null; }
if(!S) S={phase:"intro",name:"",timed:true,mc:{},flag:{},fr:{},self:{},cur:0,fcur:0};
S.away=S.away||[]; S.paste=S.paste||0; S.fsx=S.fsx||0;
const save=()=>{ try{ localStorage.setItem(KEY,JSON.stringify(S)); }catch(e){} };
const app=$("#app");
const MCN=C.mcA+C.mcB, FRN=C.frA+C.frB, PCT=C.mcW, FPCT=100-C.mcW;
const PH={mcA:{nm:"Section I, Part A",calc:0,min:C.minA,list:T.partA,pre:"A"},mcB:{nm:"Section I, Part B",calc:1,min:C.minB,list:T.partB,pre:"B"},
          frA:{nm:"Section II, Part A",calc:1,min:C.fminA,list:T.frA},frB:{nm:"Section II, Part B",calc:0,min:C.fminB,list:T.frB}};
const ctag=c=>c?`<span class="ptag gc">Graphing calculator required</span>`:`<span class="ptag nc">No calculator</span>`;

/* ---------- sound ---------- */
let AC=null;
function unlockAudio(){ try{ AC=AC||new (window.AudioContext||window.webkitAudioContext)(); if(AC.state==="suspended") AC.resume(); }catch(e){} }
function chime(){ try{ unlockAudio(); if(!AC) return; [0,0.35,0.7].forEach((t,i)=>{ const o=AC.createOscillator(), g=AC.createGain(); o.type="sine"; o.frequency.value=[880,660,990][i]; g.gain.setValueAtTime(0.0001,AC.currentTime+t); g.gain.exponentialRampToValueAtTime(0.35,AC.currentTime+t+0.03); g.gain.exponentialRampToValueAtTime(0.0001,AC.currentTime+t+0.6); o.connect(g); g.connect(AC.destination); o.start(AC.currentTime+t); o.stop(AC.currentTime+t+0.65); }); }catch(e){} try{ navigator.vibrate&&navigator.vibrate([300,150,300]); }catch(e){} }

/* ---------- timer, header, modal ---------- */
function header(title,calc,timer){ return `<div class="bar"><div class="bt"><b>${esc(T.label)}</b><span> · ${esc(title)}</span> ${calc==null?"":ctag(calc)}</div>${timer?`<div class="timer" id="timer">--:--</div>`:""}<button class="pill" data-open="calc">Calculator rules</button></div>`; }
function remaining(k,min){ if(!S.timed) return Infinity; return Math.max(0,min*60-(Date.now()-S[k])/1000); }
const fmt=s=>s===Infinity?"untimed":`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`;
let tick=null;
function startTick(k,min,onEnd){ clearInterval(tick); const run=()=>{ const r=remaining(k,min), el=$("#timer"); if(el){ el.textContent=fmt(r); el.classList.toggle("low",r<300); } if(r<=0){ clearInterval(tick); chime(); onEnd(); } }; run(); if(S.timed) tick=setInterval(run,1000); }
function modal(html,buttons){ const m=document.createElement("div"); m.className="modal"; m.innerHTML=`<div class="mbox">${html}<div class="mbtn">${buttons.map((b,i)=>`<button class="pill ${b.primary?"dark":""}" data-i="${i}">${b.t}</button>`).join("")}</div></div>`; document.body.appendChild(m); m.querySelectorAll("[data-i]").forEach(x=>x.onclick=()=>{ m.remove(); const f=buttons[+x.dataset.i].f; f&&f(); }); }

/* ---------- calculator policy ---------- */
function calcHTML(){ const pc=T.course==="pc";
 return `<div class="ref"><h2>Calculators on the ${C.name} Exam</h2>
 <div class="card"><h3>When a calculator is allowed</h3><ul>
 <li><b>Section I, Part A</b> (${C.mcA} questions) and <b>Section II, Part B</b> (${C.frB} questions): <b>no calculator</b>.</li>
 <li><b>Section I, Part B</b> (${C.mcB} questions) and <b>Section II, Part A</b> (${C.frA} questions): a <b>graphing calculator is required</b>.</li>
 <li>You may use an approved handheld graphing calculator and/or the Desmos graphing calculator built into Bluebook. Only the Bluebook version of Desmos is allowed on exam day, not the website or app.</li>
 <li>${pc?"You should be able to graph functions, find zeros and intersections, compute values, and run regressions (linear, quadratic, cubic, quartic, exponential, logarithmic and sinusoidal).":"Your calculator must be able to: plot the graph of a function in any viewing window, find the zeros of functions (solve equations numerically), numerically calculate the derivative of a function at a point, and numerically calculate the value of a definite integral."}</li>
 <li>Make sure your calculator is in <b>radian mode</b>.</li></ul>
 <p class="note">Source: College Board, AP ${pc?"Precalculus":"Calculus"} Course and Exam Description and the AP calculator policy (<a href="https://apstudents.collegeboard.org/exam-policies-guidelines/calculator-policies" target="_blank" rel="noopener">apstudents.collegeboard.org</a>). The approved list changes during the year, so check it before exam day.</p></div>
 <div class="card"><h3>Free-response rules</h3><ul><li>Show the setup: write the integral, derivative or equation you are evaluating. <b>Calculator syntax</b> such as fnInt(…), nDeriv(…) or solve(…) <b>does not earn credit</b> by itself.</li>
 <li>Decimal answers must be correct to <b>three places after the decimal point</b>. Do not round in the middle of a computation: store values in the calculator.</li>
 <li>Include units when the question asks for them, and answer in the context of the problem.</li></ul></div>
 <h3>Approved handheld graphing calculators</h3><div class="cards calc">
 <div class="dc"><div class="dh">Texas Instruments</div><ul><li>TI-73</li><li>TI-80</li><li>TI-81</li><li>TI-82</li><li>TI-83 / TI-83 Plus</li><li>TI-83 Plus Silver</li><li>TI-84 Plus / TI-84 Plus CE</li><li>TI-84 Plus CE Python</li><li>TI-84 Plus Silver</li><li>TI-84 Plus C Silver</li><li>TI-84 Plus T</li><li>TI-84 Plus CE-T</li><li>TI-84 Plus CE-T Python Edition</li><li>TI-84 Evo (new)</li><li>TI-84 Evo-T (new)</li><li>TI-85</li><li>TI-86</li><li>TI-89</li><li>TI-89 Titanium</li><li>TI-Nspire / TI-Nspire CX</li><li>TI-Nspire CX II</li><li>TI-Nspire CX II-T</li><li>TI-Nspire CAS</li><li>TI-Nspire CX CAS</li><li>TI-Nspire CM-C</li><li>TI-Nspire CM-C CAS</li><li>TI-Nspire CX-C CAS</li><li>TI-Nspire CX II CAS</li><li>TI-Nspire CX II-T CAS</li><li>TI-Nspire CX II-C CAS</li></ul></div>
 <div class="dc"><div class="dh">Casio</div><ul><li>FX-6000 Series</li><li>FX-6200 Series</li><li>FX-6300 Series</li><li>FX-6500 Series</li><li>FX-7000 Series</li><li>FX-7300 Series</li><li>FX-7400 Series</li><li>FX-7500 Series</li><li>FX-7700 Series</li><li>FX-7800 Series</li><li>FX-8000 Series</li><li>FX-8500 Series</li><li>FX-8700 Series</li><li>FX-8800 Series</li><li>Graph25 Series</li><li>FX-9700 Series</li><li>FX-9750 Series</li><li>FX-9860 Series</li><li>CFX-9800 Series</li><li>CFX-9850 Series</li><li>CFX-9950 Series</li><li>CFX-9970 Series</li><li>FX 1.0 Series</li><li>Algebra FX 2.0 Series</li><li>FX-CG-10</li><li>FX-CG-20 Series</li><li>FX-CG-50</li><li>Graph35 Series</li><li>Graph75 Series</li><li>Graph95 Series</li><li>Graph100 Series</li><li>FX-CG500 (stylus not permitted)</li><li>FX-CG-100</li></ul></div>
 <div class="dc"><div class="dh">Hewlett-Packard</div><ul><li>HP-9G</li><li>HP-28 Series</li><li>HP-38G</li><li>HP-39 Series</li><li>HP-40 Series</li><li>HP-48 Series</li><li>HP-49 Series</li><li>HP-50 Series</li><li>HP Prime</li></ul></div>
 <div class="dc"><div class="dh">Sharp</div><ul><li>EL-5200</li><li>EL-9200 Series</li><li>EL-9300 Series</li><li>EL-9600 Series (stylus not permitted)</li><li>EL-9900 Series</li></ul></div>
 <div class="dc"><div class="dh">Radio Shack</div><ul><li>EC-4033</li><li>EC-4034</li><li>EC-4037</li></ul></div>
 <div class="dc"><div class="dh">Other</div><ul><li>Datexx DS-883</li><li>Micronta</li><li>NumWorks</li><li>Smart2</li><li>Zero ZGC4 (new)</li></ul></div></div>
 <h3>Not allowed</h3><ul><li>Phones, smartwatches, smart glasses or other wearables; laptops, tablets or electronic writing pads</li><li>QWERTY-keypad models (e.g., TI-92 Plus, Voyage 200); pen/stylus models (e.g., Casio ClassPad)</li><li>Models with wireless, Bluetooth, cellular or internet access, a camera or scanning, audio/video recording, a paper tape, or that need an outlet or make noise</li><li>Touch-screen models not on the approved list; peripherals such as a stylus, keyboard or wireless adapter</li></ul>
 <p class="note">Exceptions only with an accommodation approved by the College Board SSD Office.</p></div>`; }
document.addEventListener("click",e=>{ const b=e.target.closest("[data-open]"); if(!b) return; document.querySelectorAll(".sheet").forEach(x=>x.remove()); const d=document.createElement("div"); d.className="sheet"; d.innerHTML=`<div class="sbox"><button class="pill dark close">Close ✕</button>${calcHTML()}<button class="pill dark close">Close ✕</button></div>`; document.body.appendChild(d); d.querySelectorAll(".close").forEach(c=>c.onclick=()=>d.remove()); });

/* ---------- integrity monitor ---------- */
const live=()=>/^(mcA|mcB|frA|frB)$/.test(S.phase);
let awayAt=null;
function goneAway(){ if(!live()||awayAt) return; awayAt=Date.now(); }
function cameBack(){ if(!awayAt) return; const d=Math.round((Date.now()-awayAt)/1000); if(d>=1){ S.away.push({t:awayAt,d,ph:S.phase}); save(); showWarn(d); } awayAt=null; }
document.addEventListener("visibilitychange",()=>document.hidden?goneAway():cameBack());
window.addEventListener("blur",goneAway); window.addEventListener("focus",cameBack); window.addEventListener("pagehide",goneAway);
function showWarn(d){ const w=document.createElement("div"); w.className="awaywarn"; w.innerHTML=`⚠ You left the test for ${d} s. This has been recorded and will appear on your results page.`; document.body.appendChild(w); setTimeout(()=>w.remove(),5000); }
["copy","cut","contextmenu","dragstart"].forEach(ev=>document.addEventListener(ev,e=>{ if(live()&&!e.target.closest("textarea")) e.preventDefault(); }));
document.addEventListener("paste",e=>{ if(live()&&e.target.closest("textarea")){ e.preventDefault(); S.paste++; save(); const w=document.createElement("div"); w.className="awaywarn"; w.textContent="⚠ Pasting is turned off during the test. The attempt was recorded."; document.body.appendChild(w); setTimeout(()=>w.remove(),4000); } });
function goFull(){ try{ const el=document.documentElement; (el.requestFullscreen||el.webkitRequestFullscreen||function(){}).call(el); }catch(e){} }
document.addEventListener("fullscreenchange",()=>{ if(!document.fullscreenElement&&live()){ S.fsx++; save(); } });
const PHN={mcA:"Section I Part A",mcB:"Section I Part B",frA:"Section II Part A",frB:"Section II Part B"};
function integrityHTML(){ const a=S.away, tot=a.reduce((x,y)=>x+y.d,0), fmtd=d=>d>=60?`${Math.floor(d/60)} min ${d%60} s`:`${d} s`, clean=!a.length&&!S.paste;
 return `<div class="integ ${clean?"ok":"flag"}"><h3>${clean?"✓ Test integrity: no time away from the test recorded":"⚠ Test integrity report"}</h3>
 ${clean?"<p>The student stayed on the test page for the whole exam and made no paste attempts.</p>":`<p><b>Left the test ${a.length} time${a.length===1?"":"s"}, ${fmtd(tot)} in total</b> (${Object.keys(PHN).map(p=>{ const b=a.filter(x=>x.ph===p); return b.length?`${PHN[p]}: ${b.length}×, ${fmtd(b.reduce((x,y)=>x+y.d,0))}`:""; }).filter(Boolean).join("; ")}). Paste attempts: ${S.paste}. Exits from full screen: ${S.fsx}.</p>
 ${a.length?`<details><summary>Show each time away</summary><ul>${a.map(x=>`<li>${new Date(x.t).toLocaleTimeString()}: ${fmtd(x.d)} (${PHN[x.ph]||x.ph})</li>`).join("")}</ul></details>`:""}`}
 <p class="note">“Time away” means the test page was hidden or lost focus: another app, tab, notification or call was opened.</p></div>`; }

/* ---------- intro ---------- */
function intro(){
 const pc=T.course==="pc";
 app.innerHTML=`<div class="wrap"><p class="kick">${esc(C.book)} · Exam Prep</p><h1>${esc(T.label)}</h1><p class="lead">${esc(T.title)} · Follows the 2026–27 ${C.name} Course and Exam Description (first exam: May 2027)</p>
 <div class="purpose"><h3>Why these practice exams?</h3><p>These tests are made to help you prepare for the ${C.name} Exam. This is the place to make mistakes: <b>make them here, learn from them, and don't repeat them on the real exam.</b></p><p>The score matters less than what you learn. The most important thing is to <b>understand the concepts</b> and <b>apply the skills you have learned</b> to solve problems. After you submit, read every explanation and rubric point carefully, especially for questions you got right by guessing.</p></div>
 <div class="secs">
  <div class="card"><b>Section I, Part A</b>${C.mcA} multiple choice · ${C.minA} min<br>${ctag(0)}</div>
  <div class="card"><b>Section I, Part B</b>${C.mcB} multiple choice · ${C.minB} min<br>${ctag(1)}</div>
  <div class="card"><b>Section II, Part A</b>${C.frA} free response · ${C.fminA} min<br>${ctag(1)}</div>
  <div class="card"><b>Section II, Part B</b>${C.frB} free response · ${C.fminB} min<br>${ctag(0)}</div></div>
 <div class="card"><h3>How it works</h3><ol><li>Section I: Part A (${C.minA} min), then Part B (${C.minB} min). When a part ends you cannot go back to it.</li><li>${C.brk}-minute break, with a chime at the end.</li><li>Section II: Part A (${C.fminA} min), then Part B (${C.fminB} min), then automatic submission. During Part B you can still look at the Part A questions but you cannot change those answers, like on the real exam.</li><li>After you submit: your multiple-choice score with a worked explanation for every question; each free-response answer next to its scoring guidelines, with problems the page caught highlighted; then you score yourself point by point; and your predicted AP score.</li></ol>
 <p class="note">Section I counts ${PCT}% and Section II counts ${FPCT}% of the composite score. ${pc?"Each free-response question is worth 6 points.":"Each free-response question is worth 9 points."} Predicted AP score: 91–100% → 5 · 70–90% → 4 · 50–69% → 3 · 30–49% → 2 · below 30% → 1.</p>
 <p>Your answers save on this device as you go, so you can close the page and come back.</p>
 <div class="row"><button class="pill" data-open="calc">Calculator rules</button><a class="pill" href="../">All practice exams</a></div></div>
 <div class="card"><label class="lab">Your name (appears on your results page)<input id="nm" value="${esc(S.name)}" placeholder="First and last name"></label>
 <label class="chk"><input type="checkbox" id="tm" ${S.timed?"checked":""}> Timed, like the real exam (recommended)</label>
 <div class="rules"><b>Test rules</b><ul><li>Stay on this page for the whole test. Every time you switch apps or tabs, or a call or notification takes you away, it is <b>recorded with the time and length</b>, and it appears on the results page your teacher sees.</li><li>Copying questions and pasting answers are turned off.</li><li>The test opens in full screen when possible. Turn on <b>Do Not Disturb</b> before you start.</li><li>Use a calculator <b>only</b> in the parts marked <span class="ptag gc">Graphing calculator required</span>. No notes and no formula sheet: the AP ${pc?"Precalculus":"Calculus"} Exam has none.</li></ul><label class="chk"><input type="checkbox" id="agree"> I will follow these rules and do my own work.</label></div>
 <p class="note">Have paper and a pencil ready for work. Turn your sound on so you hear the chimes.</p><button class="pill dark big" id="go">Start Section I, Part A</button></div></div>`;
 $("#go").onclick=()=>{ if(!$("#agree").checked){ modal("<h3>Please read the test rules</h3><p>Tick the box to agree to the test rules before you start.</p>",[{t:"OK",primary:1}]); return; } if(!$("#nm").value.trim()){ modal("<h3>Enter your name</h3><p>Your name appears on your results page.</p>",[{t:"OK",primary:1}]); return; } goFull(); unlockAudio(); S.name=$("#nm").value.trim(); S.timed=$("#tm").checked; begin("mcA"); };
}
function begin(ph){ S.phase=ph; S[ph+"Start"]=Date.now(); S.cur=0; S.fcur=0; save(); render(); scrollTo(0,0); }
const NEXT={mcA:"mcB",mcB:"brk",frA:"frB",frB:"done"};
function endPart(ph){ if(ph==="mcB"){ S.phase="brk"; S.brStart=Date.now(); save(); render(); return; } if(ph==="frB"){ submit(); return; } begin(NEXT[ph]); }

/* ---------- Section I ---------- */
function mc(ph){
 const P=PH[ph], Q=P.list, i=Math.min(S.cur,Q.length-1), q=Q[i], k=P.pre+i, off=ph==="mcB"?C.mcA:0;
 app.innerHTML=`${header(P.nm+": Multiple Choice",P.calc,true)}<div class="wrap">
 <div class="qnav">${Q.map((x,j)=>`<button class="qn${j===i?" on":""}${S.mc[P.pre+j]!=null?" done":""}${S.flag[P.pre+j]?" fl":""}" data-q="${j}">${j+1+off}</button>`).join("")}</div>
 <div class="q"><div class="qh"><b>Question ${i+1+off}</b> <span class="pv">${i+1} of ${Q.length} in this part</span></div><div class="qt">${q.q}</div>
 <div class="chs">${q.ch.map((c,j)=>`<label class="ch${S.mc[k]===j?" sel":""}"><input type="radio" name="a" value="${j}" ${S.mc[k]===j?"checked":""}><span class="lt">${"ABCD"[j]}</span><span>${c}</span></label>`).join("")}</div>
 <div class="row"><button class="pill" id="fl">${S.flag[k]?"★ Marked for review":"☆ Mark for review"}</button></div>
 <div class="row sp"><button class="pill" id="pv" ${i===0?"disabled":""}>← Previous</button><button class="pill dark" id="nx">${i===Q.length-1?`Review & finish Part ${P.pre}`:"Next →"}</button></div></div>
 <p class="note">Answered ${Q.filter((_,j)=>S.mc[P.pre+j]!=null).length} of ${Q.length} in this part.</p></div>`;
 $$(".chs input").forEach(r=>r.onchange=()=>{ S.mc[k]=+r.value; save(); $$(".ch").forEach((l,j)=>l.classList.toggle("sel",j===+r.value)); $$(".qn")[i].classList.add("done"); });
 $$(".qn").forEach(b=>b.onclick=()=>{ S.cur=+b.dataset.q; save(); mc(ph); scrollTo(0,0); });
 $("#fl").onclick=()=>{ S.flag[k]=!S.flag[k]; save(); mc(ph); };
 $("#pv").onclick=()=>{ S.cur=i-1; save(); mc(ph); scrollTo(0,0); };
 $("#nx").onclick=()=>{ if(i<Q.length-1){ S.cur=i+1; save(); mc(ph); scrollTo(0,0); } else { const un=Q.filter((_,j)=>S.mc[P.pre+j]==null).length;
   modal(`<h3>Finish ${P.nm}?</h3><p>${un?`You have <b>${un}</b> unanswered question${un>1?"s":""} in this part. There is no penalty for guessing.`:"All questions in this part are answered."}</p><p>You cannot return to this part after you finish it.</p>`,[{t:"Keep working"},{t:`Finish Part ${P.pre}`,primary:1,f:()=>endPart(ph)}]); } };
 startTick(ph+"Start",P.min,()=>endPart(ph));
}

/* ---------- break ---------- */
function brk(){
 app.innerHTML=`${header("Break",null,true)}<div class="wrap center"><h1>Section I is complete</h1><p class="lead">Take a ${C.brk}-minute break. A chime will sound when it's over.</p><p>Section II has ${FRN} free-response questions. Part A (${C.frA} questions, ${C.fminA} minutes) requires a graphing calculator; Part B (${C.frB} questions, ${C.fminB} minutes) does not allow one. Show your work: write each setup before the answer.</p><button class="pill dark big" id="go">Start Section II now</button></div>`;
 $("#go").onclick=()=>{ goFull(); unlockAudio(); begin("frA"); };
 if(S.timed) startTick("brStart",C.brk,()=>begin("frA")); else { const el=$("#timer"); if(el) el.textContent="untimed"; }
}

/* ---------- Section II ---------- */
const SYM=T.course==="pc"?["π","θ","√","²","³","ⁿ","⁻¹","≈","≠","≤","≥","∞","→","°","·","±","₁","₂","ₐ","log","ln","sin","cos","tan"]:["∫","√","π","θ","∞","→","≈","≠","≤","≥","′","″","²","³","ⁿ","⁻¹","Δ","·","±","₀","₁","₂","e^","ln","lim"];
function frq(ph){
 const P=PH[ph], F=P.list, i=Math.min(S.fcur||0,F.length-1), f=F[i], other=ph==="frB"?PH.frA.list:null;
 app.innerHTML=`${header(P.nm+": Free Response",P.calc,true)}<div class="wrap">
 <div class="qnav">${F.map((x,k)=>`<button class="qn wide${k===i?" on":""}" data-f="${k}">Q${x.id}</button>`).join("")}${other?other.map(x=>`<button class="qn wide" data-ro="${x.id}" title="Part A: view only">Q${x.id} (view)</button>`).join(""):""}</div>
 <div class="q"><div class="qh"><b>Question ${f.id}</b> · ${esc(f.type)} · ${f.max} points</div><div class="qt">${f.stem}</div>
 ${f.parts.map(p=>`<div class="part"><div class="pq"><b>(${p.id})</b> ${p.q}</div><div class="sym" data-for="${f.id}-${p.id}">${SYM.map(s=>`<button type="button" data-s="${s}">${s}</button>`).join("")}</div><textarea autocomplete="off" autocorrect="off" spellcheck="false" data-k="${f.id}-${p.id}" rows="5" placeholder="Show your setup and work, then your answer.">${esc(S.fr[f.id+"-"+p.id]||"")}</textarea></div>`).join("")}
 <div class="row sp"><button class="pill" id="pv" ${i===0?"disabled":""}>← Previous question</button><button class="pill dark" id="nx">${i===F.length-1?(ph==="frA"?"Finish Part A":"Submit test"):"Next question →"}</button></div></div></div>`;
 $$("textarea").forEach(t=>t.oninput=()=>{ S.fr[t.dataset.k]=t.value; save(); });
 $$(".sym button").forEach(b=>b.onclick=()=>{ const t=$(`textarea[data-k="${b.parentNode.dataset.for}"]`); const s=t.selectionStart??t.value.length, e=t.selectionEnd??s; t.value=t.value.slice(0,s)+b.dataset.s+t.value.slice(e); t.focus(); t.selectionStart=t.selectionEnd=s+b.dataset.s.length; S.fr[t.dataset.k]=t.value; save(); });
 $$("[data-f]").forEach(b=>b.onclick=()=>{ S.fcur=+b.dataset.f; save(); frq(ph); scrollTo(0,0); });
 $$("[data-ro]").forEach(b=>b.onclick=()=>{ const x=PH.frA.list.find(q=>q.id===+b.dataset.ro); modal(`<h3>Question ${x.id} (Part A, view only)</h3><div class="qt">${x.stem}</div>${x.parts.map(p=>`<div class="pq"><b>(${p.id})</b> ${p.q}</div><pre class="ro">${esc(S.fr[x.id+"-"+p.id]||"(blank)")}</pre>`).join("")}<p class="note">Part A answers can no longer be changed.</p>`,[{t:"Close",primary:1}]); });
 $("#pv").onclick=()=>{ S.fcur=i-1; save(); frq(ph); scrollTo(0,0); };
 $("#nx").onclick=()=>{ if(i<F.length-1){ S.fcur=i+1; save(); frq(ph); scrollTo(0,0); }
  else if(ph==="frA") modal(`<h3>Finish Section II, Part A?</h3><p>After Part A you can view these questions but not change your answers. Part B does not allow a calculator.</p>`,[{t:"Keep working"},{t:"Finish Part A",primary:1,f:()=>endPart("frA")}]);
  else modal(`<h3>Submit your test?</h3><p>After you submit, you can't change your answers. Your scores and the scoring guidelines will appear.</p>`,[{t:"Keep working"},{t:"Submit",primary:1,f:submit}]); };
 startTick(ph+"Start",P.min,()=>endPart(ph));
}
function submit(){ clearInterval(tick); S.phase="done"; S.submitted=Date.now(); save(); render(); scrollTo(0,0); }

/* ---------- results ---------- */
const test=(c,t)=>typeof c==="function"?c(t):new RegExp(c.source||c,"i").test(t);
function checkPoint(pt,txt){ const out={lock:false,msgs:[]}; const t=txt||"";
 if(!t.trim()) return {lock:true,msgs:[["bad","No answer was written for this part."]]};
 (pt.forbid||[]).forEach(([c,m])=>{ if(test(c,t)){ out.lock=true; out.msgs.push(["bad",m]); } });
 (pt.req||[]).forEach(([c,m])=>{ if(!test(c,t)){ out.lock=true; out.msgs.push(["bad",m]); } });
 (pt.need||[]).forEach(([c,m])=>{ if(!test(c,t)) out.msgs.push(["warn",m]); });
 if(/fnint|nderiv|solve\s*\(|normalcdf/i.test(t)&&!/∫|integral|d\/dx|=/.test(t)) out.msgs.push(["warn","Calculator syntax alone does not earn credit: write the mathematical setup."]);
 return out; }
function apScore(p){ return p>=91?5:p>=70?4:p>=50?3:p>=30?2:1; }
const allMC=()=>[...T.partA.map((q,i)=>[q,"A"+i,i+1]),...T.partB.map((q,i)=>[q,"B"+i,C.mcA+i+1])];
const allFR=()=>[...T.frA,...T.frB];
function totals(){ const right=allMC().filter(([q,k])=>S.mc[k]===q.a).length; const per={}; let frac=0;
 allFR().forEach(f=>{ let s=0; f.parts.forEach(p=>p.pts.forEach(pt=>{ if(S.self[pt.id]) s+=pt.v; })); per[f.id]=s; frac+=s/f.max; });
 const frPts=Object.values(per).reduce((a,b)=>a+b,0), frMax=allFR().reduce((a,f)=>a+f.max,0);
 const pct=Math.round((right/MCN*PCT+frac/FRN*FPCT)*10)/10; return {right,per,frPts,frMax,pct}; }
function done(){
 const tt=totals(); const byUnit={}; allMC().forEach(([q,k])=>{ byUnit[q.u]=byUnit[q.u]||[0,0]; byUnit[q.u][1]++; if(S.mc[k]===q.a) byUnit[q.u][0]++; });
 const partRight=pre=>(pre==="A"?T.partA:T.partB).filter((q,i)=>S.mc[pre+i]===q.a).length;
 app.innerHTML=`<div class="wrap"><div class="res-h"><p class="kick">${esc(C.book)} · ${esc(T.label)} · Results</p><h1>${esc(S.name||"Student")}</h1><p>Submitted ${new Date(S.submitted).toLocaleString()}${S.timed?" · timed":" · untimed"}</p></div>
 <div class="score"><div><span>Multiple choice</span><b>${tt.right} / ${MCN}</b></div><div><span>Free response (self-scored)</span><b id="frs">${tt.frPts} / ${tt.frMax}</b></div><div><span>Composite</span><b id="pc">${tt.pct}%</b></div><div class="ap"><span>Predicted AP score</span><b id="ap">${apScore(Math.round(tt.pct))}</b></div></div>
 <p class="note">Part A (no calculator): ${partRight("A")} / ${C.mcA} · Part B (calculator): ${partRight("B")} / ${C.mcB}. Composite = (MC correct ÷ ${MCN}) × ${PCT} + (average free-response fraction) × ${FPCT}. Predicted score: 91–100% → 5 · 70–90% → 4 · 50–69% → 3 · 30–49% → 2 · below 30% → 1. Score Section II below to finish your composite.</p>
 <div class="row"><button class="pill dark" onclick="window.print()">Print / save as PDF for your teacher</button></div>
 ${integrityHTML()}
 <div class="purpose"><h3>Learn from your mistakes</h3><p>Every mistake here is one you won't make in May. For each question you missed, read the solution, find exactly where your work went wrong, and write down the concept to review. Understanding the concepts, and applying them to new problems, is what earns points on the AP exam.</p></div>
 <h2>Multiple choice by unit</h2><table class="tb wide"><tr><th>Unit</th><th>Correct</th></tr>${Object.keys(byUnit).sort((a,b)=>a-b).map(u=>`<tr><td>Unit ${u}: ${esc(C.units[u]||"")}</td><td>${byUnit[u][0]} / ${byUnit[u][1]}</td></tr>`).join("")}</table>
 <h2>Section II: score yourself, point by point</h2><p>For each point, read <b>what earns it</b> and <b>what does not</b>, compare with your answer, and tick the box only if your answer meets the standard. Points marked <span class="bad">✕ Not earned</span> were caught automatically (for example, a blank answer) and stay at 0. <span class="warn">⚠ Check</span> notes compare your numbers with the expected values; read them carefully.</p>
 ${allFR().map(f=>`<div class="fr"><h3>Question ${f.id}: ${esc(f.title)} ${ctag(T.frA.includes(f))} <span class="fq" data-fq="${f.id}">0 / ${f.max}</span></h3><details><summary>Show the question</summary><div class="qt">${f.stem}</div></details>
  ${f.parts.map(p=>{ const txt=S.fr[f.id+"-"+p.id]||""; return `<div class="part"><div class="pq"><b>(${p.id})</b> ${p.q}</div><div class="ya"><span>Your answer</span><pre>${esc(txt)||"<i>(blank)</i>"}</pre></div>
   ${p.pts.map(pt=>{ const c=checkPoint(pt,txt); if(c.lock) S.self[pt.id]=false; return `<div class="pt${c.lock?" locked":""}"><label class="pth"><input type="checkbox" data-pt="${pt.id}" data-v="${pt.v}" data-f="${f.id}" ${S.self[pt.id]?"checked":""} ${c.lock?"disabled":""}> <b>${esc(pt.t)}</b> (${pt.v} point${pt.v>1?"s":""})</label>
    <div class="earn"><b>Earns the point:</b> ${pt.earn}</div>${pt.not?`<div class="not"><b>Does not earn the point:</b> ${pt.not}</div>`:""}
    ${c.msgs.map(([k,m])=>`<div class="${k}">${k==="bad"?"✕ Not earned: ":"⚠ Check: "}${m}</div>`).join("")}</div>`; }).join("")}
   <details class="model"><summary>Model solution for (${p.id})</summary><div>${p.model}</div></details></div>`; }).join("")}</div>`).join("")}
 <h2>Section I: every question explained</h2>${allMC().map(([q,k,no])=>{ const ok=S.mc[k]===q.a; return `<div class="mr ${ok?"ok":"no"}"><div class="qh"><b>Question ${no}</b> · Unit ${q.u} · ${k[0]==="A"?"no calculator":"calculator"} ${ok?"<span class='good'>✓ Correct</span>":"<span class='bad'>✕ "+(S.mc[k]==null?"Blank":"You chose "+"ABCD"[S.mc[k]])+"</span>"}</div><div class="qt">${q.q}</div><div class="chs ro">${q.ch.map((c,j)=>`<div class="ch${j===q.a?" right":""}${j===S.mc[k]&&j!==q.a?" wrong":""}"><span class="lt">${"ABCD"[j]}</span><span>${c}</span></div>`).join("")}</div><div class="ex"><b>Why ${"ABCD"[q.a]}:</b> ${q.ex}</div></div>`; }).join("")}
 <div class="card"><h3>Keep practicing</h3><p>Generate a brand-new full exam: new questions, new numbers, new graphs, the same AP blueprint. Or erase your answers and retake this one.</p><div class="row"><a class="pill dark" href="../new/">⟳ Generate a new test</a><button class="pill" id="rs">Retake this test</button><a class="pill" href="../">All practice exams</a></div></div></div>`;
 save();
 const upd=()=>{ const t=totals(); $$("[data-fq]").forEach(e=>{ const f=allFR().find(x=>x.id===+e.dataset.fq); e.textContent=`${t.per[f.id]} / ${f.max}`; }); $("#frs").textContent=`${t.frPts} / ${t.frMax}`; $("#pc").textContent=t.pct+"%"; $("#ap").textContent=apScore(Math.round(t.pct)); };
 $$("[data-pt]").forEach(c=>c.onchange=()=>{ S.self[c.dataset.pt]=c.checked; save(); upd(); }); upd();
 $("#rs").onclick=()=>modal(`<h3>Retake ${esc(T.label)}?</h3><p>This erases all your answers and scores for this test on this device.</p>`,[{t:"Cancel"},{t:"Erase and restart",primary:1,f:()=>{ localStorage.removeItem(KEY); location.reload(); }}]);
}

function render(){ clearInterval(tick); const p=S.phase; if(p==="intro") intro(); else if(p==="mcA"||p==="mcB") mc(p); else if(p==="brk") brk(); else if(p==="frA"||p==="frB") frq(p); else done(); }
render();
})();
