/* Z-Partial Differential Equations content. Every answer is computed. */
(function(){
const {R,pick,nz,gcd,shuffle,N,F,sq,cu,X,sg,poly,P,PF,PS}=window.ZH;
const FR=(n,d)=>`<span class="frc"><span>${n}</span><span>${d}</span></span>`;
const FF=(n,d)=>{ const f=F(n,d); const m=f.match(/^(−?)(\d+)\/(\d+)$/); return m?`${m[1]}${FR(m[2],m[3])}`:f; };
const T=(...r)=>r;
const NAVY="#1d4e89",ORG="#c2571a",RED="#c23a52",PURP="#6a3d9a",TEAL="#0f7a6c",GRN="#137333",BLU="#1f4fd1";
const ig=(a,b)=>`∫<sub>${a}</sub><sup>${b}</sup>`;
const r3=x=>+x.toFixed(3), r4=x=>+x.toFixed(4);
const PSX=(t,q,a,w,s,extra=[])=>{ let ww=[...new Set(w.concat(extra))].filter(x=>x!==a); if(ww.length<3) ww=ww.concat(["None of these","Cannot be determined"]).slice(0,3); return PS(t,q,a,ww.slice(0,3),s); };
const lin=(a,b)=>{ let o=""; [[a,"x"],[b,"y"]].forEach(([c,v])=>{ if(!c) return; const m=Math.abs(c),t=(m===1?"":m)+v; o+=o?(c<0?" − ":" + ")+t:(c<0?"−":"")+t; }); return o||"0"; };
const ux=(s)=>`u<sub>${s}</sub>`;

/* ===== U1 Classification ===== */
const U1M={
 k0:{grp:"Step 1",c:NAVY,name:"Read Off Order and Linearity",hint:"highest derivative",when:"Any PDE.",rule:"Order = highest derivative. Linear: u and its derivatives appear to the first power, not multiplied together, with coefficients depending only on the independent variables. Homogeneous: no term without u.",ex:[T(ux("t")+" = k"+ux("xx"),["2nd order, linear, homogeneous"]),T(ux("t")+" + u"+ux("x")+" = 0",["1st order, nonlinear (Burgers)"])]},
 ktyp:{grp:"Type",c:ORG,name:"Discriminant B"+sq+" − 4AC",hint:"elliptic, parabolic, hyperbolic",when:"A"+ux("xx")+" + B"+ux("xy")+" + C"+ux("yy")+" + … = 0.",rule:"B"+sq+" − 4AC &lt; 0: elliptic (Laplace). = 0: parabolic (heat). &gt; 0: hyperbolic (wave). The type may change from point to point if A, B, C vary.",ex:[T(ux("xx")+" + "+ux("yy")+" = 0",["−4: elliptic"]),T(ux("tt")+" = c"+sq+ux("xx"),["4c"+sq+" &gt; 0: hyperbolic"])]},
 ksup:{grp:"Solutions",c:RED,name:"Check a Solution & Superposition",hint:"substitute",when:"“Is u a solution?”, building new solutions.",rule:"Compute the needed derivatives and substitute. For linear homogeneous PDEs, sums and constant multiples of solutions are solutions.",ex:[T("u = e<sup>−t</sup>sin x for "+ux("t")+" = "+ux("xx"),["−e<sup>−t</sup>sin x on both sides ✓"]),T("u₁, u₂ solve Laplace",["u₁ + 3u₂ does too"])]},
 kbc:{grp:"Conditions",c:PURP,name:"Boundary & Initial Conditions",hint:"Dirichlet, Neumann, Robin",when:"Setting up a well-posed problem.",rule:"Dirichlet: u given on the boundary. Neumann: ∂u/∂n given (insulated: 0). Robin: a mix. Heat needs one initial condition; wave needs two (u and "+ux("t")+").",ex:[T("Insulated ends",[ux("x")+"(0, t) = "+ux("x")+"(L, t) = 0"]),T("Fixed string",["u(0, t) = u(L, t) = 0"])]},
 kend:{grp:"Last step",c:GRN,name:"Name the Model",hint:"heat, wave, Laplace",when:"Every answer.",rule:"Connect the type to physics: parabolic ↔ diffusion, hyperbolic ↔ waves, elliptic ↔ equilibrium.",ex:[T("Parabolic",["Smooths out over time"]),T("Hyperbolic",["Finite speed of propagation"])]}
};
const U1={id:"u1",num:1,short:"Classification",name:"Unit 1: Introduction and Classification",sub:"Order, linearity, superposition, elliptic/parabolic/hyperbolic, boundary and initial conditions",c:NAVY,
 flow:{M:U1M,label:"Classification flowchart",lead:"Order, linearity, then type.",start:"Given a PDE",top:["k0"],q:"What is asked?",cols:[["Type","",ORG,["ktyp"]],["Is u a solution?","",RED,["ksup"]],["Conditions","",PURP,["kbc"]]],end:"kend"},
 sheet:[[ORG,"Type of Au<sub>xx</sub> + Bu<sub>xy</sub> + Cu<sub>yy</sub>",["B"+sq+" − 4AC &lt; 0 elliptic","= 0 parabolic","&gt; 0 hyperbolic"],""],[NAVY,"The big three",["Heat: u<sub>t</sub> = ku<sub>xx</sub>","Wave: u<sub>tt</sub> = c"+sq+"u<sub>xx</sub>","Laplace: u<sub>xx</sub> + u<sub>yy</sub> = 0"],""],[PURP,"Conditions",["Dirichlet: u","Neumann: ∂u/∂n","Robin: au + b∂u/∂n"],""]],
 gen:[
 ()=>{ const A=R(-4,4),B=R(-6,6),C=R(-4,4); if(!A&&!C) return null; const D=B*B-4*A*C; const t=D<0?"Elliptic":D>0?"Hyperbolic":"Parabolic"; return PSX("Type",`Classify ${N(A)}${ux("xx")}${sg(B)}${ux("xy")}${sg(C)}${ux("yy")} = 0.`.replace(/ \+ 0u<sub>xy<\/sub>/,"").replace(/^Classify 1u/,"Classify u"),t,["Elliptic","Parabolic","Hyperbolic","Mixed"],[`B${sq} − 4AC = ${N(B*B)} − ${N(4*A*C)} = ${N(D)}`,`<b>${t}</b>`]); },
 ()=>{ const S=pick([[ux("t")+" = 3"+ux("xx"),"2nd order, linear"],[ux("t")+" + u"+ux("x")+" = 0","1st order, nonlinear"],[ux("x")+" + "+ux("y")+" = 0","1st order, linear"],[ux("tt")+" = 4"+ux("xx")+" + sin u","2nd order, nonlinear"],[ux("xxxx")+" + "+ux("tt")+" = 0","4th order, linear"]]); return PSX("Order and linearity",`Classify ${S[0]}.`,S[1],["2nd order, linear","1st order, nonlinear","1st order, linear","2nd order, nonlinear","4th order, linear"],[`<b>${S[1]}</b>`]); },
 ()=>{ const k=R(1,9),n=R(1,4); return P("Checking solutions",`For which λ does u = e<sup>λt</sup>sin(${n===1?"":n}x) solve ${ux("t")} = ${k}${ux("xx")}?`,-k*n*n,[k*n*n,-k,-n*n],[`${ux("t")} = λu, ${ux("xx")} = −${n*n}u`,`λ = −${k}·${n*n} = <b>${N(-k*n*n)}</b>`]); },
 ()=>{ const c=R(1,6),k=R(1,5); return P("Checking solutions",`u = sin(${k===1?"":k}x)cos(ωt) solves ${ux("tt")} = ${c*c}${ux("xx")}. Find ω &gt; 0.`,c*k,[c,k,c*c*k],[`${ux("tt")} = −ω${sq}u, ${ux("xx")} = −${k*k}u`,`ω${sq} = ${c*c}·${k*k} ⇒ <b>ω = ${c*k}</b>`]); },
 ()=>{ const a=R(1,4); return P("Mixed type",`For which y is ${ux("xx")} + y${ux("yy")} = 0 parabolic? (Tricomi-type)`,0,[1,-1,a],[`B${sq} − 4AC = −4y = 0`,`<b>y = 0</b> (elliptic for y &gt; 0, hyperbolic for y &lt; 0)`]); }],
 chal:[
 ()=>{ const a=R(1,4); return PSX("Harmonic functions",`Which is harmonic (solves ${ux("xx")} + ${ux("yy")} = 0)?`,`x${sq} − y${sq}`,[`x${sq} + y${sq}`,`x${cu} − y${sq}`,`x${sq}y`],[`(x${sq} − y${sq}): 2 − 2 = 0`]); },
 ()=>{ const S=pick([["Heat","1 (u at t = 0)"],["Wave","2 (u and u<sub>t</sub> at t = 0)"],["Laplace","0 (only boundary data)"]]); return PSX("Conditions",`How many initial conditions does the ${S[0]} equation need?`,S[1],["1 (u at t = 0)","2 (u and u<sub>t</sub> at t = 0)","0 (only boundary data)","3"],[`<b>${S[1]}</b>`]); }],
 frq:[()=>{ const A=R(1,3),C=R(1,3),B=pick([0,2*Math.round(Math.sqrt(A*C)),2*A+2*C]); const D=B*B-4*A*C;
  return {t:"Classifying and checking",calc:false,stem:`Consider ${A===1?"":A}${ux("xx")}${B?` + ${B}${ux("xy")}`:""} + ${C===1?"":C}${ux("yy")} = 0 and the heat equation ${ux("t")} = 2${ux("xx")}.`,parts:[
   [`Classify the first PDE.`,[`B${sq} − 4AC = ${D}`],D<0?"Elliptic":D>0?"Hyperbolic":"Parabolic",2],
   [`Find λ so that u = e<sup>λt</sup>sin(3x) solves the heat equation.`,[`λ = −2·9`],"−18",2],
   [`Show u = 5e<sup>−2t</sup>sin x − e<sup>−18t</sup>sin(3x) is also a solution. What principle is this?`,[`Each term solves it; the heat equation is linear and homogeneous: superposition.`],"",2],
   [`What is lim<sub>t→∞</sub> u(x, t)? Interpret.`,[`Both exponentials → 0`,`The temperature decays to 0: diffusion smooths everything out.`],"0",1]]}; }]
};

/* ===== U2 First-order PDEs ===== */
const U2M={
 f0:{grp:"Step 1",c:NAVY,name:"Write as a Directional Derivative",hint:"(a, b) · ∇u",when:"au<sub>x</sub> + bu<sub>y</sub> = …",rule:"au<sub>x</sub> + bu<sub>y</sub> is the derivative of u along ⟨a, b⟩. Along lines in that direction (characteristics), the PDE becomes an ODE.",ex:[T("2u<sub>x</sub> + 3u<sub>y</sub> = 0",["u constant along 3x − 2y = const"]),T("u<sub>t</sub> + cu<sub>x</sub> = 0",["Constant along x − ct = const"])]},
 ftr:{grp:"Constant coefficients",c:ORG,name:"Transport Equation",hint:"u = f(x − ct)",when:"u<sub>t</sub> + cu<sub>x</sub> = 0, u(x, 0) = f(x).",rule:"u(x, t) = f(x − ct): the initial profile moves right at speed c (left if c &lt; 0).",ex:[T("u<sub>t</sub> + 2u<sub>x</sub> = 0, u(x, 0) = x"+sq,["u = (x − 2t)"+sq]),T("Speed",["c"])]},
 fgen:{grp:"Constant coefficients",c:ORG,name:"General Solution",hint:"f(bx − ay)",when:"au<sub>x</sub> + bu<sub>y</sub> = 0.",rule:"u = f(bx − ay) for any differentiable f. Use the side condition to find f.",ex:[T("u<sub>x</sub> + u<sub>y</sub> = 0",["u = f(x − y)"]),T("u(x, 0) = sin x",["u = sin(x − y)"])]},
 fchar:{grp:"Variable coefficients",c:RED,name:"Method of Characteristics",hint:"dx/a = dy/b = du/c",when:"a(x, y)u<sub>x</sub> + b(x, y)u<sub>y</sub> = c(x, y, u).",rule:"Solve dy/dx = b/a for the characteristic curves φ(x, y) = const, then solve du along them. The general solution involves an arbitrary function of φ.",ex:[T("xu<sub>x</sub> + yu<sub>y</sub> = 0",["Characteristics y/x = const: u = f(y/x)"]),T("u<sub>x</sub> + 2xu<sub>y</sub> = 0",["y − x"+sq+" = const: u = f(y − x"+sq+")"])]},
 fend:{grp:"Last step",c:GRN,name:"Check the Side Condition",hint:"substitute",when:"Every answer.",rule:"Make sure the solution satisfies the PDE and the initial/boundary condition.",ex:[T("u = (x − 2t)"+sq,["u(x, 0) = x"+sq+" ✓"]),T("Domain",["Characteristics must cross the data curve"])]}
};
const U2={id:"u2",num:2,short:"First-Order PDEs",name:"Unit 2: First-Order PDEs and Characteristics",sub:"Transport equation, general solutions, method of characteristics",c:ORG,
 flow:{M:U2M,label:"First-order PDE flowchart",lead:"Constant or variable coefficients? Then follow the characteristics.",start:"au<sub>x</sub> + bu<sub>y</sub> = c",top:["f0"],q:"Coefficients?",cols:[["Constant","",ORG,["ftr","fgen"]],["Variable","",RED,["fchar"]]],end:"fend"},
 sheet:[[ORG,"Transport",["u<sub>t</sub> + cu<sub>x</sub> = 0 ⇒ u = f(x − ct)"],""],[ORG,"Constant coefficients",["au<sub>x</sub> + bu<sub>y</sub> = 0 ⇒ u = f(bx − ay)"],""],[RED,"Characteristics",["dy/dx = b/a","u constant (or ODE) along them"],""]],
 gen:[
 ()=>{ const c=nz(-4,4),x=R(-3,5),t=R(1,3); return P("Transport equation",`u<sub>t</sub> + ${N(c)}u<sub>x</sub> = 0, u(x, 0) = x${sq}. Find u(${N(x)}, ${t}).`.replace(" + −"," − ").replace(" 1u<sub>x"," u<sub>x"),(x-c*t)**2,[(x+c*t)**2,x*x,(x-t)**2].filter(v=>v!==(x-c*t)**2),[`u = (x − ${N(c)}t)${sq}`,`(${N(x)} − ${N(c*t)})${sq} = <b>${N((x-c*t)**2)}</b>`]); },
 ()=>{ const c=nz(-6,6); return P("Wave speed",`u<sub>t</sub>${sg(c)}u<sub>x</sub> = 0. At what velocity does the initial profile move?`,c,[-c,c*c,1/c].map(r3),[`u = f(x − (${N(c)})t)`,`Velocity <b>${N(c)}</b>`]); },
 ()=>{ const a=nz(-4,4),b=nz(-4,4); const g=gcd(a,b); const A=a/g,Bb=b/g; return PSX("General solution",`General solution of ${lin(a,0).replace("x","u<sub>x</sub>")}${b<0?" − ":" + "}${Math.abs(b)===1?"":Math.abs(b)}u<sub>y</sub> = 0?`,`u = f(${lin(Bb,-A)})`,[`u = f(${lin(A,-Bb)})`,`u = f(${lin(Bb,A)})`,`u = f(x)g(y)`],[`Constant along the direction ⟨${N(a)}, ${N(b)}⟩: ${N(b)}x − (${N(a)})y = const`,`<b>u = f(${lin(Bb,-A)})</b>`],[`u = f(${lin(A,Bb)})`,`u = f(xy)`]); },
 ()=>{ const k=R(1,4),x=R(1,4),y=R(1,8); return P("Characteristics",`u<sub>x</sub> + ${2*k}xu<sub>y</sub> = 0, u(0, y) = y. Find u(${x}, ${y+k*x*x}).`,y,[y+k*x*x,y+2*k*x*x,x],[`Characteristics: y − ${k===1?"":k}x${sq} = const, so u = f(y − ${k===1?"":k}x${sq})`,`u(0, y) = y ⇒ f(s) = s`,`u = ${y+k*x*x} − ${k*x*x} = <b>${y}</b>`]); },
 ()=>{ const a=R(1,5); return PSX("Characteristics",`For xu<sub>x</sub> + yu<sub>y</sub> = 0, what are the characteristic curves?`,"Rays y = Cx",["Circles x"+sq+" + y"+sq+" = C","Hyperbolas xy = C","Parabolas y = Cx"+sq],[`dy/dx = y/x ⇒ y = Cx`,`<b>u = f(y/x)</b>`]); }],
 chal:[
 ()=>{ const c=R(1,3),x=R(1,6),t=R(1,3); return P("Transport with decay",`u<sub>t</sub> + ${c}u<sub>x</sub> = −u, u(x, 0) = x. Find u(${x}, ${t}) (3 decimals).`,r3((x-c*t)*Math.exp(-t)),[x-c*t,r3(x*Math.exp(-t)),r3((x-c*t)*Math.exp(t))],[`Along x − ${c}t = s: du/dt = −u ⇒ u = s e<sup>−t</sup>`,`(${x} − ${c*t})e<sup>−${t}</sup> ≈ <b>${r3((x-c*t)*Math.exp(-t))}</b>`],{tol:.002}); },
 ()=>{ return PSX("Burgers' equation",`For u<sub>t</sub> + uu<sub>x</sub> = 0, characteristics are straight lines with speed…`,"u (the solution itself)",["1","0","x"],[`dx/dt = u, and u is constant along each line`,`Lines can cross ⇒ shocks`]); }],
 frq:[()=>{ const c=nz(-3,3);
  return {t:"Transport equation",calc:false,stem:`u<sub>t</sub>${sg(c)}u<sub>x</sub> = 0 on −∞ &lt; x &lt; ∞, with u(x, 0) = e<sup>−x²</sup>.`.replace(" 1u"," u"),parts:[
   [`Find the characteristic lines.`,[`dx/dt = ${N(c)} ⇒ x − (${N(c)})t = const`],`x − (${N(c)})t = const`,1],
   [`Solve for u(x, t).`,[`u = e<sup>−(x − (${N(c)})t)²</sup>`],"",2],
   [`Where is the peak at t = 2?`,[`The peak is at x − (${N(c)})(2) = 0`],`x = ${N(2*c)}`,1],
   [`Describe the solution physically.`,[`The bump moves ${c>0?"right":"left"} at speed ${Math.abs(c)} without changing shape.`],"",2]]}; }]
};

/* ===== U3 Fourier series ===== */
const U3M={
 s0:{grp:"Step 1",c:NAVY,name:"Find the Period and Symmetry",hint:"even? odd?",when:"Every Fourier series.",rule:"Period 2L. Even f: only cosines (b<sub>n</sub> = 0). Odd f: only sines (a<sub>n</sub> = 0).",ex:[T("f(x) = x on (−π, π)",["Odd: sine series"]),T("f(x) = |x|",["Even: cosine series"])]},
 sfull:{grp:"Coefficients",c:ORG,name:"Full Fourier Series",hint:"a₀, a<sub>n</sub>, b<sub>n</sub>",when:"f on (−L, L).",rule:"f ~ a₀/2 + Σ(a<sub>n</sub>cos(nπx/L) + b<sub>n</sub>sin(nπx/L)), a<sub>n</sub> = (1/L)∫<sub>−L</sub><sup>L</sup> f cos(nπx/L) dx, b<sub>n</sub> = (1/L)∫<sub>−L</sub><sup>L</sup> f sin(nπx/L) dx.",ex:[T("x on (−π, π)",["b<sub>n</sub> = 2(−1)<sup>n+1</sup>/n"]),T("Square wave ±1",["b<sub>n</sub> = 4/(nπ), n odd"])]},
 shalf:{grp:"Half-range",c:RED,name:"Sine and Cosine Series on (0, L)",hint:"odd/even extension",when:"f given only on (0, L) (boundary value problems).",rule:"Sine series: b<sub>n</sub> = (2/L)∫<sub>0</sub><sup>L</sup> f sin(nπx/L) dx (Dirichlet problems). Cosine series: a<sub>n</sub> = (2/L)∫<sub>0</sub><sup>L</sup> f cos(nπx/L) dx (Neumann).",ex:[T("f = 1 on (0, π), sine series",["b<sub>n</sub> = 4/(nπ) for odd n"]),T("Already a sine",["Read the coefficient off"])]},
 sconv:{grp:"Convergence",c:PURP,name:"Convergence & Parseval",hint:"average at jumps",when:"Value of the series at a point.",rule:"The series converges to f(x) where f is continuous, and to the average of the one-sided limits at a jump. Parseval: (1/L)∫|f|"+sq+" = a₀"+sq+"/2 + Σ(a<sub>n</sub>"+sq+" + b<sub>n</sub>"+sq+").",ex:[T("Square wave at x = 0",["(−1 + 1)/2 = 0"]),T("Σ1/n"+sq+" from x on (−π, π)",["π"+sq+"/6"])]},
 send:{grp:"Last step",c:GRN,name:"Sanity Check",hint:"symmetry and decay",when:"Every answer.",rule:"Odd functions have no cosines; coefficients of a jump decay like 1/n, of a corner like 1/n"+sq+".",ex:[T("Check b₁",["Compute it directly"]),T("Gibbs",["Overshoot ≈ 9% near jumps"])]}
};
const U3={id:"u3",num:3,short:"Fourier Series",name:"Unit 3: Fourier Series",sub:"Full, sine and cosine series, even and odd extensions, convergence, Parseval",c:RED,
 flow:{M:U3M,label:"Fourier series flowchart",lead:"Symmetry first, then the right coefficient formula.",start:"Expand f",top:["s0"],q:"Which series?",cols:[["On (−L, L)","",ORG,["sfull"]],["On (0, L)","",RED,["shalf"]],["Value / sum","",PURP,["sconv"]]],end:"send"},
 sheet:[[ORG,"Full series on (−L, L)",["a<sub>n</sub> = (1/L)∫f cos(nπx/L)","b<sub>n</sub> = (1/L)∫f sin(nπx/L)"],""],[RED,"Half-range on (0, L)",["b<sub>n</sub> = (2/L)∫<sub>0</sub><sup>L</sup>f sin(nπx/L)","a<sub>n</sub> = (2/L)∫<sub>0</sub><sup>L</sup>f cos(nπx/L)"],""],[PURP,"Standard results",["x on (−π, π): b<sub>n</sub> = 2(−1)<sup>n+1</sup>/n","Square wave: 4/(nπ), n odd","|x|: a<sub>n</sub> = −4/(πn"+sq+"), n odd"],""]],
 gen:[
 ()=>{ const n=R(1,8); return PF("Coefficients of x",`For f(x) = x on (−π, π), find b<sub>${n}</sub>.`,2*(n%2?1:-1),n,[F(2,n),F(-2,n),"0"].filter(x=>x!==F(2*(n%2?1:-1),n)),[`b<sub>n</sub> = (1/π)∫<sub>−π</sub><sup>π</sup> x sin(nx) dx = 2(−1)<sup>n+1</sup>/n`,`<b>${F(2*(n%2?1:-1),n)}</b>`]); },
 ()=>{ const n=R(1,9); const v=n%2?4/(n*Math.PI):0; return P("Square wave",`f = −1 on (−π, 0), 1 on (0, π). Find b<sub>${n}</sub> (3 decimals).`,r3(v),[r3(2/(n*Math.PI)),r3(4/n),n%2?0:r3(4/(n*Math.PI))],[`b<sub>n</sub> = 4/(nπ) for odd n, 0 for even n`,`<b>${r3(v)}</b>`],{tol:.002}); },
 ()=>{ const S=pick([["x"+sq,"Cosines only"],["x"+cu,"Sines only"],["|x|","Cosines only"],["sin x + cos x","Both"],["e<sup>x</sup>","Both"],["x cos x","Sines only"]]); return PSX("Symmetry",`On (−π, π), the Fourier series of ${S[0]} contains…`,S[1],["Cosines only","Sines only","Both","Neither"],[`<b>${S[1]}</b>`]); },
 ()=>{ const a=R(-5,5),b=R(-5,5); if(a===b) return null; return PF("Convergence at a jump",`f has a jump at x₀ with f(x₀⁻) = ${N(a)} and f(x₀⁺) = ${N(b)}. What does the Fourier series converge to at x₀?`,a+b,2,[N(a),N(b),"0"],[`Average of the one-sided limits`,`<b>${F(a+b,2)}</b>`]); },
 ()=>{ const k=R(2,7),c=nz(-5,5),d=nz(-5,5); return P("Reading coefficients",`The sine series of f(x) = ${N(c)} sin x${sg(d)} sin(${k}x) on (0, π): find b<sub>${k}</sub>.`,d,[c,0,k].filter(x=>x!==d),[`Already a finite sine series`,`<b>${N(d)}</b>`]); }],
 chal:[
 ()=>{ return PSX("Parseval",`Using the series of x on (−π, π), Parseval gives Σ1/n${sq} = ?`,`π${sq}/6`,[`π${sq}/8`,`π/4`,`π${sq}/12`],[`(1/π)∫x${sq} = 2π${sq}/3 = Σ4/n${sq}`,`<b>Σ1/n${sq} = π${sq}/6</b>`]); },
 ()=>{ return PSX("Leibniz series",`Evaluating the square wave series at x = π/2 gives 1 − 1/3 + 1/5 − … = ?`,"π/4",["π/2","π"+sq+"/8","1"],[`1 = (4/π)(1 − 1/3 + 1/5 − …)`,`<b>π/4</b>`]); }],
 frq:[()=>{ const L=pick([1,2,3]);
  return {t:"Sine series of a constant",calc:false,stem:`Let f(x) = 1 on (0, ${L}).`,parts:[
   [`Find the sine-series coefficients b<sub>n</sub>.`,[`b<sub>n</sub> = (2/${L})${ig(0,L)} sin(nπx/${L}) dx = (2/(nπ))(1 − (−1)<sup>n</sup>)`],`4/(nπ) for odd n, 0 for even n`,3],
   [`Write the first three nonzero terms.`,[`(4/π)[sin(πx/${L}) + (1/3)sin(3πx/${L}) + (1/5)sin(5πx/${L})]`],"",2],
   [`What does the series converge to at x = 0 and x = ${L}?`,[`The odd extension jumps from −1 to 1: average 0`],"0",1],
   [`Evaluate the series at x = ${L}/2 to get a famous sum.`,[`1 = (4/π)(1 − 1/3 + 1/5 − …)`],"1 − 1/3 + 1/5 − … = π/4",1]]}; }]
};

/* ===== U4 Heat equation ===== */
const U4M={
 h0:{grp:"Step 1",c:NAVY,name:"Make the Boundary Conditions Homogeneous",hint:"subtract the steady state",when:"u<sub>t</sub> = ku<sub>xx</sub> on 0 &lt; x &lt; L.",rule:"If u(0, t) = A, u(L, t) = B, write u = v + U with U(x) = A + (B − A)x/L. Then v has zero boundary values.",ex:[T("u(0) = 0, u(10) = 50",["U = 5x"]),T("Steady state",["U″ = 0: a straight line"])]},
 hsep:{grp:"Fixed ends",c:ORG,name:"Separation of Variables (Dirichlet)",hint:"sine series",when:"u(0, t) = u(L, t) = 0.",rule:"u = Σb<sub>n</sub>e<sup>−k(nπ/L)"+sq+"t</sup>sin(nπx/L), with b<sub>n</sub> the sine coefficients of u(x, 0).",ex:[T("u(x, 0) = 3 sin(2x), L = π, k = 1",["u = 3e<sup>−4t</sup>sin(2x)"]),T("Decay rate",["Higher modes die faster"])]},
 hneu:{grp:"Insulated ends",c:RED,name:"Neumann Problem",hint:"cosine series",when:"u<sub>x</sub>(0, t) = u<sub>x</sub>(L, t) = 0.",rule:"u = a₀/2 + Σa<sub>n</sub>e<sup>−k(nπ/L)"+sq+"t</sup>cos(nπx/L). As t → ∞, u → a₀/2 = average initial temperature.",ex:[T("Insulated rod",["Approaches the average of u(x, 0)"]),T("Energy conserved",["∫u dx constant"])]},
 hinf:{grp:"Infinite rod",c:PURP,name:"Heat Kernel",hint:"Gaussian",when:"−∞ &lt; x &lt; ∞.",rule:"u = ∫ G(x − y, t)f(y) dy with G = e<sup>−x²/(4kt)</sup>/√(4πkt). Infinite propagation speed; solutions are smooth for t &gt; 0.",ex:[T("Point source",["Spreading Gaussian"]),T("Width",["∝ √(kt)"])]},
 hend:{grp:"Last step",c:GRN,name:"Check Limits",hint:"t → ∞",when:"Every answer.",rule:"Check the initial condition at t = 0 and the steady state as t → ∞.",ex:[T("Dirichlet zero",["u → 0"]),T("Neumann",["u → average"])]}
};
const U4={id:"u4",num:4,short:"Heat Equation",name:"Unit 4: The Heat Equation",sub:"Separation of variables, Dirichlet and Neumann problems, steady states, the heat kernel",c:PURP,
 flow:{M:U4M,label:"Heat equation flowchart",lead:"Fix the boundary conditions, then separate variables.",start:"u<sub>t</sub> = ku<sub>xx</sub>",top:["h0"],q:"Which boundary conditions?",cols:[["Fixed temperature","",ORG,["hsep"]],["Insulated","",RED,["hneu"]],["Infinite rod","",PURP,["hinf"]]],end:"hend"},
 sheet:[[ORG,"Dirichlet",["u = Σb<sub>n</sub>e<sup>−k(nπ/L)²t</sup>sin(nπx/L)"],""],[RED,"Neumann",["u = a₀/2 + Σa<sub>n</sub>e<sup>−k(nπ/L)²t</sup>cos(nπx/L)"],""],[NAVY,"Steady state",["U = A + (B − A)x/L"],""],[PURP,"Heat kernel",["G = e<sup>−x²/(4kt)</sup>/√(4πkt)"],""]],
 gen:[
 ()=>{ const k=R(1,4),n=R(1,4),b=nz(-6,6); return P("Decay rates",`u<sub>t</sub> = ${k}u<sub>xx</sub> on (0, π), u = 0 at both ends, u(x, 0) = ${N(b)} sin(${n===1?"":n}x). The solution is ${N(b)}e<sup>−λt</sup>sin(${n===1?"":n}x). Find λ.`,k*n*n,[k*n,n*n,k],[`λ = k n${sq} = ${k}·${n*n}`,`<b>${k*n*n}</b>`]); },
 ()=>{ const A=R(0,50),B=R(0,100),L=pick([1,2,5,10]),x=R(0,L); return PF("Steady state",`u(0, t) = ${A}, u(${L}, t) = ${B}. Find the steady-state temperature at x = ${x}.`,A*L+(B-A)*x,L,[F(A+B,2),N(B),N(A)],[`U(x) = ${A} + (${B} − ${A})x/${L}`,`U(${x}) = <b>${F(A*L+(B-A)*x,L)}</b>`]); },
 ()=>{ const a=R(10,90),b=nz(-9,9); return P("Neumann problem",`An insulated rod has u(x, 0) = ${a}${sg(b)} cos(πx). What is lim<sub>t→∞</sub> u?`,a,[a+b,0,b],[`Insulated ⇒ u → average of u(x, 0)`,`cos term averages to 0: <b>${a}</b>`]); },
 ()=>{ const k=R(1,3),L=pick([1,2]); const n=R(1,3); const D=L===1?"":"/"+L; return PSX("Eigenfunctions",`Which are the spatial eigenfunctions for u<sub>t</sub> = ${k}u<sub>xx</sub> with u(0, t) = u(${L}, t) = 0?`,`sin(nπx${D})`,[`cos(nπx${D})`,`e<sup>nx</sup>`,`sin(nx${L===1?"":"/"+L})`,`sin(nπx/${2*L})`],[`X″ = −λX, X(0) = X(${L}) = 0`,`<b>sin(nπx${D})</b>, λ = (nπ${D})${sq}`]); },
 ()=>{ const k=R(1,3),t=pick([0.1,0.2,0.5]),c1=R(1,5),c3=R(1,5); const v=c1*Math.exp(-k*t)*1+c3*Math.exp(-9*k*t)*(-1); return P("Evaluating series",`u = ${c1}e<sup>−${k}t</sup>sin x + ${c3}e<sup>−${9*k}t</sup>sin(3x). Find u(π/2, ${t}) (3 decimals).`,r3(v),[r3(c1*Math.exp(-k*t)+c3*Math.exp(-9*k*t)),c1-c3,r3(c1*Math.exp(-k*t))],[`sin(π/2) = 1, sin(3π/2) = −1`,`${c1}e<sup>−${+(k*t).toFixed(2)}</sup> − ${c3}e<sup>−${+(9*k*t).toFixed(2)}</sup> ≈ <b>${r3(v)}</b>`],{tol:.002}); }],
 chal:[
 ()=>{ const k=R(1,4),n=R(2,4); return PF("Half-life of a mode",`For u<sub>t</sub> = ${k}u<sub>xx</sub> on (0, π) with zero ends, the mode sin(${n}x) decays by e when t = ?`,1,k*n*n,[F(1,k*n),F(1,n*n),N(k*n*n)],[`Factor e<sup>−${k*n*n}t</sup> = e<sup>−1</sup>`,`<b>t = ${F(1,k*n*n)}</b>`]); },
 ()=>{ return PSX("Uniqueness",`Which method proves uniqueness for the heat equation with Dirichlet conditions?`,"Energy method (∫u² decreases) or maximum principle",["Superposition","d'Alembert's formula","Laplace transform"],[`If two solutions exist, their difference w has w(x, 0) = 0 and E(t) = ∫w² non-increasing ⇒ w ≡ 0`]); }],
 frq:[()=>{ const k=R(1,3),c1=R(2,8),c2=R(1,5);
  return {t:"Heat equation with fixed ends",calc:true,stem:`u<sub>t</sub> = ${k}u<sub>xx</sub>, 0 &lt; x &lt; π, u(0, t) = u(π, t) = 0, u(x, 0) = ${c1} sin x − ${c2} sin(2x).`,parts:[
   [`Separate variables: show X″ + λX = 0 with X(0) = X(π) = 0, and find the eigenvalues.`,[`u = X(x)T(t) ⇒ T′/(${k}T) = X″/X = −λ`,`λ<sub>n</sub> = n${sq}, X<sub>n</sub> = sin(nx)`],"λ = n²",3],
   [`Write the solution.`,[`u = ${c1}e<sup>−${k}t</sup>sin x − ${c2}e<sup>−${4*k}t</sup>sin(2x)`],"",2],
   [`Find u(π/2, 1) to 3 decimals.`,[`sin(π) = 0: ${c1}e<sup>−${k}</sup>`],N(r3(c1*Math.exp(-k))),1],
   [`Which mode dominates for large t? Why?`,[`sin x: its exponential decays slowest (rate ${k} vs ${4*k}).`],"sin x",1]]}; }]
};

/* ===== U5 Wave equation ===== */
const U5M={
 w0:{grp:"Step 1",c:NAVY,name:"Bounded or Infinite String?",hint:"domain",when:"u<sub>tt</sub> = c"+sq+"u<sub>xx</sub>.",rule:"Infinite line: d'Alembert. Finite string with fixed ends: separation of variables (Fourier sine series).",ex:[T("Guitar string",["Finite: modes"]),T("Long rope",["d'Alembert"])]},
 wdal:{grp:"Infinite",c:ORG,name:"d'Alembert's Formula",hint:"½[f(x − ct) + f(x + ct)] + …",when:"−∞ &lt; x &lt; ∞, u(x, 0) = f, u<sub>t</sub>(x, 0) = g.",rule:"u = ½[f(x − ct) + f(x + ct)] + (1/(2c))∫<sub>x−ct</sub><sup>x+ct</sup> g(s) ds. Signals travel at speed c both ways (domain of dependence [x − ct, x + ct]).",ex:[T("f = sin x, g = 0",["u = sin x cos(ct)"]),T("f = 0, g = 1",["u = t"])]},
 wmod:{grp:"Finite",c:RED,name:"Normal Modes",hint:"frequencies nπc/L",when:"Fixed ends at 0 and L.",rule:"u = Σ[A<sub>n</sub>cos(nπct/L) + B<sub>n</sub>sin(nπct/L)]sin(nπx/L). Angular frequencies ω<sub>n</sub> = nπc/L; A<sub>n</sub> from f, B<sub>n</sub>(nπc/L) from g.",ex:[T("L = π, c = 2",["ω<sub>n</sub> = 2n"]),T("Fundamental",["n = 1"])]},
 wen:{grp:"Energy",c:PURP,name:"Energy Conservation",hint:"½∫(u<sub>t</sub>"+sq+" + c"+sq+"u<sub>x</sub>"+sq+")",when:"Uniqueness, stability.",rule:"E(t) = ½∫(u<sub>t</sub>"+sq+" + c"+sq+"u<sub>x</sub>"+sq+") dx is constant for fixed or free ends.",ex:[T("No damping",["Energy constant"]),T("Damped u<sub>tt</sub> + bu<sub>t</sub>",["Energy decreases"])]},
 wend:{grp:"Last step",c:GRN,name:"Check Both Initial Conditions",hint:"u and u<sub>t</sub>",when:"Every answer.",rule:"At t = 0, u must equal f and u<sub>t</sub> must equal g.",ex:[T("Check",["u(x, 0) = f ✓, u<sub>t</sub>(x, 0) = g ✓"]),T("Speed",["c = √(tension/density)"])]}
};
const U5={id:"u5",num:5,short:"Wave Equation",name:"Unit 5: The Wave Equation",sub:"d'Alembert's formula, characteristics, normal modes on a string, energy",c:TEAL,
 flow:{M:U5M,label:"Wave equation flowchart",lead:"Infinite line or finite string?",start:"u<sub>tt</sub> = c²u<sub>xx</sub>",top:["w0"],q:"Which setting?",cols:[["Infinite line","",ORG,["wdal"]],["Finite string","",RED,["wmod"]],["Energy","",PURP,["wen"]]],end:"wend"},
 sheet:[[ORG,"d'Alembert",["u = ½[f(x − ct) + f(x + ct)] + (1/(2c))∫g"],""],[RED,"String, fixed ends",["ω<sub>n</sub> = nπc/L","u = Σ(A<sub>n</sub>cos ω<sub>n</sub>t + B<sub>n</sub>sin ω<sub>n</sub>t)sin(nπx/L)"],""],[PURP,"Energy",["E = ½∫(u<sub>t</sub>"+sq+" + c"+sq+"u<sub>x</sub>"+sq+") dx"],""]],
 gen:[
 ()=>{ const c=R(1,5),x=R(-3,3),t=R(1,3); const f=s=>s*s; return P("d'Alembert",`u<sub>tt</sub> = ${c*c}u<sub>xx</sub>, u(x, 0) = x${sq}, u<sub>t</sub>(x, 0) = 0. Find u(${N(x)}, ${t}).`,(f(x-c*t)+f(x+c*t))/2,[x*x,f(x-c*t),(x+c*t)**2].filter(v=>v!==(f(x-c*t)+f(x+c*t))/2),[`½[(x − ${c}t)${sq} + (x + ${c}t)${sq}] = x${sq} + ${c*c}t${sq}`,`<b>${N(x*x+c*c*t*t)}</b>`]); },
 ()=>{ const c=R(1,5),a=R(1,4),t=R(1,3); return P("d'Alembert",`u<sub>tt</sub> = ${c*c}u<sub>xx</sub>, u(x, 0) = 0, u<sub>t</sub>(x, 0) = ${a}. Find u(0, ${t}).`,a*t,[a*c*t,a,a*t*2],[`(1/(2·${c}))∫<sub>−${c*t}</sub><sup>${c*t}</sup> ${a} ds = ${a}·${2*c*t}/${2*c}`,`<b>${a*t}</b>`]); },
 ()=>{ const c=R(1,6),L=pick([1,2,4]),n=R(1,4); const pi=(a,b)=>{ const f=FF(a,b); return f==="1"?"π":f+"π"; }; return PSX("Frequencies",`A string of length ${L} with wave speed ${c} and fixed ends. What is the angular frequency of mode n = ${n}?`,pi(n*c,L),[pi(n*c,2*L),pi(n,L),pi(c,L),pi(2*n*c,L),String(n*c)],[`ω<sub>n</sub> = nπc/L = ${n}π·${c}/${L}`]); },
 ()=>{ const c=R(2,5),x=R(-5,5),t=R(1,3); return PS("Domain of dependence",`For u<sub>tt</sub> = ${c*c}u<sub>xx</sub>, u(${N(x)}, ${t}) depends on the initial data on which interval?`,`[${N(x-c*t)}, ${N(x+c*t)}]`,[`[${N(x-t)}, ${N(x+t)}]`,`[${N(x)}, ${N(x+c*t)}]`,`all of ℝ`],[`[x − ct, x + ct]`]); },
 ()=>{ const c=R(2,4),k=R(1,4); return PS("Standing waves",`Which solves u<sub>tt</sub> = ${c*c}u<sub>xx</sub>?`,`sin(${k}x)cos(${c*k}t)`,[`sin(${k}x)cos(${k}t)`,`sin(${k}x)e<sup>−${c*k}t</sup>`,`sin(${c*k}x)cos(${k}t)`],[`u<sub>tt</sub> = −${c*c*k*k}u, ${c*c}u<sub>xx</sub> = −${c*c*k*k}u ✓`]); }],
 chal:[
 ()=>{ const c=R(1,4); return PSX("Plucked string",`On an infinite string with c = ${c}, an initial bump at x = 0 (released from rest) splits into…`,`two half-height bumps moving left and right at speed ${c}`,[`one bump moving right at speed ${c}`,`a bump that stays at x = 0 and decays`,`two full-height bumps moving at speed ${2*c}`],[`u = ½[f(x − ${c}t) + f(x + ${c}t)]`]); },
 ()=>{ const L=pick([1,2]),c=R(1,4); return PF("Period",`What is the period of the fundamental mode of a string with L = ${L}, c = ${c}?`,2*L,c,[F(L,c),F(2*c,L),N(2*L)],[`ω₁ = πc/L, period 2π/ω₁ = 2L/c`,`<b>${F(2*L,c)}</b>`]); }],
 frq:[()=>{ const c=R(1,3);
  return {t:"Plucked infinite string",calc:false,stem:`u<sub>tt</sub> = ${c*c}u<sub>xx</sub> on ℝ, u(x, 0) = e<sup>−x²</sup>, u<sub>t</sub>(x, 0) = 0.`,parts:[
   [`Write the d'Alembert solution.`,[`u = ½[e<sup>−(x − ${c}t)²</sup> + e<sup>−(x + ${c}t)²</sup>]`],"",2],
   [`Find u(0, 0) and u(${2*c}, 2) (4 decimals).`,[`u(0, 0) = 1`,`u(${2*c}, 2) = ½[e<sup>0</sup> + e<sup>−${(4*c)**2}</sup>] ≈ 0.5`],"1; ≈ 0.5",2],
   [`Describe the solution for large t.`,[`Two bumps of height ½ moving apart at speed ${c}.`],"",2],
   [`Is energy conserved? Explain.`,[`Yes: no damping; E = ½∫(u<sub>t</sub>² + c²u<sub>x</sub>²) dx is constant.`],"Yes",1]]}; }]
};

/* ===== U6 Laplace equation ===== */
const U6M={
 l0:{grp:"Step 1",c:NAVY,name:"Identify the Domain",hint:"rectangle or disk",when:"u<sub>xx</sub> + u<sub>yy</sub> = 0.",rule:"Rectangle: Cartesian separation (sin × sinh). Disk/annulus: polar separation (rⁿcos nθ, rⁿsin nθ).",ex:[T("Plate 0 ≤ x ≤ a, 0 ≤ y ≤ b",["Cartesian"]),T("Disk r ≤ 1",["Polar"])]},
 lrect:{grp:"Rectangle",c:ORG,name:"Rectangle: Separate Variables",hint:"one nonzero side at a time",when:"Dirichlet data on a rectangle.",rule:"Split into problems with one nonzero side. For u(x, b) = f(x), others 0: u = Σc<sub>n</sub>sin(nπx/a)sinh(nπy/a), with c<sub>n</sub>sinh(nπb/a) = sine coefficients of f.",ex:[T("Top side sin(πx), a = b = 1",["u = sin(πx)sinh(πy)/sinh π"]),T("Superpose",["Add the four pieces"])]},
 ldisk:{grp:"Disk",c:RED,name:"Disk: Polar Solutions & Poisson",hint:"rⁿ(a<sub>n</sub>cos nθ + b<sub>n</sub>sin nθ)",when:"u(1, θ) = f(θ).",rule:"u = a₀/2 + Σrⁿ(a<sub>n</sub>cos nθ + b<sub>n</sub>sin nθ) with the Fourier coefficients of f. u at the center = average of f.",ex:[T("u(1, θ) = cos(2θ)",["u = r"+sq+"cos(2θ) = x"+sq+" − y"+sq]),T("Center",["Mean value property"])]},
 lprop:{grp:"Properties",c:PURP,name:"Maximum Principle & Mean Value",hint:"max on the boundary",when:"Bounds, uniqueness.",rule:"Harmonic functions take their max and min on the boundary. u(center) = average over any circle around it. Uniqueness of the Dirichlet problem follows.",ex:[T("Boundary values between 0 and 5",["Inside also between 0 and 5"]),T("Average",["u(center) = mean of boundary"])]},
 lend:{grp:"Last step",c:GRN,name:"Check: Δu = 0",hint:"differentiate",when:"Every answer.",rule:"Verify u<sub>xx</sub> + u<sub>yy</sub> = 0 and the boundary values.",ex:[T("x"+sq+" − y"+sq,["2 − 2 = 0 ✓"]),T("e<sup>x</sup>sin y",["e<sup>x</sup>sin y − e<sup>x</sup>sin y = 0 ✓"])]}
};
const U6={id:"u6",num:6,short:"Laplace Equation",name:"Unit 6: Laplace's Equation",sub:"Harmonic functions, rectangles and disks, mean value property, maximum principle",c:BLU,
 flow:{M:U6M,label:"Laplace equation flowchart",lead:"The shape of the domain picks the separation.",start:"Δu = 0",top:["l0"],q:"Which domain?",cols:[["Rectangle","",ORG,["lrect"]],["Disk","",RED,["ldisk"]],["Properties","",PURP,["lprop"]]],end:"lend"},
 sheet:[[ORG,"Rectangle",["sin(nπx/a)sinh(nπy/a)","One nonzero side at a time"],""],[RED,"Disk",["rⁿcos nθ, rⁿsin nθ","u(0) = average of boundary data"],""],[PURP,"Properties",["Mean value property","Maximum principle","Uniqueness"],""]],
 gen:[
 ()=>{ const S=pick([["x"+sq+" − y"+sq,"Yes"],["x"+sq+" + y"+sq,"No"],["e<sup>x</sup>sin y","Yes"],["xy","Yes"],["x"+cu+" − 3xy"+sq,"Yes"],["x"+cu+" + y"+cu,"No"],["ln(x"+sq+" + y"+sq+")","Yes"],["sin x sin y","No"]]); return PSX("Harmonic?",`Is u = ${S[0]} harmonic?`,S[1],[S[1]==="Yes"?"No":"Yes","Only for x &gt; 0","Only on the unit disk"],[`Compute u<sub>xx</sub> + u<sub>yy</sub>`,`<b>${S[1]}</b>`]); },
 ()=>{ const a=R(-5,5),b=nz(-5,5),n=R(1,4); return P("Mean value property",`u is harmonic in the unit disk with u(1, θ) = ${N(a)}${sg(b)} cos(${n===1?"":n}θ). Find u at the center.`,a,[a+b,b,0].filter(x=>x!==a),[`u(0) = average of the boundary values`,`cos averages to 0: <b>${N(a)}</b>`]); },
 ()=>{ const n=R(1,4),r=pick([0.5,0.2,0.1]),b=pick([-5,-4,-3,-2,2,3,4,5,6]); return P("Disk",`u(1, θ) = ${N(b)} sin(${n===1?"":n}θ). Find u at r = ${r}, θ = π/${2*n} (3 decimals).`,r3(b*r**n),[r3(b*r),b,r3(b*r**(n+1))],[`u = ${N(b)}r${n>1?`<sup>${n}</sup>`:""}sin(${n===1?"":n}θ)`,`${N(b)}(${r})${n>1?`<sup>${n}</sup>`:""}·1 = <b>${r3(b*r**n)}</b>`],{tol:.002}); },
 ()=>{ const lo=R(-5,5),hi=lo+R(1,10); return PSX("Maximum principle",`u is harmonic in a bounded region and ${N(lo)} ≤ u ≤ ${N(hi)} on the boundary. Inside, u lies in…`,`[${N(lo)}, ${N(hi)}]`,[`[${N(lo-1)}, ${N(hi+1)}]`,`(−∞, ${N(hi)}]`,`It can be anything`],[`Max and min are attained on the boundary`]); },
 ()=>{ const n=R(2,3); return PSX("Polar ↔ Cartesian",`What is r${sq}cos(2θ) in Cartesian coordinates?`,"x"+sq+" − y"+sq,["x"+sq+" + y"+sq,"2xy","x"+sq],[`cos 2θ = cos${sq}θ − sin${sq}θ`]); }],
 chal:[
 ()=>{ const a=R(1,3); return P("Rectangle",`On 0 ≤ x, y ≤ 1, u = 0 on three sides and u(x, 1) = sin(πx). Find u(½, ½) (3 decimals).`,r3(Math.sinh(Math.PI/2)/Math.sinh(Math.PI)),[0.5,r3(1/Math.sinh(Math.PI)),r3(Math.sinh(Math.PI/2))],[`u = sin(πx)sinh(πy)/sinh π`,`sinh(π/2)/sinh π ≈ <b>${r3(Math.sinh(Math.PI/2)/Math.sinh(Math.PI))}</b>`],{tol:.002}); },
 ()=>{ return PSX("Annulus",`Radial harmonic functions u(r) in the plane have the form…`,"A + B ln r",["A + B/r","A + Br"+sq,"Ae<sup>r</sup>"],[`u″ + u′/r = 0 ⇒ (ru′)′ = 0 ⇒ u = A + B ln r`]); }],
 frq:[()=>{ const b=nz(-4,4),c=nz(-4,4);
  return {t:"Dirichlet problem on the disk",calc:false,stem:`Solve Δu = 0 in the unit disk with u(1, θ) = 3${sg(b)} cos θ${sg(c)} sin(2θ).`,parts:[
   [`Write the general bounded solution in polar coordinates.`,[`u = a₀/2 + Σrⁿ(a<sub>n</sub>cos nθ + b<sub>n</sub>sin nθ)`],"",1],
   [`Match the boundary data.`,[`u = 3${sg(b)}r cos θ${sg(c)}r${sq}sin(2θ)`],"",2],
   [`Write u in x and y.`,[`r cos θ = x, r${sq}sin 2θ = 2xy`,`u = 3${sg(b)}x${sg(2*c)}xy`],`3${sg(b)}x${sg(2*c)}xy`,2],
   [`Find u(0, 0) and the maximum of u on the closed disk.`,[`Center: 3 (mean value). The maximum is on the boundary circle (maximum principle).`],"u(0, 0) = 3",2]]}; }]
};

const units=[U1,U2,U3,U4,U5,U6];
const wrap=g=>()=>{ for(let i=0;i<20;i++){ const p=g(); if(p) return p; } return g(); };
units.forEach(u=>{ ["gen","chal","frq","med","adv"].forEach(k=>u[k]=(u[k]||[]).map(wrap)); });
units.push({id:"review",num:7,label:"Final review",short:"Final Review",name:"Final Review: Mixed Practice",sub:"Mixed questions and free response from every unit, like a final exam. New each time.",c:"#111",
  sheet:units.map(u=>[u.c,u.short,u.sheet[0][2],""]),gen:units.flatMap(u=>u.gen),chal:units.flatMap(u=>u.chal),med:units.flatMap(u=>u.med||[]),adv:units.flatMap(u=>u.adv||[]),frq:units.flatMap(u=>u.frq)});
units.push({id:"exams",num:0,label:"University exams",short:"University Exams",name:"Real University Exams with Solutions",sub:"Free exams and solutions from MIT 18.303 Linear Partial Differential Equations (MIT OpenCourseWare), matched to the units of this book",c:"#7a5a12",gen:[],chal:[],frq:[],sheet:[["#1d4e89", "MIT 18.303, Fall 2006 (OpenCourseWare)", ["<a href=\"https://ocw.mit.edu/courses/18-303-linear-partial-differential-equations-fall-2006/pages/exams\" target=\"_blank\" rel=\"noopener\">All tests, practice tests and solutions</a>"], "Tests 1–2 and final exam prep, each with full solutions."]]});

window.ZC={units,strands:[["Foundations",NAVY,["u1","u2","u3"]],["The big three",PURP,["u4","u5","u6"]],["Exam prep","#111",["review","exams"]]],mapNote:"An introductory PDE course in order.",frqLead:"Free-response questions in university exam format."};
})();
