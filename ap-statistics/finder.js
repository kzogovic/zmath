/* AP Statistics Method Finder: which test, which formula, which design. Flowcharts, a conditions table, and practice (MCQ, Deck, Type, New). */
(function(){

const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1)), pick=a=>a[Math.floor(Math.random()*a.length)], nz=(a,b)=>{let v=0;while(!v)v=R(a,b);return v;};
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a||1;};
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const C=(n,k)=>{ let r=1; for(let i=1;i<=k;i++) r=r*(n-k+i)/i; return Math.round(r); };
const fact=n=>n<=1?1:n*fact(n-1);
const N=x=>{ if(typeof x!=="number") return x; if(Math.abs(x-Math.round(x))<1e-9){ x=Math.round(x); return (x<0?"−":"")+Math.abs(x).toLocaleString("en-US"); } return (x<0?"−":"")+String(+Math.abs(x).toFixed(3)); };
const F=(n,d)=>{ if(d<0){n=-n;d=-d;} const g=gcd(n,d); n/=g; d/=g; return d===1?N(n):(n<0?"−":"")+Math.abs(n)+"/"+d; };
const sq="<sup>2</sup>", cu="<sup>3</sup>";
const X=(k,v="x")=>k===1?v:k===-1?"−"+v:N(k)+v;
const sg=n=>n<0?" − "+N(-n):" + "+N(n);
const poly=c=>{ const n=c.length-1; let s=""; c.forEach((a,i)=>{ if(!a) return; const p=n-i, m=Math.abs(a); const co=(m===1&&p>0)?"":String(m); const v=p===0?"":p===1?"x":"x<sup>"+p+"</sup>"; s+=s?(a<0?" − ":" + "):(a<0?"−":""); s+=co+v; }); return s||"0"; };
const P=(t,q,v,w,s,o={})=>({t,q,v,a:o.a!=null?o.a:N(v),w:w.map(x=>typeof x==="number"?N(x):x),s,tol:o.tol,mc:o.mc});
const PF=(t,q,n,d,w,s,o={})=>P(t,q,n/d,w,s,{...o,a:F(n,d)});   // fraction answer
const PS=(t,q,a,w,s)=>P(t,q,undefined,w,s,{a,mc:true});        // answer is text: MCQ and Deck only
const money=x=>"$"+(Math.round(x*100)/100).toFixed(Number.isInteger(x)?0:2);


/* ===================== AP Statistics: Method Finder content ===================== */
const NAVY="#1d2b44",TEAL="#0f7c7a",MAG="#a8326e",PURP="#6b3fa0",ORG="#b8650f",GRN="#2a7a46",BLU="#1f5fa8",RED="#b03a2e",BRN="#7a5a12";
const T=(...r)=>r, FR=(n,d)=>`<span class="frc"><span>${n}</span><span>${d}</span></span>`, rt=s=>`√(${s})`;
const mat=rows=>`<span class="mx" style="--n:${(rows[0]||[]).length}">${rows.flat().map(v=>`<i>${v}</i>`).join("")}</span>`;
const cond=(...c)=>`<span class="ap-cond">${c.map(x=>`<span>${x}</span>`).join("")}</span>`;
const calc=s=>`<span class="ap-calc">${s}</span>`;

/* ---- inference: which test / interval ---- */
const IM={
 est:{grp:"Step 1",c:NAVY,name:"Interval or Test?",hint:"estimate vs. evidence",when:"First read the question's verb.",
  rule:"<b>Estimate</b>, “how large”, “construct an interval” → <b>confidence interval</b>. “Is there <b>convincing evidence</b>…”, “test the claim”, “is it different / greater / less” → <b>significance test</b>.",
  why:"An interval gives plausible values of the parameter; a test weighs evidence against one specific value (H₀).",
  ex:[T("“Estimate the proportion of students who vape.”",["Estimate → <b>interval</b>"]),T("“Is there convincing evidence that the mean wait is longer than 5 minutes?”",["Evidence about a claimed value → <b>test</b>, Hₐ: μ &gt; 5"])]},
 p1:{grp:"Categorical · one sample",c:TEAL,name:"1-Proportion z",hint:"one p",when:"One sample, success/failure data, one population proportion p.",
  rule:"Interval: p̂ ± z*"+rt("p̂(1 − p̂)/n")+". Test: z = "+FR("p̂ − p₀",rt("p₀(1 − p₀)/n"))+"."+cond("Random","10%: n ≤ 0.1N","Large counts: np̂ ≥ 10 and n(1 − p̂) ≥ 10 (test: use p₀)"),
  why:"One group, yes/no answers: the parameter is a single proportion.",tip:"Calculator: "+calc("1-PropZInt")+" or "+calc("1-PropZTest")+". The test uses p₀ in the standard error, the interval uses p̂.",
  ex:[T("SRS of 400 voters, 228 support a measure. Estimate p with 95% confidence.",["p̂ = 0.57, SE = "+rt("0.57 · 0.43/400")+" ≈ 0.0248","0.57 ± 1.96(0.0248) → <b>(0.521, 0.619)</b>"]),T("A company claims 90% on-time delivery. 128 of 150 were on time. Evidence of a lower rate?",["H₀: p = 0.9, Hₐ: p &lt; 0.9. p̂ ≈ 0.853","z = "+FR("0.853 − 0.9",rt("0.9 · 0.1/150"))+" ≈ −1.91, p-value ≈ 0.028 → reject H₀ at α = 0.05"])]},
 p2:{grp:"Categorical · two groups",c:TEAL,name:"2-Proportion z",hint:"p₁ − p₂",when:"Two independent samples or two treatment groups, success/failure data.",
  rule:"Interval: (p̂₁ − p̂₂) ± z*"+rt("p̂₁(1 − p̂₁)/n₁ + p̂₂(1 − p̂₂)/n₂")+". Test (H₀: p₁ = p₂): pool p̂<sub>c</sub> = "+FR("x₁ + x₂","n₁ + n₂")+", z = "+FR("p̂₁ − p̂₂",rt("p̂<sub>c</sub>(1 − p̂<sub>c</sub>)(1/n₁ + 1/n₂)"))+"."+cond("Random (both samples / random assignment)","10% for each sample","Large counts in each group"),
  why:"Two groups and a yes/no outcome: compare two proportions.",tip:"Calculator: "+calc("2-PropZInt")+" / "+calc("2-PropZTest")+". Only the test pools.",
  ex:[T("Is the proportion of seniors who drive to school higher than for juniors? (random samples of each)",["Two groups, yes/no → <b>2-proportion z-test</b>, Hₐ: p<sub>S</sub> − p<sub>J</sub> &gt; 0"]),T("Patients randomly assigned to drug or placebo. Estimate the difference in recovery rates.",["Two treatments, recovered yes/no → <b>2-proportion z-interval</b>"])]},
 gof:{grp:"Categorical · one variable, many categories",c:TEAL,name:"χ² Goodness of Fit",hint:"one sample vs. a claimed distribution",when:"One categorical variable with 3+ categories, compared with a claimed distribution.",
  rule:"χ² = Σ "+FR("(O − E)²","E")+", E = n · (claimed proportion), df = k − 1."+cond("Random","10%","All expected counts ≥ 5"),
  why:"More than two categories, so a single proportion is not enough: compare the whole distribution.",tip:"Calculator: "+calc("χ²GOF-Test")+" (lists of observed and expected).",
  ex:[T("Is a die fair? It's rolled 120 times.",["E = 20 for each face, df = 6 − 1 = 5 → <b>χ² GOF</b>"]),T("A candy company claims 24% blue, 20% orange, … A random bag is sorted by color.",["One sample, one variable (color), claimed distribution → <b>χ² GOF</b>"])]},
 hom:{grp:"Categorical · several groups",c:TEAL,name:"χ² Homogeneity",hint:"same distribution in each group?",when:"<b>Separate</b> samples (or treatment groups), one categorical variable.",
  rule:"E = "+FR("row total · column total","grand total")+", df = (r − 1)(c − 1). H₀: the distribution of the variable is the same in every population."+cond("Random samples / random assignment","10%","All expected counts ≥ 5"),
  why:"Several groups were sampled separately, and you compare their distributions.",tip:"Calculator: "+calc("χ²-Test")+" with the observed counts in matrix [A].",
  ex:[T("Separate random samples of 9th, 10th and 11th graders are asked their favorite lunch.",["Three samples, one variable → <b>χ² homogeneity</b>"]),T("Subjects randomly assigned to 3 diets; weight change classified as lost / same / gained.",["Treatment groups, one categorical outcome → <b>homogeneity</b>"])]},
 ind:{grp:"Categorical · one sample, two variables",c:TEAL,name:"χ² Independence",hint:"is there an association?",when:"<b>One</b> sample, two categorical variables recorded on each individual.",
  rule:"Same statistic and df as homogeneity: E = (row · column)/total, df = (r − 1)(c − 1). H₀: there is no association between the two variables."+cond("Random","10%","All expected counts ≥ 5"),
  why:"Homogeneity vs. independence is about the design: several samples → homogeneity; one sample classified two ways → independence.",tip:"Same calculator command: "+calc("χ²-Test")+".",
  ex:[T("A random sample of 500 adults is classified by political party and opinion on a policy.",["One sample, two variables → <b>χ² independence</b>"]),T("A random sample of students: grade level and whether they have a job.",["One sample, two variables → <b>independence</b>"])]},
 m1:{grp:"Quantitative · one sample",c:MAG,name:"1-Sample t",hint:"one μ",when:"One sample of quantitative data, one population mean μ, σ unknown.",
  rule:"Interval: x̄ ± t*"+FR("s","√n")+". Test: t = "+FR("x̄ − μ₀","s/√n")+", df = n − 1."+cond("Random","10%","Normal/large sample: n ≥ 30, or the data show no strong skew or outliers"),
  why:"Quantitative data from one group: the parameter is a mean. We use t because σ is estimated by s.",tip:"Calculator: "+calc("TInterval")+" / "+calc("T-Test")+". Use z only if σ is known (rare).",
  ex:[T("Battery life: n = 25, x̄ = 19.2 h, s = 1.6 h. Is the mean less than 20 h?",["t = "+FR("19.2 − 20","1.6/√25")+" = −2.5, df = 24","p-value ≈ 0.0098 → convincing evidence μ &lt; 20"]),T("Estimate the mean commute time of a district's teachers from an SRS of 40.",["One mean, estimate → <b>1-sample t-interval</b>"])]},
 mp:{grp:"Quantitative · paired",c:MAG,name:"Paired t",hint:"analyze the differences",when:"Two measurements on the <b>same</b> individuals (before/after, both treatments) or matched pairs.",
  rule:"Compute d = difference for each pair. Then do a 1-sample t on the differences: t = "+FR("d̄ − 0","s<sub>d</sub>/√n")+", df = n<sub>pairs</sub> − 1."+cond("Random","10%","Normal/large: n<sub>pairs</sub> ≥ 30 or no strong skew in the differences"),
  why:"The pairs are not independent. The differences remove the person-to-person variation, so the test is more powerful.",tip:"Calculator: put the differences in a list, then "+calc("T-Test")+" / "+calc("TInterval")+". Never use 2-SampTTest on paired data.",
  ex:[T("15 students take a test before and after tutoring. Did scores improve?",["Same students twice → <b>paired t-test</b> on after − before, Hₐ: μ<sub>d</sub> &gt; 0"]),T("Each of 12 drivers tests two tire brands in random order. Estimate the mean difference in stopping distance.",["Each driver gets both → <b>paired t-interval</b>"])]},
 m2:{grp:"Quantitative · two groups",c:MAG,name:"2-Sample t",hint:"μ₁ − μ₂",when:"Two <b>independent</b> samples or two randomly assigned groups, quantitative data.",
  rule:"Interval: (x̄₁ − x̄₂) ± t*"+rt("s₁²/n₁ + s₂²/n₂")+". Test: t = "+FR("x̄₁ − x̄₂",rt("s₁²/n₁ + s₂²/n₂"))+". df from the calculator (or the smaller n − 1)."+cond("Random (both)","10% (each sample)","Normal/large for each group"),
  why:"Two separate groups with means: compare μ₁ and μ₂. Do not pool.",tip:"Calculator: "+calc("2-SampTInt")+" / "+calc("2-SampTTest")+", Pooled: No.",
  ex:[T("Volunteers randomly assigned to caffeine or placebo; reaction time recorded. Is the mean different?",["Two independent groups, quantitative → <b>2-sample t-test</b>"]),T("Estimate the difference in mean height between random samples of boys and girls at a school.",["Two independent samples → <b>2-sample t-interval</b>"])]},
 sl:{grp:"Quantitative · two variables",c:MAG,name:"t for the Slope",hint:"linear relationship?",when:"Two quantitative variables on each individual; a question about the population slope β.",
  rule:"Test: t = "+FR("b − 0","SE<sub>b</sub>")+", df = n − 2. Interval: b ± t* · SE<sub>b</sub>. Read b and SE<sub>b</sub> from computer output."+cond("Linear","Independent (10%)","Normal residuals","Equal SD (residual plot)","Random"),
  why:"The question is about the relationship (slope), not one mean or one proportion.",tip:"Calculator: "+calc("LinRegTTest")+" / "+calc("LinRegTInt")+". Conditions spell LINER.",
  ex:[T("Hours studied vs. score, n = 20, b = 2.4, SE<sub>b</sub> = 0.8. Is there a linear relationship?",["t = 2.4/0.8 = 3, df = 18","Two-sided p-value ≈ 0.0077 → convincing evidence β ≠ 0"]),T("Estimate how much tree height increases per year of age, from an SRS of 30 trees.",["Slope, estimate → <b>t-interval for the slope</b>"])]},
 chk:{grp:"Last step",c:GRN,name:"Conditions & Conclusion",hint:"State · Plan · Do · Conclude",when:"Every inference question.",
  rule:"<b>State</b> the parameter and hypotheses (or the confidence level). <b>Plan</b>: name the procedure, check the conditions. <b>Do</b>: compute. <b>Conclude</b> in context, linked to the p-value or the interval.",
  why:"Most lost points on the AP exam come from missing conditions or a conclusion without context.",
  ex:[T("Test conclusion",["“Because the p-value 0.028 &lt; α = 0.05, we reject H₀. There is convincing evidence that the true proportion of on-time deliveries is less than 0.90.”"]),T("Interval conclusion",["“We are 95% confident that the interval from 0.521 to 0.619 captures the true proportion of voters who support the measure.”"])],
  tip:"Never “accept H₀”: say “fail to reject H₀; there is not convincing evidence that …”."}
};
const INF={M:IM,label:"Which inference procedure flowchart",lead:"Which test or interval? Start at the top: decide interval or test, then the kind of data, then the design. Tap any procedure for when to use it, why, the conditions, the formula, the calculator command and two examples.",start:"Inference question",top:["est"],q:"What kind of data is it?",
  cols:[{g:"Categorical",s:"counts, %, yes/no",c:TEAL,cols:[["One sample, 2 outcomes","",TEAL,["p1"]],["Two groups, 2 outcomes","",TEAL,["p2"]],["One variable, 3+ categories","",TEAL,["gof"]],["Two-way table","",TEAL,["hom","ind"]]]},
        {g:"Quantitative",s:"measurements, means",c:MAG,cols:[["One sample","",MAG,["m1"]],["Paired data","same subjects",MAG,["mp"]],["Two independent groups","",MAG,["m2"]],["Two variables","x and y",MAG,["sl"]]]}],end:"chk"};

