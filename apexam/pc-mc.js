/* AP Precalculus Section I Part B (graphing calculator required) templates. (R,H) => {u,t,q,a,w:[3],ex} */
(function(){
const {roots,root,f3,N,tb,tbh,FR}=ZX.H;
const T=[];
const near=(a,w)=>[a,...w].every((x,i,arr)=>arr.findIndex(y=>Math.abs(y-x)<0.002)===i);
const M=(u,t,q,a,w,ex)=>near(a,w)?{u,t,q,a:f3(a),w:w.map(f3),ex}:null;
const ln=Math.log, e=Math.exp;
/* least squares fit of y = c0 + c1 x + c2 x² */
function quadfit(xs,ys){ const n=xs.length, S=k=>xs.reduce((s,x)=>s+x**k,0), Sy=k=>xs.reduce((s,x,i)=>s+ys[i]*x**k,0);
 const A=[[n,S(1),S(2)],[S(1),S(2),S(3)],[S(2),S(3),S(4)]], b=[Sy(0),Sy(1),Sy(2)];
 for(let i=0;i<3;i++){ for(let j=i+1;j<3;j++){ const f=A[j][i]/A[i][i]; for(let k=i;k<3;k++) A[j][k]-=f*A[i][k]; b[j]-=f*b[i]; } }
 const c=[0,0,0]; for(let i=2;i>=0;i--){ let s=b[i]; for(let k=i+1;k<3;k++) s-=A[i][k]*c[k]; c[i]=s/A[i][i]; } return c; }

/* U1: greatest real zero of a cubic */
T.push((R)=>{ const a=R.int(3,7), b=R.pick([1,2,-1,-2,3]); const f=x=>x**3-a*x+b; const z=roots(f,-6,6); if(z.length<1) return null; const g=Math.max(...z);
 return M(1,"Zeros of polynomials",`What is the greatest real zero of f(x) = x³ − ${a}x ${b<0?"− "+(-b):"+ "+b} ?`,g,[Math.min(...z),z.length>1?z[1]:g+1,Math.sqrt(a)],`Graph f and use the zero (root) feature: the zeros are x ≈ ${z.map(f3).join(", ")}. The greatest is <b>${f3(g)}</b>.`); });
/* U1: relative maximum value */
T.push((R)=>{ const a=R.pick([0.5,1,1.5]), b=R.int(2,5), c=R.int(-3,3); const f=x=>-a*x**4+b*x*x+c*x+1;
 const cr=roots(x=>-4*a*x**3+2*b*x+c,-5,5); const mx=cr.filter(x=>-12*a*x*x+2*b<0).map(f); if(!mx.length) return null; const v=Math.max(...mx);
 return M(1,"Polynomial extrema",`The function f is given by f(x) = −${a===1?"":a}x⁴ + ${b}x² ${c<0?"− "+(-c)+"x":c?"+ "+c+"x":""} + 1. What is the greatest relative maximum value of f ?`,v,[cr.length?cr[0]:0,f(0),v-1],`Graph f and use the maximum feature. The relative maxima occur at x ≈ ${cr.filter(x=>-12*a*x*x+2*b<0).map(f3).join(", ")}; the greatest value is <b>${f3(v)}</b>.`); });
/* U1: quadratic regression prediction */
T.push((R)=>{ const xs=[0,2,4,6,8]; const a=R.real(-0.5,-0.15,2), b=R.real(2,5,1), c=R.int(5,20); const ys=xs.map(x=>Math.round(a*x*x+b*x+c+R.int(-2,2)));
 const [c0,c1,c2]=quadfit(xs,ys); const xq=R.pick([5,7,9]); const v=c0+c1*xq+c2*xq*xq;
 return M(1,"Regression",`The table gives values of a quantity y at selected times x. A quadratic regression model is fit to the data. What is the value predicted by the model at x = ${xq}?${tbh([["x",...xs],["y",...ys]])}`,v,[xq<8?(ys[xs.indexOf(xq-1)]+ys[xs.indexOf(xq+1)])/2+0.4:2*ys[4]-ys[3],c0+c1*xq,v-2.2],`QuadReg on the calculator gives y ≈ ${f3(c2)}x² + ${f3(c1)}x + ${f3(c0)}. At x = ${xq}: <b>${f3(v)}</b>.`); });
/* U1: rational equation */
T.push((R)=>{ const a=R.int(1,4), b=R.int(2,6), k=R.pick([2,3]); const f=x=>(k*x*x+1)/(x*x-a*x+b); const z=roots(x=>f(x)-k-1,0,20); if(!z.length) return null;
 return M(1,"Rational functions",`For x &gt; 0, the graph of r(x) = ${FR(`${k}x² + 1`,`x² − ${a}x + ${b}`)} intersects the line y = ${k+1} at what value of x?`,z[0],[z[0]+1,k+1,b/a],`Graph y = r(x) and y = ${k+1} and use the intersect feature: <b>x ≈ ${f3(z[0])}</b>.`); });
/* U2: exponential model through two points */
T.push((R)=>{ const a=R.int(2,9)*100, r=R.pick([1.06,1.08,1.12,0.85,0.9]), t1=R.pick([3,4,5]); const y1=Math.round(a*r**t1); const b=(y1/a)**(1/t1); const t2=t1+R.int(2,4); const v=a*b**t2;
 return M(2,"Exponential models",`An exponential model P(t) = ab<sup>t</sup> satisfies P(0) = ${a} and P(${t1}) = ${y1}. What is P(${t2}) according to the model?`,v,[a+(y1-a)/t1*t2,a*b*t2,a*(b**t2)*b],`b = (${y1}/${a})<sup>1/${t1}</sup> ≈ ${f3(b)}, so P(${t2}) = ${a}(${f3(b)})<sup>${t2}</sup> ≈ <b>${f3(v)}</b>. (The linear guess assumes equal differences, not equal ratios.)`); });
/* U2: solve an exponential equation numerically */
T.push((R)=>{ const k=R.int(3,7); const f=x=>2**x-x-k; const z=roots(f,0,10); if(!z.length) return null;
 return M(2,"Solving equations",`What is the positive solution of 2<sup>x</sup> = x + ${k} ?`,z[0],[Math.log2(k),k/2,z[0]-1],`Graph y = 2<sup>x</sup> and y = x + ${k} and find their intersection for x &gt; 0: <b>x ≈ ${f3(z[0])}</b>.`); });
/* U2: change of base */
T.push((R)=>{ const b=R.pick([3,5,6,7]), x=R.int(11,90); const v=ln(x)/ln(b);
 return M(2,"Logarithms",`What is the value of log<sub>${b}</sub> ${x} ?`,v,[Math.log10(x),ln(b)/ln(x),x/b],`log<sub>${b}</sub> ${x} = ln ${x} / ln ${b} ≈ <b>${f3(v)}</b>.`); });
/* U2: half-life / doubling time */
T.push((R)=>{ const h=R.int(3,12), A0=R.int(2,9)*10, Af=R.int(1,Math.floor(A0/2-1)); const t=h*ln(A0/Af)/ln(2);
 return M(2,"Exponential decay",`A substance has a half-life of ${h} days. A sample starts with ${A0} grams. To the nearest thousandth, after how many days will ${Af} grams remain?`,t,[h*(A0/Af)/2,h*ln(A0/Af),t/2],`A(t) = ${A0}(½)<sup>t/${h}</sup> = ${Af} ⇒ t = ${h}·log<sub>2</sub>(${A0}/${Af}) ≈ <b>${f3(t)}</b> days.`); });
/* U2: compound interest */
T.push((R)=>{ const P=R.int(1,9)*1000, r=R.pick([0.03,0.035,0.045,0.05]), n=R.pick([4,12]), t=R.int(3,10); const v=P*(1+r/n)**(n*t);
 return M(2,"Exponential growth",`$${P} is invested at an annual rate of ${(r*100).toFixed(1).replace(".0","")}% compounded ${n===4?"quarterly":"monthly"}. To the nearest cent, what is the value after ${t} years?`,+v.toFixed(2),[+(P*(1+r)**t).toFixed(2),+(P*(1+r*t)).toFixed(2),+(P*e(r*t)).toFixed(2)],`A = ${P}(1 + ${r}/${n})<sup>${n}·${t}</sup> ≈ <b>$${v.toFixed(2)}</b>.`); });
/* U3: inverse trig in a given interval */
T.push((R)=>{ const k=R.pick([0.2,0.35,0.42,0.6,0.73]); const v=Math.PI-Math.asin(k);
 return M(3,"Inverse trigonometry",`What value of x in the interval π/2 &lt; x &lt; π satisfies sin x = ${k} ?`,v,[Math.asin(k),Math.PI+Math.asin(k),Math.acos(k)],`sin⁻¹(${k}) ≈ ${f3(Math.asin(k))} is in quadrant I. The quadrant II solution is π − ${f3(Math.asin(k))} ≈ <b>${f3(v)}</b>.`); });
/* U3: sinusoidal model value */
T.push((R)=>{ const A=R.int(2,6), P=R.pick([12,24,10]), D=R.int(8,15), t=R.real(1,P-1,1); const h=x=>D+A*Math.sin(2*Math.PI/P*x); const v=h(t);
 return M(3,"Sinusoidal models",`The depth of water, in feet, t hours after midnight is modeled by h(t) = ${D} + ${A}sin(${FR("2π",P)}t). What is the depth at t = ${t} ?`,v,[D+A*Math.sin(2*Math.PI/P*t*Math.PI/180),D+A*Math.cos(2*Math.PI/P*t),D+A],`In radian mode: h(${t}) = ${D} + ${A}sin(2π·${t}/${P}) ≈ <b>${f3(v)}</b> feet.`); });
/* U3: polar to rectangular */
T.push((R)=>{ const r=R.real(2,6,1), th=R.real(1.9,2.8,2); const x=r*Math.cos(th);
 return M(3,"Polar coordinates",`A point has polar coordinates (r, θ) = (${r}, ${th}). What is its x-coordinate in rectangular coordinates?`,x,[r*Math.sin(th),r*Math.cos(th*Math.PI/180),-x],`x = r cos θ = ${r}cos(${th}) ≈ <b>${f3(x)}</b>.`); });
/* U3: average rate of change of a polar function */
T.push((R)=>{ const a=R.int(2,4), b=R.int(1,2); const r=t=>a+b*Math.cos(2*t); const t1=R.pick([0.3,0.5]), t2=R.pick([1.1,1.3]); const v=(r(t2)-r(t1))/(t2-t1);
 return M(3,"Polar functions",`For r(θ) = ${a} + ${b===1?"":b}cos(2θ), what is the average rate of change of r with respect to θ on the interval ${t1} ≤ θ ≤ ${t2} ?`,v,[r(t2)-r(t1),(r(t2)+r(t1))/2,-v],`[r(${t2}) − r(${t1})]/(${t2} − ${t1}) ≈ (${f3(r(t2))} − ${f3(r(t1))})/${+(t2-t1).toFixed(2)} ≈ <b>${f3(v)}</b>. Negative: r decreases as θ increases on this interval.`); });
ZX.cmc.pc.push(...T);
})();
