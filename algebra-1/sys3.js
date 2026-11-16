/* 3 × 3 Lab: random 3 × 3 systems solved by Gauss, Gauss–Jordan, elimination, Cramer and inverse matrix,
   an interactive 3D graph of the three planes, and practice (solve, Gauss step by step, augmented matrix, classify).
   All arithmetic is exact (fractions) and computed here. */
(function(){
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1)), pick=a=>a[Math.floor(Math.random()*a.length)];
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a;};
const neg=n=>n<0?"−"+Math.abs(n):String(n);
/* ---------- exact fractions ---------- */
class Q{ constructor(n,d=1){ if(d<0){n=-n;d=-d;} const g=gcd(n,d)||1; this.n=n/g; this.d=d/g; }
  add(o){ o=q(o); return new Q(this.n*o.d+o.n*this.d,this.d*o.d); } sub(o){ o=q(o); return new Q(this.n*o.d-o.n*this.d,this.d*o.d); }
  mul(o){ o=q(o); return new Q(this.n*o.n,this.d*o.d); } div(o){ o=q(o); return new Q(this.n*o.d,this.d*o.n); }
  z(){ return this.n===0; } eq(o){ o=q(o); return this.n===o.n&&this.d===o.d; } val(){ return this.n/this.d; }
  h(){ return this.d===1?neg(this.n):`${this.n<0?"−":""}<span class="frc"><span>${Math.abs(this.n)}</span><span>${this.d}</span></span>`; }
  t(){ return this.d===1?neg(this.n):`${neg(this.n)}/${this.d}`; } }
const q=x=>x instanceof Q?x:new Q(x,1);
/* ---------- display ---------- */
const V=["x","y","z"];
const SUBN=["₁","₂","₃"];
const mat=(M,aug)=>`<span class="s3m${aug?" aug":""}" style="--n:${M[0].length}">${M.map(r=>r.map((v,j)=>`<i${aug&&j===r.length-1?' class="ab"':""}>${q(v).h()}</i>`).join("")).join("")}</span>`;
function eqn(row){ let s=""; for(let j=0;j<3;j++){ const a=q(row[j]); if(a.z()) continue; const ab=a.n<0?new Q(-a.n,a.d):a; const co=ab.eq(1)?"":ab.h();
    s+=s?(a.n<0?" − ":" + "):(a.n<0?"−":""); s+=co+V[j]; } return (s||"0")+" = "+q(row[3]).h(); }
const sysHTML=M=>`<span class="s3sys">${M.map(r=>`<span>${eqn(r)}</span>`).join("")}</span>`;
const lin=(c,k)=>{ /* c + k·t */ let s=""; if(!c.z()) s=c.h(); if(!k.z()){ const ab=k.n<0?new Q(-k.n,k.d):k; s+=(s?(k.n<0?" − ":" + "):(k.n<0?"−":""))+(ab.eq(1)?"":ab.h())+"t"; } return s||"0"; };
/* ---------- determinants, Cramer, inverse ---------- */
const det2=(a,b,c,d)=>a.mul(d).sub(b.mul(c));
const det3=A=>{ A=A.map(r=>r.map(q)); return A[0][0].mul(det2(A[1][1],A[1][2],A[2][1],A[2][2])).sub(A[0][1].mul(det2(A[1][0],A[1][2],A[2][0],A[2][2]))).add(A[0][2].mul(det2(A[1][0],A[1][1],A[2][0],A[2][1]))); };
const minor=(A,i,j)=>A.filter((_,r)=>r!==i).map(r=>r.filter((_,c)=>c!==j));
const adj=A=>[0,1,2].map(i=>[0,1,2].map(j=>{ const m=minor(A,j,i).map(r=>r.map(q)); const d=det2(m[0][0],m[0][1],m[1][0],m[1][1]); return (i+j)%2?new Q(-d.n,d.d):d; }));
/* ---------- generation ---------- */
function genSystem(kind){ // kind: "one" | "none" | "inf"
  for(let k=0;k<400;k++){
    const A=[0,1,2].map(()=>[0,1,2].map(()=>Math.random()<.12?0:R(-4,4)));
    A.forEach(r=>{ if(r.every(v=>v===0)) r[R(0,2)]=R(1,3); });
    if(A.some(r=>Math.abs(r[0])+Math.abs(r[1])+Math.abs(r[2])===0)) continue;
    if(kind==="one"){ if(det3(A).z()) continue; const s=[R(-5,5),R(-5,5),R(-5,5)]; const M=A.map(r=>[...r,r[0]*s[0]+r[1]*s[1]+r[2]*s[2]]); return {M,kind,sol:s}; }
    const s=[R(-4,4),R(-4,4),R(-4,4)], m1=pick([1,1,2,-1]), m2=pick([1,-1,2,1]);
    const r3=[0,1,2].map(j=>m1*A[0][j]+m2*A[1][j]); if(r3.every(v=>v===0)||r3.some(v=>Math.abs(v)>9)) continue;
    const B=[A[0],A[1]].map(r=>r[0]*s[0]+r[1]*s[1]+r[2]*s[2]);
    if(det2(q(A[0][0]),q(A[0][1]),q(A[1][0]),q(A[1][1])).z()&&det2(q(A[0][1]),q(A[0][2]),q(A[1][1]),q(A[1][2])).z()) continue; // rows 1,2 independent
    const b3=m1*B[0]+m2*B[1]+(kind==="none"?pick([-3,-2,-1,1,2,3]):0);
    const M=[[...A[0],B[0]],[...A[1],B[1]],[...r3,b3]];
    const order=[[0,1,2],[2,0,1],[0,2,1]][R(0,2)]; return {M:order.map(i=>M[i]),kind,sol:null}; }
  return genSystem("one"); }
