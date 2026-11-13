/* Z-Precalculus content (AP Precalculus CED units 1–4). Every answer is computed. */
(function(){
const {R,pick,nz,gcd,shuffle,C,fact,N,F,sq,cu,X,sg,poly,P,PF,PS}=window.ZH;
const FR=(n,d)=>`<span class="frc"><span>${n}</span><span>${d}</span></span>`;
const FF=(n,d)=>{ const f=F(n,d); const m=f.match(/^(−?)(\d+)\/(\d+)$/); return m?`${m[1]}${FR(m[2],m[3])}`:f; };
const T=(...r)=>r;
const NAVY="#1d4e89",ORG="#c2571a",RED="#c23a52",PURP="#6a3d9a",TEAL="#0f7a6c",GRN="#137333",BLU="#1f4fd1",BRN="#7a5a12";
const r3=x=>+x.toFixed(3);
const PSX=(t,q,a,w,s)=>{ let ww=[...new Set(w)].filter(x=>x!==a); if(ww.length<3) ww=ww.concat(["None of these","Cannot be determined"]).slice(0,3); return PS(t,q,a,ww.slice(0,3),s); };
const TB=(h,rows)=>`<table class="fq-tb"><tr>${h.map(x=>`<th>${x}</th>`).join("")}</tr>${rows.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join("")}</tr>`).join("")}</table>`;
const MX=A=>`<span class="mx" style="--n:${A[0].length}">${A.flat().map(x=>`<i>${typeof x==="string"?x:N(x)}</i>`).join("")}</span>`;
const lin=(a,b)=>`${X(a)}${b?sg(b):""}`;
const UC=[["0","1","0"],["π/6","√3/2","1/2"],["π/4","√2/2","√2/2"],["π/3","1/2","√3/2"],["π/2","0","1"],["2π/3","−1/2","√3/2"],["3π/4","−√2/2","√2/2"],["5π/6","−√3/2","1/2"],["π","−1","0"],["7π/6","−√3/2","−1/2"],["5π/4","−√2/2","−√2/2"],["4π/3","−1/2","−√3/2"],["3π/2","0","−1"],["5π/3","1/2","−√3/2"],["7π/4","√2/2","−√2/2"],["11π/6","√3/2","−1/2"]];

/* ===== U1 Polynomial and rational functions ===== */
const U1M={
 p0:{grp:"Step 1",c:NAVY,name:"Identify the Function Type",hint:"polynomial or rational?",when:"Every Unit 1 problem.",rule:"Polynomial: a sum of powers with whole-number exponents. Rational: a polynomial over a polynomial. Factor everything first: zeros, holes and asymptotes all come from factors.",
  ex:[T("f(x) = (x − 2)"+sq+"(x + 1)",["Polynomial, degree 3"]),T("r(x) = "+FR("x − 1","x"+sq+" − 1"),["Rational; factor the bottom: (x − 1)(x + 1)"])]},
 proc:{grp:"Rates of change",c:ORG,name:"Average Rate of Change",hint:"(f(b) − f(a))/(b − a)",when:"Tables, graphs, “how fast on average”.",rule:"AROC = "+FR("f(b) − f(a)","b − a")+" = slope of the secant line. Increasing AROC over equal intervals ⇒ concave up.",
  ex:[T("f(x) = x"+sq+" on [1, 4]",["(16 − 1)/3 = <b>5</b>"]),T("Rates 2, 5, 9 over equal steps",["Increasing ⇒ concave up"])]},
 ppoly:{grp:"Polynomials",c:RED,name:"Zeros, Multiplicity, End Behavior",hint:"leading term rules the ends",when:"Graphing or describing a polynomial.",rule:"Zero a with odd multiplicity: graph crosses; even: touches. Degree n has at most n real zeros and at most n − 1 extrema. End behavior follows the leading term a<sub>n</sub>xⁿ.",
  ex:[T("f(x) = −2x"+cu+" + …",["x → ∞: f → −∞; x → −∞: f → ∞"]),T("(x − 3)"+sq,["Touches at x = 3"])]},
 prat:{grp:"Rational",c:PURP,name:"Asymptotes and Holes",hint:"cancel, then read",when:"Rational function features.",rule:"Common factor ⇒ hole. Remaining zero of the denominator ⇒ vertical asymptote. Degrees: top &lt; bottom ⇒ y = 0; equal ⇒ ratio of leading coefficients; top one higher ⇒ slant asymptote (divide).",
  ex:[T(FR("(x − 1)(x + 2)","(x − 1)(x − 3)"),["Hole at x = 1, VA x = 3, HA y = 1"]),T(FR("x"+sq+" + 1","x"),["Slant asymptote y = x"])]},
 ptr:{grp:"Transformations",c:TEAL,name:"Transformations & Inequalities",hint:"g(x) = af(b(x − h)) + k",when:"Shifts, stretches, sign charts.",rule:"a: vertical stretch/reflect, b: horizontal (by 1/b), h: right, k: up. For p(x)/q(x) &gt; 0 use a sign chart with zeros and VAs as boundaries.",
  ex:[T("f(x − 2) + 3",["Right 2, up 3"]),T("(x − 1)(x + 3) &lt; 0",["−3 &lt; x &lt; 1"])]},
 pend:{grp:"Last step",c:GRN,name:"Check with a Point",hint:"plug in",when:"Every answer.",rule:"Test a value in each interval; verify asymptotes with a nearby x.",ex:[T("Sign chart check",["Pick x = 0"]),T("HA check",["Large x"])]}
};
const U1={id:"u1",num:1,short:"Polynomial & Rational",name:"Unit 1: Polynomial and Rational Functions",sub:"Rates of change, polynomial features, rational functions, asymptotes and holes, transformations, inequalities, modeling",c:NAVY,
 flow:{M:U1M,label:"Polynomial & rational flowchart",lead:"Factor first; the factors tell you everything.",start:"Polynomial or rational f",top:["p0"],q:"What is asked?",cols:[["Rate of change","",ORG,["proc"]],["Polynomial features","",RED,["ppoly"]],["Rational features","",PURP,["prat"]],["Shifts / inequalities","",TEAL,["ptr"]]],end:"pend"},
 sheet:[[ORG,"Rates of change",["AROC = (f(b) − f(a))/(b − a)","Linear: constant rate","Quadratic: rate changes at a constant rate"],""],[RED,"Polynomials",["Odd multiplicity crosses, even touches","≤ n zeros, ≤ n − 1 extrema","End behavior = leading term","Complex zeros come in conjugate pairs"],""],[PURP,"Rational functions",["Cancel ⇒ hole","Denominator zero ⇒ VA","Degrees compare ⇒ HA or slant"],""],[TEAL,"Binomial theorem",["(a + b)ⁿ = ΣC(n, k)a<sup>n−k</sup>bᵏ"],""]],
 gen:[
 ()=>{ const a=nz(-3,3),b=R(-5,5),c=R(-5,5),x1=R(-3,1),x2=x1+R(1,4); const f=x=>a*x*x+b*x+c; return PF("Average rate of change",`f(x) = ${poly([a,b,c])}. Find the average rate of change on [${N(x1)}, ${N(x2)}].`,f(x2)-f(x1),x2-x1,[N(f(x2)-f(x1)),F(f(x2)+f(x1),x2-x1),N(2*a*x1+b)],[`(f(${N(x2)}) − f(${N(x1)}))/(${N(x2)} − (${N(x1)})) = (${N(f(x2))} − (${N(f(x1))}))/${x2-x1}`,`<b>${F(f(x2)-f(x1),x2-x1)}</b>`]); },
 ()=>{ const a=pick([-3,-2,-1,1,2,3]),n=R(2,5); const s=a>0?(n%2?"↓ left, ↑ right":"↑ both ends"):(n%2?"↑ left, ↓ right":"↓ both ends"); return PSX("End behavior",`What is the end behavior of f(x) = ${X(a)}<sup>${n}</sup> + ${R(1,9)}x − ${R(1,9)}?`,s,["↓ left, ↑ right","↑ both ends","↑ left, ↓ right","↓ both ends"],[`Leading term ${X(a)}<sup>${n}</sup>: degree ${n%2?"odd":"even"}, coefficient ${a>0?"positive":"negative"}`,`<b>${s}</b>`]); },
 ()=>{ const h=nz(-5,5),v=nz(-5,5); if(h===v) return null; const k=nz(-4,4); return P("Rational functions",`r(x) = ${FR(`${k===1?"":k===-1?"−":N(k)}(x${sg(-h)})(x + 1)`,`(x${sg(-h)})(x${sg(-v)})`)}. Where is the vertical asymptote?`,v,[h,-v,k],[`Factor (x${sg(-h)}) cancels: hole at x = ${N(h)}`,`VA where the remaining denominator is 0: <b>x = ${N(v)}</b>`]); },
 ()=>{ const p=nz(-6,6),q=nz(1,5),c=R(-5,5),d=R(-5,5); return PF("Horizontal asymptotes",`Find the horizontal asymptote of r(x) = ${FR(poly([p,c,1]),poly([q,d,3]))}.`,p,q,[F(q,p),"0",N(p)],[`Degrees equal (2): ratio of leading coefficients`,`y = <b>${F(p,q)}</b>`]); },
 ()=>{ let z; do{ z=[nz(-5,5),nz(-5,5),nz(-5,5)]; }while(new Set(z).size<3); const e=[2,3,1], i=R(0,2); const ans=e[i]%2?"Crosses (odd multiplicity)":"Touches (even multiplicity)"; return PSX("Multiplicity",`f(x) = (x${sg(-z[0])})${sq}(x${sg(-z[1])})${cu}(x${sg(-z[2])}). At x = ${N(z[i])}, does the graph cross or touch the x-axis?`,ans,["Touches (even multiplicity)","Crosses (odd multiplicity)","Neither: it is a vertical asymptote"],[`The factor (x${sg(-z[i])}) has exponent ${e[i]}`,`<b>${ans}</b>`]); },
 ()=>{ const a=nz(-5,5),b=a+R(1,6); return PSX("Polynomial inequalities",`Solve (x${sg(-a)})(x${sg(-b)}) &lt; 0.`,`${N(a)} &lt; x &lt; ${N(b)}`,[`x &lt; ${N(a)} or x &gt; ${N(b)}`,`x &lt; ${N(b)}`,`x &gt; ${N(a)}`],[`Upward parabola with zeros ${N(a)}, ${N(b)}: negative between`,`<b>${N(a)} &lt; x &lt; ${N(b)}</b>`]); },
 ()=>{ const n=R(3,7),k=R(1,n-1),a=R(1,3),b=nz(-3,3); return P("Binomial theorem",`Find the coefficient of x<sup>${k}</sup> in (${a===1?"":a}x${sg(b)})<sup>${n}</sup>.`,C(n,k)*a**k*b**(n-k),[C(n,k),C(n,k)*a**k,C(n,k)*b**k],[`C(${n}, ${k})(${a})<sup>${k}</sup>(${N(b)})<sup>${n-k}</sup>`,`<b>${N(C(n,k)*a**k*b**(n-k))}</b>`]); }],
 chal:[
 ()=>{ const a=nz(-4,4),b=nz(-5,5); return PSX("Slant asymptotes",`Find the slant asymptote of r(x) = ${FR(`x${sq}${sg(a+b)}x${sg(a*b+1)}`,`x${sg(a)}`)}.`,`y = x${b?sg(b):""}`,[`y = x${sg(a)}`,`y = x`,`y = ${N(b)}`],[`Divide: x${sq}${sg(a+b)}x${sg(a*b+1)} = (x${sg(a)})(x${sg(b)}) + 1`,`<b>y = x${b?sg(b):""}</b>`]); },
 ()=>{ const r1=R(1,4),i=R(1,3); return PSX("Complex zeros",`A polynomial with real coefficients has zeros ${r1} and ${r1} + ${i===1?"":i}i. What is its minimum degree?`,"3",["2","4","1"],[`Complex zeros come in conjugate pairs: ${r1} − ${i===1?"":i}i is also a zero`,`<b>3</b>`]); }],
 frq:[()=>{ const h=nz(-3,3),v=h+R(1,4)*pick([1,-1]),k=nz(-3,3); if(v===h||v===-1) return null;
  return {t:"Function concepts: rational function",calc:false,stem:`r(x) = ${FR(`${N(k)}(x${sg(-h)})(x + 1)`,`(x${sg(-h)})(x${sg(-v)})`)}.`,parts:[
   [`Find the x-coordinate of each hole and each vertical asymptote. Justify.`,[`(x${sg(-h)}) cancels: hole at x = ${N(h)}.`,`x${sg(-v)} remains in the denominator: VA x = ${N(v)}.`],`hole x = ${N(h)}; VA x = ${N(v)}`,2],
   [`Find lim<sub>x→∞</sub> r(x).`,[`After cancelling, r = ${N(k)}(x + 1)/(x${sg(-v)}); equal degrees.`],N(k),1],
   [`Find the zeros of r.`,[`Numerator zero not cancelled: x = −1${h===-1?" (cancelled, so none)":""}.`],"x = −1",1],
   [`On what intervals is r(x) &gt; 0?`,[`Sign chart with boundaries −1 and ${N(v)} (and the hole at ${N(h)} excluded).`],k>0?(v>-1?`x &lt; −1 or x &gt; ${N(v)}`:`x &lt; ${N(v)} or x &gt; −1`):(v>-1?`−1 &lt; x &lt; ${N(v)}`:`${N(v)} &lt; x &lt; −1`),2]]}; },
 ()=>{ const a=R(1,3),h=R(2,6),k=R(10,40); const t=[0,1,2,3,4]; const P2=x=>-a*(x-h)**2+k+a*h*h;
  return {t:"Modeling a non-periodic context",calc:true,stem:`The height (m) of a drone t seconds after launch is modeled by a quadratic H. Values: ${TB(["t",...t],[["H(t)",...t.map(x=>N(P2(x)))]])}`,parts:[
   [`Explain why a quadratic model is appropriate.`,[`First differences ${t.slice(1).map(x=>N(P2(x)-P2(x-1))).join(", ")} decrease by a constant ${2*a}: second differences are constant.`],"",1],
   [`Find H(t) in the form at${sq} + bt + c.`,[`H(t) = ${poly([-a,2*a*h,k]).replace(/x/g,"t")}`],poly([-a,2*a*h,k]).replace(/x/g,"t"),2],
   [`Find the average rate of change of H on [0, 4] and interpret it.`,[`(${N(P2(4))} − ${N(P2(0))})/4 = ${F(P2(4)-P2(0),4)} m/s: the mean climb rate over the first 4 seconds.`],`${F(P2(4)-P2(0),4)} m/s`,2],
   [`When does the drone reach its maximum height? Is the model reasonable for large t?`,[`Vertex at t = ${h}.`,`No: H eventually becomes negative, so the domain must be limited.`],`t = ${h}`,1]]}; }]
};

/* ===== U2 Exponential and logarithmic ===== */
const U2M={
 e0:{grp:"Step 1",c:NAVY,name:"Additive or Multiplicative Change?",hint:"differences vs. ratios",when:"Sequences, tables, models.",rule:"Equal differences over equal steps ⇒ linear/arithmetic. Equal ratios ⇒ exponential/geometric.",ex:[T("3, 7, 11, 15",["+4 each: arithmetic"]),T("3, 6, 12, 24",["×2 each: geometric"])]},
 eseq:{grp:"Sequences",c:ORG,name:"Arithmetic & Geometric Sequences",hint:"aₙ = a₀ + dn, a₀rⁿ",when:"Patterns with a term number.",rule:"Arithmetic: aₙ = a₀ + dn (linear). Geometric: aₙ = a₀rⁿ (exponential).",ex:[T("a₀ = 5, d = 3",["a₁₀ = 35"]),T("a₀ = 2, r = 3",["a₄ = 162"])]},
 eexp:{grp:"Models",c:RED,name:"Exponential Models",hint:"y = abˣ, ae^{kx}",when:"Growth/decay by a constant factor.",rule:"f(x) = abˣ: a = initial value, b = growth factor (b &gt; 1 growth, 0 &lt; b &lt; 1 decay). Percent rate r: b = 1 + r. Two points (x₁, y₁), (x₂, y₂): b = (y₂/y₁)<sup>1/(x₂−x₁)</sup>.",ex:[T("Grows 8% per year from 500",["f(t) = 500(1.08)ᵗ"]),T("Halves every 4 h",["f(t) = A(½)<sup>t/4</sup>"])]},
 elog:{grp:"Logs",c:PURP,name:"Logarithms",hint:"log<sub>b</sub>x = y ⇔ bʸ = x",when:"Solving for an exponent, inverse of exponential.",rule:"Product: log(MN) = log M + log N. Quotient: log(M/N) = log M − log N. Power: log Mᵏ = k log M. Change of base: log<sub>b</sub>x = ln x/ln b.",ex:[T("2ˣ = 32",["x = 5"]),T("log₃ 81",["4"])]},
 einv:{grp:"Composition",c:TEAL,name:"Composition & Inverses",hint:"swap x and y",when:"f(g(x)), f⁻¹.",rule:"(f ∘ g)(x) = f(g(x)). Inverse: swap inputs and outputs; f(f⁻¹(x)) = x. Exponential and log with the same base are inverses.",ex:[T("f(x) = 2x + 3",["f⁻¹(x) = (x − 3)/2"]),T("f(x) = eˣ",["f⁻¹(x) = ln x"])]},
 eend:{grp:"Last step",c:GRN,name:"Check Domain",hint:"log of positive only",when:"Every log equation.",rule:"Arguments of logs must be positive; reject extraneous solutions.",ex:[T("log(x − 2) + log x = log 3",["x = 3 (x = −1 rejected)"]),T("Semi-log plot",["Linear ⇒ exponential data"])]}
};
const U2={id:"u2",num:2,short:"Exponential & Log",name:"Unit 2: Exponential and Logarithmic Functions",sub:"Sequences, exponential models, composition and inverses, logarithms, equations, semi-log plots",c:ORG,
 flow:{M:U2M,label:"Exponential & log flowchart",lead:"Additive change means linear; multiplicative change means exponential.",start:"Exponential/log problem",top:["e0"],q:"What is asked?",cols:[["Sequence","",ORG,["eseq"]],["Model","",RED,["eexp"]],["Solve / simplify","",PURP,["elog"]],["Compose / invert","",TEAL,["einv"]]],end:"eend"},
 sheet:[[ORG,"Sequences",["Arithmetic aₙ = a₀ + dn","Geometric aₙ = a₀rⁿ"],""],[RED,"Exponential",["f(x) = abˣ","Growth b &gt; 1, decay 0 &lt; b &lt; 1","Half-life / doubling time"],""],[PURP,"Log rules",["log(MN) = log M + log N","log(M/N) = log M − log N","log Mᵏ = k log M","log<sub>b</sub>x = ln x/ln b"],""],[TEAL,"Inverses",["f(f⁻¹(x)) = x","bˣ and log<sub>b</sub>x are inverses"],""]],
 gen:[
 ()=>{ const a=R(-9,9),d=nz(-6,6),n=R(5,25); return P("Arithmetic sequences",`a₀ = ${N(a)} and d = ${N(d)}. Find a<sub>${n}</sub>.`,a+d*n,[a+d*(n-1),a*d**1+n,a+n],[`aₙ = a₀ + dn = ${N(a)} + (${N(d)})(${n})`,`<b>${N(a+d*n)}</b>`]); },
 ()=>{ const a=R(1,6),r=pick([2,3,-2]),n=R(3,6); return P("Geometric sequences",`a₀ = ${a}, r = ${N(r)}. Find a<sub>${n}</sub>.`,a*r**n,[a*r**(n-1),a*n*r,a+r*n],[`aₙ = a₀rⁿ = ${a}(${N(r)})<sup>${n}</sup>`,`<b>${N(a*r**n)}</b>`]); },
 ()=>{ const b=pick([2,3,5,10]),e=R(-3,5); const v=b**e; return P("Logarithms",`Evaluate log<sub>${b}</sub>(${v<1?FR(1,b**(-e)):v}).`,e,[-e,v,e+1],[`${b}<sup>${N(e)}</sup> = ${v<1?`1/${b**-e}`:v}`,`<b>${N(e)}</b>`]); },
 ()=>{ const a=R(2,9)*100,p=pick([2,3,4,5,8,10,12]),t=R(2,10); return P("Exponential models",`A population of ${a} grows ${p}% per year. Find the population after ${t} years (nearest whole number).`,Math.round(a*(1+p/100)**t),[Math.round(a*(1+p*t/100)),Math.round(a*(p/100)**t+a),Math.round(a*Math.exp(p*t/100))].filter(x=>x!==Math.round(a*(1+p/100)**t)),[`P(t) = ${a}(1.${String(p).padStart(2,"0")})ᵗ`,`P(${t}) ≈ <b>${Math.round(a*(1+p/100)**t)}</b>`],{tol:1}); },
 ()=>{ const b=pick([2,3,5]),k=R(1,4),c=R(1,20); return P("Exponential equations",`Solve ${b}<sup>x + ${k}</sup> = ${b**(c%5+k+1)}.`,c%5+1,[c%5+k+1,c%5,k],[`${b**(c%5+k+1)} = ${b}<sup>${c%5+k+1}</sup>`,`x + ${k} = ${c%5+k+1} ⇒ <b>x = ${c%5+1}</b>`]); },
 ()=>{ const m=nz(-5,5),c=R(-9,9),y=R(-9,9); return PF("Inverses",`f(x) = ${lin(m,c)}. Find f⁻¹(${N(y)}).`,y-c,m,[F(c-y,m),N(m*y+c),F(m,y-c||1)],[`f⁻¹(x) = (x${sg(-c)})/(${N(m)})`,`f⁻¹(${N(y)}) = <b>${F(y-c,m)}</b>`]); },
 ()=>{ const a=R(2,9),b=R(2,9); return PSX("Log properties",`Which equals log ${a} + log ${b} − log ${a*b}?`,"0",[`log ${a+b-a*b}`,`log ${a*b*a*b}`,"1"],[`log(${a}·${b}/${a*b}) = log 1`,`<b>0</b>`]); }],
 chal:[
 ()=>{ const k=R(1,4); const n=2**k; return P("Log equations",`Solve log₂ x + log₂(x + ${n-1}) = ${k}.`,1,[n,-n,n-1],[`log₂(x(x + ${n-1})) = log₂ ${n} ⇒ x${sq} + ${n-1}x − ${n} = 0`,`(x − 1)(x + ${n}) = 0; x = −${n} is rejected (domain)`,`<b>x = 1</b>`]); },
 ()=>{ const y1=R(2,9)*10,b=pick([2,3]),x2=R(2,4); return P("Exponential through two points",`f(x) = abˣ passes through (0, ${y1}) and (${x2}, ${y1*b**x2}). Find b.`,b,[b**x2,y1,b+1],[`a = ${y1}; ${y1}b<sup>${x2}</sup> = ${y1*b**x2} ⇒ b<sup>${x2}</sup> = ${b**x2}`,`<b>b = ${b}</b>`]); }],
 frq:[()=>{ const a=R(2,8)*100,b=pick([0.8,0.85,0.9,0.75]); const vals=[0,1,2,3].map(t=>+(a*b**t).toFixed(1));
  return {t:"Modeling a non-periodic context: depreciation",calc:true,stem:`The value (dollars) of a laptop t years after purchase: ${TB(["t",0,1,2,3],[["V(t)",...vals.map(N)]])}`,parts:[
   [`Show an exponential model is appropriate.`,[`Ratios V(t + 1)/V(t) ≈ ${b} each year: constant ratio.`],"",1],
   [`Write V(t) = abᵗ.`,[`a = ${a}, b = ${b}`],`V(t) = ${a}(${b})ᵗ`,2],
   [`When does the laptop's value first fall below $${a/4}? (2 decimals)`,[`${b}ᵗ = 0.25 ⇒ t = ln 0.25/ln ${b}`],`t ≈ ${(Math.log(0.25)/Math.log(b)).toFixed(2)} years`,2],
   [`What is the percent decrease per year? Write V with base e.`,[`${Math.round((1-b)*100)}% per year`,`V = ${a}e<sup>${(Math.log(b)).toFixed(4)}t</sup>`],`${Math.round((1-b)*100)}%`,1]]}; },
 ()=>{ const k=R(2,4);
  return {t:"Symbolic manipulation: logs and exponentials",calc:false,stem:`Answer without a calculator.`,parts:[
   [`Solve 3<sup>2x</sup> = 81.`,[`81 = 3⁴ ⇒ 2x = 4`],"x = 2",1],
   [`Rewrite ln(e<sup>${k}</sup>x${sq}) − ln x as a sum of a constant and a single log.`,[`${k} + 2 ln x − ln x = ${k} + ln x`],`${k} + ln x`,2],
   [`Solve log(x) + log(x − 3) = 1.`,[`x(x − 3) = 10 ⇒ (x − 5)(x + 2) = 0; reject −2`],"x = 5",2],
   [`f(x) = 2ˣ − 1. Find f⁻¹(x).`,[`y + 1 = 2ˣ ⇒ x = log₂(y + 1)`],"f⁻¹(x) = log₂(x + 1)",1]]}; }]
};

