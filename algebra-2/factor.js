/* Factoring folder: which method to use, the Cross Table method for ax² + bx + c, Ruffini's method for degree 3+,
   with solved examples and practice where students type numbers into the boxes (checked as they type).
   Also restyles the node maps used by the Polynomials folder and the unit pages. */
(function(){
const TEAL="#0f7a6c", RED="#c23a52", NAVY="#1d4e89", PURP="#6a3d9a", INK="#1f4fd1";
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a;};
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)), pick=a=>a[Math.floor(Math.random()*a.length)];
const nz=(a,b)=>{let v=0;while(!v)v=rnd(a,b);return v;};

/* ---------- formatting ---------- */
const num=n=>n<0?"−"+Math.abs(n):String(n);
const sgn=n=>n<0?"−"+Math.abs(n):"+"+n;
const par=n=>n<0?"("+num(n)+")":String(n);
const tx=k=>k===1?"x":k===-1?"−x":num(k)+"x";                      // kx
function frc(n,d){ if(d<0){n=-n;d=-d;} const g=gcd(n,d)||1; n/=g; d/=g; if(d===1) return num(n); return `${n<0?"−":""}<span class="frc"><span>${Math.abs(n)}</span><span>${d}</span></span>`; }
function poly(c){ const n=c.length-1; let s="";
  c.forEach((a,i)=>{ if(!a) return; const p=n-i, m=Math.abs(a); const co=(m===1&&p>0)?"":String(m); const v=p===0?"":p===1?"x":`x<sup>${p}</sup>`;
    s+=s?(a<0?" − ":" + "):(a<0?"−":""); s+=co+v; });
  return s||"0"; }
const bin=(a,c)=>c===0?tx(a):`(${tx(a)} ${c<0?"−":"+"} ${Math.abs(c)})`;
const x2=a=>(a===1?"":a===-1?"−":num(a))+"x<sup>2</sup>";
const mul=(a,b)=>{ const r=Array(a.length+b.length-1).fill(0); a.forEach((x,i)=>b.forEach((y,j)=>r[i+j]+=x*y)); return r; };
const ev=(c,x)=>c.reduce((s,a)=>s*x+a,0);
function synth(c,r){ const s=[c[0]], p=[null]; for(let i=1;i<c.length;i++){ p.push(s[i-1]*r); s.push(c[i]+s[i-1]*r); } return {s,p}; }
const divs=n=>{ const r=[]; for(let i=1;i<=Math.abs(n);i++) if(n%i===0) r.push(i); return r; };
function intCands(c){ const k=c[c.length-1]; return k?divs(k).flatMap(d=>[d,-d]):[0]; }
function factorQuad(q){ // [a,b,c] -> [a1,c1,a2,c2] with (a1x+c1)(a2x+c2), or null
  const [a,b,c]=q; if(!c){ return [1,0,a,b]; }
  for(const a1 of divs(a)) { const a2=a/a1; for(const d of divs(c)) for(const c1 of [d,-d]){ const c2=c/c1; if(a1*c2+a2*c1===b){ if(a1===a2&&c1>c2&&false) continue; return [a1,c1,a2,c2]; } } }
  return null; }
function joinFactors(fs){ // fs: [[a,c],...] -> string with repeated factors as powers
  const m=new Map(); fs.forEach(([a,c])=>{ if(a<0){a=-a;c=-c;} const k=a+","+c; m.set(k,(m.get(k)||0)+1); });
  return [...m.entries()].map(([k,e])=>{ const [a,c]=k.split(",").map(Number); return bin(a,c)+(e>1?`<sup>${e}</sup>`:""); }).join(""); }

/* ---------- cross table drawing ---------- */
function ctHTML(o,sm){ // o: {a,b,c,a1,c1,a2,c2}
  const m1=o.a1*o.c2, m2=o.a2*o.c1;
  return `<div class="ct${sm?" sm":""}" role="img" aria-label="Cross table">
   <div class="ct-h"><span>${x2(o.a)}</span></div><div class="ct-h">${o.b<0?"−"+tx(-o.b):"+"+tx(o.b)}</div><div class="ct-h">${sgn(o.c)}</div>
   <div class="ct-c">${tx(o.a1)}</div><div class="ct-c ct-m">${tx(m1)}<small>${tx(o.a1)} · ${par(o.c2)}</small></div><div class="ct-c">${sgn(o.c1)}</div>
   <div class="ct-c">${tx(o.a2)}</div><div class="ct-c ct-m">${tx(m2)}<small>${tx(o.a2)} · ${par(o.c1)}</small></div><div class="ct-c">${sgn(o.c2)}</div>
   <svg class="ct-x" viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true"><line x1="50" y1="25" x2="250" y2="75"/><line x1="50" y1="75" x2="250" y2="25"/></svg>
   <div class="ct-sum">${tx(m1)} ${m2<0?"−":"+"} ${tx(Math.abs(m2))} = ${tx(m1+m2)} ✓</div></div>`;
}
const sumTxt=(m1,m2)=>`${tx(m1)} ${m2<0?"−":"+"} ${tx(Math.abs(m2))}`;

/* ---------- section 1: method flowchart (every method is a node) ---------- */
const S2="<sup>2</sup>", S3="<sup>3</sup>", S4="<sup>4</sup>";
const ORG="#c2571a";
const FM={
 gcf:{grp:"Always first",c:NAVY,name:"Greatest Common Factor",hint:"pull out what every term shares",
  when:"Always look for it first, before any other method.",
  rule:"Find the largest number that divides every coefficient and the lowest power of x in every term. Write it outside the parentheses and divide each term by it.",
  ex:[["6x"+S3+" + 15x"+S2,["Every term has a 3 and at least x"+S2+": GCF = 3x"+S2+".","6x"+S3+" ÷ 3x"+S2+" = 2x and 15x"+S2+" ÷ 3x"+S2+" = 5.","<b>3x"+S2+"(2x + 5)</b>"]],
      ["4x"+S4+" − 8x"+S3+" + 12x"+S2,["GCF = 4x"+S2+".","Divide each term: x"+S2+", −2x, +3.","<b>4x"+S2+"(x"+S2+" − 2x + 3)</b>. The trinomial doesn't factor, so you're done."]]]},
 dos:{grp:"2 terms",c:ORG,name:"Difference of Squares",hint:"a"+S2+" − b"+S2+" = (a − b)(a + b)",
  when:"Two perfect squares with a minus sign between them.",
  rule:"a"+S2+" − b"+S2+" = (a − b)(a + b). A <b>sum</b> of squares a"+S2+" + b"+S2+" does not factor over the real numbers.",
  ex:[["9x"+S2+" − 25",["9x"+S2+" = (3x)"+S2+" and 25 = 5"+S2+", so a = 3x and b = 5.","<b>(3x − 5)(3x + 5)</b>"]],
      ["x"+S4+" − 16",["x"+S4+" = (x"+S2+")"+S2+" and 16 = 4"+S2+": (x"+S2+" − 4)(x"+S2+" + 4).","x"+S2+" − 4 is a difference of squares again: (x − 2)(x + 2).","<b>(x − 2)(x + 2)(x"+S2+" + 4)</b>"]]]},
 soc:{grp:"2 terms",c:ORG,name:"Sum of Cubes",hint:"a"+S3+" + b"+S3,
  when:"Two perfect cubes added together.",
  rule:"a"+S3+" + b"+S3+" = (a + b)(a"+S2+" − ab + b"+S2+"). Memory aid SOAP: Same sign, Opposite sign, Always Positive.",
  ex:[["x"+S3+" + 27",["a = x and b = 3, since 27 = 3"+S3+".","<b>(x + 3)(x"+S2+" − 3x + 9)</b>"]],
      ["8x"+S3+" + 1",["a = 2x and b = 1.","<b>(2x + 1)(4x"+S2+" − 2x + 1)</b>"]]]},
 doc:{grp:"2 terms",c:ORG,name:"Difference of Cubes",hint:"a"+S3+" − b"+S3,
  when:"Two perfect cubes with a minus sign between them.",
  rule:"a"+S3+" − b"+S3+" = (a − b)(a"+S2+" + ab + b"+S2+"). Same SOAP pattern for the signs.",
  ex:[["x"+S3+" − 8",["a = x and b = 2.","<b>(x − 2)(x"+S2+" + 2x + 4)</b>"]],
      ["27x"+S3+" − 64",["a = 3x and b = 4.","<b>(3x − 4)(9x"+S2+" + 12x + 16)</b>"]]]},
 pst:{grp:"3 terms",c:RED,name:"Perfect Square Trinomial",hint:"a"+S2+" ± 2ab + b"+S2+" = (a ± b)"+S2,
  when:"The first and last terms are perfect squares and the middle term is 2·a·b.",
  rule:"a"+S2+" + 2ab + b"+S2+" = (a + b)"+S2+" and a"+S2+" − 2ab + b"+S2+" = (a − b)"+S2+".",
  ex:[["x"+S2+" + 10x + 25",["a = x and b = 5. Check the middle: 2 · x · 5 = 10x ✓","<b>(x + 5)"+S2+"</b>"]],
      ["4x"+S2+" − 12x + 9",["a = 2x and b = 3. Check: 2 · 2x · 3 = 12x ✓, and the sign is minus.","<b>(2x − 3)"+S2+"</b>"]]]},
 sp:{grp:"3 terms",c:RED,name:"a = 1: Product & Sum",hint:"m · n = c, m + n = b",
  when:"x"+S2+" + bx + c, where the leading coefficient is 1.",
  rule:"Find two numbers m and n with m · n = c and m + n = b. Then x"+S2+" + bx + c = (x + m)(x + n).",
  ex:[["x"+S2+" + 7x + 12",["Pairs that multiply to 12: 1·12, 2·6, 3·4. Only 3 + 4 = 7.","<b>(x + 3)(x + 4)</b>"]],
      ["x"+S2+" − 2x − 15",["Multiply to −15 and add to −2: −5 and +3.","<b>(x − 5)(x + 3)</b>"]]]},
 cross:{grp:"3 terms",c:RED,name:"a ≠ 1: Cross Table",hint:"factors on the sides, cross-multiply",go:"sub-factor-cross",
  when:"ax"+S2+" + bx + c with a ≠ 1.",
  rule:"Left column: factors of ax"+S2+". Right column: factors of c. The diagonal products must add to bx. Then read across each row.",
  ex:[["6x"+S2+" + x − 2",["Left 3x, 2x. Right +2, −1.","Cross: 3x·(−1) + 2x·2 = −3x + 4x = x ✓","<b>(3x + 2)(2x − 1)</b>"]],
      ["3x"+S2+" − 10x + 8",["Left 3x, x. Right −4, −2.","Cross: 3x·(−2) + x·(−4) = −10x ✓","<b>(3x − 4)(x − 2)</b>"]]]},
 qf:{grp:"3 terms",c:RED,name:"Quadratic Form (u = x"+S2+")",hint:"x"+S4+" + bx"+S2+" + c",
  when:"A trinomial like ax"+S4+" + bx"+S2+" + c, where one power is double the other.",
  rule:"Let u = x"+S2+". Factor au"+S2+" + bu + c like a quadratic, put x"+S2+" back, then factor again if you can.",
  ex:[["x"+S4+" − 5x"+S2+" + 4",["u = x"+S2+": u"+S2+" − 5u + 4 = (u − 1)(u − 4).","Back to x: (x"+S2+" − 1)(x"+S2+" − 4).","Both are differences of squares: <b>(x − 1)(x + 1)(x − 2)(x + 2)</b>"]],
      ["x"+S4+" + x"+S2+" − 12",["u"+S2+" + u − 12 = (u + 4)(u − 3).","(x"+S2+" + 4)(x"+S2+" − 3). x"+S2+" + 4 is a sum of squares and doesn't factor.","<b>(x"+S2+" + 4)(x"+S2+" − 3)</b>"]]]},
 grp:{grp:"4 terms",c:PURP,name:"Grouping",hint:"pair up, factor each pair",
  when:"Four terms, often a cubic.",
  rule:"Group the first two and last two terms. Take the GCF out of each pair. If the parentheses match, factor out that binomial.",
  ex:[["x"+S3+" + 2x"+S2+" − 9x − 18",["x"+S2+"(x + 2) − 9(x + 2)","(x + 2)(x"+S2+" − 9)","x"+S2+" − 9 is a difference of squares: <b>(x + 2)(x − 3)(x + 3)</b>"]],
      ["2x"+S3+" − 3x"+S2+" + 4x − 6",["x"+S2+"(2x − 3) + 2(2x − 3)","<b>(2x − 3)(x"+S2+" + 2)</b>"]]]},
 ruf:{grp:"Degree 3+",c:TEAL,name:"Ruffini's Method",hint:"find a root, divide, repeat",go:"sub-factor-ruf",
  when:"Degree 3 or more when grouping and the patterns don't work.",
  rule:"Test the divisors of the constant term. When P(r) = 0, divide by (x − r) with Ruffini's table. Repeat on the quotient until you reach a quadratic.",
  ex:[["x"+S3+" − 6x"+S2+" + 11x − 6",["P(1) = 0, so (x − 1) is a factor.","Ruffini with 1: quotient x"+S2+" − 5x + 6 = (x − 2)(x − 3).","<b>(x − 1)(x − 2)(x − 3)</b>"]],
      ["x"+S3+" + 2x"+S2+" − 5x − 6",["P(1) = −8 ✗, P(−1) = 0 ✓, so (x + 1) is a factor.","Quotient x"+S2+" + x − 6 = (x − 2)(x + 3).","<b>(x + 1)(x − 2)(x + 3)</b>"]]]},
 chk:{grp:"Last step",c:"#137333",name:"Factor Completely & Check",hint:"factor again, multiply back",
  when:"Every time, at the end.",
  rule:"Look at each factor again: can it still be factored (a difference of squares, a trinomial)? Then multiply everything back out. You should get the polynomial you started with.",
  ex:[["2x"+S3+" − 18x",["GCF: 2x(x"+S2+" − 9). Not done yet!","x"+S2+" − 9 = (x − 3)(x + 3).","<b>2x(x − 3)(x + 3)</b>"]],
      ["Check (3x + 2)(2x − 1)",["3x · 2x = 6x"+S2+", 3x · (−1) = −3x, 2 · 2x = 4x, 2 · (−1) = −2.","6x"+S2+" + x − 2 ✓ matches."]]]}
};

/* ---------- fresh examples for the method flowchart ("New examples" button) ---------- */
const sq=k=>k*k, X=(p,n)=>(p===1?"":num(p))+(n===1?"x":"x<sup>"+n+"</sup>");
const lin=(p,q)=>bin(p,q), pw=(p)=>p===1?"x":"("+tx(p)+")";
const sqFac=m=>{ const k=Math.round(Math.sqrt(-m)); return (m<0&&k*k===-m)?`(x − ${k})(x + ${k})`:`(${poly([1,0,m])})`; };
const FGEN={
 gcf:()=>{ const g=rnd(2,7), k=rnd(0,2); let a,b,c; do{ a=rnd(1,6); b=rnd(-9,9); c=nz(-9,9); }while(gcd(gcd(a,b),c)!==1);
   const inner=[a,b,c], full=inner.map(t=>t*g).concat(Array(k).fill(0)); const mono=g+(k===0?"":k===1?"x":"x<sup>"+k+"</sup>");
   return [poly(full),[`GCF of the numbers: ${g}${k?`; lowest power of x: ${k===1?"x":"x<sup>"+k+"</sup>"}`:""}.`,`Divide every term by ${mono}.`,`<b>${mono}(${poly(inner)})</b>`]]; },
 dos:()=>{ const p=pick([1,1,2,3,4,5]), q=rnd(1,9); if(gcd(p,q)!==1) return FGEN.dos();
   return [poly([p*p,0,-q*q]),[`Both terms are squares: ${pw(p)}<sup>2</sup> − ${q}<sup>2</sup>.`,`a<sup>2</sup> − b<sup>2</sup> = (a − b)(a + b) with a = ${tx(p)}, b = ${q}.`,`<b>${lin(p,-q)}${lin(p,q)}</b>`]]; },
 soc:()=>{ const p=pick([1,1,2,3]), q=rnd(1,5); if(gcd(p,q)!==1) return FGEN.soc();
   return [poly([p**3,0,0,q**3]),[`Both terms are cubes: ${pw(p)}<sup>3</sup> + ${q}<sup>3</sup>.`,`a<sup>3</sup> + b<sup>3</sup> = (a + b)(a<sup>2</sup> − ab + b<sup>2</sup>).`,`<b>${lin(p,q)}(${poly([p*p,-p*q,q*q])})</b>`]]; },
 doc:()=>{ const p=pick([1,1,2,3]), q=rnd(1,5); if(gcd(p,q)!==1) return FGEN.doc();
   return [poly([p**3,0,0,-(q**3)]),[`Both terms are cubes: ${pw(p)}<sup>3</sup> − ${q}<sup>3</sup>.`,`a<sup>3</sup> − b<sup>3</sup> = (a − b)(a<sup>2</sup> + ab + b<sup>2</sup>).`,`<b>${lin(p,-q)}(${poly([p*p,p*q,q*q])})</b>`]]; },
 pst:()=>{ const p=pick([1,1,2,3,4,5]), q=rnd(1,9), s=pick([1,-1]); if(gcd(p,q)!==1) return FGEN.pst();
   return [poly([p*p,2*p*q*s,q*q]),[`First and last terms are squares: ${pw(p)}<sup>2</sup> and ${q}<sup>2</sup>.`,`Middle term check: 2 · ${tx(p)} · ${q} = ${tx(2*p*q)} ✓`,`<b>${lin(p,s*q)}<sup>2</sup></b>`]]; },
 sp:()=>{ const m=nz(-9,9), n=nz(-9,9); if(m+n===0) return FGEN.sp();
   return [poly([1,m+n,m*n]),[`Find two numbers with product ${num(m*n)} and sum ${num(m+n)}.`,`They are ${num(m)} and ${num(n)}.`,`<b>${joinFactors([[1,m],[1,n]])}</b>`]]; },
 cross:()=>{ const a1=pick([2,3,1,5]), a2=pick([1,2,3]), c1=nz(-7,7), c2=nz(-7,7); const a=a1*a2;
   if(a<2||gcd(a1,c1)!==1||gcd(a2,c2)!==1||a1*c2+a2*c1===0) return FGEN.cross();
   return [poly([a,a1*c2+a2*c1,c1*c2]),[`Left: ${tx(a1)}, ${tx(a2)}. Right: ${num(c1)}, ${num(c2)}.`,`Cross: ${tx(a1)}·(${num(c2)}) + ${tx(a2)}·(${num(c1)}) = ${tx(a1*c2+a2*c1)} ✓`,`<b>${joinFactors([[a1,c1],[a2,c2]])}</b>`]]; },
 qf:()=>{ const opts=[-1,-4,-9,-16,1,2,3,4,5,-2,-3,-5,-7]; const m=pick(opts), n=pick(opts); if(m===n||m+n===0) return FGEN.qf();
   return [poly([1,0,m+n,0,m*n]),[`Let u = x<sup>2</sup>: u<sup>2</sup> ${(m+n)<0?"−":"+"} ${Math.abs(m+n)===1?"":Math.abs(m+n)}u ${m*n<0?"−":"+"} ${Math.abs(m*n)} = (u ${m<0?"−":"+"} ${Math.abs(m)})(u ${n<0?"−":"+"} ${Math.abs(n)}).`,`Back to x: (${poly([1,0,m])})(${poly([1,0,n])}).`,`Factor again where possible: <b>${sqFac(m)}${sqFac(n)}</b>`]]; },
 grp:()=>{ const a=pick([1,1,2,3]), b=nz(-6,6), m=pick([-1,-4,-9,-16,1,2,3,4,5,-2,-3,-5]); if(gcd(a,b)!==1) return FGEN.grp();
   const c=[a,b,a*m,b*m];
   return [poly(c),[`Group in pairs: (${poly([a,b,0,0])}) ${a*m<0?"−":"+"} (${poly([Math.abs(a*m),(a*m<0?-1:1)*b*m])}).`,
     `x<sup>2</sup>${lin(a,b)} ${m<0?"−":"+"} ${Math.abs(m)===1?"":Math.abs(m)}${lin(a,b)}`,`Factor out ${lin(a,b)}: ${lin(a,b)}(${poly([1,0,m])})`,`Factor completely: <b>${lin(a,b)}${sqFac(m)}</b>`]]; },
 ruf:()=>{ const r=[nz(-4,4),nz(-4,4),nz(-4,4)]; if(new Set(r).size<3) return FGEN.ruf();
   const c=r.reduce((p,x)=>mul(p,[1,-x]),[1]); const r0=intCands(c).find(t=>ev(c,t)===0); const q=synth(c,r0).s.slice(0,3); const rest=r.filter(x=>x!==r0);
   return [poly(c),[`Test divisors of ${num(c[3])}: P(${num(r0)}) = 0 ✓, so ${lin(1,-r0)} is a factor.`,`Ruffini with ${num(r0)}: quotient ${poly(q)} = ${joinFactors(rest.map(x=>[1,-x]))}.`,`<b>${joinFactors(r.slice().sort((x,y)=>y-x).map(x=>[1,-x]))}</b>`]]; },
 chk:()=>{ const g=rnd(2,6), q=rnd(1,8);
   return [poly([g,0,-g*q*q,0]),[`GCF: ${g}x(${poly([1,0,-q*q])}). Not done yet!`,`x<sup>2</sup> − ${q*q} = (x − ${q})(x + ${q}).`,`<b>${g}x(x − ${q})(x + ${q})</b>`]]; }
};

