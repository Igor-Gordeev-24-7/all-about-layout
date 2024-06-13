import cardsArray from "../cardsArray.js";

class Cards {
  constructor(selector) {
    this.galleryCards = document.querySelector(selector);
    this.cards = [];
    if (!this.galleryCards) {
      console.warn(`Элемент с селектором "${selector}" не найден.`);
    }
  }

  //Рендер карточек
  render() {
    if (!this.galleryCards) {
      console.warn("galleryCards элемент не найден, рендеринг невозможен.");
      return;
    }
    this.galleryCards.innerHTML = ""; // Очистить контейнер перед рендерингом
    this.cards.forEach((card) => {
      this.galleryCards.append(card.getElement());
    });
    this.cardCounter(".counter__number", this.cards.length); // Вызов cardCounter после рендеринга всех карточек
  }

  // Добавление карточек
  addCard(card) {
    this.cards.push(card);
  }

  // Фильрация карточек по переданным параметрам
  filterCards(filterTags) {
    let numberOfCards = 0;
    if (this.filterTags == ["", "", "", "", "", ""]) {
      this.render();
    } else {
      const filteredCards = this.cards.filter((card) =>
        filterTags.every((tag, index) => tag === "" || card.tags[index] === tag)
      );
      this.renderFiltered(filteredCards);
      numberOfCards = numberOfCards + 1;
      this.cardCounter(".counter__number", filteredCards.length); // Обновление счетчика после фильтрации
    }
  }

  // Метод проверяте наличие карточек и вслучае их отсутствия, добавляет соответствующий элемент
  renderFiltered(filteredCards) {
    this.galleryCards.innerHTML = ""; // Очистить контейнер перед рендерингом
    if (filteredCards.length === 0) {
      const noResultsMessage = document.createElement("div");
      noResultsMessage.className = "no-results-message";
      noResultsMessage.textContent = "По вашим фильтрам ничего не найдено";
      this.galleryCards.append(noResultsMessage);
    } else {
      filteredCards.forEach((card) => {
        this.galleryCards.append(card.getElement());
      });
    }
  }

  // Счетчик количества карточек
  cardCounter(counterClass, num) {
    const counterNumber = document.querySelector(counterClass);
    counterNumber.textContent = num;
  }
}
export default Cards;
