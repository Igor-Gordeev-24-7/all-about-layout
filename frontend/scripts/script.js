import cardsArray from "./cardsArray.js";

// ИМПОРТЫ
import Filter from "./classes/Filter.js";
import Layout from "./classes/Layout.js";

// ПЕРЕМЕННЫЕ
const filter = new Filter(".filter");
const layout = new Layout(".info__bottom");

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  const headerMenu = document.querySelector(".header__menu");
  const headerBurgerBtn = document.querySelector(".header__burger-btn");
  const filterEl = document.querySelector(".filter");
  const filterBottomOpenBtnEl = document.querySelector(
    ".filter__bottom-open-btn"
  );
  const filterItemsBtn = document.querySelector(".filter__items-btn");

  // Бургер-меню
  if (headerBurgerBtn) {
    headerBurgerBtn.addEventListener("click", () => {
      header.classList.toggle("open");
    });

    document.addEventListener("click", (event) => {
      if (
        !headerMenu.contains(event.target) &&
        !headerBurgerBtn.contains(event.target)
      ) {
        header.classList.remove("open");
      }
    });
  }

  // Переключение фильтра
  if (filterBottomOpenBtnEl) {
    filterBottomOpenBtnEl.addEventListener("click", () => {
      filterEl.classList.toggle("open");
    });
  } else {
    console.warn(`Элемент с селектором ".filter__bottom-open-btn" не найден.`);
  }

  const galleryCardEls = document.querySelectorAll(".gallery__card");
  galleryCardEls.forEach((galleryCard, index) => {
    galleryCard.addEventListener("click", () => {
      console.log(index);
    });
  });
});

fetch("http://localhost:5001")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // console.log(data);
  });
