/* Systems Lab: guided, step-by-step practice for every method of solving systems.
   Each step has boxes that turn green or red as the student types (like the division and cross-table labs).
   Methods: graphing, substitution, elimination, Cramer's rule, inverse matrix (2 × 2), elimination (3 × 3), Gaussian elimination (3 × 3).
   All numbers are generated and checked here. Used on the Systems page (methods.js). */
(function(){
"use strict";
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1)), pick=a=>a[Math.floor(Math.random()*a.length)];
const nz=(a,b)=>{ let v=0; while(!v) v=R(a,b); return v; };
const gcd=(a,b)=>{ a=Math.abs(a); b=Math.abs(b); while(b) [a,b]=[b,a%b]; return a; };
const N=v=>{ if(Math.abs(v-Math.round(v))<1e-9){ v=Math.round(v); return v<0?"−"+(-v):String(v); } for(const d of [2,3,4,5,6,7,8,9,10,12]){ const n=v*d; if(Math.abs(n-Math.round(n))<1e-9){ const k=Math.round(n); return `${k<0?"−":""}${Math.abs(k)}⁄${d}`; } } return String(+v.toFixed(3)); };
const V=["x","y","z"];
function eqS(c,r,vars=V){ let s=""; c.forEach((a,i)=>{ if(!a) return; const m=Math.abs(a); s+=s?(a<0?" − ":" + "):(a<0?"−":""); s+=(m===1?"":m)+vars[i]; }); return (s||"0")+" = "+N(r); }
const lin=(m,b,v="x")=>{ let s=m===0?"":(m===1?"":m===-1?"−":N(m))+v; if(b) s+=s?(b<0?" − "+N(-b):" + "+N(b)):N(b); return s||"0"; };
const det2=(a,b,c,d)=>a*d-b*c;
const det3=M=>M[0][0]*(M[1][1]*M[2][2]-M[1][2]*M[2][1])-M[0][1]*(M[1][0]*M[2][2]-M[1][2]*M[2][0])+M[0][2]*(M[1][0]*M[2][1]-M[1][1]*M[2][0]);
const box=(k,lab,w)=>`<input class="zs-b" data-f="${k}" type="text" inputmode="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="${lab}"${w?` style="width:${w}em"`:""}>`;
const MX=(rows,bar)=>`<span class="zs-mx${bar?" zs-det":""}" style="--n:${rows[0].length}">${rows.map(r=>r.map(v=>`<i>${typeof v==="number"?N(v):v}</i>`).join("")).join("")}</span>`;
const AUG=rows=>`<span class="zs-mx zs-aug" style="--n:${rows[0].length}">${rows.map(r=>r.map((v,j)=>`<i${j===r.length-1?' class="zs-rhs"':""}>${typeof v==="number"?N(v):v}</i>`).join("")).join("")}</span>`;
function pv(s){ s=String(s==null?"":s).trim().replace(/[−–—]/g,"-").replace(/⁄/g,"/").replace(/\s+/g,""); if(s===""||s==="-"||s==="+") return null;
  const m=s.match(/^([+-]?)(\d*\.?\d+)(?:\/(\d*\.?\d+))?$/); if(!m) return NaN; const v=+m[2]/(m[3]?+m[3]:1); return m[1]==="-"?-v:v; }
const close=(a,b)=>Math.abs(a-b)<1e-7;
const prop=(u,v)=>u.some(x=>Math.abs(x)>1e-9)&&u.every((_,i)=>u.every((_,j)=>Math.abs(u[i]*v[j]-u[j]*v[i])<1e-6*(1+Math.abs(u[i]*v[j]))));

/* ---------- system generators (integer solutions) ---------- */
function sys2(){ for(let t=0;t<400;t++){ const x=R(-6,6), y=R(-6,6), a1=nz(-6,7), b1=nz(-6,7), a2=nz(-6,7), b2=nz(-6,7); if(!det2(a1,b1,a2,b2)||a1*b2===a2*b1) continue; if(Math.abs(b1)===Math.abs(b2)&&Math.random()<.5) continue;
  return {A:[[a1,b1],[a2,b2]],c:[a1*x+b1*y,a2*x+b2*y],s:[x,y]}; } }
function sys3(){ for(let t=0;t<800;t++){ const s=[R(-4,4),R(-4,4),R(-4,4)], A=[0,1,2].map(()=>[nz(-4,5),nz(-4,5),nz(-3,4)]); if(!det3(A)) continue;
  const c=A.map(r=>r[0]*s[0]+r[1]*s[1]+r[2]*s[2]); if(c.some(v=>Math.abs(v)>30)) continue;
  const z12=[A[1][2]*A[0][0]-A[0][2]*A[1][0],A[1][2]*A[0][1]-A[0][2]*A[1][1]]; if(!z12[0]&&!z12[1]) continue;
  return {A,c,s}; } }

