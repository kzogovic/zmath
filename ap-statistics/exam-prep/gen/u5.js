/* Unit 5 templates: Regression Analysis (+ regression sets) */
(function(){
const {mc,S,f,setR}=ZB, G=window.ZG, add=fn=>mc[5].push(fn);

/* 1. Curved relationship with r near 0 */
add(R=>{ const pts=[40,50,55,60,65,70,75,80,85,90,95,100,105,110,120].map(x=>[x,+(14.9-0.0028*(x-77)**2+R.real(-0.25,0.25,2)).toFixed(2)]); const r=S.linreg(pts.map(p=>p[0]),pts.map(p=>p[1])).r;
 return {calc:"no",q:`The scatterplot shows the speed of a car (km/h) and its fuel efficiency (km per liter) for 15 tests. The correlation is r = ${f(r,2)}.${G.scatter(pts,{xmin:30,xmax:125,xstep:10,ymin:8,ymax:16,ystep:2,xlab:"Speed (km/h)",ylab:"Fuel efficiency (km/L)",grid:1})}Which statement is correct?`,
 ch:["There is a strong relationship, but it is curved; r measures only the strength of a LINEAR relationship, so a linear model is not appropriate.","Since r is close to 0, there is no relationship between speed and fuel efficiency.","Since r is close to 0, a linear model is appropriate but not very useful.","The correlation would be close to 1 if speed were measured in miles per hour."],
 ex:"The points follow a clear curved (inverted-U) pattern: efficiency rises and then falls. Correlation measures only linear association, so r is near 0 even though the relationship is strong. Changing units does not change r."}; });

/* 2. Residual plot interpretation */
add(R=>{ const curved=R.chance(0.6); const xs=[1.0,1.1,1.2,1.4,1.5,1.6,1.8,2.0,2.2,2.4,2.5,2.6,2.8,2.9,3.0,3.2,3.4];
 const pts=xs.map(x=>[x,curved?+(19*(x-2.2)**2-9+R.real(-1.2,1.2,1)).toFixed(1):+(R.normal()*4).toFixed(1)]);
 return {calc:"no",q:`A least-squares line was fit to predict the selling price of houses from their size. The residual plot is shown.${G.resid(pts,{xmin:0.8,xmax:3.6,xstep:0.4,ymin:-15,ymax:15,ystep:5,xlab:"Size (thousands of square feet)",ylab:"Residual ($ thousands)",grid:1})}Which conclusion is best supported by the residual plot?`,
 ch:curved?["A linear model is not appropriate: it overpredicts the prices of medium-sized houses and underpredicts the prices of the smallest and largest houses.","The linear model is appropriate because there are both positive and negative residuals.","The linear model underpredicts the prices of medium-sized houses.","The residuals show that the correlation is close to 1."]
 :["A linear model is appropriate, because the residuals are scattered randomly around 0 with no clear pattern.","A linear model is not appropriate, because some residuals are negative.","A linear model is not appropriate, because the residuals are not all close to 0.","The residual plot shows that size causes higher prices."],
 ex:curved?"The residuals form a clear U-shaped pattern, so the relationship is curved. For medium sizes the residuals are negative (actual − predicted < 0), so the line OVERpredicts; for the smallest and largest houses the residuals are positive, so it underpredicts.":"For a linear model to be appropriate, the residual plot should show random scatter around 0 with no curve or other pattern, which is what we see. Residuals are always both positive and negative, and regression on observational data can't show causation."}; });

/* 3. R-sq to r */
add(R=>{ const r2=R.pick([0.49,0.64,0.81,0.36]), neg=R.chance(0.5); const r=Math.sqrt(r2)*(neg?-1:1);
 const c=neg?["fuel efficiency (mpg)","weight (thousands of pounds)","cars"]:["final exam score","hours studied","students"];
 return {calc:"help",q:`For a set of 30 ${c[2]}, a regression of ${c[0]} on ${c[1]} gives R-Sq = ${r2*100}% and a ${neg?"negative":"positive"} slope. What is the correlation, and what does R-Sq mean here?`,
 ch:[`r = ${f(r,2)}; about ${r2*100}% of the variation in ${c[0]} is accounted for by the linear relationship with ${c[1]}.`,`r = ${f(r2*(neg?-1:1),2)}; ${r2*100}% of the ${c[2]} are accurately predicted.`,`r = ${f(-r,2)}; ${r2*100}% of the variation in ${c[1]} is caused by ${c[0]}.`,`r = ${f(r,2)}; ${c[0]} changes by ${r2*100}% for each unit of ${c[1]}.`],
 ex:`r = ±√${r2} = ±${f(Math.sqrt(r2),2)}, with the same sign as the slope, so r = ${f(r,2)}. R-Sq is the proportion of the variation in the RESPONSE accounted for by the linear model. It says nothing about causation or the percent of cases predicted correctly.`}; });

/* 4. LSRL from summary statistics */
add(R=>{ const xb=R.pick([10,20,50]), sx=R.pick([2,4,5]), yb=R.pick([50,70,80]), sy=R.pick([8,10,12]), r=R.pick([0.4,0.6,0.75]); const b=r*sy/sx, a=yb-b*xb;
 return {calc:"help",q:`For a set of data, x̄ = ${xb}, s_x = ${sx}, ȳ = ${yb}, s_y = ${sy} and r = ${r}. What is the equation of the least-squares regression line?`,
 ch:[`ŷ = ${f(a,2)} + ${f(b,2)}x`,`ŷ = ${f(xb-r*sx/sy*yb,2)} + ${f(r*sx/sy,2)}x`,`ŷ = ${yb} + ${f(b,2)}x`,`ŷ = ${f(b,2)} + ${f(a,2)}x`],
 ex:`b = r(s_y/s_x) = ${r}(${sy}/${sx}) = ${f(b,2)}. The line passes through (x̄, ȳ): a = ȳ − b·x̄ = ${yb} − ${f(b,2)}(${xb}) = ${f(a,2)}.`}; });

/* 5. Switching x and y */
add(R=>{ const a=R.pick([20,15,25]), b=R.pick([0.75,0.6,0.8]), r=R.pick([0.6,0.5]), xb=R.pick([80,70]); const yb=a+b*xb;
 return {calc:"help",q:`For a group of students, the least-squares line for predicting final exam score (y) from midterm score (x) is ŷ = ${a} + ${b}x, and r = ${r}. The mean midterm score is ${xb}. Which statement is correct?`,
 ch:[`The mean final score is ${f(yb,1)}; if the roles of x and y were switched, the correlation would still be ${r}, but the slope would change.`,`The mean final score is ${f(b*xb,1)}, because the slope is ${b}.`,`The mean final score is ${f(yb,1)}, and the line predicting midterm from final has slope 1/${b} ≈ ${f(1/b,2)}.`,`Switching x and y would change the correlation to ${f(1/r,2)}.`],
 ex:`The least-squares line passes through (x̄, ȳ), so ȳ = ${a} + ${b}(${xb}) = ${f(yb,1)}. Correlation is symmetric. The slope b = r·(s_y/s_x) depends on which variable is the response, and the reversed slope is r²/b = ${f(r*r/b,2)}, not 1/b (that would need r = ±1).`}; });

/* 6. Slope interpretation */
add(R=>{ const c=R.pick([["weight (kg) of a child","age (months)",0.45],["monthly electric bill ($)","home size (100 square feet)",4.2],["test score","hours of sleep the night before",3.1]]);
 return {calc:"no",q:`A regression of ${c[0]} on ${c[1]} for an observational sample has slope ${c[2]}. Which is the correct interpretation of the slope?`,
 ch:[`For each 1-unit increase in ${c[1]}, the PREDICTED ${c[0]} increases by ${c[2]}.`,`Each 1-unit increase in ${c[1]} causes ${c[0]} to increase by ${c[2]}.`,`For each 1-unit increase in ${c[1]}, the actual ${c[0]} increases by exactly ${c[2]}.`,`${c[0][0].toUpperCase()+c[0].slice(1)} is ${c[2]} when ${c[1]} is 0.`],
 ex:`The slope is the change in the PREDICTED response for each one-unit increase in the explanatory variable. Actual values vary around the line, observational data don't justify causal language, and the value at x = 0 is the intercept.`}; });

/* 7. Extrapolation */
add(R=>({calc:"no",q:"A regression of weight (kg) on age (months) for children aged 1–24 months gives predicted weight = 3.9 + 0.45(age). Why should it not be used to predict the weight of a 15-year-old (180 months)?",
 ch:["180 months is far outside the range of ages used to build the model, so the prediction is an unreliable extrapolation.","The slope is too small.","The intercept is not 0.","The correlation is not 1."],
 ex:"Predicting outside the range of the data assumes the linear pattern continues there. Growth slows dramatically after infancy, so the line would predict an impossible 84.9 kg."}));

/* 8. Correlation properties */
add(R=>{ const r=R.pick([0.85,-0.62,0.47]);
 return {calc:"no",q:`The correlation between daily temperature (°F) and ice cream sales ($) at a shop is r = ${r}. Temperature is converted to °C and sales to euros. What is the new correlation?`,
 ch:[f(r,2),f(-r,2),f(r*1.8,2),"It cannot be determined without the data."],
 ex:"Correlation has no units and doesn't change when either variable is converted by a linear transformation with a positive multiplier, such as °F to °C or dollars to euros."}; });

/* 9. Estimate r from a scatterplot */
add(R=>{ const r=R.pick([-0.9,-0.5,0.5,0.9]); const xs=Array.from({length:25},(_,i)=>i+1); const ys=ZB.exactLine(R,xs,r>0?20:70,r>0?2:-2,r*r,1);
 return {calc:"no",num:true,q:`Which value is closest to the correlation for the data in the scatterplot?${G.scatter(xs.map((x,i)=>[x,ys[i]]),{xmin:0,xmax:26,xstep:5,ymin:Math.floor(Math.min(...ys)/10)*10,ymax:Math.ceil(Math.max(...ys)/10)*10,ystep:10,xlab:"x",ylab:"y",grid:1})}`,
 ch:[String(r),...[-0.9,-0.5,0.5,0.9].filter(v=>v!==r).map(String)],ex:`The points show a ${r>0?"positive":"negative"} ${Math.abs(r)>0.8?"strong":"moderate"} linear pattern${Math.abs(r)>0.8?" with points close to a line":" with considerable scatter around a line"}, so r ≈ ${r}.`}; });

/* 10. Residual from an equation */
add(R=>{ const a=R.pick([45.2,38.5,52.0]), b=R.pick([3.8,4.5,2.9]), x=R.int(4,9); const yhat=a+b*x, y=Math.round(yhat+R.pick([-1,1])*R.real(3,7,0));
 return {calc:"help",num:true,q:`The least-squares line for predicting test score from hours studied is predicted score = ${a} + ${b}(hours). A student studied ${x} hours and scored ${y}. What is the residual for this student?`,
 ch:[f(y-yhat,1),f(yhat-y,1),f(yhat,1),f(y-a,1)===f(yhat-y,1)||f(y-a,1)===f(y-yhat,1)?f((y-yhat)*b,1):f(y-a,1)],ex:`Predicted = ${a} + ${b}(${x}) = ${f(yhat,1)}. Residual = actual − predicted = ${y} − ${f(yhat,1)} = ${f(y-yhat,1)}. ${y<yhat?"The student scored less than predicted.":"The student scored more than predicted."}`}; });

/* ================= regression sets (set R) ================= */
setR.push(R=>{ const xs=[152,155,158,160,162,163,165,167,168,170,172,175,178,183]; const a=R.real(25,35,1), b=R.real(0.78,0.86,3), r2=R.real(0.72,0.86,2);
 const ys=ZB.exactLine(R,xs,a,b,r2,1); const L=S.linreg(xs,ys); const k=R.int(3,11), px=xs[k], py=ys[k], res=py-(L.a+L.b*px); const resid=xs.map((x,i)=>[x,+(ys[i]-(L.a+L.b*x)).toFixed(2)]);
 const ym=Math.floor(Math.min(...ys)/5)*5-5, yM=Math.ceil(Math.max(...ys)/5)*5+5;
 return {stem:`<p>A random sample of 14 students in a large high school was measured for arm span and height, both in centimeters. The scatterplot shows the data and the least-squares regression line. The computer output and a residual plot are shown below. The point marked <b>P</b> is a student with an arm span of ${px} cm.</p>
 ${G.scatter(xs.map((x,i)=>[x,ys[i]]),{xmin:150,xmax:185,xstep:5,ymin:ym,ymax:yM,ystep:5,xlab:"Arm span (cm)",ylab:"Height (cm)",line:[L.a,L.b],lx:[150,185],hl:[[px,py,"P"]],grid:1})}
 <table class="out"><tr><th>Predictor</th><th>Coef</th></tr><tr><td style="text-align:left">Constant</td><td>${f(L.a,2)}</td></tr><tr><td style="text-align:left">Arm span</td><td>${f(L.b,3)}</td></tr><tr><td colspan="2" style="text-align:left">R-Sq = ${f(L.r*L.r*100,1)}%</td></tr></table>
 ${G.resid(resid,{xmin:150,xmax:185,xstep:5,ymin:-8,ymax:8,ystep:4,xlab:"Arm span (cm)",grid:1})}`,
 qs:[{calc:"help",q:`Student P is ${py} cm tall. What is the residual for this student, and what does it mean?`,ch:[`${f(res,1)} cm; the student's actual height is ${f(Math.abs(res),1)} cm ${res<0?"less":"more"} than the height predicted from an arm span of ${px} cm.`,`${f(-res,1)} cm; the student's actual height is ${f(Math.abs(res),1)} cm ${res<0?"more":"less"} than predicted.`,`${f(L.a+L.b*px,1)} cm; this is the student's predicted height.`,`${f(res,1)} cm; the student's arm span is ${f(Math.abs(res),1)} cm ${res<0?"shorter":"longer"} than predicted.`],ex:`Predicted height = ${f(L.a,2)} + ${f(L.b,3)}(${px}) = ${f(L.a+L.b*px,2)}. Residual = actual − predicted = ${py} − ${f(L.a+L.b*px,2)} ≈ ${f(res,1)} cm. The model predicts height, not arm span.`},
  {calc:"no",q:"Two students in this school have arm spans that differ by 10 cm. According to the model, how do their heights compare?",ch:[`Their predicted heights differ by ${f(10*L.b,2)} cm, with the longer arm span having the greater predicted height.`,`Their actual heights differ by ${f(10*L.b,2)} cm.`,`Their predicted heights differ by 10 cm.`,`Their predicted heights differ by ${f(L.b,3)} cm.`],ex:`The slope ${f(L.b,3)} is the change in PREDICTED height per 1 cm of arm span, so a 10 cm difference corresponds to ${f(10*L.b,2)} cm in predicted height. Actual heights vary around the line.`},
  {calc:"no",q:"Which statement is supported by the residual plot and the output?",ch:[`A linear model is appropriate because the residual plot shows no clear pattern; about ${f(L.r*L.r*100,1)}% of the variation in height is accounted for by the linear relationship with arm span.`,"A linear model is not appropriate, because some residuals are larger than 4 cm.",`About ${f(L.r*L.r*100,1)}% of the students' heights are predicted correctly by the line.`,"The residual plot shows that arm span causes height."],ex:`The residuals are scattered randomly around 0, so the linear form is appropriate. R-Sq = ${f(L.r*L.r*100,1)}% is the proportion of variation in height accounted for by the model. Regression on observational data can't show causation.`}]}; });

setR.push(R=>{ const xs=[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,20]; const a=R.real(60,70,1), b=-R.real(1.4,2.0,2), r2=R.real(0.55,0.75,2); const ys=ZB.exactLine(R,xs,a,b,r2,1); const L=S.linreg(xs,ys);
 return {stem:`<p>A city tracked 18 randomly selected days in winter. For each day it recorded the low temperature (°C below 0 is shown as a positive number of “degrees of frost”, x) and the number of people who rode the city's public bikes (y, in hundreds). Computer output for the least-squares regression is shown.</p>
 ${G.scatter(xs.map((x,i)=>[x,ys[i]]),{xmin:0,xmax:22,xstep:2,ymin:Math.floor(Math.min(...ys)/10)*10,ymax:Math.ceil(Math.max(...ys)/10)*10,ystep:10,xlab:"Degrees of frost",ylab:"Riders (hundreds)",line:[L.a,L.b],lx:[2,20],grid:1})}
 <table class="out"><tr><th>Predictor</th><th>Coef</th></tr><tr><td style="text-align:left">Constant</td><td>${f(L.a,2)}</td></tr><tr><td style="text-align:left">Frost</td><td>${f(L.b,3)}</td></tr><tr><td colspan="2" style="text-align:left">R-Sq = ${f(L.r*L.r*100,1)}%</td></tr></table>`,
 qs:[{calc:"help",q:"What is the correlation between degrees of frost and the number of riders?",num:true,ch:[f(L.r,3),f(-L.r,3),f(L.r*L.r,3),f(L.b,3)],ex:`r = −√${f(L.r*L.r,3)} ≈ ${f(L.r,3)}; it is negative because the slope is negative. ${f(L.r*L.r,3)} is r², and the slope is not the correlation.`},
  {calc:"help",q:"Which is the best interpretation of the y-intercept?",ch:[`On a day with 0 degrees of frost, the predicted number of riders is about ${f(L.a*100,0)} people.`,`On every day with 0 degrees of frost, exactly ${f(L.a*100,0)} people ride.`,`For each additional degree of frost, ridership decreases by ${f(L.a,2)} hundred.`,`The intercept has no meaning because it is positive.`],ex:`The intercept is the PREDICTED response when x = 0: ${f(L.a,2)} hundred riders. 0 degrees is just outside the observed range (2 to 20), so the interpretation is a mild extrapolation.`},
  {calc:"no",q:"Should the line be used to predict ridership on a day with 45 degrees of frost?",ch:["No: 45 is far outside the observed range (2 to 20 degrees), so the prediction would be an extrapolation and may be unrealistic.","Yes, because R-Sq is fairly high.","Yes, because the relationship is negative.","No, because the correlation is negative."],ex:`Predicted = ${f(L.a,2)} + (${f(L.b,3)})(45) = ${f(L.a+L.b*45,1)} hundred riders${L.a+L.b*45<0?", which is impossible":""}. Extrapolating far beyond the data assumes the linear pattern continues, which may not be true.`}]}; });
})();
