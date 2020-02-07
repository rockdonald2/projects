const currencyT = document.querySelector('#currencyT');
const currencyB = document.querySelector('#currencyB');

const quantityT = document.querySelector('#quantityT');
const quantityB = document.querySelector('#quantityB');

const swap = document.querySelector('#swap');
const rate = document.querySelector('#rate');

function calculate() {
    fetch(`https://api.exchangerate-api.com/v4/latest/${currencyT.value}`)
    .then((response) => {
        return response.json();
    }).then((json) => {
        console.log(json);
        rate.textContent = `1 ${currencyT.value} = ${json.rates[currencyB.value]} ${currencyB.value}`;

        quantityB.value = (quantityT.value * json.rates[currencyB.value]).toFixed(4);
    });
}

swap.addEventListener('click', () => {
    let temp = currencyT.value;
    currencyT.value = currencyB.value;
    currencyB.value = temp;

    calculate();
});

currencyT.addEventListener('change', calculate);
currencyB.addEventListener('change', calculate);
quantityT.addEventListener('input', calculate);
quantityB.addEventListener('input', calculate);

calculate();