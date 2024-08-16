import { fileRoutesPath } from "../../../script.js";
class AdminMembers {
  constructor(selector, nameDB) {
    this.selector = selector;
    this.mainEl = document.querySelector(selector);
    this.nameDB = nameDB;

    if (!this.mainEl) {
      console.warn(`Элемент с селектором "${selector}" не найден.`);
    }

    this.elementArray = [];

    this.getItems().then(() => {
      // this.renderItems();
      this.initElements();
    });
  }

  // Получение с сервера
  async getItems() {
    try {
      const response = await fetch(`${fileRoutesPath}${this.nameDB}`);
      const elementArray = await response.json();
      this.elementArray = elementArray;
    } catch (error) {
      console.log("Не удалось получить элементы:", error);
    }
  }

  // Удаление с сервера
  async deleteItem(id, element) {
    try {
      const response = await fetch(`${fileRoutesPath}${this.nameDB}${id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (response.ok) {
        // Запись удалена
        console.log(result.msg);

        // Удалите запись из elementArray
        this.elementArray = this.elementArray.filter((el) => el._id !== id);

        // Удалите элемент из DOM
        element.remove();
      } else {
        console.error(result.msg); // Обработка ошибок
      }
    } catch (error) {
      console.error("Ошибка при удалении записи:", error);
    }
  }

  // Метод инициализации элементов DOM
  initElements() {
    // Создание mainElWrapper
    this.initMainElWrapper(this.selector);
    // Создание mainElHeading
    this.initMainElHeading(this.selector, "Все доступные проекты");
    // Создание mainElLinkBox
    this.initMainElLinkBox(this.selector);
    // Создание ссылок
    this.initMainElLink(
      this.selector,
      "Добавить элемент",
      "http://127.0.0.1:5501/frontend/admin-members-add.html"
    );
    this.initMainElLink(
      this.selector,
      "Перейти к members",
      "http://127.0.0.1:5501/frontend/members.html"
    );
    this.initMainElLink(
      this.selector,
      "Перейти к admin-content",
      "http://127.0.0.1:5501/frontend/admin-content.html"
    );
  }

  // Метод cоздание mainElWrapper
  initMainElWrapper(selector) {
    this.mainElWrapper = document.createElement("div");
    this.mainElWrapper.classList.add(`${selector}__wrapper`, "wrapper");
    this.mainEl.append(this.mainElWrapper);
  }
  // Метод cоздание mainElHeading
  initMainElHeading(selector, textContent) {
    this.mainElHeading = document.createElement("h2");
    this.mainElHeading.className = `${selector}__heading`;
    this.mainElHeading.textContent = textContent;
    this.mainElWrapper.append(this.mainElHeading);
  }
  // Метод добавления LinkBox
  initMainElLinkBox(selector) {
    this.mainElLinkBox = document.createElement("div");
    this.mainElLinkBox.className = `${selector}__link-box`;
    this.mainElWrapper.append(this.mainElLinkBox);
  }
  // Метод добавления ссылки с переадными парамеитрами textContent - Текст ссылки, linkToPage ссылка на страницу
  initMainElLink(selector, textContent, link) {
    this.mainElLink = document.createElement("a");
    this.mainElLink.className = `${selector}__link`;
    this.mainElLink.href = link;
    this.mainElLink.textContent = textContent;
    this.mainElLinkBox.append(this.mainElLink);
  }
  // Метод добавления mainElList
  initMainElList(selector) {
    this.mainElList = document.createElement("ul");
    this.mainElList.className = `${selector}__list`;
    this.mainElWrapper.append(this.mainElList);
  }

  renderItems() {
    if (this.mainEl) {
      this.elementArray.forEach((el) => {
        // this.adminLayoutsItem = document.createElement("li");
        // this.adminLayoutsItem.className = "admin-layouts__item";
        // this.mainEl.append(this.adminLayoutsItem);
        // this.adminLayoutsSpan = document.createElement("span");
        // this.adminLayoutsSpan.className = "admin-layouts__span";
        // this.adminLayoutsSpan.textContent = el.name;
        // this.adminLayoutsItem.append(this.adminLayoutsSpan);
        // this.adminLayoutsSpan = document.createElement("span");
        // this.adminLayoutsSpan.className = "admin-layouts__span";
        // this.adminLayoutsSpan.textContent = el.description;
        // this.adminLayoutsItem.append(this.adminLayoutsSpan);
        // this.adminLayoutsBox = document.createElement("div");
        // this.adminLayoutsBox.className = "admin-layouts__btn-box";
        // this.adminLayoutsItem.append(this.adminLayoutsBox);
        // this.adminLayoutsLink = document.createElement("a");
        // this.adminLayoutsLink.className = "admin-layouts__btn";
        // this.adminLayoutsLink.href = `http://127.0.0.1:5500/frontend/admin-layout.html?id=${el._id}`;
        // this.adminLayoutsLink.textContent = "Редактировать";
        // this.adminLayoutsBox.append(this.adminLayoutsLink);
        // this.adminLayoutsBtn = document.createElement("btn");
        // this.adminLayoutsBtn.className = "admin-layouts__btn";
        // this.adminLayoutsBtn.textContent = "Удалить";
        // this.adminLayoutsBox.append(this.adminLayoutsBtn);
        // this.adminLayoutsBtn.addEventListener("click", () => {
        //   this.deleteLayout(el._id, this.adminLayoutsItem);
        // });
      });
    } else {
      console.warn(`Элемент с селектором this.adminLayoutList не найден.`);
    }
  }
}
export default AdminMembers;
