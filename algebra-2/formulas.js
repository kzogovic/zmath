/* Formulas page: special products & factoring patterns.
   Sections: formulas, multiple choice, flashcards, type the answer. */
(function(){
const RED="#c8102e";

/* ---------- styles ---------- */
const css=`
nav button.fbtn{background:${RED};border-color:${RED};color:#fff;font-weight:600}
nav button.fbtn:hover{background:#a00d25}
nav button.fbtn[aria-current="true"]{background:#7d0a1c;border-color:#7d0a1c;box-shadow:inset 0 -3px 0 #fff}
#sec-formulas .chapter,#sec-formulas h2{color:${RED}}
#sec-formulas .sub{border-bottom-color:${RED}}
#sec-formulas .secnav{border-color:${RED};background:#fff6f7}
#sec-formulas .secnav button{border-color:${RED};color:${RED}}
#sec-formulas .secnav button b{background:${RED}}
#sec-formulas .secnav button:hover,#sec-formulas .secnav button.cur{background:${RED};color:#fff}
#sec-formulas .secnav button:hover b,#sec-formulas .secnav button.cur b{background:#fff;color:${RED}}
#sec-formulas details.fold{border-color:${RED}}
#sec-formulas details.fold>summary.subh{color:${RED}}
#sec-formulas details.fold>summary.subh::after{border-color:${RED}}
#sec-formulas details.fold[open]>summary.subh{border-bottom-color:${RED};background:#fff1f3}
#sec-formulas details.fold[open]>summary.subh::after{background:${RED}}
#sec-formulas .subh .num{background:${RED}}
.flead{background:#fff1f3;border:1.5px solid ${RED};padding:10px 14px;margin:0 0 14px}
.fopen{background:${RED}!important;border-color:${RED}!important}
.fopen:hover{background:#a00d25!important}
.fgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:18px;margin-top:12px}
.fbox{border:2px solid ${RED};background:#fff;display:flex;flex-direction:column}
.fbox h4{margin:0;background:${RED};color:#fff;padding:6px 12px;font-size:19px;font-weight:600;letter-spacing:.02em}
.fbox .fm{font-size:25px;text-align:center;padding:14px 10px 10px;font-weight:600;border-bottom:1px dashed ${RED}}
.fbox .fm .eq{color:${RED}}
.fbox .fb{padding:10px 14px 12px;font-size:16.5px;line-height:1.45;display:flex;flex-direction:column;gap:8px}
.lbl{font-variant:small-caps;letter-spacing:.06em;color:${RED};margin-right:5px;font-weight:700}
.m{white-space:nowrap}
.fbox .ex b{color:${RED};white-space:nowrap}
.fbox .warn{border-left:3px solid ${RED};padding-left:8px}
.fbox .fnew{align-self:flex-start;margin-top:2px}
.fbox .fx{font-size:15px;color:#444;margin-top:4px;border-left:2px solid #f1c4cb;padding-left:8px}
.fbox .exb b{white-space:nowrap}
.fbox .step{display:block;margin-left:12px}
.ftip{border:2px solid ${RED};padding:12px 16px;margin-top:18px;background:#fff6f7}
.ftip h4{margin:0 0 6px;color:${RED};font-size:20px}
.tw{overflow-x:auto;max-width:100%}
.ftip table{border-collapse:collapse;margin:6px 0;font-size:16px}
.ftip td,.ftip th{border:1px solid #c9a2a8;padding:2px 9px;text-align:center;min-width:46px}
.tw{display:inline-block;margin-right:14px;vertical-align:top}
.ftip th{background:${RED};color:#fff;font-weight:600}
.fctl{display:flex;flex-direction:column;gap:9px;align-items:flex-start;margin:12px 0;padding:10px 12px;border:1.5px solid ${RED};background:#fff6f7}
.fctl .grp{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.fctl .gl{font-variant:small-caps;letter-spacing:.06em;font-weight:600;color:#333;margin-right:2px}
.chips{display:flex;flex-wrap:wrap;gap:5px}
.chips button{border:1.5px solid ${RED};background:#fff;color:${RED};padding:3px 11px;font:500 15.5px 'EB Garamond',Georgia,serif;cursor:pointer;border-radius:999px}
.chips button:hover{background:#fff1f3}
.chips button.on{background:${RED};color:#fff}
.fctl .acts{display:flex;gap:8px;align-items:center;flex-wrap:wrap;width:100%}
.fbtn2{border:1.5px solid ${RED};background:${RED};color:#fff;padding:5px 14px;font:600 16px 'EB Garamond',Georgia,serif;cursor:pointer}
.fbtn2:hover{background:#a00d25}
.fbtn2.ghost{background:#fff;color:${RED}}
.fbtn2.ghost:hover{background:#fff1f3}
.fscore{margin-left:auto;font-weight:600;font-size:17px;color:${RED}}
.fq{border:1.5px solid #111;padding:10px 14px;margin:0 0 12px;background:#fff}
.fq .qt{font-size:18.5px;margin-bottom:10px;display:flex;gap:8px;align-items:baseline}
.fq .qt .qn{flex:none;margin-right:0!important;transform:translateY(-2px)}
.fq .qt .qn{display:inline-block;min-width:26px;height:26px;line-height:26px;border-radius:50%;background:${RED};color:#fff;text-align:center;font-size:14px;margin-right:8px}
.fq .tg{font-size:12.5px;letter-spacing:.1em;text-transform:uppercase;color:${RED};opacity:.8;margin:0 0 4px}
.fq .qt b{white-space:nowrap}
.fexp b{white-space:nowrap}
.fopts{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:8px}
.fopts button{border:1.5px solid #111;background:#fff;text-align:left;padding:7px 10px;font:17.5px 'EB Garamond',Georgia,serif;cursor:pointer;color:#111}
.fopts button:hover:not(:disabled){background:#f4f4f4}
.fopts button .L{font-weight:700;margin-right:6px}
.fopts button.ok{background:#e5f4e8;border-color:#1b7a34}
.fopts button.bad{background:#fde6e9;border-color:${RED};text-decoration:line-through}
.fopts button:disabled{cursor:default;color:#111}
.fexp{display:none;margin-top:10px;border-left:3px solid ${RED};padding:4px 0 4px 10px;font-size:16.5px;background:#fffafa}
.fexp.on{display:block}
.fexp .v{font-weight:700}
.fexp .v.ok{color:#1b7a34}.fexp .v.bad{color:${RED}}
.fdone{border:2px solid ${RED};padding:12px 16px;font-size:19px;background:#fff1f3;margin-top:6px}
/* flashcards */
.fc-wrap{max-width:640px;margin:14px auto 0}
details.fold>.fc-wrap{margin:14px auto 0;width:calc(100% - 28px)}
.fc{perspective:1200px;cursor:pointer;height:270px;user-select:none}
.fc-in{position:relative;width:100%;height:100%;transition:transform .5s;transform-style:preserve-3d}
.fc.flip .fc-in{transform:rotateY(180deg)}
.fc-f,.fc-b{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border:2.5px solid ${RED};display:flex;flex-direction:column;align-items:center;justify-content:center;padding:18px 22px;text-align:center}
.fc-f{background:#fff}
.fc-t{font-size:19px;color:#555;font-style:italic;margin-bottom:10px}
.fc-m{font-size:30px;font-weight:600;line-height:1.3}
.fc-b .fc-m{font-size:27px}
.fc-f .fc-t+.fc-m{color:${RED}}
.fc-b{background:${RED};color:#fff;transform:rotateY(180deg)}
.fc-f small,.fc-b small{position:absolute;top:10px;left:14px;font-size:13px;letter-spacing:.12em;text-transform:uppercase;font-weight:400;opacity:.7}
.fc-b .nt{font-size:17px;font-style:italic;margin-top:14px;opacity:.95;max-width:480px}
.fc-hint{position:absolute;bottom:10px;font-size:13px;font-style:italic;opacity:.6;font-weight:400}
.fc-bar{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;margin-top:12px}
.fc-ct{font-size:17px;min-width:110px;text-align:center}
.fc-stat{text-align:center;margin-top:8px;font-size:16px;color:#444}
.fc-prog{height:6px;background:#f1d3d8;margin-top:10px}
.fc-prog i{display:block;height:100%;background:${RED};transition:width .2s}
/* typing */
.ftype .row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.ftype input{flex:1 1 260px;font:18px 'EB Garamond',Georgia,serif;padding:6px 8px;border:1.5px solid #111;min-width:0}
.ftype input.ok{border-color:#1b7a34;background:#f2fbf4}
.ftype input.bad{border-color:${RED};background:#fff4f6}
.ftype .pv{font-size:15.5px;color:#666;margin-top:4px}
.ftype .pv:empty{display:none}
.fexp:empty{display:none}
.ftype .pv span{color:#111}
.fhelp{font-size:15.5px;color:#444;font-style:italic;margin:4px 0 10px}
.fhelp code{font-style:normal;background:#f4f4f4;padding:0 4px;border:1px solid #ddd}
@media (max-width:640px){details.fold>.fc-wrap{width:calc(100% - 16px)}.ftip td,.ftip th{padding:2px 4px;min-width:38px;font-size:15px}.tw{display:block}.fgrid{grid-template-columns:1fr}.fbox .fm{font-size:21px}.fc{height:250px}.fc-m{font-size:23px}.fc-b .fc-m{font-size:20px}.fc-t{font-size:17px}.fq{padding:10px}.ftype .row button{flex:1}}
.pkey{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:10px}
.pk{display:flex;gap:10px;border:1.5px solid #111;padding:8px 12px;background:#fff}
.pk .qn{flex:none;min-width:26px;height:26px;line-height:26px;border-radius:50%;background:${RED};color:#fff;text-align:center;font-size:13px}
.pk .pq{font-size:18px}.pk .pa{font-size:17px;margin-top:2px}.pk .pa b{color:${RED}}.pk .pm{font-size:14.5px;font-style:italic;color:#555;margin-top:2px}
#sec-formulas .secnav.sticky{flex-wrap:wrap;overflow:visible;row-gap:7px}
#sec-formulas .secnav .jb{flex-basis:100%;display:flex;flex-wrap:wrap;gap:8px}
@media (max-width:760px){#sec-formulas .secnav .jb{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:thin;padding-bottom:2px}}
@media print{.fctl,.fc-bar{display:none}}
`;
const st=document.createElement("style"); st.textContent=css; document.head.appendChild(st);

/* ---------- helpers ---------- */
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const M="−"; // minus sign
const sup=n=>n===1?"":`<sup>${n}</sup>`;
const num=n=>(n<0?M:"")+Math.abs(n).toLocaleString("en-US");

/* polynomial in x,y: Map "ex,ey" -> coef */
function P(terms){const m=new Map();for(const [c,ex,ey] of terms){const k=ex+","+ey;m.set(k,(m.get(k)||0)+c);}for(const [k,v] of [...m]) if(v===0) m.delete(k);return m;}
function mul(A,B){const t=[];for(const [ka,ca] of A)for(const [kb,cb] of B){const [a1,a2]=ka.split(",").map(Number),[b1,b2]=kb.split(",").map(Number);t.push([ca*cb,a1+b1,a2+b2]);}return P(t);}
function add(A,B,s=1){const t=[];for(const [k,c] of A){const [e1,e2]=k.split(",").map(Number);t.push([c,e1,e2]);}for(const [k,c] of B){const [e1,e2]=k.split(",").map(Number);t.push([s*c,e1,e2]);}return P(t);}
function pw(A,n){let r=P([[1,0,0]]);for(let i=0;i<n;i++) r=mul(r,A);return r;}
function evalP(A,x,y){let s=0;for(const [k,c] of A){const [e1,e2]=k.split(",").map(Number);s+=c*Math.pow(x,e1)*Math.pow(y,e2);}return s;}
function fmt(A){
  const t=[...A].map(([k,c])=>{const [ex,ey]=k.split(",").map(Number);return {c,ex,ey};}).sort((a,b)=>(b.ex+b.ey)-(a.ex+a.ey)||b.ex-a.ex);
  if(!t.length) return "0";
  return t.map((o,i)=>{const v=(o.ex?"x"+sup(o.ex):"")+(o.ey?"y"+sup(o.ey):"");const ac=Math.abs(o.c);const body=(ac===1&&v?"":ac)+v;
    return i===0?(o.c<0?M:"")+body:(o.c<0?" "+M+" ":" + ")+body;}).join("");
}
const par=A=>"("+fmt(A)+")";
const key=s=>s.replace(/<[^>]+>/g,"").replace(/\s/g,"");

/* binomial pieces: A = p·x, B = q (or q·y) */
const gcd=(a,b)=>b?gcd(b,a%b):a;
function parts(pMax,qMax){let p,q;do{p=rnd(1,pMax);q=rnd(1,qMax);}while(gcd(p,q)!==1);const y=Math.random()<.28?1:0;return {p,q,y,A:P([[p,1,0]]),B:P([[q,0,y]])};}
const lin=(o,s)=>P([[o.p,1,0],[s*o.q,0,o.y]]);
const aStr=o=>fmt(o.A), bStr=o=>fmt(o.B);

/* random wrong answer by nudging one coefficient (safety net) */
function nudge(A){const t=[...A];const i=rnd(t.length>1?1:0,t.length-1);const m=new Map(A);const [k,c]=t[i];m.set(k,Math.random()<.5?-c:c+pick([-2,-1,1,2])||c+3);for(const [kk,v] of [...m]) if(v===0) m.delete(kk);return m;}

/* ---------- problem generators ---------- */
const TOPICS={ds:"Difference of Squares",dc:"Difference of Cubes",sc:"Sum of Cubes",sq:"Square of a Binomial",cu:"Cube of a Binomial",mm:"Mental Math & Identities"};

function genDS(){
  const r=Math.random();
  if(r<.15){ // sum of squares trap
    const o=parts(4,9); const e=add(pw(o.A,2),pw(o.B,2));
    return {t:"ds",q:`Factor completely: <b>${fmt(e)}</b>`,c:"Prime (does not factor over the reals)",w:[`(${aStr(o)} ${M} ${bStr(o)})(${aStr(o)} + ${bStr(o)})`,`(${aStr(o)} + ${bStr(o)})<sup>2</sup>`,`(${aStr(o)} ${M} ${bStr(o)})<sup>2</sup>`],
      x:`This is a <b>sum</b> of squares, ${aStr(o)}<sup>2</sup> + ${bStr(o)}<sup>2</sup>. Only a <b>difference</b> of squares factors: (${aStr(o)} ${M} ${bStr(o)})(${aStr(o)} + ${bStr(o)}) would multiply back to ${fmt(add(pw(o.A,2),pw(o.B,2),-1))}.`,
      chk:{kind:"prime"}};
  }
  if(r<.35){ // GCF first
    const k=pick([2,3,5]),q=rnd(2,9); const o={p:1,q,y:0,A:P([[1,1,0]]),B:P([[q,0,0]])};
    const e=P([[k,2,0],[-k*q*q,0,0]]);
    return {t:"ds",q:`Factor completely: <b>${fmt(e)}</b>`,c:`${k}${par(lin(o,-1))}${par(lin(o,1))}`,
      w:[`${par(lin(o,-1))}${par(lin(o,1))}`,`${k}${par(lin(o,-1))}<sup>2</sup>`,`(${k}x ${M} ${q})(${k}x + ${q})`],
      x:`First take out the GCF ${k}: ${fmt(e)} = ${k}(x<sup>2</sup> ${M} ${q*q}). Then x<sup>2</sup> ${M} ${q*q} = x<sup>2</sup> ${M} ${q}<sup>2</sup> = (x ${M} ${q})(x + ${q}). Answer: <b>${k}${par(lin(o,-1))}${par(lin(o,1))}</b>.`,
      chk:{kind:"factor",f:(x,y)=>evalP(e,x,y)}};
  }
  const o=parts(5,9); const e=add(pw(o.A,2),pw(o.B,2),-1);
  const c=par(lin(o,-1))+par(lin(o,1));
  return {t:"ds",q:`Factor completely: <b>${fmt(e)}</b>`,c,w:[par(lin(o,-1))+"<sup>2</sup>",par(lin(o,1))+"<sup>2</sup>","Prime (does not factor over the reals)"],
    x:`a<sup>2</sup> ${M} b<sup>2</sup> = (a ${M} b)(a + b) with a = ${aStr(o)} and b = ${bStr(o)}, because ${fmt(pw(o.A,2))} = (${aStr(o)})<sup>2</sup> and ${fmt(pw(o.B,2))} = (${bStr(o)})<sup>2</sup>. Answer: <b>${c}</b>.`,
    chk:{kind:"factor",f:(x,y)=>evalP(e,x,y)}};
}
function genCubes(sum){
  const o=parts(4,5); const s=sum?1:-1;
  const e=add(pw(o.A,3),pw(o.B,3),s);
  const tri=(sm,mid)=>P([...pw(o.A,2)].map(([k,c])=>[c,...k.split(",").map(Number)]).concat([[sm*mid*o.p*o.q,1,o.y]],[...pw(o.B,2)].map(([k,c])=>[c,...k.split(",").map(Number)])));
  const good=par(lin(o,s))+par(tri(-s,1));
  const w=[par(lin(o,s))+par(tri(s,1)), par(lin(o,-s))+par(tri(-s,1)), par(lin(o,s))+par(tri(-s,2))];
  const A=aStr(o),B=bStr(o);
  return {t:sum?"sc":"dc",q:`Factor completely: <b>${fmt(e)}</b>`,c:good,w,
    x:`a<sup>3</sup> ${sum?"+":M} b<sup>3</sup> = (a ${sum?"+":M} b)(a<sup>2</sup> ${sum?M:"+"} ab + b<sup>2</sup>) with a = ${A}, b = ${B}. <br>SOAP: <b>S</b>ame sign (${sum?"+":M}), <b>O</b>pposite sign (${sum?M:"+"}), <b>A</b>lways <b>P</b>ositive (+). Middle term is ab = ${fmt(mul(o.A,o.B))}, <i>not</i> 2ab. Answer: <b>${good}</b>.`,
    chk:{kind:"factor",f:(x,y)=>evalP(e,x,y)}};
}
function genSq(){
  const o=parts(5,9); const s=pick([1,-1]); const L=lin(o,s); const e=pw(L,2);
  const w=[fmt(add(pw(o.A,2),pw(o.B,2),s===1?1:-1)), fmt(add(add(pw(o.A,2),pw(o.B,2)),mul(o.A,o.B),s)), o.p>1?fmt(add(add(P([[o.p,2,0]]),pw(o.B,2)),P([[2*s*o.p*o.q,1,o.y]]))):fmt(pw(lin(o,-s),2))];
  const A=aStr(o),B=bStr(o);
  return {t:"sq",q:`Expand: <b>${par(L)}<sup>2</sup></b>`,c:fmt(e),w,
    x:`(a ${s>0?"+":M} b)<sup>2</sup> = a<sup>2</sup> ${s>0?"+":M} 2ab + b<sup>2</sup> with a = ${A}, b = ${B}: <br>(${A})<sup>2</sup> ${s>0?"+":M} 2(${A})(${B}) + (${B})<sup>2</sup> = <b>${fmt(e)}</b>. <br>Don't forget the middle term 2ab.`,
    chk:{kind:"expand",f:(x,y)=>evalP(e,x,y)}};
}
function lc(list){let r=P([]);for(const [c,A] of list) r=add(r,A,c);return r;}
function genCu(){
  const o=parts(3,4); const s=pick([1,-1]); const L=lin(o,s); const e=pw(L,3);
  const T0=pw(o.A,3),T1=mul(pw(o.A,2),o.B),T2=mul(o.A,pw(o.B,2)),T3=pw(o.B,3);
  const w=[fmt(lc([[1,T0],[s,T3]])), fmt(lc([[1,T0],[s,T1],[1,T2],[s,T3]])),
    s<0?fmt(lc([[1,T0],[-3,T1],[-3,T2],[-1,T3]])):fmt(lc([[1,T0],[3,T1],[3,T2],[1,o.B]]))];
  const A=aStr(o),B=bStr(o),sg=s>0?"+":M;
  return {t:"cu",q:`Expand: <b>${par(L)}<sup>3</sup></b>`,c:fmt(e),w,
    x:`(a ${sg} b)<sup>3</sup> = a<sup>3</sup> ${sg} 3a<sup>2</sup>b + 3ab<sup>2</sup> ${sg} b<sup>3</sup> (coefficients 1, 3, 3, 1${s<0?"; signs alternate + − + −":""}) with a = ${A}, b = ${B}:<br>(${A})<sup>3</sup> ${sg} 3(${A})<sup>2</sup>(${B}) + 3(${A})(${B})<sup>2</sup> ${sg} (${B})<sup>3</sup> = <b>${fmt(e)}</b>.`,
    chk:{kind:"expand",f:(x,y)=>evalP(e,x,y)}};
}
function genMM(){
  const r=rnd(0,5);
  if(r===0){ const base=pick([100,100,1000,50]),k=rnd(1,base===50?4:9),s=pick([1,-1]),n=base+s*k,ans=n*n;
    return {t:"mm",q:`Use a binomial square to find <b>${num(n)}<sup>2</sup></b> without a calculator.`,c:num(ans),w:[num(base*base+s*k*k),num(base*base+s*base*k+k*k),num(base*base+s*2*base*k-k*k)],
      x:`${num(n)}<sup>2</sup> = (${base} ${s>0?"+":M} ${k})<sup>2</sup> = ${num(base*base)} ${s>0?"+":M} 2(${base})(${k}) + ${k*k} = ${num(base*base)} ${s>0?"+":M} ${num(2*base*k)} + ${k*k} = <b>${num(ans)}</b>.`,chk:{kind:"num",n:ans}}; }
  if(r===1){ const m=pick([30,40,50,60,70,80,90,100]),d=rnd(1,6),a=m+d,b=m-d,ans=a*a-b*b;
    return {t:"mm",q:`Use the difference of squares to find <b>${a}<sup>2</sup> ${M} ${b}<sup>2</sup></b>.`,c:num(ans),w:[num((a-b)*(a-b)),num(ans/2),num(ans+2*d*d)],
      x:`a<sup>2</sup> ${M} b<sup>2</sup> = (a ${M} b)(a + b) = (${a} ${M} ${b})(${a} + ${b}) = (${a-b})(${a+b}) = <b>${num(ans)}</b>.`,chk:{kind:"num",n:ans}}; }
  if(r===2){ const a=rnd(1,6),b=rnd(1,6),s=a+b,m=a*b,ans=s*s-2*m;
    return {t:"mm",q:`If a + b = ${s} and ab = ${m}, find <b>a<sup>2</sup> + b<sup>2</sup></b>.`,c:num(ans),w:[num(s*s),num(s*s-m),num(s*s+2*m)],
      x:`(a + b)<sup>2</sup> = a<sup>2</sup> + 2ab + b<sup>2</sup>, so a<sup>2</sup> + b<sup>2</sup> = (a + b)<sup>2</sup> ${M} 2ab = ${s}<sup>2</sup> ${M} 2(${m}) = ${s*s} ${M} ${2*m} = <b>${ans}</b>.`,chk:{kind:"num",n:ans}}; }
  if(r===3){ const a=rnd(1,5),b=rnd(1,5),s=a+b,m=a*b,ans=s*s*s-3*m*s;
    return {t:"mm",q:`If a + b = ${s} and ab = ${m}, find <b>a<sup>3</sup> + b<sup>3</sup></b>.`,c:num(ans),w:[num(s*s*s),num(s*s*s-3*m),num(s*s*s-m*s)],
      x:`a<sup>3</sup> + b<sup>3</sup> = (a + b)<sup>3</sup> ${M} 3ab(a + b) = ${s}<sup>3</sup> ${M} 3(${m})(${s}) = ${s*s*s} ${M} ${3*m*s} = <b>${ans}</b>. <br>(Or: (a + b)(a<sup>2</sup> ${M} ab + b<sup>2</sup>) = ${s}(${s*s-2*m} ${M} ${m}) = ${ans}.)`,chk:{kind:"num",n:ans}}; }
  if(r===4){ const a=rnd(2,6),b=rnd(1,a-1),d=a-b,m=a*b,ans=d*d+2*m;
    return {t:"mm",q:`If a ${M} b = ${d} and ab = ${m}, find <b>a<sup>2</sup> + b<sup>2</sup></b>.`,c:num(ans),w:[num(d*d),num(d*d-2*m),num(d*d+m)],
      x:`(a ${M} b)<sup>2</sup> = a<sup>2</sup> ${M} 2ab + b<sup>2</sup>, so a<sup>2</sup> + b<sup>2</sup> = (a ${M} b)<sup>2</sup> + 2ab = ${d*d} + ${2*m} = <b>${ans}</b>.`,chk:{kind:"num",n:ans}}; }
  const k=rnd(3,7),cube=Math.random()<.5,ans=cube?k*k*k-3*k:k*k-2;
  return {t:"mm",q:`If x + <span style="white-space:nowrap">1/x</span> = ${k}, find <b>x<sup>${cube?3:2}</sup> + 1/x<sup>${cube?3:2}</sup></b>.`,c:num(ans),
    w:cube?[num(k*k*k),num(k*k*k-3),num(k*k*k-k)]:[num(k*k),num(k*k+2),num(k*k-1)],
    x:cube?`Cube both sides: (x + 1/x)<sup>3</sup> = x<sup>3</sup> + 3x + 3/x + 1/x<sup>3</sup> = x<sup>3</sup> + 1/x<sup>3</sup> + 3(x + 1/x). <br>So x<sup>3</sup> + 1/x<sup>3</sup> = ${k}<sup>3</sup> ${M} 3(${k}) = ${k*k*k} ${M} ${3*k} = <b>${ans}</b>.`
      :`Square both sides: (x + 1/x)<sup>2</sup> = x<sup>2</sup> + 2 + 1/x<sup>2</sup>. <br>So x<sup>2</sup> + 1/x<sup>2</sup> = ${k}<sup>2</sup> ${M} 2 = <b>${ans}</b>.`,chk:{kind:"num",n:ans}};
}
const GEN={ds:genDS,dc:()=>genCubes(false),sc:()=>genCubes(true),sq:genSq,cu:genCu,mm:genMM};

/* recall problems (type mode) */
const RECALL=[
  {q:"Type the formula: a<sup>2</sup> − b<sup>2</sup> = ?",c:"(a − b)(a + b)",kind:"factor",f:(x,y,a,b)=>a*a-b*b},
  {q:"Type the formula: a<sup>3</sup> − b<sup>3</sup> = ?",c:"(a − b)(a<sup>2</sup> + ab + b<sup>2</sup>)",kind:"factor",f:(x,y,a,b)=>a**3-b**3},
  {q:"Type the formula: a<sup>3</sup> + b<sup>3</sup> = ?",c:"(a + b)(a<sup>2</sup> − ab + b<sup>2</sup>)",kind:"factor",f:(x,y,a,b)=>a**3+b**3},
  {q:"Type the expansion: (a + b)<sup>2</sup> = ?",c:"a<sup>2</sup> + 2ab + b<sup>2</sup>",kind:"expand",f:(x,y,a,b)=>(a+b)**2},
  {q:"Type the expansion: (a − b)<sup>2</sup> = ?",c:"a<sup>2</sup> − 2ab + b<sup>2</sup>",kind:"expand",f:(x,y,a,b)=>(a-b)**2},
  {q:"Type the expansion: (a + b)<sup>3</sup> = ?",c:"a<sup>3</sup> + 3a<sup>2</sup>b + 3ab<sup>2</sup> + b<sup>3</sup>",kind:"expand",f:(x,y,a,b)=>(a+b)**3},
  {q:"Type the expansion: (a − b)<sup>3</sup> = ?",c:"a<sup>3</sup> − 3a<sup>2</sup>b + 3ab<sup>2</sup> − b<sup>3</sup>",kind:"expand",f:(x,y,a,b)=>(a-b)**3}
];

function make(topic){
  const t=topic==="all"?pick(Object.keys(GEN)):topic;
  const p=GEN[t]();
  // de-duplicate distractors
  const seen=new Set([key(p.c)]), w=[];
  for(const s of p.w){ if(!seen.has(key(s))){seen.add(key(s));w.push(s);} }
  let guard=0;
  while(w.length<3&&guard++<30){ let s;
    if(p.chk.kind==="num"){ s=num(p.chk.n+pick([-1,1])*rnd(1,12)*(Math.abs(p.chk.n)>200?10:1)); }
    else { s=pick(["Prime (does not factor over the reals)",p.c.replace(/ \+ /,"__").replace(/ − /," + ").replace("__"," − ")]); }
    if(!seen.has(key(s))){seen.add(key(s));w.push(s);} }
  p.opts=shuffle([p.c,...w.slice(0,3)]);
  return p;
}

/* ---------- formulas content ---------- */
const F=[
  {n:"Difference of Squares",f:`a<sup>2</sup> ${M} b<sup>2</sup> <span class="eq">=</span> (a ${M} b)(a + b)`,
   why:"Two perfect squares with a minus sign between them.",
   ex:`<span class="m">16x<sup>2</sup> ${M} 81</span> = <span class="m">(4x)<sup>2</sup> ${M} 9<sup>2</sup></span> = <b>(4x ${M} 9)(4x + 9)</b>`,
   w:`a<sup>2</sup> + b<sup>2</sup> (a <i>sum</i> of squares) does <b>not</b> factor over the reals. Always factor out a GCF first: <span class="m">2x<sup>2</sup> ${M} 50</span> = <span class="m">2(x ${M} 5)(x + 5)</span>.`},
  {n:"Difference of Cubes",f:`a<sup>3</sup> ${M} b<sup>3</sup> <span class="eq">=</span> (a ${M} b)(a<sup>2</sup> + ab + b<sup>2</sup>)`,
   why:"Two perfect cubes with a minus sign between them.",
   ex:`<span class="m">8x<sup>3</sup> ${M} 27</span> = <span class="m">(2x)<sup>3</sup> ${M} 3<sup>3</sup></span> = <b>(2x ${M} 3)(4x<sup>2</sup> + 6x + 9)</b>`,
   w:`The middle term is ab, not 2ab. The trinomial <span class="m">a<sup>2</sup> + ab + b<sup>2</sup></span> never factors further.`},
  {n:"Sum of Cubes",f:`a<sup>3</sup> + b<sup>3</sup> <span class="eq">=</span> (a + b)(a<sup>2</sup> ${M} ab + b<sup>2</sup>)`,
   why:"Two perfect cubes with a plus sign between them. Unlike squares, a sum of cubes <i>does</i> factor.",
   ex:`<span class="m">x<sup>3</sup> + 64</span> = <span class="m">x<sup>3</sup> + 4<sup>3</sup></span> = <b>(x + 4)(x<sup>2</sup> ${M} 4x + 16)</b>`,
   w:`Signs follow <b>SOAP</b>: <b>S</b>ame sign, <b>O</b>pposite sign, <b>A</b>lways <b>P</b>ositive.`},
  {n:"Square of a Sum",f:`(a + b)<sup>2</sup> <span class="eq">=</span> a<sup>2</sup> + 2ab + b<sup>2</sup>`,
   why:"First squared, plus twice the product, plus last squared.",
   ex:`<span class="m">(3x + 5)<sup>2</sup></span> = <span class="m">9x<sup>2</sup> + 2(3x)(5) + 25</span> = <b>9x<sup>2</sup> + 30x + 25</b>`,
   w:`<span class="m">(a + b)<sup>2</sup> ≠ a<sup>2</sup> + b<sup>2</sup></span>. The middle term 2ab is the one students forget.`},
  {n:"Square of a Difference",f:`(a ${M} b)<sup>2</sup> <span class="eq">=</span> a<sup>2</sup> ${M} 2ab + b<sup>2</sup>`,
   why:"Same as the sum, but the middle term is negative. The last term is always +.",
   ex:`<span class="m">(2x ${M} 7)<sup>2</sup></span> = <b>4x<sup>2</sup> ${M} 28x + 49</b><br><span class="m">98<sup>2</sup> = (100 ${M} 2)<sup>2</sup></span> = <span class="m">10,000 ${M} 400 + 4</span> = <b>9,604</b>`,
   w:`<span class="m">(a ${M} b)<sup>2</sup> ≠ a<sup>2</sup> ${M} b<sup>2</sup></span>. And b<sup>2</sup> is positive, never ${M}b<sup>2</sup>.`},
  {n:"Cube of a Sum",f:`(a + b)<sup>3</sup> <span class="eq">=</span> a<sup>3</sup> + 3a<sup>2</sup>b + 3ab<sup>2</sup> + b<sup>3</sup>`,
   why:"Coefficients 1, 3, 3, 1 (Pascal's triangle). Powers of a go down 3, 2, 1, 0 while powers of b go up 0, 1, 2, 3.",
   ex:`<span class="m">(x + 3)<sup>3</sup></span> = <span class="m">x<sup>3</sup> + 3(x<sup>2</sup>)(3) + 3(x)(9) + 27</span> = <b>x<sup>3</sup> + 9x<sup>2</sup> + 27x + 27</b>`,
   w:`<span class="m">(a + b)<sup>3</sup> ≠ a<sup>3</sup> + b<sup>3</sup></span>. Square the inner number before multiplying by 3 in the 3ab<sup>2</sup> term.`},
  {n:"Cube of a Difference",f:`(a ${M} b)<sup>3</sup> <span class="eq">=</span> a<sup>3</sup> ${M} 3a<sup>2</sup>b + 3ab<sup>2</sup> ${M} b<sup>3</sup>`,
   why:"Same coefficients 1, 3, 3, 1, with signs alternating + − + −.",
   ex:`<span class="m">(2x ${M} 5)<sup>3</sup></span> = <span class="m">8x<sup>3</sup> ${M} 3(4x<sup>2</sup>)(5)</span> <span class="m">+ 3(2x)(25) ${M} 125</span> = <b>8x<sup>3</sup> ${M} 60x<sup>2</sup> + 150x ${M} 125</b>`,
   w:`Only the odd powers of b are negative: ${M}3a<sup>2</sup>b and ${M}b<sup>3</sup>. The 3ab<sup>2</sup> term stays positive.`}
];
function formulasHtml(){
  return `<div class="fgrid">${F.map((o,i)=>`<div class="fbox"><h4>${i+1}. ${o.n}</h4><div class="fm">${o.f.split('<span class="eq">=</span>').map(x=>`<span class="m">${x.trim()}</span>`).join(' <span class="eq">=</span> ')}</div><div class="fb"><div class="why"><span class="lbl">When</span>${o.why}</div><div class="ex"><span class="lbl">Example</span><span class="exb">${o.ex}</span></div><div class="warn"><span class="lbl">Watch out</span>${o.w}</div><button type="button" class="fbtn2 fnew" data-fnew="${i}">↻ New example</button></div></div>`).join("")}</div>
  <div class="ftip"><h4>Useful rearrangements</h4>
   <div><span class="m">a<sup>2</sup> + b<sup>2</sup> = (a + b)<sup>2</sup> ${M} 2ab</span></div><div><span class="m">a<sup>2</sup> + b<sup>2</sup> = (a ${M} b)<sup>2</sup> + 2ab</span></div>
   <div><span class="m">a<sup>3</sup> + b<sup>3</sup> = (a + b)<sup>3</sup> ${M} 3ab(a + b)</span></div><div><span class="m">a<sup>3</sup> ${M} b<sup>3</sup> = (a ${M} b)<sup>3</sup> + 3ab(a ${M} b)</span></div>
   <div>x<sup>6</sup> ${M} y<sup>6</sup>: use squares first, <span class="m">(x<sup>3</sup> ${M} y<sup>3</sup>)(x<sup>3</sup> + y<sup>3</sup>)</span>, then factor each cube.</div></div>
  <div class="ftip"><h4>Know these by heart</h4>
   ${[[1,2,3,4,5,6],[7,8,9,10,11,12]].map(r=>`<div class="tw"><table><tr><th>n</th>${r.map(n=>`<td>${n}</td>`).join("")}</tr><tr><th>n<sup>2</sup></th>${r.map(n=>`<td>${n*n}</td>`).join("")}</tr><tr><th>n<sup>3</sup></th>${r.map(n=>`<td>${n**3}</td>`).join("")}</tr></table></div>`).join("")}
   <div style="font-size:16px;font-style:italic">Variables: x<sup>2</sup>, x<sup>4</sup>, x<sup>6</sup> are perfect squares (even exponents); x<sup>3</sup>, x<sup>6</sup>, x<sup>9</sup> are perfect cubes (multiples of 3).</div></div>`;
}

/* ---------- flashcards ---------- */
const DECKS=[["Formula","Formulas"],["Concept","Concepts"],["Squares","Factor: Squares"],["Cubes","Factor: Cubes"],["Trinomial","Perfect Square Trinomials"],["Expand","Expand"],["Mental math","Mental Math"],["Honors","Identities & Honors"]];
const RAW=[
  ["Formula","Difference of squares<br>a^2 - b^2 = ?","(a - b)(a + b)"],
  ["Formula","Difference of cubes<br>a^3 - b^3 = ?","(a - b)(a^2 + ab + b^2)"],
  ["Formula","Sum of cubes<br>a^3 + b^3 = ?","(a + b)(a^2 - ab + b^2)"],
  ["Formula","Square of a sum<br>(a + b)^2 = ?","a^2 + 2ab + b^2"],
  ["Formula","Square of a difference<br>(a - b)^2 = ?","a^2 - 2ab + b^2"],
  ["Formula","Cube of a sum<br>(a + b)^3 = ?","a^3 + 3a^2b + 3ab^2 + b^3"],
  ["Formula","Cube of a difference<br>(a - b)^3 = ?","a^3 - 3a^2b + 3ab^2 - b^3","Signs alternate + − + −"],
  ["Concept","What does SOAP stand for?","Same · Opposite · Always Positive","The signs in a^3 ± b^3 = (a ± b)(a^2 ∓ ab + b^2)"],
  ["Concept","Does a^2 + b^2 factor?","No, it is prime over the reals","Only a difference of squares factors"],
  ["Concept","Does a^3 + b^3 factor?","Yes: (a + b)(a^2 - ab + b^2)","Unlike squares, a sum of cubes factors"],
  ["Concept","Coefficients in (a ± b)^3","1, 3, 3, 1","Row 3 of Pascal's triangle"],
  ["Concept","Does a^2 + ab + b^2 factor further?","No","The trinomial from a cube pattern never factors"],
  ["Concept","What should you always check first when factoring?","A greatest common factor (GCF)","Then look for a pattern"],
  ["Concept","Is x^6 a perfect square, a perfect cube, or both?","Both","x^6 = (x^3)^2 = (x^2)^3"],
  ["Concept","How do you spot a perfect square trinomial?","First and last terms are squares, middle term is ±2ab","e.g. x^2 + 10x + 25 = (x + 5)^2"],
  ["Concept","(a + b)^2 - (a - b)^2 = ?","4ab"],
  ["Concept","(a + b)^2 + (a - b)^2 = ?","2a^2 + 2b^2"],
  ["Squares","Factor x^2 - 49","(x - 7)(x + 7)"],
  ["Squares","Factor 9x^2 - 25y^2","(3x - 5y)(3x + 5y)"],
  ["Squares","Factor 3x^2 - 48","3(x - 4)(x + 4)","Take out the GCF first"],
  ["Squares","Factor 1 - 16x^2","(1 - 4x)(1 + 4x)"],
  ["Squares","Factor 49a^2 - 100b^2","(7a - 10b)(7a + 10b)"],
  ["Squares","Factor 25x^4 - 36","(5x^2 - 6)(5x^2 + 6)"],
  ["Squares","Factor x^4 - 81 completely","(x - 3)(x + 3)(x^2 + 9)","Factor twice: (x^2 - 9)(x^2 + 9)"],
  ["Squares","Factor 2x^3 - 50x","2x(x - 5)(x + 5)","GCF 2x first"],
  ["Squares","Factor (x + 2)^2 - 9","(x - 1)(x + 5)","a = x + 2, b = 3: (x + 2 - 3)(x + 2 + 3)"],
  ["Squares","Factor x^2 + 25","Prime","A sum of squares does not factor over the reals"],
  ["Squares","Factor 81 - x^4 completely","(3 - x)(3 + x)(9 + x^2)"],
  ["Cubes","Factor x^3 - 8","(x - 2)(x^2 + 2x + 4)"],
  ["Cubes","Factor 27x^3 + 1","(3x + 1)(9x^2 - 3x + 1)"],
  ["Cubes","Factor 125 - y^3","(5 - y)(25 + 5y + y^2)"],
  ["Cubes","Factor x^3 + 27","(x + 3)(x^2 - 3x + 9)"],
  ["Cubes","Factor 8a^3 - 125b^3","(2a - 5b)(4a^2 + 10ab + 25b^2)"],
  ["Cubes","Factor 64x^3 + 1","(4x + 1)(16x^2 - 4x + 1)"],
  ["Cubes","Factor 2x^3 + 16","2(x + 2)(x^2 - 2x + 4)","GCF 2 first"],
  ["Cubes","Factor 3x^4 - 81x","3x(x - 3)(x^2 + 3x + 9)","GCF 3x first"],
  ["Cubes","Factor x^6 + 8","(x^2 + 2)(x^4 - 2x^2 + 4)","a = x^2, b = 2"],
  ["Cubes","Factor 1000 - x^3","(10 - x)(100 + 10x + x^2)"],
  ["Cubes","Factor a^3b^3 - 1","(ab - 1)(a^2b^2 + ab + 1)"],
  ["Cubes","Factor (x + 1)^3 - 8","(x - 1)(x^2 + 4x + 7)","a = x + 1, b = 2"],
  ["Trinomial","Factor x^2 - 12x + 36","(x - 6)^2"],
  ["Trinomial","Factor 9x^2 + 30x + 25","(3x + 5)^2"],
  ["Trinomial","Factor 4x^2 - 28xy + 49y^2","(2x - 7y)^2"],
  ["Trinomial","Factor x^4 + 8x^2 + 16","(x^2 + 4)^2"],
  ["Trinomial","Factor x^3 + 6x^2 + 12x + 8","(x + 2)^3","1, 3, 3, 1 pattern with b = 2"],
  ["Trinomial","Factor 8x^3 - 36x^2 + 54x - 27","(2x - 3)^3"],
  ["Trinomial","What number makes x^2 + 10x + __ a perfect square?","25","(10 ÷ 2)^2 = 25"],
  ["Trinomial","What k makes x^2 + kx + 49 a perfect square?","k = ±14","2 · 1 · 7 = 14"],
  ["Expand","Expand (2x + 5)^2","4x^2 + 20x + 25"],
  ["Expand","Expand (x - 3)^2","x^2 - 6x + 9"],
  ["Expand","Expand (x + 7)^2","x^2 + 14x + 49"],
  ["Expand","Expand (3a - 2b)^2","9a^2 - 12ab + 4b^2"],
  ["Expand","Expand (x^2 + 4)^2","x^4 + 8x^2 + 16"],
  ["Expand","Expand (5 - 2x)^2","25 - 20x + 4x^2"],
  ["Expand","Expand (x + 2)^3","x^3 + 6x^2 + 12x + 8"],
  ["Expand","Expand (2x - 1)^3","8x^3 - 12x^2 + 6x - 1"],
  ["Expand","Expand (x - 1)^3","x^3 - 3x^2 + 3x - 1"],
  ["Expand","Expand (a + 3b)^3","a^3 + 9a^2b + 27ab^2 + 27b^3"],
  ["Expand","Expand (3x + 2)^3","27x^3 + 54x^2 + 36x + 8"],
  ["Expand","Expand (x - 4)^3","x^3 - 12x^2 + 48x - 64"],
  ["Expand","Expand (x - 2)(x + 2)","x^2 - 4","Product of conjugates"],
  ["Expand","Expand (x + 1)(x^2 - x + 1)","x^3 + 1","Sum of cubes backwards"],
  ["Mental math","101^2 = ?","10,201","(100 + 1)^2 = 10,000 + 200 + 1"],
  ["Mental math","99^2 = ?","9,801","(100 - 1)^2 = 10,000 - 200 + 1"],
  ["Mental math","47^2 = ?","2,209","(50 - 3)^2 = 2,500 - 300 + 9"],
  ["Mental math","1,002^2 = ?","1,004,004","(1,000 + 2)^2 = 1,000,000 + 4,000 + 4"],
  ["Mental math","52^2 - 48^2 = ?","400","(52 - 48)(52 + 48) = 4 · 100"],
  ["Mental math","75^2 - 25^2 = ?","5,000","(75 - 25)(75 + 25) = 50 · 100"],
  ["Mental math","63 · 57 = ?","3,591","(60 + 3)(60 - 3) = 3,600 - 9"],
  ["Mental math","1,001 · 999 = ?","999,999","(1,000 + 1)(1,000 - 1) = 1,000,000 - 1"],
  ["Mental math","21^3 = ?","9,261","(20 + 1)^3 = 8,000 + 1,200 + 60 + 1"],
  ["Mental math","99^3 = ?","970,299","(100 - 1)^3 = 1,000,000 - 30,000 + 300 - 1"],
  ["Mental math","11^3 + 9^3 = ?","2,060","(11 + 9)(121 - 99 + 81) = 20 · 103"],
  ["Honors","If a + b = 5 and ab = 6, find a^2 + b^2","13","(a + b)^2 - 2ab = 25 - 12"],
  ["Honors","If a + b = 4 and ab = 2, find a^3 + b^3","40","(a + b)^3 - 3ab(a + b) = 64 - 24"],
  ["Honors","If a - b = 3 and ab = 10, find a^2 + b^2","29","(a - b)^2 + 2ab = 9 + 20"],
  ["Honors","If a - b = 2 and ab = 15, find a^3 - b^3","98","(a - b)^3 + 3ab(a - b) = 8 + 90"],
  ["Honors","If a^2 - b^2 = 24 and a + b = 6, find a - b","4","a^2 - b^2 = (a - b)(a + b), so 24 = 6(a - b)"],
  ["Honors","If x + 1/x = 3, find x^2 + 1/x^2","7","Square: x^2 + 2 + 1/x^2 = 9"],
  ["Honors","If x + 1/x = 4, find x^3 + 1/x^3","52","4^3 - 3 · 4 = 64 - 12"],
  ["Honors","If x - 1/x = 2, find x^2 + 1/x^2","6","Square: x^2 - 2 + 1/x^2 = 4"],
  ["Honors","Simplify (x^3 - 8)/(x - 2)","x^2 + 2x + 4","for x ≠ 2"],
  ["Honors","Factor a^4 - b^4 completely","(a - b)(a + b)(a^2 + b^2)"],
  ["Honors","Factor x^6 - y^6 completely","(x - y)(x + y)(x^2 + xy + y^2)(x^2 - xy + y^2)","Difference of squares first, then both cube patterns"],
  ["Honors","Factor x^6 - 64 completely","(x - 2)(x + 2)(x^2 + 2x + 4)(x^2 - 2x + 4)","(x^3 - 8)(x^3 + 8)"],
  ["Honors","Factor x^2 - y^2 + 2x + 1","(x + 1 - y)(x + 1 + y)","Group: (x + 1)^2 - y^2"]
];
/* 140 factoring problems: [problem, answer, # of non-constant factors, method] */
const P140=[["y^3 + 9y^2", "y^2(y + 9)", 3, "GCF y²"], ["5x^2y^3 + 15x^3y^2", "5x^2y^2(3x + y)", 5, "GCF 5x²y²"], ["12t^5 - 20t^4 + 8t^2 - 16", "4(3t^5 - 5t^4 + 2t^2 - 4)", 1, "GCF only: what's left does not factor"], ["p^2 - 36", "(p - 6)(p + 6)", 2, "Difference of squares"], ["25 - x^2", "(5 - x)(5 + x)", 2, "Difference of squares"], ["4a^3 - 49a", "a(2a - 7)(2a + 7)", 3, "GCF a, then difference of squares"], ["(a + b)^2 - 100", "(a + b - 10)(a + b + 10)", 2, "Difference of squares with a = a + b, b = 10"], ["9 - (x - y)^2", "(3 - x + y)(3 + x - y)", 2, "Difference of squares with a = 3, b = x − y"], ["y^3 + 8", "(y + 2)(y^2 - 2y + 4)", 2, "Sum of cubes"], ["64y^4 + y", "y(4y + 1)(16y^2 - 4y + 1)", 3, "GCF y, then sum of cubes"], ["x^3 - 27", "(x - 3)(x^2 + 3x + 9)", 2, "Difference of cubes"], ["5x^3 - 40y^3", "5(x - 2y)(x^2 + 2xy + 4y^2)", 2, "GCF 5, then difference of cubes"], ["2y^4 - 128y", "2y(y - 4)(y^2 + 4y + 16)", 3, "GCF 2y, then difference of cubes"], ["t^6 - 64", "(t - 2)(t + 2)(t^2 - 2t + 4)(t^2 + 2t + 4)", 4, "Difference of squares, then sum and difference of cubes"], ["x^2 - 10x + 25", "(x - 5)^2", 2, "Perfect square trinomial"], ["4a^2 + 16a + 16", "4(a + 2)^2", 2, "GCF 4, then perfect square trinomial"], ["16y^2 + 56y + 49", "(4y + 7)^2", 2, "Perfect square trinomial"], ["-20xy + 4y^2 + 25x^2", "(5x - 2y)^2", 2, "Perfect square trinomial"], ["x^2 + 9x + 20", "(x + 4)(x + 5)", 2, "Trinomial with a = 1"], ["2y^2 - 16y + 32", "2(y - 4)^2", 2, "GCF 2, then perfect square trinomial"], ["3x + x^2 - 10", "(x - 2)(x + 5)", 2, "Trinomial with a = 1"], ["y^2 + 5y - 84", "(y - 7)(y + 12)", 2, "Trinomial with a = 1"], ["8x^2 - 16 - 28x", "4(x - 4)(2x + 1)", 2, "GCF 4, then trinomial: ac method"], ["12x^3 - 31x^2 + 20x", "x(3x - 4)(4x - 5)", 3, "GCF x, then trinomial: ac method"], ["6a^2 - 7a - 10", "(a - 2)(6a + 5)", 2, "Trinomial: ac method"], ["8 - 6x - 9x^2", "(2 - 3x)(4 + 3x)", 2, "Trinomial: ac method (think −(9x² + 6x − 8))"], ["6x^6 + x^3 - 2", "(2x^3 - 1)(3x^3 + 2)", 2, "Trinomial in quadratic form (u = x³)"], ["2x^8 - 14x^4 + 20", "2(x^4 - 5)(x^4 - 2)", 2, "GCF 2, then quadratic form (u = x⁴)"], ["y^3 - y^2 + 2y - 2", "(y - 1)(y^2 + 2)", 2, "Grouping"], ["x^4 - x^3 - x + x^2", "x(x - 1)(x^2 + 1)", 3, "GCF x, then grouping"], ["x^3 + 8x^2 - x - 8", "(x - 1)(x + 1)(x + 8)", 3, "Grouping"], ["p^2q - 25q + 3p^2 - 75", "(p - 5)(p + 5)(q + 3)", 3, "Grouping"], ["16 - x^2 + 2xy - y^2", "(4 - x + y)(4 + x - y)", 2, "Group as 16 − (x − y)², then difference of squares"], ["2xy - x^2y - 6 + 3x", "(2 - x)(xy - 3)", 2, "Grouping"], ["6x^2 + 23x + 20", "(2x + 5)(3x + 4)", 2, "Trinomial: ac method"], ["9x^2 + 15x + 4", "(3x + 1)(3x + 4)", 2, "Trinomial: ac method"], ["8m^2 - 6m - 9", "(2m - 3)(4m + 3)", 2, "Trinomial: ac method"], ["25 - 10x + x^2", "(x - 5)^2", 2, "Perfect square trinomial"], ["16 - w^4", "(2 - w)(2 + w)(4 + w^2)", 3, "Difference of squares twice"], ["ay - yx - x^2 + ax", "(a - x)(x + y)", 2, "Grouping"], ["x^2 - 6x - 16", "(x - 8)(x + 2)", 2, "Trinomial with a = 1"], ["x^2 - 10xy + 24y^2", "(x - 6y)(x - 4y)", 2, "Trinomial with a = 1"], ["x^2 + 3x + 2", "(x + 1)(x + 2)", 2, "Trinomial with a = 1"], ["x^2 - 3x + 2", "(x - 2)(x - 1)", 2, "Trinomial with a = 1"], ["x^2 - x - 30", "(x - 6)(x + 5)", 2, "Trinomial with a = 1"], ["x^2 + 7x - 8", "(x - 1)(x + 8)", 2, "Trinomial with a = 1"], ["x^2 + x - 2", "(x - 1)(x + 2)", 2, "Trinomial with a = 1"], ["x^2 - 5xy + 6y^2", "(x - 3y)(x - 2y)", 2, "Trinomial with a = 1"], ["x^2 + 10x + 16", "(x + 2)(x + 8)", 2, "Trinomial with a = 1"], ["x^2 + x - 72", "(x - 8)(x + 9)", 2, "Trinomial with a = 1"], ["x^2 - 8x - 9", "(x - 9)(x + 1)", 2, "Trinomial with a = 1"], ["x^2 + 2x - 48", "(x - 6)(x + 8)", 2, "Trinomial with a = 1"], ["x^2 - 13xy + 42y^2", "(x - 7y)(x - 6y)", 2, "Trinomial with a = 1"], ["x^2 + 8x + 12", "(x + 2)(x + 6)", 2, "Trinomial with a = 1"], ["4x^3 - 8x^2 - 12x", "4x(x - 3)(x + 1)", 3, "GCF 4x, then trinomial with a = 1"], ["2x^3 - 2x^2 - 4x", "2x(x - 2)(x + 1)", 3, "GCF 2x, then trinomial with a = 1"], ["2x^3 - 4x^2 - 6x", "2x(x - 3)(x + 1)", 3, "GCF 2x, then trinomial with a = 1"], ["3x^3 - 6x^2 - 9x", "3x(x - 3)(x + 1)", 3, "GCF 3x, then trinomial with a = 1"], ["5x^3y - 35x^2y + 50xy", "5xy(x - 5)(x - 2)", 4, "GCF 5xy, then trinomial with a = 1"], ["3x^3y + 18x^2y - 21xy", "3xy(x - 1)(x + 7)", 4, "GCF 3xy, then trinomial with a = 1"], ["4x^2 + 1 - 4x", "(2x - 1)^2", 2, "Perfect square trinomial"], ["15x^2 + 12 + 29x", "(3x + 4)(5x + 3)", 2, "Trinomial: ac method"], ["8r^2 - 2r - 3", "(2r + 1)(4r - 3)", 2, "Trinomial: ac method"], ["35a^2 + 3a - 20", "(5a + 4)(7a - 5)", 2, "Trinomial: ac method"], ["25x^2 + 8 + 30x", "(5x + 2)(5x + 4)", 2, "Trinomial: ac method"], ["12x^2 + 3 + 13x", "(3x + 1)(4x + 3)", 2, "Trinomial: ac method"], ["9x^2 - 27xy + 20y^2", "(3x - 5y)(3x - 4y)", 2, "Trinomial: ac method"], ["25u^2 - 15u - 18", "(5u - 6)(5u + 3)", 2, "Trinomial: ac method"], ["12f^2 - 4f - 5", "(2f + 1)(6f - 5)", 2, "Trinomial: ac method"], ["5z^2 + 3z + 4", "Prime", 1, "Prime: no factor pair of ac = 20 adds to b = 3"], ["4x^2 + 15 + 16x", "(2x + 3)(2x + 5)", 2, "Trinomial: ac method"], ["20x^2 + 6 + 23x", "(4x + 3)(5x + 2)", 2, "Trinomial: ac method"], ["6x^2 - 19xy + 10y^2", "(2x - 5y)(3x - 2y)", 2, "Trinomial: ac method"], ["35p^2 + 13p - 4", "(5p - 1)(7p + 4)", 2, "Trinomial: ac method"], ["50x^2 + 10x - 12", "2(5x - 2)(5x + 3)", 2, "GCF 2, then trinomial: ac method"], ["-30x^2 - 25x + 30", "-5(2x + 3)(3x - 2)", 2, "GCF −5, then trinomial: ac method"], ["-18x^2 + 18x + 20", "-2(3x - 5)(3x + 2)", 2, "GCF −2, then trinomial: ac method"], ["3x^3 - 22x^2 + 7x", "x(x - 7)(3x - 1)", 3, "GCF x, then trinomial: ac method"], ["15x^2 - 18x - 24", "3(x - 2)(5x + 4)", 2, "GCF 3, then trinomial: ac method"], ["4x^3 - 25x^2 + 6x", "x(x - 6)(4x - 1)", 3, "GCF x, then trinomial: ac method"], ["125x^3 - 1", "(5x - 1)(25x^2 + 5x + 1)", 2, "Difference of cubes"], ["w^2 - 64", "(w - 8)(w + 8)", 2, "Difference of squares"], ["y^2 - 12y + 36", "(y - 6)^2", 2, "Perfect square trinomial"], ["x^2 - 8x - 48", "(x - 12)(x + 4)", 2, "Trinomial with a = 1"], ["a^3 - 7a^2 + 12a", "a(a - 4)(a - 3)", 3, "GCF a, then trinomial with a = 1"], ["25a^2 + 8b^2", "Prime", 1, "Prime: a sum of squares does not factor (and 8 is not a perfect square)"], ["(x - 3)(x + 7) + (x - 3)(x - 4)", "(x - 3)(2x + 3)", 2, "Common binomial factor (x − 3)"], ["6x^2 + 12x + 6", "6(x + 1)^2", 2, "GCF 6, then perfect square trinomial"], ["y^2 - 11y + 18", "(y - 9)(y - 2)", 2, "Trinomial with a = 1"], ["40 + 3b - b^2", "(8 - b)(5 + b)", 2, "Trinomial with a = −1 (think −(b² − 3b − 40))"], ["3x^5 - 12x^2", "3x^2(x^3 - 4)", 3, "GCF 3x² (x³ − 4 does not factor: 4 is not a perfect cube)"], ["250x^3 + 2", "2(5x + 1)(25x^2 - 5x + 1)", 2, "GCF 2, then sum of cubes"], ["7xy^4 - 7xz^4", "7x(y - z)(y + z)(y^2 + z^2)", 4, "GCF 7x, then difference of squares twice"], ["2y^4 + 5y^3 - 12y^2", "y^2(y + 4)(2y - 3)", 4, "GCF y², then trinomial: ac method"], ["24x^2 - 7x - 5", "(3x + 1)(8x - 5)", 2, "Trinomial: ac method"], ["y^2 + 14y - 32", "(y - 2)(y + 16)", 2, "Trinomial with a = 1"], ["0.04w^2 + 0.28w + 0.49", "(0.2w + 0.7)^2", 2, "Perfect square trinomial (0.2w + 0.7)²"], ["4x^3 + 40x^2 + 64x", "4x(x + 2)(x + 8)", 3, "GCF 4x, then trinomial with a = 1"], ["64y^3 + 27", "(4y + 3)(16y^2 - 12y + 9)", 2, "Sum of cubes"], ["1/81 - x^2", "(1/9 - x)(1/9 + x)", 2, "Difference of squares (1/81 = (1/9)²)"], ["5x^2 - 2x + 3", "Prime", 1, "Prime: no factor pair of ac = 15 adds to b = −2"], ["x^3 - 343", "(x - 7)(x^2 + 7x + 49)", 2, "Difference of cubes"], ["40y^2 + 28y - 48", "4(2y + 3)(5y - 4)", 2, "GCF 4, then trinomial: ac method"], ["3ab - 5bc + bd", "b(3a - 5c + d)", 2, "GCF b"], ["8c^6 - 125d^6", "(2c^2 - 5d^2)(4c^4 + 10c^2d^2 + 25d^4)", 2, "Difference of cubes"], ["81 - 18z + z^2", "(z - 9)^2", 2, "Perfect square trinomial"], ["x^4 + 10x^3 + 25x^2", "x^2(x + 5)^2", 4, "GCF x², then perfect square trinomial"], ["xz - xw - yz + yw", "(x - y)(z - w)", 2, "Grouping"], ["y^2 + 5y - 36", "(y - 4)(y + 9)", 2, "Trinomial with a = 1"], ["x^2 - 11x - 42", "(x - 14)(x + 3)", 2, "Trinomial with a = 1"], ["7a^2 - 7b^2", "7(a - b)(a + b)", 2, "GCF 7, then difference of squares"], ["216 - a^3", "(6 - a)(36 + 6a + a^2)", 2, "Difference of cubes"], ["81 + 18y + y^2", "(y + 9)^2", 2, "Perfect square trinomial"], ["b^2 - 5b - 14", "(b - 7)(b + 2)", 2, "Trinomial with a = 1"], ["q^4 - 10q^3 + 21q^2", "q^2(q - 7)(q - 3)", 4, "GCF q², then trinomial with a = 1"], ["9x^2y^2 - 25y^4", "y^2(3x - 5y)(3x + 5y)", 4, "GCF y², then difference of squares"], ["105 + 8x - x^2", "(15 - x)(7 + x)", 2, "Trinomial with a = −1 (think −(x² − 8x − 105))"], ["x^2 - 3x - 2", "Prime", 1, "Prime: no factor pair of −2 adds to −3"], ["6y^3 + 48", "6(y + 2)(y^2 - 2y + 4)", 2, "GCF 6, then sum of cubes"], ["a^3 - 14a^2 + 49a", "a(a - 7)^2", 3, "GCF a, then perfect square trinomial"], ["3y^2 - 34y - 24", "(y - 12)(3y + 2)", 2, "Trinomial: ac method"], ["a^2 + 8a + 16", "(a + 4)^2", 2, "Perfect square trinomial"], ["y^2 - 121", "(y - 11)(y + 11)", 2, "Difference of squares"], ["42 + a - a^2", "(7 - a)(6 + a)", 2, "Trinomial with a = −1 (think −(a² − a − 42))"], ["9x^3 - 24x^2 + 16x", "x(3x - 4)^2", 3, "GCF x, then perfect square trinomial"], ["x^3 - 81", "Prime", 1, "Prime: 81 is not a perfect cube"], ["10w^2 + 29w - 21", "(2w + 7)(5w - 3)", 2, "Trinomial: ac method"], ["16x^2 + 54x - 7", "(2x + 7)(8x - 1)", 2, "Trinomial: ac method"], ["27x^2 - 30x - 8", "(3x - 4)(9x + 2)", 2, "Trinomial: ac method"], ["x^6 - 1", "(x - 1)(x + 1)(x^2 - x + 1)(x^2 + x + 1)", 4, "Difference of squares, then sum and difference of cubes"], ["x^2 - 0.6x + 0.09", "(x - 0.3)^2", 2, "Perfect square trinomial"], ["4x^2 - 13x - 35", "(x - 5)(4x + 7)", 2, "Trinomial: ac method"], ["125x^6 - 81", "Prime", 1, "Prime: 81 is not a perfect cube and 125 is not a perfect square"], ["49x^3 - 14x^2 + x", "x(7x - 1)^2", 3, "GCF x, then perfect square trinomial"], ["40y^2 + 7y - 3", "(5y - 1)(8y + 3)", 2, "Trinomial: ac method"], ["15w^2 - 15w - 90", "15(w - 3)(w + 2)", 2, "GCF 15, then trinomial with a = 1"], ["0.04a^2 - 0.49b^2", "(0.2a - 0.7b)(0.2a + 0.7b)", 2, "Difference of squares (0.04 = 0.2², 0.49 = 0.7²)"], ["x^3y^2 + 7x^2y^2 - 18xy^2", "xy^2(x - 2)(x + 9)", 5, "GCF xy², then trinomial with a = 1"], ["2x^6 - 54y^6", "2(x^2 - 3y^2)(x^4 + 3x^2y^2 + 9y^4)", 2, "GCF 2, then difference of cubes"], ["1/4x^2 - 5x + 25", "(½x - 5)^2", 2, "Perfect square trinomial (½x)² − 2(½x)(5) + 5²"]];
const FR=(n,d)=>`<span class="fr"><span class="fn">${n}</span><span class="fd">${d}</span></span>`;
const h=s=>s.replace(/1\/4x/g,FR(1,4)+"x").replace(/½/g,FR(1,2)).replace(/\^(\d+)/g,"<sup>$1</sup>").replace(/-/g,"−").replace(/\([^()]*\)(<sup>\d+<\/sup>)?/g,m=>`<span class="m">${m}</span>`);
const CARDS=RAW.map(([c,f,b,n])=>[c,h(f),h(b),n?h(n):""]);

/* ---------- typing: parse & check ---------- */
function norm(s){
  return s.replace(/²/g,"^2").replace(/³/g,"^3").replace(/[−–—]/g,"-").replace(/[×·]/g,"*").replace(/\s+/g,"").toLowerCase();
}
const LETTERS="abcdefghijklmnopqrstuvwxyz".split("");
function compile(s){
  s=norm(s).replace(/½/g,"(1/2)");
  if(!s||!/^[0-9a-z+\-*/().^]+$/.test(s)) return null;
  s=s.replace(/(\d|[a-z)])(?=[a-z(])/g,"$1*").replace(/\^/g,"**");
  try{ const f=new Function(...LETTERS,"return ("+s+");"); f(...LETTERS.map((_,i)=>1.1+i/37)); return f; }catch(e){ return null; }
}
function same(f,g){
  for(let i=0;i<6;i++){ const v=LETTERS.map(()=>Math.random()*4-2);
    const p=f(...v),q=g(...v); if(!isFinite(p)||Math.abs(p-q)>1e-6*Math.max(1,Math.abs(q))) return false; }
  return true;
}
/* top-level structure of a typed answer: is it a product? how many non-constant factors? */
function factorsOf(raw){
  let s=norm(raw).replace(/½/g,"(1/2)").replace(/\*/g,"");
  if(s[0]==="-"||s[0]==="+") s=s.slice(1);
  let i=0,count=0,groups=0,others=0;
  const exp=()=>{ if(s[i]==="^"){ i++; let m=/^\(?(\d+)\)?/.exec(s.slice(i)); if(!m) return 1; i+=m[0].length; return +m[1]; } return 1; };
  while(i<s.length){
    const c=s[i];
    if(c==="("){ let d=0,j=i; for(;j<s.length;j++){ if(s[j]==="(") d++; else if(s[j]===")"){ d--; if(!d) break; } } if(j>=s.length) return null;
      const inner=s.slice(i+1,j); i=j+1; const k=exp(); groups++; if(/[a-z]/.test(inner)) count+=k; }
    else if(/[a-z]/.test(c)){ i++; count+=exp(); others++; }
    else if(/[\d.]/.test(c)){ let m=/^[\d.]+(\/[\d.]+)?/.exec(s.slice(i)); i+=m[0].length; exp(); others++; }
    else if(c==="/"){ i++; }
    else return {product:false};
  }
  return {product:true,count,groups,others};
}
function pretty(s){
  return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\^\s*\(?(\d+)\)?/g,"<sup>$1</sup>").replace(/\*/g,"·").replace(/-/g,"−");
}
function grade(inp,chk){
  const raw=inp.trim(); if(!raw) return {ok:false,msg:"Type an answer first."};
  if(chk.kind==="prime") return /prime|not factor|doesn'?t factor|does not factor|cannot|can'?t|^no/i.test(raw)?{ok:true}:{ok:false,msg:"Not quite. Does this one really factor?"};
  if(chk.kind!=="prime"&&/^\s*prime\s*$/i.test(raw)) return {ok:false,msg:"This one does factor. Look for a GCF or a pattern."};
  if(chk.kind==="num"){ const v=Number(norm(raw).replace(/,/g,"")); return v===chk.n?{ok:true}:{ok:false,msg:isNaN(v)?"Type a number.":"Not quite."}; }
  const f=compile(raw); if(!f) return {ok:false,msg:"I couldn't read that. Use ^ for powers, like (2x-3)(2x+3) or 4x^2+12x+9."};
  const g=chk.all?chk.f:(...v)=>chk.f(v[23],v[24],v[0],v[1]);
  if(!same(f,g)) return {ok:false,msg:"Not equal to the original. Check your signs and coefficients."};
  if(chk.kind==="factor"){
    const t=factorsOf(raw);
    if(!t||!t.product||(t.groups>0&&t.groups+t.others<2&&t.count<2)) return {ok:false,msg:"That's equal, but it isn't factored. Write it as a product, like (…)(…)."};
    if(chk.n&&t.count<chk.n) return {ok:false,msg:"Equal, but not completely factored. Can one of your factors be factored again (GCF, or a pattern)?"};
  }
  if(chk.kind==="expand"&&/\(/.test(norm(raw))) return {ok:false,msg:"That's equal, but it isn't expanded. Multiply it out with no parentheses."};
  return {ok:true};
}

/* ---------- section html ---------- */
const chips=(name,opts,on)=>`<div class="grp"><span class="gl">${name}</span><div class="chips" data-chips>${opts.map(([v,t])=>`<button type="button" data-v="${v}"${v===on?' class="on"':""}>${t}</button>`).join("")}</div></div>`;
const TOPIC_OPTS=[["all","Mixed"],...Object.entries(TOPICS).map(([k,v])=>[k,v.replace("Mental Math & Identities","Mental Math")])];
const N_OPTS=[["10","10"],["15","15"],["20","20"]];
function chipBox(box,onchange){ const get=i=>box.querySelectorAll("[data-chips]")[i].querySelector(".on").dataset.v;
  box.querySelectorAll("[data-chips]").forEach(g=>g.querySelectorAll("button").forEach(b=>b.onclick=()=>{ g.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b)); onchange(); }));
  return get; }
