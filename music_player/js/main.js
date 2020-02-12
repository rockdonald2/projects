const musicList = ['../music/hey.mp3', '../music/summer.mp3', '../music/ukulele.mp3'];
const coverList = ['../img/hey.jpg', '../img/summer.jpg', '../img/ukulele.jpg'];
let iterator = 0;

const player = document.querySelector('#player');
const playerInfo = document.querySelector('#playerInfo');

const title = document.querySelector('#title');
const music = document.querySelector('#music');
const cover = document.querySelector('#cover');
const progress = document.querySelector('#progress');
const played = document.querySelector('#played');

const prev = document.querySelector('#prev');
const play = document.querySelector('#play');
const next = document.querySelector('#next');

play.addEventListener('click', playMusic);
prev.addEventListener('click', prevMusic);
next.addEventListener('click', nextMusic);

function prevMusic() {
    iterator--;

    if (iterator < 0) {
        iterator = musicList.length - 1;
    }

    music.src = musicList[iterator];
    cover.src = coverList[iterator];
    title.innerHTML = musicList[iterator].substr(9).replace('.mp3', '').toUpperCase();

    music.pause();
    playMusic();
}

function nextMusic() {
    iterator++;

    if (iterator > musicList.length - 1) {
        iterator = 0;
    }

    music.src = musicList[iterator];
    cover.src = coverList[iterator];
    title.innerHTML = musicList[iterator].substr(9).replace('.mp3', '').toUpperCase();

    music.pause();
    playMusic();
}

function playMusic() {
    if (music.paused) {
        music.play();

        player.classList.add('playing');
        setTimeout(() => {
            playerInfo.classList.add('playing');
        }, 200);
        play.innerHTML = '<i class="fas fa-pause"></i>';


    } else {
        music.pause();

        playerInfo.classList.remove('playing');
        setTimeout(() => {
            player.classList.remove('playing');
        }, 200);
        play.innerHTML = '<i class="fas fa-play"></i>'

    }
}

music.addEventListener('timeupdate', bar);

function bar() {
    played.style.width = `${(music.currentTime / music.duration) * 100}%`;
}

let mousedown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => {
    if (mousedown) {
        scrub(e);
    }
});

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * music.duration;
    music.currentTime = scrubTime;
}

progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);