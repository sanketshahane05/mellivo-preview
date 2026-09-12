const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const root=document.documentElement,progress=$('#progress'),cursor=$('#cursor'),ring=$('#cursorRing');
let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
function rafCursor(){rx+=(mx-rx)*.14;ry+=(my-ry)*.14;if(ring){ring.style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`}requestAnimationFrame(rafCursor)}rafCursor();
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;if(cursor)cursor.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`},{passive:true});
$$('a,.node,.card').forEach(el=>{el.addEventListener('pointerenter',()=>ring&&ring.classList.add('hover'));el.addEventListener('pointerleave',()=>ring&&ring.classList.remove('hover'))});
addEventListener('scroll',()=>{const d=document.documentElement;const p=d.scrollTop/(d.scrollHeight-d.clientHeight);if(progress)progress.style.width=`${Math.min(100,p*100)}%`;const badger=$('#badgerHero'),section=$('.badger');if(badger&&section){const r=section.getBoundingClientRect();const total=section.offsetHeight-innerHeight;const local=Math.min(1,Math.max(0,-r.top/Math.max(1,total)));const x=(1-local)*8;const y=(1-local)*28;const s=.88+local*.22;badger.style.transform=`translate3d(${x}vw,${y}px,0) scale(${s}) rotate(${(1-local)*-2}deg)`;badger.style.filter=`drop-shadow(0 ${30-local*12}px ${60-local*20}px #000)`;}},{passive:true});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.13});$$('.reveal').forEach(el=>io.observe(el));
const art=$('#heroArt'),mark=$('#badgerMark');if(art&&mark){art.addEventListener('pointermove',e=>{const r=art.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;mark.style.transform=`translate(-50%,-50%) translate(${x*18}px,${y*12}px) rotateY(${x*7}deg) rotateX(${-y*5}deg)`;$$('.float',art).forEach((f,i)=>f.style.transform=`translate(${x*(i+1)*5}px,${y*(i+1)*4}px)`)});art.addEventListener('pointerleave',()=>{mark.style.transform='translate(-50%,-50%)';$$('.float',art).forEach(f=>f.style.transform='')})}
const decision=$('#decision'),tag=$('#consoleTag'),txt=$('#consoleText');if(decision){$$('.node',decision).forEach(n=>{const on=()=>{decision.classList.add('active');$$('.node',decision).forEach(x=>x.classList.remove('active'));n.classList.add('active');if(tag)tag.textContent=n.dataset.label||'TRACE';if(txt)txt.textContent=(n.dataset.copy||'')+'_'};const off=()=>{decision.classList.remove('active');n.classList.remove('active');if(tag)tag.textContent='TRACE';if(txt)txt.textContent='move across the system to inspect the reasoning path_'};n.addEventListener('pointerenter',on);n.addEventListener('focus',on);n.addEventListener('pointerleave',off);n.addEventListener('blur',off)})}
$$('.tilt').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${-y*4}deg) rotateY(${x*5}deg) translateY(-4px)`});card.addEventListener('pointerleave',()=>card.style.transform='')});
$$('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform=`translate(${x*.08}px,${y*.08}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
const badgerPin=$('#badgerPin');if(badgerPin){badgerPin.addEventListener('pointerenter',()=>ring&&ring.classList.add('badger-mode'));badgerPin.addEventListener('pointerleave',()=>ring&&ring.classList.remove('badger-mode'));badgerPin.addEventListener('pointermove',e=>{const r=badgerPin.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;badgerPin.style.setProperty('--px',`${(x+.5)*100}%`);badgerPin.style.setProperty('--py',`${(y+.5)*100}%`);const moon=$('.moon',badgerPin);if(moon)moon.style.transform=`translate(${x*22}px,${y*16}px)`})}
if(matchMedia('(pointer:coarse)').matches){$$('.node').forEach(n=>n.addEventListener('click',()=>{decision?.classList.add('active');$$('.node').forEach(x=>x.classList.remove('active'));n.classList.add('active');if(tag)tag.textContent=n.dataset.label||'TRACE';if(txt)txt.textContent=(n.dataset.copy||'')+'_'}))}

/* premium experience layer */
(()=>{const link=document.createElement('link');link.rel='stylesheet';link.href='experience.css?v=3';document.head.appendChild(link);})();

/* subtle velocity-based claw cursor rotation */
let pmx=mx,pmy=my,cursorAngle=28;
addEventListener('pointermove',e=>{const dx=e.clientX-pmx,dy=e.clientY-pmy;const speed=Math.min(18,Math.hypot(dx,dy));cursorAngle=28+Math.max(-10,Math.min(10,Math.atan2(dy,dx)*180/Math.PI*.06));if(cursor){cursor.style.rotate=`${cursorAngle}deg`;cursor.style.scale=`${1+speed*.008}`;}pmx=e.clientX;pmy=e.clientY},{passive:true});

/* hero labels react as cursor approaches */
if(art){const floats=$$('.float',art);art.addEventListener('pointermove',e=>{const ar=art.getBoundingClientRect();floats.forEach(f=>{const r=f.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,d=Math.hypot(e.clientX-cx,e.clientY-cy),k=Math.max(0,1-d/180);f.style.color=`rgba(215,255,70,${.15+k*.85})`;f.style.letterSpacing=`${.18+k*.08}em`})});art.addEventListener('pointerleave',()=>floats.forEach(f=>{f.style.color='';f.style.letterSpacing=''}));}

/* scroll-driven badger release: progress also drives moon, copy and ground */
const badgerSection=$('.badger'),badgerCopy=$('.badger-copy'),moon=$('.moon'),terrain=$('.terrain');
function updateBadgerScene(){if(!badgerSection)return;const r=badgerSection.getBoundingClientRect(),travel=Math.max(1,badgerSection.offsetHeight-innerHeight),p=Math.min(1,Math.max(0,-r.top/travel));if(badgerCopy){badgerCopy.style.transform=`translate3d(0,${-p*18}px,0)`;badgerCopy.style.opacity=`${1-Math.max(0,(p-.7)/.3)*.5}`;}if(moon)moon.style.opacity=`${.05+p*.08}`;if(terrain)terrain.style.transform=`translateY(${(1-p)*18}px)`;badgerPin?.style.setProperty('--badger-progress',p)}
addEventListener('scroll',updateBadgerScene,{passive:true});updateBadgerScene();

/* tactile mobile: tap creates a short reasoning pulse */
if(matchMedia('(pointer:coarse)').matches){$$('.button,.industry-list a,.card').forEach(el=>el.addEventListener('touchstart',()=>{el.classList.add('tap-pulse');setTimeout(()=>el.classList.remove('tap-pulse'),420)},{passive:true}))}

/* keep the experience performant when tab is hidden */
document.addEventListener('visibilitychange',()=>document.documentElement.classList.toggle('paused',document.hidden));
