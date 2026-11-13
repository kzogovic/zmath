/* Unit 7: Exponential & logarithmic graphs: worked examples with graphs, asymptotes, key features,
   plus a "graph lab" that builds new fully explained examples on demand. Text uses A2PRACTICE.fmt notation:
   ^(…) exponents, log_b, {{a|b}} fractions. */
(function(){
const E=Math.E, LN=Math.log;
const fmt=s=>window.A2PRACTICE?A2PRACTICE.fmt(s):s;
const plot=g=>window.A2PLOT?A2PLOT.plot(g):"";
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)), pick=a=>a[Math.floor(Math.random()*a.length)];
const logb=(b,x)=>LN(x)/LN(b);

/* ---------- number formatting ---------- */
function fracOf(v){ if(Math.abs(v-Math.round(v))<1e-9) return [Math.round(v),1];
  for(const d of [2,3,4,5,6,8,9,10,12,16,25,27]){ const n=v*d; if(Math.abs(n-Math.round(n))<1e-9) return [Math.round(n),d]; } return null; }
const t=v=>{ const f=fracOf(v); if(f) return f[1]===1?String(f[0]):(f[0]<0?"-":"")+`{{${Math.abs(f[0])}|${f[1]}}}`; return "≈ "+(+v.toFixed(3)); };   // for text
const tv=v=>{ const f=fracOf(v); if(f) return f[1]===1?String(f[0]):`${f[0]}/${f[1]}`; return String(+v.toFixed(2)); };                       // for graph labels
const ex=v=>!!fracOf(v);
const P=(x,y)=>`(${tv(x)}, ${tv(y)})`;
const bTxt=b=>b===E?"e":b<1?`({{1|${Math.round(1/b)}}})`:String(b);
const bLab=b=>b===E?"e":b<1?`1/${Math.round(1/b)}`:String(b);
const coef=a=>a===1?"":a===-1?"-":String(a);
const term=(a,b)=>{ const B=bTxt(b); return a===1?B:a===-1?"-"+B:(b>1&&b!==E?`${a} · ${B}`:`${a}${B}`); };
const shiftX=h=>h===0?"x":h>0?`(x - ${h})`:`(x + ${-h})`;
const kTxt=k=>k===0?"":k>0?` + ${k}`:` - ${-k}`;
const logName=b=>b===E?"ln":b===10?"log":`log_${b}`;

/* ---------- transformed exponential: y = a·b^(x−h) + k ---------- */
function expEx(a,b,h,k,title,extra){
  const f=x=>a*Math.pow(b,x-h)+k, grow=(b>1)===(a>0);
  const eq=`y = ${term(a,b)}^${h===0?"x":"("+shiftX(h).slice(1,-1)+")"}${kTxt(k)}`;
  const tr=[];
  if(h>0) tr.push(`x - ${h} in the exponent: shift <b>right ${h}</b>`); if(h<0) tr.push(`x + ${-h} in the exponent: shift <b>left ${-h}</b>`);
  if(Math.abs(a)!==1) tr.push(`|a| = ${Math.abs(a)}: vertical ${Math.abs(a)>1?"stretch":"compression"} by ${Math.abs(a)}`);
  if(a<0) tr.push(`a < 0: <b>reflect over the x-axis</b> (the graph flips below its asymptote)`);
  if(k) tr.push(`${k>0?"+":"-"} ${Math.abs(k)} at the end: shift <b>${k>0?"up":"down"} ${Math.abs(k)}</b>`);
  if(!tr.length) tr.push("No transformations: this is the parent graph.");
  const yi=f(0), r=-k/a, hasX=r>0, xi=hasX?h+logb(b,r):null;
  const kp=[[h,a+k],[h+1,a*b+k],[h-1,a/b+k]];
  const pw=h===0?"x":"("+shiftX(h).slice(1,-1)+")";
  const ab=a*Math.pow(b,-h);
  const yiTxt=`x = 0: y = ${term(a,b)}^${h===0?"0":"("+(-h)+")"}${kTxt(k)} = ${t(ab).replace("≈ ","≈ ")}${kTxt(k)} ${ex(yi)?"= "+t(yi):"≈ "+(+yi.toFixed(3))}`.replace(/ = ([^=]*) = \1$/," = $1").replace(/= ≈/g,"≈");
  const logR=b===E?`ln(${t(r)})`:b<1?`{{ln(${t(r)})|ln(${t(b)})}}`:`log_${b}(${t(r)})`;
  const xiTxt=hasX?`Set y = 0: ${term(a,b)}^${pw} = ${-k}${a!==1?` → ${bTxt(b)}^${pw} = ${t(r)}`:""} → ${h?"x - "+h+" = ":"x = "}${logR}${h?" → x = "+(h)+" + "+logR:""} ${ex(xi)?"= "+t(xi):t(xi)}.`.replace(/x - (-\d+)/,(m,v)=>"x + "+(-v)).replace(/= (-?\d+) \+ /,"= $1 + ")
    :`No x-intercept: the graph stays ${a>0?"above":"below"} y = ${k}${k===0?" (it never reaches 0)":", so it never reaches y = 0"}.`;
  const steps=[
    `<b>Parent:</b> y = ${bTxt(b)}^x is ${b>1?"growth":"decay"} (b ${b>1?"> 1":"is between 0 and 1"}). It passes through (0, 1) and (1, ${bTxt(b)}), with asymptote y = 0.`,
    `<b>Transformations:</b> ${tr.join("; ")}.`,
    `<b>Asymptote:</b> only the vertical shift moves it: <b>y = ${k}</b>.`,
    `<b>Key points:</b> (0, 1) → ${P(...kp[0])} and (1, ${bTxt(b)}) → ${P(...kp[1])}${Math.abs(kp[2][1])<40?`, (−1, ${b===E?"{{1|e}}":t(1/b)}) → ${P(...kp[2])}`:""}.`,
    `<b>y-intercept:</b> ${yiTxt}.`,
    `<b>x-intercept:</b> ${xiTxt}`];
  const rows=[["Domain","(-∞, ∞): all real numbers"],["Range",a>0?`(${k}, ∞): y > ${k}`:`(-∞, ${k}): y < ${k}`],["Asymptote",`y = ${k} (horizontal)`],
    ["y-intercept",`(0, ${t(yi).replace("≈ ","≈")})`],["x-intercept",hasX?`(${t(xi).replace("≈ ","≈")}, 0)`:"none"],
    ["Behavior",grow?"increasing":"decreasing"],["End behavior",b>1?`x → -∞: y → ${k};   x → ∞: y → ${a>0?"∞":"-∞"}`:`x → -∞: y → ${a>0?"∞":"-∞"};   x → ∞: y → ${k}`]];
  // window
  const pts=[...kp,[0,yi],...(hasX?[[xi,0]]:[])].filter(p=>Math.abs(p[1])<60);
  let x0=Math.min(h-4,-1,...pts.map(p=>p[0]-1)), x1=Math.max(h+4,2,...pts.map(p=>p[0]+1));
  const ys=[k,...pts.map(p=>p[1])]; let y0=Math.min(...ys,0)-2, y1=Math.max(...ys,0)+2;
  if(y1-y0<8){ const c=(y0+y1)/2; y0=c-4; y1=c+4; }
  const pl=kp.filter(p=>p[1]>y0&&p[1]<y1).map(p=>[p[0],p[1],P(p[0],p[1])]);
  if(Math.abs(h)>0.01&&yi>y0&&yi<y1) pl.push([0,yi,`y-int ${P(0,yi)}`]);
  if(hasX&&Math.abs(xi-h)>0.05) pl.push([xi,0,`x-int (${tv(xi)}, 0)`]);
  const g={f:[{f:x=>Math.pow(b,x),light:true},{f}],h:[k],p:pl,xr:[x0,x1],yr:[y0,y1],cap:`Dashed line: asymptote y = ${k}. Gray: parent y = ${b<1?"("+bLab(b)+")":bLab(b)}ˣ.`};
  return {title:title||`Graph ${eq}`,q:`Graph ${eq}. State the domain, range, asymptote and intercepts.`,g,steps,rows,tip:extra};
}

