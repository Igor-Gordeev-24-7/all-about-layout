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

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(
          `Ошибка при удалении записи: ${response.status} ${response.statusText}`,
          errorMessage
        );
        return;
      }

      const result = await response.json();
      // Если удаление успешно
      if (response.ok) {
        // Удаление запись из itemArray
        this.itemArray = this.itemArray.filter((item) => item._id !== id);
        // Проверка на наличие элемента в DOM перед удалением
        if (element && element.parentNode) {
          // Удаление элемент из DOM
          element.remove();
        }
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
  //   Метод добавления ссылки с переадными параметрами textContent - Текст ссылки, linkToPage ссылка на страницу
  initMainElLink(selector, textContent, link) {
    this.mainElAddLink = document.createElement("a");
    this.mainElAddLink.className = `${selector}__link`;
    this.mainElAddLink.href = link;
    this.mainElAddLink.textContent = textContent;
    this.mainElLinkBox.append(this.mainElAddLink);
  }

  // Метод добавления поисковой строки по именам
  initMainElSearchLine(selector) {
    this.mainElSearchLine = document.createElement("input");
    this.mainElSearchLine.className = `${selector}__input`;
    this.mainElSearchLine.placeholder = "Поиск по названию";
    this.mainElSearchLine.addEventListener("input", () => {
      // Получаем текст, введенный пользователем
      const searchText = this.mainElSearchLine.value.toLowerCase();
      // Вызываем метод для обновления элементов в зависимости от введенного текста
      this.updateItemsByName(searchText);
    });
    this.mainElWrapper.append(this.mainElSearchLine);
  }

  //   Метод добавления списка
  initMainElList(selector) {
    this.mainElList = document.createElement("ul");
    this.mainElList.className = `${selector}__list`;
    this.mainElWrapper.append(this.mainElList);
  }
  //   Метод рендера Item
  initMainElItem(selector, itemArray, linkToEditing) {
    if (itemArray.length > 0) {
      this.mainElList.innerHTML = "";
      itemArray.forEach((el) => {
        const mainElItem = document.createElement("li");
        mainElItem.className = `${selector}__item`;
        this.mainElList.append(mainElItem);

        const mainElSpanName = document.createElement("span");
        mainElSpanName.className = `${selector}__span`;
        mainElSpanName.textContent = el.name;
        mainElItem.append(mainElSpanName);

        const mainElSpanDesc = document.createElement("span");
        mainElSpanDesc.className = `${selector}__span`;
        mainElSpanDesc.textContent = el.description;
        mainElItem.append(mainElSpanDesc);

        const mainElBtnBox = document.createElement("div");
        mainElBtnBox.className = `${selector}__btn-box`;
        mainElItem.append(mainElBtnBox);

        const mainElLink = document.createElement("a");
        mainElLink.className = `${selector}__btn`;
        mainElLink.href = `${linkToEditing}${el._id}`;
        mainElLink.textContent = "Редактировать";
        mainElBtnBox.append(mainElLink);

        const mainElBtn = document.createElement("button");
        mainElBtn.className = `${selector}__btn`;
        mainElBtn.textContent = "Удалить";
        mainElBtn.addEventListener("click", () => {
          this.deleteItem(el._id, mainElItem);
        });
        mainElBtnBox.append(mainElBtn);
      });
    } else {
      this.mainElList.innerHTML = "";
      this.mainElEmptyMessage = document.createElement("li");
      this.mainElEmptyMessage.className = `${selector}__empty-message`;
      this.mainElEmptyMessage.textContent = "Нет элементов для отображения";
      this.mainElList.append(this.mainElEmptyMessage);
    }
  }

  // Метод рендора элементов
  initElements() {
    if (this.mainEl) {
      this.mainEl.innerHTML = "";
      //   Метод добавления Wrapper
      this.initMainElWrapper(this.selector);
      //   Метод добавления Heading
      this.initMainElHeading(this.selector, "Все доступные Layouts");
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
        "Перейти к admin-content",
        "https://www.all-about-layout.ru/admin-content.html"
      );
      // Метод добавления поисковой строки по именам
      this.initMainElSearchLine(this.selector);
      //   Метод добавления списка
      this.initMainElList(this.selector);
      //   Метод добавления Item
      this.initMainElItem(
        this.selector,
        this.itemArray,
        `https://www.all-about-layout.ru/admin-layout-edit.html?id=`
      );
    } else {
      console.warn(`Элемент с селектором ${this.selector} не найден.`);
    }
  }

  // Метод для фильтрации и обновления элементов по имени
  updateItemsByName(searchText) {
    // Создаем новый массив отфильтрованных элементов на основе исходного массива
    const filteredItems = this.itemArray.filter((item) =>
      item.name.toLowerCase().includes(searchText)
    );
    // console.log(filteredItems);

    // Обновляем список элементов на основе отфильтрованных данных
    this.initMainElItem(
      this.selector,
      filteredItems,
      `https://www.all-about-layout.ru/admin-layout-edit.html?id=`
    );
  }
}
export default AdminLayouts;