/* ---- formulas: units 1, 2, 4, 5 ---- */
const FM={
 ctx:{grp:"Step 1",c:NAVY,name:"What Is Being Asked?",hint:"name the quantity",when:"Before choosing a formula.",rule:"Underline the quantity: a percentile? a probability? a predicted value? a mean or SD of a random variable? a sampling distribution? The noun tells you the branch.",
  ex:[T("“What proportion of scores are above 85?”",["A Normal probability → z-score and normalcdf"]),T("“What is the probability of exactly 3 heads in 10 tosses?”",["Fixed n, count successes → binomial"])]},
 z:{grp:"One variable",c:BLU,name:"z-Scores & Normal Calculations",hint:"z = (x − μ)/σ",when:"A value's position, or a probability/percentile in a Normal distribution.",rule:"z = "+FR("x − μ","σ")+". P(X &lt; x) = "+calc("normalcdf(−1E99, x, μ, σ)")+". A percentile → "+calc("invNorm(area, μ, σ)")+".",
  ex:[T("Scores N(75, 8). P(score &gt; 85)?",["z = (85 − 75)/8 = 1.25","P(Z &gt; 1.25) ≈ <b>0.106</b>"]),T("Scores N(75, 8). 90th percentile?",["invNorm(0.90, 75, 8) ≈ <b>85.3</b>"])]},
 tr:{grp:"One variable",c:BLU,name:"Transforming Data",hint:"add vs. multiply",when:"Every value is changed by + a or × b.",rule:"Adding a: center and position shift by a, spread unchanged. Multiplying by b: center <b>and</b> spread multiply by |b|.",
  ex:[T("Temperatures: mean 20°C, SD 5°C. In °F (F = 1.8C + 32)?",["Mean 1.8(20) + 32 = <b>68°F</b>","SD 1.8(5) = <b>9°F</b> (the +32 doesn't change spread)"]),T("Add 5 bonus points to every score",["Mean +5, SD unchanged"])]},
 lsrl:{grp:"Two variables",c:GRN,name:"Correlation & LSRL",hint:"b = r · s_y/s_x",when:"Predicting y from x with a least-squares line.",rule:"ŷ = a + bx with b = r"+FR("s<sub>y</sub>","s<sub>x</sub>")+" and a = ȳ − b x̄. r² = fraction of the variation in y explained by the line.",
  ex:[T("r = 0.8, s<sub>x</sub> = 2, s<sub>y</sub> = 5, x̄ = 10, ȳ = 50",["b = 0.8 · 5/2 = 2","a = 50 − 2 · 10 = 30, so <b>ŷ = 30 + 2x</b>"]),T("r = 0.9",["r² = 0.81: 81% of the variation in y is explained by the linear model with x"])]},
 res:{grp:"Two variables",c:GRN,name:"Residuals",hint:"actual − predicted",when:"How far a point is from the line, or checking a model.",rule:"Residual = y − ŷ. Positive: the point is above the line (underpredicted). A residual plot with no pattern → a linear model is appropriate.",
  ex:[T("ŷ = 30 + 2x, point (12, 51)",["ŷ = 54, residual = 51 − 54 = <b>−3</b> (overpredicted)"]),T("Residual plot is curved",["A linear model is <b>not</b> appropriate"])]},
 prob:{grp:"Probability",c:RED,name:"Probability Rules",hint:"or · and · given",when:"Events from a table, a tree or a description.",rule:"P(A or B) = P(A) + P(B) − P(A and B). P(A and B) = P(A) · P(B | A). P(A | B) = "+FR("P(A and B)","P(B)")+". Independent ⇔ P(A | B) = P(A).",
  ex:[T("P(A) = 0.5, P(B) = 0.4, P(A and B) = 0.2. P(A or B)?",["0.5 + 0.4 − 0.2 = <b>0.7</b>"]),T("Same events. Independent?",["P(A)P(B) = 0.2 = P(A and B) → <b>yes</b>"])]},
 rv:{grp:"Random variables",c:RED,name:"Mean & SD of a Random Variable",hint:"μ = Σx·p",when:"A probability distribution table.",rule:"μ<sub>X</sub> = Σ x·P(x). σ<sub>X</sub> = "+rt("Σ (x − μ)²·P(x)")+".",
  ex:[T("X = 0, 1, 2 with P = 0.2, 0.5, 0.3",["μ = 0 + 0.5 + 0.6 = <b>1.1</b>"]),T("Same X",["σ² = 1.21(0.2) + 0.01(0.5) + 0.81(0.3) = 0.49, so <b>σ = 0.7</b>"])]},
 comb:{grp:"Random variables",c:RED,name:"Combining Random Variables",hint:"variances add",when:"Sums, differences or transformations of random variables.",rule:"μ<sub>X±Y</sub> = μ<sub>X</sub> ± μ<sub>Y</sub>. If X and Y are independent: σ²<sub>X±Y</sub> = σ²<sub>X</sub> + σ²<sub>Y</sub> (add even for a difference!). For a + bX: mean a + bμ, SD |b|σ.",
  ex:[T("σ<sub>X</sub> = 3, σ<sub>Y</sub> = 4, independent. SD of X − Y?",["√(9 + 16) = <b>5</b>, not 1"]),T("Y = 2X + 10 with μ = 5, σ = 3",["Mean 20, SD 6"])]},
 bin:{grp:"Random variables",c:PURP,name:"Binomial",hint:"BINS: fixed n",when:"<b>B</b>inary outcomes, <b>I</b>ndependent trials, fixed <b>N</b>umber of trials, same <b>S</b>uccess probability. Count the successes.",rule:"P(X = k) = C(n, k)p<sup>k</sup>(1 − p)<sup>n − k</sup>. μ = np, σ = "+rt("np(1 − p)")+". "+calc("binompdf(n, p, k)")+", "+calc("binomcdf(n, p, k)")+" for ≤ k.",
  ex:[T("10 free throws, p = 0.7. P(exactly 8)?",["C(10, 8)(0.7)<sup>8</sup>(0.3)² ≈ <b>0.233</b>"]),T("n = 50, p = 0.2",["μ = 10, σ = √8 ≈ 2.83"])]},
 geo:{grp:"Random variables",c:PURP,name:"Geometric",hint:"trials until first success",when:"Repeat until the <b>first</b> success (no fixed n).",rule:"P(X = k) = (1 − p)<sup>k − 1</sup>p. μ = 1/p. "+calc("geometpdf(p, k)")+".",
  ex:[T("p = 0.2. P(first success on trial 3)?",["(0.8)²(0.2) = <b>0.128</b>"]),T("p = 0.25. Expected number of trials?",["1/0.25 = <b>4</b>"])]},
 phat:{grp:"Sampling distributions",c:ORG,name:"Sampling Distribution of p̂",hint:"σ = √(p(1 − p)/n)",when:"The probability that a sample proportion is above/below a value.",rule:"μ<sub>p̂</sub> = p, σ<sub>p̂</sub> = "+rt("p(1 − p)/n")+" (10% condition). Approximately Normal if np ≥ 10 and n(1 − p) ≥ 10.",
  ex:[T("p = 0.4, n = 150. σ<sub>p̂</sub>?",["√(0.4 · 0.6/150) = <b>0.04</b>"]),T("Same. P(p̂ &gt; 0.46)?",["z = 0.06/0.04 = 1.5 → ≈ <b>0.067</b>"])]},
 xbar:{grp:"Sampling distributions",c:ORG,name:"Sampling Distribution of x̄",hint:"σ/√n, CLT",when:"The probability that a sample mean is above/below a value.",rule:"μ<sub>x̄</sub> = μ, σ<sub>x̄</sub> = σ/√n. Normal if the population is Normal, or n ≥ 30 (Central Limit Theorem).",
  ex:[T("μ = 100, σ = 15, n = 36",["σ<sub>x̄</sub> = 15/6 = <b>2.5</b>"]),T("Same. P(x̄ &lt; 96)?",["z = −4/2.5 = −1.6 → ≈ <b>0.055</b>"])]},
 inter:{grp:"Last step",c:GRN,name:"Interpret in Context",hint:"units, which group",when:"Every answer.",rule:"Say what the number means for the variable, with units. Use “predicted”, “on average”, “approximately”.",
  ex:[T("Slope 2",["“For each additional hour studied, the <b>predicted</b> score increases by 2 points.”"]),T("z = 1.25",["“The score is 1.25 standard deviations above the mean.”"])]}
};
const FOR={M:FM,label:"Which formula flowchart",lead:"Which formula do I use? Decide what you're working with, then follow the branch. Tap any node for when to use it, the formula, the calculator command and examples.",start:"Describe or model data",top:["ctx"],q:"What are you working with?",
  cols:[["One variable","Unit 1",BLU,["z","tr"]],["Two variables","Unit 2",GRN,["lsrl","res"]],["Probability","Unit 4",RED,["prob"]],["Random variables","Unit 4",PURP,["rv","comb","bin","geo"]],["Sampling distributions","Unit 5",ORG,["phat","xbar"]]],end:"inter"};

/* ---- collecting data: unit 3 ---- */
const DM={
 bias:{grp:"Always",c:NAVY,name:"Watch for Bias",hint:"who's missing, who answers?",when:"Any sample or survey.",rule:"<b>Undercoverage</b>: part of the population can't be chosen. <b>Nonresponse</b>: chosen people don't answer. <b>Response bias</b>: wording or lying. <b>Voluntary response</b> and <b>convenience</b> samples are biased.",
  ex:[T("An online poll on a news site",["Voluntary response: people with strong opinions answer → <b>biased</b>"]),T("Phone survey using landlines only",["<b>Undercoverage</b> of people without landlines"])]},
 srs:{grp:"Sampling",c:TEAL,name:"Simple Random Sample",hint:"every group of n equally likely",when:"You have a list of the whole population.",rule:"Number everyone, then use a random number generator (no repeats) to pick n.",
  ex:[T("Choose 50 of 1,200 students",["Number 1 to 1200, randomly generate 50 different numbers"]),T("Why not 'first 50 in line'?",["Convenience: not random, likely biased"])]},
 str:{grp:"Sampling",c:TEAL,name:"Stratified",hint:"SRS within similar groups",when:"The population splits into groups that are similar inside (strata), and you want every group represented.",rule:"Divide into strata (e.g. grade level), take an SRS from <b>each</b> stratum. Gives more precise estimates when strata differ.",
  ex:[T("Survey 25 students from each grade",["Strata = grades → <b>stratified</b>"]),T("Why stratify by grade?",["Opinions differ by grade, so the estimate is more precise"])]},
 clu:{grp:"Sampling",c:TEAL,name:"Cluster",hint:"pick whole groups",when:"Groups are like mini-populations (mixed inside) and it's easier to sample whole groups.",rule:"Divide into clusters (e.g. homerooms), randomly select some clusters, survey <b>everyone</b> in them. Cheaper, less precise.",
  ex:[T("Randomly select 5 homerooms and survey every student in them",["<b>Cluster</b> sample"]),T("Stratified or cluster?",["SRS from every group → stratified. All of some groups → cluster."])]},
 sys:{grp:"Sampling",c:TEAL,name:"Systematic",hint:"every kth individual",when:"Individuals come in an order (a line, a list).",rule:"Randomly choose a starting point from 1 to k, then take every kth individual.",
  ex:[T("Random start from 1–20, then every 20th shopper",["<b>Systematic</b> random sample"]),T("Risk",["Bias if the list has a repeating pattern"])]},
 crd:{grp:"Experiment",c:MAG,name:"Completely Randomized",hint:"randomly assign everyone",when:"Treatments imposed on subjects; no reason to block.",rule:"Randomly assign all subjects to treatments. Control other variables, replicate (enough subjects), compare.",
  ex:[T("40 volunteers randomly split into new drug / placebo",["<b>Completely randomized</b>"]),T("How to randomize",["Number 1–40, randomly pick 20 for the drug; the rest get the placebo"])]},
 blk:{grp:"Experiment",c:MAG,name:"Randomized Block",hint:"randomize within blocks",when:"A variable (e.g. sex, age) likely affects the response.",rule:"Form blocks of similar subjects, then randomly assign treatments within each block. Reduces variation from the blocking variable.",
  ex:[T("Separate men and women, then randomly assign the diets within each group",["<b>Randomized block</b> (block = sex)"]),T("Why block?",["Men and women may respond differently: blocking removes that variation"])]},
 mpd:{grp:"Experiment",c:MAG,name:"Matched Pairs",hint:"pairs or both treatments",when:"Subjects can be paired, or each subject can get both treatments.",rule:"Randomly assign the treatments within each pair (or the order for each subject). Analyze with a paired t.",
  ex:[T("Each runner tries both shoe types in random order",["<b>Matched pairs</b>"]),T("Twins: one gets each treatment (coin flip)",["<b>Matched pairs</b>"])]},
 obs:{grp:"Observational",c:ORG,name:"Observational Study",hint:"no treatment imposed",when:"You only observe and record; no treatments assigned.",rule:"Can show <b>association</b>, not causation: confounding variables may explain the relationship.",
  ex:[T("Records show students who eat breakfast have higher GPAs",["Observational → association only (confounding: family routine)"]),T("Can you conclude breakfast causes higher GPAs?",["<b>No</b>: no random assignment"])]},
 scope:{grp:"Last step",c:GRN,name:"Scope of Inference",hint:"generalize? cause?",when:"Every study conclusion.",rule:"<b>Random sampling</b> → generalize to the population sampled. <b>Random assignment</b> → cause and effect. Both → both. Neither → association in this group only.",
  ex:[T("Random sample, no random assignment",["Generalize, but no causation"]),T("Volunteers randomly assigned",["Causation for people like the volunteers, no generalizing"])]}
};
const DES={M:DM,label:"Collecting data flowchart",lead:"Which sampling method or experimental design? Start with the goal of the study. Tap any node for when to use it, how, and examples.",start:"Collecting data",top:["bias"],q:"What is the goal?",
  cols:[["Describe a population","Sampling",TEAL,["srs","str","clu","sys"]],["Show cause and effect","Experiment",MAG,["crd","blk","mpd"]],["Observe only","no treatment",ORG,["obs"]]],end:"scope"};

/* ---- conditions & formulas table ---- */
const TBL=`<div class="ap-tw"><table class="ap-tbl"><thead><tr><th>Procedure</th><th>Use when</th><th>Statistic / interval</th><th>Conditions</th><th>df</th><th>TI-84</th></tr></thead><tbody>
${[["1-prop z","one sample, yes/no","z = (p̂ − p₀)/√(p₀(1 − p₀)/n); p̂ ± z*√(p̂(1 − p̂)/n)","Random, 10%, large counts ≥ 10","—","1-PropZTest / Int"],
["2-prop z","two groups, yes/no","pooled p̂<sub>c</sub> for the test; unpooled SE for the interval","Random, 10%, large counts in each group","—","2-PropZTest / Int"],
["1-sample t","one mean","t = (x̄ − μ₀)/(s/√n); x̄ ± t*·s/√n","Random, 10%, n ≥ 30 or no strong skew","n − 1","T-Test / TInterval"],
["paired t","same subjects twice, matched pairs","1-sample t on the differences","Random, 10%, n ≥ 30 or no skew in differences","n − 1","T-Test on list of d"],
["2-sample t","two independent groups","t = (x̄₁ − x̄₂)/√(s₁²/n₁ + s₂²/n₂)","Random, 10%, Normal/large for each","calculator","2-SampTTest / Int"],
["χ² GOF","one variable, claimed distribution","Σ(O − E)²/E","Random, 10%, all E ≥ 5","k − 1","χ²GOF-Test"],
["χ² homogeneity","several samples, one variable","Σ(O − E)²/E, E = row·col/total","Random, 10%, all E ≥ 5","(r − 1)(c − 1)","χ²-Test"],
["χ² independence","one sample, two variables","same as homogeneity","Random, 10%, all E ≥ 5","(r − 1)(c − 1)","χ²-Test"],
["t for slope","two quantitative variables","t = b/SE<sub>b</sub>; b ± t*·SE<sub>b</sub>","LINER","n − 2","LinRegTTest / TInt"]].map(r=>`<tr>${r.map((c,i)=>`<td data-l="${["Procedure","Use when","Statistic / interval","Conditions","df","TI-84"][i]}"${i===0?' class="ap-p"':""}><span>${c}</span></td>`).join("")}</tr>`).join("")}
</tbody></table></div>`;

