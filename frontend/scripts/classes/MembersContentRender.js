import MembersContentCreation from "./MembersContentCreation.js";

class MembersContentRender {
  constructor(selector) {
    this.member = document.querySelector(selector);

    if (!this.member) {
      console.warn(`Элемент с селектором "${selector}" не найден.`);
      return; // Ранний возврат, если элемент main не найден
    }

    this.memberContent = null; // Инициализация memberContent

    this.getMemberById()
      .then(() => {
        this.render();
      })
      .catch((error) => {
        console.error("Не удалось получить участника:", error);
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

  async getMemberById() {
    try {
      const id = this.getId();
      const response = await fetch(`http://localhost:5001/members`);
      const memberContent = await response.json();

      if (memberContent && memberContent.length > 0) {
        this.memberContent = memberContent.find((member) => member._id === id);
        if (!this.memberContent) {
          console.log("Участник не найден"); // Логирование, если участник не найден
        }
      } else {
        console.log("Данные не найдены");
      }
    } catch (error) {
      console.log("Не удалось получить карточку:", error);
    }
  }

  render() {
    if (!this.member) {
      console.warn(`Элемент this.member не найден.`);
      return; // Ранний возврат, если элемент main не найден
    }

    // Очистка this.member
    this.member.innerHTML = "";
    // Проверка на наличие карточки
    if (this.memberContent) {
      // Создаем экземпляр класса,
      // Передаем в него memberContent
      const memberContentCreation = new MembersContentCreation(
        this.memberContent
      );
      // Добавляем layoutInfoContent в this.member
      // Используем getElement() для получения DOM-элемента
      this.member.appendChild(memberContentCreation.getElement());
    } else {
      console.error("Участник не найден");
    }
  }
}

export default MembersContentRender;
