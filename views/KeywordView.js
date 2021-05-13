import { delegate, qs } from "../utils/helpers.js";
import View from "./View.js";

export default class KeywordView extends View {
  constructor(elem = qs("#keyword-view"), template = new Template()) {
    super(elem);
    this.template = template;
    this.bindEvents();
  }

  bindEvents() {
    delegate(this.elem, "click", "li", (event) => this.handleClick(event));
  }

  handleClick({ target }) {
    const value = target.dataset.keyword;
    this.emit("@click", { value });
  }

  show(data = []) {
    this.elem.innerHTML = data.length
      ? this.template.getList(data)
      : this.template.emptyMessage();

    super.show();
  }
}

class Template {
  emptyMessage() {
    return "키워드가 없습니다.";
  }

  getList(data) {
    return `
      <ul class="list">
        ${data.reduce(this.getTab, "")}
      </ul>
    `;
  }

  getTab(pre, { id, keyword }) {
    return (
      pre +
      `
        <li data-keyword="${keyword}">
          <span class="number">${id}</span>
          ${keyword}
        </li>
      `
    );
  }
}
