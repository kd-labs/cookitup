import icons from "url:../../img/icons.svg";

export default class View {
  _data;

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const spinnerMarkup = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div> 
  `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", spinnerMarkup);
  }

  /*
    method which will update partial/certain elements in view and not whole view
  */
  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this._renderError();
    this._data = data;

    const newMarkup = this._generateMarkup();

    // convert newMarkup string into HTML element structure in virtual DOM which lives in memory which will then be compared with actual DOM elements
    // Important Note:
    // This is how javascript frameworks do partial update in the DOM without updating the whole page/view
    // 1. create new markup
    // 2. create HTML element structure in virtual DOM
    // 3. compare with real DOM elements
    // 4. update only the different elements in the actual DOM
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const currElements = Array.from(this._parentElement.querySelectorAll("*"));
    newElements.forEach((newEl, i) => {
      const currEl = currElements[i];

      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        currEl.textContent = newEl.textContent;
      }
    });
  }

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this._renderError();
    this._data = data;

    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _renderError = function (message = this._errorMessage) {
    const errorMarkup = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", errorMarkup);
  };

  _renderSuccess = function (message = this._successMessage) {
    const successMarkup = `<div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", successMarkup);
  };
}
