/* Unit 4 templates: Inference for Quantitative Data: Means */
(function(){
const {mc,S,f}=ZB, G=window.ZG, add=fn=>mc[4].push(fn);

/* 1. Why t and not z */
add(R=>({calc:"no",q:"When constructing a confidence interval for a population mean μ from a random sample, why do we usually use a t critical value instead of a z critical value?",
 ch:["Because the population standard deviation σ is unknown and is estimated by the sample standard deviation s, which adds variability","Because the sample size is less than 30","Because the population is not normally distributed","Because t critical values give narrower intervals"],
 ex:"Replacing the unknown σ with s adds variability, and the t distributions (with heavier tails) account for it. This is true for any sample size. t intervals are wider than z intervals, not narrower."}));

/* 2. One-sample t interval */
add(R=>{ const c=R.pick([["bags of trail mix","weight","grams",72,8],["customers at a cafe","time spent","minutes",34,9],["cars on a highway","speed","mph",66,6]]); const n=R.pick([12,16,20,25]); const xb=c[3]+R.int(-2,2), s=c[4]+R.int(-1,1);
 const lv=R.pick([[95,0.975],[90,0.95],[99,0.995]]); const ts=S.invT(lv[1],n-1), zs=S.invNorm(lv[1]), se=s/Math.sqrt(n); const iv=m=>`(${f(xb-m,2)}, ${f(xb+m,2)})`;
 return {calc:"rec",q:`A random sample of ${n} ${c[0]} has mean ${c[1]} x̄ = ${xb} ${c[2]} and standard deviation s = ${s} ${c[2]}. The sample data show no strong skewness or outliers. Which is a ${lv[0]}% confidence interval for the mean ${c[1]} of all ${c[0]}?`,
 ch:[iv(ts*se),iv(zs*se),iv(ts*s),iv(ts*s/n)],
 ex:`df = ${n-1}, t* = ${f(ts,3)}. SE = s/√n = ${s}/√${n} = ${f(se,3)}. Interval: ${xb} ± ${f(ts,3)}(${f(se,3)}) = ${iv(ts*se)}. Using z* = ${f(zs,3)} is incorrect because σ is unknown; using s instead of s/√n describes individuals, not the mean.`}; });

/* 3. Paired or two-sample? */
add(R=>{ const p=R.pick(["Comparing each student's reaction time with the right hand and with the left hand","Comparing the weights of 20 patients before and after a 6-week program","Comparing the prices of the same 30 textbooks at two different stores","Comparing tire wear on the left and right front tires of 15 cars, where each car gets one tire of each brand"]);
 const others=R.sample(["Comparing mean test scores of a random sample of juniors and an independent random sample of seniors","Comparing mean incomes in two cities using independent random samples","Comparing mean reaction times of 20 volunteers randomly assigned to caffeine and 20 assigned to a placebo","Comparing the proportion of men and the proportion of women who exercise"],3);
 return {calc:"no",q:"Which of the following should be analyzed with a paired t procedure?",ch:[p,...others],
 ex:"Paired data occur when each observation in one group is naturally matched with one observation in the other (the same individual measured twice, or the same item in two conditions). The analysis uses the differences. Independent samples or random assignment to separate groups call for a two-sample t procedure, and comparing proportions is not a t procedure."}; });

/* 4. Conditions for t with a dotplot */
add(R=>{ const bad=R.chance(0.6); const base=Array.from({length:11},()=>R.int(8,22)); const d=bad?[...base,R.int(58,66)]:[...base,R.int(13,17)];
 return {calc:"no",q:`A researcher wants a 95% t interval for the mean amount spent per visit by all customers of a store. The dotplot shows the amounts spent by a random sample of ${d.length} customers.${G.dot(d,{min:0,max:70,step:10,xlab:"Amount spent ($)"})}Which statement is correct?`,
 ch:bad?["The t interval is not appropriate: the sample is small and has a strong outlier, so the population may be far from normal.","The t interval is appropriate because the sample is random.","The t interval is appropriate because the population of amounts is probably normal.","The t interval is not appropriate because n must be at least 30 for any inference about a mean."]
 :["The t interval is reasonable: the sample is random, and the small sample shows no strong skewness or outliers.","The t interval is not appropriate because n is less than 30.","The t interval is not appropriate because the population standard deviation is unknown.","The t interval is not appropriate because the data are not exactly normal."],
 ex:bad?"With n = 12, the t procedure needs the population to be approximately normal, which we check with a graph of the sample. The large outlier makes that implausible. Randomness alone is not enough, and n ≥ 30 is not required when the data look roughly normal.":"With a small sample, we check for strong skewness or outliers in the sample data. None appear, so a t interval is reasonable. n ≥ 30 is not required, an unknown σ is exactly why t is used, and data never need to be exactly normal."}; });

/* 5. Two-sample t statistic */
add(R=>{ const n1=R.pick([20,25,30]), n2=R.pick([25,30,35]); const x1=R.real(74,80,1), x2=+(x1-R.real(4,7,1)).toFixed(1), s1=R.real(8,10,1), s2=R.real(10,12,1);
 const se=Math.sqrt(s1*s1/n1+s2*s2/n2), t=(x1-x2)/se, tw=(x1-x2)/(s1/Math.sqrt(n1)+s2/Math.sqrt(n2));
 return {calc:"rec",num:true,q:`Independent random samples of students from two schools took the same test. School 1: n = ${n1}, x̄ = ${x1}, s = ${s1}. School 2: n = ${n2}, x̄ = ${x2}, s = ${s2}. What is the test statistic for a two-sample t-test of H₀: μ₁ = μ₂?`,
 ch:[`t = ${f(t,2)}`,`t = ${f(tw,2)}`,`t = ${f((x1-x2)/Math.sqrt(s1*s1+s2*s2),2)}`,`t = ${f((x1-x2)/Math.sqrt(s1*s1/n1),2)}`],
 ex:`SE = √(s₁²/n₁ + s₂²/n₂) = √(${f(s1*s1/n1,3)} + ${f(s2*s2/n2,3)}) ≈ ${f(se,3)}. t = (${x1} − ${x2})/${f(se,3)} ≈ ${f(t,2)}. Standard errors are not added directly; their squares (variances) add.`}; });

/* 6. p-value interpretation for a mean */
add(R=>{ const mu0=R.pick([30,45]), xb=mu0+R.int(3,5), n=R.pick([36,40,50]), pv=R.pick(["0.012","0.034","0.006"]);
 return {calc:"no",q:`A random sample of ${n} delivery times from a restaurant has a mean of ${xb} minutes. A one-sample t-test of H₀: μ = ${mu0} versus Hₐ: μ &gt; ${mu0} gives a p-value of ${pv}. Which is the correct interpretation?`,
 ch:[`If the true mean delivery time is ${mu0} minutes, there is a ${pv} probability of getting a sample mean of ${xb} minutes or more in a random sample of ${n} deliveries.`,`There is a ${pv} probability that the true mean delivery time is ${mu0} minutes.`,`There is a ${pv} probability that deliveries take longer than ${mu0} minutes on average.`,`If the true mean is more than ${mu0} minutes, there is a ${pv} probability of getting a sample mean of ${xb} minutes.`],
 ex:`A p-value is computed assuming H₀ (μ = ${mu0}) is true. It is the probability of a sample mean at least as extreme as the one observed, in the direction of Hₐ. It is not the probability that either hypothesis is true.`}; });

/* 7. Standard error interpretation */
add(R=>{ const n=R.pick([49,64,100]), se=R.pick([1.2,0.8,2.5]), xb=R.real(30,60,1);
 return {calc:"no",q:`For a random sample of ${n} batteries, the sample mean lifetime is ${xb} hours and the standard error of the mean is ${se} hours. Which is the best interpretation of the standard error?`,
 ch:[`In repeated random samples of ${n} batteries, the sample mean lifetime would typically differ from the true mean lifetime by about ${se} hours.`,`Individual batteries' lifetimes typically differ from ${xb} hours by about ${se} hours.`,`About 95% of all batteries last between ${f(xb-se,1)} and ${f(xb+se,1)} hours.`,`The sample mean is within ${se} hours of the true mean.`],
 ex:`The standard error estimates the standard deviation of the sampling distribution of x̄: how much sample means vary from μ across samples of size ${n}. Individual lifetimes vary much more (about ${se}·√${n} = ${f(se*Math.sqrt(n),1)} hours). There is no guarantee for any single sample.`}; });

/* 8. Two intervals from the same data */
add(R=>{ const c=R.real(40,60,1), m1=R.real(3,4,1), m2=+(m1*R.real(1.25,1.4,2)).toFixed(1);
 return {calc:"help",q:`From one random sample, a researcher computes two confidence intervals for a population mean: (${f(c-m1,1)}, ${f(c+m1,1)}) and (${f(c-m2,1)}, ${f(c+m2,1)}). Which statement is correct?`,
 ch:[`The second interval has the higher confidence level, and both have point estimate ${f(c,1)}.`,`The first interval has the higher confidence level because it is more precise.`,`The intervals must come from different samples because their margins of error differ.`,`The second interval has a larger sample size.`],
 ex:`Both intervals are centered at the sample mean, ${f(c,1)}. With the same data, a wider interval requires a larger critical value, which means a higher confidence level. The sample size is the same because the sample is the same.`}; });

/* 9. Paired data hidden in boxplots */
add(R=>{ const a=[19.2,22.1,24.0,26.3,30.5].map(v=>+(v+R.real(-0.4,0.4,1)).toFixed(1)); const b=a.map(v=>+(v-R.real(0.3,0.7,1)).toFixed(1));
 return {calc:"no",q:`Twenty runners each ran a 5-kilometer race once in old shoes and once in a new shoe design, in random order. The boxplots summarize their times.${G.box([{lab:"Old shoes",v:a},{lab:"New shoes",v:b}],{min:18,max:32,step:2,minor:0.5,grid:2,xlab:"Time (minutes)",L:84})}The boxplots overlap almost completely. Which statement about the analysis is correct?`,
 ch:["A paired t procedure on each runner's difference (old − new) is appropriate; separate boxplots hide the pairing, so they can't show whether individual runners got faster.","Because the boxplots overlap, there is clearly no evidence that the new shoes are faster.","A two-sample t-test comparing the two groups of times is appropriate.","A chi-square test is appropriate because there are two groups."],
 ex:"Each runner was timed in both conditions, so the data are paired. Large differences in ability between runners make the separate boxplots overlap, but each runner's difference may be consistently positive. The correct analysis uses the 20 differences."}; });

/* 10. Why matched pairs */
add(R=>{ const c=R.pick([["two diets","starting weight"],["two reading programs","reading level at the start of the year"],["two brands of running shoes","running speed"]]);
 return {calc:"no",q:`A researcher compares ${c[0]} using 40 people. In Design 1, she randomly assigns 20 people to each treatment. In Design 2, she forms 20 pairs of people with similar ${c[1]} and randomly assigns one person in each pair to each treatment. Why is Design 2 likely to be better for detecting a difference?`,
 ch:[`Pairing reduces the variability in the comparison caused by differences in ${c[1]}, so a real difference is easier to detect.`,"It uses more people.","Pairing allows the results to apply to all adults.","Pairing eliminates the need for random assignment."],
 ex:`In a matched-pairs design, differences in ${c[1]} affect both members of a pair similarly and largely cancel in the within-pair difference. Less unexplained variability means more power. Both designs use 40 people and both still use random assignment.`}; });

/* 11. t critical value */
add(R=>{ const n=R.pick([10,15,20,25]), lv=R.pick([[90,0.95],[95,0.975],[99,0.995]]); const t=S.invT(lv[1],n-1);
 return {calc:"help",num:true,q:`What critical value t* should be used for a ${lv[0]}% confidence interval for a population mean based on a random sample of ${n} observations?`,
 ch:[f(t,3),f(S.invT(lv[1],n),3),f(S.invNorm(lv[1]),3),f(S.invT(lv[1]===0.975?0.95:0.975,n-1),3)],
 ex:`df = n − 1 = ${n-1}. For ${lv[0]}% confidence, the upper-tail area is ${f(1-lv[1],3)}, so t* = ${f(t,3)} (invT(${lv[1]}, ${n-1})). Using df = ${n} or z* gives a different value.`}; });

/* 12. Paired t interval from the differences */
add(R=>{ const n=R.pick([12,15,18]), d=R.real(1.5,3.5,1), sd=R.real(2.5,4,1); const ts=S.invT(0.975,n-1), se=sd/Math.sqrt(n); const iv=m=>`(${f(d-m,2)}, ${f(d+m,2)})`;
 return {calc:"rec",q:`To test a memory supplement, ${n} volunteers took a memory test before and after taking it for 4 weeks. The differences (after − before) have mean ${d} points and standard deviation ${sd} points, with no strong skewness. Which is a 95% confidence interval for the true mean difference?`,
 ch:[iv(ts*se),iv(ts*sd),iv(S.invNorm(0.975)*se),iv(ts*Math.sqrt(2*sd*sd/n))],
 ex:`Paired data: use the ${n} differences. df = ${n-1}, t* = ${f(ts,3)}, SE = ${sd}/√${n} = ${f(se,3)}. Interval: ${d} ± ${f(ts,3)}(${f(se,3)}) = ${iv(ts*se)}. Treating the data as two independent samples, or using z*, is incorrect. (Note: without a control group, a before/after study can't separate the supplement's effect from practice effects.)`}; });

/* 13. Conclusion when failing to reject */
add(R=>{ const pv=R.pick(["0.21","0.34","0.087"]); const alpha=R.pick(["0.05"]);
 return {calc:"no",q:`Forty volunteers were randomly assigned to study with music or in silence, and their memory test scores were compared with a two-sample t-test. The p-value was ${pv}. Which conclusion is correct at α = ${alpha}?`,
 ch:["There is not convincing evidence that the true mean memory score differs between studying with music and in silence for volunteers like these.","Studying with music has no effect on memory scores.","We accept the null hypothesis that the mean scores are equal.","There is convincing evidence that music lowers memory scores."],
 ex:`Since ${pv} > ${alpha}, we fail to reject H₀: the data don't provide convincing evidence of a difference. That does not prove there is no effect, and we never “accept” H₀.`}; });
})();