/* ---------- methods ---------- */
const M={};
M.graph={name:"Graphing",tip:"Rewrite each equation as y = mx + b, graph both lines, and read the point where they cross.",
 gen(){ for(let t=0;t<300;t++){ const x=R(-4,4), y=R(-4,4), m1=pick([1,2,3,-1,-2,-3,0.5,-0.5]), m2=pick([1,2,-1,-2,3,-3,0.5,-0.5]); if(m1===m2) continue; const b1=y-m1*x, b2=y-m2*x; if(Math.abs(b1)>7||Math.abs(b2)>7||!Number.isInteger(b1)||!Number.isInteger(b2)) continue;
   const std=m=>m===0.5?[-1,2]:m===-0.5?[1,2]:[-m,1]; const [A,B]=std(m2), C=B*b2; // A x + B y = C
   return {s:[x,y],m:[m1,m2],b:[b1,b2],show:[`y = ${lin(m1,b1)}`,eqS([A,B],C)]}; } },
 html(P){ return `<div class="zs-sys"><span>${P.show[0]}</span><span>${P.show[1]}</span></div>
  <div class="zs-st"><b>Step 1.</b> Write each line as y = mx + b.</div>
  <div class="zs-row">Line 1: slope m = ${box("m1","Line 1 slope")} y-intercept b = ${box("b1","Line 1 y-intercept")}</div>
  <div class="zs-row">Line 2: slope m = ${box("m2","Line 2 slope")} y-intercept b = ${box("b2","Line 2 y-intercept")}</div>
  <p class="zs-m" data-m="1"></p><div class="zs-g" data-o="g"></div>
  <div class="zs-st"><b>Step 2.</b> Read the point where the lines cross.</div>
  <div class="zs-row">( ${box("x","x")} , ${box("y","y")} )</div>`; },
 check(P,v,mk,msg,out){ let ok1=true; [["m1",P.m[0]],["b1",P.b[0]],["m2",P.m[1]],["b2",P.b[1]]].forEach(([k,t])=>{ const r=mk(k,t); if(r!==true) ok1=false; });
   msg(1,ok1?"Both lines are right. Here is the graph:":"Hint: get y alone. For the second line, move the x-term and divide by the y-coefficient.");
   const g=out("g"); if(ok1&&!g.dataset.done&&window.A2PLOT){ g.dataset.done=1; g.innerHTML=A2PLOT.plot({f:[x=>P.m[0]*x+P.b[0],x=>P.m[1]*x+P.b[1]],xr:[-8,8],yr:[-8,8],eq:true,cap:"Where do the lines cross?"}); } else if(!ok1){ g.innerHTML=""; delete g.dataset.done; }
   return [mk("x",P.s[0]),mk("y",P.s[1])].every(x=>x===true)&&ok1; },
 fill:P=>({m1:P.m[0],b1:P.b[0],m2:P.m[1],b2:P.b[1],x:P.s[0],y:P.s[1]})};

M.sub={name:"Substitution",tip:"Replace the isolated variable in the other equation, solve for the remaining variable, then substitute back.",
 gen(){ for(let t=0;t<300;t++){ const sv=pick([1,1,0]), ov=1-sv, s=[R(-6,6),R(-6,6)], m=nz(-4,4), k=s[sv]-m*s[ov], a=[nz(-5,6),nz(-5,6)]; // isolated: var sv = m·(var ov) + k ; other: a0 x + a1 y = c
   const comb=a[ov]+a[sv]*m; if(!comb||Math.abs(k)>12) continue; const c=a[0]*s[0]+a[1]*s[1];
   return {s,sv,ov,m,k,a,c,comb,cst:a[sv]*k}; } },
 html(P){ const S=V[P.sv], O=V[P.ov]; return `<div class="zs-sys"><span>${S} = ${lin(P.m,P.k,O)}</span><span>${eqS(P.a,P.c)}</span></div>
  <div class="zs-st"><b>Step 1.</b> Substitute ${S} = ${lin(P.m,P.k,O)} into the second equation and simplify the left side.</div>
  <div class="zs-row">${P.sv===1?`${lin(P.a[0],0,"x")} + (${N(P.a[1])})(${lin(P.m,P.k,"x")})`:`(${N(P.a[0])})(${lin(P.m,P.k,"y")}) ${P.a[1]<0?"−":"+"} ${lin(Math.abs(P.a[1]),0,"y")}`} = ${N(P.c)}</div>
  <div class="zs-row">${box("co",`coefficient of ${O}`)} ${O} + ${box("k","constant")} = ${N(P.c)}</div><p class="zs-m" data-m="1"></p>
  <div class="zs-st"><b>Step 2.</b> Solve for ${O}.</div><div class="zs-row">${O} = ${box(O,O)}</div>
  <div class="zs-st"><b>Step 3.</b> Substitute back into ${S} = ${lin(P.m,P.k,O)}.</div><div class="zs-row">${S} = ${box(S,S)}</div>`; },
 check(P,v,mk,msg){ const a=mk("co",P.comb), b=mk("k",P.cst); msg(1,a===true&&b===true?`So ${N(P.comb)}${V[P.ov]} = ${N(P.c-P.cst)}.`:a===false||b===false?`Distribute ${N(P.a[P.sv])} to both terms, then combine the ${V[P.ov]}-terms.`:"");
   return [a,b,mk(V[P.ov],P.s[P.ov]),mk(V[P.sv],P.s[P.sv])].every(x=>x===true); },
 fill:P=>({co:P.comb,k:P.cst,[V[P.ov]]:P.s[P.ov],[V[P.sv]]:P.s[P.sv]})};

