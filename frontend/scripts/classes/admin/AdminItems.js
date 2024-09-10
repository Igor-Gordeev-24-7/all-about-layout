class AdminArticles {
  constructor(selector, dbRoutes, port, dbName, itemsLinkArray, nameEditFile) {
    this.mainEl = document.querySelector(`.${selector}`);
    this.selector = selector;
    this.dbRoutes = dbRoutes;
    this.port = port;
    this.dbName = dbName;
    this.itemsLinkArray = itemsLinkArray;
    this.nameEditFile = nameEditFile;

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

  // Метод рендора элементов
  initElements() {
    if (this.mainEl) {
      this.mainEl.innerHTML = "";

      // ----------------------------------
      //   Метод добавления Wrapper
      this.initMainElWrapper(this.selector);

      // ----------------------------------
      //   Метод рендера Links из массива
      this.initLinks(this.itemsLinkArray);

      // ----------------------------------
      // Метод добавления поисковой строки по именам
      this.initMainElSearchLine(this.selector);

      // ----------------------------------
      //   Метод добавления списка
      this.initMainElList(this.selector);

      // ----------------------------------
      //   Метод добавления Item
      this.initMainElItem(
        this.selector,
        this.itemArray,
        `https://www.all-about-layout.ru/${this.nameEditFile}.html?id=`
      );
    } else {
      console.warn(`Элемент с селектором ${this.selector} не найден.`);
    }
  }

  //   Метод добавления Wrapper
  initMainElWrapper(selector) {
    this.wrapperEl = document.createElement("div");
    this.wrapperEl.classList.add(`${this.selector}__wrapper`, "wrapper");
    this.mainEl.append(this.wrapperEl);

    //  Добавление Heading
    this.headingEl = document.createElement("h1");
    this.headingEl.className = `${this.selector}__heading`;
    this.headingEl.textContent = `Все доступные ${document.title}`;
    this.wrapperEl.append(this.headingEl);

    //  Добавление LinkBox
    this.linkBox = document.createElement("div");
    this.linkBox.className = `${this.selector}__link-box`;
    this.wrapperEl.append(this.linkBox);
  }

  //   Метод рендера Links из массива
  initLinks(linksArray) {
    linksArray.forEach((link) => {
      this.initLink(link.textContent, link.link);
    });
  }

  //   Метод добавления link
  //   textContent - Текст ссылки
  //   linkToPage ссылка на страницу
  initLink(textContent, link) {
    this.link = document.createElement("a");
    this.link.className = `${this.selector}__link`;
    this.link.href = link;
    this.link.textContent = textContent;
    this.linkBox.append(this.link);
  }

  // Метод добавления поисковой строки по именам
  initMainElSearchLine(selector) {
    this.searchLineEl = document.createElement("input");
    this.searchLineEl.className = `${selector}__input`;
    this.searchLineEl.placeholder = "Поиск по названию";
    this.searchLineEl.addEventListener("input", () => {
      // Получаем текст, введенный пользователем
      const searchText = this.searchLineEl.value.toLowerCase();
      // Вызываем метод для обновления элементов в зависимости от введенного текста
      this.updateItemsByName(searchText);
    });
    this.wrapperEl.append(this.searchLineEl);
  }

  //   Метод добавления списка
  initMainElList(selector) {
    this.listEl = document.createElement("ul");
    this.listEl.className = `${selector}__list`;
    this.wrapperEl.append(this.listEl);
  }

  //   Метод рендера Item
  initMainElItem(selector, itemArray, linkToEditing) {
    if (itemArray.length > 0) {
      this.listEl.innerHTML = "";
      itemArray.forEach((el) => {
        const itemEl = document.createElement("li");
        itemEl.className = `${selector}__item`;
        this.listEl.append(itemEl);

        const spanNameEl = document.createElement("span");
        spanNameEl.className = `${selector}__span`;
        spanNameEl.textContent = el.name;
        itemEl.append(spanNameEl);

        const spanDscriptionEl = document.createElement("span");
        spanDscriptionEl.className = `${selector}__span`;
        spanDscriptionEl.textContent = el.description;
        itemEl.append(spanDscriptionEl);

        const boxEl = document.createElement("div");
        boxEl.className = `${selector}__box`;
        itemEl.append(boxEl);

        const linkEl = document.createElement("a");
        linkEl.className = `${selector}__box-link`;
        linkEl.href = `${linkToEditing}${el._id}`;
        console.log(`${linkToEditing}${el._id}`);
        linkEl.textContent = "Редактировать";
        boxEl.append(linkEl);

        const btnEl = document.createElement("button");
        btnEl.className = `${selector}__btn`;
        btnEl.textContent = "Удалить";
        btnEl.addEventListener("click", () => {
          this.deleteItem(el._id, itemEl);
        });
        boxEl.append(btnEl);
      });
    } else {
      this.listEl.innerHTML = "";
      this.emptyMessageEl = document.createElement("li");
      this.emptyMessageEl.className = `${selector}__empty-message`;
      this.emptyMessageEl.textContent = "Нет элементов для отображения";
      this.listEl.append(this.emptyMessageEl);
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
      `https://www.all-about-layout.ru/${this.nameEditFile}.html?id=`
    );
  }
}
export default AdminArticles;
