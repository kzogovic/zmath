/* Z-Math AP Statistics exam generator: core.
   Templates register in ZB. Each MC template is fn(R) returning {q, ch:[correct, wrong, wrong, wrong], ex, calc, num?}.
   Set templates return {stem, qs:[3 MC items]}. FRQ templates return an engine-ready FRQ object (id/parts/pts). */
(function(){
const ZB=window.ZB={mc:{1:[],2:[],3:[],4:[],5:[]},setP:[],setR:[],frq:{1:[],2:[],3:[],4:[]}};
/* ---------- seeded random ---------- */
function rng(seed){ let s=(seed>>>0)||1; const next=()=>{ s^=s<<13; s>>>=0; s^=s>>>17; s^=s<<5; s>>>=0; return s/4294967296; };
 const R={ u:next, int:(a,b)=>a+Math.floor(next()*(b-a+1)), pick:a=>a[Math.floor(next()*a.length)],
  real:(a,b,d=1)=>+(a+next()*(b-a)).toFixed(d), chance:p=>next()<p,
  shuffle:a=>{ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(next()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; },
  sample:(a,k)=>R.shuffle(a).slice(0,k),
  normal:()=>{ let u=0,v=0; while(!u)u=next(); while(!v)v=next(); return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v); } };
 return R; }
ZB.rng=rng;
/* ---------- statistics ---------- */
function lgamma(x){const c=[0.99999999999980993,676.5203681218851,-1259.1392167224028,771.32342877765313,-176.61502916214059,12.507343278686905,-0.13857109526572012,9.9843695780195716e-6,1.5056327351493116e-7];if(x<0.5)return Math.log(Math.PI/Math.sin(Math.PI*x))-lgamma(1-x);x-=1;let a=c[0];const t=x+7.5;for(let i=1;i<9;i++)a+=c[i]/(x+i);return 0.5*Math.log(2*Math.PI)+(x+0.5)*Math.log(t)-t+Math.log(a);}
function betacf(a,b,x){let qab=a+b,qap=a+1,qam=a-1,c=1,d=1-qab*x/qap;if(Math.abs(d)<1e-300)d=1e-300;d=1/d;let h=d;for(let m=1;m<=300;m++){const m2=2*m;let aa=m*(b-m)*x/((qam+m2)*(a+m2));d=1+aa*d;if(Math.abs(d)<1e-300)d=1e-300;c=1+aa/c;if(Math.abs(c)<1e-300)c=1e-300;d=1/d;h*=d*c;aa=-(a+m)*(qab+m)*x/((a+m2)*(qap+m2));d=1+aa*d;if(Math.abs(d)<1e-300)d=1e-300;c=1+aa/c;if(Math.abs(c)<1e-300)c=1e-300;d=1/d;const del=d*c;h*=del;if(Math.abs(del-1)<3e-14)break;}return h;}
function ibeta(x,a,b){if(x<=0)return 0;if(x>=1)return 1;const bt=Math.exp(lgamma(a+b)-lgamma(a)-lgamma(b)+a*Math.log(x)+b*Math.log(1-x));return x<(a+1)/(a+b+2)?bt*betacf(a,b,x)/a:1-bt*betacf(b,a,1-x)/b;}
function gammp(a,x){if(x<=0)return 0;if(x<a+1){let ap=a,sum=1/a,del=sum;for(let n=0;n<500;n++){ap++;del*=x/ap;sum+=del;if(Math.abs(del)<Math.abs(sum)*1e-15)break;}return sum*Math.exp(-x+a*Math.log(x)-lgamma(a));}let b=x+1-a,c=1e300,d=1/b,h=d;for(let i=1;i<500;i++){const an=-i*(i-a);b+=2;d=an*d+b;if(Math.abs(d)<1e-300)d=1e-300;c=b+an/c;if(Math.abs(c)<1e-300)c=1e-300;d=1/d;const del=d*c;h*=del;if(Math.abs(del-1)<1e-15)break;}return 1-Math.exp(-x+a*Math.log(x)-lgamma(a))*h;}
const S=ZB.S={
 Phi:z=>0.5*(1+Math.sign(z)*gammp(0.5,z*z/2)),
 tcdf:(t,df)=>{const p=0.5*ibeta(df/(df+t*t),df/2,0.5);return t>0?1-p:p;},
 chi2sf:(x,df)=>1-gammp(df/2,x/2),
 inv(f,a,lo,hi){for(let i=0;i<200;i++){const m=(lo+hi)/2;if(f(m)<a)lo=m;else hi=m;}return (lo+hi)/2;},
 invNorm:p=>S.inv(S.Phi,p,-10,10), invT:(p,df)=>S.inv(t=>S.tcdf(t,df),p,-100,100),
 C:(n,k)=>{let r=1;for(let i=1;i<=k;i++)r=r*(n-k+i)/i;return r;},
 bpdf:(n,p,k)=>S.C(n,k)*p**k*(1-p)**(n-k), bcdf:(n,p,k)=>{let s=0;for(let i=0;i<=k;i++)s+=S.bpdf(n,p,i);return s;},
 mean:a=>a.reduce((x,y)=>x+y,0)/a.length,
 sd:a=>{const m=S.mean(a);return Math.sqrt(a.reduce((x,y)=>x+(y-m)**2,0)/(a.length-1));},
 median:a=>{const b=a.slice().sort((x,y)=>x-y),n=b.length;return n%2?b[(n-1)/2]:(b[n/2-1]+b[n/2])/2;},
 quart:a=>{const b=a.slice().sort((x,y)=>x-y),n=b.length,h=Math.floor(n/2);return [S.median(b.slice(0,h)),S.median(b),S.median(b.slice(n%2?h+1:h))];},
 linreg:(xs,ys)=>{const mx=S.mean(xs),my=S.mean(ys);let sxy=0,sxx=0,syy=0;xs.forEach((x,i)=>{sxy+=(x-mx)*(ys[i]-my);sxx+=(x-mx)**2;syy+=(ys[i]-my)**2;});const b=sxy/sxx;return {a:my-b*mx,b,r:sxy/Math.sqrt(sxx*syy)};}
};
/* number formatting: f(x,d) fixed decimals with a true minus sign */
const f=ZB.f=(x,d=2)=>{ const s=(+x).toFixed(d); return s.replace(/^-/,"−"); };
ZB.pct=(x,d=0)=>f(x*100,d)+"%";
ZB.money=x=>"$"+Math.round(x).toLocaleString("en-US");
/* data with an exact least-squares line (a, b) and a chosen r²: used for scatterplots */
ZB.exactLine=(R,xs,a,b,r2,dp=1)=>{ const n=xs.length, mx=S.mean(xs); let e=xs.map(()=>R.normal());
 const proj=()=>{ const me=S.mean(e); e=e.map(v=>v-me); const sxe=xs.reduce((s,x,i)=>s+(x-mx)*e[i],0), sxx=xs.reduce((s,x)=>s+(x-mx)**2,0); e=e.map((v,i)=>v-sxe/sxx*(xs[i]-mx)); };
 proj(); const sst=xs.reduce((s,x)=>s+(b*(x-mx))**2,0), sse=sst*(1-r2)/r2, cur=e.reduce((s,v)=>s+v*v,0); e=e.map(v=>v*Math.sqrt(sse/cur));
 return xs.map((x,i)=>+(a+b*x+e[i]).toFixed(dp)); };
/* make distinct choices; correct first */
ZB.distinct=(arr)=>{ const out=[]; arr.forEach(c=>{ if(!out.includes(c)) out.push(c); }); return out; };

/* ---------- assembler ---------- */
const BLUE={1:10,2:6,3:9,4:7,5:4}; /* singles; plus 3 in set P (Unit 2) and 3 in set R (Unit 5) = 42 */
function finishMC(item,u,R,tag){ let ch=ZB.distinct(item.ch); if(ch.length<4) throw new Error("template "+tag+" gave duplicate choices");
 ch=ch.slice(0,4); const correct=ch[0];
 if(item.num){ const val=c=>parseFloat(String(c).replace("−","-").replace(/[^0-9.\-]/g,"")); ch=ch.slice().sort((x,y)=>val(x)-val(y)); } else if(!item.keep) ch=R.shuffle(ch);
 return {u,calc:item.calc||"no",q:item.q,ch,a:ch.indexOf(correct),ex:item.ex,src:tag,fixed:!!item.num}; }
ZB.build=function(seed,label){ const R=rng(seed*7919+13); const mc=[];
 const take=(u,k)=>{ const pool=R.shuffle(ZB.mc[u].map((fn,i)=>i)); const out=[]; for(const i of pool){ if(out.length>=k) break; try{ out.push(finishMC(ZB.mc[u][i](R),u,R,"U"+u+"#"+i)); }catch(e){ console.warn(e); } } return out; };
 const u1=take(1,BLUE[1]), u2=take(2,BLUE[2]), u3=take(3,BLUE[3]), u4=take(4,BLUE[4]), u5=take(5,BLUE[5]);
 const tryGet=(list,check)=>{ for(let k=0;k<40;k++){ try{ const v=R.pick(list)(R); if(check) check(v); return v; }catch(e){} } throw new Error("no valid template"); };
 const setOK=v=>v.qs.forEach(q=>{ if(ZB.distinct(q.ch).length<4) throw new Error("dup"); });
 const P=tryGet(ZB.setP,setOK), Rg=tryGet(ZB.setR,setOK);
 const sets={};
 const order=[...u1, ...u2.slice(0,2)]; const pStart=order.length+1;
 P.qs.forEach(q=>order.push(Object.assign(finishMC(q,2,R,"P"),{set:"P"}))); sets.P={range:`${pStart}–${pStart+2}`,stem:P.stem};
 order.push(...u2.slice(2),...u3,...u4,...u5); const rStart=order.length+1;
 Rg.qs.forEach(q=>order.push(Object.assign(finishMC(q,5,R,"R"),{set:"R"}))); sets.R={range:`${rStart}–${rStart+2}`,stem:Rg.stem};
 const frq=[1,2,3,4].map(k=>{ const F=tryGet(ZB.frq[k]); F.id=k; F.parts.forEach(p=>p.pts.forEach((pt,j)=>pt.id=`${k}${p.id}${j+1}`)); return F; });
 /* spread the key evenly over A-D: numeric items keep sorted order; others are moved to target letters */
 const cnt=[0,0,0,0]; order.forEach(q=>{ if(q.fixed) cnt[q.a]++; }); const free=order.filter(q=>!q.fixed); const tgt=[];
 for(let k=0;k<free.length;k++){ const m=Math.min(...cnt); const opts=[0,1,2,3].filter(i=>cnt[i]===m); const t=R.pick(opts); cnt[t]++; tgt.push(t); }
 const tg=R.shuffle(tgt); free.forEach((q,i)=>{ const t=tg[i]; if(t!==q.a){ [q.ch[q.a],q.ch[t]]=[q.ch[t],q.ch[q.a]]; q.a=t; } });
 order.forEach(q=>delete q.fixed);
 return {n:label,title:"Full-length practice exam",units:{"1":"Exploring One-Variable Data and Collecting Data","2":"Probability, Random Variables, and Probability Distributions","3":"Inference for Categorical Data: Proportions","4":"Inference for Quantitative Data: Means","5":"Regression Analysis"},sets,mc:order,frq}; };

/* ---------- shared rubric checks for FRQs ---------- */
ZB.CK={
 ACCEPT:[/accept(ed|ing|s)?\s+(the\s+)?(h\s*[0₀o]|h-?naught|null)/,"“Accepting H₀” is never correct. Say “fail to reject H₀”."],
 PROVE:[/\bprove/,"Statistics does not “prove” a claim. Say “convincing evidence”."],
 HSTAT:[/h\s*[0₀oaₐ]\s*:\s*(p̂|p\s*-?\s*hat|x̄|x\s*-?\s*bar)/,"A sample statistic (p̂ or x̄) appears in a hypothesis. Hypotheses must be about population parameters (p or μ)."],
 N30:[/n\s*[>≥]=?\s*30|\bclt\b|central limit/,"For proportions, n ≥ 30 and the CLT do not establish normality. Check counts ≥ 10."],
 RANDASSIGN:[/random(ly)?\s+assign|random\s+assignment|randomly\s+allocat/,"Say that the subjects were randomly assigned to treatments."],
 RANDSAMP:[/random(ly)?\s+(select|sampl|chos)|random\s+sample|\bsrs\b/,"State that the data come from a random sample."],
 PRED:[/predict|on average|estimat|expected/,"Interpretations from a regression line must describe the PREDICTED (or average) response."],
 CAUSE:[/caus/,"Causal language is not justified for observational data."],
 CONV:[/convincing evidence|sufficient evidence/,"Use “convincing evidence” language in the conclusion."],
 REJ:[/reject/,"State a formal decision: reject H₀ or fail to reject H₀."],
 CONF:[/confiden/,"State the confidence level in the interpretation."]
};
})();
