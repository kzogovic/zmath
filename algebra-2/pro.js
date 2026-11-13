/* SAT Generator + Challenge Lab for every unit, and three new units (Statistics for the SAT, Matrices, Mathematical Induction).
   Every problem is generated: MCQ, Deck (flashcards) and Type-the-answer modes, with ↻ New for fresh problems.
   All answers are computed here, not typed by hand. */
(function(){
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1)), pick=a=>a[Math.floor(Math.random()*a.length)], nz=(a,b)=>{let v=0;while(!v)v=R(a,b);return v;};
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a||1;};
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const C=(n,k)=>{ let r=1; for(let i=1;i<=k;i++) r=r*(n-k+i)/i; return Math.round(r); };
const fact=n=>n<=1?1:n*fact(n-1);
const N=x=>{ if(typeof x!=="number") return x; if(Math.abs(x-Math.round(x))<1e-9){ x=Math.round(x); return (x<0?"−":"")+Math.abs(x).toLocaleString("en-US"); } return (x<0?"−":"")+String(+Math.abs(x).toFixed(3)); };
const F=(n,d)=>{ if(d<0){n=-n;d=-d;} const g=gcd(n,d); n/=g; d/=g; return d===1?N(n):(n<0?"−":"")+Math.abs(n)+"/"+d; };
const sq="<sup>2</sup>", cu="<sup>3</sup>";
const X=(k,v="x")=>k===1?v:k===-1?"−"+v:N(k)+v;
const sg=n=>n<0?" − "+N(-n):" + "+N(n);
const poly=c=>{ const n=c.length-1; let s=""; c.forEach((a,i)=>{ if(!a) return; const p=n-i, m=Math.abs(a); const co=(m===1&&p>0)?"":String(m); const v=p===0?"":p===1?"x":"x<sup>"+p+"</sup>"; s+=s?(a<0?" − ":" + "):(a<0?"−":""); s+=co+v; }); return s||"0"; };
const P=(t,q,v,w,s,o={})=>({t,q,v,a:o.a!=null?o.a:N(v),w:w.map(x=>typeof x==="number"?N(x):x),s,tol:o.tol,mc:o.mc});
const PF=(t,q,n,d,w,s,o={})=>P(t,q,n/d,w,s,{...o,a:F(n,d)});   // fraction answer
const PS=(t,q,a,w,s)=>P(t,q,undefined,w,s,{a,mc:true});        // answer is text: MCQ and Deck only
const money=x=>"$"+(Math.round(x*100)/100).toFixed(Number.isInteger(x)?0:2);

/* ===================== generators by unit ===================== */
const G={};
G.toolkit={sat:[
 ()=>{ const a=nz(-4,5),b=R(-6,6),c=R(-5,5),k=R(-3,3); const g=k*k+c, v=a*g+b; return P("Composition",`f(x) = ${X(a)}${sg(b)} and g(x) = x${sq}${sg(c)}. What is f(g(${N(k)}))?`,v,[ (a*k+b)**2+c, a*k+b+g, a*k*k+b ],[`g(${N(k)}) = ${N(k*k)}${sg(c)} = ${N(g)}`,`f(${N(g)}) = ${N(a)}(${N(g)})${sg(b)} = <b>${N(v)}</b>`]); },
 ()=>{ const a=nz(-3,3),x1=R(-3,2),x2=x1+R(1,4); const v=a*(x1+x2); return P("Rate of change",`What is the average rate of change of f(x) = ${X(a)}${sq} from x = ${N(x1)} to x = ${N(x2)}?`,v,[a*(x2*x2-x1*x1),2*a*x2,a*(x2-x1)],[`f(${N(x2)}) − f(${N(x1)}) = ${N(a*x2*x2)} − ${N(a*x1*x1)} = ${N(a*(x2*x2-x1*x1))}`,`Divide by ${N(x2)} − ${N(x1)} = ${N(x2-x1)}: <b>${N(v)}</b>`]); },
 ()=>{ const h=R(-4,4),k=R(-4,4),p=nz(-4,4),q=R(-4,4); return P("Transformations",`The graph of f(x) = (x${sg(-h)})${sq}${sg(k)} is shifted to get g(x) = f(x${sg(-p)})${sg(q)}. What is the x-coordinate of the vertex of g?`,h+p,[h-p,h+q,k+q],[`f has vertex (${N(h)}, ${N(k)}).`,`f(x − ${N(p)}) moves it ${p>0?"right":"left"} ${Math.abs(p)}: x = <b>${N(h+p)}</b>`]); },
 ()=>{ const m=nz(-5,5),b=R(-9,9),k=R(-9,9); const v=(k-b)/m; return PF("Inverses",`f(x) = ${X(m)}${sg(b)}. What is f<sup>−1</sup>(${N(k)})?`,k-b,m,[m*k+b,(k+b)/m,k/m-b].map(x=>N(+x.toFixed(2))),[`Solve ${X(m)}${sg(b)} = ${N(k)}.`,`x = (${N(k)} − ${N(b)}) ÷ ${N(m)} = <b>${F(k-b,m)}</b>`]); }],
chal:[
 ()=>{ const y=pick([2,6,0,-4]),k=(2*y+3)/(y-1); return P("Inverses",`f(x) = (2x + 3)/(x − 1). If f<sup>−1</sup>(${N(k)}) = c, what is c?`,y,[k,1/k,y+1],[`f(c) = ${N(k)}: (2c + 3)/(c − 1) = ${N(k)}.`,`2c + 3 = ${N(k)}c − ${N(k)}, so c(${N(k)} − 2) = ${N(k+3)}.`,`c = <b>${N(y)}</b>`]); },
 ()=>{ const k=nz(-6,6); return PF("Composition",`f(x) = x${sq} − 2x and g(x) = x${sg(k)}. For what x is f(g(x)) = g(f(x))?`,3-k,2,[(k-3)/2,3-k,k/2].map(x=>N(x)),[`f(g(x)) = (x${sg(k)})${sq} − 2(x${sg(k)}) = x${sq} + ${N(2*k)}x + ${N(k*k)} − 2x − ${N(2*k)}`,`g(f(x)) = x${sq} − 2x${sg(k)}`,`${N(2*k)}x + ${N(k*k-2*k)} = ${N(k)}, so x = ${F(3*k-k*k,2*k)}`,`<b>x = ${F(3-k,2)}</b>`]); },
 ()=>{ const a=nz(-3,3),b=nz(-4,4),c=R(-5,5),d=R(-9,9); const p=8*a+4*b+2*c+d, q=-8*a+4*b-2*c+d; return P("Even & odd",`f(x) = ax${cu} + bx${sq} + cx + d with f(2) = ${N(p)} and f(−2) = ${N(q)}. What is 4b + d?`,(p+q)/2,[(p-q)/2,p+q,(p-q)/4],[`f(2) + f(−2): the odd terms cancel.`,`${N(p)} + ${N(q)} = 2(4b + d)`,`4b + d = <b>${N((p+q)/2)}</b>`]); }]};

G["unit-1"]={sat:[
 ()=>{ const f=R(4,12)*5,r=pick([25,30,35,40,45,50,60,75]),h=R(2,8); const B=f+r*h; return P("Linear models",`A plumber charges a $${f} visit fee plus $${r} per hour. A bill is $${B}. How many hours did the plumber work?`,h,[B/r,(B+f)/r,h+1].map(x=>+x.toFixed(2)),[`${f} + ${r}h = ${B}`,`${r}h = ${B-f}, so h = <b>${h}</b>`]); },
 ()=>{ const m=nz(-4,4),b=R(-8,8),x1=R(-4,0),x2=x1+R(1,4); const y1=m*x1+b,y2=m*x2+b; return P("Lines",`A line passes through (${N(x1)}, ${N(y1)}) and (${N(x2)}, ${N(y2)}). What is its y-intercept?`,b,[m,y1-m*x2,-b],[`m = (${N(y2)} − ${N(y1)}) ÷ (${N(x2)} − ${N(x1)}) = ${N(m)}`,`b = y − mx = ${N(y1)} − ${N(m)}(${N(x1)}) = <b>${N(b)}</b>`]); },
 ()=>{ const a=R(-6,6),b=R(1,9); return P("Absolute value",`What is the sum of the solutions of |x${sg(-a)}| = ${b}?`,2*a,[a,2*b,0],[`x${sg(-a)} = ${b} or x${sg(-a)} = −${b}`,`x = ${N(a+b)} or x = ${N(a-b)}. Sum = <b>${N(2*a)}</b>`]); },
 ()=>{ const lo=R(-9,0),hi=lo+R(4,12); const m=pick([2,3]); const c=R(-3,3); const L=m*lo+c, H=m*hi+c; const cnt=hi-lo; return P("Inequalities",`How many integers x satisfy ${N(L)} &lt; ${m}x${sg(c)} ≤ ${N(H)}?`,cnt,[cnt+1,cnt-1,H-L],[`Subtract ${N(c)}, divide by ${m}: ${N(lo)} &lt; x ≤ ${N(hi)}`,`Integers ${N(lo+1)} to ${N(hi)}: <b>${cnt}</b>`]); }],
chal:[
 ()=>{ const a=R(-5,3),b=a+R(1,6),c=(b-a)+2*R(1,4); return P("Absolute value",`What is the sum of all solutions of |x${sg(-a)}| + |x${sg(-b)}| = ${c}?`,a+b,[c,a+b+c,b-a],[`Since ${c} &gt; ${b-a} (the distance between ${N(a)} and ${N(b)}), there are two solutions, one on each side.`,`x = ${N((a+b+c)/2)} and x = ${N((a+b-c)/2)}`,`Sum = <b>${N(a+b)}</b>`]); },
 ()=>{ const a=pick([1,2,3]),b=nz(-4,4),p=a*R(-3,3),q=R(-6,6); const y0=q-(b/a)*p; return P("Perpendicular lines",`What is the y-intercept of the line through (${N(p)}, ${N(q)}) perpendicular to ${X(a)}${sg(b).replace(/(\d+)$/,"$1y")} = 7?`,y0,[q+(b/a)*p,q-(a/b)*p,-y0].map(x=>+x.toFixed(2)),[`Given slope = −${a}/${N(b)}, so the perpendicular slope is ${F(b,a)}.`,`b = ${N(q)} − (${F(b,a)})(${N(p)}) = <b>${N(y0)}</b>`]); },
 ()=>{ const k=R(-3,4); const c=k*k-2*k-1; return P("Piecewise",`f(x) = 2x + 1 for x &lt; ${N(k)} and f(x) = x${sq} − c for x ≥ ${N(k)}. What value of c makes f continuous?`,c,[k*k+2*k+1,-c,2*k+1],[`Both pieces must agree at x = ${N(k)}: ${N(2*k+1)} = ${N(k*k)} − c`,`c = <b>${N(c)}</b>`]); }]};

