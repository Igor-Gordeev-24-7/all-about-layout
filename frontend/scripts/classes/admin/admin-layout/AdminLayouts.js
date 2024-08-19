class AdminLayouts {
  constructor(selector) {
    this.adminLayoutList = document.querySelector(selector);

    if (!this.adminLayoutList) {
      console.warn(`Элемент с селектором "${selector}" не найден.`);
    }

    this.layoutArray = [];

    this.getLayouts().then(() => {
      this.renderLayout();
    });
  }

  async getLayouts() {
    try {
      const response = await fetch(`http://79.174.86.232:27017/layouts`);
      const layoutArray = await response.json();
      this.layoutArray = layoutArray;
    } catch (error) {
      console.log("Не удалось получить layout:", error);
    }
  }

  async deleteLayout(id, element) {
    try {
      const response = await fetch(`http://79.174.86.232:27017/layouts/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (response.ok) {
        console.log(result.msg); // Запись удалена
        // Удалите запись из layoutArray
        this.layoutArray = this.layoutArray.filter(
          (layout) => layout._id !== id
        );
        // Удалите элемент из DOM
        element.remove();
      } else {
        console.error(result.msg); // Обработка ошибок
      }
    } catch (error) {
      console.error("Ошибка при удалении записи:", error);
    }
  }

  renderLayout() {
    if (this.adminLayoutList) {
      this.layoutArray.forEach((el) => {
        this.adminLayoutsItem = document.createElement("li");
        this.adminLayoutsItem.className = "admin-layouts__item";
        this.adminLayoutList.append(this.adminLayoutsItem);

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
        this.adminLayoutsLink.href = `http://127.0.0.1:5500/frontend/admin-layout.html?id=${el._id}`;
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
      console.warn(`Элемент с селектором this.adminLayoutList не найден.`);
    }
  }
}
export default AdminLayouts;
