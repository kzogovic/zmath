/* Polynomial Division folder: which method to use, long division (any divisor), synthetic division (x − r and ax − b),
   the Remainder and Factor Theorems, solved examples with "New examples", and practice where students type into the boxes. */
(function(){
const TEAL="#0f7a6c", RED="#c23a52", NAVY="#1d4e89", PURP="#6a3d9a", ORG="#c2571a", GRN="#137333", BLU="#1f4fd1", INK="#1f4fd1";
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a;};
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)), pick=a=>a[Math.floor(Math.random()*a.length)];
const nz=(a,b)=>{let v=0;while(!v)v=rnd(a,b);return v;};
const num=n=>n<0?"−"+Math.abs(n):String(n);
const S=p=>p===0?"":p===1?"x":`x<sup>${p}</sup>`;
function frc(n,d){ if(d<0){n=-n;d=-d;} const g=gcd(n,d)||1; n/=g; d/=g; if(d===1) return num(n); return `${n<0?"−":""}<span class="frc"><span>${Math.abs(n)}</span><span>${d}</span></span>`; }
function poly(c){ const n=c.length-1; let s=""; c.forEach((a,i)=>{ if(!a) return; const p=n-i, m=Math.abs(a); const co=(m===1&&p>0)?"":String(m);
  s+=s?(a<0?" − ":" + "):(a<0?"−":""); s+=co+S(p); }); return s||"0"; }
function polyZ(c){ const n=c.length-1; return c.map((a,i)=>{ const p=n-i, m=Math.abs(a), co=(m===1&&p>0)?"":String(m); return (i?(a<0?" − ":" + "):(a<0?"−":""))+co+S(p); }).join(""); } // keeps 0 terms
const mul=(a,b)=>{ const r=Array(a.length+b.length-1).fill(0); a.forEach((x,i)=>b.forEach((y,j)=>r[i+j]+=x*y)); return r; };
const add=(a,b)=>{ const n=Math.max(a.length,b.length), A=Array(n-a.length).fill(0).concat(a), B=Array(n-b.length).fill(0).concat(b); return A.map((x,i)=>x+B[i]); };
const trim=c=>{ let i=0; while(i<c.length-1&&c[i]===0) i++; return c.slice(i); };
const ev=(c,x)=>c.reduce((s,a)=>s*x+a,0);
function synth(c,r){ const s=[c[0]], p=[null]; for(let i=1;i<c.length;i++){ p.push(s[i-1]*r); s.push(c[i]+s[i-1]*r); } return {s,p}; }
const lin=(a,b)=>`${a===1?"":a===-1?"−":num(a)}x ${b<0?"−":"+"} ${Math.abs(b)}`;

/* long division of integer polynomials (leading coeff of d divides each step by construction) */
function ldiv(P,D){ const n=P.length-1, m=D.length-1; let r=P.slice(); const q=Array(n-m+1).fill(0), steps=[];
  for(let i=0;i<=n-m;i++){ const t=n-i, k=r[i]/D[0]; q[i]=k; const prod=Array(n+1).fill(0); D.forEach((d,j)=>prod[i+j]=k*d);
    const before=r.slice(); r=r.map((v,j)=>v-prod[j]); steps.push({t,k,pw:t-m,prod,before,after:r.slice()}); }
  return {q,r:trim(r.slice(n-m+1)),steps}; }
const tcell=(a,p,first)=>{ const m=Math.abs(a), co=(m===1&&p>0)?"":String(m); return (first?(a<0?"−":""):(a<0?"− ":"+ "))+co+S(p); };
function ldTable(P,D){ const n=P.length-1, m=D.length-1, L=ldiv(P,D), W=n+1, col=p=>n-p;
  const row=(cells,cls="",left="")=>`<tr${cls?` class="${cls}"`:""}><td class="ld-l">${left}</td>${Array.from({length:W},(_,j)=>`<td>${cells[j]!=null?cells[j]:""}</td>`).join("")}</tr>`;
  const qc=Array(W).fill(null); L.q.forEach((k,i)=>{ const p=n-m-i; qc[col(p)]=k?tcell(k,p,qc.every(x=>x==null)):(qc.every(x=>x==null)?null:""); });
  let h=row(qc,"ld-q");
  h+=row(P.map((a,j)=>tcell(a,n-j,j===0)),"ld-d",poly(D)+"&thinsp;)");
  L.steps.forEach((st,i)=>{ const pc=Array(W).fill(null); for(let j=i;j<=i+m;j++) pc[j]=tcell(st.prod[j],n-j,j===i).replace(/^(?!−|\+)/,"");
    pc[i]="−("+pc[i]; pc[i+m]+=")"; h+=row(pc,"ld-s");
    const nc=Array(W).fill(null), last=i===L.steps.length-1, from=i+1, to=last?n:Math.min(n,i+m+1); for(let j=from;j<=to;j++) nc[j]=tcell(st.after[j],n-j,j===from);
    h+=row(nc,last?"ld-r":""); });
  return `<div class="ld-wrap"><table class="ld">${h}</table></div>`; }
function ldSteps(P,D){ const n=P.length-1, m=D.length-1, L=ldiv(P,D), out=[];
  if(P.some(v=>v===0)) out.push(`<b>Write every power</b> of the dividend, with 0 for missing ones: ${polyZ(P)}.`);
  L.steps.forEach((st,i)=>{ const lead=tcell(st.before[i],st.t,true), dl=tcell(D[0],m,true), qt=tcell(st.k,st.pw,true);
    out.push(`<b>Divide</b> ${lead} by ${dl}: ${qt}. <b>Multiply</b> ${qt}·(${poly(D)}) = ${poly(mul([st.k].concat(Array(st.pw).fill(0)),D))}. <b>Subtract</b>${i<L.steps.length-1?", then <b>bring down</b> the next term":""}.`); });
  const R=L.r, Q=L.q; const rz=R.every(v=>v===0);
  out.push(`<b>Stop</b> when the remainder's degree is less than the divisor's (${m}). Quotient Q(x) = <b>${poly(Q)}</b>, remainder R = <b>${poly(R)}</b>.`);
  out.push(rz?`<b>Answer:</b> ${poly(P)} = (${poly(D)})(${poly(Q)}), so (${poly(D)}) is a factor.`:`<b>Answer:</b> ${FRp(poly(P),poly(D))} = ${poly(Q)} + ${FRp(poly(R),poly(D))}.`);
  return out; }
const FRp=(a,b)=>`<span class="frc"><span>${a}</span><span>${b}</span></span>`;