/* ---- generators ---- */
const PR={P1I:"1-proportion z-interval",P1T:"1-proportion z-test",P2I:"2-proportion z-interval",P2T:"2-proportion z-test",GOF:"χ² goodness-of-fit test",HOM:"χ² test for homogeneity",IND:"χ² test for independence",M1I:"1-sample t-interval",M1T:"1-sample t-test",MPT:"paired t-test",MPI:"paired t-interval",M2I:"2-sample t-interval",M2T:"2-sample t-test",SLT:"t-test for the slope",SLI:"t-interval for the slope"};
const CX={pop:["students at a large high school","adults in a city","customers of an online store","registered voters in a county","nurses at a hospital"],act:["support a later start time","own a pet","exercise at least 3 times a week","prefer streaming to cable","have read a book this month"],
  meas:[["sleep per night","hours"],["commute time","minutes"],["battery life","hours"],["resting heart rate","bpm"],["test score","points"]],
  pair:[["boys","girls"],["freshmen","seniors"],["city residents","rural residents"],["morning shoppers","evening shoppers"]],
  trt:[["a new medication","a placebo"],["a mindfulness app","no app"],["fertilizer A","fertilizer B"],["online lessons","in-person lessons"]],
  xy:[["hours studied","exam score"],["age of a car","its price"],["temperature","ice cream sales"],["arm span","height"]]};
const W=(id,opts,q)=>({id,opts,q});
const SC=[
 ()=>{ const p=pick(CX.pop),a=pick(CX.act),n=R(10,40)*20; return W("P1I",["P1T","P2I","M1I"],`A random sample of ${n} ${p} is asked whether they ${a}. Construct a 95% confidence interval for the proportion of all ${p} who ${a}.`); },
 ()=>{ const p=pick(CX.pop),a=pick(CX.act),k=R(3,8)*10; return W("P1T",["P1I","GOF","M1T"],`A report claims that ${k}% of ${p} ${a}. In a random sample of ${R(8,30)*10}, ${R(30,90)}% do. Is there convincing evidence that the true proportion is different from ${k}%?`); },
 ()=>{ const [g1,g2]=pick(CX.pair),a=pick(CX.act); return W("P2I",["P2T","P1I","M2I"],`Independent random samples of ${g1} and ${g2} are asked whether they ${a}. Estimate the difference in the proportions of ${g1} and ${g2} who ${a}.`); },
 ()=>{ const [t1,t2]=pick(CX.trt); return W("P2T",["P2I","HOM","M2T"],`Volunteers are randomly assigned to ${t1} or ${t2}. After 8 weeks each is recorded as improved or not improved. Is there convincing evidence that the proportion who improve is higher with ${t1}?`); },
 ()=>{ const S=pick([["A candy company claims its bags are 30% red, 20% green, 20% yellow and 30% brown.","the colors in a random sample of 200 candies"],["A school claims its lunch choices are equally popular (pizza, salad, wraps, soup).","the choices of a random sample of 160 students"],["A die is suspected of being unfair.","the results of 120 rolls"]]); return W("GOF",["IND","HOM","P1T"],`${S[0]} Researchers record ${S[1]}. Do the data give convincing evidence that the distribution differs from the claim?`); },
 ()=>{ const S=pick([["freshmen, sophomores and juniors","favorite lunch (pizza, salad, wrap)"],["three different towns","preferred news source (TV, online, print)"],["subjects randomly assigned to three diets","weight change (lost, same, gained)"]]); return W("HOM",["IND","GOF","P2T"],`Separate random samples are taken from ${S[0]}, and each person's ${S[1]} is recorded. Is the distribution the same in all three groups?`); },
 ()=>{ const S=pick([["political party","opinion on a new law"],["grade level","whether they have a job"],["eye color","handedness"],["age group","preferred social media app"]]); return W("IND",["HOM","GOF","SLT"],`A single random sample of 500 people is classified by ${S[0]} and by ${S[1]}. Is there convincing evidence of an association between ${S[0]} and ${S[1]}?`); },
 ()=>{ const [m,u]=pick(CX.meas); return W("M1I",["M1T","P1I","MPI"],`A random sample of ${R(20,60)} people has a mean ${m} of ${R(5,40)} ${u} (s = ${R(2,9)} ${u}). Estimate the mean ${m} for the whole population.`); },
 ()=>{ const [m,u]=pick(CX.meas),mu=R(6,40); return W("M1T",["M1I","P1T","M2T"],`A manufacturer claims the mean ${m} is ${mu} ${u}. A random sample of ${R(15,50)} gives x̄ = ${mu-R(1,3)} ${u}. Is there convincing evidence the true mean is less than ${mu} ${u}?`); },
 ()=>{ const S=pick([["students","a practice SAT before and after a prep course","score"],["patients","blood pressure before and after a 6-week program","blood pressure"],["workers","productivity in the week before and after a schedule change","output"]]); return W("MPT",["M2T","M1T","P2T"],`${R(12,30)} ${S[0]} are measured on ${S[1]}. Is there convincing evidence that the mean ${S[2]} changed?`); },
 ()=>{ const S=pick([["drivers","two tire brands, in random order","stopping distance"],["athletes","two sports drinks on different days, in random order","sprint time"],["pairs of twins (one twin per method, chosen by coin flip)","two reading methods","reading score"]]); return W("MPI",["M2I","MPT","M1I"],`Each of ${R(10,25)} ${S[0]} tries ${S[1]}. Estimate the mean difference in ${S[2]}.`); },
 ()=>{ const [g1,g2]=pick(CX.pair),[m]=pick(CX.meas); return W("M2I",["MPI","M2T","P2I"],`Independent random samples of ${g1} and ${g2} record their ${m}. Construct a 95% confidence interval for the difference in mean ${m}.`); },
 ()=>{ const [t1,t2]=pick(CX.trt),[m]=pick(CX.meas); return W("M2T",["MPT","P2T","M2I"],`${R(30,80)} volunteers are randomly assigned to ${t1} or ${t2}, and each person's ${m} is measured. Is there convincing evidence that the mean ${m} differs between the groups?`); },
 ()=>{ const [x,y]=pick(CX.xy); return W("SLT",["SLI","IND","M2T"],`For a random sample of ${R(15,40)} cases, ${x} and ${y} are recorded and a least-squares line is fit. Is there convincing evidence of a positive linear relationship between ${x} and ${y}?`); },
 ()=>{ const [x,y]=pick(CX.xy); return W("SLI",["SLT","M1I","P1I"],`Using computer output from a random sample of ${R(15,40)} cases, construct a 95% confidence interval for the slope of the population regression line relating ${y} to ${x}.`); }
];
const mkW=g=>()=>{ const s=g(); return PS("Which procedure?",s.q,PR[s.id],s.opts.map(o=>PR[o]),[`Key clues: ${HINT[s.id]}`,`<b>${PR[s.id]}</b>`]); };
const HINT={P1I:"one sample, yes/no answers, “estimate” → interval for one proportion",P1T:"one sample, yes/no, a claimed percent → test for one proportion",P2I:"two independent groups, yes/no, “estimate the difference”",P2T:"two groups (random assignment), yes/no outcome, “convincing evidence”",GOF:"one categorical variable with several categories vs. a claimed distribution",HOM:"separate samples/groups, one categorical variable: same distribution?",IND:"ONE sample classified by TWO categorical variables: association?",M1I:"one sample, quantitative, “estimate the mean”",M1T:"one sample, quantitative, claimed mean",MPT:"the same subjects measured twice → differences",MPI:"each subject gets both treatments → estimate the mean difference",M2I:"two independent samples, quantitative, estimate μ₁ − μ₂",M2T:"two randomly assigned groups, quantitative outcome",SLT:"two quantitative variables, “linear relationship” → slope",SLI:"interval for the slope from regression output"};
const DS=[["SRS",["Number all 1,200 students and use a random number generator to pick 60 different numbers.","Put every name in a hat, mix, and draw 40."]],["Stratified random sample",["Randomly select 20 students from each grade level.","Split employees by department and take an SRS from every department."]],["Cluster sample",["Randomly choose 6 homerooms and survey every student in them.","Randomly pick 10 city blocks and interview every household on them."]],["Systematic random sample",["Pick a random number from 1 to 15, then survey every 15th customer.","Start at a random name among the first 10 on the list, then take every 10th name."]],["Convenience sample",["Survey the first 50 students who enter the cafeteria.","Ask friends in your math class."]],["Voluntary response sample",["A website posts a poll and anyone may respond.","A TV show asks viewers to text in their vote."]],["Completely randomized design",["Randomly assign 30 plants to fertilizer A and 30 to fertilizer B.","Volunteers are randomly split into drug and placebo groups."]],["Randomized block design",["Separate subjects by age group, then randomly assign treatments within each age group.","Split fields by soil type, then randomly assign seed varieties within each soil type."]],["Matched pairs design",["Each subject tries both keyboards in a random order.","Twins are split by coin flip: one gets each treatment."]]];
const mkD=()=>{ const [a,ex]=pick(DS); const others=shuffle(DS.filter(d=>d[0]!==a).map(d=>d[0])).slice(0,3); return PS("Which design?",pick(ex)+" Which method is this?",a,others,[`<b>${a}</b>`]); };
const CONDS=[["1-proportion z-test","np₀ ≥ 10 and n(1 − p₀) ≥ 10",["np̂ ≥ 5","n ≥ 30","all expected counts ≥ 5"]],["1-proportion z-interval","np̂ ≥ 10 and n(1 − p̂) ≥ 10",["np₀ ≥ 10 and n(1 − p₀) ≥ 10","n ≥ 30","all expected counts ≥ 5"]],["1-sample t-test","n ≥ 30, or the sample data show no strong skew or outliers",["np ≥ 10 and n(1 − p) ≥ 10","all expected counts ≥ 5","residuals are Normal"]],["χ² test","all expected counts are at least 5",["all observed counts are at least 5","n ≥ 30","np ≥ 10"]],["t-test for the slope","LINER: linear, independent, Normal residuals, equal SD, random",["n ≥ 30","all expected counts ≥ 5","np ≥ 10"]],["2-sample t-test","each group: n ≥ 30 or no strong skew/outliers",["np ≥ 10 in each group","the two samples are paired","all expected counts ≥ 5"]]];
const mkC=()=>{ const [p,a,w]=pick(CONDS); return PS("Conditions",`Which is the Normal / large-sample condition for a ${p}?`,a,w,[`<b>${a}</b>`,"Also always check Random and the 10% condition (n ≤ 10% of the population) when sampling without replacement."]); };
const mkCon=()=>{ const pv=pick([0.003,0.012,0.032,0.048,0.067,0.11,0.24]),al=pick([0.05,0.01,0.10]); const rej=pv<al; return PS("Conclusions",`A test gives a p-value of ${pv} at α = ${al}. Which conclusion is correct?`,rej?"Reject H₀: there is convincing evidence for Hₐ":"Fail to reject H₀: there is not convincing evidence for Hₐ",[rej?"Fail to reject H₀: there is not convincing evidence for Hₐ":"Reject H₀: there is convincing evidence for Hₐ","Accept H₀: H₀ is true","The probability that H₀ is true is "+pv],[`p-value ${pv} ${rej?"&lt;":"≥"} α = ${al}`,rej?"<b>Reject H₀</b>":"<b>Fail to reject H₀</b> (never “accept”)"]); };
const r2=x=>+x.toFixed(2), r3=x=>+x.toFixed(3), r4=x=>+x.toFixed(4);
const CALC=[
 ()=>{ const mu=R(50,90),sd=R(4,12),x=mu+R(-25,25); const z=(x-mu)/sd; return P("z-scores",`X is Normal with μ = ${mu} and σ = ${sd}. What is the z-score of x = ${x}? (2 decimals)`,r2(z),[r2((mu-x)/sd),r2((x-mu)/(sd*sd)),r2(x/sd)],[`z = (${x} − ${mu}) / ${sd}`,`= <b>${r2(z)}</b>`],{tol:.01}); },
 ()=>{ const p=pick([0.2,0.3,0.4,0.5,0.6,0.25,0.75]),n=pick([50,100,150,200,400]); const se=Math.sqrt(p*(1-p)/n); return P("Standard errors",`What is σ<sub>p̂</sub> for p = ${p} and n = ${n}? (4 decimals)`,r4(se),[r4(p*(1-p)/n),r4(Math.sqrt(p/n)),r4(Math.sqrt(p*(1-p))/n)],[`√(p(1 − p)/n) = √(${p} · ${r2(1-p)}/${n})`,`= <b>${r4(se)}</b>`],{tol:.0005,a:String(r4(se))}); },
 ()=>{ const n=pick([100,150,200,250,300]),p0=pick([0.3,0.4,0.5,0.6]); const x=Math.round(n*(p0+R(-8,8)/100)); const ph=x/n,z=(ph-p0)/Math.sqrt(p0*(1-p0)/n); return P("Test statistics",`1-proportion z-test: H₀: p = ${p0}, n = ${n}, x = ${x} successes. What is z? (2 decimals)`,r2(z),[r2((ph-p0)/Math.sqrt(ph*(1-ph)/n)),r2(ph-p0),r2((ph-p0)/(p0*(1-p0)/n))],[`p̂ = ${x}/${n} = ${r4(ph)}`,`z = (${r4(ph)} − ${p0}) / √(${p0} · ${r2(1-p0)}/${n}) = <b>${r2(z)}</b>`,`The test uses p₀ in the SE.`],{tol:.01}); },
 ()=>{ const mu0=R(20,60),n=pick([16,25,36,49,64]),s=R(3,12),xb=mu0+R(-6,6)*0.5; const t=(xb-mu0)/(s/Math.sqrt(n)); return P("Test statistics",`1-sample t-test: H₀: μ = ${mu0}, n = ${n}, x̄ = ${xb}, s = ${s}. What is t? (2 decimals)`,r2(t),[r2((xb-mu0)/s),r2((xb-mu0)/(s/n)),r2((xb-mu0)*Math.sqrt(n))],[`s/√n = ${s}/${Math.sqrt(n)} = ${r3(s/Math.sqrt(n))}`,`t = (${xb} − ${mu0}) / ${r3(s/Math.sqrt(n))} = <b>${r2(t)}</b>, df = ${n-1}`],{tol:.01}); },
 ()=>{ const S=pick([()=>{const k=R(3,8);return [`a χ² goodness-of-fit test with ${k} categories`,k-1,[k,k-2,k+1]];},()=>{const r=R(2,4),c=R(2,5);return [`a χ² test on a ${r} × ${c} two-way table`,(r-1)*(c-1),[r*c,r+c-2,r*c-1]];},()=>{const n=R(12,40);return [`a t-test for the slope with n = ${n}`,n-2,[n-1,n,n-3]];},()=>{const n=R(10,40);return [`a paired t-test with ${n} pairs`,n-1,[2*n-2,n,2*n-1]];}])(); return P("Degrees of freedom",`What are the degrees of freedom for ${S[0]}?`,S[1],S[2],[`<b>df = ${S[1]}</b>`]); },
 ()=>{ const r=R(20,80),c=R(30,90),t=R(150,300); const e=r*c/t; return P("Expected counts",`In a two-way table, a row total is ${r}, a column total is ${c} and the grand total is ${t}. What is the expected count for that cell? (2 decimals)`,r2(e),[r2(r*t/c),r2((r+c)/2),r2(r*c/100)],[`E = row · column / total = ${r} · ${c} / ${t}`,`= <b>${r2(e)}</b>`],{tol:.01}); },
 ()=>{ const n=pick([100,200,400,500,1000]),x=Math.round(n*R(30,70)/100); const ph=x/n,me=1.96*Math.sqrt(ph*(1-ph)/n); return P("Margin of error",`95% interval for p: n = ${n}, ${x} successes. What is the margin of error? (3 decimals)`,r3(me),[r3(Math.sqrt(ph*(1-ph)/n)),r3(1.645*Math.sqrt(ph*(1-ph)/n)),r3(1.96*ph*(1-ph)/n)],[`p̂ = ${r3(ph)}, SE = ${r4(Math.sqrt(ph*(1-ph)/n))}`,`ME = 1.96 · SE = <b>${r3(me)}</b>`],{tol:.002}); },
 ()=>{ const n1=R(50,150),n2=R(50,150),x1=Math.round(n1*R(30,70)/100),x2=Math.round(n2*R(30,70)/100); const pc=(x1+x2)/(n1+n2); return P("Pooling",`2-proportion z-test: x₁ = ${x1}, n₁ = ${n1}, x₂ = ${x2}, n₂ = ${n2}. What is the pooled p̂<sub>c</sub>? (3 decimals)`,r3(pc),[r3((x1/n1+x2/n2)/2),r3(x1/n1-x2/n2),r3((x1+x2)/(n1*n2))],[`p̂<sub>c</sub> = (${x1} + ${x2}) / (${n1} + ${n2})`,`= <b>${r3(pc)}</b>`],{tol:.002}); }
];
const FORM=[
 ()=>{ const r=pick([0.5,0.6,0.7,0.8,0.9,-0.6,-0.8]),sx=R(2,6),sy=R(3,12); const b=r*sy/sx; return P("LSRL",`r = ${r}, s<sub>x</sub> = ${sx}, s<sub>y</sub> = ${sy}. What is the slope b of the least-squares line? (2 decimals)`,r2(b),[r2(r*sx/sy),r2(sy/sx),r2(r*sy)],[`b = r · s<sub>y</sub>/s<sub>x</sub> = ${r} · ${sy}/${sx}`,`= <b>${r2(b)}</b>`],{tol:.01}); },
 ()=>{ const n=pick([20,40,50,60,100]),p=pick([0.1,0.2,0.3,0.4,0.5]); return P("Binomial",`X is binomial with n = ${n} and p = ${p}. What is σ<sub>X</sub>? (2 decimals)`,r2(Math.sqrt(n*p*(1-p))),[r2(n*p),r2(n*p*(1-p)),r2(Math.sqrt(n*p))],[`σ = √(np(1 − p)) = √(${n} · ${p} · ${r2(1-p)})`,`= <b>${r2(Math.sqrt(n*p*(1-p)))}</b>`],{tol:.01}); },
 ()=>{ const n=R(5,10),k=R(1,n-1),p=pick([0.2,0.3,0.4,0.5,0.6,0.7]); const v=C(n,k)*p**k*(1-p)**(n-k); return P("Binomial",`X is binomial with n = ${n}, p = ${p}. What is P(X = ${k})? (3 decimals)`,r3(v),[r3(p**k*(1-p)**(n-k)),r3(C(n,k)*p**k),r3(k/n)],[`C(${n}, ${k}) · ${p}<sup>${k}</sup> · ${r2(1-p)}<sup>${n-k}</sup>`,`= <b>${r3(v)}</b> (binompdf)`],{tol:.002}); },
 ()=>{ const p=pick([0.1,0.2,0.25,0.3,0.4,0.5]),k=R(2,5); const v=(1-p)**(k-1)*p; return P("Geometric",`Each trial succeeds with p = ${p}. What is P(first success on trial ${k})? (3 decimals)`,r3(v),[r3(p**(k-1)*(1-p)),r3((1-p)**k),r3(1-(1-p)**k)],[`(1 − p)<sup>${k-1}</sup> · p = ${r2(1-p)}<sup>${k-1}</sup> · ${p}`,`= <b>${r3(v)}</b>`],{tol:.002}); },
 ()=>{ const [a,b,c]=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17],[2,3,Math.sqrt(13)]]); const op=pick(["+","−"]); return P("Combining RVs",`X and Y are independent with σ<sub>X</sub> = ${a} and σ<sub>Y</sub> = ${b}. What is the SD of X ${op} Y? (2 decimals)`,r2(c),[a+b,Math.abs(a-b),a*a+b*b].map(r2),[`Variances add, even for a difference: ${a}² + ${b}² = ${a*a+b*b}`,`SD = √${a*a+b*b} = <b>${r2(c)}</b>`],{tol:.01}); },
 ()=>{ const mu=R(10,50),sd=R(2,8),a=R(-10,20),b=pick([2,3,-2,0.5,1.5]); return P("Transformations",`X has μ = ${mu} and σ = ${sd}. Y = ${a} + ${b}X. What is σ<sub>Y</sub>?`,r2(Math.abs(b)*sd),[r2(a+b*sd),r2(b*b*sd),sd],[`Adding ${a} doesn't change spread; multiplying by ${b} scales it by |${b}|.`,`σ<sub>Y</sub> = <b>${r2(Math.abs(b)*sd)}</b>`],{tol:.01}); },
 ()=>{ const mu=R(50,150),sd=R(5,30),n=pick([16,25,36,49,64,100]); return P("Sampling distributions",`Population μ = ${mu}, σ = ${sd}. For samples of n = ${n}, what is σ<sub>x̄</sub>? (2 decimals)`,r2(sd/Math.sqrt(n)),[r2(sd/n),sd,r2(sd*Math.sqrt(n))],[`σ<sub>x̄</sub> = σ/√n = ${sd}/${Math.sqrt(n)}`,`= <b>${r2(sd/Math.sqrt(n))}</b>`],{tol:.01}); },
 ()=>{ const vals=[0,1,2,3],ps=pick([[0.1,0.3,0.4,0.2],[0.2,0.2,0.3,0.3],[0.4,0.3,0.2,0.1],[0.25,0.25,0.25,0.25]]); const mu=vals.reduce((s,x,i)=>s+x*ps[i],0); return P("Random variables",`X takes values 0, 1, 2, 3 with probabilities ${ps.join(", ")}. What is μ<sub>X</sub>?`,r2(mu),[1.5,r2(ps.reduce((a,b)=>a+b)/4),r2(mu+0.5)],[`Σ x·P(x) = ${vals.map((x,i)=>`${x}(${ps[i]})`).join(" + ")}`,`= <b>${r2(mu)}</b>`],{tol:.01}); }
];
const G={ap:{which:SC.map(mkW).concat([mkC,mkCon]),design:[mkD,mkD,mkD],calc:CALC,form:FORM}};
const LEAD={which:"Read the scenario and choose the procedure. New scenarios every time, each with the key clues explained.",design:"Identify the sampling method or experimental design. New descriptions every time.",calc:"Compute the statistic for each procedure: z, t, standard errors, df, expected counts, margins of error. New numbers every time.",form:"Practice the Units 1, 2, 4 and 5 formulas: LSRL, binomial, geometric, combining random variables, sampling distributions. New numbers every time."};
const NOTYPE={which:1,design:1};
const fv=()=>`<i class="mf-v" aria-hidden="true"></i>`;
const FLOWS={};
function flowHTML(id,F){ FLOWS[id]=F;
  const col=C=>C.g?`<div class="mf-col mf-gc">${fv()}<div class="mf-g" style="--c:${C.c}"><b>${C.g}</b><span>${C.s}</span></div><div class="mf-br" style="--n:${C.cols.length};grid-template-columns:repeat(${C.cols.length},minmax(0,1fr))">${C.cols.map(col).join("")}</div><i class="mf-v mf-fill" aria-hidden="true"></i></div>`
    :`<div class="mf-col">${fv()}<div class="mf-l" style="--c:${C[2]}"><b>${C[0]}</b><span>${C[1]}</span></div>${C[3].map(k=>fv()+fn(k)).join("")}<i class="mf-v mf-fill" aria-hidden="true"></i></div>`;
  const fn=k=>{ const m=F.M[k]; return `<button type="button" class="mf-n" data-fm="${k}" style="--c:${m.c}"><b>${m.name}</b><span>${m.hint}</span></button>`; };
  return `<div class="fx-lead"><p>${F.lead}</p></div>
<div class="mf" lang="en" data-flow="${id}" role="group" aria-label="${F.label}">
 <div class="mf-s">${F.start}</div>${fv()}
 ${F.top.map(k=>fn(k)+fv()).join("")}
 <div class="mf-q">${F.q}</div>
 <div class="mf-br${F.cols[0].g?" grp":""}" style="--n:${F.cols.length};grid-template-columns:repeat(${F.cols.length},minmax(0,1fr))">${F.cols.map(C=>col(C)).join("")}</div>
 ${fv()}${fn(F.end)}
</div>
<div class="mf-d" aria-live="polite"></div>`; }
function mfDetail(m,flow,k){
  return `<div class="mf-dc" style="--c:${m.c}"><div class="mf-dk">${m.grp}</div><h4>${m.name}</h4><p class="mf-when"><b>When:</b> ${m.when}</p><p class="mf-rule">${m.rule}</p>${m.why?`<p class="mf-why"><b>Why this method:</b> ${m.why}</p>`:""}
   <div class="mf-exs">${m.ex.map(([q,st],i)=>`<div class="mf-ex"><div class="fx-k">Example ${i+1}</div><p class="mf-eq">${q}</p><ol>${st.map(s=>`<li>${s}</li>`).join("")}</ol></div>`).join("")}</div>
   ${m.tip?`<p class="mf-tip"><b>⚠ Watch out:</b> ${m.tip}</p>`:""}
   <button type="button" class="fx-go" data-mgen="1">↻ New examples</button>${m.go?`<button type="button" class="fx-go" data-mjump="${m.go}">Full method, more examples & practice →</button>`:""}${m.open?`<button type="button" class="fx-go" data-mopen="${m.open[0]}">${m.open[1]} →</button>`:""}</div>`; }
