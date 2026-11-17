/* Z-AP Computer Science A: multiple-choice question bank.
   Every template: {u: unit number, lvl: 1 easy | 2 medium | 3 hard, topic, gen}
   gen() returns {q, code, ans, dis:[[wrong, why it is wrong], ...], steps:[...], java}
   `java` is a main() body that prints the correct answer: tools/verify runs it in real Java to check every answer.
   Questions use Math.random, so a seeded generator can make fixed tests. */
(function(){
"use strict";
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1)), P=a=>a[Math.floor(Math.random()*a.length)];
const SH=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const D=(a,b)=>Math.trunc(a/b), M=(a,b)=>a%b;
const jd=x=>Number.isInteger(x)?x.toFixed(1):String(x);            /* how Java prints a double */
const E=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const C=s=>`<code>${E(s)}</code>`;
const JS=s=>JSON.stringify(String(s));                                 /* Java string literal */
const L=a=>"["+a.join(", ")+"]";
const tbl=(h,rows)=>`<table class="trc"><tr>${h.map(x=>`<th>${E(x)}</th>`).join("")}</tr>${rows.map(r=>`<tr>${r.map(x=>`<td>${E(x)}</td>`).join("")}</tr>`).join("")}</table>`;
const arr=a=>"{"+a.join(", ")+"}";
const WORDS=["COMPUTER","KEYBOARD","ALGORITHM","VARIABLE","PROGRAM","BOOLEAN","INTERFACE","RECURSION","ITERATION","CONSTANT","PLATFORM","DATABASE"];
const NAMES=["Ada","Ben","Cy","Dee","Eli","Fay","Gus","Hal","Ivy","Jo"];
const B=[]; const T=(u,lvl,topic,gen)=>B.push({u,lvl,topic,gen});
const randArr=(n,lo,hi)=>Array.from({length:n},()=>R(lo,hi));

/* ============================== UNIT 1: Using Objects and Methods ============================== */
T(1,1,"Integer division and %",()=>{ const a=R(13,49),b=R(3,7),c=R(2,5); if(a%b===0) return null; const v=D(a,b)+M(a,b)*c;
 return {q:`What value is stored in ${C("x")}?`,code:`int a = ${a};\nint b = ${b};\nint c = ${c};\nint x = a / b + a % b * c;`,ans:v,
  dis:[[D(a,b)+M(a,b),"Forgot to multiply a % b by c."],[(D(a,b)+M(a,b))*c,"Added before multiplying: * and % are done before +."],[+(a/b+M(a,b)*c).toFixed(2),"Used real division: a / b with two ints drops the decimal part."]],
  steps:[`${C("a / b")} is integer division: ${a} / ${b} = <b>${D(a,b)}</b> (the remainder is dropped).`,`${C("a % b")} is the remainder: ${a} % ${b} = <b>${M(a,b)}</b>.`,`${C("*")} and ${C("%")} have higher precedence than ${C("+")}, so compute ${M(a,b)} * ${c} = ${M(a,b)*c} first.`,`x = ${D(a,b)} + ${M(a,b)*c} = <b>${v}</b>.`],
  java:`int a=${a},b=${b},c=${c};System.out.println(a/b+a%b*c);`}; });
T(1,1,"Casting",()=>{ const a=R(7,29),b=R(2,6); if(a%b===0) return null; const k=R(0,2);
 const code=[`double d = (double) a / b;`,`double d = (double) (a / b);`,`double d = a / b;`][k]; const v=k===0?a/b:D(a,b);
 return {q:`What is printed?`,code:`int a = ${a};\nint b = ${b};\n${code}\nSystem.out.println(d);`,ans:jd(v),
  dis:[[jd(k===0?D(a,b):a/b),k===0?"The cast applies to a before the division, so this is real division, not integer division.":"The division a / b happens first, with two ints, so the decimal part is lost before any conversion."],[String(k===0?D(a,b):D(a,b)),"A double always prints with a decimal point (for example 3.0)."],[jd(D(a,b)+1),"Integer division truncates (drops the decimal); it never rounds up."]],
  steps:k===0?[`The cast ${C("(double)")} applies only to ${C("a")}: it becomes ${a}.0.`,`${a}.0 / ${b} is double division = ${jd(a/b)}.`,`Printed: <b>${jd(v)}</b>.`]:[`${k===1?"Parentheses make":"With no cast,"} ${C("a / b")} ${k===1?"happen first":"is evaluated first"}: both are ints, so ${a} / ${b} = ${D(a,b)}.`,`That int is then converted to double: ${D(a,b)}.0.`,`Printed: <b>${jd(v)}</b>.`],
  java:`int a=${a},b=${b};${code}System.out.println(d);`}; });
