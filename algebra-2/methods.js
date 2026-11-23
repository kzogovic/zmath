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
const css=`.mfind{border:1.5px solid #111;background:#fffbe8;padding:8px 12px 6px;margin:0 0 12px;font-size:16px}
.mfind>b{font-size:18px}.mfind-t{font-style:italic;color:#555;font-size:14.5px}
.mfind-r{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:6px 0}
.mfind-g{font-variant:small-caps;font-weight:700;letter-spacing:.05em;min-width:5.2em}
.mfind-c{display:inline-flex}
.mfind-c button{font:600 15.5px 'EB Garamond',Georgia,serif;border:1.5px solid #c2571a;color:#c2571a;background:#fff;padding:3px 11px;cursor:pointer;border-radius:999px}
.mfind-c button:hover{background:#c2571a;color:#fff}
.mfind-c button.mfind-p{border-radius:0 999px 999px 0;margin-left:-1.5px;padding:3px 8px}
.mfind-c button:first-child:not(:last-child){border-radius:999px 0 0 999px}`;
const st=document.createElement("style"); st.textContent=css; document.head.appendChild(st);
window.A2METH={has,finder,lab};
})();
