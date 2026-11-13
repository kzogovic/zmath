/* Polynomials folder: functions & properties, end behavior, zeros & multiplicity, division & the Remainder Theorem,
   Factor Theorem, rational zeros, imaginary zeros, approximating zeros, and a practice generator.
   All arithmetic (synthetic division, long division, zeros, tables) is computed here, not typed by hand. */
(function(){
const NAVY="#1d4e89";
const fmt=s=>window.A2PRACTICE?A2PRACTICE.fmt(s):s;
const plot=g=>window.A2PLOT?A2PLOT.plot(g):"";
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)), pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};

/* ---------- numbers ---------- */
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a;};
function fr(v){ if(Math.abs(v-Math.round(v))<1e-9) return [Math.round(v),1]; for(const d of [2,3,4,5,6,8,9,10,12]){ const n=v*d; if(Math.abs(n-Math.round(n))<1e-9) return [Math.round(n),d]; } return null; }
const t=v=>{ const f=fr(v); if(!f) return String(+v.toFixed(3)); return f[1]===1?String(f[0]):(f[0]<0?"-":"")+`{{${Math.abs(f[0])}|${f[1]}}}`; };
const tl=v=>{ const f=fr(v); if(!f) return String(+v.toFixed(2)); return f[1]===1?String(f[0]):`${f[0]}/${f[1]}`; };   // graph labels

/* ---------- polynomials as coefficient arrays (highest power first) ---------- */
function ps(c,v="x"){ // to fmt notation
  const n=c.length-1; let s="";
  c.forEach((a,i)=>{ if(Math.abs(a)<1e-12) return; const p=n-i, mag=Math.abs(a), f=fr(mag);
    const co=(mag===1&&p>0)?"":(f&&f[1]!==1?`{{${f[0]}|${f[1]}}}`:t(mag)); const vv=p===0?"":p===1?v:`${v}^${p}`;
    s+=s?(a<0?" - ":" + "):(a<0?"-":""); s+=co+vv; });
  return s||"0";
}
const ev=(c,x)=>c.reduce((s,a)=>s*x+a,0);
const mul=(a,b)=>{ const r=Array(a.length+b.length-1).fill(0); a.forEach((x,i)=>b.forEach((y,j)=>r[i+j]+=x*y)); return r; };
const fromRoots=(rs,lc=1)=>rs.reduce((p,r)=>mul(p,[1,-r]),[lc]);
function synth(c,r){ const res=[c[0]], prod=[""]; for(let i=1;i<c.length;i++){ const m=res[i-1]*r; prod.push(m); res.push(c[i]+m); } return {res,prod,q:res.slice(0,-1),rem:res[res.length-1]}; }
function synthHTML(c,r,note){
  const s=synth(c,r), cell=v=>v===""?"":fmt(t(v));
  return `<table class="syn"><tr><td class="sc">${fmt(t(r))}</td>${c.map(v=>`<td>${cell(v)}</td>`).join("")}</tr>
   <tr><td class="sc"></td>${s.prod.map(v=>`<td>${cell(v)}</td>`).join("")}</tr>
   <tr class="sr"><td class="sc"></td>${s.res.map((v,i)=>`<td${i===s.res.length-1?' class="rem"':""}>${cell(v)}</td>`).join("")}</tr></table>${note?`<div class="synn">${fmt(note)}</div>`:""}`;
}
function longDiv(n,d){ // returns quotient, remainder and text steps
  let r=n.slice(); const q=Array(Math.max(n.length-d.length+1,1)).fill(0), steps=[];
  while(r.length>=d.length&&r.some(x=>Math.abs(x)>1e-12)){
    const deg=r.length-1, k=r[0]/d[0], p=deg-(d.length-1); q[q.length-1-p]=k;
    const term=ps([k,...Array(p).fill(0)]), sub=mul(d,[k,...Array(p).fill(0)]);
    const nr=r.map((x,i)=>x-(sub[i]||0)).slice(1);
    steps.push(`Divide: ${ps([r[0],...Array(deg).fill(0)])} ÷ ${ps([d[0],...Array(d.length-1).fill(0)])} = <b>${term}</b>. Multiply: ${term}(${ps(d)}) = ${ps(sub)}. Subtract → <b>${ps(nr)}</b>`);
    r=nr; while(r.length>1&&Math.abs(r[0])<1e-12) r=r.slice(1);
    if(r.length<d.length) break;
  }
  return {q,r,steps};
}
function gPoly(c,o={}){ // graph spec for a polynomial
  const zs=(o.zeros||[]).filter(z=>typeof z==="number");
  const xs=[...zs,0]; let x0=o.xr?o.xr[0]:Math.min(...xs)-1.5, x1=o.xr?o.xr[1]:Math.max(...xs)+1.5;
  if(x1-x0<6){ const m=(x0+x1)/2; x0=m-3; x1=m+3; }
  let ys=[]; const lo=zs.length?Math.min(...zs,0)-0.6:x0, hi=zs.length?Math.max(...zs,0)+0.6:x1; for(let i=0;i<=200;i++) ys.push(ev(c,lo+(hi-lo)*i/200)); if(zs.length){ const m=Math.max(...ys.map(Math.abs)); ys.push(m*0.25,-m*0.25); }
  let y0=o.yr?o.yr[0]:Math.max(Math.min(...ys),-40), y1=o.yr?o.yr[1]:Math.min(Math.max(...ys),40);
  const pad=Math.max(1,(y1-y0)*0.1); if(!o.yr){ y0-=pad; y1+=pad; y0=Math.min(y0,-1); y1=Math.max(y1,1); }
  const p=[...zs.map(z=>[z,0,o.zl&&o.zl[z]!==undefined?o.zl[z]:`(${tl(z)}, 0)`]),...(o.p||[])];
  if(o.yint!==false&&!zs.some(z=>Math.abs(z)<1e-9)){ const y=ev(c,0); if(y>y0&&y<y1) p.push([0,y,`(0, ${tl(y)})`]); }
  return {f:[{f:x=>ev(c,x)},...(o.extra||[])],p,xr:[x0,x1],yr:[y0,y1],cap:o.cap,h:o.h,v:o.v};
}

function divs(n){ const r=[]; for(let i=1;i<=n;i++) if(n%i===0) r.push(i); return r; }
function cands(c){ const P=divs(Math.abs(c[c.length-1])), Q=divs(Math.abs(c[0])); const set=new Map(); P.forEach(p=>Q.forEach(q=>{ const v=p/q; set.set(v.toFixed(9),v); })); return [...set.values()].sort((a,b)=>a-b); }
const candTxt=c=>cands(c).map(v=>"±"+t(v)).join(", ");
const signs=c=>{ let n=0, last=0; c.forEach(a=>{ if(!a) return; const s=Math.sign(a); if(last&&s!==last) n++; last=s; }); return n; };
const neg=c=>c.map((a,i)=>((c.length-1-i)%2?-a:a));
/* ---------- card (every example has a generator: ↻ New example) ---------- */
const REG=[];   // generators, by card id
const cardBody=c=>`${c.q?`<p class="el-q"><b>${c.lab||"Example"}.</b> ${fmt(c.q)}</p>`:""}
  <div class="cs-ex">${c.g?plot(c.g):""}${c.pre||""}${c.steps?`<ol class="el-steps">${c.steps.map(s=>`<li>${fmt(s)}</li>`).join("")}</ol>`:""}${c.post||""}<div style="clear:both"></div></div>
  ${c.rows?`<table class="el-kf">${c.rows.map(([a,b])=>`<tr><th>${fmt(a)}</th><td>${fmt(b)}</td></tr>`).join("")}</table>`:""}
  ${c.tip?`<p class="cs-tip"><b>⚠ Watch out:</b> ${fmt(c.tip)}</p>`:""}`;
function card(e,i){ const c=e.mk(...e.p); const id=REG.push(e)-1;
  return `<details class="cs-card pc" data-pid="${id}"><summary><h4><span class="n">${i}</span>${fmt(e.title||c.title)}</h4></summary>
   <div class="pbody">${cardBody(c)}</div><div class="pnew"><button type="button" data-pnew="${id}">↻ New example</button><span>a new problem of this type, fully worked out</span></div></details>`; }
const rules=(title,list)=>`<div class="prules"><h4>${title}</h4><ul>${list.map(r=>`<li>${fmt(r)}</li>`).join("")}</ul></div>`;
const grid=(L,start=1)=>`<div class="cs-grid">${L.map((c,i)=>card(c,start+i)).join("")}</div>`;
const X=(mk,p,title)=>({mk,p,title});   // example = builder + its first parameters

/* helpers */
const fac=r=>{ const f=fr(r); return f&&f[1]!==1?`(${ps([f[1],-f[0]])})`:`(${ps([1,-r])})`; };
const facC=r=>{ const f=fr(r); return f&&f[1]!==1?[f[1],-f[0]]:[1,-r]; };
const prodC=rs=>rs.reduce((p,r)=>mul(p,facC(r)),[1]);
const nz=(a,b,ex=[])=>{ let v; do{ v=rnd(a,b); }while(v===0||ex.includes(v)); return v; };
const distinct=(n,a,b,ex=[])=>{ const s=[]; while(s.length<n){ const v=nz(a,b,[...ex,...s]); s.push(v); } return s; };
const sq=v=>v<0?`(${v})`:String(v);
const powTerms=c=>{ const n=c.length-1; return c.map((a,i)=>[a,n-i]).filter(([a])=>a); };
const synthWords=(c,k)=>{ const s=synth(c,k), w=[`bring down ${t(c[0])}`]; for(let i=1;i<c.length;i++) w.push(`${t(s.res[i-1])}·${sq(t(k))} = ${t(s.prod[i])}, ${t(c[i])} + ${sq(t(s.prod[i]))} = ${t(s.res[i])}`); return w.join(" → "); };
const zl=r=>{ const f=fr(r); return f?(f[1]===1?`(${f[0]}, 0)`:`(${f[0]}/${f[1]}, 0)`):`(${r.toFixed(2)}, 0)`; };

/* ======================= 1. Properties ======================= */
const POOLY=[["3x^4 - x + 7",4,""],["5x^3 - {{1|2}}x",3,"fraction coefficients are fine"],["-x^5 + 2x^2",5,""],["(x + 1)(x - 2)^2",3,"add the degrees of the factors"],["7",0,"a constant has degree 0"],["{{x^2 + 1|4}}",2,"dividing by a number is fine"],["√5x^2 - x",2,"irrational coefficients are fine"],["x(x^2 - 3)^2",5,"1 + 2·2 = 5"]];
const POOLN=[["2x^(-1) + 1","the exponent -1 is negative ({{2|x}})"],["√x + 2","√x = x^({{1|2}}): a fractional exponent"],["x^2 + 3^x","3^x has the variable in the exponent"],["{{3|x^2}} - x","x in a denominator means x^(-2)"],["|x| + 1","absolute value is not a polynomial"],["x^({{2|3}}) - 4","the exponent {{2|3}} is not a whole number"],["{{x + 1|x - 1}}","a rational function, not a polynomial"]];
function bIsPoly(ys,ns){ const items=shuffle([...ys.map(i=>[POOLY[i],1]),...ns.map(i=>[POOLN[i],0])]);
  return {title:"Is it a polynomial function?",q:"Decide whether each is a polynomial function. If it is, give its degree.",
   steps:items.map(([it,y],k)=>`f${k+1}(x) = ${it[0]}: ${y?`<b>yes</b>, degree ${it[1]}${it[2]?" ("+it[2]+")":""}`:`<b>no</b>: ${it[1]}`}.`),
   tip:"Fractions and negatives are allowed in the coefficients, never in the exponents."}; }
