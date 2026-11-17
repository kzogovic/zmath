/* Z-AP Computer Science A question bank, part 2: Unit 3 (Class Creation) and Unit 4 (Data Collections). */
(function(){
"use strict";
const {R,P,SH,D,M,jd,E,C,JS,L,tbl,arr,WORDS,NAMES,randArr}=CSBANK.helpers, T=CSBANK.T;
const local=code=>code.replace(/public class/g,"class");   /* class definitions become local classes in the Java check */
const pr=a=>a.join(" ");                                       /* print loop output: values separated by spaces */
const PRINT="for (int v : a)\n    System.out.print(v + \" \");";

/* ============================== UNIT 3: Class Creation ============================== */
const COUNTER=(f)=>`public class Ticket\n{\n    private static int count = 0;\n    private int id;\n\n    public Ticket()\n    {\n        count++;\n        id = count;\n    }\n\n    public int getId() { return id; }\n    public static int getCount() { return count; }\n}`;
T(3,1,"static variables",()=>{ const n=R(3,6), k=R(1,n);
 const cls=COUNTER(); const make=Array.from({length:n},(_,i)=>`Ticket t${i+1} = new Ticket();`).join("\n");
 const ans=`${k} ${n}`;
 return {q:`The class ${C("Ticket")} is shown. What is printed by the code segment that follows it?`,code:`${cls}\n\n// in main\n${make}\nSystem.out.println(t${k}.getId() + " " + Ticket.getCount());`,ans,
  dis:[[`${k} ${k}`,"count is static: one shared variable for the whole class. It is "+n+" after all "+n+" objects are created."],[`${n} ${n}`,"id is an instance variable: each Ticket keeps the value of count at the moment it was created."],[`1 ${n}`,"Each new Ticket increments the shared count before copying it into id."]],
  steps:[`${C("count")} is <b>static</b>: there is one copy, shared by every Ticket. ${C("id")} is an instance variable: each object has its own.`,`Each constructor call does count++ then id = count. So t1.id = 1, t2.id = 2, …, t${n}.id = ${n}, and count ends at ${n}.`,`t${k}.getId() = ${k}; Ticket.getCount() = ${n}. Printed: <b>${ans}</b>.`],
  java:`${local(cls)}\n${make}System.out.println(t${k}.getId()+" "+Ticket.getCount());`}; });
const BOX=`public class Box\n{\n    private int value;\n\n    public Box(int v) { value = v; }\n\n    public void add(int n) { value += n; }\n\n    public void scale(int f) { value *= f; }\n\n    public int getValue() { return value; }\n}`;
T(3,1,"Calling methods on objects",()=>{ const v=R(1,9),a=R(2,6),f=R(2,3),c=R(1,5); const r=((v+a)*f)+c;
 return {q:`Using the ${C("Box")} class shown, what is printed?`,code:`${BOX}\n\n// in main\nBox b = new Box(${v});\nb.add(${a});\nb.scale(${f});\nb.add(${c});\nSystem.out.println(b.getValue());`,ans:r,
  dis:[[v+a*f+c,"Each call changes value in order: add first, then scale the new value."],[(v+a+c)*f,"scale("+f+") happens before the last add("+c+")."],[v,"Mutator methods change the object's instance variable."]],
  steps:[tbl(["call","value"],[[`new Box(${v})`,v],[`add(${a})`,v+a],[`scale(${f})`,(v+a)*f],[`add(${c})`,r]]),`Printed: <b>${r}</b>.`],
  java:`${local(BOX)}\nBox b=new Box(${v});b.add(${a});b.scale(${f});b.add(${c});System.out.println(b.getValue());`}; });
T(3,1,"Parts of a class",()=>{ const it=P([[`public Song(String t, int len)\n{\n    title = t;\n    length = len;\n}`,"constructor","Same name as the class and no return type: a constructor."],[`public int getLength()\n{\n    return length;\n}`,"accessor method","Returns an instance variable's value without changing it: an accessor (getter)."],[`public void setLength(int len)\n{\n    length = len;\n}`,"mutator method","void and changes an instance variable: a mutator (setter)."],[`private int length;`,"instance variable","Declared inside the class, outside every method, without static: an instance variable."],[`private static int songCount;`,"static (class) variable","static means one shared copy for the whole class."]]);
 const all=["constructor","accessor method","mutator method","instance variable","static (class) variable","local variable"];
 return {q:`In a class named ${C("Song")}, which best describes this code?`,code:it[0],ans:it[1],dis:all.filter(x=>x!==it[1]).slice(0,3).map(x=>[x,it[2]]),steps:[it[2]],java:null}; });
T(3,2,"Shadowing bug in a constructor",()=>{ const nm=P(NAMES); const cls=`public class Pet\n{\n    private String name;\n\n    public Pet(String name)\n    {\n        name = name;\n    }\n\n    public String getName() { return name; }\n}`;
 return {q:`What is printed?`,code:`${cls}\n\n// in main\nPet p = new Pet(${JS(nm)});\nSystem.out.println(p.getName());`,ans:"null",
  dis:[[nm,"Inside the constructor, \"name\" means the PARAMETER (it shadows the instance variable), so the instance variable is never set."],["name","The text \"name\" is not printed; a variable's value is."],["Compile-time error","Assigning a variable to itself is legal Java (just useless)."]],
  steps:[`The parameter is also called ${C("name")}. Inside the constructor, the closer variable (the parameter) <b>shadows</b> the instance variable.`,`${C("name = name;")} copies the parameter into itself. The instance variable keeps its default value: ${C("null")} for a String.`,`Fix: ${C("this.name = name;")}. Printed: <b>null</b>.`],
  java:`${local(cls)}\nPet p=new Pet(${JS(nm)});System.out.println(p.getName());`}; });
T(3,2,"Passing primitives and references",()=>{ const x=R(2,9), v=R(1,9), a=R(2,6); const cls=`public class Box\n{\n    private int value;\n    public Box(int v) { value = v; }\n    public void add(int n) { value += n; }\n    public int getValue() { return value; }\n}`;
 const meth=`public static void change(int n, Box b)\n{\n    n += ${a};\n    b.add(${a});\n}`;
 return {q:`Using the ${C("Box")} class and the static method ${C("change")}, what is printed?`,code:`${cls}\n\n${meth}\n\n// in main\nint x = ${x};\nBox b = new Box(${v});\nchange(x, b);\nSystem.out.println(x + " " + b.getValue());`,ans:`${x} ${v+a}`,
  dis:[[`${x+a} ${v+a}`,"An int parameter is a COPY: changing n does not change x."],[`${x} ${v}`,"b is a copy of the reference, but it refers to the SAME Box object, so b.add changes that object."],[`${x+a} ${v}`,"It's the other way round: the primitive is unchanged, the object is changed."]],
  steps:[`Java passes copies of values. For ${C("x")}, the copy ${C("n")} gets ${x}; ${C("n += "+a)} changes only the copy. x stays ${x}.`,`For the object, the copy is a copy of the <b>reference</b>: both point to the same Box. ${C(`b.add(${a})`)} changes that Box: ${v} → ${v+a}.`,`Printed: <b>${x} ${v+a}</b>.`],
  java:`${local(cls)}\nclass H{static void change(int n,Box b){n+=${a};b.add(${a});}}\nint x=${x};Box b=new Box(${v});H.change(x,b);System.out.println(x+" "+b.getValue());`}; });
T(3,2,"toString",()=>{ const nm=P(NAMES), sc=R(60,99); const cls=`public class Player\n{\n    private String name;\n    private int score;\n\n    public Player(String n, int s)\n    {\n        name = n;\n        score = s;\n    }\n\n    public String toString()\n    {\n        return name + ": " + score;\n    }\n}`;
 return {q:`What is printed?`,code:`${cls}\n\n// in main\nPlayer p = new Player(${JS(nm)}, ${sc});\nSystem.out.println(p);`,ans:`${nm}: ${sc}`,
  dis:[["Player@1b6d3586","Because Player defines toString, println uses it instead of the default ClassName@hashcode text."],[`${nm} ${sc}`,"toString returns name + \": \" + score, including the colon."],["p","The variable name is not printed; the object's toString result is."]],
  steps:[`${C("System.out.println(p)")} automatically calls ${C("p.toString()")}.`,`It returns ${C(`name + ": " + score`)} = "${nm}: ${sc}".`,`Printed: <b>${nm}: ${sc}</b>.`],
  java:`${local(cls)}\nPlayer p=new Player(${JS(nm)},${sc});System.out.println(p);`}; });
T(3,2,"Local variable versus instance variable",()=>{ const t0=R(1,9), a=R(2,7); const cls=`public class Tally\n{\n    private int total = ${t0};\n\n    public void update(int n)\n    {\n        int total = n;\n        total += ${a};\n    }\n\n    public int getTotal() { return total; }\n}`;
 const n=R(10,20);
 return {q:`What is printed?`,code:`${cls}\n\n// in main\nTally t = new Tally();\nt.update(${n});\nSystem.out.println(t.getTotal());`,ans:t0,
  dis:[[n+a,"int total = n; declares a NEW local variable that hides the instance variable."],[n,"Neither change affects the instance variable."],[t0+a,"total += "+a+" changes the local variable."]],
  steps:[`${C("int total = n;")} declares a <b>local</b> variable named total, which shadows the instance variable inside update.`,`Both statements change only the local variable, which disappears when the method ends.`,`The instance variable is still ${t0}. Printed: <b>${t0}</b>.`],
  java:`${local(cls)}\nTally t=new Tally();t.update(${n});System.out.println(t.getTotal());`}; });
const ACCT=`public class Account\n{\n    private int balance;\n\n    public Account(int b) { balance = b; }\n\n    public void deposit(int amt) { balance += amt; }\n\n    public int getBalance() { return balance; }\n}`;
T(3,3,"Aliases",()=>{ const b0=R(5,20)*10, d=R(1,9)*10, n2=R(1,9)*5;
 return {q:`Using the ${C("Account")} class, what is printed?`,code:`${ACCT}\n\n// in main\nAccount a = new Account(${b0});\nAccount b = a;\nb.deposit(${d});\na = new Account(${n2});\na.deposit(${d});\nSystem.out.println(a.getBalance() + " " + b.getBalance());`,ans:`${n2+d} ${b0+d}`,
  dis:[[`${n2+d} ${b0}`,"b and a referred to the same object when b.deposit("+d+") ran, so that deposit changed the original account."],[`${b0+2*d} ${b0+2*d}`,"a = new Account("+n2+") makes a refer to a NEW object; b still refers to the old one."],[`${n2+d} ${n2+d}`,"Reassigning a does not change what b refers to."]],
  steps:[`${C("Account b = a;")} copies the reference: a and b are <b>aliases</b> for one object (balance ${b0}).`,`${C(`b.deposit(${d})`)} → that object's balance is ${b0+d}.`,`${C(`a = new Account(${n2})`)} → a now refers to a new object; b still refers to the first one.`,`${C(`a.deposit(${d})`)} → the new object has ${n2+d}.`,`Printed: <b>${n2+d} ${b0+d}</b>.`],
  java:`${local(ACCT)}\nAccount a=new Account(${b0});Account b=a;b.deposit(${d});a=new Account(${n2});a.deposit(${d});System.out.println(a.getBalance()+" "+b.getBalance());`}; });
T(3,3,"Static and instance together",()=>{ const k=R(2,5), m=R(1,4), j=R(1,4); const cls=`public class Club\n{\n    private static int total = 0;\n    private int visits = 0;\n\n    public void visit(int n)\n    {\n        visits += n;\n        total += n;\n    }\n\n    public int getVisits() { return visits; }\n    public static int getTotal() { return total; }\n}`;
 return {q:`What is printed?`,code:`${cls}\n\n// in main\nClub x = new Club();\nClub y = new Club();\nx.visit(${k});\ny.visit(${m});\nx.visit(${j});\nSystem.out.println(x.getVisits() + " " + y.getVisits() + " " + Club.getTotal());`,ans:`${k+j} ${m} ${k+m+j}`,
  dis:[[`${k+j} ${m} ${k+j}`,"total is static, shared by x and y, so y's visit counts too."],[`${k+m+j} ${k+m+j} ${k+m+j}`,"visits is an instance variable: x and y each have their own."],[`${k} ${m} ${k+m+j}`,"x.visit is called twice."]],
  steps:[`visits belongs to each object; total is static (one copy for the class).`,tbl(["call","x.visits","y.visits","total"],[[`x.visit(${k})`,k,0,k],[`y.visit(${m})`,k,m,k+m],[`x.visit(${j})`,k+j,m,k+m+j]]),`Printed: <b>${k+j} ${m} ${k+m+j}</b>.`],
  java:`${local(cls)}\nClub x=new Club();Club y=new Club();x.visit(${k});y.visit(${m});x.visit(${j});System.out.println(x.getVisits()+" "+y.getVisits()+" "+Club.getTotal());`}; });
T(3,3,"Which statement compiles?",()=>{ const f=P(["age","score","level"]); const G=f[0].toUpperCase()+f.slice(1);
 const cls=`public class Person\n{\n    private int ${f};\n\n    public Person(int a) { ${f} = a; }\n\n    public int get${G}() { return ${f}; }\n}`;
 return {q:`The ${C("Person")} class is shown. Which statement, written in the main method of a DIFFERENT class, compiles without error?`,code:cls,ans:`int n = new Person(5).get${G}();`,
  dis:[[`int n = new Person().get${G}();`,"There is no constructor with no parameters: once you write a constructor, Java does not supply the default one."],[`Person p = new Person(5);\nint n = p.${f};`,f+" is private, so code outside Person cannot access it directly."],[`int n = Person.get${G}();`,"get"+G+" is an instance method (not static), so it must be called on an object."]],
  steps:[`The only constructor takes an int, so ${C("new Person()")} does not compile.`,`${C(f)} is private: only code inside Person can use it.`,`${C(`get${G}`)} is not static, so it needs an object: ${C(`new Person(5).get${G}()`)} works.`],java:null}; });

/* ============================== UNIT 4: Data Collections ============================== */
T(4,1,"Array indexes",()=>{ const a=randArr(R(5,7),1,20), i=R(0,a.length-2), k=R(1,3); const v=a[a.length-k]+a[i];
 return {q:`What is printed?`,code:`int[] a = ${arr(a)};\nSystem.out.println(a[a.length - ${k}] + a[${i}]);`,ans:v,
  dis:[[a[a.length-k-1]+a[i],"a.length is "+a.length+"; index a.length − "+k+" = "+(a.length-k)+" (indexes start at 0)."],[a[a.length-k]+a[i+1],"a["+i+"] is the element at index "+i+", counting from 0."],[`${a[a.length-k]}${a[i]}`,"Both are ints, so + adds them."]],
  steps:[`Indexes: ${a.map((x,j)=>`[${j}]=${x}`).join(", ")}; a.length = ${a.length}.`,`a[${a.length} − ${k}] = a[${a.length-k}] = ${a[a.length-k]}; a[${i}] = ${a[i]}.`,`${a[a.length-k]} + ${a[i]} = <b>${v}</b>.`],
  java:`int[] a=${arr(a)};System.out.println(a[a.length-${k}]+a[${i}]);`}; });
T(4,1,"ArrayList methods",()=>{ const w=SH(["red","blue","green","gold","pink","gray"]).slice(0,4); const list=[...w.slice(0,3)]; const steps=[];
 const i1=R(0,2); list.splice(i1,0,w[3]); const i2=R(0,3), nv="teal"; list[i2]=nv; const i3=R(0,3); const rem=list.splice(i3,1)[0];
 return {q:`What is printed?`,code:`ArrayList<String> c = new ArrayList<String>();\nc.add(${JS(w[0])});\nc.add(${JS(w[1])});\nc.add(${JS(w[2])});\nc.add(${i1}, ${JS(w[3])});\nc.set(${i2}, "teal");\nc.remove(${i3});\nSystem.out.println(c);`,ans:L(list),
  dis:[[L((()=>{ const l=[...w.slice(0,3),w[3]]; l[i2]="teal"; l.splice(i3,1); return l; })()),"add(index, x) INSERTS at that index (shifting the rest right); it does not add at the end."],[L((()=>{ const l=[...w.slice(0,3)]; l.splice(i1,0,w[3]); l.splice(i2,0,"teal"); l.splice(i3,1); return l; })()),"set REPLACES the element at that index; it does not insert."],[L((()=>{ const l=[...w.slice(0,3)]; l.splice(i1,0,w[3]); l[i2]="teal"; return l; })()),"remove(int) removes the element at that index."]],
  steps:[tbl(["call","list"],[[`add ×3`,L(w.slice(0,3))],[`add(${i1}, "${w[3]}")`,L((()=>{const l=[...w.slice(0,3)]; l.splice(i1,0,w[3]); return l;})())],[`set(${i2}, "teal")`,L((()=>{const l=[...w.slice(0,3)]; l.splice(i1,0,w[3]); l[i2]="teal"; return l;})())],[`remove(${i3})`,L(list)]]),`println on an ArrayList shows [a, b, c]. Printed: <b>${L(list)}</b>.`],
  java:`ArrayList<String> c=new ArrayList<String>();c.add(${JS(w[0])});c.add(${JS(w[1])});c.add(${JS(w[2])});c.add(${i1},${JS(w[3])});c.set(${i2},"teal");c.remove(${i3});System.out.println(c);`}; });
T(4,1,"2D array access",()=>{ const r=R(2,3), c=R(3,4); const g=Array.from({length:r},()=>randArr(c,1,9)); const i=R(0,r-1), j=R(0,c-1);
 const code=`int[][] g = {${g.map(x=>arr(x)).join(",\n             ")}};\nSystem.out.println(g[${i}][${j}] + " " + g.length + " " + g[0].length);`;
 const ans=`${g[i][j]} ${r} ${c}`;
 return {q:`What is printed?`,code,ans,dis:[[`${j<r&&i<c?g[j]?.[i]:g[0][0]} ${r} ${c}`,"g[row][column]: the first index picks the row."],[`${g[i][j]} ${c} ${r}`,"g.length is the number of ROWS; g[0].length is the number of columns."],[`${g[i][j]} ${r*c} ${c}`,"g.length counts rows (arrays inside g), not all elements."]],
  steps:[`g has ${r} rows and ${c} columns. ${C("g[row][col]")}.`,`Row ${i} is ${arr(g[i])}; column ${j} of it is ${g[i][j]}.`,`g.length = ${r} (rows); g[0].length = ${c} (columns). Printed: <b>${ans}</b>.`],
  java:code.replace(/\n/g,"")}; });
T(4,1,"for-each loop",()=>{ const a=randArr(R(6,8),1,12), t=R(4,8); const c=a.filter(x=>x>t).length, s=a.filter(x=>x>t).reduce((p,q)=>p+q,0);
 return {q:`What is printed?`,code:`int[] a = ${arr(a)};\nint sum = 0;\nfor (int x : a)\n{\n    if (x > ${t})\n        sum += x;\n}\nSystem.out.println(sum);`,ans:s,
  dis:[[c,"sum adds the values x, not 1 for each one."],[a.filter(x=>x>=t).reduce((p,q)=>p+q,0)===s?s+t:a.filter(x=>x>=t).reduce((p,q)=>p+q,0),"x > "+t+" does not include "+t+"."],[a.reduce((p,q)=>p+q,0),"Only values greater than "+t+" are added."]],
  steps:[`The enhanced for loop visits each value x in a: ${a.join(", ")}.`,`Values greater than ${t}: ${a.filter(x=>x>t).join(", ")||"none"}.`,`sum = <b>${s}</b>.`],
  java:`int[] a=${arr(a)};int sum=0;for(int x:a){if(x>${t})sum+=x;}System.out.println(sum);`}; });
T(4,1,"Reading a text file",()=>{ const it=P([["hasNext()","returns true if there is another token to read, so a while loop can stop at the end of the file."],["nextInt()","reads the next token as an int."],["nextLine()","reads the rest of the current line as a String."]]);
 const all=["hasNext()","nextInt()","nextLine()","close()"];
 const q={"hasNext()":"Which Scanner method is used as the loop condition to keep reading until the end of a file?","nextInt()":"Which Scanner method reads the next token from the file as an int?","nextLine()":"Which Scanner method reads everything up to the end of the current line as a String?"}[it[0]];
 return {q,code:`Scanner input = new Scanner(new File("data.txt"));\nwhile ( /* ? */ )\n{\n    /* process the data */\n}`,ans:it[0],dis:all.filter(x=>x!==it[0]).map(x=>[x,{"hasNext()":"hasNext() only checks; it does not read anything.","nextInt()":"nextInt() reads a value; it is not a true/false test.","nextLine()":"nextLine() reads a whole line, not one token.","close()":"close() ends reading; it does not read data."}[x]]),
  steps:[`Scanner methods on the Java Quick Reference: hasNext(), next(), nextInt(), nextDouble(), nextBoolean(), nextLine(), close().`,`${C(it[0])} ${it[1]}`],java:null}; });
T(4,2,"Removing inside a loop",()=>{ let a; do{ a=randArr(6,1,12); }while(!a.some((x,i)=>i<5&&x%2===0&&a[i+1]%2===0)); const l=[...a]; for(let i=0;i<l.length;i++) if(l[i]%2===0) l.splice(i,1);
 return {q:`What is printed?`,code:`ArrayList<Integer> list = new ArrayList<Integer>();\n// list contains ${L(a)}\nfor (int i = 0; i < list.size(); i++)\n{\n    if (list.get(i) % 2 == 0)\n        list.remove(i);\n}\nSystem.out.println(list);`,ans:L(l),
  dis:[[L(a.filter(x=>x%2)),"After remove(i), the next element slides into index i, and i++ skips it. Adjacent even numbers are missed."],[L(a.filter(x=>x%2===0)),"remove deletes the even numbers (it doesn't keep them)."],[L(a),"The loop does remove some elements."]],
  steps:[`When an element is removed, everything after it shifts left by one, but i still increases. The element that moved into position i is never checked.`,tbl(["i","list before the check","action"],(()=>{ const rows=[], m=[...a]; for(let i=0;i<m.length;i++){ const b=L(m); if(m[i]%2===0){ rows.push([i,b,`remove ${m[i]}`]); m.splice(i,1); } else rows.push([i,b,"keep"]); } return rows; })()),`Printed: <b>${L(l)}</b>. Fix: loop backward, or only do i++ when nothing is removed.`],
  java:`ArrayList<Integer> list=new ArrayList<Integer>();for(int v:new int[]${arr(a)})list.add(v);for(int i=0;i<list.size();i++){if(list.get(i)%2==0)list.remove(i);}System.out.println(list);`}; });
T(4,2,"Shifting array elements",()=>{ const a=randArr(5,1,9), left=Math.random()<0.5; const b=[...a]; if(left){ for(let i=0;i<b.length-1;i++) b[i]=b[i+1]; } else { for(let i=b.length-1;i>0;i--) b[i]=b[i-1]; }
 const wrong=[...a]; if(left){ for(let i=wrong.length-1;i>0;i--) wrong[i-1]=wrong[i]; } else { for(let i=1;i<wrong.length;i++) wrong[i]=wrong[i-1]; }
 const loop=left?`for (int i = 0; i < a.length - 1; i++)\n    a[i] = a[i + 1];`:`for (int i = a.length - 1; i > 0; i--)\n    a[i] = a[i - 1];`;
 return {q:`What is printed?`,code:`int[] a = ${arr(a)};\n${loop}\n${PRINT}`,ans:pr(b),
  dis:[[pr(wrong),"Trace in the loop's real order; each assignment uses the value currently in the array."],[pr(left?[...a.slice(1),a[0]]:[a[4],...a.slice(0,4)]),"This is not a rotation: the "+(left?"first":"last")+" value is overwritten and lost, and the "+(left?"last":"first")+" value stays."],[pr(a),"The loop changes the array."]],
  steps:[`Each pass copies a neighbor into a[i]:`,tbl(["i","statement","array after"],(()=>{ const m=[...a], rows=[]; if(left){ for(let i=0;i<m.length-1;i++){ m[i]=m[i+1]; rows.push([i,`a[${i}] = a[${i+1}]`,pr(m)]); } } else { for(let i=m.length-1;i>0;i--){ m[i]=m[i-1]; rows.push([i,`a[${i}] = a[${i-1}]`,pr(m)]); } } return rows; })()),`Printed: <b>${pr(b)}</b>.`],
  java:`int[] a=${arr(a)};${loop.replace(/\n/g,"")}for(int v:a)System.out.print(v+" ");System.out.println();`}; });
T(4,2,"for-each cannot change the array",()=>{ const a=randArr(4,1,9), m=R(2,3);
 return {q:`What is printed?`,code:`int[] a = ${arr(a)};\nfor (int x : a)\n{\n    x *= ${m};\n}\n${PRINT}`,ans:pr(a),
  dis:[[pr(a.map(x=>x*m)),"x is a COPY of each element. Changing x does not change the array."],[pr(a.map((x,i)=>i===a.length-1?x*m:x)),"No element is changed, not even the last one."],["Compile-time error","Changing the loop variable is legal; it just has no effect on the array."]],
  steps:[`In ${C("for (int x : a)")}, x receives a copy of each element's value.`,`${C(`x *= ${m}`)} changes the copy only. The array is unchanged. (To change it, use an indexed loop: a[i] *= ${m}.)`,`Printed: <b>${pr(a)}</b>.`],
  java:`int[] a=${arr(a)};for(int x:a){x*=${m};}for(int v:a)System.out.print(v+" ");System.out.println();`}; });
T(4,2,"Row and column sums",()=>{ const r=3,c=R(3,4); const g=Array.from({length:r},()=>randArr(c,1,9)); const col=Math.random()<0.5, k=col?R(0,c-1):R(0,r-1);
 const s=col?g.reduce((p,row)=>p+row[k],0):g[k].reduce((p,q)=>p+q,0);
 const loop=col?`for (int r = 0; r < g.length; r++)\n    sum += g[r][${k}];`:`for (int c = 0; c < g[${k}].length; c++)\n    sum += g[${k}][c];`;
 const code=`int[][] g = {${g.map(x=>arr(x)).join(",\n             ")}};\nint sum = 0;\n${loop}\nSystem.out.println(sum);`;
 const other=col?(k<r?g[k].reduce((p,q)=>p+q,0):g[0].reduce((p,q)=>p+q,0)):(k<c?g.reduce((p,row)=>p+row[k],0):g.reduce((p,row)=>p+row[0],0));
 return {q:`What is printed?`,code,ans:s,dis:[[other===s?s+1:other,col?"g[r]["+k+"] fixes the COLUMN at "+k+" and moves down the rows.":"g["+k+"][c] fixes the ROW at "+k+" and moves across the columns."],[g.flat().reduce((p,q)=>p+q,0),"Only one "+(col?"column":"row")+" is added."],[col?g[0][k]+g[1][k]:g[k][0]+g[k][1],"The loop visits every "+(col?"row":"column")+", including the last."]],
  steps:[col?`The loop keeps the column fixed at ${k} and moves through every row: ${g.map(x=>x[k]).join(" + ")}.`:`The loop keeps the row fixed at ${k} and moves through every column: ${g[k].join(" + ")}.`,`sum = <b>${s}</b>.`],
  java:code.replace(/\n/g,"")}; });
T(4,2,"ArrayList remove: index or value?",()=>{ const a=SH([2,5,7,1,9,4]).slice(0,5); const idx=R(0,3); const l=[...a]; l.splice(idx,1);
 const byVal=[...a]; const vi=byVal.indexOf(idx); if(vi>=0) byVal.splice(vi,1);
 return {q:`${C("nums")} is an ArrayList&lt;Integer&gt; containing ${L(a)}. What is printed?`,code:`nums.remove(${idx});\nSystem.out.println(nums);`,ans:L(l),
  dis:[[vi>=0?L(byVal):L(a.filter((_,j)=>j!==idx+1)),vi>=0?"remove(int) removes by INDEX, not by value. To remove the value "+idx+", you would write remove(Integer.valueOf("+idx+")).":"Indexes start at 0."],[L(a.slice(0,-1)),"remove("+idx+") removes the element at index "+idx+", not the last element."],[L(a),"The list changes: one element is removed."]],
  steps:[`With an int argument, ${C("remove")} removes the element at that <b>index</b>.`,`Index ${idx} holds ${a[idx]}. Removing it gives ${L(l)}.`,`Printed: <b>${L(l)}</b>.`],
  java:`ArrayList<Integer> nums=new ArrayList<Integer>();for(int v:new int[]${arr(a)})nums.add(v);nums.remove(${idx});System.out.println(nums);`}; });
T(4,2,"Linear search",()=>{ const a=randArr(7,1,9), t=a[R(0,6)]; const first=a.indexOf(t), last=a.lastIndexOf(t); const fl=Math.random()<0.5;
 const code=`int[] a = ${arr(a)};\nint pos = -1;\nfor (int i = 0; i < a.length; i++)\n{\n    if (a[i] == ${t})\n        pos = i;\n}\nSystem.out.println(pos);`;
 return {q:`What is printed?`,code,ans:last,
  dis:[[first===last?last+1:first,"The loop does not stop when it finds "+t+"; it keeps going and pos is overwritten by every later match."],[-1,t+" is in the array, so pos changes."],[a.filter(x=>x===t).length,"pos stores an index, not a count."]],
  steps:[`Every time a[i] == ${t}, pos is set to i. The loop never stops early.`,`${t} is at index${first===last?"":"es"} ${a.map((x,i)=>x===t?i:null).filter(x=>x!==null).join(", ")}. The last assignment wins.`,`Printed: <b>${last}</b>.`],
  java:code.replace(/\n/g,"")}; });
T(4,3,"Recursion: return value",()=>{ const v=R(0,2); let code,f,name; if(v===0){ const k=R(1,3),n=R(4,7); f=x=>x<=1?k:f(x-1)+x; code=`public static int f(int n)\n{\n    if (n <= 1)\n        return ${k};\n    return f(n - 1) + n;\n}`; name=`f(${n})`;
  const calls=[]; for(let x=n;x>=1;x--) calls.push(x<=1?`f(1) = ${k}`:`f(${x}) = f(${x-1}) + ${x}`); const ans=f(n);
  return {q:`What value is returned by ${C(name)}?`,code,ans,dis:[[ans-k+1,"The base case returns "+k+", not 1."],[ans-n,"f("+n+") itself adds "+n+"."],[n*(n+1)/2,"Trace the base case: f(1) = "+k+"."]],
   steps:[`Unwind the calls until the base case:`,...calls.map(s=>C(s)),`Then add back up: f(${n}) = ${k} + ${Array.from({length:n-1},(_,i)=>i+2).join(" + ")} = <b>${ans}</b>.`],java:`class H{static int f(int n){if(n<=1)return ${k};return f(n-1)+n;}}System.out.println(H.f(${n}));`}; }
 if(v===1){ const n=R(1000,99999); let s=0; for(const c of String(n)) s+=+c; code=`public static int mystery(int n)\n{\n    if (n < 10)\n        return n;\n    return n % 10 + mystery(n / 10);\n}`;
  return {q:`What value is returned by ${C(`mystery(${n})`)}?`,code,ans:s,dis:[[s-+String(n)[0],"The base case returns the last remaining digit, which is added too."],[String(n).length,"Each call adds the digit n % 10, not 1."],[+String(n).split("").reverse().join(""),"The digits are added, not reversed."]],
   steps:[`Each call adds the last digit (n % 10) and recurses on n / 10 (the number without its last digit).`,...String(n).split("").map((_,i)=>{ const m=Math.trunc(n/10**i); return m<10?`mystery(${m}) = ${m} (base case)`:`mystery(${m}) = ${m%10} + mystery(${Math.trunc(m/10)})`; }).map(C),`Sum of the digits: <b>${s}</b>.`],java:`class H{static int mystery(int n){if(n<10)return n;return n%10+mystery(n/10);}}System.out.println(H.mystery(${n}));`}; }
 const b=R(2,3), e=R(3,5); code=`public static int power(int b, int e)\n{\n    if (e == 0)\n        return 1;\n    return b * power(b, e - 1);\n}`; const ans=b**e;
 return {q:`What value is returned by ${C(`power(${b}, ${e})`)}?`,code,ans,dis:[[b**(e-1),"power(b, 0) returns 1, and there are "+e+" multiplications by "+b+"."],[b*e,"Each call multiplies by b; it does not add."],[b**(e+1),"The recursion stops at e == 0, which contributes 1, not another b."]],
  steps:[...Array.from({length:e+1},(_,i)=>e-i===0?`power(${b}, 0) = 1`:`power(${b}, ${e-i}) = ${b} * power(${b}, ${e-i-1})`).map(C),`So ${Array(e).fill(b).join(" × ")} × 1 = <b>${ans}</b>.`],java:`class H{static int power(int b,int e){if(e==0)return 1;return b*power(b,e-1);}}System.out.println(H.power(${b},${e}));`}; });
T(4,3,"Recursion: printing order",()=>{ const n=R(4,7), s=R(1,2); const out=[]; const g=x=>{ if(x>0){ out.push(x); g(x-s-1); out.push(x); } }; g(n);
 const code=`public static void show(int n)\n{\n    if (n > 0)\n    {\n        System.out.print(n + " ");\n        show(n - ${s+1});\n        System.out.print(n + " ");\n    }\n}`; const half=out.slice(0,out.length/2);
 return {q:`What is printed by ${C(`show(${n})`)}?`,code,ans:pr(out),
  dis:[[pr(half),"Each call also prints n AFTER the recursive call returns."],[pr([...half].reverse().concat(half)),"The first print happens before the recursive call, so the larger numbers come first."],[pr(half.concat(half)),"The second prints happen as the calls return, in reverse order."]],
  steps:[`Each call prints n, calls show(n − ${s+1}), then prints n again when that call returns.`,`Going down: ${half.join(", ")} (printed before each recursive call).`,`Coming back up in reverse: ${[...half].reverse().join(", ")}.`,`Printed: <b>${pr(out)}</b>.`],
  java:`class H{static void show(int n){if(n>0){System.out.print(n+" ");show(n-${s+1});System.out.print(n+" ");}}}H.show(${n});System.out.println();`}; });
const BS=`public static int search(int[] a, int target)\n{\n    int lo = 0;\n    int hi = a.length - 1;\n    while (lo <= hi)\n    {\n        int mid = (lo + hi) / 2;\n        System.out.print(a[mid] + " ");\n        if (a[mid] == target)\n            return mid;\n        else if (a[mid] < target)\n            lo = mid + 1;\n        else\n            hi = mid - 1;\n    }\n    return -1;\n}`;
T(4,3,"Binary search",()=>{ const n=R(8,12); const a=[...new Set(randArr(n+4,1,60))].sort((x,y)=>x-y).slice(0,n); const t=Math.random()<0.6?a[R(0,a.length-1)]:R(1,60);
 let lo=0,hi=a.length-1; const seen=[], rows=[]; while(lo<=hi){ const mid=D(lo+hi,2); seen.push(a[mid]); rows.push([lo,hi,mid,a[mid]]); if(a[mid]===t) break; else if(a[mid]<t) lo=mid+1; else hi=mid-1; }
 return {q:`The method ${C("search")} is called with ${C("a")} = ${arr(a)} and target ${t}. What is printed?`,code:BS,ans:pr(seen),
  dis:[[pr(a.slice(0,a.indexOf(t)>=0?a.indexOf(t)+1:3)),"Binary search does not check elements in order; it checks the middle each time."],[pr(seen.length>1?seen.slice(0,-1):[...seen,a[0]]),"Count every pass: the loop runs until it finds "+t+" or lo > hi."],[pr(seen.map((_,i)=>a[Math.min(a.length-1,D(rows[i][0]+rows[i][1]+1,2))])),"mid = (lo + hi) / 2 uses integer division, which rounds down."]],
  steps:[`Trace lo, hi and mid = (lo + hi) / 2 (integer division):`,tbl(["lo","hi","mid","a[mid]"],rows),`${seen[seen.length-1]===t?`Found ${t}.`:`lo > hi, so ${t} is not in the array.`} Printed: <b>${pr(seen)}</b>.`],
  java:`class H{static int search(int[] a,int target){int lo=0;int hi=a.length-1;while(lo<=hi){int mid=(lo+hi)/2;System.out.print(a[mid]+" ");if(a[mid]==target)return mid;else if(a[mid]<target)lo=mid+1;else hi=mid-1;}return -1;}}H.search(new int[]${arr(a)},${t});System.out.println();`}; });
const SEL=`for (int i = 0; i < a.length - 1; i++)\n{\n    int minIndex = i;\n    for (int j = i + 1; j < a.length; j++)\n    {\n        if (a[j] < a[minIndex])\n            minIndex = j;\n    }\n    int temp = a[i];\n    a[i] = a[minIndex];\n    a[minIndex] = temp;\n}`;
const INS=`for (int i = 1; i < a.length; i++)\n{\n    int temp = a[i];\n    int j = i;\n    while (j > 0 && a[j - 1] > temp)\n    {\n        a[j] = a[j - 1];\n        j--;\n    }\n    a[j] = temp;\n}`;
T(4,3,"Sorting: state after k passes",()=>{ const a=[...new Set(randArr(9,1,40))].slice(0,6); if(a.length<6) return null; const sel=Math.random()<0.5, k=R(2,3);
 const run=(x,kk,s)=>{ x=[...x]; const states=[]; if(s){ for(let i=0;i<kk;i++){ let m=i; for(let j=i+1;j<x.length;j++) if(x[j]<x[m]) m=j; [x[i],x[m]]=[x[m],x[i]]; states.push(pr(x)); } } else { for(let i=1;i<=kk;i++){ const t=x[i]; let j=i; while(j>0&&x[j-1]>t){ x[j]=x[j-1]; j--; } x[j]=t; states.push(pr(x)); } } return {x,states}; };
 const r=run(a,k,sel), o=run(a,k,!sel), r1=run(a,k+1,sel), full=[...a].sort((p,q)=>p-q);
 const code=(sel?SEL:INS).replace(sel?"i < a.length - 1; i++)":"i < a.length; i++)",sel?`i < ${k}; i++)`:`i <= ${k}; i++)`);
 return {q:`${C("a")} is ${arr(a)}. The ${sel?"selection":"insertion"} sort below is stopped early, after the outer loop has run ${k} times. What does ${C("a")} contain?`,code,ans:pr(r.x),
  dis:[[pr(o.x),"That is what "+(sel?"insertion":"selection")+" sort gives. "+(sel?"Selection sort swaps the minimum of the unsorted part into position i.":"Insertion sort inserts a[i] into the sorted part on its left.")],[pr(r1.x),"The outer loop has run "+k+" times, not "+(k+1)+"."],[pr(full),"The sort was stopped before it finished."]],
  steps:[sel?"Selection sort: on pass i, find the smallest value in a[i..end] and swap it into position i.":"Insertion sort: on pass i, take a[i] and slide it left past larger values into its place among a[0..i].",tbl(["pass","array after"],r.states.map((s,i)=>[i+1,s])),`After ${k} passes: <b>${pr(r.x)}</b>.`],
  java:`int[] a=${arr(a)};${code.replace(/\n/g,"")}for(int v:a)System.out.print(v+" ");System.out.println();`}; });
T(4,3,"2D traversal order",()=>{ const g=[randArr(3,1,9),randArr(3,1,9)]; const colMajor=Math.random()<0.5; const out=[]; if(colMajor){ for(let c=0;c<3;c++) for(let r=0;r<2;r++) out.push(g[r][c]); } else { for(let r=1;r>=0;r--) for(let c=2;c>=0;c--) out.push(g[r][c]); }
 const loop=colMajor?`for (int c = 0; c < g[0].length; c++)\n    for (int r = 0; r < g.length; r++)\n        System.out.print(g[r][c] + " ");`:`for (int r = g.length - 1; r >= 0; r--)\n    for (int c = g[r].length - 1; c >= 0; c--)\n        System.out.print(g[r][c] + " ");`;
 const code=`int[][] g = {${arr(g[0])},\n             ${arr(g[1])}};\n${loop}`;
 return {q:`What is printed?`,code,ans:pr(out),
  dis:[[pr(g.flat()),colMajor?"The OUTER loop is over columns, so the values go down each column first.":"Both loops count down, starting from the last row and last column."],[pr(colMajor?[...g[1],...g[0]]:[...g[1].slice().reverse(),...g[0].slice().reverse()].reverse()),colMajor?"Inside each column, r goes from 0 to 1 (top to bottom).":"Trace the rows from the bottom up, each from right to left."],[pr(out.slice().reverse()),"Check the direction of both loops."]],
  steps:[colMajor?`The outer loop picks a column, the inner loop goes down the rows: column-major order.`:`Start at the last row; in each row go from the last column to the first.`,`Order visited: ${out.join(", ")}.`,`Printed: <b>${pr(out)}</b>.`],
  java:code.replace(/\n/g,"")+"System.out.println();"}; });
T(4,3,"Pairs with nested loops",()=>{ const a=randArr(6,1,8), t=R(6,12); let c=0; const pairs=[]; for(let i=0;i<a.length;i++) for(let j=i+1;j<a.length;j++) if(a[i]+a[j]===t){ c++; pairs.push(`(${a[i]}, ${a[j]})`); }
 let c2=0; for(let i=0;i<a.length;i++) for(let j=0;j<a.length;j++) if(i!==j&&a[i]+a[j]===t) c2++;
 const code=`int[] a = ${arr(a)};\nint count = 0;\nfor (int i = 0; i < a.length; i++)\n{\n    for (int j = i + 1; j < a.length; j++)\n    {\n        if (a[i] + a[j] == ${t})\n            count++;\n    }\n}\nSystem.out.println(count);`;
 return {q:`What is printed?`,code,ans:c,dis:[[c2===c?c+1:c2,"j starts at i + 1, so each pair is counted once (not twice), and an element is never paired with itself."],[c+1,"Check every pair of positions i < j."],[a.filter(x=>a.includes(t-x)).length,"count counts pairs of positions, not individual values."]],
  steps:[`j starts at i + 1, so every pair of positions (i, j) with i < j is checked exactly once.`,`Pairs adding to ${t}: ${pairs.join(", ")||"none"}.`,`Printed: <b>${c}</b>.`],
  java:code.replace(/\n/g,"")}; });
T(4,3,"Find the maximum: a common bug",()=>{ const a=randArr(5,-30,-2); const code=`int[] a = ${arr(a)};\nint max = 0;\nfor (int x : a)\n{\n    if (x > max)\n        max = x;\n}\nSystem.out.println(max);`;
 return {q:`The code below is meant to find the largest value in ${C("a")}. What is printed?`,code,ans:0,
  dis:[[Math.max(...a),"max starts at 0, and every value is negative, so no value is greater than 0: max stays 0. Start max at a[0] instead."],[Math.min(...a),"The loop looks for larger values, not smaller."],[a[a.length-1],"max only changes when x > max."]],
  steps:[`max starts at 0.`,`Every value in a is negative, so ${C("x > max")} is never true.`,`max stays 0, which is not even in the array. Printed: <b>0</b>. The fix is ${C("int max = a[0];")}.`],
  java:code.replace(/\n/g,"")}; });

T(3,1,"Default values",()=>{ const cls=`public class Gadget\n{\n    private int count;\n    private String label;\n    private boolean on;\n\n    public Gadget(int c) { count = c; }\n\n    public String toString() { return count + " " + label + " " + on; }\n}`; const c=R(1,9);
 return {q:`What is printed?`,code:`${cls}\n\n// in main\nGadget g = new Gadget(${c});\nSystem.out.println(g);`,ans:`${c} null false`,
  dis:[[`${c}  false`,"An instance String that is never assigned is null (not the empty String)."],[`${c} null true`,"A boolean instance variable starts as false."],["Compile-time error","Instance variables get default values automatically, so this compiles."]],
  steps:[`Instance variables that a constructor does not set keep their <b>default values</b>: 0 for int, false for boolean, null for any object (including String).`,`count = ${c} (set by the constructor), label = null, on = false.`,`Printed: <b>${c} null false</b>.`],
  java:`${local(cls)}\nGadget g=new Gadget(${c});System.out.println(g);`}; });
T(3,2,"Overloaded methods",()=>{ const a=R(2,9), useD=Math.random()<0.5; const arg=useD?`${a}.0`:`${a}`;
 const code=`public static String kind(int x) { return "int " + (x * 2); }\npublic static String kind(double x) { return "double " + (x / 2); }`;
 const ans=useD?`double ${jd(a/2)}`:`int ${a*2}`;
 return {q:`Both methods are in the same class. What is printed by ${C(`System.out.println(kind(${arg}));`)}?`,code,ans,
  dis:[[useD?`int ${a*2}`:`double ${jd(a/2)}`,"Java picks the overload whose parameter type matches the argument: "+arg+" is "+(useD?"a double":"an int")+"."],["Compile-time error","Methods may share a name if their parameter lists differ (overloading)."],[useD?`double ${a/2}`:`int ${a}`,useD?"x / 2 with a double x is a double, printed with a decimal point.":"The int version doubles x."]],
  steps:[`Two methods with the same name but different parameter types are <b>overloaded</b>. Java chooses by the argument's type.`,`${arg} is ${useD?"a double literal (it has a decimal point)":"an int literal"}, so ${C(useD?"kind(double x)":"kind(int x)")} runs.`,`It returns ${C(useD?`"double " + (${arg} / 2)`:`"int " + (${arg} * 2)`)} = "${ans}". Printed: <b>${ans}</b>.`],
  java:`class H{static String kind(int x){return "int "+(x*2);}static String kind(double x){return "double "+(x/2);}}System.out.println(H.kind(${arg}));`}; });
T(3,3,"Objects of the same class",()=>{ const a=R(50,99), b=R(50,99); if(a===b) return null; const cls=`public class Player\n{\n    private int score;\n\n    public Player(int s) { score = s; }\n\n    public boolean beats(Player other)\n    {\n        return score > other.score;\n    }\n\n    public void steal(Player other, int pts)\n    {\n        other.score -= pts;\n        score += pts;\n    }\n}`; const p=R(5,30);
 const ans=String(a+p>b-p)+" "+String(b-p>a+p);
 return {q:`What is printed?`,code:`${cls}\n\n// in main\nPlayer x = new Player(${a});\nPlayer y = new Player(${b});\nx.steal(y, ${p});\nSystem.out.println(x.beats(y) + " " + y.beats(x));`,ans,
  dis:[["Compile-time error","Inside the Player class, code may use the private variables of ANY Player object, including other.score."],[String(a>b)+" "+String(b>a),"steal changes both scores before beats is called."],[ans.split(" ").reverse().join(" "),"x.beats(y) is printed first."],["true true","Both cannot be true: one score is strictly greater than the other."],["false false","After steal, the scores are different, so one player beats the other."]],
  steps:[`Private means private to the <b>class</b>, not to one object, so ${C("other.score")} is legal inside Player.`,`x.steal(y, ${p}): y's score ${b} → ${b-p}; x's score ${a} → ${a+p}.`,`x.beats(y): ${a+p} > ${b-p} is ${a+p>b-p}. y.beats(x): ${b-p} > ${a+p} is ${b-p>a+p}.`,`Printed: <b>${ans}</b>.`],
  java:`${local(cls)}\nPlayer x=new Player(${a});Player y=new Player(${b});x.steal(y,${p});System.out.println(x.beats(y)+" "+y.beats(x));`}; });
/* the 25 quick-practice generators from practice.js become Easy questions */
if(window.PRACTICE) for(const u of PRACTICE.units) PRACTICE.G[u].forEach((g,i)=>T(+u.slice(5),1,"Quick check",()=>{ const q=g(); return {q:q.q,code:q.code,ans:q.ch[q.ai],dis:q.ch.filter((_,j)=>j!==q.ai).map(c=>[c,""]),steps:[q.ex],java:q.java}; }));
})();
