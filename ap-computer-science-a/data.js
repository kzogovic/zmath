/* Book data: units, released FRQs, resources. Posters list is injected by build (posters.js). */
const UNITS = [
  {id:"unit-1", chapter:"Chapter I", short:"Unit 1", name:"Unit 1: Using Objects and Methods", sub:"Types, expressions, casting, Strings, methods, the Math class, objects and references · 15–25% of the exam"},
  {id:"unit-2", chapter:"Chapter II", short:"Unit 2", name:"Unit 2: Selection and Iteration", sub:"Boolean expressions, if statements, while and for loops, standard algorithms, nested loops · 25–35% of the exam"},
  {id:"unit-3", chapter:"Chapter III", short:"Unit 3", name:"Unit 3: Class Creation", sub:"Writing classes: instance variables, constructors, methods, this, static, scope · 10–18% of the exam"},
  {id:"unit-4", chapter:"Chapter IV", short:"Unit 4", name:"Unit 4: Data Collections", sub:"Arrays, text files, wrapper classes, ArrayList, 2D arrays, searching, sorting, recursion · 30–40% of the exam"},
  {id:"frq", chapter:"Appendix A", short:"FRQ Toolkit", name:"FRQ Toolkit: The Four Free-Response Questions", sub:"One original practice problem with a full solution for each FRQ type, plus strategy and the Java Quick Reference explained"},
  {id:"beyond", chapter:"Appendix B", short:"Beyond AP", name:"Beyond AP (Enrichment)", sub:"Inheritance, interfaces, Big-O, more data structures and exceptions. Not on the AP exam, but in every college intro course"},
  {id:"released", chapter:"Appendix C", short:"Released FRQs", name:"Released AP Free-Response Questions (2012–2026)", sub:"Every released FRQ sorted by unit, with links to the questions and scoring guidelines"},
  {id:"practice", chapter:"Appendix D", short:"Practice", name:"Practice: Trace the Code & Study Cards", sub:"Fresh code-tracing questions every time, checked against real Java, plus vocabulary cards for each unit"},
  {id:"books", chapter:"Appendix E", short:"Books", name:"Books & Reading", sub:"Prep books for the 2026+ exam, free Java textbooks, and computer science books worth reading for fun"},
  {id:"apps", chapter:"Appendix F", short:"Sites & Tools", name:"Websites, Practice Sites & Coding Tools", sub:"Official College Board pages, free practice, videos, and the editors you can write Java in"}
];

