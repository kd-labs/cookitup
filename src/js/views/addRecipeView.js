import View from "./view";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _successMessage = "Recipe was successfully added";

  _window = document.querySelector(".add-recipe-window");

  _overlay = document.querySelector(".overlay");

  _openAddRecipeFormButton = document.querySelector(".nav__btn--add-recipe");

  _closeAddRecipeFormButton = document.querySelector(".btn--close-modal");

  constructor() {
    super();
    this._addHandlerShowWindow();
  }

  _addHandlerShowWindow() {
    this._openAddRecipeFormButton.addEventListener(
      "click",
      this._toggleHiddenClass.bind(this)
    );

    this._closeAddRecipeFormButton.addEventListener(
      "click",
      this._toggleHiddenClass.bind(this)
    );

    this._overlay.addEventListener("click", this._toggleHiddenClass.bind(this));
  }

  addRecipeSubmitHandler(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _toggleHiddenClass(event) {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }
  _generateMarkup() {}
}

export default new AddRecipeView();