/* ---------- transformed logarithm: y = a·log_b(x−h) + k ---------- */
function logEx(a,b,h,k,title,extra){
  const f=x=>a*logb(b,x-h)+k, L=logName(b);
  const inside=h===0?"x":shiftX(h).slice(1,-1);
  const eq=`y = ${coef(a)}${coef(a)&&coef(a)!=="-"?" ":""}${L}(${inside})${kTxt(k)}`;
  const tr=[];
  if(h>0) tr.push(`x - ${h} inside: shift <b>right ${h}</b>`); if(h<0) tr.push(`x + ${-h} inside: shift <b>left ${-h}</b>`);
  if(Math.abs(a)!==1) tr.push(`|a| = ${Math.abs(a)}: vertical stretch by ${Math.abs(a)}`);
  if(a<0) tr.push(`a < 0: <b>reflect over the x-axis</b> (now decreasing)`);
  if(k) tr.push(`${k>0?"+":"-"} ${Math.abs(k)}: shift <b>${k>0?"up":"down"} ${Math.abs(k)}</b>`);
  if(!tr.length) tr.push("No transformations: this is the parent graph.");
  const xi=h+Math.pow(b,-k/a), hasY=h<0, yi=hasY?f(0):null;
  const bS=b===E?"e":String(b);
  const kp=[[h+1,k],[h+b,a+k],[h+1/b,-a+k]];
  const A=coef(a)+(coef(a)&&coef(a)!=="-"?" ":"");
  const steps=[
    `<b>Parent:</b> y = ${L}${b===E||b===10?"":""} x passes through (1, 0) and (${bS}, 1), increases slowly, and has the vertical asymptote x = 0. Domain x > 0.`,
    `<b>Transformations:</b> ${tr.join("; ")}.`,
    `<b>Asymptote:</b> only the horizontal shift moves it: <b>x = ${h}</b>. The argument must be positive: ${inside} > 0 → <b>x > ${h}</b>.`,
    `<b>Key points:</b> (1, 0) → ${P(...kp[0])} and (${bS}, 1) → ${P(...kp[1])}${b<=4?`, ({{1|${bS}}}, -1) → ${P(...kp[2])}`:""}.`,
    `<b>x-intercept:</b> set y = 0: ${A}${L}(${inside})${kTxt(k)} = 0${k?` → ${A}${L}(${inside}) = ${-k}`:""}${a!==1?` → ${L}(${inside}) = ${t(-k/a)}`:""} → ${inside} = ${bS}^(${t(-k/a).replace("≈ ","")}) → x ${ex(xi)?"= "+t(xi):t(xi)}.`,
    hasY?`<b>y-intercept:</b> x = 0: y = ${coef(a)}${coef(a)&&coef(a)!=="-"?" ":""}${L}(${-h})${kTxt(k)} ${ex(yi)?"= "+t(yi):t(yi)}.`:`<b>y-intercept:</b> none, because x = 0 is not in the domain (x > ${h}).`];
  const rows=[["Domain",`(${h}, ∞): x > ${h}`],["Range","(-∞, ∞): all real numbers"],["Asymptote",`x = ${h} (vertical)`],
    ["x-intercept",`(${t(xi).replace("≈ ","≈")}, 0)`],["y-intercept",hasY?`(0, ${t(yi).replace("≈ ","≈")})`:"none"],
    ["Behavior",a>0?"increasing":"decreasing"],["End behavior",`x → ${h}⁺: y → ${a>0?"-∞":"∞"};   x → ∞: y → ${a>0?"∞":"-∞"}`]];
  const pts=[...kp,[xi,0],...(hasY?[[0,yi]]:[])];
  const x0=Math.min(h-1.5,-1), x1=Math.max(h+Math.max(b,3)+2,xi+1.5,4);
  const ys=[...pts.map(p=>p[1]),f(x1)]; let y0=Math.min(...ys,0)-2.5, y1=Math.max(...ys,0)+2;
  if(y1-y0<8){ const c=(y0+y1)/2; y0=c-4; y1=c+4; }
  const pl=kp.filter(p=>p[0]<x1&&p[1]>y0&&p[1]<y1).map(p=>[p[0],p[1],P(p[0],p[1])]);
  if(!kp.some(p=>Math.abs(p[0]-xi)<0.05&&Math.abs(p[1])<0.05)) pl.push([xi,0,`x-int (${tv(xi)}, 0)`]);
  if(hasY&&yi>y0&&yi<y1&&!kp.some(p=>Math.abs(p[0])<0.05)) pl.push([0,yi,`y-int ${P(0,yi)}`]);
  const g={f:[{f:x=>logb(b,x),d:[1e-6,1e9],light:true},{f,d:[h+1e-7,1e9]}],v:[h],p:pl,xr:[x0,x1],yr:[y0,y1],cap:`Dashed line: asymptote x = ${h}. Gray: parent y = ${b===E?"ln x":b===10?"log x":"log_"+b+" x"}.`.replace("log_"+b,"log"+String(b).replace(/\d/g,d=>"₀₁₂₃₄₅₆₇₈₉"[d]))};
  return {title:title||`Graph ${eq}`,q:`Graph ${eq}. State the domain, range, asymptote and intercepts.`,g,steps,rows,tip:extra};
}

