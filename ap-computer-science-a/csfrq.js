/* Z-AP Computer Science A free-response problems (original, AP format from May 2026).
   Q1 Methods and Control Structures (7 points) · Q2 Class Design (7) · Q3 Data Analysis with ArrayList (5) · Q4 2D Array (6).
   model: Java code; a "// " comment at the end of a line is that line's explanation (shown line by line).
   ctx + test are used by tools/frqverify to compile the model solutions and check them against the examples. */
(function(){
"use strict";
const F=[];
const pt=(t,earn,not)=>({t,earn,not});

/* ===================== Q1: Methods and Control Structures ===================== */
F.push({type:1,id:"bus",title:"BusRoute",
 intro:`<p>A bus route has stops numbered 0, 1, 2, …. The method <code>passengers</code> returns the number of people on the bus after it leaves a given stop. You will write two methods of the <code>BusRoute</code> class.</p><pre class="code">public class BusRoute
{
    /** Returns the number of passengers on the bus after it leaves stop s.
     *  Precondition: s &gt;= 0 */
    public int passengers(int s)
    { /* implementation not shown */ }

    /** Returns the stop number, from 0 to n - 1, with the most passengers.
     *  If there is a tie, returns the lowest stop number.  Precondition: n &gt; 0 */
    public int busiestStop(int n)
    { /* to be implemented in part (a) */ }

    /** Returns true if, for stops 0 to n - 1, the number of passengers never changes
     *  by more than k between consecutive stops; false otherwise. Precondition: n &gt;= 2 */
    public boolean steadyRoute(int n, int k)
    { /* to be implemented in part (b) */ }
}</pre>`,
 parts:[{id:"a",points:4,prompt:`Write <code>busiestStop</code>. Example: if <code>passengers</code> returns 12, 30, 18, 30, 5 for stops 0 to 4, then <code>busiestStop(5)</code> returns 1 (stops 1 and 3 tie; 1 is lower).`,
   sig:"public int busiestStop(int n)",
   pts:[pt("Calls passengers in a loop","Calls passengers(i) for every stop from 0 to n − 1 (no stop skipped, no out-of-range stop).","Loop runs to i <= n, or starts at 1 without using stop 0 as the starting best."),
        pt("Compares to the current best","Compares passengers(i) with the best value found so far.","Compares only neighboring stops."),
        pt("Updates on strictly greater","Updates the best value AND its stop number only when the new value is strictly greater (so ties keep the lower stop).","Uses >= (returns the higher stop on a tie); stores only the value, not the stop."),
        pt("Returns the stop","Returns the stop number, not the passenger count.","Returns the largest passenger count.")],
   model:`public int busiestStop(int n)
{
    int best = 0;                          // start by assuming stop 0 is the busiest
    int most = passengers(0);              // remember how many people were on after stop 0
    for (int s = 1; s < n; s++)            // check every other stop, 1 to n - 1
    {
        int p = passengers(s);             // call the method once and store the result
        if (p > most)                      // strictly greater: a tie keeps the lower stop
        {
            most = p;                      // new largest count...
            best = s;                      // ...and the stop where it happened
        }
    }
    return best;                           // the stop number, not the count
}`},
  {id:"b",points:3,prompt:`Write <code>steadyRoute</code>. Example: for 10, 14, 11, 16 and k = 5, every change (4, 3, 5) is at most 5, so the method returns <code>true</code>; with k = 4 it returns <code>false</code>.`,
   sig:"public boolean steadyRoute(int n, int k)",
   pts:[pt("Compares consecutive stops","Compares passengers(i) and passengers(i + 1) (or i − 1 and i) for every consecutive pair without going out of range.","Loop to i < n with passengers(i + 1) reaching stop n."),
        pt("Uses the size of the change","Uses Math.abs (or checks both directions) and compares it with k.","Only checks increases."),
        pt("Returns correctly","Returns false as soon as a change is greater than k, and true only after all pairs are checked.","Returns true inside the loop after checking one pair.")],
   model:`public boolean steadyRoute(int n, int k)
{
    for (int s = 1; s < n; s++)                            // pairs (s - 1, s) for s = 1 to n - 1
    {
        int change = passengers(s) - passengers(s - 1);    // can be positive or negative
        if (Math.abs(change) > k)                          // too big a jump, up or down
        {
            return false;                                  // one bad pair is enough
        }
    }
    return true;                                           // every pair was checked and passed
}`}],
 mistakes:["Looping with i <= n or calling passengers(i + 1) when i is n − 1: that stop does not exist.","Using >= in part (a): on a tie it returns the later stop.","Returning true inside the loop in part (b) after the first pair passes."],
 ctx:`static class BusRoute { int[] data; BusRoute(int... d){ data=d; } public int passengers(int s){ return data[s]; } /*M*/ }`,
 test:`ck(new BusRoute(12,30,18,30,5).busiestStop(5),1); ck(new BusRoute(3,2,1).busiestStop(3),0); ck(new BusRoute(1,2,9).busiestStop(3),2);
ck(new BusRoute(10,14,11,16).steadyRoute(4,5),true); ck(new BusRoute(10,14,11,16).steadyRoute(4,4),false); ck(new BusRoute(10,4).steadyRoute(2,5),false);`});

F.push({type:1,id:"pw",title:"PasswordChecker",
 intro:`<p>A website checks passwords with the static methods of the <code>PasswordChecker</code> class.</p><pre class="code">public class PasswordChecker
{
    /** Returns the number of characters in pw that are digits (0 to 9). */
    public static int countDigits(String pw)
    { /* to be implemented in part (a) */ }

    /** Returns true if pw is strong: at least 8 characters long, at least 2 digits,
     *  and it does not contain "pass" anywhere (in any position). */
    public static boolean isStrong(String pw)
    { /* to be implemented in part (b) */ }
}</pre>`,
 parts:[{id:"a",points:4,prompt:`Write <code>countDigits</code>. Example: <code>countDigits("ab3c45")</code> returns 3; <code>countDigits("hello")</code> returns 0.`,sig:"public static int countDigits(String pw)",
   pts:[pt("Accesses each character","Loops over every index 0 to pw.length() − 1 and gets each one-character String with substring(i, i + 1).","Bounds error: substring(i, i + 1) with i = pw.length()."),
        pt("Identifies digits","Correctly decides whether the character is a digit (for example \"0123456789\".indexOf(ch) >= 0, or compareTo with \"0\" and \"9\").","Compares Strings with == ."),
        pt("Counts","Increases a counter for each digit.",""),pt("Returns the count","Returns the count after the loop.","Returns inside the loop.")],
   model:`public static int countDigits(String pw)
{
    String digits = "0123456789";                  // every digit, in one String
    int count = 0;
    for (int i = 0; i < pw.length(); i++)          // every index of pw
    {
        String ch = pw.substring(i, i + 1);        // the character at index i, as a String
        if (digits.indexOf(ch) >= 0)               // found in "0123456789" means it is a digit
        {
            count++;
        }
    }
    return count;                                  // after checking every character
}`},
  {id:"b",points:3,prompt:`Write <code>isStrong</code>. You must use <code>countDigits</code> appropriately. Examples: "abc12xyz" → true; "ab12" → false (too short); "mypass99x" → false (contains "pass").`,sig:"public static boolean isStrong(String pw)",
   pts:[pt("Checks the length","pw.length() >= 8.","Uses > 8."),pt("Uses countDigits","countDigits(pw) >= 2, using the method from part (a).","Re-writes the digit loop instead of calling the method."),pt("Checks for \"pass\" and returns","pw.indexOf(\"pass\") == -1 (or < 0), combined with the other conditions using &&, and returns the boolean.","Uses || ; checks only the start of the String.")],
   model:`public static boolean isStrong(String pw)
{
    boolean longEnough = pw.length() >= 8;         // at least 8 characters
    boolean twoDigits = countDigits(pw) >= 2;      // reuse part (a) (required)
    boolean noPass = pw.indexOf("pass") == -1;     // -1 means "pass" was not found anywhere
    return longEnough && twoDigits && noPass;      // all three must be true
}`}],
 mistakes:["Comparing one-character Strings with == instead of .equals or indexOf.","Writing the digit loop again in part (b) instead of calling countDigits.","Using || so that only one condition has to be true."],
 ctx:`static class PasswordChecker { /*M*/ }`,
 test:`ck(PasswordChecker.countDigits("ab3c45"),3); ck(PasswordChecker.countDigits("hello"),0); ck(PasswordChecker.countDigits("9"),1);
ck(PasswordChecker.isStrong("abc12xyz"),true); ck(PasswordChecker.isStrong("ab12"),false); ck(PasswordChecker.isStrong("mypass99x"),false); ck(PasswordChecker.isStrong("abcdefgh1"),false);`});

F.push({type:1,id:"temp",title:"WeatherStation",
 intro:`<p>A weather station records one temperature each hour, for hours 0 to 23.</p><pre class="code">public class WeatherStation
{
    /** Returns the temperature recorded at hour h. Precondition: 0 &lt;= h &lt;= 23 */
    public int getTemp(int h)
    { /* implementation not shown */ }

    /** Returns the hour (0 to 23) with the lowest temperature; on a tie, the earliest hour. */
    public int coldestHour()
    { /* to be implemented in part (a) */ }

    /** Returns the length of the longest run of consecutive hours whose
     *  temperatures are all greater than t. Returns 0 if there is none. */
    public int longestWarmStreak(int t)
    { /* to be implemented in part (b) */ }
}</pre>`,
 parts:[{id:"a",points:3,prompt:`Write <code>coldestHour</code>.`,sig:"public int coldestHour()",
   pts:[pt("Checks all 24 hours","Calls getTemp(h) for h = 0 to 23 with no out-of-range hour.",""),pt("Finds the minimum","Compares with the smallest value so far and updates on strictly less (ties keep the earliest).","Starts the minimum at 0 (fails if all temperatures are positive)."),pt("Returns the hour","Returns the hour, not the temperature.","")],
   model:`public int coldestHour()
{
    int best = 0;                          // assume hour 0 is the coldest
    for (int h = 1; h <= 23; h++)          // compare every other hour
    {
        if (getTemp(h) < getTemp(best))    // strictly colder: ties keep the earlier hour
        {
            best = h;
        }
    }
    return best;                           // the hour, not the temperature
}`},
  {id:"b",points:4,prompt:`Write <code>longestWarmStreak</code>. Example: if the temperatures above t are at hours 3, 4, 5 and 10, 11, the method returns 3.`,sig:"public int longestWarmStreak(int t)",
   pts:[pt("Visits every hour","Loops over all hours 0 to 23.",""),pt("Counts the current run","Adds 1 to a current-run counter when getTemp(h) > t.","Uses >= t."),pt("Resets the run","Sets the current run back to 0 when the temperature is not above t.","Never resets, so it counts all warm hours."),pt("Tracks and returns the longest","Updates the longest run whenever the current run is larger, including a run that lasts until hour 23, and returns it.","Only updates when the run ends, missing a run that ends at hour 23.")],
   model:`public int longestWarmStreak(int t)
{
    int current = 0;                       // length of the run we are in now
    int longest = 0;                       // best run seen so far
    for (int h = 0; h <= 23; h++)
    {
        if (getTemp(h) > t)                // warm hour: the run continues
        {
            current++;
            if (current > longest)         // update right away, so a run ending at hour 23 counts
            {
                longest = current;
            }
        }
        else
        {
            current = 0;                   // the run is broken
        }
    }
    return longest;
}`}],
 mistakes:["Starting the minimum at 0 instead of at the first value.","Forgetting to reset the current streak.","Updating the longest streak only when a streak ends, which misses a streak at the end."],
 ctx:`static class WeatherStation { int[] t; WeatherStation(int[] a){ t=a; } public int getTemp(int h){ return t[h]; } /*M*/ }`,
 test:`int[] a=new int[24]; for(int i=0;i<24;i++) a[i]=50+i%5; a[7]=40; a[15]=40; ck(new WeatherStation(a).coldestHour(),7);
int[] b=new int[24]; b[3]=b[4]=b[5]=80; b[10]=b[11]=80; b[23]=80; ck(new WeatherStation(b).longestWarmStreak(70),3);
int[] c=new int[24]; for(int i=18;i<24;i++) c[i]=90; ck(new WeatherStation(c).longestWarmStreak(70),6); ck(new WeatherStation(new int[24]).longestWarmStreak(0),0);`});

F.push({type:1,id:"text",title:"TextTools",
 intro:`<pre class="code">public class TextTools
{
    /** Returns the number of times target occurs in str. Occurrences may overlap.
     *  Precondition: target.length() &gt; 0 */
    public static int countOccurrences(String str, String target)
    { /* to be implemented in part (a) */ }

    /** Returns str with every occurrence of target removed.
     *  Precondition: target.length() &gt; 0 */
    public static String removeAll(String str, String target)
    { /* to be implemented in part (b) */ }
}</pre>`,
 parts:[{id:"a",points:4,prompt:`Write <code>countOccurrences</code>. Examples: ("banana", "ana") → 2 (overlapping); ("aaaa", "aa") → 3; ("cat", "dog") → 0.`,sig:"public static int countOccurrences(String str, String target)",
   pts:[pt("Checks every starting position","Loops over every index i where a match could start: 0 to str.length() − target.length().","Goes past the end (bounds error) or misses the last possible position."),pt("Extracts the right piece","Uses str.substring(i, i + target.length()).",""),pt("Compares with equals","Compares with .equals(target).","Uses =="),pt("Counts and returns","Counts matches and returns the total.","")],
   model:`public static int countOccurrences(String str, String target)
{
    int count = 0;
    int len = target.length();
    for (int i = 0; i + len <= str.length(); i++)          // last start index is str.length() - len
    {
        if (str.substring(i, i + len).equals(target))      // the piece starting at i, same length as target
        {
            count++;                                       // overlapping matches are counted because i moves by 1
        }
    }
    return count;
}`},
  {id:"b",points:3,prompt:`Write <code>removeAll</code>. Examples: ("banana", "an") → "ba"; ("mississippi", "ss") → "miiippi".`,sig:"public static String removeAll(String str, String target)",
   pts:[pt("Finds occurrences","Uses indexOf (or a substring loop) to find target.",""),pt("Removes correctly","Builds the String without the occurrence: str.substring(0, k) + str.substring(k + target.length()).","Off-by-one in the substring indexes."),pt("Repeats and returns","Repeats until no occurrence remains (or traverses once), then returns the result.","Removes only the first occurrence.")],
   model:`public static String removeAll(String str, String target)
{
    int k = str.indexOf(target);                                       // first occurrence, or -1
    while (k >= 0)                                                     // keep going while target is still there
    {
        str = str.substring(0, k) + str.substring(k + target.length()); // cut out target
        k = str.indexOf(target);                                       // look again in the new String
    }
    return str;
}`}],
 mistakes:["Using i < str.length() with substring(i, i + len): out of bounds near the end.","Comparing Strings with ==.","Removing only the first occurrence."],
 ctx:`static class TextTools { /*M*/ }`,
 test:`ck(TextTools.countOccurrences("banana","ana"),2); ck(TextTools.countOccurrences("aaaa","aa"),3); ck(TextTools.countOccurrences("cat","dog"),0); ck(TextTools.countOccurrences("ab","ab"),1);
ck(TextTools.removeAll("banana","an"),"ba"); ck(TextTools.removeAll("mississippi","ss"),"miiippi"); ck(TextTools.removeAll("abc","x"),"abc");`});

F.push({type:1,id:"dice",title:"DiceGame",
 intro:`<pre class="code">public class DiceGame
{
    /** Simulates rolling a die and returns a value from 1 to 6. */
    public int roll()
    { /* implementation not shown */ }

    /** Rolls until the sum of all rolls is at least total; returns the number of rolls.
     *  Precondition: total &gt; 0 */
    public int rollsToReach(int total)
    { /* to be implemented in part (a) */ }

    /** Rolls n times; returns true if any two consecutive rolls are equal.
     *  Precondition: n &gt;= 2 */
    public boolean hasDoubles(int n)
    { /* to be implemented in part (b) */ }
}</pre>`,
 parts:[{id:"a",points:3,prompt:`Write <code>rollsToReach</code>. Example: if the rolls are 4, 2, 6, … then rollsToReach(10) returns 3 (4 + 2 + 6 = 12 ≥ 10).`,sig:"public int rollsToReach(int total)",
   pts:[pt("Repeats until the sum is reached","A while loop (or equivalent) that continues while sum < total.","Uses a for loop with a fixed number of rolls."),pt("Calls roll once per pass","Adds the result of ONE roll() call per pass to the sum.","Calls roll() twice per pass (for example once to test and once to add)."),pt("Counts and returns","Counts the rolls and returns the count.","")],
   model:`public int rollsToReach(int total)
{
    int sum = 0;
    int count = 0;
    while (sum < total)            // not there yet: roll again
    {
        sum += roll();             // exactly one call to roll() per pass
        count++;
    }
    return count;                  // number of rolls it took
}`},
  {id:"b",points:4,prompt:`Write <code>hasDoubles</code>. Each call to <code>roll</code> returns a new random value, so call it exactly n times. Example: rolls 3, 5, 5, 2 → true.`,sig:"public boolean hasDoubles(int n)",
   pts:[pt("Rolls exactly n times","Calls roll() exactly n times (unless it returns early).","Calls roll() 2 times per pass, rolling 2n − 1 or 2n times."),pt("Remembers the previous roll","Stores the previous roll in a variable.","Compares two NEW rolls each time instead of the previous one."),pt("Compares consecutive rolls","Compares each new roll with the previous one using ==.",""),pt("Returns correctly","Returns true when equal ones are found and false only after all n rolls.","Returns false inside the loop.")],
   model:`public boolean hasDoubles(int n)
{
    int prev = roll();                     // first roll
    for (int i = 2; i <= n; i++)           // rolls 2 through n: n rolls in total
    {
        int cur = roll();                  // one new roll per pass
        if (cur == prev)                   // same as the roll just before it
        {
            return true;
        }
        prev = cur;                        // this roll becomes the "previous" one
    }
    return false;                          // all n rolls checked, no doubles
}`}],
 mistakes:["Calling roll() more than once per step: every call is a NEW roll.","Comparing two new rolls instead of the new roll and the previous one."],
 ctx:`static class DiceGame { int[] r; int k=0; DiceGame(int... a){ r=a; } public int roll(){ return r[k++]; } /*M*/ }`,
 test:`ck(new DiceGame(4,2,6,1).rollsToReach(10),3); ck(new DiceGame(6).rollsToReach(6),1); ck(new DiceGame(3,5,5,2).hasDoubles(4),true); ck(new DiceGame(1,2,3,4).hasDoubles(4),false);`});

/* ===================== Q2: Class Design ===================== */
const CLASSPTS=(extra)=>[pt("Class header and instance variables","public class with private instance variables of the right types.","Public instance variables; static variables for data each object should have."),pt("Constructor","Constructor with the right parameters that initializes every instance variable.","Re-declares the variables inside the constructor (shadowing), so the instance variables stay unset."),...extra];
F.push({type:2,id:"gift",title:"GiftCard",
 intro:`<p>Write the complete <code>GiftCard</code> class. A gift card starts with a balance in dollars. Spending succeeds only if the balance is large enough. The card counts successful purchases.</p>
<table class="ex"><tr><th>Statement</th><th>Result</th><th>Explanation</th></tr>
<tr><td><code>GiftCard g = new GiftCard(50);</code></td><td></td><td>balance 50</td></tr>
<tr><td><code>g.spend(20)</code></td><td>true</td><td>balance 30, 1 purchase</td></tr>
<tr><td><code>g.spend(40)</code></td><td>false</td><td>not enough; nothing changes</td></tr>
<tr><td><code>g.spend(30)</code></td><td>true</td><td>balance 0, 2 purchases</td></tr>
<tr><td><code>g.getBalance()</code></td><td>0</td><td></td></tr>
<tr><td><code>g.getPurchases()</code></td><td>2</td><td></td></tr></table>`,
 parts:[{id:"class",points:7,prompt:"Write the complete GiftCard class, including the constructor and the methods spend, getBalance and getPurchases.",sig:"public class GiftCard",
   pts:CLASSPTS([pt("spend: checks the balance","Compares amt with the balance (amt <= balance).","Uses < (spending the exact balance fails)."),pt("spend: updates","Subtracts amt and adds 1 to the purchase count only when the purchase succeeds.","Changes the balance even when it fails."),pt("spend: returns","Returns true when the purchase succeeds and false otherwise.",""),pt("getBalance","Returns the balance.",""),pt("getPurchases","Returns the number of successful purchases.","")]),
   model:`public class GiftCard
{
    private int balance;                   // money left on the card
    private int purchases;                 // successful purchases so far

    public GiftCard(int start)
    {
        balance = start;                   // set the instance variable (no "int" here)
        purchases = 0;
    }

    public boolean spend(int amt)
    {
        if (amt <= balance)                // spending the exact balance is allowed
        {
            balance -= amt;
            purchases++;
            return true;
        }
        return false;                      // not enough money: nothing changes
    }

    public int getBalance()
    {
        return balance;
    }

    public int getPurchases()
    {
        return purchases;
    }
}`}],
 mistakes:["Writing int balance = start; in the constructor: that creates a local variable.","Changing the balance even when the purchase fails.","Making instance variables public or static."],
 ctx:`/*M*/`,test:`GiftCard g=new GiftCard(50); ck(g.spend(20),true); ck(g.spend(40),false); ck(g.spend(30),true); ck(g.getBalance(),0); ck(g.getPurchases(),2);`});

F.push({type:2,id:"meter",title:"ParkingMeter",
 intro:`<p>Write the complete <code>ParkingMeter</code> class. Each quarter adds 15 minutes, but the time can never go above the maximum set in the constructor. Each call to <code>tick</code> removes one minute (time never goes below 0).</p>
<table class="ex"><tr><th>Statement</th><th>Result</th><th>Explanation</th></tr>
<tr><td><code>ParkingMeter m = new ParkingMeter(60);</code></td><td></td><td>max 60 minutes, 0 on the meter</td></tr>
<tr><td><code>m.isExpired()</code></td><td>true</td><td>0 minutes left</td></tr>
<tr><td><code>m.addQuarters(3)</code></td><td></td><td>45 minutes</td></tr>
<tr><td><code>m.addQuarters(2)</code></td><td></td><td>75 would be over the max: 60</td></tr>
<tr><td><code>m.tick()</code></td><td></td><td>59</td></tr>
<tr><td><code>m.getMinutes()</code></td><td>59</td><td></td></tr>
<tr><td><code>m.isExpired()</code></td><td>false</td><td></td></tr></table>`,
 parts:[{id:"class",points:7,prompt:"Write the complete ParkingMeter class with the constructor and the methods addQuarters, tick, getMinutes and isExpired.",sig:"public class ParkingMeter",
   pts:CLASSPTS([pt("addQuarters: adds time","Adds 15 × quarters minutes.",""),pt("addQuarters: caps at the maximum","Never lets the minutes go above the maximum.","Checks the maximum before adding, so 45 + 30 is not capped."),pt("tick","Subtracts 1 minute only when minutes > 0.","Lets minutes go negative."),pt("getMinutes","Returns the current minutes.",""),pt("isExpired","Returns true exactly when minutes is 0.","")]),
   model:`public class ParkingMeter
{
    private int maxMinutes;                // the cap set by the constructor
    private int minutes;                   // time left on the meter

    public ParkingMeter(int max)
    {
        maxMinutes = max;
        minutes = 0;                       // a new meter is empty
    }

    public void addQuarters(int q)
    {
        minutes += 15 * q;                 // 15 minutes per quarter
        if (minutes > maxMinutes)          // cap AFTER adding
        {
            minutes = maxMinutes;
        }
    }

    public void tick()
    {
        if (minutes > 0)                   // never below 0
        {
            minutes--;
        }
    }

    public int getMinutes()
    {
        return minutes;
    }

    public boolean isExpired()
    {
        return minutes == 0;
    }
}`}],
 mistakes:["Forgetting the cap, or checking it before adding.","Letting minutes go negative in tick.","Returning minutes < 0 in isExpired (it is never negative)."],
 ctx:`/*M*/`,test:`ParkingMeter m=new ParkingMeter(60); ck(m.isExpired(),true); m.addQuarters(3); ck(m.getMinutes(),45); m.addQuarters(2); ck(m.getMinutes(),60); m.tick(); ck(m.getMinutes(),59); ck(m.isExpired(),false); ParkingMeter z=new ParkingMeter(30); z.tick(); ck(z.getMinutes(),0);`});

F.push({type:2,id:"book",title:"ReadingLog",
 intro:`<p>Write the complete <code>ReadingLog</code> class, which tracks progress through one book.</p>
<table class="ex"><tr><th>Statement</th><th>Result</th><th>Explanation</th></tr>
<tr><td><code>ReadingLog r = new ReadingLog("Holes", 200);</code></td><td></td><td>title and total pages</td></tr>
<tr><td><code>r.status()</code></td><td>"not started"</td><td>0 pages read</td></tr>
<tr><td><code>r.read(50)</code></td><td></td><td>50 pages read</td></tr>
<tr><td><code>r.percentDone()</code></td><td>25.0</td><td>50 / 200 × 100</td></tr>
<tr><td><code>r.status()</code></td><td>"in progress"</td><td></td></tr>
<tr><td><code>r.read(500)</code></td><td></td><td>cannot pass the last page: 200</td></tr>
<tr><td><code>r.status()</code></td><td>"Holes finished"</td><td>the title, a space, then "finished"</td></tr></table>`,
 parts:[{id:"class",points:7,prompt:"Write the complete ReadingLog class.",sig:"public class ReadingLog",
   pts:CLASSPTS([pt("read","Adds the pages but never goes above the total.","Pages read can exceed the total."),pt("percentDone: double division","Returns a double computed without integer division, e.g. 100.0 * read / total.","pagesRead / total * 100 (integer division gives 0)."),pt("status: three cases","Returns \"not started\" when 0 pages are read and \"in progress\" in between.",""),pt("status: finished","Returns title + \" finished\" when all pages are read.","Hard-codes a title."),pt("Correct return types","Methods have the right return types (void, double, String).","")]),
   model:`public class ReadingLog
{
    private String title;
    private int totalPages;
    private int pagesRead;

    public ReadingLog(String t, int total)
    {
        title = t;
        totalPages = total;
        pagesRead = 0;
    }

    public void read(int p)
    {
        pagesRead = Math.min(pagesRead + p, totalPages);   // never past the last page
    }

    public double percentDone()
    {
        return 100.0 * pagesRead / totalPages;              // 100.0 makes it double division
    }

    public String status()
    {
        if (pagesRead == 0)
        {
            return "not started";
        }
        else if (pagesRead < totalPages)
        {
            return "in progress";
        }
        return title + " finished";                          // pagesRead == totalPages
    }
}`}],
 mistakes:["Integer division in percentDone: 50 / 200 is 0 in Java.","Letting pagesRead grow past the total.","Returning \"Holes finished\" literally instead of using the title variable."],
 ctx:`/*M*/`,test:`ReadingLog r=new ReadingLog("Holes",200); ck(r.status(),"not started"); r.read(50); ck(r.percentDone(),25.0); ck(r.status(),"in progress"); r.read(500); ck(r.status(),"Holes finished"); ck(r.percentDone(),100.0);`});

F.push({type:2,id:"light",title:"TrafficLight",
 intro:`<p>Write the complete <code>TrafficLight</code> class. A light shows "green", then "yellow", then "red", then "green" again, and so on. Each call to <code>advance</code> moves to the next color. The light counts how many times it has turned green AFTER being created.</p>
<table class="ex"><tr><th>Statement</th><th>Result</th></tr>
<tr><td><code>TrafficLight t = new TrafficLight();</code></td><td>starts green</td></tr>
<tr><td><code>t.getColor()</code></td><td>"green"</td></tr>
<tr><td><code>t.advance(); t.advance();</code></td><td></td></tr>
<tr><td><code>t.getColor()</code></td><td>"red"</td></tr>
<tr><td><code>t.advance();</code></td><td></td></tr>
<tr><td><code>t.getColor()</code></td><td>"green"</td></tr>
<tr><td><code>t.getCycles()</code></td><td>1</td></tr></table>`,
 parts:[{id:"class",points:7,prompt:"Write the complete TrafficLight class (no-parameter constructor; methods advance, getColor, getCycles).",sig:"public class TrafficLight",
   pts:CLASSPTS([pt("advance: green → yellow","Moves from green to yellow.",""),pt("advance: yellow → red","Moves from yellow to red.",""),pt("advance: red → green and counts","Moves from red to green and adds 1 to the cycle count.","Counts every advance, or counts at the start."),pt("Compares Strings correctly","Uses .equals (or an int state) to decide the current color.","Compares Strings with =="),pt("Accessors","getColor and getCycles return the right values.","")]),
   model:`public class TrafficLight
{
    private String color;
    private int cycles;

    public TrafficLight()
    {
        color = "green";                   // a new light starts green
        cycles = 0;
    }

    public void advance()
    {
        if (color.equals("green"))         // compare Strings with equals, not ==
        {
            color = "yellow";
        }
        else if (color.equals("yellow"))
        {
            color = "red";
        }
        else                               // red
        {
            color = "green";
            cycles++;                      // count only when it turns green again
        }
    }

    public String getColor()
    {
        return color;
    }

    public int getCycles()
    {
        return cycles;
    }
}`}],
 mistakes:["Using separate if statements instead of else if: one advance can then change the color twice.","Comparing Strings with ==.","Counting the cycle when the light turns red."],
 ctx:`/*M*/`,test:`TrafficLight t=new TrafficLight(); ck(t.getColor(),"green"); t.advance(); ck(t.getColor(),"yellow"); t.advance(); ck(t.getColor(),"red"); t.advance(); ck(t.getColor(),"green"); ck(t.getCycles(),1); for(int i=0;i<6;i++) t.advance(); ck(t.getCycles(),3);`});

F.push({type:2,id:"plant",title:"Plant",
 intro:`<p>Write the complete <code>Plant</code> class. A plant has a name and needs water every <i>need</i> days. <code>newDay</code> moves one day forward; <code>water</code> resets the count of days since watering. A plant is healthy while the days since watering is at most <i>need</i>.</p>
<table class="ex"><tr><th>Statement</th><th>Result</th></tr>
<tr><td><code>Plant p = new Plant("Fern", 2);</code></td><td>0 days since watering</td></tr>
<tr><td><code>p.newDay(); p.newDay();</code></td><td>2 days</td></tr>
<tr><td><code>p.isHealthy()</code></td><td>true</td></tr>
<tr><td><code>p.newDay();</code></td><td>3 days</td></tr>
<tr><td><code>p.isHealthy()</code></td><td>false</td></tr>
<tr><td><code>p.water(); p.isHealthy()</code></td><td>true</td></tr>
<tr><td><code>p.toString()</code></td><td>"Fern: 0 days"</td></tr></table>`,
 parts:[{id:"class",points:7,prompt:"Write the complete Plant class with the constructor and the methods newDay, water, isHealthy and toString.",sig:"public class Plant",
   pts:CLASSPTS([pt("newDay","Adds 1 to the days since watering.",""),pt("water","Sets the days since watering to 0.",""),pt("isHealthy","Returns days <= need.","Uses <."),pt("toString format","Returns name + \": \" + days + \" days\".","Wrong spacing or missing parts."),pt("Method headers","Correct headers: public void newDay(), public void water(), public boolean isHealthy(), public String toString().","")]),
   model:`public class Plant
{
    private String name;
    private int need;                      // water needed every "need" days
    private int days;                      // days since the last watering

    public Plant(String n, int needDays)
    {
        name = n;
        need = needDays;
        days = 0;
    }

    public void newDay()
    {
        days++;
    }

    public void water()
    {
        days = 0;
    }

    public boolean isHealthy()
    {
        return days <= need;               // exactly "need" days is still healthy
    }

    public String toString()
    {
        return name + ": " + days + " days";
    }
}`}],
 mistakes:["Using < in isHealthy (2 days with need 2 is still healthy).","Wrong format in toString: it must match exactly."],
 ctx:`/*M*/`,test:`Plant p=new Plant("Fern",2); p.newDay(); p.newDay(); ck(p.isHealthy(),true); p.newDay(); ck(p.isHealthy(),false); p.water(); ck(p.isHealthy(),true); ck(p.toString(),"Fern: 0 days");`});

/* ===================== Q3: Data Analysis with ArrayList ===================== */
const SONG=`public class Song
{
    public String getTitle()  { /* not shown */ }
    public String getArtist() { /* not shown */ }
    public int getMinutes()   { /* not shown */ }
}`;
F.push({type:3,id:"songs",title:"Playlist: removeLong",
 intro:`<pre class="code">${SONG}

public class Playlist
{
    private ArrayList&lt;Song&gt; songs;

    /** Removes every song longer than max minutes and returns the total
     *  minutes of the songs removed. The other songs stay in their order. */
    public int removeLong(int max)
    { /* to be implemented */ }
}</pre><p>Example: songs with lengths 3, 7, 8, 2, 9 and max = 5 → the list becomes the songs of length 3 and 2, and the method returns 24.</p>`,
 parts:[{id:"m",points:5,prompt:"Write removeLong.",sig:"public int removeLong(int max)",
   pts:[pt("Traverses the list","Accesses every song with get(i) and size(), without skipping any.","Removes going forward with i++ after every pass, which skips the song that slides into position i."),pt("Checks the length","Compares getMinutes() with max using >.",""),pt("Adds removed minutes","Adds the minutes of each removed song to a total.",""),pt("Removes correctly","Removes exactly the long songs (for example by traversing backward, or not incrementing after a removal).",""),pt("Returns the total","Returns the total minutes removed.","")],
   model:`public int removeLong(int max)
{
    int total = 0;
    for (int i = songs.size() - 1; i >= 0; i--)    // go BACKWARD so removing doesn't skip anything
    {
        Song s = songs.get(i);
        if (s.getMinutes() > max)                  // longer than max
        {
            total += s.getMinutes();               // count it before it is gone
            songs.remove(i);
        }
    }
    return total;
}`}],
 mistakes:["Removing while going forward: after remove(i), the next song moves to index i and gets skipped.","Using the enhanced for loop while removing: that throws a ConcurrentModificationException."],
 ctx:`static class Song { String t,a; int m; Song(String t,String a,int m){this.t=t;this.a=a;this.m=m;} public String getTitle(){return t;} public String getArtist(){return a;} public int getMinutes(){return m;} }
static class Playlist { ArrayList<Song> songs=new ArrayList<Song>(); Playlist(int... m){ for(int x:m) songs.add(new Song("s"+x,"x",x)); } /*M*/ }`,
 test:`Playlist p=new Playlist(3,7,8,2,9); ck(p.removeLong(5),24); ck(p.songs.size(),2); ck(p.songs.get(1).getMinutes(),2); Playlist q=new Playlist(9,9,1); ck(q.removeLong(5),18); ck(q.songs.size(),1);`});

F.push({type:3,id:"grades",title:"GradeBook: averageWithoutLowest",
 intro:`<pre class="code">public class GradeBook
{
    private ArrayList&lt;Integer&gt; scores;

    /** Returns the average of the scores after dropping ONE lowest score.
     *  scores is not changed. Precondition: scores.size() &gt;= 2 */
    public double averageWithoutLowest()
    { /* to be implemented */ }
}</pre><p>Example: scores 80, 65, 90, 65 → drop one 65 → (80 + 90 + 65) / 3 = 78.33…</p>`,
 parts:[{id:"m",points:5,prompt:"Write averageWithoutLowest.",sig:"public double averageWithoutLowest()",
   pts:[pt("Traverses the list","Visits every score.",""),pt("Finds the sum","Adds all the scores.",""),pt("Finds the lowest","Finds the smallest score (starting from an element of the list, not 0 or 100).","Starts the minimum at 0."),pt("Drops only one","Subtracts the lowest score once and divides by size() − 1.","Removes every copy of the lowest score."),pt("double division, no changes","Returns a double without integer division, and leaves scores unchanged.","Removes from scores.")],
   model:`public double averageWithoutLowest()
{
    int sum = 0;
    int low = scores.get(0);               // start at a real score, not at 0
    for (int s : scores)                   // auto-unboxing: each Integer becomes an int
    {
        sum += s;
        if (s < low)
        {
            low = s;
        }
    }
    return (double) (sum - low) / (scores.size() - 1);   // cast to avoid integer division
}`}],
 mistakes:["Integer division when averaging.","Removing the lowest score from the list (the list must not change).","Dropping every copy of the lowest score."],
 ctx:`static class GradeBook { ArrayList<Integer> scores=new ArrayList<Integer>(); GradeBook(int... a){ for(int x:a) scores.add(x); } /*M*/ }`,
 test:`GradeBook g=new GradeBook(80,65,90,65); ck(Math.abs(g.averageWithoutLowest()-235.0/3)<1e-9,true); ck(g.scores.size(),4); ck(new GradeBook(50,100).averageWithoutLowest(),100.0);`});

F.push({type:3,id:"inv",title:"Inventory: restock",
 intro:`<pre class="code">public class Item
{
    public Item(String name, int qty) { /* not shown */ }
    public String getName() { /* not shown */ }
    public int getQty() { /* not shown */ }
    public void setQty(int q) { /* not shown */ }
}

public class Inventory
{
    private ArrayList&lt;Item&gt; items;   // no two items have the same name

    /** If an item named name is in the list, adds n to its quantity.
     *  Otherwise adds a new Item(name, n) to the END of the list. */
    public void restock(String name, int n)
    { /* to be implemented */ }
}</pre>`,
 parts:[{id:"m",points:5,prompt:"Write restock.",sig:"public void restock(String name, int n)",
   pts:[pt("Traverses the list","Looks at every item.",""),pt("Compares names","Compares getName() with name using equals.","=="),pt("Updates quantity","setQty(getQty() + n) on the matching item.","Replaces the quantity with n."),pt("Adds a new item only if not found","Adds new Item(name, n) to the end only when no item matched.","Adds a new item inside the loop for every item that does not match."),pt("Exactly one action","Stops (return or flag) after updating so nothing else changes.","")],
   model:`public void restock(String name, int n)
{
    for (Item it : items)                          // the list is not changed during this loop
    {
        if (it.getName().equals(name))             // compare Strings with equals
        {
            it.setQty(it.getQty() + n);            // add to the old quantity
            return;                                // done: don't also add a new item
        }
    }
    items.add(new Item(name, n));                  // only reached when no name matched
}`}],
 mistakes:["Adding a new item inside the loop whenever one name does not match.","Setting the quantity to n instead of adding n."],
 ctx:`static class Item { String nm; int q; Item(String n,int q){nm=n;this.q=q;} public String getName(){return nm;} public int getQty(){return q;} public void setQty(int v){q=v;} }
static class Inventory { ArrayList<Item> items=new ArrayList<Item>(); /*M*/ }`,
 test:`Inventory v=new Inventory(); v.items.add(new Item("pen",3)); v.items.add(new Item("cup",1)); v.restock("cup",4); ck(v.items.get(1).getQty(),5); v.restock("ink",2); ck(v.items.size(),3); ck(v.items.get(2).getName(),"ink"); ck(v.items.get(2).getQty(),2);`});

F.push({type:3,id:"dups",title:"WordList: collapseDuplicates",
 intro:`<pre class="code">public class WordList
{
    private ArrayList&lt;String&gt; words;

    /** Removes every word that is equal to the word just before it, so no two
     *  neighboring words are equal. Returns the number of words removed. */
    public int collapseDuplicates()
    { /* to be implemented */ }
}</pre><p>Example: [a, a, b, b, b, a, c, c] → [a, b, a, c]; returns 4.</p>`,
 parts:[{id:"m",points:5,prompt:"Write collapseDuplicates.",sig:"public int collapseDuplicates()",
   pts:[pt("Compares neighbors","Compares words.get(i) with words.get(i − 1) (or i + 1) using equals, staying in bounds.",""),pt("Removes duplicates","Removes the repeated word.",""),pt("Does not skip after removing","After a removal, the same index is checked again (or traverses backward).","i++ after every removal, missing runs of 3 or more."),pt("Counts","Counts the removed words.",""),pt("Returns","Returns the count.","")],
   model:`public int collapseDuplicates()
{
    int removed = 0;
    int i = 1;
    while (i < words.size())                       // size() changes as we remove, so re-check it
    {
        if (words.get(i).equals(words.get(i - 1))) // same as the word before it
        {
            words.remove(i);                       // the next word slides into index i...
            removed++;
        }
        else
        {
            i++;                                   // ...so only move on when nothing was removed
        }
    }
    return removed;
}`}],
 mistakes:["Moving i forward after a removal: the word that slid into position i is never compared.","Comparing Strings with ==."],
 ctx:`static class WordList { ArrayList<String> words=new ArrayList<String>(); WordList(String... a){ for(String x:a) words.add(x); } /*M*/ }`,
 test:`WordList w=new WordList("a","a","b","b","b","a","c","c"); ck(w.collapseDuplicates(),4); ck(w.words.toString(),"[a, b, a, c]"); ck(new WordList("x").collapseDuplicates(),0);`});

F.push({type:3,id:"votes",title:"Election: winner",
 intro:`<pre class="code">public class Election
{
    private ArrayList&lt;String&gt; votes;   // each element is one candidate's name

    /** Returns the name with the most votes. If there is a tie, returns the tied
     *  name that appears first in votes. Precondition: votes.size() &gt; 0 */
    public String winner()
    { /* to be implemented */ }
}</pre><p>Example: [Kim, Lee, Kim, Ray, Lee] → Kim and Lee have 2 each; Kim appears first, so "Kim".</p>`,
 parts:[{id:"m",points:5,prompt:"Write winner.",sig:"public String winner()",
   pts:[pt("Outer traversal","Looks at each vote in order.",""),pt("Counts votes for a name","For a name, counts how many times it appears using equals.",""),pt("Tracks the best","Keeps the name with the largest count so far.",""),pt("Tie rule","Updates only when strictly greater, so the earliest name wins ties.","Uses >=."),pt("Returns a name","Returns the winning name.","Returns the count.")],
   model:`public String winner()
{
    String best = votes.get(0);
    int bestCount = 0;
    for (int i = 0; i < votes.size(); i++)             // each vote, in order
    {
        String name = votes.get(i);
        int count = 0;
        for (String v : votes)                         // count this name's votes
        {
            if (v.equals(name))
            {
                count++;
            }
        }
        if (count > bestCount)                         // strictly more: earlier names win ties
        {
            bestCount = count;
            best = name;
        }
    }
    return best;
}`}],
 mistakes:["Using >= so that a later tied name replaces the earlier one.","Comparing names with ==."],
 ctx:`static class Election { ArrayList<String> votes=new ArrayList<String>(); Election(String... a){ for(String x:a) votes.add(x); } /*M*/ }`,
 test:`ck(new Election("Kim","Lee","Kim","Ray","Lee").winner(),"Kim"); ck(new Election("Ray").winner(),"Ray"); ck(new Election("A","B","B").winner(),"B");`});

/* ===================== Q4: 2D Array ===================== */
F.push({type:4,id:"seats",title:"Theater: rowWithMostEmpty",
 intro:`<pre class="code">public class Theater
{
    private boolean[][] taken;   // taken[r][c] is true if the seat is sold

    /** Returns the row with the most empty (not taken) seats.
     *  On a tie, returns the lowest row number. */
    public int rowWithMostEmpty()
    { /* to be implemented */ }
}</pre>`,
 parts:[{id:"m",points:6,prompt:"Write rowWithMostEmpty.",sig:"public int rowWithMostEmpty()",
   pts:[pt("Traverses rows","Outer loop over every row: 0 to taken.length − 1.",""),pt("Traverses seats in a row","Inner loop over every column of that row.",""),pt("Counts empty seats","Counts seats where taken[r][c] is false (!taken[r][c]).","Counts taken seats."),pt("Resets per row","Starts the count at 0 for each row.","One counter for the whole theater."),pt("Tracks the best row","Keeps the row number with the largest count, updating only on strictly greater.",""),pt("Returns the row","Returns the row index.","")],
   model:`public int rowWithMostEmpty()
{
    int bestRow = 0;
    int bestCount = -1;                            // any real count (0 or more) beats this
    for (int r = 0; r < taken.length; r++)         // each row
    {
        int empty = 0;                             // reset for every row
        for (int c = 0; c < taken[r].length; c++) // each seat in row r
        {
            if (!taken[r][c])                      // not sold
            {
                empty++;
            }
        }
        if (empty > bestCount)                     // strictly greater: ties keep the lower row
        {
            bestCount = empty;
            bestRow = r;
        }
    }
    return bestRow;
}`}],
 mistakes:["Not resetting the counter for each row.","Mixing up taken.length (rows) and taken[0].length (columns)."],
 ctx:`static class Theater { boolean[][] taken; Theater(boolean[][] t){ taken=t; } /*M*/ }`,
 test:`boolean T=true,F=false; ck(new Theater(new boolean[][]{{T,T,F},{F,F,T},{F,T,F}}).rowWithMostEmpty(),1); ck(new Theater(new boolean[][]{{T,T},{T,T}}).rowWithMostEmpty(),0);`});

F.push({type:4,id:"img",title:"Image: columnMax",
 intro:`<pre class="code">public class Image
{
    private int[][] pixels;   // brightness values; every row has the same length

    /** Returns an array whose element c is the largest value in column c. */
    public int[] columnMax()
    { /* to be implemented */ }
}</pre><p>Example: pixels {{3, 9, 1}, {7, 2, 1}, {5, 4, 8}} → {7, 9, 8}.</p>`,
 parts:[{id:"m",points:6,prompt:"Write columnMax.",sig:"public int[] columnMax()",
   pts:[pt("Creates the result array","new int[pixels[0].length] (one slot per column).","Uses pixels.length (the number of rows)."),pt("Column-major traversal","Outer loop over columns, inner loop over rows (or an equivalent).",""),pt("Starts the max correctly","Starts each column's max at an element of that column (or uses a row-0 value).","Starts at 0 (fails for all-negative columns)."),pt("Finds the max","Updates when a larger value is found.",""),pt("Stores per column","Stores each column's max in the right index.",""),pt("Returns","Returns the array.","")],
   model:`public int[] columnMax()
{
    int[] result = new int[pixels[0].length];      // one answer per COLUMN
    for (int c = 0; c < pixels[0].length; c++)     // column-major: columns outside
    {
        int max = pixels[0][c];                    // start at the top of this column
        for (int r = 1; r < pixels.length; r++)    // go down the rows
        {
            if (pixels[r][c] > max)
            {
                max = pixels[r][c];
            }
        }
        result[c] = max;
    }
    return result;
}`}],
 mistakes:["Making the result the length of a column instead of the number of columns.","Starting max at 0."],
 ctx:`static class Image { int[][] pixels; Image(int[][] p){ pixels=p; } /*M*/ }`,
 test:`ck(Arrays.toString(new Image(new int[][]{{3,9,1},{7,2,1},{5,4,8}}).columnMax()),"[7, 9, 8]"); ck(Arrays.toString(new Image(new int[][]{{-3,-9}}).columnMax()),"[-3, -9]");`});

F.push({type:4,id:"nbr",title:"GameBoard: countNeighbors",
 intro:`<pre class="code">public class GameBoard
{
    private String[][] board;   // each element is "X", "O" or "-"

    /** Returns how many of the up to 8 squares touching (r, c) contain target.
     *  The square (r, c) itself is not counted. Squares off the board are ignored. */
    public int countNeighbors(int r, int c, String target)
    { /* to be implemented */ }
}</pre><p>Example: for a corner square, only 3 neighbors exist.</p>`,
 parts:[{id:"m",points:6,prompt:"Write countNeighbors.",sig:"public int countNeighbors(int r, int c, String target)",
   pts:[pt("Visits the 3×3 block","Loops over rows r − 1 to r + 1 and columns c − 1 to c + 1.",""),pt("Skips the center","Does not count (r, c) itself.",""),pt("Checks row bounds","Ignores rows < 0 or ≥ board.length.","ArrayIndexOutOfBoundsException at an edge."),pt("Checks column bounds","Ignores columns < 0 or ≥ board[0].length.",""),pt("Compares with equals","board[i][j].equals(target).","=="),pt("Counts and returns","Returns the count.","")],
   model:`public int countNeighbors(int r, int c, String target)
{
    int count = 0;
    for (int i = r - 1; i <= r + 1; i++)                       // rows above, same, below
    {
        for (int j = c - 1; j <= c + 1; j++)                   // columns left, same, right
        {
            boolean inside = i >= 0 && i < board.length && j >= 0 && j < board[0].length;
            boolean center = (i == r && j == c);
            if (inside && !center && board[i][j].equals(target))   // short-circuit: checks bounds BEFORE indexing
            {
                count++;
            }
        }
    }
    return count;
}`}],
 mistakes:["Indexing before checking the bounds (crashes on edges).","Counting the center square."],
 ctx:`static class GameBoard { String[][] board; GameBoard(String[][] b){ board=b; } /*M*/ }`,
 test:`String[][] b={{"X","O","X"},{"X","X","-"},{"O","X","X"}}; GameBoard g=new GameBoard(b); ck(g.countNeighbors(1,1,"X"),5); ck(g.countNeighbors(0,0,"X"),2); ck(g.countNeighbors(2,2,"O"),0); ck(g.countNeighbors(0,2,"-"),1);`});

F.push({type:4,id:"weeks",title:"TempLog: hottestWeek",
 intro:`<pre class="code">public class TempLog
{
    private double[][] temps;   // temps[w][d] is the temperature on day d of week w

    /** Returns the week number with the highest average temperature.
     *  On a tie, returns the earliest week. */
    public int hottestWeek()
    { /* to be implemented */ }
}</pre>`,
 parts:[{id:"m",points:6,prompt:"Write hottestWeek.",sig:"public int hottestWeek()",
   pts:[pt("Traverses weeks","Outer loop over all weeks.",""),pt("Traverses days","Inner loop over all days of the week.",""),pt("Sums a week","Adds the week's temperatures (reset for each week).",""),pt("Average","Divides by the number of days in that week (temps[w].length).","Divides by temps.length."),pt("Tracks the best week","Keeps the week with the largest average, strictly greater for ties.",""),pt("Returns","Returns the week number.","")],
   model:`public int hottestWeek()
{
    int best = 0;
    double bestAvg = 0;
    for (int w = 0; w < temps.length; w++)
    {
        double sum = 0;                            // reset for every week
        for (int d = 0; d < temps[w].length; d++)
        {
            sum += temps[w][d];
        }
        double avg = sum / temps[w].length;        // days in THIS week
        if (w == 0 || avg > bestAvg)               // week 0 sets the first best; then strictly greater
        {
            bestAvg = avg;
            best = w;
        }
    }
    return best;
}`}],
 mistakes:["Dividing by the number of weeks instead of days.","Starting bestAvg at 0 without using week 0 (fails when every average is negative)."],
 ctx:`static class TempLog { double[][] temps; TempLog(double[][] t){ temps=t; } /*M*/ }`,
 test:`ck(new TempLog(new double[][]{{50,60},{70,71},{80,61}}).hottestWeek(),1); ck(new TempLog(new double[][]{{-5,-6},{-9,-9}}).hottestWeek(),0);`});

F.push({type:4,id:"sym",title:"Matrix: isSymmetric",
 intro:`<pre class="code">public class Matrix
{
    private int[][] m;   // a square array: m.length == m[0].length

    /** Returns true if m[r][c] == m[c][r] for every r and c; false otherwise. */
    public boolean isSymmetric()
    { /* to be implemented */ }
}</pre><p>Example: {{1, 7}, {7, 2}} → true; {{1, 2}, {3, 1}} → false.</p>`,
 parts:[{id:"m",points:6,prompt:"Write isSymmetric.",sig:"public boolean isSymmetric()",
   pts:[pt("Traverses rows","Loops over every row.",""),pt("Traverses columns","Loops over every column (or just c > r).",""),pt("Compares mirror elements","Compares m[r][c] with m[c][r].","Compares m[r][c] with m[r][c]."),pt("Returns false early","Returns false when a pair does not match.",""),pt("Returns true at the end","Returns true only after checking all pairs.","Returns true inside the loop."),pt("No bounds errors","Stays inside the array.","")],
   model:`public boolean isSymmetric()
{
    for (int r = 0; r < m.length; r++)
    {
        for (int c = r + 1; c < m.length; c++)     // each pair once: above the diagonal
        {
            if (m[r][c] != m[c][r])                // its mirror across the diagonal differs
            {
                return false;
            }
        }
    }
    return true;                                   // every pair matched
}`}],
 mistakes:["Returning true inside the loop after the first matching pair.","Comparing an element with itself."],
 ctx:`static class Matrix { int[][] m; Matrix(int[][] a){ m=a; } /*M*/ }`,
 test:`ck(new Matrix(new int[][]{{1,7},{7,2}}).isSymmetric(),true); ck(new Matrix(new int[][]{{1,2},{3,1}}).isSymmetric(),false); ck(new Matrix(new int[][]{{1,2,3},{2,5,6},{3,6,9}}).isSymmetric(),true); ck(new Matrix(new int[][]{{1,2,3},{2,5,6},{3,0,9}}).isSymmetric(),false);`});

const TYPES={1:"Methods and Control Structures",2:"Class Design",3:"Data Analysis with ArrayList",4:"2D Array"};
const UNITOF={1:[1,2],2:[3],3:[4],4:[4]};
window.CSFRQ={F,TYPES,UNITOF};
})();
