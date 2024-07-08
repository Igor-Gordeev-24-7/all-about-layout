import LayoutInfoContent from "./LayoutInfoContent.js";

class Layout {
  constructor(selector) {
    this.infoBottom = document.querySelector(selector);
    if (!this.infoBottom) {
      console.warn(`Элемент с селектором "${selector}" не найден.`);
    }

    // Вызов методов
    this.render();
  }
  getId() {
    // Получение текущего URL
    const currentUrl = window.location.href;
    // Создание объекта URL с текущим URL
    const url = new URL(currentUrl);
    // Получение параметров запроса
    const searchParams = new URLSearchParams(url.search);
    // Извлечение значения параметра 'id'
    const id = searchParams.get("id");
    // Метод возвращает id
    return id;
  }

  // Метод получения содержимого карточки по id
  getCards() {
    // return, возвращает Promise
    return fetch(`http://localhost:5001`)
      .then((res) => res.json())
      .catch((error) => {
        console.error("Ошибка получения карточек:", error);
        return null;
      });
  }

  // Получение карточки из массива по id
  async findCardById() {
    const cardsArray = await this.getCards();
    console.log(cardsArray);
    // Проверка на наличие массива карточек
    if (cardsArray) {
      // Получаем id
      const id = this.getId();

      // Фильтруем массив по id,
      // Получаем нужную карточку
      const foundCard = cardsArray.find((el) => el._id == id);
      console.log(foundCard);
      return foundCard;
    } else {
      console.error("Карточка не найдены");
      return null;
    }
  }

  // Асинхронный метод рендера
  async render() {
    // Отчистка this.infoBottom
    this.infoBottom.innerHTML = "";

    // Получение карточки
    const card = await this.findCardById();

    // Проверка на наличие карточки
    if (card) {
      console.log(card);

      // Создаем экземпляр класса,
      // Передаем в него card (Полученнную по id)
      const layoutInfoContent = new LayoutInfoContent(card);

      // Добавляем layoutInfoContent в this.infoBottom
      // Используем getElement() для получения DOM-элемента
      this.infoBottom.appendChild(layoutInfoContent.getElement());
    } else {
      console.error("Карточка не найдена");
    }
  }

  // Добавление карточек
  addCard(tag) {
    this.tags.push(tag);
  }
}

export default Layout;
