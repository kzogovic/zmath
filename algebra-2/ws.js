/* Worksheets: Polynomial Functions. Original, generated worksheets in the classic worksheet style
   (numbered problems, answer key, new worksheet, print). Topics follow a standard Algebra 2 sequence. */
(function(){
const fmt=s=>window.A2PRACTICE?A2PRACTICE.fmt(s):s;
const plot=g=>window.A2PLOT?A2PLOT.plot(g):"";
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)), pick=a=>a[Math.floor(Math.random()*a.length)];
const nz=(a,b,ex=[])=>{ let v; do{ v=rnd(a,b); }while(v===0||ex.includes(v)); return v; };
const distinct=(n,a,b,ex=[])=>{ const s=[]; while(s.length<n) s.push(nz(a,b,[...ex,...s])); return s; };
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a;};
const isSq=n=>n>0&&Number.isInteger(Math.sqrt(n));
const isCube=n=>Number.isInteger(Math.round(Math.cbrt(n)))&&Math.round(Math.cbrt(n))**3===n;

/* ---------- numbers & polynomials ---------- */
function frc(v){ if(Math.abs(v-Math.round(v))<1e-9) return [Math.round(v),1]; for(const d of [2,3,4,5,6,8,9,10,12]){ const n=v*d; if(Math.abs(n-Math.round(n))<1e-9) return [Math.round(n),d]; } return null; }
const t=v=>{ const f=frc(v); if(!f) return String(+v.toFixed(3)); return f[1]===1?String(f[0]):(f[0]<0?"-":"")+`{{${Math.abs(f[0])}|${f[1]}}}`; };
const ev=(c,x)=>c.reduce((s,a)=>s*x+a,0);
const mul=(a,b)=>{ const r=Array(a.length+b.length-1).fill(0); a.forEach((x,i)=>b.forEach((y,j)=>r[i+j]+=x*y)); return r; };
const add=(a,b,s=1)=>{ const n=Math.max(a.length,b.length), A=Array(n-a.length).fill(0).concat(a), B=Array(n-b.length).fill(0).concat(b); return A.map((v,i)=>v+s*B[i]); };
const trim=c=>{ let i=0; while(i<c.length-1&&Math.abs(c[i])<1e-12) i++; return c.slice(i); };
function ps(c,v="x"){ c=trim(c); const n=c.length-1; let s=""; c.forEach((a,i)=>{ if(Math.abs(a)<1e-12) return; const p=n-i, m=Math.abs(a), f=frc(m);
  const co=(m===1&&p>0)?"":(f&&f[1]!==1?`{{${f[0]}|${f[1]}}}`:t(m)); s+=s?(a<0?" - ":" + "):(a<0?"-":""); s+=co+(p===0?"":p===1?v:`${v}^${p}`); }); return s||"0"; }
const facC=r=>{ const f=frc(r); return f&&f[1]!==1?[f[1],-f[0]]:[1,-r]; };
const fac=r=>`(${ps(facC(r))})`;
const prodC=rs=>rs.reduce((p,r)=>mul(p,facC(r)),[1]);
const synth=(c,r)=>{ const res=[c[0]]; for(let i=1;i<c.length;i++) res.push(c[i]+res[i-1]*r); return {q:res.slice(0,-1),rem:res[res.length-1]}; };
const neg=c=>c.map((a,i)=>((c.length-1-i)%2?-a:a));
const signs=c=>{ let n=0,l=0; c.forEach(a=>{ if(!a) return; const s=Math.sign(a); if(l&&s!==l) n++; l=s; }); return n; };
const divs=n=>{ const r=[]; for(let i=1;i<=n;i++) if(n%i===0) r.push(i); return r; };
const cands=c=>{ const m=new Map(); divs(Math.abs(c[c.length-1])).forEach(p=>divs(Math.abs(c[0])).forEach(q=>m.set((p/q).toFixed(9),p/q))); return [...m.values()].sort((a,b)=>a-b); };
/* multi-variable monomials: [coef, {x:2,y:1}] */
function mono(c,v,first){ const m=Math.abs(c), vs=Object.entries(v).filter(([,e])=>e).map(([k,e])=>e===1?k:`${k}^${e}`).join(""); const body=(m===1&&vs?"":m)+vs; return first?(c<0?"-":"")+body:(c<0?" - ":" + ")+body; }
const join=ts=>ts.filter(([c])=>c).map(([c,v],i)=>mono(c,v,i===0)).join("")||"0";
const pr=s=>`(${s})`;
const kPre=k=>k===1?"":k===-1?"-":String(k);

/* ---------- 1. Naming and simple operations ---------- */
const DEG=["constant","linear","quadratic","cubic","quartic","quintic"], TRM=["","monomial","binomial","trinomial"];
const partials=(P,Q)=>{ const n=P.length-1, m=Q.length-1, out=[]; P.forEach((a,i)=>{ if(!a) return; Q.forEach((b,j)=>{ if(!b) return; out.push([a*b,{x:(n-i)+(m-j)}]); }); }); return out; };
function pNaming(){ const T=rnd(0,2);
  if(T===0){ const d=rnd(0,5), nt=Math.min(rnd(1,4),d+1), pw=shuffle(Array.from({length:d},(_,i)=>i)).slice(0,nt-1).concat([d]), c=Array(d+1).fill(0); pw.forEach(p=>c[d-p]=nz(-9,9));
    const txt=shuffle(pw).map((p,i)=>mono(c[d-p],{x:p},i===0)).join(""), name=`${DEG[d]} ${nt<=3?TRM[nt]:"polynomial with "+nt+" terms"}`;
    return {q:`Name the polynomial by degree and number of terms: ${txt}`,a:name,
      s:[`Standard form (highest power first): ${ps(c)}.`,`The highest exponent is ${d} → degree ${d} → <b>${DEG[d]}</b>.`,`It has ${nt} term${nt>1?"s":""} → <b>${nt<=3?TRM[nt]:"polynomial"}</b>.`,`Name: <b>${name}</b>.`]}; }
  if(T===1){ const A=[rnd(1,6),rnd(-6,6),rnd(-6,6),rnd(-9,9)].slice(rnd(0,1)), B=[rnd(-6,6),rnd(-6,6),rnd(-9,9)].slice(rnd(0,1)), s=pick([1,-1]); if(!B[0]) B[0]=1; const R=add(A,B,s);
    return {q:`Simplify: (${ps(A)}) ${s>0?"+":"-"} (${ps(B)})`,a:ps(R),v:[x=>ev(A,x)+s*ev(B,x),x=>ev(R,x)],
      s:[s>0?"Adding: just drop the parentheses.":`Subtracting: distribute the minus to every term of the second polynomial: ${ps(B.map(v=>-v))}.`,`Line up like terms: ${ps(A)} ${ps(B.map(v=>s*v)).replace(/^-/,"- ").replace(/^(?!- )/,"+ ")}.`,`Combine the coefficients of each power: <b>${ps(R)}</b>.`]}; }
  const P=pick([[nz(-4,4),nz(-6,6)],[1,nz(-6,6)]]), sqr=Math.random()<.4, Q=sqr?P.slice():[nz(-3,3),rnd(-5,5),nz(-6,6)], R=mul(P,Q);
  return {q:sqr?`Multiply: (${ps(P)})^2`:`Multiply: (${ps(P)})(${ps(Q)})`,a:ps(R),v:[x=>ev(P,x)*ev(Q,x),x=>ev(R,x)],
    s:[sqr?`(${ps(P)})^2 = (${ps(P)})(${ps(P)}).`:"Multiply each term of the first polynomial by each term of the second.",`Partial products: ${join(partials(P,Q))}.`,`Combine like terms: <b>${ps(R)}</b>.`]}; }