/* ---------- static examples ---------- */
const sol=(f,a,b)=>{ for(let i=0;i<80;i++){ const m=(a+b)/2; if(f(a)*f(m)<=0) b=m; else a=m; } return (a+b)/2; };
const nz=(a,b,ex=[])=>{ let v; do{ v=rnd(a,b); }while(v===0||ex.includes(v)); return v; };
const sub=n=>String(n).replace(/\d/g,d=>"₀₁₂₃₄₅₆₇₈₉"[d]);
/* each example: {mk, p} so that "↻ New example" can call mk(...mk.r()) */
const X=(mk,p)=>({mk,p});
function eGD(b){ const pts=[[0,1,"(0, 1)"],[1,b,`(1, ${b})`],[-1,b,`(−1, ${b})`]];
  return {title:`Growth vs. decay: y = ${b}^x and y = ({{1|${b}}})^x`,q:`Compare y = ${b}^x and y = ({{1|${b}}})^x.`,
   g:{f:[{f:x=>Math.pow(b,x)},{f:x=>Math.pow(1/b,x),dash:true}],h:[0],p:pts,xr:[-3.5,3.5],yr:[-1,Math.min(b*b,12)+1],cap:`Solid: y = ${b}ˣ (growth). Dashed: y = (1/${b})ˣ (decay). Both approach y = 0.`},
   steps:["Both pass through <b>(0, 1)</b>, because any base to the power 0 is 1.",`y = ${b}^x is multiplied by ${b} every time x goes up 1: (1, ${b}), (2, ${b*b}). That is <b>growth</b> (b > 1).`,`y = ({{1|${b}}})^x is divided by ${b} every time x goes up 1: (1, {{1|${b}}}), (2, {{1|${b*b}}}). That is <b>decay</b> (0 < b < 1).`,`({{1|${b}}})^x = ${b}^(-x), so the decay graph is the growth graph <b>reflected over the y-axis</b>.`,"Neither graph touches the x-axis: the <b>horizontal asymptote is y = 0</b>, and the range is y > 0."],
   rows:[["Domain","(-∞, ∞) for both"],["Range","(0, ∞) for both"],["Asymptote","y = 0"],["y-intercept","(0, 1) for both"],[`${b}^x`,"increasing: x → -∞ gives y → 0"],[`({{1|${b}}})^x`,"decreasing: x → ∞ gives y → 0"]],
   tip:`A negative base is not allowed: y = (-${b})^x is not an exponential function.`}; }
eGD.r=()=>[pick([2,3,4,5])];
const E1=(a,b,h,k)=>expEx(a,b,h,k); E1.r=()=>[1,pick([2,3]),rnd(1,4),rnd(1,4)];
const E2=(a,b,h,k)=>expEx(a,b,h,k,undefined,`-${bTxt(b)}^x means -(${bTxt(b)}^x), not (-${bTxt(b)})^x. The graph flips over the x-axis first, then moves.`); E2.r=()=>[-1,pick([2,3]),rnd(-2,2),rnd(2,6)];
const E3=(a,b,h,k)=>expEx(a,b,h,k); E3.r=()=>[rnd(2,4),pick([.5,1/3]),rnd(-2,1),-rnd(1,4)];
const E4=(a,b,h,k)=>expEx(a,b,h,k,undefined,"e ≈ 2.718, so e^x grows a little faster than 2^x and slower than 3^x."); E4.r=()=>[pick([1,2,3,-1,-2]),E,rnd(-2,2),nz(-5,4)];
const E5=(a,b,h,k)=>expEx(a,b,h,k); E5.r=()=>[pick([-2,-3]),pick([2,3]),rnd(1,3),rnd(1,5)];
function eTwo(a,b,x1,gap){ const x2=x1+gap, y1=a*b**x1, y2=a*b**x2;
  return {title:"Write the equation through two points",q:`Find y = a · b^x through (${x1}, ${y1}) and (${x2}, ${y2}).`,
   g:{f:[{f:x=>a*Math.pow(b,x)}],h:[0],p:[[x1,y1,`(${x1}, ${y1})`],[x2,y2,`(${x2}, ${y2})`],[0,a,`(0, ${a})`]],xr:[-3,x2+1],yr:[-y2*.1,y2*1.25],cap:`y = ${a} · ${b}ˣ passes through both points.`},
   steps:[`Write two equations: ${y1} = a · b^${x1} and ${y2} = a · b^${x2}.`,`Divide the second by the first to cancel a: {{${y2}|${y1}}} = b^${gap} → ${b**gap} = b^${gap} → <b>b = ${b}</b> (b must be positive).`,`Substitute back: ${y1} = a · ${b**x1} → <b>a = ${a}</b>.`,`<b>y = ${a} · ${b}^x</b>. Check: ${a} · ${b}^${x2} = ${y2} ✓.`,`The y-intercept is a = ${a}: the starting value.`],
   rows:[["Equation",`y = ${a} · ${b}^x`],["Initial value",`a = ${a}, so (0, ${a})`],["Growth factor",`b = ${b}`],["Asymptote","y = 0"]],
   tip:"Divide the equations; don't subtract them. Dividing is what cancels a."}; }
eTwo.r=()=>[rnd(2,5),pick([2,3]),rnd(1,2),pick([1,2])];
function eHalf(A0,hl,n,tq){ const tgt=A0/2**n, at=A0*Math.pow(.5,tq/hl), pts=[0,1,2,3].map(i=>[i*hl,A0/2**i,`(${i*hl}, ${tv(A0/2**i)})`]);
  return {title:"Half-life model with a graph",q:`A dose of a medicine is ${A0} mg and its half-life is ${hl} hours. Write a model, find the amount after ${tq} hours, and find when ${tv(tgt)} mg remain.`,
   g:{f:[{f:x=>A0*Math.pow(.5,x/hl),d:[0,1e9]}],h:[0],p:pts,xr:[-1,hl*(n+1.5)],yr:[-A0*.1,A0*1.12],cap:`The amount halves every ${hl} hours and approaches 0 mg (asymptote A = 0).`},
   steps:[`Half-life form: A(t) = A₀ ({{1|2}})^(t/h) → <b>A(t) = ${A0}({{1|2}})^(t/${hl})</b>.`,`After ${tq} hours: ${A0}(0.5)^(${tq}/${hl}) ${Math.abs(at-Math.round(at))<1e-9?"= <b>"+Math.round(at):"≈ <b>"+at.toFixed(1)} mg</b>.`,`${tv(tgt)} mg remain when ${A0}({{1|2}})^(t/${hl}) = ${tv(tgt)} → ({{1|2}})^(t/${hl}) = {{1|${2**n}}} = ({{1|2}})^${n}.`,`So {{t|${hl}}} = ${n} → <b>t = ${n*hl} hours</b> (${n} half-lives).`,"The graph approaches A = 0 but never reaches it: the horizontal asymptote."],
   rows:[["Model",`A(t) = ${A0}(½)^(t/${hl})`],[`After ${tq} h`,`${Math.abs(at-Math.round(at))<1e-9?"= "+Math.round(at):"≈ "+at.toFixed(1)} mg`],[`${tv(tgt)} mg left`,`t = ${n*hl} h`],["Asymptote","A = 0"]],
   tip:"The exponent is t divided by the half-life, not t times it."}; }
