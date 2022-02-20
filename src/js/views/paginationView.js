import icons from "url:../../img/icons.svg"; // Parcel 2

class PaginationView {
  _parentEl = document.querySelector(".games__navigation");

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }

  addHandlerClick(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".game__btn");
      if (!btn) return;
      console.log("kliiik");
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
      
      <button data-goto="${curPage - 1}" class=
      "game__btn btn--prev hidden">
      <svg class="game__btn__icon">
        <use href="${icons}#icon-arrow-left2"></use>
      </svg>
      <span class="span-1">Page ${curPage - 1}</span>
    </button>
        <button data-goto="${curPage + 1}" class=
        "game__btn btn--next">
        <span class="span-2">Page ${curPage + 1}</span>
        <svg class="game__btn__icon">
          <use href="${icons}#icon-arrow-right2"></use>
        </svg>
      </button>
      `;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
        <button data-goto="${curPage - 1}" class=
        "game__btn btn--prev">
        <svg class="game__btn__icon">
          <use href="${icons}#icon-arrow-left2"></use>
        </svg>
        <span class="span-1">Page ${curPage - 1}</span>
      </button>
      `;
    }

    // Other page
    if (curPage < numPages) {
      return `
      <button data-goto="${curPage - 1}" class=
      "game__btn btn--prev">
      <svg class="game__btn__icon">
        <use href="${icons}#icon-arrow-left2"></use>
      </svg>
      <span class="span-1">Page ${curPage - 1}</span>
    </button>
    <button data-goto="${curPage + 1}" class="game__btn btn--next">
        <span class="span-2">Page ${curPage + 1}</span>
        <svg class="game__btn__icon">
          <use href="${icons}#icon-arrow-right2"></use>
        </svg>
      </button>
      `;
    }

    // Page 1, and there are NO other pages
    return "";
  }
}

export default new PaginationView();
