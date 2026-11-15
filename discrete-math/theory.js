/* Z-Discrete Math: Theory (definitions, theorems, proofs, counterexamples) and Uses & resources. Read by zbook.js. */
(function(){
const OCW="https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/";
const LEV="https://discrete.openmathbooks.org";
const BOP="https://richardhammack.github.io/BookOfProof/";
const st=(mit,lev,bop,extra)=>[
 {k:"free",l:1,t:"Levin, Discrete Mathematics: An Open Introduction: "+lev,by:"Free textbook with solutions",u:LEV},
 ...(bop?[{k:"free",l:1,t:"Hammack, Book of Proof: "+bop,by:"Free textbook on how to write proofs",u:BOP}]:[]),
 {k:"watch",l:2,t:"MIT 6.042J Mathematics for Computer Science: "+mit,by:"MIT OpenCourseWare: lectures, free textbook, exams with solutions",u:OCW},
 ...(extra||[])];

window.ZT={
_course:[
 {k:"free",l:1,t:"Discrete Mathematics: An Open Introduction",by:"Oscar Levin",u:LEV,d:"Free, friendly textbook (counting, sequences, logic and proofs, graphs) with about 475 exercises and solutions."},
 {k:"free",l:1,t:"Book of Proof",by:"Richard Hammack",u:BOP,d:"The best free introduction to writing proofs: direct, contrapositive, contradiction, induction, cardinality."},
 {k:"watch",l:1,t:"Dr. Trefor Bazett: Discrete Math",by:"YouTube",u:"https://www.youtube.com/@DrTrefor",d:"Clear video lectures covering a full discrete math course."},
 {k:"watch",l:2,t:"MIT 6.042J Mathematics for Computer Science",by:"MIT OpenCourseWare",u:OCW,d:"Lectures, the free textbook by Lehman, Leighton & Meyer, problem sets and exams with solutions."},
 {k:"play",l:2,t:"VisuAlgo",by:"National University of Singapore",u:"https://visualgo.net",d:"Animations of graph algorithms (BFS, DFS, shortest paths, spanning trees), sorting and more."},
 {k:"practice",l:2,t:"Project Euler",u:"https://projecteuler.net",d:"Number theory and counting puzzles solved with short programs."},
 {k:"practice",l:2,t:"Art of Problem Solving",u:"https://artofproblemsolving.com",d:"Competition counting, probability and number theory, with a free community and forums."},
 {k:"read",l:1,t:"Z-Frontiers: where discrete math leads",by:"this website",u:"../frontiers/#from-discrete-math",d:"Cryptography, AI, networks, game theory and optimization."}
],

/* ---------------- Unit 1: Logic ---------------- */
u1:{
 defs:[
  ["Proposition","A statement that is either true or false (not both).","“7 is prime” is a proposition; “x + 1 = 3” is not (it depends on x); “Close the door” is not."],
  ["Connectives","¬p (not), p ∧ q (and), p ∨ q (inclusive or), p → q (if p then q), p ↔ q (if and only if).",""],
  ["Conditional p → q","False only when p is true and q is false. p is the hypothesis, q the conclusion.","“If it rains, the ground is wet” is broken only by rain on dry ground."],
  ["Converse, inverse, contrapositive","For p → q: converse q → p; inverse ¬p → ¬q; contrapositive ¬q → ¬p.",""],
  ["Tautology, contradiction, logical equivalence","A tautology is always true; a contradiction is always false. P ≡ Q means P ↔ Q is a tautology (same truth table).","p ∨ ¬p is a tautology."],
  ["Predicate and quantifiers","A predicate P(x) becomes a proposition when x is chosen. ∀x P(x): “for every x”. ∃x P(x): “there exists an x”.",""],
  ["Valid argument","An argument is valid if the conclusion must be true whenever all premises are true.",""]
 ],
 thms:[
  {n:"Contrapositive",s:"p → q is logically equivalent to its contrapositive ¬q → ¬p.",
   p:"Both are false in exactly one row of the truth table: p true, q false (for ¬q → ¬p this row is ¬q true and ¬p false). In every other row both are true.",
   ce:"The converse is NOT equivalent: “if x = 2 then x² = 4” is true, but “if x² = 4 then x = 2” is false (x = −2)."},
  {n:"De Morgan's laws",s:"¬(p ∧ q) ≡ ¬p ∨ ¬q and ¬(p ∨ q) ≡ ¬p ∧ ¬q.",p:"Compare the four rows of the truth tables. ¬(p ∧ q) is false only when both are true, and so is ¬p ∨ ¬q."},
  {n:"Conditional as “or”",s:"p → q ≡ ¬p ∨ q, and therefore ¬(p → q) ≡ p ∧ ¬q.",p:"Both sides are false only when p is true and q is false. Negating with De Morgan: ¬(¬p ∨ q) ≡ p ∧ ¬q.",
   ce:"The negation of “if it rains, I bring an umbrella” is “it rains and I don't bring an umbrella”, NOT “if it rains, I don't bring an umbrella”."},
  {n:"Negating quantifiers",s:"¬∀x P(x) ≡ ∃x ¬P(x), and ¬∃x P(x) ≡ ∀x ¬P(x).",p:"“Not every x works” means some x fails; “no x works” means every x fails.",
   ce:"Order of quantifiers matters: ∀x ∃y (y &gt; x) is true for integers (take y = x + 1), but ∃y ∀x (y &gt; x) is false (no largest integer)."},
  {n:"Basic rules of inference",s:"Modus ponens: p, p → q ⊢ q. Modus tollens: ¬q, p → q ⊢ ¬p. Hypothetical syllogism: p → q, q → r ⊢ p → r. Disjunctive syllogism: p ∨ q, ¬p ⊢ q.",
   p:"Each is a tautology, e.g. (p ∧ (p → q)) → q; check the truth table.",
   ce:"Common fallacies are NOT valid: affirming the conclusion (q, p → q ⊢ p) and denying the hypothesis (¬p, p → q ⊢ ¬q)."}
 ],
 mist:["Thinking p → q is false when p is false (it is true: “vacuously true”).","Negating “for all x, P” as “for all x, not P”.","Treating “or” as exclusive.","Confusing a statement with its converse."],
 apps:[
  ["Computer circuits","Every chip is built from AND, OR and NOT gates. Simplifying a logic formula means fewer transistors."],
  ["Programming","Every if statement and loop condition is propositional logic; De Morgan rewrites !(a && b) as !a || !b."],
  ["Databases and search","Search filters (“price &lt; 50 AND rating ≥ 4”) and SQL WHERE clauses are predicate logic."],
  ["Proof checkers and AI","Computers verify proofs (Lean, Coq) and solve logic puzzles and scheduling problems with SAT solvers."]
 ],
 ways:[{q:"Show that ¬(p → q) ≡ p ∧ ¬q.",m:[
  ["Way 1: Truth table",["Rows (p, q): TT, TF, FT, FF.","p → q: T, F, T, T, so ¬(p → q): F, T, F, F.","p ∧ ¬q: F, T, F, F. The columns match."]],
  ["Way 2: Laws of logic",["p → q ≡ ¬p ∨ q.","¬(¬p ∨ q) ≡ ¬¬p ∧ ¬q (De Morgan).","≡ p ∧ ¬q (double negation)."]]],
  note:"A truth table always works but grows as 2ⁿ rows for n variables. Algebraic laws scale better and are how computers simplify circuits."}],
 study:st("Lectures on propositions and logic","Chapter 0 (logic) and Chapter 3, Symbolic Logic and Proofs","Chapters 2–3 (Logic)")
},

/* ---------------- Unit 2: Proofs ---------------- */
u2:{
 defs:[
  ["Theorem, lemma, corollary","A theorem is a proved statement. A lemma is a helper theorem; a corollary follows quickly from a theorem.",""],
  ["Even, odd, divides","n is even if n = 2k, odd if n = 2k + 1 for some integer k. a | b (a divides b) if b = ak for some integer k.",""],
  ["Rational number","A number that can be written p/q with integers p, q and q ≠ 0.",""],
  ["Direct proof","Assume the hypothesis p and reach the conclusion q by logical steps.",""],
  ["Proof by contrapositive","Prove ¬q → ¬p instead of p → q.",""],
  ["Proof by contradiction","Assume the statement is false and derive something impossible.",""],
  ["Counterexample","A single example showing that a “for all” statement is false.",""],
  ["Mathematical induction","To prove P(n) for all n ≥ n<sub>0</sub>: prove P(n<sub>0</sub>) (base case), then prove P(k) → P(k + 1) for every k ≥ n<sub>0</sub> (inductive step). Strong induction may assume P(n<sub>0</sub>), …, P(k).",""]
 ],
 thms:[
  {n:"Sum of odd numbers (direct proof)",s:"The sum of two odd integers is even.",p:"Let a = 2j + 1 and b = 2k + 1. Then a + b = 2j + 2k + 2 = 2(j + k + 1), which is even."},
  {n:"Contrapositive proof",s:"If n² is even, then n is even.",p:"Contrapositive: if n is odd, then n² is odd. Let n = 2k + 1; n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1, which is odd."},
  {n:"√2 is irrational (contradiction)",s:"There are no integers p, q with (p/q)² = 2.",p:"Suppose √2 = p/q in lowest terms. Then p² = 2q², so p² is even, so p is even (previous theorem): p = 2r. Then 4r² = 2q², so q² = 2r² and q is even too. Both even contradicts lowest terms."},
  {n:"Infinitely many primes (Euclid)",s:"There is no largest prime.",p:"Suppose p<sub>1</sub>, …, p<sub>n</sub> were all the primes. N = p<sub>1</sub>p<sub>2</sub>…p<sub>n</sub> + 1 leaves remainder 1 when divided by each p<sub>i</sub>, but N &gt; 1 has some prime factor. That prime is not on the list: contradiction.",
   ce:"N itself need not be prime: 2·3·5·7·11·13 + 1 = 30031 = 59 · 509. The proof only needs N to have a prime factor not on the list."},
  {n:"Principle of induction",s:"If P(n<sub>0</sub>) is true and P(k) → P(k + 1) for every k ≥ n<sub>0</sub>, then P(n) is true for every n ≥ n<sub>0</sub>.",pi:1,
   p:"If some P(n) failed, take the smallest failing n (well-ordering principle). n ≠ n<sub>0</sub> because the base case holds, so P(n − 1) is true, and the inductive step forces P(n): contradiction.",
   ce:"Both parts are needed. P(n): “n = n + 1” satisfies the inductive step (if k = k + 1 then k + 1 = k + 2) but has no true base case. And “n² − n + 41 is prime” holds for n = 1, …, 40 but fails at n = 41 (41²): checking many cases is not a proof."},
  {n:"Sum formula (induction)",s:"1 + 2 + … + n = n(n + 1)/2 for every n ≥ 1.",p:"Base: n = 1 gives 1 = 1·2/2. Step: if 1 + … + k = k(k + 1)/2, then adding k + 1 gives k(k + 1)/2 + (k + 1) = (k + 1)(k + 2)/2, the formula for k + 1."},
  {n:"Fundamental Theorem of Arithmetic (strong induction)",s:"Every integer n ≥ 2 is a product of primes, and this factorization is unique apart from order.",pi:1,
   p:"Existence by strong induction: if n is prime, done; otherwise n = ab with 2 ≤ a, b &lt; n, and both a and b are products of primes. Uniqueness uses Euclid's lemma (if a prime divides ab it divides a or b; Unit 5).",
   ce:"Uniqueness is not automatic: among the numbers 1, 4, 7, 10, … (of the form 3k + 1), 100 = 4·25 = 10·10, and 4, 25, 10 cannot be factored further within that set."}
 ],
 mist:["Proving a “for all” statement with examples.","Assuming what you want to prove (circular reasoning).","Forgetting the base case, or proving the inductive step only for one k.","Using the same letter k for two different integers (a = 2k, b = 2k forces a = b)."],
 apps:[
  ["Computer science","Induction proves that algorithms and loops are correct (loop invariants) and that recursive programs finish."],
  ["Security","Cryptographic systems come with proofs that breaking them is as hard as a known hard problem."],
  ["Software verification","Airplane and medical-device software is checked with machine proofs."],
  ["Thinking skills","Law, philosophy and science all rely on valid arguments and spotting counterexamples."]
 ],
 ways:[{q:"Prove 1 + 3 + 5 + … + (2n − 1) = n².",m:[
  ["Way 1: Induction",["Base: n = 1 gives 1 = 1².","Assume 1 + 3 + … + (2k − 1) = k².","Add 2k + 1: k² + 2k + 1 = (k + 1)² ✓."]],
  ["Way 2: Direct with a known formula",["The sum is Σ(2i − 1) = 2Σi − n.","= 2·n(n + 1)/2 − n = n² + n − n = n²."]],
  ["Way 3: Picture",["Arrange dots in an n × n square.","Each new odd number 2k − 1 is an L-shape that grows a (k − 1) × (k − 1) square into a k × k square."]]],
  note:"Induction verifies a formula you already have. The direct proof reuses known results. The picture explains WHY it's true, and often helps you guess formulas in the first place."}],
 study:st("Lectures on proofs, induction and strong induction","Chapter 3 (proofs) and Section 2.5 (induction)","Chapters 4–6 and 10 (direct, contrapositive, contradiction, induction)")
},

/* ---------------- Unit 3: Sets, functions, relations ---------------- */
u3:{
 defs:[
  ["Set; element; subset","A set is a collection of distinct objects (elements). A ⊆ B if every element of A is in B. ∅ is the empty set.",""],
  ["Set operations","A ∪ B (union), A ∩ B (intersection), A − B (difference), Aᶜ (complement), A × B = {(a, b)} (Cartesian product), P(A) (power set: all subsets).","|P(A)| = 2<sup>|A|</sup>."],
  ["Function","f: A → B assigns to each a in A exactly one f(a) in B. A is the domain, B the codomain, f(A) the range.",""],
  ["Injective, surjective, bijective","Injective (one-to-one): f(a) = f(a′) ⇒ a = a′. Surjective (onto): every b is hit. Bijective: both; then f has an inverse.",""],
  ["Relation","A subset R of A × A. Reflexive (aRa), symmetric (aRb ⇒ bRa), antisymmetric (aRb and bRa ⇒ a = b), transitive (aRb, bRc ⇒ aRc).",""],
  ["Equivalence relation; equivalence class","Reflexive, symmetric and transitive. The class [a] is the set of everything related to a.","“Same remainder mod 3” on ℤ has classes [0], [1], [2]."],
  ["Partial order","Reflexive, antisymmetric and transitive.","“divides” on positive integers; ⊆ on sets."],
  ["Cardinality; countable","Sets have the same cardinality if there is a bijection between them. A set is countable if it is finite or has the cardinality of ℕ = {1, 2, 3, …}.",""]
 ],
 thms:[
  {n:"De Morgan for sets",s:"(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ and (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ.",p:"x ∈ (A ∪ B)ᶜ ⇔ ¬(x ∈ A ∨ x ∈ B) ⇔ x ∉ A ∧ x ∉ B ⇔ x ∈ Aᶜ ∩ Bᶜ. Same logic as Unit 1."},
  {n:"Power set size",s:"A set with n elements has 2<sup>n</sup> subsets.",p:"For each of the n elements, decide in or out: 2 · 2 · … · 2 = 2<sup>n</sup> choices (multiplication principle)."},
  {n:"Inverse functions",s:"f: A → B has an inverse function f<sup>−1</sup>: B → A if and only if f is bijective.",p:"If f is bijective, each b has exactly one a with f(a) = b; define f<sup>−1</sup>(b) = a. If f is not injective, f<sup>−1</sup>(b) would need two values; if not surjective, some b has no value.",
   ce:"f(x) = x² on ℝ has no inverse (f(2) = f(−2)). Restricting the domain to x ≥ 0 makes it a bijection onto [0, ∞) with inverse √x."},
  {n:"Equivalence classes partition the set",s:"The equivalence classes of an equivalence relation on A are nonempty, cover A, and any two are either equal or disjoint.",
   p:"a ∈ [a] by reflexivity. If c ∈ [a] ∩ [b], then a ~ c and c ~ b (symmetry), so a ~ b (transitivity), and then every element of [a] is in [b] and vice versa."},
  {n:"Pigeonhole principle",s:"If more than n objects are placed in n boxes, some box contains at least two objects. More generally, some box has at least ⌈N/n⌉ of N objects.",p:"If every box had at most one object, there would be at most n objects. Contradiction."},
  {n:"ℤ and ℚ are countable",s:"The integers and the rational numbers are countable (as “many” as the natural numbers).",
   p:"List ℤ as 0, 1, −1, 2, −2, …. For positive rationals, list fractions p/q in diagonals of a table by p + q = 2, 3, 4, …, skipping repeats; then interleave negatives."},
  {n:"Cantor: ℝ is uncountable",s:"There is no list containing every real number between 0 and 1. Some infinities are bigger than others.",
   p:"Given any list x<sub>1</sub>, x<sub>2</sub>, … written as decimals, build y whose n-th digit is 5 if the n-th digit of x<sub>n</sub> is not 5, and 4 if it is. Then y differs from every x<sub>n</sub> in the n-th digit, so y is missing from the list (diagonal argument).",
   ce:"Being infinite is not enough to be uncountable: ℚ is “dense” (between any two reals) but still countable."}
 ],
 mist:["Confusing ∈ with ⊆ (2 ∈ {1, 2} but {2} ⊆ {1, 2}).","Forgetting that ∅ is a subset of every set.","Checking only reflexive and symmetric and calling a relation an equivalence relation.","Claiming a function is onto without fixing the codomain."],
 apps:[
  ["Databases","Tables are relations; SQL joins are built from Cartesian products and intersections."],
  ["Hashing","A hash function maps many inputs to fewer outputs. By pigeonhole, collisions must happen; good hash functions make them rare."],
  ["Equivalence in programming","Grouping items by a key (same remainder, same category) is forming equivalence classes."],
  ["Scheduling","Partial orders describe which tasks must come before others (course prerequisites, build systems)."],
  ["Limits of computation","Cantor's diagonal argument proves that some problems can never be solved by any computer (Turing's halting problem)."]
 ],
 ways:[{q:"Show that f(x) = 3x + 2 is a bijection from ℝ to ℝ.",m:[
  ["Way 1: Injective and surjective separately",["Injective: 3a + 2 = 3b + 2 ⇒ a = b.","Surjective: given y, x = (y − 2)/3 gives f(x) = y.","Both, so f is bijective."]],
  ["Way 2: Find the inverse",["Solve y = 3x + 2: x = (y − 2)/3.","g(y) = (y − 2)/3 satisfies g(f(x)) = x and f(g(y)) = y.","A function with a two-sided inverse is a bijection."]]],
  note:"Checking injective and surjective separately tells you which part fails when something isn't a bijection. Finding the inverse is faster when you can solve for x."}],
 study:st("Lectures on sets, functions, relations and cardinality","Sections 0.3–0.4 (sets, functions)","Chapters 1, 11–14 (sets, relations, functions, cardinality)")
},

/* ---------------- Unit 4: Counting ---------------- */
u4:{
 defs:[
  ["Addition and multiplication principles","If a task can be done in m ways OR (disjointly) n ways: m + n. If it is a sequence of steps with m and then n ways: m · n.",""],
  ["Permutation","An ordered arrangement. P(n, k) = n!/(n − k)! ordered lists of k items from n.",""],
  ["Combination","An unordered selection. C(n, k) = n!/(k!(n − k)!) subsets of size k.",""],
  ["Binomial coefficient","C(n, k), also written “n choose k”: the coefficient of x<sup>k</sup> in (1 + x)<sup>n</sup>.",""],
  ["Combinations with repetition (stars and bars)","The number of ways to choose k items from n types, repetition allowed: C(n + k − 1, k).",""],
  ["Combinatorial proof","Proving an identity by showing both sides count the same set.",""],
  ["Derangement","A permutation with no element in its original position.",""]
 ],
 thms:[
  {n:"Permutation and combination formulas",s:"P(n, k) = n(n − 1)…(n − k + 1) = n!/(n − k)! and C(n, k) = P(n, k)/k!.",p:"Multiplication principle for ordered choices. Each unordered set of k items appears k! times among the ordered lists, so divide by k!."},
  {n:"Symmetry and Pascal's identity",s:"C(n, k) = C(n, n − k) and C(n, k) = C(n − 1, k − 1) + C(n − 1, k).",
   p:"Choosing the k to take is the same as choosing the n − k to leave. For Pascal: fix one person; subsets of size k either contain that person (choose k − 1 of the other n − 1) or not (choose k of the other n − 1)."},
  {n:"Binomial Theorem",s:"(x + y)<sup>n</sup> = Σ<sub>k=0</sub><sup>n</sup> C(n, k)x<sup>k</sup>y<sup>n−k</sup>.",
   p:"Expanding the product of n factors (x + y) picks x or y from each factor. The term x<sup>k</sup>y<sup>n−k</sup> appears once for each way to choose which k factors give x: C(n, k) ways.",
   ce:"Setting x = y = 1 gives Σ C(n, k) = 2<sup>n</sup>, matching the power-set count. Setting x = −1, y = 1 shows there are as many even-size subsets as odd-size ones."},
  {n:"Inclusion–exclusion",s:"|A ∪ B| = |A| + |B| − |A ∩ B|; |A ∪ B ∪ C| = |A| + |B| + |C| − |A ∩ B| − |A ∩ C| − |B ∩ C| + |A ∩ B ∩ C|.",
   p:"An element in exactly one set is counted once. An element in two sets is counted 2 − 1 = 1 time. In all three: 3 − 3 + 1 = 1 time."},
  {n:"Stars and bars",s:"The number of solutions of x<sub>1</sub> + … + x<sub>n</sub> = k in non-negative integers is C(n + k − 1, n − 1).",
   p:"Write k stars and n − 1 bars in a row; the bars split the stars into n groups. Choose which n − 1 of the n + k − 1 positions are bars."},
  {n:"Derangements",s:"The number of derangements of n items is D<sub>n</sub> = n!(1 − 1/1! + 1/2! − … + (−1)<sup>n</sup>/n!), which is close to n!/e.",pi:1,
   p:"Inclusion–exclusion on the sets A<sub>i</sub> = “item i stays in place”: |A<sub>i<sub>1</sub></sub> ∩ … ∩ A<sub>i<sub>j</sub></sub>| = (n − j)!, and there are C(n, j) such intersections."}
 ],
 mist:["Using permutations when order doesn't matter (or the reverse).","Double counting: choosing a president “first” and then a committee that may include them.","Forgetting to subtract overlaps (inclusion–exclusion).","Adding when steps happen in sequence (multiply) or multiplying for “either/or” (add)."],
 apps:[
  ["Passwords and security","Counting possible passwords (e.g. 62⁸ ≈ 2 × 10¹⁴) tells how long a brute-force attack would take."],
  ["Probability","Probability with equally likely outcomes is counting: favorable / total. Lotteries, poker hands, genetics."],
  ["Algorithms","Counting the number of steps or possible inputs tells how fast an algorithm can be."],
  ["Chemistry and biology","Counting molecular structures and DNA sequences (4 letters, so 4<sup>n</sup> sequences of length n)."]
 ],
 ways:[{q:"How many 5-card hands from a 52-card deck contain at least one ace?",m:[
  ["Way 1: Complement",["All hands: C(52, 5) = 2,598,960.","Hands with no ace: C(48, 5) = 1,712,304.","At least one ace: 2,598,960 − 1,712,304 = 886,656."]],
  ["Way 2: Add the cases",["Exactly j aces: C(4, j)·C(48, 5 − j).","j = 1: 4·194,580 = 778,320; j = 2: 6·17,296 = 103,776; j = 3: 4·1,128 = 4,512; j = 4: 1·48 = 48.","Total: 886,656 ✓."]]],
  note:"“At least one” is almost always fastest with the complement. Splitting into cases takes longer but also gives the count for each case. A common wrong method, 4 · C(51, 4), counts hands with several aces more than once."}],
 study:st("Lectures on counting rules and the pigeonhole principle","Chapter 1, Counting","Chapter 3, Counting")
},

/* ---------------- Unit 5: Number theory ---------------- */
u5:{
 defs:[
  ["Division algorithm","For integers a and b &gt; 0 there are unique integers q, r with a = bq + r and 0 ≤ r &lt; b.",""],
  ["gcd and lcm","gcd(a, b) is the largest integer dividing both; lcm(a, b) the smallest positive common multiple. a and b are relatively prime if gcd = 1.",""],
  ["Prime","An integer p ≥ 2 whose only positive divisors are 1 and p.",""],
  ["Congruence","a ≡ b (mod n) if n | (a − b), i.e. a and b have the same remainder when divided by n.","17 ≡ 2 (mod 5)."],
  ["Modular inverse","a<sup>−1</sup> mod n is a number x with ax ≡ 1 (mod n).","3 · 5 = 15 ≡ 1 (mod 7), so 3<sup>−1</sup> ≡ 5 (mod 7)."],
  ["Euler's totient φ(n)","The number of integers from 1 to n that are relatively prime to n.","φ(10) = 4 (1, 3, 7, 9); φ(p) = p − 1 for a prime p."]
 ],
 thms:[
  {n:"Euclidean algorithm",s:"gcd(a, b) = gcd(b, a mod b). Repeating this reaches gcd(d, 0) = d in a few steps.",p:"If a = bq + r, any common divisor of a and b divides r = a − bq, and any common divisor of b and r divides a = bq + r. So the pairs (a, b) and (b, r) have the same common divisors."},
  {n:"Bézout's identity",s:"For any integers a, b (not both 0), there are integers x, y with ax + by = gcd(a, b).",pi:1,
   p:"Run the Euclidean algorithm backwards (extended Euclidean algorithm). Alternatively, the smallest positive number of the form ax + by divides both a and b and is divisible by every common divisor."},
  {n:"Modular inverses exist exactly for coprime numbers",s:"a has an inverse mod n if and only if gcd(a, n) = 1.",
   p:"If gcd = 1, Bézout gives ax + ny = 1, so ax ≡ 1 (mod n). If d = gcd(a, n) &gt; 1, then ax − 1 = ny would be divisible by d while ax is too, forcing d | 1.",
   ce:"2 has no inverse mod 6: 2x is always even, so 2x mod 6 ∈ {0, 2, 4}, never 1."},
  {n:"Euclid's lemma",s:"If a prime p divides ab, then p | a or p | b.",p:"If p ∤ a then gcd(a, p) = 1, so ax + py = 1. Multiply by b: abx + pby = b. p divides both terms on the left, so p | b.",
   ce:"Needs p prime: 6 | 4·9 = 36, but 6 ∤ 4 and 6 ∤ 9."},
  {n:"Fermat's Little Theorem",s:"If p is prime and p ∤ a, then a<sup>p−1</sup> ≡ 1 (mod p).",pi:1,
   p:"The numbers a, 2a, …, (p − 1)a are all different mod p (if ia ≡ ja, cancel a using its inverse) and none is 0, so they are 1, 2, …, p − 1 in some order. Multiply them all: a<sup>p−1</sup>(p − 1)! ≡ (p − 1)!, and cancel (p − 1)!.",
   ce:"The converse fails: 561 = 3·11·17 is not prime, yet a<sup>560</sup> ≡ 1 (mod 561) for every a coprime to 561 (a Carmichael number). So Fermat's test can be fooled."},
  {n:"Euler's theorem",s:"If gcd(a, n) = 1, then a<sup>φ(n)</sup> ≡ 1 (mod n). For n = pq (distinct primes), φ(n) = (p − 1)(q − 1).",pi:1,
   p:"Same idea as Fermat: multiplying by a permutes the φ(n) numbers coprime to n. For φ(pq): of the pq numbers, q are multiples of p and p are multiples of q, with pq counted twice, leaving pq − p − q + 1."},
  {n:"Chinese Remainder Theorem",s:"If n<sub>1</sub>, …, n<sub>k</sub> are pairwise coprime, the system x ≡ a<sub>i</sub> (mod n<sub>i</sub>) has exactly one solution mod n<sub>1</sub>n<sub>2</sub>…n<sub>k</sub>.",pi:1,
   p:"For two moduli: write 1 = n<sub>1</sub>u + n<sub>2</sub>v (Bézout). Then x = a<sub>1</sub>n<sub>2</sub>v + a<sub>2</sub>n<sub>1</sub>u works. Two solutions differ by a multiple of both n<sub>1</sub> and n<sub>2</sub>, hence of their product.",
   ce:"Coprimality matters: x ≡ 1 (mod 4) and x ≡ 2 (mod 6) has no solution (the first makes x odd, the second even)."}
 ],
 mist:["“Dividing” in a congruence without checking that the number is invertible mod n.","Forgetting that −3 mod 7 is 4, not −3 (remainders are 0 to n − 1).","Using Fermat's theorem for a non-prime modulus.","Thinking gcd(a, b) = 1 means a or b is prime (8 and 15 are coprime)."],
 apps:[
  ["RSA encryption","Choose primes p, q, publish n = pq and e; the private key is d = e<sup>−1</sup> mod φ(n). Euler's theorem makes decryption work. (Try it in Z-Frontiers → Cryptography.)"],
  ["Check digits","ISBN, UPC and credit-card numbers include a digit computed mod 10 or mod 11 so typos are detected."],
  ["Calendars and clocks","Day of the week is arithmetic mod 7; clock time is mod 12 or 24."],
  ["Hashing and random numbers","Computers generate pseudo-random numbers with x<sub>n+1</sub> = (ax<sub>n</sub> + c) mod m."]
 ],
 ways:[{q:"Find 3<sup>100</sup> mod 7.",m:[
  ["Way 1: Fermat's Little Theorem",["7 is prime and 7 ∤ 3, so 3<sup>6</sup> ≡ 1 (mod 7).","100 = 6·16 + 4, so 3<sup>100</sup> ≡ (3<sup>6</sup>)<sup>16</sup>·3<sup>4</sup> ≡ 3<sup>4</sup>.","3<sup>4</sup> = 81 = 77 + 4 ≡ 4 (mod 7)."]],
  ["Way 2: Repeated squaring",["3<sup>2</sup> ≡ 2, 3<sup>4</sup> ≡ 4, 3<sup>8</sup> ≡ 16 ≡ 2, 3<sup>16</sup> ≡ 4, 3<sup>32</sup> ≡ 2, 3<sup>64</sup> ≡ 4 (mod 7).","100 = 64 + 32 + 4.","3<sup>100</sup> ≡ 4 · 2 · 4 = 32 ≡ 4 (mod 7)."]]],
  note:"Fermat is fastest for a prime modulus. Repeated squaring works for any modulus and is exactly how computers compute RSA with 600-digit numbers."}],
 study:st("Lectures on number theory, gcd and modular arithmetic, RSA","Number Theory section (Additional Topics chapter)",null,[{k:"free",l:1,t:"Khan Academy: Journey into Cryptography",by:"Modular arithmetic and RSA",u:"https://www.khanacademy.org/computing/computer-science/cryptography"}])
},

/* ---------------- Unit 6: Recurrences ---------------- */
u6:{
 defs:[
  ["Sequence and recurrence relation","A recurrence defines a<sub>n</sub> from earlier terms, e.g. a<sub>n</sub> = a<sub>n−1</sub> + a<sub>n−2</sub>, together with initial conditions.",""],
  ["Closed form","A formula for a<sub>n</sub> that uses only n.","a<sub>n</sub> = 2a<sub>n−1</sub>, a<sub>0</sub> = 3 has closed form a<sub>n</sub> = 3·2<sup>n</sup>."],
  ["Linear homogeneous recurrence with constant coefficients","a<sub>n</sub> = c<sub>1</sub>a<sub>n−1</sub> + … + c<sub>k</sub>a<sub>n−k</sub>. Its characteristic equation is r<sup>k</sup> = c<sub>1</sub>r<sup>k−1</sup> + … + c<sub>k</sub>.",""],
  ["Arithmetic and geometric sequences","a<sub>n</sub> = a<sub>n−1</sub> + d gives a<sub>0</sub> + nd; a<sub>n</sub> = r·a<sub>n−1</sub> gives a<sub>0</sub>r<sup>n</sup>.",""],
  ["Big-O notation","f(n) = O(g(n)) if f(n) ≤ C·g(n) for some constant C and all large n. It describes how fast a quantity (like an algorithm's running time) grows.","3n² + 5n + 2 = O(n²)."]
 ],
 thms:[
  {n:"Characteristic roots, distinct",s:"If the characteristic equation r² = c<sub>1</sub>r + c<sub>2</sub> has distinct roots r<sub>1</sub>, r<sub>2</sub>, every solution of a<sub>n</sub> = c<sub>1</sub>a<sub>n−1</sub> + c<sub>2</sub>a<sub>n−2</sub> is a<sub>n</sub> = Ar<sub>1</sub><sup>n</sup> + Br<sub>2</sub><sup>n</sup>; A and B come from the initial conditions.",
   p:"r<sup>n</sup> solves the recurrence exactly when r² = c<sub>1</sub>r + c<sub>2</sub>. Sums of solutions are solutions (linearity). Two initial values determine the sequence, and A, B can always match them because r<sub>1</sub> ≠ r<sub>2</sub> (a 2 × 2 system with nonzero determinant)."},
  {n:"Repeated root",s:"If the characteristic equation has a double root r, the general solution is a<sub>n</sub> = (A + Bn)r<sup>n</sup>.",
   p:"Substitute nr<sup>n</sup>: it works because r is a double root (the derivative of the characteristic polynomial is also 0 at r).",
   ce:"Using only Ar<sup>n</sup> fails: a<sub>n</sub> = 4a<sub>n−1</sub> − 4a<sub>n−2</sub>, a<sub>0</sub> = 1, a<sub>1</sub> = 4 gives r = 2 twice; A·2<sup>n</sup> can't match both values, but (1 + n)2<sup>n</sup> does."},
  {n:"Binet's formula",s:"The Fibonacci numbers satisfy F<sub>n</sub> = (φ<sup>n</sup> − ψ<sup>n</sup>)/√5, where φ = (1 + √5)/2 and ψ = (1 − √5)/2.",
   p:"Characteristic equation r² = r + 1 has roots φ, ψ. Solve A + B = 0 (F<sub>0</sub> = 0) and Aφ + Bψ = 1 (F<sub>1</sub> = 1): A = 1/√5, B = −1/√5."},
  {n:"Divide and conquer (Master Theorem, simple case)",s:"If T(n) = 2T(n/2) + cn, then T(n) = O(n log n). If T(n) = T(n/2) + c, then T(n) = O(log n).",pi:1,
   p:"Draw the recursion tree: for 2T(n/2) + cn each of the log<sub>2</sub>n levels does a total of cn work. For T(n/2) + c there are log<sub>2</sub>n levels with c work each.",
   ce:"Growth rates matter enormously: for n = 1,000,000, n log<sub>2</sub>n ≈ 20 million steps but n² = 10¹² steps. That is the difference between merge sort and selection sort."},
  {n:"Big-O rules",s:"Constants and lower-order terms don't matter: a<sub>k</sub>n<sup>k</sup> + … + a<sub>0</sub> = O(n<sup>k</sup>). Also log n = O(n<sup>ε</sup>) for any ε &gt; 0, and n<sup>k</sup> = O(2<sup>n</sup>).",
   p:"For n ≥ 1, |a<sub>k</sub>n<sup>k</sup> + … + a<sub>0</sub>| ≤ (|a<sub>k</sub>| + … + |a<sub>0</sub>|)n<sup>k</sup>. The other comparisons follow from limits (L'Hôpital's rule)."}
 ],
 mist:["Forgetting initial conditions (the closed form has unknown constants without them).","Using Ar<sup>n</sup> + Br<sup>n</sup> for a double root.","Indexing errors: checking a closed form at n = 1 when the sequence starts at n = 0.","Thinking O(n²) means “exactly n² steps” (it is an upper bound on growth)."],
 apps:[
  ["Algorithm analysis","Recurrences give the running time of recursive algorithms: binary search O(log n), merge sort O(n log n)."],
  ["Finance","Loan balances satisfy B<sub>n</sub> = (1 + r)B<sub>n−1</sub> − P, a first-order linear recurrence (Algebra 2 annuities)."],
  ["Population models","Rabbits (Fibonacci), Leslie matrices and the logistic map are recurrences."],
  ["Counting","Many counting problems (tilings, binary strings with no two 1s in a row) satisfy Fibonacci-type recurrences."]
 ],
 ways:[{q:"Solve a<sub>n</sub> = 5a<sub>n−1</sub> − 6a<sub>n−2</sub> with a<sub>0</sub> = 1, a<sub>1</sub> = 4.",m:[
  ["Way 1: Characteristic equation",["r² = 5r − 6, so r = 2 or 3.","a<sub>n</sub> = A·2<sup>n</sup> + B·3<sup>n</sup>; A + B = 1 and 2A + 3B = 4.","B = 2, A = −1: a<sub>n</sub> = 2·3<sup>n</sup> − 2<sup>n</sup>."]],
  ["Way 2: Compute, guess, prove",["Terms: 1, 4, 14, 46, 146.","Compare with 3<sup>n</sup> (1, 3, 9, 27, 81): 2·3<sup>n</sup> − 2<sup>n</sup> gives 1, 4, 14, 46, 146 ✓.","Prove the guess by strong induction: 5(2·3<sup>n−1</sup> − 2<sup>n−1</sup>) − 6(2·3<sup>n−2</sup> − 2<sup>n−2</sup>) = 2·3<sup>n</sup> − 2<sup>n</sup>."]]],
  note:"The characteristic equation is systematic and always works for linear recurrences with constant coefficients. Guess-and-prove works for any recurrence where you can spot the pattern."}],
 study:st("Lectures on recurrences and asymptotic notation","Chapter 2, Sequences (recurrences, characteristic roots)",null,[{k:"play",l:2,t:"VisuAlgo: sorting",by:"See O(n²) and O(n log n) sorts side by side",u:"https://visualgo.net"}])
},

/* ---------------- Unit 7: Graphs ---------------- */
u7:{
 defs:[
  ["Graph","A set V of vertices and a set E of edges, each joining two vertices. The degree of a vertex is the number of edges at it.",""],
  ["Walk, path, cycle; connected","A path visits distinct vertices; a cycle returns to its start. A graph is connected if every two vertices are joined by a path.",""],
  ["Tree","A connected graph with no cycles. A spanning tree of G is a tree using all of G's vertices.",""],
  ["Euler circuit; Hamilton cycle","An Euler circuit uses every EDGE exactly once and returns to the start. A Hamilton cycle visits every VERTEX exactly once.",""],
  ["Bipartite","The vertices split into two groups with every edge going between the groups.",""],
  ["Planar","Can be drawn in the plane with no edges crossing.",""],
  ["Coloring; chromatic number","A coloring gives adjacent vertices different colors; χ(G) is the fewest colors needed.",""],
  ["Weighted graph; shortest path","Edges have lengths (weights); the shortest path minimizes total weight.",""]
 ],
 thms:[
  {n:"Handshake Lemma",s:"The sum of all degrees equals 2|E|. Therefore every graph has an even number of odd-degree vertices.",p:"Each edge has two ends and adds 1 to the degree of each, so it contributes exactly 2 to the sum."},
  {n:"Euler's theorem on circuits",s:"A connected graph has an Euler circuit if and only if every vertex has even degree. It has an Euler path (not closed) if and only if exactly two vertices have odd degree.",pi:1,
   p:"Each time a circuit passes through a vertex it uses two edges (in and out), so degrees must be even. Conversely, start anywhere and walk without reusing edges; you can only get stuck at the start. If edges remain, splice in another circuit (Hierholzer's algorithm).",
   ce:"The Königsberg bridges graph has four vertices of odd degree (3, 3, 3, 5), so no walk crosses every bridge exactly once, which is the problem Euler solved in 1736."},
  {n:"Trees",s:"A tree with n vertices has exactly n − 1 edges. Any two vertices of a tree are joined by exactly one path. Adding any edge creates exactly one cycle.",
   p:"Induction on n: a tree with n ≥ 2 vertices has a leaf (vertex of degree 1; follow a longest path to its end). Remove the leaf and its edge to get a tree with n − 1 vertices and, by induction, n − 2 edges."},
  {n:"Euler's formula for planar graphs",s:"A connected planar graph drawn without crossings has V − E + F = 2 (F counts faces, including the outer one). Consequently E ≤ 3V − 6 when V ≥ 3.",pi:1,
   p:"Induction on edges. A tree has F = 1 and E = V − 1, so V − E + F = 2. Adding an edge that closes a cycle increases E and F by 1 each. For the inequality: each face has at least 3 edges and each edge borders at most 2 faces, so 3F ≤ 2E.",
   ce:"K<sub>5</sub> (5 vertices, all joined) has E = 10 &gt; 3·5 − 6 = 9, so it is not planar. The inequality is only a necessary condition: K<sub>3,3</sub> has E = 9 ≤ 12 but is still not planar (use E ≤ 2V − 4 for graphs with no triangles)."},
  {n:"Bipartite test",s:"A graph is bipartite if and only if it has no cycle of odd length (equivalently, it can be 2-colored).",pi:1,
   p:"Going around a cycle in a bipartite graph alternates sides, so it has even length. Conversely, color by the parity of the distance from a starting vertex (BFS); an edge between equal colors would create an odd cycle."},
  {n:"Four Color Theorem",s:"Every planar graph can be colored with at most 4 colors.",pi:1,
   p:"Proved in 1976 by Appel and Haken with a large computer search, one of the first major computer-assisted proofs. That 5 colors suffice has a short proof using E ≤ 3V − 6 (some vertex has degree ≤ 5).",
   ce:"Planarity is essential: K<sub>5</sub> needs 5 colors."},
  {n:"Dijkstra's algorithm",s:"In a graph with non-negative edge weights, repeatedly finalize the unvisited vertex with the smallest tentative distance and update its neighbors. This finds the shortest distances from a start vertex.",pi:1,
   p:"When a vertex v is chosen, any other route to v would have to leave the finalized set through some unvisited vertex u whose tentative distance is already ≥ that of v; with non-negative weights the rest of that route can't make it shorter.",
   ce:"Negative edge weights break it: with edges A→B = 2, A→C = 3, C→B = −2, Dijkstra finalizes B at distance 2, but A→C→B has length 1. (Use the Bellman–Ford algorithm instead.)"}
 ],
 mist:["Mixing up Euler (edges) and Hamilton (vertices). Hamilton cycles have no simple degree test.","Counting faces of a planar graph without the outer face.","Using E ≤ 3V − 6 to prove a graph IS planar (it can only prove a graph is not planar).","Forgetting to check that the graph is connected before applying Euler's theorem."],
 apps:[
  ["Maps and navigation","GPS apps find shortest routes with Dijkstra's algorithm and its faster relatives (A*)."],
  ["Social networks","Friends are edges; recommendations, influencers and communities come from graph algorithms. (See Z-Frontiers → Networks.)"],
  ["Scheduling","Coloring a conflict graph assigns exam times or radio frequencies so neighbors never clash."],
  ["Internet and logistics","Spanning trees build cheapest networks; flows plan deliveries and data routing."],
  ["Chemistry and biology","Molecules are graphs; food webs and protein interaction networks are analyzed as graphs."]
 ],
 ways:[{q:"Does the complete graph K<sub>4</sub> have an Euler circuit? A Hamilton cycle?",m:[
  ["Way 1: Use the theorems",["Every vertex of K<sub>4</sub> has degree 3 (odd).","Euler's theorem: no Euler circuit (and four odd vertices, so no Euler path either).","Hamilton: K<sub>n</sub> always has one (visit the vertices in any order)."]],
  ["Way 2: Try to construct",["Label the vertices 1, 2, 3, 4. Hamilton cycle: 1–2–3–4–1 ✓.","For an Euler circuit you would need to use all 6 edges; every attempt gets stuck at a vertex whose 3 edges are used up (odd degree).","Trying confirms the theorem but doesn't prove it in general."]]],
  note:"Theorems give instant answers for Euler circuits. For Hamilton cycles there is no known fast test (it is an NP-complete problem), so construction or clever arguments are often the only way."}],
 study:st("Lectures on graph theory, trees and coloring","Chapter 4, Graph Theory",null,[{k:"play",l:1,t:"VisuAlgo: graph traversal and shortest paths",by:"Animated BFS, DFS and Dijkstra",u:"https://visualgo.net"},{k:"free",l:2,t:"Networks, Crowds, and Markets (Part I: graph theory)",by:"Easley & Kleinberg",u:"https://www.cs.cornell.edu/home/kleinber/networks-book/"}])
}
};
})();
