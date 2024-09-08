// ИМПОРТЫ

// Admin-Add
import AdminItemAdd from "./classes/admin/admin-add/AdminItemAdd.js";

// Layout
import LayoutsCardFilter from "./classes/LayoutsCardFilter.js";
import LayoutContentRender from "./classes/LayoutContentRender.js";
// Admin-Layout
import AdminLayouts from "./classes/admin/admin-layouts/AdminLayouts.js";
import AdminLayoutEdit from "./classes/admin/admin-layouts/AdminLayoutEdit.js";
import AdminLayoutAdd from "./classes/admin/admin-layouts/AdminLayoutAdd.js";

// Article
import ArticleContentRender from "./classes/ArticleContentRender.js";
import ArticlesItemFilter from "./classes/ArticlesItemFilter.js";
// Admin-Articles
import AdminArticles from "./classes/admin/abmin-articles/AdminArticles.js";
// import AdminArticleAdd from "./classes/admin/abmin-articles/AdminArticleAdd.js";
import AdminArticleEdit from "./classes/admin/abmin-articles/AdminArticleEdit.js";

// Member
import MembersCardRender from "./classes/MembersCardRender.js";
import MembersContentRender from "./classes/MembersContentRender.js";
// Admin-Member
import AdminMembers from "./classes/admin/admin-members/AdminMembers.js";
import AdminMemberAdd from "./classes/admin/admin-members/AdminMemberAdd.js";
import AdminMembersEdit from "./classes/admin/admin-members/AdminMemberEdit.js";

// const dbRoutes = "https://79.174.86.232:";
const dbRoutes = "https://79-174-86-232.cloudvps.regruhosting.ru:";
const port = "443";
const dbNameLayouts = "/layouts";
const dbNameMembers = "/members";
const dbNameArticle = "/articles";

// --------------------

// ОБЪЯВЛЕНИЕ КЛАССОВ

// Layout
const layoutsCardFilter = new LayoutsCardFilter(
  ".filter",
  dbRoutes,
  port,
  dbNameLayouts
);
const layoutContentRender = new LayoutContentRender(
  ".info__bottom",
  dbRoutes,
  port,
  dbNameLayouts
);

// Admin-Layout
const adminLayoutEdit = new AdminLayoutEdit(
  "admin-layout-edit",
  dbRoutes,
  port,
  dbNameLayouts
);
const adminLayouts = new AdminLayouts(
  "admin-layouts",
  dbRoutes,
  port,
  dbNameLayouts
);
const adminLayoutAdd = new AdminLayoutAdd(
  "admin-layout-add",
  dbRoutes,
  port,
  dbNameLayouts
);

// Article
const articlesItemFilter = new ArticlesItemFilter(
  ".blog__filter",
  dbRoutes,
  port,
  dbNameArticle
);
const articleContentRender = new ArticleContentRender(
  ".article__wrapper",
  dbRoutes,
  port,
  dbNameArticle
);
// Admin-Articles
const adminArticles = new AdminArticles(
  "admin-articles",
  dbRoutes,
  port,
  dbNameArticle
);

const adminItemAdd = new AdminItemAdd(
  "admin-article-add",
  dbRoutes,
  port,
  dbNameArticle,
  [
    { lableSpanTextContent: "Имя", id: "name" },
    { lableSpanTextContent: "Автор", id: "author" },
    { lableSpanTextContent: "Дата - формат(дд.мм.гггг)", id: "date" },
  ],
  [
    {
      textContent: "Перейти к Article",
      link: "https://www.all-about-layout.ru/articles.html",
    },
    {
      textContent: "Перейти к admin-articles",
      link: "https://www.all-about-layout.ru/admin-articles.html",
    },
    {
      textContent: "Перейти к admin-content",
      link: "https://www.all-about-layout.ru/admin-content.html",
    },
  ],
  {
    selectorId: "selector-tags",
    selectorTitle: "Поле тегов",
    idInput: "tags",
    containersArray: [
      {
        parentContainerId: "selector-tags",
        containerDescription: "Теги:",
        containerItemsArray: ["Не выбрано", "HTML", "CSS", "JS", "React"],
      },
      {
        parentContainerId: "selector-tags",
        containerDescription: "Виды:",
        containerItemsArray: ["Не выбрано", "Виды1", "Виды2", "Виды3", "Виды4"],
      },
      {
        parentContainerId: "selector-tags",
        containerDescription: "Виды:",
        containerItemsArray: ["Не выбрано", "Виды1", "Виды2", "Виды3", "Виды4"],
      },
    ],
  }
);

const adminArticleEdit = new AdminArticleEdit(
  "admin-article-edit",
  dbRoutes,
  port,
  dbNameArticle
);

// Member
const membersCardRender = new MembersCardRender(
  ".members__cards",
  dbRoutes,
  port,
  dbNameMembers
);
const membersContentRender = new MembersContentRender(".member");
// Admin-Member
const adminMembers = new AdminMembers(
  "admin-members",
  dbRoutes,
  port,
  dbNameMembers
);
const adminMemberAdd = new AdminMemberAdd(
  "admin-member-add",
  dbRoutes,
  port,
  dbNameMembers
);
const adminMembersEdit = new AdminMembersEdit(
  "admin-member-edit",
  dbRoutes,
  port,
  dbNameMembers
);

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
        "https://www.all-about-layout.ru/admin-content.html"
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
