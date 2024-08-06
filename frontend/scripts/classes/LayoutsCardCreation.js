class LayoutsCardCreation {
  constructor({ name, description, imgLink, tags, _id }) {
    this.name = name;
    this.description = description;
    this.imgLink = imgLink;
    this.tags = tags;
    this.id = _id;

    this.initElements();
  }

  initElements() {
    this.initGalleryCard();
    this.initGalleryCardTop();
    this.initGalleryTags();
    this.initGalleryCardBottom();
    this.initGalleryCardName();
    this.initGalleryCardDescription();
    this.updateTags();
  }

  initGalleryCard() {
    // Создаем элемент галереи-карточки
    this.galleryCard = document.createElement("a");
    this.galleryCard.href = `http://127.0.0.1:5500/frontend/layout.html?id=${this.id}`;
    this.galleryCard.className = "gallery__card";
  }

  initGalleryCardTop() {
    // Создаем верхнюю часть карточки галереи
    this.galleryCardTop = document.createElement("div");
    this.galleryCardTop.className = "gallery__card-top";
    this.galleryCardTop.style.backgroundImage = `url(${this.imgLink})`;
    this.galleryCard.append(this.galleryCardTop);
  }

  initGalleryTags() {
    // Создаем элемент для тегов в карточке галереи
    this.galleryTags = document.createElement("div");
    this.galleryTags.className = "gallery__tags";
    this.galleryCardTop.append(this.galleryTags);
  }

  initGalleryCardBottom() {
    // Создаем нижнюю часть карточки галереи
    this.galleryCardBottom = document.createElement("div");
    this.galleryCardBottom.className = "gallery__card-bottom";
    this.galleryCard.append(this.galleryCardBottom);
  }

  initGalleryCardName() {
    // Создаем элемент для названия в карточке галереи
    this.galleryCardName = document.createElement("h4");
    this.galleryCardName.className = "gallery__card-name";
    this.galleryCardName.textContent = this.name;
    this.galleryCardBottom.append(this.galleryCardName);
  }

  initGalleryCardDescription() {
    // Создаем элемент для описания в карточке галереи
    this.galleryCardDescription = document.createElement("span");
    this.galleryCardDescription.className = "gallery__card-description";
    this.galleryCardDescription.textContent = this.description;
    this.galleryCardBottom.append(this.galleryCardDescription);
  }

  createAndAppendTag(parent, className, content = null, imgSrc = null) {
    // Метод создания и добавления тега
    // В него передаются параметры:
    // parent - родительский элемент, куда добавляется тег
    // className - присваиваемый класс тега
    // content - текстовое содержание тега (опционально)
    // imgSrc - путь к изображению (опционально)
    const tagElement = document.createElement("div");
    tagElement.className = className;
    if (content) {
      tagElement.textContent = content;
    }
    if (imgSrc) {
      const imgElement = document.createElement("img");
      imgElement.src = imgSrc;
      tagElement.appendChild(imgElement);
    }
    parent.append(tagElement);
  }

  updateTags() {
    // Очищаем все теги перед добавлением
    this.galleryTags.innerHTML = "";

    // Проходимся по всем тегам,
    // С помощью проверки по индексу обращаемся к нужному тегу
    this.tags.forEach((tag, index) => {
      if (index == 3) {
        // Задаем условия рендеринга тегов, в зависимости от содержимого
        if (tag == "Русский") {
          this.createAndAppendTag(this.galleryTags, "gallery__tag", "ru");
        } else if (tag == "Английский") {
          this.createAndAppendTag(this.galleryTags, "gallery__tag", "en");
        }
      } else if (index == 4) {
        // Задаем условия рендеринга тегов, в зависимости от содержимого
        if (tag === "Есть") {
          this.createAndAppendTag(
            this.galleryTags,
            "gallery__tag",
            null,
            "/public/accets/icons/eye.svg"
          );
        } else {
          this.createAndAppendTag(
            this.galleryTags,
            "gallery__tag",
            null,
            "/frontend/aссets/icons/arrow-right-top.svg"
          );
        }
      } else if (tag.length > 0) {
        // Если количество тегов больше 0, они отображаются как есть
        this.createAndAppendTag(this.galleryTags, "gallery__tag", tag);
      }
    });
  }

  getElement() {
    // Метод возвращает DOM-элемент карточки галереи
    return this.galleryCard;
  }
}

export default LayoutsCardCreation;