T(1,1,"substring",()=>{ const s=P(WORDS), i=R(1,3), j=R(i+2,Math.min(s.length,i+5));
 return {q:`What is printed?`,code:`String s = ${JS(s)};\nSystem.out.println(s.substring(${i}, ${j}));`,ans:s.substring(i,j),
  dis:[[s.substring(i,j+1),"The end index is NOT included: substring(a, b) stops at index b − 1."],[s.substring(i-1,j-1),"Indexes start at 0, not 1."],[s.substring(i,Math.min(s.length,i+j)),"The second argument is an end index, not a length."]],
  steps:[`Indexes start at 0: ${s.split("").map((c,k)=>`${c}=${k}`).join(", ")}.`,`${C(`substring(${i}, ${j})`)} takes indexes ${i} through ${j-1} (the end index ${j} is excluded): ${j-i} characters.`,`Result: <b>${s.substring(i,j)}</b>.`],
  java:`String s=${JS(s)};System.out.println(s.substring(${i},${j}));`}; });
T(1,1,"indexOf and length",()=>{ const s=P(WORDS), ch=P(["A","E","O","R","T","Z","Q"]); const idx=s.indexOf(ch);
 const ans=s.length-idx;
 return {q:`What is printed?`,code:`String s = ${JS(s)};\nint k = s.indexOf(${JS(ch)});\nSystem.out.println(s.length() - k);`,ans,
  dis:[[ans-1,"indexOf returns a 0-based index, so the first character is at index 0."],[idx,"That is k itself; the code prints s.length() − k."],[idx<0?s.length:s.length+1,idx<0?"indexOf returns −1 (not 0) when the text is not found.":"length() counts the characters; check the subtraction."],[idx<0?s.length-1:-1,"Check the sign: subtracting −1 adds 1."]],
  steps:[`${C("s.length()")} = ${s.length}.`,idx<0?`"${ch}" does not occur in "${s}", so ${C("indexOf")} returns <b>−1</b>.`:`The first "${ch}" is at index ${idx} (counting from 0).`,`${s.length} − (${idx}) = <b>${ans}</b>.`],
  java:`String s=${JS(s)};int k=s.indexOf(${JS(ch)});System.out.println(s.length()-k);`}; });
T(1,1,"Math class",()=>{ const a=R(2,6), p=R(2,3), c=-R(2,9); const v=Math.pow(a,p)+Math.abs(c);
 return {q:`What is printed?`,code:`System.out.println(Math.pow(${a}, ${p}) + Math.abs(${c}));`,ans:jd(v),
  dis:[[String(v),"Math.pow returns a double, so the sum is a double and prints with .0."],[jd(Math.pow(a,p)+c),"Math.abs(" + c + ") is " + (-c) + ", not " + c + "."],[jd(a*p+Math.abs(c)),"Math.pow(a, b) is a to the power b, not a × b."]],
  steps:[`${C(`Math.pow(${a}, ${p})`)} = ${a}<sup>${p}</sup> = ${jd(Math.pow(a,p))} (a double).`,`${C(`Math.abs(${c})`)} = ${-c} (an int).`,`double + int is a double: ${jd(v)}. Printed: <b>${jd(v)}</b>.`],
  java:`System.out.println(Math.pow(${a},${p})+Math.abs(${c}));`}; });
T(1,2,"Compound assignment",()=>{ const x0=R(2,9),a=R(2,6),b=R(2,4),c=R(4,9),d=R(1,5); let x=x0; const rows=[["int x = "+x0,x]];
 x+=a; rows.push([`x += ${a}`,x]); x*=b; rows.push([`x *= ${b}`,x]); x%=c; rows.push([`x %= ${c}`,x]); x-=d; rows.push([`x -= ${d}`,x]);
 return {q:`What is printed?`,code:`int x = ${x0};\nx += ${a};\nx *= ${b};\nx %= ${c};\nx -= ${d};\nSystem.out.println(x);`,ans:x,
  dis:[[(x0+a)*b-d,"x %= "+c+" replaces x with the remainder of x ÷ "+c+"; it was skipped."],[M(x0+a*b,c)-d,"Each line uses the value from the line before: x += "+a+" happens before x *= "+b+"."],[D((x0+a)*b,c)-d,"% is the remainder, not the quotient."]],
  steps:[`Trace x line by line:`,tbl(["statement","x"],rows),`Printed: <b>${x}</b>.`],
  java:`int x=${x0};x+=${a};x*=${b};x%=${c};x-=${d};System.out.println(x);`}; });
