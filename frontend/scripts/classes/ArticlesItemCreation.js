class ArticlesItemCreation {
  constructor({ _id, name, author, date, tag, content }) {
    this.id = _id;
    this.name = name;
    this.author = author;
    this.date = date;
    this.tag = tag;
    this.content = content;

    this.getElement();
    this.initialisationEls();
  }

  initialisationEls() {
    this.initBlogArticle();
    this.initBlogArticleHeading();
    this.initBlogArticleInfo();
    this.initBlogArticleDate();
    this.initBlogArticleAuthor();
    this.initBlogArticleTag();
  }

  initBlogArticle() {
    this.blogArticle = document.createElement("a");
    this.blogArticle.href = `http://127.0.0.1:5500/frontend/article.html?id=${this.id}`;
    this.blogArticle.className = "blog__article";
  }

  initBlogArticleHeading() {
    this.blogArticleHeading = document.createElement("h2");
    this.blogArticleHeading.className = "blog__article-heading";
    this.blogArticleHeading.textContent = this.name;
    this.blogArticle.append(this.blogArticleHeading);
  }

  initBlogArticleInfo() {
    this.blogArticleInfo = document.createElement("div");
    this.blogArticleInfo.className = "blog__article-info";
    this.blogArticle.append(this.blogArticleInfo);
  }

  initBlogArticleDate() {
    this.blogArticleDate = document.createElement("span");
    this.blogArticleDate.className = "blog__article-date";
    this.blogArticleDate.textContent = this.date;
    this.blogArticleInfo.append(this.blogArticleDate);
  }

  initBlogArticleAuthor() {
    this.blogArticleAuthor = document.createElement("span");
    this.blogArticleAuthor.className = "blog__article-author";
    this.blogArticleAuthor.textContent = this.date;
    this.blogArticleInfo.append(this.blogArticleAuthor);
  }

  initBlogArticleTag() {
    this.blogArticleTag = document.createElement("span");
    this.blogArticleTag.className = "blog__article-tag";
    this.blogArticleTag.textContent = this.tag;
    this.blogArticleInfo.append(this.blogArticleTag);
  }

  // Метод возвращает возвращает DOM-элемент
  getElement() {
    return this.blogArticle;
  }
}

export default ArticlesItemCreation;