/* synthetic table */
function sTable(c,r,lab){ const {s,p}=synth(c,r);
  return `<table class="rf"><tr><td class="rf-r"></td>${c.map(v=>`<td>${num(v)}</td>`).join("")}</tr>
   <tr class="rf-p"><td class="rf-r">${lab||num(r)}</td>${p.map(v=>`<td>${v===null?"":num(v)}</td>`).join("")}</tr>
   <tr class="rf-s"><td class="rf-r"></td>${s.map((v,i)=>`<td${i===s.length-1?' class="rf-rem"':""}>${num(v)}</td>`).join("")}</tr></table>`; }
function synSteps(P,a,b){ // divide by ax − b (a > 0); r = b/a
  const out=[], r=b/a, rl=a===1?num(b):frc(b,a);
  out.push(`<b>Find r:</b> set ${lin(a,-b)} = 0, so r = ${rl}.`);
  if(P.some(v=>v===0)) out.push(`<b>Write every coefficient,</b> with 0 for missing powers: ${P.map(num).join(", ")}.`);
  const {s}=synth(P,r); out.push(`<b>Bring down, multiply by ${rl}, add.</b> Repeat to the end.${sTable(P,r,rl)}`);
  const B=s.slice(0,-1), R=s[s.length-1];
  if(a===1){ out.push(`The bottom row gives Q(x) = <b>${poly(B)}</b> and remainder <b>${num(R)}</b>.`); }
  else out.push(`The bottom row ${B.map(num).join(", ")} is the quotient for (x − ${rl}). <b>Divide it by ${a}</b> because ${lin(a,-b)} = ${a}(x − ${rl}): Q(x) = <b>${poly(B.map(v=>v/a))}</b>, remainder <b>${num(R)}</b>.`);
  out.push(R===0?`<b>Answer:</b> remainder 0, so ${lin(a,-b)} is a factor: ${poly(P)} = (${lin(a,-b)})(${poly(B.map(v=>v/a))}).`:`<b>Answer:</b> ${FRp(poly(P),lin(a,-b))} = ${poly(B.map(v=>v/a))} + ${FRp(num(R),lin(a,-b))}. Check: P(${rl}) = ${num(R)}.`);
  return out; }

/* ---------- generators ---------- */
const gQ=d=>{ const q=[nz(-3,3)]; for(let i=0;i<d;i++) q.push(rnd(-6,6)); if(Math.random()<.5) q[0]=1; return q; };
function genLong(kind){ for(let t=0;t<300;t++){
  let D,Q,R;
  const k=kind||pick(["lin","lin","quad","quad","lead","miss"]);
  if(k==="lin"){ D=[1,nz(-5,5)]; Q=gQ(rnd(2,3)); R=[rnd(-9,9)]; }
  else if(k==="lead"){ D=[pick([2,3]),nz(-5,5)]; Q=gQ(2); R=[rnd(-9,9)]; }
  else if(k==="quad"){ D=[1,rnd(-4,4),nz(-5,5)]; Q=gQ(rnd(1,2)); R=[rnd(-6,6),rnd(-9,9)]; }
  else { D=pick([[1,0,1],[1,0,-2],[1,nz(-3,3)],[1,0,3]]); Q=gQ(rnd(1,2)); R=D.length===2?[rnd(-9,9)]:[rnd(-5,5),rnd(-9,9)]; }
  const P=add(mul(D,Q),R); if(P.length<3||P[0]===0) continue; if(P.some(v=>Math.abs(v)>60)) continue;
  if(k==="miss"&&!P.slice(1).some(v=>v===0)) continue;
  return {P,D,Q:trim(Q),R:trim(R)}; } return {P:[1,-6,11,-6],D:[1,-1],Q:[1,-5,6],R:[0]}; }
function genSyn(kind){ for(let t=0;t<300;t++){
  const k=kind||pick(["int","int","miss","factor","lead"]); let P,a=1,b=nz(-5,5);
  if(k==="lead"){ a=pick([2,3]); if(gcd(a,b)!==1) continue; P=add(mul([a,-b],gQ(2)),[rnd(-9,9)]); }
  else if(k==="factor"){ P=mul([1,-b],gQ(rnd(2,3))); }
  else { const d=rnd(3,4); P=[pick([1,1,2,3,-1])]; for(let i=0;i<d;i++) P.push(rnd(-7,7)); if(k==="miss"){ P[rnd(1,d-1)]=0; if(Math.random()<.5) P[rnd(1,d-1)]=0; } else if(P.slice(1).some(v=>v===0)) continue; }
  if(P.some(v=>Math.abs(v)>80)||P[0]===0) continue; if(synth(P,b/a).s.some(v=>Math.abs(v)>200)) continue;
  return {P,a,b}; } return {P:[1,-6,11,-6],a:1,b:1}; }

