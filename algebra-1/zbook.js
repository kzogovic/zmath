/* Z-book course framework: course map, unit node maps, flowcharts, key formulas, solved examples, practice and Challenge Lab. */
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


window.ZH={R,pick,nz,gcd,shuffle,C,fact,N,F,sq,cu,X,sg,poly,P,PF,PS};
const fv=()=>`<i class="mf-v" aria-hidden="true"></i>`;
const FLOWS={};
function flowHTML(id,F){ FLOWS[id]=F;
  const col=C=>C.g?`<div class="mf-col mf-gc">${fv()}<div class="mf-g" style="--c:${C.c}"><b>${C.g}</b><span>${C.s}</span></div><div class="mf-br" style="--n:${C.cols.length};grid-template-columns:repeat(${C.cols.length},minmax(0,1fr))">${C.cols.map(col).join("")}</div><i class="mf-v mf-fill" aria-hidden="true"></i></div>`
    :`<div class="mf-col">${fv()}<div class="mf-l" style="--c:${C[2]}"><b>${C[0]}</b><span>${C[1]}</span></div>${C[3].map(k=>fv()+fn(k)).join("")}<i class="mf-v mf-fill" aria-hidden="true"></i></div>`;
  const fn=k=>{ const m=F.M[k]; return `<button type="button" class="mf-n" data-fm="${k}" style="--c:${m.c}"><b>${m.name}</b><span>${m.hint}</span></button>`; };
  return `<div class="fx-lead"><p>${F.lead}</p></div>
<div class="mf" data-flow="${id}" role="group" aria-label="${F.label}">
 <div class="mf-s">${F.start}</div>${fv()}
 ${F.top.map(k=>fn(k)+fv()).join("")}
 <div class="mf-q">${F.q}</div>
 <div class="mf-br${F.cols[0].g?" grp":""}" style="--n:${F.cols.length};grid-template-columns:repeat(${F.cols.length},minmax(0,1fr))">${F.cols.map(C=>col(C)).join("")}</div>
 ${fv()}${fn(F.end)}
</div>
<div class="mf-d" aria-live="polite"></div>`; }
function mfDetail(m,flow,k){
  return `<div class="mf-dc" style="--c:${m.c}"><div class="mf-dk">${m.grp}</div><h4>${m.name}</h4><p class="mf-when"><b>When:</b> ${m.when}</p><p class="mf-rule">${m.rule}</p>${m.why?`<p class="mf-why"><b>Why this method:</b> ${m.why}</p>`:""}
   ${zHas(flow)?`<button type="button" class="fx-go mf-gen" data-mgen="1" style="margin:.4em 0 .6em;font-weight:700">↻ New examples (new numbers every tap)</button>`:""}<div class="mf-exs">${m.ex.map(([q,st],i)=>`<div class="mf-ex"><div class="fx-k">Example ${i+1}</div><p class="mf-eq">${q}</p><ol>${st.map(s=>`<li>${s}</li>`).join("")}</ol></div>`).join("")}</div>
   ${m.tip?`<p class="mf-tip"><b>⚠ Watch out:</b> ${m.tip}</p>`:""}
   ${m.go?`<button type="button" class="fx-go" data-mjump="${m.go}">Full method, more examples & practice →</button>`:""}${m.open?`<button type="button" class="fx-go" data-mopen="${m.open[0]}">${m.open[1]} →</button>`:""}</div>`; }
function bindFlow(root){ root.querySelectorAll(".mf").forEach(mf=>{ if(mf.dataset.bound) return; mf.dataset.bound=1; const d=mf.nextElementSibling, F=FLOWS[mf.dataset.flow]; if(!F) return;
  const pickK=(k,scroll)=>{ mf.querySelectorAll(".mf-n").forEach(b=>b.classList.toggle("on",b.dataset.fm===k)); d.dataset.k=k; d.innerHTML=mfDetail(F.M[k],mf.dataset.flow,k); if(scroll) d.scrollIntoView({behavior:"smooth",block:"nearest"}); };
  mf.querySelectorAll(".mf-n").forEach(b=>b.onclick=()=>pickK(b.dataset.fm,true)); pickK((F.top&&F.top[0])||Object.keys(F.M)[0],false);
  d.addEventListener("click",e=>{ if(e.target.closest("[data-mgen]")){ const ex=zFresh(mf.dataset.flow,F.M[d.dataset.k]); if(ex) d.querySelector(".mf-exs").innerHTML=ex; return; } const o=e.target.closest("[data-mopen]"); if(o){ location.hash=o.dataset.mopen; return; }
    const j=e.target.closest("[data-mjump]"); if(!j) return; const sec=mf.closest("section.unit"), node=sec&&sec.querySelector(`.pm-node[data-pk="${j.dataset.mjump.replace(/^sub-[^-]+-/,"")}"]`);
    if(node) node.click(); const t=document.getElementById(j.dataset.mjump); if(!t) return; if(t.tagName==="DETAILS") t.open=true; setTimeout(()=>window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-130,behavior:"smooth"}),40); }); }); }

const zU=flow=>String(flow||"").replace(/^f-/,"");
const zHas=flow=>{ const u=zU(flow); return !!(typeof G!=="undefined"&&G[u]&&(G[u].sat.length||G[u].med.length||G[u].adv.length)); };
const zTok=s=>new Set(String(s||"").replace(/<[^>]+>/g," ").toLowerCase().split(/[^a-z]+/).filter(w=>w.length>3&&!/^(with|from|that|this|then|when|each|into|than|only|both|have|uses|use|find|your|what|which|value|values)$/.test(w)).map(w=>w.replace(/(ies|es|s|ing|ed)$/,"")));
function zPick(u,kind,m){ const L=G[u][kind]; if(!L.length) return null; topicsOf(u,kind); const T=zTok(m.name+" "+m.hint+" "+(m.when||""));
  const sc=L.map(g=>{ let n=0; zTok(g._t).forEach(w=>{ if(T.has(w)) n++; }); return n; }); const best=Math.max(...sc); const pool=best>0?L.filter((g,i)=>sc[i]===best):L;
  return gen(pick(pool)); }
function zFresh(flow,m){ const u=zU(flow); if(!zHas(flow)||!m) return null; const out=[]; for(const [k,lab] of LVL){ if(!G[u][k]||!G[u][k].length) continue; const p=zPick(u,k,m); if(p) out.push([lab,p]); }
  if(out.length<2){ const b=zPick(u,"sat",m); if(b&&(!out[0]||b.q!==out[0][1].q)) out.push(["Easy",b]); }
  return out.map(([lab,p])=>`<div class="mf-ex"><div class="fx-k">${lab} · ${p.t}</div><p class="mf-eq">${p.q}</p><p><b>Answer:</b> ${p.a}</p>${solHtml(p)}</div>`).join(""); }
/* ===================== engine ===================== */
const has=(u,kind)=>!!(G[u]&&G[u][kind]&&G[u][kind].length);
function parseAns(s){ s=String(s||"").trim().toLowerCase().replace(/^[a-z]\s*=\s*/,"").replace(/[−–—]/g,"-").replace(/,/g,"").replace(/\s+/g,"").replace(/%$/,"").replace(/^\$/,"");
  if(!s) return null; let m=s.match(/^(-?\d*\.?\d+)\/(-?\d*\.?\d+)$/); if(m) return +m[1]/+m[2]; if(/^-?\d*\.?\d+(e-?\d+)?$/.test(s)) return +s; return NaN; }
function gen(g){ for(let i=0;i<30;i++){ try{ const p=g(); if(p&&p.q&&p.a!=null) return p; }catch(e){} } return null; }
function options(p){ const seen=new Set([String(p.a)]), o=[String(p.a)]; for(const w of p.w){ const s=String(w); if(!seen.has(s)&&s!=="NaN"){ seen.add(s); o.push(s); } if(o.length===4) break; }
  let k=1; while(o.length<4&&typeof p.v==="number"){ const c=N(p.v+(k%2?k:-k)); if(!seen.has(c)){ seen.add(c); o.push(c); } k++; } return shuffle(o); }