/* type: 1 Methods & Control, 2 Class Design, 3 Array/ArrayList, 4 2D Array.  flag: note about old content */
const APC = "https://apcentral.collegeboard.org/media/pdf/";
const OFFICIAL = {
  2026:{qu:APC+"ap26-frq-computer-science-a.pdf", sg:APC+"ap26-sg-computer-science-a.pdf"},
  2025:{qu:APC+"ap25-frq-computer-science-a.pdf", sg:APC+"ap25-sg-computer-science-a.pdf", sa:q=>APC+`ap25-apc-computer-science-a-q${q}.pdf`},
  2024:{qu:APC+"ap24-frq-comp-sci-a.pdf", sg:APC+"ap24-sg-computer-science-a.pdf", sa:q=>APC+`ap24-apc-computer-science-a-q${q}.pdf`},
  2023:{qu:APC+"ap23-frq-comp-sci-a.pdf", sg:APC+"ap23-sg-computer-science-a.pdf", sa:q=>APC+`ap23-apc-computer-science-a-q${q}.pdf`}
};
const ARCHIVE = "https://www.apcsexamprep.com/pages/ap-csa-frq-archive";
const SME = "https://www.savemyexams.com/ap/computer-science/college-board/a/past-papers/";
const SOLS = "https://compsci.rocks/ap-computer-science-free-response-solutions/";
const INH = "Uses inheritance or an interface, which was removed from the course in 2025.";
const GW = "GridWorld case study question: GridWorld is no longer part of the course.";
const F = (y,q,t,top,u,flag)=>({y,q,t,top,u,flag});
const FRQS = [
  F(2026,1,"Account","Constructor that loops with isAvailable to pick a username; String method that removes each hyphen and the character before it",["unit-2","unit-1"]),
  F(2026,2,"Bottle","Write a complete class: constructor and updateAmount(double)",["unit-3"]),
  F(2026,3,"Attendance","ArrayList data analysis: moreHistoryThanMathAbsences",["unit-4"]),
  F(2026,4,"GameBoard","2D array: getPointsForRow(int targetRow)",["unit-4"]),
  F(2025,1,"DogWalker","walkDogs(hour) and dogWalkShift(start, end): loops calling given methods",["unit-2"]),
  F(2025,2,"SignedText","Complete class: constructor, getSignature, addSignature (String work)",["unit-3","unit-1"]),
  F(2025,3,"Round","Constructor builds an ArrayList from a String[]; buildMatches pairs competitors",["unit-4"]),
  F(2025,4,"SumOrSameGame","2D array: fill with random values; clearPair searches rows at or below",["unit-4"]),
  F(2024,1,"Feeder","Math.random thresholds; simulateOneDay and simulateManyDays",["unit-2","unit-1"]),
  F(2024,2,"Scoreboard","Complete class: two teams, recordPlay, getScore",["unit-3"]),
  F(2024,3,"WordChecker","ArrayList of Strings: isWordChain, createList with substring",["unit-4","unit-1"]),
  F(2024,4,"GridPath","2D array of Locations: getNextLoc and sumPath with bounds checks",["unit-4"]),
  F(2023,1,"AppointmentBook","findFreeBlock and makeAppointment: loops over minutes in a period",["unit-2"]),
  F(2023,2,"Sign","Complete class: numberOfLines and getLines with substring",["unit-3","unit-1"]),
  F(2023,3,"WeatherData","ArrayList of Double: cleanData removes values; longestHeatWave",["unit-4"]),
  F(2023,4,"BoxOfCandy","2D array of Candy objects: moveCandyToFirstRow, removeNextByFlavor",["unit-4"]),
  F(2022,1,"Game (Level)","getScore and playManyTimes: conditionals and a max loop",["unit-2"]),
  F(2022,2,"Textbook","Subclass of Book: constructor with super, getBookInfo, canSubstituteFor",["unit-3","beyond"],INH),
  F(2022,3,"ReviewAnalysis","Array of Review: getAverageRating; collectComments builds an ArrayList",["unit-4"]),
  F(2022,4,"Data","2D array: repopulate with rules; countIncreasingCols",["unit-4"]),
  F(2021,1,"WordMatch","scoreGuess counts substring matches; findBetterGuess compares",["unit-2","unit-1"]),
  F(2021,2,"CombinedTable","Complete class built from two SingleTable objects",["unit-3"]),
  F(2021,3,"ClubMembers","ArrayList of MemberInfo: addMembers, removeMembers returns graduates",["unit-4"]),
  F(2021,4,"ArrayResizer","2D array: isNonZeroRow; resize copies rows with no zeros",["unit-4"]),
  F(2019,1,"APCalendar","numberOfLeapYears and dayOfWeek using given helper methods",["unit-2"]),
  F(2019,2,"StepTracker","Complete class: active days, average steps",["unit-3"]),
  F(2019,3,"Delimiters","ArrayList of Strings: getDelimitersList, isBalanced",["unit-4"]),
  F(2019,4,"LightBoard","2D boolean array: constructor with Math.random; evaluateLight counts a column",["unit-4"]),
  F(2018,1,"FrogSimulation","simulate and runSimulations: loops with a given hopDistance method",["unit-2"]),
  F(2018,2,"WordPairList","Constructor builds an ArrayList of WordPair from an array; numMatches",["unit-4"]),
  F(2018,3,"CodeWordChecker","Class that implements the StringChecker interface",["unit-3","beyond"],INH),
  F(2018,4,"ArrayTester","getColumn from a 2D array; isLatin uses helper methods",["unit-4"]),
  F(2017,1,"Digits","Constructor fills an ArrayList with digits (% and /); isStrictlyIncreasing",["unit-4","unit-2"]),
  F(2017,2,"MultPractice","Class that implements the StudyPractice interface",["unit-3","beyond"],INH),
  F(2017,3,"Phrase","String methods: replaceNthOccurrence, findLastOccurrence",["unit-1","unit-2"]),
  F(2017,4,"Successors","2D array: findPosition; getSuccessorArray of Position objects",["unit-4"]),
  F(2016,1,"RandomStringChooser","Class that returns random Strings without repeats; part (b) is a subclass",["unit-3","unit-4","beyond"],INH),
  F(2016,2,"LogMessage / SystemLog","String parsing in a constructor; containsWord; removeMessages from an ArrayList",["unit-1","unit-4"]),
  F(2016,3,"Crossword","2D array: toBeLabeled; constructor builds a grid of Square objects",["unit-4"]),
  F(2016,4,"StringFormatter","ArrayList of words: totalLetters, basicGapWidth, format",["unit-4","unit-1"]),
  F(2015,1,"DiverseArray","arraySum, rowSums of a 2D array, isDiverse",["unit-4"]),
  F(2015,2,"HiddenWord","Complete class: getHint compares two Strings letter by letter",["unit-3","unit-1"]),
  F(2015,3,"SparseArray","ArrayList of entries: getValueAt, removeColumn",["unit-4"]),
  F(2015,4,"NumberGroup","Interface, a Range class, and MultipleGroups",["unit-3","beyond"],INH),
  F(2014,1,"Word scrambling (scrambleWord)","scrambleWord swaps letters; scrambleOrRemove changes an ArrayList",["unit-1","unit-4"]),
  F(2014,2,"Director","GridWorld: a Rock subclass",["beyond"],GW),
  F(2014,3,"SeatingChart","Constructor fills a 2D array from an ArrayList; removeAbsentStudents",["unit-4"]),
  F(2014,4,"Trio","Class that implements the MenuItem interface",["unit-3","beyond"],INH),
  F(2013,1,"MusicDownloads","ArrayList of DownloadInfo: getDownloadInfo, updateDownloads",["unit-4"]),
  F(2013,2,"TokenPass","Constructor with Math.random; distributeCurrentPlayerTokens around an array",["unit-4","unit-3"]),
  F(2013,3,"GridWorldUtilities / JumpingCritter","GridWorld: getEmptyLocations and a Critter subclass",["beyond"],GW),
  F(2013,4,"SkyView","Constructor fills a 2D array in a zigzag; getAverage of a section",["unit-4"]),
  F(2012,1,"ClimbingClub","ArrayList of ClimbInfo: addClimb (unsorted and sorted), distinctPeakNames",["unit-4"]),
  F(2012,2,"RetroBug","GridWorld: a Bug subclass that can restore its state",["beyond"],GW),
  F(2012,3,"HorseBarn","Array of Horse objects: findHorseSpace, consolidate",["unit-4"]),
  F(2012,4,"GrayImage","2D array of pixels: countWhitePixels, processImage",["unit-4"])
];

