import resultsView from "./resultsView.js";
import icons from "url:../../img/icons.svg"; // Parcel 2

class BookmakrsView {
  _parentEl = document.querySelector(".games__container");
  _bookmarkBtn = document.querySelector(".nav");
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = resultsView.data;
    const markup = resultsView._generateMarkup();
    resultsView._clear();
    resultsView._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }
  addHandlerShowBookmarks(handler) {
    this._bookmarkBtn.addEventListener("click", function (e) {
      const btn = e.target.closest(".nav__btn--bookmarks");
      if (!btn) return;
      handler();
    });
  }
}

export default new BookmakrsView();
