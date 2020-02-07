const media = document.querySelector('.video-container__screen');
const controls = document.querySelector('.video-container__controls');

const play = document.querySelector('.play');
const stop = document.querySelector('.stop');

const timerWrapper = document.querySelector('.timer');
const timer = document.querySelector('.timer span');
const timerBar = document.querySelector('.timer div');

const volume = document.querySelector('.volume');


// megszüntessük az alapvető irányítási eszközöket és aktiváljuk a sajátunkat
media.removeAttribute('controls');
controls.style.visibility = 'visible';

// ez felel a video elinditasaert, eventlistener + func
play.addEventListener('click', playPauseMedia);

function playPauseMedia() {
    if (media.paused) {
        play.setAttribute('data-icon', 'u')
        media.play();
    } else {
        play.setAttribute('data-icon', 'P');
        media.pause();
    }
}

// ez felel a video leállításáért, ha stop gombra megyünk, vagy a videó véget ér
stop.addEventListener('click', stopMedia);
media.addEventListener('ended', stopMedia);

function stopMedia() {
    media.pause();
    media.currentTime = 0;
    play.setAttribute('data-icon', 'P');
}

// ez felel az idősáv telítődéséért
media.addEventListener('timeupdate', setTime);

function setTime() {
    let minutes = Math.floor(media.currentTime / 60);
    let seconds = Math.floor(media.currentTime - minutes * 60);
    let minuteValue;
    let secondValue;

    if (minutes < 10) {
        minuteValue = "0" + minutes;
    } else {
        minuteValue = minutes;
    }

    if (seconds < 10) { 
        secondValue = "0" + seconds;
    } else {
        secondValue = seconds;
    }

    let mediaTime = minuteValue + ":" + secondValue;
    timer.textContent = mediaTime;

    let barLength = timerWrapper.clientWidth * (media.currentTime / media.duration);
    timerBar.style.width = barLength + "px";    
}

// hangerő szabályzás
volume.addEventListener('change', handleRangeUpdate);

function handleRangeUpdate() {
    video[this.name] = this.value;
}

// az idősávra való klikkelés általi úgrás a videóban
let mousedown = false;

timerWrapper.addEventListener('click', scrub);
timerWrapper.addEventListener('mousemove', (e) => {
    if (mousedown) {
        scrub(e);
    }
});

function scrub(e) {
    const scrubTime = (e.offsetX / timerWrapper.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

timerWrapper.addEventListener('mousedown', () => mousedown = true);
timerWrapper.addEventListener('mouseup', () => mousedown = false);