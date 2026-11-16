/* For every unit: (1) a "Practice: Problems, Deck & Quiz" panel built on the unit's problem generators,
   (2) a learning-map node view of the unit's sections (same look as the Polynomials folder). */
(function(){
const fmt=s=>window.A2PRACTICE?A2PRACTICE.fmt(s):s;
const XT={toolkit:[["Parent functions","parent"],["Transformations","transform"],["Domain and range","domain"],["Even and odd functions","evenodd"],["Average rate of change","rate"]],
  systems:[["Special cases","special"],["Cramer's rule","cramer"],["Inverse matrices","inverse"]]};
function topics(id){ if(XT[id]) return XT[id].map(x=>x[0]); const L=window.A2GEN&&A2GEN.GEN[id]; return L?[...new Set(L.map(x=>x[2]||x[0]))]:[]; }
function entries(id,grp){ if(XT[id]) return XT[id].filter(x=>!grp||x[0]===grp).map(x=>[x[0],()=>A2GEN.build(["x"],1,x[1])[0]]); return (A2GEN.GEN[id]||[]).filter(x=>!grp||(x[2]||x[0])===grp).map(x=>[x[0],x[1]]); }
const has=id=>topics(id).length>0;
/* convert a generated problem {q, a: steps<br>…<b>Answer: X</b>} to {q, a, s, g} */
function conv(p){ const parts=String(p.a).split(/<br\s*\/?>/i).map(x=>x.trim()).filter(Boolean); let ans=null, s=[];
  parts.forEach(x=>{ const m=x.match(/^<b>\s*Answer:\s*([\s\S]*?)<\/b>\s*$/i); if(m) ans=m[1].trim(); else s.push(x); });
  if(ans===null){ const last=s.pop()||""; ans=last.replace(/^<b>|<\/b>$/g,""); s.push(last); }
  return {q:p.q,a:ans,s,g:p.g,topic:p.topic}; }
const mk=([name,fn])=>()=>{ for(let i=0;i<20;i++){ try{ const r=fn(); if(r&&r.q){ r.topic=r.topic||name; return conv(r); } }catch(e){} } return {q:"(Press New.)",a:"",s:[]}; };
function gen(id,grp){ return entries(id,grp).map(mk); }
function html(id){
  return `<div class="ws-pb up" data-up="${id}"><p class="lead2">New problems every time from all the topics in this unit, with step-by-step solutions. Pick a topic or practice them all.</p>
   <div class="up-tp"><span class="gl">Topic</span>${["All topics",...topics(id)].map((t,i)=>`<button type="button" data-upt="${i?t.replace(/"/g,"&quot;"):""}"${i?"":' class="on"'}>${t}</button>`).join("")}</div>
   <div class="ws-modes">${[["prob","📝 Problems"],["deck","🃏 Deck"],["quiz","✔ Quiz (multiple choice)"]].map(([k,v],i)=>`<button type="button" data-pbm="${k}"${i?"":` class="on"`}>${v}</button>`).join("")}<button type="button" class="ws-b" data-pbn>↻ New</button></div>
   <div class="ws-pbo"></div></div>`;
}
function bind(root){ if(!window.A2WS||!A2WS.ui) return; const U=A2WS.ui;
  root.querySelectorAll("[data-up]").forEach(box=>{ if(box.dataset.bound) return; box.dataset.bound=1; const id=box.dataset.up, out=box.querySelector(".ws-pbo"); let mode="prob", tp="";
    const gens=()=>gen(id,tp||null);
    const safe=g=>()=>{ for(let i=0;i<5;i++){ try{ const p=g(); if(p&&p.q&&p.a) return p; }catch(e){} } return {q:"(no problem)",a:"",s:[]}; };
    const render=()=>{ const G=shuffle(gens()).map(safe); if(mode==="prob") out.innerHTML=U.probHtml(U.makeSet(G,6)); else if(mode==="deck") U.deckRun(out,U.makeSet(G,10),render); else U.quizRun(out,G,8,render); };
    box.querySelectorAll("[data-upt]").forEach(b=>b.onclick=()=>{ tp=b.dataset.upt; box.querySelectorAll("[data-upt]").forEach(x=>x.classList.toggle("on",x===b)); render(); });
    box.querySelectorAll("[data-pbm]").forEach(b=>b.onclick=()=>{ mode=b.dataset.pbm; box.querySelectorAll("[data-pbm]").forEach(x=>x.classList.toggle("on",x===b)); render(); });
    box.querySelector("[data-pbn]").onclick=render; render(); }); }
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};

/* ---------- learning map for any unit ---------- */
const GRP=[["Learn",/flow|cheat|graphs|summary|posters/,"#1d4e89"],["Practice",/quiz|drill|sets/,"#0f7a6c"],["Challenge",/honors|sat|chal/,"#6a3d9a"],["Resources",/res/,"#c2571a"]];
const DESC={flow:"which method, when",lab3:"Gauss, matrices, 3D graphs",cheatx:"one-page formulas & rules",satgen:"SAT-style, new every time",chal:"advanced problems",cheat:"key rules, formulas and examples",graphs:"graphs, asymptotes, worked steps",summary:"one-page summaries",posters:"solved examples on posters",quiz:"10 · 15 · 20 new questions",drill:"problems, deck and quiz",sets:"step-by-step sets",honors:"harder multi-step problems",sat:"SAT-style questions",res:"videos, sites and links"};
function mapUnit(root){
  root.querySelectorAll("section.unit").forEach(sec=>{ const uid=sec.id.replace(/^sec-/,""); if(uid==="poly"||uid==="formulas"||uid==="factor"||uid==="div"||sec.querySelector(".pmap")) return;
    const subs=[...sec.querySelectorAll(`[id^="sub-${uid}-"]`)].filter(e=>e.querySelector(".subh")); if(subs.length<3) return;
    const items=subs.map((el,i)=>{ const k=el.id.slice(`sub-${uid}-`.length), sm=el.querySelector(".subh small"), t=el.querySelector(".subh").cloneNode(true); t.querySelectorAll(".num,small,a,button").forEach(x=>x.remove());
      const g=GRP.find(([,re])=>re.test(k))||GRP[0]; return {k,el,i,title:t.textContent.replace(/↑\s*Sections?/g,"").replace(/\s*\([^)]*\)\s*/g," ").replace(/\s+/g," ").trim(),cnt:sm?sm.textContent:"",grp:g[0],col:g[2],desc:DESC[k]||""}; });
    const N=items.length, pos=items.map((_,i)=>{ const a=-Math.PI/2+2*Math.PI*i/N; return [50+40*Math.cos(a),50+37*Math.sin(a)]; });
    const h2=sec.querySelector("h2"), name=(h2?h2.textContent:uid).replace(/^Unit \d+:\s*/,"").replace(/^Chapter [IVX]+:?\s*/,"");
    let mode="map"; try{ mode=localStorage.getItem("a2unitview")||"map"; }catch(e){}
    const wrap=document.createElement("div"); wrap.className="pmap um";
    wrap.innerHTML=`<div class="pm-bar"><button type="button" data-pv="map">🗺 Map</button><button type="button" data-pv="list">☰ List</button><span class="pm-leg">${GRP.map(([g,,c])=>`<span><i style="background:${c}"></i>${g}</span>`).join("")}</span></div>
     <div class="pm-stage"><svg class="pm-lines" viewBox="0 0 100 100" preserveAspectRatio="none">${pos.map(([x,y])=>`<line x1="50" y1="50" x2="${x}" y2="${y}"/>`).join("")}${pos.slice(0,-1).map(([x,y],i)=>`<line class="pth" x1="${x}" y1="${y}" x2="${pos[i+1][0]}" y2="${pos[i+1][1]}"/>`).join("")}</svg>
      <div class="pm-hub um-hub"><b>${name}</b><span>Start at 1 and follow the path</span></div>
      ${items.map((it,i)=>`<button type="button" class="pm-node" data-pk="${it.k}" style="left:${pos[i][0]}%;top:${pos[i][1]}%;--c:${it.col}"><span class="pm-n">${i+1}</span><span class="pm-t">${it.title}</span><span class="pm-d">${it.desc}</span><span class="pm-c">${it.cnt}</span></button>`).join("")}</div>
     <div class="pm-cur"></div>`;
    subs[0].parentNode.insertBefore(wrap,subs[0]);
    const cur=wrap.querySelector(".pm-cur"); let sel=items[0].k;
    const show=k=>{ sel=k; const it=items.find(x=>x.k===k);
      wrap.querySelectorAll(".pm-node").forEach(n=>n.classList.toggle("on",n.dataset.pk===k));
      items.forEach(x=>x.el.style.display=(mode==="list"||x.k===k)?"":"none");
      if(mode==="map"){ if(it.el.tagName==="DETAILS") it.el.open=true; const i=it.i;
        cur.innerHTML=`<button type="button" class="pm-step" data-ps="${i-1}"${i?"":" disabled"}>‹ ${i?items[i-1].title:""}</button><span>Section ${i+1} of ${N}</span><button type="button" class="pm-step" data-ps="${i+1}"${i<N-1?"":" disabled"}>${i<N-1?items[i+1].title:""} ›</button>`;
        cur.querySelectorAll("[data-ps]").forEach(b=>b.onclick=()=>{ const j=+b.dataset.ps; if(items[j]){ show(items[j].k); cur.scrollIntoView({behavior:"smooth",block:"start"}); } }); } };
    const setMode=m=>{ mode=m; try{ localStorage.setItem("a2unitview",m); }catch(e){} wrap.classList.toggle("list",m==="list"); wrap.querySelectorAll("[data-pv]").forEach(b=>b.classList.toggle("on",b.dataset.pv===m)); if(m==="list") cur.innerHTML=""; show(sel); };
    wrap.querySelectorAll("[data-pv]").forEach(b=>b.onclick=()=>setMode(b.dataset.pv));
    wrap.querySelectorAll(".pm-node").forEach(n=>n.onclick=()=>{ show(n.dataset.pk); setTimeout(()=>cur.scrollIntoView({behavior:"smooth",block:"start"}),30); });
    sec.addEventListener("click",e=>{ const j=e.target.closest("[data-jump]"); if(!j||mode!=="map") return; const it=items.find(x=>x.el.id===j.dataset.jump); if(it&&it.k!==sel) show(it.k); },true);
    setMode(mode);
  });
}
const css=`.up-tp{display:flex;flex-wrap:wrap;gap:5px;align-items:center;margin:0 0 10px}
.up-tp .gl{font-variant:small-caps;font-weight:600;letter-spacing:.06em;margin-right:4px}
.up-tp button{border:1.5px solid #1d4e89;background:#fff;color:#1d4e89;padding:3px 10px;border-radius:999px;font:500 15px 'EB Garamond',Georgia,serif;cursor:pointer}
.up-tp button.on{background:#1d4e89;color:#fff}
.um-hub{background:#111!important;box-shadow:0 6px 18px rgba(0,0,0,.25)!important}
.um-hub b{font-size:21px!important}`;
const st=document.createElement("style"); st.textContent=css; document.head.appendChild(st);
window.A2UP={has,html,bind,mapUnit,_test:{topics,conv,gen,entries}};
})();