/* ---------- fresh examples for every other Algebra 2 flowchart ---------- */
const mtxH=(M)=>mat(M.map(r=>r.map(v=>typeof v==="number"?num(v):v)));
function sys2(kind){ for(let t=0;t<200;t++){ const x=nz(-6,6), y=rnd(-6,6); let a=nz(-5,5), b=nz(-5,5), c=nz(-5,5), d=nz(-5,5);
   if(kind==="sub"){ a=1; } const D=a*d-b*c; if(!D) continue; const e=a*x+b*y, f=c*x+d*y;
   const eq=(p,q,r)=>`${poly([p,0]).replace(/x$/,"x")} ${q<0?"−":"+"} ${Math.abs(q)===1?"":Math.abs(q)}y = ${num(r)}`;
   const q=`${eq(a,b,e)}<br>${eq(c,d,f)}`; let st;
   if(kind==="sub") st=[`Solve the first equation for x: x = ${num(e)} ${b<0?"+":"−"} ${Math.abs(b)===1?"":Math.abs(b)}y.`,`Substitute into the second and solve: y = ${num(y)}.`,`Back-substitute: x = ${num(x)}.`];
   else if(kind==="cr2") st=[`D = (${num(a)})(${num(d)}) − (${num(b)})(${num(c)}) = ${num(D)}.`,`D<sub>x</sub> = (${num(e)})(${num(d)}) − (${num(b)})(${num(f)}) = ${num(e*d-b*f)}, D<sub>y</sub> = (${num(a)})(${num(f)}) − (${num(e)})(${num(c)}) = ${num(a*f-e*c)}.`,`x = D<sub>x</sub>/D = ${num(x)}, y = D<sub>y</sub>/D = ${num(y)}.`];
   else if(kind==="inv") st=[`A = ${mtxH([[a,b],[c,d]])}, det A = ${num(D)}.`,`A<sup>−1</sup> = (1/${num(D)})${mtxH([[d,-b],[-c,a]])}.`,`[x ; y] = A<sup>−1</sup>·${mtxH([[e],[f]])} = ${mtxH([[x],[y]])}.`];
   else if(kind==="graph") st=[`Write both lines in slope-intercept form and graph them.`,`They cross at one point; read it off the graph.`,`Check it in both equations.`];
   else st=[`Multiply so one variable has opposite coefficients, then add the equations.`,`Solve the remaining one-variable equation: ${kind==="elim"?"y":"y"} = ${num(y)}.`,`Substitute back: x = ${num(x)}.`];
   return [q,[...st,`<b>(${num(x)}, ${num(y)})</b>`]]; } }
const LGEN={
 ind:(()=>{ const P=[
  ()=>{const n0=1;return ["Prove 1 + 2 + … + n = n(n+1)/2 for all n ≥ 1.",["Base case n = 1: left 1, right 1(2)/2 = 1. ✓","Hypothesis: assume 1 + … + k = k(k+1)/2.","Step: add k+1: k(k+1)/2 + (k+1) = (k+1)(k+2)/2.","<b>That is the formula for n = k+1, so it holds for all n ≥ 1.</b>"]]},
  ()=>{const a=pick([3,4,5,6,7,8,9]),b=a-1;return [`Prove ${a}<sup>n</sup> − 1 is divisible by ${b} for all n ≥ 1.`,[`Base case n = 1: ${a} − 1 = ${b}. ✓`,`Hypothesis: ${a}<sup>k</sup> − 1 = ${b}m for some integer m.`,`Step: ${a}<sup>k+1</sup> − 1 = ${a}·${a}<sup>k</sup> − 1 = ${a}(${b}m + 1) − 1 = ${b}(${a}m + 1).`,`<b>Divisible by ${b}, so it holds for all n ≥ 1.</b>`]]},
  ()=>{const r=pick([2,3,4,5]);return [`Prove 1 + ${r} + ${r}² + … + ${r}<sup>n−1</sup> = (${r}<sup>n</sup> − 1)/${r-1} for n ≥ 1.`,[`Base case n = 1: left 1, right (${r} − 1)/${r-1} = 1. ✓`,`Hypothesis: the sum up to ${r}<sup>k−1</sup> is (${r}<sup>k</sup> − 1)/${r-1}.`,`Step: add ${r}<sup>k</sup>: (${r}<sup>k</sup> − 1 + ${r-1}·${r}<sup>k</sup>)/${r-1} = (${r}<sup>k+1</sup> − 1)/${r-1}.`,`<b>The formula holds for n = k+1, so for all n ≥ 1.</b>`]]},
  ()=>{const c=pick([3,4,5]);return [`Prove 2<sup>n</sup> > ${c}n for all n ≥ ${c===3?4:c===4?5:5}.`,[`Base case: check the first n.`,`Hypothesis: 2<sup>k</sup> > ${c}k.`,`Step: 2<sup>k+1</sup> = 2·2<sup>k</sup> > ${2*c}k = ${c}k + ${c}k ≥ ${c}k + ${c} = ${c}(k+1), since k ≥ 1.`,`<b>So 2<sup>n</sup> > ${c}n for every n from the base case on.</b>`]]},
  ()=>{const a=pick([2,3,5]),d=pick([1,2,3]);return [`a<sub>1</sub> = ${a}, a<sub>n+1</sub> = a<sub>n</sub> + ${d}. Prove a<sub>n</sub> = ${a} + ${d}(n − 1).`,[`Base case: a<sub>1</sub> = ${a} + 0 = ${a}. ✓`,`Hypothesis: a<sub>k</sub> = ${a} + ${d}(k − 1).`,`Step: a<sub>k+1</sub> = a<sub>k</sub> + ${d} = ${a} + ${d}k.`,`<b>Matches the formula at n = k+1, so it holds for all n.</b>`]]}];
  const g=()=>pick(P)(); return {ibase:g,ihyp:g,isum:()=>pick([P[0],P[2]])(),idiv:P[1],iineq:P[3],irec:P[4],iconc:g}; })(),
 sys:{p3:()=>{ const k=nz(-5,5); return [`For which value of a does the system x + y + z = 1, x + 2y + 3z = 2, 2x + 3y + az = ${num(k)} have no unique solution?`,[`Coefficient determinant: 1(2a − 9) − 1(a − 6) + 1(3 − 4) = a − 4.`,`No unique solution when the determinant is 0.`,`<b>a = 4</b> (then check: rows 1 + 2 give 2x + 3y + 4z = 3, so infinitely many solutions if ${num(k)} = 3, none otherwise: <b>${k===3?"infinitely many":"no solution"}</b>)`]]; },graph:()=>sys2("graph"),sub:()=>sys2("sub"),elim:()=>sys2("elim"),cr2:()=>sys2("cr2"),inv:()=>sys2("inv")},
 mtx:{
  madd:()=>{ const A=[[rnd(-6,6),rnd(-6,6)],[rnd(-6,6),rnd(-6,6)]], B=[[rnd(-6,6),rnd(-6,6)],[rnd(-6,6),rnd(-6,6)]], k=nz(-3,3);
    return [`A = ${mtxH(A)}, B = ${mtxH(B)}. Find ${num(k)}A + B.`,[`Multiply every entry of A by ${num(k)}: ${mtxH(A.map(r=>r.map(v=>k*v)))}.`,`Add entry by entry.`,`<b>${mtxH(A.map((r,i)=>r.map((v,j)=>k*v+B[i][j])))}</b>`]]; },
  mmul:()=>{ const A=[[rnd(-4,4),rnd(-4,4)],[rnd(-4,4),rnd(-4,4)]], B=[[rnd(-4,4),rnd(-4,4)],[rnd(-4,4),rnd(-4,4)]]; const C=A.map(r=>[0,1].map(j=>r[0]*B[0][j]+r[1]*B[1][j]));
    return [`A = ${mtxH(A)}, B = ${mtxH(B)}. Find AB.`,[`Row 1 of A times each column of B: ${num(C[0][0])}, ${num(C[0][1])}.`,`Row 2 of A times each column of B: ${num(C[1][0])}, ${num(C[1][1])}.`,`<b>${mtxH(C)}</b>`]]; },
  mdet:()=>{ if(Math.random()<.5){ const a=rnd(-6,6),b=rnd(-6,6),c=rnd(-6,6),d=rnd(-6,6); return [`Find det ${mtxH([[a,b],[c,d]])}.`,[`ad − bc = (${num(a)})(${num(d)}) − (${num(b)})(${num(c)})`,`<b>${num(a*d-b*c)}</b>`]]; }
    const M=[0,1,2].map(()=>[0,1,2].map(()=>rnd(-4,4))); const [p,q,r]=M[0],[s2,t,u]=M[1],[v,w,z]=M[2]; const D=p*(t*z-u*w)-q*(s2*z-u*v)+r*(s2*w-t*v);
    return [`Find det ${mtxH(M)}.`,[`Expand along row 1: ${num(p)}(${num(t*z-u*w)}) − (${num(q)})(${num(s2*z-u*v)}) + (${num(r)})(${num(s2*w-t*v)}).`,`<b>${num(D)}</b>`]]; },
  minv:()=>{ let a,b,c,d,D; do{ a=rnd(-5,5);b=rnd(-5,5);c=rnd(-5,5);d=rnd(-5,5);D=a*d-b*c; }while(!D);
    const fm=v=>frc(v,D); return [`Find the inverse of ${mtxH([[a,b],[c,d]])}.`,[`det = ${num(D)} ≠ 0, so the inverse exists.`,`Swap a and d, change the signs of b and c, divide by the determinant.`,mtxH([[fm(d),fm(-b)],[fm(-c),fm(a)]])]]; },
  mtr:()=>{ const T=pick([[[[-1,0],[0,1]],"reflection in the y-axis"],[[[1,0],[0,-1]],"reflection in the x-axis"],[[[0,-1],[1,0]],"rotation 90° counterclockwise"],[[[0,1],[-1,0]],"rotation 90° clockwise"],[[[-1,0],[0,-1]],"rotation 180°"],[[[0,1],[1,0]],"reflection in y = x"]]); const x=nz(-6,6),y=nz(-6,6); const [M,nm]=T; const X2=M[0][0]*x+M[0][1]*y, Y2=M[1][0]*x+M[1][1]*y;
    return [`Use the matrix ${mtxH(M)} to transform the point (${num(x)}, ${num(y)}). What transformation is it?`,[`Multiply the matrix by the column ${mtxH([[x],[y]])}.`,`Result: ${mtxH([[X2],[Y2]])}, so the image is (${num(X2)}, ${num(Y2)}).`,`<b>(${num(X2)}, ${num(Y2)}): ${nm}</b>`]]; },
  mdim:()=>{ const m=rnd(1,4),n=rnd(1,4),p=rnd(1,4); return [`A is ${m} × ${n} and B is ${n} × ${p}. Is AB defined? What size is it? Is BA defined?`,[`AB: inner numbers ${n} = ${n} match, so AB is defined.`,`Size = outer numbers: ${m} × ${p}.`,`BA: ${p} vs ${m}: <b>${p===m?"also defined":"not defined"}</b>.`]]; }},
 sta:{
  scen:()=>{ const n=pick([5,6,7,8]), d=Array.from({length:n},()=>rnd(2,30)).sort((a,b)=>a-b), sum=d.reduce((a,b)=>a+b,0); const med=n%2?d[(n-1)/2]:(d[n/2-1]+d[n/2])/2;
    return [`Data: ${d.join(", ")}. Find the mean and the median.`,[`Mean = ${sum}/${n} = ${N2(sum/n)}.`,`Ordered data, middle ${n%2?"value":"two values averaged"}: median = ${med}.`,`<b>mean ${N2(sum/n)}, median ${med}</b>`]]; },
  sspr:()=>{ const d=Array.from({length:8},()=>rnd(1,40)).sort((a,b)=>a-b); const q1=(d[1]+d[2])/2, q3=(d[5]+d[6])/2;
    return [`Data: ${d.join(", ")}. Find the range and the IQR.`,[`Range = ${d[7]} − ${d[0]} = ${d[7]-d[0]}.`,`Q1 = median of the lower half = ${q1}; Q3 = median of the upper half = ${q3}.`,`<b>range ${d[7]-d[0]}, IQR ${q3-q1}</b>`]]; },
  spct:()=>{ const a=rnd(4,40)*5, p=pick([10,15,20,25,30,40,-10,-20,-25]); const b=a*(100+p)/100;
    return [`A price changes from $${a} to $${N2(b)}. What is the percent change?`,[`Change = ${N2(b)} − ${a} = ${N2(b-a)}.`,`Divide by the original: ${N2(b-a)}/${a} = ${N2((b-a)/a)}.`,`<b>${p>0?"+":""}${p}%</b>`]]; },
  sexp:()=>pick([["A researcher assigns 60 volunteers at random to a new diet or the usual diet. Experiment or observational study?",["The researcher assigns the treatment.","Random assignment lets you conclude cause and effect.","<b>Experiment</b>"]],["A survey asks 500 adults how much they sleep and how much coffee they drink. Experiment or observational study?",["Nothing is assigned; data are only recorded.","You can show association, not causation.","<b>Observational study</b>"]],["A school compares grades of students who chose to join tutoring with those who did not. Can it conclude tutoring causes higher grades?",["Students chose their own group, so there is no random assignment.","Motivation could be a confounding variable.","<b>No: observational study, association only</b>"]],["Plants are randomly given fertilizer A or B and growth is measured. What is the treatment and the response?",["Treatment = what is assigned.","Response = what is measured.","<b>Treatment: fertilizer type; response: growth</b>"]]]),
  sdis:()=>{ const d=Array.from({length:9},()=>rnd(1,50)).sort((a,b)=>a-b); const q1=(d[1]+d[2])/2,q3=(d[6]+d[7])/2, iqr=q3-q1;
    return [`Data: ${d.join(", ")}. Give the five-number summary for a box plot. Are there outliers?`,[`Min ${d[0]}, Q1 ${q1}, median ${d[4]}, Q3 ${q3}, max ${d[8]}.`,`IQR = ${iqr}; fences: ${q1} − 1.5(${iqr}) = ${num(q1-1.5*iqr)} and ${q3} + 1.5(${iqr}) = ${num(q3+1.5*iqr)}.`,`<b>${d.filter(v=>v<q1-1.5*iqr||v>q3+1.5*iqr).join(", ")||"No outliers"}</b>`]]; },
  ssamp:()=>{ const n=pick([100,225,400,625,900,1600,2500]), p=rnd(30,70); const m=Math.round(1000/Math.sqrt(n))/10;
    return [`A random sample of ${n} people finds ${p}% support a plan. Estimate the margin of error and give the interval.`,[`Margin of error ≈ 1/√n = 1/√${n} = 1/${Math.sqrt(n)} ≈ ${m}%.`,`Interval: ${p} − ${m} to ${p} + ${m}.`,`<b>about ${N2(p-m)}% to ${N2(p+m)}%</b>`]]; },
  stwo:()=>{ const a=rnd(10,40),b=rnd(10,40),c=rnd(10,40),d=rnd(10,40); return [`Two-way table: Group A: ${a} yes, ${b} no. Group B: ${c} yes, ${d} no. Find P(yes | Group A) and P(Group A | yes).`,[`P(yes | A) = ${a}/${a+b}.`,`P(A | yes) = ${a}/${a+c}.`,`<b>${N2(a/(a+b))} and ${N2(a/(a+c))}</b>`]]; }}
};
const N2=v=>{ const r=Math.round(v*100)/100; return num(r); };
const A2MAP={
 quad:{std:["Solving by factoring","Quadratic formula"],disc:["Discriminant","Discriminant with a parameter"],sqr:["Completing the square"],gcf0:["Solving by factoring"],fac:["Solving by factoring"],cts:["Completing the square"],qf:["Quadratic formula"],chk:["Quadratic formula","Solving by factoring"]},
 sys:{form:["Systems in three variables"],el3:["Systems in three variables"],gauss:["Systems in three variables"],cr3:["Systems in three variables"],nls:["Line–parabola systems","Line–circle systems"],nle:["Line–circle systems"],cls:["Systems in three variables"],p2:["Discriminant with a parameter"]},
 zer:{cnt:["Finding all zeros","Zeros & multiplicity"],zp:["Zeros & multiplicity"],fz:["Factoring: quadratic form","Factoring by grouping"],giv:["Synthetic division","Factor theorem"],rrt:["Rational Root Theorem","Finding all zeros"],fin:["Finding all zeros"],apx:["Finding all zeros"]},
 rat:{res:["Rational equations"],crs:["Rational equations"],lcd:["Rational equations"],ineq:["Rational inequalities"],rck:["Rational equations"]},
 rad:{iso:["Radical equations"],sq1:["Radical equations"],sq2:["Radical equations"],cub:["Rational exponents"],rex:["Rational exponents"],xck:["Radical equations"]},
 exp:{isx:["Exponential equations (logs)","Growth & decay models"],same:["Exponential equations (same base)"],tlog:["Exponential equations (logs)"],qfe:["Exponential equations (logs)"],one:["Log equations"],cond:["Log equations","Log properties"],dom:["Log equations"]},
 cnt:{fcp:["Permutations & combinations"],perm:["Permutations & combinations"],rep:["Permutations & combinations"],comb:["Permutations & combinations"],idn:["Permutations & combinations"],prob:["Probability","Binomial probability"]},
 seq:{ss:["Arithmetic sequences","Geometric sequences","Infinite geometric series"],ar:["Arithmetic sequences"],ge:["Geometric sequences"],rc:["Recursive formulas"],as:["Arithmetic sequences"],gs:["Geometric sequences"],is:["Infinite geometric series"],sg:["Sigma notation"],ck8:["Infinite geometric series"],ot:["Recursive formulas"]},
 sta:{sprb:["Probability"],scond:["Probability"],ssct:["Slope","Line through two points"],sans:["Probability","Expected value"]},
 mtx:{msys:["Systems in three variables"],mchk:["Systems in three variables"]}
};
function a2pool(flow,k){ const out=[]; const L=LGEN[flow]&&LGEN[flow][k]; if(L) out.push(()=>L());
  const T=(A2MAP[flow]||{})[k]; if(T&&window.A2GEN){ for(const L2 of Object.values(A2GEN.GEN)) for(const g of L2) if(T.includes(g[0])) out.push(()=>{ const p=g[1](); return {q:p.q,a:p.a}; }); }
  return out; }
function freshEx(flow,k){ const F=FLOWS[flow], m=F&&F.M[k]; if(flow==="factor"&&m&&m.gen) return [m.gen(),m.gen()];
  const pool=a2pool(flow,k); if(!pool.length) return null; const out=[], seen=new Set(); let t=0;
  while(out.length<2&&t++<40){ try{ const r=pick(pool)(); const key=JSON.stringify(r).slice(0,300); if(seen.has(key)) continue; seen.add(key); out.push(r); }catch(e){} } return out.length?out:null; }
const fmtA=s=>window.A2PRACTICE?A2PRACTICE.fmt(s):s;
function exCard(r,i){ if(Array.isArray(r)){ const [q,st]=r; return `<div class="mf-ex"><div class="fx-k">New example ${i+1}</div><p class="mf-eq">${q}</p><ol>${st.map(x=>`<li>${x}</li>`).join("")}</ol></div>`; }
  return `<div class="mf-ex"><div class="fx-k">New example ${i+1}</div><p class="mf-eq">${fmtA(r.q)}</p><div class="mf-sol">${fmtA(r.a)}</div></div>`; }
const hasFresh=(flow,k)=>{ const F=FLOWS[flow], m=F&&F.M[k]; return !!((flow==="factor"&&m&&m.gen)||a2pool(flow,k).length); };
const fv=()=>`<i class="mf-v" aria-hidden="true"></i>`;
const FLOWS={};
function flowHTML(id,F){ FLOWS[id]=F;
  const col=C=>C.g?`<div class="mf-col mf-gc">${fv()}<div class="mf-g" style="--c:${C.c}"><b>${C.g}</b><span>${C.s}</span></div><div class="mf-br" style="--n:${C.cols.length};grid-template-columns:repeat(${C.cols.length},minmax(0,1fr))">${C.cols.map(col).join("")}</div><i class="mf-v mf-fill" aria-hidden="true"></i></div>`
    :`<div class="mf-col">${fv()}<div class="mf-l" style="--c:${C[2]}"><b>${C[0]}</b><span>${C[1]}</span></div>${C[3].map(k=>fv()+fn(k)).join("")}<i class="mf-v mf-fill" aria-hidden="true"></i></div>`;
  const fn=k=>{ const m=F.M[k]; return `<button type="button" class="mf-n" data-fm="${k}" style="--c:${m.c}"><b>${m.name}</b><span>${m.hint}</span></button>`; };
  return `<div class="fx-lead"><p>${F.lead}</p></div>
<div class="mf" lang="en" data-flow="${id}" role="group" aria-label="${F.label}">
 <div class="mf-s">${F.start}</div>${fv()}
 ${F.top.map(k=>fn(k)+fv()).join("")}
 <div class="mf-q">${F.q}</div>
 <div class="mf-br${F.cols[0].g?" grp":""}" style="--n:${F.cols.length};grid-template-columns:repeat(${F.cols.length},minmax(0,1fr))">${F.cols.map(C=>col(C)).join("")}</div>
 ${fv()}${fn(F.end)}
</div>
<div class="mf-d" aria-live="polite"></div>`; }
function mfDetail(m,flow,k){
  return `<div class="mf-dc" style="--c:${m.c}"><div class="mf-dk">${m.grp}</div><h4>${m.name}</h4><p class="mf-when"><b>When:</b> ${m.when}</p><p class="mf-rule">${m.rule}</p>${m.why?`<p class="mf-why"><b>Why this method:</b> ${m.why}</p>`:""}
   <div class="mf-exs">${m.ex.map(([q,st],i)=>`<div class="mf-ex"><div class="fx-k">Example ${i+1}</div><p class="mf-eq">${q}</p><ol>${st.map(s=>`<li>${s}</li>`).join("")}</ol></div>`).join("")}</div>
   ${m.tip?`<p class="mf-tip"><b>⚠ Watch out:</b> ${m.tip}</p>`:""}
   ${hasFresh(flow,k)?`<button type="button" class="fx-go" data-mgen="1">↻ New examples</button>`:""}${m.go?`<button type="button" class="fx-go" data-mjump="${m.go}">Full method, more examples & practice →</button>`:""}${m.open?`<button type="button" class="fx-go" data-mopen="${m.open[0]}">${m.open[1]} →</button>`:""}</div>`; }
