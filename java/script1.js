function showRandomRecipes() {
    const recipesGrid = document.getElementById("recipes-grid");
    if (!recipesGrid) {
        console.log("recipes-grid not found. Skipping randomRecipes execution.");
        return; // توقف الدالة إذا كان العنصر غير موجود
    }

    const randomRecipes = [];
    while (randomRecipes.length < 3) {
        const randomIndex = Math.floor(Math.random() * baseRecipes.length);
        if (!randomRecipes.includes(baseRecipes[randomIndex])) {
            randomRecipes.push(baseRecipes[randomIndex]);
        }
    }

    let recipesHTML = "";
    randomRecipes.forEach(recipe => {
        recipesHTML += `
            <div class="recipe-card">
                <img src="${recipe.image}" alt="${recipe.name}">
                <h3>${recipe.name}</h3>
                <p>${recipe.shortDisc}</p>
            </div>
        `;
    });

    recipesGrid.innerHTML = recipesHTML;
}

// تحديث التعليق عند الضغط على الصورة
function updateComment(index) {
    // تحديث نصوص التعليق
    document.getElementById("comment-text").innerHTML = commentsData[index].comment;
    document.getElementById("comment-author").innerHTML = `- ${commentsData[index].name}`;
    document.getElementById("comment-title").innerHTML = commentsData[index].title;

    // التعامل مع الصور
    for (let i = 0; i < 6; i++) {
        document.getElementById(`chef-image-${i}`).classList.remove("active");
    }

    // إضافة الفئة "active" للصورة المختارة
    document.getElementById(`chef-image-${index}`).classList.add("active");
}

// التعليقات الافتراضية
const defaultComments = [
    { name: 'Colt', comment: 'Great website' },
    { name: 'Janet', comment: 'I love the pizza recipe so much!' },
    { name: 'Emz', comment: 'Great' },
    { name: 'Larry', comment: 'can not wait to try alfredo recipe' },
  ];
  
  // عرض التعليقات الافتراضية عند تحميل الصفحة
function showComments() {
    const commentsList = document.getElementById('comments');
    let commentsHTML = ''; // متغير لتخزين HTML التعليقات
  
    for (let i = 0; i < defaultComments.length; i++) {
      commentsHTML += `<li><strong>${defaultComments[i].name} :</strong> ${defaultComments[i].comment}</li>`;
    }
  
    // إضافة التعليقات الافتراضية إلى القائمة
    commentsList.innerHTML = commentsHTML;
  };
  
  // إضافة تعليق جديد
  function addComment() {
    const nameInput = document.getElementById('name');  // حقل الاسم
    const commentInput = document.getElementById('comment');  // حقل التعليق

    const name=nameInput.value.trim();
    const comment=commentInput.value.trim();
  
    if (name && comment) {
      const commentsList = document.getElementById('comments');
      
      // إضافة تعليق جديد باستخدام innerHTML
      commentsList.innerHTML += `<li><strong>${name} :</strong> ${comment}</li>`;
  
      // مسح الحقول بعد إضافة التعليق
      nameInput.value = '';
      commentInput.value = '';

      nameInput.classList.remove('error')
      commentInput.classList.remove('error')
    } else {
        if (!name) {
            nameInput.placeholder = 'Enter a name!';
            nameInput.classList.add('error'); // إضافة تأثير مرئي إذا كنت ترغب
          }
      
          if (!comment) {
            commentInput.placeholder = 'Enter a comment!';
            commentInput.classList.add('error'); // إضافة تأثير مرئي إذا كنت ترغب
          }
    }
  }

  // استدعاء updateComment(0) بعد التأكد من تحميل الصفحة
window.onload = function () {
    showRandomRecipes();
    updateComment(0);
    showComments();
};