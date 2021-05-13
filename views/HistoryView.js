import { delegate, qs } from "../utils/helpers.js";
import KeywordView from "./KeywordView.js";

export default class HistoryView extends KeywordView {
  constructor() {
    super(qs("#history-view"), new Template());
  }

  bindEvents() {
    delegate(this.elem, "click", "button.btn-remove", (event) => {
      this.handleClick(event);
    });

    super.bindEvents();
  }

  handleClick(event) {
    event.stopPropagation();
    if (event.target.parentElement.dataset.keyword) {
      this.emit("@remove", {
        value: event.target.parentElement.dataset.keyword,
      });
    } else {
      this.emit("@click", {
        value: event.target.dataset.keyword,
      });
    }
  }
}

class Template {
  emptyMessage() {
    return "검색 이력이 없습니다.";
  }

  getList(data = []) {
    return `
      <ul class="list">
        ${data.reduce(this.getItem, "")}
      </ul>
    `;
  }

  getItem(pre, { keyword, date }) {
    return (
      pre +
      `
        <li data-keyword="${keyword}">
          <span class="data">${date}</span>
          ${keyword}
          <button class="btn-remove">X</button>
        </li>
      `
    );
  }
}
