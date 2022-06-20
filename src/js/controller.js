import icons from "url:../img/icons.svg";
import "core-js/stable"; // polyfilling everything else
import "regenerator-runtime/runtime"; // polyfilling async/await

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/**
 *  function to render spiiner to any parent element
 */

const renderSpinner = function (parentEl) {
  const spinnerMarkup = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div> 
  `;

  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", spinnerMarkup);
};

/**
 * async method to return single recipe
 * uses fetch API of browser which returns a promise
 * uses async and await keywords to send the async function to run in browser background and handles success of promises using await keyword.
 */
const fetchRecipe = async function () {
  try {
    /**
     *  1) Loading recipe from API
     */

    const recipeFragment = window.location.hash; // returns the path variable followed with '#' symbol
    // guard clause
    if (!recipeFragment || recipeFragment.length === 1) return;

    renderSpinner(recipeContainer);
    const recipeId = recipeFragment.slice(1);
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
      // "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcf8d"
    );

    const recipeData = await res.json();

    /**
     *  Handling failed fetch responses
     */
    if (!res.ok) {
      throw new Error(`${recipeData.message}(${res.status})`);
    }

    let { recipe } = recipeData.data;

    console.log(recipe);

    recipe = {
      id: recipe.id,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
      cookingTime: recipe.cooking_time,
    };

    console.log(recipe);

    /**
     *  2) Rendering recipe in recipe container
     */
    const recipeMarkup = `
    <figure class="recipe__fig">
    <img src="${recipe.imageUrl}" alt="${recipe.title}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${recipe.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        recipe.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        recipe.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="${icons}#icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">

    ${recipe.ingredients
      .map((ingredient) => {
        return `
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="src/img/icons.svg#icon-check"></use>
          </svg>${
            ingredient.quantity
              ? `<div class="recipe__quantity">${ingredient.quantity}</div>`
              : ""
          }
          
          <div class="recipe__description">
            ${
              ingredient.unit
                ? `<span class="recipe__unit">${ingredient.unit}</span>`
                : ""
            }
            ${ingredient.description}
          </div>
        </li>
      `;
      })
      .join("")}

    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        recipe.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${recipe.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="src/img/icons.svg#icon-arrow-right"></use>
      </svg>
    </a>
  </div>    
    `;

    recipeContainer.innerHTML = "";
    recipeContainer.insertAdjacentHTML("afterbegin", recipeMarkup);

    // console.log(res, recipeData);
  } catch (err) {
    alert(err);
    console.log(err);
  }
};

// API : https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

console.log("hello");

/**
 * calling async method to fetch recipe detail on window url hashchangeevent
 */

/**
 * calling async method to fetch recipe detail on window load event
 */

["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, fetchRecipe)
);
