function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const curtain = document.querySelector('#curtain');

const man = [document.querySelector('#head'), document.querySelector('#body'), document.querySelector('#arml'), document.querySelector('#armr'), document.querySelector('#legl'), document.querySelector('#legr')];
let manIterator = 0;

const wrong = document.querySelector('#wrong');
const wrongWords = document.querySelector('#wrongWords');

const word = document.querySelector('#word');

const popup = document.querySelector('#popup');
const reset = document.querySelector('#reset');
const notification = document.querySelector('#notification');

let playable = true;

function hangman() {
    return fetch('/js/words.txt').then((response) => {
        return response.text();
    }).then((data) => {
        const words = data.split(/\n/g);

        let selectedWord = words[getRandomInt(0, words.length)].toLowerCase();

        while (selectedWord.length > 10 || selectedWord.length < 3) {
            selectedWord = words[getRandomInt(0, words.length)].toLowerCase();
        }

        startGame(selectedWord.length, selectedWord);

        document.addEventListener('keydown', (e) => {
            if (playable) {
                const pressed = String.fromCharCode(e.keyCode).toLowerCase();

                if (pressed.charCodeAt(0) < 97 || pressed.charCodeAt(0) > 122) {
                    return;
                }

                const index = selectedWord.indexOf(pressed);

                if (index != -1) {
                    displayRight(pressed, index);
                } else {
                    displayWrong(pressed);
                }
            }
        });
    });
}

function displayRight(letter, index) {
    if (word.childNodes[index].innerHTML == '') {
        word.childNodes[index].innerHTML = letter;
    } else {
        displayNotification();
    }
}

function displayWrong(letter) {
    wrong.style.opacity = 1;
    wrongWords.style.opacity = 1;

    if (wrongWords.innerHTML.indexOf(letter) != -1) {
        displayNotification();
        return;
    }

    wrongWords.innerHTML += `${letter}, `;

    if (manIterator < man.length) {
        man[manIterator].style.display = 'block';
        manIterator++;
    }

    if (manIterator == man.length) {
        displayPopup();
    }
}

function displayPopup() {
    playable = false;

    curtain.classList.add('show');
    popup.classList.add('show');

    reset.addEventListener('click', () => {
        location.reload();
    });
}

function displayNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

function startGame(length, selectedWord) {
    word.innerHTML = '';

    for (let i = 0; i < length; ++i) {
        let letterSpace = document.createElement('span');
        letterSpace.className = 'hangman-container__word--letter';
        word.appendChild(letterSpace);
    }

    for (let j = 0; j < 2; ++j) {
        let random = getRandomInt(0, length - 1);
        word.childNodes[random].innerHTML = selectedWord[random];
    }
}

hangman();