/* ---------- Gaussian elimination with integer row operations ---------- */
const rn=i=>"R"+SUBN[i];
function coefTxt(k,ri){ return k===1?rn(ri):k===-1?"−"+rn(ri):neg(k)+rn(ri); }
function gauss(M0){
  let M=M0.map(r=>r.map(v=>v)); const steps=[]; let r=0; const piv=[];
  for(let c=0;c<3&&r<3;c++){
    let p=-1; for(let i=r;i<3;i++) if(M[i][c]!==0&&(p<0||Math.abs(M[i][c])===1&&Math.abs(M[p][c])!==1)) p=i;
    if(p<0) continue;
    if(p!==r){ [M[p],M[r]]=[M[r],M[p]]; steps.push({op:`${rn(r)} ↔ ${rn(p)}`,why:`Swap so the pivot ${neg(M[r][c])} is in row ${r+1}.`,M:M.map(x=>[...x]),row:null}); }
    for(let i=r+1;i<3;i++){ const a=M[r][c], b=M[i][c]; if(b===0) continue;
      let op, nr;
      if(b%a===0){ const k=b/a; nr=M[i].map((v,j)=>v-k*M[r][j]); op=`${rn(i)} → ${rn(i)} ${k<0?"+":"−"} ${Math.abs(k)===1?"":Math.abs(k)}${rn(r)}`; }
      else { const g=gcd(a,b), ka=a/g, kb=b/g; nr=M[i].map((v,j)=>ka*v-kb*M[r][j]); op=`${rn(i)} → ${coefTxt(ka,i)} ${kb<0?"+":"−"} ${Math.abs(kb)===1?"":Math.abs(kb)}${rn(r)}`; }
      M[i]=nr; steps.push({op,why:`Make the ${V[c]}-entry of row ${i+1} zero.`,M:M.map(x=>[...x]),row:i});
      const g=M[i].reduce((s,v)=>gcd(s,v),0); if(g>1){ M[i]=M[i].map(v=>v/g); steps.push({op:`${rn(i)} → ${rn(i)} ÷ ${g}`,why:"Divide by the common factor to keep the numbers small.",M:M.map(x=>[...x]),row:i}); } }
    piv.push(c); r++; }
  // classification
  let kind="one";
  for(let i=0;i<3;i++){ if(M[i][0]===0&&M[i][1]===0&&M[i][2]===0){ kind=M[i][3]!==0?"none":(kind==="none"?"none":"inf"); } }
  return {steps,M,piv,kind}; }
function backSub(M,piv){ // unique, M upper-triangular integers
  const X=[null,null,null], lines=[];
  for(let i=2;i>=0;i--){ const c=piv[i]; let rhs=q(M[i][3]); const parts=[];
    for(let j=c+1;j<3;j++){ if(M[i][j]!==0){ rhs=rhs.sub(q(M[i][j]).mul(X[j])); parts.push(`${neg(M[i][j])}(${X[j].h()})`); } }
    X[c]=rhs.div(q(M[i][c]));
    lines.push(`Row ${i+1}: ${eqn(M[i])}${parts.length?` → ${neg(M[i][c])}${V[c]} = ${q(M[i][3]).h()} − (${parts.join(" + ")})`:""} → <b>${V[c]} = ${X[c].h()}</b>`); }
  return {X,lines}; }
function paramSol(M,piv){ // rank 2: one free variable t
  const free=[0,1,2].find(c=>!piv.includes(c)); const E=[null,null,null]; E[free]=[q(0),q(1)];
  const rows=[0,1,2].filter(i=>M[i].slice(0,3).some(v=>v!==0));
  for(let k=rows.length-1;k>=0;k--){ const i=rows[k], c=piv[k]; let c0=q(M[i][3]), c1=q(0);
    for(let j=c+1;j<3;j++){ if(M[i][j]!==0){ c0=c0.sub(q(M[i][j]).mul(E[j][0])); c1=c1.sub(q(M[i][j]).mul(E[j][1])); } }
    E[c]=[c0.div(q(M[i][c])),c1.div(q(M[i][c]))]; }
  return {E,free}; }
function gaussJordan(M0){ // exact RREF with steps (from the REF)
  let M=M0.map(r=>r.map(q)); const steps=[];
  for(let i=2;i>=0;i--){ const c=[0,1,2].find(j=>!M[i][j].z()); if(c===undefined) continue;
    if(!M[i][c].eq(1)){ const p=M[i][c]; M[i]=M[i].map(v=>v.div(p)); steps.push({op:`${rn(i)} → ${rn(i)} ÷ ${p.t()}`,M:M.map(r=>[...r])}); }
    for(let k=i-1;k>=0;k--){ const f=M[k][c]; if(f.z()) continue; M[k]=M[k].map((v,j)=>v.sub(f.mul(M[i][j]))); steps.push({op:`${rn(k)} → ${rn(k)} ${f.n<0?"+":"−"} ${new Q(Math.abs(f.n),f.d).eq(1)?"":new Q(Math.abs(f.n),f.d).t()}${rn(i)}`,M:M.map(r=>[...r])}); } }
  return {steps,M}; }
