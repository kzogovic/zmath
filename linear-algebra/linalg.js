/* Z-Linear Algebra content. Every answer is computed. */
(function(){
const {R,pick,nz,gcd,shuffle,N,F,sq,cu,X,sg,poly,P,PF,PS}=window.ZH;
const FR=(n,d)=>`<span class="frc"><span>${n}</span><span>${d}</span></span>`;
const T=(...r)=>r;
const NAVY="#1d4e89",ORG="#c2571a",RED="#c23a52",PURP="#6a3d9a",TEAL="#0f7a6c",GRN="#137333",BLU="#1f4fd1",BRN="#7a5a12";
const MX=(A,aug)=>`<span class="mx" style="--n:${A[0].length}">${A.flat().map(x=>`<i>${typeof x==="string"?x:N(x)}</i>`).join("")}</span>`;
const V=v=>MX(v.map(x=>[x]));
const d2=A=>A[0][0]*A[1][1]-A[0][1]*A[1][0];
const d3=A=>A[0][0]*(A[1][1]*A[2][2]-A[1][2]*A[2][1])-A[0][1]*(A[1][0]*A[2][2]-A[1][2]*A[2][0])+A[0][2]*(A[1][0]*A[2][1]-A[1][1]*A[2][0]);
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const mv=(A,v)=>A.map(r=>r.reduce((s,x,k)=>s+x*v[k],0));
const rnd=(n,m,a=-5,b=5)=>Array.from({length:n},()=>Array.from({length:m},()=>R(a,b)));
const dot=(u,v)=>u.reduce((s,x,i)=>s+x*v[i],0);
// integer matrix with det ±1 (unimodular): product of elementary integer matrices
function unimod(n){ let A=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>+(i===j))); for(let t=0;t<n+2;t++){ const i=R(0,n-1); let j=R(0,n-1); if(i===j) j=(j+1)%n; const k=nz(-2,2); A=A.map((r,ri)=>ri===i?r.map((x,c)=>x+k*A[j][c]):r); } return A; }
// rank by exact fraction-free elimination
function rank(M){ const A=M.map(r=>r.slice()); let rk=0; const n=A.length,m=A[0].length; for(let c=0;c<m&&rk<n;c++){ let p=-1; for(let r=rk;r<n;r++) if(A[r][c]){ p=r; break; } if(p<0) continue; [A[rk],A[p]]=[A[p],A[rk]]; for(let r=0;r<n;r++) if(r!==rk&&A[r][c]){ const a=A[rk][c],b=A[r][c]; A[r]=A[r].map((x,k)=>x*a-A[rk][k]*b); } rk++; } return rk; }
const flow=o=>o;
const lin=(cs,vs)=>{ let o=""; cs.forEach((c,i)=>{ if(!c) return; const a=Math.abs(c), t=(a===1?"":a)+vs[i]; o+=o?(c<0?" − ":" + ")+t:(c<0?"−":"")+t; }); return o||"0"; };

/* ================= U1 Systems ================= */
const U1M={
 s0:{grp:"Step 1",c:NAVY,name:"Write the Augmented Matrix",hint:"[A | b]",when:"Every linear system.",rule:"Line up the variables, put the coefficients in A and the constants in b. Row operations on [A | b] don't change the solution set.",
  ex:[T("x + 2y = 5, 3x − y = 1",["[1 2 | 5; 3 −1 | 1]"]),T("Three equations in x, y, z",["A 3 × 4 augmented matrix"])]},
 sg2:{grp:"Small systems",c:ORG,name:"Substitution / Elimination / Cramer",hint:"2 × 2",when:"Two equations, two unknowns.",rule:"Eliminate one variable, or use Cramer: x = det(A<sub>x</sub>)/det(A). Works only when det(A) ≠ 0.",
  ex:[T("x + 2y = 5, 3x − y = 1",["det A = −7","x = (−1 − 2)/(−7)·… = 1, y = 2"]),T("det A = 0",["No unique solution: check consistency"])]},
 sge:{grp:"Any size",c:RED,name:"Gaussian Elimination",hint:"row echelon form",when:"3 or more equations, or you need all solutions.",rule:"Use row swaps, scaling, and adding multiples of rows to get zeros below each pivot. Then back-substitute (or go to RREF: Gauss–Jordan).",
  ex:[T("R₂ ← R₂ − 3R₁",["Clears the entry below the first pivot"]),T("Back substitution",["Solve the last row first, then move up"])]},
 scl:{grp:"Classify",c:PURP,name:"Count Pivots",hint:"consistent? free variables?",when:"“How many solutions?”",rule:"A row [0 … 0 | c], c ≠ 0 ⇒ no solution. Otherwise: pivots in every variable column ⇒ unique; free variables ⇒ infinitely many (number of free variables = n − rank).",
  ex:[T("Row [0 0 0 | 4]",["Inconsistent: <b>no solution</b>"]),T("3 variables, rank 2, consistent",["1 free variable: a line of solutions"])]},
 spar:{grp:"Parameters",c:TEAL,name:"Parameter Discussion",hint:"where det = 0",when:"A coefficient depends on k.",rule:"Find k where det A = 0 (no unique solution). For each such k, substitute and check consistency: none or infinitely many. Otherwise: unique.",
  ex:[T("x + ky = 2, kx + 4y = 4",["det = 4 − k"+sq+" = 0 ⇔ k = ±2","k = 2: infinitely many; k = −2: none; else unique"]),T("Homogeneous system",["Always consistent (x = 0 works)"])]},
 send:{grp:"Last step",c:GRN,name:"Write the Solution Set",hint:"vector or parametric form",when:"Every system.",rule:"Unique: a point. Infinitely many: x = p + t·v (+ s·w …). None: ∅. Check by substituting.",
  ex:[T("x = 1 + 2t, y = t, z = 3",["(1, 0, 3) + t(2, 1, 0)"]),T("Check",["Plug back into every equation"])]}
};
const U1={id:"u1",num:1,short:"Linear Systems",name:"Unit 1: Linear Systems and Gaussian Elimination",sub:"Augmented matrices, row operations, echelon forms, consistency, free variables, parameters",c:NAVY,
 flow:flow({M:U1M,label:"Linear systems flowchart",lead:"How to solve and classify a linear system.",start:"Solve the system",top:["s0"],q:"What kind of system?",cols:[["2 × 2","",ORG,["sg2"]],["Any size","",RED,["sge"]],["How many solutions?","",PURP,["scl"]],["With a parameter","",TEAL,["spar"]]],end:"send"}),
 sheet:[[NAVY,"Row operations",["Swap two rows","Multiply a row by c ≠ 0","Add a multiple of one row to another"],""],[RED,"Echelon forms",["REF: zeros below pivots, staircase","RREF: pivots 1, zeros above and below","RREF is unique"],""],[PURP,"Solutions",["Inconsistent row [0 … 0 | c] ⇒ none","rank = n ⇒ unique","rank &lt; n ⇒ n − rank free variables"],""],[TEAL,"Cramer's rule",["x<sub>i</sub> = det(A<sub>i</sub>)/det(A)","Only when det A ≠ 0"],""]],
 gen:[
 ()=>{ const x=R(-5,5),y=R(-5,5),A=rnd(2,2,-5,5); if(!d2(A)) return null; const b=mv(A,[x,y]); return P("2 × 2 systems",`Solve: ${lin(A[0],["x","y"])} = ${N(b[0])}, ${lin(A[1],["x","y"])} = ${N(b[1])}. Find x.`,x,[y,-x,x+1],[`det A = ${N(d2(A))}`,`Cramer: x = ((${N(b[0])})(${N(A[1][1])}) − (${N(A[0][1])})(${N(b[1])}))/(${N(d2(A))}) = <b>${N(x)}</b>`]); },
 ()=>{ const s=[R(-4,4),R(-4,4),R(-4,4)]; const A=rnd(3,3,-3,3); if(!d3(A)) return null; const b=mv(A,s); return P("3 × 3 systems",`Solve the system with augmented matrix ${MX(A.map((r,i)=>[...r,"|",b[i]]))}. Find z.`.replace('--n:3','--n:5').replace('--n:4','--n:5'),s[2],[s[0],s[1],-s[2]],[`Gaussian elimination (or Cramer, det A = ${N(d3(A))})`,`Solution (x, y, z) = (${s.map(N).join(", ")})`,`<b>z = ${N(s[2])}</b>`]); },
 ()=>{ const n=R(3,6),r=R(1,n-1); return P("Free variables",`A consistent system has ${n} unknowns and its coefficient matrix has rank ${r}. How many free variables are there?`,n-r,[r,n,n+r],[`free = n − rank = ${n} − ${r}`,`<b>${n-r}</b>`]); },
 ()=>{ const S=pick([["[0 0 0 | 5]","No solution"],["[0 0 0 | 0] with rank 2 in 3 unknowns","Infinitely many solutions"],["a pivot in every column of A (3 × 3)","Exactly one solution"]]); return PS("Classifying systems",`The echelon form of a 3-variable system has ${S[0]}. How many solutions?`,S[1],["No solution","Infinitely many solutions","Exactly one solution","Exactly two solutions"].filter(x=>x!==S[1]),[`<b>${S[1]}</b>`]); },
 ()=>{ const m=R(2,5),a=nz(-5,5); return PS("Parameters",`For which k does x + ky = ${N(a)}, kx + ${m*m}y = ${N(m*a)} have infinitely many solutions?`,`k = ${m}`,[`k = −${m}`,`k = ±${m}`,`k = ${m*m}`],[`det = ${m*m} − k${sq} = 0 ⇔ k = ±${m}`,`k = ${m}: second equation = ${m} × first ⇒ infinitely many`,`k = −${m}: contradiction ⇒ none`,`<b>k = ${m}</b>`]); }],
 chal:[
 ()=>{ const m=R(2,5),a=nz(-5,5); return PS("Parameters",`For which k does x + ky = ${N(a)}, kx + ${m*m}y = ${N(m*a)} have NO solution?`,`k = −${m}`,[`k = ${m}`,`k = ±${m}`,`No such k`],[`det = 0 ⇔ k = ±${m}`,`k = −${m}: R₂ + ${m}R₁ gives 0 = ${N(2*m*a)}: contradiction`,`<b>k = −${m}</b>`]); },
 ()=>{ const a=R(1,4),b=R(1,4); const det=a*b-1; return P("3 × 3 parameters",`For which value of k is the system with coefficient matrix ${MX([[1,1,1],[1,a+1,1],[1,1,"k"]])} not uniquely solvable?`,1,[0,a,-1],[`Subtract R₁ from R₂ and R₃: det = 1·${a}·(k − 1)`,`det = 0 ⇔ <b>k = 1</b>`]); }],
 frq:[()=>{ const s=[R(-3,3),R(-3,3),R(-3,3)]; let A; do{ A=rnd(3,3,-3,3); A[0][0]=1; }while(!d3(A)); const b=mv(A,s);
  const r1=A[1][0],r2=A[2][0];
  return {t:"Gaussian elimination",calc:false,stem:`Consider the system with augmented matrix ${MX(A.map((r,i)=>[...r,"|",b[i]])).replace('--n:3','--n:5')}.`,parts:[
   [`Write the two row operations that clear the first column below the pivot.`,[`R₂ ← R₂ − (${N(r1)})R₁`,`R₃ ← R₃ − (${N(r2)})R₁`],"",1],
   [`Compute det A. What does it tell you?`,[`Cofactor expansion: det A = ${N(d3(A))}.`,`Nonzero ⇒ exactly one solution.`],N(d3(A)),2],
   [`Solve the system.`,[`Finish elimination and back-substitute (or use Cramer).`,`(x, y, z) = (${s.map(N).join(", ")}).`],`(${s.map(N).join(", ")})`,3],
   [`Verify the solution in the first equation.`,[`${A[0].map((c,i)=>`${N(c)}(${N(s[i])})`).join(" + ")} = ${N(b[0])} ✓`],"",1]]}; },
 ()=>{ const m=R(2,4),a=nz(-4,4);
  return {t:"Parameter discussion",calc:false,stem:`Consider x + ky = ${N(a)} and kx + ${m*m}y = c.`,parts:[
   [`For which k is there a unique solution?`,[`det = ${m*m} − k${sq} ≠ 0`],`k ≠ ±${m}`,1],
   [`Let k = ${m}. For which c are there infinitely many solutions?`,[`The left side of equation 2 is ${m} × equation 1.`,`Need c = ${m}·${N(a)} = ${N(m*a)}.`],`c = ${N(m*a)}`,2],
   [`Let k = ${m}, c = ${N(m*a)}. Write the solution set in parametric form.`,[`x = ${N(a)} − ${m}t, y = t.`],`(${N(a)}, 0) + t(−${m}, 1)`,2],
   [`Let k = −${m}. For which c is the system consistent?`,[`R₂ + ${m}R₁: 0 = c + ${N(m*a)}.`,`Consistent only if c = ${N(-m*a)}.`],`c = ${N(-m*a)}`,2]]}; }]
};

