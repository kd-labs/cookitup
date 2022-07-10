import View from "./view";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addClickHandler(handler) {
    this._parentElement.addEventListener("click", function (e) {
      // e.target.closest is listened because click event can happen on svg or span element
      const btn = e.target.closest(".btn--inline");

      // guard clause
      if (!btn) return;

      const gotoPage = btn.dataset.goto;

      // handler is passed by controller where it is defined and passed in init method
      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (this._data.page === 1) {
      // check if you're on first page
      return this._nextPageButtonMarkup(this._data.page + 1);
    }

    if (this._data.page > 1 && this._data.page < numPages) {
      // in between page
      return (
        this._prevPageButtonMarkup(this._data.page - 1) +
        this._nextPageButtonMarkup(this._data.page + 1)
      );
    }

    if (this._data.page === numPages && numPages > 1) {
      // current page = last page
      return this._prevPageButtonMarkup(this._data.page - 1);
    }

    return "";
  }

  _prevPageButtonMarkup(pageNum) {
    return `
          <button data-goto="${pageNum}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${pageNum}</span>
          </button>
      `;
  }

  _nextPageButtonMarkup(pageNum) {
    return `
          <button data-goto="${pageNum}" class="btn--inline pagination__btn--next">
            <span>Page ${pageNum}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
  }
}

export default new PaginationView();