function bindFlow(root){ root.querySelectorAll(".mf").forEach(mf=>{ if(mf.dataset.bound) return; mf.dataset.bound=1; const d=mf.nextElementSibling, F=FLOWS[mf.dataset.flow]; if(!F) return;
  const pickK=(k,scroll)=>{ mf.querySelectorAll(".mf-n").forEach(b=>b.classList.toggle("on",b.dataset.fm===k)); d.dataset.k=k; d.innerHTML=mfDetail(F.M[k],mf.dataset.flow,k); if(scroll) d.scrollIntoView({behavior:"smooth",block:"nearest"}); };
  mf.querySelectorAll(".mf-n").forEach(b=>b.onclick=()=>pickK(b.dataset.fm,true)); pickK(F.top[0],false);
  d.addEventListener("click",e=>{ const g=e.target.closest("[data-mgen]"); if(g){ const ex=freshEx(mf.dataset.flow,d.dataset.k); if(ex){ d.querySelector(".mf-exs").innerHTML=ex.map(exCard).join(""); } return; } const o=e.target.closest("[data-mopen]"); if(o){ location.hash=o.dataset.mopen; return; }
    const j=e.target.closest("[data-mjump]"); if(!j) return; const sec=mf.closest("section.unit"), node=sec&&sec.querySelector(`.pm-node[data-pk="${j.dataset.mjump.replace(/^sub-[^-]+-/,"")}"]`);
    if(node) node.click(); const t=document.getElementById(j.dataset.mjump); if(!t) return; if(t.tagName==="DETAILS") t.open=true; setTimeout(()=>window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-130,behavior:"smooth"}),40); }); }); }
Object.keys(FGEN).forEach(k=>{ if(FM[k]) FM[k].gen=FGEN[k]; });
const START=flowHTML("factor",{M:FM,label:"Factoring method flowchart",lead:"Follow the arrows from the top. Tap any method to see its rule and solved examples below the chart.",start:"Factor P(x)",top:["gcf"],q:"How many terms?",
  cols:[["2 terms","Binomial",ORG,["dos","soc","doc"]],["3 terms","Trinomial",RED,["pst","sp","cross","qf"]],["4 terms","Polynomial",PURP,["grp"]],["Degree 3+","None of these work?",TEAL,["ruf"]]],end:"chk"});

/* ---------- quadratic equations flowchart (Units 2 and 3) ---------- */
const SQ=s=>`√${s}`, FR=(n,d)=>`<span class="frc"><span>${n}</span><span>${d}</span></span>`, GRN="#137333";
const QM={
 std:{grp:"Always first",c:NAVY,name:"Write in Standard Form",hint:"ax² + bx + c = 0",
  when:"Every time, before you choose a method.",
  rule:"Move every term to one side so the other side is 0, and combine like terms. If a is negative, multiply everything by −1. Divide out any common factor.",
  ex:[["2x"+S2+" = 8x − 6",["Subtract 8x and add 6: 2x"+S2+" − 8x + 6 = 0.","Divide every term by 2: <b>x"+S2+" − 4x + 3 = 0</b>"]],
      ["(x + 2)"+S2+" = 3x + 10",["Expand: x"+S2+" + 4x + 4 = 3x + 10.","Move everything left: <b>x"+S2+" + x − 6 = 0</b>"]]]},
 disc:{grp:"Look first",c:"#444",name:"Check the Discriminant",hint:"D = b² − 4ac",
  when:"Before choosing, if you're not sure the quadratic factors.",
  rule:"D = b"+S2+" − 4ac. <b>D a perfect square</b> → 2 rational roots, so factor. <b>D &gt; 0, not a square</b> → 2 irrational roots, use the formula. <b>D = 0</b> → 1 double root. <b>D &lt; 0</b> → 2 complex roots.",
  ex:[["x"+S2+" + x − 6 = 0",["D = 1"+S2+" − 4(1)(−6) = 1 + 24 = 25 = 5"+S2+".","A perfect square, so it factors: <b>(x + 3)(x − 2) = 0</b>."]],
      ["x"+S2+" − 4x + 13 = 0",["D = 16 − 52 = −36 &lt; 0, so the roots are complex.","Formula: x = "+FR("4 ± 6i","2")+" = <b>2 ± 3i</b>"]]]},
 sqr:{grp:"No x term (b = 0)",c:ORG,name:"Square Root Method",hint:"x² = k → x = ±√k",
  when:"There is no x term, or the equation looks like (x − h)"+S2+" = k.",
  rule:"Isolate the square, then take the square root of both sides. Don't forget the ±. A negative number under the root gives ±i.",
  ex:[["3x"+S2+" − 48 = 0",["3x"+S2+" = 48, so x"+S2+" = 16.","<b>x = ±4</b>"]],
      ["(x − 1)"+S2+" + 9 = 0",["(x − 1)"+S2+" = −9, so x − 1 = ±3i.","<b>x = 1 ± 3i</b>"]]],
  tip:"√(x"+S2+") is |x|, so you need both answers: x = 4 and x = −4."},
 gcf0:{grp:"No constant (c = 0)",c:PURP,name:"Factor Out x",hint:"x(ax + b) = 0",
  when:"There is no constant term.",
  rule:"Factor out the GCF, which includes x. Then set each factor equal to 0. One answer is always x = 0.",
  ex:[["5x"+S2+" − 20x = 0",["5x(x − 4) = 0","<b>x = 0</b> or <b>x = 4</b>"]],
      ["3x"+S2+" + 7x = 0",["x(3x + 7) = 0","<b>x = 0</b> or <b>x = −"+FR(7,3)+"</b>"]]],
  tip:"Never divide both sides by x. You'd lose the solution x = 0."},
 fac:{grp:"It factors",c:RED,name:"Factor + Zero Product",hint:"(x − p)(x − q) = 0",
  when:"The quadratic factors over the integers (D is a perfect square).",
  rule:"Factor the quadratic (product & sum when a = 1, the cross table when a ≠ 1). Then set each factor equal to 0.",
  ex:[["x"+S2+" + x − 6 = 0",["(x + 3)(x − 2) = 0","<b>x = −3</b> or <b>x = 2</b>"]],
      ["6x"+S2+" + x − 2 = 0",["Cross table: (3x + 2)(2x − 1) = 0","<b>x = −"+FR(2,3)+"</b> or <b>x = "+FR(1,2)+"</b>"]]],
  open:["factor","Open the Factoring folder"]},
 cts:{grp:"a = 1, b even",c:TEAL,name:"Completing the Square",hint:"add (b/2)² to both sides",
  when:"a = 1 and b is even, or when you also need vertex form.",
  rule:"Move c to the right side. Add (b/2)"+S2+" to both sides. Write the left side as (x + b/2)"+S2+", then use the square root method.",
  ex:[["x"+S2+" + 6x − 7 = 0",["x"+S2+" + 6x = 7. Add (6/2)"+S2+" = 9: x"+S2+" + 6x + 9 = 16.","(x + 3)"+S2+" = 16, so x + 3 = ±4.","<b>x = 1</b> or <b>x = −7</b>"]],
      ["x"+S2+" − 4x − 1 = 0",["x"+S2+" − 4x = 1. Add 4: (x − 2)"+S2+" = 5.","<b>x = 2 ± "+SQ(5)+"</b>"]]]},
 qf:{grp:"Anything else",c:"#1f4fd1",name:"Quadratic Formula",hint:"always works",
  when:"Any quadratic, especially when it doesn't factor.",
  rule:"x = "+FR("−b ± √(b"+S2+" − 4ac)","2a")+". Find a, b and c from standard form first, and watch the signs.",
  ex:[["2x"+S2+" + 3x − 4 = 0",["a = 2, b = 3, c = −4. D = 9 + 32 = 41.","<b>x = "+FR("−3 ± "+SQ(41),"4")+"</b>"]],
      ["x"+S2+" − 2x + 5 = 0",["D = 4 − 20 = −16, so √D = 4i.","x = "+FR("2 ± 4i","2")+" = <b>1 ± 2i</b>"]]]},
 chk:{grp:"Last step",c:GRN,name:"Check & Write Solutions",hint:"substitute back, simplify",
  when:"Every time, at the end.",
  rule:"Substitute each answer into the original equation. Simplify radicals, and remember complex roots come in conjugate pairs (a ± bi).",
  ex:[["x = 2 in x"+S2+" + x − 6 = 0",["4 + 2 − 6 = 0 ✓"]],
      ["x = 1 + 2i in x"+S2+" − 2x + 5 = 0",["(1 + 2i)"+S2+" = 1 + 4i − 4 = −3 + 4i","−3 + 4i − 2 − 4i + 5 = 0 ✓"]]]}
};
const QFLOW=()=>flowHTML("quad",{M:QM,label:"Solving quadratics flowchart",lead:"How to choose a method for solving a quadratic equation. Follow the arrows from the top, and tap any method to see its rule and solved examples.",start:"Solve the quadratic",top:["std","disc"],q:"What does it look like?",
  cols:[["b = 0","no x term",ORG,["sqr"]],["c = 0","no constant",PURP,["gcf0"]],["It factors","D is a square",RED,["fac"]],["a = 1, b even","",TEAL,["cts"]],["Anything else","",'#1f4fd1',["qf"]]],end:"chk"});

/* ---------- more method flowcharts: systems, units 4, 5, 6, 7, 10 ---------- */
const BLU="#1f4fd1", T=(...r)=>r;  // T(q, steps) helper
const mat=rows=>`<span class="mx" style="--n:${(rows[0]||[]).length}">${rows.flat().map(v=>`<i>${v}</i>`).join("")}</span>`;
const SM={
 form:{grp:"Always first",c:NAVY,name:"Line Up the Variables",hint:"ax + by (+ cz) = d",
  when:"Before choosing any method.",
  rule:"Write every equation with the variables in the same order on the left and the constant on the right. Then count the equations and the unknowns.",
  why:"Lined-up coefficients show at a glance which method will be fastest.",
  ex:[T("y = 3 − 2x and 4x = 5y + 1",["2x + y = 3","4x − 5y = 1"]),T("z = x + y − 1, 2y = 4 − x, x + z = 3",["x + y − z = 1","x + 2y = 4","x + z = 3. Now it's clearly a 3 × 3 system."])]},
 graph:{grp:"2 × 2 linear",c:ORG,name:"Graphing",hint:"see where the lines cross",
  when:"You want a picture, or an estimate, or you need to see how many solutions there are.",
  rule:"Write both in y = mx + b form and graph. The intersection point is the solution.",
  why:"It shows the number of solutions instantly (cross, parallel or the same line), but the answer is only as exact as your graph.",
  ex:[T("y = 2x − 1 and y = −x + 5",["The lines cross at (2, 3).","Check: 2(2) − 1 = 3 ✓ and −2 + 5 = 3 ✓"]),T("y = x + 1 and y = x − 2",["Same slope, different intercepts: parallel lines.","<b>No solution</b>"])]},
 sub:{grp:"2 × 2 linear",c:ORG,name:"Substitution",hint:"a variable is already alone",
  when:"One variable has coefficient 1 or −1, or is already isolated.",
  rule:"Solve one equation for that variable, substitute into the other, solve, then back-substitute.",
  why:"Isolating a variable with coefficient 1 creates no fractions, so the algebra stays clean.",
  ex:[T("y = 3x − 2 and 2x + y = 8",["2x + (3x − 2) = 8, so 5x = 10 and x = 2.","y = 3(2) − 2 = 4. <b>(2, 4)</b>"]),T("x − 2y = 1 and 3x + y = 10",["x = 1 + 2y, so 3(1 + 2y) + y = 10 and 7y = 7.","y = 1 and x = 3. <b>(3, 1)</b>"])]},
 elim:{grp:"2 × 2 linear",c:ORG,name:"Elimination",hint:"add or subtract equations",
  when:"The coefficients of one variable are equal, opposite, or easy to match.",
  rule:"Multiply one or both equations so one variable has opposite coefficients, then add the equations.",
  why:"No variable has coefficient 1 here, so substitution would bring fractions. Elimination keeps whole numbers.",
  ex:[T("3x + 2y = 12 and 5x − 2y = 4",["Add: 8x = 16, so x = 2.","3(2) + 2y = 12, so y = 3. <b>(2, 3)</b>"]),T("2x + 3y = 7 and 3x + 4y = 10",["×3 and ×2: 6x + 9y = 21 and 6x + 8y = 20.","Subtract: y = 1, then x = 2. <b>(2, 1)</b>"])]},
 cr2:{grp:"2 × 2 linear",c:ORG,name:"Cramer's Rule (2 × 2)",hint:"x = Dₓ / D",
  when:"The numbers are messy, you need just one variable, or the system has a parameter.",
  rule:"D = a₁b₂ − a₂b₁, Dₓ = c₁b₂ − c₂b₁, D<sub>y</sub> = a₁c₂ − a₂c₁. If D ≠ 0, then x = Dₓ/D and y = D<sub>y</sub>/D.",
  why:"It's a formula: no choices to make, and D tells you immediately whether there is exactly one solution.",
  ex:[T("2x + 3y = 7 and 3x + 4y = 10",["D = 8 − 9 = −1, Dₓ = 28 − 30 = −2, D<sub>y</sub> = 20 − 21 = −1.","x = 2 and y = 1. <b>(2, 1)</b>"]),T("4x − y = 5 and x + 2y = 8",["D = 8 + 1 = 9, Dₓ = 10 + 8 = 18, D<sub>y</sub> = 32 − 5 = 27.","x = 2 and y = 3. <b>(2, 3)</b>"])]},
 inv:{grp:"2 × 2 linear",c:ORG,name:"Inverse Matrix",hint:"X = A⁻¹B",
  when:"You have a calculator, or several systems share the same coefficients.",
  rule:"Write AX = B. If det A ≠ 0, then X = A⁻¹B. For 2 × 2: A⁻¹ = (1/det) · [d −b; −c a].",
  why:"Once you have A⁻¹, every new right side B is solved with one multiplication.",
  ex:[T("2x + y = 5 and x + y = 3",["A = "+mat([[2,1],[1,1]])+", det = 1, A⁻¹ = "+mat([[1,"−1"],["−1",2]])+".","x = 5 − 3 = 2 and y = −5 + 6 = 1. <b>(2, 1)</b>"]),T("Same A, new right side: 2x + y = 7 and x + y = 4",["Reuse A⁻¹: x = 7 − 4 = 3 and y = −7 + 8 = 1.","<b>(3, 1)</b>, with no new work on A."])]},
 el3:{grp:"3 × 3 linear",c:RED,name:"Elimination (3 × 3)",hint:"reduce to a 2 × 2",
  when:"Solving by hand, especially when one variable cancels easily.",
  rule:"Use two different pairs of equations to eliminate the same variable. That leaves a 2 × 2 system. Solve it, then back-substitute.",
  why:"It turns a hard 3 × 3 problem into a 2 × 2 problem you already know how to solve.",
  ex:[T("x + y + z = 6, 2x − y + z = 3, x + 2y − z = 2",["Eq 1 + Eq 3: 2x + 3y = 8. Eq 2 + Eq 3: 3x + y = 5.","From these: x = 1 and y = 2, then z = 3. <b>(1, 2, 3)</b>"]),T("x + y + z = 2, x − y + z = 0, 3x + y − 2z = 4",["Eq 1 − Eq 2: 2y = 2, so y = 1.","x + z = 1 and 3x − 2z = 3 give x = 1 and z = 0. <b>(1, 1, 0)</b>"])]},
 gauss:{grp:"3 × 3 linear",c:RED,name:"Gaussian Elimination",hint:"row-reduce the augmented matrix",
  when:"Any 3 × 3 system, and the best way to classify one with no or infinitely many solutions.",
  rule:"Write the augmented matrix [A | B]. Use row operations to get zeros below the diagonal, then back-substitute. A row 0 0 0 | k with k ≠ 0 means no solution. A row of all zeros means infinitely many.",
  why:"It's systematic and always works, and the last row tells you the type of system.",
  ex:[T("x + y + z = 6, 2x − y + z = 3, x + 2y − z = 2",["R₂ − 2R₁ → [0 −3 −1 | −9], R₃ − R₁ → [0 1 −2 | −4]. Swap them.","R₃ + 3R₂ → [0 0 −7 | −21], so z = 3, y = 2, x = 1. <b>(1, 2, 3)</b>"]),T("x + y + z = 3, 2x + y − z = 2, 3x + 2y = 5",["Eq 3 = Eq 1 + Eq 2, so one row becomes 0 0 0 | 0.","Infinitely many: <b>(−1 + 2t, 4 − 3t, t)</b>"])]},
 cr3:{grp:"3 × 3 linear",c:RED,name:"Cramer's Rule (3 × 3)",hint:"z = D<sub>z</sub> / D",
  when:"You need only one variable, or the system has a parameter.",
  rule:"Find D, the determinant of the coefficients. Replace a column with the constants to get Dₓ, D<sub>y</sub> or D<sub>z</sub>. If D ≠ 0, each variable is its determinant ÷ D.",
  why:"To find just z, you need only two determinants instead of solving the whole system.",
  ex:[T("x + y + z = 6, 2x − y + z = 3, x + 2y − z = 2. Find z.",["D = 1(1 − 2) − 1(−2 − 1) + 1(4 + 1) = 7.","D<sub>z</sub> = 21, so <b>z = 3</b>."]),T("x + y + z = 3, 2x + y − z = 2, 3x + 2y = 5",["D = 2 − 3 + 1 = 0.","D = 0: no unique solution. Use Gauss to decide between none and infinitely many."])]},
 p2:{grp:"With a parameter",c:PURP,name:"Parameter Discussion (2 × 2)",hint:"D ≠ 0? D = 0?",
  when:"The coefficients contain a letter such as k or m, and you must say how the solutions depend on it.",
  rule:"<b>D ≠ 0</b> → exactly one solution x = Dₓ/D, y = D<sub>y</sub>/D. <b>D = 0</b> and Dₓ = D<sub>y</sub> = 0 → infinitely many. <b>D = 0</b> and Dₓ or D<sub>y</sub> ≠ 0 → no solution.",
  why:"Elimination would make you divide by an expression in k that might be 0. D shows exactly which values of k are special.",
  ex:[T("kx + y = 2 and 4x + ky = 4",["D = k"+S2+" − 4, Dₓ = 2k − 4, D<sub>y</sub> = 4k − 8.","<b>k ≠ ±2</b>: one solution x = "+FR(2,"k + 2")+", y = "+FR(4,"k + 2")+".","<b>k = 2</b>: D = Dₓ = D<sub>y</sub> = 0, the same line, infinitely many.","<b>k = −2</b>: D = 0 but Dₓ = −8, parallel lines, no solution."]),
      T("x + 2y = 3 and 2x + 4y = k",["D = 4 − 4 = 0 for every k.","<b>k = 6</b>: the same line, infinitely many. <b>k ≠ 6</b>: no solution."])]},
 p3:{grp:"With a parameter",c:PURP,name:"Parameter Discussion (3 × 3)",hint:"D, then Gauss",
  when:"A 3 × 3 system with a parameter.",
  rule:"Find D as an expression in the parameter. Where D ≠ 0 there is exactly one solution. For each value that makes D = 0, substitute it and use Gauss to decide: no solution or infinitely many.",
  why:"D finds the special values in one step. Gauss is the reliable way to classify each special case.",
  ex:[T("x + y + z = 1, x + 2y + 3z = 2, x + 3y + az = b",["Gauss: R₂ − R₁ → y + 2z = 1. R₃ − R₁ → 2y + (a − 1)z = b − 1. Then subtract 2R₂: (a − 5)z = b − 3.","<b>a ≠ 5</b>: one solution. <b>a = 5, b = 3</b>: 0 = 0, infinitely many. <b>a = 5, b ≠ 3</b>: no solution."]),
      T("x + y + kz = 1, x + ky + z = 1, kx + y + z = 1",["D = −(k − 1)"+S2+"(k + 2).","<b>k ≠ 1, −2</b>: one solution, x = y = z = "+FR(1,"k + 2")+".","<b>k = 1</b>: all three are x + y + z = 1, infinitely many.","<b>k = −2</b>: add all three equations: 0 = 3, no solution."])]},
 nls:{grp:"Nonlinear",c:TEAL,name:"Substitution (Nonlinear)",hint:"line + curve",
  when:"One equation is linear, or one variable is easy to isolate.",
  rule:"Solve the linear equation for one variable and substitute into the other. You get a quadratic. Each root gives a point.",
  why:"Substitution turns the system into one quadratic, which you know how to solve.",
  ex:[T("y = x"+S2+" − 1 and y = x + 1",["x"+S2+" − 1 = x + 1, so x"+S2+" − x − 2 = 0, giving x = 2 or −1.","<b>(2, 3) and (−1, 0)</b>"]),T("x"+S2+" + y"+S2+" = 25 and y = x + 1",["x"+S2+" + (x + 1)"+S2+" = 25, so x"+S2+" + x − 12 = 0, giving x = 3 or −4.","<b>(3, 4) and (−4, −3)</b>"])]},
 nle:{grp:"Nonlinear",c:TEAL,name:"Elimination (Nonlinear)",hint:"two conics with x², y²",
  when:"Both equations have x"+S2+" and y"+S2+" terms (two conics).",
  rule:"Add or subtract the equations to eliminate x"+S2+" or y"+S2+". Solve, and remember the ± for each square root.",
  why:"Substitution would create square roots. Eliminating a whole x"+S2+" or y"+S2+" term is much cleaner.",
  ex:[T("x"+S2+" + y"+S2+" = 13 and x"+S2+" − y"+S2+" = 5",["Add: 2x"+S2+" = 18, so x = ±3. Then y"+S2+" = 4, so y = ±2.","<b>Four points: (±3, ±2)</b>"]),T("x"+S2+" + y"+S2+" = 10 and x"+S2+" + 2y"+S2+" = 19",["Subtract: y"+S2+" = 9, so y = ±3, and x"+S2+" = 1, so x = ±1.","<b>Four points: (±1, ±3)</b>"])]},
 cls:{grp:"Last step",c:GRN,name:"Check & Classify",hint:"one, none or infinitely many",
  when:"Every time, at the end.",
  rule:"Substitute into <b>every</b> original equation. <b>One solution</b>: consistent and independent. <b>0 = k (k ≠ 0)</b>: inconsistent, no solution. <b>0 = 0</b>: dependent, infinitely many, written in terms of a parameter t.",
  why:"A point that works in only some of the equations is not a solution.",
  ex:[T("x + y = 2 and x + y = 5",["Subtract: 0 = 3.","<b>No solution</b> (parallel lines)."]),T("2x + 4y = 6 and x + 2y = 3",["Eq 1 − 2·Eq 2: 0 = 0.","<b>Infinitely many</b>: (3 − 2t, t)."])]}
};
const SYS=()=>flowHTML("sys",{M:SM,label:"Systems method flowchart",lead:"Which method to use for a system, and why. Follow the arrows from the top and tap any method: each card explains when to use it and why it's the best choice there.",start:"Solve the system",top:["form"],q:"What kind of system?",
  cols:[["2 × 2 linear","two lines",ORG,["graph","sub","elim","cr2","inv"]],["3 × 3 linear","three planes",RED,["el3","gauss","cr3"]],["With a parameter","k, m, a…",PURP,["p2","p3"]],["Nonlinear","curves",TEAL,["nls","nle"]]],end:"cls"});