/* ================= U2 Matrix algebra ================= */
const U2M={
 m0:{grp:"Step 1",c:NAVY,name:"Check the Sizes",hint:"(m × n)(n × p)",when:"Before any operation.",rule:"A + B needs the same size. AB needs columns of A = rows of B; the result is m × p. In general AB ≠ BA.",
  ex:[T("(2 × 3)(3 × 4)",["Defined, 2 × 4"]),T("(2 × 3)(2 × 3)",["Not defined"])]},
 mmul:{grp:"Products",c:ORG,name:"Matrix Multiplication",hint:"row · column",when:"AB, A"+sq+", Ax.",rule:"(AB)<sub>ij</sub> = row i of A · column j of B. Ax is a linear combination of the columns of A.",
  ex:[T("[1 2; 3 4][5; 6]",["[17; 39]"]),T("(AB)ᵀ",["= BᵀAᵀ"])]},
 minv:{grp:"Inverses",c:RED,name:"Inverse Matrix",hint:"2 × 2 formula or [A | I]",when:"Solving Ax = b repeatedly, or A<sup>−1</sup> asked.",rule:"2 × 2: A<sup>−1</sup> = "+FR(1,"ad − bc")+"[d −b; −c a]. Larger: row reduce [A | I] to [I | A<sup>−1</sup>]. Exists ⇔ det A ≠ 0.",
  ex:[T("[2 1; 5 3]",["det = 1, inverse [3 −1; −5 2]"]),T("(AB)<sup>−1</sup>",["= B<sup>−1</sup>A<sup>−1</sup>"])]},
 msolve:{grp:"Equations",c:PURP,name:"Matrix Equations",hint:"multiply on the correct side",when:"AX = B, XA = B.",rule:"AX = B ⇒ X = A<sup>−1</sup>B. XA = B ⇒ X = BA<sup>−1</sup>. Never divide by a matrix.",
  ex:[T("AX = B",["X = A<sup>−1</sup>B"]),T("Ax = b, A invertible",["x = A<sup>−1</sup>b, unique"])]},
 mend:{grp:"Last step",c:GRN,name:"Check: AA<sup>−1</sup> = I",hint:"multiply back",when:"Every inverse or solution.",rule:"Multiply your answer back. Order matters.",ex:[T("Verify",["AA<sup>−1</sup> = I"]),T("Transpose rules",["(A + B)ᵀ = Aᵀ + Bᵀ"])]}
};
const U2={id:"u2",num:2,short:"Matrix Algebra",name:"Unit 2: Matrix Algebra and Inverses",sub:"Matrix operations, products, transpose, inverses, matrix equations, invertible matrix theorem",c:ORG,
 flow:{M:U2M,label:"Matrix algebra flowchart",lead:"Which matrix operation, and in what order?",start:"Matrix problem",top:["m0"],q:"What is asked?",cols:[["Products","",ORG,["mmul"]],["Inverse","",RED,["minv"]],["Matrix equation","",PURP,["msolve"]]],end:"mend"},
 sheet:[[ORG,"Products",["(AB)<sub>ij</sub> = row i · col j","AB ≠ BA in general","(AB)ᵀ = BᵀAᵀ"],""],[RED,"Inverse",["2 × 2: (1/(ad − bc))[d −b; −c a]","[A | I] → [I | A<sup>−1</sup>]","(AB)<sup>−1</sup> = B<sup>−1</sup>A<sup>−1</sup>"],""],[PURP,"Invertible matrix theorem",["det A ≠ 0","Ax = 0 only has x = 0","rank n, columns independent","Ax = b solvable for every b"],""]],
 gen:[
 ()=>{ const A=rnd(2,3,-4,4),B=rnd(3,2,-4,4),i=R(0,1),j=R(0,1); const C=mm(A,B); return P("Matrix products",`A = ${MX(A)}, B = ${MX(B)}. Find (AB)<sub>${i+1}${j+1}</sub>.`,C[i][j],[C[j][i],C[i][j]+1,dot(A[i],A[i])].filter(v=>v!==C[i][j]),[`Row ${i+1} of A · column ${j+1} of B`,`${A[i].map((x,k)=>`(${N(x)})(${N(B[k][j])})`).join(" + ")} = <b>${N(C[i][j])}</b>`]); },
 ()=>{ const A=rnd(2,2,-6,6),d=d2(A); if(!d) return null; const i=R(0,1),j=R(0,1); const adj=[[A[1][1],-A[0][1]],[-A[1][0],A[0][0]]]; return PF("2 × 2 inverse",`A = ${MX(A)}. Find entry (${i+1}, ${j+1}) of A<sup>−1</sup>.`,adj[i][j],d,[F(A[i][j],d),F(-adj[i][j],d),N(adj[i][j])],[`det A = ${N(d)}`,`A<sup>−1</sup> = ${FR(1,N(d))}${MX(adj)}`,`Entry: <b>${F(adj[i][j],d)}</b>`]); },
 ()=>{ const S=pick([[2,3,3,4,"2 × 4"],[3,1,1,3,"3 × 3"],[1,3,3,1,"1 × 1"],[4,2,2,5,"4 × 5"]]); return PS("Sizes",`A is ${S[0]} × ${S[1]} and B is ${S[2]} × ${S[3]}. What is the size of AB?`,S[4],[...new Set([`${S[1]} × ${S[2]}`,`${S[3]} × ${S[0]}`,"Not defined",`${S[0]} × ${S[2]}`,`${S[1]} × ${S[3]}`])].filter(x=>x!==S[4]).slice(0,3),[`Inner sizes match (${S[1]} = ${S[2]}); outer sizes give <b>${S[4]}</b>`]); },
 ()=>{ const A=unimod(2),x=[R(-5,5),R(-5,5)]; const b=mv(A,x); return P("Solving Ax = b",`A = ${MX(A)}, b = ${V(b)}. Solve Ax = b using A<sup>−1</sup>. Give x₁ + x₂.`,x[0]+x[1],[x[0],x[1],b[0]+b[1]],[`det A = ${N(d2(A))}`,`x = A<sup>−1</sup>b = (${N(x[0])}, ${N(x[1])})`,`x₁ + x₂ = <b>${N(x[0]+x[1])}</b>`]); },
 ()=>{ const A=rnd(2,2,-4,4); const C=mm(A,A); return P("Powers",`A = ${MX(A)}. Find the (1, 1) entry of A${sq}.`,C[0][0],[A[0][0]**2,C[1][1],C[0][1]].filter(v=>v!==C[0][0]),[`Row 1 · column 1: (${N(A[0][0])})${sq} + (${N(A[0][1])})(${N(A[1][0])})`,`<b>${N(C[0][0])}</b>`]); }],
 chal:[
 ()=>{ const k=nz(-4,4); return PS("Inverse properties",`If A<sup>−1</sup> = ${MX([[1,k],[0,1]])}, what is A?`,MX([[1,-k],[0,1]]),[MX([[1,k],[0,1]]),MX([[1,0],[-k,1]]),MX([[-1,-k],[0,-1]])],[`A = (A<sup>−1</sup>)<sup>−1</sup>; the inverse of a shear [1 k; 0 1] is [1 −k; 0 1].`]); },
 ()=>{ const A=unimod(3); const i=R(0,2),j=R(0,2); const cof=(r,c)=>{ const M=A.filter((_,a)=>a!==r).map(x=>x.filter((_,b)=>b!==c)); return ((r+c)%2?-1:1)*d2(M); }; const d=d3(A); const v=cof(j,i)/d; return P("3 × 3 inverse",`A = ${MX(A)} (det A = ${N(d)}). Find entry (${i+1}, ${j+1}) of A<sup>−1</sup>.`,v,[-v,cof(i,j)/d,0].filter(x=>x!==v),[`A<sup>−1</sup> = adj(A)/det A; entry (${i+1}, ${j+1}) = C<sub>${j+1}${i+1}</sub>/det A`,`Cofactor C<sub>${j+1}${i+1}</sub> = ${N(cof(j,i))}`,`<b>${N(v)}</b>`]); }],
 frq:[()=>{ const A=unimod(2),B=rnd(2,2,-3,3); const Ai=[[A[1][1],-A[0][1]],[-A[1][0],A[0][0]]].map(r=>r.map(x=>x*d2(A))); const X1=mm(Ai,B), AB=mm(A,B), BA=mm(B,A);
  return {t:"Matrix equations",calc:false,stem:`Let A = ${MX(A)} and B = ${MX(B)}.`,parts:[
   [`Compute AB and BA. Are they equal?`,[`AB = ${MX(AB)}`,`BA = ${MX(BA)}`,JSON.stringify(AB)===JSON.stringify(BA)?"Equal (this time).":"Not equal: matrix multiplication is not commutative."],"",2],
   [`Find A<sup>−1</sup>.`,[`det A = ${N(d2(A))}`,`A<sup>−1</sup> = ${MX(Ai)}`],MX(Ai),2],
   [`Solve AX = B for X.`,[`X = A<sup>−1</sup>B = ${MX(X1)}`],MX(X1),2],
   [`Explain why XA = B has a different solution in general.`,[`XA = B ⇒ X = BA<sup>−1</sup>, and BA<sup>−1</sup> ≠ A<sup>−1</sup>B in general.`],"",1]]}; }]
};