const esc=s=>String(s).replace(/"/g,"&quot;");
function setOf(u,kind,tp,n,typeOnly){ const L=G[u][kind].filter(g=>!tp||(g._t||"")===tp); const out=[], seen=new Set(); let tries=0;
  while(out.length<n&&tries++<n*25){ const g=L[out.length%L.length], p=gen(g); if(!p) continue; if(typeOnly&&(p.mc||typeof p.v!=="number")) continue; if(seen.has(p.q)) continue; seen.add(p.q); out.push(p); } return out; }
function topicsOf(u,kind){ G[u][kind].forEach(g=>{ if(g._t===undefined){ const p=gen(g); g._t=p?p.t:""; } }); return [...new Set(G[u][kind].map(g=>g._t))]; }
const gph=p=>p&&p.g&&window.A2PLOT?A2PLOT.plot(p.g):"";
const solHtml=p=>`<ol class="pr-st">${p.s.map(x=>`<li>${x}</li>`).join("")}</ol>${gph(p)}<div class="clr"></div>`;
const tolOf=p=>p.tol!=null?p.tol:Math.max(1e-6,Math.abs(p.v)*1e-6);
const lvls=u=>LVL.filter(([k])=>has(u,k));
const lvlRow=(u,kind,attr)=>{ const L=lvls(u); return L.length>1?`<div class="pr-tp pr-lv"><span class="gl">Level</span>${L.map(([k,v])=>`<button type="button" ${attr}="${k}"${k===kind?' class="on"':""}>${v}</button>`).join("")}</div>`:""; };
const tpRow=(u,kind)=>`<span class="gl">Topic</span>${["All",...topicsOf(u,kind)].map((t,i)=>`<button type="button" data-prt="${i?esc(t):""}"${i?"":' class="on"'}>${t}</button>`).join("")}`;
function boxHTML(u,kind,noLvl){ const tps=topicsOf(u,kind);
  return `<div class="pr" data-pr="${u}|${kind}">
   ${kind==="sat"&&!noLvl?lvlRow(u,kind,"data-prl"):""}<p class="lead2">${LEAD[kind]||""}</p>
   <div class="pr-tp pr-tps"><span class="gl">Topic</span>${["All",...tps].map((t,i)=>`<button type="button" data-prt="${i?esc(t):""}"${i?"":' class="on"'}>${t}</button>`).join("")}</div>
   <div class="pr-md">${[["mcq","Multiple choice"],["deck","Deck"],["type","Type the answer"]].filter(m=>m[0]!=="type"||!NOTYPE[kind]).map(([k,v],i)=>`<button type="button" data-prm="${k}"${i?"":' class="on"'}>${v}</button>`).join("")}<button type="button" class="pr-new" data-prn>↻ New</button></div>
   <div class="pr-sc"></div><div class="pr-o"></div></div>`; }
function bind(root){ root.querySelectorAll(".pr").forEach(box=>{ if(box.dataset.bound) return; box.dataset.bound=1;
  let [u,kind]=box.dataset.pr.split("|"); const out=box.querySelector(".pr-o"), sc=box.querySelector(".pr-sc"); let mode="mcq", tp="";
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
  const bindTp=()=>box.querySelectorAll("[data-prt]").forEach(b=>b.onclick=()=>{ tp=b.dataset.prt; box.querySelectorAll("[data-prt]").forEach(x=>x.classList.toggle("on",x===b)); render(); }); bindTp();
  box.querySelectorAll("[data-prl]").forEach(b=>b.onclick=()=>{ kind=b.dataset.prl; tp=""; box.querySelectorAll("[data-prl]").forEach(x=>x.classList.toggle("on",x===b)); box.querySelector(".lead2").textContent=LEAD[kind]; box.querySelector(".pr-tps").innerHTML=tpRow(u,kind); bindTp(); render(); });
  box.querySelectorAll("[data-prm]").forEach(b=>b.onclick=()=>{ mode=b.dataset.prm; box.querySelectorAll("[data-prm]").forEach(x=>x.classList.toggle("on",x===b)); render(); });
  box.querySelector("[data-prn]").onclick=render; render(); }); }

const TEAL='#0f7a6c';
const CSS=`.fx-lead{border-left:4px solid ${TEAL};background:#f6fbfa;padding:8px 14px;margin:6px 0 14px}
.fx-lead p{margin:0;font-size:17.5px}
.yes{color:#137333;font-weight:600}.no{color:#b3261e;font-weight:600}
.frc{display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;font-size:.82em;line-height:1.05;margin:0 1px}
.frc span+span{border-top:1.3px solid currentColor}
.fx-go{align-self:flex-start;margin-top:4px;border:1.5px solid ${TEAL};background:#fff;color:${TEAL};padding:2px 12px;font:600 15px 'EB Garamond',Georgia,serif;cursor:pointer}
.fx-go:hover{background:${TEAL};color:#fff}
.fx-k{font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:${TEAL};font-weight:600}
.mf{display:flex;flex-direction:column;align-items:center;margin:6px 0 4px;padding:18px 10px;border:1.5px solid #d9e0ea;border-radius:16px;background:#fbfcfe radial-gradient(#dde4ee 1px,transparent 1.2px) 0 0/20px 20px}
.mf-v{display:block;width:2px;height:20px;background:#8ea3c0;flex:none}
.mf-s{background:#111;color:#fff;border-radius:999px;padding:6px 20px;font-weight:700;font-size:18px}
.mf-q{border:2px dashed #111;background:#fff;border-radius:10px;padding:5px 16px;font-weight:700;font-size:17px}
.mf-n{border:1.5px solid #dbe2ec;border-top:4px solid var(--c);border-radius:12px;background:#fff;padding:7px 10px;min-width:150px;max-width:230px;display:flex;flex-direction:column;gap:1px;text-align:center;cursor:pointer;font-family:'EB Garamond',Georgia,serif;box-shadow:0 4px 12px rgba(15,30,60,.08);transition:transform .12s,box-shadow .12s}
.mf-n b{color:var(--c);font-size:16.5px;line-height:1.15}.mf-n span{font-size:13.5px;color:#555;line-height:1.2}
.mf-n:hover{transform:translateY(-2px);box-shadow:0 8px 18px rgba(15,30,60,.15)}
.mf-n.on{background:var(--c);border-color:var(--c);box-shadow:0 0 0 4px color-mix(in srgb,var(--c) 22%,transparent)}
.mf-n.on b,.mf-n.on span{color:#fff}
.mf-br{--g:12px;position:relative;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));column-gap:var(--g);width:100%;margin-top:20px}
.mf-br::before,.mf-br::after{content:"";position:absolute;left:calc((100% - (var(--n,4) - 1) * var(--g)) / var(--n,4) / 2);right:calc((100% - (var(--n,4) - 1) * var(--g)) / var(--n,4) / 2);height:2px;background:#8ea3c0}
.mf-br::before{top:0}.mf-br::after{bottom:0}
.mf-col{display:flex;flex-direction:column;align-items:center;min-width:0}
.mf-col .mf-n{width:100%;min-width:0}
.mf-fill{flex:1;min-height:20px}
.mf-l{border-radius:999px;background:var(--c);color:#fff;padding:3px 14px;text-align:center;display:flex;flex-direction:column;line-height:1.15}
.mf-l b{font-size:16px}.mf-l span{font-size:12.5px;opacity:.9;font-style:italic}
.mf-d{margin-top:14px}
.mf-g{border-radius:12px;background:var(--c);color:#fff;padding:5px 18px;text-align:center;display:flex;flex-direction:column;line-height:1.15;box-shadow:0 4px 10px rgba(0,0,0,.15)}
.mf-g b{font-size:19px}.mf-g span{font-size:13.5px;opacity:.92;font-style:italic}
.mf-gc{padding:0 4px}
.mf-gc>.mf-br{--g:8px;column-gap:8px}
.mf-gc .mf-l{padding:3px 6px}.mf-gc .mf-l b{font-size:14px}
.mf-gc .mf-n{padding:6px 5px}.mf-gc .mf-n b{font-size:14.5px}.mf-gc .mf-n span{font-size:12.5px}
@media (max-width:820px){.mf-br.grp{grid-template-columns:1fr!important;row-gap:0}.mf-br.grp::before,.mf-br.grp::after{display:none}.mf-br.grp>.mf-gc{padding:0}
 .mf-br.grp>.mf-gc>.mf-fill{display:none}.mf-br.grp>.mf-gc+.mf-gc{margin-top:18px}}
@media (max-width:700px){.mf-gc .mf-n b{font-size:10.5px!important;overflow-wrap:normal!important;word-break:normal;hyphens:manual!important}.mf-gc .mf-l b{font-size:10.5px!important}.mf-gc>.mf-br{--g:4px;column-gap:4px}}
.mf-tip{margin:6px 0;font-size:16px}
.mf-why{margin:0 0 6px;font-size:17px;background:#fff8e6;border-left:3px solid #c28a00;padding:6px 10px}
.mf-br[style*="--n:4"] .mf-col .mf-n{max-width:none}
.mf-l span:empty{display:none}
.mf-dc{border:1.5px solid #111;border-top:5px solid var(--c);background:#fff;padding:12px 16px}
.mf-dk{font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--c);font-weight:600}
.mf-dc h4{margin:2px 0 6px;font-size:23px;color:var(--c)}
.mf-when,.mf-rule{margin:0 0 6px;font-size:17px}
.mf-rule{background:#f6f8fb;border-left:3px solid var(--c);padding:6px 10px}
.mf-exs{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:12px;margin:8px 0}
.mf-ex{border:1px solid #ccc;padding:8px 12px}
.mf-eq{margin:0 0 2px;font-size:19px;font-weight:600}
.mf-ex ol{margin:0;padding-left:20px;font-size:16px;line-height:1.55}
@media (max-width:700px){.mf{padding:14px 4px}.mf-br{--g:4px}.mf-n{padding:5px 3px;border-radius:9px}.mf-n b{font-size:12.5px}.mf-col .mf-n span{display:none}.mf-l{padding:2px 4px}.mf-l b{font-size:12.5px}.mf-l span{display:none}.mf-s,.mf-q{font-size:15px}.mf-br[style*="--n:5"] .mf-n b,.mf-br[style*="--n:5"] .mf-l b{font-size:11px}.mf-n b{overflow-wrap:break-word;hyphens:auto}}
.pr-tp,.pr-md{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:0 0 10px}
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
.op-c{border:1.5px solid #111;border-radius:12px;padding:12px 14px;margin:12px 0;background:#fff}.op-p{border-top:1px dashed #ccc;padding:8px 0 4px}.op-p p{margin:4px 0}
.op-row{display:flex;flex-wrap:wrap;gap:6px;align-items:center}.op-row input{flex:1 1 200px;font:18px 'EB Garamond',Georgia,serif;padding:6px 10px;border:1.5px solid #bbb;border-radius:8px}
.op-row button{font:15px 'EB Garamond',Georgia,serif;border:1.5px solid #111;background:#fff;color:#111;border-radius:999px;padding:5px 12px;cursor:pointer}
.op-p.ok input{border-color:#1a7f37;background:#e8f6ec}.op-p.bad input{border-color:#c5221f;background:#fdecea}.op-m{font-size:15px;min-height:4px}.op-p.ok .op-m{color:#1a7f37}.op-p.bad .op-m{color:#c5221f}
.op-s{background:#f7f7f2;border-radius:8px;padding:4px 10px;margin-top:4px}.op-sc{margin-left:10px;font-size:15px}
.clr{clear:both}
.zq-in input{font:18px 'EB Garamond',Georgia,serif;padding:7px 10px;border:1.5px solid #bbb;border-radius:8px;width:min(320px,100%)}.zq-in input.ok{border-color:#1a7f37;background:#e8f6ec}.zq-in input.bad{border-color:#c5221f;background:#fdecea}
.fc-p{font-size:15px;color:#555;margin:8px 0 6px}
.fc-card{position:relative;min-height:190px;border:2px solid #b8860b;border-radius:16px;background:#fffdf5;padding:30px 18px 34px;box-shadow:0 6px 18px rgba(60,40,0,.10);cursor:pointer;font-size:19px;line-height:1.45;text-align:center;display:flex;flex-direction:column;justify-content:center;gap:10px;user-select:none}
.fc-card.flip{background:#fff;border-color:#137333;text-align:left}.fc-card.flip .fc-f{color:#666;font-size:16px;border-bottom:1px dashed #ccc;padding-bottom:8px}
.fc-k{position:absolute;top:8px;left:14px;font-size:12.5px;letter-spacing:.12em;text-transform:uppercase;color:#b8860b}
.fc-tip{position:absolute;bottom:8px;right:14px;font-size:13px;color:#999;font-style:italic}
.fc-ask{font-size:15px;color:#777;font-style:italic}.fc-a{font-weight:700;font-size:20px;margin:0 0 4px}.fc-b ul{margin:4px 0;padding-left:22px}
.fc-btns{display:flex;gap:8px;justify-content:center;margin:12px 0 4px;flex-wrap:wrap}.fc-btns button{font:16px 'EB Garamond',Georgia,serif;border:1.5px solid #111;background:#fff;border-radius:999px;padding:7px 16px;cursor:pointer}
.fc-btns [data-fk]{background:#137333;border-color:#137333;color:#fff}.fc-btns [data-fa]{background:#fff4e5;border-color:#c2571a}
details.a2d{border:1.5px solid #cfd8e3;border-left:5px solid #0f7a6c;border-radius:10px;margin:10px 0;background:#fff}
details.a2d>summary{cursor:pointer;padding:10px 14px;font-size:18px;list-style:none;display:flex;flex-wrap:wrap;gap:4px 12px;align-items:baseline}details.a2d>summary::before{content:"▸";color:#0f7a6c}details.a2d[open]>summary::before{content:"▾"}
details.a2d>summary span{font-size:14px;color:#666;font-style:italic}.a2b{padding:4px 14px 14px;overflow-x:auto}.a2b img{display:block;max-width:100%;height:auto;margin:6px auto;border:1px solid #ddd}
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
@media (max-width:640px){.pr-new{margin-left:0}}
.mf-why{margin:0 0 6px;font-size:17px;background:#fff8e6;border-left:3px solid #c28a00;padding:6px 10px}
.mf-tip{margin:6px 0;font-size:16px}
.mf-g{border-radius:12px;background:var(--c);color:#fff;padding:5px 18px;text-align:center;display:flex;flex-direction:column;line-height:1.15}
.mf-g b{font-size:19px}.mf-g span{font-size:13.5px;opacity:.92;font-style:italic}
.mf-gc{padding:0 4px}.mf-gc>.mf-br{--g:8px;column-gap:8px}
@media (max-width:820px){.mf-br.grp{grid-template-columns:1fr!important}.mf-br.grp::before,.mf-br.grp::after{display:none}.mf-br.grp>.mf-gc>.mf-fill{display:none}.mf-br.grp>.mf-gc+.mf-gc{margin-top:18px}}
@media (max-width:700px){.mf-n b{-webkit-hyphens:auto;hyphens:auto;overflow-wrap:normal}.mf-br[style*="--n:5"] .mf-n b,.mf-br[style*="--n:5"] .mf-l b{font-size:10.5px}}
.ksheet{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,330px),1fr));gap:12px}
.ks{border:1.5px solid #111;border-top:5px solid var(--c,#1d4e89);background:#fff;padding:10px 14px}
.ks h4{margin:0 0 6px;font-size:19px;color:var(--c,#1d4e89)}.ks ul{margin:0;padding-left:20px;font-size:16.5px;line-height:1.65}
.ks .ex{margin:6px 0 0;font-size:15.5px;background:#f6f8fb;padding:6px 10px;border-left:3px solid var(--c,#1d4e89)}
.frc{display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;font-size:.9em;line-height:1.2;margin:0 .15em}.frc span+span{border-top:1.3px solid currentColor}
`;
const st=document.createElement('style'); st.textContent=CSS+`.ps-sheet{border:1.5px solid #111;padding:14px 16px;background:#fff;margin-top:8px}.ps-t{display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;margin:0 0 8px;font-size:19px}.ps-t span{font-weight:400;font-size:16px}.ps-ol{padding-left:1.5em;margin:0}.ps-ol>li{margin:10px 0;padding-bottom:8px;border-bottom:1px dashed #ccd}.ps-k{display:inline-block;font-size:12.5px;letter-spacing:.08em;text-transform:uppercase;color:#1f4fd1;margin-right:4px}.ps-a{background:#f6f8fb;border-left:4px solid #0f7a6c;padding:6px 10px;margin-top:6px}.ps-a ol{margin:4px 0 0;padding-left:1.2em}
.pst-bar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:6px 0 10px}.pst-tip{font-size:14.5px;color:#666;font-style:italic}.pst{border:2px solid #111;padding:12px;background:#fff}.pst-h{display:flex;flex-direction:column;align-items:center;border-bottom:3px double #111;padding-bottom:8px;margin-bottom:10px}.pst-h span{font-size:13px;letter-spacing:.25em;text-transform:uppercase;color:var(--c)}.pst-h b{font-size:28px;color:var(--c)}.pst-flow{border:1.5px solid #dbe2ec;border-radius:12px;padding:8px 12px;margin-bottom:10px;background:#fbfcfe}.pst-flow h5{margin:0 0 4px;font-size:16px;letter-spacing:.06em;text-transform:uppercase}.pst-flow ul{margin:0;padding-left:1.2em}.pst-flow li{margin:2px 0}
@media print{body.printing *{visibility:hidden!important}body.printing .print-me,body.printing .print-me *{visibility:visible!important}body.printing .print-me{position:absolute;left:0;top:0;width:100%}body.printing details{display:block}}.rl{display:flex;flex-direction:column;gap:10px;margin:10px 0}.rl-c{border:1.5px solid #d6cfc0;border-left:6px solid #7a5a12;border-radius:10px;padding:10px 12px;background:#fff}.rl-h{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:baseline}.rl-h b{font-size:18px}.rl-t{margin:3px 0 6px}.rl-us{font-size:14px;color:#555;white-space:nowrap}.rl-u{display:inline-block;min-width:1.5em;text-align:center;border:1px solid #bbb;border-radius:6px;margin-left:3px;padding:0 3px;font-size:13px}.rl-u.on{background:#7a5a12;color:#fff;border-color:#7a5a12}.rl-ln{display:flex;flex-wrap:wrap;gap:6px}.rl-b{font-size:14.5px;font-weight:600;color:#1d4e89;border:1.5px solid #1d4e89;border-radius:999px;padding:2px 11px;text-decoration:none;background:#fff}.rl-y{border:1.5px solid #d6cfc0;border-radius:10px;padding:8px 12px;background:#fff}.rl-y summary{cursor:pointer;font-size:17px}.rl-y .rl-ln{margin:8px 0}.rl-ol{margin:4px 0 4px;padding-left:1.2em}.rl-ol li{margin:4px 0;display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px}.rl-note{font-size:14.5px;color:#555;font-style:italic}.fq{border:1.5px solid #111;border-top:6px solid #c23a52;padding:14px 16px;margin:14px 0;background:#fff}.fq-k{font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#c23a52;font-weight:700;margin-bottom:8px}.fq-stem{margin:0 0 6px}.fq-parts{padding-left:1.4em;margin:0}.fq-parts>li{margin:10px 0;padding-top:8px;border-top:1px dashed #ccd}.fq-q{margin:0 0 6px}.fq-pt{display:inline-block;font-size:13px;border:1px solid #c23a52;color:#c23a52;border-radius:999px;padding:0 8px;margin-left:4px;white-space:nowrap}.fq-sh,.fq-all{font:inherit;font-size:15px;font-weight:600;border:1.5px solid #111;background:#fff;border-radius:999px;padding:3px 12px;cursor:pointer}.fq-all{margin-left:4px}.fq-sol{background:#f6f8fb;border-left:4px solid #0f7a6c;padding:8px 12px;margin-top:8px}.fq-sol ol{margin:0;padding-left:1.3em}.fq-tb{border-collapse:collapse;margin:6px 0;font-size:16px}.fq-tb td,.fq-tb th{border:1px solid #999;padding:3px 9px;text-align:center}`; document.head.appendChild(st);

/* ===================== course shell ===================== */
let ZC, U; const G={};
function initData(){ ZC=window.ZC; U=ZC.units; U.forEach(u=>{ G[u.id]={sat:u.gen||[],med:[...(u.med||[]),...(u.chal||[])],adv:u.adv||[],chal:(u.adv&&u.adv.length)?u.adv:(u.chal||[])}; }); }
const LVL=[["sat","Easy"],["med","Medium"],["adv","Advanced"]];
const LEAD={sat:"Easy: one-skill problems for this unit. New every time, with full solutions.",med:"Medium: two-step problems that combine ideas. New every time, with full solutions.",adv:"Advanced: multi-step, exam-level problems. New every time, with full solutions.",chal:"Harder, multi-step problems for advanced learners. New every time, with full solutions."};
const NOTYPE={};
const esc2=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function exHTML(u,tp,kind="sat"){ const L=(G[u][kind]).filter(g=>!tp||g._t===tp); const out=[], seen=new Set(); let k=0;
  while(out.length<Math.min(6,L.length*2)&&k++<80){ const p=gen(L[out.length%L.length]); if(!p||seen.has(p.q)) continue; seen.add(p.q); out.push(p); }
  return out.map((p,i)=>`<article class="zx-card"><div class="zx-k">${p.t}</div><p class="zx-q"><b>Example ${i+1}.</b> ${p.q}</p><ol class="zx-st">${p.s.map(x=>`<li>${x}</li>`).join("")}</ol>${gph(p)}<p class="zx-a">Answer: ${p.a}</p><div class="clr"></div></article>`).join(""); }
const zxTp=(u,kind)=>`<span class="gl">Topic</span>${["All",...topicsOf(u,kind)].map((t,i)=>`<button type="button" data-zt="${i?esc2(t):""}"${i?"":' class="on"'}>${t}</button>`).join("")}`;
function exBox(u){ return `<div class="zx" data-zx="${u}">${lvlRow(u,"sat","data-zl")}<p class="lead2">Step-by-step solved examples, new every time. Pick a level and a topic, or see them all.</p>
  <div class="pr-tp"><span class="zx-tps">${zxTp(u,"sat")}</span><button type="button" class="pr-new" data-zn>↻ New examples</button></div><div class="zx-o"></div></div>`; }
function bindEx(root){ root.querySelectorAll(".zx").forEach(b=>{ if(b.dataset.bound) return; b.dataset.bound=1; const u=b.dataset.zx, o=b.querySelector(".zx-o"); let tp="", kind="sat";
  const r=()=>{ o.innerHTML=exHTML(u,tp,kind); }; const bt=()=>b.querySelectorAll("[data-zt]").forEach(x=>x.onclick=()=>{ tp=x.dataset.zt; b.querySelectorAll("[data-zt]").forEach(y=>y.classList.toggle("on",y===x)); r(); }); bt();
  b.querySelectorAll("[data-zl]").forEach(x=>x.onclick=()=>{ kind=x.dataset.zl; tp=""; b.querySelectorAll("[data-zl]").forEach(y=>y.classList.toggle("on",y===x)); b.querySelector(".zx-tps").innerHTML=zxTp(u,kind); bt(); r(); }); b.querySelector("[data-zn]").onclick=r; r(); }); }
/* ---------- FRQs: multi-part, AP style, new numbers every time ---------- */
function frqGen(u,tp){ const L=(U.find(x=>x.id===u).frq||[]).filter(g=>!tp||g._t===tp); const out=[], seen=new Set(); let k=0;
  while(out.length<Math.min(2,L.length)&&k++<60){ let p=null; try{ p=L[(out.length+Math.floor(Math.random()*L.length))%L.length](); }catch(e){} if(!p||seen.has(p.t)) continue; seen.add(p.t); out.push(p); } return out; }
function frqCard(p,i){ const pts=p.parts.reduce((s,x)=>s+(x[3]||1),0);
  return `<article class="fq"><div class="fq-k">FRQ ${i+1} · ${p.t} · ${p.calc?"Calculator allowed":"No calculator"} · ${pts} points</div><div class="fq-stem">${p.stem}</div>
  <ol class="fq-parts" type="a">${p.parts.map(([q,s,a,pt])=>`<li><p class="fq-q">${q} <span class="fq-pt">${pt||1} pt${(pt||1)>1?"s":""}</span></p><button type="button" class="fq-sh">Show solution &amp; scoring</button><div class="fq-sol" hidden><ol>${s.map(x=>`<li>${x}</li>`).join("")}</ol>${a?`<p class="zx-a">Answer: ${a}</p>`:""}</div></li>`).join("")}</ol></article>`; }
function frqBox(u){ const L=U.find(x=>x.id===u).frq||[]; L.forEach(g=>{ if(g._t===undefined){ try{ g._t=g().t; }catch(e){ g._t=""; } } }); const tps=[...new Set(L.map(g=>g._t))];
  return `<div class="fqb" data-fq="${u}"><p class="lead2">${ZC.frqLead||"Free-response questions in AP format."} Work each part on paper first, then open the solution and score yourself. New numbers every time.</p>
  <div class="pr-tp"><span class="gl">Topic</span>${["All",...tps].map((t,i)=>`<button type="button" data-ft="${i?esc2(t):""}"${i?"":' class="on"'}>${t}</button>`).join("")}<button type="button" class="pr-new" data-fn>↻ New FRQs</button><button type="button" class="fq-all" data-fa>Show all solutions</button></div><div class="fq-o"></div></div>`; }
function bindFrq(root){ root.querySelectorAll(".fqb").forEach(b=>{ if(b.dataset.bound) return; b.dataset.bound=1; const u=b.dataset.fq, o=b.querySelector(".fq-o"); let tp="";
  const r=()=>{ o.innerHTML=frqGen(u,tp).map(frqCard).join(""); o.querySelectorAll(".fq-sh").forEach(x=>x.onclick=()=>{ const d=x.nextElementSibling; d.hidden=!d.hidden; x.textContent=d.hidden?"Show solution & scoring":"Hide solution"; }); };
  b.querySelectorAll("[data-ft]").forEach(x=>x.onclick=()=>{ tp=x.dataset.ft; b.querySelectorAll("[data-ft]").forEach(y=>y.classList.toggle("on",y===x)); r(); });
  b.querySelector("[data-fn]").onclick=r; b.querySelector("[data-fa]").onclick=()=>o.querySelectorAll(".fq-sh").forEach(x=>{ if(x.nextElementSibling.hidden) x.click(); }); r(); }); }
/* ---------- Released (official) FRQs sorted by unit ---------- */
const yKey=y=>(parseInt(y)*2+(/B$/.test(y)?0:1));
function relList(u){ const R=window.ZREL, k=ZC&&ZC.relKey; if(!R||!k||!R[k]) return []; if(u.relAll) return R[k].slice(); return R[k].filter(x=>x.u.includes(u.num)); }
const exLabel=y=>/B$/.test(y)?`${y.slice(0,-1)} Form B`:y;
function relLinks(y,q){ const L=(window.ZREL.links[ZC.relKey]||{})[y]||{}; return Object.entries(L).filter(([t])=>!q||!/^Q\d/.test(t)||t.startsWith("Q"+q+" ")).map(([t,h])=>`<a class="rl-b" href="${h}" target="_blank" rel="noopener">${t}</a>`).join(""); }
function relHTML(u){ const list=relList(u).sort((a,b)=>yKey(b.y)-yKey(a.y)||a.q-b.q); const k=ZC.relKey.toUpperCase();
  const uu=x=>x.u.map(n=>`<span class="rl-u${n===u.num?" on":""}">${n}</span>`).join("");
  let body;
  if(u.relAll){ const ys=[...new Set(list.map(x=>x.y))]; body=ys.map(y=>`<details class="rl-y"${ys.indexOf(y)<2?" open":""}><summary><b>${exLabel(y)}</b> · ${ZC.relName||("AP Calculus "+k)} · ${list.filter(x=>x.y===y).length} questions</summary><div class="rl-ln">${relLinks(y)}</div><ol class="rl-ol">${list.filter(x=>x.y===y).map(x=>`<li><span class="rl-t">Q${x.q}. ${x.t}</span><span class="rl-us">Units ${uu(x)}</span></li>`).join("")}</ol></details>`).join(""); }
  else body=list.map(x=>`<div class="rl-c"><div class="rl-h"><b>${exLabel(x.y)} Q${x.q}</b><span class="rl-us">Units ${uu(x)}</span></div><div class="rl-t">${x.t}</div><div class="rl-ln">${relLinks(x.y,x.q)}</div></div>`).join("");
  const nm=ZC.relName||("AP Calculus "+k), yrs=ZC.relYears||"1998–2026";
  return `<p class="lead2">${u.relAll?`Every released ${nm} free-response question (${yrs}), by exam.`:`Every released ${nm} free-response question (${yrs}) that tests this unit: <b>${list.length} questions</b>, newest first.`} Each button opens the official College Board PDF (questions, scoring guidelines, sample student responses), free and with no sign-in. The PDFs hold the whole exam: go to the question number shown.</p>
  <div class="rl">${body}</div><p class="rl-note">Archive: <a href="${window.ZREL.res[ZC.relKey]}" target="_blank" rel="noopener">${ZC.relArchive||("MyMathsCloud AP Calculus "+k+" past papers")}</a>.${ZC.relName?"":" 2020 had no regular free-response questions."} Unit numbers follow the current AP Course and Exam Description${ZC.relName?"":"; older exams can include topics now taught in a different unit"}.</p>`; }
/* ---------- Fixed practice sets (same problems every time: seeded) and printable posters ---------- */
function seeded(seed){ let a=seed>>>0; return ()=>{ a=(a+0x6D2B79F5)>>>0; let t=a; t=Math.imul(t^(t>>>15),t|1); t^=t+Math.imul(t^(t>>>7),t|61); return ((t^(t>>>14))>>>0)/4294967296; }; }
const hash=str=>{ let h=2166136261; for(const c of str){ h^=c.charCodeAt(0); h=Math.imul(h,16777619); } return h>>>0; };
function fixedSet(u,n,size){ const L=u.gen, rnd=seeded(hash((window.ZCID||document.title)+"|"+u.id+"|set"+n)), old=Math.random; const out=[], seen=new Set(); Math.random=rnd;
  try{ let k=0; while(out.length<size&&k++<size*30){ const g=L[(out.length+n)%L.length]; let p=null; try{ p=g(); }catch(e){} if(!p||seen.has(p.q)) continue; seen.add(p.q); out.push(p); } } finally{ Math.random=old; } return out; }
const NSETS=4, SETSZ=10;
function setsBox(u){ return `<div class="ps" data-ps="${u.id}"><p class="lead2">Numbered practice sets that stay the same every time, so the whole class can work the same problems, check answers together, or print them as worksheets. Each set has ${SETSZ} problems from every topic of this unit.</p>
  <div class="pr-tp"><span class="gl">Set</span>${Array.from({length:NSETS},(_,i)=>`<button type="button" data-sn="${i+1}"${i?"":' class="on"'}>Set ${u.num||""}${"ABCD"[i]}</button>`).join("")}</div>
  <div class="pr-tp"><button type="button" class="pr-new" data-sk>Show answer key</button><button type="button" class="fq-all" data-sp>🖨 Print this set</button></div><div class="ps-o"></div></div>`; }
function bindSets(root){ root.querySelectorAll(".ps").forEach(b=>{ if(b.dataset.bound) return; b.dataset.bound=1; const u=U.find(x=>x.id===b.dataset.ps), o=b.querySelector(".ps-o"); let n=1, key=false;
  const r=()=>{ const L=fixedSet(u,n,SETSZ); o.innerHTML=`<div class="ps-sheet"><h4 class="ps-t">${esc2(u.label||("Unit "+u.num))} · Practice Set ${u.num||""}${"ABCD"[n-1]}<span>Name ____________________</span></h4><ol class="ps-ol">${L.map(p=>`<li><span class="ps-k">${p.t}</span> ${p.q}${key?`<div class="ps-a"><b>Answer: ${p.a}</b><ol>${p.s.map(x=>`<li>${x}</li>`).join("")}</ol></div>`:""}</li>`).join("")}</ol></div>`; b.querySelector("[data-sk]").textContent=key?"Hide answer key":"Show answer key"; };
  b.querySelectorAll("[data-sn]").forEach(x=>x.onclick=()=>{ n=+x.dataset.sn; b.querySelectorAll("[data-sn]").forEach(y=>y.classList.toggle("on",y===x)); r(); });
  b.querySelector("[data-sk]").onclick=()=>{ key=!key; r(); };
  b.querySelector("[data-sp]").onclick=()=>printEl(o); r(); }); }
function printEl(el){ el.classList.add("print-me"); document.body.classList.add("printing"); const done=()=>{ el.classList.remove("print-me"); document.body.classList.remove("printing"); window.removeEventListener("afterprint",done); }; window.addEventListener("afterprint",done); setTimeout(()=>window.print(),50); setTimeout(done,60000); }
function posterHTML(u){ const sh=u.sheet||[]; const fl=u.flow? (u.flow.cols||[]).map(c=>Array.isArray(c)?`<li><b>${c[0]}</b>${c[3]&&c[3].length?" → "+c[3].map(k=>u.flow.M[k]?u.flow.M[k].name:"").filter(Boolean).join(", "):""}</li>`:"").join(""):"";
  return `<div class="pst-bar"><button type="button" class="fq-all" data-pp>🖨 Print poster</button><span class="pst-tip">Print or “Save as PDF” for a one-page summary.</span></div>
  <div class="pst"><div class="pst-h" style="--c:${u.c}"><span>${esc2(u.label||("Unit "+u.num))}</span><b>${esc2(u.short)}</b></div>
  ${fl?`<div class="pst-flow"><h5>Which method, when</h5><ul>${fl}</ul></div>`:""}
  <div class="ksheet">${sh.map(x=>ks2(...x)).join("")}</div></div>`; }
function bindPoster(root){ root.querySelectorAll("[data-pp]").forEach(b=>{ b.onclick=()=>printEl(b.closest(".zp").querySelector(".pst")); }); }
const ks2=(c,h,items,ex)=>`<div class="ks" style="--c:${c}"><h4>${h}</h4><ul>${items.map(i=>`<li>${i}</li>`).join("")}</ul>${ex?`<p class="ex">${ex}</p>`:""}</div>`;
const SECS=[["learn","Lesson","learn it from scratch","#a0522d"],["flow","Method flowchart","which method, when","#1d4e89"],["sheet","Key formulas","rules on one page","#c2571a"],["cards","Flashcards","flip and rate yourself","#b8860b"],["ex","Solved examples","step by step, new each time","#2a7a46"],["prac","Practice","MCQ · deck · type","#0f7a6c"],["pe","Easy practice","start here","#2a7a46"],["quiz","Checkpoint quiz","mixed review, graded","#8a3b12"],["pm","Medium practice","two-step problems","#c2571a"],["pa","Advanced practice","exam level","#6a3d9a"],["open","Open response","type the answers, multi-part","#8b1a1a"],["sets","Practice sets","fixed, printable","#1f4fd1"],["a2","Algebra 2 folder","methods, labs, pages","#0f7a6c"],["chal","Challenge Lab","hardest, new each time","#6a3d9a"],["frq","FRQs","AP-style, with scoring","#c23a52"],["rel","Released FRQs","official, by unit","#7a5a12"],["test","Unit test","end of unit, graded","#111"]];
function arcPos(N){ const W=360,H=660,rx=.355,ry=.445,M=1440,P=[],L=[0]; for(let i=0;i<=M;i++){ const t=-Math.PI/2+2*Math.PI*i/M; P.push([W*rx*Math.cos(t),H*ry*Math.sin(t),t]); if(i) L.push(L[i-1]+Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1])); }
  const T=L[M], out=[]; let j=0; for(let k=0;k<N;k++){ const want=T*k/N; while(L[j]<want) j++; const t=P[j][2]; out.push([50+100*rx*Math.cos(t),50+100*ry*Math.sin(t)]); } return out; }
