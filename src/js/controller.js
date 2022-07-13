import icons from "url:../img/icons.svg";
import "core-js/stable"; // polyfilling everything else
import "regenerator-runtime/runtime"; // polyfilling async/await
import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView.js";
import searchResults from "./views/searchResults";
import paginationView from "./views/paginationView";

// Hot Module Replacement from parcel
if (module.hot) {
  module.hot.accept();
}

/**
 * async method to return single recipe
 * uses fetch API of browser which returns a promise
 * uses async and await keywords to send the async function to run in browser background and handles success of promises using await keyword.
 */
const fetchRecipe = async function () {
  try {
    const recipeFragment = window.location.hash; // returns the path variable followed with '#' symbol

    // guard clause
    if (!recipeFragment || recipeFragment.length === 1) return;

    recipeView.renderSpinner();
    const recipeId = recipeFragment.slice(1);

    /**
     *  1) Loading recipe from API
     */
    await model.loadRecipe(recipeId);

    /**
     *  2) Rendering recipe in recipe details view container
     */

    const { recipe } = model.state;

    console.log(recipe);
    console.log(model.state.bookmarks);

    recipeView.render(recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

/**
 * Function to load the search query results and then pass to the view registerHandler method
 * whenever there is change in the search bar element
 */

const querySearch = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    searchView.clearSearchQuery();

    // 1. from controller call model's method to get search results and update in state object
    await model.loadSearchResults(query);

    // 2. pass model.state.search.recipes to search results views' method to render the search results in dom.
    // searchResults.render(model.state.search.recipes);
    searchResults.render(model.getSearchResultsPage());

    // 3. pass the search data to render pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

// Publisher Subscriber model
// view is the publisher and the controller is the subscriber
// controller registers it's hook(method to be called in response to an event) with the publisher i.e. pagination view
const pageNavigationHandler = function (pageNum) {
  searchResults.render(model.getSearchResultsPage(pageNum));

  paginationView.render(model.state.search);
};

// creating handler which will be passed/registered to recipe details view
// the handler will be invoked in the recipe details view as part of click event handler for servings '+' and '-' button

const updateServingsHandler = function (operation) {
  // 1. update the recipe servings in the model
  if (operation === "plus")
    model.updateServings(model.state.recipe.servings + 1);
  else {
    if (model.state.recipe.servings === 1) return;
    model.updateServings(model.state.recipe.servings - 1);
  }

  // 2. update the recipe servings in recipe details view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

/**
 * handler method defined in controller which is passed into recipe details view's register method
 * this method will be called as part of addEventHandler for click event on bookmark button
 */
const updateBookmark = function () {
  // call model method to add current recipe i.e. state.recipe into state.bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe);

  // call recipe view method to change the bookmakr icon to filled incon
  recipeView.updateRecipeBookmarked();
};

const init = function () {
  recipeView.addHandlerRender(fetchRecipe);
  recipeView.addServingsUpdateHandler(updateServingsHandler);
  recipeView.addBookmarkHandler(updateBookmark);
  searchView.addSearchHandler(querySearch);
  paginationView.addClickHandler(pageNavigationHandler);
};

/********************** MAIN STARTS **********************/
init();