/* ---------- solution writers ---------- */
function solveAll(S){
  const G=gauss(S.M), A=S.M.map(r=>r.slice(0,3)), B=S.M.map(r=>r[3]); const out={G,A,B};
  if(G.kind==="one"){ out.bs=backSub(G.M,G.piv); out.X=out.bs.X; }
  else if(G.kind==="inf"){ out.ps=paramSol(G.M,G.piv); }
  out.D=det3(A); return out; }
function gaussHTML(S,O){ const G=O.G;
  let h=`<p class="s3p"><b>Augmented matrix</b> [A | B]:</p>${mat(S.M,true)}`;
  h+=G.steps.length?`<ol class="s3steps">${G.steps.map(s=>`<li><span class="s3op">${s.op}</span> <span class="s3why">${s.why}</span><div>${mat(s.M,true)}</div></li>`).join("")}</ol>`:"<p>Already in row-echelon form.</p>";
  if(G.kind==="one") h+=`<p class="s3p"><b>Back-substitute</b> from the bottom row up:</p><ul class="s3bs">${O.bs.lines.map(l=>`<li>${l}</li>`).join("")}</ul><p class="s3ans">Solution: (x, y, z) = (${O.X.map(v=>v.h()).join(", ")})</p>`;
  else if(G.kind==="none") h+=`<p class="s3ans no">A row reads 0 0 0 | ${neg(G.M.find(r=>r[0]===0&&r[1]===0&&r[2]===0)[3])}, which means 0 = ${neg(G.M.find(r=>r[0]===0&&r[1]===0&&r[2]===0)[3])}: impossible. <b>No solution</b> (inconsistent system).</p>`;
  else { const {E,free}=O.ps; h+=`<p class="s3p">A row of zeros (0 = 0): <b>infinitely many solutions</b>. Let ${V[free]} = t and back-substitute:</p><p class="s3ans">(x, y, z) = (${E.map(e=>lin(e[0],e[1])).join(", ")}), t any real number</p>`; }
  return h; }
function gjHTML(S,O){ if(O.G.kind!=="one") return `<p>Gauss–Jordan continues to reduced row-echelon form; here the row-echelon form already shows ${O.G.kind==="none"?"no solution":"infinitely many solutions"}.</p>`;
  const J=gaussJordan(O.G.M); return `<p class="s3p">Start from the row-echelon form, make each pivot 1 and clear the entries above it:</p>${mat(O.G.M,true)}<ol class="s3steps">${J.steps.map(s=>`<li><span class="s3op">${s.op}</span><div>${mat(s.M,true)}</div></li>`).join("")}</ol><p class="s3ans">Read the last column: (x, y, z) = (${J.M.map(r=>r[3].h()).join(", ")})</p>`; }
function elimHTML(S,O){ const G=O.G;
  return `<p class="s3p">The same steps as Gauss, written as equations:</p>${sysHTML(S.M)}<ol class="s3steps">${G.steps.map(s=>`<li><span class="s3op">${s.op.replace(/R(.)/g,"Eq $1").replace(/[₁₂₃]/g,c=>({"₁":"1","₂":"2","₃":"3"})[c])}</span><div>${sysHTML(s.M)}</div></li>`).join("")}</ol>${G.kind==="one"?`<p class="s3ans">(x, y, z) = (${O.X.map(v=>v.h()).join(", ")})</p>`:G.kind==="none"?`<p class="s3ans no">0 = nonzero: <b>no solution</b>.</p>`:`<p class="s3ans">0 = 0: <b>infinitely many solutions</b>.</p>`}`; }
function cramerHTML(S,O){ const A=O.A, B=O.B, D=O.D;
  if(D.z()) return `<p>D = det A = ${mat(A)} = <b>0</b>, so Cramer's rule can't be used: there is no unique solution. Use Gauss to decide between none and infinitely many.</p>`;
  const rep=(j)=>A.map((r,i)=>r.map((v,c)=>c===j?B[i]:v));
  const Ds=[0,1,2].map(j=>det3(rep(j)));
  return `<p class="s3p">D = det ${mat(A)} = <b>${D.h()}</b></p>${[0,1,2].map(j=>`<p class="s3p">D<sub>${V[j]}</sub> = det ${mat(rep(j))} = ${Ds[j].h()} → <b>${V[j]} = ${Ds[j].h()} / ${D.h()} = ${Ds[j].div(D).h()}</b></p>`).join("")}`; }
function inverseHTML(S,O){ const A=O.A, B=O.B, D=O.D;
  if(D.z()) return `<p>det A = 0, so A has <b>no inverse</b>. The system does not have exactly one solution.</p>`;
  const adjA=adj(A), inv=adjA.map(r=>r.map(v=>v.div(D))), X=inv.map(r=>r.reduce((s,v,j)=>s.add(v.mul(q(B[j]))),q(0)));
  return `<p class="s3p">Write AX = B with A = ${mat(A)}, B = ${mat(B.map(v=>[v]))}.</p><p class="s3p">det A = ${D.h()}. A<sup>−1</sup> = <span class="frc"><span>1</span><span>${D.t()}</span></span> · adj(A) = ${mat(inv)}</p><p class="s3p">X = A<sup>−1</sup>B = ${mat(X.map(v=>[v]))}</p><p class="s3ans">(x, y, z) = (${X.map(v=>v.h()).join(", ")})</p>`; }
