/* Z-Calculus FRQs (AP free-response style, new numbers each time) and the AP Exam Review unit. Loads after calc.js. */
(function(){
const {R,pick,nz,N,F,sq,cu,X,sg,poly,shuffle}=window.ZH;
const BC=window.ZCID==="bc";
const FR=(n,d)=>`<span class="frc"><span>${n}</span><span>${d}</span></span>`;
const FF=(n,d)=>{ const f=F(n,d); const m=f.match(/^(−?)(\d+)\/(\d+)$/); return m?`${m[1]}${FR(m[2],m[3])}`:f; };
const ig=(a,b)=>`∫<sub>${a}</sub><sup>${b}</sup>`;
const TB=(h,rows)=>`<table class="fq-tb"><tr>${h.map(x=>`<th>${x}</th>`).join("")}</tr>${rows.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join("")}</tr>`).join("")}</table>`;
const TBH=(rows)=>`<table class="fq-tb">${rows.map(r=>`<tr><th>${r[0]}</th>${r.slice(1).map(x=>`<td>${N(x)}</td>`).join("")}</tr>`).join("")}</table>`;
const r3=x=>+x.toFixed(3);
const Q=(t,stem,parts,calc)=>({t,stem,parts,calc:!!calc});
const B=f=>{ f.bc=1; return f; };
const pt=(q,s,a,p)=>[q,s,a,p||1];

const FRQ={
u1:[
()=>{ const a=nz(-4,4),c=R(-3,4),m=nz(-3,4); const d=1+c-m;
  return Q("Limits and continuity",`Let f(x) = ${FR("x"+sq+" − "+a*a,"x"+sg(-a))} for x ≠ ${N(a)}, and f(${N(a)}) = k. Let g(x) = x${sq}${c?sg(c):""} for x ≤ 1 and g(x) = ${X(m)} + d for x &gt; 1.`,[
  pt(`Find lim<sub>x→${N(a)}</sub> f(x). Show the work that leads to your answer.`,[`Substitution gives 0/0, so factor: (x${sg(-a)})(x${sg(a)})/(x${sg(-a)}) = x${sg(a)} for x ≠ ${N(a)}.`,`lim = ${N(a)} + ${N(a)} = ${N(2*a)}.`,`<i>1 pt: factoring/cancelling; 1 pt: the value.</i>`],N(2*a),2),
  pt(`For what value of k is f continuous at x = ${N(a)}? Justify using the definition of continuity.`,[`Continuity needs f(${N(a)}) = lim<sub>x→${N(a)}</sub> f(x).`,`So k = ${N(2*a)}.`,`<i>1 pt: answer with the three-part justification.</i>`],`k = ${N(2*a)}`),
  pt(`Find the value of d that makes g continuous at x = 1.`,[`Left: g(1) = 1${c?sg(c):""} = ${N(1+c)}. Right: lim<sub>x→1⁺</sub> = ${N(m)} + d.`,`${N(m)} + d = ${N(1+c)} ⇒ d = ${N(d)}.`],`d = ${N(d)}`),
  pt(`With this d, is g differentiable at x = 1? Explain.`,[`Left derivative: 2x = 2 at x = 1. Right derivative: ${N(m)}.`,m===2?`They match, so g is differentiable at x = 1.`:`2 ≠ ${N(m)}, so g has a corner: not differentiable at x = 1.`],m===2?"Yes":"No")]); },
()=>{ const p=nz(-5,5),a=nz(-4,4); let b=nz(-5,5); if(b===a) b=a+1===0?a+2:a+1; const hy=p*a/(a-b); const qn=p*a, qd=a-b;
  return Q("Asymptotes and discontinuities",`Let r(x) = ${FR(`${N(p)}x(x${sg(-a)})`,`(x${sg(-a)})(x${sg(-b)})`)}.`,[
  pt(`Find lim<sub>x→∞</sub> r(x) and state the horizontal asymptote.`,[`r(x) = ${FR(`${N(p)}x`,`x${sg(-b)}`)} for x ≠ ${N(a)}; degrees are equal.`,`Ratio of leading coefficients: ${N(p)}.`],`y = ${N(p)}`),
  pt(`Find all vertical asymptotes. Justify with a limit.`,[`After cancelling, the denominator is 0 only at x = ${N(b)} and the numerator there is ${N(p*b)} ≠ 0.`,`lim<sub>x→${N(b)}</sub> |r(x)| = ∞, so x = ${N(b)} is a vertical asymptote.`],`x = ${N(b)}`),
  pt(`r has a removable discontinuity. Find the coordinates of the hole.`,[`The factor (x${sg(-a)}) cancels, so x = ${N(a)} is a hole.`,`y = ${N(p)}(${N(a)})/(${N(a)}${sg(-b)}) = ${F(qn,qd)}.`],`(${N(a)}, ${F(qn,qd)})`),
  pt(`Find lim<sub>x→${N(b)}<sup>+</sup></sub> r(x).`,[`Near x = ${N(b)} from the right, x${sg(-b)} &gt; 0 and small.`,`The numerator → ${N(p*b)}.`,p*b>0?`Positive / small positive → +∞.`:`Negative / small positive → −∞.`],p*b>0?"+∞":"−∞")]); }],
u2:[
()=>{ const ts=[0,2,5,7,10]; const fv=ts.map(()=>R(-6,14)); const f5=fv[2],fp5=nz(-4,5);
  const g=10*f5+25*fp5; return Q("Derivatives from a table",`f is differentiable. Selected values of f are given, and f′(5) = ${N(fp5)}.${TBH([["x",...ts],["f(x)",...fv]])}`,[
  pt(`Estimate f′(3.5) using the table. Show the computation.`,[`Use the interval [2, 5], which contains 3.5:`,`(f(5) − f(2))/(5 − 2) = (${N(fv[2])} − ${N(fv[1])})/3 = ${F(fv[2]-fv[1],3)}.`],F(fv[2]-fv[1],3)),
  pt(`Write the tangent line to f at x = 5 and use it to approximate f(5.2).`,[`y = ${N(f5)} + ${N(fp5)}(x − 5).`,`f(5.2) ≈ ${N(f5)} + ${N(fp5)}(0.2) = ${N(r3(f5+0.2*fp5))}.`],N(r3(f5+0.2*fp5)),2),
  pt(`Let g(x) = x${sq}f(x). Find g′(5).`,[`Product rule: g′(x) = 2x f(x) + x${sq}f′(x).`,`g′(5) = 10(${N(f5)}) + 25(${N(fp5)}) = ${N(g)}.`],N(g),2),
  pt(`Let h(x) = f(x)/x. Find h′(5).`,[`Quotient rule: h′(x) = (x f′(x) − f(x))/x${sq}.`,`h′(5) = (5·${N(fp5)} − ${N(f5)})/25 = ${F(5*fp5-f5,25)}.`],F(5*fp5-f5,25))]); },
()=>{ const a=3*R(1,3),b=R(-6,6); const fp1=3-2*a, f1=1-a+b;
  return Q("Rules and tangent lines",`Let f(x) = x${cu} − ${a}x${sq}${b?sg(b):""}.`,[
  pt(`Find f′(x).`,[`Power rule term by term.`],`3x${sq} − ${2*a}x`),
  pt(`Write the equation of the tangent line at x = 1.`,[`f(1) = ${N(f1)}, f′(1) = ${N(fp1)}.`,`y − ${N(f1)} = ${N(fp1)}(x − 1).`],`y = ${N(fp1)}(x − 1)${sg(f1)}`,2),
  pt(`Find the x-values where the tangent line is horizontal.`,[`3x${sq} − ${2*a}x = x(3x − ${2*a}) = 0.`,`x = 0 and x = ${2*a/3}.`],`x = 0, ${2*a/3}`),
  pt(`Evaluate lim<sub>h→0</sub> ${FR("f(1 + h) − f(1)","h")}. Explain.`,[`This is the definition of f′(1).`,`= ${N(fp1)}.`],N(fp1))]); }],
u3:[
()=>{ const g1=R(2,3),g2=R(1,3),gp1=nz(-3,4),gp2=nz(-3,4); const f=[0,R(1,6),R(1,6),R(1,6)], fp=[0,nz(-4,5),nz(-4,5),nz(-4,5)]; const gv={1:g1,2:g2}, gpv={1:gp1,2:gp2};
  const g3=R(1,3),gp3=nz(-3,3);
  return Q("Chain rule with tables",`The table gives values of f, f′, g and g′.${TB(["x","f(x)","f′(x)","g(x)","g′(x)"],[1,2,3].map(x=>[x,N(f[x]),N(fp[x]),N(x===3?g3:gv[x]),N(x===3?gp3:gpv[x])]))}`,[
  pt(`Let h(x) = f(g(x)). Find h′(1).`,[`h′(1) = f′(g(1))·g′(1) = f′(${g1})·${N(gp1)}.`,`= ${N(fp[g1])}·${N(gp1)} = ${N(fp[g1]*gp1)}.`],N(fp[g1]*gp1),2),
  pt(`Let k(x) = (g(x))${cu}. Find k′(2).`,[`k′ = 3(g(x))${sq}g′(x).`,`k′(2) = 3(${N(g2)})${sq}(${N(gp2)}) = ${N(3*g2*g2*gp2)}.`],N(3*g2*g2*gp2)),
  pt(`f has an inverse. Find (f<sup>−1</sup>)′(${N(f[2])}).`,[`f(2) = ${N(f[2])}, so (f<sup>−1</sup>)′(${N(f[2])}) = 1/f′(2).`,`= ${F(1,fp[2])}.`],F(1,fp[2])),
  pt(`Let m(x) = ln(f(x)). Find m′(3).`,[`m′ = f′(x)/f(x).`,`m′(3) = ${N(fp[3])}/${N(f[3])} = ${F(fp[3],f[3])}.`],F(fp[3],f[3]))]); },
()=>{ const p=nz(-3,3),q=nz(-3,3); if(p+2*q===0) return null; const c=p*p+p*q+q*q; const mn=-(2*p+q), md=p+2*q;
  return Q("Implicit differentiation",`Consider the curve x${sq} + xy + y${sq} = ${c}.`,[
  pt(`Show that dy/dx = −${FR("2x + y","x + 2y")}.`,[`Differentiate: 2x + (y + x y′) + 2y y′ = 0.`,`y′(x + 2y) = −(2x + y), so y′ = −(2x + y)/(x + 2y).`],"",2),
  pt(`Find the slope of the curve at (${N(p)}, ${N(q)}).`,[`−(2(${N(p)}) + ${N(q)})/(${N(p)} + 2(${N(q)})) = ${F(mn,md)}.`],F(mn,md)),
  pt(`Write the tangent line at (${N(p)}, ${N(q)}).`,[`y − ${N(q)} = ${F(mn,md)}(x − ${N(p)}).`],`y − ${N(q)} = ${F(mn,md)}(x − ${N(p)})`),
  pt(`Find the x-coordinates of the points where the tangent line is horizontal.`,[`Horizontal: 2x + y = 0, so y = −2x.`,`x${sq} − 2x${sq} + 4x${sq} = 3x${sq} = ${c} ⇒ x = ±√${Number.isInteger(c/3)?c/3:`(${c}/3)`}.`],`x = ±√${Number.isInteger(c/3)?c/3:`(${c}/3)`}`,2)]); }],
u4:[
()=>{ let a=R(1,3),b=a+R(1,3); if((a+b)%2) b++; const c=R(0,b+2); const v=t=>3*(t-a)*(t-b), ac=t=>6*t-3*(a+b); const s0=R(-5,5);
  const sp=v(c)*ac(c); return Q("Particle motion",`A particle moves on the x-axis with position x(t) = t${cu} − ${3*(a+b)/2}t${sq} + ${3*a*b}t${sg(s0)} for t ≥ 0.`,[
  pt(`Find v(t) and the times when the particle is at rest.`,[`v(t) = 3t${sq} − ${3*(a+b)}t + ${3*a*b} = 3(t − ${a})(t − ${b}).`,`At rest when v = 0: t = ${a} and t = ${b}.`],`t = ${a}, ${b}`,2),
  pt(`On what interval is the particle moving left? Justify.`,[`Moving left ⇔ v(t) &lt; 0.`,`v &lt; 0 between the roots.`],`${a} &lt; t &lt; ${b}`),
  pt(`Find the acceleration at t = ${c}.`,[`a(t) = 6t − ${3*(a+b)}.`,`a(${c}) = ${N(ac(c))}.`],N(ac(c))),
  pt(`Is the speed increasing or decreasing at t = ${c}? Justify.`,[`v(${c}) = ${N(v(c))}, a(${c}) = ${N(ac(c))}.`,sp>0?`Same signs: speed is increasing.`:sp<0?`Opposite signs: speed is decreasing.`:`One of them is 0: the speed is momentarily neither increasing nor decreasing.`],sp>0?"Increasing":sp<0?"Decreasing":"Neither")]); },
()=>{ const [a,b,c]=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17]]),r=R(1,4);
  return Q("Related rates",`A ${c}-foot ladder leans against a wall. The bottom slides away from the wall at ${r} ft/s. Let x be the distance from the wall to the bottom, y the height of the top, and θ the angle between the ladder and the ground.`,[
  pt(`How fast is the top sliding down when x = ${a}?`,[`x${sq} + y${sq} = ${c*c}; when x = ${a}, y = ${b}.`,`2x x′ + 2y y′ = 0 ⇒ y′ = −x x′/y = −(${a})(${r})/${b} = ${F(-a*r,b)} ft/s.`],`${F(-a*r,b)} ft/s`,2),
  pt(`How fast is θ changing at that moment?`,[`cos θ = x/${c} ⇒ −sin θ·θ′ = x′/${c}.`,`sin θ = ${b}/${c}, so θ′ = −${r}/(${c}·${b}/${c}) = ${F(-r,b)} rad/s.`],`${F(-r,b)} rad/s`,2),
  pt(`How fast is the area of the triangle formed by the wall, ground and ladder changing?`,[`A = ½xy ⇒ A′ = ½(x′y + x y′).`,`= ½(${r}·${b} + ${a}·${F(-a*r,b)}) = ${F(r*(b*b-a*a),2*b)} ft${sq}/s.`],`${F(r*(b*b-a*a),2*b)} ft${sq}/s`,2)]); }],
u5:[
()=>{ const a=R(1,4),C=R(-5,5);
  return Q("Analyzing f from f′",`f is defined for all x, with f′(x) = x${sq}(x − ${a}) and f(0) = ${N(C)}.`,[
  pt(`Find the x-values of all relative extrema of f. Classify each and justify.`,[`f′ = 0 at x = 0 and x = ${a}.`,`At x = 0, f′ is negative on both sides: no extremum.`,`At x = ${a}, f′ changes from negative to positive: relative minimum.`],`Relative min at x = ${a}`,2),
  pt(`Find the intervals where the graph of f is concave down.`,[`f″(x) = 3x${sq} − ${2*a}x = x(3x − ${2*a}).`,`f″ &lt; 0 between the roots.`],`0 &lt; x &lt; ${F(2*a,3)}`,2),
  pt(`Find the x-coordinates of the points of inflection.`,[`f″ changes sign at x = 0 and x = ${F(2*a,3)}.`],`x = 0, ${F(2*a,3)}`),
  pt(`Find the absolute minimum value of f.`,[`f(x) = x<sup>4</sup>/4 − ${a}x${cu}/3 + ${N(C)}.`,`The only relative min is at x = ${a}, and f → ∞ at both ends, so it is the absolute min.`,`f(${a}) = ${a**4}/4 − ${a**4}/3 + ${N(C)} = ${F(-(a**4)+12*C,12)}.`],F(-(a**4)+12*C,12),2)]); },
()=>{ const L=4*R(10,50), rv=R(2,6)*10; const x=L/4, A=L*L/8;
  return Q("Optimization",`A farmer has ${L} m of fencing for a rectangular field along a straight river. No fence is needed along the river. The fence costs nothing extra at corners.`,[
  pt(`Write the area A as a function of x, the length of each side perpendicular to the river.`,[`The side parallel to the river is ${L} − 2x.`,`A(x) = x(${L} − 2x), 0 &lt; x &lt; ${L/2}.`],`A = x(${L} − 2x)`),
  pt(`Find the dimensions that give the largest area. Justify that it is a maximum.`,[`A′ = ${L} − 4x = 0 ⇒ x = ${x}.`,`A″ = −4 &lt; 0, so it's a maximum.`,`Dimensions ${x} m × ${L/2} m.`],`${x} m by ${L/2} m`,3),
  pt(`What is the maximum area?`,[`A(${x}) = ${x}·${L/2} = ${A}.`],`${A} m${sq}`),
  pt(`Does the MVT guarantee a c in (0, ${x}) with A′(c) = ${N((A-0)/x)}? Explain.`,[`A is a polynomial: continuous and differentiable.`,`(A(${x}) − A(0))/${x} = ${N(A/x)}, so yes.`],"Yes")],false); }],