function bindFlow(root){ root.querySelectorAll(".mf").forEach(mf=>{ if(mf.dataset.bound) return; mf.dataset.bound=1; const d=mf.nextElementSibling, F=FLOWS[mf.dataset.flow]; if(!F) return;
  const pickK=(k,scroll)=>{ mf.querySelectorAll(".mf-n").forEach(b=>b.classList.toggle("on",b.dataset.fm===k)); d.dataset.k=k; d.innerHTML=mfDetail(F.M[k],mf.dataset.flow,k); if(scroll) d.scrollIntoView({behavior:"smooth",block:"nearest"}); };
  mf.querySelectorAll(".mf-n").forEach(b=>b.onclick=()=>pickK(b.dataset.fm,true)); pickK(F.top[0],false);
  d.addEventListener("click",e=>{ if(e.target.closest("[data-mgen]")){ const ex=zFresh(F.M[d.dataset.k],mf.dataset.flow,d.dataset.k); if(ex) d.querySelector(".mf-exs").innerHTML=ex; return; } const o=e.target.closest("[data-mopen]"); if(o){ location.hash=o.dataset.mopen; return; }
    const j=e.target.closest("[data-mjump]"); if(!j) return; const sec=mf.closest("section.unit"), node=sec&&sec.querySelector(`.pm-node[data-pk="${j.dataset.mjump.replace(/^sub-[^-]+-/,"")}"]`);
    if(node) node.click(); const t=document.getElementById(j.dataset.mjump); if(!t) return; if(t.tagName==="DETAILS") t.open=true; setTimeout(()=>window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-130,behavior:"smooth"}),40); }); }); }

const zTok=s=>new Set(String(s||"").replace(/<[^>]+>/g," ").toLowerCase().split(/[^a-z0-9χ²]+/).filter(w=>w.length>2&&!/^(the|and|for|with|from|that|this|then|when|each|into|than|only|both|have|uses|use|find|your|what|which|value|values|are|you|one|two)$/.test(w)).map(w=>w.replace(/(ies|es|s|ing|ed)$/,"")));
const SCC=['P1I','P1T','P2I','P2T','GOF','HOM','IND','M1I','M1T','MPT','MPI','M2I','M2T','SLT','SLI'];
const ZW={p1:'P1',p2:'P2',gof:'GOF',hom:'HOM',ind:'IND',m1:'M1',mp:'MP',m2:'M2',sl:'SL',u8cat:'GOF|HOM|IND',u9out:'SLT',u9ci:'SLI',est:'.',ctx:'.',u7zt:'M'};
const ZT={z:'z-scores',u1emp:'z-scores',tr:'Transformations',lsrl:'LSRL',u2r:'LSRL',rv:'Random variables',comb:'Combining RVs',bin:'Binomial',geo:'Geometric',phat:'Standard errors',xbar:'Sampling distributions',u5dp:'Standard errors|Pooling',u5dm:'Sampling distributions',u5what:'Standard errors|Sampling distributions',u5norm:'Sampling distributions',u8exp:'Expected counts|Degrees of freedom',chk:'Conditions|Conclusions|Test statistics',u6err:'Conclusions',u6ci:'Margin of error',inter:'Conclusions',res:'LSRL'};
const ZD={srs:'SRS',str:'Stratified',clu:'Cluster',sys:'Systematic',crd:'Completely',blk:'Block',mpd:'Matched',obs:'.',bias:'Convenience|Voluntary',scope:'.',u5bias:'Convenience|Voluntary'};
const mkDn=re=>()=>{ const L=DS.filter(d=>new RegExp(re,"i").test(d[0])); const [a,ex]=pick(L.length?L:DS); const others=shuffle(DS.filter(d=>d[0]!==a).map(d=>d[0])).slice(0,3); return PS("Which design?",pick(ex)+" Which method is this?",a,others,[`<b>${a}</b>`]); };
function zPool(k,flow){ if(/^uf-unit-[1245]$/.test(flow||"")&&/^(inter|ctx|chk|res|u1ctx)$/.test(k)) return null; const all=[...G.ap.calc,...G.ap.form,mkC,mkCon]; all.forEach(g=>{ if(g._t===undefined){ const p=gen(g); g._t=p?p.t:""; } });
  if(ZW[k]){ const re=new RegExp("^("+ZW[k]+")"); return SC.filter((g,i)=>re.test(SCC[i])).map(mkW); }
  if(ZT[k]){ const re=new RegExp("^("+ZT[k]+")$"); return all.filter(g=>re.test(g._t)); }
  if(ZD[k]) return [mkDn(ZD[k])];
  const u=(flow||"").replace(/^uf-/,""); const PU=window.PRACTICE&&PRACTICE._U[u]; return PU?null:[...G.ap.which]; }
