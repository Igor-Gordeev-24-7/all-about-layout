class AdminItemAdd {
  constructor(
    selector,
    dbRoutes,
    port,
    dbName,
    lableArray,
    linksArray,
    selectorsArray
  ) {
    this.mainEl = document.querySelector(`.${selector}`);
    this.selector = selector;
    this.dbRoutes = dbRoutes;
    this.port = port;
    this.dbName = dbName;
    this.lableArray = lableArray;
    this.linksArray = linksArray;
    this.selectorsArray = selectorsArray;

    // Проверка на наличие селектора
    if (!this.mainEl) {
      console.warn(`Элемент с селектором ${this.selector} не найден.`);
    } else {
      this.callingMethods();
    }
  }

  callingMethods() {
    // Очистка this.selector
    this.mainEl.innerHTML = "";
    this.initElements();
  }
  //   Метод вызова методов добавления элементов
  initElements() {
    //   Метод рендера popup
    this.initPopup("sending-error", "Данные не отправлены", this.selector);

    //   Метод рендера popup
    this.initPopup("successful-submission", "Данные отправлены", this.selector);

    // ----------------------------------
    //   Метод рендера Wrapper
    this.initWrapper();

    // ----------------------------------
    //   Метод рендера Links из массива
    this.initLinks(this.linksArray);

    // ----------------------------------
    // Метод рендера Lable из массива
    this.initMainElLabels(this.lableArray);

    // ----------------------------------
    //    Метод добавления Selectors
    this.initSelectors(this.selector, this.selectorsArray);

    // ----------------------------------
    //    Метод добавления ElementsPanel
    if (
      this.selector == "admin-article-add" ||
      this.selector == "admin-article-edit"
    ) {
      this.initElementsPanel(this.selector, "element-panel", "content");
    }

    // ----------------------------------
    //    Кнопка добавления записи
    this.initSendBtn(this.selector, "Загрузить Article");
  }

  //   Метод добавления POPUP
  //   В параметры передается id Popup и текст выводимый в нем и selector
  initPopup(id, textContent) {
    const popupEl = document.createElement("div");
    popupEl.id = id;
    popupEl.className = `${this.selector}__popup`;
    this.mainEl.append(popupEl);

    const popupElContent = document.createElement("div");
    popupElContent.className = `${this.selector}__popup-content`;
    popupEl.append(popupElContent);

    const popupElSpan = document.createElement("span");
    popupElSpan.className = `${this.selector}__popup-span`;
    popupElSpan.textContent = textContent;
    popupElContent.append(popupElSpan);

    popupEl.addEventListener("click", () => {
      popupEl.classList.remove("active");
    });
  }

  //   Метод добавления Wrapper
  initWrapper() {
    this.wrapperEl = document.createElement("div");
    this.wrapperEl.classList.add(`${this.selector}__wrapper`, "wrapper");
    this.mainEl.append(this.wrapperEl);

    //  Добавление Heading
    this.headingEl = document.createElement("h1");
    this.headingEl.className = `${this.selector}__heading`;
    this.headingEl.textContent = document.title;
    this.wrapperEl.append(this.headingEl);

    //  Добавление LinkBox
    this.linkBox = document.createElement("div");
    this.linkBox.className = `${this.selector}__link-box`;
    this.wrapperEl.append(this.linkBox);
  }

  //   Метод рендера Links из массива
  initLinks(linksArray) {
    linksArray.forEach((link) => {
      this.initLink(link.textContent, link.link);
    });
  }

  //   Метод добавления link
  //   textContent - Текст ссылки
  //   linkToPage ссылка на страницу
  initLink(textContent, link) {
    this.link = document.createElement("a");
    this.link.className = `${this.selector}__link`;
    this.link.href = link;
    this.link.textContent = textContent;
    this.linkBox.append(this.link);
  }

  //  Метод рендера Lable из массива
  //  textContent - текст label
  //  htmlFor - for для связи с id input
  //  selector, lableSpanTextContent, id
  initMainElLabels(lableArray) {
    lableArray.forEach((lable) => {
      this.initMainElLabel(
        lable.lableSpanTextContent,
        lable.id,
        this.foundCard
      );
    });
  }

  //  Метод рендера Lable
  initMainElLabel(lableSpanTextContent, id, parameter) {
    this.lableEl = document.createElement("label");
    this.lableEl.className = `${this.selector}__lable`;
    this.lableEl.htmlFor = id;
    this.wrapperEl.append(this.lableEl);

    this.lableSpan = document.createElement("span");
    this.lableSpan.className = `${this.selector}__lable-span`;
    this.lableSpan.textContent = lableSpanTextContent;
    this.lableEl.append(this.lableSpan);

    this.inputEl = document.createElement("input");
    this.inputEl.className = `${this.selector}__input`;
    this.inputEl.id = id;
    this.inputEl.textContent = `${parameter}.${id}`;
    this.inputEl.type = "text";
    this.wrapperEl.append(this.inputEl);
  }

  initSelectors(selector, selectorArray) {
    selectorArray.forEach((container) => {
      this.initSelector(selector, container);
    });
  }

  //   Метод создает блок Selector
  //   id - id элемента
  //   title - описание элемента
  initSelector(selector, containerObject) {
    this.selectorEl = document.createElement("div");
    this.selectorEl.className = `${selector}__selector`;
    this.selectorEl.id = containerObject.selectorId;
    this.wrapperEl.append(this.selectorEl);

    // Создание selectionHeadingEl
    this.selectionHeadingEl = document.createElement("span");
    this.selectionHeadingEl.className = `${selector}__selector-heading`;
    this.selectionHeadingEl.textContent = containerObject.selectorTitle;
    this.selectorEl.append(this.selectionHeadingEl);

    // Создание Containers
    this.containers = document.createElement("div");
    this.containers.className = `${selector}__containers`;
    this.selectorEl.append(this.containers);

    // Вызов метода создания контейнеров согласно переданному массиву
    this.initContainerEls(
      selector,
      this.containers,
      containerObject.containersArray,
      containerObject
    );

    this.initSelectorInput(selector, containerObject.idInput);
  }

  //  Метод создания ContainerEls
  //  Метод проходит по переданному массиву и рендерит соответствующее число контейнеров
  initContainerEls(
    selector,
    parentContainer,
    containersArray,
    containerObject
  ) {
    containersArray.forEach((container) => {
      this.initContainer(
        selector,
        parentContainer,
        container.containerDescription,
        container.containerItemsArray
      );
    });
    setTimeout(() => {
      this.makeContainerSpanActive(selector, containerObject.selectorId);
      this.makeTextContainerSpanChange(
        selector,
        containerObject.selectorId,
        containerObject.idInput
      );
    }, 500);
  }

  //  Метод добавления Container
  initContainer(
    selector,
    parentContainer,
    containerDescription,
    containerItemsArray
  ) {
    //  Метод добавления Container
    this.containerEl = document.createElement("div");
    this.containerEl.className = `${selector}__container`;
    parentContainer.append(this.containerEl);

    //  Метод добавления ContainerDescription
    this.containerDescriptionEl = document.createElement("span");
    this.containerDescriptionEl.className = `${selector}__container-description`;
    this.containerDescriptionEl.textContent = containerDescription;
    this.containerEl.append(this.containerDescriptionEl);

    //  Метод добавления Box
    this.containerBtnEl = document.createElement("button");
    this.containerBtnEl.className = `${selector}__container-btn`;
    this.containerEl.append(this.containerBtnEl);

    //  Метод добавления Span
    this.containerSpanEl = document.createElement("span");
    this.containerSpanEl.className = `${selector}__container-span`;
    this.containerSpanEl.textContent = "Не выбрано";
    this.containerBtnEl.append(this.containerSpanEl);

    //  Метод добавления Items
    this.containerItemsEl = document.createElement("div");
    this.containerItemsEl.className = `${selector}__container-items`;
    this.containerBtnEl.append(this.containerItemsEl);

    // Проходимся о массиву containerItemsArray и создаем каждый элемент согласно массиву
    containerItemsArray.forEach((el) => {
      this.containerItemEl = document.createElement("span");
      this.containerItemEl.className = `${selector}__container-item`;
      this.containerItemEl.textContent = el;
      this.containerItemsEl.append(this.containerItemEl);
    });
  }

  //  Метод добавления Input в SelectorEl
  //  idInput - id input по которому из него буду получать данные
  initSelectorInput(selector, idInput) {
    this.selectorInputEl = document.createElement("input");
    this.selectorInputEl.classList =
      (`${selector}__selector-input`, `${selector}__input`);
    this.selectorInputEl.id = idInput;
    this.selectorInputEl.type = "text";
    this.selectorEl.append(this.selectorInputEl);
  }

  // Метод создания PanelBtn
  // selector - селектор
  // btnText - текс кнопки
  // html - передаваемый при нажатии код
  // insertField - поле ввода кода при нажатии на кнопку
  // parentEl- родительский элемент
  initPanelBtn(selector, btnText, html, insertField, parentEl) {
    this.panelBtnEl = document.createElement("button");
    this.panelBtnEl.className = `${selector}__panel-btn`;
    this.panelBtnEl.textContent = btnText;

    this.panelBtnEl.addEventListener("click", () => {
      if (
        insertField &&
        (insertField.tagName === "TEXTAREA" ||
          (insertField.tagName === "INPUT" && insertField.type === "text"))
      ) {
        const startPos = insertField.selectionStart;
        const endPos = insertField.selectionEnd;

        const beforeCursor = insertField.value.substring(0, startPos);
        const afterCursor = insertField.value.substring(
          endPos,
          insertField.value.length
        );

        insertField.value = beforeCursor + html + afterCursor;

        insertField.selectionStart = insertField.selectionEnd =
          startPos + html.length;

        insertField.scrollTop = insertField.scrollHeight;
      } else {
        console.error("Invalid insertField element provided.");
      }
    });

    parentEl.append(this.panelBtnEl);
  }

  // Метод добавления ElementsPanel
  initElementsPanel(selector, idElementPanel) {
    this.panelEl = document.createElement("div");
    this.panelEl.className = `${selector}__panel`;
    this.panelEl.id = idElementPanel;
    this.wrapperEl.append(this.panelEl);

    this.panelBtnsEl = document.createElement("div");
    this.panelBtnsEl.className = `${selector}__panel-btns`;
    this.panelEl.append(this.panelBtnsEl);

    this.panelBtnsBoxEl = document.createElement("div");
    this.panelBtnsBoxEl.className = `${selector}__panel-btns-box`;
    this.panelBtnsEl.append(this.panelBtnsBoxEl);

    this.panelCodeEl = document.createElement("textarea");
    this.panelCodeEl.className = `${selector}__panel-code`;
    this.panelCodeEl.id = "content";
    this.panelCodeEl.addEventListener("input", () => {
      this.panelViewingEl.innerHTML = this.panelCodeEl.value;
    });
    this.panelEl.append(this.panelCodeEl);

    this.initPanelBtn(
      this.selector,
      "Добавить текст p",
      `<p class="article__text">
    ТЕКСТ
  </p>
  
  `,
      this.panelCodeEl,
      this.panelBtnsBoxEl
    );
    this.initPanelBtn(
      this.selector,
      "Добавить жирный текст span",
      `   <span class="article__text--bold">ТЕКСТ</span>`,
      this.panelCodeEl,
      this.panelBtnsBoxEl
    );
    this.initPanelBtn(
      this.selector,
      "Добавить код pre",
      `<pre class="article__code">
    <code class="language-javascript">
      КОД
    </code>
  </pre>
  
  `,
      this.panelCodeEl,
      this.panelBtnsBoxEl
    );

    this.panelViewingEl = document.createElement("div");
    this.panelViewingEl.className = `${selector}__panel-viewing`;
    this.panelEl.append(this.panelViewingEl);
  }

  //   Метод добавления кнопки отправки данных
  initSendBtn(selector, textContent) {
    this.sendBtnEl = document.createElement("button");
    this.sendBtnEl.className = `${selector}__send-btn`;
    this.sendBtnEl.textContent = textContent;
    this.wrapperEl.append(this.sendBtnEl);

    // Добавление обработчика события на кнопку
    this.sendBtnEl.addEventListener("click", (event) => {
      event.preventDefault();
      this.handleSubmit();
    });
  }

  // Метод устанавливает обработчики событий для элементов span, которые управляют отображением связанных элементов box. Вот что делает каждый его фрагмент:
  // id =  id соответствующего Filters
  makeContainerSpanActive(selector, id) {
    // Получение додительского элемента по id
    const parentFilters = document.getElementById(id);

    // Проверка на налицие элемента
    if (!parentFilters) {
      console.error(`Контейнер с id ${id} не найден.`);
      return;
    }
    // Получение spans,boxes по родительскому элементу
    const spans = parentFilters.querySelectorAll(
      `.${selector}__container-span`
    );
    const boxes = parentFilters.querySelectorAll(`.${selector}__container-btn`);

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
  // inputValueArray - Массив куда добавляются элементы
  // inputId - input Импульс в которой отображаются элементы переданы в массив и из него же передаются на бэк
  makeTextContainerSpanChange(selector, id, inputId) {
    // Получение родительского элемента по id
    const parentFilters = document.getElementById(id);

    const inputValueArray = [];

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
    // Внутри каждого контейнера находит элемент containerSpan (для изменения текста) и все элементы списка items (по которым можно кликнуть).
    // Также получает элемент input с заданным inputId, куда будут передаваться обновленные данные.
    containers.forEach((container, containerIndex) => {
      const containerSpan = container.querySelector(
        `.${selector}__container-span`
      );
      const containerItems = container.querySelectorAll(
        `.${selector}__container-item`
      );
      const inputById = document.getElementById(inputId);

      // Для каждого элемента item в списке containerItems добавляется обработчик события click.
      // Когда пользователь кликает по элементу, происходит следующее:
      // Если индекс элемента itemIndex равен 0 (предположительно, это "сброс" или "выбор по умолчанию"), текст внутри span меняется на текст элемента, а соответствующее значение в массиве inputValueArray очищается.
      // В противном случае текст containerSpan обновляется на текст элемента, и массив inputValueArray сохраняет текст выбранного элемента.
      // Обновленный массив передается в input элемент через метод this.passingArrayToInput.
      containerItems.forEach((item, itemIndex) => {
        item.addEventListener("click", () => {
          if (itemIndex === 0) {
            containerSpan.textContent = item.textContent;
            inputValueArray[containerIndex] = "";
            this.passingArrayToInput(inputValueArray, inputById);
          } else {
            containerSpan.textContent = item.textContent;
            inputValueArray[containerIndex] = item.textContent;
            this.passingArrayToInput(inputValueArray, inputById);
          }
        });
      });
    });
  }

  // Метод активации popup
  makeActivePopup(id) {
    const popupEl = document.getElementById(id);
    if (popupEl) {
      popupEl.classList.add("active");
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

  //   Метод сбора и отправки Item на сервер
  handleSubmit() {
    const data = {};

    // Получаем все input и textarea элементы внутри основного элемента
    const inputElements = this.mainEl.querySelectorAll("input, textarea");

    // Проходим по каждому элементу input и textarea
    inputElements.forEach((el) => {
      const fieldId = el.id;

      // Проверяем, если поле "tags" или "skills", обрабатываем строку
      if (fieldId === "tags" || fieldId === "skills") {
        data[fieldId] = el.value
          .split(",")
          .map((item) => item.trim().replace(/^"|"$/g, ""));
      } else {
        data[fieldId] = el.value; // Для других полей сохраняем значение как есть
      }
    });

    console.log(data); // Проверка формата данных

    fetch(`${this.dbRoutes}${this.port}${this.dbName}`, {
      method: "POST",
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
        this.makeActivePopup("sending-error");
      });
  }
}

export default AdminItemAdd;
