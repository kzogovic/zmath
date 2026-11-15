/* Z-Math exam graphs: every function returns an SVG (or HTML) string. Colors are print-friendly. */
(function(){
const F='font-family="system-ui,sans-serif"', INK="#16181d", GR="#d6d1c4", FILL="#c7d2fe", FILL2="#fde68a";
const fmt=v=>{ const r=Math.round(v*1000)/1000; return String(r).replace("-","−"); };
function ticks(min,max,step){ const t=[]; for(let v=min; v<=max+1e-9; v+=step) t.push(Math.round(v*1e6)/1e6); return t; }
function frame(W,H,body){ return `<svg class="zg" viewBox="0 0 ${W} ${H}" ${F} font-size="12" role="img">${body}</svg>`; }
/* x axis helper */
function xaxis(X,y0,x0,x1,o){ let s=`<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}" stroke="${INK}"/>`;
 ticks(o.min,o.max,o.step).forEach(v=>{ const x=X(v); s+=`<line x1="${x}" y1="${y0}" x2="${x}" y2="${y0+5}" stroke="${INK}"/><text x="${x}" y="${y0+18}" text-anchor="middle">${o.lab?o.lab(v):fmt(v)}</text>`; });
 if(o.minor) ticks(o.min,o.max,o.minor).forEach(v=>{ const x=X(v); s+=`<line x1="${x}" y1="${y0}" x2="${x}" y2="${y0+3}" stroke="${INK}"/>`; });
 if(o.xlab) s+=`<text x="${(x0+x1)/2}" y="${y0+36}" text-anchor="middle" font-weight="600">${o.xlab}</text>`; return s; }
function yaxis(Y,x0,y0,y1,o){ let s=`<line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y1}" stroke="${INK}"/>`;
 ticks(o.ymin,o.ymax,o.ystep).forEach(v=>{ const y=Y(v); s+=`<line x1="${x0-5}" y1="${y}" x2="${x0}" y2="${y}" stroke="${INK}"/><text x="${x0-8}" y="${y+4}" text-anchor="end">${fmt(v)}</text>`; if(o.grid) s+=`<line x1="${x0}" y1="${y}" x2="${o.grid}" y2="${y}" stroke="${GR}" stroke-dasharray="3 3"/>`; });
 if(o.ylab) s+=`<text transform="translate(14 ${(y0+y1)/2}) rotate(-90)" text-anchor="middle" font-weight="600">${o.ylab}</text>`; return s; }

/* Histogram: o={start,width,counts,xlab,ylab,ystep,title} */
function hist(o){ const W=o.W||360,H=o.H||230,L=48,R=W-12,T=o.title?28:12,B=H-46; const n=o.counts.length, xmax=o.start+n*o.width, ymax=o.ymax||Math.ceil(Math.max(...o.counts)/(o.ystep||5))*(o.ystep||5);
 const X=v=>L+(v-o.start)/(xmax-o.start)*(R-L), Y=v=>B-v/ymax*(B-T);
 let s=o.title?`<text x="${(L+R)/2}" y="16" text-anchor="middle" font-weight="700">${o.title}</text>`:"";
 s+=yaxis(Y,L,B,T,{ymin:0,ymax,ystep:o.ystep||5,ylab:o.ylab||"Frequency",grid:R});
 o.counts.forEach((c,i)=>{ if(c>0) s+=`<rect x="${X(o.start+i*o.width)}" y="${Y(c)}" width="${X(o.start+(i+1)*o.width)-X(o.start+i*o.width)}" height="${B-Y(c)}" fill="${o.fill||FILL}" stroke="${INK}"/>`; });
 s+=xaxis(X,B,L,R,{min:o.start,max:xmax,step:o.xstep||o.width,xlab:o.xlab}); return frame(W,H,s); }

/* Parallel boxplots: groups=[{lab,v:[min,q1,med,q3,max],out:[...]}], o={min,max,step,minor,xlab} */
function box(groups,o){ const W=o.W||360,rowH=o.rowH||46,L=o.L||70,R=W-14,T=10,B=T+groups.length*rowH, H=B+42;
 const X=v=>L+(v-o.min)/(o.max-o.min)*(R-L); let s="";
 if(o.grid) ticks(o.min,o.max,o.grid).forEach(v=>s+=`<line x1="${X(v)}" y1="${T}" x2="${X(v)}" y2="${B}" stroke="${GR}" stroke-dasharray="2 3"/>`);
 groups.forEach((g,i)=>{ const yc=T+i*rowH+rowH/2, h=rowH*0.45, [mn,q1,md,q3,mx]=g.v;
  s+=`<text x="${L-8}" y="${yc+4}" text-anchor="end" font-weight="600">${g.lab}</text>`;
  s+=`<line x1="${X(mn)}" y1="${yc}" x2="${X(q1)}" y2="${yc}" stroke="${INK}"/><line x1="${X(q3)}" y1="${yc}" x2="${X(mx)}" y2="${yc}" stroke="${INK}"/>`;
  s+=`<line x1="${X(mn)}" y1="${yc-h/3}" x2="${X(mn)}" y2="${yc+h/3}" stroke="${INK}"/><line x1="${X(mx)}" y1="${yc-h/3}" x2="${X(mx)}" y2="${yc+h/3}" stroke="${INK}"/>`;
  s+=`<rect x="${X(q1)}" y="${yc-h/2}" width="${X(q3)-X(q1)}" height="${h}" fill="${g.fill||FILL}" stroke="${INK}"/><line x1="${X(md)}" y1="${yc-h/2}" x2="${X(md)}" y2="${yc+h/2}" stroke="${INK}" stroke-width="2.5"/>`;
  (g.out||[]).forEach(v=>s+=`<circle cx="${X(v)}" cy="${yc}" r="3.5" fill="none" stroke="${INK}" stroke-width="1.5"/>`); });
 s+=xaxis(X,B,L,R,{min:o.min,max:o.max,step:o.step,minor:o.minor,xlab:o.xlab}); return frame(W,H,s); }

/* Dotplot: values (rounded to o.unit), o={min,max,step,xlab,mark:value,markLab} */
function dot(values,o){ const W=o.W||360,L=20,R=W-20; const cnt={}; values.forEach(v=>{ const k=Math.round(v/(o.unit||1))*(o.unit||1); cnt[k]=(cnt[k]||0)+1; });
 const mx=Math.max(...Object.values(cnt)), r=o.r||(mx<=4?5.5:4), gap=2*r+1, T=14, B=T+mx*gap+6, H=B+44; const X=v=>L+(v-o.min)/(o.max-o.min)*(R-L); let s="";
 Object.entries(cnt).forEach(([k,c])=>{ for(let j=0;j<c;j++) s+=`<circle cx="${X(+k)}" cy="${B-r-2-j*gap}" r="${r}" fill="${INK}"/>`; });
 if(o.mark!=null) s+=`<line x1="${X(o.mark)}" y1="${T-6}" x2="${X(o.mark)}" y2="${B}" stroke="#dc2626" stroke-width="2" stroke-dasharray="5 3"/><text x="${X(o.mark)+4}" y="${T}" fill="#dc2626" font-weight="700">${o.markLab||""}</text>`;
 s+=xaxis(X,B,L,R,{min:o.min,max:o.max,step:o.step,xlab:o.xlab,lab:o.lab}); return frame(W,H,s); }

/* Stemplot (HTML). rows=[[stem,"leaves"],...]; back-to-back if rows=[[leftLeaves,stem,rightLeaves]] */
function stem(rows,o){ const b2b=rows[0].length===3; let h=`<table class="stemp">`;
 if(o&&o.heads) h+=`<tr><th>${o.heads[0]}</th>${b2b?`<th></th><th>${o.heads[1]}</th>`:""}</tr>`;
 rows.forEach(r=>{ h+= b2b?`<tr><td class="lf l">${r[0].split("").join(" ")}</td><td class="st">${r[1]}</td><td class="lf">${r[2].split("").join(" ")}</td></tr>`:`<tr><td class="st">${r[0]}</td><td class="lf">${r[1].split("").join(" ")}</td></tr>`; });
 return h+`</table>${o&&o.key?`<div class="skey">Key: ${o.key}</div>`:""}`; }

/* Scatterplot: pts=[[x,y]], o={xmin,xmax,xstep,ymin,ymax,ystep,xlab,ylab,line:[a,b],hl:[[x,y,label]]} */
function scatter(pts,o){ const W=o.W||360,H=o.H||260,L=52,R=W-12,T=12,B=H-46; const X=v=>L+(v-o.xmin)/(o.xmax-o.xmin)*(R-L), Y=v=>B-(v-o.ymin)/(o.ymax-o.ymin)*(B-T);
 let s=yaxis(Y,L,B,T,{ymin:o.ymin,ymax:o.ymax,ystep:o.ystep,ylab:o.ylab,grid:o.grid?R:0});
 if(o.zero) s+=`<line x1="${L}" y1="${Y(0)}" x2="${R}" y2="${Y(0)}" stroke="${INK}" stroke-width="1.5"/>`;
 if(o.line){ const [a,b]=o.line, x0=o.lx?o.lx[0]:o.xmin, x1=o.lx?o.lx[1]:o.xmax; s+=`<line x1="${X(x0)}" y1="${Y(a+b*x0)}" x2="${X(x1)}" y2="${Y(a+b*x1)}" stroke="#1d4ed8" stroke-width="2"/>`; }
 pts.forEach(([x,y])=>s+=`<circle cx="${X(x)}" cy="${Y(y)}" r="3.6" fill="${INK}" fill-opacity=".85"/>`);
 (o.hl||[]).forEach(([x,y,l])=>s+=`<circle cx="${X(x)}" cy="${Y(y)}" r="7" fill="none" stroke="#dc2626" stroke-width="2"/><text x="${X(x)+9}" y="${Y(y)-6}" fill="#dc2626" font-weight="700">${l}</text>`);
 s+=xaxis(X,B,L,R,{min:o.xmin,max:o.xmax,step:o.xstep,xlab:o.xlab}); return frame(W,H,s); }
const resid=(pts,o)=>scatter(pts,Object.assign({zero:true,ylab:"Residual"},o));

/* Segmented bar chart: bars=[{lab,parts:[p1,p2,...]}], cats=[...] */
function segbar(bars,cats,o){ const W=o&&o.W||360,H=230,L=48,R=W-110,T=12,B=H-40; const fills=["#c7d2fe","#fde68a","#bbf7d0","#fecaca","#e9d5ff"];
 const Y=v=>B-v*(B-T); let s=yaxis(Y,L,B,T,{ymin:0,ymax:1,ystep:0.2,ylab:(o&&o.ylab)||"Proportion"}); const bw=(R-L)/bars.length;
 bars.forEach((b,i)=>{ let acc=0; const x=L+i*bw+bw*0.18, w=bw*0.64; b.parts.forEach((p,j)=>{ s+=`<rect x="${x}" y="${Y(acc+p)}" width="${w}" height="${Y(acc)-Y(acc+p)}" fill="${fills[j]}" stroke="${INK}"/>`; if(p>0.06) s+=`<text x="${x+w/2}" y="${(Y(acc)+Y(acc+p))/2+4}" text-anchor="middle" font-size="11">${Math.round(p*100)}%</text>`; acc+=p; });
  s+=`<text x="${x+w/2}" y="${B+16}" text-anchor="middle" font-weight="600">${b.lab}</text>`; });
 s+=`<line x1="${L}" y1="${B}" x2="${R}" y2="${B}" stroke="${INK}"/>`;
 cats.slice().reverse().forEach((c,k)=>{ const j=cats.length-1-k; s+=`<rect x="${R+12}" y="${T+k*22}" width="14" height="14" fill="${fills[j]}" stroke="${INK}"/><text x="${R+32}" y="${T+k*22+12}">${c}</text>`; });
 if(o&&o.xlab) s+=`<text x="${(L+R)/2}" y="${B+34}" text-anchor="middle" font-weight="600">${o.xlab}</text>`; return frame(W,H,s); }

/* Two sampling distributions for Type I / Type II / power.
   o={m0,m1,sd,crit,xmin,xmax,step,shade:["alpha"|"beta"|"power"], labels:{A:..}, lab0,lab1,xlab} */
function errs(o){ const W=o.W||360,H=210,L=14,R=W-14,T=22,B=H-46; const X=v=>L+(v-o.xmin)/(o.xmax-o.xmin)*(R-L);
 const pdf=(x,m)=>Math.exp(-0.5*((x-m)/o.sd)**2), Y=v=>B-v*(B-T);
 const path=(m,a,b,closed)=>{ let d=""; const n=120; for(let i=0;i<=n;i++){ const x=a+(b-a)*i/n; d+=(i?"L":"M")+X(x).toFixed(1)+","+Y(pdf(x,m)).toFixed(1); } return closed?d+`L${X(b)},${B}L${X(a)},${B}Z`:d; };
 let s=""; const sh=o.shade||[];
 const reg={alpha:[o.m0,o.crit,o.xmax,"#fca5a5"],beta:[o.m1,o.xmin,o.crit,"#93c5fd"],power:[o.m1,o.crit,o.xmax,"#86efac"]};
 sh.forEach(k=>{ const [m,a,b,c]=reg[k]; s+=`<path d="${path(m,a,b,true)}" fill="${c}" fill-opacity=".75" stroke="none"/>`; });
 (o.regions||[]).forEach(([m,a,b,c,lab,lx,ly])=>{ s+=`<path d="${path(m,a,b,true)}" fill="${c}" fill-opacity=".7"/>`; if(lab) s+=`<text x="${X(lx)}" y="${Y(ly)}" text-anchor="middle" font-weight="700">${lab}</text>`; });
 s+=`<path d="${path(o.m0,o.xmin,o.xmax)}" fill="none" stroke="${INK}" stroke-width="2"/><path d="${path(o.m1,o.xmin,o.xmax)}" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="6 4"/>`;
 s+=`<line x1="${X(o.crit)}" y1="${T-12}" x2="${X(o.crit)}" y2="${B}" stroke="#7c2d12" stroke-width="2"/><text x="${X(o.crit)+4}" y="${T-2}" fill="#7c2d12" font-weight="700">${o.critLab||"critical value"}</text>`;
 s+=`<text x="${X(o.m0)}" y="${Y(1)-6}" text-anchor="middle" font-weight="700">${o.lab0||"H₀ true"}</text><text x="${X(o.m1)}" y="${Y(1)-6}" text-anchor="middle" font-weight="700">${o.lab1||"Hₐ true"}</text>`;
 s+=xaxis(X,B,L,R,{min:o.xmin,max:o.xmax,step:o.step,xlab:o.xlab}); return frame(W,H,s); }

/* Normal curve with a shaded region and labels: o={mu,sd,a,b,xmin,xmax,step,xlab} */
function normal(o){ return errs({m0:o.mu,m1:1e9,sd:o.sd,crit:o.b,xmin:o.xmin,xmax:o.xmax,step:o.step,xlab:o.xlab,lab0:"",lab1:"",critLab:"",regions:[[o.mu,o.a,o.b,"#c7d2fe"]]}); }

window.ZG={hist,box,dot,stem,scatter,resid,segbar,errs,normal};
})();
