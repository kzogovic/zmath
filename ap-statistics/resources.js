const BN = s => "https://www.barnesandnoble.com/s/" + encodeURIComponent(s);
const RESOURCES = {
  books: {
    callout: `<b>Heads up:</b> AP Statistics was revised for 2026–27 (first new exam May 2027): nine units became five, and the old Question 6 investigative task is gone. When you buy a prep book, get the <b>2027 edition or newer</b>. Free textbooks below still cover all the content.`,
    groups: [
      {title:"Main textbooks", items:[
        {t:"The Practice of Statistics for the AP® Course", by:"Starnes & Tabor · 7th ed. · BFW", u:"https://www.bfwpub.com/high-school/us/product/The-Practice-of-Statistics-for-the-AP-Course/p/1319409342", p:"paid", d:"The best-selling AP Stats text (\"TPS\"). Written by AP Readers in exam language; publisher has resources for the revised 2026–27 CED."},
        {t:"Stats: Modeling the World, AP® Edition", by:"Bock, Bullard, Velleman & De Veaux · 6th ed. · Savvas", u:"https://www.savvas.com/solutions/ap-honors-electives/ap-programs/math/stats/stats-modeling-the-world-ap-edition", p:"paid", d:"Very readable, uses the Think–Show–Tell method that matches how FRQs are graded."},
        {t:"Statistics and Probability with Applications", by:"Starnes, Tabor & Wilcox · 5th ed.", u:"https://store.macmillanlearning.com/us/product/Statistics-and-Probability-with-Applications-High-School/p/1319535798", p:"paid", d:"Gentler on-level version of TPS; good for students who need a slower first pass."}
      ]},
      {title:"Free & open textbooks", items:[
        {t:"Advanced High School Statistics (OpenIntro)", by:"Dorazio, Diez, Barr & Çetinkaya-Rundel · 4th ed. 2026", u:"https://www.openintro.org/book/ahss/", p:"free", d:"Free PDF written for AP Stats, with videos, an inference guide and a CED alignment chart."},
        {t:"AHSS: interactive online version", by:"Runestone Academy", u:"https://runestone.academy/ns/books/published/ahss3rd/preface.html", p:"free", d:"The same OpenIntro book as a web page with inline exercises; works well on phones."},
        {t:"Online Statistics Education (Rice University)", by:"David Lane et al. · public domain", u:"https://onlinestatbook.com/2/", p:"free", d:"Free online book with short videos, 30+ simulations and real case studies. The CI and sampling-distribution demos are excellent."},
        {t:"Introductory Statistics 2e (OpenStax)", by:"OpenStax · Rice University", u:"https://openstax.org/details/books/introductory-statistics-2e", p:"free", d:"Free college intro-stats text. Good for extra worked examples and practice problems."}
      ]},
      {title:"Exam-prep books", items:[
        {t:"Barron's AP Statistics Premium", by:"Martin Sternstein", u:BN("Barron's AP Statistics Premium"), p:"paid", d:"Deepest content review and the largest question bank; 9 practice tests. Dense, so use it as a reference."},
        {t:"Princeton Review AP Statistics Premium Prep", by:"The Princeton Review", u:BN("Princeton Review AP Statistics Premium Prep"), p:"paid", d:"The most readable prep book, with clear templates for writing FRQ answers."},
        {t:"5 Steps to a 5: AP Statistics", by:"McGraw Hill", u:BN("5 Steps to a 5 AP Statistics"), p:"paid", d:"Built around study calendars; great for structured review in the final months."},
        {t:"Strive for a 5: Preparing for the AP® Statistics Exam", by:"Starnes & Tabor · BFW", u:"https://store.macmillanlearning.com/Us/product/Strive-for-a-5-Preparing-for-the-AP-Statistics-Exam/p/1319209904", p:"paid", d:"Workbook companion to The Practice of Statistics."}
      ]},
      {title:"Reading for fun (and for real life)", items:[
        {t:"Naked Statistics", by:"Charles Wheelan", u:BN("Naked Statistics Wheelan"), p:"paid", d:"Funny, plain-English tour of the big ideas: the CLT, regression, inference, and polling."},
        {t:"The Art of Statistics", by:"David Spiegelhalter", u:BN("The Art of Statistics Spiegelhalter"), p:"paid", d:"How statisticians actually learn from data, told through real cases."},
        {t:"How to Lie with Statistics", by:"Darrell Huff", u:BN("How to Lie with Statistics Huff"), p:"paid", d:"Short classic on misleading graphs, biased samples, and sneaky averages. Pairs with Units 1 and 3."},
        {t:"The Data Detective", by:"Tim Harford", u:BN("The Data Detective Harford"), p:"paid", d:"Ten rules for making sense of statistics in the news."},
        {t:"The Signal and the Noise", by:"Nate Silver", u:BN("The Signal and the Noise Silver"), p:"paid", d:"Why most predictions fail, from weather to elections to baseball."},
        {t:"The Lady Tasting Tea", by:"David Salsburg", u:BN("The Lady Tasting Tea Salsburg"), p:"paid", d:"History of the people who invented the methods you use in Units 6–9."},
        {t:"Spurious Correlations", by:"Tyler Vigen", u:BN("Spurious Correlations Tyler Vigen"), p:"paid", d:"Hilarious graphs of things that correlate but obviously aren't related. Perfect for correlation vs causation."},
        {t:"How Not to Be Wrong", by:"Jordan Ellenberg", u:BN("How Not to Be Wrong Ellenberg"), p:"paid", d:"Math and statistical thinking in everyday life: regression to the mean, the lottery, and more."},
        {t:"The Cartoon Guide to Statistics", by:"Larry Gonick & Woollcott Smith", u:BN("Cartoon Guide to Statistics"), p:"paid", d:"The whole course in comic form. Surprisingly good for a quick visual review."}
      ]}
    ]
  },
  calc: {
    callout: `<b>Exam rule:</b> the digital AP Stats exam has Desmos built into Bluebook, and you may also bring an approved handheld graphing calculator. On free-response questions, never write calculator syntax alone (e.g. <i>normalcdf(…)</i>): name the distribution, label the parameters, and state the answer in context.`,
    groups: [
      {title:"Desmos (built into the exam)", items:[
        {t:"Math Medic Ultimate Desmos Guide for AP Stats", by:"Math Medic · PDF + video", u:"https://mathmedic.com/?p=9614", p:"free", d:"Only the Desmos functions you need for the exam, each with how to show work for full credit."},
        {t:"Desmos Help: Statistics", by:"Desmos official", u:"https://help.desmos.com/hc/en-us/articles/4405633253389-Statistics", p:"free", d:"Official guide to stats in Desmos: lists, boxplots, regression, distributions, inference tests and simulations."},
        {t:"Desmos is coming to the AP Stats exam", by:"Bob Lochel on Math Medic", u:"https://mathmedic.com/blog/desmos-is-coming-to-the-2026-ap-statistics-exam/", p:"free", d:"Four ways to use Desmos day to day, unit by unit."},
        {t:"Calculator policy for digital AP exams", by:"AP Central", u:"https://apcentral.collegeboard.org/help-center/what-calculator-policy-digital-ap-exams", p:"free", d:"The official rule on Desmos in Bluebook and handheld calculators."}
      ]},
      {title:"TI-84 / TI-Nspire", items:[
        {t:"Calculator Functions for the AP Stats Exam", by:"Math Medic · Word/PDF + video", u:"https://mathmedic.com/blog/calculator-functions-for-the-ap-stats-exam/", p:"free", d:"One-page list of every TI-84 command in the course and what to write for each. Includes a NumWorks version."},
        {t:"Top 6 TI-84 Functions for AP Statistics", by:"Texas Instruments", u:"https://education.ti.com/en/bulletinboard/2024/top-6-calculator-functions-ap-statistics", p:"free", d:"Regression, normal and binomial probabilities, random variables, checking conditions, inference: keystroke by keystroke."},
        {t:"6 Must-Know Functions on the TI-Nspire CX", by:"Texas Instruments", u:"https://www.education.ti.com/en/bulletinboard/categories/math", p:"free", d:"The same list for TI-Nspire users (scroll to the 2021 AP Statistics post)."},
        {t:"TI-84 Plus CE eGuide", by:"Texas Instruments · official manual", u:"https://education.ti.com/html/eguides/graphing/84plusce/en/content/home_84plusce_v6.0.HTML", p:"free", d:"Searchable official manual. See \"Working with Statistics\" for lists, plots and tests."},
        {t:"TI-84 Activity Central: Statistics", by:"Texas Instruments", u:"https://education.ti.com/en/84activitycentral/us/statistics", p:"free", d:"Free classroom activities with student worksheets in seven statistics topics."}
      ]},
      {title:"Other calculators & phone apps", items:[
        {t:"NumWorks Online Simulator", by:"NumWorks · web, iOS, Android", u:"https://www.numworks.com/simulator/", p:"free", d:"Free full version of the NumWorks graphing calculator in your browser; approved for the AP exam as a handheld."},
        {t:"GeoGebra Probability Calculator", by:"GeoGebra · web page (also in the free Calculator Suite app)", u:"https://www.geogebra.org/m/N1WBkTzz", p:"free", d:"Draws any distribution and shades the area as you set the bounds, plus a Statistics tab for z/t tests and intervals."},
        {t:"Probability Distributions app", by:"Matt Bognar · iOS", u:"https://apps.apple.com/us/app/id889106396", p:"free", d:"Shaded-area graphs and probabilities for normal, t, χ², binomial, geometric and more. Great for checking homework."},
        {t:"Probability Distributions app", by:"Matt Bognar · Android", u:"https://play.google.com/store/apps/details?id=com.mbognar.probdist", p:"free", d:"The Android version: 500k+ installs, highly rated."},
        {t:"Desmos Graphing Calculator app", by:"iOS · Android", u:"https://www.desmos.com/calculator", p:"free", d:"Same calculator as on the exam. Practice on your phone, test on Bluebook."}
      ]}
    ]
  },
  apps: {
    callout: `<b>On the exam:</b> the Desmos graphing calculator is built into the Bluebook testing app, so practice with Desmos all year even if you own a TI-84.`,
    groups: [
      {title:"Official College Board", items:[
        {t:"AP Classroom", by:"College Board", u:"https://myap.collegeboard.org", p:"free", d:"AP Daily videos for every topic, plus the progress checks your teacher assigns. Sign in with your College Board account."},
        {t:"AP Statistics: student page", by:"AP Students", u:"https://apstudents.collegeboard.org/courses/ap-statistics", p:"free", d:"Course overview, exam format, formula sheet, and exam-day info."},
        {t:"AP Statistics: course page & revised CED", by:"AP Central", u:"https://apcentral.collegeboard.org/courses/ap-statistics", p:"free", d:"The official Course and Exam Description for the revised 2026–27 course."},
        {t:"Past exam questions", by:"AP Central", u:"https://apcentral.collegeboard.org/courses/ap-statistics/exam/past-exam-questions", p:"free", d:"Released FRQs with scoring guidelines and sample responses. Appendix C sorts them by unit."},
        {t:"Bluebook", by:"College Board · Windows, Mac, iPad, Chromebook", u:"https://bluebook.collegeboard.org", p:"free", d:"The app the exam is given in. Install it early and take the practice test so nothing is new on test day."},
        {t:"Desmos Graphing Calculator", by:"Web · iOS · Android", u:"https://www.desmos.com/calculator", p:"free", d:"The calculator built into the exam. It does stats summaries, regression, normal/t/χ²/binomial distributions, and tests."}
      ]},
      {title:"Free lessons & videos", items:[
        {t:"Khan Academy: AP Statistics", by:"Web · iOS · Android", u:"https://www.khanacademy.org/math/ap-statistics", p:"free", d:"Short videos and auto-graded practice for every topic, with unit tests and mastery tracking."},
        {t:"Math Medic (Stats Medic): AP Statistics", by:"Luke Wilcox & team", u:"https://mathmedic.com/blog/category/ap-statistics/", p:"free", d:"Ultimate Inference and Interpretations guides, flash cards, review circuits, and exam predictions. Aligned to the new CED."},
        {t:"What's changing in AP Stats for 2026–27", by:"Math Medic", u:"https://mathmedic.com/blog/whats-changing-in-ap-statistics-for-the-26-27-school-year/", p:"free", d:"Short breakdown of the new 5-unit course and exam format."},
        {t:"Skew The Script", by:"Nonprofit · free AP Stats curriculum", u:"https://skewthescript.org", p:"free", d:"Lessons on real questions (Is college worth it? Are EVs greener?), with slides, videos and data."},
        {t:"Flipped Math: AP Statistics", by:"flippedmath.com", u:"https://www.flippedmath.com", p:"free", d:"Lesson-by-lesson videos with guided notes and practice."},
      ]},
      {title:"YouTube & podcasts", items:[
        {t:"Crash Course Statistics", by:"YouTube · 44 episodes", u:"https://www.youtube.com/playlist?list=PL8dPuuaLjXtNM_Y-bUAhblSAdWRnmBUcr", p:"free", d:"Fast, fun ~12-minute episodes. Great for seeing the big picture before a unit."},
        {t:"StatQuest with Josh Starmer", by:"YouTube", u:"https://www.youtube.com/@statquest", p:"free", d:"Famously clear (and silly) explanations of histograms, the normal distribution, p-values, R² and more. Look for the Statistics Fundamentals playlist."},
        {t:"More or Less", by:"BBC podcast · Tim Harford", u:"https://podcasts.apple.com/podcast/id267300884", p:"free", d:"Short episodes that check the numbers in the news. Great for spotting bias and bad statistics."},
        {t:"Stats + Stories", by:"Podcast · Miami University", u:"https://statsandstories.net", p:"free", d:"Conversations about the statistics behind news stories, sports, health and more."}
      ]},
      {title:"Blogs & fun extras", items:[
        {t:"Math Coach Blog: Statistics", by:"Bob Lochel · AP Reader & Desmos Fellow", u:"https://mathcoachblog.com/category/statistics-2/", p:"free", d:"Classroom-tested AP Stats activities, Desmos ideas and notes from the AP Reading."},
        {t:"Math Medic Blog", by:"Math Medic", u:"https://mathmedic.com/blog/category/ap-statistics/", p:"free", d:"New posts every month: exam tips, FRQ strategy, early solutions to each year's FRQs."},
        {t:"Spurious Correlations", by:"Tyler Vigen", u:"https://www.tylervigen.com/spurious-correlations", p:"free", d:"Ridiculous real correlations (cheese eaten vs. bedsheet deaths). The best warm-up for \"correlation isn't causation.\""},
        {t:"CAUSEweb Fun Collection", by:"CAUSE · ASA", u:"https://www.causeweb.org/fun", p:"free", d:"Hundreds of statistics cartoons, songs, jokes and quotes, sorted by topic. Great for slides and warm-ups."},
        {t:"CAUSEweb Resources", by:"Consortium for the Advancement of Undergraduate Statistics Education", u:"https://www.causeweb.org/cause/", p:"free", d:"Searchable library of activities, data sets and webinars for teaching intro stats."},
        {t:"FlowingData", by:"Nathan Yau", u:"https://flowingdata.com", p:"free", d:"Beautiful data visualizations and how they were made. Good for \"describe what you see\" practice."}
      ]},
      {title:"Applets & simulations", items:[
        {t:"StapPlet", by:"Josh Tabor (TPS co-author)", u:"https://www.stapplet.com", p:"free", d:"Applets for graphs, distributions, simulations and inference, made to match AP notation. A full calculator replacement."},
        {t:"Rossman/Chance Applets", by:"Cal Poly", u:"https://www.rossmanchance.com/applets/", p:"free", d:"Classic simulations: sampling distributions, CI coverage, randomization tests, power."},
        {t:"StatKey", by:"Lock⁵", u:"https://www.lock5stat.com/StatKey/", p:"free", d:"Bootstrap intervals and randomization tests. Shows why inference works."},
        {t:"Art of Stat Web Apps", by:"Agresti, Franklin & Klingenberg", u:"https://artofstat.com/web-apps", p:"free", d:"Clean apps for every procedure in the course: explore, then check your hand calculations."},
        {t:"Seeing Theory", by:"Brown University", u:"https://seeing-theory.brown.edu", p:"free", d:"Beautiful interactive visuals of probability, distributions and the CLT."},
        {t:"Matt Bognar's Probability Applets", by:"University of Iowa", u:"https://homepage.divms.uiowa.edu/~mbognar/", p:"free", d:"Simple applets for every distribution plus inference. Also links to his free phone app (see Calculators)."},
        {t:"Guess the Correlation", by:"Game", u:"https://www.guessthecorrelation.com", p:"free", d:"Retro arcade game: estimate r from a scatterplot. Builds Unit 2 intuition fast."}
      ]},
      {title:"Real data for projects", items:[
        {t:"Gapminder Tools", by:"Gapminder Foundation", u:"https://www.gapminder.org/tools/", p:"free", d:"Animated world data on health, income and population. Perfect for describing scatterplots."},
        {t:"CODAP", by:"Concord Consortium", u:"https://codap.concord.org", p:"free", d:"Free drag-and-drop data analysis in the browser, with built-in sample data sets."},
        {t:"What's Going On in This Graph?", by:"New York Times Learning Network", u:"https://www.nytimes.com/column/whats-going-on-in-this-graph", p:"free", d:"Weekly real graph from the news with discussion prompts."},
        {t:"Census at School", by:"American Statistical Association", u:"https://ww2.amstat.org/censusatschool/", p:"free", d:"Students answer a survey, then sample real responses from students nationwide."},
        {t:"Our World in Data", by:"Oxford / Global Change Data Lab", u:"https://ourworldindata.org", p:"free", d:"Downloadable charts and data sets on almost any topic."}
      ]},
      {title:"Extra practice (paid)", items:[
        {t:"Albert: AP Statistics", by:"albert.io", u:"https://www.albert.io/ap-statistics", p:"paid", d:"Large bank of AP-style questions with explanations; many schools have licenses."},
        {t:"Fiveable: AP Stats", by:"fiveable.me", u:"https://library.fiveable.me/ap-stats", p:"paid", d:"Unit study guides and key-term reviews (some free), plus paid practice and cram sessions."}
      ]}
    ]
  }
};
const resCount = id => RESOURCES[id].groups.reduce((n,g)=>n+g.items.length,0);
function resSection(id, term){
  const R = RESOURCES[id];
  const hit = it => !term || (it.t+" "+it.by+" "+it.d).toLowerCase().includes(term);
  const groups = R.groups.map(g=>({...g, items:g.items.filter(hit)})).filter(g=>g.items.length);
  if(!groups.length) return "";
  const cards = groups.map(g=>`<div class="rescard"><h3>${esc(g.title)}</h3><ul>${g.items.map(it=>`<li><a href="${it.u}" target="_blank" rel="noopener">${esc(it.t)}</a><span class="price ${it.p}">${it.p}</span><br><span class="by">${esc(it.by)}</span><p>${esc(it.d)}</p></li>`).join("")}</ul></div>`).join("");
  return (term?"":`<div class="callout">${R.callout}</div>`) + `<div class="resgrid">${cards}</div>`;
}

