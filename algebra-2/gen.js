// Algebra 2 Honors: Quick Quiz generators (new numbers every time, full step-by-step solutions)
(function(){
/* ---------------- helpers ---------------- */
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const RN=(a,b)=>{let v;do v=R(a,b);while(v===0);return v;};
const P=a=>a[Math.floor(Math.random()*a.length)];
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a;};
const SH=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const sg=c=>c<0?` - ${-c}`:` + ${c}`;              // " + 5" / " - 5"
const par=n=>n<0?`(${n})`:`${n}`;                  // wrap negatives
function fr(n,d){ if(d<0){n=-n;d=-d;} const g=gcd(n,d)||1; n/=g; d/=g; return d===1?`${n}`:`${n<0?"-":""}{{${Math.abs(n)}|${d}}}`; }
const frPy=(n,d)=>`Rational(${n},${d})`;
function tl(terms){ // [[coef,"x^2"],[coef,""]] → "3x^2 - x + 4"
  let s=""; for(const [c,v] of terms){ if(!c) continue; const mag=Math.abs(c); const body=(mag===1&&v?"":mag)+v;
    s+= s===""?(c<0?"-":"")+body:(c<0?" - ":" + ")+body; } return s||"0"; }
function poly(cs,v="x"){ const n=cs.length-1; return tl(cs.map((c,i)=>[c,n-i===0?"":n-i===1?v:`${v}^${n-i}`])); }
const bin=(p,q,v="x")=>`(${poly([p,q],v)})`;
const cx=p=>p===1?"x":p===-1?"-x":p+"x";
function simp(n){ let k=1,m=n; for(let f=2;f*f<=m;f++) while(m%(f*f)===0){k*=f;m/=f*f;} return [k,m]; }
const isSq=n=>n>=0&&Math.round(Math.sqrt(n))**2===n;
function cplx(re,im){ // integers
  if(!im) return `${re}`; const ip=Math.abs(im)===1?"i":Math.abs(im)+"i";
  if(!re) return (im<0?"-":"")+ip; return `${re}${im<0?" - ":" + "}${ip}`; }
function cplxF(rn,inn,d){ // (rn + inn i)/d with fractions
  const re=rn?fr(rn,d):""; let im="";
  if(inn){ const g=gcd(inn,d), n=Math.abs(inn)/g, dd=d/g; im=(dd===1?(n===1?"":n):`{{${n}|${dd}}}`)+"i"; }
  if(!inn) return re||"0"; if(!rn) return (inn<0?"-":"")+im; return `${re}${inn<0?" - ":" + "}${im}`; }
const C=(n,k)=>{let r=1;for(let i=1;i<=k;i++)r=r*(n-k+i)/i;return Math.round(r);};
const ans=s=>`<b>Answer: ${s}</b>`;
const sgz=c=>c?sg(c):""; const cf=c=>c===1?"":c===-1?"-":`${c}`; const sqr=h=>h?`(${poly([1,-h])})^2`:"x^2";
const PL=()=>window.A2PLOT, PF=cs=>x=>cs.reduce((s,c)=>s*x+c,0);
function FG(cs,zs,cap){ zs=[...new Set(zs.map(z=>+z.toFixed(9)))].sort((a,b)=>a-b); const f=PF(cs);
  const lo=Math.min(...zs)-1, hi=Math.max(...zs)+1; let mx=0; for(let i=0;i<=80;i++){ mx=Math.max(mx,Math.abs(f(lo+(hi-lo)*i/80))); }
  return {f:[f],p:zs.map(z=>[z,0,`x = ${PL().num(z)}`]),cy:Math.max(6,mx*1.15),cap:cap||"Graph check: the x-intercepts match the factors."}; }
const QR=(a,b,c)=>{const D=b*b-4*a*c; return D<0?[]:[(-b-Math.sqrt(D))/(2*a),(-b+Math.sqrt(D))/(2*a)];};
const J=a=>a.join("<br>");

/* ================= UNIT 1 ================= */
function absEq(){
  const p=P([1,1,2,3]), q=RN(-9,9), A=P([1,1,2,3]), c=P([0,0,RN(-9,9)]);
  const none=Math.random()<0.12, r=none?-R(1,6):R(1,10), d=A*r+c, inn=poly([p,q]);
  const lhs=`${A>1?A:""}|${inn}|${c?sg(c):""}`, st=[];
  if(c) st.push(`<b>Isolate the absolute value.</b> ${c>0?"Subtract "+c:"Add "+(-c)}: ${A>1?A:""}|${inn}| = ${d-c}`);
  if(A>1) st.push(`Divide by ${A}: |${inn}| = ${r}`);
  if(!c&&A===1) st.push(`The absolute value is already alone.`);
  const py=`${A}*Abs(${p}*x+(${q}))+(${c})-(${d})`;
  const gr={f:[x=>A*Math.abs(p*x+q)+c],h:[d],p:none?[]:[[(r-q)/p,d],[(-r-q)/p,d]],cap:none?`The graph never reaches the line y = ${d}: no solution.`:`The solutions are where the V meets the line y = ${d}.`};
  if(none){ st.push(`An absolute value is a distance, so it can never equal a negative number.`, ans("no solution")); return {g:gr,q:`Solve ${lhs} = ${d}.`,a:J(st),ck:{t:"solr",py,s:[]}}; }
  const cs=(rr)=>p===1?`${inn} = ${rr} → x = ${fr(rr-q,p)}`:`${inn} = ${rr} → ${p}x = ${rr-q} → x = ${fr(rr-q,p)}`;
  st.push(`<b>Case 1:</b> ${cs(r)}`,`<b>Case 2:</b> ${cs(-r)}`,ans(`x = ${fr(-r-q,p)} or x = ${fr(r-q,p)}`));
  return {g:gr,q:`Solve ${lhs} = ${d}.`,a:J(st),ck:{t:"solr",py,s:[[r-q,p],[-r-q,p]]}};
}
function absIneq(){
  const out=Math.random()<0.5, strict=Math.random()<0.5, p=P([1,2,3,4]), q=RN(-9,9), r=R(1,10), A=P([1,1,2,3]), c=P([0,0,RN(-8,8)]);
  const d=A*r+c, inn=poly([p,q]), sym=out?(strict?">":"≥"):(strict?"<":"≤"), opp=out?(strict?"<":"≤"):sym;
  const lo=fr(-r-q,p), hi=fr(r-q,p), st=[];
  if(c) st.push(`<b>Isolate.</b> ${c>0?"Subtract "+c:"Add "+(-c)}: ${A>1?A:""}|${inn}| ${sym} ${d-c}`);
  if(A>1) st.push(`Divide by ${A}: |${inn}| ${sym} ${r}`);
  if(!out){
    st.push(`“Less than” means <b>between</b>: -${r} ${sym} ${inn} ${sym} ${r}`);
    st.push(`${q>0?"Subtract "+q:"Add "+(-q)} from all three parts: ${-r-q} ${sym} ${p===1?"x":p+"x"} ${sym} ${r-q}`);
    if(p>1) st.push(`Divide all three parts by ${p}: ${lo} ${sym} x ${sym} ${hi}`);
    st.push(ans(`${lo} ${sym} x ${sym} ${hi}, or ${strict?"(":"["}${lo}, ${hi}${strict?")":"]"}`));
  } else {
    st.push(`“Greater than” means <b>outside</b>, so split with “or”:`);
    st.push(`${inn} ${opp} -${r} → ${p===1?"x":p+"x"} ${opp} ${-r-q}${p>1?` → x ${opp} ${lo}`:""}`);
    st.push(`${inn} ${sym} ${r} → ${p===1?"x":p+"x"} ${sym} ${r-q}${p>1?` → x ${sym} ${hi}`:""}`);
    st.push(ans(`x ${opp} ${lo} or x ${sym} ${hi}, or (-∞, ${lo}${strict?")":"]"} ∪ ${strict?"(":"["}${hi}, ∞)`));
  }
  const py=`${A}*Abs(${p}*x+(${q}))+(${c}) ${out?(strict?">":">="):(strict?"<":"<=")} ${d}`;
  const L=frPy(-r-q,p), H=frPy(r-q,p);
  const s=out?`Union(Interval(-oo,${L},True,${strict?"True":"False"}),Interval(${H},oo,${strict?"True":"False"},True))`:`Interval(${L},${H},${strict?"True":"False"},${strict?"True":"False"})`;
  const Ln=(-r-q)/p,Hn=(r-q)/p; const gr={f:[x=>Math.abs(p*x+q)],h:[r],p:[[Ln,r,'',strict],[Hn,r,'',strict]],xi:out?[[-Infinity,Ln,false,!strict],[Hn,Infinity,!strict,false]]:[[Ln,Hn,!strict,!strict]],cap:`y = |${inn}| and the line y = ${r}. The shaded part of the x-axis is the solution.`};
  return {g:gr,q:`Solve ${A>1?A:""}|${inn}|${c?sg(c):""} ${sym} ${d}. Give the answer in interval notation.`,a:J(st),ck:{t:"ineq",py,s}};
}
function writeAbs(){
  const mid=R(-6,6), rad=R(1,8), lo=mid-rad, hi=mid+rad, kind=R(0,2);
  const iv=kind===0?`${lo} ≤ x ≤ ${hi}`:kind===1?`${lo} < x < ${hi}`:`x < ${lo} or x > ${hi}`;
  const sym=kind===0?"≤":kind===1?"<":">";
  const res=`|${poly([1,-mid])}| ${sym} ${rad}`;
  const gr={nl:true,xi:kind===2?[[-Infinity,lo,false,false],[hi,Infinity,false,false]]:[[lo,hi,kind===0,kind===0]],p:[[mid,0,`center ${PL().num(mid)}`,true]],cap:`Center ${mid}, distance ${rad} each way.`};
  return {g:gr,q:`Write an absolute value inequality whose solution is ${iv}.`,
    a:J([`<b>Center</b> (midpoint): {{${lo} + ${par(hi)}|2}} = ${mid}`,`<b>Distance</b> from the center to an endpoint: ${rad}`,
      kind===2?`The solution is <b>outside</b> the interval, so use “>”.`:`The solution is <b>between</b> the endpoints, so use “${sym}”.`,ans(res)])};
}
function absBoth(){
  let p,r; do{p=R(1,4);r=R(1,4);}while(p===r);
  const q=RN(-9,9), s=RN(-9,9), A=poly([p,q]), B=poly([r,s]);
  const st=[`Two absolute values are equal when the insides are <b>equal</b> or <b>opposites</b>.`,
   `<b>Case 1:</b> ${A} = ${B} → ${cx(p-r)} = ${s-q} → x = ${fr(s-q,p-r)}`,
   `<b>Case 2:</b> ${A} = -(${B}) → ${A} = ${poly([-r,-s])} → ${cx(p+r)} = ${-s-q} → x = ${fr(-s-q,p+r)}`,
   ans(`x = ${fr(s-q,p-r)} or x = ${fr(-s-q,p+r)}`)];
  const ya=(s-q)/(p-r),yb=(-s-q)/(p+r); const gr={f:[x=>Math.abs(p*x+q),{f:x=>Math.abs(r*x+s),light:true}],p:[[ya,Math.abs(p*ya+q)],[yb,Math.abs(p*yb+q)]],cap:`Black: y = |${A}|. Gray: y = |${B}|. They cross at the solutions.`};
  return {g:gr,adv:true,q:`Solve |${A}| = |${B}|.`,a:J(st),ck:{t:"solr",py:`Abs(${p}*x+(${q}))-Abs(${r}*x+(${s}))`,s:[[s-q,p-r],[-s-q,p+r]]}};
}
function slope(){
  let x1,x2,y1,y2; do{x1=R(-8,8);x2=R(-8,8);y1=R(-9,9);y2=R(-9,9);}while(x1===x2);
  const dy=y2-y1, dx=x2-x1, m=fr(dy,dx);
  const gr={f:[x=>y1+dy/dx*(x-x1)],p:[[x1,y1],[x2,y2]],seg:[[x1,y1,x2,y1],[x2,y1,x2,y2]],cap:`Run = ${dx}, rise = ${dy} (dashed).`};
  return {g:gr,q:`Find the slope of the line through (${x1}, ${y1}) and (${x2}, ${y2}).`,
    a:J([`m = {{y₂ - y₁|x₂ - x₁}} = {{${y2} - ${par(y1)}|${x2} - ${par(x1)}}} ${dx===1?"":` = {{${dy}|${dx}}}`}`,ans(`m = ${m}`)+(dy===0?" (a horizontal line)":"")])};
}
function line2(){
  const m=RN(-5,5), b=R(-9,9), x1=R(-5,5); let x2; do x2=R(-5,5); while(x2===x1);
  const y1=m*x1+b, y2=m*x2+b, res=poly([m,b]);
  const gr={f:[x=>m*x+b],p:[[x1,y1],[x2,y2],...(b!==y1&&b!==y2?[[0,b,`y-intercept (0, ${PL().num(b)})`]]:[])]};
  return {g:gr,q:`Write the equation (in slope-intercept form) of the line through (${x1}, ${y1}) and (${x2}, ${y2}).`,
    a:J([`<b>Slope:</b> m = {{${y2} - ${par(y1)}|${x2} - ${par(x1)}}} = {{${y2-y1}|${x2-x1}}} = ${m}`,
      `<b>Point-slope</b> with (${x1}, ${y1}): ${x1||y1?`y${sg(-y1).replace(" + 0","")} = ${m===1?"":m===-1?"-":m}(${poly([1,-x1])})`:`y = ${cx(m)}`}`,
      `Distribute and solve for y: y = ${poly([m,-m*x1])}${y1?sg(y1):""}`, ans(`y = ${res}`), `Check with (${x2}, ${y2}): ${m}(${x2})${sgz(b)} = ${y2} ✓`]),
    ck:{t:"pts",f:res,pts:[[x1,y1],[x2,y2]]}};
}
function lineStr(mn,md,bn,bd){ // y = (mn/md)x + bn/bd
  const g=gcd(mn,md); mn/=g; md/=g; if(md<0){mn=-mn;md=-md;}
  let s; if(md===1) s=cx(mn); else s=`${mn<0?"-":""}{{${Math.abs(mn)}|${md}}}x`;
  if(bn){ const f=fr(Math.abs(bn),Math.abs(bd)); s+=((bn<0)!==(bd<0)?" - ":" + ")+f; }
  return s;
}
function parPerp(){
  let A,B; do{A=RN(-6,6);B=RN(-6,6);}while(gcd(A,B)!==1);
  const Cc=R(-12,12), perp=Math.random()<0.6, x0=R(-6,6), y0=R(-6,6);
  const sn=-A, sd=B; const mn=perp?B:-A, md=perp?A:B; // new slope
  const bn=y0*md-mn*x0, bd=md;
  const res=lineStr(mn,md,bn,bd);
  const gr={f:[{f:x=>(Cc-A*x)/B,dash:true},x=>mn/md*x+bn/bd],p:[[x0,y0]],eq:true,cap:`Dashed: the given line. Solid: the ${perp?'perpendicular':'parallel'} line through (${x0}, ${y0}).`};
  return {g:gr,q:`Write the equation of the line ${perp?"perpendicular":"parallel"} to ${tl([[A,"x"],[B,"y"]])} = ${Cc} that passes through (${x0}, ${y0}).`,
    a:J([`<b>Slope of the given line:</b> solve for y: ${B===1?"y":B===-1?"-y":B+"y"} = ${tl([[-A,"x"],[Cc,""]])}, so m = ${fr(sn,sd)}.`,
      perp?`<b>Perpendicular:</b> flip and change the sign → m = ${fr(mn,md)}`:`<b>Parallel:</b> same slope → m = ${fr(mn,md)}`,
      `<b>Find b:</b> ${y0} = (${fr(mn,md)})(${x0}) + b → b = ${fr(bn,bd)}`, ans(`y = ${res}`)]),
    ck:{t:"lin",f:res,x0,y0,m:[mn,md]}};
}
function sys3(){
  for(;;){
    const X=R(-4,4),Y=R(-4,4),Z=R(-4,4);
    const a=[RN(-3,3),RN(-3,3),RN(-3,3)], b=[RN(-3,3),RN(-3,3),RN(-3,3)], zc=[1,-1,1];
    const Ax=a[0]+a[1], Ay=b[0]+b[1], Bx=a[1]+a[2], By=b[1]+b[2];
    const det=Ax*By-Bx*Ay; if(!det||!Ay||!Ax||!Bx||!By) continue;
    const d=[0,1,2].map(i=>a[i]*X+b[i]*Y+zc[i]*Z), Ad=d[0]+d[1], Bd=d[1]+d[2];
    const eq=i=>`${tl([[a[i],"x"],[b[i],"y"],[zc[i],"z"]])} = ${d[i]}`;
    const st=[`Label the equations (1), (2), (3). The z-terms are +z, -z, +z, so adding pairs eliminates z.`,
      `(1) + (2): ${tl([[Ax,"x"],[Ay,"y"]])} = ${Ad} &nbsp; (A)`,`(2) + (3): ${tl([[Bx,"x"],[By,"y"]])} = ${Bd} &nbsp; (B)`,
      `Eliminate y: multiply (A) by ${par(By)} and (B) by ${par(Ay)}, then subtract: ${cf(det)}x = ${Ad*By-Bd*Ay} → x = ${X}`,
      `Substitute into (A): ${Ax}(${X}) + ${par(Ay)}y = ${Ad} → ${cf(Ay)}y = ${Ad-Ax*X} → y = ${Y}`,
      `Substitute into (1): ${a[0]}(${X}) + ${par(b[0])}(${Y}) + z = ${d[0]} → z = ${Z}`,ans(`(${X}, ${Y}, ${Z})`),
      `Check in (3): ${a[2]}(${X}) + ${par(b[2])}(${Y}) + ${par(Z)} = ${d[2]} ✓`];
    return {adv:true,q:`Solve the system: ${eq(0)}, &nbsp; ${eq(1)}, &nbsp; ${eq(2)}.`,a:J(st),ck:{t:"sys",eqs:[0,1,2].map(eq),s:[X,Y,Z]}};
  }
}
function pwEval(){
  const c=R(-2,3), m=RN(-4,4), b=R(-6,6), a=P([1,-1,2]), k=R(-5,5);
  const f1=poly([m,b]), f2=poly([a,0,k]);
  const xs=SH([c-R(1,4),c,c+R(1,3)]);
  const ev=x=>x<c?[1,m*x+b]:[2,a*x*x+k];
  const lines=xs.map(x=>{const [pc,v]=ev(x); return pc===1?`f(${x}): ${x} < ${c}, so use ${f1} → ${m}(${x})${b?sg(b):""} = <b>${v}</b>`:`f(${x}): ${x} ≥ ${c}, so use ${f2} → ${a===1?"":a===-1?"-":a}(${x})^2${k?sg(k):""} = <b>${v}</b>`;});
  const gr={f:[{f:x=>m*x+b,d:[-1e9,c]},{f:x=>a*x*x+k,d:[c,1e9]}],p:[[c,m*c+b,'',true],[c,a*c*c+k,''],...xs.map(x=>[x,ev(x)[1]])],cap:'Open circle: not included. Closed circle: included.'};
  return {g:gr,q:`f(x) = { ${f1} if x < ${c}; &nbsp; ${f2} if x ≥ ${c} }. Find ${xs.map(x=>`f(${x})`).join(", ")}.`,a:J([`Decide which piece each input uses, then substitute into that piece only.`,...lines])};
}
function contK(){
  const c=R(-3,3), m=RN(-4,4), b=R(-6,6), k=m*c+b-c*c;
  const gr={f:[{f:x=>x*x+k,d:[-1e9,c]},{f:x=>m*x+b,d:[c,1e9]}],p:[[c,m*c+b,`(${c}, ${m*c+b}): the pieces meet`]],cap:`With k = ${k} there is no jump at x = ${c}.`};
  return {g:gr,q:`Find k so that h(x) = { x^2 + k if x < ${c}; &nbsp; ${poly([m,b])} if x ≥ ${c} } is continuous.`,
    a:J([`For continuity, both pieces must give the same value at x = ${c}.`,`Left piece: (${c})^2 + k = ${c*c} + k`,`Right piece: ${m}(${c})${b?sg(b):""} = ${m*c+b}`,`${c*c} + k = ${m*c+b}`,ans(`k = ${k}`)])};
}

/* ================= UNIT 2: factoring ================= */
function gcfF(){
  const g=R(2,6), k=R(1,3); let inn; do inn=[R(1,7),RN(-9,9),P([0,RN(-9,9)])]; while(gcd(gcd(inn[0],inn[1]),inn[2])!==1);
  if(!inn[2]) inn.pop();
  const full=inn.map(c=>c*g), n=inn.length-1; const ex=poly([...full,...Array(k).fill(0)]);
  const G=`${g}x${k>1?"^"+k:""}`, res=`${G}(${poly(inn)})`;
  const divs=full.map((c,i)=>{const d=n-i+k; return `${tl([[c,d===1?"x":"x^"+d]])} ÷ ${G} = ${tl([[inn[i],n-i===0?"":n-i===1?"x":"x^"+(n-i)]])}`;});
  const rr=inn.length===2?[-inn[1]/inn[0]]:QR(...inn), rat=inn.length===2||isSq(inn[1]*inn[1]-4*inn[0]*inn[2]); const gr=FG([...full,...Array(k).fill(0)],[0,...rr],rat?null:(rr.length?'Graph check: x = 0 comes from the GCF. The other zeros are irrational, so the trinomial does not factor over the integers.':'Graph check: x = 0 comes from the GCF. The trinomial has no real zeros, so it does not factor.'));
  return {g:gr,q:`Factor ${ex}.`,a:J([`<b>GCF:</b> the largest number dividing ${full.map(Math.abs).join(", ")} is ${g}; the lowest power of x is x${k>1?"^"+k:""}. GCF = ${G}.`,...divs,ans(res)]),ck:{t:"id",l:ex,r:res}};
}
function tri1(){
  let p,q; do{p=RN(-12,12);q=RN(-12,12);}while(p+q===0||Math.abs(p*q)>99);
  const g=Math.random()<0.25?R(2,4):1, b=p+q, c=p*q, ex=poly([g,g*b,g*c]);
  const st=[]; if(g>1) st.push(`<b>GCF first:</b> ${g}(${poly([1,b,c])})`);
  st.push(`Find two numbers that <b>multiply to ${c}</b> and <b>add to ${b}</b>.`);
  st.push(c>0?`The product is positive, so both numbers have the same sign as ${b} (${b>0?"both positive":"both negative"}).`:`The product is negative, so the signs are different; the larger number is ${b>0?"positive":"negative"}.`);
  st.push(`${p} · ${par(q)} = ${c} ✓ &nbsp; ${p} + ${par(q)} = ${b} ✓`);
  const f=p===q?`${bin(1,p)}^2`:`${bin(1,p)}${bin(1,q)}`, res=(g>1?g:"")+f;
  st.push(ans(res));
  const gr=FG([g,g*b,g*c],[-p,-q]);
  return {g:gr,q:`Factor ${ex}${g>1?" completely":""}.`,a:J(st),ck:{t:"id",l:ex,r:res}};
}
function acParts(){ let a,b,c,d; do{a=R(1,5);c=R(1,5);b=RN(-9,9);d=RN(-9,9);}while(a*c<2||gcd(a,b)!==1||gcd(c,d)!==1||a*d+b*c===0); return [a,b,c,d]; }
function acSteps(a,b,c,d){
  const A=a*c,B=a*d+b*c,Cc=b*d, n1=a*d, n2=b*c;
  return {A,B,Cc,st:[`a·c = ${A}·${par(Cc)} = ${A*Cc}. Find two numbers that multiply to ${A*Cc} and add to ${B}: <b>${n1} and ${n2}</b>.`,
    `Split the middle term: ${poly([A,n1])}${n2<0?" - ":" + "}${Math.abs(n2)===1?"":Math.abs(n2)}x${sg(Cc)}`,
    `Group: ${cx(a)}(${poly([c,d])})${b<0?" - ":" + "}${Math.abs(b)}(${poly([c,d])})`], f:`${bin(a,b)}${bin(c,d)}`};
}
function triAC(){
  const [a,b,c,d]=acParts(); const g=Math.random()<0.25?P([2,3]):1; const S=acSteps(a,b,c,d);
  const ex=poly([g*S.A,g*S.B,g*S.Cc]), st=[]; if(g>1) st.push(`<b>GCF first:</b> ${g}(${poly([S.A,S.B,S.Cc])})`);
  const res=(g>1?g:"")+(a===c&&b===d?`${bin(a,b)}^2`:S.f);
  const gr=FG([g*S.A,g*S.B,g*S.Cc],[-b/a,-d/c]);
  return {g:gr,q:`Factor ${ex}${g>1?" completely":""}.`,a:J([...st,...S.st,ans(res)]),ck:{t:"id",l:ex,r:res}};
}
function factorFull(){
  const [a,b,c,d]=acParts(); const g=R(2,4), S=acSteps(a,b,c,d);
  const ex=poly([g*S.A,g*S.B,g*S.Cc,0]), res=`${g}x${S.f}`;
  const gr=FG([g*S.A,g*S.B,g*S.Cc,0],[0,-b/a,-d/c]);
  return {g:gr,adv:true,q:`Factor ${ex} completely.`,a:J([`<b>GCF:</b> ${g}x(${poly([S.A,S.B,S.Cc])})`,...S.st,ans(res)]),ck:{t:"id",l:ex,r:res}};
}
function diffSq(){
  let p,q; do{p=R(1,9);q=R(1,12);}while(gcd(p,q)!==1);
  const g=Math.random()<0.3?P([2,3,5]):1, yv=Math.random()<0.25;
  const v=yv?"y":"", ex=`${g*p*p===1?"":g*p*p}x^2 - ${yv&&g*q*q===1?"":g*q*q}${yv?"y^2":""}`;
  const a1=`${p===1?"":p}x`, b1=`${q===1&&yv?"":q}${v}`, res=`${g>1?g:""}(${a1} - ${b1})(${a1} + ${b1})`;
  const st=[]; if(g>1) st.push(`<b>GCF first:</b> ${g}(${p*p===1?"":p*p}x^2 - ${yv&&q*q===1?"":q*q}${yv?"y^2":""})`);
  st.push(`Difference of squares: (${a1})^2 - (${b1})^2, so a = ${a1}, b = ${b1}.`,`a^2 - b^2 = (a - b)(a + b)`,ans(res));
  const gr=yv?null:FG([g*p*p,0,-g*q*q],[q/p,-q/p]);
  return {g:gr,q:`Factor ${ex}${g>1?" completely":""}.`,a:J(st),ck:{t:"id",l:ex,r:res}};
}
function perfSq(){
  let p,q; do{p=R(1,6);q=RN(-9,9);}while(gcd(p,q)!==1);
  const ex=poly([p*p,2*p*q,q*q]), a1=p===1?"x":p+"x", res=`(${poly([p,q])})^2`;
  const gr=FG([p*p,2*p*q,q*q],[-q/p],'Graph check: one x-intercept (a double root), so the trinomial is a perfect square.');
  return {g:gr,q:`Factor ${ex}.`,a:J([`First term: ${p*p===1?"":p*p}x^2 = (${a1})^2. Last term: ${q*q} = ${Math.abs(q)}^2.`,
    `Middle check: 2 · ${a1} · ${Math.abs(q)} = ${Math.abs(2*p*q)}x ✓ (sign ${q<0?"minus":"plus"})`,`So it is a perfect square trinomial (a ${q<0?"-":"+"} b)^2.`,ans(res)]),ck:{t:"id",l:ex,r:res}};
}
function cubes(){
  let p,q; do{p=R(1,4);q=R(1,6);}while(gcd(p,q)!==1);
  const s=P([1,-1]), g=Math.random()<0.25?P([2,3]):1, a1=p===1?"x":p+"x";
  const inner=`${p**3===1?"":p**3}x^3${s>0?" + ":" - "}${q**3}`, ex=g>1?`${g*p**3}x^3${s>0?" + ":" - "}${g*q**3}`:inner;
  const tri=poly([p*p,-s*p*q,q*q]), res=`${g>1?g:""}(${a1}${s>0?" + ":" - "}${q})(${tri})`;
  const st=[]; if(g>1) st.push(`<b>GCF first:</b> ${g}(${inner})`);
  st.push(`${s>0?"Sum":"Difference"} of cubes: a = ${a1} (since (${a1})^3 = ${p**3===1?"":p**3}x^3), b = ${q} (since ${q}^3 = ${q**3}).`,
    s>0?`a^3 + b^3 = (a + b)(a^2 - ab + b^2) &nbsp; (SOAP: Same, Opposite, Always Positive)`:`a^3 - b^3 = (a - b)(a^2 + ab + b^2) &nbsp; (SOAP: Same, Opposite, Always Positive)`,
    `a^2 = ${p*p===1?"":p*p}x^2, &nbsp; ab = ${p*q===1?"":p*q}x, &nbsp; b^2 = ${q*q}`,ans(res));
  const gr=FG([g*p**3,0,0,s*g*q**3],[-s*q/p],'Graph check: the only real zero comes from the linear factor; the quadratic factor has no real zeros.');
  return {g:gr,q:`Factor ${ex}${g>1?" completely":""}.`,a:J(st),ck:{t:"id",l:ex,r:res}};
}
function grouping(){
  let a,b; do{a=R(1,4);b=RN(-9,9);}while(gcd(a,b)!==1);
  const k=R(1,6), c=Math.random()<0.5?-k*k:P([1,2,3,5,6,7,k*k]);
  const ex=poly([a,b,a*c,b*c]), f1=poly([a,b]);
  const st=[`Four terms → group: (${poly([a,b,0,0])}) + (${poly([a*c,b*c])})`,`= x^2(${f1})${c<0?" - ":" + "}${Math.abs(c)}(${f1})`,`= (${f1})(${poly([1,0,c])})`];
  let res=`(${f1})(${poly([1,0,c])})`;
  if(c<0){ res=`(${f1})(x - ${k})(x + ${k})`; st.push(`x^2 - ${k*k} is a difference of squares: (x - ${k})(x + ${k})`); }
  st.push(ans(res));
  const gr=FG([a,b,a*c,b*c],[-b/a,...(c<0?[k,-k]:[])]);
  return {g:gr,q:`Factor ${ex} completely.`,a:J(st),ck:{t:"id",l:ex,r:res}};
}
function quadForm(){
  const sq=[1,4,9,16,25]; let p,q; do{p=P(sq);q=Math.random()<0.3?-P([1,2,3,4,9]):P(sq);}while(p===q);
  const ex=poly([1,0,-(p+q),0,p*q]);
  const fx=t=>{ if(t<0) return `(x^2 + ${-t})`; const r=Math.sqrt(t); return `(x - ${r})(x + ${r})`; };
  const st=[`Let u = x^2: ${poly([1,-(p+q),p*q],"u")}`,`Find two numbers that multiply to ${p*q} and add to ${-(p+q)}: ${-p} and ${-q} → (u - ${p})(u${sg(-q)})`,
    `Substitute back: (x^2 - ${p})(${poly([1,0,-q])})`];
  const res=fx(p)+fx(q); st.push(`Factor each difference of squares${q<0?" (a sum of squares stays as it is)":""}.`,ans(res));
  const gr=FG([1,0,-(p+q),0,p*q],[Math.sqrt(p),-Math.sqrt(p),...(q>0?[Math.sqrt(q),-Math.sqrt(q)]:[])]);
  return {g:gr,adv:true,q:`Factor ${ex} completely.`,a:J(st),ck:{t:"id",l:ex,r:res}};
}
/* ---- solving ---- */
function solveFac(){
  const [a,b,c,d]=acParts(); const A=a*c,B=a*d+b*c,Cc=b*d, move=Math.random()<0.4;
  const eq=move?`${poly([A,B,0])} = ${-Cc}`:`${poly([A,B,Cc])} = 0`;
  const st=[]; if(move) st.push(`<b>Set the equation equal to 0 first:</b> ${poly([A,B,Cc])} = 0`);
  st.push(`Factor: ${bin(a,b)}${bin(c,d)} = 0`,`Zero product property: ${poly([a,b])} = 0 or ${poly([c,d])} = 0`);
  const s1=fr(-b,a), s2=fr(-d,c); st.push(ans(s1===s2?`x = ${s1} (double root)`:`x = ${s1} or x = ${s2}`));
  const gr=PL().parab(A,B,Cc,{cap:'The solutions are the x-intercepts.'});
  return {g:gr,q:`Solve ${eq}.`,a:J(st),ck:{t:"sol",eq,s:[s1,s2]}};
}
function sqrtForm(k,neg){ const [a,b]=simp(k); return b===1?`${a}${neg?"i":""}`:`${a===1?"":a}${neg?"i":""}√${b}`; }
function compSq(){
  const h=RN(-6,6), b=2*h, c=R(-15,15), k=h*h-c, eq=`${poly([1,b,c])} = 0`;
  const st=[`Move the constant: ${poly([1,b])} = ${-c}`,`Half of ${b} is ${h}; ${par(h)}^2 = ${h*h}. Add ${h*h} to both sides:`,
    `${poly([1,b])} + ${h*h} = ${-c} + ${h*h} → (${poly([1,h])})^2 = ${k}`];
  let s;
  if(k===0){ st.push(`${poly([1,h])} = 0`); s=[`${-h}`]; st.push(ans(`x = ${-h} (double root)`)); }
  else if(k>0&&isSq(k)){ const r=Math.sqrt(k); st.push(`${poly([1,h])} = ±${r}`); s=[`${-h+r}`,`${-h-r}`]; st.push(ans(`x = ${-h+r} or x = ${-h-r}`)); }
  else { const rf=sqrtForm(Math.abs(k),k<0); st.push(`${poly([1,h])} = ±√(${k}) = ±${rf}`); s=[`${-h} + ${rf}`,`${-h} - ${rf}`]; st.push(ans(`x = ${-h} ± ${rf}`)); }
  const gr=PL().parab(1,b,c);
  return {g:gr,q:`Solve ${eq} by completing the square.`,a:J(st),ck:{t:"sol",eq,s}};
}
function qFormula(){
  let a,b,c,D; do{a=R(2,5);b=R(-9,9);c=RN(-9,9);D=b*b-4*a*c;}while(D===0||(isSq(D)&&Math.random()<0.6));
  const eq=`${poly([a,b,c])} = 0`, st=[`a = ${a}, b = ${b}, c = ${c}`,`Discriminant: b^2 - 4ac = ${par(b)}^2 - 4(${a})(${c}) = ${D}`];
  st.push(`x = {{-b ± √(b^2 - 4ac)|2a}} = {{${-b} ± √(${D})|${2*a}}}`);
  let s, A;
  if(D>0&&isSq(D)){ const r=Math.sqrt(D); s=[fr(-b+r,2*a),fr(-b-r,2*a)]; st.push(`√${D} = ${r}: x = {{${-b} + ${r}|${2*a}}} or x = {{${-b} - ${r}|${2*a}}}`); A=`x = ${s[0]} or x = ${s[1]}`; }
  else{
    const [k,m]=simp(Math.abs(D)), I=D<0?"i":""; const g=gcd(gcd(b,k),2*a);
    if(k>1||D<0) st.push(`Simplify: √(${D}) = ${k===1?"":k}${I}√${m}`);
    const nb=-b/g, nk=k/g, den=2*a/g, rad=`${nk===1?"":nk}${I}√${m}`;
    if(g>1) st.push(`Divide every term by ${g}.`);
    const top=nb?`${nb} ± ${rad}`:`±${rad}`; A=`x = ${den===1?top:`{{${top}|${den}}}`}`;
    s=[1,-1].map(sgn=>{const t=nb?`${nb} ${sgn>0?"+":"-"} ${rad}`:`${sgn>0?"":"-"}${rad}`; return den===1?t:`{{${t}|${den}}}`;});
    st.push(D<0?`Two complex solutions (D < 0).`:`Two irrational solutions (D > 0, not a perfect square).`);
  }
  st.push(ans(A));
  const gr=PL().parab(a,b,c);
  return {g:gr,q:`Solve ${eq} using the quadratic formula.`,a:J(st),ck:{t:"sol",eq,s}};
}
function cMul(){
  const a=RN(-7,7),b=RN(-7,7),c=RN(-7,7),d=RN(-7,7), re=a*c-b*d, im=a*d+b*c;
  const gr={p:[[a,b,cplx(a,b)],[c,d,cplx(c,d)],[re,im,`product ${cplx(re,im)}`]],eq:true,cap:'Complex plane: real part →, imaginary part ↑.'};
  return {g:gr,q:`Multiply (${cplx(a,b)})(${cplx(c,d)}). Write the answer as a + bi.`,
    a:J([`FOIL: ${a*c} ${a*d<0?"-":"+"} ${Math.abs(a*d)}i ${b*c<0?"-":"+"} ${Math.abs(b*c)}i ${b*d<0?"-":"+"} ${Math.abs(b*d)}i^2`,`Replace i^2 with -1: ${a*c} ${im<0?"-":"+"} ${Math.abs(im)}i ${-b*d<0?"-":"+"} ${Math.abs(b*d)}`,ans(cplx(re,im))]),
    ck:{t:"num",l:`(${cplx(a,b)})*(${cplx(c,d)})`,r:cplx(re,im)}};
}
function cDiv(){
  const a=RN(-8,8),b=P([0,RN(-8,8)]),c=RN(-5,5),d=RN(-5,5), N=c*c+d*d, rn=a*c+b*d, inn=b*c-a*d;
  const top=cplx(a,b), res=cplxF(rn,inn,N);
  const gr={p:[[a,b,top],[c,d,cplx(c,d)],[rn/N,inn/N,'quotient']],eq:true,cap:'Complex plane: real part →, imaginary part ↑.'};
  return {g:gr,q:`Simplify {{${top}|${cplx(c,d)}}}. Write the answer as a + bi.`,
    a:J([`Multiply the top and bottom by the conjugate of the denominator, ${cplx(c,-d)}.`,
      `Top: (${top})(${cplx(c,-d)}) = ${cplx(rn,inn)}`,`Bottom: (${cplx(c,d)})(${cplx(c,-d)}) = ${c*c} + ${d*d} = ${N}`,
      `{{${cplx(rn,inn)}|${N}}}`,ans(res)]),ck:{t:"num",l:`(${top})/(${cplx(c,d)})`,r:res}};
}
function powI(){
  const n=R(5,99), r=n%4, v=["1","i","-1","-i"][r];
  const gr={f:[{f:x=>Math.sqrt(Math.max(0,1-x*x)),d:[-1,1],light:true},{f:x=>-Math.sqrt(Math.max(0,1-x*x)),d:[-1,1],light:true}],p:[[1,0,r===0?`i^${n} = 1`:'1',r!==0],[0,1,r===1?`i^${n} = i`:'i',r!==1],[-1,0,r===2?`i^${n} = −1`:'−1',r!==2],[0,-1,r===3?`i^${n} = −i`:'−i',r!==3]],xr:[-2.2,2.2],yr:[-1.8,1.8],eq:true,cap:'Each power of i turns a quarter turn. Filled dot = the answer.'};
  return {g:gr,q:`Simplify i^${n}.`,a:J([`The powers of i repeat every 4: i, -1, -i, 1.`,`${n} ÷ 4 = ${Math.floor(n/4)} remainder ${r}, so i^${n} = i^${r}${r===0?" = 1":""}`,ans(v)]),ck:{t:"num",l:`i^${n}`,r:v}};
}
function synth(){
  const r=RN(-4,4), q2=R(1,3), q1=R(-6,6), q0=R(-6,6), Rm=P([0,0,RN(-9,9)]);
  const co=[q2,q1-r*q2,q0-r*q1,-r*q0+Rm], pe=poly(co), Q=poly([q2,q1,q0]);
  const row2=[" ",r*q2,r*q1,r*q0], row3=[q2,q1,q0,Rm];
  const tbl=`<table class="syn"><tr><td class="sc">${r}</td>${co.map(c=>`<td>${c}</td>`).join("")}</tr><tr><td></td>${row2.map(c=>`<td>${c}</td>`).join("")}</tr><tr class="last"><td></td>${row3.map((c,i)=>`<td${i===3?' class="rem"':""}>${c}</td>`).join("")}</tr></table>`;
  const zero=co.includes(0)?` (write 0 for the missing term)`:"";
  const res=Rm?`${Q}${Rm<0?" - ":" + "}{{${Math.abs(Rm)}|${poly([1,-r])}}}`:Q;
  const gr={f:[PF(co)],p:[[r,Rm,`(${r}, ${Rm}): P(${r}) = remainder`]],cy:40,cap:Rm?`Remainder theorem: P(${r}) = ${Rm}.`:`P(${r}) = 0, so x = ${r} is a zero.`};
  return {g:gr,q:`Use synthetic division: (${pe}) ÷ (${poly([1,-r])}).`,
    a:J([`Use c = ${r} (from x ${-r<0?"-":"+"} ${Math.abs(r)} = x - ${par(r)}). Coefficients: ${co.join(", ")}${zero}.`,`Bring down, multiply by ${r}, add; repeat:`,tbl,
      `Quotient: ${Q}; remainder ${Rm}${Rm?"":" (so x - "+par(r)+" is a factor)"}`,ans(res)]),
    ck:{t:"id",l:pe,r:`(${poly([1,-r])})(${Q})${Rm?sg(Rm):""}`}};
}
function binomT(){
  const n=R(4,7), a=P([1,2,3]), b=P([-3,-2,-1,1,2,3]), k=R(1,n-1), j=n-k, coef=C(n,j)*a**k*b**j;
  return {q:`Find the coefficient of ${k===1?"x":"x^"+k} in the expansion of (${poly([a,b])})^${n}.`,
    a:J([`General term: ${n}Cj · (${a===1?"x":a+"x"})^(${n}−j) · (${b})^j`,`For ${k===1?"x":"x^"+k}: ${n} - j = ${k} → j = ${j}`,
      `${n}C${j} · ${a}^${k} · (${b})^${j} = ${C(n,j)} · ${a**k} · ${par(b**j)}`,ans(`${coef}`)]),ck:{t:"coef",e:`(${poly([a,b])})^${n}`,k,v:coef}};
}
function findKfac(){
  const r=RN(-3,3), k=RN(-5,5), b=R(-8,8), c=-(r**3+k*r*r+b*r);
  const ex=`x^3 + kx^2${b?sg(b)+"x":""}${c?sg(c):""}`.replace(/ ([+-]) 1x/," $1 x");
  const gr={f:[PF([1,k,b,c])],p:[[r,0,`x = ${r}`]],cy:40,cap:`With k = ${k}, the graph crosses at x = ${r}.`};
  return {g:gr,q:`Find k so that ${poly([1,-r])} is a factor of ${ex}.`,
    a:J([`Factor theorem: ${poly([1,-r])} is a factor exactly when P(${r}) = 0.`,`P(${r}) = (${r})^3 + k(${r})^2${b?`${sg(b)}(${r})`:""}${c?sg(c):""} = ${r**3} + ${r*r===1?"":r*r}k${b?sg(b*r):""}${c?sg(c):""} = 0`,
      `${r*r===1?"":r*r}k = ${-(r**3+b*r+c)}`,ans(`k = ${k}`)])};
}

/* ================= UNIT 3 ================= */
function vparts(){ const a=P([-3,-2,-1,1,1,2,3]), h=R(-5,5), k=R(-9,9); return {a,h,k,b:-2*a*h,c:a*h*h+k}; }
function vertexStd(){
  const {a,h,k,b,c}=vparts(), ex=poly([a,b,c]);
  const gr=PL().parab(a,b,c);
  return {g:gr,q:`For y = ${ex}, find the vertex, axis of symmetry, maximum or minimum value, and range.`,
    a:J([`x = {{-b|2a}} = {{${-b}|${2*a}}} = ${h}`,`y = ${a===1?"":a===-1?"-":a}(${h})^2${b?` + ${par(b)}(${h})`:""}${sgz(c)} = ${k}`,
      `<b>Vertex (${h}, ${k})</b>, <b>axis x = ${h}</b>`,a>0?`a = ${a} > 0 → opens up → <b>minimum value ${k}</b>, <b>range y ≥ ${k}</b>`:`a = ${a} < 0 → opens down → <b>maximum value ${k}</b>, <b>range y ≤ ${k}</b>`]),
    ck:{t:"vtx",e:ex,h,k}};
}
function toVertex(){
  const {a,h,k,b,c}=vparts(), ex=poly([a,b,c]), res=`${a===1?"":a===-1?"-":a}(${poly([1,-h])})^2${k?sg(k):""}`;
  const st=[];
  if(a===1){ st.push(`Half of ${b} is ${-h}; (${-h})^2 = ${h*h}.`,`y = (${poly([1,b,h*h])}) - ${h*h}${sgz(c)}`); }
  else{ st.push(`Factor ${a} out of the x-terms: y = ${a}(${poly([1,-2*h,0])})${sgz(c)}`,`Half of ${-2*h} is ${-h}; (${-h})^2 = ${h*h}. Add ${h*h} inside; that really adds ${a}·${h*h} = ${a*h*h}, so subtract it outside:`,
    `y = ${a}(${poly([1,-2*h,h*h])})${sg(-a*h*h)}${sgz(c)}`); }
  if(!h){ st.length=0; st.push(`There is no x-term, so the vertex is on the y-axis: h = 0.`); }
  st.push(ans(`y = ${res}`)+`, vertex (${h}, ${k})`);
  const gr=PL().parab(a,b,c);
  return {g:gr,q:`Write y = ${ex} in vertex form by completing the square.`,a:J(st),ck:{t:"id",l:ex,r:res}};
}
function discr(){
  const t=R(0,3); let a,b,c,D;
  do{ a=RN(-4,4); b=R(-9,9); c=R(-9,9); D=b*b-4*a*c;
    if(t===0&&D>=0) continue; if(t===1&&D!==0) continue; if(t===2&&!(D>0&&isSq(D))) continue; if(t===3&&!(D>0&&!isSq(D))) continue; break; }while(true);
  const type=D<0?"two non-real complex solutions (no x-intercepts)":D===0?"one real (double) solution; the vertex is on the x-axis":isSq(D)?`two rational solutions (${D} = ${Math.sqrt(D)}^2 is a perfect square)`:"two irrational solutions";
  const gr=PL().parab(a,b,c,{cap:D<0?'No x-intercepts → two complex solutions.':D===0?'Touches the x-axis once → one real solution.':'Two x-intercepts → two real solutions.'});
  return {g:gr,q:`Use the discriminant to find the number and type of solutions of ${poly([a,b,c])} = 0.`,
    a:J([`D = b^2 - 4ac = ${par(b)}^2 - 4(${a})(${c}) = ${b*b} ${-4*a*c<0?"-":"+"} ${Math.abs(4*a*c)} = ${D}`,ans(type)])};
}
function findK(){
  const t=R(0,2);
  if(t===0){ const s=R(1,9), a=P([1,1,4,9]); const r=Math.sqrt(a);
    return {q:`Find all values of k so that ${a===1?"":a}x^2 + kx + ${s*s} = 0 has exactly one real solution.`,
      a:J([`Exactly one solution → D = 0: k^2 - 4(${a})(${s*s}) = 0 → k^2 = ${4*a*s*s}`,ans(`k = ${2*r*s} or k = ${-2*r*s}`)])}; }
  const a=R(1,5), b=RN(-9,9), two=t===2;
  return {g:two?null:PL().parab(a,b,b*b/(4*a),{cap:'With this k the parabola just touches the x-axis.'}),q:`For what value${two?"s":""} of k does ${poly([a,b,0])} + k = 0 have ${two?"two real solutions":"exactly one real solution"}?`,
    a:J([`${two?"Two real solutions → D > 0":"One solution → D = 0"}: ${par(b)}^2 - 4(${a})k ${two?">":"="} 0 → ${b*b} ${two?">":"="} ${4*a}k`,ans(`k ${two?"<":"="} ${fr(b*b,4*a)}`)])};
}
function qIneq(){
  let p,q; do{p=R(-7,7);q=R(-7,7);}while(p>=q);
  const s=P([1,1,-1]), sym=P(["<","≤",">","≥"]), ex=poly([s,-s*(p+q),s*p*q]);
  let eff=sym; const st=[];
  if(s<0){ eff={"<":">","≤":"≥",">":"<","≥":"≤"}[sym]; st.push(`Multiply both sides by -1 and <b>flip the sign</b>: ${poly([1,-(p+q),p*q])} ${eff} 0`); }
  st.push(`Factor: ${bin(1,-p)}${bin(1,-q)} ${eff} 0 → zeros x = ${p} and x = ${q}`);
  const between=eff==="<"||eff==="≤", incl=eff==="≤"||eff==="≥";
  st.push(`The parabola y = ${poly([1,-(p+q),p*q])} opens up, so it is ${between?"below":"above"} the x-axis <b>${between?"between":"outside"}</b> the zeros.${incl?" Include the zeros.":""}`);
  const res=between?`${p} ${incl?"≤":"<"} x ${incl?"≤":"<"} ${q}, or ${incl?"[":"("}${p}, ${q}${incl?"]":")"}`:`x ${incl?"≤":"<"} ${p} or x ${incl?"≥":">"} ${q}, or (-∞, ${p}${incl?"]":")"} ∪ ${incl?"[":"("}${q}, ∞)`;
  st.push(ans(res));
  const pyop={"<":"<","≤":"<=",">":">","≥":">="}[sym], o=incl?"False":"True";
  const sset=between?`Interval(${p},${q},${o},${o})`:`Union(Interval(-oo,${p},True,${o}),Interval(${q},oo,${o},True))`;
  const B1=eff==='<'||eff==='≤', I1=eff==='≤'||eff==='≥'; const gr=PL().parab(s,-s*(p+q),s*p*q,{extra:{xi:B1?[[p,q,I1,I1]]:[[-Infinity,p,false,I1],[q,Infinity,I1,false]]},cap:'The shaded part of the x-axis is the solution.'});
  return {g:gr,q:`Solve ${ex} ${sym} 0.`,a:J(st),ck:{t:"ineq",py:`${s}*x**2+(${-s*(p+q)})*x+(${s*p*q}) ${pyop} 0`,s:sset}};
}
function writeV(){
  const h=R(-5,5), k=R(-9,9), a=RN(-3,3), dx=RN(-3,3), x1=h+dx, y1=a*dx*dx+k;
  const res=`${cf(a)}${sqr(h)}${k?sg(k):""}`;
  const gr=PL().parab(a,-2*a*h,a*h*h+k); gr.p.push([x1,y1,`given (${x1}, ${y1})`]);
  return {g:gr,q:`Write the equation of the parabola with vertex (${h}, ${k}) that passes through (${x1}, ${y1}).`,
    a:J([`Vertex form: y = a${sqr(h)}${k?sg(k):""}`,`Plug in (${x1}, ${y1}): ${y1} = a(${x1}${h?" - "+par(h):""})^2${k?sg(k):""} = ${dx*dx}a${k?sg(k):""}`,`${dx*dx}a = ${y1-k} → a = ${a}`,ans(`y = ${res}`)]),
    ck:{t:"pts",f:res,pts:[[x1,y1],[h,k]]}};
}
function writeZ(){
  let p,q,x1; do{p=R(-6,6);q=R(-6,6);x1=R(-5,5);}while(p>=q||x1===p||x1===q);
  const a=RN(-3,3), y1=a*(x1-p)*(x1-q), res=`${a===1?"":a===-1?"-":a}${bin(1,-p)}${bin(1,-q)}`;
  const gr=PL().parab(a,-a*(p+q),a*p*q); gr.p.push([x1,y1,`given (${x1}, ${y1})`]);
  return {g:gr,q:`Write the equation of the parabola with x-intercepts ${p} and ${q} that passes through (${x1}, ${y1}). Give factored and standard form.`,
    a:J([`Factored form: y = a${bin(1,-p)}${bin(1,-q)}`,`Plug in (${x1}, ${y1}): ${y1} = a(${x1-p})(${x1-q}) = ${(x1-p)*(x1-q)}a → a = ${a}`,ans(`y = ${res} = ${poly([a,-a*(p+q),a*p*q])}`)]),
    ck:{t:"id",l:res,r:poly([a,-a*(p+q),a*p*q])}};
}
function roots2eq(){
  const t=R(0,2), a=RN(-5,5);
  if(t===0){ const b=P([2,3,5,6,7,10,11,13]); const eq=`${poly([1,-2*a,a*a-b])} = 0`;
    return {g:PL().parab(1,-2*a,a*a-b),q:`Write a quadratic equation with integer coefficients whose roots are ${a} ± √${b}.`,a:J([`Sum: (${a} + √${b}) + (${a} - √${b}) = ${2*a}`,`Product: ${par(a)}^2 - (√${b})^2 = ${a*a} - ${b} = ${a*a-b}`,`x^2 - (sum)x + (product) = 0`,ans(eq)]),ck:{t:"sol",eq,s:[`${a} + √${b}`,`${a} - √${b}`]}}; }
  if(t===1){ const b=R(1,6); const eq=`${poly([1,-2*a,a*a+b*b])} = 0`, r=b===1?"i":b+"i";
    return {g:PL().parab(1,-2*a,a*a+b*b),q:`Write a quadratic equation with real coefficients whose roots are ${a} ± ${r}.`,a:J([`Sum: ${2*a}`,`Product: (${a} + ${r})(${a} - ${r}) = ${a*a} + ${b*b} = ${a*a+b*b}`,ans(eq)]),ck:{t:"sol",eq,s:[`${a} + ${r}`,`${a} - ${r}`]}}; }
  let p,q; do{p=RN(-7,7);q=R(2,5);}while(gcd(p,q)!==1);
  const eq=`${poly([q,-(p+a*q),p*a])} = 0`;
  return {g:PL().parab(q,-(p+a*q),p*a),q:`Write a quadratic equation with integer coefficients whose roots are ${fr(p,q)} and ${a}.`,
    a:J([`x = ${fr(p,q)} → ${poly([q,-p])} = 0. &nbsp; x = ${a} → ${poly([1,-a])} = 0.`,`Multiply: (${poly([q,-p])})(${poly([1,-a])}) = 0`,ans(eq)]),ck:{t:"sol",eq,s:[fr(p,q),`${a}`]}};
}
function projectile(){
  const v=P([32,48,64,80,96,112,128]), h0=P([0,3,4,5,6,8,10]), tm=v/32, hm=h0+v*v/64;
  const tg=(v+Math.sqrt(v*v+64*h0))/32;
  const ex=`-16t^2 + ${v}t${h0?sg(h0):""}`;
  const gr={f:[{f:t=>-16*t*t+v*t+h0,d:[0,tg]}],p:[[tm,hm,`max (${tm}, ${hm})`],[tg,0,`lands ≈ ${tg.toFixed(2)} s`],...(h0?[[0,h0,`start (0, ${h0})`]]:[])],xr:[-0.3,tg+0.6],cap:'Horizontal axis: time t (s). Vertical axis: height (ft).'};
  return {g:gr,q:`A ball is thrown upward. Its height is h(t) = ${ex} feet after t seconds. (a) When does it reach its maximum height, and what is that height? (b) When does it hit the ground? (nearest hundredth)`,
    a:J([`(a) t = {{-b|2a}} = {{-${v}|2(-16)}} = ${tm} s`,`h(${tm}) = -16(${tm})^2 + ${v}(${tm})${h0?sg(h0):""} = <b>${hm} ft</b>`,
      `(b) Solve ${ex} = 0. ${h0?`Quadratic formula: t = {{-${v} ± √(${v}^2 + 4·16·${h0})|-32}}`:`Factor: -16t(t - ${tm*2}) = 0`}`,
      h0?`Keep the positive time: t ≈ <b>${tg.toFixed(2)} s</b>`:`t = 0 is the launch, so it lands at <b>t = ${tm*2} s</b>`,ans(`max ${hm} ft at t = ${tm} s; lands at t ${h0?"≈ "+tg.toFixed(2):"= "+tm*2} s`)])};
}
function fence(){
  const t=R(0,2);
  if(t===0){ const L=4*R(10,60); return {g:{f:[{f:x=>x*(L-2*x),d:[0,L/2]}],p:[[L/4,L*L/8,`max (${L/4}, ${L*L/8})`]],xr:[-L/40,L/2+L/40],cap:'Area A(x): the vertex gives the largest area.'},q:`A farmer has ${L} m of fence to make a rectangular pen along a river (no fence on the river side). What dimensions give the largest area?`,
    a:J([`Let x = each side perpendicular to the river; the side along the river is ${L} - 2x.`,`A = x(${L} - 2x) = -2x^2 + ${L}x`,`Vertex: x = {{-${L}|2(-2)}} = ${L/4}; the other side is ${L} - ${L/2} = ${L/2}`,ans(`${L/4} m by ${L/2} m, area ${L*L/8} m²`)])}; }
  if(t===1){ const L=12*R(5,40); return {g:{f:[{f:x=>x*(L-3*x)/2,d:[0,L/3]}],p:[[L/6,L*L/24,`max (${L/6}, ${L*L/24})`]],xr:[-L/60,L/3+L/60],cap:'Area A(x): the vertex gives the largest area.'},q:`A rectangular pen is divided into two parts by a fence parallel to one side. There are ${L} ft of fence in all. What dimensions give the largest total area?`,
    a:J([`Let x = the length of each of the 3 parallel sides; the other two sides are y. 3x + 2y = ${L} → y = {{${L} - 3x|2}}`,`A = x · {{${L} - 3x|2}} = -{{3|2}}x^2 + ${L/2}x`,`Vertex: x = {{-${L/2}|2(-3/2)}} = ${L/6}, y = {{${L} - ${L/2}|2}} = ${L/4}`,ans(`${L/6} ft by ${L/4} ft, area ${L*L/24} ft²`)])}; }
  const S=R(2,40)*2; return {g:{f:[{f:x=>x*(S-x),d:[0,S]}],p:[[S/2,S*S/4,`max (${S/2}, ${S*S/4})`]],xr:[-S/20,S+S/20],cap:'Product P(x) = x(S − x).'},q:`Two numbers add to ${S}. What is the largest possible product?`,a:J([`Numbers x and ${S} - x: P = x(${S} - x) = -x^2 + ${S}x`,`Vertex: x = ${S/2}`,ans(`${S/2} · ${S/2} = ${S*S/4}`)])};
}
function revenue(){
  let p0,n0,d,x; do{ p0=R(5,20); d=P([5,10,20,25]); n0=d*R(20,60); x=(n0-d*p0)/(2*d); }while(x<=0||x>15);
  const pr=p0+x, nq=n0-d*x, rev=pr*nq, money=v=>Number.isInteger(v)?`$${v.toLocaleString()}`:`$${v.toFixed(2)}`;
  const gr={f:[{f:t=>(p0+t)*(n0-d*t),d:[0,n0/d]}],p:[[x,rev,`max at x = ${x}`]],xr:[-1,n0/d+1],cap:'Revenue R(x) for x price increases of $1.'};
  return {g:gr,q:`A theater sells ${n0} tickets at $${p0} each. For each $1 increase in price, ${d} fewer tickets are sold. What price maximizes revenue? What is the maximum revenue?`,
    a:J([`Let x = number of $1 increases. Revenue R = (price)(tickets) = (${p0} + x)(${n0} - ${d}x)`,`R = -${d}x^2 + ${n0-d*p0}x + ${p0*n0}`,
      `Vertex: x = {{-${n0-d*p0}|2(-${d})}} = ${x}`,`Price: ${p0} + ${x} = ${money(pr)}; tickets: ${n0} - ${d}(${x}) = ${nq}`,ans(`${money(pr)}, revenue ${money(rev)}`)])};
}
function vieta(){
  const a=R(1,5), b=RN(-9,9), c=RN(-9,9), adv=Math.random()<0.4, S=fr(-b,a), Pp=fr(c,a);
  const st=[`Sum = {{-b|a}} = ${fr(-b,a)}`,`Product = {{c|a}} = ${Pp}`];
  if(adv) st.push(`r^2 + s^2 = (r + s)^2 - 2rs = (${S})^2 - 2(${Pp}) = ${fr(b*b-2*a*c,a*a)}`);
  st.push(ans(`sum ${S}, product ${Pp}${adv?`, r^2 + s^2 = ${fr(b*b-2*a*c,a*a)}`:""}`));
  const gr=PL().parab(a,b,c,{cap:'The roots are the x-intercepts (or complex if there are none).'});
  return {g:gr,adv,q:`Let r and s be the roots of ${poly([a,b,c])} = 0. Without solving, find r + s and rs${adv?", then r^2 + s^2":""}.`,a:J(st)};
}
function tangent(){
  let p,m; do{p=R(-6,6);m=RN(-4,4);}while((p-m)%2!==0);
  const q=R(-6,8), b=q-((p-m)**2)/4, xt=(m-p)/2, yt=m*xt+b;
  const gr={f:[x=>x*x+p*x+q,{f:x=>m*x+b,light:true}],p:[[xt,yt,`tangent point (${xt}, ${yt})`]],cap:'The gray line touches the parabola at exactly one point.'};
  return {g:gr,adv:true,q:`Find b so that the line y = ${cx(m)} + b is tangent to y = ${poly([1,p,q])}. Find the point of tangency.`,
    a:J([`Set equal: ${poly([1,p,q])} = ${cx(m)} + b → ${poly([1,p-m,0])} + (${q} - b) = 0`,`Tangent → D = 0: ${par(p-m)}^2 - 4(${q} - b) = 0 → ${(p-m)**2}${sgz(-4*q)} + 4b = 0 → b = ${b}`,
      `Then x = {{${m-p}|2}} = ${xt}, y = ${m}(${xt})${sgz(b)} = ${yt}`,ans(`b = ${b}, point (${xt}, ${yt})`)]),ck:{t:"tan",par:poly([1,p,q]),line:`${cx(m)}${sg(b)}`.replace("+ 0","")}};
}
function linQuad(){
  let r1,r2; do{r1=R(-5,5);r2=R(-5,5);}while(r1>=r2);
  const m=RN(-3,3), n=R(-6,6), p=m-(r1+r2), q=n+r1*r2;
  const par1=poly([1,p,q]), ln=poly([m,n]);
  const gr={f:[x=>x*x+p*x+q,{f:x=>m*x+n,light:true}],p:[[r1,m*r1+n],[r2,m*r2+n]],cap:'The solutions are the intersection points.'};
  return {g:gr,q:`Solve the system y = ${par1} and y = ${ln}.`,
    a:J([`Substitute: ${par1} = ${ln} → ${poly([1,p-m,q-n])} = 0`,`Factor: ${bin(1,-r1)}${bin(1,-r2)} = 0 → x = ${r1} or x = ${r2}`,`y = ${m}(${r1})${sgz(n)} = ${m*r1+n}; &nbsp; y = ${m}(${r2})${sgz(n)} = ${m*r2+n}`,ans(`(${r1}, ${m*r1+n}) and (${r2}, ${m*r2+n})`)]),
    ck:{t:"sys2",a:par1,b:ln,s:[[r1,m*r1+n],[r2,m*r2+n]]}};
}

/* ================= UNIT 4: polynomial functions ================= */
function pmul(a,b){ const r=Array(a.length+b.length-1).fill(0); a.forEach((x,i)=>b.forEach((y,j)=>r[i+j]+=x*y)); return r; }
function fromRoots(rs,lead=1){ return rs.reduce((acc,r)=>pmul(acc,[1,-r]),[lead]); }
const facStr=(r,m=1)=>`(${poly([1,-r])})${m>1?"^"+m:""}`;
const lead=a=>a===1?"":a===-1?"-":`${a}`;
function endBehText(n,a){
  if(n%2===0) return a>0?["∞","∞","both ends go <b>up</b>"]:["-∞","-∞","both ends go <b>down</b>"];
  return a>0?["-∞","∞","falls to the left, <b>rises</b> to the right"]:["∞","-∞","rises to the left, <b>falls</b> to the right"];
}
function endBeh(){
  const n=R(2,6), a=P([-3,-2,-1,1,2,3]), rs=Array.from({length:n},()=>R(-4,4)), co=fromRoots(rs,a), [L,Rr,txt]=endBehText(n,a);
  return {g:Object.assign(FG(co,rs),{cap:`Degree ${n}, leading coefficient ${a}: ${txt.replace(/<\/?b>/g,"")}.`}),
    q:`Describe the end behavior of f(x) = ${poly(co)}.`,
    a:J([`Only the <b>leading term</b> matters for end behavior: ${lead(a)}x^${n}.`,`Degree ${n} is <b>${n%2?"odd":"even"}</b>; leading coefficient ${a} is <b>${a>0?"positive":"negative"}</b> → ${txt}.`,
      ans(`as x → -∞, f(x) → ${L}; as x → ∞, f(x) → ${Rr}`)])};
}
function zerosMult(){
  let rs; do rs=[R(-5,5),R(-5,5),R(-5,5)]; while(new Set(rs).size<3);
  const ms=rs.map(()=>P([1,1,2,3])), a=P([-2,-1,1,2]), n=ms.reduce((s,m)=>s+m,0);
  const fstr=lead(a)+rs.map((r,i)=>facStr(r,ms[i])).join(""), co=rs.reduce((acc,r,i)=>pmul(acc,fromRoots(Array(ms[i]).fill(r))),[a]);
  const yint=a*rs.reduce((p,r,i)=>p*(-r)**ms[i],1), [L,Rr]=endBehText(n,a);
  const lines=rs.map((r,i)=>`x = ${r}: multiplicity ${ms[i]} → ${ms[i]%2?"<b>crosses</b> the x-axis":"<b>touches</b> the x-axis and turns around"}${ms[i]===3?" (flattens as it crosses)":""}`);
  return {g:Object.assign(FG(co,rs),{cap:"Odd multiplicity: crosses. Even multiplicity: touches and turns."}),
    q:`For f(x) = ${fstr}, find the zeros and their multiplicities, say whether the graph crosses or touches at each zero, and give the degree, end behavior and y-intercept.`,
    a:J([...lines,`Degree: ${ms.join(" + ")} = <b>${n}</b>; leading coefficient ${a} → as x → -∞, f → ${L}; as x → ∞, f → ${Rr}`,`y-intercept: f(0) = ${lead(a)}${rs.map((r,i)=>`(${-r})${ms[i]>1?"^"+ms[i]:""}`).join("")} = <b>${yint}</b>`])};
}
function writePoly(){
  let rs; do rs=[R(-4,4),R(-4,4),R(-4,4)]; while(new Set(rs).size<3);
  const a=RN(-3,3); let x0; do x0=R(-3,4); while(rs.includes(x0));
  const y0=a*rs.reduce((p,r)=>p*(x0-r),1), co=fromRoots(rs,a), f=`${lead(a)}${rs.map(r=>facStr(r)).join("")}`;
  return {g:(()=>{const s=FG(co,rs); s.p.push([x0,y0,`given (${x0}, ${y0})`]); s.cap="The zeros and the given point determine the polynomial."; return s;})(),
    q:`Write the polynomial function of least degree with zeros ${rs.join(", ")} that passes through (${x0}, ${y0}).`,
    a:J([`Each zero r gives a factor (x - r): f(x) = a${rs.map(r=>facStr(r)).join("")}`,`Plug in (${x0}, ${y0}): ${y0} = a${rs.map(r=>`(${x0-r})`).join("")} = ${rs.reduce((p,r)=>p*(x0-r),1)}a → a = ${a}`,
      ans(`f(x) = ${f} = ${poly(co)}`)]),ck:{t:"id",l:f,r:poly(co)}};
}
const divisors=n=>{n=Math.abs(n);const d=[];for(let i=1;i<=n;i++) if(n%i===0) d.push(i);return d;};
function ratRootList(){
  const a=P([1,2,3,4,6]), c=P([2,3,4,5,6,8,9,10,12])*P([1,-1]), co=[a,R(-6,6),R(-6,6),c];
  const ps=divisors(c), qs=divisors(a), set=new Map();
  for(const p of ps) for(const q of qs){ const g=gcd(p,q); set.set(`${p/g}/${q/g}`,[p/g,q/g]); }
  const vals=[...set.values()].sort((u,v)=>u[0]/u[1]-v[0]/v[1]).map(([p,q])=>q===1?`±${p}`:`±{{${p}|${q}}}`);
  return {q:`List all possible rational zeros of f(x) = ${poly(co)}.`,
    a:J([`Rational Root Theorem: possible zeros are ±{{p|q}}, where p divides the constant term and q divides the leading coefficient.`,`p (factors of ${Math.abs(c)}): ${ps.join(", ")}`,`q (factors of ${a}): ${qs.join(", ")}`,
      ans(vals.join(", ")),`<i>Not all of these are zeros; they are the only rational numbers worth testing.</i>`])};
}
function synthTable(r,co){ // r may be fraction p/q given as [p,q]; co ints, returns rows
  const [p,q]=r; const bot=[co[0]], mid=[" "];
  for(let i=1;i<co.length;i++){ const m=bot[i-1]*p/q; mid.push(m); bot.push(co[i]+m); }
  const show=v=>typeof v==="number"?fr(Math.round(v*q),q):v;
  return {bot,html:`<table class="syn"><tr><td class="sc">${fr(p,q)}</td>${co.map(c=>`<td>${c}</td>`).join("")}</tr><tr><td></td>${mid.map(v=>`<td>${show(v)}</td>`).join("")}</tr><tr class="last"><td></td>${bot.map((v,i)=>`<td${i===bot.length-1?' class="rem"':""}>${show(v)}</td>`).join("")}</tr></table>`};
}
function allZeros(){
  let b,c,D; do{b=R(-6,6);c=R(-9,12);D=b*b-4*c;}while(D===0||isSq(D));
  const frac=Math.random()<0.35, q=frac?P([2,3]):1; let p; do p=RN(-5,5); while(frac&&gcd(p,q)!==1);
  const co=pmul([q,-p],[1,b,c]), S=synthTable([p,q],co), r=fr(p,q);
  const [k,m]=simp(Math.abs(D)), I=D<0?"i":"", g2=gcd(gcd(b,k),2), nb=-b/g2, nk=k/g2, den=2/g2, rad=`${nk===1?"":nk}${I}√${m}`;
  const top=nb?`${nb} ± ${rad}`:`±${rad}`, qz=den===1?top:`{{${top}|${den}}}`;
  const sols=[r,...[1,-1].map(s=>{const t=nb?`${nb} ${s>0?"+":"-"} ${rad}`:`${s>0?"":"-"}${rad}`;return den===1?t:`{{${t}|${den}}}`;})];
  const realZ=[p/q,...(D>0?QR(1,b,c):[])];
  return {g:Object.assign(FG(co,realZ),{cap:D<0?"Only one x-intercept: the other two zeros are complex.":"Three x-intercepts; two of them are irrational."}),
    q:`Find all zeros of f(x) = ${poly(co)}.`,
    a:J([`<b>Possible rational zeros:</b> ±(factors of ${Math.abs(co[3])}) / (factors of ${co[0]}).`,`<b>Test x = ${r}</b> with synthetic division:`,S.html,
      `Remainder 0, so x = ${r} is a zero. Quotient: ${poly(S.bot.slice(0,3).map(v=>Math.round(v)))}${q>1?` = ${q}(${poly([1,b,c])})`:""}`,
      `Solve ${poly([1,b,c])} = 0 with the quadratic formula: x = {{${-b} ± √(${D})|2}} = ${qz}`,ans(`x = ${r}, x = ${qz}`)]),
    ck:{t:"sol",eq:`${poly(co)} = 0`,s:sols}};
}
function conjZeros(){
  const k=RN(-4,4), a=RN(-3,3), cplxV=Math.random()<0.5, b=cplxV?R(1,4):P([2,3,5,6,7]);
  const quad=cplxV?[1,-2*a,a*a+b*b]:[1,-2*a,a*a-b], co=pmul([1,-k],quad), z=cplxV?`${a} ${"+"} ${b===1?"":b}i`:`${a} + √${b}`, zc=cplxV?`${a} - ${b===1?"":b}i`:`${a} - √${b}`;
  return {g:Object.assign(FG(co,[k,...(cplxV?[]:QR(...quad))]),{cap:cplxV?"Only the real zero is an x-intercept.":"All three zeros are real."}),
    q:`Write a polynomial of least degree with integer coefficients and leading coefficient 1 that has zeros ${k} and ${z}.`,
    a:J([cplxV?`<b>Complex conjugate theorem:</b> if ${z} is a zero, so is ${zc}.`:`<b>Irrational conjugates:</b> if ${z} is a zero, so is ${zc}.`,
      `Pair the conjugates: (x - (${z}))(x - (${zc})) = x^2 - (sum)x + (product)`,`Sum = ${2*a}, product = ${cplxV?`${a*a} + ${b*b}`:`${a*a} - ${b}`} = ${quad[2]} → ${poly(quad)}`,
      `Multiply by (${poly([1,-k])}): (${poly([1,-k])})(${poly(quad)})`,ans(`f(x) = ${poly(co)}`)]),
    ck:{t:"sol",eq:`${poly(co)} = 0`,s:[`${k}`,z,zc]}};
}
function polyIneq(){
  let rs; do rs=[R(-5,5),R(-5,5),R(-5,5)]; while(new Set(rs).size<3); rs.sort((a,b)=>a-b);
  const s=P([1,-1]), sym=P(["<","≤",">","≥"]), f=`${s<0?"-":""}${rs.map(r=>facStr(r)).join("")}`;
  const pos=sym===">"||sym==="≥", incl=sym==="≤"||sym==="≥";
  const signs=[0,1,2,3].map(i=>s*((3-i)%2?-1:1)); // interval i: left of r1 .. right of r3
  const iv=["(-∞, "+rs[0],rs[0]+", "+rs[1],rs[1]+", "+rs[2],rs[2]+", ∞)"];
  const keep=signs.map(v=>pos?v>0:v<0);
  const parts=[]; const B=(l,r)=>`${l}`;
  const ints=[[-Infinity,rs[0]],[rs[0],rs[1]],[rs[1],rs[2]],[rs[2],Infinity]];
  const chosen=ints.filter((_,i)=>keep[i]);
  // merge touching intervals when inclusive (they never touch since alternating)
  const show=([l,r])=>`${l===-Infinity?"(":incl?"[":"("}${l===-Infinity?"-∞":l}, ${r===Infinity?"∞":r}${r===Infinity?")":incl?"]":")"}`;
  const res=chosen.map(show).join(" ∪ ");
  const o=incl?"False":"True", pyS=`Union(${chosen.map(([l,r])=>`Interval(${l===-Infinity?"-oo":l},${r===Infinity?"oo":r},${l===-Infinity?"True":o},${r===Infinity?"True":o})`).join(",")})`;
  const co=fromRoots(rs,s);
  return {g:Object.assign(FG(co,rs),{xi:chosen.map(([l,r])=>[l,r,incl,incl]),cap:"The shaded part of the x-axis is the solution."}),
    q:`Solve ${f} ${sym} 0.`,
    a:J([`Zeros (critical values): ${rs.join(", ")}. They split the number line into 4 intervals.`,
      `Sign chart (test a point in each interval): ${ints.map(([l,r],i)=>`${show([l,r]).replace(/[\[\]]/g,m=>m==="["?"(":")")} : ${signs[i]>0?"+":"−"}`).join(" &nbsp;|&nbsp; ")}`,
      `We want f ${pos?"positive":"negative"}${incl?" or zero (include the zeros)":""}.`,ans(res)]),
    ck:{t:"ineq",py:`${s}*(x-(${rs[0]}))*(x-(${rs[1]}))*(x-(${rs[2]})) ${{"<":"<","≤":"<=",">":">","≥":">="}[sym]} 0`,s:pyS}};
}
function cubeRootsG(){
  const k=R(1,6), sgn=P([1,-1]), eq=`x^3 ${sgn>0?"-":"+"} ${k**3} = 0`, r=sgn*k;
  const quad=[1,r,r*r], h=-r, // x^2 + r x + r^2 → roots (-r ± r i√3)/2
    top=`${h} ± ${Math.abs(r)===1?"":Math.abs(r)}i√3`, z=r%2===0?`${-r/2} ± ${Math.abs(r/2)===1?"":Math.abs(r/2)}i√3`:`{{${top}|2}}`;
  const sols=[`${r}`,...[1,-1].map(s=>r%2===0?`${-r/2} ${s>0?"+":"-"} ${Math.abs(r/2)===1?"":Math.abs(r/2)}i√3`:`{{${h} ${s>0?"+":"-"} ${Math.abs(r)===1?"":Math.abs(r)}i√3|2}}`)];
  return {adv:true,g:Object.assign(FG([1,0,0,-(r**3)],[r]),{cap:"One real zero; the other two are complex."}),q:`Solve ${eq} over the complex numbers.`,
    a:J([`${sgn>0?"Difference":"Sum"} of cubes: (${poly([1,-r])})(${poly(quad)}) = 0`,`x = ${r}, or ${poly(quad)} = 0 → x = {{${-r} ± √(${r*r} - ${4*r*r})|2}} = {{${top}|2}}`,ans(`x = ${r}, x = ${z}`)]),
    ck:{t:"sol",eq,s:sols}};
}

/* ================= UNIT 5: rational functions ================= */
function RG(f,vas,o={}){ // rational graph spec
  vas=[...new Set(vas)].sort((a,b)=>a-b); const cuts=[-1e9,...vas,1e9], pieces=[];
  for(let i=0;i<cuts.length-1;i++) pieces.push({f,d:[cuts[i]+1e-7,cuts[i+1]-1e-7]});
  const ky=[...(o.p||[]).map(p=>p[1]),...(o.h||[])]; const mid=ky.length?(Math.min(...ky)+Math.max(...ky))/2:0;
  const lo=Math.min(-6,(ky.length?Math.min(...ky):0)-6), hi=Math.max(6,(ky.length?Math.max(...ky):0)+6);
  return Object.assign({f:[...pieces,...(o.slant?[{f:o.slant,dash:true}]:[])],v:vas,yr:[Math.max(lo,mid-14),Math.min(hi,mid+14)],kx:vas},o);
}
function simpRat(){
  let a,b,c; do{a=R(-6,6);b=R(-6,6);c=R(-6,6);}while(new Set([a,b,c]).size<3);
  const k=Math.random()<0.3?P([2,3]):1, N=poly(fromRoots([a,b],k)), D=poly(fromRoots([a,c],k));
  const hy=(a-b)/(a-c), res=`{{${poly([1,-b])}|${poly([1,-c])}}}`;
  return {g:RG(x=>(x-b)/(x-c),[c],{h:[1],p:[[a,hy,`hole (${PL().num(a)}, ${PL().num(hy)})`,true],[b,0]],cap:`Hole at x = ${a} (open circle), vertical asymptote x = ${c}, horizontal asymptote y = 1.`}),
    q:`Simplify {{${N}|${D}}} and state the excluded values.`,
    a:J([`Factor the top and bottom: {{${k>1?k:""}${facStr(a)}${facStr(b)}|${k>1?k:""}${facStr(a)}${facStr(c)}}}`,`Excluded values (bottom = 0 in the <b>original</b>): x ≠ ${a}, x ≠ ${c}`,
      `Cancel the common factor ${k>1?k+facStr(a):facStr(a)}.`,ans(`${res}, x ≠ ${a}, ${c}`)]),ck:{t:"rat",l:`(${N})/(${D})`,r:`(${poly([1,-b])})/(${poly([1,-c])})`}};
}
function mulDivRat(){
  let a,b,c; do{a=R(1,6);b=R(-6,6);c=R(-6,6);}while(new Set([a,-a,b,-c]).size<4||b===0);
  const div=Math.random()<0.5;
  const N1=poly([1,0,-a*a]), D1=poly(fromRoots([a,b])), second=div?`{{${poly([1,c])}|${poly([1,-b])}}}`:`{{${poly([1,-b])}|${poly([1,c])}}}`;
  const res=`{{${poly([1,a])}|${poly([1,c])}}}`;
  return {q:`Simplify {{${N1}|${D1}}} ${div?"÷":"·"} ${second}.`,
    a:J([...(div?[`Dividing = multiplying by the reciprocal: {{${N1}|${D1}}} · {{${poly([1,-b])}|${poly([1,c])}}}`]:[]),
      `Factor: {{${facStr(a)}${facStr(-a)}|${facStr(a)}${facStr(b)}}} · {{${poly([1,-b])}|${poly([1,c])}}}`,`Cancel (${poly([1,-a])}) and (${poly([1,-b])}).`,
      ans(`${res}`)+`, x ≠ ${[a,b,-c].join(", ")}`]),ck:{t:"rat",l:`(${N1})/(${D1})${div?"/":"*"}((${div?poly([1,c]):poly([1,-b])})/(${div?poly([1,-b]):poly([1,c])}))`,r:`(${poly([1,a])})/(${poly([1,c])})`}};
}
function addRat(){
  if(Math.random()<0.55){
    let a,b,p,q; do{a=R(-6,6);b=R(-6,6);p=RN(-5,5);q=R(1,5);}while(a===b||p+q===0||p-q===0);
    const op=P(["+","-"]), q2=op==="+"?q:-q, numC=[p+q2,-(p*b+q2*a)], num=poly(numC), den=`${facStr(a)}${facStr(b)}`;
    return {q:`Simplify {{${p}|${poly([1,-a])}}} ${op} {{${q}|${poly([1,-b])}}}.`,
      a:J([`LCD: ${den}`,`Rewrite each fraction over the LCD: {{${p}${facStr(b)}|${den}}} ${op} {{${q}${facStr(a)}|${den}}}`,
        `Combine the numerators: ${p}${facStr(b)} ${op} ${q}${facStr(a)} = ${poly([p,-p*b])} ${op} (${poly([q,-q*a])}) = ${num}`,ans(`{{${num}|${den}}}`)]),
      ck:{t:"rat",l:`${p}/(${poly([1,-a])}) ${op} ${q}/(${poly([1,-b])})`,r:`(${num})/(${poly(fromRoots([a,b]))})`}};
  }
  const a=R(1,7), p=RN(-6,6), q=R(1,5), num=poly([q,-q*a+p]);
  return {q:`Simplify {{${p}|${poly([1,0,-a*a])}}} + {{${q}|${poly([1,a])}}}.`,
    a:J([`Factor the first denominator: x^2 - ${a*a} = ${facStr(a)}${facStr(-a)}. LCD: ${facStr(a)}${facStr(-a)}`,`Rewrite: {{${p}|${facStr(a)}${facStr(-a)}}} + {{${q}${facStr(a)}|${facStr(a)}${facStr(-a)}}}`,
      `Numerator: ${p} + ${q}${facStr(a)} = ${num}`,ans(`{{${num}|${facStr(a)}${facStr(-a)}}}`)]),ck:{t:"rat",l:`${p}/(x^2-${a*a}) + ${q}/(x+${a})`,r:`(${num})/(x^2-${a*a})`}};
}
function asymptotes(){
  const t=R(0,3), N=PL().num;
  if(t===0){ let a,b,c,d; do{a=R(1,4);c=R(1,4);b=RN(-8,8);d=RN(-8,8);}while(a*d-b*c===0);
    const f=x=>(a*x+b)/(c*x+d), va=-d/c, ha=a/c;
    return {g:RG(f,[va],{h:[ha],p:[[-b/a,0],[0,b/d]],cap:`Vertical asymptote x = ${N(va)}, horizontal asymptote y = ${N(ha)} (dashed).`}),
      q:`For f(x) = {{${poly([a,b])}|${poly([c,d])}}}, find the vertical and horizontal asymptotes, the x- and y-intercepts, and the domain.`,
      a:J([`<b>Vertical asymptote:</b> bottom = 0 → ${poly([c,d])} = 0 → x = ${fr(-d,c)}`,`<b>Horizontal asymptote:</b> degrees are equal → y = {{leading coef. top|leading coef. bottom}} = ${fr(a,c)}`,
        `<b>x-intercept:</b> top = 0 → x = ${fr(-b,a)}. &nbsp; <b>y-intercept:</b> f(0) = ${fr(b,d)}`,ans(`VA x = ${fr(-d,c)}; HA y = ${fr(a,c)}; x-int (${fr(-b,a)}, 0); y-int (0, ${fr(b,d)}); domain x ≠ ${fr(-d,c)}`)])}; }
  if(t===1){ let p,q,r; do{p=R(-5,5);q=R(-5,5);r=R(-5,5);}while(new Set([p,q,r]).size<3||q*r===0); const k=P([1,2,3,-1,-2]);
    const f=x=>k*(x-p)/((x-q)*(x-r)), D=poly(fromRoots([q,r]));
    return {g:RG(f,[q,r],{h:[0],p:[[p,0],[0,f(0)]],cap:`Vertical asymptotes x = ${q} and x = ${r}; horizontal asymptote y = 0.`}),
      q:`For f(x) = {{${poly([k,-k*p])}|${D}}}, find the vertical and horizontal asymptotes and the intercepts.`,
      a:J([`Factor the bottom: ${facStr(q)}${facStr(r)}. Nothing cancels with the top.`,`<b>Vertical asymptotes:</b> x = ${q} and x = ${r}`,`<b>Horizontal asymptote:</b> degree of top (1) < degree of bottom (2) → y = 0`,
        `<b>x-intercept:</b> x = ${p}. <b>y-intercept:</b> f(0) = ${fr(-k*p,q*r)}`,ans(`VA x = ${q}, x = ${r}; HA y = 0; x-int (${p}, 0); y-int (0, ${fr(-k*p,q*r)})`)])}; }
  if(t===2){ let h,p,q; do{h=R(-5,5);p=R(-5,5);q=R(-5,5);}while(new Set([h,p,q]).size<3);
    const f=x=>(x-p)/(x-q), hy=(h-p)/(h-q);
    return {g:RG(f,[q],{h:[1],p:[[h,hy,`hole (${h}, ${N(hy)})`,true],[p,0]],cap:`Hole at x = ${h}, vertical asymptote x = ${q}, horizontal asymptote y = 1.`}),
      q:`For f(x) = {{${poly(fromRoots([h,p]))}|${poly(fromRoots([h,q]))}}}, find any holes, vertical asymptotes and horizontal asymptotes.`,
      a:J([`Factor: {{${facStr(h)}${facStr(p)}|${facStr(h)}${facStr(q)}}}`,`${facStr(h)} cancels → <b>hole</b> at x = ${h}. Its y-value: plug ${h} into {{${poly([1,-p])}|${poly([1,-q])}}} → ${fr(h-p,h-q)}`,
        `<b>Vertical asymptote:</b> x = ${q} (the factor that does not cancel)`,`<b>Horizontal asymptote:</b> equal degrees, leading coefficients 1 and 1 → y = 1`,ans(`hole (${h}, ${fr(h-p,h-q)}); VA x = ${q}; HA y = 1`)])}; }
  let b,c,q; do{b=R(-5,5);c=R(-8,8);q=R(-4,4);}while(c+q*(b+q)===0);
  const rem=c+q*(b+q), f=x=>(x*x+b*x+c)/(x-q);
  return {adv:true,g:RG(f,[q],{slant:x=>x+b+q,p:[],cap:`Vertical asymptote x = ${q}; slant asymptote y = ${poly([1,b+q])} (dashed).`}),
    q:`Find the vertical and slant (oblique) asymptotes of f(x) = {{${poly([1,b,c])}|${poly([1,-q])}}}.`,
    a:J([`Degree of top is exactly one more than the bottom → <b>slant asymptote</b>. Divide (synthetic division with ${q}):`,synthTable([q,1],[1,b,c]).html,
      `f(x) = ${poly([1,b+q])} + {{${rem}|${poly([1,-q])}}}. As x → ±∞, the fraction → 0.`,`<b>Vertical asymptote:</b> x = ${q} (remainder ${rem} ≠ 0, so no hole)`,ans(`VA x = ${q}; slant asymptote y = ${poly([1,b+q])}`)])};
}
function solveRat(){
  if(Math.random()<0.5){ // p/x + q/(x-a) = 1
    for(;;){ const r1=RN(-6,6), r2=RN(-6,6), a=RN(-6,6); if(r1===r2||r1===a||r2===a) continue; if((r1*r2)%a) continue;
      const p=r1*r2/a, q=r1+r2-a-p; if(!p||!q) continue; const eq=q<0?`{{${p}|x}} - {{${-q}|${poly([1,-a])}}} = 1`:`{{${p}|x}} + {{${q}|${poly([1,-a])}}} = 1`;
      return {q:`Solve ${eq}.`,a:J([`Excluded values: x ≠ 0, x ≠ ${a}. LCD: x(${poly([1,-a])})`,`Multiply every term by the LCD: ${p}(${poly([1,-a])}) ${q<0?"-":"+"} ${Math.abs(q)===1?"":Math.abs(q)}x = x(${poly([1,-a])})`,
        `${poly([p+q,-p*a])} = ${poly([1,-a,0])} → ${poly([1,-(a+p+q),p*a])} = 0`,`Factor: ${facStr(r1)}${facStr(r2)} = 0 → x = ${r1} or x = ${r2}`,`Neither is an excluded value, so both work.`,ans(`x = ${r1} or x = ${r2}`)]),
        ck:{t:"sol",eq:`${p}/x + ${q}/(x - (${a})) = 1`,s:[`${r1}`,`${r2}`]}}; } }
  let r1,r2; do{r1=R(-6,6);r2=R(-6,6);}while(r1===r2);
  const ext=Math.random()<0.6, a=ext?r2:(()=>{let v;do v=R(-6,6);while(v===r1||v===r2);return v;})();
  const B=-(r1+r2), Cc=-r1*r2, eq=`{{${poly([1,B,0])}|${poly([1,-a])}}} = {{${Cc}|${poly([1,-a])}}}`;
  const good=ext?[r1]:[r1,r2];
  return {q:`Solve ${eq}.`,a:J([`Excluded value: x ≠ ${a}.`,`Multiply both sides by (${poly([1,-a])}): ${poly([1,B,0])} = ${Cc}`,`${poly([1,B,-Cc])} = 0 → ${facStr(r1)}${facStr(r2)} = 0 → x = ${r1} or x = ${r2}`,
    ext?`x = ${r2} makes the denominator 0, so it is <b>extraneous</b>.`:`Neither answer is excluded.`,ans(good.map(v=>`x = ${v}`).join(" or "))]),ck:{t:"sol",eq:`(${poly([1,B,0])})/(${poly([1,-a])}) = ${Cc}/(${poly([1,-a])})`,s:good.map(String)}};
}
function ratIneqG(){
  let p,q; do{p=R(-6,6);q=R(-6,6);}while(p===q);
  const sym=P(["<","≤",">","≥"]), pos=sym===">"||sym==="≥", incl=sym==="≤"||sym==="≥", lo=Math.min(p,q), hi=Math.max(p,q);
  const inside=!pos; const pin=incl; // zero p included if incl; q never included
  const cl=v=>v===p&&pin;
  let res, xi, pyS;
  if(inside){ res=`${cl(lo)?"[":"("}${lo}, ${hi}${cl(hi)?"]":")"}`; xi=[[lo,hi,cl(lo),cl(hi)]]; pyS=`Interval(${lo},${hi},${cl(lo)?"False":"True"},${cl(hi)?"False":"True"})`; }
  else { res=`(-∞, ${lo}${cl(lo)?"]":")"} ∪ ${cl(hi)?"[":"("}${hi}, ∞)`; xi=[[-Infinity,lo,false,cl(lo)],[hi,Infinity,cl(hi),false]]; pyS=`Union(Interval(-oo,${lo},True,${cl(lo)?"False":"True"}),Interval(${hi},oo,${cl(hi)?"False":"True"},True))`; }
  return {adv:true,g:RG(x=>(x-p)/(x-q),[q],{h:[1],p:[[p,0]],xi,cap:"The shaded part of the x-axis is the solution (the asymptote value is never included)."}),
    q:`Solve {{${poly([1,-p])}|${poly([1,-q])}}} ${sym} 0.`,
    a:J([`Critical values: top = 0 at x = ${p}; bottom = 0 at x = ${q} (never included).`,`Sign chart: (-∞, ${lo}) : + &nbsp;|&nbsp; (${lo}, ${hi}) : − &nbsp;|&nbsp; (${hi}, ∞) : +`,
      `We want ${pos?"positive":"negative"}${incl?" or zero":""}.${incl?` Include x = ${p} (makes the fraction 0) but not x = ${q}.`:""}`,ans(res)]),
    ck:{t:"ineq",py:`(x-(${p}))/(x-(${q})) ${{"<":"<","≤":"<=",">":">","≥":">="}[sym]} 0`,s:pyS}};
}
function variation(){
  const t=R(0,2);
  if(t===0){ const k=RN(-6,6), x1=RN(-6,6), x2=RN(-9,9);
    return {g:{f:[x=>k*x],p:[[x1,k*x1],[x2,k*x2]],cap:`Direct variation: a line through the origin, y = ${cx(k)}.`},
      q:`y varies directly with x, and y = ${k*x1} when x = ${x1}. Find y when x = ${x2}.`,a:J([`Direct variation: y = kx. ${k*x1} = k(${x1}) → k = ${k}`,`y = ${k}(${x2})`,ans(`y = ${k*x2}`)])}; }
  if(t===1){ const k=P([12,18,24,36,48,60,72]), x1=P(divisors(k).filter(d=>d<k)), x2=P(divisors(k));
    return {g:{f:[{f:x=>k/x,d:[0.05,1e9]}],p:[[x1,k/x1],[x2,k/x2]],xr:[-1,Math.max(x1,x2)*1.6+1],yr:[-2,Math.max(k/x1,k/x2)*1.3+2],cap:`Inverse variation: y = ${k}/x (shown for x > 0).`},
      q:`y varies inversely with x, and y = ${k/x1} when x = ${x1}. Find y when x = ${x2}.`,a:J([`Inverse variation: y = {{k|x}}. ${k/x1} = {{k|${x1}}} → k = ${k}`,x2===1?`y = ${k}/1`:`y = {{${k}|${x2}}}`,ans(`y = ${k/x2}`)])}; }
  const k=R(2,5), x1=R(1,6), y1=R(1,6), x2=R(1,8), y2=R(1,8);
  return {q:`z varies jointly with x and y, and z = ${k*x1*y1} when x = ${x1} and y = ${y1}. Find z when x = ${x2} and y = ${y2}.`,a:J([`Joint variation: z = kxy. ${k*x1*y1} = k(${x1})(${y1}) → k = ${k}`,`z = ${k}(${x2})(${y2})`,ans(`z = ${k*x2*y2}`)])};
}

/* ================= UNIT 6: radicals & inverses ================= */
const SQF=[2,3,5,6,7,10,11,13,14,15], CBF=[2,3,4,5,6,7,9,10];
const xp=(v,e)=>e===0?"":e===1?v:`${v}^${e}`;
function simpRadG(){
  if(Math.random()<0.6){
    const s=R(2,6), m=P(SQF), p=R(1,7), q=R(0,5), c=s*s*m;
    const out=`${s}${xp("x",Math.floor(p/2))}${xp("y",Math.floor(q/2))}`, inn=`${m}${xp("x",p%2)}${xp("y",q%2)}`;
    return {q:`Simplify √(${c}${xp("x",p)}${xp("y",q)}). Assume all variables are positive.`,
      a:J([`Split into perfect squares: ${c} = ${s*s} · ${m}${p>1?`, ${xp("x",p)} = ${p>=2?xp("x",2*Math.floor(p/2)):""}${p%2?" · x":""}`:""}${q>1?`, ${xp("y",q)} = ${xp("y",2*Math.floor(q/2))}${q%2?" · y":""}`:""}`,
        `Take the square root of each perfect square: √${s*s} = ${s}${p>1?`, √(${xp("x",2*Math.floor(p/2))}) = ${xp("x",Math.floor(p/2))}`:""}${q>1?`, √(${xp("y",2*Math.floor(q/2))}) = ${xp("y",Math.floor(q/2))}`:""}`,ans(`${out}√(${inn})`)]),
      ck:{t:"numx",l:`√(${c}${xp("x",p)}${xp("y",q)})`,r:`${out}√(${inn})`}};
  }
  const s=R(2,4), m=P(CBF), p=R(1,10), neg=Math.random()<0.3, c=(neg?-1:1)*s**3*m;
  const out=`${neg?"-":""}${s}${xp("x",Math.floor(p/3))}`, inn=`${m}${xp("x",p%3)}`;
  return {q:`Simplify ∛(${c}${xp("x",p)}).`,
    a:J([`Look for perfect cubes: ${Math.abs(c)} = ${s**3} · ${m}${p>=3?`, ${xp("x",p)} = ${xp("x",3*Math.floor(p/3))}${p%3?" · "+xp("x",p%3):""}`:""}${neg?"; ∛(-1) = -1":""}`,
      `∛${s**3} = ${s}${p>=3?`, ∛(${xp("x",3*Math.floor(p/3))}) = ${xp("x",Math.floor(p/3))}`:""}`,ans(`${out}∛(${inn})`)]),ck:{t:"numx",l:`∛(${c}${xp("x",p)})`,r:`${out}∛(${inn})`}};
}
function ratExpEval(){
  const s=R(2,5), q=P([2,3,4].filter(v=>s**v<=625)), p=P([1,2,3].filter(v=>gcd(v,q)===1&&v<=q+1)), neg=Math.random()<0.35, b=s**q;
  const e=`${neg?"-":""}${p}/${q}`, val=neg?`{{1|${s**p}}}`:`${s**p}`;
  const negB=q===3&&Math.random()<0.3;
  if(negB) return {q:`Evaluate (-${b})^(${p}/3).`,a:J([`a^(m/n) = (ⁿ√a)^m. The cube root of a negative number is negative.`,`(-${b})^(${p}/3) = (∛(-${b}))^${p} = (-${s})^${p}`,ans(`${(-s)**p}`)]),ck:{t:"num",l:`real_root(-${b},3)^${p}`,r:`${(-s)**p}`}};
  const root=q===2?`√${b}`:q===3?`∛${b}`:`∜${b}`;
  return {q:`Evaluate ${b}^(${e}).`,a:J([`a^(m/n) = (ⁿ√a)^m${neg?" and a^(-k) = {{1|a^k}}":""}.`,neg?`${b}^(${e}) = {{1|${b}^(${p}/${q})}}`:"",`${root} = ${s}, so ${b}^(${p}/${q}) = ${s}^${p} = ${s**p}`,ans(val)].filter(Boolean)),
    ck:{t:"num",l:`${b}^(${neg?"-":""}${p}/${q})`,r:neg?`1/${s**p}`:`${s**p}`}};
}
function ratExpSimp(){
  const t=R(0,2); let a,b,c,d; do{a=R(1,7);b=P([2,3,4,5]);c=R(1,7);d=P([2,3,4,5,6]);}while(gcd(a,b)!==1||gcd(c,d)!==1);
  const E=(n,m)=>{const g=gcd(n,m);n/=g;m/=g;return m===1?`${n}`:`${n}/${m}`;}, L=b*d/gcd(b,d);
  let q,res,st,num,den;
  if(t===0){ num=a*d+c*b; den=b*d; q=`x^(${a}/${b}) · x^(${c}/${d})`; st=[`Multiplying → <b>add</b> exponents: {{${a}|${b}}} + {{${c}|${d}}} = {{${a*L/b}|${L}}} + {{${c*L/d}|${L}}} = ${fr(num,den)}`]; }
  else if(t===1){ num=a*c; den=b*d; q=`(x^(${a}/${b}))^(${c}/${d})`; st=[`Power of a power → <b>multiply</b> exponents: {{${a}|${b}}} · {{${c}|${d}}} = ${fr(num,den)}`]; }
  else { num=a*d-c*b; den=b*d; if(num<=0) return ratExpSimp(); q=`{{x^(${a}/${b})|x^(${c}/${d})}}`; st=[`Dividing → <b>subtract</b> exponents: {{${a}|${b}}} - {{${c}|${d}}} = {{${a*L/b}|${L}}} - {{${c*L/d}|${L}}} = ${fr(num,den)}`]; }
  const g=gcd(num,den); num/=g; den/=g; res=den===1?xp("x",num)||"1":`x^(${num}/${den})`;
  const rad=den===1?"":den===2?`√(${xp("x",num)})`:den===3?`∛(${xp("x",num)})`:den===4?`∜(${xp("x",num)})`:`ⁿ√ with n = ${den}`;
  if(den>1&&den<=4) st.push(`In radical form: ${res} = ${rad}`);
  return {q:`Simplify ${q}. Assume x > 0.`,a:J([...st,ans(res)]),ck:{t:"numx",l:q.replace("·","*"),r:res}};
}
function radOps(){
  const t=R(0,3), m=P([2,3,5,6,7]);
  if(t===0){ const s1=R(2,5), s2=R(2,5), a=RN(-4,5), b=R(1,5), op=P(["+","-"]), bb=op==="+"?b:-b, tot=a*s1+bb*s2;
    return {q:`Simplify ${a===1?"":a===-1?"-":a}√${s1*s1*m} ${op} ${b===1?"":b===-1?"-":b}√${s2*s2*m}.`,a:J([`Simplify each radical: √${s1*s1*m} = ${s1}√${m}, √${s2*s2*m} = ${s2}√${m}`,`${a}(${s1}√${m}) ${op} ${b}(${s2}√${m}) = ${a*s1}√${m} ${op} ${b*s2}√${m}`,`Like radicals: combine the coefficients.`,ans(tot===0?"0":`${tot===1?"":tot===-1?"-":tot}√${m}`)]),
      ck:{t:"num",l:`${a}*sqrt(${s1*s1*m}) ${op} ${b}*sqrt(${s2*s2*m})`,r:`${tot}*sqrt(${m})`}}; }
  if(t===1){ const a=RN(-6,6), b=RN(-3,3), c=RN(-6,6), d=RN(-3,3), re=a*c+b*d*m, ir=a*d+b*c;
    const A=`${a} ${b<0?"-":"+"} ${Math.abs(b)===1?"":Math.abs(b)}√${m}`, B=`${c} ${d<0?"-":"+"} ${Math.abs(d)===1?"":Math.abs(d)}√${m}`;
    return {q:`Multiply (${A})(${B}).`,a:J([`FOIL: ${a*c} ${a*d<0?"-":"+"} ${Math.abs(a*d)}√${m} ${b*c<0?"-":"+"} ${Math.abs(b*c)}√${m} ${b*d<0?"-":"+"} ${Math.abs(b*d)}(√${m})^2`,`(√${m})^2 = ${m}: ${a*c} ${b*d*m<0?"-":"+"} ${Math.abs(b*d*m)}${ir?` ${ir<0?"-":"+"} ${Math.abs(ir)===1?"":Math.abs(ir)}√${m}`:" (the √ terms cancel)"}`,ans(ir===0?`${re}`:`${re} ${ir<0?"-":"+"} ${Math.abs(ir)===1?"":Math.abs(ir)}√${m}`)]),
      ck:{t:"num",l:`(${a}+${b}*sqrt(${m}))*(${c}+${d}*sqrt(${m}))`,r:`${re}+${ir}*sqrt(${m})`}}; }
  if(t===2){ const k=RN(-12,12); const g=gcd(k,m);
    return {q:`Rationalize the denominator: {{${k}|√${m}}}.`,a:J([`Multiply top and bottom by √${m}: {{${k}√${m}|${m}}}`,ans(m/g===1?`${k/g}√${m}`:`${k/g<0?"-":""}{{${Math.abs(k/g)===1?"":Math.abs(k/g)}√${m}|${m/g}}}`)]),ck:{t:"num",l:`${k}/sqrt(${m})`,r:m/g===1?`${k/g}*sqrt(${m})`:`${k/g}*sqrt(${m})/${m/g}`}}; }
  let a,k; do{a=R(1,5);k=RN(-10,10);}while(a*a===m);
  const D=a*a-m, g=gcd(gcd(k*a,k),D), n1=k*a/g, n2=k/g, d=D/g, sgn=d<0?-1:1;
  const top=`${sgn*n1} ${sgn*n2<0?"+":"-"} ${Math.abs(n2)===1?"":Math.abs(n2)}√${m}`;
  return {adv:true,q:`Rationalize the denominator: {{${k}|${a} + √${m}}}.`,a:J([`Multiply by the conjugate {{${a} - √${m}|${a} - √${m}}}.`,`Bottom: ${a}^2 - (√${m})^2 = ${a*a} - ${m} = ${D}`,`Top: ${k}(${a} - √${m}) = ${k*a} ${k<0?"+":"-"} ${Math.abs(k)}√${m}`,
    ans(Math.abs(d)===1?top:`{{${top}|${Math.abs(d)}}}`)]),ck:{t:"num",l:`${k}/(${a}+sqrt(${m}))`,r:`(${sgn*n1} - (${sgn*n2})*sqrt(${m}))/${Math.abs(d)}`}};
}
function radEqG(){
  const t=R(0,3);
  if(t<=1){ for(;;){ const r1=R(-6,8), r2=R(-6,8), c=R(-6,6); if(r1===r2) continue; const a=2*c+r1+r2, b=c*c-r1*r2; if(!a) continue;
      if(a*r1+b<0||a*r2+b<0) continue; const v1=r1+c>=0, v2=r2+c>=0; if(!v1&&!v2) continue;
      const eq=`√(${poly([a,b])}) = ${poly([1,c])}`, good=[r1,r2].filter(r=>r+c>=0);
      const chk=r=>`x = ${r}: √(${a*r+b}) = ${Math.sqrt(a*r+b)} and ${r}${sgz(c)} = ${r+c} ${r+c>=0?"✓":"✗ (extraneous)"}`;
      return {g:{f:[x=>Math.sqrt(a*x+b),{f:x=>x+c,light:true}],p:[...good.map(r=>[r,r+c]),...[r1,r2].filter(r=>r+c<0).map(r=>[r,Math.sqrt(a*r+b),`x = ${r} is extraneous`,true])],cap:"Solutions are where the curve meets the gray line."},
        q:`Solve ${eq}.`,a:J([`Square both sides: ${poly([a,b])} = ${c?`(${poly([1,c])})^2 = ${poly([1,2*c,c*c])}`:"x^2"}`,`${poly([1,2*c-a,c*c-b])} = 0 → ${facStr(r1)}${facStr(r2)} = 0 → x = ${r1} or x = ${r2}`,`<b>Check</b> (squaring can create extraneous answers):`,chk(r1),chk(r2),ans(good.map(v=>`x = ${v}`).join(" or "))]),
        ck:{t:"sol",eq,s:good.map(String)}}; } }
  if(t===2){ const c=RN(-4,4), a=P([1,2,3]), x=R(-8,8), b=c**3-a*x;
    return {g:{f:[x=>Math.cbrt(a*x+b)],h:[c],p:[[x,c]]},q:`Solve ∛(${poly([a,b])}) = ${c}.`,a:J([`Cube both sides: ${poly([a,b])} = ${c**3}`,`${cx(a)} = ${c**3-b} → x = ${x}`,`(Cube roots can be negative, so there is nothing to reject.)`,ans(`x = ${x}`)]),ck:{t:"sol",eq:`${poly([a,b])} = ${c**3}`,s:[`${x}`]}}; }
  const k=R(2,5), a=RN(-6,6), sol=k*k-a;
  return {adv:true,q:`Solve (${poly([1,a])})^(3/2) = ${k**3}.`,a:J([`Raise both sides to the 2/3 power (the reciprocal of 3/2): ${poly([1,a])} = ${k**3}^(2/3) = (∛${k**3})^2 = ${k*k}`,`x = ${k*k} ${a<0?"+":"-"} ${Math.abs(a)} = ${sol}`,`Check: (${sol + a})^(3/2) = (√${k*k})^3 = ${k}^3 = ${k**3} ✓`,ans(`x = ${sol}`)]),ck:{t:"sol",eq:`${poly([1,a])} = ${k*k}`,s:[`${sol}`]}};
}
function composeG(){
  const a=RN(-4,4), b=R(-6,6), c=R(-6,6), k=R(-3,3), p=RN(-3,3);
  const f=poly([a,b]), g=poly([1,0,c]), fg=poly([a,0,a*c+b]), gf=poly([a*a,2*a*b,b*b+c]), fgk=a*(k*k+c)+b;
  return {q:`f(x) = ${f} and g(x) = ${g}. Find (a) (f ∘ g)(x) (b) (g ∘ f)(x) (c) (f ∘ g)(${k}).`,
    a:J([`(a) f(g(x)) = ${a===1?"":a===-1?"-":a}(${g})${b?sg(b):""} = <b>${fg}</b>`,`(b) g(f(x)) = (${f})^2${c?sg(c):""} = ${poly([a*a,2*a*b,b*b])}${c?sg(c):""} = <b>${gf}</b>`,
      `(c) g(${k}) = ${k*k+c}, then f(${k*k+c}) = ${a}(${k*k+c})${b?sg(b):""} = <b>${fgk}</b>`,`<i>Notice:</i> f ∘ g and g ∘ f are usually different.`]),ck:{t:"id",l:`${a}*(${g})+(${b})`,r:fg}};
}
function inverseG(){
  const t=R(0,2), N=PL().num;
  if(t===0){ const a=RN(-5,5), b=R(-9,9), d=P([1,1,2,3]);
    const f=d===1?poly([a,b]):`{{${poly([a,b])}|${d}}}`, inv=`{{${d===1?"x":d+"x"}${b?sg(-b):""}|${a}}}`.replace("|1}}","|1}}");
    const invS=a===1?(d===1?poly([1,-b]):poly([d,-b])):inv;
    return {g:{f:[x=>(a*x+b)/d,{f:x=>(d*x-b)/a,light:true},{f:x=>x,dash:true}],eq:true,xr:[-8,8],yr:[-8,8],cap:"f (black) and f⁻¹ (gray) are reflections over y = x (dashed)."},
      q:`Find the inverse of f(x) = ${f}.`,a:J([`Write y = ${f}, then <b>swap x and y</b>: x = ${d===1?poly([a,b],"y"):`{{${poly([a,b],"y")}|${d}}}`}`,d>1?`Multiply by ${d}: ${d}x = ${poly([a,b],"y")}`:"",`Solve for y: ${a===1?"y":a+"y"} = ${d===1?"x":d+"x"}${b?sg(-b):""}${a!==1?` → y = ${inv}`:""}`,ans(`f⁻¹(x) = ${invS}`)].filter(Boolean)),
      ck:{t:"inv",f:`(${a}*x+(${b}))/${d}`,g:`(${d}*x-(${b}))/(${a})`}}; }
  if(t===1){ const a=P([1,2,-1]), h=R(-4,4), k=R(-6,6);
    const f=`${lead(a)}(${poly([1,-h])})^3${k?sg(k):""}`, inside=a===1?poly([1,-k]):`{{${poly([1,-k])}|${a}}}`, inv=`∛(${inside})${h?sg(h):""}`;
    return {g:{f:[x=>a*(x-h)**3+k,{f:x=>Math.cbrt((x-k)/a)+h,light:true},{f:x=>x,dash:true}],eq:true,xr:[-9,9],yr:[-9,9],cap:"f (black) and f⁻¹ (gray) are reflections over y = x (dashed)."},
      q:`Find the inverse of f(x) = ${f}.`,a:J([`Swap x and y: x = ${lead(a)}(${poly([1,-h],"y")})^3${k?sg(k):""}`,`Isolate the cube: ${a===1?"":a===-1?"-":a}(${poly([1,-h],"y")})^3 = ${poly([1,-k])}${a!==1?` → (${poly([1,-h],"y")})^3 = ${inside}`:""}`,`Take the cube root and ${h>0?"add "+h:h<0?"subtract "+(-h):"you are done"}.`,ans(`f⁻¹(x) = ${inv}`)]),
      ck:{t:"inv",f:`${a}*(x-(${h}))**3+(${k})`,g:`root3((x-(${k}))/(${a}))+(${h})`}}; }
  let a,b,c,d; do{a=RN(-4,4);b=R(-6,6);c=RN(-3,3);d=R(-6,6);}while(a*d-b*c===0||a+d===0&&b===0);
  const f=`{{${poly([a,b])}|${poly([c,d])}}}`, inv=`{{${poly([-d,b])}|${poly([c,-a])}}}`;
  return {adv:true,g:RG(x=>(a*x+b)/(c*x+d),[-d/c],{h:[a/c],p:[],cap:`f has VA x = ${N(-d/c)} and HA y = ${N(a/c)}; for f⁻¹ they swap.`}),
    q:`Find the inverse of f(x) = ${f}.`,a:J([`Swap: x = {{${poly([a,b],"y")}|${poly([c,d],"y")}}}`,`Multiply: x(${poly([c,d],"y")}) = ${poly([a,b],"y")} → ${c===1?"":c===-1?"-":c}xy${d?(d<0?" - ":" + ")+(Math.abs(d)===1?"":Math.abs(d))+"x":""} = ${poly([a,b],"y")}`,
      `Get the y-terms together: ${c===1?"":c===-1?"-":c}xy ${a<0?"+":"-"} ${Math.abs(a)===1?"":Math.abs(a)}y = ${poly([-d,b])}`,`Factor out y: y(${poly([c,-a])}) = ${poly([-d,b])}`,ans(`f⁻¹(x) = ${inv}`)]),
    ck:{t:"inv",f:`(${a}*x+(${b}))/(${c}*x+(${d}))`,g:`(${-d}*x+(${b}))/(${c}*x-(${a}))`}};
}
function inverseQuad(){
  const a=P([1,1,2,3]), h=R(-4,4), k=R(-5,5);
  const f=`${lead(a)}(${poly([1,-h])})^2${k?sg(k):""}`, inside=a===1?poly([1,-k]):`{{${poly([1,-k])}|${a}}}`;
  return {adv:true,g:{f:[{f:x=>a*(x-h)**2+k,d:[h,1e9]},{f:x=>h+Math.sqrt((x-k)/a),d:[k,1e9],light:true},{f:x=>x,dash:true}],p:[[h,k],[k,h]],eq:true,xr:[Math.min(h,k)-2,Math.max(h,k)+8],cap:"Restricting the domain makes f one-to-one, so it has an inverse."},
    q:`Find the inverse of f(x) = ${f} for x ≥ ${h}, and give the domain and range of f⁻¹.`,
    a:J([`Swap x and y: x = ${lead(a)}(${poly([1,-h],"y")})^2${k?sg(k):""}`,`(${poly([1,-h],"y")})^2 = ${inside} → ${poly([1,-h],"y")} = +√(${inside}) (take + because y ≥ ${h})`,
      ans(`f⁻¹(x) = ${h?h+" + ":""}√(${inside})`)+`; domain x ≥ ${k}, range y ≥ ${h}`]),ck:{t:"inv",f:`${a}*(x-(${h}))**2+(${k})`,g:`${h}+sqrt((x-(${k}))/${a})`,pos:k+1}};
}
function radGraphG(){
  const cube=Math.random()<0.35, a=P([1,2,-1,-2,3]), h=R(-5,5), k=R(-5,5), N=PL().num;
  const f=`${lead(a)}${cube?"∛":"√"}(${poly([1,-h])})${k?sg(k):""}`;
  const fn=cube?x=>a*Math.cbrt(x-h)+k:x=>a*Math.sqrt(x-h)+k;
  return {g:{f:[cube?fn:{f:fn,d:[h,1e9]}],p:[[h,k,cube?`center (${h}, ${k})`:`start (${h}, ${k})`],[h+1,a+k],cube?[h-1,-a+k]:[h+4,2*a+k]],kx:[h-6,h+8],cap:cube?"Cube root graphs extend in both directions.":"Square root graphs start at (h, k)."},
    q:`Graph y = ${f}. Give the ${cube?"center point":"starting point"}, domain and range, and describe the transformations.`,
    a:J([`Parent: y = ${cube?"∛x":"√x"}. Shift ${h>0?"right "+h:h<0?"left "+(-h):"no horizontal shift"}, ${k>0?"up "+k:k<0?"down "+(-k):"no vertical shift"}${Math.abs(a)>1?`, vertical stretch by ${Math.abs(a)}`:""}${a<0?", reflect over the x-axis":""}.`,
      `${cube?"Center":"Starting point"}: (${h}, ${k}). Plot a few points: (${h+1}, ${a+k})${cube?`, (${h-1}, ${-a+k})`:`, (${h+4}, ${2*a+k})`}`,
      ans(cube?`domain all reals, range all reals`:`domain x ≥ ${h}, range y ${a>0?"≥":"≤"} ${k}`)])};
}

/* ================= UNIT 7: exponential & logarithmic ================= */
const money=v=>"$"+v.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
const d2=v=>(Math.round(v*100)/100).toLocaleString("en-US",{maximumFractionDigits:2});
function expModel(){
  const grow=Math.random()<0.5, a=P([200,500,800,1200,2500,4000,5000]), r=P([2,3,4,5,6,8,10,12,15,20,25]), t=R(2,10), b=grow?1+r/100:1-r/100, v=a*b**t;
  const what=grow?P(["A town's population","A bacteria colony","An investment"]):P(["A car's value","A medicine dose in the body","A phone's value"]);
  return {g:{f:[{f:x=>a*b**x,d:[0,1e9]}],p:[[0,a,`start (0, ${a})`],[t,v,`t = ${t}`]],xr:[-0.5,t+2],noZero:false,cap:grow?"Exponential growth: b > 1.":"Exponential decay: 0 < b < 1."},
    q:`${what} starts at ${a} and ${grow?"grows":"decreases"} by ${r}% per year. Write a model and find the value after ${t} years (nearest hundredth).`,
    a:J([`${grow?"Growth":"Decay"} factor: b = 1 ${grow?"+":"-"} ${r/100} = ${b}`,`Model: y = ${a}(${b})^t`,`y(${t}) = ${a}(${b})^${t} ≈ ${d2(v)}`,ans(`y = ${a}(${b})^t; after ${t} years ≈ ${d2(v)}`)])};
}
function compound(){
  const Pp=P([500,1000,2000,2500,5000,10000]), r=P([2,3,4,5,6,8]), t=R(2,15), nn=P([1,2,4,12,"c"]);
  const v=nn==="c"?Pp*Math.exp(r/100*t):Pp*(1+r/100/nn)**(nn*t), nm={1:"annually",2:"semiannually",4:"quarterly",12:"monthly",c:"continuously"}[nn];
  return {g:{f:[{f:x=>nn==="c"?Pp*Math.exp(r/100*x):Pp*(1+r/100/nn)**(nn*x),d:[0,1e9]}],p:[[t,v,`after ${t} yr`]],xr:[-0.5,t+2],cap:"Balance over time."},
    q:`${money(Pp)} is invested at ${r}% interest compounded ${nm}. Find the balance after ${t} years.`,
    a:J([nn==="c"?`Continuous compounding: A = Pe^(rt)`:`A = P(1 + {{r|n}})^(nt) with n = ${nn}`,nn==="c"?`A = ${Pp}e^(${r/100}·${t}) = ${Pp}e^(${+(r/100*t).toFixed(4)})`:`A = ${Pp}(1 + {{${r/100}|${nn}}})^(${nn}·${t}) = ${Pp}(${+(1+r/100/nn).toFixed(6)})^${nn*t}`,ans(`≈ ${money(v)}`)])};
}
function logEval(){
  const b=P([2,3,4,5,10]), k=R(-3,b===10?4:5), kind=Math.random()<0.2?"root":"pow";
  if(kind==="root"){ return {q:`Evaluate log_${b}(√${b}).`,a:J([`√${b} = ${b}^(1/2)`,`log_${b}(${b}^(1/2)) = {{1|2}}`,ans("1/2")]),ck:{t:"num",l:`log(sqrt(${b}),${b})`,r:"1/2"}}; }
  const N=k>=0?`${b**k}`:`{{1|${b**-k}}}`, Npy=k>=0?`${b**k}`:`1/${b**-k}`;
  return {q:`Evaluate log_${b}(${N}).`,a:J([`log_${b}(${N}) = y means ${b}^y = ${N}.`,k>=0?`${b**k} = ${b}^${k}`:`{{1|${b**-k}}} = ${b}^(-${-k})`,ans(`${k}`)]),ck:{t:"num",l:`log(${Npy},${b})`,r:`${k}`}};
}
function logProps(){
  const b=P(["","2","3","5"]), L=b?`log_${b}`:"log", p=R(2,5), q=R(1,4), r=R(1,4), cond=Math.random()<0.5;
  const ex=`${p}${L}(x)${q>1?` + ${q}${L}(y)`:` + ${L}(y)`} - ${r>1?r:""}${L}(z)`.replace(/ \+ 1log/g," + log");
  const one=`${L}({{x^${p}${q>1?"y^"+q:"y"}|${r>1?"z^"+r:"z"}}})`;
  if(cond) return {q:`Condense into a single logarithm: ${ex}.`,a:J([`Power rule: n·log(M) = log(M^n) → ${L}(x^${p}) + ${L}(${q>1?"y^"+q:"y"}) - ${L}(${r>1?"z^"+r:"z"})`,`Product rule (add → multiply), quotient rule (subtract → divide).`,ans(one)])};
  return {q:`Expand completely: ${one}.`,a:J([`Quotient rule: ${L}(x^${p}${q>1?"y^"+q:"y"}) - ${L}(${r>1?"z^"+r:"z"})`,`Product rule: ${L}(x^${p}) + ${L}(${q>1?"y^"+q:"y"}) - ${L}(${r>1?"z^"+r:"z"})`,`Power rule: bring exponents to the front.`,ans(ex)])};
}
function solveExpSame(){
  for(;;){ const s=P([2,3]), u=R(1,3), v=R(1,3), a=R(1,2), d=R(1,2), c=R(-3,3), e=R(-3,3); if(u===v) continue; const den=u*a-v*d; if(!den) continue;
    const B1=s**u, B2=s**v, num=v*e-u*c, L=`${B1}^(${poly([a,c])})`, Rr=`${B2}^(${poly([d,e])})`;
    return {q:`Solve ${L} = ${Rr}.`,a:J([`Write both sides with base ${s}: ${B1} = ${s}^${u}, ${B2} = ${s}^${v}`,`${s}^(${u}(${poly([a,c])})) = ${s}^(${v}(${poly([d,e])}))`,`Same base → exponents equal: ${poly([u*a,u*c])} = ${poly([v*d,v*e])}`,`${cx(den)} = ${num} → x = ${fr(num,den)}`,ans(`x = ${fr(num,den)}`)]),
      ck:{t:"num",l:`(${u}*(${a}*X+(${c})) - ${v}*(${d}*X+(${e}))).subs(X,${frPy(num,den)})`.replace(/X/g,"x"),r:"0"}}; }
}
function solveExpLog(){
  const b=P([2,3,5,7,10,"e"]), a=P([1,1,2,3,4,5]), c=P([0,0,R(1,9),-R(1,5)]), N=R(10,200)*(a), rhs=N+c;
  const lhs=`${a>1?a:""}${b==="e"?"e":b}^x${c?sg(c):""}`, x=Math.log(N/a)/Math.log(b==="e"?Math.E:b);
  const st=[]; if(c) st.push(`${c>0?"Subtract "+c:"Add "+(-c)}: ${a>1?a:""}${b==="e"?"e":b}^x = ${N}`); if(a>1) st.push(`Divide by ${a}: ${b==="e"?"e":b}^x = ${N/a}`);
  st.push(b==="e"?`Take ln of both sides: x = ln(${N/a})`:`Take the log of both sides: x = {{log(${N/a})|log(${b})}} (change of base)`,ans(`x ≈ ${x.toFixed(3)}`));
  return {g:{f:[x=>a*(b==="e"?Math.E:b)**x+c],h:[rhs],p:[[x,rhs,`x ≈ ${x.toFixed(2)}`]],cap:"The solution is where the curve meets the line."},q:`Solve ${lhs} = ${rhs}. Round to the nearest thousandth.`,a:J(st),ck:{t:"approx",l:`${a}*(${b==="e"?"E":b})**x+(${c})`,r:`${rhs}`,x}};
}
function solveLogEq(){
  if(Math.random()<0.4){ const b=P([2,3,5,10]), k=R(1,b===10?3:4), a=R(1,4), c=R(-9,9); const M=b**k, num=M-c;
    return {q:`Solve log_${b}(${poly([a,c])}) = ${k}.`,a:J([`Rewrite in exponential form: ${poly([a,c])} = ${b}^${k} = ${M}`,`${cx(a)} = ${num} → x = ${fr(num,a)}`,`Check: ${poly([a,c])} = ${M} > 0 ✓`,ans(`x = ${fr(num,a)}`)]),ck:{t:"num",l:`${a}*(${frPy(num,a)})+(${c})`,r:`${M}`}}; }
  for(;;){ const b=P([2,3,2,5]), k=b===2?R(2,5):b===3?R(1,3):2, M=b**k, a=R(-4,6);
    // (x+a)(x+c) = M with integer roots: pick r1 valid
    const c=R(-4,6); const B=a+c, Cc=a*c-M, D=B*B-4*Cc; if(D<0||!isSq(D)) continue; const sd=Math.sqrt(D); if((-B+sd)%2) continue;
    const r1=(-B+sd)/2, r2=(-B-sd)/2; if(r1===r2) continue; const ok=r=>r+a>0&&r+c>0; const good=[r1,r2].filter(ok); if(!good.length||a===c) continue;
    const L1=`log_${b}(${poly([1,a])}) + log_${b}(${poly([1,c])})`;
    return {q:`Solve ${L1} = ${k}.`,a:J([`Product rule: log_${b}((${poly([1,a])})(${poly([1,c])})) = ${k}`,`Exponential form: (${poly([1,a])})(${poly([1,c])}) = ${b}^${k} = ${M}`,`${poly([1,B,a*c])} = ${M} → ${poly([1,B,Cc])} = 0 → x = ${r1} or x = ${r2}`,
      ...[r1,r2].map(r=>`x = ${r}: ${ok(r)?"both logs are defined ✓":`log of a non-positive number (${r+a}, ${r+c}) ✗ extraneous`}`),ans(good.map(v=>"x = "+v).join(" or "))]),ck:{t:"logeq",a,c,b,k,good,bad:[r1,r2].filter(r=>!ok(r))}}; }
}
function halfLife(){
  const A0=P([40,80,100,160,200,320,500,640]), h=P([2,3,4,5,6,8,10,12,30]), n=R(1,5), t=h*n, v=A0/2**n;
  return {g:{f:[{f:x=>A0*0.5**(x/h),d:[0,1e9]}],p:[[0,A0,`(0, ${A0})`],[t,v,`(${t}, ${d2(v)})`]],xr:[-h*0.2,t+h],cap:"Each half-life cuts the amount in half."},
    q:`A ${A0}-gram sample has a half-life of ${h} years. How much remains after ${t} years? Write a model.`,
    a:J([`Model: A(t) = ${A0}({{1|2}})^(t/${h})`,`${t} years = ${t}/${h} = ${n} half-li${n>1?"ves":"fe"}`,`A = ${A0}({{1|2}})^${n} = {{${A0}|${2**n}}}`,ans(`${d2(v)} grams`)])};
}

/* ================= UNIT 8: sequences & series ================= */
function arithG(){
  if(Math.random()<0.5){ const a1=R(-10,15), d=RN(-6,8), n=R(10,40), an=a1+(n-1)*d, S=n*(a1+an)/2;
    return {g:{p:[1,2,3,4,5,6].map(k=>[k,a1+(k-1)*d,""]),xr:[0,7],cap:"Arithmetic sequences lie on a line (constant difference)."},q:`For the arithmetic sequence ${a1}, ${a1+d}, ${a1+2*d}, ${a1+3*d}, ..., find a${n<10?"":""}<sub>${n}</sub> and the sum of the first ${n} terms.`,
      a:J([`d = ${a1+d} - ${par(a1)} = ${d}`,`a<sub>n</sub> = a<sub>1</sub> + (n - 1)d → a<sub>${n}</sub> = ${a1} + ${n-1}(${d}) = ${an}`,`S<sub>n</sub> = {{n(a<sub>1</sub> + a<sub>n</sub>)|2}} = {{${n}(${a1} + ${par(an)})|2}} = ${S}`,ans(`a<sub>${n}</sub> = ${an}, S<sub>${n}</sub> = ${S}`)]),ck:{t:"num",l:`${a1}+${n-1}*(${d})`,r:`${an}`}}; }
  const a1=R(-10,15), d=RN(-6,8), p=R(2,6), q=p+R(3,10), ap=a1+(p-1)*d, aq=a1+(q-1)*d;
  return {q:`In an arithmetic sequence, a<sub>${p}</sub> = ${ap} and a<sub>${q}</sub> = ${aq}. Find a<sub>1</sub>, d and an explicit formula.`,
    a:J([`From term ${p} to term ${q} there are ${q-p} steps: d = {{${aq} - ${par(ap)}|${q-p}}} = ${d}`,`a<sub>1</sub> = a<sub>${p}</sub> - ${p-1}d = ${ap} - ${p-1}(${d}) = ${a1}`,`a<sub>n</sub> = ${a1} + (n - 1)(${d}) = ${poly([d,a1-d],"n")}`,ans(`a<sub>1</sub> = ${a1}, d = ${d}, a<sub>n</sub> = ${poly([d,a1-d],"n")}`)])};
}
function geoG(){
  const a1=P([1,2,3,4,5,-2,-3]), r=P([2,3,-2,-3,2,4]), n=R(5,8), an=a1*r**(n-1), S=a1*(1-r**n)/(1-r);
  return {g:{p:[1,2,3,4,5].map(k=>[k,a1*r**(k-1),""]),xr:[0,6],cap:"Geometric sequences multiply by r each step."},q:`For the geometric sequence ${[0,1,2,3].map(k=>a1*r**k).join(", ")}, ..., find a<sub>${n}</sub> and S<sub>${n}</sub>.`,
    a:J([`r = {{${a1*r}|${a1}}} = ${r}`,`a<sub>n</sub> = a<sub>1</sub>r^(n-1) → a<sub>${n}</sub> = ${a1}(${r})^${n-1} = ${an}`,`S<sub>n</sub> = {{a<sub>1</sub>(1 - r^n)|1 - r}} = {{${a1}(1 - (${r})^${n})|1 - ${par(r)}}} = ${S}`,ans(`a<sub>${n}</sub> = ${an}, S<sub>${n}</sub> = ${S}`)]),ck:{t:"num",l:`${a1}*(1-(${r})**${n})/(1-(${r}))`,r:`${S}`}};
}
function infGeoG(){
  const [rn,rd]=P([[1,2],[1,3],[2,3],[1,4],[3,4],[-1,2],[-1,3],[1,5]]), a1=rd*R(1,8)*P([1,1,-1]), div=Math.random()<0.15;
  const series=ts=>ts.map((t,i)=>i===0?t:(String(t).startsWith("-")?` - ${String(t).slice(1)}`:` + ${t}`)).join("")+" + ...";
  if(div){ const r=P([2,3,-2]); return {q:`Find the sum of the infinite geometric series ${series([a1,a1*r,a1*r*r].map(String))}`,a:J([`r = ${r}. Since |r| = ${Math.abs(r)} ≥ 1, the terms grow and the series <b>diverges</b>.`,ans("no sum (diverges)")])}; }
  const one=fr(rd-rn,rd);
  return {q:`Find the sum of the infinite geometric series ${series([String(a1),fr(a1*rn,rd),fr(a1*rn*rn,rd*rd)])}`,
    a:J([`r = ${fr(rn,rd)}. |r| < 1, so the series converges.`,`S = {{a<sub>1</sub>|1 - r}}: 1 - r = 1 - ${rn<0?"(":""}${fr(rn,rd)}${rn<0?")":""} = ${one}`,`S = ${a1} ÷ ${one} = ${a1} · {{${rd}|${rd-rn}}}`,ans(fr(a1*rd,rd-rn))]),ck:{t:"num",l:`${a1}/(1-Rational(${rn},${rd}))`,r:fr(a1*rd,rd-rn)}};
}
function sigmaG(){
  if(Math.random()<0.6){ const p=RN(-4,6), q=R(-8,8), n=R(5,20), f=k=>p*k+q, S=n*(f(1)+f(n))/2;
    return {q:`Evaluate Σ (${poly([p,q],"k")}) for k = 1 to ${n}.`,a:J([`This is arithmetic: first term ${f(1)}, last term ${f(n)}, ${n} terms.`,`S = {{n(first + last)|2}} = {{${n}(${f(1)} + ${par(f(n))})|2}}`,ans(`${S}`)]),ck:{t:"num",l:`summation(${p}*k+(${q}),(k,1,${n}))`,r:`${S}`}}; }
  const a=R(1,5), r=P([2,3]), n=R(4,7), S=a*(r**n-1)/(r-1);
  return {q:`Evaluate Σ ${a>1?a+"·":""}${r}^(k-1) for k = 1 to ${n}.`,a:J([`Geometric: a<sub>1</sub> = ${a}, r = ${r}, n = ${n}.`,`S = {{${a}(${r}^${n} - 1)|${r} - 1}} = {{${a}(${r**n-1})|${r-1}}}`,ans(`${S}`)]),ck:{t:"num",l:`summation(${a}*${r}**(k-1),(k,1,${n}))`,r:`${S}`}};
}
function recursiveG(){
  let a1,p,q,t; do{ a1=R(-3,6); p=P([1,2,3,-1,2]); q=R(-5,5); t=[a1]; for(let i=1;i<5;i++) t.push(p*t[i-1]+q); }while(new Set(t).size<4);
  const rule=`a<sub>n</sub> = ${p===1?"":p===-1?"-":p}a<sub>n-1</sub>${q?sg(q):""}`;
  return {g:{p:t.map((v,i)=>[i+1,v,""]),xr:[0,6]},q:`a<sub>1</sub> = ${a1} and ${rule}. Find the first five terms.`,
    a:J(t.slice(1).map((v,i)=>`a<sub>${i+2}</sub> = ${p===1?"":p===-1?"-":p}(${t[i]})${q?sg(q):""} = ${v}`).concat([ans(t.join(", "))]))};
}

/* ================= UNIT 9: trigonometry ================= */
const TV={0:["0","1","0"],30:["1/2","√3/2","√3/3"],45:["√2/2","√2/2","1"],60:["√3/2","1/2","√3"],90:["1","0","undefined"]};
const piStr=(deg)=>{ if(deg===0) return "0"; const g=gcd(deg,180), n=deg/g, d=180/g; return `${n<0?"-":""}${Math.abs(n)===1?"":Math.abs(n)}π${d===1?"":"/"+d}`; };
function degRadG(){
  const deg=P([30,45,60,90,120,135,150,180,210,225,240,270,300,315,330,360,-45,-120,405,540]);
  if(Math.random()<0.5) return {q:`Convert ${deg}° to radians.`,a:J([`Multiply by {{π|180°}}: ${deg} · {{π|180}} = {{${deg}π|180}}`,ans(piStr(deg))])};
  return {q:`Convert ${piStr(deg)} radians to degrees.`,a:J([`Multiply by {{180°|π}}.`,ans(`${deg}°`)])};
}
function unitCircleG(){
  const base=P([0,30,45,60,90]), quad=R(0,3), deg=base===0||base===90?P([0,90,180,270]):[base,180-base,180+base,360-base][quad];
  const fn=P(["sin","cos","tan"]), q=deg%90===0?null:Math.floor(deg/90)+1, ref=deg%90===0?null:(deg<90?deg:deg<180?180-deg:deg<270?deg-180:360-deg);
  const exact=a=>{ const c=Math.round(Math.cos(a*Math.PI/180)*1e9)/1e9, s=Math.round(Math.sin(a*Math.PI/180)*1e9)/1e9; return {c,s}; };
  const {c,s}=exact(deg); const sv=v=>v===0?"0":v===1?"1":v===-1?"-1":null;
  let val;
  if(deg%90===0){ val=fn==="sin"?sv(s):fn==="cos"?sv(c):(c===0?"undefined":sv(s/c)); }
  else { const idx={sin:0,cos:1,tan:2}[fn], mag=TV[ref][idx], sign=fn==="sin"?s:fn==="cos"?c:s/c; val=(sign<0?"-":"")+mag; }
  const useRad=Math.random()<0.6, ang=useRad?piStr(deg):`${deg}°`;
  const st=deg%90===0?[`${deg}° is on an axis: the point on the unit circle is (${sv(c)}, ${sv(s)}).`,`cos = x, sin = y, tan = {{y|x}}.`]
    :[`${useRad?`${ang} = ${deg}°. `:""}Quadrant ${["I","II","III","IV"][q-1]}; reference angle ${ref}°.`,`${fn} ${ref}° = ${TV[ref][{sin:0,cos:1,tan:2}[fn]]}. In Quadrant ${["I","II","III","IV"][q-1]}, ${fn} is ${val.startsWith("-")?"negative":"positive"} (All Students Take Calculus).`];
  return {g:{f:[{f:x=>Math.sqrt(Math.max(0,1-x*x)),d:[-1,1],light:true},{f:x=>-Math.sqrt(Math.max(0,1-x*x)),d:[-1,1],light:true}],p:[[c,s,`(${(c).toFixed(2)}, ${(s).toFixed(2)})`]],seg:[[0,0,c,s]],xr:[-1.6,1.6],yr:[-1.4,1.4],eq:true,cap:"The point on the unit circle is (cos θ, sin θ)."},
    q:`Find the exact value of ${fn}(${ang}).`,a:J([...st,ans(val)]),ck:val==="undefined"?null:{t:"num",l:`${fn}(pi*${deg}/180)`,r:val}};
}
function sinusoidG(){
  const A=P([1,2,3,4,-2,-3]), B=P([1,2,3,0.5]), c=R(-2,2), D=R(-3,3), fn=P(["sin","cos"]), C=c*Math.PI/4;
  const Bs=B===0.5?"{{1|2}}":B===1?"":`${B}`, Cs=c===0?"x":`x ${c>0?"-":"+"} ${piStr(Math.abs(c)*45)}`, per=2*Math.PI/B;
  const perS=B===1?"2π":B===2?"π":B===3?"{{2π|3}}":"4π";
  const f=x=>A*(fn==="sin"?Math.sin:Math.cos)(B*(x-C))+D;
  return {g:{f:[f],h:[D],xpi:true,xr:[C-0.15,C+2*per+0.15],yr:[D-Math.abs(A)-1,D+Math.abs(A)+1],cap:"Dashed line: the midline y = D."},
    q:`For y = ${A===1?"":A===-1?"-":A}${fn}(${c===0?Bs+"x":B===1?Cs:Bs+"("+Cs+")"})${D?sg(D):""}, give the amplitude, period, phase shift, midline, maximum and minimum.`,
    a:J([`Form: y = A ${fn}(B(x - C)) + D with A = ${A}, B = ${B===0.5?"1/2":B}, C = ${c?piStr(c*45):"0"}, D = ${D}.`,`Amplitude |A| = ${Math.abs(A)}. Period {{2π|B}} = ${perS}.`,`Phase shift: ${c===0?"none":`${piStr(Math.abs(c)*45)} ${c>0?"right":"left"}`}. Midline y = ${D}.`,ans(`amplitude ${Math.abs(A)}, period ${perS}, shift ${c===0?"0":piStr(Math.abs(c)*45)+(c>0?" right":" left")}, midline y = ${D}, max ${D+Math.abs(A)}, min ${D-Math.abs(A)}`)])};
}
function trigEqG(){
  const opts=[["sin","1/2",[30,150]],["sin","-1/2",[210,330]],["sin","√2/2",[45,135]],["sin","-√3/2",[240,300]],["sin","√3/2",[60,120]],["cos","1/2",[60,300]],["cos","-1/2",[120,240]],["cos","√2/2",[45,315]],["cos","-√3/2",[150,210]],["tan","1",[45,225]],["tan","-√3",[120,300]],["sin","1",[90]],["cos","-1",[180]],["sin","0",[0,180]]];
  const [fn,v,sols]=P(opts), a=P([1,1,2]), b=P([0,0,R(-3,3)]);
  const neg=v.startsWith("-"), core=neg?v.slice(1):v, rad=(core.match(/√(\d)/)||[])[1]||"", rest0=core.replace(/√\d/,"")||"1", rest=rest0.startsWith("/")?"1"+rest0:rest0;
  const [n0,d0]=rest.includes("/")?rest.split("/").map(Number):[Number(rest)||(rad?1:0),1];
  const vNum=(neg?-1:1)*n0/d0*(rad?Math.sqrt(+rad):1);
  const g0=gcd(a*n0,d0)||1, nn=a*n0/g0, dd=d0/g0; // a*v = ±(nn/dd)√rad
  const av=(()=>{ if(!n0) return "0"; const c=rad?`${nn===1?"":nn}√${rad}`:`${nn}`; return (neg?"-":"")+(dd===1?c:`{{${c}|${dd}}}`); })();
  const rhs=!b?av:(!rad?fr((neg?-1:1)*a*n0+b*d0,d0):`${av}${sg(b)}`);
  const left=`${a>1?a:""}${fn} x${b?sg(b):""}`;
  const st=[]; if(b) st.push(`${b>0?"Subtract "+b:"Add "+(-b)}: ${a>1?a:""}${fn} x = ${av}`); if(a>1) st.push(`Divide by ${a}: ${fn} x = ${v}`);
  st.push(`${fn} is ${vNum>0?"positive":vNum<0?"negative":"zero"}${vNum?` in Quadrants ${fn==="sin"?(vNum>0?"I and II":"III and IV"):fn==="cos"?(vNum>0?"I and IV":"II and III"):(vNum>0?"I and III":"II and IV")}`:""}. Use the unit circle / special triangles.`,ans(`x = ${sols.map(d=>piStr(d)).join(", ")}`));
  return {g:{f:[x=>(fn==="sin"?Math.sin(x):fn==="cos"?Math.cos(x):Math.tan(x))],h:[vNum],xpi:true,xr:[-0.2,2*Math.PI+0.2],yr:fn==="tan"?[-4,4]:[-1.6,1.6],p:sols.map(d=>[d*Math.PI/180,vNum,""]),cap:"Solutions are where the graph meets the horizontal line."},
    q:`Solve ${left} = ${rhs} for 0 ≤ x < 2π.`,a:J(st),ck:{t:"trig",fn,a,b,v:vNum,s:sols}};
}
function rightTriG(){
  const th=R(15,75), side=R(5,30), kind=P(["opp","adj","hyp","angle"]), rad=th*Math.PI/180;
  if(kind==="angle"){ const o=R(3,15), a=R(3,15), ang=Math.atan(o/a)*180/Math.PI;
    return {q:`A right triangle has legs ${o} (opposite angle A) and ${a} (adjacent to A). Find angle A to the nearest tenth of a degree.`,a:J([`tan A = {{opposite|adjacent}} = {{${o}|${a}}}`,`A = tan⁻¹({{${o}|${a}}}) ≈ ${ang.toFixed(1)}°`,ans(`A ≈ ${ang.toFixed(1)}°`)])}; }
  if(kind==="opp"){ const v=side*Math.sin(rad); return {q:`In a right triangle, angle A = ${th}° and the hypotenuse is ${side}. Find the side opposite A (nearest hundredth).`,a:J([`SOH: sin A = {{opposite|hypotenuse}} → opposite = ${side} sin ${th}°`,ans(`≈ ${v.toFixed(2)}`)])}; }
  if(kind==="adj"){ const v=side/Math.tan(rad); return {q:`In a right triangle, angle A = ${th}° and the side opposite A is ${side}. Find the side adjacent to A (nearest hundredth).`,a:J([`TOA: tan A = {{opposite|adjacent}} → adjacent = {{${side}|tan ${th}°}}`,ans(`≈ ${v.toFixed(2)}`)])}; }
  const v=side/Math.cos(rad); return {q:`In a right triangle, angle A = ${th}° and the side adjacent to A is ${side}. Find the hypotenuse (nearest hundredth).`,a:J([`CAH: cos A = {{adjacent|hypotenuse}} → hypotenuse = {{${side}|cos ${th}°}}`,ans(`≈ ${v.toFixed(2)}`)])};
}
function identityG(){
  const [a,b,c]=P([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[4,3,5],[12,5,13]]), q=R(2,4), fnGiven=P(["sin","cos"]);
  // angle in quadrant q (II, III or IV)
  const sx=q===2||q===3?-1:1, sy=q===2?1:-1; // x=cos sign, y=sin sign
  const sin=`${sy<0?"-":""}{{${a}|${c}}}`, cos=`${sx<0?"-":""}{{${b}|${c}}}`, tan=`${sx*sy<0?"-":""}{{${a}|${b}}}`;
  const given=fnGiven==="sin"?sin:cos;
  return {q:`If ${fnGiven} θ = ${given} and θ is in Quadrant ${["","I","II","III","IV"][q]}, find ${fnGiven==="sin"?"cos θ":"sin θ"} and tan θ.`,
    a:J([`sin^2 θ + cos^2 θ = 1 → ${fnGiven==="sin"?`cos^2 θ = 1 - {{${a*a}|${c*c}}} = {{${b*b}|${c*c}}}`:`sin^2 θ = 1 - {{${b*b}|${c*c}}} = {{${a*a}|${c*c}}}`}`,
      `In Quadrant ${["","I","II","III","IV"][q]}: ${fnGiven==="sin"?`cos θ is ${sx<0?"negative":"positive"} → cos θ = ${cos}`:`sin θ is ${sy<0?"negative":"positive"} → sin θ = ${sin}`}`,`tan θ = {{sin θ|cos θ}} = ${tan}`,ans(`${fnGiven==="sin"?"cos θ = "+cos:"sin θ = "+sin}, tan θ = ${tan}`)])};
}
function lawsG(){
  if(Math.random()<0.5){ const a=R(4,15), b=R(4,15), C=P([30,40,50,60,75,100,120,135]), c=Math.sqrt(a*a+b*b-2*a*b*Math.cos(C*Math.PI/180));
    return {q:`In triangle ABC, a = ${a}, b = ${b} and angle C = ${C}°. Find c (nearest hundredth).`,a:J([`Two sides and the included angle → <b>Law of Cosines</b>: c^2 = a^2 + b^2 - 2ab cos C`,`c^2 = ${a*a} + ${b*b} - 2(${a})(${b}) cos ${C}° ≈ ${(c*c).toFixed(2)}`,ans(`c ≈ ${c.toFixed(2)}`)])}; }
  const A=R(30,70), B=R(30,70), a=R(5,20), b=a*Math.sin(B*Math.PI/180)/Math.sin(A*Math.PI/180);
  return {q:`In triangle ABC, angle A = ${A}°, angle B = ${B}° and a = ${a}. Find b (nearest hundredth).`,a:J([`Two angles and a side → <b>Law of Sines</b>: {{a|sin A}} = {{b|sin B}}`,`b = {{${a} sin ${B}°|sin ${A}°}}`,ans(`b ≈ ${b.toFixed(2)}`)])};
}

/* ================= UNIT 10: counting & probability ================= */
const fact=n=>n<=1?1:n*fact(n-1), nPr=(n,r)=>fact(n)/fact(n-r);
function countG(){
  const n=R(5,12), r=R(2,Math.min(4,n-1)), perm=Math.random()<0.5;
  if(perm){ const what=P([[`${n} runners`,`first, second and third place`.replace("first, second and third place",r===2?"first and second place":r===3?"first, second and third place":"the first 4 places")],[`a club with ${n} members`,r===2?"a president and a vice president":r===3?"a president, vice president and secretary":"4 different officers"]]);
    return {q:`In how many ways can ${what[1]} be chosen from ${what[0]}?`,a:J([`Order matters (different positions) → <b>permutation</b>.`,`<sub>${n}</sub>P<sub>${r}</sub> = {{${n}!|${n-r}!}} = ${Array.from({length:r},(_,i)=>n-i).join(" · ")}`,ans(`${nPr(n,r)}`)]),ck:{t:"num",l:`ff(${n},${r})`,r:`${nPr(n,r)}`}}; }
  const v=C(n,r);
  return {q:`A committee of ${r} is chosen from ${n} students. How many different committees are possible?`,a:J([`Order does not matter → <b>combination</b>.`,`<sub>${n}</sub>C<sub>${r}</sub> = {{${n}!|${r}!(${n-r})!}} = {{${Array.from({length:r},(_,i)=>n-i).join(" · ")}|${Array.from({length:r},(_,i)=>r-i).join(" · ")}}}`,ans(`${v}`)]),ck:{t:"num",l:`binomial(${n},${r})`,r:`${v}`}};
}
function probG(){
  const t=R(0,2);
  if(t===0){ const s=R(2,12), ways=6-Math.abs(7-s); return {q:`Two fair dice are rolled. What is the probability that the sum is ${s}?`,a:J([`There are 6 · 6 = 36 equally likely outcomes.`,`Ways to get ${s}: ${Array.from({length:6},(_,i)=>i+1).filter(a=>s-a>=1&&s-a<=6).map(a=>`(${a}, ${s-a})`).join(", ")} → ${ways}`,ans(`{{${ways}|36}}${gcd(ways,36)>1?" = "+fr(ways,36):""}`)]),ck:{t:"num",l:`Rational(${ways},36)`,r:fr(ways,36)}}; }
  if(t===1){ const r=R(2,7), b=R(2,8), tot=r+b, num=r*(r-1), den=tot*(tot-1);
    return {q:`A bag has ${r} red and ${b} blue marbles. Two are drawn <b>without replacement</b>. What is the probability both are red?`,a:J([`First red: {{${r}|${tot}}}. Then ${r-1} red out of ${tot-1} left: {{${r-1}|${tot-1}}}.`,`P = {{${r}|${tot}}} · {{${r-1}|${tot-1}}} = {{${num}|${den}}}`,ans(fr(num,den))]),ck:{t:"num",l:`Rational(${r},${tot})*Rational(${r-1},${tot-1})`,r:fr(num,den)}}; }
  const [A,nA,B,nB,both]=P([["a heart",13,"a king",4,1],["a red card",26,"a face card",12,6],["a spade",13,"an ace",4,1],["a club",13,"a face card",12,3],["a diamond",13,"a number card from 2 to 5",16,4]]);
  const n=nA+nB-both;
  return {q:`One card is drawn from a standard 52-card deck. What is P(${A} or ${B})?`,a:J([`Addition rule: P(A or B) = P(A) + P(B) - P(A and B)`,`= {{${nA}|52}} + {{${nB}|52}} - {{${both}|52}} = {{${n}|52}}`,ans(fr(n,52))]),ck:{t:"num",l:`Rational(${n},52)`,r:fr(n,52)}};
}
function expectedG(){
  const k=R(2,4), probs=[]; let left=10; for(let i=0;i<k-1;i++){ const p=R(1,left-(k-1-i)); probs.push(p); left-=p; } probs.push(left);
  const vals=probs.map(()=>P([-5,-2,-1,0,1,2,3,5,10,20])), E=probs.reduce((s,p,i)=>s+p*vals[i],0)/10;
  return {q:`A game pays ${vals.map((v,i)=>`$${v} with probability ${probs[i]/10}`).join(", ")}. What is the expected value? Is the game favorable?`.replace(/\$-(\d+)/g,"-$$$1"),
    a:J([`E = Σ x·P(x) = ${vals.map((v,i)=>`(${v})(${probs[i]/10})`).join(" + ")}`,ans(`E = ${E<0?"-":""}$${Math.abs(E).toFixed(2)}`)+` → ${E>0?"favorable (you gain on average)":E<0?"unfavorable (you lose on average)":"fair"}`])};
}
function binomG(){
  const [p,ps]=P([[1/2,"1/2"],[1/3,"1/3"],[1/4,"1/4"],[1/6,"1/6"],[0.2,"0.2"],[0.3,"0.3"],[0.4,"0.4"]]), n=R(3,8), k=R(0,n), v=C(n,k)*p**k*(1-p)**(n-k);
  const ctx=ps==="1/6"?"A fair die is rolled":ps==="1/2"?"A fair coin is tossed":`A player who succeeds with probability ${ps} tries`;
  return {q:`${ctx} ${n} times. What is the probability of exactly ${k} success${k===1?"":"es"}${ps==="1/6"?" (sixes)":ps==="1/2"?" (heads)":""}? (4 decimal places)`,
    a:J([`Binomial: P(X = k) = <sub>n</sub>C<sub>k</sub> p^k (1 - p)^(n - k) with n = ${n}, p = ${ps}, k = ${k}`,`= ${C(n,k)} · (${ps})^${k} · (${ps.includes("/")?`1 - ${ps}`:(1-p).toFixed(1)})^${n-k}`,ans(`≈ ${v.toFixed(4)}`)])};
}

/* ================= UNIT 11: conic sections ================= */
function circleG(){
  const h=R(-6,6), k=R(-6,6), r=R(1,7), D=-2*h, E=-2*k, F=h*h+k*k-r*r;
  const gen=`x^2 + y^2${D?sg(D)+"x":""}${E?sg(E)+"y":""}${F?sg(F):""} = 0`.replace(/ ([+-]) 1([xy])/g," $1 $2");
  return {g:{f:[{f:x=>k+Math.sqrt(Math.max(0,r*r-(x-h)**2)),d:[h-r,h+r]},{f:x=>k-Math.sqrt(Math.max(0,r*r-(x-h)**2)),d:[h-r,h+r]}],p:[[h,k,`center (${h}, ${k})`]],eq:true,kx:[h-r,h+r],ky:[k-r,k+r],cap:`Radius ${r}.`},
    q:`Find the center and radius of ${gen}.`,a:J([`Group and move the constant: ${D?`(x^2${sg(D)}x)`:"x^2"} + ${E?`(y^2${sg(E)}y)`:"y^2"} = ${-F}`,`Complete the square: ${[h?`add ${h*h} (for x)`:"",k?`add ${k*k} (for y)`:""].filter(Boolean).join(" and ")||"nothing to add"} to both sides.`,`${sqr(h)} + ${k?`(${poly([1,-k],"y")})^2`:"y^2"} = ${-F}${h?" + "+h*h:""}${k?" + "+k*k:""} = ${r*r}`,ans(`center (${h}, ${k}), radius ${r}`)])};
}
function parabolaC(){
  const vert=Math.random()<0.5, h=R(-4,4), k=R(-4,4), p=P([-3,-2,-1,1,2,3]);
  const sq=vert?(h?`(${poly([1,-h])})^2`:"x^2"):(k?`(${poly([1,-k],"y")})^2`:"y^2"), lin=vert?(k?`(${poly([1,-k],"y")})`:"y"):(h?`(${poly([1,-h])})`:"x");
  const eq=`${sq} = ${4*p}${lin}`, focus=vert?`(${h}, ${k+p})`:`(${h+p}, ${k})`, dir=vert?`y = ${k-p}`:`x = ${h-p}`;
  const opens=vert?(p>0?"up":"down"):(p>0?"right":"left");
  const g=vert?{f:[x=>(x-h)**2/(4*p)+k],p:[[h,k,`vertex (${h}, ${k})`],[h,k+p,`focus ${focus}`]],h:[k-p],eq:true,kx:[h-6,h+6]}
    :{f:[{f:x=>k+Math.sqrt(Math.max(0,4*p*(x-h))),d:p>0?[h,1e9]:[-1e9,h]},{f:x=>k-Math.sqrt(Math.max(0,4*p*(x-h))),d:p>0?[h,1e9]:[-1e9,h]}],p:[[h,k,`vertex (${h}, ${k})`],[h+p,k,`focus ${focus}`]],v:[h-p],eq:true,kx:[h-6,h+6],ky:[k-5,k+5]};
  g.cap=`Dashed: the directrix ${dir}.`;
  return {g,q:`For the parabola ${eq}, find the vertex, focus, directrix and the direction it opens.`,
    a:J([`Standard form ${vert?"(x - h)^2 = 4p(y - k)":"(y - k)^2 = 4p(x - h)"}: vertex (${h}, ${k}), 4p = ${4*p} → p = ${p}`,`p ${p>0?">":"<"} 0 → opens <b>${opens}</b>. Focus is p units from the vertex inside the curve: ${focus}`,`Directrix: p units the other way: ${dir}`,ans(`vertex (${h}, ${k}), focus ${focus}, directrix ${dir}, opens ${opens}`)])};
}
function ellipseG(){
  const [a,b,c]=P([[5,4,3],[5,3,4],[13,12,5],[10,8,6],[10,6,8],[17,15,8]]), horiz=Math.random()<0.5, h=R(-4,4), k=R(-4,4);
  const X=h?`(${poly([1,-h])})^2`:"x^2", Y=k?`(${poly([1,-k],"y")})^2`:"y^2", eq=horiz?`{{${X}|${a*a}}} + {{${Y}|${b*b}}} = 1`:`{{${X}|${b*b}}} + {{${Y}|${a*a}}} = 1`;
  const V=horiz?`(${h-a}, ${k}) and (${h+a}, ${k})`:`(${h}, ${k-a}) and (${h}, ${k+a})`, Fo=horiz?`(${h-c}, ${k}) and (${h+c}, ${k})`:`(${h}, ${k-c}) and (${h}, ${k+c})`;
  const A=horiz?a:b, B=horiz?b:a;
  return {g:{f:[{f:x=>k+B*Math.sqrt(Math.max(0,1-((x-h)/A)**2)),d:[h-A,h+A]},{f:x=>k-B*Math.sqrt(Math.max(0,1-((x-h)/A)**2)),d:[h-A,h+A]}],p:horiz?[[h-c,k,"F"],[h+c,k,"F"],[h,k,"center"]]:[[h,k-c,"F"],[h,k+c,"F"],[h,k,"center"]],eq:true,kx:[h-A,h+A],ky:[k-B,k+B],cap:"F = foci."},
    q:`For the ellipse ${eq}, find the center, vertices, foci and the length of the major axis.`,
    a:J([`The larger denominator is a^2 = ${a*a} (under ${horiz?"x":"y"}) → major axis is <b>${horiz?"horizontal":"vertical"}</b>, a = ${a}, b = ${b}.`,`c^2 = a^2 - b^2 = ${a*a} - ${b*b} = ${c*c} → c = ${c}`,ans(`center (${h}, ${k}); vertices ${V}; foci ${Fo}; major axis ${2*a}`)])};
}
function hyperbolaG(){
  const [a,b,c]=P([[3,4,5],[4,3,5],[5,12,13],[6,8,10],[8,6,10],[12,5,13]]), horiz=Math.random()<0.5, h=R(-3,3), k=R(-3,3);
  const X=h?`(${poly([1,-h])})^2`:"x^2", Y=k?`(${poly([1,-k],"y")})^2`:"y^2", eq=horiz?`{{${X}|${a*a}}} - {{${Y}|${b*b}}} = 1`:`{{${Y}|${a*a}}} - {{${X}|${b*b}}} = 1`;
  const slope=horiz?fr(b,a):fr(a,b), V=horiz?`(${h-a}, ${k}) and (${h+a}, ${k})`:`(${h}, ${k-a}) and (${h}, ${k+a})`, Fo=horiz?`(${h-c}, ${k}) and (${h+c}, ${k})`:`(${h}, ${k-c}) and (${h}, ${k+c})`;
  const m=horiz?b/a:a/b, asy=`y${k?sg(-k):""} = ±${slope}${h?`(${poly([1,-h])})`:"x"}`;
  const fs=horiz?[1,-1].flatMap(s=>[{f:x=>k+s*b*Math.sqrt(Math.max(0,((x-h)/a)**2-1)),d:[-1e9,h-a]},{f:x=>k+s*b*Math.sqrt(Math.max(0,((x-h)/a)**2-1)),d:[h+a,1e9]}])
    :[1,-1].map(s=>({f:x=>k+s*a*Math.sqrt(1+((x-h)/b)**2)}));
  return {g:{f:[...fs,{f:x=>k+m*(x-h),dash:true},{f:x=>k-m*(x-h),dash:true}],p:horiz?[[h-a,k,""],[h+a,k,""]]:[[h,k-a,""],[h,k+a,""]],eq:true,kx:[h-2*a,h+2*a],ky:[k-2*a,k+2*a],cap:"Dashed lines: the asymptotes."},
    q:`For the hyperbola ${eq}, find the vertices, foci and asymptotes.`,
    a:J([`The positive term is ${horiz?"x":"y"} → it opens <b>${horiz?"left and right":"up and down"}</b>. a = ${a}, b = ${b}.`,`c^2 = a^2 + b^2 = ${a*a} + ${b*b} = ${c*c} → c = ${c}`,`Asymptote slopes ±${horiz?"{{b|a}}":"{{a|b}}"} = ±${slope}`,ans(`vertices ${V}; foci ${Fo}; asymptotes ${asy}`)])};
}
function identifyConic(){
  const t=R(0,3), A=t===2?0:R(1,9), Cc=t===0?A:t===1?R(1,9)*(A===0?1:1):t===3?-R(1,9):R(1,9);
  const A2=t===1&&Cc===A?A+1:A, D=R(-9,9), E=R(-9,9);
  const kind=A2===0||Cc===0?"parabola":A2===Cc?"circle":A2*Cc>0?"ellipse":"hyperbola";
  const eq=`${tl([[A2,"x^2"],[Cc,"y^2"],[D,"x"],[E,"y"]])} = ${R(1,30)}`;
  return {q:`Identify the conic: ${eq}.`,a:J([`Compare the x^2 and y^2 coefficients: A = ${A2}, C = ${Cc}.`,kind==="parabola"?`Only one variable is squared → parabola.`:kind==="circle"?`A = C → circle.`:kind==="ellipse"?`Same sign, A ≠ C → ellipse.`:`Opposite signs → hyperbola.`,ans(kind)])};
}
function lineCircle(){
  const pts=[[3,4],[4,3],[-3,4],[-4,3],[3,-4],[4,-3],[-3,-4],[-4,-3],[5,0],[0,5],[-5,0],[0,-5]];
  for(;;){ const P1=P(pts), P2=P(pts); if(P1[0]===P2[0]) continue; const m=(P2[1]-P1[1])/(P2[0]-P1[0]); if(!Number.isInteger(m)) continue; const b=P1[1]-m*P1[0];
    const [x1,x2]=[P1[0],P2[0]].sort((u,v)=>u-v);
    return {g:{f:[{f:x=>Math.sqrt(Math.max(0,25-x*x)),d:[-5,5]},{f:x=>-Math.sqrt(Math.max(0,25-x*x)),d:[-5,5]},{f:x=>m*x+b,light:true}],p:[[x1,m*x1+b],[x2,m*x2+b]],eq:true,xr:[-7,7],yr:[-7,7]},
      q:`Solve the system x^2 + y^2 = 25 and y = ${poly([m,b])}.`,
      a:J([`Substitute: x^2 + (${poly([m,b])})^2 = 25 → ${poly([1+m*m,2*m*b,b*b-25])} = 0`,`Solve: x = ${x1} or x = ${x2}`,`y = ${m}(${x1})${sgz(b)} = ${m*x1+b}; y = ${m}(${x2})${sgz(b)} = ${m*x2+b}`,ans(`(${x1}, ${m*x1+b}) and (${x2}, ${m*x2+b})`)]),
      ck:{t:"sol",eq:`${poly([1+m*m,2*m*b,b*b-25])} = 0`,s:[`${x1}`,`${x2}`]}}; }
}

/* ---- special products (unit 2) ---- */
const vx=(v,e)=>e===0?"":e===1?v:`${v}^${e}`;
const mono=(i,j)=>vx("x",i)+vx("y",j);
const termS=(c,i,j)=>{ const m=mono(i,j); return (c===1&&m?"":c===-1&&m?"-":`${c}`)+m; };
const pw=(s,neg)=>neg||/[a-z]/.test(s)&&!/^\d*[a-z]$/.test(s)?`(${s})`:`(${s})`;
function binCube(){
  const p=R(1,3), q=RN(-4,4), wy=Math.random()<0.4, bi=wy?1:0;
  const aS=p===1?"x":p+"x", bS=wy?(q===1?"y":q===-1?"-y":q+"y"):`${q}`;
  const T=[[p**3,3,0],[3*p*p*q,2,bi],[3*p*q*q,1,2*bi],[q**3,0,3*bi]];
  const ansS=tl(T.map(([c,i,j])=>[c,mono(i,j)]));
  const base=tl([[p,"x"],[q,wy?"y":""]]);
  return {g:wy?null:FG([p**3,3*p*p*q,3*p*q*q,q**3],[-q/p],"Graph check: (px + q)^3 has a single zero with multiplicity 3 (it flattens as it crosses)."),
    q:`Expand (${base})^3.`,
    a:J([`Use (a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3 with a = ${aS}, b = ${bS}.`,
      `a^3 = (${aS})^3 = ${termS(p**3,3,0)}`,`3a^2b = 3(${aS})^2(${bS}) = ${termS(3*p*p*q,2,bi)}`,`3ab^2 = 3(${aS})(${bS})^2 = ${termS(3*p*q*q,1,2*bi)}`,`b^3 = (${bS})^3 = ${termS(q**3,0,3*bi)}`,ans(ansS)]),
    ck:{t:"id",l:`(${base})^3`,r:ansS}};
}
function perfCube(){
  const p=R(1,4), q=RN(-5,5), co=[p**3,3*p*p*q,3*p*q*q,q**3], ex=poly(co), res=`(${poly([p,q])})^3`;
  return {g:FG(co,[-q/p],"One zero, multiplicity 3."),q:`Factor ${ex}.`,
    a:J([`Four terms with cube first and last terms → try a perfect cube.`,`∛(${p**3===1?"":p**3}x^3) = ${p===1?"x":p+"x"}, &nbsp; ∛(${q**3}) = ${q}`,`Check the middle terms: 3(${p===1?"x":p+"x"})^2(${q}) = ${termS(3*p*p*q,2,0)} ✓, &nbsp; 3(${p===1?"x":p+"x"})(${q})^2 = ${termS(3*p*q*q,1,0)} ✓`,ans(res)]),
    ck:{t:"id",l:ex,r:res}};
}
function triSquare(){
  const p=R(1,3), q=RN(-3,3), r=RN(-5,5), base=tl([[p,"x"],[q,"y"],[r,""]]);
  const A=p===1?"x":p+"x", B=q===1?"y":q===-1?"-y":q+"y", Cc=`${r}`;
  const res=tl([[p*p,"x^2"],[q*q,"y^2"],[2*p*q,"xy"],[2*p*r,"x"],[2*q*r,"y"],[r*r,""]]);
  return {q:`Expand (${base})^2.`,
    a:J([`Use (a + b + c)^2 = a^2 + b^2 + c^2 + 2ab + 2bc + 2ca with a = ${A}, b = ${B}, c = ${Cc}.`,
      `Squares: (${A})^2 = ${termS(p*p,2,0)}, &nbsp; (${B})^2 = ${termS(q*q,0,2)}, &nbsp; (${Cc})^2 = ${r*r}`,
      `Twice each pair: 2(${A})(${B}) = ${termS(2*p*q,1,1)}, &nbsp; 2(${B})(${Cc}) = ${termS(2*q*r,0,1)}, &nbsp; 2(${A})(${Cc}) = ${termS(2*p*r,1,0)}`,ans(res)]),
    ck:{t:"id",l:`(${base})^2`,r:res}};
}
function triCube(){
  const p=P([1,1,2]), q=P([1,-1,2,-2]), r=P([1,-1,2,-2,3]), base=tl([[p,"x"],[q,"y"],[r,""]]);
  const A=p===1?"x":p+"x", B=q===1?"y":q===-1?"-y":q+"y", Cc=`${r}`;
  const L=[["a^3",p**3,3,0],["b^3",q**3,0,3],["c^3",r**3,0,0],["3a^2b",3*p*p*q,2,1],["3a^2c",3*p*p*r,2,0],["3ab^2",3*p*q*q,1,2],["3b^2c",3*q*q*r,0,2],["3ac^2",3*p*r*r,1,0],["3bc^2",3*q*r*r,0,1],["6abc",6*p*q*r,1,1]];
  const order=[[3,0],[2,1],[1,2],[0,3],[2,0],[1,1],[0,2],[1,0],[0,1],[0,0]];
  const res=tl(order.map(([i,j])=>{const t=L.find(z=>z[2]===i&&z[3]===j);return [t[1],mono(i,j)];}));
  return {adv:true,q:`Expand (${base})^3.`,
    a:J([`Use (a + b + c)^3 with a = ${A}, b = ${B}, c = ${Cc}: 10 terms.`,
      `Cubes: ${L.slice(0,3).map(t=>`${t[0]} = ${termS(t[1],t[2],t[3])}`).join(", &nbsp; ")}`,
      `×3 terms: ${L.slice(3,9).map(t=>`${t[0]} = ${termS(t[1],t[2],t[3])}`).join(", &nbsp; ")}`,
      `×6 term: 6abc = ${termS(6*p*q*r,1,1)}`,`Write in order of degree:`,ans(res),`Check: put x = y = 1 → (${p+q+r})^3 = ${(p+q+r)**3}, and the coefficients add to ${L.reduce((s,t)=>s+t[1],0)} ✓`]),
    ck:{t:"id",l:`(${base})^3`,r:res}};
}
function mentalCube(){
  const d=P([1,2,3,-1,-2,-3]), n=100+d, v=n**3;
  return {q:`Compute ${n}^3 without a calculator.`,
    a:J([`${n} = 100 ${d<0?"-":"+"} ${Math.abs(d)}: use (a ${d<0?"-":"+"} b)^3 with a = 100, b = ${Math.abs(d)}.`,`100^3 ${d<0?"-":"+"} 3(100^2)(${Math.abs(d)}) + 3(100)(${d*d}) ${d<0?"-":"+"} ${Math.abs(d)**3}`,`= 1,000,000 ${d<0?"-":"+"} ${(30000*Math.abs(d)).toLocaleString("en-US")} + ${(300*d*d).toLocaleString("en-US")} ${d<0?"-":"+"} ${Math.abs(d)**3}`,ans(v.toLocaleString("en-US"))]),
    ck:{t:"num",l:`${n}**3`,r:`${v}`}};
}

/* ---------------- registry: [label, generator, topic group] ---------------- */
const GEN={
 "unit-1":[["Absolute value equations",absEq,"Absolute value"],["Absolute value inequalities",absIneq,"Absolute value"],["Absolute value inequalities",absIneq,"Absolute value"],["Writing absolute value inequalities",writeAbs,"Absolute value"],["Two absolute values",absBoth,"Absolute value"],
   ["Slope",slope,"Lines"],["Line through two points",line2,"Lines"],["Parallel & perpendicular lines",parPerp,"Lines"],["Parallel & perpendicular lines",parPerp,"Lines"],["Systems in three variables",sys3,"Systems"],["Systems in three variables",sys3,"Systems"],["Piecewise functions",pwEval,"Piecewise functions"],["Continuity of piecewise functions",contK,"Piecewise functions"]],
 "unit-2":[["Factoring: GCF",gcfF,"Factoring"],["Factoring: x² + bx + c",tri1,"Factoring"],["Factoring: x² + bx + c",tri1,"Factoring"],["Factoring: ax² + bx + c",triAC,"Factoring"],["Factoring: ax² + bx + c",triAC,"Factoring"],["Factoring completely",factorFull,"Factoring"],
   ["Factoring: difference of squares",diffSq,"Factoring"],["Factoring: perfect squares",perfSq,"Factoring"],["Factoring: sum & difference of cubes",cubes,"Factoring"],["Factoring by grouping",grouping,"Factoring"],["Factoring: quadratic form",quadForm,"Factoring"],
   ["Solving by factoring",solveFac,"Solving quadratics"],["Completing the square",compSq,"Solving quadratics"],["Quadratic formula",qFormula,"Solving quadratics"],["Complex numbers: multiply",cMul,"Complex numbers"],["Complex numbers: divide",cDiv,"Complex numbers"],["Powers of i",powI,"Complex numbers"],
   ["Synthetic division",synth,"Division & binomial theorem"],["Binomial theorem",binomT,"Division & binomial theorem"],["Factor theorem",findKfac,"Division & binomial theorem"],
   ["Cube of a binomial",binCube,"Special products"],["Cube of a binomial",binCube,"Special products"],["Factoring a perfect cube",perfCube,"Special products"],["Square of a trinomial",triSquare,"Special products"],["Square of a trinomial",triSquare,"Special products"],["Cube of a trinomial",triCube,"Special products"],["Mental math with cubes",mentalCube,"Special products"]],
 "unit-3":[["Vertex & key features",vertexStd,"Vertex & forms"],["Vertex form",toVertex,"Vertex & forms"],["Vertex form",toVertex,"Vertex & forms"],["Discriminant",discr,"Discriminant & roots"],["Discriminant with a parameter",findK,"Discriminant & roots"],["Sum & product of roots",vieta,"Discriminant & roots"],
   ["Quadratic inequalities",qIneq,"Inequalities"],["Quadratic inequalities",qIneq,"Inequalities"],["Writing equations: vertex",writeV,"Writing equations"],["Writing equations: zeros",writeZ,"Writing equations"],["Writing equations: roots",roots2eq,"Writing equations"],
   ["Projectile motion",projectile,"Applications"],["Max/min: area & numbers",fence,"Applications"],["Max revenue",revenue,"Applications"],["Tangent lines",tangent,"Systems & tangents"],["Line–parabola systems",linQuad,"Systems & tangents"]],
 "unit-4":[["End behavior",endBeh,"Graphs & end behavior"],["Zeros & multiplicity",zerosMult,"Graphs & end behavior"],["Zeros & multiplicity",zerosMult,"Graphs & end behavior"],["Rational Root Theorem",ratRootList,"Finding zeros"],["Finding all zeros",allZeros,"Finding zeros"],["Finding all zeros",allZeros,"Finding zeros"],["Sum & difference of cubes",cubeRootsG,"Finding zeros"],
   ["Writing polynomials",writePoly,"Writing polynomials"],["Conjugate zeros",conjZeros,"Writing polynomials"],["Polynomial inequalities",polyIneq,"Inequalities"],["Synthetic division",synth,"Finding zeros"],["Factor theorem",findKfac,"Finding zeros"]],
 "unit-5":[["Simplifying",simpRat,"Simplifying & operations"],["Multiply & divide",mulDivRat,"Simplifying & operations"],["Add & subtract",addRat,"Simplifying & operations"],["Add & subtract",addRat,"Simplifying & operations"],
   ["Asymptotes & holes",asymptotes,"Graphs & asymptotes"],["Asymptotes & holes",asymptotes,"Graphs & asymptotes"],["Asymptotes & holes",asymptotes,"Graphs & asymptotes"],["Rational equations",solveRat,"Equations & inequalities"],["Rational equations",solveRat,"Equations & inequalities"],["Rational inequalities",ratIneqG,"Equations & inequalities"],["Variation",variation,"Variation"]],
 "unit-6":[["Simplifying radicals",simpRadG,"Radicals"],["Simplifying radicals",simpRadG,"Radicals"],["Radical operations",radOps,"Radicals"],["Radical operations",radOps,"Radicals"],["Rational exponents",ratExpEval,"Rational exponents"],["Exponent rules",ratExpSimp,"Rational exponents"],
   ["Radical equations",radEqG,"Radical equations"],["Radical equations",radEqG,"Radical equations"],["Composition",composeG,"Functions & inverses"],["Inverse functions",inverseG,"Functions & inverses"],["Inverse functions",inverseG,"Functions & inverses"],["Inverse with restricted domain",inverseQuad,"Functions & inverses"],["Graphing radical functions",radGraphG,"Functions & inverses"]],
 "unit-7":[["Growth & decay models",expModel,"Exponential models"],["Compound interest",compound,"Exponential models"],["Half-life",halfLife,"Exponential models"],["Evaluating logs",logEval,"Logarithms"],["Log properties",logProps,"Logarithms"],["Log properties",logProps,"Logarithms"],["Exponential equations (same base)",solveExpSame,"Solving equations"],["Exponential equations (logs)",solveExpLog,"Solving equations"],["Log equations",solveLogEq,"Solving equations"],["Log equations",solveLogEq,"Solving equations"]],
 "unit-8":[["Arithmetic sequences",arithG,"Arithmetic"],["Arithmetic sequences",arithG,"Arithmetic"],["Geometric sequences",geoG,"Geometric"],["Infinite geometric series",infGeoG,"Geometric"],["Sigma notation",sigmaG,"Series & notation"],["Recursive formulas",recursiveG,"Series & notation"]],
 "unit-9":[["Right-triangle trig",rightTriG,"Triangles"],["Law of sines & cosines",lawsG,"Triangles"],["Degrees & radians",degRadG,"Unit circle"],["Unit circle values",unitCircleG,"Unit circle"],["Unit circle values",unitCircleG,"Unit circle"],["Pythagorean identity",identityG,"Identities & equations"],["Trig equations",trigEqG,"Identities & equations"],["Trig equations",trigEqG,"Identities & equations"],["Graphs of sinusoids",sinusoidG,"Graphs"],["Graphs of sinusoids",sinusoidG,"Graphs"]],
 "unit-10":[["Permutations & combinations",countG,"Counting"],["Permutations & combinations",countG,"Counting"],["Probability",probG,"Probability"],["Probability",probG,"Probability"],["Expected value",expectedG,"Probability"],["Binomial probability",binomG,"Probability"]],
 "unit-11":[["Circles",circleG,"Circles & parabolas"],["Circles",circleG,"Circles & parabolas"],["Parabolas",parabolaC,"Circles & parabolas"],["Ellipses",ellipseG,"Ellipses & hyperbolas"],["Hyperbolas",hyperbolaG,"Ellipses & hyperbolas"],["Identify the conic",identifyConic,"Identify & systems"],["Line–circle systems",lineCircle,"Identify & systems"]]
};
const UNAME=Object.fromEntries(Array.from({length:11},(_,i)=>["unit-"+(i+1),"Unit "+(i+1)]));

function build(units,n,topic){
  let pool=units.flatMap(u=>(GEN[u]||[]).map(g=>[u,...g]));
  if(topic&&topic!=="All") pool=pool.filter(p=>(units.length>1?UNAME[p[0]]:p[3])===topic);
  const order=[]; while(order.length<n) order.push(...SH(pool));
  const pick=order.slice(0,n).sort((a,b)=>pool.indexOf(a)-pool.indexOf(b));
  return pick.map(([u,topic,fn])=>{ for(let t=0;t<20;t++){ try{ const r=fn(); r.topic=topic; r.unit=u; return r; }catch(e){} } return {q:"(Press New problems.)",a:"",topic}; });
}
const topicsFor=units=>["All",...new Set(units.length>1?units.map(u=>UNAME[u]):(GEN[units[0]]||[]).map(g=>g[2]))];
/* ---------------- UI ---------------- */
const STATE={};
const CSS=`
.quiz{border:2px solid #111;margin:26px 0 18px;background:#fff}
.quiz>.qh{background:#111;color:#fff;padding:10px 14px}
.quiz>.qh h3{margin:0;font-size:22px}
.quiz>.qh p{margin:2px 0 0;font-style:italic;font-size:15.5px;color:#ddd}
.quiz .qbody{padding:12px 14px 6px}
.qbar{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:0 0 14px}
.qbar .lbl{font-weight:600;font-size:15.5px}
.qtopics{padding-bottom:10px;border-bottom:1px dotted #bbb}
.qtopics button{font-weight:500}
.qbar button{border:1px solid #111;background:#fff;color:#111;padding:3px 11px;font:600 15px 'EB Garamond',Georgia,serif;cursor:pointer}
.qbar button:hover{background:#eee}
.qbar button.on{background:#111;color:#fff}
.qbar button.new{background:#111;color:#fff}
.qbar button.new:hover{background:#333}
.qbar .sep{width:1px;height:22px;background:#bbb;margin:0 4px}
.qbar .prog{margin-left:auto;font-style:italic;color:#555;font-size:15px}
.qtopic{display:inline-block;font-size:12.5px;letter-spacing:.06em;text-transform:uppercase;border:1px solid #999;color:#555;padding:0 6px;margin-right:6px;vertical-align:2px}
.qtopic.adv{border-color:#111;background:#111;color:#fff}
table.syn{border-collapse:collapse;margin:6px 0;font-size:16px}
table.syn td{padding:2px 10px;text-align:right;min-width:30px}
table.syn td.sc{border-right:1.5px solid #111}
table.syn tr.last td{border-top:1.5px solid #111;font-weight:600}
table.syn tr.last td:first-child{border-top:0}
table.syn td.rem{border:1.5px solid #111}
details.pset.adv{border-style:double;border-width:4px;border-left-width:8px}
details.pset.adv>summary .badge{display:inline-block;font-size:12px;letter-spacing:.1em;text-transform:uppercase;background:#111;color:#fff;padding:1px 7px;margin-right:8px;vertical-align:3px}
@media (max-width:640px){.qbar .prog{margin-left:0;width:100%}.qbar .sep{display:none}}
`;
function li(p,i,key){ return `<li><span class="pq"><span class="qtopic${p.adv?" adv":""}">${p.adv?"★ ":""}${p.topic}</span>${fmt(p.q)}</span><div class="prow"><details class="pans"><summary>Show solution &amp; steps</summary><div>${fmt(p.a)}${p.g&&window.A2PLOT?A2PLOT.plot(p.g):""}</div></details><label class="pdone"><input type="checkbox" data-qk="${key}"> I got it</label></div></li>`; }
const fmt=s=>window.A2PRACTICE?A2PRACTICE.fmt(s):s;
function quizInner(key){
  const S=STATE[key];
  return `<div class="qbar qtopics"><span class="lbl">Topic:</span>${topicsFor(S.units).map(t=>`<button type="button" data-qt="${t}" class="${(S.topic||"All")===t?"on":""}">${t}</button>`).join("")}</div><div class="qbar"><span class="lbl">How many problems?</span>${[10,15,20].map(n=>`<button type="button" data-qn="${n}" class="${S.n===n?"on":""}">${n}</button>`).join("")}<span class="sep"></span><button type="button" class="new" data-qa="new">↻ New problems</button><button type="button" data-qa="show">Show all solutions</button><button type="button" data-qa="hide">Hide all</button><button type="button" data-qa="ws">Print quiz</button><button type="button" data-qa="key">Print answer key</button><span class="prog">0 of ${S.list.length} checked</span></div>
  <ol class="pprobs">${S.list.map((p,i)=>li(p,i,key)).join("")}</ol>`;
}
function html(unit,label){
  const units=unit==="mixed"?Object.keys(GEN):[unit]; if(!units.some(u=>GEN[u])) return "";
  if(!STATE[unit]) STATE[unit]={n:10,units,list:build(units,10)};
  return `<div class="quiz" data-quiz="${unit}"><div class="qh"><h3>${label||"Quick Quiz"}: new problems every time</h3><p>Pick 10, 15 or 20 problems. Try them on paper, then check each solution. Press “New problems” for a fresh set with different numbers. ★ = challenge problem.</p></div><div class="qbody">${quizInner(unit)}</div></div>`;
}
function printQuiz(key,withKey){
  const S=STATE[key]; const w=window.open("","_blank"); if(!w) return;
  const css=((document.getElementById("a2css")||{}).textContent||"")+((window.A2PLOT||{}).CSS||"");
  w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Algebra 2 Quiz${withKey?" · Answer Key":""}</title><style>body{font-family:'EB Garamond',Georgia,serif;max-width:780px;margin:30px auto;line-height:1.6;padding:0 16px;color:#111}${css}${CSS}ol.pprobs>li{margin-bottom:${withKey?"18px":"80px"}!important}.key{border-left:3px solid #111;padding:4px 10px;margin-top:6px;background:#f6f6f6}</style></head><body>${withKey?"":"<p>Name: ____________________ &nbsp; Date: __________ &nbsp; Period: ____</p>"}<h2>Algebra 2 Honors Quiz${withKey?" · Answer Key":""}</h2><ol class="pprobs">${S.list.map(p=>`<li><span class="qtopic${p.adv?" adv":""}">${p.topic}</span>${fmt(p.q)}${withKey?`<div class="key">${fmt(p.a)}${p.g&&window.A2PLOT?A2PLOT.plot(p.g):""}</div>`:""}</li>`).join("")}</ol><p style="font-size:12px;color:#666">Algebra 2 Honors · Zogovic</p></body></html>`);
  w.document.close(); setTimeout(()=>{try{w.print();}catch(e){}},400);
}
function bindQuiz(box){
  const key=box.dataset.quiz, S=STATE[key], body=box.querySelector(".qbody");
  const redraw=()=>{ body.innerHTML=quizInner(key); bindQuiz(box); };
  box.querySelectorAll("[data-qn]").forEach(b=>b.onclick=()=>{ S.n=+b.dataset.qn; S.list=build(S.units,S.n,S.topic); redraw(); });
  box.querySelectorAll("[data-qt]").forEach(b=>b.onclick=()=>{ S.topic=b.dataset.qt; S.list=build(S.units,S.n,S.topic); redraw(); });
  box.querySelectorAll("[data-qa]").forEach(b=>b.onclick=()=>{ const a=b.dataset.qa;
    if(a==="new"){ S.list=build(S.units,S.n,S.topic); redraw(); }
    if(a==="show") box.querySelectorAll("details.pans").forEach(d=>d.open=true);
    if(a==="hide") box.querySelectorAll("details.pans").forEach(d=>d.open=false);
    if(a==="ws") printQuiz(key,false); if(a==="key") printQuiz(key,true); });
  const upd=()=>{ box.querySelector(".prog").textContent=`${box.querySelectorAll("[data-qk]:checked").length} of ${S.list.length} checked`; };
  box.querySelectorAll("[data-qk]").forEach(cb=>cb.onchange=()=>{ cb.closest("li").classList.toggle("done",cb.checked); upd(); });
}
function bind(root){
  if(!document.getElementById("a2gencss")){ const st=document.createElement("style"); st.id="a2gencss"; st.textContent=CSS; document.head.appendChild(st); }
  root.querySelectorAll("div.quiz").forEach(bindQuiz);
}
window.A2GEN={html,bind,build,GEN,has:u=>!!GEN[u]};
})();
