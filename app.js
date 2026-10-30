'use strict';

// All scenery is drawn by hand with canvas rectangles and pixel polygons.
// The original portrait sprite is drawn separately in portrait.js.
const world = document.getElementById('world');
const ctx = world.getContext('2d');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let W, H, lastFrame = 0;
const random = (n) => { const k = Math.sin(n * 127.1 + 311.7) * 43758.5453; return k - Math.floor(k); };
function rect(x,y,w,h,color){ctx.fillStyle=color;ctx.fillRect(Math.round(x),Math.round(y),Math.ceil(w),Math.ceil(h));}
function poly(points,color){ctx.fillStyle=color;ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(Math.round(x),Math.round(y)):ctx.moveTo(Math.round(x),Math.round(y)));ctx.closePath();ctx.fill();}
function oval(x,y,rx,ry,color){for(let j=-ry;j<=ry;j++){const dx=Math.sqrt(Math.max(0,1-j*j/(ry*ry)))*rx;rect(x-dx,y+j,dx*2,1,color);}}
function star(x,y,size,color){rect(x,y,size,1,color);rect(x+Math.floor(size/2),y-Math.floor(size/2),1,size,color);}
function lantern(x,y,s,brightness=1){
  ctx.save();ctx.globalAlpha=brightness;
  rect(x-3*s,y-3*s,9*s,12*s,'#efad5910');rect(x-1*s,y-1*s,5*s,8*s,'#f6b55b20');
  rect(x,y,3*s,5*s,'#c77645');rect(x,y,3*s,s,'#f8d48c');rect(x+s,y+s,2*s,3*s,'#f7bb64');rect(x+s,y+2*s,s,2*s,'#ffe8a2');rect(x+s,y+5*s,s,s,'#9b5443');ctx.restore();
}
function tower(x,y,width,height,roof){
  rect(x,y-height,width,height,'#59527c');rect(x+width*.65,y-height,width*.35,height,'#3d3b63');rect(x+1,y-height+3,2,height-3,'#787096');
  poly([[x-3,y-height],[x+width/2,y-height-roof],[x+width+3,y-height]],'#373559');
  rect(x+width/2,y-height-roof-5,1,6,'#b098a0');rect(x+width/2+1,y-height-roof-5,5,2,'#c9a47c');
  for(let k=8;k<height-3;k+=12){rect(x+width/2-1,y-k,2,4,'#eac78c');rect(x+width/2,y-k+1,1,3,'#ffdfa4');}
}
function castle(x,y,s){
  ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.scale(s,s);
  poly([[-63,7],[-56,-5],[-49,-3],[-44,-13],[-21,-19],[1,-23],[21,-16],[32,-5],[53,-1],[66,10]],'#272941');
  poly([[-48,3],[-35,-15],[-7,-20],[20,-12],[39,5]],'#3d3a56');
  rect(-30,-46,59,34,'#524b73');rect(-27,-43,52,5,'#77648a');
  poly([[-34,-46],[-22,-60],[18,-60],[31,-46]],'#343357');
  tower(-42,-12,12,40,16);tower(29,-10,13,47,18);tower(-20,-43,13,49,24);tower(5,-44,14,38,20);tower(-3,-80,9,29,23);
  rect(-15,-27,34,15,'#65577d');poly([[-18,-27],[1,-42],[23,-27]],'#393459');
  rect(-1,-19,5,9,'#e7b576');rect(0,-18,3,8,'#ffdb98');
  [-24,-15,15,23].forEach(a=>rect(a,-35,2,4,'#dcb989'));
  for(let j=0;j<5;j++)rect(-5-j*2,-10+j*3,11+j*5,2,'#8b7182');
  ctx.restore();
}
function rapunzel(x,y){
  // Golden hair, lilac puff sleeves, pink bodice, and an extra-long braid.
  rect(x+1,y,9,2,'#c9964d');rect(x,y+2,11,8,'#e6b95d');rect(x+1,y+3,7,7,'#f4d4ad');rect(x+8,y+2,4,15,'#f0c36a');
  rect(x+2,y+6,1,1,'#4e364a');rect(x+6,y+6,1,1,'#4e364a');rect(x+4,y+9,2,1,'#bc7b77');
  rect(x+2,y+11,6,3,'#e7b99c');rect(x-2,y+13,14,5,'#b48bb4');rect(x+1,y+14,7,10,'#ad6d9d');rect(x+3,y+15,3,8,'#edafc4');
  poly([[x,y+22],[x+10,y+22],[x+15,y+34],[x-5,y+34]],'#9978b0');rect(x-3,y+28,15,3,'#bd96c6');
  rect(x-3,y+16,3,8,'#f3c9aa');rect(x-2,y+23,10,2,'#edbc9a');
  [[11,14],[12,19],[13,24],[16,28],[19,31],[23,32],[27,33],[30,32],[32,29]].forEach(([a,b],i)=>{rect(x+a,y+b,5,4,i%2?'#dfac54':'#f4ca73');rect(x+a+1,y+b,2,1,'#ffe199');if(i%3===0)rect(x+a+2,y+b+2,2,2,'#e9a4b9');});
}
function eugene(x,y){
  rect(x,y,10,3,'#302328');rect(x-2,y+3,13,5,'#39272a');rect(x,y+4,9,8,'#e3b391');rect(x-1,y+3,5,3,'#3b292b');rect(x+8,y+5,3,4,'#3b292b');
  rect(x+1,y+8,1,1,'#39272a');rect(x+6,y+8,1,1,'#39272a');rect(x+3,y+11,4,1,'#906259');rect(x+2,y+12,5,4,'#cf997e');
  rect(x-4,y+16,17,6,'#d8d2c2');rect(x-1,y+15,11,15,'#3b7677');rect(x+1,y+16,3,13,'#669b91');rect(x+4,y+16,2,13,'#c1b9a5');
  rect(x-4,y+21,3,8,'#ddb091');rect(x-1,y+27,11,3,'#d8aa89');rect(x+10,y+21,3,9,'#d5a285');
  rect(x-1,y+29,12,5,'#54494e');rect(x-1,y+33,5,4,'#554351');rect(x+7,y+33,6,4,'#554351');
}
function boat(x,y,s){ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.scale(s,s);
  // Broken reflections below the wooden boat.
  rect(-24,19,52,2,'#b88b8260');rect(-17,23,35,1,'#b58b6850');rect(-26,28,21,1,'#dfb37340');rect(7,29,29,1,'#c58a6840');
  eugene(-25,-31);rapunzel(17,-33);
  poly([[-49,0],[-36,10],[30,10],[49,-1],[37,17],[-30,19],[-43,11]],'#4d2d3e');
  poly([[-49,0],[-36,7],[31,7],[49,-1],[41,4],[30,11],[-36,11]],'#b07d63');rect(-32,12,61,2,'#765066');rect(-22,16,43,1,'#33283f');
  poly([[-28,6],[-31,7],[-58,31],[-61,30]],'#b48b76');poly([[-60,28],[-66,32],[-69,38],[-65,39],[-57,32]],'#96705f');
  lantern(1,-31,1.4);ctx.restore();}
