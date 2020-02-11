const balance = document.querySelector('#balance');

const income = document.querySelector('#income');
const expense = document.querySelector('#expense');

const history = document.querySelector('#history');

const item = document.querySelector('#item');
const amount = document.querySelector('#price');
const form = document.querySelector('#form');
let noItems = 0;

const memory = {
    balance: 0,
    income: 0,
    expense: 0,
    historyItem: []
}

function delItem(e) {
    e.stopPropagation();

    const id = this.parentNode.dataset.id;

    const children = document.querySelectorAll('#history > *');

    children.forEach((child) => {
        if (child.dataset.id == id) {
            history.removeChild(child);
        
            if (child.classList.contains('expense')) {
                expense.textContent = (Number(expense.textContent) - Number(child.children[2].textContent.replace('$', ''))).toFixed(2);
            } else {
                income.textContent = (Number(income.textContent) - Number(child.children[2].textContent.replace('$', ''))).toFixed(2);
            }

            updateBalance();

            return;
        }
    });

    updateMemory();
}

function updateMemory() {
    memory.balance = Number(balance.textContent);
    memory.income = Number(income.textContent);
    memory.expense = Number(expense.textContent);
    memory.historyItem = [];
    history.childNodes.forEach((child) => {
        if (child.childNodes.length != 0) {
            memory.historyItem.push(`${child.outerHTML}`)
        }
    });
    localStorage.setItem('memory', JSON.stringify(memory));
}

const updateListener = () => {
    history.childNodes.forEach((child) => {
        if (child.childNodes.length != 0) {
            child.childNodes.forEach((deep) => {
                if (deep.childNodes.length != 0) {
                    if (deep.className == 'history__container--del') {
                        deep.addEventListener(('click'), delItem);
                    }
                }
            })
        }
    });
}

form.addEventListener('submit', addItem);

function addItem(e) {
    e.preventDefault();

    if (item.value.trim() == '' || amount.value.trim() == '') {
        alert('You first must enter something');
        return;
    }

    if (amount.value == '0') {
        alert('You must enter a higher price than 0');
        return;
    }

    noItems += 1;

    let html = `<div class="history__container ${Number(price.value) > 0 ? 'income' : 'expense'}" data-id="${noItems}">
        <button class="history__container--del">X</button>
        <p class="history__container--item">${item.value}</p>
        <small class="history__container--price">$<span>${Math.abs(Number(amount.value)).toFixed(2)}</span></small>
    </div>`;

    history.innerHTML += html;

    updateExp();
    updateBalance();

    amount.value = '';
    item.value = '';

    updateMemory();
    updateListener();
}

function updateExp() {
    if (Number(amount.value) > 0) {
        income.textContent = Math.abs((Number(income.textContent) + Number(price.value))).toFixed(2);
    } else {
        expense.textContent = Math.abs((Number(expense.textContent) - Number(price.value))).toFixed(2);
    }
}

function updateBalance() {
    balance.textContent = (Number(income.textContent) - Number(expense.textContent)).toFixed(2);
}

function loadMemory() {
    const restore = JSON.parse(localStorage.getItem('memory'));

    if (restore) {
        balance.textContent = Number(restore.balance).toFixed(2);
        income.textContent = Number(restore.income).toFixed(2);
        expense.textContent = Number(restore.expense).toFixed(2);
    
        history.innerHTML = '';
    
        restore.historyItem.forEach((item) => {
            history.innerHTML += item;
        });
    }
}

loadMemory();
updateListener();