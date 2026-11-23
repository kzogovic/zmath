/* Extra generators so that every cheat-sheet topic has "↻ Another example".
   Hooks into A2GEN.build: a topic key "x:<name>" is answered here. */
(function(){
if(!window.A2GEN||!window.A2CHEAT) return;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)), pick=a=>a[Math.floor(Math.random()*a.length)];
const nz=(a,b,ex=[])=>{ let v; do{ v=rnd(a,b); }while(v===0||ex.includes(v)); return v; };
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a||1;};
const fr=(n,d)=>{ if(d<0){n=-n;d=-d;} const g=gcd(n,d); n/=g; d/=g; return d===1?String(n):`${n<0?"-":""}{{${Math.abs(n)}|${d}}}`; };
const sgn=(v,first)=>first?(v<0?"-"+(-v):String(v)):(v<0?" - "+(-v):" + "+v);
const lin=(a,h)=>h===0?"x":h>0?`x - ${h}`:`x + ${-h}`;
const coef=a=>a===1?"":a===-1?"-":String(a);
const ev=(c,x)=>c.reduce((s,a)=>s*x+a,0);
function ps(c){ const n=c.length-1; let s=""; c.forEach((a,i)=>{ if(!a) return; const p=n-i, m=Math.abs(a); s+=s?(a<0?" - ":" + "):(a<0?"-":""); s+=(m===1&&p?"":m)+(p===0?"":p===1?"x":"x^"+p); }); return s||"0"; }
const neg=c=>c.map((a,i)=>((c.length-1-i)%2?-a:a));

