import { async } from "regenerator-runtime";

export const AJAX = async function (url) {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "steam2.p.rapidapi.com",
        "x-rapidapi-key": "3e3c175dbcmshfd111489ca98a7fp117d2djsne1cb8b94dba4",
      },
    });
    const data = res.json();
    return data;
  } catch (err) {
    throw err;
  }
};