/* ---------- 3D graph of the three planes ---------- */
const PC=["31,79,209","194,58,82","15,122,108"];
function plotHTML(){ return `<div class="s3plot"><canvas aria-label="3D graph of the three planes"></canvas><div class="s3pl-b"><span>Drag to rotate</span><button type="button" data-v="iso">3D view</button><button type="button" data-v="xy">Top (xy)</button><button type="button" data-v="xz">Front (xz)</button></div><div class="s3leg"></div></div>`; }
function drawPlot(box,S,O){
  const cv=box.querySelector("canvas"), leg=box.querySelector(".s3leg"); let yaw=-0.75, pitch=0.42;
  const L=Math.max(6,...(O.X?O.X.map(v=>Math.ceil(Math.abs(v.val()))+2):[6]));
  leg.innerHTML=S.M.map((r,i)=>`<span><i style="background:rgba(${PC[i]},.75)"></i>Plane ${i+1}: ${eqn(r)}</span>`).join("")+(O.G.kind==="one"?`<span><i style="background:#111;border-radius:50%"></i>Solution (${O.X.map(v=>v.t()).join(", ")})</span>`:O.G.kind==="inf"?`<span><i style="background:#6a3d9a"></i>Line of solutions</span>`:`<span class="no">No point lies on all three planes</span>`);
  const edges=[]; const vs=[]; for(const x of [-L,L]) for(const y of [-L,L]) for(const z of [-L,L]) vs.push([x,y,z]);
  for(let i=0;i<8;i++) for(let j=i+1;j<8;j++){ const d=vs[i].reduce((s,v,k)=>s+(v!==vs[j][k]?1:0),0); if(d===1) edges.push([vs[i],vs[j]]); }
  const polys=S.M.map(r=>{ const n=r.slice(0,3), d=r[3], f=p=>n[0]*p[0]+n[1]*p[1]+n[2]*p[2]-d, pts=[];
    edges.forEach(([a,b])=>{ const fa=f(a), fb=f(b); if(fa===0) pts.push(a); if(fa*fb<0){ const t=fa/(fa-fb); pts.push(a.map((v,k)=>v+t*(b[k]-v))); } });
    const u=[]; pts.forEach(p=>{ if(!u.some(w=>Math.hypot(w[0]-p[0],w[1]-p[1],w[2]-p[2])<1e-6)) u.push(p); });
    if(u.length<3) return null; const c=[0,1,2].map(k=>u.reduce((s,p)=>s+p[k],0)/u.length);
    let e1=Math.abs(n[0])<.9*Math.hypot(...n)?[0,-n[2],n[1]]:[-n[2],0,n[0]]; const e2=[n[1]*e1[2]-n[2]*e1[1],n[2]*e1[0]-n[0]*e1[2],n[0]*e1[1]-n[1]*e1[0]];
    u.sort((p,q2)=>{ const a=Math.atan2((p[0]-c[0])*e2[0]+(p[1]-c[1])*e2[1]+(p[2]-c[2])*e2[2],(p[0]-c[0])*e1[0]+(p[1]-c[1])*e1[1]+(p[2]-c[2])*e1[2]); const b=Math.atan2((q2[0]-c[0])*e2[0]+(q2[1]-c[1])*e2[1]+(q2[2]-c[2])*e2[2],(q2[0]-c[0])*e1[0]+(q2[1]-c[1])*e1[1]+(q2[2]-c[2])*e1[2]); return a-b; });
    return u; });
  let seg=null; if(O.G.kind==="inf"){ const E=O.ps.E, P=t=>E.map(e=>e[0].val()+e[1].val()*t); let lo=-1e3, hi=1e3;
    E.forEach(e=>{ const a=e[0].val(), b=e[1].val(); if(Math.abs(b)<1e-12){ if(Math.abs(a)>L){ lo=1; hi=0; } } else { let t1=(-L-a)/b, t2=(L-a)/b; if(t1>t2) [t1,t2]=[t2,t1]; lo=Math.max(lo,t1); hi=Math.min(hi,t2); } });
    if(lo<hi) seg=[P(lo),P(hi)]; }
  const draw=()=>{ const W=box.clientWidth||0; if(!W) return; const dpr=window.devicePixelRatio||1, H=Math.round(Math.min(W*.85,460));
    cv.width=W*dpr; cv.height=H*dpr; cv.style.width=W+"px"; cv.style.height=H+"px"; const g=cv.getContext("2d"); g.setTransform(dpr,0,0,dpr,0,0); g.clearRect(0,0,W,H);
    const sc=Math.min(W,H)/(L*3.1), cx=W/2, cy=H/2, cyw=Math.cos(yaw), syw=Math.sin(yaw), cp=Math.cos(pitch), sp=Math.sin(pitch);
    const pr=p=>{ const x1=p[0]*cyw-p[1]*syw, y1=p[0]*syw+p[1]*cyw, y2=y1*cp-p[2]*sp, z2=y1*sp+p[2]*cp; return [cx+sc*x1, cy-sc*z2, y2]; };
    g.lineWidth=1; g.strokeStyle="#d5dbe3"; edges.forEach(([a,b])=>{ const A=pr(a),B=pr(b); g.beginPath(); g.moveTo(A[0],A[1]); g.lineTo(B[0],B[1]); g.stroke(); });
    [[0,"x"],[1,"y"],[2,"z"]].forEach(([k,lab])=>{ const a=[0,0,0], b=[0,0,0]; a[k]=-L; b[k]=L; const A=pr(a),B=pr(b); g.strokeStyle="#555"; g.lineWidth=1.3; g.beginPath(); g.moveTo(A[0],A[1]); g.lineTo(B[0],B[1]); g.stroke(); g.fillStyle="#111"; g.font="bold 14px Georgia,serif"; g.fillText(lab,B[0]+4,B[1]-4);
      for(let t=-L+ (L%2); t<=L; t+=2){ if(!t) continue; const p=[0,0,0]; p[k]=t; const P=pr(p); g.fillStyle="#888"; g.fillRect(P[0]-1.5,P[1]-1.5,3,3); } });
    const order=polys.map((u,i)=>u?[i,u.reduce((s,p)=>s+pr(p)[2],0)/u.length]:null).filter(Boolean).sort((a,b)=>b[1]-a[1]);
    order.forEach(([i])=>{ const u=polys[i]; g.beginPath(); u.forEach((p,k)=>{ const P=pr(p); k?g.lineTo(P[0],P[1]):g.moveTo(P[0],P[1]); }); g.closePath(); g.fillStyle=`rgba(${PC[i]},.22)`; g.fill(); g.strokeStyle=`rgba(${PC[i]},.9)`; g.lineWidth=1.6; g.stroke(); });
    if(seg){ const A=pr(seg[0]),B=pr(seg[1]); g.strokeStyle="#6a3d9a"; g.lineWidth=4; g.beginPath(); g.moveTo(A[0],A[1]); g.lineTo(B[0],B[1]); g.stroke(); }
    if(O.X){ const P=pr(O.X.map(v=>v.val())); g.fillStyle="#111"; g.beginPath(); g.arc(P[0],P[1],5.5,0,7); g.fill(); g.strokeStyle="#fff"; g.lineWidth=2; g.stroke();
      g.font="bold 14px Georgia,serif"; const lab=`(${O.X.map(v=>v.t()).join(", ")})`; const w=g.measureText(lab).width; g.fillStyle="rgba(255,255,255,.85)"; g.fillRect(P[0]+8,P[1]-20,w+8,20); g.fillStyle="#111"; g.fillText(lab,P[0]+12,P[1]-5); } };
  let drag=null; cv.onpointerdown=e=>{ drag=[e.clientX,e.clientY,yaw,pitch]; cv.setPointerCapture(e.pointerId); };
  cv.onpointermove=e=>{ if(!drag) return; yaw=drag[2]+(e.clientX-drag[0])*0.01; pitch=Math.max(-1.5,Math.min(1.5,drag[3]+(e.clientY-drag[1])*0.01)); draw(); };
  cv.onpointerup=cv.onpointercancel=()=>{ drag=null; };
  box.querySelectorAll("[data-v]").forEach(b=>b.onclick=()=>{ const v=b.dataset.v; if(v==="iso"){ yaw=-0.75; pitch=0.42; } else if(v==="xy"){ yaw=0; pitch=1.5707; } else { yaw=0; pitch=0; } draw(); });
  if(window.ResizeObserver){ const ro=new ResizeObserver(()=>draw()); ro.observe(box); } else setTimeout(draw,50);
  draw(); }
