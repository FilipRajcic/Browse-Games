import { API_URL, RESULTS_PER_PAGE } from "./config.js";
import { AJAX } from "./helpers.js";
import { async } from "regenerator-runtime";

export const state = {
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  bookmarks: [],
};

export const loadSearchResults = async function (query) {
  try {
    console.log(`${API_URL}${query}/page/1`);
    const data = await AJAX(`${API_URL}${query}/page/1`);
    state.search.results = data.map((game) => {
      return {
        id: game.app_id,
        image: game.imgUrl,
        price: game.price.trim(),
        release: game.released,
        title: game.title,
        steamUrl: game.url,
        bookmarked: false,
      };
    });

    state.search.page = 1;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9

  return state.search.results.slice(start, end);
};

const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = function (game) {
  state.bookmarks.push(game);
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);
  persistBookmarks();
};
