/* Algebra 1 for BZ, part 4: EOC topics added inside the units — rational exponents (Radicals), dividing by a monomial
   (Polynomials), systems of inequalities and constraints (Systems), reading expressions in context (Linear Functions),
   writing quadratics and transformations (Quadratic Functions). Loaded after alg1b.js and before alg1c.js. */
(function(){
const {R,pick,nz,gcd,N,F,X,sg,poly,P,PF,PS}=window.ZH;
const FR=(n,d)=>`<span class="frc"><span>${n}</span><span>${d}</span></span>`;
const PSX=(t,q,a,w,s)=>{ let ww=[...new Set(w)].filter(x=>x!==a); if(ww.length<3) ww=ww.concat(["None of these","No solution","All real numbers"]).filter(x=>x!==a); return PS(t,q,a,ww.slice(0,3),s); };
const ty=(q,a,show,wt)=>`<div class="ty" data-a="${a}"${show?` data-show="${show}"`:""}${wt?` data-wt="${wt}"`:""}><span class="tq">${q}</span><input type="text" inputmode="text" autocomplete="off" aria-label="Your answer"><button type="button" class="ty-b">Check</button><button type="button" class="ty-s">Show</button><span class="ty-m"></span></div>`;
const PL=S=>window.A2PLOT?A2PLOT.plot(S):"";
const we=(q,steps,wt,g)=>`<div class="we"${wt?` data-wt="${wt}"`:""}><b class="q">${q}</b><ol>${steps.map(s=>`<li>${s}</li>`).join("")}</ol>${g?PL(g):""}<div class="clr"></div></div>`;
const wg=(p,g)=>{ if(p) p.g=g; return p; };
const pt=(x,y)=>`(${N(x)}, ${N(y)})`;
const sup=e=>`<sup>${e}</sup>`;
const ex=(n,d)=>d===1?sup(n):`<sup>${n}/${d}</sup>`;
const mono=(c,e,v="x")=>e===0?N(c):`${c===1?"":c===-1?"−":N(c)}${v}${e===1?"":sup(e)}`;
const polyT=terms=>{ let s=""; terms.forEach(([c,e])=>{ if(!c) return; const m=mono(Math.abs(c),e); s+=s?(c<0?" − ":" + "):(c<0?"−":""); s+=m; }); return s||"0"; };
const BOX={xr:[-8,8],yr:[-8,8]};
const Z=window.ZC, byId=id=>Z.units.find(u=>u.id===id);
const wrap=g=>()=>{ for(let i=0;i<60;i++){ let p=null; try{ p=g(); }catch(e){} if(p&&p.q) return p; } return g(); };
const add=(u,lvl,arr)=>{ u[lvl]=u[lvl].concat(arr.map(wrap)); };

/* ===== Radicals: rational exponents ===== */
const U7=byId("u7");
U7.learn+=`<h4>Rational exponents</h4><p>A fraction exponent is a radical: the <b>bottom</b> is the root, the <b>top</b> is the power. a<sup>m/n</sup> = (ⁿ√a)<sup>m</sup>. Take the root first: the numbers stay small.</p>
${we("8<sup>2/3</sup>",["Root 3: ∛8 = 2.","Power 2: 2<sup>2</sup> = 4.","<b>4</b>"],"Rational exponents")}
${we("27<sup>−2/3</sup>",["Negative exponent: 1/27<sup>2/3</sup>.","∛27 = 3, 3<sup>2</sup> = 9.","<b>1/9</b>"],"Negative rational exponents")}
${we("Write ∛(x<sup>2</sup>) with an exponent.",["Root 3 → bottom 3; power 2 → top 2.","<b>x<sup>2/3</sup></b>"],"Radicals and exponents")}
${we("x<sup>1/2</sup> · x<sup>1/3</sup>",["Same base: add the exponents.","1/2 + 1/3 = 5/6.","<b>x<sup>5/6</sup></b>"],"Exponent rules with fractions")}
${ty("16<sup>3/4</sup> = ?","8","8","Rational exponents")}${ty("25<sup>−1/2</sup> = ? (fraction)","1/5","1/5","Negative rational exponents")}`;
add(U7,"gen",[
 ()=>{ const n=pick([2,3,2,4]),b=n===4?pick([2,3]):n===3?R(2,5):R(2,9),m=n===2?pick([1,3]):R(1,3); if(n===2&&m===3&&b>5) return null; const a=b**n; return P("Rational exponents",`Evaluate ${a}${ex(m,n)}.`,b**m,[b*m,b+m,b**(m+1),a*m].filter(x=>Number.isInteger(x)),[`Root ${n}: ${n===2?"√":n===3?"∛":"∜"}${a} = ${b}.`,m===1?`<b>${b}</b>`:`Power ${m}: ${b}${sup(m)} = <b>${b**m}</b>`]); },
 ()=>{ const n=pick([2,3,4,5]),m=pick([1,2,3,4,5]); if(m===n||gcd(m,n)!==1) return null; const rt=n===2?"√":n===3?"∛":n===4?"∜":"⁵√"; return PSX("Radicals and exponents",`Write ${rt}(x${m===1?"":sup(m)}) with a rational exponent.`,`x${ex(m,n)}`,[`x${ex(n,m)}`,`x${sup(m*n)}`,`x${ex(m,n+1)}`],[`The root ${n} goes on the bottom, the power ${m} on top.`,`<b>x${ex(m,n)}</b>`]); }]);
add(U7,"med",[
 ()=>{ const n=pick([2,3]),b=n===3?R(2,4):R(2,7),m=n===2?1:pick([1,2]); const a=b**n; return PF("Negative rational exponents",`Evaluate ${a}<sup>−${m===1?"":m}${m===1?"1/"+n:"/"+n}</sup>.`.replace("<sup>−1/","<sup>−1/"),1,b**m,[F(-1,b**m),F(b**m,1),F(1,a)],[`Negative exponent: 1/${a}${ex(m,n)}.`,`${n===2?"√":"∛"}${a} = ${b}; ${b}${sup(m)} = ${b**m}.`,`<b>1/${b**m}</b>`]); },
 ()=>{ const [a,b]=pick([[1,2],[1,3],[2,3],[1,4],[3,4],[1,6]]),[c,d]=pick([[1,2],[1,3],[1,4],[2,5]]); const op=pick(["×","÷"]); const nn=op==="×"?a*d+c*b:a*d-c*b,dd=b*d; const g=gcd(Math.abs(nn),dd)||1; const e=nn===0?"0":dd/g===1?String(nn/g):`${nn/g}/${dd/g}`; if(nn<=0) return null;
   return PSX("Exponent rules with fractions",`Simplify x${ex(a,b)} ${op==="×"?"·":"÷"} x${ex(c,d)}.`,`x${dd/g===1?sup(nn/g):`<sup>${e}</sup>`}`,[`x<sup>${a*c}/${b*d}</sup>`,`x<sup>${a+c}/${b+d}</sup>`,`x<sup>${op==="×"?Math.abs(a*d-c*b):a*d+c*b}/${b*d}</sup>`],[`${op==="×"?"Multiply → add":"Divide → subtract"} the exponents.`,`${a}/${b} ${op==="×"?"+":"−"} ${c}/${d} = ${e}`,`<b>x<sup>${e}</sup></b>`]); }]);
add(U7,"adv",[
 ()=>{ const [c,n]=pick([[16,4],[27,3],[8,3],[81,4],[64,3],[25,2],[36,2]]),k=pick([2,3,4]),m=pick([1,2,3]); if(gcd(m,n)!==1) return null; const b=Math.round(c**(1/n)); const E=n*k; const co=b**m;
   return PSX("Simplify with rational exponents",`Simplify (${c}x${sup(E)})${ex(m,n)}.`,`${co}x${sup(k*m)}`,[`${c}x${sup(k*m)}`,`${co}x${sup(E+m)}`,`${b}x${sup(k)}`],[`${c}${ex(m,n)}: ${n===2?"√":n===3?"∛":"∜"}${c} = ${b}, ${b}${sup(m)} = ${co}.`,`(x${sup(E)})${ex(m,n)} = x${sup(E*m/n)}.`,`<b>${co}x${sup(k*m)}</b>`]); },
 ()=>{ const n=pick([2,3]),m=pick([2,3,4]); if(gcd(m,n)!==1) return null; const b=R(2,n===3?3:4),x=b**n; return P("Equations with rational exponents",`Solve x${ex(m,n)} = ${b**m} for x &gt; 0.`,x,[b**m*n/m,b,b**(m*n)],[`Raise both sides to the power ${n}/${m}.`,`(${b**m})<sup>${n}/${m}</sup>: <sup>${m}</sup>√${b**m} = ${b}, then ${b}${sup(n)}.`,`<b>x = ${x}</b>`]); }]);

/* ===== Polynomials: divide by a monomial ===== */
const U8=byId("u8");
U8.learn+=`<h4>Dividing a polynomial by a monomial</h4><p>Split the fraction: divide <b>every</b> term by the monomial. Divide the numbers, subtract the exponents.</p>
${we("(12x<sup>4</sup> − 8x<sup>3</sup> + 4x<sup>2</sup>) ÷ 4x<sup>2</sup>",["12x<sup>4</sup>/4x<sup>2</sup> = 3x<sup>2</sup>","−8x<sup>3</sup>/4x<sup>2</sup> = −2x","4x<sup>2</sup>/4x<sup>2</sup> = 1","<b>3x<sup>2</sup> − 2x + 1</b>"],"Divide by a monomial")}
${ty("(10x<sup>3</sup> + 15x<sup>2</sup>) ÷ 5x = ? Type like 2x^2+3x","2x^2+3x","2x<sup>2</sup> + 3x","")}`;
const divM=(nt)=>{ const c=pick([2,3,4,5,-2,-3,6]),e=R(1,2); const q=[]; let top=R(2,3); for(let i=0;i<nt;i++){ q.push([nz(-6,7),top-i]); } const num=q.map(([a,k])=>[a*c,k+e]);
  return PSX("Divide by a monomial",`(${polyT(num)}) ÷ ${mono(c,e)}`,polyT(q),[polyT(q.map(([a,k])=>[a,k+e])),polyT(q.map(([a,k],i)=>[i?a:-a,k])),polyT(q.map(([a,k])=>[a*c,k]))],[`Divide each term by ${mono(c,e)}: divide the numbers, subtract ${e} from each exponent.`,`<b>${polyT(q)}</b>`]); };
add(U8,"gen",[()=>divM(2)]); add(U8,"med",[()=>divM(3)]);
add(U8,"adv",[()=>{ const c=pick([2,3,4,6]),a=nz(-5,5),b=nz(-5,5),d=nz(-5,5); if(Math.abs(a)===1) return null; return PSX("Divide by a monomial",`(${N(a*c)}x${sup(3)}y${sup(2)} ${b*c<0?"−":"+"} ${Math.abs(b*c)}x${sup(2)}y ${d*c<0?"−":"+"} ${Math.abs(d*c)}xy) ÷ ${c}xy`,`${mono(a,2).replace(/x<sup>2<\/sup>$/,"x<sup>2</sup>")}y ${b<0?"−":"+"} ${Math.abs(b)===1?"":Math.abs(b)}x ${d<0?"−":"+"} ${Math.abs(d)}`,[`${N(a)}x${sup(3)}y ${b<0?"−":"+"} ${Math.abs(b)}x ${d<0?"−":"+"} ${Math.abs(d)}`,`${N(a)}x${sup(2)}y${sup(2)} ${b<0?"−":"+"} ${Math.abs(b)}xy ${d<0?"−":"+"} ${Math.abs(d)}`,`${N(a)}x${sup(2)}y ${b<0?"+":"−"} ${Math.abs(b)}x ${d<0?"+":"−"} ${Math.abs(d)}`],[`Divide each term by ${c}xy.`,`x: subtract 1 from each exponent; y: subtract 1.`]); }]);

/* ===== Systems: systems of inequalities and constraints ===== */
const SYS=byId("sys");
SYS.learn+=`<h4>Systems of inequalities</h4><p>Graph each inequality (dashed for &lt; &gt;, solid for ≤ ≥). The solution is where the shadings <b>overlap</b>. A point is a solution only if it makes <b>every</b> inequality true.</p>
${we("y &gt; x − 1 and y ≤ −x + 3: is (1, 1) a solution?",["1 &gt; 1 − 1 = 0 ✓","1 ≤ −1 + 3 = 2 ✓","<b>Yes</b>: it is in the overlap."],"Systems of inequalities",{f:[{f:x=>x-1,dash:true},x=>-x+3],p:[[1,1]],...BOX,eq:true})}
<h4>Constraints: is the answer viable?</h4><p>Word problems give <b>constraints</b> (limits). A solution is <b>viable</b> only if it fits every constraint and makes sense (no negative or half people).</p>
${we("Tickets: a + s ≤ 100 seats and 8a + 5s ≥ 600 dollars. Is (40, 50) viable?",["40 + 50 = 90 ≤ 100 ✓","8(40) + 5(50) = 570 ≥ 600 ✗","<b>Not viable</b>: not enough money."],"Constraints")}`;
add(SYS,"gen",[()=>{ const T=pick([["at most","≤"],["at least","≥"],["more than","&gt;"],["fewer than","&lt;"]]),n=R(10,60),p1=R(2,9),p2=R(2,9); const it=pick([["apples","bananas"],["cars","trucks"],["shirts","hats"]]); const money=Math.random()<.5;
  return PSX("Writing inequalities",money?`Apples cost $${p1} and bananas $${p2}. You can spend ${T[0]} $${n*3}. Which inequality fits? (a = apples, b = bananas)`:`You can carry ${T[0]} ${n} ${it[0]} and ${it[1]} in all. Which inequality fits? (x = ${it[0]}, y = ${it[1]})`,money?`${p1}a + ${p2}b ${T[1]} ${n*3}`:`x + y ${T[1]} ${n}`,money?[`${p1}a + ${p2}b ${T[1]==="≤"?"≥":"≤"} ${n*3}`,`${p2}a + ${p1}b ${T[1]} ${n*3}`,`a + b ${T[1]} ${n*3}`]:[`x + y ${T[1]==="≤"?"≥":T[1]==="≥"?"≤":T[1]==="&gt;"?"&lt;":"&gt;"} ${n}`,`xy ${T[1]} ${n}`,`x − y ${T[1]} ${n}`],[`“${T[0]}” means ${T[1]}.`,money?`Cost = ${p1}a + ${p2}b.`:`Total = x + y.`]); }]);
add(SYS,"med",[()=>{ const m1=nz(-2,2),b1=R(-3,2),m2=nz(-2,2),b2=R(0,4); if(m1===m2) return null; const o1=pick(["&gt;","≥"]),o2=pick(["&lt;","≤"]); const px=R(-4,4),py=R(-5,5); const t1=o1==="&gt;"?py>m1*px+b1:py>=m1*px+b1,t2=o2==="&lt;"?py<m2*px+b2:py<=m2*px+b2; const ok=t1&&t2; const L=(m,b)=>`${m===1?"":m===-1?"−":N(m)}x${b?sg(b):""}`;
  return wg(PSX("Systems of inequalities",`Is ${pt(px,py)} a solution of the system y ${o1} ${L(m1,b1)} and y ${o2} ${L(m2,b2)}?`,ok?"Yes":"No",[ok?"No":"Yes","Only the first inequality","Only the second inequality"],[`First: ${N(py)} ${o1} ${N(m1*px+b1)}? ${t1?"✓":"✗"}`,`Second: ${N(py)} ${o2} ${N(m2*px+b2)}? ${t2?"✓":"✗"}`,`<b>${ok?"Yes: both are true":"No"}</b>`]),{f:[{f:x=>m1*x+b1,dash:o1==="&gt;"},{f:x=>m2*x+b2,dash:o2==="&lt;"}],sh:{f:x=>m1*x+b1,above:true},p:[[px,py]],...BOX,eq:true}); }]);
add(SYS,"adv",[()=>{ const S=R(15,40),pa=pick([6,8,10,12]),pc=pick([3,4,5]),M=R(4,9)*25; const a=R(2,S-2),c=R(2,S-a+3); const t1=a+c<=S,t2=pa*a+pc*c>=M; const ok=t1&&t2;
  return PSX("Constraints",`A club sells adult tickets for $${pa} and child tickets for $${pc}. The room holds at most ${S} people, and the club needs at least $${M}. Is selling ${a} adult and ${c} child tickets viable?`,ok?"Yes, both constraints are met":t1?"No, not enough money":"No, too many people",["Yes, both constraints are met","No, not enough money","No, too many people","No, both constraints fail"].filter(x=>x!==(ok?"Yes, both constraints are met":t1?"No, not enough money":"No, too many people")).slice(0,3).concat([]),[`People: ${a} + ${c} = ${a+c} ≤ ${S}? ${t1?"✓":"✗"}`,`Money: ${pa}(${a}) + ${pc}(${c}) = ${pa*a+pc*c} ≥ ${M}? ${t2?"✓":"✗"}`,`<b>${ok?"Viable":"Not viable"}</b>`]); }]);

/* ===== Linear functions: reading expressions in context ===== */
const LF=byId("lf");
LF.learn+=`<h4>What do the numbers mean?</h4><p>In y = mx + b from a story, <b>m</b> is the rate (per hour, per month, per item) and <b>b</b> is the starting amount (when x = 0).</p>
${we("A plumber charges C = 75 + 40h for h hours. What do 75 and 40 mean?",["75: the fixed fee, charged even for 0 hours.","40: dollars per hour (the rate)."],"Interpreting expressions")}`;
const CTX=[["a gym","C = ${b} + ${m}x","x months","the sign-up fee","the cost per month"],["a phone plan","C = ${b} + ${m}g","g gigabytes","the monthly base price","the cost per gigabyte"],["a taxi ride","C = ${b} + ${m}d","d miles","the starting fare","the cost per mile"],["a candle","h = ${b} − ${m}t","t hours","the starting height of the candle","how much the candle shrinks each hour"],["a savings account","S = ${b} + ${m}w","w weeks","the money saved at the start","the money added each week"]];
const ctxQ=(lvl)=>{ const c=pick(CTX),b=pick([12,20,25,30,45,60]),m=pick([2,3,4,5,8,15]); const which=pick(["b","m"]); const eq=c[1].replace("${b}",b).replace("${m}",m); const ans=which==="b"?c[3]:c[4]; const wrong=[which==="b"?c[4]:c[3],"the total after "+c[2],"the number of "+c[2].split(" ").slice(1).join(" ")];
  return PSX("Interpreting expressions",`For ${c[0]}, ${eq}, where ${c[2]}. What does ${which==="b"?b:m} represent?`,ans,wrong,[which==="b"?`${b} is the value when ${c[2].split(" ")[0]} = 0: the starting amount.`:`${m} is multiplied by ${c[2].split(" ")[0]}: it changes for every 1 unit, so it is the rate.`,`<b>${ans}</b>`]); };
add(LF,"gen",[ctxQ]);
add(LF,"med",[()=>{ const m=pick([2.5,3,4.5,1.8]),b=pick([45,52,60,38]); return PSX("Interpreting expressions",`The line of best fit for hours studied x and test score y is y = ${m}x + ${b}. What does ${m} mean?`,`The score goes up about ${m} points for each extra hour studied`,[`A student who studies 0 hours scores about ${m}`,`The score goes up about ${b} points for each hour`,`Students study about ${m} hours`],[`${m} is the slope: the change in y for each 1 unit of x.`]); }]);

/* ===== Quadratic functions: write a quadratic, transformations, absolute value functions ===== */
const QF=byId("qf");
const vfx=(a,h,k,f="(x")=>`${a===1?"":a===-1?"−":N(a)}${f}${h?sg(-h):""})${f==="(x"?sup(2):""}${k?sg(k):""}`.replace("(x)"+sup(2),"x"+sup(2));
QF.learn+=`<h4>Writing a quadratic from its zeros</h4>${we("Zeros −1 and 4, passes through (2, −12)",["y = a(x + 1)(x − 4).","−12 = a(3)(−2) = −6a ⇒ a = 2.","<b>y = 2(x + 1)(x − 4) = 2x<sup>2</sup> − 6x − 8</b>"],"Write from zeros")}
<h4>Transformations</h4><p>Start from a parent graph (x², |x|). In y = a·f(x − h) + k: <b>h</b> moves it left/right (x − 3 → right 3), <b>k</b> moves it up/down, <b>a</b> &lt; 0 flips it, |a| &gt; 1 makes it narrower, |a| &lt; 1 wider.</p>
${we("y = (x − 3)<sup>2</sup> + 2 compared with y = x<sup>2</sup>",["x − 3: right 3.","+ 2: up 2.","Vertex moves from (0, 0) to (3, 2)."],"Transformations",{f:[{f:x=>x*x,dash:true},x=>(x-3)**2+2],p:[[3,2]],...BOX})}
<h4>Absolute value functions</h4><p>y = a|x − h| + k is a V with vertex (h, k). It opens up if a &gt; 0, down if a &lt; 0.</p>
${we("y = −2|x + 1| + 4",["Vertex (−1, 4).","a = −2: opens down, steeper than |x|."],"Absolute value functions",{f:[{f:x=>Math.abs(x),dash:true},x=>-2*Math.abs(x+1)+4],p:[[-1,4]],...BOX})}`;
add(QF,"gen",[
 ()=>{ const h=nz(-4,4),k=nz(-4,4),f=pick(["sq","abs"]); const fs=f==="sq"?"x"+sup(2):"|x|"; const g=f==="sq"?`(x${sg(-h)})${sup(2)}${sg(k)}`:`|x${sg(-h)}|${sg(k)}`; const ans=`${h>0?"Right":"Left"} ${Math.abs(h)}, ${k>0?"up":"down"} ${Math.abs(k)}`;
   return wg(PSX("Transformations",`How is the graph of y = ${g} related to y = ${fs}?`,ans,[`${h>0?"Left":"Right"} ${Math.abs(h)}, ${k>0?"up":"down"} ${Math.abs(k)}`,`${h>0?"Right":"Left"} ${Math.abs(h)}, ${k>0?"down":"up"} ${Math.abs(k)}`,`${k>0?"Right":"Left"} ${Math.abs(k)}, ${h>0?"up":"down"} ${Math.abs(h)}`],[`x${sg(-h)}: ${h>0?"right":"left"} ${Math.abs(h)} (opposite of the sign).`,`${sg(k).trim()}: ${k>0?"up":"down"} ${Math.abs(k)}.`]),{f:[{f:f==="sq"?x=>x*x:x=>Math.abs(x),dash:true},f==="sq"?x=>(x-h)**2+k:x=>Math.abs(x-h)+k],p:[[h,k]],...BOX}); },
 ()=>{ const a=pick([1,-1,2,-2,3,0.5]),h=R(-4,4),k=R(-4,4); return wg(PSX("Absolute value functions",`What is the vertex of y = ${a===1?"":a===-1?"−":N(a)}|x${h?sg(-h):""}|${k?sg(k):""}?`,pt(h,k),[pt(-h,k),pt(h,-k),pt(k,h)],[`y = a|x − h| + k has vertex (h, k).`,`<b>${pt(h,k)}</b>`]),{f:[x=>a*Math.abs(x-h)+k],p:[[h,k]],...BOX}); }]);
add(QF,"med",[
 ()=>{ const r=R(-5,2),s=r+R(1,6); return PSX("Write from zeros",`Which quadratic has zeros ${N(r)} and ${N(s)} and leading coefficient 1?`,`y = ${poly([1,-(r+s),r*s])}`,[`y = ${poly([1,r+s,r*s])}`,`y = ${poly([1,-(r+s),-r*s])}`,`y = ${poly([1,r*s,-(r+s)])}`],[`y = (x${sg(-r)})(x${sg(-s)})`.replace(/x [+−] 0/g,"x"),`Multiply out: <b>y = ${poly([1,-(r+s),r*s])}</b>`]); },
 ()=>{ const a=pick([-2,-1,2,3,0.5]),f=pick(["sq","abs"]); const ans=a<0?(Math.abs(a)===1?"Reflected over the x-axis":`Reflected over the x-axis and ${Math.abs(a)>1?"narrower":"wider"}`):(a>1?"Narrower (vertical stretch)":"Wider (vertical shrink)"); const fs=f==="sq"?"x"+sup(2):"|x|";
   return wg(PSX("Transformations",`How does y = ${a===-1?"−":N(a)}${fs} compare with y = ${fs}?`,ans,["Reflected over the x-axis","Narrower (vertical stretch)","Wider (vertical shrink)","Shifted up "+Math.abs(a),"Reflected over the x-axis and narrower","Reflected over the x-axis and wider"].filter(x=>x!==ans),[`a = ${N(a)}: ${a<0?"negative flips it over the x-axis; ":""}|a| ${Math.abs(a)>1?"&gt; 1 makes it narrower":Math.abs(a)<1?"&lt; 1 makes it wider":"= 1 keeps the shape"}.`]),{f:[{f:f==="sq"?x=>x*x:x=>Math.abs(x),dash:true},f==="sq"?x=>a*x*x:x=>a*Math.abs(x)],...BOX}); }]);
add(QF,"adv",[
 ()=>{ const r=R(-4,1),s=r+R(1,5),a=nz(-3,3); let px=R(-3,5); if(px===r||px===s) px=s+1; const py=a*(px-r)*(px-s); return P("Find a from zeros",`A parabola has zeros ${N(r)} and ${N(s)} and passes through ${pt(px,py)}. Find a in y = a(x${sg(-r)})(x${sg(-s)}).`.replace(/x [+−] 0\)/g,"x)"),a,[-a,py,a*2],[`${N(py)} = a(${N(px-r)})(${N(px-s)}) = ${N((px-r)*(px-s))}a`,`<b>a = ${N(a)}</b>`]); },
 ()=>{ const a=pick([1,-1,2]),h=R(-2,3),k=R(-4,4); const xs=[h-2,h-1,h,h+1,h+2],ys=xs.map(x=>a*(x-h)**2+k); return PSX("Write from a table",`<table class="eoc-t"><tr><th>x</th>${xs.map(x=>`<td>${N(x)}</td>`).join("")}</tr><tr><th>y</th>${ys.map(y=>`<td>${N(y)}</td>`).join("")}</tr></table>Which function fits the table?`,`y = ${vfx(a,h,k)}`,[`y = ${vfx(a,-h,k)}`,`y = ${vfx(-a,h,k)}`,`y = ${vfx(a,h,-k||2)}`],[`The table is symmetric about x = ${N(h)}: the vertex is ${pt(h,k)}.`,`From x = ${N(h)} to ${N(h+1)}, y changes by ${N(a)}, so a = ${N(a)}.`,`<b>y = ${vfx(a,h,k)}</b>`]); }]);
})();
