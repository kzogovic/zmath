// Unit 4 extra practice sets (Mrs. Zogovic). Answers stay hidden until revealed.
(function(){
const F = (name, body) => `<div class="u4f"><b>${name}</b><span>${body}</span></div>`;
const SETS = [
{
 title:"Extra Practice Set 1: Probability Rules",
 sub:"Mutually exclusive events, addition rule, two-way tables, conditional probability, independence, tree diagrams",
 formulas:[
  F("Complement","P(A<sup>C</sup>) = 1 − P(A)"),
  F("Addition rule","P(A or B) = P(A) + P(B) − P(A and B)"),
  F("Mutually exclusive","P(A and B) = 0, so P(A or B) = P(A) + P(B)"),
  F("Conditional probability","P(A | B) = P(A and B) / P(B)"),
  F("General multiplication","P(A and B) = P(A) · P(B | A)"),
  F("Independent events","P(A | B) = P(A)  ⇔  P(A and B) = P(A) · P(B)"),
  F("At least one","P(at least one) = 1 − P(none)")
 ],
 probs:[
  {q:"Roll one fair six-sided die. Let A = “roll an even number” and B = “roll a 5.” (a) Are A and B mutually exclusive? (b) Find P(A or B).",
   a:"(a) <b>Yes.</b> A = {2, 4, 6} and B = {5} share no outcomes, so P(A and B) = 0.<br>(b) Because they are mutually exclusive: P(A or B) = 3/6 + 1/6 = 4/6 ≈ <b>0.667</b>."},
  {q:"At a high school, 45% of students play a sport, 30% are in band, and 12% do both. (a) Find P(sport or band). (b) Find P(neither). (c) Are “sport” and “band” mutually exclusive?",
   a:"(a) P(S or B) = 0.45 + 0.30 − 0.12 = <b>0.63</b>. Subtract “both” so those students are not counted twice.<br>(b) P(neither) = 1 − 0.63 = <b>0.37</b> (complement rule).<br>(c) <b>No.</b> P(S and B) = 0.12 ≠ 0, so a student can be in both."},
  {q:"200 students were asked what phone they use.<table class='u4t'><tr><th></th><th>iPhone</th><th>Android</th><th>Total</th></tr><tr><th>Junior</th><td>62</td><td>38</td><td>100</td></tr><tr><th>Senior</th><td>70</td><td>30</td><td>100</td></tr><tr><th>Total</th><td>132</td><td>68</td><td>200</td></tr></table>Find: (a) P(iPhone) (b) P(Junior and Android) (c) P(Junior or Android) (d) P(Android | Senior) (e) P(Senior | Android) (f) Are “Senior” and “Android” independent? Justify.",
   a:"(a) 132/200 = <b>0.66</b><br>(b) 38/200 = <b>0.19</b><br>(c) (100 + 68 − 38)/200 = 130/200 = <b>0.65</b><br>(d) Look only at the Senior row: 30/100 = <b>0.30</b><br>(e) Look only at the Android column: 30/68 ≈ <b>0.441</b><br>(f) P(Android) = 68/200 = 0.34, but P(Android | Senior) = 0.30. Since 0.30 ≠ 0.34, knowing the student is a senior changes the probability, so the events are <b>not independent</b>.<br><i>Notice:</i> (d) and (e) are different. The “given” part decides the denominator."},
  {q:"P(A) = 0.5, P(B) = 0.4 and P(A and B) = 0.15. Find (a) P(A | B) (b) P(B | A) (c) P(A or B). (d) Are A and B independent?",
   a:"(a) P(A | B) = 0.15/0.4 = <b>0.375</b><br>(b) P(B | A) = 0.15/0.5 = <b>0.30</b><br>(c) 0.5 + 0.4 − 0.15 = <b>0.75</b><br>(d) P(A)·P(B) = 0.5 × 0.4 = 0.20 ≠ 0.15, so A and B are <b>not independent</b>. (Also P(A | B) = 0.375 ≠ P(A) = 0.5.)"},
  {q:"A basketball player makes 80% of her free throws, and shots are independent. (a) P(makes both of 2 shots)? (b) P(misses both)? (c) P(makes exactly one)? (d) In 5 shots, what is P(she misses at least one)?",
   a:"(a) 0.8 × 0.8 = <b>0.64</b><br>(b) 0.2 × 0.2 = <b>0.04</b><br>(c) Make-miss or miss-make: 2(0.8)(0.2) = <b>0.32</b>. Check: 0.64 + 0.04 + 0.32 = 1.<br>(d) P(at least one miss) = 1 − P(makes all 5) = 1 − 0.8<sup>5</sup> = 1 − 0.32768 ≈ <b>0.672</b>."},
  {q:"<b>Tree diagram.</b> 2% of people have a certain condition. A test is positive for 95% of people who have it, and (falsely) positive for 8% of people who do not. (a) Find P(test positive). (b) A person tests positive. What is the probability they actually have the condition?",
   a:"Draw the tree: Has it (0.02) → positive 0.95; Doesn't (0.98) → positive 0.08.<br>(a) P(+) = (0.02)(0.95) + (0.98)(0.08) = 0.019 + 0.0784 = <b>0.0974</b><br>(b) P(has | +) = P(has and +)/P(+) = 0.019/0.0974 ≈ <b>0.195</b><br><i>Interpretation:</i> only about 19.5% of people who test positive actually have the condition, because the condition is rare and false positives come from the large “doesn't have it” group."},
  {q:"A bag has 5 red and 3 blue marbles. Draw 2 marbles <b>without replacement</b>. Find (a) P(both red) (b) P(one red and one blue).",
   a:"(a) P(R, R) = (5/8)(4/7) = 20/56 ≈ <b>0.357</b>. The second probability changes because one red is gone (not independent).<br>(b) P(R then B) + P(B then R) = (5/8)(3/7) + (3/8)(5/7) = 30/56 ≈ <b>0.536</b>."},
  {q:"Each flight on an airline is late with probability 0.15, independently. You take 4 flights. What is P(at least one is late)?",
   a:"P(at least one late) = 1 − P(none late) = 1 − (0.85)<sup>4</sup> = 1 − 0.5220 ≈ <b>0.478</b>."},
  {q:"Events A and B have P(A) = 0.3 and P(B) = 0.5 and are mutually exclusive. (a) Find P(A or B). (b) Can A and B also be independent? Explain.",
   a:"(a) 0.3 + 0.5 = <b>0.8</b><br>(b) <b>No.</b> Mutually exclusive means P(A and B) = 0, but independence would need P(A and B) = (0.3)(0.5) = 0.15. If A happens, B cannot happen, so knowing A changes P(B) to 0. Events with nonzero probabilities can never be both mutually exclusive and independent."},
  {q:"<b>Venn diagram.</b> P(A) = 0.60, P(B) = 0.45 and P(A or B) = 0.80. Find (a) P(A and B) (b) P(A only) (c) P(neither).",
   a:"(a) 0.80 = 0.60 + 0.45 − P(A and B), so P(A and B) = <b>0.25</b><br>(b) A only = 0.60 − 0.25 = <b>0.35</b><br>(c) Neither = 1 − 0.80 = <b>0.20</b>"}
 ]
},
{
 title:"Extra Practice Set 2: Random Variables",
 sub:"Probability distributions, expected value, standard deviation, transforming and combining random variables",
 formulas:[
  F("Valid distribution","every 0 ≤ p<sub>i</sub> ≤ 1 and Σ p<sub>i</sub> = 1"),
  F("Mean (expected value)","μ<sub>X</sub> = Σ x<sub>i</sub> p<sub>i</sub>"),
  F("Variance & SD","σ<sub>X</sub><sup>2</sup> = Σ (x<sub>i</sub> − μ<sub>X</sub>)<sup>2</sup> p<sub>i</sub>,  σ<sub>X</sub> = √σ<sub>X</sub><sup>2</sup>"),
  F("Linear transformation Y = a + bX","μ<sub>Y</sub> = a + bμ<sub>X</sub>,  σ<sub>Y</sub> = |b|σ<sub>X</sub> (shape unchanged)"),
  F("Sum / difference","μ<sub>X±Y</sub> = μ<sub>X</sub> ± μ<sub>Y</sub>"),
  F("Independent X, Y","σ<sup>2</sup><sub>X±Y</sub> = σ<sub>X</sub><sup>2</sup> + σ<sub>Y</sub><sup>2</sup> (variances ADD, even for a difference)"),
  F("Normal","If X and Y are independent and normal, X ± Y is normal too. Use z = (x − μ)/σ or normalcdf.")
 ],
 probs:[
  {q:"Let X = number of pets in a randomly chosen household.<table class='u4t'><tr><th>x</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td></tr><tr><th>P(X = x)</th><td>0.25</td><td>0.35</td><td>0.22</td><td>0.12</td><td>?</td></tr></table>(a) Find P(X = 4). (b) Find P(X ≥ 2). (c) Find P(X < 2).",
   a:"(a) Probabilities must add to 1: 1 − (0.25 + 0.35 + 0.22 + 0.12) = <b>0.06</b><br>(b) 0.22 + 0.12 + 0.06 = <b>0.40</b><br>(c) 0.25 + 0.35 = <b>0.60</b> (or 1 − 0.40)"},
  {q:"Use the pets distribution from Problem 1. (a) Find the mean μ<sub>X</sub> and interpret it. (b) Find the standard deviation σ<sub>X</sub> and interpret it.",
   a:"(a) μ = 0(0.25) + 1(0.35) + 2(0.22) + 3(0.12) + 4(0.06) = <b>1.39 pets</b>. If we chose many, many households at random, the average number of pets would be about 1.39.<br>(b) σ<sup>2</sup> = Σ(x − 1.39)<sup>2</sup>p = 1.3379, so σ ≈ <b>1.157 pets</b>. The number of pets in a randomly chosen household typically varies from the mean of 1.39 by about 1.16 pets.<br><i>Calculator:</i> put x in L1, p in L2, then 1-Var Stats L1, L2."},
  {q:"A school game costs $5 to play. You win $50 with probability 0.05, win $10 with probability 0.15, and win nothing otherwise. Let X = net gain (winnings minus the $5 cost). (a) Write the probability distribution of X. (b) Find E(X) and interpret it. (c) Find σ<sub>X</sub>.",
   a:"(a) X = $45 (p = 0.05), X = $5 (p = 0.15), X = −$5 (p = 0.80)<br>(b) E(X) = 45(0.05) + 5(0.15) − 5(0.80) = 2.25 + 0.75 − 4 = <b>−$1.00</b>. Over many games, a player loses $1.00 per game on average (the school gains).<br>(c) σ<sup>2</sup> = (45+1)<sup>2</sup>(0.05) + (5+1)<sup>2</sup>(0.15) + (−5+1)<sup>2</sup>(0.80) = 105.8 + 5.4 + 12.8 = 124, so σ ≈ <b>$11.14</b>."},
  {q:"The number of hours X a student works per week has mean 12 hours and SD 3 hours. She earns $15 per hour plus a $20 weekly bonus, so pay Y = 20 + 15X. Find the mean and SD of Y.",
   a:"μ<sub>Y</sub> = 20 + 15(12) = <b>$200</b><br>σ<sub>Y</sub> = 15(3) = <b>$45</b><br>Adding $20 shifts the mean but does <b>not</b> change the spread. Multiplying by 15 multiplies both the mean and the SD."},
  {q:"Daily high temperatures in a city have mean 25 °C and SD 4 °C. Use F = 32 + 1.8C to find the mean and SD in °F.",
   a:"μ<sub>F</sub> = 32 + 1.8(25) = <b>77 °F</b><br>σ<sub>F</sub> = 1.8(4) = <b>7.2 °F</b> (the +32 does not affect spread)."},
  {q:"Shower time X has mean 10 min and SD 3 min. Getting-dressed time Y has mean 8 min and SD 2 min. X and Y are independent. (a) Find the mean and SD of the total time T = X + Y. (b) Find the mean and SD of the difference D = X − Y.",
   a:"(a) μ<sub>T</sub> = 10 + 8 = <b>18 min</b>; σ<sub>T</sub> = √(3<sup>2</sup> + 2<sup>2</sup>) = √13 ≈ <b>3.61 min</b><br>(b) μ<sub>D</sub> = 10 − 8 = <b>2 min</b>; σ<sub>D</sub> = √(3<sup>2</sup> + 2<sup>2</sup>) = √13 ≈ <b>3.61 min</b><br><i>Key idea:</i> variances add for a difference too. Never subtract SDs and never add SDs directly."},
  {q:"Apple weights are approximately normal with mean 150 g and SD 12 g. A box holds 6 randomly chosen apples (independent) and the empty box weighs 200 g. (a) Find the mean and SD of the total weight T. (b) Find P(T > 1150 g).",
   a:"(a) μ<sub>T</sub> = 200 + 6(150) = <b>1100 g</b>; σ<sub>T</sub> = √(6 · 12<sup>2</sup>) = 12√6 ≈ <b>29.39 g</b> (the box weight is constant, so it adds no variability)<br>(b) T is normal. z = (1150 − 1100)/29.39 ≈ 1.70, so P(T > 1150) ≈ <b>0.0445</b>.<br><i>Calculator:</i> normalcdf(lower:1150, upper:10^99, μ:1100, σ:29.39)."},
  {q:"Ana's 5K time is N(20 min, 1.5 min) and Ben's is N(21 min, 2 min), independent. What is the probability that Ana finishes faster than Ben?",
   a:"Let D = A − B. Ana is faster when D < 0.<br>μ<sub>D</sub> = 20 − 21 = −1; σ<sub>D</sub> = √(1.5<sup>2</sup> + 2<sup>2</sup>) = √6.25 = 2.5<br>z = (0 − (−1))/2.5 = 0.4, so P(D < 0) ≈ <b>0.655</b>."},
  {q:"X has mean 50 and SD 6. Compare (a) 2X (double one value) with (b) X<sub>1</sub> + X<sub>2</sub> (add two independent values of X). Do they have the same mean? The same SD?",
   a:"Both have mean <b>100</b>.<br>(a) SD of 2X = 2(6) = <b>12</b><br>(b) SD of X<sub>1</sub> + X<sub>2</sub> = √(36 + 36) = √72 ≈ <b>8.49</b><br>Two independent values partly cancel each other's highs and lows, so the sum varies less than doubling one value."},
  {q:"Using the pets distribution (μ = 1.39), find the probability that a randomly chosen household has more pets than the mean.",
   a:"X > 1.39 means X = 2, 3 or 4: 0.22 + 0.12 + 0.06 = <b>0.40</b>. (X is discrete, so “more than 1.39” starts at 2.)"}
 ]
},
{
 title:"Extra Practice Set 3: Binomial Distributions",
 sub:"BINS conditions, binomial formula, binompdf / binomcdf, mean and SD, unusual outcomes",
 formulas:[
  F("BINS conditions","<b>B</b>inary (success/failure) · <b>I</b>ndependent trials · fixed <b>N</b>umber of trials n · same probability of <b>S</b>uccess p"),
  F("10% condition","When sampling without replacement, n ≤ 10% of the population keeps trials approximately independent"),
  F("Binomial probability","P(X = k) = <sub>n</sub>C<sub>k</sub> · p<sup>k</sup> (1 − p)<sup>n−k</sup>"),
  F("Mean & SD","μ<sub>X</sub> = np,  σ<sub>X</sub> = √(np(1 − p))"),
  F("Calculator","P(X = k): binompdf(n, p, k) · P(X ≤ k): binomcdf(n, p, k) · P(X ≥ k) = 1 − binomcdf(n, p, k − 1)"),
  F("Shape","Approximately normal when np ≥ 10 and n(1 − p) ≥ 10 (Large Counts)")
 ],
 probs:[
  {q:"Is X binomial? If yes, give n and p. If no, say which condition fails. (a) X = number of sixes in 10 rolls of a fair die. (b) X = number of cards drawn from a deck until you get an ace. (c) Choose 5 students from a class of 30 (15 girls) without replacement; X = number of girls.",
   a:"(a) <b>Binomial</b>: n = 10, p = 1/6 (six or not, independent rolls, fixed n, same p).<br>(b) <b>Not binomial</b>: there is no fixed number of trials (you stop at the first ace).<br>(c) <b>Not binomial</b>: sampling without replacement and 5 is more than 10% of 30, so trials are not independent (p changes after each pick)."},
  {q:"A player makes 70% of free throws (independent). She shoots 8. Let X = number made. (a) Find P(X = 6) using the formula. (b) Find P(X ≥ 6). (c) Find the mean and SD of X and interpret the mean.",
   a:"(a) P(X = 6) = <sub>8</sub>C<sub>6</sub>(0.7)<sup>6</sup>(0.3)<sup>2</sup> = 28(0.117649)(0.09) ≈ <b>0.296</b><br>(b) P(X ≥ 6) = 1 − binomcdf(8, 0.7, 5) ≈ <b>0.552</b><br>(c) μ = 8(0.7) = <b>5.6 shots</b>; σ = √(8 · 0.7 · 0.3) = √1.68 ≈ <b>1.30 shots</b>. If she shot many sets of 8 free throws, she would make 5.6 per set on average."},
  {q:"A student guesses on all 20 questions of a multiple-choice test with 5 choices each. Let X = number correct. (a) Find the mean and SD of X. (b) Find P(X = 0). (c) Find P(X ≥ 8). Would 8 or more correct be surprising for a guesser?",
   a:"n = 20, p = 0.2<br>(a) μ = 20(0.2) = <b>4</b>; σ = √(20 · 0.2 · 0.8) = √3.2 ≈ <b>1.79</b><br>(b) P(X = 0) = 0.8<sup>20</sup> ≈ <b>0.0115</b><br>(c) P(X ≥ 8) = 1 − binomcdf(20, 0.2, 7) ≈ <b>0.032</b>. <b>Yes</b>, this would be surprising: only about a 3.2% chance by guessing alone."},
  {q:"3% of phone chargers from a factory are defective. An inspector randomly selects 50 from a large shipment. (a) Expected number defective? (b) P(no defects)? (c) P(at most 2 defects)? (d) P(more than 2)?",
   a:"n = 50, p = 0.03 (the shipment is large, so the 10% condition is met)<br>(a) μ = 50(0.03) = <b>1.5 chargers</b><br>(b) 0.97<sup>50</sup> ≈ <b>0.218</b><br>(c) binomcdf(50, 0.03, 2) ≈ <b>0.811</b><br>(d) 1 − 0.811 = <b>0.189</b>"},
  {q:"By hand: n = 5, p = 0.4. Find (a) P(X = 2) (b) P(X ≤ 1).",
   a:"(a) <sub>5</sub>C<sub>2</sub>(0.4)<sup>2</sup>(0.6)<sup>3</sup> = 10(0.16)(0.216) = <b>0.3456</b><br>(b) P(X = 0) + P(X = 1) = (0.6)<sup>5</sup> + 5(0.4)(0.6)<sup>4</sup> = 0.07776 + 0.2592 = <b>0.33696</b>"},
  {q:"35% of adults in a city prefer a new bus route. A random sample of 120 adults is taken. (a) Find the mean and SD of the number who prefer it. (b) Is the distribution approximately normal? Check. (c) Would 55 or more be unusual? Justify with a probability.",
   a:"(a) μ = 120(0.35) = <b>42</b>; σ = √(120 · 0.35 · 0.65) = √27.3 ≈ <b>5.22</b><br>(b) np = 42 ≥ 10 and n(1 − p) = 78 ≥ 10, so <b>yes</b>, approximately normal.<br>(c) P(X ≥ 55) = 1 − binomcdf(120, 0.35, 54) ≈ <b>0.009</b>. Yes, very unusual (55 is about z = 2.49 SDs above the mean). Getting 55 or more would suggest the true proportion is greater than 35%."},
  {q:"About 7% of people have type O-negative blood. At a blood drive, 15 random donors arrive. (a) P(at least one is O-negative)? (b) Expected number of O-negative donors?",
   a:"(a) 1 − P(none) = 1 − (0.93)<sup>15</sup> ≈ <b>0.663</b><br>(b) μ = 15(0.07) = <b>1.05 donors</b>"},
  {q:"Roll a fair die 10 times; X = number of sixes. (a) Find P(X = 3). (b) Find P(X ≥ 2). (c) Explain why P(X ≥ 2) is NOT 1 − binomcdf(10, 1/6, 2).",
   a:"(a) binompdf(10, 1/6, 3) ≈ <b>0.155</b><br>(b) 1 − binomcdf(10, 1/6, 1) ≈ <b>0.515</b><br>(c) binomcdf(10, 1/6, 2) = P(X ≤ 2) includes X = 2. The complement of X ≥ 2 is X ≤ <b>1</b>, so you must use k − 1 = 1."}
 ]
}
];

const CSS = `
.u4wrap{margin:26px 0 8px}
.u4wrap>h3{margin:0 0 4px;color:var(--c);font-size:22px}
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
.u4bar span{font-size:14px;font-style:italic;color:#555}
ol.u4probs{margin:0;padding-left:24px}
ol.u4probs>li{margin:0 0 14px;font-size:16px;line-height:1.45}
details.u4ans{margin-top:6px}
details.u4ans>summary{cursor:pointer;color:var(--c);font-weight:600;font-size:14.5px}
details.u4ans>div{border-left:3px solid var(--c);padding:6px 10px;margin-top:4px;background:#fafafa}
table.u4t{border-collapse:collapse;margin:8px 0;font-size:15px}
table.u4t th,table.u4t td{border:1px solid #999;padding:3px 10px;text-align:center}
table.u4t th{background:#f2f2f2}
@media (max-width:640px){.u4f{grid-template-columns:1fr;gap:0}}
@media print{details.u4set{break-inside:auto}}
`;

function html(){
  return `<div class="u4wrap"><h3>Extra Practice Problems (with formulas)</h3><p class="sub" style="margin:0">Work each problem on paper first. Answers and explanations stay hidden until your teacher reveals them.</p>` +
  SETS.map((s,i)=>`<details class="u4set" data-set="${i}"><summary>${s.title}<small>${s.sub} · ${s.probs.length} problems</small></summary><div class="u4body">
   <div class="u4formulas"><h4>Formulas you need</h4>${s.formulas.join("")}</div>
   <div class="u4bar"><button type="button" data-u4="show">Show all answers</button><button type="button" data-u4="hide">Hide all answers</button><button type="button" data-u4="print">Print this set (no answers)</button></div>
   <ol class="u4probs">${s.probs.map(p=>`<li>${p.q}<details class="u4ans"><summary>Show answer &amp; explanation</summary><div>${p.a}</div></details></li>`).join("")}</ol>
  </div></details>`).join("") + `</div>`;
}

function bind(root){
  if(!document.getElementById("u4css")){ const st=document.createElement("style"); st.id="u4css"; st.textContent=CSS; document.head.appendChild(st); }
  root.querySelectorAll("details.u4set .u4bar button").forEach(b=>b.onclick=()=>{
    const set=b.closest("details.u4set"), act=b.dataset.u4;
    if(act==="show") set.querySelectorAll("details.u4ans").forEach(d=>d.open=true);
    if(act==="hide") set.querySelectorAll("details.u4ans").forEach(d=>d.open=false);
    if(act==="print"){
      const s=SETS[+set.dataset.set];
      const w=window.open("","_blank"); if(!w) return;
      w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${s.title}</title><style>body{font-family:Georgia,serif;max-width:760px;margin:30px auto;line-height:1.5;padding:0 16px}${CSS}.u4f{grid-template-columns:200px 1fr}li{margin-bottom:60px!important}</style></head><body style="--c:#b03a2e"><p>Name: ____________________ &nbsp; Date: __________ &nbsp; Period: ____</p><h2>${s.title}</h2><p><i>${s.sub}</i></p><div class="u4formulas"><h4>Formulas you need</h4>${s.formulas.join("")}</div><ol class="u4probs">${s.probs.map(p=>`<li>${p.q}</li>`).join("")}</ol><p style="font-size:12px;color:#666">AP Statistics · Zogovic</p></body></html>`);
      w.document.close(); setTimeout(()=>{ try{w.print();}catch(e){} },300);
    }
  });
}
window.U4SETS = {html, bind, sets:SETS};
})();
