/* Method cards: when a method is tapped in any flowchart, its card also gets everything for that method:
   practice by level (Algebra 1: Easy · Medium · Advanced; Algebra 2: Practice · SAT · Challenge), each as
   Problems (show solution) · Multiple choice · Type the answer · Deck, plus step-by-step interactive practice where it exists.
   Problems come from the book's own generators, matched to the method by its name. Shared by Algebra 1 and Algebra 2. */
(function(){
"use strict";
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const STOP=/^(with|from|that|this|then|when|each|into|than|only|both|have|uses|use|find|your|what|which|value|values|always|plug|easy|rule|method|the|and|for)$/;
const tok=s=>new Set(String(s||"").replace(/<[^>]+>/g," ").toLowerCase().split(/[^a-z]+/).filter(w=>w.length>3&&!STOP.test(w)).map(w=>w.replace(/(ies|es|s|ing|ed)$/,"")));
const fmtA=s=>window.A2PRACTICE&&A2PRACTICE.fmt?A2PRACTICE.fmt(String(s)):String(s);
function gen1(g){ for(let i=0;i<25;i++){ try{ const p=g(); if(p&&p.q&&p.a!=null) return p; }catch(e){} } return null; }
/* ---------- sources: each returns [[levelName, [generator → {t,q,a,s,v,w,g,fmt}]]] ---------- */
function topicOf(g){ if(g._t===undefined){ const p=gen1(g); g._t=p?(p.t||p.topic||""):""; } return g._t; }
/* extra topics for methods whose names don't match a topic name (flow key → topic names) */
const EXTRA={form:["Word problems","Number of solutions","Augmented matrix"],graph:["Number of solutions","Graphing"],cls:["Number of solutions","Special cases","Check a solution"],
 el3:["3 × 3 systems","Three variables","Systems in three variables"],gauss:["3 × 3 systems","Three variables"],cr3:["3 × 3 systems","Cramer's rule"],sar:["3 × 3 systems","Determinants"],
 nls:["Nonlinear","Line and parabola","Line–parabola systems","Line–circle systems"],nle:["Nonlinear","Line–circle systems"],p2:["Parameters","Special cases"],p3:["Parameters","3 × 3 systems"]};
function matchGens(list,name,hint,key){ const T=tok(name), H=tok(hint), X=EXTRA[key]||[]; const sc=list.map(g=>{ const tp=topicOf(g); if(X.includes(tp)) return 9; const t=tok(tp); let n=0; t.forEach(w=>{ if(T.has(w)) n+=2; else if(H.has(w)) n++; }); return n; });
  const best=Math.max(0,...sc); return best>0?list.filter((g,i)=>sc[i]===best||(best===9&&sc[i]>=2)):[]; }
function levelsAlg1(uid,m){ const U=window.ZC&&ZC.units.find(u=>u.id===uid); if(!U) return [];
  return [["Easy",U.gen||[]],["Medium",[...(U.med||[]),...(U.chal||[])]],["Advanced",U.adv||[]]].map(([n,L])=>[n,m.all?L:matchGens(L,m.name,m.hint,m.key)]).filter(x=>x[1].length); }
function levelsAlg2(sec,m){ const out=[];
  if(window.A2UP&&A2UP.has(sec)){ const ents=A2UP._test.entries(sec).map(([name,fn])=>{ const f=()=>{ const r=fn(); if(!r) return null; const c=A2UP._test.conv(Object.assign({topic:name},r)); return {t:name,q:c.q,a:c.a,s:c.s,g:c.g,fmt:true}; }; f._t=name; return f; }); const L=m.all?ents:matchGens(ents,m.name,m.hint,m.key); if(L.length) out.push(["Practice",L]); }
  const G=window.A2PRO&&A2PRO._test.G[sec]; if(G){ const s=m.all?(G.sat||[]):matchGens(G.sat||[],m.name,m.hint,m.key), c=m.all?(G.chal||[]):matchGens(G.chal||[],m.name,m.hint,m.key); if(s.length) out.push(["SAT",s]); if(c.length) out.push(["Challenge",c]); }
  return out; }
/* ---------- panel ---------- */
const PANELS=new WeakMap();
function norm(p){ if(!p) return null; const num=typeof p.v==="number"&&isFinite(p.v); return {t:p.t||p.topic||"",q:p.q,a:String(p.a),s:p.s||[],v:num?p.v:undefined,w:p.w||[],g:p.g,fmt:!!p.fmt,mc:!!p.mc,tol:p.tol}; }
const F=(p,x)=>p.fmt?fmtA(x):x;
function opts(p){ const seen=new Set([p.a]), o=[p.a]; for(const w of p.w){ const s=String(w); if(!seen.has(s)&&s!=="NaN"){ seen.add(s); o.push(s); } if(o.length===4) break; } return o.length>1?shuffle(o):null; }
const sol=p=>`<ol class="mc-st">${p.s.map(x=>`<li>${F(p,x)}</li>`).join("")}</ol>${p.g&&window.A2PLOT?A2PLOT.plot(p.g):""}<div style="clear:both"></div>`;
function parseNum(s){ s=String(s||"").trim().replace(/[−–]/g,"-").replace(/\s+/g,"").replace(/^[a-z]=/i,""); if(!s) return null; const m=s.match(/^(-?\d*\.?\d+)\/(-?\d*\.?\d+)$/); if(m) return +m[1]/+m[2]; return /^-?\d*\.?\d+$/.test(s)?+s:NaN; }
function build(levels,lab){ const tabs=[...levels.map(l=>l[0]),...(lab?["Interactive"]:[])];
  return `<div class="mc"><div class="mc-row mc-lv">${tabs.map((t,i)=>`<button type="button" data-mcl="${i}"${i?"":' class="on"'}>${t}</button>`).join("")}</div>
   <div class="mc-row mc-md">${[["prob","📝 Problems"],["mcq","Multiple choice"],["type","Type the answer"],["deck","🃏 Deck"]].map(([k,t],i)=>`<button type="button" data-mcm="${k}"${i?"":' class="on"'}>${t}</button>`).join("")}<button type="button" class="mc-new" data-mcn>↻ New</button></div>
   <div class="mc-o"></div>${lab?`<div class="mc-lab" hidden>${lab}</div>`:""}</div>`; }
function setOf(gens,n){ const out=[], seen=new Set(); for(let i=0;out.length<n&&i<n*10;i++){ const p=norm(gen1(gens[i%gens.length])); if(!p||seen.has(p.q)) continue; seen.add(p.q); out.push(p); } return out; }
function render(box){ const S=PANELS.get(box); if(!S) return; const out=box.querySelector(".mc-o"), lab=box.querySelector(".mc-lab"), md=box.querySelector(".mc-md");
  const isLab=S.lv>=S.levels.length; out.hidden=isLab; md.hidden=isLab; if(lab) lab.hidden=!isLab; if(isLab) return;
  const gens=S.levels[S.lv][1];
  if(S.mode==="prob"){ const ps=setOf(gens,4); out.innerHTML=ps.map((p,i)=>`<div class="mc-q"><p><b>${i+1}.</b> ${F(p,p.q)}</p><details><summary>Show solution</summary><p class="mc-a">Answer: <b>${F(p,p.a)}</b></p>${sol(p)}</details></div>`).join(""); }
  else if(S.mode==="mcq"){ const ps=setOf(gens,8).filter(p=>opts(p)).slice(0,4); if(!ps.length){ out.innerHTML=`<p class="mc-note">These problems have no answer choices. Try <b>Problems</b> or <b>Deck</b>.</p>`; return; }
    out.innerHTML=ps.map((p,i)=>`<div class="mc-q" data-i="${i}"><p><b>${i+1}.</b> ${F(p,p.q)}</p><div class="mc-ch">${opts(p).map(o=>`<button type="button" data-o="${o.replace(/"/g,"&quot;")}">${F(p,o)}</button>`).join("")}</div><div class="mc-fb"></div></div>`).join("");
    out.querySelectorAll(".mc-q").forEach(q=>{ const p=ps[+q.dataset.i]; q.querySelectorAll("[data-o]").forEach(b=>b.onclick=()=>{ if(q.dataset.done) return; q.dataset.done=1; const ok=b.dataset.o===p.a; q.querySelectorAll("[data-o]").forEach(x=>{ x.disabled=true; if(x.dataset.o===p.a) x.classList.add("ok"); }); if(!ok) b.classList.add("bad"); q.querySelector(".mc-fb").innerHTML=`<p class="${ok?"yes":"no"}">${ok?"Correct!":"Not quite."}</p>${sol(p)}`; }); }); }
  else if(S.mode==="type"){ const ps=setOf(gens,10).filter(p=>p.v!==undefined).slice(0,4); if(!ps.length){ out.innerHTML=`<p class="mc-note">These answers aren't numbers, so there's nothing to type. Try <b>Multiple choice</b>, <b>Problems</b> or <b>Deck</b>.</p>`; return; }
    out.innerHTML=ps.map((p,i)=>`<div class="mc-q" data-i="${i}"><p><b>${i+1}.</b> ${F(p,p.q)}</p><div class="mc-in"><input type="text" autocomplete="off" aria-label="Answer ${i+1}" placeholder="e.g. 12, −3, 5/6"><button type="button" data-c>Check</button><button type="button" data-s>Show</button></div><div class="mc-fb"></div></div>`).join("");
    out.querySelectorAll(".mc-q").forEach(q=>{ const p=ps[+q.dataset.i], inp=q.querySelector("input"), fb=q.querySelector(".mc-fb");
      const chk=()=>{ const x=parseNum(inp.value); if(x===null) return; const tol=p.tol!=null?p.tol:Math.max(1e-6,Math.abs(p.v)*1e-6); const ok=!isNaN(x)&&Math.abs(x-p.v)<=tol+1e-9; inp.classList.toggle("ok",ok); inp.classList.toggle("bad",!ok); fb.innerHTML=ok?`<p class="yes">Correct! ${F(p,p.a)}</p>${sol(p)}`:`<p class="no">${isNaN(x)?"Type a number, like 12, −3 or 5/6.":"Not yet. Try again or tap Show."}</p>`; };
      q.querySelector("[data-c]").onclick=chk; inp.addEventListener("keydown",e=>{ if(e.key==="Enter") chk(); }); q.querySelector("[data-s]").onclick=()=>{ fb.innerHTML=`<p>Answer: <b>${F(p,p.a)}</b></p>${sol(p)}`; }; }); }
  else { const ps=setOf(gens,8); let qd=ps.map((_,i)=>i), known=0;
    const show=()=>{ if(!qd.length){ out.innerHTML=`<div class="mc-card"><p><b>Deck finished!</b> You knew ${known} of ${ps.length} on the first try.</p></div>`; return; } const p=ps[qd[0]];
      out.innerHTML=`<div class="mc-card"><div class="mc-k">${ps.length-qd.length+1} of ${ps.length} · ${qd.length} left</div><p class="mc-cq">${F(p,p.q)}</p><button type="button" class="mc-flip">Show answer</button><div class="mc-back" hidden><p class="mc-a">${F(p,p.a)}</p>${sol(p)}<div class="mc-db"><button type="button" class="ok" data-k="1">✓ Got it</button><button type="button" class="bad" data-k="0">✗ Again</button></div></div></div>`;
      out.querySelector(".mc-flip").onclick=e=>{ e.target.hidden=true; out.querySelector(".mc-back").hidden=false; };
      out.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{ const i=qd.shift(); if(b.dataset.k==="1"){ if(!ps[i]._miss) known++; } else { ps[i]._miss=1; qd.push(i); } show(); }); };
    show(); } }
