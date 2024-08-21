class MembersContentCreation {
  constructor({ _id, name, description, imgLink, tags, skills }) {
    this.id = _id;
    this.name = name;
    this.description = description;
    this.imgLink = imgLink;
    this.tags = tags;
    this.skills = skills;

    this.articlesArray = [];
    this.layoutCardsArray = [];

    this.initElements();

    this.getAllArticles().then(() => {
      this.initMemberContentLeftItems();
    });
    this.getLayoutsCards().then(() => {
      this.initMemberContentRightItems();
    });
  }
  initElements() {
    this.initMember();
    this.initMemberWrapper();
    this.initMemberHeader();
    this.initMemberBody();
    this.initMemberBodyLeft();
    this.initMemberBodyRight();
    this.initMemberRightTop();
    this.initMemberRightContent();
    this.initMemberContentLeft();
    this.initMemberContentRight();
    this.setTitle();
  }

  setTitle() {
    document.title = this.name;
  }

  initMember() {
    this.member = document.querySelector(".member");
  }
  initMemberWrapper() {
    this.memberWrapper = document.createElement("div");
    this.memberWrapper.classList.add("member__wrapper", "wrapper");
    this.member.append(this.memberWrapper);
  }
  initMemberHeader() {
    this.memberHeader = document.createElement("div");
    this.memberHeader.className = "member__header";
    this.memberWrapper.append(this.memberHeader);

    this.memberHeading = document.createElement("h1");
    this.memberHeading.className = "member__heading";
    this.memberHeading.textContent = this.name;
    this.memberHeader.append(this.memberHeading);
  }
  initMemberBody() {
    this.memberBody = document.createElement("div");
    this.memberBody.className = "member__body";
    this.memberWrapper.append(this.memberBody);
  }
  initMemberBodyLeft() {
    this.memberBodyLeft = document.createElement("div");
    this.memberBodyLeft.className = "member__body-left";
    this.memberBody.append(this.memberBodyLeft);

    this.memberBodyImg = document.createElement("img");
    this.memberBodyImg.className = "member__body-img";
    this.memberBodyImg.src = this.imgLink;
    this.memberBodyImg.alt = "avatar";
    this.memberBodyLeft.append(this.memberBodyImg);
  }
  initMemberBodyRight() {
    this.memberBodyRight = document.createElement("div");
    this.memberBodyRight.className = "member__body-right";
    this.memberBody.append(this.memberBodyRight);
  }
  initMemberRightTop() {
    this.memberRightTop = document.createElement("div");
    this.memberRightTop.className = "member__right-top";
    this.memberBodyRight.append(this.memberRightTop);

    this.memberRightSpan = document.createElement("p");
    this.memberRightSpan.className = "member__right-span";
    this.memberRightSpan.textContent = this.description;
    this.memberRightTop.append(this.memberRightSpan);
  }
  initMemberRightContent() {
    this.memberRightContent = document.createElement("div");
    this.memberRightContent.className = "member__right-content";
    this.memberBodyRight.append(this.memberRightContent);
  }
  initMemberContentLeft() {
    this.memberContentLeft = document.createElement("div");
    this.memberContentLeft.className = "member__content-left";
    this.memberRightContent.append(this.memberContentLeft);

    this.memberContentLeftHeading = document.createElement("span");
    this.memberContentLeftHeading.className = "member__content-left-heading";
    this.memberContentLeftHeading.textContent = "Автор — пишет статьи на сайт";
    this.memberContentLeft.append(this.memberContentLeftHeading);

    this.memberContentLeftItems = document.createElement("div");
    this.memberContentLeftItems.className = "member__content-left-items";
    this.memberContentLeft.append(this.memberContentLeftItems);
  }
  async getAllArticles() {
    try {
      const response = await fetch(`http://79.174.86.232:5001/articles`);
      const articlesArray = await response.json();
      this.articlesArray = articlesArray;
    } catch (error) {
      console.log("Не удалось получить статьи:", error);
    }
  }
  initMemberContentLeftItems() {
    // Убедитесь, что articlesArray и name инициализированы
    if (this.articlesArray && this.articlesArray.length > 0) {
      // Фильтруем статьи по автору
      const findArticlesByName = this.articlesArray.filter(
        (article) => article.author === this.name
      );

      // Логируем найденные статьи

      // Создаём ссылки на статьи
      findArticlesByName.forEach((article) => {
        const articleLink = document.createElement("a");
        articleLink.href = `http://127.0.0.1:5500/frontend/article.html?id=${article._id}`;
        articleLink.className = "member__content-left-item";
        articleLink.textContent = article.name;
        this.memberContentLeftItems.append(articleLink);
      });
    } else {
      console.log("Статьи не найдены для автора:", this.name);
    }
  }

  initMemberContentRight() {
    this.memberContentRight = document.createElement("div");
    this.memberContentRight.className = "member__content-right";
    this.memberRightContent.append(this.memberContentRight);

    this.memberContentRightHeading = document.createElement("span");
    this.memberContentRightHeading.className = "member__content-right-heading";
    this.memberContentRightHeading.textContent =
      "Эксперт — делает превью макетов";
    this.memberContentRight.append(this.memberContentRightHeading);

    this.memberContentRightItems = document.createElement("div");
    this.memberContentRightItems.className = "member__content-right-items";
    this.memberContentRight.append(this.memberContentRightItems);
  }

  async getLayoutsCards() {
    try {
      const response = await fetch(`http://localhost:5001/layouts`);
      const layoutCardsArray = await response.json();
      this.layoutCardsArray = layoutCardsArray;
    } catch (error) {
      console.log("Не удалось получить карточки:", error);
    }
  }

  initMemberContentRightItems() {
    // Убедитесь, что articlesArray и name инициализированы
    if (this.layoutCardsArray && this.layoutCardsArray.length > 0) {
      // Фильтруем статьи по автору
      const findLayoutsByName = this.layoutCardsArray.filter(
        (layout) => layout.author === this.name
      );

      // Логируем найденные статьи

      // Создаём ссылки на статьи
      findLayoutsByName.forEach((layout) => {
        console.log(layout);

        const memberContentRightItem = document.createElement("a");
        memberContentRightItem.href = `http://127.0.0.1:5500/frontend/article.html?id=${layout._id}`;
        memberContentRightItem.className = "member__content-left-item";
        memberContentRightItem.textContent = layout.name;
        this.memberContentRightItems.append(memberContentRightItem);
      });
    } else {
      console.log("Статьи не найдены для автора:", this.name);
    }
  }
  getElement() {
    return this.memberWrapper;
  }
}

export default MembersContentCreation;
