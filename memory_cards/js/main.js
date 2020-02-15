let cards = document.querySelectorAll('.card');
const cardContainer = document.querySelector('#cardContainer');
const addContainer = document.querySelector('#addContainer');
const addCard = document.querySelector('#addCard');

const question = document.querySelector('#question');
const answer = document.querySelector('#answer');

const navOpen = document.querySelector('#nav-open');
const navClose = document.querySelector('#nav-close');
const navLeft = document.querySelector('#nav-left');
const navRight = document.querySelector('#nav-right');
const navCurrent = document.querySelector('#nav-current');
const navClear = document.querySelector('#nav-clear');

// FUNKCIÓK A JELENLEGI ÁLLAPOT ELMENTÉSÉHEZ

function setCardsData() {
    localStorage.setItem('cards', JSON.stringify(cardData));
}

function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

function getActiveIndex() {
    const index = JSON.parse(localStorage.getItem('active'));
    return index === null ? 0 : index;
}

function setActiveIndex() {
    localStorage.setItem('active', JSON.stringify(activeCard));
}

let activeCard = getActiveIndex();
let cardData = getCardsData();

// A MENÜ AKTIVÁLÓJA, AMELYIKNÉL ÚJ KÁRTYÁKAT ADHATUNK HOZZÁ

navOpen.addEventListener('click', openAdd);
navClose.addEventListener('click', closeAdd);

function openAdd() {
    addContainer.classList.add('show');
}

function closeAdd() {
    addContainer.classList.remove('show');
}

document.addEventListener('keydown', (e) => {
    if (e.keyCode == 27) {
        closeAdd();
    }
});

// FUNKCIÓK AZ ÚJ KÁRTYA HOZZÁADÁSÁHOZ

addCard.addEventListener('click', createCard);

function createCard() {
    if (question.value.trim() == '' || answer.value.trim() == '') {
        return;
    }

    const card = document.createElement('div');
    card.className = `card ${cards.length == 0 ? 'active' : 'right'}`;
    card.innerHTML = `<div class="card__inner">
            <div class="card__inner--front">
                <p class="card__inner--front--text">
                    ${question.value}
                </p>
            </div>
            <div class="card__inner--back">
                <p class="card__inner--back--text">
                    ${answer.value}
                </p>
            </div>
        </div>`;

    cardData.push([question.value, answer.value]);

    question.value = '';
    answer.value = '';

    card.addEventListener('click', rotateCard);

    cardContainer.appendChild(card);
    cards = document.querySelectorAll('.card');
    closeAdd();
    refreshCurrent();
    setCardsData();
}

// AZ ÖSSZES KÁRTYA TÖRLÉSE

navClear.addEventListener('click', clearCards);

function clearCards() {
    cardContainer.innerHTML = '';
    navCurrent.innerHTML = '';
    cards = document.querySelectorAll('.card');
    cardData = [];
    activeCard = 0;
    setCardsData();
    setActiveIndex();
}

// A NAVIGÁCIÓS MENÜ FRISSíTÉSE

function refreshCurrent() {
    cards = document.querySelectorAll('.card');
    if (cards.length == 0) {
        return;
    }
    navCurrent.innerHTML = `${activeCard + 1} / ${cards.length}`;
}

// MEMÓRIA BETÖLTÉSE A DATA-BÓL, MEGLÉVŐ KÁRTYÁK HOZZÁADÁSA

function setActive() {
    cards = document.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i++) {
        if (i < activeCard) {
            cards[i].classList.add('left');
        } else if (i == activeCard) {
            cards[i].classList.add('active');
        } else {
            cards[i].classList.add('right');
        }
    }
}

function populateCards(data) {
    let i = 0;
    let cl = '';
    data.forEach(c => {
        if (i == activeCard) {
            cl = 'card active';
        } else if (i < activeCard) {
            cl = 'card left'; 
        } else {
            cl = 'card right';
        }

        const card = document.createElement('div');
        card.className = cl;
        card.innerHTML = `<div class="card__inner">
            <div class="card__inner--front">
                <p class="card__inner--front--text">
                    ${c[0]}
                </p>
            </div>
            <div class="card__inner--back">
                <p class="card__inner--back--text">
                    ${c[1]}
                </p>
            </div>
        </div>`;

        card.addEventListener('click', rotateCard);
        cardContainer.appendChild(card);

        i++;
    });

    refreshCurrent();
}

// FUNKCIÓK A KÁRTYÁK KÖZÖTT VALÓ LÉPKEDÉSHEZ

navLeft.addEventListener('click', rotateLeft);
navRight.addEventListener('click', rotateRight);

function rotateLeft() {
    if (activeCard > 0) {
        cards[activeCard].classList.remove('active');
        cards[activeCard].classList.add('right');

        activeCard--;
        cards[activeCard].classList.remove('left');
        cards[activeCard].classList.add('active');
        setActiveIndex(activeCard);
    }

    refreshCurrent();
}

function rotateRight() {
    if (activeCard <= cards.length - 2) {
        cards[activeCard].classList.remove('active');
        cards[activeCard].classList.add('left');

        activeCard++;
        cards[activeCard].classList.remove('right');
        cards[activeCard].classList.add('active');
        setActiveIndex(activeCard);
    }

    refreshCurrent();
}

function rotateCard() {
    this.classList.toggle('rotate');
}

populateCards(cardData);
setActive();
refreshCurrent();