M.elim={name:"Elimination",tip:"Multiply the equations so the y-terms are opposites, add the equations, solve for x, then find y.",
 gen(){ const p=sys2(); return p; },
 html(P){ const [a1,b1]=P.A[0], [a2,b2]=P.A[1]; return `<div class="zs-sys"><span>(1) ${eqS(P.A[0],P.c[0])}</span><span>(2) ${eqS(P.A[1],P.c[1])}</span></div>
  <div class="zs-st"><b>Step 1.</b> Choose multipliers that make the <b>y</b>-terms opposites.</div>
  <div class="zs-row">Multiply (1) by ${box("k1","multiplier for equation 1")} and (2) by ${box("k2","multiplier for equation 2")}</div><p class="zs-m" data-m="1"></p>
  <div class="zs-st"><b>Step 2.</b> Add the new equations. The y-terms cancel.</div><div class="zs-row">${box("cx","coefficient of x")} x = ${box("cc","constant")}</div><p class="zs-m" data-m="2"></p>
  <div class="zs-st"><b>Step 3.</b> Solve for x, then substitute into (1) to find y.</div><div class="zs-row">x = ${box("x","x")} &nbsp; y = ${box("y","y")}</div>`; },
 check(P,v,mk,msg,out,el){ const [a1,b1]=P.A[0], [a2,b2]=P.A[1]; const k1=v("k1"), k2=v("k2"); let kOk=null;
   if(k1!==null&&k2!==null&&!isNaN(k1)&&!isNaN(k2)){ kOk=!!k1&&!!k2&&close(k1*b1+k2*b2,0); el("k1").className="zs-b "+(kOk?"ok":"bad"); el("k2").className="zs-b "+(kOk?"ok":"bad"); }
   else ["k1","k2"].forEach(k=>el(k).className="zs-b");
   msg(1,kOk?`(1)×${N(k1)}: ${eqS([k1*a1,k1*b1],k1*P.c[0])} &nbsp;&nbsp; (2)×${N(k2)}: ${eqS([k2*a2,k2*b2],k2*P.c[1])}`:kOk===false?`The y-terms must add to 0: ${N(b1)}·k₁ + ${N(b2)}·k₂ = 0. Try k₁ = ${N(Math.abs(b2))}, k₂ = ${N(b1*b2>0?-Math.abs(b1):Math.abs(b1))}.`:"");
   let s2=null; if(kOk){ const A=mk("cx",k1*a1+k2*a2), B=mk("cc",k1*P.c[0]+k2*P.c[1]); s2=A===true&&B===true; msg(2,s2?"":A===false||B===false?"Add the x-terms together and the right sides together.":""); } else { ["cx","cc"].forEach(k=>el(k).className="zs-b"); msg(2,""); }
   return !!kOk&&s2&&mk("x",P.s[0])===true&&mk("y",P.s[1])===true; },
 fill:P=>{ const [a1,b1]=P.A[0], [a2,b2]=P.A[1], g=gcd(b1,b2), k1=b2/g, k2=-b1/g; return {k1,k2,cx:k1*a1+k2*a2,cc:k1*P.c[0]+k2*P.c[1],x:P.s[0],y:P.s[1]}; }};

M.cramer={name:"Cramer's rule",tip:"D uses the coefficients. For Dx replace the x-column with the constants; for Dy replace the y-column. Then x = Dx ÷ D and y = Dy ÷ D.",
 gen:()=>sys2(),
 html(P){ const [[a1,b1],[a2,b2]]=P.A, [c1,c2]=P.c; return `<div class="zs-sys"><span>${eqS(P.A[0],c1)}</span><span>${eqS(P.A[1],c2)}</span></div>
  <div class="zs-st"><b>Step 1.</b> Find the three determinants (ad − bc).</div>
  <div class="zs-row">D = ${MX([[a1,b1],[a2,b2]],1)} = ${box("D","D")}</div>
  <div class="zs-row">D<sub>x</sub> = ${MX([[c1,b1],[c2,b2]],1)} = ${box("Dx","D x")}</div>
  <div class="zs-row">D<sub>y</sub> = ${MX([[a1,c1],[a2,c2]],1)} = ${box("Dy","D y")}</div><p class="zs-m" data-m="1"></p>
  <div class="zs-st"><b>Step 2.</b> Divide.</div><div class="zs-row">x = D<sub>x</sub> ÷ D = ${box("x","x")} &nbsp; y = D<sub>y</sub> ÷ D = ${box("y","y")}</div>`; },
 check(P,v,mk,msg){ const [[a1,b1],[a2,b2]]=P.A, [c1,c2]=P.c, D=det2(a1,b1,a2,b2), Dx=det2(c1,b1,c2,b2), Dy=det2(a1,c1,a2,c2);
   const r=[mk("D",D),mk("Dx",Dx),mk("Dy",Dy)]; msg(1,r.includes(false)?"Multiply down the main diagonal, then subtract the product of the other diagonal.":"");
   return r.every(x=>x===true)&&mk("x",P.s[0])===true&&mk("y",P.s[1])===true; },
 fill:P=>{ const [[a1,b1],[a2,b2]]=P.A, [c1,c2]=P.c; return {D:det2(a1,b1,a2,b2),Dx:det2(c1,b1,c2,b2),Dy:det2(a1,c1,a2,c2),x:P.s[0],y:P.s[1]}; }};

M.inverse={name:"Inverse matrix",tip:"Write AX = B. Then X = A⁻¹B, where A⁻¹ = (1 ÷ det A) times [d −b; −c a].",
 gen(){ for(let t=0;t<200;t++){ const p=sys2(); const [[a,b],[c,d]]=p.A; if(Math.abs(det2(a,b,c,d))<=12) return p; } return sys2(); },
 html(P){ const [[a,b],[c,d]]=P.A; return `<div class="zs-sys"><span>${eqS(P.A[0],P.c[0])}</span><span>${eqS(P.A[1],P.c[1])}</span></div>
  <div class="zs-st"><b>Step 1.</b> Write the system as AX = B.</div><div class="zs-row">${MX([[a,b],[c,d]])}${MX([["x"],["y"]])} = ${MX([[P.c[0]],[P.c[1]]])}</div>
  <div class="zs-st"><b>Step 2.</b> det A = ad − bc = ${box("det","determinant of A")}</div>
  <div class="zs-st"><b>Step 3.</b> Swap a and d, change the signs of b and c:</div>
  <div class="zs-row">A⁻¹ = <span class="zs-fr"><span>1</span><span data-o="dd">det A</span></span> <span class="zs-mx" style="--n:2"><i>${box("i11","row 1 column 1",2.6)}</i><i>${box("i12","row 1 column 2",2.6)}</i><i>${box("i21","row 2 column 1",2.6)}</i><i>${box("i22","row 2 column 2",2.6)}</i></span></div><p class="zs-m" data-m="1"></p>
  <div class="zs-st"><b>Step 4.</b> Multiply X = A⁻¹B.</div><div class="zs-row">x = ${box("x","x")} &nbsp; y = ${box("y","y")}</div>`; },
 check(P,v,mk,msg,out){ const [[a,b],[c,d]]=P.A, D=det2(a,b,c,d); const r=mk("det",D); out("dd").textContent=r===true?N(D):"det A";
   const e=[mk("i11",d),mk("i12",-b),mk("i21",-c),mk("i22",a)]; msg(1,e.includes(false)?`Swap ${N(a)} and ${N(d)}; change the signs of ${N(b)} and ${N(c)}.`:e.every(x=>x===true)&&r===true?`x = (1 ÷ ${N(D)})(${N(d)}·${N(P.c[0])} + ${N(-b)}·${N(P.c[1])}),  y = (1 ÷ ${N(D)})(${N(-c)}·${N(P.c[0])} + ${N(a)}·${N(P.c[1])})`:"");
   return r===true&&e.every(x=>x===true)&&mk("x",P.s[0])===true&&mk("y",P.s[1])===true; },
 fill:P=>{ const [[a,b],[c,d]]=P.A; return {det:det2(a,b,c,d),i11:d,i12:-b,i21:-c,i22:a,x:P.s[0],y:P.s[1]}; }};

