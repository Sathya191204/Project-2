const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search');
const resultsList = document.querySelector('#results');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchRecipes();
});

async function searchRecipes() {
    const searchValue = searchInput.value.trim();
    if (!searchValue) {
        alert('Please enter an ingredient.');
        return;
    }

    try {
        const response = await fetch(`https://api.edamam.com/search?q=${searchValue}&app_id=544b5a71&app_key=f4dbe2a19f79a4cba7e500a8a4750abf&from=0&to=10`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayRecipes(data.hits);
    } catch (error) {
        console.error('Error fetching the API:', error);
        alert('There was an error fetching the recipes. Please try again later.');
    }
}

function displayRecipes(recipes) {
    let html = '';
    if (recipes.length === 0) {
        html = '<p>No recipes found. Please try a different search term.</p>';
    } else {
        recipes.forEach((recipe) => {
            html += `
            <div>
                <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                <h3>${recipe.recipe.label}</h3>
                <ul>
                    ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
                <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
            </div>
            `;
        });
    }
    resultsList.innerHTML = html;
}