u6:[
()=>{ const ts=[0,2,5,9,10]; const Rv=ts.map(()=>R(4,20)); const dts=[2,3,4,1]; const trap=dts.reduce((s,d,i)=>s+d*(Rv[i]+Rv[i+1])/2,0), left=dts.reduce((s,d,i)=>s+d*Rv[i],0); const W0=R(50,200);
  return Q("Accumulation from a table",`Water flows into a tank at R(t) liters per minute. R is differentiable. At t = 0 the tank holds ${W0} liters.${TBH([["t (min)",...ts],["R(t) (L/min)",...Rv]])}`,[
  pt(`Estimate R′(3.5). Show the computation and give units.`,[`(R(5) − R(2))/(5 − 2) = (${Rv[2]} − ${Rv[1]})/3 = ${F(Rv[2]-Rv[1],3)} L/min per min.`],`${F(Rv[2]-Rv[1],3)} L/min${sq}`),
  pt(`Use a trapezoidal sum with the four subintervals to approximate ${ig(0,10)} R(t) dt. Explain its meaning.`,[`2(${Rv[0]} + ${Rv[1]})/2 + 3(${Rv[1]} + ${Rv[2]})/2 + 4(${Rv[2]} + ${Rv[3]})/2 + 1(${Rv[3]} + ${Rv[4]})/2`,`= ${N(trap)} liters: the water added from t = 0 to t = 10.`],`${N(trap)} L`,2),
  pt(`Use a left Riemann sum to approximate the same integral.`,[`2(${Rv[0]}) + 3(${Rv[1]}) + 4(${Rv[2]}) + 1(${Rv[3]}) = ${left}.`],`${left} L`),
  pt(`Use the trapezoid estimate to approximate the amount in the tank at t = 10 and the average rate of flow.`,[`${W0} + ${N(trap)} = ${N(W0+trap)} L.`,`Average rate: ${N(trap)}/10 = ${N(trap/10)} L/min.`],`${N(W0+trap)} L; ${N(trap/10)} L/min`,2)],true); },
()=>{ const a=R(1,5);
  return Q("Accumulation functions",`Let g(x) = ${ig(0,"x")} (t${sq} − ${a}t) dt.`,[
  pt(`Find g′(x) and g″(x).`,[`FTC: g′(x) = x${sq} − ${a}x.`,`g″(x) = 2x − ${a}.`],`g′ = x${sq} − ${a}x, g″ = 2x − ${a}`),
  pt(`Find the x-values of the relative extrema of g and classify them.`,[`g′ = x(x − ${a}) = 0 at x = 0, ${a}.`,`g′ changes + → − at 0 (relative max) and − → + at ${a} (relative min).`],`Max at 0, min at ${a}`,2),
  pt(`Find g(${a}).`,[`${ig(0,a)} (t${sq} − ${a}t) dt = ${a**3}/3 − ${a}·${a*a}/2`,`= ${F(-(a**3),6)}.`],F(-(a**3),6)),
  pt(`Find the x-coordinate of the point of inflection.`,[`g″ = 0 at x = ${F(a,2)} and changes sign.`],F(a,2))]); },
B(()=>{ const b=R(1,4),p=R(2,5);
  return Q("Parts and improper integrals (BC)",`Answer the following about integrals of x e<sup>−x</sup> and x<sup>−p</sup>.`,[
  pt(`Find ∫ x e<sup>−x</sup> dx.`,[`Parts: u = x, dv = e<sup>−x</sup>dx ⇒ v = −e<sup>−x</sup>.`,`−x e<sup>−x</sup> + ∫e<sup>−x</sup>dx = −x e<sup>−x</sup> − e<sup>−x</sup> + C.`],`−(x + 1)e<sup>−x</sup> + C`,2),
  pt(`Evaluate ${ig(0,b)} x e<sup>−x</sup> dx (exact).`,[`[−(x + 1)e<sup>−x</sup>]<sub>0</sub><sup>${b}</sup> = −${b+1}e<sup>−${b}</sup> + 1.`],`1 − ${b+1}e<sup>−${b}</sup>`),
  pt(`Evaluate ${ig(0,"∞")} x e<sup>−x</sup> dx or show it diverges.`,[`lim<sub>b→∞</sub> (1 − (b + 1)e<sup>−b</sup>) = 1 − 0.`],"1",2),
  pt(`Evaluate ${ig(1,"∞")} x<sup>−${p}</sup> dx.`,[`lim<sub>b→∞</sub> [x<sup>${1-p}</sup>/(${1-p})]<sub>1</sub><sup>b</sup> = 0 + 1/${p-1}.`],F(1,p-1))]); })],
