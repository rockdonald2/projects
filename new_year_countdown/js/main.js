const spinner = document.querySelector('#spinner');
const countdown = document.querySelector('#countdown');

pageLoads();

function pageLoads() {
    setTimeout(() => {
        spinner.classList.add('hide');
        countdown.classList.remove('hide');
    }, 1000);
}

const days = document.querySelector('#days');
const hours = document.querySelector('#hours');
const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');
const year = document.querySelector('#year');

const months = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const yearDays = 365;
let today = new Date(Date.now());
const newYear = new Date(`January 01 ${today.getFullYear() + 1} 00:00:00`);
let timeLeft = new Date(newYear.getTime() - Date.now());

function updateCountdown() {
    year.innerText = newYear.getFullYear();

    timeLeft = new Date(newYear.getTime() - Date.now());
    today = new Date(Date.now());
    let daysElapsed = 0;
    for (let i = 0; i < today.getMonth(); ++i) {
        daysElapsed += months[i];
    }
    daysElapsed += Number(today.getDate());
    days.innerText = yearDays - daysElapsed;

    hours.innerText = `${(timeLeft.getHours() - 2) < 10 ? '0' + timeLeft.getHours() - 2 : timeLeft.getHours() - 2}`; // -2 because of the timezone
    minutes.innerText = `${(timeLeft.getMinutes()) < 10 ? '0' + timeLeft.getMinutes() : timeLeft.getMinutes()}`;
    seconds.innerText =`${(timeLeft.getSeconds()) < 10 ? '0' + timeLeft.getSeconds() : timeLeft.getSeconds()}`;
}

updateCountdown();

setInterval(updateCountdown, 1000);