G["unit-2"]={sat:[
 ()=>{ const a=R(-5,5),b=nz(-5,5),c=R(-5,5),d=nz(-5,5); return P("Complex numbers",`(${N(a)} ${b<0?"−":"+"} ${Math.abs(b)}i)(${N(c)} ${d<0?"−":"+"} ${Math.abs(d)}i) = p + qi. What is p?`,a*c-b*d,[a*c+b*d,a*d+b*c,a*c],[`p = ac − bd, because i${sq} = −1.`,`p = ${N(a*c)} − (${N(b*d)}) = <b>${N(a*c-b*d)}</b>`]); },
 ()=>{ const a=R(-5,5),b=R(-9,9),k=nz(-3,3); const r=k**3+a*k+b; return P("Remainder theorem",`What is the remainder when x${cu}${a?sg(a)+"x":""}${sg(b)} is divided by x${sg(-k)}?`,r,[(-k)**3-a*k+b,b,r+k],[`Remainder = p(${N(k)})`,`${N(k**3)} + ${N(a*k)} + ${N(b)} = <b>${N(r)}</b>`]); },
 ()=>{ const n=pick([4,5,6]),k=nz(-3,3); const v=C(n,2)*k*k; return P("Binomial theorem",`What is the coefficient of x<sup>${n-2}</sup> in (x${sg(k)})<sup>${n}</sup>?`,v,[k*k,C(n,2)*k,n*k*k],[`Term: C(${n}, 2) · x<sup>${n-2}</sup> · (${N(k)})${sq}`,`${C(n,2)} · ${k*k} = <b>${N(v)}</b>`]); },
 ()=>{ const p=nz(-5,5),q=nz(-6,6); return P("Polynomials",`If (${X(p)}${sg(q)})${sq} = ax${sq} + bx + c, what is b?`,2*p*q,[p*q,q*q,p*p+q*q],[`(px + q)${sq} = p${sq}x${sq} + 2pqx + q${sq}`,`b = 2(${N(p)})(${N(q)}) = <b>${N(2*p*q)}</b>`]); }],
chal:[
 ()=>{ const n=pick([4,6,8,10]); const vals={4:-4,6:0,8:16,10:0}; return P("Complex numbers",`What is the real part of (1 + i)<sup>${n}</sup>?`,vals[n],[2**(n/2),-(2**(n/2)),n],[`(1 + i)${sq} = 2i`,`(1 + i)<sup>${n}</sup> = (2i)<sup>${n/2}</sup> = ${2**(n/2)} · i<sup>${n/2}</sup>`,`Real part: <b>${N(vals[n])}</b>`]); },
 ()=>{ const a=nz(-3,3),b=nz(-3,3),n=pick([3,4,5]); return P("Binomial theorem",`What is the sum of all the coefficients of (${X(a)}${sg(b)})<sup>${n}</sup>?`,(a+b)**n,[a**n+b**n,(a*b)**n,(a+b)*n],[`Set x = 1: the sum of coefficients is (${N(a)} + ${N(b)})<sup>${n}</sup>.`,`= <b>${N((a+b)**n)}</b>`]); },
 ()=>{ const r=nz(-6,6),s=nz(-6,6); const S=r+s,Pp=r*s; return P("Vieta",`The roots of x${sq}${sg(-S)}x${sg(Pp)} = 0 are r and s. What is r${sq} + s${sq}?`,S*S-2*Pp,[S*S,S*S+2*Pp,Pp*Pp],[`r + s = ${N(S)} and rs = ${N(Pp)}`,`r${sq} + s${sq} = (r + s)${sq} − 2rs = ${N(S*S)} − ${N(2*Pp)} = <b>${N(S*S-2*Pp)}</b>`]); },
 ()=>{ const m=R(1,4),n=nz(-6,6); const k=2*m*n; return P("Perfect squares",`For what positive value of k is ${m*m}x${sq} + kx + ${n*n} a perfect square trinomial?`,Math.abs(k),[m*n,m*m+n*n,2*Math.abs(n)],[`(${X(m)} + ${Math.abs(n)})${sq} = ${m*m}x${sq} + ${2*m*Math.abs(n)}x + ${n*n}`,`k = <b>${Math.abs(k)}</b>`]); }]};
G.factor={sat:[
 ()=>{ const a1=R(1,4),c1=nz(-5,5),a2=R(1,3),c2=nz(-5,5); const b=a1*c2+a2*c1; return P("Cross table",`If ${poly([a1*a2,b,c1*c2])} = (${X(a1)}${sg(c1)})(${X(a2)}${sg(c2)}), what is the value of ${a1*a2}·${N(c1*c2)} (the product ac)?`,a1*a2*c1*c2,[b,a1*a2+c1*c2,a1*c2*a2*c1+1],[`ac = ${a1*a2} · ${N(c1*c2)} = <b>${N(a1*a2*c1*c2)}</b>`,`Check: the cross products ${N(a1*c2)} and ${N(a2*c1)} multiply to ac and add to b = ${N(b)}.`]); },
 ()=>{ const a=R(1,4),p=nz(-6,6),q=nz(-6,6); const b=-a*(p+q),c=a*p*q; return P("Zeros",`What is the sum of the solutions of ${poly([a,b,c])} = 0?`,p+q,[p*q,-(p+q),b],[`${a>1?`Factor out ${a}: `:""}x${sq}${sg(-(p+q))}x${sg(p*q)} = (x${sg(-p)})(x${sg(-q)})`,`Solutions ${N(p)} and ${N(q)}. Sum = <b>${N(p+q)}</b>`]); }],
chal:[
 ()=>{ const r=nz(-4,4),s=nz(-4,4),t=nz(-4,4); const c=[1,-(r+s+t),r*s+r*t+s*t,-r*s*t]; return P("Ruffini",`P(x) = ${poly(c)} has three integer zeros. What is their product?`,r*s*t,[-(r*s*t),r+s+t,c[2]],[`Find one root by testing divisors of ${N(c[3])}, divide with Ruffini, factor the quadratic.`,`Zeros ${N(r)}, ${N(s)}, ${N(t)}: product <b>${N(r*s*t)}</b> (= −d for a monic cubic)`]); }]};

G["unit-3"]={sat:[
 ()=>{ const a=nz(-3,3),h=R(-4,4),k=R(-9,9); const b=-2*a*h,c=a*h*h+k; return P("Vertex",`The graph of y = ${poly([a,b,c])} has a vertex at (h, k). What is k?`,k,[c,h,-k],[`h = −b/(2a) = ${N(-b)}/${N(2*a)} = ${N(h)}`,`k = y(${N(h)}) = <b>${N(k)}</b>`]); },
 ()=>{ const b=R(-8,8),c=R(-9,9); const D=b*b-4*c; const v=D>0?2:D===0?1:0; return P("Discriminant",`How many distinct real solutions does x${sq}${sg(b)}x${sg(c)} = 0 have?`,v,[0,1,2].filter(x=>x!==v).concat([3]).slice(0,3),[`D = b${sq} − 4ac = ${N(b*b)} − ${N(4*c)} = ${N(D)}`,`D ${D>0?"&gt;":D===0?"=":"&lt;"} 0: <b>${v}</b>`]); },
 ()=>{ const m=R(1,4),h0=R(0,8)*10; const v=32*m; return P("Projectile",`h(t) = −16t${sq} + ${v}t + ${h0} gives a ball's height in feet. What is its maximum height?`,h0+16*m*m,[h0+32*m*m,16*m*m,h0+v*m],[`t = −b/(2a) = ${v}/32 = ${m}`,`h(${m}) = −16(${m*m}) + ${v*m} + ${h0} = <b>${h0+16*m*m}</b> ft`]); },
 ()=>{ const p=R(-6,6),q=R(-6,6); if(p===q) return G["unit-3"].sat[3](); return P("Zeros",`What is the distance between the x-intercepts of y = x${sq}${sg(-(p+q))}x${sg(p*q)}?`,Math.abs(p-q),[Math.abs(p+q),p*q,Math.abs(p-q)+1],[`y = (x${sg(-p)})(x${sg(-q)}): intercepts ${N(p)} and ${N(q)}`,`Distance = <b>${Math.abs(p-q)}</b>`]); }],
chal:[
 ()=>{ const m=2*nz(-4,4); const k=-((m/2)**2); return P("Tangent lines",`The line y = ${X(m)} + k is tangent to y = x${sq}. What is k?`,k,[(m/2)**2,m*m,-m],[`x${sq} = ${X(m)} + k → x${sq} − ${X(m)} − k = 0`,`Tangent ⇔ D = 0: ${N(m*m)} + 4k = 0`,`k = <b>${N(k)}</b>`]); },
 ()=>{ const n=R(2,8),L=8*n; return P("Optimization",`A farmer has ${L} m of fence for a rectangular pen along a straight wall (the wall is one side). What is the maximum area in m${sq}?`,L*L/8,[L*L/16,L*L/4,L*L/9].map(Math.round),[`Sides x, x and ${L} − 2x: A = x(${L} − 2x)`,`Max at x = ${L/4}: A = ${L/4} · ${L/2} = <b>${L*L/8}</b>`]); },
 ()=>{ const r=nz(-4,4),s=nz(-4,4),a=nz(-3,3),t=R(-3,5); const k=a*r*s, v=a*(t-r)*(t-s); return P("Writing equations",`A parabola has zeros ${N(r)} and ${N(s)} and passes through (0, ${N(k)}). What is its y-value at x = ${N(t)}?`,v,[(t-r)*(t-s),-v,k+t],[`y = a(x${sg(-r)})(x${sg(-s)}), and y(0) = a · ${N(r*s)} = ${N(k)}, so a = ${N(a)}.`,`y(${N(t)}) = ${N(a)}(${N(t-r)})(${N(t-s)}) = <b>${N(v)}</b>`]); }]};

G.systems={sat:[
 ()=>{ const ad=R(8,15),st=ad-R(2,6),A=R(20,80),S=R(20,80); const T=A+S,M=A*ad+S*st; return P("Word problems",`A theater sold ${T} tickets for $${M}. Adult tickets cost $${ad} and student tickets $${st}. How many adult tickets were sold?`,A,[S,T-A+1,Math.round(M/ad)],[`a + s = ${T} and ${ad}a + ${st}s = ${M}`,`${M} − ${st}·${T} = ${M-st*T} = ${ad-st}a, so a = <b>${A}</b>`]); },
 ()=>{ const x=R(-5,5),y=R(-5,5),a=nz(-4,4),b=nz(-4,4),c=nz(-4,4),d=nz(-4,4); if(a*d-b*c===0) return G.systems.sat[1](); return P("Elimination",`${X(a)}${sg(b).replace(/(\d+)$/,"$1y")} = ${N(a*x+b*y)} and ${X(c)}${sg(d).replace(/(\d+)$/,"$1y")} = ${N(c*x+d*y)}. What is x + y?`,x+y,[x-y,x*y,x+y+1],[`Solve: x = ${N(x)}, y = ${N(y)}`,`x + y = <b>${N(x+y)}</b>`]); },
 ()=>{ const t=pick([2,3,4]),b=R(1,5),m=t*R(1,5); return P("Number of solutions",`For what value of a does ax + ${b}y = 5 and ${m}x + ${b*t}y = 7 have no solution?`,m/t,[m,m*t,b],[`No solution: the same slope, different intercepts. Coefficients must be proportional: ${b*t}/${b} = ${t}.`,`a = ${m}/${t} = <b>${N(m/t)}</b>`]); }],
chal:[
 ()=>{ const S=pick([[2,4,8,"kx + 2y = 4 and 8x + ky = 8"],[3,6,12,"kx + 3y = 6 and 12x + ky = 12"],[1,2,4,"x + ky = 3 and kx + 4y = 6"]]); const kk=S[0]===1?2:S[0]===2?4:6; const inf=Math.random()<.5;
   return P("Parameters",`${S[3]}. For what value of k does the system have ${inf?"infinitely many solutions":"no solution"}?`,inf?kk:-kk,[inf?-kk:kk,0,kk*2],[`D = 0 gives k = ±${kk}.`,`k = ${kk}: the equations are multiples, the same line. k = −${kk}: parallel lines.`,`<b>k = ${N(inf?kk:-kk)}</b>`]); },
 ()=>{ const x=R(-5,6),y=R(-5,6),z=R(-5,6); return P("3 × 3 systems",`x + y = ${N(x+y)}, y + z = ${N(y+z)}, x + z = ${N(x+z)}. What is x?`,x,[y,z,(x+y+z)],[`Add all three: 2(x + y + z) = ${N(2*(x+y+z))}, so x + y + z = ${N(x+y+z)}.`,`x = ${N(x+y+z)} − (y + z) = <b>${N(x)}</b>`]); },
 ()=>{ const k=R(1,9); const v=k*k<50?2:0; return P("Nonlinear",`How many points do the line y = x + ${k} and the circle x${sq} + y${sq} = 25 have in common?`,v,[1,v===2?0:2,4],[`Distance from (0, 0) to the line: ${k}/√2 ≈ ${(k/Math.SQRT2).toFixed(2)}`,`Compared with r = 5: ${v===2?"less, so 2 points":"more, so 0 points"}. <b>${v}</b>`]); }]};