u7:[
()=>{ const a=R(2,5);
  return Q("Separable differential equation",`Consider dy/dx = ${FR("x + 1","y")} with y(0) = ${a}.`,[
  pt(`Find the slope at (0, ${a}) and use the tangent line to approximate y(0.2).`,[`dy/dx = 1/${a} at (0, ${a}).`,`y(0.2) ≈ ${a} + 0.2/${a} = ${N(r3(a+0.2/a))}.`],N(r3(a+0.2/a)),2),
  pt(`Find d${sq}y/dx${sq} at (0, ${a}). Is the approximation over or under?`,[`y″ = (y − (x + 1)y′)/y${sq}.`,`At (0, ${a}): (${a} − 1/${a})/${a*a} = ${F(a*a-1,a**3)} &gt; 0.`,`Concave up ⇒ the tangent line approximation is an underestimate.`],`${F(a*a-1,a**3)}; underestimate`,2),
  pt(`Find the particular solution y = f(x).`,[`y dy = (x + 1) dx ⇒ y${sq}/2 = x${sq}/2 + x + C.`,`y(0) = ${a} ⇒ C = ${F(a*a,2)}.`,`y = √(x${sq} + 2x + ${a*a}) (positive root, since y(0) &gt; 0).`],`y = √(x${sq} + 2x + ${a*a})`,3)]); },
()=>{ const y0=R(1,5)*100,k=pick([0.2,0.3,0.5]),M=y0*R(4,8);
  return Q(BC?"Exponential and logistic models":"Exponential models",BC?`A population satisfies dP/dt = ${k}P(1 − P/${M}) with P(0) = ${y0}. A second population satisfies dQ/dt = ${k}Q with Q(0) = ${y0}.`:`A population satisfies dQ/dt = ${k}Q with Q(0) = ${y0}.`,[
  pt(`Write Q(t) and find Q(10) to the nearest whole number.`,[`Q = ${y0}e<sup>${k}t</sup>.`,`Q(10) = ${y0}e<sup>${+(10*k).toFixed(1)}</sup> ≈ ${Math.round(y0*Math.exp(10*k))}.`],`${Math.round(y0*Math.exp(10*k))}`,2),
  pt(`How long does it take Q to double? (3 decimals)`,[`e<sup>${k}t</sup> = 2 ⇒ t = ln 2/${k}.`,`≈ ${r3(Math.log(2)/k)}.`],N(r3(Math.log(2)/k))),
  ...(BC?[pt(`Find lim<sub>t→∞</sub> P(t).`,[`P(0) &lt; ${M}, so P increases toward the carrying capacity.`],N(M)),
  pt(`For what value of P is P growing fastest?`,[`Logistic growth is fastest at M/2.`],N(M/2)),
  pt(`Use Euler's method with two steps of size 1 to approximate P(2).`,(()=>{ let P=y0; const st=[]; for(let i=1;i<=2;i++){ const d=k*P*(1-P/M); st.push(`P(${i}) ≈ ${N(r3(P))} + ${N(r3(d))} = ${N(r3(P+d))}`); P=P+d; } return st; })(),N(r3((()=>{let P=y0;for(let i=0;i<2;i++)P+=k*P*(1-P/M);return P;})())),2)]:[])],true); }],
