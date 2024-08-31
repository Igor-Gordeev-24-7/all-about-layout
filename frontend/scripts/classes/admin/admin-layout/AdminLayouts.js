class AdminLayouts {
  constructor(selector, dbRoutes, port, dbName) {
    this.mainEl = document.querySelector(selector);
    this.selector = selector;
    this.dbRoutes = dbRoutes;
    this.port = port;
    this.dbName = dbName;

    // Проверка на наличие селектора
    if (!this.mainEl) {
      console.warn(`Элемент с селектором "${selector}" не найден.`);
    }

    this.layoutArray = [];

    this.getLayouts().then(() => {
      this.renderLayout();
    });
  }

  async getLayouts() {
    try {
      const response = await fetch(
        `${this.dbRoutes}${this.port}${this.dbName}`
      );
      const layoutArray = await response.json();
      console.log(layoutArray);
      this.layoutArray = layoutArray;
    } catch (error) {
      console.log("Не удалось получить layout:", error);
    }
  }

  async deleteLayout(id, element) {
    try {
      const response = await fetch(
        `${this.dbRoutes}${this.port}${this.dbName}/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();
      if (response.ok) {
        console.log(result.msg); // Запись удалена
        // Удаление запись из layoutArray
        this.layoutArray = this.layoutArray.filter(
          (layout) => layout._id !== id
        );
        // Удаление элемент из DOM
        element.remove();
      } else {
        console.error(result.msg); // Обработка ошибок
      }
    } catch (error) {
      console.error("Ошибка при удалении записи:", error);
    }
  }

  renderLayout() {
    if (this.mainEl) {
      this.layoutArray.forEach((el) => {
        this.adminLayoutsItem = document.createElement("li");
        this.adminLayoutsItem.className = "admin-layouts__item";
        this.mainEl.append(this.adminLayoutsItem);

        this.adminLayoutsSpan = document.createElement("span");
        this.adminLayoutsSpan.className = "admin-layouts__span";
        this.adminLayoutsSpan.textContent = el.name;
        this.adminLayoutsItem.append(this.adminLayoutsSpan);

        this.adminLayoutsSpan = document.createElement("span");
        this.adminLayoutsSpan.className = "admin-layouts__span";
        this.adminLayoutsSpan.textContent = el.description;
        this.adminLayoutsItem.append(this.adminLayoutsSpan);

        this.adminLayoutsBox = document.createElement("div");
        this.adminLayoutsBox.className = "admin-layouts__btn-box";
        this.adminLayoutsItem.append(this.adminLayoutsBox);

        this.adminLayoutsLink = document.createElement("a");
        this.adminLayoutsLink.className = "admin-layouts__btn";
        this.adminLayoutsLink.href = `https://www.all-about-layout.ru/admin-layout.html?id=${el._id}`;
        this.adminLayoutsLink.textContent = "Редактировать";
        this.adminLayoutsBox.append(this.adminLayoutsLink);

        this.adminLayoutsBtn = document.createElement("btn");
        this.adminLayoutsBtn.className = "admin-layouts__btn";
        this.adminLayoutsBtn.textContent = "Удалить";
        this.adminLayoutsBox.append(this.adminLayoutsBtn);
        this.adminLayoutsBtn.addEventListener("click", () => {
          this.deleteLayout(el._id, this.adminLayoutsItem);
        });
      });
    } else {
      console.warn(`Элемент с селектором ${this.mainEl} не найден.`);
    }
  }
}
export default AdminLayouts;