/* ===== U3 Trigonometric and polar ===== */
const U3M={
 t0:{grp:"Step 1",c:NAVY,name:"Unit Circle First",hint:"(cos θ, sin θ)",when:"Any trig value.",rule:"The point at angle θ on the unit circle is (cos θ, sin θ); tan θ = sin θ/cos θ. Use reference angles and the quadrant signs.",ex:[T("sin(5π/6)",["Reference π/6, QII: ½"]),T("cos(4π/3)",["−½"])]},
 tsin:{grp:"Sinusoids",c:ORG,name:"Sinusoidal Functions",hint:"a sin(b(θ + c)) + d",when:"Graphs and models that repeat.",rule:"Amplitude |a|, period 2π/|b|, midline y = d, phase shift −c. From max M and min m: a = (M − m)/2, d = (M + m)/2.",ex:[T("y = 3 sin(2x) + 1",["Amplitude 3, period π, midline 1"]),T("Max 18, min 4",["a = 7, d = 11"])]},
 teq:{grp:"Equations & inverses",c:RED,name:"Trig Equations & Inverse Trig",hint:"principal values",when:"Solve sin x = k, etc.",rule:"Isolate the trig function, use the unit circle (or arcsin/arccos/arctan for principal values), then add all solutions in the interval (period).",ex:[T("2 sin x = 1 on [0, 2π)",["x = π/6, 5π/6"]),T("arccos(−½)",["2π/3"])]},
 tid:{grp:"Identities",c:PURP,name:"Identities",hint:"Pythagorean, sum, double",when:"Rewrite or simplify.",rule:"sin"+sq+"θ + cos"+sq+"θ = 1; 1 + tan"+sq+"θ = sec"+sq+"θ; sin(α ± β) = sin α cos β ± cos α sin β; sin 2θ = 2 sin θ cos θ; cos 2θ = cos"+sq+"θ − sin"+sq+"θ.",ex:[T("sin θ = 3/5, QI",["cos θ = 4/5"]),T("cos 2θ",["7/25"])]},
 tpol:{grp:"Polar",c:TEAL,name:"Polar Coordinates",hint:"x = r cos θ, y = r sin θ",when:"Polar points and graphs.",rule:"(r, θ) ↔ (x, y): x = r cos θ, y = r sin θ, r"+sq+" = x"+sq+" + y"+sq+". r = a cos(nθ): rose. r = a + b cos θ: limaçon.",ex:[T("(4, π/3)",["(2, 2√3)"]),T("r = 3",["Circle radius 3"])]},
 tend:{grp:"Last step",c:GRN,name:"Check the Interval",hint:"all solutions?",when:"Every equation.",rule:"List every solution in the given interval; check with the graph.",ex:[T("tan x = 1 on [0, 2π)",["π/4 and 5π/4"]),T("Calculator mode",["Radians"])]}
};
const U3={id:"u3",num:3,short:"Trig & Polar",name:"Unit 3: Trigonometric and Polar Functions",sub:"Unit circle, sinusoidal functions and models, tangent, inverse trig, equations, identities, polar coordinates and graphs",c:RED,
 flow:{M:U3M,label:"Trig & polar flowchart",lead:"Start on the unit circle; then pick the tool.",start:"Trig problem",top:["t0"],q:"What is asked?",cols:[["Sinusoid / model","",ORG,["tsin"]],["Equation / inverse","",RED,["teq"]],["Identity","",PURP,["tid"]],["Polar","",TEAL,["tpol"]]],end:"tend"},
 sheet:[[NAVY,"Unit circle",["30°: (√3/2, ½), 45°: (√2/2, √2/2), 60°: (½, √3/2)","Signs: All, Sin, Tan, Cos (QI–QIV)"],""],[ORG,"Sinusoids",["Amplitude |a|, period 2π/|b|","Midline d, phase shift"],""],[PURP,"Identities",["sin"+sq+" + cos"+sq+" = 1","sin 2θ = 2 sin θ cos θ","cos 2θ = 1 − 2 sin"+sq+"θ"],""],[TEAL,"Polar",["x = r cos θ, y = r sin θ","r"+sq+" = x"+sq+" + y"+sq,"tan θ = y/x"],""]],
 gen:[
 ()=>{ const S=pick(UC.slice(1)); const f=pick([["sin",2],["cos",1]]); const ans=S[f[1]]; const all=["0","1","−1","1/2","−1/2","√2/2","−√2/2","√3/2","−√3/2"]; return PSX("Unit circle",`Find ${f[0]}(${S[0]}).`,ans,shuffle(all.filter(x=>x!==ans)),[`Point at ${S[0]}: (${S[1]}, ${S[2]})`,`<b>${ans}</b>`]); },
 ()=>{ const a=nz(-6,6),b=pick([1,2,3,4,"1/2"]),d=R(-5,5); const per=b==="1/2"?"4π":b===1?"2π":b===2?"π":`2π/${b}`; return PSX("Sinusoid features",`What is the period of y = ${N(a)} sin(${b===1?"":b==="1/2"?"x/2":b+"x"}${b==="1/2"?"":b===1?"x":""})${sg(d)}?`.replace("sin(x/2x)","sin(x/2)"),per,["2π","π","4π","π/2","2π/3"].filter(x=>x!==per),[`Period = 2π/|b|`,`<b>${per}</b>`]); },
 ()=>{ const M=R(10,30),m=M-2*R(2,8); return P("Sinusoid from max and min",`A sinusoid has maximum ${M} and minimum ${N(m)}. Find the amplitude.`,(M-m)/2,[(M+m)/2,M-m,M],[`(M − m)/2 = (${M} − (${N(m)}))/2`,`<b>${(M-m)/2}</b>`]); },
 ()=>{ const S=pick([["1/2","π/6, 5π/6"],["−1/2","7π/6, 11π/6"],["√2/2","π/4, 3π/4"],["1","π/2"],["√3/2","π/3, 2π/3"]]); const all=["π/6, 5π/6","7π/6, 11π/6","π/4, 3π/4","π/2","π/3, 2π/3","π/6, 11π/6"]; return PSX("Trig equations",`Solve sin x = ${S[0]} on [0, 2π).`,S[1],shuffle(all.filter(x=>x!==S[1])),[`Unit circle: y-coordinate ${S[0]}`,`<b>x = ${S[1]}</b>`]); },
 ()=>{ const [a,b,c]=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25]]); const w=pick(["cos","tan"]); return PF("Identities",`sin θ = ${a}/${c} and θ is in Quadrant I. Find ${w} θ.`,w==="cos"?b:a,w==="cos"?c:b,[F(a,b),F(b,a),F(b,c)].filter(x=>x!==F(w==="cos"?b:a,w==="cos"?c:b)),[`cos θ = √(1 − ${a*a}/${c*c}) = ${b}/${c}`,`<b>${w} θ = ${F(w==="cos"?b:a,w==="cos"?c:b)}</b>`]); },
 ()=>{ const r=R(2,8),S=pick([["π/3","r/2","√3·r/2",.5],["π/6","√3·r/2","r/2",Math.sqrt(3)/2],["π","−r","0",-1],["π/2","0","r",0]]); return P("Polar to rectangular",`Convert (${r}, ${S[0]}) to rectangular. Give x (3 decimals).`,r3(r*S[3]),[r3(r*Math.sqrt(1-S[3]*S[3])),r,r3(-r*S[3])].filter(v=>v!==r3(r*S[3])),[`x = r cos θ = ${r} cos(${S[0]})`,`<b>${N(r3(r*S[3]))}</b>`],{tol:.002}); },
 ()=>{ const S=pick([["arcsin(1/2)","π/6"],["arccos(1/2)","π/3"],["arctan(1)","π/4"],["arcsin(−1/2)","−π/6"],["arccos(−1/2)","2π/3"],["arctan(−√3)","−π/3"]]); return PSX("Inverse trig",`Evaluate ${S[0]}.`,S[1],["π/6","π/3","π/4","−π/6","2π/3","−π/3","5π/6"].filter(x=>x!==S[1]).slice(0,4),[`Principal value range`,`<b>${S[1]}</b>`]); }],
 chal:[
 ()=>{ const [a,b,c]=pick([[3,4,5],[5,12,13],[8,15,17]]); return PF("Double angle",`sin θ = ${a}/${c}, θ in Quadrant I. Find sin 2θ.`,2*a*b,c*c,[F(a*b,c*c),F(2*a,c),F(c*c-2*a*a,c*c)],[`sin 2θ = 2 sin θ cos θ = 2(${a}/${c})(${b}/${c})`,`<b>${F(2*a*b,c*c)}</b>`]); },
 ()=>{ const n=R(2,5),a=R(2,6); return PSX("Polar graphs",`How many petals does r = ${a} cos(${n}θ) have?`,String(n%2?n:2*n),[String(n),String(2*n+1),String(n%2?2*n:n)].filter(x=>x!==String(n%2?n:2*n)),[`r = a cos(nθ): n petals if n is odd, 2n if n is even`,`<b>${n%2?n:2*n}</b>`]); },
 ()=>{ const M=R(14,22),m=R(4,10),P0=pick([12,24,365]); const a=(M-m)/2,d=(M+m)/2; return PSX("Sinusoidal models",`Daylight varies between ${m} and ${M} hours over ${P0===365?"a year (365 days)":P0+" hours"}, with the maximum at t = 0. Which model fits?`,`h(t) = ${N(a)} cos(2πt/${P0}) + ${N(d)}`,[`h(t) = ${N(a)} sin(2πt/${P0}) + ${N(d)}`,`h(t) = ${N(d)} cos(2πt/${P0}) + ${N(a)}`,`h(t) = ${N(a)} cos(${P0}t) + ${N(d)}`],[`Max at t = 0 ⇒ cosine; a = ${N(a)}, d = ${N(d)}, b = 2π/${P0}`]); }],
 frq:[()=>{ const M=R(30,60),m=R(2,10),Pd=pick([4,6,8,12]); const a=(M-m)/2,d=(M+m)/2;
  return {t:"Modeling a periodic context: Ferris wheel",calc:true,stem:`A seat on a Ferris wheel is at its lowest point, ${m} m above the ground, at t = 0 minutes. It reaches its highest point, ${M} m, every ${Pd} minutes.`,parts:[
   [`Find the amplitude, midline and period.`,[`Amplitude ${N(a)}, midline y = ${N(d)}, period ${Pd}`],"",2],
   [`Write h(t) using cosine.`,[`Minimum at t = 0 ⇒ −cos: h(t) = −${N(a)} cos(2πt/${Pd}) + ${N(d)}`],`h(t) = −${N(a)} cos(2πt/${Pd}) + ${N(d)}`,2],
   [`Find h(1) (3 decimals).`,[`−${N(a)} cos(2π/${Pd}) + ${N(d)}`],N(r3(-a*Math.cos(2*Math.PI/Pd)+d)),1],
   [`On [0, ${Pd}], when is the seat above ${N(d)} m? Is h increasing or decreasing there at an increasing rate on [0, ${Pd/4}]?`,[`Above the midline for ${Pd/4} &lt; t &lt; ${3*Pd/4}.`,`On (0, ${Pd/4}) h increases and is concave up: increasing at an increasing rate.`],`${Pd/4} &lt; t &lt; ${3*Pd/4}`,2]]}; },
 ()=>({t:"Symbolic manipulation: trig",calc:false,stem:`Answer without a calculator.`,parts:[
   [`Solve 2 cos x + 1 = 0 on [0, 2π).`,[`cos x = −½`],"x = 2π/3, 4π/3",2],
   [`Rewrite sin(2x)/(1 + cos 2x) as a single trig function.`,[`2 sin x cos x/(2 cos${sq}x) = tan x`],"tan x",2],
   [`Find the exact value of sin(π/12) using a difference identity.`,[`sin(π/3 − π/4) = (√3/2)(√2/2) − (½)(√2/2)`],"(√6 − √2)/4",2]]})]
};

