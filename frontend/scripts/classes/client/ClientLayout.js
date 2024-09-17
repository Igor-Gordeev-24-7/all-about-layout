class ClientLayout {
  constructor(selector, dbRoutes, port, dbName) {
    this.mainEl = document.querySelector(`.${selector}`);
    this.selector = selector;
    this.dbRoutes = dbRoutes;
    this.port = port;
    this.dbName = dbName;

    this.foundCard = null;

    if (!this.mainEl) {
      console.warn(`Элемент с селектором "${this.selector}" не найден.`);
    } else {
      this.getItems().then(() => {
        this.findItemById();
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
  // Метод получения id
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
  // Получение карточки из массива по id
  async findItemById() {
    if (this.mainEl) {
      // Проверка на наличие массива элементов
      if (this.itemArray) {
        // Получаем id
        const id = this.getId();
        // Фильтруем массив по id,
        // Получаем нужную карточку
        const foundCard = this.itemArray.find((el) => el._id == id);

        if (foundCard) {
          this.foundCard = foundCard;
          console.log(this.foundCard);
        } else {
          console.error("Карточка не найдена");
        }
      } else {
        console.error("Массив элементов не загружен");
      }
    } else {
      console.warn(`Элемент с селектором ${this.selector} не найден `);
    }
  }
  initElements() {
    this.setTitle();
    this.initWrapper();
    this.initTopEl();
    this.initBottom();
    this.initContent();
    this.initLinks();
    this.initLink("Ссылка на макет", this.foundCard.layoutLink);
    this.initLink("Ссылка на превью", this.foundCard.linkToLive);
    this.initSkillsTitle();
    this.initSkill();
    this.initImgBox();
  }
  setTitle() {
    document.title = this.foundCard.name;
  }
  initWrapper() {
    this.wrapperEl = document.createElement("div");
    this.wrapperEl.classList.add(`${this.selector}__wrapper`, "wrapper");
    this.mainEl.append(this.wrapperEl);
  }
  initTopEl() {
    this.topEl = document.createElement("div");
    this.topEl.className = `${this.selector}__top`;
    this.wrapperEl.append(this.topEl);

    this.topLinkEl = document.createElement("a");
    this.topLinkEl.className = `${this.selector}__top-link`;
    this.topLinkEl.href = "https://www.all-about-layout.ru/layouts.html";
    this.topEl.append(this.topLinkEl);

    this.topLinkImg = document.createElement("img");
    this.topLinkImg.className = `${this.selector}__top-link-img`;
    this.topLinkImg.src =
      "https://www.all-about-layout.ru/accets/icons/left-arrow.svg";
    this.topLinkImg.alt = "arrow";
    this.topLinkEl.append(this.topLinkImg);

    this.topLinkSpan = document.createElement("span");
    this.topLinkSpan.className = `${this.selector}__top-link-span`;
    this.topLinkSpan.textContent = "Вернуться к макетам";
    this.topLinkEl.append(this.topLinkSpan);
  }
  initBottom() {
    this.bottomEl = document.createElement("div");
    this.bottomEl.className = `${this.selector}__bottom`;
    this.wrapperEl.append(this.bottomEl);
  }
  initContent() {
    this.contentEl = document.createElement("div");
    this.contentEl.className = `${this.selector}__content`;
    this.bottomEl.append(this.contentEl);

    this.headingEl = document.createElement("h1");
    this.headingEl.className = `${this.selector}__heading`;
    this.headingEl.textContent = this.foundCard.name;
    this.contentEl.append(this.headingEl);

    this.tagsEl = document.createElement("div");
    this.tagsEl.className = `${this.selector}__tags`;
    this.contentEl.append(this.tagsEl);

    this.renderTagsWithConditions();
  }
  initTag(tagTextContent) {
    this.tagEl = document.createElement("span");
    this.tagEl.className = `${this.selector}__tag`;
    this.tagEl.textContent = tagTextContent;
    this.tagsEl.append(this.tagEl);
  }
  // Метод создания тегов
  // С условиями отображения
  renderTagsWithConditions() {
    const tags = this.foundCard.tags;
    console.log(tags);
    tags.forEach((tag, index) => {
      if (index === 4 && tag === "Есть") {
        this.initTag("С превью");
      } else if (index === 4 && tag === "Нет") {
        this.initTag("Без превью");
      } else {
        this.initTag(tag);
      }
    });
  }
  // Метод создания info__links
  initLinks() {
    this.linksEl = document.createElement("div");
    this.linksEl.className = `${this.selector}__links`;
    this.contentEl.append(this.linksEl);
  }
  // Метод создания ссылки
  initLink(textContent, link) {
    this.linkEl = document.createElement("a");
    this.linkEl.className = `${this.selector}__link`;
    this.linkEl.href = link;
    this.linkEl.textContent = textContent;
    // Открывать в новом окне
    this.linkEl.target = "_blank";
    // Безопасные ссылки
    this.linkEl.rel = "noopener noreferrer";
    this.linksEl.append(this.linkEl);
  }
  // Метод создания
  initSkillsTitle() {
    this.skillsTitleEl = document.createElement("h2");
    this.skillsTitleEl.className = `${this.selector}__skills-title`;
    this.skillsTitleEl.textContent = "Изучаемые навыки";
    this.contentEl.append(this.skillsTitleEl);

    this.skillsEl = document.createElement("ul");
    this.skillsEl.className = `${this.selector}__skills`;
    this.contentEl.append(this.skillsEl);
  }
  initSkill() {
    const skills = this.foundCard.skills;
    skills.forEach((skill) => {
      this.skillEl = document.createElement("li");
      this.skillEl.className = `${this.selector}__skill`;
      this.skillEl.textContent = skill;
      this.skillsEl.append(this.skillEl);
    });
  }
  initImgBox() {
    this.imgBoxEl = document.createElement("div");
    this.imgBoxEl.className = `${this.selector}__img-box`;
    this.bottomEl.append(this.imgBoxEl);

    this.infoImgEl = document.createElement("img");
    this.infoImgEl.className = `${this.selector}__img`;
    this.infoImgEl.src = this.foundCard.imgLink;
    this.infoImgEl.alt = "card-img";
    this.imgBoxEl.append(this.infoImgEl);
  }
  getElement() {
    return this.infoContent;
  }
}

export default ClientLayout;
