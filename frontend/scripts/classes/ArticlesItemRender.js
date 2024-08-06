class ArticlesItemRender {
  // Класс принимает селектор, по которому получаем элемент
  constructor(selector) {
    this.blogArticles = document.querySelector(selector);

    // Создаем пустой массив статей
    this.articles = [];

    // Проверка на наличие элемента this.blogArticles
    if (!this.blogArticles) {
      console.warn(`Элемент с селектором "${selector}" не найден.`);
    }
    this.makeMenuMove();
  }
  // Счетчик количества статей
  // Отображет количество отредеренных статей на странице
  articleCounter(counterClass, num) {
    const counterNumber = document.querySelector(counterClass);
    counterNumber.textContent = num;
  }

  // Метод articles.clear() нужен для того, чтобы очищать текущие статьи перед рендером новых.
  clear() {
    if (this.blogArticles) {
      this.articles = [];
      this.blogArticles.innerHTML = "";
    }
  }

  //Рендер статей
  render() {
    // Проверка на наличие элемента this.blogArticles
    if (!this.blogArticles) {
      console.warn(`Элемент this.blogArticles не найден.`);
      return;
    }

    // Очистить контейнер перед рендерингом
    this.blogArticles.innerHTML = "";

    this.articles.forEach((article) => {
      this.blogArticles.append(article.getElement());
    });
  }

  // Добавление карточек
  addArticles(article) {
    this.articles.push(article);
  }

  // Отображения фильтра блога при переключении на мобильную версию
  makeMenuMove() {
    const blogFilterBtnEl = document.querySelector(".blog__filter-btn");
    const blogFilterBoxEl = document.querySelector(".blog__filter-box");

    // Отображения фильтра блога в адаптиве
    if (blogFilterBtnEl) {
      blogFilterBtnEl.addEventListener("click", () => {
        blogFilterBoxEl.classList.toggle("active");
      });
    }
  }
}

export default ArticlesItemRender;