const ZM={
 cnt:{grp:"Always first",c:NAVY,name:"Count the Zeros",hint:"degree n → n zeros",
  when:"Before you start.",rule:"A polynomial of degree n has exactly n complex zeros, counting multiplicity (Fundamental Theorem of Algebra). Descartes' Rule of Signs tells how many can be positive or negative.",
  ex:[T("P(x) = x"+S3+" − 4x"+S2+" + x + 6",["Degree 3: 3 zeros in all.","Signs + − + +: 2 changes, so 2 or 0 positive zeros."]),T("P(x) = x"+S4+" + 1",["Degree 4: 4 zeros.","No sign changes in P(x) or P(−x): no real zeros, so all 4 are complex."])]},
 zp:{grp:"Already factored",c:ORG,name:"Zero Product & Multiplicity",hint:"set each factor = 0",
  when:"P(x) is already written as a product.",rule:"Set each factor equal to 0. The exponent of a factor is the multiplicity: odd → the graph crosses, even → it touches and turns.",
  ex:[T("P(x) = x(x − 2)"+S2+"(x + 3)",["<b>x = 0</b> (crosses), <b>x = 2</b> multiplicity 2 (touches), <b>x = −3</b> (crosses)."]),T("P(x) = (2x − 1)"+S3+"(x + 4)",["<b>x = "+FR(1,2)+"</b> multiplicity 3 (crosses and flattens), <b>x = −4</b>."])]},
 fz:{grp:"Factorable",c:RED,name:"GCF, Grouping, Quadratic Form",hint:"factor first",
  when:"There's a GCF, four terms that group, or a pattern like x"+S4+" + bx"+S2+" + c.",rule:"Factor completely, then use the zero product property.",open:["factor","Open the Factoring folder"],
  ex:[T("x"+S3+" − 2x"+S2+" − 9x + 18 = 0",["Grouping: x"+S2+"(x − 2) − 9(x − 2) = (x − 2)(x − 3)(x + 3).","<b>x = 2, 3, −3</b>"]),T("x"+S4+" − 13x"+S2+" + 36 = 0",["u = x"+S2+": (u − 4)(u − 9) = 0, so (x"+S2+" − 4)(x"+S2+" − 9) = 0.","<b>x = ±2, ±3</b>"])]},
 giv:{grp:"One zero given",c:PURP,name:"Divide by the Known Factor",hint:"Factor Theorem + Ruffini",
  when:"You're given one zero or one factor.",rule:"If c is a zero, then (x − c) is a factor. Divide with Ruffini's rule. If the given zero is complex, its conjugate is a zero too.",
  ex:[T("x"+S3+" − 4x"+S2+" + x + 6, given x = 2",["Ruffini with 2: 1, −2, −3 | 0.","x"+S2+" − 2x − 3 = (x − 3)(x + 1). <b>Zeros: 2, 3, −1</b>"]),T("x"+S3+" − x"+S2+" + 4x − 4, given 2i",["−2i is a zero too, so (x − 2i)(x + 2i) = x"+S2+" + 4 is a factor.","P(x) = (x"+S2+" + 4)(x − 1). <b>Zeros: ±2i, 1</b>"])]},
 rrt:{grp:"Nothing given",c:TEAL,name:"Rational Root Theorem + Ruffini",hint:"test ±p/q",
  when:"Nothing is given and nothing factors easily.",rule:"Candidates are ±p/q, where p divides the constant and q divides the leading coefficient. Test them; when P(r) = 0, divide with Ruffini and repeat on the quotient.",go:"sub-factor-ruf",
  ex:[T("2x"+S3+" − 3x"+S2+" − 11x + 6",["Candidates: ±1, ±2, ±3, ±6, ±"+FR(1,2)+", ±"+FR(3,2)+". P(3) = 0.","Ruffini: 2x"+S2+" + 3x − 2 = (2x − 1)(x + 2). <b>Zeros: 3, "+FR(1,2)+", −2</b>"]),T("x"+S3+" − 3x"+S2+" + x + 1",["P(1) = 0. Ruffini: x"+S2+" − 2x − 1.","Formula: <b>x = 1, 1 ± √2</b>"])]},
 apx:{grp:"No rational zeros",c:BLU,name:"Graph & Approximate",hint:"Location Principle",
  when:"None of the rational candidates work.",rule:"If P(a) and P(b) have opposite signs, there is a zero between a and b. Narrow the interval, or use a graphing calculator.",
  ex:[T("x"+S3+" − 2x − 5",["P(2) = −1 and P(3) = 16, so there's a zero between 2 and 3.","P(2.09) ≈ −0.05 and P(2.1) ≈ 0.06, so <b>x ≈ 2.09</b>."]),T("x"+S2+" − 3 on [1, 2]",["P(1) = −2 and P(2) = 1: sign change.","The zero is √3 ≈ 1.73."])]},
 fin:{grp:"Last step",c:GRN,name:"Finish & List All Zeros",hint:"quadratic left? use the formula",
  when:"Once you're down to a quadratic.",rule:"Factor it or use the quadratic formula. List all n zeros with their multiplicities. Complex zeros come in conjugate pairs.",
  ex:[T("Quotient x"+S2+" − 2x − 1",["x = "+FR("2 ± √8","2")+" = <b>1 ± √2</b>"]),T("Quotient x"+S2+" + 2x + 5",["x = "+FR("−2 ± √−16","2")+" = <b>−1 ± 2i</b>"])]}
};
const ZER=()=>flowHTML("zer",{M:ZM,label:"Finding zeros flowchart",lead:"How to find all the zeros of a polynomial. Follow the arrows from the top and tap any method for its rule and solved examples.",start:"Find all zeros of P(x)",top:["cnt"],q:"What do you have?",
  cols:[["Factored","",ORG,["zp"]],["Factorable","GCF, grouping",RED,["fz"]],["A zero given","",PURP,["giv"]],["Nothing given","",TEAL,["rrt"]],["No rational zeros","",BLU,["apx"]]],end:"fin"});

const RM={
 res:{grp:"Always first",c:NAVY,name:"Find the Restrictions",hint:"denominator ≠ 0",
  when:"Before you solve.",rule:"Factor every denominator and write down the x-values that make any of them 0. Those values can never be solutions.",
  ex:[T(FR("3","x − 2")+" + "+FR("x","x"+S2+" − 9")+" = 1",["x − 2 ≠ 0 and (x − 3)(x + 3) ≠ 0.","<b>x ≠ 2, 3, −3</b>"]),T(FR("1","x")+" = "+FR("4","x"+S2+" + 2x"),["x"+S2+" + 2x = x(x + 2).","<b>x ≠ 0, −2</b>"])]},
 crs:{grp:"Fraction = fraction",c:ORG,name:"Cross-Multiply",hint:"a/b = c/d → ad = bc",
  when:"Exactly one fraction on each side.",rule:"Multiply each numerator by the other side's denominator, then solve.",
  ex:[T(FR("x + 1","x − 2")+" = "+FR(3,2),["2(x + 1) = 3(x − 2), so 2x + 2 = 3x − 6.","<b>x = 8</b>"]),T(FR("x","x + 3")+" = "+FR(2,"x"),["x"+S2+" = 2x + 6, so x"+S2+" − 2x − 6 = 0.","<b>x = 1 ± √7</b>"])]},
 lcd:{grp:"Several terms",c:RED,name:"Multiply by the LCD",hint:"clear all fractions",
  when:"More than one fraction on a side, or whole-number terms too.",rule:"Multiply every term by the LCD. The fractions cancel and you solve a polynomial equation.",
  ex:[T(FR(1,"x")+" + "+FR(1,"x + 2")+" = "+FR(3,4),["LCD 4x(x + 2): 4(x + 2) + 4x = 3x(x + 2).","3x"+S2+" − 2x − 8 = 0 = (3x + 4)(x − 2). <b>x = 2, −"+FR(4,3)+"</b>"]),T(FR("x","x − 3")+" = "+FR(3,"x − 3")+" + 2",["LCD x − 3: x = 3 + 2(x − 3), so x = 3.","But x ≠ 3! <b>No solution</b> (x = 3 is extraneous)."])],
  tip:"Multiply <b>every</b> term, including whole numbers like the 2 above."},
 ineq:{grp:"Inequality",c:PURP,name:"Sign Chart",hint:"zeros and restrictions",
  when:"A rational inequality like "+FR("p(x)","q(x)")+" ≥ 0.",rule:"Get 0 on one side and a single fraction on the other. Mark the zeros of the numerator and denominator on a number line and test each interval.",
  ex:[T(FR("x − 1","x + 2")+" ≥ 0",["Critical values: 1 (included) and −2 (never included).","<b>x &lt; −2 or x ≥ 1</b>"]),T(FR("x + 3","x − 1")+" &lt; 2",["Subtract 2: "+FR("5 − x","x − 1")+" &lt; 0. Critical values 1 and 5.","<b>x &lt; 1 or x &gt; 5</b>"])],
  tip:"Never multiply both sides by the denominator: you don't know its sign."},
 rck:{grp:"Last step",c:GRN,name:"Check Restrictions",hint:"reject extraneous solutions",
  when:"Every time, at the end.",rule:"Compare each answer with the restrictions. Reject any value that makes a denominator 0, then substitute the rest back.",
  ex:[T("Answers 2 and −"+FR(4,3)+", restrictions x ≠ 0, −2",["Neither is restricted: both are solutions."]),T("Answer 3, restriction x ≠ 3",["3 is extraneous: no solution."])]}
};
const RAT=()=>flowHTML("rat",{M:RM,label:"Rational equations flowchart",lead:"How to solve rational equations and inequalities. Tap any method for its rule and solved examples.",start:"Solve the rational equation",top:["res"],q:"What does it look like?",
  cols:[["Fraction = fraction","",ORG,["crs"]],["Several terms","",RED,["lcd"]],["Inequality","&lt;, ≤, &gt;, ≥",PURP,["ineq"]]],end:"rck"});

const DM={
 iso:{grp:"Always first",c:NAVY,name:"Isolate the Radical",hint:"radical alone on one side",
  when:"Before raising to any power.",rule:"Move every other term to the other side so the radical (or the power) is alone.",
  ex:[T("√(2x − 1) + 2 = 5",["<b>√(2x − 1) = 3</b>"]),T("3∛(x − 2) = 9",["Divide by 3: <b>∛(x − 2) = 3</b>"])],
  tip:"(a + b)"+S2+" ≠ a"+S2+" + b"+S2+". Squaring before isolating creates a mess."},
 sq1:{grp:"One square root",c:ORG,name:"Square Both Sides",hint:"then check!",
  when:"One square root, isolated.",rule:"Square both sides, solve, and check every answer in the original equation.",
  ex:[T("√(x + 3) = x − 3",["x + 3 = x"+S2+" − 6x + 9, so x"+S2+" − 7x + 6 = 0, giving x = 6 or 1.","Check: x = 6 gives 3 = 3 ✓, but x = 1 gives 2 = −2 ✗. <b>x = 6</b>"]),T("√(2x − 1) = 3",["2x − 1 = 9","<b>x = 5</b> ✓"])]},
 sq2:{grp:"Two radicals",c:RED,name:"Isolate, Square Twice",hint:"one radical at a time",
  when:"Two square roots.",rule:"Put one radical on each side, square, isolate the radical that's left, and square again.",
  ex:[T("√(x + 5) − √x = 1",["√(x + 5) = 1 + √x. Square: x + 5 = 1 + 2√x + x.","4 = 2√x, so √x = 2. <b>x = 4</b>, check: 3 − 2 = 1 ✓"]),T("√(x + 7) = √(2x − 1)",["One radical on each side: square once. x + 7 = 2x − 1.","<b>x = 8</b>, check: √15 = √15 ✓"])]},
 cub:{grp:"Odd root",c:PURP,name:"Raise to the nth Power",hint:"∛ → cube both sides",
  when:"A cube root or another odd root.",rule:"Raise both sides to the index. Odd roots can be negative, so you won't get extraneous answers from this step.",
  ex:[T("∛(x − 2) = 3",["x − 2 = 27","<b>x = 29</b>"]),T("∛(2x + 1) = −1",["2x + 1 = −1","<b>x = −1</b>"])]},
 rex:{grp:"Rational exponent",c:TEAL,name:"Raise to the Reciprocal",hint:"x<sup>m/n</sup> → power n/m",
  when:"An equation like x<sup>m/n</sup> = k.",rule:"Raise both sides to the reciprocal power n/m. If m is even, include ±.",
  ex:[T("x<sup>2/3</sup> = 9",["x = ±9<sup>3/2</sup> = ±27","<b>x = ±27</b>"]),T("(x − 1)<sup>3/2</sup> = 8",["x − 1 = 8<sup>2/3</sup> = 4","<b>x = 5</b>"])]},
 xck:{grp:"Last step",c:GRN,name:"Check for Extraneous Solutions",hint:"squaring can add answers",
  when:"Every time you raised to an even power.",rule:"Substitute every answer into the original equation. A square root is never negative, so reject any answer that makes it equal a negative number.",
  ex:[T("√(x + 3) = x − 3 with x = 1",["√4 = 2 but 1 − 3 = −2. <b>Reject.</b>"]),T("√x = −4",["A square root can't be negative: <b>no solution</b>, even though squaring gives x = 16."])]}
};
const RAD=()=>flowHTML("rad",{M:DM,label:"Radical equations flowchart",lead:"How to solve radical equations and equations with rational exponents. Tap any method for its rule and solved examples.",start:"Solve the radical equation",top:["iso"],q:"What kind of radical?",
  cols:[["One √","",ORG,["sq1"]],["Two √","",RED,["sq2"]],["Odd root","∛, ⁵√",PURP,["cub"]],["Power m/n","",TEAL,["rex"]]],end:"xck"});

const EM={
 isx:{grp:"Always first",c:NAVY,name:"Isolate the Exponential or Log",hint:"b<sup>x</sup> or log alone",
  when:"Before using any property.",rule:"Undo the addition and multiplication around b<sup>x</sup> or log(…) first.",
  ex:[T("3 · 2<sup>x</sup> + 1 = 25",["3 · 2<sup>x</sup> = 24, so <b>2<sup>x</sup> = 8</b>"]),T("2 ln x − 1 = 5",["2 ln x = 6, so <b>ln x = 3</b>"])]},
 same:{grp:"Same base possible",c:ORG,name:"Rewrite with the Same Base",hint:"b^m = b^n → m = n",
  when:"Both sides are powers of the same number, like 4, 8 and 16.",rule:"Write both sides as powers of one base, then set the exponents equal.",
  ex:[T("4<sup>x + 1</sup> = 8<sup>x</sup>",["2<sup>2x + 2</sup> = 2<sup>3x</sup>, so 2x + 2 = 3x.","<b>x = 2</b>"]),T("9<sup>x</sup> = "+FR(1,27),["3<sup>2x</sup> = 3<sup>−3</sup>, so 2x = −3.","<b>x = −"+FR(3,2)+"</b>"])]},
 tlog:{grp:"Different bases",c:RED,name:"Take the Log of Both Sides",hint:"bring the exponent down",
  when:"The bases can't be matched.",rule:"Take ln (or log) of both sides, bring the exponent down with the power rule, and solve for x.",
  ex:[T("5<sup>x</sup> = 12",["x ln 5 = ln 12","<b>x = "+FR("ln 12","ln 5")+" ≈ 1.544</b>"]),T("3<sup>x − 1</sup> = 2<sup>x</sup>",["(x − 1) ln 3 = x ln 2, so x(ln 3 − ln 2) = ln 3.","<b>x = "+FR("ln 3","ln 3 − ln 2")+" ≈ 2.709</b>"])]},
 qfe:{grp:"Quadratic form",c:PURP,name:"Substitute u = b<sup>x</sup>",hint:"e<sup>2x</sup>, 4<sup>x</sup> = (2<sup>x</sup>)²",
  when:"You see b<sup>2x</sup> and b<sup>x</sup> in the same equation.",rule:"Let u = b<sup>x</sup>, solve the quadratic in u, then solve b<sup>x</sup> = u. Reject u ≤ 0.",
  ex:[T("e<sup>2x</sup> − 5e<sup>x</sup> + 6 = 0",["(u − 2)(u − 3) = 0, so e<sup>x</sup> = 2 or 3.","<b>x = ln 2 or ln 3</b>"]),T("4<sup>x</sup> − 2<sup>x + 1</sup> − 8 = 0",["u = 2<sup>x</sup>: u"+S2+" − 2u − 8 = (u − 4)(u + 2) = 0.","2<sup>x</sup> = 4 gives <b>x = 2</b>. 2<sup>x</sup> = −2 is impossible."])]},
 one:{grp:"One log",c:TEAL,name:"Rewrite in Exponential Form",hint:"log<sub>b</sub> A = c → A = b<sup>c</sup>",
  when:"A single log equals a number.",rule:"log<sub>b</sub> A = c means A = b<sup>c</sup>.",
  ex:[T("log₂(x + 3) = 4",["x + 3 = 2"+S4+" = 16","<b>x = 13</b>"]),T("ln(2x) = 3",["2x = e"+S3,"<b>x = "+FR("e"+S3,2)+" ≈ 10.04</b>"])]},
 cond:{grp:"Several logs",c:BLU,name:"Condense, Then Compare",hint:"product & quotient rules",
  when:"Two or more logs.",rule:"Condense with log A + log B = log(AB) and log A − log B = log(A/B). Then log A = log B means A = B, and log A = c means A = b<sup>c</sup>.",
  ex:[T("log x + log(x − 3) = 1",["log(x(x − 3)) = 1, so x"+S2+" − 3x = 10, giving x = 5 or −2.","x = −2 makes log x undefined. <b>x = 5</b>"]),T("log₃(x + 1) = log₃(2x − 4)",["x + 1 = 2x − 4","<b>x = 5</b>, check: log₃ 6 = log₃ 6 ✓"])]},
 dom:{grp:"Last step",c:GRN,name:"Check the Domain",hint:"log arguments > 0",
  when:"Every log equation.",rule:"Every argument of a log must be positive. Substitute each answer and reject any that make an argument 0 or negative.",
  ex:[T("x = −2 in log x + log(x − 3)",["log(−2) is undefined. <b>Reject.</b>"]),T("ln(x − 1) = ln(3 − x)",["x − 1 = 3 − x gives x = 2. Both arguments are 1 &gt; 0 ✓"])]}
};
const EXP=()=>flowHTML("exp",{M:EM,label:"Exponential and log equations flowchart",lead:"How to solve exponential and logarithmic equations. Tap any method for its rule and solved examples.",start:"Solve the equation",top:["isx"],q:"What kind of equation?",
  cols:[["Same base","",ORG,["same"]],["Different bases","",RED,["tlog"]],["b<sup>2x</sup> and b<sup>x</sup>","",PURP,["qfe"]],["One log","",TEAL,["one"]],["Several logs","",BLU,["cond"]]],end:"dom"});

