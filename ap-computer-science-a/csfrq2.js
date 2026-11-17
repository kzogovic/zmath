/* Z-AP Computer Science A free-response problems, set 2 (5 more per AP type). Same format as csfrq.js. */
(function(){
"use strict";
const F=CSFRQ.F, pt=(t,earn,not)=>({t,earn,not});
const CLASSPTS=(extra)=>[pt("Class header and instance variables","public class with private instance variables of the right types.","Public instance variables; static variables for data each object should have."),pt("Constructor","Constructor with the right parameters that initializes every instance variable.","Re-declares the variables inside the constructor (shadowing), so the instance variables stay unset."),...extra];

/* ===================== Q1: Methods and Control Structures ===================== */
F.push({type:1,id:"pal",title:"Palindromes",
 intro:`<p>A palindrome reads the same forward and backward, like "level" or "noon".</p><pre class="code">public class Palindromes
{
    /** Returns true if s is a palindrome; false otherwise.
     *  Precondition: s contains only lowercase letters. */
    public static boolean isPalindrome(String s)
    { /* to be implemented in part (a) */ }

    /** Returns the first word in sentence that is a palindrome and has
     *  at least 2 letters, or "" if there is none.
     *  Precondition: words are separated by single spaces. */
    public static String firstPalindrome(String sentence)
    { /* to be implemented in part (b) */ }
}</pre>`,
 parts:[{id:"a",points:4,prompt:`Write <code>isPalindrome</code>. Examples: "racecar" → true, "abca" → false, "a" → true.`,sig:"public static boolean isPalindrome(String s)",
   pts:[pt("Pairs the ends","Compares the character at index i with the one at index s.length() − 1 − i.","Compares neighbors, or uses s.length() − i (out of bounds)."),pt("Extracts characters correctly","Uses substring(i, i + 1) (or equivalent) for both characters.",""),pt("Compares with equals","Uses .equals to compare the one-character Strings.","=="),pt("Returns correctly","Returns false at the first mismatch and true after all pairs pass.","Returns true after checking only the first pair.")],
   model:`public static boolean isPalindrome(String s)
{
    int n = s.length();
    for (int i = 0; i < n / 2; i++)                    // only the first half needs a partner
    {
        String front = s.substring(i, i + 1);          // i-th from the start
        String back = s.substring(n - 1 - i, n - i);   // i-th from the end
        if (!front.equals(back))                       // one mismatch is enough
        {
            return false;
        }
    }
    return true;                                       // every pair matched
}`},
  {id:"b",points:3,prompt:`Write <code>firstPalindrome</code>. You must use <code>isPalindrome</code>. Example: "we saw a kayak at noon" → "kayak" ("a" is too short).`,sig:"public static String firstPalindrome(String sentence)",
   pts:[pt("Splits into words","Gets the words, e.g. sentence.split(\" \").",""),pt("Uses isPalindrome and the length rule","Calls isPalindrome on each word and requires length() >= 2.","Accepts one-letter words."),pt("Returns the first or \"\"","Returns the first matching word, or \"\" after checking all words.","Returns the last matching word.")],
   model:`public static String firstPalindrome(String sentence)
{
    String[] words = sentence.split(" ");              // split is on the Java Quick Reference
    for (String w : words)                             // left to right, so the first match wins
    {
        if (w.length() >= 2 && isPalindrome(w))        // reuse part (a)
        {
            return w;
        }
    }
    return "";                                         // no palindrome found
}`}],
 mistakes:["Using s.length() − i as an index (one past the end).","Returning true inside the loop.","Forgetting the 2-letter rule."],
 ctx:`static class Palindromes { /*M*/ }`,
 test:`ck(Palindromes.isPalindrome("racecar"),true); ck(Palindromes.isPalindrome("abca"),false); ck(Palindromes.isPalindrome("a"),true); ck(Palindromes.isPalindrome("abba"),true);
ck(Palindromes.firstPalindrome("we saw a kayak at noon"),"kayak"); ck(Palindromes.firstPalindrome("a b c"),"");`});

F.push({type:1,id:"save",title:"SavingsPlan",
 intro:`<p>A savings account earns interest once a month: each month the balance is multiplied by (1 + rate).</p><pre class="code">public class SavingsPlan
{
    /** Returns the number of whole months until the balance is at least goal.
     *  Precondition: start &gt; 0, rate &gt; 0 */
    public static int monthsToGoal(double start, double rate, double goal)
    { /* to be implemented in part (a) */ }

    /** Returns the balance after the given number of months, rounded down
     *  to a whole number of dollars. */
    public static int balanceAfter(double start, double rate, int months)
    { /* to be implemented in part (b) */ }
}</pre>`,
 parts:[{id:"a",points:4,prompt:`Write <code>monthsToGoal</code>. Example: start 100, rate 0.10, goal 130 → 100, 110, 121, 133.1 → 3 months. If start is already at least goal, return 0.`,sig:"public static int monthsToGoal(double start, double rate, double goal)",
   pts:[pt("Loops until the goal","A while loop that continues while balance < goal.","A loop with a fixed number of passes."),pt("Applies interest","Multiplies the balance by (1 + rate) each pass.","Adds rate, or adds rate × start every month (simple interest)."),pt("Counts months","Counts the passes.",""),pt("Returns, including 0","Returns the count, which is 0 when start >= goal.","")],
   model:`public static int monthsToGoal(double start, double rate, double goal)
{
    double balance = start;
    int months = 0;
    while (balance < goal)             // stops immediately if start >= goal, returning 0
    {
        balance *= (1 + rate);         // one month of compound interest
        months++;
    }
    return months;
}`},
  {id:"b",points:3,prompt:`Write <code>balanceAfter</code>. Example: (100, 0.10, 3) → 133 (133.1 rounded down).`,sig:"public static int balanceAfter(double start, double rate, int months)",
   pts:[pt("Repeats months times","A loop that runs exactly months times (or Math.pow).",""),pt("Compounds","Multiplies by (1 + rate) each month.",""),pt("Rounds down and returns an int","Casts to int at the END, then returns it.","Casts inside the loop, losing cents each month.")],
   model:`public static int balanceAfter(double start, double rate, int months)
{
    double balance = start;
    for (int m = 0; m < months; m++)   // exactly "months" passes
    {
        balance *= (1 + rate);
    }
    return (int) balance;              // cast once, at the end: drops the cents
}`}],
 mistakes:["Simple interest instead of compound interest.","Casting to int inside the loop.","Starting months at 1."],
 ctx:`static class SavingsPlan { /*M*/ }`,
 test:`ck(SavingsPlan.monthsToGoal(100,0.10,130),3); ck(SavingsPlan.monthsToGoal(200,0.05,100),0); ck(SavingsPlan.balanceAfter(100,0.10,3),133); ck(SavingsPlan.balanceAfter(50,0.5,0),50);`});

F.push({type:1,id:"elev",title:"Elevator",
 intro:`<pre class="code">public class Elevator
{
    /** Returns the floor requested by the i-th passenger (i starts at 0). */
    public int requestedFloor(int i)
    { /* implementation not shown */ }

    /** The elevator starts at floor start and visits the floors requested by
     *  passengers 0 to n - 1, in order. Returns the total number of floors traveled. */
    public int totalTravel(int start, int n)
    { /* to be implemented in part (a) */ }

    /** Returns the number of requests, among passengers 0 to n - 1, that make
     *  the elevator go UP from the floor it is on. */
    public int upTrips(int start, int n)
    { /* to be implemented in part (b) */ }
}</pre><p>Example: start 3, requests 7, 2, 2, 5 → travel 4 + 5 + 0 + 3 = 12; up trips: 3→7 and 2→5, so 2.</p>`,
 parts:[{id:"a",points:4,prompt:"Write totalTravel.",sig:"public int totalTravel(int start, int n)",
   pts:[pt("Visits every request","Calls requestedFloor(i) for i = 0 to n − 1.",""),pt("Tracks the current floor","Keeps a variable for the current floor, starting at start, updated after each trip.","Always measures from start."),pt("Adds the distance","Adds Math.abs(next − current).","Adds next − current (negative going down)."),pt("Returns the total","","")],
   model:`public int totalTravel(int start, int n)
{
    int current = start;                       // where the elevator is now
    int total = 0;
    for (int i = 0; i < n; i++)
    {
        int next = requestedFloor(i);
        total += Math.abs(next - current);     // distance, up or down
        current = next;                        // the elevator is now there
    }
    return total;
}`},
  {id:"b",points:3,prompt:"Write upTrips.",sig:"public int upTrips(int start, int n)",
   pts:[pt("Tracks the current floor","Updates the current floor after every request.",""),pt("Counts only going up","Counts when next > current (equal does not count).","Uses >="),pt("Returns the count","","")],
   model:`public int upTrips(int start, int n)
{
    int current = start;
    int count = 0;
    for (int i = 0; i < n; i++)
    {
        int next = requestedFloor(i);
        if (next > current)        // strictly higher: going up (same floor is not a trip)
        {
            count++;
        }
        current = next;
    }
    return count;
}`}],
 mistakes:["Measuring every trip from the start floor.","Forgetting Math.abs for trips down."],
 ctx:`static class Elevator { int[] r; Elevator(int... a){ r=a; } public int requestedFloor(int i){ return r[i]; } /*M*/ }`,
 test:`Elevator e=new Elevator(7,2,2,5); ck(e.totalTravel(3,4),12); ck(e.upTrips(3,4),2); ck(new Elevator(1).totalTravel(1,1),0);`});

F.push({type:1,id:"coll",title:"Collatz",
 intro:`<p>In the Collatz process, an even number n is replaced by n / 2 and an odd number by 3n + 1, until n reaches 1.</p><pre class="code">public class Collatz
{
    /** Returns the number of steps needed to reach 1 from n. Precondition: n &gt;= 1 */
    public static int steps(int n)
    { /* to be implemented in part (a) */ }

    /** Returns the value from lo to hi (inclusive) that needs the most steps.
     *  On a tie, returns the smallest such value. Precondition: 1 &lt;= lo &lt;= hi */
    public static int mostSteps(int lo, int hi)
    { /* to be implemented in part (b) */ }
}</pre><p>Example: steps(6) = 8 (6, 3, 10, 5, 16, 8, 4, 2, 1); steps(1) = 0.</p>`,
 parts:[{id:"a",points:3,prompt:"Write steps.",sig:"public static int steps(int n)",
   pts:[pt("Loops until 1","while (n != 1) or n > 1.",""),pt("Applies the rule","n / 2 when n % 2 == 0, otherwise 3 * n + 1.",""),pt("Counts and returns","Counts each change and returns the count (0 for n = 1).","")],
   model:`public static int steps(int n)
{
    int count = 0;
    while (n != 1)
    {
        if (n % 2 == 0)        // even
        {
            n = n / 2;
        }
        else                   // odd
        {
            n = 3 * n + 1;
        }
        count++;               // one step per change
    }
    return count;
}`},
  {id:"b",points:4,prompt:"Write mostSteps. You must use steps.",sig:"public static int mostSteps(int lo, int hi)",
   pts:[pt("Checks every value","Loops from lo to hi inclusive.","Stops at hi − 1."),pt("Uses steps","Calls steps(k) for each value.",""),pt("Keeps the best","Tracks the largest step count AND its value, updating on strictly greater.","Uses >= (returns the largest value on a tie)."),pt("Returns the value","Returns the value, not the number of steps.","")],
   model:`public static int mostSteps(int lo, int hi)
{
    int best = lo;
    int bestSteps = steps(lo);
    for (int k = lo + 1; k <= hi; k++)     // hi is included
    {
        int s = steps(k);                  // reuse part (a)
        if (s > bestSteps)                 // strictly more: ties keep the smaller value
        {
            bestSteps = s;
            best = k;
        }
    }
    return best;
}`}],
 mistakes:["Returning the number of steps instead of the value.","Excluding hi."],
 ctx:`static class Collatz { /*M*/ }`,
 test:`ck(Collatz.steps(6),8); ck(Collatz.steps(1),0); ck(Collatz.steps(7),16); ck(Collatz.mostSteps(1,10),9); ck(Collatz.mostSteps(5,6),6);`});

F.push({type:1,id:"time",title:"TimeCard",
 intro:`<p>Times are written as Strings in 24-hour "HH:MM" format, for example "08:45" or "17:05".</p><pre class="code">public class TimeCard
{
    /** Returns the number of minutes from start to end on the same day.
     *  Precondition: both have the form "HH:MM" and end is not earlier than start. */
    public static int minutesBetween(String start, String end)
    { /* to be implemented in part (a) */ }

    /** Returns m minutes written as "H hr M min", for example 135 → "2 hr 15 min".
     *  Precondition: m &gt;= 0 */
    public static String format(int m)
    { /* to be implemented in part (b) */ }
}</pre>`,
 parts:[{id:"a",points:4,prompt:`Write <code>minutesBetween</code>. Example: ("08:45", "10:30") → 105.`,sig:"public static int minutesBetween(String start, String end)",
   pts:[pt("Extracts hours and minutes","Uses substring(0, 2) and substring(3) (or 3, 5).",""),pt("Converts to numbers","Integer.parseInt on each part.","Subtracts Strings."),pt("Converts to minutes since midnight","hours × 60 + minutes for both times.",""),pt("Returns the difference","end − start, in minutes.","")],
   model:`public static int minutesBetween(String start, String end)
{
    int s = Integer.parseInt(start.substring(0, 2)) * 60     // hours → minutes
          + Integer.parseInt(start.substring(3));             // plus the minutes part
    int e = Integer.parseInt(end.substring(0, 2)) * 60
          + Integer.parseInt(end.substring(3));
    return e - s;                                             // both measured from midnight
}`},
  {id:"b",points:3,prompt:`Write <code>format</code>. Examples: 135 → "2 hr 15 min"; 45 → "0 hr 45 min".`,sig:"public static String format(int m)",
   pts:[pt("Hours","m / 60 (integer division).",""),pt("Minutes","m % 60.",""),pt("Builds the String","Returns hours + \" hr \" + minutes + \" min\" exactly.","Wrong spacing.")],
   model:`public static String format(int m)
{
    int hours = m / 60;            // integer division: whole hours
    int mins = m % 60;             // what is left over
    return hours + " hr " + mins + " min";
}`}],
 mistakes:["Subtracting hours and minutes separately (fails across an hour boundary).","Using double division."],
 ctx:`static class TimeCard { /*M*/ }`,
 test:`ck(TimeCard.minutesBetween("08:45","10:30"),105); ck(TimeCard.minutesBetween("13:00","13:00"),0); ck(TimeCard.format(135),"2 hr 15 min"); ck(TimeCard.format(45),"0 hr 45 min");`});

/* ===================== Q2: Class Design ===================== */
F.push({type:2,id:"thermo",title:"Thermostat",
 intro:`<p>Write the complete <code>Thermostat</code> class. The target temperature can be raised or lowered by 1 degree, but always stays between 50 and 85. <code>mode</code> tells what the system should do for a given room temperature: "heat" if the room is more than 1 degree below the target, "cool" if it is more than 1 degree above, otherwise "off".</p>
<table class="ex"><tr><th>Statement</th><th>Result</th></tr>
<tr><td><code>Thermostat t = new Thermostat(84);</code></td><td>target 84</td></tr>
<tr><td><code>t.raise(); t.raise();</code></td><td>target 85 (cannot go above 85)</td></tr>
<tr><td><code>t.getTarget()</code></td><td>85</td></tr>
<tr><td><code>t.mode(80)</code></td><td>"heat"</td></tr>
<tr><td><code>t.mode(86)</code></td><td>"off"</td></tr>
<tr><td><code>t.lower(); t.mode(87)</code></td><td>"cool" (target 84)</td></tr></table>`,
 parts:[{id:"class",points:7,prompt:"Write the complete Thermostat class.",sig:"public class Thermostat",
   pts:CLASSPTS([pt("raise","Adds 1 only when target < 85.",""),pt("lower","Subtracts 1 only when target > 50.",""),pt("mode: heat","Returns \"heat\" when room < target − 1.","Uses <= target − 1."),pt("mode: cool and off","Returns \"cool\" when room > target + 1 and \"off\" otherwise.",""),pt("getTarget","Returns the target.","")]),
   model:`public class Thermostat
{
    private int target;

    public Thermostat(int t)
    {
        target = t;
    }

    public void raise()
    {
        if (target < 85)           // never above 85
        {
            target++;
        }
    }

    public void lower()
    {
        if (target > 50)           // never below 50
        {
            target--;
        }
    }

    public String mode(int room)
    {
        if (room < target - 1)     // more than 1 degree too cold
        {
            return "heat";
        }
        if (room > target + 1)     // more than 1 degree too warm
        {
            return "cool";
        }
        return "off";              // within 1 degree
    }

    public int getTarget()
    {
        return target;
    }
}`}],
 mistakes:["Checking the limit after changing the value (85 becomes 86).","Using <= / >= in mode, so a 1-degree difference is not \"off\"."],
 ctx:`/*M*/`,test:`Thermostat t=new Thermostat(84); t.raise(); t.raise(); ck(t.getTarget(),85); ck(t.mode(80),"heat"); ck(t.mode(86),"off"); t.lower(); ck(t.mode(87),"cool"); ck(t.mode(83),"off"); Thermostat u=new Thermostat(50); u.lower(); ck(u.getTarget(),50);`});

F.push({type:2,id:"streak",title:"StreakCounter",
 intro:`<p>Write the complete <code>StreakCounter</code> class, which tracks a run of successes (for example, days in a row a student practiced).</p>
<table class="ex"><tr><th>Statement</th><th>Result</th></tr>
<tr><td><code>StreakCounter s = new StreakCounter();</code></td><td>current 0, best 0</td></tr>
<tr><td><code>s.record(true); s.record(true); s.record(true);</code></td><td>current 3, best 3</td></tr>
<tr><td><code>s.record(false);</code></td><td>current 0, best 3</td></tr>
<tr><td><code>s.record(true);</code></td><td>current 1</td></tr>
<tr><td><code>s.getCurrent()</code></td><td>1</td></tr>
<tr><td><code>s.getBest()</code></td><td>3</td></tr>
<tr><td><code>s.getTotal()</code></td><td>4 (all successes ever)</td></tr></table>`,
 parts:[{id:"class",points:7,prompt:"Write the complete StreakCounter class (no-parameter constructor; methods record, getCurrent, getBest, getTotal).",sig:"public class StreakCounter",
   pts:CLASSPTS([pt("record(true): streak","Adds 1 to the current streak and to the total.",""),pt("record(true): best","Updates the best streak whenever the current streak is larger.","Updates best only when a streak ends."),pt("record(false)","Resets the current streak to 0 without changing best or total.",""),pt("Uses the boolean parameter","Tests the parameter directly (if (success)).",""),pt("Accessors","getCurrent, getBest and getTotal return the right values.","")]),
   model:`public class StreakCounter
{
    private int current;
    private int best;
    private int total;

    public StreakCounter()
    {
        current = 0;
        best = 0;
        total = 0;
    }

    public void record(boolean success)
    {
        if (success)
        {
            current++;
            total++;
            if (current > best)        // update right away
            {
                best = current;
            }
        }
        else
        {
            current = 0;               // the streak is broken; best stays
        }
    }

    public int getCurrent() { return current; }
    public int getBest() { return best; }
    public int getTotal() { return total; }
}`}],
 mistakes:["Updating best only when a streak ends, so a streak still going is not counted.","Resetting total on a failure."],
 ctx:`/*M*/`,test:`StreakCounter s=new StreakCounter(); s.record(true); s.record(true); s.record(true); s.record(false); s.record(true); ck(s.getCurrent(),1); ck(s.getBest(),3); ck(s.getTotal(),4); StreakCounter z=new StreakCounter(); z.record(true); ck(z.getBest(),1);`});

F.push({type:2,id:"coupon",title:"Coupon",
 intro:`<p>Write the complete <code>Coupon</code> class. A coupon has a code, a percent discount and a number of uses left. <code>apply</code> returns the price after the discount and uses up one use; once no uses are left, it returns the price unchanged.</p>
<table class="ex"><tr><th>Statement</th><th>Result</th></tr>
<tr><td><code>Coupon c = new Coupon("SAVE20", 20, 2);</code></td><td></td></tr>
<tr><td><code>c.apply(50.0)</code></td><td>40.0 (1 use left)</td></tr>
<tr><td><code>c.apply(10.0)</code></td><td>8.0 (0 uses left)</td></tr>
<tr><td><code>c.isActive()</code></td><td>false</td></tr>
<tr><td><code>c.apply(30.0)</code></td><td>30.0</td></tr>
<tr><td><code>c.getCode()</code></td><td>"SAVE20"</td></tr></table>`,
 parts:[{id:"class",points:7,prompt:"Write the complete Coupon class.",sig:"public class Coupon",
   pts:CLASSPTS([pt("apply: checks uses","Applies the discount only when uses left > 0.",""),pt("apply: discount","Computes price × (100 − percent) / 100.0 without integer division.","percent / 100 with ints (gives 0)."),pt("apply: uses one","Subtracts 1 use only when the discount is applied.",""),pt("apply: returns","Returns the new price, or the original price when no uses are left.",""),pt("isActive and getCode","isActive returns uses > 0; getCode returns the code.","")]),
   model:`public class Coupon
{
    private String code;
    private int percent;
    private int uses;

    public Coupon(String c, int p, int u)
    {
        code = c;
        percent = p;
        uses = u;
    }

    public double apply(double price)
    {
        if (uses > 0)
        {
            uses--;                                    // one use is spent
            return price * (100 - percent) / 100.0;    // 100.0 avoids integer division
        }
        return price;                                  // no uses left: full price
    }

    public boolean isActive()
    {
        return uses > 0;
    }

    public String getCode()
    {
        return code;
    }
}`}],
 mistakes:["percent / 100 with ints is 0.","Using up a use even when the coupon is no longer active."],
 ctx:`/*M*/`,test:`Coupon c=new Coupon("SAVE20",20,2); ck(c.apply(50.0),40.0); ck(c.apply(10.0),8.0); ck(c.isActive(),false); ck(c.apply(30.0),30.0); ck(c.getCode(),"SAVE20");`});

F.push({type:2,id:"line",title:"LineCounter",
 intro:`<p>Write the complete <code>LineCounter</code> class for a line at a ticket window. People can join only while the line is below its capacity. <code>serve</code> removes one person from the front, if anyone is waiting, and counts them as served.</p>
<table class="ex"><tr><th>Statement</th><th>Result</th></tr>
<tr><td><code>LineCounter q = new LineCounter(2);</code></td><td>capacity 2</td></tr>
<tr><td><code>q.join()</code></td><td>true</td></tr>
<tr><td><code>q.join()</code></td><td>true</td></tr>
<tr><td><code>q.join()</code></td><td>false (full)</td></tr>
<tr><td><code>q.serve(); q.serve(); q.serve();</code></td><td>the third serve does nothing</td></tr>
<tr><td><code>q.getWaiting()</code></td><td>0</td></tr>
<tr><td><code>q.getServed()</code></td><td>2</td></tr></table>`,
 parts:[{id:"class",points:7,prompt:"Write the complete LineCounter class.",sig:"public class LineCounter",
   pts:CLASSPTS([pt("join: checks capacity","Allows joining only when waiting < capacity.","Uses <=."),pt("join: updates and returns","Adds 1 to waiting and returns true; otherwise returns false.",""),pt("serve","Only when waiting > 0: subtracts 1 from waiting and adds 1 to served.","Lets waiting go negative or counts a serve with nobody waiting."),pt("getWaiting","",""),pt("getServed","","")]),
   model:`public class LineCounter
{
    private int capacity;
    private int waiting;
    private int served;

    public LineCounter(int cap)
    {
        capacity = cap;
        waiting = 0;
        served = 0;
    }

    public boolean join()
    {
        if (waiting < capacity)        // room for one more
        {
            waiting++;
            return true;
        }
        return false;
    }

    public void serve()
    {
        if (waiting > 0)               // nobody to serve otherwise
        {
            waiting--;
            served++;
        }
    }

    public int getWaiting() { return waiting; }
    public int getServed() { return served; }
}`}],
 mistakes:["Using <= capacity (lets one extra person in).","Counting a serve when nobody is waiting."],
 ctx:`/*M*/`,test:`LineCounter q=new LineCounter(2); ck(q.join(),true); ck(q.join(),true); ck(q.join(),false); q.serve(); q.serve(); q.serve(); ck(q.getWaiting(),0); ck(q.getServed(),2);`});

F.push({type:2,id:"watch",title:"StopWatch",
 intro:`<p>Write the complete <code>StopWatch</code> class. Times are given in seconds. <code>start(t)</code> starts timing at time t (ignored if it is already running). <code>stop(t)</code> adds the time since the start to the total (ignored if it is not running). <code>reset</code> sets the total to 0 and stops the watch.</p>
<table class="ex"><tr><th>Statement</th><th>Result</th></tr>
<tr><td><code>StopWatch w = new StopWatch();</code></td><td>not running, total 0</td></tr>
<tr><td><code>w.start(10); w.stop(25);</code></td><td>total 15</td></tr>
<tr><td><code>w.stop(40);</code></td><td>ignored</td></tr>
<tr><td><code>w.start(50); w.start(55); w.stop(60);</code></td><td>second start ignored: total 25</td></tr>
<tr><td><code>w.getTotal()</code></td><td>25</td></tr>
<tr><td><code>w.isRunning()</code></td><td>false</td></tr></table>`,
 parts:[{id:"class",points:7,prompt:"Write the complete StopWatch class (methods start, stop, reset, getTotal, isRunning).",sig:"public class StopWatch",
   pts:CLASSPTS([pt("start","Records the start time and sets running to true, only when not running.","Restarts the clock when already running."),pt("stop: adds time","Adds t − startTime to the total.",""),pt("stop: only when running","Does nothing when not running, and sets running to false after stopping.",""),pt("reset","Sets total to 0 and running to false.",""),pt("Accessors","getTotal and isRunning return the right values.","")]),
   model:`public class StopWatch
{
    private int total;
    private int startTime;
    private boolean running;

    public StopWatch()
    {
        total = 0;
        startTime = 0;
        running = false;
    }

    public void start(int t)
    {
        if (!running)                  // a second start is ignored
        {
            startTime = t;
            running = true;
        }
    }

    public void stop(int t)
    {
        if (running)                   // stopping a stopped watch does nothing
        {
            total += t - startTime;
            running = false;
        }
    }

    public void reset()
    {
        total = 0;
        running = false;
    }

    public int getTotal() { return total; }
    public boolean isRunning() { return running; }
}`}],
 mistakes:["Restarting the clock on a second start.","Adding time when stop is called on a watch that is not running."],
 ctx:`/*M*/`,test:`StopWatch w=new StopWatch(); w.start(10); w.stop(25); w.stop(40); w.start(50); w.start(55); w.stop(60); ck(w.getTotal(),25); ck(w.isRunning(),false); w.start(1); w.reset(); ck(w.getTotal(),0); ck(w.isRunning(),false);`});

/* ===================== Q3: Data Analysis with ArrayList ===================== */
F.push({type:3,id:"honor",title:"School: honorRoll",
 intro:`<pre class="code">public class Student
{
    public String getName() { /* not shown */ }
    public double getGPA() { /* not shown */ }
}

public class School
{
    private ArrayList&lt;Student&gt; students;

    /** Returns a new ArrayList with the names of the students whose GPA is at least
     *  minGPA, in the same order as in students. students is not changed. */
    public ArrayList&lt;String&gt; honorRoll(double minGPA)
    { /* to be implemented */ }
}</pre>`,
 parts:[{id:"m",points:5,prompt:"Write honorRoll.",sig:"public ArrayList<String> honorRoll(double minGPA)",
   pts:[pt("Creates the result list","new ArrayList<String>() (an empty list).","Returns students, or never creates the list."),pt("Traverses students","Visits every student.",""),pt("Checks the GPA","getGPA() >= minGPA.","Uses >."),pt("Adds the name","Adds getName(), not the Student object.",""),pt("Returns, order kept","Returns the new list, keeping the original order, and does not change students.","Removes students that do not qualify.")],
   model:`public ArrayList<String> honorRoll(double minGPA)
{
    ArrayList<String> names = new ArrayList<String>();   // a NEW list for the answer
    for (Student s : students)                           // students itself is not changed
    {
        if (s.getGPA() >= minGPA)                        // "at least" includes equal
        {
            names.add(s.getName());                      // the name, not the Student
        }
    }
    return names;
}`}],
 mistakes:["Removing students from the original list.","Adding the Student object instead of its name."],
 ctx:`static class Student { String n; double g; Student(String n,double g){this.n=n;this.g=g;} public String getName(){return n;} public double getGPA(){return g;} }
static class School { ArrayList<Student> students=new ArrayList<Student>(); /*M*/ }`,
 test:`School s=new School(); s.students.add(new Student("Ana",3.9)); s.students.add(new Student("Bo",3.2)); s.students.add(new Student("Cy",3.5)); ck(s.honorRoll(3.5).toString(),"[Ana, Cy]"); ck(s.students.size(),3); ck(s.honorRoll(4.0).size(),0);`});

F.push({type:3,id:"run",title:"SensorLog: longestIncreasingRun",
 intro:`<pre class="code">public class SensorLog
{
    private ArrayList&lt;Integer&gt; readings;

    /** Returns the length of the longest run of consecutive readings in which
     *  each reading is greater than the one before it.
     *  Precondition: readings.size() &gt; 0 */
    public int longestIncreasingRun()
    { /* to be implemented */ }
}</pre><p>Example: [5, 6, 9, 2, 3, 3, 4, 8, 10] → 4 (3, 4, 8, 10). A single reading is a run of length 1.</p>`,
 parts:[{id:"m",points:5,prompt:"Write longestIncreasingRun.",sig:"public int longestIncreasingRun()",
   pts:[pt("Compares neighbors","Compares get(i) with get(i − 1) for i from 1 to size() − 1.","Out-of-bounds index."),pt("Extends the run","Adds 1 to the current run when the reading increases.",""),pt("Restarts the run","Sets the current run back to 1 (not 0) when it does not increase.","Resets to 0."),pt("Tracks the longest","Updates the longest whenever current is larger, including at the end.",""),pt("Returns","Returns the longest (at least 1).","")],
   model:`public int longestIncreasingRun()
{
    int current = 1;                                   // a single reading is a run of 1
    int longest = 1;
    for (int i = 1; i < readings.size(); i++)
    {
        if (readings.get(i) > readings.get(i - 1))     // strictly greater: the run continues
        {
            current++;
            if (current > longest)
            {
                longest = current;
            }
        }
        else
        {
            current = 1;                               // a new run starts at this reading
        }
    }
    return longest;
}`}],
 mistakes:["Resetting the run to 0 instead of 1.","Treating equal readings as increasing."],
 ctx:`static class SensorLog { ArrayList<Integer> readings=new ArrayList<Integer>(); SensorLog(int... a){ for(int x:a) readings.add(x); } /*M*/ }`,
 test:`ck(new SensorLog(5,6,9,2,3,3,4,8,10).longestIncreasingRun(),4); ck(new SensorLog(7).longestIncreasingRun(),1); ck(new SensorLog(3,2,1).longestIncreasingRun(),1); ck(new SensorLog(1,2,3).longestIncreasingRun(),3);`});

F.push({type:3,id:"front",title:"Roster: moveToFront",
 intro:`<pre class="code">public class Roster
{
    private ArrayList&lt;String&gt; names;

    /** If name is in the list, removes EVERY occurrence of it, inserts one copy
     *  at index 0, and returns true. Otherwise leaves the list unchanged and
     *  returns false. */
    public boolean moveToFront(String name)
    { /* to be implemented */ }
}</pre><p>Example: [Al, Bea, Cal, Bea] and "Bea" → [Bea, Al, Cal], returns true.</p>`,
 parts:[{id:"m",points:5,prompt:"Write moveToFront.",sig:"public boolean moveToFront(String name)",
   pts:[pt("Finds occurrences with equals","Compares each element with name using equals.","=="),pt("Removes every occurrence","Removes all copies without skipping any (backward loop, or no i++ after removing).","Skips the element after a removal."),pt("Remembers if found","Records whether the name was found.",""),pt("Inserts once at the front","add(0, name) exactly once, only if found.","add(name) adds to the end."),pt("Returns","Returns true if found, false otherwise.","")],
   model:`public boolean moveToFront(String name)
{
    boolean found = false;
    for (int i = names.size() - 1; i >= 0; i--)    // backward: removing does not skip anything
    {
        if (names.get(i).equals(name))
        {
            names.remove(i);
            found = true;
        }
    }
    if (found)
    {
        names.add(0, name);                        // add(index, obj) inserts at the front
    }
    return found;
}`}],
 mistakes:["Using add(name), which adds to the end.","Removing while going forward with i++ every pass."],
 ctx:`static class Roster { ArrayList<String> names=new ArrayList<String>(); Roster(String... a){ for(String x:a) names.add(x); } /*M*/ }`,
 test:`Roster r=new Roster("Al","Bea","Cal","Bea"); ck(r.moveToFront("Bea"),true); ck(r.names.toString(),"[Bea, Al, Cal]"); ck(r.moveToFront("Zed"),false); ck(r.names.size(),3); Roster t=new Roster("X","X"); t.moveToFront("X"); ck(t.names.toString(),"[X]");`});

F.push({type:3,id:"uniq",title:"OrderLog: uniqueItems",
 intro:`<pre class="code">public class Order
{
    public String getItem() { /* not shown */ }
    public int getQty() { /* not shown */ }
}

public class OrderLog
{
    private ArrayList&lt;Order&gt; orders;

    /** Returns a new ArrayList of the item names in orders, each name once,
     *  in the order in which each name first appears. */
    public ArrayList&lt;String&gt; uniqueItems()
    { /* to be implemented */ }
}</pre><p>Example: items tea, pie, tea, jam, pie → [tea, pie, jam].</p>`,
 parts:[{id:"m",points:5,prompt:"Write uniqueItems.",sig:"public ArrayList<String> uniqueItems()",
   pts:[pt("Creates the result","new ArrayList<String>().",""),pt("Traverses orders","Visits every order.",""),pt("Checks if already added","Searches the result list for the item name using equals (a nested loop, or a helper).","Compares with only the previous order."),pt("Adds new names","Adds the name only when it is not already in the result.",""),pt("Returns in first-seen order","","")],
   model:`public ArrayList<String> uniqueItems()
{
    ArrayList<String> result = new ArrayList<String>();
    for (Order o : orders)
    {
        String item = o.getItem();
        boolean seen = false;
        for (String r : result)            // is it already in the answer?
        {
            if (r.equals(item))
            {
                seen = true;
            }
        }
        if (!seen)
        {
            result.add(item);              // first time we see this name
        }
    }
    return result;
}`}],
 mistakes:["Only comparing with the previous order (misses repeats that are not next to each other).","Comparing Strings with ==."],
 ctx:`static class Order { String i; int q; Order(String i,int q){this.i=i;this.q=q;} public String getItem(){return i;} public int getQty(){return q;} }
static class OrderLog { ArrayList<Order> orders=new ArrayList<Order>(); OrderLog(String... a){ for(String x:a) orders.add(new Order(x,1)); } /*M*/ }`,
 test:`ck(new OrderLog("tea","pie","tea","jam","pie").uniqueItems().toString(),"[tea, pie, jam]"); ck(new OrderLog().uniqueItems().size(),0);`});

F.push({type:3,id:"avg",title:"PriceList: countAboveAverage",
 intro:`<pre class="code">public class PriceList
{
    private ArrayList&lt;Double&gt; prices;

    /** Returns the number of prices that are greater than the average of all
     *  the prices. Precondition: prices.size() &gt; 0 */
    public int countAboveAverage()
    { /* to be implemented */ }
}</pre><p>Example: [2.0, 4.0, 9.0, 1.0] → average 4.0 → only 9.0 is greater → 1.</p>`,
 parts:[{id:"m",points:5,prompt:"Write countAboveAverage.",sig:"public int countAboveAverage()",
   pts:[pt("First pass: sum","Adds every price.",""),pt("Average","Divides the sum by size() (as a double).",""),pt("Second pass","Traverses the list again AFTER the average is known.","Compares to a running average during the first pass."),pt("Compares strictly","Counts prices > average.","Uses >="),pt("Returns","Returns the count.","")],
   model:`public int countAboveAverage()
{
    double sum = 0;
    for (double p : prices)                    // first pass: total
    {
        sum += p;
    }
    double avg = sum / prices.size();          // the average is only known after the first pass
    int count = 0;
    for (double p : prices)                    // second pass: compare with the average
    {
        if (p > avg)
        {
            count++;
        }
    }
    return count;
}`}],
 mistakes:["Comparing with a running average during the first pass.","Counting prices equal to the average."],
 ctx:`static class PriceList { ArrayList<Double> prices=new ArrayList<Double>(); PriceList(double... a){ for(double x:a) prices.add(x); } /*M*/ }`,
 test:`ck(new PriceList(2.0,4.0,9.0,1.0).countAboveAverage(),1); ck(new PriceList(5.0,5.0).countAboveAverage(),0); ck(new PriceList(1.0,2.0,3.0,10.0).countAboveAverage(),1);`});

/* ===================== Q4: 2D Array ===================== */
F.push({type:4,id:"peaks",title:"Terrain: countPeaks",
 intro:`<pre class="code">public class Terrain
{
    private int[][] height;

    /** Returns the number of cells that are NOT on the edge of the grid and are
     *  strictly higher than all four neighbors (up, down, left, right). */
    public int countPeaks()
    { /* to be implemented */ }
}</pre>`,
 parts:[{id:"m",points:6,prompt:"Write countPeaks.",sig:"public int countPeaks()",
   pts:[pt("Interior rows","Rows 1 to height.length − 2.","Includes edge rows (out of bounds)."),pt("Interior columns","Columns 1 to height[0].length − 2.",""),pt("Compares up and down","height[r][c] > height[r − 1][c] and > height[r + 1][c].",""),pt("Compares left and right","height[r][c] > height[r][c − 1] and > height[r][c + 1].",""),pt("All four with &&","Counts only when all four comparisons are true.","Uses ||"),pt("Returns","","")],
   model:`public int countPeaks()
{
    int count = 0;
    for (int r = 1; r < height.length - 1; r++)            // skip the first and last rows
    {
        for (int c = 1; c < height[0].length - 1; c++)     // skip the first and last columns
        {
            int h = height[r][c];
            if (h > height[r - 1][c] && h > height[r + 1][c]
                && h > height[r][c - 1] && h > height[r][c + 1])
            {
                count++;
            }
        }
    }
    return count;
}`}],
 mistakes:["Checking edge cells, which causes an ArrayIndexOutOfBoundsException.","Using || so that one higher neighbor is enough."],
 ctx:`static class Terrain { int[][] height; Terrain(int[][] h){ height=h; } /*M*/ }`,
 test:`ck(new Terrain(new int[][]{{1,1,1,1},{1,5,2,1},{1,2,6,1},{1,1,1,1}}).countPeaks(),2); ck(new Terrain(new int[][]{{9,9,9},{9,1,9},{9,9,9}}).countPeaks(),0);`});

F.push({type:4,id:"trans",title:"Grid: transpose",
 intro:`<pre class="code">public class Grid
{
    private int[][] cells;   // every row has the same length

    /** Returns a new 2D array with the rows of cells as its columns:
     *  result[c][r] == cells[r][c]. cells is not changed. */
    public int[][] transpose()
    { /* to be implemented */ }
}</pre><p>Example: {{1, 2, 3}, {4, 5, 6}} → {{1, 4}, {2, 5}, {3, 6}}.</p>`,
 parts:[{id:"m",points:6,prompt:"Write transpose.",sig:"public int[][] transpose()",
   pts:[pt("Creates the right size","new int[cells[0].length][cells.length] (columns become rows).","new int[cells.length][cells[0].length]."),pt("Traverses rows","Visits every row of cells.",""),pt("Traverses columns","Visits every column of cells.",""),pt("Copies correctly","result[c][r] = cells[r][c].",""),pt("Does not change cells","cells is unchanged.",""),pt("Returns the new array","","")],
   model:`public int[][] transpose()
{
    int rows = cells.length;
    int cols = cells[0].length;
    int[][] result = new int[cols][rows];      // the dimensions swap
    for (int r = 0; r < rows; r++)
    {
        for (int c = 0; c < cols; c++)
        {
            result[c][r] = cells[r][c];        // row r of cells becomes column r of result
        }
    }
    return result;
}`}],
 mistakes:["Creating the result with the same dimensions as cells (fails for non-square grids).","Swapping inside cells instead of making a new array."],
 ctx:`static class Grid { int[][] cells; Grid(int[][] c){ cells=c; } /*M*/ }`,
 test:`ck(Arrays.deepToString(new Grid(new int[][]{{1,2,3},{4,5,6}}).transpose()),"[[1, 4], [2, 5], [3, 6]]"); ck(Arrays.deepToString(new Grid(new int[][]{{7}}).transpose()),"[[7]]");`});

F.push({type:4,id:"tests",title:"ScoreSheet: bestTest",
 intro:`<pre class="code">public class ScoreSheet
{
    private int[][] scores;   // scores[s][t]: student s, test t

    /** Returns the test (column) with the highest total score over all students.
     *  On a tie, returns the lowest column number. */
    public int bestTest()
    { /* to be implemented */ }
}</pre>`,
 parts:[{id:"m",points:6,prompt:"Write bestTest.",sig:"public int bestTest()",
   pts:[pt("Outer loop over tests (columns)","0 to scores[0].length − 1.","Uses scores.length (the number of students)."),pt("Inner loop over students (rows)","",""),pt("Sums a column","Adds scores[s][t], resetting the sum for each test.",""),pt("Tracks the best","Keeps the largest total and its column.",""),pt("Tie rule","Updates only on strictly greater.",""),pt("Returns the column","","")],
   model:`public int bestTest()
{
    int best = 0;
    int bestTotal = -1;                                // any real total is >= 0
    for (int t = 0; t < scores[0].length; t++)         // each test is a COLUMN
    {
        int total = 0;                                 // reset for every test
        for (int s = 0; s < scores.length; s++)        // go down the column
        {
            total += scores[s][t];
        }
        if (total > bestTotal)                         // strictly greater: ties keep the lower column
        {
            bestTotal = total;
            best = t;
        }
    }
    return best;
}`}],
 mistakes:["Summing rows instead of columns.","Not resetting the total for each test."],
 ctx:`static class ScoreSheet { int[][] scores; ScoreSheet(int[][] s){ scores=s; } /*M*/ }`,
 test:`ck(new ScoreSheet(new int[][]{{80,90,70},{60,95,99}}).bestTest(),1); ck(new ScoreSheet(new int[][]{{5,5}}).bestTest(),0); ck(new ScoreSheet(new int[][]{{1,2,3},{3,2,1},{1,1,9}}).bestTest(),2);`});

F.push({type:4,id:"lights",title:"LightGrid: toggleCross",
 intro:`<pre class="code">public class LightGrid
{
    private boolean[][] on;   // on[r][c] is true if that light is on

    /** Flips the light at (r, c) and each of its up, down, left and right
     *  neighbors that is on the grid. Precondition: (r, c) is on the grid. */
    public void toggleCross(int r, int c)
    { /* to be implemented */ }
}</pre><p>Flipping changes true to false and false to true.</p>`,
 parts:[{id:"m",points:6,prompt:"Write toggleCross.",sig:"public void toggleCross(int r, int c)",
   pts:[pt("Flips the center","on[r][c] = !on[r][c].",""),pt("Flips the vertical neighbors","Rows r − 1 and r + 1 in the same column.",""),pt("Flips the horizontal neighbors","Columns c − 1 and c + 1 in the same row.",""),pt("Row bounds","Skips rows < 0 or ≥ on.length.",""),pt("Column bounds","Skips columns < 0 or ≥ on[0].length.",""),pt("Flips each cell exactly once","The center is not flipped twice.","Loops over a 3×3 block (flips diagonals) or flips the center twice.")],
   model:`public void toggleCross(int r, int c)
{
    int[] dr = {0, -1, 1, 0, 0};                   // center, up, down, left, right
    int[] dc = {0, 0, 0, -1, 1};
    for (int k = 0; k < 5; k++)
    {
        int rr = r + dr[k];
        int cc = c + dc[k];
        if (rr >= 0 && rr < on.length && cc >= 0 && cc < on[0].length)   // stay on the grid
        {
            on[rr][cc] = !on[rr][cc];              // flip: true ↔ false
        }
    }
}`}],
 mistakes:["Flipping diagonal neighbors too.","Flipping the center twice (it ends up unchanged)."],
 ctx:`static class LightGrid { boolean[][] on; LightGrid(int rows,int cols){ on=new boolean[rows][cols]; } /*M*/ }`,
 test:`LightGrid g=new LightGrid(3,3); g.toggleCross(0,0); ck(g.on[0][0],true); ck(g.on[0][1],true); ck(g.on[1][0],true); ck(g.on[1][1],false); g.toggleCross(1,1); ck(g.on[0][1],false); ck(g.on[1][1],true); ck(g.on[2][2],false);`});

F.push({type:4,id:"snake",title:"Board: snakeOrder",
 intro:`<pre class="code">public class Board
{
    private int[][] cells;   // every row has the same length

    /** Returns a 1D array of all the values in "snake" order: row 0 from left to
     *  right, row 1 from right to left, row 2 from left to right, and so on. */
    public int[] snakeOrder()
    { /* to be implemented */ }
}</pre><p>Example: {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}} → {1, 2, 3, 6, 5, 4, 7, 8, 9}.</p>`,
 parts:[{id:"m",points:6,prompt:"Write snakeOrder.",sig:"public int[] snakeOrder()",
   pts:[pt("Creates the 1D array","new int[rows × columns].",""),pt("Traverses rows","Visits every row in order.",""),pt("Left to right on even rows","Rows 0, 2, 4, …: columns 0 to the last.",""),pt("Right to left on odd rows","Rows 1, 3, …: columns from the last down to 0.",""),pt("Fills the next position","Uses a separate index that increases after each value.","Uses r × columns + c on reversed rows (wrong positions)."),pt("Returns the array","","")],
   model:`public int[] snakeOrder()
{
    int cols = cells[0].length;
    int[] result = new int[cells.length * cols];   // room for every value
    int k = 0;                                     // next free position in result
    for (int r = 0; r < cells.length; r++)
    {
        if (r % 2 == 0)                            // even row: left to right
        {
            for (int c = 0; c < cols; c++)
            {
                result[k] = cells[r][c];
                k++;
            }
        }
        else                                       // odd row: right to left
        {
            for (int c = cols - 1; c >= 0; c--)
            {
                result[k] = cells[r][c];
                k++;
            }
        }
    }
    return result;
}`}],
 mistakes:["Reversing the wrong rows (row 0 goes left to right).","Computing the position from r and c on reversed rows."],
 ctx:`static class Board { int[][] cells; Board(int[][] c){ cells=c; } /*M*/ }`,
 test:`ck(Arrays.toString(new Board(new int[][]{{1,2,3},{4,5,6},{7,8,9}}).snakeOrder()),"[1, 2, 3, 6, 5, 4, 7, 8, 9]"); ck(Arrays.toString(new Board(new int[][]{{1,2},{3,4}}).snakeOrder()),"[1, 2, 4, 3]");`});
})();