u8:[
()=>{ const k=R(1,3);
  return Q("Area and volume",`Let R be the region bounded by y = ${k===1?"":k}x and y = x${sq}.`,[
  pt(`Find the area of R.`,[`Intersections at x = 0 and x = ${k}.`,`${ig(0,k)} (${k===1?"":k}x − x${sq}) dx = ${F(k**3,2)} − ${F(k**3,3)} = ${F(k**3,6)}.`],F(k**3,6),2),
  pt(`Find the volume when R is revolved about the x-axis.`,[`Washers: π${ig(0,k)} (${k*k===1?"":k*k}x${sq} − x<sup>4</sup>) dx.`,`= π(${F(k**5,3)} − ${F(k**5,5)}) = ${FF(2*k**5,15)}π.`],`${FF(2*k**5,15)}π`,2),
  pt(`R is the base of a solid whose cross sections perpendicular to the x-axis are squares. Find its volume.`,[`Side = ${k===1?"":k}x − x${sq}.`,`${ig(0,k)} (${k===1?"":k}x − x${sq})${sq} dx = ${F(k**5,30)}.`],F(k**5,30),2),
  pt(`Find the volume when R is revolved about y = −1.`,[`R = ${k===1?"":k}x + 1, r = x${sq} + 1.`,`π${ig(0,k)} ((${k===1?"":k}x + 1)${sq} − (x${sq} + 1)${sq}) dx = π(${F(2*k**5,15)} + ${F(k**3,3)}).`],`${FF(2*k**5+5*k**3,15)}π`,2)]); },
()=>{ const a=R(2,4),b=a+R(1,3),x0=R(-5,5); const disp=b**3/3-a*b*b/2; const dist=a**3/6+((b**3-a**3)/3-a*(b*b-a*a)/2);
  return Q("Motion with integrals",`A particle has velocity v(t) = t${sq} − ${a}t for 0 ≤ t ≤ ${b} and position x(0) = ${N(x0)}.`,[
  pt(`When does the particle change direction? Justify.`,[`v = t(t − ${a}) changes from negative to positive at t = ${a}.`],`t = ${a}`),
  pt(`Find the displacement from t = 0 to t = ${b}.`,[`${ig(0,b)} (t${sq} − ${a}t) dt = ${F(b**3,3)} − ${F(a*b*b,2)} = ${F(Math.round(disp*6),6)}.`],F(Math.round(disp*6),6),2),
  pt(`Find the total distance traveled.`,[`${ig(0,a)} |v| dt = ${F(a**3,6)}.`,`${ig(a,b)} v dt = ${F(Math.round((dist-a**3/6)*6),6)}.`,`Total ${F(Math.round(dist*6),6)}.`],F(Math.round(dist*6),6),2),
  pt(`Find x(${b}).`,[`x(${b}) = ${N(x0)} + ${F(Math.round(disp*6),6)}.`],F(Math.round((x0+disp)*6),6))]); },
B(()=>{ const m=R(2,4),b=m*m-1;
  return Q("Arc length (BC)",`Let f(x) = (2/3)x<sup>3/2</sup> for 0 ≤ x ≤ ${b}.`,[
  pt(`Write an integral for the arc length of f.`,[`f′(x) = √x, so L = ${ig(0,b)} √(1 + x) dx.`],`${ig(0,b)} √(1 + x) dx`),
  pt(`Evaluate it exactly.`,[`(2/3)(1 + x)<sup>3/2</sup> from 0 to ${b} = (2/3)(${m**3} − 1).`],F(2*(m**3-1),3),2)]); })],
