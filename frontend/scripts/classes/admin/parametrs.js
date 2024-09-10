// Article Add - Edit
export const articleLabelArray = [
  { lableSpanTextContent: "Имя", id: "name" },
  { lableSpanTextContent: "Автор", id: "author" },
  { lableSpanTextContent: "Дата - формат(дд.мм.гггг)", id: "date" },
];

export const articleLinksArray = [
  {
    textContent: "Перейти к Article",
    link: "https://www.all-about-layout.ru/articles.html",
  },
  {
    textContent: "Перейти к admin-articles",
    link: "https://www.all-about-layout.ru/admin-articles.html",
  },
  {
    textContent: "Перейти к admin-content",
    link: "https://www.all-about-layout.ru/admin-content.html",
  },
];

export const articleContainerArrayInfo = {
  selectorId: "selector-tags",
  selectorTitle: "Поле тегов",
  idInput: "tags",
  containersArray: [
    {
      parentContainerId: "selector-tags",
      containerDescription: "Теги:",
      containerItemsArray: ["Не выбрано", "HTML", "CSS", "JS", "React"],
    },
    {
      parentContainerId: "selector-tags",
      containerDescription: "Виды:",
      containerItemsArray: ["Не выбрано", "Виды1", "Виды2", "Виды3", "Виды4"],
    },
    {
      parentContainerId: "selector-tags",
      containerDescription: "Виды:",
      containerItemsArray: ["Не выбрано", "Виды1", "Виды2", "Виды3", "Виды4"],
    },
  ],
};