/* ---------- solved example view ---------- */
const KINDS={one:"Exactly one solution",none:"No solution",inf:"Infinitely many solutions"};
function exampleHTML(S){ const O=solveAll(S);
  const M=[["gauss","Gauss (augmented matrix)",gaussHTML],["gj","Gauss–Jordan (RREF)",gjHTML],["elim","Elimination with equations",elimHTML],["cramer","Cramer's rule",cramerHTML],["inv","Inverse matrix",inverseHTML]];
  return {O,html:`<div class="s3ex"><div class="s3q"><span class="s3tag ${O.G.kind}">${KINDS[O.G.kind]}</span><div class="s3qs">Solve:${sysHTML(S.M)}</div></div>
   <div class="s3tabs">${M.map(([k,t],i)=>`<button type="button" data-t="${k}"${i?"":' class="on"'}>${t}</button>`).join("")}<button type="button" data-t="graph">3D graph</button></div>
   ${M.map(([k,,f],i)=>`<div class="s3pane" data-p="${k}"${i?" hidden":""}>${f(S,O)}</div>`).join("")}<div class="s3pane" data-p="graph" hidden>${plotHTML()}</div></div>`}; }
function bindExample(root,S,O){ let plotted=false;
  root.querySelectorAll(".s3tabs [data-t]").forEach(b=>b.onclick=()=>{ root.querySelectorAll(".s3tabs [data-t]").forEach(x=>x.classList.toggle("on",x===b)); root.querySelectorAll(".s3pane").forEach(p=>p.hidden=p.dataset.p!==b.dataset.t);
    if(b.dataset.t==="graph"&&!plotted){ plotted=true; drawPlot(root.querySelector(".s3plot"),S,O); } }); }
