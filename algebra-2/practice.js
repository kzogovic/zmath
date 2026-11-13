// Algebra 2 Honors practice sets (Mrs. Zogovic). Try each problem first, then open the solution.
(function(){
const SETS = [
/* ============================ UNIT 1 ============================ */
{unit:"unit-1", title:"Set 1A: Absolute Value Equations & Inequalities",
 sub:"Isolate, split into two cases, check for extraneous answers, “and” vs “or”",
 formulas:[
  ["Equation","|A| = b (b ≥ 0) → A = b or A = -b. If b < 0, there is no solution."],
  ["Less than (“and”)","|A| < b → -b < A < b. The answer is <i>between</i> two numbers."],
  ["Greater than (“or”)","|A| > b → A < -b or A > b. The answer is <i>outside</i> two numbers."],
  ["Always first","Isolate the absolute value before splitting. When x is on both sides, check every answer."]
 ],
 probs:[
  ["Solve |x - 4| = 9.",
   "<b>Step 1.</b> The absolute value is already alone, so split into two cases.<br>Case 1: x - 4 = 9 → x = 13<br>Case 2: x - 4 = -9 → x = -5<br><b>Check:</b> |13 - 4| = 9 ✓ and |-5 - 4| = |-9| = 9 ✓<br><b>Answer: x = -5 or x = 13</b><br><i>Why two answers?</i> |x - 4| means “the distance from x to 4.” Both 13 and -5 are 9 units from 4."],
  ["Solve 3|2x + 1| - 5 = 16.",
   "<b>Step 1. Isolate the absolute value.</b> Add 5: 3|2x + 1| = 21. Divide by 3: |2x + 1| = 7.<br><b>Step 2. Split.</b><br>2x + 1 = 7 → 2x = 6 → x = 3<br>2x + 1 = -7 → 2x = -8 → x = -4<br><b>Answer: x = -4 or x = 3</b><br><i>Common mistake:</i> splitting before isolating, e.g. writing 3(2x + 1) - 5 = -16. Always get |…| alone first."],
  ["Solve |5x - 2| + 8 = 3.",
   "Isolate: |5x - 2| = 3 - 8 = -5.<br>An absolute value is a distance, so it can never be negative.<br><b>Answer: no solution (∅)</b>"],
  ["Solve |x + 3| = 2x.",
   "Case 1: x + 3 = 2x → x = 3<br>Case 2: x + 3 = -2x → 3x = -3 → x = -1<br><b>Check both</b> (x is on both sides, so answers can be extraneous):<br>x = 3: |6| = 6 and 2(3) = 6 ✓<br>x = -1: |2| = 2 but 2(-1) = -2 ✗ (an absolute value can't equal a negative number)<br><b>Answer: x = 3 only</b> (x = -1 is extraneous)"],
  ["Solve |2x - 3| = |x + 6|.",
   "Two absolute values are equal when the insides are equal or opposites.<br>Case 1: 2x - 3 = x + 6 → x = 9<br>Case 2: 2x - 3 = -(x + 6) → 2x - 3 = -x - 6 → 3x = -3 → x = -1<br><b>Check:</b> x = 9: |15| = |15| ✓ &nbsp; x = -1: |-5| = |5| ✓<br><b>Answer: x = -1 or x = 9</b>"],
  ["Solve |x - 2| < 5. Write the answer as an inequality and in interval notation.",
   "“Less than” means <b>between</b>: -5 < x - 2 < 5.<br>Add 2 to all three parts: -3 < x < 7.<br><b>Answer: -3 < x < 7, or (-3, 7)</b><br>Graph: open circles at -3 and 7, shade between."],
  ["Solve |3x + 4| ≥ 10.",
   "“Greater than” means <b>outside</b>, so split with “or”:<br>3x + 4 ≤ -10 → 3x ≤ -14 → x ≤ -14/3<br>3x + 4 ≥ 10 → 3x ≥ 6 → x ≥ 2<br><b>Answer: x ≤ -14/3 or x ≥ 2, or (-∞, -14/3] ∪ [2, ∞)</b>"],
  ["Solve -2|x + 1| + 7 > 1.",
   "Subtract 7: -2|x + 1| > -6.<br>Divide by -2 and <b>flip the sign</b>: |x + 1| < 3.<br>Between: -3 < x + 1 < 3 → -4 < x < 2.<br><b>Answer: -4 < x < 2, or (-4, 2)</b>"],
  ["Solve each: (a) |4 - x| ≤ -2 &nbsp; (b) |4 - x| > -2",
   "(a) An absolute value is never negative, so it can never be ≤ -2. <b>No solution.</b><br>(b) An absolute value is always ≥ 0, which is always greater than -2. <b>All real numbers.</b><br><i>Tip:</i> when the right side is negative, don't split. Think about what the absolute value can be."],
  ["A machine fills cereal boxes with 16 oz. A box is acceptable if its weight w is within 0.3 oz of 16 oz. Write and solve an absolute value inequality.",
   "“Within 0.3 of 16” means the distance from w to 16 is at most 0.3: <b>|w - 16| ≤ 0.3</b>.<br>-0.3 ≤ w - 16 ≤ 0.3 → 15.7 ≤ w ≤ 16.3<br><b>Answer: acceptable boxes weigh from 15.7 oz to 16.3 oz.</b>"],
  ["Write an absolute value inequality whose solution is 3 ≤ x ≤ 11.",
   "<b>Step 1. Center:</b> the midpoint is (3 + 11)/2 = 7.<br><b>Step 2. Radius:</b> the distance from 7 to either end is 4.<br><b>Answer: |x - 7| ≤ 4</b><br>Check: -4 ≤ x - 7 ≤ 4 → 3 ≤ x ≤ 11 ✓"]
 ]},

{unit:"unit-1", title:"Set 1B: Equations of Lines",
 sub:"Slope, slope-intercept, point-slope, standard form, parallel and perpendicular lines",
 formulas:[
  ["Slope","m = (y₂ - y₁)/(x₂ - x₁)  (rise over run)"],
  ["Slope-intercept","y = mx + b, where b is the y-intercept"],
  ["Point-slope","y - y₁ = m(x - x₁)"],
  ["Standard form","Ax + By = C; slope = -A/B"],
  ["Parallel / perpendicular","Parallel: same slope. Perpendicular: negative reciprocals (m₁ · m₂ = -1)."],
  ["Special lines","Horizontal y = k (slope 0). Vertical x = h (slope undefined)."]
 ],
 probs:[
  ["Find the slope of the line through (-2, 5) and (4, -7).",
   "m = (y₂ - y₁)/(x₂ - x₁) = (-7 - 5)/(4 - (-2)) = -12/6 = <b>-2</b><br>Watch the double negative: 4 - (-2) = 6."],
  ["Write the equation of the line through (3, -1) with slope 2/3 in slope-intercept form.",
   "Point-slope: y - (-1) = (2/3)(x - 3) → y + 1 = (2/3)x - 2<br>Subtract 1: <b>y = (2/3)x - 3</b>"],
  ["Write the equation of the line through (-1, 4) and (2, 13).",
   "<b>Slope:</b> m = (13 - 4)/(2 - (-1)) = 9/3 = 3<br><b>Point-slope:</b> y - 4 = 3(x + 1) → y = 3x + 3 + 4<br><b>Answer: y = 3x + 7</b><br>Check with (2, 13): 3(2) + 7 = 13 ✓"],
  ["For 4x - 3y = 12, find the slope, the x-intercept and the y-intercept.",
   "<b>Slope:</b> solve for y: -3y = -4x + 12 → y = (4/3)x - 4, so m = <b>4/3</b>.<br><b>x-intercept</b> (let y = 0): 4x = 12 → x = 3 → <b>(3, 0)</b><br><b>y-intercept</b> (let x = 0): -3y = 12 → y = -4 → <b>(0, -4)</b>"],
  ["Write the equation of the line parallel to y = -5x + 2 through (1, 6).",
   "Parallel → same slope, m = -5.<br>y - 6 = -5(x - 1) → y = -5x + 5 + 6<br><b>Answer: y = -5x + 11</b>"],
  ["Write the equation of the line perpendicular to 2x + 5y = 10 through (4, -3).",
   "<b>Slope of the given line:</b> 5y = -2x + 10 → y = (-2/5)x + 2, so m = -2/5.<br><b>Perpendicular slope:</b> flip and change sign → 5/2.<br>y + 3 = (5/2)(x - 4) → y = (5/2)x - 10 - 3<br><b>Answer: y = (5/2)x - 13</b>"],
  ["Write the equations of the horizontal line and the vertical line through (-3, 8).",
   "Horizontal: every point has y = 8 → <b>y = 8</b><br>Vertical: every point has x = -3 → <b>x = -3</b>"],
  ["A plumber charges a fixed fee plus an hourly rate. A 2-hour job costs $190 and a 5-hour job costs $385. Write a linear model C(h) and explain what the slope and intercept mean.",
   "Points: (2, 190) and (5, 385).<br><b>Slope:</b> (385 - 190)/(5 - 2) = 195/3 = 65 dollars per hour.<br><b>Intercept:</b> 190 = 65(2) + b → b = 60.<br><b>Answer: C(h) = 65h + 60</b>. The plumber charges a $60 fixed fee plus $65 per hour."],
  ["Are the lines 3x - 6y = 4 and y = -2x + 1 parallel, perpendicular, or neither?",
   "First line: -6y = -3x + 4 → y = (1/2)x - 2/3, slope 1/2.<br>Second line: slope -2.<br>Product: (1/2)(-2) = -1.<br><b>Answer: perpendicular.</b>"]
 ]},

{unit:"unit-1", title:"Set 1C: Systems in Three Variables",
 sub:"Elimination, special cases (no solution, infinitely many), word problems, a parabola through three points",
 formulas:[
  ["Step 1","Choose one variable to eliminate. Use two different pairs of equations to eliminate it."],
  ["Step 2","You now have a 2 × 2 system. Solve it."],
  ["Step 3","Back-substitute to find the third variable. Check in all three original equations."],
  ["Special cases","0 = (nonzero number) → no solution. 0 = 0 → infinitely many solutions."]
 ],
 probs:[
  ["Solve: x + y + z = 6, &nbsp; 2x - y + z = 3, &nbsp; x + 2y - z = 2.",
   "Label the equations (1), (2), (3). Eliminate z.<br>(1) + (3): 2x + 3y = 8 &nbsp; (A)<br>(2) + (3): 3x + y = 5 &nbsp; (B)<br>From (B): y = 5 - 3x. Substitute into (A): 2x + 3(5 - 3x) = 8 → 2x + 15 - 9x = 8 → -7x = -7 → x = 1.<br>y = 5 - 3(1) = 2. From (1): z = 6 - 1 - 2 = 3.<br><b>Answer: (1, 2, 3)</b><br>Check (2): 2 - 2 + 3 = 3 ✓ &nbsp; Check (3): 1 + 4 - 3 = 2 ✓"],
  ["Solve: 2x + y - z = 3, &nbsp; x - 2y + 3z = 10, &nbsp; 3x + y + 2z = 9.",
   "Eliminate y.<br>2·(1) + (2): 4x + 2y - 2z + x - 2y + 3z = 6 + 10 → 5x + z = 16 &nbsp; (A)<br>(3) - (1): x + 3z = 6 &nbsp; (B)<br>From (A): z = 16 - 5x. Into (B): x + 3(16 - 5x) = 6 → x + 48 - 15x = 6 → -14x = -42 → x = 3.<br>z = 16 - 15 = 1. From (1): 6 + y - 1 = 3 → y = -2.<br><b>Answer: (3, -2, 1)</b>"],
  ["Solve: x + 2y + 3z = 4, &nbsp; 2x + 4y + 6z = 10, &nbsp; x - y + z = 2.",
   "(2) - 2·(1): (2x + 4y + 6z) - (2x + 4y + 6z) = 10 - 8 → 0 = 2.<br>That is false, so the system is inconsistent.<br><b>Answer: no solution.</b> Equations (1) and (2) are parallel planes; they never meet."],
  ["Solve: x + y + z = 2, &nbsp; x - y + 2z = 3, &nbsp; 2x + 3z = 5.",
   "(1) + (2): 2x + 3z = 5, which is exactly equation (3).<br>Equation (3) gives no new information, so there are <b>infinitely many solutions</b>.<br>Describe them: let z = t. Then x = (5 - 3t)/2 and y = 2 - x - z = (t - 1)/2.<br><b>Answer: ((5 - 3t)/2, (t - 1)/2, t) for any real t.</b> For example, t = 1 gives (1, 0, 1)."],
  ["Solve: x + y = 5, &nbsp; y + z = 8, &nbsp; x + z = 9.",
   "Shortcut: add all three equations: 2x + 2y + 2z = 22 → x + y + z = 11.<br>z = 11 - (x + y) = 11 - 5 = 6<br>x = 11 - (y + z) = 11 - 8 = 3<br>y = 11 - (x + z) = 11 - 9 = 2<br><b>Answer: (3, 2, 6)</b>"],
  ["A school play sold 200 tickets: adult $12, student $8, child $5. Revenue was $1,780, and twice as many student tickets as adult tickets were sold. How many of each?",
   "Let a, s, c be the numbers of tickets.<br>a + s + c = 200 &nbsp; 12a + 8s + 5c = 1780 &nbsp; s = 2a<br>Substitute s = 2a: 3a + c = 200 → c = 200 - 3a.<br>12a + 8(2a) + 5(200 - 3a) = 1780 → 28a + 1000 - 15a = 1780 → 13a = 780 → a = 60.<br>s = 120, c = 200 - 180 = 20.<br><b>Answer: 60 adult, 120 student, 20 child tickets.</b> Check: 720 + 960 + 100 = 1780 ✓"],
  ["Find a, b and c so the parabola y = ax^2 + bx + c passes through (1, 4), (-1, 8) and (2, 5).",
   "Substitute each point:<br>(1, 4): a + b + c = 4<br>(-1, 8): a - b + c = 8<br>(2, 5): 4a + 2b + c = 5<br>Subtract the first two: 2b = -4 → b = -2. Then a + c = 6 and 4a + c = 9. Subtract: 3a = 3 → a = 1, c = 5.<br><b>Answer: y = x^2 - 2x + 5</b>"]
 ]},

{unit:"unit-1", title:"Set 1D: Piecewise Functions",
 sub:"Evaluating, domain and range, continuity, absolute value and step functions",
 formulas:[
  ["Evaluate","Find which interval contains x, then use only that piece."],
  ["Endpoints","< or > → open circle. ≤ or ≥ → closed circle."],
  ["Continuous at a break","The two pieces give the same y-value at the break point."],
  ["Absolute value","|x| = x if x ≥ 0, and -x if x < 0"],
  ["Greatest integer","⌊x⌋ = the greatest integer less than or equal to x (round down)"]
 ],
 probs:[
  ["f(x) = { 2x + 1 if x < 0; &nbsp; x^2 if 0 ≤ x ≤ 3; &nbsp; 10 - x if x > 3 }. Find f(-4), f(0), f(3) and f(5).",
   "f(-4): -4 < 0, so use 2x + 1 → 2(-4) + 1 = <b>-7</b><br>f(0): 0 is in 0 ≤ x ≤ 3, so use x^2 → <b>0</b><br>f(3): 3 is in 0 ≤ x ≤ 3, so use x^2 → <b>9</b><br>f(5): 5 > 3, so use 10 - x → <b>5</b>"],
  ["For the same f(x), find the range and say where f is not continuous.",
   "Piece 1 (x < 0): 2x + 1 takes all values below 1 (open circle at (0, 1)) → (-∞, 1)<br>Piece 2 (0 ≤ x ≤ 3): x^2 goes from 0 to 9 → [0, 9]<br>Piece 3 (x > 3): 10 - x takes all values below 7 (open circle at (3, 7)) → (-∞, 7)<br>Union: <b>range (-∞, 9]</b><br><b>Jumps:</b> at x = 0 (left side approaches 1, but f(0) = 0) and at x = 3 (f(3) = 9, but the right side starts near 7)."],
  ["Graph g(x) = { -x + 2 if x ≤ 1; &nbsp; 2x - 3 if x > 1 }. Give the domain and range. Is g continuous?",
   "Piece 1: closed circle at (1, 1), line going up-left with slope -1. Values: y ≥ 1.<br>Piece 2: open circle at (1, -1), line going up-right with slope 2. Values: y > -1.<br><b>Domain: all real numbers.</b> &nbsp; <b>Range: (-1, ∞)</b>, because [1, ∞) ∪ (-1, ∞) = (-1, ∞).<br><b>Not continuous:</b> at x = 1 the pieces give 1 and -1, a jump."],
  ["Write f(x) = |2x - 6| as a piecewise function.",
   "<b>Step 1.</b> Find where the inside is zero: 2x - 6 = 0 → x = 3.<br><b>Step 2.</b> When x ≥ 3 the inside is ≥ 0, so keep it. When x < 3 it is negative, so take the opposite.<br><b>Answer: f(x) = { 2x - 6 if x ≥ 3; &nbsp; -2x + 6 if x < 3 }</b>"],
  ["Find k so that h(x) = { x^2 + k if x < 2; &nbsp; 3x - 1 if x ≥ 2 } is continuous.",
   "For continuity, both pieces must give the same value at x = 2.<br>Left piece: 2^2 + k = 4 + k. Right piece: 3(2) - 1 = 5.<br>4 + k = 5 → <b>k = 1</b>"],
  ["A phone plan costs $40 a month for up to 5 GB of data, plus $10 for each GB over 5. Write C(g) as a piecewise function and find C(3) and C(8).",
   "<b>C(g) = { 40 if 0 ≤ g ≤ 5; &nbsp; 40 + 10(g - 5) if g > 5 }</b><br>C(3) = <b>$40</b> (under the limit)<br>C(8) = 40 + 10(3) = <b>$70</b>"],
  ["Evaluate ⌊2.7⌋, ⌊-1.2⌋, ⌊5⌋, and f(-0.5) for f(x) = ⌊x⌋ + 1.",
   "⌊2.7⌋ = <b>2</b> (round down)<br>⌊-1.2⌋ = <b>-2</b> (down means toward -∞, not toward 0!)<br>⌊5⌋ = <b>5</b><br>f(-0.5) = ⌊-0.5⌋ + 1 = -1 + 1 = <b>0</b>"]
 ]},

{unit:"unit-1", adv:true, title:"Honors Challenge 1: Advanced Unit 1 Problems",
 sub:"Two absolute values, absolute value with x², compound inequalities, parameters, perpendicular bisectors",
 formulas:[
  ["Several absolute values","Find where each inside equals 0. Those points split the number line into intervals; on each interval remove the bars with the correct sign."],
  ["|A| ≤ B with x on the right","-B ≤ A ≤ B, and B must be ≥ 0."],
  ["Perpendicular bisector","Passes through the midpoint ((x₁ + x₂)/2, (y₁ + y₂)/2) with slope = negative reciprocal of the segment's slope."],
  ["Unique solution","A linear system has exactly one solution when elimination never produces 0 = 0 or 0 = c."]
 ],
 probs:[
  ["Solve |x - 1| + |x + 2| = 7.",
   "The insides are 0 at x = 1 and x = -2. That gives three intervals.<br><b>x ≥ 1:</b> (x - 1) + (x + 2) = 7 → 2x + 1 = 7 → x = 3 ✓ (3 ≥ 1)<br><b>-2 ≤ x < 1:</b> -(x - 1) + (x + 2) = 7 → 3 = 7 ✗, no solution here<br><b>x < -2:</b> -(x - 1) - (x + 2) = 7 → -2x - 1 = 7 → x = -4 ✓ (-4 < -2)<br><b>Answer: x = -4 or x = 3</b><br><i>Meaning:</i> the total distance from x to 1 and to -2 is 7."],
  ["Solve |x^2 - 4| = 3x.",
   "The left side is ≥ 0, so 3x ≥ 0 → x ≥ 0.<br>Case 1: x^2 - 4 = 3x → x^2 - 3x - 4 = 0 → (x - 4)(x + 1) = 0 → x = 4 or x = -1<br>Case 2: x^2 - 4 = -3x → x^2 + 3x - 4 = 0 → (x + 4)(x - 1) = 0 → x = -4 or x = 1<br>Keep only x ≥ 0 and check: x = 4: |12| = 12 ✓ &nbsp; x = 1: |-3| = 3 ✓<br><b>Answer: x = 1 or x = 4</b>"],
  ["Solve |2x - 5| ≤ x + 1.",
   "Write it as a compound inequality: -(x + 1) ≤ 2x - 5 ≤ x + 1.<br>Right part: 2x - 5 ≤ x + 1 → x ≤ 6<br>Left part: -x - 1 ≤ 2x - 5 → 4 ≤ 3x → x ≥ 4/3<br>(Any x in this range also makes x + 1 ≥ 0, as required.)<br><b>Answer: 4/3 ≤ x ≤ 6, or [4/3, 6]</b>"],
  ["Solve 1 < |x - 3| ≤ 4.",
   "Both conditions must hold.<br>|x - 3| ≤ 4 → -1 ≤ x ≤ 7<br>|x - 3| > 1 → x < 2 or x > 4<br>Overlap: <b>-1 ≤ x < 2 or 4 < x ≤ 7, i.e. [-1, 2) ∪ (4, 7]</b><br><i>Picture:</i> points whose distance from 3 is more than 1 but at most 4."],
  ["Solve |x + 1| = |x| + 1.",
   "Split at x = -1 and x = 0.<br><b>x ≥ 0:</b> x + 1 = x + 1, always true → every x ≥ 0 works.<br><b>-1 ≤ x < 0:</b> x + 1 = -x + 1 → x = 0, but 0 is not in this interval ✗<br><b>x < -1:</b> -x - 1 = -x + 1 → -1 = 1 ✗<br><b>Answer: x ≥ 0, or [0, ∞)</b>"],
  ["Find k so that the lines kx + 2y = 5 and 3x - (k + 1)y = 4 are perpendicular.",
   "Slopes: first line y = (-k/2)x + 5/2, slope -k/2. Second line: (k + 1)y = 3x - 4, slope 3/(k + 1).<br>Perpendicular: (-k/2) · 3/(k + 1) = -1 → 3k = 2(k + 1) → <b>k = 2</b><br>Check: slopes -1 and 1, product -1 ✓"],
  ["Find the equation of the perpendicular bisector of the segment from A(-2, 1) to B(4, 5).",
   "Midpoint: ((-2 + 4)/2, (1 + 5)/2) = (1, 3)<br>Slope of AB: (5 - 1)/(4 - (-2)) = 4/6 = 2/3 → perpendicular slope -3/2<br>y - 3 = (-3/2)(x - 1) → y = (-3/2)x + 3/2 + 3<br><b>Answer: y = (-3/2)x + 9/2</b>"],
  ["Find a, b and c so that the circle x^2 + y^2 + ax + by + c = 0 passes through (0, 0), (4, 0) and (0, 6). Then find its center and radius.",
   "(0, 0): c = 0<br>(4, 0): 16 + 4a + c = 0 → a = -4<br>(0, 6): 36 + 6b + c = 0 → b = -6<br>Circle: x^2 + y^2 - 4x - 6y = 0. Complete both squares: (x - 2)^2 + (y - 3)^2 = 4 + 9 = 13<br><b>Answer: a = -4, b = -6, c = 0; center (2, 3), radius √13</b>"],
  ["For which values of k does the system x + y + z = 1, &nbsp; x + 2y + 3z = 2, &nbsp; x + 3y + kz = 3 have exactly one solution? What happens otherwise?",
   "(2) - (1): y + 2z = 1 &nbsp; (A)<br>(3) - (1): 2y + (k - 1)z = 2 &nbsp; (B)<br>(B) - 2·(A): (k - 1 - 4)z = 0 → (k - 5)z = 0<br>If k ≠ 5, then z = 0, y = 1, x = 0: <b>exactly one solution (0, 1, 0)</b>.<br>If k = 5, the last equation is 0 = 0: <b>infinitely many solutions</b>."],
  ["Find a and b so f(x) = { x + a if x < 1; &nbsp; bx^2 if 1 ≤ x < 2; &nbsp; 3x + 4 if x ≥ 2 } is continuous everywhere.",
   "At x = 2: b(2)^2 = 3(2) + 4 → 4b = 10 → b = 5/2<br>At x = 1: 1 + a = b(1)^2 = 5/2 → a = 3/2<br><b>Answer: a = 3/2, b = 5/2</b>"],
  ["For g(x) = -2|x - 3| + 4, find the vertex, the x-intercepts, and the area of the triangle formed by the graph and the x-axis.",
   "Vertex: (3, 4), a maximum (the graph opens down).<br>x-intercepts: -2|x - 3| + 4 = 0 → |x - 3| = 2 → x = 1 or x = 5<br>Triangle: base 5 - 1 = 4, height 4 → area (1/2)(4)(4)<br><b>Answer: vertex (3, 4); intercepts (1, 0) and (5, 0); area 8</b>"]
 ]},

/* ============================ UNIT 2 ============================ */
{unit:"unit-2", title:"Factoring Set 2A: GCF & Grouping",
 sub:"Always look for a greatest common factor first; four terms → try grouping",
 formulas:[
  ["Step 1: GCF","Take out the greatest common factor: largest number that divides every coefficient, lowest power of each common variable."],
  ["Count the terms","2 terms → difference of squares or cubes. 3 terms → trinomial. 4 terms → grouping."],
  ["Grouping","ax + ay + bx + by = a(x + y) + b(x + y) = (x + y)(a + b)"],
  ["Finish","Check every factor again: can it factor more? Multiply back to check."]
 ],
 probs:[
  ["Factor 6x^3 + 15x^2.",
   "GCF of 6 and 15 is 3; lowest power of x is x^2. GCF = 3x^2.<br>6x^3 ÷ 3x^2 = 2x &nbsp; 15x^2 ÷ 3x^2 = 5<br><b>Answer: 3x^2(2x + 5)</b>"],
  ["Factor 12a^2b^3 - 18a^3b^2 + 6ab.",
   "GCF: numbers 6; a (lowest power a^1); b (lowest power b^1) → 6ab.<br>12a^2b^3 ÷ 6ab = 2ab^2 &nbsp; -18a^3b^2 ÷ 6ab = -3a^2b &nbsp; 6ab ÷ 6ab = 1<br><b>Answer: 6ab(2ab^2 - 3a^2b + 1)</b><br><i>Don't forget the 1!</i> When a whole term is the GCF, 1 is left behind."],
  ["Factor x(x - 3) + 5(x - 3).",
   "Both terms share the binomial (x - 3). Factor it out like a GCF.<br><b>Answer: (x - 3)(x + 5)</b>"],
  ["Factor x^3 + 4x^2 + 3x + 12.",
   "Four terms → group: (x^3 + 4x^2) + (3x + 12)<br>= x^2(x + 4) + 3(x + 4)<br><b>Answer: (x + 4)(x^2 + 3)</b>. x^2 + 3 doesn't factor over the integers."],
  ["Factor 2x^3 - 6x^2 - 5x + 15.",
   "Group: (2x^3 - 6x^2) + (-5x + 15)<br>= 2x^2(x - 3) - 5(x - 3) ← take out -5 so the binomials match<br><b>Answer: (x - 3)(2x^2 - 5)</b>"],
  ["Factor x^3 - 2x^2 - 9x + 18 completely.",
   "Group: x^2(x - 2) - 9(x - 2) = (x - 2)(x^2 - 9)<br>x^2 - 9 is a difference of squares: (x - 3)(x + 3).<br><b>Answer: (x - 2)(x - 3)(x + 3)</b>"],
  ["Factor 4x^3 + 8x^2 - x - 2 completely.",
   "Group: 4x^2(x + 2) - 1(x + 2) = (x + 2)(4x^2 - 1)<br>4x^2 - 1 = (2x)^2 - 1^2 = (2x - 1)(2x + 1)<br><b>Answer: (x + 2)(2x - 1)(2x + 1)</b>"],
  ["Factor ax + ay - bx - by.",
   "Group: a(x + y) - b(x + y)<br><b>Answer: (x + y)(a - b)</b>"],
  ["Factor 7x^4 - 28x^2 completely.",
   "GCF: 7x^2(x^2 - 4)<br>Difference of squares: x^2 - 4 = (x - 2)(x + 2)<br><b>Answer: 7x^2(x - 2)(x + 2)</b>"],
  ["Factor 3x^2y - 12xy + 9y completely.",
   "GCF: 3y(x^2 - 4x + 3)<br>Trinomial: two numbers that multiply to 3 and add to -4: -1 and -3.<br><b>Answer: 3y(x - 1)(x - 3)</b>"],
  ["Factor x^3 + 2x^2 - 16x - 32 completely.",
   "Group: x^2(x + 2) - 16(x + 2) = (x + 2)(x^2 - 16)<br><b>Answer: (x + 2)(x - 4)(x + 4)</b>"],
  ["Factor 10xy + 15x - 4y - 6.",
   "Group: 5x(2y + 3) - 2(2y + 3)<br><b>Answer: (2y + 3)(5x - 2)</b><br>Check: (2y + 3)(5x - 2) = 10xy - 4y + 15x - 6 ✓"]
 ]},

{unit:"unit-2", title:"Factoring Set 2B: Trinomials x² + bx + c",
 sub:"Find two numbers that multiply to c and add to b",
 formulas:[
  ["The rule","x^2 + bx + c = (x + m)(x + n), where m · n = c and m + n = b"],
  ["c positive","Both numbers have the same sign as b."],
  ["c negative","The numbers have opposite signs; the larger one has the sign of b."],
  ["Prime","If no pair of integers works, the trinomial is prime over the integers."]
 ],
 probs:[
  ["Factor x^2 + 9x + 20.",
   "Need: multiply to 20, add to 9. Pairs of 20: 1·20, 2·10, <b>4·5</b> → 4 + 5 = 9 ✓<br><b>Answer: (x + 4)(x + 5)</b>"],
  ["Factor x^2 - 11x + 28.",
   "c = +28 and b = -11, so both numbers are negative. -4 · -7 = 28 and -4 + -7 = -11 ✓<br><b>Answer: (x - 4)(x - 7)</b>"],
  ["Factor x^2 + 3x - 40.",
   "c is negative → opposite signs; the larger is positive (b = +3). 8 · (-5) = -40, 8 - 5 = 3 ✓<br><b>Answer: (x + 8)(x - 5)</b>"],
  ["Factor x^2 - 4x - 21.",
   "Opposite signs; the larger is negative. -7 · 3 = -21, -7 + 3 = -4 ✓<br><b>Answer: (x - 7)(x + 3)</b>"],
  ["Factor x^2 - 16x + 64.",
   "-8 · -8 = 64 and -8 + -8 = -16 ✓<br><b>Answer: (x - 8)^2</b>, a perfect square trinomial."],
  ["Factor x^2 + x - 56.",
   "Opposite signs; they must differ by 1. 8 · (-7) = -56, 8 - 7 = 1 ✓<br><b>Answer: (x + 8)(x - 7)</b>"],
  ["Factor x^2 - 13x + 36.",
   "Both negative. Factor pairs of 36: 1·36, 2·18, 3·12, <b>4·9</b>, 6·6 → 4 + 9 = 13 ✓<br><b>Answer: (x - 4)(x - 9)</b>"],
  ["Factor x^2 + 5xy - 24y^2.",
   "Same idea with y attached: numbers multiply to -24 and add to 5 → 8 and -3.<br><b>Answer: (x + 8y)(x - 3y)</b>"],
  ["Factor 3x^2 - 6x - 45 completely.",
   "GCF first: 3(x^2 - 2x - 15).<br>Multiply to -15, add to -2: -5 and 3.<br><b>Answer: 3(x - 5)(x + 3)</b>"],
  ["Factor x^2 + 12x + 35.",
   "5 · 7 = 35, 5 + 7 = 12 ✓<br><b>Answer: (x + 5)(x + 7)</b>"],
  ["Factor -x^2 + 2x + 24.",
   "Leading coefficient negative → factor out -1: -(x^2 - 2x - 24).<br>Multiply to -24, add to -2: -6 and 4.<br><b>Answer: -(x - 6)(x + 4)</b>"],
  ["Factor x^2 + 7x + 15, or show it is prime.",
   "Factor pairs of 15: 1·15 (sum 16) and 3·5 (sum 8). Neither adds to 7.<br><b>Answer: prime</b> over the integers. (Check: b^2 - 4ac = 49 - 60 = -11, not a perfect square.)"]
 ]},

{unit:"unit-2", title:"Factoring Set 2C: Trinomials ax² + bx + c (AC Method)",
 sub:"Multiply a·c, split the middle term, then factor by grouping",
 formulas:[
  ["Step 1","Multiply a · c."],
  ["Step 2","Find two numbers that multiply to a·c and add to b."],
  ["Step 3","Rewrite bx using those two numbers (split the middle)."],
  ["Step 4","Factor by grouping."],
  ["Shortcut check","If b^2 - 4ac is a perfect square, the trinomial factors; if not, it is prime."]
 ],
 probs:[
  ["Factor 2x^2 + 7x + 3.",
   "ac = 2·3 = 6. Need product 6, sum 7: 6 and 1.<br>Split: 2x^2 + 6x + x + 3<br>Group: 2x(x + 3) + 1(x + 3)<br><b>Answer: (2x + 1)(x + 3)</b>"],
  ["Factor 3x^2 - 10x + 8.",
   "ac = 24. Product 24, sum -10: -6 and -4.<br>3x^2 - 6x - 4x + 8 = 3x(x - 2) - 4(x - 2)<br><b>Answer: (3x - 4)(x - 2)</b>"],
  ["Factor 6x^2 + x - 2.",
   "ac = -12. Product -12, sum 1: 4 and -3.<br>6x^2 + 4x - 3x - 2 = 2x(3x + 2) - 1(3x + 2)<br><b>Answer: (2x - 1)(3x + 2)</b>"],
  ["Factor 4x^2 - 4x - 15.",
   "ac = -60. Product -60, sum -4: -10 and 6.<br>4x^2 - 10x + 6x - 15 = 2x(2x - 5) + 3(2x - 5)<br><b>Answer: (2x + 3)(2x - 5)</b>"],
  ["Factor 5x^2 + 13x - 6.",
   "ac = -30. Product -30, sum 13: 15 and -2.<br>5x^2 + 15x - 2x - 6 = 5x(x + 3) - 2(x + 3)<br><b>Answer: (5x - 2)(x + 3)</b>"],
  ["Factor 8x^2 - 14x + 3.",
   "ac = 24. Product 24, sum -14: -12 and -2.<br>8x^2 - 12x - 2x + 3 = 4x(2x - 3) - 1(2x - 3)<br><b>Answer: (4x - 1)(2x - 3)</b>"],
  ["Factor 10x^2 + 11x - 6.",
   "ac = -60. Product -60, sum 11: 15 and -4.<br>10x^2 + 15x - 4x - 6 = 5x(2x + 3) - 2(2x + 3)<br><b>Answer: (5x - 2)(2x + 3)</b>"],
  ["Factor 12x^2 - 17x + 6.",
   "ac = 72. Product 72, sum -17: -9 and -8.<br>12x^2 - 9x - 8x + 6 = 3x(4x - 3) - 2(4x - 3)<br><b>Answer: (3x - 2)(4x - 3)</b>"],
  ["Factor 6x^2 - 13x - 5.",
   "ac = -30. Product -30, sum -13: -15 and 2.<br>6x^2 - 15x + 2x - 5 = 3x(2x - 5) + 1(2x - 5)<br><b>Answer: (3x + 1)(2x - 5)</b>"],
  ["Factor -2x^2 + 5x + 12.",
   "Take out -1: -(2x^2 - 5x - 12). ac = -24. Product -24, sum -5: -8 and 3.<br>2x^2 - 8x + 3x - 12 = 2x(x - 4) + 3(x - 4) = (2x + 3)(x - 4)<br><b>Answer: -(2x + 3)(x - 4)</b>"],
  ["Factor 9x^2 + 12x + 4.",
   "ac = 36. Product 36, sum 12: 6 and 6.<br>9x^2 + 6x + 6x + 4 = 3x(3x + 2) + 2(3x + 2) = (3x + 2)(3x + 2)<br><b>Answer: (3x + 2)^2</b>. Notice 9x^2 = (3x)^2, 4 = 2^2 and 12x = 2·3x·2, a perfect square."],
  ["Factor 6x^2 + 7xy - 20y^2.",
   "ac = -120. Product -120, sum 7: 15 and -8.<br>6x^2 + 15xy - 8xy - 20y^2 = 3x(2x + 5y) - 4y(2x + 5y)<br><b>Answer: (3x - 4y)(2x + 5y)</b>"],
  ["Factor 18x^3 + 33x^2 - 30x completely.",
   "GCF first: 3x(6x^2 + 11x - 10).<br>ac = -60. Product -60, sum 11: 15 and -4.<br>6x^2 + 15x - 4x - 10 = 3x(2x + 5) - 2(2x + 5) = (3x - 2)(2x + 5)<br><b>Answer: 3x(3x - 2)(2x + 5)</b>"],
  ["Factor 4x^2 + 5x + 3, or show it is prime.",
   "ac = 12. Positive pairs of 12: 1 + 12 = 13, 2 + 6 = 8, 3 + 4 = 7. None adds to 5.<br><b>Answer: prime.</b> (Also b^2 - 4ac = 25 - 48 = -23 < 0.)"]
 ]},

{unit:"unit-2", title:"Factoring Set 2D: Special Patterns",
 sub:"Difference of squares, perfect square trinomials, sum and difference of cubes",
 formulas:[
  ["Difference of squares","a^2 - b^2 = (a - b)(a + b)"],
  ["Perfect square trinomials","a^2 + 2ab + b^2 = (a + b)^2 &nbsp;&nbsp; a^2 - 2ab + b^2 = (a - b)^2"],
  ["Difference of cubes","a^3 - b^3 = (a - b)(a^2 + ab + b^2)"],
  ["Sum of cubes","a^3 + b^3 = (a + b)(a^2 - ab + b^2)"],
  ["SOAP (signs for cubes)","<b>S</b>ame sign, <b>O</b>pposite sign, <b>A</b>lways <b>P</b>ositive"],
  ["Sum of squares","a^2 + b^2 is prime over the real numbers."]
 ],
 probs:[
  ["Factor x^2 - 49.",
   "x^2 - 7^2, so a = x, b = 7.<br><b>Answer: (x - 7)(x + 7)</b>"],
  ["Factor 16x^2 - 25.",
   "(4x)^2 - 5^2<br><b>Answer: (4x - 5)(4x + 5)</b>"],
  ["Factor x^2 + 10x + 25.",
   "First and last are squares: x^2 and 5^2. Middle check: 2·x·5 = 10x ✓<br><b>Answer: (x + 5)^2</b>"],
  ["Factor 9x^2 - 30x + 25.",
   "(3x)^2 and 5^2. Middle check: 2·3x·5 = 30x ✓ (minus sign)<br><b>Answer: (3x - 5)^2</b>"],
  ["Factor x^3 - 27.",
   "a = x, b = 3 (since 3^3 = 27). Use a^3 - b^3 = (a - b)(a^2 + ab + b^2).<br><b>Answer: (x - 3)(x^2 + 3x + 9)</b>. The trinomial does not factor."],
  ["Factor 8x^3 + 125.",
   "8x^3 = (2x)^3, 125 = 5^3 → a = 2x, b = 5.<br>a^3 + b^3 = (a + b)(a^2 - ab + b^2) = (2x + 5)((2x)^2 - (2x)(5) + 5^2)<br><b>Answer: (2x + 5)(4x^2 - 10x + 25)</b>"],
  ["Factor 2x^3 - 54 completely.",
   "GCF: 2(x^3 - 27)<br><b>Answer: 2(x - 3)(x^2 + 3x + 9)</b>"],
  ["Factor x^4 - 81 completely.",
   "(x^2)^2 - 9^2 = (x^2 - 9)(x^2 + 9)<br>x^2 - 9 factors again: (x - 3)(x + 3). x^2 + 9 is a sum of squares (prime).<br><b>Answer: (x - 3)(x + 3)(x^2 + 9)</b>"],
  ["Factor 50x^2 - 18 completely.",
   "50 and 18 aren't perfect squares, but there is a GCF of 2: 2(25x^2 - 9)<br><b>Answer: 2(5x - 3)(5x + 3)</b>"],
  ["Factor 64x^3 - y^3.",
   "a = 4x, b = y.<br>(4x - y)((4x)^2 + (4x)(y) + y^2)<br><b>Answer: (4x - y)(16x^2 + 4xy + y^2)</b>"],
  ["Factor x^6 - 64 completely.",
   "Use difference of squares <b>first</b>: (x^3)^2 - 8^2 = (x^3 - 8)(x^3 + 8)<br>x^3 - 8 = (x - 2)(x^2 + 2x + 4) &nbsp; x^3 + 8 = (x + 2)(x^2 - 2x + 4)<br><b>Answer: (x - 2)(x + 2)(x^2 + 2x + 4)(x^2 - 2x + 4)</b><br><i>Tip:</i> when a power is both a square and a cube, start with squares."],
  ["Factor x^2 + 25 (a) over the real numbers (b) over the complex numbers.",
   "(a) A sum of squares does not factor over the reals: <b>prime</b>.<br>(b) Since 25 = -(5i)^2: x^2 - (5i)^2 = <b>(x - 5i)(x + 5i)</b>. Check: x^2 - 25i^2 = x^2 + 25 ✓"],
  ["Factor (x + 2)^2 - 9.",
   "Difference of squares with a = x + 2, b = 3:<br>((x + 2) - 3)((x + 2) + 3)<br><b>Answer: (x - 1)(x + 5)</b>"],
  ["Factor x^2 - 6x + 9 - y^2.",
   "The first three terms are a perfect square: (x - 3)^2 - y^2.<br>Difference of squares: ((x - 3) - y)((x - 3) + y)<br><b>Answer: (x - 3 - y)(x - 3 + y)</b>"]
 ]},

{unit:"unit-2", title:"Factoring Set 2E: Mixed & Advanced (Factor Completely)",
 sub:"Quadratic form (substitution), several steps in a row, error analysis",
 formulas:[
  ["Quadratic form","If the expression looks like a(□)^2 + b(□) + c, let u = □, factor, then substitute back."],
  ["Order of attack","1. GCF &nbsp; 2. Count terms &nbsp; 3. Special pattern? &nbsp; 4. Check every factor again."],
  ["Completely factored","No factor (other than a monomial) can be factored further over the integers."]
 ],
 probs:[
  ["Factor x^4 - 13x^2 + 36 completely.",
   "Let u = x^2: u^2 - 13u + 36 = (u - 4)(u - 9).<br>Substitute back: (x^2 - 4)(x^2 - 9). Both are differences of squares.<br><b>Answer: (x - 2)(x + 2)(x - 3)(x + 3)</b>"],
  ["Factor x^4 + 3x^2 - 4 completely.",
   "u = x^2: u^2 + 3u - 4 = (u + 4)(u - 1) → (x^2 + 4)(x^2 - 1)<br><b>Answer: (x^2 + 4)(x - 1)(x + 1)</b>"],
  ["Factor 2x^4 - 7x^2 - 15.",
   "u = x^2: 2u^2 - 7u - 15. ac = -30; product -30, sum -7: -10 and 3.<br>2u^2 - 10u + 3u - 15 = 2u(u - 5) + 3(u - 5) = (2u + 3)(u - 5)<br><b>Answer: (2x^2 + 3)(x^2 - 5)</b>. (Over the reals x^2 - 5 = (x - √5)(x + √5).)"],
  ["Factor 3x^4 - 48 completely.",
   "GCF: 3(x^4 - 16) = 3(x^2 - 4)(x^2 + 4)<br><b>Answer: 3(x - 2)(x + 2)(x^2 + 4)</b>"],
  ["Factor 2x^5 - 2x completely.",
   "GCF: 2x(x^4 - 1) = 2x(x^2 - 1)(x^2 + 1)<br><b>Answer: 2x(x - 1)(x + 1)(x^2 + 1)</b>"],
  ["Factor (2x - 1)^2 + 5(2x - 1) + 6.",
   "Let u = 2x - 1: u^2 + 5u + 6 = (u + 2)(u + 3).<br>Substitute back: (2x - 1 + 2)(2x - 1 + 3) = (2x + 1)(2x + 2)<br>2x + 2 has a GCF of 2.<br><b>Answer: 2(2x + 1)(x + 1)</b>"],
  ["Factor x^6 - 7x^3 - 8 completely.",
   "u = x^3: u^2 - 7u - 8 = (u - 8)(u + 1) → (x^3 - 8)(x^3 + 1)<br>Difference and sum of cubes:<br><b>Answer: (x - 2)(x^2 + 2x + 4)(x + 1)(x^2 - x + 1)</b>"],
  ["Factor 4x^3 - 4x^2 - 9x + 9 completely.",
   "Group: 4x^2(x - 1) - 9(x - 1) = (x - 1)(4x^2 - 9)<br><b>Answer: (x - 1)(2x - 3)(2x + 3)</b>"],
  ["Factor x^2(x + 5) - 4(x + 5) completely.",
   "Common binomial: (x + 5)(x^2 - 4)<br><b>Answer: (x + 5)(x - 2)(x + 2)</b>"],
  ["Factor 12x^3 - 75x completely.",
   "GCF: 3x(4x^2 - 25)<br><b>Answer: 3x(2x - 5)(2x + 5)</b>"],
  ["Factor x^4 - 10x^2y^2 + 9y^4 completely.",
   "Think of it as u^2 - 10uv + 9v^2 with u = x^2, v = y^2: (u - v)(u - 9v).<br>(x^2 - y^2)(x^2 - 9y^2)<br><b>Answer: (x - y)(x + y)(x - 3y)(x + 3y)</b>"],
  ["Factor 5x^3 + 40 completely.",
   "GCF: 5(x^3 + 8). Sum of cubes with a = x, b = 2.<br><b>Answer: 5(x + 2)(x^2 - 2x + 4)</b>"],
  ["<b>Error analysis.</b> A student wrote 4x^2 - 36 = (2x - 6)(2x + 6). Is this completely factored? If not, fix it.",
   "The product is correct, but it is <b>not completely factored</b>: both 2x - 6 and 2x + 6 still have a factor of 2.<br>Take the GCF first: 4x^2 - 36 = 4(x^2 - 9)<br><b>Answer: 4(x - 3)(x + 3)</b>"]
 ]},

{unit:"unit-2", title:"Set 2F: Solving Quadratic (and Factorable) Equations",
 sub:"Factoring, square roots, completing the square, the quadratic formula",
 formulas:[
  ["Zero product property","If A · B = 0, then A = 0 or B = 0. The equation must equal 0 first!"],
  ["Square root property","(x - h)^2 = k → x = h ± √k"],
  ["Completing the square","x^2 + bx: add (b/2)^2 to both sides → (x + b/2)^2"],
  ["Quadratic formula","x = (-b ± √(b^2 - 4ac))/(2a)"],
  ["Imaginary unit","√(-k) = i√k"]
 ],
 probs:[
  ["Solve x^2 - 5x - 14 = 0.",
   "Factor: (x - 7)(x + 2) = 0<br>x - 7 = 0 or x + 2 = 0<br><b>Answer: x = 7 or x = -2</b>"],
  ["Solve 2x^2 + 5x = 3.",
   "<b>Set equal to 0 first:</b> 2x^2 + 5x - 3 = 0<br>ac = -6 → 6 and -1: 2x^2 + 6x - x - 3 = 2x(x + 3) - 1(x + 3) = (2x - 1)(x + 3) = 0<br><b>Answer: x = 1/2 or x = -3</b>"],
  ["Solve 3x^2 - 75 = 0.",
   "Square root method: 3x^2 = 75 → x^2 = 25 → x = ±5.<br>(Or factor: 3(x - 5)(x + 5) = 0.)<br><b>Answer: x = ±5</b>"],
  ["Solve (x - 4)^2 = 18.",
   "Take the square root of both sides (remember ±): x - 4 = ±√18 = ±3√2<br><b>Answer: x = 4 ± 3√2</b>"],
  ["Solve x^2 + 6x - 11 = 0 by completing the square.",
   "Move the constant: x^2 + 6x = 11<br>(6/2)^2 = 9; add to both sides: x^2 + 6x + 9 = 20 → (x + 3)^2 = 20<br>x + 3 = ±√20 = ±2√5<br><b>Answer: x = -3 ± 2√5</b>"],
  ["Solve 3x^2 - 2x + 5 = 0 with the quadratic formula.",
   "a = 3, b = -2, c = 5. Discriminant: (-2)^2 - 4(3)(5) = 4 - 60 = -56.<br>x = (2 ± √(-56))/6 = (2 ± 2i√14)/6<br><b>Answer: x = (1 ± i√14)/3</b>"],
  ["Solve x^2 - 4x + 13 = 0.",
   "Complete the square: x^2 - 4x + 4 = -13 + 4 → (x - 2)^2 = -9<br>x - 2 = ±3i<br><b>Answer: x = 2 ± 3i</b>"],
  ["Solve 4x^2 + 20x + 25 = 0.",
   "Perfect square: (2x + 5)^2 = 0 → 2x + 5 = 0<br><b>Answer: x = -5/2</b> (a double root: the parabola touches the x-axis)"],
  ["Solve x^3 - 5x^2 - 4x + 20 = 0.",
   "Group: x^2(x - 5) - 4(x - 5) = (x - 5)(x^2 - 4) = (x - 5)(x - 2)(x + 2) = 0<br><b>Answer: x = 5, 2, -2</b>"],
  ["Solve x^4 - 5x^2 + 4 = 0.",
   "u = x^2: u^2 - 5u + 4 = (u - 1)(u - 4) = 0 → x^2 = 1 or x^2 = 4<br><b>Answer: x = ±1, ±2</b>"],
  ["Solve x(x + 3) = 40.",
   "<i>Common mistake:</i> setting x = 40 and x + 3 = 40. The zero product property only works with 0!<br>Expand: x^2 + 3x - 40 = 0 → (x + 8)(x - 5) = 0<br><b>Answer: x = 5 or x = -8</b>"],
  ["A rectangle's length is 3 more than twice its width, and its area is 65 square units. Find its dimensions.",
   "Width w, length 2w + 3. Area: w(2w + 3) = 65 → 2w^2 + 3w - 65 = 0<br>ac = -130 → 13 and -10: 2w^2 + 13w - 10w - 65 = w(2w + 13) - 5(2w + 13) = (w - 5)(2w + 13) = 0<br>w = 5 or w = -13/2. A width can't be negative.<br><b>Answer: width 5, length 13.</b> Check: 5 · 13 = 65 ✓"]
 ]},

{unit:"unit-2", title:"Set 2G: Complex Numbers",
 sub:"i, powers of i, adding, multiplying, conjugates, dividing",
 formulas:[
  ["Imaginary unit","i = √(-1), so i^2 = -1"],
  ["Powers of i","i^1 = i, i^2 = -1, i^3 = -i, i^4 = 1, then repeat. Divide the exponent by 4 and use the remainder."],
  ["Conjugate","The conjugate of a + bi is a - bi. (a + bi)(a - bi) = a^2 + b^2"],
  ["Dividing","Multiply top and bottom by the conjugate of the denominator."],
  ["Write i first!","√(-a) · √(-b) ≠ √(ab). Change each to i form before multiplying."]
 ],
 probs:[
  ["Simplify √(-72).",
   "√(-72) = i√72 = i√(36 · 2)<br><b>Answer: 6i√2</b>"],
  ["Simplify (a) (3 + 2i) + (5 - 7i) &nbsp; (b) (3 + 2i) - (5 - 7i).",
   "Combine real parts and imaginary parts separately.<br>(a) (3 + 5) + (2 - 7)i = <b>8 - 5i</b><br>(b) (3 - 5) + (2 - (-7))i = <b>-2 + 9i</b>"],
  ["Multiply (4 - 3i)(2 + 5i).",
   "FOIL: 8 + 20i - 6i - 15i^2<br>Replace i^2 with -1: 8 + 14i + 15<br><b>Answer: 23 + 14i</b>"],
  ["Multiply (3 + 4i)(3 - 4i).",
   "Conjugates: a^2 + b^2 = 9 + 16<br><b>Answer: 25</b> (a real number, which is why conjugates are used to divide)"],
  ["Simplify (2 + i)/(3 - i).",
   "Multiply top and bottom by the conjugate 3 + i.<br>Top: (2 + i)(3 + i) = 6 + 2i + 3i + i^2 = 5 + 5i<br>Bottom: (3 - i)(3 + i) = 9 + 1 = 10<br>(5 + 5i)/10<br><b>Answer: 1/2 + (1/2)i</b>"],
  ["Simplify 5/(1 + 2i).",
   "Multiply by (1 - 2i)/(1 - 2i): 5(1 - 2i)/(1 + 4) = 5(1 - 2i)/5<br><b>Answer: 1 - 2i</b>"],
  ["Simplify (a) i^27 &nbsp; (b) i^50.",
   "(a) 27 ÷ 4 = 6 remainder 3, so i^27 = i^3 = <b>-i</b><br>(b) 50 ÷ 4 = 12 remainder 2, so i^50 = i^2 = <b>-1</b>"],
  ["Simplify (1 + i)^4.",
   "Square first: (1 + i)^2 = 1 + 2i + i^2 = 2i<br>Square again: (2i)^2 = 4i^2<br><b>Answer: -4</b>"],
  ["Simplify √(-50) · √(-2).",
   "Write in i form first: (5i√2)(i√2) = 5i^2 · 2 = 5(-1)(2)<br><b>Answer: -10</b><br><i>Common mistake:</i> √(-50 · -2) = √100 = 10. That's wrong."],
  ["Solve 2x^2 + 32 = 0.",
   "2x^2 = -32 → x^2 = -16 → x = ±√(-16)<br><b>Answer: x = ±4i</b>"],
  ["Simplify (2 - 3i)^2.",
   "(2 - 3i)(2 - 3i) = 4 - 6i - 6i + 9i^2 = 4 - 12i - 9<br><b>Answer: -5 - 12i</b>"],
  ["Find real numbers x and y: (x + 3) + 2yi = 7 - 8i.",
   "Real parts are equal: x + 3 = 7 → <b>x = 4</b><br>Imaginary parts are equal: 2y = -8 → <b>y = -4</b>"]
 ]},

{unit:"unit-2", title:"Set 2H: Dividing Polynomials & the Binomial Theorem",
 sub:"Synthetic and long division, remainder and factor theorems, Pascal's triangle",
 formulas:[
  ["Division","P(x) = D(x) · Q(x) + R(x)"],
  ["Synthetic division","Only for divisors x - c. Use c (so for x + 2, use -2). Write 0 for missing terms."],
  ["Remainder theorem","P(c) = the remainder when P(x) is divided by x - c."],
  ["Factor theorem","x - c is a factor exactly when P(c) = 0."],
  ["Binomial theorem","(a + b)^n = Σ nCk · a^(n−k) · b^k &nbsp;&nbsp; Pascal row 4: 1 4 6 4 1"]
 ],
 probs:[
  ["Use synthetic division: (2x^3 - 3x^2 - 11x + 6) ÷ (x - 3). Then factor the polynomial completely.",
   "c = 3, coefficients 2, -3, -11, 6.<br>Bring down 2. 2·3 = 6 → -3 + 6 = 3. 3·3 = 9 → -11 + 9 = -2. -2·3 = -6 → 6 - 6 = 0.<br>Quotient 2x^2 + 3x - 2, remainder 0 (so x - 3 is a factor).<br>2x^2 + 3x - 2 = (2x - 1)(x + 2)<br><b>Answer: (x - 3)(2x - 1)(x + 2)</b>"],
  ["Divide (x^3 - 8) ÷ (x - 2).",
   "Fill in missing terms: 1, 0, 0, -8. c = 2.<br>1 → 1·2 = 2 → 0 + 2 = 2 → 2·2 = 4 → 0 + 4 = 4 → 4·2 = 8 → -8 + 8 = 0<br><b>Answer: x^2 + 2x + 4</b> (matches the difference of cubes pattern)"],
  ["Divide (3x^3 + 5x^2 - 4x + 7) ÷ (x + 2).",
   "x + 2 = x - (-2), so c = -2.<br>3 → 3(-2) = -6 → 5 - 6 = -1 → (-1)(-2) = 2 → -4 + 2 = -2 → (-2)(-2) = 4 → 7 + 4 = 11<br><b>Answer: 3x^2 - x - 2 + 11/(x + 2)</b><br>Check with the remainder theorem: P(-2) = -24 + 20 + 8 + 7 = 11 ✓"],
  ["Use long division: (x^4 - 2x^3 + x - 5) ÷ (x^2 + 1).",
   "Write x^4 - 2x^3 + 0x^2 + x - 5.<br>x^4 ÷ x^2 = x^2; subtract x^2(x^2 + 1) = x^4 + x^2 → -2x^3 - x^2 + x - 5<br>-2x^3 ÷ x^2 = -2x; subtract -2x^3 - 2x → -x^2 + 3x - 5<br>-x^2 ÷ x^2 = -1; subtract -x^2 - 1 → 3x - 4<br><b>Answer: x^2 - 2x - 1 + (3x - 4)/(x^2 + 1)</b>"],
  ["Divide (6x^3 + 7x^2 - 1) ÷ (2x + 1) and factor the quotient.",
   "Write 6x^3 + 7x^2 + 0x - 1.<br>6x^3 ÷ 2x = 3x^2; subtract 6x^3 + 3x^2 → 4x^2 + 0x<br>4x^2 ÷ 2x = 2x; subtract 4x^2 + 2x → -2x - 1<br>-2x ÷ 2x = -1; subtract -2x - 1 → 0<br>Quotient 3x^2 + 2x - 1 = (3x - 1)(x + 1)<br><b>Answer: 6x^3 + 7x^2 - 1 = (2x + 1)(3x - 1)(x + 1)</b>"],
  ["Is x + 1 a factor of P(x) = x^4 + 3x^3 - x + 5?",
   "Factor theorem: check P(-1) = 1 - 3 + 1 + 5 = 4.<br><b>Answer: No.</b> P(-1) ≠ 0; the remainder is 4."],
  ["Find k so that x - 2 is a factor of x^3 + kx^2 - 5x + 6.",
   "x - 2 is a factor exactly when P(2) = 0.<br>P(2) = 8 + 4k - 10 + 6 = 4k + 4 = 0 → <b>k = -1</b>"],
  ["Expand (2x - 1)^4.",
   "Pascal row 4: 1, 4, 6, 4, 1. With a = 2x, b = -1:<br>1(2x)^4 + 4(2x)^3(-1) + 6(2x)^2(-1)^2 + 4(2x)(-1)^3 + 1(-1)^4<br>= 16x^4 - 32x^3 + 24x^2 - 8x + 1<br><b>Answer: 16x^4 - 32x^3 + 24x^2 - 8x + 1</b>"],
  ["Find the coefficient of x^4 in (3x - 2)^7.",
   "General term: 7Ck (3x)^(7−k) (-2)^k. For x^4, 7 - k = 4 → k = 3.<br>7C3 · 3^4 · (-2)^3 = 35 · 81 · (-8)<br><b>Answer: -22,680</b>"]
 ]},

{unit:"unit-2", adv:true, title:"Honors Challenge 2: Advanced Factoring & Complex Numbers",
 sub:"Adding and subtracting to make a square, substitution, factoring by grouping with special patterns, rational exponents, complex roots",
 formulas:[
  ["Add and subtract","x^4 + 4 = (x^4 + 4x^2 + 4) - 4x^2 creates a difference of squares."],
  ["Substitution","Replace a repeated expression with u, factor, then substitute back."],
  ["Rational exponents","Factor out the smallest power: x^(5/2) = x^(1/2) · x^2."],
  ["Useful identities","a^3 + b^3 = (a + b)^3 - 3ab(a + b) &nbsp;&nbsp; p^2 + q^2 = (p + q)^2 - 2pq"],
  ["Remainder theorem (extended)","The remainder when dividing by a quadratic has the form ax + b."]
 ],
 probs:[
  ["Factor x^4 + 4 over the integers.",
   "Add and subtract 4x^2 to make a perfect square:<br>x^4 + 4 = (x^4 + 4x^2 + 4) - 4x^2 = (x^2 + 2)^2 - (2x)^2<br>Difference of squares:<br><b>Answer: (x^2 - 2x + 2)(x^2 + 2x + 2)</b><br>(Each quadratic factor has a negative discriminant, so it doesn't factor further over the reals.)"],
  ["Factor (x^2 + 3x)^2 - 2(x^2 + 3x) - 8 completely.",
   "Let u = x^2 + 3x: u^2 - 2u - 8 = (u - 4)(u + 2)<br>Substitute back: (x^2 + 3x - 4)(x^2 + 3x + 2)<br>Factor each: (x + 4)(x - 1) and (x + 1)(x + 2)<br><b>Answer: (x + 4)(x - 1)(x + 1)(x + 2)</b>"],
  ["Factor x^8 - 1 completely over the integers.",
   "x^8 - 1 = (x^4 - 1)(x^4 + 1) = (x^2 - 1)(x^2 + 1)(x^4 + 1)<br><b>Answer: (x - 1)(x + 1)(x^2 + 1)(x^4 + 1)</b>"],
  ["Factor 4x^4 - 37x^2 + 9 completely.",
   "u = x^2: 4u^2 - 37u + 9. ac = 36; product 36, sum -37: -36 and -1.<br>4u^2 - 36u - u + 9 = 4u(u - 9) - 1(u - 9) = (4u - 1)(u - 9)<br>Back to x: (4x^2 - 1)(x^2 - 9)<br><b>Answer: (2x - 1)(2x + 1)(x - 3)(x + 3)</b>"],
  ["Factor a^2 - b^2 + 2b - 1.",
   "Group the last three terms: a^2 - (b^2 - 2b + 1) = a^2 - (b - 1)^2<br>Difference of squares: (a - (b - 1))(a + (b - 1))<br><b>Answer: (a - b + 1)(a + b - 1)</b>"],
  ["Factor x^3 - y^3 + x - y.",
   "Group: (x^3 - y^3) + (x - y) = (x - y)(x^2 + xy + y^2) + 1(x - y)<br><b>Answer: (x - y)(x^2 + xy + y^2 + 1)</b>"],
  ["Factor 27x^6 + 8y^3.",
   "27x^6 = (3x^2)^3 and 8y^3 = (2y)^3. Sum of cubes with a = 3x^2, b = 2y:<br>(a + b)(a^2 - ab + b^2)<br><b>Answer: (3x^2 + 2y)(9x^4 - 6x^2y + 4y^2)</b>"],
  ["Factor x^5 - x^3 + 8x^2 - 8 completely.",
   "Group: x^3(x^2 - 1) + 8(x^2 - 1) = (x^2 - 1)(x^3 + 8)<br>Difference of squares and sum of cubes:<br><b>Answer: (x - 1)(x + 1)(x + 2)(x^2 - 2x + 4)</b>"],
  ["Factor 2x^(5/2) - 8x^(1/2) completely.",
   "The smallest power of x is x^(1/2). GCF: 2x^(1/2).<br>2x^(5/2) ÷ 2x^(1/2) = x^2 (subtract exponents: 5/2 - 1/2 = 2)<br>8x^(1/2) ÷ 2x^(1/2) = 4<br>2x^(1/2)(x^2 - 4)<br><b>Answer: 2x^(1/2)(x - 2)(x + 2)</b>"],
  ["Solve x^4 - 2x^2 - 8 = 0 over the complex numbers.",
   "u = x^2: u^2 - 2u - 8 = (u - 4)(u + 2) = 0 → x^2 = 4 or x^2 = -2<br><b>Answer: x = ±2, x = ±i√2</b> (four solutions, matching degree 4)"],
  ["Solve 2x^3 + x^2 - 8x - 4 = 0.",
   "Group: x^2(2x + 1) - 4(2x + 1) = (2x + 1)(x^2 - 4) = (2x + 1)(x - 2)(x + 2) = 0<br><b>Answer: x = -1/2, 2, -2</b>"],
  ["Find both square roots of -5 + 12i.",
   "Let (a + bi)^2 = -5 + 12i with a, b real. Then a^2 - b^2 + 2abi = -5 + 12i.<br>So a^2 - b^2 = -5 and 2ab = 12 → ab = 6. Try a = 2, b = 3: 4 - 9 = -5 ✓<br><b>Answer: 2 + 3i and -2 - 3i</b><br>Check: (2 + 3i)^2 = 4 + 12i + 9i^2 = -5 + 12i ✓"],
  ["Simplify (1 + i)^20.",
   "(1 + i)^2 = 1 + 2i + i^2 = 2i<br>(1 + i)^20 = ((1 + i)^2)^10 = (2i)^10 = 2^10 · i^10 = 1024 · i^2<br><b>Answer: -1024</b>"],
  ["Simplify (3 - 2i)/(2 + 3i).",
   "Multiply by the conjugate (2 - 3i)/(2 - 3i).<br>Top: (3 - 2i)(2 - 3i) = 6 - 9i - 4i + 6i^2 = 0 - 13i<br>Bottom: 4 + 9 = 13<br><b>Answer: -i</b>"],
  ["When P(x) is divided by x - 1 the remainder is 3, and when divided by x + 2 the remainder is -3. Find the remainder when P(x) is divided by (x - 1)(x + 2).",
   "The divisor has degree 2, so the remainder is ax + b: P(x) = (x - 1)(x + 2)Q(x) + ax + b.<br>P(1) = 3 → a + b = 3. &nbsp; P(-2) = -3 → -2a + b = -3<br>Subtract: 3a = 6 → a = 2, b = 1<br><b>Answer: 2x + 1</b>"],
  ["Find the constant term in the expansion of (x^2 + 2/x)^6.",
   "General term: 6Ck (x^2)^(6−k) (2/x)^k = 6Ck · 2^k · x^(12−3k)<br>Constant term: 12 - 3k = 0 → k = 4<br>6C4 · 2^4 = 15 · 16<br><b>Answer: 240</b>"],
  ["If a + b = 5 and ab = 3, find a^3 + b^3 without finding a and b.",
   "Use a^3 + b^3 = (a + b)^3 - 3ab(a + b)<br>= 5^3 - 3(3)(5) = 125 - 45<br><b>Answer: 80</b>"]
 ]},

/* ============================ UNIT 3 ============================ */
{unit:"unit-3", title:"Set 3A: Forms of a Quadratic & Vertex Form",
 sub:"Vertex, axis of symmetry, completing the square, converting between forms, transformations",
 formulas:[
  ["Standard form","y = ax^2 + bx + c. Vertex x = -b/(2a); y-intercept c"],
  ["Vertex form","y = a(x - h)^2 + k. Vertex (h, k), axis x = h"],
  ["Factored form","y = a(x - p)(x - q). Zeros p, q; axis x = (p + q)/2"],
  ["Shape","a > 0 opens up (minimum); a < 0 opens down (maximum). |a| > 1 narrower; |a| < 1 wider."]
 ],
 probs:[
  ["For y = 2x^2 - 8x + 3, find the vertex, axis of symmetry, max or min value, range and y-intercept.",
   "x = -b/(2a) = 8/4 = 2. y = 2(4) - 16 + 3 = -5.<br><b>Vertex (2, -5)</b>, axis <b>x = 2</b>. a = 2 > 0, so it opens up: <b>minimum value -5</b>.<br><b>Range y ≥ -5</b>. <b>y-intercept (0, 3)</b>."],
  ["Write y = x^2 + 6x + 5 in vertex form and in factored form.",
   "Complete the square: (6/2)^2 = 9. y = (x^2 + 6x + 9) - 9 + 5<br><b>Vertex form: y = (x + 3)^2 - 4</b>, vertex (-3, -4)<br><b>Factored form: y = (x + 1)(x + 5)</b> (1·5 = 5, 1 + 5 = 6)"],
  ["Write y = -3x^2 + 12x - 7 in vertex form.",
   "Factor -3 out of the x terms: y = -3(x^2 - 4x) - 7<br>Add 4 inside the parentheses. That really adds -3·4 = -12, so add 12 outside:<br>y = -3(x^2 - 4x + 4) + 12 - 7<br><b>Answer: y = -3(x - 2)^2 + 5</b>, vertex (2, 5), a maximum."],
  ["Write y = 2x^2 + 6x - 1 in vertex form.",
   "y = 2(x^2 + 3x) - 1. Half of 3 is 3/2; (3/2)^2 = 9/4.<br>y = 2(x^2 + 3x + 9/4) - 2(9/4) - 1 = 2(x + 3/2)^2 - 9/2 - 1<br><b>Answer: y = 2(x + 3/2)^2 - 11/2</b>, vertex (-3/2, -11/2)"],
  ["For y = -(x - 1)(x + 5), find the zeros, axis, vertex, and standard form.",
   "Zeros: <b>x = 1 and x = -5</b>. Axis: x = (1 + (-5))/2 = <b>-2</b>.<br>Vertex y: -(-2 - 1)(-2 + 5) = -(-3)(3) = 9 → <b>vertex (-2, 9)</b>, a maximum.<br>Standard: -(x^2 + 4x - 5) = <b>-x^2 - 4x + 5</b>"],
  ["Describe how y = -2(x + 4)^2 + 1 is transformed from y = x^2. Give the vertex, domain and range.",
   "Shift <b>left 4</b>, <b>vertical stretch by 2</b>, <b>reflect over the x-axis</b>, shift <b>up 1</b>.<br>Vertex (-4, 1), a maximum. <b>Domain: all reals. Range: y ≤ 1.</b>"],
  ["Write y = 3(x - 2)^2 - 12 in standard form and factored form. Find the zeros.",
   "Standard: 3(x^2 - 4x + 4) - 12 = <b>3x^2 - 12x</b><br>Factored: <b>3x(x - 4)</b> → zeros <b>x = 0 and x = 4</b><br>Check: the axis x = 2 is halfway between 0 and 4 ✓"],
  ["For f(x) = x^2 - 2x - 8, find the zeros, vertex, y-intercept, range, and where f is increasing or decreasing.",
   "Zeros: (x - 4)(x + 2) = 0 → <b>x = 4, -2</b><br>Vertex: x = 2/2 = 1, f(1) = 1 - 2 - 8 = -9 → <b>(1, -9)</b><br>y-intercept: <b>(0, -8)</b>. Range: <b>[-9, ∞)</b><br><b>Decreasing on (-∞, 1), increasing on (1, ∞)</b>"]
 ]},

{unit:"unit-3", title:"Set 3B: The Discriminant & Zeros",
 sub:"Number and type of solutions, finding k, sum and product of roots",
 formulas:[
  ["Discriminant","D = b^2 - 4ac"],
  ["D > 0","Two real solutions (two x-intercepts). Perfect square → rational; otherwise irrational."],
  ["D = 0","One real (double) solution; the vertex is on the x-axis."],
  ["D < 0","Two non-real complex solutions; no x-intercepts."],
  ["Vieta's formulas","Sum of roots = -b/a; product of roots = c/a"]
 ],
 probs:[
  ["Find the number and type of solutions of 2x^2 - 3x + 5 = 0.",
   "D = (-3)^2 - 4(2)(5) = 9 - 40 = -31 < 0<br><b>Answer: two non-real complex solutions.</b> The graph doesn't cross the x-axis."],
  ["Find the number and type of solutions of x^2 - 10x + 25 = 0.",
   "D = 100 - 100 = 0<br><b>Answer: one real (double) solution</b>, x = 5. Indeed x^2 - 10x + 25 = (x - 5)^2."],
  ["Find the number and type of solutions of 3x^2 + 7x - 6 = 0, then solve.",
   "D = 49 - 4(3)(-6) = 49 + 72 = 121 = 11^2, a perfect square.<br><b>Two rational solutions</b>: x = (-7 ± 11)/6 → <b>x = 2/3 or x = -3</b>"],
  ["Find the number and type of solutions of 2x^2 + 4x - 3 = 0, then solve.",
   "D = 16 - 4(2)(-3) = 16 + 24 = 40, not a perfect square.<br><b>Two irrational solutions</b>: x = (-4 ± √40)/4 = (-4 ± 2√10)/4 → <b>x = (-2 ± √10)/2</b>"],
  ["Find k so that x^2 + kx + 9 = 0 has exactly one real solution.",
   "One solution means D = 0: k^2 - 4(1)(9) = 0 → k^2 = 36<br><b>Answer: k = 6 or k = -6</b>"],
  ["For what values of c does 2x^2 - 5x + c = 0 have two real solutions?",
   "Need D > 0: 25 - 8c > 0 → 8c < 25<br><b>Answer: c < 25/8</b>"],
  ["Without solving, find the sum and product of the roots of 4x^2 - 12x + 7 = 0.",
   "Sum = -b/a = 12/4 = <b>3</b><br>Product = c/a = <b>7/4</b>"]
 ]},

{unit:"unit-3", title:"Set 3C: Quadratic Inequalities",
 sub:"Critical values, sign charts and graphs; one and two variables",
 formulas:[
  ["Step 1","Move everything to one side so the other side is 0."],
  ["Step 2","Find the zeros (critical values)."],
  ["Step 3","Use the graph or test points. For a parabola that opens up: > 0 is outside the zeros, < 0 is between them."],
  ["Endpoints","≤ or ≥ include the zeros; < or > do not."],
  ["Two variables","Graph the parabola (dashed for < >, solid for ≤ ≥), then test a point to decide which side to shade."]
 ],
 probs:[
  ["Solve x^2 - x - 12 > 0.",
   "Zeros: (x - 4)(x + 3) = 0 → x = -3, 4.<br>The parabola opens up, so it is above the x-axis <b>outside</b> the zeros.<br><b>Answer: x < -3 or x > 4</b><br>Test x = 0: 0 - 0 - 12 = -12 > 0? No, so 0 (between) is correctly excluded ✓"],
  ["Solve x^2 + 2x - 15 ≤ 0.",
   "Zeros: (x + 5)(x - 3) = 0 → x = -5, 3. Opens up; ≤ 0 means on or below the axis, so <b>between</b>.<br><b>Answer: -5 ≤ x ≤ 3</b>"],
  ["Solve 2x^2 + 5x ≥ 3.",
   "One side 0: 2x^2 + 5x - 3 ≥ 0 → (2x - 1)(x + 3) ≥ 0 → zeros -3, 1/2.<br>Opens up, ≥ 0 → outside, including endpoints.<br><b>Answer: x ≤ -3 or x ≥ 1/2</b>"],
  ["Solve -x^2 + 4x + 5 > 0.",
   "Multiply by -1 and <b>flip</b>: x^2 - 4x - 5 < 0 → (x - 5)(x + 1) < 0. Zeros -1, 5; < 0 → between.<br><b>Answer: -1 < x < 5</b>"],
  ["Solve (a) x^2 + 4 < 0 &nbsp; (b) x^2 - 6x + 9 > 0.",
   "(a) x^2 + 4 ≥ 4 for every x, so it is never negative. <b>No solution.</b><br>(b) x^2 - 6x + 9 = (x - 3)^2, which is > 0 everywhere except x = 3, where it equals 0.<br><b>All real numbers except x = 3.</b>"],
  ["Is (1, 2) a solution of y > x^2 - 3x + 1? Describe the graph of the inequality.",
   "At x = 1: 1 - 3 + 1 = -1. Is 2 > -1? <b>Yes</b>, so (1, 2) is a solution.<br><b>Graph:</b> draw y = x^2 - 3x + 1 as a <b>dashed</b> parabola and shade the region that contains (1, 2): <b>above (inside) the parabola</b>."],
  ["A ball's height is h = -16t^2 + 64t + 4 feet after t seconds. When is the ball higher than 52 feet?",
   "-16t^2 + 64t + 4 > 52 → -16t^2 + 64t - 48 > 0<br>Divide by -16 and flip: t^2 - 4t + 3 < 0 → (t - 1)(t - 3) < 0 → between.<br><b>Answer: 1 < t < 3 seconds</b>"]
 ]},

{unit:"unit-3", title:"Set 3D: Writing Quadratic Equations",
 sub:"From the vertex, the zeros, three points, or given roots",
 formulas:[
  ["Vertex + point","Use y = a(x - h)^2 + k; plug in the point to find a."],
  ["Zeros + point","Use y = a(x - p)(x - q); plug in the point to find a."],
  ["Three points","Plug each point into y = ax^2 + bx + c and solve the 3 × 3 system."],
  ["From roots","x^2 - (sum)x + (product) = 0"],
  ["Conjugate pairs","Irrational roots a ± √b and complex roots a ± bi come in pairs."]
 ],
 probs:[
  ["Write the equation of the parabola with vertex (2, -3) that passes through (4, 5).",
   "y = a(x - 2)^2 - 3. Plug in (4, 5): 5 = a(2)^2 - 3 → 4a = 8 → a = 2<br><b>Answer: y = 2(x - 2)^2 - 3</b>"],
  ["Write the equation of the parabola with zeros -1 and 5 that passes through (2, 18).",
   "y = a(x + 1)(x - 5). Plug in (2, 18): 18 = a(3)(-3) = -9a → a = -2<br><b>Answer: y = -2(x + 1)(x - 5) = -2x^2 + 8x + 10</b>"],
  ["Write the equation of the parabola through (0, 3), (1, 0) and (-1, 8).",
   "(0, 3) → c = 3.<br>(1, 0): a + b + 3 = 0 → a + b = -3<br>(-1, 8): a - b + 3 = 8 → a - b = 5<br>Add: 2a = 2 → a = 1, b = -4<br><b>Answer: y = x^2 - 4x + 3</b>"],
  ["Write a quadratic equation with integer coefficients whose roots are 2/3 and -4.",
   "x = 2/3 → 3x - 2 = 0. x = -4 → x + 4 = 0.<br>(3x - 2)(x + 4) = 0<br><b>Answer: 3x^2 + 10x - 8 = 0</b>"],
  ["Write a quadratic equation whose roots are 3 ± √2.",
   "Sum: (3 + √2) + (3 - √2) = 6. Product: 3^2 - (√2)^2 = 9 - 2 = 7.<br>x^2 - (sum)x + product = 0<br><b>Answer: x^2 - 6x + 7 = 0</b>"],
  ["Write a quadratic equation whose roots are 1 ± 2i.",
   "Sum: 2. Product: (1 + 2i)(1 - 2i) = 1 + 4 = 5.<br><b>Answer: x^2 - 2x + 5 = 0</b>"],
  ["A parabola has vertex (-1, 4) and y-intercept 1. Write its equation.",
   "y = a(x + 1)^2 + 4. The y-intercept is (0, 1): 1 = a(1)^2 + 4 → a = -3<br><b>Answer: y = -3(x + 1)^2 + 4</b>"]
 ]},

{unit:"unit-3", title:"Set 3E: Maximum & Minimum Applications",
 sub:"Projectiles, area, revenue and number problems",
 formulas:[
  ["Max or min","The vertex: x = -b/(2a). a < 0 → maximum; a > 0 → minimum."],
  ["Projectile (feet)","h(t) = -16t^2 + v₀t + h₀"],
  ["Projectile (meters)","h(t) = -4.9t^2 + v₀t + h₀"],
  ["Revenue","Revenue = (price) × (number sold)"]
 ],
 probs:[
  ["A ball's height is h(t) = -16t^2 + 48t + 6 feet. (a) When does it reach its maximum height, and what is that height? (b) When does it hit the ground?",
   "(a) t = -48/(2(-16)) = 1.5 s. h(1.5) = -16(2.25) + 72 + 6 = -36 + 78 = <b>42 ft at t = 1.5 s</b>.<br>(b) Solve -16t^2 + 48t + 6 = 0. Quadratic formula: t = (-48 ± √(48^2 + 4·16·6))/(-32) = (-48 ± √2688)/(-32)<br>√2688 ≈ 51.85 → t ≈ 3.12 or t ≈ -0.12 (reject the negative time).<br><b>Answer: about 3.12 seconds</b>"],
  ["A farmer has 120 m of fence for a rectangular pen along a river (no fence on the river side). What dimensions give the largest area?",
   "Let x = each side perpendicular to the river. The side parallel to the river is 120 - 2x.<br>A = x(120 - 2x) = -2x^2 + 120x. Vertex: x = -120/(2(-2)) = 30.<br>Parallel side: 120 - 60 = 60.<br><b>Answer: 30 m by 60 m, area 1,800 m²</b>"],
  ["Two numbers add to 20. What is the largest possible product?",
   "Numbers x and 20 - x. P = x(20 - x) = -x^2 + 20x. Vertex x = 10.<br><b>Answer: 10 · 10 = 100</b>"],
  ["A theater sells 300 tickets at $10. For each $1 price increase, 20 fewer tickets are sold. What price maximizes revenue?",
   "Let x = number of $1 increases. R = (10 + x)(300 - 20x) = -20x^2 + 100x + 3000.<br>x = -100/(2(-20)) = 2.5 → price $12.50, tickets 300 - 50 = 250.<br><b>Answer: $12.50, for revenue $3,125</b>"],
  ["A company's cost is C(x) = 0.5x^2 - 40x + 1000 dollars for x units. How many units give the minimum cost, and what is it?",
   "a = 0.5 > 0, so the vertex is a minimum. x = 40/(2·0.5) = 40.<br>C(40) = 0.5(1600) - 1600 + 1000 = 800 - 1600 + 1000 = 200<br><b>Answer: 40 units, minimum cost $200</b>"],
  ["A rectangle has a perimeter of 36 cm. What is the largest possible area?",
   "2L + 2W = 36 → L = 18 - W. A = W(18 - W) = -W^2 + 18W. Vertex W = 9, L = 9.<br><b>Answer: a 9 × 9 square, area 81 cm²</b>"],
  ["Two numbers differ by 8. What is the smallest possible product?",
   "Numbers x and x + 8. P = x^2 + 8x. Vertex x = -8/2 = -4 → numbers -4 and 4.<br><b>Answer: product -16</b>"]
 ]},
{unit:"unit-3", adv:true, title:"Honors Challenge 3: Advanced Quadratic Functions",
 sub:"Parameters, tangent lines, systems, restricted domains, Vieta's formulas, optimization",
 formulas:[
  ["Vertex in general","For y = ax^2 + bx + c, the vertex is (-b/(2a), c - b^2/(4a))."],
  ["Tangent line","A line touches a parabola once when the combined quadratic has discriminant 0."],
  ["Restricted interval","The max or min on [p, q] is at the vertex (if it is inside) or at an endpoint."],
  ["Vieta","r + s = -b/a, rs = c/a; r^2 + s^2 = (r + s)^2 - 2rs; 1/r + 1/s = (r + s)/(rs)"]
 ],
 probs:[
  ["For which values of k does y = x^2 + kx + k + 3 have no x-intercepts?",
   "No x-intercepts → D < 0: k^2 - 4(1)(k + 3) < 0 → k^2 - 4k - 12 < 0 → (k - 6)(k + 2) < 0<br><b>Answer: -2 < k < 6</b>"],
  ["Find b so that the line y = 2x + b is tangent to y = x^2 - 4x + 7. Find the point of tangency.",
   "Set equal: x^2 - 4x + 7 = 2x + b → x^2 - 6x + (7 - b) = 0<br>Tangent → one solution → D = 0: 36 - 4(7 - b) = 0 → 8 + 4b = 0 → <b>b = -2</b><br>Then x^2 - 6x + 9 = 0 → x = 3, y = 2(3) - 2 = 4.<br><b>Point of tangency: (3, 4)</b> (check: 9 - 12 + 7 = 4 ✓)"],
  ["Solve the system y = x^2 - 2x - 3 and y = x + 1.",
   "Substitute: x^2 - 2x - 3 = x + 1 → x^2 - 3x - 4 = 0 → (x - 4)(x + 1) = 0<br>x = 4 → y = 5; x = -1 → y = 0<br><b>Answer: (4, 5) and (-1, 0)</b>"],
  ["Find the maximum and minimum values of f(x) = -2x^2 + 12x - 7 on the interval [0, 2].",
   "Vertex: x = -12/(2(-2)) = 3, which is <b>outside</b> [0, 2].<br>The parabola opens down and rises until x = 3, so f is increasing on [0, 2].<br>f(0) = -7, f(2) = -8 + 24 - 7 = 9<br><b>Answer: maximum 9 at x = 2; minimum -7 at x = 0</b>"],
  ["The two roots of x^2 - 6x + c = 0 differ by 4. Find c.",
   "Let the roots be r and s. Vieta: r + s = 6, and r - s = 4.<br>Add: 2r = 10 → r = 5, s = 1. Product rs = c.<br><b>Answer: c = 5</b>"],
  ["Let p and q be the roots of 2x^2 - 5x - 3 = 0. Without solving, find (a) p^2 + q^2 (b) 1/p + 1/q.",
   "Vieta: p + q = 5/2, pq = -3/2.<br>(a) p^2 + q^2 = (p + q)^2 - 2pq = 25/4 + 3 = <b>37/4</b><br>(b) 1/p + 1/q = (p + q)/(pq) = (5/2) ÷ (-3/2) = <b>-5/3</b><br>Check: the roots are 3 and -1/2: 9 + 1/4 = 37/4 ✓ and 1/3 - 2 = -5/3 ✓"],
  ["Solve x^4 - 5x^2 + 4 < 0.",
   "Factor: (x^2 - 1)(x^2 - 4) < 0 → (x - 2)(x - 1)(x + 1)(x + 2) < 0<br>Zeros: -2, -1, 1, 2. Sign chart (leading term positive): + | − | + | − | +<br><b>Answer: -2 < x < -1 or 1 < x < 2</b>"],
  ["Find the point on the line y = 2x - 5 that is closest to the origin.",
   "Distance squared from (x, 2x - 5) to (0, 0): d^2 = x^2 + (2x - 5)^2 = 5x^2 - 20x + 25<br>Minimize the quadratic: x = 20/(2·5) = 2 → y = -1, d^2 = 20 - 40 + 25 = 5<br><b>Answer: (2, -1), at distance √5</b>"],
  ["Demand for a product is q = 600 - 15p items when the price is p dollars. What price maximizes revenue, and what is the maximum revenue?",
   "R = p · q = p(600 - 15p) = -15p^2 + 600p<br>p = -600/(2(-15)) = 20 → q = 600 - 300 = 300<br><b>Answer: $20, maximum revenue $6,000</b>"],
  ["Write the equation of the parabola with x-intercepts 1 and 5 and a maximum value of 8.",
   "y = a(x - 1)(x - 5). The vertex is halfway between the zeros: x = 3.<br>8 = a(3 - 1)(3 - 5) = -4a → a = -2<br><b>Answer: y = -2(x - 1)(x - 5) = -2x^2 + 12x - 10</b>"],
  ["Show that the vertex of y = ax^2 + bx + c has y-coordinate c - b^2/(4a).",
   "y(-b/(2a)) = a · b^2/(4a^2) - b^2/(2a) + c = b^2/(4a) - 2b^2/(4a) + c<br><b>= c - b^2/(4a)</b> ✓<br><i>Use it:</i> for y = 2x^2 - 8x + 3, the vertex y is 3 - 64/8 = -5."]
 ]},
{unit:"unit-4", title:"Set 4A: Polynomial Functions, Graphs & Zeros",
 sub:"End behavior, multiplicity, Rational Root Theorem, finding all zeros, writing polynomials, polynomial inequalities",
 formulas:[
  ["End behavior","Look at the leading term axⁿ. Even n: both ends the same way. Odd n: opposite ways. a > 0 → right end up."],
  ["Multiplicity","Odd multiplicity → the graph crosses. Even multiplicity → it touches and turns around."],
  ["Rational Root Theorem","Possible rational zeros = ±(factors of the constant)/(factors of the leading coefficient)"],
  ["Fundamental Theorem","A degree-n polynomial has exactly n complex zeros (counting multiplicity)."],
  ["Conjugates","For real coefficients, a + bi and a - bi come in pairs (and a ± √b for rational coefficients)."]
 ],
 probs:[
  ["Describe the end behavior of f(x) = -3x^4 + 2x - 1.",
   "Leading term -3x^4: degree 4 is <b>even</b> and the coefficient is <b>negative</b>, so both ends go down.<br><b>Answer: as x → -∞, f(x) → -∞; as x → ∞, f(x) → -∞</b>"],
  ["For f(x) = (x - 1)^2(x + 2), find the zeros and multiplicities, the behavior at each zero, the end behavior and the y-intercept.",
   "x = 1: multiplicity 2 → <b>touches</b> and turns around.<br>x = -2: multiplicity 1 → <b>crosses</b>.<br>Degree 3, leading coefficient +1 → falls to the left, rises to the right.<br>y-intercept: f(0) = (−1)^2(2) = <b>2</b>"],
  ["List the possible rational zeros of f(x) = 2x^3 - 3x^2 - 8x + 12, then find all zeros.",
   "p | 12: 1, 2, 3, 4, 6, 12. &nbsp; q | 2: 1, 2.<br>Possible: ±1, ±2, ±3, ±4, ±6, ±12, ±1/2, ±3/2<br>Group: x^2(2x - 3) - 4(2x - 3) = (2x - 3)(x - 2)(x + 2)<br><b>Answer: x = 3/2, 2, -2</b>"],
  ["Find all zeros of f(x) = x^3 - 3x^2 + 4x - 12.",
   "Group: x^2(x - 3) + 4(x - 3) = (x - 3)(x^2 + 4)<br>x - 3 = 0 → x = 3. &nbsp; x^2 + 4 = 0 → x^2 = -4 → x = ±2i<br><b>Answer: x = 3, 2i, -2i</b> (3 zeros for degree 3 ✓)"],
  ["Find all zeros of f(x) = x^3 - 2x^2 - 5x + 6.",
   "Test x = 1: 1 - 2 - 5 + 6 = 0 ✓, so (x - 1) is a factor.<br>Synthetic division by 1: coefficients 1, -2, -5, 6 → bottom row 1, -1, -6 | 0<br>Quotient x^2 - x - 6 = (x - 3)(x + 2)<br><b>Answer: x = 1, 3, -2</b>"],
  ["Write the polynomial of least degree with leading coefficient 1 and zeros -2, 1 and 4.",
   "f(x) = (x + 2)(x - 1)(x - 4)<br>(x - 1)(x - 4) = x^2 - 5x + 4; then (x + 2)(x^2 - 5x + 4) = x^3 - 5x^2 + 4x + 2x^2 - 10x + 8<br><b>Answer: f(x) = x^3 - 3x^2 - 6x + 8</b>"],
  ["Write a polynomial of least degree with integer coefficients that has zeros 3 and 1 + 2i.",
   "Conjugate pair: 1 - 2i is also a zero. (x - (1 + 2i))(x - (1 - 2i)) = x^2 - 2x + 5 (sum 2, product 1 + 4 = 5)<br>(x - 3)(x^2 - 2x + 5) = x^3 - 2x^2 + 5x - 3x^2 + 6x - 15<br><b>Answer: x^3 - 5x^2 + 11x - 15</b>"],
  ["Solve x^3 - x^2 - 6x > 0.",
   "Factor: x(x^2 - x - 6) = x(x - 3)(x + 2). Zeros: -2, 0, 3.<br>Sign chart: (-∞, -2): − &nbsp;|&nbsp; (-2, 0): + &nbsp;|&nbsp; (0, 3): − &nbsp;|&nbsp; (3, ∞): +<br><b>Answer: (-2, 0) ∪ (3, ∞)</b>"]
 ]},

{unit:"unit-4", adv:true, title:"Honors Challenge 4: Advanced Polynomial Functions",
 sub:"Two rational zeros at once, factor theorem with a parameter, multiplicity and a point, Vieta for cubics, a volume model",
 formulas:[
  ["Vieta (cubic)","For ax^3 + bx^2 + cx + d: sum of zeros = -b/a, sum of pairwise products = c/a, product = -d/a"],
  ["Dividing by a quadratic factor","If r and s are zeros, divide by (x - r)(x - s) at once."]
 ],
 probs:[
  ["Find all zeros of f(x) = x^4 - x^3 - 7x^2 + x + 6.",
   "f(1) = 1 - 1 - 7 + 1 + 6 = 0 and f(-1) = 1 + 1 - 7 - 1 + 6 = 0, so (x - 1)(x + 1) = x^2 - 1 is a factor.<br>Divide: (x^4 - x^3 - 7x^2 + x + 6) ÷ (x^2 - 1) = x^2 - x - 6 = (x - 3)(x + 2)<br><b>Answer: x = 1, -1, 3, -2</b>"],
  ["Find k so that x + 2 is a factor of 2x^3 + kx^2 - 5x - 2.",
   "P(-2) = 2(-8) + k(4) - 5(-2) - 2 = -16 + 4k + 10 - 2 = 4k - 8 = 0<br><b>Answer: k = 2</b>"],
  ["Write the degree-4 polynomial with real coefficients that has a zero of multiplicity 2 at x = 2, a zero at x = i, and y-intercept 8.",
   "i → its conjugate -i is also a zero: factor (x - i)(x + i) = x^2 + 1.<br>f(x) = a(x - 2)^2(x^2 + 1). f(0) = a(4)(1) = 4a = 8 → a = 2<br><b>Answer: f(x) = 2(x - 2)^2(x^2 + 1)</b>"],
  ["Without solving, find the sum and the product of the zeros of 2x^3 - 6x^2 + 5x - 7.",
   "Sum = -b/a = 6/2 = <b>3</b>. &nbsp; Product = -d/a = 7/2 = <b>7/2</b>"],
  ["Squares of side x are cut from the corners of a 12 × 12 sheet, and the sides are folded up into an open box. For what x is the volume 128 cubic units?",
   "V = x(12 - 2x)^2 = 4x(6 - x)^2. Set 4x(6 - x)^2 = 128 → x(6 - x)^2 = 32 → x^3 - 12x^2 + 36x - 32 = 0<br>Test x = 2: 8 - 48 + 72 - 32 = 0 ✓ → (x - 2)(x^2 - 10x + 16) = (x - 2)^2(x - 8)<br>x = 8 is impossible (12 - 16 < 0).<br><b>Answer: x = 2</b> (box 8 × 8 × 2)"]
 ]},

{unit:"unit-5", title:"Set 5A: Rational Expressions, Functions & Equations",
 sub:"Simplifying, operations, complex fractions, asymptotes and holes, equations with extraneous solutions, work problems",
 formulas:[
  ["Simplify","Factor top and bottom, cancel common factors, list excluded values from the original."],
  ["Add / subtract","Find the LCD, rewrite each fraction, combine numerators."],
  ["Vertical asymptote / hole","Factor. A factor that cancels → hole. A factor left in the bottom → vertical asymptote."],
  ["Horizontal asymptote","deg top < deg bottom: y = 0. Equal: y = ratio of leading coefficients. deg top = deg bottom + 1: slant asymptote."],
  ["Rational equations","Multiply by the LCD, solve, then reject any answer that makes a denominator 0."]
 ],
 probs:[
  ["Simplify {{x^2 - 4x - 5|x^2 - 25}}.",
   "Factor: {{(x - 5)(x + 1)|(x - 5)(x + 5)}}. Excluded: x ≠ 5, -5.<br><b>Answer: {{x + 1|x + 5}}, x ≠ ±5</b>"],
  ["Multiply {{x^2 - 9|2x + 4}} · {{x + 2|x - 3}}.",
   "Factor: {{(x - 3)(x + 3)|2(x + 2)}} · {{x + 2|x - 3}}. Cancel (x - 3) and (x + 2).<br><b>Answer: {{x + 3|2}}, x ≠ -2, 3</b>"],
  ["Subtract {{3|x - 1}} - {{2|x + 2}}.",
   "LCD (x - 1)(x + 2). Numerator: 3(x + 2) - 2(x - 1) = 3x + 6 - 2x + 2 = x + 8<br><b>Answer: {{x + 8|(x - 1)(x + 2)}}</b>"],
  ["Simplify the complex fraction {{1/x + 1/2|1/x - 1/2}}.",
   "Multiply the top and bottom by the LCD 2x: {{2 + x|2 - x}}<br><b>Answer: {{x + 2|2 - x}}</b>, x ≠ 0, 2"],
  ["For f(x) = {{2x - 6|x + 1}}, find the asymptotes and intercepts.",
   "VA: x + 1 = 0 → <b>x = -1</b>. HA: equal degrees → y = 2/1 = <b>2</b>.<br>x-intercept: 2x - 6 = 0 → <b>(3, 0)</b>. y-intercept: f(0) = -6 → <b>(0, -6)</b>"],
  ["For f(x) = {{x^2 - 1|x^2 - x - 2}}, find any holes, asymptotes and x-intercepts.",
   "Factor: {{(x - 1)(x + 1)|(x - 2)(x + 1)}}. (x + 1) cancels → <b>hole at x = -1</b>; its y-value: (−1 − 1)/(−1 − 2) = 2/3 → (-1, 2/3).<br><b>VA x = 2</b>, <b>HA y = 1</b>, <b>x-intercept (1, 0)</b>"],
  ["Solve {{x|x - 2}} + 1 = {{2|x - 2}}.",
   "Excluded: x ≠ 2. Multiply by (x - 2): x + (x - 2) = 2 → 2x = 4 → x = 2.<br>But x = 2 is excluded, so it is <b>extraneous</b>.<br><b>Answer: no solution</b>"],
  ["Solve {{1|x}} + {{1|x + 2}} = {{4|3}}.",
   "LCD 3x(x + 2): 3(x + 2) + 3x = 4x(x + 2) → 6x + 6 = 4x^2 + 8x → 4x^2 + 2x - 6 = 0 → 2x^2 + x - 3 = 0<br>(2x + 3)(x - 1) = 0. Neither makes a denominator 0.<br><b>Answer: x = 1 or x = -3/2</b>"],
  ["Ana can paint a room in 4 hours and Ben in 6 hours. How long does it take them working together?",
   "Rates: 1/4 and 1/6 room per hour. Together: 1/4 + 1/6 = 3/12 + 2/12 = 5/12 room per hour.<br>Time = 1 ÷ (5/12) = 12/5<br><b>Answer: 2.4 hours (2 h 24 min)</b>"]
 ]},

{unit:"unit-5", adv:true, title:"Honors Challenge 5: Advanced Rational Functions",
 sub:"Slant asymptotes, rational inequalities, finding parameters, a rate problem",
 formulas:[
  ["Slant asymptote","Divide: f(x) = (quotient) + (remainder)/(divisor). The quotient line is the slant asymptote."],
  ["Rational inequalities","Get 0 on one side and one fraction on the other. Critical values: zeros of top and bottom. Bottom zeros are never included."]
 ],
 probs:[
  ["Find the vertical and slant asymptotes of f(x) = {{2x^2 + 3x - 1|x - 1}}.",
   "Synthetic division by 1: 2, 3, -1 → 2, 5 | 4 → f(x) = 2x + 5 + {{4|x - 1}}<br><b>VA x = 1; slant asymptote y = 2x + 5</b>"],
  ["Solve {{x + 1|x - 3}} ≤ 0.",
   "Critical values: x = -1 (top) and x = 3 (bottom, never included).<br>Sign chart: (-∞, -1): + &nbsp;|&nbsp; (-1, 3): − &nbsp;|&nbsp; (3, ∞): +<br><b>Answer: [-1, 3)</b>"],
  ["Solve {{x|x + 1}} ≥ 2.",
   "Don't multiply by x + 1 (its sign is unknown). Subtract 2: {{x - 2(x + 1)|x + 1}} = {{-x - 2|x + 1}} ≥ 0, i.e. {{x + 2|x + 1}} ≤ 0.<br>Critical values -2 (included) and -1 (excluded). Negative between them.<br><b>Answer: [-2, -1)</b>"],
  ["Find a and b so that f(x) = {{ax + 3|x + b}} has vertical asymptote x = 2 and horizontal asymptote y = -4.",
   "VA x = 2 → x + b = 0 at x = 2 → <b>b = -2</b>. HA y = a/1 = -4 → <b>a = -4</b>.<br>f(x) = {{-4x + 3|x - 2}}"],
  ["A driver travels 60 miles to a city and 60 miles back, 10 mph faster on the return. The whole trip takes 5 hours. Find the speed going.",
   "Time = distance/rate: {{60|r}} + {{60|r + 10}} = 5<br>Multiply by r(r + 10): 60(r + 10) + 60r = 5r(r + 10) → 5r^2 - 70r - 600 = 0 → r^2 - 14r - 120 = 0 → (r - 20)(r + 6) = 0<br><b>Answer: 20 mph</b> (check: 3 h + 2 h = 5 h ✓)"]
 ]},

{unit:"unit-6", title:"Set 6A: Radicals, Rational Exponents & Inverses",
 sub:"Simplifying radicals, rational exponents, combining and rationalizing, radical equations, composition and inverses",
 formulas:[
  ["Rational exponents","a^(m/n) = (ⁿ√a)^m = ⁿ√(a^m); a^(-n) = 1/a^n"],
  ["Simplifying √","Pull out perfect squares: √(a²b) = a√b (a ≥ 0). For ∛ pull out perfect cubes."],
  ["Rationalizing","Multiply by √b/√b, or by the conjugate (a - √b)/(a - √b)."],
  ["Radical equations","Isolate the radical, raise both sides to the power, solve, then CHECK every answer."],
  ["Inverse","Swap x and y, solve for y. Check: f(f⁻¹(x)) = x."]
 ],
 probs:[
  ["Simplify √(98x^5y^2). Assume variables are positive.",
   "98 = 49 · 2, x^5 = x^4 · x, y^2 is a perfect square.<br>√49 = 7, √(x^4) = x^2, √(y^2) = y<br><b>Answer: 7x^2y√(2x)</b>"],
  ["Simplify ∛(-54x^7).",
   "-54 = -27 · 2, x^7 = x^6 · x. ∛(-27) = -3, ∛(x^6) = x^2<br><b>Answer: -3x^2∛(2x)</b>"],
  ["Evaluate (a) 32^(3/5) &nbsp; (b) 81^(-3/4).",
   "(a) ⁵√32 = 2, then 2^3 = <b>8</b><br>(b) 81^(-3/4) = 1/81^(3/4); ∜81 = 3, 3^3 = 27 → <b>1/27</b>"],
  ["Simplify x^(2/3) · x^(1/2).",
   "Add the exponents: 2/3 + 1/2 = 4/6 + 3/6 = 7/6<br><b>Answer: x^(7/6)</b> = x · ⁶√x"],
  ["Simplify 3√12 + 5√27 - √48.",
   "√12 = 2√3, √27 = 3√3, √48 = 4√3<br>6√3 + 15√3 - 4√3<br><b>Answer: 17√3</b>"],
  ["Rationalize {{10|3 - √5}}.",
   "Multiply by the conjugate (3 + √5)/(3 + √5): bottom 9 - 5 = 4, top 10(3 + √5) = 30 + 10√5<br>{{30 + 10√5|4}}<br><b>Answer: {{15 + 5√5|2}}</b>"],
  ["Solve √(2x + 3) = x.",
   "Square: 2x + 3 = x^2 → x^2 - 2x - 3 = 0 → (x - 3)(x + 1) = 0<br>Check x = 3: √9 = 3 ✓. Check x = -1: √1 = 1 ≠ -1 ✗ (extraneous)<br><b>Answer: x = 3</b>"],
  ["Solve √(x + 5) + 1 = x.",
   "Isolate: √(x + 5) = x - 1. Square: x + 5 = x^2 - 2x + 1 → x^2 - 3x - 4 = 0 → x = 4 or x = -1<br>x = 4: √9 + 1 = 4 ✓. x = -1: √4 + 1 = 3 ≠ -1 ✗<br><b>Answer: x = 4</b>"],
  ["f(x) = x^2 - 1 and g(x) = 2x + 3. Find f(g(x)) and g(f(x)).",
   "f(g(x)) = (2x + 3)^2 - 1 = 4x^2 + 12x + 9 - 1 = <b>4x^2 + 12x + 8</b><br>g(f(x)) = 2(x^2 - 1) + 3 = <b>2x^2 + 1</b>"],
  ["Find the inverse of f(x) = 3x - 7 and verify it.",
   "Swap: x = 3y - 7 → 3y = x + 7 → y = (x + 7)/3<br>Check: f((x + 7)/3) = 3 · (x + 7)/3 - 7 = x ✓<br><b>Answer: f⁻¹(x) = {{x + 7|3}}</b>"]
 ]},

{unit:"unit-6", adv:true, title:"Honors Challenge 6: Advanced Radicals & Inverses",
 sub:"Two radicals, equations in quadratic form, inverse of a rational function, domain of a composition",
 formulas:[
  ["Two radicals","Isolate one radical, square, then isolate the other and square again."],
  ["Quadratic form","x^(2/3) - 5x^(1/3) + 6 = 0: let u = x^(1/3)."],
  ["Domain of f ∘ g","x must be in the domain of g, and g(x) must be in the domain of f."]
 ],
 probs:[
  ["Solve √(x + 7) - √x = 1.",
   "√(x + 7) = 1 + √x. Square: x + 7 = 1 + 2√x + x → 6 = 2√x → √x = 3 → x = 9<br>Check: √16 - √9 = 4 - 3 = 1 ✓<br><b>Answer: x = 9</b>"],
  ["Solve x^(2/3) - 5x^(1/3) + 6 = 0.",
   "u = x^(1/3): u^2 - 5u + 6 = (u - 2)(u - 3) = 0 → x^(1/3) = 2 or 3 → cube both sides<br><b>Answer: x = 8 or x = 27</b>"],
  ["Find the inverse of f(x) = {{2x + 1|x - 3}}.",
   "Swap: x = {{2y + 1|y - 3}} → xy - 3x = 2y + 1 → xy - 2y = 3x + 1 → y(x - 2) = 3x + 1<br><b>Answer: f⁻¹(x) = {{3x + 1|x - 2}}</b>"],
  ["Show that f(x) = ∛(x - 1) + 2 and g(x) = (x - 2)^3 + 1 are inverses.",
   "f(g(x)) = ∛((x - 2)^3 + 1 - 1) + 2 = (x - 2) + 2 = x ✓<br>g(f(x)) = (∛(x - 1) + 2 - 2)^3 + 1 = (x - 1) + 1 = x ✓<br><b>Both compositions give x, so they are inverses.</b>"],
  ["f(x) = √x and g(x) = 4 - x^2. Find (f ∘ g)(x) and its domain.",
   "f(g(x)) = √(4 - x^2). Need 4 - x^2 ≥ 0 → x^2 ≤ 4<br><b>Answer: √(4 - x^2), domain -2 ≤ x ≤ 2</b>"]
 ]},
{unit:"unit-2", title:"Set 2I: Special Products (Cubes & Trinomials)",
 sub:"Cube of a binomial, square and cube of a trinomial, using the patterns backwards, mental math",
 formulas:[
  ["Cube of a binomial","(a ± b)^3 = a^3 ± 3a^2b + 3ab^2 ± b^3"],
  ["Square of a trinomial","(a + b + c)^2 = a^2 + b^2 + c^2 + 2ab + 2bc + 2ca"],
  ["Cube of a trinomial","(a + b + c)^3 = a^3 + b^3 + c^3 + 3a^2b + 3a^2c + 3ab^2 + 3b^2c + 3ac^2 + 3bc^2 + 6abc"],
  ["Useful identity","a^2 + b^2 + c^2 = (a + b + c)^2 - 2(ab + bc + ca)"]
 ],
 probs:[
  ["Expand (x + 4)^3.",
   "a = x, b = 4: x^3 + 3(x^2)(4) + 3(x)(4^2) + 4^3<br><b>= x^3 + 12x^2 + 48x + 64</b>"],
  ["Expand (2x - 3)^3.",
   "a = 2x, b = 3 (minus pattern): (2x)^3 - 3(2x)^2(3) + 3(2x)(3)^2 - 3^3<br>= 8x^3 - 3(4x^2)(3) + 3(2x)(9) - 27<br><b>= 8x^3 - 36x^2 + 54x - 27</b>"],
  ["Expand (x + 2y)^3.",
   "a = x, b = 2y: x^3 + 3x^2(2y) + 3x(2y)^2 + (2y)^3 = x^3 + 6x^2y + 3x(4y^2) + 8y^3<br><b>= x^3 + 6x^2y + 12xy^2 + 8y^3</b>"],
  ["Expand (3x - 2y)^3.",
   "a = 3x, b = 2y: (3x)^3 - 3(3x)^2(2y) + 3(3x)(2y)^2 - (2y)^3<br>= 27x^3 - 3(9x^2)(2y) + 3(3x)(4y^2) - 8y^3<br><b>= 27x^3 - 54x^2y + 36xy^2 - 8y^3</b>"],
  ["Factor 27x^3 - 54x^2 + 36x - 8.",
   "First term: ∛(27x^3) = 3x. Last term: ∛8 = 2, and the signs alternate → try (3x - 2)^3.<br>Check middle terms: 3(3x)^2(2) = 54x^2 ✓ and 3(3x)(2)^2 = 36x ✓<br><b>= (3x - 2)^3</b>"],
  ["Expand (x + y - 3)^2.",
   "Squares: x^2 + y^2 + 9<br>Twice each pair: 2(x)(y) = 2xy, 2(y)(-3) = -6y, 2(x)(-3) = -6x<br><b>= x^2 + y^2 + 9 + 2xy - 6x - 6y</b>"],
  ["Expand (2a - b + c)^2.",
   "Squares: 4a^2 + b^2 + c^2<br>Pairs: 2(2a)(-b) = -4ab, 2(-b)(c) = -2bc, 2(2a)(c) = 4ac<br><b>= 4a^2 + b^2 + c^2 - 4ab - 2bc + 4ac</b>"],
  ["Factor x^2 + 4y^2 + 9 + 4xy + 6x + 12y.",
   "Square roots of the square terms: x, 2y, 3. Check the pairs: 2(x)(2y) = 4xy ✓, 2(x)(3) = 6x ✓, 2(2y)(3) = 12y ✓<br><b>= (x + 2y + 3)^2</b>"],
  ["Expand (x + y + 1)^3.",
   "Use (a + b + c)^3 with a = x, b = y, c = 1:<br>Cubes: x^3 + y^3 + 1. &nbsp; ×3 terms: 3x^2y + 3x^2 + 3xy^2 + 3y^2 + 3x + 3y. &nbsp; ×6: 6xy<br><b>= x^3 + y^3 + 3x^2y + 3xy^2 + 3x^2 + 6xy + 3y^2 + 3x + 3y + 1</b><br>Check: coefficients add to 27 = 3^3 ✓"],
  ["Expand (x + 2y - 1)^3.",
   "a = x, b = 2y, c = -1.<br>Cubes: x^3 + 8y^3 - 1<br>3a^2b = 6x^2y, 3a^2c = -3x^2, 3ab^2 = 12xy^2, 3b^2c = -12y^2, 3ac^2 = 3x, 3bc^2 = 6y, 6abc = -12xy<br><b>= x^3 + 6x^2y + 12xy^2 + 8y^3 - 3x^2 - 12xy - 12y^2 + 3x + 6y - 1</b>"],
  ["Compute 99^3 without a calculator.",
   "99 = 100 - 1: (100 - 1)^3 = 100^3 - 3(100^2)(1) + 3(100)(1^2) - 1<br>= 1,000,000 - 30,000 + 300 - 1<br><b>= 970,299</b>"],
  ["If a + b + c = 6 and ab + bc + ca = 11, find a^2 + b^2 + c^2.",
   "(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca) → 36 = a^2 + b^2 + c^2 + 22<br><b>a^2 + b^2 + c^2 = 14</b>"]
 ]}
];

/* ---------- graphs for the worked sets ---------- */
(function(){
  const L=window.A2PLOT; if(!L) return; const PB=L.parab, PF=L.polyF, A=Math.abs, Inf=Infinity;
  const withPts=(s,pts)=>{s.p.push(...pts);return s;};
  const RG2=(f,vas,o)=>{const c=[-1e9,...vas,1e9],pc=[];for(let i=0;i<c.length-1;i++)pc.push({f,d:[c[i]+1e-7,c[i+1]-1e-7]});return Object.assign({f:[...pc,...(o.slant?[{f:o.slant,dash:true}]:[])],v:vas,yr:[-10,10],cap:"Dashed lines are asymptotes."},o);};
  const G={
  0:{0:{f:[x=>A(x-4)],h:[9],p:[[-5,9],[13,9]],cap:"y = |x − 4| meets the line y = 9 at x = −5 and x = 13."},
     1:{f:[x=>3*A(2*x+1)-5],h:[16],p:[[-4,16],[3,16]]},
     2:{f:[x=>A(5*x-2)+8],h:[3],cap:"The V never goes below 8, so it never reaches y = 3: no solution."},
     3:{f:[x=>A(x+3),{f:x=>2*x,light:true}],p:[[3,6,"(3, 6)"],[-1,-2,"x = −1 is extraneous",true]],cap:"Gray: y = 2x. The graphs meet only at x = 3."},
     4:{f:[x=>A(2*x-3),{f:x=>A(x+6),light:true}],p:[[9,15],[-1,5]]},
     5:{f:[x=>A(x-2)],h:[5],p:[[-3,5,"",true],[7,5,"",true]],xi:[[-3,7,false,false]],cap:"The V is below y = 5 between x = −3 and x = 7."},
     6:{f:[x=>A(3*x+4)],h:[10],p:[[-14/3,10,""],[2,10,""]],xi:[[-Inf,-14/3,false,true],[2,Inf,true,false]],cap:"The V is on or above y = 10 outside the two points."},
     7:{f:[x=>-2*A(x+1)+7],h:[1],p:[[-4,1,"",true],[2,1,"",true]],xi:[[-4,2,false,false]]},
     9:{nl:true,xi:[[15.7,16.3,true,true]],p:[[16,0,"16",true]],xr:[15.4,16.6],cap:"Acceptable weights: within 0.3 oz of 16."},
     10:{nl:true,xi:[[3,11,true,true]],p:[[7,0,"center 7",true]]}},
  1:{0:{f:[x=>5-2*(x+2)],p:[[-2,5],[4,-7]],seg:[[-2,5,4,5],[4,5,4,-7]],cap:"Run 6, rise −12 (dashed)."},
     1:{f:[x=>2/3*x-3],p:[[3,-1],[0,-3]]},
     2:{f:[x=>3*x+7],p:[[-1,4],[2,13]]},
     3:{f:[x=>4/3*x-4],p:[[3,0],[0,-4]],eq:true},
     4:{f:[{f:x=>-5*x+2,dash:true},x=>-5*x+11],p:[[1,6]],cap:"Dashed: y = −5x + 2. Solid: the parallel line."},
     5:{f:[{f:x=>-0.4*x+2,dash:true},x=>2.5*x-13],p:[[4,-3]],eq:true,cap:"Same scale on both axes, so the right angle looks right."},
     6:{f:[x=>8],seg:[[-3,-50,-3,50]],p:[[-3,8]],xr:[-8,4],yr:[-3,12],cap:"Horizontal y = 8 (solid), vertical x = −3 (dashed)."},
     7:{f:[{f:x=>65*x+60,d:[0,1e9]}],p:[[2,190],[5,385],[0,60,"fixed fee (0, 60)"]],xr:[-0.5,7],cap:"Hours on the horizontal axis, cost on the vertical axis."},
     8:{f:[x=>0.5*x-2/3,{f:x=>-2*x+1,light:true}],eq:true,p:[[2/3,-1/3,""]],cap:"Equal scales: the lines meet at a right angle."}},
  2:{6:withPts(PB(1,-2,5),[[1,4,"(1, 4)"],[-1,8,"(−1, 8)"],[2,5,"(2, 5)"]])},
  3:{0:{f:[{f:x=>2*x+1,d:[-1e9,0]},{f:x=>x*x,d:[0,3]},{f:x=>10-x,d:[3,1e9]}],p:[[0,1,"",true],[0,0,""],[3,9,""],[3,7,"",true],[-4,-7],[5,5]],xr:[-5,7],cap:"Open circle: not included. Closed circle: included."},
     1:{f:[{f:x=>2*x+1,d:[-1e9,0]},{f:x=>x*x,d:[0,3]},{f:x=>10-x,d:[3,1e9]}],p:[[0,1,"",true],[0,0,""],[3,9,"highest point (3, 9)"],[3,7,"",true]],xr:[-5,7],cap:"Range (−∞, 9]. Jumps at x = 0 and x = 3."},
     2:{f:[{f:x=>-x+2,d:[-1e9,1]},{f:x=>2*x-3,d:[1,1e9]}],p:[[1,1,"(1, 1)"],[1,-1,"(1, −1)",true]],cap:"A jump at x = 1, so g is not continuous."},
     3:{f:[x=>A(2*x-6)],p:[[3,0,"(3, 0)"]]},
     4:{f:[{f:x=>x*x+1,d:[-1e9,2]},{f:x=>3*x-1,d:[2,1e9]}],p:[[2,5,"the pieces meet at (2, 5)"]]},
     5:{f:[{f:x=>40,d:[0,5]},{f:x=>40+10*(x-5),d:[5,1e9]}],p:[[3,40],[8,70]],xr:[-0.5,10],yr:[0,90],cap:"GB used (horizontal) vs monthly cost (vertical)."}},
  4:{0:{f:[x=>A(x-1)+A(x+2)],h:[7],p:[[-4,7],[3,7]],cap:"Flat between −2 and 1 (height 3)."},
     1:{f:[x=>A(x*x-4),{f:x=>3*x,light:true}],p:[[1,3],[4,12]],xr:[-4,6]},
     2:{f:[x=>A(2*x-5),{f:x=>x+1,light:true}],p:[[4/3,7/3],[6,7]],xi:[[4/3,6,true,true]],cap:"The V is on or below the gray line between the points."},
     3:{nl:true,xi:[[-1,2,true,false],[4,7,false,true]],p:[[3,0,"3",true]]},
     4:{f:[x=>A(x+1),{f:x=>A(x)+1,dash:true}],xi:[[0,Inf,true,false]],cap:"The graphs are the same for x ≥ 0."},
     6:{f:[x=>-1.5*x+4.5],p:[[-2,1,"A"],[4,5,"B"],[1,3,"midpoint (1, 3)"]],seg:[[-2,1,4,5]],eq:true},
     7:{f:[x=>3+Math.sqrt(Math.max(0,13-(x-2)**2)),x=>3-Math.sqrt(Math.max(0,13-(x-2)**2))].map(f=>({f,d:[2-Math.sqrt(13),2+Math.sqrt(13)]})),p:[[0,0],[4,0],[0,6],[2,3,"center (2, 3)"]],eq:true},
     9:{f:[{f:x=>x+1.5,d:[-1e9,1]},{f:x=>2.5*x*x,d:[1,2]},{f:x=>3*x+4,d:[2,1e9]}],p:[[1,2.5],[2,10]],xr:[-3,4],cap:"No jumps: the function is continuous."},
     10:{f:[x=>-2*A(x-3)+4],p:[[3,4],[1,0],[5,0]],sh:{f:x=>Math.max(0,-2*A(x-3)+4),above:false},cap:"The triangle has base 4 and height 4."}},
  6:{0:PB(1,9,20,{cap:"Graph check: x-intercepts −5 and −4 match (x + 4)(x + 5)."})},
  8:{7:{f:[PF([1,0,0,0,-81])],p:[[-3,0],[3,0]],yr:[-90,60],cap:"Only two real zeros: x² + 9 has none."}},
  9:{0:{f:[PF([1,0,-13,0,36])],p:[[-3,0,"−3"],[-2,0,"−2"],[2,0,"2"],[3,0,"3"]],yr:[-12,40],cap:"Four x-intercepts: ±2 and ±3."}},
  10:{0:PB(1,-5,-14),1:PB(2,5,-3),3:PB(1,-8,-2),4:PB(1,6,-11),5:PB(3,-2,5),6:PB(1,-4,13),7:PB(4,20,25),
      8:{f:[PF([1,-5,-4,20])],p:[[-2,0],[2,0],[5,0]],yr:[-25,35]},9:{f:[PF([1,0,-5,0,4])],p:[[-2,0],[-1,0],[1,0],[2,0]],yr:[-4,8]},
      11:{f:[{f:w=>w*(2*w+3),d:[0,1e9]}],h:[65],p:[[5,65,"w = 5"]],xr:[-0.5,7]}},
  12:{0:{f:[PF([2,-3,-11,6])],p:[[-2,0],[0.5,0],[3,0]],yr:[-20,20]},5:{f:[PF([1,3,0,-1,5])],p:[[-1,4,"(−1, 4): remainder 4"]],yr:[-10,20]}},
  13:{10:{f:[PF([2,1,-8,-4])],p:[[-2,0],[-0.5,0],[2,0]],yr:[-15,15]}},
  14:{0:PB(2,-8,3),1:PB(1,6,5),2:PB(-3,12,-7),3:PB(2,6,-1),4:PB(-1,-4,5),5:PB(-2,-16,-31),6:PB(3,-12,0),7:PB(1,-2,-8)},
  15:{0:PB(2,-3,5),1:PB(1,-10,25),2:PB(3,7,-6),3:PB(2,4,-3),4:{f:[x=>x*x+6*x+9,{f:x=>x*x-6*x+9,dash:true}],p:[[-3,0],[3,0]],cap:"k = 6 (solid) and k = −6 (dashed): each just touches the x-axis."}},
  16:{0:PB(1,-1,-12,{extra:{xi:[[-Inf,-3,false,false],[4,Inf,false,false]]},cap:"Above the x-axis outside the zeros."}),
      1:PB(1,2,-15,{extra:{xi:[[-5,3,true,true]]},cap:"On or below the x-axis between the zeros."}),
      2:PB(2,5,-3,{extra:{xi:[[-Inf,-3,false,true],[0.5,Inf,true,false]]}}),
      3:PB(-1,4,5,{extra:{xi:[[-1,5,false,false]]},cap:"Opens down: above the axis between the zeros."}),
      4:PB(1,-6,9,{cap:"(x − 3)² touches the axis at 3 and is positive everywhere else."}),
      5:{f:[{f:x=>x*x-3*x+1,dash:true}],sh:{f:x=>x*x-3*x+1,above:true},p:[[1,2,"(1, 2)"]],cap:"Dashed boundary (strict >), shaded above."},
      6:{f:[{f:t=>-16*t*t+64*t+4,d:[0,4.06]}],h:[52],p:[[1,52],[3,52]],xi:[[1,3,false,false]],xr:[-0.3,4.5],cap:"Above 52 ft between t = 1 and t = 3."}},
  17:{0:withPts(PB(2,-8,5),[[4,5,"given (4, 5)"]]),1:withPts(PB(-2,8,10),[[2,18,"given (2, 18)"]]),2:withPts(PB(1,-4,3),[[-1,8,"(−1, 8)"]]),3:PB(3,10,-8),4:PB(1,-6,7),5:PB(1,-2,5),6:PB(-3,-6,1)},
  18:{0:{f:[{f:t=>-16*t*t+48*t+6,d:[0,3.12]}],p:[[1.5,42,"max (1.5, 42)"],[3.12,0,"lands ≈ 3.12 s"],[0,6,"start"]],xr:[-0.3,3.6]},
      1:{f:[{f:x=>x*(120-2*x),d:[0,60]}],p:[[30,1800,"max (30, 1800)"]],xr:[-3,63]},2:{f:[{f:x=>x*(20-x),d:[0,20]}],p:[[10,100,"max (10, 100)"]]},
      3:{f:[{f:x=>-20*x*x+100*x+3000,d:[0,15]}],p:[[2.5,3125,"max at x = 2.5"]],xr:[-1,16],yr:[0,3500]},
      4:{f:[{f:x=>0.5*x*x-40*x+1000,d:[0,80]}],p:[[40,200,"min (40, 200)"]],xr:[-2,82]},5:{f:[{f:w=>w*(18-w),d:[0,18]}],p:[[9,81,"max (9, 81)"]]},6:PB(1,8,0)},
  19:{0:{f:[x=>x*x-2*x+1,{f:x=>x*x+6*x+9,dash:true}],cap:"Boundary cases k = −2 (dashed) and k = 6 (solid) just touch the axis."},
      1:{f:[x=>x*x-4*x+7,{f:x=>2*x-2,light:true}],p:[[3,4,"tangent point (3, 4)"]]},2:{f:[x=>x*x-2*x-3,{f:x=>x+1,light:true}],p:[[4,5],[-1,0]]},
      3:{f:[{f:x=>-2*x*x+12*x-7,light:true},{f:x=>-2*x*x+12*x-7,d:[0,2]}],p:[[0,-7],[2,9],[3,11,"vertex (3, 11)",true]],cap:"Dark part: the interval [0, 2]."},
      6:{f:[PF([1,0,-5,0,4])],xi:[[-2,-1,false,false],[1,2,false,false]],yr:[-4,8]},
      7:{f:[x=>2*x-5],p:[[2,-1,"closest point (2, −1)"],[0,0,"O"]],seg:[[0,0,2,-1]],eq:true},
      8:{f:[{f:p=>-15*p*p+600*p,d:[0,40]}],p:[[20,6000,"max (20, 6000)"]],xr:[-2,42]},9:PB(-2,12,-10)},
  20:{0:{f:[x=>-3*x**4+2*x-1],yr:[-12,4],cap:"Both ends point down."},1:{f:[x=>(x-1)**2*(x+2)],p:[[1,0,"touch at 1"],[-2,0,"cross at −2"],[0,2,"(0, 2)"]],yr:[-6,8]},
      2:{f:[PF([2,-3,-8,12])],p:[[-2,0],[1.5,0],[2,0]],yr:[-10,20]},3:{f:[PF([1,-3,4,-12])],p:[[3,0]],yr:[-25,15],cap:"One x-intercept; the other zeros ±2i are complex."},
      4:{f:[PF([1,-2,-5,6])],p:[[-2,0],[1,0],[3,0]],yr:[-10,12]},5:{f:[PF([1,-3,-6,8])],p:[[-2,0],[1,0],[4,0]],yr:[-20,15]},6:{f:[PF([1,-5,11,-15])],p:[[3,0]],yr:[-20,10]},
      7:{f:[PF([1,-1,-6,0])],p:[[-2,0],[0,0],[3,0]],xi:[[-2,0,false,false],[3,Inf,false,false]],yr:[-15,10]}},
  21:{0:{f:[PF([1,-1,-7,1,6])],p:[[-2,0],[-1,0],[1,0],[3,0]],yr:[-15,15]},4:{f:[{f:x=>x*(12-2*x)**2,d:[0,6]}],h:[128],p:[[2,128,"x = 2"],[4,64]],xr:[-0.5,6.5],cap:"Volume V(x); it reaches 128 only at x = 2."}},
  22:{4:RG2(x=>(2*x-6)/(x+1),[-1],{h:[2],p:[[3,0],[0,-6]]}),5:RG2(x=>(x-1)/(x-2),[2],{h:[1],p:[[-1,2/3,"hole (−1, 2/3)",true],[1,0]]}),
      6:{f:[{f:x=>x/(x-2)+1,d:[-1e9,1.999]},{f:x=>x/(x-2)+1,d:[2.001,1e9]},{f:x=>2/(x-2),d:[-1e9,1.999],light:true},{f:x=>2/(x-2),d:[2.001,1e9],light:true}],v:[2],yr:[-8,10],cap:"The two sides never meet: no solution."}},
  23:{0:RG2(x=>(2*x*x+3*x-1)/(x-1),[1],{slant:x=>2*x+5,p:[],yr:[-25,35]}),1:RG2(x=>(x+1)/(x-3),[3],{h:[1],p:[[-1,0]],xi:[[-1,3,true,false]]}),
      2:RG2(x=>x/(x+1),[-1],{h:[2],p:[[-2,2,"(−2, 2)"]],xi:[[-2,-1,true,false]],cap:"The curve is on or above the line y = 2 on [−2, −1)."})},
  24:{6:{f:[x=>Math.sqrt(2*x+3),{f:x=>x,light:true}],p:[[3,3],[-1,1,"x = −1 is extraneous",true]]},7:{f:[x=>Math.sqrt(x+5)+1,{f:x=>x,light:true}],p:[[4,4],[-1,3,"x = −1 is extraneous",true]]},
      9:{f:[x=>3*x-7,{f:x=>(x+7)/3,light:true},{f:x=>x,dash:true}],eq:true,xr:[-8,8],yr:[-8,8],cap:"f and f⁻¹ reflect over y = x."}},
  25:{0:{f:[x=>Math.sqrt(x+7)-Math.sqrt(x)],h:[1],p:[[9,1]],xr:[-1,14],yr:[-0.5,3]},3:{f:[x=>Math.cbrt(x-1)+2,{f:x=>(x-2)**3+1,light:true},{f:x=>x,dash:true}],eq:true,xr:[-6,8],yr:[-6,8]},
      4:{f:[{f:x=>Math.sqrt(Math.max(0,4-x*x)),d:[-2,2]}],p:[[-2,0],[2,0]],xi:[[-2,2,true,true]],eq:true,cap:"Domain −2 ≤ x ≤ 2 (shaded)."}}

  };
  for(const si in G) for(const pi in G[si]){ const pr=SETS[si]&&SETS[si].probs[pi]; if(pr) pr[2]=G[si][pi]; }
})();

/* --------- formatting: ^ → superscript, minus signs --------- */
function F(a,b){ return `<span class="fr"><span class="fn">${a}</span><span class="fd">${b}</span></span>`; }
function matchL(s,j){ // s[j]===")" → index of matching "("
  let d=0; for(let k=j;k>=0;k--){ if(s[k]===")")d++; else if(s[k]==="("){d--; if(!d) return k;} } return -1; }
function matchR(s,j){ let d=0; for(let k=j;k<s.length;k++){ if(s[k]==="(")d++; else if(s[k]===")"){d--; if(!d) return k;} } return -1; }
const TOK="[\\w.√∛∜₀-₉]+";
const okTok=t=>t && !/^[A-Za-z]{2,}$/.test(t) && !/nbsp/.test(t) && /[\w√]/.test(t);
function autoFrac(s){
  let from=0;
  for(;;){
    const j=s.indexOf("/",from); if(j<0) return s;
    let L=null,Rr=null;
    if(s[j-1]===")"){ const k=matchL(s,j-1); if(k>=0) L={start:k,text:s.slice(k+1,j-1)}; }
    else { const mm=s.slice(0,j).match(new RegExp(TOK+"$")); if(mm){ let t=mm[0].replace(/^\.+/,""); if(okTok(t)) L={start:j-t.length,text:t}; } }
    if(s[j+1]==="("){ const k=matchR(s,j+1); if(k>=0) Rr={end:k+1,text:s.slice(j+2,k)}; }
    else { const mm=s.slice(j+1).match(new RegExp("^-?"+TOK)); if(mm){ let t=mm[0].replace(/\.+$/,""); if(okTok(t)) Rr={end:j+1+t.length,text:t}; } }
    if(!L||!Rr){ from=j+1; continue; }
    const h=F(L.text,Rr.text); s=s.slice(0,L.start)+h+s.slice(Rr.end); from=L.start+h.length;
  }
}
function radicals(s){
  for(;;){ const mm=/[√∛∜]\(/.exec(s); if(!mm) break; const j=mm.index, k=matchR(s,j+1); if(k<0) break;
    s=s.slice(0,j)+`<span class="rad">${s[j]}<span class="rc">${s.slice(j+2,k)}</span></span>`+s.slice(k+1); }
  return s.replace(/([√∛∜])(\d+(?:\.\d+)?|[a-z])/g,'<span class="rad">$1<span class="rc">$2</span></span>');
}
function piecewise(s){
  return s.replace(/\{ ([^{}]*? if [^{}]*?) \}/g,(_,body)=>{
    const rows=body.split(/;\s*(?:&nbsp;)?\s*/).map(r=>{const k=r.lastIndexOf(" if "); return k<0?`<span><span>${r}</span><span></span></span>`:`<span><span>${r.slice(0,k)}</span><span class="pwi">if ${r.slice(k+4)}</span></span>`;});
    return `<span class="pw"><span class="pwb"></span><span class="pwc">${rows.join("")}</span></span>`;
  });
}
function m(s){
  s=s.replace(/log_(\d+|[a-z])/g,"log<sub>$1</sub>");
  s=s.replace(/\^\(([^)]+)\)/g,(_,e)=>"<sup>"+e.replace(/\//g,"⁄")+"</sup>")
     .replace(/\^(-?\d+|[a-z])/g,"<sup>$1</sup>");
  s=piecewise(s);
  s=s.replace(/\((-?\d+)\/(\d+)\)(?=[a-zA-Z(√])/g,"{{$1|$2}}");
  s=s.replace(/\{\{([^{}|]*)\|([^{}]*)\}\}/g,(_,a,b)=>F(a,b));
  s=autoFrac(s);
  s=radicals(s);
  return s.replace(/(^|[\s(=,\[{;>±/·|⌊]|&nbsp;)-(?=[\dA-Za-z(√∞⌊<])/g,"$1−").replace(/ - /g," − ");
}
const esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

const CSS = `
.pwrap{margin:30px 0 8px}
.pwrap>h3{margin:0 0 2px;font-size:24px}
.pwrap>.lead{margin:0 0 10px;font-style:italic;color:#444}
details.pset{border:1px solid #111;border-left:6px solid #111;margin:12px 0;background:#fff}
details.pset>summary{cursor:pointer;padding:10px 14px;font-weight:700;font-size:19px;list-style:none}
details.pset>summary::-webkit-details-marker{display:none}
details.pset>summary::before{content:"▸ "}
details.pset[open]>summary::before{content:"▾ "}
details.pset>summary small{display:block;font-weight:400;font-style:italic;color:#555;font-size:15px;margin-left:18px}
.pbody{padding:0 14px 14px}
.pform{border:1px solid #bbb;background:#f6f6f6;padding:10px 12px;margin:4px 0 14px}
.pform h4{margin:0 0 6px;font-size:14px;letter-spacing:.12em;text-transform:uppercase}
.pf{display:grid;grid-template-columns:minmax(150px,210px) 1fr;gap:10px;padding:4px 0;border-top:1px dotted #bbb;font-size:16px}
.pf:first-of-type{border-top:0}
.pbar{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:6px 0 12px}
.pbar button{border:1px solid #111;background:#fff;color:#111;padding:3px 10px;font:600 15px 'EB Garamond',Georgia,serif;cursor:pointer}
.pbar button:hover{background:#111;color:#fff}
.pbar .prog{font-size:15px;font-style:italic;color:#555;margin-left:auto}
ol.pprobs{margin:0;padding-left:26px}
ol.pprobs>li{margin:0 0 16px;font-size:17px;line-height:1.75;padding-left:2px}
ol.pprobs>li.done>.pq{color:#666}
.pq{display:block}
.prow{display:flex;gap:14px;align-items:center;margin-top:5px;flex-wrap:wrap}
details.pans>summary{cursor:pointer;font-weight:600;font-size:15.5px;text-decoration:underline;text-underline-offset:3px;list-style:none}
details.pans>summary::-webkit-details-marker{display:none}
details.pans[open]{flex-basis:100%}
details.pans>div{border-left:3px solid #111;padding:8px 12px;margin-top:6px;background:#fafafa;line-height:1.85}
label.pdone{font-size:15px;color:#555;cursor:pointer;user-select:none}
label.pdone input{accent-color:#111}
.pall{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;margin:6px 0 10px}
.pall a{display:block;border:1px solid #111;padding:10px 12px;color:#111;text-decoration:none}
.pall a:hover{box-shadow:4px 4px 0 #111}
.pall a b{display:block;font-size:17px}
.pall a span{font-size:14.5px;font-style:italic;color:#555}
sup{font-size:.72em;line-height:0}
.fr{display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;font-size:.9em;line-height:1.2;margin:0 2px}
.fr>.fn{border-bottom:1px solid currentColor;padding:0 3px 1px}
.fr>.fd{padding:1px 3px 0}
.rad{white-space:nowrap}
.rad>.rc{border-top:1px solid currentColor;padding:1px 1px 0 1px;margin-left:-1px}
.pw{display:inline-flex;align-items:stretch;vertical-align:middle;margin:3px 4px}
.pwb{width:7px;border:1.5px solid currentColor;border-right:0;border-radius:7px 0 0 7px;margin-right:7px}
.pwc{display:inline-grid;grid-template-columns:auto auto;column-gap:16px;row-gap:1px}
.pwc>span{display:contents}
.pwi{font-style:italic}

@media (max-width:640px){.pf{grid-template-columns:1fr;gap:0}.pbar .prog{margin-left:0;width:100%}}
`;

let DONE={}; try{ DONE=JSON.parse(localStorage.getItem("a2-done")||"{}"); }catch(e){}
function saveDone(){ try{ localStorage.setItem("a2-done",JSON.stringify(DONE)); }catch(e){} }

function setsFor(unit){ return SETS.map((s,i)=>[s,i]).filter(([s])=>unit==="practice"||s.unit===unit); }
function count(unit){ return setsFor(unit).reduce((n,[s])=>n+s.probs.length,0); }
function doneIn(i){ return SETS[i].probs.filter((_,j)=>DONE[i+"-"+j]).length; }

function setHtml(s,i,open){
  return `<details class="pset${s.adv?" adv":""}" id="pset-${i}" data-set="${i}"${open?" open":""}><summary>${s.adv?'<span class="badge">★ Honors</span>':""}${esc(s.title)}<small>${esc(s.sub)} · ${s.probs.length} problems</small></summary><div class="pbody">
   <div class="pform"><h4>What you need to know</h4>${s.formulas.map(f=>`<div class="pf"><b>${f[0]}</b><span>${m(f[1])}</span></div>`).join("")}</div>
   <div class="pbar"><button type="button" data-p="show">Show all solutions</button><button type="button" data-p="hide">Hide all solutions</button><button type="button" data-p="ws">Print worksheet</button><button type="button" data-p="key">Print answer key</button><span class="prog">${doneIn(i)} of ${s.probs.length} done</span></div>
   <ol class="pprobs">${s.probs.map((p,j)=>{const d=DONE[i+"-"+j];return `<li class="${d?"done":""}"><span class="pq">${m(p[0])}</span><div class="prow"><details class="pans"><summary>Show solution &amp; steps</summary><div>${m(p[1])}${p[2]&&window.A2PLOT?A2PLOT.plot(p[2]):""}</div></details><label class="pdone"><input type="checkbox" data-k="${i}-${j}"${d?" checked":""}> I got it</label></div></li>`;}).join("")}</ol>
  </div></details>`;
}

function html(unit){
  const list=setsFor(unit); if(!list.length) return "";
  const total=list.reduce((n,[s])=>n+s.probs.length,0);
  return `<div class="pwrap"><h3>Worked Practice Sets (${total} problems)</h3><p class="lead">Fixed sets that build up step by step, ending with an ★ Honors Challenge set. Work each problem on paper, then open the solution. Tick “I got it” to track your progress.</p>`+
    list.map(([s,i])=>setHtml(s,i,false)).join("")+`</div>`;
}

function setsHtml(unit,adv){
  const list=setsFor(unit).filter(([s])=>!!s.adv===adv); if(!list.length) return "";
  return `<div class="pwrap" style="margin-top:6px">`+list.map(([s,i])=>setHtml(s,i,false)).join("")+`</div>`;
}
function countSets(unit,adv){ return setsFor(unit).filter(([s])=>!!s.adv===adv).reduce((n,[s])=>n+s.probs.length,0); }
function overview(units){
  return `<div class="pall">`+units.filter(u=>count(u.id)).map(u=>`<a href="#${u.id}" data-jump="${u.id}"><b>${esc(u.name)}</b><span>${setsFor(u.id).length} sets · ${count(u.id)} problems + Quick Quiz</span></a>`).join("")+`</div>`;
}

function printSet(i,withKey){
  const s=SETS[i]; const w=window.open("","_blank"); if(!w) return;
  w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${esc(s.title)}${withKey?" · Answer Key":""}</title><style>body{font-family:'EB Garamond',Georgia,serif;max-width:760px;margin:30px auto;line-height:1.5;padding:0 16px;color:#111}${CSS}${(window.A2PLOT||{}).CSS||""}.pf{grid-template-columns:200px 1fr}ol.pprobs>li{margin-bottom:${withKey?"18px":"90px"}!important}.key{border-left:3px solid #111;padding:4px 10px;margin-top:6px;background:#f6f6f6}</style></head><body>${withKey?"":"<p>Name: ____________________ &nbsp; Date: __________ &nbsp; Period: ____</p>"}<h2>${esc(s.title)}${withKey?" · Answer Key":""}</h2><p><i>${esc(s.sub)}</i></p><div class="pform"><h4>What you need to know</h4>${s.formulas.map(f=>`<div class="pf"><b>${f[0]}</b><span>${m(f[1])}</span></div>`).join("")}</div><ol class="pprobs">${s.probs.map(p=>`<li>${m(p[0])}${withKey?`<div class="key">${m(p[1])}${p[2]&&window.A2PLOT?A2PLOT.plot(p[2]):""}</div>`:""}</li>`).join("")}</ol><p style="font-size:12px;color:#666">Algebra 2 Honors · Zogovic</p></body></html>`);
  w.document.close(); setTimeout(()=>{ try{w.print();}catch(e){} },400);
}

function bind(root){
  if(!document.getElementById("a2css")){ const st=document.createElement("style"); st.id="a2css"; st.textContent=CSS; document.head.appendChild(st); }
  root.querySelectorAll("details.pset .pbar button").forEach(b=>b.onclick=()=>{
    const set=b.closest("details.pset"), act=b.dataset.p, i=+set.dataset.set;
    if(act==="show") set.querySelectorAll("details.pans").forEach(d=>d.open=true);
    if(act==="hide") set.querySelectorAll("details.pans").forEach(d=>d.open=false);
    if(act==="ws") printSet(i,false);
    if(act==="key") printSet(i,true);
  });
  root.querySelectorAll("label.pdone input").forEach(cb=>cb.onchange=()=>{
    const k=cb.dataset.k; if(cb.checked) DONE[k]=1; else delete DONE[k]; saveDone();
    cb.closest("li").classList.toggle("done",cb.checked);
    const set=cb.closest("details.pset"), i=+set.dataset.set;
    set.querySelector(".prog").textContent=`${doneIn(i)} of ${SETS[i].probs.length} done`;
  });
}

window.A2PRACTICE={sets:SETS,setsHtml,countSets,html,bind,count,overview,has:u=>count(u)>0,setHtml,setsFor,fmt:m};
})();
