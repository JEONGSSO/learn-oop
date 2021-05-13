import { qs, qsa } from "../utils/helpers.js";
import View from "./View.js";

export const Tab = {
  KEYWORD: "추천 검색어",
  HISTORY: "최근 검색어",
};

export default class TabView extends View {
  constructor() {
    super(qs("#tab-view"));

    this.template = new Template();
    this.show("KEYWORD");

    this.bindEvents();
  }

  bindEvents() {
    this.elem.addEventListener("click", (event) => this.handleClick(event));
  }

  handleClick({
    target: {
      dataset: { tab },
    },
  }) {
    this.emit("@change", { value: tab });
  }

  show(selectedTab) {
    this.elem.innerHTML = this.template.tabList();
    qsa("li", this.elem).forEach((li) => {
      li.className = li.dataset.tab === selectedTab ? "active" : "";
    });

    super.show();
  }
}

export class Template {
  tabList() {
    return `
      <ul class="tabs">
        ${Object.keys(Tab).reduce(this.getTab, "")}
      </ul>
    `;
  }

  getTab(pre, data) {
    return (
      pre +
      `
        <li data-tab="${data}">
          ${Tab[data]}
        </li>
      `
    );
  }
}