/* ---------- practice ---------- */
const P_inp=(k,lab,w)=>`<input class="s3in" data-k="${k}" type="text" autocomplete="off" aria-label="${lab}"${w?` style="width:${w}px"`:""}>`;
const parse=s=>{ s=String(s||"").trim().replace(/[−–]/g,"-").replace(/\s+/g,""); if(!s) return null; const m=s.match(/^(-?\d+)(?:\/(-?\d+))?$/); if(!m) return NaN; return new Q(+m[1],m[2]?+m[2]:1); };
const same=(a,b)=>a&&!(a!==a)&&a instanceof Q&&a.eq(b);
function practiceSolve(box){ const S=genSystem(Math.random()<.85?"one":pick(["none","inf"])); S.kind="one"; const T=genSystem("one"); const O=solveAll(T);
  box.innerHTML=`<p class="s3p">Solve the system. Type x, y and z (whole numbers or fractions like −3/2).</p>${sysHTML(T.M)}
   <div class="s3row">x = ${P_inp("x","x")} y = ${P_inp("y","y")} z = ${P_inp("z","z")} <button type="button" class="s3b" data-a="chk">Check</button><button type="button" class="s3b o" data-a="sol">Show solution</button><button type="button" class="s3b o" data-a="new">↻ New system</button></div><div class="s3fb"></div><div class="s3sol"></div>`;
  const fb=box.querySelector(".s3fb"), sol=box.querySelector(".s3sol");
  box.querySelector('[data-a="chk"]').onclick=()=>{ let all=true; ["x","y","z"].forEach((k,i)=>{ const e=box.querySelector(`[data-k="${k}"]`), v=parse(e.value), ok=same(v,O.X[i]); e.classList.toggle("ok",ok); e.classList.toggle("bad",!ok&&v!==null); if(!ok) all=false; }); fb.innerHTML=all?`<p class="yes">Correct! (${O.X.map(v=>v.h()).join(", ")})</p>`:`<p class="no">Not yet: the wrong boxes are red. Check by substituting into all three equations.</p>`; };
  box.querySelector('[data-a="sol"]').onclick=()=>{ const ex=exampleHTML(T); sol.innerHTML=ex.html.replace(/<div class="s3q">[\s\S]*?<\/div><\/div>/,""); bindExample(sol,T,ex.O); };
  box.querySelector('[data-a="new"]').onclick=()=>practiceSolve(box); }
function practiceGauss(box){ const T=genSystem("one"), G=gauss(T.M), O=solveAll(T); let k=0;
  const header=`<p class="s3p">Do Gaussian elimination one row operation at a time. Type the new row, then press Check. Swaps are done for you.</p>${sysHTML(T.M)}`;
  const step=()=>{ while(k<G.steps.length&&G.steps[k].row===null) k++;
    const prev=k===0?T.M:G.steps[k-1].M;
    if(k>=G.steps.length){ box.innerHTML=header+`<p class="s3p">Row-echelon form:</p>${mat(G.M,true)}<p class="s3p">Now back-substitute: x = ${P_inp("x","x")} y = ${P_inp("y","y")} z = ${P_inp("z","z")} <button type="button" class="s3b" data-a="fin">Check</button><button type="button" class="s3b o" data-a="new">↻ New system</button></p><div class="s3fb"></div>`;
      box.querySelector('[data-a="fin"]').onclick=()=>{ let all=true; ["x","y","z"].forEach((kk,i)=>{ const e=box.querySelector(`[data-k="${kk}"]`), ok=same(parse(e.value),O.X[i]); e.classList.toggle("ok",ok); e.classList.toggle("bad",!ok); if(!ok) all=false; }); box.querySelector(".s3fb").innerHTML=all?`<p class="yes">Solved! (${O.X.map(v=>v.h()).join(", ")})</p><ul class="s3bs">${O.bs.lines.map(l=>`<li>${l}</li>`).join("")}</ul>`:`<p class="no">Not yet. Start from the bottom row: it has only one variable.</p>`; };
      box.querySelector('[data-a="new"]').onclick=()=>practiceGauss(box); return; }
    const s=G.steps[k]; box.innerHTML=header+`<p class="s3p"><b>Step ${k+1} of ${G.steps.length}.</b> Current matrix:</p>${mat(prev,true)}<p class="s3p">Apply <span class="s3op">${s.op}</span>. Type the new row ${s.row+1}:</p>
     <div class="s3row">[ ${[0,1,2,3].map(j=>P_inp("c"+j,"entry "+(j+1),54)+(j===2?" |":"")).join(" ")} ] <button type="button" class="s3b" data-a="chk">Check</button><button type="button" class="s3b o" data-a="show">Show</button></div><div class="s3fb"></div>`;
    const fb=box.querySelector(".s3fb"), want=s.M[s.row];
    box.querySelector('[data-a="chk"]').onclick=()=>{ let all=true; for(let j=0;j<4;j++){ const e=box.querySelector(`[data-k="c${j}"]`), ok=same(parse(e.value),q(want[j])); e.classList.toggle("ok",ok); e.classList.toggle("bad",!ok); if(!ok) all=false; }
      if(all){ fb.innerHTML=`<p class="yes">Correct!</p>`; setTimeout(()=>{ k++; step(); },650); } else fb.innerHTML=`<p class="no">Not yet. Work entry by entry: ${s.op.replace(/^[^→]*→\s*/,"")}.</p>`; };
    box.querySelector('[data-a="show"]').onclick=()=>{ for(let j=0;j<4;j++){ const e=box.querySelector(`[data-k="c${j}"]`); e.value=q(want[j]).t(); } fb.innerHTML=`<p>New row: [${want.map(v=>q(v).h()).join(", ")}]. ${s.why}</p>`; }; };
  step(); }
