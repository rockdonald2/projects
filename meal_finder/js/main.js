const reload = document.querySelector('#reload');

reload.addEventListener('click', () => location.reload());

const searchBtn = document.querySelector('#search');
const searchBar = document.querySelector('#searchBar');
const randomBtn = document.querySelector('#randomBtn');

const mealContainer = document.querySelector('.meal-container')
const mealName = document.querySelector('#mealName');
const mealPicture = document.querySelector('#mealPicture');
const mealCategory = document.querySelector('#mealCategory');
const mealArea = document.querySelector('#mealArea');
const mealPrep = document.querySelector('#mealPrep');
const mealIngredients = document.querySelector('#mealIngredients');

const searchResults = document.querySelector('#searchResults');
const searchContainer = document.querySelector('.search-result');
const searchHeading = document.querySelector('#searchHeading');

function randomMeal() {
    searchContainer.style.display = 'none';

    fetch('https://www.themealdb.com/api/json/v1/1/random.php').then((promise) => {
        return promise.json();
    }).then((meal) => {
        updateMealDOM(meal['meals'][0]);
    });
}

searchBtn.addEventListener('submit', search);

function displaySearch(e) {
    let id = 0;

    for (let meal of e.path) {
        if (meal.dataset.mealId) {
            id = meal.dataset.mealId;
            break;
        }
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((promise) => {
        return promise.json();
    }).then((meal) => {
        updateMealDOM(meal['meals'][0]);
    });
}

function search(e) {
    e.preventDefault();

    const term = searchBar.value;

    mealContainer.style.display = 'none';

    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`).then((promise) => {
            return promise.json();
        }).then((meals) => {

            searchResults.innerHTML = '';

            if (meals['meals']) {
                searchHeading.innerHTML = `Search result for '${term}':`;

                for (let i = 0; i < meals['meals'].length; i++) {
                    let innerHtml = `<img src="${meals['meals'][i]['strMealThumb']}"
                        alt="Meal picture">
                    <div class="search-result__meals--meal--info">
                        <h3>${meals['meals'][i]['strMeal']}</h3>
                    </div>`;
                    let container = document.createElement('div');
                    container.className = 'search-result__meals--meal';
                    container.dataset.mealId = meals['meals'][i]['idMeal'];
                    container.onclick = displaySearch;
                    container.innerHTML = innerHtml;

                    searchResults.appendChild(container);
                }

                searchContainer.style.display = 'block';
            } else {
                searchHeading.innerHTML = 'There are no search results. Try again!';

                searchContainer.style.display = 'block';
            }
        });
    } else {
        alert('You must first enter a keyword to search');
    }
}

randomBtn.addEventListener('click', randomMeal);

function updateMealDOM(meal) {
    mealName.innerHTML = meal['strMeal'];
    mealPicture.src = meal['strMealThumb'];
    mealCategory.innerHTML = meal['strCategory'];
    mealArea.innerHTML = meal['strArea'];
    mealPrep.innerHTML = meal['strInstructions'];

    mealIngredients.innerHTML = '';
    for (let i = 1; i < 20; ++i) {
        if (meal[`strIngredient${i}`]) {
            let html = `<span class="meal__ingredients--ingredient">${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}</span>`;
            mealIngredients.innerHTML += html;
        } else {
            break;
        }
    }

    mealContainer.style.display = 'flex';
}