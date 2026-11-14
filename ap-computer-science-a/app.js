const COLORS = {"unit-1":"#1f5fa8","unit-2":"#2a7a46","unit-3":"#b8650f","unit-4":"#b03a2e","frq":"#1d2b44","beyond":"#6b3fa0","released":"#1d2b44","practice":"#1d2b44","books":"#0f6e6e","apps":"#4a4a4a"};
const TINTS = Object.fromEntries(Object.entries(COLORS).map(([k,v])=>[k, v+"14"]));
const cv = id => COLORS[id] ? `--c:${COLORS[id]};--t:${TINTS[id]}` : "";
const esc = s => String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const unitById = Object.fromEntries(UNITS.map(u=>[u.id,u]));
const tabs = document.getElementById("tabs"), content = document.getElementById("content"), q = document.getElementById("q");
let current = "all", lbList = [], lbIdx = 0;

const postersFor = id => POSTERS.filter(p=>p.units.includes(id));
const resCount = id => (RESOURCES[id]?.groups||[]).reduce((n,g)=>n+g.items.length,0);
const frqFor = id => FRQS.filter(r=>r.u.includes(id));
function count(id){ if(id==="released") return FRQS.length; if(RESOURCES[id]) return resCount(id); if(id==="practice") return ""; return postersFor(id).length; }

/* ---------- tooltip ---------- */
const tip = document.getElementById("tip");
function showTip(el, html){ tip.innerHTML = html; tip.classList.add("on"); const r = el.getBoundingClientRect(), w = tip.offsetWidth;
  let x = r.left + r.width/2 - w/2; x = Math.max(8, Math.min(x, window.innerWidth - w - 8)); tip.style.left = x+"px"; tip.style.top = (r.bottom+10)+"px"; }
function hideTip(){ tip.classList.remove("on"); }
window.addEventListener("scroll", hideTip, {passive:true});

/* ---------- tabs ---------- */
function renderTabs(){
  tabs.innerHTML = "";
  const GROUPS = [["Units", ["all","unit-1","unit-2","unit-3","unit-4"]], ["Free response", ["frq","released"]],
                  ["Practice & resources", ["practice","books","apps"]], ["Beyond AP", ["beyond"]]];
  for(const [label, ids] of GROUPS){
    const g = document.createElement("div"); g.className = "tgroup"; g.innerHTML = `<span class="glabel">${label}</span>`; tabs.appendChild(g);
    for(const id of ids){
      const u = unitById[id], n = id==="all" ? POSTERS.length : count(id);
      const b = document.createElement("button");
      b.innerHTML = (u ? u.short : "All units") + (n ? `<span class="n">${n}</span>` : "");
      b.setAttribute("aria-current", id===current); b.setAttribute("aria-label", u ? u.name : "All units");
      if(COLORS[id]) b.style.cssText = cv(id);
      b.onclick = ()=>{ location.hash = id==="all" ? "" : id; if(id==="all") route(); };
      const unitWord = id==="released" ? "questions" : RESOURCES[id] ? "links" : "posters";
      const th = u ? `<b>${esc(u.name)}</b><span>${esc(u.sub)}</span>${n?`<small>${n} ${unitWord}</small>`:""}` : `<b>All units</b><span>Every poster in the book</span><small>${n} posters</small>`;
      b.addEventListener("mouseenter", ()=>showTip(b, th)); b.addEventListener("focus", ()=>showTip(b, th));
      b.addEventListener("mouseleave", hideTip); b.addEventListener("blur", hideTip);
      g.appendChild(b);
    }
  }
}

/* ---------- pieces ---------- */
function pgrid(list, sid){
  return `<div class="pgrid">${list.map(p=>{
    const also = p.units.filter(x=>x!==sid && unitById[x]).map(x=>unitById[x].short);
    const meta = [p.solved?"Solved example":"", also.length?"Also in "+also.join(", "):""].filter(Boolean).join(" · ");
    return `<div class="pitem" style="${cv(p.units[0])}"><button type="button" class="posterbtn" data-img="${p.img}" aria-label="Open ${esc(p.title)}"><img loading="lazy" src="img/${p.img}" alt=""><span class="pt">${esc(p.title)}${meta?`<small>${esc(meta)}</small>`:""}</span></button></div>`;
  }).join("")}</div>`;
}
const A = (h,t)=>`<a class="btn" href="${h}" target="_blank" rel="noopener">${t}</a>`;
function frqLinks(r){
  const o = OFFICIAL[r.y];
  if(o) return A(o.qu,"Question")+A(o.sg,"Scoring guidelines")+(o.sa?A(o.sa(r.q),"Sample responses"):"");
  return A(ARCHIVE,"Find it (archive)")+A(SME,"Question &amp; scoring PDFs")+A(SOLS,"Solutions");
}
const TYPES = {1:"Methods & Control", 2:"Class Design", 3:"Array / ArrayList", 4:"2D Array"};
function typeOf(r){ if(r.y>=2019) return TYPES[r.q]; if(/GridWorld/.test(r.top)) return "GridWorld"; if(/2D/.test(r.top)) return TYPES[4];
  if(/interface|subclass|Complete class|Class that/i.test(r.top)) return TYPES[2]; if(r.u[0]==="unit-4") return TYPES[3]; return TYPES[1]; }
