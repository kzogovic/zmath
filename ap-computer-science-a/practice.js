/* AP CSA practice: code-tracing MCQs with fresh numbers each time, plus study cards.
   Every generator also returns `java`: a main() body that prints the correct answer (used for testing). */
(function(){
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const P=a=>a[Math.floor(Math.random()*a.length)];
const SH=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const D=(a,b)=>Math.trunc(a/b);           // Java int division
const M=(a,b)=>a%b;                       // JS % matches Java for ints
const jd=x=>Number.isInteger(x)?x.toFixed(1):String(x);   // Java prints doubles like 3.0
const L=a=>"["+a.join(", ")+"]";           // ArrayList / Arrays.toString format
const E=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const WORDS=["COMPUTER","KEYBOARD","ALGORITHM","VARIABLE","PROGRAM","BOOLEAN","INTERFACE","RECURSION","ITERATION","CONSTANT"];
const NAMES=["Ada","Ben","Cy","Dee","Eli","Fay","Gus","Hal"];

/* build question: correct answer + distractors (strings), dedupe, pad, shuffle to 4 */
function Q(q,code,ans,dis,ex,java){
  ans=String(ans); const seen=new Set([ans]); const ds=[];
  for(const d of dis){const s=String(d); if(!seen.has(s)){seen.add(s);ds.push(s);} if(ds.length===3)break;}
  let k=1; while(ds.length<3&&k<40){const n=parseFloat(ans); let c; if(!isNaN(n)&&/^-?\d+(\.\d+)?$/.test(ans)){c=String(ans.includes(".")?(n+k*0.5).toFixed(1):n+(k%2?k:-k));} else c=ans+" ".repeat(k); if(!seen.has(c)&&c.trim()!==ans){seen.add(c);ds.push(c);} k++;}
  const ch=SH([ans,...ds]); return {q,code,ch,ai:ch.indexOf(ans),ex,java};
}

const G={};
/* ======================= UNIT 1 ======================= */
G["unit-1"]=[
()=>{const a=R(11,40),b=R(3,7),c=R(2,5); const v=D(a,b)+M(a,b)*c;
  return Q("What value is stored in <code>x</code>?",`int a = ${a}, b = ${b}, c = ${c};\nint x = a / b + a % b * c;`,v,
   [(a/b+M(a,b)*c).toFixed(2).replace(/\.?0+$/,""), D(a,b)+M(a,b), (D(a,b)+M(a,b))*c, D(a,b)*c+M(a,b)],
   `a / b = ${D(a,b)} (int division), a % b = ${M(a,b)}; * goes before +, so ${D(a,b)} + ${M(a,b)} × ${c} = ${v}.`,`int a=${a},b=${b},c=${c};System.out.println(a/b+a%b*c);`);},
()=>{const a=R(7,29),b=R(2,6); if(a%b===0) return G["unit-1"][1](); const v1=jd(D(a,b)), v2=String(a/b);
  const asks=P([0,1]); const code=asks?`int a = ${a}, b = ${b};\ndouble d = (double) a / b;`:`int a = ${a}, b = ${b};\ndouble d = (double) (a / b);`;
  const ans=asks?(+(a/b).toFixed(4)).toString():v1;
  const javaAns=asks?`System.out.println(Math.round((double)a/b*10000)/10000.0);`:`System.out.println((double)(a/b));`;
  return Q("What is the value of <code>d</code>?"+(asks?" (rounded to 4 decimal places)":""),code,ans,
   asks?[v1,String(D(a,b)),(+(a/b).toFixed(1)).toString()]:[(+(a/b).toFixed(4)).toString(),String(D(a,b)),jd(D(a,b)+1)],
   asks?`The cast turns a into ${a}.0 first, so the division is done in double: ${ans}.`:`a / b is int division first (${D(a,b)}); the cast only turns it into ${v1}.`,
   `int a=${a},b=${b};`+javaAns);},
()=>{const w=P(WORDS); const i=R(1,w.length-4), j=R(i+1,w.length-1); const s=w.substring(i,j);
  return Q("What is printed?",`String s = "${w}";\nSystem.out.println(s.substring(${i}, ${j}));`,s,
   [w.substring(i,j+1),w.substring(i-1,j),w.substring(i+1,j+1),w.substring(i,j-1)||w[i],w.substring(i-1,j+1),w.substring(i),w.substring(0,j),w.substring(j)],
   `substring(${i}, ${j}) takes indexes ${i} through ${j-1} (${j-i} characters): "${s}".`,`System.out.println("${w}".substring(${i},${j}));`);},
()=>{const w=P(WORDS); const k=R(1,w.length-3); const part=w.substring(k,k+2); const ans=w.indexOf(part);
  return Q("What is printed?",`String s = "${w}";\nSystem.out.println(s.indexOf("${part}"));`,ans,[ans+1,ans-1,-1,k+2],
   `indexOf returns the index of the first match, counting from 0. "${part}" first starts at index ${ans}.`,`System.out.println("${w}".indexOf("${part}"));`);},
()=>{const a=R(1,9),b=R(1,9); const v=""+a+b+"!"+a+b; const v2=(a+b)+"!"+a+b;
  return Q("What is printed?",`int a = ${a}, b = ${b};\nSystem.out.println(a + b + "!" + a + b);`,v2,[v,(a+b)+"!"+(a+b),""+a+b+"!"+(a+b)],
   `Left to right: a + b is int addition (${a+b}); once a String joins, every later + concatenates: "${v2}".`,`int a=${a},b=${b};System.out.println(a + b + "!" + a + b);`);},
()=>{let x=R(3,9); const s=R(2,6),m=R(2,4),d=R(2,5); const x0=x; x+=s; x*=m; x=D(x,d); x%=7; x++;
  return Q("What is printed?",`int x = ${x0};\nx += ${s};\nx *= ${m};\nx /= ${d};\nx %= 7;\nx++;\nSystem.out.println(x);`,x,[x-1,x+1,D((x0+s)*m,d),((x0+s)*m/d%7+1).toFixed(2)],
   `x: ${x0} → ${x0+s} → ${(x0+s)*m} → ${D((x0+s)*m,d)} (int division) → ${D((x0+s)*m,d)%7} → ${x}.`,`int x=${x0};x+=${s};x*=${m};x/=${d};x%=7;x++;System.out.println(x);`);},
()=>{const k=R(4,15),m=R(-5,20); const lo=m,hi=m+k-1;
  return Q("Which values can <code>r</code> hold?",`int r = (int) (Math.random() * ${k}) + ${m};`,`${lo} to ${hi}, inclusive`,
   [`${lo} to ${hi+1}, inclusive`,`${lo+1} to ${hi+1}, inclusive`,`0 to ${k-1}, inclusive`,`${lo-1} to ${hi}, inclusive`,`${lo} to ${hi-1}, inclusive`],
   `Math.random() * ${k} is from 0.0 up to (not including) ${k}; the cast gives 0 to ${k-1}; adding ${m} gives ${lo} to ${hi}.`,
   `int lo=Integer.MAX_VALUE,hi=Integer.MIN_VALUE;for(int i=0;i<200000;i++){int r=(int)(Math.random()*${k})+${m};lo=Math.min(lo,r);hi=Math.max(hi,r);}System.out.println(lo+" to "+hi+", inclusive");`);},
];

/* ======================= UNIT 2 ======================= */
G["unit-2"]=[
()=>{const n=R(20,200),f=P([2,3]); let x=1,c=0; while(x<n){x*=f;c++;}
  return Q("What is printed?",`int x = 1, count = 0;\nwhile (x < ${n})\n{\n    x *= ${f};\n    count++;\n}\nSystem.out.println(x + " " + count);`,`${x} ${c}`,[`${x/f} ${c-1}`,`${x} ${c+1}`,`${x*f} ${c+1}`,`${x/f} ${c}`],
   `x takes the values ${(()=>{let y=1,a=[1];while(y<n){y*=f;a.push(y);}return a.join(", ");})()}. The loop stops when x = ${x} is no longer less than ${n}, after ${c} passes.`,
   `int x=1,count=0;while(x<${n}){x*=${f};count++;}System.out.println(x+" "+count);`);},
()=>{const a=R(0,4),b=R(10,25),s=R(2,4); let sum=0; for(let k=a;k<=b;k+=s)sum+=k; let s2=0; for(let k=a;k<b;k+=s)s2+=k;
  return Q("What is printed?",`int sum = 0;\nfor (int k = ${a}; k <= ${b}; k += ${s})\n{\n    sum += k;\n}\nSystem.out.println(sum);`,sum,[s2,sum+b,sum-a+1],
   `k takes ${(()=>{let r=[];for(let k=a;k<=b;k+=s)r.push(k);return r.join(", ");})()}; their sum is ${sum}.`,`int sum=0;for(int k=${a};k<=${b};k+=${s}){sum+=k;}System.out.println(sum);`);},
()=>{const a=R(1,9),b=R(1,9),c=R(1,9); const v=(a>b&&!(c===a))||b%2===0;
  return Q("What is the value of the expression?",`// a = ${a}, b = ${b}, c = ${c}\n(a > b && !(c == a)) || b % 2 == 0`,String(v),[String(!v),"compile error","run-time error"],
   `a > b is ${a>b}; !(c == a) is ${!(c===a)}; so the && part is ${a>b&&!(c===a)}. b % 2 == 0 is ${b%2===0}. ${a>b&&!(c===a)} || ${b%2===0} = ${v}.`,
   `int a=${a},b=${b},c=${c};System.out.println((a > b && !(c == a)) || b % 2 == 0);`);},
()=>{const sc=R(55,100); const g=sc>=90?"A":sc>=80?"B":sc>=70?"C":"F"; const wrong=sc>=70?"C":sc>=80?"B":sc>=90?"A":"F";
  const order=P([0,1]);
  const code=order?`int score = ${sc};\nString g = "F";\nif (score >= 90)       g = "A";\nelse if (score >= 80)  g = "B";\nelse if (score >= 70)  g = "C";\nSystem.out.println(g);`
                  :`int score = ${sc};\nString g = "F";\nif (score >= 70)       g = "C";\nelse if (score >= 80)  g = "B";\nelse if (score >= 90)  g = "A";\nSystem.out.println(g);`;
  const ans=order?g:wrong;
  return Q("What is printed?",code,ans,["A","B","C","F"].filter(x=>x!==ans),
   order?`The first true condition wins: ${sc} → ${g}.`:`The first test is score >= 70${sc>=70?", which is true for "+sc+", so g = \"C\" and the rest are skipped":", which is false; the later tests are false too, so g stays \"F\""}.`,
   `int score=${sc};String g="F";`+(order?`if(score>=90)g="A";else if(score>=80)g="B";else if(score>=70)g="C";`:`if(score>=70)g="C";else if(score>=80)g="B";else if(score>=90)g="A";`)+`System.out.println(g);`);},
()=>{const n=R(3,8),t=P([0,1,2]); let c=0; const hdr=t===0?`for (int j = 0; j < ${n}; j++)`:t===1?`for (int j = i; j < ${n}; j++)`:`for (int j = 0; j < i; j++)`;
  for(let i=0;i<n;i++){for(let j=(t===1?i:0);j<(t===2?i:n);j++)c++;}
  return Q("How many times is <code>count++</code> executed?",`int count = 0;\nfor (int i = 0; i < ${n}; i++)\n{\n    ${hdr}\n    {\n        count++;\n    }\n}`,c,[n*n,n*(n+1)/2,n*(n-1)/2,n*n-n,n+n].filter(x=>x!==c),
   t===0?`The inner loop runs ${n} times for each of the ${n} outer passes: ${n} × ${n} = ${c}.`:t===1?`The inner loop runs ${n}, ${n-1}, …, 1 times: ${c}.`:`The inner loop runs 0, 1, …, ${n-1} times: ${c}.`,
   `int count=0;for(int i=0;i<${n};i++){${hdr}{count++;}}System.out.println(count);`);},
()=>{const opts=[["!(x > 3 && y < 5)","x <= 3 || y >= 5",["x <= 3 && y >= 5","x < 3 || y > 5","!x > 3 || !y < 5"]],
  ["!(a || b)","!a && !b",["!a || !b","a && b","!a || b"]],["!(n >= 1 && n <= 10)","n < 1 || n > 10",["n < 1 && n > 10","n <= 1 || n >= 10","n > 1 || n < 10"]],
  ["!(s.equals(\"yes\") || k == 0)","!s.equals(\"yes\") && k != 0",["!s.equals(\"yes\") || k != 0","s.equals(\"no\") && k == 0","!s.equals(\"yes\") && k == 0"]]];
  const [e,a,d]=P(opts); return Q("Which expression is equivalent to the one shown?",e,a,d,`De Morgan: negate each part and swap && ↔ ||. The result is ${a}.`,null);},
];

/* ======================= UNIT 3 ======================= */
const COUNTER=`public class Counter\n{\n    private int count;\n    public Counter(int start)  { count = start; }\n    public void add(int k)     { count += k; }\n    public int get()           { return count; }\n}`;
const JCOUNTER=`class Counter{private int count;public Counter(int start){count=start;}public void add(int k){count+=k;}public int get(){return count;}}`;
G["unit-3"]=[
()=>{const s=R(0,9),a=R(1,9),b=R(1,9); const alias=P([0,1]);
  const code=COUNTER+`\n\n// client code\nCounter c1 = new Counter(${s});\nCounter c2 = ${alias?"c1":"new Counter("+s+")"};\nc1.add(${a});\nc2.add(${b});\nSystem.out.println(c1.get() + " " + c2.get());`;
  const ans=alias?`${s+a+b} ${s+a+b}`:`${s+a} ${s+b}`;
  return Q("What is printed?",code,ans,[alias?`${s+a} ${s+b}`:`${s+a+b} ${s+a+b}`,`${s+a} ${s+a+b}`,`${a} ${b}`,`${s} ${s}`,`${s+b} ${s+a}`],
   alias?`c2 = c1 copies the reference: both names refer to ONE object, so both adds change the same count (${s} + ${a} + ${b}).`:`Two separate objects, each starting at ${s}.`,
   `${JCOUNTER}`+`#Counter c1=new Counter(${s});Counter c2=${alias?"c1":"new Counter("+s+")"};c1.add(${a});c2.add(${b});System.out.println(c1.get()+" "+c2.get());`);},
()=>{const n=R(2,5); return Q("What is printed?",`public class Ticket\n{\n    private static int sold = 0;\n    private int number;\n    public Ticket()  { sold++; number = sold; }\n    public int getNumber()  { return number; }\n}\n\n// client code\nTicket t = null;\nfor (int i = 0; i < ${n}; i++)  t = new Ticket();\nTicket first = new Ticket();\nSystem.out.println(t.getNumber() + " " + first.getNumber());`,
  `${n} ${n+1}`,[`${n} 1`,`1 1`,`${n+1} ${n+1}`],`sold is static: one counter shared by every Ticket. The ${n}th ticket gets number ${n}; the next one gets ${n+1}.`,
  `class Ticket{private static int sold=0;private int number;public Ticket(){sold++;number=sold;}public int getNumber(){return number;}}#Ticket t=null;for(int i=0;i<${n};i++)t=new Ticket();Ticket first=new Ticket();System.out.println(t.getNumber()+" "+first.getNumber());`);},
()=>{const v=R(2,99); return Q("What is printed?",`public class Item\n{\n    private int price;\n    public Item(int price)\n    {\n        price = price;\n    }\n    public int getPrice()  { return price; }\n}\n\n// client code\nItem it = new Item(${v});\nSystem.out.println(it.getPrice());`,
  "0",[String(v),"null","Nothing: compile error"],`Inside the constructor, price means the parameter, so price = price changes nothing. The instance variable keeps its default, 0. Fix: this.price = price;`,
  `class Item{private int price;public Item(int price){price=price;}public int getPrice(){return price;}}#Item it=new Item(${v});System.out.println(it.getPrice());`);},
()=>{const n=R(1,9),a=R(1,9);
  return Q("What is printed?",COUNTER+`\n\npublic static void change(int n, Counter c)\n{\n    n = n + 10;\n    c.add(10);\n}\n\n// client code\nint n = ${n};\nCounter c = new Counter(${a});\nchange(n, c);\nSystem.out.println(n + " " + c.get());`,
  `${n} ${a+10}`,[`${n+10} ${a+10}`,`${n} ${a}`,`${n+10} ${a}`],`Java passes copies. The int copy changes only inside change. The Counter copy is a copy of the address, so c.add(10) changes the caller's object.`,
  `${JCOUNTER}`+`#static void change(int n,Counter c){n=n+10;c.add(10);}#int n=${n};Counter c=new Counter(${a});change(n,c);System.out.println(n+" "+c.get());`);},
()=>{const items=[["public int getAge()  { return age; }","accessor"],["public void setAge(int a)  { age = a; }","mutator"],["public Dog(String n)  { name = n; }","constructor"],["public String toString()  { return name; }","toString method (an accessor)"]];
  const [c,a]=P(items.slice(0,3)); return Q("What kind of member is this?",c,a,["accessor","mutator","constructor","static variable"].filter(x=>x!==a),
   a==="constructor"?"Same name as the class and no return type: a constructor.":a==="accessor"?"Returns data and changes nothing: an accessor.":"Changes an instance variable and returns nothing: a mutator.",null);},
];

/* ======================= UNIT 4 ======================= */
G["unit-4"]=[
()=>{const a=Array.from({length:R(5,7)},()=>R(1,9)); const b=a.slice(); for(let i=1;i<b.length;i++) b[i]=b[i]+b[i-1]; const k=R(2,b.length-1);
  const wrong=a.slice(); for(let i=1;i<wrong.length;i++) wrong[i]=a[i]+a[i-1];
  return Q("What is printed?",`int[] a = {${a.join(", ")}};\nfor (int i = 1; i < a.length; i++)\n{\n    a[i] = a[i] + a[i - 1];\n}\nSystem.out.println(a[${k}]);`,b[k],[wrong[k],b[k-1],b[k]+a[k],a[k]],
   `Each a[i - 1] has already been updated, so the array becomes running totals: {${b.join(", ")}}. a[${k}] = ${b[k]}.`,
   `int[] a={${a.join(",")}};for(int i=1;i<a.length;i++){a[i]=a[i]+a[i-1];}System.out.println(a[${k}]);`);},
()=>{const l=[]; const ops=[]; const j=[];
  const n1=SH(NAMES).slice(0,5);
  l.push(n1[0]);ops.push(`list.add("${n1[0]}");`); l.push(n1[1]);ops.push(`list.add("${n1[1]}");`);
  l.splice(1,0,n1[2]); ops.push(`list.add(1, "${n1[2]}");`); l.push(n1[3]); ops.push(`list.add("${n1[3]}");`);
  const ri=R(0,3); l.splice(ri,1); ops.push(`list.remove(${ri});`); const si=R(0,l.length-1); l[si]=n1[4]; ops.push(`list.set(${si}, "${n1[4]}");`);
  const ans=L(l); const alt=n1.slice(0,4);
  return Q("What is printed?",`ArrayList<String> list = new ArrayList<String>();\n${ops.join("\n")}\nSystem.out.println(list);`,ans,[L(alt),L(l.slice().reverse()),L([...l,n1[4]])],
   `add(1, …) inserts and shifts right; remove(${ri}) shifts left; set replaces. Final list: ${ans}.`,
   `ArrayList<String> list=new ArrayList<String>();${ops.join("")}System.out.println(list);`);},
()=>{const r=R(2,4),c=R(3,5),k=R(2,5),row=R(0,r-1),col=R(0,c-1); const askRow=P([0,1]);
  let s=0; if(askRow){for(let j=0;j<c;j++)s+=row*k+j;}else{for(let i=0;i<r;i++)s+=i*k+col;}
  const code=`int[][] m = new int[${r}][${c}];\nfor (int i = 0; i < m.length; i++)\n    for (int j = 0; j < m[0].length; j++)\n        m[i][j] = i * ${k} + j;\nint sum = 0;\n`+(askRow?`for (int j = 0; j < m[0].length; j++)\n    sum += m[${row}][j];`:`for (int i = 0; i < m.length; i++)\n    sum += m[i][${col}];`)+`\nSystem.out.println(sum);`;
  let alt=0; if(askRow){for(let i=0;i<r;i++)alt+=i*k+row;}else{for(let j=0;j<c;j++)alt+=col*k+j;}
  return Q("What is printed?",code,s,[alt,s+k,s-(askRow?c:r)],askRow?`Row ${row} holds ${Array.from({length:c},(_,j)=>row*k+j).join(", ")}; the sum is ${s}.`:`Column ${col} holds ${Array.from({length:r},(_,i)=>i*k+col).join(", ")}; the sum is ${s}.`,
   code.replace(/\n/g,""));},
()=>{const n=R(7,11); const a=Array.from({length:n},(_,i)=>i*3+R(1,2)); const pick=P([0,1]); const t=pick?a[R(0,n-1)]:a[R(0,n-2)]+1;
  let lo=0,hi=n-1,mids=[]; while(lo<=hi){const mid=D(lo+hi,2);mids.push(a[mid]);if(a[mid]===t)break;else if(a[mid]<t)lo=mid+1;else hi=mid-1;}
  const ans=mids.join(", ");
  return Q(`Binary search for <code>${t}</code>. Which values of <code>a[mid]</code> are checked, in order?`,`int[] a = {${a.join(", ")}};\n// low = 0, high = a.length - 1\n// mid = (low + high) / 2 each step`,ans,
   [mids.slice(0,-1).join(", ")||String(a[0]),a.slice(0,mids.length).join(", "),[...mids].reverse().join(", ")],
   `Each step compares a[mid] with ${t} and keeps the half that could contain it: ${ans}${a.includes(t)?"":" (then low > high, so −1)"}.`,
   `int[] a={${a.join(",")}};int lo=0,hi=a.length-1;String s="";while(lo<=hi){int mid=(lo+hi)/2;s+=(s.isEmpty()?"":", ")+a[mid];if(a[mid]==${t})break;else if(a[mid]<${t})lo=mid+1;else hi=mid-1;}System.out.println(s);`);},
()=>{const a=SH([R(1,9),R(10,19),R(20,29),R(30,39),R(40,49),R(50,59)]).slice(0,R(5,6)); const p=R(1,3); const sel=P([0,1]);
  const b=a.slice(); if(sel){for(let i=0;i<p;i++){let mn=i;for(let j=i+1;j<b.length;j++)if(b[j]<b[mn])mn=j;[b[i],b[mn]]=[b[mn],b[i]];}}
  else{for(let i=1;i<=p;i++){const key=b[i];let j=i-1;while(j>=0&&b[j]>key){b[j+1]=b[j];j--;}b[j+1]=key;}}
  const other=a.slice(); if(!sel){for(let i=0;i<p;i++){let mn=i;for(let j=i+1;j<other.length;j++)if(other[j]<other[mn])mn=j;[other[i],other[mn]]=[other[mn],other[i]];}}
  else{for(let i=1;i<=p;i++){const key=other[i];let j=i-1;while(j>=0&&other[j]>key){other[j+1]=other[j];j--;}other[j+1]=key;}}
  const sorted=a.slice().sort((x,y)=>x-y);
  const run=(q)=>{const c=a.slice(); if(sel){for(let i=0;i<q;i++){let mn=i;for(let j=i+1;j<c.length;j++)if(c[j]<c[mn])mn=j;[c[i],c[mn]]=[c[mn],c[i]];}} else {for(let i=1;i<=q;i++){const key=c[i];let j=i-1;while(j>=0&&c[j]>key){c[j+1]=c[j];j--;}c[j+1]=key;}} return c;};
  const extra=[run(p-1),run(p+1),[...b.slice(1),b[0]],[b[1],b[0],...b.slice(2)]].map(x=>`{${x.join(", ")}}`);
  return Q(`An array is sorted with <b>${sel?"selection":"insertion"} sort</b> (as on the Sorting poster). What does it look like after <b>${p}</b> pass${p>1?"es":""} of the outer loop?`,`int[] a = {${a.join(", ")}};`,`{${b.join(", ")}}`,
   [`{${other.join(", ")}}`,`{${sorted.join(", ")}}`,`{${a.join(", ")}}`,...extra,`{${b.slice().reverse().join(", ")}}`],
   sel?`Each pass swaps the smallest remaining value into the next spot.`:`Each pass inserts the next value into the sorted part on the left.`,
   `int[] a={${a.join(",")}};`+(sel?`for(int i=0;i<${p};i++){int mn=i;for(int j=i+1;j<a.length;j++)if(a[j]<a[mn])mn=j;int t=a[i];a[i]=a[mn];a[mn]=t;}`:`for(int i=1;i<=${p};i++){int key=a[i];int j=i-1;while(j>=0&&a[j]>key){a[j+1]=a[j];j--;}a[j+1]=key;}`)+`System.out.println("{"+Arrays.toString(a).replace("[","").replace("]","")+"}");`);},
()=>{const n=R(5,40),d=P([2,3]); const f=x=>x<d?x:f(D(x,d))+M(x,d); const v=f(n);
  return Q(`What does <code>mystery(${n})</code> return?`,`public static int mystery(int n)\n{\n    if (n < ${d})\n        return n;\n    return mystery(n / ${d}) + n % ${d};\n}`,v,[v+1,v-1,M(n,d),D(n,d)],
   `Calls: ${(()=>{let x=n,a=[];while(x>=d){a.push(`mystery(${x}) = mystery(${D(x,d)}) + ${M(x,d)}`);x=D(x,d);}a.push(`mystery(${x}) = ${x}`);return a.join("; ");})()}. Adding back up gives ${v}.`,
   `#static int mystery(int n){if(n<${d})return n;return mystery(n/${d})+n%${d};}#System.out.println(mystery(${n}));`);},
()=>{const a=Array.from({length:R(5,7)},()=>R(1,9)); const t=R(3,7); let c=0; for(const x of a) if(x>t)c++;
  const ans=c; return Q("What is printed?",`int[] a = {${a.join(", ")}};\nint c = 0;\nfor (int x : a)\n{\n    if (x > ${t})  c++;\n}\nSystem.out.println(c);`,ans,[a.filter(x=>x>=t).length,a.length-c,a.filter(x=>x<t).length],
   `Values greater than ${t}: ${a.filter(x=>x>t).join(", ")||"none"} → ${c}.`,`int[] a={${a.join(",")}};int c=0;for(int x:a){if(x>${t})c++;}System.out.println(c);`);},
];

/* ======================= STUDY CARDS ======================= */
const CARDS={
"unit-1":[["primitive type","int, double or boolean: the variable stores the value itself"],["reference type","a variable that stores the address of an object (String, Scanner, …)"],["integer division","int / int drops the decimal: 7 / 2 is 3"],["%","remainder: 17 % 5 is 2"],["casting","(int) 3.9 is 3; (double) 7 / 2 is 3.5"],["overflow","an int past Integer.MAX_VALUE wraps to Integer.MIN_VALUE"],["method signature","name + parameter list"],["overloading","same method name, different parameter lists"],["static (class) method","called with the class name: Math.sqrt(9)"],["instance method","called on an object: s.length()"],["null","a reference to no object; calling a method on it throws NullPointerException"],["immutable","Strings never change; methods return new Strings"],["substring(a, b)","characters from index a up to b − 1"],["precondition","what must be true before a method is called"]],
"unit-2":[["short-circuit","&& stops at the first false; || stops at the first true"],["De Morgan","!(a && b) == !a || !b;  !(a || b) == !a && !b"],["else if chain","runs at most one branch: the first true one"],["dangling else","else pairs with the nearest if"],["while loop","tests before each pass; may run 0 times"],["for loop","for (init; test; update)"],["off by one","a loop that runs one time too many or too few"],["infinite loop","the test never becomes false"],["nested loop","the inner loop runs fully for each outer pass"],["statement execution count","how many times a line runs; used for informal run-time analysis"],["% 10 and / 10","get the last digit / remove the last digit"]],
"unit-3":[["class","a blueprint for objects"],["object","an instance of a class"],["instance variable","data each object keeps; private"],["constructor","same name as class, no return type, runs with new"],["accessor","returns data without changing it"],["mutator","changes an instance variable"],["encapsulation","private data + public methods"],["this","the object whose method is running"],["static variable","one copy shared by all objects of the class"],["scope","where a variable can be used"],["local variable","declared inside a method; gone when it ends"],["alias","two references to the same object"],["pass by value","Java copies arguments; for objects it copies the address"]],
"unit-4":[["array","fixed-length list of one type; a[i], a.length"],["ArrayIndexOutOfBoundsException","index < 0 or ≥ length"],["enhanced for","for (int x : a): reads values; can't change elements"],["ArrayList","resizable list of objects; get, set, add, remove, size"],["wrapper class","Integer and Double: objects that hold an int / double"],["autoboxing","int → Integer automatically"],["remove while traversing","go backward, or don't i++ after a remove"],["2D array","array of rows: m[row][col], m.length rows, m[0].length columns"],["row-major","outer loop rows, inner loop columns"],["linear search","check each element; works on unsorted data"],["binary search","halves a sorted range each step; about log₂ n steps"],["selection sort","swap the smallest remaining into place"],["insertion sort","insert each value into the sorted left part"],["merge sort","split in halves, sort, merge; about n log n"],["base case","the input a recursive method answers without recursing"],["File + Scanner","new Scanner(new File(name)); method needs throws IOException"]]
};

function codeHtml(s){return `<pre class="pcode">${E(s)}</pre>`;}
function qHtml(o,i){return `<div class="pq" data-ai="${o.ai}"><p class="pqt"><b>${i+1}.</b> ${o.q}</p>${o.code?codeHtml(o.code):""}<div class="pch">${o.ch.map((c,j)=>`<button type="button" data-j="${j}"><b>${"ABCD"[j]}</b> ${E(c)}</button>`).join("")}</div><div class="pex" hidden><b></b> ${E(o.ex)}</div></div>`;}
function set(id){const g=G[id]; const order=SH(g.map((_,i)=>i)); return order.slice(0,Math.min(5,g.length)).map(i=>g[i]());}
function block(id){
  return `<div class="prac" data-u="${id}"><div class="pbar"><b>Trace the code</b> <span>New numbers every time. Pick an answer to see why.</span><button type="button" class="pnew">New set ↻</button></div><div class="pqs">${set(id).map(qHtml).join("")}</div>
  <h4 class="pcards-h">Study cards <span>tap a card to flip it</span></h4><div class="pcards">${CARDS[id].map(([t,d])=>`<button type="button" class="pcard"><span class="f">${E(t)}</span><span class="b">${E(d)}</span></button>`).join("")}</div></div>`;
}
function bind(root){
  root.querySelectorAll(".prac").forEach(p=>{
    const wire=()=>p.querySelectorAll(".pq").forEach(q=>q.querySelectorAll(".pch button").forEach(b=>b.onclick=()=>{
      if(q.classList.contains("done"))return; q.classList.add("done"); const ai=+q.dataset.ai, j=+b.dataset.j;
      q.querySelectorAll(".pch button").forEach((x,k)=>{if(k===ai)x.classList.add("ok"); else if(k===j)x.classList.add("no");});
      const ex=q.querySelector(".pex"); ex.hidden=false; ex.querySelector("b").textContent=j===ai?"Correct.":"Not quite.";}));
    wire();
    p.querySelector(".pnew").onclick=()=>{p.querySelector(".pqs").innerHTML=set(p.dataset.u).map(qHtml).join("");wire();};
    p.querySelectorAll(".pcard").forEach(c=>c.onclick=()=>c.classList.toggle("flip"));
  });
}
const api={units:["unit-1","unit-2","unit-3","unit-4"],block,bind,G,CARDS};
if(typeof window!=="undefined") window.PRACTICE=api; if(typeof module!=="undefined") module.exports=api;
})();