/* ---------- section 1: method flowchart ---------- */
const T=(...r)=>r;
const LD_EX1={P:[2,3,-5,4],D:[1,2]}, LD_EX2={P:[1,0,-3,2,5],D:[1,0,1]};
const DM={
 setup:{grp:"Always first",c:NAVY,name:"Write Both in Standard Form",hint:"0 for missing powers",
  when:"Before any division.",rule:"Order both polynomials from the highest power down. Write 0 for every missing power of the dividend (x<sup>3</sup> − 1 becomes x<sup>3</sup> + 0x<sup>2</sup> + 0x − 1). Otherwise the columns won't line up.",
  ex:[T("(x<sup>3</sup> − 8) ÷ (x − 2)",["Dividend: x<sup>3</sup> + 0x<sup>2</sup> + 0x − 8.","Coefficients: 1, 0, 0, −8."]),T("(4x − 3 + 2x<sup>3</sup>) ÷ (x + 1)",["Reorder: 2x<sup>3</sup> + 0x<sup>2</sup> + 4x − 3.","Coefficients: 2, 0, 4, −3."])],
  gen:()=>{ const g=genLong("miss"); return [`(${poly(g.P)}) ÷ (${poly(g.D)})`,[`Dividend with every power: ${polyZ(g.P)}.`,`Coefficients: ${g.P.map(num).join(", ")}.`]]; }},
 syn:{grp:"Divisor x − r",c:PURP,name:"Synthetic Division",hint:"fastest: coefficients only",
  when:"The divisor is linear with leading coefficient 1: x − r or x + r.",rule:"Use r (the zero of the divisor: x − 3 → 3, x + 2 → −2). Bring down, multiply by r, add, repeat. The last number is the remainder; the others are the quotient, one degree lower.",go:"sub-div-syn",
  ex:[T("(x<sup>3</sup> − 4x<sup>2</sup> + x + 6) ÷ (x − 2)",["r = 2: bring down 1; 1·2 = 2, −4 + 2 = −2; −2·2 = −4, 1 − 4 = −3; −3·2 = −6, 6 − 6 = 0.","<b>Q = x<sup>2</sup> − 2x − 3, R = 0</b>"]),T("(2x<sup>3</sup> + 3x<sup>2</sup> − 5x + 4) ÷ (x + 2)",["r = −2: 2, −1, −3 | 10.","<b>Q = 2x<sup>2</sup> − x − 3, R = 10</b>"])],
  gen:()=>{ const g=genSyn("int"); const st=synth(g.P,g.b).s; return [`(${poly(g.P)}) ÷ (${lin(1,-g.b)})`,[`r = ${num(g.b)}.`,`Bottom row: ${st.slice(0,-1).map(num).join(", ")} | ${num(st[st.length-1])}.`,`<b>Q = ${poly(st.slice(0,-1))}, R = ${num(st[st.length-1])}</b>`]]; }},
 synA:{grp:"Divisor ax − b",c:RED,name:"Synthetic with r = b/a",hint:"then divide the quotient by a",
  when:"The divisor is linear but its leading coefficient is not 1, like 2x − 1 or 3x + 2.",rule:"Use r = b/a (2x − 1 → r = 1/2). Do synthetic division. Then divide every number in the quotient row by a; the remainder stays the same. (Or use long division.)",go:"sub-div-syn",
  ex:[T("(2x<sup>3</sup> + x<sup>2</sup> − 7x + 3) ÷ (2x − 1)",["r = 1/2: 2, 2, −6 | 0.","Divide by 2: <b>Q = x<sup>2</sup> + x − 3, R = 0</b>"]),T("(3x<sup>2</sup> + 4x − 2) ÷ (3x − 2)",["r = 2/3: 3, 6 | 2.","Divide by 3: <b>Q = x + 2, R = 2</b>"])],
  gen:()=>{ const g=genSyn("lead"); const st=synth(g.P,g.b/g.a).s; return [`(${poly(g.P)}) ÷ (${lin(g.a,-g.b)})`,[`r = ${frc(g.b,g.a)}: bottom row ${st.slice(0,-1).map(num).join(", ")} | ${num(st[st.length-1])}.`,`Divide the quotient row by ${g.a}.`,`<b>Q = ${poly(st.slice(0,-1).map(v=>v/g.a))}, R = ${num(st[st.length-1])}</b>`]]; }},
 long:{grp:"Divisor degree ≥ 2",c:ORG,name:"Long Division",hint:"divide, multiply, subtract, bring down",
  when:"The divisor is quadratic or higher (x<sup>2</sup> + 1, x<sup>2</sup> − x + 2), or any time you prefer long division.",rule:"Divide the leading terms, multiply the whole divisor, subtract, bring down the next term. Repeat until the remainder has lower degree than the divisor.",go:"sub-div-long",
  ex:[T("(x<sup>4</sup> − 3x<sup>2</sup> + 2x + 5) ÷ (x<sup>2</sup> + 1)",["Write x<sup>4</sup> + 0x<sup>3</sup> − 3x<sup>2</sup> + 2x + 5.","x<sup>4</sup> ÷ x<sup>2</sup> = x<sup>2</sup>; subtract x<sup>4</sup> + x<sup>2</sup>: −4x<sup>2</sup> + 2x + 5.","−4x<sup>2</sup> ÷ x<sup>2</sup> = −4; subtract −4x<sup>2</sup> − 4: 2x + 9.","<b>Q = x<sup>2</sup> − 4, R = 2x + 9</b>"]),T("(2x<sup>3</sup> + 3x<sup>2</sup> − 5x + 4) ÷ (x + 2)",["2x<sup>3</sup> ÷ x = 2x<sup>2</sup>; subtract 2x<sup>3</sup> + 4x<sup>2</sup>: −x<sup>2</sup> − 5x.","−x<sup>2</sup> ÷ x = −x; subtract −x<sup>2</sup> − 2x: −3x + 4.","−3x ÷ x = −3; subtract −3x − 6: 10.","<b>Q = 2x<sup>2</sup> − x − 3, R = 10</b>"])],
  gen:()=>{ const g=genLong("quad"); return [`(${poly(g.P)}) ÷ (${poly(g.D)})`,ldSteps(g.P,g.D).slice(-3)]; }},
 rem:{grp:"Only the remainder?",c:TEAL,name:"Remainder Theorem",hint:"R = P(r)",
  when:"You only need the remainder of P(x) ÷ (x − r).",rule:"The remainder equals P(r). Plug in r instead of dividing.",go:"sub-div-thm",
  ex:[T("Remainder of (x<sup>3</sup> − 2x + 7) ÷ (x + 3)",["r = −3: P(−3) = −27 + 6 + 7.","<b>R = −14</b>"]),T("Remainder of (x<sup>50</sup> + 1) ÷ (x + 1)",["P(−1) = 1 + 1.","<b>R = 2</b> (no division needed!)"])],
  gen:()=>thmEx("rem")},
 fac:{grp:"Is it a factor?",c:BLU,name:"Factor Theorem",hint:"P(r) = 0 ⇔ (x − r) is a factor",
  when:"You must decide whether (x − r) is a factor, or find k so that it is.",rule:"(x − r) is a factor exactly when P(r) = 0. To find a missing coefficient k, set P(r) = 0 and solve for k.",go:"sub-div-thm",
  ex:[T("Is (x − 2) a factor of x<sup>3</sup> − 3x<sup>2</sup> + 4?",["P(2) = 8 − 12 + 4 = 0.","<b>Yes</b>"]),T("Find k: (x + 1) is a factor of x<sup>3</sup> + kx<sup>2</sup> − x − 2",["P(−1) = −1 + k + 1 − 2 = 0.","<b>k = 2</b>"])],
  gen:()=>thmEx(pick(["k","isf"]))},
 ans:{grp:"Last step",c:GRN,name:"Write the Answer & Check",hint:"P = D·Q + R",
  when:"Every time, at the end.",rule:"Write P(x)/D(x) = Q(x) + R(x)/D(x). Check by multiplying: D(x)·Q(x) + R(x) must give back P(x).",
  ex:[T("Q = x<sup>2</sup> − x − 3, R = 10, D = x + 2",["(x + 2)(x<sup>2</sup> − x − 3) + 10","= x<sup>3</sup> + x<sup>2</sup> − 5x − 6 + 10 = <b>x<sup>3</sup> + x<sup>2</sup> − 5x + 4</b> ✓"]),T("Q = x<sup>2</sup> − 4, R = 2x + 9, D = x<sup>2</sup> + 1",["(x<sup>2</sup> + 1)(x<sup>2</sup> − 4) + 2x + 9 = x<sup>4</sup> − 3x<sup>2</sup> − 4 + 2x + 9","= <b>x<sup>4</sup> − 3x<sup>2</sup> + 2x + 5</b> ✓"])],
  gen:()=>{ const g=genLong(); return [`Check: Q = ${poly(g.Q)}, R = ${poly(g.R)}, D = ${poly(g.D)}`,[`D·Q = ${poly(mul(g.D,g.Q))}.`,`Add R: <b>${poly(g.P)}</b> ✓`]]; }}
};
const FLOW=()=>window.A2FACT&&A2FACT.mkFlow?A2FACT.mkFlow("div",{M:DM,label:"Polynomial division flowchart",lead:"Follow the arrows from the top. Tap any method to see its rule and solved examples below the chart. Tap ↻ New examples for new numbers.",start:"Divide P(x) by D(x)",top:["setup"],q:"What is the divisor? What do you need?",
  cols:[["x − r","leading coefficient 1",PURP,["syn"]],["ax − b","a ≠ 1",RED,["synA"]],["Degree 2 or more","x² + 1, x² − x + 2, …",ORG,["long"]],["Only R?","or factor test",TEAL,["rem","fac"]]],end:"ans"}):"";