function bindPanel(box,levels){ PANELS.set(box,{levels,lv:0,mode:"prob"}); const S=PANELS.get(box);
  box.querySelectorAll("[data-mcl]").forEach(b=>b.onclick=()=>{ S.lv=+b.dataset.mcl; box.querySelectorAll("[data-mcl]").forEach(x=>x.classList.toggle("on",x===b)); render(box); });
  box.querySelectorAll("[data-mcm]").forEach(b=>b.onclick=()=>{ S.mode=b.dataset.mcm; box.querySelectorAll("[data-mcm]").forEach(x=>x.classList.toggle("on",x===b)); render(box); });
  box.querySelector("[data-mcn]").onclick=()=>render(box); render(box); }
/* interactive step-by-step labs for Algebra 1 Systems (Algebra 2 adds its own in methods.js) */
const LAB1={s1:"graph",s2:"sub",s3:"elim",s4:"cramer",graph:"graph",sub:"sub",elim:"elim",cr2:"cramer",inv:"inverse",el3:"elim3"}, S31={gauss:"gauss",cr3:"sar",sar:"sar",form:"aug",cls:"cls",p3:"cls"};
function addCard(d){ const mf=d.previousElementSibling; if(!mf||!mf.classList.contains("mf")) return; const k=d.dataset.k, card=d.querySelector(".mf-dc"); if(!k||!card||card.querySelector(".mc-wrap")) return;
  const flow=mf.dataset.flow||"", name=(card.querySelector("h4")||{}).textContent||"this method";
  const F0=window.__ZFLOWS&&window.__ZFLOWS[flow]; const m={name,key:k,hint:(mf.querySelector(`[data-fm="${k}"] span`)||{}).textContent||""};
  let levels=[], lab="";
  const zu=mf.closest(".zu"), uidOf=()=>flow.startsWith("f-")?flow.slice(2):((zu&&zu.id||"").replace(/^sec-/,"")||flow);
  if(window.ZC){ const uid=uidOf(); levels=levelsAlg1(uid,m); if(uid==="sys"&&LAB1[k]&&window.ZSYS) lab=ZSYS.html({methods:[LAB1[k]],lead:`Solve a new system with ${name}, one step at a time. Each box turns <span class="zs-ok">green</span> when it's right and <span class="zs-no">red</span> when it's not.`}); else if(uid==="sys"&&S31[k]&&window.A2S3) lab=A2S3.html(); }
  else { const sec=(mf.closest("section.unit")||{}).id||""; levels=levelsAlg2(sec.replace(/^sec-/,""),m); }
  let whole=false; if(!levels.length){ m.all=true; whole=true; levels=window.ZC?levelsAlg1(uidOf(),m):levelsAlg2(((mf.closest("section.unit")||{}).id||"").replace(/^sec-/,""),m); }
  if(!levels.length&&!lab) return;
  const w=document.createElement("div"); w.className="mc-wrap"; w.innerHTML=`<h5>📚 Practice: ${whole?"this whole unit (mixed)":name}</h5>${build(levels,lab)}`;
  const before=card.querySelector(".mf-tip,.fx-go:not(.mf-gen)"); before?card.insertBefore(w,before):card.appendChild(w);
  bindPanel(w.querySelector(".mc"),levels);
  const s3=w.querySelector(".mc-lab .s3lab"); if(s3&&window.A2S3){ A2S3.bind(w); const b=s3.querySelector(`.s3mode [data-m="${S31[k]}"]`); if(b) b.click(); } }