T(1,2,"String concatenation",()=>{ const a=R(2,9),b=R(2,9); const ans=String(a+b)+String(a)+String(b);
 return {q:`What is printed?`,code:`int a = ${a};\nint b = ${b};\nSystem.out.println(a + b + "" + a + b);`,ans,
  dis:[[`${a}${b}${a}${b}`,"+ is evaluated left to right: a + b are both ints, so they are ADDED before the String appears."],[`${a+b}${a+b}`,"After the \"\" the expression is a String, so a and b are joined as text, not added."],[`${a+b}`,"All the parts are printed; nothing is dropped."]],
  steps:[`+ is evaluated left to right.`,`${C("a + b")}: both ints → ${a+b}.`,`${C(`${a+b} + ""`)} → the String "${a+b}". From now on, + means join.`,`"${a+b}" + ${a} → "${a+b}${a}", then + ${b} → "<b>${ans}</b>".`],
  java:`int a=${a},b=${b};System.out.println(a+b+""+a+b);`}; });
T(1,2,"String methods together",()=>{ const s=P(WORDS).toLowerCase(), k=R(2,s.length-2);
 const t=s.substring(k)+s.substring(0,k);
 return {q:`What is printed?`,code:`String s = ${JS(s)};\ns.toUpperCase();\nString t = s.substring(${k}) + s.substring(0, ${k});\nSystem.out.println(t);`,ans:t,
  dis:[[t.toUpperCase(),"Strings are immutable: s.toUpperCase() returns a NEW String, which is thrown away because it is not assigned."],[s.substring(k+1)+s.substring(0,k+1),"substring(k) starts AT index k (0-based)."],[s.substring(0,k)+s.substring(k),"The two pieces are joined in the order written: the end part first."]],
  steps:[`${C("s.toUpperCase();")} does not change s (Strings are immutable; the result is not saved). s is still "${s}".`,`${C(`s.substring(${k})`)} = "${s.substring(k)}" (index ${k} to the end).`,`${C(`s.substring(0, ${k})`)} = "${s.substring(0,k)}".`,`t = "${s.substring(k)}" + "${s.substring(0,k)}" = "<b>${t}</b>".`],
  java:`String s=${JS(s)};s.toUpperCase();String t=s.substring(${k})+s.substring(0,${k});System.out.println(t);`}; });
T(1,2,"Rounding with casts",()=>{ const neg=Math.random()<0.4; const x=+(R(10,99)/10+(Math.random()<0.5?0.05:0)).toFixed(2)*(neg?-1:1); const v=neg?Math.trunc(x-0.5):Math.trunc(x+0.5);
 const code=neg?`double x = ${x};\nint r = (int) (x - 0.5);`:`double x = ${x};\nint r = (int) (x + 0.5);`;
 return {q:`What value is stored in ${C("r")}?`,code,ans:v,
  dis:[[Math.trunc(x)===v?(neg?v-1:v+1):Math.trunc(x),"Forgot to add "+(neg?"−":"")+"0.5 before casting: (int) just drops the decimal part."],[neg?v+1:v-1,"(int) truncates toward 0; it never rounds away from 0 by itself."],[jd(v),"r is an int, so it prints with no decimal point."]],
  steps:[`${x} ${neg?"−":"+"} 0.5 = ${+(neg?x-0.5:x+0.5).toFixed(2)}.`,`${C("(int)")} truncates toward 0: ${+(neg?x-0.5:x+0.5).toFixed(2)} → <b>${v}</b>.`,`This is the standard way to round a ${neg?"negative":"positive"} double to the nearest int.`],
  java:`${code.replace(/\n/g,"")}System.out.println(r);`}; });
T(1,3,"Strings and references",()=>{ const w=P(["hi","cat","sun","map","dog"]), add=P(["!","s","?"]);
 return {q:`What is printed?`,code:`String a = ${JS(w)};\nString b = a;\na = a + ${JS(add)};\nSystem.out.println(b + " " + a);`,ans:`${w} ${w}${add}`,
  dis:[[`${w}${add} ${w}${add}`,"a + \""+add+"\" creates a NEW String; b still refers to the original \""+w+"\"."],[`${w} ${w}`,"a was reassigned to the new String \""+w+add+"\"."],[`${w}${add} ${w}`,"b is printed first."]],
  steps:[`${C("String b = a;")} makes b refer to the same String object "${w}".`,`Strings are immutable. ${C(`a = a + ${JS(add)};`)} builds a new String "${w}${add}" and points a at it. b is unchanged.`,`Printed: <b>${w} ${w}${add}</b>.`],
  java:`String a=${JS(w)};String b=a;a=a+${JS(add)};System.out.println(b+" "+a);`}; });