function mcqHtml(){
  return `<p class="lead2">Multiple choice with new examples every time. Click an answer to see if you're right and read the full solution.</p>
  <div class="fctl" data-fmcq>${chips("Topic",TOPIC_OPTS,"all")}${chips("Questions",N_OPTS,"10")}<div class="acts"><button type="button" class="fbtn2" data-fgo>New questions</button><span class="fscore" data-fs></span></div></div>
  <div data-flist></div>`;
}
const cardWidget=()=>`<div class="fc-wrap"><div class="fc" data-card tabindex="0" role="button" aria-label="Flashcard, click to flip"><div class="fc-in"><div class="fc-f"></div><div class="fc-b"></div></div></div>
  <div class="fc-prog"><i data-cprog></i></div>
  <div class="fc-bar"><button type="button" class="fbtn2 ghost" data-cprev>‹ Prev</button><button type="button" class="fbtn2" data-cflip>Flip</button><button type="button" class="fbtn2 ghost" data-cnext>Next ›</button></div>
  <div class="fc-bar"><button type="button" class="fbtn2 ghost" data-cagain>✗ Study again</button><span class="fc-ct" data-cct></span><button type="button" class="fbtn2" data-cknow>✓ I know it</button></div>
  <div class="fc-stat" data-cstat></div></div>`;
