class ClientArticles {
  constructor(selector, dbRoutes, port, dbName, articleTagArray) {
    this.mainEl = document.querySelector(`.${selector}`);
    this.selector = selector;
    this.dbRoutes = dbRoutes;
    this.port = port;
    this.dbName = dbName;
    this.articleTagArray = articleTagArray;

    // Массив с полученными элементами
    this.itemArray = [];
    this.filterTag = [""];

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
  initElements() {
    this.initWrapper();
    this.initHeadingBox();
    this.initMainElSearchLine();
    this.initFilter();
    this.initArticles();
    this.initArticle(this.itemArray);
  }
  initWrapper() {
    this.wrapperEl = document.createElement("div");
    this.wrapperEl.classList.add(`${this.selector}__wrapper`, "wrapper");
    this.mainEl.append(this.wrapperEl);
  }
  initHeadingBox() {
    this.headingBoxEl = document.createElement("div");
    this.headingBoxEl.className = `${this.selector}__heading-box`;
    this.wrapperEl.append(this.headingBoxEl);

    this.headingEl = document.createElement("h1");
    this.headingEl.className = `${this.selector}__heading`;
    this.headingEl.textContent = "Библиотека статей";
    this.headingBoxEl.append(this.headingEl);

    this.headingSpanEl = document.createElement("span");
    this.headingSpanEl.className = `${this.selector}__heading-span`;
    this.headingSpanEl.textContent = "";
    this.headingBoxEl.append(this.headingSpanEl);
  }

  // Метод добавления поисковой строки по именам
  initMainElSearchLine() {
    this.searchLineEl = document.createElement("input");
    this.searchLineEl.className = `${this.selector}__search-line`;
    this.searchLineEl.placeholder = "Поиск по названию";
    this.searchLineEl.addEventListener("input", () => {
      // Получаем текст, введенный пользователем
      const searchText = this.searchLineEl.value.toLowerCase();
      // Создаем новый массив отфильтрованных элементов на основе исходного массива
      const filteredItems = this.itemArray.filter((item) =>
        item.name.toLowerCase().includes(searchText)
      );
      // Обновляем список элементов на основе отфильтрованных данных
      this.initArticle(filteredItems);
    });
    this.wrapperEl.append(this.searchLineEl);
  }

  initFilter() {
    this.filterEl = document.createElement("div");
    this.filterEl.className = `${this.selector}__filter`;
    this.wrapperEl.append(this.filterEl);

    this.parametersEl = document.createElement("div");
    this.parametersEl.className = `${this.selector}__parameters`;
    this.filterEl.append(this.parametersEl);

    this.articleTagArray.forEach((tag) => {
      const parameterEl = document.createElement("button");
      parameterEl.className = `${this.selector}__parameter`;
      parameterEl.textContent = tag;
      parameterEl.addEventListener("click", () => {
        this.filterTag = tag; // Передаем строку
        // Фильтруем статьи по тегу
        const findTagArray = this.itemArray.filter((item) =>
          item.tags.includes(this.filterTag)
        );
        this.initArticle(findTagArray);
      });
      this.parametersEl.append(parameterEl);
    });

    this.parametersBtnEl = document.createElement("button");
    this.parametersBtnEl.className = `${this.selector}__parameter-btn`;
    this.parametersBtnEl.textContent = "Сбросить фильтр";
    this.parametersBtnEl.addEventListener("click", () => {
      this.filterTag = [""];
      const findTagArray = this.itemArray;
      this.initArticle(findTagArray);
    });
    this.parametersEl.append(this.parametersBtnEl);
  }

  initArticles() {
    this.articlesEl = document.createElement("div");
    this.articlesEl.className = `${this.selector}__articles`;
    this.wrapperEl.append(this.articlesEl);
  }

  initArticle(itemArray) {
    console.log(itemArray);
    let renderedItemsCount = itemArray.length;
    this.headingSpanEl.textContent = `(${renderedItemsCount})`;

    this.articlesEl.innerHTML = "";

    if (itemArray.length != 0) {
      itemArray.forEach((el) => {
        this.articleEl = document.createElement("a");
        this.articleEl.href = `https://www.all-about-layout.ru/article.html?id=${el.id}`;
        this.articleEl.className = `${this.selector}__article`;
        this.articlesEl.append(this.articleEl);

        this.articleHeadingEl = document.createElement("h2");
        this.articleHeadingEl.className = `${this.selector}__article-heading`;
        this.articleHeadingEl.textContent = el.name;
        this.articleEl.append(this.articleHeadingEl);

        this.articleInfoEl = document.createElement("div");
        this.articleInfoEl.className = `${this.selector}__article-info`;
        this.articleEl.append(this.articleInfoEl);

        this.articleDateEl = document.createElement("span");
        this.articleDateEl.className = `${this.selector}__article-date`;
        this.articleDateEl.textContent = el.date;
        this.articleInfoEl.append(this.articleDateEl);

        this.articleAuthorEl = document.createElement("span");
        this.articleAuthorEl.className = `${this.selector}__article-author`;
        this.articleAuthorEl.textContent = el.date;
        this.articleInfoEl.append(this.articleAuthorEl);

        this.articleTagEl = document.createElement("span");
        this.articleTagEl.className = `${this.selector}__article-tag`;
        this.articleTagEl.textContent = el.tags;
        this.articleInfoEl.append(this.articleTagEl);
      });
    } else {
      this.itemsMessageEl = document.createElement("span");
      this.itemsMessageEl.className = `${this.selector}__items-message`;
      this.itemsMessageEl.textContent = "Статьи не найдены";
      this.articlesEl.append(this.itemsMessageEl);
    }
  }
}
export default ClientArticles;
