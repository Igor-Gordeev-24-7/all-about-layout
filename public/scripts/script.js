// ИМПОРТЫ
import Filter from "./classes/Filter.js";
import Layout from "./classes/Layout.js";


// ПЕРЕМЕННЫЕ
const filter = new Filter(".filter");
const layout = new Layout(".info__content")

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  const headerMenu = document.querySelector(".header__menu");
  const headerBurgerBtn = document.querySelector(".header__burger-btn");

  const filterEl = document.querySelector(".filter");
  const filterBottomOpenBtnEl = document.querySelector(
    ".filter__bottom-open-btn"
  );
  const filterItemsBtn = document.querySelector(".filter__items-btn");
  // Бургер меню

  headerBurgerBtn.addEventListener("click", () => {
    header.classList.toggle("open");
  });

  document.addEventListener("click", (event) => {
    // Проверка, если клик не по меню и не по кнопке бургера
    if (
      !headerMenu.contains(event.target) &&
      !headerBurgerBtn.contains(event.target)
    ) {
      header.classList.remove("open");
    }
  });

  // Фильтр
  if (!filterBottomOpenBtnEl) {
    console.warn(`Element with selector "${filterBottomOpenBtnEl}" not found.`);
    return;
  } else {
    filterBottomOpenBtnEl.addEventListener("click", () => {
      filterEl.classList.toggle("open");
    });
  }
});