T(1,3,"== versus equals",()=>{ const w=P(["cat","java","loop","AP"]);
 return {q:`What is printed?`,code:`String a = new String(${JS(w)});\nString b = ${JS(w)};\nSystem.out.println((a == b) + " " + a.equals(b));`,ans:"false true",
  dis:[["true true","== compares references (are they the same object?). new String(...) always creates a different object."],["false false","equals compares the characters, which are the same."],["true false","It is the other way round: equals compares contents, == compares references."]],
  steps:[`${C(`new String(${JS(w)})`)} creates a new object, so a and b refer to different objects.`,`${C("a == b")} compares references → <b>false</b>.`,`${C("a.equals(b)")} compares the characters → <b>true</b>.`,`Always use ${C(".equals")} to compare Strings.`],
  java:`String a=new String(${JS(w)});String b=${JS(w)};System.out.println((a==b)+" "+a.equals(b));`}; });
T(1,3,"compareTo",()=>{ const pairs=[["apple","banana"],["Zebra","apple"],["cat","car"],["dog","Dog"],["bat","batch"],["mango","Mango"],["kiwi","kite"]]; const [a,b]=P(pairs); const r=a<b;
 return {q:`What is printed?`,code:`String x = ${JS(a)};\nString y = ${JS(b)};\nSystem.out.println(x.compareTo(y) < 0);`,ans:String(r),
  dis:[[String(!r),r?"x comes first in dictionary (Unicode) order, so compareTo is negative.":"x comes after y in Unicode order (uppercase letters come before lowercase), so compareTo is positive."],["0","The expression x.compareTo(y) < 0 is a boolean, so it prints true or false."],["Error","compareTo is a String method on the Java Quick Reference; this compiles."]],
  steps:[`${C("compareTo")} compares character by character using Unicode order. All uppercase letters (A–Z) come before all lowercase letters (a–z).`,`Compare "${a}" and "${b}": ${(()=>{ let i=0; while(i<a.length&&i<b.length&&a[i]===b[i]) i++; return i<Math.min(a.length,b.length)?`the first difference is at index ${i}: '${a[i]}' vs '${b[i]}'`:`one is a prefix of the other, so the shorter String comes first`; })()}.`,`So x.compareTo(y) is ${r?"negative":"positive"} and the expression prints <b>${r}</b>.`],
  java:`String x=${JS(a)},y=${JS(b)};System.out.println(x.compareTo(y)<0);`}; });
T(1,3,"Mixed int and double",()=>{ const a=R(7,23),b=R(2,5),c=R(2,4); if(a%b===0) return null; const v=D(a,b)*c+a/b;
 return {q:`What is printed?`,code:`int a = ${a};\nint b = ${b};\nint c = ${c};\ndouble r = a / b * c + (double) a / b;\nSystem.out.println(r);`,ans:jd(v),
  dis:[[jd(a/b*c+a/b),"a / b * c uses int division because a, b and c are all ints."],[jd(D(a,b)*c+D(a,b)),"(double) a / b converts a first, so that part IS real division."],[jd(D(a,b*c)+a/b),"Same precedence: / and * go left to right, so a / b is computed first, then × c."]],
  steps:[`Left part: ${C("a / b * c")}, left to right with ints: ${a} / ${b} = ${D(a,b)}, then × ${c} = ${D(a,b)*c}.`,`Right part: ${C("(double) a / b")} = ${a}.0 / ${b} = ${jd(a/b)}.`,`Sum: ${D(a,b)*c} + ${jd(a/b)} = <b>${jd(v)}</b>.`],
  java:`int a=${a},b=${b},c=${c};double r=a/b*c+(double)a/b;System.out.println(r);`}; });

/* ============================== UNIT 2: Selection and Iteration ============================== */
T(2,1,"if / else if",()=>{ const s=R(55,100); const g=s>=90?"A":s>=80?"B":s>=70?"C":"D"; const last=s>=70?"C":"D";
 return {q:`What is printed when ${C("score")} is ${s}?`,code:`if (score >= 90)\n    System.out.println("A");\nelse if (score >= 80)\n    System.out.println("B");\nelse if (score >= 70)\n    System.out.println("C");\nelse\n    System.out.println("D");`,ans:g,
  dis:[[g==="A"?"B":"A","Only the FIRST true condition runs; the rest are skipped."],[g===last?(g==="D"?"C":"D"):last,"With else if, once a branch runs the others are skipped; it does not keep checking."],["ABC".replace(g,"").slice(0,1)+"D","Exactly one branch of an if/else if chain runs."]],
  steps:[`Check conditions from the top: ${[90,80,70].map(t=>`${s} >= ${t} is ${s>=t}`).join("; ")}.`,`The first true condition chooses the branch (if none is true, the else runs).`,`Printed: <b>${g}</b>.`],
  java:`int score=${s};if(score>=90)System.out.println("A");else if(score>=80)System.out.println("B");else if(score>=70)System.out.println("C");else System.out.println("D");`}; });
