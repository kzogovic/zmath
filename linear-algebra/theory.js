/* Z-Linear Algebra: Theory (definitions, theorems, proofs, counterexamples) and Uses & resources.
   Read by zbook.js. Keys match unit ids. */
(function(){
const OCW="https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/";
const ILA="https://textbooks.math.gatech.edu/ila/";
const HEF="https://hefferon.net/linearalgebra/";
const B3="https://www.3blue1brown.com/topics/linear-algebra";
const unitStudy=(strang,ila,hef,b3)=>[
 {k:"watch",l:1,t:"Gilbert Strang, MIT 18.06: "+strang,by:"MIT OpenCourseWare, free video lectures",u:OCW},
 {k:"free",l:1,t:"Interactive Linear Algebra: "+ila,by:"Margalit & Rabinoff, Georgia Tech",u:ILA},
 {k:"free",l:2,t:"Hefferon, Linear Algebra: "+hef,by:"Free textbook with full exercise solutions and proofs",u:HEF},
 ...(b3?[{k:"watch",l:1,t:"3Blue1Brown, Essence of Linear Algebra: "+b3,by:"Animated geometric intuition",u:B3}]:[])];

window.ZT={
_course:[
 {k:"watch",l:1,t:"MIT 18.06 Linear Algebra (Gilbert Strang)",by:"MIT OpenCourseWare",u:OCW,d:"The most famous linear algebra course: 34 video lectures, notes, problem sets and exams with solutions."},
 {k:"watch",l:1,t:"Essence of Linear Algebra",by:"3Blue1Brown",u:B3,d:"Short animated videos that show what matrices, determinants and eigenvectors mean geometrically."},
 {k:"free",l:1,t:"Interactive Linear Algebra",by:"Dan Margalit & Joseph Rabinoff",u:ILA,d:"Free online textbook with pictures and demos, written for Georgia Tech's first course."},
 {k:"watch",l:1,t:"Linear algebra",by:"Khan Academy",u:"https://www.khanacademy.org/math/linear-algebra",d:"Videos and practice from vectors to eigenvectors."},
 {k:"play",l:2,t:"Immersive Linear Algebra",by:"Ström, Åström & Akenine-Möller",u:"https://immersivemath.com/ila/",d:"Free book with interactive 3D figures."},
 {k:"free",l:2,t:"Linear Algebra (Jim Hefferon)",by:"Free textbook",u:HEF,d:"Careful proofs, many exercises, and a full answer manual. Good bridge to proof-based math."},
 {k:"free",l:3,t:"Linear Algebra Done Right (Sheldon Axler)",by:"Free online, Springer",u:"https://linear.axler.net",d:"The classic proof-based second course: abstract vector spaces, operators and the spectral theorem."},
 {k:"book",l:2,free:false,t:"Introduction to Linear Algebra (Gilbert Strang)",by:"Wellesley-Cambridge Press",u:"https://math.mit.edu/~gs/linearalgebra/",d:"The textbook for MIT 18.06, with applications in every chapter."},
 {k:"read",l:2,t:"How Google Finds Your Needle in the Web's Haystack",by:"AMS Feature Column",u:"https://www.ams.org/publicoutreach/feature-column/fcarc-pagerank",d:"PageRank: eigenvectors on a giant scale."},
 {k:"read",l:1,t:"Z-Frontiers: where linear algebra leads",by:"this website",u:"../frontiers/#from-linear-algebra",d:"Machine learning, AI, graphics, quantum computing and more."}
],

/* ---------------- Unit 1 ---------------- */
u1:{
 defs:[
  ["Linear equation","An equation a<sub>1</sub>x<sub>1</sub> + a<sub>2</sub>x<sub>2</sub> + … + a<sub>n</sub>x<sub>n</sub> = b, where the coefficients a<sub>i</sub> and b are numbers.","2x − y + 3z = 4 is linear. xy = 3, x² + y = 1 and sin x = y are not."],
  ["System of linear equations; solution set","A collection of linear equations in the same variables. A solution makes every equation true at once; the solution set is the set of all solutions.",""],
  ["Consistent / inconsistent","A system is consistent if it has at least one solution, inconsistent if it has none.","x + y = 1, x + y = 3 is inconsistent (parallel lines)."],
  ["Augmented matrix","For the system Ax = b, the matrix [A | b]: the coefficient matrix A with the column b attached.","x + 2y = 5, 3x − y = 1 → [1 2 | 5; 3 −1 | 1]."],
  ["Elementary row operations","(1) Swap two rows. (2) Multiply a row by a nonzero number c. (3) Add a multiple of one row to another row. Two matrices are row equivalent if one can be turned into the other by row operations.",""],
  ["Row echelon form (REF)","All zero rows are at the bottom; the first nonzero entry of each row (its pivot) is to the right of the pivot in the row above; all entries below a pivot are 0.",""],
  ["Reduced row echelon form (RREF)","An REF in which every pivot equals 1 and is the only nonzero entry in its column.","[1 0 3; 0 1 −2] is in RREF."],
  ["Pivot column; basic and free variables","A pivot column contains a pivot. Variables of pivot columns are basic; the others are free (they can be any number).",""],
  ["Homogeneous system","A system Ax = 0. It always has the trivial solution x = 0.",""]
 ],
 thms:[
  {n:"Row operations preserve solutions",s:"If two augmented matrices are row equivalent, the two systems have exactly the same solution set.",
   p:"Every solution of the old system satisfies each new equation, because each new equation is a combination of old ones. Each row operation can be undone by another row operation (swap again; multiply by 1/c; subtract the multiple back), so every solution of the new system also solves the old one.",
   ce:"The condition c ≠ 0 is essential. In x + y = 2, x − y = 0 (only solution (1, 1)), multiplying the second row by 0 gives x + y = 2, 0 = 0, which has infinitely many solutions."},
  {n:"Uniqueness of the RREF",s:"Every matrix is row equivalent to exactly one matrix in reduced row echelon form. (Echelon forms are not unique.)",pi:1,
   p:"If R and S were two different RREFs of A, the systems Rx = 0 and Sx = 0 would have the same solutions. Compare their columns from left to right: the first column where they differ would give a solution of one system that is not a solution of the other.",
   ce:"An REF is not unique: [1 2; 0 1] and [1 0; 0 1] are both echelon forms of the same matrix (subtract 2·R<sub>2</sub> from R<sub>1</sub>). Only the RREF is unique."},
  {n:"Existence and uniqueness",s:"A linear system is consistent if and only if the last column of its augmented matrix is not a pivot column (no row [0 … 0 | c] with c ≠ 0). If it is consistent, it has exactly one solution when there are no free variables, and infinitely many when there is at least one free variable.",
   p:"A row [0 … 0 | c] means 0 = c, which is impossible. Otherwise, in RREF each basic variable equals a constant minus a combination of free variables, so we can choose the free variables freely and read off the basic ones. No free variables means one choice only."},
  {n:"0, 1 or infinitely many",s:"A linear system has no solution, exactly one solution, or infinitely many solutions. Never exactly two.",
   p:"Suppose x and y are different solutions of Ax = b. For every number t, A(x + t(y − x)) = Ax + t(Ay − Ax) = b + t(b − b) = b. Different t give different points on the line through x and y, so there are infinitely many solutions.",
   ce:"This is special to linear systems: the nonlinear equation x² = 1 has exactly two solutions."},
  {n:"Homogeneous systems",s:"Ax = 0 is always consistent. If it has more unknowns than equations, it has a nontrivial (nonzero) solution.",
   p:"x = 0 always works. With m equations there are at most m pivots; if n &gt; m there are n − (pivots) ≥ 1 free variables, and choosing a free variable equal to 1 gives a nonzero solution.",
   ce:"More equations than unknowns does not force x = 0: x + y = 0, 2x + 2y = 0, 3x + 3y = 0 has solutions (t, −t) for every t."},
  {n:"Structure of solutions",s:"If p is one solution of Ax = b, then every solution has the form p + v<sub>h</sub>, where v<sub>h</sub> solves Ax = 0.",
   p:"If x solves Ax = b, then A(x − p) = b − b = 0, so x − p = v<sub>h</sub> solves the homogeneous system. Conversely A(p + v<sub>h</sub>) = b + 0 = b."}
 ],
 mist:["Forgetting to apply a row operation to the last (augmented) column.","Scaling a row by 0, or adding a row to itself (2R<sub>1</sub>) and calling it “add a multiple of another row”.","Reading “infinitely many solutions” from a zero row while another row says 0 = c (that system has no solution).","Thinking a free variable must be 0: it can be any number."],
 apps:[
  ["Balancing chemical equations","For a C<sub>3</sub>H<sub>8</sub> + b O<sub>2</sub> → c CO<sub>2</sub> + d H<sub>2</sub>O, counting each atom gives a homogeneous system. Its smallest whole-number solution is (1, 5, 3, 4)."],
  ["Electrical circuits","Kirchhoff's laws (current in = current out, voltage drops add up) give a linear system for the unknown currents."],
  ["Traffic and network flow","At each intersection, cars in = cars out. Free variables are the routes a city can still control."],
  ["Economics","Leontief's input–output model (Nobel Prize 1973) solves (I − C)x = d to find how much each industry must produce."],
  ["Computer simulations","Weather, crash tests and computer graphics solve systems with millions of unknowns using elimination ideas."]
 ],
 ways:[{q:"Solve x + 2y = 5, 3x − y = 1.",m:[
  ["Way 1: Elimination",["Multiply the second equation by 2: 6x − 2y = 2.","Add to the first: 7x = 7, so x = 1.","Back-substitute: 1 + 2y = 5, so y = 2."]],
  ["Way 2: Cramer's rule",["det A = (1)(−1) − (2)(3) = −7.","x = det[5 2; 1 −1] / (−7) = (−5 − 2)/(−7) = 1.","y = det[1 5; 3 1] / (−7) = (1 − 15)/(−7) = 2."]],
  ["Way 3: Geometry",["Each equation is a line in the plane.","Graph y = (5 − x)/2 and y = 3x − 1.","They cross at the single point (1, 2)."]]],
  note:"Elimination works for every system and is what computers use. Cramer's rule is quick for 2 × 2 and gives a formula, but it is slow for large systems and fails when det A = 0. The picture explains why there can be 0, 1 or infinitely many solutions."}],
 study:unitStudy("Lectures 1–2 (geometry of linear equations; elimination)","Chapter 1, Systems of Linear Equations","Chapter One, Linear Systems")
},

/* ---------------- Unit 2 ---------------- */
u2:{
 defs:[
  ["Matrix","A rectangular array of numbers with m rows and n columns (an m × n matrix). The entry in row i and column j is a<sub>ij</sub>.",""],
  ["Sum and scalar multiple","A + B adds entries in the same position (same size needed). cA multiplies every entry by c.",""],
  ["Matrix product","If A is m × n and B is n × p, AB is the m × p matrix with (AB)<sub>ij</sub> = (row i of A) · (column j of B).","[1 2; 3 4][5; 6] = [17; 39]."],
  ["Identity matrix I","The square matrix with 1s on the diagonal and 0s elsewhere: AI = IA = A.",""],
  ["Transpose Aᵀ","The matrix whose rows are the columns of A: (Aᵀ)<sub>ij</sub> = a<sub>ji</sub>. A is symmetric if Aᵀ = A.",""],
  ["Inverse","A square matrix A is invertible if there is a matrix A<sup>−1</sup> with AA<sup>−1</sup> = A<sup>−1</sup>A = I. Otherwise A is singular.",""],
  ["Elementary matrix","The result of one row operation applied to I. Multiplying EA performs that row operation on A.",""],
  ["Diagonal / triangular matrix","Diagonal: zeros off the diagonal. Upper triangular: zeros below the diagonal.",""]
 ],
 thms:[
  {n:"Algebra of matrices",s:"Whenever the sizes match: A(BC) = (AB)C, A(B + C) = AB + AC, (A + B)C = AC + BC. In general AB ≠ BA.",
   p:"For associativity, the (i, j) entry of both A(BC) and (AB)C equals the double sum Σ<sub>k</sub>Σ<sub>l</sub> a<sub>ik</sub>b<sub>kl</sub>c<sub>lj</sub>. The distributive laws follow entry by entry.",
   ce:"Order matters: A = [0 1; 0 0], B = [0 0; 1 0] give AB = [1 0; 0 0] but BA = [0 0; 0 1]. Also AB = 0 does not force A = 0 or B = 0: A = [0 1; 0 0] has A² = 0."},
  {n:"Transpose of a product",s:"(AB)ᵀ = BᵀAᵀ. Also (A + B)ᵀ = Aᵀ + Bᵀ and (Aᵀ)ᵀ = A.",
   p:"((AB)ᵀ)<sub>ij</sub> = (AB)<sub>ji</sub> = Σ<sub>k</sub> a<sub>jk</sub>b<sub>ki</sub> = Σ<sub>k</sub> (Bᵀ)<sub>ik</sub>(Aᵀ)<sub>kj</sub> = (BᵀAᵀ)<sub>ij</sub>.",
   ce:"AᵀBᵀ is usually wrong and may not even be defined: if A is 2 × 3 and B is 3 × 4, then Aᵀ is 3 × 2 and Bᵀ is 4 × 3, so AᵀBᵀ does not exist."},
  {n:"Inverses",s:"If A is invertible, its inverse is unique. If A and B are invertible n × n matrices, so is AB, and (AB)<sup>−1</sup> = B<sup>−1</sup>A<sup>−1</sup>. Also (Aᵀ)<sup>−1</sup> = (A<sup>−1</sup>)ᵀ.",
   p:"If B and C are both inverses of A: B = BI = B(AC) = (BA)C = IC = C. For the product: (AB)(B<sup>−1</sup>A<sup>−1</sup>) = A(BB<sup>−1</sup>)A<sup>−1</sup> = AA<sup>−1</sup> = I, and similarly in the other order.",
   ce:"(A + B)<sup>−1</sup> ≠ A<sup>−1</sup> + B<sup>−1</sup>: with A = B = I, (2I)<sup>−1</sup> = ½I but I + I = 2I."},
  {n:"2 × 2 inverse",s:"A = [a b; c d] is invertible if and only if ad − bc ≠ 0, and then A<sup>−1</sup> = (1/(ad − bc))·[d −b; −c a].",
   p:"Multiply: [a b; c d][d −b; −c a] = [ad − bc 0; 0 ad − bc] = (ad − bc)I. Divide by ad − bc when it is not 0. If ad − bc = 0, the columns are parallel, so Ax = 0 has a nonzero solution and A cannot be invertible."},
  {n:"Solving with the inverse",s:"If A is invertible, then Ax = b has exactly one solution for every b, namely x = A<sup>−1</sup>b.",
   p:"x = A<sup>−1</sup>b works: A(A<sup>−1</sup>b) = b. If Ax = b, multiply on the left by A<sup>−1</sup>: x = A<sup>−1</sup>b, so it is the only solution."},
  {n:"Invertible Matrix Theorem",s:"For a <b>square</b> n × n matrix A, these are all equivalent: A is invertible · the RREF of A is I · A has n pivots · Ax = 0 has only the trivial solution · Ax = b has a solution for every b · the columns of A are linearly independent · the columns span ℝ<sup>n</sup> · det A ≠ 0 · 0 is not an eigenvalue · rank A = n.",pi:1,
   p:"Everything is about pivots. n pivots in an n × n matrix means a pivot in every row and every column. A pivot in every column ⇔ no free variables ⇔ only the trivial solution ⇔ independent columns. A pivot in every row ⇔ Ax = b always consistent ⇔ the columns span. For a square matrix the two happen together, and then row reducing [A | I] produces A<sup>−1</sup>.",
   ce:"The matrix must be square. A = [1 0 0; 0 1 0] (2 × 3) has columns that span ℝ², but Ax = 0 has nonzero solutions and A has no inverse."},
  {n:"One-sided inverses",s:"If A and B are square and AB = I, then BA = I too, so B = A<sup>−1</sup>.",
   p:"If Bx = 0, then x = (AB)x = A(Bx) = 0, so B has only the trivial null space and is invertible. Then A = AB·B<sup>−1</sup> = B<sup>−1</sup>, so BA = I.",
   ce:"Not true for non-square matrices: A = [1 0], B = [1; 0] give AB = [1], but BA = [1 0; 0 0] ≠ I."}
 ],
 mist:["Writing (AB)<sup>−1</sup> = A<sup>−1</sup>B<sup>−1</sup> (the order flips).","“Dividing” by a matrix. Solve AX = B as X = A<sup>−1</sup>B and XA = B as X = BA<sup>−1</sup>.","Expanding (A + B)² as A² + 2AB + B² (correct: A² + AB + BA + B²).","Multiplying entry by entry instead of row-times-column."],
 apps:[
  ["Computer graphics","Rotations, scalings and shears are matrices. Doing one after another is a matrix product, and the order matters: rotate-then-move is not move-then-rotate."],
  ["Markov chains","A transition matrix P updates probabilities: x<sub>k+1</sub> = Px<sub>k</sub>. Weather models and Google's PageRank work this way."],
  ["Cryptography (Hill cipher)","Multiply blocks of letters by an invertible matrix mod 26 to encrypt; multiply by the inverse to decrypt."],
  ["Neural networks","Each layer of a neural network multiplies a vector of numbers by a weight matrix."],
  ["Social networks","If A is the friendship matrix, the entries of A² count friends-of-friends (paths of length 2)."]
 ],
 ways:[{q:"Find the inverse of A = [2 1; 5 3].",m:[
  ["Way 1: The 2 × 2 formula",["det A = 2·3 − 1·5 = 1.","Swap the diagonal, negate the off-diagonal: [3 −1; −5 2].","Divide by det A = 1: A<sup>−1</sup> = [3 −1; −5 2]."]],
  ["Way 2: Row reduce [A | I]",["[2 1 | 1 0; 5 3 | 0 1]. R<sub>2</sub> ← 2R<sub>2</sub> − 5R<sub>1</sub>: [2 1 | 1 0; 0 1 | −5 2].","R<sub>1</sub> ← R<sub>1</sub> − R<sub>2</sub>: [2 0 | 6 −2; 0 1 | −5 2].","R<sub>1</sub> ← ½R<sub>1</sub>: [1 0 | 3 −1; 0 1 | −5 2], so A<sup>−1</sup> = [3 −1; −5 2]."]]],
  note:"The formula is fastest for 2 × 2. Row reducing [A | I] works for every size and also tells you when no inverse exists. Always check: AA<sup>−1</sup> = I."}],
 study:unitStudy("Lectures 3–4 (multiplication and inverses; A = LU)","Chapter 3, Linear Transformations and Matrix Algebra (incl. the Invertible Matrix Theorem)","Chapter Three, Section IV (matrix operations)","Matrix multiplication as composition")
},

/* ---------------- Unit 3 ---------------- */
u3:{
 defs:[
  ["Determinant of a 2 × 2 matrix","det [a b; c d] = ad − bc.",""],
  ["Minor and cofactor","The minor M<sub>ij</sub> is the determinant of A with row i and column j deleted. The cofactor is C<sub>ij</sub> = (−1)<sup>i+j</sup>M<sub>ij</sub> (signs + − + … in a checkerboard).",""],
  ["Cofactor (Laplace) expansion","det A = a<sub>i1</sub>C<sub>i1</sub> + a<sub>i2</sub>C<sub>i2</sub> + … + a<sub>in</sub>C<sub>in</sub> along any row i (or any column).",""],
  ["Triangular matrix","A square matrix with all zeros below (upper) or above (lower) the diagonal.",""],
  ["Adjugate","adj A is the transpose of the matrix of cofactors. It satisfies A·adj A = (det A)I.",""]
 ],
 thms:[
  {n:"Expansion along any row or column",s:"Cofactor expansion along any row or any column gives the same number, det A.",pi:1,
   p:"Every expansion, written out completely, equals the same sum over all ways to pick one entry from each row and each column (the permutation formula Σ sgn(σ)a<sub>1σ(1)</sub>…a<sub>nσ(n)</sub>). So the choice of row or column only changes the order of the terms."},
  {n:"Row operations and determinants",s:"Swapping two rows multiplies det by −1. Multiplying one row by c multiplies det by c. Adding a multiple of one row to another leaves det unchanged.",pi:1,
   p:"det is linear in each row and changes sign when two rows are swapped. A matrix with two equal rows therefore has det = 0 (swapping them changes nothing but the sign). Adding k·(row j) to row i gives det A + k·det(matrix with two equal rows) = det A.",
   ce:"det(cA) = c<sup>n</sup>det A, not c·det A, because every one of the n rows is multiplied by c. Example: det(3I) for 2 × 2 is 9, not 3."},
  {n:"Triangular matrices",s:"The determinant of a triangular matrix is the product of its diagonal entries.",
   p:"Expand along the first column: only the top entry can be nonzero, leaving a smaller triangular matrix. Repeat."},
  {n:"Invertibility test",s:"A square matrix A is invertible if and only if det A ≠ 0.",
   p:"Row reduce A. Each row operation multiplies the determinant by a nonzero number. The RREF is either I (det 1, A invertible) or has a row of zeros (det 0, A not invertible). So det A ≠ 0 exactly in the first case."},
  {n:"Product rule",s:"det(AB) = det A · det B. Consequently det(A<sup>−1</sup>) = 1/det A and det(Aᵀ) = det A.",pi:1,
   p:"For an elementary matrix E, the row-operation rules say det(EB) = det E · det B. An invertible A is a product of elementary matrices, so apply the rule repeatedly. If A is not invertible, neither is AB, and both sides are 0. Then det A · det A<sup>−1</sup> = det I = 1.",
   ce:"There is no sum rule: with A = B = I (2 × 2), det(A + B) = det(2I) = 4 but det A + det B = 2."},
  {n:"Area and volume",s:"|det A| is the factor by which x ↦ Ax multiplies areas (in ℝ²) or volumes (in ℝ³). The parallelogram spanned by u and v has area |det[u v]|. A negative determinant means the map flips orientation (like a mirror).",
   p:"For [a 0; 0 d], the unit square becomes an a-by-d rectangle. Shears (adding a multiple of one row to another) keep area and determinant unchanged, and swapping rows reflects. Every matrix is built from these steps."},
  {n:"Cramer's rule",s:"If det A ≠ 0, the unique solution of Ax = b is x<sub>i</sub> = det A<sub>i</sub> / det A, where A<sub>i</sub> is A with column i replaced by b.",
   p:"Let X<sub>i</sub> be the identity with column i replaced by x. Then AX<sub>i</sub> = A<sub>i</sub>. Taking determinants, det A · x<sub>i</sub> = det A<sub>i</sub>, because det X<sub>i</sub> = x<sub>i</sub> (expand along row i).",
   ce:"If det A = 0, Cramer's rule divides by zero. The system then has no solution or infinitely many, and you need elimination to tell which."}
 ],
 mist:["Forgetting the checkerboard signs in cofactor expansion.","Forgetting to change the sign after a row swap, or to undo a scaling.","Using det(cA) = c·det A.","Using the 3 × 3 “diagonals” shortcut (rule of Sarrus) on a 4 × 4 matrix: it only works for 3 × 3."],
 apps:[
  ["Area, volume and the shoelace formula","The area of a polygon from its coordinates is a sum of 2 × 2 determinants. Surveyors and GIS software use it."],
  ["Cross products","u × v is computed as a 3 × 3 determinant. It gives torque in physics and normal vectors for lighting in 3D graphics."],
  ["Change of variables","In Multivariable Calculus, the Jacobian determinant tells how much a coordinate change stretches area (dx dy = r dr dθ in polar)."],
  ["Eigenvalues","Eigenvalues are the roots of det(A − λI) = 0 (Unit 6)."],
  ["Orientation tests","The sign of a determinant tells which side of a line a point is on. Robots and graphics engines use this for collision detection."]
 ],
 ways:[{q:"Compute det A for A = [2 1 3; 0 4 1; 1 0 2].",m:[
  ["Way 1: Cofactor expansion along row 1",["2·det[4 1; 0 2] − 1·det[0 1; 1 2] + 3·det[0 4; 1 0]","= 2(8) − 1(−1) + 3(−4)","= 16 + 1 − 12 = 5."]],
  ["Way 2: Row reduce to triangular",["R<sub>3</sub> ← R<sub>3</sub> − ½R<sub>1</sub>: row 3 becomes [0 −½ ½] (det unchanged).","R<sub>3</sub> ← R<sub>3</sub> + ⅛R<sub>2</sub>: row 3 becomes [0 0 ⅝].","Triangular: det = 2 · 4 · ⅝ = 5."]]],
  note:"Expand along a row or column with many zeros for small matrices. For 4 × 4 and larger, row reduction is much faster (about n³ steps instead of n!), which is what computers do."}],
 study:unitStudy("Lectures 18–20 (properties of determinants; formulas; Cramer's rule, inverse matrix, volume)","Chapter 4, Determinants","Chapter Four, Determinants","The determinant")
},

/* ---------------- Unit 4 ---------------- */
u4:{
 defs:[
  ["Vector space","A set V with addition and scalar multiplication satisfying 10 axioms: u + v and cu are in V (closure); u + v = v + u; (u + v) + w = u + (v + w); there is a zero vector 0 with u + 0 = u; every u has a negative −u; c(u + v) = cu + cv; (c + d)u = cu + du; c(du) = (cd)u; 1u = u.","ℝ<sup>n</sup>; all polynomials of degree ≤ n (P<sub>n</sub>); all m × n matrices; all continuous functions on [a, b]."],
  ["Subspace","A subset W of V that is itself a vector space with the same operations.",""],
  ["Linear combination; span","c<sub>1</sub>v<sub>1</sub> + … + c<sub>k</sub>v<sub>k</sub> is a linear combination. Span{v<sub>1</sub>, …, v<sub>k</sub>} is the set of all of them.","Span{(1, 0), (0, 1)} = ℝ²."],
  ["Linearly independent","v<sub>1</sub>, …, v<sub>k</sub> are independent if c<sub>1</sub>v<sub>1</sub> + … + c<sub>k</sub>v<sub>k</sub> = 0 only when every c<sub>i</sub> = 0. Otherwise they are dependent.",""],
  ["Basis; dimension","A basis of V is an independent set that spans V. The dimension of V is the number of vectors in a basis.","dim ℝ<sup>n</sup> = n; dim P<sub>2</sub> = 3 (basis 1, t, t²)."],
  ["Column space, null space, row space","Col A = span of the columns of A. Nul A = all solutions of Ax = 0. Row A = span of the rows.",""],
  ["Rank and nullity","rank A = dim Col A (the number of pivots). nullity A = dim Nul A (the number of free variables).",""],
  ["Coordinates","If B = {b<sub>1</sub>, …, b<sub>n</sub>} is a basis and x = c<sub>1</sub>b<sub>1</sub> + … + c<sub>n</sub>b<sub>n</sub>, then [x]<sub>B</sub> = (c<sub>1</sub>, …, c<sub>n</sub>) are the coordinates of x in basis B.",""]
 ],
 thms:[
  {n:"Subspace test",s:"A subset W of V is a subspace if and only if (1) 0 is in W, (2) u + v is in W whenever u and v are, and (3) cu is in W whenever u is.",
   p:"These three give closure and the zero vector, and −u = (−1)u is in W by (3). All the other axioms (commutativity, distributivity, …) are already true in V, so they stay true in W.",
   ce:"Each condition is needed. The line y = x + 1 fails (1): it misses 0. The first quadrant x, y ≥ 0 passes (2) but fails (3): (−1)(1, 1) leaves it. The union of the two axes passes (3) but fails (2): (1, 0) + (0, 1) = (1, 1)."},
  {n:"A span is a subspace",s:"Span{v<sub>1</sub>, …, v<sub>k</sub>} is a subspace. It is the smallest subspace that contains v<sub>1</sub>, …, v<sub>k</sub>.",
   p:"Choosing all coefficients 0 gives 0. The sum of two linear combinations, or a multiple of one, is again a linear combination. Any subspace containing the v<sub>i</sub> must contain all their combinations."},
  {n:"Dependence means redundancy",s:"Vectors v<sub>1</sub>, …, v<sub>k</sub> (k ≥ 2) are linearly dependent if and only if at least one of them is a linear combination of the others.",
   p:"If c<sub>1</sub>v<sub>1</sub> + … + c<sub>k</sub>v<sub>k</sub> = 0 with some c<sub>j</sub> ≠ 0, divide by c<sub>j</sub> and solve for v<sub>j</sub>. Conversely, if v<sub>j</sub> = Σ a<sub>i</sub>v<sub>i</sub>, then Σ a<sub>i</sub>v<sub>i</sub> − v<sub>j</sub> = 0 is a dependence relation with coefficient −1 ≠ 0."},
  {n:"Too many vectors",s:"In ℝ<sup>n</sup>, any set of more than n vectors is linearly dependent. Any spanning set of ℝ<sup>n</sup> has at least n vectors.",
   p:"Put the k vectors as columns of an n × k matrix. If k &gt; n there are at most n pivots, so at least one free variable, so Ax = 0 has a nonzero solution: a dependence relation. A spanning set needs a pivot in every one of the n rows, so at least n columns."},
  {n:"Dimension is well defined",s:"Any two bases of the same vector space have the same number of vectors.",pi:1,
   p:"The exchange lemma: if V is spanned by m vectors, then any independent set in V has at most m vectors (proved by swapping independent vectors into the spanning set one at a time). Apply it both ways to two bases."},
  {n:"Unique coordinates",s:"If B is a basis of V, every vector in V can be written as a combination of the basis vectors in exactly one way.",
   p:"It can be written at least one way because B spans V. If x = Σ c<sub>i</sub>b<sub>i</sub> = Σ d<sub>i</sub>b<sub>i</sub>, subtract: Σ (c<sub>i</sub> − d<sub>i</sub>)b<sub>i</sub> = 0. Independence forces every c<sub>i</sub> − d<sub>i</sub> = 0."},
  {n:"Rank–Nullity Theorem",s:"For any m × n matrix A: rank A + nullity A = n (the number of columns).",
   p:"In the echelon form, each column is either a pivot column or a free-variable column. The pivot columns of A form a basis of Col A (rank), and each free variable gives one basis vector of Nul A (nullity). Together they count all n columns.",
   ce:"Row operations change the column space! For A = [1 2; 2 4], the RREF is [1 2; 0 0], whose columns span the x-axis, but Col A is the line through (1, 2). Use the pivot columns of the original A as the basis."},
  {n:"The “two out of three” rule",s:"If dim V = n, then a set of exactly n vectors in V is a basis as soon as it is either independent or spanning. You only need to check one.",pi:1,
   p:"An independent set of n vectors that did not span could be extended to a larger independent set, more than n vectors, which is impossible. A spanning set of n vectors that were dependent could be shrunk to a smaller spanning set, contradicting dimension n."}
 ],
 mist:["Reading a basis of Col A from the columns of the RREF instead of the original matrix.","Thinking a basis is unique (ℝ² has infinitely many bases).","Calling a set “independent” because no two vectors are multiples: (1, 0), (0, 1), (1, 1) are pairwise non-parallel but dependent.","Checking only that 0 is in W and forgetting closure under addition and scalars."],
 apps:[
  ["Differential equations","All solutions of y″ + y = 0 form a 2-dimensional vector space with basis cos t, sin t. Every solution is a·cos t + b·sin t."],
  ["Fourier series and signals","In PDE Unit 3, the functions sin x, sin 2x, sin 3x, … act like a basis for functions. Music, MP3 and JPEG compression keep only the important coordinates."],
  ["Degrees of freedom","The dimension counts independent choices: a robot arm with 6 joints has a 6-dimensional space of positions."],
  ["Error-correcting codes","QR codes and phone signals use subspaces of vectors made of 0s and 1s, so that small errors can be detected and fixed."],
  ["Data science","Rank tells how many independent features a data table really has; low-rank approximations compress data (see the SVD in Unit 7)."]
 ],
 ways:[{q:"Are (1, 2, 3), (4, 5, 6), (7, 8, 9) linearly independent?",m:[
  ["Way 1: Row reduce",["Put the vectors as columns and row reduce: [1 4 7; 2 5 8; 3 6 9] → [1 4 7; 0 −3 −6; 0 0 0].","Only 2 pivots for 3 columns: a free variable, so the vectors are dependent.","Relation: v<sub>1</sub> − 2v<sub>2</sub> + v<sub>3</sub> = 0 (check: 1 − 8 + 7 = 0, 2 − 10 + 8 = 0, 3 − 12 + 9 = 0)."]],
  ["Way 2: Determinant",["Three vectors in ℝ³: they are independent exactly when det ≠ 0.","det = 1(45 − 48) − 4(18 − 24) + 7(12 − 15) = −3 + 24 − 21 = 0.","det = 0, so the vectors are dependent."]]],
  note:"The determinant only works for n vectors in ℝ<sup>n</sup> and only says yes or no. Row reduction works for any number of vectors and also finds the dependence relation and a basis of the span."}],
 study:unitStudy("Lectures 5–10 (vector spaces; column space and nullspace; Ax = 0 and Ax = b; independence, basis, dimension; the four fundamental subspaces)","Chapters 2–3 (span, independence, subspaces, basis and dimension, rank)","Chapter Two, Vector Spaces","Linear combinations, span and basis vectors")
},

/* ---------------- Unit 5 ---------------- */
u5:{
 defs:[
  ["Transformation","A rule T: ℝ<sup>n</sup> → ℝ<sup>m</sup> assigning to each x in the domain ℝ<sup>n</sup> a vector T(x) in the codomain ℝ<sup>m</sup>. The range is the set of all outputs T(x).",""],
  ["Linear transformation","T is linear if T(u + v) = T(u) + T(v) and T(cu) = cT(u) for all vectors u, v and numbers c.","T(x, y) = (2x + y, 3y) is linear; T(x, y) = (x + 1, y) and T(x, y) = (x², y) are not."],
  ["Standard basis","e<sub>1</sub> = (1, 0, …, 0), e<sub>2</sub> = (0, 1, 0, …, 0), …, e<sub>n</sub>.",""],
  ["Standard matrix","The matrix A = [T(e<sub>1</sub>) T(e<sub>2</sub>) … T(e<sub>n</sub>)] with T(x) = Ax.",""],
  ["Kernel","ker T = {x : T(x) = 0}, the null space of the standard matrix.",""],
  ["One-to-one; onto","T is one-to-one if different inputs always give different outputs. T is onto if every vector in the codomain is an output.",""],
  ["Composition","(S ∘ T)(x) = S(T(x)): first T, then S.",""],
  ["Isomorphism","A linear transformation that is both one-to-one and onto. It can be undone by a linear inverse.",""]
 ],
 thms:[
  {n:"Every linear map is a matrix",s:"If T: ℝ<sup>n</sup> → ℝ<sup>m</sup> is linear, then T(x) = Ax for the m × n matrix A = [T(e<sub>1</sub>) … T(e<sub>n</sub>)].",
   p:"Write x = x<sub>1</sub>e<sub>1</sub> + … + x<sub>n</sub>e<sub>n</sub>. By linearity, T(x) = x<sub>1</sub>T(e<sub>1</sub>) + … + x<sub>n</sub>T(e<sub>n</sub>), which is exactly the matrix A times x."},
  {n:"Linear maps fix the origin",s:"If T is linear, then T(0) = 0, and T maps lines to lines (or to a single point).",
   p:"T(0) = T(0·0) = 0·T(0) = 0. A line p + tv is sent to T(p) + tT(v).",
   ce:"Moving (translation), T(x) = x + b with b ≠ 0, is not linear because T(0) = b. That is why computer graphics adds a fourth coordinate (homogeneous coordinates): it turns translations into 4 × 4 matrices."},
  {n:"One-to-one test",s:"T(x) = Ax is one-to-one ⇔ ker T = {0} ⇔ the columns of A are linearly independent ⇔ A has a pivot in every column.",
   p:"T(u) = T(v) ⇔ T(u − v) = 0 ⇔ u − v is in the kernel. So different inputs always give different outputs exactly when only 0 is in the kernel."},
  {n:"Onto test",s:"T(x) = Ax is onto ℝ<sup>m</sup> ⇔ the columns of A span ℝ<sup>m</sup> ⇔ A has a pivot in every row.",
   p:"Every output Ax is a combination of the columns, so the range is Col A. It is all of ℝ<sup>m</sup> exactly when Ax = b is consistent for every b, i.e. a pivot in every row."},
  {n:"Composition is multiplication",s:"If T(x) = Ax and S(y) = By, then S ∘ T has standard matrix BA.",
   p:"S(T(x)) = B(Ax) = (BA)x by associativity.",
   ce:"Order matters: rotating by 90° and then reflecting across the x-axis gives a different matrix than reflecting first (see “Two ways” below and try both orders)."},
  {n:"Rank–nullity for maps",s:"For linear T: ℝ<sup>n</sup> → ℝ<sup>m</sup>, dim ker T + dim range T = n.",
   p:"This is the Rank–Nullity Theorem (Unit 4) for the standard matrix.",
   ce:"So a linear map ℝ³ → ℝ² can never be one-to-one (its kernel has dimension at least 1), and a linear map ℝ² → ℝ³ can never be onto (its range has dimension at most 2)."},
  {n:"Area scaling",s:"A linear map of ℝ² with standard matrix A multiplies every area by |det A| (and every volume, in ℝ³).",
   p:"See Unit 3, Theorem 3.6. Any region is filled by tiny squares, and each square's area is multiplied by the same factor."}
 ],
 mist:["Building the standard matrix from T(e<sub>i</sub>) as rows instead of columns.","Composing in the wrong order: S ∘ T means “T first” and its matrix is BA, not AB.","Checking linearity with only one example instead of for all vectors.","Confusing the codomain (where outputs live) with the range (the outputs that actually occur)."],
 apps:[
  ["Video games and animation","Every frame, millions of points are rotated, scaled and projected by 4 × 4 matrices on the graphics card."],
  ["Robotics","A robot arm's position is the composition of one transformation per joint (forward kinematics)."],
  ["Image editing","Resizing, rotating and shearing photos are linear maps applied to pixel coordinates."],
  ["Neural networks","Each layer is a linear map followed by a simple nonlinear function. Stacking layers composes them."],
  ["Calculus","The derivative of a function of several variables is a linear map (the Jacobian matrix): the best linear approximation near a point."]
 ],
 ways:[{q:"Find the standard matrix of T: rotate the plane 90° counterclockwise, then reflect across the x-axis.",m:[
  ["Way 1: Follow e<sub>1</sub> and e<sub>2</sub>",["e<sub>1</sub> = (1, 0) rotates to (0, 1), then reflects to (0, −1).","e<sub>2</sub> = (0, 1) rotates to (−1, 0), then reflects to (−1, 0).","These are the columns: A = [0 −1; −1 0]."]],
  ["Way 2: Multiply the two matrices",["Rotation by 90°: Q = [0 −1; 1 0]. Reflection: R = [1 0; 0 −1].","Rotation happens first, so the matrix is RQ.","RQ = [1·0 + 0·1, 1·(−1) + 0·0; 0·0 + (−1)·1, 0·(−1) + (−1)·0] = [0 −1; −1 0]."]]],
  note:"Following e<sub>1</sub> and e<sub>2</sub> is quickest for a picture. Multiplying matrices is better when there are many steps, and it is what software does. Check: QR = [0 1; 1 0] is different, so the order matters."}],
 study:unitStudy("Lecture 30 (linear transformations and their matrices)","Chapter 3, Linear Transformations and Matrix Algebra","Chapter Three, Maps Between Spaces","Linear transformations and matrices; composition")
},

/* ---------------- Unit 6 ---------------- */
u6:{
 defs:[
  ["Eigenvector and eigenvalue","A nonzero vector v with Av = λv for some number λ. Then λ is an eigenvalue of A, and v is an eigenvector for λ.","A = [4 1; 2 3]: A(1, 1) = (5, 5) = 5(1, 1), so λ = 5 with v = (1, 1)."],
  ["Eigenspace","For an eigenvalue λ, the eigenspace is Nul(A − λI): all eigenvectors for λ together with 0.",""],
  ["Characteristic polynomial","p(λ) = det(A − λI). Its roots are the eigenvalues.",""],
  ["Algebraic and geometric multiplicity","Algebraic: how many times λ is a root of p(λ). Geometric: dim Nul(A − λI). Always 1 ≤ geometric ≤ algebraic.",""],
  ["Similar matrices","A and B are similar if B = P<sup>−1</sup>AP for some invertible P.",""],
  ["Diagonalizable","A is diagonalizable if A = PDP<sup>−1</sup> with D diagonal.",""],
  ["Trace","tr A = the sum of the diagonal entries.",""]
 ],
 thms:[
  {n:"Finding eigenvalues",s:"λ is an eigenvalue of A if and only if det(A − λI) = 0.",
   p:"Av = λv with v ≠ 0 ⇔ (A − λI)v = 0 has a nonzero solution ⇔ A − λI is not invertible ⇔ det(A − λI) = 0 (Invertible Matrix Theorem)."},
  {n:"Distinct eigenvalues give independent eigenvectors",s:"Eigenvectors that belong to different eigenvalues are linearly independent.",
   p:"For two: suppose c<sub>1</sub>v<sub>1</sub> + c<sub>2</sub>v<sub>2</sub> = 0. Apply A: c<sub>1</sub>λ<sub>1</sub>v<sub>1</sub> + c<sub>2</sub>λ<sub>2</sub>v<sub>2</sub> = 0. Subtract λ<sub>2</sub> times the first equation: c<sub>1</sub>(λ<sub>1</sub> − λ<sub>2</sub>)v<sub>1</sub> = 0. Since λ<sub>1</sub> ≠ λ<sub>2</sub> and v<sub>1</sub> ≠ 0, c<sub>1</sub> = 0, and then c<sub>2</sub> = 0. For more vectors, repeat the argument (induction)."},
  {n:"Diagonalization Theorem",s:"An n × n matrix A is diagonalizable if and only if it has n linearly independent eigenvectors. Then A = PDP<sup>−1</sup>, where the columns of P are the eigenvectors and D has the matching eigenvalues on its diagonal. In particular, n distinct eigenvalues guarantee that A is diagonalizable.",
   p:"AP = A[v<sub>1</sub> … v<sub>n</sub>] = [λ<sub>1</sub>v<sub>1</sub> … λ<sub>n</sub>v<sub>n</sub>] = PD. P is invertible exactly when its columns are independent, and then A = PDP<sup>−1</sup>. Conversely, AP = PD says column by column that the columns of P are eigenvectors.",
   ce:"Repeated eigenvalues can fail: A = [1 1; 0 1] has λ = 1 twice (algebraic multiplicity 2) but Nul(A − I) is only the line through (1, 0) (geometric multiplicity 1), so A is not diagonalizable. But repeated eigenvalues don't always fail: I has λ = 1 twice and is already diagonal."},
  {n:"Similar matrices share eigenvalues",s:"If B = P<sup>−1</sup>AP, then A and B have the same characteristic polynomial, so the same eigenvalues, trace and determinant.",
   p:"det(B − λI) = det(P<sup>−1</sup>(A − λI)P) = det P<sup>−1</sup> · det(A − λI) · det P = det(A − λI).",
   ce:"The converse is false: I and [1 1; 0 1] have the same eigenvalues (1, 1) but are not similar, since P<sup>−1</sup>IP = I for every P."},
  {n:"Trace and determinant",s:"The sum of the eigenvalues (with multiplicity, complex ones included) equals tr A, and their product equals det A.",
   p:"For 2 × 2: det(A − λI) = λ² − (tr A)λ + det A. A quadratic λ² − Sλ + P has roots with sum S and product P. In general, compare the coefficients of p(λ) with (λ<sub>1</sub> − λ)…(λ<sub>n</sub> − λ)."},
  {n:"Powers of a matrix",s:"If A = PDP<sup>−1</sup>, then A<sup>k</sup> = PD<sup>k</sup>P<sup>−1</sup>, and D<sup>k</sup> just raises each diagonal entry to the k-th power.",
   p:"A<sup>2</sup> = PDP<sup>−1</sup>PDP<sup>−1</sup> = PD<sup>2</sup>P<sup>−1</sup>, because P<sup>−1</sup>P = I in the middle. Repeat."},
  {n:"Spectral Theorem (real symmetric matrices)",s:"If A is real and symmetric (Aᵀ = A), then all its eigenvalues are real and A = QDQᵀ with Q orthogonal: A has an orthonormal basis of eigenvectors.",pi:1,
   p:"If Av = λv and Aw = μw with λ ≠ μ, then λ(v·w) = (Av)·w = v·(Aw) = μ(v·w), so v·w = 0. That is why the eigenvectors are perpendicular. The full proof (that eigenvalues are real and there are always enough eigenvectors) is in Axler, Chapter 7.",
   ce:"Without symmetry, eigenvalues can be complex: the rotation [0 −1; 1 0] has λ = ±i and no real eigenvector (no direction stays put when you rotate by 90°)."},
  {n:"Cayley–Hamilton Theorem",s:"Every square matrix satisfies its own characteristic polynomial: p(A) = 0. For 2 × 2: A² − (tr A)A + (det A)I = 0.",pi:1,
   p:"For a diagonalizable A = PDP<sup>−1</sup>: p(A) = P·p(D)·P<sup>−1</sup>, and p(D) is diagonal with entries p(λ<sub>i</sub>) = 0. The general case uses the adjugate (or the fact that diagonalizable matrices can approximate any matrix).",
   ce:"Check it on A = [4 1; 2 3]: tr 7, det 10. A² = [18 7; 14 11], and A² − 7A + 10I = [18 − 28 + 10, 7 − 7; 14 − 14, 11 − 21 + 10] = 0 ✓."}
 ],
 mist:["Allowing v = 0 as an eigenvector (0 can be an eigenvalue, but never an eigenvector).","Putting the eigenvalues in D in a different order from the eigenvectors in P.","Assuming every matrix is diagonalizable, or that repeated eigenvalues always prevent it.","Thinking row operations keep eigenvalues the same (they don't)."],
 apps:[
  ["Google's PageRank","Web pages are ranked by the eigenvector for λ = 1 of a giant link matrix: the long-run share of time a random surfer spends on each page."],
  ["Long-run behavior of Markov chains","The steady state of weather, population or game models is an eigenvector for λ = 1."],
  ["Vibrations","Natural frequencies of bridges, buildings and guitar strings are eigenvalues. Engineers keep them away from wind and footstep frequencies."],
  ["Population biology","In the Leslie matrix model, the largest eigenvalue is the long-term growth rate of a population."],
  ["Data science (PCA)","The eigenvectors of a covariance matrix are the main directions of variation in data, used to compress and visualize it."],
  ["Quantum mechanics","The possible energies of an atom are eigenvalues of an operator (the Schrödinger equation)."],
  ["Fibonacci numbers","Diagonalizing [1 1; 1 0] gives Binet's formula F<sub>n</sub> = (φ<sup>n</sup> − ψ<sup>n</sup>)/√5, with the golden ratio φ as an eigenvalue."]
 ],
 ways:[{q:"Find the eigenvalues of A = [4 1; 2 3].",m:[
  ["Way 1: Characteristic polynomial",["det(A − λI) = (4 − λ)(3 − λ) − 2.","= λ² − 7λ + 10 = (λ − 2)(λ − 5).","λ = 2 and λ = 5."]],
  ["Way 2: Trace and determinant",["tr A = 4 + 3 = 7 and det A = 12 − 2 = 10.","The eigenvalues are two numbers with sum 7 and product 10.","They are 2 and 5. Check with an eigenvector: A(1, 1) = (5, 5) ✓."]]],
  note:"The trace–determinant shortcut is fast for 2 × 2 and a great way to check your answer. For larger matrices you need the characteristic polynomial (or, on a computer, numerical methods like the QR algorithm)."}],
 study:unitStudy("Lectures 21–22, 24–25 (eigenvalues; diagonalization and powers; Markov matrices; symmetric matrices)","Chapter 5, Eigenvalues and Eigenvectors","Chapter Five, Similarity","Eigenvectors and eigenvalues")
},

/* ---------------- Unit 7 ---------------- */
u7:{
 defs:[
  ["Dot (inner) product","u · v = u<sub>1</sub>v<sub>1</sub> + … + u<sub>n</sub>v<sub>n</sub> = uᵀv.",""],
  ["Length (norm) and distance","‖v‖ = √(v · v). dist(u, v) = ‖u − v‖. A unit vector has length 1.",""],
  ["Orthogonal","u and v are orthogonal (perpendicular) if u · v = 0.",""],
  ["Orthogonal complement","W<sup>⊥</sup> = all vectors orthogonal to every vector in W.",""],
  ["Orthogonal / orthonormal set and basis","A set of vectors that are pairwise orthogonal; orthonormal if they are also unit vectors.",""],
  ["Orthogonal projection","The projection of y onto a nonzero u is proj<sub>u</sub> y = (y · u / u · u)·u. Onto a subspace W with orthogonal basis u<sub>1</sub>, …, u<sub>k</sub>: ŷ = Σ (y · u<sub>i</sub> / u<sub>i</sub> · u<sub>i</sub>)u<sub>i</sub>.",""],
  ["Orthogonal matrix","A square matrix Q with QᵀQ = I (its columns are orthonormal).",""],
  ["Least-squares solution","An x̂ that makes ‖Ax̂ − b‖ as small as possible, used when Ax = b has no exact solution.",""],
  ["QR factorization; SVD","A = QR with Q having orthonormal columns and R upper triangular. Singular value decomposition: A = UΣVᵀ with U, V orthogonal and Σ diagonal with entries σ<sub>1</sub> ≥ σ<sub>2</sub> ≥ … ≥ 0.",""]
 ],
 thms:[
  {n:"Cauchy–Schwarz inequality",s:"|u · v| ≤ ‖u‖‖v‖, with equality only when u and v are parallel. Consequently the triangle inequality ‖u + v‖ ≤ ‖u‖ + ‖v‖ holds, and the angle θ with cos θ = u · v/(‖u‖‖v‖) makes sense.",
   p:"For every t, 0 ≤ ‖u − tv‖² = ‖u‖² − 2t(u · v) + t²‖v‖². A quadratic in t that is never negative has discriminant ≤ 0: 4(u · v)² − 4‖u‖²‖v‖² ≤ 0."},
  {n:"Pythagorean Theorem",s:"u and v are orthogonal if and only if ‖u + v‖² = ‖u‖² + ‖v‖².",
   p:"‖u + v‖² = (u + v) · (u + v) = ‖u‖² + 2u · v + ‖v‖², which equals ‖u‖² + ‖v‖² exactly when u · v = 0."},
  {n:"Orthogonal sets are independent",s:"An orthogonal set of nonzero vectors is linearly independent. Coordinates in an orthogonal basis are simply c<sub>i</sub> = y · u<sub>i</sub> / u<sub>i</sub> · u<sub>i</sub>.",
   p:"Dot c<sub>1</sub>u<sub>1</sub> + … + c<sub>k</sub>u<sub>k</sub> = 0 with u<sub>j</sub>: every term but one vanishes, leaving c<sub>j</sub>(u<sub>j</sub> · u<sub>j</sub>) = 0, so c<sub>j</sub> = 0. The same computation with y instead of 0 gives the coordinate formula."},
  {n:"Best Approximation Theorem",s:"Every y can be written uniquely as y = ŷ + z with ŷ in W and z in W<sup>⊥</sup>. The projection ŷ is the point of W closest to y: ‖y − ŷ‖ &lt; ‖y − w‖ for every other w in W.",
   p:"y − w = (y − ŷ) + (ŷ − w). The first part is in W<sup>⊥</sup> and the second is in W, so by Pythagoras ‖y − w‖² = ‖y − ŷ‖² + ‖ŷ − w‖², which is smallest when w = ŷ."},
  {n:"The fundamental subspaces",s:"(Row A)<sup>⊥</sup> = Nul A and (Col A)<sup>⊥</sup> = Nul Aᵀ.",
   p:"Ax = 0 says that x has dot product 0 with every row of A, i.e. x is orthogonal to the row space. Apply this to Aᵀ for the second statement."},
  {n:"Least squares and the normal equations",s:"x̂ minimizes ‖Ax − b‖ if and only if AᵀAx̂ = Aᵀb. If the columns of A are independent, x̂ = (AᵀA)<sup>−1</sup>Aᵀb is unique.",
   p:"Ax̂ is the closest point of Col A to b exactly when b − Ax̂ is orthogonal to Col A, i.e. in Nul Aᵀ: Aᵀ(b − Ax̂) = 0. If the columns are independent, AᵀA is invertible.",
   ce:"Without independent columns, the least-squares solution is not unique. And numerically, forming AᵀA can lose accuracy; computer software solves least squares with the QR factorization instead."},
  {n:"Gram–Schmidt",s:"Any basis x<sub>1</sub>, …, x<sub>k</sub> of W can be turned into an orthogonal basis: v<sub>1</sub> = x<sub>1</sub>, v<sub>2</sub> = x<sub>2</sub> − proj<sub>v<sub>1</sub></sub>x<sub>2</sub>, v<sub>3</sub> = x<sub>3</sub> − proj<sub>v<sub>1</sub></sub>x<sub>3</sub> − proj<sub>v<sub>2</sub></sub>x<sub>3</sub>, … Normalizing gives A = QR.",
   p:"Each v<sub>j</sub> is x<sub>j</sub> minus its projection onto span{v<sub>1</sub>, …, v<sub>j−1</sub>}, so it is orthogonal to all earlier v's (Best Approximation). It is nonzero because x<sub>j</sub> is not in that span (independence)."},
  {n:"Orthogonal matrices preserve geometry",s:"If Q is orthogonal, then ‖Qx‖ = ‖x‖, (Qx) · (Qy) = x · y, Q<sup>−1</sup> = Qᵀ and det Q = ±1. Orthogonal matrices are rotations and reflections.",
   p:"‖Qx‖² = (Qx)ᵀ(Qx) = xᵀQᵀQx = xᵀx = ‖x‖². QᵀQ = I gives Q<sup>−1</sup> = Qᵀ, and det(Qᵀ)det Q = 1 with det Qᵀ = det Q gives (det Q)² = 1."},
  {n:"Singular Value Decomposition",s:"Every m × n matrix can be written A = UΣVᵀ. Keeping only the largest k singular values gives the best rank-k approximation of A.",pi:1,
   p:"AᵀA is symmetric, so by the Spectral Theorem it has an orthonormal basis of eigenvectors v<sub>i</sub> with eigenvalues λ<sub>i</sub> ≥ 0. Set σ<sub>i</sub> = √λ<sub>i</sub> and u<sub>i</sub> = Av<sub>i</sub>/σ<sub>i</sub>; these u<sub>i</sub> are orthonormal. (Best approximation: the Eckart–Young theorem.)"}
 ],
 mist:["Using the projection formula y·u/u·u with a non-orthogonal basis of W (orthogonalize first with Gram–Schmidt).","Forgetting to normalize when an orthonormal basis or Q is asked for.","Solving Ax = b directly when it is inconsistent instead of AᵀAx = Aᵀb.","Thinking every matrix with orthogonal columns is an orthogonal matrix (the columns must also be unit vectors, and Q must be square)."],
 apps:[
  ["Regression and machine learning","The least-squares line from AP Statistics is exactly the normal-equations solution. Most ML models start with least squares."],
  ["GPS","Your phone receives more satellite signals than it needs and finds the position that fits them best by least squares."],
  ["Signals and Fourier series","sin x, sin 2x, … are orthogonal functions, so each coefficient is a projection (PDE Unit 3)."],
  ["Image compression and recommendations","The SVD keeps the most important parts of a photo, and was the core idea of the winning Netflix Prize recommendation systems."],
  ["3D graphics","Rotation matrices are orthogonal, so they keep objects rigid: no stretching."]
 ],
 ways:[{q:"Fit the least-squares line y = c<sub>0</sub> + c<sub>1</sub>x to the points (0, 1), (1, 2), (2, 4).",m:[
  ["Way 1: Normal equations",["A = [1 0; 1 1; 1 2], b = (1, 2, 4).","AᵀA = [3 3; 3 5], Aᵀb = (7, 10).","Solve 3c<sub>0</sub> + 3c<sub>1</sub> = 7 and 3c<sub>0</sub> + 5c<sub>1</sub> = 10: c<sub>1</sub> = 3/2, c<sub>0</sub> = 5/6.","ŷ = 5/6 + 1.5x."]],
  ["Way 2: AP Statistics formulas",["x̄ = 1, ȳ = 7/3.","Slope = Σ(x − x̄)(y − ȳ) / Σ(x − x̄)² = [(−1)(−4/3) + 0 + (1)(5/3)] / 2 = 3/2.","Intercept = ȳ − slope·x̄ = 7/3 − 3/2 = 5/6.","Same line: ŷ = 5/6 + 1.5x."]]],
  note:"The statistics formula is quick for one variable. The normal equations work for any number of variables (multiple regression, curve fitting with x², …) and show why the formula works: the residuals are orthogonal to the columns of A."}],
 study:unitStudy("Lectures 14–17 and 29 (orthogonal subspaces; projections; least squares; Gram–Schmidt; singular value decomposition)","Chapter 6, Orthogonality","Chapter Three, Section VI (projection)","Dot products and duality")
}
};
})();