G["unit-4"]={sat:[
 ()=>{ const a=nz(-5,5),b=nz(-5,5),c=nz(-5,5); return P("Zeros",`What is the sum of the zeros of p(x) = (x${sg(-a)})(x${sg(-b)})(x${sg(c)})?`,a+b-c,[a+b+c,-(a+b-c),a*b*c],[`Zeros: ${N(a)}, ${N(b)}, ${N(-c)}`,`Sum = <b>${N(a+b-c)}</b>`]); },
 ()=>{ const lc=pick([-3,-2,2,3]),n=pick([3,4,5,6]); const up=(lc>0)===true, odd=n%2===1; const right=lc>0?"∞":"−∞", left=odd?(lc>0?"−∞":"∞"):right; return PS("End behavior",`p(x) = ${N(lc)}x<sup>${n}</sup> + 3x${sq} − 1. As x → −∞, p(x) → ?`,left,[left==="∞"?"−∞":"∞","0","3"],[`Degree ${n} (${odd?"odd":"even"}), leading coefficient ${lc>0?"positive":"negative"}.`,`As x → −∞: <b>${left}</b>`]); },
 ()=>{ const k=nz(-3,3),a=R(-5,5); const r=k**3+a*k*k-4; return P("Remainder theorem",`When p(x) = x${cu} + ax${sq} − 4 is divided by x${sg(-k)}, the remainder is ${N(r)}. What is a?`,a,[-a,r,a+1],[`p(${N(k)}) = ${N(k**3)} + ${N(k*k)}a − 4 = ${N(r)}`,`${N(k*k)}a = ${N(r-k**3+4)}, so a = <b>${N(a)}</b>`]); }],
chal:[
 ()=>{ const r=nz(-4,4),a=R(-3,3),b=R(1,4); const c=-r*(a*a+b*b); return P("Complex zeros",`A monic cubic with real coefficients has zeros ${N(r)} and ${N(a)} + ${b}i. What is its constant term?`,c,[r*(a*a+b*b),-r*(a*a-b*b),a*a+b*b],[`${N(a)} − ${b}i is also a zero. (x − (${N(a)} + ${b}i))(x − (${N(a)} − ${b}i)) = x${sq} − ${N(2*a)}x + ${a*a+b*b}`,`Constant = −(${N(r)})(${a*a+b*b}) = <b>${N(c)}</b>`]); },
 ()=>{ const fs=[[1,R(1,3)],[-2,R(1,3)],[4,R(1,3)],[-5,R(1,3)]].slice(0,R(3,4)); const v=fs.filter(f=>f[1]%2===1).length; return P("Multiplicity",`p(x) = ${fs.map(([r,m])=>`(x${sg(-r)})${m>1?`<sup>${m}</sup>`:""}`).join("")}. At how many x-intercepts does the graph cross the x-axis?`,v,[fs.length,fs.length-v,v+1].filter(x=>x!==v),[`It crosses where the multiplicity is odd.`,fs.map(([r,m])=>`x = ${N(r)}: ${m}`).join(", "),`<b>${v}</b>`]); },
 ()=>{ const a=pick([1,2,3,4,6]),d=pick([2,3,4,6,8,10,12]); const set=new Set(); const dv=n=>{const o=[];for(let i=1;i<=n;i++) if(n%i===0) o.push(i); return o;}; dv(d).forEach(p=>dv(a).forEach(q=>set.add((p/q).toFixed(6)))); const v=2*set.size; return P("Rational roots",`How many different possible rational zeros ±p/q does ${a===1?"":a}x${cu} − 5x${sq} + x + ${d} have?`,v,[v/2,dv(d).length*dv(a).length*2,v+2],[`p divides ${d}: ${dv(d).join(", ")}. q divides ${a}: ${dv(a).join(", ")}.`,`Distinct values of p/q: ${set.size}, each with ±: <b>${v}</b>`]); }]};
G.poly=G["unit-4"];

G["unit-5"]={sat:[
 ()=>{ const P2=pick([[3,6],[4,12],[6,12],[10,15],[12,24],[2,3],[6,3]]); const v=P2[0]*P2[1]/(P2[0]+P2[1]); return P("Work rates",`Pipe A fills a tank in ${P2[0]} hours and pipe B in ${P2[1]} hours. How many hours together?`,v,[(P2[0]+P2[1])/2,P2[0]+P2[1],Math.abs(P2[0]-P2[1])].map(x=>+x.toFixed(2)),[`1/${P2[0]} + 1/${P2[1]} = ${F(P2[0]+P2[1],P2[0]*P2[1])} of the tank per hour`,`Time = ${F(P2[0]*P2[1],P2[0]+P2[1])} = <b>${N(v)}</b> h`]); },
 ()=>{ const a=nz(-6,6); return P("Holes",`f(x) = (x${sg(-a)})/(x${sq} − ${a*a}). What is the x-coordinate of the hole in the graph?`,a,[-a,a*a,0],[`x${sq} − ${a*a} = (x${sg(-a)})(x${sg(a)})`,`The factor x${sg(-a)} cancels: hole at <b>x = ${N(a)}</b>, asymptote at x = ${N(-a)}.`]); },
 ()=>{ const k=R(1,4),x=(k+1)*R(1,5); const m=k*x/(k+1); return P("Rational equations",`Solve: 1/x + 1/(${k}x) = 1/${m}`,x,[m,x/(k+1),m*(k+1)],[`LCD ${k}x: ${k} + 1 = ${k}x/${m}`,`x = ${m}(${k+1})/${k} = <b>${x}</b>`]); }],
chal:[
 ()=>{ const a=R(1,6),b=R(1,6),c=R(-5,5); return PF("Asymptotes",`What is the horizontal asymptote of f(x) = (${a}x${sq}${sg(c)})/(${b}x${sq} + 1)? Give y.`,a,b,[F(b,a),"0",N(c)],[`Same degree on top and bottom: y = ratio of leading coefficients.`,`y = <b>${F(a,b)}</b>`]); },
 ()=>{ const a=nz(-7,7); return P("Extraneous solutions",`Solve: x${sq}/(x${sg(-a)}) = ${a*a}/(x${sg(-a)})`,-a,[a,0,a*a],[`x${sq} = ${a*a}, so x = ±${Math.abs(a)}.`,`x = ${N(a)} makes the denominator 0: reject. <b>x = ${N(-a)}</b>`]); },
 ()=>{ const a=R(-6,6),b=R(-6,6); if(a===b) return G["unit-5"].chal[2](); return P("Inequalities",`How many integers satisfy (x${sg(-a)})/(x${sg(-b)}) ≤ 0?`,Math.abs(a-b),[Math.abs(a-b)+1,Math.abs(a-b)-1,0],[`Critical values ${N(a)} (included, numerator 0) and ${N(b)} (excluded).`,`Integers ${a>b?`from ${N(b+1)} to ${N(a)}`:`from ${N(a)} to ${N(b-1)}`}: <b>${Math.abs(a-b)}</b>`]); }]};

G["unit-6"]={sat:[
 ()=>{ const k=R(2,9),m=pick([2,3,5,6,7]); return P("Radicals",`√${k*k*m} = k√${m}. What is k?`,k,[k*k,k*m,m],[`${k*k*m} = ${k*k} · ${m}`,`√${k*k} = <b>${k}</b>`]); },
 ()=>{ const a=R(-9,9),b=R(1,8); return P("Radical equations",`Solve √(x${sg(a)}) = ${b}`,b*b-a,[b-a,b*b+a,b*b],[`Square: x${sg(a)} = ${b*b}`,`x = <b>${N(b*b-a)}</b>`]); },
 ()=>{ const n=R(2,5),p=pick([[2,3],[4,3],[3,2],[5,3]]); const ok=p[1]===2?[4,9,16,25]:[8,27,64,125]; const base=p[1]===2?n*n:n**3; return P("Rational exponents",`What is ${base}<sup>${p[0]}/${p[1]}</sup>?`,n**p[0],[base*p[0]/p[1],n**p[1],n*p[0]].map(x=>+x.toFixed(2)),[`${base}<sup>1/${p[1]}</sup> = ${n}`,`${n}<sup>${p[0]}</sup> = <b>${N(n**p[0])}</b>`]); }],
chal:[
 ()=>{ const x0=R(2,9),b=R(0,x0-1),s=x0-b,a=s*s-x0; const x1=2*b+1-x0; const ok1=x1-b>=0&&Math.abs(Math.sqrt(x1+a)-(x1-b))<1e-9; const v=x0+(ok1&&x1!==x0?x1:0); return P("Extraneous solutions",`What is the sum of all real solutions of √(x${sg(a)}) = x${sg(-b)}?`,v,[x0+x1,x1,x0+1].filter(z=>z!==v),[`Square: x${sg(a)} = x${sq} − ${2*b}x + ${b*b}, so x${sq} − ${2*b+1}x + ${b*b-a} = 0.`,`x = ${N(x0)} or x = ${N(x1)}.`,`Check: ${ok1&&x1!==x0?"both work":`x = ${N(x1)} gives a negative right side, reject`}. Sum = <b>${N(v)}</b>`]); },
 ()=>{ const k=pick([3,5,7,9,11]); return P("Inverses",`f(x) = 2x + 3 and g(x) = x${sq}. What is f<sup>−1</sup>(g(${k}))?`,(k*k-3)/2,[2*k*k+3,(k-3)/2,k*k],[`g(${k}) = ${k*k}`,`f<sup>−1</sup>(x) = (x − 3)/2, so f<sup>−1</sup>(${k*k}) = <b>${N((k*k-3)/2)}</b>`]); },
 ()=>{ const t=R(2,4),mn=pick([[3,2],[2,3],[5,2],[4,3]]); const xv=t**mn[1], c=t**mn[0]; return P("Rational exponents",`What is the positive solution of x<sup>${mn[0]}/${mn[1]}</sup> = ${c}?`,xv,[c**(mn[0]/mn[1]),t,c/ mn[0]].map(x=>+x.toFixed(2)),[`Raise both sides to the ${mn[1]}/${mn[0]} power.`,`x = ${c}<sup>${mn[1]}/${mn[0]}</sup> = ${t}<sup>${mn[1]}</sup> = <b>${xv}</b>`]); }]};

G["unit-7"]={sat:[
 ()=>{ const P0=R(2,9)*100,d=R(2,8),n=R(2,5); return P("Exponential growth",`A population of ${P0} doubles every ${d} years. What is it after ${d*n} years?`,P0*2**n,[P0*2*n,P0*n*n,P0*2**(n-1)],[`${d*n} years = ${n} doublings`,`${P0} · 2<sup>${n}</sup> = <b>${N(P0*2**n)}</b>`]); },
 ()=>{ const b=R(2,5),x=nz(-4,5); const a=(b-1)*x; return P("Same base",`Solve 2<sup>x${sg(a)}</sup> = 2<sup>${b}x</sup>`,x,[a,-x,a/b].map(z=>+z.toFixed(2)),[`x${sg(a)} = ${b}x`,`${N(a)} = ${b-1}x, so x = <b>${N(x)}</b>`]); },
 ()=>{ const b=pick([2,3,5]),k=R(1,4),m=R(-2,4); return P("Logarithms",`What is log<sub>${b}</sub>(${b**k} · ${b}<sup>${m}</sup>)?`,k+m,[k*m,b**k*m,k-m],[`${b**k} = ${b}<sup>${k}</sup>`,`log<sub>${b}</sub>(${b}<sup>${k+m}</sup>) = <b>${k+m}</b>`]); },
 ()=>{ const a=R(2,9)*10,r=pick([2,3]); return P("Models",`f(0) = ${a} and f(1) = ${a*r} for an exponential function f(t) = ab<sup>t</sup>. What is f(3)?`,a*r**3,[a*3*r,a+3*(a*r-a),a*r*r],[`b = ${a*r}/${a} = ${r}`,`f(3) = ${a} · ${r}${cu} = <b>${N(a*r**3)}</b>`]); }],
chal:[
 ()=>{ const p=R(2,5),q=R(0,p-1); const x=2**p,k=2**p-2**q,m=p+q; return P("Log equations",`Solve log₂ x + log₂(x − ${k}) = ${m}`,x,[2**q,x+k,m],[`log₂(x(x − ${k})) = ${m}, so x(x − ${k}) = ${2**m}`,`x = ${x} (the other root is negative, rejected): <b>${x}</b>`]); },
 ()=>{ const a=R(2,5),b=R(a+1,8); return P("Quadratic form",`What is the sum of the solutions of e<sup>2x</sup> − ${a+b}e<sup>x</sup> + ${a*b} = 0? (Give a decimal.)`,Math.log(a*b),[Math.log(a+b),a+b,Math.log(a)*Math.log(b)].map(x=>+x.toFixed(3)),[`u = e<sup>x</sup>: (u − ${a})(u − ${b}) = 0`,`x = ln ${a} or ln ${b}. Sum = ln ${a*b} ≈ <b>${Math.log(a*b).toFixed(3)}</b>`],{a:`ln ${a*b} ≈ ${Math.log(a*b).toFixed(3)}`,tol:.01}); },
 ()=>{ const h=R(2,12),n=R(2,5),A0=R(1,9)*32; return P("Half-life",`A substance has a half-life of ${h} days. How many days until ${A0} g decays to ${A0/2**n} g?`,n*h,[h*2**n,n+h,A0/2**n],[`${A0} → ${A0/2**n} is ${n} halvings`,`${n} · ${h} = <b>${n*h}</b> days`]); }]};

