import MembersCardCreation from "./MembersCardCreation.js";
class MembersCardRender {
  constructor(selector, dbRoutes, port, dbName) {
    this.membersCards = document.querySelector(selector);

    this.selector = selector;
    this.dbRoutes = dbRoutes;
    this.port = port;
    this.dbName = dbName;

    if (!this.membersCards) {
      console.warn(`Элемент с селектором "${selector}" не найден.`);
    }

    this.membersCardsArray = [];

    this.getMembersCards().then(() => {
      this.render();
    });
  }

  async getMembersCards() {
    try {
      const response = await fetch(
        `${this.dbRoutes}${this.port}${this.dbName}`
      );
      const membersCardsArray = await response.json();
      this.membersCardsArray = membersCardsArray;
    } catch (error) {
      console.log("Не удалось получить карточки:", error);
    }
  }

  render() {
    // Проверка на наличие элемента this.membersCards
    if (!this.membersCards) {
      console.warn(`Элемент с селектором this.membersCards не найден.`);
      return;
    }

    // Очистить контейнер перед рендерингом
    this.membersCards.innerHTML = "";

    // Проходимся по массиву this.cards, для каждой карты вызывается метод getElement(), который возвращает DOM-элемент
    this.membersCardsArray.forEach((card) => {
      const membersCardCreation = new MembersCardCreation(card);
      this.membersCards.append(membersCardCreation.getElement());
    });
  }
}
export default MembersCardRender;
