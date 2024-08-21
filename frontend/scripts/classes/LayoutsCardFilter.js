import LayoutsCardCreation from "./LayoutsCardCreation.js";
import LayoutsCardRender from "./LayoutsCardRender.js";

const layoutsCardRender = new LayoutsCardRender(".gallery__cards");

class LayoutsCardFilter {
  constructor(selector) {
    this.filter = document.querySelector(selector);
    this.layoutCardsArray = [];
    this.filterTags = ["", "", "", "", "", ""];

    // Вызов методов
    this.getLayoutsCards().then(() => {
      this.renderLatoutsCards(this.layoutCardsArray);
    });

    this.makeElActive(".filter__bottom-item", "active");
    this.activationFilterBtn(".filter__btn", "filter__btn--active");
    this.stylingItemsOnHover(".filter__menu", ".filter__menu-item");
    this.replacingText(".filter");
    this.resetSearchParameters(".filter__items-btn");
  }

  // Метод получения карточек с бэка
  async getLayoutsCards() {
    try {
      const response = await fetch(`http://79.174.86.232:5001/layouts`);
      const layoutCardsArray = await response.json();
      this.layoutCardsArray = layoutCardsArray;
    } catch (error) {
      console.log("Не удалось получить карточки:", error);
    }
  }

  // Метод рендера карточек
  renderLatoutsCards(arrayForRendering) {
    arrayForRendering.forEach((el) => {
      layoutsCardRender.addCard(new LayoutsCardCreation(el));
      layoutsCardRender.render();
    });
  }

  //   Метод активации элемента
  makeElActive(els, elClass) {
    // Находим все элементы по селектору
    const clickEls = document.querySelectorAll(els);
    // Добавляем обработчик клика для каждого элемента
    clickEls.forEach((clickEl) => {
      clickEl.addEventListener("click", () => {
        // Итерируем по всем элементам и удаляем класс у других элементов
        clickEls.forEach((otherEl) => {
          if (otherEl !== clickEl) {
            otherEl.classList.remove(elClass);
          }
        });
        // Переключаем класс у текущего элемента
        clickEl.classList.toggle(elClass);
      });
    });
  }

  //   Метод активации filter__btn при клике
  activationFilterBtn(els, elClass) {
    // Находим все элементы по селектору
    const clickEls = document.querySelectorAll(els);
    // Добавляем обработчик клика для каждого элемента
    clickEls.forEach((clickEl, index) => {
      clickEl.addEventListener("click", () => {
        if (index == 0) {
          this.filterTags[0] = "";
        } else {
          this.filterTags[0] = clickEl.textContent.trim();
        }
        layoutsCardRender.filterCards(this.filterTags);

        // Итерируем по всем элементам и удаляем класс у других элементов
        clickEls.forEach((otherEl) => {
          if (otherEl !== clickEl) {
            otherEl.classList.remove(elClass);
          }
        });

        // Переключаем класс у текущего элемента
        clickEl.classList.toggle(elClass);
      });
    });
  }

  //   Метод стилизации пунктов меню при наведении
  stylingItemsOnHover(mainClassEls, itemClassEls) {
    const mainEls = document.querySelectorAll(mainClassEls);
    mainEls.forEach((mainEl) => {
      const mainItemEls = mainEl.querySelectorAll(itemClassEls);
      mainItemEls.forEach((mainItemEl, index) => {
        mainItemEl.addEventListener("mouseover", () => {
          if (index > 0) {
            mainItemEl.classList.add("hover");
            mainItemEls[0].classList.add("filter__menu-item--active-hover");
          }
        });
        mainItemEl.addEventListener("mouseout", () => {
          mainItemEl.classList.remove("hover");
          mainItemEls[0].classList.remove("filter__menu-item--active-hover");
        });
      });
    });
  }

  //   Метод замены текста при нажатии на пункт меню
  replacingText(selector) {
    const filterEl = document.querySelector(selector);
    // Проверка на наличие элемента с переданным селектором
    if (!filterEl) {
      console.warn(`Элемент с селектором "${selector}" не найден.`);
      return;
    }

    const filterMenuEls = filterEl.querySelectorAll(".filter__menu");

    // Метод замены текста
    filterMenuEls.forEach((filterMenuEl, parentIndex) => {
      const filterMenuItemEls =
        filterMenuEl.querySelectorAll(".filter__menu-item");
      const filterBottomItemText = filterMenuEl
        .closest(".filter__bottom-item") // Ищем ближайший родительский элемент с классом .filter__bottom-item
        .querySelector(".filter__bottom-item-text"); // Находим элемент текста внутри этого родительского элемента

      filterMenuItemEls.forEach((filterMenuItemEl, childIndex) => {
        // Добавляем обработчик клика для каждого пункта меню
        filterMenuItemEl.addEventListener("click", () => {
          filterBottomItemText.textContent = filterMenuItemEl.textContent;
          if (childIndex === 0) {
            this.filterTags[parentIndex + 1] = "";
          } else {
            this.filterTags[parentIndex + 1] = filterMenuItemEl.textContent;
          }
          // Вызов метода рендера по фильтру
          layoutsCardRender.filterCards(this.filterTags);
        });
      });
    });
  }

  //   Метод сброса текста подпунктов к начальному значению
  cleanText(selector) {
    const filterEl = document.querySelector(selector);
    const filterMenuEls = filterEl.querySelectorAll(".filter__menu");
    // Метод замены текста
    filterMenuEls.forEach((filterMenuEl, parentIndex) => {
      const filterMenuItemEls =
        filterMenuEl.querySelectorAll(".filter__menu-item");
      const filterBottomItemText = filterMenuEl
        .closest(".filter__bottom-item") // Ищем ближайший родительский элемент с классом .filter__bottom-item
        .querySelector(".filter__bottom-item-text"); // Находим элемент текста внутри этого родительского элемента

      filterMenuItemEls.forEach((filterMenuItemEl, childIndex) => {
        if (childIndex > 0) {
          filterBottomItemText.textContent = filterMenuItemEls[0].textContent;
        }
      });
    });
  }

  // Метод сброса фильра "сложности" к начальному значению
  resetDifficultyFilter(classEls, elClass) {
    const filterEls = document.querySelectorAll(classEls);
    filterEls.forEach((filterEl, index) => {
      if (index > 0) {
        this.filterTags[0] = "";
      }

      layoutsCardRender.filterCards(this.filterTags);

      // Итерируем по всем элементам и удаляем класс у других элементов
      filterEls.forEach((otherEl) => {
        if (otherEl !== filterEl) {
          otherEl.classList.remove(elClass);
        }
      });

      // Переключаем класс у текущего элемента
      filterEls[0].classList.toggle(elClass);
    });
    console.log(this.filterTags);
  }

  // Метод сброса фильтров посика
  resetSearchParameters(btnClass) {
    const resetBtn = document.querySelector(btnClass);
    if (!resetBtn) {
      console.warn(`Element with selector "${resetBtn}" not found.`);
      return;
    }
    resetBtn.addEventListener("click", () => {
      this.filterTags = ["", "", "", "", "", ""];

      // Вызов метода сброса текста подпунктов к начальному значению
      this.cleanText(".filter");

      // Вызов метода сброса фильра "сложности" к начальному значению
      this.resetDifficultyFilter(".filter__btn", "filter__btn--active");

      // Вызов метода рендера по фильтру
      layoutsCardRender.filterCards(this.filterTags);
    });
  }
}

export default LayoutsCardFilter;