/* ================= U3 Determinants ================= */
const U3M={
 t0:{grp:"Step 1",c:NAVY,name:"Look at the Shape",hint:"size, zeros, triangle",when:"Every determinant.",rule:"2 × 2: ad − bc. Triangular: product of the diagonal. Lots of zeros in a row/column: expand along it.",
  ex:[T("[3 1; 4 2]",["6 − 4 = <b>2</b>"]),T("Upper triangular, diagonal 2, 3, 5",["<b>30</b>"])]},
 tcof:{grp:"Compute",c:ORG,name:"Cofactor Expansion",hint:"(−1)<sup>i+j</sup>a<sub>ij</sub>M<sub>ij</sub>",when:"3 × 3 or a row with zeros.",rule:"det A = Σ<sub>j</sub> (−1)<sup>i+j</sup>a<sub>ij</sub>det(M<sub>ij</sub>). Sign pattern + − + / − + − / + − +.",
  ex:[T("Expand along row 1",["a(ei − fh) − b(di − fg) + c(dh − eg)"]),T("Sarrus (3 × 3 only)",["Diagonals down minus diagonals up"])]},
 trow:{grp:"Compute",c:ORG,name:"Row Reduction",hint:"track the changes",when:"4 × 4 and bigger.",rule:"Swap: × (−1). Scale a row by c: × c. Add a multiple of a row: no change. Reduce to triangular, multiply the diagonal.",
  ex:[T("Swap two rows",["det changes sign"]),T("R₂ ← R₂ − 3R₁",["det unchanged"])]},
 tprop:{grp:"Properties",c:PURP,name:"Determinant Properties",hint:"product, inverse, scalar",when:"det of AB, A<sup>−1</sup>, kA, Aᵀ.",rule:"det(AB) = det A·det B, det(A<sup>−1</sup>) = 1/det A, det(kA) = k<sup>n</sup>det A, det(Aᵀ) = det A.",
  ex:[T("det A = 3, A is 3 × 3: det(2A)",["2"+cu+"·3 = <b>24</b>"]),T("det(A<sup>−1</sup>)",["<b>1/3</b>"])]},
 tapp:{grp:"Applications",c:TEAL,name:"Area, Volume, Cramer",hint:"|det|",when:"Geometry or solving a system.",rule:"Area of the parallelogram from u, v = |det[u v]|; volume of a parallelepiped = |det[u v w]|. Cramer: x<sub>i</sub> = det A<sub>i</sub>/det A.",
  ex:[T("u = (3, 1), v = (1, 2)",["Area |6 − 1| = <b>5</b>"]),T("Triangle area",["½|det|"])]},
 tend:{grp:"Last step",c:GRN,name:"Interpret",hint:"0 ⇔ singular",when:"Every answer.",rule:"det = 0 ⇔ A not invertible ⇔ columns dependent ⇔ Ax = 0 has nonzero solutions.",ex:[T("det = 0",["Columns are linearly dependent"]),T("det ≠ 0",["Unique solution to Ax = b"])]}
};
const U3={id:"u3",num:3,short:"Determinants",name:"Unit 3: Determinants",sub:"Cofactor expansion, row reduction, properties, area and volume, Cramer's rule",c:RED,
 flow:{M:U3M,label:"Determinants flowchart",lead:"How to compute or use a determinant.",start:"det A",top:["t0"],q:"What do you need?",cols:[["Compute","",ORG,["tcof","trow"]],["Properties","",PURP,["tprop"]],["Applications","",TEAL,["tapp"]]],end:"tend"},
 sheet:[[ORG,"Compute",["2 × 2: ad − bc","Cofactors along any row or column","Triangular: product of diagonal"],""],[PURP,"Properties",["det(AB) = det A det B","det(A<sup>−1</sup>) = 1/det A","det(kA) = k<sup>n</sup> det A","det Aᵀ = det A"],""],[NAVY,"Row operations",["Swap: × (−1)","Scale row by c: × c","Row replacement: unchanged"],""],[TEAL,"Geometry",["Area = |det[u v]|","Volume = |det[u v w]|"],""]],
 gen:[
 ()=>{ const A=rnd(2,2,-9,9); return P("2 × 2",`Find det ${MX(A)}.`,d2(A),[A[0][0]*A[1][1]+A[0][1]*A[1][0],-d2(A),A[0][0]+A[1][1]].filter(v=>v!==d2(A)),[`(${N(A[0][0])})(${N(A[1][1])}) − (${N(A[0][1])})(${N(A[1][0])})`,`<b>${N(d2(A))}</b>`]); },
 ()=>{ const A=rnd(3,3,-4,4); const d=d3(A); return P("3 × 3",`Find det ${MX(A)}.`,d,[-d,d+A[0][0],d3(A.map(r=>[r[0],r[2],r[1]]))+1].filter(v=>v!==d),[`Expand along row 1 (signs + − +)`,`${N(A[0][0])}(${N(A[1][1]*A[2][2]-A[1][2]*A[2][1])}) − ${N(A[0][1])}(${N(A[1][0]*A[2][2]-A[1][2]*A[2][0])}) + ${N(A[0][2])}(${N(A[1][0]*A[2][1]-A[1][1]*A[2][0])})`,`<b>${N(d)}</b>`]); },
 ()=>{ const n=R(2,4),d=nz(-5,5),k=pick([-3,-2,2,3]); return P("Properties",`A is ${n} × ${n} with det A = ${N(d)}. Find det(${N(k)}A).`,k**n*d,[k*d,k*n*d,k**n].filter(v=>v!==k**n*d),[`det(kA) = k<sup>n</sup>det A`,`(${N(k)})<sup>${n}</sup>(${N(d)}) = <b>${N(k**n*d)}</b>`]); },
 ()=>{ const a=nz(-5,5),b=nz(-5,5); return PF("Properties",`det A = ${N(a)}, det B = ${N(b)} (same size). Find det(A<sup>−1</sup>Bᵀ).`,b,a,[F(a,b),N(a*b),F(1,a*b)],[`det(A<sup>−1</sup>) = 1/${N(a)}, det(Bᵀ) = ${N(b)}`,`<b>${F(b,a)}</b>`]); },
 ()=>{ const u=[R(-5,5),R(-5,5)],v=[R(-5,5),R(-5,5)]; const d=Math.abs(u[0]*v[1]-u[1]*v[0]); if(!d) return null; return P("Area",`Find the area of the parallelogram spanned by u = (${u.map(N).join(", ")}) and v = (${v.map(N).join(", ")}).`,d,[d/2,u[0]*v[0]+u[1]*v[1],d+1].filter(x=>x!==d),[`|det[u v]| = |(${N(u[0])})(${N(v[1])}) − (${N(u[1])})(${N(v[0])})|`,`<b>${d}</b>`]); },
 ()=>{ const a=nz(-4,4),b=nz(-4,4),c=nz(-4,4); return P("Triangular",`Find det ${MX([[a,R(-5,5),R(-5,5)],[0,b,R(-5,5)],[0,0,c]])}.`,a*b*c,[a+b+c,-a*b*c,0].filter(x=>x!==a*b*c),[`Triangular: product of the diagonal`,`<b>${N(a*b*c)}</b>`]); }],
 chal:[
 ()=>{ const a=R(1,4),b=R(1,4); return P("Parameters",`For which k is ${MX([[1,2,"k"],[0,a,1],[0,b,"k"]])} singular?`,F(b,a)==="0"?0:b/a,[0,a,b].filter(x=>x!==b/a),[`Expand along column 1: det = 1·(${a}k − ${b})`,`= 0 ⇔ <b>k = ${F(b,a)}</b>`],{a:F(b,a)}); },
 ()=>{ const s=pick([1,-1])*R(1,3); return PS("Row operations",`det A = ${N(s)}. B is A with rows 1 and 2 swapped and row 3 multiplied by 4. det B = ?`,N(-4*s),[N(4*s),N(-s),N(s)],[`Swap: × (−1). Scale by 4: × 4.`,`<b>${N(-4*s)}</b>`]); }],
 frq:[()=>{ const a=R(1,4),b=nz(-3,3); const A=[[1,a,0],[b,1,2],[0,1,"k"]];
  const coef=1-a*b; // det = 1(k − 2) − a(bk − 0) = k − 2 − abk = (1 − ab)k − 2
  if(!coef||coef===2) return null;
  return {t:"Determinants with a parameter",calc:false,stem:`Let A = ${MX(A)}.`,parts:[
   [`Compute det A as a function of k.`,[`Expand along row 1: 1·(k − 2) − ${a}·(${N(b)}k − 0) + 0.`,`det A = ${N(coef)}k − 2.`],`${N(coef)}k − 2`,2],
   [`For which k is A not invertible?`,[`det A = 0 ⇔ k = ${F(2,coef)}.`],`k = ${F(2,coef)}`,1],
   [`Let k = 1. Find det(2A) and det(A<sup>−1</sup>).`,[`det A = ${N(coef-2)}.`,`det(2A) = 8·${N(coef-2)} = ${N(8*(coef-2))}; det(A<sup>−1</sup>) = ${F(1,coef-2)}.`],`${N(8*(coef-2))}; ${F(1,coef-2)}`,2],
   [`With k = 1, what is the volume of the parallelepiped spanned by the rows of A?`,[`|det A| = ${Math.abs(coef-2)}.`],N(Math.abs(coef-2)),1]]}; }]
};

