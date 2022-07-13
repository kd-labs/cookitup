import { API_URL, pageSize } from "./config.js";
import { getJson } from "./helpers.js";

/**
 *  STATE OBJECT
 */
export const state = {
  recipe: {},
  bookmarks: [],
  search: {
    query: "",
    results: [],
    resultsPerPage: pageSize,
    page: 1,
  },
};

const bookmarkedRecipeKey = "bookmarkedRecipes";

/**
 *  Function to load a single recipe from API
 */
export const loadRecipe = async function (recipeId) {
  try {
    const recipeData = await getJson(`${API_URL}/${recipeId}`);
    const { recipe } = recipeData.data;

    // console.log(recipe);

    state.recipe = {
      id: recipe.id,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
      cookingTime: recipe.cooking_time,
      bookmarked: false,
    };

    if (state.bookmarks.some((bookmark) => bookmark.id === recipeId)) {
      state.recipe.bookmark = true;
    } else state.recipe.bookmark = false;

    // console.log(state.recipe);
  } catch (error) {
    console.log(error + "\nfrom model");
    throw error;
  }
};

/**
 *  Function to load search results from API for a search query
 */

// named export
export const loadSearchResults = async function (query) {
  try {
    const data = await getJson(`${API_URL}?search=${query}`); // calling getJson from helpers file

    state.search.query = query;
    state.search.page = 1;
    state.search.results = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/*
  function to get paginated results of search
  returns : list of recipe objects as per current page
*/
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = +page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  // 1. make changes to model.state.recipe's object servings
  state.recipe.ingredients.forEach((ingredient) => {
    ingredient.quantity =
      ingredient.quantity * (newServings / state.recipe.servings);
  });
  state.recipe.servings = newServings;
};

/*
  method to bookmark a recipe i.e. pushing a recipe to bookamrk array in state object
*/

export const addBookmark = function (recipe) {
  // push the recipe passed into bookmarks array in state object
  state.bookmarks.push(recipe);

  // mark current recipe as bookmarked
  if (state.recipe.id === recipe.id) state.recipe.bookmark = true;
  pushBookmarkedRecipesToLocalStorage();
};

export const removeBookmark = function (id) {
  // push the recipe passed into bookmarks array in state object
  state.bookmarks = state.bookmarks.filter((rec) => rec.id !== id);

  // mark current recipe as bookmarked
  if (state.recipe.id === id) state.recipe.bookmark = false;
  pushBookmarkedRecipesToLocalStorage();
};

/**
 * method to push bookmarks array to local storage.
 * data in local storage persists across sessions for a given page/domain
 */
const pushBookmarkedRecipesToLocalStorage = function () {
  localStorage.setItem(bookmarkedRecipeKey, JSON.stringify(state.bookmarks));
};

const loadBookmarkedRecipesFromLocalStorage = function () {
  const storage = localStorage.getItem(bookmarkedRecipeKey);
  if (storage) state.bookmarks = JSON.parse(storage);
};

loadBookmarkedRecipesFromLocalStorage();