/* ---------- 2. Sum / difference of cubes ---------- */
function cubesParts(){ let p,q; do{ p=rnd(1,5); q=rnd(1,5); }while(gcd(p,q)!==1); const y=Math.random()<.25?1:0, s=pick([1,-1]), k=pick([1,1,1,2,3,5]), e=Math.random()<.2?1:0; return {p,q,y,s,k,e}; }
function pCubes(o){ o=o||cubesParts(); const {p,q,y,s,k,e}=o, flip=!y&&!e&&s>0&&Math.random()<.2;
  const T1=[k*p**3,{x:3+e}], T2=[s*k*q**3,{x:e,y:3*y}], qtxt=flip?join([T2,T1]):join([T1,T2]);
  const a=join([[p,{x:1}]]), b=join([[q,{y}]]), A=join([[p,{x:1}],[s*q,{y}]]), B=join([[p*p,{x:2}],[-s*p*q,{x:1,y}],[q*q,{y:2*y}]]);
  const g=`${kPre(k)}${e?"x":""}`, ans=`${g}${pr(A)}${pr(B)}`, inner=join([[p**3,{x:3}],[s*q**3,{y:3*y}]]);
  const fq=(x,Y)=>k*p**3*x**(3+e)+s*k*q**3*x**e*Y**(3*y), fa=(x,Y)=>k*x**e*(p*x+s*q*Y**y)*(p*p*x*x-s*p*q*x*Y**y+q*q*Y**(2*y));
  return {q:`Factor completely: ${qtxt}`,a:ans,v:[fq,fa],
    s:[...(g?[`Factor out the GCF ${g}: ${g}(${inner}).`]:[]),`${inner} is a ${s>0?"sum":"difference"} of cubes: (${a})^3 ${s>0?"+":"-"} (${b})^3, so a = ${a}, b = ${b}.`,`a^3 ${s>0?"+":"-"} b^3 = (a ${s>0?"+":"-"} b)(a^2 ${s>0?"-":"+"} ab + b^2). SOAP: Same, Opposite, Always Positive.`,`a^2 = ${join([[p*p,{x:2}]])}, ab = ${join([[p*q,{x:1,y}]])}, b^2 = ${join([[q*q,{y:2*y}]])}.`,`<b>${ans}</b>`]}; }

/* ---------- 3. Grouping ---------- */
function pGroup(){ let a,b,c,d; do{ a=rnd(1,4); b=nz(-6,6); c=rnd(1,4); d=nz(-8,8); }while(gcd(a,b)!==1||gcd(c,d)!==1||(d<0&&isSq(c)&&isSq(-d))); const k=Math.random()<.2?pick([2,3]):1;
  const E=mul([k],mul([a,b],[c,0,d])), I=mul([a,b],[c,0,d]), ans=`${kPre(k)}(${ps([c,0,d])})(${ps([a,b])})`;
  return {q:`Factor completely: ${ps(E)}`,a:ans,v:[x=>ev(E,x),x=>k*ev([c,0,d],x)*ev([a,b],x)],
    s:[...(k>1?[`Factor out the GCF ${k}: ${k}(${ps(I)}).`]:[]),`Group the terms in pairs: (${ps([I[0],I[1],0,0])}) + (${ps([I[2],I[3]])}).`,`Factor each group: ${ps([c,0,0])}(${ps([a,b])}) ${d<0?"-":"+"} ${Math.abs(d)}(${ps([a,b])}).`.replace(/^1x/,"x"),`Factor out the common binomial (${ps([a,b])}): <b>${ans}</b>.`,`Check: ${ps([c,0,d])} cannot be factored further.`]}; }

/* ---------- 4. Quadratic form ---------- */
function facX2(A,B,pw){
  if(pw===2&&B<0&&isSq(A)&&isSq(-B)) return [[Math.sqrt(A),-Math.sqrt(-B)],[Math.sqrt(A),Math.sqrt(-B)]].map(([u,v])=>`(${ps([u,v])})`);
  if(pw===3&&A===1&&isCube(Math.abs(B))&&B!==0){ const c=Math.round(Math.cbrt(B)); return [`(${ps([1,c])})`,`(${ps([1,-c,c*c])})`]; }
  return [`(${ps([A,...Array(pw-1).fill(0),B])})`];
}
function pQuadForm(){ const T=rnd(0,3);
  if(T<=1){ let r,s; do{ r=pick([1,4,9,16,25,2,3,5,-1,-4,-9,-2]); s=pick([1,4,9,16,25,2,3,5,-1,-4,-9,-2]); }while(r===s&&Math.random()<.7); const k=pick([1,1,2,3]);
    const E=mul([k],mul([1,0,-r],[1,0,-s])), I=mul([1,0,-r],[1,0,-s]), f=[...facX2(1,-r,2),...facX2(1,-s,2)], ans=`${kPre(k)}${f.join("")}`;
    return {q:`Factor completely: ${ps(E)}`,a:ans,v:[x=>ev(E,x),x=>k*ev([1,0,-r],x)*ev([1,0,-s],x)],
      s:[...(k>1?[`Factor out the GCF ${k}: ${k}(${ps(I)}).`]:[]),`Let u = x^2: ${ps([1,I[2],I[4]],"u")}.`,`Factor: (${ps([1,-r],"u")})(${ps([1,-s],"u")}).`,`Substitute back: (${ps([1,0,-r])})(${ps([1,0,-s])}).`,(f.length>2?`Factor each difference of squares: <b>${ans}</b>.`:`Neither factor can be factored further over the integers: <b>${ans}</b>.`)]}; }
  if(T===2){ const a=pick([2,3,4,5]), r=nz(-6,6), s=nz(-6,6), E=mul([a,0,r],[1,0,s]), ans=[...facX2(a,r,2),...facX2(1,s,2)].join("");
    return {q:`Factor completely: ${ps(E)}`,a:ans,v:[x=>ev(E,x),x=>ev([a,0,r],x)*ev([1,0,s],x)],
      s:[`Let u = x^2: ${ps([a,a*s+r,r*s],"u")}.`,`ac method: ${a}·${r*s} = ${a*r*s}; the factors ${a*s} and ${r} add to ${a*s+r}.`,`(${ps([a,r],"u")})(${ps([1,s],"u")}) → (${ps([a,0,r])})(${ps([1,0,s])}).`,`Factor further if possible: <b>${ans}</b>.`]}; }
  const r=pick([1,8,27,-1,-8,-27,2,-3]), s=pick([1,8,27,-1,-8,-27,2,-3]), E=mul([1,0,0,r],[1,0,0,s]), ans=[...facX2(1,r,3),...facX2(1,s,3)].join("");
  return {q:`Factor completely: ${ps(E)}`,a:ans,v:[x=>ev(E,x),x=>ev([1,0,0,r],x)*ev([1,0,0,s],x)],
    s:[`Let u = x^3: ${ps([1,r+s,r*s],"u")}.`,`Factor: (${ps([1,r],"u")})(${ps([1,s],"u")}) → (${ps([1,0,0,r])})(${ps([1,0,0,s])}).`,"Factor each sum or difference of cubes (SOAP) when the constant is a perfect cube.",`<b>${ans}</b>`]}; }

/* ---------- 5. All techniques ---------- */
function pAll(){ const T=rnd(0,6); let p;
  if(T===0) p=pCubes(); else if(T===1) p=pGroup(); else if(T===2) p=pQuadForm();
  else if(T===3){ let a,b,c,d; do{ a=rnd(1,4); b=nz(-6,6); c=rnd(1,3); d=nz(-6,6); }while(gcd(a,b)!==1||gcd(c,d)!==1); const k=pick([1,2,3,-1]), m=Math.random()<.3?1:0, Q=mul([a,b],[c,d]);
    const E=mul([k,...Array(m).fill(0)],Q), g=`${kPre(k)}${m?"x":""}`, ans=`${g}(${ps([a,b])})(${ps([c,d])})`;
    p={q:`Factor completely: ${ps(E)}`,a:ans,v:[x=>ev(E,x),x=>k*x**m*ev([a,b],x)*ev([c,d],x)],s:[...(g?[`GCF ${g}: ${g}(${ps(Q)}).`]:[]),`Trinomial ${ps(Q)}: ac = ${Q[0]*Q[2]}; find two numbers that multiply to ${Q[0]*Q[2]} and add to ${Q[1]}: ${a*d} and ${b*c}.`,`Split and group: <b>${ans}</b>.`]}; }
  else if(T===4){ let a,b; do{ a=rnd(1,6); b=rnd(1,9); }while(gcd(a,b)!==1); const k=pick([1,2,3,5]), E=[k*a*a,0,-k*b*b], ans=`${kPre(k)}(${ps([a,-b])})(${ps([a,b])})`;
    p={q:`Factor completely: ${ps(E)}`,a:ans,v:[x=>ev(E,x),x=>k*(a*x-b)*(a*x+b)],s:[...(k>1?[`GCF ${k}: ${k}(${ps([a*a,0,-b*b])}).`]:[]),`Difference of squares: (${ps([a,0])})^2 - ${b}^2.`,`a^2 - b^2 = (a - b)(a + b): <b>${ans}</b>.`]}; }
  else if(T===5){ let a,b; do{ a=rnd(1,5); b=nz(-7,7); }while(gcd(a,b)!==1); const k=pick([1,2,3]), E=mul([k],mul([a,b],[a,b])), ans=`${kPre(k)}(${ps([a,b])})^2`;
    p={q:`Factor completely: ${ps(E)}`,a:ans,v:[x=>ev(E,x),x=>k*(a*x+b)**2],s:[...(k>1?[`GCF ${k}: ${k}(${ps(mul([a,b],[a,b]))}).`]:[]),`Perfect square trinomial: first term (${ps([a,0])})^2, last term ${Math.abs(b)}^2, middle term 2(${ps([a,0])})(${Math.abs(b)}) = ${Math.abs(2*a*b)}x ✓.`,`<b>${ans}</b>`]}; }
  else { let r,s; do{ r=nz(-7,7); s=nz(-7,7); }while(r===-s); const g=pick([[1,1],[2,1],[1,2],[3,1]]), Q=mul([1,-r],[1,-s]), E=mul([g[0],...Array(g[1]).fill(0)],Q), G=`${kPre(g[0])}${g[1]===1?"x":"x^2"}`, ans=`${G}(${ps([1,-r])})(${ps([1,-s])})`;
    p={q:`Factor completely: ${ps(E)}`,a:ans,v:[x=>ev(E,x),x=>g[0]*x**g[1]*(x-r)*(x-s)],s:[`GCF ${G}: ${G}(${ps(Q)}).`,`Two numbers with product ${r*s} and sum ${-(r+s)}: ${-r} and ${-s}.`,`<b>${ans}</b>`]}; }
  p.s=["Strategy: (1) GCF first, (2) count the terms: 2 → squares/cubes, 3 → trinomial or quadratic form, 4 → grouping, (3) check every factor again.",...p.s]; return p; }

