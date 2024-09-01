class AdminLayouts {
  constructor(selector, dbRoutes, port, dbName) {
    this.mainEl = document.querySelector(`.${selector}`);
    this.selector = selector;
    this.dbRoutes = dbRoutes;
    this.port = port;
    this.dbName = dbName;

    // Массив с полученными элементами
    this.itemArray = [];

    // Проверка на наличие селектора
    if (!this.mainEl) {
      console.warn(`Элемент с селектором "${selector}" не найден.`);
    } else {
      this.getItems().then(() => {
        // Метод редора элементов
        this.initElements();
      });
    }
  }

  // Метод получения элементов
  async getItems() {
    try {
      const response = await fetch(
        `${this.dbRoutes}${this.port}${this.dbName}`
      );
      const itemArray = await response.json();
      this.itemArray = itemArray;
    } catch (error) {
      console.log("Не удалось получить элементы:", error);
    }
  }

  // Метод удаление элемента
  async deleteItem(id, element) {
    try {
      const response = await fetch(
        `${this.dbRoutes}${this.port}${this.dbName}/${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      // Если удаление успешно
      if (response.ok) {
        // Удаление запись из itemArray
        this.itemArray = this.itemArray.filter((item) => item._id !== id);
        // Удаление элемент из DOM
        element.remove();
      } else {
        // Обработка ошибок
        console.error(result.msg);
      }
    } catch (error) {
      console.error("Ошибка при удалении записи:", error);
    }
  }

  //   Метод добавления Wrapper
  initMainElWrapper(selector) {
    this.mainElWrapper = document.createElement("div");
    this.mainElWrapper.classList.add(`${selector}__wrapper`, "wrapper");
    this.mainEl.append(this.mainElWrapper);
  }
  //   Метод добавления Heading
  initMainElHeading(selector, textContent) {
    this.mainElHeading = document.createElement("h1");
    this.mainElHeading.className = `${selector}__heading`;
    this.mainElHeading.textContent = textContent;
    this.mainElWrapper.append(this.mainElHeading);
  }
  //   Метод добавления LinkBox
  initMainElLinkBox(selector) {
    this.mainElLinkBox = document.createElement("div");
    this.mainElLinkBox.className = `${selector}__link-box`;
    this.mainElWrapper.append(this.mainElLinkBox);
  }
  //   Метод добавления ссылки с переадными парамеитрами textContent - Текст ссылки, linkToPage ссылка на страницу
  initMainElLink(selector, textContent, link) {
    this.mainElAddLink = document.createElement("a");
    this.mainElAddLink.className = `${selector}__link`;
    this.mainElAddLink.href = link;
    this.mainElAddLink.textContent = textContent;
    this.mainElLinkBox.append(this.mainElAddLink);
  }
  //   Метод добавления списка
  initMainElList(selector) {
    this.mainElList = document.createElement("ul");
    this.mainElList.className = `${selector}__list`;
    this.mainElWrapper.append(this.mainElList);
  }
  //   Метод добавления Item
  initMainElItem(selector, linkToEditing) {
    if (this.itemArray.length > 0) {
      this.itemArray.forEach((el) => {
        this.mainElItem = document.createElement("li");
        this.mainElItem.className = `${selector}__item`;
        this.mainElList.append(this.mainElItem);

        this.mainElSpan = document.createElement("span");
        this.mainElSpan.className = `${selector}__span`;
        this.mainElSpan.textContent = el.name;
        this.mainElItem.append(this.mainElSpan);

        this.mainElSpan = document.createElement("span");
        this.mainElSpan.className = `${selector}__span`;
        this.mainElSpan.textContent = el.description;
        this.mainElItem.append(this.mainElSpan);

        this.mainElBtnBox = document.createElement("div");
        this.mainElBtnBox.className = `${selector}__btn-box`;
        this.mainElItem.append(this.mainElBtnBox);

        this.mainElLink = document.createElement("a");
        this.mainElLink.className = `${selector}__btn`;
        this.mainElLink.href = `${linkToEditing}${el._id}`;
        this.mainElLink.textContent = "Редактировать";
        this.mainElBtnBox.append(this.mainElLink);

        this.mainElBtn = document.createElement("btn");
        this.mainElBtn.className = `${selector}__btn`;
        this.mainElBtn.textContent = "Удалить";
        this.mainElBtn.addEventListener("click", () => {
          this.deleteItem(el._id, this.mainElItem);
        });
        this.mainElBtnBox.append(this.mainElBtn);
      });
    } else {
      console.warn("В массиве нет элементов");
    }
  }
  // Метод редора элементов
  initElements() {
    if (this.mainEl) {
      this.mainEl.innerHTML = "";
      //   Метод добавления Wrapper
      this.initMainElWrapper(this.selector);
      //   Метод добавления Heading
      this.initMainElHeading(this.selector, "Все доступные проекты");
      //   Метод добавления LinkBox
      this.initMainElLinkBox(this.selector);
      //  Добавление ссылок
      this.initMainElLink(
        this.selector,
        "Добавить запись",
        "https://www.all-about-layout.ru/admin-layout-add.html"
      );
      this.initMainElLink(
        this.selector,
        "Перейти к Layouts",
        "https://www.all-about-layout.ru/layouts.html"
      );
      this.initMainElLink(
        this.selector,
        "Перейти к admin-layouts",
        "https://www.all-about-layout.ru/admin-layouts.html"
      );
      this.initMainElLink(
        this.selector,
        "Перейти к admin-content",
        "https://www.all-about-layout.ru/admin-content.html"
      );
      //   Метод добавления списка
      this.initMainElList(this.selector);
      //   Метод добавления Item
      this.initMainElItem(
        this.selector,
        `https://www.all-about-layout.ru/admin-layout.html?id=`
      );
    } else {
      console.warn(`Элемент с селектором ${this.selector} не найден.`);
    }
  }
}
export default AdminLayouts;
