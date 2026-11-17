/* Z-Multivariable Calculus: Theory and Uses & resources. Read by zbook.js. */
(function(){
const OCW="https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/";
const OS="https://openstax.org/details/books/calculus-volume-3";
const PAUL="https://tutorial.math.lamar.edu/Classes/CalcIII/CalcIII.aspx";
const st=(mit,os,paul)=>[
 {k:"watch",l:1,t:"MIT 18.02SC Multivariable Calculus: "+mit,by:"MIT OpenCourseWare: lecture videos, recitations, problems and exams with solutions",u:OCW},
 {k:"free",l:1,t:"OpenStax Calculus Volume 3: "+os,by:"Free textbook with worked examples and answers",u:OS},
 {k:"free",l:1,t:"Paul's Online Math Notes, Calculus III: "+paul,by:"Notes, examples and practice problems with full solutions",u:PAUL}];

window.ZT={
_course:[
 {k:"watch",l:1,t:"MIT 18.02SC Multivariable Calculus",by:"MIT OpenCourseWare (Denis Auroux)",u:OCW,d:"Full lecture videos, recitation videos with worked problems, problem sets and exams with solutions."},
 {k:"free",l:1,t:"OpenStax Calculus Volume 3",by:"Free textbook",u:OS,d:"Vectors, partial derivatives, multiple integrals and vector calculus, with many worked examples."},
 {k:"free",l:1,t:"Paul's Online Math Notes: Calculus III",by:"Paul Dawkins, Lamar University",u:PAUL,d:"Very clear notes and practice problems with complete solutions."},
 {k:"watch",l:1,t:"Multivariable calculus",by:"Khan Academy (videos by Grant Sanderson of 3Blue1Brown)",u:"https://www.khanacademy.org/math/multivariable-calculus",d:"Intuitive videos on gradients, multiple integrals, Green's, Stokes' and divergence theorems."},
 {k:"free",l:2,t:"Active Calculus Multivariable",by:"Steve Schlicker et al.",u:"https://activecalculus.org/multi/",d:"Free, activity-driven textbook: learn by working through guided problems."},
 {k:"play",l:1,t:"GeoGebra 3D Calculator",u:"https://www.geogebra.org/3d",d:"Graph surfaces, curves, planes and vectors in 3D, free, in the browser."},
 {k:"free",l:3,t:"CLP Calculus (Vol. 3 and 4)",by:"Feldman, Rechnitzer & Yeager, University of British Columbia",u:"https://personal.math.ubc.ca/~CLP/",d:"Free, rigorous texts with full solutions; Vol. 4 is vector calculus."},
 {k:"book",l:2,free:false,t:"Div, Grad, Curl, and All That",by:"H. M. Schey (W. W. Norton)",d:"A short, famous informal book that explains vector calculus through electricity and magnetism."},
 {k:"read",l:1,t:"Z-Frontiers: where multivariable calculus leads",by:"this website",u:"../frontiers/#from-multivariable-calculus",d:"Machine learning (gradients), graphics, optimization and physics."}
],

/* ---------------- Unit 1: Vectors and space ---------------- */
u1:{
 defs:[
  ["Vector","A quantity with length and direction, written ⟨a, b, c⟩. Its length (magnitude) is |v| = √(a² + b² + c²).",""],
  ["Dot product","u · v = u<sub>1</sub>v<sub>1</sub> + u<sub>2</sub>v<sub>2</sub> + u<sub>3</sub>v<sub>3</sub> = |u||v|cos θ, a number.",""],
  ["Cross product","u × v = ⟨u<sub>2</sub>v<sub>3</sub> − u<sub>3</sub>v<sub>2</sub>, u<sub>3</sub>v<sub>1</sub> − u<sub>1</sub>v<sub>3</sub>, u<sub>1</sub>v<sub>2</sub> − u<sub>2</sub>v<sub>1</sub>⟩, a vector perpendicular to both, with length |u||v|sin θ (right-hand rule).",""],
  ["Projection","proj<sub>v</sub>u = (u · v/|v|²)v: the shadow of u on the line of v. The scalar component is comp<sub>v</sub>u = u · v/|v|.",""],
  ["Line in space","r(t) = r<sub>0</sub> + tv: through point r<sub>0</sub> with direction v.",""],
  ["Plane","a(x − x<sub>0</sub>) + b(y − y<sub>0</sub>) + c(z − z<sub>0</sub>) = 0: through (x<sub>0</sub>, y<sub>0</sub>, z<sub>0</sub>) with normal vector n = ⟨a, b, c⟩.",""],
  ["Quadric surface","The graph of a second-degree equation in x, y, z: ellipsoids, paraboloids, hyperboloids, cones, cylinders.",""]
 ],
 thms:[
  {n:"Angle formula",s:"u · v = |u||v|cos θ, where θ is the angle between u and v. So u ⊥ v ⇔ u · v = 0.",
   p:"Law of Cosines on the triangle with sides u, v, u − v: |u − v|² = |u|² + |v|² − 2|u||v|cos θ. Expanding the left side with dot products gives |u|² + |v|² − 2u · v. Compare."},
  {n:"Cross product facts",s:"u × v is perpendicular to u and v; |u × v| = |u||v|sin θ = area of the parallelogram spanned by u and v; u × v = −(v × u); u × v = 0 ⇔ u and v are parallel.",
   p:"Compute u · (u × v): the terms cancel in pairs, so it is 0 (same for v). For the length, |u × v|² = |u|²|v|² − (u · v)² (Lagrange's identity) = |u|²|v|²(1 − cos²θ).",
   ce:"The cross product is not associative: i × (i × j) = i × k = −j, but (i × i) × j = 0 × j = 0. It also exists only in 3D (and 7D)."},
  {n:"Triple product = volume",s:"|u · (v × w)| is the volume of the parallelepiped spanned by u, v, w, and it equals |det[u v w]|. It is 0 exactly when the three vectors lie in one plane.",
   p:"|v × w| is the area of the base; |u · (v × w)|/|v × w| = |comp<sub>v×w</sub>u| is the height. Multiplying gives the volume. Writing the dot product out gives the 3 × 3 determinant."},
  {n:"Distance from a point to a plane",s:"The distance from P = (x<sub>1</sub>, y<sub>1</sub>, z<sub>1</sub>) to the plane ax + by + cz + d = 0 is |ax<sub>1</sub> + by<sub>1</sub> + cz<sub>1</sub> + d| / √(a² + b² + c²).",
   p:"Pick any point Q on the plane. The distance is the length of the projection of QP onto the normal n = ⟨a, b, c⟩: |QP · n|/|n|, which simplifies to the formula."}
 ],
 mist:["Thinking u · v is a vector or u × v is a number.","Getting the cross-product order wrong (u × v = −v × u).","Using the direction vector of a line as the normal of a plane.","Forgetting the absolute value in distance and volume formulas."],
 apps:[
  ["Physics","Work = F · d (dot product); torque τ = r × F and magnetic force F = qv × B (cross products)."],
  ["3D graphics and games","Normals from cross products decide lighting (brightness ∝ n · light direction) and which faces are visible."],
  ["Robotics and navigation","Projections and planes give distances to walls; cross products give rotation axes."],
  ["Machine learning","Cosine similarity u · v/(|u||v|) measures how alike two documents or images are."]
 ],
 ways:[{q:"Find the plane through P(1, 0, 0), Q(0, 2, 0), R(0, 0, 3).",m:[
  ["Way 1: Cross product for the normal",["PQ = ⟨−1, 2, 0⟩, PR = ⟨−1, 0, 3⟩.","n = PQ × PR = ⟨6, 3, 2⟩.","6(x − 1) + 3y + 2z = 0, i.e. 6x + 3y + 2z = 6."]],
  ["Way 2: Intercept form",["The intercepts are x = 1, y = 2, z = 3.","Intercept form: x/1 + y/2 + z/3 = 1.","Multiply by 6: 6x + 3y + 2z = 6 ✓."]]],
  note:"The cross-product method works for any three points. Intercept form is a shortcut that only works when the points are on the three axes."}],
 study:st("Part A, Vectors and Matrices (dot and cross products, lines and planes)","Chapter 2, Vectors in Space","Three Dimensional Space")
},

/* ---------------- Unit 2: Vector functions ---------------- */
u2:{
 defs:[
  ["Vector function / space curve","r(t) = ⟨x(t), y(t), z(t)⟩; as t changes, the tip of r traces a curve.",""],
  ["Velocity, speed, acceleration","v(t) = r′(t), speed = |r′(t)|, a(t) = r″(t).",""],
  ["Arc length","L = ∫<sub>a</sub><sup>b</sup> |r′(t)| dt.",""],
  ["Unit tangent vector","T = r′/|r′|.",""],
  ["Curvature","κ = |dT/ds| = |r′ × r″|/|r′|³: how sharply the curve bends. A circle of radius R has κ = 1/R.",""],
  ["Principal normal and binormal (TNB frame)","N = T′/|T′| points toward the inside of the bend; B = T × N is perpendicular to both. T, N, B form a moving set of axes along the curve.",""],
  ["Tangential and normal acceleration","a = a<sub>T</sub>T + a<sub>N</sub>N with a<sub>T</sub> = d(speed)/dt and a<sub>N</sub> = κ·speed².",""]
 ],
 thms:[
  {n:"Derivative rules",s:"(u · v)′ = u′ · v + u · v′ and (u × v)′ = u′ × v + u × v′ (keep the order).",p:"Write each product in components and apply the ordinary product rule to each term."},
  {n:"Constant length ⇒ perpendicular derivative",s:"If |r(t)| is constant, then r′(t) ⊥ r(t). In particular T′ ⊥ T, which is why N is perpendicular to T.",
   p:"r · r = c. Differentiate: 2r · r′ = 0.",
   ce:"Constant speed is needed for the analogous fact about acceleration: if |v| is constant then a ⊥ v (uniform circular motion). On a curve where you speed up, a has a component along v."},
  {n:"Arc length does not depend on the parametrization",s:"The length of a curve is the same for every one-to-one parametrization.",p:"If t = g(u) with g′ &gt; 0, the chain rule gives |dr/du| = |dr/dt|·g′(u), and substitution turns one integral into the other."},
  {n:"Curvature formula",s:"κ = |r′ × r″|/|r′|³.",pi:1,
   p:"Write r′ = sT with s = speed. Then r″ = s′T + sT′, so r′ × r″ = s²(T × T′) (since T × T = 0). |T × T′| = |T′| because T ⊥ T′, and |T′| = κs. So |r′ × r″| = κs³."},
  {n:"Acceleration decomposition",s:"a = (d speed/dt)T + κ(speed)²N. The second term is the “centripetal” part that turns you.",p:"Differentiate v = sT: a = s′T + sT′ = s′T + s(κs)N."}
 ],
 mist:["Confusing speed (a number) with velocity (a vector).","Forgetting the absolute value (length) inside the arc-length integral.","Thinking zero acceleration in the T direction means zero acceleration (you can still turn).","Using κ = |T′| with t instead of arc length s (it should be |T′(t)|/|r′(t)|)."],
 apps:[
  ["Roller coasters and roads","Engineers design curves with limited curvature so that the normal acceleration κv² feels safe."],
  ["Orbits and projectiles","Planet and satellite paths are vector functions; Kepler's laws come from r″ = −GMr/|r|³."],
  ["Animation and robotics","Camera paths and robot motions are curves whose TNB frame keeps the camera oriented smoothly."],
  ["DNA and springs","Helices r(t) = ⟨a cos t, a sin t, bt⟩ have constant curvature and twist (torsion)."]
 ],
 ways:[{q:"Find the curvature of the helix r(t) = ⟨cos t, sin t, t⟩.",m:[
  ["Way 1: Cross-product formula",["r′ = ⟨−sin t, cos t, 1⟩, r″ = ⟨−cos t, −sin t, 0⟩.","r′ × r″ = ⟨sin t, −cos t, 1⟩, length √2. |r′| = √2.","κ = √2/(√2)³ = 1/2."]],
  ["Way 2: Through T′",["T = r′/√2 = ⟨−sin t, cos t, 1⟩/√2.","T′ = ⟨−cos t, −sin t, 0⟩/√2, |T′| = 1/√2.","κ = |T′|/|r′| = (1/√2)/√2 = 1/2 ✓."]]],
  note:"The cross-product formula avoids differentiating a quotient. Going through T also gives you N for free (N = T′/|T′| = ⟨−cos t, −sin t, 0⟩)."}],
 study:st("Part A sessions on parametric equations, velocity and acceleration, arc length","Chapter 3, Vector-Valued Functions (including curvature and the TNB frame)","Calculus with Vector Functions (tangent, normal and binormal vectors; curvature)")
},

/* ---------------- Unit 3: Partial derivatives ---------------- */
u3:{
 defs:[
  ["Function of several variables; level curves","z = f(x, y). A level curve is f(x, y) = c; a contour map shows many of them.",""],
  ["Limit and continuity","lim<sub>(x,y)→(a,b)</sub> f = L if f gets close to L along every possible path. f is continuous if the limit equals f(a, b).",""],
  ["Partial derivatives","f<sub>x</sub> = ∂f/∂x: rate of change in the x-direction with y held fixed (and similarly f<sub>y</sub>).",""],
  ["Differentiable; tangent plane; linearization","f is differentiable at (a, b) if near it f ≈ L(x, y) = f(a, b) + f<sub>x</sub>(x − a) + f<sub>y</sub>(y − b), the tangent plane, with error small compared to the distance.",""],
  ["Gradient","∇f = ⟨f<sub>x</sub>, f<sub>y</sub>, f<sub>z</sub>⟩.",""],
  ["Directional derivative","D<sub>u</sub>f = ∇f · u for a unit vector u: the rate of change in the direction u.",""],
  ["Jacobian matrix","For a map F(x, y) = (u, v), the matrix of all partial derivatives [u<sub>x</sub> u<sub>y</sub>; v<sub>x</sub> v<sub>y</sub>]. It is the best linear approximation of F.",""]
 ],
 thms:[
  {n:"Limits along paths",s:"If f approaches different values along two paths into (a, b), then the limit does not exist.",
   p:"A limit L would force every path to give L.",
   ce:"Agreement along many paths is not enough: f = x²y/(x⁴ + y²) → 0 along every straight line into (0, 0), but along y = x² it equals 1/2. So the limit does not exist."},
  {n:"Clairaut's theorem",s:"If f<sub>xy</sub> and f<sub>yx</sub> are continuous near a point, then f<sub>xy</sub> = f<sub>yx</sub> there.",pi:1,
   p:"Both equal the limit of [f(a + h, b + k) − f(a + h, b) − f(a, b + k) + f(a, b)]/(hk), using the Mean Value Theorem twice in each order.",
   ce:"Without continuity it can fail: f = xy(x² − y²)/(x² + y²) (with f(0, 0) = 0) has f<sub>xy</sub>(0, 0) = −1 but f<sub>yx</sub>(0, 0) = 1."},
  {n:"Partial derivatives exist ≠ differentiable",s:"If f<sub>x</sub> and f<sub>y</sub> exist and are continuous near (a, b), then f is differentiable there (and therefore continuous).",pi:1,
   p:"Move from (a, b) to (a + h, b + k) in two steps, first in x, then in y, and use the one-variable Mean Value Theorem on each step; continuity of the partials makes the error small.",
   ce:"Partials alone are not enough: f(x, y) = xy/(x² + y²) with f(0, 0) = 0 has f<sub>x</sub>(0, 0) = f<sub>y</sub>(0, 0) = 0, yet it is not even continuous at the origin (it equals 1/2 along y = x)."},
  {n:"Chain rule",s:"If z = f(x, y) with x = x(t), y = y(t), then dz/dt = f<sub>x</sub>x′(t) + f<sub>y</sub>y′(t) = ∇f · r′(t). For x(s, t), y(s, t): ∂z/∂s = f<sub>x</sub>x<sub>s</sub> + f<sub>y</sub>y<sub>s</sub>. In matrix form, Jacobians multiply.",
   p:"Use the linear approximation Δz ≈ f<sub>x</sub>Δx + f<sub>y</sub>Δy, divide by Δt and let Δt → 0."},
  {n:"Gradient: steepest ascent",s:"D<sub>u</sub>f = |∇f|cos θ. So f increases fastest in the direction of ∇f (rate |∇f|), decreases fastest in the direction −∇f, and doesn't change along directions perpendicular to ∇f.",
   p:"D<sub>u</sub>f = ∇f · u = |∇f||u|cos θ with |u| = 1; the maximum is at θ = 0."},
  {n:"Gradient is perpendicular to level sets",s:"∇f(P) is perpendicular to the level curve (or level surface) of f through P. So the tangent plane to F(x, y, z) = c at P has normal ∇F(P).",
   p:"For any curve r(t) on the level set, f(r(t)) = c. Differentiate: ∇f · r′(t) = 0, so ∇f is perpendicular to every tangent direction."},
  {n:"Implicit differentiation",s:"If F(x, y) = 0 defines y as a function of x, then dy/dx = −F<sub>x</sub>/F<sub>y</sub> (when F<sub>y</sub> ≠ 0).",p:"Differentiate F(x, y(x)) = 0 with the chain rule: F<sub>x</sub> + F<sub>y</sub>y′ = 0."}
 ],
 mist:["Checking a limit along lines only.","Using a non-unit vector u in D<sub>u</sub>f = ∇f · u.","Forgetting to hold the other variable constant when taking a partial derivative.","Thinking ∇f points along the level curve (it is perpendicular to it)."],
 apps:[
  ["Machine learning","Gradient descent: update every parameter by −(learning rate)·∇(loss). Every AI model is trained this way. (See Z-Frontiers → Machine Learning.)"],
  ["Maps and hiking","On a topographic map, the gradient points straight uphill, perpendicular to the contour lines."],
  ["Physics","Heat flows in the direction −∇T; electric fields are E = −∇V."],
  ["Economics","Partial derivatives are marginal effects: how output changes with one input while others stay fixed."],
  ["Error estimates","The linearization estimates how measurement errors in x and y affect a computed value."]
 ],
 ways:[{q:"For z = x²y with x = cos t, y = sin t, find dz/dt.",m:[
  ["Way 1: Chain rule",["z<sub>x</sub> = 2xy, z<sub>y</sub> = x²; x′ = −sin t, y′ = cos t.","dz/dt = 2xy(−sin t) + x²cos t.","= −2cos t sin²t + cos³t."]],
  ["Way 2: Substitute first",["z = cos²t sin t.","dz/dt = 2cos t(−sin t)sin t + cos²t cos t.","= −2cos t sin²t + cos³t ✓."]]],
  note:"Substituting first is fine when the formulas are explicit. The chain rule is essential when they aren't (data, implicit functions, or many variables), and it is exactly what backpropagation in neural networks computes."}],
 study:st("Part B, Partial Derivatives (functions of two variables, gradient, chain rule)","Chapter 4, Differentiation of Functions of Several Variables","Partial Derivatives")
},

/* ---------------- Unit 4: Optimization ---------------- */
u4:{
 defs:[
  ["Critical point","A point where ∇f = 0 or where a partial derivative doesn't exist.",""],
  ["Local and absolute extrema","Local max: f(P) ≥ f nearby. Absolute max: f(P) ≥ f everywhere in the region.",""],
  ["Saddle point","A critical point that is neither a max nor a min (up in one direction, down in another), like z = x² − y² at the origin.",""],
  ["Hessian; discriminant","The Hessian is the matrix of second partials [f<sub>xx</sub> f<sub>xy</sub>; f<sub>yx</sub> f<sub>yy</sub>]; D = f<sub>xx</sub>f<sub>yy</sub> − f<sub>xy</sub>² is its determinant.",""],
  ["Closed and bounded region","Closed: contains its boundary. Bounded: fits in some disk.",""],
  ["Constraint; Lagrange multiplier","Optimizing f subject to g(x, y) = c; λ is the extra unknown in ∇f = λ∇g.",""]
 ],
 thms:[
  {n:"Fermat's theorem in several variables",s:"If f has a local max or min at an interior point P where f is differentiable, then ∇f(P) = 0.",p:"Along the line through P in the x-direction, the one-variable function has a max or min at P, so f<sub>x</sub>(P) = 0; similarly for y.",
   ce:"The converse fails: z = x² − y² has ∇f = 0 at the origin, which is a saddle."},
  {n:"Second Derivative Test",s:"At a critical point with D = f<sub>xx</sub>f<sub>yy</sub> − f<sub>xy</sub>²: D &gt; 0 and f<sub>xx</sub> &gt; 0 ⇒ local min; D &gt; 0 and f<sub>xx</sub> &lt; 0 ⇒ local max; D &lt; 0 ⇒ saddle; D = 0 ⇒ no conclusion.",pi:1,
   p:"Near the point, f − f(P) ≈ ½(f<sub>xx</sub>h² + 2f<sub>xy</sub>hk + f<sub>yy</sub>k²). Completing the square shows this quadratic is always positive when D &gt; 0, f<sub>xx</sub> &gt; 0, always negative when D &gt; 0, f<sub>xx</sub> &lt; 0, and takes both signs when D &lt; 0. (In linear algebra terms: the eigenvalues of the Hessian.)",
   ce:"D = 0 really is inconclusive: x⁴ + y⁴ (min), −x⁴ − y⁴ (max) and x⁴ − y⁴ (saddle) all have D = 0 at the origin."},
  {n:"Extreme Value Theorem",s:"A continuous function on a closed and bounded region attains an absolute maximum and an absolute minimum. They occur at critical points inside or on the boundary.",pi:1,
   p:"This is a deep property of real numbers (completeness). To find them: evaluate f at interior critical points and at the extreme points of f on the boundary, and compare.",
   ce:"Both conditions matter: f = x + y has no max on the open square 0 &lt; x, y &lt; 1 (not closed), nor on the whole plane (not bounded)."},
  {n:"Lagrange multipliers",s:"If f has an extreme value on the curve g(x, y) = c at a point where ∇g ≠ 0, then ∇f = λ∇g there for some number λ.",
   p:"Along the constraint curve r(t), f(r(t)) has a max or min, so ∇f · r′ = 0. Also ∇g · r′ = 0 (g is constant on the curve). In 2D, two vectors perpendicular to the same nonzero r′ are parallel.",
   ce:"The condition ∇g ≠ 0 matters: minimize f = x on the curve g = y² − x³ = 0. The minimum is at (0, 0), but there ∇g = 0 and ∇f = ⟨1, 0⟩ ≠ λ∇g, so the method misses it."},
  {n:"Meaning of λ",s:"λ = dM/dc: how fast the optimal value M changes when the constraint level c increases (the “shadow price”).",pi:1,
   p:"Differentiate M(c) = f(x(c), y(c)) using the chain rule and ∇f = λ∇g, and use that g(x(c), y(c)) = c."}
 ],
 mist:["Forgetting the boundary when finding absolute extrema.","Calling every critical point a max or min (saddles exist).","Concluding “min” when D = 0.","Dropping the constraint equation g = c when solving the Lagrange system."],
 apps:[
  ["Economics","Maximize utility or profit with a budget constraint; λ is the value of one extra dollar."],
  ["Engineering design","Minimize material for a container of fixed volume, or maximize strength for fixed weight."],
  ["Machine learning","Training a model minimizes a loss function of millions of variables; saddle points are a real challenge."],
  ["Physics","Nature minimizes energy: soap films, light paths (Fermat's principle) and equilibrium shapes."]
 ],
 ways:[{q:"Maximize f = xy subject to x + y = 10.",m:[
  ["Way 1: Lagrange multipliers",["∇f = ⟨y, x⟩, ∇g = ⟨1, 1⟩: y = λ, x = λ.","So x = y; with x + y = 10, x = y = 5.","Maximum f = 25 (and λ = 5: one more unit of x + y adds about 5 to the max)."]],
  ["Way 2: Substitute",["y = 10 − x, so f = x(10 − x) = 10x − x².","f′ = 10 − 2x = 0 ⇒ x = 5, y = 5.","f″ = −2 &lt; 0, so the maximum is 25 ✓."]]],
  note:"Substitution is easiest when you can solve the constraint for one variable. Lagrange multipliers work even when you can't (like x² + xy + y⁴ = 7), extend to many variables and constraints, and give the bonus information λ."}],
 study:st("Part B sessions on max-min problems, least squares and Lagrange multipliers","Chapter 4, sections on maxima/minima and Lagrange multipliers","Applications of Partial Derivatives")
},

/* ---------------- Unit 5: Multiple integrals ---------------- */
u5:{
 defs:[
  ["Double integral","∬<sub>R</sub> f dA = limit of Riemann sums Σ f(x<sub>i</sub>, y<sub>j</sub>)ΔA. If f ≥ 0, it is the volume under the surface over R.",""],
  ["Iterated integral","∫<sub>a</sub><sup>b</sup>∫<sub>c</sub><sup>d</sup> f(x, y) dy dx: integrate in y first (x fixed), then in x.",""],
  ["Type I / Type II regions","Type I: a ≤ x ≤ b, g<sub>1</sub>(x) ≤ y ≤ g<sub>2</sub>(x). Type II: c ≤ y ≤ d, h<sub>1</sub>(y) ≤ x ≤ h<sub>2</sub>(y).",""],
  ["Polar, cylindrical and spherical coordinates","dA = r dr dθ; dV = r dz dr dθ; dV = ρ² sin φ dρ dφ dθ.",""],
  ["Jacobian determinant","For x = x(u, v), y = y(u, v): J = ∂(x, y)/∂(u, v) = x<sub>u</sub>y<sub>v</sub> − x<sub>v</sub>y<sub>u</sub>.",""],
  ["Mass, center of mass, average value","Mass = ∬ρ dA; x̄ = (1/m)∬xρ dA; average of f = (1/Area)∬f dA.",""]
 ],
 thms:[
  {n:"Fubini's theorem",s:"If f is continuous on the rectangle [a, b] × [c, d], then ∬<sub>R</sub> f dA = ∫<sub>a</sub><sup>b</sup>∫<sub>c</sub><sup>d</sup> f dy dx = ∫<sub>c</sub><sup>d</sup>∫<sub>a</sub><sup>b</sup> f dx dy. The same holds on Type I and Type II regions.",pi:1,
   p:"Both iterated integrals are limits of the same Riemann sums, added up row by row or column by column. Continuity (or integrability of |f|) makes the limits agree.",
   ce:"The condition matters: for f = (x² − y²)/(x² + y²)² on [0, 1] × [0, 1], the two orders give π/4 and −π/4. The function blows up at the origin, so the theorem doesn't apply."},
  {n:"Change of variables",s:"If T(u, v) = (x, y) is one-to-one with continuous partials, then ∬<sub>R</sub> f(x, y) dA = ∬<sub>S</sub> f(x(u, v), y(u, v))·|J| du dv.",pi:1,
   p:"A tiny rectangle du × dv is mapped to (almost) a parallelogram spanned by T<sub>u</sub>du and T<sub>v</sub>dv, whose area is |det[T<sub>u</sub> T<sub>v</sub>]|du dv = |J| du dv (Linear Algebra, determinants as area).",
   ce:"Forgetting |J| gives wrong answers: the area of the unit disk is ∫<sub>0</sub><sup>2π</sup>∫<sub>0</sub><sup>1</sup> r dr dθ = π. Without the r you would get 2π."},
  {n:"Polar coordinates",s:"∬<sub>R</sub> f dA = ∫∫ f(r cos θ, r sin θ) r dr dθ.",p:"For x = r cos θ, y = r sin θ: J = cos θ·r cos θ − (−r sin θ)·sin θ = r."},
  {n:"Spherical coordinates",s:"dV = ρ² sin φ dρ dφ dθ, so the volume of a ball of radius a is ∫<sub>0</sub><sup>2π</sup>∫<sub>0</sub><sup>π</sup>∫<sub>0</sub><sup>a</sup> ρ² sin φ dρ dφ dθ = 4πa³/3.",p:"The 3 × 3 Jacobian of (ρ sin φ cos θ, ρ sin φ sin θ, ρ cos φ) has determinant ρ² sin φ."},
  {n:"The Gaussian integral",s:"∫<sub>−∞</sub><sup>∞</sup> e<sup>−x²</sup> dx = √π. (This is why the Normal distribution has the factor 1/√(2π).)",
   p:"Call it I. Then I² = ∬<sub>ℝ²</sub> e<sup>−(x² + y²)</sup> dA = ∫<sub>0</sub><sup>2π</sup>∫<sub>0</sub><sup>∞</sup> e<sup>−r²</sup> r dr dθ = 2π·½ = π."}
 ],
 mist:["Forgetting the Jacobian factor r (polar) or ρ² sin φ (spherical).","Writing limits of the outer integral that depend on the inner variable.","Not sketching the region before switching the order of integration.","Using φ from 0 to 2π in spherical coordinates (it goes from 0 to π)."],
 apps:[
  ["Probability","Joint probability densities: P((X, Y) ∈ R) = ∬<sub>R</sub> f dA, and the Normal distribution's constant comes from the Gaussian integral."],
  ["Physics and engineering","Mass, center of mass and moments of inertia of plates and solids."],
  ["Computer graphics","Rendering computes light arriving at each point as an integral over directions (estimated with random sampling, “Monte Carlo”)."],
  ["Medicine","CT scanners reconstruct images from line integrals of tissue density (the Radon transform)."]
 ],
 ways:[{q:"Find ∫<sub>0</sub><sup>1</sup>∫<sub>x</sub><sup>1</sup> e<sup>y²</sup> dy dx.",m:[
  ["Way 1: Switch the order",["The region is 0 ≤ x ≤ y ≤ 1, i.e. 0 ≤ y ≤ 1, 0 ≤ x ≤ y.","∫<sub>0</sub><sup>1</sup>∫<sub>0</sub><sup>y</sup> e<sup>y²</sup> dx dy = ∫<sub>0</sub><sup>1</sup> y e<sup>y²</sup> dy.","= ½(e − 1) ≈ 0.859."]],
  ["Way 2: Numerical (Riemann sum)",["e<sup>y²</sup> has no elementary antiderivative, so the given order can't be done by hand.","A midpoint sum with a 100 × 100 grid gives ≈ 0.859.","Matches ½(e − 1) ✓."]]],
  note:"Switching the order turns an impossible integral into an easy one; always sketch the region first. Numerical integration works for every integral and is how computers check answers (and do real-world integrals)."}],
 study:st("Part C, Double Integrals and Line Integrals in the Plane (double integrals, polar, change of variables)","Chapter 5, Multiple Integration","Multiple Integrals")
},

/* ---------------- Unit 6: Vector calculus ---------------- */
u6:{
 defs:[
  ["Vector field","F(x, y, z) = ⟨P, Q, R⟩ assigns a vector to each point (wind, water flow, force).",""],
  ["Line integral","∫<sub>C</sub> F · dr = ∫<sub>a</sub><sup>b</sup> F(r(t)) · r′(t) dt: the work done by F along C.",""],
  ["Conservative field; potential","F is conservative if F = ∇f for some potential function f.",""],
  ["Divergence and curl","div F = ∇ · F = P<sub>x</sub> + Q<sub>y</sub> + R<sub>z</sub> (spreading out); curl F = ∇ × F (rotation).",""],
  ["Surface integral; flux","∬<sub>S</sub> F · n dS: how much of F flows through the surface S per unit time.",""],
  ["Orientation; simply connected","A closed curve is positively oriented if the region is on the left. A region is simply connected if every loop in it can shrink to a point (no holes).",""]
 ],
 thms:[
  {n:"Fundamental Theorem for Line Integrals",s:"If F = ∇f on a curve C from A to B, then ∫<sub>C</sub> F · dr = f(B) − f(A). So the integral is path-independent, and 0 around every closed loop.",
   p:"d/dt f(r(t)) = ∇f · r′(t) (chain rule). Integrate from a to b and use the ordinary Fundamental Theorem of Calculus."},
  {n:"Test for conservative fields",s:"If F = ⟨P, Q⟩ is conservative then P<sub>y</sub> = Q<sub>x</sub> (in 3D: curl F = 0). On a simply connected region, the converse holds too.",
   p:"If F = ∇f then P<sub>y</sub> = f<sub>xy</sub> = f<sub>yx</sub> = Q<sub>x</sub> (Clairaut). The converse follows from Green's theorem: every loop integral is ∬(Q<sub>x</sub> − P<sub>y</sub>)dA = 0.",
   ce:"Holes matter: F = ⟨−y, x⟩/(x² + y²) satisfies P<sub>y</sub> = Q<sub>x</sub> everywhere except the origin, yet its integral around the unit circle is 2π ≠ 0. The plane minus the origin is not simply connected."},
  {n:"Green's Theorem",s:"For a positively oriented simple closed curve C enclosing D: ∮<sub>C</sub> P dx + Q dy = ∬<sub>D</sub> (Q<sub>x</sub> − P<sub>y</sub>) dA.",pi:1,
   p:"For a Type I region, −∬P<sub>y</sub> dA = −∫[P(x, g<sub>2</sub>) − P(x, g<sub>1</sub>)]dx, which equals ∮P dx (bottom curve left to right, top curve right to left). Do the same for Q with a Type II description, and cut general regions into simple pieces.",
   ce:"Area trick: with P = −y/2, Q = x/2, Area(D) = ½∮(x dy − y dx). Planimeters (area-measuring instruments) work on exactly this principle."},
  {n:"Stokes' Theorem",s:"∮<sub>∂S</sub> F · dr = ∬<sub>S</sub> (curl F) · n dS: the circulation around the boundary equals the total “spin” through the surface.",pi:1,
   p:"Green's theorem on tiny flat patches of S, added up: the interior edges cancel in pairs, leaving the boundary. Green's theorem is the flat case."},
  {n:"Divergence Theorem (Gauss)",s:"For a solid E with closed boundary surface S (outward normal): ∯<sub>S</sub> F · n dS = ∭<sub>E</sub> div F dV.",pi:1,
   p:"Same idea in 3D: for a tiny box, the net outward flux is (P<sub>x</sub> + Q<sub>y</sub> + R<sub>z</sub>)·volume; adding boxes cancels interior faces.",
   ce:"The surface must be closed: for an open hemisphere you must add the flat disk to close it first, then subtract the disk's flux."},
  {n:"The big picture",s:"All these theorems say the same thing: ∫<sub>boundary</sub> (something) = ∫<sub>inside</sub> (its derivative). The Fundamental Theorem of Calculus, the line-integral theorem, Green, Stokes and Gauss are one idea in different dimensions (the general Stokes theorem).",pi:1,
   p:"In higher mathematics this is written ∫<sub>∂M</sub> ω = ∫<sub>M</sub> dω, using differential forms."}
 ],
 mist:["Using the wrong orientation (clockwise instead of counterclockwise; inward instead of outward normal).","Applying the conservative test on a region with holes.","Applying the Divergence Theorem to a surface that isn't closed.","Forgetting |r′(t)| in scalar line integrals (∫f ds) or including it in vector ones (∫F · dr)."],
 apps:[
  ["Electricity and magnetism","Maxwell's equations are the divergence and Stokes theorems applied to electric and magnetic fields: they explain light, radio, motors and generators."],
  ["Fluids and weather","Divergence measures sources and sinks; curl measures rotation (vorticity in hurricanes and tornadoes)."],
  ["Gravity","Gauss's law: the gravitational flux through a closed surface depends only on the mass inside."],
  ["Energy","Conservative forces (gravity, springs) have potential energy, so work depends only on start and end points."]
 ],
 ways:[{q:"Compute ∮<sub>C</sub> (−y dx + x dy) around the circle x² + y² = 4, counterclockwise.",m:[
  ["Way 1: Parametrize",["r = ⟨2cos t, 2sin t⟩, 0 ≤ t ≤ 2π; dx = −2sin t dt, dy = 2cos t dt.","−y dx + x dy = 4sin²t dt + 4cos²t dt = 4 dt.","∫<sub>0</sub><sup>2π</sup> 4 dt = 8π."]],
  ["Way 2: Green's Theorem",["P = −y, Q = x: Q<sub>x</sub> − P<sub>y</sub> = 1 + 1 = 2.","∬<sub>D</sub> 2 dA = 2 · Area = 2 · 4π.","= 8π ✓."]]],
  note:"Parametrizing works for any curve, open or closed. Green's Theorem turns a loop integral into an often much easier area integral, and works for curves that are hard to parametrize."}],
 study:st("Parts C–D (line integrals, Green's theorem; triple integrals, surface integrals, divergence and Stokes' theorems)","Chapter 6, Vector Calculus","Line Integrals, Surface Integrals")
}
};
})();