const CM={
 fcp:{grp:"Always first",c:NAVY,name:"Fundamental Counting Principle",hint:"stages multiply",
  when:"The task happens in stages.",rule:"If stage 1 has m choices and stage 2 has n choices, there are m · n ways in all. Draw a slot for each stage.",
  ex:[T("3 shirts, 4 pants, 2 shoes",["3 · 4 · 2 = <b>24 outfits</b>"]),T("License plate: 3 letters, then 3 digits",["26"+S3+" · 10"+S3+" = <b>17,576,000</b>"])]},
 perm:{grp:"Order matters, no repeats",c:ORG,name:"Permutation",hint:"ₙPᵣ = n!/(n − r)!",
  when:"Order matters and each item is used once (ranks, positions, arrangements).",rule:"ₙPᵣ = "+FR("n!","(n − r)!"),
  ex:[T("President, VP, secretary from 10 people",["₁₀P₃ = 10 · 9 · 8 = <b>720</b>"]),T("Arrange 5 books on a shelf",["5! = <b>120</b>"])]},
 rep:{grp:"Order matters, repeats OK",c:RED,name:"Repetition Allowed",hint:"nʳ",
  when:"Order matters and the same item can be used again (codes, PINs).",rule:"n choices for each of r positions: n<sup>r</sup>.",
  ex:[T("4-digit PIN",["10"+S4+" = <b>10,000</b>"]),T("3-letter code",["26"+S3+" = <b>17,576</b>"])]},
 comb:{grp:"Order doesn't matter",c:PURP,name:"Combination",hint:"ₙCᵣ = n!/(r!(n − r)!)",
  when:"Order doesn't matter (committees, teams, hands of cards).",rule:"ₙCᵣ = "+FR("n!","r!(n − r)!")+". That's the permutations ÷ r!.",
  ex:[T("Committee of 3 from 10",["₁₀C₃ = "+FR(720,6)+" = <b>120</b>"]),T("5-card hand from 52",["₅₂C₅ = <b>2,598,960</b>"])]},
 idn:{grp:"Identical items",c:TEAL,name:"Arrangements with Repeats",hint:"n!/(a! b! …)",
  when:"Arranging letters or objects where some are identical.",rule:"Divide n! by the factorial of each group of identical items.",
  ex:[T("MISSISSIPPI",["11 letters: 4 I, 4 S, 2 P.","11!/(4! 4! 2!) = <b>34,650</b>"]),T("BANANA",["6!/(3! 2!) = <b>60</b>"])]},
 prob:{grp:"Last step",c:GRN,name:"Probability: Favorable ÷ Total",hint:"and · or · at least one",
  when:"After counting.",rule:"P = favorable ÷ total. <b>And</b> (independent): multiply. <b>Or</b>: P(A) + P(B) − P(A and B). <b>At least one</b>: 1 − P(none).",
  ex:[T("P(king or heart)",[FR(4,52)+" + "+FR(13,52)+" − "+FR(1,52)+" = "+FR(16,52)+" = <b>"+FR(4,13)+"</b>"]),T("P(at least one 6 in 3 rolls)",["1 − ("+FR(5,6)+")"+S3+" = 1 − "+FR(125,216)+" = <b>"+FR(91,216)+"</b>"])]}
};
const CNT=()=>flowHTML("cnt",{M:CM,label:"Counting method flowchart",lead:"How to choose a counting method. Tap any method for its rule and solved examples.",start:"Count the outcomes",top:["fcp"],q:"Does order matter?",
  cols:[["Yes, no repeats","",ORG,["perm"]],["Yes, repeats OK","",RED,["rep"]],["No","",PURP,["comb"]],["Identical items","",TEAL,["idn"]]],end:"prob"});

/* ---------- unit 8: sequences vs series (two-level tree) ---------- */
const QM8={
 ss:{grp:"Always first",c:NAVY,name:"Sequence or Series?",hint:"a list vs a sum",
  when:"Before you pick a formula.",rule:"A <b>sequence</b> is a list of terms: a₁, a₂, a₃, … You find one term, aₙ. A <b>series</b> is the sum of the terms: a₁ + a₂ + a₃ + … You find a total, Sₙ or S.",
  ex:[T("3, 7, 11, 15, …",["Commas, no plus signs: a <b>sequence</b>. A typical question: find a₂₀."]),T("3 + 7 + 11 + 15",["Plus signs: a <b>series</b>. The question is the total: 36."])]},
 ar:{grp:"Sequence · constant difference",c:ORG,name:"Arithmetic Sequence",hint:"aₙ = a₁ + (n − 1)d",
  when:"You add the same number d each time.",rule:"d = a₂ − a₁. The nth term is aₙ = a₁ + (n − 1)d.",
  ex:[T("5, 9, 13, … Find a₂₀.",["d = 4","a₂₀ = 5 + 19 · 4 = <b>81</b>"]),T("a₁ = 50, d = −3. Which term equals 2?",["50 − 3(n − 1) = 2, so n − 1 = 16.","<b>n = 17</b>"])]},
 ge:{grp:"Sequence · constant ratio",c:ORG,name:"Geometric Sequence",hint:"aₙ = a₁ · rⁿ⁻¹",
  when:"You multiply by the same number r each time.",rule:"r = a₂ ÷ a₁. The nth term is aₙ = a₁ · r<sup>n − 1</sup>.",
  ex:[T("3, 6, 12, … Find a₈.",["r = 2","a₈ = 3 · 2"+"<sup>7</sup> = <b>384</b>"]),T("81, 27, 9, … Find a₆.",["r = "+FR(1,3),"a₆ = 81 · ("+FR(1,3)+")<sup>5</sup> = <b>"+FR(1,3)+"</b>"])]},
 rc:{grp:"Sequence · uses previous terms",c:ORG,name:"Recursive Formula",hint:"aₙ from aₙ₋₁",
  when:"Each term is defined from the term(s) before it.",rule:"You need the first term(s) and a rule like aₙ = 3aₙ₋₁ − 1. An arithmetic rule aₙ = aₙ₋₁ + d has explicit form a₁ + (n − 1)d.",
  ex:[T("a₁ = 2, aₙ = 3aₙ₋₁ − 1",["2, 5, 14, 41, …"]),T("a₁ = 7, aₙ = aₙ₋₁ + 4. Write it explicitly.",["Arithmetic with d = 4: aₙ = 7 + 4(n − 1)","<b>aₙ = 4n + 3</b>"])]},
 ot:{grp:"Sequence · neither",c:ORG,name:"Other Patterns",hint:"second differences",
  when:"The differences and the ratios are not constant.",rule:"If the second differences are constant, aₙ is quadratic: an"+S2+" + bn + c. Also look for squares, cubes and Fibonacci-type rules.",
  ex:[T("2, 5, 10, 17, 26, …",["Differences 3, 5, 7, 9. Second differences 2: quadratic.","<b>aₙ = n"+S2+" + 1</b>"]),T("2, 6, 12, 20, …",["Differences 4, 6, 8: quadratic.","<b>aₙ = n(n + 1)</b>"])]},
 as:{grp:"Series · arithmetic",c:PURP,name:"Arithmetic Series",hint:"Sₙ = n(a₁ + aₙ) / 2",
  when:"Adding the terms of an arithmetic sequence.",rule:"Sₙ = "+FR("n(a₁ + aₙ)",2)+" = "+FR("n(2a₁ + (n − 1)d)",2)+". First find n, the number of terms.",
  ex:[T("1 + 2 + 3 + … + 100",["S = "+FR("100(1 + 100)",2)+" = <b>5050</b>"]),T("5 + 9 + 13 + … + 81",["n = "+FR("81 − 5",4)+" + 1 = 20","S = "+FR("20(5 + 81)",2)+" = <b>860</b>"])]},
 gs:{grp:"Series · geometric, finite",c:PURP,name:"Finite Geometric Series",hint:"Sₙ = a₁(1 − rⁿ)/(1 − r)",
  when:"Adding n terms of a geometric sequence.",rule:"Sₙ = "+FR("a₁(1 − rⁿ)","1 − r")+", for r ≠ 1.",
  ex:[T("3 + 6 + 12 + … (8 terms)",["S₈ = "+FR("3(1 − 2<sup>8</sup>)","1 − 2")+" = <b>765</b>"]),T("1 + "+FR(1,2)+" + "+FR(1,4)+" + … (6 terms)",["S₆ = "+FR("1 − ("+FR(1,2)+")<sup>6</sup>",FR(1,2))+" = <b>"+FR(63,32)+"</b>"])]},
 is:{grp:"Series · geometric, infinite",c:PURP,name:"Infinite Geometric Series",hint:"S = a₁/(1 − r), |r| < 1",
  when:"Adding infinitely many terms of a geometric sequence.",rule:"If |r| &lt; 1, the series converges: S = "+FR("a₁","1 − r")+". If |r| ≥ 1, it diverges and has no sum.",
  ex:[T("12 + 6 + 3 + …",["r = "+FR(1,2),"S = "+FR(12,"1 − "+FR(1,2))+" = <b>24</b>"]),T("5 − 10 + 20 − …",["r = −2, so |r| ≥ 1.","<b>Diverges: no sum.</b>"])]},
 sg:{grp:"Series · Σ notation",c:PURP,name:"Sigma Notation",hint:"count terms: top − bottom + 1",
  when:"The sum is written with Σ.",rule:"Plug in each value of k from the bottom to the top and add. Number of terms = top − bottom + 1. Then decide: arithmetic or geometric?",
  ex:[T("Σ<sub>k=1</sub><sup>5</sup> (2k + 1)",["3 + 5 + 7 + 9 + 11","<b>35</b>"]),T("Σ<sub>k=0</sub><sup>4</sup> 3 · 2<sup>k</sup>",["5 terms, geometric, a₁ = 3, r = 2.","S = 3(2<sup>5</sup> − 1) = <b>93</b>"])]},
 ck8:{grp:"Last step",c:GRN,name:"Check n and Convergence",hint:"number of terms, |r| < 1",
  when:"Every time.",rule:"Count the terms carefully: n = "+FR("last − first","d")+" + 1. For an infinite series, check |r| &lt; 1 before using the formula.",
  ex:[T("How many terms: 5, 9, …, 81?",["n = "+FR("81 − 5",4)+" + 1 = <b>20</b> (not 19)"]),T("0.9 + 0.09 + 0.009 + …",["r = 0.1, so it converges.","S = "+FR("0.9","0.9")+" = <b>1</b>"])]}
};
const SEQ=()=>flowHTML("seq",{M:QM8,label:"Sequences and series flowchart",lead:"First decide whether you have a list (sequence) or a sum (series), then pick the type. Tap any node for its formula and solved examples.",start:"Sequences & Series",top:["ss"],q:"A list or a sum?",
  cols:[{g:"Sequence",s:"a list: a₁, a₂, a₃, …",c:ORG,cols:[["Constant difference","",ORG,["ar"]],["Constant ratio","",ORG,["ge"]],["Uses previous","",ORG,["rc"]],["Neither","",ORG,["ot"]]]},
        {g:"Series",s:"a sum: a₁ + a₂ + …",c:PURP,cols:[["Arithmetic","",PURP,["as"]],["Geometric, finite","",PURP,["gs"]],["Geometric, infinite","",PURP,["is"]],["Σ notation","",PURP,["sg"]]]}],end:"ck8"});

/* ---------- new units: statistics (SAT), matrices, induction ---------- */
const M2=(a,b,c,d)=>mat([[a,b],[c,d]]), V2=(a,b)=>mat([[a],[b]]);
const STM={
 spct:{grp:"Always on",c:NAVY,name:"Percents, Ratios & Rates",hint:"change ÷ original",when:"In almost every SAT data question.",rule:"Percent change = (new − old) ÷ old × 100%. Successive changes multiply: +p% then −p% gives (1 + p/100)(1 − p/100).",
  ex:[T("A price goes from $80 to $92.",["Change 12 ÷ 80 = 0.15","<b>15% increase</b>"]),T("Up 20%, then down 20%",["1.2 × 0.8 = 0.96","<b>4% lower</b> than the start"])]},
 scen:{grp:"One variable",c:ORG,name:"Center: Mean & Median",hint:"outliers pull the mean",when:"Typical value, or the effect of adding or changing a value.",rule:"Mean = sum ÷ n. Median = the middle value of the sorted data. An outlier pulls the mean toward it but barely moves the median.",
  ex:[T("5 tests average 84. The 6th is 90.",["Total 420 + 90 = 510","Mean = 510 ÷ 6 = <b>85</b>"]),T("3, 7, 8, 12, 40",["Mean 14, median 8.","The outlier 40 pulls the mean up; the median is the better summary."])]},
 sspr:{grp:"One variable",c:ORG,name:"Spread: SD, Range, IQR",hint:"how spread out",when:"Comparing how spread out data sets are.",rule:"Range = max − min. IQR = Q3 − Q1. Standard deviation = typical distance from the mean. Adding a constant: SD stays the same. Multiplying by k: SD × |k|.",
  ex:[T("{10, 10, 10, 10} vs {1, 10, 19}",["Same mean 10.","The second set has the larger SD: its values are farther from 10."]),T("Add 5 to every value",["Mean +5","<b>SD unchanged</b>"])]},
 sdis:{grp:"One variable",c:ORG,name:"Box Plots, Histograms, Dot Plots",hint:"read the display",when:"The data is given as a graph.",rule:"Box plot: min, Q1, median, Q3, max. Histogram: counts per interval; to find the median, count to the middle value. Dot plot: one dot per value.",
  ex:[T("Box plot 12, 20, 25, 31, 40",["IQR = 31 − 20 = <b>11</b>","Range = 40 − 12 = 28"]),T("Histogram counts 3, 5, 8, 4 (n = 20)",["Median = average of the 10th and 11th values.","Running totals 3, 8, 16: both are in the <b>third bar</b>."])]},
 ssct:{grp:"Two variables",c:RED,name:"Scatterplots & Lines of Fit",hint:"slope, prediction, residual",when:"Two quantities and a trend line.",rule:"y = mx + b. The slope is the predicted change in y for each 1-unit increase in x. Residual = actual − predicted. Constant difference → linear; constant ratio → exponential.",
  ex:[T("y = 2.5x + 10, point (8, 33)",["Predicted: 2.5(8) + 10 = 30","Residual = 33 − 30 = <b>3</b>"]),T("Interpret the slope 2.5 (x = hours, y = score)",["Each additional hour of study is associated with <b>2.5 more points</b>, on average."])]},
 stwo:{grp:"Two variables",c:RED,name:"Two-Way Tables",hint:"rows, columns, totals",when:"Data in a table of two categories.",rule:"Add the totals first. 'Of the …' or 'given …' tells you which row or column is the denominator.",
  ex:[T("Juniors 30 yes / 20 no; Seniors 25 yes / 25 no. P(senior | yes)?",["Yes total = 55","25/55 = <b>5/11</b>"]),T("Same table. What fraction of all students said yes?",["55/100 = <b>11/20</b>"])]},
 sprb:{grp:"Probability",c:PURP,name:"Probability",hint:"favorable ÷ total",when:"Chance of an event.",rule:"P = favorable ÷ total. And (independent): multiply. Or: P(A) + P(B) − P(A and B). Without replacement, the total goes down.",
  ex:[T("Bag: 4 red, 6 blue. P(red)?",["4/10 = <b>2/5</b>"]),T("Two draws with replacement, both red",["(2/5)(2/5) = <b>4/25</b>"])]},
 scond:{grp:"Probability",c:PURP,name:"Conditional Probability",hint:"P(A | B) = P(A and B)/P(B)",when:"'Given that', 'of those who', 'if a … is chosen'.",rule:"Restrict to the given group: it becomes the new total.",
  ex:[T("P(yes | junior) from the table above",["30/50 = <b>3/5</b>"]),T("40% play a sport; 25% play a sport and an instrument. P(instrument | sport)?",["0.25/0.40 = <b>0.625</b>"])]},
 ssamp:{grp:"Studies",c:TEAL,name:"Sampling & Margin of Error",hint:"estimate ± margin",when:"Surveys and polls.",rule:"A random sample lets you generalize to the population that was sampled. Estimate ± margin of error gives the plausible values. A larger sample gives a smaller margin.",
  ex:[T("52% ± 3%",["Plausible: 49% to 55%.","It's plausible that fewer than half agree."]),T("A survey of gym members about exercise",["Biased sample: <b>can't generalize</b> to all adults."])]},
 sexp:{grp:"Studies",c:TEAL,name:"Experiments vs Observational",hint:"cause or just association?",when:"What conclusion a study supports.",rule:"Random assignment to treatments → cause and effect. No random assignment (observational) → association only.",
  ex:[T("Volunteers randomly assigned to two diets",["Can conclude the diet <b>causes</b> the difference (for people like the volunteers)."]),T("People who walk more have lower blood pressure",["Observational: only an <b>association</b>."])]},
 sans:{grp:"Last step",c:GRN,name:"Answer What's Asked",hint:"units, %, context",when:"Every time.",rule:"Reread the question: a percent or a decimal? Which group? Rounded how? Interpret in context with units.",
  ex:[T("'What percent…' and you found 0.15",["Answer <b>15</b>, not 0.15."]),T("'How many more…'",["A difference, not a total."])]}
};
const MTM={
 mdim:{grp:"Always first",c:NAVY,name:"Check the Dimensions",hint:"rows × columns",when:"Before any operation.",rule:"m × n means m rows and n columns. Add or subtract only the same sizes. AB exists when the columns of A = the rows of B, and AB is (rows of A) × (columns of B).",
  ex:[T("A is 2 × 3, B is 3 × 2",["AB is <b>2 × 2</b>, BA is <b>3 × 3</b>"]),T("A is 2 × 3, B is 3 × 2. A + B?",["Different sizes: <b>undefined</b>"])]},
 madd:{grp:"Combine",c:ORG,name:"Add, Subtract, Scalar",hint:"entry by entry",when:"Matrices of the same size, or a number times a matrix.",rule:"Add matching entries. A scalar multiplies every entry.",
  ex:[T(M2(1,2,3,4)+" + 2"+M2(0,1,1,0),["= "+M2(1,4,5,4)]),T("3"+M2(2,"−1",0,4),["= "+M2(6,"−3",0,12)])]},
 mmul:{grp:"Multiply",c:RED,name:"Matrix Multiplication",hint:"row · column",when:"AB with matching inner dimensions.",rule:"Entry (i, j) of AB = row i of A · column j of B. Order matters: usually AB ≠ BA.",
  ex:[T(M2(1,2,3,4)+V2(5,6),["1·5 + 2·6 = 17 and 3·5 + 4·6 = 39","= "+V2(17,39)]),T(M2(1,2,0,1)+M2(1,0,3,1),["AB = "+M2(7,2,3,1)+", but BA = "+M2(1,2,3,7),"<b>AB ≠ BA</b>"])]},
 mtr:{grp:"Multiply",c:RED,name:"Transformations",hint:"rotate, reflect, scale",when:"Moving points with a matrix.",rule:"Multiply the matrix by the point as a column. Rotation 90°: "+M2(0,"−1",1,0)+". Reflection in the x-axis: "+M2(1,0,0,"−1")+". Areas scale by |det|.",
  ex:[T("Rotate (2, 3) by 90°",[M2(0,"−1",1,0)+V2(2,3)+" = "+V2("−3",2)]),T("A shape of area 5 is transformed by "+M2(3,0,0,2),["det = 6","New area = <b>30</b>"])]},
 mdet:{grp:"Determinant",c:PURP,name:"Determinants",hint:"ad − bc",when:"Testing invertibility, Cramer's rule, areas.",rule:"2 × 2: ad − bc. 3 × 3: expand along row 1: a(ei − fh) − b(di − fg) + c(dh − eg).",
  ex:[T("det "+M2(3,1,2,4),["12 − 2 = <b>10</b>"]),T("det "+mat([[1,2,0],[0,1,3],[2,0,1]]),["1(1 − 0) − 2(0 − 6) + 0 = <b>13</b>"])]},
 minv:{grp:"Inverse",c:TEAL,name:"Inverse Matrix",hint:"(1/det)[d −b; −c a]",when:"Solving AX = B, or 'undoing' a matrix.",rule:"A⁻¹ exists only if det A ≠ 0. For 2 × 2: swap a and d, negate b and c, divide by det.",
  ex:[T(M2(2,1,1,1)+"⁻¹",["det = 1","= "+M2(1,"−1","−1",2)]),T(M2(4,2,6,3)+"⁻¹",["det = 12 − 12 = 0","<b>No inverse</b> (singular)"])]},
 msys:{grp:"Solve AX = B",c:BLU,name:"Solve a System with Matrices",hint:"X = A⁻¹B",when:"A linear system written as AX = B.",rule:"If det A ≠ 0, then X = A⁻¹B. If det A = 0, there is no unique solution: use Gauss to decide.",go:null,
  ex:[T("2x + y = 5, x + y = 3",["X = "+M2(1,"−1","−1",2)+V2(5,3)+" = "+V2(2,1),"<b>(2, 1)</b>"]),T("3x + 2y = 7, x − y = 4",["det = −5, A⁻¹ = −⅕"+M2("−1","−2","−1",3),"X = −⅕"+V2("−15",5)+" = "+V2(3,"−1"),"<b>(3, −1)</b>"])]},
 mchk:{grp:"Last step",c:GRN,name:"Check",hint:"AA⁻¹ = I, substitute",when:"Every time.",rule:"Multiply A by your inverse: you should get I. Substitute a solution into every equation.",
  ex:[T(M2(2,1,1,1)+M2(1,"−1","−1",2),["= "+M2(1,0,0,1)+" ✓"]),T("(3, −1) in 3x + 2y = 7 and x − y = 4",["9 − 2 = 7 ✓ and 3 + 1 = 4 ✓"])]}
};
const INM={
 ibase:{grp:"Step 1",c:NAVY,name:"Base Case",hint:"check the first n",when:"Always first.",rule:"Show the statement is true for the first value (usually n = 1).",
  ex:[T("1 + 3 + … + (2n − 1) = n"+S2,["n = 1: 1 = 1"+S2+" ✓"]),T("n! &gt; 2<sup>n</sup> for n ≥ 4",["n = 4: 24 &gt; 16 ✓"])]},
 ihyp:{grp:"Step 2",c:NAVY,name:"Inductive Hypothesis",hint:"assume P(k)",when:"Right after the base case.",rule:"Assume the statement is true for n = k. Write it out: you will use it in the next step.",
  ex:[T("Sum of odd numbers",["Assume 1 + 3 + … + (2k − 1) = k"+S2+"."]),T("Divisibility",["Assume 6 divides 7<sup>k</sup> − 1."])]},
 isum:{grp:"Sum formula",c:ORG,name:"Proving a Sum Formula",hint:"add the next term",when:"Statements like 1 + 2 + … + n = formula.",rule:"Sum to k + 1 = (sum to k) + (next term). Replace the sum to k with the hypothesis, then simplify to the formula with k + 1.",
  ex:[T("1 + 3 + … + (2n − 1) = n"+S2,["k"+S2+" + (2k + 1) = (k + 1)"+S2+" ✓"]),T("Σk"+S2+" = n(n + 1)(2n + 1)/6",[FR("k(k + 1)(2k + 1)",6)+" + (k + 1)"+S2+" = "+FR("(k + 1)(2k"+S2+" + 7k + 6)",6),"= "+FR("(k + 1)(k + 2)(2k + 3)",6)+" ✓"])]},
 idiv:{grp:"Divisibility",c:RED,name:"Proving Divisibility",hint:"multiple + multiple",when:"'d divides …' for all n.",rule:"Rewrite the k + 1 case so one part contains the k case (a multiple of d by the hypothesis) and the other part is clearly a multiple of d.",
  ex:[T("6 | 7<sup>n</sup> − 1",["7<sup>k+1</sup> − 1 = 7(7<sup>k</sup> − 1) + 6","Both parts are multiples of 6 ✓"]),T("3 | n"+S3+" + 2n",["(k + 1)"+S3+" + 2(k + 1) = (k"+S3+" + 2k) + 3(k"+S2+" + k + 1)","Both parts are multiples of 3 ✓"])]},
 iineq:{grp:"Inequality",c:PURP,name:"Proving an Inequality",hint:"chain of inequalities",when:"'… &gt; …' for all n ≥ some value.",rule:"Start from the k + 1 side, use the hypothesis once, then finish with a simple inequality that holds for k ≥ the base value.",
  ex:[T("2<sup>n</sup> &gt; n for n ≥ 1",["2<sup>k+1</sup> = 2 · 2<sup>k</sup> &gt; 2k ≥ k + 1 ✓"]),T("n! &gt; 2<sup>n</sup> for n ≥ 4",["(k + 1)! = (k + 1)k! &gt; (k + 1)2<sup>k</sup> &gt; 2 · 2<sup>k</sup> = 2<sup>k+1</sup> ✓"])]},
 irec:{grp:"Recursive formula",c:TEAL,name:"Recursive → Explicit",hint:"prove the closed form",when:"A sequence defined recursively, with a guessed explicit formula.",rule:"Base case from a₁. In the step, apply the recursive rule to the hypothesis aₖ = formula.",
  ex:[T("a₁ = 1, aₙ₊₁ = 2aₙ + 1. Prove aₙ = 2<sup>n</sup> − 1.",["Base: 2 − 1 = 1 ✓","aₖ₊₁ = 2(2<sup>k</sup> − 1) + 1 = 2<sup>k+1</sup> − 1 ✓"]),T("a₁ = 2, aₙ₊₁ = aₙ + 2n + 1. Prove aₙ = n"+S2+" + 1.",["Base: 1 + 1 = 2 ✓","k"+S2+" + 1 + 2k + 1 = (k + 1)"+S2+" + 1 ✓"])]},
 iconc:{grp:"Step 4",c:GRN,name:"Conclusion",hint:"true for all n",when:"At the end.",rule:"Write: 'Since P(1) is true and P(k) implies P(k + 1), P(n) is true for all n ≥ 1.' Checking a few cases is not a proof.",
  ex:[T("The domino sentence",["The first domino falls, and each domino knocks over the next, so all of them fall."]),T("Why examples aren't enough",["n"+S2+" + n + 41 is prime for n = 1 to 39, but n = 40 gives 1681 = 41"+S2+"."])]}
};
const STA=()=>flowHTML("sta",{M:STM,label:"SAT statistics flowchart",lead:"Every statistics and probability topic on the SAT. Start at the top and pick the branch that matches the question. Tap any node for the rule and solved examples.",start:"SAT data question",top:["spct"],q:"What is it about?",
  cols:[["One variable","a list of data",ORG,["scen","sspr","sdis"]],["Two variables","x and y",RED,["ssct","stwo"]],["Probability","chance",PURP,["sprb","scond"]],["Studies","surveys, experiments",TEAL,["ssamp","sexp"]]],end:"sans"});