function practiceAug(box){ // write the augmented matrix from equations written in mixed form
  const T=genSystem("one"); const vars=["x","y","z"];
  const show=T.M.map(r=>{ const terms=[0,1,2].filter(j=>r[j]!==0).map(j=>[r[j],vars[j]]); const sh=Math.random()<.5?terms.reverse():terms; let s=""; sh.forEach(([a,v],i)=>{ const ab=Math.abs(a); s+=(i?(a<0?" − ":" + "):(a<0?"−":""))+(ab===1?"":ab)+v; }); return `${s} = ${neg(r[3])}`; });
  box.innerHTML=`<p class="s3p">Write the augmented matrix [A | B]. Columns are x, y, z, then the constant. A missing variable gets 0.</p><span class="s3sys">${show.map(x=>`<span>${x}</span>`).join("")}</span>
   <div class="s3grid">${[0,1,2].map(i=>`<div>[ ${[0,1,2,3].map(j=>P_inp(`m${i}${j}`,`row ${i+1} column ${j+1}`,50)+(j===2?" |":"")).join(" ")} ]</div>`).join("")}</div>
   <div class="s3row"><button type="button" class="s3b" data-a="chk">Check</button><button type="button" class="s3b o" data-a="show">Show</button><button type="button" class="s3b o" data-a="new">↻ New system</button></div><div class="s3fb"></div>`;
  const fb=box.querySelector(".s3fb");
  box.querySelector('[data-a="chk"]').onclick=()=>{ let all=true; for(let i=0;i<3;i++) for(let j=0;j<4;j++){ const e=box.querySelector(`[data-k="m${i}${j}"]`), ok=same(parse(e.value),q(T.M[i][j])); e.classList.toggle("ok",ok); e.classList.toggle("bad",!ok); if(!ok) all=false; } fb.innerHTML=all?`<p class="yes">Correct! ${mat(T.M,true)}</p>`:`<p class="no">Not yet: check the order x, y, z and the signs. A missing variable is 0.</p>`; };
  box.querySelector('[data-a="show"]').onclick=()=>{ fb.innerHTML=mat(T.M,true); };
  box.querySelector('[data-a="new"]').onclick=()=>practiceAug(box); }
function practiceClass(box){ const kind=pick(["one","none","inf"]), T=genSystem(kind), O=solveAll(T), opts=["one","none","inf"];
  box.innerHTML=`<p class="s3p">How many solutions does this system have? Use Gauss (or the determinant) to decide.</p>${sysHTML(T.M)}
   <div class="s3row">${opts.map(o=>`<button type="button" class="s3c" data-o="${o}">${KINDS[o]}</button>`).join("")}<button type="button" class="s3b o" data-a="new">↻ New system</button></div><div class="s3fb"></div><div class="s3sol"></div>`;
  box.querySelectorAll("[data-o]").forEach(b=>b.onclick=()=>{ const ok=b.dataset.o===O.G.kind; box.querySelectorAll("[data-o]").forEach(x=>{ x.disabled=true; x.classList.toggle("ok",x.dataset.o===O.G.kind); }); if(!ok) b.classList.add("bad");
    box.querySelector(".s3fb").innerHTML=`<p class="${ok?"yes":"no"}">${ok?"Correct!":"Not quite."} det A = ${O.D.h()}. ${O.D.z()?"det = 0, so not exactly one solution; Gauss decides:":"det ≠ 0, so exactly one solution."}</p>`;
    const ex=exampleHTML(T); box.querySelector(".s3sol").innerHTML=ex.html.replace(/<div class="s3q">[\s\S]*?<\/div><\/div>/,""); bindExample(box.querySelector(".s3sol"),T,ex.O); });
  box.querySelector('[data-a="new"]').onclick=()=>practiceClass(box); }
/* ---------- lab shell ---------- */
function html(){ return `<div class="s3lab"><p class="lead2">Every system here is new each time. Solved examples show five methods and a 3D graph of the three planes; practice checks each answer as you go.</p>
  <div class="s3mode">${[["ex","Solved examples"],["solve","Practice: solve"],["gauss","Practice: Gauss step by step"],["aug","Practice: augmented matrix"],["cls","Practice: how many solutions?"]].map(([k,t],i)=>`<button type="button" data-m="${k}"${i?"":' class="on"'}>${t}</button>`).join("")}</div>
  <div class="s3exctl"><span>Type:</span>${[["one","One solution"],["none","No solution"],["inf","Infinitely many"]].map(([k,t],i)=>`<button type="button" data-k="${k}"${i?"":' class="on"'}>${t}</button>`).join("")}<button type="button" class="s3b" data-new>↻ New example</button></div>
  <div class="s3out"></div></div>`; }
function bind(root){ root.querySelectorAll(".s3lab").forEach(lab=>{ if(lab.dataset.bound) return; lab.dataset.bound=1; const out=lab.querySelector(".s3out"), ctl=lab.querySelector(".s3exctl"); let mode="ex", kind="one";
  const render=()=>{ ctl.hidden=mode!=="ex"; if(mode==="ex"){ const S=genSystem(kind), ex=exampleHTML(S); out.innerHTML=ex.html; bindExample(out,S,ex.O); }
    else if(mode==="solve") practiceSolve(out); else if(mode==="gauss") practiceGauss(out); else if(mode==="aug") practiceAug(out); else practiceClass(out); };
  lab.querySelectorAll("[data-m]").forEach(b=>b.onclick=()=>{ mode=b.dataset.m; lab.querySelectorAll("[data-m]").forEach(x=>x.classList.toggle("on",x===b)); render(); });
  ctl.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{ kind=b.dataset.k; ctl.querySelectorAll("[data-k]").forEach(x=>x.classList.toggle("on",x===b)); render(); });
  ctl.querySelector("[data-new]").onclick=render; render(); }); }