const pTok=s=>new Set(String(s||"").replace(/<[^>]+>/g," ").toLowerCase().split(/[^a-z]+/).filter(w=>w.length>3).map(w=>w.replace(/(ies|es|s|ing|ed)$/,"")));
function zUnit(m,flow){ const u=(flow||"").replace(/^uf-/,""), PU=PRACTICE._U[u]; const T=pTok(m.name+" "+m.hint+" "+m.rule);
  const L=[...(PU.mcq||[]).map(g=>["m",g]),...(PU.tasks||[]).map(g=>["t",g])].map(([kd,g])=>{ let p; try{p=g();}catch(e){} return p?[kd,p]:null; }).filter(Boolean);
  const sc=L.map(([kd,p])=>{ let n=0; pTok(kd==="m"?p.q:p.t).forEach(w=>{ if(T.has(w)) n++; }); return n+Math.random()*.9; });
  return L.map((x,i)=>[sc[i],x]).sort((a,b)=>b[0]-a[0]).slice(0,4).sort(()=>Math.random()-.5).slice(0,2).map(([_,[kd,p]])=>kd==="m"?{t:"Practice",q:p.q,a:p.ch[p.ai],s:[p.ex]}:{t:"Free response",q:p.t,a:"see the solution",s:[p.s]}); }
function zFresh(m,flow,k){ if(!m) return null; let out=[]; const pool=zPool(k,flow);
  if(pool&&pool.length){ const seen=new Set(); let t=0; while(out.length<2&&t++<40){ const p=gen(pick(pool)); if(!p||seen.has(p.q)) continue; seen.add(p.q); out.push(p); } }
  else if(window.PRACTICE) out=zUnit(m,flow);
  return out.map((p,i)=>`<div class="mf-ex"><div class="fx-k">New example ${i+1} · ${p.t}</div><p class="mf-eq">${p.q}</p>${p.a==="see the solution"?"":`<p><b>Answer:</b> ${p.a}</p>`}${p.s&&p.s.length?`<ol>${p.s.map(x=>`<li>${x}</li>`).join("")}</ol>`:""}</div>`).join(""); }
/* ===================== engine ===================== */
const has=(u,kind)=>!!(G[u]&&G[u][kind]&&G[u][kind].length);
function parseAns(s){ s=String(s||"").trim().toLowerCase().replace(/[−–—]/g,"-").replace(/,/g,"").replace(/\s+/g,"").replace(/%$/,"").replace(/^\$/,"");
  if(!s) return null; let m=s.match(/^(-?\d*\.?\d+)\/(-?\d*\.?\d+)$/); if(m) return +m[1]/+m[2]; if(/^-?\d*\.?\d+(e-?\d+)?$/.test(s)) return +s; return NaN; }
function gen(g){ for(let i=0;i<30;i++){ try{ const p=g(); if(p&&p.q&&p.a!=null) return p; }catch(e){} } return null; }
function options(p){ const seen=new Set([String(p.a)]), o=[String(p.a)]; for(const w of p.w){ const s=String(w); if(!seen.has(s)&&s!=="NaN"){ seen.add(s); o.push(s); } if(o.length===4) break; }
  let k=1; while(o.length<4&&typeof p.v==="number"){ const c=N(p.v+(k%2?k:-k)); if(!seen.has(c)){ seen.add(c); o.push(c); } k++; } return shuffle(o); }
const esc=s=>String(s).replace(/"/g,"&quot;");
function setOf(u,kind,tp,n,typeOnly){ const L=G[u][kind].filter(g=>!tp||(g._t||"")===tp); const out=[], seen=new Set(); let tries=0;
  while(out.length<n&&tries++<n*25){ const g=L[out.length%L.length], p=gen(g); if(!p) continue; if(typeOnly&&(p.mc||typeof p.v!=="number")) continue; if(seen.has(p.q)) continue; seen.add(p.q); out.push(p); } return out; }
function topicsOf(u,kind){ G[u][kind].forEach(g=>{ if(g._t===undefined){ const p=gen(g); g._t=p?p.t:""; } }); return [...new Set(G[u][kind].map(g=>g._t))]; }
const solHtml=p=>`<ol class="pr-st">${p.s.map(x=>`<li>${x}</li>`).join("")}</ol>`;
function boxHTML(u,kind){ const tps=topicsOf(u,kind);
  return `<div class="pr" data-pr="${u}|${kind}">
   <p class="lead2">${LEAD[kind]||""}</p>
   <div class="pr-tp"><span class="gl">Topic</span>${["All",...tps].map((t,i)=>`<button type="button" data-prt="${i?esc(t):""}"${i?"":' class="on"'}>${t}</button>`).join("")}</div>
   <div class="pr-md">${[["mcq","Multiple choice"],["deck","Deck"],["type","Type the answer"]].filter(m=>m[0]!=="type"||!NOTYPE[kind]).map(([k,v],i)=>`<button type="button" data-prm="${k}"${i?"":' class="on"'}>${v}</button>`).join("")}<button type="button" class="pr-new" data-prn>↻ New</button></div>
   <div class="pr-sc"></div><div class="pr-o"></div></div>`; }
function bind(root){ root.querySelectorAll(".pr").forEach(box=>{ if(box.dataset.bound) return; box.dataset.bound=1;
  const [u,kind]=box.dataset.pr.split("|"), out=box.querySelector(".pr-o"), sc=box.querySelector(".pr-sc"); let mode="mcq", tp="";
  const score=(r,d,n)=>{ sc.innerHTML=`<b>${r}</b> correct · ${d} of ${n} answered`; };
  const render=()=>{ sc.innerHTML="";
   if(mode==="mcq"){ const ps=setOf(u,kind,tp,8); let r=0,d=0; score(0,0,ps.length);
     out.innerHTML=ps.map((p,i)=>{ const o=options(p); return `<div class="pr-q" data-i="${i}"><div class="pr-tg">${p.t}</div><p class="pr-qt"><span class="n">${i+1}</span><span>${p.q}</span></p><div class="pr-ch">${o.map((x,j)=>`<button type="button" data-c="${esc(x)}"><b>${"ABCD"[j]}</b> ${x}</button>`).join("")}</div><div class="pr-fb"></div></div>`; }).join("");
     out.querySelectorAll(".pr-q").forEach(q=>{ const p=ps[+q.dataset.i]; q.querySelectorAll("[data-c]").forEach(b=>b.onclick=()=>{ if(q.dataset.done) return; q.dataset.done=1; d++; const ok=b.dataset.c===String(p.a); if(ok) r++; b.classList.add(ok?"ok":"bad"); q.querySelectorAll("[data-c]").forEach(x=>{ if(x.dataset.c===String(p.a)) x.classList.add("ok"); x.disabled=true; });
       q.querySelector(".pr-fb").innerHTML=`<p class="${ok?"yes":"no"}">${ok?"Correct!":"Not quite. The answer is "+p.a+"."}</p>${solHtml(p)}`; score(r,d,ps.length); }); }); }
   else if(mode==="deck"){ const ps=setOf(u,kind,tp,10); let q=ps.map((_,i)=>i), known=0;
     const show=()=>{ if(!q.length){ out.innerHTML=`<div class="pr-card done"><p><b>Deck finished!</b> You knew ${known} of ${ps.length} on the first try.</p><button type="button" class="pr-new" data-again>↻ New deck</button></div>`; out.querySelector("[data-again]").onclick=render; return; }
       const p=ps[q[0]]; out.innerHTML=`<div class="pr-card"><div class="pr-tg">${p.t} · ${ps.length-q.length+1} of ${ps.length} · ${q.length} left</div><p class="pr-qt">${p.q}</p><button type="button" class="pr-flip">Show answer</button><div class="pr-back" hidden><p class="pr-ans">${p.a}</p>${solHtml(p)}<div class="pr-db"><button type="button" class="ok" data-k="1">✓ Got it</button><button type="button" class="bad" data-k="0">✗ Again</button></div></div></div>`;
       out.querySelector(".pr-flip").onclick=e=>{ e.target.hidden=true; out.querySelector(".pr-back").hidden=false; };
       out.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{ const i=q.shift(); if(b.dataset.k==="1"){ if(!ps[i]._miss) known++; } else { ps[i]._miss=1; q.push(i); } show(); }); };
     show(); }
   else { const ps=setOf(u,kind,tp,6,true); let r=0,d=0; score(0,0,ps.length);
     out.innerHTML=ps.length?ps.map((p,i)=>`<div class="pr-q" data-i="${i}"><div class="pr-tg">${p.t}</div><p class="pr-qt"><span class="n">${i+1}</span><span>${p.q}</span></p><div class="pr-in"><input type="text" inputmode="text" autocomplete="off" aria-label="Your answer to question ${i+1}" placeholder="Your answer (e.g. 12, −3, 5/6, 2.5)"><button type="button" data-chk>Check</button><button type="button" data-sol>Show solution</button></div><div class="pr-fb"></div></div>`).join(""):`<p class="empty">This topic has multiple-choice questions only. Pick another mode or topic.</p>`;
     out.querySelectorAll(".pr-q").forEach(q=>{ const p=ps[+q.dataset.i], inp=q.querySelector("input"), fb=q.querySelector(".pr-fb");
       const chk=()=>{ const x=parseAns(inp.value); if(x===null) return; const tol=p.tol!=null?p.tol:Math.max(1e-6,Math.abs(p.v)*1e-6); const ok=!isNaN(x)&&Math.abs(x-p.v)<=tol+1e-9; inp.classList.toggle("ok",ok); inp.classList.toggle("bad",!ok);
         if(!q.dataset.done){ q.dataset.done=1; d++; if(ok) r++; score(r,d,ps.length); } fb.innerHTML=ok?`<p class="yes">Correct! ${p.a}</p>${solHtml(p)}`:`<p class="no">${isNaN(x)?"Type a number, like 12, −3, 5/6 or 2.5.":"Not yet. Try again or open the solution."}</p>`; };
       q.querySelector("[data-chk]").onclick=chk; inp.addEventListener("keydown",e=>{ if(e.key==="Enter") chk(); });
       q.querySelector("[data-sol]").onclick=()=>{ if(!q.dataset.done){ q.dataset.done=1; d++; score(r,d,ps.length); } fb.innerHTML=`<p class="pr-ans">Answer: ${p.a}</p>${solHtml(p)}`; }; }); } };
  box.querySelectorAll("[data-prt]").forEach(b=>b.onclick=()=>{ tp=b.dataset.prt; box.querySelectorAll("[data-prt]").forEach(x=>x.classList.toggle("on",x===b)); render(); });
  box.querySelectorAll("[data-prm]").forEach(b=>b.onclick=()=>{ mode=b.dataset.prm; box.querySelectorAll("[data-prm]").forEach(x=>x.classList.toggle("on",x===b)); render(); });
  box.querySelector("[data-prn]").onclick=render; render(); }); }