T(2,1,"while loop",()=>{ const n0=R(30,70), k=R(2,15), s=R(4,9); let n=n0,c=0; const rows=[]; while(n>k){ n-=s; c++; rows.push([c,n]); }
 return {q:`What is printed?`,code:`int n = ${n0};\nint count = 0;\nwhile (n > ${k})\n{\n    n -= ${s};\n    count++;\n}\nSystem.out.println(count + " " + n);`,ans:`${c} ${n}`,
  dis:[[`${c+1} ${n-s}`,"The loop checks n > "+k+" BEFORE each pass; it stops as soon as that is false."],[`${c-1} ${n+s}`,"The last pass still runs when n is just above "+k+"."],[`${c} ${n+s}`,"n is updated inside the loop on the last pass too."]],
  steps:[`Trace (check n > ${k} before each pass):`,tbl(["pass","n after the pass"],rows),`n = ${n} is not greater than ${k}, so the loop stops. Printed: <b>${c} ${n}</b>.`],
  java:`int n=${n0};int count=0;while(n>${k}){n-=${s};count++;}System.out.println(count+" "+n);`}; });
T(2,1,"for loop",()=>{ const a=R(1,5), b=R(12,25), s=R(2,4), lt=Math.random()<0.5; let sum=0; const vals=[]; for(let i=a; lt?i<b:i<=b; i+=s){ sum+=i; vals.push(i); }
 let alt=0; for(let i=a; !lt?i<b:i<=b; i+=s) alt+=i;
 return {q:`What is printed?`,code:`int sum = 0;\nfor (int i = ${a}; i ${lt?"<":"<="} ${b}; i += ${s})\n{\n    sum += i;\n}\nSystem.out.println(sum);`,ans:sum,
  dis:[[alt===sum?sum+b:alt,lt?"The condition is i < "+b+", so "+b+" itself is not included.":"The condition is i <= "+b+", so "+b+" is included if the loop reaches it."],[sum-a,"The first value, i = "+a+", is added too."],[vals.length,"sum adds the values of i, not the number of passes."]],
  steps:[`i takes the values ${vals.join(", ")} (start ${a}, add ${s} each pass, keep going while i ${lt?"<":"<="} ${b}).`,`sum = ${vals.join(" + ")} = <b>${sum}</b>.`],
  java:`int sum=0;for(int i=${a};i${lt?"<":"<="}${b};i+=${s}){sum+=i;}System.out.println(sum);`}; });
T(2,1,"Boolean expressions",()=>{ const x=R(1,9),y=R(1,9),a=R(2,8),b=R(2,8); const p=x>a, q=y<b, r=!(x===y); const v=(p&&q)||r;
 return {q:`What is printed?`,code:`int x = ${x};\nint y = ${y};\nboolean r = x > ${a} && y < ${b} || !(x == y);\nSystem.out.println(r);`,ans:String(v),
  dis:[[String(!v),"&& is evaluated before ||: (x > "+a+" && y < "+b+") || !(x == y)."],["1","A boolean prints true or false, never 1 or 0."],["Error","This expression compiles: it combines booleans with && , || and !."]],
  steps:[`${C(`x > ${a}`)} is ${p}; ${C(`y < ${b}`)} is ${q}; so ${C("&&")} gives ${p&&q}.`,`${C("x == y")} is ${x===y}, so ${C("!(x == y)")} is ${r}.`,`${p&&q} || ${r} = <b>${v}</b>.`],
  java:`int x=${x},y=${y};boolean r=x>${a}&&y<${b}||!(x==y);System.out.println(r);`}; });