function unitHTML(u){ const LF=!!ZC.levelFolders, LK={pe:"sat",pm:"med",pa:"adv"}; const secs=SECS.filter(s=>LF?(s[0]!=="prac"&&(!LK[s[0]]||(G[u.id][LK[s[0]]]&&G[u.id][LK[s[0]]].length))):!LK[s[0]]).filter(s=>!["quiz","test"].includes(s[0])||(ZC.tests&&u.gen&&u.gen.length&&(s[0]==="test"||U.indexOf(u)>0))).filter(s=>s[0]!=="learn"||u.learn).filter(s=>s[0]!=="flow"||u.flow).filter(s=>s[0]!=="chal"||(u.chal&&u.chal.length)).filter(s=>s[0]!=="frq"||(u.frq&&u.frq.length)).filter(s=>s[0]!=="rel"||relList(u).length).filter(s=>!["ex","prac","sets"].includes(s[0])||(u.gen&&u.gen.length)).filter(s=>s[0]!=="sheet"||(u.sheet&&u.sheet.length)).filter(s=>s[0]!=="cards"||(ZC.cards&&((u.sheet&&u.sheet.length)||(u.gen&&u.gen.length)))).filter(s=>s[0]!=="a2"||(u.a2&&u.a2.length)).filter(s=>s[0]!=="open"||(u.open&&u.open.length));
  if(u.secLabel) secs.forEach((x,i)=>{ const o=u.secLabel[x[0]]; if(o) secs[i]=[x[0],o[0],o[1],x[3]]; });
  const N=secs.length, BIG=N>10, pos=BIG?arcPos(N):secs.map((_,i)=>{ const a=-Math.PI/2+2*Math.PI*i/N; return [50+38*Math.cos(a),50+35*Math.sin(a)]; });
  const body=k=>k==="open"?openHTML(u):k==="cards"?fcHTML(u):k==="a2"?a2HTML(u):k==="quiz"||k==="test"?zqHTML(u,k):k==="learn"?`<div class="zl">${u.learn}</div>`:k==="flow"?flowHTML("f-"+u.id,u.flow):k==="ex"?exBox(u.id):k==="prac"?boxHTML(u.id,"sat"):LK[k]?boxHTML(u.id,LK[k],true):k==="frq"?frqBox(u.id):k==="rel"?relHTML(u):k==="sets"?setsBox(u):k==="sheet"?posterHTML(u):boxHTML(u.id,"chal");
  return `<section class="zu" id="sec-${u.id}" style="--c:${u.c}"><div class="zu-ch">${esc2(u.label||("Unit "+u.num))}</div><h2>${esc2(u.name)}</h2><p class="zu-sub">${esc2(u.sub)}</p>
   <div class="amap"><div class="am-stage${BIG?" am-big":""}"><svg class="am-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${pos.map(([x,y])=>`<line x1="50" y1="50" x2="${x}" y2="${y}"/>`).join("")}${pos.slice(0,-1).map(([x,y],i)=>`<line class="pth" x1="${x}" y1="${y}" x2="${pos[i+1][0]}" y2="${pos[i+1][1]}"/>`).join("")}</svg>
    <div class="am-hub"><b>${esc2(u.short)}</b><span>Tap a node</span></div>
    ${secs.map((s,i)=>`<button type="button" class="am-node" data-ak="${s[0]}" style="left:${pos[i][0]}%;top:${pos[i][1]}%;--k:${s[3]}"><span class="am-n">${i+1}</span><span class="am-t">${s[1]}</span><span class="am-d">${s[2]}</span></button>`).join("")}</div></div>
   ${secs.map((s,i)=>`<div class="zp" data-p="${s[0]}"${i?" hidden":""}><h3 class="zp-h"><span>${i+1}</span>${s[1]}</h3>${body(s[0])}</div>`).join("")}
   <div class="zu-nav">${prevNext(u)}</div></section>`; }