const CSS=`.fx-lead{border-left:4px solid ${TEAL};background:#f6fbfa;padding:8px 14px;margin:6px 0 14px}
.fx-lead p{margin:0;font-size:17.5px}
.yes{color:#137333;font-weight:600}.no{color:#b3261e;font-weight:600}
.frc{display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;font-size:.82em;line-height:1.05;margin:0 1px}
.frc span+span{border-top:1.3px solid currentColor}
.fx-go{align-self:flex-start;margin-top:4px;border:1.5px solid ${TEAL};background:#fff;color:${TEAL};padding:2px 12px;font:600 15px 'EB Garamond',Georgia,serif;cursor:pointer}
.fx-go:hover{background:${TEAL};color:#fff}
.fx-k{font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:${TEAL};font-weight:600}
.mf{display:flex;flex-direction:column;align-items:center;margin:6px 0 4px;padding:18px 10px;border:1.5px solid #d9e0ea;border-radius:16px;background:#fbfcfe radial-gradient(#dde4ee 1px,transparent 1.2px) 0 0/20px 20px}
.mf-v{display:block;width:2px;height:20px;background:#8ea3c0;flex:none}
.mf-s{background:#111;color:#fff;border-radius:999px;padding:6px 20px;font-weight:700;font-size:18px}
.mf-q{border:2px dashed #111;background:#fff;border-radius:10px;padding:5px 16px;font-weight:700;font-size:17px}
.mf-n{border:1.5px solid #dbe2ec;border-top:4px solid var(--c);border-radius:12px;background:#fff;padding:7px 10px;min-width:150px;max-width:230px;display:flex;flex-direction:column;gap:1px;text-align:center;cursor:pointer;font-family:'EB Garamond',Georgia,serif;box-shadow:0 4px 12px rgba(15,30,60,.08);transition:transform .12s,box-shadow .12s}
.mf-n b{color:var(--c);font-size:16.5px;line-height:1.15}.mf-n span{font-size:13.5px;color:#555;line-height:1.2}
.mf-n:hover{transform:translateY(-2px);box-shadow:0 8px 18px rgba(15,30,60,.15)}
.mf-n.on{background:var(--c);border-color:var(--c);box-shadow:0 0 0 4px color-mix(in srgb,var(--c) 22%,transparent)}
.mf-n.on b,.mf-n.on span{color:#fff}
.mf-br{--g:12px;position:relative;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));column-gap:var(--g);width:100%;margin-top:20px}
.mf-br::before,.mf-br::after{content:"";position:absolute;left:calc((100% - (var(--n,4) - 1) * var(--g)) / var(--n,4) / 2);right:calc((100% - (var(--n,4) - 1) * var(--g)) / var(--n,4) / 2);height:2px;background:#8ea3c0}
.mf-br::before{top:0}.mf-br::after{bottom:0}
.mf-col{display:flex;flex-direction:column;align-items:center;min-width:0}
.mf-col .mf-n{width:100%;min-width:0}
.mf-fill{flex:1;min-height:20px}
.mf-l{border-radius:999px;background:var(--c);color:#fff;padding:3px 14px;text-align:center;display:flex;flex-direction:column;line-height:1.15}
.mf-l b{font-size:16px}.mf-l span{font-size:12.5px;opacity:.9;font-style:italic}
.mf-d{margin-top:14px}
.mf-g{border-radius:12px;background:var(--c);color:#fff;padding:5px 18px;text-align:center;display:flex;flex-direction:column;line-height:1.15;box-shadow:0 4px 10px rgba(0,0,0,.15)}
.mf-g b{font-size:19px}.mf-g span{font-size:13.5px;opacity:.92;font-style:italic}
.mf-gc{padding:0 4px}
.mf-gc>.mf-br{--g:8px;column-gap:8px}
.mf-gc .mf-l{padding:3px 6px}.mf-gc .mf-l b{font-size:14px}
.mf-gc .mf-n{padding:6px 5px}.mf-gc .mf-n b{font-size:14.5px}.mf-gc .mf-n span{font-size:12.5px}
@media (max-width:820px){.mf-br.grp{grid-template-columns:1fr!important;row-gap:0}.mf-br.grp::before,.mf-br.grp::after{display:none}.mf-br.grp>.mf-gc{padding:0}
 .mf-br.grp>.mf-gc>.mf-fill{display:none}.mf-br.grp>.mf-gc+.mf-gc{margin-top:18px}}
@media (max-width:700px){.mf-gc .mf-n b{font-size:10.5px!important;overflow-wrap:normal!important;word-break:normal;hyphens:manual!important}.mf-gc .mf-l b{font-size:10.5px!important}.mf-gc>.mf-br{--g:4px;column-gap:4px}}
.mf-tip{margin:6px 0;font-size:16px}
.mf-why{margin:0 0 6px;font-size:17px;background:#fff8e6;border-left:3px solid #c28a00;padding:6px 10px}
.mf-br[style*="--n:4"] .mf-col .mf-n{max-width:none}
.mf-l span:empty{display:none}
.mf-dc{border:1.5px solid #111;border-top:5px solid var(--c);background:#fff;padding:12px 16px}
.mf-dk{font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--c);font-weight:600}
.mf-dc h4{margin:2px 0 6px;font-size:23px;color:var(--c)}
.mf-when,.mf-rule{margin:0 0 6px;font-size:17px}
.mf-rule{background:#f6f8fb;border-left:3px solid var(--c);padding:6px 10px}
.mf-exs{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:12px;margin:8px 0}
.mf-ex{border:1px solid #ccc;padding:8px 12px}
.mf-eq{margin:0 0 2px;font-size:19px;font-weight:600}
.mf-ex ol{margin:0;padding-left:20px;font-size:16px;line-height:1.55}
@media (max-width:700px){.mf{padding:14px 4px}.mf-br{--g:4px}.mf-n{padding:5px 3px;border-radius:9px}.mf-n b{font-size:12.5px}.mf-col .mf-n span{display:none}.mf-l{padding:2px 4px}.mf-l b{font-size:12.5px}.mf-l span{display:none}.mf-s,.mf-q{font-size:15px}.mf-br[style*="--n:5"] .mf-n b,.mf-br[style*="--n:5"] .mf-l b{font-size:10.5px;-webkit-hyphens:auto;hyphens:auto;overflow-wrap:normal}.mf-n b{overflow-wrap:normal;-webkit-hyphens:auto;hyphens:auto}}
.pr-tp,.pr-md{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:0 0 10px}
.pr-tp .gl{font-variant:small-caps;font-weight:600;letter-spacing:.06em;margin-right:4px}
.pr-tp button{border:1.5px solid #1d4e89;background:#fff;color:#1d4e89;padding:3px 11px;border-radius:999px;font:500 15px 'EB Garamond',Georgia,serif;cursor:pointer}
.pr-tp button.on{background:#1d4e89;color:#fff}
.pr-md button{border:1.5px solid #111;background:#fff;color:#111;padding:6px 14px;font:600 16px 'EB Garamond',Georgia,serif;cursor:pointer}
.pr-md button.on{background:#111;color:#fff}
.pr-new{margin-left:auto;border:1.5px solid #0f7a6c!important;background:#0f7a6c!important;color:#fff!important;padding:6px 14px;font:600 16px 'EB Garamond',Georgia,serif;cursor:pointer}
.pr-sc{font-size:16px;margin:0 0 10px;color:#333}.pr-sc:empty{display:none}.pr-sc b{color:#0f7a6c;font-size:19px}
.pr-q,.pr-card{border:1.5px solid #111;background:#fff;padding:10px 14px;margin:0 0 10px}
.pr-tg{font-size:12.5px;letter-spacing:.1em;text-transform:uppercase;color:#1d4e89;margin-bottom:4px}
.pr-qt{font-size:18px;margin:0 0 8px;display:flex;gap:8px;align-items:baseline}
.pr-qt .n{flex:none;min-width:24px;height:24px;line-height:24px;border-radius:50%;background:#1d4e89;color:#fff;text-align:center;font-size:13px}
.pr-ch{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:6px}
.pr-ch button{text-align:left;border:1.5px solid #bbb;background:#fff;padding:7px 10px;font:17px 'EB Garamond',Georgia,serif;cursor:pointer;border-radius:8px}
.pr-ch button:hover:not(:disabled){border-color:#111}
.pr-ch button b{display:inline-block;width:22px;color:#1d4e89}
.pr-ch button.ok{border-color:#1a7f37;background:#e8f6ec}.pr-ch button.bad{border-color:#c5221f;background:#fdecea}
.pr-fb .yes,.pr-fb .no{margin:8px 0 4px;font-weight:600}.pr-fb .yes{color:#137333}.pr-fb .no{color:#b3261e}
.pr-st{margin:2px 0 0;padding-left:22px;font-size:16px;line-height:1.6}
.pr-in{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.pr-in input{flex:1 1 200px;font:18px 'EB Garamond',Georgia,serif;padding:7px 10px;border:1.5px solid #9aa7b8;border-radius:8px}
.pr-in input.ok{border-color:#1a7f37;background:#e8f6ec}.pr-in input.bad{border-color:#c5221f;background:#fdecea}
.pr-in button,.pr-flip,.pr-db button{border:1.5px solid #1d4e89;background:#fff;color:#1d4e89;padding:6px 14px;font:600 16px 'EB Garamond',Georgia,serif;cursor:pointer}
.pr-in button[data-chk]{background:#1d4e89;color:#fff}
.pr-card{padding:16px 18px;min-height:150px}
.pr-card .pr-qt{font-size:20px}
.pr-ans{font-size:19px;font-weight:700;color:#0f7a6c;margin:8px 0 4px}
.pr-db{display:flex;gap:10px;margin-top:10px}.pr-db .ok{border-color:#1a7f37;color:#1a7f37}.pr-db .bad{border-color:#c5221f;color:#c5221f}
.pr-db button.ok:hover{background:#1a7f37;color:#fff}.pr-db button.bad:hover{background:#c5221f;color:#fff}
.pr-card.done{border-color:#1a7f37}
.mx{display:inline-flex;flex-direction:column;vertical-align:middle;border-left:1.5px solid #111;border-right:1.5px solid #111;border-radius:3px;padding:0 5px;margin:0 2px;line-height:1.2}
.mx span{display:flex;gap:10px;justify-content:space-between}.mx i{font-style:normal;min-width:14px;text-align:center}
.ksheet{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,330px),1fr));gap:12px}
.ks{border:1.5px solid #111;border-top:5px solid var(--c,#1d4e89);background:#fff;padding:10px 14px}
.ks h4{margin:0 0 6px;font-size:19px;color:var(--c,#1d4e89)}
.ks ul{margin:0;padding-left:20px;font-size:16.5px;line-height:1.65}
.ks .ex{margin:6px 0 0;font-size:15.5px;background:#f6f8fb;padding:6px 10px;border-left:3px solid var(--c,#1d4e89)}
@media (max-width:640px){.pr-new{margin-left:0}}
.lead2{font-style:italic;color:#444;margin:0 0 8px}
.mf-why{margin:0 0 6px;font-size:17px;background:#fff8e6;border-left:3px solid #c28a00;padding:6px 10px}
.mf-tip{margin:6px 0;font-size:16px}
.mf-g{border-radius:12px;background:var(--c);color:#fff;padding:5px 18px;text-align:center;display:flex;flex-direction:column;line-height:1.15;box-shadow:0 4px 10px rgba(0,0,0,.15)}
.mf-g b{font-size:19px}.mf-g span{font-size:13.5px;opacity:.92;font-style:italic}
.mf-gc{padding:0 4px}.mf-gc>.mf-br{--g:8px;column-gap:8px}
.mf-gc .mf-l{padding:3px 6px}.mf-gc .mf-l b{font-size:14px}
.mf-gc .mf-n{padding:6px 5px}.mf-gc .mf-n b{font-size:14.5px}.mf-gc .mf-n span{font-size:12.5px}
@media (max-width:820px){.mf-br.grp{grid-template-columns:1fr!important;row-gap:0}.mf-br.grp::before,.mf-br.grp::after{display:none}.mf-br.grp>.mf-gc{padding:0}.mf-br.grp>.mf-gc>.mf-fill{display:none}.mf-br.grp>.mf-gc+.mf-gc{margin-top:18px}}
@media (max-width:700px){.mf-gc .mf-n b{font-size:10.5px!important;overflow-wrap:normal!important;word-break:normal;hyphens:manual!important}.mf-gc .mf-l b{font-size:10.5px!important}.mf-gc>.mf-br{--g:4px;column-gap:4px}.mf-br[style*="--n:5"] .mf-n b,.mf-br[style*="--n:5"] .mf-l b{font-size:10.5px;-webkit-hyphens:auto;hyphens:auto;overflow-wrap:normal}}
.ap-cond{display:flex;flex-wrap:wrap;gap:5px;margin-top:6px}.ap-cond>span{font-size:14px;background:#eef6f6;border:1px solid #b9d9d8;border-radius:999px;padding:1px 9px}
.ap-calc{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:.85em;background:#f1f1f1;border:1px solid #ccc;border-radius:4px;padding:0 4px;white-space:nowrap}
.ap-tw{overflow-x:auto}.ap-tbl{border-collapse:collapse;width:100%;font-size:15.5px;min-width:760px}
.ap-tbl th,.ap-tbl td{border:1px solid #bbb;padding:5px 8px;vertical-align:top;text-align:left}.ap-tbl th{background:#1d2b44;color:#fff}
.ap-tbl td.ap-p{font-weight:700;white-space:nowrap}.ap-tbl tr:nth-child(even) td{background:#f7f8fa}
.mx{display:inline-flex;flex-direction:column;vertical-align:middle;border-left:1.5px solid #111;border-right:1.5px solid #111;padding:0 5px;margin:0 2px;line-height:1.2}.mx span{display:flex;gap:10px}.mx i{font-style:normal}
.apf-sub{margin:18px 0 6px;font-size:21px}
@media (max-width:700px){.ap-tbl{min-width:0;font-size:15.5px}.ap-tbl thead{display:none}.ap-tbl,.ap-tbl tbody,.ap-tbl tr,.ap-tbl td{display:block;width:100%}
 .ap-tbl tr{border:1.5px solid #1d2b44;border-radius:10px;margin:0 0 12px;overflow:hidden;background:#fff}
 .ap-tbl tr:nth-child(even) td{background:#fff}
 .ap-tbl td{border:none;border-bottom:1px solid #e3e6ea;display:grid;grid-template-columns:92px 1fr;gap:8px;padding:6px 10px}
 .ap-tbl td:last-child{border-bottom:none}
 .ap-tbl td::before{content:attr(data-l);font-weight:700;color:#1d2b44;font-size:13px;letter-spacing:.04em;text-transform:uppercase}
 .ap-tbl td.ap-p{background:#1d2b44!important;color:#fff;font-size:18px;display:block}.ap-tbl td.ap-p::before{display:none}}
`;
const st=document.createElement('style'); st.textContent=CSS; document.head.appendChild(st);