G["unit-8"]={sat:[
 ()=>{ const a=R(-9,9),d=nz(-5,6),n=R(10,40); return P("Arithmetic",`a₁ = ${N(a)} and d = ${N(d)}. What is a<sub>${n}</sub>?`,a+(n-1)*d,[a+n*d,a*d*(n-1),a+(n-2)*d],[`a<sub>${n}</sub> = a₁ + (n − 1)d`,`${N(a)} + ${n-1}(${N(d)}) = <b>${N(a+(n-1)*d)}</b>`]); },
 ()=>{ const a=R(1,6),r=pick([2,3,-2]),n=R(4,7); return P("Geometric",`a₁ = ${a}, r = ${N(r)}. What is a<sub>${n}</sub>?`,a*r**(n-1),[a*r**n,(a*r)**(n-1),a*r*(n-1)],[`a<sub>${n}</sub> = a₁ · r<sup>n − 1</sup>`,`${a} · (${N(r)})<sup>${n-1}</sup> = <b>${N(a*r**(n-1))}</b>`]); },
 ()=>{ const a=R(1,9),d=R(1,6),n=R(8,30); const S=n*(2*a+(n-1)*d)/2; return P("Arithmetic series",`What is the sum of the first ${n} terms of ${a}, ${a+d}, ${a+2*d}, …?`,S,[n*(a+(n-1)*d),S+n,n*(2*a+n*d)/2],[`a<sub>${n}</sub> = ${a+(n-1)*d}`,`S = ${n}(${a} + ${a+(n-1)*d})/2 = <b>${N(S)}</b>`]); }],
chal:[
 ()=>{ const k=pick([2,3,4,5]),a=(k-1)*R(1,8); return P("Infinite series",`What is the sum of ${a} + ${F(a,k)} + ${F(a,k*k)} + …?`,a*k/(k-1),[a*k,a/(k-1),a*(k-1)/k].map(x=>+x.toFixed(2)),[`r = 1/${k}, |r| &lt; 1: converges`,`S = ${a}/(1 − 1/${k}) = <b>${N(a*k/(k-1))}</b>`]); },
 ()=>{ const a1=R(-10,10),d=nz(-5,5),p=R(2,6),q=p+R(3,8),n=q+R(5,20); return P("Arithmetic",`In an arithmetic sequence a<sub>${p}</sub> = ${N(a1+(p-1)*d)} and a<sub>${q}</sub> = ${N(a1+(q-1)*d)}. What is a<sub>${n}</sub>?`,a1+(n-1)*d,[a1+n*d,a1+(n-1)*d+d,a1],[`d = (${N(a1+(q-1)*d)} − ${N(a1+(p-1)*d)})/(${q} − ${p}) = ${N(d)}`,`a<sub>${n}</sub> = a<sub>${q}</sub> + ${n-q}d = <b>${N(a1+(n-1)*d)}</b>`]); },
 ()=>{ const a=nz(-4,5),b=R(-6,6),n=R(5,20); const S=a*n*(n+1)/2+b*n; return P("Sigma",`Σ<sub>k=1</sub><sup>${n}</sup> (${X(a,"k")}${sg(b)}) = ?`,S,[a*n*(n+1)/2,S+b,a*n*n+b*n],[`${N(a)} · Σk + ${N(b)} · ${n}`,`${N(a)} · ${n*(n+1)/2} + ${N(b*n)} = <b>${N(S)}</b>`]); }]};

const TR=[[3,4,5],[5,12,13],[8,15,17],[7,24,25]];
G["unit-9"]={sat:[
 ()=>{ const [a,b,c]=pick(TR); return PF("Right triangles",`In right triangle ABC, sin A = ${a}/${c}. What is cos A?`,b,c,[F(a,b),F(c,b),F(a,c)],[`Opposite ${a}, hypotenuse ${c}, so adjacent = √(${c*c} − ${a*a}) = ${b}.`,`cos A = <b>${F(b,c)}</b>`]); },
 ()=>{ const d=pick([30,45,60,120,135,150,210,240,300,330]); return PF("Radians",`${d}° = kπ radians. What is k?`,d,180,[F(180,d),F(d,360),F(d,90)],[`k = ${d}/180`,`= <b>${F(d,180)}</b>`]); },
 ()=>{ const a=R(5,80); return P("Complementary angles",`sin(${a}°) = cos(b°) with 0 &lt; b &lt; 90. What is b?`,90-a,[a,180-a,90+a],[`sin x = cos(90° − x)`,`b = <b>${90-a}</b>`]); },
 ()=>{ const r=R(2,12),d=pick([30,45,60,90,120,180]); return PF("Arc length",`A circle has radius ${r}. A ${d}° central angle cuts an arc of length kπ. What is k?`,r*d,180,[F(r*d,360),F(d,180),N(r*d)],[`θ = ${F(d,180)}π`,`s = rθ = ${r} · ${F(d,180)}π, so k = <b>${F(r*d,180)}</b>`]); }],
chal:[
 ()=>{ const A=nz(-6,6),Cc=R(-5,5),B=R(1,4); return P("Sinusoids",`y = ${N(A)}sin(${B}x)${sg(Cc)}. What is (max − min)?`,2*Math.abs(A),[Math.abs(A),2*Math.abs(A)+2*Cc,Math.abs(A)+Cc],[`Max = ${Math.abs(A)+Cc}, min = ${-Math.abs(A)+Cc}`,`Difference = 2|A| = <b>${2*Math.abs(A)}</b>`]); },
 ()=>{ const S=pick([["2sin²x = 1",4,"sin x = ±√2/2: 45°, 135°, 225°, 315°"],["sin x(2cos x − 1) = 0",4,"sin x = 0: 0°, 180°; cos x = 1/2: 60°, 300°"],["2cos²x − cos x − 1 = 0",3,"(2cos x + 1)(cos x − 1) = 0: 0°, 120°, 240°"],["tan²x = 3",4,"tan x = ±√3: 60°, 120°, 240°, 300°"]]); return P("Trig equations",`How many solutions does ${S[0]} have on 0° ≤ x &lt; 360°?`,S[1],[S[1]-1,S[1]+1,2].filter(x=>x!==S[1]),[S[2],`<b>${S[1]}</b> solutions`]); },
 ()=>{ const [a,b,c]=pick(TR); return PF("Identities",`sin θ = ${a}/${c} and θ is in Quadrant II. What is tan θ?`,-a,b,[F(a,b),F(-b,a),F(-a,c)],[`cos θ = −${b}/${c} in QII`,`tan θ = sin/cos = <b>${F(-a,b)}</b>`]); }]};

G["unit-10"]={sat:[
 ()=>{ const n=R(6,12),k=R(2,4); return P("Combinations",`How many ways can a committee of ${k} be chosen from ${n} people?`,C(n,k),[C(n,k)*fact(k),n*k,C(n,k-1)],[`Order doesn't matter: C(${n}, ${k})`,`= <b>${N(C(n,k))}</b>`]); },
 ()=>{ const r=R(2,6),b=R(2,8),n=r+b; return PF("Probability",`A bag has ${r} red and ${b} blue marbles. Two are drawn without replacement. P(both red)?`,r*(r-1),n*(n-1),[F(r*r,n*n),F(r,n),F(r*(r-1),n*n)],[`${r}/${n} · ${r-1}/${n-1}`,`= <b>${F(r*(r-1),n*(n-1))}</b>`]); },
 ()=>{ const k=pick([4,5,8,10]),W=R(2,10)*k,L=R(1,5); const ev=W/k-L*(k-1)/k; return P("Expected value",`You win $${W} with probability 1/${k} and lose $${L} otherwise. What is the expected value in dollars?`,ev,[W/k,W-L,(W-L)/k].map(x=>+x.toFixed(2)),[`EV = ${W}(1/${k}) − ${L}(${k-1}/${k})`,`= <b>${N(ev)}</b>`]); }],
chal:[
 ()=>{ const n=pick([2,3,4]); return PF("At least one",`A die is rolled ${n} times. P(at least one 6)?`,6**n-5**n,6**n,[F(n,6),F(5**n,6**n),F(1,6**n)],[`P(no 6) = (5/6)<sup>${n}</sup> = ${F(5**n,6**n)}`,`1 − ${F(5**n,6**n)} = <b>${F(6**n-5**n,6**n)}</b>`]); },
 ()=>{ const n=R(4,8); return P("Arrangements",`${n} people sit in a row. Two of them must sit next to each other. How many arrangements?`,2*fact(n-1),[fact(n-1),fact(n),2*fact(n)],[`Glue the pair into one block: ${n-1}! arrangements.`,`The pair can swap: 2 · ${n-1}! = <b>${N(2*fact(n-1))}</b>`]); },
 ()=>{ const b=pick([40,50,60,80]),ab=pick([10,20,30].filter(x=>x<b)); return PF("Conditional",`P(B) = ${b}% and P(A and B) = ${ab}%. What is P(A | B)?`,ab,b,[F(ab,100),F(b,ab),F(ab*b,10000)],[`P(A | B) = P(A and B)/P(B)`,`${ab}/${b} = <b>${F(ab,b)}</b>`]); }]};

G["unit-11"]={sat:[
 ()=>{ const h=R(-6,6),k=R(-6,6),r=R(1,9); const D=-2*h,E=-2*k,Fc=h*h+k*k-r*r; return P("Circles",`What is the radius of x${sq} + y${sq}${D?sg(D)+"x":""}${E?sg(E)+"y":""}${Fc?sg(Fc):""} = 0?`,r,[r*r,Math.abs(Fc),h+k].filter(x=>x!==r),[`Complete the square: (x${sg(-h)})${sq} + (y${sg(-k)})${sq} = ${h*h+k*k-Fc}`,`r = √${r*r} = <b>${r}</b>`]); },
 ()=>{ const h=R(-5,5),k=R(-5,5),x=R(-5,5),y=R(-5,5); const v=(x-h)**2+(y-k)**2; if(!v) return G["unit-11"].sat[1](); return P("Circles",`A circle has center (${N(h)}, ${N(k)}) and passes through (${N(x)}, ${N(y)}). What is r${sq}?`,v,[Math.round(Math.sqrt(v)),Math.abs(x-h)+Math.abs(y-k),v+1],[`r${sq} = (${N(x)} − ${N(h)})${sq} + (${N(y)} − ${N(k)})${sq}`,`= <b>${v}</b>`]); },
 ()=>{ const a=R(2,9),b=R(2,9); if(a===b) return G["unit-11"].sat[2](); return P("Ellipses",`What is the length of the major axis of x${sq}/${a*a} + y${sq}/${b*b} = 1?`,2*Math.max(a,b),[Math.max(a,b),2*Math.min(a,b),a*a+b*b],[`Semi-axes ${a} and ${b}`,`Major axis = 2 · ${Math.max(a,b)} = <b>${2*Math.max(a,b)}</b>`]); }],
chal:[
 ()=>{ const [a,b,c]=pick(TR); return P("Hyperbolas",`What is the distance between the foci of x${sq}/${a*a} − y${sq}/${b*b} = 1?`,2*c,[c,2*Math.sqrt(Math.abs(a*a-b*b)),a+b].map(x=>+x.toFixed(2)),[`c${sq} = a${sq} + b${sq} = ${a*a+b*b}, so c = ${c}.`,`Distance = 2c = <b>${2*c}</b>`]); },
 ()=>{ const [b,c,a]=pick(TR); return P("Ellipses",`What is the distance between the foci of x${sq}/${a*a} + y${sq}/${b*b} = 1?`,2*c,[c,2*a,2*b],[`c${sq} = a${sq} − b${sq} = ${a*a-b*b}, so c = ${c}.`,`Distance = 2c = <b>${2*c}</b>`]); },
 ()=>{ const k=pick([4,8,12,16,20,2,6]); return P("Parabolas",`What is the y-coordinate of the focus of y = x${sq}/${k}?`,k/4,[k,4/k,k/2].map(x=>+x.toFixed(2)),[`x${sq} = 4py with 4p = ${k}`,`p = <b>${N(k/4)}</b>, focus (0, ${N(k/4)})`]); }]};

