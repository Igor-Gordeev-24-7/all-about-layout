class AdminMembersEdit {
  constructor(selector, dbRoutes, port, dbName) {
    this.mainEl = document.querySelector(`.${selector}`);
    this.selector = selector;
    this.dbRoutes = dbRoutes;
    this.port = port;
    this.dbName = dbName;

    // Проверка на наличие селектора

    if (!this.selector) {
      console.warn(`Элемент с селектором "${selector}" не найден.`);
    }

    this.foundCard = null;
    this.tagsArray = ["", "", "", "", "", ""];
    this.skillsArray = [];

    this.getItems().then(() => {
      this.findItemById();
      this.render();
    });
  }
  
}
export default AdminMembersEdit;