u9:[
()=>{ const t0=R(1,4);
  return Q("Parametric motion",`A particle moves with x(t) = t${sq} and y(t) = (2/3)t${cu} for t ≥ 0.`,[
  pt(`Find dy/dx at t = ${t0}.`,[`dy/dx = (2t${sq})/(2t) = t.`],N(t0)),
  pt(`Find the speed at t = ${t0}.`,[`√((2t)${sq} + (2t${sq})${sq}) = 2t√(1 + t${sq}).`,`At t = ${t0}: ${2*t0}√${1+t0*t0}.`],`${2*t0}√${1+t0*t0}`),
  pt(`Find the distance traveled from t = 0 to t = √3.`,[`${ig(0,"√3")} 2t√(1 + t${sq}) dt = (2/3)(1 + t${sq})<sup>3/2</sup>.`,`(2/3)(8 − 1) = 14/3.`],F(14,3),2),
  pt(`Find d${sq}y/dx${sq} at t = ${t0}.`,[`d/dt(t) = 1; divide by dx/dt = 2t.`,`1/(2·${t0}) = ${F(1,2*t0)}.`],F(1,2*t0))]); },
()=>{ const a=R(1,4);
  return Q("Polar curve",`Consider the polar curve r = ${a}(1 + cos θ) for 0 ≤ θ ≤ 2π.`,[
  pt(`Find the area enclosed by the curve.`,[`½${ig(0,"2π")} ${a*a}(1 + cos θ)${sq} dθ = ${a*a/2}(2π + π).`,`= ${FF(3*a*a,2)}π.`],`${FF(3*a*a,2)}π`,2),
  pt(`Find dr/dθ at θ = π/2 and interpret it.`,[`dr/dθ = −${a} sin θ = −${a}.`,`r is decreasing: the point is moving closer to the origin.`],`−${a}`),
  pt(`Find the slope dy/dx at θ = π/2.`,[`y = r sin θ, x = r cos θ.`,`dy/dθ = r′sin θ + r cos θ = −${a}; dx/dθ = r′cos θ − r sin θ = −${a}.`,`dy/dx = 1.`],"1",2)]); }],
u10:[
()=>{ const f0=R(-3,5),f1=nz(-4,4),f2=nz(-6,6),f3=nz(-6,6),M=R(2,9); const v=f0+0.1*f1+f2*0.01/2+f3*0.001/6;
  return Q("Taylor polynomial",`f has derivatives of all orders. f(0) = ${N(f0)}, f′(0) = ${N(f1)}, f″(0) = ${N(f2)}, f‴(0) = ${N(f3)}, and |f<sup>(4)</sup>(x)| ≤ ${M} for all x.`,[
  pt(`Write the third-degree Maclaurin polynomial P₃(x).`,[`P₃ = f(0) + f′(0)x + f″(0)x${sq}/2! + f‴(0)x${cu}/3!.`],`${N(f0)}${sg(f1)}x${f2?` ${f2<0?"−":"+"} ${F(Math.abs(f2),2)}x${sq}`:""}${f3?` ${f3<0?"−":"+"} ${F(Math.abs(f3),6)}x${cu}`:""}`,2),
  pt(`Use P₃ to approximate f(0.1) (6 decimals).`,[`Substitute x = 0.1.`],N(+v.toFixed(6))),
  pt(`Use the Lagrange error bound to bound |f(0.1) − P₃(0.1)|.`,[`|R₃| ≤ ${M}(0.1)<sup>4</sup>/4! = ${M}/240000.`],`${F(M,240000)} ≈ ${(M/240000).toExponential(2)}`,2),
  pt(`Use P₃ to write the terms of degree ≤ 3 in the Maclaurin series for x·f(x).`,[`Multiply P₃ by x.`],`${N(f0)}x${sg(f1)}x${sq}${f2?` ${f2<0?"−":"+"} ${F(Math.abs(f2),2)}x${cu}`:""}`)]); },
()=>{ const c=R(-3,3),k=R(2,5);
  return Q("Power series",`Consider the series Σ<sub>n=1</sub><sup>∞</sup> ${FR(`(x${sg(-c)})<sup>n</sup>`,`n·${k}<sup>n</sup>`)}.`,[
  pt(`Find the radius of convergence. Show the ratio test.`,[`|a<sub>n+1</sub>/a<sub>n</sub>| = |x${sg(-c)}|·n/(${k}(n + 1)) → |x${sg(-c)}|/${k}.`,`&lt; 1 ⇔ |x${sg(-c)}| &lt; ${k}.`],`R = ${k}`,2),
  pt(`Determine convergence at each endpoint. Justify.`,[`x = ${N(c+k)}: Σ1/n, harmonic: diverges.`,`x = ${N(c-k)}: Σ(−1)<sup>n</sup>/n: terms decrease to 0, converges by the alternating series test.`],`[${N(c-k)}, ${N(c+k)})`,2),
  pt(`Find the first three terms of the derivative of the series.`,[`Differentiate term by term: Σ(x${sg(-c)})<sup>n−1</sup>/${k}<sup>n</sup>.`,`= 1/${k} + (x${sg(-c)})/${k*k} + (x${sg(-c)})${sq}/${k**3} + …`],`${F(1,k)} + ${FR(`x${sg(-c)}`,k*k)} + ${FR(`(x${sg(-c)})${sq}`,k**3)}`),
  pt(`What is the sum of the derivative series for |x${sg(-c)}| &lt; ${k}?`,[`It is geometric with first term 1/${k} and ratio (x${sg(-c)})/${k}.`,`Sum = (1/${k})/(1 − (x${sg(-c)})/${k}) = 1/(${k} − (x${sg(-c)})).`],FR(1,`${N(k+c)} − x`))]); }]
};