/* ---------- section 2: long division ---------- */
function ldCard(g,i){ return `<article class="fx-card wide"><div class="fx-k">Example ${i+1}</div><h4>(${poly(g.P)}) ÷ (${poly(g.D)})</h4>${ldTable(g.P,g.D)}<ol class="fx-steps">${ldSteps(g.P,g.D).map(s=>`<li>${s}</li>`).join("")}</ol></article>`; }
const LD_FIX=[{P:[2,3,-5,4],D:[1,2]},{P:[1,0,-3,2,5],D:[1,0,1]},{P:[6,-1,-5,7],D:[2,1]},{P:[1,0,0,-8],D:[1,-2]},{P:[1,-2,4,-1,3],D:[1,-1,2]},{P:[3,-5,0,4],D:[1,-2]}];
const LONG=()=>`<div class="fx-lead"><p><b>Use it for</b> any divisor, and you <b>must</b> use it when the divisor has degree 2 or more. Same idea as long division with numbers: divide, multiply, subtract, bring down.</p></div>
<div class="fx-how"><div class="fx-how-t">${ldTable([2,3,-5,4],[1,2])}<p class="fx-cap">(2x<sup>3</sup> + 3x<sup>2</sup> − 5x + 4) ÷ (x + 2): quotient 2x<sup>2</sup> − x − 3, remainder 10.</p></div>
 <ol class="fx-rules">
  <li><b>Standard form,</b> highest power first. Write <b>0</b> for missing powers in the dividend.</li>
  <li><b>Divide</b> the first term of what's left by the first term of the divisor. Write it on top, above its own power.</li>
  <li><b>Multiply</b> that term by the whole divisor and write the result underneath, lined up by powers.</li>
  <li><b>Subtract</b> (change every sign!), then <b>bring down</b> the next term.</li>
  <li><b>Repeat</b> until the remainder has a lower degree than the divisor.</li>
  <li><b>Answer:</b> P/D = Q + R/D. Check with D·Q + R = P.</li>
 </ol></div>
<div class="fx-signs"><b>Remember</b><span>subtracting: −(3x<sup>2</sup> − 6x) = −3x<sup>2</sup> + 6x</span><span>x<sup>3</sup> − 8 → x<sup>3</sup> + 0x<sup>2</sup> + 0x − 8</span><span>stop when deg R &lt; deg D</span></div>
<h4 class="h4">Solved examples</h4><div class="dv-ctl"><button type="button" class="fx-go" data-dvnew="long">↻ New examples</button></div><div class="fx-grid one" data-dvbox="long">${LD_FIX.map(ldCard).join("")}</div>`;

/* ---------- section 4: synthetic division ---------- */
function synCard(g,i){ return `<article class="fx-card wide"><div class="fx-k">Example ${i+1}</div><h4>(${poly(g.P)}) ÷ (${lin(g.a,-g.b)})</h4><ol class="fx-steps">${synSteps(g.P,g.a,g.b).map(s=>`<li>${s}</li>`).join("")}</ol></article>`; }
const SYN_FIX=[{P:[1,-4,1,6],a:1,b:2},{P:[2,3,-5,4],a:1,b:-2},{P:[1,0,0,-8],a:1,b:2},{P:[1,0,-5,0,4],a:1,b:-1},{P:[2,1,-7,3],a:2,b:1},{P:[3,4,-2],a:3,b:2}];
const SYN=()=>`<div class="fx-lead"><p><b>Use it for</b> a linear divisor. It is long division with only the coefficients, so it is much faster. (Ruffini's method in the Factoring folder is the same table, used to find factors.)</p></div>
<div class="fx-how"><div class="fx-how-t">${sTable([2,3,-5,4],-2)}<p class="fx-cap">(2x<sup>3</sup> + 3x<sup>2</sup> − 5x + 4) ÷ (x + 2), r = −2. Quotient 2x<sup>2</sup> − x − 3, remainder 10.</p></div>
 <ol class="fx-rules">
  <li><b>Find r:</b> the zero of the divisor. x − 3 → r = 3; x + 2 → r = −2; 2x − 1 → r = 1/2.</li>
  <li><b>Write every coefficient</b> of the dividend, with <b>0</b> for missing powers.</li>
  <li><b>Bring down</b> the first coefficient. <b>Multiply</b> by r, write it under the next coefficient, <b>add</b>. Repeat.</li>
  <li><b>Read the answer:</b> the last number is the remainder; the others are the quotient, one degree lower.</li>
  <li><b>If the divisor is ax − b,</b> divide the quotient numbers by a. The remainder does not change.</li>
 </ol></div>
<div class="fx-signs"><b>Remember</b><span>x + 4 → r = −4</span><span>remainder 0 ⇔ factor</span><span>remainder = P(r)</span></div>
<h4 class="h4">Solved examples</h4><div class="dv-ctl"><button type="button" class="fx-go" data-dvnew="syn">↻ New examples</button></div><div class="fx-grid one" data-dvbox="syn">${SYN_FIX.map(synCard).join("")}</div>`;

