import View from "./view";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (this._data.page === 1) {
      // check if you're on first page
      return "page 1, others";
    }

    if (this._data.page > 1 && this._data.page < numPages) {
      return `previous page : ${this._data.page - 1}, current page : ${
        this._data.page
      }, next page : ${this._data.page + 1}`;
    }

    if (this._data.page === numPages && numPages > 1) {
      // current page = last page
      return "on last page";
    }

    return "only page";
  }
}

export default new PaginationView();
