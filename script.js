const films = [
  {title:'Inception',year:2010,genre:'Sci-Fi',rating:'8.8',image:'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',description:'A skilled thief enters dreams to steal secrets, then faces a mission that challenges the line between dreams and reality.'},
  {title:'Interstellar',year:2014,genre:'Adventure',rating:'8.7',image:'https://image.tmdb.org/t/p/w500/gEU2Qni6E77NI6lCU6MxlNBvIx.jpg',description:'A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.'},
  {title:'The Dark Knight',year:2008,genre:'Action',rating:'9.0',image:'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',description:'Batman faces a criminal mastermind whose chaos tests the limits of Gotham and its heroes.'},
  {title:'The Matrix',year:1999,genre:'Sci-Fi',rating:'8.7',image:'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',description:'A computer hacker discovers that reality is not what it seems and joins a fight for humanity.'},
  {title:'Avatar',year:2009,genre:'Adventure',rating:'7.9',image:'https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg',description:'A former marine explores an extraordinary alien world and faces a choice between two civilizations.'},
  {title:'Gladiator',year:2000,genre:'Drama',rating:'8.5',image:'https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg',description:'A betrayed Roman general fights his way through the arena, seeking justice and honor.'}
];

const grid = document.querySelector('#movies-grid');
const search = document.querySelector('#search');
const count = document.querySelector('#result-count');
const empty = document.querySelector('#empty-state');
const dialog = document.querySelector('#movie-dialog');
let activeGenre = 'All';

function renderMovies() {
  const query = search.value.trim().toLowerCase();
  const filtered = films.filter(film =>
    (activeGenre === 'All' || film.genre === activeGenre) &&
    (film.title.toLowerCase().includes(query) || film.genre.toLowerCase().includes(query) || String(film.year).includes(query))
  );
  count.textContent = `${String(filtered.length).padStart(2,'0')} FILMS`;
  empty.hidden = filtered.length !== 0;
  grid.innerHTML = filtered.map(film => `
    <article class="movie-card" tabindex="0" role="button" aria-label="View ${film.title} details" data-title="${film.title}">
      <div class="poster-wrap"><img src="${film.image}" alt="${film.title} poster" loading="lazy"><span class="poster-rating">★ ${film.rating}</span></div>
      <h3 class="movie-title">${film.title}</h3>
      <div class="movie-meta"><span>${film.year}</span><span>${film.genre}</span></div>
    </article>`).join('');
}

function openMovie(title) {
  const film = films.find(item => item.title === title);
  if (!film) return;
  document.querySelector('#dialog-image').src = film.image;
  document.querySelector('#dialog-image').alt = `${film.title} poster`;
  document.querySelector('#dialog-title').textContent = film.title;
  document.querySelector('#dialog-meta').textContent = `${film.year}  /  ${film.genre}  /  ★ ${film.rating}`;
  document.querySelector('#dialog-description').textContent = film.description;
  document.querySelector('#trailer-link').href = `https://www.youtube.com/results?search_query=${encodeURIComponent(film.title + ' official trailer')}`;
  dialog.showModal();
}

grid.addEventListener('click', event => {
  const card = event.target.closest('.movie-card');
  if (card) openMovie(card.dataset.title);
});
grid.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') {
    const card = event.target.closest('.movie-card');
    if (card) { event.preventDefault(); openMovie(card.dataset.title); }
  }
});
search.addEventListener('input', renderMovies);
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  activeGenre = button.dataset.genre;
  document.querySelectorAll('.filter').forEach(item => item.classList.toggle('active', item === button));
  renderMovies();
}));
document.querySelector('#random-btn').addEventListener('click', () => {
  const film = films[Math.floor(Math.random() * films.length)];
  openMovie(film.title);
});
document.querySelector('#dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
document.querySelector('#year').textContent = new Date().getFullYear();
renderMovies();
