// Extra practice sets for every unit (Mrs. Zogovic). Same style as the Unit 4 sets.
// Answers stay hidden until revealed. Unit 4 sets come from unit4sets.js.
(function(){
const F = (name, body) => `<div class="u4f"><b>${name}</b><span>${body}</span></div>`;
const T = (rows) => `<table class='u4t'>${rows.map((r,i)=>`<tr>${r.map((c,j)=>(i===0||j===0)?`<th>${c}</th>`:`<td>${c}</td>`).join("")}</tr>`).join("")}</table>`;
const xbar = "x̄", phat = "p̂";

const DATA = {
/* ===================== UNIT 1 ===================== */
"unit-1":[
{
 title:"Extra Practice Set 1: Displaying & Describing Data",
 sub:"Categorical vs quantitative variables, bar charts, histograms, dotplots, stemplots, describing shape, outliers, center and spread (SOCS)",
 formulas:[
  F("Categorical variable","places each individual into a group (eye color, grade level). Display: bar chart, pie chart"),
  F("Quantitative variable","a number where arithmetic makes sense (height, test score). Display: dotplot, stemplot, histogram, boxplot"),
  F("Relative frequency","count ÷ total (a proportion or percent)"),
  F("Describe a distribution","<b>S</b>hape, <b>O</b>utliers, <b>C</b>enter, <b>S</b>pread, always in context"),
  F("Shape words","symmetric, skewed left (tail to the left), skewed right (tail to the right), unimodal, bimodal, uniform"),
  F("Skew and center","skewed right: mean > median; skewed left: mean < median; symmetric: mean ≈ median")
 ],
 probs:[
  {q:"For each variable, say whether it is categorical or quantitative: (a) a student's zip code (b) the number of siblings a student has (c) a student's favorite subject (d) the time, in minutes, a student spends on homework.",
   a:"(a) <b>Categorical.</b> Zip codes are numbers, but averaging them makes no sense; they just name a location.<br>(b) <b>Quantitative</b> (a count).<br>(c) <b>Categorical.</b><br>(d) <b>Quantitative</b> (a measurement)."},
  {q:"A survey asked 80 students how they get to school.<table class='u4t'><tr><th>Method</th><td>Bus</td><td>Car</td><td>Walk</td><td>Bike</td></tr><tr><th>Count</th><td>34</td><td>26</td><td>14</td><td>6</td></tr></table>(a) Make a relative frequency table. (b) What kind of graph is appropriate? (c) What percent of students do <i>not</i> take the bus?",
   a:"(a) Bus 34/80 = <b>0.425</b>, Car <b>0.325</b>, Walk <b>0.175</b>, Bike <b>0.075</b> (they add to 1).<br>(b) A <b>bar chart</b> (or pie chart), because the variable is categorical. Bars should not touch.<br>(c) 1 − 0.425 = <b>0.575</b>, or 57.5%."},
  {q:"Explain two differences between a bar chart and a histogram.",
   a:"• A bar chart displays a <b>categorical</b> variable; a histogram displays a <b>quantitative</b> variable.<br>• In a histogram the bars <b>touch</b> because the bins cover a number line with no gaps; in a bar chart the bars are separated and the order of categories can be changed.<br>• We describe shape (skewness) only for a histogram; shape means nothing for a bar chart."},
  {q:"Here are the numbers of text messages 15 students sent yesterday, as a stemplot (stem = tens, leaf = ones):<br><span style='font-family:monospace'>0 | 4 7 8 9<br>1 | 0 2 3 5 5 8<br>2 | 1 4 6<br>3 | 2<br>4 |<br>5 | 8</span><br>(a) Find the median. (b) Describe the distribution.",
   a:"(a) n = 15, so the median is the 8th value: 4, 7, 8, 9, 10, 12, 13, <b>15</b>. Median = <b>15 texts</b>.<br>(b) <b>Shape:</b> skewed right. <b>Outlier:</b> 58 texts looks like an outlier (far above the rest). <b>Center:</b> median of 15 texts. <b>Spread:</b> range = 58 − 4 = 54 texts (from 4 to 58).<br><i>Remember:</i> always describe in context (texts sent by these students)."},
  {q:"A histogram of house prices in a town has a long tail to the right. Which is larger, the mean or the median? Explain.",
   a:"The <b>mean</b> is larger. A few very expensive houses pull the mean up toward the tail, but the median (the middle value) is resistant and barely moves. In a right-skewed distribution, mean > median."},
  {q:"A dotplot of quiz scores (out of 10) for 20 students shows two clusters: one around 3–4 and one around 8–9, with nothing at 5–7. (a) Describe the shape. (b) Suggest a reason this could happen. (c) Is the mean a good summary of a typical score?",
   a:"(a) <b>Bimodal</b> (two peaks).<br>(b) For example, two groups of students: those who studied (or were present for the lesson) and those who did not.<br>(c) <b>No.</b> The mean would fall around 6, where almost no student actually scored. With a bimodal distribution, it is better to describe each cluster."},
  {q:"Two students describe a histogram of commute times: Student A writes “the graph is skewed right with mean 22.” Student B writes “The distribution of commute times is skewed right, with a median of about 18 minutes, times ranging from 5 to 70 minutes, and a possible high outlier near 70 minutes.” Why would Student B earn more credit on an AP free-response question?",
   a:"Student B addresses all four parts of <b>SOCS</b> (shape, outliers, center, spread) <b>in context</b> (commute times, minutes). Student A has no context, no spread and no mention of outliers. Also, for skewed data the median is a better measure of center than the mean."},
  {q:"A cumulative relative frequency graph of the ages of 200 employees shows the point (30, 0.25) and the point (45, 0.80). (a) About how many employees are younger than 30? (b) What percent are between 30 and 45? (c) Age 45 is at about what percentile?",
   a:"(a) 0.25 × 200 = <b>50 employees</b>.<br>(b) 0.80 − 0.25 = <b>0.55</b>, or 55%.<br>(c) The <b>80th percentile</b>: 80% of employees are 45 or younger."}
 ]
},
{
 title:"Extra Practice Set 2: Summary Statistics & Boxplots",
 sub:"Mean, median, standard deviation, quartiles, IQR, the 1.5 × IQR outlier rule, resistance, transforming data",
 formulas:[
  F("Mean",`${xbar} = Σx / n`),
  F("Standard deviation",`s<sub>x</sub> = √[ Σ(x − ${xbar})<sup>2</sup> / (n − 1) ]`),
  F("Five-number summary","Min, Q<sub>1</sub>, Median, Q<sub>3</sub>, Max"),
  F("IQR","IQR = Q<sub>3</sub> − Q<sub>1</sub>"),
  F("Outlier rule","outlier if x < Q<sub>1</sub> − 1.5·IQR or x > Q<sub>3</sub> + 1.5·IQR"),
  F("Add/subtract a","center (mean, median, quartiles) shifts by a; spread (SD, IQR, range) does NOT change"),
  F("Multiply/divide by b","center and spread are both multiplied by b (SD by |b|); shape unchanged"),
  F("Resistant","median and IQR are resistant to outliers; mean, SD and range are not")
 ],
 probs:[
  {q:"Number of hours 10 students slept last weekend: 12, 15, 9, 20, 14, 18, 11, 25, 16, 13. (a) Find the mean and standard deviation. (b) Find the five-number summary.",
   a:"(a) x̄ = 153/10 = <b>15.3 hours</b>; s<sub>x</sub> ≈ <b>4.72 hours</b>.<br>(b) Sorted: 9, 11, 12, 13, 14, 15, 16, 18, 20, 25. Median = (14 + 15)/2 = 14.5. Q<sub>1</sub> = median of the lower half (9, 11, 12, 13, 14) = 12. Q<sub>3</sub> = median of the upper half (15, 16, 18, 20, 25) = 18.<br>Five-number summary: <b>9, 12, 14.5, 18, 25</b>.<br><i>Calculator:</i> 1-Var Stats L1."},
  {q:"Use the sleep data from Problem 1. (a) Find the IQR. (b) Use the 1.5 × IQR rule to check for outliers. (c) Interpret the standard deviation in context.",
   a:"(a) IQR = 18 − 12 = <b>6 hours</b>.<br>(b) Lower fence 12 − 1.5(6) = 3; upper fence 18 + 1.5(6) = 27. Every value is between 3 and 27, so there are <b>no outliers</b> (25 is not an outlier).<br>(c) The number of hours these students slept typically varies from the mean of 15.3 hours by about <b>4.72 hours</b>."},
  {q:"A new student who slept 60 hours is added to the data in Problem 1. Without calculating everything, predict what happens to the mean, median and SD. Then check: the new mean is 19.36, median 15, SD 14.20.",
   a:"The <b>mean</b> jumps (15.3 → 19.36) because it uses every value. The <b>SD</b> nearly triples (4.72 → 14.20) because 60 is far from the mean. The <b>median</b> barely moves (14.5 → 15) because it only depends on the middle position. This is what <b>resistant</b> means: the median (and IQR) is not affected much by an outlier."},
  {q:"A five-number summary of the number of songs on students' playlists is: 2, 10, 15, 22, 50. (a) Is 50 an outlier? (b) Describe the shape you'd expect. (c) Could the maximum of 50 be the only outlier? Explain.",
   a:"(a) IQR = 22 − 10 = 12. Upper fence = 22 + 18 = 40. Since 50 > 40, <b>yes, 50 is an outlier</b>.<br>(b) <b>Skewed right:</b> the distance from the median to the max (35) is much larger than to the min (13), and Q<sub>3</sub> − median (7) is larger than median − Q<sub>1</sub> (5).<br>(c) We can't tell. Other values between 40 and 50 could also be outliers; the five-number summary only shows the maximum. (The lower fence is 10 − 18 = −8, so there are no low outliers.)"},
  {q:"Daily high temperatures in a city in April have mean 20°C, median 19°C, SD 4°C and IQR 5°C. Convert to Fahrenheit using F = 32 + 1.8C. Find the new mean, median, SD and IQR.",
   a:"Mean: 32 + 1.8(20) = <b>68°F</b><br>Median: 32 + 1.8(19) = <b>66.2°F</b><br>SD: 1.8(4) = <b>7.2°F</b> (adding 32 does not affect spread)<br>IQR: 1.8(5) = <b>9°F</b>"},
  {q:"A teacher adds 5 points to every student's test score. Then she decides instead to multiply every original score by 1.1. Original mean = 72, SD = 8. Find the mean and SD in each case.",
   a:"Add 5: mean = <b>77</b>, SD = <b>8</b> (unchanged).<br>Multiply by 1.1: mean = <b>79.2</b>, SD = <b>8.8</b>.<br><i>Notice:</i> adding a constant shifts the center only; multiplying changes both center and spread."},
  {q:"Household incomes in a county are strongly skewed right. A newspaper wants to report a “typical” income and how spread out incomes are. Which measures should it use, and why?",
   a:"Use the <b>median</b> for center and the <b>IQR</b> for spread. Both are resistant, so a few very high incomes won't pull them. The mean and SD would be inflated by the long right tail and would overstate a typical household's income."},
  {q:"Class A: mean 78, SD 4. Class B: mean 78, SD 12. Both classes took the same test. (a) What do the classes have in common? (b) How are they different? (c) In which class is a score of 90 more unusual?",
   a:"(a) The same average score (78).<br>(b) Class B's scores are much more <b>spread out</b>; Class A's scores are clustered close to 78.<br>(c) <b>Class A.</b> 90 is (90 − 78)/4 = 3 SDs above the mean there, but only (90 − 78)/12 = 1 SD above in Class B."}
 ]
},
{
 title:"Extra Practice Set 3: z-Scores & the Normal Distribution",
 sub:"z-scores, percentiles, the empirical rule, normalcdf, invNorm, working backwards to find μ or σ",
 formulas:[
  F("z-score","z = (x − μ) / σ: how many SDs x is above (+) or below (−) the mean"),
  F("Empirical rule","about 68% within 1σ, 95% within 2σ, 99.7% within 3σ of μ (normal only)"),
  F("Area from a value","P(a < X < b) = normalcdf(lower: a, upper: b, μ, σ)"),
  F("Value from an area","x = invNorm(area to the LEFT, μ, σ), or x = μ + z·σ"),
  F("Working backwards","find z with invNorm(area, 0, 1), then solve x = μ + zσ for the missing μ or σ"),
  F("Percentile","the percent of values at or below x")
 ],
 probs:[
  {q:"Heights of adult women are approximately normal with μ = 64.5 in and σ = 2.5 in. What proportion of women are taller than 68 inches?",
   a:"z = (68 − 64.5)/2.5 = 1.4.<br>P(X > 68) = normalcdf(68, 1E99, 64.5, 2.5) ≈ <b>0.0808</b>. About 8.1% of women are taller than 68 inches.<br><i>On the AP exam:</i> name the distribution, mean and SD, show the boundary and shade, or show the z-score."},
  {q:"Use the same heights model (μ = 64.5, σ = 2.5). (a) What proportion of women are between 60 and 70 inches? (b) What height is the 25th percentile? the 75th?",
   a:"(a) normalcdf(60, 70, 64.5, 2.5) ≈ <b>0.9502</b> (z from −1.8 to 2.2).<br>(b) invNorm(0.25, 64.5, 2.5) ≈ <b>62.81 in</b>; invNorm(0.75, 64.5, 2.5) ≈ <b>66.19 in</b>."},
  {q:"IQ scores are approximately normal with mean 100 and SD 15. Use the empirical rule: (a) What percent of people score between 70 and 130? (b) What percent score above 115? (c) What percent score below 55?",
   a:"(a) 70 and 130 are 2 SDs from the mean: about <b>95%</b>.<br>(b) 115 is 1 SD above. 68% are within 1 SD, so 32% are outside, half above: about <b>16%</b>.<br>(c) 55 is 3 SDs below. 0.3% are outside 3 SDs, half below: about <b>0.15%</b>."},
  {q:"Maya scored 1300 on the SAT (μ = 1050, σ = 200). Leo scored 28 on the ACT (μ = 21, σ = 5.5). Who did better relative to the test-takers? Justify with z-scores.",
   a:"Maya: z = (1300 − 1050)/200 = <b>1.25</b>. Leo: z = (28 − 21)/5.5 ≈ <b>1.27</b>.<br>Leo's score is slightly more SDs above the mean, so <b>Leo did slightly better</b> relative to other test-takers (though the two are very close)."},
  {q:"Using μ = 64.5 in and σ = 2.5 in, how tall must a woman be to be in the tallest 10%?",
   a:"The tallest 10% means 90% are below: x = invNorm(0.90, 64.5, 2.5) ≈ <b>67.70 inches</b>.<br>Or z = 1.2816, so x = 64.5 + 1.2816(2.5) ≈ 67.70."},
  {q:"Scores on a placement test are normal with mean 500. 15% of students score above 600. Find the standard deviation.",
   a:"Area to the left of 600 is 0.85, so z = invNorm(0.85) ≈ 1.0364.<br>600 = 500 + 1.0364σ → σ = 100/1.0364 ≈ <b>96.5 points</b>."},
  {q:"A machine fills bags of chips. Weights are normal with SD 8 grams. The company wants 90% of bags to weigh less than 80 grams. What should the mean fill weight be?",
   a:"90% to the left: z = invNorm(0.90) ≈ 1.2816.<br>80 = μ + 1.2816(8) → μ = 80 − 10.25 ≈ <b>69.75 grams</b>."},
  {q:"A woman is 62 inches tall (μ = 64.5, σ = 2.5). (a) Find her z-score and interpret it. (b) At what percentile is she?",
   a:"(a) z = (62 − 64.5)/2.5 = <b>−1</b>. Her height is 1 standard deviation below the mean height of adult women.<br>(b) normalcdf(−1E99, 62, 64.5, 2.5) ≈ 0.1587, so she is at about the <b>16th percentile</b>."},
  {q:"The number of pets owned by students has mean 1.8 and SD 1.6. Explain why a normal model is NOT appropriate for this variable.",
   a:"The number of pets can't be negative. The minimum, 0, is only (0 − 1.8)/1.6 ≈ 1.1 SDs below the mean. In a normal distribution about 13% of values would be more than 1.1 SDs below the mean, which would mean negative pets. The distribution must be <b>skewed right</b>, so a normal model doesn't fit."}
 ]
}],
/* ===================== UNIT 2 ===================== */
"unit-2":[
{
 title:"Extra Practice Set 1: Two-Way Tables & Association",
 sub:"Marginal, joint and conditional relative frequencies, segmented bar charts, association between categorical variables",
 formulas:[
  F("Marginal relative frequency","row or column total ÷ grand total"),
  F("Joint relative frequency","one cell ÷ grand total"),
  F("Conditional relative frequency","one cell ÷ its row (or column) total: “given” decides the denominator"),
  F("Association","two categorical variables are associated if the conditional distributions differ across groups"),
  F("Segmented bar chart","each bar = 100% of one group, split by the other variable; compare the segments")
 ],
 probs:[
  {q:`A school asked 220 students whether they eat breakfast.${T([["","Eats breakfast","Skips","Total"],["9th grade","60","40","100"],["12th grade","45","75","120"],["Total","105","115","220"]])}(a) What proportion of all students eat breakfast? (b) What proportion of students are 12th graders who skip breakfast? (c) What proportion of 9th graders eat breakfast? (d) What proportion of 12th graders eat breakfast?`,
   a:"(a) Marginal: 105/220 ≈ <b>0.477</b><br>(b) Joint: 75/220 ≈ <b>0.341</b><br>(c) Conditional: 60/100 = <b>0.60</b><br>(d) Conditional: 45/120 = <b>0.375</b>"},
  {q:"Use the breakfast table from Problem 1. Is there an association between grade level and eating breakfast? Support your answer.",
   a:"<b>Yes.</b> 60% of 9th graders eat breakfast but only 37.5% of 12th graders do. Because the conditional distributions are different, knowing a student's grade level helps predict whether they eat breakfast, so the variables are associated."},
  {q:"Use the breakfast table. (a) Of the students who skip breakfast, what proportion are 12th graders? (b) Why is this different from Problem 1(b)?",
   a:"(a) 75/115 ≈ <b>0.652</b>.<br>(b) Problem 1(b) is a <b>joint</b> relative frequency (out of all 220 students). This one is <b>conditional</b>: we only look at the 115 students who skip breakfast, so the denominator is 115."},
  {q:"Describe how you would draw a segmented bar chart to compare breakfast habits by grade, and what it would show.",
   a:"Draw one bar for 9th grade and one for 12th grade, each going from 0 to 100%. Split the 9th-grade bar into 60% eats / 40% skips and the 12th-grade bar into 37.5% eats / 62.5% skips. Because the segments are clearly different heights, the chart shows an association between grade and breakfast."},
  {q:`A survey of 300 adults asked about preferred news source.${T([["","Social media","TV","Print/online paper","Total"],["Under 30","72","18","10","100"],["30 and older","64","92","44","200"],["Total","136","110","54","300"]])}(a) Find the conditional distribution of news source for adults under 30. (b) For adults 30 and older. (c) Write one sentence comparing them.`,
   a:"(a) Under 30: social media 72%, TV 18%, paper 10%.<br>(b) 30 and older: social media 64/200 = 32%, TV 92/200 = 46%, paper 44/200 = 22%.<br>(c) Adults under 30 are much more likely to get news from social media (72% vs 32%), while adults 30 and older are more likely to use TV (46% vs 18%). There is an <b>association</b> between age group and news source."},
  {q:"Explain why comparing counts (72 vs 64 people use social media) in Problem 5 would be misleading.",
   a:"The groups are different sizes (100 vs 200). 72 out of 100 is 72%, but 64 out of 200 is only 32%. Comparing counts suggests the groups are similar; comparing <b>proportions</b> shows they are very different. Always compare relative frequencies when group sizes differ."},
  {q:"In a two-way table, if 30% of men and 30% of women prefer coffee, 50% of each prefer tea, and 20% of each prefer juice, what can you conclude about gender and drink preference?",
   a:"The conditional distributions are <b>identical</b>, so there is <b>no association</b> between gender and drink preference for these people. Knowing someone's gender doesn't help predict their preferred drink."},
  {q:`Survival rates after surgery at two hospitals:${T([["","Hospital A: survived / total","Hospital B: survived / total"],["Mild condition","590 / 600","198 / 200"],["Severe condition","310 / 400","588 / 700"],["All patients","900 / 1000","786 / 900"]])}(a) Which hospital has the higher overall survival rate? (b) Which has the higher survival rate for mild patients? For severe patients? (c) Explain the apparent contradiction.`,
   a:"(a) A: 900/1000 = <b>90%</b>; B: 786/900 ≈ <b>87.3%</b>. Hospital A looks better overall.<br>(b) Mild: A 98.3%, B <b>99%</b>. Severe: A 77.5%, B <b>84%</b>. Hospital B is better in <b>both</b> groups.<br>(c) This is <b>Simpson's paradox</b>. Hospital B treats far more severe patients (700 of 900), who are less likely to survive, so its overall rate is pulled down. The lurking variable (severity of condition) reverses the association when the groups are combined."}
 ]
},
{
 title:"Extra Practice Set 2: Scatterplots & Correlation",
 sub:"Explanatory vs response variables, describing a scatterplot (DUFS), correlation r and its properties",
 formulas:[
  F("Explanatory / response","x explains or predicts y; y is the response (outcome)"),
  F("Describe a scatterplot","<b>D</b>irection, <b>U</b>nusual features, <b>F</b>orm, <b>S</b>trength, in context"),
  F("Correlation",`r = (1/(n − 1)) Σ (z<sub>x</sub>·z<sub>y</sub>)`),
  F("Properties of r","−1 ≤ r ≤ 1; no units; same if x and y are switched; not changed by changing units; measures LINEAR association only; not resistant"),
  F("Correlation ≠ causation","a strong r does not show that x causes y")
 ],
 probs:[
  {q:"For each pair, identify the explanatory and response variable: (a) hours studied and exam score (b) a car's speed and its stopping distance (c) amount of fertilizer and plant height.",
   a:"(a) Explanatory: <b>hours studied</b>; response: exam score.<br>(b) Explanatory: <b>speed</b>; response: stopping distance.<br>(c) Explanatory: <b>amount of fertilizer</b>; response: plant height."},
  {q:"A scatterplot of x = outside temperature (°F) and y = hot chocolate sales (cups) at a stadium shows points that go down from left to right in a fairly tight straight-line pattern, with one game at 40°F with very low sales. Describe the relationship.",
   a:"There is a <b>strong, negative, linear</b> relationship between outside temperature and hot chocolate sales: as temperature increases, sales tend to decrease. The game at 40°F with very low sales is an <b>unusual point</b> (possible outlier); maybe a small crowd that day."},
  {q:"Find the correlation for x: 1, 2, 3, 4, 5 and y: 2, 4, 5, 4, 5. Interpret it.",
   a:"Using LinReg(a+bx) on a calculator: r ≈ <b>0.775</b>.<br>There is a moderately strong, positive, linear association between x and y.<br><i>By hand:</i> x̄ = 3, s<sub>x</sub> ≈ 1.581, ȳ = 4, s<sub>y</sub> ≈ 1.225; Σz<sub>x</sub>z<sub>y</sub> ≈ 3.098, divide by n − 1 = 4."},
  {q:"The correlation between height (in inches) and weight (in pounds) for a group of adults is r = 0.68. What is r if (a) height is measured in centimeters? (b) weight is used as x and height as y? (c) every person gains 5 pounds?",
   a:"(a) <b>0.68</b>: r has no units, so changing units doesn't change it.<br>(b) <b>0.68</b>: r doesn't care which variable is x.<br>(c) <b>0.68</b>: adding a constant shifts the points but doesn't change the pattern."},
  {q:"A student finds r = 0.02 between x = time and y = height of a ball thrown in the air, and concludes “there is no relationship between time and height.” What's wrong?",
   a:"r measures only <b>linear</b> association. A thrown ball follows a <b>curved</b> (parabolic) path, so the relationship can be very strong but not linear, and r can be close to 0. Always look at the scatterplot before interpreting r."},
  {q:"Which correlation shows the strongest relationship: r = 0.45, r = −0.91, r = 0.80, r = 0? Explain.",
   a:"<b>r = −0.91</b>. Strength depends on how close |r| is to 1, not on the sign. The negative sign only tells the direction."},
  {q:"Across many cities, the number of churches and the number of crimes have r = 0.85. Does building churches cause crime? Explain.",
   a:"<b>No.</b> Both variables are driven by a <b>lurking variable</b>: city population. Bigger cities have more churches and more crimes. Correlation does not show causation; only a well-designed experiment can show cause and effect."},
  {q:"A scatterplot has a strong positive linear pattern with r = 0.92. One point far below and to the right of the others is added, and r drops to 0.55. What does this tell you about r?",
   a:"r is <b>not resistant</b>: a single unusual point (an outlier that doesn't follow the pattern) can change r a lot. You should always graph the data and investigate unusual points."}
 ]
},
{
 title:"Extra Practice Set 3: Least-Squares Regression",
 sub:"Slope and y-intercept, predictions, residuals, r², s, computer output, extrapolation, residual plots, influential points",
 formulas:[
  F("Regression line","ŷ = a + bx"),
  F("Slope from summary stats","b = r · s<sub>y</sub> / s<sub>x</sub>"),
  F("Intercept","a = ȳ − b·x̄ (the line passes through (x̄, ȳ))"),
  F("Residual","residual = y − ŷ (actual − predicted)"),
  F("r²","the percent of the variation in y explained by the linear model with x"),
  F("s","the typical size of a residual (typical prediction error), in units of y"),
  F("Good linear model","residual plot shows random scatter, no curve, no fan shape")
 ],
 probs:[
  {q:"For a group of students, x = hours studied has x̄ = 10, s<sub>x</sub> = 2; y = test score has ȳ = 50, s<sub>y</sub> = 8; and r = 0.75. Find the equation of the least-squares regression line.",
   a:"b = r · s<sub>y</sub>/s<sub>x</sub> = 0.75 · 8/2 = <b>3</b><br>a = ȳ − b·x̄ = 50 − 3(10) = <b>20</b><br>ŷ = <b>20 + 3x</b>, where ŷ is the predicted test score and x is hours studied."},
  {q:"Use ŷ = 20 + 3x from Problem 1. (a) Interpret the slope. (b) Interpret the y-intercept. (c) A student studied 12 hours and scored 61. Find and interpret the residual.",
   a:"(a) For each additional hour studied, the <b>predicted</b> test score increases by <b>3 points</b>.<br>(b) A student who studies 0 hours has a predicted score of 20 points.<br>(c) ŷ = 20 + 3(12) = 56. Residual = 61 − 56 = <b>5</b>. This student scored 5 points <b>higher</b> than predicted from the hours studied."},
  {q:"Regression output for x = age of a used car (years) and y = price (thousands of dollars):<table class='u4t'><tr><th>Predictor</th><th>Coef</th><th>SE Coef</th></tr><tr><th>Constant</th><td>24.6</td><td>1.1</td></tr><tr><th>Age</th><td>−1.85</td><td>0.21</td></tr></table>S = 2.3 &nbsp; R-Sq = 81.2%<br>(a) Write the equation. (b) Interpret the slope. (c) Interpret R-Sq. (d) Interpret S.",
   a:"(a) <b>predicted price = 24.6 − 1.85(age)</b><br>(b) For each additional year of age, the predicted price <b>decreases by $1,850</b>.<br>(c) <b>81.2%</b> of the variation in price is explained by the linear model with age.<br>(d) The actual prices typically differ from the predicted prices by about <b>$2,300</b>."},
  {q:"Use the car model in Problem 3. (a) Find r. (b) Predict the price of a 5-year-old car. (c) Should you use the model to predict the price of a 25-year-old car?",
   a:"(a) r = −√0.812 ≈ <b>−0.901</b> (negative because the slope is negative).<br>(b) ŷ = 24.6 − 1.85(5) = <b>$15,350</b> (15.35 thousand).<br>(c) <b>No</b> if the data only included cars up to about 10 years old. That's <b>extrapolation</b>; the model would even predict a negative price (24.6 − 46.25 &lt; 0)."},
  {q:"A residual plot for a regression shows a clear U-shaped curve. What does this tell you?",
   a:"A linear model is <b>not appropriate</b>. The curved pattern in the residuals means the relationship is not linear; the line systematically over-predicts in some places and under-predicts in others. Try a non-linear model or transform the data."},
  {q:"A residual plot shows residuals that are small for small x and get larger and larger as x increases (a fan shape). What does this mean?",
   a:"The variability of y around the line is <b>not constant</b>: predictions are more precise for small x than for large x. The line may still describe the trend, but s is not a good “typical error” for every x. (This also violates a condition for inference in Unit 9.)"},
  {q:"Explain the difference between a point with a large residual (an outlier) and a high-leverage point. Which kind is more likely to be influential?",
   a:"An <b>outlier</b> in regression is far from the line in the y-direction (large residual). A <b>high-leverage</b> point has an x-value far from the other x-values. High-leverage points are more likely to be <b>influential</b>, meaning that removing them would change the slope, intercept or correlation a lot."},
  {q:"A researcher finds ŷ = 2.1 + 0.6x for the data in which x = 1, 2, 3, 4, 5 and y = 2, 4, 5, 4, 5. (a) Check the equation with your calculator. (b) Find the sum of the residuals.",
   a:"(a) LinReg gives ŷ = <b>2.2 + 0.6x</b>, so the intercept 2.1 is wrong (the line must pass through (x̄, ȳ) = (3, 4): 2.2 + 0.6(3) = 4 ✓).<br>(b) For the least-squares line, the residuals always add to <b>0</b>: residuals are −0.8, 0.6, 1.0, −0.6, −0.2."}
 ]
}],
/* ===================== UNIT 3 ===================== */
"unit-3":[
{
 title:"Extra Practice Set 1: Sampling Methods",
 sub:"Population vs sample, census, SRS, stratified, cluster, systematic, convenience and voluntary response samples",
 formulas:[
  F("SRS","every group of n individuals has the same chance to be chosen (label 1–N, use a random number generator, no repeats)"),
  F("Stratified random sample","split into groups of SIMILAR individuals (strata), take an SRS from EACH stratum"),
  F("Cluster sample","split into groups (clusters, usually by location), randomly choose some clusters, take EVERYONE in them"),
  F("Systematic random sample","pick a random start among the first k, then every k-th individual"),
  F("Bad methods","convenience sample (easy to reach) and voluntary response (people choose to respond) are usually biased")
 ],
 probs:[
  {q:"A principal wants to know what students at her school think about a new schedule. She surveys 120 students. Identify the population and the sample.",
   a:"<b>Population:</b> all students at the school. <b>Sample:</b> the 120 students who were surveyed."},
  {q:"Describe how to select an SRS of 50 students from a school with 1,200 students.",
   a:"Get a list of all 1,200 students and number them 1 to 1,200. Use a random number generator to pick 50 <b>different</b> numbers from 1 to 1,200 (ignore repeats). Survey the students with those numbers."},
  {q:"A school has 400 freshmen, 350 sophomores, 300 juniors and 250 seniors. Describe how to take a stratified random sample of 100 students with grade as the strata. Why might this be better than an SRS?",
   a:"Within each grade, number the students and use a random number generator to choose an SRS (for example, 25 from each grade, or proportional: 31, 27, 23, 19). Combine them to get 100 students.<br>It is better if opinions differ by grade: stratifying guarantees every grade is represented and usually gives a <b>more precise</b> estimate (less variability)."},
  {q:"A city wants to survey residents of an apartment complex with 40 buildings. They randomly select 5 buildings and survey every household in those buildings. (a) What type of sample is this? (b) What is one advantage?",
   a:"(a) A <b>cluster sample</b> (the buildings are clusters).<br>(b) It is much <b>cheaper and faster</b>: the surveyors only visit 5 buildings instead of walking to households all over the complex."},
  {q:"Explain the difference between strata and clusters.",
   a:"<b>Strata</b> are groups of individuals that are <b>similar</b> to each other (same grade, same income level). We sample <b>some from every</b> stratum.<br><b>Clusters</b> are groups that each look like a <b>mini-version of the population</b> (a mix of everyone), usually based on location. We pick <b>some clusters</b> and take <b>everyone</b> in them."},
  {q:"A store manager stands at the exit and asks every 20th customer to fill out a survey, starting with a randomly chosen customer among the first 20. What type of sample is this?",
   a:"A <b>systematic random sample</b>."},
  {q:"A radio host asks listeners to call in and say whether they support a new stadium. 85% of callers say no. (a) What type of sample is this? (b) Why might the results be biased?",
   a:"(a) A <b>voluntary response sample</b>.<br>(b) People who feel strongly (especially negatively) are more likely to call. The 85% probably <b>overestimates</b> the proportion of all residents who oppose the stadium."},
  {q:"To find out how much students at a high school read, a student surveys everyone in the school library during lunch. What type of sample is this, and in which direction would the result be biased?",
   a:"A <b>convenience sample</b>. Students in the library at lunch are probably more likely to read than typical students, so the sample would likely <b>overestimate</b> how much students at the school read."}
 ]
},
{
 title:"Extra Practice Set 2: Bias in Surveys",
 sub:"Undercoverage, nonresponse, response bias, question wording; describing the direction of bias",
 formulas:[
  F("Bias","a method that systematically overestimates or underestimates the true value"),
  F("Undercoverage","some members of the population are less likely (or unable) to be chosen"),
  F("Nonresponse","people who are chosen can't be reached or refuse to answer, and they differ from those who answer"),
  F("Response bias","people give inaccurate answers (lying, social desirability, memory, interviewer influence)"),
  F("Wording","the question itself pushes respondents toward an answer"),
  F("On the AP exam","name the bias, explain WHY it happens in context, and say the DIRECTION (over- or underestimate)")
 ],
 probs:[
  {q:"A town surveys residents by randomly dialing landline phone numbers. Which type of bias is most likely, and how could it affect results about support for a new skate park?",
   a:"<b>Undercoverage.</b> Many younger residents only have cell phones, so they can't be chosen. Younger residents are probably more likely to support a skate park, so the survey would likely <b>underestimate</b> support."},
  {q:"A survey is mailed to 2,000 randomly selected households. Only 300 return it. What is the concern?",
   a:"<b>Nonresponse bias.</b> Only 15% responded. People who return surveys may differ from those who don't (for example, they care more about the topic or have more free time), so the results may not represent the population."},
  {q:"Students are asked in person by their teacher, “Have you ever cheated on a test?” Explain the likely bias and its direction.",
   a:"<b>Response bias.</b> Students are unlikely to admit cheating to their teacher, so the proportion who say “yes” will probably <b>underestimate</b> the true proportion of students who have cheated. An anonymous survey would help."},
  {q:"Rewrite this question to remove bias: “Do you agree that the dangerous and outdated playground should be replaced?”",
   a:"Neutral version: <b>“Do you think the playground should be replaced? (Yes / No)”</b>. The words “dangerous” and “outdated” push people to agree."},
  {q:"Explain why a very large sample does NOT fix bias.",
   a:"Bias comes from the <b>method</b>, not the sample size. A large voluntary response sample is still made up of people who chose to respond, so it still misses the same part of the population. A larger sample reduces <b>variability</b>, but the estimate is just a more precise estimate of the wrong value."},
  {q:"A survey asks a random sample of shoppers at a gym “How many days per week do you exercise?” to estimate the average for all adults in the city. Identify the problem.",
   a:"The sample is drawn from the wrong population: gym members exercise more than typical adults (<b>undercoverage</b> of people who don't use the gym). The estimate would <b>overestimate</b> how often adults in the city exercise."},
  {q:"For each, identify the type of bias: (a) People are asked their weight and many report a lower number. (b) A survey on internet use is conducted only online. (c) Many people selected for a long phone survey hang up.",
   a:"(a) <b>Response bias</b> (people under-report weight).<br>(b) <b>Undercoverage</b> (people without internet can't respond, so internet use is overestimated).<br>(c) <b>Nonresponse bias</b>."},
  {q:"Explain the difference between sampling variability and bias. Which one does random sampling remove?",
   a:"<b>Sampling variability</b> (random sampling error) is the natural difference between a sample statistic and the parameter just because of which individuals happened to be chosen; it gets smaller with larger samples. <b>Bias</b> is a systematic error in one direction. Random sampling removes <b>selection bias</b> (the method doesn't favor any group), but it doesn't remove sampling variability, nonresponse or response bias."}
 ]
},
{
 title:"Extra Practice Set 3: Experiments & Scope of Inference",
 sub:"Observational study vs experiment, confounding, treatments, completely randomized, block and matched-pairs designs, blinding, scope of inference",
 formulas:[
  F("Observational study","observes individuals without imposing a treatment; can't show cause and effect"),
  F("Experiment","deliberately imposes treatments; with random assignment it can show cause and effect"),
  F("Principles of design","<b>Comparison</b> (2+ treatments), <b>Random assignment</b>, <b>Control</b> of other variables, <b>Replication</b> (enough units)"),
  F("Block design","group similar units into blocks, randomly assign treatments WITHIN each block"),
  F("Matched pairs","pair similar units (or each unit gets both treatments in random order)"),
  F("Scope of inference","random SAMPLING → generalize to the population; random ASSIGNMENT → conclude cause and effect")
 ],
 probs:[
  {q:"A study compares students who choose to take music lessons with those who don't, and finds the music students have higher GPAs. (a) Is this an observational study or an experiment? (b) Can we conclude that music lessons cause higher GPAs?",
   a:"(a) <b>Observational study:</b> the students chose whether to take lessons.<br>(b) <b>No.</b> There may be <b>confounding variables</b>, for example family income or parental involvement, which could be linked to both music lessons and higher GPAs."},
  {q:"Researchers want to test whether a new fertilizer increases tomato yield. They have 40 tomato plants. Identify the experimental units, the treatments, the explanatory variable and the response variable.",
   a:"<b>Experimental units:</b> the 40 tomato plants. <b>Explanatory variable:</b> type of fertilizer. <b>Treatments:</b> new fertilizer and the current fertilizer (or no fertilizer). <b>Response variable:</b> weight of tomatoes produced per plant."},
  {q:"Describe how to randomly assign the 40 plants in Problem 2 to two treatments, 20 each, in a completely randomized design.",
   a:"Number the plants 1 to 40. Use a random number generator to pick 20 <b>different</b> numbers from 1 to 40; those plants get the new fertilizer, and the other 20 get the current fertilizer. (Alternatively: write the numbers on 40 identical slips, mix them in a hat, and draw 20.) Keep everything else (water, sunlight, soil) the same, then compare mean yields."},
  {q:"Half of the 40 plants are in a sunny greenhouse and half are in a shady one. How should the experiment be changed? Explain why.",
   a:"Use a <b>randomized block design</b> with greenhouse as the block. Within the sunny greenhouse, randomly assign 10 plants to each fertilizer; do the same in the shady greenhouse. This controls for sunlight, which also affects yield, so we can compare fertilizers more precisely (less variability)."},
  {q:"An experiment compares two sunscreens. Explain how a matched-pairs design could be used with 30 volunteers.",
   a:"Each volunteer uses <b>both</b> sunscreens: one on the left arm and one on the right arm, with the arm for sunscreen A chosen <b>at random</b> (e.g., coin flip). After sun exposure, measure the redness on each arm and look at the differences. Each person acts as their own control, which removes person-to-person differences in skin."},
  {q:"In a study of a new pain medication, explain the purpose of (a) a placebo (b) double-blinding.",
   a:"(a) A <b>placebo</b> (fake pill) controls for the <b>placebo effect</b>: people may feel better just because they believe they are being treated.<br>(b) <b>Double-blind</b> means neither the subjects nor the people who measure the response know who got which treatment. This prevents expectations from affecting the subjects' reported pain or the researchers' measurements."},
  {q:"Volunteers at one hospital were randomly assigned to a new diet or a standard diet. The new diet group lost significantly more weight. What can we conclude, and about whom?",
   a:"Because of <b>random assignment</b>, we can conclude that the new diet <b>caused</b> the greater weight loss. But the subjects were <b>volunteers</b> at one hospital (no random sampling), so we can only generalize to people <b>like these volunteers</b>, not to all adults."},
  {q:"What does “statistically significant” mean in an experiment?",
   a:"The difference between treatment groups is <b>too large to be explained by chance</b> (the random assignment) alone. So we have convincing evidence that the treatment really made a difference."}
 ]
}],
/* ===================== UNIT 5 ===================== */
"unit-5":[
{
 title:"Extra Practice Set 1: Sampling Distribution of p̂",
 sub:"Parameter vs statistic, center, shape and spread of the sampling distribution of a sample proportion, the 10% and Large Counts conditions",
 formulas:[
  F("Parameter vs statistic","parameter describes the population (p, μ); statistic describes a sample (p̂, x̄)"),
  F("Mean of p̂","μ<sub>p̂</sub> = p (p̂ is an unbiased estimator)"),
  F("SD of p̂","σ<sub>p̂</sub> = √[ p(1 − p) / n ]  (use when n ≤ 10% of the population)"),
  F("Large Counts","np ≥ 10 and n(1 − p) ≥ 10 → sampling distribution of p̂ is approximately normal"),
  F("Probability","z = (p̂ − p) / σ<sub>p̂</sub>, then normalcdf"),
  F("Sample size","SD shrinks as n grows; to cut the SD in half, multiply n by 4")
 ],
 probs:[
  {q:"In a city, 35% of adults have a library card. A random sample of 200 adults is selected. (a) Find the mean and standard deviation of the sampling distribution of p̂. (b) Check the conditions.",
   a:"(a) μ<sub>p̂</sub> = <b>0.35</b>; σ<sub>p̂</sub> = √(0.35 · 0.65/200) ≈ <b>0.0337</b>.<br>(b) <b>10%:</b> 200 is less than 10% of all adults in the city. <b>Large Counts:</b> 200(0.35) = 70 ≥ 10 and 200(0.65) = 130 ≥ 10, so the sampling distribution of p̂ is approximately normal."},
  {q:"Use the library card setting (p = 0.35, n = 200). Find the probability that more than 40% of the sample have a library card.",
   a:"z = (0.40 − 0.35)/0.0337 ≈ 1.48.<br>P(p̂ > 0.40) = normalcdf(0.40, 1E99, 0.35, 0.0337) ≈ <b>0.069</b>.<br>About a 6.9% chance; unusual but not impossible."},
  {q:"Interpret the standard deviation 0.0337 from Problem 1.",
   a:"In repeated random samples of 200 adults, the sample proportion with a library card will typically vary from the true proportion of 0.35 by about <b>0.034</b>."},
  {q:"12% of a large company's products are defective. Inspectors take a random sample of 400 products. What is the probability that 15% or more are defective?",
   a:"Mean 0.12, SD = √(0.12 · 0.88/400) ≈ 0.0162. Large Counts: 400(0.12) = 48 and 400(0.88) = 352, both ≥ 10.<br>P(p̂ ≥ 0.15) = normalcdf(0.15, 1E99, 0.12, 0.0162) ≈ <b>0.032</b>."},
  {q:"8% of students at a school are left-handed. A random sample of 50 students is taken. Can we use a normal distribution to find probabilities for p̂? Explain.",
   a:"<b>No.</b> np = 50(0.08) = 4, which is less than 10. The sampling distribution of p̂ will be <b>skewed right</b>, so a normal model isn't appropriate."},
  {q:"How large a sample is needed to make the standard deviation of p̂ half as large as it is with n = 200?",
   a:"σ<sub>p̂</sub> has n under a square root, so to cut it in half we need <b>4 times</b> the sample size: <b>n = 800</b>."},
  {q:"Identify each number as a parameter or statistic: (a) 62% of all registered voters in a state voted in the last election (from official records). (b) In a sample of 1,000 voters, 58% said they will vote next year.",
   a:"(a) <b>Parameter</b> (p = 0.62): it describes the entire population.<br>(b) <b>Statistic</b> (p̂ = 0.58): it describes a sample."},
  {q:"A school of 600 students takes a random sample of 100 students without replacement. Why is the formula σ<sub>p̂</sub> = √[p(1 − p)/n] not quite right here?",
   a:"The <b>10% condition</b> fails: 100 is more than 10% of 600 (60). When we sample a large fraction of the population without replacement, observations aren't close to independent, and the formula <b>overestimates</b> the true standard deviation."}
 ]
},
{
 title:"Extra Practice Set 2: Sampling Distribution of x̄ & the CLT",
 sub:"Mean and SD of x̄, when x̄ is approximately normal, the Central Limit Theorem, individual vs sample-mean probabilities",
 formulas:[
  F("Mean of x̄","μ<sub>x̄</sub> = μ (x̄ is an unbiased estimator)"),
  F("SD of x̄","σ<sub>x̄</sub> = σ / √n  (10% condition)"),
  F("Shape","normal population → x̄ is normal for any n; otherwise use the CLT"),
  F("Central Limit Theorem","if n ≥ 30, the sampling distribution of x̄ is approximately normal, whatever the population shape"),
  F("Probability",`z = (${xbar} − μ) / (σ/√n)`),
  F("Individual vs mean","for ONE individual use σ; for the MEAN of n individuals use σ/√n")
 ],
 probs:[
  {q:"The time students spend on their phones per day has mean μ = 180 minutes and SD σ = 24 minutes. A random sample of 36 students is selected. Find the mean and SD of the sampling distribution of x̄.",
   a:"μ<sub>x̄</sub> = <b>180 minutes</b>; σ<sub>x̄</sub> = 24/√36 = <b>4 minutes</b>."},
  {q:"Use the phone-time setting (μ = 180, σ = 24, n = 36). (a) Is the shape of the sampling distribution of x̄ approximately normal? (b) Find P(x̄ > 186).",
   a:"(a) <b>Yes.</b> Even if phone times are skewed, n = 36 ≥ 30, so the <b>CLT</b> says x̄ is approximately normal.<br>(b) z = (186 − 180)/4 = 1.5. P(x̄ > 186) ≈ <b>0.0668</b>."},
  {q:"Phone times are approximately normal (μ = 180, σ = 24). Find the probability that ONE randomly selected student uses the phone more than 186 minutes. Compare with Problem 2.",
   a:"z = (186 − 180)/24 = 0.25. P(X > 186) ≈ <b>0.401</b>.<br>It's much more likely for one student to be above 186 than for the <b>average</b> of 36 students. Averages are less variable than individual values."},
  {q:"An elevator holds a maximum of 3000 lb. The weights of adults who ride it are approximately normal with mean 170 lb and SD 30 lb. If 16 adults get on, what is the probability the elevator is overloaded?",
   a:"Total &gt; 3000 means x̄ &gt; 3000/16 = 187.5 lb.<br>σ<sub>x̄</sub> = 30/√16 = 7.5. Population is normal, so x̄ is normal.<br>z = (187.5 − 170)/7.5 ≈ 2.33. P(x̄ &gt; 187.5) ≈ <b>0.0098</b>, about 1%."},
  {q:"Battery life for a phone model has mean 30 hours and SD 6 hours and is skewed left. A random sample of 40 batteries is tested. Find the probability that the sample mean is less than 28 hours.",
   a:"n = 40 ≥ 30, so by the CLT x̄ is approximately normal. σ<sub>x̄</sub> = 6/√40 ≈ 0.949.<br>z = (28 − 30)/0.949 ≈ −2.11. P(x̄ &lt; 28) ≈ <b>0.0175</b>."},
  {q:"Explain why we could NOT answer Problem 5 if the sample had only 10 batteries.",
   a:"The population is skewed left, and n = 10 is small (less than 30), so the CLT doesn't apply. The sampling distribution of x̄ would still be somewhat skewed, so a normal calculation isn't justified."},
  {q:"A student says, “The Central Limit Theorem says that if the sample is large, the population becomes normal.” Correct the statement.",
   a:"The population <b>never changes</b>. The CLT says that when n is large, the <b>sampling distribution of x̄</b> (the distribution of sample means from many samples) is approximately normal. The data in one large sample will look like the population, skewed if the population is skewed."},
  {q:"How does the sampling distribution of x̄ change when the sample size increases from 25 to 100?",
   a:"The center stays at μ. The SD gets <b>cut in half</b> (σ/5 → σ/10). The shape becomes <b>closer to normal</b>."}
 ]
},
{
 title:"Extra Practice Set 3: Differences, Bias & Variability",
 sub:"Sampling distributions of p̂₁ − p̂₂ and x̄₁ − x̄₂, unbiased estimators, bias vs variability, using a sampling distribution to judge a claim",
 formulas:[
  F("Difference of proportions","μ = p<sub>1</sub> − p<sub>2</sub>,  σ = √[ p<sub>1</sub>(1 − p<sub>1</sub>)/n<sub>1</sub> + p<sub>2</sub>(1 − p<sub>2</sub>)/n<sub>2</sub> ]"),
  F("Difference of means","μ = μ<sub>1</sub> − μ<sub>2</sub>,  σ = √[ σ<sub>1</sub><sup>2</sup>/n<sub>1</sub> + σ<sub>2</sub><sup>2</sup>/n<sub>2</sub> ]"),
  F("Normal shape","Large Counts in BOTH samples (proportions); both populations normal or both n ≥ 30 (means)"),
  F("Unbiased estimator","the center of its sampling distribution equals the parameter"),
  F("Variability","the spread of the sampling distribution; larger samples → less variability"),
  F("Is a result surprising?","if the probability of a result this extreme (assuming the claim) is very small, we doubt the claim")
 ],
 probs:[
  {q:"At School 1, 60% of students play a sport; at School 2, 50% do. Random samples of 100 from School 1 and 120 from School 2 are taken. Find the mean and SD of the sampling distribution of p̂<sub>1</sub> − p̂<sub>2</sub>.",
   a:"Mean = 0.60 − 0.50 = <b>0.10</b><br>SD = √(0.6 · 0.4/100 + 0.5 · 0.5/120) = √(0.0024 + 0.00208) ≈ <b>0.067</b>"},
  {q:"Use Problem 1. (a) Check that the shape is approximately normal. (b) Find the probability that the sample from School 2 has a HIGHER proportion of athletes than School 1.",
   a:"(a) 100(0.6) = 60, 100(0.4) = 40, 120(0.5) = 60, 120(0.5) = 60, all ≥ 10.<br>(b) We want p̂<sub>1</sub> − p̂<sub>2</sub> &lt; 0. z = (0 − 0.10)/0.067 ≈ −1.49. P ≈ <b>0.068</b>."},
  {q:"Class A scores: μ<sub>1</sub> = 75, σ<sub>1</sub> = 10. Class B scores: μ<sub>2</sub> = 70, σ<sub>2</sub> = 12. Both are approximately normal. Random samples of 25 from A and 36 from B are taken. Find P(x̄<sub>1</sub> − x̄<sub>2</sub> &gt; 10).",
   a:"Mean = 75 − 70 = 5. SD = √(100/25 + 144/36) = √(4 + 4) ≈ 2.828.<br>Both populations are normal, so the difference is normal.<br>z = (10 − 5)/2.828 ≈ 1.77. P ≈ <b>0.0385</b>."},
  {q:"Describe the four combinations of high/low bias and high/low variability using a dartboard (bullseye = the parameter).",
   a:"<b>Low bias, low variability:</b> darts tightly clustered on the bullseye (best).<br><b>Low bias, high variability:</b> darts spread out but centered on the bullseye.<br><b>High bias, low variability:</b> darts tightly clustered, but away from the bullseye.<br><b>High bias, high variability:</b> darts spread out and centered away from the bullseye."},
  {q:"Two statistics are being considered to estimate a parameter. Statistic A has a sampling distribution centered at the parameter with SD 5. Statistic B is centered 1 unit above the parameter with SD 1. Which would you prefer? Explain.",
   a:"Many statisticians would prefer <b>Statistic B</b>. It is slightly biased, but its estimates are almost always within about 3 units of the parameter. Statistic A is unbiased, but its estimates often miss by 5–10 units. Low variability can matter more than a small bias. (Either choice can earn credit with a good explanation.)"},
  {q:"A company claims that 90% of its customers are satisfied. In a random sample of 150 customers, only 120 (80%) are satisfied. Is this convincing evidence the claim is too high?",
   a:"If p = 0.90: SD = √(0.9 · 0.1/150) ≈ 0.0245, Large Counts: 135 and 15 ≥ 10.<br>z = (0.80 − 0.90)/0.0245 ≈ −4.08. P(p̂ ≤ 0.80) ≈ 0.00002.<br>It would be <b>extremely unlikely</b> to get 80% or less if 90% were satisfied, so <b>yes</b>, this is convincing evidence the true proportion is less than 0.90."},
  {q:"Is the sample range an unbiased estimator of the population range? Explain.",
   a:"<b>No.</b> The sample range can never be bigger than the population range and is usually smaller, so its sampling distribution is centered <b>below</b> the population range. It is biased (it tends to underestimate)."},
  {q:"Why do we divide by n − 1 (not n) when computing the sample standard deviation s<sub>x</sub>?",
   a:"Dividing by n − 1 makes the sample <b>variance</b> s<sub>x</sub><sup>2</sup> an <b>unbiased</b> estimator of σ<sup>2</sup>. Dividing by n would systematically underestimate the population variance."}
 ]
}],
/* ===================== UNIT 6 ===================== */
"unit-6":[
{
 title:"Extra Practice Set 1: Confidence Intervals for p",
 sub:"Conditions, one-proportion z-interval, interpreting the interval and the confidence level, margin of error, choosing a sample size",
 formulas:[
  F("Interval","p̂ ± z* √[ p̂(1 − p̂) / n ]"),
  F("z*","90%: 1.645 &nbsp; 95%: 1.960 &nbsp; 99%: 2.576 (invNorm)"),
  F("Conditions","Random; 10% (n ≤ 0.10N); Large Counts: n p̂ ≥ 10 and n(1 − p̂) ≥ 10"),
  F("Interpret interval","“We are C% confident that the interval from __ to __ captures the true proportion of [context].”"),
  F("Interpret confidence level","“If we took many random samples and built an interval from each, about C% would capture the true proportion.”"),
  F("Sample size","solve z* √[ p*(1 − p*)/n ] ≤ ME; use p* = 0.5 if unknown; round UP")
 ],
 probs:[
  {q:"In a random sample of 500 teens, 290 said they use a planner app. (a) Check the conditions for a 95% confidence interval. (b) Construct the interval.",
   a:"(a) <b>Random:</b> random sample. <b>10%:</b> 500 &lt; 10% of all teens. <b>Large Counts:</b> 290 and 210 are both ≥ 10.<br>(b) p̂ = 290/500 = 0.58. SE = √(0.58 · 0.42/500) ≈ 0.0221.<br>0.58 ± 1.96(0.0221) = 0.58 ± 0.0433 → <b>(0.537, 0.623)</b>.<br><i>Calculator:</i> 1-PropZInt, x = 290, n = 500, C-Level 0.95."},
  {q:"Interpret the interval from Problem 1 and the 95% confidence level.",
   a:"<b>Interval:</b> We are 95% confident that the interval from 0.537 to 0.623 captures the true proportion of all teens who use a planner app.<br><b>Confidence level:</b> If we took many random samples of 500 teens and built a 95% interval from each, about 95% of the intervals would capture the true proportion.<br><i>Don't say:</i> “there is a 95% probability that p is in this interval.”"},
  {q:"Based on the interval in Problem 1, is there convincing evidence that more than half of all teens use a planner app?",
   a:"<b>Yes.</b> All the values in the interval (0.537 to 0.623) are above 0.50, so 0.50 is not a plausible value for the true proportion."},
  {q:"What happens to the interval in Problem 1 if we use 99% confidence instead? Compute it.",
   a:"z* = 2.576, ME = 2.576(0.0221) ≈ 0.0569 → <b>(0.523, 0.637)</b>.<br>The interval is <b>wider</b>: to be more confident of capturing p, we need a larger margin of error."},
  {q:"A polling company wants a margin of error of at most 3 percentage points with 95% confidence. They have no idea what p̂ will be. How many people should they survey?",
   a:"1.96 √(0.5 · 0.5/n) ≤ 0.03 → n ≥ (1.96/0.03)<sup>2</sup>(0.25) ≈ 1067.1.<br>Round up: <b>n = 1068 people</b>. (Using p* = 0.5 gives the largest possible margin of error, so it is the safe choice.)"},
  {q:"Name two ways to make a confidence interval narrower, and the cost of each.",
   a:"• <b>Increase the sample size n:</b> costs more time and money.<br>• <b>Lower the confidence level:</b> the interval is less likely to capture the true value."},
  {q:"A news report says, “The poll's margin of error is ±4%, so the true percentage is definitely within 4% of the poll result.” Explain two problems with this statement.",
   a:"• The margin of error is only for a stated confidence level (often 95%), so it is <b>not definite</b>: about 5% of such intervals miss.<br>• The margin of error only accounts for <b>random sampling variability</b>. It doesn't protect against bias such as nonresponse, undercoverage or response bias."},
  {q:"In a random sample of 80 students at a school of 1,500, 6 had food allergies. Is it OK to construct a one-proportion z-interval? Explain.",
   a:"<b>No.</b> The Large Counts condition fails: n p̂ = 6, which is less than 10. The sampling distribution of p̂ is not approximately normal, so the z* method isn't reliable."}
 ]
},
{
 title:"Extra Practice Set 2: Significance Tests for p",
 sub:"Hypotheses, conditions, one-proportion z-test, p-values, conclusions in context, one- vs two-sided tests",
 formulas:[
  F("Hypotheses","H<sub>0</sub>: p = p<sub>0</sub> &nbsp; H<sub>a</sub>: p &lt; p<sub>0</sub>, p &gt; p<sub>0</sub>, or p ≠ p<sub>0</sub> (parameter, in context)"),
  F("Test statistic","z = (p̂ − p<sub>0</sub>) / √[ p<sub>0</sub>(1 − p<sub>0</sub>)/n ]  (use p<sub>0</sub>, not p̂)"),
  F("Conditions","Random; 10%; Large Counts: n p<sub>0</sub> ≥ 10 and n(1 − p<sub>0</sub>) ≥ 10"),
  F("p-value","probability, assuming H<sub>0</sub> is true, of a result at least as extreme as the one observed"),
  F("Decision","p-value &lt; α → reject H<sub>0</sub> (convincing evidence for H<sub>a</sub>); p-value ≥ α → fail to reject H<sub>0</sub>"),
  F("Four steps","State, Plan, Do, Conclude")
 ],
 probs:[
  {q:"A company claims that 70% of customers renew their subscriptions. A manager suspects the rate is lower. In a random sample of 150 customers, 96 renewed. State the hypotheses.",
   a:"H<sub>0</sub>: p = 0.70 &nbsp; H<sub>a</sub>: p &lt; 0.70, where p is the true proportion of all customers who renew their subscriptions."},
  {q:"Carry out the test in Problem 1 at α = 0.05.",
   a:"<b>Conditions:</b> random sample; 150 &lt; 10% of all customers; 150(0.7) = 105 ≥ 10 and 150(0.3) = 45 ≥ 10.<br>p̂ = 96/150 = 0.64. z = (0.64 − 0.70)/√(0.7 · 0.3/150) ≈ <b>−1.60</b>. p-value = P(Z ≤ −1.60) ≈ <b>0.054</b>.<br><b>Conclude:</b> Because 0.054 &gt; 0.05, we <b>fail to reject H<sub>0</sub></b>. We do not have convincing evidence that the true proportion of customers who renew is less than 0.70."},
  {q:"Interpret the p-value of 0.054 from Problem 2.",
   a:"Assuming the true renewal rate is 0.70, there is about a <b>5.4%</b> probability of getting a sample proportion of 0.64 or less in a random sample of 150 customers just by chance."},
  {q:"A coin is flipped 400 times and lands heads 188 times. Is there convincing evidence the coin is not fair? Use α = 0.05.",
   a:"H<sub>0</sub>: p = 0.5, H<sub>a</sub>: p ≠ 0.5 (p = true proportion of heads). Conditions: 400(0.5) = 200 ≥ 10 for both.<br>p̂ = 0.47. z = (0.47 − 0.5)/√(0.25/400) = <b>−1.2</b>. Two-sided p-value = 2 · P(Z ≤ −1.2) ≈ <b>0.230</b>.<br>0.230 &gt; 0.05, so we <b>fail to reject H<sub>0</sub></b>. No convincing evidence that the coin is unfair."},
  {q:"Last year 40% of students at a school bought lunch. In a random sample of 120 students this year, 54 bought lunch. Is there convincing evidence the proportion has increased? α = 0.05.",
   a:"H<sub>0</sub>: p = 0.40, H<sub>a</sub>: p &gt; 0.40. Conditions: 120(0.4) = 48 and 72 ≥ 10; random; 10%.<br>p̂ = 0.45, z = (0.45 − 0.40)/√(0.4 · 0.6/120) ≈ <b>1.12</b>, p-value ≈ <b>0.132</b>.<br>Fail to reject H<sub>0</sub>. There is not convincing evidence that the proportion of students who buy lunch has increased."},
  {q:"A student writes: “Since the p-value is 0.25, we accept H<sub>0</sub>. The true proportion is 0.5.” What two things are wrong?",
   a:"• We never “accept” H<sub>0</sub>; we <b>fail to reject</b> it. A large p-value means the data are consistent with H<sub>0</sub>, not that H<sub>0</sub> is proven.<br>• The conclusion should be about <b>evidence for H<sub>a</sub></b> in context, not a statement that p equals 0.5."},
  {q:"Explain what is wrong with these hypotheses: H<sub>0</sub>: p̂ = 0.6, H<sub>a</sub>: p̂ &gt; 0.6.",
   a:"Hypotheses are always about the <b>parameter</b> p (the population), never about the statistic p̂. We already know p̂ from the sample. Correct: H<sub>0</sub>: p = 0.6, H<sub>a</sub>: p &gt; 0.6, with p defined in context."},
  {q:"A test gives p-value = 0.03. What conclusion do you reach at α = 0.05? At α = 0.01?",
   a:"α = 0.05: 0.03 &lt; 0.05, so <b>reject H<sub>0</sub></b> (convincing evidence for H<sub>a</sub>).<br>α = 0.01: 0.03 &gt; 0.01, so <b>fail to reject H<sub>0</sub></b>. The conclusion depends on the significance level, which should be chosen before collecting data."}
 ]
},
{
 title:"Extra Practice Set 3: Two Proportions, Errors & Power",
 sub:"Two-proportion z-interval and z-test, pooled proportion, Type I and Type II errors, power",
 formulas:[
  F("Interval","(p̂<sub>1</sub> − p̂<sub>2</sub>) ± z* √[ p̂<sub>1</sub>(1 − p̂<sub>1</sub>)/n<sub>1</sub> + p̂<sub>2</sub>(1 − p̂<sub>2</sub>)/n<sub>2</sub> ]"),
  F("Pooled proportion (test)","p̂<sub>c</sub> = (x<sub>1</sub> + x<sub>2</sub>) / (n<sub>1</sub> + n<sub>2</sub>)"),
  F("Test statistic","z = (p̂<sub>1</sub> − p̂<sub>2</sub>) / √[ p̂<sub>c</sub>(1 − p̂<sub>c</sub>)(1/n<sub>1</sub> + 1/n<sub>2</sub>) ]"),
  F("Type I error","reject H<sub>0</sub> when H<sub>0</sub> is true; P(Type I) = α"),
  F("Type II error","fail to reject H<sub>0</sub> when H<sub>a</sub> is true"),
  F("Power","P(reject H<sub>0</sub> | H<sub>a</sub> true) = 1 − P(Type II). Increase with larger n, larger α, or a true value farther from p<sub>0</sub>")
 ],
 probs:[
  {q:"In an experiment, 150 volunteers were randomly assigned to a new reminder app and 150 to no app. 84 app users and 66 non-users finished a 30-day exercise challenge. State hypotheses for a two-sided test (α = 0.05) of whether the app changes the completion rate.",
   a:"H<sub>0</sub>: p<sub>1</sub> − p<sub>2</sub> = 0, H<sub>a</sub>: p<sub>1</sub> − p<sub>2</sub> ≠ 0, where p<sub>1</sub> and p<sub>2</sub> are the true completion rates for people like these with and without the app."},
  {q:"Carry out the test from Problem 1.",
   a:"<b>Conditions:</b> random assignment; pooled p̂<sub>c</sub> = 150/300 = 0.5, so expected counts 75, 75, 75, 75 are all ≥ 10.<br>p̂<sub>1</sub> = 0.56, p̂<sub>2</sub> = 0.44. SE = √(0.5 · 0.5(1/150 + 1/150)) ≈ 0.0577.<br>z = 0.12/0.0577 ≈ <b>2.08</b>, p-value ≈ <b>0.038</b>.<br>0.038 &lt; 0.05, so <b>reject H<sub>0</sub></b>. There is convincing evidence that the app changes the completion rate (it appears to increase it) for people like these."},
  {q:"Construct and interpret a 95% confidence interval for p<sub>1</sub> − p<sub>2</sub> using the data in Problem 1.",
   a:"SE = √(0.56 · 0.44/150 + 0.44 · 0.56/150) ≈ 0.0573. 0.12 ± 1.96(0.0573) = 0.12 ± 0.112 → <b>(0.008, 0.232)</b>.<br>We are 95% confident that the interval from 0.008 to 0.232 captures the true difference in completion rates (app − no app). Because 0 is not in the interval, this agrees with rejecting H<sub>0</sub>."},
  {q:"In random samples, 124 of 200 juniors (62%) and 120 of 250 seniors (48%) said they have a part-time job. Construct a 90% confidence interval for the difference in proportions.",
   a:"0.62 − 0.48 = 0.14. SE = √(0.62 · 0.38/200 + 0.48 · 0.52/250) ≈ 0.0466.<br>0.14 ± 1.645(0.0385) → <b>(0.063, 0.217)</b>. We are 90% confident that the proportion of juniors with a job is between 6.3 and 21.7 percentage points higher than for seniors."},
  {q:"In the app experiment from Problem 1, describe a Type I error and a Type II error in context. Which one could have been made?",
   a:"<b>Type I:</b> concluding the app changes the completion rate when it really doesn't.<br><b>Type II:</b> not finding convincing evidence that the app changes the completion rate when it really does.<br>Since we <b>rejected</b> H<sub>0</sub>, we could have made a <b>Type I error</b>."},
  {q:"A hospital tests H<sub>0</sub>: the infection rate is 5% vs H<sub>a</sub>: the infection rate is more than 5%. Which error is more serious, and what α would you choose?",
   a:"A <b>Type II error</b> (missing a real increase in infections) is probably more serious: patients could be harmed. To make a Type II error less likely, choose a <b>larger α</b> such as 0.10 (this increases power)."},
  {q:"List three ways to increase the power of a significance test.",
   a:"• <b>Increase the sample size n.</b><br>• <b>Increase α</b> (e.g., 0.05 → 0.10), at the cost of more Type I errors.<br>• The true parameter is <b>farther from p<sub>0</sub></b> (a bigger effect is easier to detect). (Also: reduce variability through better design.)"},
  {q:"A test has power 0.80 to detect that p = 0.60 when H<sub>0</sub>: p = 0.50. Interpret this value, and find the probability of a Type II error.",
   a:"If the true proportion is 0.60, there is an <b>80%</b> probability that the test will correctly reject H<sub>0</sub>: p = 0.50.<br>P(Type II) = 1 − 0.80 = <b>0.20</b>."}
 ]
}],
/* ===================== UNIT 7 ===================== */
"unit-7":[
{
 title:"Extra Practice Set 1: t-Intervals for μ",
 sub:"t distributions, t*, conditions (Random, 10%, Normal/Large Sample), one-sample t-interval, interpretation",
 formulas:[
  F("Interval",`${xbar} ± t* · s/√n,  df = n − 1`),
  F("t*","invT(area to the left, df); e.g., 95% → invT(0.975, df)"),
  F("Conditions","Random; 10%; Normal/Large Sample: population normal, or n ≥ 30, or (n &lt; 30) a graph of the data shows no strong skew or outliers"),
  F("Why t?","we estimate σ with s, adding variability; t has heavier tails than z and approaches z as df grows"),
  F("Interpretation","“We are C% confident that the interval from __ to __ captures the true mean [context].”")
 ],
 probs:[
  {q:"Find t* for (a) a 95% interval with n = 20 (b) a 90% interval with n = 12 (c) a 99% interval with n = 30.",
   a:"(a) df = 19: invT(0.975, 19) ≈ <b>2.093</b><br>(b) df = 11: invT(0.95, 11) ≈ <b>1.796</b><br>(c) df = 29: invT(0.995, 29) ≈ <b>2.756</b>"},
  {q:"A random sample of 20 students reported hours of sleep on a school night: x̄ = 8.4 hours, s = 1.6 hours. A dotplot shows no strong skew or outliers. Construct a 95% confidence interval for the mean.",
   a:"<b>Conditions:</b> random sample; 20 &lt; 10% of students; n &lt; 30 but the dotplot shows no strong skew or outliers.<br>t* = 2.093 (df = 19). SE = 1.6/√20 ≈ 0.358.<br>8.4 ± 2.093(0.358) = 8.4 ± 0.749 → <b>(7.65, 9.15) hours</b>.<br><i>Calculator:</i> TInterval with Stats."},
  {q:"Interpret the interval in Problem 2. Based on it, is it plausible that students average 9 hours of sleep?",
   a:"We are 95% confident that the interval from 7.65 to 9.15 hours captures the true mean hours of sleep on a school night for all students at the school.<br><b>Yes</b>, 9 hours is inside the interval, so it is a plausible value for μ."},
  {q:"Why do we use t* instead of z* when building a confidence interval for a mean?",
   a:"We don't know σ, so we use the sample SD s. That adds extra variability, so the standardized statistic follows a <b>t distribution</b> with heavier tails than the standard normal. Using t* makes the interval a little wider to make up for this."},
  {q:"A sample of 8 battery lifetimes is strongly skewed right with one very large value. Is it appropriate to construct a t-interval? Explain.",
   a:"<b>No.</b> The sample is small (n = 8 &lt; 30) and the data show strong skewness and an outlier, so we can't assume the population is approximately normal. The Normal/Large Sample condition is not met."},
  {q:"How does the margin of error of a t-interval change if (a) the sample size increases (b) the confidence level increases (c) the sample SD is larger?",
   a:"(a) <b>Smaller</b>: √n grows and t* gets slightly smaller.<br>(b) <b>Larger</b>: t* increases.<br>(c) <b>Larger</b>: more variability in the data means a larger SE."},
  {q:"A 95% confidence interval for the mean weight of cereal in boxes is (14.6, 15.2) ounces. The label says 16 ounces. What can you conclude?",
   a:"16 ounces is <b>not</b> in the interval, and all plausible values are below 16. There is convincing evidence that the mean weight of these cereal boxes is <b>less than</b> the labeled 16 ounces."},
  {q:"A student says, “95% of all students sleep between 7.65 and 9.15 hours.” Explain the mistake.",
   a:"A confidence interval estimates the <b>mean</b>, not individual values. Many individual students sleep less than 7.65 or more than 9.15 hours. The interval gives plausible values for the <b>average</b> sleep of all students."}
 ]
},
{
 title:"Extra Practice Set 2: t-Tests for μ & Paired Data",
 sub:"One-sample t-test, p-values with df, paired t-test on differences, when data are paired",
 formulas:[
  F("Hypotheses","H<sub>0</sub>: μ = μ<sub>0</sub> &nbsp; H<sub>a</sub>: μ &lt;, &gt;, or ≠ μ<sub>0</sub>"),
  F("Test statistic",`t = (${xbar} − μ<sub>0</sub>) / (s/√n),  df = n − 1`),
  F("p-value","tcdf(lower, upper, df); double it for a two-sided test"),
  F("Paired data","two measurements on the same individual (or matched pairs) → compute differences d, then do a one-sample t on d"),
  F("Paired test",`t = (${xbar}<sub>d</sub> − 0) / (s<sub>d</sub>/√n),  μ<sub>d</sub> = true mean difference`)
 ],
 probs:[
  {q:"A cereal company claims boxes contain an average of 5 oz of raisins. A consumer group suspects the boxes contain more. A random sample of 25 boxes has x̄ = 5.4 oz and s = 0.9 oz. State hypotheses and check conditions.",
   a:"H<sub>0</sub>: μ = 5, H<sub>a</sub>: μ &gt; 5, where μ is the true mean amount of raisins (oz) per box.<br><b>Conditions:</b> random sample; 25 &lt; 10% of all boxes; n = 25 &lt; 30, so we need a graph of the data showing no strong skew or outliers (assume it does)."},
  {q:"Complete the test from Problem 1 with α = 0.05.",
   a:"t = (5.4 − 5)/(0.9/√25) = 0.4/0.18 ≈ <b>2.22</b>, df = 24.<br>p-value = tcdf(2.22, 1E99, 24) ≈ <b>0.018</b>.<br>0.018 &lt; 0.05, so <b>reject H<sub>0</sub></b>. There is convincing evidence that the true mean amount of raisins per box is greater than 5 oz."},
  {q:"A random sample of 15 bags of chips has mean weight 48 g, s = 4.5 g. Is there convincing evidence that the mean weight differs from the advertised 50 g? α = 0.05.",
   a:"H<sub>0</sub>: μ = 50, H<sub>a</sub>: μ ≠ 50.<br>t = (48 − 50)/(4.5/√15) ≈ <b>−1.72</b>, df = 14. p-value = 2 · tcdf(−1E99, −1.72, 14) ≈ <b>0.107</b>.<br>0.107 &gt; 0.05: <b>fail to reject H<sub>0</sub></b>. Not convincing evidence that the true mean weight differs from 50 g."},
  {q:`Eight runners ran a mile before and after a 6-week training program (times in seconds):${T([["Runner","1","2","3","4","5","6","7","8"],["Before","142","150","138","155","147","160","149","152"],["After","136","147","135","150","146","151","146","149"]])}Why is this paired data?`,
   a:"Each runner is measured <b>twice</b> (before and after). The two measurements are on the <b>same individual</b>, so we analyze the <b>differences</b> for each runner rather than treating them as two independent samples."},
  {q:"Use the running data. Find the differences (Before − After), their mean and SD.",
   a:"Differences: 6, 3, 3, 5, 1, 9, 3, 3.<br>x̄<sub>d</sub> = 33/8 = <b>4.125 s</b>; s<sub>d</sub> ≈ <b>2.475 s</b>."},
  {q:"Is there convincing evidence that the training program lowers mile times? Use α = 0.05.",
   a:"H<sub>0</sub>: μ<sub>d</sub> = 0, H<sub>a</sub>: μ<sub>d</sub> &gt; 0 (μ<sub>d</sub> = true mean of before − after).<br>Conditions: assume the runners were randomly selected; n = 8, so check a dotplot of the differences for strong skew/outliers.<br>t = 4.125/(2.475/√8) ≈ <b>4.71</b>, df = 7, p-value ≈ <b>0.001</b>.<br>Reject H<sub>0</sub>. There is convincing evidence that the program lowers mile times, on average (if the runners are representative). Without a control group, we should be careful about cause: runners might improve anyway with time."},
  {q:"For each study, say whether you'd use a paired t or a two-sample t: (a) Compare the heights of 30 randomly selected boys and 30 randomly selected girls. (b) Compare each student's score on a pretest and a posttest. (c) Compare left-hand and right-hand grip strength of 20 people.",
   a:"(a) <b>Two-sample t</b>: two separate, independent groups.<br>(b) <b>Paired t</b>: two scores from each student.<br>(c) <b>Paired t</b>: two measurements on each person."},
  {q:"Interpret the p-value of 0.018 from Problem 2.",
   a:"Assuming the true mean amount of raisins is 5 oz, there is about a <b>1.8%</b> probability of getting a sample mean of 5.4 oz or more in a random sample of 25 boxes by chance alone."}
 ]
},
{
 title:"Extra Practice Set 3: Two-Sample t Procedures & Choosing a Method",
 sub:"Two-sample t-interval and t-test for μ₁ − μ₂, conditions, interpreting results, choosing the right procedure",
 formulas:[
  F("Interval",`(${xbar}<sub>1</sub> − ${xbar}<sub>2</sub>) ± t* √( s<sub>1</sub><sup>2</sup>/n<sub>1</sub> + s<sub>2</sub><sup>2</sup>/n<sub>2</sub> )`),
  F("Test statistic",`t = (${xbar}<sub>1</sub> − ${xbar}<sub>2</sub>) / √( s<sub>1</sub><sup>2</sup>/n<sub>1</sub> + s<sub>2</sub><sup>2</sup>/n<sub>2</sub> )`),
  F("df","use calculator df (2-SampTTest), or conservatively the smaller of n<sub>1</sub> − 1 and n<sub>2</sub> − 1"),
  F("Conditions","two independent random samples OR random assignment; 10% for each sample; Normal/Large Sample for EACH group"),
  F("Choosing","proportion (categorical) → z procedures; mean (quantitative) → t procedures; paired vs two independent groups")
 ],
 probs:[
  {q:"Random samples: 30 students using Study Method A had x̄<sub>1</sub> = 78, s<sub>1</sub> = 9; 35 students using Method B had x̄<sub>2</sub> = 73, s<sub>2</sub> = 11. Test whether the mean scores differ, α = 0.05.",
   a:"H<sub>0</sub>: μ<sub>1</sub> − μ<sub>2</sub> = 0, H<sub>a</sub>: μ<sub>1</sub> − μ<sub>2</sub> ≠ 0.<br>Conditions: independent random samples; both n ≥ 30 (n<sub>2</sub> = 35, n<sub>1</sub> = 30).<br>SE = √(81/30 + 121/35) ≈ 2.481. t = 5/2.481 ≈ <b>2.02</b>, df ≈ 62.9, p-value ≈ <b>0.048</b>.<br>0.048 &lt; 0.05: <b>reject H<sub>0</sub></b>. There is convincing evidence of a difference in the true mean scores for the two methods."},
  {q:"Construct a 95% confidence interval for μ<sub>1</sub> − μ<sub>2</sub> using the data in Problem 1. Does it agree with the test?",
   a:"With calculator df ≈ 62.9, t* ≈ 1.998: 5 ± 1.998(2.481) → <b>(0.04, 9.96)</b>.<br>Since 0 is (just barely) not in the interval, it agrees with rejecting H<sub>0</sub> at α = 0.05.<br><i>Conservative:</i> df = 29, t* = 2.045 gives (−0.07, 10.07), which includes 0. The two methods give slightly different answers when the p-value is this close to α."},
  {q:"Interpret the interval (0.04, 9.96) from Problem 2.",
   a:"We are 95% confident that the interval from 0.04 to 9.96 points captures the true difference in mean scores (Method A − Method B). Method A's mean could be anywhere from about 0 to 10 points higher."},
  {q:"In an experiment, 24 plants are randomly assigned to two fertilizers (12 each). Why don't we need random sampling to do a two-sample t-test? What can and can't we conclude?",
   a:"<b>Random assignment</b> also satisfies the Random condition: it creates the chance variation that the test measures. If the result is significant, we can conclude the fertilizer <b>caused</b> the difference. But without random sampling, we can only generalize to plants <b>like these</b>."},
  {q:"Choose the procedure: (a) Estimate the proportion of voters who support a bond. (b) Test whether the mean commute time differs for two cities. (c) Test whether a diet lowers weight, using before/after weights. (d) Compare the proportion of left-handed students at two schools.",
   a:"(a) <b>One-proportion z-interval</b><br>(b) <b>Two-sample t-test for μ<sub>1</sub> − μ<sub>2</sub></b><br>(c) <b>Paired t-test</b> on the differences<br>(d) <b>Two-proportion z-test</b> (or interval)"},
  {q:"Group 1: n = 12, data roughly symmetric. Group 2: n = 10, data strongly skewed with an outlier. Can you use a two-sample t procedure? Explain.",
   a:"<b>No.</b> Both samples are small (less than 30), and Group 2's data show strong skewness and an outlier, so the Normal/Large Sample condition fails for Group 2."},
  {q:"A two-sample t-test comparing mean hours of exercise for students who do and don't play a sport gives p = 0.002. A reporter writes, “Playing a sport causes students to exercise more.” Is this justified?",
   a:"Not necessarily. This is an <b>observational</b> comparison (students chose to play a sport), so there could be confounding variables. We have convincing evidence the <b>means differ</b>, but we can't conclude cause and effect without random assignment."},
  {q:"Why can't we use a two-sample t-test for the running data (before/after on the same 8 runners)?",
   a:"The two sets of times are <b>not independent</b>; they come from the same runners. A fast runner is fast both times. A paired t on the differences removes that runner-to-runner variability; a two-sample t would ignore the pairing and have much less power."}
 ]
}],
/* ===================== UNIT 8 ===================== */
"unit-8":[
{
 title:"Extra Practice Set 1: Chi-Square Goodness of Fit",
 sub:"Hypotheses, expected counts, conditions, χ² statistic, df, p-value, follow-up analysis",
 formulas:[
  F("Hypotheses","H<sub>0</sub>: the stated distribution is correct; H<sub>a</sub>: at least one proportion is different"),
  F("Expected count","E = n · p<sub>i</sub> (from H<sub>0</sub>)"),
  F("Statistic","χ<sup>2</sup> = Σ (O − E)<sup>2</sup> / E"),
  F("df","number of categories − 1"),
  F("Conditions","Random; 10%; Large Counts: all EXPECTED counts ≥ 5"),
  F("p-value","χ²cdf(χ², 1E99, df); calculator: χ²GOF-Test")
 ],
 probs:[
  {q:"A die is rolled 120 times. Observed counts for faces 1–6: 15, 25, 18, 22, 24, 16. State hypotheses and find the expected counts.",
   a:"H<sub>0</sub>: the die is fair (each face has probability 1/6). H<sub>a</sub>: the die is not fair (at least one probability is not 1/6).<br>Expected counts: 120 · (1/6) = <b>20</b> for each face."},
  {q:"Complete the test for the die in Problem 1 at α = 0.05.",
   a:"<b>Conditions:</b> the rolls are random (independent); all expected counts 20 ≥ 5.<br>χ<sup>2</sup> = (25 + 25 + 4 + 4 + 16 + 16)/20 = <b>4.5</b>, df = 5. p-value ≈ <b>0.480</b>.<br>0.480 &gt; 0.05: <b>fail to reject H<sub>0</sub></b>. There is not convincing evidence that the die is unfair."},
  {q:"A candy company says its bags are 50% red, 30% yellow, 20% green. A random bag of 200 has 88 red, 70 yellow, 42 green. Test the company's claim at α = 0.05.",
   a:"Expected: 100, 60, 40 (all ≥ 5).<br>χ<sup>2</sup> = (88−100)<sup>2</sup>/100 + (70−60)<sup>2</sup>/60 + (42−40)<sup>2</sup>/40 = 1.44 + 1.667 + 0.1 = <b>3.21</b>, df = 2, p-value ≈ <b>0.201</b>.<br>Fail to reject H<sub>0</sub>. Not convincing evidence that the color distribution differs from the company's claim. (Note: one bag is not really a random sample of all candies; this is a limitation.)"},
  {q:`A school says its students' favorite lunch options are 35% pizza, 30% tacos, 20% pasta, 15% salad. A random sample of 150 students:${T([["Option","Pizza","Tacos","Pasta","Salad"],["Observed","60","45","25","20"]])}Find the expected counts, χ² and the p-value.`,
   a:"Expected: 150 × (0.35, 0.30, 0.20, 0.15) = <b>52.5, 45, 30, 22.5</b>.<br>Contributions: 1.071, 0, 0.833, 0.278 → χ<sup>2</sup> ≈ <b>2.18</b>, df = 3, p-value ≈ <b>0.535</b>.<br>Fail to reject H<sub>0</sub>; the data are consistent with the school's percentages."},
  {q:"In Problem 4, which category contributed most to χ²? What does that tell you?",
   a:"<b>Pizza</b> (1.071): 60 students chose pizza when 52.5 were expected. If the result were significant, this would be the biggest difference from the claimed distribution (more pizza fans than expected)."},
  {q:"Why do the conditions for a χ² test use EXPECTED counts rather than observed counts?",
   a:"The χ² distribution is only a good approximation to the sampling distribution of the χ² statistic when the <b>expected</b> counts (what H<sub>0</sub> predicts) are large enough. Small expected counts make (O − E)<sup>2</sup>/E unstable."},
  {q:"How does the shape of the χ² distribution change as df increases?",
   a:"χ² distributions are always <b>skewed right</b> and take only non-negative values. As df increases, the distribution becomes <b>less skewed</b> and moves to the right (its mean equals df)."},
  {q:"A χ² GOF test gives χ² = 0. What does this mean?",
   a:"Every observed count <b>exactly equals</b> its expected count. The sample fits the claimed distribution perfectly; the p-value is 1."}
 ]
},
{
 title:"Extra Practice Set 2: Chi-Square Test for Homogeneity",
 sub:"Comparing the distribution of a categorical variable across several populations or treatments",
 formulas:[
  F("When","separate random samples (or treatment groups), ONE categorical variable measured"),
  F("Hypotheses","H<sub>0</sub>: the distribution of [variable] is the same for all [populations]; H<sub>a</sub>: the distributions are not all the same"),
  F("Expected count","E = (row total)(column total) / (grand total)"),
  F("df","(rows − 1)(columns − 1)"),
  F("Conditions","Random (independent samples or random assignment); 10%; all expected counts ≥ 5"),
  F("Calculator","enter observed counts in matrix [A], χ²-Test; expected counts go to [B]")
 ],
 probs:[
  {q:`Random samples of 100 students from each of three schools were asked their favorite lunch.${T([["","Pizza","Salad","Sandwich","Total"],["School A","38","22","40","100"],["School B","30","35","35","100"],["School C","22","43","35","100"],["Total","90","100","110","300"]])}State the hypotheses.`,
   a:"H<sub>0</sub>: The distribution of favorite lunch is the same for all three schools.<br>H<sub>a</sub>: The distribution of favorite lunch is not the same for all three schools."},
  {q:"Find the expected counts for the lunch table and check the Large Counts condition.",
   a:"E = row total × column total / 300. Every row total is 100, so each school's expected counts are 100(90)/300 = <b>30</b>, 100(100)/300 ≈ <b>33.33</b>, 100(110)/300 ≈ <b>36.67</b>.<br>All expected counts ≥ 5 ✓."},
  {q:"Carry out the test in Problem 1 at α = 0.05.",
   a:"χ<sup>2</sup> ≈ <b>11.46</b>, df = (3 − 1)(3 − 1) = 4, p-value ≈ <b>0.022</b>.<br>0.022 &lt; 0.05: <b>reject H<sub>0</sub></b>. There is convincing evidence that the distribution of favorite lunch differs among the three schools."},
  {q:"Which cells contribute most to χ² in Problem 3? Describe the difference.",
   a:"Largest contributions: School C salad (43 observed vs 33.3 expected, ≈ 2.80), School A salad (22 vs 33.3, ≈ 3.85), School A pizza (38 vs 30, ≈ 2.13) and School C pizza (22 vs 30, ≈ 2.13).<br>School A students prefer pizza more and salad less than expected; School C students prefer salad more and pizza less."},
  {q:"Why is this a test for homogeneity and not independence?",
   a:"The data come from <b>three separate random samples</b> (one per school), and we compare the distribution of <b>one</b> variable (favorite lunch) across those populations. A test for independence uses <b>one</b> sample with two variables measured on each individual."},
  {q:`In an experiment, 180 volunteers were randomly assigned to one of three ads, then asked if they would buy the product (Yes / Maybe / No). Explain why a χ² test for homogeneity is appropriate and what a significant result would let us conclude.`,
   a:"Random assignment created three treatment groups, and we compare the distribution of one categorical response across them, so it's a <b>homogeneity</b> test. A significant result would show the ad <b>causes</b> a difference in buying intention for volunteers like these."},
  {q:"A 2 × 4 table is analyzed with a χ² test. What are the degrees of freedom?",
   a:"df = (2 − 1)(4 − 1) = <b>3</b>."},
  {q:"A student compares the proportion of “Yes” answers for two groups using a χ² test on a 2 × 2 table and gets χ² = 4.84. What would z be for the two-proportion z-test on the same data?",
   a:"For a 2 × 2 table, χ² = z², so z = ±√4.84 = <b>±2.2</b>. The two tests give the same two-sided p-value."}
 ]
},
{
 title:"Extra Practice Set 3: Chi-Square Test for Independence & Choosing a Test",
 sub:"Association between two categorical variables in one sample, conclusions, choosing among GOF, homogeneity and independence",
 formulas:[
  F("When","ONE random sample, TWO categorical variables measured on each individual"),
  F("Hypotheses","H<sub>0</sub>: there is no association between X and Y (they are independent); H<sub>a</sub>: there is an association"),
  F("Expected count","E = (row total)(column total) / (grand total)"),
  F("df","(rows − 1)(columns − 1)"),
  F("Choose","1 variable vs a claimed distribution → GOF; 1 variable across several groups → homogeneity; 2 variables in 1 sample → independence")
 ],
 probs:[
  {q:`A random sample of 200 students was asked their grade and how they prefer to study.${T([["","Alone","Group","Online","Total"],["Juniors","45","30","25","100"],["Seniors","35","40","25","100"],["Total","80","70","50","200"]])}State hypotheses for a test of independence.`,
   a:"H<sub>0</sub>: There is no association between grade level and preferred study method for students at this school.<br>H<sub>a</sub>: There is an association between grade level and preferred study method."},
  {q:"Find the expected counts for the study table.",
   a:"Juniors: 100(80)/200 = <b>40</b>, 100(70)/200 = <b>35</b>, 100(50)/200 = <b>25</b>. Seniors: the same, <b>40, 35, 25</b>. All ≥ 5 ✓."},
  {q:"Carry out the test at α = 0.05.",
   a:"χ<sup>2</sup> = 25/40 + 25/35 + 0 + 25/40 + 25/35 + 0 ≈ <b>2.68</b>, df = 2, p-value ≈ <b>0.262</b>.<br>0.262 &gt; 0.05: <b>fail to reject H<sub>0</sub></b>. There is not convincing evidence of an association between grade level and preferred study method."},
  {q:"Interpret the p-value from Problem 3.",
   a:"Assuming there is no association between grade level and study preference, there is about a <b>26%</b> probability of getting a χ² statistic of 2.68 or larger by chance in a random sample of 200 students."},
  {q:"Choose the test (GOF, homogeneity or independence): (a) A random sample of adults is classified by age group and favorite music genre. (b) Separate random samples of customers from three stores rate service (good/fair/poor). (c) Checking whether births are equally likely on each day of the week.",
   a:"(a) <b>Independence</b>: one sample, two variables.<br>(b) <b>Homogeneity</b>: three samples, one variable.<br>(c) <b>Goodness of fit</b>: one variable vs a claimed distribution (1/7 each)."},
  {q:"A χ² test for independence gives p = 0.003. A student concludes, “Grade level causes students to choose a study method.” What's wrong?",
   a:"The data come from an <b>observational</b> sample, so a significant result shows an <b>association</b>, not cause and effect. Other variables could explain the relationship."},
  {q:"A 3 × 3 table has an expected count of 3.2 in one cell. What should you do?",
   a:"The Large Counts condition (all expected counts ≥ 5) is <b>not met</b>, so the χ² p-value may not be reliable. Say so, or combine categories (if it makes sense) to raise the expected counts, or collect more data."},
  {q:"Why is a χ² test always right-tailed, even when H<sub>a</sub> just says “different”?",
   a:"χ² adds up squared differences, so <b>any</b> departure from H<sub>0</sub> (in any direction) makes χ² <b>larger</b>. Only large values of χ² give evidence against H<sub>0</sub>, so the p-value is the area to the right."}
 ]
}],
/* ===================== UNIT 9 ===================== */
"unit-9":[
{
 title:"Extra Practice Set 1: Reading Regression Output & Intervals for the Slope",
 sub:"The population model μ<sub>y</sub> = α + βx, computer output, SE of the slope, t-interval for β",
 formulas:[
  F("Model","μ<sub>y</sub> = α + βx; estimate with ŷ = a + bx (b estimates β)"),
  F("Interval for β","b ± t* · SE<sub>b</sub>,  df = n − 2"),
  F("Output","Coef of x = b; SE Coef of x = SE<sub>b</sub>; S = s (SD of residuals); R-Sq = r²"),
  F("Interpret interval","“We are C% confident that the interval from __ to __ captures the slope of the population regression line relating [y] to [x].”"),
  F("Conditions (LINER)","<b>L</b>inear, <b>I</b>ndependent (10%), <b>N</b>ormal residuals, <b>E</b>qual SD (no fan in residual plot), <b>R</b>andom")
 ],
 probs:[
  {q:"A random sample of 22 students: x = hours studied per week, y = test score. Output:<table class='u4t'><tr><th>Predictor</th><th>Coef</th><th>SE Coef</th><th>T</th><th>P</th></tr><tr><th>Constant</th><td>12.5</td><td>3.2</td><td>3.91</td><td>0.001</td></tr><tr><th>Hours</th><td>4.8</td><td>0.95</td><td>5.05</td><td>0.000</td></tr></table>S = 6.1 &nbsp; R-Sq = 56.1%<br>(a) Write the regression equation. (b) Identify b, SE<sub>b</sub> and df.",
   a:"(a) <b>predicted score = 12.5 + 4.8(hours)</b><br>(b) b = <b>4.8</b>, SE<sub>b</sub> = <b>0.95</b>, df = 22 − 2 = <b>20</b>."},
  {q:"Construct a 95% confidence interval for the slope β using the output in Problem 1.",
   a:"t* = invT(0.975, 20) ≈ 2.086.<br>4.8 ± 2.086(0.95) = 4.8 ± 1.98 → <b>(2.82, 6.78)</b>."},
  {q:"Interpret the interval from Problem 2 in context. Does it give convincing evidence of a linear relationship?",
   a:"We are 95% confident that the interval from 2.82 to 6.78 captures the slope of the population regression line relating test score to hours studied. That is, for each extra hour of study, the mean test score increases by between about 2.8 and 6.8 points.<br><b>Yes</b>: 0 is not in the interval, so there is convincing evidence of a positive linear relationship."},
  {q:"Interpret S = 6.1 and SE<sub>b</sub> = 0.95 in context.",
   a:"<b>S:</b> actual test scores typically differ from the scores predicted by the regression line by about <b>6.1 points</b>.<br><b>SE<sub>b</sub>:</b> if we took many random samples of 22 students, the sample slope would typically vary from the true slope by about <b>0.95 points per hour</b>."},
  {q:"Use the output in Problem 1 to find the correlation r.",
   a:"r = +√0.561 ≈ <b>0.749</b> (positive because the slope is positive)."},
  {q:"Explain the difference between b and β.",
   a:"<b>b</b> is the slope of the <b>sample</b> regression line (a statistic, 4.8 here). <b>β</b> is the slope of the <b>population</b> regression line (a parameter, unknown). We use b and SE<sub>b</sub> to make inferences about β."},
  {q:"Which conditions for inference about the slope are checked with (a) a residual plot (b) a histogram or dotplot of residuals (c) how the data were collected?",
   a:"(a) <b>Linear</b> (no curved pattern) and <b>Equal SD</b> (no fan shape).<br>(b) <b>Normal</b> (no strong skew or outliers in the residuals).<br>(c) <b>Random</b> and <b>Independent</b> (10% condition when sampling without replacement)."},
  {q:"How would a 99% interval for β compare to the 95% interval? What if the sample were 80 students instead of 22?",
   a:"99%: <b>wider</b> (larger t*).<br>80 students: <b>narrower</b>, since SE<sub>b</sub> gets smaller with more data and t* is a little smaller with more df."}
 ]
},
{
 title:"Extra Practice Set 2: t-Test for the Slope",
 sub:"Hypotheses about β, test statistic, p-value from output, one-sided tests, conclusions",
 formulas:[
  F("Hypotheses","H<sub>0</sub>: β = 0 (no linear relationship); H<sub>a</sub>: β &gt; 0, β &lt; 0 or β ≠ 0"),
  F("Test statistic","t = (b − β<sub>0</sub>) / SE<sub>b</sub>,  df = n − 2"),
  F("Output p-value","computer output P is TWO-SIDED; halve it for a one-sided test (if b is in the direction of H<sub>a</sub>)"),
  F("Calculator","LinRegTTest (enter x list, y list)"),
  F("Conclusion","convincing evidence of a (positive/negative) linear relationship between x and y in the population")
 ],
 probs:[
  {q:"Use the output from Set 1, Problem 1 (b = 4.8, SE<sub>b</sub> = 0.95, n = 22). Test H<sub>0</sub>: β = 0 vs H<sub>a</sub>: β ≠ 0 at α = 0.05.",
   a:"t = 4.8/0.95 ≈ <b>5.05</b>, df = 20, p-value ≈ <b>0.0001</b> (output shows 0.000).<br>Reject H<sub>0</sub>. There is convincing evidence of a linear relationship between hours studied and test score for all students."},
  {q:"A random sample of 15 cities: x = average temperature (°F), y = heating cost (dollars). b = −0.42, SE<sub>b</sub> = 0.18. Is there convincing evidence that heating cost decreases as temperature increases? α = 0.05.",
   a:"H<sub>0</sub>: β = 0, H<sub>a</sub>: β &lt; 0 (β = slope of the population line relating heating cost to temperature).<br>t = −0.42/0.18 ≈ <b>−2.33</b>, df = 13, p-value = tcdf(−1E99, −2.33, 13) ≈ <b>0.018</b>.<br>0.018 &lt; 0.05: reject H<sub>0</sub>. There is convincing evidence of a negative linear relationship between temperature and heating cost for cities like these."},
  {q:"Construct a 90% confidence interval for β using the data in Problem 2.",
   a:"df = 13, t* = invT(0.95, 13) ≈ 1.771.<br>−0.42 ± 1.771(0.18) → <b>(−0.739, −0.101)</b>. All values are negative, consistent with the one-sided test."},
  {q:"Output for n = 30 shows: slope b = 1.2, SE = 0.85, T = 1.41, P = 0.169. Test H<sub>a</sub>: β &gt; 0 at α = 0.05.",
   a:"The output P = 0.169 is two-sided. Since b &gt; 0, the one-sided p-value = 0.169/2 ≈ <b>0.085</b>.<br>0.085 &gt; 0.05: fail to reject H<sub>0</sub>. There is not convincing evidence of a positive linear relationship."},
  {q:"Why is df = n − 2 for inference about the slope?",
   a:"We estimate <b>two</b> parameters (the intercept α and the slope β) from the data to compute the residuals and s, so we lose two degrees of freedom."},
  {q:"A slope test gives p = 0.0004 for x = minutes of exercise per day and y = resting heart rate in an observational study. Can we conclude more exercise causes a lower heart rate?",
   a:"<b>No.</b> We have convincing evidence of a linear <b>relationship</b>, but the data are observational. Other variables (diet, genetics, age) could explain the association. Only a randomized experiment can show causation."},
  {q:"A student's hypotheses are H<sub>0</sub>: b = 0, H<sub>a</sub>: b ≠ 0. What's wrong?",
   a:"Hypotheses must be about the <b>population</b> slope <b>β</b>, not the sample slope b."},
  {q:"If the true slope β is 0, what does that mean about the relationship between x and y?",
   a:"There is <b>no linear relationship</b> between x and y in the population: the mean of y doesn't change (linearly) as x changes, so knowing x doesn't help predict y with a line."}
 ]
},
{
 title:"Extra Practice Set 3: Conditions & Putting It All Together",
 sub:"Checking LINER from graphs, when inference is not appropriate, connecting r, r², s and the slope test",
 formulas:[
  F("Linear","scatterplot roughly linear; residual plot has no curved pattern"),
  F("Independent","10%: n ≤ 0.10 × population (sampling without replacement)"),
  F("Normal","histogram/dotplot of residuals: no strong skew or outliers"),
  F("Equal SD","residual plot: vertical spread about the same everywhere (no fan)"),
  F("Random","random sample or randomized experiment"),
  F("Connections","b = r·s<sub>y</sub>/s<sub>x</sub>; testing β = 0 is the same as testing for a linear relationship (ρ = 0)")
 ],
 probs:[
  {q:"A residual plot shows residuals that spread out more and more as x increases. Which condition is violated?",
   a:"<b>Equal SD.</b> The variability of y around the line increases with x (a fan shape), so the SD of y is not the same for all x."},
  {q:"A residual plot shows a clear curve (residuals positive, then negative, then positive). Which condition is violated, and what should you do?",
   a:"<b>Linear.</b> The relationship is not linear, so slope inference is not appropriate. Consider transforming the data (e.g., log or square root) and check again."},
  {q:"A histogram of residuals for n = 12 is strongly skewed with one large outlier. What does this mean for inference?",
   a:"The <b>Normal</b> condition is not met, and with a small sample this matters. The t procedures for the slope may not be reliable."},
  {q:"Data on 40 consecutive days of ice cream sales and temperature at one shop are collected. Which condition is the most questionable?",
   a:"<b>Random / Independent:</b> the days were not randomly selected, and consecutive days may not be independent (weather and sales on one day are related to the next day). Be careful generalizing."},
  {q:"A regression of y = price of a pizza on x = diameter (inches) for a random sample of 25 pizzerias gives r = 0.88, s<sub>x</sub> = 2.5 in, s<sub>y</sub> = $3.10. Find the slope and interpret it.",
   a:"b = r·s<sub>y</sub>/s<sub>x</sub> = 0.88(3.10/2.5) ≈ <b>1.09</b>. For each additional inch of diameter, the predicted price increases by about <b>$1.09</b>."},
  {q:"Two studies test β = 0 with the same slope b = 0.5. Study A has n = 15; Study B has n = 150. Which is more likely to find a significant result? Why?",
   a:"<b>Study B.</b> With more data, SE<sub>b</sub> is smaller, so t = b/SE<sub>b</sub> is larger and the p-value smaller. (Larger samples give the test more power.)"},
  {q:"A slope test gives a p-value of 0.30. What should you write as the conclusion?",
   a:"Because 0.30 &gt; α = 0.05, we <b>fail to reject H<sub>0</sub>: β = 0</b>. There is <b>not convincing evidence</b> of a linear relationship between [x] and [y] in the population. (Don't say “there is no relationship.”)"},
  {q:"Explain why you should always look at a scatterplot and residual plot before trusting a small p-value for the slope.",
   a:"A small p-value only tells you the sample slope is unlikely to be this far from 0 by chance <b>if the conditions hold</b>. A curved pattern, a fan shape or an influential point can make the line a poor model even with a small p-value. Graphs show whether a linear model is appropriate."}
 ]
}]
,
/* ===================== BEYOND AP ===================== */
"beyond":[
{
 title:"Beyond AP Practice Set 1: Probability",
 sub:"Bayes' theorem, Poisson, uniform and exponential distributions, counting, covariance",
 formulas:[
  F("Bayes' theorem","P(A | B) = P(B | A)·P(A) / [ P(B | A)·P(A) + P(B | A<sup>C</sup>)·P(A<sup>C</sup>) ]"),
  F("Poisson(λ)","P(X = k) = e<sup>−λ</sup>λ<sup>k</sup>/k!, mean = variance = λ"),
  F("Uniform(a, b)","P(c &lt; X &lt; d) = (d − c)/(b − a), μ = (a + b)/2, σ = (b − a)/√12"),
  F("Exponential(mean μ)","P(X &gt; t) = e<sup>−t/μ</sup>, σ = μ"),
  F("Counting","<sub>n</sub>P<sub>r</sub> = n!/(n − r)! (order matters); <sub>n</sub>C<sub>r</sub> = n!/(r!(n − r)!) (order doesn't)"),
  F("Variance of a sum","Var(X ± Y) = σ<sub>X</sub><sup>2</sup> + σ<sub>Y</sub><sup>2</sup> ± 2ρσ<sub>X</sub>σ<sub>Y</sub>")
 ],
 probs:[
  {q:"1% of people have a disease. A test is positive for 99% of people with the disease and for 2% of people without it. A randomly chosen person tests positive. Find P(disease | positive).",
   a:"P(+) = 0.01(0.99) + 0.99(0.02) = 0.0099 + 0.0198 = 0.0297.<br>P(D | +) = 0.0099/0.0297 ≈ <b>0.333</b>.<br>Even with a very accurate test, only 1 in 3 positives actually has the disease, because the disease is rare (base rate 1%)."},
  {q:"A book has an average of 1.5 typos per page, following a Poisson distribution. (a) P(a page has no typos)? (b) P(a page has at least 2 typos)?",
   a:"(a) P(X = 0) = e<sup>−1.5</sup> ≈ <b>0.223</b><br>(b) P(X ≥ 2) = 1 − P(0) − P(1) = 1 − e<sup>−1.5</sup>(1 + 1.5) ≈ 1 − 0.558 = <b>0.442</b>"},
  {q:"A factory makes 1,000 items a day, and each is defective with probability 0.002 independently. Use a Poisson approximation to find P(at most 1 defective item in a day).",
   a:"λ = np = 1000(0.002) = 2.<br>P(X ≤ 1) = e<sup>−2</sup>(1 + 2) = 3e<sup>−2</sup> ≈ <b>0.406</b>."},
  {q:"Time between customers at a coffee cart is exponential with mean 4 minutes. (a) P(wait more than 6 minutes)? (b) P(wait less than 2 minutes)? (c) You've already waited 5 minutes. What's the probability you wait more than 6 additional minutes?",
   a:"(a) e<sup>−6/4</sup> = e<sup>−1.5</sup> ≈ <b>0.223</b><br>(b) 1 − e<sup>−2/4</sup> ≈ <b>0.393</b><br>(c) Still <b>0.223</b>, by the memoryless property: the past wait doesn't matter."},
  {q:"A computer picks a random real number X uniformly between 2 and 10. Find P(X &gt; 7), the mean and the standard deviation.",
   a:"P(X &gt; 7) = (10 − 7)/(10 − 2) = 3/8 = <b>0.375</b>. μ = (2 + 10)/2 = <b>6</b>. σ = 8/√12 ≈ <b>2.31</b>."},
  {q:"(a) How many different 5-card hands can be dealt from a 52-card deck? (b) What is the probability of a flush (all 5 cards the same suit, including straight flushes)?",
   a:"(a) <sub>52</sub>C<sub>5</sub> = <b>2,598,960</b> hands.<br>(b) Choose a suit (4 ways), then 5 of its 13 cards: 4 · <sub>13</sub>C<sub>5</sub> = 4 · 1287 = 5148. P = 5148/2,598,960 ≈ <b>0.00198</b>."},
  {q:"How many different arrangements are there of the letters in the word STATS?",
   a:"5 letters with S repeated twice and T repeated twice: 5!/(2!·2!) = 120/4 = <b>30</b> arrangements."},
  {q:"X has SD 10 and Y has SD 6, and their correlation is ρ = −0.4. Find the SD of X + Y. How does it compare to the SD if X and Y were independent?",
   a:"Cov = −0.4(10)(6) = −24. Var(X + Y) = 100 + 36 + 2(−24) = 88, so σ ≈ <b>9.38</b>.<br>If independent: √136 ≈ <b>11.66</b>. Negative correlation makes the sum <b>less</b> variable (the variables tend to offset each other)."}
 ]
},
{
 title:"Beyond AP Practice Set 2: Statistics",
 sub:"Multiple regression, adjusted R², logistic regression, bootstrap, permutation tests, Bayesian updating, ANOVA, non-parametric tests",
 formulas:[
  F("Multiple regression","ŷ = b<sub>0</sub> + b<sub>1</sub>x<sub>1</sub> + b<sub>2</sub>x<sub>2</sub>; each slope holds the other x's constant"),
  F("Adjusted R²","1 − (1 − R²)(n − 1)/(n − k − 1), k = number of x's"),
  F("Logistic regression","ln(p/(1 − p)) = b<sub>0</sub> + b<sub>1</sub>x; p = 1/(1 + e<sup>−(b<sub>0</sub>+b<sub>1</sub>x)</sup>); odds multiply by e<sup>b<sub>1</sub></sup> per unit of x"),
  F("Bootstrap","resample the data WITH replacement; middle 95% of bootstrap statistics ≈ 95% CI"),
  F("Permutation test","shuffle group labels; p-value = proportion of shuffles at least as extreme as observed"),
  F("Beta–Binomial","prior Beta(a, b) + k successes in n → posterior Beta(a + k, b + n − k)")
 ],
 probs:[
  {q:"A model for college students predicts GPA = 1.6 + 0.06(study hours per week) − 0.02(work hours per week). (a) Predict the GPA of a student who studies 20 hours and works 10 hours. (b) Interpret −0.02.",
   a:"(a) 1.6 + 0.06(20) − 0.02(10) = 1.6 + 1.2 − 0.2 = <b>2.6</b>.<br>(b) For students who study the same number of hours, each additional hour of work per week is associated with a <b>0.02 lower</b> predicted GPA."},
  {q:"A multiple regression with k = 3 explanatory variables and n = 30 observations has R² = 0.60. Find the adjusted R². Why is it smaller?",
   a:"1 − (0.40)(29/26) ≈ 1 − 0.446 = <b>0.554</b>. Adjusted R² penalizes the model for each extra variable, because plain R² can only go up when variables are added, even useless ones."},
  {q:"The probability that a student passes a driving test is modeled by ln(p/(1 − p)) = −3 + 0.5x, where x = number of practice drives. (a) Find p for x = 6 and x = 8. (b) Interpret e<sup>0.5</sup> ≈ 1.65.",
   a:"(a) x = 6: log-odds = 0, p = <b>0.5</b>. x = 8: log-odds = 1, p = 1/(1 + e<sup>−1</sup>) ≈ <b>0.731</b>.<br>(b) Each extra practice drive multiplies the <b>odds</b> of passing by about 1.65 (a 65% increase in the odds)."},
  {q:"From a sample of 40 home prices, 10,000 bootstrap samples are taken and the median is computed for each. The 2.5th and 97.5th percentiles of the bootstrap medians are $241,000 and $268,000. (a) State the 95% bootstrap interval. (b) Why must the resampling be WITH replacement?",
   a:"(a) We are 95% confident the population median home price is between <b>$241,000 and $268,000</b>.<br>(b) Without replacement, every resample of 40 from 40 would be the same data in a different order, giving the same median every time. Sampling with replacement mimics drawing new random samples from the population."},
  {q:"In a randomized experiment the observed difference in mean reaction times is 35 ms. The group labels are shuffled 1,000 times and only 4 shuffled differences are 35 ms or larger. Find the p-value and state a conclusion at α = 0.05.",
   a:"p-value ≈ 4/1000 = <b>0.004</b>. Since 0.004 &lt; 0.05, we reject H<sub>0</sub>: a difference this large would rarely happen by chance alone, so there is convincing evidence the treatment affects mean reaction time."},
  {q:"Before seeing data, a scientist uses a Beta(2, 2) prior for the proportion p of seeds that germinate. 9 of 12 seeds germinate. Find the posterior distribution and its mean. Compare to p̂.",
   a:"Posterior = Beta(2 + 9, 2 + 3) = <b>Beta(11, 5)</b>. Mean = 11/16 ≈ <b>0.688</b>. The sample proportion is 9/12 = 0.75; the prior (centered at 0.5) pulls the estimate slightly toward 0.5."},
  {q:"A researcher compares mean test scores for 4 teaching methods by running all 6 pairwise t-tests at α = 0.05. Assuming independence, what is the probability of at least one Type I error? What method should be used instead?",
   a:"P(at least one) = 1 − 0.95<sup>6</sup> ≈ <b>0.265</b>, far more than 5%.<br>Use a <b>one-way ANOVA</b> (F-test), which tests all 4 means at once with an overall α = 0.05."},
  {q:"When would you use a non-parametric test such as the Wilcoxon rank-sum (Mann–Whitney) test instead of a two-sample t-test?",
   a:"When samples are <b>small</b> and the data are <b>strongly skewed or have outliers</b>, so the Normal condition fails, or when the data are only ranks/ordinal. These tests use ranks instead of the actual values, so they are resistant to outliers."}
 ]
}]
};

const COL = {"beyond":"#5f6670","unit-1":"#1f5fa8","unit-2":"#2a7a46","unit-3":"#b8650f","unit-4":"#b03a2e","unit-5":"#6b3fa0","unit-6":"#0f7c7a","unit-7":"#a8326e","unit-8":"#3d4fb5","unit-9":"#7a5a12"};

const CSS = `
.u4wrap{margin:6px 0 8px}
details.u4set{border:1px solid var(--line,#111);border-left:6px solid var(--c);margin:12px 0;background:#fff}
details.u4set>summary{cursor:pointer;padding:10px 14px;font-weight:700;font-size:18px;list-style:none}
details.u4set>summary::-webkit-details-marker{display:none}
details.u4set>summary::before{content:"▸ ";color:var(--c)}
details.u4set[open]>summary::before{content:"▾ "}
details.u4set>summary small{display:block;font-weight:400;font-style:italic;color:#555;font-size:14.5px;margin-left:18px}
.u4body{padding:0 14px 14px}
.u4formulas{border:1px solid #ddd;background:color-mix(in srgb,var(--c) 6%,#fff);padding:10px 12px;margin:4px 0 14px}
.u4formulas h4{margin:0 0 6px;font-size:15px;letter-spacing:.08em;text-transform:uppercase;color:var(--c)}
.u4f{display:grid;grid-template-columns:minmax(150px,220px) 1fr;gap:10px;padding:4px 0;border-top:1px dotted #ccc;font-size:15.5px}
.u4f:first-of-type{border-top:0}
.u4bar{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:6px 0 10px}
.u4bar button{border:1px solid var(--c);background:#fff;color:var(--c);padding:3px 10px;font:inherit;font-size:14.5px;font-weight:600;cursor:pointer}
.u4bar button:hover{background:var(--c);color:#fff}
ol.u4probs{margin:0;padding-left:24px}
ol.u4probs>li{margin:0 0 14px;font-size:16px;line-height:1.45}
details.u4ans{margin-top:6px}
details.u4ans>summary{cursor:pointer;color:var(--c);font-weight:600;font-size:14.5px}
details.u4ans>div{border-left:3px solid var(--c);padding:6px 10px;margin-top:4px;background:#fafafa}
table.u4t{border-collapse:collapse;margin:8px 0;font-size:15px}
table.u4t th,table.u4t td{border:1px solid #999;padding:3px 10px;text-align:center}
table.u4t th{background:#f2f2f2}
@media (max-width:640px){.u4f{grid-template-columns:1fr;gap:0}}
`;

function setsFor(id){
  if(id==="unit-4") return (window.U4SETS && window.U4SETS.sets) || [];
  return DATA[id] || [];
}
function html(id){
  const S = setsFor(id); if(!S.length) return "";
  return `<div class="u4wrap" data-unit="${id}"><p class="sub" style="margin:0 0 4px;border:0;padding:0">Work each problem on paper first. Click a set to open it; answers stay hidden until you click “Show answer”.</p>` +
  S.map((s,i)=>`<details class="u4set" data-unit="${id}" data-set="${i}"><summary>${s.title}<small>${s.sub} · ${s.probs.length} problems</small></summary><div class="u4body">
   <div class="u4formulas"><h4>Formulas you need</h4>${s.formulas.join("")}</div>
   <div class="u4bar"><button type="button" data-u4="show">Show all answers</button><button type="button" data-u4="hide">Hide all answers</button><button type="button" data-u4="print">Print this set (no answers)</button></div>
   <ol class="u4probs">${s.probs.map(p=>`<li>${p.q}<details class="u4ans"><summary>Show answer &amp; explanation</summary><div>${p.a}</div></details></li>`).join("")}</ol>
  </div></details>`).join("") + `</div>`;
}
function bind(root){
  if(!document.getElementById("usetcss")){ const st=document.createElement("style"); st.id="usetcss"; st.textContent=CSS; document.head.appendChild(st); }
  root.querySelectorAll("details.u4set .u4bar button").forEach(b=>b.onclick=()=>{
    const set=b.closest("details.u4set"), act=b.dataset.u4;
    if(act==="show") set.querySelectorAll("details.u4ans").forEach(d=>d.open=true);
    if(act==="hide") set.querySelectorAll("details.u4ans").forEach(d=>d.open=false);
    if(act==="print"){
      const uid=set.dataset.unit, s=setsFor(uid)[+set.dataset.set];
      const w=window.open("","_blank"); if(!w) return;
      w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${s.title}</title><style>body{font-family:Georgia,serif;max-width:760px;margin:30px auto;line-height:1.5;padding:0 16px}${CSS}.u4f{grid-template-columns:200px 1fr}li{margin-bottom:60px!important}</style></head><body style="--c:${COL[uid]||"#111"}"><p>Name: ____________________ &nbsp; Date: __________ &nbsp; Period: ____</p><h2>${s.title}</h2><p><i>${s.sub}</i></p><div class="u4formulas"><h4>Formulas you need</h4>${s.formulas.join("")}</div><ol class="u4probs">${s.probs.map(p=>`<li>${p.q}</li>`).join("")}</ol><p style="font-size:13px;color:#555">AP Statistics · Zogovic</p></body></html>`);
      w.document.close(); setTimeout(()=>{ try{w.print();}catch(e){} },300);
    }
  });
}
window.UNITSETS = {html, bind, count:id=>setsFor(id).length};
})();