/* ===== U4 Parameters, vectors, matrices ===== */
const U4M={
 v0:{grp:"Step 1",c:NAVY,name:"What Kind of Object?",hint:"parametric, vector, matrix",when:"Every Unit 4 problem.",rule:"Parametric: x(t), y(t) describe motion. Vectors: magnitude and direction. Matrices: systems and transformations.",ex:[T("x = 2t, y = t"+sq,["Parametric parabola"]),T("⟨3, 4⟩",["Vector, length 5"])]},
 vpar:{grp:"Parametric",c:ORG,name:"Parametric Functions",hint:"eliminate t",when:"Position as a function of time.",rule:"Eliminate t to find the path. Average rate of change of x and y separately. Implicit curves: conics x"+sq+"/a"+sq+" + y"+sq+"/b"+sq+" = 1.",ex:[T("x = 3 cos t, y = 3 sin t",["Circle radius 3"]),T("x = t + 1, y = 2t",["y = 2x − 2"])]},
 vvec:{grp:"Vectors",c:RED,name:"Vectors",hint:"|v| = √(a² + b²)",when:"Magnitude, direction, dot product.",rule:"|⟨a, b⟩| = √(a"+sq+" + b"+sq+"). Unit vector v/|v|. u · v = |u||v|cos θ; ⊥ ⇔ u · v = 0.",ex:[T("⟨3, 4⟩",["|v| = 5"]),T("⟨1, 2⟩ · ⟨2, −1⟩",["0: perpendicular"])]},
 vmat:{grp:"Matrices",c:PURP,name:"Matrices & Transformations",hint:"det, inverse",when:"Systems, linear transformations, state models.",rule:"det[a b; c d] = ad − bc. Inverse exists ⇔ det ≠ 0. A matrix maps vectors: rotation, reflection, dilation. |det| = area scale factor. State transitions: next = A·current.",ex:[T("[2 1; 5 3]",["det 1"]),T("Rotate 90°",["[0 −1; 1 0]"])]},
 vend:{grp:"Last step",c:GRN,name:"Interpret",hint:"context",when:"Every answer.",rule:"Say what the number means: speed, direction, area scale, long-run state.",ex:[T("det = 3",["Areas triple"]),T("Steady state",["A·v = v"])]}
};
const U4={id:"u4",num:4,short:"Vectors & Matrices",label:"Unit 4",name:"Unit 4: Functions Involving Parameters, Vectors, and Matrices",sub:"Parametric functions, implicit curves and conics, vectors, matrices, linear transformations (not assessed on the AP exam)",c:PURP,
 flow:{M:U4M,label:"Parameters, vectors & matrices flowchart",lead:"Identify the object, then use its tools.",start:"Unit 4 problem",top:["v0"],q:"Which object?",cols:[["Parametric","",ORG,["vpar"]],["Vector","",RED,["vvec"]],["Matrix","",PURP,["vmat"]]],end:"vend"},
 sheet:[[ORG,"Parametric",["Eliminate t","Conics: ellipse, hyperbola, parabola"],""],[RED,"Vectors",["|v| = √(a"+sq+" + b"+sq+")","u · v = a₁a₂ + b₁b₂"],""],[PURP,"Matrices",["det = ad − bc","A⁻¹ = (1/det)[d −b; −c a]","|det| = area scale"],""]],
 gen:[
 ()=>{ const [a,b,c]=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17]]),s=pick([1,-1]); return P("Vectors",`Find |⟨${N(s*a)}, ${b}⟩|.`,c,[a+b,c*c,b-a],[`√(${a*a} + ${b*b})`,`<b>${c}</b>`]); },
 ()=>{ const u=[R(-5,5),R(-5,5)],v=[R(-5,5),R(-5,5)]; const d=u[0]*v[0]+u[1]*v[1]; return P("Dot product",`Find ⟨${u.map(N).join(", ")}⟩ · ⟨${v.map(N).join(", ")}⟩.`,d,[u[0]*v[1]-u[1]*v[0],-d,u[0]+v[0]].filter(x=>x!==d),[`(${N(u[0])})(${N(v[0])}) + (${N(u[1])})(${N(v[1])})`,`<b>${N(d)}</b>`]); },
 ()=>{ const A=[[R(-5,5),R(-5,5)],[R(-5,5),R(-5,5)]]; const d=A[0][0]*A[1][1]-A[0][1]*A[1][0]; return P("Determinants",`Find det ${MX(A)}.`,d,[A[0][0]*A[1][1]+A[0][1]*A[1][0],-d,A[0][0]+A[1][1]].filter(x=>x!==d),[`ad − bc`,`<b>${N(d)}</b>`]); },
 ()=>{ const m=nz(-4,4),k=nz(-5,5); return PSX("Parametric functions",`x = t + 1, y = ${X(m,"t")}${sg(k)}. Eliminate t.`,`y = ${X(m)}${sg(k-m)}`,[`y = ${X(m)}${sg(k)}`,`y = ${X(m)}${sg(k+m)}`,`x = ${X(m,"y")}${sg(k)}`],[`t = x − 1 ⇒ y = ${N(m)}(x − 1)${sg(k)}`,`<b>y = ${X(m)}${sg(k-m)}</b>`]); },
 ()=>{ const A=[[R(-4,4),R(-4,4)],[R(-4,4),R(-4,4)]],a=R(1,6); const d=Math.abs(A[0][0]*A[1][1]-A[0][1]*A[1][0]); return P("Area scaling",`A region of area ${a} is transformed by ${MX(A)}. New area?`,d*a,[d,a,d*a*2].filter(x=>x!==d*a),[`|det| = ${d}`,`<b>${d*a}</b>`]); }],
 chal:[
 ()=>{ const p=pick([[0.8,0.2,0.3,0.7]]); const [a,b,c,d]=p[0]?p:[.8,.2,.3,.7]; return PSX("Transition matrices",`Each week 80% of A-shoppers stay at A (20% switch to B) and 70% of B-shoppers stay at B (30% switch). In the long run, what fraction shop at A?`,"3/5",["1/2","2/5","4/5"],[`Steady state: 0.2A = 0.3B with A + B = 1`,`A = 0.6 = <b>3/5</b>`]); },
 ()=>{ const a=R(2,6),b=R(2,6); if(a===b) return null; return PSX("Conics",`What curve is x${sq}/${a*a} + y${sq}/${b*b} = 1?`,`An ellipse with intercepts ±${a} and ±${b}`,[`A hyperbola`,`A circle of radius ${a}`,`A parabola`],[`Sum of squares over different positive constants = 1: ellipse`]); }],
 frq:[()=>{ const A=[[R(1,3),R(0,2)],[R(0,2),R(1,3)]]; const d=A[0][0]*A[1][1]-A[0][1]*A[1][0]; if(!d) return null; const v=[R(1,4),R(1,4)]; const Av=[A[0][0]*v[0]+A[0][1]*v[1],A[1][0]*v[0]+A[1][1]*v[1]];
  return {t:"Matrices as transformations",calc:false,stem:`Let A = ${MX(A)} and v = ⟨${v.join(", ")}⟩.`,parts:[
   [`Find Av.`,[`⟨${Av.join(", ")}⟩`],`⟨${Av.join(", ")}⟩`,1],
   [`Find det A and A⁻¹.`,[`det A = ${d}`,`A⁻¹ = ${FR(1,d)}${MX([[A[1][1],-A[0][1]],[-A[1][0],A[0][0]]])}`],"",2],
   [`The unit square is transformed by A. What is the area of its image?`,[`|det A| = ${Math.abs(d)}`],N(Math.abs(d)),1],
   [`Find |Av| (exact).`,[`√(${Av[0]**2} + ${Av[1]**2})`],`√${Av[0]**2+Av[1]**2}`,1]]}; }]
};

