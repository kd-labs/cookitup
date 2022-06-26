// import { async } from "regenerator-runtime";
import { fetchTimeout } from "./config";

export const getJson = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(fetchTimeout)]);
    /**
     *  Handling failed fetch responses
     */
    if (!res.ok) {
      throw new Error(`${recipeData.message}(${res.status})`);
    }
    const recipeData = await res.json();

    return recipeData;
  } catch (error) {
    throw error;
  }
};

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