const MTX=()=>flowHTML("mtx",{M:MTM,label:"Matrices flowchart",lead:"What to do with matrices, and when. Check the dimensions first, then pick the operation. Tap any node for the rule and solved examples.",start:"Work with matrices",top:["mdim"],q:"What do you need?",
  cols:[["Combine","+, −, scalar",ORG,["madd"]],["Multiply","",RED,["mmul","mtr"]],["Determinant","",PURP,["mdet"]],["Inverse","",TEAL,["minv"]],["Solve AX = B","",BLU,["msys"]]],end:"mchk"});
const IND=()=>flowHTML("ind",{M:INM,label:"Mathematical induction flowchart",lead:"Every induction proof has the same shape. Do the base case, assume P(k), then pick the kind of statement. Tap any node for the method and solved examples.",start:"Prove P(n) for all n ≥ 1",top:["ibase","ihyp"],q:"Step 3: prove P(k + 1). What kind of statement?",
  cols:[["Sum formula","",ORG,["isum"]],["Divisibility","",RED,["idiv"]],["Inequality","",PURP,["iineq"]],["Recursive","",TEAL,["irec"]]],end:"iconc"});

const FLOWMAP={"unit-2":["Solving Quadratics",QFLOW,"8 methods"],"unit-3":["Solving Quadratics",QFLOW,"8 methods"],systems:["Systems: Which Method & Why",SYS,"14 methods"],"unit-4":["Finding All Zeros",ZER,"7 methods"],"unit-5":["Rational Equations",RAT,"5 methods"],"unit-6":["Radical Equations",RAD,"6 methods"],"unit-7":["Exponential & Log Equations",EXP,"7 methods"],"unit-10":["Counting & Probability",CNT,"6 methods"],"unit-8":["Sequences vs. Series",SEQ,"10 nodes"],"unit-12":["SAT Statistics & Probability",STA,"11 topics"],"unit-13":["Matrices",MTX,"8 nodes"],"unit-14":["Induction Proofs",IND,"7 nodes"]};

/* ---------- section 2: cross table method ---------- */
const CROSS_EX=[
  {a:9,b:10,c:1,a1:9,c1:1,a2:1,c2:1},
  {a:2,b:7,c:3,a1:2,c1:1,a2:1,c2:3},
  {a:3,b:-10,c:8,a1:3,c1:-4,a2:1,c2:-2,try:[-2,-4],fix:"Swap the two numbers in the right column."},
  {a:6,b:1,c:-2,a1:3,c1:2,a2:2,c2:-1},
  {a:4,b:-4,c:-15,a1:2,c1:-5,a2:2,c2:3,try:[5,-3],fix:"Right size, wrong sign. Flip both signs in the right column."},
  {a:5,b:-13,c:6,a1:5,c1:-3,a2:1,c2:-2}
];
function crossSteps(o){
  const m1=o.a1*o.c2, m2=o.a2*o.c1, st=[];
  st.push(`Split ${x2(o.a)} into two factors: <b>${tx(o.a1)}</b> and <b>${tx(o.a2)}</b>. Write them in the left column.`);
  st.push(`Split ${sgn(o.c)} into two factors: <b>${sgn(o.c1)}</b> and <b>${sgn(o.c2)}</b>. Write them in the right column.`);
  if(o.try){ const [t1,t2]=o.try, s=o.a1*t2+o.a2*t1; st.push(`First try ${sgn(t1)} and ${sgn(t2)}: ${tx(o.a1)} · ${par(t2)} + ${tx(o.a2)} · ${par(t1)} = ${tx(s)} <span class="no">✗ need ${tx(o.b)}</span>. ${o.fix}`); }
  st.push(`Cross-multiply along the diagonals: ${tx(o.a1)} · ${par(o.c2)} = <b>${tx(m1)}</b> and ${tx(o.a2)} · ${par(o.c1)} = <b>${tx(m2)}</b>. Write them in the middle column.`);
  st.push(`Add: ${sumTxt(m1,m2)} = ${tx(o.b)} <span class="yes">✓ matches the middle term</span>.`);
  st.push(`Read across each row: <b>${bin(o.a1,o.c1)}${bin(o.a2,o.c2)} = 0</b>`);
  st.push(`Set each factor equal to 0: <b>x = ${frc(-o.c1,o.a1)}</b> or <b>x = ${frc(-o.c2,o.a2)}</b>`);
  return st;
}
function crossCard(o,i){
  return `<article class="fx-card"><div class="fx-k">Example ${i+1}</div><h4>${poly([o.a,o.b,o.c])} = 0</h4>${ctHTML(o)}
   <ol class="fx-steps">${crossSteps(o).map(s=>`<li>${s}</li>`).join("")}</ol></article>`;
}
const CROSS=`<div class="fx-lead"><p><b>Use it for</b> ax<sup>2</sup> + bx + c when a ≠ 1 (it also works when a = 1). Draw a tic-tac-toe grid and write the three terms on top.</p></div>
<div class="fx-how">
 <div class="fx-how-t">${ctHTML(CROSS_EX[0])}<p class="fx-cap">The left and right columns hold factors. The middle column holds the diagonal products.</p></div>
 <ol class="fx-rules">
  <li><b>Left column:</b> two factors whose product is ax<sup>2</sup>.</li>
  <li><b>Right column:</b> two factors whose product is c. Watch the signs.</li>
  <li><b>Cross-multiply:</b> top-left × bottom-right goes in the middle top. Bottom-left × top-right goes in the middle bottom.</li>
  <li><b>Check:</b> the two middle products must add up to bx. If they don't, swap the right column, flip both signs, or try another factor pair.</li>
  <li><b>Read across the rows</b> to get the two factors. Then set each factor equal to 0.</li>
 </ol>
</div>
<div class="fx-signs"><b>Sign shortcuts</b><span>c &gt; 0 and b &gt; 0 → both numbers +</span><span>c &gt; 0 and b &lt; 0 → both numbers −</span><span>c &lt; 0 → one + and one −</span></div>
<h4 class="h4">Solved examples</h4><div class="fx-grid">${CROSS_EX.map(crossCard).join("")}</div>`;

/* ---------- section 3: cross table practice (type in the boxes) ---------- */
const CROSS_P=[[1,3,1,4],[2,3,1,1],[3,2,1,3],[2,-5,1,-2],[5,-3,1,2],[3,1,2,-3],[2,3,2,-1],[4,-1,2,-3]].map(([a1,c1,a2,c2])=>({a:a1*a2,b:a1*c2+a2*c1,c:c1*c2,ans:[a1,c1,a2,c2]}));
function genCross(){ for(let k=0;k<500;k++){ const a1=pick([1,1,2,2,3,3,4,5]), a2=pick([1,1,2,3]), c1=nz(-7,7), c2=nz(-7,7);
  const a=a1*a2,b=a1*c2+a2*c1,c=c1*c2; if(!b||a===1||gcd(gcd(a,b),c)!==1||gcd(a1,c1)!==1||gcd(a2,c2)!==1) continue; return {a,b,c,ans:[a1,c1,a2,c2]}; } return CROSS_P[0]; }
const inp=(f,lab,ph)=>`<input class="bx" data-f="${f}" type="text" autocomplete="off" spellcheck="false" aria-label="${lab}"${ph?` placeholder="${ph}"`:""}>`;
function crossPCard(p,i){
  return `<article class="fx-pc" data-kind="cross" data-p='${JSON.stringify(p)}'>
   <div class="fx-pc-h"><span class="fx-pn">${i+1}</span><h4>${poly([p.a,p.b,p.c])}</h4><span class="fx-badge">Solved</span></div>
   <div class="ct in">
    <div class="ct-h"><span>${x2(p.a)}</span></div><div class="ct-h">${p.b<0?"−"+tx(-p.b):"+"+tx(p.b)}</div><div class="ct-h">${sgn(p.c)}</div>
    <div class="ct-c">${inp("a1","Left column, top")}<i>x</i></div><div class="ct-c">${inp("m1","Middle column, top")}<i>x</i></div><div class="ct-c">${inp("c1","Right column, top","±")}</div>
    <div class="ct-c">${inp("a2","Left column, bottom")}<i>x</i></div><div class="ct-c">${inp("m2","Middle column, bottom")}<i>x</i></div><div class="ct-c">${inp("c2","Right column, bottom","±")}</div>
    <svg class="ct-x" viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true"><line x1="50" y1="25" x2="250" y2="75"/><line x1="50" y1="75" x2="250" y2="25"/></svg>
   </div>
   <div class="fx-sum" data-o="sum">Middle products add to: <b>?</b> &nbsp;·&nbsp; need <b>${tx(p.b)}</b></div>
   <div class="fx-fac"><span>Factors:</span><span class="fx-paren">(${inp("f1","First factor, x coefficient")}<i>x</i>${inp("f2","First factor, number","±")})(${inp("f3","Second factor, x coefficient")}<i>x</i>${inp("f4","Second factor, number","±")})</span></div>
   <p class="fx-msg" data-o="msg">Type the factors of ${x2(p.a)} on the left and the factors of ${sgn(p.c)} on the right.</p>
   <div class="fx-btns"><button type="button" data-act="show">Show answer</button><button type="button" data-act="clear">Clear</button></div></article>`;
}

/* ---------- section 4: Ruffini's method ---------- */
function rufTable(c,r,sm){ const {s,p}=synth(c,r);
  return `<table class="rf${sm?" sm":""}"><tr><td class="rf-r"></td>${c.map(v=>`<td>${num(v)}</td>`).join("")}</tr>
   <tr class="rf-p"><td class="rf-r">${num(r)}</td>${p.map(v=>`<td>${v===null?"":num(v)}</td>`).join("")}</tr>
   <tr class="rf-s"><td class="rf-r"></td>${s.map((v,i)=>`<td${i===s.length-1?' class="rf-rem"':""}>${num(v)}</td>`).join("")}</tr></table>`; }
const RUF_EX=[[[1,-1],[1,-2],[1,-3]],[[1,1],[1,-2],[1,3]],[[1,-1],[1,-2],[1,3]],[[1,-3],[2,-1],[1,2]],[[1,-3],[1,2],[1,2]],[[1,-1],[1,1],[1,-2],[1,2]],[[1,-1],[1,1],[1,-2],[1,3]]];
function rufSolve(c){ // returns {html steps, factors}
  let cur=c.slice(); const steps=[], lin=[]; let first=true;
  while(cur.length>3){
    const cands=intCands(cur), tests=[]; let root=null;
    for(const r of cands){ const v=ev(cur,r); tests.push(`P(${num(r)}) = ${num(v)}${v===0?' <span class="yes">✓</span>':' <span class="no">✗</span>'}`); if(v===0){ root=r; break; } }
    const nm=first?"P":"Q";
    if(first) steps.push(`<b>List the possible integer roots:</b> the divisors of the constant term ${num(cur[cur.length-1])}: ${divs(cur[cur.length-1]).map(d=>"±"+d).join(", ")}.`);
    steps.push(`<b>Test them${first?"":" in Q(x) = "+poly(cur)}:</b> ${tests.map(t=>t.replace(/^P/,nm)).join(", ")}. So <b>${bin(1,-root)}</b> is a factor.`);
    const {s}=synth(cur,root);
    steps.push(`<b>Divide with Ruffini's rule</b> using ${num(root)}: bring down the first number, multiply by ${num(root)}, add, repeat.${rufTable(cur,root,!first)}The last number is the remainder (0). The bottom row is the quotient, one degree lower: <b>${poly(s.slice(0,-1))}</b>.`);
    lin.push([1,-root]); cur=s.slice(0,-1); first=false;
  }
  const f=factorQuad(cur);
  const qo={a:cur[0],b:cur[1],c:cur[2],a1:f[0],c1:f[1],a2:f[2],c2:f[3]};
  steps.push(`<b>Factor the quadratic</b> ${poly(cur)} with the cross table:${cur[2]?ctHTML(qo,true):""} ${poly(cur)} = ${bin(f[0],f[1])}${bin(f[2],f[3])}.`);
  const all=[...lin,[f[0],f[1]],[f[2],f[3]]];
  const zs=[...new Set(all.map(([a,b])=>{ const g=gcd(a,b); return (-b/g)+"/"+(a/g); }))].map(k=>{ const [n,d]=k.split("/").map(Number); return frc(n,d); });
  steps.push(`<b>Write the answer:</b> P(x) = <b>${joinFactors(all)}</b>. Zeros: ${zs.map(z=>"x = "+z).join(", ")}.`);
  return steps;
}
function rufCard(fs,i){ const c=fs.reduce((p,[a,b])=>mul(p,[a,b]),[1]);
  return `<article class="fx-card wide"><div class="fx-k">Example ${i+1}</div><h4>Factor P(x) = ${poly(c)}</h4><ol class="fx-steps">${rufSolve(c).map(s=>`<li>${s}</li>`).join("")}</ol></article>`; }
const RUF=`<div class="fx-lead"><p><b>Use it for</b> polynomials of degree 3 or more. Ruffini's rule (also called synthetic division) divides P(x) by (x − r) using only the coefficients.</p></div>
<div class="fx-how">
 <div class="fx-how-t">${rufTable([1,-6,11,-6],1)}<p class="fx-cap">P(x) = x<sup>3</sup> − 6x<sup>2</sup> + 11x − 6 divided by (x − 1). Quotient: x<sup>2</sup> − 5x + 6, remainder 0.</p></div>
 <ol class="fx-rules">
  <li><b>Write every coefficient,</b> highest power first. Write <b>0</b> for any missing power.</li>
  <li><b>Find a root r.</b> Try the divisors of the constant term (±p/q if the leading coefficient is not 1). r is a root when P(r) = 0.</li>
  <li><b>Build the table:</b> r goes on the left. Bring down the first coefficient, multiply it by r, write it under the next coefficient, add, and repeat.</li>
  <li><b>The last number is the remainder.</b> If it is 0, then (x − r) is a factor and the bottom row is the quotient.</li>
  <li><b>Repeat</b> until you reach a quadratic. Factor that with the cross table.</li>
 </ol>
</div>
<div class="fx-signs"><b>Remember</b><span>root r = 2 → factor (x − 2)</span><span>root r = −3 → factor (x + 3)</span><span>x<sup>3</sup> − 7x + 6 → coefficients 1, 0, −7, 6</span></div>
<h4 class="h4">Solved examples</h4><div class="fx-grid one">${RUF_EX.map(rufCard).join("")}</div>`;

/* ---------- section 5: Ruffini practice ---------- */
const RUF_P=[[[1,-1],[1,2],[1,-3]],[[1,-1],[1,2],[1,3]],[[1,-2],[1,2],[1,-3]],[[1,-2],[1,3],[2,-1]],[[1,1],[1,3],[1,-4]],[[1,1],[1,-2],[3,-1]]];
function genRuf(){ for(let k=0;k<500;k++){ const r1=nz(-4,4), r2=nz(-4,4), p=pick([1,1,2,3]), q=nz(-5,5); if(gcd(p,q)!==1) continue;
  const fs=[[1,-r1],[1,-r2],[p,q]], c=fs.reduce((a,b)=>mul(a,b),[1]); if(c.some(v=>Math.abs(v)>45)||c[c.length-1]===0) continue; return fs; } return RUF_P[0]; }
