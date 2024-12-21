usedCats=[];
let recipes = []; // قائمة الوصفات
let ingredientCount = 1;
let idCount = 1;

function showCat(){
const catBoxs =document.getElementById("mainCategoreis");
let boxHTML="";

baseRecipes.forEach(recipe => {
    baseRecipes.forEach(cat=>{
        for (let i = 1; i < recipe.categories.length; i++) {
            const Catsegory = recipe.categories[i];
            if (!usedCats.includes(Catsegory)) {
                usedCats.push(Catsegory);
                boxHTML+=`
                <div class="${Catsegory}"> 
                <label for="${Catsegory}" class="cat-label"><input type="checkbox" id="${Catsegory}" value="${Catsegory}">${Catsegory}</label>
                </div>
                `;
            }
        }
    });
});

catBoxs.innerHTML=boxHTML;
}

function addIngredient(event){
    event.preventDefault();

    const ing = document.getElementById("ingredientsContainer");
    const newIngrredientId = `ingedient-${ingredientCount}`;

     const ingHTML = `
     <div class="ingredient-container" id="${newIngrredientId}">
            <div class="group-input">
              <input type="text" name="" class="ingredient" required>
            </div>
            <button class="delete-ingredient" onclick="closeIngredient('${newIngrredientId}')">x</button>
          </div>
          </div>
    `;

    ing.insertAdjacentHTML('beforeend' , ingHTML);
    ingredientCount++;
}

function closeIngredient(id){
    const ing = document.getElementById(id);
    ing.remove();
}

function limitLines(textarea) {
    let lines = textarea.value.split('\n'); // تقسيم النص إلى أسطر

    // إذا كان عدد الأسطر أكبر من 14
    if (lines.length > 14) {
      lines = lines.slice(0, 14); // قطع النص إلى 14 سطر
    }
  
    // معالجة كل سطر للتأكد من عدم تجاوز 73 حرفًا
    for (let i = 0; i < lines.length; i++) {
      // إذا كان طول السطر أكبر من 73 حرفًا، نزيل الحروف الزائدة
      lines[i] = lines[i].substring(0, 73);
    }
  
    // تحديث النص في الـ textarea
    textarea.value = lines.join('\n');
  
    // التحقق إذا كان السطر الحالي قد وصل إلى الحد الأقصى (73 حرفًا)
    const lastLine = textarea.value.split('\n').pop(); // السطر الأخير
    if (lastLine.length === 73) {
      // إذا كان السطر الأخير قد وصل إلى 73 حرفًا، نضيف سطرًا جديدًا تلقائيًا
      textarea.value += '\n';
    } 

    // إظهار رسالة التنبيه عندما يصل المستخدم إلى الحد الأقصى
  if (lines.length === 14 && lastLine.length === 73) {
    document.getElementById('warningMessage').style.display = 'block';
  } else {
    document.getElementById('warningMessage').style.display = 'none';
  }
  }
  

function saveRecipe(event){
    event.preventDefault();

      // جلب القيم من الحقول
  const recipeName = document.getElementById("recipeName").value;
  const shortDescription = document.getElementById("shortDescription").value;
  const preparation = document.getElementById("preparation").value;

  // جلب المكونات باستخدام getElementsByClassName
  const ingredientInputs = document.getElementsByClassName("ingredient");
  const ingredients = [];
  for (let i = 0; i < ingredientInputs.length; i++) {
    if (ingredientInputs[i].value !== "") { // التحقق إذا كان الحقل ليس فارغًا
      ingredients.push(ingredientInputs[i].value);
    }
  }

  // جلب التصنيفات المختارة باستخدام getElementsByTagName
  const categoryInputs = document.getElementById("mainCategoreis").getElementsByTagName("input");
  const selectedCategories = [];
  for (let i = 0; i < categoryInputs.length; i++) {
    if (categoryInputs[i].checked) { // التحقق إذا كان التصنيف مختارًا
      selectedCategories.push(categoryInputs[i].value);
    }
  }  

  // جلب الصورة
  const imageInput = document.getElementById("image");
  let imageFile = null;
  if (imageInput.files.length > 0) {
    imageFile = URL.createObjectURL(imageInput.files[0]);  // إنشاء رابط مؤقت للصورة
  }

  // إنشاء كائن الوصفة
  const recipe = {
    id: idCount++,
    name: recipeName,
    shortDisc: shortDescription,
    ingredients: ingredients,
    preparation:preparation,
    categories: selectedCategories,
    image: imageFile,
  };

  // إضافة الوصفة إلى القائمة
  recipes.push(recipe);

  // إعادة تعيين النموذج
  document.getElementById("addForm").reset();

  openConfirmationPopup();

  showRecipes();

  // overlay.classList.remove("hidden");

  console.log(imageFile);
}

function openConfirmationPopup(){
    const confirmationPopup = document.getElementById('confirmationPopup');
    confirmationPopup.style.display = 'block';

    const recipeModal = document.getElementById("recipeOverlay");
    recipeModal.classList.remove("hidden");
}

function closePopup() {
    // إخفاء نافذة التأكيد
    const confirmationPopup = document.getElementById('confirmationPopup');
    confirmationPopup.style.display = 'none';

    const recipeModal = document.getElementById("recipeOverlay");
    recipeModal.classList.add("hidden");
  }

function showRecipes() {
    const recipesDiv = document.getElementById("recipesGrid");
    let recipesHTML = "";

    recipes.forEach(recipe => {
        recipesHTML += `<div class="recipe-card" onclick="showModal('${recipe.id}')">
            <img src="${recipe.image}" alt="${recipe.name}">
            <h3>${recipe.name}</h3>
            <p>${recipe.shortDisc}</p>
        </div>`;
    });

    recipesDiv.innerHTML = recipesHTML;

    showRecipesBtn();
}

function showModal(id){
    const recipe = recipes.find(r => r.id == id);
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
    const overlay = document.getElementById("overlay");
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

function closeModal(){
    modal.classList.add("hidden");
    overlay.classList.add("hidden");

}

function showRecipesBtn() {
  const recipesBtn = document.getElementById("recipesBtn");

  if(recipes.length>0){
  recipesBtn.firstElementChild.classList.remove("hidden-btn");
  }else{
    recipesBtn.firstElementChild.classList.add("hidden-btn");
  }
}

window.onload = function(){
    showCat();
    showRecipesBtn();
}