/* ================= U4 Vector spaces ================= */
const U4M={
 v0:{grp:"Step 1",c:NAVY,name:"Put Vectors in a Matrix",hint:"as columns",when:"Span, independence, basis, rank.",rule:"Place the vectors as columns of A and row reduce. The pivots tell you everything.",
  ex:[T("Are (1, 2), (2, 4) independent?",["[1 2; 2 4] has 1 pivot: dependent"]),T("Span of 3 vectors in ℝ"+cu,["rank of the 3 × 3 matrix"])]},
 vind:{grp:"Independence",c:ORG,name:"Linear Independence",hint:"pivot in every column",when:"“Are these vectors independent?”",rule:"Independent ⇔ c₁v₁ + … + c<sub>k</sub>v<sub>k</sub> = 0 only for all c = 0 ⇔ a pivot in every column. n vectors in ℝ<sup>n</sup>: det ≠ 0. More than n vectors in ℝ<sup>n</sup>: always dependent.",
  ex:[T("(1, 0, 1), (0, 1, 1), (1, 1, 2)",["v₃ = v₁ + v₂: dependent"]),T("4 vectors in ℝ"+cu,["Always dependent"])]},
 vspan:{grp:"Span & basis",c:RED,name:"Span, Basis, Dimension",hint:"pivot columns",when:"Dimension of a span, column space, or a basis.",rule:"A basis is independent and spans. dim = number of pivots. Basis for Col A: the pivot columns of the original A.",
  ex:[T("Col A with 2 pivots",["dim Col A = 2"]),T("Basis of ℝ"+sq,["Any 2 independent vectors"])]},
 vnul:{grp:"Null space",c:PURP,name:"Null Space & Rank–Nullity",hint:"rank + nullity = n",when:"Solutions of Ax = 0, kernel.",rule:"Nul A = {x : Ax = 0}. Solve with RREF; one basis vector per free variable. rank A + dim Nul A = number of columns.",
  ex:[T("A is 3 × 5, rank 3",["nullity = <b>2</b>"]),T("RREF [1 2 0; 0 0 1]",["x = t(−2, 1, 0)"])]},
 vsub:{grp:"Subspace test",c:TEAL,name:"Is It a Subspace?",hint:"0, +, scalar",when:"A set defined by conditions.",rule:"Contains 0, closed under addition, closed under scalar multiplication. Linear equations = 0: yes. Constants ≠ 0, squares, inequalities: usually no.",
  ex:[T("{(x, y): x + 2y = 0}",["Yes: a line through the origin"]),T("{(x, y): x + y = 1}",["No: 0 is not in it"])]},
 vend:{grp:"Last step",c:GRN,name:"State Dimensions",hint:"count",when:"Every answer.",rule:"dim Col A = dim Row A = rank. Check rank + nullity = n.",ex:[T("Check",["rank 2 + nullity 1 = 3 columns ✓"]),T("Coordinates",["Solve [b₁ b₂]c = x"])]}
};
const U4={id:"u4",num:4,short:"Vector Spaces",name:"Unit 4: Vector Spaces, Span and Independence",sub:"Subspaces, span, linear independence, basis and dimension, column and null spaces, rank–nullity",c:PURP,
 flow:{M:U4M,label:"Vector spaces flowchart",lead:"Span, independence, basis or null space: start by row reducing.",start:"Vector space question",top:["v0"],q:"What is asked?",cols:[["Independent?","",ORG,["vind"]],["Span / basis / dim","",RED,["vspan"]],["Null space","",PURP,["vnul"]],["Subspace?","",TEAL,["vsub"]]],end:"vend"},
 sheet:[[ORG,"Independence",["Pivot in every column","n vectors in ℝ<sup>n</sup>: det ≠ 0","&gt; n vectors in ℝ<sup>n</sup>: dependent"],""],[RED,"Basis & dimension",["Basis: independent + spanning","dim = number of vectors in any basis"],""],[PURP,"Rank–nullity",["rank A + nullity A = n (columns)","rank = dim Col A = dim Row A"],""],[TEAL,"Subspace test",["0 ∈ W","u + v ∈ W","cu ∈ W"],""]],
 gen:[
 ()=>{ const m=R(2,4),n=R(3,6),r=R(1,Math.min(m,n)); return P("Rank–nullity",`A is ${m} × ${n} with rank ${r}. Find dim Nul A.`,n-r,[m-r,r,n].filter(x=>x!==n-r),[`rank + nullity = n = ${n}`,`nullity = <b>${n-r}</b>`]); },
 ()=>{ let A; do{ A=rnd(3,3,-3,3); }while(false); const dep=Math.random()<.5; if(dep){ const a=nz(-2,2),b=nz(-2,2); A=A.map(r=>[r[0],r[1],a*r[0]+b*r[1]]); } const d=d3(A); return PS("Independence",`Are the columns of ${MX(A)} linearly independent?`,d?"Yes (det ≠ 0)":"No (det = 0)",[d?"No (det = 0)":"Yes (det ≠ 0)","Only if A is symmetric","Cannot be determined"],[`det = ${N(d)}`,`<b>${d?"Independent":"Dependent"}</b>`]); },
 ()=>{ const A=rnd(3,4,-3,3); const dep=R(0,2); if(dep){ A.forEach(r=>{ r[2]=r[0]+r[1]; }); } if(dep===2) A[2]=A[0].map((x,i)=>x-A[1][i]); const r=rank(A); return P("Rank",`Find the rank of ${MX(A)}.`,r,[r+1,r-1,4].filter(x=>x>=0&&x!==r),[`Row reduce and count pivots`,`<b>rank = ${r}</b>`]); },
 ()=>{ const S=pick([["{(x, y, z) : x − 2y + z = 0}","Yes"],["{(x, y, z) : x + y + z = 1}","No"],["{(x, y) : xy = 0}","No"],["{(x, y) : y = 3x}","Yes"],["{(x, y) : x ≥ 0}","No"],["{(a, b, a + b)}","Yes"]]); return PS("Subspaces",`Is ${S[1]==="Yes"?S[0]:S[0]} a subspace?`,S[1],[S[1]==="Yes"?"No":"Yes","Only in ℝ"+sq,"Only if it is finite"],[S[1]==="Yes"?`It contains 0 and is closed under + and scalar multiplication: <b>Yes</b>`:`One of the three conditions fails: <b>No</b>`]); },
 ()=>{ const b1=[1,R(-2,2)],b2=[R(-2,2),1]; if(!d2([[b1[0],b2[0]],[b1[1],b2[1]]])) return null; const c=[R(-4,4),R(-4,4)]; const x=[c[0]*b1[0]+c[1]*b2[0],c[0]*b1[1]+c[1]*b2[1]]; return P("Coordinates",`In the basis b₁ = (${b1.map(N).join(", ")}), b₂ = (${b2.map(N).join(", ")}), x = (${x.map(N).join(", ")}). Find the first coordinate c₁.`,c[0],[c[1],x[0],-c[0]].filter(v=>v!==c[0]),[`Solve c₁b₁ + c₂b₂ = x`,`(c₁, c₂) = (${c.map(N).join(", ")}): <b>c₁ = ${N(c[0])}</b>`]); }],
 chal:[
 ()=>{ const a=R(1,4),b=R(1,4); return P("Independence with k",`For which k are (1, ${a}, 0), (0, 1, ${b}), (1, k, ${b}) dependent?`,a+1,[a,b,a+b].filter(x=>x!==a+1),[`det [v₁ v₂ v₃] = ${b}(${a+1} − k)`,`det = 0 ⇔ <b>k = ${a+1}</b>`]); },
 ()=>{ const n=R(4,7),k=R(1,n-1); return P("Dimension",`What is the dimension of the subspace of ℝ<sup>${n}</sup> of vectors satisfying ${k} independent homogeneous linear equations?`,n-k,[k,n,n-k+1],[`Each independent equation removes one dimension.`,`<b>${n-k}</b>`]); }],
 frq:[()=>{ const a=nz(-2,2),b=nz(-2,2); const A=[[1,0,a,R(-2,2)],[0,1,b,R(-2,2)],[1,1,a+b,0]]; A[2][3]=A[0][3]+A[1][3]+1;
  return {t:"Column space and null space",calc:false,stem:`Let A = ${MX(A)}.`,parts:[
   [`Row reduce A and find its rank.`,[`R₃ ← R₃ − R₁ − R₂ gives [0 0 0 1].`,`Pivots in columns 1, 2, 4.`],`rank 3`,2],
   [`Give a basis for Col A. What is Col A?`,[`Pivot columns of the original A: columns 1, 2, 4.`,`3 independent vectors in ℝ³: Col A = ℝ³.`],`columns 1, 2, 4; Col A = ℝ³`,2],
   [`Find a basis for Nul A.`,[`x₃ is free; x₄ = 0, x₁ = −${N(a)}x₃, x₂ = −${N(b)}x₃.`,`Basis: (${N(-a)}, ${N(-b)}, 1, 0).`],`{(${N(-a)}, ${N(-b)}, 1, 0)}`,2],
   [`Verify rank–nullity.`,[`3 + 1 = 4 columns ✓`],"",1]]}; }]
};