function cardsHtml(){
  return `<div data-deck="main"><p class="lead2">Pick a deck, then click the card (or press "Flip") to see the answer. Mark each card, and the ones you still need to study come back around. The ★ Random deck deals 20 new problems every time.</p>
  <div class="fctl" data-cbox>${chips("Deck",[["all","All cards ("+CARDS.length+")"],...DECKS.map(([k,t])=>[k,t+" ("+CARDS.filter(c=>c[0]===k).length+")"]),["random","★ Random: new problems"]],"all")}<div class="acts"><button type="button" class="fbtn2 ghost" data-cshuf>Shuffle</button><button type="button" class="fbtn2 ghost" data-creset>Start over</button></div></div>
  ${cardWidget()}</div>`;
}
const SETS=[["all","All 140"],...Array.from({length:14},(_,k)=>[String(k),`${k*10+1}–${k*10+10}`])];
function p140Html(){
  return `<div data-deck="p140"><p class="lead2">All 140 problems from the Factoring Practice packet. Pick a set of 10 (the same sets as the packet's pages) or all 140, then study with flashcards or type your own answers. Every answer shows the method to use.</p>
  <p class="fhelp">Factor completely. Always start with the GCF, count the terms, then check that no factor can be factored again. Type <code>prime</code> if a polynomial does not factor.</p>
  <div class="fctl" data-pbox>${chips("Set",SETS,"0")}${chips("Mode",[["cards","Flashcards"],["type","Type the answer"],["key","Answer key"]],"cards")}<div class="acts"><button type="button" class="fbtn2 ghost" data-cshuf>Shuffle</button><button type="button" class="fbtn2 ghost" data-creset>Start over</button><span class="fscore" data-psc></span></div></div>
  <div data-pcards>${cardWidget()}</div><div data-plist class="ftype"></div></div>`;
}
function typeHtml(){
  return `<p class="lead2">Type the answer yourself, then press Enter or "Check". Any correct form is accepted, as long as you factor or expand as asked.</p>
  <p class="fhelp">How to type: use <code>^</code> for powers (<code>x^2</code>, <code>a^3</code>), write products side by side (<code>(2x-3)(2x+3)</code>), and type numbers without commas. For a polynomial that doesn't factor, type <code>prime</code>.</p>
  <div class="fctl" data-tbox>${chips("Topic",[["recall","Recall the formulas"],...TOPIC_OPTS],"recall")}${chips("Questions",N_OPTS,"10")}<div class="acts"><button type="button" class="fbtn2" data-tgo>New questions</button><span class="fscore" data-tsc></span></div></div>
  <div data-tlist class="ftype"></div>`;
}
const LET="ABCD";