function drawScene(time=0){
  const t=reducedMotion.matches?0:time*.001;
  const horizon=Math.floor(H*.64);
  const sky=['#171429','#1c1731','#231a39','#2c2043','#362647','#432c4e','#503451','#634058'];
  sky.forEach((c,i)=>rect(0,i*horizon/sky.length,W,horizon/sky.length+1,c));
  // Quiet pixel stars, with deterministic placement.
  for(let i=0;i<95;i++){const x=random(i+1)*W,y=random(i+400)*horizon*.85;const shimmer=.35+.3*Math.sin(t*.7+i);ctx.globalAlpha=shimmer;rect(x,y,i%14===0?2:1,1,i%3?'#d2bdc9':'#f1cd9c');if(i%23===0)star(x,y,3,'#edccac');}ctx.globalAlpha=1;
  const moonX=W*.88,moonY=H*.13;oval(moonX,moonY,8,8,'#ddbec0');oval(moonX-3,moonY-3,7,7,'#261c39');
  poly([[0,horizon],[0,horizon-18],[W*.09,horizon-31],[W*.15,horizon-23],[W*.22,horizon-45],[W*.29,horizon-32],[W*.39,horizon-47],[W*.5,horizon-27],[W*.62,horizon-39],[W*.74,horizon-21],[W*.83,horizon-32],[W*.94,horizon-24],[W,horizon-38],[W,horizon]],'#302a48');
  poly([[0,horizon+4],[0,horizon-8],[W*.15,horizon-20],[W*.3,horizon-12],[W*.43,horizon-27],[W*.58,horizon-6],[W*.7,horizon-19],[W*.88,horizon-7],[W,horizon-16],[W,horizon+4]],'#24263f');
  const water=['#393047','#322d44','#2d2940','#27273f','#24263d','#20243b','#1c2137'];water.forEach((c,i)=>rect(0,horizon+i*(H-horizon)/7,W,(H-horizon)/7+1,c));
  const castleX=W<240?W*.75:W*.8,sceneScale=Math.max(.58,Math.min(1.1,W/440));castle(castleX,horizon,sceneScale*.75);
  for(let i=0;i<85;i++){const y=horizon+random(i+700)*(H-horizon),x=random(i+800)*W;rect(x+Math.sin(t*.25+i)*2,y,2+random(i+900)*14,1,i%4===0?'#9b6b6960':'#66617b30');}
  for(let i=0;i<22;i++){const y=horizon+7+i*2;const span=(8+i*.8)*sceneScale;rect(castleX-span/2+Math.sin(i+t*.5)*4,y,span*(.3+random(i+77)*.7),1,i%3?'#c28d6a38':'#f5bb783d');}
  // Foreground shore framing.
  poly([[W,H],[W,H*.88],[W*.96,H*.9],[W*.94,H*.94],[W*.87,H*.96],[W*.83,H],[W,H]],'#171d30');
  for(let i=0;i<16;i++){let x=W*.91+random(i+19)*W*.09;rect(x,H*.99-random(i+98)*H*.08,1,H*.09,'#171d30');}
  const boatX=W*.79,boatY=horizon+(H-horizon)*.58+Math.sin(t*.7)*.6;boat(boatX,boatY,sceneScale*1.12);
  // Floating lanterns travel slowly upward; larger ones frame the edges.
  for(let i=0;i<33;i++){
    let x=random(i+150)*W;let y=(random(i+250)*horizon-t*(.9+random(i+450)) +horizon*100)%horizon;
    const size=i%10===0?2:i%3===0?1.3:.65;lantern(x,y,size,.6+random(i+350)*.4);
    if(y>horizon*.78)rect(x-1,horizon+8+random(i+50)*20,3,1,'#ebac6555');
  }
}
function resize(){W=Math.ceil(innerWidth/3);H=Math.ceil(innerHeight/3);world.width=W;world.height=H;ctx.imageSmoothingEnabled=false;drawScene();}
function animate(time){if(time-lastFrame>80){drawScene(time);lastFrame=time;}requestAnimationFrame(animate);}
resize();window.addEventListener('resize',resize);requestAnimationFrame(animate);

