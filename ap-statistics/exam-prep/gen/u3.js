/* Unit 3 templates: Inference for Categorical Data: Proportions */
(function(){
const {mc,S,f}=ZB, G=window.ZG, add=fn=>mc[3].push(fn);

/* 1. Sampling distribution of p-hat */
add(R=>{ const c=R.pick([["In a large shipment of light bulbs","are defective","bulbs"],["Among all customers of a bank","have a credit card from the bank","customers"],["In a large city","are left-handed","residents"]]);
 const skew=R.chance(0.5); const p=skew?R.pick([0.03,0.04,0.05]):R.pick([0.2,0.3,0.12]); const n=skew?R.pick([80,100,120]):R.pick([150,200,250]); const sd=Math.sqrt(p*(1-p)/n);
 return {calc:"help",q:`${c[0]}, ${p*100}% ${c[1]}. Random samples of ${n} ${c[2]} are selected and the sample proportion p̂ is recorded for each. Which best describes the sampling distribution of p̂?`,
 ch:[skew?`Skewed to the right, with mean ${p} and standard deviation ${f(sd,4)}, because np = ${f(n*p,1)} is less than 10`:`Approximately normal, with mean ${p} and standard deviation ${f(sd,4)}, because np = ${f(n*p,0)} and n(1 − p) = ${f(n*(1-p),0)} are both at least 10`,
  skew?`Approximately normal, with mean ${p} and standard deviation ${f(sd,4)}`:`Skewed to the right, with mean ${p} and standard deviation ${f(sd,4)}`,`Approximately normal, with mean ${f(n*p,1)} and standard deviation ${f(Math.sqrt(n*p*(1-p)),2)}`,`Approximately normal, with mean ${p} and standard deviation ${f(Math.sqrt(p*(1-p)),3)}`],
 ex:`The mean of p̂ is p = ${p}, and its standard deviation is √[p(1 − p)/n] = √[${p}(${f(1-p,2)})/${n}] ≈ ${f(sd,4)}. ${skew?`np = ${f(n*p,1)} < 10, so the large counts condition fails; p̂ can't go below 0 and its center is close to 0, so the distribution is skewed right.`:`Both np and n(1 − p) are at least 10, so the shape is approximately normal.`} A mean of ${f(n*p,1)} describes the COUNT, not the proportion.`}; });

/* 2. Interpreting the confidence level */
add(R=>{ const c=R.pick([["adults in a city who own a bicycle"],["students at a university who have a part-time job"],["registered voters in a state who support a new tax"]]); const lv=R.pick([90,95,99]); const lo=R.real(0.25,0.55,2), hi=+(lo+R.real(0.05,0.1,2)).toFixed(2);
 return {calc:"no",q:`A ${lv}% confidence interval for the proportion of all ${c[0]} is (${lo}, ${hi}). Which is the correct interpretation of the ${lv}% confidence LEVEL?`,
 ch:[`If many random samples of the same size were taken and a ${lv}% interval computed from each, about ${lv}% of the intervals would capture the true proportion of all ${c[0]}.`,`There is a ${lv}% probability that the true proportion is between ${lo} and ${hi}.`,`${lv}% of all ${c[0]} are in the interval from ${lo} to ${hi}.`,`${lv}% of all sample proportions will be between ${lo} and ${hi}.`],
 ex:`The confidence level describes the long-run capture rate of the METHOD. Once a particular interval is computed, the parameter is either in it or not, so a probability statement about this interval is incorrect. The interval estimates a population proportion; it says nothing about where sample proportions fall.`}; });

/* 3. Using an interval to judge a claim */
add(R=>{ const has=R.chance(0.5); const lo=has?R.real(0.45,0.49,2):R.real(0.51,0.54,2), hi=+(lo+R.real(0.06,0.09,2)).toFixed(2);
 return {calc:"no",q:`A random sample of voters is used to construct a 95% confidence interval for the proportion of all voters in a district who support a ballot measure: (${lo}, ${hi}). A campaign manager says the interval shows that a majority of voters support the measure. Which response is correct?`,
 ch:[has?`The manager is not justified: values below 0.50 are plausible, so the interval does not give convincing evidence of a majority.`:`The manager is justified: every plausible value in the interval is above 0.50, so there is convincing evidence of a majority.`,
  has?`The manager is justified, because most of the interval is above 0.50.`:`The manager is not justified, because a confidence interval can never support a claim.`,`The manager is justified only if the sample proportion is exactly 0.50.`,has?`The interval proves that less than half of voters support the measure.`:`The manager is not justified, because 0.50 is a plausible value.`],
 ex:`An interval gives the plausible values of the parameter. ${has?`It contains values below and above 0.50, so both a majority and a minority are plausible: no convincing evidence either way.`:`The whole interval is above 0.50, so 0.50 and smaller values are not plausible: convincing evidence of a majority (at roughly the 5% significance level, two-sided).`} An interval never “proves” a claim.`}; });

/* 4. Margin of error vs n and confidence */
add(R=>{ const k=R.pick([4,9]), up=R.chance(0.5);
 return up?{calc:"no",q:`A researcher plans a 95% confidence interval for a population proportion. If she multiplies the sample size by ${k} and keeps the same confidence level, the margin of error will be approximately`,
 ch:[`1/${Math.sqrt(k)} as large`,`1/${k} as large`,`the same`,`${Math.sqrt(k)} times as large`],ex:`The margin of error is z*·√[p̂(1 − p̂)/n], proportional to 1/√n. Multiplying n by ${k} divides the margin of error by √${k} = ${Math.sqrt(k)}.`}
 :{calc:"no",q:"From the same random sample, a 90% and a 99% confidence interval are computed for a population proportion. Which statement is true?",ch:["The 99% interval is wider, because a larger critical value is needed for higher confidence.","The 90% interval is wider, because it is less precise.","Both intervals have the same width, because they come from the same sample.","The 99% interval is narrower, because it is more confident."],ex:"With the same p̂ and n, the margin of error is (critical value) × SE. z* = 2.576 for 99% versus 1.645 for 90%, so the 99% interval is wider: more confidence costs precision."}; });

/* 5. Conditions that fail */
add(R=>{ const c=R.pick([{s:`A small company with 1,000 employees selects a simple random sample of 150 employees; 54 say they would use an on-site gym.`,a:"The sample is more than 10% of the population, so the independence condition fails.",e:"150 is 15% of 1,000. Sampling this large a fraction without replacement makes the observations noticeably dependent. The sample is random, and 54 successes and 96 failures are both at least 10."},
 {s:`A random sample of 80 students at a large university is selected; 6 have been to a concert this month.`,a:"There are fewer than 10 successes, so the sampling distribution of p̂ may not be approximately normal.",e:"Only 6 successes (fewer than 10), so the large counts condition fails. The sample is random and 80 is far less than 10% of a large university."},
 {s:`A reporter surveys the first 120 people leaving a stadium after a game; 78 say ticket prices are too high.`,a:"The sample is not random, so the results can't be generalized with a confidence interval.",e:"A convenience sample of people leaving one game is not random, so the interval's confidence level can't be trusted. The counts (78 and 42) are both at least 10."}]);
 return {calc:"no",q:`${c.s} Which condition for constructing a one-sample z interval for a proportion is NOT met?`,ch:[c.a,"The population must be approximately normal.","The sample size must be at least 30.","The sample proportion must be close to 0.5."],ex:c.e+" Population normality, n ≥ 30 and p̂ near 0.5 are not conditions for this interval."}; });

/* 6. One-proportion z statistic */
add(R=>{ const p0=R.pick([0.5,0.4,0.25]), n=R.pick([200,400,500]); const x=Math.round(n*(p0+R.real(0.04,0.07,2))); const ph=x/n; const z=(ph-p0)/Math.sqrt(p0*(1-p0)/n), zw=(ph-p0)/Math.sqrt(ph*(1-ph)/n);
 const zAlt=f(z,2)===f(zw,2)?(x-n*p0)/Math.sqrt(n*p0):zw;
 return {calc:"rec",num:true,q:`A company claims that ${p0*100}% of its customers prefer its new package design. In a random sample of ${n} customers, ${x} preferred the new design. What is the test statistic for testing H₀: p = ${p0} against Hₐ: p &gt; ${p0}?`,
 ch:[`z = ${f(z,2)}`,`z = ${f(zAlt,2)}`,`z = ${f((ph-p0)/Math.sqrt(p0*(1-p0)),2)}`,`z = ${f(z/2,2)}`],
 ex:`p̂ = ${x}/${n} = ${f(ph,3)}. In a test, the standard deviation uses the NULL value p₀: z = (${f(ph,3)} − ${p0})/√[${p0}(${f(1-p0,2)})/${n}] ≈ ${f(z,2)}. Using p̂ in the standard error gives ${f(zw,2)}, which is incorrect for a test.`}; });

/* 7. p-value interpretation */
add(R=>{ const c=R.pick([["50% of customers prefer the new design","the proportion of all customers who prefer the new design",0.5,0.56,400],["30% of adults in the city walk to work","the proportion of all adults in the city who walk to work",0.3,0.36,300]]); const pv=R.pick(["0.008","0.021","0.037"]);
 return {calc:"no",q:`A test of H₀: p = ${c[2]} against Hₐ: p &gt; ${c[2]}, where p is ${c[1]}, gives p̂ = ${c[3]} from a random sample of ${c[4]} and a p-value of ${pv}. Which is the correct interpretation of the p-value?`,
 ch:[`Assuming the true proportion is ${c[2]}, there is a ${pv} probability of getting a sample proportion of ${c[3]} or greater by chance in a random sample of ${c[4]}.`,`There is a ${pv} probability that the true proportion is ${c[2]}.`,`There is a ${pv} probability that the true proportion is greater than ${c[2]}.`,`If the true proportion is greater than ${c[2]}, there is a ${pv} probability of getting a sample proportion of ${c[3]}.`],
 ex:`A p-value is computed assuming H₀ is true. It is the probability of a statistic as extreme as or more extreme than the one observed, in the direction of Hₐ. It is never the probability that a hypothesis is true.`}; });

/* 8. Type I/II in context */
add(R=>{ const c=R.pick([{s:"A factory tests H₀: p = 0.02 versus Hₐ: p > 0.02, where p is the proportion of today's items that are defective. If the test indicates p > 0.02, production is stopped.",t1:"Stopping production when the defect rate is actually 0.02",t2:"Not stopping production when the defect rate is actually greater than 0.02"},
 {s:"A city tests H₀: p = 0.60 versus Hₐ: p < 0.60, where p is the proportion of residents satisfied with trash pickup. If the test indicates p < 0.60, the city will change contractors.",t1:"Changing contractors when 60% of residents are actually satisfied",t2:"Not changing contractors when fewer than 60% of residents are actually satisfied"}]);
 const which=R.pick(["I","II"]);
 return {calc:"no",q:`${c.s} Which describes a Type ${which} error?`,ch:which==="I"?[c.t1,c.t2,"Concluding there is no problem when there is no problem","Rejecting H₀ when Hₐ is true"]:[c.t2,c.t1,"Rejecting H₀ when Hₐ is true","Failing to reject H₀ when H₀ is true"],
 ex:`A Type I error rejects H₀ when H₀ is true; a Type II error fails to reject H₀ when Hₐ is true. In context: Type I = ${c.t1.toLowerCase()}; Type II = ${c.t2.toLowerCase()}. Correct decisions are not errors.`}; });

/* 9. Error/power graph: name the shaded region */
add(R=>{ const p0=R.pick([0.3,0.4]), d=R.pick([0.08,0.1]), sd=0.032; const p1=+(p0+d).toFixed(2), crit=+(p0+1.645*sd).toFixed(4); const which=R.pick(["beta","power","alpha"]);
 const reg={beta:[p1,p0-0.12,crit,"#93c5fd","R",crit-0.02,0.12],power:[p1,crit,p1+0.12,"#86efac","R",crit+0.03,0.25],alpha:[p0,crit,p0+0.15,"#fca5a5","R",crit+0.012,0.06]}[which];
 const ans={beta:`The probability of a Type II error: failing to conclude p > ${p0} when actually p = ${p1}`,power:`The power of the test: the probability of correctly rejecting H₀ when p = ${p1}`,alpha:"The probability of a Type I error (α)"};
 return {calc:"no",q:`A test of H₀: p = ${p0} versus Hₐ: p &gt; ${p0} uses α = 0.05. The graph shows the sampling distribution of p̂ when H₀ is true (solid curve) and when, in fact, p = ${p1} (dashed curve). H₀ is rejected when p̂ is to the right of the vertical line.${G.errs({m0:p0,m1:p1,sd,crit,xmin:p0-0.12,xmax:p1+0.12,step:0.04,xlab:"Sample proportion p̂",lab0:"p = "+p0,lab1:"p = "+p1,regions:[reg]})}What does the shaded region labeled R represent?`,
 ch:[ans[which],...["beta","power","alpha"].filter(k=>k!==which).map(k=>ans[k]),"The p-value of the test"].slice(0,4),
 ex:`Under the dashed curve (true p = ${p1}): left of the line is a Type II error (fail to reject a false H₀), right of the line is the power. Under the solid curve (H₀ true): right of the line is α, the probability of a Type I error. Region R is ${which==="alpha"?"under the solid curve, right of the line":which==="beta"?"under the dashed curve, left of the line":"under the dashed curve, right of the line"}.`}; });

/* 10. Power changes */
add(R=>({calc:"no",q:"A researcher plans a significance test for a population proportion. Which change would increase the power of the test without increasing the probability of a Type I error?",
 ch:["Increasing the sample size","Decreasing α from 0.05 to 0.01","Decreasing the sample size","Changing from a one-sided to a two-sided alternative in the correct direction"],
 ex:"A larger sample reduces the variability of p̂, so the null and true sampling distributions overlap less: power increases while α is unchanged. Decreasing α makes rejection harder (less power), and a two-sided test splits α between the tails, lowering power for detecting a difference in one direction."}));

/* 11. Two-proportion confidence interval */
add(R=>{ const n1=R.pick([150,200,250]), n2=R.pick([180,240,300]); const p1=R.real(0.5,0.65,2), p2=+(p1-R.real(0.04,0.1,2)).toFixed(2);
 const se=Math.sqrt(p1*(1-p1)/n1+p2*(1-p2)/n2), d=p1-p2, z=1.96; const iv=(m)=>`(${f(d-m,3)}, ${f(d+m,3)})`;
 return {calc:"rec",q:`In a random sample of ${n1} adults from City A, ${Math.round(p1*100)}% use a library card at least once a year. In an independent random sample of ${n2} adults from City B, ${Math.round(p2*100)}% do. Which is a 95% confidence interval for p_A − p_B?`,
 ch:[iv(z*se),iv(se),iv(1.645*se),iv(z*Math.sqrt(p1*(1-p1)/n1))],
 ex:`SE = √[${p1}(${f(1-p1,2)})/${n1} + ${p2}(${f(1-p2,2)})/${n2}] ≈ ${f(se,4)}. Interval: ${f(d,2)} ± 1.96(${f(se,4)}) = ${iv(z*se)}. Using only one standard error, z* = 1.645 (90%), or only one sample's variability gives the other intervals.`}; });

/* 12. Defining parameters and hypotheses for two proportions */
add(R=>{ const c=R.pick([["a new reminder app","patients","take their medication every day"],["a redesigned web page","visitors","make a purchase"]]);
 return {calc:"no",q:`Researchers randomly assign ${c[1]} to use ${c[0]} or the current method and want to know whether ${c[0]} increases the proportion of ${c[1]} who ${c[2]}. Which hypotheses are correct, with p_N for ${c[0]} and p_C for the current method?`,
 ch:[`H₀: p_N = p_C, Hₐ: p_N > p_C, where p_N and p_C are the true proportions of ${c[1]} like these who would ${c[2]} with each method`,`H₀: p̂_N = p̂_C, Hₐ: p̂_N > p̂_C, where p̂_N and p̂_C are the sample proportions`,`H₀: p_N > p_C, Hₐ: p_N = p_C`,`H₀: p_N = p_C, Hₐ: p_N ≠ p_C, where p_N and p_C are the proportions in the samples`],
 ex:`Hypotheses are about PARAMETERS (true proportions), never about sample statistics. The null states no difference, and the alternative matches the research question (an increase, so >).`}; });

/* 13. Chi-square homogeneity/independence */
add(R=>{ const homo=R.chance(0.5); const a=[R.int(40,50),R.int(25,35)], b=[R.int(20,30),R.int(25,35)]; const r1=[a[0],a[1],100-a[0]-a[1]], r2=[b[0],b[1],100-b[0]-b[1]];
 const col=r1.map((v,i)=>v+r2[i]), E=col.map(c=>c/2); let chi=0; [r1,r2].forEach(r=>r.forEach((o,i)=>chi+=(o-E[i])**2/E[i])); const p=S.chi2sf(chi,2);
 const sig=p<0.05; const name=homo?"homogeneity":"independence";
 const setup=homo?"Independent random samples of 100 students were selected from each of two high schools and asked their preferred lunch option.":"A random sample of 200 students at a large high school was classified by school club membership (Club / No club) and preferred lunch option.";
 const rows=homo?["School 1","School 2"]:["Club","No club"];
 return {calc:"help",q:`${setup}<table class="tb"><tr><th></th><th>Hot lunch</th><th>Salad bar</th><th>Bring own</th></tr><tr><th>${rows[0]}</th>${r1.map(v=>`<td>${v}</td>`).join("")}</tr><tr><th>${rows[1]}</th>${r2.map(v=>`<td>${v}</td>`).join("")}</tr></table>A chi-square test gives χ² = ${f(chi,2)}. Which statement is correct?`,
 ch:[`This is a test of ${name} with df = 2; the p-value is about ${f(p,3)}, so there is ${sig?"":"not "}convincing evidence ${homo?"that the distributions of lunch preference differ between the schools":"of an association between club membership and lunch preference"} at α = 0.05.`,`This is a test of ${homo?"independence":"homogeneity"} with df = 6, and the p-value is about ${f(S.chi2sf(chi,6),3)}.`,`This is a goodness-of-fit test with df = 5.`,`This is a test of ${name} with df = 2, and a ${sig?"large":"small"} χ² shows that the distributions are identical.`],
 ex:`${homo?"Separate random samples from two populations compared on one categorical variable: homogeneity.":"One random sample classified on two categorical variables: independence."} df = (2 − 1)(3 − 1) = 2. With χ² = ${f(chi,2)} and df = 2, the p-value ≈ ${f(p,3)}${sig?" < 0.05":" > 0.05"}. A large χ² is evidence AGAINST H₀, and failing to reject never shows the distributions are identical.`}; });

/* 14. CI–test duality */
add(R=>{ const out=R.chance(0.6); const p0=0.3; const lo=out?R.real(0.31,0.33,3):R.real(0.26,0.29,3), hi=+(lo+R.real(0.07,0.09,3)).toFixed(3);
 return {calc:"no",q:`A 99% confidence interval for a population proportion p is (${lo}, ${hi}). Based on this interval, which statement about a two-sided test of H₀: p = ${p0} is correct?`,
 ch:out?["H₀ would be rejected at both α = 0.01 and α = 0.05.","H₀ would be rejected at α = 0.01 but not necessarily at α = 0.05.","H₀ would not be rejected at α = 0.01.","No conclusion can be made without the p-value."]:["H₀ would not be rejected at α = 0.01, but at α = 0.05 the decision can't be determined from this interval alone.","H₀ would be rejected at both α = 0.01 and α = 0.05.","H₀ would not be rejected at α = 0.05 either, because the 95% interval is wider.","H₀ would be rejected at α = 0.01."],
 ex:out?`${p0} is outside the 99% interval, so a two-sided test at α = 0.01 rejects H₀ (p-value < 0.01). A p-value below 0.01 is also below 0.05, so H₀ is rejected at α = 0.05 too.`:`${p0} is inside the 99% interval, so H₀ is not rejected at α = 0.01. The 95% interval is NARROWER and might exclude ${p0}, so the decision at α = 0.05 can't be determined from the 99% interval alone.`}; });

/* 15. Sample size for a margin of error */
add(R=>{ const me=R.pick([0.03,0.04,0.05]), lv=R.pick([[95,1.96],[99,2.576],[90,1.645]]); const n=Math.ceil((lv[1]/me)**2*0.25);
 return {calc:"help",num:true,q:`A polling organization wants to estimate the proportion of adults who support a policy with a ${lv[0]}% confidence interval and a margin of error of at most ${me}. With no prior estimate, what is the smallest sample size needed?`,
 ch:[String(n),String(Math.ceil((lv[1]/me)**2*0.5)),String(Math.ceil(lv[1]/me*0.5)),String(Math.ceil((1.645/me)**2*0.25)===n?Math.ceil((2.576/me)**2*0.25):Math.ceil((1.645/me)**2*0.25))],
 ex:`Use p̂ = 0.5, which gives the largest margin of error. Solve ${lv[1]}√[0.5(0.5)/n] ≤ ${me}: n ≥ (${lv[1]}/${me})²(0.25) = ${f((lv[1]/me)**2*0.25,1)}, so n = ${n} (always round UP).`}; });
})();