eHalf.r=()=>{ const hl=pick([2,3,4,5,6,8,10]); return [pick([40,48,64,80,96,120,160]),hl,rnd(2,4),hl*rnd(1,3)+pick([1,2,-1])]; };
function eAsym(L){ return {title:"Read the asymptote, domain and range without graphing",q:"Find the asymptote and range of each function.",
   steps:[...L.map(([a,b,h,k])=>{ const eq=`y = ${term(a,b)}^${h===0?"x":"("+shiftX(h).slice(1,-1)+")"}${kTxt(k)}`; return `${eq}: ${a<0?"reflected, ":""}${k?`shift ${k>0?"up":"down"} ${Math.abs(k)}`:"no vertical shift"} → asymptote <b>y = ${k}</b>, range <b>y ${a>0?">":"<"} ${k}</b>.`; }),"The domain of every exponential function is all real numbers."],
   rows:[["Rule","Asymptote y = k (the number added at the end)"],["a > 0","range y > k"],["a < 0","range y < k"],["Domain","always all real numbers"]],
   tip:"Horizontal shifts (inside the exponent) never move a horizontal asymptote."}; }
eAsym.r=()=>[[0,1,2,3].map(()=>[pick([1,2,-1,-2,3,4]),pick([2,3,5,E,.5]),rnd(-2,2),rnd(-6,6)])];
function eInvPair(b){ const P=[[0,1],[1,b],[2,b*b]];
  return {title:`Inverses: y = ${b}^x and y = log_${b} x`,q:`Graph y = ${b}^x and y = log_${b} x on the same axes.`,
   g:{f:[{f:x=>Math.pow(b,x)},{f:x=>logb(b,x),d:[1e-6,1e9]},{f:x=>x,light:true}],h:[0],v:[0],p:P.flatMap(([x,y])=>[[x,y,`(${x}, ${y})`],[y,x,`(${y}, ${x})`]]).filter(p=>p[0]<=b*b),xr:[-4,Math.max(6,b*b+1)],yr:[-4,Math.max(6,b*b+1)],eq:true,cap:"Each graph is the reflection of the other over y = x (gray). Dashed: asymptotes y = 0 and x = 0."},
   steps:[`log_${b} x answers the question “${b} to what power gives x?”, so it <b>undoes</b> ${b}^x.`,`Switch the coordinates of each point: ${P.map(([x,y])=>`(${x}, ${y}) ↔ (${y}, ${x})`).join(", ")}.`,`The horizontal asymptote y = 0 of ${b}^x becomes the <b>vertical asymptote x = 0</b> of log_${b} x.`,`Domain and range also switch: ${b}^x has range y > 0, so log_${b} x has domain <b>x > 0</b>.`],
   rows:[["",`y = ${b}^x  |  y = log${sub(b)} x`],["Domain","(-∞, ∞)  |  (0, ∞)"],["Range","(0, ∞)  |  (-∞, ∞)"],["Asymptote","y = 0  |  x = 0"],["Intercept","(0, 1)  |  (1, 0)"]],
   tip:`log_${b} 0 and the log of a negative number are undefined, which is why the log graph lives only to the right of x = 0.`}; }
eInvPair.r=()=>[pick([2,3])];
const L1=(a,b,h,k)=>logEx(a,b,h,k,undefined,`The asymptote moves with the shift inside: x ${h<0?"+ "+(-h):"- "+h} gives x = ${h}.`); L1.r=()=>[1,pick([2,3]),-rnd(1,4),-rnd(1,3)];
const L2=(a,b,h,k)=>logEx(a,b,h,k); L2.r=()=>[-1,pick([2,3]),rnd(1,4),rnd(-2,2)];
const L3=(a,b,h,k)=>logEx(a,b,h,k); L3.r=()=>[pick([2,3,-2]),E,rnd(-2,1),rnd(-2,2)];
const L4=(a,b,h,k)=>logEx(a,b,h,k); L4.r=()=>[pick([2,3,-2]),10,rnd(-2,2),rnd(-3,2)];
function eLogRef(b){ const N=b===10?"log":`log_${b}`;
  return {title:`Reflection over the y-axis: y = ${N}(-x)`,q:`Graph y = ${N}(-x). What is its domain?`,
   g:{f:[{f:x=>logb(b,-x),d:[-1e9,-1e-6]},{f:x=>logb(b,x),d:[1e-6,1e9],light:true}],v:[0],p:[[-1,0,"(−1, 0)"],[-b,1,`(−${b}, 1)`],[-1/b,-1,`(−1/${b}, −1)`]],xr:[-b-2,b+2],yr:[-4,3],cap:`y = ${N}(−x) is the gray graph reflected over the y-axis. Asymptote x = 0.`},
   steps:["The argument must be positive: -x > 0 → <b>x < 0</b>.","Replacing x by -x reflects the graph <b>over the y-axis</b>.",`Points: (1, 0) → <b>(-1, 0)</b>, (${b}, 1) → <b>(-${b}, 1)</b>.`,"The asymptote stays <b>x = 0</b>, and the graph decreases from left to right."],
   rows:[["Domain","(-∞, 0)"],["Range","(-∞, ∞)"],["Asymptote","x = 0"],["x-intercept","(-1, 0)"],["Behavior","decreasing"]],
   tip:`y = ${N}(-x) and y = -${N} x are different: the first reflects over the y-axis, the second over the x-axis.`}; }
