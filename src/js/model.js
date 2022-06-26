export const state = {
  recipe: {},
};

export const loadRecipe = async function (recipeId) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
      // "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcf8d"
    );

    const recipeData = await res.json();

    /**
     *  Handling failed fetch responses
     */
    if (!res.ok) {
      throw new Error(`${recipeData.message}(${res.status})`);
    }

    const { recipe } = recipeData.data;

    console.log(recipe);

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

    console.log(state.recipe);
  } catch (error) {
    alert(error);
  }
};