const units=[U1,U2,U3,U4];
const wrap=g=>()=>{ for(let i=0;i<20;i++){ const p=g(); if(p) return p; } return g(); };
units.forEach(u=>{ ["gen","chal","frq"].forEach(k=>u[k]=(u[k]||[]).filter(Boolean).map(wrap)); });
units.push({id:"review",num:5,label:"Exam review",short:"AP Exam Review",name:"AP Exam Review: Mixed Practice",sub:"Mixed questions and the four FRQ task models from Units 1–3 (Unit 4 is not on the AP exam). New each time.",c:"#111",
  sheet:units.map(u=>[u.c,u.short,u.sheet[0][2],""]),gen:units.slice(0,3).flatMap(u=>u.gen),chal:units.slice(0,3).flatMap(u=>u.chal),frq:units.slice(0,3).flatMap(u=>u.frq)});

/* released AP Precalculus FRQs (official AP Central PDFs) */
const AC="https://apcentral.collegeboard.org/media/pdf/";
window.ZREL={pc:[
 {y:"2026",q:1,t:"Composition, inverses and limits of graphed functions",u:[1,2]},{y:"2026",q:2,t:"Car value: exponential model and average rates",u:[2]},{y:"2026",q:3,t:"Waterwheel height: sinusoidal model and concavity",u:[3]},{y:"2026",q:4,t:"Solving exponential, logarithmic and trig expressions",u:[2,3]},
 {y:"2025",q:1,t:"Composite functions, limits, exponential model",u:[1,2]},{y:"2025",q:2,t:"Song plays: quadratic model from data",u:[1]},{y:"2025",q:3,t:"Guitar string vibration: sinusoidal model",u:[3]},{y:"2025",q:4,t:"Log, trig and exponential equations",u:[2,3]},
 {y:"2024",q:1,t:"Composition, inverses, exponential end behavior",u:[1,2]},{y:"2024",q:2,t:"Video game sales: logarithmic model",u:[2]},{y:"2024",q:3,t:"Rolling tire height: sinusoidal model",u:[3]},{y:"2024",q:4,t:"Logs, inverse trig and trig identities",u:[2,3]}],
 links:{pc:{
  "2026":{"Questions":AC+"ap26-frq-precalculus.pdf"},
  "2025":{"Questions":AC+"ap25-frq-precalculus.pdf","Q1 scoring + samples":AC+"ap25-apc-precalculus-q1.pdf","Q2 scoring + samples":AC+"ap25-apc-precalculus-q2.pdf","Q3 scoring + samples":AC+"ap25-apc-precalculus-q3.pdf","Q4 scoring + samples":AC+"ap25-apc-precalculus-q4.pdf","Chief Reader report":AC+"ap25-cr-report-precalculus.pdf"},
  "2024":{"Scoring guidelines (with questions)":AC+"ap24-sg-precalculus.pdf","Q1 samples":AC+"ap24-precalculus-student-samples-frq-1.pdf","Q2 samples":AC+"ap24-precalculus-student-samples-frq-2.pdf","Q3 samples":AC+"ap24-precalculus-student-samples-frq-3.pdf","Q4 samples":AC+"ap24-precalculus-student-samples-frq-4.pdf","Chief Reader report":AC+"ap24-cr-report-precalculus.pdf"}}},
 res:{pc:"https://apcentral.collegeboard.org/courses/ap-precalculus/exam/past-exam-questions"}};
units.push({id:"released",num:0,label:"Released FRQs",short:"Released FRQs",name:"Released AP Precalculus Free-Response Questions (2024–2026)",sub:"Every released AP Precalculus FRQ, with official questions, scoring guidelines and sample responses",c:BRN,relAll:1,gen:[],chal:[],frq:[],
 sheet:[[BRN,"The four FRQ task models",["Q1 Function concepts (calculator)","Q2 Modeling a non-periodic context (calculator)","Q3 Modeling a periodic context (no calculator)","Q4 Symbolic manipulation (no calculator)"],`<a href="https://apcentral.collegeboard.org/courses/ap-precalculus/exam/past-exam-questions" target="_blank" rel="noopener">AP Central: AP Precalculus past exam questions</a>`]]});
window.ZC={units,relKey:"pc",relName:"AP Precalculus",relYears:"2024–2026",relArchive:"AP Central: AP Precalculus past exam questions",strands:[["AP exam units",NAVY,["u1","u2","u3"]],["Beyond the exam",PURP,["u4"]],["Exam prep","#111",["review","released"]]],mapNote:"Units 1–3 are on the AP exam; Unit 4 is taught but not assessed."};
})();
