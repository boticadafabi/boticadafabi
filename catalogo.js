
const sampleProducts=[
{id:1,name:'Perfumes e fragrâncias',brand:'O Boticário',category:'Perfumaria',desc:'Encontre uma assinatura olfativa para o seu estilo.',image:'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=85',badge:'PERFUMARIA'},
{id:2,name:'Cuidados perfumados',brand:'Eudora',category:'Corpo e banho',desc:'Ideias para transformar o autocuidado em ritual.',image:'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=85',badge:'CORPO & BANHO'},
{id:3,name:'Maquiagem para expressar',brand:'Quem Disse, Berenice?',category:'Rosto e maquiagem',desc:'Cores e texturas para realçar sua personalidade.',image:'https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=800&q=85',badge:'MAQUIAGEM'},
{id:4,name:'Rituais de cuidado',brand:'O.U.I Paris',category:'Corpo e banho',desc:'Inspirações para cuidar de você com delicadeza.',image:'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=85',badge:'AUTOCUIDADO'},
{id:5,name:'Cuidado para os cabelos',brand:'O Boticário',category:'Cabelos',desc:'Descubra opções para sua rotina de cuidados.',image:'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=85',badge:'CABELOS'},
{id:6,name:'Presentes com intenção',brand:'Eudora',category:'Presentes',desc:'Inspirações para celebrar alguém especial.',image:'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=85',badge:'PRESENTES'}
];
let selectedBrand='Todas',selectedCategory='Todas';
const requestedCategory=new URLSearchParams(window.location.search).get('categoria');
const validCategories=['Perfumaria','Corpo e banho','Rosto e maquiagem','Cabelos','Presentes'];
if(validCategories.includes(requestedCategory))selectedCategory=requestedCategory;
const grid=document.querySelector('#product-grid'),search=document.querySelector('#product-search'),sort=document.querySelector('#sort-products');
function renderProducts(){
 const term=search.value.trim().toLocaleLowerCase('pt-BR');
 let items=sampleProducts.filter(p=>(selectedBrand==='Todas'||p.brand===selectedBrand)&&(selectedCategory==='Todas'||p.category===selectedCategory)&&(!term||[p.name,p.brand,p.category,p.desc].join(' ').toLocaleLowerCase('pt-BR').includes(term)));
 if(sort.value==='name')items.sort((a,b)=>a.name.localeCompare(b.name,'pt-BR'));
 grid.innerHTML=items.map(p=>`<article class="product-card"><div class="product-image"><img src="${p.image}" alt="Imagem ilustrativa: ${p.category}" loading="lazy"><span class="product-badge">${p.badge}</span></div><div class="product-info"><div class="product-brand">${p.brand}</div><h3>${p.name}</h3><p>${p.desc}</p><div class="product-bottom"><span class="product-price">Preço sob consulta</span><button class="product-ask" data-product="${p.name}" data-brand="${p.brand}">Consultar com a Fabi ↗</button></div></div></article>`).join('');
 document.querySelector('#results-count').textContent=items.length+' '+(items.length===1?'inspiração':'inspirações');
 document.querySelector('#empty-state').hidden=items.length>0;
 grid.querySelectorAll('.product-ask').forEach(btn=>btn.addEventListener('click',()=>{const msg='Oi, Fabi! Vi a vitrine da Botica da Fabi e quero consultar opções atuais de '+btn.dataset.product+' da marca '+btn.dataset.brand+'. Pode me enviar fotos oficiais, preço e disponibilidade?';window.open('https://wa.me/5521970023845?text='+encodeURIComponent(msg),'_blank','noopener');}));
}
document.querySelectorAll('[data-brand]').forEach(btn=>btn.addEventListener('click',()=>{selectedBrand=btn.dataset.brand;document.querySelectorAll('[data-brand]').forEach(b=>b.classList.toggle('active',b===btn));renderProducts()}));
document.querySelectorAll('[data-category]').forEach(btn=>{btn.classList.toggle('active',btn.dataset.category===selectedCategory);btn.addEventListener('click',()=>{selectedCategory=btn.dataset.category;document.querySelectorAll('[data-category]').forEach(b=>b.classList.toggle('active',b===btn));renderProducts()})});
search.addEventListener('input',renderProducts);sort.addEventListener('change',renderProducts);
document.querySelector('#clear-filters').addEventListener('click',()=>{selectedBrand='Todas';selectedCategory='Todas';search.value='';document.querySelectorAll('[data-brand]').forEach(b=>b.classList.toggle('active',b.dataset.brand==='Todas'));document.querySelectorAll('[data-category]').forEach(b=>b.classList.toggle('active',b.dataset.category==='Todas'));renderProducts()});
renderProducts();