class LayoutInfoContent {
  constructor({ name, linkToLayout, tags, layoutSkills, linkToImg }) {
    this.name = name;
    this.linkToLayout = linkToLayout;
    this.tags = tags;
    this.layoutSkills = layoutSkills;
    this.linkToImg = linkToImg;

    // this.infoBottom
    this.infoBottom = document.querySelector(".info__bottom");

    // this.infoContent
    this.infoContent = document.querySelector(".info__content");
    this.infoBottom.append(this.infoContent);

    // name
    this.infoHeading = document.createElement("h1");
    this.infoHeading.className = "info__heading";
    this.infoHeading.textContent = this.name;
    this.infoContent.append(this.infoHeading);

    // infoLinks
    this.infoLinks = document.createElement("div");
    this.infoLinks.className = "info__links";
    this.infoContent.append(this.infoLinks);

    // infoLink
    this.infoLink = document.createElement("a");
    this.infoLink.className = "info__link";
    this.infoLink.href = this.linkToLayout;
    this.infoLink.textContent = "Ссылка на макет";
    this.infoLinks.append(this.infoLink);

    // infoSkillsTitle
    this.infoSkillsTitle = document.createElement("h2");
    this.infoSkillsTitle.textContent = "Изучаемые навыки";
    this.infoContent.append(this.infoSkillsTitle);

    // tags
    this.infoTags = document.createElement("div");
    this.infoTags.className = "info__tags";
    this.infoContent.append(this.infoTags);

    // skills
    this.infoSkills = document.createElement("ul");
    this.infoSkills.className = "info__skills";
    this.infoContent.append(this.infoSkills);

    // infoImgBox
    this.infoImgBox = document.createElement("div");
    this.infoBottom.append(this.infoImgBox);

    this.infoImg = document.createElement("img");
    this.infoImg.className = "info__img";
    this.infoImg.src = this.linkToImg;
    this.infoImg.alt = "card-img";

    this.randerTags();
    this.renderSkills();
  }

  randerTags() {
    this.tags.forEach((tag) => {
      if (tag) {
        this.infoTag = document.createElement("span");
        this.infoTag.className = "info__tag";
        this.infoTag.textContent = tag;
        this.infoTags.append(this.infoTag);
      }
    });
  }

  renderSkills() {
    this.layoutSkills.forEach((layoutSkill) => {
      this.layoutSkill = document.createElement("li");
      this.layoutSkill.className = "info__skill";
      this.layoutSkill.textContent = layoutSkill;
      this.infoSkills.append(this.layoutSkill);
    });
  }

  getElement() {
    return this.infoTag;
  }
}

export default LayoutInfoContent;