function frqTable(id, open){
  const list = id==="released" ? FRQS : frqFor(id);
  if(!list.length) return "";
  const rows = list.map(r=>`<tr><td class="yq">${r.y} · Q${r.q}${r.flag?`<span class="flag">⚠ ${esc(r.flag)}</span>`:""}</td><td class="t"><b>${esc(r.t)}</b><span>${esc(r.top)}</span></td><td>${typeOf(r)}</td><td class="l">${frqLinks(r)}</td></tr>`).join("");
  return `<details class="frq"${open?" open":""}><summary>Released FRQs for this unit (${list.length})</summary><table><tr><th>Exam</th><th>Question</th><th>Type</th><th>Links</th></tr>${rows}</table>
  <div class="note2">2023–2026 link straight to College Board PDFs. Older years link to free archives (the College Board keeps only the last few years online). There was no regular released exam in 2020. Questions before 2026 were written for the old 10-unit course, so a few use topics that are no longer tested; those are flagged.</div></details>`;
}
function resSection(id, term){
  const R = RESOURCES[id]; if(!R) return "";
  const groups = R.groups.map(g=>{ const items = g.items.filter(i=>!term || (i.t+" "+i.d+" "+i.by).toLowerCase().includes(term));
    if(!items.length) return ""; return `<div class="rescard"><h3>${esc(g.title)}</h3><ul>${items.map(i=>`<li><a href="${i.u}" target="_blank" rel="noopener">${esc(i.t)}</a><span class="price ${i.p}">${i.p}</span><br><span class="by">${esc(i.by)}</span><p>${esc(i.d)}</p></li>`).join("")}</ul></div>`; }).join("");
  if(!groups) return "";
  return (R.callout && !term ? `<div class="callout">${R.callout}</div>` : "") + `<div class="resgrid">${groups}</div>`;
}
const head = (id,u)=>`<section class="unit" id="sec-${id}" style="${cv(id)}"><div class="chapter">${u.chapter}</div><h2>${esc(u.name)}</h2><p class="sub">${esc(u.sub)}</p>`;

