/* Math typesetting fix: draws p̂, x̄, ȳ … with a real hat/bar and turns Unicode subscripts (p₀, x₁, Hₐ, s_d …) into proper subscripts.
   Runs on the page and on everything added later (quizzes, decks, flowchart cards). */
(function(){
const SUB={"₀":"0","₁":"1","₂":"2","₃":"3","₄":"4","₅":"5","₆":"6","₇":"7","₈":"8","₉":"9","ₐ":"a","ₑ":"e","ₒ":"o","ₓ":"x","ᵢ":"i","ⱼ":"j","ₖ":"k","ₙ":"n","ₚ":"p","ₘ":"m","ₜ":"t","ₛ":"s","ₗ":"l","ₕ":"h","₊":"+","₋":"−"};
const ACC={"̂":"hat","̄":"bar","̅":"bar"};
const RX=/([A-Za-zμσπρθ])([̂̄̅])|([₀-₉ₐₑₒₓᵢⱼₖₙₚₘₜₛₗₕ₊₋]+)/g;
const SKIP=new Set(["SCRIPT","STYLE","TEXTAREA","INPUT","SELECT","OPTION","CODE","TITLE","MZ-A","MZ-S","MZ-RS","BUTTON-NOPE"]);
function fixText(node){
  const t=node.nodeValue; if(!t) return; RX.lastIndex=0; if(!RX.test(t)) return; RX.lastIndex=0;
  const f=document.createDocumentFragment(); let last=0, m;
  while((m=RX.exec(t))){
    if(m.index>last) f.appendChild(document.createTextNode(t.slice(last,m.index)));
    if(m[1]){ const s=document.createElement("mz-a"); s.className=ACC[m[2]]; s.textContent=m[1]; f.appendChild(s); }
    else { const s=document.createElement("mz-s"); s.textContent=[...m[3]].map(c=>SUB[c]||c).join(""); f.appendChild(s); }
    last=RX.lastIndex; }
  if(last<t.length) f.appendChild(document.createTextNode(t.slice(last)));
  node.parentNode.replaceChild(f,node); }

/* radicals: √(…) and √41 → a root sign with a bar over the whole radicand */
function wrapRoot(frag){ const r=document.createElement("mz-r"), sg=document.createElement("mz-rs"), ri=document.createElement("mz-ri"); sg.textContent="√"; ri.appendChild(frag); r.appendChild(sg); r.appendChild(ri); return r; }
function lone(t,i){ const after=t.splitText(i); after.nodeValue=after.nodeValue.slice(1); const g=document.createElement("mz-rs"); g.className="lone"; g.textContent="√"; after.parentNode.insertBefore(g,after); return after; }
function okParent(p){ return p&&p.namespaceURI!=="http://www.w3.org/1998/Math/MathML"&&!SKIP.has(p.nodeName)&&!(p.closest&&(p.closest("svg")||p.closest(".rad"))); }
function rootNode(t){
  for(let guard=0;t&&guard<40;guard++){
    if(!t.parentNode) return; const v=t.nodeValue, i=v.indexOf("√"); if(i<0) return;
    if(v[i+1]==="("){
      let depth=1, endNode=null, endOff=-1, n=t, off=i+2, ok=true;
      while(n){ if(n.nodeType===3){ const tx=n.nodeValue; for(let k=off;k<tx.length;k++){ const c=tx[k]; if(c==="(") depth++; else if(c===")"){ depth--; if(!depth){ endNode=n; endOff=k; break; } } } }
        else { const tx=n.textContent; for(let k=0;k<tx.length;k++){ const c=tx[k]; if(c==="(") depth++; else if(c===")") depth--; } if(depth<1){ ok=false; break; } }
        if(endNode) break; n=n.nextSibling; off=0; }
      if(!endNode||!ok){ t=lone(t,i); continue; }
      const rg=document.createRange(); rg.setStart(t,i+2); rg.setEnd(endNode,endOff); const inner=rg.extractContents();
      const after=t.splitText(i); after.nodeValue=after.nodeValue.slice(2);
      let close=after; while(close&&!(close.nodeType===3&&close.nodeValue[0]===")")) close=close.nextSibling;
      if(close) close.nodeValue=close.nodeValue.slice(1);
      after.parentNode.insertBefore(wrapRoot(inner),after); t=close||after;
    } else {
      const m=v.slice(i+1).match(/^(?:\d+(?:\.\d+)?|[A-Za-z]+\d*)/);
      if(!m){ t=lone(t,i); continue; }
      const after=t.splitText(i); after.nodeValue=after.nodeValue.slice(1+m[0].length);
      const f=document.createDocumentFragment(); f.appendChild(document.createTextNode(m[0])); after.parentNode.insertBefore(wrapRoot(f),after); t=after;
    } } }
const HAS=/[̂̄̅√₀-₉ₐₑₒₓᵢⱼₖₙₚₘₜₛₗₕ₊₋]/;
/* slash fractions a/b → stacked fractions (books that set window.MZ_FRAC) */
const AT="(?:\\d*√)?(?:(?:\\d+(?:\\.\\d+)?[A-Za-zΔΣπθλμσαβ′]*|[A-Za-zΔΣπθλμσαβ′]+\\d*)(?:\\((?:[^()]|\\([^()]*\\))*\\))?|\\((?:[^()]|\\([^()]*\\))*\\))";
const FRX=new RegExp("("+AT+")/("+AT+")");
const unp=x=>(/^\((?:[^()]|\([^()]*\))*\)$/.test(x)?x.slice(1,-1):x);
function mkFrac(numNodes,denNodes){ const f=document.createElement("span"); f.className="frc"; const a=document.createElement("span"), b=document.createElement("span"); numNodes.forEach(n=>a.appendChild(typeof n==="string"?document.createTextNode(n):n)); denNodes.forEach(n=>b.appendChild(typeof n==="string"?document.createTextNode(n):n)); f.appendChild(a); f.appendChild(b); return f; }
function slashNode(t){ if(!window.MZ_FRAC||!t.parentNode||t.parentNode.closest&&t.parentNode.closest(".frc,math,sup,sub,button.pr-new,.fq-tb th")) return;
  for(let guard=0;guard<20&&t&&t.parentNode;guard++){ const v=t.nodeValue;
    // case 1: "<base><sup>…</sup>" + "/den…"
    if(v[0]==="/"){ const prev=t.previousSibling, pp=prev&&prev.previousSibling; const dm=v.slice(1).match(new RegExp("^"+AT));
      if(dm&&prev&&/^(SUP|SUB)$/.test(prev.nodeName)&&pp&&pp.nodeType===3){ const bm=pp.nodeValue.match(/([A-Za-z0-9′)]+)$/); if(bm&&!bm[1].endsWith(")")){ pp.nodeValue=pp.nodeValue.slice(0,-bm[1].length); const den=[unp(dm[0])]; let rest=v.slice(1+dm[0].length); const f=mkFrac([bm[1],prev],den); t.parentNode.insertBefore(f,t); if(!rest&&t.nextSibling&&t.nextSibling.nodeName==="SUP"){ f.lastChild.appendChild(t.nextSibling); } t.nodeValue=rest; continue; } } }
    const m=v.match(FRX); if(!m) return;
    if(/^[A-Za-z]{3,}$/.test(m[1])&&/^[A-Za-z]{3,}$/.test(m[2])){ const k=m.index+m[0].length; if(k>=v.length) return; const tail=t.splitText(k); t=tail; continue; } // words like inflow/outflow stay as text
    let before=v.slice(0,m.index), after=v.slice(m.index+m[0].length);
    if(/\($/.test(before)&&/^\)/.test(after)&&!/[A-Za-z0-9′]\($/.test(before)&&!/^\)[ⁿ¹²³⁴⁵⁶⁷⁸⁹⁰]/.test(after)&&!(after.length===1&&t.nextSibling&&t.nextSibling.nodeName==="SUP")){ before=before.slice(0,-1); after=after.slice(1); }
    if(/[A-Za-z0-9]$/.test(before)&&!/^\(/.test(m[1])) return; // part of a longer token
    const f=mkFrac([unp(m[1])],[unp(m[2])]); const tail=document.createTextNode(after); t.nodeValue=before; t.parentNode.insertBefore(tail,t.nextSibling); t.parentNode.insertBefore(f,tail);
    if(!after&&tail.nextSibling&&tail.nextSibling.nodeName==="SUP") f.lastChild.appendChild(tail.nextSibling);
    f.querySelectorAll("*").forEach(()=>{}); const l=[]; collect(f,l); l.forEach(fixNode);
    t=tail; } }

const has=v=>HAS.test(v)||(window.MZ_FRAC&&v.indexOf("/")>-1);
function collect(root,out){ if(root.nodeType===3){ if(has(root.nodeValue)&&okParent(root.parentNode)) out.push(root); return; }
  if(root.nodeType!==1||SKIP.has(root.nodeName)) return;
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null); let n; while((n=w.nextNode())){ if(has(n.nodeValue)&&okParent(n.parentNode)) out.push(n); } }
function fixNode(t){ if(!t.parentNode) return; if(window.MZ_FRAC&&t.nodeValue.indexOf("/")>-1){ slashNode(t); if(!t.parentNode||!HAS.test(t.nodeValue)) return; } let p=t.parentNode;
  try{ if(/flex|grid/.test(getComputedStyle(p).display)){ const h=document.createElement("span"); h.className="mz-w"; p.insertBefore(h,t); h.appendChild(t); p=h; } }catch(e){}
  RX.lastIndex=0;
  if(RX.test(t.nodeValue)){ fixText(t); /* text is now split; re-find root signs among the new siblings */ let c=p.firstChild; const list=[]; while(c){ if(c.nodeType===3&&c.nodeValue.indexOf("√")>-1) list.push(c); c=c.nextSibling; } list.forEach(rootNode); }
  else if(t.nodeValue.indexOf("√")>-1) rootNode(t); }

/* ---------- MathML typesetting (Safari/iPhone and Chrome draw this natively) ---------- */
const NS="http://www.w3.org/1998/Math/MathML";
const ME=(t,kids,attrs)=>{ const e=document.createElementNS(NS,t); if(attrs) for(const k in attrs) e.setAttribute(k,attrs[k]); (kids||[]).forEach(c=>{ if(c) e.appendChild(typeof c==="string"?document.createTextNode(c):c); }); return e; };
let MML=null;
function mmlOK(){ if(MML!==null) return MML; try{ const m=ME("math",[ME("mspace",null,{width:"40px"})]); m.style.position="absolute"; m.style.visibility="hidden"; document.body.appendChild(m); const w=m.getBoundingClientRect().width; m.remove(); MML=w>30; }catch(e){ MML=false; } return MML; }
const ACCMO={hat:"^",bar:"¯"};
function tokens(text){ const out=[]; const re=/(\d+(?:\.\d+)?)|([A-Za-zμσπρθαβχλΣ]{2,})|([A-Za-zμσπρθαβχλΣ])([̂̄̅])?|([₀-₉ₐₑₒₓᵢⱼₖₙₚₘₜₛₗₕ₊₋]+)|(\s+)|(.)/g; let m;
  const rt=text.indexOf("√"); if(rt>-1){ const pre=text.slice(0,rt); let rest=text.slice(rt+1), inner=null;
    if(rest[0]==="("){ let d=0,k=0; for(;k<rest.length;k++){ if(rest[k]==="(") d++; else if(rest[k]===")"&&!--d) break; } if(k<rest.length){ inner=rest.slice(1,k); rest=rest.slice(k+1); } }
    else { const mm=rest.match(/^(?:\d+(?:\.\d+)?|[A-Za-z]+\d*)/); if(mm){ inner=mm[0]; rest=rest.slice(mm[0].length); } }
    if(inner!==null) return [...tokens(pre),ME("msqrt",[ME("mrow",tokens(inner))]),...tokens(rest)]; }
  while((m=re.exec(text))){
    if(m[1]) out.push(ME("mn",[m[1]]));
    else if(m[2]) out.push(ME("mtext",[m[2]]));
    else if(m[3]){ const mi=ME("mi",[m[3]],{mathvariant:"normal"}); out.push(m[4]?ME("mover",[mi,ME("mo",[m[4]==="̂"?"^":"¯"],{stretchy:"false"})],{accent:"true"}):mi); }
    else if(m[5]){ const base=out.pop()||ME("mrow"); const sub=[...m[5]].map(c=>SUB[c]||c).join(""); out.push(ME("msub",[base,/^\d+$/.test(sub)?ME("mn",[sub]):ME("mi",[sub],{mathvariant:"normal"})])); }
    else if(m[6]){ const l=out[out.length-1]; if(l&&l.nodeName==="mtext") out.push(ME("mspace",null,{width:"0.3em"})); }
    else if(/[̀-ͯ]/.test(m[7])){ /* stray combining mark: drop */ }
    else out.push(ME("mo",[m[7]],m[7]==="("||m[7]===")"||m[7]==="|"?{stretchy:"false"}:m[7]==="/"?{lspace:"0",rspace:"0"}:null)); }
  return out; }
function conv(node){ // DOM (HTML) → array of MathML nodes
  const out=[];
  node.childNodes.forEach(c=>{
    if(c.nodeType===3){ out.push(...tokens(c.nodeValue)); return; }
    if(c.nodeType!==1) return;
    const nm=c.nodeName.toLowerCase();
    if(c.namespaceURI===NS){ if(nm==="math") [...c.childNodes].forEach(x=>out.push(x.cloneNode(true))); else out.push(c.cloneNode(true)); return; }
    if(nm==="sup"||nm==="sub"||nm==="mz-s"){ const base=out.pop()||ME("mrow"); out.push(ME(nm==="sup"?"msup":"msub",[base,ME("mrow",conv(c))])); return; }
    if(nm==="mz-a"){ out.push(ME("mover",[ME("mi",[c.textContent],{mathvariant:"normal"}),ME("mo",[ACCMO[c.className]||"^"],{stretchy:"false"})],{accent:"true"})); return; }
    if(c.classList&&c.classList.contains("frc")&&c.children.length===2){ out.push(ME("mfrac",[ME("mrow",conv(c.children[0])),ME("mrow",conv(c.children[1]))])); return; }
    if(nm==="mz-r"){ const ri=c.querySelector("mz-ri"); out.push(ME("msqrt",[ME("mrow",ri?conv(ri):[])])); return; }
    out.push(ME("mrow",conv(c))); });
  return out; }
function toMath(el){ if(!mmlOK()||!el.parentNode) return; const m=ME("math",[ME("mrow",conv({childNodes:[el]}))]); if(el.querySelector&&(el.matches(".frc")||el.querySelector(".frc"))) m.setAttribute("displaystyle","true"); m.setAttribute("class","mz-m"); el.parentNode.replaceChild(m,el); }
function mathify(root){ if(!mmlOK()) return; const els=root.nodeType===1?[...(root.matches&&root.matches("mz-r,mz-a,.frc")?[root]:[]),...root.querySelectorAll("mz-r,mz-a,.frc")]:[];
  els.forEach(e=>{ if(!e.isConnected||e.closest("math")) return; let top=e, p=e.parentNode; while(p&&p.nodeType===1&&(p.matches("mz-r,.frc"))){ top=p; p=p.parentNode; }
    // keep a subscript that follows an accent together with it
    if(top.nodeName==="MZ-A"&&top.nextSibling&&top.nextSibling.nodeName==="MZ-S"){ const w=document.createElement("span"); top.parentNode.insertBefore(w,top); w.appendChild(top); w.appendChild(w.nextSibling); top=w; }
    toMath(top); }); }
let queue=[], busy=false;
function pump(){ busy=true; const t0=performance.now(); while(queue.length&&performance.now()-t0<12){ const t=queue.shift(), par=t.parentNode; fixNode(t); if(par&&par.isConnected) mathify(par); }
  if(queue.length) setTimeout(pump,0); else busy=false; }
function prefix(root){ /* build radicals and subscripts inside fractions before the fraction is typeset */
  const fr=root.nodeType===1?[...(root.matches&&root.matches('.frc')?[root]:[]),...root.querySelectorAll('.frc')]:[];
  fr.forEach(f=>{ if(f.closest('math')) return; const l=[]; collect(f,l); l.forEach(fixNode); }); }
function run(root){ if(!root) return; if(root.nodeType===1&&root.querySelector&&(root.matches('.frc')||root.querySelector('.frc'))){ prefix(root); mathify(root); } collect(root,queue); if(!busy&&queue.length) pump(); }
let pending=new Set(), sched=false;
const obs=new MutationObserver(ms=>{ ms.forEach(m=>{ if(m.type==="characterData") pending.add(m.target); else m.addedNodes.forEach(n=>pending.add(n)); });
  if(!sched){ sched=true; requestAnimationFrame(()=>{ sched=false; const ps=[...pending]; pending.clear(); ps.forEach(n=>{ if(n.isConnected) run(n); }); }); } });
function start(){ run(document.body); obs.observe(document.body,{childList:true,subtree:true,characterData:true}); }
const css=`.mz-m{font-size:1.06em}
math.mz-m[displaystyle]{display:inline-block;margin:.12em .05em;vertical-align:middle}
.mz-w{display:inline}
math.mz-m mfrac{padding:0 .1em}
mz-a{display:inline-block;position:relative;line-height:1;font:inherit;color:inherit;background:none;border:0;padding:0;margin:0}
mz-a::after{position:absolute;left:0;right:0;text-align:center;pointer-events:none}
mz-a.hat::after{content:"^";top:-.46em;font-size:.8em}
mz-a.bar::after{content:"";top:-.1em;left:.06em;right:.06em;border-top:.075em solid currentColor}
mz-s{display:inline;font-size:.68em;line-height:0;vertical-align:-.28em;margin-left:.02em;font-variant-numeric:lining-nums;font-feature-settings:"lnum" 1;font-style:inherit}

mz-r{display:inline-flex;align-items:stretch;white-space:nowrap;vertical-align:baseline;line-height:1.15}
mz-rs.lone{font-size:1em;transform:none}
mz-rs{font-size:1.12em;line-height:1;margin-right:-.02em;align-self:flex-start;transform:translateY(-.02em)}
mz-ri{border-top:.075em solid currentColor;padding:.06em .1em 0 .08em;margin-top:.08em;white-space:normal}
.frc{display:inline-flex!important;flex-direction:column!important;vertical-align:middle!important;text-align:center!important;font-size:.9em!important;line-height:1.2!important;margin:0 .15em!important;padding:.05em 0!important}
.frc>span{padding:0 .2em}
.frc>span:first-child{padding-bottom:.08em}
.frc>span+span{border-top:.07em solid currentColor!important;padding-top:.1em}
.mx{display:inline-grid!important;grid-template-columns:repeat(var(--n,2),auto)!important;column-gap:.7em;row-gap:.1em;position:relative;padding:.18em .55em!important;margin:0 .25em!important;vertical-align:middle;border:0!important;line-height:1.25;flex-direction:initial!important}
.mx::before,.mx::after{content:"";position:absolute;top:0;bottom:0;width:.32em;border:.085em solid currentColor}
.mx::before{left:0;border-right:0}.mx::after{right:0;border-left:0}
.mx>i{font-style:normal;text-align:center;min-width:1em}

body{font-variant-numeric:lining-nums;font-feature-settings:"lnum" 1}`;
const st=document.createElement("style"); st.textContent=css; document.head.appendChild(st);
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",start); else start();
})();
