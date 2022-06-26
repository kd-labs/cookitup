import { API_URL } from "./config.js";
import { getJson } from "./helpers.js";

export const state = {
  recipe: {},
};

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
