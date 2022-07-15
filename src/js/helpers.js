// import { async } from "regenerator-runtime";
import { fetchTimeout } from "./config";

export const getJson = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(fetchTimeout)]);
    const data = await res.json();
    /**
     *  Handling failed fetch responses
     */
    if (!res.ok) {
      throw new Error(`${data.message}(${res.status})`);
    }

    console.log(res);
    console.log(data);

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const sendJson = async function (url, recipeToUpload) {
  try {
    const fetchRes = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeToUpload),
    });
    const res = await Promise.race([fetchRes, timeout(fetchTimeout)]);
    const data = await res.json();
    /**
     *  Handling failed fetch responses
     */
    if (!res.ok) {
      throw new Error(`${data.message}(${res.status})`);
    }

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
