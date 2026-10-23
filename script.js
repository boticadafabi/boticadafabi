const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  menuToggle.textContent = isOpen ? '×' : '☰';
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  if (menuToggle) { menuToggle.textContent = '☰'; menuToggle.setAttribute('aria-label', 'Abrir menu'); }
}));

const filterButtons = document.querySelectorAll('[data-filter]');
const productCards = document.querySelectorAll('.product-card');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(item => item.classList.toggle('active', item === button));
  productCards.forEach(card => { card.hidden = filter !== 'todos' && card.dataset.category !== filter; });
}));

let toastTimer;
const toast = document.querySelector('.toast');
document.querySelectorAll('.quick-add').forEach(button => button.addEventListener('click', () => {
  const name = button.dataset.product || 'Produto';
  toast.textContent = 'Você selecionou: ' + name + '. Entre em contato com a Botica da Fabi para consultar opções e valores.';
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3800);
}));
document.querySelector('#year').textContent = new Date().getFullYear();