function bindMcq(root){
  const box=root.querySelector("[data-fmcq]"); if(!box) return;
  const list=root.querySelector("[data-flist]"), sc=root.querySelector("[data-fs]");
  const get=chipBox(box,()=>go());
  const go=()=>{
    const t=get(0), n=+get(1);
    const qs=[]; const used=new Set(); let g=0;
    while(qs.length<n&&g++<n*20){ const p=make(t); if(used.has(key(p.q))) continue; used.add(key(p.q)); qs.push(p); }
    let right=0,done=0;
    sc.textContent=`Score: 0 / ${n}`;
    list.innerHTML=qs.map((p,i)=>`<div class="fq"><div class="tg">${TOPICS[p.t]}</div><div class="qt"><span class="qn">${i+1}</span><span>${p.q}</span></div><div class="fopts">${p.opts.map((o,j)=>`<button type="button" data-j="${j}"><span class="L">${LET[j]}.</span>${o}</button>`).join("")}</div><div class="fexp"></div></div>`).join("")+`<div data-fend></div>`;
    list.querySelectorAll(".fq").forEach((el,i)=>{ const p=qs[i];
      el.querySelectorAll(".fopts button").forEach(b=>b.onclick=()=>{
        const ok=p.opts[+b.dataset.j]===p.c;
        el.querySelectorAll(".fopts button").forEach(x=>{x.disabled=true; if(p.opts[+x.dataset.j]===p.c) x.classList.add("ok");});
        if(!ok) b.classList.add("bad");
        const ex=el.querySelector(".fexp"); ex.innerHTML=`<span class="v ${ok?"ok":"bad"}">${ok?"✓ Correct!":"✗ Not quite."}</span> ${p.x}`; ex.classList.add("on");
        done++; if(ok) right++; sc.textContent=`Score: ${right} / ${n}`;
        if(done===n) list.querySelector("[data-fend]").innerHTML=`<div class="fdone">Finished: <b>${right} / ${n}</b> (${Math.round(100*right/n)}%). ${right===n?"Perfect!":right/n>=.8?"Great work!":"Review the formulas above and try a new set."} <button type="button" class="fbtn2" data-fagain>New questions</button></div>`, list.querySelector("[data-fagain]").onclick=()=>{go();box.scrollIntoView({behavior:"smooth",block:"center"});};
      });
    });
  };
  box.querySelector("[data-fgo]").onclick=go;
  go();
}

