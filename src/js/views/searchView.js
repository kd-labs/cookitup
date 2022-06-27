class SearchView {
  _parentElement = document.querySelector(".search");

  getQuery = function () {
    return this._parentElement.querySelector(".search__field").value;
  };

  addSearchHandler = function (searchHandler) {
    this._parentElement
      .querySelector(".search__btn")
      .addEventListener("click", function (e) {
        e.preventDefault();
        searchHandler();
      });
  };

  clearSearchQuery = function () {
    this._parentElement.querySelector(".search__field").value = "";
    this._parentElement.querySelector(".search__field").blur();
  };
}

export default new SearchView();