/* ---- graded checkpoint quiz and unit test ---- */
function zqSet(u,k){ const i=U.indexOf(u), pick1=(L,n)=>{ const out=[],seen=new Set(); let t=0; while(out.length<n&&t++<n*20&&L.length){ const g=L[Math.floor(Math.random()*L.length)]; const p=gen(g); if(p&&!seen.has(p.q)){ seen.add(p.q); out.push(p); } } return out; };
  const tag=(ps,lab)=>ps.map(p=>Object.assign(p,{_u:lab}));
  if(k==="quiz"){ const prev=U.slice(0,i).filter(x=>x.gen&&x.gen.length&&x.id!=="exams"); const old=[]; for(let j=0;j<5&&prev.length;j++){ const x=prev[Math.floor(Math.random()*prev.length)]; old.push(...tag(pick1((G[x.id].sat).concat(G[x.id].med||[]),1),x.label||("Unit "+x.num))); }
    const cur=tag(pick1(G[u.id].sat.concat(G[u.id].med||[]),3),"This unit"); return shuffleA(cur.concat(old)); }
  if(u.mock&&k==="test"){ const all=U.filter(x=>x.gen&&x.gen.length&&x.id!=="review"); const out=[]; let t=0; while(out.length<u.mock&&t++<u.mock*6){ const x=all[out.length%all.length]; const L=pick1(G[x.id].sat.concat(G[x.id].med||[],G[x.id].adv||[]),1); if(L.length&&!out.some(p=>p.q===L[0].q)) out.push(...tag(L,x.label||("Unit "+x.num))); } return shuffleA(out); }
  if(u.id==="review") return tag(pick1(G[u.id].sat,5).concat(pick1(G[u.id].med,6),pick1(G[u.id].adv,4)),"Final");
  return tag(pick1(G[u.id].sat,3),"Easy").concat(tag(pick1(G[u.id].med||[],4),"Medium"),tag(pick1(G[u.id].adv||[],3),"Advanced")); }