/* ================= U5 Linear transformations ================= */
const U5M={
 l0:{grp:"Step 1",c:NAVY,name:"Find the Standard Matrix",hint:"columns T(e₁), T(e₂)…",when:"Any linear map T : ℝ<sup>n</sup> → ℝ<sup>m</sup>.",rule:"A = [T(e₁) T(e₂) … T(e<sub>n</sub>)]. Then T(x) = Ax.",
  ex:[T("T(x, y) = (2x − y, x + 3y)",["A = [2 −1; 1 3]"]),T("Is T linear?",["T(0) = 0 and T(cu + v) = cT(u) + T(v)"])]},
 lgeo:{grp:"Geometry",c:ORG,name:"Rotations, Reflections, Projections",hint:"known matrices",when:"Geometric transformations of ℝ"+sq+".",rule:"Rotation θ: [cos θ −sin θ; sin θ cos θ]. Reflection in y = x: [0 1; 1 0]. Projection onto the x-axis: [1 0; 0 0]. Shear: [1 k; 0 1].",
  ex:[T("Rotate 90°",["[0 −1; 1 0]"]),T("Reflect in the x-axis",["[1 0; 0 −1]"])]},
 lcomp:{grp:"Composition",c:RED,name:"Composition & Inverse",hint:"S ∘ T ↔ BA",when:"Doing one map after another.",rule:"(S ∘ T)(x) = B(Ax) = (BA)x: the first map is on the right. T invertible ⇔ A invertible; T<sup>−1</sup> ↔ A<sup>−1</sup>.",
  ex:[T("Rotate 90°, then reflect in y = x",["[0 1; 1 0][0 −1; 1 0] = [1 0; 0 −1]"]),T("Order",["Rightmost acts first"])]},
 lker:{grp:"Kernel & range",c:PURP,name:"Kernel, Range, 1–1, Onto",hint:"Nul A and Col A",when:"Injective/surjective questions.",rule:"ker T = Nul A; range T = Col A. One-to-one ⇔ ker T = {0} ⇔ pivot in every column. Onto ℝ<sup>m</sup> ⇔ pivot in every row.",
  ex:[T("A is 2 × 3",["Never one-to-one"]),T("A is 3 × 2",["Never onto ℝ"+cu])]},
 ldet:{grp:"Area",c:TEAL,name:"Area Scaling",hint:"|det A|",when:"How a map changes areas/volumes.",rule:"Area(T(S)) = |det A|·Area(S). det &lt; 0 means orientation is reversed.",
  ex:[T("A = [2 1; 0 3], unit square",["New area <b>6</b>"]),T("Reflection",["det −1: area kept, orientation flipped"])]},
 lend:{grp:"Last step",c:GRN,name:"Check on a Vector",hint:"test e₁",when:"Every answer.",rule:"Apply your matrix to e₁ and e₂ and compare with the description.",ex:[T("Rotation check",["[0 −1; 1 0](1, 0) = (0, 1) ✓"]),T("Linear?",["T(0) must be 0"])]}
};
const U5={id:"u5",num:5,short:"Linear Transformations",name:"Unit 5: Linear Transformations",sub:"Standard matrices, geometric maps, composition, kernel and range, one-to-one and onto, area scaling",c:TEAL,
 flow:{M:U5M,label:"Linear transformations flowchart",lead:"Everything about T starts with its standard matrix.",start:"Linear map T",top:["l0"],q:"What is asked?",cols:[["Geometric map","",ORG,["lgeo"]],["Composition","",RED,["lcomp"]],["1–1 / onto","",PURP,["lker"]],["Area","",TEAL,["ldet"]]],end:"lend"},
 sheet:[[NAVY,"Standard matrix",["A = [T(e₁) … T(e<sub>n</sub>)]","T linear ⇔ T(cu + v) = cT(u) + T(v)"],""],[ORG,"ℝ"+sq+" maps",["Rotation θ: [cos −sin; sin cos]","Reflect y = x: [0 1; 1 0]","Shear: [1 k; 0 1]"],""],[PURP,"Kernel & range",["1–1 ⇔ ker = {0}","Onto ⇔ Col A = ℝ<sup>m</sup>"],""],[TEAL,"Area",["Area scales by |det A|"],""]],
 gen:[
 ()=>{ const A=rnd(2,2,-5,5),x=[R(-4,4),R(-4,4)]; const y=mv(A,x); return P("Applying T",`T(x) = Ax with A = ${MX(A)}. Find the second component of T(x) for x = (${x.map(N).join(", ")}).`,y[1],[y[0],A[1][0]+A[1][1],-y[1]].filter(v=>v!==y[1]),[`Row 2 · x = (${N(A[1][0])})(${N(x[0])}) + (${N(A[1][1])})(${N(x[1])})`,`<b>${N(y[1])}</b>`]); },
 ()=>{ const S=pick([["rotation by 90° counterclockwise",[[0,-1],[1,0]]],["reflection in the line y = x",[[0,1],[1,0]]],["reflection in the x-axis",[[1,0],[0,-1]]],["rotation by 180°",[[-1,0],[0,-1]]],["projection onto the y-axis",[[0,0],[0,1]]]]); const all=[[[0,-1],[1,0]],[[0,1],[1,0]],[[1,0],[0,-1]],[[-1,0],[0,-1]],[[0,0],[0,1]],[[0,1],[-1,0]]]; return PS("Standard matrices",`What is the standard matrix of the ${S[0]}?`,MX(S[1]),shuffle(all.filter(m=>JSON.stringify(m)!==JSON.stringify(S[1]))).slice(0,3).map(MX),[`Columns are T(e₁) and T(e₂).`]); },
 ()=>{ const A=rnd(2,2,-4,4); const a=R(1,6); return P("Area scaling",`T has matrix ${MX(A)}. A region has area ${a}. What is the area of its image?`,Math.abs(d2(A))*a,[d2(A)*a,a,Math.abs(d2(A))].filter(v=>v!==Math.abs(d2(A))*a),[`|det A| = ${Math.abs(d2(A))}`,`${Math.abs(d2(A))} × ${a} = <b>${Math.abs(d2(A))*a}</b>`]); },
 ()=>{ const m=R(2,4),n=R(2,4),r=R(1,Math.min(m,n)); const one=r===n, onto=r===m; const ans=one&&onto?"Both":one?"One-to-one only":onto?"Onto only":"Neither"; return PS("One-to-one and onto",`T : ℝ<sup>${n}</sup> → ℝ<sup>${m}</sup> has a ${m} × ${n} matrix of rank ${r}. T is:`,ans,["Both","One-to-one only","Onto only","Neither"].filter(x=>x!==ans),[`1–1 ⇔ rank = ${n} (columns); onto ⇔ rank = ${m} (rows)`,`<b>${ans}</b>`]); },
 ()=>{ const A=rnd(2,2,-3,3),B=rnd(2,2,-3,3); const C=mm(B,A); return P("Composition",`T has matrix A = ${MX(A)}, S has matrix B = ${MX(B)}. Find the (1, 1) entry of the matrix of S ∘ T.`,C[0][0],[mm(A,B)[0][0],A[0][0]*B[0][0],C[1][1]].filter(v=>v!==C[0][0]),[`S ∘ T ↔ BA (T acts first)`,`(BA)₁₁ = <b>${N(C[0][0])}</b>`]); }],
 chal:[
 ()=>{ const a=nz(-5,5),b=nz(-5,5); return PS("Linearity",`Is T(x, y) = (x + ${N(a)}, ${N(b)}y) linear?`,"No, T(0) ≠ 0",["Yes","Yes, it is a translation","Only if b = 1"],[`T(0, 0) = (${N(a)}, 0) ≠ 0`,`<b>Not linear</b>`]); },
 ()=>{ const k=nz(-4,4),n=R(2,5); return P("Powers of a shear",`T has matrix ${MX([[1,k],[0,1]])}. Find the (1, 2) entry of the matrix of T applied ${n} times.`,n*k,[k**n,k,n+k],[`[1 k; 0 1]<sup>n</sup> = [1 nk; 0 1]`,`<b>${N(n*k)}</b>`]); }],
 frq:[()=>{ const k=nz(-3,3);
  return {t:"Building a transformation",calc:false,stem:`T : ℝ² → ℝ² first rotates by 90° counterclockwise, then applies the shear [1 ${N(k)}; 0 1].`,parts:[
   [`Give the matrices R (rotation) and S (shear).`,[`R = ${MX([[0,-1],[1,0]])}, S = ${MX([[1,k],[0,1]])}`],"",1],
   [`Find the standard matrix of T.`,[`T = S ∘ R ↔ SR = ${MX(mm([[1,k],[0,1]],[[0,-1],[1,0]]))}`],MX(mm([[1,k],[0,1]],[[0,-1],[1,0]])),2],
   [`Find T(1, 2).`,[`${MX(mm([[1,k],[0,1]],[[0,-1],[1,0]]))}(1, 2) = (${mv(mm([[1,k],[0,1]],[[0,-1],[1,0]]),[1,2]).map(N).join(", ")})`],`(${mv(mm([[1,k],[0,1]],[[0,-1],[1,0]]),[1,2]).map(N).join(", ")})`,1],
   [`Is T invertible? How does it change areas?`,[`det = det S · det R = 1 · 1 = 1 ≠ 0.`,`Invertible; areas are unchanged.`],"Yes; area factor 1",2]]}; }]
};

