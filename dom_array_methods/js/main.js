const addUser = document.querySelector('#addUser');
const doubleMoney = document.querySelector('#doubleMoney');
const showOnlyMillionaires = document.querySelector('#showOnlyMillionaires');
const sortByRichest = document.querySelector('#sortByRichest');
const calculateEntireWealth = document.querySelector('#calculateEntireWealth');

const mill = document.querySelector('#mill');

const totalContainer = document.querySelector('#totalContainer');
const totalWealth = document.querySelector('#totalWealth');

let userArray = [];

function add() {
    totalContainer.classList.remove('visible');

    fetch('https://randomuser.me/api/').then((response) => {
        return response.json();
    }).then((json) => {
        let name = `${json.results[0].name.first} ${json.results[0].name.last}`;
        let number = Math.floor(Math.random() * 1000000);

        let user = {
            name: name,
            wealth: number
        };

        userArray.push(user);

        updateDOM();
    });
}

function double() {
    totalContainer.classList.remove('visible');

    userArray.forEach((user) => {
        user.wealth = (2 * user.wealth);
    });

    updateDOM();
}

function showOnlyMill() {
    totalContainer.classList.remove('visible');

    userArray = userArray.filter((user) => {
        return user.wealth >= 1000000;
    });

    updateDOM();
}

function sort() {
    userArray.sort((a, b) => {
        return b.wealth - a.wealth;
    });

    updateDOM();
}

function calculate() {
    const wealth = userArray.reduce((acc, user) => (acc += user.wealth), 0);

    totalContainer.classList.add('visible');
    totalWealth.innerHTML = `$${wealth.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}

function updateDOM() {
    mill.innerHTML = '';

    userArray.forEach((user) => {
        let person = document.createElement('div');
        person.classList.add('person');
        let person__name = document.createElement('h4');
        person__name.classList.add('person__name');
        let person__wealth = document.createElement('small');
        person__wealth.classList.add('person__wealth');

        let nameNode = document.createTextNode(user.name);
        let wealthNode = document.createTextNode('$' + user.wealth.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
        person__name.appendChild(nameNode);
        person__wealth.appendChild(wealthNode);
        person.appendChild(person__name);
        person.appendChild(person__wealth);

        mill.appendChild(person);
    });
}

addUser.addEventListener('click', add);
doubleMoney.addEventListener('click', double);
showOnlyMillionaires.addEventListener('click', showOnlyMill);
sortByRichest.addEventListener('click', sort);
calculateEntireWealth.addEventListener('click', calculate);

mill.innerHTML = '';

for (let i = 0; i < 3; i++) {
    add();
}