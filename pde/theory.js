/* Z-Partial Differential Equations: Theory and Uses & resources. Read by zbook.js. */
(function(){
const OCW="https://ocw.mit.edu/courses/18-303-linear-partial-differential-equations-fall-2006/";
const LEBL="https://www.jirka.org/diffyqs/";
const PAUL="https://tutorial.math.lamar.edu/Classes/DE/DE.aspx";
const VPDE="https://visualpde.com";
const st=(lebl,paul,extra)=>[
 {k:"free",l:1,t:"Lebl, Notes on Diffy Qs: "+lebl,by:"Free textbook (Jiří Lebl)",u:LEBL},
 {k:"free",l:1,t:"Paul's Online Math Notes, Differential Equations: "+paul,by:"Notes with fully solved examples",u:PAUL},
 {k:"play",l:1,t:"VisualPDE: watch it happen",by:"Change the equation and see the solution live",u:VPDE},
 ...(extra||[])];

window.ZT={
_course:[
 {k:"play",l:1,t:"VisualPDE",by:"Walker, Townsend, Chudasama & Krause",u:VPDE,d:"Solve heat, wave, Laplace and pattern-forming equations live in your browser (even on a phone)."},
 {k:"free",l:1,t:"Notes on Diffy Qs",by:"Jiří Lebl",u:LEBL,d:"Free textbook; the chapter on Fourier series and PDEs covers this course's core with exercises."},
 {k:"free",l:1,t:"Paul's Online Math Notes: Differential Equations",by:"Paul Dawkins, Lamar University",u:PAUL,d:"See the chapters “Boundary Value Problems & Fourier Series” and “Partial Differential Equations”."},
 {k:"watch",l:2,t:"MIT 18.303 Linear Partial Differential Equations",by:"MIT OpenCourseWare",u:OCW,d:"Lecture notes, problem sets and exams with solutions."},
 {k:"watch",l:1,t:"3Blue1Brown: differential equations series",by:"Grant Sanderson",u:"https://www.3blue1brown.com",d:"Animated videos on the heat equation and Fourier series (search “differential equations” on the site)."},
 {k:"watch",l:2,t:"Steve Brunton's YouTube channel",by:"University of Washington",u:"https://www.youtube.com/@Eigensteve",d:"Lectures on Fourier analysis, PDEs and their numerical solution."},
 {k:"play",l:1,t:"An Interactive Introduction to Fourier Transforms",by:"Jez Swanson",u:"https://www.jezzamon.com/fourier/",d:"See how circles (sines and cosines) rebuild any drawing."},
 {k:"book",l:2,free:false,t:"Partial Differential Equations for Scientists and Engineers",by:"Stanley Farlow (Dover, inexpensive)",d:"A friendly, problem-based classic: 47 short lessons."},
 {k:"book",l:3,free:false,t:"Partial Differential Equations: An Introduction",by:"Walter Strauss (Wiley)",d:"The standard undergraduate textbook, with proofs."},
 {k:"read",l:1,t:"Z-Frontiers: where PDEs lead",by:"this website",u:"../frontiers/#from-pde",d:"Weather and climate, AI image generation (diffusion models), finance, signals."}
],

/* ---------------- Unit 1 ---------------- */
u1:{
 defs:[
  ["Partial differential equation","An equation involving an unknown function of two or more variables and its partial derivatives, e.g. u<sub>t</sub> = ku<sub>xx</sub>.",""],
  ["Order","The highest derivative that appears.","u<sub>t</sub> + uu<sub>x</sub> = 0 is first order; u<sub>tt</sub> = c²u<sub>xx</sub> is second order."],
  ["Linear / nonlinear; homogeneous","Linear if u and its derivatives appear only to the first power, not multiplied together: L[u] = f. Homogeneous if f = 0.","u<sub>t</sub> = u<sub>xx</sub> + x is linear, nonhomogeneous; u<sub>t</sub> + uu<sub>x</sub> = 0 is nonlinear."],
  ["Classification (second order)","For Au<sub>xx</sub> + Bu<sub>xy</sub> + Cu<sub>yy</sub> + (lower-order terms) = 0: B² − 4AC &lt; 0 elliptic, = 0 parabolic, &gt; 0 hyperbolic.","Laplace u<sub>xx</sub> + u<sub>yy</sub> = 0: elliptic. Heat u<sub>t</sub> = u<sub>xx</sub>: parabolic. Wave u<sub>tt</sub> = u<sub>xx</sub>: hyperbolic."],
  ["Initial and boundary conditions","Initial conditions give u (and maybe u<sub>t</sub>) at t = 0. Boundary conditions at the edge: Dirichlet (u given), Neumann (∂u/∂n given), Robin (a combination au + b∂u/∂n given).",""],
  ["Well-posed problem (Hadamard)","A solution exists, it is unique, and it depends continuously on the data (small changes in data give small changes in the solution).",""]
 ],
 thms:[
  {n:"Superposition principle",s:"If u<sub>1</sub>, …, u<sub>n</sub> solve a linear homogeneous PDE (with homogeneous boundary conditions), so does every combination c<sub>1</sub>u<sub>1</sub> + … + c<sub>n</sub>u<sub>n</sub>.",
   p:"The operator L is linear: L[c<sub>1</sub>u<sub>1</sub> + c<sub>2</sub>u<sub>2</sub>] = c<sub>1</sub>L[u<sub>1</sub>] + c<sub>2</sub>L[u<sub>2</sub>] = 0.",
   ce:"Fails for nonlinear equations: u = x/t solves u<sub>t</sub> + uu<sub>x</sub> = 0, but 2u = 2x/t gives −2x/t² + 4x/t² = 2x/t² ≠ 0. For nonhomogeneous equations, L[u<sub>1</sub>] = L[u<sub>2</sub>] = f gives L[u<sub>1</sub> + u<sub>2</sub>] = 2f, not f."},
  {n:"The three model equations",s:"By a change of variables, every constant-coefficient second-order linear PDE in two variables can be brought to one of the forms u<sub>ξη</sub> = (lower order) (hyperbolic, like the wave equation), u<sub>ξ</sub> = u<sub>ηη</sub> + … (parabolic, like heat) or u<sub>ξξ</sub> + u<sub>ηη</sub> = … (elliptic, like Laplace). The type does not depend on the coordinates you choose.",pi:1,
   p:"Like diagonalizing a quadratic form: the sign of B² − 4AC is the sign pattern of the eigenvalues of [A B/2; B/2 C], which a change of variables cannot change."},
  {n:"Different types, different physics",s:"Hyperbolic equations carry waves at finite speed and keep sharp features; parabolic equations smooth things out instantly and lose information as time goes on; elliptic equations describe equilibrium, where every point depends on the whole boundary.",pi:1,
   p:"Compare the explicit solutions in Units 4–6: d'Alembert's formula (wave), the heat kernel (heat), and the mean value property (Laplace)."},
  {n:"Ill-posed problems exist (Hadamard's example)",s:"Not every reasonable-looking problem is well posed. Laplace's equation with initial data like a time-evolution problem (Cauchy data) is not.",
   p:"u<sub>xx</sub> + u<sub>yy</sub> = 0, u(x, 0) = 0, u<sub>y</sub>(x, 0) = sin(nx)/n has the solution u = sin(nx)sinh(ny)/n².",
   ce:"As n → ∞ the data go to 0, but for any y &gt; 0 the solution grows like e<sup>ny</sup>/n² → ∞. Tiny measurement errors would create huge changes: the problem is ill-posed."}
 ],
 mist:["Calling an equation nonlinear because the coefficients depend on x (u<sub>t</sub> = x²u<sub>xx</sub> is linear).","Using B² − AC instead of B² − 4AC with the Au<sub>xx</sub> + Bu<sub>xy</sub> + Cu<sub>yy</sub> convention.","Forgetting that the type can change from region to region (Tricomi equation yu<sub>xx</sub> + u<sub>yy</sub> = 0).","Mixing up Dirichlet (value) and Neumann (derivative) conditions."],
 apps:[
  ["Physics","Heat flow, vibrations, sound, light (Maxwell), quantum mechanics (Schrödinger) and fluids (Navier–Stokes) are all PDEs."],
  ["Weather and climate","Forecasts solve PDEs for air pressure, temperature and wind on a global grid."],
  ["Finance","The Black–Scholes equation for option prices is a parabolic PDE."],
  ["AI image generation","Diffusion models are trained to reverse a noise-adding process described by a diffusion (heat-type) equation."],
  ["Biology","Reaction–diffusion equations (Alan Turing, 1952) explain zebra stripes and leopard spots. Try them on VisualPDE."]
 ],
 ways:[{q:"Classify 3u<sub>xx</sub> + 2u<sub>xy</sub> + u<sub>yy</sub> = 0.",m:[
  ["Way 1: Discriminant",["A = 3, B = 2, C = 1.","B² − 4AC = 4 − 12 = −8 &lt; 0.","Elliptic."]],
  ["Way 2: Eigenvalues of the coefficient matrix",["Matrix [A B/2; B/2 C] = [3 1; 1 1].","det = 3 − 1 = 2 &gt; 0 and trace = 4 &gt; 0, so both eigenvalues are positive.","Same sign ⇒ elliptic (opposite signs ⇒ hyperbolic, a zero eigenvalue ⇒ parabolic)."]]],
  note:"The discriminant is fastest in two variables. The eigenvalue method is how you classify PDEs in three or more variables (Linear Algebra Unit 6)."}],
 study:st("Chapter 4 introduction (PDEs, boundary value problems)","Partial Differential Equations: Introduction and terminology")
},

/* ---------------- Unit 2 ---------------- */
u2:{
 defs:[
  ["Transport (advection) equation","u<sub>t</sub> + cu<sub>x</sub> = 0: a profile moving right at speed c without changing shape.",""],
  ["Characteristic curves","Curves in the (x, t)- or (x, y)-plane along which the PDE becomes an ordinary differential equation.",""],
  ["Method of characteristics","Solve the ODEs along the characteristics, then use the initial or boundary data on each characteristic.",""],
  ["Quasilinear equation; Burgers' equation","a(x, y, u)u<sub>x</sub> + b(x, y, u)u<sub>y</sub> = c(x, y, u). Burgers': u<sub>t</sub> + uu<sub>x</sub> = 0 (the wave speed is u itself).",""],
  ["Shock","A jump in the solution that forms when characteristics cross.",""]
 ],
 thms:[
  {n:"Transport equation",s:"The solution of u<sub>t</sub> + cu<sub>x</sub> = 0, u(x, 0) = f(x) is u(x, t) = f(x − ct).",
   p:"Along a line x = x<sub>0</sub> + ct, d/dt u(x<sub>0</sub> + ct, t) = cu<sub>x</sub> + u<sub>t</sub> = 0, so u keeps its starting value f(x<sub>0</sub>) = f(x − ct). Check directly: u<sub>t</sub> = −cf′, u<sub>x</sub> = f′."},
  {n:"Linear first-order equations",s:"For a(x, y)u<sub>x</sub> + b(x, y)u<sub>y</sub> = 0, u is constant along each curve with dy/dx = b/a. So u = F(φ(x, y)), where φ = constant describes those curves, and F comes from the data.",
   p:"Along a curve (x(s), y(s)) with x′ = a, y′ = b, the chain rule gives du/ds = au<sub>x</sub> + bu<sub>y</sub> = 0."},
  {n:"Source terms",s:"For u<sub>t</sub> + cu<sub>x</sub> = g(x, t), u(x, 0) = f(x): u(x, t) = f(x − ct) + ∫<sub>0</sub><sup>t</sup> g(x − c(t − s), s) ds.",
   p:"Along a characteristic, du/dt = g; integrate g along the line from its starting point."},
  {n:"Shock formation in Burgers' equation",s:"For u<sub>t</sub> + uu<sub>x</sub> = 0, u(x, 0) = f(x), the characteristics are straight lines x = x<sub>0</sub> + f(x<sub>0</sub>)t. If f is decreasing somewhere, they cross, and a shock forms at time t* = −1/min f′(x).",pi:1,
   p:"Faster points (larger u) start behind slower ones and catch up. Two neighboring characteristics from x<sub>0</sub> and x<sub>0</sub> + h meet when h + [f(x<sub>0</sub> + h) − f(x<sub>0</sub>)]t = 0, i.e. t ≈ −1/f′(x<sub>0</sub>); the earliest meeting uses the most negative f′.",
   ce:"Unlike linear equations, perfectly smooth starting data can produce a discontinuity in finite time. After the shock, the PDE must be replaced by its conservation law (weak solutions)."}
 ],
 mist:["Getting the direction wrong: f(x − ct) moves right for c &gt; 0.","Solving dy/dx = a/b instead of b/a.","Forgetting that for nonlinear equations the characteristic speed depends on u.","Expecting a smooth solution forever in nonlinear problems."],
 apps:[
  ["Traffic flow","In the Lighthill–Whitham–Richards model, car density obeys a conservation law. Traffic jams that appear “from nowhere” are shocks."],
  ["Pollution in a river","A spill drifts downstream according to the transport equation (plus diffusion)."],
  ["Gas dynamics","Shock waves from jets (sonic booms) and explosions are shocks of nonlinear conservation laws."],
  ["Computer animation","Smoke and fluid effects in movies move quantities along characteristics (“semi-Lagrangian advection”)."]
 ],
 ways:[{q:"Solve u<sub>t</sub> + 2u<sub>x</sub> = 0 with u(x, 0) = e<sup>−x²</sup>.",m:[
  ["Way 1: Characteristics",["Characteristics: x − 2t = constant.","u is constant along each one, so u(x, t) = u(x − 2t, 0).","u = e<sup>−(x − 2t)²</sup>: the bump moves right at speed 2."]],
  ["Way 2: Change of variables",["Let ξ = x − 2t, τ = t.","Chain rule: u<sub>t</sub> = −2u<sub>ξ</sub> + u<sub>τ</sub> and u<sub>x</sub> = u<sub>ξ</sub>, so the PDE becomes u<sub>τ</sub> = 0.","So u = F(ξ) = F(x − 2t), and t = 0 gives F = e<sup>−x²</sup>."]]],
  note:"Characteristics give a picture of how information travels. The change of variables is the same idea written algebraically, and it is the method used to reduce second-order equations to their simplest forms."}],
 study:st("Chapter 4 (introduction to PDEs)","Partial Differential Equations: Terminology",[{k:"watch",l:2,t:"MIT 18.303 lecture notes on characteristics",by:"MIT OpenCourseWare",u:OCW}])
},

/* ---------------- Unit 3 ---------------- */
u3:{
 defs:[
  ["Periodic function","f(x + P) = f(x) for all x; P is a period.",""],
  ["Fourier series","On [−L, L]: f(x) ~ a<sub>0</sub>/2 + Σ<sub>n≥1</sub> [a<sub>n</sub>cos(nπx/L) + b<sub>n</sub>sin(nπx/L)], with a<sub>n</sub> = (1/L)∫<sub>−L</sub><sup>L</sup> f(x)cos(nπx/L)dx and b<sub>n</sub> = (1/L)∫<sub>−L</sub><sup>L</sup> f(x)sin(nπx/L)dx.",""],
  ["Sine and cosine series","For f on [0, L]: the odd extension gives a sine series, b<sub>n</sub> = (2/L)∫<sub>0</sub><sup>L</sup> f sin(nπx/L)dx; the even extension gives a cosine series.",""],
  ["Inner product; orthogonal functions","⟨f, g⟩ = ∫<sub>a</sub><sup>b</sup> f(x)g(x)dx. f and g are orthogonal if ⟨f, g⟩ = 0, just like perpendicular vectors.",""],
  ["Piecewise smooth","f and f′ are continuous except at finitely many jumps.",""],
  ["Gibbs phenomenon","Near a jump, partial sums overshoot by about 9% of the jump size, however many terms you take.",""],
  ["Sturm–Liouville problem","(p(x)y′)′ + (λw(x) − q(x))y = 0 on [a, b] with boundary conditions. Values of λ with nonzero solutions are eigenvalues; the solutions are eigenfunctions.","y″ + λy = 0, y(0) = y(L) = 0: λ<sub>n</sub> = (nπ/L)², y<sub>n</sub> = sin(nπx/L)."]
 ],
 thms:[
  {n:"Orthogonality of sines and cosines",s:"On [−L, L], for positive integers m ≠ n: ∫sin(mπx/L)sin(nπx/L)dx = 0, ∫cos(mπx/L)cos(nπx/L)dx = 0, and ∫sin(mπx/L)cos(nπx/L)dx = 0 for all m, n. When m = n ≥ 1, the first two equal L.",
   p:"Use product-to-sum: sin A sin B = ½[cos(A − B) − cos(A + B)]. Each cosine of a nonzero multiple of πx/L integrates to 0 over a full period. sin·cos is odd, so it integrates to 0 over a symmetric interval."},
  {n:"Coefficient formulas",s:"If f equals its Fourier series and the series can be integrated term by term, the coefficients must be a<sub>n</sub>, b<sub>n</sub> as defined.",
   p:"Multiply both sides by sin(mπx/L) and integrate over [−L, L]. By orthogonality every term vanishes except b<sub>m</sub>·L. (Exactly like finding coordinates in an orthogonal basis: Linear Algebra Unit 7.)"},
  {n:"Dirichlet's convergence theorem",s:"If f is 2L-periodic and piecewise smooth, its Fourier series converges at every x to ½[f(x⁺) + f(x⁻)]: to f(x) where f is continuous, and to the midpoint of the jump where it jumps.",pi:1,
   p:"Write the N-th partial sum as an integral of f against the Dirichlet kernel and use the Riemann–Lebesgue lemma (Fourier coefficients of an integrable function tend to 0).",
   ce:"Continuity alone is not enough: there are continuous functions whose Fourier series diverge at a point (du Bois-Reymond, 1873). And near jumps the convergence is not uniform (Gibbs)."},
  {n:"Even and odd functions",s:"If f is even, all b<sub>n</sub> = 0 (cosine series). If f is odd, all a<sub>n</sub> = 0 (sine series).",p:"f·sin is odd when f is even, and f·cos is odd when f is odd; odd functions integrate to 0 over [−L, L]."},
  {n:"Parseval's identity",s:"(1/L)∫<sub>−L</sub><sup>L</sup> f² dx = a<sub>0</sub>²/2 + Σ(a<sub>n</sub>² + b<sub>n</sub>²): the energy of a signal equals the sum of the energies of its frequencies.",pi:1,
   p:"Square the series and integrate; orthogonality kills all the cross terms (the Pythagorean theorem in infinitely many dimensions).",
   ce:"A surprise application: for f(x) = x on [−π, π], b<sub>n</sub> = 2(−1)<sup>n+1</sup>/n and (1/π)∫x² dx = 2π²/3. So Σ 4/n² = 2π²/3, i.e. 1 + 1/4 + 1/9 + … = π²/6 (the Basel problem, solved by Euler)."},
  {n:"Smoothness and decay",s:"The smoother f is (as a periodic function), the faster its coefficients go to 0: a jump gives coefficients of size about 1/n, a corner about 1/n², and a smooth function faster than any power of 1/n.",pi:1,
   p:"Integrate by parts in the coefficient formula: each derivative that is continuous across the period moves a factor 1/n out."},
  {n:"Sturm–Liouville theory",s:"For a regular Sturm–Liouville problem (p, w &gt; 0): the eigenvalues are real and can be listed λ<sub>1</sub> &lt; λ<sub>2</sub> &lt; … → ∞; eigenfunctions for different eigenvalues are orthogonal with weight w (∫y<sub>m</sub>y<sub>n</sub>w dx = 0); and every reasonable function can be expanded in the eigenfunctions. Fourier series are the simplest case.",pi:1,
   p:"Orthogonality: multiply the equation for y<sub>m</sub> by y<sub>n</sub> and vice versa, subtract and integrate by parts; the boundary terms vanish, leaving (λ<sub>m</sub> − λ<sub>n</sub>)∫y<sub>m</sub>y<sub>n</sub>w dx = 0. This is the function version of the Spectral Theorem for symmetric matrices."}
 ],
 mist:["Forgetting the ½ in a<sub>0</sub>/2 (or using it with a different a<sub>0</sub> formula).","Using (1/L) instead of (2/L) for half-range sine or cosine series.","Claiming the series equals f at a jump (it gives the midpoint).","Integrating over half a period when the formula needs a full period."],
 apps:[
  ["Music and sound","A note is a fundamental frequency plus harmonics; the coefficients are the instrument's “color” (timbre). Synthesizers add sines."],
  ["Compression","MP3 and JPEG store the important frequency coefficients and drop the tiny ones (a cosine-transform cousin of Fourier series)."],
  ["Solving PDEs","Fourier series are the tool that solves the heat, wave and Laplace equations in Units 4–6."],
  ["Signal processing","Filters in phones and noise-canceling headphones remove unwanted frequencies."],
  ["Pure math","Parseval gives exact values like Σ1/n² = π²/6."]
 ],
 ways:[{q:"Find the Fourier series of f(x) = x on (−π, π).",m:[
  ["Way 1: Real form, integration by parts",["f is odd, so all a<sub>n</sub> = 0.","b<sub>n</sub> = (1/π)∫<sub>−π</sub><sup>π</sup> x sin(nx)dx = (2/π)[−x cos(nx)/n]<sub>0</sub><sup>π</sup> + 0 = 2(−1)<sup>n+1</sup>/n.","x = 2(sin x − sin 2x/2 + sin 3x/3 − …)."]],
  ["Way 2: Complex exponentials",["c<sub>n</sub> = (1/2π)∫<sub>−π</sub><sup>π</sup> x e<sup>−inx</sup>dx = i(−1)<sup>n</sup>/n for n ≠ 0, and c<sub>0</sub> = 0.","b<sub>n</sub> = i(c<sub>n</sub> − c<sub>−n</sub>) = i·2i(−1)<sup>n</sup>/n = 2(−1)<sup>n+1</sup>/n ✓.","Same series."]]],
  note:"The real form is natural for sines and cosines in physics. The complex form is shorter algebra, handles sines and cosines at once, and is the form used in electrical engineering and the Fourier transform."}],
 study:st("Chapter 4 (trigonometric, sine and cosine series) and Chapter 5 (Sturm–Liouville eigenvalue problems)","Boundary Value Problems & Fourier Series",[{k:"play",l:1,t:"Jez Swanson: Interactive Fourier",by:"Draw a shape and watch the series rebuild it",u:"https://www.jezzamon.com/fourier/"}])
},

/* ---------------- Unit 4 ---------------- */
u4:{
 defs:[
  ["Heat (diffusion) equation","u<sub>t</sub> = ku<sub>xx</sub>: u is temperature (or concentration), k &gt; 0 the diffusivity.",""],
  ["Steady state","A solution that doesn't change in time: u<sub>t</sub> = 0, so u<sub>xx</sub> = 0 and u is linear in x.",""],
  ["Separation of variables","Look for u = X(x)T(t). The PDE splits into X″ + λX = 0 and T′ = −kλT.",""],
  ["Heat kernel","Φ(x, t) = e<sup>−x²/(4kt)</sup>/√(4πkt): the temperature from a unit burst of heat at x = 0 (a Normal curve with variance 2kt).",""],
  ["Fourier transform","f̂(ω) = ∫<sub>−∞</sub><sup>∞</sup> f(x)e<sup>−iωx</sup>dx: the “Fourier series” of a non-periodic function on the whole line.",""],
  ["Finite-difference method","Replace derivatives by differences on a grid: u<sub>j</sub><sup>n+1</sup> = u<sub>j</sub><sup>n</sup> + r(u<sub>j+1</sub><sup>n</sup> − 2u<sub>j</sub><sup>n</sup> + u<sub>j−1</sub><sup>n</sup>), r = kΔt/Δx².",""]
 ],
 thms:[
  {n:"Solution with fixed ends (Dirichlet)",s:"u<sub>t</sub> = ku<sub>xx</sub>, u(0, t) = u(L, t) = 0, u(x, 0) = f(x) has solution u = Σ b<sub>n</sub> e<sup>−k(nπ/L)²t</sup> sin(nπx/L), with b<sub>n</sub> the Fourier sine coefficients of f.",
   p:"X″ + λX = 0 with X(0) = X(L) = 0 has nonzero solutions only for λ<sub>n</sub> = (nπ/L)², X<sub>n</sub> = sin(nπx/L). Then T<sub>n</sub> = e<sup>−kλ<sub>n</sub>t</sup>. Superpose and match t = 0 with the sine series of f."},
  {n:"Insulated ends (Neumann)",s:"With u<sub>x</sub>(0, t) = u<sub>x</sub>(L, t) = 0, the solution uses the cosine series: u = a<sub>0</sub>/2 + Σ a<sub>n</sub>e<sup>−k(nπ/L)²t</sup>cos(nπx/L). As t → ∞, u → a<sub>0</sub>/2 = the average initial temperature.",
   p:"Same separation with X′(0) = X′(L) = 0 gives cosines and λ<sub>0</sub> = 0. All other terms decay. Total heat ∫u dx stays constant because no heat escapes."},
  {n:"Maximum principle",s:"On [0, L] × [0, T], a solution of the heat equation takes its maximum and minimum either at t = 0 or at x = 0 or x = L. Heat never creates a new hot spot inside.",pi:1,
   p:"At an interior maximum, u<sub>t</sub> ≥ 0 and u<sub>xx</sub> ≤ 0. To make this a contradiction, apply the argument to v = u + εx² (which satisfies v<sub>t</sub> − kv<sub>xx</sub> &lt; 0) and let ε → 0."},
  {n:"Uniqueness (energy method)",s:"The problem with given initial and boundary values has at most one solution.",
   p:"Let w be the difference of two solutions, so w = 0 at t = 0 and at both ends. E(t) = ∫w² dx satisfies E′ = 2k∫ww<sub>xx</sub> dx = −2k∫w<sub>x</sub>² dx ≤ 0 (integrate by parts). E(0) = 0 and E ≥ 0, so E = 0 always, so w = 0."},
  {n:"Heat on an infinite rod",s:"u(x, t) = ∫<sub>−∞</sub><sup>∞</sup> Φ(x − y, t)f(y)dy (a convolution with the heat kernel). It follows from the Fourier transform, which turns u<sub>t</sub> = ku<sub>xx</sub> into û<sub>t</sub> = −kω²û, so û = f̂(ω)e<sup>−kω²t</sup>.",pi:1,
   p:"Differentiating under the integral shows Φ solves the heat equation, and Φ concentrates at y = x as t → 0, so u → f. In the Fourier picture, each frequency ω simply decays like e<sup>−kω²t</sup>; high frequencies (sharp details) die fastest, which is why heat smooths.",
   ce:"Heat travels at infinite speed: even if f is zero outside [0, 1], u(x, t) &gt; 0 for every x as soon as t &gt; 0 (unlike waves, Unit 5)."},
  {n:"The backward heat equation is ill-posed",s:"You cannot reliably run diffusion backward in time.",
   p:"Backward in time, the n-th mode grows like e<sup>+k(nπ/L)²t</sup>.",
   ce:"Initial data with a tiny high-frequency error ε sin(nπx/L) produce an error εe<sup>k(nπ/L)²t</sup>, which is enormous for large n. That is why unblurring a photo is hard (and why AI “diffusion models” must learn to do it)."},
  {n:"Stability of the explicit finite-difference scheme",s:"The explicit scheme is stable (errors don't grow) exactly when r = kΔt/Δx² ≤ ½.",pi:1,
   p:"Plug in a grid wave u<sub>j</sub><sup>n</sup> = G<sup>n</sup>e<sup>ijθ</sup> (von Neumann analysis): G = 1 − 4r sin²(θ/2). |G| ≤ 1 for all θ exactly when r ≤ ½.",
   ce:"With r = 0.6, the highest-frequency mode is multiplied by 1 − 2.4 = −1.4 each step and the computed solution explodes with alternating signs, even though the true solution decays."}
 ],
 mist:["Using cosines for fixed (Dirichlet) ends or sines for insulated (Neumann) ends.","Forgetting the k and the square in e<sup>−k(nπ/L)²t</sup>.","Not subtracting the steady state first when the boundary values are nonzero constants.","Choosing too large a time step in a computer simulation."],
 apps:[
  ["Engineering","Cooling of engines, chips and buildings; how long until the inside of a turkey is cooked (time grows like thickness²)."],
  ["Medicine and biology","Diffusion of drugs, oxygen and chemicals in tissue."],
  ["Finance","The Black–Scholes equation for option prices turns into the heat equation after a change of variables."],
  ["Image processing","A Gaussian blur is running the heat equation on the picture; reversing it sharpens."],
  ["AI image generation","Diffusion models add noise step by step (a diffusion process) and learn to reverse it to create images."]
 ],
 ways:[{q:"Solve u<sub>t</sub> = u<sub>xx</sub> on (0, π), u(0, t) = u(π, t) = 0, u(x, 0) = 3 sin x + sin 3x.",m:[
  ["Way 1: General formula",["u = Σ b<sub>n</sub>e<sup>−n²t</sup>sin(nx).","The initial data already is a sine series: b<sub>1</sub> = 3, b<sub>3</sub> = 1, all others 0.","u = 3e<sup>−t</sup>sin x + e<sup>−9t</sup>sin 3x."]],
  ["Way 2: Guess the form and solve ODEs",["Try u = A(t)sin x + B(t)sin 3x.","Plug in: A′ = −A, B′ = −9B, with A(0) = 3, B(0) = 1.","A = 3e<sup>−t</sup>, B = e<sup>−9t</sup> ✓."]]],
  note:"When the initial data is a finite sum of eigenfunctions, Way 2 is quick and shows why each mode decays on its own. For general data you need the sine coefficients (Way 1). Notice the sin 3x part dies 9 times faster: heat erases fine detail first."}],
 study:st("Chapter 4, the heat equation","Partial Differential Equations: The Heat Equation; Solving the Heat Equation",[{k:"play",l:1,t:"VisualPDE: heat equation",by:"Paint heat onto a plate and watch it spread",u:VPDE}])
},

/* ---------------- Unit 5 ---------------- */
u5:{
 defs:[
  ["Wave equation","u<sub>tt</sub> = c²u<sub>xx</sub>: u is displacement, c the wave speed (for a string, c = √(tension/density)).",""],
  ["Initial conditions","Displacement u(x, 0) = f(x) and velocity u<sub>t</sub>(x, 0) = g(x).",""],
  ["Normal modes; frequencies","Standing waves sin(nπx/L)cos(nπct/L) of a fixed string; the n-th mode vibrates at frequency nc/(2L).",""],
  ["Domain of dependence","The interval [x − ct, x + ct] of initial data that can affect u(x, t).",""],
  ["Energy","E(t) = ½∫(u<sub>t</sub>² + c²u<sub>x</sub>²)dx: kinetic plus potential energy.",""],
  ["Bessel functions","Solutions J<sub>m</sub> of r²R″ + rR′ + (r² − m²)R = 0. They describe vibrations of a round drum, as sines describe a string.",""]
 ],
 thms:[
  {n:"d'Alembert's formula",s:"On the whole line: u(x, t) = ½[f(x − ct) + f(x + ct)] + (1/(2c))∫<sub>x−ct</sub><sup>x+ct</sup> g(s)ds.",
   p:"With ξ = x − ct and η = x + ct the equation becomes u<sub>ξη</sub> = 0, so u = F(x − ct) + G(x + ct): a wave moving right plus a wave moving left. Matching u(x, 0) = f and u<sub>t</sub>(x, 0) = g determines F and G."},
  {n:"Finite speed of propagation",s:"u(x, t) depends only on the initial data in [x − ct, x + ct]. A disturbance travels at speed exactly c.",
   p:"Read it off d'Alembert's formula.",
   ce:"Contrast with heat (Unit 4), where a change anywhere is felt everywhere instantly."},
  {n:"Fixed string: normal modes",s:"With u(0, t) = u(L, t) = 0: u = Σ [a<sub>n</sub>cos(nπct/L) + b<sub>n</sub>sin(nπct/L)]sin(nπx/L), where a<sub>n</sub> are the sine coefficients of f and (nπc/L)b<sub>n</sub> those of g.",
   p:"Separation of variables: X<sub>n</sub> = sin(nπx/L) as for heat, but now T″ = −c²λT gives oscillations instead of decay. Match u and u<sub>t</sub> at t = 0."},
  {n:"Harmonics",s:"A string's frequencies are whole-number multiples of the lowest one, c/(2L). That is why strings sound “musical”, and why the pitch rises with tension and falls with length (Mersenne's laws).",
   p:"Frequency of mode n = (nπc/L)/(2π) = nc/(2L)."},
  {n:"Conservation of energy",s:"For a string with fixed (or free) ends, E(t) is constant. Consequently the solution is unique.",
   p:"E′ = ∫(u<sub>t</sub>u<sub>tt</sub> + c²u<sub>x</sub>u<sub>xt</sub>)dx = c²∫(u<sub>t</sub>u<sub>xx</sub> + u<sub>x</sub>u<sub>xt</sub>)dx = c²[u<sub>x</sub>u<sub>t</sub>]<sub>0</sub><sup>L</sup> = 0. The difference of two solutions starts with zero energy, so it stays 0."},
  {n:"Round drums (Bessel functions)",s:"The modes of a circular membrane of radius a are J<sub>m</sub>(α<sub>mn</sub>r/a)cos(mθ) (and sin), where α<sub>mn</sub> are the zeros of J<sub>m</sub>. The frequencies are proportional to the α<sub>mn</sub>: 2.405, 3.832, 5.136, 5.520, …, which are not whole-number multiples of each other.",pi:1,
   p:"Separate u = R(r)Θ(θ)T(t) in polar coordinates; Θ gives cos(mθ), and R satisfies Bessel's equation. The edge condition R(a) = 0 picks out the zeros.",
   ce:"That's why a drum has a less definite pitch than a guitar string: its overtones are not harmonics."}
 ],
 mist:["Using one initial condition (the wave equation needs both u and u<sub>t</sub>).","Forgetting the factor nπc/L when matching the initial velocity.","Mixing up the d'Alembert signs (f(x − ct) moves right).","Expecting the solution to decay like heat (waves keep their energy)."],
 apps:[
  ["Music","Guitar, violin and piano strings, organ pipes and drums are all wave equations; their modes are the notes and overtones."],
  ["Earthquakes","Seismic waves travel at finite speed; their arrival times locate the earthquake."],
  ["Light and radio","Maxwell's equations imply the wave equation with c = speed of light: radio, Wi-Fi and light are waves."],
  ["Medical ultrasound and sonar","Echo times of sound waves create images of the body or the sea floor."],
  ["Noise-canceling headphones","Play a wave with the opposite sign so the two add to zero (superposition)."]
 ],
 ways:[{q:"A string of length π with c = 1 and fixed ends starts at rest with u(x, 0) = sin x. Find u.",m:[
  ["Way 1: Normal modes",["Only the n = 1 mode is present: a<sub>1</sub> = 1, all b<sub>n</sub> = 0 (starts at rest).","u = cos(t)·sin(x).","It is a standing wave that swings with period 2π."]],
  ["Way 2: d'Alembert",["Extend sin x as an odd 2π-periodic function (it already is).","u = ½[sin(x − t) + sin(x + t)] (g = 0).","= sin x cos t by the sum-to-product formula ✓."]]],
  note:"Normal modes are natural for finite strings and show the frequencies. d'Alembert shows the traveling waves: a standing wave is two traveling waves moving in opposite directions."}],
 study:st("Chapter 4, the wave equation (and D'Alembert's solution)","Partial Differential Equations: Vibrating String",[{k:"play",l:1,t:"VisualPDE: wave equation",by:"Pluck a string or tap a membrane",u:VPDE}])
},

/* ---------------- Unit 6 ---------------- */
u6:{
 defs:[
  ["Laplace's equation; harmonic function","∇²u = u<sub>xx</sub> + u<sub>yy</sub> = 0. Its solutions are harmonic functions.","x² − y², e<sup>x</sup>cos y and ln(x² + y²) are harmonic."],
  ["Poisson's equation","∇²u = f (Laplace's equation with a source).",""],
  ["Dirichlet and Neumann problems","Find u harmonic in a region with u given on the boundary (Dirichlet) or ∂u/∂n given (Neumann).",""],
  ["Laplacian in polar coordinates","∇²u = u<sub>rr</sub> + u<sub>r</sub>/r + u<sub>θθ</sub>/r².",""],
  ["Steady state","Laplace's equation is the heat or wave equation with no time change: equilibrium.",""]
 ],
 thms:[
  {n:"Mean value property",s:"If u is harmonic in a region containing a disk, then u at the center equals the average of u on the boundary circle.",pi:1,
   p:"Let M(r) be the average over the circle of radius r. Then M′(r) = (1/2πr)∮∂u/∂n ds = (1/2πr)∬∇²u dA = 0 by the Divergence Theorem (Multivariable Unit 6). So M is constant and M(0) = u(center)."},
  {n:"Maximum principle",s:"A harmonic function on a bounded region that is not constant takes its maximum and minimum only on the boundary.",
   p:"If the maximum were at an interior point, the mean value property would force u to equal that maximum on every small circle around it, and spreading this out, everywhere: u would be constant."},
  {n:"Uniqueness for the Dirichlet problem",s:"∇²u = f in a bounded region with u = g on the boundary has at most one solution.",
   p:"The difference w of two solutions is harmonic and 0 on the boundary. Its max and min are on the boundary, so both are 0, so w = 0.",
   ce:"For the Neumann problem, uniqueness holds only up to a constant (u + 5 has the same normal derivatives), and a solution exists only if ∮∂u/∂n ds = ∬f dA (no net heat flow in a steady state)."},
  {n:"Rectangle: separation of variables",s:"On 0 &lt; x &lt; a, 0 &lt; y &lt; b with u = 0 on three sides and u(x, b) = f(x): u = Σ c<sub>n</sub> sin(nπx/a) sinh(nπy/a), with c<sub>n</sub>sinh(nπb/a) equal to the sine coefficients of f.",
   p:"X″ + λX = 0 with X(0) = X(a) = 0 gives sines; then Y″ = (nπ/a)²Y with Y(0) = 0 gives sinh. For data on several sides, solve one side at a time and add (superposition)."},
  {n:"Disk: polar series and Poisson's formula",s:"Inside the disk r &lt; a with u(a, θ) = f(θ): u = a<sub>0</sub>/2 + Σ (r/a)<sup>n</sup>(a<sub>n</sub>cos nθ + b<sub>n</sub>sin nθ), where a<sub>n</sub>, b<sub>n</sub> are the Fourier coefficients of f.",pi:1,
   p:"Separate u = R(r)Θ(θ): Θ must be 2π-periodic, so Θ = cos nθ, sin nθ, and R = r<sup>n</sup> (the r<sup>−n</sup> and ln r solutions blow up at the center). Summing the series gives Poisson's integral formula."},
  {n:"Connection to complex numbers",s:"The real and imaginary parts of a complex-differentiable function are harmonic. For example (x + iy)² = x² − y² + 2ixy, so x² − y² and 2xy are harmonic.",pi:1,
   p:"The Cauchy–Riemann equations u<sub>x</sub> = v<sub>y</sub>, u<sub>y</sub> = −v<sub>x</sub> give u<sub>xx</sub> + u<sub>yy</sub> = v<sub>yx</sub> − v<sub>xy</sub> = 0 (Clairaut)."}
 ],
 mist:["Using sin(nπy/b) in the direction where the boundary data is nonzero (that direction needs sinh or cosh).","Keeping r<sup>−n</sup> terms inside a disk (they blow up at r = 0).","Forgetting to split a problem with several nonzero sides into simpler problems.","Expecting a Neumann problem to have a unique solution."],
 apps:[
  ["Steady temperature","The temperature in a plate after a long time, with fixed edge temperatures."],
  ["Electrostatics and gravity","Electric potential in empty space and gravitational potential outside masses satisfy Laplace's equation."],
  ["Fluid flow","Smooth (ideal) flow around wings and obstacles has a harmonic velocity potential."],
  ["Computer graphics and images","Filling missing parts of a picture (inpainting) and smoothly deforming 3D models solve Laplace's equation."],
  ["Soap films","For small slopes, a soap film stretched on a wire frame is a harmonic function: it can have no bumps in the middle (maximum principle)."]
 ],
 ways:[{q:"Solve ∇²u = 0 inside the unit disk with u(1, θ) = cos 2θ.",m:[
  ["Way 1: Polar series",["The boundary data is already a Fourier series: a<sub>2</sub> = 1, everything else 0.","Each term gets the factor r<sup>n</sup>.","u = r² cos 2θ."]],
  ["Way 2: Guess a harmonic polynomial",["cos 2θ = cos²θ − sin²θ, so on r = 1 the data is x² − y².","x² − y² is harmonic (2 − 2 = 0) and matches on the boundary.","By uniqueness u = x² − y² = r² cos 2θ ✓."]]],
  note:"The series method always works on a disk. Guessing a known harmonic function is faster when it works, and the uniqueness theorem guarantees that a correct guess is THE answer."}],
 study:st("Chapter 4, Laplace's equation (and the Dirichlet problem)","Partial Differential Equations: Laplace's Equation; Heat Equation with non-zero temperature boundaries",[{k:"play",l:1,t:"VisualPDE: Laplace and Poisson",by:"Set boundary values and see the equilibrium",u:VPDE}])
}
};
})();
