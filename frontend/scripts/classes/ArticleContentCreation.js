import { linkToLayouts } from "../script.js";
class ArticleContentCreation {
  constructor({ name, author, date, tag, content }) {
    this.name = name;
    this.author = author;
    this.date = date;
    this.tag = tag;
    this.content = content;

    // Инициализация всех элементов
    this.initArticleWrapper();
    this.initArticleLinkBack();
    this.initArticleContent();
    this.initArticleLeft();
    this.initArticleTop();
    this.initArticleHeading();
    this.initArticleInfo();
    this.initArticleTag();
    this.initArticleDate();
    this.initArticleAuthor();
    this.initArticleAuthorName();
    this.initArticleBody();
    this.initArticleRight();
    this.initArticleRightContent();
    this.initArticleRightBox();
    this.initArticleRightSpan();
    this.initArticleRightItems();
    this.initArticleRightItem();

    this.setTitle();

    // Подсветка кода
    this.highlightCodeBlocks();
  }

  setTitle() {
    document.title = this.name;
  }

  initArticleWrapper() {
    this.articleWrapper = document.querySelector(".article__wrapper");
  }

  initArticleLinkBack() {
    this.articleLink = document.createElement("a");
    this.articleLink.className = "article__link-back";
    this.articleLink.textContent = "Вернуться в статьям";
    this.articleLink.href = linkToLayouts;
    this.articleWrapper.append(this.articleLink);
  }

  initArticleContent() {
    this.articleContent = document.createElement("div");
    this.articleContent.className = "article__content";
    this.articleWrapper.append(this.articleContent);
  }
  initArticleLeft() {
    this.articleLeft = document.createElement("div");
    this.articleLeft.className = "article__left";
    this.articleContent.append(this.articleLeft);
  }
  initArticleTop() {
    this.articleTop = document.createElement("div");
    this.articleTop.className = "article__top";
    this.articleLeft.append(this.articleTop);
  }
  initArticleHeading() {
    this.articleHeading = document.createElement("div");
    this.articleHeading.className = "article__heading";
    this.articleHeading.textContent = this.name;
    this.articleTop.append(this.articleHeading);
  }
  initArticleInfo() {
    this.articleInfo = document.createElement("div");
    this.articleInfo.className = "article__info";
    this.articleTop.append(this.articleInfo);
  }
  initArticleTag() {
    this.articleTag = document.createElement("span");
    this.articleTag.className = "article__tag";
    this.articleTag.textContent = this.tag;
    this.articleInfo.append(this.articleTag);
  }
  initArticleDate() {
    this.articleDate = document.createElement("span");
    this.articleDate.className = "article__date";
    this.articleDate.textContent = this.date;
    this.articleInfo.append(this.articleDate);
  }
  initArticleAuthor() {
    this.articleAuthor = document.createElement("span");
    this.articleAuthor.className = "article__author";
    this.articleAuthor.textContent = "Автор: ";
    this.articleInfo.append(this.articleAuthor);
  }
  initArticleAuthorName() {
    this.articleAuthorName = document.createElement("span");
    this.articleAuthorName.className = "article__author-name";
    this.articleAuthorName.textContent = this.author;
    this.articleAuthor.append(this.articleAuthorName);
  }
  initArticleBody() {
    this.articleBody = document.createElement("div");
    this.articleBody.className = "article__body";
    this.articleBody.innerHTML = this.content;
    this.articleLeft.append(this.articleBody);
  }
  initArticleRight() {
    this.articleRight = document.createElement("div");
    this.articleRight.className = "article__right";
    this.articleContent.append(this.articleRight);
  }
  initArticleRightContent() {
    this.articleRightContent = document.createElement("div");
    this.articleRightContent.className = "article__right-content";
    this.articleRight.append(this.articleRightContent);
  }
  initArticleRightBox() {
    this.articleRightBox = document.createElement("div");
    this.articleRightBox.className = "article__right-box";
    this.articleRightContent.append(this.articleRightBox);
  }
  initArticleRightSpan() {
    this.articleRightSpan = document.createElement("span");
    this.articleRightSpan.classList = "article__right-span";
    this.articleRightSpan.textContent = "Содержание:";
    this.articleRightBox.append(this.articleRightSpan);
  }
  initArticleRightItems() {
    this.articleRightItems = document.createElement("div");
    this.articleRightItems.className = "article__right-items";
    this.articleRightBox.append(this.articleRightItems);
  }
  initArticleRightItem() {
    // Создаем временный контейнер для парсинга содержимого
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = this.content;

    // Ищем все элементы h2 в содержимом
    const h2Elements = tempContainer.querySelectorAll("h2");

    // Проходим по всем найденным элементам h2 и создаем span для каждого
    h2Elements.forEach((h2) => {
      const span = document.createElement("span");

      span.className = "article__right-item";
      span.textContent = h2.textContent;
      console.log(span.textContent);
      this.articleRightItems.append(span);
    });
  }

  highlightCodeBlocks() {
    // Ищем все элементы <pre><code> и применяем к ним highlight.js
    const codeBlocks = this.articleContent.querySelectorAll("pre code");
    codeBlocks.forEach((block) => {
      // Удаляем пробелы и подсвечиваем код
      const lines = block.innerHTML.split("\n");

      // Удаляем пустые строки в начале и в конце
      while (lines.length && lines[0].trim() === "") lines.shift();
      while (lines.length && lines[lines.length - 1].trim() === "") lines.pop();

      // Находим минимальный отступ и удаляем его из всех строк
      const minIndent = lines.reduce((min, line) => {
        const indent = line.match(/^(\s*)/)[0].length;
        return line.trim() ? Math.min(min, indent) : min;
      }, Infinity);

      const trimmedLines = lines.map((line) => line.slice(minIndent));

      block.innerHTML = trimmedLines.join("\n");
      hljs.highlightElement(block);
    });
  }
  getElement() {
    return this.articleContent;
  }
}

export default ArticleContentCreation;