function rufPCard(fs,i){ const c=fs.reduce((a,b)=>mul(a,b),[1]), n=c.length-1;
  return `<article class="fx-pc" data-kind="ruf" data-p='${JSON.stringify({c})}'>
   <div class="fx-pc-h"><span class="fx-pn">${i+1}</span><h4>P(x) = ${poly(c)}</h4><span class="fx-badge">Solved</span></div>
   <p class="fx-st"><b>Step 1.</b> Pick an integer root r. Try the divisors of ${num(c[n])}: ${divs(c[n]).map(d=>"±"+d).join(", ")}.</p>
   <p class="fx-st"><b>Step 2.</b> Type r on the left, then fill in the table.</p>
   <div class="rf-wrap"><table class="rf in"><tr><td class="rf-r"></td>${c.map(v=>`<td>${num(v)}</td>`).join("")}</tr>
    <tr class="rf-p"><td class="rf-r">${inp("r","Root r","r")}</td><td></td>${c.slice(1).map((_,j)=>`<td>${inp("p"+(j+1),"Multiply row, column "+(j+2))}</td>`).join("")}</tr>
    <tr class="rf-s"><td class="rf-r"></td>${c.map((_,j)=>`<td${j===n?' class="rf-rem"':""}>${inp("s"+j,j===n?"Remainder":"Bottom row, column "+(j+1))}</td>`).join("")}</tr></table></div>
   <p class="fx-msg" data-o="pv"></p>
   <p class="fx-st"><b>Step 3.</b> Factor the quotient <span data-o="q">Q(x) = ?</span></p>
   <div class="fx-fac"><span class="fx-paren">(${inp("f1","Quotient first factor, x coefficient")}<i>x</i>${inp("f2","Quotient first factor, number","±")})(${inp("f3","Quotient second factor, x coefficient")}<i>x</i>${inp("f4","Quotient second factor, number","±")})</span></div>
   <p class="fx-msg" data-o="msg">Start with Step 1.</p>
   <div class="fx-btns"><button type="button" data-act="show">Show answer</button><button type="button" data-act="clear">Clear</button></div></article>`;
}

/* ---------- checking ---------- */
function pv(s){ s=String(s||"").trim().replace(/[−–—]/g,"-").replace(/\s+/g,"");
  if(/^[+-]?x$/i.test(s)) return s[0]==="-"?-1:1; s=s.replace(/x$/i,"");
  if(s===""||s==="+"||s==="-") return null; const m=s.match(/^([+-]?)(\d+)(?:\/(\d+))?$/); if(!m) return NaN;
  const v=+m[2]/(m[3]?+m[3]:1); return m[1]==="-"?-v:v; }
const eq=(a,b)=>Math.abs(a-b)<1e-9;
function mark(el,ok){ el.classList.toggle("ok",ok===true); el.classList.toggle("bad",ok===false); }
function checkCross(card){ const P=JSON.parse(card.dataset.p), F={}; card.querySelectorAll("[data-f]").forEach(e=>F[e.dataset.f]=e);
  const v=k=>pv(F[k].value), all=(...a)=>a.every(x=>x!==null);
  Object.values(F).forEach(e=>mark(e,null));
  const [a1,a2,c1,c2,m1,m2]=["a1","a2","c1","c2","m1","m2"].map(v);
  if(all(a1,a2)){ const ok=eq(a1*a2,P.a); mark(F.a1,ok); mark(F.a2,ok); }
  if(all(c1,c2)){ const ok=eq(c1*c2,P.c); mark(F.c1,ok); mark(F.c2,ok); }
  if(all(m1,a1,c2)) mark(F.m1,eq(m1,a1*c2));
  if(all(m2,a2,c1)) mark(F.m2,eq(m2,a2*c1));
  const sum=card.querySelector('[data-o="sum"]'); let sumOk=null;
  if(all(m1,m2)&&!isNaN(m1+m2)){ sumOk=eq(m1+m2,P.b); sum.innerHTML=`Middle products add to: <b>${tx(m1+m2)}</b> &nbsp;·&nbsp; need <b>${tx(P.b)}</b> ${sumOk?'<span class="yes">✓ match</span>':'<span class="no">✗ try again</span>'}`; }
  else sum.innerHTML=`Middle products add to: <b>?</b> &nbsp;·&nbsp; need <b>${tx(P.b)}</b>`;
  const f=["f1","f2","f3","f4"].map(v); let solved=false;
  if(all(...f)){ const [p,q,r,s]=f; solved=eq(p*r,P.a)&&eq(p*s+q*r,P.b)&&eq(q*s,P.c); ["f1","f2","f3","f4"].forEach(k=>mark(F[k],solved)); }
  const msg=card.querySelector('[data-o="msg"]');
  msg.className="fx-msg"+(solved?" yes":"");
  msg.innerHTML=solved?`Solved! ${poly([P.a,P.b,P.c])} = ${bin(f[0],f[1])}${bin(f[2],f[3])}`
    :all(...f)?`Those factors multiply to ${poly(mul([f[0],f[1]],[f[2],f[3]]))}, not ${poly([P.a,P.b,P.c])}. Read across each row of your table.`
    :sumOk===true?"The table works. Now read across each row to write the two factors."
    :sumOk===false?"The middle products don't add up to the middle term. Swap the right column, flip both signs, or try another pair."
    :`Type the factors of ${x2(P.a)} on the left and the factors of ${sgn(P.c)} on the right.`;
  card.classList.toggle("done",solved); return solved; }
function checkRuf(card){ const P=JSON.parse(card.dataset.p), c=P.c, n=c.length-1, F={}; card.querySelectorAll("[data-f]").forEach(e=>F[e.dataset.f]=e);
  const v=k=>pv(F[k].value); Object.values(F).forEach(e=>mark(e,null));
  const r=v("r"), pvo=card.querySelector('[data-o="pv"]'), qo=card.querySelector('[data-o="q"]'); let rOk=false, tabOk=false, Q=null;
  pvo.className="fx-msg"; pvo.innerHTML="";
  if(r!==null){ if(isNaN(r)){ mark(F.r,false); pvo.innerHTML="Type a whole number for r."; }
    else { const val=ev(c,r); rOk=Number.isInteger(r)&&eq(val,0); mark(F.r,rOk);
      pvo.innerHTML=rOk?`P(${num(r)}) = 0 <span class="yes">✓</span> so ${bin(1,-r)} is a factor.`:eq(val,0)?"That is a root, but use a whole-number root for this table.":`P(${num(r)}) = ${num(+val.toFixed(4))}, not 0 <span class="no">✗</span>. Try another divisor.`; } }
  if(rOk){ const {s,p}=synth(c,r); let good=0, tot=0;
    for(let j=1;j<=n;j++){ const x=v("p"+j); tot++; if(x!==null){ const ok=eq(x,p[j]); mark(F["p"+j],ok); if(ok) good++; } }
    for(let j=0;j<=n;j++){ const x=v("s"+j); tot++; if(x!==null){ const ok=eq(x,s[j]); mark(F["s"+j],ok); if(ok) good++; } }
    tabOk=good===tot; if(tabOk){ Q=s.slice(0,-1); qo.innerHTML=`Q(x) = <b>${poly(Q)}</b>`; } else qo.innerHTML="Q(x) = ? (finish the table)"; }
  else qo.innerHTML="Q(x) = ? (finish the table)";
  const f=["f1","f2","f3","f4"].map(v); let solved=false;
  if(Q&&f.every(x=>x!==null)){ const [a,b,cc]=Q, [p1,q1,r1,s1]=f; const ok=eq(p1*r1,a)&&eq(p1*s1+q1*r1,b)&&eq(q1*s1,cc); ["f1","f2","f3","f4"].forEach(k=>mark(F[k],ok)); solved=ok; }
  const msg=card.querySelector('[data-o="msg"]'); msg.className="fx-msg"+(solved?" yes":"");
  msg.innerHTML=solved?`Solved! P(x) = ${joinFactors([[1,-r],[f[0],f[1]],[f[2],f[3]]])}`
    :!rOk?"Start with Step 1: find a root."
    :!tabOk?"Bring down the first number. Multiply by r, write it in the next column, add. Repeat. The last box must be 0."
    :f.every(x=>x!==null)?`Those factors multiply to ${poly(mul([f[0],f[1]],[f[2],f[3]]))}, not ${poly(Q)}.`
    :"Now factor Q(x). Use the cross table if the first coefficient is not 1.";
  card.classList.toggle("done",solved); return solved; }
function fillAnswer(card){ const P=JSON.parse(card.dataset.p), set=(k,x)=>{ const e=card.querySelector(`[data-f="${k}"]`); if(e) e.value=String(x).replace("-","−"); };
  if(card.dataset.kind==="cross"){ const [a1,c1,a2,c2]=P.ans; set("a1",a1); set("a2",a2); set("c1",c1); set("c2",c2); set("m1",a1*c2); set("m2",a2*c1); set("f1",a1); set("f2",c1); set("f3",a2); set("f4",c2); }
  else { const c=P.c, r=intCands(c).find(x=>ev(c,x)===0), {s,p}=synth(c,r); set("r",r); p.forEach((x,j)=>{ if(j) set("p"+j,x); }); s.forEach((x,j)=>set("s"+j,x));
    const f=factorQuad(s.slice(0,-1)); set("f1",f[0]); set("f2",f[1]); set("f3",f[2]); set("f4",f[3]); } }

function setHTML(kind,list){ const cards=kind==="cross"?list.map(crossPCard):list.map(rufPCard);
  return `<div class="fx-set" data-set="${kind}"><div class="fx-ctl"><span class="fx-score">Solved <b>0</b> / ${list.length}</span><button type="button" data-act="new">↻ New problems</button><button type="button" data-act="reset">Clear all</button></div>
   <div class="fx-pgrid">${cards.join("")}</div></div>`; }
const CROSSP=`<div class="fx-lead"><p>Type numbers in the boxes. Each box turns <span class="yes">green</span> when it's right and <span class="no">red</span> when it's wrong. Type negative numbers with a minus sign, like −4. Type 1 for a plain x.</p></div>${setHTML("cross",CROSS_P)}`;
const RUFP=`<div class="fx-lead"><p>Find a root, fill in the Ruffini table, then factor the quotient. Each box turns <span class="yes">green</span> when it's right. Type negative numbers with a minus sign.</p></div>${setHTML("ruf",RUF_P)}`;

function bindSets(root){
  root.querySelectorAll(".fx-set").forEach(set=>{ if(set.dataset.bound) return; set.dataset.bound=1; const kind=set.dataset.set;
    const score=()=>{ const cs=[...set.querySelectorAll(".fx-pc")]; set.querySelector(".fx-score").innerHTML=`Solved <b>${cs.filter(c=>c.classList.contains("done")).length}</b> / ${cs.length}`; };
    const chk=card=>{ (card.dataset.kind==="cross"?checkCross:checkRuf)(card); score(); };
    set.addEventListener("input",e=>{ const card=e.target.closest(".fx-pc"); if(card) chk(card); });
    set.addEventListener("click",e=>{ const b=e.target.closest("[data-act]"); if(!b) return; const act=b.dataset.act, card=b.closest(".fx-pc");
      if(act==="show"&&card){ fillAnswer(card); chk(card); }
      else if(act==="clear"&&card){ card.querySelectorAll("[data-f]").forEach(x=>x.value=""); chk(card); }
      else if(act==="reset"){ set.querySelectorAll("[data-f]").forEach(x=>x.value=""); set.querySelectorAll(".fx-pc").forEach(c=>(c.dataset.kind==="cross"?checkCross:checkRuf)(c)); score(); }
      else if(act==="new"){ const seen=new Set(), list=[]; const n=kind==="cross"?8:6;
        while(list.length<n){ const p=kind==="cross"?genCross():genRuf(); const k=JSON.stringify(kind==="cross"?[p.a,p.b,p.c]:p); if(seen.has(k)) continue; seen.add(k); list.push(p); }
        set.querySelector(".fx-pgrid").innerHTML=(kind==="cross"?list.map(crossPCard):list.map(rufPCard)).join(""); score(); } });
  }); }

/* ---------- node map for this folder ---------- */
const META={start:["Start","every method as a node"],cross:["Cross Table","ax² + bx + c, a ≠ 1"],crossp:["Practice","type in the grid"],ruf:["Ruffini","degree 3 and higher"],rufp:["Practice","type in the table"]};
const SHORT={start:"Method Flowchart",cross:"Cross Table",crossp:"Cross Table Practice",ruf:"Ruffini's Method",rufp:"Ruffini Practice"};
const GCOL={"Start":NAVY,"Cross Table":RED,"Ruffini":PURP,"Practice":TEAL};
function mapInit(root){
  const sec=root.querySelector("#sec-factor"); if(!sec||sec.querySelector(".pmap")) return;
  const subs=[...sec.querySelectorAll('[id^="sub-factor-"]')]; if(subs.length<2) return;
  const items=subs.map((el,i)=>{ const k=el.id.replace("sub-factor-",""), sm=el.querySelector(".subh small"), t=el.querySelector(".subh").cloneNode(true); t.querySelectorAll(".num,small").forEach(x=>x.remove());
    return {k,el,i,title:(SHORT[k]||t.textContent.trim()),cnt:sm?sm.textContent:"",grp:(META[k]||["Practice",""])[0],desc:(META[k]||["",""])[1]}; });
  const N=items.length, pos=items.map((_,i)=>{ const a=-Math.PI/2+2*Math.PI*i/N; return [50+38*Math.cos(a),50+36*Math.sin(a)]; });
  let mode="map"; try{ mode=localStorage.getItem("a2factview")||"map"; }catch(e){}
  const wrap=document.createElement("div"); wrap.className="pmap";
  wrap.innerHTML=`<div class="pm-bar"><button type="button" data-pv="map">Map</button><button type="button" data-pv="list">List</button><span class="pm-leg">${Object.entries(GCOL).map(([g,c])=>`<span><i style="background:${c}"></i>${g}</span>`).join("")}</span></div>
   <div class="pm-stage"><svg class="pm-lines" viewBox="0 0 100 100" preserveAspectRatio="none">${pos.map(([x,y])=>`<line x1="50" y1="50" x2="${x}" y2="${y}"/>`).join("")}${pos.slice(0,-1).map(([x,y],i)=>`<line class="pth" x1="${x}" y1="${y}" x2="${pos[i+1][0]}" y2="${pos[i+1][1]}"/>`).join("")}</svg>
    <div class="pm-hub fx-hub"><b>Factoring</b><span>Start at 1 and follow the path</span></div>
    ${items.map((it,i)=>`<button type="button" class="pm-node" data-pk="${it.k}" style="left:${pos[i][0]}%;top:${pos[i][1]}%;--c:${GCOL[it.grp]}"><span class="pm-n">${i+1}</span><span class="pm-t">${it.title}</span><span class="pm-d">${it.desc}</span><span class="pm-c">${it.cnt}</span></button>`).join("")}</div>
   <div class="pm-cur"></div>`;
  subs[0].parentNode.insertBefore(wrap,subs[0]);
  const cur=wrap.querySelector(".pm-cur"); let sel=items[0].k;
  const show=k=>{ sel=k; const it=items.find(x=>x.k===k);
    wrap.querySelectorAll(".pm-node").forEach(n=>n.classList.toggle("on",n.dataset.pk===k));
    items.forEach(x=>x.el.style.display=(mode==="list"||x.k===k)?"":"none");
    if(mode==="map"){ if(it.el.tagName==="DETAILS") it.el.open=true; const i=it.i;
      cur.innerHTML=`<button type="button" class="pm-step" data-ps="${i-1}"${i?"":" disabled"}>‹ ${i?items[i-1].title:""}</button><span>Section ${i+1} of ${N}</span><button type="button" class="pm-step" data-ps="${i+1}"${i<N-1?"":" disabled"}>${i<N-1?items[i+1].title:""} ›</button>`;
      cur.querySelectorAll("[data-ps]").forEach(b=>b.onclick=()=>{ const j=+b.dataset.ps; if(items[j]){ show(items[j].k); seen(wrap,items[j].k); cur.scrollIntoView({behavior:"smooth",block:"start"}); } }); } };
  const setMode=m=>{ mode=m; try{ localStorage.setItem("a2factview",m); }catch(e){} wrap.classList.toggle("list",m==="list"); wrap.querySelectorAll("[data-pv]").forEach(b=>b.classList.toggle("on",b.dataset.pv===m)); if(m==="list") cur.innerHTML=""; show(sel); };
  wrap.querySelectorAll("[data-pv]").forEach(b=>b.onclick=()=>setMode(b.dataset.pv));
  wrap.querySelectorAll(".pm-node").forEach(n=>n.onclick=()=>{ show(n.dataset.pk); setTimeout(()=>cur.scrollIntoView({behavior:"smooth",block:"start"}),30); });
  sec.addEventListener("click",e=>{ const j=e.target.closest("[data-jump]"); if(!j||mode!=="map") return; const it=items.find(x=>x.el.id===j.dataset.jump); if(it&&it.k!==sel){ show(it.k); seen(wrap,it.k); } },true);
  setMode(mode);
}

/* ---------- node-map polish for every map (visited ticks + progress) ---------- */
function seen(wrap,k){ const key="a2seen:"+(wrap.closest("section.unit")||{id:"x"}).id; let s=[]; try{ s=JSON.parse(localStorage.getItem(key)||"[]"); }catch(e){}
  if(k&&!s.includes(k)){ s.push(k); try{ localStorage.setItem(key,JSON.stringify(s)); }catch(e){} }
  const nodes=[...wrap.querySelectorAll(".pm-node")]; nodes.forEach(n=>n.classList.toggle("seen",s.includes(n.dataset.pk)));
  const done=nodes.filter(n=>n.classList.contains("seen")).length, hub=wrap.querySelector(".pm-hub"); if(!hub) return;
  let pr=hub.querySelector(".pm-prog"); if(!pr){ pr=document.createElement("div"); pr.className="pm-prog"; hub.appendChild(pr); }
  pr.innerHTML=`<span class="pm-pb"><i style="width:${nodes.length?Math.round(100*done/nodes.length):0}%"></i></span><small>${done} of ${nodes.length} visited</small>`; }
function polishMaps(root){ root.querySelectorAll(".pmap").forEach(w=>{ if(w.dataset.pol) return; w.dataset.pol=1;
  const mb=w.querySelector('[data-pv="map"]'); if(w.classList.contains("list")&&mb) mb.click();
  const ns=w.querySelectorAll(".pm-node"); w.classList.toggle("big",ns.length>7);
  ns.forEach(n=>{ n.style.setProperty("--px",parseFloat(n.style.left)); n.style.setProperty("--py",n.style.top); });
  const on=w.querySelector(".pm-node.on"); seen(w,on&&!w.classList.contains("list")?on.dataset.pk:null);
  w.addEventListener("click",e=>{ const n=e.target.closest(".pm-node,.pm-step"); if(!n) return; setTimeout(()=>{ const o=w.querySelector(".pm-node.on"); if(o) seen(w,o.dataset.pk); },0); }); }); }

/* ---------- link from Unit 2 ---------- */
function unit2(root){ const s=root.querySelector("#sec-unit-2 .sub"); if(!s||root.querySelector(".fx-u2")) return;
  const d=document.createElement("div"); d.className="fx-u2"; d.innerHTML=`<b>Factoring folder:</b> the Cross Table method and Ruffini's method, with solved examples and practice you can type into. <button type="button" class="openu" data-open="factor">Open Factoring →</button>`;
  s.after(d); d.querySelector("button").onclick=()=>{ location.hash="factor"; }; }

