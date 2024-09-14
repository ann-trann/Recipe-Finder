const appID = '4b1bbdcf';
const appKey = 'dda60a26c2a706287e5b884b00131c99';

const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search');
const recipesDiv = document.getElementById('recipes');

searchBtn.addEventListener('click', () => {
    const query = searchInput.value;
    getRecipes(query);
});

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {  // Kiểm tra nếu phím là "Enter"
        const query = searchInput.value;
        getRecipes(query);
    }
});

async function getRecipes(query) {
    const apiURL = `https://api.edamam.com/search?q=${query}&app_id=${appID}&app_key=${appKey}`;
    
    const response = await fetch(apiURL);
    const data = await response.json();
    
    displayRecipes(data.hits);
}

function displayRecipes(recipes) {
    recipesDiv.innerHTML = '';
    
    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        
        recipeDiv.innerHTML = `
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
            <h3>${recipe.recipe.label}</h3>
            <p>Calories: ${Math.round(recipe.recipe.calories)}</p>
            <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
        `;
        
        recipesDiv.appendChild(recipeDiv);
    });
}