/* ----- new unit 12: Statistics & Probability for the SAT ----- */
G["unit-12"]={sat:[
 ()=>{ const n=R(4,8),m=R(70,90),x=R(60,100); const v=(n*m+x)/(n+1); if(!Number.isInteger(v)) return G["unit-12"].sat[0](); return P("Mean",`The mean of ${n} test scores is ${m}. After a ${n+1}th test, the mean is the new value M. The new score is ${x}. What is M?`,v,[(m+x)/2,m+(x-m)/n,(n*m+x)/n].map(z=>+z.toFixed(2)),[`Old total = ${n} · ${m} = ${n*m}`,`(${n*m} + ${x}) ÷ ${n+1} = <b>${N(v)}</b>`]); },
 ()=>{ const d=shuffle([R(1,9),R(10,19),R(20,29),R(30,39),R(40,49),R(50,59),R(60,69)].slice(0,pick([5,7]))); const s=[...d].sort((a,b)=>a-b); const med=s[(s.length-1)/2]; return P("Median",`What is the median of ${d.join(", ")}?`,med,[d[(d.length-1)/2],s[0]+s[s.length-1]>>1,s.reduce((a,b)=>a+b)/s.length].map(z=>+z.toFixed(1)),[`Sort: ${s.join(", ")}`,`Middle value: <b>${med}</b>`]); },
 ()=>{ const old=R(4,20)*5,p=pick([10,20,25,40,50,15]); const up=Math.random()<.6; const nw=old*(1+(up?p:-p)/100); return P("Percents",`A price changes from $${old} to $${N(nw)}. What is the percent ${up?"increase":"decrease"}?`,p,[Math.abs(nw-old),Math.round(Math.abs(nw-old)/nw*100),p*2],[`Change = ${N(Math.abs(nw-old))}`,`${N(Math.abs(nw-old))} ÷ ${old} = ${p/100} = <b>${p}%</b>`],{a:p+"%"}); },
 ()=>{ const p=pick([10,20,25,30,50]); const v=100*(1+p/100)*(1-p/100); return P("Percents",`A price rises ${p}% and then falls ${p}%. The final price is what percent of the original?`,v,[100,100-p,100+p/2],[`× ${1+p/100} × ${1-p/100} = ${(1+p/100)*(1-p/100)}`,`<b>${N(v)}%</b>, not 100%`],{a:N(v)+"%"}); },
 ()=>{ const a=R(10,40),b=R(10,40),c=R(10,40),d=R(10,40); const tot=a+b+c+d; return PF("Two-way tables",`Survey: Juniors: ${a} yes, ${b} no. Seniors: ${c} yes, ${d} no. A student who said yes is chosen at random. P(senior)?`,c,a+c,[F(c,tot),F(c,c+d),F(a,a+c)],[`Given "yes": the denominator is all yes = ${a+c}.`,`P = ${c}/${a+c} = <b>${F(c,a+c)}</b>`]); },
 ()=>{ const p=R(40,60),moe=pick([2,3,4,5]); return P("Margin of error",`A poll estimates ${p}% with a margin of error of ${moe}%. What is the largest plausible value of the true percent?`,p+moe,[p,p-moe,p+2*moe],[`Interval: ${p} ± ${moe} = ${p-moe}% to ${p+moe}%`,`Largest: <b>${p+moe}%</b>`],{a:(p+moe)+"%"}); },
 ()=>{ const m=pick([1.5,2,2.5,3,4]),b=R(5,20),x=R(2,10),res=R(-4,4); const pred=m*x+b; return P("Scatterplots",`The line of best fit is y = ${m}x + ${b}. A data point is (${x}, ${N(pred+res)}). What is its residual (actual − predicted)?`,res,[-res,pred,pred+res],[`Predicted: ${m}(${x}) + ${b} = ${N(pred)}`,`Residual = ${N(pred+res)} − ${N(pred)} = <b>${N(res)}</b>`]); },
 ()=>{ const S=pick([["Students are randomly assigned to two study methods, and the method A group scores higher.","Method A probably causes higher scores for students like these",["Method A causes higher scores for all students everywhere","There is no association","Nothing can be concluded"]],["A random sample of 500 voters in a city is surveyed.","The results can be generalized to the city's voters",["The results apply to all U.S. voters","The results prove cause and effect","No conclusion is possible"]],["Researchers observe that people who sleep more have higher grades (no random assignment).","More sleep is associated with higher grades",["More sleep causes higher grades","Higher grades cause more sleep","There is no relationship"]]]); return PS("Studies",`${S[0]} Which conclusion is best supported?`,S[1],S[2],[`Random assignment → cause and effect. Random sampling → generalize to the population sampled. Neither → association only.`,`<b>${S[1]}</b>`]); },
 ()=>{ const base=[R(10,20),R(10,20),R(10,20),R(10,20),R(10,20)]; const k=R(2,9); return PS("Spread",`Every value in a data set is increased by ${k}. What happens to the standard deviation?`,"It stays the same",["It increases by "+k,"It doubles","It decreases by "+k],[`Adding a constant shifts every value: the mean goes up by ${k}, but the distances from the mean do not change.`,`<b>The SD stays the same.</b>`]); },
 ()=>{ const q1=R(10,20),q3=q1+R(5,15),mn=q1-R(2,8),mx=q3+R(2,10); return P("Box plots",`A box plot shows min ${mn}, Q1 ${q1}, median ${q1+R(1,q3-q1-1)}, Q3 ${q3}, max ${mx}. What is the IQR?`,q3-q1,[mx-mn,q3-mn,mx-q1],[`IQR = Q3 − Q1`,`${q3} − ${q1} = <b>${q3-q1}</b>`]); }],
chal:[
 ()=>{ const n1=R(10,30),m1=R(60,80),n2=R(10,30),m2=R(70,95); const v=(n1*m1+n2*m2)/(n1+n2); return P("Weighted mean",`Class A: ${n1} students, mean ${m1}. Class B: ${n2} students, mean ${m2}. What is the combined mean (to 2 decimals)?`,+v.toFixed(2),[(m1+m2)/2,+((m1*n2+m2*n1)/(n1+n2)).toFixed(2),m2].map(z=>+z.toFixed(2)),[`Total = ${n1}·${m1} + ${n2}·${m2} = ${n1*m1+n2*m2}`,`÷ ${n1+n2} = <b>${v.toFixed(2)}</b>`],{tol:.01}); },
 ()=>{ const n=pick([5,7,9]),vals=Array.from({length:n},()=>R(10,30)); const s=[...vals].sort((a,b)=>a-b); const big=R(80,150); const nv=[...s.slice(0,-1),big]; const mean=a=>a.reduce((p,c)=>p+c)/a.length; const d=mean(nv)-mean(s); return P("Outliers",`Data: ${s.join(", ")}. The largest value is changed to ${big}. By how much does the mean increase? (The median does not change.)`,+d.toFixed(2),[big-s[n-1],0,+(d*2).toFixed(2)],[`The total increases by ${big} − ${s[n-1]} = ${big-s[n-1]}.`,`Mean increases by ${big-s[n-1]}/${n} = <b>${N(+d.toFixed(2))}</b>`],{tol:.01}); },
 ()=>{ const p=pick([0.3,0.4,0.6,0.25]),q=pick([0.5,0.2,0.75]); const v=+(p*q).toFixed(4); return P("Conditional",`${p*100}% of students play a sport. Of those, ${q*100}% also play an instrument. What percent of all students play both?`,+(v*100).toFixed(2),[+(p+q)*50,q*100,p*100].map(z=>+z.toFixed(2)),[`P(both) = P(sport) · P(instrument | sport)`,`${p} · ${q} = ${v} → <b>${N(+(v*100).toFixed(2))}%</b>`],{a:N(+(v*100).toFixed(2))+"%"}); },
 ()=>{ const n1=pick([100,400,900]),f=pick([4]); return PS("Margin of error",`A survey of ${n1} people has margin of error 6%. About how many people are needed to cut it to 3%?`,`${n1*4}`,[`${n1*2}`,`${n1/2}`,`${n1*3}`],[`MOE ∝ 1/√n. Halving the MOE needs √n doubled, so n × 4.`,`<b>${n1*4}</b>`]); }]};

/* ----- new unit 13: Matrices ----- */
const FRX=(n,d)=>`<span class="frc"><span>${n}</span><span>${d}</span></span>`;
const MX=m=>`<span class="mx" style="--n:${(m[0]||[]).length}">${m.flat().map(v=>`<i>${N(v)}</i>`).join("")}</span>`;
const det2=m=>m[0][0]*m[1][1]-m[0][1]*m[1][0];
const det3=m=>m[0][0]*(m[1][1]*m[2][2]-m[1][2]*m[2][1])-m[0][1]*(m[1][0]*m[2][2]-m[1][2]*m[2][0])+m[0][2]*(m[1][0]*m[2][1]-m[1][1]*m[2][0]);
const rm=(r,c,a=-5,b=5)=>Array.from({length:r},()=>Array.from({length:c},()=>R(a,b)));
G["unit-13"]={sat:[
 ()=>{ const A=rm(2,2),B=rm(2,2),k=nz(-3,3); const i=R(0,1),j=R(0,1); const v=A[i][j]+k*B[i][j]; return P("Operations",`A = ${MX(A)}, B = ${MX(B)}. What is the entry in row ${i+1}, column ${j+1} of A + ${N(k)}B?`,v,[A[i][j]+B[i][j],k*(A[i][j]+B[i][j]),A[j][i]+k*B[j][i]],[`Entry = a<sub>${i+1}${j+1}</sub> + ${N(k)} · b<sub>${i+1}${j+1}</sub>`,`${N(A[i][j])} + ${N(k)}(${N(B[i][j])}) = <b>${N(v)}</b>`]); },
 ()=>{ const A=rm(2,2,-4,4),B=rm(2,2,-4,4),i=R(0,1),j=R(0,1); const v=A[i][0]*B[0][j]+A[i][1]*B[1][j]; return P("Multiplication",`A = ${MX(A)}, B = ${MX(B)}. What is the row ${i+1}, column ${j+1} entry of AB?`,v,[A[i][j]*B[i][j],A[0][j]*B[i][0]+A[1][j]*B[i][1],A[i][0]*B[j][0]+A[i][1]*B[j][1]],[`Row ${i+1} of A · column ${j+1} of B`,`${N(A[i][0])}·${N(B[0][j])} + ${N(A[i][1])}·${N(B[1][j])} = <b>${N(v)}</b>`]); },
 ()=>{ const A=rm(2,2,-6,6); return P("Determinants",`What is det ${MX(A)}?`,det2(A),[A[0][0]*A[1][1]+A[0][1]*A[1][0],-det2(A),A[0][0]+A[1][1]],[`ad − bc = ${N(A[0][0])}·${N(A[1][1])} − ${N(A[0][1])}·${N(A[1][0])}`,`= <b>${N(det2(A))}</b>`]); },
 ()=>{ const [r1,c1,c2]=shuffle([1,2,3,4,5]); return PS("Dimensions",`A is ${r1} × ${c1} and B is ${c1} × ${c2}. What are the dimensions of AB?`,`${r1} × ${c2}`,[`${c1} × ${c1}`,`${c2} × ${r1}`,`${r1} × ${c1}`],[`(${r1} × <u>${c1}</u>)(<u>${c1}</u> × ${c2}): the inner numbers match, the outer numbers give the size.`,`<b>${r1} × ${c2}</b>`]); }],
chal:[
 ()=>{ const A=rm(3,3,-3,3); return P("Determinants",`What is det ${MX(A)}?`,det3(A),[-det3(A),det3(A)+A[0][0],A[0][0]*A[1][1]*A[2][2]],[`Expand along row 1: a(ei − fh) − b(di − fg) + c(dh − eg)`,`= <b>${N(det3(A))}</b>`]); },
 ()=>{ let A; do{ A=rm(2,2,-5,5); }while(Math.abs(det2(A))!==1&&Math.abs(det2(A))!==2); const d=det2(A),i=R(0,1),j=R(0,1); const adj=[[A[1][1],-A[0][1]],[-A[1][0],A[0][0]]]; return PF("Inverses",`A = ${MX(A)}. What is the row ${i+1}, column ${j+1} entry of A<sup>−1</sup>?`,adj[i][j],d,[N(A[i][j]),F(A[i][j],d),F(-adj[i][j],d)],[`det A = ${N(d)}`,`A<sup>−1</sup> = (1/${N(d)}) ${MX(adj)}`,`Entry: <b>${F(adj[i][j],d)}</b>`]); },
 ()=>{ const k=nz(-6,6),a=nz(-4,4),b=nz(-4,4),c=nz(-4,4); return PF("Singular matrices",`For what k is ${MX([[a,b],[c,"k"]])} not invertible?`,b*c,a,[F(-b*c,a),N(a*b*c),F(a,b*c)],[`Not invertible ⇔ det = 0: ${N(a)}k − ${N(b*c)} = 0`,`k = <b>${F(b*c,a)}</b>`]); },
 ()=>{ const v=[R(-5,5),R(-5,5),R(-5,5)],h=[R(-5,5),R(-5,5),R(-5,5)]; const area=Math.abs((v[1]-v[0])*(h[2]-h[0])-(v[2]-v[0])*(h[1]-h[0]))/2; if(!area) return G["unit-13"].chal[3](); return P("Area",`Use a determinant to find the area of the triangle with vertices (${v[0]}, ${h[0]}), (${v[1]}, ${h[1]}), (${v[2]}, ${h[2]}).`,area,[area*2,area/2,area+1],[`Area = ½|det| of the 3 × 3 matrix with rows (x, y, 1).`,`= <b>${N(area)}</b>`]); }]};