const comb=(E1,E2,j)=>{ const p=E1[j], q=E2[j]; return E1.map((v,i)=>q*v-p*E2[i]); }; // eliminates variable j
M.elim3={name:"3 × 3 elimination",tip:"Eliminate z twice (from two different pairs) to get two equations in x and y. Solve that 2 × 2 system, then find z.",
 gen:()=>sys3(),
 html(P){ return `<div class="zs-sys">${P.A.map((r,i)=>`<span>(${i+1}) ${eqS(r,P.c[i])}</span>`).join("")}</div>
  <div class="zs-st"><b>Step 1.</b> Use (1) and (2) to eliminate z.</div><div class="zs-row">${box("a1","x coefficient")} x + ${box("b1","y coefficient")} y = ${box("c1","constant")}</div><p class="zs-m" data-m="1"></p>
  <div class="zs-st"><b>Step 2.</b> Use (1) and (3), or (2) and (3), to eliminate z again.</div><div class="zs-row">${box("a2","x coefficient")} x + ${box("b2","y coefficient")} y = ${box("c2","constant")}</div><p class="zs-m" data-m="2"></p>
  <div class="zs-st"><b>Step 3.</b> Solve the 2 × 2 system from Steps 1 and 2.</div><div class="zs-row">x = ${box("x","x")} &nbsp; y = ${box("y","y")}</div>
  <div class="zs-st"><b>Step 4.</b> Substitute into any original equation.</div><div class="zs-row">z = ${box("z","z")}</div>`; },
 check(P,v,mk,msg,out,el){ const E=P.A.map((r,i)=>[...r,P.c[i]]), drop=w=>[w[0],w[1],w[3]];
   const T1=drop(comb(E[0],E[1],2)), T2=[drop(comb(E[0],E[2],2)),drop(comb(E[1],E[2],2))];
   const rowCheck=(ks,targets,n)=>{ const u=ks.map(v); if(u.some(x=>x===null)){ ks.forEach(k=>el(k).className="zs-b"); msg(n,""); return null; } if(u.some(x=>isNaN(x))){ ks.forEach(k=>el(k).className="zs-b bad"); return false; }
     const ok=targets.some(t=>prop(u,t)); ks.forEach(k=>el(k).className="zs-b "+(ok?"ok":"bad")); return ok; };
   const r1=rowCheck(["a1","b1","c1"],[T1],1); msg(1,r1===false?`Multiply so the z-terms are opposites (for example (1)×${N(P.A[1][2])} and (2)×${N(-P.A[0][2])}), then add.`:r1?"z is gone.":"");
   let r2=rowCheck(["a2","b2","c2"],T2,2); if(r2&&r1){ const u1=["a1","b1","c1"].map(v), u2=["a2","b2","c2"].map(v); if(prop(u1,u2)){ r2=false; ["a2","b2","c2"].forEach(k=>el(k).className="zs-b bad"); } }
   msg(2,r2===false?"Use a different pair of equations from Step 1, and make the z-terms cancel.":r2?"Now you have two equations in x and y.":"");
   return !!r1&&!!r2&&["x","y","z"].every((k,i)=>mk(k,P.s[i])===true); },
 fill:P=>{ const E=P.A.map((r,i)=>[...r,P.c[i]]), a=comb(E[0],E[1],2), b=comb(E[0],E[2],2); const g=w=>{ const d=Math.abs(gcd(gcd(w[0],w[1]),w[3]))||1; return w.map(x=>x/d); }; const A=g(a), B=g(b);
   return {a1:A[0],b1:A[1],c1:A[3],a2:B[0],b2:B[1],c2:B[3],x:P.s[0],y:P.s[1],z:P.s[2]}; }};

