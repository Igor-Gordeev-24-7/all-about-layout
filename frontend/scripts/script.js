// ИМПОРТЫ
import LayoutsCardFilter from "./classes/LayoutsCardFilter.js";
import LayoutContentRender from "./classes/LayoutContentRender.js";
import ArticlesItemFilter from "./classes/ArticlesItemFilter.js";
import AdminLayouts from "./classes/AdminLayouts.js";
import AdminLayout from "./classes/AdminLayout.js";
import AdminLayoutAdd from "./classes/AdminLayoutAdd.js";
import ArticleContentRender from "./classes/ArticleContentRender.js";
import MembersCardRender from "./classes/MembersCardRender.js";
import MembersContentRender from "./classes/MembersContentRender.js";

// Объявление классов
const layoutsCardFilter = new LayoutsCardFilter(".filter");
const layoutContentRender = new LayoutContentRender(".info__bottom");
const articlesItemFilter = new ArticlesItemFilter(".blog__filter");
const adminLayouts = new AdminLayouts(".admin-layouts__list");
const adminLayoutAdd = new AdminLayoutAdd("admin-layout-add");
const adminLayout = new AdminLayout("layout-item");
const articleContentRender = new ArticleContentRender(".article__wrapper");
const membersCardRender = new MembersCardRender(".members__cards");
const membersContentRender = new MembersContentRender(".member");

export const linkToLayouts = "http://127.0.0.1:5500/frontend/articles.html";

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  const headerMenu = document.querySelector(".header__menu");
  const headerBurgerBtn = document.querySelector(".header__burger-btn");

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
});

// ADMIN
const entranceFormEl = document.querySelector(".entrance__form");
const entranceInputLoginEl = document.querySelector(".entrance__input-login");
const entranceInputPassEl = document.querySelector(".entrance__input-pass");
const entranceErrorSpanEl = document.querySelector(".entrance__error-span");

const login = "222";
const pass = "222";

if (entranceFormEl) {
  entranceFormEl.addEventListener("submit", (e) => {
    e.preventDefault();

    const loginValue = entranceInputLoginEl.value;
    const passValue = entranceInputPassEl.value;
    if (loginValue == login && passValue == pass) {
      localStorage.setItem("isAuth", true);
      window.location.assign(
        "http://127.0.0.1:5500/frontend/admin-content.html"
      );
    } else {
      entranceErrorSpanEl.classList.add("active");
    }
  });
}

// fetch("http://localhost:5001/layouts")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });
// fetch("http://localhost:5001/articles")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });
// fetch("http://localhost:5001/members")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });
