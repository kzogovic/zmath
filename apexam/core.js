/* Z-Math AP Exam Prep (Calculus AB, Calculus BC, Precalculus): generator core.
   Loads after the book scripts (zbook.js + content), which supply the unit question banks.
   Course template files register in ZX.cmc[course] (calculator multiple choice) and ZX.frq[course] (free response). */
(function(){
"use strict";
if(window.ZNOBOOK) document.querySelectorAll("style").forEach(st=>{ if(!/\.mz-/.test(st.textContent)) st.remove(); });
const ZX=window.ZX={cmc:{ab:[],bc:[],pc:[]},frq:{ab:{A:[],B:[]},bc:{A:[],B:[]},pc:{1:[],2:[],3:[],4:[]}}};

/* ---------- seeded random ---------- */
function rng(seed){ let a=(seed>>>0)||1; const u=()=>{ a=(a+0x6D2B79F5)>>>0; let t=a; t=Math.imul(t^(t>>>15),t|1); t^=t+Math.imul(t^(t>>>7),t|61); return ((t^(t>>>14))>>>0)/4294967296; };
 const R={ u, int:(a,b)=>a+Math.floor(u()*(b-a+1)), pick:x=>x[Math.floor(u()*x.length)], chance:p=>u()<p,
  real:(a,b,d=1)=>+(a+u()*(b-a)).toFixed(d), nz:(a,b)=>{ let v=0; while(!v) v=a+Math.floor(u()*(b-a+1)); return v; },
  shuffle:x=>{ x=x.slice(); for(let i=x.length-1;i>0;i--){ const j=Math.floor(u()*(i+1)); [x[i],x[j]]=[x[j],x[i]]; } return x; } };
 R.sample=(x,k)=>R.shuffle(x).slice(0,k); return R; }
ZX.rng=rng;

/* ---------- numerics ---------- */
const H=ZX.H={
 integ(f,a,b,n=2000){ if(a===b) return 0; const h=(b-a)/n; let s=f(a)+f(b); for(let i=1;i<n;i++) s+=(i%2?4:2)*f(a+i*h); return s*h/3; },
 root(f,a,b){ let fa=f(a); for(let i=0;i<200;i++){ const m=(a+b)/2, fm=f(m); if((fm<0)===(fa<0)){ a=m; fa=fm; } else b=m; } return (a+b)/2; },
 roots(f,a,b,n=4000){ const out=[]; let x0=a, y0=f(a); for(let i=1;i<=n;i++){ const x1=a+(b-a)*i/n, y1=f(x1); if(y0===0) out.push(x0); else if((y0<0)!==(y1<0)) out.push(H.root(f,x0,x1)); x0=x1; y0=y1; } return out; },
 d(f,x,h=1e-5){ return (f(x+h)-f(x-h))/(2*h); },
 /* AP style: 3 decimal places */
 f3:x=>{ const s=(Math.abs(x)<5e-4?0:x).toFixed(3); return s.replace(/^-/,"−"); },
 f2:x=>(+x).toFixed(2).replace(/^-/,"−"),
 N:x=>{ if(Math.abs(x-Math.round(x))<1e-9){ x=Math.round(x); return (x<0?"−":"")+Math.abs(x); } return (x<0?"−":"")+String(+Math.abs(x).toFixed(3)); },
 gcd:(a,b)=>{ a=Math.abs(a); b=Math.abs(b); while(b) [a,b]=[b,a%b]; return a||1; },
 F(n,d){ if(d<0){ n=-n; d=-d; } const g=H.gcd(n,d); n/=g; d/=g; return d===1?H.N(n):(n<0?"−":"")+Math.abs(n)+"/"+d; },
 sg:n=>n<0?" − "+H.N(-n):" + "+H.N(n),
 X:(k,v="x")=>k===1?v:k===-1?"−"+v:H.N(k)+v,
 poly(c,v="x"){ const n=c.length-1; let s=""; c.forEach((a,i)=>{ if(!a) return; const p=n-i, m=Math.abs(a); const co=(m===1&&p>0)?"":H.N(m); const t=p===0?"":p===1?v:v+"<sup>"+p+"</sup>"; s+=s?(a<0?" − ":" + "):(a<0?"−":""); s+=co+t; }); return s||"0"; },
 FR:(n,d)=>`<span class="frc"><span>${n}</span><span>${d}</span></span>`,
 ig:(a,b)=>`∫<sub>${a}</sub><sup>${b}</sup>`,
 tb(h,rows){ return `<table class="tb"><tr>${h.map(x=>`<th>${x}</th>`).join("")}</tr>${rows.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join("")}</tr>`).join("")}</table>`; },
 tbh(rows){ return `<table class="tb">${rows.map(r=>`<tr><th>${r[0]}</th>${r.slice(1).map(x=>`<td>${x}</td>`).join("")}</tr>`).join("")}</table>`; }
};
/* answer checks used by rubric points: a function of the student's text.
   NUM(x): the text contains a number within tolerance of x (fractions like 7/2 and π multiples count). */
function nums(t){ t=String(t).replace(/−|–/g,"-").replace(/(\d),(?=\d{3}\b)/g,"$1"); const out=[];
 t.replace(/(-?\d*\.?\d+)\s*\/\s*(\d*\.?\d+)/g,(m,a,b)=>{ out.push(+a/+b); return m; });
 t.replace(/(-?\d*\.?\d+)\s*π/g,(m,a)=>{ out.push(+a*Math.PI); return m; });
 (t.match(/-?\d*\.?\d+(?:e-?\d+)?/g)||[]).forEach(x=>out.push(+x)); return out.filter(x=>isFinite(x)); }
ZX.nums=nums;
ZX.NUM=(x,tol)=>{ const tl=tol!=null?tol:Math.max(0.0015,Math.abs(x)*0.0006); return t=>nums(t).some(v=>Math.abs(v-x)<=tl); };
ZX.ANY=(...res)=>t=>res.some(r=>r.test(t));

/* ---------- SVG function plot ----------
 o={xmin,xmax,ymin,ymax,xstep,ystep,curves:[{f}|{pts:[[x,y]...],dash,lab}],dots:[[x,y,open]],lab:{x,y},W,H,shade:{f,a,b}} */
ZX.plot=function(o){ const W=o.W||380,Ht=o.H||300,L=34,R=W-12,T=12,B=Ht-30;
 const X=v=>L+(v-o.xmin)/(o.xmax-o.xmin)*(R-L), Y=v=>B-(v-o.ymin)/(o.ymax-o.ymin)*(B-T);
 const id="zp"+(ZX.plot.k=(ZX.plot.k||0)+1); let s=`<defs><clipPath id="${id}"><rect x="${L}" y="${T}" width="${R-L}" height="${B-T}"/></clipPath></defs>`;
 const xs=o.xstep||1, ys=o.ystep||1;
 for(let v=Math.ceil(o.xmin/xs)*xs; v<=o.xmax+1e-9; v+=xs) s+=`<line x1="${X(v)}" y1="${T}" x2="${X(v)}" y2="${B}" stroke="#e5e7eb"/>`;
 for(let v=Math.ceil(o.ymin/ys)*ys; v<=o.ymax+1e-9; v+=ys) s+=`<line x1="${L}" y1="${Y(v)}" x2="${R}" y2="${Y(v)}" stroke="#e5e7eb"/>`;
 if(o.shade){ const {f,a,b}=o.shade, g=o.shade.g||(()=>0); let d=""; for(let i=0;i<=60;i++){ const x=a+(b-a)*i/60; d+=(i?" L":"M")+`${X(x)},${Y(f(x))}`; } for(let i=60;i>=0;i--){ const x=a+(b-a)*i/60; d+=` L${X(x)},${Y(g(x))}`; } d+=" Z"; s+=`<path d="${d}" fill="#bfdbfe" opacity=".7" clip-path="url(#${id})"/>`; }
 if(o.ymin<=0&&o.ymax>=0) s+=`<line x1="${L}" y1="${Y(0)}" x2="${R}" y2="${Y(0)}" stroke="#111" stroke-width="1.3"/>`;
 if(o.xmin<=0&&o.xmax>=0) s+=`<line x1="${X(0)}" y1="${T}" x2="${X(0)}" y2="${B}" stroke="#111" stroke-width="1.3"/>`;
 const lx=o.lx||xs, ly=o.ly||ys;
 for(let v=Math.ceil(o.xmin/lx)*lx; v<=o.xmax+1e-9; v+=lx){ if(Math.abs(v)<1e-9&&o.ymin<0) continue; s+=`<text x="${X(v)}" y="${B+16}" font-size="11" text-anchor="middle">${H.N(+v.toFixed(4))}</text>`; }
 for(let v=Math.ceil(o.ymin/ly)*ly; v<=o.ymax+1e-9; v+=ly){ if(Math.abs(v)<1e-9) continue; s+=`<text x="${L-5}" y="${Y(v)+4}" font-size="11" text-anchor="end">${H.N(+v.toFixed(4))}</text>`; }
 (o.curves||[]).forEach(c=>{ let d=""; if(c.pts) c.pts.forEach(([x,y],i)=>d+=(i?" L":"M")+X(x).toFixed(1)+","+Y(y).toFixed(1));
  else { const a=c.a!=null?c.a:o.xmin, b=c.b!=null?c.b:o.xmax, n=240; let pen=false; for(let i=0;i<=n;i++){ const x=a+(b-a)*i/n, y=c.f(x); if(!isFinite(y)||Math.abs(y)>1e4){ pen=false; continue; } d+=(pen?" L":" M")+X(x).toFixed(1)+","+Y(y).toFixed(1); pen=true; } }
  s+=`<path d="${d}" fill="none" stroke="${c.col||"#1d4ed8"}" stroke-width="2.4" ${c.dash?'stroke-dasharray="6 4"':""} clip-path="url(#${id})"/>`;
  if(c.lab) s+=`<text x="${X(c.lab[0])}" y="${Y(c.lab[1])}" font-size="13" font-style="italic" fill="${c.col||"#1d4ed8"}">${c.lab[2]}</text>`; });
 (o.dots||[]).forEach(([x,y,open])=>s+=`<circle cx="${X(x)}" cy="${Y(y)}" r="4" fill="${open?"#fff":"#1d4ed8"}" stroke="#1d4ed8" stroke-width="2"/>`);
 (o.text||[]).forEach(([x,y,t])=>s+=`<text x="${X(x)}" y="${Y(y)}" font-size="12">${t}</text>`);
 if(o.lab) s+=`<text x="${R}" y="${B-5}" font-size="12" text-anchor="end" font-style="italic">${o.lab.x||"x"}</text><text x="${L+5}" y="${T+11}" font-size="12" font-style="italic">${o.lab.y||"y"}</text>`;
 return `<div class="zplot"><svg viewBox="0 0 ${W} ${Ht}" width="100%" style="max-width:${W}px" role="img" aria-label="${o.alt||"graph"}">${s}</svg>${o.cap?`<div class="cap">${o.cap}</div>`:""}</div>`; };