/* ---------- 6. Factors and zeros ---------- */
function pZeros(){ const T=rnd(0,2);
  if(T===0){ const rs=distinct(3,-5,5), ms=[rnd(1,3),1,pick([1,2])], lc=pick([1,-1,2]);
    const f=`${kPre(lc)}${rs.map((r,i)=>`(${ps([1,-r])})${ms[i]>1?"^"+ms[i]:""}`).join("")}`, L=rs.map((r,i)=>[r,ms[i]]).sort((u,v)=>u[0]-v[0]);
    return {q:`State the zeros and their multiplicities: f(x) = ${f}`,a:L.map(([r,m])=>`${r}, mult. ${m}`).join("; "),
      s:["Set each factor equal to 0. The exponent on a factor is the multiplicity of its zero.",...L.map(([r,m])=>`${fac(r)}${m>1?"^"+m:""} → x = ${r}, multiplicity ${m} (${m%2?"crosses":"touches"} the x-axis).`),`The leading coefficient ${lc} doesn't create a zero.`]}; }
  if(T===1){ const [r,s]=distinct(2,-6,6), Q=mul([1,-r],[1,-s]), E=mul([1,0],Q);
    return {q:`Find all zeros: f(x) = ${ps(E)}`,a:[0,r,s].sort((a,b)=>a-b).join(", "),s:[`Factor out the GCF x: x(${ps(Q)}).`,`Factor the trinomial: x${fac(r)}${fac(s)}.`,`Set each factor to 0: <b>x = 0, ${r}, ${s}</b>.`]}; }
  const q=pick([2,3]); let p; do{ p=nz(-5,5); }while(gcd(p,q)!==1); const rs=[p/q,...distinct(2,-4,4)], E=prodC(rs);
  return {q:`Write a polynomial function of least degree with integral coefficients that has the given zeros: ${rs.map(t).join(", ")}`,a:`f(x) = ${ps(E)}`,
    s:[`Each zero gives a factor: ${rs.map(r=>`x = ${t(r)} → ${fac(r)}`).join("; ")}. (The fraction zero gives an integer factor (${ps(facC(rs[0]))}).)`,`f(x) = ${rs.map(fac).join("")}.`,`Multiply: ${fac(rs[0])}${fac(rs[1])} = ${ps(mul(facC(rs[0]),facC(rs[1])))}; then times ${fac(rs[2])}.`,`<b>f(x) = ${ps(E)}</b>`]}; }

/* ---------- 7. Remainder Theorem ---------- */
function synthTxt(c,k){ const res=[c[0]], w=[`bring down ${c[0]}`]; for(let i=1;i<c.length;i++){ const m=res[i-1]*k; res.push(c[i]+m); w.push(`${res[i-1]}·(${k}) = ${m}, ${c[i]} + ${m<0?"("+m+")":m} = ${res[i]}`); } return w; }
function pRem(){ const c=[nz(-3,3),rnd(-5,5),rnd(-6,6),rnd(-6,6),rnd(-9,9)].slice(rnd(0,1)); const k=nz(-3,3), T=rnd(0,1), R=ev(c,k);
  const s=[`${T?"":`Remainder Theorem: the remainder on division by ${ps([1,-k])} is f(${k}). `}Synthetic division with c = ${k} and coefficients ${c.join(", ")}${c.includes(0)?" (zeros hold missing powers)":""}.`,...synthTxt(c,k).map(x=>"→ "+x),`The last number is the remainder: <b>${R}</b>.`];
  return T?{q:`Evaluate using synthetic substitution: f(${k}) for f(x) = ${ps(c)}`,a:`f(${k}) = ${R}`,v:[()=>synth(c,k).rem,()=>R],s}
    :{q:`Find the remainder when ${ps(c)} is divided by ${ps([1,-k])}`,a:`${R}`,v:[()=>synth(c,k).rem,()=>R],s}; }

/* ---------- 8. Irrational and imaginary root theorems ---------- */
const irr=(a,b,s)=>`${a?a+" "+(s>0?"+":"-")+" ":s>0?"":"-"}√${b}`;
const img=(a,b,s)=>`${a?a+" "+(s>0?"+":"-")+" ":s>0?"":"-"}${b===1?"":b}i`;
function pIrrImg(){ const T=rnd(0,2), a=rnd(-4,4), b=pick([2,3,5,6,7]), c=rnd(-3,3), d=rnd(1,4);
  if(T===0) return {q:`A polynomial function with rational coefficients has the zeros ${irr(a,b,-1)} and ${img(c,d,1)}. Find two additional zeros.`,a:`${irr(a,b,1)}, ${img(c,d,-1)}`,
    s:[`Irrational Root Theorem: with rational coefficients, a - √b and a + √b come in pairs → ${irr(a,b,1)}.`,`Imaginary Root Theorem: with real coefficients, a + bi and a - bi come in pairs → ${img(c,d,-1)}.`]};
  const r=nz(-4,4);
  if(T===1){ const Q=[1,-2*a,a*a-b], E=mul([1,-r],Q); return {q:`Write a polynomial function of least degree with integral coefficients that has the given zeros: ${r}, ${irr(a,b,1)}`,a:`f(x) = ${ps(E)}`,v:[x=>(x-r)*((x-a)**2-b),x=>ev(E,x)],
    s:[`Irrational Root Theorem: ${irr(a,b,-1)} is also a zero.`,`(x - (${irr(a,b,1)}))(x - (${irr(a,b,-1)})) = ${a?`(x - ${a})^2 - ${b} = ${ps(Q)}`:ps(Q)}.`,`Multiply by ${fac(r)}: <b>${ps(E)}</b>.`]}; }
  const Q=[1,-2*c,c*c+d*d], E=mul([1,-r],Q); return {q:`Write a polynomial function of least degree with integral coefficients that has the given zeros: ${r}, ${img(c,d,1)}`,a:`f(x) = ${ps(E)}`,v:[x=>(x-r)*((x-c)**2+d*d),x=>ev(E,x)],
    s:[`Imaginary Root Theorem: ${img(c,d,-1)} is also a zero.`,`(x - (${img(c,d,1)}))(x - (${img(c,d,-1)})) = ${c?`(x - ${c})^2`:"x^2"} + ${d*d} = ${ps(Q)}.`,`Multiply by ${fac(r)}: <b>${ps(E)}</b>.`]}; }

/* ---------- 9. Descartes' Rule of Signs ---------- */
const signSeq=c=>c.filter(a=>a).map(a=>a>0?"+":"−").join(" ");
function pDesc(){ const n=rnd(3,6), c=[nz(-4,4),...Array(n-1).fill(0).map(()=>Math.random()<.3?0:nz(-9,9)),nz(-9,9)];
  const P=signs(c), N=signs(neg(c)), rows=[];
  for(let p=P;p>=0;p-=2) for(let q=N;q>=0;q-=2){ const i=n-p-q; if(i>=0&&i%2===0) rows.push(`${p} positive, ${q} negative, ${i} imaginary`); }
  return {q:`State the possible number of positive real zeros, negative real zeros, and imaginary zeros: f(x) = ${ps(c)}`,a:rows.join("<br>"),
    s:[`Signs of f(x): ${signSeq(c)} → <b>${P}</b> change${P===1?"":"s"} → positive zeros: ${Array.from({length:Math.floor(P/2)+1},(_,i)=>P-2*i).join(" or ")}.`,`f(-x) = ${ps(neg(c))}: ${signSeq(neg(c))} → <b>${N}</b> change${N===1?"":"s"} → negative zeros: ${Array.from({length:Math.floor(N/2)+1},(_,i)=>N-2*i).join(" or ")}.`,`Degree ${n} → ${n} zeros in total; imaginary = ${n} - positive - negative (always even).`,`Possibilities: ${rows.join("; ")}.`]}; }

