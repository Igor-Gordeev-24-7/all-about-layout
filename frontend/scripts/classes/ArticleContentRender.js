import ArticleContentCreation from "./ArticleContentCreation.js";

class ArticleContentRender {
  constructor(selector, dbRoutes, port, dbName) {
    this.articleWrapper = document.querySelector(selector);
    this.selector = selector;
    this.dbRoutes = dbRoutes;
    this.port = port;
    this.dbName = dbName;
    if (!this.articleWrapper) {
      console.warn(`Элемент с селектором "${selector}" не найден.`);
    }

    this.articleContent;

    // this.getArticleById()
    //   .then(() => {
    //     this.render();
    //   })
    //   .catch((error) => {
    //     console.error("Не удалось получить карточку:", error);
    //   });
  }
  getId() {
    // Получение текущего URL
    const currentUrl = window.location.href;
    // Создание объекта URL с текущим URL
    const url = new URL(currentUrl);
    // Получение параметров запроса
    const searchParams = new URLSearchParams(url.search);
    // Извлечение значения параметра 'id'
    const id = searchParams.get("id");
    // Метод возвращает id
    return id;
  }

  async getArticleById() {
    try {
      const id = this.getId();
      const response = await fetch(
        `${this.dbRoutes}${this.port}${this.dbName}`
      );
      const articleContent = await response.json();

      if (articleContent && articleContent.length > 0) {
        this.articleContent = articleContent.find(
          (article) => article._id === id
        );
      } else {
        console.log("Данные не найдены");
      }
    } catch (error) {
      console.log("Не удалось получить карточку:", error);
    }
  }

  render() {
    if (!this.articleWrapper) {
      console.warn(`Элемент this.articleWrapper не найден.`);
    } else {
      // Очистка this.articleWrapper
      this.articleWrapper.innerHTML = "";

      // Проверка на наличие карточки
      if (this.articleContent) {
        // Создаем экземпляр класса,
        // Передаем в него articleContent
        const articleContentCreation = new ArticleContentCreation(
          this.articleContent
        );

        // Добавляем layoutInfoContent в this.infoBottom
        // Используем getElement() для получения DOM-элемента
        this.articleWrapper.appendChild(articleContentCreation.getElement());
      } else {
        console.error("Статья не найдена");
      }
    }
  }
}
export default ArticleContentRender;