/* flashcard engine: box holds one card widget; provide() returns [label, front, back, note] cards */
function deckEngine(box,provide){
  const card=box.querySelector("[data-card]"), front=card.querySelector(".fc-f"), back=card.querySelector(".fc-b"), inner=card.querySelector(".fc-in");
  const $=s=>box.querySelector(s);
  let src=[],deck=[],i=0,known=new Set(),again=new Set();
  const show=()=>{
    inner.style.transition="none"; card.classList.remove("flip"); void inner.offsetWidth; inner.style.transition="";
    if(!deck.length){ front.innerHTML="No cards"; back.innerHTML=""; return; }
    const c=src[deck[i]];
    const [t1,t2]=c[1].includes("<br>")?c[1].split("<br>"):["",c[1]];
    front.innerHTML=`<small>${c[0]}</small>${t1?`<div class="fc-t">${t1}</div>`:""}<div class="fc-m">${t2}</div><span class="fc-hint">click or press space to flip</span>`;
    back.innerHTML=`<small>Answer</small><div class="fc-m">${c[2]}</div>${c[3]?`<div class="nt">${c[3]}</div>`:""}`;
    $("[data-cct]").textContent=`Card ${i+1} of ${deck.length}`;
    $("[data-cprog]").style.width=(100*known.size/deck.length)+"%";
    $("[data-cstat]").innerHTML=known.size===deck.length?`<b style="color:${RED}">You know every card in this deck! 🎉</b> Shuffle or pick another deck.`:`Known: <b>${known.size}</b> · Study again: <b>${again.size}</b> · Left: <b>${deck.length-known.size}</b>`;
  };
  const build=shuf=>{ src=provide(); deck=src.map((_,k)=>k); if(shuf) deck=shuffle(deck); i=0; known=new Set(); again=new Set(); show(); };
  const flip=()=>card.classList.toggle("flip");
  const move=d=>{ if(!deck.length) return; i=(i+d+deck.length)%deck.length; show(); };
  const nextUnknown=()=>{ if(known.size>=deck.length){ show(); return; } let k=i; do{ k=(k+1)%deck.length; }while(known.has(deck[k])&&k!==i); i=k; show(); };
  card.onclick=flip; card.onkeydown=e=>{ if(e.key===" "||e.key==="Enter"){ e.preventDefault(); flip(); } if(e.key==="ArrowRight") move(1); if(e.key==="ArrowLeft") move(-1); };
  $("[data-cflip]").onclick=flip; $("[data-cnext]").onclick=()=>move(1); $("[data-cprev]").onclick=()=>move(-1);
  $("[data-cknow]").onclick=()=>{ if(!deck.length) return; known.add(deck[i]); again.delete(deck[i]); nextUnknown(); };
  $("[data-cagain]").onclick=()=>{ if(!deck.length) return; again.add(deck[i]); known.delete(deck[i]); nextUnknown(); };
  return {build};
}
function bindCards(root){
  const box=root.querySelector('[data-deck="main"]'); if(!box) return;
  const RND=[]; let getD;
  const eng=deckEngine(box,()=>{ const d=getD(0);
    if(d==="random"){ RND.length=0; const used=new Set(); let g=0; while(RND.length<20&&g++<400){ const p=make("all"); const kq=key(p.q); if(used.has(kq)) continue; used.add(kq); RND.push([TOPICS[p.t],p.q.replace(/<\/?b>/g,""),p.c,""]); } return RND.slice(); }
    return CARDS.filter(c=>d==="all"||c[0]===d); });
  getD=chipBox(box.querySelector("[data-cbox]"),()=>eng.build(false));
  box.querySelector("[data-cshuf]").onclick=()=>eng.build(true); box.querySelector("[data-creset]").onclick=()=>eng.build(false);
  eng.build(false);
}
/* typed-answer list (shared): qs = [{q,c,x,chk,t?,tag?,num?}] */
function typeList(list,sc,qs,again){
  const n=qs.length; let right=0,done=0; sc.textContent=`Score: 0 / ${n}`;
  list.innerHTML=qs.map((p,i)=>`<div class="fq"><div class="tg">${p.tag||(p.t==="recall"?"Recall":TOPICS[p.t])}</div><div class="qt"><span class="qn">${p.num||i+1}</span><span>${p.q}</span></div>
    <div class="row"><input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${p.chk.kind==="num"?"Type a number":p.chk.kind==="expand"?"e.g. 4x^2+12x+9":"e.g. (2x-3)(2x+3)"}" aria-label="Answer to question ${p.num||i+1}"><button type="button" class="fbtn2" data-chk>Check</button><button type="button" class="fbtn2 ghost" data-show>Show answer</button></div>
    <div class="pv"></div><div class="fexp"></div></div>`).join("")+`<div data-tend></div>`;
  list.querySelectorAll(".fq").forEach((el,i)=>{ const p=qs[i], inp=el.querySelector("input"), ex=el.querySelector(".fexp"), pv=el.querySelector(".pv"); let fin=false, tries=0;
    const finish=(ok,shown)=>{ fin=true; done++; if(ok) right++; sc.textContent=`Score: ${right} / ${n}`; inp.readOnly=true; el.querySelectorAll("[data-chk],[data-show]").forEach(b=>b.disabled=true);
      ex.innerHTML=`<span class="v ${ok?"ok":"bad"}">${ok?"✓ Correct!":shown?"Answer:":"✗ Answer:"}</span> ${ok?"":"<b>"+p.c+"</b>"}${p.x?"<br>"+p.x:""}`; ex.classList.add("on");
      if(done===n){ list.querySelector("[data-tend]").innerHTML=`<div class="fdone">Finished: <b>${right} / ${n}</b> (${Math.round(100*right/n)}%). ${right===n?"Perfect!":"Keep practicing!"} <button type="button" class="fbtn2" data-tagain>${again.label}</button></div>`; list.querySelector("[data-tagain]").onclick=again.fn; }
      const nx=list.querySelectorAll(".fq input:not([readonly])")[0]; if(nx&&ok) nx.focus({preventScroll:false});
    };
    const check=()=>{ if(fin) return; const g=grade(inp.value,p.chk); inp.classList.toggle("ok",g.ok); inp.classList.toggle("bad",!g.ok);
      if(g.ok) return finish(true,false);
      tries++; ex.innerHTML=`<span class="v bad">✗</span> ${g.msg}${tries>=2?" You can press \"Show answer\".":""}`; ex.classList.add("on"); };
    inp.oninput=()=>{ pv.innerHTML=inp.value.trim()?`You typed: <span>${pretty(inp.value)}</span>`:""; inp.classList.remove("bad"); };
    inp.onkeydown=e=>{ if(e.key==="Enter"){ e.preventDefault(); check(); } };
    el.querySelector("[data-chk]").onclick=check;
    el.querySelector("[data-show]").onclick=()=>{ if(!fin) finish(false,true); };
  });
}
const P140Q=P140.map(([q,a,n,m],k)=>({num:k+1,tag:`Problem ${k+1} · Factor completely`,q:h(q),c:a==="Prime"?"Prime (does not factor)":h(a),x:`<i>Method:</i> ${m.replace(/½/g,FR(1,2))}`,
  chk:a==="Prime"?{kind:"prime"}:{kind:"factor",n,all:true,f:compile(q)}}));