/* ---------- 10. More on factors, zeros and dividing ---------- */
function pMore(){ const T=rnd(0,2), r=nz(-4,4);
  if(T===0){ const [s,u]=distinct(2,-5,5,[r]), E=mul([1,-r],mul([1,-s],[1,-u])), Q=synth(E,r).q; return {q:`${ps([1,-r])} is a factor of f(x) = ${ps(E)}. Factor completely.`,a:`f(x) = (${ps([1,-r])})(${ps([1,-s])})(${ps([1,-u])})`,v:[x=>ev(E,x),x=>(x-r)*(x-s)*(x-u)],
    s:[`Divide by ${ps([1,-r])} using synthetic division with c = ${r}: ${synthTxt(E,r).slice(-1)[0]} (remainder 0).`,`Quotient: ${ps(Q)}.`,`Factor the quotient: ${fac(s)}${fac(u)}.`,`<b>f(x) = ${fac(r)}${fac(s)}${fac(u)}</b>`]}; }
  if(T===1){ const kind=rnd(0,1), a=rnd(-3,3), b=kind?pick([2,3,5,7]):rnd(1,4), Q=kind?[1,-2*a,a*a-b]:[1,-2*a,a*a+b*b], E=mul([1,-r],Q), D=Q[1]**2-4*Q[2];
    return {q:`${r} is a zero of f(x) = ${ps(E)}. Find all zeros.`,a:`${r}, ${kind?`${irr(a,b,1)}, ${irr(a,b,-1)}`:`${img(a,b,1)}, ${img(a,b,-1)}`}`,
      s:[`Synthetic division by ${r} gives the quotient ${ps(Q)} (remainder 0).`,`Quadratic formula: x = {{${-Q[1]?-Q[1]+" ":""}± √(${D})|2}}.`,`√(${D}) = ${kind?`2√${b}`:`${2*b}i`}, so x = ${kind?`${irr(a,b,1)} and ${irr(a,b,-1)}`:`${img(a,b,1)} and ${img(a,b,-1)}`}.`,`<b>Zeros: ${r}, ${kind?`${irr(a,b,1)}, ${irr(a,b,-1)}`:`${img(a,b,1)}, ${img(a,b,-1)}`}</b>`]}; }
  const c=[rnd(1,3),rnd(-6,6),rnd(-6,6),rnd(-9,9)], s=synth(c,r), ans=`${ps(s.q)}${s.rem?(s.rem>0?" + ":" - ")+`{{${Math.abs(s.rem)}|${ps([1,-r])}}}`:""}`;
  return {q:`Divide using synthetic division: (${ps(c)}) ÷ (${ps([1,-r])})`,a:ans,v:[x=>ev(c,x)/(x-r),x=>ev(s.q,x)+s.rem/(x-r)],
    s:[`Use c = ${r} and the coefficients ${c.join(", ")}.`,...synthTxt(c,r).map(x=>"→ "+x),`Quotient ${ps(s.q)}, remainder ${s.rem}: <b>${ans}</b>.`]}; }

/* ---------- 11. Rational Root Theorem ---------- */
function pRat(){ const T=rnd(0,1);
  if(T===0){ const c=[pick([1,2,3,4,5,6]),rnd(-6,6),rnd(-6,6),nz(-12,12)], L=cands(c).map(v=>"±"+t(v)).join(", ");
    return {q:`State the possible rational zeros: f(x) = ${ps(c)}`,a:L,s:[`p = factors of the constant ${c[3]}: ±${divs(Math.abs(c[3])).join(", ±")}.`,`q = factors of the leading coefficient ${c[0]}: ±${divs(c[0]).join(", ±")}.`,`All the values {{p|q}}, with duplicates removed: <b>${L}</b>.`]}; }
  const q=pick([2,3]); let p; do{ p=nz(-5,5); }while(gcd(p,q)!==1); const rs=[p/q,...distinct(2,-4,4)], E=prodC(rs), L=cands(E).map(v=>"±"+t(v)).join(", "), k=rs[1], Q=synth(E,k).q;
  return {q:`State the possible rational zeros, then find all zeros: f(x) = ${ps(E)}`,a:`Possible: ${L}.<br>Zeros: ${[...rs].sort((a,b)=>a-b).map(t).join(", ")}`,
    s:[`Possible rational zeros {{p|q}}: ${L}.`,`Test integers with synthetic division: x = ${k} gives remainder 0 ✓.`,`Quotient: ${ps(Q)} = ${fac(rs[0])}${fac(rs[2])}.`,`<b>Zeros: ${[...rs].sort((a,b)=>a-b).map(t).join(", ")}</b>`]}; }

/* ---------- 12. Polynomial equations ---------- */
const cubeRoots=(a,s)=>{ const r=-s*a, h=Math.abs(r); return [String(r),r%2===0?`${-r/2} ± ${h/2===1?"":h/2}i√3`:`{{${-r} ± ${h===1?"":h}i√3|2}}`]; };
function pEq(){ const T=rnd(0,4);
  if(T===0){ const a=rnd(1,4), s=pick([1,-1]), [r,z]=cubeRoots(a,s), Q=[1,s*a,a*a];
    return {q:`Solve: x^3 ${s>0?"+":"-"} ${a**3} = 0`,a:`${r}, ${z}`,s:[`${s>0?"Sum":"Difference"} of cubes: (${ps([1,s*a])})(${ps(Q)}) = 0.`,`${ps([1,s*a])} = 0 → x = ${r}.`,`${ps(Q)} = 0 → x = {{${-s*a} ± √(${a*a} - ${4*a*a})|2}} = {{${-s*a} ± √(-${3*a*a})|2}} → ${z}.`,`<b>x = ${r}, ${z}</b>`]}; }
  if(T===1){ const [a,b]=distinct(2,1,5).sort((x,y)=>x-y); return {q:`Solve: x^4 - ${a*a+b*b}x^2 + ${a*a*b*b} = 0`,a:`±${a}, ±${b}`,s:[`Quadratic form, u = x^2: u^2 - ${a*a+b*b}u + ${a*a*b*b} = (u - ${a*a})(u - ${b*b}) = 0.`,`x^2 = ${a*a} → x = ±${a}; x^2 = ${b*b} → x = ±${b}.`,`<b>x = ±${a}, ±${b}</b>`]}; }
  if(T===2){ const a=rnd(1,5), b=nz(1,5,[a]), E=[1,0,b*b-a*a,0,-a*a*b*b]; return {q:`Solve: ${ps(E)} = 0`,a:`±${a}, ±${b===1?"":b}i`,s:[`Quadratic form: (x^2 - ${a*a})(x^2 + ${b*b}) = 0.`,`x^2 = ${a*a} → x = ±${a}.`,`x^2 = -${b*b} → x = ±${b===1?"":b}i.`,`<b>x = ±${a}, ±${b===1?"":b}i</b>`]}; }
  if(T===3){ const a=nz(-5,5), k=pick([2,3,4,5,9,7]), E=mul([1,a],[1,0,-k]), rt=isSq(k)?String(Math.sqrt(k)):"√"+k; return {q:`Solve: ${ps(E)} = 0`,a:`${-a}, ±${rt}`,s:[`Group: x^2(${ps([1,a])}) - ${k}(${ps([1,a])}) = (${ps([1,a])})(x^2 - ${k}) = 0.`,`${ps([1,a])} = 0 → x = ${-a}.`,`x^2 = ${k} → x = ±${rt}.`,`<b>x = ${-a}, ±${rt}</b>`]}; }
  const q=pick([2,3]); let p; do{ p=nz(-5,5); }while(gcd(p,q)!==1); const [s]=distinct(1,-5,5), Q=prodC([p/q,s]), E=mul([1,0],Q), L=[0,p/q,s].sort((a,b)=>a-b).map(t).join(", ");
  return {q:`Solve: ${ps(E)} = 0`,a:L,s:[`Factor out x: x(${ps(Q)}) = 0.`,`Factor the trinomial: x${fac(p/q)}${fac(s)} = 0.`,`Set each factor to 0: <b>x = ${L}</b>.`]}; }

