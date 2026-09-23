const restaurants = [
  { name: 'Café Miro', cuisine: 'Modern European · Brunch', category: 'Coffee', rating: '4.8', reviews: '1.2k', time: '20–30 min', price: '$$', tag: 'EDITOR’S PICK', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80' },
  { name: 'Nami House', cuisine: 'Japanese · Sushi', category: 'Sushi', rating: '4.9', reviews: '890', time: '25–35 min', price: '$$$', tag: 'TOP RATED', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80' },
  { name: 'The Green Table', cuisine: 'Healthy · Vegan', category: 'Healthy', rating: '4.7', reviews: '642', time: '15–25 min', price: '$$', tag: '20% OFF', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80' },
  { name: 'Dough & Co.', cuisine: 'Pizza · Italian', category: 'Pizza', rating: '4.6', reviews: '2.1k', time: '20–30 min', price: '$$', tag: 'POPULAR', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80' },
  { name: 'Burger Social', cuisine: 'Burgers · American', category: 'Burgers', rating: '4.7', reviews: '1.5k', time: '15–25 min', price: '$$', tag: 'MUST TRY', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },
  { name: 'Sugar & Spice', cuisine: 'Desserts · Bakery', category: 'Desserts', rating: '4.8', reviews: '734', time: '20–30 min', price: '$', tag: 'NEW', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80' }
];
const grid = document.querySelector('#restaurant-grid');
const emptyState = document.querySelector('#empty-state');
const searchInput = document.querySelector('#search-input');
let activeCategory = 'all';
function renderRestaurants() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = restaurants.filter(r => (activeCategory === 'all' || r.category === activeCategory) && `${r.name} ${r.cuisine} ${r.category}`.toLowerCase().includes(query));
  grid.innerHTML = filtered.map(r => `<article class="restaurant-card"><div class="card-image"><img src="${r.image}" alt="Food from ${r.name}" loading="lazy"><span class="tag">${r.tag}</span><button class="heart" aria-label="Save ${r.name}" type="button">♡</button></div><div class="card-body"><div class="card-title"><h3>${r.name}</h3><span class="rating">★ ${r.rating}</span></div><p class="card-copy">${r.cuisine}</p><div class="card-footer"><span>⌖ ${r.time} · ${r.price}</span><span class="delivery">Free delivery</span></div></div></article>`).join('');
  emptyState.hidden = filtered.length > 0;
  grid.querySelectorAll('.heart').forEach(button => button.addEventListener('click', () => { button.classList.toggle('saved'); button.textContent = button.classList.contains('saved') ? '♥' : '♡'; }));
}
document.querySelector('#search-form').addEventListener('submit', e => { e.preventDefault(); renderRestaurants(); document.querySelector('#restaurants').scrollIntoView({ behavior: 'smooth' }); });
searchInput.addEventListener('input', renderRestaurants);
document.querySelectorAll('.category').forEach(button => button.addEventListener('click', () => { document.querySelector('.category.active').classList.remove('active'); button.classList.add('active'); activeCategory = button.dataset.category; renderRestaurants(); }));
document.querySelector('.menu-toggle').addEventListener('click', e => { const nav = document.querySelector('.main-nav'); nav.classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', nav.classList.contains('open')); });
document.querySelector('#load-more').addEventListener('click', e => { e.currentTarget.textContent = 'You’re all caught up! ✓'; e.currentTarget.disabled = true; });
renderRestaurants();