/* ================= U6 Eigenvalues ================= */
const U6M={
 e0:{grp:"Step 1",c:NAVY,name:"Characteristic Equation",hint:"det(A − λI) = 0",when:"Finding eigenvalues.",rule:"Solve det(A − λI) = 0. 2 × 2: λ"+sq+" − (tr A)λ + det A = 0. Triangular: the diagonal entries.",
  ex:[T("A = [4 1; 2 3]",["λ"+sq+" − 7λ + 10 = 0 ⇒ λ = 2, 5"]),T("Triangular",["Read off the diagonal"])]},
 evec:{grp:"Vectors",c:ORG,name:"Eigenvectors",hint:"Nul(A − λI)",when:"For each eigenvalue.",rule:"Solve (A − λI)v = 0. The eigenspace is that null space (nonzero vectors only).",
  ex:[T("A = [4 1; 2 3], λ = 5",["[−1 1; 2 −2]v = 0 ⇒ v = (1, 1)"]),T("λ = 2",["v = (1, −2)"])]},
 ediag:{grp:"Diagonalize",c:RED,name:"Diagonalization",hint:"A = PDP<sup>−1</sup>",when:"Powers of A, or “is A diagonalizable?”",rule:"n independent eigenvectors ⇒ A = PDP<sup>−1</sup> (eigenvectors in P, eigenvalues in D). Distinct eigenvalues guarantee it. A<sup>k</sup> = PD<sup>k</sup>P<sup>−1</sup>.",
  ex:[T("Distinct λ in a 2 × 2",["Always diagonalizable"]),T("[1 1; 0 1]",["λ = 1 twice, one eigenvector: not diagonalizable"])]},
 eprop:{grp:"Shortcuts",c:PURP,name:"Trace & Determinant",hint:"sum and product",when:"Quick checks.",rule:"Σλ = tr A, Πλ = det A. A invertible ⇔ 0 is not an eigenvalue. A<sup>k</sup> has eigenvalues λ<sup>k</sup>; A<sup>−1</sup> has 1/λ.",
  ex:[T("tr 7, det 10",["λ = 2, 5"]),T("λ = 3 for A",["λ = 9 for A"+sq])]},
 eend:{grp:"Last step",c:GRN,name:"Check Av = λv",hint:"multiply",when:"Every eigenpair.",rule:"Multiply A by your vector; the result must be λ times the vector.",ex:[T("[4 1; 2 3](1, 1)",["(5, 5) = 5(1, 1) ✓"]),T("Zero vector",["Never an eigenvector"])]}
};
function eig2(){ const l1=R(-4,5); let l2=R(-4,5); if(l2===l1) l2=l1+R(1,3); const P0=unimod(2); const dt=d2(P0); const Pi=[[P0[1][1],-P0[0][1]],[-P0[1][0],P0[0][0]]].map(r=>r.map(x=>x*dt)); const A=mm(mm(P0,[[l1,0],[0,l2]]),Pi); return {A,l1,l2,P:P0}; }
const U6={id:"u6",num:6,short:"Eigenvalues",name:"Unit 6: Eigenvalues, Eigenvectors and Diagonalization",sub:"Characteristic polynomial, eigenspaces, diagonalization, powers of matrices",c:BLU,
 flow:{M:U6M,label:"Eigenvalues flowchart",lead:"Eigenvalues first, then eigenvectors, then decide if A is diagonalizable.",start:"Eigen problem",top:["e0"],q:"What next?",cols:[["Eigenvectors","",ORG,["evec"]],["Diagonalize / powers","",RED,["ediag"]],["Quick facts","",PURP,["eprop"]]],end:"eend"},
 sheet:[[NAVY,"Eigenvalues",["det(A − λI) = 0","2 × 2: λ"+sq+" − (tr)λ + det = 0","Triangular: diagonal"],""],[ORG,"Eigenvectors",["(A − λI)v = 0, v ≠ 0"],""],[RED,"Diagonalization",["A = PDP<sup>−1</sup>","A<sup>k</sup> = PD<sup>k</sup>P<sup>−1</sup>","Distinct eigenvalues ⇒ diagonalizable"],""],[PURP,"Facts",["Σλ = tr A, Πλ = det A","λ(A<sup>k</sup>) = λ<sup>k</sup>","Symmetric ⇒ real λ, orthogonal eigenvectors"],""]],
 gen:[
 ()=>{ const {A,l1,l2}=eig2(); return P("Eigenvalues",`Find the larger eigenvalue of ${MX(A)}.`,Math.max(l1,l2),[Math.min(l1,l2),A[0][0]+A[1][1],d2(A)].filter(v=>v!==Math.max(l1,l2)),[`λ${sq}${sg(-(A[0][0]+A[1][1]))}λ${sg(d2(A))} = 0`,`λ = ${N(l1)}, ${N(l2)}: <b>${N(Math.max(l1,l2))}</b>`]); },
 ()=>{ const a=R(-5,5),b=R(-5,5),c=R(-5,5); return P("Triangular",`What is the sum of the eigenvalues of ${MX([[a,R(-5,5),R(-5,5)],[0,b,R(-5,5)],[0,0,c]])}?`,a+b+c,[a*b*c,a+b,0].filter(x=>x!==a+b+c),[`Triangular: eigenvalues ${N(a)}, ${N(b)}, ${N(c)}`,`Sum = <b>${N(a+b+c)}</b>`]); },
 ()=>{ const {A,l1,l2}=eig2(); return P("Trace and determinant",`A is 2 × 2 with eigenvalues ${N(l1)} and ${N(l2)}. Find det A.`,l1*l2,[l1+l2,l1-l2,l1*l1+l2*l2].filter(v=>v!==l1*l2),[`det A = λ₁λ₂`,`<b>${N(l1*l2)}</b>`]); },
 ()=>{ const l=nz(-3,3),k=R(2,4); return P("Powers",`λ = ${N(l)} is an eigenvalue of A. What eigenvalue does A<sup>${k}</sup> have for the same eigenvector?`,l**k,[k*l,l+k,l],[`A<sup>k</sup>v = λ<sup>k</sup>v`,`(${N(l)})<sup>${k}</sup> = <b>${N(l**k)}</b>`]); },
 ()=>{ const {A,l1,l2}=eig2(); const B=[[A[0][0]-l1,A[0][1]],[A[1][0]-l1,A[1][1]-l1]]; let v=B[0][1]||B[0][0]?[-B[0][1],B[0][0]]:[-B[1][1],B[1][0]]; const g=gcd(Math.abs(v[0]),Math.abs(v[1]))||1; v=v.map(x=>x/g); if(v[0]<0||(v[0]===0&&v[1]<0)) v=v.map(x=>-x); if(!v[0]) return null; return PF("Eigenvectors",`A = ${MX(A)} has eigenvalue λ = ${N(l1)}. An eigenvector is (1, m). Find m.`,v[1],v[0],[F(-v[1],v[0]),F(v[0],v[1]||1),"0"],[`A − (${N(l1)})I = ${MX(B)}`,`Solve: v = (${N(v[0])}, ${N(v[1])}) ∝ (1, ${F(v[1],v[0])})`,`<b>m = ${F(v[1],v[0])}</b>`]); }],
 chal:[
 ()=>{ const {A,l1,l2,P:P0}=eig2(); const k=R(3,5); const dt=d2(P0); const Pi=[[P0[1][1],-P0[0][1]],[-P0[1][0],P0[0][0]]].map(r=>r.map(x=>x*dt)); const Ak=mm(mm(P0,[[l1**k,0],[0,l2**k]]),Pi); return P("Diagonalization",`A = ${MX(A)} = PDP<sup>−1</sup> with P = ${MX(P0)}, D = ${MX([[l1,0],[0,l2]])}. Find the (1, 1) entry of A<sup>${k}</sup>.`,Ak[0][0],[A[0][0]**k,l1**k,Ak[1][1]].filter(v=>v!==Ak[0][0]),[`A<sup>${k}</sup> = PD<sup>${k}</sup>P<sup>−1</sup>, D<sup>${k}</sup> = diag(${N(l1**k)}, ${N(l2**k)})`,`<b>${N(Ak[0][0])}</b>`]); },
 ()=>{ const a=R(-4,4); return PS("Diagonalizable?",`Is ${MX([[a,1],[0,a]])} diagonalizable?`,"No",["Yes","Only if a = 0","Only if a &gt; 0"],[`λ = ${N(a)} (twice), A − λI = [0 1; 0 0] has nullity 1.`,`Only one independent eigenvector: <b>No</b>`]); }],
 frq:[()=>{ const {A,l1,l2,P:P0}=eig2(); const dt=d2(P0); const Pi=[[P0[1][1],-P0[0][1]],[-P0[1][0],P0[0][0]]].map(r=>r.map(x=>x*dt)); const A3=mm(mm(P0,[[l1**3,0],[0,l2**3]]),Pi);
  return {t:"Diagonalization",calc:false,stem:`Let A = ${MX(A)}.`,parts:[
   [`Find the characteristic polynomial and the eigenvalues.`,[`λ${sq} − (${N(A[0][0]+A[1][1])})λ + (${N(d2(A))})`,`Roots λ = ${N(l1)}, ${N(l2)}.`],`${N(l1)}, ${N(l2)}`,2],
   [`Find an eigenvector for each eigenvalue.`,[`For λ = ${N(l1)}: (${P0.map(r=>N(r[0])).join(", ")}); for λ = ${N(l2)}: (${P0.map(r=>N(r[1])).join(", ")}) (any nonzero multiples).`],"",2],
   [`Write A = PDP<sup>−1</sup>.`,[`P = ${MX(P0)}, D = ${MX([[l1,0],[0,l2]])}, P<sup>−1</sup> = ${MX(Pi)}`],"",2],
   [`Compute A${cu}.`,[`A${cu} = PD${cu}P<sup>−1</sup> = ${MX(A3)}`],MX(A3),2]]}; }]
};

