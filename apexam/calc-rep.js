/* AP Calculus no-calculator multiple choice built on graphs, tables and words (the representations the AP exam uses most).
   Templates: (R,H) => {u,t,q,a,w:[3],ex}. Registered in ZX.rep[course] for the exam builder and, on book pages, added to each unit's practice bank. */
(function(){
"use strict";
const {N,FR,F,ig,tbh,f3}=ZX.H, plot=ZX.plot;
const fr=(x,md=48)=>{ if(Math.abs(x-Math.round(x))<1e-9) return N(Math.round(x)); for(let q=2;q<=md;q++){ const p=Math.round(x*q); if(Math.abs(p/q-x)<1e-9) return F(p,q); } return f3(x); };
const uniq=(a,w)=>{ const s=[a,...w].map(String); return new Set(s).size===4?{a:String(a),w:w.map(String)}:null; };
const Q=(u,t,q,a,w,ex)=>{ const z=uniq(a,w); return z?{u,t,q,a:z.a,w:z.w,ex}:null; };
const ln=Math.log;
/* piecewise-linear graph through integer nodes */
function walk(R,x0,x1,lo=-3,hi=3){ const xs=[], ys=[]; let y=R.int(-2,2); for(let x=x0;x<=x1;x++){ xs.push(x); ys.push(y); y=Math.max(lo,Math.min(hi,y+R.pick([-2,-1,-1,0,1,1,2]))); } return {xs,ys}; }
const AB=[], BC=[];

/* U1 limits from a graph */
AB.push((R)=>{ const a=R.int(-2,0), b=R.int(1,3); const L1=R.int(-2,3), R1=R.int(-2,3), fa=R.int(-3,3), Lb=R.int(-2,3), fb=R.pick([Lb+1,Lb-2,Lb+2]);
 if(L1===R1) return null; const S=[];
 const seg=(x0,y0,x1,y1)=>({pts:[[x0,y0],[x1,y1]]});
 const curves=[seg(-4,L1-1,a,L1),seg(a,R1,b,Lb),seg(b,Lb,4,Lb+1)];
 const dots=[[a,L1,1],[a,R1,1],[a,fa,0],[b,Lb,1],[b,fb,0]];
 const ans=L1+Lb;
 return Q(1,"Limits from a graph",`The graph of f is shown. What is the value of lim<sub>x→${a}<sup>−</sup></sub> f(x) + lim<sub>x→${b}</sub> f(x) ?${plot({xmin:-4,xmax:4,ymin:-4,ymax:5,curves,dots,lab:{x:"x",y:"y"},cap:"Graph of f"})}`,
  N(ans),[N(R1+Lb),N(L1+fb),N(fa+fb)],`From the left at x = ${a} the graph approaches y = ${N(L1)}. At x = ${b} both sides approach y = ${N(Lb)} (the filled dot f(${b}) = ${N(fb)} does not matter). Sum: ${N(L1)} + ${N(Lb)} = <b>${N(ans)}</b>.`); });
/* U1 limits from a table */
AB.push((R)=>{ const c=R.int(1,4), L=R.int(-5,9), k=R.pick([1.5,2,-3]); const xs=[c-0.1,c-0.01,c-0.001,c+0.001,c+0.01,c+0.1];
 const ys=xs.map(x=>+(L+k*(x-c)+0.4*(x-c)**2).toFixed(4)); const fc=L+R.pick([2,-3,4]);
 return Q(1,"Limits from a table",`Selected values of f are given in the table, and f(${c}) = ${fc}. Which is the best estimate of lim<sub>x→${c}</sub> f(x) ?${tbh([["x",...xs.map(x=>+x.toFixed(3))],["f(x)",...ys]])}`,N(L),[N(fc),"The limit does not exist",N(L+k)],`As x approaches ${c} from both sides, f(x) approaches <b>${N(L)}</b>. The value f(${c}) = ${fc} does not affect the limit.`); });
/* U1 squeeze theorem */
AB.push((R)=>{ const c=R.int(-2,3), m=R.int(1,4), L=R.int(-3,6); const g=`${L}${m?` − ${m}(x ${c<0?"+ "+(-c):"− "+c})²`:""}`.replace("x − 0","x"), h=`${L} + (x ${c<0?"+ "+(-c):"− "+c})²`.replace("x − 0","x");
 return Q(1,"Squeeze Theorem",`For all x, ${g} ≤ f(x) ≤ ${h}. What is lim<sub>x→${c}</sub> f(x) ?`,N(L),[N(L-m),"The limit cannot be determined",N(L+1)],`Both bounding functions approach ${N(L)} as x → ${c}, so by the Squeeze Theorem lim f(x) = <b>${N(L)}</b>.`); });
/* U2 derivative from a graph of f */
AB.push((R)=>{ const {xs,ys}=walk(R,-3,4); const c=R.pick([-2.5,-1.5,-0.5,0.5,1.5,2.5]); const i=Math.floor(c)+3, s=ys[i+1]-ys[i];
 const corners=xs.filter((x,j)=>j>0&&j<xs.length-1&&(ys[j]-ys[j-1])!==(ys[j+1]-ys[j])).length;
 return Q(2,"Derivatives from a graph",`The graph of f, made of line segments, is shown. What is f′(${c}) ?${plot({xmin:-3,xmax:4,ymin:-4,ymax:4,curves:[{pts:xs.map((x,j)=>[x,ys[j]])}],lab:{x:"x",y:"y"},cap:"Graph of f"})}`,N(s),[N(ys[i]+ (ys[i+1]-ys[i])*(c-Math.floor(c))===s?s+1:+(ys[i]+(ys[i+1]-ys[i])*(c-Math.floor(c))).toFixed(1)),N(-s===s?s+2:-s),N(s===0?1:(s>0?s+1:s-1))],`f′(${c}) is the slope of the segment from (${Math.floor(c)}, ${ys[i]}) to (${Math.floor(c)+1}, ${ys[i+1]}): <b>${N(s)}</b>. (The graph has ${corners} corner${corners===1?"":"s"}, where f is not differentiable.)`); });
/* U3 inverse derivative from a table */
AB.push((R)=>{ const xs=[0,1,2,3]; const f=[R.int(-3,0)]; for(let i=1;i<4;i++) f.push(f[i-1]+R.int(1,4)); const fp=xs.map(()=>R.pick([2,3,4,5,6]));
 const j=R.int(1,3), b=f[j];
 return Q(3,"Derivative of an inverse",`The function f is differentiable and increasing. Selected values of f and f′ are shown. If g is the inverse function of f, what is g′(${b}) ?${tbh([["x",...xs],["f(x)",...f],["f′(x)",...fp]])}`,FR(1,fp[j]),[FR(1,fp.find((v,k)=>k!==j&&v!==fp[j])||fp[j]+1),N(fp[j]),FR(1,b===0?7:b).replace(/<[^>]+>/g,"")===FR(1,fp[j]).replace(/<[^>]+>/g,"")?FR(1,fp[j]+2):FR(1,b===0?7:b)],`g(${b}) = ${j} because f(${j}) = ${b}. g′(${b}) = 1/f′(g(${b})) = 1/f′(${j}) = <b>1/${fp[j]}</b>.`); });
/* U4 meaning of a derivative in context */
AB.push((R)=>{ const C=R.pick([{f:"W(t)",w:"the amount of water in a tank, in gallons,",tu:"minutes",u:"gallons"},{f:"P(t)",w:"the population of a town, in people,",tu:"years",u:"people"},{f:"T(t)",w:"the temperature of a cup of tea, in degrees Fahrenheit,",tu:"minutes",u:"degrees Fahrenheit"}]);
 const t0=R.int(2,9), v=R.pick([-3,-2,2,4,5]);
 const right=`At time t = ${t0} ${C.tu}, ${C.w.split(",")[0].replace(/^the /,"the ")} is ${v>0?"increasing":"decreasing"} at a rate of ${Math.abs(v)} ${C.u} per ${C.tu.replace(/s$/,"")}.`;
 return Q(4,"Derivatives in context",`Let ${C.f} be ${C.w} at time t ${C.tu}. Which of the following is the best interpretation of ${C.f.replace("(t)","")}′(${t0}) = ${N(v)} ?`,right,
  [`At time t = ${t0} ${C.tu}, ${C.w.split(",")[0]} is ${Math.abs(v)} ${C.u}.`,`Over the first ${t0} ${C.tu}, ${C.w.split(",")[0]} changed by ${N(v)} ${C.u}.`,`At time t = ${t0} ${C.tu}, the rate of change of ${C.w.split(",")[0]} is ${v>0?"increasing":"decreasing"} by ${Math.abs(v)} ${C.u} per ${C.tu.replace(/s$/,"")} per ${C.tu.replace(/s$/,"")}.`],
  `A derivative is an instantaneous rate of change, in units of ${C.u} per ${C.tu.replace(/s$/,"")}. The sign tells whether the quantity is increasing or decreasing at that instant.`); });
/* U5 reading f from the graph of f′ */
AB.push((R)=>{ let xs,ys,ok=false; for(let t=0;t<40&&!ok;t++){ ({xs,ys}=walk(R,-4,4)); for(let i=0;i<8;i++) if(ys[i]*ys[i+1]<0){ if(Math.abs(ys[i])<=Math.abs(ys[i+1])) ys[i]=0; else ys[i+1]=0; }
  ok=ys.some(v=>v>0)&&ys.some(v=>v<0); } if(!ok) return null;
 const sc=[]; for(let i=1;i<8;i++){ if(ys[i]!==0) continue; const L=ys.slice(0,i).reverse().find(v=>v!==0), Rr=ys.slice(i+1).find(v=>v!==0); if(L&&Rr&&L*Rr<0) sc.push([xs[i],L>0?"max":"min"]); }
 const infl=xs.filter((x,j)=>j>0&&j<8&&Math.sign(ys[j]-ys[j-1])*Math.sign(ys[j+1]-ys[j])<0).length;
 const ask=R.pick(["max","min","infl"]); const nmax=sc.filter(s=>s[1]==="max").length, nmin=sc.filter(s=>s[1]==="min").length;
 const ans=ask==="max"?nmax:ask==="min"?nmin:infl; const what=ask==="max"?"a relative maximum":ask==="min"?"a relative minimum":"a point of inflection";
 const zeros=xs.filter((x,j)=>ys[j]===0).length;
 const opts=[...new Set([ans,zeros,ans+1,Math.max(0,ans-1),ans+2,nmax+nmin+infl])].filter(v=>v!==ans).slice(0,3);
 return Q(5,"Graph of f′",`The graph of f′, the derivative of f, is shown for −4 &lt; x &lt; 4. At how many values of x does the graph of f have ${what}?${plot({xmin:-4,xmax:4,ymin:-4,ymax:4,curves:[{pts:xs.map((x,j)=>[x,ys[j]])}],lab:{x:"x",y:"y"},cap:"Graph of f′"})}`,String(ans),opts.map(String),
  ask==="infl"?`f has a point of inflection where f′ changes from increasing to decreasing or vice versa (a peak or valley of the f′ graph): <b>${ans}</b>.`:`f has ${what} where f′ changes sign from ${ask==="max"?"positive to negative":"negative to positive"}${sc.length?` (x = ${sc.filter(s=>s[1]===ask).map(s=>s[0]).join(", ")||"none"})`:""}: <b>${ans}</b>. A zero of f′ without a sign change is not an extremum.`); });
/* U6 definite integral from a graph */
AB.push((R)=>{ const {xs,ys}=walk(R,-2,6); const a=R.int(-2,1), b=R.int(3,6); let I=0; for(let i=a+2;i<b+2;i++) I+=(ys[i]+ys[i+1])/2; let Ab=0; for(let i=a+2;i<b+2;i++){ const y0=ys[i],y1=ys[i+1]; if(y0*y1>=0) Ab+=Math.abs(y0+y1)/2; else { const s=Math.abs(y0)/(Math.abs(y0)+Math.abs(y1)); Ab+=(Math.abs(y0)*s+Math.abs(y1)*(1-s))/2; } }
 if(Math.abs(Ab-Math.abs(I))<1e-9) return null;
 return Q(6,"Integrals from a graph",`The graph of f, made of line segments, is shown. What is the value of ${ig(a,b)} f(x) dx ?${plot({xmin:-2,xmax:6,ymin:-4,ymax:4,curves:[{pts:xs.map((x,j)=>[x,ys[j]])}],shade:{f:x=>{ const i=Math.min(7,Math.floor(x)+2); return ys[i]+(ys[i+1]-ys[i])*(x-Math.floor(x)); },a,b},lab:{x:"x",y:"y"},cap:"Graph of f"})}`,fr(I),[fr(Ab),fr(-I===I?I+1:-I),fr(I+0.5)],`Add signed areas of the triangles and trapezoids: regions below the x-axis count as negative. ${ig(a,b)} f(x) dx = <b>${fr(I)}</b>. (Total area, counting everything as positive, would be ${fr(Ab)}.)`); });
/* U6 Riemann sums from a table (unequal widths) */
AB.push((R)=>{ const xs=R.pick([[0,2,3,7,10],[0,1,4,6,10],[1,3,4,8,9]]); const ys=xs.map(()=>R.int(1,12)); const kind=R.pick(["left","right","trapezoidal"]);
 let L=0,Rs=0,Tz=0; for(let i=0;i<4;i++){ const w=xs[i+1]-xs[i]; L+=ys[i]*w; Rs+=ys[i+1]*w; Tz+=(ys[i]+ys[i+1])/2*w; }
 const ans=kind==="left"?L:kind==="right"?Rs:Tz; const eq=ys.slice(0,4).reduce((s,v)=>s+v,0)*((xs[4]-xs[0])/4);
 return Q(6,"Riemann sums from a table",`The function f is continuous on [${xs[0]}, ${xs[4]}]. Using a ${kind} ${kind==="trapezoidal"?"sum":"Riemann sum"} with the four subintervals indicated by the table, what is the approximation of ${ig(xs[0],xs[4])} f(x) dx ?${tbh([["x",...xs],["f(x)",...ys]])}`,fr(ans),[kind==="left"?fr(Rs):fr(L),kind==="trapezoidal"?fr(Rs):fr(Tz),fr(eq)].map((v,i,arr)=>v===fr(ans)?fr(ans+i+1):v),
  `The subintervals have widths ${xs.slice(1).map((x,i)=>x-xs[i]).join(", ")} (not equal). ${kind==="left"?"Left":kind==="right"?"Right":"Trapezoidal"} sum = <b>${fr(ans)}</b>.`); });
/* U6 FTC with a table */
AB.push((R)=>{ const a=R.int(0,2), b=a+R.int(2,4), fa=R.int(-5,5), fb=R.int(-5,9), k=R.int(2,4), c=R.int(1,5);
 const ans=k*(fb-fa)+c*(b-a);
 return Q(6,"Fundamental Theorem of Calculus",`The function f has a continuous derivative, f(${a}) = ${fa} and f(${b}) = ${fb}. What is the value of ${ig(a,b)} (${k}f′(x) + ${c}) dx ?`,N(ans),[N(k*(fb-fa)),N(k*(fb-fa)+c),N(fb-fa+c*(b-a))],`${ig(a,b)} ${k}f′(x) dx = ${k}[f(${b}) − f(${a})] = ${k*(fb-fa)} and ${ig(a,b)} ${c} dx = ${c*(b-a)}. Total: <b>${N(ans)}</b>.`); });
/* U7 slope field matching */
AB.push((R)=>{ const D=[["x + y",(x,y)=>x+y],["x − y",(x,y)=>x-y],["xy",(x,y)=>x*y],["y − 1",(x,y)=>y-1],["x²",(x,y)=>x*x],["−x/y",(x,y)=>y===0?NaN:-x/y],["2x",(x,y)=>2*x],["y²",(x,y)=>y*y]];
 const pick=R.sample(D,4), ans=pick[0]; let s=""; const X=v=>30+(v+2)*45, Y=v=>210-(v+2)*45;
 for(let x=-2;x<=2;x++) for(let y=-2;y<=2;y++){ const m=ans[1](x,y); if(!isFinite(m)){ s+=`<line x1="${X(x)}" y1="${Y(y)-9}" x2="${X(x)}" y2="${Y(y)+9}" stroke="#1d4ed8" stroke-width="2"/>`; continue; } const ang=Math.atan(m), dx=9*Math.cos(ang), dy=9*Math.sin(ang); s+=`<line x1="${X(x)-dx}" y1="${Y(y)+dy}" x2="${X(x)+dx}" y2="${Y(y)-dy}" stroke="#1d4ed8" stroke-width="2"/>`; }
 s+=`<line x1="10" y1="${Y(0)}" x2="250" y2="${Y(0)}" stroke="#999"/><line x1="${X(0)}" y1="10" x2="${X(0)}" y2="250" stroke="#999"/><text x="245" y="${Y(0)-5}" font-size="11">x</text><text x="${X(0)+5}" y="18" font-size="11">y</text>`;
 return Q(7,"Slope fields",`Which differential equation has the slope field shown (at the points x, y = −2, −1, 0, 1, 2)?<div class="zplot"><svg viewBox="0 0 260 260" width="100%" style="max-width:260px">${s}</svg></div>`,`dy/dx = ${ans[0]}`,pick.slice(1).map(d=>`dy/dx = ${d[0]}`),`Check a few points. For example, at (1, 1) the slope is ${N(ans[1](1,1))} and at (−1, 2) it is ${N(ans[1](-1,2))}. Only <b>dy/dx = ${ans[0]}</b> matches every segment.`); });
/* U7 writing a differential equation from words */
AB.push((R)=>{ const C=R.pick([["the square root of P","√P"],["the cube of P","P³"],["the difference between 100 and P","(100 − P)"],["the product of P and (500 − P)","P(500 − P)"]]);
 const wr=R.sample([["√P"],["P³"],["(100 − P)"],["P(500 − P)"]].map(x=>x[0]).filter(x=>x!==C[1]),2);
 return Q(7,"Modeling with differential equations",`The rate of change of a quantity P with respect to time t is proportional to ${C[0]}. Which equation models this, where k is a constant?`,`dP/dt = k${C[1]}`,[`P = k${C[1]}`,...wr.map(x=>`dP/dt = k${x}`)],`“Rate of change of P” is dP/dt, and “proportional to” means a constant multiple: <b>dP/dt = k${C[1]}</b>.`); });
/* U8 area with respect to y */
AB.push((R)=>{ const [r1,r2]=R.pick([[-1,2],[-2,1],[-1,3],[-2,2],[0,3],[-3,1]]); const s=r1+r2, p=-r1*r2; const A=(r2-r1)**3/6;
 return Q(8,"Area with respect to y",`What is the area of the region enclosed by the graphs of x = y² and x = ${s===0?"":s===1?"y":s===-1?"−y":s+"y"}${p?(s?(p>0?" + ":" − ")+Math.abs(p):N(p)):""}${!s&&!p?"0":""} ?`,fr(A),[fr(A*2),fr(A+1),fr((r2-r1)**2/2)],`Solve y² = ${s}y + ${p}: y = ${r1} and y = ${r2}. Integrate with respect to y (right curve minus left curve): ∫<sub>${r1}</sub><sup>${r2}</sup> (${s}y + ${p} − y²) dy = <b>${fr(A)}</b>.`); });

/* BC: U9 vector-valued position */
BC.push((R)=>{ const a=R.int(1,3), b=R.int(-2,3), c=R.int(1,4), x0=R.int(-3,3), y0=R.int(-3,3), T=R.int(1,3);
 const X=x0+a*T*T+b*T, Y=y0+c*T**3/3*3/3; const Yv=y0+c*T**3;
 return Q(9,"Vector-valued functions",`A particle moves in the xy-plane with velocity vector v(t) = ⟨${2*a}t ${b<0?"− "+(-b):"+ "+b}, ${3*c}t²⟩. At t = 0 the particle is at (${x0}, ${y0}). Where is the particle at t = ${T} ?`,`(${N(X)}, ${N(Yv)})`,[`(${N(X-x0)}, ${N(Yv-y0)})`,`(${N(2*a*T+b)}, ${N(3*c*T*T)})`,`(${N(X)}, ${N(Yv+3)})`],`Integrate each component and add the starting point: x(${T}) = ${x0} + ${ig(0,T)} (${2*a}t ${b<0?"− "+(-b):"+ "+b}) dt = ${N(X)}; y(${T}) = ${y0} + ${ig(0,T)} ${3*c}t² dt = ${N(Yv)}. Position: <b>(${N(X)}, ${N(Yv)})</b>.`); });
/* U9 polar area between curves (setup) */
BC.push((R)=>{ const a=R.int(1,3); return Q(9,"Area between polar curves",`Which expression gives the area of the region inside the polar curve r = ${a} + ${a}cos θ and outside the circle r = ${a} ?`,`½∫<sub>−π/2</sub><sup>π/2</sup> [(${a} + ${a}cos θ)² − ${a*a}] dθ`,[`½∫<sub>−π/2</sub><sup>π/2</sup> (${a}cos θ)² dθ`,`∫<sub>0</sub><sup>π</sup> [(${a} + ${a}cos θ)² − ${a*a}] dθ`,`½∫<sub>0</sub><sup>2π</sup> [(${a} + ${a}cos θ)² − ${a*a}] dθ`],`The curves meet where ${a}cos θ = 0: θ = ±π/2. Between them the cardioid is outside the circle, so A = ½∫ (r<sub>outer</sub>² − r<sub>inner</sub>²) dθ from −π/2 to π/2.`); });
/* U10 which series converges */
BC.push((R)=>{ const C=R.pick([["Σ 1/n<sup>3/2</sup>","p-series with p = 3/2 &gt; 1"],["Σ (−1)<sup>n</sup>/n","alternating series test"],["Σ n/(n³ + 1)","limit comparison with Σ 1/n²"],["Σ 2<sup>n</sup>/n!","ratio test (limit 0)"],["Σ 1/(n² + 5)","comparison with Σ 1/n²"]]);
 const D=R.sample(["Σ 1/√n","Σ n/(n + 1)","Σ 1/n","Σ (3/2)<sup>n</sup>","Σ n²/(n² + 4)","Σ 1/(2n + 1)","Σ (−1)<sup>n</sup> n/(n + 2)"],3);
 return Q(10,"Convergence tests",`Which of the following series converges? (Each sum runs from n = 1 to ∞.)`,C[0],D,`<b>${C[0]}</b> converges by the ${C[1]}. The others diverge: p-series with p ≤ 1, a geometric series with |r| ≥ 1, comparisons with the harmonic series, or terms that do not approach 0 (nth term test).`); });
/* U10 absolute vs conditional convergence */
BC.push((R)=>{ const p=R.pick([[1,"conditionally"],["1/2","conditionally"],[2,"absolutely"],["3/2","absolutely"],[0,"diverges"]]);
 const ser=p[0]===0?`Σ (−1)<sup>n</sup> n/(n + 1)`:`Σ (−1)<sup>n</sup>/n${p[0]===1?"":"<sup>"+p[0]+"</sup>"}`;
 const ans=p[1]==="diverges"?"It diverges.":`It converges ${p[1]}.`; const all=["It converges absolutely.","It converges conditionally.","It diverges.","It converges, but the test is inconclusive about absolute convergence."];
 return Q(10,"Absolute and conditional convergence",`Which is true about the series ${ser} (n from 1 to ∞)?`,ans,all.filter(x=>x!==ans).slice(0,3),p[1]==="diverges"?"The terms approach ±1, not 0, so the series diverges by the nth term test.":p[1]==="absolutely"?`Σ 1/n<sup>${p[0]}</sup> is a p-series with p &gt; 1, so the series converges absolutely.`:`Σ 1/n<sup>${p[0]===1?"1":p[0]}</sup> diverges (p ≤ 1), but the alternating series converges by the alternating series test: it <b>converges conditionally</b>.`); });
/* U10 Maclaurin series by substitution */
BC.push((R)=>{ const k=R.pick([2,3]), f=R.pick(["e","sin","cos"]); const n=R.pick([2,3]);
 let ans,ex,w; if(f==="e"){ const c=Math.pow(-1,n)/[1,1,2,6][n]; ans=fr(c); ex=`e<sup>u</sup> = Σ uⁿ/n!. With u = −x<sup>${k}</sup>, the term with x<sup>${k*n}</sup> is (−x<sup>${k}</sup>)<sup>${n}</sup>/${n}! : coefficient <b>${fr(c)}</b>.`; w=[fr(-c),fr(1/[1,1,2,6][n]*k),fr(c*2)]; return Q(10,"Maclaurin series",`What is the coefficient of x<sup>${k*n}</sup> in the Maclaurin series for e<sup>−x<sup>${k}</sup></sup> ?`,ans,w,ex); }
 if(f==="sin"){ const c=-(2**3)/6; return Q(10,"Maclaurin series",`What is the coefficient of x³ in the Maclaurin series for sin(2x) ?`,fr(c),[fr(-1/6),fr(8/6),fr(-2/6)],`sin u = u − u³/3! + …; with u = 2x the x³ term is −(2x)³/6 = −8x³/6: coefficient <b>${fr(c)}</b>.`); }
 return Q(10,"Maclaurin series",`What is the coefficient of x⁴ in the Maclaurin series for x² cos x ?`,fr(-1/2),[fr(1/24),fr(1/2),fr(-1/24)],`cos x = 1 − x²/2 + x⁴/24 − …, so x² cos x = x² − x⁴/2 + …: coefficient <b>−1/2</b>.`); });

ZX.rep={ab:AB,bc:[...AB,...BC]};
/* book pages: add these to each unit's practice (medium level) */
if(!window.ZNOBOOK&&window.ZC&&ZC.units&&(ZC.relKey==="ab"||ZC.relKey==="bc")){
 ZX.rep[ZC.relKey].forEach(tp=>{ let u=null; for(let i=0;i<6&&!u;i++){ try{ u=tp(ZX.rng(1+i*977),ZX.H); }catch(e){} } if(!u) return; const unit=ZC.units.find(v=>v.id==="u"+u.u); if(!unit) return;
  const g=()=>{ for(let i=0;i<20;i++){ try{ const p=tp(ZX.rng(1+Math.floor(Math.random()*2e9)),ZX.H); if(p) return {t:p.t,q:p.q,a:p.a,w:p.w,s:[p.ex]}; }catch(e){} } return null; };
  (unit.med=unit.med||[]).push(g); });
}
})();