bIsPoly.r=()=>[shuffle([0,1,2,3,4,5,6,7]).slice(0,3),shuffle([0,1,2,3,4,5,6]).slice(0,3)];
function bStd(rs){ const fs=rs.map(fac), c=prodC(rs), ab=mul(facC(rs[0]),facC(rs[1])), lc=c[0], deg=rs.length;
  return {title:"Standard form, degree and key numbers",q:`Write f(x) = ${fs.join("")} in standard form. Identify the degree, leading coefficient, y-intercept, and the maximum numbers of zeros and turning points.`,
   g:gPoly(c,{zeros:rs,cap:`Degree ${deg}: ${deg} zeros and ${deg-1} turning points.`}),
   steps:[`${fs[0]}${fs[1]} = ${ps(ab)}.`,`(${ps(ab)})${fs[2]} = <b>${ps(c)}</b>.`,`Degree <b>${deg}</b> (cubic), leading coefficient <b>${lc}</b>, constant term ${c[deg]} → y-intercept <b>(0, ${c[deg]})</b>.`,`At most ${deg} real zeros: here exactly ${deg}, x = ${rs.map(t).join(", ")} (set each factor = 0).`,`At most ${deg} - 1 = <b>${deg-1} turning points</b>, which matches the graph.`],
   rows:[["Standard form",ps(c)],["Degree","3 (cubic)"],["Leading coefficient",String(lc)],["y-intercept",`(0, ${c[deg]})`],["Zeros",[...rs].sort((a,b)=>a-b).map(t).join(", ")]],
   tip:`The leading coefficient is the product of the leading coefficients of the factors: ${rs.map(r=>facC(r)[0]).join(" · ")} = ${lc}.`}; }
bStd.r=()=>{ const q=pick([2,3]), p=pick([1,-1])*pick(q===2?[1,3,5]:[1,2,4]); return [[p/q,...distinct(2,-4,4)]]; };
function bEvenOdd(e,o,nei){ const kind=c=>{ const m=neg(c); return m.every((v,i)=>Math.abs(v-c[i])<1e-9)?"even":m.every((v,i)=>Math.abs(v+c[i])<1e-9)?"odd":"neither"; };
  const L=[["f",e],["g",o],["h",nei]];
  return {title:"Even, odd or neither?",q:`Classify ${L.map(([n,c])=>`${n}(x) = ${ps(c)}`).join(", ")}.`,
   g:{f:[{f:x=>ev(e,x)},{f:x=>ev(o,x),dash:true}],p:[[0,ev(e,0),""]],xr:[-3,3],yr:[-8,8],cap:"Solid: f (even, mirror image across the y-axis). Dashed: g (odd, symmetric about the origin)."},
   steps:L.map(([n,c])=>{ const k=kind(c); return `${n}(-x) = ${ps(neg(c))}${k==="even"?` = ${n}(x) → <b>even</b>`:k==="odd"?` = -${n}(x) → <b>odd</b>`:`: this is neither ${n}(x) nor -${n}(x) → <b>neither</b>`}.`; }),
   rows:[["Even","only even powers (a constant counts as x^0)"],["Odd","only odd powers, no constant"],["Neither","a mix of even and odd powers"]],
   tip:"Test with f(-x); don't just look at the degree. An odd-degree polynomial with a constant term is not odd."}; }
bEvenOdd.r=()=>[[pick([1,-1,2]),0,nz(-5,5),0,rnd(-4,4)],[pick([1,-1,2]),0,nz(-6,6),0],[1,nz(-3,3),0,nz(-4,4)]];
function bOps(A,B,P,Q){ const diff=A.map((a,i)=>a-(B[i]||0));
  return {title:"Adding, subtracting and multiplying",q:`Simplify (${ps(A)}) - (${ps(B)}) and (${ps(P)})(${ps(Q)}).`,
   steps:[`Subtract by changing every sign in the second polynomial: ${ps(A)} ${ps(B.map(v=>-v)).replace(/^-/,"- ").replace(/^(?!- )/,"+ ")}.`,`Combine like terms: <b>${ps(diff)}</b>.`,`Multiply each term of ${ps(P)} by each term of ${ps(Q)}.`,`Result: <b>${ps(mul(P,Q))}</b>.`,`Check the degree: ${P.length-1} + ${Q.length-1} = ${P.length+Q.length-2} ✓.`],
   tip:"When subtracting, distribute the minus to every term, including the constant."}; }
bOps.r=()=>[[rnd(1,4),rnd(-5,5),rnd(-5,5),rnd(-9,9)],[rnd(1,3),rnd(-5,5),0,rnd(-9,9)],[1,rnd(-4,4),nz(-5,5)],[1,nz(-5,5)]];
function bDegGraph(rs,lc){ const c=rs.reduce((p,r)=>mul(p,[1,-r]),[lc]), k=rs.length, ys=[]; for(let i=0;i<=100;i++) ys.push(ev(c,-4.5+9*i/100));
  const s=Math.max(...ys.map(Math.abs))/6||1, cc=c.map(v=>v/s), up=k%2?(lc>0?"falling on the left and rising on the right":"rising on the left and falling on the right"):(lc>0?"rising on both ends":"falling on both ends");
  return {title:"Reading the degree from a graph",q:`A polynomial graph crosses the x-axis ${k} times, has ${k-1} turning points, and is ${up}. What can you say about its degree?`,
   g:{f:[{f:x=>ev(cc,x)}],p:rs.map(r=>[r,0,""]),xr:[-4.5,4.5],yr:[-8,8],cap:`${k} x-intercepts, ${k-1} turning points.`},
   steps:[`Turning points ≤ n - 1, so ${k-1} ≤ n - 1 → <b>n ≥ ${k}</b>.`,`${k} real zeros also require n ≥ ${k}.`,`The ends point ${k%2?"in opposite directions → the degree is <b>odd</b>":"the same way → the degree is <b>even</b>"}, and the leading coefficient is <b>${lc>0?"positive":"negative"}</b>.`,`The smallest possible degree is <b>${k}</b> (it could be ${k+2}, ${k+4}, …).`],
   tip:"A graph gives the minimum degree, not the exact degree."}; }
bDegGraph.r=()=>{ const k=rnd(2,5); return [distinct(k,-4,4).map(v=>v*0.9),pick([1,-1])]; };

/* ======================= 2. End behavior ======================= */
const endTxt=(n,a)=>n%2?(a>0?["-∞","∞"]:["∞","-∞"]):(a>0?["∞","∞"]:["-∞","-∞"]);
const endWords=(n,a)=>n%2?(a>0?"falls to the left, rises to the right":"rises to the left, falls to the right"):(a>0?"both ends up":"both ends down");
function bEndStd(c){ const n=c.length-1, a=c[0], [L,R]=endTxt(n,a);
  return {title:"End behavior from standard form",q:`Describe the end behavior of f(x) = ${ps(c)}.`,
   g:{f:[{f:x=>ev(c,x)}],xr:[-2.5,2.5],cy:8,cap:`Degree ${n}, leading coefficient ${a}: ${endWords(n,a)}.`},
   steps:[`Leading term: ${ps([a,...Array(n).fill(0)])}. Degree ${n} is <b>${n%2?"odd":"even"}</b>; the leading coefficient ${a} is <b>${a>0?"positive":"negative"}</b>.`,`${n%2?"Odd":"Even"} and ${a>0?"positive":"negative"}: ${endWords(n,a)}.`,`<b>x → -∞: f(x) → ${L}</b> and <b>x → ∞: f(x) → ${R}</b>.`],
   tip:"Ignore every other term: they change the middle of the graph, not the ends."}; }
bEndStd.r=()=>{ const n=rnd(3,6), c=[nz(-3,3),...Array(n).fill(0)]; for(let i=0;i<2;i++) c[rnd(1,n)]=nz(-6,6); return [c]; };
function bEndFact(fs){ // fs: [[root, mult, flipped]]
  let c=[1], lc=1, deg=0; const parts=fs.map(([r,m,fl])=>{ const f=fl?[-1,r]:[1,-r]; for(let i=0;i<m;i++) c=mul(c,f); lc*=Math.pow(fl?-1:1,m); deg+=m; return `${fl?`(${r} - x)`:`(${ps([1,-r])})`}${m>1?"^"+m:""}`; });
  const [L,R]=endTxt(deg,lc);
  return {title:"End behavior from factored form",q:`Describe the end behavior of g(x) = ${parts.join("")}.`,
   g:gPoly(c,{zeros:fs.map(f=>f[0]),cap:`Degree ${deg}, leading coefficient ${lc}: ${endWords(deg,lc)}.`}),
   steps:[`Multiply the leading terms of the factors: ${fs.map(([r,m,fl])=>`(${fl?"-x":"x"})${m>1?"^"+m:""}`).join(" · ")} = <b>${ps([lc,...Array(deg).fill(0)])}</b>.`,`Degree ${deg} is ${deg%2?"odd":"even"} and the leading coefficient ${lc} is ${lc>0?"positive":"negative"}.`,`${endWords(deg,lc)[0].toUpperCase()+endWords(deg,lc).slice(1)}: <b>x → -∞: g(x) → ${L}</b>, <b>x → ∞: g(x) → ${R}</b>.`],
   tip:"A factor written as (c - x) has leading term -x. That one sign flips the end behavior."}; }
bEndFact.r=()=>{ const f=rnd(1,4), rs=distinct(2,-4,4,[f]); return [[[rs[0],pick([1,2]),0],[f,1,1],[rs[1],pick([1,2]),0]]]; };
function bBiquad(a,b){ const c=[1,0,-(a*a+b*b),0,a*a*b*b];
  return {title:"A quartic that opens up",q:`Describe h(x) = ${ps(c)} and find its zeros.`,
   g:gPoly(c,{zeros:[-b,-a,a,b],cap:"Even degree, positive leading coefficient: both ends up."}),
   steps:["Leading term x^4: even degree, positive → <b>both ends up</b>.",`Factor like a quadratic in x^2: (x^2 - ${a*a})(x^2 - ${b*b}) = (x - ${a})(x + ${a})(x - ${b})(x + ${b}).`,`Zeros: <b>x = ±${a} and x = ±${b}</b>. The function is even, so the graph is symmetric about the y-axis.`],
   rows:[["End behavior","x → ±∞: h(x) → ∞"],["Zeros",`-${b}, -${a}, ${a}, ${b}`],["y-intercept",`(0, ${a*a*b*b})`]]}; }
bBiquad.r=()=>{ const [a,b]=distinct(2,1,3).sort(); return [a,b]; };

/* ======================= 3. Zeros & multiplicity ======================= */
function bSketch(zs,lc,title){ let c=[lc]; zs.forEach(([r,m])=>{ for(let i=0;i<m;i++) c=mul(c,[1,-r]); }); const deg=zs.reduce((s,z)=>s+z[1],0), y0=ev(c,0);
  const fx=`${lc===1?"":lc===-1?"-":lc}${zs.map(([r,m])=>r===0?`x${m>1?"^"+m:""}`:`(${ps([1,-r])})${m>1?"^"+m:""}`).join("")}`;
  const beh=m=>m%2?(m>=3?"<b>crosses and flattens</b> (like y = x^3)":"<b>crosses</b>"):"<b>touches and bounces</b>";
  return {title:title||"Sketch from factored form",q:`Sketch f(x) = ${fx}.`,
   g:gPoly(c,{zeros:zs.map(z=>z[0]),cap:zs.map(([r,m])=>`${m%2?"crosses":"touches"} at ${r}`).join("; ")+"."}),
   steps:[`Degree ${zs.map(z=>z[1]).join(" + ")} = ${deg}, leading coefficient ${lc} → <b>${endWords(deg,lc)}</b>.`,...zs.map(([r,m])=>`x = ${r}: multiplicity ${m} → ${beh(m)}.`),`y-intercept: f(0) = <b>${y0}</b>.`,`Standard form: ${ps(c)}.`],
   rows:[["Zeros",zs.map(([r,m])=>`${r} (mult. ${m})`).join(", ")],["End behavior",endWords(deg,lc)],["y-intercept",`(0, ${y0})`]],
   tip:"Odd multiplicity crosses (even 3 or 5), even multiplicity touches."}; }