/* ===================== unit-specific flowcharts ===================== */
const NM={
 u1type:{grp:"Step 1",c:NAVY,name:"Categorical or Quantitative?",hint:"labels vs. numbers",when:"Before any display or summary.",rule:"<b>Categorical</b>: labels or groups (eye color, yes/no). <b>Quantitative</b>: numbers that you can average (height, time). Zip codes are numbers but categorical.",
  ex:[T("Favorite sport",["Categorical"]),T("Minutes spent on homework",["Quantitative"])]},
 u1cat:{grp:"Display",c:BLU,name:"Displays for Categorical Data",hint:"bar chart, pie chart",when:"One categorical variable.",rule:"Bar chart (counts or percents, bars separated) or pie chart (parts of one whole). Describe with the most and least common categories.",
  ex:[T("Students' favorite lunch",["Bar chart of counts per lunch choice"]),T("Mistake to avoid",["A histogram is for quantitative data: its bars touch and the x-axis is numeric"])]},
 u1qd:{grp:"Display",c:BLU,name:"Displays for Quantitative Data",hint:"dotplot, stemplot, histogram, boxplot",when:"One quantitative variable.",rule:"Dotplot or stemplot (small data), histogram (large data), boxplot (five-number summary, outliers, comparing groups). Cumulative relative frequency plots show percentiles.",
  ex:[T("Heights of 200 students",["Histogram"]),T("Compare test scores of three classes",["Side-by-side boxplots"])]},
 u1soc:{grp:"Describe",c:BLU,name:"Describe the Distribution: SOCS",hint:"shape, outliers, center, spread",when:"“Describe the distribution”.",rule:"<b>S</b>hape (symmetric, skewed left/right, unimodal/bimodal). <b>O</b>utliers: below Q1 − 1.5·IQR or above Q3 + 1.5·IQR. <b>C</b>enter. <b>S</b>pread. Always in context.",
  ex:[T("Q1 = 20, Q3 = 30",["IQR = 10. Fences: 20 − 15 = 5 and 30 + 15 = 45","Values below 5 or above 45 are <b>outliers</b>"]),T("A sentence",["“The distribution of commute times is skewed right with a median of 18 minutes and IQR of 12 minutes; 75 min is a possible outlier.”"])]},
 u1res:{grp:"Center & spread",c:BLU,name:"Which Center & Spread?",hint:"resistant or not",when:"Choosing summary statistics.",rule:"Skewed or outliers → <b>median and IQR</b> (resistant). Roughly symmetric, no outliers → <b>mean and SD</b>. In a right-skewed distribution, mean &gt; median.",
  ex:[T("Incomes (strongly right-skewed)",["Use median and IQR"]),T("Mean 40, median 32",["Mean &gt; median → probably <b>skewed right</b>"])]},
 u1emp:{grp:"Position & Normal",c:BLU,name:"Empirical Rule",hint:"68 · 95 · 99.7",when:"Approximately Normal data and whole-number z-scores.",rule:"About 68% of values are within 1 SD of the mean, 95% within 2 SD, 99.7% within 3 SD.",
  ex:[T("N(100, 15): what percent is between 70 and 130?",["± 2 SD → about <b>95%</b>"]),T("N(100, 15): percent above 115?",["(100 − 68)/2 = <b>16%</b>"])]},
 u1ctx:{grp:"Last step",c:GRN,name:"Compare in Context",hint:"use comparison words",when:"Comparing two or more distributions.",rule:"Compare all four SOCS features with comparison words (“greater than”, “similar to”), and name the variable and the groups.",
  ex:[T("Two classes' scores",["“Class A's median (82) is greater than Class B's (75), and Class A's scores vary less (IQR 8 vs. 15). Both are roughly symmetric with no outliers.”"]),T("Common mistake",["Listing the numbers without comparing them"])]},
 u2type:{grp:"Step 1",c:NAVY,name:"What Types of Variables?",hint:"categorical or quantitative pair",when:"Before choosing a display.",rule:"Two categorical → two-way table and segmented bar chart. Two quantitative → scatterplot, correlation and regression.",
  ex:[T("Grade level and whether they have a job",["Two categorical → two-way table"]),T("Hours of sleep and GPA",["Two quantitative → scatterplot"])]},
 u2tw:{grp:"Two categorical",c:GRN,name:"Two-Way Tables",hint:"marginal & conditional",when:"Two categorical variables.",rule:"Marginal relative frequency: row or column total ÷ grand total. Conditional: cell ÷ its row (or column) total. If the conditional distributions differ, there is an association.",
  ex:[T("Of 60 juniors, 24 have jobs; of 40 seniors, 24 have jobs",["Conditional: 40% vs. 60% → an <b>association</b> between grade and having a job"]),T("Display",["Segmented (stacked) bar chart of the conditional percents"])]},
 u2sc:{grp:"Two quantitative",c:GRN,name:"Describe a Scatterplot: DUFS",hint:"direction, unusual, form, strength",when:"“Describe the relationship”.",rule:"<b>D</b>irection (positive/negative), <b>U</b>nusual features (outliers, clusters), <b>F</b>orm (linear/curved), <b>S</b>trength (weak/moderate/strong). In context.",
  ex:[T("A sentence",["“There is a strong, positive, linear relationship between hours studied and exam score, with no unusual points.”"]),T("Strength from r",["|r| close to 1 → strong; close to 0 → weak"])]},
 u2r:{grp:"Two quantitative",c:GRN,name:"Interpret r, r², s, Slope",hint:"the four interpretations",when:"Any regression output.",rule:"<b>r</b>: strength and direction of the linear relationship. <b>r²</b>: % of the variation in y explained by the linear model with x. <b>s</b>: typical prediction error. <b>Slope</b>: predicted change in y per 1-unit increase in x.",
  ex:[T("r² = 0.64",["64% of the variation in score is explained by the linear model using hours studied"]),T("s = 4.2",["Predictions are typically off by about 4.2 points"])]},
 u2tr:{grp:"Not linear?",c:GRN,name:"Curved? Transform",hint:"curved residuals → transform",when:"The scatterplot or residual plot is curved.",rule:"A residual plot with a curved pattern means a linear model is not appropriate. Try log(y), log(x), or a power, and pick the model whose residual plot shows no pattern.",
  ex:[T("Residual plot is U-shaped",["Linear model is <b>not</b> appropriate"]),T("Exponential growth data",["Use log(y) vs. x; the transformed data look linear"])]},
 u2inf:{grp:"Unusual points",c:GRN,name:"Outliers, Leverage, Influence",hint:"which points change the line",when:"A point is far from the others.",rule:"<b>Outlier</b>: large residual. <b>High leverage</b>: unusual x-value. <b>Influential</b>: removing it changes the slope, intercept or r a lot.",
  ex:[T("A point far to the right, on the line",["High leverage, not influential, increases r"]),T("A point far right, far below the line",["Influential: removing it changes the slope a lot"])]},
 u4cond:{grp:"Events",c:RED,name:"Conditional & Tree Diagrams",hint:"multiply along branches",when:"Multi-stage events, or “given that”.",rule:"Multiply along a branch for “and”. Add branches for “or”. P(A | B) = P(A and B)/P(B): divide by the branches that satisfy the condition.",
  ex:[T("2% have a disease; the test catches 95% and gives 10% false positives. P(disease | positive)?",["P(+) = 0.02(0.95) + 0.98(0.10) = 0.117","0.019/0.117 ≈ <b>0.162</b>"]),T("Without replacement",["Second-stage probabilities change after the first draw"])]},
 u4ind:{grp:"Events",c:RED,name:"Independent vs. Mutually Exclusive",hint:"different ideas",when:"Checking how two events relate.",rule:"<b>Independent</b>: P(A | B) = P(A), or P(A and B) = P(A)P(B). <b>Mutually exclusive</b>: P(A and B) = 0. Mutually exclusive events with positive probabilities are never independent.",
  ex:[T("P(A) = 0.3, P(B) = 0.5, P(A and B) = 0.15",["0.3 × 0.5 = 0.15 → <b>independent</b>"]),T("Rolling a 2 and rolling a 5 on one roll",["Mutually exclusive, not independent"])]},
 u5what:{grp:"Step 1",c:NAVY,name:"Which Statistic?",hint:"p̂, x̄ or a difference",when:"Before finding a sampling distribution.",rule:"Proportion of successes → p̂. Average → x̄. Two groups → p̂₁ − p̂₂ or x̄₁ − x̄₂. Then find its center, spread and shape.",
  ex:[T("“The proportion of the 50 chips that are defective”",["p̂"]),T("“The mean weight of 36 bags”",["x̄"])]},
 u5dp:{grp:"Difference of proportions",c:ORG,name:"Distribution of p̂₁ − p̂₂",hint:"variances add",when:"Comparing two independent sample proportions.",rule:"Mean p₁ − p₂. SD "+rt("p₁(1 − p₁)/n₁ + p₂(1 − p₂)/n₂")+". Normal if all four large counts ≥ 10.",
  ex:[T("p₁ = 0.5, n₁ = 100; p₂ = 0.4, n₂ = 100",["Mean 0.1; SD √(0.0025 + 0.0024) ≈ <b>0.070</b>"]),T("P(p̂₁ − p̂₂ &lt; 0)?",["z = (0 − 0.1)/0.07 ≈ −1.43 → ≈ <b>0.076</b>"])]},
 u5dm:{grp:"Difference of means",c:ORG,name:"Distribution of x̄₁ − x̄₂",hint:"variances add",when:"Comparing two independent sample means.",rule:"Mean μ₁ − μ₂. SD "+rt("σ₁²/n₁ + σ₂²/n₂")+". Normal if both populations are Normal or both n ≥ 30.",
  ex:[T("σ₁ = 6, n₁ = 36; σ₂ = 8, n₂ = 64",["SD √(1 + 1) ≈ <b>1.41</b>"]),T("Common mistake",["Subtracting the SDs instead of adding the variances"])]},
 u5bias:{grp:"Bias & variability",c:ORG,name:"Bias and Variability",hint:"center vs. spread",when:"Judging an estimator.",rule:"<b>Unbiased</b>: the sampling distribution is centered at the parameter (p̂ and x̄ are unbiased). <b>Less variability</b>: larger samples. Quadrupling n halves the SD.",
  ex:[T("n goes from 100 to 400",["SD of p̂ is cut in half"]),T("A sample median of a skewed population",["Can be biased for the mean"])]},
 u5norm:{grp:"Last step",c:GRN,name:"Check Normal, Then Use z",hint:"z = (statistic − mean)/SD",when:"Finding a probability about a statistic.",rule:"Check the Normal condition (large counts or CLT), compute the SD of the statistic, then z = (value − mean)/SD and normalcdf. Interpret in context.",
  ex:[T("p = 0.4, n = 150, P(p̂ &gt; 0.46)",["Large counts 60 and 90 ✓, SD 0.04, z = 1.5 → ≈ <b>0.067</b>"]),T("Skewed population, n = 10",["Not Normal: can't use z"])]},
 u6err:{grp:"Errors & power",c:TEAL,name:"Type I, Type II & Power",hint:"which mistake, which consequence",when:"“Describe a Type I error” or “how to increase power”.",rule:"<b>Type I</b>: reject H₀ when H₀ is true (probability α). <b>Type II</b>: fail to reject H₀ when Hₐ is true. <b>Power</b> = P(reject H₀ | Hₐ true) = 1 − P(Type II). Increase power: larger n, larger α, parameter farther from p₀.",
  ex:[T("H₀: p = 0.9 (on time), Hₐ: p &lt; 0.9",["Type I: conclude deliveries are late less often than claimed when really 90% are on time"]),T("How to increase power without changing α",["Take a <b>larger sample</b>"])]},
 u6ci:{grp:"Interval facts",c:TEAL,name:"Confidence Level & Sample Size",hint:"ME = z*·SE",when:"Interpreting the level, or choosing n.",rule:"95% confidence: in many samples, about 95% of the intervals capture p. Margin of error ME = z*·SE. To get ME ≤ m: n ≥ (z*/m)²·p̂(1 − p̂), using p̂ = 0.5 if unknown.",
  ex:[T("ME ≤ 0.03 at 95%",["n ≥ (1.96/0.03)² · 0.25 = 1067.1 → <b>n = 1068</b>"]),T("Wrong interpretation",["“95% chance p is in this interval” ✗. The interval either captures p or doesn't."])]},
 u7zt:{grp:"z or t?",c:MAG,name:"z or t?",hint:"is σ known?",when:"Inference for means.",rule:"Use <b>t</b> whenever σ is estimated by s (almost always). For proportions, always use <b>z</b>. t-distributions have heavier tails and approach z as df grows.",
  ex:[T("σ unknown, s = 4.1",["t procedure, df = n − 1"]),T("Proportion of voters",["z procedure"])]},
 u8cat:{grp:"Step 1",c:NAVY,name:"Is It a χ² Situation?",hint:"counts in categories",when:"Categorical data with more than two categories, or a two-way table.",rule:"χ² tests use <b>counts</b>, never percents. One variable vs. a claim → GOF. A two-way table → homogeneity or independence, decided by how the data were collected.",
  ex:[T("Observed counts of 4 colors vs. claimed %",["χ² GOF"]),T("A 3 × 2 table of counts",["Homogeneity or independence: check the design"])]},
 u8exp:{grp:"Expected counts",c:TEAL,name:"Expected Counts, df, Components",hint:"E = row·col/total",when:"Computing χ² by hand or explaining the biggest contribution.",rule:"GOF: E = n·p<sub>claimed</sub>, df = k − 1. Two-way: E = row·col/total, df = (r − 1)(c − 1). The largest (O − E)²/E component shows where the data differ most from H₀.",
  ex:[T("Row 60, column 50, total 200",["E = 60·50/200 = <b>15</b>"]),T("3 × 4 table",["df = 2 · 3 = <b>6</b>"])]},
 u9out:{grp:"Step 1",c:NAVY,name:"Read Computer Output",hint:"b, SE_b, s, r², t, p",when:"Every slope problem.",rule:"In the row for x: <b>Coef</b> = b, <b>SE Coef</b> = SE<sub>b</sub>, <b>T</b> = t statistic, <b>P</b> = two-sided p-value. Also read s and R-sq. The Constant row is the intercept.",
  ex:[T("x row: Coef 2.4, SE Coef 0.8, T 3.0, P 0.008",["b = 2.4, SE<sub>b</sub> = 0.8, t = 3.0, two-sided p = 0.008"]),T("One-sided Hₐ: β &gt; 0",["Halve the printed p-value (if b &gt; 0): 0.004"])]},
 u9ci:{grp:"Interval",c:MAG,name:"t-Interval for the Slope",hint:"b ± t*·SE_b",when:"“Estimate the slope”, “how much does y change per x”.",rule:"b ± t*·SE<sub>b</sub> with df = n − 2. If the interval contains 0, a slope of 0 (no linear relationship) is plausible.",
  ex:[T("b = 2.4, SE<sub>b</sub> = 0.8, n = 20, 95%",["t* = 2.101 (df 18): 2.4 ± 1.68 → <b>(0.72, 4.08)</b>"]),T("Interval (−0.5, 1.2)",["Contains 0: no convincing evidence of a linear relationship"])]},
 u9liner:{grp:"Conditions",c:MAG,name:"LINER Conditions",hint:"check with plots",when:"Before slope inference.",rule:"<b>L</b>inear: residual plot has no pattern. <b>I</b>ndependent: 10% condition. <b>N</b>ormal: histogram/dotplot of residuals has no strong skew. <b>E</b>qual SD: residual spread is about the same for all x. <b>R</b>andom sample or assignment.",
  ex:[T("Residual plot fans out",["Equal SD condition fails"]),T("Residual plot is curved",["Linear condition fails"])]}
};
const UM=Object.assign({},IM,FM,DM,NM);
const UF={
 "unit-1":{M:UM,label:"Unit 1 flowchart",lead:"Which display, which summary, which calculation? Start with the type of variable. Tap any node for the rule and examples.",start:"One-variable data",top:["u1type"],q:"What do you need?",
   cols:[["Display","",BLU,["u1cat","u1qd"]],["Describe","",BLU,["u1soc"]],["Center & spread","",BLU,["u1res"]],["Position & Normal","",BLU,["z","u1emp"]],["Transform","",BLU,["tr"]]],end:"u1ctx"},
 "unit-2":{M:UM,label:"Unit 2 flowchart",lead:"Which display and analysis for two variables? Start with the types of variables. Tap any node for the rule and examples.",start:"Two-variable data",top:["u2type"],q:"What kind of variables?",
   cols:[["Two categorical","",GRN,["u2tw"]],["Two quantitative","",GRN,["u2sc","lsrl","u2r","res"]],["Not linear?","",GRN,["u2tr"]],["Unusual points","",GRN,["u2inf"]]],end:"inter"},
 "unit-4":{M:UM,label:"Unit 4 flowchart",lead:"Which probability rule or distribution? Name the event or random variable first. Tap any node for the rule and examples.",start:"Probability question",top:["ctx"],q:"What are you finding?",
   cols:[["Events","",RED,["prob","u4cond","u4ind"]],["Random variable","",PURP,["rv","comb"]],["Successes in n trials","",PURP,["bin"]],["Trials until a success","",PURP,["geo"]]],end:"inter"},
 "unit-5":{M:UM,label:"Unit 5 flowchart",lead:"Which sampling distribution? Decide which statistic you have, then use its mean, SD and shape. Tap any node for the formulas and examples.",start:"Sampling distribution",top:["u5what"],q:"Which statistic?",
   cols:[["p̂","",ORG,["phat"]],["p̂₁ − p̂₂","",ORG,["u5dp"]],["x̄","",ORG,["xbar"]],["x̄₁ − x̄₂","",ORG,["u5dm"]],["Bias & variability","",ORG,["u5bias"]]],end:"u5norm"},
 "unit-6":{M:UM,label:"Unit 6 flowchart",lead:"Inference for proportions: interval or test, one or two groups, and what errors mean. Tap any node for the conditions, formulas and examples.",start:"Proportions",top:["est"],q:"What does the question need?",
   cols:[["One proportion","",TEAL,["p1"]],["Two proportions","",TEAL,["p2"]],["Interval facts","",TEAL,["u6ci"]],["Errors & power","",TEAL,["u6err"]]],end:"chk"},
 "unit-7":{M:UM,label:"Unit 7 flowchart",lead:"Inference for means: the design decides the procedure. Tap any node for the conditions, formulas and examples.",start:"Means",top:["est"],q:"How was the data collected?",
   cols:[["One sample","",MAG,["m1"]],["Paired data","",MAG,["mp"]],["Two independent groups","",MAG,["m2"]],["z or t?","",MAG,["u7zt"]]],end:"chk"},
 "unit-8":{M:UM,label:"Unit 8 flowchart",lead:"Chi-square: the design decides between goodness of fit, homogeneity and independence. Tap any node for the conditions, formulas and examples.",start:"Chi-square",top:["u8cat"],q:"How was the data collected?",
   cols:[["One variable vs. a claim","",TEAL,["gof"]],["Several samples","",TEAL,["hom"]],["One sample, two variables","",TEAL,["ind"]],["Expected counts & df","",TEAL,["u8exp"]]],end:"chk"},
 "unit-9":{M:UM,label:"Unit 9 flowchart",lead:"Inference for the slope: read the output, check LINER, then test or estimate. Tap any node for details and examples.",start:"Slope",top:["u9out"],q:"Interval or test?",
   cols:[["Test","",MAG,["sl"]],["Interval","",MAG,["u9ci"]],["Conditions","",MAG,["u9liner"]]],end:"chk"}
};

const PANELS={
 inf:()=>flowHTML("inf",INF), for:()=>flowHTML("for",FOR), des:()=>flowHTML("des",DES), tbl:()=>TBL,
 which:()=>boxHTML("ap","which"), calc:()=>boxHTML("ap","calc"), form:()=>boxHTML("ap","form"), design:()=>boxHTML("ap","design")};
