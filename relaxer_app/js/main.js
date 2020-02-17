const app = document.querySelector('#app');
const text = document.querySelector('#text');

// elkezdjük az animációt, azért hívjük le a setInterval mellett manuális is, mert másképp csak 7.5s után indulna el
animation();

function animation() {
    // alapállás
    text.innerText = 'Breathe in!';
    app.className = 'app grow';

    // 3 másodperc után, csere
    setTimeout(() => {
        text.innerText = 'Hold';

        // 1.5 másodperc után, megint csere
        setTimeout(() => {
            text.innerText = 'Breath Out!';
            app.className = 'app shrink';

        }, 1500)
    }, 3000)
    // majd ezután a setInterval miatt újra lehívódik, minden 7.5s-ben.
}

setInterval(animation, 7500);