/* Mechanics question bank: AP Physics 1 units 1–8 and AP Physics C: Mechanics units 1–7.
   Every answer is computed from the generated numbers; distractors come from named mistakes. */
(function(){
const {R,P,r,FR}=ZP, N=v=>ZP.fmt(v,3), g=9.8, rad=d=>d*Math.PI/180;
const M=u=>["p1:"+u,"cm:"+u], A=(...a)=>ZP.add(...a);
const sin=d=>Math.sin(rad(d)), cos=d=>Math.cos(rad(d));

/* ===================== UNIT 1: KINEMATICS ===================== */
A(M(1),1,"Average velocity",()=>{ const d1=R(20,80), d2=R(10,d1-5), t=R(10,40);
 return {q:`A runner goes ${d1} m east, then turns and goes ${d2} m west. The whole trip takes ${t} s. What is the runner's average <b>velocity</b>?`,a:(d1-d2)/t,u:"m/s east",
 dis:[[(d1+d2)/t,"That is average <i>speed</i> (total distance ÷ time). Velocity uses displacement."],[(d1-d2)/t*2,"Do not halve the time; average velocity is Δx ÷ total Δt."],[t/(d1-d2),"The ratio is upside down: velocity is displacement ÷ time."]],
 steps:[`Displacement = ${d1} m − ${d2} m = ${d1-d2} m east (direction matters).`,`Average velocity = Δx/Δt = ${d1-d2} m ÷ ${t} s = <b>${N((d1-d2)/t)} m/s east</b>.`,`Average speed would use the distance ${d1+d2} m instead, giving ${N((d1+d2)/t)} m/s.`]}; });
A(M(1),1,"Velocity with constant acceleration",()=>{ const v0=R(0,8), a=r(1,5,1), t=R(2,9); const v=v0+a*t;
 return {q:`A cart starts at ${v0} m/s and speeds up at a constant ${a} m/s². What is its speed after ${t} s?`,a:v,u:"m/s",
 dis:[[a*t,"You dropped the starting velocity v₀."],[v0+a*t*t,"Velocity grows linearly with time: v = v₀ + at, not at²."],[v0+0.5*a*t,"The ½ belongs in the position equation, not the velocity equation."]],
 steps:[`Use v = v₀ + at.`,`v = ${v0} + (${a})(${t}) = <b>${N(v)} m/s</b>.`]}; });
A(M(1),1,"Slope of a position–time graph",()=>{ const x0=R(0,6), v=P([1,1.5,2,2.5,3,4]), T=R(4,6); const x1=x0+v*T;
 return {q:`The graph shows the position of a toy car. What is its velocity?`,fig:ZP.graph({xmin:0,xmax:T,ymin:0,ymax:Math.ceil(x1/2)*2+2,xs:1,ys:2,pts:[[0,x0],[T,x1]],dots:[[0,x0],[T,x1]],yl:"x (m)"}),a:v,u:"m/s",
 dis:[[x1/T,"You divided the final position by time; use the change in position."],[x1,"That is a position, not a velocity."],[(x1-x0)*T,"Velocity is the slope, Δx ÷ Δt, not Δx × Δt."]],
 steps:[`On an x–t graph, velocity = slope.`,`Slope = (${N(x1)} − ${x0}) m ÷ (${T} − 0) s = <b>${N(v)} m/s</b>.`]}; });
A(M(1),2,"Displacement with constant acceleration",()=>{ const v0=R(2,12), a=r(1.5,4,1), t=R(3,8); const x=v0*t+0.5*a*t*t;
 return {q:`A bike moving at ${v0} m/s accelerates at ${a} m/s² for ${t} s. How far does it travel in that time?`,a:x,u:"m",
 dis:[[v0*t+a*t*t,"You left out the ½ in ½at²."],[v0*t,"That ignores the acceleration."],[0.5*a*t*t,"You left out the v₀t term."]],
 steps:[`Use Δx = v₀t + ½at².`,`v₀t = ${v0}·${t} = ${v0*t} m.`,`½at² = ½·${a}·${t}² = ${N(0.5*a*t*t)} m.`,`Δx = <b>${N(x)} m</b>.`]}; });
A(M(1),2,"Stopping distance",()=>{ const v0=R(12,30), a=r(3,8,1); const d=v0*v0/(2*a);
 return {q:`A car moving at ${v0} m/s brakes with a constant deceleration of ${a} m/s². How far does it travel before stopping?`,a:d,u:"m",
 dis:[[v0*v0/a,"You forgot the 2 in v² = v₀² + 2aΔx."],[v0/a,"That is the stopping <i>time</i>, not distance."],[v0*v0/(4*a),"Check the algebra: Δx = v₀²/(2a)."]],
 steps:[`No time is given, so use v² = v₀² + 2aΔx with v = 0 and a = −${a} m/s².`,`0 = ${v0}² − 2(${a})Δx → Δx = ${v0}²/(2·${a}).`,`Δx = ${v0*v0}/${N(2*a)} = <b>${N(d)} m</b>.`]}; });
A(M(1),2,"Free fall",()=>{ const h=R(5,80); const t=Math.sqrt(2*h/g), v=Math.sqrt(2*g*h);
 const ask=P(["t","v"]);
 return ask==="t"?{q:`A stone is dropped from rest from a height of ${h} m. Ignoring air resistance, how long does it take to reach the ground?`,a:t,u:"s",
 dis:[[h/g,"Δy = ½gt², so t = √(2h/g), not h/g."],[Math.sqrt(h/g),"You lost the 2: t = √(2h/g)."],[2*h/g,"Take the square root: t² = 2h/g."]],
 steps:[`Starting from rest, Δy = ½gt².`,`t = √(2h/g) = √(2·${h}/9.8) = <b>${N(t)} s</b>.`]}
 :{q:`A stone is dropped from rest from a height of ${h} m. Ignoring air resistance, with what speed does it hit the ground?`,a:v,u:"m/s",
 dis:[[g*h,"Take the square root: v² = 2gh."],[Math.sqrt(g*h),"You lost the 2: v = √(2gh)."],[2*g*h/10,"Use v = √(2gh)."]],
 steps:[`From rest: v² = v₀² + 2gΔy = 2gh.`,`v = √(2·9.8·${h}) = <b>${N(v)} m/s</b>.`]}; });
A(M(1),2,"Area under a velocity–time graph",()=>{ const v1=R(2,8), t1=R(2,4), t2=t1+R(2,4); const d=0.5*v1*t1+v1*(t2-t1);
 return {q:`The graph shows the velocity of a cart. What is its displacement from t = 0 to t = ${t2} s?`,fig:ZP.graph({xmin:0,xmax:t2,ymin:0,ymax:v1+2,xs:1,ys:2,pts:[[0,0],[t1,v1],[t2,v1]],yl:"v (m/s)"}),a:d,u:"m",
 dis:[[v1*t2,"The first part is a triangle, not a rectangle."],[v1/t1,"That is the slope (acceleration), not the area."],[0.5*v1*t2,"Only the first part is a triangle; after t = "+t1+" s the area is a rectangle."]],
 steps:[`Displacement = area under the v–t graph.`,`Triangle 0–${t1} s: ½·${t1}·${v1} = ${N(0.5*v1*t1)} m.`,`Rectangle ${t1}–${t2} s: ${t2-t1}·${v1} = ${v1*(t2-t1)} m.`,`Total = <b>${N(d)} m</b>.`]}; });
A(M(1),3,"Horizontal launch",()=>{ const h=R(5,45), v0=R(4,20); const t=Math.sqrt(2*h/g), x=v0*t;
 return {q:`A ball rolls off a ${h} m high cliff with a horizontal speed of ${v0} m/s. How far from the base of the cliff does it land?`,a:x,u:"m",
 dis:[[v0*h/g,"Find the fall time from Δy = ½gt²; it is √(2h/g), not h/g."],[v0*Math.sqrt(h/g),"t = √(2h/g); you lost the 2."],[v0*v0/g,"That is a level-ground range formula; this launch is horizontal from a height."]],
 steps:[`Vertical motion sets the time: starts with v<sub>y</sub> = 0, so h = ½gt².`,`t = √(2·${h}/9.8) = ${N(t)} s.`,`Horizontal velocity stays ${v0} m/s (no horizontal force).`,`x = v₀t = ${v0}·${N(t)} = <b>${N(x)} m</b>.`]}; });
A(M(1),3,"Projectile at an angle",()=>{ const v0=R(10,30), th=P([30,37,40,45,50,53,60]); const vx=v0*cos(th), vy=v0*sin(th); const T=2*vy/g, Rg=vx*T, H=vy*vy/(2*g); const ask=P(["R","H"]);
 return ask==="R"?{q:`A ball is launched from level ground at ${v0} m/s, ${th}° above horizontal. How far away does it land (level ground, no air resistance)?`,a:Rg,u:"m",
 dis:[[vx*vy/g,"That uses only the time to the top; the full flight takes twice as long."],[v0*v0/g,"That would be true only at 45°."],[v0*T,"Only the horizontal component v₀cosθ carries the ball sideways."]],
 steps:[`v<sub>x</sub> = ${v0}cos${th}° = ${N(vx)} m/s; v<sub>y</sub> = ${v0}sin${th}° = ${N(vy)} m/s.`,`Time of flight: T = 2v<sub>y</sub>/g = ${N(T)} s.`,`Range = v<sub>x</sub>T = <b>${N(Rg)} m</b>.`]}
 :{q:`A ball is launched at ${v0} m/s, ${th}° above horizontal. What maximum height above the launch point does it reach?`,a:H,u:"m",
 dis:[[v0*v0/(2*g),"Only the vertical component slows to zero; use v<sub>y</sub> = v₀sinθ."],[vy*vy/g,"You lost the 2: H = v<sub>y</sub>²/(2g)."],[vy/g,"That is the time to the top, not the height."]],
 steps:[`At the top v<sub>y</sub> = 0 (v<sub>x</sub> is not zero).`,`v<sub>y0</sub> = ${v0}sin${th}° = ${N(vy)} m/s.`,`H = v<sub>y0</sub>²/(2g) = ${N(vy*vy)}/19.6 = <b>${N(H)} m</b>.`]}; });
A(M(1),3,"Relative velocity (river crossing)",()=>{ const vb=R(3,8), vw=R(1,vb-1), w=R(40,150); const t=w/vb, drift=vw*t, sp=Math.hypot(vb,vw);
 const ask=P(["d","s"]);
 return ask==="d"?{q:`A boat points straight across a ${w} m wide river and moves at ${vb} m/s relative to the water. The current flows at ${vw} m/s. How far downstream does it land?`,a:drift,u:"m",
 dis:[[vw*w/sp,"The crossing time uses only the across component of velocity: t = width/v<sub>boat</sub>."],[w*vb/vw,"Invert: drift = v<sub>current</sub> × time."],[w,"Downstream drift depends on the current speed."]],
 steps:[`Across and downstream motions are independent.`,`Crossing time t = ${w}/${vb} = ${N(t)} s (the current does not change it).`,`Drift = ${vw}·${N(t)} = <b>${N(drift)} m</b>.`]}
 :{q:`A boat heads straight across a river at ${vb} m/s relative to the water; the current flows at ${vw} m/s. What is the boat's speed relative to the shore?`,a:sp,u:"m/s",
 dis:[[vb+vw,"The velocities are perpendicular; add them as vectors."],[vb-vw,"Subtract only when they are opposite."],[Math.sqrt(vb*vb-vw*vw),"Perpendicular vectors: v = √(v₁² + v₂²)."]],
 steps:[`The two velocities are at 90°, so use the Pythagorean theorem.`,`v = √(${vb}² + ${vw}²) = <b>${N(sp)} m/s</b>.`]}; });
A(M(1),3,"Two-object meeting problem",()=>{ const v=R(10,25), a=r(2,4,1); const t=2*v/a, x=v*t;
 return {q:`A police car starts from rest at the moment a speeder passes it at a constant ${v} m/s. The police car accelerates at ${a} m/s². How long until it catches the speeder?`,a:t,u:"s",
 dis:[[v/a,"That is when their speeds are equal, not when their positions are equal."],[Math.sqrt(2*v/a),"Set positions equal: vt = ½at² → t = 2v/a."],[4*v/a,"Solve vt = ½at²: t = 2v/a."]],
 steps:[`Positions: speeder x = ${v}t; police x = ½(${a})t².`,`Set equal: ${v}t = ${N(a/2)}t² → t = 2·${v}/${a}.`,`t = <b>${N(t)} s</b> (they are ${N(x)} m down the road).`]}; });

/* ===================== UNIT 2: FORCE AND TRANSLATIONAL DYNAMICS ===================== */
A(M(2),1,"Newton's second law",()=>{ const m=R(2,25), F1=R(20,90), f=R(5,F1-5); const a=(F1-f)/m;
 return {q:`A ${m} kg crate is pushed with a ${F1} N horizontal force while friction exerts ${f} N on it. What is its acceleration?`,a:a,u:"m/s²",
 dis:[[F1/m,"Use the <i>net</i> force; friction opposes the push."],[(F1+f)/m,"Friction acts opposite the push, so subtract it."],[m/(F1-f),"a = F<sub>net</sub>/m, not m/F."]],
 steps:[`F<sub>net</sub> = ${F1} − ${f} = ${F1-f} N.`,`a = F<sub>net</sub>/m = ${F1-f}/${m} = <b>${N(a)} m/s²</b>.`]}; });
A(M(2),1,"Weight and mass",()=>{ const m=R(40,95), pl=P([["the Moon",1.62],["Mars",3.71],["Jupiter",24.8]]);
 return {q:`An astronaut has a mass of ${m} kg. What is her weight on ${pl[0]}, where g = ${pl[1]} m/s²?`,a:m*pl[1],u:"N",
 dis:[[m,"Mass (kg) is not weight (N)."],[m*g,"That is her weight on Earth."],[m/pl[1],"Weight = mg, not m/g."]],
 steps:[`Weight F<sub>g</sub> = mg.`,`F<sub>g</sub> = ${m}·${pl[1]} = <b>${N(m*pl[1])} N</b>. Her mass is still ${m} kg everywhere.`]}; });
A(M(2),1,"Hooke's law",()=>{ const k=R(50,400), x=r(0.05,0.3,2);
 return {q:`A spring with spring constant ${k} N/m is stretched ${x} m from its natural length. What force does the spring exert?`,a:k*x,u:"N",
 dis:[[0.5*k*x*x,"That is the elastic potential energy, ½kx²."],[k/x,"F = kx, not k/x."],[k*x*x,"The force is linear in x."]],
 steps:[`Hooke's law: |F| = kx.`,`F = ${k}·${x} = <b>${N(k*x)} N</b>, directed back toward equilibrium.`]}; });
A(M(2),2,"Frictionless incline",()=>{ const th=R(15,50), L=R(2,10); const a=g*sin(th); const v=Math.sqrt(2*a*L);
 return P([0,1])?{q:`A block slides down a frictionless ramp inclined at ${th}°. What is its acceleration?`,a:a,u:"m/s²",
 dis:[[g*cos(th),"The component along the ramp uses sinθ."],[g,"Only the component of gravity along the ramp accelerates it."],[g*Math.tan(rad(th)),"Use g sinθ."]],
 steps:[`Along the ramp the only force is mg sinθ (the normal force is perpendicular).`,`a = g sinθ = 9.8·sin${th}° = <b>${N(a)} m/s²</b>.`]}
 :{q:`A block starts from rest and slides ${L} m down a frictionless ramp inclined at ${th}°. What is its speed at the bottom?`,a:v,u:"m/s",
 dis:[[Math.sqrt(2*g*L),"The drop in height is L sinθ, not L."],[a*L,"Use v² = 2aL, then take the square root."],[Math.sqrt(2*g*cos(th)*L),"Use g sinθ along the ramp."]],
 steps:[`a = g sinθ = ${N(a)} m/s².`,`v² = 2aL = 2·${N(a)}·${L} → v = <b>${N(v)} m/s</b>.`]}; });
A(M(2),2,"Kinetic friction",()=>{ const m=R(3,20), mu=r(0.15,0.5,2), F=Math.round(mu*m*g+R(10,40)); const f=mu*m*g, a=(F-f)/m;
 return {q:`A ${m} kg box is pulled across a floor by a horizontal ${F} N force. The coefficient of kinetic friction is ${mu}. What is the box's acceleration?`,a:a,u:"m/s²",
 dis:[[F/m,"You ignored friction."],[(F-mu*m)/m,"Friction is μF<sub>N</sub> = μmg; include g."],[(F+f)/m,"Friction opposes the motion; subtract it."]],
 steps:[`F<sub>N</sub> = mg = ${N(m*g)} N (no vertical acceleration).`,`f<sub>k</sub> = μF<sub>N</sub> = ${mu}·${N(m*g)} = ${N(f)} N.`,`a = (${F} − ${N(f)})/${m} = <b>${N(a)} m/s²</b>.`]}; });
A(M(2),2,"Elevator (apparent weight)",()=>{ const m=R(45,90), a=r(0.5,3,1), up=P([1,-1]); const Nn=m*(g+up*a);
 return {q:`A ${m} kg student stands on a scale in an elevator that is ${up>0?"speeding up while moving upward":"slowing down while moving upward"} at ${a} m/s². What does the scale read?`,a:Nn,u:"N",
 dis:[[m*g,"The scale reads mg only when the acceleration is zero."],[m*(g-up*a),"Check the direction of the acceleration: "+(up>0?"upward":"downward")+"."],[m*a,"The scale must also support the weight."]],
 steps:[`Acceleration is ${up>0?"upward":"downward"} (${up>0?"speeding up going up":"slowing while going up"}).`,`Newton's 2nd law (up positive): F<sub>N</sub> − mg = m(${up>0?"+":"−"}${a}).`,`F<sub>N</sub> = ${m}(9.8 ${up>0?"+":"−"} ${a}) = <b>${N(Nn)} N</b>.`]}; });
A(M(2),2,"Atwood machine",()=>{ const m1=R(1,6), m2=m1+R(1,5); const a=(m2-m1)*g/(m1+m2), T=2*m1*m2*g/(m1+m2); const ask=P(["a","T"]);
 return ask==="a"?{q:`Masses of ${m1} kg and ${m2} kg hang from a light string over a frictionless, massless pulley. What is the magnitude of their acceleration?`,a:a,u:"m/s²",
 dis:[[(m2-m1)*g/m2,"Both masses accelerate together, so divide by the total mass."],[(m2+m1)*g/(m2-m1),"Upside down: a = (m₂ − m₁)g/(m₁ + m₂)."],[(m2-m1)*g,"Divide by the total mass."]],
 steps:[`Treat both masses as one system. The net force is the difference in weights: (${m2} − ${m1})·9.8 = ${N((m2-m1)*g)} N.`,`Total mass = ${m1+m2} kg.`,`a = ${N((m2-m1)*g)}/${m1+m2} = <b>${N(a)} m/s²</b>.`]}
 :{q:`Masses of ${m1} kg and ${m2} kg hang from a light string over a frictionless, massless pulley. What is the tension in the string?`,a:T,u:"N",
 dis:[[m1*g,"The lighter mass accelerates upward, so T is more than its weight."],[m2*g,"The heavier mass accelerates downward, so T is less than its weight."],[(m1+m2)*g/2,"Find a first, then use T − m₁g = m₁a."]],
 steps:[`a = (m₂ − m₁)g/(m₁ + m₂) = ${N(a)} m/s².`,`For the ${m1} kg mass (moving up): T − m₁g = m₁a.`,`T = ${m1}(9.8 + ${N(a)}) = <b>${N(T)} N</b>.`]}; });
A(M(2),2,"Horizontal circle",()=>{ const m=r(0.2,2,1), L=r(0.5,1.5,1), v=R(2,8);
 return {q:`A ${m} kg ball on a string moves in a horizontal circle of radius ${L} m on a frictionless table at ${v} m/s. What is the tension?`,a:m*v*v/L,u:"N",
 dis:[[m*v/L,"Centripetal force is mv²/r."],[m*v*v*L,"Divide by r."],[m*g,"Gravity is vertical and balanced by the table."]],
 steps:[`The string tension is the only horizontal force, so it supplies the centripetal force.`,`T = mv²/r = ${m}·${v}²/${L} = <b>${N(m*v*v/L)} N</b>.`]}; });
A(M(2),2,"Newton's law of gravitation",()=>{ const k=P([2,3,4]), wh=P(["distance between their centers is multiplied","mass of one object is multiplied"]); const F=R(100,900);
 const ans=wh[0]==="d"?F/(k*k):F*k;
 return {q:`Two objects attract each other with a gravitational force of ${F} N. If the ${wh} by ${k}, what is the new force?`,a:ans,u:"N",
 dis:wh[0]==="d"?[[F/k,"Gravity follows an inverse <i>square</i> law."],[F*k*k,"Farther apart means weaker, not stronger."],[F,"The force depends on distance."]]:[[F*k*k,"F is proportional to each mass, not the mass squared."],[F/k,"More mass means a larger force."],[F,"The force depends on the masses."]],
 steps:wh[0]==="d"?[`F = Gm₁m₂/r², so F ∝ 1/r².`,`Multiplying r by ${k} divides F by ${k*k}.`,`F = ${F}/${k*k} = <b>${N(ans)} N</b>.`]:[`F = Gm₁m₂/r², so F ∝ m.`,`F = ${F}·${k} = <b>${N(ans)} N</b>.`]}; });
A(M(2),3,"Modified Atwood (table with friction)",()=>{ const m1=R(2,8), m2=R(2,8), mu=r(0.1,0.3,2); if(m2<=mu*m1+0.5) return null; const a=(m2-mu*m1)*g/(m1+m2), T=m2*(g-a);
 const ask=P(["a","T"]);
 return {q:`A ${m1} kg block on a table is tied by a string over a pulley at the edge to a hanging ${m2} kg block. The coefficient of kinetic friction between the table and block is ${mu}. Find the ${ask==="a"?"acceleration of the blocks":"tension in the string"}.`,a:ask==="a"?a:T,u:ask==="a"?"m/s²":"N",
 dis:ask==="a"?[[m2*g/(m1+m2),"You ignored friction on the table block."],[(m2-mu*m1)*g/m2,"Both blocks accelerate; divide by m₁ + m₂."],[(m2+mu*m1)*g/(m1+m2),"Friction opposes the motion; subtract μm₁g."]]:[[m2*g,"The hanging block accelerates down, so T < m₂g."],[mu*m1*g,"That is only the friction force."],[m2*(g+a),"Down is the direction of acceleration for the hanging block: m₂g − T = m₂a."]],
 steps:[`Friction on the table block: μm₁g = ${mu}·${m1}·9.8 = ${N(mu*m1*g)} N.`,`System: m₂g − μm₁g = (m₁ + m₂)a.`,`a = (${N(m2*g)} − ${N(mu*m1*g)})/${m1+m2} = ${N(a)} m/s².`,ask==="a"?`<b>a = ${N(a)} m/s²</b>.`:`Hanging block: m₂g − T = m₂a → T = ${m2}(9.8 − ${N(a)}) = <b>${N(T)} N</b>.`]}; });
A(M(2),3,"Incline with friction",()=>{ const th=R(25,50), mu=r(0.1,0.4,2); if(Math.tan(rad(th))<=mu+0.05) return null; const a=g*(sin(th)-mu*cos(th));
 return {q:`A block slides down a ramp inclined at ${th}°. The coefficient of kinetic friction is ${mu}. What is the block's acceleration?`,a:a,u:"m/s²",
 dis:[[g*sin(th),"You ignored friction."],[g*(sin(th)-mu*sin(th)),"The normal force is mg cosθ, so friction = μmg cosθ."],[g*(sin(th)+mu*cos(th)),"The block slides down, so friction points up the ramp."]],
 steps:[`Along the ramp: mg sinθ down, friction μmg cosθ up.`,`a = g(sinθ − μcosθ) = 9.8(${N(sin(th))} − ${mu}·${N(cos(th))}).`,`a = <b>${N(a)} m/s²</b>.`]}; });
A(M(2),3,"Car on a flat curve",()=>{ const mu=r(0.3,0.9,2), rr=R(20,120); const v=Math.sqrt(mu*g*rr);
 return {q:`A car rounds a flat, unbanked curve of radius ${rr} m. The coefficient of static friction between tires and road is ${mu}. What is the maximum speed without skidding?`,a:v,u:"m/s",
 dis:[[mu*g*rr,"Take the square root: v² = μgr."],[Math.sqrt(g*rr),"Friction (μ) limits the centripetal force."],[Math.sqrt(mu*rr),"Include g: friction is μmg."]],
 steps:[`Static friction provides the centripetal force: μ<sub>s</sub>mg = mv²/r.`,`Mass cancels: v = √(μgr) = √(${mu}·9.8·${rr}).`,`v = <b>${N(v)} m/s</b>.`]}; });
A(M(2),3,"Vertical loop",()=>{ const m=r(0.5,3,1), rr=r(2,8,1), v=R(Math.ceil(Math.sqrt(g*rr))+1,Math.ceil(Math.sqrt(g*rr))+8); const Nn=m*v*v/rr-m*g;
 return {q:`A ${m} kg cart moves at ${v} m/s at the top of a vertical loop of radius ${rr} m (the cart is inside the loop). What normal force does the track exert on it at the top?`,a:Nn,u:"N",
 dis:[[m*v*v/rr+m*g,"At the top both gravity and the normal force point down (toward the center)."],[m*v*v/rr,"Gravity also supplies part of the centripetal force."],[m*g,"The normal force depends on speed here."]],
 steps:[`At the top, toward the center is downward. Both F<sub>N</sub> and mg point down.`,`F<sub>N</sub> + mg = mv²/r.`,`F<sub>N</sub> = ${m}·${v}²/${rr} − ${m}·9.8 = <b>${N(Nn)} N</b>.`]}; });
A(M(2),3,"Orbital speed",()=>{ const Mp=P([[5.97e24,"Earth",6.37e6],[6.42e23,"Mars",3.39e6],[7.35e22,"the Moon",1.74e6]]), hh=R(2,20)*1e5; const rr=Mp[2]+hh, v=Math.sqrt(6.67e-11*Mp[0]/rr);
 return {q:`A satellite orbits ${Mp[1]} (mass ${N(Mp[0])} kg, radius ${N(Mp[2])} m) in a circular orbit ${N(hh)} m above the surface. What is its orbital speed? (G = 6.67 × 10⁻¹¹ N·m²/kg²)`,a:v,u:"m/s",
 dis:[[Math.sqrt(6.67e-11*Mp[0]/hh),"Use the distance from the planet's center, r = R + h."],[Math.sqrt(2*6.67e-11*Mp[0]/rr),"That is escape speed; orbital speed is √(GM/r)."],[6.67e-11*Mp[0]/rr,"Take the square root."]],
 steps:[`Gravity provides the centripetal force: GMm/r² = mv²/r → v = √(GM/r).`,`r = ${N(Mp[2])} + ${N(hh)} = ${N(rr)} m.`,`v = √(6.67 × 10⁻¹¹ · ${N(Mp[0])} / ${N(rr)}) = <b>${N(v)} m/s</b>.`]}; });

/* ===================== UNIT 3: WORK, ENERGY, AND POWER ===================== */
A(M(3),1,"Work by a constant force",()=>{ const F=R(10,90), d=R(2,20), th=P([0,20,30,37,45,60]);
 return {q:`A ${F} N force pulls a sled ${d} m along level ground. The force is ${th}° above horizontal. How much work does it do?`,a:F*d*cos(th),u:"J",
 dis:[[F*d,"Only the component along the motion does work: Fd cosθ."],[F*d*sin(th),"Use cosθ, the component parallel to the displacement."],[F/d,"Work = force × distance."]].filter(x=>th!==0||x[0]!==F*d),
 steps:[`W = Fd cosθ.`,`W = ${F}·${d}·cos${th}° = <b>${N(F*d*cos(th))} J</b>.`]}; });
A(M(3),1,"Kinetic energy",()=>{ const m=R(1,1500), v=R(2,30);
 return {q:`What is the kinetic energy of a ${m} kg object moving at ${v} m/s?`,a:0.5*m*v*v,u:"J",
 dis:[[m*v*v,"K = ½mv²; you left out the ½."],[0.5*m*v,"The speed is squared."],[m*v,"That is momentum, not kinetic energy."]],
 steps:[`K = ½mv² = ½·${m}·${v}² = <b>${N(0.5*m*v*v)} J</b>.`]}; });
A(M(3),1,"Power",()=>{ const m=R(40,90), h=R(3,15), t=R(4,20); const W=m*g*h;
 return {q:`A ${m} kg student runs up stairs that rise ${h} m in ${t} s. What average power does she produce against gravity?`,a:W/t,u:"W",
 dis:[[m*h/t,"Work against gravity is mgh; include g."],[W,"That is the work; power is work ÷ time."],[W*t,"Power is work divided by time."]],
 steps:[`W = mgh = ${m}·9.8·${h} = ${N(W)} J.`,`P = W/t = ${N(W)}/${t} = <b>${N(W/t)} W</b>.`]}; });
A(M(3),2,"Conservation of energy (drop)",()=>{ const h=R(2,40); const v=Math.sqrt(2*g*h);
 return {q:`A roller-coaster car starts from rest and drops ${h} m on a frictionless track. What is its speed at the bottom?`,a:v,u:"m/s",
 dis:[[2*g*h,"Take the square root."],[Math.sqrt(g*h),"mgh = ½mv² gives v = √(2gh)."],[g*h,"Solve mgh = ½mv² for v."]],
 steps:[`No friction: mechanical energy is conserved.`,`mgh = ½mv² (mass cancels).`,`v = √(2gh) = √(2·9.8·${h}) = <b>${N(v)} m/s</b>.`]}; });
A(M(3),2,"Spring launcher",()=>{ const k=R(100,800), x=r(0.05,0.25,2), m=r(0.05,0.5,2); const v=x*Math.sqrt(k/m);
 return {q:`A spring (k = ${k} N/m) is compressed ${x} m and launches a ${m} kg ball across a frictionless floor. What is the ball's launch speed?`,a:v,u:"m/s",
 dis:[[k*x/m,"Use energy: ½kx² = ½mv²."],[Math.sqrt(k*x/m),"The spring energy is ½kx², so x is squared."],[x*Math.sqrt(2*k/m),"The ½ on each side cancels: v = x√(k/m)."]],
 steps:[`Spring energy → kinetic energy: ½kx² = ½mv².`,`v = x√(k/m) = ${x}·√(${k}/${m}).`,`v = <b>${N(v)} m/s</b>.`]}; });
A(M(3),2,"Work from a force–position graph",()=>{ const F=R(10,60), x1=R(2,5), x2=x1+R(2,5); const W=0.5*F*x1+F*(x2-x1);
 return {q:`The graph shows the force on a cart versus its position. How much work does the force do from x = 0 to x = ${x2} m?`,fig:ZP.graph({xmin:0,xmax:x2,ymin:0,ymax:F+10,xs:1,ys:10,pts:[[0,0],[x1,F],[x2,F]],xl:"x (m)",yl:"F (N)"}),a:W,u:"J",
 dis:[[F*x2,"The first part is a triangle."],[F/x1,"That is the slope, not the area."],[0.5*F*x2,"Only the first section is a triangle."]],
 steps:[`Work = area under the F–x graph.`,`Triangle: ½·${x1}·${F} = ${N(0.5*F*x1)} J; rectangle: ${x2-x1}·${F} = ${F*(x2-x1)} J.`,`W = <b>${N(W)} J</b>.`]}; });
A(M(3),2,"Power and velocity",()=>{ const F=R(200,3000), v=R(5,30);
 return {q:`A car's engine exerts a ${F} N forward force while the car moves at a constant ${v} m/s. What power does the engine deliver?`,a:F*v,u:"W",
 dis:[[F/v,"P = Fv."],[0.5*F*v,"No ½: P = Fv for a constant force."],[F*v*v,"P = Fv, not Fv²."]],
 steps:[`P = W/t = F(Δx/Δt) = Fv.`,`P = ${F}·${v} = <b>${N(F*v)} W</b>.`]}; });
A(M(3),3,"Stopping distance with friction (energy)",()=>{ const v=R(5,25), mu=r(0.2,0.8,2); const d=v*v/(2*mu*g);
 return {q:`A hockey puck slides at ${v} m/s onto a rough patch where μ<sub>k</sub> = ${mu}. How far does it slide before stopping?`,a:d,u:"m",
 dis:[[v*v/(mu*g),"½mv² = μmgd gives d = v²/(2μg)."],[v/(mu*g),"That is the stopping time."],[v*v/(2*g),"Friction depends on μ."]],
 steps:[`Friction's negative work removes all the kinetic energy: μmgd = ½mv².`,`d = v²/(2μg) = ${v}²/(2·${mu}·9.8).`,`d = <b>${N(d)} m</b>.`]}; });
A(M(3),3,"Energy with friction on a ramp",()=>{ const h=R(2,10), m=R(2,20), f=R(5,30), th=P([20,30,40]); const L=h/sin(th); const v2=2*g*h-2*f*L/m; if(v2<=1) return null; const v=Math.sqrt(v2);
 return {q:`A ${m} kg block slides from rest down a ramp of height ${h} m inclined at ${th}°. A constant ${f} N friction force acts along the ramp. What is its speed at the bottom?`,a:v,u:"m/s",
 dis:[[Math.sqrt(2*g*h),"You ignored the energy lost to friction."],[Math.sqrt(2*g*h-2*f*h/m),"Friction acts over the ramp length L = h/sinθ, not the height."],[Math.sqrt(2*g*h+2*f*L/m),"Friction removes energy; subtract its work."]],
 steps:[`Ramp length L = h/sinθ = ${h}/sin${th}° = ${N(L)} m.`,`mgh − fL = ½mv².`,`${N(m*g*h)} − ${N(f*L)} = ½·${m}·v².`,`v = <b>${N(v)} m/s</b>.`]}; });
A(M(3),3,"Spring and height",()=>{ const k=R(200,1200), x=r(0.1,0.3,2), m=r(0.1,0.8,2); const h=k*x*x/(2*m*g);
 return {q:`A ${m} kg ball sits on a vertical spring (k = ${k} N/m) compressed by ${x} m. When released, how high above its release point does it rise? (Treat the launch as all spring energy going into height.)`,a:h,u:"m",
 dis:[[k*x*x/(m*g),"Spring energy is ½kx²."],[k*x/(2*m*g),"x must be squared."],[Math.sqrt(k*x*x/(2*m*g)),"Solve ½kx² = mgh directly for h."]],
 steps:[`½kx² = mgh.`,`h = kx²/(2mg) = ${k}·${x}²/(2·${m}·9.8).`,`h = <b>${N(h)} m</b>.`]}; });

/* ===================== UNIT 4: LINEAR MOMENTUM ===================== */
A(M(4),1,"Momentum",()=>{ const m=r(0.05,2,2), v=R(3,45);
 return {q:`What is the momentum of a ${m} kg ball moving at ${v} m/s?`,a:m*v,u:"kg·m/s",dis:[[0.5*m*v*v,"That is kinetic energy."],[m/v,"p = mv."],[m*v*v,"p = mv, not mv²."]],steps:[`p = mv = ${m}·${v} = <b>${N(m*v)} kg·m/s</b>.`]}; });
A(M(4),1,"Impulse",()=>{ const F=R(100,3000), t=r(0.01,0.2,2), m=r(0.1,1.5,2);
 return P([0,1])?{q:`A bat exerts an average force of ${F} N on a ball for ${t} s. What impulse does it deliver?`,a:F*t,u:"N·s",dis:[[F/t,"J = FΔt."],[0.5*F*t,"No ½ for an average force."],[F*t*t,"J = FΔt."]],steps:[`J = F<sub>avg</sub>Δt = ${F}·${t} = <b>${N(F*t)} N·s</b>.`]}
 :{q:`A ${m} kg ball at rest receives an average force of ${F} N for ${t} s. What speed does it leave with?`,a:F*t/m,u:"m/s",dis:[[F*t,"That is the impulse; divide by mass."],[F/(m*t),"Δv = FΔt/m."],[F*t*m,"Δp = mΔv, so Δv = J/m."]],steps:[`Impulse = change in momentum: FΔt = mΔv.`,`Δv = ${F}·${t}/${m} = <b>${N(F*t/m)} m/s</b>.`]}; });
A(M(4),2,"Perfectly inelastic collision",()=>{ const m1=R(1,10)*100, v1=R(5,25), m2=R(1,10)*100, v2=P([0,0,R(2,8)]);
 const vf=(m1*v1+m2*v2)/(m1+m2);
 return {q:`A ${m1} kg car moving at ${v1} m/s rear-ends a ${m2} kg car moving ${v2?`at ${v2} m/s`:"(at rest)"} in the same direction. They lock together. What is their speed just after the collision?`,a:vf,u:"m/s",
 dis:[[(v1+v2)/2,"Average the momenta, not the speeds."],[m1*v1/m2,"The cars move together, so divide by the total mass."],[Math.sqrt((m1*v1*v1+m2*v2*v2)/(m1+m2)),"Kinetic energy is NOT conserved in a sticking collision; use momentum."]],
 steps:[`Momentum is conserved: m₁v₁ + m₂v₂ = (m₁ + m₂)v<sub>f</sub>.`,`${m1}·${v1} + ${m2}·${v2} = ${m1*v1+m2*v2} kg·m/s.`,`v<sub>f</sub> = ${m1*v1+m2*v2}/${m1+m2} = <b>${N(vf)} m/s</b>.`]}; });
A(M(4),2,"Recoil",()=>{ const m=R(2,6), M=R(40,90), v=R(2,10);
 return {q:`A ${M} kg skater at rest throws a ${m} kg ball forward at ${v} m/s. How fast does the skater recoil?`,a:m*v/M,u:"m/s",dis:[[v,"The skater is heavier, so she moves slower."],[M*v/m,"Upside down: v<sub>skater</sub> = m v/M."],[m*v/(M+m),"The ball and skater move separately."]],
 steps:[`Total momentum starts at zero: 0 = mv + Mv<sub>s</sub>.`,`v<sub>s</sub> = −mv/M = −${m}·${v}/${M}.`,`Speed = <b>${N(m*v/M)} m/s</b> backward.`]}; });
A(M(4),2,"Impulse from a force–time graph",()=>{ const F=R(50,400), t1=r(0.01,0.05,2); const J=0.5*F*2*t1;
 return {q:`The graph shows the force on a ball during a kick. What impulse does the ball receive?`,fig:ZP.graph({xmin:0,xmax:+(2*t1).toFixed(2),ymin:0,ymax:Math.ceil(F/100)*100+50,xs:t1,ys:100,pts:[[0,0],[t1,F],[2*t1,0]],xl:"t (s)",yl:"F (N)"}),a:J,u:"N·s",
 dis:[[F*2*t1,"The area is a triangle: ½ base × height."],[F/(2*t1),"Impulse is the area, not the slope."],[F*t1*0.25,"Area = ½·(base)·(height) with base "+N(2*t1)+" s."]],
 steps:[`Impulse = area under the F–t graph.`,`Triangle: ½·${N(2*t1)} s·${F} N = <b>${N(J)} N·s</b>.`]}; });
A(M(4),2,"Center-of-mass velocity",()=>{ const m1=R(1,8), v1=R(1,10), m2=R(1,8), v2=-R(1,10);
 return {q:`A ${m1} kg cart moves at ${v1} m/s to the right and a ${m2} kg cart moves at ${-v2} m/s to the left. What is the velocity of the system's center of mass (right positive)?`,a:(m1*v1+m2*v2)/(m1+m2),u:"m/s",
 dis:[[(m1*v1-m2*v2)/(m1+m2),"Leftward velocity is negative."],[(v1+v2)/2,"Weight each velocity by mass."],[(m1*v1+m2*v2)/m1,"Divide by the total mass."]],
 steps:[`v<sub>cm</sub> = (m₁v₁ + m₂v₂)/(m₁ + m₂).`,`= (${m1}·${v1} + ${m2}·(${v2}))/${m1+m2} = <b>${N((m1*v1+m2*v2)/(m1+m2))} m/s</b>.`]}; });
A(M(4),3,"Elastic collision",()=>{ const m1=R(1,6), m2=R(1,6), v=R(2,10); if(m1===m2) return null; const v1=(m1-m2)/(m1+m2)*v, v2=2*m1/(m1+m2)*v; const ask=P([1,2]);
 return {q:`A ${m1} kg cart moving at ${v} m/s collides <b>elastically</b> head-on with a ${m2} kg cart at rest. What is the ${ask===1?"first":"second"} cart's velocity after the collision (original direction positive)?`,a:ask===1?v1:v2,u:"m/s",
 dis:ask===1?[[0,"The carts only swap velocities when their masses are equal."],[-v1,"Check the sign: (m₁ − m₂)/(m₁ + m₂)·v."],[m1*v/(m1+m2),"That is the sticking (inelastic) result."]]:[[v,"Equal masses would swap velocities; these masses differ."],[m1*v/m2,"Elastic collisions conserve kinetic energy too; use v₂ = 2m₁v/(m₁ + m₂)."],[m1*v/(m1+m2),"That is the sticking (inelastic) result."]],
 steps:[`Elastic, target at rest: v₁' = (m₁ − m₂)v/(m₁ + m₂), v₂' = 2m₁v/(m₁ + m₂). (Both come from conserving momentum and kinetic energy.)`,`v₁' = (${m1} − ${m2})·${v}/${m1+m2} = ${N(v1)} m/s; v₂' = 2·${m1}·${v}/${m1+m2} = ${N(v2)} m/s.`,`Check momentum: ${m1}·${N(v1)} + ${m2}·${N(v2)} = ${N(m1*v)} kg·m/s ✓.`,`Answer: <b>${N(ask===1?v1:v2)} m/s</b>.`]}; });
A(M(4),3,"Kinetic energy lost in a collision",()=>{ const m1=R(1,6), m2=R(1,6), v=R(3,12); const vf=m1*v/(m1+m2); const lost=0.5*m1*v*v-0.5*(m1+m2)*vf*vf;
 return {q:`A ${m1} kg cart at ${v} m/s hits a ${m2} kg cart at rest and they stick. How much kinetic energy is converted to other forms?`,a:lost,u:"J",
 dis:[[0,"Sticking collisions always lose kinetic energy."],[0.5*m1*v*v,"Some kinetic energy remains after the collision."],[0.5*(m1+m2)*vf*vf,"That is the kinetic energy that remains."]],
 steps:[`v<sub>f</sub> = m₁v/(m₁ + m₂) = ${N(vf)} m/s.`,`K before = ½·${m1}·${v}² = ${N(0.5*m1*v*v)} J; K after = ½·${m1+m2}·${N(vf)}² = ${N(0.5*(m1+m2)*vf*vf)} J.`,`Lost = <b>${N(lost)} J</b>.`]}; });
A(M(4),3,"Ballistic pendulum",()=>{ const m=r(0.005,0.03,3), M=r(1,5,1), v=R(150,500); const V=m*v/(m+M), h=V*V/(2*g);
 return {q:`A ${m} kg bullet moving at ${v} m/s embeds in a ${M} kg block hanging from strings. How high does the block swing?`,a:h,u:"m",
 dis:[[v*v/(2*g),"Momentum (not energy) is conserved during the collision; find the block's speed first."],[0.5*m*v*v/((m+M)*g),"Kinetic energy is lost in the collision; use momentum, then energy."],[V/(2*g),"Square the speed: h = V²/(2g)."]],
 steps:[`Collision (momentum): V = mv/(m + M) = ${N(m*v)}/${N(m+M)} = ${N(V)} m/s.`,`Swing (energy): ½(m + M)V² = (m + M)gh.`,`h = V²/(2g) = <b>${N(h)} m</b>.`]}; });

/* ===================== UNIT 5: TORQUE AND ROTATIONAL DYNAMICS ===================== */
A(M(5),1,"Torque",()=>{ const F=R(10,80), L=r(0.2,1.2,2), th=P([90,90,60,45,30]);
 return {q:`A ${F} N force is applied ${L} m from a door's hinge, at ${th}° to the door. What torque does it produce about the hinge?`,a:F*L*sin(th),u:"N·m",
 dis:[[F*L*cos(th),"Torque uses the perpendicular component: rF sinθ."],[F/L,"τ = rF sinθ."],[F*L*sin(th)/2,"No ½ in torque."]].filter(d=>Math.abs(d[0]-F*L*sin(th))>1e-6),
 steps:[`τ = rF sinθ, where θ is the angle between r and F.`,`τ = ${L}·${F}·sin${th}° = <b>${N(F*L*sin(th))} N·m</b>.`]}; });
A(M(5),1,"Rotational kinematics",()=>{ const w0=R(0,10), al=r(0.5,4,1), t=R(2,10);
 return {q:`A wheel turning at ${w0} rad/s speeds up at ${al} rad/s². What is its angular speed after ${t} s?`,a:w0+al*t,u:"rad/s",dis:[[al*t,"Include ω₀."],[w0+0.5*al*t*t,"That is the angle form; ω = ω₀ + αt."],[w0+al*t*t,"ω grows linearly in t."]],steps:[`ω = ω₀ + αt = ${w0} + ${al}·${t} = <b>${N(w0+al*t)} rad/s</b>.`]}; });
A(M(5),1,"Linear and angular speed",()=>{ const rr=r(0.1,0.8,2), w=R(2,40);
 return {q:`A point is ${rr} m from the axle of a wheel spinning at ${w} rad/s. What is its linear speed?`,a:rr*w,u:"m/s",dis:[[w/rr,"v = rω."],[2*Math.PI*rr*w,"ω is already in rad/s; no 2π needed."],[rr*w*w,"That is centripetal acceleration."]],steps:[`v = rω = ${rr}·${w} = <b>${N(rr*w)} m/s</b>.`]}; });
A(M(5),2,"Angular displacement",()=>{ const w0=R(0,6), al=r(1,5,1), t=R(2,8); const th=w0*t+0.5*al*t*t;
 return {q:`A turntable starts at ${w0} rad/s and has angular acceleration ${al} rad/s². How many revolutions does it make in ${t} s?`,a:th/(2*Math.PI),u:"rev",
 dis:[[th,"That is the angle in radians; divide by 2π."],[(w0*t+al*t*t)/(2*Math.PI),"Include the ½ in ½αt²."],[th/Math.PI,"One revolution is 2π rad."]],
 steps:[`θ = ω₀t + ½αt² = ${w0}·${t} + ½·${al}·${t}² = ${N(th)} rad.`,`Revolutions = θ/(2π) = <b>${N(th/(2*Math.PI))} rev</b>.`]}; });
A(M(5),2,"Seesaw equilibrium",()=>{ const m1=R(20,50), d1=r(1,2.5,1), m2=R(20,60); const d2=m1*d1/m2;
 return {q:`A ${m1} kg child sits ${d1} m from the pivot of a seesaw. Where must a ${m2} kg child sit on the other side to balance it?`,a:d2,u:"m from the pivot",
 dis:[[m2*d1/m1,"Torques balance: m₁d₁ = m₂d₂, so d₂ = m₁d₁/m₂."],[d1,"Equal distances balance only equal masses."],[d1*m1/(m1+m2),"Set the two torques equal."]],
 steps:[`Balance: clockwise torque = counterclockwise torque.`,`m₁g·d₁ = m₂g·d₂ (g cancels).`,`d₂ = ${m1}·${d1}/${m2} = <b>${N(d2)} m</b>.`]}; });
A(M(5),2,"Newton's second law for rotation",()=>{ const M=R(2,20), Rr=r(0.1,0.5,2), F=R(5,40); const I=0.5*M*Rr*Rr, al=F*Rr/I;
 return {q:`A solid disk (I = ½MR²) of mass ${M} kg and radius ${Rr} m spins on a fixed axle. A ${F} N force is applied tangent to the rim. What is the angular acceleration?`,a:al,u:"rad/s²",
 dis:[[F*Rr/(M*Rr*Rr),"A solid disk has I = ½MR², not MR²."],[F/M,"That is a linear acceleration; use α = τ/I."],[F*Rr,"That is the torque τ; divide by I to get α."]],
 steps:[`τ = FR = ${F}·${Rr} = ${N(F*Rr)} N·m.`,`I = ½MR² = ½·${M}·${Rr}² = ${N(I)} kg·m².`,`α = τ/I = <b>${N(al)} rad/s²</b>.`]}; });
A(M(5),2,"Moment of inertia of point masses",()=>{ const m1=R(1,5), r1=r(0.2,1,1), m2=R(1,5), r2=r(0.2,1.5,1); const I=m1*r1*r1+m2*r2*r2;
 return {q:`Two small masses on a light rod rotate about an axis: ${m1} kg at ${r1} m and ${m2} kg at ${r2} m from the axis. What is the rotational inertia?`,a:I,u:"kg·m²",
 dis:[[m1*r1+m2*r2,"Square each distance: I = Σmr²."],[(m1+m2)*(r1+r2)**2,"Add mr² for each mass separately."],[0.5*I,"Point masses have no ½."]],
 steps:[`I = Σmr² = ${m1}·${r1}² + ${m2}·${r2}².`,`I = ${N(m1*r1*r1)} + ${N(m2*r2*r2)} = <b>${N(I)} kg·m²</b>.`]}; });
A(M(5),3,"Pulley with mass",()=>{ const m=R(1,6), M=R(2,10), Rr=0.2; const a=m*g/(m+M/2), T=m*(g-a);
 const ask=P(["a","T"]);
 return {q:`A ${m} kg block hangs from a light string wrapped around a solid-disk pulley (mass ${M} kg, I = ½MR²) on a frictionless axle. Find the ${ask==="a"?"block's acceleration":"string tension"}.`,a:ask==="a"?a:T,u:ask==="a"?"m/s²":"N",
 dis:ask==="a"?[[g,"The pulley's inertia slows the block."],[m*g/(m+M),"For a disk, I/R² = M/2, so divide by m + M/2."],[m*g/M,"Include the block's own mass."]]:[[m*g,"The block accelerates, so T < mg."],[0,"The string must turn the pulley, so T > 0."],[M*g/2,"Find a first, then T = m(g − a)."]],
 steps:[`Block: mg − T = ma. Pulley: TR = Iα = (½MR²)(a/R) → T = ½Ma.`,`Add: mg = (m + ½M)a → a = ${m}·9.8/${N(m+M/2)} = ${N(a)} m/s².`,ask==="a"?`<b>a = ${N(a)} m/s²</b> (the radius cancels).`:`T = ½Ma = ½·${M}·${N(a)} = <b>${N(T)} N</b>.`]}; });
A(M(5),3,"Beam on two supports",()=>{ const L=R(4,10), W=R(100,500), Wx=R(100,800), x=r(0.5,L-0.5,1); const Fr=(W*L/2+Wx*x)/L, Fl=W+Wx-Fr; const ask=P(["L","R"]);
 return {q:`A uniform ${L} m beam weighing ${W} N rests on supports at its two ends. A ${Wx} N crate sits ${x} m from the left end. What force does the <b>${ask==="L"?"left":"right"}</b> support exert?`,a:ask==="L"?Fl:Fr,u:"N",
 dis:[[(W+Wx)/2,"The crate is not at the center, so the supports do not share the load equally."],[ask==="L"?Fr:Fl,"That is the force from the other support."],[Wx*x/L,"Include the beam's weight, acting at its center."]],
 steps:[`Take torques about the left end (so the left force has no torque).`,`F<sub>R</sub>·${L} = ${W}·${L/2} + ${Wx}·${x} → F<sub>R</sub> = ${N(Fr)} N.`,`Vertical forces: F<sub>L</sub> + F<sub>R</sub> = ${W+Wx} N → F<sub>L</sub> = ${N(Fl)} N.`,`Answer: <b>${N(ask==="L"?Fl:Fr)} N</b>.`]}; });
A(M(5),3,"Rotational inertia comparison",()=>{ const sh=P([["hoop","MR²",1],["solid disk","½MR²",0.5],["solid sphere","⅖MR²",0.4],["thin rod about its center","(1/12)ML²",1/12]]); const M=R(1,8), Rr=r(0.2,1,1); const I=sh[2]*M*Rr*Rr;
 return {q:`Find the rotational inertia of a ${sh[0]} with mass ${M} kg and ${sh[0].includes("rod")?"length":"radius"} ${Rr} m (about its center; I = ${sh[1]}).`,a:I,u:"kg·m²",
 dis:[[M*Rr*Rr*(sh[2]===1?0.5:1),"Use the shape's own formula."],[sh[2]*M*Rr,"The size is squared."],[sh[2]*M*M*Rr*Rr,"Mass is not squared."]],
 steps:[`I = ${sh[1]} = ${N(sh[2])}·${M}·${Rr}² = <b>${N(I)} kg·m²</b>.`,`Shapes with more mass far from the axis have larger I.`]}; });

/* ===================== UNIT 6: ENERGY AND MOMENTUM OF ROTATING SYSTEMS ===================== */
A(M(6),1,"Rotational kinetic energy",()=>{ const I=r(0.1,5,2), w=R(2,30);
 return {q:`A flywheel with rotational inertia ${I} kg·m² spins at ${w} rad/s. What is its rotational kinetic energy?`,a:0.5*I*w*w,u:"J",dis:[[I*w*w,"K = ½Iω²."],[0.5*I*w,"ω is squared."],[I*w,"That is angular momentum."]],steps:[`K = ½Iω² = ½·${I}·${w}² = <b>${N(0.5*I*w*w)} J</b>.`]}; });
A(M(6),1,"Angular momentum",()=>{ const I=r(0.2,6,1), w=R(2,20);
 return {q:`What is the angular momentum of a wheel with I = ${I} kg·m² spinning at ${w} rad/s?`,a:I*w,u:"kg·m²/s",dis:[[0.5*I*w*w,"That is rotational kinetic energy."],[I/w,"L = Iω."],[I*w*w,"L = Iω."]],steps:[`L = Iω = ${I}·${w} = <b>${N(I*w)} kg·m²/s</b>.`]}; });
A(M(6),2,"Spinning skater",()=>{ const I1=r(2,6,1), w1=r(1,4,1), I2=r(0.8,I1-0.6,1);
 return {q:`A skater spins at ${w1} rad/s with rotational inertia ${I1} kg·m². She pulls in her arms so her rotational inertia drops to ${I2} kg·m². What is her new angular speed?`,a:I1*w1/I2,u:"rad/s",
 dis:[[I2*w1/I1,"Smaller I means faster spin: ω₂ = I₁ω₁/I₂."],[w1,"Angular momentum is conserved, not ω."],[w1*Math.sqrt(I1/I2),"Kinetic energy is not conserved here; angular momentum is."]],
 steps:[`No external torque, so L is conserved: I₁ω₁ = I₂ω₂.`,`ω₂ = ${I1}·${w1}/${I2} = <b>${N(I1*w1/I2)} rad/s</b>.`,`Her kinetic energy increases: she does work pulling her arms in.`]}; });
A(M(6),2,"Rolling down an incline",()=>{ const sh=P([["solid sphere",0.4],["solid cylinder",0.5],["hoop",1]]), h=r(0.5,5,1); const v=Math.sqrt(2*g*h/(1+sh[1]));
 return {q:`A ${sh[0]} (I = ${sh[1]===0.4?"⅖":sh[1]===0.5?"½":""}MR²) rolls without slipping from rest down a ramp of height ${h} m. What is its speed at the bottom?`,a:v,u:"m/s",
 dis:[[Math.sqrt(2*g*h),"That ignores rotational kinetic energy; that would be a sliding block."],[Math.sqrt(g*h),"Use mgh = ½mv² + ½Iω² with ω = v/R."],[Math.sqrt(2*g*h*sh[1]),"Divide by (1 + I/(mR²)), do not multiply."]],
 steps:[`mgh = ½mv² + ½Iω², with ω = v/R for rolling.`,`½Iω² = ½(${sh[1]}mR²)(v/R)² = ${sh[1]}·½mv².`,`mgh = ½mv²(1 + ${sh[1]}) → v = √(2gh/${1+sh[1]}).`,`v = <b>${N(v)} m/s</b>.`]}; });
A(M(6),2,"Angular impulse",()=>{ const tau=r(0.5,20,1), t=r(0.5,5,1), I=r(0.2,4,1);
 return {q:`A constant torque of ${tau} N·m acts for ${t} s on a wheel (I = ${I} kg·m²) that starts at rest. What angular speed does it reach?`,a:tau*t/I,u:"rad/s",dis:[[tau*t,"That is ΔL; divide by I."],[tau/I,"That is α; multiply by time."],[tau*t*I,"ω = τΔt/I."]],steps:[`Angular impulse = change in angular momentum: τΔt = IΔω.`,`ω = ${tau}·${t}/${I} = <b>${N(tau*t/I)} rad/s</b>.`]}; });
A(M(6),3,"Rotational collision",()=>{ const I1=r(0.5,3,1), w1=R(4,20), I2=r(0.5,3,1); const w=I1*w1/(I1+I2), lost=0.5*I1*w1*w1-0.5*(I1+I2)*w*w; const ask=P(["w","K"]);
 return {q:`A disk (I = ${I1} kg·m²) spinning at ${w1} rad/s is dropped onto a second disk (I = ${I2} kg·m²) at rest on the same axle. They stick together. ${ask==="w"?"What is their final angular speed?":"How much kinetic energy is lost?"}`,a:ask==="w"?w:lost,u:ask==="w"?"rad/s":"J",
 dis:ask==="w"?[[w1/2,"Weight by rotational inertia, not a plain average."],[w1*Math.sqrt(I1/(I1+I2)),"Kinetic energy is not conserved; use angular momentum."],[I2*w1/(I1+I2),"Only disk 1 had angular momentum at first."]]:[[0,"A sticking collision loses energy."],[0.5*I1*w1*w1,"Some kinetic energy remains."],[0.5*(I1+I2)*w*w,"That is what remains."]],
 steps:[`Angular momentum is conserved: I₁ω₁ = (I₁ + I₂)ω.`,`ω = ${I1}·${w1}/${N(I1+I2)} = ${N(w)} rad/s.`,ask==="w"?`<b>ω = ${N(w)} rad/s</b>.`:`K₁ = ½·${I1}·${w1}² = ${N(0.5*I1*w1*w1)} J; K₂ = ½·${N(I1+I2)}·${N(w)}² = ${N(0.5*(I1+I2)*w*w)} J. Lost = <b>${N(lost)} J</b>.`]}; });
A(M(6),3,"Person on a merry-go-round",()=>{ const I=R(100,400), w=r(0.5,2,1), m=R(30,70), rr=r(1,2.5,1); const w2=I*w/(I+m*rr*rr);
 return {q:`A merry-go-round (I = ${I} kg·m²) turns at ${w} rad/s. A ${m} kg child, initially at rest, jumps on at the rim, ${rr} m from the axis (treat the child as a point mass). What is the new angular speed?`,a:w2,u:"rad/s",
 dis:[[w,"The child adds rotational inertia, so ω drops."],[I*w/(I+m*rr),"A point mass has I = mr²."],[I*w/(I+0.5*m*rr*rr),"The child is a point mass: I = mr², not ½mr²."]],
 steps:[`Child's I = mr² = ${m}·${rr}² = ${N(m*rr*rr)} kg·m².`,`Conserve L: ${I}·${w} = (${I} + ${N(m*rr*rr)})ω.`,`ω = <b>${N(w2)} rad/s</b>.`]}; });
A(M(6),3,"Work done by a torque",()=>{ const tau=r(2,30,1), rev=R(2,15), I=r(0.5,5,1); const W=tau*2*Math.PI*rev, w=Math.sqrt(2*W/I);
 return {q:`A constant torque of ${tau} N·m turns a wheel (I = ${I} kg·m²) from rest through ${rev} revolutions. What is its final angular speed?`,a:w,u:"rad/s",
 dis:[[Math.sqrt(2*tau*rev/I),"Convert revolutions to radians (×2π)."],[2*W/I,"Take the square root: W = ½Iω²."],[Math.sqrt(W/I),"W = ½Iω², so ω = √(2W/I)."]],
 steps:[`Δθ = ${rev}·2π = ${N(2*Math.PI*rev)} rad.`,`W = τΔθ = ${N(W)} J = ½Iω².`,`ω = √(2·${N(W)}/${I}) = <b>${N(w)} rad/s</b>.`]}; });

/* ===================== UNIT 7: OSCILLATIONS ===================== */
A(M(7),1,"Mass–spring period",()=>{ const m=r(0.1,3,2), k=R(10,500);
 return {q:`A ${m} kg block oscillates on a spring with k = ${k} N/m. What is the period?`,a:2*Math.PI*Math.sqrt(m/k),u:"s",dis:[[2*Math.PI*Math.sqrt(k/m),"Upside down: T = 2π√(m/k)."],[Math.sqrt(m/k),"Include 2π."],[2*Math.PI*m/k,"Take the square root."]],steps:[`T = 2π√(m/k) = 2π√(${m}/${k}) = <b>${N(2*Math.PI*Math.sqrt(m/k))} s</b>.`]}; });
A(M(7),1,"Pendulum period",()=>{ const L=r(0.2,3,2);
 return {q:`What is the period of a simple pendulum of length ${L} m on Earth (small swings)?`,a:2*Math.PI*Math.sqrt(L/g),u:"s",dis:[[2*Math.PI*Math.sqrt(g/L),"T = 2π√(L/g)."],[Math.sqrt(L/g),"Include 2π."],[2*Math.PI*L/g,"Take the square root."]],steps:[`T = 2π√(L/g) = 2π√(${L}/9.8) = <b>${N(2*Math.PI*Math.sqrt(L/g))} s</b>. Mass and (small) amplitude do not matter.`]}; });
A(M(7),1,"Frequency and period",()=>{ const n=R(10,60), t=R(5,30);
 return {q:`A buoy bobs up and down ${n} times in ${t} s. What is its frequency?`,a:n/t,u:"Hz",dis:[[t/n,"That is the period."],[2*Math.PI*n/t,"That is angular frequency ω, in rad/s."],[n*t,"f = cycles ÷ time."]],steps:[`f = cycles/time = ${n}/${t} = <b>${N(n/t)} Hz</b>; period T = 1/f = ${N(t/n)} s.`]}; });
A(M(7),2,"Maximum speed in SHM",()=>{ const A=r(0.02,0.3,2), k=R(20,400), m=r(0.1,2,1); const v=A*Math.sqrt(k/m);
 return {q:`A ${m} kg mass on a spring (k = ${k} N/m) oscillates with amplitude ${A} m. What is its maximum speed?`,a:v,u:"m/s",dis:[[A*k/m,"That is the maximum acceleration, Aω²."],[A*Math.sqrt(m/k),"ω = √(k/m)."],[A*Math.sqrt(2*k/m),"½kA² = ½mv² → v = A√(k/m)."]],steps:[`Energy: ½kA² = ½mv<sub>max</sub>² (at equilibrium all energy is kinetic).`,`v<sub>max</sub> = A√(k/m) = ${A}·√(${k}/${m}) = <b>${N(v)} m/s</b>.`]}; });
A(M(7),2,"Changing mass on a spring",()=>{ const k=P([2,3,4,9]), T=r(0.4,3,1);
 return {q:`A block on a spring oscillates with period ${T} s. If the mass is multiplied by ${k} (same spring), what is the new period?`,a:T*Math.sqrt(k),u:"s",dis:[[T*k,"T ∝ √m."],[T/Math.sqrt(k),"More mass oscillates more slowly (longer period)."],[T,"Period depends on mass for a spring."]],steps:[`T = 2π√(m/k), so T ∝ √m.`,`T' = ${T}·√${k} = <b>${N(T*Math.sqrt(k))} s</b>.`]}; });
A(M(7),2,"Spring constant from period",()=>{ const m=r(0.2,2,1), T=r(0.3,2,2);
 return {q:`A ${m} kg mass on a spring has period ${T} s. What is the spring constant?`,a:4*Math.PI*Math.PI*m/(T*T),u:"N/m",dis:[[2*Math.PI*m/T,"Square both sides of T = 2π√(m/k)."],[4*Math.PI*Math.PI*T*T/m,"Solve carefully: k = 4π²m/T²."],[m/(T*T),"Include 4π²."]],steps:[`T = 2π√(m/k) → T² = 4π²m/k.`,`k = 4π²m/T² = 4π²·${m}/${T}² = <b>${N(4*Math.PI*Math.PI*m/(T*T))} N/m</b>.`]}; });
A(M(7),3,"Pendulum on another planet",()=>{ const L=r(0.5,2,1), T=r(1.5,5,2); const gp=4*Math.PI*Math.PI*L/(T*T);
 return {q:`On a distant planet a ${L} m pendulum has a period of ${T} s. What is g on that planet?`,a:gp,u:"m/s²",dis:[[2*Math.PI*L/T,"Square: g = 4π²L/T²."],[4*Math.PI*Math.PI*T*T/L,"g = 4π²L/T²."],[L/(T*T),"Include 4π²."]],steps:[`T = 2π√(L/g) → g = 4π²L/T².`,`g = 4π²·${L}/${T}² = <b>${N(gp)} m/s²</b>.`]}; });
A(M(7),3,"Speed at a given position in SHM",()=>{ const A=r(0.1,0.4,2), x=+(A*r(0.2,0.8,1)).toFixed(3), k=R(50,400), m=r(0.2,2,1); const v=Math.sqrt(k/m*(A*A-x*x));
 return {q:`A ${m} kg block on a spring (k = ${k} N/m) has amplitude ${A} m. What is its speed when it is ${x} m from equilibrium?`,a:v,u:"m/s",dis:[[A*Math.sqrt(k/m),"That is the maximum speed, at x = 0."],[Math.sqrt(k/m)*(A-x),"Use energy: ½kA² = ½kx² + ½mv²."],[Math.sqrt(k/m)*x,"Use v = √(k/m)·√(A² − x²)."]],
 steps:[`Energy: ½kA² = ½kx² + ½mv².`,`v = √((k/m)(A² − x²)) = √((${k}/${m})(${A}² − ${x}²)).`,`v = <b>${N(v)} m/s</b>.`]}; });
A(M(7),3,"Position from x(t)",()=>{ const A=r(0.05,0.3,2), T=r(0.5,4,1), t=r(0.1,T,2); const x=A*Math.cos(2*Math.PI*t/T);
 return {q:`An oscillator starts at maximum displacement, so x(t) = A cos(2πt/T), with A = ${A} m and T = ${T} s. What is x at t = ${t} s?`,a:x,u:"m",dis:[[A,"That is x at t = 0; time has passed since then."],[A*Math.sin(2*Math.PI*t/T),"Starting at maximum displacement means cosine."],[A*Math.cos(2*Math.PI*t/T*Math.PI/180),"Your calculator was in degree mode; the angle 2πt/T is in radians."]],
 steps:[`Angle: 2πt/T = 2π·${t}/${T} = ${N(2*Math.PI*t/T)} rad (radian mode!).`,`x = ${A}·cos(${N(2*Math.PI*t/T)}) = <b>${N(x)} m</b>.`]}; });

/* ===================== UNIT 8 (P1 ONLY): FLUIDS ===================== */
const F8=["p1:8"];
A(F8,1,"Density",()=>{ const m=r(0.2,30,1), V=r(0.0002,0.02,4);
 return {q:`A ${m} kg object has a volume of ${V} m³. What is its density?`,a:m/V,u:"kg/m³",dis:[[V/m,"ρ = m/V."],[m*V,"ρ = m/V."],[m/V/1000,"Keep SI units: kg/m³."]],steps:[`ρ = m/V = ${m}/${V} = <b>${N(m/V)} kg/m³</b>.`]}; });
A(F8,1,"Pressure",()=>{ const F=R(100,900), A=r(0.01,0.5,2);
 return {q:`A ${F} N force pushes evenly on an area of ${A} m². What pressure does it exert?`,a:F/A,u:"Pa",dis:[[F*A,"P = F/A."],[A/F,"P = F/A."],[F/(A*A),"Area is already in m²."]],steps:[`P = F/A = ${F}/${A} = <b>${N(F/A)} Pa</b>.`]}; });
A(F8,2,"Pressure at depth",()=>{ const h=r(1,40,1), fl=P([["fresh water",1000],["sea water",1025]]); const P0=1.01e5; const ask=P(["abs","g"]);
 return {q:`What is the ${ask==="abs"?"absolute":"gauge"} pressure ${h} m below the surface of ${fl[0]} (ρ = ${fl[1]} kg/m³)? Atmospheric pressure is 1.01 × 10⁵ Pa.`,a:ask==="abs"?P0+fl[1]*g*h:fl[1]*g*h,u:"Pa",
 dis:ask==="abs"?[[fl[1]*g*h,"That is gauge pressure; add atmospheric pressure."],[P0+fl[1]*h,"Include g: P = P₀ + ρgh."],[P0-fl[1]*g*h,"Pressure increases with depth."]]:[[P0+fl[1]*g*h,"That is absolute pressure."],[fl[1]*h,"Include g."],[fl[1]*g/h,"Pressure grows with depth: ρgh."]],
 steps:[`ρgh = ${fl[1]}·9.8·${h} = ${N(fl[1]*g*h)} Pa.`,ask==="abs"?`P = P₀ + ρgh = <b>${N(P0+fl[1]*g*h)} Pa</b>.`:`Gauge pressure = ρgh = <b>${N(fl[1]*g*h)} Pa</b>.`]}; });
A(F8,2,"Buoyant force",()=>{ const V=r(0.001,0.05,3);
 return {q:`A ${V} m³ rock is completely submerged in water (ρ = 1000 kg/m³). What buoyant force acts on it?`,a:1000*V*g,u:"N",dis:[[1000*V,"Include g: F<sub>b</sub> = ρ<sub>fluid</sub>Vg."],[V*g,"Use the water's density."],[1000*V*g/2,"Fully submerged: all of V displaces water."]],steps:[`Archimedes: F<sub>b</sub> = weight of displaced fluid = ρ<sub>fluid</sub>V<sub>sub</sub>g.`,`F<sub>b</sub> = 1000·${V}·9.8 = <b>${N(1000*V*g)} N</b>.`]}; });
A(F8,2,"Floating fraction",()=>{ const ro=R(300,950);
 return {q:`A block of density ${ro} kg/m³ floats in water (1000 kg/m³). What fraction of its volume is under water?`,a:ro/1000,u:"",sf:3,dis:[[1-ro/1000,"That is the fraction above the water."],[1000/ro,"A fraction can't exceed 1: it's ρ<sub>object</sub>/ρ<sub>fluid</sub>."],[ro/2000,"Floating: weight = buoyant force → V<sub>sub</sub>/V = ρ<sub>obj</sub>/ρ<sub>fluid</sub>."]],
 steps:[`Floating: F<sub>b</sub> = weight → ρ<sub>w</sub>V<sub>sub</sub>g = ρ<sub>obj</sub>Vg.`,`V<sub>sub</sub>/V = ${ro}/1000 = <b>${N(ro/1000)}</b>.`]}; });
A(F8,2,"Continuity equation",()=>{ const d1=r(2,6,1), d2=r(0.5,d1-0.5,1), v1=r(0.5,4,1); const v2=v1*(d1/d2)**2;
 return {q:`Water flows at ${v1} m/s through a pipe of diameter ${d1} cm, which narrows to ${d2} cm. What is the speed in the narrow part?`,a:v2,u:"m/s",dis:[[v1*d1/d2,"Area depends on diameter squared."],[v1*d2*d2/(d1*d1),"Narrower pipe → faster flow."],[v1,"The flow rate is constant, so speed changes."]],steps:[`A₁v₁ = A₂v₂ and A ∝ d².`,`v₂ = v₁(d₁/d₂)² = ${v1}(${d1}/${d2})² = <b>${N(v2)} m/s</b>.`]}; });
A(F8,2,"Apparent weight in water",()=>{ const m=r(1,10,1), ro=R(2000,8000); const V=m/ro, W=m*g-1000*V*g;
 return {q:`A ${m} kg metal object (density ${ro} kg/m³) hangs from a spring scale, fully submerged in water. What does the scale read?`,a:W,u:"N",dis:[[m*g,"Water pushes up with a buoyant force."],[1000*V*g,"That is just the buoyant force."],[m*g+1000*V*g,"Buoyancy points up; subtract it."]],steps:[`V = m/ρ = ${N(V)} m³.`,`F<sub>b</sub> = 1000·V·9.8 = ${N(1000*V*g)} N.`,`Scale = mg − F<sub>b</sub> = ${N(m*g)} − ${N(1000*V*g)} = <b>${N(W)} N</b>.`]}; });
A(F8,3,"Bernoulli's equation",()=>{ const v1=r(1,3,1), k=P([2,3,4]), v2=v1*k; const dP=0.5*1000*(v2*v2-v1*v1);
 return {q:`Water (1000 kg/m³) in a horizontal pipe speeds up from ${v1} m/s to ${N(v2)} m/s where the pipe narrows. How much lower is the pressure in the narrow section?`,a:dP,u:"Pa",dis:[[0.5*1000*(v2-v1)**2,"Use v₂² − v₁², not (v₂ − v₁)²."],[1000*(v2*v2-v1*v1),"Include the ½."],[0.5*1000*v2*v2,"Subtract the starting ½ρv₁²."]],
 steps:[`Horizontal pipe, so ρgy terms cancel: P₁ + ½ρv₁² = P₂ + ½ρv₂².`,`P₁ − P₂ = ½ρ(v₂² − v₁²) = ½·1000·(${N(v2*v2)} − ${N(v1*v1)}).`,`ΔP = <b>${N(dP)} Pa</b>.`]}; });
A(F8,3,"Torricelli's theorem",()=>{ const h=r(0.5,8,1);
 return {q:`Water leaks from a small hole ${h} m below the surface of an open tank. How fast does it come out?`,a:Math.sqrt(2*g*h),u:"m/s",dis:[[2*g*h,"Take the square root."],[Math.sqrt(g*h),"v = √(2gh)."],[g*h/2,"v = √(2gh)."]],steps:[`Bernoulli from the surface (v ≈ 0, P = P₀) to the hole (P = P₀): ρgh = ½ρv².`,`v = √(2gh) = √(2·9.8·${h}) = <b>${N(Math.sqrt(2*g*h))} m/s</b>.`]}; });
A(F8,3,"Hydraulic lift",()=>{ const d1=R(2,6), d2=R(20,60), W=R(8000,20000);
 return {q:`A hydraulic lift has a small piston of diameter ${d1} cm and a large piston of diameter ${d2} cm. What force on the small piston lifts a ${W} N car?`,a:W*(d1/d2)**2,u:"N",dis:[[W*d1/d2,"Area goes as diameter squared."],[W*(d2/d1)**2,"The small piston needs a smaller force."],[W,"The lift multiplies force."]],steps:[`Pascal: pressure is the same on both pistons: F₁/A₁ = F₂/A₂.`,`F₁ = F₂(d₁/d₂)² = ${W}(${d1}/${d2})² = <b>${N(W*(d1/d2)**2)} N</b>.`]}; });
A(F8,3,"Flow rate",()=>{ const d=r(1,5,1), v=r(0.5,5,1); const A=Math.PI*(d/200)**2; const Q=A*v;
 return {q:`Water flows at ${v} m/s through a pipe of diameter ${d} cm. What is the volume flow rate?`,a:Q,u:"m³/s",dis:[[Math.PI*(d/100)**2*v,"Use the radius (d/2), not the diameter."],[Math.PI*(d/2)**2*v,"Convert cm to m."],[v/A,"Q = Av."]],steps:[`r = ${d/2} cm = ${N(d/200)} m; A = πr² = ${N(A)} m².`,`Q = Av = ${N(A)}·${v} = <b>${N(Q)} m³/s</b>.`]}; });

/* ===================== PHYSICS C: MECHANICS CALCULUS EXTRAS ===================== */
const C=u=>["cm:"+u];
A(C(1),2,"Velocity from x(t) (derivative)",()=>{ const a=R(1,4), b=R(1,6), c=R(0,9), t=R(1,4); const v=3*a*t*t-2*b*t+c;
 return {q:`A particle's position is x(t) = ${a}t³ − ${b}t² + ${c}t (meters, seconds). What is its velocity at t = ${t} s?`,a:v,u:"m/s",dis:[[a*t**3-b*t*t+c*t,"That is the position; velocity is dx/dt."],[6*a*t-2*b,"That is the acceleration."],[3*a*t*t-2*b*t,"Include the derivative of "+c+"t."]],
 steps:[`v = dx/dt = ${3*a}t² − ${2*b}t + ${c}.`,`v(${t}) = ${3*a}·${t*t} − ${2*b}·${t} + ${c} = <b>${N(v)} m/s</b>.`]}; });
A(C(1),2,"Acceleration from x(t)",()=>{ const a=R(1,4), b=R(1,6), t=R(1,5); const ac=6*a*t-2*b;
 return {q:`x(t) = ${a}t³ − ${b}t² (m). What is the acceleration at t = ${t} s?`,a:ac,u:"m/s²",dis:[[3*a*t*t-2*b*t,"That is the velocity."],[6*a*t,"Differentiate −"+b+"t² twice too."],[a*t**3-b*t*t,"That is position."]],steps:[`v = ${3*a}t² − ${2*b}t; a = dv/dt = ${6*a}t − ${2*b}.`,`a(${t}) = <b>${N(ac)} m/s²</b>.`]}; });
A(C(1),3,"Displacement from v(t) (integral)",()=>{ const k=R(1,5), c=R(0,6), T=R(2,5); const d=k*T**3/3+c*T;
 return {q:`A particle's velocity is v(t) = ${k}t² + ${c} (m/s). What is its displacement from t = 0 to t = ${T} s?`,a:d,u:"m",dis:[[k*T*T+c,"That is v(T); integrate to get displacement."],[2*k*T,"That is the acceleration."],[k*T**3+c*T,"∫t² dt = t³/3."]],steps:[`Δx = ∫₀^${T} (${k}t² + ${c}) dt = [${k}t³/3 + ${c}t]₀^${T}.`,`= ${k}·${T**3}/3 + ${c}·${T} = <b>${N(d)} m</b>.`]}; });
A(C(1),3,"Velocity from a(t)",()=>{ const k=R(1,6), v0=R(0,8), T=R(1,5); const v=v0+k*T*T/2;
 return {q:`A cart has acceleration a(t) = ${k}t (m/s²) and velocity ${v0} m/s at t = 0. What is its velocity at t = ${T} s?`,a:v,u:"m/s",dis:[[k*T,"That is a(T); integrate."],[k*T*T/2,"Add the initial velocity."],[v0+k*T*T,"∫t dt = t²/2."]],steps:[`v = v₀ + ∫₀^t a dt = ${v0} + ${k}t²/2.`,`v(${T}) = ${v0} + ${N(k*T*T/2)} = <b>${N(v)} m/s</b>.`]}; });
A(C(2),2,"Terminal velocity (linear drag)",()=>{ const m=r(0.01,2,2), b=r(0.05,2,2);
 return {q:`An object of mass ${m} kg falls through a fluid with drag force F = −bv, b = ${b} kg/s. What is its terminal speed?`,a:m*g/b,u:"m/s",dis:[[b/(m*g),"At terminal speed bv = mg → v = mg/b."],[Math.sqrt(m*g/b),"Linear drag: no square root."],[m/b,"Include g."]],steps:[`At terminal speed the net force is zero: bv<sub>T</sub> = mg.`,`v<sub>T</sub> = mg/b = ${m}·9.8/${b} = <b>${N(m*g/b)} m/s</b>.`]}; });
A(C(2),3,"Drag: time constant",()=>{ const m=r(0.5,5,1), b=r(0.2,3,1), f=P([0.5,0.75,0.9,0.95]); const tau=m/b, t=-tau*Math.log(1-f);
 return {q:`An object (m = ${m} kg) falls from rest with drag F = −bv, b = ${b} kg/s, so v(t) = v<sub>T</sub>(1 − e<sup>−bt/m</sup>). How long until it reaches ${f*100}% of terminal speed?`,a:t,u:"s",dis:[[tau,"At t = m/b the speed is only 63% of v<sub>T</sub>."],[f*tau,"Solve 1 − e<sup>−t/τ</sup> = "+f+" with a logarithm."],[-tau*Math.log(f),"Solve e<sup>−t/τ</sup> = 1 − "+f+"."]],
 steps:[`τ = m/b = ${N(tau)} s.`,`${f} = 1 − e<sup>−t/τ</sup> → e<sup>−t/τ</sup> = ${N(1-f)}.`,`t = −τ ln(${N(1-f)}) = <b>${N(t)} s</b>.`]}; });
A(C(3),2,"Work by a variable force",()=>{ const k=R(2,20), n=P([2,3]), X=r(0.5,3,1); const W=k*X**(n+1)/(n+1);
 return {q:`A force F(x) = ${k}x${n===2?"²":"³"} (N, x in m) acts on an object from x = 0 to x = ${X} m. How much work does it do?`,a:W,u:"J",dis:[[k*X**n*X,"Integrate: the force is not constant."],[k*X**n,"That is F(X); work is ∫F dx."],[n*k*X**(n-1),"That is dF/dx; integrate instead."]],steps:[`W = ∫₀^${X} ${k}x${n===2?"²":"³"} dx = ${k}X<sup>${n+1}</sup>/${n+1}.`,`W = ${k}·${X}<sup>${n+1}</sup>/${n+1} = <b>${N(W)} J</b>.`]}; });
A(C(3),3,"Force from potential energy",()=>{ const a=R(1,6), b=R(1,8), x=r(0.5,3,1); const F=-(2*a*x-b);
 return {q:`The potential energy of a particle is U(x) = ${a}x² − ${b}x (J, x in m). What force acts on it at x = ${x} m?`,a:F,u:"N",dis:[[2*a*x-b,"F = −dU/dx: don't drop the minus sign."],[-(a*x*x-b*x),"Differentiate U first."],[-(2*a*x),"Differentiate −"+b+"x too."]],steps:[`F = −dU/dx = −(${2*a}x − ${b}).`,`F(${x}) = −(${N(2*a*x)} − ${b}) = <b>${N(F)} N</b>.`]}; });
A(C(4),3,"Impulse from F(t) (integral)",()=>{ const c=R(100,2000), T=r(0.05,0.3,2); const J=c*T**3/6;
 return {q:`The force on a ball during contact is F(t) = ${c}·t(${T} − t) newtons for 0 ≤ t ≤ ${T} s. What impulse does the ball receive?`,a:J,u:"N·s",dis:[[c*T*T/4*T,"Integrate rather than using peak × time."],[c*T**3/2,"∫t(T − t)dt = T³/6."],[c*T*T/4,"That is the peak force; integrate over time."]],steps:[`J = ∫₀^T F dt = ${c}∫₀^T (Tt − t²) dt = ${c}(T³/2 − T³/3) = ${c}T³/6.`,`J = ${c}·${T}³/6 = <b>${N(J)} N·s</b>.`]}; });
A(C(4),3,"Center of mass of a nonuniform rod",()=>{ const L=r(0.5,3,1), n=P([1,2]);
 const xc=n===1?2*L/3:3*L/4;
 return {q:`A rod of length ${L} m lies on the x-axis from x = 0 to x = ${L} m with linear density λ = k x${n===2?"²":""}. Where is its center of mass?`,a:xc,u:"m",dis:[[L/2,"The rod is denser at larger x, so x<sub>cm</sub> > L/2."],[n===1?3*L/4:2*L/3,"x<sub>cm</sub> = ∫xλdx/∫λdx."],[L/3,"More mass is far from the origin."]],
 steps:[`x<sub>cm</sub> = ∫xλ dx / ∫λ dx.`,n===1?`= (kL³/3)/(kL²/2) = 2L/3.`:`= (kL⁴/4)/(kL³/3) = 3L/4.`,`x<sub>cm</sub> = <b>${N(xc)} m</b>.`]}; });
A(C(5),2,"Parallel-axis theorem",()=>{ const M=r(0.5,5,1), L=r(0.5,2,1); const I=M*L*L/3;
 return {q:`A uniform rod (mass ${M} kg, length ${L} m) pivots about one end. Using I<sub>cm</sub> = (1/12)ML² and the parallel-axis theorem, what is I about the end?`,a:I,u:"kg·m²",dis:[[M*L*L/12,"That is about the center."],[M*L*L/12+M*L*L,"The shift is L/2, not L."],[M*L*L/2,"I = (1/12)ML² + M(L/2)² = ⅓ML²."]],steps:[`I = I<sub>cm</sub> + Md², with d = L/2.`,`I = (1/12)ML² + ¼ML² = ⅓ML² = ⅓·${M}·${L}² = <b>${N(I)} kg·m²</b>.`]}; });
A(C(5),3,"Rotational inertia by integration",()=>{ const k=r(0.5,4,1), L=r(0.5,2,1); const I=k*L**4/4;
 return {q:`A rod of length ${L} m pivots about x = 0 and has linear density λ = ${k}x (kg/m). What is its rotational inertia about the pivot?`,a:I,u:"kg·m²",dis:[[k*L**3/3,"I = ∫x²λ dx = ∫kx³ dx."],[k*L**4/12,"∫₀^L kx³ dx = kL⁴/4."],[k*L*L/2*L*L/3,"Integrate x²·kx directly."]],steps:[`I = ∫r² dm = ∫₀^L x²(${k}x) dx = ${k}L⁴/4.`,`I = ${k}·${L}⁴/4 = <b>${N(I)} kg·m²</b>.`]}; });
A(C(6),3,"Falling rod",()=>{ const L=r(0.5,2,1); const w=Math.sqrt(3*g/L);
 return {q:`A uniform rod of length ${L} m, pivoted at one end, is released from rest horizontally. What is its angular speed as it swings through vertical?`,a:w,u:"rad/s",dis:[[Math.sqrt(2*g/L),"The center of mass drops L/2 and I = ⅓ML²."],[Math.sqrt(6*g/L),"The center of mass drops only L/2."],[Math.sqrt(3*g*L),"ω = √(3g/L)."]],steps:[`Energy: Mg(L/2) = ½(⅓ML²)ω².`,`ω² = 3g/L → ω = √(3·9.8/${L}) = <b>${N(w)} rad/s</b>.`]}; });
A(C(7),3,"Physical pendulum",()=>{ const L=r(0.3,2,1); const T=2*Math.PI*Math.sqrt(2*L/(3*g));
 return {q:`A uniform rod of length ${L} m swings from one end as a physical pendulum. What is its period for small swings? (T = 2π√(I/(mgd)))`,a:T,u:"s",dis:[[2*Math.PI*Math.sqrt(L/g),"A rod is not a simple pendulum: I = ⅓mL², d = L/2."],[2*Math.PI*Math.sqrt(L/(3*g)),"I/(mgd) = (⅓mL²)/(mgL/2) = 2L/(3g)."],[2*Math.PI*Math.sqrt(L/(2*g)),"Use 2L/(3g)."]],steps:[`I = ⅓mL², d = L/2.`,`T = 2π√((⅓mL²)/(mg·L/2)) = 2π√(2L/(3g)).`,`T = <b>${N(T)} s</b>.`]}; });
A(C(7),2,"SHM differential equation",()=>{ const k=R(10,400), m=r(0.1,4,1); const w=Math.sqrt(k/m);
 return {q:`A system obeys d²x/dt² = −(${k}/${m})x. What is its angular frequency ω?`,a:w,u:"rad/s",dis:[[k/m,"ω² = k/m; take the square root."],[w/(2*Math.PI),"That is the frequency f in Hz."],[2*Math.PI/w,"That is the period."]],steps:[`Compare with d²x/dt² = −ω²x.`,`ω = √(${k}/${m}) = <b>${N(w)} rad/s</b>.`]}; });
})();
