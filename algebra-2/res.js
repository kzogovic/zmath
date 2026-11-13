// Algebra 2 Honors: free resources for each unit
(function(){
const KA=q=>`https://www.khanacademy.org/search?page_search_query=${encodeURIComponent(q)}`;
const YT=q=>`https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
const PAUL="https://tutorial.math.lamar.edu/classes/alg/alg.aspx", PP=p=>`https://tutorial.math.lamar.edu/${p}`;
const OS="https://openstax.org/books/college-algebra-2e/pages/", KUTA="https://www.kutasoftware.com/freeia2.html", DES="https://www.desmos.com/calculator";
const L=(t,url,d,kind)=>({t,url,d,kind});
const COMMON=u=>[L("Desmos graphing calculator",DES,"Graph any problem from this unit and check your answers.","Tool"),L("Kuta Software free Algebra 2 worksheets",KUTA,"Printable practice worksheets with answer keys, by topic.","Worksheets")];
const RES={
 "toolkit":{lead:"Parent functions, transformations, domain and range.",links:[
  L("Khan Academy: Transformations of functions",KA("transformations of functions algebra 2"),"Lessons and practice on shifts, stretches and reflections.","Lessons"),
  L("Khan Academy: Domain and range",KA("domain and range"),"Short videos and practice.","Lessons"),
  L("Paul's Online Notes: Algebra",PAUL,"Clear notes with worked examples (see the Graphing and Functions chapter).","Notes"),
  L("OpenStax College Algebra 2e, Ch. 3–4",OS+"index","Free textbook: functions and linear functions.","Textbook"),
  L("Videos: parent functions & transformations",YT("parent functions transformations algebra 2"),"Search results for short video lessons.","Videos")]},
 "unit-1":{lead:"Absolute value, lines, systems in three variables, piecewise functions.",links:[
  L("Khan Academy: Absolute value equations",KA("absolute value equations"),"Videos and practice.","Lessons"),
  L("Khan Academy: Absolute value inequalities",KA("absolute value inequalities"),"Videos and practice.","Lessons"),
  L("Khan Academy: Systems of three variables",KA("systems of three variables"),"Elimination with three equations.","Lessons"),
  L("Khan Academy: Piecewise functions",KA("piecewise functions"),"Evaluating and graphing.","Lessons"),
  L("Paul's Online Notes: Algebra",PAUL,"See Absolute Value Equations and Inequalities, Lines, and Systems of Equations.","Notes"),
  L("OpenStax College Algebra 2e (contents)",OS+"index","Ch. 2 Equations & Inequalities, Ch. 4 Linear Functions, Ch. 7 Systems.","Textbook"),
  L("Videos: absolute value inequalities",YT("absolute value inequalities algebra 2"),"Search results for video lessons.","Videos"),
  L("Videos: 3 by 3 systems by elimination",YT("solving systems of three variables elimination"),"Search results for video lessons.","Videos")]},
 "unit-2":{lead:"Factoring, polynomial division, solving quadratics, complex numbers, binomial theorem.",links:[
  L("Khan Academy: Polynomial factorization (Algebra 2)","https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:poly-factor/x2ec2f6f830c9fb89:factor-high-deg","Factoring higher-degree polynomials.","Lessons"),
  L("Khan Academy: Algebra 2 course","https://www.khanacademy.org/math/algebra2","Full course: polynomial arithmetic, complex numbers, factorization, division.","Lessons"),
  L("Paul's Notes: Factoring polynomials (practice)",PP("problems/alg/factoring.aspx"),"Practice problems with full solutions.","Practice"),
  L("Paul's Notes: Quadratic equations (part II)",PP("classes/alg/solvequadraticeqnsii.aspx"),"Completing the square and the quadratic formula.","Notes"),
  L("Paul's Notes: Quadratic equations summary",PP("classes/alg/solvequadraticeqnsummary.aspx"),"Which method to use, and the discriminant.","Notes"),
  L("Khan Academy: Complex numbers",KA("complex numbers algebra 2"),"Adding, multiplying and dividing complex numbers.","Lessons"),
  L("Khan Academy: Binomial theorem",KA("binomial theorem"),"Expanding with Pascal's triangle.","Lessons"),
  L("Videos: factoring trinomials (AC method)",YT("factoring trinomials ac method"),"Search results for video lessons.","Videos"),
  L("Videos: sum and difference of cubes",YT("factoring sum and difference of cubes"),"Search results for video lessons.","Videos")]},
 "unit-3":{lead:"Forms of a quadratic, vertex form, discriminant, inequalities, applications.",links:[
  L("Khan Academy: Vertex form",KA("vertex form quadratic"),"Completing the square to find the vertex.","Lessons"),
  L("Khan Academy: Quadratic inequalities",KA("quadratic inequalities"),"Solving and graphing.","Lessons"),
  L("Paul's Notes: Quadratic equations summary",PP("classes/alg/solvequadraticeqnsummary.aspx"),"Methods and the discriminant.","Notes"),
  L("OpenStax College Algebra 2e, Ch. 5",OS+"5-introduction-to-polynomial-and-rational-functions","Section 5.1 covers quadratic functions.","Textbook"),
  L("Videos: quadratic word problems (max/min)",YT("quadratic word problems maximum minimum"),"Search results for video lessons.","Videos")]},
 "systems":{lead:"Systems of equations: graphing, substitution, elimination, matrices, nonlinear systems.",links:[
  L("Khan Academy: Systems of equations",KA("systems of equations"),"All methods, with practice.","Lessons"),
  L("Khan Academy: Nonlinear systems",KA("nonlinear systems of equations"),"Line–parabola and line–circle systems.","Lessons"),
  L("Paul's Online Notes: Algebra",PAUL,"See the Systems of Equations chapter, including augmented matrices.","Notes"),
  L("OpenStax College Algebra 2e (contents)",OS+"index","Chapter 7: Systems of Equations and Inequalities.","Textbook"),
  L("Videos: Cramer's rule",YT("cramers rule 3x3"),"Search results for video lessons.","Videos")]},
 "unit-4":{lead:"End behavior, multiplicity, finding all zeros, writing polynomials.",links:[
  L("Paul's Notes: Polynomial functions",PP("classes/alg/PolynomialFunctions.aspx"),"Definitions, division and the remainder theorem.","Notes"),
  L("Paul's Notes: Zeroes of polynomials (practice)",PP("problems/alg/zeroesofpolynomials.aspx"),"Multiplicity and the factor theorem.","Practice"),
  L("Paul's Notes: Finding zeroes (practice)",PP("problems/alg/findingzeroesofpolynomials.aspx"),"Rational Root Theorem practice with solutions.","Practice"),
  L("Khan Academy: Polynomial graphs",KA("polynomial graphs end behavior zeros"),"End behavior, zeros and multiplicity.","Lessons"),
  L("OpenStax College Algebra 2e, Ch. 5",OS+"5-introduction-to-polynomial-and-rational-functions","Sections 5.2–5.5: polynomial graphs, division and zeros.","Textbook"),
  L("OpenStax Ch. 5 key concepts",OS+"5-key-concepts","One-page summary of the chapter.","Textbook"),
  L("Videos: rational root theorem",YT("rational root theorem find all zeros"),"Search results for video lessons.","Videos")]},
 "unit-5":{lead:"Rational expressions, graphs and asymptotes, rational equations.",links:[
  L("Paul's Notes: Rational functions (graphing)",PP("classes/alg/graphrationalfcns.aspx"),"Vertical and horizontal asymptotes, with examples.","Notes"),
  L("Khan Academy: Rational expressions",KA("simplifying rational expressions"),"Simplify, multiply, add and subtract.","Lessons"),
  L("Khan Academy: Rational equations",KA("rational equations extraneous solutions"),"Solving and checking for extraneous answers.","Lessons"),
  L("OpenStax College Algebra 2e, Ch. 5",OS+"5-introduction-to-polynomial-and-rational-functions","Section 5.6 Rational Functions, 5.8 Variation.","Textbook"),
  L("Videos: graphing rational functions",YT("graphing rational functions asymptotes holes"),"Search results for video lessons.","Videos")]},
 "unit-6":{lead:"Radicals, rational exponents, radical equations, composition and inverses.",links:[
  L("Khan Academy: Rational exponents and radicals",KA("rational exponents radicals"),"Properties and simplifying.","Lessons"),
  L("Khan Academy: Radical equations",KA("solving radical equations"),"Including extraneous solutions.","Lessons"),
  L("Khan Academy: Inverse functions",KA("inverse functions"),"Finding and verifying inverses.","Lessons"),
  L("Paul's Online Notes: Algebra",PAUL,"See Radicals, Rational Exponents, Radical Equations and Inverse Functions.","Notes"),
  L("OpenStax College Algebra 2e, Ch. 5",OS+"5-introduction-to-polynomial-and-rational-functions","Section 5.7 Inverses and Radical Functions.","Textbook"),
  L("Videos: composition of functions",YT("composition of functions algebra 2"),"Search results for video lessons.","Videos")]},
 "unit-7":{lead:"Exponential growth and decay, logarithms, solving exponential and log equations.",links:[
  L("Paul's Notes: Exponential functions",PP("classes/alg/ExpFunctions.aspx"),"Graphs and properties.","Notes"),
  L("Paul's Notes: Logarithm functions",PP("classes/alg/logfunctions.aspx"),"Evaluating logs and change of base.","Notes"),
  L("OpenStax College Algebra 2e, Ch. 6",OS+"6-introduction-to-exponential-and-logarithmic-functions","Exponential and logarithmic functions, equations and models.","Textbook"),
  L("OpenStax 6.7 Exponential & logarithmic models",OS+"6-7-exponential-and-logarithmic-models","Half-life, growth and Newton's law of cooling.","Textbook"),
  L("Khan Academy: Logarithms",KA("logarithms algebra 2"),"Log properties and equations.","Lessons"),
  L("Videos: solving exponential equations with logs",YT("solving exponential equations using logarithms"),"Search results for video lessons.","Videos")]},
 "unit-8":{lead:"Arithmetic and geometric sequences and series, sigma notation.",links:[
  L("OpenStax College Algebra 2e, Ch. 9",OS+"9-introduction-to-sequences-probability-and-counting-theory","Sequences, series, counting and probability.","Textbook"),
  L("Khan Academy: Geometric series",KA("geometric series"),"Finite and infinite series.","Lessons"),
  L("Khan Academy: Arithmetic sequences",KA("arithmetic sequences"),"Explicit and recursive formulas.","Lessons"),
  L("Videos: sigma notation",YT("sigma notation summation algebra 2"),"Search results for video lessons.","Videos")]},
 "unit-9":{lead:"Right-triangle trig, the unit circle, graphs, identities and equations.",links:[
  L("Khan Academy: Unit circle",KA("unit circle trigonometry"),"Radians and the unit circle.","Lessons"),
  L("Khan Academy: Graphs of sine and cosine",KA("graphs of sine and cosine amplitude period"),"Amplitude, period, midline and phase shift.","Lessons"),
  L("Khan Academy: Trig identities",KA("trigonometric identities"),"Pythagorean and angle identities.","Lessons"),
  L("OpenStax Algebra and Trigonometry 2e","https://openstax.org/books/algebra-and-trigonometry-2e/pages/index","Free textbook including the trigonometry chapters.","Textbook"),
  L("Videos: unit circle",YT("unit circle radians explained"),"Search results for video lessons.","Videos")]},
 "unit-10":{lead:"Counting principles, permutations, combinations, probability, expected value.",links:[
  L("OpenStax College Algebra 2e, Ch. 9",OS+"9-introduction-to-sequences-probability-and-counting-theory","Sections 9.5–9.7: counting, binomial theorem, probability.","Textbook"),
  L("Khan Academy: Permutations and combinations",KA("permutations and combinations"),"Counting with and without order.","Lessons"),
  L("Khan Academy: Probability",KA("probability compound events"),"Independent and dependent events.","Lessons"),
  L("Videos: permutations vs combinations",YT("permutations vs combinations"),"Search results for video lessons.","Videos")]},
 "unit-11":{lead:"Circles, parabolas, ellipses, hyperbolas.",links:[
  L("Paul's Online Notes: Algebra",PAUL,"See Circles, Parabolas, Ellipses and Hyperbolas in the Graphing chapter.","Notes"),
  L("Khan Academy: Conic sections",KA("conic sections"),"Equations and graphs of all four conics.","Lessons"),
  L("OpenStax College Algebra 2e (contents)",OS+"index","Chapter 8: Analytic Geometry (conic sections).","Textbook"),
  L("Videos: completing the square for circles",YT("equation of a circle completing the square"),"Search results for video lessons.","Videos")]},
 "sat":{lead:"Official SAT practice and prep.",links:[
  L("College Board: Studying and practicing for the digital SAT","https://satsuite.collegeboard.org/sat/practice-preparation/studying-practicing","Official practice options, including full-length tests in Bluebook.","Official"),
  L("Bluebook (official practice tests)","https://bluebook.collegeboard.org/","Free full-length digital SAT practice tests from College Board.","Official"),
  L("Khan Academy: Digital SAT Math",KA("digital SAT math"),"Free official SAT prep course built with College Board.","Lessons"),
  L("Desmos graphing calculator",DES,"The same calculator built into the digital SAT. Practice with it!","Tool")]}
};
for(const k in RES) if(/^unit-|toolkit|systems/.test(k)) RES[k].links.push(...COMMON(k));
const CSS=`
.res{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px;margin:8px 0 6px}
.res a{display:block;border:1px solid #111;padding:10px 12px;color:#111;text-decoration:none;background:#fff}
.res a:hover{box-shadow:4px 4px 0 #111}
.res a b{display:block;font-size:17.5px;line-height:1.25}
.res a b::after{content:" ↗";font-size:13px}
.res a span{display:block;font-size:15px;color:#333;margin-top:2px}
.res a i{display:inline-block;font-style:normal;font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;border:1px solid #999;color:#555;padding:0 6px;margin-top:5px}
.reslead{font-style:italic;color:#444;margin:0 0 6px}
`;
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
function html(u){ const r=RES[u]; if(!r) return "";
  return `<p class="reslead">${esc(r.lead)} All links are free and open in a new tab.</p><div class="res">${r.links.map(l=>`<a href="${esc(l.url)}" target="_blank" rel="noopener"><b>${esc(l.t)}</b><span>${esc(l.d)}</span><i>${l.kind}</i></a>`).join("")}</div>`; }
function bind(){ if(!document.getElementById("a2rescss")){ const st=document.createElement("style"); st.id="a2rescss"; st.textContent=CSS; document.head.appendChild(st); } }
window.A2RES={html,bind,has:u=>!!RES[u],count:u=>RES[u]?RES[u].links.length:0,all:RES};
})();