/* ---------- course blueprints (2026–27 CED, first exam May 2027) ---------- */
ZX.COURSES={
 ab:{name:"AP Calculus AB",book:"Z-AP Calculus AB",mcA:29,mcB:13,minA:62,minB:38,frA:2,frB:4,fminA:30,fminB:60,brk:10,mcW:50,frMax:9,
  units:{1:"Limits and Continuity",2:"Differentiation: Definition and Fundamental Properties",3:"Differentiation: Composite, Implicit, and Inverse Functions",4:"Contextual Applications of Differentiation",5:"Analytical Applications of Differentiation",6:"Integration and Accumulation of Change",7:"Differential Equations",8:"Applications of Integration"},
  w:{1:11,2:11,3:11,4:12.5,5:16.5,6:18.5,7:9,8:12.5},wtxt:"Unit 1: 10–12% · Unit 2: 10–12% · Unit 3: 9–13% · Unit 4: 10–15% · Unit 5: 15–18% · Unit 6: 17–20% · Unit 7: 6–12% · Unit 8: 10–15%"},
 bc:{name:"AP Calculus BC",book:"Z-AP Calculus BC",mcA:29,mcB:13,minA:62,minB:38,frA:2,frB:4,fminA:30,fminB:60,brk:10,mcW:50,frMax:9,
  units:{1:"Limits and Continuity",2:"Differentiation: Definition and Fundamental Properties",3:"Differentiation: Composite, Implicit, and Inverse Functions",4:"Contextual Applications of Differentiation",5:"Analytical Applications of Differentiation",6:"Integration and Accumulation of Change",7:"Differential Equations",8:"Applications of Integration",9:"Parametric Equations, Polar Coordinates, and Vector-Valued Functions",10:"Infinite Sequences and Series"},
  w:{1:5.5,2:5.5,3:5.5,4:7.5,5:9.5,6:18.5,7:7.5,8:7.5,9:11.5,10:17.5},wtxt:"Unit 1: 4–7% · Unit 2: 4–7% · Unit 3: 4–7% · Unit 4: 6–9% · Unit 5: 8–11% · Unit 6: 17–20% · Unit 7: 6–9% · Unit 8: 6–9% · Unit 9: 11–12% · Unit 10: 17–18%"},
 pc:{name:"AP Precalculus",book:"Z-AP Precalculus",mcA:29,mcB:13,minA:65,minB:40,frA:2,frB:2,fminA:35,fminB:35,brk:10,mcW:62.5,frMax:6,
  units:{1:"Polynomial and Rational Functions",2:"Exponential and Logarithmic Functions",3:"Trigonometric and Polar Functions"},
  w:{1:35,2:33.5,3:32.5},wtxt:"Unit 1: 30–40% · Unit 2: 27–40% · Unit 3: 30–35% (Unit 4 is not assessed on the AP Exam)"}
};

