const container = document.querySelector('#container');

const difficulty = document.querySelector('#difficulty');

if (localStorage.getItem('game')) {
    difficulty.value = localStorage.getItem('game');
} else {
    localStorage.setItem('game', difficulty.value);
}

difficulty.addEventListener('change', () => {
    localStorage.setItem('game', difficulty.value);
});

const timeLeft = document.querySelector('#timeleft');
const score = document.querySelector('#score');
const finalScore = document.querySelector('#finalScore');

const word = document.querySelector('#word');
const text = document.querySelector('#text');

const settings = document.querySelector('#settings');
const settingsBtn = document.querySelector('#settings-btn');

settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('show');
})

const reload = document.querySelector('#reload');
reload.addEventListener('click', () => {
    location.reload();
});

let currWord = '';

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkInput() {
    if (text.value.trim() == currWord) {
        text.value = '';
        updateWord();
        score.innerHTML = Number(score.innerHTML) + 1;
        if (difficulty.value == 'easy') {
            timeLeft.innerHTML = Number(timeLeft.innerHTML) + 4;
        } else if (difficulty.value == 'medium') {
            timeLeft.innerHTML = Number(timeLeft.innerHTML) + 3;
        } else if (difficulty.value == 'hard') {
            timeLeft.innerHTML = Number(timeLeft.innerHTML) + 2;
        }

        return true;
    } else {
        return false;
    }
}

function updateWord() {
    fetch('../js/words.txt').then((promise) => {
        return promise.text();
    }).then((data) => {
        const words = [...data.split(/\s/g)];
        const random = getRandom(0, words.length);
        currWord = words[random];
        word.innerHTML = currWord;
    });
}

function startGame() {
    text.focus();
    updateWord();

    const timer = setInterval(() => {
        timeLeft.innerHTML = Number(timeLeft.innerHTML) - 1;

        if (Number(timeLeft.innerHTML) == 0) {
            clearInterval(timer);
            container.classList.add('timeout');
            finalScore.innerHTML = score.innerHTML;
        }
    }, 1000);   
}

text.addEventListener('input', () => {
    checkInput();
});

startGame();