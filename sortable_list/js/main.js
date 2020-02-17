const list = document.querySelector('#list');
const check = document.querySelector('#check');

check.addEventListener('click', checkOrder);

let dragStartIndex = 0;

// a funkció, amely elvégzi az ellenőrzést
function checkOrder() {
    listItems.forEach((item, index) => {
        // lekérjük a személy nevét
        const personName = item.querySelector('.container__list--item--person--name').innerText;

        // ha nem egyezik meg a sorrenddel, a wrong classot adjuk hozzá, ha megegyezik akkor a good classot
        if (personName != richestPersons[index]) {
            item.classList.add('wrong');
        } else {
            item.classList.remove('wrong');
            item.classList.add('good');
        }
    });
}

// leggazdagabb emberek array-e, helyes sorrendben
const richestPersons = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
];

// a lista tagok array-e, azért, hogy képesek legyünk a cserét elvégezni
const listItems = [];

// létrehozzuk a listát
createList();

// a funkció, amely tömören létrehozza a listát, és hozzárendeli a drag eventet mindegyikhez
function createList() {
    [...richestPersons]
        .map(p => ({value: p, sort: Math.random()})) // létrehozunk egy map-et, amely tartalmazza a személy nevét, és egy random számot 0 és 1 között
        .sort((a, b) => a.sort - b.sort) // rendezzük a szám szerint
        .map(p => p.value) // létrehozunk egy array-t a személyek nevével
        .forEach((person, index) => { // majd feltöltjük a listát
            const listItem = document.createElement('li');
            
            // hozzárendelünk egy indexet, a drag event miatt
            listItem.setAttribute('data-index', index);
            listItem.className = 'container__list--item';

            // tartalmaz egy indexet, a drag event miatt, és a személy nevét
            listItem.innerHTML = `
                <span class="container__list--item--number">${index + 1}</span>
                <div class="container__list--item--person" draggable="true">
                    <p class="container__list--item--person--name">${person}</p>
                    <i class="fas fa-grip-lines" aria-hidden="true"></i>
                </div>`;

            listItems.push(listItem);
            list.appendChild(listItem);
        });      
        
    addEventListeners();
}

// a dragstart event handlerje, amely akkor triggerrelődik, ha letartjuk a bal klikket egy draggalhető elem fölött
function dragStart() {
    dragStartIndex = this.closest('li').getAttribute('data-index');
}

// szükségtelen jelenleg, akkor triggerelődik, ha draggelés közben áthaladunk egy másik draggelhető elem fölött, dragover event handlerje
function dragOver(e) {
    e.preventDefault();
}

// mikor a draggelés után elengedjük a bal klikket, ekkor történik a csere
function dragDrop() {
    const dragEndIndex = this.closest('li').getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

// amikor belépünk egy másik draggelhető elem fölé
function dragEnter() {
    this.classList.add('over');
}

// amikor kimegyünk egy másik draggelhető elem fölött
function dragLeave() {
    this.classList.remove('over');
}

// az elemek cseréjéhez
function swapItems(fromIndex, toIndex) {
    // lekérjük a két lista tag a személy nevét tartalamazó elemjét
    const itemOne = listItems[fromIndex].querySelector('.container__list--item--person');
    const itemTwo = listItems[toIndex].querySelector('.container__list--item--person');

    // majd megcseréljük, hiszen az appendChild() funkció arra is jó, hogy elemeket cseréljen, hiszen az eredetit mozgatja, nem egy másolatot
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

// hozzáadjuk a draggalhető elemekhez a szükséges eventeket
function addEventListeners() {
    // személyek nevei
    const draggablePersons = document.querySelectorAll('.container__list--item--person');
    // lista itemek, ahhoz, hogy a drop és az átmenetel classja megvalósuljon
    const draggableItems = document.querySelectorAll('.container__list--item');

    // minden névhez a dragstartot
    draggablePersons.forEach((person) => {
        person.addEventListener('dragstart', dragStart)
    });

    // minden lista taghoz, a dragover, drop, dragenter, dragleave eventeket
    draggableItems.forEach((item) => {
        item.addEventListener('dragover', dragOver); // áthaladunk valamely felett
        item.addEventListener('drop', dragDrop); // elengedjük valamely felett
        item.addEventListener('dragenter', dragEnter); // bemegyünk valamelyik felett
        item.addEventListener('dragleave', dragLeave); // kimegyünk valamelyik felett
    });
}