/* ----- new unit 14: Mathematical Induction ----- */
const PS4=n=>n*(n+1)*(2*n+1)*(3*n*n+3*n-1)/30;
G["unit-14"]={sat:[
 ()=>{ const n=R(10,60); return P("Power sums",`1 + 2 + 3 + … + ${n} = ?`,n*(n+1)/2,[n*n/2,n*(n-1)/2,n*(n+1)],[`Σk = n(n + 1)/2`,`${n} · ${n+1}/2 = <b>${N(n*(n+1)/2)}</b>`]); },
 ()=>{ const n=R(5,20); return P("Power sums",`1${sq} + 2${sq} + … + ${n}${sq} = ?`,n*(n+1)*(2*n+1)/6,[(n*(n+1)/2)**2,n*n*n/3,n*(n+1)*(2*n+1)/3],[`Σk${sq} = n(n + 1)(2n + 1)/6`,`${n}·${n+1}·${2*n+1}/6 = <b>${N(n*(n+1)*(2*n+1)/6)}</b>`]); },
 ()=>{ const n=R(4,15); return P("Power sums",`1${cu} + 2${cu} + … + ${n}${cu} = ?`,(n*(n+1)/2)**2,[n*(n+1)*(2*n+1)/6,n**4/4,n*(n+1)/2],[`Σk${cu} = [n(n + 1)/2]${sq}`,`${n*(n+1)/2}${sq} = <b>${N((n*(n+1)/2)**2)}</b>`]); },
 ()=>{ const S=pick([["1 + 3 + 5 + … + (2n − 1) = n"+sq,"1 + 3 + … + (2k − 1) + (2k + 1) = (k + 1)"+sq,"1 + 3 + … + (2k − 1) = k"+sq,"2k + 1","k"+sq+" + 2k + 1 = (k + 1)"+sq],["2 + 4 + … + 2n = n(n + 1)","2 + 4 + … + 2k + 2(k + 1) = (k + 1)(k + 2)","2 + 4 + … + 2k = k(k + 1)","2(k + 1)","k(k + 1) + 2(k + 1) = (k + 1)(k + 2)"],["1 + 2 + 4 + … + 2<sup>n−1</sup> = 2<sup>n</sup> − 1","1 + 2 + … + 2<sup>k−1</sup> + 2<sup>k</sup> = 2<sup>k+1</sup> − 1","1 + 2 + … + 2<sup>k−1</sup> = 2<sup>k</sup> − 1","2<sup>k</sup>","2<sup>k</sup> − 1 + 2<sup>k</sup> = 2<sup>k+1</sup> − 1"]]);
   return PS("Induction steps",`To prove ${S[0]}, you assume it for n = k. What must you show next?`,S[1],[S[2]+" (that's the assumption)",`${S[3]} = ${S[1].split(" = ")[1]}`,"The formula for n = 1 (that's the base case)"],[`Inductive step: add the next term, ${S[3]}, and show the formula holds for n = k + 1.`,`${S[4]} ✓`]); },
 ()=>{ const a=pick([4,5,7]),b=1,n=R(2,6); const v=a**n-1; return P("Divisibility",`Induction shows ${a}<sup>n</sup> − 1 is always divisible by some number d. What is the largest such d (for all n)?`,a-1,[a,a+1,v],[`n = 1: ${a} − 1 = ${a-1}.`,`${a}<sup>k+1</sup> − 1 = ${a}(${a}<sup>k</sup> − 1) + ${a-1}: both parts are multiples of ${a-1}. <b>d = ${a-1}</b>`]); }],
chal:[
 ()=>{ const n=R(3,10); return P("Power sums",`1<sup>4</sup> + 2<sup>4</sup> + … + ${n}<sup>4</sup> = ?`,PS4(n),[(n*(n+1)/2)**2,n**5/5,PS4(n-1)],[`Σk<sup>4</sup> = n(n + 1)(2n + 1)(3n${sq} + 3n − 1)/30`,`n = ${n}: <b>${N(PS4(n))}</b>`]); },
 ()=>{ const a=R(1,5),b=R(1,6),n=R(5,15); const S=a*n*(n+1)*(2*n+1)/6+b*n*(n+1)/2; return P("Power sums",`Σ<sub>k=1</sub><sup>${n}</sup> (${a===1?"":a}k${sq} + ${b===1?"":b}k) = ?`,S,[a*n*n+b*n,S+n,a*(n*(n+1)/2)**2+b*n],[`${a}Σk${sq} + ${b}Σk = ${a}·${n*(n+1)*(2*n+1)/6} + ${b}·${n*(n+1)/2}`,`= <b>${N(S)}</b>`]); },
 ()=>{ const S=pick([[`n! &gt; 2<sup>n</sup>`,4,"3! = 6 &lt; 8, but 4! = 24 &gt; 16"],[`2<sup>n</sup> &gt; n${sq}`,5,"2⁴ = 16 = 4², but 2⁵ = 32 &gt; 25"],[`3<sup>n</sup> &gt; n${cu}`,4,"3³ = 27 = 3³, but 3⁴ = 81 &gt; 64"]]); return P("Inequalities",`What is the smallest positive integer n for which ${S[0]} starts to be true (and stays true, by induction)?`,S[1],[S[1]-1,S[1]+1,1],[S[2],`Base case n = <b>${S[1]}</b>, then the inductive step.`]); },
 ()=>{ const n=R(3,9); const v=n/(n+1); return PF("Telescoping",`1/(1·2) + 1/(2·3) + … + 1/(${n}·${n+1}) = ?`,n,n+1,[F(1,n+1),F(n,n+2),F(n+1,n)],[`1/(k(k + 1)) = 1/k − 1/(k + 1): the middle terms cancel.`,`1 − 1/${n+1} = <b>${F(n,n+1)}</b> (prove n/(n + 1) by induction)`]); }]};

/* ===================== engine ===================== */
const has=(u,kind)=>!!(G[u]&&G[u][kind]&&G[u][kind].length);
function parseAns(s){ s=String(s||"").trim().toLowerCase().replace(/[−–—]/g,"-").replace(/,/g,"").replace(/\s+/g,"").replace(/%$/,"").replace(/^\$/,"");
  if(!s) return null; let m=s.match(/^(-?\d*\.?\d+)\/(-?\d*\.?\d+)$/); if(m) return +m[1]/+m[2]; if(/^-?\d*\.?\d+(e-?\d+)?$/.test(s)) return +s; return NaN; }
function gen(g){ for(let i=0;i<30;i++){ try{ const p=g(); if(p&&p.q&&p.a!=null) return p; }catch(e){} } return null; }
function options(p){ const seen=new Set([String(p.a)]), o=[String(p.a)]; for(const w of p.w){ const s=String(w); if(!seen.has(s)&&s!=="NaN"){ seen.add(s); o.push(s); } if(o.length===4) break; }
  let k=1; while(o.length<4&&typeof p.v==="number"){ const c=N(p.v+(k%2?k:-k)); if(!seen.has(c)){ seen.add(c); o.push(c); } k++; } return shuffle(o); }
