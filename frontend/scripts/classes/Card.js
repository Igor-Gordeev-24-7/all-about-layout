class Card {
  constructor({ name, description, link, tags, _id }) {
    this.name = name;
    this.description = description;
    this.link = link;
    this.tags = tags;
    this.id = _id;

    // card
    this.galleryCard = document.createElement("a");
    this.galleryCard.href = `http://127.0.0.1:5500/frontend/layout.html?id=${this.id}`;
    this.galleryCard.className = "gallery__card";

    // galleryCardTop
    this.galleryCardTop = document.createElement("div");
    this.galleryCardTop.className = "gallery__card-top";
    this.galleryCardTop.style.backgroundImage = `url(${this.link})`;
    this.galleryCard.append(this.galleryCardTop);

    // galleryTags
    this.galleryTags = document.createElement("div");
    this.galleryTags.className = "gallery__tags";
    this.galleryCardTop.append(this.galleryTags);

    // galleryСardBottom
    this.galleryСardBottom = document.createElement("div");
    this.galleryСardBottom.className = "gallery__card-bottom";
    this.galleryCard.append(this.galleryСardBottom);

    // galleryCardName
    this.galleryCardName = document.createElement("h4");
    this.galleryCardName.className = "gallery__card-name";
    this.galleryCardName.textContent = this.name;
    this.galleryСardBottom.append(this.galleryCardName);

    // galleryCardDescription
    this.galleryCardDescription = document.createElement("span");
    this.galleryCardDescription.className = "gallery__card-description";
    this.galleryCardDescription.textContent = this.name;
    this.galleryСardBottom.append(this.galleryCardDescription);

    this.updateTags();
  }

  // Метод возвращает возвращает DOM-элемент
  getElement() {
    return this.galleryCard;
  }

  // Метод создания и добавления тега
  // В него передаются парметры:
  // parent - родительский элемент, куда добавляется тег
  // className - присваимавый класс тега
  // content -
  createAndAppendTag(parent, className, content = null, imgSrc = null) {
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
    // Отчищаем все теги преред добавлением
    this.galleryTags.innerHTML = "";

    // Проходимся по всем тегам,
    // С помощью проверки по индексу обращемся к нужному тегу
    this.tags.forEach((tag, index) => {
      if (index == 3) {
        // Задаем условия рендеринга тегов, в зависимости от содержимого
        if (tag == "Русский") {
          this.createAndAppendTag(this.galleryTags, "gallery__tag", "ru", null);
        } else if (tag == "Английский") {
          this.createAndAppendTag(this.galleryTags, "gallery__tag", "en", null);
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
            "/public/accets/icons/blind-eye.svg"
          );
        }

        // Если количество тегов больше 0, они отобржаеются как есть
      } else if (tag.length > 0) {
        this.createAndAppendTag(this.galleryTags, "gallery__tag", tag, null);
      }
    });
  }
}
export default Card;
