import { qs } from "../utils/helpers.js";
import View from "./View.js";

export default class ResultView extends View {
  constructor() {
    super(qs("#result-view"));

    this.template = new Template();
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
    return "검색 결과가 없습니다.";
  }

  getList(data = []) {
    return `<ul class="result"> ${data.reduce(this.__getItem, "")} </ul>`;
  }

  __getItem(pre, { name, imageUrl }) {
    return (
      pre +
      `
      <li>
        <img src="${imageUrl}" alt="image" />
        <p>${name}</p>
      </li>
    `
    );
  }
}
