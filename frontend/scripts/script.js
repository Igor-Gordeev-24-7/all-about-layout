// ИМПОРТЫ
import {
  articleItemsLinkArray,
  articleLabelArray,
  articleLinksArray,
  articleSelectorArray,
  layoutItemsLinkArray,
  layoutLabelArray,
  layoutLinksArray,
  layoutSelectorArray,
} from "./classes/admin/parametrs.js";

// Admin-Items
import AdminItems from "./classes/admin/AdminItems.js";
// Admin-Add
import AdminItemAdd from "./classes/admin/AdminItemAdd.js";
// Admin-Edit
import AdminItemEdit from "./classes/admin/AdminItemEdit.js";

// Layout
import LayoutsCardFilter from "./classes/LayoutsCardFilter.js";
import LayoutContentRender from "./classes/LayoutContentRender.js";
// Admin-Layout
// import AdminLayouts from "./classes/admin/admin-layouts/AdminLayouts.js";
import AdminLayoutEdit from "./classes/admin/admin-layouts/AdminLayoutEdit.js";
import AdminLayoutAdd from "./classes/admin/admin-layouts/AdminLayoutAdd.js";

// Article
import ArticleContentRender from "./classes/ArticleContentRender.js";
import ArticlesItemFilter from "./classes/ArticlesItemFilter.js";

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

// -------------------------------------
// Admin-Articles
const adminArticles = new AdminItems(
  "admin-articles",
  dbRoutes,
  port,
  dbNameArticle,
  articleItemsLinkArray,
  "admin-article-edit"
);
// AdminArticleAdd
const adminArticleAdd = new AdminItemAdd(
  "admin-article-add",
  dbRoutes,
  port,
  dbNameArticle,
  articleLabelArray,
  articleLinksArray,
  articleSelectorArray
);
// AdminArticleEdit
const adminArticleEdit = new AdminItemEdit(
  "admin-article-edit",
  dbRoutes,
  port,
  dbNameArticle,
  articleLabelArray,
  articleLinksArray,
  articleSelectorArray
);

// -------------------------------------
// AdminLayouts
const adminLayouts = new AdminItems(
  "admin-layouts",
  dbRoutes,
  port,
  dbNameLayouts,
  layoutItemsLinkArray,
  "admin-layout-edit"
);
const adminLayoutAdd = new AdminItemAdd(
  "admin-layout-add",
  dbRoutes,
  port,
  dbNameLayouts,
  layoutLabelArray,
  layoutLinksArray,
  layoutSelectorArray
);

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
// const adminLayouts = new AdminLayouts(
//   "admin-layouts",
//   dbRoutes,
//   port,
//   dbNameLayouts
// );
// const adminLayoutAdd = new AdminLayoutAdd(
//   "admin-layout-add",
//   dbRoutes,
//   port,
//   dbNameLayouts
// );

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