/* ================= U7 Orthogonality ================= */
const U7M={
 o0:{grp:"Step 1",c:NAVY,name:"Dot Products First",hint:"u · v",when:"Lengths, angles, orthogonality.",rule:"u · v = Σu<sub>i</sub>v<sub>i</sub>; ‖u‖ = √(u · u); cos θ = u · v/(‖u‖‖v‖). Orthogonal ⇔ u · v = 0.",
  ex:[T("(1, 2, 2)",["‖u‖ = 3"]),T("(1, 2) · (2, −1)",["0: orthogonal"])]},
 oproj:{grp:"Projection",c:ORG,name:"Orthogonal Projection",hint:"(u·v/v·v)v",when:"Component of u along v, distance to a line.",rule:"proj<sub>v</sub>u = "+FR("u · v","v · v")+"v. The error u − proj is orthogonal to v.",
  ex:[T("u = (3, 4), v = (1, 0)",["proj = (3, 0)"]),T("Distance to the line",["‖u − proj‖"])]},
 ogs:{grp:"Orthogonal basis",c:RED,name:"Gram–Schmidt",hint:"subtract projections",when:"Build an orthogonal/orthonormal basis.",rule:"v₁ = x₁; v₂ = x₂ − proj<sub>v₁</sub>x₂; v₃ = x₃ − proj<sub>v₁</sub>x₃ − proj<sub>v₂</sub>x₃. Normalize to get orthonormal. (QR: A = QR.)",
  ex:[T("x₁ = (1, 1), x₂ = (1, 0)",["v₂ = (1, 0) − ½(1, 1) = (½, −½)"]),T("Normalize",["Divide by the length"])]},
 olsq:{grp:"No exact solution",c:PURP,name:"Least Squares",hint:"AᵀAx̂ = Aᵀb",when:"Ax = b is inconsistent (data fitting).",rule:"Solve the normal equations AᵀAx̂ = Aᵀb. For a line y = c + mx: columns 1 and x.",
  ex:[T("Points (0, 1), (1, 2), (2, 4)",["Best line y = "+FR(5,6)+" + "+FR(3,2)+"x"]),T("Residual",["b − Ax̂ ⟂ Col A"])]},
 oend:{grp:"Last step",c:GRN,name:"Check Orthogonality",hint:"dot = 0",when:"Every answer.",rule:"Check that your error/basis vectors are orthogonal by dotting them.",ex:[T("Gram–Schmidt check",["v₁ · v₂ = 0"]),T("Least squares check",["Aᵀ(b − Ax̂) = 0"])]}
};
const U7={id:"u7",num:7,short:"Orthogonality",name:"Unit 7: Orthogonality and Least Squares",sub:"Dot products, norms, projections, Gram–Schmidt, orthogonal matrices, least squares",c:GRN,
 flow:{M:U7M,label:"Orthogonality flowchart",lead:"Projection, Gram–Schmidt or least squares? Everything is built from dot products.",start:"Orthogonality problem",top:["o0"],q:"What is asked?",cols:[["Projection","",ORG,["oproj"]],["Orthogonal basis","",RED,["ogs"]],["Best fit","",PURP,["olsq"]]],end:"oend"},
 sheet:[[NAVY,"Dot product",["u · v = Σu<sub>i</sub>v<sub>i</sub>","‖u‖ = √(u · u)","cos θ = u · v/(‖u‖‖v‖)"],""],[ORG,"Projection",["proj<sub>v</sub>u = (u · v/v · v)v"],""],[RED,"Gram–Schmidt",["v<sub>k</sub> = x<sub>k</sub> − Σ proj<sub>v<sub>j</sub></sub>x<sub>k</sub>","Orthogonal matrix: QᵀQ = I"],""],[PURP,"Least squares",["AᵀAx̂ = Aᵀb","Line fit: columns 1 and x"],""]],
 gen:[
 ()=>{ const u=[R(-5,5),R(-5,5),R(-5,5)],v=[R(-5,5),R(-5,5),R(-5,5)]; return P("Dot products",`Find (${u.map(N).join(", ")}) · (${v.map(N).join(", ")}).`,dot(u,v),[dot(u,u),u[0]*v[0],-dot(u,v)].filter(x=>x!==dot(u,v)),[u.map((x,i)=>`(${N(x)})(${N(v[i])})`).join(" + "),`<b>${N(dot(u,v))}</b>`]); },
 ()=>{ const S=pick([[1,2,2,3],[2,3,6,7],[1,4,8,9],[4,4,7,9],[2,6,9,11]]); const s=pick([1,-1]); return P("Norms",`Find ‖(${N(s*S[0])}, ${S[1]}, ${N(-s*S[2])})‖.`,S[3],[S[3]*S[3],S[0]+S[1]+S[2],S[3]+1],[`√(${S[0]**2} + ${S[1]**2} + ${S[2]**2}) = √${S[3]**2}`,`<b>${S[3]}</b>`]); },
 ()=>{ const a=nz(-5,5),b=nz(-5,5),c=nz(-4,4); return PF("Orthogonality",`For which k is (${N(a)}, ${N(b)}, k) orthogonal to (${N(b)}, ${N(a)}, ${N(c)})?`,-2*a*b,c,[F(2*a*b,c),"0",F(-a*b,c)],[`(${N(a)})(${N(b)}) + (${N(b)})(${N(a)}) + (${N(c)})k = 0`,`<b>k = ${F(-2*a*b,c)}</b>`]); },
 ()=>{ const u=[R(-5,5),R(-5,5)],v=[R(-4,4),R(-4,4)]; const vv=dot(v,v); if(!vv) return null; return PF("Projections",`Find the scalar c with proj<sub>v</sub>u = cv, u = (${u.map(N).join(", ")}), v = (${v.map(N).join(", ")}).`,dot(u,v),vv,[F(dot(u,v),dot(u,u)||1),N(dot(u,v)),F(vv,dot(u,v)||1)],[`c = ${FR("u · v","v · v")} = ${FR(N(dot(u,v)),vv)}`,`<b>${F(dot(u,v),vv)}</b>`]); },
 ()=>{ const m=nz(-3,3),c0=R(-4,4); const xs=[-1,0,1]; const d=[R(-1,1),R(-1,1),R(-1,1)]; const ys=xs.map((x,i)=>c0+m*x+d[i]); const sy=ys.reduce((a,b)=>a+b,0), sxy=xs.reduce((a,x,i)=>a+x*ys[i],0); return PF("Least squares",`Fit y = c + mx by least squares to (−1, ${N(ys[0])}), (0, ${N(ys[1])}), (1, ${N(ys[2])}). Find m.`,sxy,2,[F(sy,3),F(sxy,3),N(m)],[`Normal equations: 3c = ${N(sy)}, 2m = ${N(sxy)} (since Σx = 0, Σx${sq} = 2)`,`<b>m = ${F(sxy,2)}</b>`]); }],
 chal:[
 ()=>{ const a=R(1,4); return PF("Gram–Schmidt",`Apply Gram–Schmidt to x₁ = (1, 1, 0), x₂ = (${a}, 0, 1). v₂ = x₂ − cx₁. Find c.`,a,2,[N(a),F(1,2),F(a,3)],[`c = ${FR("x₂ · x₁","x₁ · x₁")} = ${FR(a,2)}`,`<b>${F(a,2)}</b>`]); },
 ()=>{ return PS("Orthogonal matrices",`Q is orthogonal (QᵀQ = I). Which must be true?`,"det Q = ±1",["det Q = 0","Q is symmetric","Q has only eigenvalue 1"],[`det(QᵀQ) = (det Q)${sq} = 1`,`<b>det Q = ±1</b>`]); }],
 frq:[()=>{ const xs=[0,1,2,3]; const m=nz(-2,3),c=R(-3,3); const ys=xs.map(x=>c+m*x+R(-1,1)); const n=4,sx=6,sxx=14,sy=ys.reduce((a,b)=>a+b,0),sxy=xs.reduce((a,x,i)=>a+x*ys[i],0); const D=n*sxx-sx*sx; const mh=n*sxy-sx*sy, ch=sxx*sy-sx*sxy;
  return {t:"Least squares line",calc:true,stem:`Fit y = c₀ + c₁x to the points ${xs.map((x,i)=>`(${x}, ${N(ys[i])})`).join(", ")}.`,parts:[
   [`Write A and b for the system A(c₀, c₁) = b.`,[`A has rows (1, x<sub>i</sub>); b = (${ys.map(N).join(", ")}).`],"",1],
   [`Compute AᵀA and Aᵀb.`,[`AᵀA = ${MX([[4,6],[6,14]])}, Aᵀb = (${N(sy)}, ${N(sxy)})`],"",2],
   [`Solve the normal equations.`,[`det AᵀA = ${D}`,`c₁ = ${F(mh,D)}, c₀ = ${F(ch,D)}`],`y = ${F(ch,D)} + ${F(mh,D)}x`,2],
   [`Explain why the residual vector is orthogonal to the columns of A.`,[`The normal equations say Aᵀ(b − Ax̂) = 0: the residual is orthogonal to each column.`],"",1]]}; }]
};

