let importantCats = ["all"];
let otherCats = [];
let filteredRecipes = []; // لتخزين الوصفات بعد التصفية

function showCat() {
    baseRecipes.forEach(recipe => {
        const firstCat = recipe.categories[0];
        if (!importantCats.includes(firstCat)) {
            importantCats.push(firstCat);
        }
        for (let i = 1; i < recipe.categories.length; i++) {
            const otherCatsegory = recipe.categories[i];
            if (!otherCats.includes(otherCatsegory) && !importantCats.includes(otherCatsegory)) {
                otherCats.push(otherCatsegory);
            }
        }
    });

    const importantCatDiv = document.getElementById("importantCats");
    let importantHTML = "";

    importantCats.forEach(cat => {
        importantHTML += `
            <button onclick="filterRecipes('${cat}')" id="${cat}">${cat}</button>
        `;
    });

    importantCatDiv.innerHTML = importantHTML;

    const dropDown = document.getElementById("otherCat");
    let otherHTML = `<option value="Other" selected>Other</option>`;

    otherCats.forEach(cat => {
        otherHTML += `
            <option value="${cat}">${cat}</option>
        `;
    });

    dropDown.innerHTML = otherHTML;
    let btn =document.getElementById("all");
    btn.classList.add("active");
}

function filterRecipes(category) {
    if (category === "all" || category === "Other") {
        filteredRecipes = baseRecipes; // عرض جميع الوصفات
    } else {
        filteredRecipes = baseRecipes.filter(recipe =>
            recipe.categories.includes(category)
        );
    }
    importantCats.forEach(cat=>{
        let btn =document.getElementById(cat);
        if(cat==category){
            btn.classList.add("active");
        }else{
            btn.classList.remove("active");
        }
    });
    showRecipes();
}

function showRecipes() {
    const recipesDiv = document.getElementById("recipesGrid");
    let recipesHTML = "";

    filteredRecipes.forEach(recipe => {
        recipesHTML += `<div class="recipe-card" onclick="showModal('${recipe.id}')">
            <img src="${recipe.image}" alt="${recipe.name}">
            <h3>${recipe.name}</h3>
            <p>${recipe.shortDisc}</p>
        </div>`;
    });

    recipesDiv.innerHTML = recipesHTML;
}

function showModal(id){
    const recipe = baseRecipes.find(r => r.id == id);
    console.log(recipe);
    const modelContent = document.getElementById("modalContent");
    let ingredientsHTML="";
    recipe.ingredients.forEach(ing=>{
        ingredientsHTML+=`
        <li>${ing}</li>
        `;
    });
    let modelHTML="";
        modelHTML += `
        <div class="left-modal">
        <h2>${recipe.name}</h2>
        <img src="${recipe.image}" alt="${recipe.name}" style="width: 100%;">
        <p>${recipe.shortDisc}</p>
        </div>
        <div class="divider"></div>
        <div class="right-modal">
        <div class="top-modal">
        <ul class="ingredients">${ingredientsHTML}</ul>
        <button onClick="closeModal()">Close</button>
        </div>
        <div class="bottom-modal">
        <p><strong>Preparation: </strong>${recipe.preparation}</p>
        </div>
        </div>
    `;
    modelContent.innerHTML=modelHTML;

    const modal = document.getElementById("modal");
    modal.classList.remove("hidden");
    const overlay = document.getElementById("overlay");
    overlay.classList.remove("hidden");
}

function closeModal(){
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

window.onload = function () {
    filteredRecipes = baseRecipes; // في البداية، عرض جميع الوصفات
    showCat();
    showRecipes();
};
