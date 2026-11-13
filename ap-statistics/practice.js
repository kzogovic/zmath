/* AP Statistics practice: regenerating MCQs, tasks, and study cards per unit */
(function(){
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const P=a=>a[Math.floor(Math.random()*a.length)];
const SH=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const f=(x,d=2)=>{let s=(+x).toFixed(d); if(s==="-0"+(d?"."+"0".repeat(d):""))s=s.slice(1); return s.replace("-","−");};
const g=x=>+(+x).toFixed(4)===Math.round(x)?String(Math.round(x)).replace("-","−"):f(x,2);
const fr=(a,b)=>`<span class="pf"><span>${a}</span><span>${b}</span></span>`;
const rt=x=>`√<span class="ov2">${x}</span>`;
function erf(x){const s=x<0?-1:1;x=Math.abs(x);const t=1/(1+0.3275911*x);const y=1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-0.284496736)*t+0.254829592)*t*Math.exp(-x*x);return s*y;}
const Phi=z=>0.5*(1+erf(z/Math.SQRT2));
const C=(n,k)=>{let r=1;for(let i=1;i<=k;i++)r=r*(n-k+i)/i;return r;};
function lg(z){const c=[676.5203681218851,-1259.1392167224028,771.32342877765313,-176.61502916214059,12.507343278686905,-0.13857109526572012,9.9843695780195716e-6,1.5056327351493116e-7];if(z<0.5)return Math.log(Math.PI/Math.sin(Math.PI*z))-lg(1-z);z-=1;let x=0.99999999999980993;for(let i=0;i<8;i++)x+=c[i]/(z+i+1);const t=z+7.5;return 0.5*Math.log(2*Math.PI)+(z+0.5)*Math.log(t)-t+Math.log(x);}
const tsf=(t,v)=>{const k=Math.exp(lg((v+1)/2)-lg(v/2))/Math.sqrt(v*Math.PI),pdf=x=>k*Math.pow(1+x*x/v,-(v+1)/2);const a=t,b=t+80,n=8000,h=(b-a)/n;let S=pdf(a)+pdf(b);for(let i=1;i<n;i++)S+=(i%2?4:2)*pdf(a+i*h);return S*h/3;};
const c3sf=x=>2*(1-Phi(Math.sqrt(x)))+Math.sqrt(2*x/Math.PI)*Math.exp(-x/2);
const TSTAR={9:2.262,11:2.201,14:2.145,15:2.131,19:2.093,24:2.064,29:2.045};

