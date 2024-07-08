class LayoutInfoContent {
  constructor({ name, description, layoutLink, link, tags, skills }) {
    this.name = name;
    this.description = description;
    this.layoutLink = layoutLink;
    this.link = link;
    this.tags = tags;
    this.skills = skills;

    this.initElements();
    this.renderContent();
  }

  initElements() {
    this.infoBottom = document.querySelector(".info__bottom");
    this.infoContent = document.createElement("div");
    this.infoContent.className = "info__content";
    this.infoBottom.append(this.infoContent);
  }

  renderContent() {
    this.createHeading();
    this.createLinks();
    this.createSkills();
    this.createImage();
    this.renderTags();
    this.renderSkills();
  }

  createHeading() {
    const infoHeading = document.createElement("h1");
    infoHeading.className = "info__heading";
    infoHeading.textContent = this.name;
    this.infoContent.append(infoHeading);
  }

  createLinks() {
    const infoLinks = document.createElement("div");
    infoLinks.className = "info__links";
    this.infoContent.append(infoLinks);

    const infoLink = document.createElement("a");
    infoLink.className = "info__link";
    infoLink.href = this.layoutLink;
    infoLink.textContent = "Ссылка на макет";
    infoLinks.append(infoLink);
  }

  createSkills() {
    const infoSkillsTitle = document.createElement("h2");
    infoSkillsTitle.textContent = "Изучаемые навыки";
    this.infoContent.append(infoSkillsTitle);

    this.infoSkills = document.createElement("ul");
    this.infoSkills.className = "info__skills";
    this.infoContent.append(this.infoSkills);

    this.skills.forEach((skill) => {
      console.log(skill);
    });
  }

  createImage() {
    const infoImgBox = document.createElement("div");
    this.infoBottom.append(infoImgBox);

    const infoImg = document.createElement("img");
    infoImg.className = "info__img";
    infoImg.src = this.linkToImg;
    infoImg.alt = "card-img";
    infoImgBox.append(infoImg);
  }

  renderTags() {
    const infoTags = document.createElement("div");
    infoTags.className = "info__tags";
    this.infoContent.append(infoTags);

    this.tags.forEach((tag) => {
      if (tag) {
        const infoTag = document.createElement("span");
        infoTag.className = "info__tag";
        infoTag.textContent = tag;
        infoTags.append(infoTag);
      }
    });
  }

  renderSkills() {
    this.skills.forEach((layoutSkill) => {
      const skill = document.createElement("li");
      skill.className = "info__skill";
      skill.textContent = layoutSkill;
      this.infoSkills.append(skill);
    });
  }

  getElement() {
    return this.infoContent;
  }
}

export default LayoutInfoContent;