M.gauss={name:"Gaussian elimination",tip:"Write the augmented matrix. Use row operations to make zeros below each pivot (row-echelon form), then back-substitute from the bottom row.",
 gen(){ for(let t=0;t<200;t++){ const p=sys3(); if(!p) continue; const E=p.A.map((r,i)=>[...r,p.c[i]]); if(!E[0][0]) continue; const r2=comb(E[0],E[1],0), r3=comb(E[0],E[2],0); if(!r2[1]) continue; const r3b=comb(r2,r3,1); if(!r3b[2]) continue; p.E=E; p.r2=r2; p.r3=r3; p.r3b=r3b; return p; } },
 html(P){ const cell=(k,l)=>`<i>${box(k,l,2.4)}</i>`;
  return `<div class="zs-sys">${P.A.map(r=>`<span>${eqS(r,P.c[P.A.indexOf(r)])}</span>`).join("")}</div>
  <div class="zs-st"><b>Step 1.</b> Write the augmented matrix.</div>
  <div class="zs-row"><span class="zs-mx zs-aug" style="--n:4">${[0,1,2].map(i=>[0,1,2,3].map(j=>`<i${j===3?' class="zs-rhs"':""}>${box(`m${i}${j}`,`row ${i+1} column ${j+1}`,2.4)}</i>`).join("")).join("")}</span></div><p class="zs-m" data-m="1"></p>
  <div class="zs-st"><b>Step 2.</b> Make zeros below the first pivot. Replace R₂ and R₃ with combinations of R₁.</div>
  <div class="zs-row"><span class="zs-mx zs-aug" style="--n:4"><i data-o="r1a">·</i><i data-o="r1b">·</i><i data-o="r1c">·</i><i class="zs-rhs" data-o="r1d">·</i><i>0</i>${cell("p21","R2 column 2")}${cell("p22","R2 column 3")}<i class="zs-rhs">${box("p23","R2 right side",2.4)}</i><i>0</i>${cell("p31","R3 column 2")}${cell("p32","R3 column 3")}<i class="zs-rhs">${box("p33","R3 right side",2.4)}</i></span></div><p class="zs-m" data-m="2"></p>
  <div class="zs-st"><b>Step 3.</b> Make a zero below the second pivot. Replace R₃ with a combination of the new R₂ and R₃.</div>
  <div class="zs-row">R₃: <span class="zs-mx zs-aug" style="--n:4"><i>0</i><i>0</i>${cell("q32","R3 column 3")}<i class="zs-rhs">${box("q33","R3 right side",2.4)}</i></span></div><p class="zs-m" data-m="3"></p>
  <div class="zs-st"><b>Step 4.</b> Back-substitute: bottom row first.</div><div class="zs-row">z = ${box("z","z")} &nbsp; y = ${box("y","y")} &nbsp; x = ${box("x","x")}</div>`; },
 check(P,v,mk,msg,out,el){ let s1=true; for(let i=0;i<3;i++) for(let j=0;j<4;j++){ const r=mk(`m${i}${j}`,P.E[i][j]); if(r!==true) s1=false; }
   ["a","b","c","d"].forEach((k,j)=>out("r1"+k).textContent=s1?N(P.E[0][j]):"·");
   msg(1,s1?"":"Each row is one equation: the x, y and z coefficients, then the constant after the bar.");
   const rowCheck=(ks,t,n,hint)=>{ const u=ks.map(v); if(u.some(x=>x===null)){ ks.forEach(k=>el(k).className="zs-b"); return null; } const ok=!u.some(isNaN)&&prop(u,t); ks.forEach(k=>el(k).className="zs-b "+(ok?"ok":"bad")); return ok; };
   const a=rowCheck(["p21","p22","p23"],P.r2.slice(1)), b=rowCheck(["p31","p32","p33"],P.r3.slice(1));
   msg(2,a===false||b===false?`For R₂ try ${N(P.E[0][0])}·R₂ − (${N(P.E[1][0])})·R₁ so the first entry becomes 0. Do the same for R₃.`:"");
   const c=rowCheck(["q32","q33"],P.r3b.slice(2)); msg(3,c===false?`Use the two new rows: (${N(P.r2[1])})·R₃ − (${N(P.r3[1])})·R₂ makes the y-entry 0.`:"");
   return s1&&a&&b&&c&&["x","y","z"].every((k,i)=>mk(k,P.s[i])===true); },
 fill:P=>{ const o={}; for(let i=0;i<3;i++) for(let j=0;j<4;j++) o[`m${i}${j}`]=P.E[i][j]; const g=w=>{ const d=w.reduce((s,x)=>gcd(s,x),0)||1; return w.map(x=>x/d); };
   const r2=g(P.r2), r3=g(P.r3), r3b=g(comb(r2,r3,1)); o.p21=r2[1]; o.p22=r2[2]; o.p23=r2[3]; o.p31=r3[1]; o.p32=r3[2]; o.p33=r3[3]; o.q32=r3b[2]; o.q33=r3b[3]; o.x=P.s[0]; o.y=P.s[1]; o.z=P.s[2]; return o; }};


/* ---------- Sarrus' rule: copy the first two columns to the right, add the ↘ products, subtract the ↗ products ---------- */
const sarrusParts=A=>{ const E=A.map(r=>[...r,r[0],r[1]]); const dn=[0,1,2].map(c=>E[0][c]*E[1][c+1]*E[2][c+2]), up=[0,1,2].map(c=>E[2][c]*E[1][c+1]*E[0][c+2]); return {E,dn,up,det:dn[0]+dn[1]+dn[2]-up[0]-up[1]-up[2]}; };
function sarrusGrid(A,pre,typed){ // 3 × 5 grid; columns 4–5 typed by the student (or shown)
  const cells=[]; for(let i=0;i<3;i++) for(let j=0;j<5;j++){ const v=j<3?A[i][j]:A[i][j-3]; cells.push(j<3?`<i>${N(v)}</i>`:typed?`<i class="zs-cp">${box(`${pre}c${i}${j}`,`row ${i+1} copied column ${j-2}`,2.3)}</i>`:`<i class="zs-cp">${N(v)}</i>`); }
  const ln=(x1,y1,x2,y2,c)=>`<line x1="${x1*20+10}" y1="${y1*20+10}" x2="${x2*20+10}" y2="${y2*20+10}" class="${c}"/>`;
  const L=[0,1,2].map(c=>ln(c,0,c+2,2,"dn")).join("")+[0,1,2].map(c=>ln(c,2,c+2,0,"up")).join("");
  return `<div class="zs-sar${typed?"":" on"}" data-o="${pre}grid"><div class="zs-sg">${cells.join("")}</div><svg viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true">${L}</svg><span class="zs-sb l"></span><span class="zs-sb r"></span></div>`; }