T(2,2,"Short-circuit evaluation",()=>{ const x=0, y=R(3,20);
 return {q:`What is printed?`,code:`int x = ${x};\nint y = ${y};\nif (x != 0 && y / x > 2)\n    System.out.println("big");\nelse\n    System.out.println("safe");`,ans:"safe",
  dis:[["ArithmeticException","Short-circuit: x != 0 is false, so y / x is never evaluated and there is no division by zero."],["big","The && is false because its left side is false."],["Nothing is printed","One of the two branches always runs."]],
  steps:[`${C("x != 0")} is false.`,`With ${C("&&")}, if the left side is false the whole thing is false, so Java does NOT evaluate ${C("y / x")} (short-circuit evaluation). No division by zero happens.`,`The else branch runs: <b>safe</b>.`],
  java:`int x=${x},y=${y};if(x!=0&&y/x>2)System.out.println("big");else System.out.println("safe");`}; });
T(2,2,"Dangling else",()=>{ const x=R(1,9), y=R(1,9); const out=x>5?(y>5?"A":"B"):"Nothing is printed";
 return {q:`What is printed? (Look at the braces, not the indentation.)`,code:`int x = ${x};\nint y = ${y};\nif (x > 5)\n    if (y > 5)\n        System.out.println("A");\nelse\n    System.out.println("B");`,ans:out,
  dis:[[out==="B"?"A":"B",x>5?"y > 5 is "+(y>5)+".":"The else belongs to the closest if (y > 5), which is inside if (x > 5); since x > 5 is false, nothing runs."],[out==="Nothing is printed"?"A":"Nothing is printed","Trace the conditions carefully."],["AB","At most one of the two println statements runs."]],
  steps:[`Without braces, an ${C("else")} belongs to the <b>closest</b> unmatched ${C("if")}: here, ${C("if (y > 5)")}. The indentation is misleading.`,`So the code means: if (x &gt; 5) { if (y &gt; 5) print A; else print B; }.`,`x > 5 is ${x>5}${x>5?`; y > 5 is ${y>5}`:" so the whole inner statement is skipped"}. Result: <b>${out}</b>.`],
  java:`int x=${x},y=${y};boolean p=false;if(x>5){p=true;if(y>5)System.out.println("A");else System.out.println("B");}if(!p)System.out.println("Nothing is printed");`}; });
T(2,2,"Digits with % and /",()=>{ const n0=R(1000,99999); const out=String(n0).split("").reverse().join(""); let s=0; for(const c of String(n0)) s+= +c;
 return {q:`What is printed?`,code:`int n = ${n0};\nwhile (n > 0)\n{\n    System.out.print(n % 10);\n    n /= 10;\n}`,ans:out,
  dis:[[String(n0),"n % 10 is the LAST digit, so the digits come out in reverse order."],[String(s),"The digits are printed one by one, not added."],[out.slice(0,-1),"The loop runs until n is 0, so the first digit is printed too."]],
  steps:[`${C("n % 10")} is the last digit; ${C("n /= 10")} removes it.`,tbl(["n","printed (n % 10)","n / 10"],String(n0).split("").map((_,i)=>{ const v=Math.trunc(n0/10**i); return [v,v%10,Math.trunc(v/10)]; })),`Printed: <b>${out}</b>.`],
  java:`int n=${n0};while(n>0){System.out.print(n%10);n/=10;}System.out.println();`}; });
T(2,2,"Counting in a String",()=>{ const w=P(["BANANA","ALABAMA","CARAVAN","MAMMAL","PAPAYA","ANAGRAM"]), c=P(["A","M","N"]); const n=w.split(c).length-1; const dn=w.slice(0,-1).split(c).length-1;
 return {q:`What is printed?`,code:`String s = ${JS(w)};\nint count = 0;\nfor (int i = 0; i < s.length() - 1; i++)\n{\n    if (s.substring(i, i + 1).equals(${JS(c)}))\n        count++;\n}\nSystem.out.println(count);`,ans:dn,
  dis:[[n===dn?dn+1:n,"The loop stops at i < s.length() − 1, so the LAST character is never checked."],[dn-1,"Index 0 is checked too."],[w.length-1,"count only increases when the character equals \""+c+"\"."]],
  steps:[`The loop checks indexes 0 to ${w.length-2} (it stops before the last index, ${w.length-1}).`,`Characters checked: ${w.slice(0,-1).split("").join(" ")}. "${c}" appears ${dn} time${dn===1?"":"s"} among them${n!==dn?` (the last character "${w.slice(-1)}" is skipped)`:""}.`,`Printed: <b>${dn}</b>.`],
  java:`String s=${JS(w)};int count=0;for(int i=0;i<s.length()-1;i++){if(s.substring(i,i+1).equals(${JS(c)}))count++;}System.out.println(count);`}; });