const MG={
 parent(){ const L=[["y = x^2",x=>x*x,"(-∞, ∞)","[0, ∞)","parabola, vertex (0, 0)"],["y = x^3",x=>x**3,"(-∞, ∞)","(-∞, ∞)","cubic, passes through the origin"],["y = √x",x=>Math.sqrt(x),"[0, ∞)","[0, ∞)","starts at (0, 0)",[0,1e9]],["y = |x|",x=>Math.abs(x),"(-∞, ∞)","[0, ∞)","V-shape, vertex (0, 0)"],
   ["y = 2^x",x=>2**x,"(-∞, ∞)","(0, ∞)","asymptote y = 0"],["y = log_2 x",x=>Math.log2(x),"(0, ∞)","(-∞, ∞)","asymptote x = 0",[1e-6,1e9]],["y = {{1|x}}",x=>1/x,"(-∞, 0) ∪ (0, ∞)","(-∞, 0) ∪ (0, ∞)","asymptotes x = 0 and y = 0"],["y = ∛x",x=>Math.cbrt(x),"(-∞, ∞)","(-∞, ∞)","passes through (-1, -1), (0, 0), (1, 1)"]];
   const [e,f,D,R,n,d]=pick(L);
   return {topic:"Parent functions",q:`What are the domain and range of ${e}?`,a:`${n}.<br><b>Domain: ${D}</b>, <b>Range: ${R}</b>.`,g:{f:[{f,d}],xr:[-4,4],yr:[-4,4],cap:e.replace(/\{\{1\|x\}\}/,"1/x")}}; },
 transform(){ const T=pick(["abs","sq","sqrt"]), a=pick([1,-1,2,-2,.5,3]), h=rnd(-4,4), k=rnd(-4,4);
   const base={abs:["|x|",x=>Math.abs(x),"vertex"],sq:["x^2",x=>x*x,"vertex"],sqrt:["√x",x=>Math.sqrt(x),"starting point"]}[T];
   const inner=T==="abs"?`|${lin(1,h)}|`:T==="sq"?`(${lin(1,h)})^2`:`√(${lin(1,h)})`, A=a===.5?"{{1|2}}":coef(a);
   const st=[]; if(h) st.push(`${lin(1,h)} = x - (${h}) → <b>${h>0?"right":"left"} ${Math.abs(h)}</b>`); if(Math.abs(a)!==1) st.push(`|a| = ${a===.5||a===-.5?"{{1|2}}":Math.abs(a)} → vertical ${Math.abs(a)>1?"stretch":"compression"}`); if(a<0) st.push("a < 0 → <b>reflect over the x-axis</b>"); if(k) st.push(`${k>0?"+":"-"} ${Math.abs(k)} → <b>${k>0?"up":"down"} ${Math.abs(k)}</b>`);
   return {topic:"Transformations",q:`Describe y = ${A}${inner}${k?sgn(k):""} compared with y = ${base[0]}. Give the ${base[2]}.`,a:`${st.join(". ")||"No change"}.<br><b>${base[2][0].toUpperCase()+base[2].slice(1)}: (${h}, ${k})</b>.`,
     g:{f:[{f:base[1],light:true,d:T==="sqrt"?[0,1e9]:undefined},{f:x=>a*base[1](x-h)+k,d:T==="sqrt"?[h,1e9]:undefined}],p:[[h,k,`(${h}, ${k})`]],xr:[Math.min(h,0)-5,Math.max(h,0)+5],cy:7,cap:"Gray: parent function."}}; },
 domain(){ const T=rnd(0,2);
   if(T===0){ const a=rnd(-3,4), b=nz(-4,6,[a]); return {topic:"Domain and range",q:`Find the domain of f(x) = {{√(${lin(1,a)})|${lin(1,b)}}}.`,a:`√ needs ${lin(1,a)} ≥ 0 → x ≥ ${a}. Denominator: x ≠ ${b}.<br><b>Domain: ${b>a?`[${a}, ${b}) ∪ (${b}, ∞)`:`[${a}, ∞)`}</b>${b<a?` (x = ${b} is already excluded by x ≥ ${a})`:""}.`}; }
   if(T===1){ const k=rnd(1,5); return {topic:"Domain and range",q:`Find the domain of g(x) = {{${rnd(1,9)}|x^2 - ${k*k}}}.`,a:`Denominator ≠ 0: x^2 - ${k*k} = 0 → x = ±${k}.<br><b>Domain: (-∞, -${k}) ∪ (-${k}, ${k}) ∪ (${k}, ∞)</b>.`}; }
   const c=rnd(-3,6), m=pick([1,2,3]); return {topic:"Domain and range",q:`Find the domain and range of h(x) = √(${c} - ${m===1?"":m}x).`,a:`${c} - ${m===1?"":m}x ≥ 0 → ${m===1?"":m}x ≤ ${c} → x ≤ ${fr(c,m)}.<br><b>Domain: (-∞, ${fr(c,m)}]</b>. A square root is never negative: <b>Range: [0, ∞)</b>.`}; },
 evenodd(){ const T=rnd(0,2); let c;
   if(T===0) c=[pick([1,2,-1]),0,nz(-6,6),0,rnd(-5,5)]; else if(T===1) c=[pick([1,2,-1]),0,nz(-6,6),0]; else c=[1,nz(-4,4),nz(-5,5),rnd(-5,5)];
   const m=neg(c), even=m.every((v,i)=>v===c[i]), odd=m.every((v,i)=>v===-c[i]);
   return {topic:"Even and odd functions",q:`Is f(x) = ${ps(c)} even, odd or neither?`,a:`f(-x) = ${ps(m)}${even?" = f(x).<br><b>Even</b> (symmetric about the y-axis).":odd?` = -(${ps(c)}) = -f(x).<br><b>Odd</b> (symmetric about the origin).`:`. This is neither f(x) nor -f(x).<br><b>Neither</b>.`}`,g:{f:[{f:x=>ev(c,x)}],xr:[-3.5,3.5],cy:10}}; },
 rate(){ const a=nz(-3,3), b=rnd(-5,5), c=rnd(-6,6), p=rnd(-3,2), q=p+rnd(1,4), f=[a,b,c], fp=ev(f,p), fq=ev(f,q);
   return {topic:"Average rate of change",q:`Find the average rate of change of f(x) = ${ps(f)} on [${p}, ${q}].`,a:`f(${q}) = ${fq}, f(${p}) = ${fp}.<br>{{f(${q}) - f(${p})|${q} - (${p})}} = {{${fq} - (${fp})|${q-p}}} = <b>${fr(fq-fp,q-p)}</b>`,
     g:{f:[{f:x=>ev(f,x)}],seg:[[p,fp,q,fq]],p:[[p,fp],[q,fq]],cy:6,cap:"The rate is the slope of the secant line."}}; },
 special(){ const T=rnd(0,1), a=nz(-4,4), b=nz(-4,4), c=rnd(-8,8), k=pick([2,3,-2]);
   const eq=(p,q,r)=>`${coef(p)}x ${q<0?"-":"+"} ${Math.abs(q)===1?"":Math.abs(q)}y = ${r}`;
   if(T===0){ const c2=c*k+nz(-5,5); return {topic:"Special cases",q:`Solve the system: ${eq(a,b,c)} and ${eq(k*a,k*b,c2)}.`,a:`Multiply the first equation by ${k}: ${eq(k*a,k*b,k*c)}. Subtract it from the second: 0 = ${c2-k*c}, which is false.<br><b>No solution</b>: the lines are parallel (same slope, different intercepts).`}; }
   return {topic:"Special cases",q:`Solve the system: ${eq(a,b,c)} and ${eq(k*a,k*b,k*c)}.`,a:`The second equation is ${k} times the first. Subtracting ${k} × (first) gives 0 = 0, which is always true.<br><b>Infinitely many solutions</b>: both equations describe the same line.`}; },
 cramer(){ let a,b,c,d,D; do{ a=nz(-5,5); b=nz(-5,5); c=nz(-5,5); d=nz(-5,5); D=a*d-b*c; }while(!D); const x=rnd(-5,5), y=rnd(-5,5), e=a*x+b*y, f=c*x+d*y, Dx=e*d-b*f, Dy=a*f-e*c;
   const eq=(p,q,r)=>`${coef(p)}x ${q<0?"-":"+"} ${Math.abs(q)===1?"":Math.abs(q)}y = ${r}`;
   const DM=r=>`<span class="mx mxd" style="--n:2">${r.flat().map(v=>`<i>${v}</i>`).join("")}</span>`;
   return {topic:"Cramer's rule (2 × 2)",q:`Use Cramer's rule: <span class="mf-sys"><span>${eq(a,b,e)}</span><span>${eq(c,d,f)}</span></span>`,a:`D = ${DM([[a,b],[c,d]])} = (${a})(${d}) - (${b})(${c}) = <b>${D}</b><br>D<sub>x</sub> = ${DM([[e,b],[f,d]])} = (${e})(${d}) - (${b})(${f}) = ${Dx}<br>D<sub>y</sub> = ${DM([[a,e],[c,f]])} = (${a})(${f}) - (${e})(${c}) = ${Dy}<br>x = {{${Dx}|${D}}} = ${x}, y = {{${Dy}|${D}}} = ${y} → <b>(${x}, ${y})</b>`}; },
 inverse(){ let a,b,c,d,D; do{ a=rnd(1,5); b=rnd(-4,4); c=rnd(-4,4); d=rnd(1,5); D=a*d-b*c; }while(Math.abs(D)!==1&&Math.abs(D)!==2); const x=rnd(-4,4), y=rnd(-4,4), e=a*x+b*y, f=c*x+d*y;
   const M=(m)=>`<span class="mx">${m.map(r=>`<span class="mr">${r.map(v=>`<span class="mc">${v}</span>`).join("")}</span>`).join("")}</span>`;
   return {topic:"Inverse matrices",q:`Solve AX = B with A = ${M([[a,b],[c,d]])} and B = ${M([[e],[f]])}.`,a:`det A = (${a})(${d}) - (${b})(${c}) = ${D}.<br>A<sup>-1</sup> = {{1|${D}}}${M([[d,-b],[-c,a]])} = ${M([[fr(d,D),fr(-b,D)],[fr(-c,D),fr(a,D)]])}.<br>X = A<sup>-1</sup>B = ${M([[fr(d*e-b*f,D)],[fr(-c*e+a*f,D)]])} → <b>x = ${x}, y = ${y}</b>.`}; },
 explog(){ const c=Math.random()<.5?A2EXPLOG._test.randExp():A2EXPLOG._test.randLog();
   return {topic:"Graphs of exponentials and logs",q:c.q,a:`<ol class="el-steps">${c.steps.map(s=>`<li>${s}</li>`).join("")}</ol>`+c.rows.map(([k,v])=>`<b>${k}:</b> ${v}`).join(" · "),g:c.g}; },
 triangles(){ const T=rnd(0,1), s=rnd(2,9);
   if(T===0){ const leg=pick([0,1]); return leg?{topic:"Special right triangles",q:`A 45°-45°-90° triangle has legs of length ${s}. Find the hypotenuse.`,a:`Hypotenuse = leg · √2 = <b>${s}√2</b> ≈ ${(s*Math.SQRT2).toFixed(3)}.`}
     :{topic:"Special right triangles",q:`A 45°-45°-90° triangle has hypotenuse ${2*s}. Find each leg.`,a:`Leg = {{hypotenuse|√2}} = {{${2*s}|√2}} = {{${2*s}√2|2}} = <b>${s}√2</b>.`}; }
   const w=rnd(0,2); return w===0?{topic:"Special right triangles",q:`In a 30°-60°-90° triangle the short leg is ${s}. Find the other sides.`,a:`Long leg = short · √3 = <b>${s}√3</b>; hypotenuse = 2 · short = <b>${2*s}</b>.`}
     :w===1?{topic:"Special right triangles",q:`In a 30°-60°-90° triangle the hypotenuse is ${2*s}. Find both legs.`,a:`Short leg = {{hyp|2}} = <b>${s}</b>; long leg = ${s}√3 = <b>${s}√3</b>.`}
     :{topic:"Special right triangles",q:`In a 30°-60°-90° triangle the long leg is ${s}√3. Find the other sides.`,a:`Short leg = {{long leg|√3}} = <b>${s}</b>; hypotenuse = 2 · ${s} = <b>${2*s}</b>.`}; }
};
if(!document.getElementById("mgcss")){ const st=document.createElement("style"); st.id="mgcss"; st.textContent=".mx{display:inline-flex;flex-direction:column;vertical-align:middle;border-left:1.5px solid #111;border-right:1.5px solid #111;padding:1px 6px;margin:0 3px;line-height:1.35;background:linear-gradient(#111,#111) left top/6px 1.5px no-repeat,linear-gradient(#111,#111) left bottom/6px 1.5px no-repeat,linear-gradient(#111,#111) right top/6px 1.5px no-repeat,linear-gradient(#111,#111) right bottom/6px 1.5px no-repeat}.mx .mr{display:flex;gap:10px;justify-content:space-between}.mx:has(>.mr){display:inline-flex!important;flex-direction:column!important;row-gap:.1em}.mx>.mr{display:flex!important;gap:10px;justify-content:space-between}.mx .mc{min-width:14px;text-align:center}"; document.head.appendChild(st); }
const MAP={"Parent functions":"parent","Transformations":"transform","Domain and range":"domain","Even and odd functions":"evenodd","Average rate of change":"rate","Special cases":"special","Cramer's rule (2 × 2)":"cramer","Inverse matrices":"inverse","Graphs of exponentials and logs":"explog","Special right triangles":"triangles"};
for(const L of Object.values(A2CHEAT.all)) L.forEach(c=>{ if(!c.gen&&MAP[c.t]) c.gen="x:"+MAP[c.t]; });
const orig=A2GEN.build;
A2GEN.build=function(us,n,tp){ if(us&&us[0]==="x"&&MG[tp]) return [MG[tp]()]; return orig.apply(this,arguments); };
window.A2MOREGEN={MG};
})();
