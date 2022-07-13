import icons from "url:../../img/icons.svg";
import fracty from "fracty";
import View from "./view";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _errorMessage =
    "Could not find recipe of that id. Please try with another one";
  _successMessage = "";

  addHandlerRender(fn) {
    /**
     * calling async method to fetch recipe detail on window url hashchangeevent
     */

    /**
     * calling async method to fetch recipe detail on window load event
     */

    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, fn)
    );
  }

  addServingsUpdateHandler(fn) {
    // check why element with this class is not getting selected
    // const htmlEl = this._parentElement.querySelector(".recipe__info-buttons");
    // console.log(htmlEl);
    this._parentElement.addEventListener("click", function (e) {
      // 1. get the servings update button element from dom
      const btn = e.target.closest(".btn--tiny");

      // guard clause
      if (!btn) return;

      // 3. check if event is from increase button or decrease button
      //    if increase-button, call handler fn with +1 servings
      //    else decrease-button, call handler fn with -1 servings
      btn.classList.contains("btn--increase-servings")
        ? fn("plus")
        : fn("minus");
    });
  }

  addBookmarkHandler(handlerFn) {
    this._parentElement.addEventListener("click", function (e) {
      console.log("bookmark click event happened");
      // check if there bookmark class btn in the click event path
      const bookmarkBtnEl = e.target.closest(".btn--bookmark");

      // guard clause
      if (!bookmarkBtnEl) return;

      handlerFn();
    });
  }

  updateRecipeBookmarked() {
    this._parentElement.querySelector(".btn--bookmark").innerHTML = `
      <svg class="">
        <use href="${icons}#icon-bookmark-fill"></use>
      </svg>
    `;
  }

  _generateMarkup() {
    return `
    <figure class="recipe__fig">
    <img src="${this._data.imageUrl}" alt="${
      this._data.title
    }" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--decrease-servings">
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
    </div>
    <button class="btn--round btn--bookmark">
      <svg class="">
        <use href="${icons}#icon-bookmark${
      this._data.bookmark ? "-fill" : ""
    }"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">

    ${this._data.ingredients
      .map((ingredient) => {
        return `
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="src/img/icons.svg#icon-check"></use>
          </svg>${
            ingredient.quantity
              ? `<div class="recipe__quantity">${fracty(
                  ingredient.quantity
                )}</div>`
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
        this._data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this._data.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="src/img/icons.svg#icon-arrow-right"></use>
      </svg>
    </a>
  </div>    
    `;
  }
}

export default new RecipeView();