function layoutSar(g){ const cs=[...g.querySelectorAll(".zs-sg>i")]; if(cs.length<15) return; const G=g.getBoundingClientRect(); if(!G.width) return;
  const c=i=>{ const r=cs[i].getBoundingClientRect(); return [r.left+r.width/2-G.left,r.top+r.height/2-G.top]; };
  const sv=g.querySelector("svg"); sv.setAttribute("viewBox",`0 0 ${G.width} ${G.height}`); sv.setAttribute("preserveAspectRatio","none");
  const L=(a,b,k)=>{ const [x1,y1]=c(a), [x2,y2]=c(b); return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${k}"/>`; };
  sv.innerHTML=[0,1,2].map(j=>L(j,10+j+2,"dn")).join("")+[0,1,2].map(j=>L(10+j,j+2,"up")).join("");
  const r3=cs[2].getBoundingClientRect(); g.querySelector(".zs-sb.r").style.left=(r3.right-G.left+2)+"px"; }
window.addEventListener("resize",()=>document.querySelectorAll(".zs-sar").forEach(layoutSar));
const sarrusSteps=(pre)=>`<div class="zs-row"><span class="zs-dn">↘ down</span> ${[0,1,2].map(k=>box(`${pre}d${k}`,`down product ${k+1}`)).join(" + ")} </div>
  <div class="zs-row"><span class="zs-up">↗ up</span> ${[0,1,2].map(k=>box(`${pre}u${k}`,`up product ${k+1}`)).join(" + ")} </div>`;
function sarrusCheck(A,pre,mk,el,out,msg,n){ const S=sarrusParts(A); let cp=true; for(let i=0;i<3;i++) for(let j=3;j<5;j++){ const r=mk(`${pre}c${i}${j}`,A[i][j-3]); if(r!==true) cp=false; }
  const g=out(pre+"grid"); if(g.classList){ g.classList.toggle("on",cp); layoutSar(g); }
  // products may be typed in any order within each direction
  const any=(keys,targets)=>{ const left=targets.slice(); let all=true; keys.forEach(k=>{ const e=el(k), x=pv(e.value); if(x===null){ e.className="zs-b"; all=false; return; } const i=left.findIndex(t=>!isNaN(x)&&close(x,t)); if(i>=0){ left.splice(i,1); e.className="zs-b ok"; } else { e.className="zs-b bad"; all=false; } }); return all; };
  const d=any([0,1,2].map(k=>`${pre}d${k}`),S.dn), u=any([0,1,2].map(k=>`${pre}u${k}`),S.up);
  if(msg) msg(n,!cp?"Copy column 1 and then column 2 to the right of the matrix.":d&&u?`det = (${S.dn.map(N).join(" + ")}) − (${S.up.map(N).join(" + ")}) = ${N(S.det)}`:"Follow each blue line ↘ and multiply its three numbers; then each red line ↗.");
  return {ok:cp&&d&&u,det:S.det}; }
const sarrusFill=(A,pre)=>{ const S=sarrusParts(A), o={}; for(let i=0;i<3;i++) for(let j=3;j<5;j++) o[`${pre}c${i}${j}`]=A[i][j-3]; S.dn.forEach((v,k)=>o[`${pre}d${k}`]=v); S.up.forEach((v,k)=>o[`${pre}u${k}`]=v); return o; };

M.sarrus={name:"3 × 3 determinant (Sarrus)",tip:"Rule of Sarrus: copy the first two columns to the right of the matrix. Multiply along the three ↘ diagonals and add. Multiply along the three ↗ diagonals and add. det = (↘ sum) − (↗ sum). It works only for 3 × 3 matrices.",
 gen(){ for(let t=0;t<200;t++){ const A=[0,1,2].map(()=>[R(-4,5),R(-4,5),R(-4,5)]); if(A.flat().filter(v=>!v).length>2) continue; return {A,s:[sarrusParts(A).det]}; } },
 html(P){ return `<div class="zs-row">Find det A for A = ${MX(P.A)}</div>
  <div class="zs-st"><b>Step 1.</b> Copy the first two columns to the right.</div>${sarrusGrid(P.A,"",true)}<p class="zs-m" data-m="1"></p>
  <div class="zs-st"><b>Step 2.</b> Multiply along each diagonal.</div>${sarrusSteps("")}
  <div class="zs-st"><b>Step 3.</b> det A = (↘ sum) − (↗ sum) = ${box("det","determinant",3.2)}</div>`; },
 check(P,v,mk,msg,out,el){ const r=sarrusCheck(P.A,"",mk,el,out,msg,1); const d=mk("det",r.det); P.s=[r.det]; return r.ok&&d===true; },
 fill:P=>Object.assign(sarrusFill(P.A,""),{det:sarrusParts(P.A).det}),
 done:P=>`det A = ${N(P.s[0])}`};

M.cramer3={name:"Cramer's rule 3 × 3",tip:"D is the determinant of the coefficients (use Sarrus). For Dx replace the x-column with the constants, for Dy the y-column, for Dz the z-column. Then x = Dx ÷ D, y = Dy ÷ D, z = Dz ÷ D.",
 gen(){ for(let t=0;t<100;t++){ const p=sys3(); if(p&&Math.abs(det3(p.A))<=60) return p; } return sys3(); },
 html(P){ const A=P.A, c=P.c, rep=j=>A.map((r,i)=>r.map((v,k)=>k===j?c[i]:v));
  return `<div class="zs-sys">${A.map((r,i)=>`<span>${eqS(r,c[i])}</span>`).join("")}</div>
  <div class="zs-st"><b>Step 1.</b> Find D with Sarrus: copy columns 1 and 2, then multiply along the diagonals.</div>${sarrusGrid(A,"D",true)}${sarrusSteps("D")}
  <div class="zs-row">D = ${box("D","D",3.2)}</div><p class="zs-m" data-m="1"></p>
  <div class="zs-st"><b>Step 2.</b> Replace one column with the constants and find each determinant the same way.</div>
  <div class="zs-row">D<sub>x</sub> = ${MX(rep(0),1)} = ${box("Dx","D x",3.2)}</div>
  <div class="zs-row">D<sub>y</sub> = ${MX(rep(1),1)} = ${box("Dy","D y",3.2)}</div>
  <div class="zs-row">D<sub>z</sub> = ${MX(rep(2),1)} = ${box("Dz","D z",3.2)}</div><p class="zs-m" data-m="2"></p>
  <div class="zs-st"><b>Step 3.</b> Divide by D.</div><div class="zs-row">x = ${box("x","x")} &nbsp; y = ${box("y","y")} &nbsp; z = ${box("z","z")}</div>`; },
 check(P,v,mk,msg,out,el){ const A=P.A, c=P.c, rep=j=>A.map((r,i)=>r.map((x,k)=>k===j?c[i]:x)); const r=sarrusCheck(A,"D",mk,el,out,msg,1); const D=mk("D",r.det);
  const ds=[0,1,2].map(j=>mk(["Dx","Dy","Dz"][j],det3(rep(j)))); msg(2,ds.includes(false)?"Copy columns 1 and 2 of that matrix and use the diagonals again (or expand along a row).":"");
  return r.ok&&D===true&&ds.every(x=>x===true)&&["x","y","z"].every((k,i)=>mk(k,P.s[i])===true); },
 fill:P=>{ const A=P.A, c=P.c, rep=j=>A.map((r,i)=>r.map((x,k)=>k===j?c[i]:x)); return Object.assign(sarrusFill(A,"D"),{D:det3(A),Dx:det3(rep(0)),Dy:det3(rep(1)),Dz:det3(rep(2)),x:P.s[0],y:P.s[1],z:P.s[2]}); }};
/* ---------- lab UI ---------- */
const ORDER=["graph","sub","elim","cramer","inverse","elim3","gauss","sarrus","cramer3"];
const LABS=new Map(); let uid=0;
function html(opts={}){ const ms=(opts.methods||ORDER).filter(k=>M[k]); const id="zs"+(++uid);
  LABS.set(id,{ms,cur:ms[0],P:null,solved:0,tried:0});
  return `<div class="zs" data-zs="${id}"><p class="zs-lead">${opts.lead||"Pick a method. Type numbers in the boxes: a box turns <span class=\"zs-ok\">green</span> when it's right and <span class=\"zs-no\">red</span> when it's not. Type negatives with a minus sign and fractions like 3/4."}</p>
   <div class="zs-tabs"${ms.length<2?" hidden":""}>${ms.map((k,i)=>`<button type="button" data-zm="${k}"${i?"":' class="on"'}>${M[k].name}</button>`).join("")}</div>
   <div class="zs-ctl"><span class="zs-score">Solved <b>0</b></span><button type="button" data-za="new">↻ New system</button><button type="button" data-za="hint">💡 How to</button><button type="button" data-za="show">Show answer</button><button type="button" data-za="clear">Clear</button></div>
   <div class="zs-card"></div></div>`; }
function render(root){ const S=LABS.get(root.dataset.zs); if(!S) return; let P=null; for(let i=0;i<20&&!P;i++){ try{ P=M[S.cur].gen(); }catch(e){} } S.P=P; S.done=false; S.shown=false;
  const c=root.querySelector(".zs-card"); c.classList.remove("done"); c.innerHTML=`<div class="zs-mh">${M[S.cur].name}</div>${M[S.cur].html(P)}<p class="zs-fin" data-o="fin"></p><div class="zs-tip" hidden>${M[S.cur].tip}</div>`; }
function check(root){ const S=LABS.get(root.dataset.zs); if(!S||!S.P) return; const c=root.querySelector(".zs-card");
  const el=k=>c.querySelector(`[data-f="${k}"]`)||{className:"",value:""}, v=k=>pv(el(k).value);
  const mk=(k,t)=>{ const e=el(k), x=pv(e.value); if(x===null){ e.className="zs-b"; return null; } const ok=!isNaN(x)&&close(x,t); e.className="zs-b "+(ok?"ok":"bad"); return ok; };
  const msg=(n,h)=>{ const m=c.querySelector(`[data-m="${n}"]`); if(m) m.innerHTML=h||""; };
  const out=k=>c.querySelector(`[data-o="${k}"]`)||document.createElement("span");
  const ok=M[S.cur].check(S.P,v,mk,msg,out,el); const fin=out("fin");
  fin.innerHTML=ok?`${S.shown?"Answer shown.":"✓ Solved!"} ${M[S.cur].done?M[S.cur].done(S.P):`The solution is (${S.P.s.map(N).join(", ")}).`}`:"";
  c.classList.toggle("done",!!ok); if(ok&&!S.done){ S.done=true; if(!S.shown){ S.solved++; root.querySelector(".zs-score b").textContent=S.solved; } } }
document.addEventListener("input",e=>{ const r=e.target.closest&&e.target.closest(".zs"); if(r&&e.target.matches(".zs-b")) check(r); });
document.addEventListener("click",e=>{ const r=e.target.closest&&e.target.closest(".zs"); if(!r) return; const S=LABS.get(r.dataset.zs); if(!S) return;
  const t=e.target.closest("[data-zm]"); if(t){ S.cur=t.dataset.zm; r.querySelectorAll("[data-zm]").forEach(b=>b.classList.toggle("on",b===t)); render(r); return; }
  const a=e.target.closest("[data-za]"); if(!a) return; const act=a.dataset.za, c=r.querySelector(".zs-card");
  if(act==="new") render(r);
  else if(act==="hint"){ const tp=c.querySelector(".zs-tip"); if(tp) tp.hidden=!tp.hidden; }
  else if(act==="clear"){ c.querySelectorAll(".zs-b").forEach(b=>{ b.value=""; b.className="zs-b"; }); check(r); }
  else if(act==="show"){ const F=M[S.cur].fill(S.P); S.shown=true; Object.entries(F).forEach(([k,x])=>{ const b=c.querySelector(`[data-f="${k}"]`); if(b) b.value=N(x).replace("⁄","/"); }); check(r); } });
/* first card is drawn when the lab appears on the page */
const mo=new MutationObserver(()=>{ document.querySelectorAll(".zs").forEach(r=>{ if(!r.dataset.ready&&r.isConnected){ r.dataset.ready=1; if(!LABS.has(r.dataset.zs)){ const ms=[...r.querySelectorAll("[data-zm]")].map(b=>b.dataset.zm); LABS.set(r.dataset.zs,{ms,cur:ms[0],P:null,solved:0}); } render(r); } }); });
const startMO=()=>{ mo.observe(document.body,{childList:true,subtree:true}); document.querySelectorAll(".zs").forEach(r=>{ if(!r.dataset.ready){ r.dataset.ready=1; render(r); } }); };
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",startMO); else startMO();

const css=`.zs{font-family:'EB Garamond',Georgia,serif;color:#111;margin:6px 0 14px}
.zs-lead{font-style:italic;color:#444;margin:0 0 8px}.zs-ok{color:#1a7f37;font-weight:700}.zs-no{color:#c5221f;font-weight:700}
.zs-tabs{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 8px}
.zs-tabs button{font:600 16px 'EB Garamond',Georgia,serif;border:1.5px solid #1d4e89;color:#1d4e89;background:#fff;border-radius:999px;padding:3px 12px;cursor:pointer}
.zs-tabs button.on{background:#1d4e89;color:#fff}
.zs-ctl{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:0 0 8px}
.zs-ctl button{font:600 15px 'EB Garamond',Georgia,serif;border:1.5px solid #111;background:#fff;border-radius:6px;padding:3px 10px;cursor:pointer;color:#111}
.zs-ctl button[data-za="new"]{background:#0f7a6c;border-color:#0f7a6c;color:#fff}
.zs-score{margin-right:auto;font-size:17px}
.zs-card{border:1.6px solid #111;border-left:6px solid #1d4e89;border-radius:8px;background:#fff;padding:10px 14px 12px;font-size:18px}
.zs-card.done{border-left-color:#1a7f37;background:#f6fbf7}
.zs-mh{font-size:13px;text-transform:uppercase;letter-spacing:.12em;color:#555}
.zs-sys{display:inline-flex;flex-direction:column;gap:2px;border-left:2.5px solid #111;padding:2px 0 2px 12px;margin:6px 0 8px;font-size:19px}
.zs-st{margin:10px 0 4px}
.zs-row{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:4px 0 4px 8px}
.zs-b{width:3.6em;font:18px 'EB Garamond',Georgia,serif;text-align:center;padding:3px 4px;border:1.5px solid #888;border-radius:6px;background:#fff;color:#111}
.zs-b.ok{border-color:#1a7f37;background:#e8f6ec}.zs-b.bad{border-color:#c5221f;background:#fdecea}
.zs-m{min-height:0;margin:2px 0 0 8px;font-size:16px;color:#444;font-style:italic}.zs-m:empty{display:none}
.zs-fin{font-weight:700;color:#1a7f37;margin:10px 0 0}.zs-fin:empty{display:none}
.zs-tip{background:#fffbe8;border-left:4px solid #e0a100;padding:6px 10px;margin-top:10px;font-size:16.5px}
.zs-mx{display:inline-grid;grid-template-columns:repeat(var(--n),auto);column-gap:.6em;row-gap:.2em;position:relative;padding:.15em .55em;vertical-align:middle;align-items:center}
.zs-mx::before,.zs-mx::after{content:"";position:absolute;top:0;bottom:0;width:.32em;border:1.5px solid currentColor}
.zs-mx::before{left:0;border-right:0}.zs-mx::after{right:0;border-left:0}
.zs-mx.zs-det::before,.zs-mx.zs-det::after{width:0;border-left:1.5px solid currentColor;border-right:0}
.zs-mx>i{font-style:normal;text-align:center;min-width:1em}
.zs-aug>i.zs-rhs{border-left:1.5px solid #111;padding-left:.5em}
.zs-fr{display:inline-flex;flex-direction:column;text-align:center;vertical-align:middle;font-size:.9em}.zs-fr>span+span{border-top:1px solid currentColor}
.zs-sar{position:relative;display:inline-block;margin:6px 0 4px 8px;padding:0 .5em}
.zs-sg{display:grid;grid-template-columns:repeat(5,minmax(3em,auto));column-gap:.2em;grid-auto-rows:2.3em;align-items:center;justify-items:center;position:relative;z-index:1}
.zs-sg>i{font-style:normal}.zs-sg>i.zs-cp{background:#f2f6fb;border-radius:4px;padding:2px}
.zs-sg>i:nth-child(5n+4){border-left:1.5px dashed #999;padding-left:4px}
.zs-sar svg{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;opacity:0;transition:opacity .3s;z-index:2}
.zs-sar.on svg{opacity:1}.zs-sar svg line{stroke-opacity:.6}
.zs-sar svg .dn{stroke:#1d4e89;stroke-width:2.2}.zs-sar svg .up{stroke:#c5221f;stroke-width:2.2;stroke-dasharray:5 4}
.zs-sb{position:absolute;top:0;bottom:0;width:.35em;border:1.5px solid #111}.zs-sb.l{left:0;border-right:0}.zs-sb.r{left:9.8em;border-left:0}
.zs-dn{color:#1d4e89;font-weight:700;min-width:4.2em}.zs-up{color:#c5221f;font-weight:700;min-width:4.2em}
@media (max-width:560px){.zs-sg{grid-template-columns:repeat(5,minmax(2.6em,auto))}.zs-sg .zs-b{width:2.3em!important}}
.zs .gph{float:none!important;width:min(340px,100%)!important;margin:6px 0 4px 8px!important}
@media (max-width:560px){.zs-card{padding:8px 9px;font-size:17px}.zs-b{width:3em;font-size:17px}.zs-sys{font-size:17.5px}.zs-row{margin-left:0}}`;
const st=document.createElement("style"); st.textContent=css; document.head.appendChild(st);
window.ZSYS={html,M,_t:{pv,prop,comb,sys2,sys3}};

})();