T(2,2,"De Morgan's laws",()=>{ const [a,b]=[R(1,9),R(1,9)]; const op=P([["&&","||"],["||","&&"]]);
 const ans=`x <= ${a} ${op[1]} y >= ${b}`;
 return {q:`Which expression is equivalent to the one shown, for all int values of x and y?`,code:`!(x > ${a} ${op[0]} y < ${b})`,ans,
  dis:[[`x <= ${a} ${op[0]} y >= ${b}`,"De Morgan: negating also switches "+op[0]+" to "+op[1]+"."],[`x < ${a} ${op[1]} y > ${b}`,"The opposite of x > "+a+" is x <= "+a+" (it includes "+a+")."],[`!x > ${a} ${op[1]} !y < ${b}`,"! cannot be applied to an int; negate each comparison instead."]],
  steps:[`De Morgan's laws: !(A ${op[0]} B) is equivalent to !A ${op[1]} !B.`,`!(x > ${a}) is x <= ${a}; !(y < ${b}) is y >= ${b}.`,`So the expression is equivalent to <b>${E(ans)}</b>.`],java:null}; });
T(2,3,"Nested loops: counting",()=>{ const n=R(4,8), v=R(0,3); const forms=[["int j = i; j < n; j++",n*(n+1)/2],["int j = 0; j < i; j++",n*(n-1)/2],["int j = i + 1; j < n; j++",n*(n-1)/2],["int j = 0; j <= i; j++",n*(n+1)/2]]; const [hdr,cnt]=forms[v];
 return {q:`What is printed?`,code:`int n = ${n};\nint count = 0;\nfor (int i = 0; i < n; i++)\n{\n    for (${hdr})\n    {\n        count++;\n    }\n}\nSystem.out.println(count);`,ans:cnt,
  dis:[[n*n,"The inner loop's start or end depends on i, so it does not run n times every time."],[cnt===n*(n+1)/2?n*(n-1)/2:n*(n+1)/2,"Check the inner loop's first and last values of j for each i."],[n,"count increases once per pass of the INNER loop."]],
  steps:[`Count inner passes for each i from 0 to ${n-1}:`,tbl(["i","inner passes"],Array.from({length:n},(_,i)=>[i,v===0?n-i:v===1?i:v===2?n-i-1:i+1])),`Total: ${Array.from({length:n},(_,i)=>v===0?n-i:v===1?i:v===2?n-i-1:i+1).join(" + ")} = <b>${cnt}</b>.`],
  java:`int n=${n};int count=0;for(int i=0;i<n;i++){for(${hdr}){count++;}}System.out.println(count);`}; });
T(2,3,"Nested loops: output",()=>{ const n=R(3,4), rev=Math.random()<0.5; let out=""; for(let i=1;i<=n;i++){ if(rev) for(let j=i;j>=1;j--) out+=j; else for(let j=1;j<=i;j++) out+=j; out+=" "; } out=out.trim();
 const other=(()=>{ let o=""; for(let i=1;i<=n;i++){ if(!rev) for(let j=i;j>=1;j--) o+=j; else for(let j=1;j<=i;j++) o+=j; o+=" "; } return o.trim(); })();
 return {q:`What is printed?`,code:`for (int i = 1; i <= ${n}; i++)\n{\n    for (int j = ${rev?"i; j >= 1; j--":"1; j <= i; j++"})\n    {\n        System.out.print(j);\n    }\n    System.out.print(" ");\n}`,ans:out,
  dis:[[other,rev?"j counts DOWN from i to 1.":"j counts UP from 1 to i."],[Array.from({length:n},(_,i)=>String(i+1).repeat(i+1)).join(" "),"j (not i) is printed."],[out.split(" ").slice(0,-1).join(" "),"The outer loop runs for i = 1 through "+n+", inclusive."]],
  steps:[`For each i, the inner loop prints j from ${rev?"i down to 1":"1 up to i"}, then a space.`,...Array.from({length:n},(_,k)=>`i = ${k+1}: prints ${out.split(" ")[k]}`),`Printed: <b>${out}</b>.`],
  java:`for(int i=1;i<=${n};i++){for(int j=${rev?"i;j>=1;j--":"1;j<=i;j++"}){System.out.print(j);}System.out.print(" ");}System.out.println();`}; });