eLogRef.r=()=>[pick([2,3,10])];
function eLogLin(b,m,c){ const f=x=>logb(b,m*x+c), asy=-c/m, xi=(1-c)/m, x2=(b*b-c)/m, dom=m>0?`x > ${t(asy)}`:`x < ${t(asy)}`;
  const arg=`${c}${m<0?" - ":" + "}${Math.abs(m)===1?"":Math.abs(m)}x`, N=b===10?"log":`log_${b}`;
  const lo=Math.min(asy,xi,x2,0)-2, hi=Math.max(asy,xi,x2,0)+2;
  return {title:`Domain from the argument: y = ${N}(${arg})`,q:`Find the domain, asymptote and intercepts of y = ${N}(${arg}).`,
   g:{f:[{f,d:m>0?[asy+1e-7,1e9]:[-1e9,asy-1e-7]}],v:[asy],p:[[xi,0,`x-int (${tv(xi)}, 0)`],...(c>0?[[0,f(0),`(0, ${tv(f(0))})`]]:[]),[x2,2,`(${tv(x2)}, 2)`]],xr:[lo,hi],yr:[-4,3.5],cap:`Asymptote x = ${tv(asy)}.`},
   steps:[`Argument > 0: ${arg} > 0 → <b>${dom}</b>${m<0?" (the sign flips when dividing by "+m+")":""}.`,`Vertical asymptote where the argument is 0: <b>x = ${t(asy)}</b>.`,`x-intercept: ${N}(${arg}) = 0 → ${arg} = ${b===10?10:b}^0 = 1 → <b>x = ${t(xi)}</b>.`,c>0?`y-intercept: x = 0: y = ${N} ${c} ${ex(f(0))?"= "+t(f(0)):"≈ "+(+f(0).toFixed(3))}.`:`y-intercept: none, since x = 0 gives ${N}(${c}), which is undefined.`,`Another point: ${arg} = ${b*b} when x = ${t(x2)}, giving y = 2.`],
   rows:[["Domain",m>0?`(${t(asy)}, ∞)`:`(-∞, ${t(asy)})`],["Range","(-∞, ∞)"],["Asymptote",`x = ${t(asy)}`],["x-intercept",`(${t(xi)}, 0)`],["Behavior",m>0?"increasing":"decreasing"]],
   tip:"Always find the domain by solving argument > 0. With a negative coefficient on x, remember to flip the inequality."}; }
eLogLin.r=()=>[pick([2,3,5]),pick([-2,-1,2,3]),rnd(1,6)];
function eTwoBr(k){ const r=Math.sqrt(k*k+1), K=k*k;
  return {title:`Two branches: y = log(x^2 - ${K})`,q:`Find the domain and asymptotes of y = log(x^2 - ${K}), then graph it.`,
   g:{f:[{f:x=>Math.log10(x*x-K),d:[k+1e-7,1e9]},{f:x=>Math.log10(x*x-K),d:[-1e9,-k-1e-7]}],v:[-k,k],p:[[r,0,`(√${K+1}, 0)`],[-r,0,`(−√${K+1}, 0)`]],xr:[-k-8,k+8],yr:[-3,3.5],cap:`Two vertical asymptotes, x = −${k} and x = ${k}. Nothing exists between them.`},
   steps:[`Argument > 0: x^2 - ${K} > 0 → (x - ${k})(x + ${k}) > 0 → <b>x < -${k} or x > ${k}</b>.`,`Vertical asymptotes where the argument is 0: <b>x = -${k} and x = ${k}</b>.`,`x-intercepts: x^2 - ${K} = 10^0 = 1 → x^2 = ${K+1} → <b>x = ±√${K+1} ≈ ±${r.toFixed(3)}</b>.`,`No y-intercept: x = 0 gives log(-${K}), which is undefined.`,"The graph is symmetric about the y-axis because (-x)^2 = x^2 (an even function)."],
   rows:[["Domain",`(-∞, -${k}) ∪ (${k}, ∞)`],["Range","(-∞, ∞)"],["Asymptotes",`x = -${k} and x = ${k}`],["x-intercepts",`(±√${K+1}, 0)`],["y-intercept","none"],["Symmetry","even (about the y-axis)"]],
   tip:`Solve x^2 - ${K} > 0 with a sign chart; it is not just x > ${k}.`}; }
eTwoBr.r=()=>[rnd(1,4)];
function eInvExp(b,h,k){ const f=x=>Math.pow(b,x-h)+k, g=x=>logb(b,x-k)+h, y0=f(0), P=[[h,1+k],[h+1,b+k]];
  const fs=`${b}^(${shiftX(h).slice(1,-1)})${kTxt(k)}`.replace("^(x)","^x"), gs=`log_${b}(${shiftX(k).slice(1,-1)})${kTxt(h)}`;
  return {title:`Find and graph an inverse: f(x) = ${fs}`,q:`Find f^(-1)(x) for f(x) = ${fs} and graph both.`,
   g:{f:[{f},{f:g,d:[k+1e-7,1e9]},{f:x=>x,light:true}],h:[k],v:[k],p:[...P.flatMap(([x,y])=>[[x,y,`(${x}, ${y})`],[y,x,`(${y}, ${x})`]]),[0,y0,`(0, ${tv(y0)})`],[y0,0,`(${tv(y0)}, 0)`]],xr:[Math.min(k,h,0)-3,Math.max(k,h,0)+6],yr:[Math.min(k,h,0)-3,Math.max(k,h,0)+6],eq:true,cap:`f and its inverse reflect over y = x (gray). Asymptotes y = ${k} (for f) and x = ${k} (for the inverse).`},
   steps:[`Write y = ${fs} and <b>swap x and y</b>: x = ${fs.replace(/x/g,"y")}.`,`Isolate the power: ${shiftX(k).slice(1,-1)} = ${b}^(${shiftX(h).slice(1,-1).replace(/x/g,"y")}).`,`Rewrite as a log: ${shiftX(h).slice(1,-1).replace(/x/g,"y")} = log_${b}(${shiftX(k).slice(1,-1)}).`,`<b>f^(-1)(x) = ${gs}</b>.`,`f has asymptote y = ${k} and range y > ${k}; the inverse has asymptote <b>x = ${k}</b> and domain <b>x > ${k}</b>. Points swap: (${P[0][0]}, ${P[0][1]}) ↔ (${P[0][1]}, ${P[0][0]}).`],
   rows:[["","f(x)  |  f⁻¹(x)"],["Domain",`(-∞, ∞)  |  (${k}, ∞)`],["Range",`(${k}, ∞)  |  (-∞, ∞)`],["Asymptote",`y = ${k}  |  x = ${k}`]],
   tip:`Check: ${b} to the power log_${b}(u) is u, so f(f⁻¹(x)) = (${shiftX(k).slice(1,-1)})${kTxt(k)} = x ✓.`}; }
