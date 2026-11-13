// Algebra 2 Honors: interactive cheat sheets (rules + worked example + common mistake + "another example")
(function(){
const C=(t,rules,ex,tip,gen,g)=>({t,rules,ex,tip,gen,g});
const CS={
"toolkit":[
 C("Parent functions",["y = x, y = x^2, y = x^3, y = |x|, y = √x, y = ∛x, y = 1/x, y = 2^x, y = log x","√x: domain x ≥ 0, range y ≥ 0. &nbsp; 1/x: x ≠ 0, y ≠ 0","2^x: domain all reals, range y > 0. &nbsp; log x: domain x > 0, range all reals"],
  ["What are the domain and range of y = √x and y = 2^x?","√x: domain [0, ∞), range [0, ∞).<br>2^x: domain (-∞, ∞), range (0, ∞): the graph never touches y = 0 (horizontal asymptote)."],"An exponential is never 0 or negative, so its range is y > 0, not all reals."),
 C("Transformations",["y = a·f(b(x - h)) + k","h: shift right h (left if h < 0). k: shift up k.","|a| > 1 vertical stretch; 0 < |a| < 1 shrink; a < 0 reflect over the x-axis","b: horizontal stretch/shrink by 1/|b|; b < 0 reflect over the y-axis"],
  ["Describe y = -2|x + 3| - 1 compared with y = |x|. Give the vertex.","x + 3 = x - (-3) → left 3. &nbsp; a = -2 → vertical stretch by 2 and reflect over the x-axis. &nbsp; -1 → down 1.<br><b>Vertex (-3, -1)</b>, opening down."],"Inside changes go the “opposite” way: f(x + 3) moves LEFT 3.",null,{f:[x=>-2*Math.abs(x+3)-1,{f:x=>Math.abs(x),dash:true}],p:[[-3,-1,"vertex (−3, −1)"]],cap:"Dashed: parent y = |x|."}),
 C("Domain and range",["Denominators ≠ 0","Even roots: inside ≥ 0","Logs: inside > 0","Range: look at the graph (lowest/highest y)"],
  ["Find the domain of f(x) = {{√(x - 2)|x - 5}}.","√ needs x - 2 ≥ 0 → x ≥ 2. Denominator: x ≠ 5.<br><b>Domain: [2, 5) ∪ (5, ∞)</b>"],"Check every restriction, then combine them."),
 C("Even and odd functions",["Even: f(-x) = f(x), symmetric about the y-axis","Odd: f(-x) = -f(x), symmetric about the origin","Most functions are neither."],
  ["Is f(x) = x^3 - x even, odd or neither?","f(-x) = (-x)^3 - (-x) = -x^3 + x = -(x^3 - x) = -f(x).<br><b>Odd</b> (symmetric about the origin)."],"Substitute -x everywhere, then compare with f(x) and -f(x)."),
 C("Average rate of change",["Average rate of change on [a, b] = {{f(b) - f(a)|b - a}}","It is the slope of the secant line through the two points."],
  ["Find the average rate of change of f(x) = x^2 on [1, 4].","{{f(4) - f(1)|4 - 1}} = {{16 - 1|3}} = <b>5</b>"],"Subtract in the same order on the top and bottom."),
 C("Exponent rules",["a^m · a^n = a^(m+n) &nbsp; {{a^m|a^n}} = a^(m−n) &nbsp; (a^m)^n = a^(mn)","a^0 = 1 &nbsp; a^(-n) = {{1|a^n}} &nbsp; a^(m/n) = (ⁿ√a)^m","(ab)^n = a^n b^n &nbsp; ({{a|b}})^n = {{a^n|b^n}}"],
  ["Simplify {{(2x^3)^2 · x^(-1)|4x^2}}.","(2x^3)^2 = 4x^6. Then 4x^6 · x^(-1) = 4x^5. Divide: {{4x^5|4x^2}} = <b>x^3</b>"],"(a + b)^2 is NOT a^2 + b^2. Exponent rules work with products, not sums.","unit-6:Rational exponents")
],
"unit-1":[
 C("Absolute value equations",["Isolate |A| first.","|A| = b (b ≥ 0) → A = b or A = -b","|A| = negative → no solution","x on both sides → check every answer"],
  ["Solve 2|x - 3| + 1 = 9.","2|x - 3| = 8 → |x - 3| = 4<br>x - 3 = 4 → x = 7; &nbsp; x - 3 = -4 → x = -1<br><b>x = -1 or x = 7</b>"],"Don't split before isolating: 2|x - 3| + 1 = 9 does NOT become 2(x - 3) + 1 = ±9.","unit-1:Absolute value",{f:[x=>2*Math.abs(x-3)+1],h:[9],p:[[-1,9],[7,9]]}),
 C("Absolute value inequalities",["|A| < b → -b < A < b (“and”, between)","|A| > b → A < -b or A > b (“or”, outside)","Dividing by a negative flips the sign.","|A| < negative → no solution; |A| > negative → all reals"],
  ["Solve |2x + 1| ≥ 5.","2x + 1 ≤ -5 → x ≤ -3, or 2x + 1 ≥ 5 → x ≥ 2<br><b>(-∞, -3] ∪ [2, ∞)</b>"],"Greater than → OR (two pieces). Less than → AND (one piece).","unit-1:Absolute value",{f:[x=>Math.abs(2*x+1)],h:[5],xi:[[-Infinity,-3,false,true],[2,Infinity,true,false]]}),
 C("Slope and equations of lines",["m = {{y₂ - y₁|x₂ - x₁}}","Slope-intercept y = mx + b; point-slope y - y₁ = m(x - x₁); standard Ax + By = C","Horizontal y = k (m = 0); vertical x = h (m undefined)"],
  ["Write the line through (1, -2) and (3, 4).","m = {{4 - (-2)|3 - 1}} = {{6|2}} = 3<br>y + 2 = 3(x - 1) → <b>y = 3x - 5</b>"],"Keep the same order of points in the top and bottom of the slope formula.","unit-1:Lines",{f:[x=>3*x-5],p:[[1,-2],[3,4]],seg:[[1,-2,3,-2],[3,-2,3,4]]}),
 C("Parallel and perpendicular lines",["Parallel: same slope","Perpendicular: slopes are negative reciprocals (m₁ · m₂ = -1)","Rewrite in y = mx + b to read the slope."],
  ["Find the line perpendicular to y = 2x + 1 through (4, 1).","Perpendicular slope: -{{1|2}}<br>y - 1 = -{{1|2}}(x - 4) → <b>y = -{{1|2}}x + 3</b>"],"“Negative reciprocal” = flip AND change the sign.","unit-1:Lines",{f:[{f:x=>2*x+1,dash:true},x=>-0.5*x+3],p:[[4,1]],eq:true}),
 C("Systems in three variables",["Eliminate the same variable from two different pairs.","Solve the 2 × 2 system, then back-substitute.","0 = nonzero → no solution; 0 = 0 → infinitely many"],
  ["Solve x + y + z = 6, &nbsp; x - y + z = 2, &nbsp; 2x + y - z = 1.","(1) - (2): 2y = 4 → y = 2. Then x + z = 4 and 2x - z = -1.<br>Add: 3x = 3 → x = 1, z = 3. <b>(1, 2, 3)</b> (check (3): 2 + 2 - 3 = 1 ✓)"],"Always check the answer in all three original equations.","unit-1:Systems"),
 C("Piecewise functions",["Use only the piece whose condition contains x.","< or > → open circle; ≤ or ≥ → closed circle","Continuous at a break when both pieces give the same y-value"],
  ["f(x) = { x + 2 if x < 1; &nbsp; 5 - x if x ≥ 1 }. Find f(-3), f(1), f(4). Is f continuous at x = 1?","f(-3) = -1, &nbsp; f(1) = 4, &nbsp; f(4) = 1.<br>At x = 1 the left piece approaches 3 but f(1) = 4 → <b>jump, not continuous</b>."],"The boundary value belongs to only one piece: read the inequality signs.","unit-1:Piecewise functions",{f:[{f:x=>x+2,d:[-1e9,1]},{f:x=>5-x,d:[1,1e9]}],p:[[1,3,"",true],[1,4,"(1, 4)"]]})
],
"systems":[
 C("Three methods",["Graphing: the intersection point","Substitution: solve one equation for a variable, plug in","Elimination: add/subtract to cancel a variable"],
  ["Solve 2x + y = 7 and x - y = 2.","Add the equations: 3x = 9 → x = 3. Then 3 - y = 2 → y = 1.<br><b>(3, 1)</b>"],"Multiply a WHOLE equation (both sides) when lining up coefficients.","unit-1:Systems",{f:[x=>7-2*x,{f:x=>x-2,light:true}],p:[[3,1]]}),
 C("Special cases",["Same slope, different intercept → parallel → no solution","Same line → infinitely many solutions","Different slopes → exactly one solution"],
  ["How many solutions: 2x - 4y = 8 and x - 2y = 3?","Both have slope 1/2; intercepts -2 and -3/2 differ → parallel → <b>no solution</b>."],"0 = 0 means infinitely many, not “x = 0”."),
 C("Cramer's rule (2 × 2)",["D = |a b; c d| = ad - bc","x = {{D<sub>x</sub>|D}}, y = {{D<sub>y</sub>|D}} (replace a column with the constants)","D = 0 → no unique solution"],
  ["Solve 2x + y = 7, x - y = 2 with Cramer's rule.","D = 2(-1) - 1(1) = -3. &nbsp; D<sub>x</sub> = 7(-1) - 1(2) = -9 → x = 3. &nbsp; D<sub>y</sub> = 2(2) - 7(1) = -3 → y = 1."],"Order matters: ad - bc, not bc - ad."),
 C("Inverse matrices",["A = [a b; c d] → A⁻¹ = {{1|ad - bc}}[d -b; -c a]","AX = B → X = A⁻¹B","No inverse if ad - bc = 0"],
  ["Find the inverse of [2 1; 5 3].","det = 6 - 5 = 1 → A⁻¹ = [3 -1; -5 2]. Check: [2 1; 5 3][3 -1; -5 2] = [1 0; 0 1] ✓"],"Swap a and d; change the signs of b and c."),
 C("Nonlinear systems",["Substitute the line into the curve.","The number of real solutions = number of intersection points","Discriminant 0 → tangent (one point)"],
  ["Solve y = x^2 - 1 and y = x + 1.","x^2 - 1 = x + 1 → x^2 - x - 2 = 0 → x = 2 or -1 → <b>(2, 3) and (-1, 0)</b>"],"Find y for EACH x value.","unit-3:Systems & tangents",{f:[x=>x*x-1,{f:x=>x+1,light:true}],p:[[2,3],[-1,0]]})
],
"unit-2":[
 C("Factoring strategy",["1. GCF first","2. Count terms: 2 → squares/cubes; 3 → trinomial; 4 → grouping","3. Check every factor again","4. Multiply back to check"],
  ["Factor 3x^3 - 12x completely.","GCF: 3x(x^2 - 4). Difference of squares: <b>3x(x - 2)(x + 2)</b>"],"Forgetting the GCF, or stopping before factoring completely.","unit-2:Factoring"),
 C("Trinomials (AC method)",["x^2 + bx + c: two numbers multiply to c, add to b","ax^2 + bx + c: multiply a·c; split bx; group","No pair works → prime (check b^2 - 4ac)"],
  ["Factor 6x^2 + 7x - 3.","ac = -18; 9 and -2 (9 · -2 = -18, 9 - 2 = 7).<br>6x^2 + 9x - 2x - 3 = 3x(2x + 3) - 1(2x + 3) = <b>(3x - 1)(2x + 3)</b>"],"Check the sign of c: negative c → the numbers have opposite signs.","unit-2:Factoring",{f:[x=>6*x*x+7*x-3],p:[[1/3,0,"x = 1/3"],[-1.5,0,"x = −3/2"]],cap:"Zeros 1/3 and −3/2 match the factors."}),
 C("Special patterns",["a^2 - b^2 = (a - b)(a + b)","a^2 ± 2ab + b^2 = (a ± b)^2","a^3 - b^3 = (a - b)(a^2 + ab + b^2)","a^3 + b^3 = (a + b)(a^2 - ab + b^2)","<b>SOAP</b> for the signs: <b>S</b>ame (first sign matches the problem), <b>O</b>pposite (sign before ab flips), <b>A</b>lways <b>P</b>ositive (sign before b^2). Example: x^3 - 8 = (x - 2)(x^2 + 2x + 4)","a^2 + b^2 is prime over the reals"],
  ["Factor 27x^3 - 8.","a = 3x, b = 2: (3x - 2)(9x^2 + 6x + 4)"],"Sum of squares x^2 + 9 does NOT factor as (x + 3)^2.","unit-2:Factoring"),
 C("Cube of a binomial",["(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3","(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3 (signs alternate + − + −)","Coefficients 1, 3, 3, 1 (Pascal's row 3); powers of a go down, powers of b go up","Not the same as a sum of cubes: (a + b)^3 ≠ a^3 + b^3"],
  ["Expand (2x - 3)^3.","a = 2x, b = 3: (2x)^3 - 3(2x)^2(3) + 3(2x)(3)^2 - 3^3<br>= 8x^3 - 3(4x^2)(3) + 3(2x)(9) - 27<br><b>= 8x^3 - 36x^2 + 54x - 27</b>"],"Square or cube the WHOLE term: (2x)^2 = 4x^2, not 2x^2. And don't forget the two middle terms.","unit-2:Special products"),
 C("Square of a trinomial",["(a + b + c)^2 = a^2 + b^2 + c^2 + 2ab + 2bc + 2ca","Square each term, then add TWICE the product of every pair","Each product keeps the signs of its two terms → 6 terms in all"],
  ["Expand (x + y - 3)^2.","Squares: x^2, y^2, (-3)^2 = 9<br>Pairs: 2(x)(y) = 2xy, &nbsp; 2(y)(-3) = -6y, &nbsp; 2(-3)(x) = -6x<br><b>= x^2 + y^2 + 9 + 2xy - 6x - 6y</b>"],"(a + b + c)^2 is NOT a^2 + b^2 + c^2: the 3 pair products are part of the answer.","unit-2:Special products"),
 C("Cube of a trinomial",["(a + b + c)^3 = a^3 + b^3 + c^3 + 3a^2b + 3a^2c + 3ab^2 + 3b^2c + 3ac^2 + 3bc^2 + 6abc","Short form: a^3 + b^3 + c^3 + 3(a + b)(b + c)(c + a)","10 terms: three cubes (×1), six “square × other” terms (×3), one abc term (×6)"],
  ["Expand (x + y + 1)^3.","Cubes: x^3 + y^3 + 1<br>×3 terms: 3x^2y + 3x^2 + 3xy^2 + 3y^2 + 3x + 3y<br>×6 term: 6(x)(y)(1) = 6xy<br><b>= x^3 + y^3 + 3x^2y + 3xy^2 + 3x^2 + 6xy + 3y^2 + 3x + 3y + 1</b>"],"Check: with every variable = 1, the coefficients must add to 3^3 = 27. Here 1 + 1 + 3 + 3 + 3 + 6 + 3 + 3 + 3 + 1 = 27 ✓","unit-2:Special products"),
 C("Using the patterns backwards",["Perfect cube: a^3 + 3a^2b + 3ab^2 + b^3 = (a + b)^3 (find a and b from the first and last terms, then check the middle)","Perfect square: a^2 + b^2 + c^2 + 2ab + 2bc + 2ca = (a + b + c)^2","a^2 + b^2 + c^2 = (a + b + c)^2 - 2(ab + bc + ca)"],
  ["Factor 8x^3 + 12x^2 + 6x + 1, and compute 101^3 mentally.","∛(8x^3) = 2x, ∛1 = 1. Check: 3(2x)^2(1) = 12x^2 ✓, 3(2x)(1)^2 = 6x ✓ → <b>(2x + 1)^3</b><br>101^3 = (100 + 1)^3 = 1,000,000 + 30,000 + 300 + 1 = <b>1,030,301</b>"],"Always check BOTH middle terms before writing (a + b)^3.","unit-2:Special products"),
 C("Solving quadratics",["Factoring + zero product property (set = 0 first!)","Square roots: (x - h)^2 = k → x = h ± √k","Completing the square: add (b/2)^2","Quadratic formula: x = {{-b ± √(b^2 - 4ac)|2a}}"],
  ["Solve x^2 - 6x + 2 = 0 by completing the square.","x^2 - 6x = -2 → x^2 - 6x + 9 = 7 → (x - 3)^2 = 7<br><b>x = 3 ± √7</b>"],"Don't forget ± when taking a square root.","unit-2:Solving quadratics",{f:[x=>x*x-6*x+2],p:[[3-Math.sqrt(7),0,"3 − √7"],[3+Math.sqrt(7),0,"3 + √7"]]}),
 C("Complex numbers",["i = √(-1), i^2 = -1; powers repeat: i, -1, -i, 1","Multiply like binomials, then replace i^2 with -1","Divide: multiply by the conjugate of the denominator","√(-a) = i√a: write in i-form BEFORE multiplying"],
  ["Simplify {{2 + 3i|1 - i}}.","Multiply by {{1 + i|1 + i}}: top (2 + 3i)(1 + i) = 2 + 5i + 3i^2 = -1 + 5i; bottom 1 + 1 = 2<br><b>-{{1|2}} + {{5|2}}i</b>"],"√(-4) · √(-9) = (2i)(3i) = -6, not √36 = 6.","unit-2:Complex numbers"),
 C("Polynomial division",["Synthetic division only for (x - c); use c, write 0 for missing terms","Remainder theorem: P(c) = remainder","Factor theorem: P(c) = 0 ⇔ (x - c) is a factor"],
  ["Divide (x^3 + 2x^2 - 5x - 6) ÷ (x - 2).","c = 2: 1 | 2 | -5 | -6 → 1, 4, 3 | 0<br>Quotient x^2 + 4x + 3 = (x + 1)(x + 3), remainder 0 → <b>(x - 2)(x + 1)(x + 3)</b>"],"For x + 3 use c = -3, not 3.","unit-2:Division & binomial theorem"),
 C("Binomial theorem",["(a + b)^n = Σ <sub>n</sub>C<sub>k</sub> a^(n−k) b^k","Pascal's triangle rows: 1 / 1 1 / 1 2 1 / 1 3 3 1 / 1 4 6 4 1","Exponents of a go down while exponents of b go up"],
  ["Expand (x + 2)^4.","1·x^4 + 4·x^3·2 + 6·x^2·4 + 4·x·8 + 1·16 = <b>x^4 + 8x^3 + 24x^2 + 32x + 16</b>"],"Raise the WHOLE term to the power: (2x)^3 = 8x^3.","unit-2:Division & binomial theorem")
],
"unit-3":[
 C("Three forms of a quadratic",["Standard y = ax^2 + bx + c: vertex x = -{{b|2a}}, y-intercept c","Vertex y = a(x - h)^2 + k: vertex (h, k)","Factored y = a(x - p)(x - q): zeros p, q; axis x = {{p + q|2}}","a > 0 opens up (min); a < 0 opens down (max)"],
  ["Find the vertex and vertex form of y = 2x^2 - 12x + 13.","x = {{12|4}} = 3, y = 18 - 36 + 13 = -5 → vertex (3, -5)<br><b>y = 2(x - 3)^2 - 5</b>"],"In y = a(x - h)^2 + k, the vertex is (h, k): (x - 3) means h = +3.","unit-3:Vertex & forms",{f:[x=>2*x*x-12*x+13],v:[3],p:[[3,-5,"vertex (3, −5)"]]}),
 C("Completing the square (vertex form)",["Factor a out of the x-terms","Add (b/2)^2 inside; subtract a·(b/2)^2 outside","Write the perfect square"],
  ["Write y = -x^2 + 4x + 1 in vertex form.","y = -(x^2 - 4x) + 1 = -(x^2 - 4x + 4) + 4 + 1 → <b>y = -(x - 2)^2 + 5</b>"],"When a ≠ 1, what you add inside is multiplied by a.","unit-3:Vertex & forms"),
 C("Discriminant and roots",["D = b^2 - 4ac","D > 0: 2 real (perfect square → rational); D = 0: 1 real; D < 0: 2 complex","Sum of roots -{{b|a}}; product {{c|a}}"],
  ["Describe the roots of 2x^2 + 3x + 4 = 0.","D = 9 - 32 = -23 < 0 → <b>two complex roots</b>. Sum -{{3|2}}, product 2."],"Use the signs of a, b, c carefully: -4ac with negative c becomes +.","unit-3:Discriminant & roots"),
 C("Quadratic inequalities",["Get 0 on one side; find the zeros","Opens up: > 0 outside, < 0 between","≤ / ≥ include the zeros"],
  ["Solve x^2 - 2x - 8 ≥ 0.","(x - 4)(x + 2) ≥ 0 → zeros -2, 4; outside → <b>x ≤ -2 or x ≥ 4</b>"],"Multiplying by -1 flips the inequality.","unit-3:Inequalities",{f:[x=>x*x-2*x-8],xi:[[-Infinity,-2,false,true],[4,Infinity,true,false]]}),
 C("Writing quadratic equations",["Vertex + point: y = a(x - h)^2 + k, solve for a","Zeros + point: y = a(x - p)(x - q)","Roots r, s: x^2 - (r + s)x + rs = 0"],
  ["Vertex (1, 3), passes through (3, -5).","-5 = a(3 - 1)^2 + 3 → 4a = -8 → a = -2 → <b>y = -2(x - 1)^2 + 3</b>"],"Plug the OTHER point (not the vertex) in to find a.","unit-3:Writing equations"),
 C("Maximum and minimum problems",["Max/min at the vertex: x = -{{b|2a}}","Projectile: h(t) = -16t^2 + v₀t + h₀ (ft)","Revenue = price × quantity"],
  ["h(t) = -16t^2 + 64t + 5. Find the maximum height.","t = {{-64|-32}} = 2; h(2) = -64 + 128 + 5 = <b>69 ft</b>"],"The x-value of the vertex is NOT the maximum; plug it in to get y.","unit-3:Applications",{f:[{f:t=>-16*t*t+64*t+5,d:[0,4.08]}],p:[[2,69,"max (2, 69)"]],xr:[-0.3,4.5]}),
 C("Systems and tangent lines",["Substitute and solve the quadratic","D = 0 → the line is tangent","D < 0 → no intersection"],
  ["Is y = 2x tangent to y = x^2 + 1?","x^2 + 1 = 2x → x^2 - 2x + 1 = 0 → D = 0 → <b>yes, tangent at (1, 2)</b>"],"Set the expressions equal, then move everything to one side.","unit-3:Systems & tangents",{f:[x=>x*x+1,{f:x=>2*x,light:true}],p:[[1,2]]})
],
"unit-4":[
 C("End behavior",["Look at the leading term ax^n","Even n: both ends same direction (a > 0 up, a < 0 down)","Odd n: opposite directions (a > 0: down-left, up-right)"],
  ["Describe the end behavior of f(x) = -x^5 + 3x^2.","Odd degree, negative → <b>rises left, falls right</b>: x → -∞, f → ∞; x → ∞, f → -∞"],"Ignore every term except the leading one.","unit-4:Graphs & end behavior",{f:[x=>-(x**5)+3*x*x],yr:[-10,10],xr:[-2.5,2.5]}),
 C("Zeros and multiplicity",["Factor (x - r)^m → zero r with multiplicity m","Odd m: crosses; even m: touches and turns","Degree n → at most n - 1 turning points"],
  ["f(x) = (x + 1)^2(x - 3). Describe the zeros.","x = -1 (multiplicity 2): <b>touches</b>. x = 3 (multiplicity 1): <b>crosses</b>. Degree 3."],"Multiplicity is the exponent on the factor, not the zero itself.","unit-4:Graphs & end behavior",{f:[x=>(x+1)**2*(x-3)],p:[[-1,0,"touch"],[3,0,"cross"]],yr:[-15,8]}),
 C("Finding all zeros",["Rational Root Theorem: ±{{factors of constant|factors of leading coef.}}","Test candidates with synthetic division (remainder 0)","Factor or use the quadratic formula on the quotient"],
  ["Find all zeros of x^3 - 7x - 6.","Candidates ±1, ±2, ±3, ±6. Test -1: -1 + 7 - 6 = 0 ✓<br>Synthetic: 1, -1, -6 → x^2 - x - 6 = (x - 3)(x + 2) → <b>x = -1, 3, -2</b>"],"Write 0 for the missing x^2 term in synthetic division.","unit-4:Finding zeros"),
 C("Fundamental theorem and conjugates",["Degree n → exactly n complex zeros (with multiplicity)","Real coefficients: a + bi ⇒ a - bi also a zero","Rational coefficients: a + √b ⇒ a - √b"],
  ["Write a polynomial with zeros 2 and 3i.","-3i is also a zero: (x - 2)(x - 3i)(x + 3i) = (x - 2)(x^2 + 9) = <b>x^3 - 2x^2 + 9x - 18</b>"],"Include the conjugate, or the coefficients won't be real.","unit-4:Writing polynomials"),
 C("Polynomial inequalities",["Find the zeros; make a sign chart","Sign changes at odd-multiplicity zeros only","Pick the intervals with the sign you need"],
  ["Solve (x + 2)(x - 1)(x - 4) < 0.","Signs: (-∞, -2): − | (-2, 1): + | (1, 4): − | (4, ∞): +<br><b>(-∞, -2) ∪ (1, 4)</b>"],"Test a value in each interval instead of guessing.","unit-4:Inequalities",{f:[x=>(x+2)*(x-1)*(x-4)],xi:[[-Infinity,-2,false,false],[1,4,false,false]],yr:[-20,20]}),
 C("Remainder and factor theorems",["P(c) = remainder of P(x) ÷ (x - c)","(x - c) is a factor ⇔ P(c) = 0"],
  ["Find the remainder when x^3 - 4x + 1 is divided by x - 2.","P(2) = 8 - 8 + 1 = <b>1</b>"],"Dividing by x + 2 means evaluating P(-2).","unit-4:Finding zeros")
],
"unit-5":[
 C("Simplifying rational expressions",["Factor top and bottom completely","Cancel common FACTORS (not terms)","State excluded values from the original denominator"],
  ["Simplify {{x^2 - x - 6|x^2 - 9}}.","{{(x - 3)(x + 2)|(x - 3)(x + 3)}} = <b>{{x + 2|x + 3}}, x ≠ ±3</b>"],"{{x + 2|x + 3}} cannot be simplified further: you can't cancel the x's.","unit-5:Simplifying & operations"),
 C("Multiply, divide, add, subtract",["× : factor, cancel, multiply","÷ : multiply by the reciprocal","+ / − : LCD, rewrite, combine numerators"],
  ["Simplify {{2|x}} + {{3|x + 1}}.","LCD x(x + 1): {{2(x + 1) + 3x|x(x + 1)}} = <b>{{5x + 2|x(x + 1)}}</b>"],"When subtracting, distribute the minus to EVERY term of the second numerator.","unit-5:Simplifying & operations"),
 C("Asymptotes and holes",["Factor first. Cancelled factor → hole; remaining bottom zero → vertical asymptote","HA: deg top < deg bottom → y = 0; equal → ratio of leading coefficients","deg top = deg bottom + 1 → slant asymptote (divide)"],
  ["Analyze f(x) = {{x^2 - 4|x^2 - x - 2}}.","{{(x - 2)(x + 2)|(x - 2)(x + 1)}}: <b>hole at x = 2</b> (y = 4/3), <b>VA x = -1</b>, <b>HA y = 1</b>, x-intercept -2"],"A factor that cancels makes a hole, not an asymptote.","unit-5:Graphs & asymptotes",{f:[{f:x=>(x+2)/(x+1),d:[-1e9,-1.0001]},{f:x=>(x+2)/(x+1),d:[-0.9999,1e9]}],v:[-1],h:[1],p:[[2,4/3,"hole (2, 4/3)",true],[-2,0]],yr:[-8,8]}),
 C("Rational equations",["Multiply every term by the LCD","Solve the resulting equation","Reject answers that make any denominator 0"],
  ["Solve {{2x|x - 3}} = {{6|x - 3}} + 1.","Multiply by (x - 3): 2x = 6 + (x - 3) → x = 3. But x = 3 is excluded → <b>no solution</b>."],"Always check against the excluded values.","unit-5:Equations & inequalities"),
 C("Rational inequalities",["Get 0 on one side as a single fraction","Critical values: zeros of the top and bottom","Bottom zeros are never included"],
  ["Solve {{x - 1|x + 2}} ≤ 0.","Critical -2 (excluded) and 1 (included). Negative between → <b>(-2, 1]</b>"],"Never multiply both sides by an expression with x (its sign is unknown).","unit-5:Equations & inequalities"),
 C("Variation",["Direct: y = kx","Inverse: y = {{k|x}}","Joint: z = kxy. Find k first, then use it."],
  ["y varies inversely with x; y = 6 when x = 4. Find y when x = 8.","k = xy = 24 → y = {{24|8}} = <b>3</b>"],"Inverse variation: as x doubles, y halves.","unit-5:Variation")
],
"unit-6":[
 C("Simplifying radicals",["√(a^2 b) = a√b (a ≥ 0); pull out perfect squares","∛(a^3 b) = a∛b; pull out perfect cubes","Simplest form: no perfect-power factors inside, no radicals in denominators"],
  ["Simplify √(72x^3) (x ≥ 0).","72 = 36 · 2, x^3 = x^2 · x → <b>6x√(2x)</b>"],"√(a + b) ≠ √a + √b.","unit-6:Radicals"),
 C("Radical operations and rationalizing",["Add/subtract only like radicals","Multiply: √a · √b = √(ab)","Rationalize: multiply by √b/√b or by the conjugate"],
  ["Rationalize {{6|√5 - 1}}.","Multiply by {{√5 + 1|√5 + 1}}: {{6(√5 + 1)|5 - 1}} = <b>{{3(√5 + 1)|2}}</b>"],"The conjugate of a - √b is a + √b.","unit-6:Radicals"),
 C("Rational exponents",["a^(1/n) = ⁿ√a; &nbsp; a^(m/n) = (ⁿ√a)^m","a^(-n) = {{1|a^n}}","Same exponent rules as integers"],
  ["Evaluate 27^(-2/3).","∛27 = 3, 3^2 = 9 → 27^(-2/3) = <b>{{1|9}}</b>"],"A negative exponent makes a reciprocal, not a negative number.","unit-6:Rational exponents"),
 C("Radical equations",["Isolate the radical","Raise both sides to the index power","Solve, then CHECK (extraneous answers!)"],
  ["Solve √(x + 2) = x - 4.","x + 2 = x^2 - 8x + 16 → x^2 - 9x + 14 = 0 → x = 7 or 2<br>x = 2: √4 = 2 ≠ -2 ✗ → <b>x = 7</b>"],"Square the whole side: (x - 4)^2 = x^2 - 8x + 16, not x^2 + 16.","unit-6:Radical equations",{f:[x=>Math.sqrt(x+2),{f:x=>x-4,light:true}],p:[[7,3],[2,2,"x = 2 extraneous",true]]}),
 C("Composition of functions",["(f ∘ g)(x) = f(g(x)): work inside out","Usually f(g(x)) ≠ g(f(x))","Domain: x in domain of g AND g(x) in domain of f"],
  ["f(x) = x + 3, g(x) = x^2. Find f(g(x)) and g(f(x)).","f(g(x)) = <b>x^2 + 3</b>; &nbsp; g(f(x)) = <b>(x + 3)^2 = x^2 + 6x + 9</b>"],"Substitute the whole inner function, with parentheses.","unit-6:Functions & inverses"),
 C("Inverse functions",["Swap x and y, solve for y","Check: f(f⁻¹(x)) = x","Graph: reflection over y = x; one-to-one needed (horizontal line test)"],
  ["Find the inverse of f(x) = {{2x - 1|3}}.","x = {{2y - 1|3}} → 3x = 2y - 1 → <b>f⁻¹(x) = {{3x + 1|2}}</b>"],"f⁻¹(x) means inverse, NOT {{1|f(x)}}.","unit-6:Functions & inverses",{f:[x=>(2*x-1)/3,{f:x=>(3*x+1)/2,light:true},{f:x=>x,dash:true}],eq:true,xr:[-6,6],yr:[-6,6]})
],
"unit-7":[
 C("Exponential growth and decay",["y = a·b^x: b > 1 growth, 0 < b < 1 decay","Percent: y = a(1 + r)^t or a(1 - r)^t","Half-life: A = A₀({{1|2}})^(t/h)"],
  ["A $2,000 laptop loses 15% of its value per year. Find its value after 3 years.","y = 2000(0.85)^t → 2000(0.85)^3 ≈ <b>$1,228.25</b>"],"Decay of 15% → b = 0.85, not 0.15.","unit-7:Exponential models",{f:[{f:t=>2000*0.85**t,d:[0,1e9]}],p:[[3,1228.25,"(3, 1228.25)"]],xr:[-0.5,8]}),
 C("Compound and continuous interest",["A = P(1 + {{r|n}})^(nt)","Continuous: A = Pe^(rt)","n: 1 yearly, 4 quarterly, 12 monthly"],
  ["$5,000 at 4% compounded quarterly for 10 years.","A = 5000(1 + {{0.04|4}})^(40) = 5000(1.01)^40 ≈ <b>$7,444.32</b>"],"Use the rate as a decimal (4% = 0.04).","unit-7:Exponential models"),
 C("What is a logarithm?",["log<sub>b</sub> x = y ⇔ b^y = x","log x = log₁₀ x; ln x = log<sub>e</sub> x","log<sub>b</sub> 1 = 0, log<sub>b</sub> b = 1"],
  ["Evaluate log<sub>3</sub> 81 and log<sub>5</sub>({{1|25}}).","3^4 = 81 → <b>4</b>. &nbsp; 5^(-2) = {{1|25}} → <b>-2</b>"],"The log IS the exponent.","unit-7:Logarithms"),
 C("Log properties",["log(MN) = log M + log N","log({{M|N}}) = log M - log N","log(M^k) = k log M","Change of base: log<sub>b</sub> x = {{log x|log b}}"],
  ["Expand log({{x^3y|z}}) and condense 2 ln x - ln 3.","<b>3 log x + log y - log z</b>; &nbsp; ln x^2 - ln 3 = <b>ln({{x^2|3}})</b>"],"log(M + N) is NOT log M + log N.","unit-7:Logarithms"),
 C("Solving exponential equations",["Same base: set exponents equal","Otherwise take the log (or ln) of both sides","Isolate the power first"],
  ["Solve 2^(x + 1) = 8^x and 5^x = 40.","2^(x + 1) = 2^(3x) → x + 1 = 3x → <b>x = {{1|2}}</b>. &nbsp; x = {{ln 40|ln 5}} ≈ <b>2.292</b>"],"Isolate b^x before taking logs: 3·2^x = 24 → 2^x = 8.","unit-7:Solving equations"),
 C("Solving log equations",["Combine logs into one","Rewrite in exponential form","Check: the inside of every log must be > 0"],
  ["Solve log<sub>2</sub> x + log<sub>2</sub>(x - 2) = 3.","x(x - 2) = 2^3 = 8 → x^2 - 2x - 8 = 0 → x = 4 or -2. x = -2 ✗ → <b>x = 4</b>"],"Always check for extraneous solutions.","unit-7:Solving equations"),
 C("Graphs of exponentials and logs",["y = b^x: through (0, 1), asymptote y = 0","y = log<sub>b</sub> x: through (1, 0), asymptote x = 0","They are inverses: reflections over y = x"],
  ["Compare y = 2^x and y = log<sub>2</sub> x.","2^x: domain all reals, range y > 0. log<sub>2</sub> x: domain x > 0, range all reals. Each is the reflection of the other over y = x."],"Shifts move the asymptote: y = 2^x + 3 has asymptote y = 3.",null,{f:[x=>2**x,{f:x=>Math.log2(x),d:[0.001,1e9],light:true},{f:x=>x,dash:true}],p:[[0,1],[1,0]],eq:true,xr:[-5,6],yr:[-5,6]})
],
"unit-8":[
 C("Arithmetic sequences",["a<sub>n</sub> = a<sub>1</sub> + (n - 1)d","d = common difference (add each time)","Recursive: a<sub>n</sub> = a<sub>n-1</sub> + d"],
  ["5, 9, 13, ... Find a<sub>25</sub>.","d = 4 → a<sub>25</sub> = 5 + 24(4) = <b>101</b>"],"Use n - 1, not n.","unit-8:Arithmetic"),
 C("Arithmetic series",["S<sub>n</sub> = {{n(a<sub>1</sub> + a<sub>n</sub>)|2}}","= {{n|2}}(2a<sub>1</sub> + (n - 1)d)"],
  ["Sum of the first 25 terms of 5, 9, 13, ...","S<sub>25</sub> = {{25(5 + 101)|2}} = <b>1,325</b>"],"Find the last term a<sub>n</sub> first.","unit-8:Arithmetic"),
 C("Geometric sequences",["a<sub>n</sub> = a<sub>1</sub> r^(n−1)","r = common ratio (multiply each time)"],
  ["2, 6, 18, ... Find a<sub>7</sub>.","r = 3 → a<sub>7</sub> = 2 · 3^6 = <b>1,458</b>"],"Find r by dividing (term ÷ previous term), not subtracting.","unit-8:Geometric"),
 C("Geometric series",["S<sub>n</sub> = {{a<sub>1</sub>(1 - r^n)|1 - r}}","Infinite (|r| < 1): S = {{a<sub>1</sub>|1 - r}}","|r| ≥ 1: an infinite series diverges"],
  ["Find 20 + 10 + 5 + ... (infinite).","r = {{1|2}} → S = {{20|1 - 1/2}} = <b>40</b>"],"Check |r| < 1 before using the infinite formula.","unit-8:Geometric"),
 C("Sigma notation",["Σ (expression) from k = start to end: plug in each k and add","Number of terms = end - start + 1"],
  ["Evaluate Σ (3k - 1) for k = 1 to 4.","2 + 5 + 8 + 11 = <b>26</b>"],"Plug k into the WHOLE expression.","unit-8:Series & notation"),
 C("Recursive formulas",["Give the first term and a rule using the previous term","Find terms one at a time"],
  ["a<sub>1</sub> = 3, a<sub>n</sub> = 2a<sub>n-1</sub> + 1. Find a<sub>2</sub> to a<sub>4</sub>.","a<sub>2</sub> = 7, a<sub>3</sub> = 15, a<sub>4</sub> = <b>31</b>"],"Each term uses the term right before it.","unit-8:Series & notation")
],
"unit-9":[
 C("Right-triangle trig",["SOH: sin = {{opp|hyp}} &nbsp; CAH: cos = {{adj|hyp}} &nbsp; TOA: tan = {{opp|adj}}","Missing angle: use sin⁻¹, cos⁻¹, tan⁻¹","Calculator in DEGREE mode for degrees"],
  ["Hypotenuse 10, angle 30°. Find both legs.","opposite = 10 sin 30° = <b>5</b>; adjacent = 10 cos 30° = <b>5√3 ≈ 8.66</b>"],"Opposite and adjacent depend on WHICH angle you use.","unit-9:Triangles"),
 C("Special right triangles",["30-60-90: sides 1 : √3 : 2","45-45-90: sides 1 : 1 : √2","sin 30° = 1/2, sin 45° = √2/2, sin 60° = √3/2 (cos is the reverse)"],
  ["Find tan 60° exactly.","tan 60° = {{√3/2|1/2}} = <b>√3</b>"],"The longest side (2 or √2) is always the hypotenuse."),
 C("Radians and arc length",["180° = π radians","degrees → radians: × {{π|180}}; radians → degrees: × {{180|π}}","Arc length s = rθ (θ in radians)"],
  ["Convert 225° to radians; find the arc length for r = 6, θ = {{π|3}}.","225 · {{π|180}} = <b>{{5π|4}}</b>; &nbsp; s = 6 · {{π|3}} = <b>2π</b>"],"s = rθ needs radians, not degrees.","unit-9:Unit circle"),
 C("The unit circle",["Point on the circle: (cos θ, sin θ); tan θ = {{sin θ|cos θ}}","Signs: All (I), Students: sin (II), Take: tan (III), Calculus: cos (IV)","Use the reference angle, then attach the sign"],
  ["Find sin {{5π|6}}, cos {{4π|3}}, tan {{7π|4}}.","Reference angles 30°, 60°, 45° → <b>{{1|2}}, -{{1|2}}, -1</b>"],"The reference angle is measured to the x-axis, not the y-axis.","unit-9:Unit circle",{f:[{f:x=>Math.sqrt(Math.max(0,1-x*x)),d:[-1,1],light:true},{f:x=>-Math.sqrt(Math.max(0,1-x*x)),d:[-1,1],light:true}],p:[[-Math.sqrt(3)/2,0.5,"5π/6"],[-0.5,-Math.sqrt(3)/2,"4π/3"],[Math.SQRT1_2,-Math.SQRT1_2,"7π/4"]],eq:true,xr:[-1.7,1.7],yr:[-1.4,1.4]}),
 C("Graphs of sine and cosine",["y = A sin(B(x - C)) + D","Amplitude |A|, period {{2π|B}}, phase shift C, midline y = D","Max = D + |A|, min = D - |A|"],
  ["y = 3 sin(2(x - {{π|4}})) + 1","Amplitude 3, period π, shift {{π|4}} right, midline y = 1, max 4, min -2"],"Factor B out first: sin(2x - π/2) = sin(2(x - π/4)).","unit-9:Graphs",{f:[x=>3*Math.sin(2*(x-Math.PI/4))+1],h:[1],xpi:true,xr:[-0.2,2*Math.PI+0.2],yr:[-3,5]}),
 C("Identities and equations",["sin^2 θ + cos^2 θ = 1","Solve: isolate the trig function, find the reference angle, use the quadrants","On [0, 2π) there are usually two solutions"],
  ["Solve 2 sin x - 1 = 0 on [0, 2π).","sin x = {{1|2}} → reference {{π|6}}; sin is positive in I and II → <b>x = {{π|6}}, {{5π|6}}</b>"],"Don't stop at one answer: check every quadrant where the sign fits.","unit-9:Identities & equations"),
 C("Law of sines and cosines",["Law of sines: {{a|sin A}} = {{b|sin B}} = {{c|sin C}} (AAS, ASA)","Law of cosines: c^2 = a^2 + b^2 - 2ab cos C (SAS, SSS)","Area = {{1|2}}ab sin C"],
  ["a = 5, b = 7, C = 60°. Find c.","c^2 = 25 + 49 - 70 cos 60° = 74 - 35 = 39 → <b>c = √39 ≈ 6.24</b>"],"Use the angle that is BETWEEN the two given sides.","unit-9:Triangles")
],
"unit-10":[
 C("Counting principle",["If one choice has m options and another has n, together: m · n","Multiply across independent stages"],
  ["3 shirts, 4 pants, 2 pairs of shoes: how many outfits?","3 · 4 · 2 = <b>24</b>"],"Multiply, don't add, for “and then” choices.","unit-10:Counting"),
 C("Permutations vs combinations",["Order matters → <sub>n</sub>P<sub>r</sub> = {{n!|(n - r)!}}","Order doesn't matter → <sub>n</sub>C<sub>r</sub> = {{n!|r!(n - r)!}}"],
  ["8 runners: gold, silver, bronze? Choose 3 of 10 for a team?","Order matters: 8 · 7 · 6 = <b>336</b>. Order doesn't: <sub>10</sub>C<sub>3</sub> = <b>120</b>"],"Positions/ranks/arrangements → permutation; groups/committees → combination.","unit-10:Counting"),
 C("Probability rules",["P(A) = {{favorable|total}}; P(not A) = 1 - P(A)","P(A or B) = P(A) + P(B) - P(A and B)","Mutually exclusive: P(A and B) = 0"],
  ["One card: P(heart or king)?","{{13|52}} + {{4|52}} - {{1|52}} = {{16|52}} = <b>{{4|13}}</b>"],"Subtract the overlap (the king of hearts) so it isn't counted twice.","unit-10:Probability"),
 C("Independent and dependent events",["Independent: P(A and B) = P(A)·P(B)","Dependent: P(A and B) = P(A)·P(B | A)","Without replacement → dependent"],
  ["Draw two cards without replacement. P(both aces)?","{{4|52}} · {{3|51}} = <b>{{1|221}}</b>"],"After drawing, both the favorable count AND the total go down by 1.","unit-10:Probability"),
 C("Expected value",["E = Σ x · P(x)","E > 0 favorable, E < 0 unfavorable, E = 0 fair"],
  ["Win $5 with probability {{1|6}}, otherwise lose $1. Expected value?","E = 5({{1|6}}) + (-1)({{5|6}}) = 0 → <b>fair game</b>"],"Losses are negative values.","unit-10:Probability"),
 C("Binomial probability",["n independent trials, success probability p","P(X = k) = <sub>n</sub>C<sub>k</sub> p^k (1 - p)^(n − k)"],
  ["4 coin flips: P(exactly 2 heads)?","<sub>4</sub>C<sub>2</sub>({{1|2}})^2({{1|2}})^2 = {{6|16}} = <b>{{3|8}}</b>"],"Don't forget the <sub>n</sub>C<sub>k</sub> factor (the number of orders).","unit-10:Probability")
],
"unit-11":[
 C("Circles",["(x - h)^2 + (y - k)^2 = r^2: center (h, k), radius r","General form → complete the square in x and in y"],
  ["Find the center and radius of x^2 + y^2 + 4x - 6y - 12 = 0.","(x^2 + 4x + 4) + (y^2 - 6y + 9) = 12 + 4 + 9 → (x + 2)^2 + (y - 3)^2 = 25<br><b>center (-2, 3), r = 5</b>"],"r^2 = 25 means r = 5, not 25.","unit-11:Circles & parabolas",{f:[{f:x=>3+Math.sqrt(Math.max(0,25-(x+2)**2)),d:[-7,3]},{f:x=>3-Math.sqrt(Math.max(0,25-(x+2)**2)),d:[-7,3]}],p:[[-2,3,"center (−2, 3)"]],eq:true}),
 C("Parabolas",["(x - h)^2 = 4p(y - k): opens up (p > 0) or down","(y - k)^2 = 4p(x - h): opens right or left","Focus p units from the vertex inside; directrix p units outside"],
  ["Find the focus and directrix of x^2 = 12y.","4p = 12 → p = 3: <b>focus (0, 3), directrix y = -3</b>"],"p is a quarter of the coefficient 4p.","unit-11:Circles & parabolas",{f:[x=>x*x/12],h:[-3],p:[[0,3,"focus (0, 3)"],[0,0,"vertex"]],eq:true,xr:[-8,8]}),
 C("Ellipses",["{{(x - h)^2|a^2}} + {{(y - k)^2|b^2}} = 1 (larger denominator = a^2 = major axis direction)","c^2 = a^2 - b^2; foci c units from the center","Major axis length 2a, minor axis 2b"],
  ["{{x^2|25}} + {{y^2|16}} = 1","a = 5, b = 4, c = 3: <b>vertices (±5, 0), foci (±3, 0)</b>"],"Ellipse: c^2 = a^2 − b^2 (minus). Hyperbola: plus.","unit-11:Ellipses & hyperbolas",{f:[{f:x=>4*Math.sqrt(Math.max(0,1-x*x/25)),d:[-5,5]},{f:x=>-4*Math.sqrt(Math.max(0,1-x*x/25)),d:[-5,5]}],p:[[-3,0,"F"],[3,0,"F"]],eq:true}),
 C("Hyperbolas",["{{(x - h)^2|a^2}} - {{(y - k)^2|b^2}} = 1 opens left/right (positive term decides)","c^2 = a^2 + b^2","Asymptotes y - k = ±{{b|a}}(x - h) (horizontal case)"],
  ["{{x^2|9}} - {{y^2|16}} = 1","a = 3, b = 4, c = 5: <b>vertices (±3, 0), foci (±5, 0), asymptotes y = ±{{4|3}}x</b>"],"a^2 is always under the POSITIVE term, even if it is smaller.","unit-11:Ellipses & hyperbolas",{f:[...[1,-1].flatMap(s=>[{f:x=>s*4*Math.sqrt(Math.max(0,x*x/9-1)),d:[-1e9,-3]},{f:x=>s*4*Math.sqrt(Math.max(0,x*x/9-1)),d:[3,1e9]}]),{f:x=>4/3*x,dash:true},{f:x=>-4/3*x,dash:true}],p:[[-3,0],[3,0]],eq:true,xr:[-9,9]}),
 C("Identifying conics",["Ax^2 + Cy^2 + Dx + Ey + F = 0","A = C → circle; same sign → ellipse; opposite signs → hyperbola; only one squared → parabola"],
  ["Identify 4x^2 - 9y^2 + 8x = 0.","x^2 and y^2 have opposite signs → <b>hyperbola</b>"],"Look only at the squared terms.","unit-11:Identify & systems"),
 C("Line and conic systems",["Substitute the line into the conic","Solve the quadratic; find y for each x","0, 1 or 2 intersection points"],
  ["Solve x^2 + y^2 = 25 and y = x + 1.","x^2 + (x + 1)^2 = 25 → 2x^2 + 2x - 24 = 0 → x = 3 or -4 → <b>(3, 4), (-4, -3)</b>"],"Expand (x + 1)^2 = x^2 + 2x + 1.","unit-11:Identify & systems",{f:[{f:x=>Math.sqrt(Math.max(0,25-x*x)),d:[-5,5]},{f:x=>-Math.sqrt(Math.max(0,25-x*x)),d:[-5,5]},{f:x=>x+1,light:true}],p:[[3,4],[-4,-3]],eq:true})
]};
const CSS=`
.cs-bar{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:0 0 12px}
.cs-bar button{border:1px solid #111;background:#fff;color:#111;padding:3px 11px;font:600 15px 'EB Garamond',Georgia,serif;cursor:pointer}
.cs-bar button:hover{background:#111;color:#fff}
.cs-bar span{font-style:italic;color:#555;font-size:15px}
.cs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(440px,1fr));gap:16px}
.cs-card{border:1.5px solid #111;background:#fff;padding:12px 14px 12px;display:flex;flex-direction:column;gap:6px;break-inside:avoid}
.cs-card>summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:8px}
.cs-card>summary::-webkit-details-marker{display:none}
.cs-card>summary::after{content:"▸";margin-left:auto;font-size:18px}
.cs-card[open]>summary::after{content:"▾"}
.cs-card h4{margin:0;font-size:20px;flex:1}
.cs-card[open] h4{border-bottom:1px solid #111;padding-bottom:4px}
.cs-card:not([open]){padding:9px 14px}
.cs-card:not([open]):hover{background:#f4f4f4}
.cs-grid{align-items:start}
.cs-card h4 .n{display:inline-block;min-width:24px;height:24px;line-height:24px;border-radius:50%;background:#111;color:#fff;text-align:center;font-size:13px;margin-right:8px;vertical-align:2px}
.cs-rules{margin:2px 0;padding-left:20px;font-size:16.5px;line-height:1.75}
.cs-ex{background:#f6f6f6;border-left:4px solid #111;padding:6px 10px;font-size:16px;line-height:1.75}
.cs-ex .lab{font-variant:small-caps;letter-spacing:.06em;font-weight:700}
.cs-tip{font-size:15.5px;border:1px dashed #111;padding:4px 10px;margin:0}
.cs-tip b{font-variant:small-caps;letter-spacing:.05em}
.cs-more{border-top:1px dotted #999;padding-top:6px}
.cs-more:empty{display:none}
.cs-again{align-self:flex-start;border:1px solid #111;background:#111;color:#fff;padding:3px 12px;font:600 15px 'EB Garamond',Georgia,serif;cursor:pointer}
.cs-again:hover{background:#333}
.cs-card figure.gph{width:min(250px,44%)}
.cs-hit{outline:3px solid #111;outline-offset:3px}
@media (max-width:640px){.cs-grid{grid-template-columns:1fr}.cs-card figure.gph{width:100%}}
`;
const fmt=s=>window.A2PRACTICE?A2PRACTICE.fmt(s):s;
const plot=g=>g&&window.A2PLOT?A2PLOT.plot(g):"";
function card(c,i,u,open){
  return `<details class="cs-card" id="cs-${u}-${i}"${open?" open":""}><summary><h4><span class="n">${i+1}</span>${c.t}</h4></summary><ul class="cs-rules">${c.rules.map(r=>`<li>${fmt(r)}</li>`).join("")}</ul>
   <div class="cs-ex"><span class="lab">Example.</span> ${fmt(c.ex[0])}<br>${plot(c.g)}${fmt(c.ex[1])}<div style="clear:both"></div></div>
   ${c.tip?`<p class="cs-tip"><b>⚠ Watch out:</b> ${fmt(c.tip)}</p>`:""}
   ${c.gen&&window.A2GEN?`<button type="button" class="cs-again" data-gen="${c.gen}">↻ Another example</button><div class="cs-more"></div>`:""}</details>`;
}
function html(u){ const L=CS[u]; if(!L) return "";
  return `<div class="cs" data-csu="${u}"><div class="cs-bar"><button type="button" data-cs="open">Open all topics</button><button type="button" data-cs="close">Close all</button><button type="button" data-cs="print">Print this cheat sheet</button><span>${L.length} topics · rules, a worked example and a common mistake for each. Press “↻ Another example” for a new fully solved example.</span></div><div class="cs-grid">${L.map((c,i)=>card(c,i,u)).join("")}</div></div>`; }
function bind(root){
  if(!document.getElementById("a2cscss")){ const st=document.createElement("style"); st.id="a2cscss"; st.textContent=CSS; document.head.appendChild(st); }
  root.querySelectorAll(".cs-again").forEach(b=>b.onclick=()=>{
    const [u,topic]=b.dataset.gen.split(":"); const box=b.nextElementSibling;
    const p=A2GEN.build([u],1,topic)[0]; if(!p) return;
    box.innerHTML=`<div class="cs-ex"><span class="lab">Another example${p.topic?" · "+p.topic:""}.</span> ${fmt(p.q)}<details class="pans" open><summary>Solution &amp; steps</summary><div>${fmt(p.a)}${p.g?plot(p.g):""}</div></details></div>`;
  });
  root.querySelectorAll('[data-cs="open"],[data-cs="close"]').forEach(b=>b.onclick=()=>b.closest(".cs").querySelectorAll("details.cs-card").forEach(d=>d.open=b.dataset.cs==="open"));
  root.querySelectorAll('[data-cs="print"]').forEach(b=>b.onclick=()=>{
    const u=b.closest(".cs").dataset.csu, w=window.open("","_blank"); if(!w) return;
    const css=[...document.querySelectorAll("style")].map(s=>s.textContent).join("\n");
    w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Cheat Sheet</title><style>${css}body{font-family:'EB Garamond',Georgia,serif;margin:18px;color:#111}.cs-grid{grid-template-columns:1fr 1fr;gap:10px}.cs-card{padding:8px 10px}.cs-rules,.cs-ex{font-size:13.5px;line-height:1.55}.cs-card h4{font-size:16px}.cs-again,.cs-more{display:none!important}.cs-card figure.gph{width:170px}@page{margin:12mm}</style></head><body><h2 style="margin:0 0 8px">${b.closest("section")?.querySelector("h2")?.textContent||"Cheat Sheet"} · Cheat Sheet</h2><div class="cs-grid">${CS[u].map((c,i)=>card(c,i,u,true)).join("")}</div><p style="font-size:11px;color:#666">Algebra 2 Honors · Zogovic</p></body></html>`);
    w.document.close(); setTimeout(()=>{try{w.print();}catch(e){}},500);
  });
}
const index=()=>Object.entries(CS).flatMap(([u,L])=>L.map((c,i)=>({u,i,t:c.t,text:(c.t+" "+c.rules.join(" ")+" "+c.ex.join(" ")).replace(/<[^>]+>/g," ").toLowerCase()})));
window.A2CHEAT={html,bind,has:u=>!!CS[u],count:u=>CS[u]?CS[u].length:0,index,all:CS};
})();
