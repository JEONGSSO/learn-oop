import { on, qs } from "../utils/helpers.js";
import View from "./View.js";

export default class FormView extends View {
  constructor() {
    super(qs("#form-view"));

    this.inputElem = qs("[type=text]", this.elem);
    this.resetElem = qs("[type=reset]", this.elem);
    this.showResetButton(false);
    this.bindEvents();
  }

  showResetButton(visible = true) {
    this.resetElem.style.display = visible ? "block" : "none";
  }

  bindEvents() {
    on(this.inputElem, "keyup", (event) => this.handleKeyUp(event));
    this.on("submit", (event) => event.preventDefault());

    on(this.resetElem, "click", (_) => this.handleClickReset());
  }

  handleClickReset() {
    this.showResetButton(false);
    this.emit("@reset");
  }

  handleKeyUp(event) {
    const ENTER_CODE = 13;

    const { value } = this.inputElem;
    this.showResetButton(value);

    if (!value) {
      this.emit("@reset");
    } else if (event.keyCode === ENTER_CODE) {
      this.emit("@submit", { value });
    }
  }
}
