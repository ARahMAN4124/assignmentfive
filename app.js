const button = document.getElementById("search");
const searchInput = document.getElementById("input-value");
const search = () => {
  const inputValue = searchInput.value;
  const row = document.getElementById("row");

  // Loading item data by api
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      let mealname = " ";
      if (data.meals) {
        data.meals.forEach((mealName) => {
          mealname += `
                        <div type="button"   class="col-md-3 p-4">
                          <div 
                          onclick="mealsdetails('${mealName.strMeal}')"
                          class=" card text-center">
                            <img src="${mealName.strMealThumb}" class="card-img-top">
                            <div class="card-body">
                            <h3>${mealName.strMeal}</h3>
                            </div>
                            </div>
                          </div>
                    </div>
                        `;
        });
      } else {
        alert("No Result");
      }

      row.innerHTML = mealname;
    });
};

//meals details option

const mealsdetails = (name) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((response) => response.json())
    .then((data) => {
      showDetails(data.meals[0]);
    });
};
const showDetails = (mealDetails) => {
  const searchResultmore = document.createElement("div");
  searchResultmore.className = "searchresultmore";
  let value = `
        <div class="card">
        <img class="details-img card-img-top" src="${mealDetails.strMealThumb}"></img>
        <div class="card-body">
        <h2 class="meal-name card-title">${mealDetails.strMeal}</h2>
        <h5 class="meal-name ">Ingrediients</h5>
        <p class="meal-name">-${mealDetails.strIngredient1}</p>
        <p class="meal-name">-${mealDetails.strIngredient2}</p>
        <p class="meal-name">-${mealDetails.strIngredient3}</p>
        <p class="meal-name">-${mealDetails.strIngredient4}</p>
        <p class="meal-name">-${mealDetails.strIngredient5}</p>
        </div>
        </div>
        
        <p></p>
    `;
  searchResultmore.innerHTML = value;

  //meal details option close button
  document.body.addEventListener("dblclick", () => {
    document
      .getElementById("detail")
      .appendChild(searchResultmore).style.display = "none";
  });
  document.getElementById("detail").appendChild(searchResultmore);
};