function shuffleA(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function zqHTML(u,k){ return `<div class="zq" data-zq="${u.id}|${k}"><p class="lead2">${k==="quiz"?"A short checkpoint in the middle of the unit: questions from <b>earlier units</b> mixed with this one, so nothing is forgotten. Answer them all, then tap <b>Check my quiz</b>.":(u.mock?`A practice EOC: ${u.mock} questions from every unit of the course, mixed like the real test. Some are multiple choice, some you type. Answer them all, then tap <b>Check my test</b>.`:u.id==="review"?"The final exam: 15 questions from the whole course, easy to advanced.":"The end-of-unit test: 10 questions (3 easy, 4 medium, 3 advanced). Answer them all, then tap <b>Check my test</b>.")}</p><div class="zq-o"></div></div>`; }
function bindZq(root){ root.querySelectorAll(".zq").forEach(box=>{ if(box.dataset.b) return; box.dataset.b=1; const [uid,k]=box.dataset.zq.split("|"), u=U.find(x=>x.id===uid), out=box.querySelector(".zq-o");
  const render=()=>{ const ps=zqSet(u,k); const ans={};
    let nt=0; ps.forEach(p=>{ p._ty=typeof p.v==="number"&&isFinite(p.v)&&!p.mc&&(u.mock||nt++%2===0); });
    out.innerHTML=ps.map((p,i)=>{ const o=p._ty?[]:options(p); return `<div class="pr-q zq-q" data-i="${i}"><div class="pr-tg">${p._u} · ${p.t} · ${p._ty?"type the answer":"choose one"}</div><p class="pr-qt"><span class="n">${i+1}</span><span>${p.q}</span></p>${p._ty?`<div class="pr-in zq-in"><input type="text" inputmode="text" autocomplete="off" aria-label="Your answer to question ${i+1}" placeholder="Type a number (e.g. 12, −3, 5/6, 2.5)"></div>`:`<div class="pr-ch">${o.map((x,j)=>`<button type="button" data-c="${esc(x)}"><b>${"ABCD"[j]}</b> ${x}</button>`).join("")}</div>`}<div class="pr-fb"></div><div class="clr"></div></div>`; }).join("")+`<div class="zq-bar"><span class="zq-cnt">0 of ${ps.length} answered</span><button type="button" class="pr-new zq-go">${k==="quiz"?"Check my quiz":"Check my test"}</button><button type="button" class="pr-new zq-new">↻ New ${k==="quiz"?"quiz":"test"}</button></div><div class="zq-res"></div>`;
    const cnt=()=>{ out.querySelector(".zq-cnt").textContent=`${Object.keys(ans).filter(k=>ans[k]!=="").length} of ${ps.length} answered`; };
    out.querySelectorAll(".zq-q").forEach(q=>{ q.querySelectorAll("[data-c]").forEach(b=>b.onclick=()=>{ if(out.dataset.graded) return; q.querySelectorAll("[data-c]").forEach(x=>x.classList.toggle("on",x===b)); ans[q.dataset.i]=b.dataset.c; cnt(); });
      const inp=q.querySelector(".zq-in input"); if(inp) inp.addEventListener("input",()=>{ if(out.dataset.graded) return; ans[q.dataset.i]=inp.value.trim(); cnt(); }); });
    out.querySelector(".zq-new").onclick=()=>{ delete out.dataset.graded; render(); };
    out.querySelector(".zq-go").onclick=()=>{ if(out.dataset.graded) return; out.dataset.graded=1; let r=0; out.querySelectorAll(".zq-q").forEach(q=>{ const p=ps[+q.dataset.i], a=ans[q.dataset.i]; let ok;
        if(p._ty){ const x=parseAns(a); ok=x!==null&&!isNaN(x)&&Math.abs(x-p.v)<=tolOf(p)+1e-9; const inp=q.querySelector("input"); inp.disabled=true; inp.classList.add(ok?"ok":"bad"); }
        else { ok=a===String(p.a); q.querySelectorAll("[data-c]").forEach(x=>{ if(x.dataset.c===String(p.a)) x.classList.add("ok"); else if(x.dataset.c===a) x.classList.add("bad"); }); }
        if(ok) r++;
        q.querySelector(".pr-fb").innerHTML=`<p class="${ok?"yes":"no"}">${ok?"Correct!":a?"Not quite. The answer is "+p.a+".":"Not answered. The answer is "+p.a+"."}</p>${ok?"":solHtml(p)}`; });
      const pct=Math.round(100*r/ps.length); out.querySelector(".zq-res").innerHTML=`<div class="zq-score"><b>${r} / ${ps.length}</b> (${pct}%) · ${pct>=90?"Excellent! Ready for the next unit.":pct>=70?"Good. Review the ones you missed, then take a new one.":"Go back to the Lesson and Solved examples, then try a new one."}</div>`; out.querySelector(".zq-res").scrollIntoView({behavior:"smooth",block:"center"}); }; };
  render(); }); }
/* ---- open-response (type-in, multi-part) ---- */
function exprFn(src){ let s=String(src||"").toLowerCase().replace(/[−–—]/g,"-").replace(/[×·]/g,"*").replace(/÷/g,"/").replace(/\s+/g,"").replace(/²/g,"^2").replace(/³/g,"^3");
  s=s.replace(/^(y|f\([a-z]\)|[a-z]\([a-z]\)|a_?n|a\([a-z]\))=/,""); if(!s||/[^0-9a-z.+\-*/^()]/.test(s)) return null;
  let i=0; const V=/[a-z]/;
  const peek=()=>s[i], eat=c=>{ if(s[i]===c){ i++; return true; } return false; };
  function num(){ const m=s.slice(i).match(/^\d*\.?\d+/); if(!m) return null; i+=m[0].length; const v=+m[0]; return ()=>v; }
  function atom(){ if(eat("(")){ const e=sum(); if(!eat(")")) throw 0; return e; } const n=num(); if(n) return n; if(V.test(peek()||"")){ i++; return x=>x; } throw 0; }
  function pow(){ const b=atom(); if(eat("^")){ const e=unary(); return x=>Math.pow(b(x),e(x)); } return b; }
  function unary(){ if(eat("-")){ const u=unary(); return x=>-u(x); } if(eat("+")) return unary(); return pow(); }
  function prod(){ let a=unary(); for(;;){ if(eat("*")){ const b=unary(),A=a; a=x=>A(x)*b(x); } else if(eat("/")){ const b=unary(),A=a; a=x=>A(x)/b(x); } else if(peek()==="("||V.test(peek()||"")||/[\d.]/.test(peek()||"")){ const b=pow(),A=a; a=x=>A(x)*b(x); } else return a; } }
  function sum(){ let a=prod(); for(;;){ if(eat("+")){ const b=prod(),A=a; a=x=>A(x)+b(x); } else if(eat("-")){ const b=prod(),A=a; a=x=>A(x)-b(x); } else return a; } }
  try{ const f=sum(); if(i!==s.length) return null; return f; }catch(e){ return null; } }
function opCheck(pt,val){ const v=String(val||"").trim(); if(!v) return null;
  if(pt.k==="num"){ const x=parseAns(v); return x!==null&&!isNaN(x)&&Math.abs(x-pt.v)<=(pt.tol!=null?pt.tol:Math.max(1e-6,Math.abs(pt.v)*1e-6))+1e-9; }
  if(pt.k==="expr"){ const f=exprFn(v); if(!f) return false; return [-2.5,-1,0.5,1.5,3,4.2].every(x=>{ const a=f(x),b=pt.f(x); return isFinite(a)&&Math.abs(a-b)<=1e-6*Math.max(1,Math.abs(b))+(pt.tol||0); }); }
  if(pt.k==="pair"){ const m=v.replace(/[−–—]/g,"-").replace(/\s+/g,"").match(/^\(?(-?\d*\.?\d+(?:\/\d+)?),(-?\d*\.?\d+(?:\/\d+)?)\)?$/); if(!m) return false; const a=parseAns(m[1]),b=parseAns(m[2]); return Math.abs(a-pt.v[0])<1e-6&&Math.abs(b-pt.v[1])<1e-6; }
  if(pt.k==="text"){ const n=t=>String(t).toLowerCase().replace(/[−–—]/g,"-").replace(/≥/g,">=").replace(/≤/g,"<=").replace(/\s+/g,""); return pt.ok.some(o=>n(o)===n(v)); }
  return false; }
window.ZOP={exprFn:s=>exprFn(s),opCheck:(a,b)=>opCheck(a,b)};
const OPHINT={num:"a number: 12, −3, 5/6",expr:"e.g. 3x + 5 or 2(1.05)^x",pair:"e.g. (2, −3)",text:"your answer"};
function openHTML(u){ return `<div class="op" data-op="${u.id}"><p class="lead2">${esc2(u.openLead||"Open-response questions like the ones on the EOC: no answer choices. Type each answer, tap Check, and fix it until it turns green. Use ^ for exponents (x^2) and / for fractions.")}</p><div class="pr-tp"><button type="button" class="pr-new" data-opn>↻ New problems</button><span class="op-sc"></span></div><div class="op-o"></div></div>`; }
function bindOpen(root){ root.querySelectorAll(".op").forEach(box=>{ if(box.dataset.b) return; box.dataset.b=1; const u=U.find(x=>x.id===box.dataset.op), out=box.querySelector(".op-o"), sc=box.querySelector(".op-sc");
  const render=()=>{ const L=shuffleA(u.open.slice()).slice(0,4).map(g=>{ for(let t=0;t<30;t++){ try{ const p=g(); if(p) return p; }catch(e){} } return null; }).filter(Boolean);
    out.innerHTML=L.map((p,i)=>`<article class="op-c"><div class="pr-tg">${p.t}</div><p class="pr-qt"><span class="n">${i+1}</span><span>${p.stem}</span></p>${p.g?gph(p):""}<div class="clr"></div>${p.parts.map((pt,j)=>`<div class="op-p" data-i="${i}" data-j="${j}"><p><b>${"abcdef"[j]})</b> ${pt.q}</p><div class="op-row"><input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Answer to part ${"abcdef"[j]}" placeholder="${OPHINT[pt.k]}"><button type="button" data-opc>Check</button><button type="button" data-ops>Solution</button></div><div class="op-m"></div><div class="op-s" hidden><ol class="pr-st">${(pt.s||[]).map(x=>`<li>${x}</li>`).join("")}</ol><p>Answer: <b>${pt.a}</b></p></div></div>`).join("")}</article>`).join("");
    const tot=L.reduce((s,p)=>s+p.parts.length,0); const upd=()=>{ sc.innerHTML=` <b>${out.querySelectorAll(".op-p.ok").length}</b> of ${tot} parts correct`; }; upd();
    out.querySelectorAll(".op-p").forEach(el=>{ const pt=L[+el.dataset.i].parts[+el.dataset.j], inp=el.querySelector("input"), m=el.querySelector(".op-m");
      const chk=()=>{ const r=opCheck(pt,inp.value); el.classList.toggle("ok",r===true); el.classList.toggle("bad",r===false); m.innerHTML=r===null?"":r?"✓ Correct!":(pt.k==="expr"&&!exprFn(inp.value)?"✗ I can't read that expression. Use x, numbers, + − * / ^ and parentheses.":"✗ Not yet. Check your work and try again."); upd(); };
      el.querySelector("[data-opc]").onclick=chk; inp.addEventListener("keydown",e=>{ if(e.key==="Enter") chk(); });
      el.querySelector("[data-ops]").onclick=()=>{ const s=el.querySelector(".op-s"); s.hidden=!s.hidden; }; }); };
  box.querySelector("[data-opn]").onclick=render; render(); }); }
/* ---- flashcards ---- */
function fcDeck(u,mode){ const rules=(u.cards||[]).map(c=>({f:c[0],b:c[1],k:"Rule"})).concat((u.sheet||[]).map(x=>({f:`<b>${x[1]}</b><br><span class="fc-ask">What are the rules?</span>`,b:`<ul>${x[2].map(i=>`<li>${i}</li>`).join("")}</ul>${x[3]?`<p>${x[3]}</p>`:""}`,k:"Rule"})));
  const probs=[]; if(u.gen&&u.gen.length&&mode!=="rules"){ const L=G[u.id].sat.concat(G[u.id].med||[]), seen=new Set(); let t=0; while(probs.length<10&&t++<120){ const p=gen(L[Math.floor(Math.random()*L.length)]); if(p&&!seen.has(p.q)){ seen.add(p.q); probs.push({f:p.q,b:`<p class="fc-a">${p.a}</p>${solHtml(p)}`,k:p.t}); } } }
  return mode==="rules"?shuffleA(rules):mode==="probs"?probs:shuffleA(rules.concat(probs)); }
function fcHTML(u){ return `<div class="fc" data-fc="${u.id}"><p class="lead2">Read the front, say or write your answer, then tap the card to flip it. Tap <b>✓ I knew it</b> or <b>↻ Again</b> (that card comes back a little later).</p>
 <div class="pr-tp"><span class="gl">Deck</span><button type="button" data-fm="all" class="on">Rules + problems</button><button type="button" data-fm="rules">Rules only</button><button type="button" data-fm="probs">Problems only</button><button type="button" class="pr-new" data-fn>↻ New deck</button></div>
 <div class="fc-p"></div><div class="fc-card" role="button" tabindex="0" aria-label="Flashcard: tap to flip"><div class="fc-k"></div><div class="fc-f"></div><div class="fc-b" hidden></div><span class="fc-tip">Tap to flip</span></div>
 <div class="fc-btns"><button type="button" data-fp aria-label="Previous card">‹</button><button type="button" data-fa>↻ Again</button><button type="button" data-fk>✓ I knew it</button><button type="button" data-fx aria-label="Next card">›</button></div></div>`; }
function bindFc(root){ root.querySelectorAll(".fc").forEach(box=>{ if(box.dataset.b) return; box.dataset.b=1; const u=U.find(x=>x.id===box.dataset.fc); let mode="all", D=[], i=0, known=0, total=0, miss=[];
  const card=box.querySelector(".fc-card"), F=box.querySelector(".fc-f"), B=box.querySelector(".fc-b"), K=box.querySelector(".fc-k"), Pr=box.querySelector(".fc-p"), tip=box.querySelector(".fc-tip");
  const show=()=>{ card.classList.remove("flip"); if(i>=D.length){ K.textContent="Deck done"; F.innerHTML=`<b>${known} of ${total}</b> known on the first try.${miss.length?"<br>Tap <b>↻ Again</b> to practise the "+miss.length+" you missed.":"<br>Excellent! Tap <b>↻ New deck</b> for more."}`; B.hidden=true; tip.hidden=true; Pr.textContent=""; card.dataset.end=1; return; }
    delete card.dataset.end; const c=D[i]; K.textContent=c.k; F.innerHTML=c.f; B.innerHTML=c.b; B.hidden=true; tip.hidden=false; Pr.textContent=`Card ${i+1} of ${D.length} · known ${known}`; };
  const start=L=>{ D=L||fcDeck(u,mode); i=0; known=0; total=D.length; miss=[]; show(); };
  const flip=()=>{ if(card.dataset.end) return; B.hidden=!B.hidden; card.classList.toggle("flip",!B.hidden); tip.hidden=!B.hidden; };
  card.onclick=e=>{ if(e.target.closest("a,button,input")) return; flip(); }; card.onkeydown=e=>{ if(e.key===" "||e.key==="Enter"){ e.preventDefault(); flip(); } };
  box.querySelector("[data-fk]").onclick=()=>{ if(i>=D.length) return; if(!D[i]._again) known++; i++; show(); };
  box.querySelector("[data-fa]").onclick=()=>{ if(i>=D.length){ if(miss.length) start(miss.map(c=>Object.assign({},c,{_again:false}))); return; } const c=D[i]; if(!c._again){ c._again=true; miss.push(c); } D.splice(i,1); D.splice(Math.min(D.length,i+3),0,c); show(); };
  box.querySelector("[data-fx]").onclick=()=>{ if(i<D.length){ i++; show(); } }; box.querySelector("[data-fp]").onclick=()=>{ if(i>0){ i--; show(); } };
  box.querySelector("[data-fn]").onclick=()=>start();
  box.querySelectorAll("[data-fm]").forEach(b=>b.onclick=()=>{ mode=b.dataset.fm; box.querySelectorAll("[data-fm]").forEach(x=>x.classList.toggle("on",x===b)); start(); });
  start(); }); }
/* ---- folders copied from the Algebra 2 book ---- */
function a2HTML(u){ return `<p class="lead2">${esc2(u.a2lead||"The same methods, labs and lesson pages as in the Algebra 2 book. Tap a folder to open it.")}</p>${u.a2.map((x,i)=>`<details class="a2d"${i?"":" open"}><summary><b>${x.t}</b>${x.d?`<span>${x.d}</span>`:""}</summary><div class="a2b">${typeof x.h==="function"?x.h():x.h}</div></details>`).join("")}`; }
function bindA2(root){ if(window.A2FACT){ A2FACT.bindFlow(root); if(A2FACT.bindSets) A2FACT.bindSets(root); } if(window.A2S3) A2S3.bind(root); }
/* ---- new worked examples inside lessons ---- */
function wePool(uid,wt,numeric){ const G1=G[uid]; if(!G1) return []; topicsOf(uid,"sat"); if(G1.med&&G1.med.length) topicsOf(uid,"med"); const W=wt.split("|"); return G1.sat.concat(G1.med||[]).filter(g=>W.includes(g._t)); }
function bindWe(root){ const uid=(root.querySelector(".zu")||{id:""}).id.replace("sec-","");
  root.querySelectorAll(".we[data-wt]").forEach(w=>{ if(w.dataset.b) return; w.dataset.b=1; const pool=wePool(uid,w.dataset.wt); if(!pool.length) return; const b=document.createElement("button"); b.type="button"; b.className="we-new"; b.textContent="↻ New example"; w.appendChild(b);
    b.onclick=()=>{ const p=gen(pool[Math.floor(Math.random()*pool.length)]); if(!p) return; w.querySelector("b.q").innerHTML=p.q; const st=(p.s||[]).slice(); const last=st.length?String(st[st.length-1]):""; if(!/<b>/.test(last)) st.push(`<b>${p.a}</b>`); w.querySelector("ol").innerHTML=st.map(x=>`<li>${x}</li>`).join(""); const og=w.querySelector("figure.gph"); if(og) og.remove(); const gg=gph(p); if(gg) w.querySelector("ol").insertAdjacentHTML("afterend",gg); }; });
  root.querySelectorAll(".ty[data-wt]").forEach(t=>{ if(t.dataset.nb) return; t.dataset.nb=1; const pool=wePool(uid,t.dataset.wt).filter(g=>{ const p=gen(g); return p&&typeof p.v==="number"&&isFinite(p.v); }); if(!pool.length) return; const b=document.createElement("button"); b.type="button"; b.className="ty-s ty-n"; b.textContent="↻ New"; t.insertBefore(b,t.querySelector(".ty-m"));
    b.onclick=()=>{ const p=gen(pool[Math.floor(Math.random()*pool.length)]); if(!p) return; t.querySelector(".tq").innerHTML=p.q; t.dataset.a=String(p.v); t.dataset.show=p.a; const i=t.querySelector("input"); i.value=""; t.classList.remove("tyok","tyno"); t.querySelector(".ty-m").innerHTML=""; }; }); }
function tyNorm(s){ return String(s||"").toLowerCase().replace(/[−–—]/g,"-").replace(/≥/g,">=").replace(/≤/g,"<=").replace(/\s+/g,"").replace(/^[a-z]=(?=[-\d(√])/,""); }
function tyVal(s){ s=tyNorm(s); if(/^-?\d+(\.\d+)?\/-?\d+(\.\d+)?$/.test(s)){ const [a,b]=s.split("/"); return +a/+b; } return /^-?\d*\.?\d+$/.test(s)?+s:NaN; }
function bindTry(root){ root.querySelectorAll(".ty").forEach(t=>{ if(t.dataset.b) return; t.dataset.b=1; const i=t.querySelector("input"), m=t.querySelector(".ty-m"); const Af=()=>t.dataset.a.split("|");
  const chk=()=>{ const v=i.value.trim(); if(!v){ m.textContent=""; t.classList.remove("tyok","tyno"); return; } const nv=tyVal(v), A=Af(); const ok=A.some(a=>{ const na=tyVal(a); return (!isNaN(na)&&!isNaN(nv)&&Math.abs(na-nv)<1e-9)||tyNorm(a)===tyNorm(v); });
    t.classList.toggle("tyok",ok); t.classList.toggle("tyno",!ok); m.innerHTML=ok?"✓ Correct!":"✗ Not yet. Try again."; };
  t.querySelector(".ty-b").onclick=chk; i.addEventListener("keydown",e=>{ if(e.key==="Enter") chk(); });
  const sh=t.querySelector(".ty-s"); if(sh) sh.onclick=()=>{ m.innerHTML="Answer: <b>"+(t.dataset.show||Af()[0])+"</b>"; }; }); }
function prevNext(u){ const i=U.indexOf(u), p=U[i-1], n=U[i+1]; return `${p?`<button type="button" data-go="${p.id}">‹ ${esc2(p.short)}</button>`:"<span></span>"}${n?`<button type="button" data-go="${n.id}">${esc2(n.short)} ›</button>`:""}`; }
function mapHTML(cur){ const by=Object.fromEntries(U.map(u=>[u.id,u]));
  return `<div class="cm">${ZC.strands.map(([g,c,ids])=>`<div class="cm-s" style="--c:${c}"><div class="cm-h">${esc2(g)}</div>${ids.filter(i=>by[i]).map(id=>{ const u=by[id]; return `<i class="cm-v" aria-hidden="true"></i><button type="button" class="cm-n${id===cur?" on":""}" data-go="${id}" style="--k:${u.c}"><span class="cm-c">${esc2(u.label||("Unit "+u.num))}</span><b>${esc2(u.name.replace(/^Unit \d+:\s*/,""))}</b></button>`; }).join("")}</div>`).join("")}</div>`; }
function topbar(cur){ const u=U.find(x=>x.id===cur), i=U.indexOf(u);
  return `<div class="cm-bar"><button type="button" class="cm-open">☰ Course map</button><span class="cm-cur">${u?esc2((u.label||("Unit "+u.num))+": "+u.name.replace(/^Unit \d+:\s*/,"")):"Pick a unit below"}</span>${u?`<span class="cm-pn">${i>0?`<button type="button" data-go="${U[i-1].id}" aria-label="Previous unit">‹</button>`:""}${i<U.length-1?`<button type="button" data-go="${U[i+1].id}" aria-label="Next unit">›</button>`:""}</span>`:""}</div>`; }
function route(){ const h=location.hash.slice(1), u=U.find(x=>x.id===h); const nav=document.getElementById("znav"), main=document.getElementById("zmain");
  nav.innerHTML=topbar(u?u.id:"");
  if(u){ main.innerHTML=unitHTML(u); } else main.innerHTML=`<section class="zu zhome"><div class="zu-ch">Course map</div><h2>Choose a unit</h2><p class="zu-sub">${esc2(ZC.mapNote||"Units in course order, from top to bottom.")} ${ZC.homeNote||"Every unit has a method flowchart, key formulas, solved examples, practice, a Challenge Lab and FRQs."}</p>${mapHTML("")}</section>`;
  bindFlow(main); bind(main); bindEx(main); bindFrq(main); bindSets(main); bindPoster(main); bindTry(main); bindZq(main); bindWe(main); bindFc(main); bindA2(main); bindOpen(main);
  main.querySelectorAll(".am-node").forEach(n=>n.onclick=()=>{ const sec=n.closest(".zu"); sec.querySelectorAll(".zp").forEach(p=>p.hidden=p.dataset.p!==n.dataset.ak); sec.querySelectorAll(".am-node").forEach(x=>x.classList.toggle("on",x===n)); const p=sec.querySelector(`.zp[data-p="${n.dataset.ak}"]`); setTimeout(()=>p.scrollIntoView({behavior:"smooth",block:"start"}),30); });
  const first=main.querySelector(".am-node"); if(first) first.classList.add("on");
  window.scrollTo(0,0); }
document.addEventListener("click",e=>{ const g=e.target.closest("[data-go]"); if(g){ location.hash=g.dataset.go; closeMap(); return; }
  if(e.target.closest(".cm-open")) openMap(); if(e.target.id==="zcmo"||e.target.closest(".cm-x")) closeMap(); });
function openMap(){ let o=document.getElementById("zcmo"); if(!o){ o=document.createElement("div"); o.id="zcmo"; o.setAttribute("role","dialog"); o.setAttribute("aria-modal","true"); document.body.appendChild(o); }
  o.innerHTML=`<div class="cm-p"><div class="cm-pt"><b>Course map</b><button type="button" class="cm-x">Close ✕</button></div>${mapHTML(location.hash.slice(1))}</div>`; o.classList.add("open"); document.body.style.overflow="hidden"; }
function closeMap(){ const o=document.getElementById("zcmo"); if(o){ o.classList.remove("open"); document.body.style.overflow=""; } }
document.addEventListener("keydown",e=>{ if(e.key==="Escape") closeMap(); });
window.addEventListener("hashchange",route);
const SHCSS=`body{margin:0;font-family:'EB Garamond',Georgia,serif;color:#111;background:#fff;line-height:1.5;font-size:18px}
header{padding:40px 20px 18px;text-align:center}header .wrap{max-width:860px;margin:0 auto;border-top:3px double #111;border-bottom:3px double #111;padding:20px 10px 16px}
.kicker{text-transform:uppercase;letter-spacing:.3em;font-size:13px;margin:0 0 8px}h1{font-weight:800;font-size:clamp(36px,7vw,60px);margin:0 0 6px;line-height:1.05}
header p{margin:0 auto;font-style:italic;color:#333;max-width:640px;font-size:18.5px}
#znav{position:sticky;top:0;z-index:5;background:#fff;border-bottom:1px solid #111;padding:8px 16px}
:root{color-scheme:light}
.cm-bar{display:flex;align-items:center;gap:10px;max-width:1180px;margin:0 auto}
.cm-bar button{border:1.5px solid #111;background:#fff;color:#111;padding:5px 14px;font:600 16px 'EB Garamond',Georgia,serif;cursor:pointer;border-radius:999px}
.cm-open{background:#111!important;color:#fff!important}
.cm-cur{font-weight:700;font-size:18px;flex:1;text-align:center;line-height:1.2;overflow-wrap:anywhere}
.cm-pn{display:flex;gap:6px}.cm-pn button{width:38px;height:38px;border-radius:50%;padding:0;font-size:22px;line-height:1}
main{max-width:1180px;margin:0 auto;padding:22px 16px 60px}
.zu-ch{text-transform:uppercase;letter-spacing:.28em;font-size:12.5px;color:var(--c)}.zu h2{margin:2px 0 4px;font-size:clamp(25px,3.6vw,34px);color:var(--c);line-height:1.15}
.zu-sub{color:#555;font-style:italic;margin:0 0 16px;padding-bottom:12px;border-bottom:1px solid #111}
.zl{font-size:19px;line-height:1.55}.zl h4{font-size:21px;margin:18px 0 6px;color:var(--c)}.zl .big{border-left:5px solid var(--c);background:#f7f7f7;padding:10px 14px;margin:6px 0 12px}
.zl .voc{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,240px),1fr));gap:8px;margin:6px 0 10px}.zl .voc div{border:1.5px solid #ccc;padding:6px 10px;background:#fff}
.zl .we{border:1.5px solid #111;background:#fff;padding:8px 14px;margin:8px 0}.zl .we b.q{display:block;font-size:20px;margin-bottom:4px}.zl .we ol{margin:4px 0 4px 20px;padding:0}
.zl .oops{border:1.5px dashed #c23a52;background:#fdf2f4;padding:8px 14px;margin:8px 0}
.ty{display:flex;flex-wrap:wrap;align-items:center;gap:8px;border:1.5px solid #0f7a6c;background:#effaf7;padding:8px 12px;margin:6px 0}
.ty span.tq{flex:1 1 220px}.ty input{width:120px;font-size:18px;padding:4px 8px;border:1.5px solid #9aa7b8;border-radius:6px}
.ty button{border:1.5px solid #0f7a6c;background:#0f7a6c;color:#fff;padding:4px 12px;font-size:16px;cursor:pointer}.ty button.ty-s{background:#fff;color:#0f7a6c}
.ty.tyok input{border-color:#1a7f37;background:#e8f6ec}.ty.tyno input{border-color:#c5221f;background:#fdecea}.ty .ty-m{min-width:120px;font-weight:600}.ty.tyok .ty-m{color:#137333}.ty.tyno .ty-m{color:#b3261e}
.we{position:relative}.we-new{display:block;margin:6px 0 0;border:1.5px solid #2a7a46;background:#fff;color:#2a7a46;font:600 15px system-ui,sans-serif;padding:4px 12px;cursor:pointer}
.lit-f{display:block;font:700 14px system-ui,sans-serif;color:#6a3d9a;letter-spacing:.02em;margin-bottom:3px}
.zq-q .pr-ch button.on{outline:3px solid #1f4fd1;background:#eef3ff}.zq-bar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:14px 0}.zq-cnt{font-weight:600}
.zq-score{border:2px solid #111;background:#fffbe6;padding:10px 14px;font-size:20px;margin:8px 0}
.zp{margin-top:16px}.zp-h{display:flex;align-items:center;gap:10px;font-size:23px;margin:0 0 10px;padding-bottom:6px;border-bottom:3px double var(--c);color:var(--c)}
.zp-h span{width:32px;height:32px;border-radius:50%;background:var(--c);color:#fff;display:flex;align-items:center;justify-content:center;font-size:16px}
.zu-nav{display:flex;justify-content:space-between;gap:10px;margin-top:24px;padding-top:14px;border-top:3px double #111}
.zu-nav button{border:1.5px solid #111;background:#fff;padding:7px 14px;font:600 16.5px 'EB Garamond',Georgia,serif;cursor:pointer}
.zu-nav button:hover{background:#111;color:#fff}
.lead2{font-style:italic;color:#444;margin:0 0 8px}
.zx-o{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr));gap:12px}
.zx-card{border:1.5px solid #111;background:#fff;padding:10px 14px;box-shadow:4px 4px 0 rgba(0,0,0,.05)}
.zx-k{font-size:12.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--c);font-weight:600}
.zx-q{margin:4px 0 6px;font-size:17.5px}.zx-st{margin:0;padding-left:22px;font-size:16px;line-height:1.65}.zx-a{margin:6px 0 0;font-weight:700;color:#0f7a6c}
.amap{margin:6px 0 8px}
.am-stage.am-big{height:600px}
.am-stage{position:relative;height:430px;border:1.5px solid #d9e0ea;border-radius:18px;background:#fbfcfe radial-gradient(#dde4ee 1.1px,transparent 1.3px) 0 0/22px 22px}
.am-lines{position:absolute;inset:0;width:100%;height:100%}.am-lines line{stroke:#d3dbe6;stroke-width:1.2;vector-effect:non-scaling-stroke}
.am-lines line.pth{stroke:#8ea3c0;stroke-width:2.2;stroke-dasharray:2 7;stroke-linecap:round;animation:amflow 1.6s linear infinite}
@keyframes amflow{to{stroke-dashoffset:-18}}@media (prefers-reduced-motion:reduce){.am-lines line.pth{animation:none}}
.am-hub{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:170px;height:170px;border-radius:50%;background:var(--c);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:14px;box-shadow:0 0 0 12px color-mix(in srgb,var(--c) 10%,transparent),0 14px 30px rgba(15,30,60,.25)}
.am-hub b{font-size:19px;line-height:1.15}.am-hub span{font-size:13px;font-style:italic;opacity:.85;margin-top:6px}
.am-node{position:absolute;transform:translate(-50%,-50%);width:186px;border:1.5px solid #dbe2ec;border-top:5px solid var(--k);border-radius:14px;background:#fff;padding:9px 11px 8px;text-align:left;cursor:pointer;font-family:'EB Garamond',Georgia,serif;box-shadow:0 6px 18px rgba(15,30,60,.08);display:grid;grid-template-columns:auto 1fr;column-gap:8px;align-items:center;transition:transform .15s,box-shadow .15s}
.am-node:hover{transform:translate(-50%,-52%) scale(1.04);box-shadow:0 12px 26px rgba(15,30,60,.16);z-index:2}
.am-node.on{background:var(--k);border-color:var(--k)}
.am-n{grid-row:span 2;width:30px;height:30px;border-radius:50%;background:var(--k);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px}
.am-node.on .am-n{background:#fff;color:var(--k)}.am-t{font-weight:700;font-size:16.5px;line-height:1.15;color:var(--k)}.am-node.on .am-t{color:#fff}
.am-d{font-size:13px;color:#666;line-height:1.2}.am-node.on .am-d{color:#eef}
@media (max-width:820px){.am-stage{height:380px}.am-stage.am-big{height:660px}.am-hub{width:104px;height:104px;padding:8px}.am-hub b{font-size:13.5px}.am-hub span{display:none}
 .am-node{width:92px;padding:5px 4px 6px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:3px;border-top-width:4px}.am-node:hover{transform:translate(-50%,-50%)}
 .am-n{width:26px;height:26px;font-size:13px}.am-t{font-size:12px;-webkit-hyphens:auto;hyphens:auto}.am-d{display:none}}
.cm{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:16px 14px;align-items:start}
.cm-s{display:flex;flex-direction:column;background:#fbfcfe radial-gradient(#dde4ee 1px,transparent 1.2px) 0 0/18px 18px;border:1.5px solid #d9e0ea;border-radius:16px;padding:12px 12px 14px}
.cm-h{align-self:center;background:var(--c);color:#fff;border-radius:999px;padding:4px 16px;font-weight:700;font-size:17px;text-align:center}
.cm-v{display:block;width:2px;height:14px;background:color-mix(in srgb,var(--c) 45%,#c8d2df);align-self:center}
.cm-n{color:#111;border:1.5px solid #dbe2ec;border-left:6px solid var(--k);border-radius:12px;background:#fff;padding:7px 10px;text-align:left;cursor:pointer;display:flex;flex-direction:column;font-family:'EB Garamond',Georgia,serif;box-shadow:0 3px 10px rgba(15,30,60,.07);transition:transform .12s}
.cm-n:hover{transform:translateX(3px)}.cm-n b{font-size:16.5px;line-height:1.15}.cm-c{font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--k)}
.cm-n.on{background:var(--k)}.cm-n.on b,.cm-n.on .cm-c{color:#fff}
#zcmo{position:fixed;inset:0;z-index:40;background:rgba(17,17,17,.45);display:none;align-items:flex-start;justify-content:center;padding:4vh 12px;overflow:auto}#zcmo.open{display:flex}
.cm-p{background:#fff;max-width:1180px;width:100%;border-radius:18px;padding:14px 16px 18px;box-shadow:0 20px 50px rgba(0,0,0,.3)}
.cm-pt{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.cm-pt b{font-size:24px}
.cm-x{color:#111;border:1.5px solid #111;background:#fff;padding:5px 14px;font:600 16px 'EB Garamond',Georgia,serif;cursor:pointer;border-radius:999px}
footer{max-width:860px;margin:0 auto;padding:16px 16px 44px;color:#333;font-size:16px;text-align:center;border-top:3px double #111;font-style:italic}
@media (max-width:640px){.cm{grid-template-columns:1fr}.cm-cur{font-size:14px}}`;
const st3=document.createElement("style"); st3.textContent=SHCSS; document.head.appendChild(st3);
window.ZB={route,_test:{G,gen,options,parseAns,U}};
const start=()=>{ initData(); route(); };
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",start); else setTimeout(start,0);
})();
