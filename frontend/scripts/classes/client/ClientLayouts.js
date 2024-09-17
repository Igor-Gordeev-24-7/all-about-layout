class ClientItems {
  constructor(selector, dbRoutes, port, dbName, linkItemPage, parametersArray) {
    this.mainEl = document.querySelector(`.${selector}`);
    this.selector = selector;
    this.dbRoutes = dbRoutes;
    this.port = port;
    this.dbName = dbName;
    this.linkItemPage = linkItemPage;
    this.parametersArray = parametersArray;

    // Массив с полученными элементами
    this.itemArray = [];
    this.filterTags = ["", "", "", "", "", ""];

    // Проверка на наличие селектора
    if (!this.mainEl) {
      console.warn(`Элемент с селектором "${selector}" не найден.`);
    } else {
      this.getItems().then(() => {
        // Метод редора элементов
        this.initElements();
      });
    }
  }
  // Метод получения данных
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
  initElements() {
    this.initWrapper();
    this.initFilter();
    this.initItems();
    this.initItemCards(this.itemArray);
  }
  initWrapper() {
    this.wrapperEl = document.createElement("div");
    this.wrapperEl.classList.add(`${this.selector}__wrapper`, "wrapper");
    this.mainEl.append(this.wrapperEl);
  }
  initFilter() {
    this.filterEl = document.createElement("div");
    this.filterEl.className = `${this.selector}__filter`;
    this.wrapperEl.append(this.filterEl);

    this.parametersEl = document.createElement("div");
    this.parametersEl.className = `${this.selector}__parameters`;
    this.filterEl.append(this.parametersEl);

    this.parametersArray.forEach((parametersArray, index) => {
      const parameterEl = document.createElement("div");
      parameterEl.className = `${this.selector}__parameter`;
      this.parametersEl.append(parameterEl);

      const parameterNameEl = document.createElement("span");
      parameterNameEl.className = `${this.selector}__parameter-name`;
      parameterNameEl.textContent = parametersArray.parametersName;
      parameterEl.append(parameterNameEl);

      const parameterBtnEl = document.createElement("button");
      parameterBtnEl.className = `${this.selector}__parameter-btn`;
      parameterBtnEl.textContent = "Не выбрано";
      parameterBtnEl.setAttribute("data-index", index);
      parameterEl.append(parameterBtnEl);

      const parameterItemsEl = document.createElement("div");
      parameterItemsEl.className = `${this.selector}__parameter-items`;
      parameterItemsEl.setAttribute("data-index", index);
      parameterEl.append(parameterItemsEl);

      const parameterItemsContainerEl = document.createElement("div");
      parameterItemsContainerEl.className = `${this.selector}__parameter-items-container`;
      parameterItemsEl.append(parameterItemsContainerEl);

      // Добавляем элементы списка
      parametersArray.parametersItems.forEach((parameterItem, itemIndex) => {
        const parameterItemEl = document.createElement("div");
        parameterItemEl.className = `${this.selector}__parameter-item`;
        parameterItemEl.textContent = parameterItem;

        // Обработчик клика для каждого элемента списка
        parameterItemEl.addEventListener("click", () => {
          // Проверяем по индексу, что кнопка и элемент соответствуют друг другу
          parameterBtnEl.textContent = parameterItem;

          // Если выбран первый элемент (например, "Не выбрано"), записываем пустую строку
          if (itemIndex === 0) {
            this.filterTags[index] = ""; // Пустая строка
          } else {
            this.filterTags[index] = parameterItem; // Выбранный элемент
          }

          // Логирование массива для проверки
          // console.log("Updated filterTags:", this.filterTags);

          // Закрываем список после выбора
          parameterItemsEl.classList.remove("active");

          // Перерисовываем элементы с учетом обновленных данных
          this.initItemCards(this.itemArray);
        });

        parameterItemsContainerEl.append(parameterItemEl);
      });

      // Открытие/закрытие списка по клику на кнопку
      parameterBtnEl.addEventListener("click", (event) => {
        // Закрываем все другие активные списки
        const allItems = this.parametersEl.querySelectorAll(
          `.${this.selector}__parameter-items`
        );
        allItems.forEach((item) => item.classList.remove("active"));

        // Открываем текущий список
        parameterItemsEl.classList.toggle("active");

        // Предотвращаем всплытие события
        event.stopPropagation();
      });
    });

    this.parametersResetEl = document.createElement("button");
    this.parametersResetEl.className = `${this.selector}__parameters-btn`;
    this.parametersResetEl.textContent = "Сбросить фильтр";
    this.parametersResetEl.addEventListener("click", () => {
      this.filterTags = ["", "", "", "", "", ""];
      this.initItemCards(this.itemArray);
    });
    this.parametersEl.append(this.parametersResetEl);

    // Глобальный обработчик для клика вне открытого списка
    document.addEventListener("click", (event) => {
      const allItems = this.parametersEl.querySelectorAll(
        `.${this.selector}__parameter-items.active`
      );
      allItems.forEach((item) => {
        if (!item.contains(event.target)) {
          item.classList.remove("active");
        }
      });
    });
  }
  initItems() {
    this.itemsEl = document.createElement("div");
    this.itemsEl.className = `${this.selector}__items`;
    this.wrapperEl.append(this.itemsEl);
  }
  initItemCards(itemArray) {
    // Очищаем контейнер карточек перед новым рендером
    this.itemsEl.innerHTML = "";

    // Счетчик отображенных карточек
    let renderedItemsCount = 0;

    // Проверяем, если все элементы в filterTags пустые
    const isFilterEmpty = this.filterTags.every((tag) => tag === "");

    // Если фильтр пустой, отображаем все карточки
    if (isFilterEmpty) {
      itemArray.forEach((el) => {
        this.initItemCard(el._id, el.name, el.imgLink, el.description, el.tags);
        renderedItemsCount++; // Увеличиваем счетчик, когда карточка рендерится
      });
    } else {
      // Фильтрация карточек по тегам
      itemArray.forEach((el) => {
        const hasMatchingTag = el.tags.some((tag) =>
          this.filterTags.includes(tag)
        );

        // Если есть совпадающий тег, рендерим карточку
        if (hasMatchingTag) {
          this.initItemCard(
            el._id,
            el.name,
            el.imgLink,
            el.description,
            el.tags
          );
          renderedItemsCount++; // Увеличиваем счетчик, когда карточка рендерится
        }
      });
    }

    // Если не было отрендерено ни одной карточки, выводим сообщение
    if (renderedItemsCount === 0) {
      this.itemsMessageEl = document.createElement("span");
      this.itemsMessageEl.className = `${this.selector}__items-message`;
      this.itemsMessageEl.textContent = "Карточки не найдены";
      this.itemsEl.append(this.itemsMessageEl);
    }
  }
  initItemCard(id, name, imgLink, description, tags) {
    this.cardEl = document.createElement("a");
    this.cardEl.href = `https://www.all-about-layout.ru/${this.linkItemPage}.html?id=${id}`;
    this.cardEl.className = `${this.selector}__card`;
    this.itemsEl.append(this.cardEl);

    this.cardTop = document.createElement("div");
    this.cardTop.className = `${this.selector}__card-top`;
    this.cardTop.style.backgroundImage = `url(${imgLink})`;
    this.cardEl.append(this.cardTop);

    this.tagsEl = document.createElement("div");
    this.tagsEl.className = `${this.selector}__tags`;
    this.cardTop.append(this.tagsEl);
    this.updateTags(tags);

    this.cardBottomEl = document.createElement("div");
    this.cardBottomEl.className = `${this.selector}__card-bottom`;
    this.cardEl.append(this.cardBottomEl);

    this.cardNameEl = document.createElement("span");
    this.cardNameEl.className = `${this.selector}__card-name`;
    this.cardNameEl.textContent = name;
    this.cardBottomEl.append(this.cardNameEl);

    this.cardDescription = document.createElement("span");
    this.cardDescription.className = `${this.selector}__card-description`;
    this.cardDescription.textContent = description;
    this.cardBottomEl.append(this.cardDescription);
  }
  createAndAppendTag(parent, className, content = null, imgSrc = null) {
    // Метод создания и добавления тега
    // В него передаются параметры:
    // parent - родительский элемент, куда добавляется тег
    // className - присваиваемый класс тега
    // content - текстовое содержание тега (опционально)
    // imgSrc - путь к изображению (опционально)
    const tagElement = document.createElement("div");
    tagElement.className = className;
    if (content) {
      tagElement.textContent = content;
    }
    if (imgSrc) {
      const imgElement = document.createElement("img");
      imgElement.src = imgSrc;
      tagElement.appendChild(imgElement);
    }
    parent.append(tagElement);
  }
  updateTags(tags) {
    // Очищаем все теги перед добавлением
    this.tagsEl.innerHTML = "";

    if (tags) {
      // Проходимся по всем тегам,
      // С помощью проверки по индексу обращаемся к нужному тегу
      tags.forEach((tag, index) => {
        if (index == 2) {
          // Задаем условия рендеринга тегов, в зависимости от содержимого
          if (tag == "Русский") {
            this.createAndAppendTag(this.tagsEl, `${this.selector}__tag`, "ru");
          } else if (tag == "Английский") {
            this.createAndAppendTag(this.tagsEl, `${this.selector}__tag`, "en");
          }
        } else if (index == 3) {
          // Задаем условия рендеринга тегов, в зависимости от содержимого
          if (tag === "Есть") {
            this.createAndAppendTag(
              this.tagsEl,
              `${this.selector}__tag`,
              null,
              "https://www.all-about-layout.ru/accets/icons/eye.svg"
            );
          } else {
            this.createAndAppendTag(
              this.tagsEl,
              `${this.selector}__tag`,
              null,
              "https://www.all-about-layout.ru/accets/icons/blind-eye.svg"
            );
          }
        } else if (tag.length > 0) {
          // Если количество тегов больше 0, они отображаются как есть
          this.createAndAppendTag(this.tagsEl, `${this.selector}__tag`, tag);
        }
      });
    }
  }
}
export default ClientItems;