/* ---------- 13. Basic shape of graphs ---------- */
const endW=(n,a)=>n%2?(a>0?"f(x) → -∞ as x → -∞; f(x) → +∞ as x → +∞":"f(x) → +∞ as x → -∞; f(x) → -∞ as x → +∞"):(a>0?"f(x) → +∞ as x → ±∞":"f(x) → -∞ as x → ±∞");
function pShape(){ const T=rnd(0,1);
  if(T===0){ const n=rnd(2,7), c=[nz(-4,4),...Array(n).fill(0)]; for(let i=0;i<2;i++) c[rnd(1,n)]=nz(-9,9);
    return {q:`Describe the end behavior, and state the maximum number of x-intercepts and turning points: f(x) = ${ps(c)}`,a:`${endW(n,c[0])}. Max x-intercepts ${n}, max turning points ${n-1}.`,
      s:[`Leading term ${ps([c[0],...Array(n).fill(0)])}: degree ${n} (${n%2?"odd":"even"}), leading coefficient ${c[0]} (${c[0]>0?"positive":"negative"}).`,`${n%2?"Odd degree: the ends go in opposite directions":"Even degree: both ends go the same way"}; ${c[0]>0?"positive":"negative"} → <b>${endW(n,c[0])}</b>.`,`At most ${n} x-intercepts (the degree) and at most ${n-1} turning points (degree - 1).`]}; }
  const k=rnd(2,5), rs=distinct(k,-3,3).map(v=>v*0.85), lc=pick([1,-1]); let c=[lc]; rs.forEach(r=>c=mul(c,[1,-r])); let mx=0; for(let i=0;i<=60;i++) mx=Math.max(mx,Math.abs(ev(c,-3.2+6.4*i/60)));
  const cc=c.map(v=>v*5/mx);
  return {q:`Describe the end behavior, state whether the degree is even or odd and the sign of the leading coefficient, and count the real zeros.`,g:{f:[{f:x=>ev(cc,x)}],xr:[-4,4],yr:[-6,6]},
    a:`${endW(k,lc)}. Degree: ${k%2?"odd":"even"}; leading coefficient: ${lc>0?"positive":"negative"}; ${k} real zeros.`,
    s:[`Look at the ends: ${k%2?"they point in opposite directions → <b>odd</b> degree":"they point the same way → <b>even</b> degree"}.`,`The right end goes ${(k%2?lc>0:lc>0)?"up":"down"} → leading coefficient <b>${lc>0?"positive":"negative"}</b>.`,`Count the x-intercepts: <b>${k}</b> real zeros.`]}; }

/* ---------- 14. Graphing polynomial functions ---------- */
function pGraph(){ const rs=distinct(3,-4,4).sort((a,b)=>a-b), ms=[1,pick([1,2]),1], lc=pick([1,-1]); let c=[lc]; rs.forEach((r,i)=>{ for(let j=0;j<ms[i];j++) c=mul(c,[1,-r]); });
  const deg=ms.reduce((s,m)=>s+m,0), f=`${kPre(lc)}${rs.map((r,i)=>`(${ps([1,-r])})${ms[i]>1?"^2":""}`).join("")}`, std=Math.random()<.4;
  let mx=0; for(let i=0;i<=80;i++) mx=Math.max(mx,Math.abs(ev(c,rs[0]-.6+(rs[2]-rs[0]+1.2)*i/80))); const y0=ev(c,0);
  return {q:`Sketch the graph: f(x) = ${std?ps(c):f}`,
    a:`${std?`f(x) = ${f}. `:""}Zeros: ${rs.map((r,i)=>`${r}${ms[i]>1?" (touches)":" (crosses)"}`).join(", ")}; y-intercept (0, ${y0}); ${deg%2?"odd":"even"} degree, ${lc>0?"positive":"negative"} leading coefficient.`,
    s:[...(std?[`Factor: f(x) = ${f}.`]:[]),`End behavior: degree ${deg}, leading coefficient ${lc} → ${endW(deg,lc)}.`,...rs.map((r,i)=>`x = ${r}: multiplicity ${ms[i]} → ${ms[i]>1?"touches and turns":"crosses"}.`),`y-intercept: f(0) = ${y0}.`,"Plot the intercepts and connect smoothly, following the end behavior."],
    ag:{f:[{f:x=>ev(c,x)}],p:[...rs.map(r=>[r,0,`(${r}, 0)`]),...(rs.includes(0)?[]:[[0,y0,`(0, ${y0})`]])],xr:[Math.min(rs[0],0)-1.5,Math.max(rs[2],0)+1.5],yr:[-Math.max(mx,Math.abs(y0))*1.15-1,Math.max(mx,Math.abs(y0))*1.15+1]}}; }

/* ---------- 15. Binomial Theorem ---------- */
const C=(n,k)=>{ let r=1; for(let i=1;i<=k;i++) r=r*(n-k+i)/i; return Math.round(r); };
function pBinom(){ const T=rnd(0,2), n=T===0?rnd(3,5):rnd(5,9), a=pick([1,1,2,3]), b=nz(-3,3), y=Math.random()<.35;
  const tm=k=>[C(n,k)*a**(n-k)*b**k,{x:n-k,y:y?k:0}], A=a===1?"x":`${a}x`, B=y?`${b===1?"":b===-1?"-":b}y`:String(b), base=y?`${A} ${b<0?"-":"+"} ${Math.abs(b)===1?"":Math.abs(b)}y`:`${A} ${b<0?"-":"+"} ${Math.abs(b)}`;
  const gen=k=>`C(${n}, ${k})(${A})^${n-k}(${B})^${k}`;
  if(T===0){ const terms=Array.from({length:n+1},(_,k)=>tm(k));
    return {q:`Expand completely: (${base})^${n}`,a:join(terms),v:y?null:[x=>(a*x+b)**n,x=>terms.reduce((s,[c,v])=>s+c*x**v.x,0)],
      s:[`Row ${n} of Pascal's triangle: ${Array.from({length:n+1},(_,k)=>C(n,k)).join(", ")}.`,`Each term: C(${n}, k)(${A})^(${n} - k)(${B})^k for k = 0 … ${n}.`,`Terms: ${terms.map((tt,k)=>`${C(n,k)}·${a**(n-k)}·${b**k<0?"("+b**k+")":b**k} = ${tt[0]}`).join("; ")}.`,`<b>${join(terms)}</b>`]}; }
  const k=rnd(1,n-1), [c,v]=tm(k), ord=["","1st","2nd","3rd"][k+1]||(k+1)+"th";
  if(T===1) return {q:`Find the ${ord} term in the expansion of (${base})^${n}`,a:join([tm(k)]),s:[`The ${ord} term has k = ${k} (k starts at 0).`,`Term = ${gen(k)}.`,`C(${n}, ${k}) = ${C(n,k)}; (${A})^${n-k} = ${join([[a**(n-k),{x:n-k}]])}; (${B})^${k} = ${join([[b**k,{y:y?k:0}]])}.`,`<b>${join([tm(k)])}</b>`]};
  return {q:`Find the coefficient of ${mono(1,v,true)} in the expansion of (${base})^${n}`,a:String(c),s:[`x^${n-k} comes from the term with k = ${k}: ${gen(k)}.`,`C(${n}, ${k}) · ${a}^${n-k} · (${b})^${k} = ${C(n,k)} · ${a**(n-k)} · ${b**k<0?"("+b**k+")":b**k}.`,`<b>${c}</b>`]}; }


/* ---------- extra generators for the lesson practice panels ---------- */
function pEvenOdd(){ const T=rnd(0,2); let c;
  if(T===0) c=[pick([1,2,-1,3]),0,nz(-6,6),0,rnd(-5,5)]; else if(T===1) c=[pick([1,2,-1]),0,nz(-6,6),0]; else c=[pick([1,-1,2]),nz(-4,4),nz(-5,5),rnd(-5,5)];
  const m=neg(c), even=m.every((v,i)=>v===c[i]), odd=m.every((v,i)=>v===-c[i]), k=even?"even":odd?"odd":"neither";
  return {q:`Is f(x) = ${ps(c)} even, odd, or neither?`,a:k,s:[`Find f(-x): replace x with -x. Even powers keep their sign, odd powers flip it.`,`f(-x) = ${ps(m)}.`,even?"f(-x) = f(x) → <b>even</b> (symmetric about the y-axis).":odd?"f(-x) = -f(x) → <b>odd</b> (symmetric about the origin).":"f(-x) is neither f(x) nor -f(x) → <b>neither</b>."]}; }
function pDegLC(){ const rs=distinct(rnd(2,3),-5,5), ms=rs.map(()=>pick([1,1,2])), lc=pick([1,-1,2,-2,3]); let c=[lc]; rs.forEach((r,i)=>{ for(let j=0;j<ms[i];j++) c=mul(c,[1,-r]); });
  const deg=c.length-1, f=`${kPre(lc)}${rs.map((r,i)=>`(${ps([1,-r])})${ms[i]>1?"^2":""}`).join("")}`;
  return {q:`For f(x) = ${f}, state the degree, the leading coefficient and the y-intercept.`,a:`degree ${deg}; leading coefficient ${lc}; y-intercept (0, ${c[deg]})`,
    s:[`Degree: add the exponents of the factors: ${ms.join(" + ")} = <b>${deg}</b>.`,`Leading coefficient: multiply the leading coefficients: ${lc}${ms.map(()=>" · 1").join("")} = <b>${lc}</b>.`,`y-intercept: f(0) = ${kPre(lc)||"1"}${rs.map((r,i)=>`(${-r})${ms[i]>1?"^2":""}`).join("")} = <b>${c[deg]}</b>.`]}; }
