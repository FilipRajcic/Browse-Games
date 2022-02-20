import icons from "url:../../img/icons.svg";
class ResultsView {
  _parentEl = document.querySelector(".games__container");
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
  _clear() {
    this._parentEl.innerHTML = "";
  }
  addHandlerAddBookmark(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".game__bookmark__btn");
      if (!btn) return;
      handler();
    });
  }
  renderError() {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-notification"></use>
        </svg>
      </div>
      <p>${"There is no games found for your query! please try again."}</p>
    </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
  renderSpinner() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-spinner2"></use>
          </svg>
        </div>
        `;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  _priceSort(price) {
    if (price.length > 7 && price.indexOf("€") !== -1) {
      return price.split("€").at(1) + "€";
    } else if (price.length === 0) {
      return "Sorry, price is not yet defined";
    } else {
      return price;
    }
  }
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview.bind(this)).join("");
  }
  _generateMarkupPreview(result) {
    return `
    <div class="game">
        <img src="${result.image}" alt="Game Img" class="game__img" />
        <div class="game__title">${result.title}
        </div>
        <div class="game__release">${
          result.release === ""
            ? "Sorry, release date is not yet defined"
            : result.release
        }</div>
        <div class="game__price">${this._priceSort(result.price)}</div>
        <a href="${
          result.steamUrl
        }" class="game__btn__universal game__steam__btn">
        <svg class="game__icon__universal game__steam__icon">
            <use href="${icons}#icon-steam"></use>
        </svg>
        </a>
        <button class="game__btn__universal game__bookmark__btn">
        <svg class="game__icon__universal game__bookmark__icon">
            <use href="${icons}#icon-heart"></use>
        </svg>
        </button>
    </div>
      `;
  }
}

export default new ResultsView();