/* extra practice types (MCQ / deck / type) */
const {P,PF,PS,fact}=window.ZH;
const lim=a=>`lim<sub>x→${a}</sub>`;
const EX={
u1:[()=>{ const a=nz(-6,6),b=R(-5,5); return P("Limits at infinity",`${lim("∞")} ${FR(`${N(a)}x${sg(b)}`,`√(x${sq} + 1)`)}`,a,[-a,0,b],[`For x &gt; 0, √(x${sq} + 1) ≈ x.`,`Divide by x: ${FR(`${N(a)}${sg(b)}/x`,`√(1 + 1/x${sq})`)} → <b>${N(a)}</b>`]); },
 ()=>{ const q=R(1,6),p=R(-6,6); if(Math.abs(p)===q) return null; return PS("Vertical asymptotes",`Where are the vertical asymptotes of y = ${FR(`x${sg(p)}`,`x${sq} − ${q*q}`)}?`,`x = −${q} and x = ${q}`,[`x = ${N(-p)}`,`x = ${q} only`,`y = 0`],[`Denominator (x − ${q})(x + ${q}) = 0 and the numerator is not 0 there.`,`<b>x = ±${q}</b>`]); }],
u2:[()=>{ const a=2*R(1,5),b=16*nz(-3,3); return PF("Power rule",`f(x) = ${a}√x ${b<0?"−":"+"} ${Math.abs(b)}/x. Find f′(4).`,a*4-b,16,[F(a,4),F(a*4+b,16),F(-b,16)],[`f′(x) = ${a/2}x<sup>−1/2</sup> ${b<0?"+":"−"} ${Math.abs(b)}x<sup>−2</sup>`,`f′(4) = ${a/2}/2 ${b<0?"+":"−"} ${Math.abs(b)}/16 = <b>${F(a*4-b,16)}</b>`]); },
 ()=>{ const k=R(2,6); return P("Exponential derivatives",`f(x) = e<sup>x</sup>(x${sq} − ${k}). Find f′(0).`,-k,[k,0,1-k],[`Product rule: f′ = e<sup>x</sup>(x${sq} − ${k}) + e<sup>x</sup>(2x)`,`f′(0) = −${k} + 0 = <b>−${k}</b>`]); }],
u3:[()=>{ const c=R(1,8); return PF("Chain rule",`f(x) = ln(x${sq} + ${c}). Find f′(1).`,2,1+c,[F(1,1+c),F(2,c),"2"],[`f′(x) = ${FR("2x",`x${sq} + ${c}`)}`,`f′(1) = <b>${F(2,1+c)}</b>`]); },
 ()=>{ const k=R(2,7); return P("Trig chain rule",`f(x) = sin(${k}x) + cos(${k}x). Find f′(0).`,k,[1,0,-k],[`f′ = ${k}cos(${k}x) − ${k}sin(${k}x)`,`f′(0) = <b>${k}</b>`]); }],
u4:[()=>{ const n=R(2,6); return P("L'Hôpital",`${lim(1)} ${FR(`ln(x<sup>${n}</sup>)`,"x − 1")}`,n,[1,0,"∞"],[`0/0 → ${FR(`${n}/x`,1)}`,`<b>${n}</b>`]); },
 ()=>{ const a=R(1,4),b=R(-5,5),t1=R(0,2),t2=t1+R(1,3); const s=t=>a*t*t+b*t; return PF("Average vs. instantaneous",`s(t) = ${poly([a,b,0]).replace(/x/g,"t")}. Find the average velocity on [${t1}, ${t2}].`,s(t2)-s(t1),t2-t1,[N(2*a*t2+b),N(2*a*t1+b),N(s(t2))],[`(s(${t2}) − s(${t1}))/(${t2} − ${t1}) = (${N(s(t2))} − ${N(s(t1))})/${t2-t1}`,`= <b>${F(s(t2)-s(t1),t2-t1)}</b>`]); }],
u5:[()=>{ const a=R(1,4),b=R(1,5); return P("Second derivative test",`f′(${a}) = 0 and f″(${a}) = ${pick([-1,1])*b}. What happens at x = ${a}?`.replace(/= (-?\d+)\. What/,(m,v)=>`= ${N(+v)}. What`),0,[],[],{mc:true}); },
 ()=>{ const p=R(1,4); const k=2*p*p*p; return P("Critical points",`How many critical points does f(x) = x<sup>4</sup> − ${2*p*p}x${sq} have?`,3,[2,1,4],[`f′ = 4x${cu} − ${4*p*p}x = 4x(x − ${p})(x + ${p})`,`<b>3</b> (x = 0, ±${p})`]); }],
u6:[()=>{ const k=R(1,6); return PF("Trig integrals",`${ig(0,"π")} sin(${k===1?"":k}x) dx`,k%2?2:0,k,[F(1,k),"2",F(-2,k)],[`[−cos(${k}x)/${k}]<sub>0</sub><sup>π</sup> = (1 − cos(${k}π))/${k}`,`<b>${F(k%2?2:0,k)}</b>`]); },
 ()=>{ const k=R(2,6); return P("Antiderivatives",`F′(x) = ${k}x<sup>${k-1}</sup> and F(1) = ${k+3}. Find F(2).`,2**k+2,[2**k,2**k+3,k+3],[`F(x) = x<sup>${k}</sup> + C, F(1) = 1 + C = ${k+3} ⇒ C = ${k+2}`,`F(2) = ${2**k} + ${k+2} = <b>${2**k+k+2}</b>`]).v===2**k+2?P("Antiderivatives",`F′(x) = ${k}x<sup>${k-1}</sup> and F(1) = ${k+3}. Find F(2).`,2**k+k+2,[2**k,2**k+3,k+3],[`F(x) = x<sup>${k}</sup> + C, F(1) = 1 + C = ${k+3} ⇒ C = ${k+2}`,`F(2) = ${2**k} + ${k+2} = <b>${2**k+k+2}</b>`]):null; }],
u7:[()=>{ const k=nz(-4,4),c=R(1,9); return P("Equilibrium solutions",`dy/dx = ${N(k)}(y − ${c}). What is the equilibrium (constant) solution?`,c,[-c,k,0],[`dy/dx = 0 ⇔ y = ${c}`,`<b>y = ${c}</b>`]); },
 ()=>{ const a=R(1,5); return PS("Slope fields",`In the slope field of dy/dx = x − ${a}, where are the segments horizontal?`,`Along the vertical line x = ${a}`,[`Along the line y = ${a}`,`Along y = x`,`Nowhere`],[`dy/dx = 0 when x = ${a}, for every y.`,`<b>The vertical line x = ${a}</b>`]); }],
u8:[()=>{ const a=R(1,5); return PF("Area between curves",`Find the area between y = x${cu} and y = ${a*a}x for x ≥ 0.`,a**4,4,[F(a**4,2),F(a**4,12),N(a*a)],[`Intersect at x = 0 and x = ${a}`,`${ig(0,a)} (${a*a}x − x${cu}) dx = ${F(a**4,2)} − ${F(a**4,4)} = <b>${F(a**4,4)}</b>`]); },
 ()=>{ const b=R(1,4); return PF("Volume (disks)",`y = x, 0 ≤ x ≤ ${b}, revolved about the x-axis. V = kπ. Find k.`,b**3,3,[F(b*b,2),N(b**3),F(b**3,2)],[`π${ig(0,b)} x${sq} dx = π·${b**3}/3`,`<b>k = ${F(b**3,3)}</b>`]); }]
};
EX.u5[0]=()=>{ const a=R(1,4),s=pick([-1,1])*R(1,5); return PS("Second derivative test",`f′(${a}) = 0 and f″(${a}) = ${N(s)}. What does f have at x = ${a}?`,s<0?"A relative maximum":"A relative minimum",[s<0?"A relative minimum":"A relative maximum","A point of inflection","Not enough information"],[`f′ = 0 and f″ ${s<0?"&lt;":"&gt;"} 0: concave ${s<0?"down":"up"}.`,`<b>${s<0?"Relative maximum":"Relative minimum"}</b>`]); };
EX.u6[1]=()=>{ const k=R(2,6); return P("Antiderivatives",`F′(x) = ${k}x<sup>${k-1}</sup> and F(1) = ${k+3}. Find F(2).`,2**k+k+2,[2**k,2**k+3,k+3],[`F(x) = x<sup>${k}</sup> + C; F(1) = 1 + C = ${k+3} ⇒ C = ${k+2}`,`F(2) = ${2**k} + ${k+2} = <b>${2**k+k+2}</b>`]); };
const units=window.ZC.units;
units.forEach(u=>{ (EX[u.id]||[]).forEach(g=>u.gen.push(()=>{ for(let i=0;i<20;i++){ const p=g(); if(p) return p; } return g(); })); });
units.forEach(u=>{ u.frq=(FRQ[u.id]||[]).filter(f=>BC||!f.bc).map(f=>{ const g=()=>{ for(let i=0;i<20;i++){ const p=f(); if(p) return p; } return f(); }; return g; }); });