function pTurns(){ const n=rnd(2,7);
  return {q:`A polynomial function has degree ${n}. What is the greatest possible number of x-intercepts, and of turning points?`,a:`${n} x-intercepts; ${n-1} turning points`,
    s:[`A degree-n polynomial has at most n real zeros → at most <b>${n}</b> x-intercepts.`,`It has at most n - 1 turning points → <b>${n-1}</b>.`]}; }
function pFacK(){ const r=nz(-3,3), b=rnd(-4,4), K=nz(-6,6), d=-(r**3+b*r*r+K*r), c=[1,b,K,d], known=r**3+b*r*r+d;
  const ftxt=`x^3${b?(b<0?" - ":" + ")+(Math.abs(b)===1?"":Math.abs(b))+"x^2":""} + kx${d?(d<0?" - "+(-d):" + "+d):""}`;
  return {q:`Find k so that ${ps([1,-r])} is a factor of ${ftxt}.`,a:`k = ${K}`,
    s:[`Factor Theorem: ${ps([1,-r])} is a factor exactly when f(${r}) = 0.`,`f(${r}) = ${r**3}${b?(b*r*r<0?" - ":" + ")+Math.abs(b*r*r):""} ${r<0?"- "+(-r===1?"":-r):"+ "+(r===1?"":r)}k${d?(d<0?" - "+(-d):" + "+d):""} = ${known} ${r<0?"- "+(-r===1?"":-r):"+ "+(r===1?"":r)}k.`,`Set it equal to 0: ${r===1?"k":r===-1?"-k":r+"k"} = ${-known} → <b>k = ${K}</b>.`,`Check: f(x) = ${ps(c)} and f(${r}) = ${ev(c,r)} ✓.`]}; }
const rootB=(c,a,b)=>{ for(let i=0;i<80;i++){ const m=(a+b)/2; if(ev(c,a)*ev(c,m)<=0) b=m; else a=m; } return (a+b)/2; };
function pApprox(){ for(;;){ const c=[1,0,rnd(-6,-1),rnd(-6,6)]; for(let k=-3;k<=3;k++){ const A=ev(c,k), B=ev(c,k+1); if(A*B<0){ const r=rootB(c,k,k+1); if(Math.abs(r*10-Math.round(r*10))<0.08) continue;
    return {q:`Show that f(x) = ${ps(c)} has a real zero between ${k} and ${k+1}, and approximate it to the nearest tenth.`,a:`x ≈ ${r.toFixed(1)}`,
      s:[`f(${k}) = ${A} and f(${k+1}) = ${B} have opposite signs, so a zero lies between ${k} and ${k+1} (Location Principle).`,`Tenths: f(${(Math.floor(r*10)/10).toFixed(1)}) = ${ev(c,Math.floor(r*10)/10).toFixed(3)} and f(${(Math.floor(r*10)/10+.1).toFixed(1)}) = ${ev(c,Math.floor(r*10)/10+.1).toFixed(3)} → sign change.`,`Midpoint test or a calculator: x ≈ ${r.toFixed(3)} → <b>x ≈ ${r.toFixed(1)}</b>.`]}; } } } }
function pDivide(){ const r=nz(-4,4), c=[rnd(1,3),rnd(-6,6),rnd(-6,6),rnd(-9,9)], s=synth(c,r), ans=`${ps(s.q)}${s.rem?(s.rem>0?" + ":" - ")+`{{${Math.abs(s.rem)}|${ps([1,-r])}}}`:""}`;
  return {q:`Divide using synthetic division: (${ps(c)}) ÷ (${ps([1,-r])})`,a:ans,s:[`Use c = ${r} and the coefficients ${c.join(", ")}.`,...synthTxt(c,r).map(x=>"→ "+x),`Quotient ${ps(s.q)}, remainder ${s.rem}: <b>${ans}</b>.`]}; }
const SECGEN={props:[pNaming,pEvenOdd,pDegLC,pTurns],end:[pShape,pTurns],zeros:[pZeros,pGraph],rem:[pRem,pDivide],fac:[pMore,pFacK],rat:[pRat,pDesc],img:[pIrrImg,pEq],apx:[pApprox]};
/* ---------- worksheet definitions ---------- */
const WS=[
  ["name","Naming and simple operations",pNaming,16,"Name each polynomial, or simplify.","props"],
  ["cubes","Factoring a sum/difference of cubes",pCubes,16,"Factor each completely.","f:formulas"],
  ["group","Factoring by grouping",pGroup,14,"Factor each completely.",""],
  ["qform","Factoring quadratic form",pQuadForm,14,"Factor each completely.",""],
  ["all","Factoring using all techniques",pAll,18,"Factor each completely.","f:formulas"],
  ["zeros","Factors and zeros",pZeros,14,"Follow the directions for each problem.","zeros"],
  ["rem","The Remainder Theorem",pRem,16,"Evaluate or find the remainder.","rem"],
  ["irrimg","Irrational and Imaginary Root Theorems",pIrrImg,12,"Follow the directions for each problem.","img"],
  ["desc","Descartes' Rule of Signs",pDesc,12,"State the possible number of positive real zeros, negative real zeros, and imaginary zeros.","rat"],
  ["more","More on factors, zeros, and dividing",pMore,14,"Follow the directions for each problem.","fac"],
  ["rat","The Rational Root Theorem",pRat,12,"Follow the directions for each problem.","rat"],
  ["eq","Polynomial equations",pEq,14,"Find all solutions, real and imaginary.","img"],
  ["shape","Basic shape of graphs of polynomials",pShape,10,"Describe each polynomial function.","end"],
  ["graph","Graphing polynomial functions",pGraph,8,"Sketch the graph of each function.","zeros"],
  ["binom","The Binomial Theorem",pBinom,14,"Expand completely, or find the requested term or coefficient.","f:unit-2"]];

function sheet(i,cnt){ const [id,title,gen,N0,dir]=WS[i], N=cnt||N0; const seen=new Set(), ps_=[]; let g=0;
  while(ps_.length<N&&g++<N*30){ const p=gen(); const k=p.q.replace(/\s/g,""); if(seen.has(k)) continue; seen.add(k); ps_.push(p); }
  return {i,title,dir,ps:ps_}; }
function sheetHtml(S){
  return `<div class="ws-sheet ws-active" data-ws="${S.i}"><div class="ws-head"><div><div class="ws-k">Algebra 2 Honors · Worksheet</div><h3>${S.title}</h3></div><div class="ws-nm">Name ____________________<br>Date ________ Period ____</div></div>
   <p class="ws-dir">${fmt(S.dir)}</p>
   <ol class="ws-list${S.ps.some(p=>p.g||p.ag)?" ws-wide":""}">${S.ps.map(p=>`<li><div class="ws-q">${fmt(/^Factor each/.test(S.dir)?p.q.replace(/^Factor completely: /,""):p.q)}</div>${p.g?plot(p.g):""}${p.ag?`<div class="ws-blank">${plot({f:[{f:()=>NaN}],xr:[-6,6],yr:[-6,6]})}</div>`:""}<div class="ws-a">${fmt(p.a)}${p.ag?plot(p.ag):""}</div></li>`).join("")}</ol></div>`;
}
function html(){
  return `<div class="ws"><p class="lead2">Original worksheets in the classic Algebra 2 style: numbered problems, an answer key, and a new set of problems every time. Pick a topic. Print it, or work on screen and check with the answer key.</p>
   <div class="ws-topics">${WS.map(([id,ti,,N,,rev],i)=>`<button type="button" data-wst="${i}"${i?"":' class="on"'}><span>${ti}</span><small>${N} problems</small></button>`).join("")}</div>
   <div class="ws-modes">${[["ws","📝 Worksheet"],["sol","✅ Solved examples"],["deck","🃏 Practice deck"]].map(([k,v],i)=>`<button type="button" data-wsm="${k}"${i?"":` class="on"`}>${v}</button>`).join("")}</div>
   <div class="ws-bar"><button type="button" class="ws-b" data-wsnew>↻ New worksheet</button><button type="button" class="ws-b alt" data-wsans>Show answers</button><button type="button" class="ws-b alt" data-wsprint>🖨 Print</button><span class="ws-rev"></span></div>
   <div class="ws-out"></div></div>`;
}
function makeSet(gens,n){ const out=[], seen=new Set(); let g=0; while(out.length<n&&g++<n*40){ const p=gens[out.length%gens.length](); const k=p.q.replace(/\s/g,""); if(seen.has(k)) continue; seen.add(k); out.push(p); } return out; }
/* wrong answers for multiple choice: mutate the correct answer (flip a sign, nudge a number), or borrow another instance's answer */
function mutate(a){ // change the result part only: after the last " = ", and never inside a {{fraction}}
  const start=a.lastIndexOf(" = ")>=0?a.lastIndexOf(" = ")+3:0, prot=[]; for(const m of a.matchAll(/\{\{[^}]*\}\}/g)) prot.push([m.index,m.index+m[0].length]);
  const free=i=>i>=start&&!prot.some(([x,y])=>i>=x&&i<y);
  const toks=[...a.matchAll(/\d+/g)].filter(m=>free(m.index)&&a[m.index-1]!=="^"&&a[m.index-1]!=="."&&a[m.index-1]!=="√"), sgn=[...a.matchAll(/ [+−-] |\+∞|−∞|-∞/g)].filter(m=>free(m.index));
  if(Math.random()<.5&&sgn.length){ const m=pick(sgn), s=m[0]; const r=s.includes("∞")?(s[0]==="+"?"−∞":"+∞"):(s.includes("+")?" - ":" + "); return a.slice(0,m.index)+r+a.slice(m.index+s.length); }
  if(toks.length){ const m=pick(toks), v=+m[0], nv=Math.max(1,v+pick([-2,-1,1,2])); if(nv!==v) return a.slice(0,m.index)+nv+a.slice(m.index+m[0].length); }
  if(sgn.length){ const m=pick(sgn), s=m[0]; return a.slice(0,m.index)+(s.includes("+")?" - ":" + ")+a.slice(m.index+s.length); }
  return null; }