const esc=s=>String(s).replace(/"/g,"&quot;");
function setOf(u,kind,tp,n,typeOnly){ const L=G[u][kind].filter(g=>!tp||(g._t||"")===tp); const out=[], seen=new Set(); let tries=0;
  while(out.length<n&&tries++<n*25){ const g=L[out.length%L.length], p=gen(g); if(!p) continue; if(typeOnly&&(p.mc||typeof p.v!=="number")) continue; if(seen.has(p.q)) continue; seen.add(p.q); out.push(p); } return out; }
function topicsOf(u,kind){ G[u][kind].forEach(g=>{ if(g._t===undefined){ const p=gen(g); g._t=p?p.t:""; } }); return [...new Set(G[u][kind].map(g=>g._t))]; }
const solHtml=p=>`<ol class="pr-st">${p.s.map(x=>`<li>${x}</li>`).join("")}</ol>`;
function boxHTML(u,kind){ const tps=topicsOf(u,kind);
  return `<div class="pr" data-pr="${u}|${kind}">
   <p class="lead2">${kind==="sat"?"SAT-style questions for this unit, new every time, with full solutions.":"Harder, multi-step problems for advanced learners. New problems every time, with full solutions."}</p>
   <div class="pr-tp"><span class="gl">Topic</span>${["All",...tps].map((t,i)=>`<button type="button" data-prt="${i?esc(t):""}"${i?"":' class="on"'}>${t}</button>`).join("")}</div>
   <div class="pr-md">${[["mcq","Multiple choice"],["deck","Deck"],["type","Type the answer"]].map(([k,v],i)=>`<button type="button" data-prm="${k}"${i?"":' class="on"'}>${v}</button>`).join("")}<button type="button" class="pr-new" data-prn>↻ New</button></div>
   <div class="pr-sc"></div><div class="pr-o"></div></div>`; }
function bind(root){ root.querySelectorAll(".pr").forEach(box=>{ if(box.dataset.bound) return; box.dataset.bound=1;
  const [u,kind]=box.dataset.pr.split("|"), out=box.querySelector(".pr-o"), sc=box.querySelector(".pr-sc"); let mode="mcq", tp="";
  const score=(r,d,n)=>{ sc.innerHTML=`<b>${r}</b> correct · ${d} of ${n} answered`; };
  const render=()=>{ sc.innerHTML="";
   if(mode==="mcq"){ const ps=setOf(u,kind,tp,8); let r=0,d=0; score(0,0,ps.length);
     out.innerHTML=ps.map((p,i)=>{ const o=options(p); return `<div class="pr-q" data-i="${i}"><div class="pr-tg">${p.t}</div><p class="pr-qt"><span class="n">${i+1}</span><span>${p.q}</span></p><div class="pr-ch">${o.map((x,j)=>`<button type="button" data-c="${esc(x)}"><b>${"ABCD"[j]}</b> ${x}</button>`).join("")}</div><div class="pr-fb"></div></div>`; }).join("");
     out.querySelectorAll(".pr-q").forEach(q=>{ const p=ps[+q.dataset.i]; q.querySelectorAll("[data-c]").forEach(b=>b.onclick=()=>{ if(q.dataset.done) return; q.dataset.done=1; d++; const ok=b.dataset.c===String(p.a); if(ok) r++; b.classList.add(ok?"ok":"bad"); q.querySelectorAll("[data-c]").forEach(x=>{ if(x.dataset.c===String(p.a)) x.classList.add("ok"); x.disabled=true; });
       q.querySelector(".pr-fb").innerHTML=`<p class="${ok?"yes":"no"}">${ok?"Correct!":"Not quite. The answer is "+p.a+"."}</p>${solHtml(p)}`; score(r,d,ps.length); }); }); }
   else if(mode==="deck"){ const ps=setOf(u,kind,tp,10); let q=ps.map((_,i)=>i), known=0;
     const show=()=>{ if(!q.length){ out.innerHTML=`<div class="pr-card done"><p><b>Deck finished!</b> You knew ${known} of ${ps.length} on the first try.</p><button type="button" class="pr-new" data-again>↻ New deck</button></div>`; out.querySelector("[data-again]").onclick=render; return; }
       const p=ps[q[0]]; out.innerHTML=`<div class="pr-card"><div class="pr-tg">${p.t} · ${ps.length-q.length+1} of ${ps.length} · ${q.length} left</div><p class="pr-qt">${p.q}</p><button type="button" class="pr-flip">Show answer</button><div class="pr-back" hidden><p class="pr-ans">${p.a}</p>${solHtml(p)}<div class="pr-db"><button type="button" class="ok" data-k="1">✓ Got it</button><button type="button" class="bad" data-k="0">✗ Again</button></div></div></div>`;
       out.querySelector(".pr-flip").onclick=e=>{ e.target.hidden=true; out.querySelector(".pr-back").hidden=false; };
       out.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{ const i=q.shift(); if(b.dataset.k==="1"){ if(!ps[i]._miss) known++; } else { ps[i]._miss=1; q.push(i); } show(); }); };
     show(); }
   else { const ps=setOf(u,kind,tp,6,true); let r=0,d=0; score(0,0,ps.length);
     out.innerHTML=ps.length?ps.map((p,i)=>`<div class="pr-q" data-i="${i}"><div class="pr-tg">${p.t}</div><p class="pr-qt"><span class="n">${i+1}</span><span>${p.q}</span></p><div class="pr-in"><input type="text" inputmode="text" autocomplete="off" aria-label="Your answer to question ${i+1}" placeholder="Your answer (e.g. 12, −3, 5/6, 2.5)"><button type="button" data-chk>Check</button><button type="button" data-sol>Show solution</button></div><div class="pr-fb"></div></div>`).join(""):`<p class="empty">This topic has multiple-choice questions only. Pick another mode or topic.</p>`;
     out.querySelectorAll(".pr-q").forEach(q=>{ const p=ps[+q.dataset.i], inp=q.querySelector("input"), fb=q.querySelector(".pr-fb");
       const chk=()=>{ const x=parseAns(inp.value); if(x===null) return; const tol=p.tol!=null?p.tol:Math.max(1e-6,Math.abs(p.v)*1e-6); const ok=!isNaN(x)&&Math.abs(x-p.v)<=tol+1e-9; inp.classList.toggle("ok",ok); inp.classList.toggle("bad",!ok);
         if(!q.dataset.done){ q.dataset.done=1; d++; if(ok) r++; score(r,d,ps.length); } fb.innerHTML=ok?`<p class="yes">Correct! ${p.a}</p>${solHtml(p)}`:`<p class="no">${isNaN(x)?"Type a number, like 12, −3, 5/6 or 2.5.":"Not yet. Try again or open the solution."}</p>`; };
       q.querySelector("[data-chk]").onclick=chk; inp.addEventListener("keydown",e=>{ if(e.key==="Enter") chk(); });
       q.querySelector("[data-sol]").onclick=()=>{ if(!q.dataset.done){ q.dataset.done=1; d++; score(r,d,ps.length); } fb.innerHTML=`<p class="pr-ans">Answer: ${p.a}</p>${solHtml(p)}`; }; }); } };
  box.querySelectorAll("[data-prt]").forEach(b=>b.onclick=()=>{ tp=b.dataset.prt; box.querySelectorAll("[data-prt]").forEach(x=>x.classList.toggle("on",x===b)); render(); });
  box.querySelectorAll("[data-prm]").forEach(b=>b.onclick=()=>{ mode=b.dataset.prm; box.querySelectorAll("[data-prm]").forEach(x=>x.classList.toggle("on",x===b)); render(); });
  box.querySelector("[data-prn]").onclick=render; render(); }); }

const CSS=`.pr-tp,.pr-md{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:0 0 10px}
.pr-tp .gl{font-variant:small-caps;font-weight:600;letter-spacing:.06em;margin-right:4px}
.pr-tp button{border:1.5px solid #1d4e89;background:#fff;color:#1d4e89;padding:3px 11px;border-radius:999px;font:500 15px 'EB Garamond',Georgia,serif;cursor:pointer}
.pr-tp button.on{background:#1d4e89;color:#fff}
.pr-md button{border:1.5px solid #111;background:#fff;color:#111;padding:6px 14px;font:600 16px 'EB Garamond',Georgia,serif;cursor:pointer}
.pr-md button.on{background:#111;color:#fff}
.pr-new{margin-left:auto;border:1.5px solid #0f7a6c!important;background:#0f7a6c!important;color:#fff!important;padding:6px 14px;font:600 16px 'EB Garamond',Georgia,serif;cursor:pointer}
.pr-sc{font-size:16px;margin:0 0 10px;color:#333}.pr-sc:empty{display:none}.pr-sc b{color:#0f7a6c;font-size:19px}
.pr-q,.pr-card{border:1.5px solid #111;background:#fff;padding:10px 14px;margin:0 0 10px}
.pr-tg{font-size:12.5px;letter-spacing:.1em;text-transform:uppercase;color:#1d4e89;margin-bottom:4px}
.pr-qt{font-size:18px;margin:0 0 8px;display:flex;gap:8px;align-items:baseline}
.pr-qt .n{flex:none;min-width:24px;height:24px;line-height:24px;border-radius:50%;background:#1d4e89;color:#fff;text-align:center;font-size:13px}
.pr-ch{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:6px}
.pr-ch button{text-align:left;border:1.5px solid #bbb;background:#fff;padding:7px 10px;font:17px 'EB Garamond',Georgia,serif;cursor:pointer;border-radius:8px}
.pr-ch button:hover:not(:disabled){border-color:#111}
.pr-ch button b{display:inline-block;width:22px;color:#1d4e89}
.pr-ch button.ok{border-color:#1a7f37;background:#e8f6ec}.pr-ch button.bad{border-color:#c5221f;background:#fdecea}
.pr-fb .yes,.pr-fb .no{margin:8px 0 4px;font-weight:600}.pr-fb .yes{color:#137333}.pr-fb .no{color:#b3261e}
.pr-st{margin:2px 0 0;padding-left:22px;font-size:16px;line-height:1.6}
.pr-in{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.pr-in input{flex:1 1 200px;font:18px 'EB Garamond',Georgia,serif;padding:7px 10px;border:1.5px solid #9aa7b8;border-radius:8px}
.pr-in input.ok{border-color:#1a7f37;background:#e8f6ec}.pr-in input.bad{border-color:#c5221f;background:#fdecea}
.pr-in button,.pr-flip,.pr-db button{border:1.5px solid #1d4e89;background:#fff;color:#1d4e89;padding:6px 14px;font:600 16px 'EB Garamond',Georgia,serif;cursor:pointer}
.pr-in button[data-chk]{background:#1d4e89;color:#fff}
.pr-card{padding:16px 18px;min-height:150px}
.pr-card .pr-qt{font-size:20px}
.pr-ans{font-size:19px;font-weight:700;color:#0f7a6c;margin:8px 0 4px}
.pr-db{display:flex;gap:10px;margin-top:10px}.pr-db .ok{border-color:#1a7f37;color:#1a7f37}.pr-db .bad{border-color:#c5221f;color:#c5221f}
.pr-db button.ok:hover{background:#1a7f37;color:#fff}.pr-db button.bad:hover{background:#c5221f;color:#fff}
.pr-card.done{border-color:#1a7f37}
.mx{display:inline-flex;flex-direction:column;vertical-align:middle;border-left:1.5px solid #111;border-right:1.5px solid #111;border-radius:3px;padding:0 5px;margin:0 2px;line-height:1.2}
.mx span{display:flex;gap:10px;justify-content:space-between}.mx i{font-style:normal;min-width:14px;text-align:center}
.ksheet{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,330px),1fr));gap:12px}
.ks{border:1.5px solid #111;border-top:5px solid var(--c,#1d4e89);background:#fff;padding:10px 14px}
.ks h4{margin:0 0 6px;font-size:19px;color:var(--c,#1d4e89)}
.ks ul{margin:0;padding-left:20px;font-size:16.5px;line-height:1.65}
.ks .ex{margin:6px 0 0;font-size:15.5px;background:#f6f8fb;padding:6px 10px;border-left:3px solid var(--c,#1d4e89)}
@media (max-width:640px){.pr-new{margin-left:0}}`;
const st=document.createElement("style"); st.textContent=CSS; document.head.appendChild(st);

