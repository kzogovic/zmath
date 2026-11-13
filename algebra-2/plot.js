// Algebra 2 Honors: small SVG grapher for solutions
(function(){
const MN=s=>String(s).replace(/-/g,"−");
function num(v){
  if(!isFinite(v)) return "";
  if(Math.abs(v-Math.round(v))<1e-9) return MN(Math.round(v));
  for(const d of [2,3,4,5,6,7,8,9,11,12]){ const n=v*d; if(Math.abs(n-Math.round(n))<1e-9) return MN(`${Math.round(n)}/${d}`); }
  return MN(String(+v.toFixed(2)));
}
const tk=v=>MN(String(+(+v).toFixed(6)));
const pt=(x,y)=>`(${num(x)}, ${num(y)})`;
function nice(span){ const raw=span/8, p=Math.pow(10,Math.floor(Math.log10(raw))), f=raw/p; return (f<=1?1:f<=2?2:f<=5?5:10)*p; }
const esc=s=>String(s).replace(/(^|[\s(,=])-(?=[\d.])/g,"$1−").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

function plot(S){
  if(!S) return "";
  const nl=!!S.nl, W=380, H=nl?74:270, M={l:nl?14:38,r:14,t:nl?10:12,b:nl?30:26};
  const fns=(S.f||[]).map(o=>typeof o==="function"?{f:o}:o);
  const pts=S.p||[], vl=S.v||[], hl=S.h||[], xi=S.xi||[], seg=S.seg||[];
  // ---- x range
  let xs=[...pts.map(p=>p[0]),...vl,...xi.flatMap(i=>[i[0],i[1]]).filter(isFinite),...seg.flatMap(s=>[s[0],s[2]]),...(S.kx||[])];
  let [x0,x1]=S.xr||(()=>{ if(!xs.length) xs=[-5,5]; let a=Math.min(...xs), b=Math.max(...xs);
     if(a>0&&a<12) a=0; if(b<0&&b>-12) b=0; const w=Math.max(b-a,6), pd=Math.max(1,0.18*w); a-=pd; b+=pd;
     if(b-a<8){ const c=(a+b)/2; a=c-4; b=c+4; } return [a,b]; })();
  // ---- y range
  let y0=-1,y1=1;
  if(!nl){
    [y0,y1]=S.yr||(()=>{ let ys=[...pts.map(p=>p[1]),...hl,...seg.flatMap(s=>[s[1],s[3]]),...(S.ky||[])];
      for(const o of fns){ const lo=Math.max(x0,o.d?o.d[0]:-1e9), hi=Math.min(x1,o.d?o.d[1]:1e9); for(let i=0;i<=120;i++){ const x=lo+(hi-lo)*i/120, y=o.f(x); if(isFinite(y)) ys.push(y);} }
      if(!ys.length) ys=[-5,5]; let a=Math.min(...ys), b=Math.max(...ys);
      if(a>0&&a<0.6*(b-a)+12) a=0; if(b<0&&-b<0.6*(b-a)+12) b=0; if(a>0&&!S.noZero) a=Math.min(a,0); if(b<0&&!S.noZero) b=Math.max(b,0);
      if(S.cy){ const ky=[0,...pts.map(p=>p[1]),...hl]; a=Math.max(a,Math.min(...ky)-S.cy); b=Math.min(b,Math.max(...ky)+S.cy); }
      const pd=Math.max(1,0.1*(b-a)); a-=pd; b+=pd; if(b-a<6){const c=(a+b)/2;a=c-3;b=c+3;} return [a,b]; })();
    if(S.eq){ const ux=(W-M.l-M.r)/(x1-x0), uy=(H-M.t-M.b)/(y1-y0);
      if(ux>uy){ const sp=(W-M.l-M.r)/uy, c=(x0+x1)/2; x0=c-sp/2; x1=c+sp/2; } else { const sp=(H-M.t-M.b)/ux, c=(y0+y1)/2; y0=c-sp/2; y1=c+sp/2; } }
  }
  const X=x=>M.l+(x-x0)/(x1-x0)*(W-M.l-M.r), Y=y=>nl?(H-M.b-8):M.t+(y1-y)/(y1-y0)*(H-M.t-M.b);
  const id="c"+Math.random().toString(36).slice(2,8);
  let g=`<defs><clipPath id="${id}"><rect x="${M.l}" y="${M.t-2}" width="${W-M.l-M.r}" height="${H-M.t-M.b+4}"/></clipPath></defs>`;
  // ---- grid & ticks
  const sx=nice(x1-x0), sy=nice(y1-y0);
  const PI=Math.PI, pil=k=>{ // k quarters of pi
    const g=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a;}; if(k===0) return "0"; let n=k,d=4; const gg=g(n,d); n/=gg; d/=gg;
    const s=n<0?"−":""; n=Math.abs(n); return s+(n===1?"":n)+"π"+(d===1?"":"/"+d); };
  if(S.xpi){ const q=PI/4, span=(x1-x0)/q, stepQ=span>24?4:span>12?2:1;
    for(let k=Math.ceil(x0/q/stepQ)*stepQ;k*q<=x1+1e-9;k+=stepQ){ const px=X(k*q).toFixed(1);
      g+=`<line x1="${px}" y1="${M.t}" x2="${px}" y2="${H-M.b}" class="gg"/><text x="${px}" y="${H-M.b+15}" class="gt" text-anchor="middle">${pil(k)}</text>`; } }
  else for(let x=Math.ceil(x0/sx)*sx;x<=x1+1e-9;x+=sx){ const px=X(x).toFixed(1);
    if(!nl) g+=`<line x1="${px}" y1="${M.t}" x2="${px}" y2="${H-M.b}" class="gg"/>`;
    g+=`<text x="${px}" y="${H-M.b+(nl?18:15)}" class="gt" text-anchor="middle">${tk(x)}</text>`;
    if(nl) g+=`<line x1="${px}" y1="${Y(0)-4}" x2="${px}" y2="${Y(0)+4}" class="ga"/>`; }
  if(!nl) for(let y=Math.ceil(y0/sy)*sy;y<=y1+1e-9;y+=sy){ const py=Y(y).toFixed(1);
    g+=`<line x1="${M.l}" y1="${py}" x2="${W-M.r}" y2="${py}" class="gg"/><text x="${M.l-5}" y="${(+py+3.5).toFixed(1)}" class="gt" text-anchor="end">${tk(y)}</text>`; }
  // axes
  if(nl) g+=`<line x1="${M.l-6}" y1="${Y(0)}" x2="${W-M.r+6}" y2="${Y(0)}" class="ga"/>`;
  else{ if(y0<=0&&y1>=0) g+=`<line x1="${M.l}" y1="${Y(0)}" x2="${W-M.r}" y2="${Y(0)}" class="ga"/>`;
        if(x0<=0&&x1>=0) g+=`<line x1="${X(0)}" y1="${M.t}" x2="${X(0)}" y2="${H-M.b}" class="ga"/>`;
        g+=`<rect x="${M.l}" y="${M.t}" width="${W-M.l-M.r}" height="${H-M.t-M.b}" class="gf"/>`; }
  let c=`<g clip-path="url(#${id})">`;
  // shading of a 2-variable inequality
  if(S.sh){ const o=S.sh, ptsS=[]; for(let i=0;i<=160;i++){ const x=x0+(x1-x0)*i/160; ptsS.push(`${X(x).toFixed(1)},${Y(Math.max(y0-1,Math.min(y1+1,o.f(x)))).toFixed(1)}`);}
    c+=`<polygon points="${ptsS.join(" ")} ${X(x1)},${o.above?Y(y1+1):Y(y0-1)} ${X(x0)},${o.above?Y(y1+1):Y(y0-1)}" class="gs"/>`; }
  for(const x of vl) c+=`<line x1="${X(x)}" y1="${M.t}" x2="${X(x)}" y2="${H-M.b}" class="gv"/>`;
  for(const y of hl) c+=`<line x1="${M.l}" y1="${Y(y)}" x2="${W-M.r}" y2="${Y(y)}" class="gv"/>`;
  for(const s of seg) c+=`<line x1="${X(s[0])}" y1="${Y(s[1])}" x2="${X(s[2])}" y2="${Y(s[3])}" class="gseg"/>`;
  // functions
  for(const o of fns){ const lo=Math.max(x0,o.d?o.d[0]:-1e9), hi=Math.min(x1,o.d?o.d[1]:1e9); if(hi<=lo) continue;
    let d="", pen=false; const span=y1-y0;
    for(let i=0;i<=300;i++){ const x=lo+(hi-lo)*i/300, y=o.f(x);
      if(!isFinite(y)||y>y1+3*span||y<y0-3*span){ pen=false; continue; }
      d+=(pen?"L":"M")+X(x).toFixed(1)+","+Y(y).toFixed(1); pen=true; }
    c+=`<path d="${d}" class="${o.dash?"gc gd":o.light?"gc gl":"gc"}"/>`; }
  // solution intervals on the x-axis
  for(const [a,b,ca,cb] of xi){ const ya=nl?Y(0):(y0<=0&&y1>=0?Y(0):H-M.b), A=Math.max(a,x0-1), B=Math.min(b,x1+1);
    c+=`<line x1="${X(A)}" y1="${ya}" x2="${X(B)}" y2="${ya}" class="gx"/>`;
    if(isFinite(a)) c+=`<circle cx="${X(a)}" cy="${ya}" r="4.5" class="${ca?"gpc":"gpo"}"/>`;
    if(isFinite(b)) c+=`<circle cx="${X(b)}" cy="${ya}" r="4.5" class="${cb?"gpc":"gpo"}"/>`; }
  c+=`</g>`;
  // points (dots first, then labels placed to avoid overlaps)
  const boxes=[], vis=pts.filter(p=>p[0]>=x0&&p[0]<=x1&&p[1]>=y0&&p[1]<=y1).map(p=>({p,px:X(p[0]),py:Y(p[1])}));
  for(const v of vis){ c+=`<circle cx="${v.px.toFixed(1)}" cy="${v.py.toFixed(1)}" r="${nl?4.5:3.6}" class="${v.p[3]?"gpo":"gpc"}"/>`; boxes.push([v.px-5,v.py-5,v.px+5,v.py+5]); }
  const hit=(b)=>b[0]<M.l-2||b[2]>W-2||b[1]<1||b[3]>H-M.b+(nl?2:-1)||boxes.some(o=>!(b[2]<o[0]||b[0]>o[2]||b[3]<o[1]||b[1]>o[3]));
  for(const v of vis){ const lab=v.p[2]; if(lab===""||lab===null) continue; const L=lab===undefined?pt(v.p[0],v.p[1]):lab;
    const w=L.length*6.1+4, h=13;
    const cand=[[7,-7,"start"],[-7,-7,"end"],[7,16,"start"],[-7,16,"end"],[9,-20,"start"],[-9,-20,"end"],[9,28,"start"],[-9,28,"end"]];
    for(const [dx,dy,an] of cand){ const tx=v.px+dx, ty=v.py+dy, bx=an==="start"?[tx,ty-h+3,tx+w,ty+3]:[tx-w,ty-h+3,tx,ty+3];
      if(hit(bx)) continue; boxes.push(bx);
      c+=`<text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" class="gl2" text-anchor="${an}">${esc(L)}</text>`; break; } }
  const svg=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(S.cap||"graph")}">${g}${c}</svg>`;
  return `<figure class="gph${nl?" gnl":""}">${svg}${S.cap?`<figcaption>${esc(S.cap)}</figcaption>`:""}</figure>`;
}
// parabola helper: y = a x^2 + b x + c
function parab(a,b,c,o={}){
  const f=x=>a*x*x+b*x+c, h=-b/(2*a), k=f(h), D=b*b-4*a*c, p=[[h,k,`vertex ${pt(h,k)}`]];
  if(D>1e-12){ const r1=(-b-Math.sqrt(D))/(2*a), r2=(-b+Math.sqrt(D))/(2*a); const lo=Math.min(r1,r2), hi=Math.max(r1,r2);
    p.push([lo,0,o.zl?o.zl[0]:`(${num(lo)}, 0)`],[hi,0,o.zl?o.zl[1]:`(${num(hi)}, 0)`]); }
  else if(Math.abs(D)<=1e-12) p[0][2]=`vertex ${pt(h,k)} (double root)`;
  if(o.yint!==false && Math.abs(h)>0.4 && !(Math.abs(c)<1e-9)) p.push([0,c,`(0, ${num(c)})`]);
  return Object.assign({f:[f],p,v:[h],cap:o.cap||(D<-1e-12?`No x-intercepts (the zeros are complex). Axis of symmetry x = ${num(h)} (dashed).`:`Axis of symmetry x = ${num(h)} (dashed).`)},o.extra||{});
}
const polyF=cs=>x=>cs.reduce((s,c)=>s*x+c,0);
const CSS=`
figure.gph{float:right;width:min(320px,44%);margin:2px 0 10px 18px;border:1px solid #111;background:#fff;padding:4px 4px 2px}
figure.gph.gnl{width:min(330px,46%)}
figure.gph svg{display:block;width:100%;height:auto}
figure.gph figcaption{font-size:13.5px;font-style:italic;color:#444;padding:2px 4px 3px;line-height:1.3}
details.pans>div::after,.key::after{content:"";display:block;clear:both}
.gg{stroke:#e3e3e3;stroke-width:1}
.ga{stroke:#111;stroke-width:1.3}
.gf{fill:none;stroke:#999;stroke-width:1}
.gt{font:10.5px 'EB Garamond',Georgia,serif;fill:#555}
.gl2{font:600 12.5px 'EB Garamond',Georgia,serif;fill:#111;paint-order:stroke;stroke:#fff;stroke-width:3px;stroke-linejoin:round}
.gc{fill:none;stroke:#111;stroke-width:2.2;stroke-linejoin:round}
.gc.gd{stroke-dasharray:6 4;stroke-width:1.8}
.gc.gl{stroke:#888;stroke-width:1.8}
.gv{stroke:#777;stroke-width:1.2;stroke-dasharray:4 4}
.gseg{stroke:#555;stroke-width:1.5;stroke-dasharray:3 3}
.gs{fill:#111;fill-opacity:.1;stroke:none}
.gx{stroke:#111;stroke-width:5;stroke-opacity:.55;stroke-linecap:butt}
.gpc{fill:#111;stroke:#111;stroke-width:1.5}
.gpo{fill:#fff;stroke:#111;stroke-width:1.8}
@media (max-width:640px){figure.gph,figure.gph.gnl{float:none;width:100%;max-width:360px;margin:8px 0}}
@media print{figure.gph{break-inside:avoid}}
`;
if(typeof document!=="undefined"&&!document.getElementById("a2plotcss")){ const st=document.createElement("style"); st.id="a2plotcss"; st.textContent=CSS; document.head.appendChild(st); }
window.A2PLOT={plot,parab,num,pt,polyF,CSS};
})();