function options(p,gen){ const key=s=>fmt(s).replace(/<[^>]+>/g,"").replace(/\s/g,""), seen=new Set([key(p.a)]), w=[]; let g=0;
  while(w.length<3&&g++<60){ let c=g<40?mutate(p.a):gen().a; if(!c) continue; const k=key(c); if(seen.has(k)) continue; seen.add(k); w.push(c); }
  return shuffle([p.a,...w]); }
function deckRun(out,ps_,again){ let q=ps_.map((_,k)=>k), known=0, tries=0;
  const draw=()=>{ if(!q.length){ out.innerHTML=`<div class="ws-card ws-done"><h4>Deck complete! 🎉</h4><p>You worked through all ${ps_.length} problems in ${tries} tries.</p><button type="button" class="ws-b" data-dk="again">↻ New deck</button></div>`; out.querySelector('[data-dk="again"]').onclick=again; return; }
    const p=ps_[q[0]];
    out.innerHTML=`<div class="ws-prog"><i style="width:${100*known/ps_.length}%"></i></div><div class="ws-cnt">Known ${known} of ${ps_.length} · ${q.length} left</div>
     <div class="ws-card"><div class="ws-exq"><span class="ws-n">${q[0]+1}</span><span>${fmt(p.q)}</span></div>${p.g?plot(p.g):""}
      <p class="ws-hint">Work it out on paper, then check.</p><button type="button" class="ws-b" data-dk="show">Show answer &amp; steps</button>
      <div class="ws-back"><div class="ws-fin"><b>Answer:</b> ${fmt(p.a)}</div>${p.ag?plot(p.ag):""}<ol class="ws-steps">${(p.s||[]).map(x=>`<li>${fmt(x)}</li>`).join("")}</ol>
       <div class="ws-dkb"><button type="button" class="ws-b alt" data-dk="no">✗ Again</button><button type="button" class="ws-b" data-dk="yes">✓ Got it</button></div></div></div>`;
    out.querySelector('[data-dk="show"]').onclick=e=>{ out.querySelector(".ws-back").style.display="block"; e.target.style.display="none"; };
    out.querySelector('[data-dk="yes"]').onclick=()=>{ tries++; known++; q.shift(); draw(); };
    out.querySelector('[data-dk="no"]').onclick=()=>{ tries++; q.push(q.shift()); draw(); };
  }; draw(); }
const probHtml=(ps_)=>`<div class="ws-sol">${ps_.map((p,k)=>`<div class="ws-ex"><div class="ws-exq"><span class="ws-n">${k+1}</span><span>${fmt(p.q)}</span></div>${p.g?plot(p.g):""}${p.ag?`<div class="ws-blank">${plot({f:[{f:()=>NaN}],xr:[-6,6],yr:[-6,6]})}</div>`:""}
   <details class="ws-sd"><summary>Show solution</summary>${p.ag?plot(p.ag):""}<ol class="ws-steps">${(p.s||[]).map(x=>`<li>${fmt(x)}</li>`).join("")}</ol><div class="ws-fin"><b>Answer:</b> ${fmt(p.a)}</div></details></div>`).join("")}</div>`;
function quizRun(out,gens,n,again){ const ps_=makeSet(gens.filter(g=>g!==pGraph),n), opts=ps_.map((p,k)=>options(p,gens.filter(g=>g!==pGraph)[k%gens.filter(g=>g!==pGraph).length])); let right=0, done=0;
  out.innerHTML=`<div class="ws-qs">${ps_.map((p,k)=>`<div class="ws-ex ws-mq" data-k="${k}"><div class="ws-exq"><span class="ws-n">${k+1}</span><span>${fmt(p.q)}</span></div>${p.g?plot(p.g):""}
    <div class="ws-opts">${opts[k].map((o,j)=>`<button type="button" data-j="${j}"><b>${"ABCD"[j]}.</b> ${fmt(o)}</button>`).join("")}</div><div class="ws-fb"></div></div>`).join("")}</div><div class="ws-score"></div>`;
  const sc=out.querySelector(".ws-score"); const upd=()=>{ sc.innerHTML=`Score: <b>${right} / ${n}</b>${done===n?` · ${right===n?"Perfect! 🎉":right/n>=.75?"Great work!":"Review the examples above and try a new quiz."} <button type="button" class="ws-b" data-qa>↻ New quiz</button>`:""}`; const b=sc.querySelector("[data-qa]"); if(b) b.onclick=again; }; upd();
  out.querySelectorAll(".ws-mq").forEach(el=>{ const k=+el.dataset.k, p=ps_[k];
    el.querySelectorAll(".ws-opts button").forEach(b=>b.onclick=()=>{ const ok=opts[k][+b.dataset.j]===p.a; el.querySelectorAll(".ws-opts button").forEach(x=>{ x.disabled=true; if(opts[k][+x.dataset.j]===p.a) x.classList.add("ok"); }); if(!ok) b.classList.add("bad");
      el.querySelector(".ws-fb").innerHTML=`<div class="ws-v ${ok?"ok":"bad"}">${ok?"✓ Correct!":"✗ Not quite."}</div><ol class="ws-steps">${(p.s||[]).map(x=>`<li>${fmt(x)}</li>`).join("")}</ol>`; done++; if(ok) right++; upd(); }); }); }
function block(key){ return `<div class="ws-pb" data-pb="${key}"><h4 class="ws-pbh">✎ Practice this section <small>new problems every time</small></h4>
  <div class="ws-modes">${[["prob","📝 Problems"],["deck","🃏 Deck"],["quiz","✔ Quiz (multiple choice)"]].map(([k,v],i)=>`<button type="button" data-pbm="${k}"${i?"":` class="on"`}>${v}</button>`).join("")}<button type="button" class="ws-b" data-pbn>↻ New</button></div><div class="ws-pbo"></div></div>`; }
function bindBlocks(root){ root.querySelectorAll("[data-pb]").forEach(box=>{ const gens=SECGEN[box.dataset.pb]; if(!gens) return; const out=box.querySelector(".ws-pbo"); let mode="prob";
  const render=()=>{ if(mode==="prob") out.innerHTML=probHtml(makeSet(gens,6)); else if(mode==="deck") deckRun(out,makeSet(gens,10),render); else quizRun(out,gens,8,render); };
  box.querySelectorAll("[data-pbm]").forEach(b=>b.onclick=()=>{ mode=b.dataset.pbm; box.querySelectorAll("[data-pbm]").forEach(x=>x.classList.toggle("on",x===b)); render(); });
  box.querySelector("[data-pbn]").onclick=render; render(); }); }
function solvedHtml(i){ const S=sheet(i,6);
  return `<div class="ws-sol">${S.ps.map((p,k)=>`<div class="ws-ex"><div class="ws-exq"><span class="ws-n">${k+1}</span><span>${fmt(p.q)}</span></div>${p.g?plot(p.g):""}
   <ol class="ws-steps">${(p.s||[]).map(x=>`<li>${fmt(x)}</li>`).join("")}</ol>${p.ag?plot(p.ag):""}<div class="ws-fin"><b>Answer:</b> ${fmt(p.a)}</div></div>`).join("")}</div>`; }
