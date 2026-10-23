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