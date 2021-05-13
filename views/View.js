import { on, emit } from "../utils/helpers.js";

export default class View {
  constructor(elem) {
    this.elem = elem;
    this.originalDisplay = elem.style.display || "";
    return this;
  }

  show() {
    this.elem.style.display = this.originalDisplay;
    return this;
  }

  hide() {
    this.elem.style.display = "none";
    return this;
  }

  on(eventName, fn) {
    on(this.elem, eventName, fn);
    return this;
  }

  emit(eventName, data) {
    emit(this.elem, eventName, data);
    return this;
  }
}