function bind(root){
  root.querySelectorAll(".ws").forEach(box=>{
    const out=box.querySelector(".ws-out"), ans=box.querySelector("[data-wsans]"), prn=box.querySelector("[data-wsprint]"), nw=box.querySelector("[data-wsnew]"), rev=box.querySelector(".ws-rev"); let cur=0, show=false, mode="ws";
    const render=()=>{
      ans.style.display=prn.style.display=mode==="ws"?"":"none"; nw.textContent=mode==="ws"?"↻ New worksheet":mode==="sol"?"↻ New examples":"↻ New deck";
      if(mode==="ws"){ out.innerHTML=sheetHtml(sheet(cur)); out.querySelector(".ws-sheet").classList.toggle("ws-show",show); }
      else if(mode==="sol") out.innerHTML=`<h4 class="ws-ttl">${WS[cur][1]}: solved examples</h4>`+solvedHtml(cur);
      else { out.innerHTML=`<h4 class="ws-ttl">${WS[cur][1]}: practice deck</h4><div class="ws-dk"></div>`; deckRun(out.querySelector(".ws-dk"),sheet(cur,12).ps,render); }
      const r=WS[cur][5]; rev.innerHTML=r?(r.startsWith("f:")?`<button type="button" class="openu ws-lk" data-open="${r.slice(2)}">Review the lesson →</button>`:`<button type="button" class="ws-lk" data-wsrev="sub-poly-${r}">Review the lesson →</button>`):"";
      const rb=rev.querySelector("[data-wsrev]"); if(rb) rb.onclick=()=>{ const d=document.getElementById(rb.dataset.wsrev); if(d){ if(d.tagName==="DETAILS") d.open=true; d.scrollIntoView({behavior:"smooth",block:"start"}); } }; };
    box.querySelectorAll("[data-wst]").forEach(b=>b.onclick=()=>{ cur=+b.dataset.wst; box.querySelectorAll("[data-wst]").forEach(x=>x.classList.toggle("on",x===b)); render(); });
    box.querySelectorAll("[data-wsm]").forEach(b=>b.onclick=()=>{ mode=b.dataset.wsm; box.querySelectorAll("[data-wsm]").forEach(x=>x.classList.toggle("on",x===b)); render(); });
    nw.onclick=render;
    ans.onclick=()=>{ show=!show; ans.textContent=show?"Hide answers":"Show answers"; const s=out.querySelector(".ws-sheet"); if(s) s.classList.toggle("ws-show",show); };
    prn.onclick=()=>{ document.body.classList.add("ws-print"); setTimeout(()=>{ window.print(); setTimeout(()=>document.body.classList.remove("ws-print"),300); },50); };
    render();
  });
}
const NAVY="#1d4e89";
const css=`.ws-topics{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:6px;margin:4px 0 12px}
.ws-topics button{display:flex;justify-content:space-between;align-items:baseline;gap:8px;border:1.5px solid ${NAVY};background:#fff;color:${NAVY};padding:6px 10px;font:500 16px 'EB Garamond',Georgia,serif;cursor:pointer;text-align:left}
.ws-topics button small{color:#777;font-size:12.5px;white-space:nowrap}
.ws-topics button:hover{background:#eef3fa}
.ws-topics button.on{background:${NAVY};color:#fff}.ws-topics button.on small{color:#cdd9ea}
.ws-modes{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 10px}
.ws-modes button{border:2px solid ${NAVY};background:#fff;color:${NAVY};padding:6px 16px;font:600 16.5px 'EB Garamond',Georgia,serif;cursor:pointer}
.ws-modes button.on{background:${NAVY};color:#fff}
.ws-ttl{font-size:21px;margin:4px 0 10px}
.ws-sol{display:grid;grid-template-columns:repeat(auto-fill,minmax(420px,1fr));gap:12px}
.ws-ex,.ws-card{border:1.5px solid #111;background:#fff;padding:12px 16px}
.ws-exq{display:flex;gap:8px;align-items:baseline;font-size:18px}
.ws-n{flex:none;min-width:24px;height:24px;line-height:24px;border-radius:50%;background:${NAVY};color:#fff;text-align:center;font-size:13px}
.ws-steps{margin:8px 0 6px;padding-left:22px;font-size:16px;line-height:1.65}
.ws-fin{font-size:17px;border-top:1px dashed #bbb;padding-top:6px;margin-top:4px}
.ws-fin b{color:${NAVY}}
.ws-ex figure.gph,.ws-card figure.gph{float:none;width:min(300px,100%);margin:6px 0}
.ws-dk{max-width:720px}
.ws-card{padding:16px 20px}
.ws-hint{font-style:italic;color:#666;margin:10px 0}
.ws-back{display:none;margin-top:8px}
.ws-dkb{display:flex;gap:8px;justify-content:flex-end;margin-top:8px}
.ws-prog{height:6px;background:#dfe7f2;margin-bottom:4px}.ws-prog i{display:block;height:100%;background:${NAVY}}
.ws-cnt{font-size:15px;color:#555;margin-bottom:8px}
.ws-done{text-align:center}
@media (max-width:640px){.ws-sol{grid-template-columns:1fr}}
.ws-pb{border:2px solid ${NAVY};background:#f6f9fd;padding:12px 16px;margin:18px 0 6px}
.ws-pbh{margin:0 0 8px;color:${NAVY};font-size:21px}.ws-pbh small{font-size:14px;font-style:italic;color:#666;font-weight:400;margin-left:6px}
.ws-pb .ws-modes{align-items:center}.ws-pb .ws-modes .ws-b{margin-left:auto}
.ws-sd>summary{cursor:pointer;color:${NAVY};font-weight:600;margin-top:6px}
.ws-qs{display:grid;grid-template-columns:repeat(auto-fill,minmax(420px,1fr));gap:12px}
.ws-opts{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px}
.ws-opts button{border:1.5px solid #111;background:#fff;text-align:left;padding:6px 9px;font:16.5px 'EB Garamond',Georgia,serif;cursor:pointer;color:#111}
.ws-opts button:hover:not(:disabled){background:#f4f4f4}
.ws-opts button.ok{background:#e5f4e8;border-color:#1b7a34}.ws-opts button.bad{background:#fde6e9;border-color:#c0262d;text-decoration:line-through}
.ws-v{font-weight:700;margin-top:8px}.ws-v.ok{color:#1b7a34}.ws-v.bad{color:#c0262d}
.ws-score{font-size:18px;margin-top:10px;color:${NAVY}}
.ws-pb .ws-blank figure.gph{width:min(220px,100%)}
@media (max-width:640px){.ws-qs{grid-template-columns:1fr}.ws-opts{grid-template-columns:1fr}}
.ws-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:0 0 12px}
.ws-b{border:1.5px solid ${NAVY};background:${NAVY};color:#fff;padding:5px 14px;font:600 16px 'EB Garamond',Georgia,serif;cursor:pointer}
.ws-b.alt{background:#fff;color:${NAVY}}
.ws-lk{border:none;background:none;color:${NAVY};text-decoration:underline;font:500 16px 'EB Garamond',Georgia,serif;cursor:pointer;padding:0}
.ws-sheet{border:1.5px solid #111;background:#fff;padding:18px 24px}
.ws-head{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2px solid #111;padding-bottom:6px;margin-bottom:8px;gap:12px;flex-wrap:wrap}
.ws-head h3{margin:2px 0 0;font-size:24px}
.ws-k{font-size:12.5px;letter-spacing:.12em;text-transform:uppercase;color:#666}
.ws-nm{font-size:15px;text-align:right;line-height:1.6}
.ws-dir{font-style:italic;margin:4px 0 12px}
.ws-list{columns:2;column-gap:36px;padding-left:28px;margin:0}
.ws-list.ws-wide{columns:1}
.ws-list li{break-inside:avoid;margin:0 0 22px;font-size:17.5px;line-height:1.5;padding-left:4px}
.ws-list li::marker{font-weight:700}
.ws-list figure.gph{float:none;width:min(260px,100%);margin:6px 0}
.ws-a{display:none;color:#c0262d;margin-top:6px;font-size:16.5px}
.ws-show .ws-a{display:block}
.ws-show .ws-blank{display:none}
.ws-blank figure.gph{width:min(240px,100%)}
.ws-a figure.gph{width:min(300px,100%)}
@media (max-width:700px){.ws-list{columns:1}.ws-sheet{padding:12px}}
@media print{body.ws-print *{visibility:hidden!important}body.ws-print .ws-active,body.ws-print .ws-active *{visibility:visible!important}body.ws-print .ws-active{position:absolute;left:0;top:0;width:100%;border:none}body.ws-print .ws-list li{margin-bottom:60px}body.ws-print .ws-show .ws-list li{margin-bottom:18px}}`;
const st=document.createElement("style"); st.textContent=css; document.head.appendChild(st);
window.A2WS={ui:{deckRun,probHtml,quizRun,makeSet},html,bind,block,bindBlocks,count:()=>WS.length,_test:{WS,sheet,solvedHtml,SECGEN,options,mutate,makeSet}};
})();
