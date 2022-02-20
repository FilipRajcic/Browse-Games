import * as model from "./model.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // get search query
    const query = searchView.getQuery();
    if (!query) return;
    console.log(query);

    await model.loadSearchResults(query);

    console.log(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

// const controlAddBookmark = function () {
//   model.state.search.results.map((game) => {
//     if (!game.bookmarked) model.addBookmark(game);
//     else model.deleteBookmark(game.id);
//   });
// };

// const controlShowBookmarks = function () {
//   bookmarksView.render(model.state.bookmarks);
//   console.log(model.state.bookmarks);
// };

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  // resultsView.addHandlerAddBookmark(controlAddBookmark);
  // bookmarksView.addHandlerShowBookmarks(controlShowBookmarks);
};
init();
