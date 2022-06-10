'use strict';

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=fba3ee42ab0dd8e5893075f1479d083b';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=fba3ee42ab0dd8e5893075f1479d083b&query="';
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
const header = document.getElementById('header');
// Get initial Movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
}

function showMovies(movies) {
    main.innerHTML = '';
    movies.forEach((movie) => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
    <img src="${IMG_PATH + poster_path}" alt="${title}" onclick="getMovieDetail()">
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
        getMovies(SEARCH_API + searchTerm);
        search.value = '';
    } else {
        window.location.reload();
    }
})