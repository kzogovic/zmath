/* Z-Discrete Math content. Every answer is computed. */
(function(){
const {R,pick,nz,gcd,shuffle,C,fact,N,F,sq,cu,X,sg,P,PF,PS}=window.ZH;
const FR=(n,d)=>`<span class="frc"><span>${n}</span><span>${d}</span></span>`;
const T=(...r)=>r;
const NAVY="#1d4e89",ORG="#c2571a",RED="#c23a52",PURP="#6a3d9a",TEAL="#0f7a6c",GRN="#137333",BLU="#1f4fd1",BRN="#7a5a12";
const md=(a,m)=>((a%m)+m)%m;
const powmod=(b,e,m)=>{ let r=1%m; b=md(b,m); while(e>0){ if(e&1) r=r*b%m; b=b*b%m; e>>=1; } return r; };
function egcd(a,b){ if(!b) return [a,1,0]; const [g,x,y]=egcd(b,a%b); return [g,y,x-Math.floor(a/b)*y]; }
const inv=(a,m)=>{ const [g,x]=egcd(md(a,m),m); return g===1?md(x,m):null; };
function euclid(a,b){ const st=[]; while(b){ st.push(`${a} = ${Math.floor(a/b)}·${b} + ${a%b}`); [a,b]=[b,a%b]; } return [a,st]; }
const tb=(h,rows)=>`<table class="fq-tb"><tr>${h.map(x=>`<th>${x}</th>`).join("")}</tr>${rows.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join("")}</tr>`).join("")}</table>`;

/* ============ U1 Logic ============ */
const U1M={
 g0:{grp:"Step 1",c:NAVY,name:"Translate to Symbols",hint:"p, q, ¬, ∧, ∨, →, ↔",when:"Any logic statement.",rule:"Name the simple statements, then connect: not ¬, and ∧, or ∨, if…then →, iff ↔. “Only if” points forward: p only if q is p → q.",
  ex:[T("If it rains, the game is cancelled",["r → c"]),T("p only if q",["p → q"])]},
 gtt:{grp:"Decide truth",c:ORG,name:"Truth Tables",hint:"2ⁿ rows",when:"Tautology, contradiction, equivalence.",rule:"List all 2ⁿ combinations. p → q is false only when p is T and q is F. Tautology: always T. Equivalent: same column.",
  ex:[T("p → q vs ¬p ∨ q",["Same column: equivalent"]),T("3 variables",["8 rows"])]},
 geq:{grp:"Simplify / rewrite",c:RED,name:"Logical Equivalences",hint:"De Morgan, contrapositive",when:"Simplify or rewrite a statement.",rule:"¬(p ∧ q) ≡ ¬p ∨ ¬q; ¬(p ∨ q) ≡ ¬p ∧ ¬q; p → q ≡ ¬q → ¬p ≡ ¬p ∨ q; ¬(p → q) ≡ p ∧ ¬q. The converse q → p is NOT equivalent.",
  ex:[T("Negate “if x &gt; 2 then x"+sq+" &gt; 4”",["x &gt; 2 and x"+sq+" ≤ 4"]),T("Contrapositive of p → q",["¬q → ¬p"])]},
 gq:{grp:"Quantifiers",c:PURP,name:"Quantifiers & Negation",hint:"∀ ↔ ∃",when:"“For all”, “there exists”.",rule:"¬∀x P(x) ≡ ∃x ¬P(x); ¬∃x P(x) ≡ ∀x ¬P(x). Order matters: ∀x∃y differs from ∃y∀x.",
  ex:[T("Negate ∀x (x"+sq+" ≥ 0)",["∃x (x"+sq+" &lt; 0)"]),T("∀x∃y (y &gt; x) on ℤ",["True"])]},
 ginf:{grp:"Arguments",c:TEAL,name:"Rules of Inference",hint:"modus ponens, tollens",when:"Is an argument valid?",rule:"Modus ponens: p → q, p ⊢ q. Modus tollens: p → q, ¬q ⊢ ¬p. Hypothetical syllogism: p → q, q → r ⊢ p → r. Fallacies: affirming the consequent, denying the antecedent.",
  ex:[T("p → q, q ⊢ p?",["Invalid: affirming the consequent"]),T("p → q, ¬q ⊢ ¬p",["Valid: modus tollens"])]},
 gend:{grp:"Last step",c:GRN,name:"Translate Back",hint:"plain English",when:"Every answer.",rule:"Rewrite your symbolic answer as a clear sentence and check one row.",ex:[T("¬p ∨ q",["“Not p, or q”"]),T("Check",["Try p = T, q = F"])]}
};
const U1={id:"u1",num:1,short:"Logic",name:"Unit 1: Propositional and Predicate Logic",sub:"Connectives, truth tables, equivalences, conditionals, quantifiers, rules of inference",c:NAVY,
 flow:{M:U1M,label:"Logic flowchart",lead:"Translate first, then pick the tool.",start:"Logic problem",top:["g0"],q:"What is asked?",cols:[["True/false always?","",ORG,["gtt"]],["Rewrite / negate","",RED,["geq"]],["∀ / ∃","",PURP,["gq"]],["Valid argument?","",TEAL,["ginf"]]],end:"gend"},
 sheet:[[ORG,"Connectives",["p → q false only for T → F","p ↔ q true when same values","n variables: 2ⁿ rows"],""],[RED,"Key equivalences",["De Morgan: ¬(p ∧ q) ≡ ¬p ∨ ¬q","p → q ≡ ¬p ∨ q ≡ ¬q → ¬p","¬(p → q) ≡ p ∧ ¬q"],""],[PURP,"Quantifiers",["¬∀x P ≡ ∃x ¬P","¬∃x P ≡ ∀x ¬P"],""],[TEAL,"Inference",["Modus ponens / tollens","Hypothetical syllogism","Disjunctive syllogism: p ∨ q, ¬p ⊢ q"],""]],
 gen:[
 ()=>{ const n=R(2,6); return P("Truth tables",`How many rows does a truth table with ${n} variables have?`,2**n,[2*n,n*n,2**(n-1)],[`Each variable is T or F: 2<sup>${n}</sup>`,`<b>${2**n}</b>`]); },
 ()=>{ const p=pick([true,false]),q=pick([true,false]),r=pick([true,false]); const v=(!p||q)&&(q||!r); const t=x=>x?"T":"F"; return PS("Evaluating",`p = ${t(p)}, q = ${t(q)}, r = ${t(r)}. Find (p → q) ∧ (q ∨ ¬r).`,t(v),[t(!v),"Cannot tell","Both"],[`p → q = ${t(!p||q)}, q ∨ ¬r = ${t(q||!r)}`,`<b>${t(v)}</b>`]); },
 ()=>{ const S=pick([["¬(p ∧ q)","¬p ∨ ¬q",["¬p ∧ ¬q","p ∨ q","¬p ∧ q"]],["¬(p ∨ q)","¬p ∧ ¬q",["¬p ∨ ¬q","p ∧ q","¬p ∨ q"]],["p → q","¬q → ¬p",["q → p","¬p → ¬q","p ∧ ¬q"]],["¬(p → q)","p ∧ ¬q",["¬p → ¬q","¬p ∧ q","q → p"]],["p → q","¬p ∨ q",["p ∨ ¬q","¬p ∧ q","q → p"]]]); return PS("Equivalences",`Which is equivalent to ${S[0]}?`,S[1],S[2],[`<b>${S[0]} ≡ ${S[1]}</b>`]); },
 ()=>{ const S=pick([["∀x (x"+sq+" ≥ 0)","∃x (x"+sq+" &lt; 0)",["∀x (x"+sq+" &lt; 0)","∃x (x"+sq+" ≥ 0)","∀x (x"+sq+" ≤ 0)"]],["∃x (x + 2 = 5)","∀x (x + 2 ≠ 5)",["∃x (x + 2 ≠ 5)","∀x (x + 2 = 5)","∃x (x ≠ 3)"]],["∀x ∃y (x + y = 0)","∃x ∀y (x + y ≠ 0)",["∀x ∀y (x + y ≠ 0)","∃x ∃y (x + y ≠ 0)","∀y ∃x (x + y = 0)"]]]); return PS("Quantifiers",`What is the negation of ${S[0]}?`,S[1],S[2],[`Swap ∀ ↔ ∃ and negate the predicate`,`<b>${S[1]}</b>`]); },
 ()=>{ const S=pick([["p → q, p ⊢ q","Valid (modus ponens)"],["p → q, ¬q ⊢ ¬p","Valid (modus tollens)"],["p → q, q ⊢ p","Invalid (affirming the consequent)"],["p → q, ¬p ⊢ ¬q","Invalid (denying the antecedent)"],["p ∨ q, ¬p ⊢ q","Valid (disjunctive syllogism)"]]); const all=["Valid (modus ponens)","Valid (modus tollens)","Invalid (affirming the consequent)","Invalid (denying the antecedent)","Valid (disjunctive syllogism)"]; return PS("Arguments",`Classify the argument ${S[0]}.`,S[1],shuffle(all.filter(x=>x!==S[1])).slice(0,3),[`<b>${S[1]}</b>`]); }],
 chal:[
 ()=>{ const n=R(2,4); return P("Counting truth tables",`How many different truth tables (Boolean functions) are there with ${n} variables?`,2**(2**n),[2**n,2*2**n,(2**n)**2],[`Each of the 2<sup>${n}</sup> = ${2**n} rows can be T or F`,`2<sup>${2**n}</sup> = <b>${N(2**(2**n))}</b>`]); },
 ()=>{ return PS("Tautologies",`Which is a tautology?`,"(p ∧ (p → q)) → q",["(p → q) → p","(p ∨ q) → p","q → (p ∧ q)"],[`Modus ponens as a single statement is always true.`]); }],
 frq:[()=>{ const S=pick([["(p → q) ∧ (q → r)","p → r"],["¬(p ∨ q)","¬p ∧ ¬q"],["p → (q → r)","(p ∧ q) → r"]]); const rows=[]; for(const p of [1,0]) for(const q of [1,0]) for(const r of [1,0]) rows.push([p,q,r]);
  const ev=(s,[p,q,r])=>{ const imp=(a,b)=>!a||b; if(s==="(p → q) ∧ (q → r)") return imp(p,q)&&imp(q,r); if(s==="p → r") return imp(p,r); if(s==="¬(p ∨ q)") return !(p||q); if(s==="¬p ∧ ¬q") return !p&&!q; if(s==="p → (q → r)") return imp(p,imp(q,r)); return imp(p&&q,r); };
  const t=x=>x?"T":"F"; const same=rows.every(r=>ev(S[0],r)===ev(S[1],r)); const imp=rows.every(r=>!ev(S[0],r)||ev(S[1],r));
  return {t:"Truth tables and equivalence",calc:false,stem:`Let A = ${S[0]} and B = ${S[1]}.`,parts:[
   [`Build the truth table for A and B (variables p, q, r).`,[tb(["p","q","r","A","B"],rows.map(r=>[...r.map(t),t(ev(S[0],r)),t(ev(S[1],r))]))],"",3],
   [`Are A and B logically equivalent? Justify.`,[same?"The columns agree in every row: equivalent.":"Some row differs: not equivalent."],same?"Yes":"No",1],
   [`Does A imply B (is A → B a tautology)?`,[imp?"Whenever A is T, B is T: yes.":"Some row has A T and B F: no."],imp?"Yes":"No",1],
   [`Write the negation of B without → (use De Morgan).`,[S[1]==="p → r"?"¬(p → r) ≡ p ∧ ¬r":S[1]==="¬p ∧ ¬q"?"¬(¬p ∧ ¬q) ≡ p ∨ q":"¬((p ∧ q) → r) ≡ p ∧ q ∧ ¬r"],"",2]]}; }]
};

/* ============ U2 Proofs and induction ============ */
const U2M={
 p0:{grp:"Step 1",c:NAVY,name:"Identify the Claim's Form",hint:"if-then? for all n? exists?",when:"Before writing a proof.",rule:"“If P then Q”: direct or contrapositive. “For all n ≥ n₀”: induction. “There is no…”/irrational: contradiction. “There exists”: give an example. “For all” is false: one counterexample.",
  ex:[T("√2 is irrational",["Contradiction"]),T("Σk = n(n + 1)/2",["Induction"])]},
 pdir:{grp:"If–then",c:ORG,name:"Direct Proof",hint:"assume P, derive Q",when:"P gives useful algebra.",rule:"Assume P. Use definitions (even n = 2k, odd n = 2k + 1, a | b ⇔ b = ak). Reach Q.",
  ex:[T("n odd ⇒ n"+sq+" odd",["n = 2k + 1 ⇒ n"+sq+" = 2(2k"+sq+" + 2k) + 1"]),T("a | b, b | c ⇒ a | c",["c = b m = a(km)"])]},
 pcon:{grp:"If–then",c:ORG,name:"Contrapositive",hint:"¬Q ⇒ ¬P",when:"Q is hard to use, ¬Q is easy.",rule:"Prove ¬Q → ¬P instead; it is equivalent.",
  ex:[T("n"+sq+" even ⇒ n even",["Prove: n odd ⇒ n"+sq+" odd"]),T("xy irrational ⇒ x or y irrational",["Both rational ⇒ xy rational"])]},
 pcd:{grp:"Impossibility",c:RED,name:"Contradiction",hint:"assume the opposite",when:"Irrationality, infinitely many, “no such…”.",rule:"Assume the statement is false and derive a contradiction.",
  ex:[T("√2 irrational",["√2 = a/b in lowest terms ⇒ both even: contradiction"]),T("Infinitely many primes",["Euclid: p₁p₂…p<sub>k</sub> + 1"])]},
 pind:{grp:"For all n",c:PURP,name:"Mathematical Induction",hint:"base + step",when:"Statements P(n) for all integers n ≥ n₀: sums, divisibility, inequalities.",rule:"Base case P(n₀). Inductive step: assume P(k), prove P(k + 1). Strong induction: assume P(n₀), …, P(k).",
  ex:[T("Σ<sub>i=1</sub><sup>n</sup> i = n(n + 1)/2",["Step: k(k + 1)/2 + (k + 1) = (k + 1)(k + 2)/2"]),T("3 | n"+cu+" − n",["Step: (k + 1)"+cu+" − (k + 1) = (k"+cu+" − k) + 3(k"+sq+" + k)"])]},
 pce:{grp:"Disprove",c:TEAL,name:"Counterexample",hint:"one case",when:"A false “for all” claim.",rule:"One specific example where the hypothesis holds and the conclusion fails.",
  ex:[T("n"+sq+" + n + 41 is always prime",["n = 40: 41"+sq]),T("All primes are odd",["2"])]},
 pend:{grp:"Last step",c:GRN,name:"Write It Clearly",hint:"∎",when:"Every proof.",rule:"State what you assume, cite each step, end with the claim and ∎.",ex:[T("Template",["Assume… Then… Therefore… ∎"]),T("Induction",["State base, hypothesis, step, conclusion"])]}
};
const U2={id:"u2",num:2,short:"Proofs & Induction",name:"Unit 2: Proof Techniques and Induction",sub:"Direct proof, contrapositive, contradiction, counterexamples, weak and strong induction",c:ORG,
 flow:{M:U2M,label:"Proof methods flowchart",lead:"Which proof technique? Look at the form of the claim.",start:"Prove or disprove",top:["p0"],q:"What form is the claim?",cols:[["If P then Q","",ORG,["pdir","pcon"]],["Impossible / irrational","",RED,["pcd"]],["For all n ≥ n₀","",PURP,["pind"]],["Probably false","",TEAL,["pce"]]],end:"pend"},
 sheet:[[ORG,"Definitions",["Even: n = 2k; odd: n = 2k + 1","a | b ⇔ b = ak","Rational: a/b, b ≠ 0"],""],[PURP,"Induction",["Base case","Hypothesis P(k)","Step P(k) ⇒ P(k + 1)"],""],[BLU,"Classic sums",["Σi = n(n + 1)/2","Σi"+sq+" = n(n + 1)(2n + 1)/6","Σi"+cu+" = (n(n + 1)/2)"+sq,"Σrⁱ = (r<sup>n+1</sup> − 1)/(r − 1)"],""]],
 gen:[
 ()=>{ const S=pick([["The square of an odd integer is odd","Direct proof"],["If n"+sq+" is even then n is even","Contrapositive"],["√3 is irrational","Contradiction"],["Σ<sub>i=1</sub><sup>n</sup> (2i − 1) = n"+sq+" for all n ≥ 1","Induction"],["Every integer greater than 1 can be factored into primes","Induction"],["n"+sq+" − n + 41 is prime for every n","Counterexample"]]); return PS("Choosing a method",`Best method: “${S[0]}”?`,S[1],["Direct proof","Contrapositive","Contradiction","Induction","Counterexample"].filter(x=>x!==S[1]).slice(0,3),[`<b>${S[1]}</b>`]); },
 ()=>{ const n=R(5,40); return P("Classic sums",`Find Σ<sub>i=1</sub><sup>${n}</sup> i.`,n*(n+1)/2,[n*n,n*(n-1)/2,n*(n+1)],[`n(n + 1)/2 = ${n}·${n+1}/2`,`<b>${N(n*(n+1)/2)}</b>`]); },
 ()=>{ const n=R(3,15); return P("Classic sums",`Find Σ<sub>i=1</sub><sup>${n}</sup> i${sq}.`,n*(n+1)*(2*n+1)/6,[(n*(n+1)/2)**2,n**3/3|0,n*(n+1)/2],[`n(n + 1)(2n + 1)/6 = ${n}·${n+1}·${2*n+1}/6`,`<b>${N(n*(n+1)*(2*n+1)/6)}</b>`]); },
 ()=>{ const n=R(3,12); return P("Odd numbers",`Find 1 + 3 + 5 + … + ${2*n-1}.`,n*n,[n*(n+1)/2,2*n*n,(2*n-1)*n/2|0],[`${n} odd numbers; Σ(2i − 1) = n${sq}`,`<b>${n*n}</b>`]); },
 ()=>{ const r=R(2,4),n=R(3,7); return P("Geometric sums",`Find Σ<sub>i=0</sub><sup>${n}</sup> ${r}<sup>i</sup>.`,(r**(n+1)-1)/(r-1),[r**(n+1)-1,r**n,(r**n-1)/(r-1)],[`(r<sup>n+1</sup> − 1)/(r − 1) = (${r}<sup>${n+1}</sup> − 1)/${r-1}`,`<b>${N((r**(n+1)-1)/(r-1))}</b>`]); },
 ()=>{ const S=pick([["n"+cu+" − n","6"],["n"+sq+" + n","2"],["5ⁿ − 1","4"],["7ⁿ − 1","6"],["n"+cu+" + 2n","3"]]); return PS("Divisibility",`Which number always divides ${S[0]} for every positive integer n?`,S[1],["5","7","8","9"].filter(x=>x!==S[1]).slice(0,3),[`Check n = 1, 2, 3 and prove by induction.`,`<b>${S[1]}</b>`]); }],
 chal:[
 ()=>{ const n=R(3,10); return P("Classic sums",`Find Σ<sub>i=1</sub><sup>${n}</sup> i${cu}.`,(n*(n+1)/2)**2,[n*(n+1)*(2*n+1)/6,n**4/4|0,n*(n+1)/2],[`(n(n + 1)/2)${sq}`,`<b>${N((n*(n+1)/2)**2)}</b>`]); },
 ()=>{ const k=R(1,6); return P("Induction step",`In proving Σ<sub>i=1</sub><sup>n</sup> i = n(n + 1)/2, the step adds which term to the sum up to k = ${k}?`,k+1,[k,2*k,k*(k+1)/2],[`P(k) → P(k + 1): add the (k + 1)th term`,`<b>${k+1}</b>`]); },
 ()=>{ const n=R(2,6); return P("Telescoping",`Find Σ<sub>i=1</sub><sup>${n}</sup> ${FR(1,"i(i + 1)")} as a decimal (3 places).`,+(n/(n+1)).toFixed(3),[+(1/(n+1)).toFixed(3),1,+((n-1)/n).toFixed(3)],[`1/(i(i + 1)) = 1/i − 1/(i + 1): telescopes to 1 − 1/${n+1}`,`= ${n}/${n+1} ≈ <b>${(n/(n+1)).toFixed(3)}</b>`],{tol:.002}); }],
 frq:[()=>{ const S=pick([["Σ<sub>i=1</sub><sup>n</sup> (2i − 1) = n"+sq,"1 = 1"+sq,"k"+sq+" + (2(k + 1) − 1) = k"+sq+" + 2k + 1 = (k + 1)"+sq],["Σ<sub>i=1</sub><sup>n</sup> i(i + 1) = n(n + 1)(n + 2)/3","1·2 = 2 = 1·2·3/3","k(k + 1)(k + 2)/3 + (k + 1)(k + 2) = (k + 1)(k + 2)(k + 3)/3"],["Σ<sub>i=0</sub><sup>n</sup> 2ⁱ = 2<sup>n+1</sup> − 1","2⁰ = 1 = 2¹ − 1","2<sup>k+1</sup> − 1 + 2<sup>k+1</sup> = 2<sup>k+2</sup> − 1"]]);
  return {t:"Proof by induction",calc:false,stem:`Prove that ${S[0]} for all integers n ≥ ${S[1].startsWith("2⁰")?0:1}.`,parts:[
   [`Base case.`,[`n = ${S[1].startsWith("2⁰")?0:1}: ${S[1]} ✓`],"",1],
   [`State the inductive hypothesis.`,[`Assume the formula holds for n = k.`],"",1],
   [`Prove the inductive step.`,[`Add the next term to both sides: ${S[2]}.`,`This is the formula for n = k + 1.`],"",3],
   [`State the conclusion.`,[`By the principle of mathematical induction, the formula holds for all n in the range. ∎`],"",1]]}; },
 ()=>({t:"Choosing and writing a proof",calc:false,stem:`Let n be an integer.`,parts:[
   [`Prove directly: if n is odd, then n${sq} is odd.`,[`n = 2k + 1 ⇒ n${sq} = 4k${sq} + 4k + 1 = 2(2k${sq} + 2k) + 1, odd. ∎`],"",2],
   [`Prove by contrapositive: if n${sq} is even, then n is even.`,[`Contrapositive: n odd ⇒ n${sq} odd, proved in (a). ∎`],"",2],
   [`Prove by contradiction that √2 is irrational.`,[`Suppose √2 = a/b in lowest terms. Then a${sq} = 2b${sq}, so a is even (by b), a = 2c.`,`Then 4c${sq} = 2b${sq} ⇒ b${sq} = 2c${sq} ⇒ b even: both even, contradiction. ∎`],"",3],
   [`Disprove: “n${sq} + n + 41 is prime for every n ≥ 0.”`,[`n = 40: 1600 + 40 + 41 = 1681 = 41${sq}, not prime.`],"n = 40",1]]})]
};

/* ============ U3 Sets, functions, relations ============ */
const U3M={
 f0:{grp:"Step 1",c:NAVY,name:"Draw a Venn Diagram / Name the Sets",hint:"universe first",when:"Set questions.",rule:"Identify the universe U and the sets. Shade what you need.",ex:[T("A − B",["In A, not in B"]),T("Aᶜ",["U − A"])]},
 fsz:{grp:"Sizes",c:ORG,name:"Counting Sets",hint:"|A ∪ B| = |A| + |B| − |A ∩ B|",when:"Sizes of unions, products, power sets.",rule:"Inclusion–exclusion. |A × B| = |A||B|. |P(A)| = 2<sup>|A|</sup>.",
  ex:[T("|A| = 10, |B| = 7, |A ∩ B| = 3",["|A ∪ B| = 14"]),T("|A| = 4",["|P(A)| = 16"])]},
 ffn:{grp:"Functions",c:RED,name:"Counting Functions",hint:"mⁿ, injections, bijections",when:"f : A → B with |A| = n, |B| = m.",rule:"All functions: mⁿ. One-to-one: m(m − 1)…(m − n + 1) (needs n ≤ m). Bijections: n! (needs n = m). Onto: inclusion–exclusion.",
  ex:[T("|A| = 3, |B| = 4",["4"+cu+" = 64 functions, 4·3·2 = 24 injective"]),T("|A| = |B| = 5",["120 bijections"])]},
 frel:{grp:"Relations",c:PURP,name:"Relation Properties",hint:"reflexive, symmetric, transitive",when:"Classify a relation.",rule:"Reflexive: aRa. Symmetric: aRb ⇒ bRa. Antisymmetric: aRb ∧ bRa ⇒ a = b. Transitive: aRb ∧ bRc ⇒ aRc. Equivalence: R, S, T. Partial order: R, antisymmetric, T.",
  ex:[T("a ≡ b (mod 3)",["Equivalence relation, 3 classes"]),T("a | b on ℤ⁺",["Partial order"])]},
 fend:{grp:"Last step",c:GRN,name:"Double-Check with a Small Case",hint:"try n = 2",when:"Every count.",rule:"Test your formula on a tiny case you can list.",ex:[T("|A| = 2, |B| = 2",["4 functions: list them"]),T("Power set of {a}",["∅, {a}: 2"])]}
};
const U3={id:"u3",num:3,short:"Sets & Functions",name:"Unit 3: Sets, Functions and Relations",sub:"Set operations, inclusion–exclusion, power sets, counting functions, relations and equivalence classes",c:RED,
 flow:{M:U3M,label:"Sets and functions flowchart",lead:"Sizes, functions or relations?",start:"Set problem",top:["f0"],q:"What is asked?",cols:[["Set sizes","",ORG,["fsz"]],["Functions","",RED,["ffn"]],["Relations","",PURP,["frel"]]],end:"fend"},
 sheet:[[ORG,"Sets",["|A ∪ B| = |A| + |B| − |A ∩ B|","|A × B| = |A||B|","|P(A)| = 2<sup>|A|</sup>","De Morgan: (A ∪ B)ᶜ = Aᶜ ∩ Bᶜ"],""],[RED,"Functions A → B",["All: |B|<sup>|A|</sup>","Injective: P(m, n)","Bijective: n!"],""],[PURP,"Relations on an n-set",["All relations: 2<sup>n"+sq+"</sup>","Reflexive: 2<sup>n"+sq+" − n</sup>","Symmetric: 2<sup>n(n+1)/2</sup>"],""]],
 gen:[
 ()=>{ const a=R(10,40),b=R(10,40),c=R(1,Math.min(a,b)-1); return P("Inclusion–exclusion",`|A| = ${a}, |B| = ${b}, |A ∩ B| = ${c}. Find |A ∪ B|.`,a+b-c,[a+b,a+b-2*c,a+b+c],[`${a} + ${b} − ${c}`,`<b>${a+b-c}</b>`]); },
 ()=>{ const n=R(2,8); return P("Power sets",`A has ${n} elements. How many subsets does A have?`,2**n,[n*n,2*n,2**n-1],[`2<sup>${n}</sup>`,`<b>${2**n}</b>`]); },
 ()=>{ const n=R(2,4),m=R(2,5); return P("Counting functions",`How many functions are there from a ${n}-element set to a ${m}-element set?`,m**n,[n**m,m*n,C(m,n)||m+n],[`Each of the ${n} inputs has ${m} choices: ${m}<sup>${n}</sup>`,`<b>${m**n}</b>`]); },
 ()=>{ const n=R(2,4),m=n+R(0,3); const v=fact(m)/fact(m-n); return P("Injective functions",`How many one-to-one functions from a ${n}-set to a ${m}-set?`,v,[m**n,C(m,n),fact(n)].filter(x=>x!==v),[Array.from({length:n},(_,i)=>m-i).join("·"),`<b>${v}</b>`]); },
 ()=>{ const S=pick([["a ≡ b (mod 5) on ℤ","Equivalence relation"],["a ≤ b on ℝ","Partial order"],["a | b on ℤ⁺","Partial order"],["a ≠ b on ℤ","Neither"],["“same birthday” on people","Equivalence relation"]]); return PS("Relations",`Classify the relation ${S[0]}.`,S[1],["Equivalence relation","Partial order","Neither","Both"].filter(x=>x!==S[1]),[`<b>${S[1]}</b>`]); },
 ()=>{ const a=R(20,50),b=R(10,30),c=R(10,30),ab=R(2,8),ac=R(2,8),bc=R(2,8),abc=R(1,2); return P("Three sets",`|A| = ${a}, |B| = ${b}, |C| = ${c}, |A∩B| = ${ab}, |A∩C| = ${ac}, |B∩C| = ${bc}, |A∩B∩C| = ${abc}. Find |A ∪ B ∪ C|.`,a+b+c-ab-ac-bc+abc,[a+b+c,a+b+c-ab-ac-bc,a+b+c-ab-ac-bc-abc],[`Add singles, subtract pairs, add the triple`,`<b>${a+b+c-ab-ac-bc+abc}</b>`]); }],
 chal:[
 ()=>{ const n=R(3,5); return P("Onto functions",`How many onto functions from a ${n}-set to a 2-set?`,2**n-2,[2**n,2*n,n*n],[`All 2<sup>${n}</sup> minus the 2 constant functions`,`<b>${2**n-2}</b>`]); },
 ()=>{ const n=R(2,4); return P("Relations",`How many symmetric relations are there on a ${n}-element set?`,2**(n*(n+1)/2),[2**(n*n),2**n,2**(n*(n-1)/2)],[`Choose freely the ${n} diagonal pairs and the ${n*(n-1)/2} unordered off-diagonal pairs`,`2<sup>${n*(n+1)/2}</sup> = <b>${2**(n*(n+1)/2)}</b>`]); }],
 frq:[()=>{ const a=R(30,60),b=R(20,40),c=R(15,30),ab=R(5,10),ac=R(4,9),bc=R(3,8),abc=R(1,3),U=a+b+c+R(10,30); const un=a+b+c-ab-ac-bc+abc;
  return {t:"Survey with three sets",calc:false,stem:`${U} students were asked about three clubs: ${a} in Art, ${b} in Band, ${c} in Chess; ${ab} in Art and Band, ${ac} in Art and Chess, ${bc} in Band and Chess, and ${abc} in all three.`,parts:[
   [`How many are in at least one club?`,[`Inclusion–exclusion: ${a} + ${b} + ${c} − ${ab} − ${ac} − ${bc} + ${abc}`],N(un),2],
   [`How many are in none?`,[`${U} − ${un}`],N(U-un),1],
   [`How many are in exactly one club?`,[`Only A = ${a-ab-ac+abc}, only B = ${b-ab-bc+abc}, only C = ${c-ac-bc+abc}`],N(a+b+c-2*(ab+ac+bc)+3*abc),2],
   [`How many are in Art and Band but not Chess?`,[`${ab} − ${abc}`],N(ab-abc),1]]}; }]
};

/* ============ U4 Counting ============ */
const U4M={
 k0:{grp:"Step 1",c:NAVY,name:"Order? Repetition?",hint:"two questions",when:"Every counting problem.",rule:"Does order matter? Is repetition allowed? These two answers pick the formula.",
  ex:[T("Passwords",["Order yes, repetition yes: nᵏ"]),T("Committees",["Order no, repetition no: C(n, k)"])]},
 kp:{grp:"Order matters",c:ORG,name:"Permutations",hint:"P(n, k) = n!/(n − k)!",when:"Arrangements, rankings, officers.",rule:"No repetition: P(n, k) = n!/(n − k)!. With repetition: nᵏ. Arranging letters with repeats: n!/(n₁!n₂!…).",
  ex:[T("President, VP from 10",["10·9 = 90"]),T("Arrangements of BANANA",["6!/(3!2!) = 60"])]},
 kc:{grp:"Order doesn't matter",c:RED,name:"Combinations",hint:"C(n, k)",when:"Committees, subsets, hands.",rule:"No repetition: C(n, k) = n!/(k!(n − k)!). With repetition (stars and bars): C(n + k − 1, k).",
  ex:[T("3-person committee from 8",["C(8, 3) = 56"]),T("6 donuts, 4 kinds",["C(9, 6) = 84"])]},
 kpie:{grp:"Overlaps / “at least”",c:PURP,name:"Complement & Inclusion–Exclusion",hint:"total − bad",when:"“At least one”, “none of”, overlapping conditions.",rule:"Count the complement and subtract. For overlapping sets, add singles, subtract pairs, add triples…",
  ex:[T("Bit strings of length 8 with at least one 1",["2⁸ − 1 = 255"]),T("1–100 divisible by 2 or 3",["50 + 33 − 16 = 67"])]},
 kph:{grp:"Guarantees",c:TEAL,name:"Pigeonhole Principle",hint:"⌈n/k⌉",when:"“Must there be…”, “at least how many…”.",rule:"n objects in k boxes ⇒ some box has ≥ ⌈n/k⌉. To guarantee r in one box: k(r − 1) + 1 objects.",
  ex:[T("13 people",["Two share a birth month"]),T("Socks of 3 colors, want a pair",["4 socks"])]},
 kend:{grp:"Last step",c:GRN,name:"Sanity Check",hint:"small case",when:"Every count.",rule:"Check with a tiny version you can list, and make sure you didn't double count.",ex:[T("C(4, 2)",["List: 6 pairs"]),T("Double counting",["Divide by the symmetry"])]}
};
const U4={id:"u4",num:4,short:"Counting",name:"Unit 4: Counting and Combinatorics",sub:"Product and sum rules, permutations, combinations, repetition, binomial theorem, inclusion–exclusion, pigeonhole",c:PURP,
 flow:{M:U4M,label:"Counting flowchart",lead:"Order and repetition decide the formula.",start:"How many ways?",top:["k0"],q:"Which situation?",cols:[["Order matters","",ORG,["kp"]],["Order doesn't","",RED,["kc"]],["“At least”, overlaps","",PURP,["kpie"]],["Guarantee","",TEAL,["kph"]]],end:"kend"},
 sheet:[[ORG,"Order matters",["P(n, k) = n!/(n − k)!","With repetition: nᵏ","Letters with repeats: n!/(n₁!n₂!…)"],""],[RED,"Order doesn't matter",["C(n, k) = n!/(k!(n − k)!)","With repetition: C(n + k − 1, k)"],""],[PURP,"Binomial theorem",["(x + y)ⁿ = Σ C(n, k)x<sup>n−k</sup>yᵏ","ΣC(n, k) = 2ⁿ"],""],[TEAL,"Pigeonhole",["n objects, k boxes ⇒ ⌈n/k⌉","Guarantee r: k(r − 1) + 1"],""]],
 gen:[
 ()=>{ const n=R(6,12),k=R(2,4); return P("Permutations",`In how many ways can ${k} officers (distinct roles) be chosen from ${n} people?`,fact(n)/fact(n-k),[C(n,k),n**k,fact(k)],[`P(${n}, ${k}) = ${Array.from({length:k},(_,i)=>n-i).join("·")}`,`<b>${N(fact(n)/fact(n-k))}</b>`]); },
 ()=>{ const n=R(6,15),k=R(2,5); return P("Combinations",`How many ${k}-person committees can be formed from ${n} people?`,C(n,k),[fact(n)/fact(n-k),C(n,k-1),n*k],[`C(${n}, ${k})`,`<b>${N(C(n,k))}</b>`]); },
 ()=>{ const W=pick(["BANANA","LETTER","STATISTICS","MISSISSIPPI","COOKIE","BOOKKEEPER","PEPPER"]); const cnt={}; [...W].forEach(c=>cnt[c]=(cnt[c]||0)+1); const v=Object.values(cnt).reduce((s,c)=>s/fact(c),fact(W.length)); return P("Arrangements with repeats",`How many distinct arrangements of the letters of ${W}?`,v,[fact(W.length),v*2,v/2|0].filter(x=>x!==v),[`${W.length}!/(${Object.values(cnt).filter(c=>c>1).map(c=>c+"!").join("·")})`,`<b>${N(v)}</b>`]); },
 ()=>{ const n=R(3,6),k=R(4,10); return P("Stars and bars",`In how many ways can ${k} identical donuts be chosen from ${n} kinds?`,C(n+k-1,k),[C(n+k,k),n**k,C(n,k)||n*k],[`C(n + k − 1, k) = C(${n+k-1}, ${k})`,`<b>${N(C(n+k-1,k))}</b>`]); },
 ()=>{ const n=R(4,10); return P("Complements",`How many bit strings of length ${n} contain at least one 1?`,2**n-1,[2**n,n,2**(n-1)],[`All 2<sup>${n}</sup> minus the all-zero string`,`<b>${2**n-1}</b>`]); },
 ()=>{ const k=R(3,6),r=R(2,4); return P("Pigeonhole",`Socks come in ${k} colors. How many must you draw to guarantee ${r} of the same color?`,k*(r-1)+1,[k*r,k+r,k*(r-1)],[`k(r − 1) + 1 = ${k}(${r-1}) + 1`,`<b>${k*(r-1)+1}</b>`]); },
 ()=>{ const n=R(4,8),k=R(1,n-1),a=R(1,3),b=R(1,3); return P("Binomial theorem",`Find the coefficient of x<sup>${k}</sup> in (${a===1?"":a}x + ${b})<sup>${n}</sup>.`,C(n,k)*a**k*b**(n-k),[C(n,k),C(n,k)*a**k,C(n,k)*b**k*a**(n-k)].filter(x=>x!==C(n,k)*a**k*b**(n-k)),[`C(${n}, ${k})(${a})<sup>${k}</sup>(${b})<sup>${n-k}</sup>`,`<b>${N(C(n,k)*a**k*b**(n-k))}</b>`]); }],
 chal:[
 ()=>{ const N1=pick([60,100,120,150,200]),a=pick([2,3]),b=pick([5,7]); const v=Math.floor(N1/a)+Math.floor(N1/b)-Math.floor(N1/(a*b)); return P("Inclusion–exclusion",`How many integers from 1 to ${N1} are divisible by ${a} or ${b}?`,v,[Math.floor(N1/a)+Math.floor(N1/b),N1-v,v+1],[`⌊${N1}/${a}⌋ + ⌊${N1}/${b}⌋ − ⌊${N1}/${a*b}⌋ = ${Math.floor(N1/a)} + ${Math.floor(N1/b)} − ${Math.floor(N1/(a*b))}`,`<b>${v}</b>`]); },
 ()=>{ const n=R(4,7); const d=[1,0,1,2,9,44,265,1854][n]; return P("Derangements",`In how many ways can ${n} letters go into their ${n} envelopes so that none is correct?`,d,[fact(n)-1,fact(n-1),d+1],[`D<sub>n</sub> = n!Σ(−1)ᵏ/k!`,`D<sub>${n}</sub> = <b>${d}</b>`]); },
 ()=>{ const n=R(5,10),k=R(2,4); return P("Lattice paths",`How many shortest grid paths go from (0, 0) to (${n}, ${k})?`,C(n+k,k),[n*k,2**(n+k),C(n+k,k)*2],[`Choose which ${k} of the ${n+k} steps go up: C(${n+k}, ${k})`,`<b>${N(C(n+k,k))}</b>`]); }],
 frq:[()=>{ const m=R(5,8),w=R(4,7),k=R(3,5);
  return {t:"Committees",calc:false,stem:`A club has ${m} men and ${w} women. A committee of ${k} is chosen.`,parts:[
   [`How many committees are possible?`,[`C(${m+w}, ${k})`],N(C(m+w,k)),1],
   [`How many have exactly 2 women?`,[`C(${w}, 2)·C(${m}, ${k-2})`],N(C(w,2)*C(m,k-2)),2],
   [`How many have at least one woman?`,[`Total − all-men: C(${m+w}, ${k}) − C(${m}, ${k})`],N(C(m+w,k)-C(m,k)),2],
   [`If the committee also needs a chair and a secretary (different members of the committee), how many ways?`,[`Choose the committee, then P(${k}, 2) = ${k*(k-1)} role assignments.`],N(C(m+w,k)*k*(k-1)),2]]}; }]
};

/* ============ U5 Number theory ============ */
const U5M={
 n0:{grp:"Step 1",c:NAVY,name:"Reduce Modulo m",hint:"replace by remainders",when:"Any modular expression.",rule:"Replace numbers by their remainders early; (a ± b) mod m and (ab) mod m only depend on remainders.",
  ex:[T("(47·53) mod 5",["2·3 = 6 ≡ 1"]),T("−3 mod 7",["4"])]},
 ngcd:{grp:"gcd / lcm",c:ORG,name:"Euclidean Algorithm",hint:"divide, keep the remainder",when:"gcd, lcm, Bézout.",rule:"gcd(a, b) = gcd(b, a mod b). Last nonzero remainder is the gcd. lcm = ab/gcd. Back-substitute to get ax + by = gcd.",
  ex:[T("gcd(252, 105)",["252 = 2·105 + 42, 105 = 2·42 + 21, 42 = 2·21","<b>21</b>"]),T("lcm(12, 18)",["216/6 = 36"])]},
 npow:{grp:"Big powers",c:RED,name:"Modular Exponentiation & Fermat",hint:"a<sup>p−1</sup> ≡ 1",when:"aᵏ mod m with large k.",rule:"Repeated squaring, or find the cycle of powers. Fermat: p prime, p ∤ a ⇒ a<sup>p−1</sup> ≡ 1 (mod p).",
  ex:[T("3<sup>100</sup> mod 7",["3⁶ ≡ 1, 100 = 6·16 + 4: 3⁴ = 81 ≡ 4"]),T("2<sup>10</sup> mod 11",["1 (Fermat)"])]},
 ninv:{grp:"Solve ax ≡ b",c:PURP,name:"Inverses & Linear Congruences",hint:"multiply by a<sup>−1</sup>",when:"Solve ax ≡ b (mod m).",rule:"a has an inverse mod m ⇔ gcd(a, m) = 1 (use Euclid). Then x ≡ a<sup>−1</sup>b. Systems with coprime moduli: Chinese Remainder Theorem.",
  ex:[T("3x ≡ 4 (mod 7)",["3<sup>−1</sup> = 5: x ≡ 20 ≡ 6"]),T("x ≡ 2 (mod 3), x ≡ 3 (mod 5)",["x ≡ 8 (mod 15)"])]},
 nend:{grp:"Last step",c:GRN,name:"Check by Substitution",hint:"plug back in",when:"Every answer.",rule:"Substitute and reduce mod m.",ex:[T("3·6 = 18 ≡ 4 (mod 7) ✓",["Correct"]),T("gcd check",["It divides both numbers"])]}
};
const U5={id:"u5",num:5,short:"Number Theory",name:"Unit 5: Number Theory and Modular Arithmetic",sub:"Divisibility, primes, Euclidean algorithm, modular arithmetic, inverses, Fermat, Chinese Remainder Theorem",c:TEAL,
 flow:{M:U5M,label:"Number theory flowchart",lead:"Reduce first, then choose the tool.",start:"Number theory problem",top:["n0"],q:"What is asked?",cols:[["gcd / lcm","",ORG,["ngcd"]],["Big power","",RED,["npow"]],["Solve a congruence","",PURP,["ninv"]]],end:"nend"},
 sheet:[[ORG,"Euclid",["gcd(a, b) = gcd(b, a mod b)","lcm·gcd = ab","Bézout: ax + by = gcd"],""],[RED,"Powers",["Fermat: a<sup>p−1</sup> ≡ 1 (mod p)","Euler: a<sup>φ(m)</sup> ≡ 1 if gcd = 1"],""],[PURP,"Congruences",["Inverse exists ⇔ gcd(a, m) = 1","CRT: coprime moduli ⇒ unique mod product"],""]],
 gen:[
 ()=>{ const g=R(2,15),a=g*R(5,25),b=g*R(5,25); const [G,st]=euclid(Math.max(a,b),Math.min(a,b)); return P("gcd",`Find gcd(${a}, ${b}).`,G,[g,a*b/G,Math.min(a,b)].filter(x=>x!==G),[...st,`<b>${G}</b>`]); },
 ()=>{ const a=R(4,30),b=R(4,30); const l=a*b/gcd(a,b); return P("lcm",`Find lcm(${a}, ${b}).`,l,[a*b,gcd(a,b),l*2].filter(x=>x!==l),[`ab/gcd = ${a*b}/${gcd(a,b)}`,`<b>${l}</b>`]); },
 ()=>{ const m=pick([5,7,11,13]),a=R(2,m-1),k=R(20,200); return P("Modular powers",`Find ${a}<sup>${k}</sup> mod ${m}.`,powmod(a,k,m),[powmod(a,k-1,m),a,1].filter(x=>x!==powmod(a,k,m)),[`Fermat: ${a}<sup>${m-1}</sup> ≡ 1 (mod ${m}); ${k} = ${m-1}·${Math.floor(k/(m-1))} + ${k%(m-1)}`,`${a}<sup>${k%(m-1)}</sup> mod ${m} = <b>${powmod(a,k,m)}</b>`]); },
 ()=>{ const m=pick([7,9,11,13,17,26]); let a; do{ a=R(2,m-1); }while(gcd(a,m)!==1); const i=inv(a,m); return P("Inverses",`Find the inverse of ${a} modulo ${m}.`,i,[m-i,a,i+1].filter(x=>x!==i&&x<m),[`Find x with ${a}x ≡ 1 (mod ${m})`,`${a}·${i} = ${a*i} ≡ 1: <b>${i}</b>`]); },
 ()=>{ const m=pick([7,11,13]),a=R(2,m-1),b=R(1,m-1); const x=md(inv(a,m)*b,m); return P("Linear congruences",`Solve ${a}x ≡ ${b} (mod ${m}) for 0 ≤ x &lt; ${m}.`,x,[md(b*a,m),inv(a,m),md(x+1,m)].filter(v=>v!==x),[`${a}<sup>−1</sup> ≡ ${inv(a,m)} (mod ${m})`,`x ≡ ${inv(a,m)}·${b} ≡ <b>${x}</b>`]); },
 ()=>{ const a=R(100,999),m=pick([3,4,7,9,11]); return P("Remainders",`What is ${a} mod ${m}?`,a%m,[m-a%m,(a+1)%m,Math.floor(a/m)%m].filter(x=>x!==a%m),[`${a} = ${m}·${Math.floor(a/m)} + ${a%m}`,`<b>${a%m}</b>`]); }],
 chal:[
 ()=>{ const [p,q]=pick([[3,7],[3,11],[4,7],[4,9],[5,7],[5,9],[4,11],[5,11]]),a=R(0,p-1),b=R(0,q-1); let x=0; while(x%p!==a||x%q!==b) x++; return P("Chinese Remainder Theorem",`Find the smallest x ≥ 0 with x ≡ ${a} (mod ${p}) and x ≡ ${b} (mod ${q}).`,x,[x+p*q,a+b,(x+p)%(p*q)].filter(v=>v!==x),[`Moduli coprime: a unique x mod ${p*q}`,`Check ${b}, ${b+q}, ${b+2*q}, … for remainder ${a} mod ${p}`,`<b>${x}</b>`]); },
 ()=>{ const n=pick([12,15,20,21,30,36,45]); let ph=0; for(let i=1;i<=n;i++) if(gcd(i,n)===1) ph++; return P("Euler's φ",`Find φ(${n}).`,ph,[n-1,n/2,ph+2].filter(x=>x!==ph),[`Count 1 ≤ k ≤ ${n} with gcd(k, ${n}) = 1, or use φ = n∏(1 − 1/p)`,`<b>${ph}</b>`]); },
 ()=>{ const k=R(2,9); return P("Last digits",`What is the last digit of 7<sup>${100+k}</sup>?`,powmod(7,100+k,10),[7,1,9].filter(x=>x!==powmod(7,100+k,10)),[`Powers of 7 mod 10 cycle 7, 9, 3, 1 (length 4)`,`${100+k} mod 4 = ${(100+k)%4}: <b>${powmod(7,100+k,10)}</b>`]); }],
 frq:[()=>{ const g=R(3,12),a=g*R(7,19),b=g*R(3,6); if(gcd(a/g,b/g)!==1) return null; const [G,st]=euclid(a,b); const [,x,y]=egcd(a,b);
  return {t:"Euclid and Bézout",calc:false,stem:`Let a = ${a} and b = ${b}.`,parts:[
   [`Use the Euclidean algorithm to find gcd(a, b).`,st,N(G),2],
   [`Find integers x, y with ax + by = gcd(a, b).`,[`Back-substitute through the steps.`,`${a}(${N(x)}) + ${b}(${N(y)}) = ${G}`],`x = ${N(x)}, y = ${N(y)}`,3],
   [`Find lcm(a, b).`,[`ab/gcd = ${a*b}/${G}`],N(a*b/G),1],
   [`Does ${a/G}x ≡ 1 (mod ${b/G}) have a solution? If yes, find it.`,[`gcd = 1, so yes: the inverse is ${inv(a/G,b/G)} (mod ${b/G}).`],N(inv(a/G,b/G)),1]]}; }]
};

/* ============ U6 Recurrences ============ */
const U6M={
 r0:{grp:"Step 1",c:NAVY,name:"Identify the Type",hint:"linear? homogeneous? order?",when:"Any recurrence.",rule:"a<sub>n</sub> = c₁a<sub>n−1</sub> + c₂a<sub>n−2</sub>: linear homogeneous, order 2. Extra f(n): nonhomogeneous. Or just iterate to compute terms.",
  ex:[T("a<sub>n</sub> = 3a<sub>n−1</sub>",["Order 1: a<sub>n</sub> = a₀3ⁿ"]),T("Fibonacci",["Order 2, homogeneous"])]},
 rit:{grp:"Few terms",c:ORG,name:"Iterate",hint:"just compute",when:"A specific term, small n.",rule:"Start from the initial conditions and apply the rule step by step.",
  ex:[T("a<sub>n</sub> = 2a<sub>n−1</sub> + 1, a₀ = 0",["0, 1, 3, 7, 15 → a<sub>n</sub> = 2ⁿ − 1"]),T("Check a pattern",["Guess, then prove by induction"])]},
 rch:{grp:"Closed form",c:RED,name:"Characteristic Equation",hint:"r"+sq+" = c₁r + c₂",when:"Linear homogeneous with constant coefficients.",rule:"Roots r₁ ≠ r₂: a<sub>n</sub> = Ar₁ⁿ + Br₂ⁿ. Repeated root r: (A + Bn)rⁿ. Solve for A, B from the initial terms.",
  ex:[T("a<sub>n</sub> = 5a<sub>n−1</sub> − 6a<sub>n−2</sub>",["r"+sq+" − 5r + 6 = 0 ⇒ r = 2, 3"]),T("a<sub>n</sub> = 4a<sub>n−1</sub> − 4a<sub>n−2</sub>",["r = 2 twice: (A + Bn)2ⁿ"])]},
 rset:{grp:"Model",c:PURP,name:"Setting Up a Recurrence",hint:"look at the last step",when:"Counting strings, tilings, moves.",rule:"Split by what happens at the last (or first) position. Example: bit strings with no two consecutive 0s: a<sub>n</sub> = a<sub>n−1</sub> + a<sub>n−2</sub>.",
  ex:[T("Tower of Hanoi",["H<sub>n</sub> = 2H<sub>n−1</sub> + 1"]),T("Tiling a 2 × n board with dominoes",["T<sub>n</sub> = T<sub>n−1</sub> + T<sub>n−2</sub>"])]},
 rend:{grp:"Last step",c:GRN,name:"Check Initial Terms",hint:"n = 0, 1",when:"Every closed form.",rule:"Your formula must reproduce the initial conditions and the next term.",ex:[T("a<sub>n</sub> = 2ⁿ − 1",["a₀ = 0 ✓, a₁ = 1 ✓"]),T("Mismatch",["Recheck A and B"])]}
};
const U6={id:"u6",num:6,short:"Recurrences",name:"Unit 6: Recurrence Relations",sub:"Iteration, modeling with recurrences, characteristic equations, closed forms",c:BLU,
 flow:{M:U6M,label:"Recurrences flowchart",lead:"Compute, solve, or set up a recurrence.",start:"Recurrence problem",top:["r0"],q:"What is asked?",cols:[["A few terms","",ORG,["rit"]],["Closed form","",RED,["rch"]],["Build one","",PURP,["rset"]]],end:"rend"},
 sheet:[[ORG,"First order",["a<sub>n</sub> = ra<sub>n−1</sub> ⇒ a₀rⁿ","a<sub>n</sub> = a<sub>n−1</sub> + d ⇒ a₀ + nd"],""],[RED,"Second order",["r"+sq+" − c₁r − c₂ = 0","Distinct: Ar₁ⁿ + Br₂ⁿ","Repeated: (A + Bn)rⁿ"],""],[PURP,"Classic models",["Hanoi: 2ⁿ − 1","Fibonacci / tilings","No “00”: a<sub>n</sub> = a<sub>n−1</sub> + a<sub>n−2</sub>"],""]],
 gen:[
 ()=>{ const c=R(2,3),d=nz(-3,4),a0=R(1,4),n=R(3,6); let a=a0; const st=[`a₀ = ${a0}`]; for(let i=1;i<=n;i++){ a=c*a+d; st.push(`a<sub>${i}</sub> = ${c}(${N((a-d)/c)})${sg(d)} = ${N(a)}`); } return P("Iterating",`a<sub>n</sub> = ${c}a<sub>n−1</sub>${sg(d)}, a₀ = ${a0}. Find a<sub>${n}</sub>.`,a,[c*a+d,(a-d)/c,a+1],st.concat([`<b>${N(a)}</b>`])); },
 ()=>{ let r1=R(-3,4),r2=R(-3,4); if(r1===r2||!r1||!r2) return null; const A=R(-3,3),B=nz(-3,3),n=R(3,5); const t=k=>A*r1**k+B*r2**k; return P("Closed forms",`a<sub>n</sub> = ${N(r1+r2)}a<sub>n−1</sub>${sg(-r1*r2)}a<sub>n−2</sub>, a₀ = ${N(t(0))}, a₁ = ${N(t(1))}. Find a<sub>${n}</sub>.`.replace("1a<sub>","a<sub>"),t(n),[t(n-1),t(n)+1,A*r1**n],[`r${sq}${sg(-(r1+r2))}r${sg(r1*r2)} = 0 ⇒ r = ${N(r1)}, ${N(r2)}`,`a<sub>n</sub> = ${N(A)}(${N(r1)})ⁿ ${B<0?"−":"+"} ${Math.abs(B)}(${N(r2)})ⁿ`,`a<sub>${n}</sub> = <b>${N(t(n))}</b>`]); },
 ()=>{ const n=R(3,10); return P("Tower of Hanoi",`What is the minimum number of moves for the Tower of Hanoi with ${n} disks?`,2**n-1,[2**n,2*n-1,n*n],[`H<sub>n</sub> = 2H<sub>n−1</sub> + 1 ⇒ H<sub>n</sub> = 2ⁿ − 1`,`<b>${2**n-1}</b>`]); },
 ()=>{ const n=R(3,10); const f=[0,1]; for(let i=2;i<=n+2;i++) f.push(f[i-1]+f[i-2]); return P("Strings",`How many bit strings of length ${n} have no two consecutive 0s?`,f[n+2],[f[n+1],2**n-f[n+2],f[n+2]+1],[`a<sub>n</sub> = a<sub>n−1</sub> + a<sub>n−2</sub>, a₁ = 2, a₂ = 3`,`a<sub>${n}</sub> = <b>${f[n+2]}</b>`]); },
 ()=>{ const r1=R(2,4),r2=r1+R(1,2); return PS("Characteristic roots",`What are the characteristic roots of a<sub>n</sub> = ${r1+r2}a<sub>n−1</sub> − ${r1*r2}a<sub>n−2</sub>?`,`${r1} and ${r2}`,[`−${r1} and −${r2}`,`${r1+r2} and ${r1*r2}`,`${r1} (repeated)`],[`r${sq} − ${r1+r2}r + ${r1*r2} = (r − ${r1})(r − ${r2})`,`<b>${r1}, ${r2}</b>`]); }],
 chal:[
 ()=>{ const r=R(2,3),A=R(1,3),B=nz(-2,2),n=R(3,5); const t=k=>(A+B*k)*r**k; return P("Repeated roots",`a<sub>n</sub> = ${2*r}a<sub>n−1</sub> − ${r*r}a<sub>n−2</sub>, a₀ = ${N(t(0))}, a₁ = ${N(t(1))}. Find a<sub>${n}</sub>.`,t(n),[A*r**n,t(n-1),(A+B)*r**n].filter(x=>x!==t(n)),[`r = ${r} (repeated): a<sub>n</sub> = (A + Bn)${r}ⁿ`,`A = ${A}, B = ${N(B)}`,`<b>${N(t(n))}</b>`]); },
 ()=>{ const n=R(3,9); const f=[1,1]; for(let i=2;i<=n;i++) f.push(f[i-1]+f[i-2]); return P("Tilings",`How many ways can a 2 × ${n} board be tiled with 1 × 2 dominoes?`,f[n],[f[n-1],2**(n-1),n],[`T<sub>n</sub> = T<sub>n−1</sub> + T<sub>n−2</sub>, T₁ = 1, T₂ = 2`,`T<sub>${n}</sub> = <b>${f[n]}</b>`]); }],
 frq:[()=>{ const r1=pick([2,3]),r2=r1===2?pick([3,-1]):pick([-1,2]); const A=R(1,3),B=nz(-2,2); const t=k=>A*r1**k+B*r2**k;
  return {t:"Solving a recurrence",calc:false,stem:`a<sub>n</sub> = ${N(r1+r2)}a<sub>n−1</sub>${sg(-r1*r2)}a<sub>n−2</sub> for n ≥ 2, with a₀ = ${N(t(0))}, a₁ = ${N(t(1))}.`.replace(" 1a<sub>"," a<sub>"),parts:[
   [`Compute a₂, a₃, a₄.`,[`Iterate the recurrence.`],`${N(t(2))}, ${N(t(3))}, ${N(t(4))}`,1],
   [`Find the characteristic roots.`,[`r${sq}${sg(-(r1+r2))}r${sg(r1*r2)} = 0`],`${N(r1)}, ${N(r2)}`,1],
   [`Find a closed form for a<sub>n</sub>.`,[`a<sub>n</sub> = A(${N(r1)})ⁿ + B(${N(r2)})ⁿ; A + B = ${N(t(0))}, ${N(r1)}A + ${N(r2)}B = ${N(t(1))}`,`A = ${N(A)}, B = ${N(B)}`],`${N(A)}·${N(r1)}ⁿ ${B<0?"−":"+"} ${Math.abs(B)}·(${N(r2)})ⁿ`,3],
   [`Check your formula against a₄.`,[`${N(A)}·${N(r1**4)} + (${N(B)})·${N(r2**4)} = ${N(t(4))} ✓`],"",1]]}; }]
};

/* ============ U7 Graphs and trees ============ */
const U7M={
 h0:{grp:"Step 1",c:NAVY,name:"Draw and Count Degrees",hint:"Σdeg = 2|E|",when:"Every graph problem.",rule:"List vertices, edges and degrees. Handshake lemma: the degrees add to twice the number of edges; the number of odd-degree vertices is even.",
  ex:[T("Degrees 3, 3, 2, 2",["|E| = 10/2 = 5"]),T("Degrees 3, 3, 3",["Impossible: odd sum"])]},
 heu:{grp:"Traverse every edge",c:ORG,name:"Euler Paths & Circuits",hint:"count odd degrees",when:"“Use every edge exactly once.”",rule:"Connected graph: Euler circuit ⇔ all degrees even. Euler path (not circuit) ⇔ exactly 2 odd vertices (start and end there).",
  ex:[T("Degrees 2, 4, 2, 4",["Euler circuit"]),T("Two odd vertices",["Euler path between them"])]},
 hham:{grp:"Visit every vertex",c:RED,name:"Hamilton Cycles",hint:"no easy test",when:"“Visit every vertex exactly once.”",rule:"No simple criterion. Sufficient: Dirac (every degree ≥ n/2). Kₙ has (n − 1)!/2 Hamilton cycles.",
  ex:[T("K₅",["4!/2 = 12 Hamilton cycles"]),T("Bipartite with unequal sides",["No Hamilton cycle"])]},
 htree:{grp:"Trees",c:PURP,name:"Trees",hint:"|E| = n − 1",when:"Connected and acyclic.",rule:"A tree on n vertices has n − 1 edges; any two vertices are joined by a unique path. Cayley: nⁿ⁻² labeled trees.",
  ex:[T("Tree with 10 vertices",["9 edges"]),T("Labeled trees on 4 vertices",["4"+sq+" = 16"])]},
 hcol:{grp:"Coloring / planar",c:TEAL,name:"Coloring & Planarity",hint:"χ, V − E + F = 2",when:"Scheduling, maps, drawing without crossings.",rule:"χ(Kₙ) = n; bipartite ⇔ χ ≤ 2 ⇔ no odd cycle; odd cycle: 3. Planar connected: V − E + F = 2, and E ≤ 3V − 6.",
  ex:[T("C₅",["χ = 3"]),T("V = 6, E = 9 planar",["F = 5"])]},
 hend:{grp:"Last step",c:GRN,name:"Justify with a Theorem",hint:"name it",when:"Every answer.",rule:"Cite the theorem (handshake, Euler, Euler's formula) and check its conditions (connected? simple?).",ex:[T("Euler circuit",["“Connected and all degrees even”"]),T("Not planar",["E &gt; 3V − 6"])]}
};
const U7={id:"u7",num:7,short:"Graphs & Trees",name:"Unit 7: Graph Theory and Trees",sub:"Degrees and the handshake lemma, Euler and Hamilton paths, trees, coloring, planar graphs",c:GRN,
 flow:{M:U7M,label:"Graph theory flowchart",lead:"Count degrees first, then pick the question type.",start:"Graph problem",top:["h0"],q:"What is asked?",cols:[["Every edge once","",ORG,["heu"]],["Every vertex once","",RED,["hham"]],["Tree?","",PURP,["htree"]],["Colors / planar","",TEAL,["hcol"]]],end:"hend"},
 sheet:[[NAVY,"Basics",["Σdeg(v) = 2|E|","Kₙ has n(n − 1)/2 edges","K<sub>m,n</sub> has mn edges"],""],[ORG,"Euler",["Circuit: connected, all degrees even","Path: exactly 2 odd vertices"],""],[PURP,"Trees",["n vertices, n − 1 edges","Cayley: nⁿ⁻² labeled trees"],""],[TEAL,"Planar & coloring",["V − E + F = 2","E ≤ 3V − 6","Four color theorem"],""]],
 gen:[
 ()=>{ const n=R(3,12); return P("Complete graphs",`How many edges does K<sub>${n}</sub> have?`,n*(n-1)/2,[n*(n-1),n*n,n-1],[`C(${n}, 2)`,`<b>${n*(n-1)/2}</b>`]); },
 ()=>{ let d; do{ d=Array.from({length:R(4,7)},()=>R(1,5)); }while(d.reduce((a,b)=>a+b,0)%2); const s=d.reduce((a,b)=>a+b,0); return P("Handshake lemma",`A graph (multiple edges allowed) has degrees ${d.join(", ")}. How many edges?`,s/2,[s,d.length,s/2+1],[`Σdeg = ${s} = 2|E|`,`<b>${s/2}</b>`]); },
 ()=>{ const n=R(5,30); return P("Trees",`A tree has ${n} vertices. How many edges?`,n-1,[n,n+1,n*(n-1)/2],[`Trees have n − 1 edges`,`<b>${n-1}</b>`]); },
 ()=>{ const d=Array.from({length:R(4,7)},()=>R(1,4)*2); const odd=pick([0,2,4]); for(let i=0;i<odd;i++) d[i]-=1; const ans=odd===0?"Euler circuit":odd===2?"Euler path, not a circuit":"Neither"; return PS("Euler",`A connected multigraph has degrees ${shuffle(d).join(", ")}. Does it have an Euler circuit or path?`,ans,["Euler circuit","Euler path, not a circuit","Neither"].filter(x=>x!==ans).concat(["Both a circuit and a Hamilton cycle"]),[`${odd} vertices of odd degree`,`<b>${ans}</b>`]); },
 ()=>{ const V=R(5,12),E=R(V,Math.min(2*V,3*V-6)); return P("Euler's formula",`A connected planar graph has ${V} vertices and ${E} edges. How many faces?`,2-V+E,[E-V,V+E-2,2+V-E].filter(x=>x!==2-V+E),[`V − E + F = 2 ⇒ F = 2 − ${V} + ${E}`,`<b>${2-V+E}</b>`]); },
 ()=>{ const S=pick([["K<sub>5</sub>",5],["C<sub>7</sub> (odd cycle)",3],["C<sub>8</sub> (even cycle)",2],["a tree with 6 vertices",2],["K<sub>3,4</sub>",2],["K<sub>4</sub>",4]]); return P("Chromatic number",`What is the chromatic number of ${S[0]}?`,S[1],[S[1]+1,S[1]-1,1].filter(x=>x!==S[1]&&x>0),[`<b>χ = ${S[1]}</b>`]); }],
 chal:[
 ()=>{ const n=R(3,6); return P("Cayley's formula",`How many labeled trees are there on ${n} vertices?`,n**(n-2),[fact(n),n**(n-1),2**(n-1)],[`nⁿ⁻² = ${n}<sup>${n-2}</sup>`,`<b>${n**(n-2)}</b>`]); },
 ()=>{ const n=R(4,8); return P("Hamilton cycles",`How many distinct Hamilton cycles does K<sub>${n}</sub> have (ignoring start and direction)?`,fact(n-1)/2,[fact(n),fact(n-1),fact(n)/2],[`(n − 1)!/2 = ${fact(n-1)}/2`,`<b>${fact(n-1)/2}</b>`]); },
 ()=>{ const V=R(5,10); return P("Planar bound",`What is the maximum number of edges in a simple planar graph with ${V} vertices?`,3*V-6,[3*V,2*V-4,V*(V-1)/2],[`E ≤ 3V − 6`,`<b>${3*V-6}</b>`]); }],
 frq:[()=>{ let d; do{ d=Array.from({length:6},()=>R(1,5)); }while(d.reduce((a,b)=>a+b,0)%2); const s=d.reduce((a,b)=>a+b,0); const odd=d.filter(x=>x%2).length; const E=s/2;
  return {t:"Degrees, Euler and planarity",calc:false,stem:`A connected simple graph G has 6 vertices with degrees ${d.join(", ")}.`,parts:[
   [`How many edges does G have? Justify.`,[`Handshake lemma: 2|E| = ${s}.`],N(E),1],
   [`Does G have an Euler circuit? An Euler path?`,[`${odd} vertices of odd degree.`,odd===0?"All even: Euler circuit.":odd===2?"Exactly 2 odd: Euler path but no circuit.":"More than 2 odd: neither."],odd===0?"Circuit":odd===2?"Path only":"Neither",2],
   [`If G is planar, how many faces does it have?`,[`V − E + F = 2 ⇒ F = 2 − 6 + ${E}`],N(2-6+E),1],
   [`Could G be planar? Use E ≤ 3V − 6.`,[`3V − 6 = 12; E = ${E}.`,E<=12?"The bound allows it (not a proof that it is planar).":"E &gt; 12: G cannot be planar."],E<=12?"Possibly":"No",2]]}; }]
};

const units=[U1,U2,U3,U4,U5,U6,U7];
const wrap=g=>()=>{ for(let i=0;i<20;i++){ const p=g(); if(p) return p; } return g(); };
units.forEach(u=>{ ["gen","chal","frq"].forEach(k=>u[k]=(u[k]||[]).map(wrap)); });
units.push({id:"review",num:8,label:"Final review",short:"Final Review",name:"Final Review: Mixed Practice",sub:"Mixed questions and free response from every unit, like a final exam. New each time.",c:"#111",
  sheet:units.map(u=>[u.c,u.short,u.sheet[0][2],""]),gen:units.flatMap(u=>u.gen),chal:units.flatMap(u=>u.chal),frq:units.flatMap(u=>u.frq)});
units.push({id:"exams",num:0,label:"University exams",short:"University Exams",name:"Real University Exams with Solutions",sub:"Free exams and solutions from MIT 6.042J Mathematics for Computer Science (MIT OpenCourseWare), matched to the units of this book",c:"#7a5a12",gen:[],chal:[],frq:[],sheet:[["#1d4e89", "MIT 6.042J, Fall 2010 (OpenCourseWare)", ["<a href=\"https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/pages/exams/\" target=\"_blank\" rel=\"noopener\">Midterm, practice problems, 2004/2006/2008 finals, with solutions</a>"], "A midterm plus three past finals: proofs, number theory, graphs, counting and probability."], ["#6a3d9a", "MIT 6.042J, Fall 2005 (OpenCourseWare)", ["<a href=\"https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2005/pages/exams\" target=\"_blank\" rel=\"noopener\">Quizzes and final with solutions</a>"], "Past exams with solutions."]]});

window.ZC={units,strands:[["Logic & proof",NAVY,["u1","u2","u3"]],["Counting & numbers",PURP,["u4","u5","u6"]],["Structures",GRN,["u7"]],["Exam prep","#111",["review","exams"]]],mapNote:"A first course in discrete mathematics, in order.",frqLead:"Free-response questions in university exam format."};
})();