eInvExp.r=()=>[pick([2,3]),rnd(-2,2),nz(-3,3)];
function eSolveG(b,m,s){ const c=b**s-m*s, F=x=>Math.pow(b,x)-(m*x+c), roots=[]; for(let x=-8;x<6;x+=0.01){ if(F(x)*F(x+0.01)<=0&&Math.abs(F(x))<5) roots.push(sol(F,x,x+0.01)); }
  const R=roots.filter((r,i)=>i===0||Math.abs(r-roots[i-1])>0.05), others=R.filter(r=>Math.abs(r-s)>1e-3), line=`${m===1?"":m}x${c?(c>0?" + "+c:" - "+(-c)):""}`;
  return {title:`Solve by graphing: ${b}^x = ${line}`,q:`Solve ${b}^x = ${line} using a graph.`,
   g:{f:[{f:x=>Math.pow(b,x)},{f:x=>m*x+c,dash:true}],h:[0],p:R.map(r=>[r,m*r+c,`(${+r.toFixed(2)}, ${+(m*r+c).toFixed(2)})`]),xr:[Math.min(-4,...R)-1,Math.max(...R,1)+1.5],cy:6,cap:`Solid: y = ${b}ˣ. Dashed: y = ${line}. They meet ${R.length===1?"once":R.length===2?"twice":R.length+" times"}.`},
   steps:["Algebra cannot isolate x here, because x is both in an exponent and outside it. Graph each side instead.",`Graph y = ${b}^x and y = ${line} and find where they intersect.`,`One intersection is exact: x = ${s}, because ${b}^${s} = ${b**s} and ${m===1?"":m+"("}${s}${m===1?"":")"} ${c<0?"- "+(-c):"+ "+c} = ${m*s+c} ✓.`,others.length?`The other is near <b>x ≈ ${others.map(r=>r.toFixed(3)).join(", ")}</b> (use a calculator's intersect feature).`:"There is no other intersection: the line stays below the curve elsewhere.",`<b>Solutions: x = ${s}${others.map(r=>", x ≈ "+r.toFixed(3)).join("")}</b>.`],
   rows:[["Method","graph both sides, read the intersections"],["Solutions",`x = ${s}${others.map(r=>", x ≈ "+r.toFixed(3)).join("")}`]],
   tip:`Always check whether a second intersection hides on the left, where ${b}^x is close to its asymptote.`}; }
eSolveG.r=()=>[pick([2,3]),rnd(1,3),rnd(1,2)];
function eHidden(p,q){ const f=x=>Math.exp(2*x)-(p+q)*Math.exp(x)+p*q, xs=[p,q].map(v=>Math.log(v)), mn=-((p+q)**2)/4+p*q;
  const lab=v=>v===1?"0":`ln ${v}`;
  return {title:`A hidden quadratic: e^(2x) - ${p+q}e^x + ${p*q} = 0`,q:`Solve e^(2x) - ${p+q}e^x + ${p*q} = 0 and see it on the graph.`,
   g:{f:[{f}],h:[p*q],p:[...xs.map((x,i)=>[x,0,`(${lab([p,q][i])}, 0)`]),[0,f(0),`(0, ${tv(f(0))})`]].filter((v,i,a)=>a.findIndex(w=>Math.abs(w[0]-v[0])<1e-9&&Math.abs(w[1]-v[1])<1e-9)===i),xr:[-4,Math.log(Math.max(p,q))+1],yr:[Math.min(mn,0)-2,p*q+3],cap:`Two zeros at x = ${lab(p)} and x = ${lab(q)}. As x → −∞ the graph approaches y = ${p*q} (dashed asymptote).`},
   steps:[`e^(2x) = (e^x)^2, so let <b>u = e^x</b>: u^2 - ${p+q}u + ${p*q} = 0.`,`Factor: (u - ${p})(u - ${q}) = 0 → u = ${p} or u = ${q}.`,`Back-substitute: e^x = ${p} → <b>x = ${lab(p)}${p===1?"":" ≈ "+Math.log(p).toFixed(3)}</b>; e^x = ${q} → <b>x = ${lab(q)} ≈ ${Math.log(q).toFixed(3)}</b>.`,`Both are valid, since ${p} and ${q} are positive. (If u were negative or 0, there would be no solution.)`,`Asymptote: as x → -∞, e^x → 0, so y → 0 - 0 + ${p*q} = <b>${p*q}</b>.`],
   rows:[["Substitution","u = e^x"],["Solutions",`x = ${lab(p)}, x = ${lab(q)}`],["Horizontal asymptote",`y = ${p*q} (as x → -∞)`]],
   tip:"e^x is always positive: reject any u ≤ 0."}; }
eHidden.r=()=>{ const p=rnd(1,4); return [p,nz(p+1,6)]; };
const EXTR=[]; for(const b of [2,3,5]) for(let k=1;k<=4;k++) for(let x0=k+1;x0<=12;x0++){ const v=x0*x0-k*k; const n=Math.round(Math.log(v)/Math.log(b)); if(n>=1&&b**n===v) EXTR.push([b,k,x0,n]); }
function eExtr(b,k,x0,n){ const f=x=>logb(b,x+k)+logb(b,x-k);
  return {title:`Extraneous solution on a graph: log_${b}(x + ${k}) + log_${b}(x - ${k}) = ${n}`,q:`Solve log_${b}(x + ${k}) + log_${b}(x - ${k}) = ${n}.`,
   g:{f:[{f,d:[k+1e-7,1e9]},{f:()=>n,dash:true}],v:[k],p:[[x0,n,`(${x0}, ${n})`]],xr:[-x0-1,x0+3],yr:[-4,n+2],cap:`The curve exists only for x > ${k} (asymptote x = ${k}). It meets y = ${n} once, at x = ${x0}.`},
   steps:[`Domain first: x + ${k} > 0 and x - ${k} > 0 → <b>x > ${k}</b>.`,`Product rule: log_${b}((x + ${k})(x - ${k})) = ${n} → x^2 - ${k*k} = ${b}^${n} = ${b**n}.`,`x^2 = ${x0*x0} → x = ${x0} or x = -${x0}.`,`x = -${x0} is <b>extraneous</b> (not in the domain): log_${b}(${-x0+k}) is undefined.`,`<b>Solution: x = ${x0}</b>. The graph shows only one intersection.`],
   rows:[["Domain",`x > ${k}`],["Candidates",`x = ±${x0}`],["Solution",`x = ${x0}`],["Asymptote",`x = ${k}`]],
   tip:"Always check log solutions in the original equation; some algebra steps create fake roots."}; }
eExtr.r=()=>pick(EXTR);
function eIso(a,b,x0){ const V=a*b**x0;
  return {title:`Check an exponential equation on a graph: ${a} · ${b}^x = ${V}`,q:`Solve ${a} · ${b}^x = ${V}.`,
   g:{f:[{f:x=>a*Math.pow(b,x)},{f:()=>V,dash:true}],h:[0],p:[[x0,V,`(${x0}, ${V})`],[0,a,`(0, ${a})`]],xr:[-3,x0+2],yr:[-V*.1,V*1.25],cap:`y = ${a} · ${b}ˣ meets y = ${V} at x = ${x0}.`},
   steps:[`Divide first: ${b}^x = ${b**x0}. (Don't multiply ${a} · ${b} = ${a*b}!)`,`Write ${b**x0} as a power of ${b}: ${b}^x = ${b}^${x0}.`,`<b>x = ${x0}</b>. Check: ${a} · ${b}^${x0} = ${a} · ${b**x0} = ${V} ✓.`],
   rows:[["Key step","isolate the power before using logs"],["Solution",`x = ${x0}`]],
   tip:`${a} · ${b}^x is not ${a*b}^x: the exponent applies only to the ${b}.`}; }