// Beyond AP: college-level probability & statistics (Mrs. Zogovic)
RESOURCES._beyond = {
  callout: `<b>Going further:</b> these are free, college-level resources for students who want more probability and statistics than the AP course covers. Most need algebra; some (MIT, Harvard, Penn State) use calculus.`,
  groups: [
    {title:"Free college courses", items:[
      {t:"MIT 18.05: Introduction to Probability and Statistics", by:"Jeremy Orloff · MIT OpenCourseWare (Spring 2022)", u:"https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/", p:"free", d:"Full course: readings, problem sets with solutions and exams. Counting, Bayes, distributions, CLT, Bayesian and frequentist inference, regression."},
      {t:"Harvard Stat 110: Probability", by:"Joe Blitzstein · Harvard", u:"https://stat110.hsites.harvard.edu/", p:"free", d:"One of the most famous probability courses: lecture videos, handouts, practice exams and a free online version of the textbook."},
      {t:"Penn State STAT 414: Introduction to Probability Theory", by:"Penn State Eberly College of Science", u:"https://online.stat.psu.edu/stat414/", p:"free", d:"Complete online course notes with worked examples: counting, discrete and continuous distributions, joint distributions, moment-generating functions."}
    ]},
    {title:"Free textbooks", items:[
      {t:"Introduction to Probability, Statistics, and Random Processes", by:"Hossein Pishro-Nik · probabilitycourse.com", u:"https://www.probabilitycourse.com/", p:"free", d:"A complete college textbook online, with solved problems and videos. Great for Poisson, exponential, joint distributions and Bayesian statistics."},
      {t:"Introduction to Modern Statistics (OpenIntro)", by:"Çetinkaya-Rundel & Hardin · 2nd ed.", u:"https://openintro-ims.netlify.app/", p:"free", d:"College intro stats with a modern twist: multiple and logistic regression and lots of simulation-based inference (bootstrap and randomization tests)."},
      {t:"An Introduction to Statistical Learning", by:"James, Witten, Hastie & Tibshirani", u:"https://www.statlearning.com/", p:"free", d:"The classic gentle introduction to machine learning: regression, classification, resampling, trees. Free PDF, R and Python editions."},
      {t:"Think Stats", by:"Allen B. Downey · Green Tea Press", u:"https://greenteapress.com/thinkstats/", p:"free", d:"Probability and statistics learned by writing Python code on real data. Free to read online."},
      {t:"Think Bayes", by:"Allen B. Downey", u:"https://github.com/AllenDowney/ThinkBayes2", p:"free", d:"An introduction to Bayesian statistics using simple Python programs instead of heavy math."}
    ]},
    {title:"See it, play with it", items:[
      {t:"Seeing Theory", by:"Brown University", u:"https://seeing-theory.brown.edu/", p:"free", d:"Beautiful interactive visualizations: basic and compound probability, distributions, frequentist and Bayesian inference, regression."},
      {t:"StatKey", by:"Lock family · lock5stat.com", u:"https://www.lock5stat.com/StatKey/", p:"free", d:"Free web apps for bootstrap confidence intervals and randomization tests, plus theoretical distributions (normal, t, χ², F)."},
      {t:"Rossman/Chance Applet Collection", by:"Beth Chance & Allan Rossman · Cal Poly", u:"https://www.rossmanchance.com/applets/index2021.html", p:"free", d:"Applets for simulation, sampling distributions, Monty Hall and more."},
      {t:"3Blue1Brown: Bayes' theorem", by:"Grant Sanderson", u:"https://www.3blue1brown.com/lessons/bayes-theorem-quick", p:"free", d:"Visual lessons on Bayes' theorem and the medical-test paradox; follow the links to the full Bayes series."}
    ]},
    {title:"Free statistics software", items:[
      {t:"JASP", by:"University of Amsterdam", u:"https://jasp-stats.org/", p:"free", d:"Free, point-and-click statistics program (like SPSS): t-tests, ANOVA, regression, contingency tables, plus Bayesian versions of each."},
      {t:"R", by:"The R Project", u:"https://www.r-project.org/", p:"free", d:"The free programming language most statisticians use. Pair it with the free textbooks above."}
    ]}
  ]
};
