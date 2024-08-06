class LayoutsCardRender {
  // Класс принимает селектор, по которому получаем элемент
  constructor(selector) {
    this.galleryCards = document.querySelector(selector);

    // Проверка на наличие элемента this.galleryCards
    if (!this.galleryCards) {
      console.warn(`Элемент с селектором "${selector}" не найден.`);
    }

    // Создаем пустой массив карточек
    this.cards = [];

    this.makeFilterMove();
  }

  // Счетчик количества карточек
  // Отображет количество отредеренных карточек на странице
  cardCounter(counterClass, num) {
    const counterNumber = document.querySelector(counterClass);
    counterNumber.textContent = num;
  }

  //Рендер карточек
  render() {
    // Проверка на наличие элемента this.galleryCards
    if (!this.galleryCards) {
      console.warn("Элемент с селектором this.galleryCards не найден.");
      return;
    }

    // Очистить контейнер перед рендерингом
    this.galleryCards.innerHTML = "";

    // Проходимся по массиву this.cards, для каждой карты вызывается метод getElement(), который возвращает DOM-элемент
    this.cards.forEach((card) => {
      this.galleryCards.append(card.getElement());
    });

    // Вызов cardCounter после рендеринга всех карточек
    this.cardCounter(".counter__number", this.cards.length);
  }

  // Метод ренедрит отфильтрованные карточки,
  // Если отфильрованных карточек 0 (filteredCards = 0), добавляет соответствующий элемент
  renderFiltered(filteredCards) {
    // Очистить контейнер перед рендерингом
    this.galleryCards.innerHTML = "";

    // Проверка на количество переднных карточек
    if (filteredCards.length === 0) {
      // Если количество отфильтрованных карточек 0
      // Ренедерится элемент сообщаяющий, об отсутстии карточек
      const noResultsMessage = document.createElement("div");
      noResultsMessage.className = "no-results-message";
      noResultsMessage.textContent = "По вашим фильтрам ничего не найдено";
      this.galleryCards.append(noResultsMessage);
    } else {
      // Если есть отфитрованные карточки
      filteredCards.forEach((filteredСard) => {
        // В this.galleryCards добавляем отфильтрованные карточки
        // У карточек вызываем метод (filteredСard.getElement()), который возвращает DOM-элемент
        this.galleryCards.append(filteredСard.getElement());
      });
    }
  }

  // Добавление карточек
  addCard(card) {
    this.cards.push(card);
  }

  // Фильрация карточек по переданным параметрам
  // В метод передается массив с параметрами фильтра
  filterCards(filterTags) {
    // Переменная для подсчета количества карточек
    // let numberOfCards = 0;

    // Если параметры фильтра не заданы, рендерятся все карточки
    if (this.filterTags == ["", "", "", "", "", ""]) {
      // Рендер всех карточек
      this.render();
    } else {
      const filteredCards = this.cards.filter((card) =>
        // Проверка, является ли текущий тег tag из массива фильтров пустой строкой, (tag === "")
        // Проверяет, совпадает ли тег карточки на позиции index с текущим тегом tag из массива фильтров (card.tags[index] === tag))
        // Если любое из этих условий истинно, то вся проверка возвращает true
        filterTags.every((tag, index) => tag === "" || card.tags[index] === tag)
      );

      // Вызов метода рендера карточек,
      // В него передаются уже отфильтрованные карточки
      this.renderFiltered(filteredCards);

      // Если условие выполняется счетчик прибавляется
      // numberOfCards = numberOfCards + 1;

      this.cardCounter(".counter__number", filteredCards.length); // Обновление счетчика после фильтрации
    }
  }

  // Переключение фильтра на мобильной версии
  makeFilterMove() {
    const filterEl = document.querySelector(".filter");
    const filterBottomOpenBtnEl = document.querySelector(
      ".filter__bottom-open-btn"
    );

    if (filterBottomOpenBtnEl) {
      filterBottomOpenBtnEl.addEventListener("click", () => {
        filterEl.classList.toggle("open");
      });
    } else {
      console.warn(
        `Элемент с селектором ".filter__bottom-open-btn" не найден.`
      );
    }

    const galleryCardEls = document.querySelectorAll(".gallery__card");
    galleryCardEls.forEach((galleryCard, index) => {
      galleryCard.addEventListener("click", () => {
        console.log(index);
      });
    });
  }
}
export default LayoutsCardRender;