const css=`.s3mode,.s3exctl,.s3tabs{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:0 0 10px}
.s3mode button{border:1.5px solid #111;background:#fff;padding:6px 13px;font:600 15.5px 'EB Garamond',Georgia,serif;cursor:pointer}
.s3mode button.on{background:#111;color:#fff}
.s3exctl span{font-variant:small-caps;font-weight:600;letter-spacing:.05em}
.s3exctl button,.s3tabs button{border:1.5px solid #c2571a;background:#fff;color:#c2571a;padding:3px 12px;border-radius:999px;font:500 15px 'EB Garamond',Georgia,serif;cursor:pointer}
.s3exctl button.on,.s3tabs button.on{background:#c2571a;color:#fff}
.s3b{border:1.5px solid #0f7a6c;background:#0f7a6c;color:#fff;padding:5px 13px;font:600 15.5px 'EB Garamond',Georgia,serif;cursor:pointer}
.s3b.o{background:#fff;color:#0f7a6c}
.s3ex{border:1.5px solid #111;background:#fff;padding:12px 14px}
.s3q{display:flex;flex-wrap:wrap;gap:10px;align-items:flex-start;margin-bottom:10px}
.s3qs{font-size:18px;display:flex;gap:10px;align-items:center}
.s3tag{font-size:12.5px;letter-spacing:.1em;text-transform:uppercase;border-radius:999px;padding:2px 10px;color:#fff;background:#0f7a6c}
.s3tag.none{background:#b3261e}.s3tag.inf{background:#6a3d9a}
.s3sys{display:inline-flex;flex-direction:column;border-left:2px solid #111;padding:2px 0 2px 10px;margin:4px 0 8px;font-size:17.5px;line-height:1.5}
.s3pane{margin-top:6px}
.s3p{margin:6px 0;font-size:16.5px}
.s3steps{margin:6px 0;padding-left:22px;font-size:16px}
.s3steps>li{margin:0 0 10px}
.s3op{display:inline-block;background:#fff3e8;border:1px solid #e7b48a;border-radius:6px;padding:0 8px;font-weight:600;white-space:nowrap}
.s3why{font-style:italic;color:#555;font-size:15px}
.s3bs{margin:4px 0;padding-left:20px;font-size:16px;line-height:1.7}
.s3ans{font-size:18px;font-weight:700;color:#0f7a6c;margin:8px 0}.s3ans.no{color:#b3261e;font-weight:500}
.s3m{display:inline-grid;grid-template-columns:repeat(var(--n),auto);column-gap:.75em;row-gap:.12em;position:relative;padding:.2em .6em;margin:4px .25em;vertical-align:middle;line-height:1.25}
.s3m::before,.s3m::after{content:"";position:absolute;top:0;bottom:0;width:.34em;border:.09em solid currentColor}
.s3m::before{left:0;border-right:0}.s3m::after{right:0;border-left:0}
.s3m>i{font-style:normal;text-align:center;min-width:1.1em}
.s3m.aug>i.ab{border-left:1.5px solid #888;padding-left:.6em}
.s3row{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:8px 0;font-size:17px}
.s3grid{display:flex;flex-direction:column;gap:6px;margin:8px 0;font-size:17px}
.s3in{width:58px;height:38px;border:1.5px solid #9aa7b8;border-radius:7px;text-align:center;font:600 17px 'EB Garamond',Georgia,serif}
.s3in.ok{border-color:#1a7f37;background:#e8f6ec}.s3in.bad{border-color:#c5221f;background:#fdecea}
.s3c{border:1.5px solid #bbb;background:#fff;padding:6px 12px;border-radius:8px;font:16px 'EB Garamond',Georgia,serif;cursor:pointer}
.s3c.ok{border-color:#1a7f37;background:#e8f6ec}.s3c.bad{border-color:#c5221f;background:#fdecea}
.s3fb .yes,.s3fb .no{font-weight:600;margin:6px 0}.s3fb .yes{color:#137333}.s3fb .no{color:#b3261e}
.s3plot{border:1.5px solid #d9e0ea;border-radius:14px;background:#fbfcfe;padding:6px;touch-action:none}
.s3plot canvas{display:block;width:100%;cursor:grab}
.s3pl-b{display:flex;flex-wrap:wrap;gap:6px;align-items:center;justify-content:center;font-size:14px;color:#666;font-style:italic;margin:4px 0}
.s3pl-b button{border:1px solid #999;background:#fff;border-radius:999px;padding:2px 10px;font:14px 'EB Garamond',Georgia,serif;cursor:pointer;font-style:normal}
.s3leg{display:flex;flex-direction:column;gap:3px;font-size:15.5px;padding:4px 6px}
.s3leg i{display:inline-block;width:12px;height:12px;margin-right:6px;vertical-align:-1px;border-radius:3px}
.s3leg .no{color:#b3261e;font-style:italic}
@media (max-width:640px){.s3in{width:48px}.s3qs{flex-direction:column;align-items:flex-start}.s3steps{padding-left:18px}}`;
const st=document.createElement("style"); st.textContent=css; document.head.appendChild(st);
window.A2S3={html,bind,_test:{genSystem,gauss,solveAll,backSub,paramSol,gaussJordan,det3,adj,Q,exampleHTML}};
})();
