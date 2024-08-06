class MembersCardCreation {
  constructor({ _id, name, description, imgLink, tags, skills }) {
    this.id = _id;
    this.name = name;
    this.description = description;
    this.imgLink = imgLink;
    this.tags = tags;
    this.skills = skills;

    this.initElements();
  }
  initElements() {
    this.initMembersCards();
    this.initMembersCard();
    this.initMembersCardTop();
    this.initMembersCardTopImg();
    this.initMembersTags();
    this.initMembersTag();
    this.initMembersCardBottom();
    this.initMembersCardName();
    this.initMembersCardDescription();
  }
  initMembersCards() {
    this.membersCards = document.querySelector(".members__cards");
  }
  initMembersCard() {
    this.membersCard = document.createElement("a");
    this.membersCard.className = "members__card";
    this.membersCard.href = `http://127.0.0.1:5500/frontend/member.html?id=${this.id}`;
    this.membersCards.append(this.membersCard);
  }
  initMembersCardTop() {
    this.membersCardTop = document.createElement("div");
    this.membersCardTop.className = "members__card-top";
    this.membersCard.append(this.membersCardTop);
  }
  initMembersCardTopImg() {
    this.membersCardTopImg = document.createElement("img");
    this.membersCardTopImg.className = "members__card-top-img";
    this.membersCardTopImg.alt = "avatar";
    this.membersCardTopImg.src = this.imgLink;
    this.membersCardTop.append(this.membersCardTopImg);
  }
  initMembersTags() {
    this.membersTags = document.createElement("div");
    this.membersTags.className = "members__tags";
    this.membersCardTop.append(this.membersTags);
  }
  initMembersTag() {
    this.tags.forEach((el) => {
      this.membersTag = document.createElement("span");
      this.membersTag.className = "members__tag";
      this.membersTag.textContent = el;
      this.membersTags.append(this.membersTag);
    });
  }
  initMembersCardBottom() {
    this.membersCardBottom = document.createElement("div");
    this.membersCardBottom.className = "members__card-bottom";
    this.membersCard.append(this.membersCardBottom);
  }
  initMembersCardName() {
    this.membersCardName = document.createElement("h2");
    this.membersCardName.className = "members__card-name";
    this.membersCardName.textContent = this.name;
    this.membersCardBottom.append(this.membersCardName);
  }
  initMembersCardDescription() {
    this.membersCardDescription = document.createElement("span");
    this.membersCardDescription.className = "members__card-description";
    this.membersCardDescription.textContent = this.description;
    this.membersCardBottom.append(this.membersCardDescription);
  }
  getElement() {
    return this.membersCard;
  }
}
export default MembersCardCreation;