/* ---------- multiple choice from a book bank item ---------- */
function bookMC(p,u,lvl){ const T=window.ZB._test; const ch=T.options(p); const a=ch.indexOf(String(p.a)); if(ch.length<4||a<0) return null;
 if(new Set(ch.map(c=>c.replace(/<[^>]+>/g,"").trim())).size<4) return null;
 return {u,q:p.q,ch,a,ex:(p.s||[]).join("<br>")||"See the worked steps in the book.",t:p.t,lvl,calc:"no"}; }
/* multiple choice from an exam template: {u,q,a,w:[3],ex} */
function tplMC(p,R){ if(!p) return null; const all=[p.a,...p.w].map(String); if(new Set(all.map(c=>c.replace(/<[^>]+>/g,"").trim())).size<4) return null;
 const ch=R.shuffle(all); return {u:p.u,q:p.q,ch,a:ch.indexOf(String(p.a)),ex:p.ex,t:p.t,lvl:"calc",calc:p.calc||"rec"}; }

/* allocate n questions to units by weight (largest remainder) */
function alloc(w,n,R){ const ks=Object.keys(w), tot=ks.reduce((s,k)=>s+w[k],0); const raw=ks.map(k=>[k,w[k]/tot*n]); const out={}; let used=0;
 raw.forEach(([k,v])=>{ out[k]=Math.floor(v); used+=out[k]; }); R.shuffle(raw).sort((a,b)=>(b[1]%1)-(a[1]%1)).slice(0,n-used).forEach(([k])=>out[k]++); return out; }

