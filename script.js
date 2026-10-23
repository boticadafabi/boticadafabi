const menuToggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
menuToggle?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded',String(open));
  menuToggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
  menuToggle.textContent=open?'×':'☰';
});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded','false');
  if(menuToggle){menuToggle.textContent='☰';menuToggle.setAttribute('aria-label','Abrir menu');}
}));
const waNumber='5521970023845';
document.querySelectorAll('.order-button').forEach(button=>button.addEventListener('click',()=>{
  const brand=button.dataset.brand;
  const message='Oi, Fabi! Quero ajuda para escolher produtos do catálogo '+brand+'. Pode me enviar as opções, preços e disponibilidade atualizados?';
  window.open('https://wa.me/'+waNumber+'?text='+encodeURIComponent(message),'_blank','noopener');
}));
document.querySelectorAll('.whatsapp-link').forEach(link=>{
  if(!link.href.includes('wa.me/')) return;
  link.addEventListener('click',()=>{});
});
document.querySelector('#year').textContent=new Date().getFullYear();
// Motion editorial: entradas suaves ao rolar, com respeito a preferências de acessibilidade.
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduceMotion && 'IntersectionObserver' in window){
  const revealTargets=[
    '.brand-intro-head','.brand-card','.catalog-callout',
    '.editorial-image','.editorial-copy','.payment-heading',
    '.payment-step','.payment-methods','.payment-cta',
    '.final-banner .eyebrow','.final-banner h2','.final-banner>p','.final-banner .button'
  ];
  const elements=[...new Set(revealTargets.flatMap(selector=>[...document.querySelectorAll(selector)]))];
  elements.forEach((element,index)=>{
    element.classList.add('reveal');
    if(element.matches('.brand-card,.payment-step')) element.dataset.delay=String((index%3)+1);
  });
  document.documentElement.classList.add('motion-ready');
  const revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -35px 0px'});
  elements.forEach(element=>revealObserver.observe(element));
}


// Progresso de leitura discreto e cabeçalho com profundidade ao rolar.
const progressBar=document.querySelector('.scroll-progress');
const stickyHeader=document.querySelector('.header');
let scrollTicking=false;
const updateScrollDetails=()=>{
  const scrollable=document.documentElement.scrollHeight-window.innerHeight;
  const progress=scrollable>0?Math.min(100,Math.max(0,(window.scrollY/scrollable)*100)):0;
  progressBar?.style.setProperty('--scroll-progress',progress.toFixed(2)+'%');
  stickyHeader?.classList.toggle('is-scrolled',window.scrollY>12);
  scrollTicking=false;
};
window.addEventListener('scroll',()=>{
  if(!scrollTicking){window.requestAnimationFrame(updateScrollDetails);scrollTicking=true;}
},{passive:true});
updateScrollDetails();
