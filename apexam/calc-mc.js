/* Section I Part B (graphing calculator required) templates for AP Calculus AB and BC.
   Each template: (R,H) => {u, t, q, a, w:[3 wrong], ex}. Every answer is computed numerically. */
(function(){
const {integ,root,roots,d,f3,N,FR,ig,sg,poly}=ZX.H;
const AB=[], BC=[];
const M=(u,t,q,a,w,ex)=>({u,t,q,a:f3(a),w:w.map(f3),ex});
const distinct=(a,w)=>[a,...w].every((x,i,arr)=>arr.findIndex(y=>Math.abs(y-x)<0.002)===i);
const ok=(o)=>o&&distinct(+o.a.replace("−","-"),o.w.map(x=>+x.replace("−","-")))?o:null;
const MS=(u,t,q,a,w,ex)=>({u,t,q,a,w,ex});
const ln=Math.log, e=Math.exp, sin=Math.sin, cos=Math.cos;

/* 1. definite integral of a non-elementary function */
AB.push((R)=>{ const a=R.pick([0.5,1,1.5,2]), k=R.pick([2,3]), b=R.int(1,3)+a, c=R.int(1,4);
 const f=x=>c*e(-(x*x)/k)+1; const v=integ(f,0,b);
 return ok(M(6,"Definite integral",`What is the value of ${ig(0,b)} (${c}e<sup>−x²/${k}</sup> + 1) dx ?`,v,[v-b,integ(x=>c*e(-x*x/k),0,b)*0+c*b*e(-b*b/k)+b,f(b)-f(0)],`Use the calculator's numerical integration: fnInt(${c}e^(−x²/${k}) + 1, x, 0, ${b}) ≈ <b>${f3(v)}</b>. The function has no elementary antiderivative, so the calculator is required.`)); });
/* 2. derivative at a point (numerical) */
AB.push((R)=>{ const a=R.int(2,5), x0=R.pick([1.2,1.5,2,2.5,0.8]);
 const f=x=>Math.sqrt(x*x+a)*sin(x); const v=d(f,x0);
 return ok(M(3,"Numerical derivative",`If f(x) = √(x² + ${a}) · sin x, what is the value of f′(${x0}) ?`,v,[f(x0),d(f,x0)-sin(x0)*x0/Math.sqrt(x0*x0+a)+cos(x0)*0.5,Math.sqrt(x0*x0+a)*cos(x0)],`Product rule, or nDeriv on the calculator (radian mode): f′(${x0}) = ${x0}sin(${x0})/√(${x0}² + ${a}) + √(${x0}² + ${a})·cos(${x0}) ≈ <b>${f3(v)}</b>.`)); });
/* 3. position from velocity */
AB.push((R)=>{ const x0=R.int(-4,6), T=R.pick([2,3,4]), p=R.pick([1,2,3]);
 const v=t=>ln(t*t+1)-p*cos(t); const X=x0+integ(v,0,T);
 return ok(M(8,"Position from velocity",`A particle moves along the x-axis with velocity v(t) = ln(t² + 1) − ${p}cos t for t ≥ 0. At time t = 0 the particle is at x = ${N(x0)}. What is the position of the particle at time t = ${T} ?`,X,[X-x0,x0+integ(t=>Math.abs(v(t)),0,T),v(T)+x0],`x(${T}) = x(0) + ${ig(0,T)} v(t) dt = ${N(x0)} + ${f3(X-x0)} = <b>${f3(X)}</b>. (Do not forget the starting position.)`)); });
/* 4. total distance */
AB.push((R)=>{ const T=R.pick([3,4,5]), a=R.pick([1.5,2,2.5]);
 const v=t=>a*sin(t)*e(-t/4)+0.2*t-0.5; const D=integ(t=>Math.abs(v(t)),0,T,4000), S=integ(v,0,T);
 if(Math.abs(D-S)<0.05) return null;
 return ok(M(8,"Total distance",`The velocity of a particle moving along a line is v(t) = ${a}e<sup>−t/4</sup> sin t + 0.2t − 0.5. What is the total distance traveled by the particle from t = 0 to t = ${T} ?`,D,[S,Math.abs(S)+0.5,v(T)],`Total distance = ${ig(0,T)} |v(t)| dt ≈ <b>${f3(D)}</b>. ${ig(0,T)} v(t) dt ≈ ${f3(S)} is the displacement, not the distance, because v changes sign.`)); });
/* 5. accumulation from a rate */
AB.push((R)=>{ const A0=R.int(20,80)*10, T=R.pick([4,5,6,8]), p=R.int(30,60), q=R.int(10,25);
 const r=t=>p+q*sin(t*t/7); const v=A0+integ(r,0,T);
 return ok(M(6,"Accumulation of change",`Water flows into a tank at a rate of r(t) = ${p} + ${q}sin(t²/7) liters per hour, where t is measured in hours. At t = 0 the tank holds ${A0} liters. To the nearest liter, how many liters are in the tank at t = ${T} ?`,Math.round(v),[Math.round(v-A0),Math.round(A0+r(T)*T),Math.round(A0+r(T))],`Amount = ${A0} + ${ig(0,T)} r(t) dt = ${A0} + ${f3(v-A0)} ≈ <b>${Math.round(v)}</b> liters.`)); });
/* 6. area between curves */
AB.push((R)=>{ const k=R.pick([2,3,4]), c=R.pick([1,2]);
 const f=x=>k-x*x, g=x=>c*e(x/2)-c; const rs=roots(x=>f(x)-g(x),-4,4); if(rs.length!==2) return null; const [a,b]=rs; const A=integ(x=>f(x)-g(x),a,b);
 return ok(M(8,"Area between curves",`What is the area of the region enclosed by the graphs of y = ${k} − x² and y = ${c===1?"":c}e<sup>x/2</sup> − ${c} ?`,A,[integ(x=>Math.abs(f(x)),a,b),A+integ(g,a,b),integ(f,a,b)],`The curves intersect at x ≈ ${f3(a)} and x ≈ ${f3(b)} (store these). Area = ∫ (top − bottom) dx = ∫<sub>${f3(a)}</sub><sup>${f3(b)}</sup> [(${k} − x²) − (${c===1?"":c}e<sup>x/2</sup> − ${c})] dx ≈ <b>${f3(A)}</b>.`)); });
/* 7. volume of revolution about the x-axis */
AB.push((R)=>{ const b=R.pick([1,1.5,2,2.5]);
 const f=x=>Math.sqrt(x)*e(-x/3)+1; const V=Math.PI*integ(x=>f(x)**2,0,b);
 return ok(M(8,"Volume (disks)",`The region bounded by y = √x · e<sup>−x/3</sup> + 1, the x-axis, the y-axis and the line x = ${b} is revolved about the x-axis. What is the volume of the resulting solid?`,V,[V/Math.PI,Math.PI*integ(f,0,b),2*Math.PI*integ(x=>x*f(x),0,b)],`Disks: V = π${ig(0,b)} [f(x)]² dx ≈ <b>${f3(V)}</b>.`)); });
/* 8. average value */
AB.push((R)=>{ const a=R.int(0,1), b=a+R.int(2,4), k=R.int(2,5);
 const f=x=>k*cos(x/2)+x; const v=integ(f,a,b)/(b-a);
 return ok(M(8,"Average value",`What is the average value of f(x) = ${k}cos(x/2) + x on the interval [${a}, ${b}] ?`,v,[integ(f,a,b),(f(a)+f(b))/2,(f(b)-f(a))/(b-a)],`Average value = ${FR(1,`${b} − ${a}`)} ${ig(a,b)} f(x) dx = ${f3(integ(f,a,b))}/${b-a} ≈ <b>${f3(v)}</b>. (The average <i>rate of change</i> would be [f(${b}) − f(${a})]/${b-a}.)`)); });
/* 9. where f′ = average rate (MVT) */
AB.push((R)=>{ const b=R.pick([2,3,4]);
 const f=x=>e(x/2)+sin(x); const m=(f(b)-f(0))/b; const cs=roots(x=>d(f,x)-m,0.001,b-0.001); if(cs.length!==1) return null; const c=cs[0];
 return ok(M(5,"Mean Value Theorem",`Let f(x) = e<sup>x/2</sup> + sin x. What value of c in the interval (0, ${b}) satisfies the conclusion of the Mean Value Theorem for f on [0, ${b}] ?`,c,[m,b/2,f(c)],`The average rate of change is [f(${b}) − f(0)]/${b} ≈ ${f3(m)}. Solve f′(c) = ½e<sup>c/2</sup> + cos c = ${f3(m)} on (0, ${b}): <b>c ≈ ${f3(c)}</b>.`)); });
/* 10. number of critical points / relative extrema from f′ */
AB.push((R)=>{ const k=R.pick([1,2,3]), a=R.pick([0.5,0.8,1.2]);
 const fp=x=>x*x*cos(x)-k*a+sin(2*x); const rs=roots(fp,0,5,6000); const n=rs.length; if(n<1||n>4) return null;
 const maxes=rs.filter(r=>fp(r-1e-3)>0&&fp(r+1e-3)<0).length;
 return MS(5,"Relative extrema from f′",`The derivative of a function f is f′(x) = x²cos x + sin(2x) − ${f3(k*a).replace(/\.?0+$/,"")}. On the interval 0 &lt; x &lt; 5, at how many values of x does f have a relative maximum?`,String(maxes),[...new Set([String(n),String(n-maxes),String(maxes+1),String(Math.max(0,maxes-1)),String(maxes+2)])].filter(x=>x!==String(maxes)).slice(0,3),`Graph f′ on (0, 5). It has ${n} zero${n>1?"s":""} at x ≈ ${rs.map(f3).join(", ")}. f has a relative maximum where f′ changes from positive to negative: that happens at <b>${maxes}</b> of them.`); });
/* 11. tangent line approximation with calculator derivative */
AB.push((R)=>{ const x0=R.pick([1,2]), h=R.pick([0.1,0.2,-0.1]);
 const f=x=>x*ln(x+1)+2; const L=f(x0)+d(f,x0)*h;
 return ok(M(4,"Local linearization",`Let f(x) = x ln(x + 1) + 2. Using the line tangent to the graph of f at x = ${x0}, what is the approximation of f(${x0+h}) ?`,L,[f(x0)+h,d(f,x0)*h,f(x0+h)+0.05],`f(${x0}) ≈ ${f3(f(x0))} and f′(${x0}) ≈ ${f3(d(f,x0))}. L(${x0+h}) = f(${x0}) + f′(${x0})(${h}) ≈ <b>${f3(L)}</b>.`)); });
/* 12. rate of change of an integral-defined function (FTC) */
AB.push((R)=>{ const x0=R.pick([1.5,2,2.5,3]);
 const g=t=>Math.sqrt(1+t*t*t); const v=2*x0*g(x0*x0);
 return ok(M(6,"FTC with the chain rule",`If F(x) = ${ig(0,"x²")} √(1 + t³) dt, what is the value of F′(${x0}) ?`,v,[g(x0*x0),g(x0),integ(g,0,x0*x0)],`F′(x) = √(1 + (x²)³) · 2x by the Fundamental Theorem and the chain rule. F′(${x0}) = 2(${x0})√(1 + ${x0}⁶) ≈ <b>${f3(v)}</b>.`)); });
/* 13. related rates numeric */
AB.push((R)=>{ const r=R.int(3,9), dr=R.pick([0.2,0.5,0.3]);
 const v=4*Math.PI*r*r*dr;
 return ok(M(4,"Related rates",`The radius of a sphere is increasing at a constant rate of ${dr} centimeter per second. At the instant the radius is ${r} centimeters, what is the rate of change of the volume, in cubic centimeters per second?`,v,[4/3*Math.PI*r**3*dr,4*Math.PI*r*r,8*Math.PI*r*dr],`V = (4/3)πr³, so dV/dt = 4πr² dr/dt = 4π(${r})²(${dr}) ≈ <b>${f3(v)}</b> cm³/s.`)); });
/* 14. when is the particle's speed increasing? (value of acceleration) */
AB.push((R)=>{ const t0=R.pick([1,1.5,2,2.5,3]);
 const v=t=>t*t*e(-t)+cos(t)-0.3; const a=d(v,t0);
 return ok(M(4,"Acceleration",`A particle's velocity is v(t) = t²e<sup>−t</sup> + cos t − 0.3. What is the acceleration of the particle at t = ${t0} ?`,a,[v(t0),Math.abs(v(t0)),integ(v,0,t0)],`a(t) = v′(t). With the calculator, v′(${t0}) ≈ <b>${f3(a)}</b>.`)); });
/* 15. Riemann sum vs. integral of a model */
AB.push((R)=>{ const n=4, b=R.pick([2,4]), h=b/n;
 const f=x=>Math.sqrt(x+1)+sin(x); let s=0; for(let i=1;i<=n;i++) s+=f(i*h)*h; const I=integ(f,0,b);
 return ok(M(6,"Riemann sums",`Using a right Riemann sum with ${n} subintervals of equal length, what is the approximation of ${ig(0,b)} (√(x + 1) + sin x) dx ?`,s,[I,s-f(b)*h+f(0)*h,s/h],`Δx = ${h}. Right sum = ${h}[f(${h}) + f(${2*h}) + f(${3*h}) + f(${4*h})] ≈ <b>${f3(s)}</b>. (The exact integral is about ${f3(I)}.)`)); });

/* ===== BC only ===== */
/* arc length of a parametric curve */
BC.push((R)=>{ const T=R.pick([1,1.5,2]), k=R.pick([2,3]);
 const xp=t=>2*t, yp=t=>k*t*t-1; const L=integ(t=>Math.hypot(xp(t),yp(t)),0,T);
 return ok(M(9,"Arc length (parametric)",`A curve is given by x(t) = t² and y(t) = ${k===3?"":FR(k,3)}t³ − t for 0 ≤ t ≤ ${T}. What is the length of the curve?`,L,[integ(t=>Math.abs(xp(t))+Math.abs(yp(t)),0,T),integ(t=>Math.sqrt(1+(yp(t)/xp(Math.max(t,1e-4)))**2),0.0001,T),Math.hypot(T*T,k/3*T**3-T)],`L = ${ig(0,T)} √((dx/dt)² + (dy/dt)²) dt = ${ig(0,T)} √((2t)² + (${k}t² − 1)²) dt ≈ <b>${f3(L)}</b>.`)); });
/* polar area */
BC.push((R)=>{ const a=R.pick([2,3]), b=R.pick([1,2]);
 const r=t=>a+b*sin(3*t); const A=0.5*integ(t=>r(t)**2,0,Math.PI/2);
 return ok(M(9,"Polar area",`What is the area of the region bounded by the polar curve r = ${a} + ${b===1?"":b}sin(3θ) for 0 ≤ θ ≤ π/2 ?`,A,[2*A,integ(r,0,Math.PI/2),0.5*integ(r,0,Math.PI/2)],`A = ½ ∫<sub>0</sub><sup>π/2</sup> r² dθ ≈ <b>${f3(A)}</b>.`)); });
/* speed of a particle (vector) */
BC.push((R)=>{ const t0=R.pick([1,2,3]);
 const xp=t=>e(t/3)+cos(t), yp=t=>sin(t*t/3)*2; const s=Math.hypot(xp(t0),yp(t0));
 return ok(M(9,"Speed (vector-valued)",`A particle moves in the plane with velocity vector ⟨e<sup>t/3</sup> + cos t, 2sin(t²/3)⟩. What is the speed of the particle at t = ${t0} ?`,s,[xp(t0)+yp(t0),xp(t0)**2+yp(t0)**2,Math.abs(xp(t0))],`Speed = √(x′(t)² + y′(t)²) = √(${f3(xp(t0))}² + ${f3(yp(t0))}²) ≈ <b>${f3(s)}</b>.`)); });
/* Taylor approximation value */
BC.push((R)=>{ const x0=R.pick([0.2,0.3,0.4,0.5]);
 const P=1+x0+x0*x0/2+x0**3/6; const E=e(x0)*0, true_=e(x0);
 return ok(M(10,"Taylor polynomials",`The third-degree Taylor polynomial for f(x) = e<sup>x</sup> about x = 0 is used to approximate f(${x0}). What is the approximation?`,P,[1+x0+x0*x0/2,true_+0.01,1+x0+x0*x0+x0**3],`P₃(x) = 1 + x + x²/2 + x³/6. P₃(${x0}) = <b>${f3(P)}</b> (the true value is e<sup>${x0}</sup> ≈ ${f3(true_)}).`)); });
/* Euler's method (calculator for arithmetic) */
BC.push((R)=>{ const h=R.pick([0.1,0.2,0.25]), y0=R.int(1,3);
 const F=(x,y)=>x+Math.sqrt(y); let x=0,y=y0; for(let i=0;i<2;i++){ y+=h*F(x,y); x+=h; }
 let y1=y0+h*F(0,y0);
 return ok(M(7,"Euler's method",`Let y = f(x) be the solution of dy/dx = x + √y with f(0) = ${y0}. Using Euler's method with two steps of equal size h = ${h}, what is the approximation of f(${+(2*h).toFixed(2)}) ?`,y,[y1,y0+2*h*F(0,y0),y+h],`Step 1: y₁ = ${y0} + ${h}(0 + √${y0}) ≈ ${f3(y1)}. Step 2: y₂ = y₁ + ${h}(${h} + √y₁) ≈ <b>${f3(y)}</b>.`)); });
/* series partial sum / sum */
BC.push((R)=>{ const r=R.pick([3,4,5]), a=R.int(2,6);
 const S=a/(1-(-1/r)); return ok(M(10,"Geometric series",`What is the sum of the series Σ<sub>n=0</sub><sup>∞</sup> ${a}(−1/${r})<sup>n</sup> ?`,S,[a/(1-1/r),a*r,a/(1+r)],`Geometric with first term ${a} and ratio −1/${r} (|r| &lt; 1): sum = ${a}/(1 + 1/${r}) = <b>${f3(S)}</b>.`)); });

ZX.cmc.ab.push(...AB); ZX.cmc.bc.push(...AB,...BC,...BC);
})();
