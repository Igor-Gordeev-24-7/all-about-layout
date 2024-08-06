class LayoutContentCreation {
  constructor({
    name,
    description,
    layoutLink,
    imgLink,
    linkToLive,
    tags,
    skills,
  }) {
    this.name = name;
    this.description = description;
    this.layoutLink = layoutLink;
    this.imgLink = imgLink;
    this.linkToLive = linkToLive;
    this.tags = tags;
    this.skills = skills;

    this.initElements();
  }

  initElements() {
    this.setTitle();

    this.initInfoBottom();
    this.initInfoHeading();
    this.initInfoTags();
    this.renderTagsWithConditions();
    this.initLinks();
    this.initLinkToLayout();
    this.initLinkToLive();
    this.initInfoSkillsTitle();
    this.initSkill();
    this.initInfoImgBox();
  }

  setTitle() {
    document.title = this.name;
  }
  initInfoBottom() {
    this.infoBottom = document.querySelector(".info__bottom");
    this.infoContent = document.createElement("div");
    this.infoContent.className = "info__content";
    this.infoBottom.append(this.infoContent);
  }
  initInfoHeading() {
    this.infoHeading = document.createElement("h1");
    this.infoHeading.className = "info__heading";
    this.infoHeading.textContent = this.name;
    this.infoContent.append(this.infoHeading);
  }
  initInfoTags() {
    this.infoTags = document.createElement("div");
    this.infoTags.className = "info__tags";
    this.infoContent.append(this.infoTags);
  }
  initInfoTag(tagTextContent) {
    this.infoTag = document.createElement("span");
    this.infoTag.className = "info__tag";
    this.infoTag.textContent = tagTextContent;
    this.infoTags.append(this.infoTag);
  }
  // Метод создания тегов
  // С условиями отображения
  renderTagsWithConditions() {
    this.tags.forEach((tag, index) => {
      if (index === 4 && tag === "Есть") {
        this.initInfoTag("С превью");
      } else if (index === 4 && tag === "Нет") {
        this.initInfoTag("Без превью");
      } else {
        this.initInfoTag(tag);
      }
    });
  }
  // Метод создания info__links
  initLinks() {
    this.infoLinks = document.createElement("div");
    this.infoLinks.className = "info__links";
    this.infoContent.append(this.infoLinks);
    return this.infoLinks;
  }
  // Метод создание ссылки на макет (info__link)
  initLinkToLayout() {
    this.infoLink = document.createElement("a");
    this.infoLink.className = "info__link";
    this.infoLink.href = this.layoutLink;
    this.infoLink.textContent = "Ссылка на макет";
    // Открывать в новом окне
    this.infoLink.target = "_blank";
    // Безопасные ссылки
    this.infoLink.rel = "noopener noreferrer";
    this.infoLinks.append(this.infoLink);
  }
  // Метод создания ссылки на превью (info__link-live)
  initLinkToLive() {
    this.infoLink = document.createElement("a");
    this.infoLink.className = "info__link-live";
    this.infoLink.href = this.linkToLive;
    this.infoLink.textContent = "Ссылка на превью";
    // Открывать в новом окне
    this.infoLink.target = "_blank";
    // Безопасные ссылки
    this.infoLink.rel = "noopener noreferrer";
    this.infoLinks.append(this.infoLink);
  }
  // Метод создания
  initInfoSkillsTitle() {
    this.infoSkillsTitle = document.createElement("h2");
    this.infoSkillsTitle.className = "info__links-heading";
    this.infoSkillsTitle.textContent = "Изучаемые навыки";
    this.infoContent.append(this.infoSkillsTitle);

    this.infoSkills = document.createElement("ul");
    this.infoSkills.className = "info__skills";
    this.infoContent.append(this.infoSkills);
  }
  initSkill() {
    this.skills.forEach((layoutSkill) => {
      this.skill = document.createElement("li");
      this.skill.className = "info__skill";
      this.skill.textContent = layoutSkill;
      this.infoSkills.append(this.skill);
    });
  }
  initInfoImgBox() {
    this.infoImgBox = document.createElement("div");
    this.infoImgBox.className = "info__img-box";
    this.infoBottom.append(this.infoImgBox);

    this.infoImg = document.createElement("img");
    this.infoImg.className = "info__img";
    this.infoImg.src = this.imgLink;
    this.infoImg.alt = "card-img";
    this.infoImgBox.append(this.infoImg);
  }
  getElement() {
    return this.infoContent;
  }
}

export default LayoutContentCreation;