/* ---------- section 6: remainder & factor theorems ---------- */
function thmEx(kind){ const k=kind||pick(["rem","isf","k","zero"]);
  if(k==="rem"){ const P=[rnd(1,3),rnd(-5,5),rnd(-6,6),rnd(-9,9)], r=nz(-3,3); return [`Find the remainder of (${poly(P)}) ÷ (${lin(1,-r)}) without dividing.`,[`Remainder Theorem: R = P(${num(r)}).`,`P(${num(r)}) = ${P.map((a,i)=>`${num(a)}·(${num(r)})${3-i>1?`<sup>${3-i}</sup>`:""}`).slice(0,3).join(" + ")} + ${num(P[3])}`,`<b>R = ${num(ev(P,r))}</b>`]]; }
  if(k==="isf"){ const r=nz(-3,3), Q=[1,rnd(-4,4),rnd(-6,6)], e=pick([0,0,rnd(-3,3)]); const P=add(mul([1,-r],Q),[e]); return [`Is (${lin(1,-r)}) a factor of ${poly(P)}?`,[`Factor Theorem: check P(${num(r)}).`,`P(${num(r)}) = ${num(ev(P,r))}.`,`<b>${ev(P,r)===0?"Yes":"No"}</b>${ev(P,r)===0?`: P(x) = (${lin(1,-r)})(${poly(Q)})`:""}`]]; }
  if(k==="k"){ for(let t=0;t<200;t++){ const r=nz(-3,3),a=rnd(-5,5),c=rnd(-8,8); const k=-(r**3+a*r+c)/(r*r); if(!Number.isInteger(k)) continue;
      return [`Find k so that (${lin(1,-r)}) is a factor of x<sup>3</sup> + kx<sup>2</sup>${a?(a<0?" − ":" + ")+(Math.abs(a)===1?"":Math.abs(a))+"x":""}${c?(c<0?" − ":" + ")+Math.abs(c):""}.`,[`(x − ${num(r)}) is a factor ⇔ P(${num(r)}) = 0.`,`${num(r**3)} + ${r*r}k ${a*r+c<0?"− "+Math.abs(a*r+c):"+ "+(a*r+c)} = 0`,`<b>k = ${num(k)}</b>`]]; } }
  const r=nz(-3,3), s=nz(-4,4), t=nz(-4,4); const P=mul(mul([1,-r],[1,-s]),[1,-t]); return [`x = ${num(r)} is a zero of P(x) = ${poly(P)}. Find the other zeros.`,[`Divide by (${lin(1,-r)}) with synthetic division: ${synth(P,r).s.map(num).join(", ")}.`,`Q(x) = ${poly(synth(P,r).s.slice(0,-1))} = (${lin(1,-s)})(${lin(1,-t)}).`,`<b>Other zeros: ${num(s)}, ${num(t)}</b>`]]; }
const thmCard=([q,st],i)=>`<article class="fx-card"><div class="fx-k">Example ${i+1}</div><h4>${q}</h4><ol class="fx-steps">${st.map(s=>`<li>${s}</li>`).join("")}</ol></article>`;
const THM=()=>`<div class="fx-lead"><p><b>Remainder Theorem:</b> the remainder of P(x) ÷ (x − r) is P(r). <b>Factor Theorem:</b> (x − r) is a factor of P(x) exactly when P(r) = 0. Use them to skip the division, test factors, find missing coefficients, and find the other zeros once you know one.</p></div>
<div class="dv-ctl"><button type="button" class="fx-go" data-dvnew="thm">↻ New examples</button></div><div class="fx-grid" data-dvbox="thm">${Array.from({length:6},thmEx).map(thmCard).join("")}</div>`;

/* ---------- practice (type in the boxes) ---------- */
const inp=(f,lab,ph)=>`<input class="bx" data-f="${f}" type="text" inputmode="text" autocomplete="off" spellcheck="false" aria-label="${lab}"${ph?` placeholder="${ph}"`:""}>`;
function pv(s){ s=String(s||"").trim().replace(/[−–—]/g,"-").replace(/\s+/g,""); if(s===""||s==="-"||s==="+") return null; if(/^[-+]?\d+\/\d+$/.test(s)){ const [n,d]=s.split("/"); return +n/+d; } const v=Number(s); return isNaN(v)?NaN:v; }
const eq=(a,b)=>Math.abs(a-b)<1e-9;
const mark=(el,ok)=>{ el.classList.toggle("ok",ok===true); el.classList.toggle("bad",ok===false); };
function longPCard(g,i){ const P=g.P, D=g.D, n=P.length-1, m=D.length-1, L=ldiv(P,D), W=n+1;
  const pw=j=>S(n-j), cell=(f,j,lab)=>`<span class="lb">${inp(f,lab)}<i>${pw(j)}</i></span>`;
  const row=(cells,cls,left="")=>`<tr class="${cls}"><td class="ld-l">${left}</td>${Array.from({length:W},(_,j)=>`<td>${cells[j]||""}</td>`).join("")}</tr>`;
  const qc=[]; L.q.forEach((_,k)=>{ qc[m+k]=cell("q"+k,m+k,"Quotient term"); });
  let h=row(qc,"ld-q")+row(P.map((a,j)=>`<span class="lt">${tcell(a,n-j,j===0)}</span>`),"ld-d",poly(D)+"&thinsp;)");
  L.steps.forEach((st,k)=>{ const pc=[]; for(let j=k;j<=k+m;j++) pc[j]=cell(`m${k}_${j}`,j,"Multiply row");
    h+=row(pc,"ld-s","−");
    const dc=[], last=k===L.steps.length-1, to=last?n:Math.min(n,k+m+1); for(let j=k+1;j<=to;j++) dc[j]=cell(`d${k}_${j}`,j,last?"Remainder":"Subtract and bring down");
    h+=row(dc,last?"ld-r":"ld-n",last?"R":""); });
  return `<article class="fx-pc" data-kind="long" data-p='${JSON.stringify({P,D})}'>
   <div class="fx-pc-h"><span class="fx-pn">${i+1}</span><h4>(${poly(P)}) ÷ (${poly(D)})</h4><span class="fx-badge">Solved</span></div>
   <p class="fx-st">Type the <b>numbers</b> (the x's are already there). Green = right, red = wrong. Type 0 for a missing term and use − for negatives.</p>
   <div class="ld-wrap"><table class="ld in">${h}</table></div>
   <p class="fx-msg" data-o="msg">Step 1: divide ${tcell(P[0],n,true)} by ${tcell(D[0],m,true)} and type the number on top.</p>
   <div class="fx-btns"><button type="button" data-act="show">Show answer</button><button type="button" data-act="clear">Clear</button></div></article>`; }
function longExpect(P,D){ const n=P.length-1, m=D.length-1, L=ldiv(P,D), E={}; L.q.forEach((v,k)=>E["q"+k]=v);
  L.steps.forEach((st,k)=>{ for(let j=k;j<=k+m;j++) E[`m${k}_${j}`]=st.prod[j]; const last=k===L.steps.length-1, to=last?n:Math.min(n,k+m+1); for(let j=k+1;j<=to;j++) E[`d${k}_${j}`]=st.after[j]; });
  return {E,L}; }