const mo=new MutationObserver(()=>{ document.querySelectorAll(".mf + .mf-d,.mf-d").forEach(d=>{ if(d.dataset.k) addCard(d); }); });
const go=()=>{ mo.observe(document.body,{childList:true,subtree:true}); document.querySelectorAll(".mf-d").forEach(d=>d.dataset.k&&addCard(d)); };
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",go); else go();
const css=`.mc-wrap{margin:14px 0 6px;border-top:2px solid var(--c,#1d4e89);padding-top:8px}
.mc-wrap>h5{font-size:19px;margin:0 0 6px;color:var(--c,#1d4e89)}
.mc-row{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:0 0 8px}
.mc-lv button{font:600 15.5px 'EB Garamond',Georgia,serif;border:1.5px solid #111;background:#fff;padding:4px 12px;cursor:pointer;color:#111}
.mc-lv button.on{background:#111;color:#fff}
.mc-md button{font:500 15px 'EB Garamond',Georgia,serif;border:1.5px solid #1d4e89;color:#1d4e89;background:#fff;border-radius:999px;padding:2px 11px;cursor:pointer}
.mc-md button.on{background:#1d4e89;color:#fff}
.mc-md .mc-new{border-color:#0f7a6c;background:#0f7a6c;color:#fff;border-radius:4px}
.mc-q{border:1px solid #ccc;background:#fff;padding:8px 10px;margin:0 0 8px}
.mc-q>p{margin:2px 0 6px}.mc-q summary{cursor:pointer;font-weight:600;color:#1d4e89}
.mc-st{margin:4px 0;padding-left:22px}.mc-a{margin:4px 0}
.mc-ch{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:6px}
.mc-ch button{text-align:left;font:16.5px 'EB Garamond',Georgia,serif;border:1.3px solid #999;border-radius:8px;background:#fff;padding:6px 10px;cursor:pointer;color:#111}
.mc-ch button.ok{border-color:#1a7f37;background:#e8f6ec}.mc-ch button.bad{border-color:#c5221f;background:#fdecea}
.mc-in{display:flex;flex-wrap:wrap;gap:6px}.mc-in input{width:9em;font:17px 'EB Garamond',Georgia,serif;padding:4px 8px;border:1.5px solid #999;border-radius:6px}
.mc-in input.ok{border-color:#1a7f37;background:#e8f6ec}.mc-in input.bad{border-color:#c5221f;background:#fdecea}
.mc-in button,.mc-flip,.mc-db button{font:600 15px 'EB Garamond',Georgia,serif;border:1.5px solid #111;background:#fff;padding:3px 10px;cursor:pointer}
.mc-fb .yes{color:#137333;font-weight:700}.mc-fb .no{color:#b3261e;font-weight:700}
.mc-card{border:1.5px solid #111;background:#fff;padding:10px 12px}.mc-k{font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#555}.mc-cq{font-size:18px}
.mc-db{display:flex;gap:8px;margin-top:8px}.mc-db .ok{border-color:#1a7f37;color:#1a7f37}.mc-db .bad{border-color:#c5221f;color:#c5221f}
.mc-note{font-style:italic;color:#555}
.mc-lab .s3lab>.lead2{display:none}`;
const st=document.createElement("style"); st.textContent=css; document.head.appendChild(st);
window.MCARD={addCard,_t:{levelsAlg1,levelsAlg2,matchGens,tok}};
})();