/* ---------- build a full test ---------- */
ZX.build=function(seed,course){ const C=ZX.COURSES[course], R=rng(seed), old=Math.random; Math.random=R.u;
 try{
 const T=window.ZB._test, G=T.G, used=new Set(), mcA=[], mcB=[]; if(!Object.keys(G).length) window.ZB.init();
 /* Section I Part A: book bank, by unit weight; difficulty mix 30% standard, 40% medium, 30% advanced */
 const nA=alloc(C.w,C.mcA,R);
 Object.keys(nA).forEach(k=>{ const g=G["u"+k]; if(!g) return; let got=0, tries=0;
  while(got<nA[k]&&tries++<200){ const r=R.u(), lvl=r<0.3?"sat":r<0.7?"med":"adv", pool=(g[lvl]&&g[lvl].length)?g[lvl]:g.sat; const i=R.int(0,pool.length-1), key=k+lvl+i;
   if(used.has(key)&&tries<120) continue; const p=T.gen(pool[i]); if(!p) continue; if(/calculator/i.test(p.q)) continue; const m=bookMC(p,+k,lvl); if(!m) continue; used.add(key); mcA.push(m); got++; } });
 /* Section I Part B: calculator-active templates, spread across units */
 const CB=ZX.cmc[course]; const order=R.shuffle(CB.map((_,i)=>i)); let tries=0;
 for(let j=0; mcB.length<C.mcB && tries<400; j++,tries++){ const f=CB[order[j%order.length]]; if(j>=order.length&&R.u()<0.5) continue; let m=null; for(let t=0;t<12&&!m;t++){ try{ m=tplMC(f(R,H),R); }catch(e){ m=null; } } if(m&&!mcB.some(x=>x.q===m.q)) mcB.push(m); }
 /* Section II */
 const mk=(f)=>{ for(let t=0;t<15;t++){ try{ const q=f(R,H); if(q) return q; }catch(e){ if(window.ZX_DEBUG) console.error(e); } } return null; };
 let frA=[], frB=[];
 if(course==="pc"){ [1,2,3,4].forEach(s=>{ const q=mk(R.pick(ZX.frq.pc[s])); q.slot=s; (s<=2?frA:frB).push(q); }); }
 else { const P=ZX.frq[course]; const distinctFrom=(pool,n,have)=>{ const out=[], seen=new Set(have.map(q=>q.topic)); for(const f of R.shuffle(pool)){ if(out.length>=n) break; const q=mk(f); if(q&&!seen.has(q.topic)){ seen.add(q.topic); out.push(q); } } return out; };
  if(course==="bc"){ frA=[...distinctFrom(P.A,1,[]),...distinctFrom(P.Abc,1,[])]; const s=mk(R.pick(P.S)); frB=distinctFrom(P.B,2,[]); frB=[...frB,...distinctFrom(P.Bbc,1,frB),s]; }
  else { frA=distinctFrom(P.A,2,[]); frB=distinctFrom(P.B,4,[]); } }
 const all=[...frA,...frB]; all.forEach((f,i)=>{ f.id=i+1; f.parts.forEach(p=>p.pts.forEach((pt,k)=>{ pt.id=`${f.id}${p.id}${k+1}`; pt.v=pt.v||1; })); f.max=f.parts.reduce((s,p)=>s+p.pts.reduce((a,b)=>a+b.v,0),0); });
 const LV={sat:0,med:1,adv:2}; return {course,seed,units:C.units,partA:R.shuffle(mcA).sort((a,b)=>LV[a.lvl]-LV[b.lvl]),partB:R.shuffle(mcB),frA,frB};
 } finally { Math.random=old; } };
})();
