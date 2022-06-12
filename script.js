'use strict';

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=fba3ee42ab0dd8e5893075f1479d083b';
const API_SHOW_URL = 'https://api.themoviedb.org/3/discover/tv?&api_key=fba3ee42ab0dd8e5893075f1479d083b';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=fba3ee42ab0dd8e5893075f1479d083b&query="';
const SEARCH_SHOW_API = 'https://api.themoviedb.org/3/search/tv?api_key=fba3ee42ab0dd8e5893075f1479d083b&query="';
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
const header = document.getElementById('header');
// Get initial Movies
getMovies(API_URL)
document.querySelector('.show').addEventListener('click',()=>{
    search.placeholder = 'TV Show Search'
    getTvShows(API_SHOW_URL);
});

document.querySelector('.movie-list').addEventListener('click',()=>{
    search.placeholder = 'Movies Search'
    getMovies(API_URL);
});

const detail = function (title, poster_path, vote_average, overview){
    main.innerHTML = '';
    main.classList.remove('movies');
    main.classList.remove('tv-show');
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
<img class ='movie-img' src="${IMG_PATH + poster_path}" alt="${title}">
<div class="movie-info">
    <h3> ${title}</h3>
    <span class="${getClassByRate(vote_average)}">${vote_average}</span>
</div>
<div class="overview">
    <h3>
        OverView
    </h3>
   ${overview}
</div>
`
    main.appendChild(movieEl);
};


async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
}

async function getTvShows(url) {
    const res = await fetch(url);
    const data = await res.json();
    showTvShows(data.results);
}


function showMovies(movies) {
    main.innerHTML = '';
    main.classList.remove('movies');
    main.classList.remove('tv-show');
    main.classList.add('movies');

    movies.forEach((movie) => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
    <img class ='movie-img' src="${IMG_PATH + poster_path}" alt="${title}" onclick="detail('${title}', '${poster_path}','${vote_average}','${overview}')">
    <div class="movie-info">
        <h3> ${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
        <h3>
            OverView
        </h3>
       ${overview}
    </div>
    `
        main.appendChild(movieEl);
    });
}

function showTvShows(show) {
    main.innerHTML = '';
    main.classList.remove('tv-show');
    main.classList.remove('movies');
    main.classList.add('tv-show');
    show.forEach((show) => {
        const {original_name, poster_path, vote_average, overview} = show;
        const showEl = document.createElement('div');
        showEl.classList.add('movie');
        showEl.innerHTML = `
    <img src="${IMG_PATH + poster_path}" alt="${original_name}" onclick="detail('${original_name}', '${poster_path}','${vote_average}','${overview}')">
    <div class="movie-info">
        <h3> ${original_name}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
        <h3>
            OverView
        </h3>
       ${overview}
    </div>
    `
        main.appendChild(showEl);
    });
}

function getClassByRate(vote) {
    return  vote >= 7 ? 'green' : vote >=5 ? 'orange' :'red';
}
function getMovieDetail(){
    main.innerHTML = '';
}
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchTerm = search.value;
    if (searchTerm && searchTerm !== '') {
        if (main.classList.contains('movies')) {
            getMovies(SEARCH_API + searchTerm);
        }
        else if (main.classList.contains('tv-show')) {
            getTvShows(SEARCH_SHOW_API + searchTerm)
        }
        search.value = '';
    } else {
        window.location.reload();
    }
})
main.classList.add('movies')
search.placeholder = main.classList.contains('movies') ? 'Movies Search' :'TV Show Search';