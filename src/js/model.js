import { API_URL } from "./config.js";
import { getJson } from "./helpers.js";

/**
 *  STATE OBJECT
 */
export const state = {
  recipe: {},
  search: {
    query: "",
    recipes: [],
  },
};

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
    };

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
    const data = await getJson(`${API_URL}?search=${query}`);

    state.search.query = query;
    state.search.recipes = data.data.recipes.map((recipe) => {
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
