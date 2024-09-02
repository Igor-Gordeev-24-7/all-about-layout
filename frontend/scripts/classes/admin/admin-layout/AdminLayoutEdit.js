class AdminLayoutEdit {
  constructor(selector, dbRoutes, port, dbName) {
    this.mainEl = document.querySelector(`.${selector}`);
    this.selector = selector;
    this.dbRoutes = dbRoutes;
    this.port = port;
    this.dbName = dbName;

    this.foundCard = null;
    this.tagsArray = ["", "", "", "", "", ""];
    this.skillsArray = [];

    // Проверка на наличие элемента
    if (!this.mainEl) {
      console.warn(`Элемент с селектором "${selector}" не найден.`);
    } else {
      this.getItems().then(() => {
        this.findItemById();
        this.callingMethods();
      });
    }
  }
  // Метод рендера
  callingMethods() {
    // Очистка this.selector
    this.mainEl.innerHTML = "";

    // Вызов метода добавления элементов
    this.initElements();

    // Вызов методов после завершения рендеринга
    // Вызовы методов для Filtets id "filters-tags"
    this.makeAdminLayoutAddSpanActive(this.selector, "filters-tags");
    this.makeTextSpanChange(
      this.selector,
      "filters-tags",
      this.tagsArray,
      "tags-field-tags"
    );
    // Вызовы методов для Filtets id "filters-skills"
    this.makeAdminLayoutAddSpanActive(this.selector, "filters-skills");
    this.makeTextSpanChange(
      this.selector,
      "filters-skills",
      this.skillsArray,
      "tags-field-skills"
    );
  }
  // Метод получения элементов
  async getItems() {
    try {
      const response = await fetch(
        `${this.dbRoutes}${this.port}${this.dbName}`
      );
      const itemArray = await response.json();
      this.itemArray = itemArray;
    } catch (error) {
      console.log("Не удалось получить элементы:", error);
    }
  }
  // Метод получения id
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
  // Получение карточки из массива по id
  async findItemById() {
    if (this.mainEl) {
      // Проверка на наличие массива элементов
      if (this.itemArray) {
        // Получаем id
        const id = this.getId();

        // Фильтруем массив по id,
        // Получаем нужную карточку
        const foundCard = this.itemArray.find((el) => el._id == id);

        if (foundCard) {
          this.foundCard = foundCard;
        } else {
          console.error("Карточка не найдена");
        }
      } else {
        console.error("Массив элементов не загружен");
      }
    } else {
      console.warn(`Элемент с селектором ${this.selector} не найден `);
    }
  }
  //   Метод вызова методов добавления элементов
  initElements() {
    if (this.mainEl) {
      // Метод добавления popup
      this.initMainElPopup(
        "sending-error",
        "Данные не отправлены",
        this.selector
      );

      // Метод добавления popup
      this.initMainElPopup(
        "successful-submission",
        "Данные отправлены",
        this.selector
      );

      //   Метод добавления Wrapper
      this.initMainElWrapper(this.selector);

      if (this.foundCard) {
        //   Метод добавления Heading
        this.initMainElHeading(this.selector, this.foundCard.name);

        // Добавление блока для ссылок
        this.initMainElLinkBox(this.selector);

        //  Добавление ссылок
        this.initMainElLink(
          this.selector,
          "Перейти к Layouts",
          "https://www.all-about-layout.ru/layouts.html"
        );
        this.initMainElLink(
          this.selector,
          "Перейти к admin-layouts",
          "https://www.all-about-layout.ru/admin-layouts.html"
        );
        this.initMainElLink(
          this.selector,
          "Перейти к admin-content",
          "https://www.all-about-layout.ru/admin-content.html"
        );

        // Поле Имя
        this.initMainElLabel(this.selector, "Имя", "tags-field-name");
        this.initMainElInput(
          this.selector,
          "tags-field-name",
          this.foundCard.name
        );

        // Поле Описание
        this.initMainElLabel(
          this.selector,
          "Описание",
          "tags-field-description"
        );
        this.initMainElInput(
          this.selector,
          "tags-field-description",
          this.foundCard.description
        );

        // Поле Ссылка на макет
        this.initMainElLabel(
          this.selector,
          "Ссылка на макет",
          "tags-field-layout-link"
        );
        this.initMainElInput(
          this.selector,
          "tags-field-layout-link",
          this.foundCard.layoutLink
        );

        // Поле Ссылка на изображение
        this.initMainElLabel(
          this.selector,
          "Ссылка на изображение",
          "tags-field-link-to-img"
        );
        this.initMainElInput(
          this.selector,
          "tags-field-link-to-img",
          this.foundCard.imgLink
        );

        // Поле Теги
        this.initMainElFilters(this.selector, "filters-tags", "Поле тегов");
        this.initMainElContainer(this.selector, "filters-tags", "Сложность:", [
          "Не выбрано",
          "Легкий",
          "Средний",
          "Сложный",
        ]);
        this.initMainElContainer(this.selector, "filters-tags", "Страницы:", [
          "Не выбрано",
          "Одностраничный",
          "Многостраничный",
        ]);
        this.initMainElContainer(
          this.selector,
          "filters-tags",
          "Наличие адаптива:",
          ["Не выбрано", "С адаптивом", "Без адаптива"]
        );
        this.initMainElContainer(this.selector, "filters-tags", "Язык:", [
          "Не выбрано",
          "Русский",
          "Английский",
        ]);
        this.initMainElContainer(
          this.selector,
          "filters-tags",
          "Наличие превью:",
          ["Не выбрано", "Есть", "Нет"]
        );
        this.initMainElContainer(this.selector, "filters-tags", "Тип макета:", [
          "Не выбрано",
          "Макет сайта",
          "Макет письма",
        ]);
        // Добавление input в Filters
        // selector, idParent, idInput, parameter, itemArray
        this.initmainElFiltersInput(
          this.selector,
          "filters-tags",
          "tags-field-tags",
          this.foundCard.tags,
          this.tagsArray
        );

        // Поле применяемые навыки
        this.initMainElFilters(
          this.selector,
          "filters-skills",
          "Поле применяемые навыки"
        );
        this.initMainElContainer(
          this.selector,
          "filters-skills",
          "Сетка (flex или grid):",
          ["Не выбрано", "Сетка (flex или grid)"]
        );
        this.initMainElContainer(this.selector, "filters-skills", "Анимация:", [
          "Не выбрано",
          "Анимация",
        ]);
        this.initMainElContainer(
          this.selector,
          "filters-skills",
          "Элементы формы:",
          ["Не выбрано", "Элементы формы"]
        );
        this.initMainElContainer(
          this.selector,
          "filters-skills",
          "Декоративные элементы:",
          ["Не выбрано", "Декоративные элементы"]
        );
        this.initMainElContainer(
          this.selector,
          "filters-skills",
          "Псевдоэлементы:",
          ["Не выбрано", "Псевдоэлементы"]
        );
        this.initMainElContainer(
          this.selector,
          "filters-skills",
          "Декоративный фон:",
          ["Не выбрано", "Декоративный фон"]
        );
        this.initMainElContainer(this.selector, "filters-skills", "Слайдеры:", [
          "Не выбрано",
          "Слайдеры",
        ]);
        this.initMainElContainer(this.selector, "filters-skills", "Формы:", [
          "Не выбрано",
          "Формы",
        ]);
        // Добавление input в Filters
        // selector, idParent, idInput, parameter, itemArray
        this.initmainElFiltersInput(
          this.selector,
          "filters-skills",
          "tags-field-skills",
          this.foundCard.tags,
          this.skillsArray
        );

        // Поле Ссылка на живую версию
        this.initMainElLabel(
          this.selector,
          "Ссылка на живую версию",
          "tags-field-link-to-live"
        );
        this.initMainElInput(
          this.selector,
          "tags-field-link-to-live",
          this.foundCard.linkToLive
        );

        // Поле Автор
        this.initMainElLabel(this.selector, "Автор", "tags-field-author");
        this.initMainElInput(
          this.selector,
          "tags-field-author",
          this.foundCard.author
        );

        // // Кнопка добавления записи
        this.initMainElBtn(this.selector, "Загрузить изменения Layout");
      } else {
        console.warn(`Элемент ${this.mainEl} не найден `);
      }
    }
  }
  //   В параметры передается id Popup и текст выводимый в нем и selector
  initMainElPopup(id, textContent, selector) {
    const mainElPopup = document.createElement("div");
    mainElPopup.id = id;
    mainElPopup.className = `${selector}__popup`;
    this.mainEl.append(mainElPopup);

    const mainElPopupContent = document.createElement("div");
    mainElPopupContent.className = `${selector}__popup-content`;
    mainElPopup.append(mainElPopupContent);

    const mainElPopupSpan = document.createElement("span");
    mainElPopupSpan.className = `${selector}__popup-span`;
    mainElPopupSpan.textContent = textContent;
    mainElPopupContent.append(mainElPopupSpan);

    mainElPopup.addEventListener("click", () => {
      mainElPopup.classList.remove("active");
    });
  }
  //   Метод добавления Wrapper
  initMainElWrapper(selector) {
    this.mainElWrapper = document.createElement("div");
    this.mainElWrapper.classList.add(`${selector}__wrapper`, "wrapper");
    this.mainEl.append(this.mainElWrapper);
  }
  //   Метод добавления Heading
  initMainElHeading(selector, textContent) {
    this.mainElHeading = document.createElement("h1");
    this.mainElHeading.className = `${selector}__heading`;
    this.mainElHeading.textContent = textContent;
    this.mainElWrapper.append(this.mainElHeading);
  }
  //   Метод добавления LinkBox
  initMainElLinkBox(selector) {
    this.mainElLinkBox = document.createElement("div");
    this.mainElLinkBox.className = `${selector}__link-box`;
    this.mainElWrapper.append(this.mainElLinkBox);
  }
  //   Метод добавления ссылки с переадными парамеитрами textContent - Текст ссылки, linkToPage ссылка на страницу
  initMainElLink(selector, textContent, link) {
    this.mainElAddLink = document.createElement("a");
    this.mainElAddLink.className = `${selector}__link`;
    this.mainElAddLink.href = link;
    this.mainElAddLink.textContent = textContent;
    this.mainElLinkBox.append(this.mainElAddLink);
  }
  //   Метод добавления Label, textContent - текст label, htmlFor - for для связи с id input
  initMainElLabel(selector, textContent, htmlFor) {
    this.mainElLable = document.createElement("label");
    this.mainElLable.className = `${selector}__lable`;
    this.mainElLable.textContent = textContent;
    this.mainElLable.htmlFor = htmlFor;
    this.mainElWrapper.append(this.mainElLable);
  }
  //   Метод добавления Input, id - id для связи с lable и получения зачения для отпраки
  initMainElInput(selector, id, parameter) {
    this.mainElInput = document.createElement("input");
    this.mainElInput.className = `${selector}__input`;
    this.mainElInput.id = id;
    this.mainElInput.type = "text";
    this.mainElInput.value = parameter;
    this.mainElWrapper.append(this.mainElInput);
  }
  //   Метод создает блок Filters и его содержимое. id - id элемента, title - описание элемента
  initMainElFilters(selector, id, title) {
    this.mainElFilters = document.createElement("div");
    this.mainElFilters.className = `${selector}__filters`;
    this.mainElFilters.id = id;
    this.mainElWrapper.append(this.mainElFilters);

    // Создание FiltersHeading
    this.mainElFiltersHeading = document.createElement("span");
    this.mainElFiltersHeading.className = `${selector}__filters-heading`;
    this.mainElFiltersHeading.textContent = title;
    this.mainElFilters.append(this.mainElFiltersHeading);

    // Создание Containers
    this.mainElFiltersContainers = document.createElement("div");
    this.mainElFiltersContainers.className = `${selector}__containers`;
    this.mainElFilters.append(this.mainElFiltersContainers);
  }
  //  Метод создания элемента добавления элемента в массив элементов,
  //  Метод находит родительский контейнер на странице с помощью переданного id. Он ищет элемент с этим id и внутри него ищет дочерний элемент с классом ${selector}__containers.
  //  id - id Filters,
  //  description - Название пункта,
  //  itemsArray - элементы для добавления в массив
  initMainElContainer(selector, id, description, itemsArray) {
    // Найти нужный контейнер по id
    const parentContainer = document
      .getElementById(id)
      .querySelector(`.${selector}__containers`);

    if (!parentContainer) {
      console.error(`Контейнер с id ${id} не найден.`);
      return;
    }

    //  Метод добавления Container
    this.mainElContainer = document.createElement("div");
    this.mainElContainer.className = `${selector}__container`;
    parentContainer.append(this.mainElContainer);

    //  Метод добавления Description
    this.mainElAddDescription = document.createElement("span");
    this.mainElAddDescription.className = `${selector}__description`;
    this.mainElAddDescription.textContent = description;
    this.mainElContainer.append(this.mainElAddDescription);

    //  Метод добавления Box
    this.mainElBox = document.createElement("div");
    this.mainElBox.className = `${selector}__box`;
    this.mainElContainer.append(this.mainElBox);

    //  Метод добавления Span
    this.mainElSpan = document.createElement("span");
    this.mainElSpan.className = `${selector}__span`;
    this.mainElSpan.textContent = "Не выбрано";
    this.mainElBox.append(this.mainElSpan);

    //  Метод добавления Items
    this.mainElItems = document.createElement("div");
    this.mainElItems.className = `${selector}__items`;
    this.mainElBox.append(this.mainElItems);

    // Проходимся о массиву itemsArray и создаем каждый элемент согласно массиву
    itemsArray.forEach((el) => {
      this.mainElItem = document.createElement("span");
      this.mainElItem.className = `${selector}__item`;
      this.mainElItem.textContent = el;
      this.mainElItems.append(this.mainElItem);
    });
  }
  //  Метод добавления Input в Filters по idParent - id Filters,
  //  idInput - id input по которому из него буду получать данные
  initmainElFiltersInput(selector, idParent, idInput) {
    // Найти нужный контейнер по id
    const parentFilters = document.getElementById(idParent);
    if (!parentFilters) {
      console.error(`Контейнер с id ${idParent} не найден.`);
      return;
    }

    this.mainElFiltersInput = document.createElement("input");
    this.mainElFiltersInput.className = `${selector}__input`;
    this.mainElFiltersInput.id = idInput;
    this.mainElFiltersInput.type = "text";
    this.mainElFilters.append(this.mainElFiltersInput);
  }
  //   Метод добавления кнопки отправки данных
  initMainElBtn(selector, textContent) {
    this.mainElBtn = document.createElement("button");
    this.mainElBtn.className = `${selector}__btn`;
    this.mainElBtn.textContent = textContent;
    this.mainElWrapper.append(this.mainElBtn);

    // Добавление обработчика события на кнопку
    this.mainElBtn.addEventListener("click", (event) => {
      event.preventDefault();
      this.handleSubmit();
    });
  }
  // Метод устанавливает обработчики событий для элементов span, которые управляют отображением связанных элементов box. Вот что делает каждый его фрагмент:
  // id =  id соответствующего Filters
  makeAdminLayoutAddSpanActive(selector, id) {
    // Получение додительского элемента по id
    const parentFilters = document.getElementById(id);

    // Проверка на налицие элемента
    if (!parentFilters) {
      console.error(`Контейнер с id ${id} не найден.`);
      return;
    }

    // Получение spans,boxes по родительскому элементу
    const spans = parentFilters.querySelectorAll(`.${selector}__span`);
    const boxes = parentFilters.querySelectorAll(`.${selector}__box`);

    // Используется метод forEach, чтобы пройтись по каждому span в коллекции spans.
    // Параметр spanIndex хранит индекс текущего span в массиве, что позволяет находить соответствующий box с тем же индексом.
    spans.forEach((span, spanIndex) => {
      // Для каждого span добавляется обработчик события click, который срабатывает, когда пользователь кликает на данный span.
      span.addEventListener("click", (event) => {
        // Метод stopPropagation предотвращает всплытие события клика выше по дереву DOM, что может быть полезно, если другие элементы на странице также имеют обработчики событий для кликов.
        event.stopPropagation(); // Предотвращаем всплытие события

        // Определяет, содержит ли соответствующий элемент box с таким же индексом (например, boxes[spanIndex]) класс "active". Это нужно, чтобы узнать, активен ли уже этот элемент.
        const isActive = boxes[spanIndex].classList.contains("active");

        // Перед активацией текущего box элемент, код удаляет класс "active" у всех элементов box, скрывая их.
        boxes.forEach((box) => {
          box.classList.remove("active");
        });

        // Если соответствующий элемент box не был активным, ему добавляется класс "active", что делает его видимым или стилизует его как активный.
        // Если он уже был активным, никакие изменения не применяются.
        if (!isActive) {
          boxes[spanIndex].classList.add("active");
        }
      });
    });

    // Обработчик клика по документу
    document.addEventListener("click", () => {
      // Скрываем все boxes
      boxes.forEach((box) => {
        box.classList.remove("active");
      });
    });
  }
  // Метод передачи массива в input
  passingArrayToInput(array, input) {
    input.value = array;
  }
  // Метод предназначен для изменения текста внутри элементов span и обновления соответствующего массива на основе кликов по элементам в списке.
  // Этот метод позволяет пользователю выбрать элемент из списка, после чего текст span обновляется, а данные сохраняются в массиве и передаются в input элемент для дальнейшего использования.

  // id - id соответствующего Filters
  // tagsArray - Массив куда добавляются элементы
  // inputId - input Импульс в которой отображаются элементы переданы в массив и из него же передаются на бэк
  makeTextSpanChange(selector, id, tagsArray, inputId) {
    // Получение родительского элемента по id
    const parentFilters = document.getElementById(id);

    // Проверка на налицие элемента
    if (!parentFilters) {
      console.error(`Контейнер с id ${id} не найден.`);
      return;
    }

    // Внутри основного контейнера parentFilters ищутся все дочерние элементы, которые соответствуют классу .${selector}__container.
    const containers = parentFilters.querySelectorAll(
      `.${selector}__container`
    );

    // Проходит по каждому найденному контейнеру.
    // Внутри каждого контейнера находит элемент span (для изменения текста) и все элементы списка items (по которым можно кликнуть).
    // Также получает элемент input с заданным inputId, куда будут передаваться обновленные данные.
    containers.forEach((container, containerIndex) => {
      const span = container.querySelector(`.${selector}__span`);
      const items = container.querySelectorAll(`.${selector}__item`);
      const inputById = document.getElementById(inputId);
      // console.log(inputById);

      // Для каждого элемента item в списке items добавляется обработчик события click.
      // Когда пользователь кликает по элементу, происходит следующее:
      // Если индекс элемента itemIndex равен 0 (предположительно, это "сброс" или "выбор по умолчанию"), текст внутри span меняется на текст элемента, а соответствующее значение в массиве tagsArray очищается.
      // В противном случае текст span обновляется на текст элемента, и массив tagsArray сохраняет текст выбранного элемента.
      // Обновленный массив передается в input элемент через метод this.passingArrayToInput.
      items.forEach((item, itemIndex) => {
        item.addEventListener("click", () => {
          if (itemIndex === 0) {
            span.textContent = item.textContent;
            tagsArray[containerIndex] = "";
            // console.log(tagsArray);
            this.passingArrayToInput(tagsArray, inputById);
          } else {
            span.textContent = item.textContent;
            tagsArray[containerIndex] = item.textContent;
            this.passingArrayToInput(tagsArray, inputById);
          }
        });
      });
    });
  }
  // Метод активации popup
  makeActivePopup(id) {
    const mainElPopup = document.getElementById(id);
    if (mainElPopup) {
      mainElPopup.classList.add("active");
    }
  }
  // Метод отчистки полей
  clearFormFields() {
    const inputArr = this.mainEl.querySelectorAll(`.${this.selector}__input`);
    inputArr.forEach((input) => {
      if (input.type === "checkbox") {
        input.checked = false;
      } else {
        input.value = "";
      }
    });
  }
  //   Метод сбора и отправки Layout на сервер
  handleSubmit() {
    const id = this.getId(); // Получение id для обновления
    console.log(id);
    const data = {
      name: document.getElementById("tags-field-name").value,
      description: document.getElementById("tags-field-description").value,
      layoutLink: document.getElementById("tags-field-layout-link").value,
      imgLink: document.getElementById("tags-field-link-to-img").value,
      tags: document
        .getElementById("tags-field-tags")
        .value.split(",")
        .map((tag) => tag.trim().replace(/^"|"$/g, "")),
      skills: document
        .getElementById("tags-field-skills")
        .value.split(",")
        .map((skill) => skill.trim().replace(/^"|"$/g, "")),
      liveLink: document.getElementById("tags-field-link-to-live").value,
      author: document.getElementById("tags-field-author").value,
    };

    // console.log(data); // Проверка формата данных

    fetch(`${this.dbRoutes}${this.port}${this.dbName}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.error || "Unknown error");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        this.makeActivePopup("successful-submission");
        this.clearFormFields();
      })
      .catch((error) => {
        console.error("Error:", error);
        this.makeActivePopup("sending-error");
      });
  }
}
export default AdminLayoutEdit;