/* ===================== key-formula sheets for the new units ===================== */
const ks=(c,h,items,ex)=>`<div class="ks" style="--c:${c}"><h4>${h}</h4><ul>${items.map(i=>`<li>${i}</li>`).join("")}</ul>${ex?`<p class="ex">${ex}</p>`:""}</div>`;
const SHEET={
 "unit-12":`<div class="ksheet">
  ${ks("#c2571a","Center",["Mean = sum ÷ count","Median = middle value of the sorted list (average of the two middle values if n is even)","Mode = most frequent value","An outlier pulls the mean toward it; the median barely moves"],"Adding a value: new mean = (n · old mean + new value) ÷ (n + 1)")}
  ${ks("#c2571a","Spread",["Range = max − min","IQR = Q3 − Q1 (the middle 50%)","Standard deviation = typical distance from the mean","Adding a constant: SD stays the same. Multiplying by k: SD × |k|"],"{5, 5, 5, 5} has SD 0; {1, 5, 9} has a larger SD")}
  ${ks("#c2571a","Data displays",["Box plot: min, Q1, median, Q3, max","Histogram: counts in intervals; find the median by counting to the middle value","Dot plot: one dot per data value"],"20 values: the median is the average of the 10th and 11th values")}
  ${ks("#1d4e89","Percents, ratios & rates",["Percent change = (new − old) ÷ old × 100%","p% of x = (p/100)·x","+p% then −p% is NOT back to the start: × (1 + p/100)(1 − p/100)","Unit rates and conversions: multiply by fractions equal to 1"],"Up 20%, down 20%: 1.2 × 0.8 = 0.96, a 4% decrease")}
  ${ks("#c23a52","Scatterplots & models",["Line of best fit: y = mx + b","Slope: change in y for each 1-unit increase in x","Residual = actual − predicted","Linear: constant difference. Exponential: constant ratio"],"y = 2.5x + 10 at x = 8: predicted 30. Actual 33: residual +3")}
  ${ks("#6a3d9a","Probability",["P = favorable ÷ total","Two-way table: P(A | B) uses only the B row/column as the total","P(A and B) = P(A) · P(B | A)","P(A or B) = P(A) + P(B) − P(A and B)"],"Of 55 yes answers, 25 are seniors: P(senior | yes) = 25/55 = 5/11")}
  ${ks("#0f7a6c","Studies & inference",["Random sample → generalize to the population that was sampled","Random assignment → cause and effect","Neither → association only","Estimate ± margin of error = plausible values. Larger sample → smaller margin"],"52% ± 3%: from 49% to 55%")}
 </div>`,
 "unit-13":`<div class="ksheet">
  ${ks("#1d4e89","Dimensions",["m × n means m rows, n columns","Add or subtract: same dimensions only","Multiply A (m × n) by B (n × p): inner numbers match, result is m × p","AB ≠ BA in general"],"(2 × 3)(3 × 4) → 2 × 4; (2 × 3)(2 × 3) is undefined")}
  ${ks("#c2571a","Operations",["Add entry by entry","Scalar: multiply every entry","Product entry (i, j) = row i of A · column j of B"],MX([[1,2]])+MX([[3],[4]])+" = 1·3 + 2·4 = 11")}
  ${ks("#c23a52","Determinants",["2 × 2: ad − bc","3 × 3: a(ei − fh) − b(di − fg) + c(dh − eg)","det = 0 ⇔ not invertible (singular)","Triangle area = ½|det| of the (x, y, 1) matrix"],"det "+MX([[3,1],[2,4]])+" = 12 − 2 = 10")}
  ${ks("#6a3d9a","Inverses",["A⁻¹ exists only if det A ≠ 0","2 × 2: A⁻¹ = "+FRX(1,"ad − bc")+" "+MX([["d","−b"],["−c","a"]]),"AA⁻¹ = A⁻¹A = I"],MX([[2,1],[1,1]])+"<sup>−1</sup> = "+MX([[1,-1],[-1,2]]))}
  ${ks("#0f7a6c","Solving systems",["Matrix equation AX = B","X = A⁻¹B when det A ≠ 0","Cramer: x = Dₓ/D","Gauss: row-reduce [A | B]"],"2x + y = 5, x + y = 3 → X = "+MX([[1,-1],[-1,2]])+MX([[5],[3]])+" = "+MX([[2],[1]]))}
 </div>`,
 "unit-14":`<div class="ksheet">
  ${ks("#1d4e89","The three steps",["<b>Base case:</b> show P(1) (or the first n) is true","<b>Inductive hypothesis:</b> assume P(k) is true","<b>Inductive step:</b> use P(k) to prove P(k + 1)","<b>Conclusion:</b> P(n) is true for all n ≥ 1"],"Like dominoes: the first falls, and each one knocks over the next")}
  ${ks("#c23a52","Summation formulas",["Σk = n(n + 1)/2","Σk² = n(n + 1)(2n + 1)/6","Σk³ = [n(n + 1)/2]²","Σk⁴ = n(n + 1)(2n + 1)(3n² + 3n − 1)/30","Σk⁵ = n²(n + 1)²(2n² + 2n − 1)/12","Σk⁶ = n(n + 1)(2n + 1)(3n⁴ + 6n³ − 3n + 1)/42"],"Check with n = 2: Σk⁴ = 1 + 16 = 17 and 2·3·5·17/30 = 17 ✓")}
  ${ks("#6a3d9a","Proving a sum formula",["Write the sum up to k + 1 as (sum up to k) + (term k + 1)","Replace the sum up to k with the hypothesis","Simplify until you get the formula with n = k + 1"],"Σk²: k(k + 1)(2k + 1)/6 + (k + 1)² = (k + 1)(k + 2)(2k + 3)/6 ✓")}
  ${ks("#c2571a","Divisibility",["Show the base case is a multiple of d","Write the k + 1 case as (multiple of d) + (something with the k case)"],"7ᵏ⁺¹ − 1 = 7(7ᵏ − 1) + 6: both parts are multiples of 6")}
  ${ks("#0f7a6c","Inequalities",["Find the first n where it's true (base case)","In the step, use the hypothesis and then a small inequality"],"2ᵏ⁺¹ = 2 · 2ᵏ &gt; 2k² ≥ (k + 1)² for k ≥ 3 (2ⁿ &gt; n² from n = 5)")}
 </div>`
};
window.A2PRO={has,boxHTML,bind,sheet:u=>SHEET[u]||"",count:u=>(G[u]?((G[u].sat||[]).length+(G[u].chal||[]).length):0),_test:{G,gen,options,parseAns,setOf}};
})();

/* ===================== Course Map navigation ===================== */
(function(){
const STR=[["Start & Tools","#111",["formulas","cheats","practice","sat","resources","toolkit"]],
  ["Linear Algebra","#c2571a",["unit-1","systems","unit-13"]],
  ["Polynomials","#1d4e89",["unit-2","factor","unit-3","unit-4","poly"]],
  ["Functions","#6a3d9a",["unit-5","unit-6","unit-7","unit-9","unit-11"]],
  ["Discrete & Data","#0f7a6c",["unit-8","unit-14","unit-10","unit-12"]]];
let last=null;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function mapHTML(all,cur){ const by=Object.fromEntries(all.map(t=>[t.id,t])); const used=new Set(STR.flatMap(s=>s[2]));
  const strands=STR.concat([["More","#555",all.filter(t=>t.id!=="all"&&!used.has(t.id)).map(t=>t.id)]]).filter(s=>s[2].some(id=>by[id]));
  return `<div class="cm">${strands.map(([n,c,ids])=>`<div class="cm-s" style="--c:${c}"><div class="cm-h">${n}</div>${ids.filter(id=>by[id]).map(id=>{ const t=by[id], u=t.u||{}; return `<i class="cm-v" aria-hidden="true"></i><button type="button" class="cm-n${id===cur?" on":""}" data-cm="${id}">${/^Chapter/.test(u.chapter||"")?`<span class="cm-c">${esc(u.chapter.replace("Chapter","Unit"))}</span>`:""}<b>${esc(t.short)}</b><span class="cm-k">${t.count}</span></button>`; }).join("")}</div>`).join("")}</div>`; }
function render(tabs,all,cur,unitById){ last={all:all.map(t=>({...t,u:unitById[t.id]})),cur};
  const t=last.all.find(x=>x.id===cur), seq=last.all.filter(x=>x.id!=="all");
  const i=seq.findIndex(x=>x.id===cur), pv=seq[i-1], nx=seq[i+1];
  tabs.innerHTML=`<div class="cm-bar"><button type="button" class="cm-open" aria-haspopup="dialog"><span aria-hidden="true">☰</span> Course map</button>
   <button type="button" class="cm-home${cur==="all"?" on":""}" data-cm="all">Home</button>
   <span class="cm-cur">${cur==="all"?"All topics":esc(t?t.short:"")}</span>
   ${cur!=="all"?`<span class="cm-pn">${pv?`<button type="button" data-cm="${pv.id}" aria-label="Previous: ${esc(pv.short)}">‹</button>`:""}${nx?`<button type="button" data-cm="${nx.id}" aria-label="Next: ${esc(nx.short)}">›</button>`:""}</span>`:""}</div>`;
  let ov=document.getElementById("cmo"); if(!ov){ ov=document.createElement("div"); ov.id="cmo"; ov.setAttribute("role","dialog"); ov.setAttribute("aria-modal","true"); ov.setAttribute("aria-label","Course map"); document.body.appendChild(ov);
    ov.addEventListener("click",e=>{ if(e.target===ov||e.target.closest(".cm-x")) close(); const b=e.target.closest("[data-cm]"); if(b){ go(b.dataset.cm); close(); } });
    document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&ov.classList.contains("open")) close(); }); }
  ov.innerHTML=`<div class="cm-p"><div class="cm-pt"><b>Course map</b><button type="button" class="cm-x">Close ✕</button></div>${mapHTML(last.all,cur)}</div>`;
  tabs.querySelector(".cm-open").onclick=()=>{ ov.classList.add("open"); document.body.style.overflow="hidden"; };
  tabs.querySelectorAll("[data-cm]").forEach(b=>b.onclick=()=>go(b.dataset.cm)); }
function close(){ const ov=document.getElementById("cmo"); if(ov){ ov.classList.remove("open"); document.body.style.overflow=""; } }
function go(id){ if(id==="all"){ if(location.hash&&location.hash!=="#") location.hash=""; else if(window.route) window.route(); return; } location.hash=id; }
function home(){ if(!last) return ""; return `<section class="unit cm-home-sec"><div class="chapter">Course map</div><h2>Choose a unit</h2><p class="sub">Units are grouped into strands. Each strand runs from top to bottom in learning order.</p>${mapHTML(last.all,"all")}</section>`; }
function bindHome(root){ root.querySelectorAll(".cm-home-sec [data-cm]").forEach(b=>b.onclick=()=>go(b.dataset.cm)); }
const css=`nav .wrap{display:block!important;padding:8px 16px!important}
.cm-bar{display:flex;align-items:center;gap:10px;max-width:1180px;margin:0 auto}
.cm-open{border:1.5px solid #111!important;background:#111!important;color:#fff!important;padding:6px 14px!important;font:600 16px 'EB Garamond',Georgia,serif!important;border-radius:999px!important}
.cm-home{border-radius:999px!important}
.cm-cur{font-weight:700;font-size:19px;flex:1;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cm-pn{display:flex;gap:6px}.cm-pn button{width:38px;height:38px;border-radius:50%!important;padding:0!important;font-size:22px!important;line-height:1}
.cm{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:18px 14px;align-items:start}
.cm-s{display:flex;flex-direction:column;align-items:stretch;background:#fbfcfe radial-gradient(#dde4ee 1px,transparent 1.2px) 0 0/18px 18px;border:1.5px solid #d9e0ea;border-radius:16px;padding:12px 12px 14px}
.cm-h{align-self:center;background:var(--c);color:#fff;border-radius:999px;padding:4px 16px;font-weight:700;font-size:17px;letter-spacing:.02em}
.cm-v{display:block;width:2px;height:14px;background:color-mix(in srgb,var(--c) 45%,#c8d2df);align-self:center}
.cm-n{border:1.5px solid #dbe2ec;border-left:5px solid var(--c);border-radius:12px;background:#fff;padding:7px 10px;text-align:left;cursor:pointer;display:grid;grid-template-columns:1fr auto;column-gap:8px;align-items:center;font-family:'EB Garamond',Georgia,serif;box-shadow:0 3px 10px rgba(15,30,60,.07);transition:transform .12s,box-shadow .12s}
.cm-n:hover{transform:translateX(3px);box-shadow:0 6px 16px rgba(15,30,60,.14)}
.cm-n b{grid-column:1;font-size:16.5px;line-height:1.15;color:#111}
.cm-c{grid-column:1;font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--c)}
.cm-k{grid-column:2;grid-row:1 / span 2;font-size:12.5px;background:color-mix(in srgb,var(--c) 12%,#fff);color:var(--c);border-radius:999px;padding:1px 8px;font-weight:600}
.cm-n.on{background:var(--c);border-color:var(--c)}.cm-n.on b,.cm-n.on .cm-c{color:#fff}.cm-n.on .cm-k{background:#fff}
#cmo{position:fixed;inset:0;z-index:40;background:rgba(17,17,17,.45);display:none;align-items:flex-start;justify-content:center;padding:4vh 12px;overflow:auto}
#cmo.open{display:flex}
.cm-p{background:#fff;max-width:1180px;width:100%;border-radius:18px;padding:14px 16px 18px;box-shadow:0 20px 50px rgba(0,0,0,.3)}
.cm-pt{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.cm-pt b{font-size:24px}
.cm-x{border:1.5px solid #111;background:#fff;padding:5px 14px;font:600 16px 'EB Garamond',Georgia,serif;cursor:pointer;border-radius:999px}
.cm-home-sec h2{margin-bottom:2px}
@media (max-width:640px){.cm-open{padding:5px 11px!important;font-size:15px!important}.cm-home{display:none}.cm-cur{font-size:16px}.cm{grid-template-columns:1fr 1fr;gap:10px}.cm-s{padding:8px 6px 10px}.cm-n{padding:5px 7px}.cm-n b{font-size:14px}.cm-k{display:none}.cm-h{font-size:14px;padding:3px 10px;text-align:center}}`;
const st=document.createElement("style"); st.textContent=css; document.head.appendChild(st);
window.A2NAV={render,home,bindHome};
})();