/* ---------- styles ---------- */
const fl=document.createElement("link"); fl.rel="stylesheet"; fl.href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap"; document.head.appendChild(fl);
const CSS=`
nav button.xbtn{background:${TEAL};border-color:${TEAL};color:#fff;font-weight:600}
nav button.xbtn:hover{background:#0b5f54}
nav button.xbtn[aria-current="true"]{background:#08463e;border-color:#08463e;box-shadow:inset 0 -3px 0 #fff}
#sec-factor .chapter,#sec-factor h2{color:${TEAL}}
#sec-factor .secnav{border-color:${TEAL};background:#effaf7}
#sec-factor .secnav button{border-color:${TEAL};color:${TEAL}}
#sec-factor .secnav button b{background:${TEAL}}
#sec-factor .secnav button:hover,#sec-factor .secnav button.cur{background:${TEAL};color:#fff}
#sec-factor .secnav button:hover b,#sec-factor .secnav button.cur b{background:#fff;color:${TEAL}}
#sec-factor details.fold{border-color:${TEAL}}
#sec-factor details.fold>summary.subh{color:${TEAL}}
#sec-factor details.fold[open]>summary.subh{background:#effaf7;border-bottom-color:${TEAL}}
#sec-factor .subh .num{background:${TEAL}}
#sec-factor .secnav.sticky{flex-wrap:wrap;overflow:visible;row-gap:7px}
#sec-factor .secnav .jb{flex-basis:100%;display:flex;flex-wrap:wrap;gap:8px}
.fx-hub{background:${TEAL}!important}
.fx-u2{border:1.5px solid ${TEAL};background:#effaf7;padding:10px 14px;margin:-8px 0 18px;font-size:17px}
.fx-u2 .openu{background:${TEAL};border-color:${TEAL};margin-left:6px}
.fx-lead{border-left:4px solid ${TEAL};background:#f6fbfa;padding:8px 14px;margin:6px 0 14px}
.fx-lead p{margin:0;font-size:17.5px}
.yes{color:#137333;font-weight:600}.no{color:#b3261e;font-weight:600}
.frc{display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;font-size:.82em;line-height:1.05;margin:0 1px}
.frc span+span{border-top:1.3px solid currentColor}
.fx-flow{display:flex;flex-direction:column;gap:8px}
.fx-row{display:grid;grid-template-columns:34px minmax(110px,170px) 1fr;gap:12px;align-items:center;border:1.5px solid #111;background:#fff;padding:10px 14px}
.fx-i{width:30px;height:30px;border-radius:50%;background:${TEAL};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700}
.fx-w{font-variant:small-caps;letter-spacing:.05em;font-weight:600;font-size:17px}
.fx-m{display:flex;flex-direction:column;gap:2px}
.fx-m b{font-size:18px}.fx-m span{font-size:17px;color:#333}
.fx-go{align-self:flex-start;margin-top:4px;border:1.5px solid ${TEAL};background:#fff;color:${TEAL};padding:2px 12px;font:600 15px 'EB Garamond',Georgia,serif;cursor:pointer}
.fx-go:hover{background:${TEAL};color:#fff}
.fx-tip{margin:12px 0 0;font-size:17px}
.ct{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-template-rows:56px 72px 72px;gap:3px;background:#e46a7e;max-width:380px;margin:4px 0 6px}
.ct>div{background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;font:700 30px/1 'Caveat',cursive;color:${INK}}
.ct .ct-h{color:#111;font-size:30px}
.ct .ct-m{color:${RED}}
.ct .ct-m small{font:italic 13px 'EB Garamond',Georgia,serif;color:#666;margin-top:3px}
.ct .ct-h sup{font-size:.55em}
.ct-x{position:absolute;left:0;right:0;top:59px;height:147px;width:100%;pointer-events:none}
.ct-x line{stroke:${RED};stroke-width:1.4;stroke-dasharray:5 5;opacity:.35;vector-effect:non-scaling-stroke}
.ct .ct-sum{position:absolute;left:0;right:0;top:100%;margin-top:6px;background:none;font:600 16px 'EB Garamond',Georgia,serif;color:#137333;align-items:flex-start}
.ct:has(.ct-sum){margin-bottom:34px}
.ct.sm{grid-template-rows:40px 50px 50px;max-width:260px;display:inline-grid;width:260px;vertical-align:middle;margin:6px 10px 34px 0}
.ct.sm>div{font-size:23px}.ct.sm .ct-m small{font-size:11.5px}
.ct.sm .ct-x{top:43px;height:103px}
.ct.in .ct-x{top:53px;height:135px}
.ct.in{grid-template-rows:50px 66px 66px;max-width:none}
.ct.in .ct-c{flex-direction:row;gap:3px}
.ct.in i{font:700 26px 'Caveat',cursive;font-style:normal;color:#111}
.bx{width:58px;height:44px;border:1.5px solid #9aa7b8;border-radius:8px;background:#fbfcfe;text-align:center;font:700 25px 'Caveat',cursive;color:${INK};padding:0 2px;position:relative;z-index:1}
.bx:focus{outline:none;border-color:${INK};box-shadow:0 0 0 3px rgba(31,79,209,.18);background:#fff}
.bx::placeholder{color:#b9c2cf;font-size:20px}
.bx.ok{border-color:#1a7f37;background:#e8f6ec;color:#137333}
.bx.bad{border-color:#c5221f;background:#fdecea;color:#b3261e}
.fx-how{display:flex;flex-wrap:wrap;gap:22px;align-items:flex-start;margin:0 0 12px}
.fx-how-t{flex:0 1 380px}
.fx-cap{font-size:15px;font-style:italic;color:#444;margin:0}
.fx-rules{flex:1 1 320px;margin:0;padding-left:22px;font-size:17.5px;line-height:1.6}
.fx-rules li{margin-bottom:4px}
.fx-signs{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;border:1.5px dashed #111;padding:8px 14px;margin:0 0 6px;font-size:16.5px}
.fx-signs span{background:#f4f4f4;padding:1px 10px}
.fx-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,330px),1fr));gap:16px}
.fx-grid.one{grid-template-columns:1fr}
.fx-card{border:1.5px solid #111;background:#fff;padding:12px 16px 10px;box-shadow:4px 4px 0 rgba(0,0,0,.06)}
.fx-k{font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:${TEAL};font-weight:600}
.fx-card h4{margin:2px 0 8px;font-size:21px}
.fx-steps{margin:4px 0 0;padding-left:22px;font-size:16.5px;line-height:1.6}
.fx-steps li{margin-bottom:4px}
.fx-card.wide .fx-steps{columns:1}
.rf{border-collapse:collapse;margin:8px 0;font:700 24px 'Caveat',cursive;color:${INK}}
.rf td{padding:3px 12px;text-align:center;min-width:44px}
.rf td.rf-r{border-right:2px solid #111;color:${RED}}
.rf tr.rf-p td{border-bottom:2px solid #111}
.rf tr.rf-p td.rf-r{border-bottom:none}
.rf tr:first-child td{color:#111}
.rf td.rf-rem{outline:2px solid ${RED};outline-offset:-3px;color:${RED}}
.rf.sm{font-size:20px}.rf.sm td{padding:1px 9px;min-width:36px}
.rf.in td{padding:4px 5px}
.rf.in .bx{width:54px}
.rf-wrap{overflow-x:auto}
.fx-set{margin-top:6px}
.fx-ctl{display:flex;flex-wrap:wrap;gap:10px;align-items:center;border:1.5px solid ${TEAL};background:#effaf7;padding:9px 12px;margin:0 0 14px}
.fx-score{font-size:18px;margin-right:auto}.fx-score b{color:${TEAL};font-size:21px}
.fx-ctl button,.fx-btns button{border:1.5px solid ${TEAL};background:#fff;color:${TEAL};padding:5px 14px;font:600 16px 'EB Garamond',Georgia,serif;cursor:pointer}
.fx-ctl button:first-of-type{background:${TEAL};color:#fff}
.fx-ctl button:hover,.fx-btns button:hover{background:#0b5f54;color:#fff;border-color:#0b5f54}
.fx-pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,350px),1fr));gap:16px}
.fx-pc{border:1.5px solid #111;background:#fff;padding:12px 14px;transition:box-shadow .2s,border-color .2s}
.fx-pc.done{border-color:#1a7f37;box-shadow:0 0 0 3px rgba(26,127,55,.15)}
.fx-pc-h{display:flex;align-items:center;gap:10px;margin-bottom:8px}
.fx-pc-h h4{margin:0;font-size:20px;flex:1}
.fx-pn{flex:none;width:28px;height:28px;border-radius:50%;background:${TEAL};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px}
.fx-badge{display:none;background:#1a7f37;color:#fff;font-size:13px;letter-spacing:.06em;text-transform:uppercase;padding:2px 9px;border-radius:999px}
.fx-pc.done .fx-badge{display:inline-block}
.fx-sum{font-size:16px;margin:4px 0 8px}
.fx-fac{display:flex;flex-wrap:wrap;align-items:center;gap:8px;font-size:17px;margin:4px 0}
.fx-paren{display:inline-flex;align-items:center;gap:3px;font:700 28px 'Caveat',cursive}
.fx-paren i{font-style:normal}
.fx-paren .bx{width:50px}
.fx-st{margin:6px 0 2px;font-size:16.5px}
.fx-msg{margin:6px 0;font-size:16px;font-style:italic;color:#444;min-height:1.2em}
.fx-msg.yes{font-style:normal}
.fx-btns{display:flex;gap:8px}
@media (max-width:640px){.fx-row{grid-template-columns:30px 1fr}.fx-row .fx-m{grid-column:1 / -1}.ct>div{font-size:25px}.bx{width:48px}.fx-paren .bx{width:44px}.ct.sm{width:100%;max-width:260px}}
/* node maps: refreshed look (Polynomials, Factoring and unit maps) */
.pm-bar button{border-radius:999px!important;padding:4px 16px!important}
.pm-bar button:first-child{margin-right:-4px}
@media (min-width:821px){
 .pmap .pm-stage{height:640px;border-radius:18px;border:1.5px solid #d9e0ea;background:#fbfcfe radial-gradient(#dde4ee 1.1px,transparent 1.3px) 0 0/22px 22px;box-shadow:inset 0 0 60px rgba(29,78,137,.05)}
 .pmap .pm-lines line{stroke:#d3dbe6;stroke-width:1.2}
 .pmap .pm-lines line.pth{stroke:#8ea3c0;stroke-width:2.2;stroke-dasharray:2 7;stroke-linecap:round;animation:pmflow 1.6s linear infinite}
 .pmap .pm-hub{width:216px;height:216px;box-shadow:0 0 0 12px rgba(29,78,137,.08),0 0 0 26px rgba(29,78,137,.04),0 14px 30px rgba(15,30,60,.25)}
 .pmap .pm-hub.fx-hub{box-shadow:0 0 0 12px rgba(15,122,108,.09),0 0 0 26px rgba(15,122,108,.04),0 14px 30px rgba(10,60,50,.25)}
 .pmap .pm-node{width:200px;border:1.5px solid #dbe2ec;border-top:5px solid var(--c);border-radius:14px;padding:10px 12px 9px;box-shadow:0 6px 18px rgba(15,30,60,.08)}
 .pmap .pm-node:hover{transform:translate(-50%,-52%) scale(1.04);box-shadow:0 12px 26px rgba(15,30,60,.16)}
 .pmap .pm-node.on{border-color:var(--c);box-shadow:0 0 0 5px color-mix(in srgb,var(--c) 22%,transparent),0 12px 26px rgba(15,30,60,.18)}
}
@keyframes pmflow{to{stroke-dashoffset:-18}}
@media (prefers-reduced-motion:reduce){.pmap .pm-lines line.pth{animation:none}}
.pm-node{position:absolute}
.pm-node .pm-n{box-shadow:0 2px 6px color-mix(in srgb,var(--c) 40%,transparent)}
.pm-node.seen::after{content:"✓";position:absolute;top:-10px;right:-10px;width:22px;height:22px;border-radius:50%;background:#1a7f37;color:#fff;font:700 13px/22px system-ui,sans-serif;text-align:center;box-shadow:0 2px 6px rgba(0,0,0,.2)}
.pm-prog{width:120px;margin-top:10px}
.pm-pb{display:block;height:6px;border-radius:3px;background:rgba(255,255,255,.25);overflow:hidden}
.pm-pb i{display:block;height:100%;border-radius:3px;background:#fff}
.pm-prog small{display:block;font-size:12.5px;margin-top:5px;opacity:.9;font-style:italic;background:transparent}
.pm-step{border-radius:999px!important}
.pmap .pm-bar [data-pv]{display:none}
@media (max-width:820px){
 .pmap .pm-stage{height:440px;padding:0;margin:0;border-radius:16px;border:1.5px solid #d9e0ea;background:#fbfcfe radial-gradient(#dde4ee 1px,transparent 1.2px) 0 0/18px 18px;overflow:visible}
 .pmap.big .pm-stage{height:540px}
 .pmap .pm-stage::before{display:none}
 .pmap .pm-lines{display:block}
 .pmap .pm-lines line{stroke:#d3dbe6;stroke-width:1}
 .pmap .pm-lines line.pth{stroke:#8ea3c0;stroke-width:2;stroke-dasharray:2 6;stroke-linecap:round;animation:pmflow 1.6s linear infinite}
 .pmap .pm-hub{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:112px;height:112px;border-radius:50%!important;margin:0;padding:8px;box-shadow:0 0 0 8px rgba(29,78,137,.08),0 8px 18px rgba(15,30,60,.22)}
 .pmap .pm-hub b{font-size:14px!important;line-height:1.1}
 .pmap .pm-hub>span{display:none}
 .pmap .pm-prog{width:72px;margin-top:6px}.pmap .pm-prog small{font-size:10px;margin-top:3px}
 .pmap .pm-node{position:absolute;left:calc(50% + (var(--px) - 50) * .95%)!important;top:var(--py)!important;transform:translate(-50%,-50%);width:84px;margin:0;padding:5px 4px 6px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:3px;border-radius:12px;border:1.5px solid #dbe2ec;border-top:4px solid var(--c);background:#fff;box-shadow:0 4px 12px rgba(15,30,60,.12)}
 .pmap .pm-node:hover{transform:translate(-50%,-50%)}
 .pmap .pm-node.on{background:var(--c);border-color:var(--c);box-shadow:0 0 0 4px color-mix(in srgb,var(--c) 25%,transparent),0 6px 14px rgba(15,30,60,.2)}
 .pmap .pm-n{width:26px;height:26px;font-size:13px}
 .pmap .pm-t{font-size:11.5px;line-height:1.12;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
 .pmap .pm-d,.pmap .pm-c{display:none}
 .pmap .pm-node.seen::after{width:18px;height:18px;font-size:11px;line-height:18px;top:-7px;right:-7px}
}`;
const st=document.createElement("style"); st.textContent=CSS+`
.mf{display:flex;flex-direction:column;align-items:center;margin:6px 0 4px;padding:18px 10px;border:1.5px solid #d9e0ea;border-radius:16px;background:#fbfcfe radial-gradient(#dde4ee 1px,transparent 1.2px) 0 0/20px 20px}
.mf-v{display:block;width:2px;height:20px;background:#8ea3c0;flex:none}
.mf-s{background:#111;color:#fff;border-radius:999px;padding:6px 20px;font-weight:700;font-size:18px}
.mf-q{border:2px dashed #111;background:#fff;border-radius:10px;padding:5px 16px;font-weight:700;font-size:17px}
.mf-n{border:1.5px solid #dbe2ec;border-top:4px solid var(--c);border-radius:12px;background:#fff;padding:7px 10px;min-width:150px;max-width:230px;display:flex;flex-direction:column;gap:1px;text-align:center;cursor:pointer;font-family:'EB Garamond',Georgia,serif;box-shadow:0 4px 12px rgba(15,30,60,.08);transition:transform .12s,box-shadow .12s}
.mf-n b{color:var(--c);font-size:16.5px;line-height:1.15}.mf-n span{font-size:13.5px;color:#555;line-height:1.2}
.mf-n:hover{transform:translateY(-2px);box-shadow:0 8px 18px rgba(15,30,60,.15)}
.mf-n.on{background:var(--c);border-color:var(--c);box-shadow:0 0 0 4px color-mix(in srgb,var(--c) 22%,transparent)}
.mf-n.on b,.mf-n.on span{color:#fff}
.mf-br{--g:12px;position:relative;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));column-gap:var(--g);width:100%;margin-top:20px}
.mf-br::before,.mf-br::after{content:"";position:absolute;left:calc((100% - (var(--n,4) - 1) * var(--g)) / var(--n,4) / 2);right:calc((100% - (var(--n,4) - 1) * var(--g)) / var(--n,4) / 2);height:2px;background:#8ea3c0}
.mf-br::before{top:0}.mf-br::after{bottom:0}
.mf-col{display:flex;flex-direction:column;align-items:center;min-width:0}
.mf-col .mf-n{width:100%;min-width:0}
.mf-fill{flex:1;min-height:20px}
.mf-l{border-radius:999px;background:var(--c);color:#fff;padding:3px 14px;text-align:center;display:flex;flex-direction:column;line-height:1.15}
.mf-l b{font-size:16px}.mf-l span{font-size:12.5px;opacity:.9;font-style:italic}
.mf-d{margin-top:14px}
.mf-g{border-radius:12px;background:var(--c);color:#fff;padding:5px 18px;text-align:center;display:flex;flex-direction:column;line-height:1.15;box-shadow:0 4px 10px rgba(0,0,0,.15)}
.mf-g b{font-size:19px}.mf-g span{font-size:13.5px;opacity:.92;font-style:italic}
.mf-gc{padding:0 4px}
.mf-gc>.mf-br{--g:8px;column-gap:8px}
.mf-gc .mf-l{padding:3px 6px}.mf-gc .mf-l b{font-size:14px}
.mf-gc .mf-n{padding:6px 5px}.mf-gc .mf-n b{font-size:14.5px}.mf-gc .mf-n span{font-size:12.5px}
@media (max-width:820px){.mf-br.grp{grid-template-columns:1fr!important;row-gap:0}.mf-br.grp::before,.mf-br.grp::after{display:none}.mf-br.grp>.mf-gc{padding:0}
 .mf-br.grp>.mf-gc>.mf-fill{display:none}.mf-br.grp>.mf-gc+.mf-gc{margin-top:18px}}
@media (max-width:700px){.mf-gc .mf-n b{font-size:10.5px!important;overflow-wrap:normal!important;word-break:normal;hyphens:manual!important}.mf-gc .mf-l b{font-size:10.5px!important}.mf-gc>.mf-br{--g:4px;column-gap:4px}}
.mf-tip{margin:6px 0;font-size:16px}
.mf-why{margin:0 0 6px;font-size:17px;background:#fff8e6;border-left:3px solid #c28a00;padding:6px 10px}
.mx{display:inline-flex;flex-direction:column;vertical-align:middle;border-left:1.5px solid #111;border-right:1.5px solid #111;padding:0 4px;margin:0 2px;font-size:.85em;line-height:1.15}
.mx span{display:flex;gap:8px;justify-content:space-between}.mx i{font-style:normal;min-width:12px;text-align:center}
.mf-br[style*="--n:4"] .mf-col .mf-n{max-width:none}
.mf-l span:empty{display:none}
.mf-dc{border:1.5px solid #111;border-top:5px solid var(--c);background:#fff;padding:12px 16px}
.mf-dk{font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--c);font-weight:600}
.mf-dc h4{margin:2px 0 6px;font-size:23px;color:var(--c)}
.mf-when,.mf-rule{margin:0 0 6px;font-size:17px}
.mf-rule{background:#f6f8fb;border-left:3px solid var(--c);padding:6px 10px}
.mf-exs{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:12px;margin:8px 0}
.mf-ex{border:1px solid #ccc;padding:8px 12px}
.mf-eq{margin:0 0 2px;font-size:19px;font-weight:600}
.mf-ex ol{margin:0;padding-left:20px;font-size:16px;line-height:1.55}
@media (max-width:700px){.mf{padding:14px 4px}.mf-br{--g:4px}.mf-n{padding:5px 3px;border-radius:9px}.mf-n b{font-size:12.5px}.mf-col .mf-n span{display:none}.mf-l{padding:2px 4px}.mf-l b{font-size:12.5px}.mf-l span{display:none}.mf-s,.mf-q{font-size:15px}.mf-br[style*="--n:5"] .mf-n b,.mf-br[style*="--n:5"] .mf-l b{font-size:10.5px;-webkit-hyphens:auto;hyphens:auto;overflow-wrap:normal}.mf-n b{overflow-wrap:normal;-webkit-hyphens:auto;hyphens:auto}}
`; document.head.appendChild(st);

const NEX=CROSS_EX.length+RUF_EX.length, NPR=CROSS_P.length+RUF_P.length;
window.A2FACT={_reg:()=>{[QFLOW,SYS,ZER,RAT,RAD,EXP,CNT,SEQ,STA,MTX,IND].forEach(f=>f());},_fresh:freshEx,_has:hasFresh,_flows:FLOWS,
  count:()=>NEX+NPR,
  tip:()=>`${NEX} solved examples · ${NPR} type-in problems`,
  subs:()=>[["start","Method Flowchart: Which Method When?","11 methods",START,"Method Flowchart"],
    ["cross","The Cross Table Method",CROSS_EX.length+" examples",CROSS,"Cross Table"],
    ["crossp","Cross Table Practice: Type in the Grid",CROSS_P.length+" problems",CROSSP,"Cross Table Practice"],
    ["ruf","Ruffini's Method (Degree 3 and Higher)",RUF_EX.length+" examples",RUF,"Ruffini's Method"],
    ["rufp","Ruffini Practice: Type in the Table",RUF_P.length+" problems",RUFP,"Ruffini Practice"]],
  lead:()=>`<p class="lead2 fx-lead" style="font-style:normal">Factor trinomials with the Cross Table method and higher-degree polynomials with Ruffini's method. Includes ${NEX} solved examples and ${NPR} practice problems where students type numbers into the boxes and see right away whether each one is correct. <button type="button" class="openu" style="background:${TEAL};border-color:${TEAL}" data-open="factor">Open Factoring →</button></p>`,
  bind(root){ bindSets(root); bindFlow(root); mapInit(root); polishMaps(root); unit2(root); const f=root.querySelector("#sub-factor-start"); if(f&&f.tagName==="DETAILS") f.open=true;
    root.querySelectorAll("#sec-factor [data-open]").forEach(b=>b.onclick=()=>{ location.hash=b.dataset.open; }); },
  flowHas:id=>!!FLOWMAP[id],
  flowHtml:id=>FLOWMAP[id][1](),
  flowTitle:id=>"Method Flowchart: "+FLOWMAP[id][0],
  flowCount:id=>FLOWMAP[id][2],
  _test:{CROSS_EX,CROSS_P,RUF_EX,RUF_P,genCross,genRuf,rufSolve,factorQuad,checkCross,checkRuf,fillAnswer,pv,synth,poly}
};
})();