/* AP Exam Review: mixed practice and FRQs from every unit */
const mix=k=>()=>{ const u=pick(units.filter(x=>x[k]&&x[k].length)); return pick(u[k])(); };
const rev={id:"review",num:units.length+1,label:"Exam review",short:"AP Exam Review",name:`AP Exam Review: Mixed Practice`,sub:"Mixed multiple choice and free response from every unit, like the real exam. New questions each time.",c:"#111",
  sheet:units.map(u=>u.sheet[0]?[u.c,u.short,u.sheet[0][2].slice(0,3),""]:null).filter(Boolean),
  gen:units.flatMap(u=>u.gen.map(g=>{ const h=()=>g(); return h; })),
  chal:units.flatMap(u=>u.chal.map(g=>()=>g())),
  med:units.flatMap(u=>(u.med||[]).map(g=>()=>g())),
  adv:units.flatMap(u=>(u.adv||[]).map(g=>()=>g())),
  frq:units.flatMap(u=>u.frq)};
units.push(rev);
window.ZC.strands.push(["Exam prep","#111",["review"]]);
/* released FRQs + resources */
window.ZC.relKey=BC?"bc":"ab";
const TOPICPACKS={"u1": [["Limits", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Limits.pdf?id=L8EpQYhdRyyq6ld4ta2kbA"], ["Limits and Continuity", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Limits%20and%20Continuity.pdf?id=BB0-y1zKTeGXIKTz4foUtw"], ["Continuities and Discontinuities", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Continuities%20and%20Discontinuities.pdf?id=HeOzYDJ9SkG5HD0xYl00Eg"]], "u2": [["Differentiability", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Differentiation%20-%20Differentiability.pdf?id=KUroi1onSiyuRQB-6vnLMQ"], ["Standard Functions", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Differentiation%20Technique%20-%20Standard%20Functions.pdf?id=aXk9u4YNQWOF0_5BlDX-iQ"], ["Product Rule", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Differentiation%20Technique%20-Product%20Rule.pdf?id=Ao66Yh4-TKuSCX8UIwECjw"], ["Quotient Rule", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Differentiation%20Technique%20-%20Quotient%20Rule.pdf?id=CmOaGK9PSUWe8zyPmcv7EQ"], ["Trigonometric Derivatives", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Differentiation%20Technique%20-%20Trigonometry.pdf?id=ZsWz1EhcTEiKUsv-rjT-uA"], ["Exponential Derivatives", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Differentiation%20Technique%20-%20Exponentials.pdf?id=K5Wf0sLEQw2mGwd9DgoWZA"]], "u3": [["Chain Rule", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Differentiation%20Technique%20-%20Chain%20Rule.pdf?id=UU2BwT1XTFK3o2XVCxvAhA"], ["Implicit Differentiation", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Differentiation%20-%20Implicit%20Differentiation.pdf?id=IdVUkiBQR2-Jwus4IfsqRA"]], "u4": [["Instantaneous Rates of Change", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Differentiation%20-%20Instantaneous%20Rates%20Of%20Change.pdf?id=VUb0Y9fpRNmKO-0OiuIxDg"], ["Average Rates of Change", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Differentiation%20-%20Average%20Rates%20Of%20Change.pdf?id=f-wrsN51TyWI0_KqylmxGg"], ["Related Rates", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Differentiation%20-%20Related%20Rates.pdf?id=ET1SJ8OhSBeg1uNZmRfxVA"], ["Kinematics", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Kinematics.pdf?id=ENrQcdWvQR6A3I5zmFeQcA"], ["Flow Rates", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Differentiation%20-%20Flow%20Rates.pdf?id=Kh9AnPIEQ0mTphE1po52Jw"]], "u5": [["Absolute Min/Max", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Differentiation%20-%20Global%20or%20Absolute%20Min:Max.pdf?id=QsjrSGVOQcGryGiU4GMkNg"], ["Relative Min/Max", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Differentiation%20-%20Local%20Or%20Relative%20Min:Max.pdf?id=a0z7xbSVTzu5x_yleLh59g"], ["Concavity", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Differentiation%20-%20Concavity.pdf?id=IlVs5XK3QaGHFH0sLXzbQA"], ["Derivative Graphs", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Differentiation%20-%20Derivative%20Graphs.pdf?id=UNAAbKl4SQywmTtNBrwPWQ"], ["Derivative Tables", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Differentiation%20-%20Derivative%20Tables.pdf?id=K-DbSI7xRVycfo9wMYLwZg"]], "u6": [["Left Riemann Sums", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Integration%20-%20Riemann%20Sums%20-%20Left.pdf?id=e_qXMJLdS5egRGOPy0wU9w"], ["Right Riemann Sums", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Integration%20-%20Riemann%20Sums%20-%20Right.pdf?id=ElLbIJyHS96ZWLu3-QP7_g"], ["Midpoint Sums", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Integration%20-%20Riemann%20Sums%20-%20Midpoint.pdf?id=QsAvfvYZQbarkNM_MeYd6w"], ["Trapezoidal Sums", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Integration%20-%20Riemann%20Sums%20-%20Trapezoidal.pdf?id=eKe0qS2mQSGiZwwwqSo9Tw"], ["First FTC", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Integration%20-%20First%20Fundamental%20Theorem%20Of%20Calculus.pdf?id=MCUQssyaRpuo9nrQCvP0Gw"], ["Second FTC", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Integration%20-%20Second%20Fundamental%20Theorem%20Of%20Calculus.pdf?id=N2Yr45PiSD2GHleUR_NGNg"], ["Accumulation of Change", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Integration%20-%20Accumulation%20Of%20Change.pdf?id=fnC9X_0sR2i4yuivuJprHQ"], ["Integral Graphs", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Integration%20-%20Integral%20Graphs.pdf?id=eF9BAvZ9SrKJ1U_Sp93zHQ"], ["Properties of Integrals", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Integration%20-%20Properties%20Of%20Integrals.pdf?id=YjH5g5XAQLaKDX_xy1ymag"], ["Substitution", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Integration%20Technique%20-%20Substitution.pdf?id=PtNPn79PTMKpow4M9zHDHg"], ["Standard Integrals", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Integration%20Technique%20-%20Standard%20Integrals.pdf?id=UJ08Et2VRWiWWFhneQldzw"]], "u7": [["Differential Equations", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Differential%20Equations.pdf?id=WtcpDe8wRk-yMyagI8gnPw"]], "u8": [["Area Between Curves", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Integration%20-%20Area%20Between%20Curves.pdf?id=Yfi1E0F7Sui0rLN_TXkpxQ"], ["Area Under a Curve", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Integration%20-%20Area%20Under%20A%20Curve.pdf?id=WHFCwNT9RS6XcWQQMsVPnA"], ["Average Value", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Integration%20-%20Average%20Value%20Of%20A%20Function.pdf?id=SVtvj6TkRK6D1sP9-mezAA"], ["Finding Total Amounts", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Integration%20-%20Finding%20Total%20Amounts.pdf?id=HMytiPSIS-GraHkYtIPG0g"], ["Disc Method", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Integration%20-%20Volume%20Of%20Revolution%20-%20Disc%20Method.pdf?id=N6wJOsnXQ0u_-ouRduPEMQ"], ["Washer Method", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Integration%20-%20Volume%20Of%20Revolution%20-%20Washer%20Method.pdf?id=ZsGHwHu_S1SIx5V6PVLjAg"], ["Cross Sections", "https://www.mymathscloud.com/api/download/modules/AP-Calculus/Past-Papers-By-Topic/Integration%20-%20Volume%20Using%20Cross%20Sections.pdf?id=WIYXuhGETvCJD7d_MrO31w"]]};
units.forEach(u=>{ const p=TOPICPACKS[u.id]; if(p) u.sheet.push(["#7a5a12","Past-exam questions by topic (free PDFs)",p.map(([n,h])=>`<a href="${h}" target="_blank" rel="noopener">${n}</a>`),"Real AP free-response questions grouped by topic, with mark schemes. From the MyMathsCloud archive."]); });
units.push({id:"released",num:0,label:"Released FRQs",short:"Released FRQs",name:`Released AP Free-Response Questions (1998–2026)`,sub:`Every released AP Calculus ${BC?"BC":"AB"} FRQ by exam, with questions, scoring guidelines and sample responses`,c:"#7a5a12",relAll:1,gen:[],chal:[],frq:[],
  sheet:[["#7a5a12","Where these come from",[`<a href="${window.ZREL.res[BC?"bc":"ab"]}" target="_blank" rel="noopener">MyMathsCloud: every AP Calculus ${BC?"BC":"AB"} past paper</a>`,`<a href="${window.ZREL.res.topic}" target="_blank" rel="noopener">MyMathsCloud: past questions by topic</a>`,`<a href="https://apcentral.collegeboard.org/courses/ap-calculus-ab/exam/past-exam-questions" target="_blank" rel="noopener">AP Central: the 3 most recent exams</a>`],"In each unit, the Released FRQs node lists only the questions for that unit."]]});
window.ZC.strands[window.ZC.strands.length-1][2].push("released");

})();
