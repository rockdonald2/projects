const body = document.querySelector('body');

const form = document.querySelector('#form');
const term = document.querySelector('#term');
const submit = document.querySelector('#submit');
let t = ''; // lementjük a keresett szót.
let songs = [];
let rawData = [];

const resultsContainer = document.querySelector('.search-results');
const results = document.querySelector('.search-results ul');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');

const lyricsContainer = document.querySelector('#lyricsContainer');
const lyricsText = document.querySelector('#lyricsText');
const lyricsArtist = document.querySelector('#lyricsArtist');
const lyricsSong = document.querySelector('#lyricsSong');
const back = document.querySelector('#back');

form.addEventListener('submit', getTerm);

prev.addEventListener('click', getPrev);
next.addEventListener('click', getNext);
back.addEventListener('click', lyricsBack);

function getTerm(e) {
    e.preventDefault();

    t = term.value.trim();
    songs = [];

    if (!t) {
        alert('Please type in a search term');
    } else {
        app();
    }
}

async function getSongs(keyword) {
    const promise = await fetch(`https://api.lyrics.ovh/suggest/${keyword}`);

    const data = await promise.json();

    return data;
}

async function getMoreSongs(link) {
    const promise = await fetch(`https://cors-anywhere.herokuapp.com/${link}`);

    const data = await promise.json();

    return data;
}

async function getLyrics(e) {
    const clickedEl = e.target;

    if (clickedEl.tagName !== 'BUTTON') {
        return;
    }

    const songTitle = clickedEl.getAttribute('data-song');
    const songArtist = clickedEl.getAttribute('data-artist');
    const promise = await fetch(`https://api.lyrics.ovh/v1/${songArtist}/${songTitle}`);
    const lyrics = await promise.json();
    lyricsArtist.innerHTML = songArtist;
    lyricsSong.innerHTML = songTitle;
    if (!lyrics.error) {
        lyricsText.innerHTML = lyrics.lyrics;
    } else {
        lyricsText.innerHTML = 'Lyrics not found in the database';
        
    }
    resultsContainer.classList.remove('show');
    setTimeout(() => {
        lyricsContainer.classList.add('show');
    }, 500);
    body.classList.add('show');
}

function lyricsBack() {
    lyricsContainer.classList.remove('show');
    body.classList.remove('show');
    setTimeout(() => {
        resultsContainer.classList.add('show');
    }, 500);
}

async function getNext() {
    rawData = await getMoreSongs(rawData.next);
    songs = [...(rawData).data];
    resultsContainer.classList.remove('show');
    setTimeout(() => {
        showResults();
    }, 500);
}

async function getPrev() {
    rawData = await getMoreSongs(rawData.prev);
    songs = [...(rawData).data];
    resultsContainer.classList.remove('show');
    setTimeout(() => {
        showResults();
    }, 500);
}

function showResults() {
    if (songs.error) {
        results.innerHTML = songs.error;
    }

    results.innerHTML = '';

    songs.forEach(song => {
        const el = document.createElement('li');
        el.innerHTML = `
                    <p class="search-results__song"><span class="search-results__song--artist">${song.artist.name}</span> -
                    ${song.title}</p>
                    <button class="search-results__get" data-artist="${song.artist.name}" data-song="${song.title}">Get lyrics</button>`;
        el.addEventListener('click', getLyrics);
        results.appendChild(el);
    });

    if (!rawData.next) {
        next.style.display = 'none';
    } else {
        next.style.display = 'inline-block';
    }

    if (!rawData.prev) {
        prev.style.display = 'none';
    } else {
        prev.style.display = 'inline-block';
    }

    resultsContainer.classList.add('show');
}

async function app() {
    if (t != '') {
        rawData = await getSongs(t);
        songs = [...(rawData).data];
    }

    if (rawData.length == 0) {
        return;
    }

    showResults();
}