const units=[U1,U2,U3,U4,U5,U6,U7];
const wrap=g=>()=>{ for(let i=0;i<20;i++){ const p=g(); if(p) return p; } return g(); };
units.forEach(u=>{ ["gen","chal","frq"].forEach(k=>u[k]=(u[k]||[]).map(wrap)); });
const pickU=k=>()=>{ const u=pick(units.filter(x=>x[k].length)); return pick(u[k])(); };
units.push({id:"review",num:8,label:"Final review",short:"Final Review",name:"Final Review: Mixed Practice",sub:"Mixed questions and free response from every unit, like a final exam. New each time.",c:"#111",
  sheet:units.map(u=>[u.c,u.short,u.sheet[0][2],""]),gen:units.flatMap(u=>u.gen),chal:units.flatMap(u=>u.chal),frq:units.flatMap(u=>u.frq)});
units.push({id:"exams",num:0,label:"University exams",short:"University Exams",name:"Real University Exams with Solutions",sub:"Free exams and solutions from MIT 18.06 Linear Algebra (MIT OpenCourseWare), matched to the units of this book",c:"#7a5a12",gen:[],chal:[],frq:[],sheet:[["#1d4e89", "MIT 18.06, Spring 2010 (OpenCourseWare)", ["<a href=\"https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/pages/exams/\" target=\"_blank\" rel=\"noopener\">Exams 1–3 and final, each with solutions</a>"], "Three hour-long exams through the semester, then a final covering the whole course."], ["#6a3d9a", "MIT 18.06SC, Fall 2011 (OpenCourseWare)", ["<a href=\"https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/resource-index\" target=\"_blank\" rel=\"noopener\">Exams with solutions, plus problems and solutions for every topic</a>"], "Organized by unit: Ax = b and the four subspaces; least squares, determinants and eigenvalues; positive definite matrices."], ["#0f7a6c", "MIT 18.06 archive (older semesters)", ["<a href=\"https://web.mit.edu/18.06/www/Spring98/Spring98.html\" target=\"_blank\" rel=\"noopener\">Spring 1998: exams I–III, final, solutions</a>", "<a href=\"https://web.mit.edu/18.06/www/Fall05/examsF05.html\" target=\"_blank\" rel=\"noopener\">Fall 2005: exams 1–3, final, solutions</a>", "<a href=\"https://www.mit.edu/~18.06/Spring07/examsS07.html\" target=\"_blank\" rel=\"noopener\">Spring 2007: exams with solutions</a>", "<a href=\"https://www.mit.edu/~18.06/\" target=\"_blank\" rel=\"noopener\">18.06 home: all archived exams and problem sets</a>"], ""]]});

window.ZC={units,strands:[["Systems & matrices",NAVY,["u1","u2","u3"]],["Spaces & maps",PURP,["u4","u5"]],["Spectral & geometry",BLU,["u6","u7"]],["Exam prep","#111",["review","exams"]]],mapNote:"A first course in linear algebra, in order.",frqLead:"Free-response questions in university exam format."};
})();