// A tiny hand-drawn bitmap alphabet, so the dedication is truly pixel lettering.
const glyphs={L:['10000','10000','10000','10000','10000','10000','11111'],O:['01110','10001','10001','10001','10001','10001','01110'],V:['10001','10001','10001','10001','10001','01010','00100'],E:['11111','10000','10000','11110','10000','10000','11111'],Y:['10001','10001','01010','00100','00100','00100','00100'],U:['10001','10001','10001','10001','10001','10001','01110'],A:['01110','10001','10001','11111','10001','10001','10001'],M:['10001','11011','10101','10101','10001','10001','10001']};
const wordCanvas=document.getElementById('pixel-words');wordCanvas.width=85;wordCanvas.height=9;const wordCtx=wordCanvas.getContext('2d');let pen=0;
for(const ch of 'LOVE YOU AMMU'){if(ch===' '){pen+=4;continue;}glyphs[ch].forEach((row,y)=>[...row].forEach((v,x)=>{if(v==='1'){wordCtx.fillStyle='#f5c98f';wordCtx.fillRect(pen+x,y+1,1,1);}}));pen+=6;}
['0110110','1111111','1111111','0111110','0011100','0001000'].forEach((row,y)=>[...row].forEach((v,x)=>{if(v==='1'){wordCtx.fillStyle='#e7a8b3';wordCtx.fillRect(pen+x+2,y+1,1,1);}}));

const music=document.getElementById('music'),sound=document.getElementById('sound'),label=document.getElementById('sound-label');
music.volume=.38;
let soundWanted=false,soundInteracted=false;
function updateSound(){const playing=!music.paused;sound.setAttribute('aria-pressed',String(playing));sound.classList.toggle('playing',playing);label.textContent=playing?'Sound on':'Sound off';sound.setAttribute('aria-label',playing?'Pause background music':'Play Kingdom Dance background music');}
async function playMusic(){try{await music.play();updateSound();}catch{soundWanted=false;updateSound();document.getElementById('audio-status').textContent='Tap Sound off to start the music.';}}
sound.addEventListener('click',()=>{soundInteracted=true;soundWanted=!soundWanted;if(soundWanted)playMusic();else{music.pause();updateSound();}});
music.addEventListener('play',updateSound);music.addEventListener('pause',updateSound);
music.addEventListener('error',()=>{document.getElementById('audio-status').textContent='Music could not load. Please refresh and try again.';label.textContent='Music unavailable';});
function showPage(page,focus=true){
  const isArt=page==='portrait';document.getElementById('letter-screen').hidden=isArt;document.getElementById('art-screen').hidden=!isArt;
  document.body.classList.toggle('view-portrait',isArt);window.scrollTo({top:0,behavior:'instant'});
  if(focus){const title=document.getElementById(isArt?'art-title':'page-title');title.setAttribute('tabindex','-1');title.focus({preventScroll:true});}
}
document.getElementById('continue').addEventListener('click',()=>{location.hash='portrait';if(!soundInteracted&&music.paused){soundWanted=true;playMusic();}});
document.getElementById('back').addEventListener('click',()=>{location.hash='letter';});
window.addEventListener('hashchange',()=>showPage(location.hash.slice(1)));
showPage(location.hash.slice(1),false);updateSound();