function bindP140(root){
  const box=root.querySelector('[data-deck="p140"]'); if(!box) return;
  const cardsEl=box.querySelector("[data-pcards]"), list=box.querySelector("[data-plist]"), sc=box.querySelector("[data-psc]");
  let get, shuf=false;
  const pick=()=>{ const s=get(0); return s==="all"?P140Q.slice():P140Q.slice(+s*10,+s*10+10); };
  const eng=deckEngine(cardsEl,()=>pick().map(p=>[p.tag,p.q,p.c,p.x.replace("<i>Method:</i> ","Method: ")]));
  const render=()=>{ const mode=get(1);
    cardsEl.style.display=mode==="cards"?"":"none"; list.style.display=mode==="cards"?"none":""; sc.textContent="";
    let qs=pick(); if(shuf) qs=shuffle(qs);
    if(mode==="cards") eng.build(shuf);
    else if(mode==="type") typeList(list,sc,qs,{label:"Try this set again",fn:()=>{render();box.scrollIntoView({behavior:"smooth",block:"start"});}});
    else list.innerHTML=`<div class="pkey">${qs.map(p=>`<div class="pk"><span class="qn">${p.num}</span><div><div class="pq">${p.q}</div><div class="pa">= <b>${p.c}</b></div><div class="pm">${p.x.replace("<i>Method:</i> ","")}</div></div></div>`).join("")}</div>`;
  };
  get=chipBox(box.querySelector("[data-pbox]"),()=>{shuf=false;render();});
  box.querySelector("[data-cshuf]").onclick=()=>{shuf=true;render();}; box.querySelector("[data-creset]").onclick=()=>{shuf=false;render();};
  render();
}
function bindType(root){
  const list=root.querySelector("[data-tlist]"); if(!list) return;
  const sc=root.querySelector("[data-tsc]"), tbox=root.querySelector("[data-tbox]"); const getT=chipBox(tbox,()=>go());
  const go=()=>{
    const t=getT(0), n=+getT(1); let qs=[];
    if(t==="recall"){ const r=shuffle(RECALL).map(p=>({q:p.q,c:p.c,t:"recall",x:"",chk:{kind:p.kind,f:p.f}})); while(qs.length<n) qs.push(qs.length<r.length?r[qs.length]:make("all")); }
    else { const used=new Set(); let g=0; while(qs.length<n&&g++<n*20){ const p=make(t); if(used.has(key(p.q))) continue; used.add(key(p.q)); qs.push(p);} }
    typeList(list,sc,qs,{label:"New questions",fn:()=>{go();tbox.scrollIntoView({behavior:"smooth",block:"center"});}});
  };
  root.querySelector("[data-tgo]").onclick=go;
  go();
}