eIso.r=()=>[rnd(2,5),pick([2,3]),rnd(2,4)];
/* rules cards */
function rRat(seed){ const r=pick([2,3,4,5]), q=pick([2,3]), p=pick([2,3]), N=r**q, P2=pick([2,3]), r2=pick([2,3]), N2=(r2**2)**2, k=pick([2,3]), m=pick([1,2]), K=k**3;
  const lines=[`${N}^({{${p}|${q}}}) = (${q===2?"√":"∛"}${N})^${p} = ${r}^${p} = <b>${r**p}</b>`,`${N2}^({{-3|4}}) = {{1|${N2}^({{3|4}})}} = {{1|(⁴√${N2})^3}} = {{1|${r2}^3}} = <b>{{1|${r2**3}}}</b>`,`(${K}x^${3*m})^({{1|3}}) = ${K}^({{1|3}}) · x^(${3*m} · {{1|3}}) = <b>${k}x${m>1?"^"+m:""}</b>`,`x^({{1|${P2}}}) · x^({{1|${P2+1}}}) = x^({{1|${P2}}} + {{1|${P2+1}}}) = <b>x^({{${2*P2+1}|${P2*(P2+1)}}})</b>`,`Solve x^({{${p}|${q}}}) = ${r**p}: raise both sides to the {{${q}|${p}}} power: x = (${r**p})^({{${q}|${p}}}) = ${r}^${q} = <b>${N}</b>`];
  return {title:"Rational exponents",q:"Evaluate or simplify.",steps:lines,rows:[["a^({{m|n}})","(ⁿ√a)^m: root first, then power"],["a^(-n)","{{1|a^n}}"],["Product rule","add exponents"],["Power rule","multiply exponents"]],tip:"Take the root first: it keeps the numbers small."}; }
rRat.r=()=>[0];
function rEval(){ const b=pick([2,3]), m=pick([2,3]), n=pick([1,3,5].filter(v=>v%m)), k=rnd(2,9), j=rnd(3,8), c=pick([5,7,10,12,20]);
  return {title:"Evaluating logarithms",q:"Evaluate without a calculator when possible.",steps:[`log_${b**m} ${b**n}: ${b**m}^y = ${b**n} → ${b}^(${m}y) = ${b}^${n} → y = <b>{{${n}|${m}}}</b>`,`log_${b**2}({{1|${b}}}): ${b**2}^y = ${b}^(-1) → ${b}^(2y) = ${b}^(-1) → y = <b>{{-1|2}}</b>`,`ln e^${k} = <b>${k}</b> and 10^(log ${j}) = <b>${j}</b> (inverse functions cancel)`,`log_${b} ${c} = {{ln ${c}|ln ${b}}} ≈ <b>${(Math.log(c)/Math.log(b)).toFixed(3)}</b> (change of base)`,`log_${b} 0 is <b>undefined</b>: no power of ${b} equals 0`],
   rows:[["Definition","log_b x = y means b^y = x"],["Change of base","log_b x = {{ln x|ln b}}"],["Cancel","log_b(b^x) = x, b^(log_b x) = x"]],tip:"Rewrite both numbers as powers of the same base to get exact answers."}; }
rEval.r=()=>[];
function rExp(){ const b=pick([2,3,5]), e1=rnd(2,4), p=rnd(2,4), q=pick([2,3]), M=b**rnd(2,3), D=pick([2,4,8]), bb=pick([2,3]);
  return {title:"Expand and condense",q:"Expand or condense each expression.",steps:[`Expand log_${b}({{${b*b}x^${e1}|y}}) = log_${b} ${b*b} + ${e1} log_${b} x - log_${b} y = <b>2 + ${e1} log_${b} x - log_${b} y</b>`,`Condense ${p} ln x - {{1|${q}}} ln y + ln ${bb} = ln x^${p} - ln ${q===2?"√":"∛"}y + ln ${bb} = <b>ln({{${bb}x^${p}|${q===2?"√":"∛"}y}})</b>`,`Evaluate log_2 ${D*8} - log_2 ${D} = log_2({{${D*8}|${D}}}) = log_2 8 = <b>3</b>`,`Expand ln(e^${e1} √x) = <b>${e1} + {{1|2}} ln x</b>`],
   rows:[["Product","log(MN) = log M + log N"],["Quotient","log({{M|N}}) = log M - log N"],["Power","log(M^p) = p log M"]],tip:"log(M + N) cannot be split. There is no rule for the log of a sum."}; }
rExp.r=()=>[];
function rEq(){ const b=pick([2,3]), m=2, n=3, c=rnd(1,3), x1=(m*c)/(n-m), k=rnd(2,4), K=b**k, a=pick([5,6,7]), d=rnd(2,4), V=pick([7,10,12]), h=rnd(2,4);
  return {title:"Exponential equations: same base or logs",q:"Solve each equation.",steps:[`${b**m}^(x + ${c}) = ${b**n}^x → ${b}^(${m}x + ${m*c}) = ${b}^(${n}x) → ${m}x + ${m*c} = ${n}x → <b>x = ${x1}</b>`,`({{1|${b}}})^x = ${K} → ${b}^(-x) = ${b}^${k} → <b>x = -${k}</b>`,`${a}^(${d}x) = ${V} → ${d}x ln ${a} = ln ${V} → x = {{ln ${V}|${d} ln ${a}}} ≈ <b>${(Math.log(V)/(d*Math.log(a))).toFixed(3)}</b>`,`e^(x - ${h}) = ${V} → x - ${h} = ln ${V} → x = ${h} + ln ${V} ≈ <b>${(h+Math.log(V)).toFixed(3)}</b>`],
   rows:[["Same base?","set the exponents equal"],["Different bases","take ln of both sides"],["Base e","use ln"]],tip:`After taking logs, the exponent comes down as a multiplier: ln(${a}^(${d}x)) = ${d}x ln ${a}.`}; }
