import ArticlesItemCreation from "./ArticlesItemCreation.js";
import ArticlesItemRender from "./ArticlesItemRender.js";

const articlesItemRender = new ArticlesItemRender(".blog__articles");

class ArticlesItemFilter {
  constructor(selector, dbRoutes, port, dbName) {
    this.blogFilter = document.querySelector(selector);

    this.selector = selector;
    this.dbRoutes = dbRoutes;
    this.port = port;
    this.dbName = dbName;

    this.articlesArray = [];
    this.filterTag = "";

    // Вызов метода обновления тэга фильтра
    this.updateFilterTag();

    // Вызов метода getAllArticles
    // Метод then используется для обработки результата промиса, возвращаемого getAllArticles
    this.getAllArticles().then(() => {
      this.renderArticles(this.articlesArray);
      this.filteringArrayByTag(this.filterTag);
    });

    // Вызов метода поиска по имени
    this.searchByName(this.filterTag);
  }
  // Метод получения всех статей с бэка
  async getAllArticles() {
    try {
      const response = await fetch(`${this.dbRoutes}${this.port}${this.dbName}`);
      const articlesArray = await response.json();
      this.articlesArray = articlesArray;
    } catch (error) {
      console.log("Не удалось получить статьи:", error);
    }
  }

  searchByName() {
    const blogSearchInput = document.querySelector(".blog__search-input");
    // При событии input
    if (blogSearchInput) {
      blogSearchInput.addEventListener("input", () => {
        // Создаем переменнную searchQuery для хранения строки поиска
        let searchQuery = blogSearchInput.value.toLowerCase();
        console.log(this.filterTag);

        // Этот метод filter проходит по каждому элементу массива this.articlesArray и применяет к нему функцию, чтобы определить, включать его в новый массив filteredArticles или нет. Функция возвращает true для тех элементов, которые должны быть включены в новый массив, и false для тех, которые не должны быть включены.
        const filteredArticles = this.articlesArray.filter((article) => {
          //  this.filterTag === "" проверяет, установлен ли фильтр по тегу на пустую строку. Если это так, это означает, что статьи не фильтруются по тегу.
          // article.tag === this.filterTag проверяет, совпадает ли тег статьи с текущим фильтром тега.
          const matchesTag =
            this.filterTag == "" || article.tag === this.filterTag;

          // article.name.toLowerCase() преобразует имя статьи в нижний регистр, чтобы сделать поиск нечувствительным к регистру.
          // .includes(searchQuery) проверяет, содержит ли имя статьи строку searchQuery, введенную пользователем.
          const matchesName = article.name.toLowerCase().includes(searchQuery);

          // Этот оператор возвращает true только в том случае, если обе переменные matchesTag и matchesName равны true. Это означает, что статья будет включена в новый массив filteredArticles, только если она соответствует как фильтру по тегу, так и строке поиска по имени.
          return matchesTag && matchesName;
        });

        this.renderArticles(filteredArticles);
      });
    }
  }

  // Счетчик количества статей
  // Отображет количество отредеренных статей на странице
  articlesCounter(counterClass, num) {
    const counterNumber = document.querySelector(counterClass);
    if (counterNumber) {
      counterNumber.textContent = num;
    }
  }

  // Метод получения тэга для фильтрации статей
  updateFilterTag() {
    if (this.blogFilter) {
      this.blogFilterTag =
        this.blogFilter.querySelectorAll(".blog__filter-tag");

      this.blogFilterTag.forEach((tag, index) => {
        // blogFilterTag с индексом 0, добавляем класс active
        this.blogFilterTag[0].classList.add("active");

        // При нажатии на tag
        tag.addEventListener("click", () => {
          this.blogFilterTag[0].classList.add("active");
          // Условие проверяет номер индекса
          if (index === 0) {
            this.filterTag = "";
          } else {
            this.filterTag = tag.textContent;
          }
          this.blogFilterTag.forEach((otherEl) => {
            if (otherEl !== tag) {
              otherEl.classList.remove("active");
            }
          });
          tag.classList.add("active");
          // Вызов метода фильтрации массива по переданному тэгу
          this.filteringArrayByTag(this.filterTag);
        });
      });
    } else {
      console.warn("this.blogFilterTag элемент не найден");
    }
  }

  // Метод рендера статей
  renderArticles(arrayForRendering) {
    // Метод clear, класса articles, отчищает текущие статьи перед рендером новых
    articlesItemRender.clear();

    // Обновление счетчика статей на странице
    this.articlesCounter(".blog__counter", arrayForRendering.length);

    // Получение blogArticlesSpanEl
    const blogArticlesSpanEl = document.querySelector(".blog__articles-span");

    if (arrayForRendering.length === 0) {
      // Если blogArticlesSpanEl есть, то
      if (blogArticlesSpanEl) {
        // Активируем этот элемент когда нет статей
        blogArticlesSpanEl.classList.add("active");
      }
    } else {
      // Проходимся по элементам переданного массива
      arrayForRendering.forEach((el) => {
        // Дезактивируем этот элемент когда нет статей
        if (blogArticlesSpanEl) {
          blogArticlesSpanEl.classList.remove("active");
        }
        // Создаем новый экземпляр ArticlesItemCreation и добавляем его в articles
        const article = new ArticlesItemCreation(el);
        articlesItemRender.addArticles(article);
        articlesItemRender.render();
      });
    }
  }

  // Метод фильтрации массива по переданному тэгу
  filteringArrayByTag(tag) {
    let filteredArticles;

    // Если тэг равен "" или "Показать все"
    if (tag === "" || tag === "Показать все") {
      filteredArticles = this.articlesArray;
    } else {
      // Иначе, массив this.articlesArray, фильтрется по тэгу
      filteredArticles = this.articlesArray.filter((el) => el.tag === tag);
    }
    // Метод рендера отфильтрованного статей
    this.renderArticles(filteredArticles);
  }
}

export default ArticlesItemFilter;