const BN = s => "https://www.barnesandnoble.com/s/" + encodeURIComponent(s);
const RESOURCES = {
  books: {
    callout: `<b>Heads up:</b> AP Computer Science A was revised for 2025–26: ten units became four and inheritance was removed. Buy a prep book labeled for the <b>2026 exam or newer</b>.`,
    groups: [
      {title:"Exam-prep books (2026 exam)", items:[
        {t:"AP Computer Science A Premium, 13th Edition (2026)", by:"Barron's · Teukolsky & Carman", u:BN("AP Computer Science A Premium 13th Edition Barron's"), p:"paid", d:"Updated for the revised course. Full review of every unit plus 6 practice tests (3 in the book, 3 online)."},
        {t:"Princeton Review AP Computer Science A Premium Prep, 9th Edition", by:"The Princeton Review", u:BN("Princeton Review AP Computer Science A Premium Prep 9th Edition"), p:"paid", d:"Written for the new digital exam: 5 practice tests, drills after each chapter, and online flashcards."}
      ]},
      {title:"Free textbooks", items:[
        {t:"CSAwesome2 (Runestone Academy)", by:"Beryl Hoffman & the CSAwesome team", u:"https://runestone.academy/ns/books/published/csawesome2/", p:"free", d:"A free interactive AP CSA textbook organized by the four new units, with code you can run in the page and practice after every lesson."},
        {t:"Think Java, 2nd Edition", by:"Allen Downey & Chris Mayfield · Green Tea Press", u:"https://greenteapress.com/wp/think-java-2e/", p:"free", d:"A short, friendly Java book for beginners. Free PDF and HTML."},
        {t:"Introduction to Programming in Java", by:"Sedgewick & Wayne · Princeton", u:"https://introcs.cs.princeton.edu/java/home/", p:"free", d:"Princeton's intro textbook site with hundreds of short example programs. Great for recursion and arrays."}
      ]},
      {title:"Worth reading for fun", items:[
        {t:"Code: The Hidden Language of Computer Hardware and Software", by:"Charles Petzold · 2nd ed.", u:BN("Code The Hidden Language of Computer Hardware and Software Petzold"), p:"paid", d:"How a computer really works, built up from light bulbs and switches to a working processor."},
        {t:"Grokking Algorithms, 2nd Edition", by:"Aditya Bhargava", u:BN("Grokking Algorithms Bhargava"), p:"paid", d:"Illustrated guide to searching, sorting, recursion and Big-O. The best next step after Unit 4."},
        {t:"Hello World: Being Human in the Age of Algorithms", by:"Hannah Fry", u:BN("Hello World Being Human in the Age of Algorithms Hannah Fry"), p:"paid", d:"Stories about algorithms that decide things about people. Pairs with the data ethics topic (4.1)."},
        {t:"Weapons of Math Destruction", by:"Cathy O'Neil", u:BN("Weapons of Math Destruction Cathy O'Neil"), p:"paid", d:"How biased data and models cause real harm. Good for discussions about data collection."},
        {t:"Head First Java, 3rd Edition", by:"Kathy Sierra, Bert Bates & Trisha Gee", u:BN("Head First Java 3rd Edition"), p:"paid", d:"A visual, funny, deep Java book. Covers inheritance and interfaces for students heading to college CS."}
      ]}
    ]
  },
  apps: {
    callout: `<b>Exam day:</b> the 2026 exam is fully digital. You type your free-response answers into a code editor in the <b>Bluebook</b> app. Try the AP Computer Science A test preview in Bluebook before May so the editor isn't new on exam day.`,
    groups: [
      {title:"Official College Board", items:[
        {t:"AP Computer Science A course page (students)", by:"College Board", u:"https://apstudents.collegeboard.org/courses/ap-computer-science-a", p:"free", d:"Exam format, exam date, and what's on the test."},
        {t:"Course and Exam Description (CED), effective fall 2025", by:"College Board · PDF", u:"https://apcentral.collegeboard.org/media/pdf/ap-computer-science-a-course-and-exam-description.pdf", p:"free", d:"The official list of every topic in the four units, with sample questions."},
        {t:"Java Quick Reference (2026 exam)", by:"College Board · PDF", u:"https://apcentral.collegeboard.org/media/pdf/ap-computer-science-a-java-quick-reference.pdf", p:"free", d:"The reference sheet you get during the exam. See the Java Quick Reference poster in the FRQ Toolkit."},
        {t:"Past exam questions (AP Central)", by:"College Board", u:"https://apcentral.collegeboard.org/courses/ap-computer-science-a/exam/past-exam-questions", p:"free", d:"The last three years of FRQs with scoring guidelines and sample student answers."},
        {t:"AP Classroom", by:"College Board · class login", u:"https://myap.collegeboard.org/", p:"free", d:"AP Daily videos and Progress Checks for each unit (your teacher assigns these)."},
        {t:"Bluebook", by:"College Board · app", u:"https://bluebook.collegeboard.org/", p:"free", d:"The testing app. Download it and open the AP CSA test preview to practice in the real editor."}
      ]},
      {title:"Free practice and lessons", items:[
        {t:"CodingBat (Java)", by:"Nick Parlante · Stanford", u:"https://codingbat.com/java", p:"free", d:"Hundreds of short method-writing problems with instant checking. Perfect FRQ 1 practice (String, Logic, Array sections)."},
        {t:"Code.org Computer Science A", by:"Code.org", u:"https://code.org/curriculum/csa", p:"free", d:"A full free AP CSA course with lessons and projects."},
        {t:"Exercism: Java track", by:"Exercism", u:"https://exercism.org/tracks/java", p:"free", d:"Java exercises with automatic tests and optional feedback from volunteer mentors."},
        {t:"Coding with John (YouTube)", by:"John", u:"https://www.youtube.com/@CodingWithJohn", p:"free", d:"Clear 10–15 minute Java videos on loops, arrays, ArrayList, recursion and more."},
        {t:"Free-response solutions 2004–present", by:"compsci.rocks", u:SOLS, p:"free", d:"Worked solutions to past FRQs. Try each question yourself first."}
      ]},
      {title:"Coding tools and editors", items:[
        {t:"Java Visualizer (Python Tutor)", by:"pythontutor.com", u:"https://pythontutor.com/java.html", p:"free", d:"Steps through Java code one line at a time and draws variables, arrays and objects. Best tool for learning to trace."},
        {t:"BlueJ", by:"King's College London", u:"https://www.bluej.org/", p:"free", d:"A simple Java editor made for learning, with a picture of your classes and objects."},
        {t:"jGRASP", by:"Auburn University", u:"https://www.jgrasp.org/", p:"free", d:"Lightweight editor with a visual debugger that shows arrays and lists as you step."},
        {t:"Visual Studio Code + Java extensions", by:"Microsoft", u:"https://code.visualstudio.com/docs/languages/java", p:"free", d:"A full professional editor. Install the Extension Pack for Java."},
        {t:"IntelliJ IDEA Community Edition", by:"JetBrains", u:"https://www.jetbrains.com/idea/", p:"free", d:"The most popular professional Java editor. Free for students."},
        {t:"OnlineGDB Java compiler", by:"onlinegdb.com", u:"https://www.onlinegdb.com/online_java_compiler", p:"free", d:"Run Java in the browser with no install. Handy on a Chromebook."}
      ]}
    ]
  },
  _beyond: {
    groups: [
      {title:"Next steps after AP CSA", items:[
        {t:"CS50x: Introduction to Computer Science", by:"Harvard · edX", u:"https://cs50.harvard.edu/x/", p:"free", d:"Harvard's famous intro course: C, Python, SQL and web. Free online."},
        {t:"Algorithms, Part I", by:"Princeton · Coursera", u:"https://www.coursera.org/learn/algorithms-part1", p:"free", d:"Sorting, searching, stacks, queues and Big-O, taught in Java. Free to audit."},
        {t:"USACO (USA Computing Olympiad)", by:"usaco.org", u:"https://usaco.org/", p:"free", d:"Free online programming contests for high school students. Java is allowed."},
        {t:"Java SE API documentation", by:"Oracle", u:"https://docs.oracle.com/en/java/javase/21/docs/api/index.html", p:"free", d:"The official list of every Java class and method, including HashMap and ArrayDeque."}
      ]}
    ]
  }
};
