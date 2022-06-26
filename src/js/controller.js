import icons from "url:../img/icons.svg";
import "core-js/stable"; // polyfilling everything else
import "regenerator-runtime/runtime"; // polyfilling async/await
import * as model from "./model";
import recipeView from "./views/recipeView";

// const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/**
 *  function to render spiiner to any parent element
 */

recipeView.renderSpinner();

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
     *  2) Rendering recipe in recipe container
     */

    const { recipe } = model.state;

    recipeView.render(recipe);

    // console.log(res, recipeData);
  } catch (err) {
    alert(err);
    console.log(err);
  }
};

// API : https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

console.log("hello");

/**
 * calling async method to fetch recipe detail on window url hashchangeevent
 */

/**
 * calling async method to fetch recipe detail on window load event
 */

["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, fetchRecipe)
);
