const searchForm = document.getElementById('form');
const searchInput = document.getElementById('search');
const resultList = document.getElementById('results');

searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    searchRecipes();
})

async function searchRecipes(){
    const searchValue = searchInput.ariaValueMax.trim();
    const response = await fetch(`https://api.edamam.com/search?q=${searchValue}&app_id=7aa516a5&app_key=dc836a223fb788b11ae390504d9e97ce&from=0&to=10`)
    const data = await response.json();
    displayRecipes(data.hits)
}   

function displayRecipes(recipes){
    let html = '';
    recipes.forEach((recipe) => {
        html+=
        `<div>
        <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
        <h3>${recipe.recipe.label}</h3>
        <ul>
            ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
        <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
    </div> `
    })
    resultList.innerHtml = html;
}