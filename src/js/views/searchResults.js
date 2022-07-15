import View from "./view";
import icons from "url:../../img/icons.svg";

class SearchResults extends View {
  // parent element of search result view
  _parentElement = document.querySelector(".results");
  _errorMessage =
    "No recipes found for your query. Please try with some other name.";

  // function to render the search results.
  // called from controller class which passes the recipes search result
  renderSearchResults = function (data) {
    this._data = data;
    const searchResultMarkup = this._generateSearchResultsMarkeup();
    console.log("hello");
    console.log(searchResultMarkup);

    this._clear();
    this._parentElement.insertAdjacentHtml("afterbegin", searchResultMarkup);
  };

  _generateMarkup = function () {
    return this._data
      .map((res) => {
        return `
          <li class="preview">
            <a class="preview__link" href="#${res.id}">
              <figure class="preview__fig">
                <img src=${res.image} alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${res.title}</h4>
                <p class="preview__publisher">${res.publisher}</p>
                <div class="preview__user-generated ${res.key ? "" : "hidden"}">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
        `;
      })
      .join("");
  };
}

export default new SearchResults();
