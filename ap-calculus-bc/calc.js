/* Z-Calculus content: AP Calculus AB (units 1–8) and BC (units 1–10 plus BC topics). Every answer is computed. */
(function(){
const {R,pick,nz,gcd,shuffle,C,fact,N,F,sq,cu,X,sg,poly,P,PF,PS}=window.ZH;
const BC=window.ZCID==="bc";
const B=f=>{ f.bc=1; return f; };
const FR=(n,d)=>`<span class="frc"><span>${n}</span><span>${d}</span></span>`;
const lim=a=>`lim<sub>x→${a}</sub>`, ig=(a,b)=>`∫<sub>${a}</sub><sup>${b}</sup>`;
const pw=(b,e)=>e===1?b:`${b}<sup>${e}</sup>`;
const der=c=>c.slice(0,-1).map((a,i)=>a*(c.length-1-i));
const ev=(c,x)=>c.reduce((s,a)=>s*x+a,0);
const mul=(a,b)=>{ const r=Array(a.length+b.length-1).fill(0); a.forEach((x,i)=>b.forEach((y,j)=>r[i+j]+=x*y)); return r; };
// exact ∫_a^b of a polynomial (degree ≤ 4): returns [num, den]
function intP(c,a,b){ const n=c.length-1; let num=0, den=60; c.forEach((k,i)=>{ const p=n-i; num+=k*(b**(p+1)-a**(p+1))*den/(p+1); }); return [Math.round(num),den]; }
const r2=x=>+x.toFixed(2), r3=x=>+x.toFixed(3);
const T3=[[3,4,5],[5,12,13],[6,8,10],[8,15,17]];
const NAVY="#1d4e89",ORG="#c2571a",RED="#c23a52",PURP="#6a3d9a",TEAL="#0f7a6c",GRN="#137333",BLU="#1f4fd1",BRN="#7a5a12";
const T=(...r)=>r;
const flow=(o)=>{ if(!BC){ o.cols=o.cols.map(c=>[c[0],c[1],c[2],c[3].filter(k=>!o.M[k].bc)]).filter(c=>c[3].length); } return o; };

/* ======================= UNIT 1: Limits and Continuity ======================= */
const U1M={
 l1:{grp:"Step 1",c:NAVY,name:"Try Direct Substitution",hint:"plug in first",when:"Every limit.",rule:"Substitute x = a. A real number means you're done. k/0 (k ≠ 0) means a vertical asymptote: check one-sided limits. 0/0 is indeterminate: simplify first.",
  ex:[T(lim(2)+" (x"+sq+" + 3x)",["4 + 6 = <b>10</b>"]),T(lim(3)+" "+FR("x"+sq+" − 9","x − 3"),["3"+sq+" − 9 over 3 − 3 = 0/0: indeterminate, so simplify."])]},
 lfac:{grp:"0/0",c:ORG,name:"Factor and Cancel",hint:"polynomials",when:"0/0 with polynomials.",rule:"Factor the top and bottom, cancel the common factor, then substitute again.",
  ex:[T(lim(3)+" "+FR("x"+sq+" − 9","x − 3"),["(x − 3)(x + 3)/(x − 3) = x + 3","<b>6</b>"]),T(lim(-2)+" "+FR("x"+sq+" + 5x + 6","x + 2"),["(x + 2)(x + 3)/(x + 2) = x + 3","<b>1</b>"])]},
 lconj:{grp:"0/0",c:ORG,name:"Multiply by the Conjugate",hint:"square roots",when:"0/0 with a square root.",rule:"Multiply the top and bottom by the conjugate, simplify, cancel, substitute.",
  ex:[T(lim(0)+" "+FR("√(x + 9) − 3","x"),["× (√(x + 9) + 3): "+FR("x","x(√(x + 9) + 3)"),"= "+FR(1,"√(x + 9) + 3")+" → <b>"+FR(1,6)+"</b>"]),T(lim(4)+" "+FR("√x − 2","x − 4"),["x − 4 = (√x − 2)(√x + 2), so "+FR(1,"√x + 2"),"<b>"+FR(1,4)+"</b>"])]},
 ltrig:{grp:"0/0",c:ORG,name:"Special Trig Limits",hint:"sin x / x → 1",when:"0/0 with sine or cosine near 0.",rule:lim(0)+" "+FR("sin x","x")+" = 1 and "+lim(0)+" "+FR("1 − cos x","x")+" = 0. Rewrite to match these.",
  ex:[T(lim(0)+" "+FR("sin 5x","x"),["5 · "+FR("sin 5x","5x"),"<b>5</b>"]),T(lim(0)+" "+FR("sin 3x","sin 2x"),["(3x·1)/(2x·1)","<b>"+FR(3,2)+"</b>"])]},
 linf:{grp:"x → ∞",c:PURP,name:"Limits at Infinity",hint:"compare degrees",when:"x → ±∞ with a rational function.",rule:"Top degree &lt; bottom → 0. Equal degrees → ratio of leading coefficients. Top &gt; bottom → ±∞ (no horizontal asymptote).",
  ex:[T(lim("∞")+" "+FR("3x"+sq+" + 1","2x"+sq+" − x"),["Same degree","<b>"+FR(3,2)+"</b>"]),T(lim("∞")+" "+FR("5x","x"+sq+" + 1"),["Bottom degree is larger","<b>0</b>"])]},
 lone:{grp:"Piecewise",c:TEAL,name:"One-Sided Limits",hint:"left vs. right",when:"Piecewise functions, absolute values, jumps.",rule:"The limit exists only if the left-hand and right-hand limits are equal.",
  ex:[T("f(x) = x + 1 for x &lt; 2, 2x − 1 for x ≥ 2. "+lim(2)+" f(x)?",["Left: 3. Right: 3.","<b>3</b>"]),T(lim(0)+" "+FR("|x|","x"),["Left −1, right 1","<b>Does not exist</b>"])]},
 lcont:{grp:"Continuity",c:BLU,name:"Continuity & IVT",hint:"three conditions",when:"“Is f continuous at a?” or “find k”.",rule:"Continuous at a: f(a) exists, the limit exists, and they are equal. IVT: if f is continuous on [a, b], it takes every value between f(a) and f(b).",
  ex:[T("kx + 1 for x &lt; 2; x"+sq+" + k for x ≥ 2",["Match at x = 2: 2k + 1 = 4 + k","<b>k = 3</b>"]),T("f(1) = −2, f(3) = 5, f continuous",["IVT: f(c) = 0 for some c in (1, 3)"])]},
 lend:{grp:"Last step",c:GRN,name:"Write the Answer",hint:"number, ±∞ or DNE",when:"Every limit.",rule:"Give a number, ±∞ (unbounded in one direction) or DNE (sides disagree). Name the theorem if you used one.",
  ex:[T(lim(0)+" "+FR(1,"x"+sq),["Both sides → +∞","<b>∞</b>"]),T(lim(0)+" "+FR(1,"x"),["−∞ from the left, +∞ from the right","<b>DNE</b>"])]}
};
const U1={id:"u1",num:1,short:"Limits & Continuity",name:"Unit 1: Limits and Continuity",sub:"Evaluating limits, one-sided limits, limits at infinity, continuity, IVT",c:NAVY,
 flow:flow({M:U1M,label:"Limits flowchart",lead:"How to evaluate a limit. Start with direct substitution and follow the result.",start:"Find the limit",top:["l1"],q:"What did substitution give?",
  cols:[["0/0","indeterminate",ORG,["lfac","lconj","ltrig"]],["x → ±∞","",PURP,["linf"]],["Piecewise","",TEAL,["lone"]],["Continuity","",BLU,["lcont"]]],end:"lend"}),
 sheet:[[NAVY,"Limit laws",["Sum, difference, product, quotient (bottom ≠ 0) of limits","Direct substitution works for polynomials and continuous functions","0/0 is indeterminate: simplify, never stop there"],""],
  [ORG,"Algebra tricks",["Factor and cancel","Conjugates for square roots","Common denominators for complex fractions"],lim(3)+" (x"+sq+" − 9)/(x − 3) = 6"],
  [RED,"Special limits",[lim(0)+" sin x / x = 1",lim(0)+" (1 − cos x)/x = 0",lim("∞")+" (1 + 1/x)<sup>x</sup> = e"],lim(0)+" sin 4x / x = 4"],
  [PURP,"Asymptotes",["Horizontal: "+lim("±∞")+" f(x) = L","Vertical: f(x) → ±∞ as x → a","Compare degrees for rational functions"],""],
  [TEAL,"Continuity",["f(a) defined","lim f(x) exists","lim f(x) = f(a)","Types: removable (hole), jump, infinite"],""],
  [BLU,"Intermediate Value Theorem",["f continuous on [a, b]","N between f(a) and f(b) ⇒ f(c) = N for some c in (a, b)"],"f(1) &lt; 0 &lt; f(2) ⇒ a root in (1, 2)"]],
 gen:[
 ()=>{ const a=nz(-5,5),b=nz(-6,6); if(a===-b) return null; return P("Factoring",`${lim(a)} ${FR(poly([1,b-a,-a*b]),"x"+sg(-a))}`,a+b,[b,a,0],[`Substitution gives 0/0.`,`Factor: (x${sg(-a)})(x${sg(b)}) / (x${sg(-a)}) = x${sg(b)}`,`Substitute x = ${N(a)}: <b>${N(a+b)}</b>`]); },
 ()=>{ const p=nz(-6,6),q=nz(1,7),c=R(-5,5),d=R(-5,5); return PF("Limits at infinity",`${lim("∞")} ${FR(poly([p,c,1]),poly([q,d,-2]))}`,p,q,[F(q,p),"0","∞"],[`Same degree on top and bottom (2).`,`Ratio of leading coefficients: <b>${F(p,q)}</b>`]); },
 ()=>{ const k=nz(1,9),m=nz(1,6); return PF("Trig limits",`${lim(0)} ${FR(`sin(${k}x)`,`${m===1?"":m}x`)}`,k,m,[F(m,k),"1","0"],[`Rewrite: ${FR(k,m)} · ${FR(`sin(${k}x)`,`${k}x`)}`,`${FR(`sin(${k}x)`,`${k}x`)} → 1, so the limit is <b>${F(k,m)}</b>`]); },
 ()=>{ const a=pick([2,3,-1,-2,4]),k=nz(-4,5); const b=a*a+k-k*a; return P("Continuity",`f(x) = kx${sg(b)} for x &lt; ${N(a)} and f(x) = x${sq} + k for x ≥ ${N(a)}. Find the value of k that makes f continuous.`,k,[k+1,b,a*a],[`Left: k(${N(a)})${sg(b)}. Right: ${N(a*a)} + k.`,`${N(a)}k${sg(b)} = ${N(a*a)} + k, so ${a-1===1?"":N(a-1)}k = ${N(a*a-b)}`,`<b>k = ${N(k)}</b>`]); },
 ()=>{ const a=R(-3,4),c=R(-5,5),d=R(-5,5); return P("One-sided limits",`f(x) = x${sg(c)} for x &lt; ${N(a)} and f(x) = 2x${sg(d)} for x ≥ ${N(a)}. Find ${lim(N(a)+"<sup>−</sup>")} f(x).`,a+c,[2*a+d,c,a],[`From the left use x${sg(c)}.`,`${N(a)}${sg(c)} = <b>${N(a+c)}</b>`]); },
 ()=>{ const m=R(2,6); return PF("Conjugates",`${lim(0)} ${FR(`√(x + ${m*m}) − ${m}`,"x")}`,1,2*m,[F(1,m),"0",F(m,2)],[`Multiply by √(x + ${m*m}) + ${m}: ${FR("x",`x(√(x + ${m*m}) + ${m})`)}`,`= ${FR(1,`√(x + ${m*m}) + ${m}`)} → <b>${F(1,2*m)}</b>`]); }],
 chal:[
 ()=>{ const k=nz(-8,8); return PF("Limits at infinity",`${lim("∞")} (√(x${sq}${sg(k)}x) − x)`,k,2,[N(k),"0","∞"],[`Multiply by the conjugate: ${FR(`${N(k)}x`,`√(x${sq}${sg(k)}x) + x`)}`,`Divide by x: ${FR(N(k),`√(1 + ${N(k)}/x) + 1`)} → <b>${F(k,2)}</b>`]); },
 ()=>{ const a=nz(-5,5),b=nz(-5,5); if(a===b) return null; return P("Removable discontinuity",`f(x) = ${FR(poly([1,-(a+b),a*b]),"x"+sg(-a))}. What y-value should fill the hole at x = ${N(a)}?`,a-b,[a+b,b-a,0],[`Cancel: f(x) = x${sg(-b)} for x ≠ ${N(a)}`,`Hole at (${N(a)}, <b>${N(a-b)}</b>)`]); },
 ()=>{ const n=R(2,5),a=R(1,3); return P("Derivative as a limit",`${lim(N(a))} ${FR(`x<sup>${n}</sup> − ${a**n}`,`x − ${a}`)}`,n*a**(n-1),[a**n,n,n*a**n],[`This is f′(${a}) for f(x) = x<sup>${n}</sup> (or factor).`,`f′(${a}) = ${n}·${a}<sup>${n-1}</sup> = <b>${n*a**(n-1)}</b>`]); }]
};

/* ======================= UNIT 2: Differentiation basics ======================= */
const U2M={
 d0:{grp:"Step 1",c:NAVY,name:"Identify the Structure",hint:"sum, product or quotient?",when:"Before differentiating.",rule:"Rewrite roots and fractions as powers first (√x = x<sup>1/2</sup>, 1/x"+sq+" = x<sup>−2</sup>). Then look at the main operation.",
  ex:[T("y = 3√x + 2/x",["y = 3x<sup>1/2</sup> + 2x<sup>−1</sup>, a sum of powers"]),T("y = x"+sq+" sin x",["A product"])]},
 dpow:{grp:"Sum of terms",c:ORG,name:"Power, Constant & Sum Rules",hint:"nx<sup>n−1</sup>",when:"Polynomials and powers.",rule:"d/dx[x<sup>n</sup>] = nx<sup>n−1</sup>. Constants: 0. Sums: differentiate term by term.",
  ex:[T("y = 4x"+cu+" − 5x + 7",["<b>y′ = 12x"+sq+" − 5</b>"]),T("y = 3x<sup>1/2</sup>",["<b>y′ = "+FR(3,"2√x")+"</b>"])]},
 dprod:{grp:"Product",c:RED,name:"Product Rule",hint:"f′g + fg′",when:"Two factors multiplied.",rule:"(fg)′ = f′g + fg′.",
  ex:[T("y = x"+sq+" sin x",["<b>y′ = 2x sin x + x"+sq+" cos x</b>"]),T("y = (x + 1)(x"+sq+" − 3)",["1·(x"+sq+" − 3) + (x + 1)(2x) = <b>3x"+sq+" + 2x − 3</b>"])]},
 dquot:{grp:"Quotient",c:PURP,name:"Quotient Rule",hint:"(f′g − fg′)/g²",when:"One function divided by another.",rule:"(f/g)′ = "+FR("f′g − fg′","g"+sq)+". “Low d-high minus high d-low, over low squared.”",
  ex:[T("y = "+FR("x","x + 1"),["<b>"+FR(1,"(x + 1)"+sq)+"</b>"]),T("y = "+FR("sin x","x"),["<b>"+FR("x cos x − sin x","x"+sq)+"</b>"])]},
 dtrig:{grp:"Special functions",c:TEAL,name:"Trig, e<sup>x</sup> and ln x",hint:"memorize six",when:"Basic transcendental functions.",rule:"(sin x)′ = cos x, (cos x)′ = −sin x, (tan x)′ = sec"+sq+"x, (e<sup>x</sup>)′ = e<sup>x</sup>, (ln x)′ = 1/x, (a<sup>x</sup>)′ = a<sup>x</sup> ln a.",
  ex:[T("y = 3 sin x − e<sup>x</sup>",["<b>y′ = 3 cos x − e<sup>x</sup></b>"]),T("y = ln x at x = 2",["<b>"+FR(1,2)+"</b>"])]},
 ddef:{grp:"Definition",c:BLU,name:"Limit Definition",hint:"f′(a) = lim (f(a+h) − f(a))/h",when:"“Use the definition”, or a limit that is a derivative in disguise.",rule:"f′(a) = "+"lim<sub>h→0</sub> "+FR("f(a + h) − f(a)","h")+". Recognize it, then just differentiate.",
  ex:[T("lim<sub>h→0</sub> "+FR("(2 + h)"+cu+" − 8","h"),["f′(2) for f(x) = x"+cu,"<b>12</b>"]),T("lim<sub>h→0</sub> "+FR("sin(π + h) − sin π","h"),["f′(π) for sin x","<b>cos π = −1</b>"])]},
 dtan:{grp:"Last step",c:GRN,name:"Tangent Line",hint:"y − f(a) = f′(a)(x − a)",when:"“Write the tangent line”.",rule:"Point (a, f(a)) and slope f′(a): y − f(a) = f′(a)(x − a).",
  ex:[T("f(x) = x"+sq+" at x = 3",["f(3) = 9, f′(3) = 6","<b>y − 9 = 6(x − 3)</b>"]),T("Normal line",["Slope −1/f′(a)"])]}
};
const U2={id:"u2",num:2,short:"Derivatives: Rules",name:"Unit 2: Differentiation: Definition and Fundamental Properties",sub:"The definition of the derivative, power, product and quotient rules, trig and exponential derivatives, tangent lines",c:ORG,
 flow:flow({M:U2M,label:"Derivative rules flowchart",lead:"Which derivative rule? Rewrite first, then look at the structure.",start:"Find f′(x)",top:["d0"],q:"What is the structure?",
  cols:[["Sum of powers","",ORG,["dpow"]],["Product","",RED,["dprod"]],["Quotient","",PURP,["dquot"]],["Trig, eˣ, ln","",TEAL,["dtrig"]],["Definition","",BLU,["ddef"]]],end:"dtan"}),
 sheet:[[NAVY,"Definition",["f′(a) = lim<sub>h→0</sub> (f(a + h) − f(a))/h","Differentiable ⇒ continuous (not the reverse)","Not differentiable: corner, cusp, vertical tangent, discontinuity"],""],
  [ORG,"Basic rules",["(c)′ = 0, (x<sup>n</sup>)′ = nx<sup>n−1</sup>","(cf)′ = cf′, (f ± g)′ = f′ ± g′"],""],
  [RED,"Product & quotient",["(fg)′ = f′g + fg′","(f/g)′ = (f′g − fg′)/g"+sq],""],
  [TEAL,"Six to memorize",["sin → cos, cos → −sin","tan → sec"+sq+", sec → sec tan","e<sup>x</sup> → e<sup>x</sup>, ln x → 1/x"],""],
  [GRN,"Tangent line",["y − f(a) = f′(a)(x − a)","Normal: slope −1/f′(a)"],""]],
 gen:[
 ()=>{ const a=nz(-5,5),n=R(2,5),c=nz(-3,3); return P("Power rule",`f(x) = ${X(a)}<sup>${n}</sup>. Find f′(${N(c)}).`,a*n*c**(n-1),[a*c**n,a*n*c**n,n*c**(n-1)],[`f′(x) = ${N(a*n)}${pw("x",n-1)}`,`f′(${N(c)}) = ${N(a*n)}${pw(`(${N(c)})`,n-1)} = <b>${N(a*n*c**(n-1))}</b>`]); },
 ()=>{ const a=R(1,4),n=R(2,4); return P("Definition",`lim<sub>h→0</sub> ${FR(`(${a} + h)<sup>${n}</sup> − ${a**n}`,"h")}`,n*a**(n-1),[a**n,n*a**n,0],[`This is f′(${a}) for f(x) = x<sup>${n}</sup>.`,`f′(${a}) = ${n}·${a}<sup>${n-1}</sup> = <b>${n*a**(n-1)}</b>`]); },
 ()=>{ const p=R(-5,5),q=nz(-4,4),c=R(-3,3); const f=mul([1,0,p],[1,q]); const v=ev(der(f),c); return P("Product rule",`f(x) = (x${sq}${p?sg(p):""})(x${sg(q)}). Find f′(${N(c)}).`,v,[2*c*(c+q),2*c,ev(f,c)],[`f′ = 2x(x${sg(q)}) + (x${sq}${p?sg(p):""})(1)`,`f′(${N(c)}) = ${N(2*c*(c+q))}${sg(c*c+p)} = <b>${N(v)}</b>`]); },
 ()=>{ const p=R(-5,5),q=R(-5,5),c=R(-3,4); if(p===q||c+q===0) return null; return PF("Quotient rule",`f(x) = ${FR("x"+sg(p),"x"+sg(q))}. Find f′(${N(c)}).`,q-p,(c+q)**2,[F(p-q,(c+q)**2),F(q-p,c+q),"0"],[`f′ = ${FR(`(1)(x${sg(q)}) − (x${sg(p)})(1)`,`(x${sg(q)})${sq}`)} = ${FR(N(q-p),`(x${sg(q)})${sq}`)}`,`At x = ${N(c)}: <b>${F(q-p,(c+q)**2)}</b>`]); },
 ()=>{ const a=nz(-5,5),b=nz(-5,5),c=nz(-4,4),x0=R(-2,3); const f=[a,b,c],m=ev(der(f),x0),y0=ev(f,x0); return P("Tangent lines",`What is the y-intercept of the tangent line to y = ${poly(f)} at x = ${N(x0)}?`,y0-m*x0,[y0,m,y0+m*x0],[`Point: (${N(x0)}, ${N(y0)}). Slope: y′(${N(x0)}) = ${N(m)}`,`y = ${N(m)}x + b, so b = ${N(y0)} − (${N(m)})(${N(x0)}) = <b>${N(y0-m*x0)}</b>`]); },
 ()=>{ const a=nz(-5,5),b=nz(-5,5),S=pick([["0",a,"a"],["π/2",-b,"−b"],["π",-a,"−a"]]); return P("Trig derivatives",`f(x) = ${N(a)} sin x${sg(b)} cos x. Find f′(${S[0]}).`,S[1],[S[1]===a?b:a,-S[1],0],[`f′(x) = ${N(a)} cos x ${b<0?"+":"−"} ${Math.abs(b)} sin x`,`At x = ${S[0]}: <b>${N(S[1])}</b>`]); }],
 chal:[
 ()=>{ const c=nz(-3,3); return P("Differentiability",`f(x) = x${sq} for x ≤ ${N(c)} and f(x) = ax + b for x &gt; ${N(c)}. If f is differentiable at x = ${N(c)}, what is a + b?`,2*c-c*c,[2*c,c*c,2*c+c*c],[`Slopes match: a = 2(${N(c)}) = ${N(2*c)}.`,`Values match: ${N(2*c)}(${N(c)}) + b = ${N(c*c)}, so b = ${N(-c*c)}.`,`a + b = <b>${N(2*c-c*c)}</b>`]); },
 ()=>{ const a=nz(-3,3),b=nz(-4,4),x0=R(-2,2); const f=[a,0,b,0],m=ev(der(f),x0); if(!m) return null; return PF("Normal lines",`What is the slope of the normal line to y = ${poly(f)} at x = ${N(x0)}?`,-1,m,[N(m),F(1,m),N(-m)],[`Tangent slope y′(${N(x0)}) = ${N(m)}`,`Normal slope = −1/${N(m)} = <b>${F(-1,m)}</b>`]); },
 ()=>{ const a=R(1,4); return P("Horizontal tangents",`At how many x-values does y = x${cu} − ${3*a*a}x have a horizontal tangent?`,2,[1,0,3],[`y′ = 3x${sq} − ${3*a*a} = 0`,`x = ±${a}: <b>2</b>`]); }]
};

/* ======================= UNIT 3: Chain, implicit, inverse ======================= */
const U3M={
 c0:{grp:"Step 1",c:NAVY,name:"Find the Inside Function",hint:"outside ∘ inside",when:"A function inside another function.",rule:"Name the inside u. If y depends on x only through u, use the chain rule.",
  ex:[T("y = (3x + 1)<sup>5</sup>",["Inside u = 3x + 1, outside u<sup>5</sup>"]),T("y = sin(x"+sq+")",["Inside u = x"+sq])]},
 cch:{grp:"Composite",c:ORG,name:"Chain Rule",hint:"f′(g(x))·g′(x)",when:"Any composite function.",rule:"d/dx f(g(x)) = f′(g(x)) · g′(x): derivative of the outside (inside left alone) times the derivative of the inside.",
  ex:[T("y = (3x + 1)<sup>5</sup>",["5(3x + 1)<sup>4</sup> · 3 = <b>15(3x + 1)<sup>4</sup></b>"]),T("y = e<sup>x"+sq+"</sup>",["<b>2x e<sup>x"+sq+"</sup></b>"])]},
 cimp:{grp:"x and y mixed",c:RED,name:"Implicit Differentiation",hint:"d/dx of y is y′",when:"The equation is not solved for y.",rule:"Differentiate both sides with respect to x; every y-term gets a factor y′ (chain rule). Then solve for y′.",
  ex:[T("x"+sq+" + y"+sq+" = 25 at (3, 4)",["2x + 2y y′ = 0, so y′ = −x/y","<b>−"+FR(3,4)+"</b>"]),T("xy = 6",["y + xy′ = 0, so <b>y′ = −y/x</b>"])]},
 cinv:{grp:"Inverse function",c:PURP,name:"Derivative of an Inverse",hint:"1/f′(a)",when:"(f<sup>−1</sup>)′(b) without a formula for f<sup>−1</sup>.",rule:"If f(a) = b, then (f<sup>−1</sup>)′(b) = "+FR(1,"f′(a)")+". Find a first!",
  ex:[T("f(x) = x"+cu+" + x, find (f<sup>−1</sup>)′(2)",["f(1) = 2, so a = 1. f′(1) = 4","<b>"+FR(1,4)+"</b>"]),T("f(x) = e<sup>x</sup>, (f<sup>−1</sup>)′(e)",["a = 1, f′(1) = e","<b>1/e</b>"])]},
 cit:{grp:"Inverse trig",c:TEAL,name:"Inverse Trig Derivatives",hint:"arcsin, arctan",when:"arcsin, arccos, arctan.",rule:"(arcsin x)′ = "+FR(1,"√(1 − x"+sq+")")+", (arccos x)′ = −"+FR(1,"√(1 − x"+sq+")")+", (arctan x)′ = "+FR(1,"1 + x"+sq)+". Combine with the chain rule.",
  ex:[T("y = arctan(2x)",["<b>"+FR(2,"1 + 4x"+sq)+"</b>"]),T("(arctan x)′ at x = 1",["<b>"+FR(1,2)+"</b>"])]},
 chigh:{grp:"Higher order",c:BLU,name:"Higher-Order Derivatives",hint:"y″, y‴",when:"Concavity, acceleration.",rule:"Differentiate again. For implicit y″, substitute y′ back in.",
  ex:[T("y = x"+sp(4)+" − 2x"+cu,["y″ = 12x"+sq+" − 12x"]),T("x"+sq+" + y"+sq+" = 25",["y″ = −25/y"+cu])]},
 cend:{grp:"Last step",c:GRN,name:"Evaluate & Simplify",hint:"plug in the point",when:"Every time.",rule:"Substitute the point last, and keep the chain-rule factor.",
  ex:[T("Missing the inside derivative",["d/dx sin(3x) = 3 cos(3x), not cos(3x)"]),T("Table values",["h(x) = f(g(x)): h′(1) = f′(g(1))·g′(1)"])]}
};
function sp(n){ return `<sup>${n}</sup>`; }
const U3={id:"u3",num:3,short:"Chain, Implicit, Inverse",name:"Unit 3: Differentiation: Composite, Implicit, and Inverse Functions",sub:"Chain rule, implicit differentiation, inverse functions and inverse trig, higher-order derivatives",c:RED,
 flow:flow({M:U3M,label:"Chain and implicit flowchart",lead:"Composite, implicit or inverse? Decide the type, then apply the rule.",start:"Differentiate",top:["c0"],q:"What kind of function?",
  cols:[["Composite","",ORG,["cch"]],["x and y mixed","",RED,["cimp"]],["Inverse function","",PURP,["cinv"]],["Inverse trig","",TEAL,["cit"]],["Higher order","",BLU,["chigh"]]],end:"cend"}),
 sheet:[[ORG,"Chain rule",["[f(g(x))]′ = f′(g(x))·g′(x)","[u<sup>n</sup>]′ = nu<sup>n−1</sup>u′","[e<sup>u</sup>]′ = e<sup>u</sup>u′, [ln u]′ = u′/u","[sin u]′ = cos u · u′"],""],
  [RED,"Implicit",["Differentiate both sides","Each y-term gets y′","Collect y′ terms and solve"],"x"+sq+" + y"+sq+" = r"+sq+" ⇒ y′ = −x/y"],
  [PURP,"Inverses",["(f<sup>−1</sup>)′(b) = 1/f′(a) where f(a) = b"],""],
  [TEAL,"Inverse trig",["(arcsin x)′ = 1/√(1 − x"+sq+")","(arctan x)′ = 1/(1 + x"+sq+")"],""]],
 gen:[
 ()=>{ const a=nz(-3,3),b=R(-4,4),n=R(2,4),c=R(-2,2); return P("Chain rule",`f(x) = (${X(a)}${b?sg(b):""})<sup>${n}</sup>. Find f′(${N(c)}).`,n*a*(a*c+b)**(n-1),[n*(a*c+b)**(n-1),(a*c+b)**n,n*a*(a*c+b)**n],[`f′(x) = ${n}${pw(`(${X(a)}${b?sg(b):""})`,n-1)} · ${N(a)}`,`f′(${N(c)}) = ${n}${pw(`(${N(a*c+b)})`,n-1)}(${N(a)}) = <b>${N(n*a*(a*c+b)**(n-1))}</b>`]); },
 ()=>{ const a=nz(1,5),b=R(1,6),c=R(0,4); return PF("Chain rule",`f(x) = ln(${X(a)} + ${b}). Find f′(${c}).`,a,a*c+b,[F(1,a*c+b),N(a),F(a,b)],[`f′(x) = ${FR(a,`${X(a)} + ${b}`)}`,`At x = ${c}: <b>${F(a,a*c+b)}</b>`]); },
 ()=>{ const [a,b,c]=pick(T3); const sx=pick([1,-1]),sy=pick([1,-1]); return PF("Implicit",`x${sq} + y${sq} = ${c*c}. Find dy/dx at (${N(sx*a)}, ${N(sy*b)}).`,-sx*a,sy*b,[F(sx*a,sy*b),F(-sy*b,sx*a),"0"],[`2x + 2y·y′ = 0, so y′ = −x/y`,`y′ = −(${N(sx*a)})/(${N(sy*b)}) = <b>${F(-sx*a,sy*b)}</b>`]); },
 ()=>{ const a=nz(-3,3),p=R(1,5); const b=a**3+p*a; return PF("Inverse functions",`f(x) = x${cu} + ${p}x. Find (f<sup>−1</sup>)′(${N(b)}).`,1,3*a*a+p,[N(3*a*a+p),F(1,3*b*b+p),F(1,a)],[`f(${N(a)}) = ${N(b)}, so a = ${N(a)}.`,`f′(x) = 3x${sq} + ${p}, f′(${N(a)}) = ${3*a*a+p}`,`(f<sup>−1</sup>)′(${N(b)}) = <b>${F(1,3*a*a+p)}</b>`]); },
 ()=>{ const k=R(1,5),m=R(1,4); return PF("Inverse trig",`f(x) = arctan(${m===1?"":m}x). Find f′(${k}).`,m,1+m*m*k*k,[F(1,1+k*k),F(m,1+k*k),N(m)],[`f′(x) = ${FR(m,`1 + ${m*m===1?"":m*m}x${sq}`)}`,`At x = ${k}: <b>${F(m,1+m*m*k*k)}</b>`]); },
 ()=>{ const g1=R(-3,3),gp=nz(-4,4),fp=nz(-5,5),a=R(1,3); return P("Chain rule (tables)",`g(${a}) = ${N(g1)}, g′(${a}) = ${N(gp)} and f′(${N(g1)}) = ${N(fp)}. If h(x) = f(g(x)), find h′(${a}).`,fp*gp,[fp+gp,fp,gp],[`h′(${a}) = f′(g(${a}))·g′(${a}) = f′(${N(g1)})·${N(gp)}`,`= ${N(fp)}·${N(gp)} = <b>${N(fp*gp)}</b>`]); }],
 chal:[
 ()=>{ const [a,b,c]=pick(T3); return PF("Implicit second derivative",`x${sq} + y${sq} = ${c*c}. Find d${sq}y/dx${sq} at (${a}, ${b}).`,-c*c,b**3,[F(-a,b),F(c*c,b**3),F(-1,b)],[`y′ = −x/y`,`y″ = −(y − x y′)/y${sq} = −(x${sq} + y${sq})/y${cu} = −${c*c}/y${cu}`,`At y = ${b}: <b>${F(-c*c,b**3)}</b>`]); },
 ()=>{ const x=nz(-6,6),y=nz(-6,6); return PF("Implicit",`xy = ${N(x*y)}. Find dy/dx at (${N(x)}, ${N(y)}).`,-y,x,[F(y,x),F(-x,y),"0"],[`Product rule: y + x·y′ = 0, so y′ = −y/x`,`= −(${N(y)})/(${N(x)}) = <b>${F(-y,x)}</b>`]); },
 ()=>{ return P("Logarithmic differentiation",`Find the derivative of y = x<sup>x</sup> at x = 1.`,1,[0,2,"e"],[`ln y = x ln x, so y′/y = ln x + 1`,`y′ = x<sup>x</sup>(ln x + 1). At x = 1: 1·(0 + 1) = <b>1</b>`]); }]
};

/* ======================= UNIT 4: Contextual applications ======================= */
const U4M={
 a0:{grp:"Step 1",c:NAVY,name:"What Rate Is Asked?",hint:"units tell you",when:"Every applied derivative question.",rule:"The derivative is a rate: units of the output per unit of the input. Decide: motion, related rates, approximation, or an indeterminate limit.",
  ex:[T("V in m"+cu+", t in min",["dV/dt is in m"+cu+"/min"]),T("“How fast is the radius changing?”",["dr/dt: related rates"])]},
 amot:{grp:"Motion",c:ORG,name:"Position, Velocity, Acceleration",hint:"s → v → a",when:"A particle moving on a line.",rule:"v = s′, a = v′ = s″. At rest: v = 0. Speed = |v|. Speeding up when v and a have the same sign.",
  ex:[T("s(t) = t"+cu+" − 6t"+sq+" + 9t",["v = 3t"+sq+" − 12t + 9 = 3(t − 1)(t − 3)","At rest at <b>t = 1 and t = 3</b>"]),T("v(2) = −3, a(2) = −6",["Same sign: <b>speeding up</b>"])]},
 arr:{grp:"Related rates",c:RED,name:"Related Rates",hint:"differentiate with respect to t",when:"Two changing quantities linked by a formula.",rule:"1) Draw and label. 2) Write the formula. 3) Differentiate with respect to t. 4) Substitute the numbers <b>after</b> differentiating. 5) Answer with units.",
  ex:[T("Circle: dr/dt = 2, r = 5. dA/dt?",["A = πr"+sq+", dA/dt = 2πr dr/dt","= 2π(5)(2) = <b>20π</b>"]),T("Ladder 10 ft, bottom at 6 ft moving out 2 ft/s",["x"+sq+" + y"+sq+" = 100, y = 8","2x x′ + 2y y′ = 0 → y′ = −(6)(2)/8 = <b>−1.5 ft/s</b>"])]},
 alin:{grp:"Approximation",c:PURP,name:"Linearization",hint:"L(x) = f(a) + f′(a)(x − a)",when:"Estimating a value near a known point.",rule:"Use the tangent line at a nearby nice point a. Concave up → the estimate is an underestimate; concave down → overestimate.",
  ex:[T("√26",["f(x) = √x at a = 25: L = 5 + "+FR(1,10)+"(1)","≈ <b>5.1</b> (over, since √x is concave down)"]),T("(2.01)"+cu,["8 + 12(0.01) = <b>8.12</b>"])]},
 alh:{grp:"Indeterminate limit",c:TEAL,name:"L'Hôpital's Rule",hint:"0/0 or ∞/∞",when:"A limit gives 0/0 or ∞/∞.",rule:"lim f/g = lim f′/g′ (differentiate the top and bottom separately, not the quotient rule). Check the form first.",
  ex:[T(lim(0)+" "+FR("e<sup>3x</sup> − 1","x"),["0/0 → "+FR("3e<sup>3x</sup>",1),"<b>3</b>"]),T(lim(0)+" "+FR("1 − cos x","x"+sq),["→ sin x/(2x) → cos x/2","<b>"+FR(1,2)+"</b>"])]},
 aend:{grp:"Last step",c:GRN,name:"Interpret with Units",hint:"sentence in context",when:"Every applied answer.",rule:"“At t = 3 minutes, the volume is increasing at 12 m"+cu+" per minute.” A negative rate means decreasing.",
  ex:[T("dT/dt = −2.5 at t = 4 (°F, hours)",["The temperature is falling 2.5 °F per hour at 4 hours."]),T("Units of f′ for f(t) in gallons",["gallons per unit of t"])]}
};
const U4={id:"u4",num:4,short:"Applications of Derivatives",name:"Unit 4: Contextual Applications of Differentiation",sub:"Rates in context, motion, related rates, linearization, L'Hôpital's rule",c:PURP,
 flow:flow({M:U4M,label:"Contextual applications flowchart",lead:"Which application? Read what rate or quantity the question wants.",start:"Applied derivative",top:["a0"],q:"What kind of problem?",
  cols:[["Motion","",ORG,["amot"]],["Related rates","",RED,["arr"]],["Approximation","",PURP,["alin"]],["0/0 or ∞/∞","",TEAL,["alh"]]],end:"aend"}),
 sheet:[[ORG,"Motion",["v(t) = s′(t), a(t) = v′(t)","At rest: v = 0","Speeding up: v and a same sign"],""],
  [RED,"Related rates formulas",["Circle A = πr"+sq+", C = 2πr","Sphere V = "+FR(4,3)+"πr"+cu+", S = 4πr"+sq,"Cone V = "+FR(1,3)+"πr"+sq+"h","Pythagoras x"+sq+" + y"+sq+" = z"+sq],""],
  [PURP,"Linear approximation",["L(x) = f(a) + f′(a)(x − a)","Concave up → underestimate"],""],
  [TEAL,"L'Hôpital",["0/0 or ∞/∞ only","lim f/g = lim f′/g′"],""]],
 gen:[
 ()=>{ const a=R(1,3),b=R(-6,6),c=R(-9,9),t=R(0,4); const s=[1,-3*a,b,c]; const v=ev(der(s),t); return P("Motion",`s(t) = ${poly(s).replace(/x/g,"t")}. Find the velocity at t = ${t}.`,v,[ev(s,t),ev(der(der(s)),t),v+1],[`v(t) = s′(t) = ${poly(der(s)).replace(/x/g,"t")}`,`v(${t}) = <b>${N(v)}</b>`]); },
 ()=>{ const r=R(2,10),dr=R(1,5); return P("Related rates",`The radius of a circle grows at ${dr} cm/s. When r = ${r} cm, dA/dt = kπ cm${sq}/s. Find k.`,2*r*dr,[r*r*dr,2*r,r*dr],[`A = πr${sq}, so dA/dt = 2πr·dr/dt`,`= 2π(${r})(${dr}) = ${2*r*dr}π, so <b>k = ${2*r*dr}</b>`]); },
 ()=>{ const r=R(1,6),dr=R(1,3); return P("Related rates",`A balloon's radius grows at ${dr} in/min. When r = ${r} in, dV/dt = kπ in${cu}/min. Find k.`,4*r*r*dr,[4*r*r,r*r*dr,4*r*dr],[`V = (4/3)πr${cu}, dV/dt = 4πr${sq}·dr/dt`,`= 4π(${r*r})(${dr}), so <b>k = ${4*r*r*dr}</b>`]); },
 ()=>{ const [a,b,c]=pick(T3),dx=R(1,4); return PF("Related rates",`A ${c}-ft ladder slides. The bottom is ${a} ft from the wall and moving away at ${dx} ft/s. How fast is the top moving (ft/s)?`,-a*dx,b,[F(a*dx,b),F(-b*dx,a),N(-dx)],[`x${sq} + y${sq} = ${c*c}; with x = ${a}, y = ${b}.`,`2x x′ + 2y y′ = 0 → y′ = −(${a})(${dx})/${b}`,`<b>${F(-a*dx,b)}</b> ft/s (moving down)`]); },
 ()=>{ const m=R(3,10),d=pick([1,2,-1,3]); const L=m+d/(2*m); return P("Linearization",`Use the tangent line to √x at x = ${m*m} to estimate √${m*m+d}. (3 decimals)`,r3(L),[r3(Math.sqrt(m*m+d)+.01),r3(m+d/m),r3(m+d)],[`L(x) = ${m} + ${FR(1,2*m)}(x − ${m*m})`,`L(${m*m+d}) = ${m} + ${N(d)}/${2*m} ≈ <b>${r3(L)}</b>`],{tol:.002}); },
 ()=>{ const S=pick([[()=>{const k=R(2,7);return [`${lim(0)} ${FR(`e<sup>${k}x</sup> − 1`,"x")}`,k,[1,0,"e"],[`0/0 → ${FR(`${k}e<sup>${k}x</sup>`,1)}`,`<b>${k}</b>`]];}],[()=>{const k=R(2,6);return [`${lim(0)} ${FR(`1 − cos(${k}x)`,"x"+sq)}`,k*k/2,[k,0,k*k],[`0/0 → ${FR(`${k} sin(${k}x)`,"2x")} → ${FR(`${k*k} cos(${k}x)`,2)}`,`<b>${N(k*k/2)}</b>`]];}],[()=>{const a=R(1,3),n=R(2,5);return [`${lim(a)} ${FR(`x<sup>${n}</sup> − ${a**n}`,`x − ${a}`)}`,n*a**(n-1),[a**n,n,0],[`0/0 → ${FR(`${n}x<sup>${n-1}</sup>`,1)}`,`<b>${n*a**(n-1)}</b>`]];}]])[0](); return P("L'Hôpital",S[0],S[1],S[2],S[3]); }],
 chal:[
 ()=>{ const R0=R(2,6),H=R0*R(2,3),h=R(1,H-1),dV=R(2,9); const k=(R0/H)**2; const v=dV/(Math.PI*k*h*h); return P("Related rates (cone)",`Water pours into an inverted cone (radius ${R0} m, height ${H} m) at ${dV} m${cu}/min. How fast is the depth rising when h = ${h} m? (m/min, 3 decimals)`,r3(v),[r3(dV/(Math.PI*h*h)),r3(v*3),r3(dV/(k*h*h))],[`r/h = ${R0}/${H}, so V = (π/3)(${F(R0,H)})${sq}h${cu}`,`dV/dt = π(${F(R0*R0,H*H)})h${sq}·dh/dt`,`dh/dt = ${dV}/(π·${F(R0*R0,H*H)}·${h*h}) ≈ <b>${r3(v)}</b>`],{tol:.002}); },
 ()=>{ const a=R(1,3),b=R(a+1,5); const s=[1,-3*(a+b)/2,3*a*b,0]; if((3*(a+b))%2) return null; return PS("Motion",`v(t) = 3(t − ${a})(t − ${b}) for t ≥ 0. On which interval is the particle moving left?`,`${a} &lt; t &lt; ${b}`,[`0 &lt; t &lt; ${a}`,`t &gt; ${b}`,`t &lt; ${a} or t &gt; ${b}`],[`Moving left ⇔ v(t) &lt; 0.`,`v &lt; 0 between the roots: <b>${a} &lt; t &lt; ${b}</b>`]); },
 ()=>{ return P("L'Hôpital (twice)",`${lim("∞")} ${FR("x"+sq,"e<sup>x</sup>")}`,0,[1,"∞",2],[`∞/∞ → 2x/e<sup>x</sup> → 2/e<sup>x</sup>`,`<b>0</b>: exponentials beat polynomials`]); }]
};

/* ======================= UNIT 5: Analytical applications ======================= */
const U5M={
 e0:{grp:"Step 1",c:NAVY,name:"Find f′ and f″",hint:"critical numbers",when:"Any question about extrema, increasing or concavity.",rule:"Critical numbers: f′(x) = 0 or f′ undefined (in the domain).",
  ex:[T("f(x) = x"+cu+" − 3x",["f′ = 3x"+sq+" − 3 = 0 → <b>x = ±1</b>"]),T("f(x) = x<sup>2/3</sup>",["f′ = "+FR(2,"3x<sup>1/3</sup>")+" undefined at <b>x = 0</b>"])]},
 einc:{grp:"Increasing / extrema",c:ORG,name:"First Derivative Test",hint:"sign chart of f′",when:"Increasing/decreasing intervals and relative extrema.",rule:"f′ &gt; 0: increasing. f′ &lt; 0: decreasing. f′ changes + → −: relative max; − → +: relative min.",
  ex:[T("f(x) = x"+cu+" − 3x",["f′ + on (−∞, −1), − on (−1, 1), + on (1, ∞)","Max at x = −1, min at x = 1"]),T("Justify",["“f has a relative max at x = −1 because f′ changes from positive to negative there.”"])]},
 econ:{grp:"Concavity",c:RED,name:"Concavity & Inflection",hint:"sign chart of f″",when:"Concave up/down, points of inflection, second derivative test.",rule:"f″ &gt; 0: concave up. f″ &lt; 0: concave down. Inflection: f″ changes sign. 2nd derivative test: f′(c) = 0 and f″(c) &gt; 0 ⇒ min; &lt; 0 ⇒ max.",
  ex:[T("f(x) = x"+cu+" − 6x"+sq,["f″ = 6x − 12 = 0 at x = 2, sign changes","Inflection at <b>x = 2</b>"]),T("f′(3) = 0, f″(3) = −4",["<b>Relative max</b> at x = 3"])]},
 eabs:{grp:"Closed interval",c:PURP,name:"Candidates Test (Absolute Extrema)",hint:"endpoints + critical points",when:"Absolute max/min on [a, b].",rule:"Evaluate f at the critical numbers inside [a, b] and at both endpoints. The largest value is the absolute max, the smallest the absolute min (Extreme Value Theorem).",
  ex:[T("f(x) = x"+cu+" − 3x on [0, 2]",["f(0) = 0, f(1) = −2, f(2) = 2","Max <b>2</b>, min <b>−2</b>"]),T("Common mistake",["Forgetting the endpoints"])]},
 emvt:{grp:"Theorems",c:TEAL,name:"Mean Value Theorem & Rolle",hint:"f′(c) = average rate",when:"“Is there a c where f′(c) = …?”",rule:"f continuous on [a, b], differentiable on (a, b) ⇒ some c in (a, b) has f′(c) = "+FR("f(b) − f(a)","b − a")+". Rolle: if f(a) = f(b), then f′(c) = 0.",
  ex:[T("f(x) = x"+sq+" on [1, 5]",["Average rate = 6, f′(c) = 2c = 6","<b>c = 3</b>"]),T("Check the hypotheses",["f(x) = |x| on [−1, 1]: not differentiable at 0, so MVT doesn't apply"])]},
 eopt:{grp:"Optimization",c:BLU,name:"Optimization",hint:"one variable, then f′ = 0",when:"Maximize or minimize a quantity.",rule:"Write the quantity, use the constraint to get one variable, find the critical numbers, and justify max/min (1st/2nd derivative test or endpoints).",
  ex:[T("Max area, 40 m of fence, rectangle",["A = x(20 − x), A′ = 20 − 2x = 0","x = 10: <b>100 m"+sq+"</b>"]),T("Box from a 12-in square sheet",["V = x(12 − 2x)"+sq+", max at x = 2: <b>128 in"+cu+"</b>"])]},
 eend:{grp:"Last step",c:GRN,name:"Justify",hint:"cite the sign change",when:"Free-response answers.",rule:"Name the test and the reason: “because f′ changes from negative to positive at x = 2”. A table of signs alone is not a justification.",
  ex:[T("Good",["“f is concave up on (2, ∞) because f″ &gt; 0 there.”"]),T("Not enough",["“f″(3) = 6.”"])]}
};
const U5={id:"u5",num:5,short:"Analyzing Functions",name:"Unit 5: Analytical Applications of Differentiation",sub:"MVT, extreme value theorem, increasing/decreasing, concavity, inflection points, optimization",c:TEAL,
 flow:flow({M:U5M,label:"Analyzing functions flowchart",lead:"Which test? Start with f′ and f″, then pick the question type.",start:"Analyze f",top:["e0"],q:"What is asked?",
  cols:[["Increasing / extrema","",ORG,["einc"]],["Concavity","",RED,["econ"]],["Absolute extrema","",PURP,["eabs"]],["MVT / Rolle","",TEAL,["emvt"]],["Optimization","",BLU,["eopt"]]],end:"eend"}),
 sheet:[[ORG,"First derivative",["f′ &gt; 0 increasing, f′ &lt; 0 decreasing","+ → − relative max, − → + relative min"],""],
  [RED,"Second derivative",["f″ &gt; 0 concave up, f″ &lt; 0 concave down","Inflection: f″ changes sign","2nd derivative test"],""],
  [PURP,"Absolute extrema",["Extreme Value Theorem: continuous on [a, b]","Check endpoints and critical numbers"],""],
  [TEAL,"Mean Value Theorem",["f′(c) = (f(b) − f(a))/(b − a)","Rolle: f(a) = f(b) ⇒ f′(c) = 0"],""]],
 gen:[
 ()=>{ const p=R(1,5); return P("Critical points",`f(x) = x${cu} − ${3*p*p}x. Find the x-value of the relative minimum.`,p,[-p,0,3*p*p],[`f′ = 3x${sq} − ${3*p*p} = 0 → x = ±${p}`,`f″ = 6x: f″(${p}) &gt; 0, so the minimum is at <b>x = ${p}</b>`]); },
 ()=>{ const a=nz(-3,3),b=R(-9,9),c=R(-5,5); return PF("Inflection points",`Find the x-coordinate of the inflection point of f(x) = ${poly([a,b,c,1])}.`,-b,3*a,[F(-b,a),F(b,3*a),"0"],[`f″(x) = ${6*a}x${sg(2*b)}`,`f″ = 0 at x = ${F(-b,3*a)} (f″ changes sign): <b>${F(-b,3*a)}</b>`]); },
 ()=>{ const a=R(-3,1),b=a+R(2,5); return PF("Mean Value Theorem",`f(x) = x${sq} on [${N(a)}, ${N(b)}]. Find the c guaranteed by the MVT.`,a+b,2,[N(a+b),N(b-a),F(b-a,2)],[`Average rate: (${N(b*b)} − ${N(a*a)})/(${N(b)} − (${N(a)})) = ${N(a+b)}`,`f′(c) = 2c = ${N(a+b)} → <b>c = ${F(a+b,2)}</b>`]); },
 ()=>{ const p=R(1,3),a=0,b=p+R(1,3); const f=x=>x**3-3*p*p*x; const vals=[[a,f(a)],[p,f(p)],[b,f(b)]]; const mx=Math.max(...vals.map(v=>v[1])); return P("Absolute extrema",`Find the absolute maximum value of f(x) = x${cu} − ${3*p*p}x on [0, ${b}].`,mx,[f(p),-f(p),f(b)+1].filter(x=>x!==mx),[`Critical number in [0, ${b}]: x = ${p}`,`f(0) = 0, f(${p}) = ${N(f(p))}, f(${b}) = ${N(f(b))}`,`Absolute max: <b>${N(mx)}</b>`]); },
 ()=>{ const L=4*R(3,15); return P("Optimization",`A rectangle has perimeter ${L} m. What is its largest possible area (m${sq})?`,(L/4)**2,[(L/2)**2,L*L/8,(L/4)**2/2],[`Sides x and ${L/2} − x: A = x(${L/2} − x)`,`A′ = ${L/2} − 2x = 0 → x = ${L/4} (a square)`,`A = <b>${(L/4)**2}</b>`]); },
 ()=>{ const p=R(1,4); return PS("Increasing intervals",`On what intervals is f(x) = x${cu} − ${3*p*p}x increasing?`,`x &lt; −${p} or x &gt; ${p}`,[`−${p} &lt; x &lt; ${p}`,`x &gt; 0`,`x &lt; ${p}`],[`f′ = 3(x − ${p})(x + ${p})`,`f′ &gt; 0 outside the roots: <b>x &lt; −${p} or x &gt; ${p}</b>`]); }],
 chal:[
 ()=>{ const k=R(1,4),s=6*k; return P("Optimization (box)",`Squares are cut from the corners of a ${s} × ${s} in sheet to make an open box. What is the maximum volume (in${cu})?`,16*k**3,[s**3/27,8*k**3,4*k**3*9],[`V = x(${s} − 2x)${sq}`,`V′ = (${s} − 2x)(${s} − 6x) = 0 → x = ${k}`,`V = ${k}(${4*k})${sq} = <b>${16*k**3}</b>`]); },
 ()=>{ const a=R(1,3),b=R(a+1,5); return P("Rolle's theorem",`f(x) = (x − ${a})(x − ${b}). Rolle's theorem on [${a}, ${b}] gives f′(c) = 0. Find c.`,(a+b)/2,[a,b,a+b],[`f(${a}) = f(${b}) = 0`,`f′(x) = 2x − ${a+b} = 0 → <b>c = ${N((a+b)/2)}</b>`]); },
 ()=>{ const d=R(2,9); return P("Optimization (distance)",`What point on the line y = x is closest to (${d}, 0)? Give its x-coordinate.`,d/2,[d,0,d/4],[`D${sq} = (x − ${d})${sq} + x${sq}`,`(D${sq})′ = 4x − ${2*d} = 0 → <b>x = ${N(d/2)}</b>`]); }]
};

/* ======================= UNIT 6: Integration ======================= */
const U6M={
 i0:{grp:"Step 1",c:NAVY,name:"Definite or Indefinite?",hint:"limits = a number",when:"Every integral.",rule:"∫ f(x) dx: a family of antiderivatives + C. "+ig("a","b")+" f(x) dx: a number (net signed area). Accumulation: F(x) = "+ig("a","x")+" f(t) dt.",
  ex:[T("∫ 3x"+sq+" dx",["<b>x"+cu+" + C</b>"]),T(ig(0,2)+" 3x"+sq+" dx",["x"+cu+" from 0 to 2","<b>8</b>"])]},
 ipow:{grp:"Basic antiderivatives",c:ORG,name:"Reverse Power & Basic Rules",hint:"x<sup>n+1</sup>/(n+1)",when:"Polynomials, e<sup>x</sup>, sin, cos, 1/x.",rule:"∫ x<sup>n</sup> dx = "+FR("x<sup>n+1</sup>","n + 1")+" + C (n ≠ −1), ∫ 1/x dx = ln|x| + C, ∫ e<sup>x</sup> = e<sup>x</sup>, ∫ cos x = sin x, ∫ sin x = −cos x.",
  ex:[T("∫ (4x"+cu+" − 2x) dx",["<b>x"+sp(4)+" − x"+sq+" + C</b>"]),T(ig(0,"π")+" sin x dx",["[−cos x] = 1 + 1","<b>2</b>"])]},
 iu:{grp:"Composite inside",c:RED,name:"u-Substitution",hint:"inside function and its derivative",when:"An inside function whose derivative is (nearly) present.",rule:"Let u = inside, du = u′ dx. Rewrite everything in u (change the limits for definite integrals), integrate, substitute back.",
  ex:[T("∫ 2x(x"+sq+" + 1)"+cu+" dx",["u = x"+sq+" + 1, du = 2x dx","<b>(x"+sq+" + 1)"+sp(4)+"/4 + C</b>"]),T(ig(0,1)+" x e<sup>x"+sq+"</sup> dx",["u = x"+sq+": ½∫<sub>0</sub><sup>1</sup> e<sup>u</sup> du","<b>(e − 1)/2</b>"])]},
 iftc:{grp:"FTC",c:PURP,name:"Fundamental Theorem of Calculus",hint:"d/dx ∫ = f",when:"Derivative of an accumulation function, or evaluating with an antiderivative.",rule:"d/dx "+ig("a","g(x)")+" f(t) dt = f(g(x))·g′(x). "+ig("a","b")+" f(x) dx = F(b) − F(a).",
  ex:[T("d/dx "+ig(1,"x"+sq)+" t"+cu+" dt",["(x"+sq+")"+cu+"·2x","<b>2x"+sp(7)+"</b>"]),T(ig(1,3)+" 2x dx",["9 − 1","<b>8</b>"])]},
 irie:{grp:"Approximation",c:TEAL,name:"Riemann Sums & Trapezoids",hint:"left, right, midpoint, trapezoid",when:"A table of values or “approximate”.",rule:"Left/right/midpoint: Σ f(x<sub>i</sub>)Δx. Trapezoid: Δx/2·(f₀ + 2f₁ + … + 2f<sub>n−1</sub> + f<sub>n</sub>). Increasing f: left under, right over.",
  ex:[T("f(x) = x"+sq+" on [0, 4], 4 left rectangles",["Δx = 1: 0 + 1 + 4 + 9","<b>14</b>"]),T("Same, right rectangles",["1 + 4 + 9 + 16 = <b>30</b>"])]},
 ibp:B({grp:"Product (BC)",c:BLU,name:"Integration by Parts (BC)",hint:"∫u dv = uv − ∫v du",when:"A product like x e<sup>x</sup>, x sin x, ln x.",rule:"∫ u dv = uv − ∫ v du. Choose u by LIATE (logs, inverse trig, algebraic, trig, exponential).",
  ex:[T("∫ x e<sup>x</sup> dx",["u = x, dv = e<sup>x</sup>dx","<b>x e<sup>x</sup> − e<sup>x</sup> + C</b>"]),T("∫ ln x dx",["u = ln x, dv = dx","<b>x ln x − x + C</b>"])]}),
 ipf:B({grp:"Rational (BC)",c:BLU,name:"Partial Fractions (BC)",hint:"split the fraction",when:"A rational function with a factorable denominator.",rule:"Factor the denominator, write A/(x − a) + B/(x − b), solve for A and B, integrate to logs.",
  ex:[T("∫ "+FR(1,"x"+sq+" − 1")+" dx",["½("+FR(1,"x − 1")+" − "+FR(1,"x + 1")+")","<b>½ ln|"+FR("x − 1","x + 1")+"| + C</b>"]),T("∫ "+FR(3,"x(x + 3)")+" dx",["1/x − 1/(x + 3)","<b>ln|x/(x + 3)| + C</b>"])]}),
 iimp:B({grp:"Infinite (BC)",c:BLU,name:"Improper Integrals (BC)",hint:"a limit at ∞",when:"An infinite limit or an infinite discontinuity.",rule:ig(1,"∞")+" f dx = lim<sub>b→∞</sub> "+ig(1,"b")+" f dx. "+ig(1,"∞")+" 1/x<sup>p</sup> dx converges ⇔ p &gt; 1, to 1/(p − 1).",
  ex:[T(ig(1,"∞")+" "+FR(1,"x"+sq)+" dx",["lim (1 − 1/b)","<b>1</b>"]),T(ig(1,"∞")+" "+FR(1,"x")+" dx",["lim ln b","<b>diverges</b>"])]}),
 iend:{grp:"Last step",c:GRN,name:"Check: + C, units, sign",hint:"differentiate your answer",when:"Every integral.",rule:"Indefinite: + C. Definite: a number with units (output × input). Negative area below the axis. Check by differentiating.",
  ex:[T("∫ cos(3x) dx",["(1/3) sin(3x) + C: check, (1/3)·3 cos 3x ✓"]),T("Rate in L/min, t in min",["∫ gives liters"])]}
};
const U6={id:"u6",num:6,short:"Integration",name:"Unit 6: Integration and Accumulation of Change",sub:BC?"Riemann sums, FTC, antiderivatives, u-substitution, and the BC topics: integration by parts, partial fractions, improper integrals":"Riemann sums, accumulation, the Fundamental Theorem of Calculus, antiderivatives, u-substitution",c:BLU,
 flow:flow({M:U6M,label:"Integration flowchart",lead:"Which integration technique? Look at the integrand.",start:"Integrate",top:["i0"],q:"What does the integrand look like?",
  cols:[["Basic forms","",ORG,["ipow"]],["Inside + its derivative","",RED,["iu"]],["Accumulation / FTC","",PURP,["iftc"]],["Table / approximate","",TEAL,["irie"]],["BC techniques","",BLU,["ibp","ipf","iimp"]]],end:"iend"}),
 sheet:[[ORG,"Antiderivatives",["∫x<sup>n</sup> = x<sup>n+1</sup>/(n+1) + C","∫1/x = ln|x| + C","∫e<sup>x</sup> = e<sup>x</sup> + C","∫sin x = −cos x + C, ∫cos x = sin x + C","∫sec"+sq+"x = tan x + C"],""],
  [PURP,"FTC",["∫<sub>a</sub><sup>b</sup> f = F(b) − F(a)","d/dx ∫<sub>a</sub><sup>g(x)</sup> f(t)dt = f(g(x))g′(x)"],""],
  [TEAL,"Approximations",["Left, right, midpoint, trapezoid","Increasing f: left under, right over","Concave up: trapezoid over, midpoint under"],""],
  [NAVY,"Properties",["∫<sub>a</sub><sup>a</sup> f = 0, ∫<sub>b</sub><sup>a</sup> f = −∫<sub>a</sub><sup>b</sup> f","∫<sub>a</sub><sup>b</sup> + ∫<sub>b</sub><sup>c</sup> = ∫<sub>a</sub><sup>c</sup>","Average value: (1/(b − a))∫<sub>a</sub><sup>b</sup> f"],""]].concat(BC?[[BLU,"BC techniques",["Parts: ∫u dv = uv − ∫v du","Partial fractions","Improper: ∫<sub>1</sub><sup>∞</sup>x<sup>−p</sup> converges ⇔ p &gt; 1"],""]]:[]),
 gen:[
 ()=>{ const c=[R(-3,3),R(-4,4),R(-5,5)],a=R(-2,1),b=a+R(1,3); const [n,d]=intP(c,a,b); return PF("Definite integrals",`${ig(N(a),N(b))} (${poly(c)}) dx`,n,d,[F(n,d*2),F(-n,d),N(Math.round(n/d)+1)],[`Antiderivative: ${[[c[0],3],[c[1],2],[c[2],1]].filter(t=>t[0]).map((t,k)=>{ const neg=t[0]<0, f=F(Math.abs(t[0]),t[1]); const co=f==="1"?"":(f.includes("/")?`(${f})`:f); return (k?(neg?" − ":" + "):(neg?"−":""))+co+(t[1]>1?`x<sup>${t[1]}</sup>`:"x"); }).join("")}`,`Evaluate from ${N(a)} to ${N(b)}: <b>${F(n,d)}</b>`]); },
 ()=>{ const n=R(3,6),dx=pick([1,2]); const xs=Array.from({length:n},(_,i)=>i*dx); const left=xs.reduce((s,x)=>s+x*x*dx,0); const right=xs.reduce((s,x)=>s+(x+dx)**2*dx,0); const isL=Math.random()<.5; return P("Riemann sums",`Approximate ${ig(0,n*dx)} x${sq} dx with ${n} ${isL?"left":"right"} rectangles.`,isL?left:right,[isL?right:left,(left+right)/2,(n*dx)**3/3].map(r2),[`Δx = ${dx}. ${isL?"Left":"Right"} endpoints: ${(isL?xs:xs.map(x=>x+dx)).join(", ")}`,`Sum of f·Δx = <b>${isL?left:right}</b>`]); },
 ()=>{ const c=R(1,3),n=pick([2,3]); const v=2*c**(2*n+1)*1; return P("FTC",`F(x) = ${ig(1,"x"+sq)} t<sup>${n}</sup> dt. Find F′(${c}).`,(c*c)**n*2*c,[(c*c)**n,c**n,2*c],[`F′(x) = (x${sq})<sup>${n}</sup>·2x`,`F′(${c}) = ${(c*c)**n}·${2*c} = <b>${N((c*c)**n*2*c)}</b>`]); },
 ()=>{ const b=R(1,3),n=R(1,3); return PF("u-substitution",`${ig(0,b)} 2x${pw("(x"+sq+" + 1)",n)} dx`,(b*b+1)**(n+1)-1,n+1,[F((b*b+1)**(n+1),n+1),N((b*b+1)**n),F((b*b+1)**(n+1)-1,n)],[`u = x${sq} + 1, du = 2x dx; u from 1 to ${b*b+1}`,`∫<sub>1</sub><sup>${b*b+1}</sup> ${pw("u",n)} du = [u<sup>${n+1}</sup>/${n+1}]`,`= (${b*b+1}<sup>${n+1}</sup> − 1)/${n+1} = <b>${F((b*b+1)**(n+1)-1,n+1)}</b>`]); },
 ()=>{ const b=R(1,6); return PF("Average value",`Find the average value of f(x) = x${sq} on [0, ${b}].`,b*b,3,[F(b**3,3),N(b*b),F(b*b,2)],[`(1/${b})${ig(0,b)} x${sq} dx = (1/${b})(${b**3}/3)`,`= <b>${F(b*b,3)}</b>`]); },
 ()=>{ const m=R(-6,8),n=R(-6,8),a=R(0,2),b=a+R(1,3),c=b+R(1,3); return P("Integral properties",`${ig(a,b)} f(x) dx = ${N(m)} and ${ig(b,c)} f(x) dx = ${N(n)}. Find ${ig(a,c)} (2f(x) + 3) dx.`,2*(m+n)+3*(c-a),[m+n,2*(m+n),2*(m+n)+3],[`${ig(a,c)} f = ${N(m)} + ${N(n)} = ${N(m+n)}`,`2(${N(m+n)}) + 3(${c} − ${a}) = <b>${N(2*(m+n)+3*(c-a))}</b>`]); },
 B(()=>{ return P("Integration by parts (BC)",`${ig(0,1)} x e<sup>x</sup> dx`,1,["e","e − 1","0"],[`u = x, dv = e<sup>x</sup> dx: [x e<sup>x</sup>] − ∫ e<sup>x</sup> dx`,`(e − 0) − (e − 1) = <b>1</b>`]); }),
 B(()=>{ const p=R(2,5); return PF("Improper integrals (BC)",`${ig(1,"∞")} x<sup>−${p}</sup> dx`,1,p-1,[F(1,p),"diverges",F(1,p+1)],[`lim<sub>b→∞</sub> [x<sup>${N(1-p)}</sup>/(${N(1-p)})]<sub>1</sub><sup>b</sup>`,`= 0 − 1/(${N(1-p)}) = <b>${F(1,p-1)}</b>`]); }),
 B(()=>{ const a=R(1,4),b=R(a+1,7); return PS("Partial fractions (BC)",`Which is ∫ ${FR(b-a,`(x − ${b})(x − ${a})`)} dx?`,`ln|${FR(`x − ${b}`,`x − ${a}`)}| + C`,[`ln|(x − ${b})(x − ${a})| + C`,`ln|${FR(`x − ${a}`,`x − ${b}`)}| + C`,`${FR(1,`(x − ${b})(x − ${a})`)} + C`],[`${FR(b-a,`(x − ${b})(x − ${a})`)} = ${FR(1,`x − ${b}`)} − ${FR(1,`x − ${a}`)}`,`<b>ln|x − ${b}| − ln|x − ${a}| + C</b>`]); })],
 chal:[
 ()=>{ const k=R(2,9); return P("Exponential integrals",`${ig(0,`ln ${k}`)} e<sup>x</sup> dx`,k-1,[k,1,Math.log(k)].map(r3),[`[e<sup>x</sup>]<sub>0</sub><sup>ln ${k}</sup> = ${k} − 1`,`<b>${k-1}</b>`]); },
 ()=>{ const a=R(1,4); return P("Accumulation",`F(x) = ${ig(0,"x")} (t${sq} − ${a*a}) dt. At what positive x does F have a relative minimum?`,a,[0,a*a,2*a],[`F′(x) = x${sq} − ${a*a} = 0 → x = ±${a}`,`F′ changes − → + at x = ${a}: <b>x = ${a}</b>`]); },
 ()=>{ const n=R(3,8); return PF("Riemann limit",`lim<sub>n→∞</sub> Σ<sub>i=1</sub><sup>n</sup> (i/n)<sup>${n}</sup>·(1/n)`,1,n+1,[F(1,n),"1","0"],[`This is ${ig(0,1)} x<sup>${n}</sup> dx`,`= <b>${F(1,n+1)}</b>`]); },
 B(()=>{ return P("Parts twice (BC)",`${ig(0,1)} x${sq} e<sup>x</sup> dx = ae + b. Find a + b.`,-1,[1,0,-2],[`Parts twice: ∫x${sq}e<sup>x</sup> = (x${sq} − 2x + 2)e<sup>x</sup>`,`[(1 − 2 + 2)e] − [2] = e − 2`,`a = 1, b = −2: <b>a + b = −1</b>`]); })]
};

/* ======================= UNIT 7: Differential equations ======================= */
const U7M={
 q0:{grp:"Step 1",c:NAVY,name:"What Kind of DE?",hint:"read dy/dx",when:"Every differential equation.",rule:"dy/dx = ky → exponential. Separable: dy/dx = g(x)h(y). A slope field or Euler's method for approximations. Logistic (BC): dP/dt = kP(1 − P/M).",
  ex:[T("dy/dt = 0.3y",["Exponential growth"]),T("dy/dx = xy"+sq,["Separable"])]},
 qsf:{grp:"Picture",c:ORG,name:"Slope Fields",hint:"slope = dy/dx at each point",when:"Sketching or matching solution curves.",rule:"At each point (x, y), draw a short segment with slope dy/dx. Solution curves follow the segments.",
  ex:[T("dy/dx = x + y at (1, 2)",["Slope <b>3</b>"]),T("dy/dx = x − y",["Slopes are 0 along y = x"])]},
 qsep:{grp:"Solve",c:RED,name:"Separation of Variables",hint:"y's left, x's right",when:"dy/dx = g(x)·h(y).",rule:"Separate: dy/h(y) = g(x) dx. Integrate both sides, add C, use the initial condition, solve for y.",
  ex:[T("dy/dx = x/y, y(0) = 3",["y dy = x dx → y"+sq+"/2 = x"+sq+"/2 + C","y = √(x"+sq+" + 9)"]),T("dy/dx = 2xy, y(0) = 5",["ln|y| = x"+sq+" + C","<b>y = 5e<sup>x"+sq+"</sup></b>"])]},
 qexp:{grp:"Model",c:PURP,name:"Exponential Growth & Decay",hint:"y = y₀e<sup>kt</sup>",when:"The rate is proportional to the amount.",rule:"dy/dt = ky ⇒ y = y₀e<sup>kt</sup>. Doubling time (ln 2)/k, half-life (ln 2)/|k|.",
  ex:[T("y(0) = 100, doubles every 5 h",["y = 100·2<sup>t/5</sup>","y(15) = <b>800</b>"]),T("Half-life 3 yr, 40 g",["After 9 yr: <b>5 g</b>"])]},
 qeul:B({grp:"Approximate (BC)",c:TEAL,name:"Euler's Method (BC)",hint:"y<sub>new</sub> = y + h·slope",when:"Approximate y at a point from a DE and a starting point.",rule:"y<sub>n+1</sub> = y<sub>n</sub> + h·f(x<sub>n</sub>, y<sub>n</sub>), x<sub>n+1</sub> = x<sub>n</sub> + h.",
  ex:[T("dy/dx = x + y, y(0) = 1, h = 0.5, find y(1)",["y(0.5) = 1 + 0.5(1) = 1.5","y(1) = 1.5 + 0.5(2) = <b>2.5</b>"]),T("Concave up solution",["Euler underestimates"])]}),
 qlog:B({grp:"Model (BC)",c:TEAL,name:"Logistic Growth (BC)",hint:"carrying capacity M",when:"Growth that levels off.",rule:"dP/dt = kP(1 − P/M). lim P = M. Fastest growth when P = M/2.",
  ex:[T("dP/dt = 0.2P(1 − P/500)",["Carrying capacity <b>500</b>; fastest growth at <b>250</b>"]),T("P(0) = 600",["P decreases toward 500"])]}),
 qend:{grp:"Last step",c:GRN,name:"Check the Solution",hint:"substitute back",when:"Every DE.",rule:"Differentiate your y and substitute into the DE; check the initial condition; state the domain if needed.",
  ex:[T("y = 5e<sup>x"+sq+"</sup>",["y′ = 10x e<sup>x"+sq+"</sup> = 2x·y ✓, y(0) = 5 ✓"]),T("Forgot + C",["You can't use the initial condition"])]}
};
const U7={id:"u7",num:7,short:"Differential Equations",name:"Unit 7: Differential Equations",sub:BC?"Slope fields, separation of variables, exponential models, and the BC topics: Euler's method and logistic growth":"Modeling with differential equations, slope fields, separation of variables, exponential growth and decay",c:BRN,
 flow:flow({M:U7M,label:"Differential equations flowchart",lead:"Which method for the differential equation?",start:"Differential equation",top:["q0"],q:"What do you need?",
  cols:[["A picture","",ORG,["qsf"]],["An exact solution","",RED,["qsep"]],["A growth model","",PURP,["qexp","qlog"]],["An approximation","",TEAL,["qeul"]]],end:"qend"}),
 sheet:[[ORG,"Slope fields",["Segment slope = dy/dx at (x, y)","Solutions follow the segments"],""],[RED,"Separable",["dy/h(y) = g(x) dx","Integrate, + C, initial condition, solve"],""],
  [PURP,"Exponential",["dy/dt = ky ⇒ y = y₀e<sup>kt</sup>","Doubling: (ln 2)/k"],""]].concat(BC?[[TEAL,"BC",["Euler: y + h·f(x, y)","Logistic: dP/dt = kP(1 − P/M), max rate at M/2"],""]]:[]),
 gen:[
 ()=>{ const S=pick([["x + y",(x,y)=>x+y],["x − y",(x,y)=>x-y],["xy",(x,y)=>x*y],["2x − y",(x,y)=>2*x-y],["x"+sq+" + y",(x,y)=>x*x+y]]),x=R(-3,3),y=R(-3,3); return P("Slope fields",`dy/dx = ${S[0]}. What is the slope of the segment at (${N(x)}, ${N(y)})?`,S[1](x,y),[S[1](y,x),x+y+1,0].filter(v=>v!==S[1](x,y)),[`Substitute x = ${N(x)}, y = ${N(y)} into ${S[0]}`,`= <b>${N(S[1](x,y))}</b>`]); },
 ()=>{ const y0=R(1,9)*50,d=R(2,8),n=R(1,4); return P("Exponential models",`y(0) = ${y0} and y doubles every ${d} years (dy/dt = ky). Find y(${n*d}).`,y0*2**n,[y0*2*n,y0*n*n,y0*2**(n+1)],[`y = ${y0}·2<sup>t/${d}</sup>`,`y(${n*d}) = ${y0}·2<sup>${n}</sup> = <b>${N(y0*2**n)}</b>`]); },
 ()=>{ const [a,b,c]=pick(T3); return P("Separation of variables",`dy/dx = x/y with y(0) = ${a}. Find y(${b}).`,c,[a+b,a*b,c+1],[`y dy = x dx → y${sq} = x${sq} + C; y(0) = ${a} → C = ${a*a}`,`y = √(x${sq} + ${a*a}); y(${b}) = √${c*c} = <b>${c}</b>`]); },
 ()=>{ const h=R(2,10),n=R(1,4),A=R(1,9)*32; return P("Half-life",`A substance has a half-life of ${h} years. How much of ${A} g remains after ${n*h} years?`,A/2**n,[A/(2*n),A-A/2**n,A/2**(n+1)],[`${n} half-li${n===1?"fe":"ves"}`,`${A}·(½)<sup>${n}</sup> = <b>${N(A/2**n)}</b>`]); },
 ()=>{ const k=pick([-3,-2,2,3,4]),c=pick([5,6,7,8,9]); return PS("Checking solutions",`Which function solves dy/dx = ${N(k)}y with y(0) = ${c}?`,`y = ${c}e<sup>${N(k)}x</sup>`,[`y = ${c}e<sup>x</sup> ${k<0?"−":"+"} ${Math.abs(k)}`,`y = ${N(k)}e<sup>${c}x</sup>`,`y = ${c}x<sup>${N(k)}</sup>`],[`dy/dx = ky ⇒ y = y₀e<sup>kx</sup>`,`<b>y = ${c}e<sup>${N(k)}x</sup></b>`]); },
 B(()=>{ const y0=R(0,3),h=pick([0.5,0.25]),n=2; let x=0,y=y0; const st=[]; for(let i=0;i<n;i++){ const s=x+y; st.push(`y(${+(x+h).toFixed(2)}) = ${+y.toFixed(4)} + ${h}(${+s.toFixed(4)}) = ${+(y+h*s).toFixed(4)}`); y=y+h*s; x=x+h; } return P("Euler's method (BC)",`dy/dx = x + y, y(0) = ${y0}. Use Euler's method with h = ${h} to approximate y(${+(n*h).toFixed(2)}).`,+y.toFixed(4),[+(y0+n*h*y0).toFixed(4),+(y*1.1).toFixed(4),+(y-h).toFixed(4)],[...st,`<b>≈ ${+y.toFixed(4)}</b>`],{tol:.001}); }),
 B(()=>{ const M=R(2,9)*100,k=pick([0.1,0.2,0.5,0.3]); return P("Logistic growth (BC)",`dP/dt = ${k}P(1 − P/${M}). At what population is P growing fastest?`,M/2,[M,M/4,k*M],[`Logistic: fastest growth at half the carrying capacity`,`M/2 = <b>${M/2}</b>`]); })],
 chal:[
 ()=>{ const y0=R(1,5)*10,r=pick([2,3]),t1=R(1,4),n=R(2,3); return P("Exponential models",`y′ = ky, y(0) = ${y0}, y(${t1}) = ${y0*r}. Find y(${t1*n}).`,y0*r**n,[y0*r*n,y0*r**(n+1),y0*n],[`Every ${t1===1?"unit":t1+" units"} of time multiplies y by ${r}`,`y(${t1*n}) = ${y0}·${r}<sup>${n}</sup> = <b>${N(y0*r**n)}</b>`]); },
 ()=>{ const c=R(1,6); return P("Separation of variables",`dy/dx = 2xy, y(0) = ${c}. Find ln y(2).`,Math.log(c)+4,[Math.log(c),4,Math.log(c)*4].map(r3),[`ln y = x${sq} + ln ${c}`,`ln y(2) = 4 + ln ${c} ≈ <b>${r3(Math.log(c)+4)}</b>`],{tol:.01,a:`4 + ln ${c} ≈ ${r3(Math.log(c)+4)}`}); },
 ()=>{ const T0=R(150,200),Ta=R(60,75),k=pick([0.1,0.2]); return P("Newton's law of cooling",`dT/dt = −${k}(T − ${Ta}), T(0) = ${T0}. Find T(10) to 1 decimal.`,+(Ta+(T0-Ta)*Math.exp(-k*10)).toFixed(1),[+(T0*Math.exp(-k*10)).toFixed(1),Ta,+(Ta+(T0-Ta)*Math.exp(-k)).toFixed(1)],[`T = ${Ta} + ${T0-Ta}e<sup>−${k}t</sup>`,`T(10) = ${Ta} + ${T0-Ta}e<sup>${-k*10}</sup> ≈ <b>${(Ta+(T0-Ta)*Math.exp(-k*10)).toFixed(1)}</b>`],{tol:.06}); }]
};

/* ======================= UNIT 8: Applications of integration ======================= */
const U8M={
 g0:{grp:"Step 1",c:NAVY,name:"Sketch & Set Up",hint:"top − bottom, slices",when:"Every application.",rule:"Sketch the region, find the intersection points, decide dx (vertical slices) or dy (horizontal slices).",
  ex:[T("y = x"+sq+" and y = 2x",["Intersect at x = 0 and 2; 2x is on top"]),T("Region against the y-axis",["Use dy: right − left"])]},
 gav:{grp:"Average / motion",c:ORG,name:"Average Value & Motion",hint:"displacement vs. distance",when:"Average of a function, or a particle's position from velocity.",rule:"Average value = "+FR(1,"b − a")+"∫ f. Displacement = ∫ v dt. Total distance = ∫ |v| dt. Position: s(b) = s(a) + ∫ v.",
  ex:[T("v = t − 2 on [0, 4]",["Displacement ∫ = 0","Distance = 2 + 2 = <b>4</b>"]),T("Average of x"+sq+" on [0, 3]",["<b>3</b>"])]},
 garea:{grp:"Area",c:RED,name:"Area Between Curves",hint:"∫(top − bottom)",when:"Area of a region.",rule:"A = ∫<sub>a</sub><sup>b</sup> (top − bottom) dx or ∫(right − left) dy. Split where the curves cross.",
  ex:[T("y = 2x and y = x"+sq,["∫<sub>0</sub><sup>2</sup> (2x − x"+sq+") dx","<b>"+FR(4,3)+"</b>"]),T("y = 4 − x"+sq+" and the x-axis",["∫<sub>−2</sub><sup>2</sup> (4 − x"+sq+") dx = <b>"+FR(32,3)+"</b>"])]},
 gvol:{grp:"Volume",c:PURP,name:"Disks, Washers, Cross Sections",hint:"π∫R², π∫(R² − r²)",when:"Solids of revolution or known cross sections.",rule:"Disk: V = π∫R"+sq+". Washer: π∫(R"+sq+" − r"+sq+"). Cross sections: V = ∫A(x) dx (square: side"+sq+", semicircle: π r"+sq+"/2).",
  ex:[T("y = √x, 0 ≤ x ≤ 4, about the x-axis",["π∫<sub>0</sub><sup>4</sup> x dx","<b>8π</b>"]),T("y = x and y = x"+sq+" about the x-axis",["π∫<sub>0</sub><sup>1</sup>(x"+sq+" − x"+sp(4)+")dx = <b>"+FR("2π",15)+"</b>"])]},
 garc:B({grp:"Length (BC)",c:TEAL,name:"Arc Length (BC)",hint:"∫√(1 + (y′)²)",when:"The length of a curve.",rule:"L = ∫<sub>a</sub><sup>b</sup> √(1 + (f′(x))"+sq+") dx.",
  ex:[T("y = (2/3)x<sup>3/2</sup> on [0, 3]",["√(1 + x): (2/3)(1 + x)<sup>3/2</sup>","<b>"+FR(14,3)+"</b>"]),T("A line from (0, 0) to (3, 4)",["√(1 + (4/3)"+sq+")·3 = <b>5</b>"])]}),
 gend:{grp:"Last step",c:GRN,name:"Units & Reasonableness",hint:"area² volume³",when:"Every answer.",rule:"Area in square units, volume in cubic units, distance in length units. Volumes are positive; check with a rough estimate.",
  ex:[T("Negative area?",["You subtracted top from bottom"]),T("Forgot π",["Disk and washer volumes have π"])]}
};
const U8={id:"u8",num:8,short:"Applications of Integration",name:"Unit 8: Applications of Integration",sub:BC?"Average value, motion, area, volume (disks, washers, cross sections), and arc length (BC)":"Average value, position and distance, area between curves, volumes by disks, washers and cross sections",c:PURP,
 flow:flow({M:U8M,label:"Applications of integration flowchart",lead:"Which integral? Decide what quantity you're accumulating.",start:"Apply the integral",top:["g0"],q:"What are you finding?",
  cols:[["Average / motion","",ORG,["gav"]],["Area","",RED,["garea"]],["Volume","",PURP,["gvol"]],["Arc length","",TEAL,["garc"]]],end:"gend"}),
 sheet:[[ORG,"Average & motion",["Average value = (1/(b − a))∫f","Displacement ∫v, distance ∫|v|"],""],[RED,"Area",["∫(top − bottom) dx","∫(right − left) dy"],""],
  [PURP,"Volume",["Disk π∫R"+sq,"Washer π∫(R"+sq+" − r"+sq+")","Cross sections ∫A(x)dx"],""]].concat(BC?[[TEAL,"Arc length (BC)",["L = ∫√(1 + (y′)"+sq+") dx"],""]]:[]),
 gen:[
 ()=>{ const k=R(1,6); return PF("Area between curves",`Find the area between y = x${sq} and y = ${k}x.`,k**3,6,[F(k**3,3),F(k**2,2),F(k**3,2)],[`Intersections: x = 0 and x = ${k}`,`∫<sub>0</sub><sup>${k}</sup>(${k}x − x${sq}) dx = ${k}·${k*k}/2 − ${k**3}/3`,`= <b>${F(k**3,6)}</b>`]); },
 ()=>{ const m=R(1,4); return PF("Area under a curve",`Find the area between y = ${m*m} − x${sq} and the x-axis.`,4*m**3,3,[F(2*m**3,3),N(2*m*m*m),F(m**3,3)],[`Roots x = ±${m}`,`∫<sub>−${m}</sub><sup>${m}</sup>(${m*m} − x${sq}) dx = 2(${m**3} − ${m**3}/3)`,`= <b>${F(4*m**3,3)}</b>`]); },
 ()=>{ const b=R(1,6); return PF("Volume (disks)",`The region under y = √x, 0 ≤ x ≤ ${b}, is revolved about the x-axis. V = kπ. Find k.`,b*b,2,[N(b*b),F(b**3,3),F(b,2)],[`V = π∫<sub>0</sub><sup>${b}</sup> (√x)${sq} dx = π∫ x dx`,`= π·${b*b}/2: <b>k = ${F(b*b,2)}</b>`]); },
 ()=>{ const c=R(1,4),b=c+R(1,3); const disp=b*b/2-c*b, dist=c*c/2+(b-c)**2/2; const isD=Math.random()<.5; return PF(isD?"Displacement":"Total distance",`v(t) = t − ${c} for 0 ≤ t ≤ ${b}. Find the ${isD?"displacement":"total distance traveled"}.`,isD?2*disp:2*dist,2,[F(2*(isD?dist:disp),2),N(b-c),F(b*b,2)],[`${isD?"∫v":"∫|v|"} from 0 to ${b}`,isD?`[t${sq}/2 − ${c}t]<sub>0</sub><sup>${b}</sup> = ${N(disp)}`:`Left of t = ${c}: ${N(c*c/2)}; right: ${N((b-c)**2/2)}`,`<b>${F(2*(isD?disp:dist),2)}</b>`]); },
 ()=>{ const b=R(1,5); return PF("Cross sections",`The base is the region under y = √x for 0 ≤ x ≤ ${b}. Cross sections perpendicular to the x-axis are squares. Find the volume.`,b*b,2,[F(b**3,3),N(b*b),F(b*b,4)],[`A(x) = (√x)${sq} = x`,`V = ∫<sub>0</sub><sup>${b}</sup> x dx = <b>${F(b*b,2)}</b>`]); },
 B(()=>{ const m=R(2,4),b=m*m-1; return PF("Arc length (BC)",`Find the arc length of y = (2/3)x<sup>3/2</sup> for 0 ≤ x ≤ ${b}.`,2*(m**3-1),3,[F(2*m**3,3),N(b),F(m**3-1,3)],[`y′ = √x, so L = ∫<sub>0</sub><sup>${b}</sup> √(1 + x) dx`,`= (2/3)[(1 + x)<sup>3/2</sup>] = (2/3)(${m**3} − 1)`,`= <b>${F(2*(m**3-1),3)}</b>`]); })],
 chal:[
 ()=>{ return PF("Washers",`The region between y = x and y = x${sq} is revolved about the x-axis. V = kπ. Find k.`,2,15,[F(1,6),F(1,15),F(2,3)],[`R = x, r = x${sq} on [0, 1]`,`π∫(x${sq} − x<sup>4</sup>) dx = π(1/3 − 1/5)`,`<b>k = ${F(2,15)}</b>`]); },
 ()=>{ const a=R(1,4); return PF("Shells",`The region under y = x(${a} − x) (above the x-axis) is revolved about the y-axis. V = kπ. Find k.`,a**4,6,[F(a**4,12),F(a**3,6),F(a**4,3)],[`Shells: V = 2π∫<sub>0</sub><sup>${a}</sup> x·x(${a} − x) dx`,`= 2π(${a}·${a**3}/3 − ${a**4}/4) = π·${a**4}/6`,`<b>k = ${F(a**4,6)}</b>`]); },
 ()=>{ const b=R(2,6); return PF("Semicircle cross sections",`The base is the region between y = x and the x-axis for 0 ≤ x ≤ ${b}. Cross sections perpendicular to the x-axis are semicircles. V = kπ. Find k.`,b**3,24,[F(b**3,6),F(b**3,8),F(b**2,8)],[`Diameter x, radius x/2: A = (π/2)(x/2)${sq} = πx${sq}/8`,`V = (π/8)∫<sub>0</sub><sup>${b}</sup> x${sq} dx = π·${b**3}/24`,`<b>k = ${F(b**3,24)}</b>`]); }]
};

/* ======================= UNIT 9 (BC): Parametric, polar, vectors ======================= */
const U9M={
 p0:{grp:"Step 1",c:NAVY,name:"Which Representation?",hint:"t, θ or a vector",when:"Every Unit 9 problem.",rule:"Parametric: x(t), y(t). Polar: r(θ). Vector-valued: ⟨x(t), y(t)⟩. Each has its own slope, speed, length and area formulas.",
  ex:[T("x = t"+sq+", y = t"+cu,["Parametric"]),T("r = 2 + cos θ",["Polar"])]},
 pslope:{grp:"Parametric",c:ORG,name:"Parametric Slope & Concavity",hint:"(dy/dt)/(dx/dt)",when:"Tangent lines and concavity of parametric curves.",rule:"dy/dx = "+FR("dy/dt","dx/dt")+". d"+sq+"y/dx"+sq+" = "+FR("d/dt (dy/dx)","dx/dt")+".",
  ex:[T("x = t"+sq+", y = t"+cu+" at t = 2",["dy/dx = 3t"+sq+"/2t = 3t/2","<b>3</b>"]),T("Horizontal tangent",["dy/dt = 0 (and dx/dt ≠ 0)"])]},
 pspeed:{grp:"Parametric",c:ORG,name:"Speed & Arc Length",hint:"√(x′² + y′²)",when:"How fast, or how far along the curve.",rule:"Speed = √((dx/dt)"+sq+" + (dy/dt)"+sq+"). Length = ∫ speed dt.",
  ex:[T("x′ = 3, y′ = 4",["Speed <b>5</b>"]),T("x = 3t, y = 4t, 0 ≤ t ≤ 2",["∫5 dt = <b>10</b>"])]},
 ppolar:{grp:"Polar",c:RED,name:"Polar Area & Slope",hint:"½∫r²dθ",when:"Area inside a polar curve, or slope.",rule:"Area = ½∫r"+sq+" dθ. x = r cos θ, y = r sin θ; dy/dx = (dy/dθ)/(dx/dθ).",
  ex:[T("Area inside r = 2",["½∫<sub>0</sub><sup>2π</sup> 4 dθ = <b>4π</b>"]),T("Area inside r = 2 cos θ",["½∫<sub>−π/2</sub><sup>π/2</sup> 4cos"+sq+"θ dθ = <b>π</b>"])]},
 pvec:{grp:"Vectors",c:PURP,name:"Vector-Valued Motion",hint:"r → v → a",when:"Position vector of a particle.",rule:"v(t) = r′(t), a(t) = v′(t), speed = |v(t)|. Displacement = ∫v dt (componentwise).",
  ex:[T("r(t) = ⟨t"+sq+", t"+cu+"⟩",["v = ⟨2t, 3t"+sq+"⟩, a = ⟨2, 6t⟩"]),T("Speed at t = 1",["√(4 + 9) = <b>√13</b>"])]},
 pend:{grp:"Last step",c:GRN,name:"Match the Formula to the Form",hint:"don't mix them",when:"Every answer.",rule:"Polar area uses ½r"+sq+"; parametric slope divides the derivatives; vector speed is a magnitude. Check the bounds (θ or t).",
  ex:[T("Polar area mistake",["∫r dθ is not area"]),T("Units",["Speed is distance per time"])]}
};
const U9={id:"u9",num:9,short:"Parametric, Polar, Vectors",label:"Unit 9 (BC)",name:"Unit 9: Parametric Equations, Polar Coordinates, and Vector-Valued Functions",sub:"Parametric derivatives and arc length, vector-valued motion, polar coordinates, slopes and areas",c:RED,
 flow:{M:U9M,label:"Unit 9 flowchart",lead:"Parametric, polar or vector? Each has its own formulas.",start:"Unit 9 problem",top:["p0"],q:"What form is the curve in?",
  cols:[["Parametric","x(t), y(t)",ORG,["pslope","pspeed"]],["Polar","r(θ)",RED,["ppolar"]],["Vector","⟨x(t), y(t)⟩",PURP,["pvec"]]],end:"pend"},
 sheet:[[ORG,"Parametric",["dy/dx = (dy/dt)/(dx/dt)","Speed √(x′"+sq+" + y′"+sq+")","Length ∫√(x′"+sq+" + y′"+sq+") dt"],""],[RED,"Polar",["x = r cos θ, y = r sin θ","Area ½∫r"+sq+" dθ"],""],[PURP,"Vectors",["v = r′, a = v″","Speed |v|"],""]],
 gen:[
 ()=>{ const p=R(1,5),q=R(-5,5),t=R(1,4); return PF("Parametric slope",`x = t${sq} + ${p}t, y = t${cu}${q?sg(q):""}. Find dy/dx at t = ${t}.`,3*t*t,2*t+p,[F(2*t+p,3*t*t),N(3*t*t),F(3*t,2)],[`dy/dt = 3t${sq}, dx/dt = 2t + ${p}`,`At t = ${t}: ${3*t*t}/${2*t+p} = <b>${F(3*t*t,2*t+p)}</b>`]); },
 ()=>{ const [a,b,c]=pick(T3); return P("Speed",`At t = 1, dx/dt = ${a} and dy/dt = ${b}. What is the speed?`,c,[a+b,c*c,Math.abs(b-a)],[`√(${a*a} + ${b*b})`,`<b>${c}</b>`]); },
 ()=>{ const a=R(1,6),cs=Math.random()<.5; return P("Polar area",`The area inside r = ${cs?a+" cos θ":a} is kπ. Find k.`,cs?a*a/4:a*a,[cs?a*a:a*a/4,a*a/2,a],[cs?`r = ${a} cos θ is a circle of diameter ${a}`:`r = ${a} is a circle of radius ${a}`,`Area = π(${cs?a/2:a})${sq}: <b>k = ${N(cs?a*a/4:a*a)}</b>`]); },
 ()=>{ const r=R(2,8); return P("Polar to rectangular",`Convert the polar point (${r}, π/3) to rectangular. Give x.`,r/2,[r,r*Math.sqrt(3)/2,r/3].map(r2),[`x = r cos θ = ${r}·½`,`<b>x = ${N(r/2)}</b>`]); },
 ()=>{ const t=R(1,3); return P("Vector motion",`r(t) = ⟨t${sq}, t${cu}⟩. Find the y-component of acceleration at t = ${t}.`,6*t,[3*t*t,6,2],[`v = ⟨2t, 3t${sq}⟩, a = ⟨2, 6t⟩`,`At t = ${t}: <b>${6*t}</b>`]); }],
 chal:[
 ()=>{ const S=pick([[3,"√3",4,14],[8,"√8",9,52]]); return PF("Parametric arc length",`x = t${sq}, y = (2/3)t${cu}, 0 ≤ t ≤ ${S[1]}. Find the arc length.`,S[3],3,[F(S[3],2),N(S[0]),F(S[3]+2,3)],[`Speed = √(4t${sq} + 4t<sup>4</sup>) = 2t√(1 + t${sq})`,`L = ∫2t√(1 + t${sq}) dt = (2/3)(1 + t${sq})<sup>3/2</sup> from 0 to ${S[1]}`,`= (2/3)(${S[2]}<sup>3/2</sup> − 1) = <b>${F(S[3],3)}</b>`]); },
 ()=>{ return P("Polar area",`Find the area of one petal of r = cos(2θ). Give the decimal (3 places).`,Math.PI/8,[Math.PI/4,Math.PI/2,0.5].map(r3),[`One petal: −π/4 ≤ θ ≤ π/4`,`½∫cos${sq}(2θ) dθ = π/8 ≈ <b>${r3(Math.PI/8)}</b>`],{tol:.002,a:`π/8 ≈ ${r3(Math.PI/8)}`}); },
 ()=>{ const k=R(1,4); return P("Parametric concavity",`x = t${sq}, y = t${cu}. Find d${sq}y/dx${sq} at t = ${k}.`,3/(4*k),[3*k/2,3/(2*k),6*k].map(r3),[`dy/dx = 3t/2; d/dt(3t/2) = 3/2`,`d${sq}y/dx${sq} = (3/2)/(2t) = 3/(4t) → <b>${F(3,4*k)}</b>`],{a:F(3,4*k),tol:.001}); }]
};

/* ======================= UNIT 10 (BC): Sequences and series ======================= */
const UXM={
 s0:{grp:"Step 1",c:NAVY,name:"nth-Term Test First",hint:"lim aₙ ≠ 0 ⇒ diverges",when:"Any series Σaₙ.",rule:"If lim aₙ ≠ 0, the series diverges. If lim aₙ = 0, you need another test.",
  ex:[T("Σ n/(n + 1)",["aₙ → 1 ≠ 0: <b>diverges</b>"]),T("Σ 1/n",["aₙ → 0: inconclusive (it diverges, harmonic)"])]},
 sgeo:{grp:"Recognize the form",c:ORG,name:"Geometric & p-Series",hint:"|r| &lt; 1, p &gt; 1",when:"Σ ar<sup>n</sup> or Σ 1/n<sup>p</sup>.",rule:"Geometric converges ⇔ |r| &lt; 1, sum a/(1 − r). p-series converges ⇔ p &gt; 1.",
  ex:[T("Σ<sub>n=0</sub><sup>∞</sup> 3(½)<sup>n</sup>",["<b>6</b>"]),T("Σ 1/n<sup>1.5</sup>",["p = 1.5 &gt; 1: <b>converges</b>"])]},
 scomp:{grp:"Compare",c:RED,name:"Comparison & Integral Tests",hint:"looks like a known series",when:"Positive terms that resemble a p-series or geometric series.",rule:"Direct comparison: smaller than convergent ⇒ converges; bigger than divergent ⇒ diverges. Limit comparison: lim aₙ/bₙ = positive finite ⇒ same behavior. Integral test for decreasing positive f.",
  ex:[T("Σ 1/(n"+sq+" + 1)",["&lt; 1/n"+sq+": <b>converges</b>"]),T("Σ 1/(2n + 3)",["Limit comparison with 1/n: <b>diverges</b>"])]},
 salt:{grp:"Alternating",c:PURP,name:"Alternating Series Test & Error",hint:"terms ↓ to 0",when:"Signs alternate.",rule:"Converges if |aₙ| decreases to 0. Error after n terms ≤ |a<sub>n+1</sub>|. Absolute vs. conditional convergence.",
  ex:[T("Σ (−1)<sup>n</sup>/n",["<b>Converges conditionally</b>"]),T("Error using 4 terms of Σ(−1)<sup>n</sup>/n"+sq,["≤ 1/25"])]},
 sratio:{grp:"Factorials / powers",c:TEAL,name:"Ratio Test & Radius",hint:"lim |a<sub>n+1</sub>/aₙ|",when:"Factorials, powers of n, power series.",rule:"L = lim |a<sub>n+1</sub>/aₙ|. L &lt; 1 converges, L &gt; 1 diverges, L = 1 inconclusive. For power series, solve L &lt; 1 for the radius; test endpoints separately.",
  ex:[T("Σ xⁿ/3ⁿ",["|x|/3 &lt; 1: radius <b>3</b>"]),T("Σ n!/nⁿ",["L = 1/e &lt; 1: converges"])]},
 stay:{grp:"Taylor",c:BLU,name:"Taylor & Maclaurin Series",hint:"f⁽ⁿ⁾(a)/n!",when:"Polynomial approximations and known series.",rule:"Coefficient of (x − a)ⁿ is f<sup>(n)</sup>(a)/n!. Know e<sup>x</sup>, sin x, cos x, 1/(1 − x). Lagrange error ≤ max|f<sup>(n+1)</sup>|·|x − a|<sup>n+1</sup>/(n + 1)!.",
  ex:[T("e<sup>x</sup> = 1 + x + x"+sq+"/2! + …",["Coefficient of x"+cu+": <b>1/6</b>"]),T("sin x = x − x"+cu+"/3! + …",["Odd powers only"])]},
 send:{grp:"Last step",c:GRN,name:"State the Test & Conclusion",hint:"name it, check conditions",when:"Every series answer.",rule:"Name the test, show its conditions, and conclude converges/diverges (absolutely or conditionally).",
  ex:[T("Good",["“By the ratio test, L = 1/2 &lt; 1, so the series converges absolutely.”"]),T("Endpoints",["Test x = ±R separately"])]}
};
const UX={id:"u10",num:10,short:"Sequences & Series",label:"Unit 10 (BC)",name:"Unit 10: Infinite Sequences and Series",sub:"Convergence tests, geometric and p-series, alternating series error, power series, Taylor and Maclaurin series",c:TEAL,
 flow:{M:UXM,label:"Series tests flowchart",lead:"Which convergence test? Always start with the nth-term test.",start:"Does Σaₙ converge?",top:["s0"],q:"What does aₙ look like?",
  cols:[["Geometric / p","",ORG,["sgeo"]],["Like a known series","",RED,["scomp"]],["Alternating","",PURP,["salt"]],["Factorials / powers","",TEAL,["sratio"]],["Taylor","",BLU,["stay"]]],end:"send"},
 sheet:[[ORG,"Known series",["Σar<sup>n</sup>: |r| &lt; 1, sum a/(1 − r)","Σ1/n<sup>p</sup>: p &gt; 1"],""],[PURP,"Alternating",["|aₙ| ↓ 0 ⇒ converges","Error ≤ |a<sub>n+1</sub>|"],""],[TEAL,"Ratio test",["L &lt; 1 converges, L &gt; 1 diverges"],""],
  [BLU,"Maclaurin series",["e<sup>x</sup> = Σxⁿ/n!","sin x = Σ(−1)ⁿx<sup>2n+1</sup>/(2n + 1)!","cos x = Σ(−1)ⁿx<sup>2n</sup>/(2n)!","1/(1 − x) = Σxⁿ, |x| &lt; 1"],""]],
 gen:[
 ()=>{ const a=R(1,9),k=R(2,5),s=pick([1,-1]); return PF("Geometric series",`Find the sum Σ<sub>n=0</sub><sup>∞</sup> ${a}(${s<0?"−":""}1/${k})<sup>n</sup>.`,a*k,k-s,[F(a*k,k+s),N(a),F(a,k-1)],[`r = ${s<0?"−":""}1/${k}, |r| &lt; 1`,`S = ${a}/(1 − (${s<0?"−":""}1/${k})) = <b>${F(a*k,k-s)}</b>`]); },
 ()=>{ const k=R(2,9); return P("Radius of convergence",`Find the radius of convergence of Σ xⁿ/${k}ⁿ.`,k,[F(1,k),"1",N(k*k)],[`Ratio test: |x|/${k} &lt; 1`,`<b>R = ${k}</b>`]); },
 ()=>{ const k=nz(-3,3),n=R(2,4); return PF("Maclaurin coefficients",`Find the coefficient of x<sup>${n}</sup> in the Maclaurin series of e<sup>${X(k)}</sup>.`,k**n,fact(n),[F(k**n,n),F(1,fact(n)),N(k**n)],[`e<sup>u</sup> = Σuⁿ/n! with u = ${X(k)}`,`(${N(k)})<sup>${n}</sup>/${n}! = <b>${F(k**n,fact(n))}</b>`]); },
 ()=>{ const n=R(3,8),p=pick([1,2,3]); return PF("Alternating series error",`Using the first ${n} terms of Σ<sub>k=1</sub><sup>∞</sup> (−1)<sup>k+1</sup>/k${p>1?`<sup>${p}</sup>`:""}, what is the error bound?`,1,(n+1)**p,[F(1,n**p),F(1,(n+2)**p),F(1,n)],[`Error ≤ the first omitted term`,`1/${n+1}${p>1?`<sup>${p}</sup>`:""} = <b>${F(1,(n+1)**p)}</b>`]); },
 ()=>{ const S=pick([["Σ 1/n<sup>2</sup>","Converges (p-series, p = 2)"],["Σ 1/√n","Diverges (p-series, p = ½)"],["Σ n/(n + 1)","Diverges (nth-term test)"],["Σ (−1)ⁿ/n","Converges conditionally"],["Σ 2ⁿ/n!","Converges (ratio test)"]]); const others=["Converges (p-series, p = 2)","Diverges (p-series, p = ½)","Diverges (nth-term test)","Converges conditionally","Converges (ratio test)"].filter(x=>x!==S[1]); return PS("Convergence tests",`Which describes ${S[0]}?`,S[1],shuffle(others).slice(0,3),[`<b>${S[1]}</b>`]); },
 ()=>{ const f0=R(-5,5),f1=R(-5,5),f2=nz(-8,8); return PF("Taylor polynomials",`f(2) = ${N(f0)}, f′(2) = ${N(f1)}, f″(2) = ${N(f2)}. What is the coefficient of (x − 2)${sq} in the Taylor polynomial at x = 2?`,f2,2,[N(f2),F(f2,6),N(f1)],[`Coefficient = f″(2)/2!`,`= ${N(f2)}/2 = <b>${F(f2,2)}</b>`]); }],
 chal:[
 ()=>{ const k=R(2,5); return PF("Series sums",`Find Σ<sub>n=1</sub><sup>∞</sup> n/${k}ⁿ.`,k,(k-1)**2,[F(1,k-1),F(k,k-1),"∞"],[`Σnxⁿ = x/(1 − x)${sq} (differentiate Σxⁿ, multiply by x)`,`x = 1/${k}: (1/${k})/(${F((k-1)**2,k*k)}) = <b>${F(k,(k-1)**2)}</b>`]); },
 ()=>{ return P("Telescoping",`Find Σ<sub>n=1</sub><sup>∞</sup> 1/(n(n + 1)).`,1,[2,0.5,"∞"],[`1/(n(n + 1)) = 1/n − 1/(n + 1)`,`Partial sums 1 − 1/(N + 1) → <b>1</b>`]); },
 ()=>{ const c=R(-3,3),k=R(2,5); return PS("Interval of convergence",`Find the interval of convergence of Σ (x${sg(-c)})ⁿ/(n·${k}ⁿ).`,`[${N(c-k)}, ${N(c+k)})`,[`(${N(c-k)}, ${N(c+k)})`,`[${N(c-k)}, ${N(c+k)}]`,`(${N(c-k)}, ${N(c+k)}]`],[`Ratio test: |x${sg(-c)}| &lt; ${k}`,`x = ${N(c+k)}: Σ1/n diverges. x = ${N(c-k)}: Σ(−1)ⁿ/n converges.`,`<b>[${N(c-k)}, ${N(c+k)})</b>`]); },
 ()=>{ const n=R(2,4); return PF("Lagrange error",`The degree-${n} Maclaurin polynomial for e<sup>x</sup> is used at x = 1. Using max |f<sup>(${n+1})</sup>| ≤ 3, what is the Lagrange error bound?`,3,fact(n+1),[F(1,fact(n+1)),F(3,fact(n)),F(3,fact(n+2))],[`|R| ≤ M|x|<sup>${n+1}</sup>/(${n+1})!`,`= 3/${fact(n+1)} = <b>${F(3,fact(n+1))}</b>`]); }]
};

/* ======================= course ======================= */
const ALL=[U1,U2,U3,U4,U5,U6,U7,U8].concat(BC?[U9,UX]:[]);
ALL.forEach(u=>{ u.gen=(u.gen||[]).filter(g=>BC||!g.bc).map(g=>()=>{ for(let i=0;i<20;i++){ const p=g(); if(p) return p; } return g(); }); u.chal=(u.chal||[]).filter(g=>BC||!g.bc).map(g=>()=>{ for(let i=0;i<20;i++){ const p=g(); if(p) return p; } return g(); }); });
window.ZC={units:ALL,strands:BC?[["Units 1–8 (AB + BC topics)",NAVY,["u1","u2","u3","u4","u5","u6","u7","u8"]],["BC only",TEAL,["u9","u10"]]]:[["Units 1–8",NAVY,["u1","u2","u3","u4","u5","u6","u7","u8"]]],
  mapNote:BC?"Units 1–8 include the BC topics (marked BC); Units 9 and 10 are BC only.":"The eight units of AP Calculus AB, in course order."};
})();