function synPCard(g,i){ const c=g.P, n=c.length-1;
  return `<article class="fx-pc" data-kind="syn" data-p='${JSON.stringify({P:c,r:g.b})}'>
   <div class="fx-pc-h"><span class="fx-pn">${i+1}</span><h4>(${poly(c)}) ÷ (${lin(1,-g.b)})</h4><span class="fx-badge">Solved</span></div>
   <p class="fx-st"><b>Step 1.</b> Type r on the left (the zero of ${lin(1,-g.b)}). <b>Step 2.</b> Fill in the table.${c.some(v=>v===0)?" (The 0s are the missing powers.)":""}</p>
   <div class="rf-wrap"><table class="rf in"><tr><td class="rf-r"></td>${c.map(v=>`<td>${num(v)}</td>`).join("")}</tr>
    <tr class="rf-p"><td class="rf-r">${inp("r","r","r")}</td><td></td>${c.slice(1).map((_,j)=>`<td>${inp("p"+(j+1),"Multiply row, column "+(j+2))}</td>`).join("")}</tr>
    <tr class="rf-s"><td class="rf-r"></td>${c.map((_,j)=>`<td${j===n?' class="rf-rem"':""}>${inp("s"+j,j===n?"Remainder":"Bottom row, column "+(j+1))}</td>`).join("")}</tr></table></div>
   <p class="fx-msg" data-o="msg">Start with Step 1.</p>
   <div class="fx-btns"><button type="button" data-act="show">Show answer</button><button type="button" data-act="clear">Clear</button></div></article>`; }
function checkLong(card){ const P=JSON.parse(card.dataset.p), {E,L}=longExpect(P.P,P.D), F={}; card.querySelectorAll("[data-f]").forEach(e=>F[e.dataset.f]=e);
  let first=null, filled=0, good=0; const keys=Object.keys(F);
  keys.forEach(k=>{ const x=pv(F[k].value); if(x===null){ mark(F[k],null); if(!first) first=k; } else { filled++; const ok=eq(x,E[k]); mark(F[k],ok); if(ok) good++; else if(!first) first=k; } });
  const done=good===keys.length, msg=card.querySelector('[data-o="msg"]'), m=P.D.length-1; msg.className="fx-msg"+(done?" yes":"");
  if(done){ const R=trim(L.r); msg.innerHTML=`Solved! Q(x) = ${poly(L.q)}, R = ${poly(R)}. So ${FRp(poly(P.P),poly(P.D))} = ${poly(L.q)}${R.every(v=>!v)?"":" + "+FRp(poly(R),poly(P.D))}.`; }
  else if(first){ const k=first, bad=F[k].classList.contains("bad"), st=+(/\d+/.exec(k.slice(1))||[0])[0];
    msg.innerHTML=(bad?"<b>Check the red box.</b> ":"")+(k[0]==="q"?`Divide the first term of the line above by ${tcell(P.D[0],m,true)} and write it on top.`:k[0]==="m"?`Multiply the top term by every term of ${poly(P.D)} and write the products in this row.`:`Subtract: change every sign in the row above and add. Then bring down the next term.`); }
  card.classList.toggle("done",done); return done; }
function checkSyn(card){ const P=JSON.parse(card.dataset.p), c=P.P, n=c.length-1, F={}; card.querySelectorAll("[data-f]").forEach(e=>F[e.dataset.f]=e);
  const v=k=>pv(F[k].value); Object.values(F).forEach(e=>mark(e,null)); const r=v("r"), msg=card.querySelector('[data-o="msg"]'); let solved=false;
  if(r===null){ msg.className="fx-msg"; msg.innerHTML="Start with Step 1."; card.classList.remove("done"); return false; }
  const rOk=eq(r,P.r); mark(F.r,rOk);
  if(!rOk){ msg.className="fx-msg"; msg.innerHTML=eq(r,-P.r)?"Careful with the sign: for x − r use r; for x + r use −r.":"r is the number that makes the divisor 0."; card.classList.remove("done"); return false; }
  const {s,p}=synth(c,P.r); let good=0, tot=0;
  for(let j=1;j<=n;j++){ const x=v("p"+j); tot++; if(x!==null){ const ok=eq(x,p[j]); mark(F["p"+j],ok); if(ok) good++; } }
  for(let j=0;j<=n;j++){ const x=v("s"+j); tot++; if(x!==null){ const ok=eq(x,s[j]); mark(F["s"+j],ok); if(ok) good++; } }
  solved=good===tot; msg.className="fx-msg"+(solved?" yes":"");
  msg.innerHTML=solved?`Solved! Q(x) = ${poly(s.slice(0,-1))}, remainder ${num(s[n])}${s[n]===0?` (so ${lin(1,-P.r)} is a factor)`:""}.`:"Bring down the first number. Multiply by r, write it in the next column, add. Repeat.";
  card.classList.toggle("done",solved); return solved; }
function fill(card){ const P=JSON.parse(card.dataset.p), set=(k,x)=>{ const e=card.querySelector(`[data-f="${k}"]`); if(e) e.value=String(x).replace("-","−"); };
  if(card.dataset.kind==="long"){ const {E}=longExpect(P.P,P.D); Object.entries(E).forEach(([k,x])=>set(k,x)); }
  else { const {s,p}=synth(P.P,P.r); set("r",P.r); p.forEach((x,j)=>{ if(j) set("p"+j,x); }); s.forEach((x,j)=>set("s"+j,x)); } }
const NLP=6, NSP=6;
function genLongP(k){ for(let t=0;t<400;t++){ const g=genLong(k); const n=g.P.length-1; if(n>3) continue; if(k==="quad"&&g.D.length<3) continue; return g; } return genLong("lin"); }
const newLong=()=>["lin","lin","lead","miss","quad","lin"].map(genLongP);
const newSyn=()=>{ const kinds=["int","int","miss","factor","int","miss"]; return kinds.map(k=>genSyn(k)).map(g=>g.a===1?g:genSyn("int")); };
function setHTML(kind,list){ const cards=kind==="long"?list.map(longPCard):list.map(synPCard);
  return `<div class="fx-set" data-dvset="${kind}"><div class="fx-ctl"><span class="fx-score">Solved <b>0</b> / ${list.length}</span><button type="button" data-act="new">↻ New problems</button><button type="button" data-act="reset">Clear all</button></div><div class="fx-pgrid">${cards.join("")}</div></div>`; }
