/* Z-AP Statistics Exam Prep engine. A test file sets window.ZTEST before this script loads.
   Phases: intro → mc (90 min) → brk (5 min) → frq (90 min) → done (results). State is kept in localStorage. */
(function(){
"use strict";
const T=window.ZTEST, KEY="zmx-statexam-t"+T.n, MC_MIN=90, BR_MIN=5, FR_MIN=90;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
let S; try{ S=JSON.parse(localStorage.getItem(KEY))||null; }catch(e){ S=null; }
if(!S) S={phase:"intro",name:"",timed:true,mcAns:{},flag:{},fr:{},self:{},cur:0};
S.away=S.away||[]; S.paste=S.paste||0; S.fsx=S.fsx||0;
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
function header(title,timer){ return `<div class="bar"><div class="bt"><b>Test ${T.n}</b><span> · ${esc(title)}</span></div>${timer?`<div class="timer" id="timer">--:--</div>`:""}<button class="pill" data-open="ref">Formulas</button><button class="pill" data-open="calc">Calculators</button></div>`; }
function remaining(startKey,min){ if(!S.timed) return Infinity; return Math.max(0,min*60-(Date.now()-S[startKey])/1000); }
const fmt=s=>s===Infinity?"untimed":`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`;
let tick=null;
function startTick(startKey,min,onEnd){ clearInterval(tick); const run=()=>{ const r=remaining(startKey,min), el=$("#timer"); if(el){ el.textContent=fmt(r); el.classList.toggle("low",r<300); } if(r<=0){ clearInterval(tick); chime(); onEnd(); } }; run(); if(S.timed) tick=setInterval(run,1000); }

/* ---------------- modal (no browser dialogs) ---------------- */
function modal(html,buttons){ const m=document.createElement("div"); m.className="modal"; m.innerHTML=`<div class="mbox">${html}<div class="mbtn">${buttons.map((b,i)=>`<button class="pill ${b.primary?"dark":""}" data-i="${i}">${b.t}</button>`).join("")}</div></div>`; document.body.appendChild(m); m.querySelectorAll("[data-i]").forEach(x=>x.onclick=()=>{ m.remove(); const f=buttons[+x.dataset.i].f; f&&f(); }); }

/* ---------------- reference sheet ---------------- */
/* MathML helpers for the reference sheet */
const mi=x=>`<mi>${x}</mi>`, mo=x=>/^[()|]$/.test(x)?`<mo stretchy="false" lspace="0" rspace="0">${x}</mo>`:`<mo>${x}</mo>`, mn=x=>`<mn>${x}</mn>`, row=(...a)=>`<mrow>${a.join("")}</mrow>`;
const fr=(a,b)=>`<mfrac>${row(a)}${row(b)}</mfrac>`, sq=x=>`<msqrt>${x}</msqrt>`, sb=(a,b)=>`<msub>${row(a)}${row(b)}</msub>`, sp=(a,b)=>`<msup>${row(a)}${row(b)}</msup>`;
const bar=v=>`<mover accent="true">${mi(v)}<mo>‾</mo></mover>`, hat=v=>`<mover accent="true">${mi(v)}<mo>^</mo></mover>`;
const M=(...a)=>`<math display="block">${a.join("")}</math>`, Mi=(...a)=>`<math displaystyle="true">${a.join("")}</math>`;
const P=x=>mo("(")+x+mo(")"), xb=bar("x"), ph=hat("p"), yh=hat("y"), SUM=mo("∑"), PR=x=>mi("P")+P(x);
const xi=sb(mi("x"),mi("i")), muX=sb(mi("μ"),mi("X")), sgX=sb(mi("σ"),mi("X")), om=row(mn(1),mo("−"),mi("p"));
function tfig(kind){ /* small shaded-area figures like the official tables */
 const curve="M5,52 C40,52 55,6 80,6 C105,6 120,52 155,52";
 const shade=kind==="z"?"M5,52 C40,52 55,6 80,6 C88,6 96,12 104,22 L104,52 Z":kind==="t"?"M110,30 C120,44 135,52 155,52 L110,52 Z":"";
 if(kind==="c") return `<svg viewBox="0 0 160 58" class="fig"><path d="M5,52 C20,52 30,4 50,10 C75,18 110,50 155,52" fill="none" stroke="#16181d" stroke-width="1.6"/><path d="M100,40 C120,48 135,51 155,52 L100,52 Z" fill="#9ca3af"/><line x1="0" y1="52" x2="160" y2="52" stroke="#16181d"/><text x="100" y="35" font-size="9">p</text></svg>`;
 return `<svg viewBox="0 0 160 68" class="fig"><path d="${shade}" fill="#9ca3af"/><path d="${curve}" fill="none" stroke="#16181d" stroke-width="1.6"/><line x1="0" y1="52" x2="160" y2="52" stroke="#16181d"/>${kind==="z"?`<line x1="104" y1="52" x2="104" y2="57" stroke="#16181d"/><text x="101" y="66" font-size="9">z</text>`:`<text x="112" y="24" font-size="9">p</text>`}</svg>`; }
function refHTML(){
 const zt=neg=>{ let s=`<table class="tb"><tr><th>z</th>${[0,1,2,3,4,5,6,7,8,9].map(h=>`<th>.0${h}</th>`).join("")}</tr>`;
  const zs=neg?[...Array(35).keys()].map(k=>-(3.4-k/10)):[...Array(35).keys()].map(k=>k/10);
  zs.forEach(z0=>{ const z=Math.round(z0*10)/10; s+=`<tr><th>${neg&&z===0?"−0.0":z.toFixed(1).replace("-","−")}</th>${[0,1,2,3,4,5,6,7,8,9].map(h=>{const zz=neg?z-h/100:z+h/100;return `<td>${Phi(zz).toFixed(4)}</td>`;}).join("")}</tr>`; });
  return s+"</table>"; };
 const tails=[.25,.2,.15,.1,.05,.025,.02,.01,.005,.0025,.001,.0005], dfs=[...Array(30).keys()].map(i=>i+1).concat([40,50,60,80,100,1000]);
 let tt=`<table class="tb"><tr><th>df</th>${tails.map(p=>`<th>${p}</th>`).join("")}</tr>`; dfs.forEach(df=>{ tt+=`<tr><th>${df}</th>${tails.map(p=>`<td>${inv(t=>tcdf(t,df),1-p,0,200).toFixed(3)}</td>`).join("")}</tr>`; });
 tt+=`<tr><th>∞</th>${tails.map(p=>`<td>${inv(Phi,1-p,0,10).toFixed(3)}</td>`).join("")}</tr><tr><th>C</th>${tails.map(p=>`<th>${Math.round((1-2*p)*1000)/10}%</th>`).join("")}</tr></table>`;
 let ct=`<table class="tb"><tr><th>df</th>${tails.map(p=>`<th>${p}</th>`).join("")}</tr>`; [...Array(30).keys()].map(i=>i+1).concat([40,50,60,80,100]).forEach(df=>{ ct+=`<tr><th>${df}</th>${tails.map(p=>`<td>${inv(x=>gammp(df/2,x/2),1-p,0,400).toFixed(2)}</td>`).join("")}</tr>`; }); ct+="</table>";
 const S1=sb(ph,mn(1)), S2=sb(ph,mn(2)), n1=sb(mi("n"),mn(1)), n2=sb(mi("n"),mn(2)), p1=sb(mi("p"),mn(1)), p2=sb(mi("p"),mn(2)), pc=sb(ph,mi("c"));
 return `<div class="ref"><h2>Formulas and Tables</h2><p class="note">The formulas and tables provided on both sections of the AP Statistics Exam (2026–27 course). The table values are computed to the same precision as the official tables.</p>
 <h3>I. Descriptive Statistics</h3><div class="fg">
  <div class="f">${M(xb,mo("="),fr(row(SUM,xi),mi("n")))}</div>
  <div class="f">${M(mi("s"),mo("="),sq(fr(row(SUM,sp(P(row(xi,mo("−"),xb)),mn(2))),row(mi("n"),mo("−"),mn(1)))))}</div>
  <div class="f">${M(yh,mo("="),mi("a"),mo("+"),mi("b"),mi("x"))}</div></div>
 <h3>II. Probability and Distributions</h3><div class="fg">
  <div class="f">${M(PR(row(mi("A"),mo("∪"),mi("B"))),mo("="),PR(mi("A")),mo("+"),PR(mi("B")),mo("−"),PR(row(mi("A"),mo("∩"),mi("B"))))}</div>
  <div class="f">${M(PR(row(mi("A"),mo("|"),mi("B"))),mo("="),fr(PR(row(mi("A"),mo("∩"),mi("B"))),PR(mi("B"))))}</div></div>
 <div class="cards">
  <div class="dc"><div class="dh">Discrete random variable X</div><div class="dr"><span>Mean</span>${Mi(muX,mo("="),mi("E"),P(mi("X")),mo("="),SUM,xi,mo("·"),PR(xi))}</div><div class="dr"><span>Standard deviation</span>${Mi(sgX,mo("="),sq(row(SUM,sp(P(row(xi,mo("−"),muX)),mn(2)),mo("·"),PR(xi))))}</div></div>
  <div class="dc"><div class="dh">Binomial distribution with parameters n and p</div><div class="dr"><span>Probability</span>${Mi(PR(row(mi("X"),mo("="),mi("x"))),mo("="),P(`<mfrac linethickness="0">${row(mi("n"))}${row(mi("x"))}</mfrac>`),sp(mi("p"),mi("x")),sp(P(om),row(mi("n"),mo("−"),mi("x"))))}<div class="note">where x = 0, 1, 2, 3, …, n</div></div><div class="dr"><span>Mean</span>${Mi(muX,mo("="),mi("n"),mi("p"))}</div><div class="dr"><span>Standard deviation</span>${Mi(sgX,mo("="),sq(row(mi("n"),mi("p"),P(om))))}</div></div></div>
 <h3>III. Sampling Distributions and Inferential Statistics</h3><div class="fg">
  <div class="f"><div class="fl">Standardized test statistic</div>${M(fr(row(mi("statistic"),mo("−"),mi("parameter")),row(mi("standard error of statistic"))))}</div>
  <div class="f sm"><div class="fl">Confidence interval</div>${M(mi("statistic"),mo("±"),P(mi("critical value")),P(mi("standard error of statistic")))}</div>
  <div class="f"><div class="fl">Chi-square statistic</div>${M(sp(mi("χ"),mn(2)),mo("="),SUM,fr(sp(P(row(mi("observed"),mo("−"),mi("expected"))),mn(2)),mi("expected")))}</div></div>
 <p class="note">Sampling distributions of statistics:</p><div class="cards"><div class="dc"><div class="dh">Statistic: ${Mi(ph)} (one sample)</div><div class="dr"><span>Mean</span>${Mi(mi("p"))}</div><div class="dr"><span>Standard deviation</span>${Mi(sq(fr(row(mi("p"),P(om)),mi("n"))))}</div><div class="dr"><span>Standard error*</span>${Mi(sq(fr(row(ph,P(row(mn(1),mo("−"),ph))),mi("n"))))}</div></div><div class="dc"><div class="dh">Statistic: ${Mi(S1,mo("−"),S2)}</div><div class="dr"><span>Mean</span>${Mi(p1,mo("−"),p2)}</div><div class="dr"><span>Standard deviation</span>${Mi(sq(row(fr(row(p1,P(row(mn(1),mo("−"),p1))),n1),mo("+"),fr(row(p2,P(row(mn(1),mo("−"),p2))),n2))))}</div><div class="dr"><span>Standard error*</span>${Mi(sq(row(fr(row(S1,P(row(mn(1),mo("−"),S1))),n1),mo("+"),fr(row(S2,P(row(mn(1),mo("−"),S2))),n2))))}<div class="note">If p₁ = p₂ is assumed:</div>${Mi(sq(row(pc,P(row(mn(1),mo("−"),pc)),P(row(fr(mn(1),n1),mo("+"),fr(mn(1),n2))))))}<div class="note">where</div>${Mi(pc,mo("="),fr(row(sb(mi("X"),mn(1)),mo("+"),sb(mi("X"),mn(2))),row(n1,mo("+"),n2)))}</div></div><div class="dc"><div class="dh">Statistic: ${Mi(xb)} (one sample)</div><div class="dr"><span>Mean</span>${Mi(mi("μ"))}</div><div class="dr"><span>Standard deviation</span>${Mi(fr(mi("σ"),sq(mi("n"))))}</div><div class="dr"><span>Standard error*</span>${Mi(fr(mi("s"),sq(mi("n"))))}</div></div><div class="dc"><div class="dh">Statistic: ${Mi(sb(xb,mn(1)),mo("−"),sb(xb,mn(2)))}</div><div class="dr"><span>Mean</span>${Mi(sb(mi("μ"),mn(1)),mo("−"),sb(mi("μ"),mn(2)))}</div><div class="dr"><span>Standard deviation</span>${Mi(sq(row(fr(sp(sb(mi("σ"),mn(1)),mn(2)),n1),mo("+"),fr(sp(sb(mi("σ"),mn(2)),mn(2)),n2))))}</div><div class="dr"><span>Standard error*</span>${Mi(sq(row(fr(sp(sb(mi("s"),mn(1)),mn(2)),n1),mo("+"),fr(sp(sb(mi("s"),mn(2)),mn(2)),n2))))}</div></div></div>
 <p class="note">*Standard deviation is a measurement of variability from the theoretical population. Standard error is the estimate of the standard deviation. If the standard deviation of the statistic is assumed to be known, then the standard deviation should be used instead of the standard error.</p>
 <h3>Table A: Standard normal probabilities</h3><div class="th">${tfig("z")}<p>Table entry for z is the probability lying <b>below</b> z.</p></div>
 <div class="tabs"><button class="pill dark" data-zt="n">Negative z</button><button class="pill" data-zt="p">Positive z</button></div>
 <div class="tw" data-ztab="n">${zt(true)}</div><div class="tw" data-ztab="p" hidden>${zt(false)}</div>
 <h3>Table B: t distribution critical values</h3><div class="th">${tfig("t")}<p>Table entry for p and C is the point t* with probability p lying <b>above</b> it and probability C lying between −t* and t*.</p></div><p class="note">Columns: upper-tail probability p. Bottom row: confidence level C.</p><div class="tw">${tt}</div>
 <h3>Table C: χ² critical values</h3><div class="th">${tfig("c")}<p>Table entry for p is the point χ² with probability p lying <b>above</b> it.</p></div><p class="note">Columns: upper-tail probability p.</p><div class="tw">${ct}</div><div class="row"><button class="pill dark" data-open="calc">Approved calculators &amp; calculator policy →</button></div></div>`; }
function calcHTML(){ return `<div class="ref"><h2>Calculators for the AP Statistics Exam</h2>
 <div class="card"><h3>College Board policy for May 2027</h3><ul>
 <li>A <b>graphing calculator with statistical capabilities</b> is <b>expected</b> on both Section I and Section II.</li>
 <li>Students may use an <b>approved handheld graphing calculator</b> and/or the <b>Desmos graphing calculator built into Bluebook</b>. Only the Bluebook version of Desmos is allowed during the exam, not the website or app.</li>
 <li><b>New for 2027:</b> nongraphing (scientific) calculators are <b>not allowed</b> on AP Statistics, even ones with statistics functions.</li>
 <li>Only models on the list below may be used; the proctor checks calculators before the exam. Any model within a listed series is acceptable.</li></ul>
 <p class="note">Source: College Board, AP Exams Calculator Policy (<a href="https://apstudents.collegeboard.org/exam-policies-guidelines/calculator-policies" target="_blank" rel="noopener">apstudents.collegeboard.org</a>). The list is updated during the year, so check it again before exam day.</p></div>
 <h3>Approved handheld graphing calculators</h3><div class="cards calc">
 <div class="dc"><div class="dh">Texas Instruments</div><ul><li>TI-73</li><li>TI-80</li><li>TI-81</li><li>TI-82</li><li>TI-83 / TI-83 Plus</li><li>TI-83 Plus Silver</li><li>TI-84 Plus / TI-84 Plus CE</li><li>TI-84 Plus CE Python</li><li>TI-84 Plus Silver</li><li>TI-84 Plus C Silver</li><li>TI-84 Plus T</li><li>TI-84 Plus CE-T</li><li>TI-84 Plus CE-T Python Edition</li><li>TI-84 Evo (new)</li><li>TI-84 Evo-T (new)</li><li>TI-85</li><li>TI-86</li><li>TI-89</li><li>TI-89 Titanium</li><li>TI-Nspire / TI-Nspire CX</li><li>TI-Nspire CX II</li><li>TI-Nspire CX II-T</li><li>TI-Nspire CAS</li><li>TI-Nspire CX CAS</li><li>TI-Nspire CM-C</li><li>TI-Nspire CM-C CAS</li><li>TI-Nspire CX-C CAS</li><li>TI-Nspire CX II CAS</li><li>TI-Nspire CX II-T CAS</li><li>TI-Nspire CX II-C CAS</li></ul></div>
 <div class="dc"><div class="dh">Casio</div><ul><li>FX-6000 Series</li><li>FX-6200 Series</li><li>FX-6300 Series</li><li>FX-6500 Series</li><li>FX-7000 Series</li><li>FX-7300 Series</li><li>FX-7400 Series</li><li>FX-7500 Series</li><li>FX-7700 Series</li><li>FX-7800 Series</li><li>FX-8000 Series</li><li>FX-8500 Series</li><li>FX-8700 Series</li><li>FX-8800 Series</li><li>Graph25 Series</li><li>FX-9700 Series</li><li>FX-9750 Series</li><li>FX-9860 Series</li><li>CFX-9800 Series</li><li>CFX-9850 Series</li><li>CFX-9950 Series</li><li>CFX-9970 Series</li><li>FX 1.0 Series</li><li>Algebra FX 2.0 Series</li><li>FX-CG-10</li><li>FX-CG-20 Series</li><li>FX-CG-50</li><li>Graph35 Series</li><li>Graph75 Series</li><li>Graph95 Series</li><li>Graph100 Series</li><li>FX-CG500 (stylus not permitted)</li><li>FX-CG-100</li></ul></div>
 <div class="dc"><div class="dh">Hewlett-Packard</div><ul><li>HP-9G</li><li>HP-28 Series</li><li>HP-38G</li><li>HP-39 Series</li><li>HP-40 Series</li><li>HP-48 Series</li><li>HP-49 Series</li><li>HP-50 Series</li><li>HP Prime</li></ul></div>
 <div class="dc"><div class="dh">Sharp</div><ul><li>EL-5200</li><li>EL-9200 Series</li><li>EL-9300 Series</li><li>EL-9600 Series (stylus not permitted)</li><li>EL-9900 Series</li></ul></div>
 <div class="dc"><div class="dh">Radio Shack</div><ul><li>EC-4033</li><li>EC-4034</li><li>EC-4037</li></ul></div>
 <div class="dc"><div class="dh">Other</div><ul><li>Datexx DS-883</li><li>Micronta</li><li>NumWorks</li><li>Smart2</li><li>Zero ZGC4 (new)</li></ul></div></div>
 <h3>Not allowed</h3><ul><li>Phones, smartwatches, smart glasses or other wearables; laptops, tablets or electronic writing pads</li><li>QWERTY-keypad models (e.g., TI-92 Plus, Voyage 200); pen/stylus models (e.g., Casio ClassPad)</li><li>Models with wireless, Bluetooth, cellular or internet access, a camera or scanning, audio/video recording, a paper tape, or that need an outlet or make noise</li><li>Touch-screen models not on the approved list; peripherals such as a stylus, keyboard or wireless adapter</li></ul>
 <p class="note">Exceptions only with an accommodation approved by the College Board SSD Office.</p>
 <h3>Tips for this practice exam</h3><ul><li>Each question is tagged <span class="ctag cr">Calculator recommended</span>, <span class="ctag chp">Calculator helpful</span> or <span class="ctag cn">No calculator needed</span>.</li>
 <li><b>Use it for:</b> normal and binomial probabilities, critical values (invNorm, invT), test statistics and p-values (1-PropZTest, 2-PropZTest, T-Test, 2-SampTTest, χ²-Test), intervals (1-PropZInt, TInterval, 2-SampTInt) and regression (LinReg a+bx).</li>
 <li><b>On free-response questions,</b> calculator syntax alone (like normalcdf(…)) does <b>not</b> earn credit. Name the distribution or procedure, give its parameters and report the result: e.g., “X ~ Binomial(n = 10, p = 0.2); P(X = 2) = 0.302”.</li>
 <li>Commands for TI-84, TI-Nspire and Desmos: <a href="../../distributions/" target="_blank" rel="noopener">Distribution Map &amp; Calculator Commands</a>.</li></ul></div>`; }
document.addEventListener("click",e=>{ const b=e.target.closest("[data-open]"); if(!b) return; const k=b.dataset.open; document.querySelectorAll(".sheet").forEach(x=>x.remove()); const d=document.createElement("div"); d.className="sheet"; d.innerHTML=`<div class="sbox"><button class="pill dark close">Close ✕</button>${k==="ref"?refHTML():calcHTML()}<button class="pill dark close">Close ✕</button></div>`; document.body.appendChild(d); d.querySelectorAll(".close").forEach(c=>c.onclick=()=>d.remove()); d.querySelectorAll("[data-zt]").forEach(b=>b.onclick=()=>{ d.querySelectorAll("[data-zt]").forEach(x=>x.classList.toggle("dark",x===b)); d.querySelectorAll("[data-ztab]").forEach(t=>t.hidden=t.dataset.ztab!==b.dataset.zt); }); });


/* ---------------- integrity monitor ---------------- */
const live=()=>S.phase==="mc"||S.phase==="frq";
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
function integrityHTML(){ const a=S.away, tot=a.reduce((x,y)=>x+y.d,0), byPh=ph=>a.filter(x=>x.ph===ph);
 const fmtd=d=>d>=60?`${Math.floor(d/60)} min ${d%60} s`:`${d} s`;
 const clean=!a.length&&!S.paste;
 return `<div class="integ ${clean?"ok":"flag"}"><h3>${clean?"✓ Test integrity: no time away from the test recorded":"⚠ Test integrity report"}</h3>
 ${clean?"<p>The student stayed on the test page for the whole exam and made no paste attempts.</p>":`<p><b>Left the test ${a.length} time${a.length===1?"":"s"}, ${fmtd(tot)} in total</b> (Section I: ${byPh("mc").length}×, ${fmtd(byPh("mc").reduce((x,y)=>x+y.d,0))}; Section II: ${byPh("frq").length}×, ${fmtd(byPh("frq").reduce((x,y)=>x+y.d,0))}). Paste attempts: ${S.paste}. Exits from full screen: ${S.fsx}.</p>
 ${a.length?`<details><summary>Show each time away</summary><ul>${a.map(x=>`<li>${new Date(x.t).toLocaleTimeString()}: ${fmtd(x.d)} (${x.ph==="mc"?"Section I":"Section II"})</li>`).join("")}</ul></details>`:""}`}
 <p class="note">“Time away” means the test page was hidden or lost focus: another app, tab, notification or call was opened.</p></div>`; }

/* ---------------- intro ---------------- */
function intro(){
 app.innerHTML=`<div class="wrap"><p class="kick">Z-AP Statistics · Exam Prep</p><h1>Practice Exam ${T.n}</h1><p class="lead">${esc(T.title||"Full-length practice exam")} · Based on the 2026–27 AP Statistics Course and Exam Description</p>
 <div class="purpose"><h3>Why these practice exams?</h3><p>These tests are made to help you prepare for the AP Statistics Exam. This is the place to make mistakes: <b>make them here, learn from them, and don't repeat them on the real exam.</b></p><p>The score matters less than what you learn. The most important thing is to <b>understand the concepts</b> and <b>apply the skills you have learned</b> to solve problems. After you submit, read every explanation and rubric point carefully, especially for questions you got right by guessing.</p></div>
 <div class="grid2"><div class="card"><h3>Section I: Multiple Choice</h3><p><b>42 questions · 90 minutes · 50% of score</b></p><p>Four answer choices each. Includes two sets of three questions sharing one stimulus: one on probability (Unit 2), one on regression (Unit 5).</p></div>
 <div class="card"><h3>Section II: Free Response</h3><p><b>4 questions · 90 minutes · 50% of score</b></p><p>Q1 Practices 1–2 · Q2 Practices 3–4 · Q3 Inference · Q4 Practices 2–4. Each question is worth 10 points. Type your answers; show your work and reasoning.</p></div></div>
 <div class="card"><h3>How it works</h3><ol><li>Section I: 90 minutes. A chime sounds when time is up.</li><li>5-minute break, then a chime.</li><li>Section II: 90 minutes, then a chime and automatic submission.</li><li>After you submit you see: your multiple-choice score with an explanation for every question; each free-response answer next to the official-style rubric, with mistakes the page caught highlighted; then you score yourself point by point; and your predicted AP score.</li></ol>
 <p class="note">Predicted AP score: 91–100% → 5 · 70–90% → 4 · 50–69% → 3 · 30–49% → 2 · below 30% → 1. Sections count equally.</p>
 <p>Your answers save on this device as you go, so you can close the page and come back.</p>
 <div class="row"><button class="pill" data-open="ref">Reference sheet (formulas &amp; tables)</button><button class="pill" data-open="calc">Approved calculators</button></div></div>
 <div class="card"><label class="lab">Your name (appears on your results page)<input id="nm" value="${esc(S.name)}" placeholder="First and last name"></label>
 <label class="chk"><input type="checkbox" id="tm" ${S.timed?"checked":""}> Timed, like the real exam (recommended)</label>
 <div class="rules"><b>Test rules</b><ul><li>Stay on this page for the whole test. Every time you switch apps or tabs, or a call or notification takes you away, it is <b>recorded with the time and length</b>, and it appears on the results page your teacher sees.</li><li>Copying questions and pasting answers are turned off.</li><li>The test opens in full screen when possible. Turn on <b>Do Not Disturb</b> before you start.</li><li>Use only an approved graphing calculator and the reference sheet.</li></ul><label class="chk"><input type="checkbox" id="agree"> I will follow these rules and do my own work.</label></div>
 <p class="note">Turn your sound on so you hear the chimes.</p><button class="pill dark big" id="go">Start Section I</button></div></div>`;
 $("#go").onclick=()=>{ if(!$("#agree").checked){ modal("<h3>Please read the test rules</h3><p>Tick the box to agree to the test rules before you start.</p>",[{t:"OK",primary:1}]); return; } if(!$("#nm").value.trim()){ modal("<h3>Enter your name</h3><p>Your name appears on your results page.</p>",[{t:"OK",primary:1}]); return; } goFull(); unlockAudio(); S.name=$("#nm").value.trim(); S.timed=$("#tm").checked; S.phase="mc"; S.mcStart=Date.now(); S.cur=0; save(); render(); };
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
 $("#go").onclick=()=>{ goFull(); unlockAudio(); startFR(); };
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
 ${f.parts.map(p=>`<div class="part"><div class="pq"><b>(${p.id})</b> ${p.q}</div><div class="sym" data-for="${f.id}-${p.id}">${SYM.map(s=>`<button type="button" data-s="${s}">${s}</button>`).join("")}</div><textarea autocomplete="off" autocorrect="off" spellcheck="false" data-k="${f.id}-${p.id}" rows="5" placeholder="Type your answer. Show work and explain in context.">${esc(S.fr[f.id+"-"+p.id]||"")}</textarea></div>`).join("")}
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
 ${integrityHTML()}
 <div class="purpose"><h3>Learn from your mistakes</h3><p>Every mistake here is one you won't make in May. For each question you missed, read the explanation, find exactly where your thinking went wrong, and write down the concept to review. Understanding the concepts, and applying them to new problems, is what earns points on the AP exam.</p></div>
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
