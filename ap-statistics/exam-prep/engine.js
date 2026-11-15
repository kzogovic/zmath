/* Z-AP Statistics Exam Prep engine. A test file sets window.ZTEST before this script loads.
   Phases: intro → mc (90 min) → brk (5 min) → frq (90 min) → done (results). State is kept in localStorage. */
(function(){
"use strict";
const T=window.ZTEST, KEY="zmx-statexam-t"+T.n, MC_MIN=90, BR_MIN=5, FR_MIN=90;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
let S; try{ S=JSON.parse(localStorage.getItem(KEY))||null; }catch(e){ S=null; }
if(!S) S={phase:"intro",name:"",timed:true,mcAns:{},flag:{},fr:{},self:{},cur:0};
const save=()=>{ try{ localStorage.setItem(KEY,JSON.stringify(S)); }catch(e){} };
const app=$("#app");

/* ---------------- math for tables ---------------- */
function lgamma(x){const c=[0.99999999999980993,676.5203681218851,-1259.1392167224028,771.32342877765313,-176.61502916214059,12.507343278686905,-0.13857109526572012,9.9843695780195716e-6,1.5056327351493116e-7];if(x<0.5)return Math.log(Math.PI/Math.sin(Math.PI*x))-lgamma(1-x);x-=1;let a=c[0];const t=x+7.5;for(let i=1;i<9;i++)a+=c[i]/(x+i);return 0.5*Math.log(2*Math.PI)+(x+0.5)*Math.log(t)-t+Math.log(a);}
function betacf(a,b,x){let qab=a+b,qap=a+1,qam=a-1,c=1,d=1-qab*x/qap;if(Math.abs(d)<1e-300)d=1e-300;d=1/d;let h=d;for(let m=1;m<=300;m++){const m2=2*m;let aa=m*(b-m)*x/((qam+m2)*(a+m2));d=1+aa*d;if(Math.abs(d)<1e-300)d=1e-300;c=1+aa/c;if(Math.abs(c)<1e-300)c=1e-300;d=1/d;h*=d*c;aa=-(a+m)*(qab+m)*x/((a+m2)*(qap+m2));d=1+aa*d;if(Math.abs(d)<1e-300)d=1e-300;c=1+aa/c;if(Math.abs(c)<1e-300)c=1e-300;d=1/d;const del=d*c;h*=del;if(Math.abs(del-1)<3e-14)break;}return h;}
function ibeta(x,a,b){if(x<=0)return 0;if(x>=1)return 1;const bt=Math.exp(lgamma(a+b)-lgamma(a)-lgamma(b)+a*Math.log(x)+b*Math.log(1-x));return x<(a+1)/(a+b+2)?bt*betacf(a,b,x)/a:1-bt*betacf(b,a,1-x)/b;}
function gammp(a,x){if(x<=0)return 0;if(x<a+1){let ap=a,sum=1/a,del=sum;for(let n=0;n<500;n++){ap++;del*=x/ap;sum+=del;if(Math.abs(del)<Math.abs(sum)*1e-15)break;}return sum*Math.exp(-x+a*Math.log(x)-lgamma(a));}let b=x+1-a,c=1e300,d=1/b,h=d;for(let i=1;i<500;i++){const an=-i*(i-a);b+=2;d=an*d+b;if(Math.abs(d)<1e-300)d=1e-300;c=b+an/c;if(Math.abs(c)<1e-300)c=1e-300;d=1/d;const del=d*c;h*=del;if(Math.abs(del-1)<1e-15)break;}return 1-Math.exp(-x+a*Math.log(x)-lgamma(a))*h;}
const Phi=z=>0.5*(1+Math.sign(z)*gammp(0.5,z*z/2));
const tcdf=(t,df)=>{const p=0.5*ibeta(df/(df+t*t),df/2,0.5);return t>0?1-p:p;};
const inv=(f,a,lo,hi)=>{for(let i=0;i<200;i++){const m=(lo+hi)/2;if(f(m)<a)lo=m;else hi=m;}return (lo+hi)/2;};

/* ---------------- sound ---------------- */
let AC=null;
function unlockAudio(){ try{ AC=AC||new (window.AudioContext||window.webkitAudioContext)(); if(AC.state==="suspended") AC.resume(); }catch(e){} }
function chime(){ try{ unlockAudio(); if(!AC) return; [0,0.35,0.7].forEach((t,i)=>{ const o=AC.createOscillator(), g=AC.createGain(); o.type="sine"; o.frequency.value=[880,660,990][i]; g.gain.setValueAtTime(0.0001,AC.currentTime+t); g.gain.exponentialRampToValueAtTime(0.35,AC.currentTime+t+0.03); g.gain.exponentialRampToValueAtTime(0.0001,AC.currentTime+t+0.6); o.connect(g); g.connect(AC.destination); o.start(AC.currentTime+t); o.stop(AC.currentTime+t+0.65); }); }catch(e){} try{ navigator.vibrate&&navigator.vibrate([300,150,300]); }catch(e){} }

/* ---------------- shared bits ---------------- */
const CALC={rec:["Calculator recommended","cr"],help:["Calculator helpful","chp"],no:["No calculator needed","cn"]};
const calcTag=c=>c&&CALC[c]?`<span class="ctag ${CALC[c][1]}">${CALC[c][0]}</span>`:"";
const L=["A","B","C","D"];
function header(title,timer){ return `<div class="bar"><div class="bt"><b>Test ${T.n}</b> · ${esc(title)}</div>${timer?`<div class="timer" id="timer">--:--</div>`:""}<button class="pill" data-open="ref">Reference sheet</button></div>`; }
function remaining(startKey,min){ if(!S.timed) return Infinity; return Math.max(0,min*60-(Date.now()-S[startKey])/1000); }
const fmt=s=>s===Infinity?"untimed":`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`;
let tick=null;
function startTick(startKey,min,onEnd){ clearInterval(tick); const run=()=>{ const r=remaining(startKey,min), el=$("#timer"); if(el){ el.textContent=fmt(r); el.classList.toggle("low",r<300); } if(r<=0){ clearInterval(tick); chime(); onEnd(); } }; run(); if(S.timed) tick=setInterval(run,1000); }

/* ---------------- modal (no browser dialogs) ---------------- */
function modal(html,buttons){ const m=document.createElement("div"); m.className="modal"; m.innerHTML=`<div class="mbox">${html}<div class="mbtn">${buttons.map((b,i)=>`<button class="pill ${b.primary?"dark":""}" data-i="${i}">${b.t}</button>`).join("")}</div></div>`; document.body.appendChild(m); m.querySelectorAll("[data-i]").forEach(x=>x.onclick=()=>{ m.remove(); const f=buttons[+x.dataset.i].f; f&&f(); }); }

/* ---------------- reference sheet ---------------- */
function refHTML(){
 const zrow=z=>`<tr><td>${z.toFixed(1)}</td>${[0,1,2,3,4,5,6,7,8,9].map(h=>{const zz=z<0?z-h/100:z+h/100;return `<td>${Phi(zz).toFixed(4)}</td>`;}).join("")}</tr>`;
 let zt=`<table class="tb"><tr><th>z</th>${[0,1,2,3,4,5,6,7,8,9].map(h=>`<th>.0${h}</th>`).join("")}</tr>`; for(let z=-3.4;z<3.45;z+=0.1){ const zz=Math.round(z*10)/10; zt+=zrow(zz===0&&z<0?-0:zz); } zt+="</table>";
 const tails=[.25,.2,.15,.1,.05,.025,.02,.01,.005,.0025,.001,.0005], dfs=[...Array(30).keys()].map(i=>i+1).concat([40,50,60,80,100,1000]);
 let tt=`<table class="tb"><tr><th>df \\ tail p</th>${tails.map(p=>`<th>${p}</th>`).join("")}</tr>`; dfs.forEach(df=>{ tt+=`<tr><td>${df}</td>${tails.map(p=>`<td>${inv(t=>tcdf(t,df),1-p,0,200).toFixed(3)}</td>`).join("")}</tr>`; });
 tt+=`<tr><td>∞</td>${tails.map(p=>`<td>${inv(Phi,1-p,0,10).toFixed(3)}</td>`).join("")}</tr><tr><th>Confidence level C</th>${tails.map(p=>`<th>${Math.round((1-2*p)*1000)/10}%</th>`).join("")}</tr></table>`;
 const ctails=[.25,.2,.15,.1,.05,.025,.02,.01,.005,.0025,.001,.0005];
 let ct=`<table class="tb"><tr><th>df \\ tail p</th>${ctails.map(p=>`<th>${p}</th>`).join("")}</tr>`; for(let df=1;df<=30;df++){ ct+=`<tr><td>${df}</td>${ctails.map(p=>`<td>${inv(x=>gammp(df/2,x/2),1-p,0,300).toFixed(2)}</td>`).join("")}</tr>`; } ct+="</table>";
 return `<h2>Formulas and Tables</h2><p class="note">Provided on the AP Statistics Exam for both sections (2026–27 course). Tables here are computed to the same precision as the official tables.</p>
 <h3>I. Descriptive Statistics</h3><p>x̄ = Σxᵢ / n &nbsp; · &nbsp; s = √[ Σ(xᵢ − x̄)² / (n − 1) ] &nbsp; · &nbsp; ŷ = a + bx</p>
 <h3>II. Probability and Distributions</h3><p>P(A ∪ B) = P(A) + P(B) − P(A ∩ B) &nbsp; · &nbsp; P(A | B) = P(A ∩ B) / P(B)</p>
 <p>Discrete random variable X: μ<sub>X</sub> = E(X) = Σ xᵢ·P(xᵢ) &nbsp; · &nbsp; σ<sub>X</sub> = √[ Σ(xᵢ − μ<sub>X</sub>)²·P(xᵢ) ]</p>
 <p>Binomial: P(X = x) = C(n, x)·pˣ(1 − p)ⁿ⁻ˣ, x = 0, 1, …, n &nbsp; · &nbsp; μ<sub>X</sub> = np &nbsp; · &nbsp; σ<sub>X</sub> = √[np(1 − p)]</p>
 <h3>III. Sampling Distributions and Inferential Statistics</h3>
 <p>Standardized test statistic = (statistic − parameter) / (standard error of the statistic)</p><p>Confidence interval: statistic ± (critical value)·(standard error of the statistic)</p><p>Chi-square statistic: χ² = Σ (observed − expected)² / expected</p>
 <table class="tb wide"><tr><th>Statistic</th><th>Mean</th><th>Standard deviation</th><th>Standard error</th></tr>
 <tr><td>p̂ (one sample)</td><td>p</td><td>√[p(1 − p)/n]</td><td>√[p̂(1 − p̂)/n]</td></tr>
 <tr><td>p̂₁ − p̂₂</td><td>p₁ − p₂</td><td>√[p₁(1 − p₁)/n₁ + p₂(1 − p₂)/n₂]</td><td>√[p̂₁(1 − p̂₁)/n₁ + p̂₂(1 − p̂₂)/n₂]; if p₁ = p₂ is assumed: √[p̂c(1 − p̂c)(1/n₁ + 1/n₂)], p̂c = (X₁ + X₂)/(n₁ + n₂)</td></tr>
 <tr><td>x̄ (one sample)</td><td>μ</td><td>σ/√n</td><td>s/√n</td></tr>
 <tr><td>x̄₁ − x̄₂</td><td>μ₁ − μ₂</td><td>√(σ₁²/n₁ + σ₂²/n₂)</td><td>√(s₁²/n₁ + s₂²/n₂)</td></tr></table>
 <h3>Table A: Standard normal probabilities (area to the LEFT of z)</h3><div class="tw">${zt}</div>
 <h3>Table B: t-distribution critical values (upper-tail probability p)</h3><div class="tw">${tt}</div>
 <h3>Table C: χ² critical values (upper-tail probability p)</h3><div class="tw">${ct}</div>`; }
function calcHTML(){ return `<h2>Calculator use</h2><p>A graphing calculator with statistical capabilities is expected for <b>both sections</b> of the real exam. Each question here is tagged <span class="ctag cr">Calculator recommended</span>, <span class="ctag chp">Calculator helpful</span> or <span class="ctag cn">No calculator needed</span>.</p>
 <ul><li><b>Use it for:</b> normal and binomial probabilities, critical values (invNorm, invT), test statistics and p-values (1-PropZTest, 2-PropZTest, T-Test, 2-SampTTest, χ²-Test), intervals (1-PropZInt, TInterval, 2-SampTInt), and regression (LinReg a+bx).</li>
 <li><b>On free-response questions,</b> calculator syntax alone (like normalcdf(…)) does <b>not</b> earn credit. Name the procedure or distribution, give its parameters, and report the result: e.g. “X ~ Binomial(n = 10, p = 0.2); P(X = 2) = 0.302”.</li>
 <li><b>Use enough decimals:</b> keep at least 3–4 decimal places in intermediate steps.</li>
 <li>Commands for TI-84, TI-Nspire and Desmos: <a href="../../distributions/" target="_blank" rel="noopener">Distribution Map &amp; Calculator Commands</a>.</li></ul>`; }
document.addEventListener("click",e=>{ const b=e.target.closest("[data-open]"); if(!b) return; const k=b.dataset.open; const d=document.createElement("div"); d.className="sheet"; d.innerHTML=`<div class="sbox"><button class="pill dark close">Close ✕</button>${k==="ref"?refHTML():calcHTML()}<button class="pill dark close">Close ✕</button></div>`; document.body.appendChild(d); d.querySelectorAll(".close").forEach(c=>c.onclick=()=>d.remove()); });

/* ---------------- intro ---------------- */
function intro(){
 app.innerHTML=`<div class="wrap"><p class="kick">Z-AP Statistics · Exam Prep</p><h1>Practice Exam ${T.n}</h1><p class="lead">${esc(T.title||"Full-length practice exam")} · Based on the 2026–27 AP Statistics Course and Exam Description</p>
 <div class="grid2"><div class="card"><h3>Section I: Multiple Choice</h3><p><b>42 questions · 90 minutes · 50% of score</b></p><p>Four answer choices each. Includes two sets of three questions sharing one stimulus: one on probability (Unit 2), one on regression (Unit 5).</p></div>
 <div class="card"><h3>Section II: Free Response</h3><p><b>4 questions · 90 minutes · 50% of score</b></p><p>Q1 Practices 1–2 · Q2 Practices 3–4 · Q3 Inference · Q4 Practices 2–4. Each question is worth 10 points. Type your answers; show your work and reasoning.</p></div></div>
 <div class="card"><h3>How it works</h3><ol><li>Section I: 90 minutes. A chime sounds when time is up.</li><li>5-minute break, then a chime.</li><li>Section II: 90 minutes, then a chime and automatic submission.</li><li>After you submit you see: your multiple-choice score with an explanation for every question; each free-response answer next to the official-style rubric, with mistakes the page caught highlighted; then you score yourself point by point; and your predicted AP score.</li></ol>
 <p class="note">Predicted AP score: 91–100% → 5 · 70–90% → 4 · 50–69% → 3 · 30–49% → 2 · below 30% → 1. Sections count equally.</p>
 <p>Your answers save on this device as you go, so you can close the page and come back.</p>
 <div class="row"><button class="pill" data-open="ref">Reference sheet (formulas &amp; tables)</button><button class="pill" data-open="calc">Calculator advice</button></div></div>
 <div class="card"><label class="lab">Your name (appears on your results page)<input id="nm" value="${esc(S.name)}" placeholder="First and last name"></label>
 <label class="chk"><input type="checkbox" id="tm" ${S.timed?"checked":""}> Timed, like the real exam (recommended)</label>
 <p class="note">Turn your sound on so you hear the chimes.</p><button class="pill dark big" id="go">Start Section I</button></div></div>`;
 $("#go").onclick=()=>{ unlockAudio(); S.name=$("#nm").value.trim(); S.timed=$("#tm").checked; S.phase="mc"; S.mcStart=Date.now(); S.cur=0; save(); render(); };
}

/* ---------------- Section I ---------------- */
function mc(){
 const Q=T.mc, i=S.cur, q=Q[i], set=q.set?T.sets[q.set]:null;
 app.innerHTML=`${header("Section I: Multiple Choice",true)}<div class="wrap">
 <div class="qnav">${Q.map((x,k)=>`<button class="qn${k===i?" on":""}${S.mcAns[k]!=null?" done":""}${S.flag[k]?" fl":""}" data-q="${k}">${k+1}</button>`).join("")}</div>
 ${set?`<div class="stem"><div class="sl">Questions ${set.range} refer to the following.</div>${set.stem}</div>`:""}
 <div class="q"><div class="qh"><b>Question ${i+1}</b> of ${Q.length} ${calcTag(q.calc)}</div><div class="qt">${q.q}</div>
 <div class="chs">${q.ch.map((c,k)=>`<label class="ch${S.mcAns[i]===k?" sel":""}"><input type="radio" name="a" value="${k}" ${S.mcAns[i]===k?"checked":""}><span class="lt">${L[k]}</span><span>${c}</span></label>`).join("")}</div>
 <div class="row"><button class="pill" id="fl">${S.flag[i]?"★ Marked for review":"☆ Mark for review"}</button></div>
 <div class="row sp"><button class="pill" id="pv" ${i===0?"disabled":""}>← Previous</button><button class="pill dark" id="nx">${i===Q.length-1?"Review & finish Section I":"Next →"}</button></div></div>
 <p class="note">Answered ${Object.keys(S.mcAns).length} of ${Q.length}.</p></div>`;
 $$(".chs input").forEach(r=>r.onchange=()=>{ S.mcAns[i]=+r.value; save(); $$(".ch").forEach((l,k)=>l.classList.toggle("sel",k===+r.value)); $$(".qn")[i].classList.add("done"); });
 $$(".qn").forEach(b=>b.onclick=()=>{ S.cur=+b.dataset.q; save(); mc(); scrollTo(0,0); });
 $("#fl").onclick=()=>{ S.flag[i]=!S.flag[i]; save(); mc(); };
 $("#pv").onclick=()=>{ S.cur--; save(); mc(); scrollTo(0,0); };
 $("#nx").onclick=()=>{ if(i<Q.length-1){ S.cur++; save(); mc(); scrollTo(0,0); } else { const un=Q.length-Object.keys(S.mcAns).length;
   modal(`<h3>Finish Section I?</h3><p>${un?`You have <b>${un}</b> unanswered question${un>1?"s":""}. There is no penalty for guessing.`:"All questions answered."}</p><p>You cannot return to Section I after you finish.</p>`,[{t:"Keep working"},{t:"Finish Section I",primary:1,f:endMC}]); } };
 startTick("mcStart",MC_MIN,endMC);
}
function endMC(){ S.phase="brk"; S.brStart=Date.now(); save(); render(); }

/* ---------------- break ---------------- */
function brk(){
 app.innerHTML=`${header("Break",true)}<div class="wrap center"><h1>Section I is complete</h1><p class="lead">Take a 5-minute break. A chime will sound when it's over.</p><p>Section II has 4 free-response questions in 90 minutes, about 22 minutes each. Show all your work and explain your reasoning in context.</p><button class="pill dark big" id="go">Start Section II now</button></div>`;
 $("#go").onclick=()=>{ unlockAudio(); startFR(); };
 if(S.timed) startTick("brStart",BR_MIN,startFR); else { const el=$("#timer"); if(el) el.textContent="untimed"; }
}
function startFR(){ S.phase="frq"; S.frStart=Date.now(); S.fcur=0; save(); render(); }

/* ---------------- Section II ---------------- */
const SYM=["μ","σ","p̂","x̄","Σ","≠","≤","≥","α","χ²","√","±","₁","₂","ŷ","H₀","Hₐ","≈","·"];
function frq(){
 const F=T.frq, i=S.fcur||0, f=F[i];
 app.innerHTML=`${header("Section II: Free Response",true)}<div class="wrap">
 <div class="qnav">${F.map((x,k)=>`<button class="qn wide${k===i?" on":""}" data-f="${k}">Q${k+1}</button>`).join("")}</div>
 <div class="q"><div class="qh"><b>Question ${i+1}</b> · ${esc(f.type)} · 10 points ${calcTag(f.calc)}</div><div class="qt">${f.stem}</div>
 ${f.parts.map(p=>`<div class="part"><div class="pq"><b>(${p.id})</b> ${p.q}</div><div class="sym" data-for="${f.id}-${p.id}">${SYM.map(s=>`<button type="button" data-s="${s}">${s}</button>`).join("")}</div><textarea data-k="${f.id}-${p.id}" rows="5" placeholder="Type your answer. Show work and explain in context.">${esc(S.fr[f.id+"-"+p.id]||"")}</textarea></div>`).join("")}
 <div class="row sp"><button class="pill" id="pv" ${i===0?"disabled":""}>← Previous question</button><button class="pill dark" id="nx">${i===F.length-1?"Submit test":"Next question →"}</button></div></div></div>`;
 $$("textarea").forEach(t=>t.oninput=()=>{ S.fr[t.dataset.k]=t.value; save(); });
 let last=null; $$("textarea").forEach(t=>t.onfocus=()=>last=t);
 $$(".sym button").forEach(b=>b.onclick=()=>{ const t=$(`textarea[data-k="${b.parentNode.dataset.for}"]`); const s=t.selectionStart??t.value.length, e=t.selectionEnd??s; t.value=t.value.slice(0,s)+b.dataset.s+t.value.slice(e); t.focus(); t.selectionStart=t.selectionEnd=s+b.dataset.s.length; S.fr[t.dataset.k]=t.value; save(); });
 $$("[data-f]").forEach(b=>b.onclick=()=>{ S.fcur=+b.dataset.f; save(); frq(); scrollTo(0,0); });
 $("#pv").onclick=()=>{ S.fcur=i-1; save(); frq(); scrollTo(0,0); };
 $("#nx").onclick=()=>{ if(i<F.length-1){ S.fcur=i+1; save(); frq(); scrollTo(0,0); } else modal(`<h3>Submit your test?</h3><p>After you submit, you can't change your answers. Your scores and the rubrics will appear.</p>`,[{t:"Keep working"},{t:"Submit",primary:1,f:submit}]); };
 startTick("frStart",FR_MIN,submit);
}
function submit(){ clearInterval(tick); S.phase="done"; S.submitted=Date.now(); save(); render(); scrollTo(0,0); }

/* ---------------- results ---------------- */
function checkPoint(pt,txt){ const out={lock:false,msgs:[]}; const t=txt||"";
 (pt.forbid||[]).forEach(([re,msg])=>{ if(new RegExp(re,"i").test(t)){ out.lock=true; out.msgs.push(["bad",msg]); } });
 (pt.req||[]).forEach(([re,msg])=>{ if(!new RegExp(re,"i").test(t)){ out.lock=true; out.msgs.push(["bad",msg]); } });
 (pt.flag||[]).forEach(([re,msg])=>{ if(new RegExp(re,"i").test(t)) out.msgs.push(["warn",msg]); });
 (pt.need||[]).forEach(([re,msg])=>{ if(!new RegExp(re,"i").test(t)) out.msgs.push(["warn",msg]); });
 if(!t.trim()){ out.lock=true; out.msgs=[["bad","No answer was written for this part."]]; }
 return out; }
function apScore(pct){ return pct>=91?5:pct>=70?4:pct>=50?3:pct>=30?2:1; }
function done(){
 const Q=T.mc, F=T.frq; const mcRight=Q.filter((q,k)=>S.mcAns[k]===q.a).length;
 let frPts=0; F.forEach(f=>f.parts.forEach(p=>p.pts.forEach(pt=>{ if(S.self[pt.id]) frPts++; })));
 const pct=Math.round((mcRight/Q.length*50+frPts/40*50)*10)/10, ap=apScore(Math.round(pct));
 const byUnit={}; Q.forEach((q,k)=>{ const u="Unit "+q.u; byUnit[u]=byUnit[u]||[0,0]; byUnit[u][1]++; if(S.mcAns[k]===q.a) byUnit[u][0]++; });
 app.innerHTML=`<div class="wrap"><div class="res-h"><p class="kick">Z-AP Statistics · Practice Exam ${T.n} · Results</p><h1>${esc(S.name||"Student")}</h1><p>Submitted ${new Date(S.submitted).toLocaleString()}${S.timed?" · timed":" · untimed"}</p></div>
 <div class="score"><div><span>Multiple choice</span><b>${mcRight} / ${Q.length}</b></div><div><span>Free response (self-scored)</span><b id="frs">${frPts} / 40</b></div><div><span>Composite</span><b id="pc">${pct}%</b></div><div class="ap"><span>Predicted AP score</span><b id="ap">${ap}</b></div></div>
 <p class="note">Composite = (MC correct ÷ 42) × 50 + (FRQ points ÷ 40) × 50. Predicted score: 91–100% → 5 · 70–90% → 4 · 50–69% → 3 · 30–49% → 2 · below 30% → 1. Score the free-response section below to finish your composite.</p>
 <div class="row"><button class="pill dark" onclick="window.print()">Print / save as PDF for your teacher</button><button class="pill" data-open="ref">Reference sheet</button></div>
 <h2>Multiple choice by unit</h2><table class="tb wide"><tr><th>Unit</th><th>Correct</th></tr>${Object.entries(byUnit).sort().map(([u,[a,b]])=>`<tr><td>${u}: ${esc(T.units[u.slice(5)]||"")}</td><td>${a} / ${b}</td></tr>`).join("")}</table>
 <h2>Section II: score yourself, point by point</h2><p>For each point, read <b>what earns it</b> and <b>what does not</b>, compare with your answer, and tick the box only if your answer meets the standard exactly. Points marked <span class="bad">✕ Not earned</span> were caught automatically (for example s instead of σ, a sample statistic in a hypothesis, “accept H₀”, a missing population): they stay at 0.</p>
 ${F.map(f=>`<div class="fr"><h3>Question ${f.id}: ${esc(f.title)} <span class="fq" data-fq="${f.id}">0 / 10</span></h3><details><summary>Show the question</summary><div class="qt">${f.stem}</div></details>
  ${f.parts.map(p=>{ const txt=S.fr[f.id+"-"+p.id]||""; return `<div class="part"><div class="pq"><b>(${p.id})</b> ${p.q}</div><div class="ya"><span>Your answer</span><pre>${esc(txt)||"<i>(blank)</i>"}</pre></div>
   ${p.pts.map(pt=>{ const c=checkPoint(pt,txt); if(c.lock) S.self[pt.id]=false; return `<div class="pt${c.lock?" locked":""}"><label class="pth"><input type="checkbox" data-pt="${pt.id}" data-f="${f.id}" ${S.self[pt.id]?"checked":""} ${c.lock?"disabled":""}> <b>${esc(pt.t)}</b> (1 point)</label>
    <div class="earn"><b>Earns the point:</b> ${pt.earn}</div><div class="not"><b>Does not earn the point:</b> ${pt.not}</div>
    ${c.msgs.map(([k,m])=>`<div class="${k}">${k==="bad"?"✕ Not earned: ":"⚠ Check: "}${m}</div>`).join("")}</div>`; }).join("")}
   <details class="model"><summary>Model answer for (${p.id})</summary><div>${p.model}</div></details></div>`; }).join("")}</div>`).join("")}
 <h2>Section I: every question explained</h2>${Q.map((q,k)=>{ const ok=S.mcAns[k]===q.a, set=q.set&&T.sets[q.set]; return `<div class="mr ${ok?"ok":"no"}"><div class="qh"><b>Question ${k+1}</b> · Unit ${q.u} ${ok?"<span class='good'>✓ Correct</span>":"<span class='bad'>✕ "+(S.mcAns[k]==null?"Blank":"You chose "+L[S.mcAns[k]])+"</span>"}</div>${set&&q===Q.find(x=>x.set===q.set)?`<details><summary>Shared stimulus</summary><div class="stem">${set.stem}</div></details>`:""}<div class="qt">${q.q}</div><div class="chs ro">${q.ch.map((c,j)=>`<div class="ch${j===q.a?" right":""}${j===S.mcAns[k]&&j!==q.a?" wrong":""}"><span class="lt">${L[j]}</span><span>${c}</span></div>`).join("")}</div><div class="ex"><b>Why ${L[q.a]}:</b> ${q.ex}</div></div>`; }).join("")}
 <div class="card"><h3>Start over</h3><p>Erase your answers for this test on this device and take it again.</p><button class="pill" id="rs">Retake Test ${T.n}</button></div></div>`;
 save();
 const upd=()=>{ let n=0; const per={}; $$("[data-pt]").forEach(c=>{ if(c.checked){ n++; per[c.dataset.f]=(per[c.dataset.f]||0)+1; } });
  $$("[data-fq]").forEach(e=>e.textContent=`${per[e.dataset.fq]||0} / 10`); const p=Math.round((mcRight/Q.length*50+n/40*50)*10)/10;
  $("#frs").textContent=`${n} / 40`; $("#pc").textContent=p+"%"; $("#ap").textContent=apScore(Math.round(p)); };
 $$("[data-pt]").forEach(c=>c.onchange=()=>{ S.self[c.dataset.pt]=c.checked; save(); upd(); }); upd();
 $("#rs").onclick=()=>modal(`<h3>Retake Test ${T.n}?</h3><p>This erases all your answers and scores for this test on this device.</p>`,[{t:"Cancel"},{t:"Erase and restart",primary:1,f:()=>{ localStorage.removeItem(KEY); location.reload(); }}]);
}

function render(){ clearInterval(tick); ({intro,mc,brk,frq,done})[S.phase](); }
render();
})();