/* ---------- render ---------- */
function route(){ const h = location.hash.slice(1); current = unitById[h] ? h : "all"; renderTabs(); render(); window.scrollTo({top:0}); }
function render(){
  const term = q.value.trim().toLowerCase();
  const match = p => !term || (p.title+" "+p.units.map(u=>unitById[u]?unitById[u].name:"").join(" ")).toLowerCase().includes(term);
  const ids = current==="all" ? UNITS.map(u=>u.id) : [current];
  let html = "";
  for(const id of ids){
    const u = unitById[id];
    if(id==="practice"){
      if(term) continue;
      html += head(id,u) + `<p class="ptitle">Every question uses new numbers when you press “New set.” All answers were checked by running the same code in Java.</p>`;
      for(const uu of PRACTICE.units) html += `<div style="${cv(uu)}"><h3 style="margin:26px 0 8px;color:var(--c);font-size:22px">${esc(unitById[uu].name)}</h3>${PRACTICE.block(uu)}</div>`;
      html += `</section>`; continue;
    }
    if(RESOURCES[id] && id!=="_beyond"){
      const body = resSection(id, term); if(term && !body) continue;
      html += head(id,u) + body + `</section>`; continue;
    }
    if(id==="released"){
      if(term) continue;
      html += head(id,u);
      for(const uu of ["unit-1","unit-2","unit-3","unit-4","beyond"]){
        const t = frqTable(uu, true);
        if(t) html += `<div style="${cv(uu)}"><h3 style="margin:26px 0 0;color:var(--c);font-size:22px">${esc(unitById[uu].name)}</h3>${t.replace(/Released FRQs for this unit/,"Questions")}</div>`;
      }
      html += `</section>`; continue;
    }
    const items = postersFor(id).filter(match);
    if(term && !items.length) continue;
    html += head(id,u);
    const panels = [];
    const reg = items.filter(p=>!p.solved), sol = items.filter(p=>p.solved);
    if(reg.length) panels.push({k:"posters", label:"Posters", n:reg.length, body:`<p class="ptitle">Click a poster to open it full size. Use ‹ › or the arrow keys to flip through.</p>${pgrid(reg,id)}`});
    if(sol.length) panels.push({k:"solved", label: id==="frq" ? "Practice FRQs" : "Solved examples", n:sol.length, body:`<p class="ptitle">${id==="frq"?"Original free-response practice problems, one per question type, with full solutions.":"Worked examples, traced step by step."} Try the problem before reading the solution.</p>${pgrid(sol,id)}`});
    if(!term && /^unit-/.test(id)){
      panels.push({k:"quick", label:"Quick practice", n:"", body:PRACTICE.block(id)});
      const nf = frqFor(id).length; if(nf) panels.push({k:"frq", label:"Released FRQs", n:nf, body:frqTable(id, true)});
    }
    if(!term && id==="beyond"){
      const nf = frqFor(id).length; if(nf) panels.push({k:"frq", label:"Old FRQs on these topics", n:nf, body:frqTable(id, true)});
      panels.push({k:"res", label:"Courses & tools", n:resCount("_beyond"), body:resSection("_beyond","")});
    }
    const openAll = !!term || current!=="all";
    const firstOpen = openAll ? panels[0]?.k : null;
    html += `<div class="ubar">${panels.map(pn=>`<button type="button" class="ubtn" data-p="${pn.k}" aria-expanded="${pn.k===firstOpen}">${pn.label}${pn.n?`<span class="n">${pn.n}</span>`:""}</button>`).join("")}</div>`;
    html += panels.map(pn=>`<div class="upanel" data-p="${pn.k}"${pn.k===firstOpen?"":" hidden"}>${pn.body}</div>`).join("");
    html += `</section>`;
  }
  content.innerHTML = html || `<p class="empty">No posters match "${esc(term)}".</p>`;
  PRACTICE.bind(content);
  content.querySelectorAll(".ubtn").forEach(b=>b.onclick=()=>{
    const sec=b.closest("section"), willOpen=b.getAttribute("aria-expanded")!=="true";
    sec.querySelectorAll(".ubtn").forEach(x=>x.setAttribute("aria-expanded","false"));
    sec.querySelectorAll(".upanel").forEach(x=>x.hidden=true);
    if(willOpen){ b.setAttribute("aria-expanded","true"); sec.querySelector(`.upanel[data-p="${b.dataset.p}"]`).hidden=false; }
  });
  content.querySelectorAll("button.posterbtn").forEach(b=>b.onclick=()=>{
    const scope=b.closest(".upanel")||content; lbList=[...scope.querySelectorAll("button.posterbtn")]; openLb(lbList.indexOf(b));
  });
}

/* ---------- lightbox ---------- */
const lb=document.getElementById("lb"), lbImg=document.getElementById("lbImg"), lbTitle=document.getElementById("lbTitle");
function openLb(i){
  lbIdx=(i+lbList.length)%lbList.length; const p=POSTERS.find(x=>x.img===lbList[lbIdx].dataset.img);
  lbImg.src="img/"+p.img; lbImg.alt=p.title; lbTitle.textContent=p.title;
  lb.classList.add("open"); lb.querySelector(".stage").scrollTop=0; document.body.style.overflow="hidden";
}
function closeLb(){ lb.classList.remove("open"); document.body.style.overflow=""; }
document.getElementById("lbClose").onclick=closeLb;
document.getElementById("lbPrev").onclick=()=>openLb(lbIdx-1);
document.getElementById("lbNext").onclick=()=>openLb(lbIdx+1);
lb.addEventListener("click",e=>{ if(e.target===lb||e.target.classList.contains("stage")) closeLb(); });
document.addEventListener("keydown",e=>{ if(!lb.classList.contains("open")) return;
  if(e.key==="Escape") closeLb(); if(e.key==="ArrowLeft") openLb(lbIdx-1); if(e.key==="ArrowRight") openLb(lbIdx+1); });

q.oninput = render;
window.addEventListener("hashchange", route);
route();
