/* Stacked fractions: turns math written as a/b, 1/x, (x + 1)/(x − 2), 5π/6 … into a numerator over a denominator.
   Runs on everything the page shows, including content added later (quizzes, flashcards, generated problems). */
(function(){
  const st=document.createElement("style");
  st.textContent=`.fr{display:inline-flex;flex-direction:column;align-items:stretch;vertical-align:middle;text-align:center;font-size:.84em;line-height:1.12;margin:0 .1em;white-space:nowrap}
.fr>.fn{border-bottom:1.2px solid currentColor;padding:0 .18em .05em}
.fr>.fd{padding:.05em .18em 0}
.fr sup{font-size:.7em}`;
  document.head.appendChild(st);

  const SUP="(?:<su[pb]>[^<]{1,14}</su[pb]>)";
  const U="[²³⁴⁵⁶⁷⁸⁹¹⁰]*";
  const NUM="(?:√?[0-9]+(?:\\.[0-9]+)?!?(?:π|[A-Za-zθ][₀-₉]?"+U+"(?:[A-Za-z][₀-₉]?"+U+")?)?"+U+"|√?(?:π|θ|[A-Za-z][₀-₉]?"+U+"(?:[A-Za-z][₀-₉]?"+U+")?)|\\|[^|<]{1,10}\\|)";
  const GRP="√?\\((?:[^()<]|"+SUP+"|\\([^()<]*\\))+\\)";
  const ATOM="(?:"+GRP+SUP+"?|"+NUM+SUP+"?)";
  const RX=new RegExp("(?<![A-Za-z0-9_./:&#;=\"'])("+ATOM+")/("+ATOM+")(?![A-Za-z0-9_/(])","g");
  const strip=s=>{ // drop the outer parentheses of a whole group: (x + 1) → x + 1
    if(s[0]!=="("||s[s.length-1]!==")") return s;
    let d=0; for(let i=0;i<s.length;i++){ if(s[i]==="(") d++; else if(s[i]===")"){ d--; if(d===0&&i<s.length-1) return s; } }
    return s.slice(1,-1);
  };
  const frac=(n,d)=>`<span class="fr"><span class="fn">${strip(n)}</span><span class="fd">${strip(d)}</span></span>`;
  function convert(html){
    let out=html;
    for(let k=0;k<3;k++){ const nx=out.replace(RX,(m,n,d)=>frac(n,d)); if(nx===out) break; out=nx; }
    return out;
  }
  window.A2FRAC={convert,frac};

  const SKIP=new Set(["SCRIPT","STYLE","TEXTAREA","INPUT","CODE","PRE","A","SVG","CANVAS","SELECT","OPTION","TITLE","SUP","SUB","NOSCRIPT"]);
  const SAFE=new Set(["#text","SUP","SUB","B","I","EM","STRONG","SPAN","BR","SMALL"]);
  const skipAnc=el=>{ for(let e=el;e&&e!==document.body;e=e.parentElement){ if(SKIP.has(e.tagName)||e.isContentEditable||(e.classList&&e.classList.contains("fr"))||e.namespaceURI==="http://www.w3.org/2000/svg") return true; } return false; };
  const safeKids=el=>[...el.childNodes].every(c=>c.nodeType===3||c.nodeType===8||(SAFE.has(c.tagName)&&!(c.tagName==="SPAN"&&[...c.attributes].some(a=>a.name.startsWith("data-")||a.name==="id"))&&safeKids(c)));
  let busy=false;
  function process(root){
    if(!root||busy) return;
    const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.nodeValue.includes("/")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT});
    const targets=new Set(), lone=[];
    for(let n=w.nextNode();n;n=w.nextNode()){
      let p=n.parentElement; if(!p||skipAnc(p)) continue;
      // climb out of inline wrappers (b, i, span) so a fraction split across them is seen whole
      while(p.parentElement&&["B","I","EM","STRONG","SPAN","SMALL"].includes(p.tagName)&&!p.id&&![...p.attributes].some(a=>a.name.startsWith("data-"))&&safeKids(p.parentElement)&&!skipAnc(p.parentElement)&&p.parentElement!==document.body) p=p.parentElement;
      if(safeKids(p)) targets.add(p); else lone.push(n);
    }
    busy=true;
    try{
      processSvg(root.nodeType===1?root:document.body);
      targets.forEach(p=>{ const h=p.innerHTML, c=convert(h); if(c!==h) p.innerHTML=c; });
      lone.forEach(n=>{ if(!n.parentNode) return; const esc=n.nodeValue.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); const c=convert(esc); if(c!==esc){ const t=document.createElement("template"); t.innerHTML=c; n.replaceWith(t.content); } });
    } finally { busy=false; }
  }
  const NS="http://www.w3.org/2000/svg";
  const RXS=new RegExp(RX.source.replace(/<su\[pb\]>/g,"\u0000"),"g"); // same pattern, no tags inside SVG text
  function processSvg(root){
    const texts=root.querySelectorAll?[...root.querySelectorAll("svg text, svg tspan")]:[];
    if(root.tagName==="text"||root.tagName==="tspan") texts.push(root);
    texts.forEach(t=>{ [...t.childNodes].forEach(n=>{ if(n.nodeType!==3||!n.nodeValue.includes("/")) return; const v=n.nodeValue; RXS.lastIndex=0; if(!RXS.test(v)) return; RXS.lastIndex=0;
      const frag=document.createDocumentFragment(); let last=0, m;
      while((m=RXS.exec(v))){ if(m.index>last) frag.appendChild(document.createTextNode(v.slice(last,m.index)));
        const a=document.createElementNS(NS,"tspan"); a.setAttribute("dy","-0.42em"); a.setAttribute("style","font-size:74%"); a.setAttribute("class","frs"); a.textContent=strip(m[1]);
        const sl=document.createElementNS(NS,"tspan"); sl.setAttribute("dy","0.31em"); sl.setAttribute("class","frs"); sl.textContent="⁄";
        const c=document.createElementNS(NS,"tspan"); c.setAttribute("style","font-size:74%"); c.setAttribute("class","frs"); c.setAttribute("dy","0.11em"); c.textContent=strip(m[2]);
        const back=document.createElementNS(NS,"tspan"); back.setAttribute("dy","-0.11em"); back.setAttribute("class","frs"); back.textContent="\u200b";
        frag.append(a,sl,c,back); last=m.index+m[0].length; }
      if(last<v.length) frag.appendChild(document.createTextNode(v.slice(last)));
      n.replaceWith(frag); }); });
  }
  let queued=new Set(), raf=0;
  const flush=()=>{ raf=0; const q=[...queued]; queued.clear(); q.forEach(n=>{ if(n.isConnected) process(n.nodeType===3?n.parentElement:n); }); };
  const mo=new MutationObserver(ms=>{ if(busy) return; ms.forEach(m=>{ if(m.type==="characterData") queued.add(m.target); else m.addedNodes.forEach(n=>queued.add(n.nodeType===3?n.parentElement||n:n)); }); if(!raf) raf=requestAnimationFrame(flush); });
  const start=()=>{ process(document.body); mo.observe(document.body,{childList:true,subtree:true,characterData:true}); };
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",start); else start();
})();
