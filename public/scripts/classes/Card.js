class Card {
  constructor({ name, description, link, tags }) {
    this.name = name;
    this.description = description;
    this.link = link;
    this.tags = tags;

    // card
    this.galleryCard = document.createElement("div");
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
  getElement() {
    return this.galleryCard;
  }

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
    // Удалить все текущие теги
    while (this.galleryTags.firstChild) {
      this.galleryTags.removeChild(this.galleryTags.firstChild);
    }

    this.tags.forEach((tag, index) => {
      if (index == 3) {
        if (tag == "Русский") {
          this.createAndAppendTag(this.galleryTags, "gallery__tag", "ru");
        } else if (tag == "Английский") {
          this.createAndAppendTag(this.galleryTags, "gallery__tag", "en");
        }
      } else if (index == 4) {
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
      } else if (tag.length > 0) {
        this.createAndAppendTag(this.galleryTags, "gallery__tag", tag);
      }
    });

    // Добавить новые теги в соответствии с this.tags
    // this.tags.forEach((tag, index) => {
    //   if (index == 4 && tag === "Есть") {
    //     const tagElement = document.createElement("div");
    //     tagElement.className = "gallery__tag";
    //     const imgElement = document.createElement("img");
    //     imgElement.src = "/public/accets/icons/eye.svg"; // Укажите путь к вашему изображению
    //     tagElement.appendChild(imgElement);
    //     this.galleryTags.append(tagElement);
    //   } else if (index == 4 && tag != "Есть") {
    //     const tagElement = document.createElement("div");
    //     tagElement.className = "gallery__tag";
    //     const imgElement = document.createElement("img");
    //     imgElement.src = "/public/accets/icons/blind-eye.svg"; // Укажите путь к вашему изображению
    //     tagElement.appendChild(imgElement);
    //     this.galleryTags.append(tagElement);
    //   } else if (tag.length > 0) {
    //     // Условие для добавления текстового тега
    //     const tagElement = document.createElement("div");
    //     tagElement.className = "gallery__tag";
    //     tagElement.textContent = tag;
    //     this.galleryTags.append(tagElement);
    //   }
    // });
  }
}
export default Card;
