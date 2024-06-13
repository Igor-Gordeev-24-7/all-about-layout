class Layout {
  constructor(selector) {
    this.infoContent = document.querySelector(selector);
    this.infoHeading = this.infoContent.querySelector("info__heading");
    this.tags = [];
    if (!this.infoContent) {
      console.warn(`Элемент с селектором "${selector}" не найден.`);
    }
  }

  render() {

    this.infoHeading.textContent = "";

  }

  // Добавление карточек
  addCard(tag) {
    this.tags.push(tag);
  }
}

export default Layout;
