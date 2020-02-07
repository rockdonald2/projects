const userName = document.getElementById('username');
const email = document.getElementById('email');
const pwd = document.getElementById('pwd');
const cpwd = document.getElementById('pwd2');
const form = document.getElementById('form')

function showError(elem, message) {
    const formControl = elem.parentElement;
    formControl.className = 'input error';
    const small = formControl.querySelector('#err');
    small.innerText = message;
}

function showSuccess(elem) {
    const formControl = elem.parentElement;
    formControl.className = 'input success';
}

function getFieldName(elem) {
    return elem.id.charAt(0).toUpperCase() + elem.id.slice(1);
}

function checkRequired(inputArr) {
    inputArr.forEach((input) => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        }
        else {
            showSuccess(input);
        }
    });
}

function checkLength(elem, min, max) {
    if (elem.value.length == 0) {
        showError(elem, `${getFieldName(elem)} is required`);
        return;
    }

    if (elem.value.length < min) {
        showError(elem, `${getFieldName(elem)} must be at least ${min} characters long`)
    } else if (elem.value.length > max) {
        showError(elem, `${getFieldName(elem)} can be at most ${max} characters long`)
    } else {
        showSuccess(elem);
    }
}

function checkEmail(elem) {
    if (elem.value.length == 0) {
        showError(elem, `${getFieldName(elem)} is required`);
        return;
    }

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(elem.value.trim())) {
        showSuccess(elem);
    } else {
        showError(elem, 'Email is not valid');
    }
}

function checkPasswordsMatch(pwd1, pwd2) {
    if (pwd1.value !== pwd2.value) {
        showError(pwd2, 'Passwords do not match');
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkRequired([userName, email, pwd, cpwd]);
    checkLength(username, 3, 15);
    checkLength(pwd, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(pwd, cpwd);
});