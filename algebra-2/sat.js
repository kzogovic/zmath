// Algebra 2 Honors: SAT-style practice (multiple choice + student-produced response)
(function(){
const Q=(u,q,ch,a,ex)=>({u,q,ch,a,ex}), G=(u,q,v,ex)=>({u,q,gi:v,ex});
const BANK=[
/* Unit 1 */
Q("unit-1","If 3(x - 4) + 5 = 2x + 7, what is the value of x?",["10","12","14","16"],2,"3x - 12 + 5 = 2x + 7 → 3x - 7 = 2x + 7 → x = 14."),
Q("unit-1","A line passes through (2, 5) and (6, -3). What is its slope?",["-2","-1/2","1/2","2"],0,"m = (-3 - 5)/(6 - 2) = -8/4 = -2."),
Q("unit-1","Which equation describes the line through the origin perpendicular to y = (3/4)x - 1?",["y = (3/4)x","y = -(3/4)x","y = (4/3)x","y = -(4/3)x"],3,"Perpendicular slope is the negative reciprocal of 3/4, which is -4/3. Through the origin, b = 0."),
G("unit-1","What is the sum of the solutions of |2x - 3| = 7?",3,"2x - 3 = 7 → x = 5; 2x - 3 = -7 → x = -2. Sum: 5 + (-2) = 3."),
Q("unit-1","If 2x + 3y = 12 and x - y = 1, what is x + y?",["4","5","6","7"],1,"From x = y + 1: 2(y + 1) + 3y = 12 → 5y = 10 → y = 2, x = 3. x + y = 5."),
Q("unit-1","A gym charges a $25 sign-up fee plus $15 per month. Which expression gives the total cost, in dollars, for m months?",["15 + 25m","25 + 15m","40m","25m + 15m"],1,"Fixed fee 25 plus 15 for each month: 25 + 15m."),
G("unit-1","For what value of k does the system kx + 2y = 6 and 3x + y = 4 have no solution?",6,"No solution → parallel lines: slopes -k/2 and -3 are equal → k = 6. The y-intercepts (3 and 4) differ, so the lines never meet."),
Q("unit-1","Which value of x satisfies |x - 5| < 3?",["1","2","6","8"],2,"-3 < x - 5 < 3 → 2 < x < 8. Only 6 is strictly between 2 and 8."),
Q("unit-1","f(x) = x² if x < 1 and f(x) = 2x + 3 if x ≥ 1. What is f(-2) + f(2)?",["7","9","11","13"],2,"f(-2) uses x²: 4. f(2) uses 2x + 3: 7. Sum 11."),
Q("unit-1","What is the y-intercept of the line 4x - 2y = 8?",["(0, -4)","(0, 4)","(0, 2)","(2, 0)"],0,"Let x = 0: -2y = 8 → y = -4."),
/* Unit 2 */
Q("unit-2","Which expression is equivalent to (x + 3)(x - 5)?",["x² - 15","x² + 2x - 15","x² - 2x - 15","x² - 8x - 15"],2,"FOIL: x² - 5x + 3x - 15 = x² - 2x - 15."),
Q("unit-2","Which is a factor of x² - 9x + 20?",["x + 4","x - 4","x + 5","x - 10"],1,"x² - 9x + 20 = (x - 4)(x - 5)."),
Q("unit-2","Which expression is equivalent to 4x² - 25?",["(4x - 5)(x + 5)","(2x - 5)²","(2x - 5)(2x + 5)","(4x - 25)(x + 1)"],2,"Difference of squares: (2x)² - 5² = (2x - 5)(2x + 5)."),
Q("unit-2","Which is equivalent to (3 + 2i)(1 - i)? (i = √(-1))",["5 - i","1 + i","3 - 2i","5 + i"],0,"3 - 3i + 2i - 2i² = 3 - i + 2 = 5 - i."),
G("unit-2","What is the positive solution of x² + 4x - 5 = 0?",1,"(x + 5)(x - 1) = 0 → x = -5 or x = 1. Positive solution: 1."),
Q("unit-2","What is the value of i² + i⁴?",["-2","-1","0","2"],2,"i² = -1 and i⁴ = 1, so the sum is 0."),
G("unit-2","If 2x² + kx + 8 = 0 has exactly one real solution and k > 0, what is k?",8,"One solution → discriminant 0: k² - 4(2)(8) = 0 → k² = 64 → k = 8."),
Q("unit-2","Which is equivalent to (x + 2)² - (x - 2)²?",["0","8","8x","2x² + 8"],2,"(x² + 4x + 4) - (x² - 4x + 4) = 8x."),
Q("unit-2","When x³ - 8 is divided by x - 2, what is the quotient?",["x² - 4","x² + 2x + 4","x² - 2x + 4","x² + 4"],1,"Difference of cubes: x³ - 8 = (x - 2)(x² + 2x + 4)."),
G("unit-2","What is the remainder when x³ - 2x + 4 is divided by x + 2?",0,"Remainder theorem: P(-2) = -8 + 4 + 4 = 0."),
/* Unit 3 */
Q("unit-3","What is the vertex of y = (x - 3)² + 4?",["(-3, 4)","(3, -4)","(3, 4)","(4, 3)"],2,"Vertex form y = (x - h)² + k has vertex (h, k) = (3, 4)."),
Q("unit-3","What is the minimum value of y = x² - 6x + 5?",["-4","-3","3","5"],0,"Vertex x = 6/2 = 3; y = 9 - 18 + 5 = -4."),
Q("unit-3","How many times does the graph of y = 2x² - 4x + 5 cross the x-axis?",["0","1","2","Cannot be determined"],0,"Discriminant 16 - 40 = -24 < 0, so there are no x-intercepts."),
G("unit-3","A ball's height is h(t) = -16t² + 32t + 48 feet. What is its maximum height, in feet?",64,"t = -32/(2·-16) = 1; h(1) = -16 + 32 + 48 = 64."),
Q("unit-3","Which is y = x² + 8x + 10 written in vertex form?",["(x + 4)² + 10","(x + 4)² - 6","(x - 4)² - 6","(x + 8)² - 54"],1,"x² + 8x + 16 - 16 + 10 = (x + 4)² - 6."),
Q("unit-3","A parabola has zeros -2 and 6. What is its axis of symmetry?",["x = -2","x = 2","x = 4","x = 6"],1,"Halfway between the zeros: (-2 + 6)/2 = 2."),
G("unit-3","The graphs of y = x² and y = 2x + 3 intersect at two points. What is the sum of their x-coordinates?",2,"x² = 2x + 3 → x² - 2x - 3 = 0 → x = 3 or -1. Sum 2 (also -b/a = 2)."),
Q("unit-3","The parabola y = a(x - 1)(x - 5) passes through (3, 8). What is a?",["-4","-2","2","4"],1,"8 = a(2)(-2) = -4a → a = -2."),
Q("unit-3","Which value of x is a solution of x² - 4x - 12 < 0?",["-3","0","6","7"],1,"(x - 6)(x + 2) < 0 → -2 < x < 6. Only 0 is in that interval."),
Q("unit-3","A rectangle has perimeter 40 cm. What is its greatest possible area?",["80 cm²","96 cm²","100 cm²","400 cm²"],2,"A = x(20 - x), maximized at x = 10: a 10 × 10 square, area 100."),
/* Unit 4 */
Q("unit-4","For f(x) = -2x³ + x, what happens as x → ∞?",["f(x) → ∞","f(x) → -∞","f(x) → 0","f(x) → -2"],1,"Odd degree with negative leading coefficient: the right end falls."),
Q("unit-4","f(x) = x(x - 2)²(x + 3). At which x does the graph touch the x-axis without crossing it?",["-3","0","2","3"],2,"x = 2 has even multiplicity (2), so the graph touches and turns."),
G("unit-4","The polynomial with zeros 1, -1 and 3 and leading coefficient 1 is written in standard form. What is its constant term?",3,"(x - 1)(x + 1)(x - 3) = (x² - 1)(x - 3) = x³ - 3x² - x + 3."),
Q("unit-4","If p(3) = 0 for a polynomial p, which must be a factor of p(x)?",["x + 3","x - 3","3x","x² - 3"],1,"Factor theorem: p(c) = 0 means x - c is a factor."),
Q("unit-4","Which is a factor of p(x) = x³ - 4x² + x + 6?",["x - 1","x + 1","x + 2","x + 3"],1,"p(-1) = -1 - 4 - 1 + 6 = 0, so x + 1 is a factor."),
Q("unit-4","How many real zeros does x⁴ - 5x² + 4 have?",["0","2","3","4"],3,"(x² - 1)(x² - 4) = 0 → x = ±1, ±2: four real zeros."),
Q("unit-4","What is the degree of (2x³ - 1)(x² + 4)?",["3","5","6","9"],1,"Multiply leading terms: 2x³ · x² = 2x⁵."),
Q("unit-4","A polynomial with real coefficients has 2 + i as a zero. Which must also be a zero?",["-2 + i","2 - i","-2 - i","i"],1,"Complex zeros of real polynomials come in conjugate pairs."),
G("unit-4","What is the remainder when x⁴ - 3x + 2 is divided by x - 2?",12,"P(2) = 16 - 6 + 2 = 12."),
Q("unit-4","What is the greatest number of turning points the graph of a degree-5 polynomial can have?",["3","4","5","6"],1,"A degree-n polynomial has at most n - 1 turning points."),
/* Unit 5 */
Q("unit-5","For x ≠ -3, which is equivalent to (x² - 9)/(x + 3)?",["x + 3","x - 3","x - 9","x² - 3"],1,"(x - 3)(x + 3)/(x + 3) = x - 3."),
Q("unit-5","What is the vertical asymptote of f(x) = (x + 1)/(x - 4)?",["x = -1","x = 1","x = 4","y = 1"],2,"The denominator is 0 at x = 4 and the factor does not cancel."),
Q("unit-5","What is the horizontal asymptote of f(x) = (6x² + 1)/(2x² - 5)?",["y = 0","y = 3","y = 6","none"],1,"Equal degrees → ratio of leading coefficients: 6/2 = 3."),
G("unit-5","What value of x satisfies 3/x + 1 = 7/x?",4,"Multiply by x: 3 + x = 7 → x = 4 (x ≠ 0 ✓)."),
Q("unit-5","Which is equivalent to 1/x + 1/(2x)?",["2/(3x)","3/(2x)","2/(2x)","1/(3x)"],1,"LCD 2x: 2/(2x) + 1/(2x) = 3/(2x)."),
G("unit-5","y varies inversely with x, and y = 6 when x = 4. What is y when x = 8?",3,"k = xy = 24, so y = 24/8 = 3."),
Q("unit-5","At what x-value does f(x) = {{(x - 2)(x + 1)|(x - 2)(x - 5)}} have a hole?",["x = -1","x = 2","x = 5","no hole"],1,"The factor (x - 2) cancels, creating a hole at x = 2."),
Q("unit-5","What is the solution set of x/(x - 3) = 3/(x - 3)?",["{3}","{0}","{-3}","no solution"],3,"Multiplying gives x = 3, but x = 3 makes the denominator 0, so it is extraneous."),
G("unit-5","Pipe A fills a tank in 6 hours and pipe B in 3 hours. How many hours do they take together?",2,"1/6 + 1/3 = 1/2 tank per hour → 2 hours."),
Q("unit-5","For x ≠ ±1, which is equivalent to (2/(x + 1)) · ((x² - 1)/4)?",["(x + 1)/2","(x - 1)/2","2(x - 1)","(x - 1)/4"],1,"(2/(x + 1)) · ((x - 1)(x + 1)/4) = 2(x - 1)/4 = (x - 1)/2."),
/* Unit 6 */
Q("unit-6","Which is equivalent to √50?",["2√5","5√2","10√5","25√2"],1,"√(25 · 2) = 5√2."),
G("unit-6","What is the value of 8^(2/3)?",4,"∛8 = 2, and 2² = 4."),
Q("unit-6","For x > 0, which is equivalent to x^(1/2) · x^(1/3)?",["x^(1/6)","x^(2/5)","x^(5/6)","x^(1/5)"],2,"Add exponents: 1/2 + 1/3 = 5/6."),
G("unit-6","What is the solution of √(x + 7) = x + 1?",2,"Square: x + 7 = x² + 2x + 1 → x² + x - 6 = 0 → x = 2 or -3. x = -3 gives √4 = 2 ≠ -2, so it is extraneous."),
G("unit-6","If f(x) = 2x + 1 and g(x) = x², what is f(g(3))?",19,"g(3) = 9, f(9) = 19."),
Q("unit-6","What is the inverse of f(x) = (x - 4)/3?",["3x - 4","3x + 4","(x + 4)/3","3/(x - 4)"],1,"Swap: x = (y - 4)/3 → y = 3x + 4."),
Q("unit-6","What is the value of 16^(-1/2)?",["-8","-4","1/4","1/8"],2,"16^(1/2) = 4, so 16^(-1/2) = 1/4."),
Q("unit-6","For x, y > 0, which is equivalent to ∛(x⁶y³)?",["x²y","x³y","x²y³","xy²"],0,"∛(x⁶) = x² and ∛(y³) = y."),
G("unit-6","If f(x) = 3x - 2, what is f⁻¹(7)?",3,"f⁻¹(7) is the x with f(x) = 7: 3x - 2 = 7 → x = 3."),
Q("unit-6","Which is equivalent to 6/√3?",["2√3","3√2","6√3","√3/6"],0,"6√3/3 = 2√3."),
/* Unit 7 */
G("unit-7","What is log₂ 32?",5,"2⁵ = 32."),
Q("unit-7","A town of 500 grows 4% per year. Which gives the population after t years?",["500(0.04)^t","500(1.4)^t","500(1.04)^t","500 + 4t"],2,"Growth factor 1 + 0.04 = 1.04."),
G("unit-7","If 3^(x + 1) = 81, what is x?",3,"81 = 3⁴, so x + 1 = 4."),
G("unit-7","An 80-gram sample has a half-life of 5 years. How many grams remain after 15 years?",10,"15 years = 3 half-lives: 80 → 40 → 20 → 10."),
Q("unit-7","What is log 2 + log 5?",["log 7","1","10","log 2.5"],1,"log 2 + log 5 = log 10 = 1."),
Q("unit-7","$1,000 is invested at 6% interest compounded monthly. Which gives the value after 2 years?",["1000(1.06)²","1000(1 + 0.06/12)^24","1000(1 + 0.06)^24","1000(1.005)²"],1,"A = P(1 + r/n)^(nt) with n = 12, t = 2."),
/* Unit 8 */
G("unit-8","What is the 20th term of the arithmetic sequence 7, 11, 15, ...?",83,"a₂₀ = 7 + 19(4) = 83."),
G("unit-8","What is the 8th term of the geometric sequence 3, 6, 12, ...?",384,"a₈ = 3 · 2⁷ = 384."),
G("unit-8","What is 1 + 2 + 3 + ... + 100?",5050,"n(n + 1)/2 = 100 · 101/2 = 5050."),
G("unit-8","What is the sum of the infinite geometric series 12 + 6 + 3 + ...?",24,"S = a/(1 - r) = 12/(1 - 1/2) = 24."),
Q("unit-8","a₁ = 2 and aₙ = 3aₙ₋₁. What is a₄?",["18","24","54","162"],2,"2, 6, 18, 54."),
G("unit-8","What is the value of Σ (2k + 1) for k = 1 to 5?",35,"3 + 5 + 7 + 9 + 11 = 35."),
/* Unit 9 */
Q("unit-9","What is sin 30°?",["1/2","√2/2","√3/2","1"],0,"From the 30-60-90 triangle, sin 30° = 1/2."),
Q("unit-9","In a right triangle, sin A = 3/5 with A acute. What is cos A?",["3/4","4/5","5/3","5/4"],1,"Sides 3-4-5: cos A = 4/5."),
Q("unit-9","What is 150° in radians?",["5π/6","3π/4","2π/3","5π/3"],0,"150 · π/180 = 5π/6."),
Q("unit-9","What is the period of y = 3 sin(2x)?",["π/2","π","2π","3π"],1,"Period = 2π/2 = π."),
G("unit-9","If sin x° = cos 20° and 0 < x < 90, what is x?",70,"sin x° = cos(90° - x°), so 90 - x = 20."),
Q("unit-9","A circle has radius 6. What is the length of an arc with central angle π/3 radians?",["π","2π","3π","6π"],1,"s = rθ = 6 · π/3 = 2π."),
/* Unit 10 */
G("unit-10","In how many ways can 5 different books be arranged on a shelf?",120,"5! = 120."),
G("unit-10","What is the value of ₈C₃?",56,"8!/(3!5!) = 56."),
Q("unit-10","Two fair coins are tossed. What is the probability both land heads?",["1/2","1/3","1/4","1/8"],2,"(1/2)(1/2) = 1/4."),
Q("unit-10","A and B are independent with P(A) = 0.3 and P(B) = 0.5. What is P(A and B)?",["0.15","0.2","0.8","0.65"],0,"Independent: multiply, 0.3 × 0.5."),
Q("unit-10","A bag has 4 red and 6 blue marbles. Two are drawn without replacement. What is P(both red)?",["4/25","2/15","2/5","1/5"],1,"(4/10)(3/9) = 12/90 = 2/15."),
G("unit-10","A game pays $10 with probability 0.2 and $0 otherwise. What is the expected payout in dollars?",2,"E = 10(0.2) + 0(0.8) = 2."),
/* Unit 11 */
Q("unit-11","What are the center and radius of (x - 2)² + (y + 3)² = 16?",["(2, -3), 4","(-2, 3), 4","(2, -3), 16","(2, 3), 4"],0,"(x - h)² + (y - k)² = r²: center (2, -3), r = 4."),
G("unit-11","What is the radius of the circle x² + y² - 6x + 4y - 3 = 0?",4,"(x - 3)² + (y + 2)² = 3 + 9 + 4 = 16, so r = 4."),
Q("unit-11","A circle centered at the origin passes through (3, 4). What is its equation?",["x² + y² = 5","x² + y² = 7","x² + y² = 25","x² + y² = 49"],2,"r² = 3² + 4² = 25."),
G("unit-11","What is the length of the major axis of x²/25 + y²/9 = 1?",10,"a² = 25 → a = 5, so the major axis is 2a = 10."),
Q("unit-11","What is the focus of the parabola y = (1/8)x²?",["(0, 1/8)","(0, 2)","(2, 0)","(0, 8)"],1,"x² = 8y = 4py → p = 2: focus (0, 2)."),
Q("unit-11","How many points do the line y = 7 and the circle x² + y² = 25 have in common?",["0","1","2","infinitely many"],0,"The circle reaches only up to y = 5, so they never meet.")
];

function parseNum(s){ s=String(s).trim().replace(/−/g,"-").replace(/\s+/g,""); if(!s) return NaN;
  if(/^-?\d+(\.\d+)?\/-?\d+(\.\d+)?$/.test(s)){ const [a,b]=s.split("/").map(Number); return a/b; } return Number(s); }
const L="ABCD";
const CSS=`
.sat{margin:6px 0 14px}
.sat .sbar{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:6px 0 12px}
.sat .sbar button{border:1px solid #111;background:#fff;color:#111;padding:3px 11px;font:600 15px 'EB Garamond',Georgia,serif;cursor:pointer}
.sat .sbar button:hover{background:#eee}
.sat .sbar .score{margin-left:auto;font-style:italic;color:#555}
ol.satq{margin:0;padding-left:26px}
ol.satq>li{margin:0 0 16px;font-size:17px;line-height:1.6;border-bottom:1px dotted #ccc;padding-bottom:12px}
.satch{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:6px;margin:8px 0}
.satch label{display:flex;gap:8px;align-items:center;border:1px solid #bbb;padding:5px 10px;cursor:pointer;background:#fff}
.satch label:hover{border-color:#111}
.satch label.ok{border:2px solid #111;background:#f0f0f0;font-weight:700}
.satch label.no{border:2px dashed #111;text-decoration:line-through;color:#777}
.satch b{display:inline-block;width:22px;height:22px;border:1px solid #111;border-radius:50%;text-align:center;line-height:20px;font-size:13px;flex:none}
.satgi{display:flex;gap:8px;align-items:center;margin:8px 0;flex-wrap:wrap}
.satgi input{font:17px 'EB Garamond',Georgia,serif;padding:3px 8px;border:1px solid #111;width:130px}
.satgi button,.satchk{border:1px solid #111;background:#111;color:#fff;padding:3px 12px;font:600 15px 'EB Garamond',Georgia,serif;cursor:pointer}
.satfb{display:none;border-left:3px solid #111;background:#fafafa;padding:6px 12px;margin-top:6px}
.satfb.on{display:block}
.sattag{display:inline-block;font-size:12px;letter-spacing:.08em;text-transform:uppercase;border:1px solid #999;color:#555;padding:0 6px;margin-right:6px;vertical-align:2px}
`;
const fmt=s=>window.A2PRACTICE?A2PRACTICE.fmt(s):s;
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const listFor=u=>BANK.map((q,i)=>[q,i]).filter(([q])=>u==="sat"||q.u===u);
function item([q,i]){
  const tag=q.gi!==undefined?"Grid-in":"Multiple choice";
  const body=q.gi!==undefined?`<div class="satgi"><input type="text" inputmode="decimal" aria-label="Your answer" placeholder="your answer"><button type="button" data-sat="gi">Check</button></div>`
    :`<div class="satch">${q.ch.map((c,j)=>`<label data-j="${j}"><input type="radio" name="sat${i}" value="${j}" hidden><b>${L[j]}</b><span>${fmt(esc(c))}</span></label>`).join("")}</div>`;
  return `<li data-i="${i}"><span class="sattag">${tag}</span>${fmt(esc(q.q))}${body}<div class="satfb"></div></li>`;
}
function html(u,label){
  const list=listFor(u); if(!list.length) return "";
  return `<div class="sat" data-satu="${u}"><div class="sbar"><button type="button" data-sat="shuffle">Shuffle order</button><button type="button" data-sat="reveal">Show all answers</button><button type="button" data-sat="reset">Start over</button><span class="score">0 of ${list.length} answered · 0 correct</span></div><ol class="satq">${list.map(item).join("")}</ol></div>`;
}
function bind(root){
  if(!document.getElementById("a2satcss")){ const st=document.createElement("style"); st.id="a2satcss"; st.textContent=CSS; document.head.appendChild(st); }
  root.querySelectorAll("div.sat").forEach(box=>{
    const ol=box.querySelector("ol"), score=box.querySelector(".score");
    const upd=()=>{ const a=box.querySelectorAll("li[data-done]").length, c=box.querySelectorAll('li[data-done="1"]').length; score.textContent=`${a} of ${ol.children.length} answered · ${c} correct`; };
    const show=(li,correct,reveal)=>{ const q=BANK[+li.dataset.i], fb=li.querySelector(".satfb");
      const right=q.gi!==undefined?`${q.gi}`:`${L[q.a]}) ${q.ch[q.a]}`;
      fb.innerHTML=(reveal?"":correct?"<b>✓ Correct!</b> ":"<b>✗ Not quite.</b> ")+`Answer: <b>${fmt(esc(right))}</b>. ${fmt(esc(q.ex))}`; fb.classList.add("on");
      if(!reveal){ li.dataset.done=correct?"1":"0"; upd(); }
      if(q.gi===undefined) li.querySelectorAll("label").forEach(l=>{ if(+l.dataset.j===q.a) l.classList.add("ok"); }); };
    const wire=li=>{ const q=BANK[+li.dataset.i];
      li.querySelectorAll("label").forEach(l=>l.onclick=()=>{ if(li.dataset.done) return; const j=+l.dataset.j; if(j!==q.a) l.classList.add("no"); show(li,j===q.a); });
      const gb=li.querySelector('[data-sat="gi"]'); if(gb){ const inp=li.querySelector("input"); const go=()=>{ if(li.dataset.done) return; const v=parseNum(inp.value); if(isNaN(v)) return; show(li,Math.abs(v-q.gi)<1e-6); }; gb.onclick=go; inp.onkeydown=e=>{ if(e.key==="Enter") go(); }; } };
    ol.querySelectorAll("li").forEach(wire);
    box.querySelector('[data-sat="shuffle"]').onclick=()=>{ const ls=[...ol.children]; for(let i=ls.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [ls[i],ls[j]]=[ls[j],ls[i]]; } ls.forEach(l=>ol.appendChild(l)); };
    box.querySelector('[data-sat="reveal"]').onclick=()=>ol.querySelectorAll("li").forEach(li=>show(li,false,true));
    box.querySelector('[data-sat="reset"]').onclick=()=>{ ol.innerHTML=listFor(box.dataset.satu).map(item).join(""); ol.querySelectorAll("li").forEach(wire); upd(); };
  });
}
window.A2SAT={html,bind,count:u=>listFor(u).length,bank:BANK};
})();