const MN=t=>typeof t==='string'?t.replace(/(^|[\s(=:·,\[])-(?=\d)/g,'$1−'):t;
/* build an MCQ: correct answer + distractors -> 5 unique shuffled choices */
function Q(q,a,d,ex){
  const seen=new Set([a]); const ds=[];
  for(const x of d){ if(!seen.has(x)){seen.add(x);ds.push(x);} if(ds.length===4)break; }
  const facs=[1.5,0.5,2,1.25,0.75,3,1.1,0.9,4,0.25]; let t=0;
  while(ds.length<4 && t<60){ const src=ds.length?ds[t%ds.length]:a, ms=[...a.matchAll(/−?\d+(\.\d+)?/g)];
    if(!ms.length) break; const m=ms[ms.length-1], dec=(m[1]||"").length-(m[1]?1:0), v=parseFloat(m[0].replace("−","-"));
    let nv=v*facs[t%facs.length]+(v===0?(t%2?1:-1)*(t+1)/2:0); let ns=(+nv).toFixed(Math.max(dec,0)); ns=ns.replace("-","−");
    const cand=a.slice(0,m.index)+ns+a.slice(m.index+m[0].length);
    if(!seen.has(cand)){seen.add(cand);ds.push(cand);} t++; }
  const ch=SH([a,...ds]).map(MN); return {q:MN(q),ch,ai:ch.indexOf(MN(a)),ex:MN(ex)};
}
const S=(q,a,d,ex)=>()=>Q(q,a,d,ex);   /* static question */

/* ======================= UNIT CONTENT ======================= */
const U={};

/* ---------- UNIT 1 ---------- */
U["unit-1"]={
mcq:[
S("A distribution of household incomes is strongly skewed to the right. Which statement is most likely true?","The mean is greater than the median.",["The mean is less than the median.","The mean and the median are equal.","The IQR is larger than the range.","The standard deviation is zero."],"In a right-skewed distribution the long tail of large values pulls the mean toward the tail. The median is resistant, so it stays closer to the bulk of the data."),
S("Which pair of statistics is resistant to outliers?","Median and IQR",["Mean and standard deviation","Mean and IQR","Median and range","Range and standard deviation"],"The median and IQR depend only on the middle of the ordered data, so extreme values barely affect them."),
S("Which of these variables is categorical?","Zip code of a student's home",["Height in centimeters","Number of siblings","Time to run a mile","Monthly phone bill in dollars"],"A zip code is a label. Numbers that are labels are categorical — finding their average makes no sense."),
S("Maya's test score is at the 85th percentile. What does this mean?","About 85% of the scores are at or below Maya's score.",["Maya answered 85% of the questions correctly.","Maya scored 85 points.","About 15% of the scores are at or below Maya's score.","Maya's z-score is 0.85."],"A percentile gives the percent of the distribution at or below a value — not a percent correct."),
S("In a normal distribution, about what percent of values lie between μ − σ and μ + 2σ?","81.5%",["68%","95%","47.5%","34%"],"From μ − σ to μ is 34%, and from μ to μ + 2σ is 47.5%. Total: 34% + 47.5% = 81.5%."),
S("Every value in a data set is increased by 10. What happens to the mean and the standard deviation?","The mean increases by 10; the standard deviation does not change.",["Both increase by 10.","The mean does not change; the SD increases by 10.","The mean increases by 10; the SD is multiplied by 10.","Neither changes."],"Adding a constant shifts every value (and the center) but does not change how spread out the values are."),
S("Which graph could hide the fact that a distribution has two separate clusters?","Boxplot",["Histogram","Dotplot","Stemplot","Back-to-back stemplot"],"A boxplot shows only the five-number summary, so gaps and clusters (bimodality) can be invisible."),
S("A complete description of a quantitative distribution should address:","Shape, center, variability, and unusual features, in context",["Only the mean and standard deviation","The number of observations and the mode","Shape and the sample size only","Center and the largest value only"],"Remember SOCS: Shape, Outliers (unusual features), Center, Spread — always in context."),
()=>{const m=R(50,90),s=R(4,12),k=P([-2,-1.5,-1,-0.5,0.5,1,1.25,1.5,2,2.5]),x=m+k*s;
 return Q(`Test scores have mean ${m} and standard deviation ${s}. A student scored ${g(x)}. What is the student's z-score?`,f(k),[f(-k),f(x/s),f((x-m)/(s*s)),f(k*2),f(k/2)],`z = ${fr("x − μ","σ")} = ${fr(g(x)+" − "+m,s)} = ${f(k)}. The score is ${f(Math.abs(k))} standard deviations ${k>0?"above":"below"} the mean.`);},
()=>{const q1=R(20,40),iqr=2*R(4,10),q3=q1+iqr,up=q3+1.5*iqr,lo=q1-1.5*iqr;
 return Q(`A data set has Q₁ = ${q1} and Q₃ = ${q3}. Using the 1.5 × IQR rule, which value would be an outlier?`,String(up+2),[String(up-1),String(q3+iqr),String(q3+2),String(q1-iqr)],`IQR = ${q3} − ${q1} = ${iqr}. Fences: ${q1} − 1.5(${iqr}) = ${g(lo)} and ${q3} + 1.5(${iqr}) = ${g(up)}. Only ${up+2} is beyond a fence.`);},
()=>{const m=R(20,60),s=R(3,9),a=P([2,3,1.5]),b=P([5,10,-4,12]);
 return Q(`A data set has mean ${m} and SD ${s}. Each value is transformed by y = ${a}x ${b<0?"− "+(-b):"+ "+b}. What are the new mean and SD?`,`mean ${g(a*m+b)}, SD ${g(a*s)}`,[`mean ${g(a*m+b)}, SD ${g(a*s+b)}`,`mean ${g(a*m)}, SD ${g(a*s)}`,`mean ${g(m+b)}, SD ${s}`,`mean ${g(a*m+b)}, SD ${s}`],`Multiplying by ${a} multiplies the center and the spread by ${a}. Adding ${b} shifts only the center. Mean: ${a}(${m}) ${b<0?"−":"+"} ${Math.abs(b)} = ${g(a*m+b)}. SD: ${a}(${s}) = ${g(a*s)}.`);},
()=>{const mu=R(40,120),sg=R(5,20),k=P([0.5,1,1.25,1.5,2,-0.5,-1,-1.5]),c=mu+k*sg,p=1-Phi(k);
 return Q(`X is approximately normal with μ = ${mu} and σ = ${sg}. Find P(X > ${g(c)}).`,f(p,4),[f(1-p,4),f(1-Phi(k+0.5),4),f(1-Phi(k-0.5),4),f(Math.abs(k)/10,4)],`z = ${fr(g(c)+" − "+mu,sg)} = ${f(k)}. P(Z > ${f(k)}) = 1 − ${f(Phi(k),4)} = ${f(p,4)}.`);},
],
tasks:[
()=>{const m=R(60,80),s=R(5,10),a=m+R(1,3)*s/2*(P([1,-1])),b=R(15,25)*10,mb=b+R(-30,30),sb=R(20,40),xb=mb+R(1,4)*sb/2;
 const za=(a-m)/s,zb=(xb-mb)/sb;
 return {t:`On a history test (mean ${m}, SD ${s}) Ana scored ${g(a)}. On a math test (mean ${mb}, SD ${sb}) she scored ${g(xb)}. On which test did she do better relative to the class? Justify with z-scores.`,
 s:`History: z = ${fr(g(a)+" − "+m,s)} = ${f(za)}.<br>Math: z = ${fr(g(xb)+" − "+mb,sb)} = ${f(zb)}.<br>She did better on the <b>${zb>za?"math":"history"}</b> test relative to the class, because her z-score there is higher (${f(Math.max(za,zb))} vs ${f(Math.min(za,zb))}).`};},
()=>{const mn=R(2,10),q1=mn+R(4,10),med=q1+R(3,8),q3=med+R(3,8),iqr=q3-q1,mx=q3+Math.round(1.5*iqr)+P([-3,4,9]);const up=q3+1.5*iqr;
 return {t:`The five-number summary of the number of hours students worked last week is: min = ${mn}, Q₁ = ${q1}, median = ${med}, Q₃ = ${q3}, max = ${mx}. Are there any outliers? Show your work.`,
 s:`IQR = ${q3} − ${q1} = ${iqr}.<br>Lower fence = ${q1} − 1.5(${iqr}) = ${g(q1-1.5*iqr)}; upper fence = ${q3} + 1.5(${iqr}) = ${g(up)}.<br>Min ${mn} ${mn<q1-1.5*iqr?"is":"is not"} below the lower fence. Max ${mx} ${mx>up?"<b>is</b> above the upper fence, so there is at least one high outlier":"is not above the upper fence, so there are <b>no outliers</b>"}.`};},
()=>{const mu=R(150,180),sg=R(5,10),a=mu-R(1,3)*sg/2*2/2,b=mu+R(2,4)*sg/2;const za=(a-mu)/sg,zb=(b-mu)/sg,p=Phi(zb)-Phi(za);
 return {t:`Heights of adult women in a country are approximately normal with mean ${mu} cm and SD ${sg} cm. What proportion of women are between ${g(a)} cm and ${g(b)} cm tall?`,
 s:`z₁ = ${fr(g(a)+" − "+mu,sg)} = ${f(za)}, z₂ = ${fr(g(b)+" − "+mu,sg)} = ${f(zb)}.<br>P(${f(za)} < Z < ${f(zb)}) = ${f(Phi(zb),4)} − ${f(Phi(za),4)} = <b>${f(p,4)}</b>.<br>On a calculator: normalcdf(${g(a)}, ${g(b)}, ${mu}, ${sg}).`};},
],
cards:[["Shape words","Symmetric, skewed left/right, unimodal, bimodal, uniform"],["Resistant measures","Median and IQR (not affected much by outliers)"],["1.5 × IQR rule","Outlier if below Q₁ − 1.5·IQR or above Q₃ + 1.5·IQR"],["z-score",`z = ${fr("x − μ","σ")} — number of SDs above/below the mean`],["Empirical rule","68% within 1σ, 95% within 2σ, 99.7% within 3σ"],["Percentile","Percent of values at or below a given value"],["Skewed right","Mean > median (tail pulls the mean)"],["Linear transformation y = a + bx","Center and location ×b then +a; spread ×|b| only"],["Describe a distribution","Shape, Outliers, Center, Spread — in context"],["Categorical vs quantitative","Categorical = labels/groups; quantitative = numbers you can average"]]
};

/* ---------- UNIT 2 ---------- */
U["unit-2"]={
mcq:[
S("A scatterplot shows a correlation of r = −0.87 between two variables. Which best describes the association?","Strong, negative, linear",["Weak, negative, linear","Strong, positive, linear","Strong, negative, curved","No association"],"|r| close to 1 means strong; the negative sign means that as x increases, y tends to decrease. r measures linear association."),
S("For a least-squares line, r² = 0.64. Which interpretation is correct?","64% of the variation in y is accounted for by the linear model with x.",["64% of the predictions are correct.","The correlation is 0.64.","The slope is 0.64.","64% of the points lie on the line."],"r² is the proportion of variation in the response explained by the linear relationship with the explanatory variable. Here r = ±0.8."),
S("A residual plot shows a clear curved (U-shaped) pattern. What does this suggest?","A linear model is not appropriate.",["The linear model is a good fit.","The correlation is close to 1.","There are no outliers.","The slope is negative."],"A good linear model leaves residuals scattered randomly around 0. A curved pattern means the relationship is not linear."),
S("Which point always lies on the least-squares regression line?","(x̄, ȳ)",["(0, 0)","(0, ȳ)","(x̄, 0)","The point with the largest residual"],"Because a = ȳ − b·x̄, the line always passes through the point of means."),
S("Heights are converted from inches to centimeters. What happens to the correlation between height and weight?","It does not change.",["It is multiplied by 2.54.","It is divided by 2.54.","It becomes 1.","It changes sign."],"Correlation has no units, so changing units (a linear transformation with positive slope) does not change r."),
S("A point with an x-value far from the other points that does not follow the pattern is most likely:","Influential — removing it would change the slope a lot.",["A point with a residual of 0","Unimportant for the regression","The point (x̄, ȳ)","Evidence that r = 0"],"Points with extreme x-values have high leverage; if they don't follow the pattern they can strongly change the slope."),
S("A regression was built for children aged 2–10. Using it to predict the height of a 30-year-old is an example of:","Extrapolation",["Interpolation","Random assignment","Stratification","A residual"],"Predicting outside the range of x-values used to build the model is extrapolation and is unreliable."),
S("Cities with more fire trucks tend to have more fires. Which conclusion is best?","A lurking variable such as city size may explain the association.",["Fire trucks cause fires.","Fires cause fire trucks.","r must be close to 0.","The association is negative."],"Association does not imply causation. Bigger cities have more trucks and more fires."),
()=>{const r=P([0.4,0.5,0.6,0.7,0.8,-0.6,-0.5]),sx=R(2,8),sy=R(5,20),b=r*sy/sx;
 return Q(`For a data set, r = ${r}, sₓ = ${sx}, and s_y = ${sy}. What is the slope of the least-squares line for predicting y from x?`,f(b,3),[f(r*sx/sy,3),f(sy/sx,3),f(r*r*sy/sx,3),f(-b,3)],`b = r · ${fr("s_y","sₓ")} = ${r} · ${fr(sy,sx)} = ${f(b,3)}.`);},
()=>{const a=R(5,40),b=P([1.5,2,2.5,3,-1.5,-2]),x=R(5,20),yh=a+b*x,res=P([-6,-4,-3,3,4,5,7]),y=yh+res;
 return Q(`The regression line is ŷ = ${a} ${b<0?"− "+(-b):"+ "+b}x. One point is (${x}, ${g(y)}). What is its residual?`,g(res),[g(-res),g(yh),g(y),g(res*2)],`Predicted: ŷ = ${a} ${b<0?"−":"+"} ${Math.abs(b)}(${x}) = ${g(yh)}. Residual = actual − predicted = ${g(y)} − ${g(yh)} = ${g(res)}.`);},
()=>{const xb=R(10,30),yb=R(40,90),b=P([1.2,1.5,2,2.5,-1.5]),a=yb-b*xb;
 return Q(`x̄ = ${xb}, ȳ = ${yb}, and the slope of the LSRL is ${b}. What is the y-intercept?`,g(a),[g(yb+b*xb),g(yb-b),g(xb-b*yb),g(yb)],`a = ȳ − b·x̄ = ${yb} − (${b})(${xb}) = ${g(a)}.`);},
()=>{const j=R(60,100),s=R(80,140),jy=R(15,j-20),sy=R(20,s-30),tot=jy+sy;
 return Q(`In a school survey, ${j} juniors and ${s} seniors were asked if they play a sport; ${jy} juniors and ${sy} seniors said yes. What proportion of the students who play a sport are seniors?`,f(sy/tot,3),[f(sy/s,3),f(sy/(j+s),3),f(jy/tot,3),f(s/(j+s),3)],`Condition on "plays a sport": ${jy} + ${sy} = ${tot} students. Seniors among them: ${fr(sy,tot)} = ${f(sy/tot,3)}.`);},
],
tasks:[
()=>{const xb=R(10,20),yb=R(50,80),sx=R(2,5),sy=R(6,15),r=P([0.6,0.7,0.8,0.9]),b=r*sy/sx,a=yb-b*xb,x=xb+R(-4,4),y=Math.round(a+b*x+P([-5,-3,2,4,6]));
 return {t:`Hours studied (x) and test score (y): x̄ = ${xb}, sₓ = ${sx}, ȳ = ${yb}, s_y = ${sy}, r = ${r}.<br>(a) Find the equation of the LSRL. (b) Predict the score for ${x} hours. (c) A student who studied ${x} hours scored ${y}. Find and interpret the residual. (d) Interpret r².`,
 s:`(a) b = r·${fr("s_y","sₓ")} = ${r}·${fr(sy,sx)} = ${f(b,3)}; a = ȳ − b·x̄ = ${yb} − (${f(b,3)})(${xb}) = ${f(a,3)}. <b>ŷ = ${f(a,2)} ${b<0?"−":"+"} ${f(Math.abs(b),3)}x</b>.<br>(b) ŷ = ${f(a+b*x,2)}.<br>(c) Residual = ${y} − ${f(a+b*x,2)} = <b>${f(y-(a+b*x),2)}</b>. The student scored ${f(Math.abs(y-(a+b*x)),2)} points ${y>a+b*x?"higher":"lower"} than predicted by the line.<br>(d) r² = ${f(r*r,2)}: about ${Math.round(r*r*100)}% of the variation in test scores is accounted for by the linear relationship with hours studied.`};},
()=>{let b=P([2.4,3.1,0.85,1.6]),a=R(10,60),ctx=P([["age of a used car (years)","price (thousands of dollars)"],["temperature (°F)","number of iced coffees sold"],["hours of practice","number of free throws made"]]);if(ctx[0].startsWith("age")&&b>0)b=-b;
 return {t:`A regression of ${ctx[1]} (y) on ${ctx[0]} (x) gives ŷ = ${a} ${b<0?"− "+(-b):"+ "+b}x. Interpret the slope and the y-intercept in context. Is the intercept meaningful?`,
 s:`<b>Slope:</b> for each 1-unit increase in ${ctx[0]}, the <i>predicted</i> ${ctx[1]} ${b<0?"decreases":"increases"} by about ${Math.abs(b)}.<br><b>Intercept:</b> when ${ctx[0]} is 0, the predicted ${ctx[1]} is ${a}.<br>The intercept is meaningful only if x = 0 is reasonable and within the range of the data; otherwise using it is extrapolation.`};},
],
cards:[["Describe a scatterplot","Direction, form, strength, unusual features — in context (DOFS)"],["Correlation r","Strength and direction of a LINEAR association; −1 ≤ r ≤ 1; no units"],["LSRL slope",`b = r · ${fr("s_y","sₓ")}`],["LSRL intercept","a = ȳ − b·x̄ (line passes through (x̄, ȳ))"],["Residual","actual − predicted = y − ŷ"],["r²","% of variation in y explained by the linear model with x"],["Residual plot","Random scatter → linear model is appropriate; pattern → not"],["s (residual SD)","Typical size of a prediction error"],["Extrapolation","Predicting outside the range of x data — unreliable"],["Influential point","Removing it changes the slope/correlation a lot (often extreme x)"]]
};

/* ---------- UNIT 3 ---------- */
U["unit-3"]={
mcq:[
S("A principal divides students by grade level and takes a simple random sample of 25 students from each grade. This is a:","Stratified random sample",["Cluster sample","Simple random sample","Systematic random sample","Convenience sample"],"Strata (grades) are formed first, then an SRS is taken from every stratum."),
S("A school randomly selects 5 homerooms and surveys every student in those homerooms. This is a:","Cluster sample",["Stratified random sample","Simple random sample","Voluntary response sample","Census"],"Groups (clusters) are chosen at random and every member of the chosen groups is surveyed."),
S("A radio show asks listeners to call in and give their opinion. The results are most likely biased because of:","Voluntary response",["Undercoverage only","Random assignment","Blocking","Response bias from the wording"],"People who choose to respond usually have strong (often negative) opinions."),
S("Researchers find that people who drink more coffee have higher rates of heart disease. Why can't they conclude that coffee causes heart disease?","It is an observational study, so confounding variables (such as smoking) may explain the link.",["The sample was too large.","Correlation proves causation only if r > 0.9.","There was no placebo.","Heart disease is categorical."],"Only a well-designed experiment with random assignment can show cause and effect."),
S("What is the main purpose of random assignment in an experiment?","To create roughly equivalent groups so that differences in the response can be attributed to the treatments",["To allow results to be generalized to a population","To reduce the sample size","To make the experiment double-blind","To remove the need for a control group"],"Random assignment balances confounding variables across groups → cause-and-effect conclusions. Random <i>sampling</i> is what allows generalizing."),
S("In an experiment comparing two fertilizers, plots are first grouped by soil type and then fertilizers are randomly assigned within each soil type. The purpose of grouping by soil type is to:","Reduce variability in the response caused by soil type",["Increase bias","Allow generalization to all farms","Make the study observational","Create a placebo"],"This is blocking. Comparing treatments within similar units removes soil-type variation from the comparison."),
S("A study uses each subject as their own control by giving both treatments in random order. This design is called:","Matched pairs",["Completely randomized","Stratified sample","Cluster design","Observational study"],"Each subject receives both treatments, so differences between treatments are measured within the same person."),
S("In a double-blind experiment:","Neither the subjects nor the people measuring the response know which treatment each subject received.",["Only the subjects know their treatment.","The experiment has two control groups.","Subjects are chosen twice.","Each subject gets two treatments."],"Double-blinding prevents both placebo effects and biased evaluation."),
S("A telephone survey uses a list of home landline numbers. Which bias is the biggest concern?","Undercoverage",["Response bias","Nonresponse bias only","Voluntary response","Placebo effect"],"Households with only cell phones are excluded from the sampling frame."),
S("Volunteers were randomly assigned to two diets. Diet A led to significantly more weight loss. Which conclusion is appropriate?","Diet A causes more weight loss for people like these volunteers.",["Diet A causes more weight loss for all adults.","There is no causation since volunteers were used.","Diet A is associated with weight loss but not causally.","Nothing can be concluded."],"Random assignment → causation. No random sampling → generalize only to people similar to the volunteers."),
S("A survey question asks, “Don't you agree that the school day is too long?” This wording is likely to cause:","Response bias",["Undercoverage","Nonresponse bias","Sampling variability","Confounding"],"Leading wording pushes respondents toward a particular answer."),
()=>{const n=P([40,60,80,100]);
 return Q(`An experimenter has ${n} volunteers and two treatments. Which method correctly assigns ${n/2} volunteers to each treatment?`,`Number the volunteers 1–${n}, use a random number generator to pick ${n/2} different numbers for treatment A; the rest get treatment B.`,[`Let volunteers choose the treatment they prefer.`,`Put the first ${n/2} volunteers who arrive in treatment A.`,`Flip a coin for each volunteer (heads = A, tails = B).`,`Assign the ${n/2} tallest volunteers to treatment A.`],`A random number generator with no repeats guarantees equal group sizes and randomness. Coin flips are random but may not give exactly ${n/2} per group.`);},
],
tasks:[
()=>{const n=P([30,40,50,60]),t=P(["a new energy drink vs. water on reaction time","a new study app vs. traditional flashcards on vocabulary scores","two types of running shoes on 100 m sprint times"]);
 return {t:`Describe how to carry out a completely randomized experiment with ${n} volunteers to compare ${t}. Include how you would randomly assign treatments.`,
 s:`1. Number the volunteers 1 to ${n}.<br>2. Use a random number generator to select ${n/2} different integers from 1–${n} (ignore repeats). Those volunteers get treatment 1; the remaining ${n/2} get treatment 2.<br>3. Apply the treatments under the same conditions and measure the response for every volunteer.<br>4. Compare the mean responses of the two groups.<br><i>Key ideas:</i> random assignment, replication (${n/2} per group), control of other variables.`};},
()=>{const sc=P([["A magazine invites readers to vote online on whether the city should build a new stadium.","Voluntary response bias: people with strong opinions choose to respond, so the result likely overstates the strongest view."],["A survey about school lunches interviews the first 50 students in the cafeteria line.","Convenience sampling: students in line chose to buy lunch and likely like it more, so satisfaction is overestimated."],["A poll mails a survey to 2,000 homes; only 350 are returned.","Nonresponse bias: those who did not respond may have different opinions than those who did."],["Students are asked in front of their teacher whether they cheated on homework.","Response bias: students may not answer truthfully, so cheating is underestimated."]]);
 return {t:`Identify the type of bias and explain how it could affect the results:<br><i>${sc[0]}</i>`,s:sc[1]};},
],
cards:[["SRS","Every group of n individuals has an equal chance to be chosen"],["Stratified sample","Split into similar groups (strata), then SRS from each"],["Cluster sample","Randomly choose whole groups; survey everyone in them"],["Undercoverage","Some groups are left out of the sampling frame"],["Nonresponse","Selected individuals can't be reached or refuse"],["Response bias","Wording, interviewer, or dishonest answers distort results"],["Random assignment","Allows cause-and-effect conclusions"],["Random sampling","Allows generalization to the population"],["Blocking","Group similar units, randomize within blocks to reduce variability"],["Confounding","Two variables' effects on the response can't be separated"],["Placebo / blinding","Fake treatment / not knowing treatment — controls expectations"]]
};

/* ---------- UNIT 4 ---------- */
U["unit-4"]={
mcq:[
S("Events A and B are mutually exclusive, and P(A) > 0, P(B) > 0. Which statement is true?","A and B cannot be independent.",["A and B must be independent.","P(A and B) = P(A)·P(B)","P(A or B) = P(A)·P(B)","P(A | B) = P(A)"],"If they are mutually exclusive, P(A | B) = 0 ≠ P(A), so knowing B occurred changes the chance of A."),
S("The law of large numbers says that:","As the number of trials increases, the relative frequency of an outcome gets closer to its true probability.",["After a run of heads, tails becomes more likely.","Small samples always give the true probability.","Probabilities add to more than 1 in the long run.","Every outcome eventually happens equally often in a few trials."],"Long-run relative frequency converges to the probability; there is no short-run “law of averages.”"),
S("Which situation is a binomial setting?","Counting the number of 6s in 20 rolls of a fair die",["Rolling a die until a 6 appears","Counting the number of aces when drawing 5 cards without replacement from a deck","Measuring the weight of 20 apples","Recording the time until a bus arrives"],"BINS: Binary outcomes, Independent trials, fixed Number of trials, Same probability of success."),
()=>{const a=P([0.2,0.3,0.4,0.5,0.6]),b=P([0.25,0.3,0.5,0.7]);const and=a*b,or=a+b-and;
 return Q(`Events A and B are independent with P(A) = ${a} and P(B) = ${b}. Find P(A or B).`,f(or,3),[f(a+b,3),f(and,3),f(1-and,3),f(1-or,3)],`P(A and B) = ${a}(${b}) = ${f(and,3)} (independent). P(A or B) = ${a} + ${b} − ${f(and,3)} = ${f(or,3)}.`);},
()=>{const v=SH([0,1,2,3]).slice(0,3).sort(),p=P([[0.5,0.3,0.2],[0.2,0.5,0.3],[0.1,0.6,0.3],[0.4,0.4,0.2]]);const e=v[0]*p[0]+v[1]*p[1]+v[2]*p[2];
 return Q(`A random variable X takes values ${v.join(", ")} with probabilities ${p.join(", ")}. What is E(X)?`,f(e,2),[f((v[0]+v[1]+v[2])/3,2),f(e+0.5,2),f(v[1],2),f(p[0]*v[2]+p[2]*v[0]+p[1]*v[1],2)],`E(X) = Σ x·P(x) = ${v.map((x,i)=>x+"("+p[i]+")").join(" + ")} = ${f(e,2)}.`);},
()=>{const n=P([10,20,25,40,50]),p=P([0.2,0.3,0.4,0.6]);const m=n*p,s=Math.sqrt(n*p*(1-p));
 return Q(`X is binomial with n = ${n} and p = ${p}. What are the mean and standard deviation of X?`,`μ = ${g(m)}, σ = ${f(s)}`,[`μ = ${g(m)}, σ = ${f(n*p*(1-p))}`,`μ = ${g(m)}, σ = ${f(Math.sqrt(n*p))}`,`μ = ${g(n*(1-p))}, σ = ${f(s)}`,`μ = ${p}, σ = ${f(Math.sqrt(p*(1-p)))}`],`μ = np = ${n}(${p}) = ${g(m)}. σ = ${rt("np(1−p)")} = ${rt(n+"("+p+")("+g(1-p)+")")} = ${f(s)}.`);},
()=>{const n=P([5,6,8,10]),p=P([0.2,0.25,0.3,0.4]),k=R(1,3);const pr=C(n,k)*p**k*(1-p)**(n-k);
 return Q(`A basketball player makes ${p*100}% of her three-point shots. Assuming independent shots, what is the probability she makes exactly ${k} of her next ${n} shots?`,f(pr,4),[f(p**k*(1-p)**(n-k),4),f(C(n,k)*p**k,4),f(k/n,4),f(1-pr,4)],`P(X = ${k}) = (${n} choose ${k})(${p})^${k}(${g(1-p)})^${n-k} = ${C(n,k)}(${f(p**k,4)})(${f((1-p)**(n-k),4)}) = ${f(pr,4)}. Calculator: binompdf(${n}, ${p}, ${k}).`);},
()=>{const p=P([0.1,0.2,0.25,0.3]),k=R(2,5);const pr=(1-p)**(k-1)*p;
 return Q(`Each box of cereal has probability ${p} of containing a prize. What is the probability that the first prize is found in box number ${k}?`,f(pr,4),[f(p**(k-1)*(1-p),4),f((1-p)**k,4),f(1-(1-p)**k,4),f(p*k,4)],`Geometric: the first ${k-1} boxes fail and box ${k} succeeds: (${g(1-p)})^${k-1}(${p}) = ${f(pr,4)}.`);},
()=>{const p=P([0.05,0.1,0.15,0.2]),n=P([3,4,5,6,8]);const pr=1-(1-p)**n;
 return Q(`The probability that a light bulb is defective is ${p}. If ${n} bulbs are chosen independently, what is the probability that at least one is defective?`,f(pr,4),[f((1-p)**n,4),f(n*p,4),f(p**n,4),f(1-p**n,4)],`P(at least one) = 1 − P(none) = 1 − (${g(1-p)})^${n} = ${f(pr,4)}.`);},
()=>{const a=R(2,6),b=R(2,8),ma=R(10,30),mb=R(10,30);
 return Q(`X and Y are independent with σ_X = ${a} and σ_Y = ${b}. What is the standard deviation of X − Y?`,f(Math.sqrt(a*a+b*b)),[f(Math.abs(a-b)),String(a+b),f(Math.sqrt(Math.abs(a*a-b*b))),String(a*a+b*b)],`Variances add (even for a difference): σ = ${rt(a+"² + "+b+"²")} = ${rt(a*a+b*b)} = ${f(Math.sqrt(a*a+b*b))}.`);},
()=>{const m=R(10,40),s=R(2,8),a=P([2,3,4]),b=P([5,10,-6]);
 return Q(`E(X) = ${m} and SD(X) = ${s}. If Y = ${a}X ${b<0?"− "+(-b):"+ "+b}, find E(Y) and SD(Y).`,`E(Y) = ${a*m+b}, SD(Y) = ${a*s}`,[`E(Y) = ${a*m+b}, SD(Y) = ${a*s+b}`,`E(Y) = ${a*m}, SD(Y) = ${a*s}`,`E(Y) = ${a*m+b}, SD(Y) = ${a*a*s}`,`E(Y) = ${m+b}, SD(Y) = ${s}`],`E(Y) = ${a}(${m}) ${b<0?"−":"+"} ${Math.abs(b)} = ${a*m+b}. SD(Y) = ${a}(${s}) = ${a*s} — adding a constant does not change spread.`);},
()=>{const a=R(20,50),b=R(20,50),c=R(10,40),d=R(10,40),tot=a+b+c+d;
 return Q(`A survey of ${tot} adults: ${a} are under 30 and own a pet, ${b} are under 30 with no pet, ${c} are 30+ with a pet, ${d} are 30+ with no pet. Find P(owns a pet | under 30).`,f(a/(a+b),3),[f(a/tot,3),f(a/(a+c),3),f((a+c)/tot,3),f((a+b)/tot,3)],`Restrict to the ${a+b} adults under 30: P = ${fr(a,a+b)} = ${f(a/(a+b),3)}.`);},
],
tasks:[
()=>{const n=P([8,10,12,15]),p=P([0.2,0.3,0.4]);const m=n*p,s=Math.sqrt(n*p*(1-p)),p2=C(n,2)*p*p*(1-p)**(n-2),p0=(1-p)**n;
 return {t:`About ${p*100}% of customers at a store use a coupon. A random sample of ${n} customers is selected. Let X = number who use a coupon.<br>(a) Explain why X is binomial. (b) Find the mean and SD of X and interpret the mean. (c) Find P(X = 2). (d) Find P(X ≥ 1).`,
 s:`(a) Two outcomes (coupon/no coupon), fixed n = ${n}, same p = ${p}, and independent customers (${n} is less than 10% of all customers).<br>(b) μ = ${n}(${p}) = ${g(m)}; σ = ${rt(n+"("+p+")("+g(1-p)+")")} = ${f(s)}. In many samples of ${n} customers, about ${g(m)} use a coupon, on average.<br>(c) P(X = 2) = (${n} choose 2)(${p})²(${g(1-p)})^${n-2} = <b>${f(p2,4)}</b>.<br>(d) P(X ≥ 1) = 1 − (${g(1-p)})^${n} = 1 − ${f(p0,4)} = <b>${f(1-p0,4)}</b>.`};},
()=>{const cost=P([2,3,5]),w1=P([10,20,25]),w2=P([50,100]),p1=P([0.1,0.15,0.2]),p2=P([0.01,0.02]);const e=w1*p1+w2*p2-cost;
 return {t:`A game costs $${cost} to play. You win $${w1} with probability ${p1} and $${w2} with probability ${p2}; otherwise you win nothing. Let X = net gain. Find E(X) and interpret it. Is the game fair?`,
 s:`Net gains: ${w1}−${cost} = ${w1-cost} (p = ${p1}), ${w2}−${cost} = ${w2-cost} (p = ${p2}), −${cost} (p = ${g(1-p1-p2)}).<br>E(X) = ${w1-cost}(${p1}) + ${w2-cost}(${p2}) + (−${cost})(${g(1-p1-p2)}) = <b>$${f(e)}</b>.<br>If you played many times, you would ${e<0?"lose":"win"} about $${f(Math.abs(e))} per game on average. ${Math.abs(e)<0.005?"The game is fair.":"The game is not fair (E(X) ≠ 0)."}`};},
],
cards:[["Complement rule","P(not A) = 1 − P(A)"],["General addition rule","P(A or B) = P(A) + P(B) − P(A and B)"],["Conditional probability",`P(A | B) = ${fr("P(A and B)","P(B)")}`],["Independent events","P(A | B) = P(A), or P(A and B) = P(A)·P(B)"],["Expected value","μ = Σ x·P(x)"],["Binomial (BINS)","Binary, Independent, Number fixed, Same p"],["Binomial mean & SD","μ = np, σ = √(np(1−p))"],["Geometric","Trials until first success: P(X = k) = (1−p)^(k−1)·p, μ = 1/p"],["Sum/difference of independent RVs","Means add/subtract; VARIANCES always add"],["Y = a + bX","μ_Y = a + bμ_X, σ_Y = |b|σ_X"]]
};

/* ---------- UNIT 5 ---------- */
U["unit-5"]={
mcq:[
S("The Central Limit Theorem says that when n is large, the sampling distribution of x̄ is:","Approximately normal, regardless of the shape of the population",["Exactly the same shape as the population","Always skewed right","Uniform","Approximately normal only if the population is normal"],"For large n (often n ≥ 30) the distribution of sample means is approximately normal even for non-normal populations."),
S("A statistic is called unbiased if:","The mean of its sampling distribution equals the parameter it estimates.",["It always equals the parameter.","It has a small standard deviation.","It comes from a large sample.","It is computed from a census."],"Unbiased = centered on the true parameter. Low variability is a separate property."),
S("Why do we check that n ≤ 10% of the population when sampling without replacement?","So that observations are approximately independent and the SD formula is accurate",["So the sampling distribution is normal","To avoid response bias","To make the sample random","So that np ≥ 10"],"Without replacement, draws are dependent; when the sample is a small fraction of the population the dependence is negligible."),
S("The Large Counts condition for the sampling distribution of p̂ to be approximately normal is:","np ≥ 10 and n(1 − p) ≥ 10",["n ≥ 30","n ≤ 10% of N","p > 0.5","np ≥ 5 only"],"Expect at least 10 successes and 10 failures."),
S("In a poll, 52% of 1,000 sampled voters favor a measure. Which is the parameter?","The proportion of all voters who favor the measure",["0.52","1,000","The sample of voters","The margin of error"],"Parameter = population value (usually unknown). 0.52 is a statistic."),
S("What is a sampling distribution?","The distribution of values of a statistic in all possible samples of the same size from a population",["The distribution of the data in one sample","The distribution of the population","A list of all samples taken","The distribution of a categorical variable"],"It describes how the statistic varies from sample to sample."),
()=>{const p=P([0.2,0.3,0.4,0.6,0.7]),n=P([50,100,150,200,400]);const s=Math.sqrt(p*(1-p)/n);
 return Q(`In a large population, ${p*100}% of people own a hybrid car. For random samples of size ${n}, what is the standard deviation of the sampling distribution of p̂?`,f(s,4),[f(p*(1-p)/n,4),f(Math.sqrt(p*(1-p)),4),f(Math.sqrt(p/n),4),f(s*2,4)],`σ_p̂ = ${rt(fr("p(1−p)","n"))} = ${rt(fr(p+"("+g(1-p)+")",n))} = ${f(s,4)}.`);},
()=>{const mu=R(40,80),sg=P([8,10,12,15,18]),n=P([16,25,36,64]),se=sg/Math.sqrt(n),k=P([1,1.5,2,-1]),c=mu+k*se,pr=1-Phi(k);
 return Q(`A population has μ = ${mu} and σ = ${sg}. For random samples of n = ${n}, find P(x̄ > ${g(c)}) (assume the sampling distribution is approximately normal).`,f(pr,4),[f(1-Phi((c-mu)/sg),4),f(1-pr,4),f(1-Phi(k*2),4),f(1-Phi(k/2),4)],`σ_x̄ = ${fr(sg,"√"+n)} = ${g(se)}. z = ${fr(g(c)+" − "+mu,g(se))} = ${f(k)}. P(Z > ${f(k)}) = ${f(pr,4)}.`);},
()=>{const m=P([4,9,16]),r=Math.sqrt(m);
 return Q(`If the sample size is multiplied by ${m}, the standard deviation of the sampling distribution of x̄ is:`,`Divided by ${r}`,[`Divided by ${m}`,`Multiplied by ${r}`,`Unchanged`,`Multiplied by ${m}`],`σ_x̄ = σ/√n, so multiplying n by ${m} divides the SD by √${m} = ${r}.`);},
],
tasks:[
()=>{const mu=R(300,500),sg=R(30,60),n=P([25,36,49,64]),se=sg/Math.sqrt(n),c=mu+P([-1,1])*R(8,15),z=(c-mu)/se,pr=c>mu?1-Phi(z):Phi(z);
 return {t:`The weights of bags of chips are approximately normal with mean ${mu} g and SD ${sg} g. A random sample of ${n} bags is selected.<br>(a) Describe the sampling distribution of x̄ (shape, center, spread). (b) Find the probability that the sample mean is ${c>mu?"more":"less"} than ${c} g.`,
 s:`(a) Shape: approximately normal (population is normal). Center: μ_x̄ = ${mu} g. Spread: σ_x̄ = ${fr(sg,"√"+n)} = ${f(se)} g (assuming ${n} < 10% of all bags).<br>(b) z = ${fr(c+" − "+mu,f(se))} = ${f(z)}. P = <b>${f(pr,4)}</b>.`};},
()=>{const p=P([0.3,0.4,0.6]),n=P([100,150,200]),s=Math.sqrt(p*(1-p)/n),c=+(p+P([0.05,0.06,-0.05])).toFixed(2),z=(c-p)/s,pr=c>p?1-Phi(z):Phi(z);
 return {t:`Suppose ${p*100}% of students at a large university live on campus. In a random sample of ${n} students, find the probability that ${c>p?"more":"less"} than ${Math.round(c*100)}% live on campus. Check conditions.`,
 s:`Large counts: np = ${g(n*p)} ≥ 10 and n(1−p) = ${g(n*(1-p))} ≥ 10 ✓. 10%: ${n} < 10% of all students ✓.<br>μ_p̂ = ${p}; σ_p̂ = ${rt(fr(p+"("+g(1-p)+")",n))} = ${f(s,4)}.<br>z = ${fr(c+" − "+p,f(s,4))} = ${f(z)}; P = <b>${f(pr,4)}</b>.`};},
],
cards:[["Parameter vs statistic","Parameter: population (p, μ). Statistic: sample (p̂, x̄)"],["Sampling distribution","Distribution of a statistic over all samples of size n"],["Mean & SD of p̂","μ = p, σ = √(p(1−p)/n)"],["Mean & SD of x̄","μ = μ, σ = σ/√n"],["Large counts","np ≥ 10 and n(1−p) ≥ 10 → p̂ approx. normal"],["CLT","n ≥ 30 → x̄ approx. normal for any population shape"],["10% condition","n ≤ 0.10N so independence is approximately true"],["Unbiased estimator","Sampling distribution centered at the parameter"],["Larger n","Less variability (SD shrinks by √n), no change in bias"]]
};

/* ---------- UNIT 6 ---------- */
U["unit-6"]={
mcq:[
S("A 95% confidence interval for the proportion of students who walk to school is (0.18, 0.26). Which is the correct interpretation?","We are 95% confident that the interval from 0.18 to 0.26 captures the true proportion of all students who walk to school.",["95% of students walk to school.","There is a 95% chance the sample proportion is between 0.18 and 0.26.","95% of samples will have p̂ between 0.18 and 0.26.","The true proportion is 0.22."],"The confidence is about the method capturing the population parameter, not about p̂ or individuals."),
S("Holding everything else the same, increasing the confidence level from 90% to 99% makes the interval:","Wider",["Narrower","Unchanged","Centered at a different value","Invalid"],"Higher confidence needs a larger critical value z*, so the margin of error increases."),
S("A p-value of 0.03 means:","If H₀ were true, there is a 0.03 probability of getting a result as extreme as or more extreme than the one observed.",["There is a 3% chance H₀ is true.","There is a 97% chance Hₐ is true.","3% of the data are unusual.","The test is 97% accurate."],"The p-value is computed assuming H₀ is true."),
S("A company tests H₀: p = 0.10 vs Hₐ: p > 0.10, where p is the proportion of defective parts. A Type I error would be:","Concluding the defect rate is above 0.10 when it really is 0.10",["Concluding the defect rate is 0.10 when it is really above 0.10","Using too small a sample","Calculating the wrong p-value","Failing to reject H₀ when it is true"],"Type I = rejecting a true H₀."),
S("Which change would increase the power of a significance test?","Increasing the sample size",["Decreasing α","Decreasing the sample size","Making the true p closer to p₀","Using a two-sided test instead of one-sided"],"Larger n reduces standard error, making it easier to detect a real difference."),
S("A 95% CI for p₁ − p₂ is (−0.03, 0.08). What can you conclude at α = 0.05?","There is no convincing evidence of a difference between p₁ and p₂.",["p₁ is greater than p₂.","p₂ is greater than p₁.","p₁ = p₂ for certain.","The interval is invalid."],"0 is in the interval, so 0 is a plausible value of the difference."),
S("A researcher wants to test whether more than 40% of voters support a candidate. The correct hypotheses are:","H₀: p = 0.40, Hₐ: p > 0.40",["H₀: p̂ = 0.40, Hₐ: p̂ > 0.40","H₀: p > 0.40, Hₐ: p = 0.40","H₀: p = 0.40, Hₐ: p ≠ 0.40","H₀: μ = 0.40, Hₐ: μ > 0.40"],"Hypotheses are about the parameter p, and the claim to be shown goes in Hₐ."),
()=>{const ph=P([0.3,0.4,0.55,0.6,0.7]),n=P([100,150,200,400]),zs=P([[1.645,90],[1.96,95],[2.576,99]]);const me=zs[0]*Math.sqrt(ph*(1-ph)/n);
 return Q(`In a random sample of ${n} adults, p̂ = ${ph}. What is the margin of error for a ${zs[1]}% confidence interval for p?`,f(me,3),[f(Math.sqrt(ph*(1-ph)/n),3),f(zs[0]*ph*(1-ph)/n,3),f(zs[0]*Math.sqrt(ph/n),3),f(me*2,3)],`ME = z*${rt(fr("p̂(1−p̂)","n"))} = ${zs[0]}${rt(fr(ph+"("+g(1-ph)+")",n))} = ${f(me,3)}.`);},
()=>{const m=P([0.02,0.03,0.04,0.05]),zs=P([[1.645,90],[1.96,95],[2.576,99]]);const n=Math.ceil((zs[0]/m)**2*0.25);
 return Q(`What is the smallest sample size needed for a ${zs[1]}% confidence interval for p with margin of error at most ${m}? (No prior estimate of p.)`,String(n),[String(Math.round((zs[0]/m)**2*0.25/2)),String(Math.ceil(zs[0]/m*0.5)),String(n-1),String(Math.ceil((zs[0]/m)**2))],`Use p* = 0.5: ${zs[0]}${rt(fr("0.5(0.5)","n"))} ≤ ${m} → n ≥ (${fr(zs[0],m)})²(0.25) = ${f((zs[0]/m)**2*0.25,1)} → <b>${n}</b> (always round up).`);},
()=>{const p0=P([0.3,0.4,0.5,0.6]),n=P([100,200,400]),ph=+(p0+P([0.04,0.05,0.06,0.07,-0.05])).toFixed(2);const se=Math.sqrt(p0*(1-p0)/n),z=(ph-p0)/se;
 return Q(`Test H₀: p = ${p0} using a random sample of ${n} with p̂ = ${ph}. What is the test statistic?`,"z = "+f(z),["z = "+f((ph-p0)/Math.sqrt(ph*(1-ph)/n)+0.13),"z = "+f(-z),"z = "+f((ph-p0)/Math.sqrt(p0*(1-p0))),"z = "+f(z*2)],`Use p₀ in the standard error: z = ${fr(ph+" − "+p0, "√("+p0+"·"+g(1-p0)+"/"+n+")")} = ${fr(f(ph-p0,2),f(se,4))} = ${f(z)}.`);},
],
tasks:[
()=>{const p0=P([0.25,0.3,0.4,0.5]),n=P([150,200,250,300]),x=Math.round(n*(p0+P([0.04,0.05,0.07,0.02]))),ph=x/n,se=Math.sqrt(p0*(1-p0)/n),z=(ph-p0)/se,pv=1-Phi(z);
 return {t:`A school claims that ${p0*100}% of its students bike to school. A student suspects the proportion is higher. In a random sample of ${n} students, ${x} bike. Carry out a test at α = 0.05.`,
 s:`<b>State:</b> H₀: p = ${p0}, Hₐ: p > ${p0}, where p = proportion of all students who bike; α = 0.05.<br><b>Plan:</b> one-sample z test for p. Random ✓; 10%: ${n} < 10% of students ✓; Large counts: np₀ = ${g(n*p0)}, n(1−p₀) = ${g(n*(1-p0))} both ≥ 10 ✓.<br><b>Do:</b> p̂ = ${x}/${n} = ${f(ph,3)}; z = ${fr(f(ph,3)+" − "+p0,f(se,4))} = ${f(z)}; p-value = P(Z ≥ ${f(z)}) = <b>${f(pv,4)}</b>.<br><b>Conclude:</b> Because ${f(pv,4)} ${pv<0.05?"<":">"} 0.05, we ${pv<0.05?"reject H₀. There is convincing evidence":"fail to reject H₀. There is not convincing evidence"} that more than ${p0*100}% of the students bike to school.`};},
()=>{const n=P([120,200,250,400]),x=Math.round(n*P([0.35,0.42,0.58,0.63])),ph=x/n,se=Math.sqrt(ph*(1-ph)/n),me=1.96*se;
 return {t:`In a random sample of ${n} teens, ${x} said they read for fun weekly. Construct and interpret a 95% confidence interval for the proportion of all teens who read for fun weekly.`,
 s:`Conditions: random ✓; ${n} < 10% of all teens ✓; successes ${x} and failures ${n-x} both ≥ 10 ✓.<br>p̂ = ${f(ph,3)}; SE = ${rt(fr(f(ph,3)+"("+f(1-ph,3)+")",n))} = ${f(se,4)}.<br>${f(ph,3)} ± 1.96(${f(se,4)}) = ${f(ph,3)} ± ${f(me,3)} = <b>(${f(ph-me,3)}, ${f(ph+me,3)})</b>.<br>We are 95% confident that the interval from ${f(ph-me,3)} to ${f(ph+me,3)} captures the true proportion of all teens who read for fun weekly.`};},
],
cards:[["CI for p",`p̂ ± z*${rt(fr("p̂(1−p̂)","n"))}`],["Test statistic for p",`z = ${fr("p̂ − p₀","√(p₀(1−p₀)/n)")}`],["Conditions (proportions)","Random, 10%, Large counts (≥ 10 successes and failures)"],["Interpret CI","We are C% confident the interval from __ to __ captures the true [parameter in context]"],["Interpret confidence level","In many samples, about C% of intervals capture the true parameter"],["p-value","P(result this extreme or more | H₀ true)"],["Decision","p-value < α → reject H₀; otherwise fail to reject"],["Type I error","Reject H₀ when it is true (probability α)"],["Type II error","Fail to reject H₀ when Hₐ is true"],["Power","P(reject H₀ | Hₐ true) = 1 − P(Type II); ↑ with larger n, larger α, bigger effect"],["z* values","90%: 1.645 · 95%: 1.96 · 99%: 2.576"]]
};

/* ---------- UNIT 7 ---------- */
U["unit-7"]={
mcq:[
S("Why do we use t procedures instead of z procedures when doing inference for a mean?","The population standard deviation σ is unknown and is estimated by s.",["The sample size is always small.","The population is skewed.","t procedures are only for proportions.","The sample mean is biased."],"Replacing σ with s adds variability, which the t distribution (heavier tails) accounts for."),
S("Compared with the standard normal distribution, a t distribution with 5 degrees of freedom:","Has heavier tails and more spread",["Has lighter tails","Is skewed right","Has a larger center","Is identical"],"t distributions are symmetric, centered at 0, with heavier tails; they approach normal as df grows."),
S("Researchers measure each student's score before and after a tutoring program. Which procedure is appropriate?","Paired t test on the differences",["Two-sample t test","Two-proportion z test","Chi-square test for independence","One-proportion z test"],"Two measurements on the same individuals → analyze the differences."),
S("A random sample of size n = 12 is used for a one-sample t interval. Which condition must be checked?","The sample data show no strong skewness or outliers",["n ≥ 30","np ≥ 10","All expected counts ≥ 5","σ is known"],"For small n, the population must be approximately normal; check a graph of the data."),
S("A 95% CI for μ₁ − μ₂ is (1.2, 4.8). At α = 0.05, what does this suggest?","There is convincing evidence that μ₁ > μ₂.",["There is no evidence of a difference.","μ₂ > μ₁","μ₁ − μ₂ = 3 exactly","The interval is too wide to conclude anything"],"All plausible values of μ₁ − μ₂ are positive, and 0 is not in the interval."),
S("With everything else fixed, increasing the sample size for a t interval will:","Make the interval narrower",["Make the interval wider","Not change the width","Increase the confidence level","Change the point estimate to μ"],"SE = s/√n gets smaller, and t* gets slightly smaller too."),
()=>{const s=P([6,8,10,12,15,20]),n=P([16,25,36,64,100]);
 return Q(`A random sample of ${n} has standard deviation s = ${s}. What is the standard error of x̄?`,f(s/Math.sqrt(n)),[f(s/n),f(s*Math.sqrt(n)),f(Math.sqrt(s/n)),f(s/(n-1))],`SE = ${fr("s","√n")} = ${fr(s,"√"+n)} = ${f(s/Math.sqrt(n))}.`);},
()=>{const n=P([16,25,36,64]),s=P([4,6,8,10,12]),se=s/Math.sqrt(n),mu0=R(40,80),k=P([1.5,2,2.5,-2,3]),xb=mu0+k*se;
 return Q(`Test H₀: μ = ${mu0} using a sample of n = ${n} with x̄ = ${f(xb)} and s = ${s}. What is the test statistic?`,"t = "+f(k),["t = "+f((xb-mu0)/s),"t = "+f(-k),"t = "+f((xb-mu0)/(s/n)),"t = "+f(k*Math.sqrt(n)/4)],`t = ${fr("x̄ − μ₀","s/√n")} = ${fr(f(xb)+" − "+mu0,s+"/√"+n)} = ${fr(f(xb-mu0),f(se))} = ${f(k)}, df = ${n-1}.`);},
()=>{const n=R(8,40);
 return Q(`How many degrees of freedom are used for a one-sample t interval with a sample of ${n} observations?`,String(n-1),[String(n),String(n-2),String(n+1),String(2*n-2)],`df = n − 1 = ${n-1}.`);},
()=>{const df=P([9,14,19,24,29]),n=df+1,xb=R(20,80),s=R(3,12),ts=TSTAR[df],me=ts*s/Math.sqrt(n);
 return Q(`A random sample of ${n} has x̄ = ${xb} and s = ${s}. Using t* = ${ts}, what is the 95% confidence interval for μ?`,`(${f(xb-me)}, ${f(xb+me)})`,[`(${f(xb-1.96*s/Math.sqrt(n))}, ${f(xb+1.96*s/Math.sqrt(n))})`,`(${f(xb-ts*s)}, ${f(xb+ts*s)})`,`(${f(xb-ts*s/n)}, ${f(xb+ts*s/n)})`,`(${f(xb-2*me)}, ${f(xb+2*me)})`],`x̄ ± t*${fr("s","√n")} = ${xb} ± ${ts}(${fr(s,"√"+n)}) = ${xb} ± ${f(me)}.`);},
],
tasks:[
()=>{const df=P([14,19,24]),n=df+1,mu=R(100,200),s=R(10,25),xb=mu+R(-12,12),ts=TSTAR[df],se=s/Math.sqrt(n),me=ts*se;
 return {t:`A random sample of ${n} batteries had a mean life of ${xb} hours with s = ${s} hours. A dotplot of the data shows no strong skewness or outliers. Construct and interpret a 95% confidence interval for the mean life of all such batteries. (t* = ${ts} for df = ${df}.)`,
 s:`<b>Plan:</b> one-sample t interval for μ. Random ✓; 10% ✓; n = ${n} < 30 but no strong skew/outliers ✓.<br><b>Do:</b> SE = ${fr(s,"√"+n)} = ${f(se,3)}; ${xb} ± ${ts}(${f(se,3)}) = ${xb} ± ${f(me)} = <b>(${f(xb-me)}, ${f(xb+me)})</b>.<br><b>Conclude:</b> We are 95% confident that the interval from ${f(xb-me)} to ${f(xb+me)} hours captures the true mean life of all such batteries.`};},
()=>{const n=P([10,12,15,20]),db=+(P([1.2,1.8,2.5,3.1,0.6])).toFixed(1),sd=+(P([2.0,2.5,3.2,4.0])).toFixed(1),se=sd/Math.sqrt(n),t=db/se;
 return {t:`${n} students took a test before and after a study-skills workshop. The differences (after − before) have mean x̄_d = ${db} and s_d = ${sd}. Is there convincing evidence at α = 0.05 that the workshop increases scores, on average? (Assume conditions are met.)`,
 s:`H₀: μ_d = 0, Hₐ: μ_d > 0, where μ_d = true mean difference (after − before).<br>Paired t test: t = ${fr(db+" − 0",sd+"/√"+n)} = ${f(t)}, df = ${n-1}.<br>p-value = P(t ≥ ${f(t)}) with df = ${n-1} = <b>${f(tsf(t,n-1),4)}</b> (calculator: tcdf(${f(t)}, 1E99, ${n-1})).<br>${tsf(t,n-1)<0.05?"Because the p-value < 0.05, reject H₀. There is convincing evidence that the workshop increases scores, on average.":"Because the p-value > 0.05, fail to reject H₀. There is not convincing evidence that the workshop increases scores, on average."}`};},
],
cards:[["CI for μ",`x̄ ± t*${fr("s","√n")}, df = n − 1`],["Test statistic for μ",`t = ${fr("x̄ − μ₀","s/√n")}`],["Conditions (means)","Random, 10%, Normal/large sample (n ≥ 30 or no strong skew/outliers)"],["t vs z","Use t when σ is unknown (almost always for means)"],["Paired data","Two measurements per individual → one-sample t on the differences"],["Two-sample t",`SE = ${rt("s₁²/n₁ + s₂²/n₂")}`],["df effect","More df → t closer to normal → smaller t*"],["CI and test link","If μ₀ is outside a C% CI, reject H₀ at α = 1 − C (two-sided)"]]
};

/* ---------- UNIT 8 ---------- */
U["unit-8"]={
mcq:[
S("A researcher takes one random sample of 500 adults and records their political party and their opinion on a policy. Which test is appropriate?","Chi-square test for independence",["Chi-square test for homogeneity","Chi-square goodness-of-fit test","Two-sample t test","One-proportion z test"],"One sample, two categorical variables → independence."),
S("Random samples are taken from three different high schools, and students are asked their favorite lunch option. Which test is appropriate?","Chi-square test for homogeneity",["Chi-square test for independence","Chi-square goodness-of-fit test","Paired t test","Linear regression t test"],"Several separate samples/populations, one categorical variable → homogeneity."),
S("Which condition must be checked for a chi-square test?","All expected counts are at least 5",["All observed counts are at least 10","n ≥ 30","The data are quantitative","np ≥ 10"],"Large counts for chi-square: every expected count ≥ 5."),
S("As the degrees of freedom increase, the chi-square distribution:","Becomes less skewed and its center moves to the right",["Becomes more skewed to the right","Becomes skewed left","Is centered at 0","Does not change"],"The mean of a χ² distribution equals its df; with more df it spreads and looks more symmetric."),
S("A chi-square test gives χ² = 18.4 with a p-value of 0.002. What is the best conclusion at α = 0.05?","Reject H₀; there is convincing evidence of an association (or that the distribution differs from the claim).",["Fail to reject H₀.","Accept H₀.","The variables are definitely independent.","The test statistic is too large to interpret."],"Small p-value → evidence against H₀."),
()=>{const k=P([4,5,6]),n=k*R(15,40);
 return Q(`A ${k}-sided die is rolled ${n} times to test whether it is fair. What is the expected count for each face, and what are the degrees of freedom?`,`${n/k} each, df = ${k-1}`,[`${n/k} each, df = ${k}`,`${n} each, df = ${k-1}`,`${f(1/k,3)} each, df = ${k-1}`,`${n/k} each, df = ${n-1}`],`Expected = n·p = ${n}(1/${k}) = ${n/k}. df = categories − 1 = ${k-1}.`);},
()=>{const r=R(30,90),c=R(40,100),t=P([200,250,300,400]);
 return Q(`In a two-way table with grand total ${t}, a row total is ${r} and a column total is ${c}. What is the expected count for that cell?`,f(r*c/t,2),[f((r+c)/t,2),f(r*c,0),f(r/t*100,2),f(t/(r+c),2)],`Expected = ${fr("row total × column total","grand total")} = ${fr(r+"("+c+")",t)} = ${f(r*c/t,2)}.`);},
()=>{const e=R(10,40),o=e+P([-8,-6,-5,5,7,9]);
 return Q(`A cell has observed count ${o} and expected count ${e}. What is its contribution to the χ² statistic?`,f((o-e)**2/e,3),[f((o-e)**2/o,3),f((o-e)/e,3),f(Math.abs(o-e),3),f((o-e)**2,3)],`(O − E)²/E = (${o} − ${e})²/${e} = ${(o-e)**2}/${e} = ${f((o-e)**2/e,3)}.`);},
()=>{const r=R(2,5),c=R(2,5);
 return Q(`A chi-square test for independence uses a two-way table with ${r} rows and ${c} columns. How many degrees of freedom?`,String((r-1)*(c-1)),[String(r*c-1),String(r+c-2),String(r*c),String((r-1)+(c-1)+1)],`df = (rows − 1)(columns − 1) = (${r-1})(${c-1}) = ${(r-1)*(c-1)}.`);},
],
tasks:[
()=>{const props=P([[0.4,0.3,0.2,0.1],[0.25,0.25,0.25,0.25],[0.5,0.25,0.15,0.1]]),n=P([200,300,400]),E=props.map(p=>p*n),O=E.map(e=>Math.round(e+R(-14,14))),diff=n-O.reduce((a,b)=>a+b,0);O[0]+=diff;const chi=O.reduce((s,o,i)=>s+(o-E[i])**2/E[i],0);
 return {t:`A candy company claims its bags contain red, orange, yellow, and green candies in proportions ${props.join(", ")}. A random sample of ${n} candies had counts ${O.join(", ")}. (a) Find the expected counts. (b) Calculate χ² and df. (c) Which color contributes most?`,
 s:`(a) Expected = ${n}×p: ${E.map(g).join(", ")} (all ≥ 5 ✓).<br>(b) χ² = Σ ${fr("(O − E)²","E")} = ${O.map((o,i)=>f((o-E[i])**2/E[i],3)).join(" + ")} = <b>${f(chi,3)}</b>, df = 3. p-value = χ²cdf(${f(chi,3)}, 1E99, 3) = <b>${f(c3sf(chi),4)}</b> → ${c3sf(chi)<0.05?"convincing evidence the company's claim is wrong":"not convincing evidence against the company's claim"} (α = 0.05).<br>(c) The largest component is <b>${["red","orange","yellow","green"][O.map((o,i)=>(o-E[i])**2/E[i]).reduce((m,v,i,a)=>v>a[m]?i:m,0)]}</b>.`};},
()=>{const a=R(30,60),b=R(20,50),c=R(20,50),d=R(30,60),R1=a+b,R2=c+d,C1=a+c,C2=b+d,T=R1+R2;const E=[R1*C1/T,R1*C2/T,R2*C1/T,R2*C2/T],O=[a,b,c,d];const chi=O.reduce((s,o,i)=>s+(o-E[i])**2/E[i],0);
 return {t:`A random sample of students was classified by grade (9th/12th) and whether they prefer online or printed textbooks:<br>9th: online ${a}, printed ${b}. 12th: online ${c}, printed ${d}.<br>State the hypotheses, find the expected counts, χ², and df.`,
 s:`H₀: grade and textbook preference are independent among students; Hₐ: they are not independent.<br>Expected: ${E.map(x=>f(x,2)).join(", ")} (all ≥ 5 ✓).<br>χ² = <b>${f(chi,3)}</b>, df = (2−1)(2−1) = 1. p-value = χ²cdf(${f(chi,3)}, 1E99, 1) = ${f(2*(1-Phi(Math.sqrt(chi))),4)}.<br>${2*(1-Phi(Math.sqrt(chi)))<0.05?"p < 0.05 → convincing evidence of an association.":"p > 0.05 → not convincing evidence of an association."}`};},
],
cards:[["Goodness of fit","One categorical variable vs a claimed distribution; df = k − 1"],["Homogeneity","Several populations/treatments, one categorical variable"],["Independence","One sample, two categorical variables"],["Expected count (two-way)",`${fr("row total × column total","grand total")}`],["χ² statistic",`Σ ${fr("(O − E)²","E")}`],["df (two-way)","(r − 1)(c − 1)"],["Conditions","Random, 10%, all expected counts ≥ 5"],["Follow-up","Look at the largest components to see where the difference is"]]
};

/* ---------- UNIT 9 ---------- */
U["unit-9"]={
mcq:[
S("In a t test for the slope of a regression line, the null hypothesis is usually:","H₀: β = 0",["H₀: b = 0","H₀: r = 1","H₀: β = 1","H₀: a = 0"],"β = 0 means no linear relationship between x and y in the population."),
S("Which is NOT a condition for inference about the slope?","The sample size must be at least 30.",["The true relationship is linear.","Observations are independent.","Residuals are approximately normal.","The SD of y is the same for all x."],"Conditions: LINER — Linear, Independent, Normal, Equal SD, Random. n ≥ 30 is not required."),
S("A residual plot shows a fan shape (spread increases as x increases). Which condition is violated?","Equal standard deviation of y for all x",["Linear","Random","Normal","Independent"],"A fan shape means the variability of y changes with x."),
S("In regression output, s = 3.2 (the standard deviation of the residuals). This means:","Predictions from the line are typically off by about 3.2 units of y.",["The slope is 3.2.","The correlation is 3.2.","The SE of the slope is 3.2.","3.2% of variation is explained."],"s measures the typical size of a residual."),
S("A 95% CI for the population slope is (−0.4, 1.1). What can be concluded?","There is no convincing evidence of a linear relationship.",["There is convincing evidence of a positive relationship.","The slope is 0.35.","r = 0","There is a negative relationship."],"0 is a plausible value for β."),
()=>{const b=+(P([0.6,0.85,1.2,2.4,-1.5])).toFixed(2),se=+(P([0.2,0.25,0.3,0.4,0.5])).toFixed(2);
 return Q(`Regression output shows a slope b = ${b} with SE_b = ${se}. What is the t statistic for H₀: β = 0?`,f(b/se),[f(b*se),f(se/b),f(b/se/2),f(-b/se)],`t = ${fr("b − 0","SE_b")} = ${fr(b,se)} = ${f(b/se)}.`);},
()=>{const n=R(12,40);
 return Q(`A slope t test uses ${n} data points. How many degrees of freedom?`,String(n-2),[String(n-1),String(n),String(n-3),String(2*n)],`For regression slope inference, df = n − 2 = ${n-2}.`);},
()=>{const df=P([9,14,19,24,29]),b=+(P([1.8,2.5,3.4,0.75])).toFixed(2),se=+(P([0.3,0.4,0.5,0.6])).toFixed(2),ts=TSTAR[df],me=ts*se;
 return Q(`Regression output (n = ${df+2}) gives b = ${b}, SE_b = ${se}. With t* = ${ts}, what is the 95% CI for β?`,`(${f(b-me,3)}, ${f(b+me,3)})`,[`(${f(b-1.96*se,3)}, ${f(b+1.96*se,3)})`,`(${f(b-ts*se/Math.sqrt(df+2),3)}, ${f(b+ts*se/Math.sqrt(df+2),3)})`,`(${f(b-2*me,3)}, ${f(b+2*me,3)})`,`(${f(b-ts,3)}, ${f(b+ts,3)})`],`b ± t*·SE_b = ${b} ± ${ts}(${se}) = ${b} ± ${f(me,3)}.`);},
],
tasks:[
()=>{const df=P([14,19,24]),n=df+2,b=+(P([1.25,2.4,0.85,3.1])).toFixed(2),se=+(P([0.35,0.42,0.5,0.6])).toFixed(2),a=R(5,40),ts=TSTAR[df],me=ts*se,t=b/se;
 return {t:`Computer output for predicting exam score from hours of sleep (n = ${n}):<br><code>Predictor  Coef  SE Coef<br>Constant   ${a}<br>Sleep      ${b}  ${se}</code><br>(a) Construct a 95% CI for the slope (t* = ${ts}). (b) Interpret it. (c) Do the data provide convincing evidence of a linear relationship?`,
 s:`(a) b ± t*SE_b = ${b} ± ${ts}(${se}) = ${b} ± ${f(me,3)} = <b>(${f(b-me,3)}, ${f(b+me,3)})</b>, df = ${df}.<br>(b) We are 95% confident that the interval from ${f(b-me,3)} to ${f(b+me,3)} captures the slope of the true regression line relating exam score to hours of sleep — each extra hour of sleep is associated with an increase in predicted score of between ${f(b-me,2)} and ${f(b+me,2)} points.<br>(c) t = ${fr(b,se)} = ${f(t)}. ${b-me>0?"0 is not in the interval, so yes — there is convincing evidence of a positive linear relationship.":"0 is in the interval, so there is not convincing evidence of a linear relationship."}`};},
],
cards:[["Parameter","β = slope of the population (true) regression line"],["Test statistic",`t = ${fr("b − β₀","SE_b")}, df = n − 2`],["CI for slope","b ± t*·SE_b, df = n − 2"],["Conditions (LINER)","Linear, Independent, Normal residuals, Equal SD, Random"],["s","Typical distance of points from the regression line"],["SE_b","How much the sample slope typically varies from β"],["Fan-shaped residual plot","Equal SD condition violated"],["0 in CI for β","No convincing evidence of a linear relationship"]]
};

/* ======================= MORE CONTENT ======================= */
const ADD=(u,mcq,cards)=>{U[u].mcq.push(...mcq);U[u].cards.push(...cards);};
const ZQ={0.10:-1.2816,0.20:-0.8416,0.25:-0.6745,0.75:0.6745,0.80:0.8416,0.90:1.2816,0.95:1.6449,0.99:2.3263};

ADD("unit-1",[
S("Which measure of center is best for a strongly skewed distribution of home prices?","The median",["The mean","The range","The standard deviation","The maximum"],"The median is resistant to the extreme values in the tail; the mean is pulled toward them."),
S("The standard deviation of a data set is best described as:","A typical distance of the values from the mean",["The difference between the largest and smallest values","The middle 50% of the data","The average of the values","The most common value"],"SD measures variability: roughly how far values typically are from the mean."),
S("A data set has a standard deviation of 0. What must be true?","All of the values are identical.",["The mean is 0.","The data are symmetric.","There are no outliers but values differ.","The median is 0."],"SD = 0 only when every value equals the mean."),
S("Which graph is appropriate for displaying the distribution of a quantitative variable?","Histogram",["Bar chart","Pie chart","Segmented bar chart","Mosaic plot"],"Bar charts, pie charts and mosaic plots display categorical data."),
S("On a cumulative relative frequency graph, how do you estimate the median?","Find the value whose cumulative relative frequency is 0.5.",["Find the tallest point.","Find the value at a cumulative frequency of 1.","Average the smallest and largest values.","Find where the graph is steepest."],"The median is the 50th percentile."),
S("A normal probability plot of a data set is roughly a straight line. What does this suggest?","The data are approximately normally distributed.",["The data are strongly skewed.","There is a strong linear relationship between two variables.","The data have outliers.","The mean equals 0."],"A linear normal probability plot means the data's percentiles match those of a normal distribution."),
S("When comparing two distributions, which statement is best?","“The median wait time at Store A (12 min) is greater than at Store B (8 min).”",["“Store A's median is 12 and Store B's median is 8.”","“Store A has a median.”","“Both stores have wait times.”","“The medians are different numbers.”"],"Comparisons need comparative language (greater than, less than, about the same) — not just listing values."),
()=>{const vals=SH([R(5,15),R(8,18),R(10,20),R(12,22)]),n=5,sm=vals.reduce((a,b)=>a+b,0);let fifth=R(6,24);while((sm+fifth)%5)fifth++;const m=(sm+fifth)/5;
 return Q(`The mean of five numbers is ${m}. Four of the numbers are ${vals.join(", ")}. What is the fifth number?`,String(fifth),[String(m),String(Math.round(vals.reduce((a,b)=>a+b,0)/4)),String(fifth+m),String(m*4-vals.reduce((a,b)=>a+b,0))],`The total must be 5 × ${m} = ${m*n}. Fifth = ${m*n} − (${vals.join(" + ")}) = ${fifth}.`);},
()=>{const pc=P([0.10,0.20,0.25,0.75,0.80,0.90,0.95]),z=ZQ[pc],mu=R(50,500),sg=R(5,60),x=mu+z*sg;
 return Q(`X is normal with μ = ${mu} and σ = ${sg}. What value is at the ${Math.round(pc*100)}th percentile?`,f(x,1),[f(mu-z*sg,1),f(mu+pc*sg,1),f(mu+z,1),f(mu+2*z*sg,1)],`For the ${Math.round(pc*100)}th percentile, z = ${f(z,3)} (invNorm(${pc})). x = μ + zσ = ${mu} + (${f(z,3)})(${sg}) = ${f(x,1)}.`);},
()=>{const mn=R(1,10),q1=mn+R(3,8),md=q1+R(2,6),q3=md+R(2,8),mx=q3+R(3,15);
 return Q(`The five-number summary is ${mn}, ${q1}, ${md}, ${q3}, ${mx}. What are the range and the IQR?`,`range ${mx-mn}, IQR ${q3-q1}`,[`range ${q3-q1}, IQR ${mx-mn}`,`range ${mx-mn}, IQR ${md-q1}`,`range ${mx-md}, IQR ${q3-q1}`,`range ${mx-mn}, IQR ${q3-md}`],`Range = max − min = ${mx} − ${mn} = ${mx-mn}. IQR = Q₃ − Q₁ = ${q3} − ${q1} = ${q3-q1}.`);},
()=>{const v=[1,2,3,4],c=[R(2,8),R(2,8),R(2,8),R(2,8)],n=c.reduce((a,b)=>a+b,0),m=v.reduce((s,x,i)=>s+x*c[i],0)/n;
 return Q(`Students reported the number of pets they own: 1 pet (${c[0]} students), 2 pets (${c[1]}), 3 pets (${c[2]}), 4 pets (${c[3]}). What is the mean number of pets?`,f(m),[f(2.5),f(n/4),f(v.reduce((s,x,i)=>s+x*c[i],0)/4),f(m+0.5)],`Mean = ${fr("Σ(value × count)","total count")} = ${fr(v.map((x,i)=>x+"·"+c[i]).join(" + "),n)} = ${f(m)}.`);},
],[["Mean vs median","Use the median (and IQR) for skewed data or outliers; mean (and SD) for roughly symmetric data"],["Standard deviation","Typical distance of values from the mean; s = √(Σ(x − x̄)²/(n − 1))"],["IQR","Q₃ − Q₁ — spread of the middle 50%"],["Range","max − min (not resistant)"],["Normal probability plot","Roughly linear → data approximately normal"],["invNorm","Gives the value (or z) for a given percentile/area to the left"],["normalcdf","Gives the area (proportion) between two values"],["Comparing distributions","Compare shape, center, spread, outliers using comparative words, in context"],["Bar chart vs histogram","Bar chart: categorical (gaps). Histogram: quantitative (bars touch)"]]);

ADD("unit-2",[
S("Which correlation shows the strongest linear relationship?","r = −0.92",["r = 0.85","r = 0.50","r = −0.10","r = 0"],"Strength depends on |r|; |−0.92| is the largest."),
S("For any least-squares regression line, the sum of the residuals is:","0",["1","Equal to r","Equal to the slope","Always positive"],"Positive and negative residuals balance exactly for the LSRL."),
S("The least-squares regression line is the line that:","Minimizes the sum of the squared residuals",["Passes through the most points","Minimizes the sum of the residuals","Makes r equal to 1","Has slope 1"],"That is the definition of “least squares.”"),
S("A point has a typical x-value but a y-value far above the pattern. Adding it to the data will most likely:","Have a large residual and weaken the correlation",["Have a residual of 0","Strengthen the correlation","Change the slope dramatically","Make the relationship nonlinear"],"Outliers in the y-direction add scatter; they usually have less effect on the slope than high-leverage points."),
S("A study predicts final exam score from hours of study. The explanatory variable is:","Hours of study",["Final exam score","The residual","The correlation","The slope"],"The explanatory (x) variable is used to predict the response (y)."),
S("A scatterplot of log(y) vs x is roughly linear. Which model fits the original data?","An exponential model",["A linear model","A power model","A quadratic model","No model"],"If log(y) is linear in x, then y = a·bˣ."),
S("Simpson's paradox occurs when:","An association between two variables reverses when a third variable is taken into account.",["The correlation is exactly 0.","A residual plot is curved.","Two variables are independent.","The slope and correlation have opposite signs."],"Combining groups can hide or reverse the relationship within each group."),
()=>{const a=R(5,50),b=P([0.8,1.5,2.4,3.2,-1.6,-2.5]),x=R(4,25);
 return Q(`Using ŷ = ${a} ${b<0?"− "+(-b):"+ "+b}x, what is the predicted value when x = ${x}?`,g(a+b*x),[g(a*x+b),g(a+b),g(b*x),g(a-b*x)],`ŷ = ${a} ${b<0?"−":"+"} ${Math.abs(b)}(${x}) = ${g(a+b*x)}.`);},
()=>{const r2=P([0.36,0.49,0.64,0.81,0.25]),neg=Math.random()<0.5,r=Math.sqrt(r2)*(neg?-1:1);
 return Q(`A regression line has a ${neg?"negative":"positive"} slope and r² = ${r2}. What is r?`,f(r),[f(-r),f(r2),f(r2*r2),f(neg?-r2:r2)],`r = ${neg?"−":"+"}√${r2} = ${f(r)}; r has the same sign as the slope.`);},
()=>{const a=R(20,60),b=R(20,60),c=R(20,60),d=R(20,60),t=a+b+c+d;
 return Q(`A two-way table of ${t} students: ${a} freshmen prefer cats, ${b} freshmen prefer dogs, ${c} seniors prefer cats, ${d} seniors prefer dogs. What is the marginal proportion of students who prefer dogs?`,f((b+d)/t,3),[f(b/(a+b),3),f(d/(c+d),3),f((a+c)/t,3),f(b/t,3)],`Dogs: ${b} + ${d} = ${b+d} out of ${t} → ${f((b+d)/t,3)}.`);},
()=>{const b=P([1.2,2.5,-0.8,4.5]),ctx=P(["temperature (°F)","age (years)","hours of practice"]);
 return Q(`A model predicts y from ${ctx} with slope ${b}. If ${ctx} increases by 10, the predicted y changes by:`,`${b<0?"decreases by ":"increases by "}${g(Math.abs(10*b))}`,[`${b<0?"decreases by ":"increases by "}${g(Math.abs(b))}`,`${b<0?"increases by ":"decreases by "}${g(Math.abs(10*b))}`,`${b<0?"decreases by ":"increases by "}${g(Math.abs(b)+10)}`,`does not change`],`Slope × change in x = ${b} × 10 = ${g(10*b)}.`);},
],[["Explanatory vs response","x explains or predicts; y is the response"],["Sum of residuals","Always 0 for the LSRL"],["Least squares","Minimizes Σ(residual)²"],["r vs r²","r = ±√r², with the same sign as the slope"],["Outlier vs influential","Outlier: large residual. Influential: changes the line a lot when removed"],["Transformations","log y linear in x → exponential; log y linear in log x → power"],["Two-way tables","Marginal = row/column total ÷ grand total; conditional = within one row/column"],["Simpson's paradox","Association reverses when a lurking variable is included"],["Interpret slope","For each 1-unit increase in x, predicted y increases/decreases by b"]]);

ADD("unit-3",[
S("A teacher chooses a random starting point and then selects every 10th student on the class list. This is:","A systematic random sample",["A simple random sample","A stratified sample","A cluster sample","A convenience sample"],"Systematic sampling picks every kth individual after a random start."),
S("Collecting data from every individual in the population is called a:","Census",["Sample survey","Experiment","Observational study","Stratified sample"],"A census measures the entire population."),
S("What is the main purpose of a control group in an experiment?","To provide a baseline for comparison",["To increase the sample size","To make the study observational","To eliminate the need for randomization","To ensure blinding"],"Comparing to a control group shows the effect of the treatment."),
S("Replication in an experiment means:","Using enough experimental units in each treatment group so chance variation can be distinguished from treatment effects",["Repeating the survey with the same people","Using two control groups","Blocking by gender","Making the study double-blind"],"More units per treatment → more reliable comparison."),
S("Increasing the sample size in a survey will:","Reduce sampling variability but not bias",["Eliminate bias","Increase bias","Have no effect on variability","Make the survey a census"],"A larger biased sample is still biased — just more precisely wrong."),
S("A result is called statistically significant in an experiment when:","The observed difference is too large to plausibly be due to the random assignment alone.",["The sample was random.","The treatment worked for every subject.","The difference is exactly 0.","The study was double-blind."],"Significance means chance variation from random assignment is unlikely to explain the difference."),
S("In a single-blind experiment:","Either the subjects or the people evaluating responses (but not both) do not know which treatment was given.",["Nobody knows the treatments.","Subjects get one treatment each.","There is only one treatment.","The researchers choose who gets which treatment."],"Double-blind = both groups unaware."),
S("The list of individuals from which a sample is actually drawn is called the:","Sampling frame",["Population","Census","Strata","Block"],"Undercoverage happens when the sampling frame leaves out part of the population."),
()=>{const a=P([2,3,4]),b=P([2,3]);
 return Q(`An experiment studies ${a} levels of fertilizer and ${b} levels of watering. Every combination is used. How many treatments are there?`,String(a*b),[String(a+b),String(a),String(b),String(a*b*2)],`Treatments are combinations of factor levels: ${a} × ${b} = ${a*b}.`);},
S("Which study design best shows that a new teaching method causes higher test scores?","Randomly assign students to the new method or the standard method and compare scores.",["Compare scores of students who chose the new method with those who didn't.","Survey teachers about which method they prefer.","Compare this year's scores with last year's.","Give the new method to the best students and compare."],"Only random assignment balances other variables, allowing a cause-and-effect conclusion."),
],[["Systematic sample","Random start, then every kth individual"],["Convenience sample","Easy-to-reach individuals — usually biased"],["Census","Data from every individual in the population"],["Sampling frame","The list the sample is actually drawn from"],["Experimental unit / subject","What treatments are applied to (subjects if people)"],["Factor / level / treatment","Explanatory variable / its values / a combination of levels"],["Control group","Baseline group (placebo or current treatment)"],["Replication","Enough units per treatment to see real differences"],["Statistically significant","Too large to be explained by chance alone"],["Larger samples","Reduce variability, NOT bias"]]);

ADD("unit-4",[
S("For a continuous random variable X, P(X = 5) is:","0",["Always 0.5","Equal to the density at 5","1","Impossible to determine"],"Probabilities for continuous variables are areas; a single point has no area."),
S("Which is the best first step in designing a simulation?","Describe how to use a chance device to imitate one trial of the process.",["Compute the exact probability.","Run 10 trials.","Decide the answer you expect.","Use a calculator's normalcdf."],"State the model, assign outcomes to random digits/numbers, describe one trial, then repeat."),
S("Drawing cards from a deck WITH replacement makes the draws:","Independent",["Mutually exclusive","Dependent","Complementary","Impossible"],"Replacing the card restores the deck, so earlier draws don't affect later ones."),
S("Which pair of events is mutually exclusive?","Rolling a 2 and rolling an odd number on one roll of a die",["Being a junior and playing soccer","Rolling a 2 and rolling an even number on one roll","Drawing a heart and drawing a king","Being over 18 and owning a car"],"2 is not odd, so both cannot happen at once."),
()=>{const ps=[0.1,0.15,0.2,0.25,0.3].sort(()=>Math.random()-0.5).slice(0,3),miss=1-ps.reduce((a,b)=>a+b,0);
 return Q(`A probability model has four outcomes. Three of them have probabilities ${ps.join(", ")}. What is the probability of the fourth outcome?`,f(miss),[f(ps.reduce((a,b)=>a+b,0)),f(1-ps[0]),f(miss/2),f(0.25)],`All probabilities must sum to 1: 1 − (${ps.join(" + ")}) = ${f(miss)}.`);},
()=>{const pab=P([0.06,0.08,0.12,0.15,0.2]),pb=P([0.3,0.4,0.5,0.6]);
 return Q(`P(A and B) = ${pab} and P(B) = ${pb}. Find P(A | B).`,f(pab/pb,3),[f(pab*pb,3),f(pb/pab,3),f(pab,3),f(pb-pab,3)],`P(A | B) = ${fr("P(A and B)","P(B)")} = ${fr(pab,pb)} = ${f(pab/pb,3)}.`);},
()=>{const p=P([0.1,0.2,0.25,0.4,0.05]);
 return Q(`The probability of success on each trial is ${p}. On average, how many trials does it take to get the first success?`,g(1/p),[g(p),g(1/(1-p)),g((1-p)/p),g(10*p)],`Geometric mean: μ = ${fr(1,"p")} = ${fr(1,p)} = ${g(1/p)}.`);},
()=>{const n=P([4,5,6]),p=P([0.2,0.3,0.5]),k=1;let cdf=0;for(let i=0;i<=k;i++)cdf+=C(n,i)*p**i*(1-p)**(n-i);
 return Q(`X is binomial with n = ${n} and p = ${p}. Find P(X ≤ 1).`,f(cdf,4),[f(C(n,1)*p*(1-p)**(n-1),4),f((1-p)**n,4),f(1-cdf,4),f(p+(1-p)**n,4)],`P(X ≤ 1) = P(0) + P(1) = ${f((1-p)**n,4)} + ${f(C(n,1)*p*(1-p)**(n-1),4)} = ${f(cdf,4)}. Calculator: binomcdf(${n}, ${p}, 1).`);},
()=>{const p0=P([0.2,0.3,0.4,0.5]),p1=1-p0,v=[0,P([2,4,10])],mu=v[1]*p1,sd=Math.sqrt((0-mu)**2*p0+(v[1]-mu)**2*p1);
 return Q(`X = 0 with probability ${p0} and X = ${v[1]} with probability ${g(p1)}. What is the standard deviation of X?`,f(sd),[f(sd*sd),f(mu),f(Math.sqrt(mu)),f(v[1]/2)],`μ = ${v[1]}(${g(p1)}) = ${g(mu)}. Var = (0 − ${g(mu)})²(${p0}) + (${v[1]} − ${g(mu)})²(${g(p1)}) = ${f(sd*sd,3)}. σ = ${f(sd)}.`);},
()=>{const n=P([3,4,5,9]),m=R(10,30),s=R(2,6);
 return Q(`Each of ${n} independent packages has weight with mean ${m} oz and SD ${s} oz. What are the mean and SD of the total weight?`,`mean ${n*m}, SD ${f(Math.sqrt(n)*s)}`,[`mean ${n*m}, SD ${n*s}`,`mean ${m}, SD ${s}`,`mean ${n*m}, SD ${f(s/Math.sqrt(n))}`,`mean ${n*m}, SD ${n*s*s}`],`Means add: ${n}(${m}) = ${n*m}. Variances add: ${n}(${s}²) = ${n*s*s}, so SD = √${n*s*s} = ${f(Math.sqrt(n)*s)}.`);},
],[["Mutually exclusive (disjoint)","Can't happen together: P(A and B) = 0"],["Independent vs disjoint","Disjoint events with positive probability are NEVER independent"],["Multiplication rule","P(A and B) = P(A)·P(B | A)"],["Probability model rules","Each 0 ≤ P ≤ 1; all outcomes sum to 1"],["Simulation steps","Model, assign digits, describe one trial, repeat many times, estimate"],["Continuous RV","P(X = a) = 0; probabilities are areas"],["Var of discrete RV","σ² = Σ(x − μ)²·P(x)"],["Sum of n iid RVs","Mean nμ, SD √n·σ"],["Geometric mean","μ = 1/p"],["binompdf vs binomcdf","pdf: P(X = k); cdf: P(X ≤ k)"]]);

ADD("unit-5",[
S("If the population is normally distributed, the sampling distribution of x̄ is:","Normal for any sample size",["Normal only if n ≥ 30","Skewed for small n","Uniform","Normal only if n ≤ 10% of N"],"A normal population gives a normal sampling distribution of x̄ for every n."),
S("Which change reduces the variability of a sample statistic?","Increasing the sample size",["Increasing the population size","Using a convenience sample","Decreasing the sample size","Using a biased method"],"Spread of a sampling distribution shrinks as n increases."),
S("Using the sample maximum to estimate the population maximum is:","Biased — it tends to underestimate",["Unbiased","Biased — it tends to overestimate","Unbiased with high variability","Not a statistic"],"A sample's largest value can never exceed the population maximum and is usually smaller."),
S("A statistic has low bias and high variability. On a target, its estimates would be:","Spread widely but centered on the bullseye",["Tightly clustered away from the bullseye","Tightly clustered on the bullseye","Spread widely away from the bullseye","All exactly on the bullseye"],"Low bias = centered on the parameter; high variability = widely scattered."),
S("Does the population size affect the spread of the sampling distribution of p̂ (when n ≤ 10% of N)?","No — it depends on n and p, not on the population size.",["Yes — larger populations give more spread.","Yes — larger populations give less spread.","Only for small populations.","Only if p = 0.5."],"σ_p̂ = √(p(1−p)/n) does not involve N."),
()=>{const s=P([10,12,15,20,24]),n=P([4,9,16,25,36,100]);
 return Q(`A population has σ = ${s}. What is the standard deviation of x̄ for random samples of size ${n}?`,f(s/Math.sqrt(n)),[f(s/n),f(s*Math.sqrt(n)),String(s),f(s*s/n)],`σ_x̄ = ${fr("σ","√n")} = ${fr(s,"√"+n)} = ${f(s/Math.sqrt(n))}.`);},
()=>{const p1=P([0.3,0.4,0.5]),p2=P([0.2,0.35,0.45]),n1=P([100,150,200]),n2=P([100,120,250]);const sd=Math.sqrt(p1*(1-p1)/n1+p2*(1-p2)/n2);
 return Q(`Two independent random samples: n₁ = ${n1} from a population with p₁ = ${p1}, and n₂ = ${n2} with p₂ = ${p2}. What is the SD of p̂₁ − p̂₂?`,f(sd,4),[f(Math.sqrt(p1*(1-p1)/n1)-Math.sqrt(p2*(1-p2)/n2),4),f(p1*(1-p1)/n1+p2*(1-p2)/n2,4),f(Math.sqrt(p1*(1-p1)/n1)+Math.sqrt(p2*(1-p2)/n2),4),f(Math.abs(p1-p2),4)],`σ = ${rt(fr("p₁(1−p₁)","n₁")+" + "+fr("p₂(1−p₂)","n₂"))} = ${f(sd,4)} (variances add).`);},
()=>{const s1=R(5,15),s2=R(5,15),n1=P([25,36,50]),n2=P([25,40,64]);const sd=Math.sqrt(s1*s1/n1+s2*s2/n2);
 return Q(`Independent samples: n₁ = ${n1} from a population with σ₁ = ${s1}; n₂ = ${n2} with σ₂ = ${s2}. What is the SD of x̄₁ − x̄₂?`,f(sd,3),[f(s1/Math.sqrt(n1)-s2/Math.sqrt(n2),3),f(s1/Math.sqrt(n1)+s2/Math.sqrt(n2),3),f(Math.sqrt((s1*s1+s2*s2)/(n1+n2)),3),f(s1*s1/n1+s2*s2/n2,3)],`σ = ${rt(fr("σ₁²","n₁")+" + "+fr("σ₂²","n₂"))} = ${rt(fr(s1*s1,n1)+" + "+fr(s2*s2,n2))} = ${f(sd,3)}.`);},
()=>{const p=P([0.4,0.5,0.6]),n=P([100,200]),s=Math.sqrt(p*(1-p)/n),c=+(p+P([0.05,0.07,0.08])).toFixed(2),z=(c-p)/s;
 return Q(`If p = ${p} and n = ${n}, find P(p̂ > ${c}) using the normal approximation.`,f(1-Phi(z),4),[f(Phi(z),4),f(1-Phi(c),4),f(1-Phi((c-p)/Math.sqrt(p*(1-p))),4),f(1-Phi(z/2),4)],`σ_p̂ = ${rt(fr(p+"("+g(1-p)+")",n))} = ${f(s,4)}. z = ${fr(c+" − "+p,f(s,4))} = ${f(z)}. P(Z > ${f(z)}) = ${f(1-Phi(z),4)}.`);},
],[["Normal population","x̄ is normal for ANY n"],["Bias","Center of sampling distribution ≠ parameter"],["Variability","Spread of the sampling distribution; decreases as n increases"],["SD of p̂₁ − p̂₂","√(p₁(1−p₁)/n₁ + p₂(1−p₂)/n₂)"],["SD of x̄₁ − x̄₂","√(σ₁²/n₁ + σ₂²/n₂)"],["Population size","Doesn't affect spread when n ≤ 10% of N"],["Sample max","Biased estimator of the population max (underestimates)"],["Simulated sampling distribution","Dotplot of a statistic from many simulated samples"]]);

ADD("unit-6",[
S("Why is p₀ (not p̂) used in the standard error for a one-proportion z test?","Because the test is carried out assuming H₀ is true.",["Because p̂ is biased.","Because p₀ is always 0.5.","Because it makes the p-value smaller.","Because the sample is small."],"The p-value is calculated under the null model, so we use p₀."),
S("“Fail to reject H₀” means:","The data do not give convincing evidence for Hₐ.",["H₀ is proven true.","H₀ is definitely false.","The sample was biased.","The p-value was less than α."],"We never “accept” H₀ — we just lack evidence against it."),
S("The significance level α is:","The probability of a Type I error",["The probability of a Type II error","The power of the test","The p-value","The confidence level"],"α = P(reject H₀ | H₀ true)."),
S("Which conditions are checked for a confidence interval for p?","Random, 10%, and at least 10 successes and 10 failures in the sample",["n ≥ 30 only","Population is normal","All expected counts ≥ 5","σ is known"],"For a CI, check large counts with the sample counts n·p̂ and n(1 − p̂)."),
S("A test of H₀: p = 0.5 vs Hₐ: p ≠ 0.5 gives z = 1.80. The p-value is:","About 0.072",["About 0.036","About 0.964","About 0.18","About 0.50"],"Two-sided: 2 × P(Z > 1.80) = 2(0.0359) ≈ 0.072."),
S("A medicine is tested with H₀: p = 0.20 (the cure rate is unchanged) vs Hₐ: p > 0.20. A Type II error would be:","Concluding the medicine does not improve the cure rate when it actually does",["Concluding the medicine improves the cure rate when it doesn't","Rejecting H₀ when it is true","Using α = 0.05","Taking a biased sample"],"Type II = failing to reject a false H₀."),
()=>{const n=P([100,150,200,250]),ph=P([0.32,0.45,0.58,0.64]),z=P([[1.645,90],[1.96,95]]),me=z[0]*Math.sqrt(ph*(1-ph)/n);
 return Q(`A random sample of ${n} gives p̂ = ${ph}. What is the ${z[1]}% confidence interval for p?`,`(${f(ph-me,3)}, ${f(ph+me,3)})`,[`(${f(ph-z[0]*ph*(1-ph)/n,3)}, ${f(ph+z[0]*ph*(1-ph)/n,3)})`,`(${f(ph-Math.sqrt(ph*(1-ph)/n),3)}, ${f(ph+Math.sqrt(ph*(1-ph)/n),3)})`,`(${f(ph-2*me,3)}, ${f(ph+2*me,3)})`,`(${f(ph-z[0]*Math.sqrt(ph/n),3)}, ${f(ph+z[0]*Math.sqrt(ph/n),3)})`],`${ph} ± ${z[0]}${rt(fr(ph+"("+g(1-ph)+")",n))} = ${ph} ± ${f(me,3)}.`);},
()=>{const x1=R(40,80),n1=P([100,120,150]),x2=R(30,70),n2=P([100,130,160]);const pc=(x1+x2)/(n1+n2);
 return Q(`In a two-proportion z test, sample 1 has ${x1} successes out of ${n1} and sample 2 has ${x2} out of ${n2}. What is the pooled (combined) proportion p̂_c?`,f(pc,3),[f((x1/n1+x2/n2)/2,3),f(x1/n1-x2/n2,3),f((x1+x2)/n1,3),f(x1/(n1+n2),3)],`p̂_c = ${fr("x₁ + x₂","n₁ + n₂")} = ${fr(x1+" + "+x2,n1+" + "+n2)} = ${f(pc,3)}.`);},
()=>{const z=+(P([1.25,1.5,1.75,2.05,2.33,2.6])).toFixed(2),two=Math.random()<0.5,pv=(1-Phi(z))*(two?2:1);
 return Q(`A one-proportion z test gives z = ${z}. Find the p-value for Hₐ: p ${two?"≠":">"} p₀.`,f(pv,4),[f(two?1-Phi(z):2*(1-Phi(z)),4),f(Phi(z),4),f(1-Phi(z/2),4),f(z/10,4)],`P(Z > ${z}) = ${f(1-Phi(z),4)}${two?"; two-sided → double it: "+f(pv,4):""}.`);},
S("A 95% CI for p is (0.42, 0.51). Which value of p₀ would be rejected by a two-sided test at α = 0.05?","0.53",["0.45","0.42","0.48","0.50"],"Values outside the 95% CI are rejected at α = 0.05; 0.53 is outside."),
],[["Hypotheses","About the PARAMETER; H₀ has “=”; Hₐ is what you want evidence for"],["Fail to reject","Not convincing evidence for Hₐ (never “accept H₀”)"],["CI large counts","n·p̂ ≥ 10 and n(1 − p̂) ≥ 10"],["Test large counts","n·p₀ ≥ 10 and n(1 − p₀) ≥ 10"],["Two-proportion CI","(p̂₁ − p̂₂) ± z*√(p̂₁(1−p̂₁)/n₁ + p̂₂(1−p̂₂)/n₂)"],["Pooled proportion","p̂_c = (x₁ + x₂)/(n₁ + n₂) — used in the 2-prop z TEST"],["Sample size for ME",`n ≥ (${fr("z*","ME")})²·p*(1 − p*), use p* = 0.5 if unknown`],["Two-sided p-value","Double the one-tail area"],["Margin of error depends on","Confidence level (z*) and n; NOT on population size"],["Conclusion template","Because p-value (=) < α, we reject H₀. There is convincing evidence that [Hₐ in context]"]]);

ADD("unit-7",[
S("t procedures for a mean are called robust. This means:","They work reasonably well even when the population is not exactly normal, unless there are outliers or strong skewness.",["They are never affected by outliers.","They require σ to be known.","They only work for n ≥ 30.","They give the same answer as z procedures."],"Moderate departures from normality are fine, especially as n increases."),
S("A researcher compares the mean commute times of randomly selected students at two different schools. Which procedure is appropriate?","Two-sample t procedures",["Paired t procedures","One-sample t procedures","Chi-square test","Two-proportion z test"],"Two independent groups measured once each → two-sample t."),
S("Hypotheses for a paired t test comparing before and after scores are written about:","μ_d, the true mean difference",["μ₁ − μ₂ of two independent groups","p₁ − p₂","x̄_d","The median difference"],"Paired data → parameter is the mean of the differences."),
S("A random sample of size 10 contains an extreme outlier. Using a one-sample t interval is:","Not appropriate — the outlier makes the normal condition questionable",["Fine, because t is robust to any outlier","Fine, because n < 30","Required by the CLT","Better than using a z interval"],"With small samples, outliers or strong skew can make t procedures unreliable."),
S("If a 95% confidence interval for μ does not contain μ₀, then a two-sided test of H₀: μ = μ₀ at α = 0.05 will:","Reject H₀",["Fail to reject H₀","Give a p-value greater than 0.05","Be impossible to carry out","Always give p = 0.05"],"A C% CI corresponds to a two-sided test at α = 1 − C."),
()=>{const n1=R(8,30),n2=R(8,30);
 return Q(`For a two-sample t procedure with n₁ = ${n1} and n₂ = ${n2}, what is the conservative degrees of freedom?`,String(Math.min(n1,n2)-1),[String(n1+n2-2),String(Math.max(n1,n2)-1),String(n1+n2),String(Math.min(n1,n2))],`Conservative df = smaller n − 1 = ${Math.min(n1,n2)} − 1 = ${Math.min(n1,n2)-1}. (Calculators use a larger df.)`);},
()=>{const s1=R(4,12),s2=R(4,12),n1=P([20,25,30,40]),n2=P([20,25,36,50]);const se=Math.sqrt(s1*s1/n1+s2*s2/n2);
 return Q(`Two independent samples: s₁ = ${s1}, n₁ = ${n1}; s₂ = ${s2}, n₂ = ${n2}. What is the standard error of x̄₁ − x̄₂?`,f(se,3),[f(s1/Math.sqrt(n1)+s2/Math.sqrt(n2),3),f(Math.sqrt((s1+s2)/(n1+n2)),3),f(s1*s1/n1+s2*s2/n2,3),f(Math.abs(s1/Math.sqrt(n1)-s2/Math.sqrt(n2)),3)],`SE = ${rt(fr("s₁²","n₁")+" + "+fr("s₂²","n₂"))} = ${rt(fr(s1*s1,n1)+" + "+fr(s2*s2,n2))} = ${f(se,3)}.`);},
()=>{const a=R(20,60),w=R(2,9)+P([0,0.5]),b=a+2*w;
 return Q(`A confidence interval for μ is (${a}, ${b}). What are the point estimate and the margin of error?`,`x̄ = ${g((a+b)/2)}, ME = ${g(w)}`,[`x̄ = ${g((a+b)/2)}, ME = ${g(2*w)}`,`x̄ = ${a}, ME = ${g(b-a)}`,`x̄ = ${g((a+b)/2)}, ME = ${g(w/2)}`,`x̄ = ${b}, ME = ${g(w)}`],`Point estimate = midpoint = (${a} + ${b})/2 = ${g((a+b)/2)}. ME = half the width = (${b} − ${a})/2 = ${g(w)}.`);},
S("For a fixed confidence level, which sample gives the largest t*?","n = 5",["n = 15","n = 30","n = 100","n = 1000"],"Fewer degrees of freedom → heavier tails → larger t*."),
],[["Robust","t procedures tolerate mild non-normality; not outliers/strong skew in small samples"],["Two-sample vs paired","Independent groups → two-sample; same subjects/matched → paired"],["Two-sample t statistic",`t = ${fr("(x̄₁ − x̄₂) − 0","√(s₁²/n₁ + s₂²/n₂)")}`],["Conservative df","smaller n − 1 (calculator df is larger)"],["Point estimate from CI","Midpoint of the interval"],["ME from CI","Half the width of the interval"],["Paired hypotheses","H₀: μ_d = 0 vs Hₐ: μ_d >, <, ≠ 0"],["Normal condition (graph)","Check a dotplot/boxplot of the sample (or differences) for skew/outliers"]]);

ADD("unit-8",[
S("Which statement about the χ² statistic is always true?","It is never negative.",["It can be negative when observed < expected.","It equals 0 when the null is false.","It is always less than df.","It follows a normal distribution."],"It is a sum of squared terms divided by positive expected counts."),
S("The null hypothesis for a chi-square goodness-of-fit test states that:","The population distribution of the categorical variable matches the claimed distribution.",["Two variables are associated.","All proportions are different.","The sample proportions equal the claimed values.","The means are equal."],"H₀ is about the population, not the sample."),
S("The null hypothesis for a chi-square test for homogeneity states that:","The distribution of the categorical variable is the same for each population.",["The two variables are independent in one population.","Each category has the same count.","All expected counts are at least 5.","The populations have equal sizes."],"Homogeneity compares distributions across several populations or treatments."),
S("Why must chi-square tests use counts rather than percentages?","The χ² statistic and its distribution depend on the actual sample sizes.",["Percentages are biased.","Percentages can't be added.","Counts are always larger than 5.","It makes the p-value smaller."],"Using percentages would give the same χ² for a sample of 50 or 5,000 — wrong."),
S("Chi-square tests are:","Always right-tailed",["Always left-tailed","Two-tailed","Sometimes left-tailed","Not based on p-values"],"Only large values of χ² provide evidence against H₀."),
()=>{const n=P([200,300,500]),p=P([[0.5,0.3,0.2],[0.4,0.35,0.25],[0.6,0.25,0.15]]);const i=R(0,2);
 return Q(`A claim says three categories occur in proportions ${p.join(", ")}. In a sample of ${n}, what is the expected count for the category with proportion ${p[i]}?`,g(n*p[i]),[g(n/3),g(p[i]*100),g(n*(1-p[i])),g(n*p[i]/2)],`Expected = n·p = ${n}(${p[i]}) = ${g(n*p[i])}.`);},
()=>{const c=[R(2,30)/10,R(1,40)/10,R(1,25)/10,R(2,20)/10],t=c.reduce((a,b)=>a+b,0);
 return Q(`The components of a χ² statistic are ${c.map(x=>f(x,1)).join(", ")}. What is χ²?`,f(t,1),[f(t/4,1),f(Math.sqrt(t),1),f(t*t,1),f(Math.max(...c),1)],`χ² is the sum of the components: ${c.map(x=>f(x,1)).join(" + ")} = ${f(t,1)}.`);},
()=>{const r=R(2,4),c=R(3,5);
 return Q(`Random samples from ${r} schools are compared on a categorical variable with ${c} categories (chi-square test for homogeneity). What is the df?`,String((r-1)*(c-1)),[String(r*c-1),String(c-1),String(r-1),String(r+c-2)],`df = (${r} − 1)(${c} − 1) = ${(r-1)*(c-1)}.`);},
],[["Chi-square H₀ (independence)","No association between the two variables in the population"],["Chi-square H₀ (homogeneity)","Same distribution of the variable in each population"],["Chi-square H₀ (GOF)","The claimed distribution is correct"],["Always right-tailed","Large χ² = evidence against H₀"],["Use counts","Never percentages or proportions in the χ² formula"],["Expected count (GOF)","n × claimed proportion"],["χ² is never negative","Sum of squared differences ÷ expected"],["Mean of χ² distribution","Equals its df"]]);

ADD("unit-9",[
S("The standard error of the slope SE_b gets smaller when:","The x-values are more spread out (and n is larger)",["The x-values are close together","There are fewer data points","The residuals are larger","The correlation is closer to 0"],"SE_b = s/(sₓ√(n − 1)): larger sₓ and n → smaller SE_b."),
S("Which graph is used to check the Normal condition for inference about the slope?","A histogram or dotplot of the residuals",["A scatterplot of y vs x","A boxplot of x","A bar chart of y","A residual plot of residuals vs x"],"The residuals should be approximately normal (no strong skew/outliers)."),
S("Which graph is used to check the Linear and Equal SD conditions?","A residual plot",["A histogram of y","A boxplot of residuals","A normal probability plot of x","A bar chart"],"Look for no curved pattern (linear) and no fan shape (equal SD)."),
S("Regression output gives a two-sided p-value of 0.084 for the slope. For Hₐ: β > 0 (and b > 0), the p-value is:","0.042",["0.084","0.168","0.916","0.958"],"Computer output is two-sided; halve it for a one-sided test in the direction of b."),
S("The independence condition for slope inference when sampling without replacement requires:","n ≤ 10% of the population",["n ≥ 30","All residuals positive","r > 0.5","Equal sample sizes"],"Same 10% condition as other inference procedures."),
()=>{const a=+(R(100,600)/10).toFixed(1),b=+(P([1.35,2.8,0.62,4.1,-1.7])).toFixed(2),x=R(5,30);
 return Q(`Computer output shows Constant = ${a} and slope coefficient = ${b}. What is the predicted y when x = ${x}?`,f(a+b*x,2),[f(a*x+b,2),f(a+b,2),f(b*x,2),f(a-b*x,2)],`ŷ = ${a} ${b<0?"−":"+"} ${Math.abs(b)}(${x}) = ${f(a+b*x,2)}.`);},
()=>{const pv=P([0.003,0.012,0.041,0.068,0.12,0.27]),al=P([0.05,0.01]);
 return Q(`A t test for H₀: β = 0 gives a p-value of ${pv}. At α = ${al}, what is the correct conclusion?`,pv<al?"Reject H₀: convincing evidence of a linear relationship":"Fail to reject H₀: not convincing evidence of a linear relationship",[pv<al?"Fail to reject H₀: not convincing evidence of a linear relationship":"Reject H₀: convincing evidence of a linear relationship","Accept H₀: there is no relationship","The slope equals 0","The correlation is 1"],`Compare the p-value with α: ${pv} ${pv<al?"<":">"} ${al}.`);},
S("Regression output shows R-sq = 72.3%. This means:","72.3% of the variation in y is accounted for by the linear model with x.",["The slope is 0.723.","72.3% of points are on the line.","r = 0.723","The model predicts correctly 72.3% of the time."],"R-sq is r², the proportion of variation explained."),
],[["Check Linear & Equal SD","Residual plot: no curve, no fan shape"],["Check Normal","Histogram/dotplot of residuals: no strong skew/outliers"],["SE_b formula","s / (sₓ√(n − 1))"],["One-sided p from output","Output p-values are two-sided — halve if b is in the direction of Hₐ"],["R-sq on output","= r² × 100%"],["Interpret CI for slope","We are C% confident the interval captures the slope of the true regression line relating y to x"],["Prediction from output","ŷ = Constant + (Coef)·x"],["Population regression line","μ_y = α + βx"]]);

/* ======================= AP TASK WORDS ======================= */
const VERBS=[
["Calculate","Do the arithmetic and SHOW the work: formula or calculator command with the numbers plugged in, then the answer.","Calculate the probability that a randomly selected bag weighs more than 16.2 oz.","z = (16.2 − 16)/0.1 = 2.00; P(Z > 2.00) = 0.0228. (Or: normalcdf(16.2, 1E99, 16, 0.1) = 0.0228.)","Writing only “0.0228” with no work, or using unlabeled calculator syntax."],
["Compare","State similarities AND/OR differences using comparative words (greater than, less than, about the same) — for each feature asked about, in context.","Compare the distributions of commute times for City A and City B.","The median commute time for City A (25 min) is greater than for City B (18 min). City A's times are more variable (IQR 14 vs 8). Both are skewed right, and only City B has a high outlier.","Listing each group's values separately without a comparative word."],
["Construct","Make the graph, table, or interval that is asked for — complete, labeled, and correctly scaled.","Construct a 95% confidence interval for the true mean.","Name the procedure, check conditions, then compute: 42.3 ± 2.064(5.1/√25) = (40.19, 44.41).","Giving only the formula, or a graph with no axis labels or scale."],
["Describe","Give the important characteristics or features, in context — for a distribution: shape, center, variability, unusual features; for a scatterplot: direction, form, strength, unusual features.","Describe the relationship between hours studied and test score.","There is a strong, positive, linear relationship between hours studied and test score, with no obvious outliers.","Leaving out context (writing “x” and “y”) or forgetting a feature."],
["Determine","Reach a decision or a value using a correct method, and show how you got there.","Determine whether there is a gender bias in the selection of the team captain.","P(3 or more women in a random selection) = 0.42, which is not small, so there is not convincing evidence of a gender bias.","Giving a yes/no answer with no supporting calculation."],
["Estimate","Give an approximate value (often read from a graph or computed from a model), clearly stating it.","Estimate the median of the distribution from the cumulative relative frequency plot.","The cumulative relative frequency reaches 0.5 at about 34 minutes, so the median is approximately 34 minutes.","Not explaining where the estimate came from."],
["Explain","Give the reasons WHY — connect the statistical idea to the context with “because …”.","Explain why the researchers used random assignment.","Random assignment creates groups that are roughly equivalent in other variables (like fitness level), so a difference in weight loss can be attributed to the diet.","Restating the question or defining a term without connecting it to the context."],
["Identify","Name or point out the specific thing asked for — usually short, but specific and in context.","Identify the treatments, experimental units, and response variable.","Treatments: fertilizer A and fertilizer B. Experimental units: 40 tomato plants. Response variable: weight of tomatoes produced per plant (kg).","Being vague (“the plants” as the response variable)."],
["Interpret","Explain what a number or result MEANS in the context of the problem.","Interpret the slope of the regression line, b = 2.5.","For each additional hour of study, the predicted test score increases by about 2.5 points.","Leaving out “predicted,” or giving the meaning without context."],
["Justify","Give evidence (a calculation, a comparison, a reference to a graph or p-value) that SUPPORTS your claim.","Is there convincing evidence that the mean is greater than 20? Justify your answer.","Yes. Because the p-value of 0.004 is less than α = 0.05, we reject H₀; there is convincing evidence that the true mean is greater than 20.","Stating a conclusion with no supporting statistic."],
["Verify","Show that a condition or statement is true, using numbers (e.g., check that each condition holds).","Verify that the conditions for inference are met.","Random: stated random sample ✓. 10%: 150 < 10% of all voters ✓. Large counts: 150(0.4) = 60 ≥ 10 and 150(0.6) = 90 ≥ 10 ✓.","Writing “conditions are met” without showing the numbers."]
];
U["verbs"]={mcq:[
S("A question says “Interpret the value of r² = 0.81 in context.” Which response earns full credit?","About 81% of the variation in heart rate is accounted for by the linear model relating heart rate to minutes of exercise.",["r² = 0.81, so r = 0.9.","The model is 81% accurate.","81% of the points are on the line.","The relationship is strong."],"“Interpret” means explaining what the number means in context — here, variation in the response explained by the linear model."),
S("A question asks you to “Compare the distributions.” Which statement best meets the requirement?","“The median for Group A is greater than the median for Group B, and Group A's values are more spread out.”",["“Group A's median is 30. Group B's median is 22.”","“Both groups have medians and ranges.”","“Group A is skewed.”","“The groups are different.”"],"“Compare” requires comparative language (greater than, less than, similar to)."),
S("Which task word requires you to give evidence that supports a claim, such as a p-value compared with α?","Justify",["Identify","Describe","Estimate","Construct"],"“Justify” means support your answer with statistical evidence."),
S("A question says “Verify that the conditions for inference are met.” What is expected?","Check each condition and show the numbers (e.g., np₀ = 60 ≥ 10).",["Write “conditions are met.”","Name the test only.","Calculate the p-value.","Draw a histogram of the population."],"“Verify” means show that each condition is true, with numbers."),
S("“Describe the relationship” for a scatterplot should include:","Direction, form, strength, and unusual features, in context",["Only the correlation","Only the slope","The sample size","The equation of the line only"],"Describe = give the important features, in context."),
S("Which response best answers “Identify the response variable”?","The number of hours of sleep each student got the night before the test",["Sleep","The students","Whether sleep matters","The experiment"],"“Identify” answers should be specific and in context."),
S("“Explain why random assignment was used.” Which is the best answer?","To create roughly equivalent groups so that differences in the response can be attributed to the treatment",["Because it is random","To make the sample representative of the population","Because the study needed it","To make the sample size larger"],"“Explain” requires the reason, connected to the context."),
S("A question says “Calculate the test statistic.” Which response earns full credit?","z = (0.56 − 0.50)/√(0.5·0.5/200) = 1.70",["z = 1.70","The test statistic is large.","1-PropZTest","p = 0.045"],"“Calculate” requires showing work: the formula with values plugged in (or a labeled calculator command with inputs), then the answer."),
S("“Estimate the median from the graph.” Which response is best?","About 34 minutes, where the cumulative relative frequency reaches 0.5",["34","The median is in the middle","It cannot be determined","The median is the mean"],"“Estimate” — give an approximate value and show where it came from."),
],tasks:[],cards:VERBS.map(v=>[v[0],v[1]])};
function verbsTable(){
  return `<div class="vtab"><table><tr><th>Task word</th><th>What it requires</th><th>Example prompt → model response</th><th>Common mistake</th></tr>${VERBS.map(v=>`<tr><td class="vv">${v[0]}</td><td>${v[1]}</td><td><i>${v[2]}</i><div class="vm">${v[3]}</div></td><td class="vx">${v[4]}</td></tr>`).join("")}</table></div>`;
}

/* ======================= UI ======================= */
const NAMES={mcq:"Multiple choice",tasks:"Tasks",cards:"Study cards"};
const STATE={};
let MCQ_N=10;

function block(id,open){
  if(!U[id]) return "";
  return `<details class="prac" data-u="${id}"${open?" open":""}><summary>${id==="verbs"?"Task words: quiz · study cards":"Practice: multiple choice · tasks · study cards"}</summary>
  <div class="ptabs">${Object.keys(NAMES).filter(k=>U[id][k].length).map((k,i)=>`<button class="ptab${i?"":" on"}" data-m="${k}">${NAMES[k]}</button>`).join("")}</div>
  <div class="pbody"></div></details>`;
}
function bind(root){
  root.querySelectorAll("details.prac").forEach(d=>{
    const id=d.dataset.u; if(!STATE[id]) STATE[id]={mode:"mcq"};
    const st=STATE[id];
    const draw=()=>{ d.querySelectorAll(".ptab").forEach(b=>b.classList.toggle("on",b.dataset.m===st.mode)); const b=d.querySelector(".pbody");
      if(st.mode==="mcq") drawMcq(b,id,st); else if(st.mode==="tasks") drawTasks(b,id,st); else drawCards(b,id,st); };
    d.querySelectorAll(".ptab").forEach(b=>b.onclick=()=>{st.mode=b.dataset.m;draw();});
    const init=()=>{ if(!d.dataset.ready){d.dataset.ready=1;draw();} };
    if(d.open) init(); d.addEventListener("toggle",()=>{if(d.open)init();});
  });
}
function newMcq(id){ const pool=U[id].mcq; return SH(pool).slice(0,Math.min(MCQ_N,pool.length)).map(fn=>({...fn(),pick:-1})); }
function drawMcq(b,id,st){
  if(!st.mcq) st.mcq=newMcq(id);
  const qs=st.mcq, done=qs.filter(x=>x.pick>=0), right=done.filter(x=>x.pick===x.ai).length;
  b.innerHTML=`<div class="pbar"><span class="score">Score: <b>${right}</b> / ${done.length} answered of ${qs.length}</span><label class="nsel">Questions per set <select data-a="n">${[10,15,20].map(k=>`<option${k===MCQ_N?" selected":""}>${k}</option>`).join("")}</select></label><button class="pbtn" data-a="new">↻ New set of questions</button><button class="pbtn ghost" data-a="redo">Redo same set</button></div>`+
  qs.map((x,i)=>`<div class="mq"><div class="mqq"><b>${i+1}.</b> ${x.q}</div><div class="mch">${x.ch.map((c,j)=>{let cl="";if(x.pick>=0){if(j===x.ai)cl="ok";else if(j===x.pick)cl="bad";}return `<button class="mc ${cl}" data-i="${i}" data-j="${j}"${x.pick>=0?" disabled":""}><span>${"ABCDE"[j]}</span>${c}</button>`}).join("")}</div>${x.pick>=0?`<div class="mex ${x.pick===x.ai?"ok":"bad"}"><b>${x.pick===x.ai?"Correct!":"Not quite — the answer is "+"ABCDE"[x.ai]+"."}</b> ${x.ex}</div>`:""}</div>`).join("")+
  (done.length===qs.length?`<div class="pdone">You scored ${right} out of ${qs.length}. <button class="pbtn" data-a="new">Try a new set</button></div>`:"");
  b.querySelectorAll("button.mc").forEach(btn=>btn.onclick=()=>{qs[+btn.dataset.i].pick=+btn.dataset.j;const y=window.scrollY;drawMcq(b,id,st);window.scrollTo(0,y);});
  b.querySelectorAll("[data-a=new]").forEach(x=>x.onclick=()=>{st.mcq=newMcq(id);drawMcq(b,id,st);b.scrollIntoView({block:"nearest"});});
  b.querySelector("[data-a=n]").onchange=e=>{MCQ_N=+e.target.value;st.mcq=newMcq(id);drawMcq(b,id,st);};
  b.querySelector("[data-a=redo]").onclick=()=>{qs.forEach(x=>{x.pick=-1;});st.mcq=SH(qs).map(x=>{const a=x.ch[x.ai];const ch=SH(x.ch);return {...x,ch,ai:ch.indexOf(a)};});drawMcq(b,id,st);};
}
function drawTasks(b,id,st){
  const run=fn=>{const x=fn();return {t:MN(x.t),s:MN(x.s)};};
  if(!st.tasks) st.tasks=U[id].tasks.map(fn=>({fn,...run(fn),show:false}));
  b.innerHTML=`<div class="pbar"><span class="score">Free-response style tasks — try each one on paper, then check the solution.</span><button class="pbtn" data-a="newall">↻ New numbers for all</button></div>`+
  st.tasks.map((t,i)=>`<div class="tk"><div class="tkh">Task ${i+1}</div><div class="tkq">${t.t}</div><div class="tkb"><button class="pbtn ghost" data-s="${i}">${t.show?"Hide solution":"Show solution"}</button><button class="pbtn ghost" data-n="${i}">↻ New numbers</button></div>${t.show?`<div class="tks">${t.s}</div>`:""}</div>`).join("");
  b.querySelectorAll("[data-s]").forEach(x=>x.onclick=()=>{const t=st.tasks[+x.dataset.s];t.show=!t.show;drawTasks(b,id,st);});
  b.querySelectorAll("[data-n]").forEach(x=>x.onclick=()=>{const i=+x.dataset.n,fn=st.tasks[i].fn;st.tasks[i]={fn,...run(fn),show:false};drawTasks(b,id,st);});
  b.querySelector("[data-a=newall]").onclick=()=>{st.tasks=null;drawTasks(b,id,st);};
}
function drawCards(b,id,st){
  if(!st.deck){st.deck=U[id].cards.map((c,i)=>i);st.ci=0;st.flip=false;st.known=0;}
  const all=U[id].cards;
  if(!st.deck.length){b.innerHTML=`<div class="pdone">🎉 You marked all ${all.length} cards as known! <button class="pbtn" data-a="reset">Start over</button></div>`;b.querySelector("[data-a=reset]").onclick=()=>{st.deck=null;drawCards(b,id,st);};return;}
  const c=all[st.deck[st.ci%st.deck.length]];
  b.innerHTML=`<div class="pbar"><span class="score">${st.deck.length} card${st.deck.length>1?"s":""} left · ${all.length-st.deck.length} known</span><button class="pbtn ghost" data-a="shuf">Shuffle</button><button class="pbtn ghost" data-a="reset">Reset deck</button></div>
  <div class="fcard${st.flip?" flip":""}" tabindex="0"><div class="cf">${st.flip?c[1]:c[0]}</div><div class="chint">${st.flip?"Answer":"Click the card to flip"}</div></div>
  <div class="cbtns"><button class="pbtn ghost" data-a="prev">← Previous</button><button class="pbtn again" data-a="again">Again</button><button class="pbtn got" data-a="got">Got it ✓</button><button class="pbtn ghost" data-a="next">Next →</button></div>`;
  const re=()=>drawCards(b,id,st);
  b.querySelector(".fcard").onclick=()=>{st.flip=!st.flip;re();};
  b.querySelector("[data-a=next]").onclick=()=>{st.ci=(st.ci+1)%st.deck.length;st.flip=false;re();};
  b.querySelector("[data-a=prev]").onclick=()=>{st.ci=(st.ci-1+st.deck.length)%st.deck.length;st.flip=false;re();};
  b.querySelector("[data-a=again]").onclick=()=>{const k=st.deck.splice(st.ci%st.deck.length,1)[0];st.deck.push(k);st.flip=false;if(st.ci>=st.deck.length)st.ci=0;re();};
  b.querySelector("[data-a=got]").onclick=()=>{st.deck.splice(st.ci%st.deck.length,1);st.flip=false;if(st.ci>=st.deck.length)st.ci=0;re();};
  b.querySelector("[data-a=shuf]").onclick=()=>{st.deck=SH(st.deck);st.ci=0;st.flip=false;re();};
  b.querySelector("[data-a=reset]").onclick=()=>{st.deck=null;re();};
}

const css=`.prac{margin:18px 0 0;border:1.5px solid var(--c,#111);background:#fff}
.prac>summary{cursor:pointer;padding:10px 14px;font-weight:600;font-size:19px;color:var(--c,#111);list-style:none}
.prac>summary::-webkit-details-marker{display:none}.prac>summary::before{content:"▸ "}.prac[open]>summary::before{content:"▾ "}
.ptabs{display:flex;gap:6px;padding:0 14px 10px;flex-wrap:wrap}
.ptab{font:inherit;font-size:16px;padding:4px 14px;border:1.5px solid var(--c,#111);background:#fff;color:var(--c,#111);cursor:pointer}
.ptab.on{background:var(--c,#111);color:#fff}
.pbody{padding:0 14px 14px}
.pbar{display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:8px 0;border-top:1px solid #ddd;margin-bottom:6px}
.nsel{font-size:15px;color:#333}.nsel select{font:inherit;font-size:15px;margin-left:4px}
.pbar .score{flex:1;font-style:italic;color:#333;min-width:200px}
.pbtn{font:inherit;font-size:15px;padding:3px 12px;border:1px solid var(--c,#111);background:var(--c,#111);color:#fff;cursor:pointer}
.pbtn.ghost{background:#fff;color:var(--c,#111)}.pbtn.got{background:#2a7a46;border-color:#2a7a46}.pbtn.again{background:#b8650f;border-color:#b8650f}
.mq{padding:10px 0;border-top:1px dashed #ccc}.mqq{font-size:17px;margin-bottom:6px;line-height:1.45}
.mch{display:grid;gap:5px}
.mc{font:inherit;font-size:16px;text-align:left;display:flex;gap:10px;align-items:baseline;padding:5px 10px;border:1px solid #bbb;background:#fafafa;cursor:pointer;color:#111;line-height:1.4}
.mc span{font-weight:700;color:var(--c,#111);min-width:1em}
.mc:hover:not([disabled]){border-color:var(--c,#111);background:#fff}
.mc[disabled]{cursor:default}.mc.ok{background:#e3f3e8;border-color:#2a7a46}.mc.bad{background:#fbe5e2;border-color:#b03a2e}
.mex{margin-top:6px;padding:8px 10px;font-size:15.5px;line-height:1.5;border-left:4px solid #2a7a46;background:#f3faf5}.mex.bad{border-color:#b03a2e;background:#fdf3f2}
.pdone{margin-top:10px;padding:12px;text-align:center;font-size:18px;border:1px dashed var(--c,#111)}
.tk{border-top:1px dashed #ccc;padding:10px 0}.tkh{font-weight:700;color:var(--c,#111)}.tkq{font-size:17px;line-height:1.5;margin:4px 0 8px}
.tkb{display:flex;gap:6px}.tks{margin-top:8px;padding:10px 12px;background:#f7f7f4;border-left:4px solid var(--c,#111);font-size:16px;line-height:1.6}
.fcard{margin:6px auto;max-width:560px;min-height:180px;border:2px solid var(--c,#111);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:22px;cursor:pointer;text-align:center;background:#fff;box-shadow:4px 4px 0 var(--c,#111);user-select:none}
.fcard.flip{background:#f7f7f4}.fcard .cf{font-size:22px;line-height:1.45}.fcard:not(.flip) .cf{font-weight:700;color:var(--c,#111)}
.fcard .chint{margin-top:12px;font-size:13px;color:#777;font-style:italic}
.cbtns{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-top:12px}
.pf{display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;margin:0 2px;font-size:.92em;line-height:1.15}
.pf>span:first-child{border-bottom:1px solid currentColor;padding:0 3px}.pf>span:last-child{padding:0 3px}
.ov2{border-top:1px solid currentColor;padding:0 2px}
.vtab{overflow-x:auto;margin:8px 0 6px}.vtab table{width:100%;border-collapse:collapse;font-size:15.5px;min-width:760px}.vtab th{background:#1d2b44;color:#fff;text-align:left;padding:6px 8px}.vtab td{border-top:1px solid #ddd;padding:7px 8px;vertical-align:top;line-height:1.45}.vtab td.vv{font-weight:700;font-size:17px;color:#1d2b44;white-space:nowrap}.vtab .vm{margin-top:4px;padding:4px 8px;background:#f3faf5;border-left:3px solid #2a7a46}.vtab td.vx{color:#8a1c1c;font-style:italic}
.mclinks a{display:inline-block;margin:3px 6px 3px 0;padding:2px 9px;border:1px solid #1d2b44;color:#1d2b44;text-decoration:none;font-size:15px}.mclinks a:hover{background:#1d2b44;color:#fff}`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

window.PRACTICE={block,bind,verbsTable,units:Object.keys(U).filter(k=>k!=="verbs"),_U:U};
})();
