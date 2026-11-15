/* Unit 2 templates: Probability, Random Variables, and Probability Distributions (+ probability sets) */
(function(){
const {mc,S,f,setP}=ZB, G=window.ZG, add=fn=>mc[2].push(fn);
const binomSims=(R,n,p,k)=>Array.from({length:k},()=>{ let c=0; for(let i=0;i<n;i++) if(R.u()<p) c++; return c/n; });

/* 1. Simulation dotplot */
add(R=>{ const c=R.pick([{who:"A student claims a coin is biased toward heads.",n:40,p:0.5,obs:R.pick([26,27]),unit:"heads",what:"flips of a FAIR coin"},
 {who:"A basketball coach believes a player's free-throw rate has improved from her career rate of 70%.",n:50,p:0.7,obs:R.pick([41,42]),unit:"made free throws",what:"free throws by a 70% shooter"},
 {who:"A factory claims that 20% of its parts are defective. An inspector suspects the rate is lower.",n:60,p:0.2,obs:R.pick([6,7]),unit:"defective parts",what:"parts from a process with a 20% defect rate"}]);
 const sims=binomSims(R,c.n,c.p,100), ph=c.obs/c.n, lower=ph<c.p; const cnt=sims.filter(v=>lower?v<=ph+1e-9:v>=ph-1e-9).length;
 const lo=Math.max(0,Math.floor((c.p-0.25)*20)/20), hi=Math.min(1,Math.ceil((c.p+0.25)*20)/20);
 const conv=cnt<=5;
 return {calc:"no",q:`${c.who} In a sample of ${c.n}, there were ${c.obs} ${c.unit} (p̂ = ${f(ph,3)}). To judge the claim, a computer simulated 100 samples of ${c.n} ${c.what} and recorded the proportion of ${c.unit} in each. The dashed line marks ${f(ph,3)}.${G.dot(sims,{min:lo,max:hi,step:0.05,unit:1/c.n,r:3,xlab:`Simulated proportion (n = ${c.n})`,mark:ph,markLab:f(ph,3),lab:v=>v.toFixed(2)})}Which conclusion is most appropriate?`,
 ch:[conv?`About ${cnt} of the 100 simulated proportions are ${lower?"at or below":"at or above"} ${f(ph,3)}, so the observed result would be unusual if the claim were true; this is convincing evidence against it.`:`About ${cnt} of the 100 simulated proportions are ${lower?"at or below":"at or above"} ${f(ph,3)}, so a result like this is not unusual when the claim is true; this is not convincing evidence against it.`,
  `The simulation proves that the claim is ${conv?"false":"true"}.`,`The probability that the claim is true is about ${f(cnt/100,2)}.`,conv?`Because ${f(ph,3)} appears in the simulation, the result is not unusual, so there is no evidence against the claim.`:`Because ${f(ph,3)} is not at the center of the simulated values, the claim must be false.`],
 ex:`Count the simulated proportions ${lower?"at or below":"at or above"} ${f(ph,3)}: about ${cnt} of 100, an estimated p-value of about ${f(cnt/100,2)}. ${conv?"That is small, so the observed result is unlikely to occur by chance alone if the claim is true.":"That is not small, so results like this happen fairly often by chance when the claim is true."} A simulation never proves a claim, and ${f(cnt/100,2)} is the probability of a result this extreme ASSUMING the claim is true, not the probability that the claim is true.`}; });

/* 2. Segmented bar chart association */
add(R=>{ const c=R.pick([["where the adult lives",["Downtown","Suburbs"],["Car","Transit","Walk/bike"],"how they commute","by car",0],["grade level",["Juniors","Seniors"],["Yes","Undecided","No"],"whether they plan to attend a four-year college","yes",0],["age group",["Under 30","30–59","60+"],["Streaming","Cable","None"],"how they watch TV","by streaming",0]]);
 const k=c[1].length; const parts=c[1].map((_,i)=>{ const a=[0.2+(0.45/(k-1))*i+R.real(-0.04,0.04,2),0]; a[0]=Math.min(0.75,Math.max(0.1,a[0])); const b=+(R.real(0.15,0.35,2)).toFixed(2); a[1]=Math.min(b,0.95-a[0]); return [a[0],a[1],+(1-a[0]-a[1]).toFixed(2)]; });
 const assoc=Math.abs(parts[0][0]-parts[k-1][0])>0.15; const hiG=parts[0][0]>parts[k-1][0]?c[1][0]:c[1][k-1];
 return {calc:"no",q:`A random sample of adults was classified by ${c[0]} and ${c[3]}. The segmented bar chart shows the results.${G.segbar(c[1].map((l,i)=>({lab:l,parts:parts[i]})),c[2],{xlab:c[0][0].toUpperCase()+c[0].slice(1)})}Which of the following is supported by the graph?`,
 ch:[assoc?`There is an association between ${c[0]} and ${c[3]}: the distribution of responses differs substantially across groups (for example, the proportion choosing “${c[2][0]}” is higher for ${hiG}).`:`There appears to be little association, because the distributions of responses are similar across groups.`,
  `More ${c[1][0].toLowerCase()} than ${c[1][k-1].toLowerCase()} chose “${c[2][0]}”.`,`The variables are independent because every group has the same three response categories.`,`Exactly ${Math.round(parts[0][1]*100)}% of all adults in the sample chose “${c[2][1]}”.`],
 ex:`Each bar is a conditional distribution of ${c[3]} for one group. ${assoc?"The distributions differ substantially, so the variables are associated.":"The distributions are similar, so there is little evidence of association."} The graph shows proportions, not counts, so we can't compare numbers of people or find overall percentages without the group sizes.`}; });

/* 3. Mosaic plot reading */
add(R=>{ const groups=[{lab:"Freshmen",n:R.int(300,420)},{lab:"Sophomores",n:R.int(200,280)},{lab:"Juniors",n:R.int(120,180)}]; const p=[0.62,0.45,0.30].map(v=>+(v+R.real(-0.04,0.04,2)).toFixed(2));
 groups.forEach((g,i)=>g.parts=[p[i],+(1-p[i]).toFixed(2)]); const N=groups.reduce((s,g)=>s+g.n,0); const yes=groups.reduce((s,g)=>s+g.n*g.parts[0],0);
 return {calc:"help",q:`All students at a college who took an introductory course were asked whether they plan to take another statistics course. In the mosaic plot, the width of each bar is proportional to the number of students in that class year, and the heights show the proportions answering Yes and No.${G.mosaic(groups,["Yes","No"],{xlab:"Class year"})}Which statement is supported by the mosaic plot?`,
 ch:[`Freshmen make up the largest group of students, and the proportion planning another course decreases from freshmen to juniors.`,`The three class years have the same number of students, but different proportions planning another course.`,`More juniors than freshmen plan to take another course.`,`Class year and plans are independent, because every bar contains both Yes and No.`],
 ex:`In a mosaic plot, bar width shows group size: the Freshmen bar is widest, so freshmen are the largest group. The Yes proportions are about ${Math.round(p[0]*100)}%, ${Math.round(p[1]*100)}% and ${Math.round(p[2]*100)}%, decreasing across class years, so plans and class year are associated. Juniors are both the smallest group and the lowest proportion, so fewer juniors than freshmen say Yes. Overall, about ${Math.round(yes)} of ${N} students said Yes.`}; });

/* 4. Expected value interpretation */
add(R=>{ const cost=R.pick([2,3,5]), big=R.pick([10,20,25]), pb=R.pick([0.05,0.1]), small=cost, ps=R.pick([0.2,0.3]);
 const E=(big-cost)*pb+(small-cost)*ps+(-cost)*(1-pb-ps); if(Math.abs(E)<0.05) throw new Error("E≈0");
 return {calc:"help",q:`A carnival game costs $${cost} to play. A player wins $${big} with probability ${pb}, wins $${small} with probability ${ps}, and wins nothing otherwise. Let X = the player's net gain (amount won minus the cost). Which is the correct value and interpretation of E(X)?`,
 ch:[`E(X) = ${E<0?"−":""}$${f(Math.abs(E),2)}: over a large number of games, the average net gain per game is about ${E<0?"−":""}$${f(Math.abs(E),2)}.`,`E(X) = ${E<0?"−":""}$${f(Math.abs(E),2)}: in every game, the player's net gain is exactly ${E<0?"−":""}$${f(Math.abs(E),2)}.`,`E(X) = $${f(E+cost,2)}: over many games, the average net gain is $${f(E+cost,2)}.`,`E(X) = $0: the player either wins or loses, so the game is fair.`],
 ex:`Net gains are ${big-cost}, ${small-cost} and −${cost} with probabilities ${pb}, ${ps} and ${f(1-pb-ps,2)}. E(X) = ${big-cost}(${pb}) + ${small-cost}(${ps}) + (−${cost})(${f(1-pb-ps,2)}) = ${f(E,2)}. An expected value is a long-run average over many repetitions, not the result of a single game. $${f(E+cost,2)} is the expected amount won before subtracting the cost.`}; });

/* 5. Binomial conditions */
add(R=>{ const ok=R.pick(["X = the number of heads in 12 flips of a fair coin","X = the number of students out of 15 randomly selected from a large university who own a car, where 40% of the university's students own a car","X = the number of sixes in 20 rolls of a fair die"]);
 return {calc:"no",q:"In which situation does the random variable X have a binomial distribution (or approximately so)?",
 ch:[ok,"X = the number of red cards when 5 cards are dealt without replacement from a stack of 20 cards, 8 of which are red","X = the number of free throws a player attempts until she makes one","X = the total weight of 12 randomly selected apples"],
 ex:`Binomial requires a fixed number of trials, two outcomes per trial, the same probability of success on each trial, and independent trials (or sampling no more than 10% of a large population). The correct situation meets all four. Dealing 5 of only 20 cards without replacement changes the probability after each card, and 5 is 25% of 20. Counting attempts until the first success has no fixed number of trials. A total weight is not a count of successes.`}; });

/* 6. Binomial probability (at least / at most) */
add(R=>{ const c=R.pick([["Twenty percent of customers at a store use a coupon.",0.2,"customers","use a coupon"],["A basketball player makes 80% of her free throws, and shots are independent.",0.8,"free throws","are made"],["Thirty-five percent of adults in a large city have a library card.",0.35,"adults","have a library card"]]);
 const n=R.pick([8,10,12,15]), atLeast=R.chance(0.5), k=atLeast?Math.round(n*c[1])+1:Math.round(n*c[1])-1; const p=c[1];
 const val=atLeast?1-S.bcdf(n,p,k-1):S.bcdf(n,p,k), wrong1=atLeast?1-S.bcdf(n,p,k):S.bcdf(n,p,k-1), wrong2=S.bpdf(n,p,k), wrong3=1-val;
 return {calc:"rec",num:true,q:`${c[0]} In a random sample of ${n} ${c[2]}, what is the probability that ${atLeast?"at least":"at most"} ${k} ${c[3]}?`,
 ch:[f(val,3),f(wrong1,3),f(wrong2,3),f(wrong3,3)],
 ex:`X ~ Binomial(n = ${n}, p = ${p}). ${atLeast?`P(X ≥ ${k}) = 1 − P(X ≤ ${k-1})`:`P(X ≤ ${k})`} = ${f(val,3)}. Common errors: P(X = ${k}) = ${f(wrong2,3)} counts only exactly ${k}; using ${atLeast?`1 − P(X ≤ ${k})`:`P(X ≤ ${k-1})`} = ${f(wrong1,3)} leaves out ${k} itself; ${f(wrong3,3)} is the complement.`}; });

/* 7. Binomial mean & SD interpretation */
add(R=>{ const n=R.pick([50,80,120]), p=R.pick([0.1,0.15,0.25]); const mu=n*p, sd=Math.sqrt(n*p*(1-p));
 return {calc:"help",q:`Suppose ${Math.round(p*100)}% of all visitors to a website click on an ad. For random samples of ${n} visitors, let X = the number who click. Which statement correctly gives and interprets the standard deviation of X?`,
 ch:[`σ = ${f(sd,2)}: in repeated random samples of ${n} visitors, the number who click typically varies from the mean of ${f(mu,1)} by about ${f(sd,2)}.`,`σ = ${f(sd,2)}: about ${f(sd,2)} visitors in every sample will click.`,`σ = ${f(sd*sd,2)}: the number who click varies from ${f(mu,1)} by about ${f(sd*sd,2)}.`,`σ = ${f(Math.sqrt(p*(1-p)/n),3)}: the proportion who click varies by about ${f(Math.sqrt(p*(1-p)/n),3)}, which is the standard deviation of X.`],
 ex:`For a binomial distribution, μ = np = ${f(mu,1)} and σ = √[np(1 − p)] = √[${n}(${p})(${f(1-p,2)})] ≈ ${f(sd,2)}. The standard deviation describes how much the count typically varies from its mean across repeated samples. ${f(sd*sd,2)} is the variance, and √[p(1 − p)/n] is the standard deviation of the PROPORTION p̂, not of the count X.`}; });

/* 8. Normal: find sigma from a percentile */
add(R=>{ const mu=R.pick([500,350,1000]), pct=R.pick([0.025,0.05,0.10]), z=S.invNorm(pct), sig=R.pick([8,10,12,15]), x=Math.round(mu+z*sig);
 const s=(mu-x)/(-z); const zr=+(-z).toFixed(3);
 return {calc:"rec",num:true,q:`The amount of cereal a machine puts in boxes is approximately normal with mean ${mu} grams. The company finds that ${pct*100}% of boxes contain less than ${x} grams. What is the standard deviation of the amount of cereal per box?`,
 ch:[`About ${f(s,1)} grams`,`About ${f((mu-x)/1,1)} grams`,`About ${f((mu-x)/zr/2,1)} grams`,`About ${f((mu-x)*zr,1)} grams`],
 ex:`The ${pct*100}th percentile of a normal distribution has z = ${f(z,3)} (invNorm(${pct})). So ${x} = ${mu} + (${f(z,3)})σ, which gives σ = ${mu-x}/${f(-z,3)} ≈ ${f(s,1)} grams.`}; });

/* 9. Normal: probability between two values */
add(R=>{ const c=R.pick([["The heights of adult women in a country","inches",64,2.5],["The weights of eggs from a farm","grams",58,4],["Times to complete a puzzle","minutes",22,5]]); const mu=c[2], s=c[3];
 const a=+(mu-R.pick([0.5,1,1.2])*s).toFixed(1), b=+(mu+R.pick([0.8,1.5,2])*s).toFixed(1); const v=S.Phi((b-mu)/s)-S.Phi((a-mu)/s);
 return {calc:"rec",num:true,q:`${c[0]} are approximately normally distributed with mean ${mu} ${c[1]} and standard deviation ${s} ${c[1]}. What proportion are between ${a} and ${b} ${c[1]}?`,
 ch:[f(v,3),f(S.Phi((b-mu)/s),3),f(1-v,3),f(S.Phi((b-mu)/s)-0.5,3)],
 ex:`z = (${a} − ${mu})/${s} = ${f((a-mu)/s,2)} and z = (${b} − ${mu})/${s} = ${f((b-mu)/s,2)}. P = Φ(${f((b-mu)/s,2)}) − Φ(${f((a-mu)/s,2)}) ≈ ${f(v,3)}.`}; });

/* 10. CLT with a skewed population histogram */
add(R=>{ const mu=R.pick([80,60,45]), sig=R.pick([64,40,36]), n=R.pick([64,100,144]), small=4;
 return {calc:"no",q:`The histogram shows a population of household incomes (in $ thousands) in a town. It is strongly skewed to the right, with mean μ = ${mu} and standard deviation σ = ${sig}.${G.hist({start:0,width:40,counts:[34,28,16,9,6,4,2,1],xlab:"Household income ($ thousands)",ylab:"Percent of households",ystep:10,ymax:40,xstep:40})}How does the sampling distribution of the sample mean x̄ for samples of size n = ${n} compare with that for n = ${small}?`,
 ch:[`Both have mean ${mu}; for n = ${n} the standard deviation is ${f(sig/Math.sqrt(n),1)} and the shape is approximately normal, while for n = ${small} the shape is still skewed right.`,`For n = ${n} the mean is larger, and the shape is the same as the population's.`,`Both are approximately normal, because a sample mean is always normally distributed.`,`For n = ${n} the standard deviation is ${sig}, the same as the population's.`],
 ex:`The mean of x̄ is μ = ${mu} for every n. Its standard deviation is σ/√n: ${sig}/√${n} = ${f(sig/Math.sqrt(n),1)} for n = ${n} (and ${sig}/2 = ${sig/2} for n = 4). By the central limit theorem, x̄ is approximately normal for large n, but with n = 4 from a strongly skewed population, its sampling distribution is still skewed right.`}; });

/* 11. Mutually exclusive vs independent */
add(R=>{ const a=R.pick([0.2,0.3,0.4]), b=R.pick([0.3,0.5]);
 return {calc:"no",q:`Events A and B have P(A) = ${a} and P(B) = ${b}. If A and B are mutually exclusive, which statement must be true?`,
 ch:[`A and B are not independent.`,`A and B are independent.`,`P(A and B) = ${f(a*b,2)}`,`P(A or B) = ${f(a+b-a*b,2)}`],
 ex:`Mutually exclusive means P(A and B) = 0. If A and B were independent, P(A and B) would equal ${a} × ${b} = ${f(a*b,2)} ≠ 0. So mutually exclusive events with positive probabilities can't be independent: knowing A occurred tells you B did not. P(A or B) = ${a} + ${b} = ${f(a+b,2)}.`}; });

/* 12. Discrete random variable: mean and SD */
add(R=>{ const xs=[0,1,2,3,4]; let p=R.pick([[0.1,0.25,0.3,0.25,0.1],[0.3,0.3,0.2,0.15,0.05],[0.05,0.15,0.2,0.3,0.3]]); const mu=xs.reduce((s,x,i)=>s+x*p[i],0), sd=Math.sqrt(xs.reduce((s,x,i)=>s+(x-mu)**2*p[i],0));
 return {calc:"help",q:`Let X = the number of cars owned by a randomly selected household in a suburb. Its distribution is shown.<table class="tb"><tr><th>x</th>${xs.map(x=>`<td>${x}</td>`).join("")}</tr><tr><th>P(X = x)</th>${p.map(v=>`<td>${v}</td>`).join("")}</tr></table>What are the mean and standard deviation of X?`,
 ch:[`μ = ${f(mu,2)}, σ = ${f(sd,2)}`,`μ = 2.00, σ = ${f(S.sd(xs),2)}`,`μ = ${f(mu,2)}, σ = ${f(sd*sd,2)}`,`μ = ${f(mu,2)}, σ = ${f(S.sd(p),2)}`],
 ex:`μ = Σx·P(x) = ${f(mu,2)}. σ = √[Σ(x − μ)²·P(x)] = ${f(sd,2)}. ${f(sd*sd,2)} is the variance. Averaging the x-values (2.00) or taking the SD of the five values ignores the probabilities.`}; });

/* 13. Independence from a two-way table */
add(R=>{ const a=R.int(40,70), b=R.int(20,40), c2=R.int(30,60), d=R.int(40,80), N=a+b+c2+d; const pA=(a+c2)/N, pAgB=a/(a+b), ind=Math.abs(pA-pAgB)<0.005; if(ind) throw new Error("too close");
 return {calc:"help",q:`A random sample of ${N} adults was classified by whether they exercise regularly and whether they report good sleep.<table class="tb"><tr><th></th><th>Good sleep</th><th>Poor sleep</th><th>Total</th></tr><tr><th>Exercise</th><td>${a}</td><td>${b}</td><td>${a+b}</td></tr><tr><th>No exercise</th><td>${c2}</td><td>${d}</td><td>${c2+d}</td></tr><tr><th>Total</th><td>${a+c2}</td><td>${b+d}</td><td>${N}</td></tr></table>For a randomly selected adult from this sample, are the events “good sleep” and “exercises regularly” independent?`,
 ch:[`No, because P(good sleep | exercise) = ${f(pAgB,3)} is not equal to P(good sleep) = ${f(pA,3)}.`,`Yes, because both events can happen to the same person.`,`No, because the events are mutually exclusive.`,`Yes, because P(good sleep and exercise) = ${f(a/N,3)} is less than P(good sleep).`],
 ex:`Events are independent when P(A | B) = P(A). Here P(good sleep | exercise) = ${a}/${a+b} = ${f(pAgB,3)} but P(good sleep) = ${a+c2}/${N} = ${f(pA,3)}, so the events are not independent. They are not mutually exclusive, because ${a} adults are in both.`}; });

/* ================= probability sets (set P) ================= */
setP.push(R=>{ const c=R.pick([{who:"A clinic uses a quick screening test for a certain vitamin deficiency.",cond:"has the deficiency",pos:"tests positive",unit:"adult",ar:"an"},{who:"An email service uses a filter to flag spam.",cond:"is spam",pos:"is flagged",unit:"email",ar:"an"},{who:"A factory uses a sensor to detect faulty circuit boards.",cond:"is faulty",pos:"is flagged by the sensor",unit:"board",ar:"a"}]);
 const pr=R.pick([0.04,0.05,0.08]), sens=R.pick([0.9,0.95,0.98]), fp=R.pick([0.06,0.1,0.12]); const P=pr*sens+(1-pr)*fp, post=pr*sens/P, two=1-(1-P)**2;
 return {stem:`<p>${c.who} Of all ${c.unit}s, ${pr*100}% ${c.cond.replace("has","have").replace("is","are")}. When ${c.ar} ${c.unit} ${c.cond}, it ${c.pos} ${sens*100}% of the time. When ${c.ar} ${c.unit} does not, it still ${c.pos} ${fp*100}% of the time. ${c.ar==='an'?'An':'A'} ${c.unit} is selected at random.</p>`,
 qs:[{calc:"help",num:true,q:`What is the probability that the selected ${c.unit} ${c.pos}?`,ch:[f(P,3),f(pr*sens,3),f((1-pr)*fp,3),f(sens,3)],ex:`Two ways: ${c.cond} and ${c.pos}: (${pr})(${sens}) = ${f(pr*sens,4)}; does not and ${c.pos}: (${f(1-pr,2)})(${fp}) = ${f((1-pr)*fp,4)}. Total: ${f(P,4)} ≈ ${f(P,3)}.`},
  {calc:"help",num:true,q:`Given that the selected ${c.unit} ${c.pos}, what is the probability that it ${c.cond}?`,ch:[f(post,3),f(sens,3),f(pr*sens,3),f(1-post,3)],ex:`P(${c.cond} | ${c.pos}) = ${f(pr*sens,4)}/${f(P,4)} ≈ ${f(post,3)}. ${f(sens,3)} is the reverse conditional, P(${c.pos} | ${c.cond}). Because the condition is rare, many positives are false positives.`},
  {calc:"rec",num:true,q:`Two ${c.unit}s are selected at random and checked independently. What is the probability that at least one ${c.pos}?`,ch:[f(two,3),f(2*P,3),f(P*P,3),f(1-two,3)],ex:`P(neither) = (1 − ${f(P,3)})² = ${f((1-P)**2,3)}, so P(at least one) = 1 − ${f((1-P)**2,3)} = ${f(two,3)}. Adding ${f(P,3)} + ${f(P,3)} double-counts the case where both do.`}]}; });

setP.push(R=>{ const u=R.int(100,130), v=R.int(45,60), w=200-u-v, x=R.int(80,110), y=R.int(55,80), z=200-x-y; if(w<10||z<10) throw new Error("small");
 const N=400, iP=u+x, uP=u/200, pI=iP/N;
 return {stem:`<p>All 400 students at a school were surveyed about the type of phone they use. The results are shown by class group.</p><table class="tb"><tr><th></th><th>iPhone</th><th>Android</th><th>Other</th><th>Total</th></tr><tr><th>Underclass</th><td>${u}</td><td>${v}</td><td>${w}</td><td>200</td></tr><tr><th>Upperclass</th><td>${x}</td><td>${y}</td><td>${z}</td><td>200</td></tr><tr><th>Total</th><td>${u+x}</td><td>${v+y}</td><td>${w+z}</td><td>400</td></tr></table><p>One student is selected at random.</p>`,
 qs:[{calc:"no",num:true,q:"What is the probability that the student uses an Android phone, given that the student is an upperclassman?",ch:[f(y/200,3),f(y/400,3),f(y/(v+y),3),f((v+y)/400,3)],ex:`Restrict to the 200 upperclass students: ${y}/200 = ${f(y/200,3)}. ${f(y/400,3)} is P(Android and upperclass), and ${f(y/(v+y),3)} is P(upperclass | Android).`},
  {calc:"no",num:true,q:"What is the probability that the student uses an iPhone or is an upperclassman?",ch:[f((iP+200-x)/400,3),f((iP+200)/400,3),f(x/400,3),f(iP/400,3)],ex:`P(iPhone ∪ upper) = ${iP}/400 + 200/400 − ${x}/400 = ${iP+200-x}/400 = ${f((iP+200-x)/400,3)}. Not subtracting the overlap double-counts the ${x} upperclass iPhone users.`},
  {calc:"no",q:"Are the events “uses an iPhone” and “is an underclassman” independent?",ch:[Math.abs(uP-pI)<0.001?`Yes, because P(iPhone | underclass) = P(iPhone) = ${f(pI,3)}.`:`No, because P(iPhone | underclass) = ${f(uP,3)} is not equal to P(iPhone) = ${f(pI,3)}.`,`Yes, because both groups contain 200 students.`,`No, because the events are mutually exclusive.`,`Yes, because P(iPhone and underclass) is less than P(iPhone).`],ex:`Compare P(iPhone | underclass) = ${u}/200 = ${f(uP,3)} with P(iPhone) = ${iP}/400 = ${f(pI,3)}. ${Math.abs(uP-pI)<0.001?"They are equal, so the events are independent.":"They differ, so the events are not independent."} The events are not mutually exclusive (${u} students are in both).`}]}; });

setP.push(R=>{ const p=R.pick([0.3,0.4,0.6]), n=R.pick([10,12]); const k=Math.round(n*p);
 return {stem:`<p>A large school district reports that ${p*100}% of its students take a bus to school. A random sample of ${n} students from the district is selected. Let X = the number of students in the sample who take a bus.</p>`,
 qs:[{calc:"rec",num:true,q:`What is P(X = ${k})?`,ch:[f(S.bpdf(n,p,k),3),f(S.bcdf(n,p,k),3),f(p**k,3),f(1-S.bcdf(n,p,k),3)],ex:`X ~ Binomial(${n}, ${p}). P(X = ${k}) = C(${n},${k})(${p})^${k}(${f(1-p,1)})^${n-k} ≈ ${f(S.bpdf(n,p,k),3)}. ${f(S.bcdf(n,p,k),3)} is P(X ≤ ${k}).`},
  {calc:"rec",num:true,q:`What is the probability that MORE than ${k} of the students take a bus?`,ch:[f(1-S.bcdf(n,p,k),3),f(1-S.bcdf(n,p,k-1),3),f(S.bcdf(n,p,k),3),f(S.bpdf(n,p,k+1),3)],ex:`P(X > ${k}) = 1 − P(X ≤ ${k}) ≈ ${f(1-S.bcdf(n,p,k),3)}. 1 − P(X ≤ ${k-1}) would be P(X ≥ ${k}), which includes ${k}.`},
  {calc:"help",q:"Which is the best interpretation of the mean of X?",ch:[`If many random samples of ${n} students were taken, the average number who take a bus would be about ${f(n*p,1)}.`,`Exactly ${f(n*p,1)} students in every sample of ${n} take a bus.`,`${f(n*p,1)} is the most likely number in a sample, and no other values are possible.`,`The proportion of students who take a bus is ${f(n*p,1)}.`],ex:`μ = np = ${n}(${p}) = ${f(n*p,1)}. The mean is a long-run average over many samples, not a guaranteed value for one sample.`}]}; });
})();