const LONGP=()=>`<div class="fx-lead"><p>Fill in the long division right in the layout, step by step: the quotient on top, each multiply row, then each subtract-and-bring-down row. Type only the numbers; the x's are printed for you. Each box turns <span class="yes">green</span> when it's right and <span class="no">red</span> when it's wrong.</p></div>${setHTML("long",newLong())}`;
const SYNP=()=>`<div class="fx-lead"><p>Type r, then fill in the synthetic division table. Each box turns <span class="yes">green</span> when it's right. Type negative numbers with a minus sign.</p></div>${setHTML("syn",newSyn())}`;
function bindSets(root){ root.querySelectorAll("[data-dvset]").forEach(set=>{ if(set.dataset.bound) return; set.dataset.bound=1; const kind=set.dataset.dvset;
  const score=()=>{ const cs=[...set.querySelectorAll(".fx-pc")]; set.querySelector(".fx-score").innerHTML=`Solved <b>${cs.filter(c=>c.classList.contains("done")).length}</b> / ${cs.length}`; };
  const chk=card=>{ (card.dataset.kind==="long"?checkLong:checkSyn)(card); score(); };
  set.addEventListener("input",e=>{ const card=e.target.closest(".fx-pc"); if(card) chk(card); });
  set.addEventListener("click",e=>{ const b=e.target.closest("[data-act]"); if(!b) return; const act=b.dataset.act, card=b.closest(".fx-pc");
    if(act==="show"&&card){ fill(card); chk(card); }
    else if(act==="clear"&&card){ card.querySelectorAll("[data-f]").forEach(x=>x.value=""); const s=card.querySelector(".dv-sol"); if(s) s.hidden=true; chk(card); }
    else if(act==="reset"){ set.querySelectorAll("[data-f]").forEach(x=>x.value=""); set.querySelectorAll(".dv-sol").forEach(s=>s.hidden=true); set.querySelectorAll(".fx-pc").forEach(c=>(c.dataset.kind==="long"?checkLong:checkSyn)(c)); score(); }
    else if(act==="new"){ set.querySelector(".fx-pgrid").innerHTML=(kind==="long"?newLong().map(longPCard):newSyn().map(synPCard)).join(""); score(); } }); }); }
function bindNew(root){ root.querySelectorAll("[data-dvnew]").forEach(b=>{ if(b.dataset.bound) return; b.dataset.bound=1; b.onclick=()=>{ const k=b.dataset.dvnew, box=root.querySelector(`[data-dvbox="${k}"]`); if(!box) return;
  if(k==="long") box.innerHTML=["lin","lead","quad","miss","quad","lin"].map(x=>genLong(x)).map(ldCard).join("");
  else if(k==="syn") box.innerHTML=["int","int","miss","factor","lead","lead"].map(x=>genSyn(x)).map(synCard).join("");
  else box.innerHTML=Array.from({length:6},thmEx).map(thmCard).join(""); }; }); }

/* ---------- node map for this folder ---------- */
const META={start:["Start","which method when"],long:["Long Division","any divisor"],longp:["Practice","type the answer"],syn:["Synthetic","divisor x − r"],synp:["Practice","type in the table"],thm:["Theorems","remainder & factor"]};
const SHORT={start:"Method Flowchart",long:"Long Division",longp:"Long Division Practice",syn:"Synthetic Division",synp:"Synthetic Practice",thm:"Remainder & Factor Theorems"};
const GCOL={"Start":NAVY,"Long Division":ORG,"Synthetic":PURP,"Theorems":BLU,"Practice":TEAL};
function mapInit(root){
  const sec=root.querySelector("#sec-div"); if(!sec||sec.querySelector(".pmap")) return;
  const subs=[...sec.querySelectorAll('[id^="sub-div-"]')]; if(subs.length<2) return;
  const items=subs.map((el,i)=>{ const k=el.id.replace("sub-div-",""), sm=el.querySelector(".subh small"), t=el.querySelector(".subh").cloneNode(true); t.querySelectorAll(".num,small,.totop").forEach(x=>x.remove());
    return {k,el,i,title:(SHORT[k]||t.textContent.trim()),cnt:sm?sm.textContent:"",grp:(META[k]||["Practice",""])[0],desc:(META[k]||["",""])[1]}; });
  const N=items.length, pos=items.map((_,i)=>{ const a=-Math.PI/2+2*Math.PI*i/N; return [50+38*Math.cos(a),50+36*Math.sin(a)]; });
  let mode="map"; try{ mode=localStorage.getItem("a2divview")||"map"; }catch(e){}
  const wrap=document.createElement("div"); wrap.className="pmap";
  wrap.innerHTML=`<div class="pm-bar"><button type="button" data-pv="map">Map</button><button type="button" data-pv="list">List</button><span class="pm-leg">${Object.entries(GCOL).map(([g,c])=>`<span><i style="background:${c}"></i>${g}</span>`).join("")}</span></div>
   <div class="pm-stage"><svg class="pm-lines" viewBox="0 0 100 100" preserveAspectRatio="none">${pos.map(([x,y])=>`<line x1="50" y1="50" x2="${x}" y2="${y}"/>`).join("")}${pos.slice(0,-1).map(([x,y],i)=>`<line class="pth" x1="${x}" y1="${y}" x2="${pos[i+1][0]}" y2="${pos[i+1][1]}"/>`).join("")}</svg>
    <div class="pm-hub dv-hub"><b>Division</b><span>Start at 1 and follow the path</span></div>
    ${items.map((it,i)=>`<button type="button" class="pm-node" data-pk="${it.k}" style="left:${pos[i][0]}%;top:${pos[i][1]}%;--c:${GCOL[it.grp]||TEAL}"><span class="pm-n">${i+1}</span><span class="pm-t">${it.title}</span><span class="pm-d">${it.desc}</span><span class="pm-c">${it.cnt}</span></button>`).join("")}</div>
   <div class="pm-cur"></div>`;
  subs[0].parentNode.insertBefore(wrap,subs[0]);
  const cur=wrap.querySelector(".pm-cur"); let sel=items[0].k;
  const show=k=>{ sel=k; const it=items.find(x=>x.k===k);
    wrap.querySelectorAll(".pm-node").forEach(n=>n.classList.toggle("on",n.dataset.pk===k));
    items.forEach(x=>x.el.style.display=(mode==="list"||x.k===k)?"":"none");
    if(mode==="map"){ if(it.el.tagName==="DETAILS") it.el.open=true; const i=it.i;
      cur.innerHTML=`<button type="button" class="pm-step" data-ps="${i-1}"${i?"":" disabled"}>‹ ${i?items[i-1].title:""}</button><span>Section ${i+1} of ${N}</span><button type="button" class="pm-step" data-ps="${i+1}"${i<N-1?"":" disabled"}>${i<N-1?items[i+1].title:""} ›</button>`;
      cur.querySelectorAll("[data-ps]").forEach(b=>b.onclick=()=>{ const j=+b.dataset.ps; if(items[j]){ show(items[j].k); cur.scrollIntoView({behavior:"smooth",block:"start"}); } }); } };
  const setMode=m=>{ mode=m; try{ localStorage.setItem("a2divview",m); }catch(e){} wrap.classList.toggle("list",m==="list"); wrap.querySelectorAll("[data-pv]").forEach(b=>b.classList.toggle("on",b.dataset.pv===m)); if(m==="list") cur.innerHTML=""; show(sel); };
  wrap.querySelectorAll("[data-pv]").forEach(b=>b.onclick=()=>setMode(b.dataset.pv));
  wrap.querySelectorAll(".pm-node").forEach(n=>n.onclick=()=>{ show(n.dataset.pk); setTimeout(()=>cur.scrollIntoView({behavior:"smooth",block:"start"}),30); });
  sec.addEventListener("click",e=>{ const j=e.target.closest("[data-jump]"); if(!j||mode!=="map") return; const it=items.find(x=>x.el.id===j.dataset.jump); if(it&&it.k!==sel) show(it.k); },true);
  setMode(mode); }

