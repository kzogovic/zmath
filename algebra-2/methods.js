/* Systems: "Find a method" bar + step-by-step practice (uses syslab.js).
   Each chip opens that method's card in the Systems flowchart; the practice chips open the step-by-step lab on that method. */
(function(){
const FIND=[["2 × 2",[["graph","Graphing","graph"],["sub","Substitution","sub"],["elim","Elimination","elim"],["cr2","Cramer's rule","cramer"],["inv","Inverse matrix","inverse"]]],
 ["3 × 3",[["el3","Elimination","elim3"],["gauss","Gaussian elimination","s3:gauss"],["cr3","Cramer's rule","s3:sar"],["sar","Sarrus' rule","s3:sar"]]],
 ["Nonlinear",[["nls","Substitution",null],["nle","Elimination",null]]],
 ["Check",[["cls","Check & classify",null]]]];
const has=id=>id==="systems";
function finder(id){ return `<div class="mfind"><b>Find a method</b> <span class="mfind-t">Tap a method to read it in the flowchart · ✏️ to practice it step by step</span>
 ${FIND.map(([g,L])=>`<div class="mfind-r"><span class="mfind-g">${g}</span>${L.map(([k,t,lab])=>`<span class="mfind-c"><button type="button" data-mfk="${k}" data-jump="sub-${id}-flow">${t}</button>${lab?`<button type="button" class="mfind-p" data-mfl="${lab}" data-jump="sub-${id}-${lab.startsWith("s3:")?"lab3":"methods"}" aria-label="Practice ${t} step by step">✏️</button>`:""}</span>`).join("")}</div>`).join("")}</div>`; }
function lab(){ return window.ZSYS?ZSYS.html({methods:["graph","sub","elim","cramer","inverse","elim3"],lead:"Practice each method one step at a time. Type numbers in the boxes: a box turns <span class=\"zs-ok\">green</span> when it's right and <span class=\"zs-no\">red</span> when it's not. For Gauss, Cramer 3 × 3 and Sarrus, use the 3 × 3 Lab."}):""; }
document.addEventListener("click",e=>{
  const k=e.target.closest("[data-mfk]"); if(k){ const sec=k.closest("section")||document; setTimeout(()=>{ const n=sec.querySelector(`.mf [data-fm="${k.dataset.mfk}"]`); if(n){ n.click(); setTimeout(()=>{ const d=n.closest(".mf")&&n.closest(".mf").nextElementSibling; const t=d||n; const off=(parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--navh"))||60)+20; window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-off,behavior:"smooth"}); },120); } },250); return; }
  const l=e.target.closest("[data-mfl]"); if(l){ const sec=l.closest("section")||document, v=l.dataset.mfl, s3=v.startsWith("s3:"); setTimeout(()=>{ const t=s3?sec.querySelector(`.s3lab .s3mode [data-m="${v.slice(3)}"]`):sec.querySelector(`.zs [data-zm="${v}"]`); if(t){ t.click(); const box=t.closest(s3?".s3lab":".zs"); const off=(parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--navh"))||60)+20; window.scrollTo({top:box.getBoundingClientRect().top+window.scrollY-off,behavior:"smooth"}); } },250); } },true);

/* ---------- practice inside each flowchart card ---------- */
const LABK={graph:"graph",sub:"sub",elim:"elim",cr2:"cramer",inv:"inverse",el3:"elim3"};
const S3K={gauss:"gauss",cr3:"sar",sar:"sar",form:"aug",cls:"cls",p3:"cls"};
const genBy=(u,name)=>{ const L=(window.A2GEN&&A2GEN.GEN[u])||[]; const g=L.find(x=>x[0]===name); return g?g[1]:null; };
const QUICK={nls:[["unit-3","Line–parabola systems"],["unit-11","Line–circle systems"]],nle:[["unit-11","Line–circle systems"],["unit-3","Line–parabola systems"]],p2:[["x","special"]]};
function quickFns(k){ return (QUICK[k]||[]).map(([u,n])=>u==="x"?(window.A2MOREGEN&&A2MOREGEN.MG[n]):genBy(u,n)).filter(Boolean); }
function quickHTML(){ return `<div class="mq"><div class="mq-o"></div><div class="mq-b"><button type="button" class="s3b" data-mq="new">↻ New problem</button></div></div>`; }
function quickRender(box,fns){ const f=fns[Math.floor(Math.random()*fns.length)]; let P=null; for(let i=0;i<20&&!P;i++){ try{ P=f(); }catch(e){} } if(!P) return; const fm=x=>window.A2PRACTICE?A2PRACTICE.fmt(String(x)):x;
  box.querySelector(".mq-o").innerHTML=`<p class="mq-q">${fm(P.q)}</p><details class="mq-s"><summary>Show solution</summary><div>${fm(P.a)}</div>${P.g&&window.A2PLOT?A2PLOT.plot(P.g):""}</details>`; }
function addPractice(d){ const k=d.dataset.k; if(!k||d.querySelector(".mf-prac")) return; const card=d.querySelector(".mf-dc"); if(!card) return;
  const name=(card.querySelector("h4")||{}).textContent||"this method"; let body="";
  if(LABK[k]&&window.ZSYS) body=ZSYS.html({methods:[LABK[k]],lead:`Solve a new system with ${name}, one step at a time. Each box turns <span class="zs-ok">green</span> when it's right and <span class="zs-no">red</span> when it's not.`});
  else if(S3K[k]&&window.A2S3) body=A2S3.html();
  else if(quickFns(k).length) body=quickHTML();
  if(!body) return;
  const div=document.createElement("div"); div.className="mf-prac"; div.innerHTML=`<h5>✏️ Practice: ${name}</h5>${body}`;
  const before=card.querySelector(".mf-tip,.fx-go:not(.mf-gen)"); before?card.insertBefore(div,before):card.appendChild(div);
  if(S3K[k]&&window.A2S3){ A2S3.bind(div); const b=div.querySelector(`.s3mode [data-m="${S3K[k]}"]`); if(b) b.click(); }
  if(!LABK[k]&&!S3K[k]){ const fns=quickFns(k), box=div.querySelector(".mq"); quickRender(box,fns); box.querySelector('[data-mq="new"]').onclick=()=>quickRender(box,fns); } }
const mo=new MutationObserver(()=>{ document.querySelectorAll('.mf[data-flow="sys"]').forEach(mf=>{ const d=mf.nextElementSibling; if(d) addPractice(d); }); });
const go=()=>mo.observe(document.body,{childList:true,subtree:true});
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",go); else go();
const css=`.mfind{border:1.5px solid #111;background:#fffbe8;padding:8px 12px 6px;margin:0 0 12px;font-size:16px}
.mfind>b{font-size:18px}.mfind-t{font-style:italic;color:#555;font-size:14.5px}
.mfind-r{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:6px 0}
.mfind-g{font-variant:small-caps;font-weight:700;letter-spacing:.05em;min-width:5.2em}
.mfind-c{display:inline-flex}
.mfind-c button{font:600 15.5px 'EB Garamond',Georgia,serif;border:1.5px solid #c2571a;color:#c2571a;background:#fff;padding:3px 11px;cursor:pointer;border-radius:999px}
.mfind-c button:hover{background:#c2571a;color:#fff}
.mfind-c button.mfind-p{border-radius:0 999px 999px 0;margin-left:-1.5px;padding:3px 8px}
.mfind-c button:first-child:not(:last-child){border-radius:999px 0 0 999px}
.mf-prac{margin:14px 0 6px;border-top:2px solid var(--c,#c2571a);padding-top:8px}
.mf-prac>h5{font-size:19px;margin:0 0 6px;color:var(--c,#c2571a)}
.mf-prac .s3lab>.lead2{display:none}
.mq-q{font-size:18px;margin:4px 0 8px}.mq-s summary{cursor:pointer;font-weight:700;color:#1d4e89}.mq-s>div{margin-top:6px}.mq-b{margin-top:8px}`;
const st=document.createElement("style"); st.textContent=css; document.head.appendChild(st);
window.A2METH={has,finder,lab};
})();
