import LayoutContentCreation from "./LayoutContentCreation.js";

class LayoutContentRender {
  constructor(selector) {
    this.infoBottom = document.querySelector(selector);
    if (!this.infoBottom) {
      console.warn(`Элемент с селектором "${selector}" не найден.`);
    }
    this.cardContent;

    this.getCardById()
      .then(() => {
        this.render();
      })
      .catch((error) => {
        console.error("Не удалось получить карточку:", error);
      });
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

  async getCardById() {
    try {
      const id = this.getId();
      const response = await fetch(`http://79.174.86.232:27017/layouts`);
      const cardContents = await response.json();

      if (cardContents && cardContents.length > 0) {
        this.cardContent = cardContents.find((card) => card._id === id);
      } else {
        console.warn("Данные не найдены");
      }
    } catch (error) {
      console.log("Не удалось получить карточку:", error);
    }
  }

  render() {
    if (!this.infoBottom) {
      console.warn(`Элемент this.infoBottom не найден.`);
    } else {
      // Очистка this.infoBottom
      this.infoBottom.innerHTML = "";

      // Проверка на наличие карточки
      if (this.cardContent) {
        // Создаем экземпляр класса,
        // Передаем в него cardContent
        const layoutInfoContent = new LayoutContentCreation(this.cardContent);

        // Добавляем layoutInfoContent в this.infoBottom
        // Используем getElement() для получения DOM-элемента
        this.infoBottom.appendChild(layoutInfoContent.getElement());
      } else {
        console.error("Карточка не найдена");
      }
    }
  }
}

export default LayoutContentRender;