/* ---------- links from Unit 2 and Unit 4 ---------- */
function links(root){ [["#sec-unit-2 .sub","dv-u2"],["#sec-unit-4 .sub","dv-u4"],["#sec-poly .lead2","dv-up"]].forEach(([sel,cls])=>{ const s=root.querySelector(sel); if(!s||root.querySelector("."+cls)) return;
  const d=document.createElement("div"); d.className="fx-u2 dv-u "+cls; d.innerHTML=`<b>Division folder:</b> long division and synthetic division, the Remainder and Factor Theorems, with solved examples and practice you can type into. <button type="button" class="openu" data-open="div">Open Division →</button>`;
  const after=root.querySelector("#sec-unit-2 .fx-u2:not(.dv-u)"); (cls==="dv-u2"&&after?after:s).after(d); d.querySelector("button").onclick=()=>{ location.hash="div"; }; }); }

/* ---------- styles ---------- */
const st=document.createElement("style"); st.textContent=`
nav button.dbtn{background:${ORG};border-color:${ORG};color:#fff;font-weight:600}
nav button.dbtn:hover{background:#9c4413}
nav button.dbtn[aria-current="true"]{background:#7a3410;border-color:#7a3410;box-shadow:inset 0 -3px 0 #fff}
.dv-hub{background:${ORG}!important}
.dv-u{border-color:${ORG}!important;background:#fff6ef!important}
.dv-u .openu{background:${ORG}!important;border-color:${ORG}!important}
.dv-ctl{margin:4px 0 12px}
.ld-wrap{overflow-x:auto;margin:6px 0 10px}
.ld{border-collapse:collapse;font:700 23px 'Caveat',cursive;color:${INK}}
.ld td{padding:1px 7px;text-align:right;white-space:nowrap;min-width:44px}
.ld td.ld-l{color:${RED};text-align:right;padding-right:2px}
.ld tr.ld-q td{color:${GRN}}
.ld tr.ld-d td:not(.ld-l){border-top:2px solid #111;color:#111}
.ld tr.ld-d td:nth-child(2){border-left:2px solid #111}
.ld tr.ld-s td:not(.ld-l):not(:empty){border-bottom:2px solid #111;color:#7a7f87}
.ld tr.ld-r td:not(:empty){color:${RED}}
.dv-row{display:flex;flex-wrap:wrap;align-items:center;gap:6px;font-size:19px;margin:6px 0}
.dv-row i{font-style:normal;font-weight:600}
.dv-sol{margin:6px 0}
.ld.in td{padding:2px 1px;text-align:left;min-width:0;vertical-align:middle}
.ld.in td.ld-l{text-align:right;padding-right:4px;font-size:22px}
.ld.in .lb{display:inline-flex;align-items:center;gap:1px;white-space:nowrap}
.ld.in .lb i{font-style:normal;color:#111;font-size:17px;min-width:0}
.ld.in .bx{width:36px;height:34px;font-size:21px;padding:0}
.ld.in .lt{color:#111;padding:0 2px;font-size:20px;white-space:nowrap}
.ld.in tr.ld-d td:not(.ld-l){border-top:2px solid #111}
.ld.in tr.ld-s td:not(.ld-l):not(:empty){border-bottom:2px solid #111}
.ld.in tr.ld-s td.ld-l{color:#7a7f87}
.ld.in tr.ld-r td.ld-l{color:${RED}}
`; document.head.appendChild(st);

const NEX=LD_FIX.length+SYN_FIX.length+6;
window.A2DIV={
  count:()=>NEX+NLP+NSP,
  tip:()=>`${NEX} solved examples · ${NLP+NSP} type-in problems`,
  subs:()=>[["start","Method Flowchart: Which Division Method?","7 methods",FLOW(),"Method Flowchart"],
    ["long","Long Division (Any Divisor)",LD_FIX.length+" examples",LONG(),"Long Division"],
    ["longp","Long Division Practice: Type the Answer",NLP+" problems",LONGP(),"Long Division Practice"],
    ["syn","Synthetic Division (Divisor x − r)",SYN_FIX.length+" examples",SYN(),"Synthetic Division"],
    ["synp","Synthetic Division Practice: Type in the Table",NSP+" problems",SYNP(),"Synthetic Practice"],
    ["thm","Remainder & Factor Theorems","6 examples",THM(),"Theorems"]],
  lead:()=>`<p class="lead2 fx-lead" style="font-style:normal">Divide polynomials by long division (any divisor) and by synthetic division (x − r and ax − b), and use the Remainder and Factor Theorems. Includes ${NEX} solved examples with ↻ New examples, and ${NLP+NSP} practice problems where students type into the boxes and see right away whether each one is correct. <button type="button" class="openu" style="background:${ORG};border-color:${ORG}" data-open="div">Open Division →</button></p>`,
  bind(root){ bindSets(root); bindNew(root); if(window.A2FACT&&A2FACT.bindFlow) A2FACT.bindFlow(root); mapInit(root); links(root);
    root.querySelectorAll("#sec-div [data-open]").forEach(b=>b.onclick=()=>{ location.hash=b.dataset.open; }); },
  _test:{ldiv,ldTable,ldSteps,synSteps,genLong,genSyn,checkLong,checkSyn,fill,synth,poly,thmEx,DM}
};
})();
