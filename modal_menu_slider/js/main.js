const curtain = document.querySelector('#curtain');
const nav = document.querySelector('#nav');
const navToggle = document.querySelector('#navToggle');
const modal = document.querySelector('#modal');
const modalToggle = document.querySelector('#modalToggle');
const modalClose = document.querySelector('#modalClose');

navToggle.addEventListener('click', () => {
    nav.classList.add('toggle');
    curtain.classList.add('visible');
});

modalToggle.addEventListener('click', () => {
    modal.classList.add('show');
    curtain.classList.add('visible');
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
    curtain.classList.remove('visible');
});

curtain.addEventListener('click', () => {
    nav.classList.remove('toggle');
    modal.classList.remove('show');
    curtain.classList.remove('visible');
});

document.addEventListener('keydown', (e) => {
    if (e.keyCode == 27) {
        nav.classList.remove('toggle');
        modal.classList.remove('show');
        curtain.classList.remove('visible');
    }
});