T(2,3,"Loop with two variables",()=>{ let x=R(1,6), y=R(15,30); const a=R(2,3), b=R(1,2), x0=x, y0=y; const rows=[]; while(x<y){ x+=a; y-=b; rows.push([x,y]); }
 return {q:`What is printed?`,code:`int x = ${x0};\nint y = ${y0};\nwhile (x < y)\n{\n    x += ${a};\n    y -= ${b};\n}\nSystem.out.println(x + " " + y);`,ans:`${x} ${y}`,
  dis:[[`${x-a} ${y+b}`,"The body runs once more: the condition is checked only at the top of each pass."],[`${x+a} ${y-b}`,"The loop stops as soon as x < y is false."],[`${y} ${x}`,"x is printed first."]],
  steps:[`Trace (check x < y before each pass):`,tbl(["x","y"],[[x0,y0],...rows]),`Now x < y is false (${x} ≥ ${y}). Printed: <b>${x} ${y}</b>.`],
  java:`int x=${x0},y=${y0};while(x<y){x+=${a};y-=${b};}System.out.println(x+" "+y);`}; });
T(2,3,"String traversal",()=>{ const w=P(WORDS), st=R(2,3); let r=""; for(let i=w.length-1;i>=0;i-=st) r+=w[i]; let r2=""; for(let i=w.length-2;i>=0;i-=st) r2+=w[i];
 return {q:`What is printed?`,code:`String s = ${JS(w)};\nString r = "";\nfor (int i = s.length() - 1; i >= 0; i -= ${st})\n{\n    r += s.substring(i, i + 1);\n}\nSystem.out.println(r);`,ans:r,
  dis:[[r2,"The loop starts at the LAST index, s.length() − 1 = "+(w.length-1)+"."],[r.split("").reverse().join(""),"Characters are added in the order visited: from the end toward the start."],[w.split("").reverse().join(""),"i goes down by "+st+" each pass, so characters are skipped."]],
  steps:[`i starts at ${w.length-1} and decreases by ${st}: i = ${(()=>{ const a=[]; for(let i=w.length-1;i>=0;i-=st) a.push(i); return a.join(", "); })()}.`,`The characters at those indexes: ${r.split("").join(", ")}.`,`r = "<b>${r}</b>".`],
  java:`String s=${JS(w)};String r="";for(int i=s.length()-1;i>=0;i-=${st}){r+=s.substring(i,i+1);}System.out.println(r);`}; });
T(2,3,"Equivalent code segments",()=>{ const n=R(5,9);
 const I=`int k = 0;\nwhile (k < ${n})\n{\n    System.out.print(k);\n    k += 2;\n}`, II=`for (int k = 0; k < ${n}; k += 2)\n    System.out.print(k);`, III=`for (int k = 0; k <= ${n}; k++)\n{\n    if (k % 2 == 0)\n        System.out.print(k);\n}`;
 const out=a=>a.join("");  const o1=[],o3=[]; for(let k=0;k<n;k+=2) o1.push(k); for(let k=0;k<=n;k++) if(k%2===0) o3.push(k); const same3=out(o1)===out(o3);
 const ans=same3?"I, II and III":"I and II only";
 return {q:`Which code segments print the same output?`,code:`/* I */\n${I}\n\n/* II */\n${II}\n\n/* III */\n${III}`,ans,
  dis:[[same3?"I and II only":"I, II and III",same3?"III also prints the even numbers 0 to "+(n-n%2)+" because "+n+" is "+(n%2?"odd":"even")+".":"III uses k <= "+n+"; since "+n+" is even, it also prints "+n+"."],["I only","II is the same loop written with for."],["II and III only","I and II are the same loop."]],
  steps:[`I prints ${out(o1)} (k = 0, 2, 4, … while k < ${n}).`,`II is the same loop written as a for loop: ${out(o1)}.`,`III checks every k from 0 to ${n} and prints the even ones: ${out(o3)}.`,`Answer: <b>${ans}</b>.`],java:null}; });

/* build a ready question from a template: shuffled choices, the reason for each wrong choice, and the steps */
function make(t,tries=40){ for(let k=0;k<tries;k++){ let g; try{ g=t.gen(); }catch(e){ g=null; } if(!g) continue;
  const ans=String(g.ans), seen=new Set([ans]), dis=[];
  for(const [d,why] of g.dis){ const s=String(d); if(!seen.has(s)&&s!=="undefined"&&s!=="NaN"){ seen.add(s); dis.push([s,why]); } if(dis.length===3) break; }
  if(dis.length<3) continue;
  const ch=SH([[ans,""],...dis]); return {u:t.u,lvl:t.lvl,topic:t.topic,q:g.q,code:g.code,ch:ch.map(c=>c[0]),why:ch.map(c=>c[1]),ai:ch.findIndex(c=>c[0]===ans),steps:g.steps,java:g.java}; }
 return null; }
window.CSBANK={B,helpers:{R,P,SH,D,M,jd,E,C,JS,L,tbl,arr,WORDS,NAMES,randArr},T,make};
})();