const UNITP={"unit-1":["uf","form"],"unit-2":["uf","form"],"unit-3":["des","design"],"unit-4":["uf","form"],"unit-5":["uf","form"],"unit-6":["uf","tbl","which","calc"],"unit-7":["uf","tbl","which","calc"],"unit-8":["uf","tbl","which","calc"],"unit-9":["uf","tbl","which","calc"]};
const SUBT={tbl:"Conditions & formulas at a glance",which:"Practice: which procedure?",calc:"Practice: calculate the statistic",form:"Practice: formulas (new numbers every time)",design:"Practice: which design?"};
const join=(ks,id)=>ks.map(k=>(SUBT[k]?`<h3 class="apf-sub">${SUBT[k]}</h3>`:"")+(k==="uf"?flowHTML("uf-"+id,UF[id]):PANELS[k]())).join("");
/* ---- node map for each unit's sections ---- */
const KC={finder:"#0f7c7a",posters:"#1f5fa8",gallery:"#6b3fa0",solved:"#2a7a46",quick:"#b8650f",sets:"#b03a2e",frq:"#8a1c1c",res:"#5f6670"};
const KD={finder:"which method, when",posters:"posters to open full size",gallery:"one poster per distribution",solved:"step-by-step examples",quick:"fresh questions",sets:"worked practice sets",frq:"released exam questions",res:"courses, books, tools"};
function apMaps(root){ const secs=[...root.querySelectorAll("section.unit")].filter(s=>s.querySelector(":scope > .ubar")&&!s.querySelector(":scope > .amap"));
  secs.forEach(sec=>{ const bar=sec.querySelector(":scope > .ubar"), btns=[...bar.querySelectorAll(".ubtn")]; if(btns.length<2) return;
    const N=btns.length, pos=btns.map((_,i)=>{ const a=-Math.PI/2+2*Math.PI*i/N; return [50+38*Math.cos(a),50+36*Math.sin(a)]; });
    const h2=sec.querySelector("h2"), name=(h2?h2.textContent:"").replace(/^Unit \d+:\s*/,"").replace(/:.*$/,"");
    const items=btns.map((b,i)=>{ const n=b.querySelector(".n"), t=b.cloneNode(true); t.querySelectorAll(".n").forEach(x=>x.remove()); return {b,k:b.dataset.p,t:t.textContent.trim(),n:n?n.textContent:"",c:KC[b.dataset.p]||"#1d2b44",d:KD[b.dataset.p]||""}; });
    const w=document.createElement("div"); w.className="amap"+(N>5?" big":"");
    w.innerHTML=`<div class="am-stage"><svg class="am-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${pos.map(([x,y])=>`<line x1="50" y1="50" x2="${x}" y2="${y}"/>`).join("")}${pos.slice(0,-1).map(([x,y],i)=>`<line class="pth" x1="${x}" y1="${y}" x2="${pos[i+1][0]}" y2="${pos[i+1][1]}"/>`).join("")}</svg>
      <div class="am-hub"><b>${name}</b><span>Tap a node to open it</span></div>
      ${items.map((it,i)=>`<button type="button" class="am-node" data-ak="${it.k}" style="left:${pos[i][0]}%;top:${pos[i][1]}%;--c:${it.c}"><span class="am-n">${i+1}</span><span class="am-t">${it.t}</span><span class="am-d">${it.d}${it.n?` · ${it.n}`:""}</span></button>`).join("")}</div>`;
    bar.before(w); bar.classList.add("am-hidden");
    const sync=()=>w.querySelectorAll(".am-node").forEach(n=>n.classList.toggle("on",(btns.find(b=>b.dataset.p===n.dataset.ak)||{}).getAttribute?.("aria-expanded")==="true"));
    w.querySelectorAll(".am-node").forEach(n=>n.onclick=()=>{ const b=btns.find(x=>x.dataset.p===n.dataset.ak); if(b.getAttribute("aria-expanded")!=="true") b.click(); sync(); const pn=sec.querySelector(`.upanel[data-p="${n.dataset.ak}"]`); if(pn) setTimeout(()=>pn.scrollIntoView({behavior:"smooth",block:"start"}),40); });
    if(secs.length===1&&!btns.some(b=>b.getAttribute("aria-expanded")==="true")) btns[0].click();
    sync(); }); }
const MAPCSS=`.am-hidden{display:none!important}
@media (max-width:700px){.mf-n b{-webkit-hyphens:auto;hyphens:auto;overflow-wrap:normal}}
.amap{margin:6px 0 16px}
.am-stage{position:relative;height:460px;border:1.5px solid #d9e0ea;border-radius:18px;background:#fbfcfe radial-gradient(#dde4ee 1.1px,transparent 1.3px) 0 0/22px 22px}
.amap.big .am-stage{height:540px}
.am-lines{position:absolute;inset:0;width:100%;height:100%}
.am-lines line{stroke:#d3dbe6;stroke-width:1.2;vector-effect:non-scaling-stroke}
.am-lines line.pth{stroke:#8ea3c0;stroke-width:2.2;stroke-dasharray:2 7;stroke-linecap:round;animation:amflow 1.6s linear infinite}
@keyframes amflow{to{stroke-dashoffset:-18}}
@media (prefers-reduced-motion:reduce){.am-lines line.pth{animation:none}}
.am-hub{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:180px;height:180px;border-radius:50%;background:var(--c,#1d2b44);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:16px;box-shadow:0 0 0 12px color-mix(in srgb,var(--c,#1d2b44) 10%,transparent),0 14px 30px rgba(15,30,60,.25)}
.am-hub b{font-size:20px;line-height:1.15}.am-hub span{font-size:13px;font-style:italic;opacity:.85;margin-top:6px}
.am-node{position:absolute;transform:translate(-50%,-50%);width:190px;border:1.5px solid #dbe2ec;border-top:5px solid var(--c);border-radius:14px;background:#fff;padding:9px 11px 8px;text-align:left;cursor:pointer;font-family:'EB Garamond',Georgia,serif;box-shadow:0 6px 18px rgba(15,30,60,.08);display:grid;grid-template-columns:auto 1fr;column-gap:8px;align-items:center;transition:transform .15s,box-shadow .15s}
.am-node:hover{transform:translate(-50%,-52%) scale(1.04);box-shadow:0 12px 26px rgba(15,30,60,.16);z-index:2}
.am-node.on{background:var(--c);border-color:var(--c);box-shadow:0 0 0 5px color-mix(in srgb,var(--c) 22%,transparent)}
.am-n{grid-row:span 2;width:30px;height:30px;border-radius:50%;background:var(--c);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px}
.am-node.on .am-n{background:#fff;color:var(--c)}
.am-t{font-weight:700;font-size:16.5px;line-height:1.15;color:var(--c)}.am-node.on .am-t{color:#fff}
.am-d{font-size:13px;color:#666;line-height:1.2}.am-node.on .am-d{color:#eef}
@media (max-width:820px){.am-stage{height:400px}.amap.big .am-stage{height:560px}.amap.big .am-node{width:80px}.amap.big .am-t{font-size:11px}
 .am-hub{width:108px;height:108px;padding:8px}.am-hub b{font-size:14px}.am-hub span{display:none}
 .am-node{width:92px;padding:5px 4px 6px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:3px;border-top-width:4px;border-radius:12px}
 .am-node:hover{transform:translate(-50%,-50%)}
 .am-n{width:26px;height:26px;font-size:13px}.am-t{font-size:12px;-webkit-hyphens:auto;hyphens:auto}.am-d{display:none}}`;
const st2=document.createElement("style"); st2.textContent=MAPCSS; document.head.appendChild(st2);
window.APF={
 unitPanel:id=>UNITP[id]?{k:"finder",label:id==="unit-3"?"Which design?":"Method flowchart",n:"",body:join(UNITP[id],id)}:null,
 finderPanels:()=>[{k:"inf",label:"Which test?",n:"",body:join(["inf"])},{k:"tbl",label:"Conditions & formulas",n:"",body:TBL},{k:"for",label:"Which formula?",n:"",body:join(["for"])},{k:"des",label:"Which design?",n:"",body:join(["des"])},
   {k:"pwhich",label:"Practice: which test?",n:"",body:join(["which"])},{k:"pcalc",label:"Practice: statistics",n:"",body:join(["calc"])},{k:"pform",label:"Practice: formulas",n:"",body:join(["form"])},{k:"pdes",label:"Practice: designs",n:"",body:join(["design"])}],
 bind(root){ bindFlow(root); bind(root); },
 _test:{G,gen,options,parseAns}};
})();

/* ---- node course map for the main folders ---- */
(function(){
let last=null; const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const GC={"Start here":"#0f7c7a","Units":"#1d2b44","Inference":"#3d4fb5","Practice & resources":"#8a1c1c","Beyond AP":"#5f6670"};
function mapHTML(){ const {all,cur,ub,groups,cols}=last, by=Object.fromEntries(all.map(t=>[t.id,t]));
  return `<div class="cm">${groups.map(([g,ids])=>`<div class="cm-s" style="--c:${GC[g]||"#111"}"><div class="cm-h">${esc(g)}</div>${ids.filter(id=>by[id]).map(id=>{ const t=by[id], u=ub[id]; return `<i class="cm-v" aria-hidden="true"></i><button type="button" class="cm-n${id===cur?" on":""}" data-apcm="${id}" style="--k:${cols[id]||GC[g]||"#111"}">${u&&/^Chapter/.test(u.chapter)?`<span class="cm-c">${esc(u.chapter.replace("Chapter","Unit"))}</span>`:""}<b>${esc(id==="all"?"All units":(u&&/^unit-/.test(id)?u.name.replace(/^Unit \d+:\s*/,""):t.short))}</b>${t.count?`<span class="cm-k">${t.count}</span>`:""}</button>`; }).join("")}</div>`).join("")}</div>`; }
function go(id){ if(id==="all"){ if(location.hash&&location.hash!=="#") location.hash=""; else if(window.route) window.route(); } else location.hash=id; }
function close(){ const o=document.getElementById("apcmo"); if(o){ o.classList.remove("open"); document.body.style.overflow=""; } }
function render(tabs,all,cur,ub,groups,cols){ last={all,cur,ub,groups,cols};
  const seq=groups.flatMap(g=>g[1]).filter(id=>id!=="all"), i=seq.indexOf(cur), pv=seq[i-1], nx=seq[i+1], u=ub[cur];
  tabs.innerHTML=`<div class="cm-bar"><button type="button" class="cm-open" aria-haspopup="dialog"><span aria-hidden="true">☰</span> Course map</button><button type="button" class="cm-home${cur==="all"?" on":""}" data-apcm="all">All units</button><span class="cm-cur">${cur==="all"?"All units":esc(u?u.name:"")}</span>${cur!=="all"?`<span class="cm-pn">${pv?`<button type="button" data-apcm="${pv}" aria-label="Previous">‹</button>`:""}${nx?`<button type="button" data-apcm="${nx}" aria-label="Next">›</button>`:""}</span>`:""}</div>`;
  let o=document.getElementById("apcmo"); if(!o){ o=document.createElement("div"); o.id="apcmo"; o.setAttribute("role","dialog"); o.setAttribute("aria-modal","true"); o.setAttribute("aria-label","Course map"); document.body.appendChild(o);
    o.addEventListener("click",e=>{ if(e.target===o||e.target.closest(".cm-x")) close(); const b=e.target.closest("[data-apcm]"); if(b){ go(b.dataset.apcm); close(); } });
    document.addEventListener("keydown",e=>{ if(e.key==="Escape") close(); });
    document.addEventListener("click",e=>{ const b=e.target.closest(".cm-home-sec [data-apcm]"); if(b) go(b.dataset.apcm); }); }
  o.innerHTML=`<div class="cm-p"><div class="cm-pt"><b>Course map</b><button type="button" class="cm-x">Close ✕</button></div>${mapHTML()}</div>`;
  tabs.querySelector(".cm-open").onclick=()=>{ o.classList.add("open"); document.body.style.overflow="hidden"; };
  tabs.querySelectorAll("[data-apcm]").forEach(b=>b.onclick=()=>go(b.dataset.apcm)); }
function home(){ return last?`<section class="unit cm-home-sec"><div class="chapter">Course map</div><h2>Choose a folder</h2><p class="sub">Every folder of the book, grouped. The units run from top to bottom in course order.</p>${mapHTML()}</section>`:""; }
const css=`nav .wrap{display:block!important;padding:8px 16px!important}
.cm-bar{display:flex;align-items:center;gap:10px;max-width:1180px;margin:0 auto}
.cm-bar button{border:1.5px solid #111;background:#fff;color:#111;padding:5px 14px;font:600 16px 'EB Garamond',Georgia,serif;cursor:pointer;border-radius:999px}
.cm-open{background:#111!important;color:#fff!important}.cm-home.on{background:#111;color:#fff}
.cm-cur{font-weight:700;font-size:18px;flex:1;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cm-pn{display:flex;gap:6px}.cm-pn button{width:38px;height:38px;border-radius:50%;padding:0;font-size:22px;line-height:1}
.cm{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr));gap:16px 14px;align-items:start}
.cm-s{display:flex;flex-direction:column;align-items:stretch;background:#fbfcfe radial-gradient(#dde4ee 1px,transparent 1.2px) 0 0/18px 18px;border:1.5px solid #d9e0ea;border-radius:16px;padding:12px 12px 14px}
.cm-h{align-self:center;background:var(--c);color:#fff;border-radius:999px;padding:4px 16px;font-weight:700;font-size:17px;text-align:center}
.cm-v{display:block;width:2px;height:14px;background:color-mix(in srgb,var(--c) 45%,#c8d2df);align-self:center}
.cm-n{border:1.5px solid #dbe2ec;border-left:6px solid var(--k);border-radius:12px;background:#fff;padding:7px 10px;text-align:left;cursor:pointer;display:grid;grid-template-columns:1fr auto;column-gap:8px;align-items:center;font-family:'EB Garamond',Georgia,serif;box-shadow:0 3px 10px rgba(15,30,60,.07);transition:transform .12s,box-shadow .12s}
.cm-n:hover{transform:translateX(3px);box-shadow:0 6px 16px rgba(15,30,60,.14)}
.cm-n b{grid-column:1;font-size:16px;line-height:1.15;color:#111}
.cm-c{grid-column:1;font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--k)}
.cm-k{grid-column:2;grid-row:1 / span 2;font-size:12.5px;background:color-mix(in srgb,var(--k) 12%,#fff);color:var(--k);border-radius:999px;padding:1px 8px;font-weight:600}
.cm-n.on{background:var(--k);border-color:var(--k)}.cm-n.on b,.cm-n.on .cm-c{color:#fff}.cm-n.on .cm-k{background:#fff}
#apcmo{position:fixed;inset:0;z-index:40;background:rgba(17,17,17,.45);display:none;align-items:flex-start;justify-content:center;padding:4vh 12px;overflow:auto}
#apcmo.open{display:flex}
.cm-p{background:#fff;max-width:1180px;width:100%;border-radius:18px;padding:14px 16px 18px;box-shadow:0 20px 50px rgba(0,0,0,.3)}
.cm-pt{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.cm-pt b{font-size:24px}
@media (max-width:640px){.cm-bar button{padding:4px 10px;font-size:15px}.cm-home{display:none}.cm-cur{font-size:15px}.cm{grid-template-columns:1fr 1fr;gap:10px}.cm-s{padding:8px 6px 10px}.cm-n{padding:5px 7px}.cm-n b{font-size:13.5px}.cm-k{display:none}.cm-h{font-size:13.5px;padding:3px 10px}}`;
const st=document.createElement("style"); st.textContent=css; document.head.appendChild(st);
window.APNAV={render,home};
})();
