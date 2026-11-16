/* AP Calculus AB/BC free-response templates (9 points each), with point-by-point rubrics.
   Template: (R,H) => {title, topic, type, stem, parts:[{id, q, pts:[point], model}]}
   point = {t, earn, not, v, need:[[check, message]], req:[[check, message]]}; check is a RegExp or a function of the answer text. */
(function(){
const {integ,root,roots,d,f3,N,FR,ig,sg,poly,tb,tbh}=ZX.H, NUM=ZX.NUM, plot=ZX.plot;
const P=(t,earn,not,need,o={})=>({t,earn,not:not||"",need:need||[],v:o.v||1,req:o.req});
const INT=[/∫|integral|fnint|int\s*\(/i,"Show the definite integral you are evaluating (with its limits)."];
const UNITS=(u)=>[new RegExp(u,"i"),`Include units (${u.replace(/\|.*/,"")}).`];
const frac=(x,md=72)=>{ if(Math.abs(x-Math.round(x))<1e-9) return N(Math.round(x)); for(let q=2;q<=md;q++){ const p=Math.round(x*q); if(Math.abs(p/q-x)<1e-9) return ZX.H.F(p,q); } return f3(x); };
const ln=Math.log, e=Math.exp, sin=Math.sin, cos=Math.cos;
const A=[], Abc=[], B=[], Bbc=[], S=[];

/* ================= Section II Part A (graphing calculator required) ================= */

/* A1. Rate in / rate out */
A.push((R)=>{
 const C=R.pick([{w:"water",u:"gallons",pl:"a storage tank",ti:"hours",inn:"is pumped into",out:"drains out of"},{w:"sand",u:"cubic yards",pl:"a stretch of beach",ti:"hours",inn:"is deposited on",out:"is washed away from"},{w:"oil",u:"barrels",pl:"a holding tank",ti:"hours",inn:"is pumped into",out:"is removed from"}]);
 const p=R.int(10,18), q=R.int(4,8), k=R.pick([8,10,12,14]), m=R.int(6,12), s=R.pick([0.5,0.75,1,1.25]), T=R.pick([6,7,8]), A0=R.int(5,20)*10;
 const rin=t=>p+q*sin(t*t/k), rout=t=>m+s*t, net=t=>rin(t)-rout(t);
 const cr=roots(net,0.001,T-0.001); if(cr.length<1||cr.length>3) return null;
 const Am=t=>A0+integ(net,0,t); const cand=[0,...cr,T].map(t=>[t,Am(t)]);
 const mn=cand.reduce((a,b)=>b[1]<a[1]?b:a), mx=cand.reduce((a,b)=>b[1]>a[1]?b:a);
 let kind,ans; if(mn[0]>0&&mn[0]<T){ kind="minimum"; ans=mn; } else if(mx[0]>0&&mx[0]<T){ kind="maximum"; ans=mx; } else return null;
 const t1=R.pick([1,2,3,4,5].filter(x=>x<T&&Math.abs(net(x))>0.3)); if(t1==null) return null;
 const In=integ(rin,0,T), AT=Am(T), inc=net(t1)>0;
 return {title:`Rate in, rate out: ${C.w}`,topic:"rates",type:"Rates of change in context (calculator)",
  stem:`<p>${C.w[0].toUpperCase()+C.w.slice(1)} ${C.inn} ${C.pl} at a rate modeled by r(t) = ${p} + ${q}sin(t²/${k}) ${C.u} per hour, and ${C.w} ${C.out} ${C.pl} at a rate modeled by D(t) = ${m} + ${s}t ${C.u} per hour, for 0 ≤ t ≤ ${T}. At time t = 0, there are ${A0} ${C.u} of ${C.w} at ${C.pl}. Time t is measured in ${C.ti}.</p>`,
  parts:[
  {id:"a",q:`How many ${C.u} of ${C.w} ${C.inn.replace("is ","are ")} ${C.pl} during the time interval 0 ≤ t ≤ ${T}?`,
   pts:[P("Integral",`Writes the definite integral ${ig(0,T)} r(t) dt.`,"An integral of r(t) − D(t); a Riemann sum; an answer with no integral shown.",[INT]),
        P("Answer",`${f3(In)} ${C.u} (correct to three decimal places).`,"An answer rounded too early, or computed with the calculator in degree mode.",[[NUM(In,0.002),`The value is about ${f3(In)}.`]])],
   model:`${ig(0,T)} r(t) dt ≈ <b>${f3(In)} ${C.u}</b>.`},
  {id:"b",q:`Is the amount of ${C.w} at ${C.pl} increasing or decreasing at time t = ${t1}? Give a reason for your answer.`,
   pts:[P("Compares rates",`Evaluates and compares r(${t1}) ≈ ${f3(rin(t1))} and D(${t1}) = ${f3(rout(t1))} (or finds r(${t1}) − D(${t1}) ≈ ${f3(net(t1))}).`,"Only one of the rates; comparing r′ and D′; no values.",[[NUM(rin(t1),0.01),`r(${t1}) ≈ ${f3(rin(t1))}.`]]),
        P("Conclusion with reason",`<b>${inc?"Increasing":"Decreasing"}</b>, because r(${t1}) ${inc?"&gt;":"&lt;"} D(${t1}).`,"A conclusion without a reason, or a reason that uses r alone.",[[inc?/increas/i:/decreas/i,`The amount is ${inc?"increasing":"decreasing"}.`]])],
   model:`r(${t1}) − D(${t1}) ≈ ${f3(rin(t1))} − ${f3(rout(t1))} = ${f3(net(t1))} ${inc?"&gt;":"&lt;"} 0, so the amount of ${C.w} is <b>${inc?"increasing":"decreasing"}</b> at t = ${t1}.`},
  {id:"c",q:`How many ${C.u} of ${C.w} are at ${C.pl} at time t = ${T}?`,
   pts:[P("Integral expression",`${A0} + ${ig(0,T)} (r(t) − D(t)) dt.`,"Leaving out the initial amount; using only r(t).",[INT,[new RegExp(String(A0)),`Include the initial ${A0} ${C.u}.`]]),
        P("Answer",`${f3(AT)} ${C.u}.`,"",[[NUM(AT,0.003),`The amount is about ${f3(AT)}.`]])],
   model:`A(${T}) = ${A0} + ${ig(0,T)} (r(t) − D(t)) dt ≈ ${A0} + (${f3(AT-A0)}) = <b>${f3(AT)} ${C.u}</b>.`},
  {id:"d",q:`For 0 ≤ t ≤ ${T}, at what time t is the amount of ${C.w} at ${C.pl} at an absolute ${kind}? Justify your answer.`,
   pts:[P("Critical points",`Sets A′(t) = r(t) − D(t) = 0 and finds t ≈ ${cr.map(f3).join(", ")}.`,"Setting r(t) = 0 or D(t) = 0; setting A(t) = 0.",[[NUM(cr[0],0.01),`r(t) = D(t) at t ≈ ${cr.map(f3).join(", ")}.`]]),
        P("Answer",`The absolute ${kind} is at <b>t ≈ ${f3(ans[0])}</b>.`,"",[[NUM(ans[0],0.01),`The ${kind} is at t ≈ ${f3(ans[0])}.`]]),
        P("Justification",`Candidates test: compares A at t = 0, the critical point${cr.length>1?"s":""} and t = ${T} (${cand.map(([t,v])=>`A(${f3(t)}) ≈ ${f3(v)}`).join("; ")}).`,"Only a local argument (sign change of A′) when there is more than one critical point; not checking the endpoints.",[[/candidate|endpoint|A\s*\(\s*0|compare|absolute/i,"Justify by comparing A at the endpoints and critical points."]])],
   model:`A′(t) = r(t) − D(t) = 0 at t ≈ ${cr.map(f3).join(", ")}.<br>${cand.map(([t,v])=>`A(${f3(t)}) ≈ ${f3(v)}`).join("<br>")}<br>The amount is an absolute ${kind} at <b>t ≈ ${f3(ans[0])}</b> ${C.ti}.`}]};
});

/* A2. Particle motion (calculator) */
A.push((R)=>{
 const a=R.pick([2,3,4]), c=R.pick([-1,-0.5,0.5,1]), g=R.pick([3,4]), T=R.pick([4,5,6]), x0=R.int(-5,5);
 const v=t=>a*sin(e(t/g))+c; const z=roots(v,0.001,T-0.001); if(z.length<1||z.length>3) return null;
 const X=t=>x0+integ(v,0,t); const cand=[0,...z,T].map(t=>[t,X(t)]);
 const lf=cand.reduce((p,q)=>q[1]<p[1]?q:p), rt=cand.reduce((p,q)=>q[1]>p[1]?q:p);
 let side,ans; if(lf[0]>0&&lf[0]<T){ side="left"; ans=lf; } else if(rt[0]>0&&rt[0]<T){ side="right"; ans=rt; } else return null;
 const t1=R.pick([1,1.5,2,2.5,3].filter(t=>Math.abs(v(t))>0.2&&Math.abs(d(v,t))>0.2)); if(t1==null) return null;
 const ac=d(v,t1), sp=v(t1)*ac>0, XT=X(T), D=integ(t=>Math.abs(v(t)),0,T,4000);
 return {title:"Particle motion",topic:"motion",type:"Particle motion (calculator)",
  stem:`<p>A particle moves along the x-axis so that its velocity at time t, for 0 ≤ t ≤ ${T}, is given by v(t) = ${a}sin(e<sup>t/${g}</sup>) ${c<0?"− "+N(-c):"+ "+N(c)}. At time t = 0, the particle is at position x = ${N(x0)}.</p>`,
  parts:[
  {id:"a",q:`Find the acceleration of the particle at time t = ${t1}. Is the speed of the particle increasing or decreasing at t = ${t1}? Give a reason.`,
   pts:[P("Acceleration",`a(${t1}) = v′(${t1}) ≈ ${f3(ac)}.`,"Giving v(t₁) instead of v′(t₁); degree mode.",[[NUM(ac,0.005),`a(${t1}) ≈ ${f3(ac)}.`]]),
        P("Speed with reason",`<b>${sp?"Increasing":"Decreasing"}</b>, because v(${t1}) ≈ ${f3(v(t1))} and a(${t1}) have ${sp?"the same sign":"opposite signs"}.`,"Using only the sign of the acceleration (that tells about velocity, not speed).",[[sp?/increas/i:/decreas/i,`Speed is ${sp?"increasing":"decreasing"}.`],[/sign|same|opposite|both/i,"Compare the signs of v and a."]])],
   model:`a(${t1}) = v′(${t1}) ≈ <b>${f3(ac)}</b>. v(${t1}) ≈ ${f3(v(t1))}. Since velocity and acceleration have ${sp?"the same sign":"opposite signs"}, the speed is <b>${sp?"increasing":"decreasing"}</b>.`},
  {id:"b",q:`Find the position of the particle at time t = ${T}.`,
   pts:[P("Integral",`x(${T}) = ${N(x0)} + ${ig(0,T)} v(t) dt.`,"Leaving out x(0).",[INT]),
        P("Answer",`${f3(XT)}.`,"",[[NUM(XT,0.003),`x(${T}) ≈ ${f3(XT)}.`]])],
   model:`x(${T}) = ${N(x0)} + ${ig(0,T)} v(t) dt ≈ ${N(x0)} + (${f3(XT-x0)}) = <b>${f3(XT)}</b>.`},
  {id:"c",q:`Find the total distance traveled by the particle over the time interval 0 ≤ t ≤ ${T}.`,
   pts:[P("Integral",`${ig(0,T)} |v(t)| dt.`,"The integral of v(t) (that is displacement).",[INT,[/\||abs/i,"Total distance uses |v(t)|."]]),
        P("Answer",`${f3(D)}.`,"",[[NUM(D,0.003),`The distance is about ${f3(D)}.`]])],
   model:`Total distance = ${ig(0,T)} |v(t)| dt ≈ <b>${f3(D)}</b>.`},
  {id:"d",q:`For 0 ≤ t ≤ ${T}, at what time is the particle farthest to the ${side}? Justify your answer.`,
   pts:[P("v(t) = 0",`v(t) = 0 at t ≈ ${z.map(f3).join(", ")}.`,"",[[NUM(z[0],0.01),`v = 0 at t ≈ ${z.map(f3).join(", ")}.`]]),
        P("Answer",`t ≈ ${f3(ans[0])}.`,"",[[NUM(ans[0],0.01),`The answer is t ≈ ${f3(ans[0])}.`]]),
        P("Justification",`Compares positions at the endpoints and where v changes sign: ${cand.map(([t,x])=>`x(${f3(t)}) ≈ ${f3(x)}`).join("; ")}.`,"Only says v changes sign, with more than one candidate; does not check endpoints.",[[/x\s*\(|position|candidate|endpoint|compare/i,"Compare the positions at all candidates."]])],
   model:`v(t) = 0 at t ≈ ${z.map(f3).join(", ")}.<br>${cand.map(([t,x])=>`x(${f3(t)}) ≈ ${f3(x)}`).join("<br>")}<br>The particle is farthest to the ${side} at <b>t ≈ ${f3(ans[0])}</b>.`}]};
});

/* A3. Area and volume */
A.push((R)=>{
 const p=R.int(3,6), c=R.pick([0.5,1,1.5]), k=R.pick([2,3]), h=R.pick([1,2]);
 const f=x=>p-(x-1)*(x-1), g=x=>c*e(x/k); const z=roots(x=>f(x)-g(x),-4,6); if(z.length!==2) return null; const [a,b]=z;
 const Ar=integ(x=>f(x)-g(x),a,b), V=Math.PI*integ(x=>(f(x)+h)**2-(g(x)+h)**2,a,b), sq=R.chance(0.5), Vc=sq?integ(x=>(f(x)-g(x))**2,a,b):Math.PI/8*integ(x=>(f(x)-g(x))**2,a,b);
 const kk=root(t=>integ(x=>f(x)-g(x),a,t)-Ar/2,a,b);
 return {title:"Area and volume",topic:"areavol",type:"Applications of integration (calculator)",
  stem:`<p>Let f(x) = ${p} − (x − 1)² and g(x) = ${c===1?"":N(c)}e<sup>x/${k}</sup>. Let R be the region enclosed by the graphs of f and g.</p>${plot({xmin:Math.floor(a)-1,xmax:Math.ceil(b)+1,ymin:-h-1,ymax:p+1,xstep:1,ystep:1,curves:[{f,lab:[1.1,p+0.3,"f"]},{f:g,col:"#b45309",lab:[Math.ceil(b)+0.2,g(Math.ceil(b))-0.6,"g"]}],shade:{f,g,a,b},text:[[(a+b)/2-0.1,(f((a+b)/2)+g((a+b)/2))/2,"R"]],lab:{x:"x",y:"y"}})}`,
  parts:[
  {id:"a",q:"Find the area of R.",
   pts:[P("Integral",`${ig("a","b")} (f(x) − g(x)) dx with a ≈ ${f3(a)}, b ≈ ${f3(b)}.`,"Wrong limits; g − f.",[INT,[NUM(a,0.01),`The curves intersect at x ≈ ${f3(a)} and x ≈ ${f3(b)}.`]]),
        P("Answer",`${f3(Ar)}.`,"",[[NUM(Ar,0.003),`The area is about ${f3(Ar)}.`]])],
   model:`f(x) = g(x) at x = a ≈ ${f3(a)} and x = b ≈ ${f3(b)}.<br>Area = ${ig("a","b")} (f(x) − g(x)) dx ≈ <b>${f3(Ar)}</b>.`},
  {id:"b",q:`Find the volume of the solid generated when R is revolved about the horizontal line y = −${h}.`,
   pts:[P("Constant and limits","π and the limits a and b.","",[[/π|pi/i,"Include π."]]),
        P("Integrand",`(f(x) + ${h})² − (g(x) + ${h})².`,"(f(x) − g(x))² (that is not a washer); radii not shifted by ${h}.",[[new RegExp(`\\+\\s*${h}`),`Shift both radii by ${h}: f(x) + ${h} and g(x) + ${h}.`]]),
        P("Answer",`${f3(V)}.`,"",[[NUM(V,Math.max(0.005,V*0.0005)),`The volume is about ${f3(V)}.`]])],
   model:`Washers with outer radius f(x) + ${h} and inner radius g(x) + ${h}:<br>V = π${ig("a","b")} [(f(x) + ${h})² − (g(x) + ${h})²] dx ≈ <b>${f3(V)}</b>.`},
  {id:"c",q:`Region R is the base of a solid. For this solid, each cross section perpendicular to the x-axis is ${sq?"a square":"a semicircle whose diameter lies in R"}. Find the volume of the solid.`,
   pts:[P("Integrand",sq?"(f(x) − g(x))².":"(π/8)(f(x) − g(x))² (area of a semicircle with diameter f − g).",sq?"":"(π/2)(f(x) − g(x))² (using the diameter as the radius).",[INT]),
        P("Answer",`${f3(Vc)}.`,"",[[NUM(Vc,Math.max(0.003,Vc*0.0005)),`The volume is about ${f3(Vc)}.`]])],
   model:`V = ${ig("a","b")} ${sq?"(f(x) − g(x))²":"(π/8)(f(x) − g(x))²"} dx ≈ <b>${f3(Vc)}</b>.`},
  {id:"d",q:"The vertical line x = k divides R into two regions with equal areas. Write, but do not solve, an equation involving one or more integrals whose solution gives the value of k.",
   pts:[P("Integral with k",`An integral of f(x) − g(x) with k as a limit, e.g. ${ig("a","k")} (f(x) − g(x)) dx.`,"Integrating with respect to y; using the wrong integrand.",[[/k/i,"Use k as a limit of integration."]]),
        P("Equation",`${ig("a","k")} (f(x) − g(x)) dx = ½ · ${f3(Ar)} (or = ${ig("k","b")} (f(x) − g(x)) dx).`,"Setting the integral equal to the whole area.",[[/=/,"Write an equation."]])],
   model:`${ig(f3(a),"k")} (f(x) − g(x)) dx = ½${ig(f3(a),f3(b))} (f(x) − g(x)) dx. (Its solution is k ≈ ${f3(kk)}.)`}]};
});

/* A4. Table data and a model */
A.push((R)=>{
 const C=R.pick([{w:"rainwater flows into a drainpipe",u:"cubic feet",ru:"cubic feet per hour",ti:"hours",tu:"hour"},{w:"vehicles enter a parking garage",u:"vehicles",ru:"vehicles per hour",ti:"hours",tu:"hour"},{w:"a factory produces bottles",u:"hundred bottles",ru:"hundred bottles per hour",ti:"hours",tu:"hour"}]);
 const a=R.int(20,40), b=R.int(8,16), cc=R.pick([2,2.5,3]); const f=t=>a+b*sin(t/cc)+t; const ts=R.pick([[0,2,5,7,10],[0,1,4,6,8],[0,3,4,7,9]]); const T=ts[ts.length-1];
 const vals=ts.map(t=>Math.round(f(t))); const i=R.int(1,ts.length-3), tm=(ts[i]+ts[i+1])/2, slope=(vals[i+1]-vals[i])/(ts[i+1]-ts[i]);
 let trap=0; for(let j=0;j<ts.length-1;j++) trap+=(vals[j]+vals[j+1])/2*(ts[j+1]-ts[j]);
 const av=integ(f,0,T)/T, t1=R.pick([1,2,3,5,6].filter(t=>t<T)), fp=d(f,t1);
 const j=R.int(0,ts.length-2), m=(vals[j+1]-vals[j])/(ts[j+1]-ts[j]);
 return {title:"Table data and a model",topic:"table",type:"Rates from a table (calculator)",
  stem:`<p>The rate at which ${C.w} is given by a differentiable function r of time t. Selected values of r(t), in ${C.ru}, are shown in the table for 0 ≤ t ≤ ${T}, where t is measured in ${C.ti}.</p>${tbh([["t (${C.ti})",...ts],["r(t)",...vals]])}`,
  parts:[
  {id:"a",q:`Use the data in the table to estimate r′(${tm}). Show the computations that lead to your answer, and indicate units of measure.`,
   pts:[P("Estimate with units",`r′(${tm}) ≈ (${vals[i+1]} − ${vals[i]})/(${ts[i+1]} − ${ts[i]}) = ${frac(slope)} ${C.ru} per ${C.tu}.`,"Using points that do not surround t = "+tm+"; no units.",[[NUM(slope,0.01),`The estimate is ${frac(slope)}.`],[/per|\/\s*h|hour/i,`Units: ${C.ru} per ${C.tu}.`]])],
   model:`r′(${tm}) ≈ [r(${ts[i+1]}) − r(${ts[i]})]/(${ts[i+1]} − ${ts[i]}) = (${vals[i+1]} − ${vals[i]})/${ts[i+1]-ts[i]} = <b>${frac(slope)} ${C.ru} per ${C.tu}</b>.`},
  {id:"b",q:`Use a trapezoidal sum with the four subintervals indicated by the data in the table to approximate ${ig(0,T)} r(t) dt. Using correct units, explain the meaning of ${ig(0,T)} r(t) dt in the context of the problem.`,
   pts:[P("Trapezoidal sum",`${ts.slice(0,-1).map((t,k)=>`½(${vals[k]} + ${vals[k+1]})(${ts[k+1]-t})`).join(" + ")} = ${frac(trap)}.`,"A Riemann sum that is not trapezoidal; unequal widths ignored.",[[NUM(trap,0.01),`The trapezoidal sum is ${frac(trap)}.`]]),
        P("Meaning with units",`The total amount (${C.u}) over 0 ≤ t ≤ ${T} ${C.ti}, i.e., the total ${C.u} during that interval.`,"Describing a rate or an average; no units; no time interval.",[[new RegExp(C.u.split(" ").pop(),"i"),`Use the units ${C.u}.`],[/total|amount|number/i,"Say it is the total amount over the interval."]])],
   model:`Trapezoidal sum = ${ts.slice(0,-1).map((t,k)=>`½(${vals[k]} + ${vals[k+1]})(${ts[k+1]-t})`).join(" + ")} = <b>${frac(trap)}</b>.<br>${ig(0,T)} r(t) dt is the total number of ${C.u} (from ${C.w.split(" ").slice(0,1)} …) during the ${T} ${C.ti} from t = 0 to t = ${T}.`},
  {id:"c",q:`Must there be a time t, ${ts[j]} &lt; t &lt; ${ts[j+1]}, at which r′(t) = ${frac(m)}? Justify your answer.`,
   pts:[P("Average rate",`(r(${ts[j+1]}) − r(${ts[j]}))/(${ts[j+1]} − ${ts[j]}) = ${frac(m)}.`,"",[[NUM(m,0.01),`The average rate of change is ${frac(m)}.`]]),
        P("Conclusion with MVT",`<b>Yes.</b> r is differentiable (so continuous) on the interval, so by the <b>Mean Value Theorem</b> there is such a t.`,"Citing the IVT; not stating that r is differentiable/continuous.",[[/mean value|mvt/i,"Name the Mean Value Theorem."],[/differentiab|continu/i,"State the hypothesis: r is differentiable."]])],
   model:`r is differentiable, hence continuous, on [${ts[j]}, ${ts[j+1]}]. [r(${ts[j+1]}) − r(${ts[j]})]/(${ts[j+1]} − ${ts[j]}) = ${frac(m)}. By the Mean Value Theorem, <b>yes</b>, there is a t in (${ts[j]}, ${ts[j+1]}) with r′(t) = ${frac(m)}.`},
  {id:"d",q:`The rate is modeled by f(t) = ${a} + ${b}sin(t/${cc}) + t. Using this model, find the average rate over 0 ≤ t ≤ ${T}.`,
   pts:[P("Average value integral",`${FR(1,T)} ${ig(0,T)} f(t) dt.`,"[f(T) − f(0)]/T (average rate of change of f).",[INT]),
        P("Answer",`${f3(av)} ${C.ru}.`,"",[[NUM(av,0.003),`The average is about ${f3(av)}.`]])],
   model:`Average = ${FR(1,T)}${ig(0,T)} f(t) dt ≈ <b>${f3(av)} ${C.ru}</b>.`},
  {id:"e",q:`Using the model, find f′(${t1}). Interpret your answer in the context of the problem.`,
   pts:[P("Value",`f′(${t1}) ≈ ${f3(fp)}.`,"",[[NUM(fp,0.005),`f′(${t1}) ≈ ${f3(fp)}.`]]),
        P("Interpretation",`At t = ${t1} ${C.ti}, the rate is ${fp>0?"increasing":"decreasing"} at ${f3(Math.abs(fp))} ${C.ru} per ${C.tu}.`,"Interpreting it as the amount, or no units.",[[/increas|decreas|chang/i,"Say how the rate is changing, with units."]])],
   model:`f′(${t1}) ≈ <b>${f3(fp)}</b>. At time t = ${t1}, the rate is ${fp>0?"increasing":"decreasing"} at ${f3(Math.abs(fp))} ${C.ru} per ${C.tu}.`}]};
});

/* BC A5. Parametric / vector motion */
Abc.push((R)=>{
 const a=R.pick([2,3]), b=R.pick([0.5,1,1.5]), x0=R.int(-3,3), y0=R.int(0,4), T=R.pick([3,4]);
 const xp=t=>a*cos(t)+b, yp=t=>t*e(-t/3)+0.5; const t1=R.pick([1,1.5,2]); const zx=roots(xp,0.001,T-0.001); if(zx.length<1) return null;
 const spd=Math.hypot(xp(t1),yp(t1)), ax=d(xp,t1), ay=d(yp,t1), sl=yp(t1)/xp(t1), Lg=integ(t=>Math.hypot(xp(t),yp(t)),0,T), YT=y0+integ(yp,0,T);
 return {title:"Motion in the plane",topic:"param",type:"Parametric and vector motion (calculator)",
  stem:`<p>A particle moving in the xy-plane has position (x(t), y(t)) at time t, where dx/dt = ${a}cos t + ${N(b)} and dy/dt = te<sup>−t/3</sup> + 0.5. At time t = 0, the particle is at (${N(x0)}, ${N(y0)}).</p>`,
  parts:[
  {id:"a",q:`Find the speed of the particle at time t = ${t1}, and find the acceleration vector of the particle at time t = ${t1}.`,
   pts:[P("Speed",`√(x′(${t1})² + y′(${t1})²) ≈ ${f3(spd)}.`,"",[[NUM(spd,0.005),`The speed is about ${f3(spd)}.`]]),
        P("Acceleration vector",`⟨${f3(ax)}, ${f3(ay)}⟩.`,"",[[NUM(ax,0.005),`x″(${t1}) ≈ ${f3(ax)}.`]])],
   model:`Speed = √((${f3(xp(t1))})² + (${f3(yp(t1))})²) ≈ <b>${f3(spd)}</b>. Acceleration = ⟨x″(${t1}), y″(${t1})⟩ ≈ <b>⟨${f3(ax)}, ${f3(ay)}⟩</b>.`},
  {id:"b",q:`Find the slope of the line tangent to the path of the particle at time t = ${t1}.`,
   pts:[P("Slope",`dy/dx = (dy/dt)/(dx/dt) ≈ ${f3(sl)}.`,"(dx/dt)/(dy/dt).",[[NUM(sl,0.005),`The slope is about ${f3(sl)}.`]])],
   model:`dy/dx = y′(${t1})/x′(${t1}) ≈ ${f3(yp(t1))}/${f3(xp(t1))} ≈ <b>${f3(sl)}</b>.`},
  {id:"c",q:`Find the total distance traveled by the particle over the time interval 0 ≤ t ≤ ${T}.`,
   pts:[P("Integral",`${ig(0,T)} √((dx/dt)² + (dy/dt)²) dt.`,"",[INT]),P("Answer",`${f3(Lg)}.`,"",[[NUM(Lg,0.003),`About ${f3(Lg)}.`]])],
   model:`${ig(0,T)} √((dx/dt)² + (dy/dt)²) dt ≈ <b>${f3(Lg)}</b>.`},
  {id:"d",q:`Find the y-coordinate of the particle's position at time t = ${T}.`,
   pts:[P("Integral",`${N(y0)} + ${ig(0,T)} dy/dt dt.`,"Leaving out y(0).",[INT]),P("Answer",`${f3(YT)}.`,"",[[NUM(YT,0.003),`About ${f3(YT)}.`]])],
   model:`y(${T}) = ${N(y0)} + ${ig(0,T)} (te<sup>−t/3</sup> + 0.5) dt ≈ <b>${f3(YT)}</b>.`},
  {id:"e",q:`Find the first time t, 0 &lt; t &lt; ${T}, at which the line tangent to the path of the particle is vertical.`,
   pts:[P("Condition",`dx/dt = 0 with dy/dt ≠ 0.`,"Setting dy/dt = 0 (that gives a horizontal tangent).",[[/dx\/dt|x′|x'/i,"Set dx/dt = 0."]]),P("Answer",`t ≈ ${f3(zx[0])}.`,"",[[NUM(zx[0],0.005),`t ≈ ${f3(zx[0])}.`]])],
   model:`Vertical tangent where dx/dt = ${a}cos t + ${N(b)} = 0 and dy/dt ≠ 0 (dy/dt &gt; 0 always): <b>t ≈ ${f3(zx[0])}</b>.`}]};
});

/* BC A6. Polar area */
Abc.push((R)=>{
 const a=R.pick([3,4]), b=R.pick([1,2]), cc=a; const r=t=>a+b*sin(t);
 const A1=0.5*integ(t=>r(t)**2,0,Math.PI); const th1=R.pick([Math.PI/3,Math.PI/4,2*Math.PI/3]), thn={[Math.PI/3]:"π/3",[Math.PI/4]:"π/4",[2*Math.PI/3]:"2π/3"}[th1];
 const dr=b*cos(th1); const Aout=0.5*integ(t=>r(t)**2-cc*cc,0,Math.PI);
 const yth=t=>r(t)*sin(t), dy=d(yth,th1);
 return {title:"Polar curve",topic:"polar",type:"Polar curves (calculator)",
  stem:`<p>The curve shown is the graph of the polar equation r = ${a} + ${b===1?"":b}sin θ for 0 ≤ θ ≤ 2π, together with the circle r = ${cc}.</p>${plot({xmin:-a-b-1,xmax:a+b+1,ymin:-a+b-1-1,ymax:a+b+1,xstep:1,ystep:1,curves:[{pts:[...Array(241)].map((_,i)=>{ const t=i/240*2*Math.PI; return [r(t)*cos(t),r(t)*sin(t)]; })},{pts:[...Array(121)].map((_,i)=>{ const t=i/120*2*Math.PI; return [cc*cos(t),cc*sin(t)]; }),col:"#b45309",dash:1}],lab:{x:"x",y:"y"}})}`,
  parts:[
  {id:"a",q:"Find the area of the region bounded by the curve and the x-axis for 0 ≤ θ ≤ π.",
   pts:[P("Integral",`½∫<sub>0</sub><sup>π</sup> (${a} + ${b===1?"":b}sin θ)² dθ.`,"Missing ½; integrating r instead of r².",[INT,[/½|1\/2|0?\.5/,"Polar area has the factor ½."]]),P("Answer",`${f3(A1)}.`,"",[[NUM(A1,0.003),`About ${f3(A1)}.`]])],
   model:`½∫<sub>0</sub><sup>π</sup> r² dθ ≈ <b>${f3(A1)}</b>.`},
  {id:"b",q:`Find dr/dθ at θ = ${thn}. Explain what your answer means about the motion of a point on the curve.`,
   pts:[P("Value",`dr/dθ = ${b===1?"":b}cos θ = ${f3(dr)}.`,"",[[NUM(dr,0.005),`dr/dθ ≈ ${f3(dr)}.`]]),
        P("Meaning",`Since dr/dθ ${dr>0?"&gt;":"&lt;"} 0, the point is moving <b>${dr>0?"away from":"toward"}</b> the origin.`,"Interpreting it as a slope.",[[dr>0?/away/i:/toward/i,`It moves ${dr>0?"away from":"toward"} the origin.`]])],
   model:`dr/dθ = ${b===1?"":b}cos θ; at θ = ${thn}, dr/dθ = <b>${f3(dr)}</b>. Since r &gt; 0 and dr/dθ ${dr>0?"&gt;":"&lt;"} 0, the point is moving ${dr>0?"away from":"toward"} the origin.`},
  {id:"c",q:`Find the area of the region inside the curve r = ${a} + ${b===1?"":b}sin θ and outside the circle r = ${cc}.`,
   pts:[P("Limits",`The curves meet where sin θ = 0: θ = 0 and θ = π.`,"",[[/π|pi|3\.14/i,"The limits are θ = 0 and θ = π."]]),
        P("Integrand",`½∫ [(${a} + ${b===1?"":b}sin θ)² − ${cc}²] dθ.`,"(r − ${cc})².",[INT]),
        P("Answer",`${f3(Aout)}.`,"",[[NUM(Aout,0.003),`About ${f3(Aout)}.`]])],
   model:`r = ${cc} when sin θ = 0: θ = 0 and π. Area = ½∫<sub>0</sub><sup>π</sup> [(${a} + ${b===1?"":b}sin θ)² − ${cc*cc}] dθ ≈ <b>${f3(Aout)}</b>.`},
  {id:"d",q:`For the curve r = ${a} + ${b===1?"":b}sin θ, find dy/dθ at θ = ${thn}. Is the point moving up or down at that instant?`,
   pts:[P("dy/dθ",`y = r sin θ; dy/dθ ≈ ${f3(dy)}.`,"",[[NUM(dy,0.01),`dy/dθ ≈ ${f3(dy)}.`]]),P("Direction",`${dy>0?"Up":"Down"}, because dy/dθ ${dy>0?"&gt;":"&lt;"} 0.`,"",[[dy>0?/up/i:/down/i,`It moves ${dy>0?"up":"down"}.`]])],
   model:`y = r sin θ = (${a} + ${b===1?"":b}sin θ)sin θ, so dy/dθ ≈ <b>${f3(dy)}</b> at θ = ${thn}. The point is moving <b>${dy>0?"up":"down"}</b>.`}]};
});

/* ================= Section II Part B (no calculator) ================= */

/* B1. Graph of f; g defined by an integral */
B.push((R)=>{
 const xs=[-4,-3,-2,-1,0,1,2,3,4]; let ys; let ok=false;
 for(let tr=0;tr<60&&!ok;tr++){ ys=[R.int(-2,2)]; for(let i=1;i<9;i++) ys.push(Math.max(-3,Math.min(3,ys[i-1]+R.pick([-2,-1,-1,0,1,1,2]))));
  for(let i=0;i<8;i++) if(ys[i]*ys[i+1]<0){ if(Math.abs(ys[i])<=Math.abs(ys[i+1])) ys[i]=0; else ys[i+1]=0; }
  const sc=[]; for(let i=1;i<8;i++){ const L=ys.slice(0,i).reverse().find(v=>v!==0), Rr=ys.slice(i+1).find(v=>v!==0); if(ys[i]===0&&L&&Rr&&L*Rr<0) sc.push(i); }
  ok=sc.length>=1&&sc.length<=3&&ys.some(v=>v>0)&&ys.some(v=>v<0); }
 if(!ok) return null;
 const k=R.int(-3,5);
 const Iseg=(i)=>(ys[i]+ys[i+1])/2; const G=x=>{ let s=0; if(x>=0) for(let i=4;i<4+x;i++) s+=Iseg(i); else for(let i=4+x;i<4;i++) s-=Iseg(i); return k+s; };
 const fAt=x=>{ const i=Math.floor(x)+4; return ys[i]+(ys[i+1]-ys[i])*(x-Math.floor(x)); };
 const x1=R.pick([2,3,4]), x2=R.pick([-2,-3,-4]); const c=R.pick([-3.5,-2.5,-1.5,0.5,1.5,2.5,3.5]); const ci=Math.floor(c)+4, slope=ys[ci+1]-ys[ci];
 const sc=[]; for(let i=1;i<8;i++){ if(ys[i]!==0) continue; const L=ys.slice(0,i).reverse().find(v=>v!==0), Rr=ys.slice(i+1).find(v=>v!==0); if(L&&Rr&&L*Rr<0) sc.push([xs[i],L>0?"max":"min"]); }
 const want=sc.some(s=>s[1]==="max")?"maximum":"minimum", ex=sc.filter(s=>s[1]===(want==="maximum"?"max":"min")).map(s=>s[0]);
 const cand=[-4,...sc.map(s=>s[0]),4].map(x=>[x,G(x)]), best=cand.reduce((a,b)=>b[1]>a[1]?b:a);
 return {title:"Graph of f and an accumulation function",topic:"graph",type:"Graphical analysis (no calculator)",
  stem:`<p>The continuous function f is defined on the closed interval −4 ≤ x ≤ 4. The graph of f, consisting of line segments, is shown. Let g be the function defined by g(x) = ${N(k)} + ${ig(0,"x")} f(t) dt.</p>${plot({xmin:-4,xmax:4,ymin:-3.5,ymax:3.5,xstep:1,ystep:1,curves:[{pts:xs.map((x,i)=>[x,ys[i]])}],dots:xs.map((x,i)=>[x,ys[i]]),lab:{x:"x",y:"y"},cap:"Graph of f"})}`,
  parts:[
  {id:"a",q:`Find g(${x1}) and g(${x2}).`,
   pts:[P(`g(${x1})`,`g(${x1}) = ${N(k)} + ${ig(0,x1)} f(t) dt = ${frac(G(x1))}.`,"Adding areas below the axis as positive.",[[NUM(G(x1),0.01),`g(${x1}) = ${frac(G(x1))}.`]]),
        P(`g(${x2})`,`g(${x2}) = ${N(k)} − ${ig(x2,0)} f(t) dt = ${frac(G(x2))}.`,"Forgetting that integrating from 0 down to a negative x reverses the sign.",[[NUM(G(x2),0.01),`g(${x2}) = ${frac(G(x2))}.`]])],
   model:`Using areas of triangles and trapezoids (area below the axis counts as negative):<br>g(${x1}) = ${N(k)} + ${ig(0,x1)} f(t) dt = <b>${frac(G(x1))}</b>.<br>g(${x2}) = ${N(k)} + ${ig(0,x2)} f(t) dt = ${N(k)} − ${ig(x2,0)} f(t) dt = <b>${frac(G(x2))}</b>.`},
  {id:"b",q:`Find g′(${c}) and g″(${c}).`,
   pts:[P("g′",`g′(${c}) = f(${c}) = ${frac(fAt(c))}.`,"",[[NUM(fAt(c),0.01),`g′(${c}) = ${frac(fAt(c))}.`]]),
        P("g″",`g″(${c}) = f′(${c}) = slope of the segment = ${N(slope)}.`,"",[[NUM(slope,0.01),`g″(${c}) = ${N(slope)}.`]])],
   model:`By the Fundamental Theorem of Calculus, g′(x) = f(x), so g′(${c}) = f(${c}) = <b>${frac(fAt(c))}</b>. g″(x) = f′(x), the slope of the segment containing x = ${c}: g″(${c}) = <b>${N(slope)}</b>.`},
  {id:"c",q:`On the open interval −4 &lt; x &lt; 4, find all values of x at which g has a relative ${want}. Justify your answer.`,
   pts:[P("Answer",`x = ${ex.join(" and x = ")}.`,"Listing every zero of f, including ones where f does not change sign.",[[NUM(ex[0],0.01),`x = ${ex.join(", ")}.`]]),
        P("Justification",`g′(x) = f(x) changes from ${want==="maximum"?"positive to negative":"negative to positive"} there.`,"Saying “f = 0” only, or reasoning from f increasing/decreasing.",[[/chang|sign|positive|negative/i,"Justify with a sign change of g′ = f."]])],
   model:`g′(x) = f(x). f changes from ${want==="maximum"?"positive to negative":"negative to positive"} at x = ${ex.join(" and x = ")}, so g has a relative ${want} there: <b>x = ${ex.join(", ")}</b>.`},
  {id:"d",q:"Find the absolute maximum value of g on the closed interval −4 ≤ x ≤ 4. Justify your answer.",
   pts:[P("Candidates",`Considers the endpoints and the points where f changes sign: x = ${cand.map(c=>c[0]).join(", ")}.`,"Not checking the endpoints.",[[/−\s*4|-\s*4|endpoint|candidate/i,"Check the endpoints too."]]),
        P("Values",cand.map(([x,v])=>`g(${x}) = ${frac(v)}`).join("; ")+".","",[]),
        P("Answer",`The absolute maximum value is <b>${frac(best[1])}</b> (at x = ${best[0]}).`,"Giving the x-value instead of the maximum value.",[[NUM(best[1],0.01),`The maximum value is ${frac(best[1])}.`]])],
   model:`Candidates: endpoints and where g′ = f changes sign.<br>${cand.map(([x,v])=>`g(${x}) = ${frac(v)}`).join("<br>")}<br>The absolute maximum value of g is <b>${frac(best[1])}</b>, at x = ${best[0]}.`}]};
});

/* B2. Table: Riemann sum, MVT, IVT */
B.push((R)=>{
 const C=R.pick([{who:"A runner",u:"meters",vu:"meters per second",ti:"seconds",v:"velocity v(t)"},{who:"A cyclist",u:"meters",vu:"meters per second",ti:"seconds",v:"velocity v(t)"},{who:"A train",u:"miles",vu:"miles per hour",ti:"hours",v:"velocity v(t)"}]);
 const ts=R.pick([[0,10,20,30,40],[0,5,15,20,30],[0,4,10,16,20],[0,2,6,8,12]]); const T=ts[4];
 let vs; for(let tr=0;tr<50;tr++){ vs=[R.int(2,6)]; for(let i=1;i<5;i++) vs.push(Math.max(1,vs[i-1]+R.int(-3,4))); if(new Set(vs).size>=4) break; }
 const i=R.int(0,2), tm=(ts[i]+ts[i+1])/2, sl=(vs[i+1]-vs[i])/(ts[i+1]-ts[i]);
 let RS=0; for(let j=0;j<4;j++) RS+=vs[j+1]*(ts[j+1]-ts[j]);
 let j=R.int(0,3); const mv=(vs[j+1]-vs[j])/(ts[j+1]-ts[j]);
 let k=-1; for(const q of R.shuffle([0,1,2,3])) if(Math.abs(vs[q+1]-vs[q])>=2){ k=q; break; } if(k<0) return null;
 const lo=Math.min(vs[k],vs[k+1]), hi=Math.max(vs[k],vs[k+1]); const target=R.int(lo+1,hi-1);
 return {title:"Velocity from a table",topic:"table",type:"Tabular data (no calculator)",
  stem:`<p>${C.who} moves along a straight path. The ${C.v}, in ${C.vu}, is a differentiable function of time t, measured in ${C.ti}. Selected values of v(t) are given in the table.</p>${tbh([["t ("+C.ti+")",...ts],["v(t)",...vs]])}`,
  parts:[
  {id:"a",q:`Use the data in the table to estimate v′(${tm}). Show the computations that lead to your answer. Indicate units of measure.`,
   pts:[P("Estimate with units",`(${vs[i+1]} − ${vs[i]})/(${ts[i+1]} − ${ts[i]}) = ${frac(sl)} ${C.vu} per ${C.ti.replace(/s$/,"")}.`,"Wrong pair of points; no units.",[[NUM(sl,0.01),`The estimate is ${frac(sl)}.`],[/per|\/\s*s|\/\s*h/i,"Include units."]])],
   model:`v′(${tm}) ≈ (${vs[i+1]} − ${vs[i]})/(${ts[i+1]} − ${ts[i]}) = <b>${frac(sl)} ${C.vu} per ${C.ti.replace(/s$/,"")}</b>.`},
  {id:"b",q:`Using correct units, explain the meaning of ${ig(0,T)} v(t) dt in the context of the problem. Approximate ${ig(0,T)} v(t) dt using a right Riemann sum with the four subintervals indicated in the table.`,
   pts:[P("Meaning",`The distance (displacement) traveled, in ${C.u}, from t = 0 to t = ${T} ${C.ti}.`,"A velocity or an average; no units.",[[new RegExp(C.u,"i"),`Use the units ${C.u}.`],[/distance|displacement|travel/i,"Say it is the distance traveled."]]),
        P("Riemann sum setup",`${ts.slice(1).map((t,q)=>`${vs[q+1]}(${t-ts[q]})`).join(" + ")}.`,"Using left endpoints; treating the widths as equal.",[]),
        P("Value",`${frac(RS)} ${C.u}.`,"",[[NUM(RS,0.01),`The sum is ${frac(RS)}.`]])],
   model:`${ig(0,T)} v(t) dt is the distance, in ${C.u}, traveled during 0 ≤ t ≤ ${T} ${C.ti} (v &gt; 0).<br>Right Riemann sum = ${ts.slice(1).map((t,q)=>`${vs[q+1]}(${t-ts[q]})`).join(" + ")} = <b>${frac(RS)} ${C.u}</b>.`},
  {id:"c",q:`Must there be a time t, ${ts[j]} &lt; t &lt; ${ts[j+1]}, at which v′(t) = ${frac(mv)}? Justify your answer.`,
   pts:[P("Average rate",`(v(${ts[j+1]}) − v(${ts[j]}))/(${ts[j+1]} − ${ts[j]}) = ${frac(mv)}.`,"",[[NUM(mv,0.01),`The difference quotient is ${frac(mv)}.`]]),
        P("Conclusion with MVT","Yes: v is differentiable (hence continuous), so by the Mean Value Theorem there is such a time.","Citing the IVT; no hypothesis.",[[/mean value|mvt/i,"Name the Mean Value Theorem."],[/differentiab|continu/i,"State that v is differentiable."]])],
   model:`v is differentiable, so it is continuous on [${ts[j]}, ${ts[j+1]}] and differentiable on (${ts[j]}, ${ts[j+1]}). (v(${ts[j+1]}) − v(${ts[j]}))/(${ts[j+1]} − ${ts[j]}) = ${frac(mv)}, so by the Mean Value Theorem, <b>yes</b>.`},
  {id:"d",q:`Must there be a time t, ${ts[k]} &lt; t &lt; ${ts[k+1]}, at which v(t) = ${target}? Justify your answer.`,
   pts:[P("Hypothesis","v is differentiable, so v is continuous on the interval.","",[[/continu|differentiab/i,"State that v is continuous."]]),
        P("Conclusion with IVT",`${target} is between v(${ts[k]}) = ${vs[k]} and v(${ts[k+1]}) = ${vs[k+1]}, so by the Intermediate Value Theorem, yes.`,"Citing the MVT.",[[/intermediate|ivt/i,"Name the Intermediate Value Theorem."]])],
   model:`v is continuous (it is differentiable) and v(${ts[k]}) = ${vs[k]}, v(${ts[k+1]}) = ${vs[k+1]}. Since ${target} is between them, by the Intermediate Value Theorem <b>yes</b>, v(t) = ${target} for some t in (${ts[k]}, ${ts[k+1]}).`},
  {id:"e",q:`Use your answer from part (b) to approximate the average velocity over 0 ≤ t ≤ ${T}.`,
   pts:[P("Average velocity",`${FR(1,T)} · ${frac(RS)} = ${frac(RS/T)} ${C.vu}.`,"",[[NUM(RS/T,0.01),`The approximation is ${frac(RS/T)}.`]])],
   model:`Average velocity ≈ ${FR(1,T)}${ig(0,T)} v(t) dt ≈ ${frac(RS)}/${T} = <b>${frac(RS/T)} ${C.vu}</b>.`}]};
});

/* B3. Implicit differentiation */
B.push((R)=>{
 const b=R.pick([1,-1]), k=R.pick([1,2]), c=3*k*k; const pts=b===1?[[k,k],[-k,2*k],[2*k,-k]]:[[k,-k],[k,2*k],[2*k,k]];
 const [x0,y0]=R.pick(pts); const den=b*x0+2*y0; if(den===0) return null; const m=-(2*x0+b*y0)/den;
 const hz=b===1?[[k,-2*k],[-k,2*k]]:[[k,2*k],[-k,-2*k]], vt=b===1?[[-2*k,k],[2*k,-k]]:[[2*k,k],[-2*k,-k]];
 const xy=b===1?"+ xy":"− xy", fmt=p=>`(${N(p[0])}, ${N(p[1])})`;
 return {title:"Implicitly defined curve",topic:"implicit",type:"Implicit differentiation (no calculator)",
  stem:`<p>Consider the curve given by x² ${xy} + y² = ${c}.</p>`,
  parts:[
  {id:"a",q:`Show that dy/dx = ${FR(`−(2x ${b===1?"+":"−"} y)`,`${b===1?"x":"−x"} + 2y`)}.`,
   pts:[P("Implicit differentiation",`2x ${b===1?"+":"−"} (y + x dy/dx) + 2y dy/dx = 0 (product rule on xy).`,"Treating y as a constant; missing the product rule.",[[/dy\/dx|y′|y'/i,"Differentiate implicitly, with dy/dx terms."]]),
        P("Solves for dy/dx",`Collects the dy/dx terms and solves to get the given expression.`,"Working backward from the answer.",[])],
   model:`d/dx: 2x ${b===1?"+":"−"} (1·y + x·dy/dx) + 2y·dy/dx = 0.<br>dy/dx(${b===1?"x":"−x"} + 2y) = −(2x ${b===1?"+":"−"} y), so dy/dx = −(2x ${b===1?"+":"−"} y)/(${b===1?"x":"−x"} + 2y).`},
  {id:"b",q:`Verify that the point ${fmt([x0,y0])} is on the curve, and write an equation for the line tangent to the curve at that point.`,
   pts:[P("Slope",`dy/dx at ${fmt([x0,y0])} = ${frac(m)}.`,"",[[NUM(m,0.01),`The slope is ${frac(m)}.`]]),
        P("Tangent line",`y − ${N(y0)} = ${frac(m)}(x − ${N(x0)}).`,"Using the point incorrectly.",[[/y\s*[−-]|y\s*=/i,"Write the equation of the line."]])],
   model:`${N(x0)}² ${b===1?"+":"−"} (${N(x0)})(${N(y0)}) + (${N(y0)})² = ${c} ✓. Slope = −(2(${N(x0)}) ${b===1?"+":"−"} (${N(y0)}))/(${b===1?"":"−"}(${N(x0)}) + 2(${N(y0)})) = <b>${frac(m)}</b>.<br>Tangent line: <b>y − ${N(y0)} = ${frac(m)}(x − ${N(x0)})</b>.`},
  {id:"c",q:"Find the coordinates of all points on the curve at which the line tangent to the curve is horizontal.",
   pts:[P("Numerator = 0",`2x ${b===1?"+":"−"} y = 0, so y = ${b===1?"−2x":"2x"}.`,"Setting the denominator to 0.",[[/2x|y\s*=\s*[−-]?\s*2x/i,"Set the numerator equal to 0."]]),
        P("Substitutes",`x² ${b===1?"+":"−"} x(${b===1?"−2x":"2x"}) + 4x² = ${c} ⇒ 3x² = ${c} ⇒ x = ±${k}.`,"",[]),
        P("Points",`${hz.map(fmt).join(" and ")}.`,"Only one point; not checking that the denominator is nonzero.",[[NUM(hz[0][1],0.01),`The points are ${hz.map(fmt).join(" and ")}.`]])],
   model:`Horizontal tangent: dy/dx = 0 ⇒ 2x ${b===1?"+":"−"} y = 0 ⇒ y = ${b===1?"−2x":"2x"}. Substituting: x² ${b===1?"− 2x²":"− 2x²"} + 4x² = 3x² = ${c}, so x = ±${k}. Points: <b>${hz.map(fmt).join(" and ")}</b> (the denominator is not 0 there).`},
  {id:"d",q:"Find the coordinates of all points on the curve at which the line tangent to the curve is vertical.",
   pts:[P("Denominator = 0",`${b===1?"x":"−x"} + 2y = 0, so x = ${b===1?"−2y":"2y"}; substituting gives 3y² = ${c}, y = ±${k}.`,"",[[/2y/i,"Set the denominator equal to 0."]]),
        P("Points",`${vt.map(fmt).join(" and ")}.`,"",[[NUM(vt[0][0],0.01),`The points are ${vt.map(fmt).join(" and ")}.`]])],
   model:`Vertical tangent: denominator 0 ⇒ x = ${b===1?"−2y":"2y"}. Then 4y² ${b===1?"− 2y²":"− 2y²"} + y² = 3y² = ${c}, y = ±${k}. Points: <b>${vt.map(fmt).join(" and ")}</b>.`}]};
});

/* B4. Separable differential equation */
B.push((R)=>{
 const fam=R.pick([1,2]);
 if(fam===1){ const m=R.pick([1,2,-1]), c=R.int(1,4), y0=c+R.pick([1,2,3,-1,-2]); const x1=1, y1=c+(y0-c)*0;
  const slope0=0; const yx=x=>c+(y0-c)*e(m*x*x/2); const dydx=(x,y)=>m*x*(y-c);
  const xp=R.pick([1,2]), yp=c+R.pick([1,2,-1]); const s=dydx(xp,yp), s2=m*(yp-c)*(1+m*xp*xp);
  const a1=xp, ya=yp;
  return {title:"Separable differential equation",topic:"de",type:"Differential equations (no calculator)",
   stem:`<p>Consider the differential equation dy/dx = ${m===1?"":m===-1?"−":m}x(y − ${c}).</p>`,
   parts:[
   {id:"a",q:`Find d²y/dx² in terms of x and y. Is the graph of a solution curve concave up or concave down at the point (${xp}, ${yp})? Explain.`,
    pts:[P("Second derivative",`d²y/dx² = ${m===1?"":m===-1?"−":m}(y − ${c}) + ${m===1?"":m===-1?"−":m}x·dy/dx = ${m===1?"":m===-1?"−":m}(y − ${c})(1 + ${m===1?"":m===-1?"−":m}x²).`,"Differentiating x(y − c) as if y were constant.",[[/dy\/dx|y′|y'/i,"Use the product rule with dy/dx."]]),
         P("Concavity",`At (${xp}, ${yp}): d²y/dx² = ${N(s2)} ${s2>0?"&gt;":"&lt;"} 0, so <b>concave ${s2>0?"up":"down"}</b>.`,"",[[s2>0?/up/i:/down/i,`Concave ${s2>0?"up":"down"}.`]])],
    model:`d²y/dx² = d/dx[${m===1?"":m===-1?"−":m}x(y − ${c})] = ${m===1?"":m===-1?"−":m}(y − ${c}) + ${m===1?"":m===-1?"−":m}x·dy/dx.<br>At (${xp}, ${yp}): dy/dx = ${N(s)}, so d²y/dx² = ${N(m*(yp-c))} + ${N(m*xp)}(${N(s)}) = <b>${N(s2)}</b>, so the curve is <b>concave ${s2>0?"up":"down"}</b>.`},
   {id:"b",q:`Let y = f(x) be the particular solution with f(0) = ${y0}. Write an equation for the line tangent to the graph of f at x = 0, and use it to approximate f(0.5).`,
    pts:[P("Tangent line",`dy/dx at (0, ${y0}) = 0, so the tangent line is y = ${y0}.`,"",[[new RegExp(`y\\s*=\\s*${y0}`),`The tangent line is y = ${y0}.`]]),
         P("Approximation",`f(0.5) ≈ ${y0}.`,"",[[NUM(y0,0.01),`f(0.5) ≈ ${y0}.`]])],
    model:`At (0, ${y0}): dy/dx = ${m===1?"":m}(0)(${y0} − ${c}) = 0. Tangent line: <b>y = ${y0}</b>, so f(0.5) ≈ <b>${y0}</b>.`},
   {id:"c",q:`Find the particular solution y = f(x) to the differential equation with the initial condition f(0) = ${y0}.`,
    pts:[P("Separates variables",`dy/(y − ${c}) = ${m===1?"":m===-1?"−":m}x dx.`,"",[[/dy|d\s*y/i,"Separate the variables."]]),
         P("Antiderivatives",`ln|y − ${c}| = ${m===1?"":m===-1?"−":FR(m,2)}${m===1||m===-1?"x²/2":"x²"} + C.`,"",[[/ln/i,"Integrate: ln|y − "+c+"|."]]),
         P("Constant of integration","Includes + C.","",[[/\+\s*c|\bc\b/i,"Include the constant of integration."]]),
         P("Uses the initial condition",`ln|${y0} − ${c}| = C.`,"",[]),
         P("Solves for y",`y = ${c} ${y0-c>0?"+":"−"} ${Math.abs(y0-c)===1?"":Math.abs(y0-c)}e<sup>${m===1?"":m===-1?"−":m}x²/2</sup>.`,"",[[/e\s*\^|e<sup>|e\(|exp/i,"Solve for y explicitly."]])],
    model:`dy/(y − ${c}) = ${m===1?"":m===-1?"−":m}x dx ⇒ ln|y − ${c}| = ${m===1?"":m===-1?"−":m}x²/2 + C.<br>f(0) = ${y0}: ln|${y0-c}| = C.<br>|y − ${c}| = ${Math.abs(y0-c)}e<sup>${m===1?"":m===-1?"−":m}x²/2</sup>; since y − ${c} ${y0>c?"&gt;":"&lt;"} 0 at x = 0: <b>y = ${c} ${y0-c>0?"+":"−"} ${Math.abs(y0-c)===1?"":Math.abs(y0-c)}e<sup>${m===1?"":m===-1?"−":m}x²/2</sup></b>.`}]};
 }
 const a=R.int(-3,3), y0=R.pick([1,2,3]); const xp=R.pick([1,2]), yp=R.pick([1,2,3]);
 const s=(2*xp+a)/(2*yp), s2=(2*yp*2-(2*xp+a)*2*s)/(4*yp*yp);
 return {title:"Separable differential equation",topic:"de",type:"Differential equations (no calculator)",
  stem:`<p>Consider the differential equation dy/dx = ${FR(`2x ${a<0?"− "+(-a):a?"+ "+a:""}`.replace(/ $/,""),"2y")}, for y &gt; 0.</p>`,
  parts:[
  {id:"a",q:`Find d²y/dx² at the point (${xp}, ${yp}). Is the solution curve through this point concave up or concave down there?`,
   pts:[P("Quotient rule",`d²y/dx² = [2·2y − (2x${a?sg(a):""})·2·dy/dx]/(2y)².`,"",[[/dy\/dx|y′|y'/i,"Include dy/dx when differentiating y."]]),
        P("Value and concavity",`dy/dx = ${frac(s)} at (${xp}, ${yp}); d²y/dx² = ${frac(s2)}: concave ${s2>0?"up":"down"}.`,"",[[NUM(s2,0.01),`d²y/dx² = ${frac(s2)}.`],[s2>0?/up/i:/down/i,`Concave ${s2>0?"up":"down"}.`]])],
   model:`d²y/dx² = [2(2y) − (2x${a?sg(a):""})(2 dy/dx)]/(4y²). At (${xp}, ${yp}): dy/dx = ${frac(s)}, so d²y/dx² = <b>${frac(s2)}</b>: concave <b>${s2>0?"up":"down"}</b>.`},
  {id:"b",q:`Let y = f(x) be the particular solution with f(0) = ${y0}. Write an equation for the line tangent to the graph of f at x = 0 and use it to approximate f(0.2).`,
   pts:[P("Tangent line",`y = ${y0} + ${frac(a/(2*y0))}x.`,"",[[NUM(a/(2*y0),0.01),`The slope is ${frac(a/(2*y0))}.`]]),
        P("Approximation",`f(0.2) ≈ ${frac(y0+0.2*a/(2*y0))}.`,"",[[NUM(y0+0.2*a/(2*y0),0.005),`f(0.2) ≈ ${f3(y0+0.2*a/(2*y0))}.`]])],
   model:`Slope at (0, ${y0}) = ${a}/(2·${y0}) = ${frac(a/(2*y0))}. Tangent line: <b>y = ${y0} + ${frac(a/(2*y0))}x</b>. f(0.2) ≈ <b>${f3(y0+0.2*a/(2*y0))}</b>.`},
  {id:"c",q:`Find the particular solution y = f(x) with f(0) = ${y0}.`,
   pts:[P("Separates variables",`2y dy = (2x${a?sg(a):""}) dx.`,"",[[/dy/i,"Separate the variables."]]),
        P("Antiderivatives",`y² = x²${a?sg(a)+"x":""} + C.`,"",[[/y\s*(\^|²)\s*2?/i,"Antidifferentiate: y²."]]),
        P("Constant of integration","Includes + C.","",[[/\+\s*c|\bc\b/i,"Include + C."]]),
        P("Uses the initial condition",`${y0}² = C, so C = ${y0*y0}.`,"",[[new RegExp(String(y0*y0)),`C = ${y0*y0}.`]]),
        P("Solves for y",`y = √(x²${a?sg(a)+"x":""} + ${y0*y0}) (positive root since y &gt; 0).`,"Taking ± in the final answer.",[[/√|sqrt|\^\s*\(?1\/2/i,"Solve for y (square root)."]])],
   model:`2y dy = (2x${a?sg(a):""}) dx ⇒ y² = x²${a?sg(a)+"x":""} + C. f(0) = ${y0}: C = ${y0*y0}.<br><b>y = √(x²${a?sg(a)+"x":""} + ${y0*y0})</b> (positive root, since f(0) &gt; 0).`}]};
});

/* B5. Particle motion (no calculator) */
B.push((R)=>{
 const p=R.int(1,3), q=p+R.int(1,3), T=q+R.int(1,2), x0=R.int(-5,5), s=R.pick([1,-1]);
 const v=t=>s*(t-p)*(t-q), X=t=>x0+s*(t**3/3-(p+q)*t*t/2+p*q*t);
 const t1=R.pick([0,1,2,3,4,5,6].filter(t=>t<=T&&t!==p&&t!==q)); const a1=s*(2*t1-p-q), sp=v(t1)*a1>0;
 const D=Math.abs(X(p)-X(0))+Math.abs(X(q)-X(p))+Math.abs(X(T)-X(q));
 const left=s>0?`(${p}, ${q})`:`(0, ${p}) and (${q}, ${T})`;
 return {title:"Particle motion",topic:"motion",type:"Particle motion (no calculator)",
  stem:`<p>A particle moves along the x-axis. For 0 ≤ t ≤ ${T}, its velocity is v(t) = ${s<0?"−":""}(t − ${p})(t − ${q}). At t = 0 the particle is at x = ${N(x0)}.</p>`,
  parts:[
  {id:"a",q:`For 0 &lt; t &lt; ${T}, find all intervals on which the particle is moving to the left. Give a reason.`,
   pts:[P("Intervals",left+".","",[[NUM(p,0.01),`The answer is ${left}.`]]),P("Reason","v(t) &lt; 0 on those intervals.","",[[/v\s*\(t\)\s*<|v\s*<|negative/i,"Reason: v(t) < 0."]])],
   model:`v(t) = 0 at t = ${p} and t = ${q}. v(t) &lt; 0 on <b>${left}</b>, so the particle moves left there.`},
  {id:"b",q:`Find the acceleration of the particle at time t = ${t1}. Is the speed of the particle increasing or decreasing at t = ${t1}? Explain.`,
   pts:[P("Acceleration",`a(${t1}) = ${N(a1)}.`,"",[[NUM(a1,0.01),`a(${t1}) = ${N(a1)}.`]]),P("Speed",`${sp?"Increasing":"Decreasing"}: v(${t1}) = ${N(v(t1))} and a(${t1}) = ${N(a1)} have ${sp?"the same sign":"opposite signs"}.`,"",[[sp?/increas/i:/decreas/i,`Speed is ${sp?"increasing":"decreasing"}.`]])],
   model:`a(t) = v′(t) = ${s<0?"−":""}(2t − ${p+q}); a(${t1}) = <b>${N(a1)}</b>. v(${t1}) = ${N(v(t1))}. ${a1*v(t1)===0?"":`They have ${sp?"the same sign":"opposite signs"}, so the speed is <b>${sp?"increasing":"decreasing"}</b>.`}`},
  {id:"c",q:`Find the position of the particle at time t = ${T}.`,
   pts:[P("Integral",`x(${T}) = ${N(x0)} + ${ig(0,T)} v(t) dt.`,"",[INT]),P("Answer",`${frac(X(T))}.`,"",[[NUM(X(T),0.01),`x(${T}) = ${frac(X(T))}.`]])],
   model:`x(${T}) = ${N(x0)} + ${ig(0,T)} ${s<0?"−":""}(t² − ${p+q}t + ${p*q}) dt = ${N(x0)} + (${frac(X(T)-x0)}) = <b>${frac(X(T))}</b>.`},
  {id:"d",q:`Find the total distance traveled by the particle over the interval 0 ≤ t ≤ ${T}.`,
   pts:[P("Splits at turning points",`Uses t = ${p} and t = ${q} (where v changes sign).`,"",[]),
        P("Positions",`x(${p}) = ${frac(X(p))}, x(${q}) = ${frac(X(q))}.`,"",[[NUM(X(p),0.01),`x(${p}) = ${frac(X(p))}.`]]),
        P("Answer",`${frac(D)}.`,"The displacement instead of the distance.",[[NUM(D,0.01),`The total distance is ${frac(D)}.`]])],
   model:`x(0) = ${N(x0)}, x(${p}) = ${frac(X(p))}, x(${q}) = ${frac(X(q))}, x(${T}) = ${frac(X(T))}.<br>Distance = |${frac(X(p))} − ${N(x0)}| + |${frac(X(q))} − ${frac(X(p))}| + |${frac(X(T))} − ${frac(X(q))}| = <b>${frac(D)}</b>.`}]};
});

/* B6. Related rates: draining cone */
B.push((R)=>{
 const m=R.pick([2,3,4]), Ht=m*R.pick([3,4,5]), c=R.pick([1,2,3,4]), h1=R.pick([2,3,4,6].filter(h=>h<Ht));
 const dh=-c*m*m/(h1*h1), drr=dh/m;
 return {title:"Draining conical tank",topic:"rr",type:"Related rates (no calculator)",
  stem:`<p>A tank is shaped like a right circular cone with its vertex at the bottom. The tank is ${Ht} feet tall and the radius of its top is ${Ht/m} feet. Water drains from the tank at the constant rate of ${c}π cubic feet per minute. When the water is h feet deep, the radius of its surface is r feet. (The volume of a cone is V = ⅓πr²h.)</p>`,
  parts:[
  {id:"a",q:"Write the volume V of the water in the tank in terms of h only.",
   pts:[P("Similar triangles",`r/h = ${Ht/m}/${Ht}, so r = h/${m}.`,"",[[new RegExp(`h\\s*\\/\\s*${m}`),`r = h/${m}.`]]),P("V(h)",`V = πh³/${3*m*m}.`,"",[[new RegExp(String(3*m*m)),`V = πh³/${3*m*m}.`]])],
   model:`By similar triangles r/h = ${Ht/m}/${Ht} = 1/${m}, so r = h/${m} and <b>V = ⅓π(h/${m})²h = πh³/${3*m*m}</b>.`},
  {id:"b",q:`Find the rate at which the depth of the water is changing when h = ${h1} feet. Indicate units of measure.`,
   pts:[P("Differentiates",`dV/dt = (πh²/${m*m}) dh/dt.`,"",[[/dh\/dt|h′|h'/i,"Differentiate with respect to t (chain rule)."]]),
        P("Substitutes dV/dt = −"+c+"π",`−${c}π = (π·${h1*h1}/${m*m}) dh/dt.`,"Using +"+c+"π (the water is draining).",[[/[−-]\s*\d/,"dV/dt is negative."]]),
        P("Answer with units",`dh/dt = ${frac(dh)} feet per minute.`,"",[[NUM(dh,0.01),`dh/dt = ${frac(dh)}.`],[/f(ee)?t|ft/i,"Units: feet per minute."]])],
   model:`dV/dt = (πh²/${m*m}) dh/dt. With dV/dt = −${c}π and h = ${h1}: −${c}π = (${h1*h1}π/${m*m}) dh/dt ⇒ <b>dh/dt = ${frac(dh)} ft/min</b>.`},
  {id:"c",q:`Find the rate at which the radius of the water's surface is changing when h = ${h1} feet.`,
   pts:[P("Relationship",`dr/dt = (1/${m}) dh/dt.`,"",[]),P("Answer",`${frac(drr)} feet per minute.`,"",[[NUM(drr,0.01),`dr/dt = ${frac(drr)}.`]])],
   model:`r = h/${m} ⇒ dr/dt = (1/${m}) dh/dt = <b>${frac(drr)} ft/min</b>.`},
  {id:"d",q:"Is the depth of the water decreasing at an increasing rate or at a decreasing rate? Justify using d²h/dt².",
   pts:[P("d²h/dt²",`dh/dt = −${c*m*m}h⁻², so d²h/dt² = ${2*c*m*m}h⁻³·dh/dt &lt; 0.`,"",[[/d²h|d\^2h|d2h|second/i,"Find d²h/dt²."]]),
        P("Conclusion",`dh/dt &lt; 0 and d²h/dt² &lt; 0: the depth is decreasing at an <b>increasing</b> rate (|dh/dt| grows as h shrinks).`,"",[[/increasing rate|faster|speed/i,"Conclude: decreasing at an increasing rate."]])],
   model:`dh/dt = −${c*m*m}/h². d²h/dt² = ${2*c*m*m}h⁻³ · dh/dt &lt; 0 (since dh/dt &lt; 0). The rate dh/dt is negative and getting more negative, so the depth is <b>decreasing at an increasing rate</b>.`}]};
});

/* BC B7. Taylor series */
S.push((R)=>{
 const c=R.pick([1,2,3,-1]), k=R.pick([2,3,4,5]);
 const coef=n=>(n+1)/k**n; const xa=c-1; const P2=1-2/k+3/(k*k), err=4/k**3;
 const xs=`(x ${c<0?"+ "+(-c):"− "+c})`;
 return {title:"Taylor series",topic:"series",type:"Taylor series (no calculator)",
  stem:`<p>The function f has derivatives of all orders for all real numbers x in its interval of convergence. The derivatives of f at x = ${c} satisfy f<sup>(n)</sup>(${c}) = ${FR("(n + 1)!",`${k}<sup>n</sup>`)} for n ≥ 0.</p>`,
  parts:[
  {id:"a",q:`Write the first four nonzero terms and the general term of the Taylor series for f about x = ${c}.`,
   pts:[P("First four terms",`1 + ${frac(2/k)}${xs} + ${frac(3/(k*k))}${xs}² + ${frac(4/k**3)}${xs}³.`,"Forgetting to divide by n!.",[[NUM(2/k,0.001),`The x-term coefficient is ${frac(2/k)}.`]]),
        P("General term",`${FR("n + 1",`${k}<sup>n</sup>`)}${xs}<sup>n</sup>.`,"",[[/n\s*\+\s*1/i,"General term: (n + 1)/"+k+"ⁿ · "+xs+"ⁿ."]])],
   model:`Coefficient = f<sup>(n)</sup>(${c})/n! = (n + 1)!/(${k}<sup>n</sup> n!) = (n + 1)/${k}<sup>n</sup>.<br>f(x) = 1 + ${frac(2/k)}${xs} + ${frac(3/(k*k))}${xs}² + ${frac(4/k**3)}${xs}³ + … + <b>${FR("n + 1",`${k}<sup>n</sup>`)}${xs}<sup>n</sup></b> + …`},
  {id:"b",q:"Find the interval of convergence of the Taylor series for f. Show the work that leads to your answer.",
   pts:[P("Ratio test",`|a<sub>n+1</sub>/a<sub>n</sub>| = ${FR("n + 2","n + 1")}·${FR(`|x ${c<0?"+ "+(-c):"− "+c}|`,k)} → |x ${c<0?"+ "+(-c):"− "+c}|/${k}.`,"",[[/ratio|limit|lim/i,"Use the ratio test with a limit."]]),
        P("Radius",`|x ${c<0?"+ "+(-c):"− "+c}| &lt; ${k}: radius ${k}.`,"",[[new RegExp(String(k)),`The radius is ${k}.`]]),
        P("Endpoints",`At x = ${c-k} and x = ${c+k}, the terms (n + 1)(±1)<sup>n</sup> do not approach 0: both diverge. Interval: (${c-k}, ${c+k}).`,"Not checking the endpoints.",[[NUM(c-k,0.01),`The interval is (${c-k}, ${c+k}).`]])],
   model:`Ratio test: lim |a<sub>n+1</sub>/a<sub>n</sub>| = lim ${FR("n + 2","n + 1")}·|x ${c<0?"+ "+(-c):"− "+c}|/${k} = |x ${c<0?"+ "+(-c):"− "+c}|/${k} &lt; 1 ⇒ ${c-k} &lt; x &lt; ${c+k}.<br>Endpoints: the series becomes Σ(n + 1)(±1)<sup>n</sup>, whose terms do not go to 0, so it diverges by the nth-term test.<br>Interval of convergence: <b>(${c-k}, ${c+k})</b>.`},
  {id:"c",q:`Use the second-degree Taylor polynomial for f about x = ${c} to approximate f(${xa}). Show that this approximation differs from f(${xa}) by at most ${frac(err)}.`,
   pts:[P("Approximation",`P₂(${xa}) = 1 − ${frac(2/k)} + ${frac(3/(k*k))} = ${frac(P2)}.`,"",[[NUM(P2,0.002),`P₂(${xa}) = ${frac(P2)}.`]]),
        P("Alternating series error bound",`At x = ${xa} the series is alternating with terms decreasing in magnitude to 0, so |error| ≤ the first omitted term = ${frac(err)}.`,"Using a Lagrange bound without a bound on the derivative.",[[/alternat/i,"Use the alternating series error bound."]])],
   model:`At x = ${xa}, x − ${c} = −1: the series is 1 − ${frac(2/k)} + ${frac(3/(k*k))} − ${frac(4/k**3)} + …, alternating, with terms (n + 1)/${k}<sup>n</sup> decreasing to 0. P₂(${xa}) = <b>${frac(P2)}</b>, and |f(${xa}) − P₂(${xa})| ≤ ${frac(err)} (the first omitted term).`},
  {id:"d",q:`Let g(x) = ${ig(c,"x")} f(t) dt. Write the first three nonzero terms of the Taylor series for g about x = ${c}.`,
   pts:[P("Integrates term by term",`${xs} + ${frac(1/k)}${xs}² + ${frac(1/(k*k))}${xs}³.`,"Missing the constant term check (g(${c}) = 0).",[[NUM(1/k,0.001),`The second coefficient is ${frac(1/k)}.`]]),
        P("All three correct","All three terms correct.","",[])],
   model:`g(x) = ${ig(c,"x")} [1 + ${frac(2/k)}(t − ${c}) + ${frac(3/(k*k))}(t − ${c})² + …] dt = <b>${xs} + ${frac(1/k)}${xs}² + ${frac(1/(k*k))}${xs}³ + …</b>`}]};
});

/* BC B8. Logistic growth and Euler's method */
Bbc.push((R)=>{
 const M=R.pick([10,12,20]), k=R.pick([10,20,40].filter(x=>x>=M)), P0=R.pick([2,4].filter(x=>x<M/2)), h=R.pick([0.5,1]);
 const f=P=>P*(M-P)/k; const P1=P0+h*f(P0), P2=P1+h*f(P1);
 return {title:"Logistic growth",topic:"logistic",type:"Differential equations (no calculator)",
  stem:`<p>A population P(t) satisfies the differential equation dP/dt = ${FR("P","" + k)}(${M} − P), where t is measured in years, with P(0) = ${P0}.</p>`,
  parts:[
  {id:"a",q:"Find lim<sub>t→∞</sub> P(t).",
   pts:[P("Limit",`${M} (the carrying capacity).`,"",[[NUM(M,0.01),`The limit is ${M}.`]])],model:`Since 0 &lt; P(0) &lt; ${M}, P(t) → <b>${M}</b>.`},
  {id:"b",q:"For what value of P is the population growing the fastest? Justify.",
   pts:[P("Value",`P = ${M/2}.`,"",[[NUM(M/2,0.01),`P = ${M/2}.`]]),P("Reason",`dP/dt = (1/${k})(${M}P − P²) is a downward parabola in P with vertex at P = ${M/2} (or d²P/dt² = 0 there and changes sign).`,"",[[/vertex|max|d²p|second|parabola|half/i,"Justify why dP/dt is largest there."]])],
   model:`dP/dt = (${M}P − P²)/${k} is maximized when its derivative with respect to P, (${M} − 2P)/${k}, is 0: <b>P = ${M/2}</b>.`},
  {id:"c",q:`Use Euler's method, starting at t = 0 with two steps of equal size h = ${h}, to approximate P(${2*h}).`,
   pts:[P("First step",`P(${h}) ≈ ${P0} + ${h}·${frac(f(P0))} = ${frac(P1)}.`,"",[[NUM(P1,0.01),`P(${h}) ≈ ${frac(P1)}.`]]),
        P("Second step",`P(${2*h}) ≈ ${frac(P1)} + ${h}·${frac(f(P1))}.`,"",[]),
        P("Answer",`${frac(P2)}.`,"",[[NUM(P2,0.01),`P(${2*h}) ≈ ${frac(P2)}.`]])],
   model:`dP/dt at P = ${P0}: ${frac(f(P0))}. P(${h}) ≈ ${P0} + ${h}(${frac(f(P0))}) = ${frac(P1)}.<br>dP/dt at P = ${frac(P1)}: ${frac(f(P1))}. P(${2*h}) ≈ ${frac(P1)} + ${h}(${frac(f(P1))}) = <b>${frac(P2)}</b>.`},
  {id:"d",q:`Find d²P/dt² in terms of P. Use it to determine whether your approximation in part (c) is an underestimate or an overestimate. Explain.`,
   pts:[P("d²P/dt²",`d²P/dt² = (1/${k})(${M} − 2P) dP/dt.`,"",[[/dp\/dt|p′|p'/i,"Use the chain rule: multiply by dP/dt."]]),
        P("Sign",`For ${P0} ≤ P &lt; ${M/2}, d²P/dt² &gt; 0: P is concave up.`,"",[[/concave up|> ?0|positive/i,"State the concavity."]]),
        P("Conclusion","Underestimate: the tangent segments lie below a concave-up curve.","",[[/under/i,"It is an underestimate."]])],
   model:`d²P/dt² = (1/${k})(${M} − 2P)·dP/dt. For ${P0} ≤ P &lt; ${M/2}, both factors are positive, so d²P/dt² &gt; 0 and the graph of P is concave up. Euler's method follows tangent lines, which lie below a concave-up curve, so the approximation is an <b>underestimate</b>.`}]};
});

/* BC B9. Parametric (no calculator) */
Bbc.push((R)=>{
 const p=R.int(-2,2), s=R.pick([1,2]), q=3*s*s, t1=R.pick([1,2,3].filter(t=>t!==s&&2*t+p!==0));
 const xp=t=>2*t+p, yp=t=>3*t*t-q; const sl=yp(t1)/xp(t1); const d2=(6*t1*xp(t1)-yp(t1)*2)/xp(t1)**2/xp(t1);
 const xT=t=>t*t+p*t, yT=t=>t**3-q*t; const sp2=xp(t1)**2+yp(t1)**2; const sq=Math.sqrt(sp2);
 return {title:"Parametric curve",topic:"param",type:"Parametric equations (no calculator)",
  stem:`<p>A curve is defined by the parametric equations x(t) = t²${p?sg(p)+"t":""} and y(t) = t³ − ${q}t for t ≥ 0.</p>`,
  parts:[
  {id:"a",q:`Find dy/dx in terms of t, and find the slope of the curve at t = ${t1}.`,
   pts:[P("dy/dx",`${FR(`3t² − ${q}`,`2t${p?sg(p):""}`)}.`,"",[[/3t/i,"dy/dx = (dy/dt)/(dx/dt)."]]),P("Slope",`${frac(sl)}.`,"",[[NUM(sl,0.01),`The slope is ${frac(sl)}.`]])],
   model:`dy/dx = (dy/dt)/(dx/dt) = (3t² − ${q})/(2t${p?sg(p):""}). At t = ${t1}: <b>${frac(sl)}</b>.`},
  {id:"b",q:"Find the coordinates of the point on the curve at which the tangent line is horizontal.",
   pts:[P("dy/dt = 0",`3t² − ${q} = 0 ⇒ t = ${s} (t ≥ 0), with dx/dt ≠ 0.`,"",[[NUM(s,0.01),`t = ${s}.`]]),P("Point",`(${N(xT(s))}, ${N(yT(s))}).`,"",[[NUM(yT(s),0.01),`The point is (${N(xT(s))}, ${N(yT(s))}).`]])],
   model:`dy/dt = 3t² − ${q} = 0 ⇒ t = ${s}; dx/dt = ${xp(s)} ≠ 0. Point: <b>(${N(xT(s))}, ${N(yT(s))})</b>.`},
  {id:"c",q:`Find the speed of a particle moving along the curve at t = ${t1}.`,
   pts:[P("Formula",`√((dx/dt)² + (dy/dt)²).`,"",[[/√|sqrt/i,"Speed = √((dx/dt)² + (dy/dt)²)."]]),P("Value",`√(${xp(t1)}² + ${yp(t1)}²) = ${Number.isInteger(sq)?sq:"√"+sp2}.`,"",[[NUM(sq,0.01),`The speed is √${sp2}.`]])],
   model:`Speed = √((${xp(t1)})² + (${yp(t1)})²) = <b>${Number.isInteger(sq)?sq:"√"+sp2}</b>.`},
  {id:"d",q:`Find d²y/dx² at t = ${t1}.`,
   pts:[P("d/dt of dy/dx","Differentiates dy/dx with respect to t (quotient rule).","",[]),P("Divides by dx/dt","Divides by dx/dt.","Forgetting to divide by dx/dt.",[]),P("Value",`${frac(d2)}.`,"",[[NUM(d2,0.01),`d²y/dx² = ${frac(d2)}.`]])],
   model:`d/dt(dy/dx) = [6t(2t${p?sg(p):""}) − 2(3t² − ${q})]/(2t${p?sg(p):""})². d²y/dx² = [d/dt(dy/dx)]/(dx/dt). At t = ${t1}: <b>${frac(d2)}</b>.`}]};
});


/* B7. Function analysis from a formula */
B.push((R)=>{
 const a=R.pick([-1,0,1,2,3]); const eN=n=>n===0?"1":n===1?"e":`e<sup>${n}</sup>`; const xa=a===0?"x":`(x ${a<0?"+ "+(-a):"− "+a})`;
 const c=a-1, ip=a-2, lo=a-3, hi=a+1; const f=x=>(x-a)*e(x);
 return {title:"Analyzing a function",topic:"analysis",type:"Function analysis (no calculator)",
  stem:`<p>Let f be the function defined by f(x) = ${xa}e<sup>x</sup> for all real numbers x.</p>`,
  parts:[
  {id:"a",q:"Find f′(x). Find the x-coordinate of the critical point of f, and determine whether f has a relative minimum, a relative maximum, or neither there. Justify your answer.",
   pts:[P("f′(x)",`Product rule: f′(x) = e<sup>x</sup> + ${xa}e<sup>x</sup> = (x ${c<0?"+ "+(-c):c?"− "+c:""})e<sup>x</sup>.`,"Missing the product rule.",[[/e\s*\^|e<sup>|e\s*x|eˣ/i,"Use the product rule."]]),
        P("Critical point",`x = ${c}.`,"",[[NUM(c,0.001),`x = ${c}.`]]),
        P("Classification with reason",`Relative minimum: f′ changes from negative to positive at x = ${c} (e<sup>x</sup> &gt; 0).`,"Classifying without a sign change or second-derivative argument.",[[/min/i,"It is a relative minimum."],[/sign|negative|positive|f″|second/i,"Justify with the sign of f′ (or f″)."]])],
   model:`f′(x) = e<sup>x</sup> + ${xa}e<sup>x</sup> = (x ${c<0?"+ "+(-c):c?"− "+c:""})e<sup>x</sup>. Since e<sup>x</sup> &gt; 0, f′(x) = 0 only at <b>x = ${c}</b>. f′ &lt; 0 for x &lt; ${c} and f′ &gt; 0 for x &gt; ${c}, so f has a <b>relative minimum</b> at x = ${c}.`},
  {id:"b",q:"On what intervals is the graph of f concave up? Concave down? Justify your answer.",
   pts:[P("f″(x)",`f″(x) = (x ${ip<0?"+ "+(-ip):ip?"− "+ip:""})e<sup>x</sup>.`,"",[]),
        P("Intervals",`Concave down on (−∞, ${ip}); concave up on (${ip}, ∞), because f″ &lt; 0 and f″ &gt; 0 there.`,"",[[NUM(ip,0.001),`The concavity changes at x = ${ip}.`]])],
   model:`f″(x) = e<sup>x</sup> + (x ${c<0?"+ "+(-c):c?"− "+c:""})e<sup>x</sup> = (x ${ip<0?"+ "+(-ip):ip?"− "+ip:""})e<sup>x</sup>. f″ &lt; 0 on <b>(−∞, ${ip})</b>: concave down. f″ &gt; 0 on <b>(${ip}, ∞)</b>: concave up.`},
  {id:"c",q:`Find the absolute maximum value and the absolute minimum value of f on the closed interval ${lo} ≤ x ≤ ${hi}. Justify your answers.`,
   pts:[P("Candidates",`f(${lo}) = −3${eN(lo)}, f(${c}) = −${eN(c)}, f(${hi}) = ${eN(hi)}.`,"Not checking the endpoints.",[[/candidate|endpoint|f\s*\(/i,"Evaluate f at the endpoints and the critical point."]]),
        P("Answers",`Absolute maximum ${eN(hi)} (at x = ${hi}); absolute minimum −${eN(c)} (at x = ${c}).`,"",[[NUM(f(hi),Math.max(0.01,f(hi)*0.003)),`The maximum is ${eN(hi)} ≈ ${f3(f(hi))}.`]])],
   model:`Candidates: f(${lo}) = −3${eN(lo)} ≈ ${f3(f(lo))}; f(${c}) = −${eN(c)} ≈ ${f3(f(c))}; f(${hi}) = ${eN(hi)} ≈ ${f3(f(hi))}.<br>Absolute maximum: <b>${eN(hi)}</b>. Absolute minimum: <b>−${eN(c)}</b>.`},
  {id:"d",q:"Find lim<sub>x→−∞</sub> f(x). Show the work that leads to your answer.",
   pts:[P("Indeterminate form",`Rewrites as ${FR(xa.replace(/[()]/g,""),"e<sup>−x</sup>")} (form ∞/∞) and applies L'Hôpital's Rule.`,"",[[/l.?h[oô]pital|∞\s*\/\s*∞|e\s*\^?\s*[−-]x|e<sup>−x/i,"Rewrite as a quotient and use L'Hôpital's Rule."]]),
        P("Answer","0.","",[[NUM(0,0.001),"The limit is 0."]])],
   model:`lim (x ${a<0?"+ "+(-a):"− "+a})/e<sup>−x</sup> has the form −∞/∞. By L'Hôpital's Rule it equals lim 1/(−e<sup>−x</sup>) = lim (−e<sup>x</sup>) = <b>0</b>.`}]};
});

/* B8. Piecewise function: continuity and differentiability */
B.push((R)=>{
 const c=R.pick([1,2]), b=R.int(-3,3), c0=R.int(-2,4); const diff=R.chance(0.5); const m=diff?2*c+b:2*c+b+R.pick([-2,-1,1,2]); const d=c*c+b*c+c0-m*c;
 const top=`x²${b?(b<0?" − ":" + ")+(Math.abs(b)===1?"":Math.abs(b))+"x":""}${c0?(c0<0?" − ":" + ")+Math.abs(c0):""}`; const I=c**3/3+b*c*c/2+c0*c+m*((c+2)**2-c*c)/2+2*d;
 const f=x=>x<=c?x*x+b*x+c0:m*x+d; const avr=(f(c+2)-f(0))/(c+2);
 return {title:"Piecewise-defined function",topic:"piecewise",type:"Continuity and differentiability (no calculator)",
  stem:`<p>Let f be the function defined by f(x) = { ${top} for x ≤ ${c};  ${m===1?"":m===-1?"−":m}x + k for x &gt; ${c} }, where k is a constant.</p>`,
  parts:[
  {id:"a",q:`Find the value of k for which f is continuous at x = ${c}. Justify your answer.`,
   pts:[P("One-sided limits",`lim<sub>x→${c}<sup>−</sup></sub> f(x) = ${N(c*c+b*c+c0)} and lim<sub>x→${c}<sup>+</sup></sub> f(x) = ${N(m*c)} + k, and they must equal f(${c}).`,"",[[/lim|left|right|=/i,"Set the one-sided limits equal."]]),
        P("Value",`k = ${N(d)}.`,"",[[NUM(d,0.001),`k = ${N(d)}.`]])],
   model:`Continuity at x = ${c}: lim from the left = f(${c}) = ${c}² ${b<0?"−":"+"} ${Math.abs(b)}(${c}) ${c0<0?"−":"+"} ${Math.abs(c0)} = ${N(c*c+b*c+c0)}; lim from the right = ${N(m*c)} + k. So <b>k = ${N(d)}</b>.`},
  {id:"b",q:`With this value of k, is f differentiable at x = ${c}? Justify your answer.`,
   pts:[P("Left and right derivatives",`From the left: 2x ${b<0?"−":"+"} ${Math.abs(b)} → ${N(2*c+b)}; from the right: ${N(m)}.`,"",[[NUM(2*c+b,0.001),`The left derivative is ${N(2*c+b)}.`]]),
        P("Conclusion",`${diff?"Yes":"No"}: the one-sided derivatives are ${diff?"equal (and f is continuous)":"not equal"}.`,"",[[diff?/yes|is differentiable/i:/\bno\b|not differentiable/i,`f ${diff?"is":"is not"} differentiable at x = ${c}.`]])],
   model:`f is continuous at x = ${c}. The derivative from the left is 2(${c}) ${b<0?"−":"+"} ${Math.abs(b)} = ${N(2*c+b)}; from the right it is ${N(m)}. ${diff?"They are equal, so f <b>is differentiable</b> at x = "+c+".":"They differ, so f is <b>not differentiable</b> at x = "+c+" (a corner)."}`},
  {id:"c",q:`Find ${ig(0,c+2)} f(x) dx.`,
   pts:[P("Splits the integral",`${ig(0,c)} (${top}) dx + ${ig(c,c+2)} (${N(m)}x + ${N(d)}) dx.`,"",[[/\+/,"Split the integral at x = "+c+"."]]),
        P("Antiderivatives","Correct antiderivatives of both pieces.","",[]),
        P("Value",`${frac(I)}.`,"",[[NUM(I,0.01),`The value is ${frac(I)}.`]])],
   model:`${ig(0,c)} (${top}) dx = ${frac(c**3/3+b*c*c/2+c0*c)}; ${ig(c,c+2)} (${N(m)}x + ${N(d)}) dx = ${frac(m*((c+2)**2-c*c)/2+2*d)}. Total: <b>${frac(I)}</b>.`},
  {id:"d",q:`Find the average rate of change of f on [0, ${c+2}]. Does the Mean Value Theorem guarantee a value x in (0, ${c+2}) with f′(x) equal to this average rate? Explain.`,
   pts:[P("Average rate",`[f(${c+2}) − f(0)]/${c+2} = ${frac(avr)}.`,"",[[NUM(avr,0.01),`The average rate is ${frac(avr)}.`]]),
        P("MVT hypotheses",diff?"Yes: f is continuous on [0, "+(c+2)+"] and differentiable on (0, "+(c+2)+"), so the MVT applies.":"No: f is not differentiable at x = "+c+", so the hypotheses of the MVT are not met.","",[[/differentiab/i,"Check the differentiability hypothesis."]])],
   model:`f(${c+2}) = ${N(f(c+2))}, f(0) = ${N(f(0))}; average rate = <b>${frac(avr)}</b>. ${diff?"f is continuous and differentiable on the interval, so the Mean Value Theorem <b>does</b> guarantee such a value.":`f is not differentiable at x = ${c}, which is inside (0, ${c+2}), so the Mean Value Theorem <b>does not</b> apply (it guarantees nothing).`}`}]};
});

/* B9. The graph of f′ */
B.push((R)=>{
 const xs=[-4,-3,-2,-1,0,1,2,3,4]; let ys, ok=false;
 for(let tr=0;tr<80&&!ok;tr++){ ys=[R.int(-2,2)]; for(let i=1;i<9;i++) ys.push(Math.max(-3,Math.min(3,ys[i-1]+R.pick([-2,-1,-1,0,1,1,2]))));
  for(let i=0;i<8;i++) if(ys[i]*ys[i+1]<0){ if(Math.abs(ys[i])<=Math.abs(ys[i+1])) ys[i]=0; else ys[i+1]=0; }
  ok=ys.some(v=>v>0)&&ys.some(v=>v<0)&&ys.slice(1).some((v,i)=>v<ys[i])&&ys.slice(1).some((v,i)=>v>ys[i]); }
 if(!ok) return null;
 const k=R.int(-2,5); const area=(i)=>(ys[i]+ys[i+1])/2; const Fv=x=>{ let s=0; if(x>=0) for(let i=4;i<4+x;i++) s+=area(i); else for(let i=4+x;i<4;i++) s-=area(i); return k+s; };
 const sc=[]; for(let i=1;i<8;i++){ if(ys[i]!==0) continue; const L=ys.slice(0,i).reverse().find(v=>v!==0), Rr=ys.slice(i+1).find(v=>v!==0); if(L&&Rr&&L*Rr<0) sc.push([xs[i],L>0?"max":"min"]); }
 const ask=sc.some(s=>s[1]==="min")?"minimum":"maximum", ex=sc.filter(s=>s[1]===(ask==="minimum"?"min":"max")).map(s=>s[0]); if(!ex.length) return null;
 const iv=[]; for(let i=0;i<8;i++){ if(ys[i+1]<ys[i]){ if(iv.length&&iv[iv.length-1][1]===xs[i]) iv[iv.length-1][1]=xs[i+1]; else iv.push([xs[i],xs[i+1]]); } } const ivs=iv.map(([a,b])=>`(${a}, ${b})`).join(" ∪ ");
 const pc=R.pick([-3,-2,-1,1,2].filter(p=>ys[p+5]!==ys[p+4])); if(pc==null) return null; const sl=ys[pc+5]-ys[pc+4], fp=ys[pc+4], fpv=Fv(pc), apx=fpv+fp*0.5, under=sl>0;
 return {title:"Graph of the derivative",topic:"fprime",type:"Graphical analysis of f′ (no calculator)",
  stem:`<p>The function f is differentiable on −4 ≤ x ≤ 4, and f(0) = ${k}. The graph of f′, the derivative of f, consists of line segments and is shown.</p>${plot({xmin:-4,xmax:4,ymin:-3.5,ymax:3.5,curves:[{pts:xs.map((x,i)=>[x,ys[i]])}],dots:xs.map((x,i)=>[x,ys[i]]),lab:{x:"x",y:"y"},cap:"Graph of f′"})}`,
  parts:[
  {id:"a",q:`On −4 &lt; x &lt; 4, find all x-values at which f has a relative ${ask}. Justify.`,
   pts:[P("Answer",`x = ${ex.join(", ")}.`,"Including zeros of f′ where it does not change sign.",[[NUM(ex[0],0.01),`x = ${ex.join(", ")}.`]]),P("Justification",`f′ changes from ${ask==="minimum"?"negative to positive":"positive to negative"} there.`,"",[[/chang|sign/i,"Justify with a sign change of f′."]])],
   model:`f′ changes from ${ask==="minimum"?"negative to positive":"positive to negative"} at <b>x = ${ex.join(", ")}</b>, so f has a relative ${ask} there.`},
  {id:"b",q:"Find all open intervals on which the graph of f is concave down. Justify.",
   pts:[P("Intervals",ivs+".","Using where f′ is negative (that is where f decreases).",[[NUM(iv[0][0],0.01),`The intervals are ${ivs}.`]]),P("Justification","f′ is decreasing on those intervals (f″ &lt; 0).","",[[/decreas|f″|second|slope/i,"Justify: f′ is decreasing."]])],
   model:`f is concave down where f′ is decreasing: <b>${ivs}</b>.`},
  {id:"c",q:"Find f(4) and f(−4).",
   pts:[P("f(4)",`f(4) = ${k} + ${ig(0,4)} f′(x) dx = ${frac(Fv(4))}.`,"",[[NUM(Fv(4),0.01),`f(4) = ${frac(Fv(4))}.`]]),P("f(−4)",`f(−4) = ${k} − ${ig(-4,0)} f′(x) dx = ${frac(Fv(-4))}.`,"",[[NUM(Fv(-4),0.01),`f(−4) = ${frac(Fv(-4))}.`]])],
   model:`f(4) = f(0) + ${ig(0,4)} f′(x) dx = ${k} + (${frac(Fv(4)-k)}) = <b>${frac(Fv(4))}</b>.<br>f(−4) = f(0) − ${ig(-4,0)} f′(x) dx = ${k} − (${frac(k-Fv(-4))}) = <b>${frac(Fv(-4))}</b>.`},
  {id:"d",q:`Write an equation for the line tangent to the graph of f at x = ${pc}, and use it to approximate f(${pc+0.5}). Is the approximation an overestimate or an underestimate? Explain.`,
   pts:[P("Tangent line",`f(${pc}) = ${frac(fpv)}, f′(${pc}) = ${fp}: y = ${frac(fpv)} ${fp<0?"−":"+"} ${Math.abs(fp)}(x ${pc<0?"+ "+(-pc):"− "+pc}).`,"",[[NUM(fpv,0.01),`f(${pc}) = ${frac(fpv)}.`]]),
        P("Approximation",`f(${pc+0.5}) ≈ ${frac(apx)}.`,"",[[NUM(apx,0.01),`The approximation is ${frac(apx)}.`]]),
        P("Over/under with reason",`${under?"Underestimate":"Overestimate"}: f′ is ${under?"increasing":"decreasing"} on (${pc}, ${pc+1}), so f is concave ${under?"up":"down"} and the tangent line lies ${under?"below":"above"} the graph.`,"",[[under?/under/i:/over/i,`It is an ${under?"underestimate":"overestimate"}.`]])],
   model:`f(${pc}) = ${frac(fpv)} (from the areas) and f′(${pc}) = ${fp}. Tangent line: y = ${frac(fpv)} + ${fp}(x − ${pc}). f(${pc+0.5}) ≈ <b>${frac(apx)}</b>. On (${pc}, ${pc+1}) the graph of f′ is ${under?"increasing":"decreasing"}, so f is concave ${under?"up":"down"}: an <b>${under?"underestimate":"overestimate"}</b>.`}]};
});

/* BC S2. Power series: interval of convergence */
S.push((R)=>{
 const c=R.pick([-2,-1,1,2,3]), k=R.pick([2,3,4,5]); const xs=`(x ${c<0?"+ "+(-c):"− "+c})`;
 return {title:"Power series",topic:"series",type:"Power series (no calculator)",
  stem:`<p>The function f is defined by the power series f(x) = Σ<sub>n=1</sub><sup>∞</sup> ${FR(`${xs}<sup>n</sup>`,`n · ${k}<sup>n</sup>`)} for all x for which the series converges.</p>`,
  parts:[
  {id:"a",q:"Use the ratio test to find the radius of convergence of the series.",
   pts:[P("Ratio test",`|a<sub>n+1</sub>/a<sub>n</sub>| = ${FR("n","n + 1")}·|x ${c<0?"+ "+(-c):"− "+c}|/${k} → |x ${c<0?"+ "+(-c):"− "+c}|/${k}.`,"",[[/ratio|lim/i,"Set up the ratio test with a limit."]]),P("Radius",`${k}.`,"",[[NUM(k,0.001),`The radius is ${k}.`]])],
   model:`lim |a<sub>n+1</sub>/a<sub>n</sub>| = lim ${FR("n","n + 1")}·|x ${c<0?"+ "+(-c):"− "+c}|/${k} = |x ${c<0?"+ "+(-c):"− "+c}|/${k} &lt; 1 ⇒ radius <b>${k}</b>.`},
  {id:"b",q:"Find the interval of convergence. Justify your treatment of the endpoints.",
   pts:[P(`Right endpoint x = ${c+k}`,"Σ 1/n, the harmonic series: diverges.","",[[/harmonic|diverg|p\s*=\s*1/i,"The right endpoint gives the harmonic series."]]),
        P(`Left endpoint x = ${c-k}`,"Σ (−1)<sup>n</sup>/n converges by the alternating series test.","",[[/alternat/i,"Use the alternating series test."]]),
        P("Interval",`[${c-k}, ${c+k}).`,"",[[NUM(c-k,0.001),`The interval is [${c-k}, ${c+k}).`]])],
   model:`At x = ${c+k}: Σ ${k}<sup>n</sup>/(n·${k}<sup>n</sup>) = Σ 1/n diverges (harmonic). At x = ${c-k}: Σ (−1)<sup>n</sup>/n converges (terms alternate, decrease, and approach 0). Interval: <b>[${c-k}, ${c+k})</b>.`},
  {id:"c",q:`Does the series converge absolutely or conditionally at x = ${c-k}? Explain.`,
   pts:[P("Conditional","Conditionally: it converges, but Σ |(−1)<sup>n</sup>/n| = Σ 1/n diverges.","",[[/condition/i,"It converges conditionally."]])],
   model:`The series of absolute values is Σ 1/n, which diverges, so the convergence at x = ${c-k} is <b>conditional</b>.`},
  {id:"d",q:"Write the first three nonzero terms and the general term of the series for f′(x).",
   pts:[P("First three terms",`${FR(1,k)} + ${FR(xs,k*k)} + ${FR(xs+"²",k**3)}.`,"",[[NUM(1/k,0.001),`The first term is 1/${k}.`]]),P("General term",`${FR(`${xs}<sup>n−1</sup>`,`${k}<sup>n</sup>`)}.`,"",[[/n\s*[−-]\s*1/i,"General term has the power n − 1."]])],
   model:`Differentiate term by term: f′(x) = Σ ${FR(`n${xs}<sup>n−1</sup>`,`n·${k}<sup>n</sup>`)} = <b>${FR(1,k)} + ${FR(xs,k*k)} + ${FR(xs+"²",k**3)} + … + ${FR(`${xs}<sup>n−1</sup>`,`${k}<sup>n</sup>`)} + …</b>`},
  {id:"e",q:`Find f′(${c}).`,
   pts:[P("Value",`${FR(1,k)}.`,"",[[NUM(1/k,0.001),`f′(${c}) = 1/${k}.`]])],
   model:`At x = ${c} every term after the first is 0: f′(${c}) = <b>1/${k}</b>.`}]};
});

ZX.frq.ab={A,B}; ZX.frq.bc={A,B,Abc,Bbc,S};
})();