window.A2FORM={
  count:()=>F.length,
  subs:()=>[["formulas","Formulas",F.length+" formulas",formulasHtml(),"Formulas"],["mcq","Multiple Choice with Examples","10 · 15 · 20",mcqHtml(),"Multiple Choice"],["cards","Study Deck: Flashcards",CARDS.length+" cards",cardsHtml(),"Flashcards"],["type","Type the Answer","10 · 15 · 20",typeHtml(),"Type the Answer"],["p140","140 Problems","factoring packet",p140Html(),"140 Problems"]],
  lead:()=>`<p class="lead2 flead">Difference of squares, difference and sum of cubes, and squares and cubes of binomials: the formulas, multiple choice with examples, flashcards, and type-the-answer practice. <button type="button" class="openu fopen" data-open="formulas">Open the Formulas →</button></p>`,
  bind(root){ bindMcq(root); bindCards(root); bindType(root); bindP140(root);
    const FT=[["ds",0],["dc",0],["sc",0],["sq",1],["sq",-1],["cu",1],["cu",-1]];
    root.querySelectorAll("[data-fnew]").forEach(b=>b.onclick=()=>{ const [tp,sg]=FT[+b.dataset.fnew]; let p;
      for(let i=0;i<60;i++){ p=GEN[tp](); const plus=/\(<span[^>]*>|\(/.test(p.q)&&/ \+ [0-9]/.test(key(p.q).replace(/x/g,"x ").replace(/\+/g," + ")); if(tp==="ds"&&/Prime/.test(p.c)) continue; if(!sg) break; const L=key(p.q).match(/\(([^()]*)\)/); if(L&&(sg>0?L[1].includes("+"):L[1].includes("−"))) break; }
      const box=b.closest(".fbox").querySelector(".exb"); box.innerHTML=`${p.q.replace(/^(Factor completely|Expand): /,"")} = <b>${p.c}</b><div class="fx">${p.x}</div>`; }); const f=root.querySelector("#sub-formulas-formulas"); if(f&&f.tagName==="DETAILS") f.open=true; },
  _test:{make,grade,compile,RECALL,CARDS,GEN,P140Q,factorsOf}
};
})();
