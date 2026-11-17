/* AP Precalculus free-response templates (6 points each, 1 point per sub-part), May 2027 blueprint:
   Q1 Function Concepts (calculator) · Q2 Modeling a Non-Periodic Context (calculator)
   Q3 Modeling a Periodic Context (no calculator) · Q4 Symbolic Manipulations (no calculator) */
(function(){
const {roots,root,f3,N,FR,tb,tbh,F}=ZX.H, NUM=ZX.NUM, plot=ZX.plot;
const P=(t,earn,not,need)=>({t,earn,not:not||"",need:need||[],v:1});
const frac=(x,md=48)=>{ if(Math.abs(x-Math.round(x))<1e-9) return N(Math.round(x)); for(let q=2;q<=md;q++){ const p=Math.round(x*q); if(Math.abs(p/q-x)<1e-9) return F(p,q); } return f3(x); };
const ln=Math.log, e=Math.exp;
const Q={1:[],2:[],3:[],4:[]};
const part=(id,q,pt,model)=>({id,q,pts:[pt],model});

/* ---------- Q1: Function concepts ---------- */
Q[1].push((R)=>{
 const xs=[0,1,2,3,4,5,6]; const a=R.pick([0.5,1,1.5]), b=R.int(1,3), c=R.int(0,4); const up=R.chance(0.5);
 const fv=xs.map(x=>up?Math.round(a*x*x+b*x+c):Math.round(-a*x*x+(b+7)*x+c)); for(let i=1;i<7;i++) if(fv[i]<=fv[i-1]) return null;
 const k=R.pick([2,3]), m=R.pick([1,2]); const g=x=>k*ln(x+1)+m; const i1=R.int(1,5), gf=g(fv[i1]);
 const j=R.int(1,5), target=fv[j];
 const kk=R.int(Math.ceil(m+1),Math.floor(g(6))); const xg=Math.exp((kk-m)/k)-1;
 const p1=R.int(0,2), p2=p1+R.int(2,4); const ar=(g(p2)-g(p1))/(p2-p1);
 const r1=(fv[2]-fv[0])/2, r2=(fv[4]-fv[2])/2, r3=(fv[6]-fv[4])/2; const cu=r1<r2&&r2<r3, cd=r1>r2&&r2>r3; if(!cu&&!cd) return null;
 return {title:"Function concepts",type:"Function Concepts (calculator)",slotName:"Q1",
  stem:`<p>The function f is increasing on the interval 0 ≤ x ≤ 6. Selected values of f are given in the table. The function g is given by g(x) = ${k}ln(x + 1) + ${m}.</p>${tbh([["x",...xs],["f(x)",...fv]])}`,
  parts:[
  part("A(i)",`Find the value of g(f(${i1})).`,P("g(f(x))",`f(${i1}) = ${fv[i1]}, so g(${fv[i1]}) = ${k}ln(${fv[i1]+1}) + ${m} ≈ ${f3(gf)}.`,"f(g(…)) instead of g(f(…)).",[[NUM(gf,0.002),`g(f(${i1})) ≈ ${f3(gf)}.`]]),`f(${i1}) = ${fv[i1]}. g(${fv[i1]}) = ${k}ln(${fv[i1]+1}) + ${m} ≈ <b>${f3(gf)}</b>.`),
  part("A(ii)",`Find the value of f<sup>−1</sup>(${target}).`,P("Inverse",`f(${j}) = ${target}, so f<sup>−1</sup>(${target}) = ${j}.`,`1/f(${target}) or f(${target}).`,[[NUM(j,0.001),`f⁻¹(${target}) = ${j}.`]]),`Since f(${j}) = ${target}, f<sup>−1</sup>(${target}) = <b>${j}</b>.`),
  part("B(i)",`Find all values of x, 0 ≤ x ≤ 6, for which g(x) = ${kk}.`,P("Solves",`x ≈ ${f3(xg)}.`,"",[[NUM(xg,0.002),`x ≈ ${f3(xg)}.`]]),`${k}ln(x + 1) + ${m} = ${kk} ⇒ ln(x + 1) = ${frac((kk-m)/k)} ⇒ x = e<sup>${frac((kk-m)/k)}</sup> − 1 ≈ <b>${f3(xg)}</b>.`),
  part("B(ii)",`Find the average rate of change of g over the interval ${p1} ≤ x ≤ ${p2}.`,P("Average rate of change",`[g(${p2}) − g(${p1})]/(${p2} − ${p1}) ≈ ${f3(ar)}.`,"",[[NUM(ar,0.002),`About ${f3(ar)}.`]]),`[g(${p2}) − g(${p1})]/(${p2} − ${p1}) ≈ (${f3(g(p2))} − ${f3(g(p1))})/${p2-p1} ≈ <b>${f3(ar)}</b>.`),
  part("C(i)","Find the average rates of change of f over the intervals 0 ≤ x ≤ 2, 2 ≤ x ≤ 4 and 4 ≤ x ≤ 6.",P("Three rates",`${frac(r1)}, ${frac(r2)}, ${frac(r3)}.`,"",[[NUM(r2,0.01),`The rates are ${frac(r1)}, ${frac(r2)}, ${frac(r3)}.`]]),`(${fv[2]} − ${fv[0]})/2 = ${frac(r1)}; (${fv[4]} − ${fv[2]})/2 = ${frac(r2)}; (${fv[6]} − ${fv[4]})/2 = ${frac(r3)}.`),
  part("C(ii)","Based on your answer to C(i), is the graph of f concave up or concave down on 0 ≤ x ≤ 6? Explain your reasoning.",P("Concavity with reason",`Concave ${cu?"up":"down"}, because the average rates of change over consecutive equal-length intervals are ${cu?"increasing":"decreasing"}.`,"Reasoning from f increasing; no reason.",[[cu?/up/i:/down/i,`Concave ${cu?"up":"down"}.`],[/rate|increas|decreas/i,"Explain with the rates of change."]]),`The average rates of change over consecutive equal intervals are ${cu?"increasing":"decreasing"} (${frac(r1)}, ${frac(r2)}, ${frac(r3)}), so the graph of f is <b>concave ${cu?"up":"down"}</b>.`)]};
});
Q[1].push((R)=>{
 const a=R.int(1,4), b=R.int(1,5), c=R.pick([-3,-2,-1,5,6].filter(x=>x!==a&&x!==-b)); const k=R.pick([1,2]);
 const r=x=>k*(x-a)*(x+b)/((x-a)*(x-c)); const hy=k*(a+b)/(a-c);
 const yv=R.pick([3,4,-1].map(v=>v*k)).valueOf(); if(yv===k) return null; const xs=(c*yv - k*(-b))/(yv-k); /* k(x+b)=yv(x−c) */
 const xsol=(k*b+yv*c)/(yv-k); if(Math.abs(xsol-a)<1e-9||Math.abs(xsol-c)<1e-9) return null;
 const side=R.pick(["+","−"]); const sgn=x=>Math.sign(k*(x+b)/(x-c)); const lim=sgn(c+(side==="+"?1e-6:-1e-6))>0?"∞":"−∞";
 return {title:"Rational function",type:"Function Concepts (calculator)",slotName:"Q1",
  stem:`<p>The function r is given by r(x) = ${FR(`${k===1?"":k}(x − ${a})(x + ${b})`,`(x − ${a})(x ${c<0?"+ "+(-c):"− "+c})`)}.</p>`,
  parts:[
  part("A(i)",`The graph of r has a hole at x = ${a}. Find the y-coordinate of the hole.`,P("Hole",`r(x) = ${k===1?"":k}(x + ${b})/(x ${c<0?"+ "+(-c):"− "+c}) for x ≠ ${a}; y = ${frac(hy)}.`,"Saying r(${a}) = 0 or undefined without finding the limit.",[[NUM(hy,0.002),`The y-coordinate is ${frac(hy)}.`]]),`For x ≠ ${a}, r(x) = ${k===1?"":k}(x + ${b})/(x ${c<0?"+ "+(-c):"− "+c}). The hole is at (${a}, <b>${frac(hy)}</b>).`),
  part("A(ii)","Find the equation of each vertical asymptote of the graph of r.",P("Vertical asymptote",`x = ${c}.`,`Including x = ${a} (that is a hole).`,[[NUM(c,0.001),`x = ${c}.`]]),`After the common factor cancels, the denominator is 0 only at x = ${c}: <b>x = ${c}</b>.`),
  part("B(i)","Find lim<sub>x→∞</sub> r(x).",P("End behavior",`${k}.`,"",[[NUM(k,0.001),`The limit is ${k}.`]]),`The degrees are equal, so the limit is the ratio of the leading coefficients: <b>${k}</b>.`),
  part("B(ii)",`Find lim<sub>x→${c}<sup>${side==="+"?"+":"−"}</sup></sub> r(x).`,P("One-sided limit",`${lim}.`,"",[[lim==="∞"?/^(?!.*[−-]\s*∞)(?=.*(∞|inf))/i:/[−-]\s*(∞|inf)/i,`The limit is ${lim}.`]]),`Near x = ${c} from the ${side==="+"?"right":"left"}, the numerator is about ${N(k*(c+b))} and the denominator is ${side==="+"?"positive":"negative"} and near 0, so r(x) → <b>${lim}</b>.`),
  part("C(i)",`Find all values of x for which r(x) = ${yv}.`,P("Solves",`x = ${frac(xsol)}.`,"",[[NUM(xsol,0.002),`x = ${frac(xsol)}.`]]),`${k===1?"":k}(x + ${b}) = ${yv}(x ${c<0?"+ "+(-c):"− "+c}) ⇒ x = <b>${frac(xsol)}</b> (not ${a}, so it is valid).`),
  part("C(ii)","Find all intervals on which r(x) > 0.",P("Intervals",`r &gt; 0 where (x + ${b})/(x ${c<0?"+ "+(-c):"− "+c}) ${k>0?"&gt;":"&lt;"} 0, excluding x = ${a}.`,"Not excluding the hole.",[[NUM(Math.min(-b,c),0.001),"Use the zeros/asymptote as boundaries."]]),`Sign chart with boundaries x = ${-b} and x = ${c} (and the hole at x = ${a}): r(x) &gt; 0 on <b>${(()=>{ const lo=Math.min(-b,c), hi=Math.max(-b,c); const iv=[`(−∞, ${lo})`,`(${hi}, ∞)`]; return iv.map(s=>s.includes(`${a})`)||false?s:s).join(" ∪ ")+(a<lo||a>hi?`, excluding x = ${a}`:""); })()}</b>.`)]};
});

/* ---------- Q2: Modeling a non-periodic context ---------- */
Q[2].push((R)=>{
 const C=R.pick([{q:"the number of bacteria in a culture",u:"bacteria",tu:"hours",up:1},{q:"the value of a car, in dollars,",u:"dollars",tu:"years",up:0},{q:"the number of users of a new app, in thousands,",u:"thousand users",tu:"months",up:1},{q:"the mass of a medication in the bloodstream, in milligrams,",u:"milligrams",tu:"hours",up:0}]);
 const a=C.up?R.int(2,9)*100:R.int(10,40)*1000/(C.u==="milligrams"?100:1); const rt=C.up?R.pick([1.15,1.2,1.25,1.3]):R.pick([0.8,0.85,0.9]); const t1=R.pick([2,3,4]); const y1=+(a*rt**t1).toFixed(C.u==="dollars"?0:1);
 const b=(y1/a)**(1/t1); const M=t=>a*b**t; const t2=t1+R.int(2,4), tgt=C.up?Math.round(a*R.pick([3,4,5])):Math.round(a*R.pick([0.4,0.3,0.25])); const tt=ln(tgt/a)/ln(b);
 const t3=t2+R.int(1,3), act=+(M(t3)*(1+R.pick([-1,1])*R.pick([0.08,0.12]))).toFixed(0), over=M(t3)>act;
 return {title:"Exponential model",type:"Modeling a Non-Periodic Context (calculator)",slotName:"Q2",
  stem:`<p>Let M(t) model ${C.q} t ${C.tu} after an initial measurement. At t = 0 the measurement was ${a}; at t = ${t1} it was ${y1}. The model is M(t) = a·b<sup>t</sup>.</p>`,
  parts:[
  part("A(i)","Find the value of a.",P("a",`a = ${a}.`,"",[[NUM(a,0.01),`a = ${a}.`]]),`M(0) = a = <b>${a}</b>.`),
  part("A(ii)","Find the value of b.",P("b",`b = (${y1}/${a})<sup>1/${t1}</sup> ≈ ${f3(b)}.`,"Using a linear rate of change.",[[NUM(b,0.002),`b ≈ ${f3(b)}.`]]),`${a}b<sup>${t1}</sup> = ${y1} ⇒ b = (${y1}/${a})<sup>1/${t1}</sup> ≈ <b>${f3(b)}</b>.`),
  part("B(i)",`Use the model to predict the measurement at t = ${t2}.`,P("Prediction",`M(${t2}) ≈ ${f3(M(t2))}.`,"",[[NUM(M(t2),Math.max(0.01,M(t2)*0.002)),`M(${t2}) ≈ ${f3(M(t2))}.`]]),`M(${t2}) = ${a}(${f3(b)})<sup>${t2}</sup> ≈ <b>${f3(M(t2))}</b>.`),
  part("B(ii)",`According to the model, at what time t is the measurement ${tgt}?`,P("Solves",`t ≈ ${f3(tt)} ${C.tu}.`,"",[[NUM(tt,0.01),`t ≈ ${f3(tt)}.`]]),`${a}b<sup>t</sup> = ${tgt} ⇒ t = ln(${tgt}/${a})/ln b ≈ <b>${f3(tt)} ${C.tu}</b>.`),
  part("C(i)",`By what percent does the measurement ${C.up?"increase":"decrease"} each ${C.tu.replace(/s$/,"")}, according to the model?`,P("Percent change",`${f3(Math.abs(b-1)*100)}% per ${C.tu.replace(/s$/,"")}.`,"Giving b itself as the percent.",[[NUM(Math.abs(b-1)*100,0.2),`About ${(Math.abs(b-1)*100).toFixed(1)}%.`]]),`Each ${C.tu.replace(/s$/,"")} the measurement is multiplied by b ≈ ${f3(b)}, a <b>${(Math.abs(b-1)*100).toFixed(1)}% ${C.up?"increase":"decrease"}</b>.`),
  part("C(ii)",`The actual measurement at t = ${t3} was ${act}. Does the model overestimate or underestimate the actual value? Explain.`,P("Over/under with reason",`M(${t3}) ≈ ${f3(M(t3))}, which is ${over?"greater":"less"} than ${act}: an <b>${over?"overestimate":"underestimate"}</b>.`,"No comparison with a model value.",[[over?/over/i:/under/i,`It is an ${over?"overestimate":"underestimate"}.`]]),`M(${t3}) ≈ ${f3(M(t3))} ${over?"&gt;":"&lt;"} ${act}, so the model <b>${over?"overestimates":"underestimates"}</b> the actual value (error ≈ ${f3(M(t3)-act)}).`)]};
});
Q[2].push((R)=>{
 const x=[0,2,4]; const A=-R.pick([0.5,1,1.5,2]), Bc=R.int(6,14), Cc=R.int(2,20); const y=x.map(t=>A*t*t+Bc*t+Cc);
 const Qf=t=>A*t*t+Bc*t+Cc; const vx=-Bc/(2*A), x4=R.pick([5,6,7]), act=Math.round(Qf(x4)+R.pick([-3,-2,2,3])), res=act-Qf(x4);
 const p1=R.pick([1,2]), p2=p1+R.int(2,3); const ar=(Qf(p2)-Qf(p1))/(p2-p1);
 const C=R.pick([{w:"the height, in feet, of a model rocket",tu:"seconds"},{w:"the number of visitors, in hundreds, at a museum exhibit",tu:"weeks"},{w:"the temperature, in degrees Celsius, of a chemical reaction",tu:"minutes"}]);
 return {title:"Quadratic model",type:"Modeling a Non-Periodic Context (calculator)",slotName:"Q2",
  stem:`<p>The table shows ${C.w} at selected times t, in ${C.tu}. A quadratic function Q(t) = at² + bt + c is used to model the data, and the graph of Q passes through the three points in the table.</p>${tbh([["t",...x],["value",...y.map(N)]])}`,
  parts:[
  part("A(i)","Write a system of equations for a, b and c, and find their values.",P("Coefficients",`a = ${N(A)}, b = ${Bc}, c = ${Cc}.`,"",[[NUM(A,0.001),`a = ${N(A)}.`]]),`c = ${Cc}; 4a + 2b + ${Cc} = ${N(y[1])}; 16a + 4b + ${Cc} = ${N(y[2])}. Solving: <b>a = ${N(A)}, b = ${Bc}, c = ${Cc}</b>.`),
  part("A(ii)",`Use Q to predict the value at t = ${x4}.`,P("Prediction",`Q(${x4}) = ${frac(Qf(x4))}.`,"",[[NUM(Qf(x4),0.01),`Q(${x4}) = ${frac(Qf(x4))}.`]]),`Q(${x4}) = ${N(A)}(${x4})² + ${Bc}(${x4}) + ${Cc} = <b>${frac(Qf(x4))}</b>.`),
  part("B(i)",`The actual value at t = ${x4} was ${act}. Find the residual at t = ${x4}.`,P("Residual",`actual − predicted = ${frac(res)}.`,"predicted − actual.",[[NUM(res,0.01),`The residual is ${frac(res)}.`]]),`Residual = actual − predicted = ${act} − ${frac(Qf(x4))} = <b>${frac(res)}</b>.`),
  part("B(ii)","Based on the residual, does the model overestimate or underestimate the actual value? Explain.",P("Interpretation",`${res<0?"Overestimate":"Underestimate"}, because the residual is ${res<0?"negative":"positive"}.`,"",[[res<0?/over/i:/under/i,`It is an ${res<0?"overestimate":"underestimate"}.`]]),`The residual is ${res<0?"negative (predicted &gt; actual)":"positive (actual &gt; predicted)"}, so the model <b>${res<0?"overestimates":"underestimates"}</b>.`),
  part("C(i)","According to the model, at what time is the value greatest?",P("Vertex",`t = −b/(2a) = ${frac(vx)}.`,"",[[NUM(vx,0.01),`t = ${frac(vx)}.`]]),`The vertex is at t = −b/(2a) = −${Bc}/(2·${N(A)}) = <b>${frac(vx)} ${C.tu}</b>.`),
  part("C(ii)",`Find the average rate of change of Q over ${p1} ≤ t ≤ ${p2}, and interpret it in context.`,P("Rate with meaning",`${frac(ar)} per ${C.tu.replace(/s$/,"")}: on average, the value changes by ${frac(ar)} each ${C.tu.replace(/s$/,"")} over this interval.`,"",[[NUM(ar,0.01),`The average rate is ${frac(ar)}.`],[/per|each|average/i,"Interpret with units."]]),`[Q(${p2}) − Q(${p1})]/(${p2} − ${p1}) = (${frac(Qf(p2))} − ${frac(Qf(p1))})/${p2-p1} = <b>${frac(ar)}</b>: on average the value ${ar>=0?"increases":"decreases"} by ${frac(Math.abs(ar))} per ${C.tu.replace(/s$/,"")} from t = ${p1} to t = ${p2}.`)]};
});

/* ---------- Q3: Modeling a periodic context ---------- */
Q[3].push((R)=>{
 const C=R.pick([{w:"A Ferris wheel",d:"a rider's height above the ground",u:"feet",tu:"minutes",min:1},{w:"The tide in a harbor",d:"the depth of the water",u:"feet",tu:"hours",min:0},{w:"A paddle wheel",d:"the height of a point on the paddle wheel above the water",u:"feet",tu:"seconds",min:1}]);
 const Am=C.tu==="hours"?R.int(2,5):C.tu==="seconds"?R.int(3,8):R.int(15,40), Hc=Am+(C.tu==="seconds"?R.int(-2,2):R.int(2,12)), Pd=C.tu==="hours"?R.pick([12]):C.tu==="seconds"?R.pick([4,6,8]):R.pick([6,8,12]); const start=C.min?"lowest":R.pick(["lowest","highest"]); const s=start==="lowest"?-1:1;
 const cval=start==="lowest"?-Pd/4:Pd/4; const q=R.int(0,3); const inc=s<0?q<2:q>=2, cu=s<0?(q===0||q===3):(q===1||q===2);
 const lvl=Hc+Am/2*(s<0?1:1), tl=s<0?[Pd/3,2*Pd/3]:[Pd/6,5*Pd/6];
 const h=t=>Hc+s*Am*Math.cos(2*Math.PI*t/Pd);
 return {title:"Periodic model",type:"Modeling a Periodic Context (no calculator)",slotName:"Q3",
  stem:`<p>${C.w} completes one cycle every ${Pd} ${C.tu}. Let h(t) be ${C.d}, in ${C.u}, at time t ${C.tu}. The maximum value of h is ${Hc+Am} ${C.u} and the minimum value is ${Hc-Am} ${C.u}. At t = 0, h is at its ${start} value. The function h is sinusoidal and can be written as h(t) = a sin(b(t + c)) + d, where a &gt; 0 and b &gt; 0.</p>${plot({xmin:0,xmax:Pd,ymin:0,ymax:Hc+Am+2,xstep:Pd/4,ystep:Math.max(1,Math.round((Hc+Am)/6)),curves:[{f:h}],lab:{x:"t",y:"h"},cap:"Graph of h over one cycle"})}`,
  parts:[
  part("A(i)","Find the values of a and d.",P("a and d",`a = ${Am} (amplitude), d = ${Hc} (midline).`,"",[[NUM(Am,0.001),`a = ${Am}.`],[NUM(Hc,0.001),`d = ${Hc}.`]]),`a = (max − min)/2 = (${Hc+Am} − ${Hc-Am})/2 = <b>${Am}</b>; d = (max + min)/2 = <b>${Hc}</b>.`),
  part("A(ii)","Find the values of b and c.",P("b and c",`b = 2π/${Pd} = ${frac(2/Pd)}π; c = ${frac(cval)} (or any c that differs from it by a multiple of ${Pd}).`,"",[[/π|pi/i,"b is a multiple of π."]]),`Period ${Pd}, so b = 2π/${Pd} = <b>${frac(2/Pd)}π</b>. The sine graph crosses the midline going up a quarter period ${start==="lowest"?"after":"before"} t = 0, so <b>c = ${frac(cval)}</b> (other answers differing by ${Pd} also work).`),
  part("B(i)",`On the interval ${frac(q*Pd/4)} &lt; t &lt; ${frac((q+1)*Pd/4)}, is h increasing or decreasing? Explain.`,P("Increasing/decreasing",`${inc?"Increasing":"Decreasing"}: the output moves ${inc?"up":"down"} toward the ${inc?"maximum":"minimum"} on this interval.`,"",[[inc?/increas/i:/decreas/i,`h is ${inc?"increasing":"decreasing"}.`]]),`On (${frac(q*Pd/4)}, ${frac((q+1)*Pd/4)}), h goes from ${N(h(q*Pd/4))} to ${N(h((q+1)*Pd/4))}: <b>${inc?"increasing":"decreasing"}</b>.`),
  part("B(ii)",`On the same interval, is the rate of change of h increasing or decreasing? Explain.`,P("Concavity",`${cu?"Increasing":"Decreasing"}: the graph of h is concave ${cu?"up":"down"} there.`,"",[[cu?/increas/i:/decreas/i,`The rate of change is ${cu?"increasing":"decreasing"}.`],[/concav/i,"Explain using concavity."]]),`The graph of h is <b>concave ${cu?"up":"down"}</b> on this interval (it is ${cu?"near a minimum / below":"near a maximum / above"} the midline), so the rate of change is <b>${cu?"increasing":"decreasing"}</b>.`),
  part("C(i)",`Find all times t, 0 ≤ t ≤ ${Pd}, at which h(t) = ${frac(lvl)}.`,P("Solves",`t = ${frac(tl[0])} and t = ${frac(tl[1])}.`,"Only one solution.",[[NUM(tl[0],0.01),`t = ${frac(tl[0])} and ${frac(tl[1])}.`]]),`h(t) = ${Hc} ${s<0?"−":"+"} ${Am}cos(2πt/${Pd}) = ${frac(lvl)} ⇒ cos(2πt/${Pd}) = ${s<0?"−":""}½ ⇒ 2πt/${Pd} = ${s<0?"2π/3 or 4π/3":"π/3 or 5π/3"} ⇒ <b>t = ${frac(tl[0])} and t = ${frac(tl[1])}</b>.`),
  part("C(ii)",`During one cycle, for how many ${C.tu} is h(t) greater than ${frac(lvl)}?`,P("Duration",`${frac(Pd/3)} ${C.tu}.`,"",[[NUM(Pd/3,0.01),`${frac(Pd/3)} ${C.tu}.`]]),`h &gt; ${frac(lvl)} ${s<0?`between t = ${frac(tl[0])} and t = ${frac(tl[1])}`:`for 0 ≤ t &lt; ${frac(tl[0])} and ${frac(tl[1])} &lt; t ≤ ${Pd}`}: <b>${frac(Pd/3)} ${C.tu}</b>.`)]};
});

/* ---------- Q4: Symbolic manipulations ---------- */
Q[4].push((R)=>{
 const LG=R.pick([[2,3,8,-1],[2,3,4,-2],[3,2,9,-1],[2,4,8,-2],[2,4,16,-1],[5,2,25,-1]]); const [lb,ln_,r1,r2]=LG; const m=r1+r2;
 const EX=R.pick([[2,[4,"x + 1"],[8,"2x − 1"],2*1,3*2,2,3,[2,1],[6,-3]],[3,[9,"x"],[27,"x − 2"],2,3,0,0,[2,0],[3,-6]],[2,[16,"x − 1"],[8,"x + 2"],4,3,0,0,[4,-4],[3,6]]]);
 const [base,[B1,e1],[B2,e2],,, ,, [a1,c1],[a2,c2]]=EX; const xs=(c2-c1)/(a1-a2);
 const TR=R.pick([{eq:"2sin²θ − sin θ − 1 = 0",sol:"θ = π/2, 7π/6, 11π/6",chk:[/7\s*π\s*\/\s*6/i,/11\s*π\s*\/\s*6/i],w:"(2sin θ + 1)(sin θ − 1) = 0 ⇒ sin θ = 1 or sin θ = −½"},{eq:"2cos²θ + cos θ − 1 = 0",sol:"θ = π/3, π, 5π/3",chk:[/π\s*\/\s*3/i,/5\s*π\s*\/\s*3/i],w:"(2cos θ − 1)(cos θ + 1) = 0 ⇒ cos θ = ½ or cos θ = −1"},{eq:"2sin²θ + 3sin θ + 1 = 0",sol:"θ = 7π/6, 3π/2, 11π/6",chk:[/3\s*π\s*\/\s*2/i,/7\s*π\s*\/\s*6/i],w:"(2sin θ + 1)(sin θ + 1) = 0 ⇒ sin θ = −½ or sin θ = −1"}]);
 const ID=R.pick([{e:"(1 − cos²θ)/(sin θ cos θ)",r:"tan θ",re:/tan/i},{e:"sec θ · sin θ · cot θ",r:"1",re:/^\s*1\s*$|=\s*1\b/},{e:"(sec²θ − 1)/tan θ",r:"tan θ",re:/tan/i},{e:"sin θ/(1 − cos²θ)",r:"csc θ",re:/csc|1\s*\/\s*sin/i}]);
 const TP=R.pick([[3,4,5],[5,12,13],[8,15,17]]); const qd=R.pick([2,3]); const [p,q,h]=TP; const cosv=qd===2?-p:-p, sinv=qd===2?q:-q; const s2=2*sinv*cosv;
 const k=R.int(1,4), lb2=R.pick([2,3,5]);
 return {title:"Symbolic manipulations",type:"Symbolic Manipulations (no calculator)",slotName:"Q4",
  stem:"<p>Directions: Answer each part. Show the work that leads to your answers. No calculator is permitted.</p>",
  parts:[
  part("A(i)",`Solve log<sub>${lb}</sub>(x) + log<sub>${lb}</sub>(x − ${m}) = ${ln_} for x.`,P("Log equation",`x = ${r1} (x = ${r2} is rejected: it is not in the domain).`,`Keeping x = ${r2}.`,[[NUM(r1,0.001),`x = ${r1}.`]]),`log<sub>${lb}</sub>(x(x − ${m})) = ${ln_} ⇒ x² − ${m}x = ${lb**ln_} ⇒ (x − ${r1})(x ${r2<0?"+ "+(-r2):"− "+r2}) = 0. Since x &gt; ${m}, <b>x = ${r1}</b>.`),
  part("A(ii)",`Solve ${B1}<sup>${e1}</sup> = ${B2}<sup>${e2}</sup> for x.`,P("Exponential equation",`x = ${frac(xs)}.`,"",[[NUM(xs,0.001),`x = ${frac(xs)}.`]]),`Write both sides with base ${base}: ${base}<sup>${a1===1?"":a1}(${e1})</sup> = ${base}<sup>${a2===1?"":a2}(${e2})</sup>. Equate exponents and solve: <b>x = ${frac(xs)}</b>.`),
  part("B(i)",`Rewrite 2log<sub>${lb2}</sub>(x) − log<sub>${lb2}</sub>(x + ${k}) + 1 as a single logarithm.`,P("Single logarithm",`log<sub>${lb2}</sub>(${lb2}x²/(x + ${k})).`,"Writing 1 as log of 1; combining subtraction as a product.",[[new RegExp(`${lb2}\\s*x`),`Include the factor ${lb2} (1 = log${lb2} ${lb2}).`]]),`2log(x) = log(x²); 1 = log<sub>${lb2}</sub>${lb2}. So the expression is <b>log<sub>${lb2}</sub>(${FR(`${lb2}x²`,`x + ${k}`)})</b>.`),
  part("B(ii)",`Solve ${TR.eq} for 0 ≤ θ &lt; 2π.`,P("Trig equation",TR.sol+".","Missing a solution; answers in degrees.",TR.chk.map(c=>[c,`All solutions: ${TR.sol}.`])),`${TR.w}. Solutions in [0, 2π): <b>${TR.sol}</b>.`),
  part("C(i)",`Rewrite ${ID.e} as a single trigonometric function or a constant.`,P("Identity",ID.r+".","",[[ID.re,`It simplifies to ${ID.r}.`]]),`Using Pythagorean and reciprocal identities, ${ID.e} = <b>${ID.r}</b>.`),
  part("C(ii)",`Angle θ is in Quadrant ${qd===2?"II":"III"} and cos θ = −${p}/${h}. Find the exact value of sin(2θ).`,P("Double angle",`sin θ = ${sinv<0?"−":""}${q}/${h}; sin 2θ = ${frac(s2/(h*h),1000)}.`,"Wrong sign for sin θ in this quadrant.",[[NUM(s2/(h*h),0.002),`sin 2θ = ${frac(s2/(h*h),1000)}.`]]),`In Quadrant ${qd===2?"II":"III"}, sin θ ${qd===2?"&gt;":"&lt;"} 0: sin θ = ${sinv<0?"−":""}${q}/${h}. sin 2θ = 2 sin θ cos θ = 2(${sinv<0?"−":""}${q}/${h})(−${p}/${h}) = <b>${frac(s2/(h*h),1000)}</b>.`)]};
});

ZX.frq.pc=Q;
})();
