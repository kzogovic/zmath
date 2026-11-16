/* Algebra 1 for BZ, part 3: EOC prep folder. New EOC topics (functions, compound interest and exponentials,
   absolute value, compound inequalities, sequences, statistics), a reference sheet, and a full-length practice EOC. */
(function(){
const {R,pick,nz,gcd,N,F,X,sg,poly,P,PF,PS}=window.ZH;
const FR=(n,d)=>`<span class="frc"><span>${n}</span><span>${d}</span></span>`;
const NAVY="#1d4e89",ORG="#c2571a",RED="#c23a52",PURP="#6a3d9a",TEAL="#0f7a6c",GRN="#137333",GOLD="#9a6b00";
const T=(...r)=>r;
const PSX=(t,q,a,w,s)=>{ let ww=[...new Set(w)].filter(x=>x!==a); if(ww.length<3) ww=ww.concat(["None of these","No solution","All real numbers"]).filter(x=>x!==a); return PS(t,q,a,ww.slice(0,3),s); };
const ty=(q,a,show,wt)=>`<div class="ty" data-a="${a}"${show?` data-show="${show}"`:""}${wt?` data-wt="${wt}"`:""}><span class="tq">${q}</span><input type="text" inputmode="text" autocomplete="off" aria-label="Your answer"><button type="button" class="ty-b">Check</button><button type="button" class="ty-s">Show</button><span class="ty-m"></span></div>`;
const PL=S=>window.A2PLOT?A2PLOT.plot(S):"";
const we=(q,steps,wt,g)=>`<div class="we"${wt?` data-wt="${wt}"`:""}><b class="q">${q}</b><ol>${steps.map(s=>`<li>${s}</li>`).join("")}</ol>${g?PL(g):""}<div class="clr"></div></div>`;
const wg=(p,g)=>{ if(p) p.g=g; return p; };
const pt=(x,y)=>`(${N(x)}, ${N(y)})`;
const money=v=>"$"+v.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
const r2=v=>Math.round(v*100)/100;
const tbl=(h,rows)=>`<table class="eoc-t"><tr>${h.map(x=>`<th>${x}</th>`).join("")}</tr>${rows.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join("")}</tr>`).join("")}</table>`;
const xyTbl=(xs,ys)=>`<table class="eoc-t"><tr><th>x</th>${xs.map(x=>`<td>${N(x)}</td>`).join("")}</tr><tr><th>y</th>${ys.map(y=>`<td>${N(y)}</td>`).join("")}</tr></table>`;
if(!document.getElementById("eoccss")){ const st=document.createElement("style"); st.id="eoccss"; st.textContent=`table.eoc-t{border-collapse:collapse;margin:6px 0;font-size:16px}table.eoc-t th,table.eoc-t td{border:1px solid #999;padding:3px 9px;text-align:center}table.eoc-t th{background:#f3f0e6}`; document.head.appendChild(st); }
const nl1=(lo,hi,cl1,cl2)=>({nl:true,xi:[[lo,hi,cl1,cl2]],kx:[(isFinite(lo)?lo:hi)-3,(isFinite(hi)?hi:lo)+3]});

const ME={
 f0:{grp:"Read it",c:NAVY,name:"Functions",hint:"one output per input",when:"Function notation, tables, domain and range.",rule:"A function gives exactly one y for each x. f(3) means: put 3 in for x. Domain = all x-values, range = all y-values.",ex:[T("f(x) = 2x − 5, find f(4)",["2(4) − 5","<b>3</b>"])]},
 f1:{grp:"Linear",c:ORG,name:"Linear Models",hint:"constant rate of change",when:"Equal steps in x give equal steps in y.",rule:"Rate of change = Δy/Δx. Write y = mx + b, then use it to predict.",ex:[T("x: 0, 2, 4; y: 5, 11, 17",["Δy/Δx = 6/2 = 3, b = 5","<b>y = 3x + 5</b>"])]},
 f2:{grp:"Exponential",c:RED,name:"Exponential & Compound Interest",hint:"A = P(1 + r/n)<sup>nt</sup>",when:"Equal steps in x MULTIPLY y by the same factor; money that earns interest on interest.",rule:"y = a·b<sup>x</sup>: b &gt; 1 growth, 0 &lt; b &lt; 1 decay. Growth by r%: b = 1 + r. Decay: b = 1 − r. Compound interest: A = P(1 + r/n)<sup>nt</sup>.",ex:[T("$1,000 at 5% compounded yearly, 3 years",["1000(1.05)<sup>3</sup>","<b>$1,157.63</b>"])]},
 f3:{grp:"Special",c:PURP,name:"Absolute Value & Compound",hint:"two cases · and / or",when:"|…| or two inequality signs.",rule:"|u| = b: u = b or u = −b. |u| &lt; b: −b &lt; u &lt; b (and). |u| &gt; b: u &lt; −b or u &gt; b (or).",ex:[T("|x − 2| = 5",["x − 2 = 5 or x − 2 = −5","<b>x = 7 or x = −3</b>"])]},
 f4:{grp:"Patterns",c:TEAL,name:"Sequences",hint:"add d · multiply r",when:"A list of numbers with a pattern.",rule:"Arithmetic: aₙ = a₁ + (n − 1)d. Geometric: aₙ = a₁·r<sup>n−1</sup>.",ex:[T("3, 7, 11, … 20th term",["d = 4: 3 + 19·4","<b>79</b>"])]},
 f5:{grp:"Data",c:GRN,name:"Statistics",hint:"center, spread, tables, fit",when:"Data sets, two-way tables, scatter plots.",rule:"Mean = sum ÷ count; median = middle. Relative frequency = part ÷ total. Line of best fit: use it to predict; r near ±1 = strong.",ex:[T("Mean of 4, 8, 9",["21 ÷ 3","<b>7</b>"])]}};

const EOC={id:"eoc",label:"EOC prep",short:"EOC Prep",name:"Get Ready for the End-of-Course Exam",sub:"Everything for the Algebra 1 EOC in one folder: functions, compound interest and exponential models, absolute value and compound inequalities, sequences, statistics, a reference sheet, flashcards and a full-length practice EOC",c:GOLD,
 secLabel:{test:["Practice EOC","30 questions, all units"],quiz:["Mixed review","EOC topics + earlier units"]},
 mock:30,
 flow:{M:ME,label:"EOC topics flowchart",lead:"The EOC mixes everything. First decide what kind of problem it is.",start:"Read the question",top:["f0"],q:"What kind of relationship?",cols:[["Adds the same amount","",ORG,["f1"]],["Multiplies by the same factor","",RED,["f2"]],["|…| or two signs","",PURP,["f3"]],["A list / pattern","",TEAL,["f4"]]],end:"f5"},
 sheet:[[NAVY,"Functions",["one y for each x","f(a): replace x with a","domain: x-values · range: y-values"],""],[ORG,"Linear",["m = (y₂ − y₁)/(x₂ − x₁)","y = mx + b","rate of change is constant"],""],[RED,"Exponential",["y = a·b<sup>x</sup>","growth: b = 1 + r · decay: b = 1 − r","A = P(1 + r/n)<sup>nt</sup>","simple interest: I = Prt"],""],[PURP,"Absolute value",["|u| = b → u = ±b","|u| &lt; b → −b &lt; u &lt; b","|u| &gt; b → u &lt; −b or u &gt; b"],""],[TEAL,"Sequences",["aₙ = a₁ + (n − 1)d","aₙ = a₁·r<sup>n−1</sup>"],""],[GRN,"Statistics",["mean = sum ÷ count","median = middle value","relative frequency = part ÷ total"],""],["#111","Quadratics",["x = −b/(2a)","x = (−b ± √(b<sup>2</sup> − 4ac))/(2a)"],""]],
 cards:[["What does “compounded monthly” make n?","n = 12 (quarterly: 4, semiannually: 2, daily: 365)"],["Linear or exponential? x: 0, 1, 2, 3 · y: 3, 6, 12, 24","Exponential: y doubles each step (multiply by 2). y = 3·2<sup>x</sup>"],["A car loses 15% of its value each year. What is b?","b = 1 − 0.15 = 0.85 (decay)"],["|x| = −4","No solution: an absolute value is never negative."],["What is the difference between “and” and “or”?","and: both true, one piece in the middle. or: either true, two pieces going outward."]],
 learn:`<div class="big"><b>What is the EOC?</b> The End-of-Course exam covers all of Algebra 1. In Florida (B.E.S.T. Algebra 1 EOC) it has 45–50 questions in one 160-minute session, split about evenly into three areas: <b>expressions, functions and data analysis</b>, <b>linear relationships</b> and <b>non-linear relationships</b>. A score of 400 passes. Other states' Algebra 1 tests cover the same big ideas.</div>
<h4>How to use this folder</h4><p>1. Read this lesson: it teaches the EOC topics that are <b>not</b> in Units 0–13. 2. Do Easy, Medium and Advanced practice. 3. Take the <b>Practice EOC</b> (30 questions from every unit). 4. Go back to any unit where you missed questions.</p>
<h4>Functions</h4><p>A function gives exactly <b>one</b> output for each input. If an x repeats with a different y, it is <b>not</b> a function.</p>
${we("Is {(1, 4), (2, 5), (1, 6)} a function?",["x = 1 has two outputs, 4 and 6.","<b>Not a function</b>"],"Is it a function?")}
${we("f(x) = 3x<sup>2</sup> − 2. Find f(−2).",["3(−2)<sup>2</sup> − 2 = 12 − 2","<b>10</b>"],"Function notation")}
${ty("f(x) = 5 − 2x. f(3) = ?","-1","−1","Function notation")}
<h4>Compound interest</h4><p>A = P(1 + r/n)<sup>nt</sup>: P is the starting amount, r the yearly rate as a decimal, n how many times per year it compounds, t years.</p>
${we("$2,000 at 6% compounded monthly for 5 years",["r = 0.06, n = 12, t = 5.","A = 2000(1 + 0.06/12)<sup>60</sup> = 2000(1.005)<sup>60</sup>","<b>$2,697.70</b>"],"Compound interest")}
${we("$500 at 4% compounded yearly for 3 years",["A = 500(1.04)<sup>3</sup>","<b>$562.43</b>"],"Compound interest")}
${ty("$1,000 at 10% compounded yearly for 2 years. A = ?","1210","$1,210.00","Compound interest")}
<h4>Exponential growth and decay</h4><p>y = a·b<sup>x</sup>. Growing by 8% per year: b = 1.08. Losing 20% per year: b = 0.80.</p>
${we("A town of 5,000 grows 3% per year. Population after 4 years?",["5000(1.03)<sup>4</sup>","≈ <b>5,628</b>"],"Exponential growth and decay",{f:[x=>5000*1.03**x],p:[[4,5000*1.03**4,"(4, 5628)"]],xr:[0,10],yr:[0,7500]})}
${we("Linear or exponential? x: 0, 1, 2, 3 · y: 2, 6, 18, 54",["Each step multiplies by 3.","<b>Exponential</b>: y = 2·3<sup>x</sup>"],"Linear or exponential?")}
<h4>Absolute value</h4>${we("|2x − 1| = 7",["2x − 1 = 7 or 2x − 1 = −7","<b>x = 4 or x = −3</b>"],"Absolute value equations",{nl:true,p:[[-3,0,"−3"],[4,0,"4"]],kx:[-6,7]})}
${we("|x − 3| ≤ 2",["−2 ≤ x − 3 ≤ 2","<b>1 ≤ x ≤ 5</b>"],"Absolute value inequalities",nl1(1,5,true,true))}
<h4>Compound inequalities</h4>${we("−4 &lt; 2x + 2 ≤ 10",["Subtract 2: −6 &lt; 2x ≤ 8.","<b>−3 &lt; x ≤ 4</b>"],"Compound inequalities",nl1(-3,4,false,true))}
<h4>Sequences</h4>${we("5, 8, 11, 14, … Find the 30th term.",["d = 3: a<sub>30</sub> = 5 + 29·3","<b>92</b>"],"Arithmetic sequences")}${we("2, 6, 18, … Find the 6th term.",["r = 3: 2·3<sup>5</sup>","<b>486</b>"],"Geometric sequences")}
<h4>Statistics</h4>${we("Data: 3, 7, 7, 10, 13. Mean and median?",["Mean: 40 ÷ 5 = 8.","Median: middle value <b>7</b>."],"Mean and median")}
${tbl(["","Likes math","Doesn't","Total"],[["9th grade","18","12","30"],["10th grade","14","6","20"],["Total","32","18","50"]])}
${we("From the table: what fraction of 10th graders like math?",["Part ÷ total of the row: 14 ÷ 20","<b>7/10 = 70%</b>"],"Two-way tables")}`,
 gen:[
 ()=>{ const xs=[R(-4,0),R(1,3),R(4,6)], f=pick([true,false]); const ys=xs.map(()=>R(-6,9)); const pts=xs.map((x,i)=>pt(x,ys[i])); if(!f) pts.push(pt(xs[1],ys[1]+nz(1,4))); const s=pts.sort(()=>Math.random()-.5);
   return PSX("Is it a function?",`Is the relation {${s.join(", ")}} a function?`,f?"Yes":"No",[f?"No":"Yes","Only if x &gt; 0","Cannot tell"],[f?"Every x-value appears once.":`x = ${N(xs[1])} has two different outputs.`,`<b>${f?"Yes":"No"}</b>`]); },
 ()=>{ const a=nz(-4,4),b=R(-9,9),c=R(-5,5),sq=pick([true,false]); const v=sq?a*c*c+b:a*c+b; return P("Function notation",`f(x) = ${sq?poly([a,0,b]):poly([a,b])}. Find f(${N(c)}).`,v,[sq?a*c+b:a*c*c+b,-v,v+1],[`Replace x with ${c<0?`(${N(c)})`:N(c)}.`,`<b>${N(v)}</b>`]); },
 ()=>{ const Pr=pick([500,800,1000,1500,2000,2500,5000]),r=pick([2,3,4,5,6,8]),t=R(2,6); const A=r2(Pr*(1+r/100)**t); return P("Compound interest",`$${Pr.toLocaleString()} is invested at ${r}% interest compounded yearly. How much is in the account after ${t} years? (Round to the cent.)`,A,[r2(Pr*(1+r*t/100)),r2(Pr*(1+r/100)**(t-1)),r2(Pr*(1+r/100)**(t+1))].map(money),[`A = P(1 + r)<sup>t</sup> = ${Pr}(1 + ${r/100})<sup>${t}</sup>`,`= ${Pr}(${N(1+r/100)})<sup>${t}</sup>`,`<b>${money(A)}</b>`],{a:money(A),tol:0.011}); },
 ()=>{ const a=pick([2,3,5,10,100]),b=pick([2,3,0.5,1.5]),x=R(0,4); const v=r2(a*b**x); return P("Exponential growth and decay",`f(x) = ${a}·(${b})<sup>x</sup>. Find f(${x}).`,v,[a*b*x,r2((a*b)**x),r2(a*b**(x+1))],[`${b}<sup>${x}</sup> = ${N(r2(b**x))}`,`${a}·${N(r2(b**x))} = <b>${N(v)}</b>`],{tol:0.011}); },
 ()=>{ const a=R(-6,6),b=R(1,9); return wg(PSX("Absolute value equations",`Solve |x${sg(-a)}| = ${b}.`.replace("x + 0","x").replace("x − 0","x"),`x = ${N(a-b)} or x = ${N(a+b)}`,[`x = ${N(-a-b)} or x = ${N(-a+b)}`,`x = ${N(a+b)} only`,`${N(a-b)} &lt; x &lt; ${N(a+b)}`],[`x${sg(-a)} = ${b} or x${sg(-a)} = −${b}`.replace(/x [+−] 0/g,"x"),`<b>x = ${N(a+b)} or x = ${N(a-b)}</b>`]),{nl:true,p:[[a-b,0,N(a-b)],[a+b,0,N(a+b)]],kx:[a-b-2,a+b+2]}); },
 ()=>{ const a=R(1,9),d=nz(-6,8),n=R(8,40); return P("Arithmetic sequences",`${a}, ${N(a+d)}, ${N(a+2*d)}, ${N(a+3*d)}, … What is term number ${n}?`,a+(n-1)*d,[a+n*d,n*d,a+(n-2)*d],[`d = ${N(d)}.`,`a<sub>${n}</sub> = ${a} + (${n} − 1)(${N(d)})`,`<b>${N(a+(n-1)*d)}</b>`]); },
 ()=>{ const k=R(5,8); const d=Array.from({length:k},()=>R(1,20)); const m=d.reduce((s,x)=>s+x,0)/k; return P("Mean and median",`Find the mean of ${d.join(", ")}.`,r2(m),[[...d].sort((x,y)=>x-y)[Math.floor(k/2)],Math.max(...d)-Math.min(...d),r2(m+1)],[`Sum = ${d.reduce((s,x)=>s+x,0)}.`,`÷ ${k} = <b>${N(r2(m))}</b>`],{tol:0.011}); }],
 med:[
 ()=>{ const Pr=pick([1000,2000,2500,4000,5000]),r=pick([3,4,5,6]),n=pick([2,4,12]),t=R(2,8); const A=r2(Pr*(1+r/100/n)**(n*t)); const nm={2:"semiannually",4:"quarterly",12:"monthly"}[n]; return P("Compound interest",`$${Pr.toLocaleString()} is invested at ${r}% compounded ${nm} for ${t} years. Find the amount. (Round to the cent.)`,A,[r2(Pr*(1+r/100)**t),r2(Pr*(1+r*t/100)),r2(Pr*(1+r/100/n)**t)].map(money),[`n = ${n}: A = ${Pr}(1 + ${r/100}/${n})<sup>${n}·${t}</sup>`,`= ${Pr}(${N(+(1+r/100/n).toFixed(6))})<sup>${n*t}</sup>`,`<b>${money(A)}</b>`],{a:money(A),tol:0.011}); },
 ()=>{ const g=pick([true,false]),r=pick([3,5,8,10,12,15,20,25]),a=pick([1200,5000,20000,800]); const b=g?1+r/100:1-r/100; return PSX("Exponential growth and decay",`y = ${a.toLocaleString()}(${N(b)})<sup>t</sup>. Is this growth or decay, and by what percent per year?`,`${g?"Growth":"Decay"} of ${r}%`,[`${g?"Decay":"Growth"} of ${r}%`,`${g?"Growth":"Decay"} of ${N(b*100)}%`,`${g?"Growth":"Decay"} of ${N(+(r/10).toFixed(2))}%`],[`b = ${N(b)} is ${g?"more":"less"} than 1: ${g?"growth":"decay"}.`,`${g?`b − 1 = ${N(r/100)}`:`1 − b = ${N(r/100)}`} = ${r}%.`,`<b>${g?"Growth":"Decay"} of ${r}%</b>`]); },
 ()=>{ const lin=pick([true,false]),a=R(2,5),k=lin?R(2,6):pick([2,3]); const xs=[0,1,2,3],ys=xs.map(x=>lin?a+k*x:a*k**x); return PSX("Linear or exponential?",`${xyTbl(xs,ys)}Which model fits the table?`,lin?`Linear: y = ${k}x + ${a}`:`Exponential: y = ${a}·${k}<sup>x</sup>`,lin?[`Exponential: y = ${a}·${k}<sup>x</sup>`,`Linear: y = ${a}x + ${k}`,`Exponential: y = ${k}·${a}<sup>x</sup>`]:[`Linear: y = ${k}x + ${a}`,`Linear: y = ${a*k-a}x + ${a}`,`Exponential: y = ${k}·${a}<sup>x</sup>`],[lin?`y goes up by ${k} each step: constant difference.`:`y is multiplied by ${k} each step: constant ratio.`,`Start (x = 0): ${a}.`]); },
 ()=>{ const a=R(2,5),b=R(-6,6),lo=R(-5,0),hi=lo+R(2,6); const o=pick(["and","or"]); if(o==="and") return wg(PSX("Compound inequalities",`Solve ${N(a*lo+b)} ≤ ${a}x${sg(b)} &lt; ${N(a*hi+b)}.`.replace(/x [+−] 0/,"x"),`${N(lo)} ≤ x &lt; ${N(hi)}`,[`${N(lo)} &lt; x ≤ ${N(hi)}`,`x ≤ ${N(lo)} or x &gt; ${N(hi)}`,`${N(lo+1)} ≤ x &lt; ${N(hi+1)}`],[`${b>=0?"Subtract":"Add"} ${Math.abs(b)} in all three parts, then divide by ${a}.`,`<b>${N(lo)} ≤ x &lt; ${N(hi)}</b>`]),nl1(lo,hi,true,false));
   return wg(PSX("Compound inequalities",`Solve ${a}x &lt; ${N(a*lo)} or x${sg(b)} ≥ ${N(hi+b)}.`.replace(/x [+−] 0 /,"x "),`x &lt; ${N(lo)} or x ≥ ${N(hi)}`,[`${N(lo)} &lt; x ≤ ${N(hi)}`,`x &gt; ${N(lo)} or x ≤ ${N(hi)}`,`x &lt; ${N(a*lo)} or x ≥ ${N(hi)}`],[`First: x &lt; ${N(lo)}. Second: x ≥ ${N(hi)}.`,`“Or”: keep both pieces.`]),{nl:true,xi:[[-Infinity,lo,false,false],[hi,Infinity,true,false]],kx:[lo-3,hi+3]}); },
 ()=>{ const a=pick([2,3,4,5,-2]),r=pick([2,3,-2]),n=R(4,7); return P("Geometric sequences",`${a}, ${N(a*r)}, ${N(a*r*r)}, … What is term number ${n}?`,a*r**(n-1),[a*r**n,a*(n-1)*r,a+r*(n-1)],[`r = ${N(r)}.`,`a<sub>${n}</sub> = ${a}·(${N(r)})<sup>${n-1}</sup>`,`<b>${N(a*r**(n-1))}</b>`]); },
 ()=>{ const A=R(8,25),B=R(5,20),C=R(6,22),D=R(4,18); const row=pick([0,1]); const part=row?C:A, tot=row?C+D:A+B; return PF("Two-way tables",`${tbl(["","Plays sport","No sport","Total"],[["Grade 9",A,B,A+B],["Grade 10",C,D,C+D],["Total",A+C,B+D,A+B+C+D]])}What fraction of grade ${row?10:9} students play a sport?`,part,tot,[F(part,A+B+C+D),F(part,A+C),F(row?D:B,tot)],[`Use the grade ${row?10:9} row: part ÷ row total.`,`${part} ÷ ${tot} = <b>${F(part,tot)}</b>`]); },
 ()=>{ const xs=[R(0,3),R(4,6),R(7,9)],m=nz(-4,5),b=R(-5,9); const ys=xs.map(x=>m*x+b); return P("Rate of change",`${xyTbl(xs,ys)}What is the rate of change?`,m,[-m,b,ys[1]-ys[0]],[`(${N(ys[1])} − ${ys[0]<0?`(${N(ys[0])})`:N(ys[0])})/(${xs[1]} − ${xs[0]}) = ${N(ys[1]-ys[0])}/${xs[1]-xs[0]}`,`<b>${N(m)}</b>`]); }],
 adv:[
 ()=>{ const Pr=pick([1000,2500,4000]),r=pick([4,5,6]),t=R(3,10); const c=r2(Pr*(1+r/100)**t),si=r2(Pr*(1+r*t/100)); return P("Compound interest",`$${Pr.toLocaleString()} earns ${r}% per year for ${t} years. How many more dollars does compounding yearly earn than simple interest? (Round to the cent.)`,r2(c-si),[c,si,r2(c-Pr)].map(money),[`Compound: ${Pr}(1.${String(r).padStart(2,"0")})<sup>${t}</sup> = ${money(c)}.`,`Simple: ${Pr}(1 + ${r/100}·${t}) = ${money(si)}.`,`Difference: <b>${money(r2(c-si))}</b>`],{a:money(r2(c-si)),tol:0.021}); },
 ()=>{ const a=pick([12000,18000,25000,30000]),r=pick([10,12,15,20]),t=R(2,6); const v=Math.round(a*(1-r/100)**t); return wg(P("Exponential growth and decay",`A car worth $${a.toLocaleString()} loses ${r}% of its value each year. What is it worth after ${t} years, to the nearest dollar?`,v,[Math.round(a*(1-r*t/100)),Math.round(a*(1-r/100)**(t-1)),Math.round(a*(1+r/100)**t)].map(v=>"$"+v.toLocaleString()),[`b = 1 − ${r/100} = ${N(1-r/100)}.`,`${a.toLocaleString()}(${N(1-r/100)})<sup>${t}</sup>`,`≈ <b>$${v.toLocaleString()}</b>`],{tol:1.01,a:"$"+v.toLocaleString()}),{f:[x=>a*(1-r/100)**x],p:[[t,v,`(${t}, ${v})`]],xr:[0,8],yr:[0,a*1.1]}); },
 ()=>{ const a=R(-5,5),b=R(1,8),o=pick(["&lt;","≥"]); const lt=o==="&lt;"; return wg(PSX("Absolute value inequalities",`Solve |x${sg(-a)}| ${o} ${b}.`.replace(/x [+−] 0\|/,"x|"),lt?`${N(a-b)} &lt; x &lt; ${N(a+b)}`:`x ≤ ${N(a-b)} or x ≥ ${N(a+b)}`,lt?[`x &lt; ${N(a-b)} or x &gt; ${N(a+b)}`,`${N(-a-b)} &lt; x &lt; ${N(-a+b)}`,`${N(a-b)} ≤ x ≤ ${N(a+b)}`]:[`${N(a-b)} ≤ x ≤ ${N(a+b)}`,`x ≤ ${N(-a-b)} or x ≥ ${N(-a+b)}`,`x &lt; ${N(a-b)} or x &gt; ${N(a+b)}`],[lt?`“Less than”: −${b} &lt; x${sg(-a)} &lt; ${b} (and).`:`“Greater than”: x${sg(-a)} ≤ −${b} or x${sg(-a)} ≥ ${b} (or).`,`<b>${lt?`${N(a-b)} &lt; x &lt; ${N(a+b)}`:`x ≤ ${N(a-b)} or x ≥ ${N(a+b)}`}</b>`]),lt?nl1(a-b,a+b,false,false):{nl:true,xi:[[-Infinity,a-b,false,true],[a+b,Infinity,true,false]],kx:[a-b-3,a+b+3]}); },
 ()=>{ const m=pick([1.5,2,2.5,3.2,4]),b=pick([10,12,20,35]),x=R(8,20); return P("Line of best fit",`The line of best fit for hours studied (x) and test score (y) is y = ${m}x + ${b}. Predict the score for ${x} hours.`,r2(m*x+b),[r2(m+b*x),r2(m*x),r2(m*(x+1)+b)],[`y = ${m}(${x}) + ${b}`,`= ${N(r2(m*x))} + ${b} = <b>${N(r2(m*x+b))}</b>`],{tol:0.011}); },
 ()=>{ const r=pick([0.93,-0.88,0.12,-0.05,0.67,-0.71]); const s=Math.abs(r)>=0.8?"strong":Math.abs(r)>=0.5?"moderate":"weak or no"; const ans=`${s[0].toUpperCase()+s.slice(1)} ${r>0?"positive":"negative"} correlation`.replace("Weak or no positive correlation","Weak or no correlation").replace("Weak or no negative correlation","Weak or no correlation"); return PSX("Correlation",`A scatter plot has correlation coefficient r = ${N(r)}. Which describes it?`,ans,["Strong positive correlation","Strong negative correlation","Moderate positive correlation","Moderate negative correlation","Weak or no correlation"],[`The sign gives the direction; the size (closer to 1) gives the strength.`,`<b>${ans}</b>`]); },
 ()=>{ const a1=R(2,9),d=R(2,7),n=R(10,30); const S=n*(2*a1+(n-1)*d)/2; return P("Arithmetic sequences",`Seats in a theater: ${a1} in row 1, ${a1+d} in row 2, ${a1+2*d} in row 3, and so on. How many seats are in row ${n}?`,a1+(n-1)*d,[a1+n*d,S,n*d],[`Arithmetic, d = ${d}.`,`${a1} + (${n} − 1)(${d})`,`<b>${a1+(n-1)*d}</b>`]); },
 ()=>{ const k=R(5,7); const d=Array.from({length:k},()=>R(2,15)); const o=R(40,80); const m1=d.reduce((s,x)=>s+x,0)/k,m2=(d.reduce((s,x)=>s+x,0)+o)/(k+1); return P("Mean and median",`Data: ${d.join(", ")}. A new value ${o} is added. By how much does the mean increase? (Round to the hundredth.)`,r2(m2-m1),[r2(m2),r2(o/(k+1)),r2(o-m1)],[`Old mean: ${N(r2(m1))}.`,`New mean: ${N(r2(m2))}.`,`Increase: <b>${N(r2(m2-m1))}</b> (outliers pull the mean, not the median).`],{tol:0.011}); }]};

/* ---- open-response problems (EOC style: no choices, several parts) ---- */
const lin=(m,b,v="x")=>`${m===1?"":m===-1?"−":N(m)}${v}${b?sg(b):""}`;
EOC.open=[
 ()=>{ const f=pick([15,20,25,30,40]),m=pick([12,15,18,22,35]),n=R(4,12),C=f+m*R(8,20); const k=(C-f)/m; return {t:"Linear model",stem:`A gym charges a $${f} sign-up fee plus $${m} per month.`,g:{f:[x=>f+m*x],xr:[0,Math.max(k,n)+3],yr:[0,f+m*(Math.max(k,n)+3)]},parts:[
  {q:"Write an equation for the total cost y after x months.",k:"expr",f:x=>f+m*x,a:`y = ${m}x + ${f}`,s:[`Fixed part: ${f}. Rate: ${m} per month.`,`y = ${m}x + ${f}`]},
  {q:`What is the total cost after ${n} months? (dollars)`,k:"num",v:f+m*n,a:`$${f+m*n}`,s:[`${m}(${n}) + ${f} = ${f+m*n}`]},
  {q:`After how many months is the total cost $${C}?`,k:"num",v:k,a:N(k),s:[`${m}x + ${f} = ${C}`,`${m}x = ${C-f}`,`x = ${N(k)}`]}]}; },
 ()=>{ const Pr=pick([500,1000,2000,2500]),r=pick([3,4,5,6,8]),t=R(3,10); const b=1+r/100,A=Math.round(Pr*b**t*100)/100; return {t:"Compound interest",stem:`$${Pr.toLocaleString()} is put in an account that earns ${r}% interest compounded yearly.`,parts:[
  {q:"What is the growth factor b (as a decimal)?",k:"num",v:b,a:N(b),s:[`b = 1 + ${r/100} = ${N(b)}`]},
  {q:"Write a function for the amount A after t years.",k:"expr",f:x=>Pr*b**x,a:`A = ${Pr}(${N(b)})<sup>t</sup>`,s:[`A = P·b<sup>t</sup>`,`A = ${Pr}(${N(b)})<sup>t</sup>`]},
  {q:`How much money is in the account after ${t} years? Round to the cent.`,k:"num",v:A,tol:0.011,a:money(A),s:[`${Pr}(${N(b)})<sup>${t}</sup> = ${money(A)}`]}]}; },
 ()=>{ const pa=pick([7,8,9,10,12]),pc=pick([3,4,5]),a=R(5,30),c=R(5,30); return {t:"System of equations",stem:`A school sold adult tickets for $${pa} and student tickets for $${pc}. They sold ${a+c} tickets and collected $${pa*a+pc*c}. Let a = adult tickets and s = student tickets.`,parts:[
  {q:"Write the equation for the number of tickets in the form s = …, using a.",k:"expr",f:x=>a+c-x,a:`s = ${a+c} − a`,s:[`a + s = ${a+c}`,`s = ${a+c} − a`]},
  {q:"How many adult tickets were sold?",k:"num",v:a,a:N(a),s:[`${pa}a + ${pc}(${a+c} − a) = ${pa*a+pc*c}`,`${pa-pc}a + ${pc*(a+c)} = ${pa*a+pc*c}`,`a = ${a}`]},
  {q:"Give the solution as an ordered pair (a, s).",k:"pair",v:[a,c],a:`(${a}, ${c})`,s:[`s = ${a+c} − ${a} = ${c}`]}]}; },
 ()=>{ const v=pick([32,48,64,80,96]),h0=R(0,40),t1=R(1,2); const tm=v/32,H=-16*tm*tm+v*tm+h0; return {t:"Quadratic model",stem:`A ball's height in feet after t seconds is h(t) = −16t<sup>2</sup> + ${v}t + ${h0}.`,g:{f:[x=>-16*x*x+v*x+h0],xr:[0,2*tm+0.6],yr:[0,H*1.15]},parts:[
  {q:`What is the height at t = ${t1}?`,k:"num",v:-16*t1*t1+v*t1+h0,a:N(-16*t1*t1+v*t1+h0)+" ft",s:[`−16(${t1})<sup>2</sup> + ${v}(${t1}) + ${h0} = ${N(-16*t1*t1+v*t1+h0)}`]},
  {q:"After how many seconds does the ball reach its maximum height?",k:"num",v:tm,a:N(tm)+" s",s:[`t = −b/(2a) = −${v}/(2·(−16)) = ${N(tm)}`]},
  {q:"What is the maximum height (feet)?",k:"num",v:H,a:N(H)+" ft",s:[`h(${N(tm)}) = ${N(H)}`]}]}; },
 ()=>{ const a1=R(-5,9),d=nz(-5,7),n=R(15,40); return {t:"Arithmetic sequence",stem:`A sequence begins ${a1}, ${N(a1+d)}, ${N(a1+2*d)}, ${N(a1+3*d)}, …`,parts:[
  {q:"What is the common difference?",k:"num",v:d,a:N(d),s:[`${N(a1+d)} − ${a1<0?`(${N(a1)})`:N(a1)} = ${N(d)}`]},
  {q:"Write an explicit formula for the nth term.",k:"expr",f:x=>a1+(x-1)*d,a:`a<sub>n</sub> = ${a1} + (n − 1)(${N(d)}) = ${lin(d,a1-d,"n")}`,s:[`a<sub>n</sub> = a<sub>1</sub> + (n − 1)d`,`= ${lin(d,a1-d,"n")}`]},
  {q:`What is term number ${n}?`,k:"num",v:a1+(n-1)*d,a:N(a1+(n-1)*d),s:[`${a1} + ${n-1}(${N(d)}) = ${N(a1+(n-1)*d)}`]}]}; },
 ()=>{ const a=pick([2,3,4,5,10]),b=pick([2,3,1.5,0.5]),x6=R(5,7); const xs=[0,1,2,3],ys=xs.map(x=>a*b**x); return {t:"Exponential model",stem:`The table shows an exponential function.${xyTbl(xs,ys)}`,parts:[
  {q:"By what number is y multiplied each time x goes up by 1?",k:"num",v:b,a:N(b),s:[`${N(ys[1])} ÷ ${N(ys[0])} = ${N(b)}`]},
  {q:"Write the function y = a·b^x.",k:"expr",f:x=>a*b**x,a:`y = ${a}(${N(b)})<sup>x</sup>`,s:[`a = value at x = 0: ${a}.`,`y = ${a}(${N(b)})<sup>x</sup>`]},
  {q:`Find y when x = ${x6}.`,k:"num",v:a*b**x6,tol:0.011,a:N(+(a*b**x6).toFixed(4)),s:[`${a}(${N(b)})<sup>${x6}</sup> = ${N(+(a*b**x6).toFixed(4))}`]}]}; },
 ()=>{ const r=R(-6,-1),s2=R(1,7),k=pick([1,2,3]); const B=-k*(r+s2),C=k*r*s2; return {t:"Factor and solve",stem:`f(x) = ${poly([k,B,C])}`,g:{f:[x=>k*x*x+B*x+C],cy:9,xr:[r-3,s2+3]},parts:[
  {q:"Factor f(x) completely.",k:"expr",f:x=>k*x*x+B*x+C,a:`${k===1?"":k}(x${sg(-r)})(x${sg(-s2)})`,s:[k>1?`GCF ${k}: ${k}(${poly([1,-(r+s2),r*s2])})`:`Two numbers that multiply to ${N(r*s2)} and add to ${N(-(r+s2))}: ${N(-r)} and ${N(-s2)}.`,`${k===1?"":k}(x${sg(-r)})(x${sg(-s2)})`]},
  {q:"What is the smaller zero?",k:"num",v:r,a:N(r),s:[`x${sg(-r)} = 0 ⇒ x = ${N(r)}`]},
  {q:"What is the larger zero?",k:"num",v:s2,a:N(s2),s:[`x${sg(-s2)} = 0 ⇒ x = ${N(s2)}`]},
  {q:"What is the x-coordinate of the vertex?",k:"num",v:(r+s2)/2,a:N((r+s2)/2),s:[`Halfway between the zeros: (${N(r)} + ${N(s2)})/2 = ${N((r+s2)/2)}`]}]}; },
 ()=>{ const c=pick([6,8,12,15]),f=pick([5,10,20]),M=c*R(4,12)+f+R(0,c-1); const n=Math.floor((M-f)/c); return {t:"Inequality model",stem:`You have $${M} to spend. Each T-shirt costs $${c} and shipping is $${f}.`,parts:[
  {q:"Write an inequality for the number of T-shirts t. (Example: 3t+2<=20)",k:"text",ok:[`${c}t+${f}<=${M}`,`${f}+${c}t<=${M}`,`${M}>=${c}t+${f}`,`${M}>=${f}+${c}t`,`${c}t+${f}≤${M}`],a:`${c}t + ${f} ≤ ${M}`,s:[`Cost of t shirts plus shipping is at most ${M}.`,`${c}t + ${f} ≤ ${M}`]},
  {q:"Solve it: t is at most what number? (Round to the hundredth.)",k:"num",v:Math.round((M-f)/c*100)/100,tol:0.011,a:N(Math.round((M-f)/c*100)/100),s:[`${c}t ≤ ${M-f}`,`t ≤ ${N(Math.round((M-f)/c*100)/100)}`]},
  {q:"What is the greatest number of T-shirts you can buy?",k:"num",v:n,a:N(n),s:[`Whole shirts only: ${n}`]}]}; },
 ()=>{ const x1=R(-4,0),x2=R(2,5),m=nz(-3,3),b=R(-4,5); const y1=m*x1+b,y2=m*x2+b; const pm=-1/m; return {t:"Lines",stem:`A line passes through ${pt(x1,y1)} and ${pt(x2,y2)}.`,g:{f:[x=>m*x+b],p:[[x1,y1],[x2,y2]],xr:[-8,8],yr:[-8,8]},parts:[
  {q:"What is the slope?",k:"num",v:m,a:N(m),s:[`(${N(y2)} − ${y1<0?`(${N(y1)})`:N(y1)})/(${x2} − ${x1<0?`(${N(x1)})`:N(x1)}) = ${N(m)}`]},
  {q:"Write the equation in slope-intercept form.",k:"expr",f:x=>m*x+b,a:`y = ${lin(m,b)}`,s:[`b = ${N(y1)} − ${N(m)}(${N(x1)}) = ${N(b)}`,`y = ${lin(m,b)}`]},
  {q:"What is the slope of a line perpendicular to it? (A fraction is fine.)",k:"num",v:pm,a:F(-1,m),s:[`Negative reciprocal of ${N(m)}: ${F(-1,m)}`]}]}; },
 ()=>{ const d=Array.from({length:R(6,8)},()=>R(10,40)).sort((a,b)=>a-b); const k=d.length,sum=d.reduce((a,b)=>a+b,0),mean=Math.round(sum/k*100)/100; const med=k%2?d[(k-1)/2]:(d[k/2-1]+d[k/2])/2; return {t:"Statistics",stem:`Points scored in ${k} games: ${shuffleArr(d).join(", ")}.`,parts:[
  {q:"What is the mean? (Round to the hundredth.)",k:"num",v:mean,tol:0.011,a:N(mean),s:[`Sum ${sum} ÷ ${k}`,`= ${N(mean)}`]},
  {q:"What is the median?",k:"num",v:med,a:N(med),s:[`In order: ${d.join(", ")}`,k%2?`Middle value: ${med}`:`Average of the two middle values: (${d[k/2-1]} + ${d[k/2]})/2 = ${N(med)}`]},
  {q:"What is the range?",k:"num",v:d[k-1]-d[0],a:N(d[k-1]-d[0]),s:[`${d[k-1]} − ${d[0]} = ${d[k-1]-d[0]}`]}]}; }];
function shuffleArr(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
EOC.secLabel.open=["Open response","EOC-style, type every part"];
/* ---- add to the course ---- */
const wrap=g=>()=>{ for(let i=0;i<40;i++){ let p=null; try{ p=g(); }catch(e){} if(p&&p.q) return p; } return g(); };
["gen","med","adv"].forEach(k=>EOC[k]=EOC[k].map(wrap)); EOC.chal=[]; EOC.frq=[];
const Z=window.ZC, L=Z.units, rv=L.findIndex(u=>u.id==="review");
EOC.num=rv; L.splice(rv,0,EOC); const R0=L[rv+1]; R0.num=rv+1;
["gen","med","adv"].forEach(k=>R0[k]=R0[k].concat(EOC[k])); R0.sheet.push([EOC.c,EOC.short,EOC.sheet[2][2],""]);
Z.strands.splice(Z.strands.length-1,0,["EOC prep",GOLD,["eoc"]]);
/* ---- answer-format instructions on every question ---- */
const decs=v=>{ const s=String(+(+v).toFixed(6)); return s.includes(".")?s.split(".")[1].length:0; };
function numHint(v,tol,a){ const A=String(a).replace(/<[^>]+>/g,"");
  if(/^\$/.test(A)&&!Number.isInteger(v)) return "Round to the nearest cent.";
  if(tol!=null&&tol>=0.4) return "Round to the nearest whole number.";
  if(tol!=null&&tol>=0.04) return "Round to the nearest tenth.";
  if(tol!=null&&tol>=0.004) return "Round to the nearest hundredth.";
  if(/\d\/\d/.test(A)) return "Write your answer as a fraction in simplest form, like 3/4.";
  if(decs(v)>0) return "Write your answer as a decimal.";
  return "Give an exact answer: no rounding."; }
function hintOf(p,uid){ const q=String(p.q), A=String(p.a).replace(/<[^>]+>/g,"");
  const TH={"qf|Completing the square":"Write in vertex form: y = a(x − h)^2 + k.","qf|Vertex to standard form":"Write in standard form: y = ax^2 + bx + c.","lf|Equation from two points":"Write in slope-intercept form: y = mx + b.","lf|Point-slope form":"Write in slope-intercept form: y = mx + b.","lf|Graph to equation":"Write in slope-intercept form: y = mx + b.","lf|Line through a point":"Write in slope-intercept form: y = mx + b.","u5|Graphing":"Choose the circle (open or closed) and the direction."}; if(TH[uid+"|"+p.t]) return TH[uid+"|"+p.t];
  if(/round|nearest|decimal places|to 2 decimals|to the cent/i.test(q)) return "";
  if(!p.mc&&typeof p.v==="number"&&isFinite(p.v)) return numHint(p.v,p.tol,p.a);
  if(/^\(.*,.*\)/.test(A)) return A.includes(" and ")?"Write each solution as an ordered pair (x, y).":"Write the answer as an ordered pair (x, y).";
  if(/^x = .* (or|and) /.test(A)||/±/.test(A)) return "Give all solutions.";
  if(uid==="u9"||/^Factor/.test(q.replace(/<[^>]+>/g,""))) return "Factor completely.";
  if(uid==="u6") return "Simplify. Use positive exponents only.";
  if(/√/.test(A)) return "Write in simplest radical form.";
  if(/^y = /.test(A)) return "Write the equation solved for y (y = …).";
  if(/(&lt;|&gt;|≤|≥|<|>)/.test(A)) return "Write the solution as an inequality.";
  if(uid==="u8"||uid==="u0") return /x/.test(A)?"Simplify. Write terms from the highest power down.":"";
  if(/^[a-zA-Z] = /.test(A)) return "Write the formula solved for the variable named.";
  return ""; }
const addH=(q,h)=>h?`${q}<span class="afh">✎ ${h}</span>`:q;
if(!document.getElementById("afhcss")){ const st=document.createElement("style"); st.id="afhcss"; st.textContent=`.afh{display:block;font-size:15px;font-style:italic;color:#8a3b12;margin-top:3px}`; document.head.appendChild(st); }
L.forEach(u=>{ if(u.id==="review") return; ["gen","med","adv"].forEach(k=>{ u[k]=u[k].map(g=>{ const h=()=>{ const p=g(); if(p&&!p._h){ p._h=1; p.q=addH(p.q,hintOf(p,u.id)); } return p; }; return h; }); }); });
const RV=L.find(u=>u.id==="review"); ["gen","med","adv"].forEach(k=>RV[k]=L.filter(u=>u.id!=="review").flatMap(u=>u[k]));
EOC.open=EOC.open.map(g=>()=>{ const p=g(); if(p) p.parts.forEach(pt=>{ const h=pt.k==="num"?(/round|nearest/i.test(pt.q)?"":numHint(pt.v,pt.tol,pt.a)):pt.k==="expr"?"Write an expression or equation. Use ^ for exponents, like x^2.":pt.k==="pair"?"Write an ordered pair, like (3, 5).":""; pt.q=addH(pt.q,h); }); return p; });

})();
