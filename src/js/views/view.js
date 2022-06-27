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