rEq.r=()=>[];
const G=[];
G.push(["A. Exponential functions",[X(eGD,[2]),X(E1,[1,2,3,1]),X(E2,[-1,3,0,4]),X(E3,[3,.5,0,-2]),X(E4,[2,E,-1,-5]),X(E5,[-2,2,2,3]),X(eTwo,[3,2,1,2]),X(eHalf,[80,6,3,10]),X(eAsym,[[[1,5,0,-3],[-2,3,-1,6],[4,E,0,1],[1,.5,0,0]]])]]);
G.push(["B. Logarithmic functions",[X(eInvPair,[2]),X(L1,[1,2,-3,-1]),X(L2,[-1,3,2,0]),X(L3,[2,E,0,1]),X(L4,[3,10,1,-2]),X(eLogRef,[10]),X(eLogLin,[5,-2,4]),X(eTwoBr,[3])]]);
G.push(["C. Inverses and solving with graphs",[X(eInvExp,[3,1,2]),X(eSolveG,[2,1,2]),X(eHidden,[2,3]),X(eExtr,[3,1,2,1]),X(eIso,[3,2,4])]]);
G.push(["D. Exponent and log rules: quick worked examples",[X(rRat,[0]),X(rEval,[]),X(rExp,[]),X(rEq,[])]]);
const COUNT=G.reduce((s,g)=>s+g[1].length,0);

/* ---------- html ---------- */
const CSS=`.el .cs-card{gap:8px}
.el-q{margin:0;font-size:17px}
.el-steps{margin:4px 0 2px;padding-left:22px;font-size:16px;line-height:1.7}
.el-steps li{margin:1px 0}
.el-kf{border-collapse:collapse;font-size:15px;margin:2px 0;width:100%}
.el-kf th,.el-kf td{border:1px solid #bbb;padding:2px 8px;text-align:left;vertical-align:top}
.el-kf th{background:#f1f1f1;font-weight:600;white-space:nowrap;width:1%}
.el-grp{font-size:21px;margin:22px 0 10px;border-bottom:2px solid #111;padding-bottom:3px}
.el-lab{border:2px solid #111;padding:10px 14px;margin:0 0 6px;background:#fafafa}
.el-lab h4{margin:0 0 4px;font-size:20px}
.el-lab .row{display:flex;gap:8px;flex-wrap:wrap;margin:6px 0}
.el-lab button{border:1.5px solid #111;background:#111;color:#fff;padding:4px 14px;font:600 16px 'EB Garamond',Georgia,serif;cursor:pointer}
.el-lab button.alt{background:#fff;color:#111}
.el-lab button:hover{opacity:.85}
.el-out .cs-card{margin-top:10px}
.el-new{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.el-new button{border:1.5px solid #111;background:#111;color:#fff;padding:4px 14px;font:600 15.5px 'EB Garamond',Georgia,serif;cursor:pointer}
.el-new button:hover{background:#333}
.el-new span{font-size:14.5px;font-style:italic;color:#555}
.el .cs-card figure.gph{width:min(340px,50%)}
@media (max-width:640px){.el .cs-card figure.gph{float:none;width:100%;margin:6px 0}}`;
const REG=[];
const cardBody=c=>`<p class="el-q"><b>Example.</b> ${fmt(c.q)}</p>
   <div class="cs-ex">${c.g?plot(c.g):""}<ol class="el-steps">${c.steps.map(s=>`<li>${fmt(s)}</li>`).join("")}</ol><div style="clear:both"></div></div>
   ${c.rows?`<table class="el-kf">${c.rows.map(([a,b])=>`<tr><th>${fmt(a)}</th><td>${fmt(b)}</td></tr>`).join("")}</table>`:""}
   ${c.tip?`<p class="cs-tip"><b>⚠ Watch out:</b> ${fmt(c.tip)}</p>`:""}`;
function card(c,i,open,e){ const id=e?REG.push(e)-1:-1;
  return `<details class="cs-card"${open?" open":""}><summary><h4><span class="n">${i}</span>${fmt(c.title)}</h4></summary>
   <div class="elb">${cardBody(c)}</div>${id>=0?`<div class="el-new"><button type="button" data-elnew="${id}">↻ New example</button><span>a new problem of this type, fully worked out</span></div>`:""}</details>`;
}
function html(id){
  if(id!=="unit-7") return "";
  let n=0; REG.length=0;
  return `<div class="el cs">
   <div class="el-lab"><h4>↻ Graph lab: new worked examples</h4><div>Press a button for a new transformed graph, fully worked out: the transformations, asymptote, key points, intercepts, domain and range.</div>
    <div class="row"><button type="button" data-el="exp">↻ New exponential</button><button type="button" data-el="log">↻ New logarithm</button><button type="button" class="alt" data-el="clear">Clear</button></div><div class="el-out"></div></div>
   <div class="cs-bar"><button type="button" data-cs="open">Open all</button><button type="button" data-cs="close">Close all</button><span>${COUNT} worked examples with graphs, steps and key features.</span></div>
   ${G.map(([h,L])=>`<h4 class="el-grp">${h}</h4><div class="cs-grid">${L.map(e=>card(e.mk(...e.p),++n,false,e)).join("")}</div>`).join("")}</div>`;
}
function randExp(){ const b=pick([2,3,.5,1/3,E,2,3]), a=pick([1,1,-1,2,-2,3]), h=rnd(-3,3), k=rnd(-4,4); return expEx(a,b,h,k); }
function randLog(){ const b=pick([2,3,E,10,2,3]), a=pick([1,1,-1,2,-2,3]), h=rnd(-4,3), k=rnd(-3,3); return logEx(a,b,h,k); }
function bind(root){
  if(!document.getElementById("a2elcss")){ const st=document.createElement("style"); st.id="a2elcss"; st.textContent=CSS; document.head.appendChild(st); }
  root.querySelectorAll(".el").forEach(el=>{
    const out=el.querySelector(".el-out");
    el.querySelectorAll("[data-el]").forEach(b=>b.onclick=()=>{
      if(b.dataset.el==="clear"){ out.innerHTML=""; return; }
      out.innerHTML=card(b.dataset.el==="exp"?randExp():randLog(),"↻",true);
    });
    el.querySelectorAll("[data-elnew]").forEach(b=>b.onclick=()=>{ const e=REG[+b.dataset.elnew]; if(!e) return; let c=null;
      for(let i=0;i<6&&!c;i++){ try{ c=e.mk(...e.mk.r()); }catch(err){ c=null; } } if(!c) return;
      const d=b.closest(".cs-card"); d.querySelector(".elb").innerHTML=cardBody(c); d.querySelector("summary h4").innerHTML=`<span class="n">${d.querySelector(".n").textContent}</span>${fmt(c.title)}`; d.open=true; });
    el.querySelectorAll('[data-cs="open"],[data-cs="close"]').forEach(b=>b.onclick=()=>el.querySelectorAll(".cs-grid details.cs-card").forEach(d=>d.open=b.dataset.cs==="open"));
  });
}
window.A2EXPLOG={has:id=>id==="unit-7",count:()=>COUNT,html,bind,_test:{expEx,logEx,randExp,randLog,G,REG}};
})();