bSketch.r=()=>{ const rs=distinct(3,-4,4); return [[[rs[0],1],[rs[1],2],[rs[2],1]].sort((a,b)=>a[0]-b[0]),pick([1,-1])]; };
const bFlat=(zs,lc)=>bSketch(zs,lc,"A flattened zero: multiplicity 3");
bFlat.r=()=>{ const a=nz(-3,3); return [[[0,1],[a,3]].sort((x,y)=>x[0]-y[0]),pick([1,-1])]; };
function bFromGraph(cr,to,a){ const c=mul([a],mul([1,-cr],[1,-2*to,to*to])), y0=ev(c,0), k=(-cr)*to*to;
  return {title:"Write the equation from a graph",q:`A degree-3 polynomial crosses the x-axis at x = ${cr}, touches it at x = ${to}, and passes through (0, ${y0}). Find f(x).`,
   g:gPoly(c,{zeros:[cr,to],cap:`f(x) = ${a}(x ${cr<0?"+":"-"} ${Math.abs(cr)})(x ${to<0?"+":"-"} ${Math.abs(to)})²`.replace(/^f\(x\) = 1\(/,"f(x) = (").replace(/= -1\(/,"= −(")}),
   steps:[`Crosses at ${cr} → factor ${fac(cr)}. Touches at ${to} → factor ${fac(to)}^2.`,`f(x) = a${fac(cr)}${fac(to)}^2. The degree is 1 + 2 = 3 ✓.`,`Use the point (0, ${y0}): a(${-cr})(${sq(-to)})^2 = ${y0} → ${k}a = ${y0} → <b>a = ${a}</b>.`,`<b>f(x) = ${a===1?"":a===-1?"-":a}${fac(cr)}${fac(to)}^2</b> = ${ps(c)}.`],
   tip:"Don't forget the stretch factor a. Find it from one more point on the graph."}; }
bFromGraph.r=()=>{ const [cr,to]=distinct(2,-3,3); return [cr,to,pick([-2,-1,1,2,3])]; };
function bZerosFact(a,type){ const c=type===0?mul([1,0],[1,-2*a,a*a]):type===1?[1,-a,0,0]:mul([1,0],[1,0,-a*a]);
  const steps=type===0?[`Factor out the GCF x: x(${ps([1,-2*a,a*a])}).`,`Perfect square trinomial: x(${ps([1,-a])})^2.`,`Zeros: <b>x = 0</b> (multiplicity 1, crosses) and <b>x = ${a}</b> (multiplicity 2, touches).`]
   :type===1?[`Factor out the GCF x^2: x^2(${ps([1,-a])}).`,`Zeros: <b>x = 0</b> (multiplicity 2, touches) and <b>x = ${a}</b> (multiplicity 1, crosses).`]
   :[`Factor out the GCF x: x(${ps([1,0,-a*a])}).`,`Difference of squares: x(x - ${Math.abs(a)})(x + ${Math.abs(a)}).`,`Zeros: <b>x = 0, ${Math.abs(a)}, ${-Math.abs(a)}</b>, each multiplicity 1 (crosses).`];
  return {title:"Zeros of a factorable polynomial",q:`Find the zeros of f(x) = ${ps(c)} and state their multiplicities.`,
   g:gPoly(c,{zeros:type===2?[0,a,-a]:[0,a]}),steps:[...steps,"The multiplicities add up to 3, the degree ✓."]}; }
bZerosFact.r=()=>[nz(-3,3),rnd(0,2)];

/* ======================= 4. Division & Remainder Theorem ======================= */
function bSynth(c,k){ const s=synth(c,k);
  return {title:"Synthetic division, step by step",q:`Divide ${ps(c)} by ${ps([1,-k])}.`,pre:synthHTML(c,k,synthWords(c,k)),
   steps:[`Use c = ${k} (from ${ps([1,-k])}). Coefficients: ${c.map(v=>v?t(v):"<b>0</b>").join(", ")}${c.includes(0)?". The 0 holds the place of the missing power":""}.`,`The bottom row gives the quotient <b>${ps(s.q)}</b> and the remainder <b>${s.rem}</b>.`,`${ps(c)} = (${ps([1,-k])})(${ps(s.q)})${s.rem?(s.rem>0?" + ":" - ")+Math.abs(s.rem):""}.`,`Check with the Remainder Theorem: f(${k}) = ${ev(c,k)} ✓.`],
   tip:"Forgetting the 0 for a missing power is the most common synthetic-division mistake."}; }
bSynth.r=()=>{ const c=[rnd(1,3),rnd(-5,5),rnd(-6,6),rnd(-9,9)]; c[rnd(1,2)]=0; return [c,nz(-3,3)]; };
function bLongDiv(n,d){ const L=longDiv(n,d);
  return {title:"Long division by a quadratic",q:`Divide ${ps(n)} by ${ps(d)}.`,
   steps:[...L.steps,`Quotient <b>${ps(L.q)}</b>, remainder <b>${ps(L.r)}</b>.`,`So ${ps(n)} = (${ps(d)})(${ps(L.q)}) + (${ps(L.r)}).`],
   tip:"Synthetic division only works for x - c. For a quadratic divisor, use long division, and write any missing power with a 0."}; }
bLongDiv.r=()=>[[rnd(1,3),rnd(-4,4),rnd(-8,8),rnd(-6,6),rnd(-6,6)],[1,rnd(-2,2),nz(-3,3)]];
function bEvalRem(c,k){ const s=synth(c,k), tm=powTerms(c);
  return {title:"Use the Remainder Theorem to evaluate",q:`Find f(${k}) for f(x) = ${ps(c)}.`,pre:synthHTML(c,k,`The remainder is ${s.rem}, so f(${k}) = ${s.rem}.`),
   steps:[`Coefficients with zeros for the missing powers: ${c.join(", ")}.`,`Synthetic division by ${k} gives remainder <b>${s.rem}</b>.`,`Direct check: ${tm.map(([a,p])=>p?`${a}(${Math.pow(k,p)})`:`${a}`).join(" + ").replace(/\+ -/g,"- ")} = <b>${ev(c,k)}</b> ✓.`],
   tip:"For large powers, synthetic division avoids big powers like (-2)^5 and is less error-prone."}; }
bEvalRem.r=()=>[[nz(-3,3),0,nz(-4,4),0,nz(-3,3),rnd(-9,9)],pick([-2,-1,2])];
function bFindK(c,pos,r,label){ const p=c.length-1-pos, known=c.map((v,i)=>i===pos?0:v), K=c[pos], R=ev(c,r), m=Math.pow(r,p), kv=ev(known,r), show=c.map((v,i)=>i===pos?"k":v);
  const fk=show.map((v,i)=>{ const pw=c.length-1-i; if(v===0) return ""; const vv=pw===0?"":pw===1?"x":`x^${pw}`; return v==="k"?`k${vv}`:`${v}${vv}`; }).filter(Boolean).join(" + ").replace(/\+ -/g,"- ").replace(/(^|[ +-])1x/g,"$1x");
  return {title:label?"Find k so that it is a factor":"Find k from a given remainder",q:label?`Find k so that ${ps([1,-r])} is a factor of ${fk}.`:`When ${fk} is divided by ${ps([1,-r])}, the remainder is ${R}. Find k.`,
   steps:[label?`Factor Theorem: f(${r}) = 0.`:`By the Remainder Theorem, f(${r}) = ${R}.`,`f(${r}) = ${kv}${m===1?" + k":m===-1?" - k":(m>0?" + ":" - ")+Math.abs(m)+"k"}.`,`${kv}${m===1?" + k":m===-1?" - k":(m>0?" + ":" - ")+Math.abs(m)+"k"} = ${R} → ${m===1?"k":m===-1?"-k":m+"k"} = ${R-kv} → <b>k = ${t(K)}</b>.`,`Check: f(x) = ${ps(c)}, f(${r}) = ${R} ✓.`]}; }
bFindK.r=()=>{ const c=[1,rnd(-5,5),rnd(-6,6),rnd(-9,9)]; const pos=rnd(1,2); c[pos]=nz(-5,5); return [c,pos,nz(-3,3)]; };
const bFindKf=(c,pos,r)=>bFindK(c,pos,r,1);
bFindKf.r=()=>{ const r=nz(-2,2), c=[1,rnd(-4,4),0,nz(-4,4),rnd(-6,6)], pos=rnd(1,3); c[pos]=0; c[c.length-1]=-ev(c,r)+c[c.length-1]; const K=nz(-5,5); c[pos]=K; c[c.length-1]-=K*Math.pow(r,c.length-1-pos); return [c,pos,r]; };
function bTwoCond(a,b,r1,r2,d){ const f=[1,a,b,d], R1=ev(f,r1);
  const e1=[r1*r1,r1,R1-d-r1**3], e2=[r2*r2,r2,-d-r2**3];
  return {title:"Two conditions, two unknowns",q:`f(x) = x^3 + ax^2 + bx ${d<0?"- "+(-d):"+ "+d} has remainder ${R1} when divided by ${ps([1,-r1])}, and ${ps([1,-r2])} is a factor. Find a and b.`,
   steps:[`Remainder Theorem: f(${r1}) = ${r1**3} + ${e1[0]}a ${r1<0?"- "+(-r1):"+ "+r1}b ${d<0?"- "+(-d):"+ "+d} = ${R1} → <b>${e1[0]}a ${r1<0?"- "+(-r1):"+ "+r1}b = ${e1[2]}</b>.`.replace("+ 1b","+ b").replace("- 1b","- b").replace(/ 1a/," a"),
     `Factor Theorem: f(${r2}) = 0 → ${r2**3} + ${e2[0]}a ${r2<0?"- "+(-r2):"+ "+r2}b ${d<0?"- "+(-d):"+ "+d} = 0 → <b>${e2[0]}a ${r2<0?"- "+(-r2):"+ "+r2}b = ${e2[2]}</b>.`.replace("+ 1b","+ b").replace("- 1b","- b").replace(/ 1a/," a"),
     `Solve the system (elimination or substitution): <b>a = ${a}</b>, <b>b = ${b}</b>.`,`f(x) = ${ps(f)}. Check: f(${r1}) = ${R1} ✓, f(${r2}) = ${ev(f,r2)} ✓.`],
   tip:`“${ps([1,-r2])} is a factor” means f(${r2}) = 0, not f(${-r2}) = 0.`}; }
bTwoCond.r=()=>{ const a=rnd(-4,4), b=rnd(-6,6), [r1,r2]=distinct(2,-3,3); const d=-(r2**3+a*r2*r2+b*r2); return [a,b,r1,r2,d]; };
function bDiv2(c,A,B){ const r=B/A, s=synth(c,r);
  return {title:`Dividing by ${ps([A,-B])}`,q:`Find the remainder and quotient when ${ps(c)} is divided by ${ps([A,-B])}.`,pre:synthHTML(c,r,`Divide the bottom row (except the remainder) by ${A}: quotient ${ps(s.q.map(v=>v/A))}.`),
   steps:[`${ps([A,-B])} = 0 at x = ${t(r)}, so the remainder is f(${t(r)}) = <b>${t(ev(c,r))}</b>.`,`Synthetic division by ${t(r)} gives ${ps(s.q)}, which is the quotient for x ${r<0?"+":"-"} ${t(Math.abs(r))}.`,`Since ${ps([A,-B])} = ${A}(x ${r<0?"+":"-"} ${t(Math.abs(r))}), divide that by ${A}: quotient <b>${ps(s.q.map(v=>v/A))}</b>, remainder <b>${t(s.rem)}</b>.`]}; }
bDiv2.r=()=>{ const A=pick([2,3]); let B; do{ B=nz(-3,3); }while(gcd(A,B)!==1); return [[A*rnd(1,2),rnd(-4,4),rnd(-6,6),rnd(-5,5)],A,B]; };
function bRemQuad(r1,r2,p,q){ const v1=p*r1+q, v2=p*r2+q;
  return {title:"Honors: remainder when dividing by a quadratic",q:`f(${r1}) = ${v1} and f(${r2}) = ${v2}. Find the remainder when f(x) is divided by ${fac(r1)}${fac(r2)}.`,
   steps:["The divisor has degree 2, so the remainder has degree at most 1: r(x) = px + q.",`f(x) = ${fac(r1)}${fac(r2)}Q(x) + px + q.`,`x = ${r1}: ${r1}p + q = ${v1}. x = ${r2}: ${r2}p + q = ${v2}.`.replace(/ 1p/g," p").replace(/ -1p/g," -p"),`Subtract: ${r1-r2}p = ${v1-v2} → p = ${p}, then q = ${q}.`,`<b>Remainder: ${ps([p,q])}</b>.`],
   tip:"Plugging in the zeros of the divisor makes the Q(x) part vanish."}; }
bRemQuad.r=()=>{ const [r1,r2]=distinct(2,-3,3); return [r1,r2,nz(-4,4),rnd(-5,5)]; };

/* ======================= 5. Factor Theorem ======================= */
function bFacComp(rs){ const c=rs.reduce((p,r)=>mul(p,[1,-r]),[1]), k=rs[0], q=synth(c,k).q;
  return {title:"Is it a factor? Then factor completely",q:`Show that ${ps([1,-k])} is a factor of ${ps(c)}, then factor completely.`,pre:synthHTML(c,k,`Remainder 0 → ${ps([1,-k])} is a factor.`),
   g:gPoly(c,{zeros:rs,cap:`Zeros ${[...rs].sort((a,b)=>a-b).join(", ")}.`}),
   steps:[`${ps([1,-k])} = x - (${k}), so test c = ${k}: f(${k}) = ${ev(c,k)} ✓.`,`Depressed polynomial: ${ps(q)}.`,`Factor it: ${ps(q)} = ${fac(rs[1])}${fac(rs[2])}.`,`<b>f(x) = ${rs.map(fac).join("")}</b>; zeros ${rs.join(", ")}.`]}; }
bFacComp.r=()=>[distinct(3,-4,4)];
function bFacRat(k,fr_,m){ const c=prodC([k,fr_,m]), q=synth(c,k).q;
  return {title:"Factor with a rational zero",q:`Given that ${ps([1,-k])} is a factor, factor ${ps(c)} completely.`,pre:synthHTML(c,k,"Remainder 0 ✓"),
   g:gPoly(c,{zeros:[k,fr_,m],cap:`Zeros ${[k,fr_,m].sort((a,b)=>a-b).map(tl).join(", ")}.`}),
   steps:[`Divide by ${ps([1,-k])}: quotient ${ps(q)}.`,`Factor the quadratic (ac method): ${ps(q)} = ${fac(fr_)}${fac(m)}.`,`<b>f(x) = ${fac(k)}${fac(fr_)}${fac(m)}</b>; zeros ${k}, ${t(fr_)}, ${m}.`]}; }
bFacRat.r=()=>{ const [k,m]=distinct(2,-3,3), q=pick([2,3]); let p; do{ p=nz(-3,3); }while(gcd(p,q)!==1); return [k,p/q,m]; };
function bTwoFac(a,b){ const c=[1,0,-(a*a+b*b),0,a*a*b*b], q1=synth(c,a).q, q2=synth(q1,-a).q;
  return {title:"Two known factors: divide twice",q:`Show that x - ${a} and x + ${a} are factors of ${ps(c)} and find the remaining factors.`,pre:synthHTML(c,a,"Remainder 0")+synthHTML(q1,-a,"Remainder 0"),
   steps:[`Divide by x - ${a} (c = ${a}): quotient ${ps(q1)}.`,`Divide that by x + ${a} (c = -${a}): quotient <b>${ps(q2)}</b>.`,`${ps(q2)} = (x - ${b})(x + ${b}).`,`<b>f(x) = (x - ${a})(x + ${a})(x - ${b})(x + ${b})</b>.`],
   tip:"Divide the quotient the second time, not the original polynomial."}; }
bTwoFac.r=()=>{ const [a,b]=distinct(2,1,4); return [a,b]; };
function bRepeat(a,b){ const c=mul([1,-2*a,a*a],[1,-b]), q=synth(c,a).q;
  return {title:"Find a repeated zero",q:`Factor f(x) = ${ps(c)} completely.`,pre:synthHTML(c,a,"Remainder 0"),
   g:gPoly(c,{zeros:[a,b],cap:`Touches at ${a} (double zero), crosses at ${b}.`}),
   steps:[`Try c = ${a}: f(${a}) = 0, so ${ps([1,-a])} is a factor.`,`Quotient: ${ps(q)} = ${fac(a)}${fac(b)}.`,`<b>f(x) = ${fac(a)}^2${fac(b)}</b>: x = ${a} is a double zero (the graph touches), x = ${b} is simple (it crosses).`]}; }
bRepeat.r=()=>{ const [a,b]=distinct(2,-3,3); return [a,b]; };

/* ======================= 6. Rational zeros ======================= */
function bRatAll(fr_,r1,r2){ const c=prodC([fr_,r1,r2]), cs=cands(c), tried=[]; let found=null;
  for(const v of [...cs.filter(v=>Math.abs(v-Math.round(v))<1e-9)].flatMap(v=>[v,-v]).sort((a,b)=>Math.abs(a)-Math.abs(b)||b-a)){ const y=ev(c,v); tried.push(`f(${v}) = ${t(y)}`); if(Math.abs(y)<1e-9){ found=v; break; } }
  const q=synth(c,found).q, others=[fr_,r1,r2].filter(z=>Math.abs(z-found)>1e-9);
  return {title:"List the candidates and find all zeros",q:`Find all zeros of f(x) = ${ps(c)}.`,pre:synthHTML(c,found,`f(${found}) = 0 ✓`),
   g:gPoly(c,{zeros:[fr_,r1,r2],cap:`Zeros ${[fr_,r1,r2].sort((a,b)=>a-b).map(tl).join(", ")}.`}),
   steps:[`p (factors of ${Math.abs(c[3])}): ${divs(Math.abs(c[3])).join(", ")}. q (factors of ${Math.abs(c[0])}): ${divs(Math.abs(c[0])).join(", ")}.`,`Candidates: <b>${candTxt(c)}</b>.`,`Test integers first: ${tried.join(", ")}${found!==null?" ✓":""}.`,`Depressed polynomial: ${ps(q)} = ${others.map(fac).join("")}.`,`<b>Zeros: ${[found,...others].map(t).join(", ")}</b>.`],
   tip:"Divide p by q, not q by p: the constant term goes on top."}; }
bRatAll.r=()=>{ const q=pick([2,3]); let p; do{ p=nz(-3,3); }while(gcd(p,q)!==1); const [a,b]=distinct(2,-3,3); return [p/q,a,b]; };
function bRatIrr(r,k){ const c=mul([1,-r],[1,0,-k]), cs=cands(c).flatMap(v=>[v,-v]).sort((a,b)=>Math.abs(a)-Math.abs(b)||b-a), tried=[];
  for(const v of cs){ const y=ev(c,v); tried.push(`f(${v}) = ${y}`); if(Math.abs(y)<1e-9) break; }
  return {title:"Rational and irrational zeros",q:`Find all zeros of f(x) = ${ps(c)}.`,pre:synthHTML(c,r,`f(${r}) = 0 ✓`),
   g:gPoly(c,{zeros:[r,Math.sqrt(k),-Math.sqrt(k)],zl:{[Math.sqrt(k)]:`(√${k}, 0)`,[-Math.sqrt(k)]:`(−√${k}, 0)`},cap:`Zeros ${r} and ±√${k} ≈ ±${Math.sqrt(k).toFixed(3)}.`}),
   steps:[`Candidates: ${candTxt(c)}.`,`Test: ${tried.join(", ")} ✓.`,`Depressed polynomial: ${ps(synth(c,r).q)}.`,`x^2 - ${k} = 0 → x = ±√${k} (irrational: not on the candidate list, which is expected).`,`<b>Zeros: ${r}, √${k}, -√${k}</b>. (Grouping also works: x^2(${ps([1,-r])}) - ${k}(${ps([1,-r])}).)`]}; }
bRatIrr.r=()=>[nz(-3,3),pick([2,3,5,6,7])];
function bQuartic(i1,f1,f2){ const rs=[i1,-i1,f1,f2], c=prodC(rs), q1=synth(c,i1).q, q2=synth(q1,-i1).q;
  return {title:"A quartic with Descartes' Rule of Signs",q:`Find all zeros of f(x) = ${ps(c)}.`,pre:synthHTML(c,i1,`f(${i1}) = 0 ✓`)+synthHTML(q1,-i1,`f(${-i1}) = 0 ✓`),
   g:gPoly(c,{zeros:rs,cap:`Zeros ${[...rs].sort((a,b)=>a-b).map(tl).join(", ")}.`}),
   steps:[`Sign changes in f(x): ${signs(c)} → <b>${signs(c)}${signs(c)>1?` or ${signs(c)-2}`:""} positive zero(s)</b>.`,`f(-x) = ${ps(neg(c))}: ${signs(neg(c))} changes → <b>${signs(neg(c))}${signs(neg(c))>1?` or ${signs(neg(c))-2}`:""} negative zero(s)</b>.`,`Candidates: ${candTxt(c)}. Start with integers: f(${i1}) = 0 ✓.`,`Divide by ${ps([1,-i1])}: ${ps(q1)}. Then by ${ps([1,i1])}: <b>${ps(q2)}</b>.`,`${ps(q2)} = ${fac(f1)}${fac(f2)} → x = ${t(f1)}, x = ${t(f2)}.`,`<b>Zeros: ${rs.map(t).join(", ")}</b>, consistent with Descartes.`]}; }
bQuartic.r=()=>{ const i1=rnd(1,3); let f1,f2; do{ f1=nz(-3,3)/pick([2,3]); f2=nz(-3,3)/pick([2,3]); }while(Math.abs(f1-f2)<1e-9||[f1,f2].some(v=>Math.abs(Math.abs(v)-i1)<1e-9)||!fr(f1)||!fr(f2)); return [i1,f1,f2]; };
function bBounds(rs){ const c=rs.reduce((p,r)=>mul(p,[1,-r]),[1]); let U=1; while(synth(c,U).res.some(v=>v<0)) U++;
  let L=-1; const alt=row=>{ let s=0; return row.every(v=>{ if(v===0) return true; const g=Math.sign(v); const ok=!s||g!==s; s=g; return ok; }); }; while(!alt(synth(c,L).res)) L--;
  return {title:"Honors: upper and lower bounds",q:`Show that every real zero of f(x) = ${ps(c)} lies from ${L} to ${U}.`,
   pre:synthHTML(c,U,`Bottom row ${synth(c,U).res.join(", ")}: no negatives → ${U} is an upper bound`)+synthHTML(c,L,`Bottom row ${synth(c,L).res.join(", ")}: alternating signs → ${L} is a lower bound`),
   steps:[`Upper bound test (c = ${U} > 0): the bottom row has no negative numbers, so no zero is greater than ${U}.`,`Lower bound test (c = ${L} < 0): the bottom row alternates in sign, so no zero is less than ${L}.`,`So all real zeros are in [${L}, ${U}]. In fact f(x) = ${rs.map(fac).join("")}, with zeros ${rs.join(", ")} ✓.`],
   tip:"Bounds shorten the candidate list: skip any candidate outside them."}; }
bBounds.r=()=>[distinct(3,-3,4)];

/* ======================= 7. Imaginary zeros ======================= */
const iz=(k)=>{ const s=Math.sqrt(k); return Math.abs(s-Math.round(s))<1e-9?(s===1?"i":`${s}i`):`i√${k}`; };
function bImgCubic(r,k){ const c=[1,-r,k,-r*k];
  return {title:"Real and imaginary zeros of a cubic",q:`Find all zeros of f(x) = ${ps(c)}.`,
   g:gPoly(c,{zeros:[r],cap:`Only one x-intercept: the zeros ±${iz(k)} are imaginary and do not show on the graph.`}),
   steps:[`Group: x^2(${ps([1,-r])}) + ${k}(${ps([1,-r])}) = (${ps([1,-r])})(x^2 + ${k}).`,`${ps([1,-r])} = 0 → <b>x = ${r}</b>.`,`x^2 + ${k} = 0 → x^2 = -${k} → <b>x = ±${iz(k)}</b>.`,"3 zeros for degree 3 ✓: one real (the x-intercept), two imaginary (a conjugate pair)."]}; }
bImgCubic.r=()=>[nz(-3,3),pick([1,4,9,2,3,5])];
const cz=(a,b,s)=>`${a?a+" "+(s<0?"-":"+")+" ":s<0?"-":""}${b===1?"":b}i`;
function bGivenC(a,b,r){ const q=[1,-2*a,a*a+b*b], c=mul([1,-r],q);
  return {title:"Given one imaginary zero, find the rest",q:`${cz(a,b,1)} is a zero of f(x) = ${ps(c)}. Find all zeros.`,
   g:gPoly(c,{zeros:[r],cap:`The only x-intercept is ${r}.`}),
   steps:[`Conjugate theorem: <b>${cz(a,b,-1)}</b> is also a zero.`,`Multiply the pair: (x - ${a?a:""})^2 - (${b===1?"":b}i)^2 = <b>${ps(q)}</b>.`.replace("(x - )^2","x^2"),`Divide: (${ps(c)}) ÷ (${ps(q)}) = <b>${ps([1,-r])}</b> (check: (${ps([1,-r])})(${ps(q)}) = ${ps(c)} ✓).`,`<b>Zeros: ${r}, ${cz(a,b,1)}, ${cz(a,b,-1)}</b>.`],
   tip:"Multiply the conjugate pair first: it gives a quadratic with real coefficients, which is easy to divide by."}; }
bGivenC.r=()=>[rnd(-2,3),rnd(1,3),nz(-3,3)];
function bWriteC(r,a,b){ const q=[1,-2*a,a*a+b*b], c=mul([1,-r],q);
  return {title:"Write a polynomial from imaginary zeros",q:`Write the polynomial of least degree with real coefficients, leading coefficient 1, and zeros ${r} and ${cz(a,b,-1)}.`,
   steps:[`Real coefficients → <b>${cz(a,b,1)}</b> is also a zero. Least degree = 3.`,`(x - (${cz(a,b,-1)}))(x - (${cz(a,b,1)})) = x^2 - ${2*a}x + (${a*a} + ${b*b}) = ${ps(q)}.`.replace("x^2 - 0x + ","x^2 + ").replace("- -","+ "),`(${ps([1,-r])})(${ps(q)}) = <b>${ps(c)}</b>.`],
   tip:"Without the conjugate, the coefficients would not be real."}; }
bWriteC.r=()=>[nz(-3,3),rnd(-2,3),rnd(1,3)];
function bWriteI(r,a,k){ const q=[1,-2*a,a*a-k], c=mul([1,-r],q), z=s=>`${a?a+" "+(s>0?"+":"-")+" ":s>0?"":"-"}√${k}`;
  return {title:"Write a polynomial from irrational zeros",q:`Write the polynomial of least degree with rational coefficients, leading coefficient 1, and zeros ${r} and ${z(1)}.`,
   steps:[`Rational coefficients → <b>${z(-1)}</b> is also a zero.`,`(x - (${z(1)}))(x - (${z(-1)})) = ${a?`(x - ${a})^2 - ${k}`:`x^2 - ${k}`} = ${ps(q)}.`,`(${ps([1,-r])})(${ps(q)}) = <b>${ps(c)}</b>.`]}; }
bWriteI.r=()=>[nz(-3,3),rnd(-2,2),pick([2,3,5,7])];
function bBiImag(a,b){ const c1=[1,0,0,0,-(a**4)], c2=[1,0,b*b-a*a,0,-(a*a*b*b)];
  return {title:"Quartics that factor like quadratics",q:`Find all zeros of ${ps(c1)} and of ${ps(c2)}.`,
   g:{f:[{f:x=>ev(c1,x)},{f:x=>ev(c2,x),dash:true}],p:[[a,0,`(${a}, 0)`],[-a,0,`(−${a}, 0)`]],xr:[-a-1.5,a+1.5],cy:30,cap:`Both cross the x-axis only at ±${a}; the imaginary zeros don't show.`},
   steps:[`${ps(c1)} = (x^2 - ${a*a})(x^2 + ${a*a}) → x = ±${a} and x^2 = -${a*a} → <b>±${a}, ±${iz(a*a)}</b>.`,`${ps(c2)} = (x^2 + ${b*b})(x^2 - ${a*a}) → x = ±${a} and x^2 = -${b*b} → <b>±${a}, ±${iz(b*b)}</b>.`,"Each has 4 zeros: 2 real and 2 imaginary."]}; }
bBiImag.r=()=>{ const [a,b]=distinct(2,1,3); return [a,b]; };
function bNoReal(s,a,b){ const q=[1,-2*a,a*a+b*b], c=mul([1,0,s*s],q);
  return {title:"No real zeros at all",q:`${iz(s*s)} is a zero of f(x) = ${ps(c)}. Find all zeros.`,
   g:gPoly(c,{zeros:[],xr:[a-3,a+3],cap:"The graph never touches the x-axis: all 4 zeros are imaginary."}),
   steps:[`Conjugate: -${iz(s*s)} is also a zero → (x - ${iz(s*s)})(x + ${iz(s*s)}) = <b>x^2 + ${s*s}</b> is a factor.`,`Divide: (${ps(c)}) ÷ (x^2 + ${s*s}) = <b>${ps(q)}</b>.`,`Quadratic formula: x = {{${2*a} ± √(${4*a*a} - ${4*(a*a+b*b)})|2}} = {{${2*a} ± ${2*b}i|2}} = <b>${cz(a,b,1).replace("+","±")}</b>.`,`<b>Zeros: ±${iz(s*s)}, ${cz(a,b,1)}, ${cz(a,b,-1)}</b>. There are no x-intercepts.`]}; }
bNoReal.r=()=>[rnd(1,3),rnd(-2,2),rnd(1,3)];
function bCount(n,k){ return {title:"Counting real and imaginary zeros",q:`A degree-${n} polynomial with real coefficients crosses the x-axis at exactly ${k} points, each a simple zero. How many imaginary zeros does it have?`,
   steps:[`FTA: ${n} zeros in total.`,`${k} are real (the crossings).`,`${n} - ${k} = <b>${n-k} imaginary zeros</b>${n-k?` (${(n-k)/2} conjugate pair${n-k>2?"s":""})`:""}.`,`Possible counts of real zeros for degree ${n}: ${Array.from({length:Math.floor(n/2)+1},(_,i)=>n-2*i).join(", ")}. Imaginary zeros come in pairs, so the count always has the same parity as ${n}.`]}; }
bCount.r=()=>{ const n=rnd(3,7); return [n,n-2*rnd(0,Math.floor(n/2))]; };

/* ======================= 8. Approximating zeros ======================= */
function bisect(c,a,b,n){ const rows=[]; for(let i=0;i<n;i++){ const m=(a+b)/2, fm=ev(c,m); rows.push([a,b,m,fm]); if(ev(c,a)*fm<=0) b=m; else a=m; } return {rows,a,b}; }
const root=(c,a,b)=>{ for(let i=0;i<80;i++){ const m=(a+b)/2; if(ev(c,a)*ev(c,m)<=0) b=m; else a=m; } return (a+b)/2; };
const f4=v=>+v.toFixed(4);
function bBisect(c,k){ const B=bisect(c,k,k+1,7), r=root(c,k,k+1);
  const tab=`<table class="el-kf ptab"><tr><th>Step</th><th>a</th><th>b</th><th>midpoint m</th><th>f(m)</th></tr>${B.rows.map((x,i)=>`<tr><td>${i+1}</td><td>${f4(x[0])}</td><td>${f4(x[1])}</td><td>${f4(x[2])}</td><td>${x[3]>0?"+":"−"}${Math.abs(x[3]).toFixed(3)}</td></tr>`).join("")}</table>`;
  return {title:`Locate and bisect: ${ps(c)}`,q:`Show that f(x) = ${ps(c)} has a zero between ${k} and ${k+1}, and approximate it to two decimal places.`,
   g:gPoly(c,{zeros:[],p:[[r,0,`(≈${r.toFixed(3)}, 0)`],[k,ev(c,k),`(${k}, ${ev(c,k)})`],[k+1,ev(c,k+1),`(${k+1}, ${ev(c,k+1)})`]],xr:[Math.min(k-2,-2.5),Math.max(k+2,2.5)],cap:`f(${k}) and f(${k+1}) have opposite signs: the graph must cross between them.`}),post:tab,
   steps:[`f(${k}) = <b>${ev(c,k)}</b> and f(${k+1}) = <b>${ev(c,k+1)}</b>. The signs are opposite, so there is a zero between ${k} and ${k+1} (Location Principle).`,`Bisect: f(${k+.5}) = ${ev(c,k+.5).toFixed(3)}, so the zero is in [${ev(c,k)*ev(c,k+.5)<=0?k+", "+(k+.5):(k+.5)+", "+(k+1)}]. Keep halving (table below).`,`After 7 steps the zero is in [${f4(B.a)}, ${f4(B.b)}], so <b>x ≈ ${r.toFixed(2)}</b> (more precisely ${r.toFixed(4)}).`]}; }
bBisect.r=()=>{ for(;;){ const c=[1,0,rnd(-6,-1),rnd(-7,7)]; for(let k=-3;k<=3;k++){ const a=ev(c,k), b=ev(c,k+1); if(a*b<0&&Math.abs(root(c,k,k+1)-Math.round(root(c,k,k+1)*10)/10)>0.01) return [c,k]; } } };
function bTable(c){ const tab=[-3,-2,-1,0,1,2,3].map(x=>[x,ev(c,x)]), iv=[]; for(let i=0;i<tab.length-1;i++) if(tab[i][1]*tab[i+1][1]<0) iv.push([tab[i][0],tab[i+1][0]]); const rs=iv.map(([a,b])=>root(c,a,b));
  return {title:"Use a table to find every real zero",q:`Locate all real zeros of f(x) = ${ps(c)} between consecutive integers, then approximate them.`,
   g:gPoly(c,{zeros:[],p:rs.map(r=>[r,0,`(${r.toFixed(2)}, 0)`]),xr:[-3.4,3.4],cy:10,cap:`${rs.length} real zero${rs.length===1?"":"s"}.`}),
   pre:`<table class="el-kf ptab"><tr><th>x</th>${tab.map(r=>`<td>${r[0]}</td>`).join("")}</tr><tr><th>f(x)</th>${tab.map(r=>`<td>${r[1]}</td>`).join("")}</tr></table>`,
   steps:[`Sign changes: ${iv.map(([a,b])=>`between ${a} and ${b}`).join("; ")}.`,`That gives ${iv.length} real zero${iv.length===1?"":"s"} (at most ${c.length-1} for degree ${c.length-1}).`,`Approximations (bisection or a calculator): <b>${rs.map(r=>r.toFixed(2)).join(", ")}</b>.`],
   tip:"Two zeros between the same two integers can hide, because the signs might not change there. Check the graph or test the midpoints."}; }
bTable.r=()=>{ for(;;){ const c=[1,0,rnd(-6,-2),rnd(-3,3),rnd(-2,3)]; const tab=[-3,-2,-1,0,1,2,3].map(x=>ev(c,x)); if(tab.includes(0)) continue; let n=0; for(let i=0;i<6;i++) if(tab[i]*tab[i+1]<0) n++; if(n>=2) return [c]; } };
function bTenths(c,k){ const r=root(c,k,k+1), xs=[k,k+.5,Math.floor(r*10)/10,Math.floor(r*10)/10+.1,k+1].map(v=>+v.toFixed(1)).filter((v,i,a)=>a.indexOf(v)===i).sort((a,b)=>a-b), lo=Math.floor(r*10)/10, mid=lo+.05;
  return {title:"Zoom in by tenths",q:`Find the real zero of f(x) = ${ps(c)} to the nearest tenth.`,
   pre:`<table class="el-kf ptab"><tr><th>x</th>${xs.map(x=>`<td>${x}</td>`).join("")}</tr><tr><th>f(x)</th>${xs.map(x=>`<td>${+ev(c,x).toFixed(3)}</td>`).join("")}</tr></table>`,
   g:gPoly(c,{zeros:[],p:[[r,0,`(≈${r.toFixed(3)}, 0)`]],xr:[Math.min(-1.5,k-1),Math.max(2.5,k+2)],cy:6}),
   steps:[`f(${k}) = ${ev(c,k)} and f(${k+1}) = ${ev(c,k+1)} → a zero between ${k} and ${k+1}.`,`Tenths: f(${+lo.toFixed(1)}) = ${+ev(c,lo).toFixed(3)} and f(${+(lo+.1).toFixed(1)}) = ${+ev(c,lo+.1).toFixed(3)} → the zero is between ${+lo.toFixed(1)} and ${+(lo+.1).toFixed(1)}.`,`f(${+mid.toFixed(2)}) = ${+ev(c,mid).toFixed(3)} → it is ${r<mid?"below":"above"} ${+mid.toFixed(2)} → <b>x ≈ ${r.toFixed(1)}</b> (actual ${r.toFixed(4)}).`]}; }
bTenths.r=()=>{ for(;;){ const c=[rnd(1,3),rnd(-4,2),rnd(-3,3),rnd(-4,-1)]; for(let k=0;k<=2;k++) if(ev(c,k)*ev(c,k+1)<0){ const r=root(c,k,k+1); if(Math.abs(r*10-Math.round(r*10))>0.05&&Math.abs(r*20-Math.round(r*20))>0.02) return [c,k]; } } };
function bBox(L,W,V){ const vc=[4,-2*(L+W),L*W,-V], h=W/2; let xm=0, best=-1; for(let i=1;i<200;i++){ const x=h*i/200, v=x*(L-2*x)*(W-2*x); if(v>best){best=v;xm=x;} } const rs=[root(vc,0,xm),root(vc,xm,h)];
  return {title:"Application: an open box",q:`Squares of side x are cut from the corners of a ${L} in. × ${W} in. sheet, and the sides are folded up into a box. For which x is the volume ${V} in³?`,
   g:{f:[{f:x=>x*(L-2*x)*(W-2*x),d:[0,h]},{f:()=>V,dash:true}],p:rs.map(r=>[r,V,`x ≈ ${r.toFixed(2)}`]),xr:[-.3,h+.3],yr:[-best*.1,best*1.15],cap:`V(x) = x(${L} − 2x)(${W} − 2x) meets V = ${V} twice on 0 < x < ${t(h)}.`},
   steps:[`V(x) = x(${L} - 2x)(${W} - 2x). The domain is <b>0 < x < ${t(h)}</b>, since every side must be positive.`,`Set V = ${V}: ${ps(vc)} = 0.`,`The volume rises to a maximum of about ${best.toFixed(1)} in³ near x ≈ ${xm.toFixed(2)}, then falls back to 0, so V = ${V} happens twice.`,`Approximations (table, bisection or calculator): <b>x ≈ ${rs[0].toFixed(2)} in.</b> or <b>x ≈ ${rs[1].toFixed(2)} in.</b>`,"Both are in the domain, so both boxes work."],
   tip:`Always restrict to the realistic domain. Zeros outside 0 < x < ${t(h)} make no physical sense.`}; }
bBox.r=()=>{ const W=pick([6,8,10,12]), L=W+pick([2,4,6]); let best=0; for(let i=1;i<100;i++){ const x=W/2*i/100; best=Math.max(best,x*(L-2*x)*(W-2*x)); } return [L,W,Math.round(best*pick([.3,.5,.6,.7]))]; };

/* ======================= sections ======================= */
const S1={rules:rules("Key ideas",[
  "A <b>polynomial function</b> is f(x) = a<sub>n</sub>x<sup>n</sup> + a<sub>n−1</sub>x<sup>n−1</sup> + … + a<sub>1</sub>x + a<sub>0</sub>, where the exponents are whole numbers (0, 1, 2, …) and the coefficients are real numbers.",
  "<b>Standard form:</b> terms written from the highest power down. The <b>degree</b> n is the highest power; the <b>leading coefficient</b> a<sub>n</sub> is its coefficient; the <b>constant term</b> a<sub>0</sub> is the y-intercept (0, a<sub>0</sub>).",
  "A polynomial of degree n has <b>at most n real zeros</b> (x-intercepts) and <b>at most n - 1 turning points</b>.",
  "Over the complex numbers it has <b>exactly n zeros</b>, counting multiplicity (Fundamental Theorem of Algebra).",
  "Polynomial graphs are <b>smooth and continuous</b>: no breaks, holes, sharp corners or asymptotes.",
  "Even function: f(-x) = f(x), symmetric about the y-axis. Odd function: f(-x) = -f(x), symmetric about the origin."])
 +`<table class="el-kf ptab"><tr><th>Degree</th><th>Name</th><th>Example</th><th>Max zeros</th><th>Max turns</th></tr>${[[0,"constant","7"],[1,"linear","2x - 5"],[2,"quadratic","x^2 - 4x + 1"],[3,"cubic","x^3 - 2x"],[4,"quartic","-x^4 + 3x^2"],[5,"quintic","x^5 - x"]].map(([d,n,e])=>`<tr><td>${d}</td><td>${n}</td><td>${fmt(e)}</td><td>${d}</td><td>${Math.max(d-1,0)}</td></tr>`).join("")}</table>
  <p class="pnote">By number of terms: <b>monomial</b> (1 term), <b>binomial</b> (2), <b>trinomial</b> (3), polynomial (4 or more).</p>`,
 ex:[X(bIsPoly,[[0,1,3],[0,1,2]]),X(bStd,[[.5,-3,2]]),X(bEvenOdd,[[1,0,-3,0,0],[1,0,-4,0],[1,0,0,1]]),X(bOps,[[2,0,-1,4],[1,3,0,-5],[1,2,-1],[1,-3]]),X(bDegGraph,[[-2.2,-0.9,0.9,2.2],1])]};
const mini=(f,lab)=>`<div class="emini">${plot({f:[{f}],xr:[-2.2,2.2],yr:[-4,4],cap:lab})}</div>`;
const S2={rules:rules("The Leading Coefficient Test",[
  "End behavior describes what f(x) does as x → ∞ (far right) and x → -∞ (far left). It depends <b>only on the leading term</b> a<sub>n</sub>x<sup>n</sup>.",
  "<b>Even degree:</b> both ends point the same way. Up if a<sub>n</sub> > 0, down if a<sub>n</sub> < 0.",
  "<b>Odd degree:</b> the ends point in opposite directions. Rises to the right if a<sub>n</sub> > 0, falls to the right if a<sub>n</sub> < 0.",
  "In factored form, multiply the leading terms of all the factors to find the leading term."])
 +`<div class="egrid">${mini(x=>x*x,"Even, a > 0: ↑ ↑")}${mini(x=>-x*x,"Even, a < 0: ↓ ↓")}${mini(x=>x**3/1.5,"Odd, a > 0: ↓ ↑")}${mini(x=>-(x**3)/1.5,"Odd, a < 0: ↑ ↓")}</div>
  <table class="el-kf ptab"><tr><th></th><th>a<sub>n</sub> > 0</th><th>a<sub>n</sub> < 0</th></tr><tr><th>Even n</th><td>x → -∞: f → ∞; x → ∞: f → ∞</td><td>x → -∞: f → -∞; x → ∞: f → -∞</td></tr><tr><th>Odd n</th><td>x → -∞: f → -∞; x → ∞: f → ∞</td><td>x → -∞: f → ∞; x → ∞: f → -∞</td></tr></table>`,
 ex:[X(bEndStd,[[-2,0,0,4,0,-1]]),X(bEndFact,[[[1,2,0],[3,1,1],[-2,1,0]]]),X(bBiquad,[1,2])]};
const S3={rules:rules("Zeros and multiplicity",[
  "If (x - c)^m is a factor, then c is a zero of <b>multiplicity m</b>.",
  "<b>Odd multiplicity</b> (1, 3, 5, …): the graph <b>crosses</b> the x-axis at c.",
  "<b>Even multiplicity</b> (2, 4, …): the graph <b>touches</b> the x-axis at c and turns around (bounces).",
  "Multiplicity 3 or more: the graph <b>flattens</b> near c (it looks like a cubic there).",
  "Zero, factor, solution and x-intercept all describe the same thing: f(c) = 0 ⟺ (x - c) is a factor ⟺ (c, 0) is on the graph (when c is real).",
  "<b>Sketching steps:</b> (1) end behavior, (2) zeros and their multiplicities, (3) y-intercept, (4) a test point between zeros if needed, (5) connect smoothly."]),
 ex:[X(bSketch,[[[-2,1],[1,2],[3,1]],1]),X(bFlat,[[[0,1],[2,3]],-1]),X(bFromGraph,[-3,1,-2]),X(bZerosFact,[2,0])]};
const S4={rules:rules("Division and the Remainder Theorem",[
  "<b>Division algorithm:</b> f(x) = d(x) · q(x) + r(x), where the remainder r(x) has a smaller degree than the divisor d(x).",
  "<b>Synthetic division</b> works for divisors of the form x - c. Write c, then the coefficients (a 0 for every missing power). Bring down, multiply by c, add, and repeat. The last number is the remainder.",
  "<b>Remainder Theorem:</b> when f(x) is divided by x - c, the remainder is <b>f(c)</b>.",
  "<b>Applications:</b> evaluate f(c) quickly, find an unknown coefficient from a given remainder, and check possible zeros (remainder 0 means c is a zero).",
  "To divide by ax - b, use c = {{b|a}}: the remainder is f({{b|a}}), and you divide the quotient by a."]),
 ex:[X(bSynth,[[1,-2,0,-4],3]),X(bLongDiv,[[2,1,-7,3,-1],[1,0,-2]]),X(bEvalRem,[[3,0,-2,0,1,-7],-2]),X(bFindK,[[1,-1,-4,5],1,2]),X(bTwoCond,[2,-3,1,-2,-6]),X(bDiv2,[[4,-2,6,-1],2,1],"Dividing by ax − b"),X(bRemQuad,[1,-2,3,0])]};
const S5={rules:rules("The Factor Theorem",[
  "<b>(x - c) is a factor of f(x) if and only if f(c) = 0.</b> (This is the Remainder Theorem with remainder 0.)",
  "After dividing out a factor, the quotient is the <b>depressed polynomial</b>; its degree is one less. Keep factoring it.",
  "Each factor you find gives a zero: (x - c) ↔ x = c. A factor (ax - b) gives the zero x = {{b|a}}.",
  "Use the Factor Theorem to factor completely, find unknown coefficients, and check for repeated zeros."]),
 ex:[X(bFacComp,[[-3,2,-1]]),X(bFacRat,[3,.5,-2]),X(bFindKf,[[1,-3,0,4,-2],3,1]),X(bTwoFac,[1,2]),X(bRepeat,[1,-2])]};
const S6={rules:rules("The Rational Zero Theorem",[
  "If f(x) has integer coefficients, every rational zero has the form <b>±{{p|q}}</b>, where p is a factor of the <b>constant term</b> and q is a factor of the <b>leading coefficient</b>.",
  "<b>Strategy:</b> (1) list the candidates ±{{p|q}}; (2) test them with synthetic division (remainder 0 = zero); (3) once you reach a quadratic, factor it or use the quadratic formula. That last step can give irrational or imaginary zeros.",
  "<b>Descartes' Rule of Signs:</b> the number of positive real zeros equals the number of sign changes in f(x), or is less than it by an even number. Use f(-x) for negative zeros.",
  "<b>Bounds (Honors):</b> when synthetic division by c > 0 gives a bottom row with no negative numbers, no zero is greater than c. When division by c < 0 gives a bottom row that alternates in sign, no zero is less than c."]),
 ex:[X(bRatAll,[.5,1,-3]),X(bRatIrr,[3,2]),X(bQuartic,[2,.5,-2/3]),X(bBounds,[[1,3,-2]])]};
const S7={rules:rules("Imaginary zeros and the Fundamental Theorem of Algebra",[
  "<b>Fundamental Theorem of Algebra:</b> a polynomial of degree n ≥ 1 has <b>exactly n complex zeros</b>, counting multiplicity.",
  "<b>Complex Conjugate Theorem:</b> if f has real coefficients and a + bi is a zero, then <b>a - bi</b> is also a zero. Imaginary zeros come in pairs.",
  "<b>Irrational conjugates:</b> if f has rational coefficients and a + √b is a zero, then a - √b is also a zero.",
  "Only <b>real</b> zeros are x-intercepts. Imaginary zeros do not appear on the graph.",
  "So a polynomial of odd degree always has at least one real zero. Number of imaginary zeros = degree - number of real zeros, and it is always even.",
  "Useful product: (x - (a + bi))(x - (a - bi)) = <b>x^2 - 2ax + (a^2 + b^2)</b>."]),
 ex:[X(bImgCubic,[1,4]),X(bGivenC,[2,1,3]),X(bWriteC,[3,1,2]),X(bWriteI,[2,0,3]),X(bBiImag,[2,3]),X(bNoReal,[1,1,2]),X(bCount,[5,3])]};
const S8={rules:rules("Approximating real zeros",[
  "<b>Location Principle (Intermediate Value Theorem):</b> if f is a polynomial and f(a) and f(b) have <b>opposite signs</b>, then f has at least one real zero between a and b.",
  "<b>Table of values:</b> evaluate f at consecutive integers and look for sign changes. A value of exactly 0 is itself a zero.",
  "<b>Bisection:</b> repeatedly take the midpoint of an interval with a sign change, and keep the half where the sign still changes. Each step halves the error.",
  "<b>Zoom in by tenths:</b> once you know the zero is between 2 and 3, evaluate at 2.1, 2.2, … to find the tenths interval.",
  "<b>Graphing calculator:</b> use 2nd → CALC → zero, giving a left bound, a right bound and a guess. Check your answer with the table."]),
 ex:[X(bBisect,[[1,0,-2,-5],2]),X(bTable,[[1,0,-4,1,1]]),X(bTenths,[[2,-3,0,-1],1]),X(bBox,[10,8,30])]};

/* ======================= 9. Practice generator ======================= */
const PT={rem:"Remainder Theorem",fac:"Factor Theorem",rat:"Rational zeros",img:"Imaginary zeros",end:"End behavior & multiplicity",apx:"Approximating zeros"};
function genP(tp){
  if(tp==="rem"){ const c=[rnd(1,3)*pick([1,-1]),rnd(-6,6),rnd(-6,6),rnd(-9,9)], k=pick([-3,-2,-1,1,2,3]), s=synth(c,k);
    return {t:tp,q:`Use synthetic division to find the remainder when ${ps(c)} is divided by ${ps([1,-k])}. What is f(${k})?`,a:`<b>Remainder ${s.rem}</b>, so f(${k}) = ${s.rem}.`,
      sol:synthHTML(c,k)+fmt(`Quotient ${ps(s.q)}, remainder ${s.rem}. By the Remainder Theorem, f(${k}) = ${s.rem}. Check: direct substitution gives ${ev(c,k)} ✓.`)}; }
  if(tp==="fac"){ let r; do{ r=[rnd(-4,4),rnd(-4,4),rnd(-4,4)]; }while(new Set(r).size<3||r.includes(0)); const c=fromRoots(r), k=r[0];
    return {t:tp,q:`Show that ${ps([1,-k])} is a factor of f(x) = ${ps(c)}, then factor completely.`,a:`<b>f(x) = ${r.map(z=>"("+ps([1,-z])+")").join("")}</b>; zeros ${r.join(", ")}`,
      sol:synthHTML(c,k,"Remainder 0, so it is a factor")+fmt(`Depressed polynomial ${ps(synth(c,k).q)} = (${ps([1,-r[1]])})(${ps([1,-r[2]])}). So f(x) = ${r.map(z=>"("+ps([1,-z])+")").join("")}.`)}; }
  if(tp==="rat"){ let r, a; do{ a=pick([2,3]); r=[pick([1,-1])*pick([1,3,5])/a,rnd(-3,3),rnd(-3,3)]; }while(r[1]===r[2]||r.includes(0)||Math.abs(r[0]*a)%a===0);
    const c=fromRoots(r,a).map(Math.round), k=r[1];
    return {t:tp,q:`Find all zeros of f(x) = ${ps(c)}.`,a:`<b>Zeros: ${r.map(t).sort().join(", ")}</b>`,
      sol:fmt(`Candidates ±{{p|q}}: ${candTxt(c)}.`)+synthHTML(c,k,`x = ${k} is a zero`)+fmt(`Depressed polynomial: ${ps(synth(c,k).q)}. Solve it (factor or quadratic formula): x = ${t(r[0])} and x = ${r[2]}.`)}; }
  if(tp==="img"){ const r=rnd(-3,3)||2, a=rnd(-2,2), b=rnd(1,3), q=[1,-2*a,a*a+b*b], c=mul([1,-r],q); const z=`${a?a+" ± ":"±"}${b===1?"":b}i`;
    return {t:tp,q:`Find all zeros of f(x) = ${ps(c)}, given that x = ${r} is a zero.`,a:`<b>Zeros: ${r}, ${z}</b>`,
      sol:synthHTML(c,r,"Remainder 0")+fmt(`Depressed polynomial ${ps(q)}. Quadratic formula: x = {{${2*a} ± √(${4*a*a} - ${4*(a*a+b*b)})|2}} = {{${2*a} ± ${2*b}i|2}} = ${z}. One real zero (the x-intercept) and a conjugate pair of imaginary zeros.`)}; }
  if(tp==="end"){ const lc=pick([1,-1,2,-2]), fs=shuffle([[rnd(-4,-1),pick([1,2,3])],[rnd(1,4),pick([1,2])]]); const deg=fs.reduce((s,f)=>s+f[1],0)+1;
    const fx=`${lc===1?"":lc===-1?"-":lc}x${fs.map(([z,m])=>`(${ps([1,-z])})${m>1?"^"+m:""}`).join("")}`;
    const ends=deg%2?(lc>0?"down on the left, up on the right":"up on the left, down on the right"):(lc>0?"both ends up":"both ends down");
    return {t:tp,q:`For f(x) = ${fx}, give the degree, end behavior, and each zero with its multiplicity and whether the graph crosses or touches.`,a:`Degree ${deg}; ${ends}.`,
      sol:fmt(`Degree 1 + ${fs.map(f=>f[1]).join(" + ")} = ${deg}; leading coefficient ${lc} → ${deg%2?"odd":"even"} degree, ${lc>0?"positive":"negative"}: <b>${ends}</b>.<br>x = 0: multiplicity 1 → crosses. `+fs.map(([z,m])=>`x = ${z}: multiplicity ${m} → ${m%2?"crosses":"touches"}${m>=3?" and flattens":""}.`).join(" "))+plot(gPoly(mul([lc,0],fs.reduce((p,[z,m])=>{for(let i=0;i<m;i++)p=mul(p,[1,-z]);return p;},[1])),{zeros:[0,...fs.map(f=>f[0])]}))}; }
  const c=[1,0,rnd(-6,-2),rnd(-5,5)]; const tab=[-4,-3,-2,-1,0,1,2,3,4].map(x=>[x,ev(c,x)]); const iv=[]; for(let i=0;i<tab.length-1;i++) if(tab[i][1]*tab[i+1][1]<0) iv.push([tab[i][0],tab[i+1][0]]);
  if(!iv.length) return genP("apx");
  return {t:"apx",q:`Locate the real zeros of f(x) = ${ps(c)} between consecutive integers, and approximate them to the nearest tenth.`,a:`<b>${iv.map(([a,b])=>root(c,a,b).toFixed(1)).join(", ")}</b>`,
    sol:`<table class="el-kf ptab"><tr><th>x</th>${tab.map(r=>`<td>${r[0]}</td>`).join("")}</tr><tr><th>f(x)</th>${tab.map(r=>`<td>${r[1]}</td>`).join("")}</tr></table>`+fmt(`Sign changes: ${iv.map(([a,b])=>`between ${a} and ${b}`).join("; ")}. Zoom in by tenths (or bisect): x ≈ ${iv.map(([a,b])=>root(c,a,b).toFixed(2)).join(", ")}.`)};
}
function practiceHtml(){
  return `<div class="ppr"><p class="lead2">New problems every time, with full step-by-step solutions. Work on paper, then open the solution.</p>
   <div class="pctl"><span class="gl">Topic</span><div class="pchips">${[["all","Mixed"],...Object.entries(PT)].map(([k,v],i)=>`<button type="button" data-pt="${k}"${i?"":' class="on"'}>${v}</button>`).join("")}</div>
   <button type="button" class="pgo" data-pgo>↻ New problems</button></div><div class="plist"></div></div>`;
}
function bindPractice(root){
  root.querySelectorAll(".ppr").forEach(box=>{
    const list=box.querySelector(".plist"); let tp="all";
    const go=()=>{ const qs=[]; for(let i=0;i<8;i++) qs.push(genP(tp==="all"?Object.keys(PT)[i%6]:tp));
      list.innerHTML=qs.map((p,i)=>`<div class="pq"><div class="ptg">${PT[p.t]}</div><div class="pqt"><span class="n">${i+1}</span><span>${fmt(p.q)}</span></div><details class="pans"><summary>Show solution</summary><div>${p.sol}<p class="pfin">${fmt(p.a)}</p></div></details></div>`).join(""); };
    box.querySelectorAll("[data-pt]").forEach(b=>b.onclick=()=>{ tp=b.dataset.pt; box.querySelectorAll("[data-pt]").forEach(x=>x.classList.toggle("on",x===b)); go(); });
    box.querySelector("[data-pgo]").onclick=go; go();
  });
}


/* ---------- learning map: node view of the sections ---------- */
const MAPMETA={props:["Foundations","degree, terms, even & odd"],end:["Foundations","leading coefficient test"],zeros:["Foundations","cross, touch, flatten"],rem:["Theorems","synthetic division, f(c)"],fac:["Theorems","f(c) = 0 ⟺ factor"],
  rat:["Finding zeros","±p/q, Descartes, bounds"],img:["Finding zeros","FTA, conjugate pairs"],apx:["Finding zeros","Location Principle, bisection"],practice:["Practice","mixed, new every time"],ws:["Practice","15 printable worksheets"]};
const GCOL={"Foundations":"#1d4e89","Theorems":"#0f7a6c","Finding zeros":"#6a3d9a","Practice":"#c2571a"};
function mapInit(root){
  const sec=root.querySelector("#sec-poly"); if(!sec||sec.querySelector(".pmap")) return;
  const subs=[...sec.querySelectorAll('[id^="sub-poly-"]')]; if(subs.length<2) return;
  const items=subs.map((el,i)=>{ const k=el.id.replace("sub-poly-",""), sm=el.querySelector(".subh small"), t=el.querySelector(".subh").cloneNode(true); t.querySelectorAll(".num,small").forEach(x=>x.remove());
    return {k,el,i,title:t.textContent.trim(),cnt:sm?sm.textContent:"",grp:(MAPMETA[k]||["Practice",""])[0],desc:(MAPMETA[k]||["",""])[1]}; });
  const N=items.length, pos=items.map((_,i)=>{ const a=-Math.PI/2+2*Math.PI*i/N; return [50+40*Math.cos(a),50+38*Math.sin(a)]; });
  let mode="map"; try{ mode=localStorage.getItem("a2polyview")||"map"; }catch(e){}
  const wrap=document.createElement("div"); wrap.className="pmap";
  wrap.innerHTML=`<div class="pm-bar"><button type="button" data-pv="map">🗺 Map</button><button type="button" data-pv="list">☰ List</button><span class="pm-leg">${Object.entries(GCOL).map(([g,c])=>`<span><i style="background:${c}"></i>${g}</span>`).join("")}</span></div>
   <div class="pm-stage"><svg class="pm-lines" viewBox="0 0 100 100" preserveAspectRatio="none">${pos.map(([x,y])=>`<line x1="50" y1="50" x2="${x}" y2="${y}"/>`).join("")}${pos.map(([x,y],i)=>{ const [u,v]=pos[(i+1)%N]; return i<N-1?`<line class="pth" x1="${x}" y1="${y}" x2="${u}" y2="${v}"/>`:""; }).join("")}</svg>
    <div class="pm-hub"><b>Polynomial Functions</b><span>Start at 1 and follow the path</span></div>
    ${items.map((it,i)=>`<button type="button" class="pm-node" data-pk="${it.k}" style="left:${pos[i][0]}%;top:${pos[i][1]}%;--c:${GCOL[it.grp]}"><span class="pm-n">${i+1}</span><span class="pm-t">${it.title}</span><span class="pm-d">${it.desc}</span><span class="pm-c">${it.cnt}</span></button>`).join("")}</div>
   <div class="pm-cur"></div>`;
  subs[0].parentNode.insertBefore(wrap,subs[0]);
  const cur=wrap.querySelector(".pm-cur");
  let sel=items[0].k;
  const show=k=>{ sel=k; const it=items.find(x=>x.k===k);
    wrap.querySelectorAll(".pm-node").forEach(n=>n.classList.toggle("on",n.dataset.pk===k));
    items.forEach(x=>x.el.style.display=(mode==="list"||x.k===k)?"":"none");
    if(mode==="map"){ if(it.el.tagName==="DETAILS") it.el.open=true;
      const i=it.i; cur.innerHTML=`<button type="button" class="pm-step" data-ps="${i-1}"${i?"":" disabled"}>‹ ${i?items[i-1].title:""}</button><span>Section ${i+1} of ${N}</span><button type="button" class="pm-step" data-ps="${i+1}"${i<N-1?"":" disabled"}>${i<N-1?items[i+1].title:""} ›</button>`;
      cur.querySelectorAll("[data-ps]").forEach(b=>b.onclick=()=>{ const j=+b.dataset.ps; if(items[j]){ show(items[j].k); cur.scrollIntoView({behavior:"smooth",block:"start"}); } }); }
  };
  const setMode=m=>{ mode=m; try{ localStorage.setItem("a2polyview",m); }catch(e){} wrap.classList.toggle("list",m==="list"); wrap.querySelectorAll("[data-pv]").forEach(b=>b.classList.toggle("on",b.dataset.pv===m)); if(m==="list") cur.innerHTML=""; show(sel); };
  wrap.querySelectorAll("[data-pv]").forEach(b=>b.onclick=()=>setMode(b.dataset.pv));
  wrap.querySelectorAll(".pm-node").forEach(n=>n.onclick=()=>{ show(n.dataset.pk); setTimeout(()=>cur.scrollIntoView({behavior:"smooth",block:"start"}),30); });
  // jump bar and in-page links: open the chosen section in map mode
  sec.addEventListener("click",e=>{ const j=e.target.closest("[data-jump],[data-wsrev]"); if(!j||mode!=="map") return; const id=j.dataset.jump||j.dataset.wsrev, it=items.find(x=>x.el.id===id); if(it&&it.k!==sel) show(it.k); },true);
  setMode(mode);
}
const MAPCSS=`.pmap{margin:4px 0 14px}
.pm-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:6px}
.pm-bar button{border:1.5px solid ${NAVY};background:#fff;color:${NAVY};padding:4px 14px;font:600 16px 'EB Garamond',Georgia,serif;cursor:pointer}
.pm-bar button.on{background:${NAVY};color:#fff}
.pm-leg{display:flex;flex-wrap:wrap;gap:12px;margin-left:auto;font-size:14.5px;color:#444}
.pm-leg i{display:inline-block;width:11px;height:11px;border-radius:50%;margin-right:5px;vertical-align:-1px}
.pm-stage{position:relative;height:600px;background:radial-gradient(circle at 50% 50%,#f3f7fc 0,#fff 70%);border:1.5px solid #d5deea}
.pmap.list .pm-stage{display:none}
.pm-lines{position:absolute;inset:0;width:100%;height:100%}
.pm-lines line{stroke:#b9c7da;stroke-width:.35;vector-effect:non-scaling-stroke;stroke-width:1.5}
.pm-lines line.pth{stroke:#7f96b6;stroke-dasharray:6 5;stroke-width:1.5}
.pm-hub{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:200px;height:200px;border-radius:50%;background:${NAVY};color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;box-shadow:0 6px 18px rgba(29,78,137,.3);padding:18px}
.pm-hub b{font-size:24px;line-height:1.15}.pm-hub span{font-size:14px;font-style:italic;opacity:.85;margin-top:6px}
.pm-node{position:absolute;transform:translate(-50%,-50%);width:186px;border:2px solid var(--c);border-radius:12px;background:#fff;padding:8px 10px 7px 10px;text-align:left;cursor:pointer;font-family:'EB Garamond',Georgia,serif;box-shadow:0 2px 6px rgba(0,0,0,.08);transition:transform .15s,box-shadow .15s;display:grid;grid-template-columns:auto 1fr;column-gap:8px;align-items:center}
.pm-node:hover{transform:translate(-50%,-50%) scale(1.05);box-shadow:0 6px 16px rgba(0,0,0,.15);z-index:2}
.pm-node.on{background:var(--c);color:#fff}
.pm-n{grid-row:span 3;width:30px;height:30px;border-radius:50%;background:var(--c);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px}
.pm-node.on .pm-n{background:#fff;color:var(--c)}
.pm-t{font-weight:700;font-size:16.5px;line-height:1.15;color:var(--c)}.pm-node.on .pm-t{color:#fff}
.pm-d{font-size:13.5px;color:#555;line-height:1.2}.pm-node.on .pm-d{color:#eef}
.pm-c{font-size:12.5px;font-style:italic;color:#888}.pm-node.on .pm-c{color:#dde}
.pm-cur{display:flex;justify-content:space-between;align-items:center;gap:8px;margin:10px 0 0;font-style:italic;color:#555}
.pm-cur:empty{display:none}
.pm-step{border:1.5px solid ${NAVY};background:#fff;color:${NAVY};padding:4px 12px;font:600 15.5px 'EB Garamond',Georgia,serif;cursor:pointer;max-width:42%}
.pm-step:disabled{visibility:hidden}
@media (max-width:820px){.pm-stage{height:auto;padding:14px 12px 14px 34px;background:#f8fafd}
 .pm-lines{display:none}
 .pm-stage::before{content:"";position:absolute;left:28px;top:90px;bottom:30px;border-left:2px dashed #9fb1c9}
 .pm-hub{position:relative;left:auto;top:auto;transform:none;width:auto;height:auto;border-radius:12px;margin:0 0 12px -22px;padding:10px}
 .pm-node{position:relative;left:auto!important;top:auto!important;transform:none;width:100%;margin:0 0 10px}
 .pm-node:hover{transform:scale(1.02)}
 .pm-cur span{display:none}}`;
/* ---------- assemble ---------- */
const SEC=[["props","Polynomial Functions & Properties","Properties",S1],["end","End Behavior","End Behavior",S2],["zeros","Zeros & Multiplicity","Zeros & Multiplicity",S3],
  ["rem","Division & the Remainder Theorem","Remainder Theorem",S4],["fac","The Factor Theorem","Factor Theorem",S5],["rat","Rational Zeros","Rational Zeros",S6],
  ["img","Imaginary Zeros & the FTA","Imaginary Zeros",S7],["apx","Approximating Zeros","Approximating Zeros",S8]];
const NEX=SEC.reduce((s,x)=>s+x[3].ex.length,0);
const CSS=`
nav button.pbtn{background:${NAVY};border-color:${NAVY};color:#fff;font-weight:600}
nav button.pbtn:hover{background:#163d6b}
nav button.pbtn[aria-current="true"]{background:#0f2b4d;border-color:#0f2b4d;box-shadow:inset 0 -3px 0 #fff}
#sec-poly .chapter,#sec-poly h2{color:${NAVY}}
#sec-poly .secnav{border-color:${NAVY};background:#f3f7fc}
#sec-poly .secnav button{border-color:${NAVY};color:${NAVY}}
#sec-poly .secnav button b{background:${NAVY}}
#sec-poly .secnav button:hover,#sec-poly .secnav button.cur{background:${NAVY};color:#fff}
#sec-poly .secnav button:hover b,#sec-poly .secnav button.cur b{background:#fff;color:${NAVY}}
#sec-poly details.fold{border-color:${NAVY}}
#sec-poly details.fold>summary.subh{color:${NAVY}}
#sec-poly details.fold[open]>summary.subh{background:#eef3fa;border-bottom-color:${NAVY}}
#sec-poly .subh .num{background:${NAVY}}
#sec-poly .secnav.sticky{flex-wrap:wrap;overflow:visible;row-gap:7px}
#sec-poly .secnav .jb{flex-basis:100%;display:flex;flex-wrap:wrap;gap:8px}
@media (max-width:760px){#sec-poly .secnav .jb{flex-wrap:nowrap;overflow-x:auto;padding-bottom:2px}}
.plead{background:#eef3fa;border:1.5px solid ${NAVY};padding:10px 14px;margin:0 0 14px}
.popen{background:${NAVY}!important;border-color:${NAVY}!important}
.prules{border:2px solid ${NAVY};background:#f6f9fd;padding:10px 16px;margin:4px 0 14px}
.prules h4{margin:0 0 4px;color:${NAVY};font-size:20px}
.prules ul{margin:0;padding-left:20px;font-size:16.5px;line-height:1.7}
.ptab{width:auto;margin:4px 0 12px}
.ptab td{text-align:center}
.pnote{font-size:16px;margin:0 0 12px}
.egrid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:6px 0 12px}
.emini figure.gph{float:none;width:100%;margin:0}
.syn{border-collapse:collapse;margin:4px 0 2px;font-size:16.5px}
.syn td{padding:2px 10px;text-align:right;min-width:34px}
.syn td.sc{border-right:1.5px solid #111;padding-right:10px;font-weight:700}
.syn tr:nth-child(2) td{border-bottom:1.5px solid #111}
.syn tr:nth-child(2) td.sc{border-bottom:none}
.syn tr.sr td{font-weight:700}
.syn td.rem{border:1.5px solid ${NAVY};color:${NAVY}}
.synn{font-size:14.5px;font-style:italic;color:#444;margin:0 0 8px}
#sec-poly .cs-card h4 .n{background:${NAVY}}
#sec-poly .cs-ex{border-left-color:${NAVY}}
#sec-poly .el-grp{border-bottom-color:${NAVY};color:${NAVY}}
.pctl{display:flex;flex-wrap:wrap;gap:8px;align-items:center;border:1.5px solid ${NAVY};background:#f3f7fc;padding:9px 12px;margin:0 0 12px}
.pctl .gl{font-variant:small-caps;font-weight:600;letter-spacing:.06em}
.pchips{display:flex;flex-wrap:wrap;gap:5px}
.pchips button{border:1.5px solid ${NAVY};background:#fff;color:${NAVY};padding:3px 11px;border-radius:999px;font:500 15.5px 'EB Garamond',Georgia,serif;cursor:pointer}
.pchips button.on{background:${NAVY};color:#fff}
.pgo{border:1.5px solid ${NAVY};background:${NAVY};color:#fff;padding:5px 14px;font:600 16px 'EB Garamond',Georgia,serif;cursor:pointer;margin-left:auto}
.pq{border:1.5px solid #111;padding:10px 14px;margin:0 0 10px;background:#fff}
.ptg{font-size:12.5px;letter-spacing:.1em;text-transform:uppercase;color:${NAVY};margin-bottom:4px}
.pqt{font-size:18px;display:flex;gap:8px;align-items:baseline}
.pqt .n{flex:none;min-width:24px;height:24px;line-height:24px;border-radius:50%;background:${NAVY};color:#fff;text-align:center;font-size:13px}
.pq .pans{margin-top:6px}
.pq .pans>summary{cursor:pointer;color:${NAVY};font-weight:600}
.pfin{margin:6px 0 0;font-size:17px}
.pnew{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.pnew button{border:1.5px solid ${NAVY};background:${NAVY};color:#fff;padding:4px 14px;font:600 15.5px 'EB Garamond',Georgia,serif;cursor:pointer}
.pnew button:hover{background:#163d6b}
.pnew span{font-size:14.5px;font-style:italic;color:#555}
#sec-poly .el-q{margin:0;font-size:17px}
#sec-poly .el-steps{margin:4px 0 2px;padding-left:22px;font-size:16px;line-height:1.7}
#sec-poly .el-kf{border-collapse:collapse;font-size:15px;margin:2px 0}
#sec-poly .el-kf th,#sec-poly .el-kf td{border:1px solid #bbb;padding:2px 8px;vertical-align:top}
#sec-poly .el-kf th{background:#f1f1f1;font-weight:600;white-space:nowrap}
#sec-poly .cs-card figure.gph{width:min(330px,48%)}
@media (max-width:640px){.egrid{grid-template-columns:1fr 1fr}#sec-poly .cs-card figure.gph{float:none;width:100%;margin:6px 0}.ptab{display:block;overflow-x:auto}}`;
const st=document.createElement("style"); st.textContent=CSS+MAPCSS; document.head.appendChild(st);
let n=0;
window.A2POLY={
  count:()=>NEX,
  subs:()=>{ n=0; REG.length=0; return [...SEC.map(([k,ti,sh,S])=>[k,ti,S.ex.length+" examples",`<div class="cs">${S.rules}${grid(S.ex,1)}</div>${window.A2WS?A2WS.block(k):""}`,sh]),["practice","Practice: New Problems","new every time",practiceHtml(),"Practice"],...(window.A2WS?[["ws","Worksheets","15 topics",A2WS.html(),"Worksheets"]]:[])]; },
  lead:()=>`<p class="lead2 plead">Polynomial functions from start to finish: properties, end behavior, zeros and multiplicity, the Remainder and Factor Theorems, rational, irrational and imaginary zeros, and approximating zeros. Each section has the rules, detailed worked examples with graphs, and common mistakes, plus a practice generator. <button type="button" class="openu popen" data-open="poly">Open Polynomials →</button></p>`,
  bind(root){ bindPractice(root); if(window.A2WS){ A2WS.bind(root); A2WS.bindBlocks(root); } mapInit(root);
    root.querySelectorAll("[data-pnew]").forEach(b=>b.onclick=()=>{ const e=REG[+b.dataset.pnew]; if(!e) return; let c=null;
      for(let i=0;i<6&&!c;i++){ try{ c=e.mk(...e.mk.r()); }catch(err){ c=null; } } if(!c) return;
      const body=b.closest(".cs-card").querySelector(".pbody"); body.innerHTML=cardBody(c); b.closest(".cs-card").open=true; }); const f=root.querySelector("#sub-poly-props"); if(f&&f.tagName==="DETAILS") f.open=true; },
  _test:{SEC,genP,synth,ev,ps,longDiv,cands,root,REG,cardBody}
};
})();
