const seats = document.querySelectorAll('.seat-container-seats-row-seat');
const movies = document.getElementById('movies');
const count = document.getElementById('count');
const total = document.getElementById('total');

function randomize() {
    let n = Math.floor(Math.random() * 10);

    const min = 0;
    const max = 47;

    while (n > 0) {
        let random = Math.floor(Math.random() * (+max - +min)) + +min;
        seats[random].classList.add('occupied');
        seats[random].classList.remove('empty');
        n--;
    }
}

seats.forEach((seat) => {
    seat.addEventListener('mousedown', (e) => {
        if (seat.classList.contains('empty')) {
            seat.classList.remove('empty');
            seat.classList.add('selected');

            count.innerHTML = Number(count.innerHTML) + 1;
            total.innerHTML = Number(total.innerHTML) + Number(movies.value);
        } else if (seat.classList.contains('selected')) {
            seat.classList.remove('selected');
            seat.classList.add('empty');

            count.innerHTML = Number(count.innerHTML) - 1;
            total.innerHTML = Number(total.innerHTML) - Number(movies.value);
        }
    });
})

randomize();