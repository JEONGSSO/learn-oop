const qs = (selector, parent = document) => parent.querySelector(selector);

const qsa = (selector, parent = document) => parent.querySelectorAll(selector);

const on = (elem, eventName, fn) => elem.addEventListener(eventName, fn);

const emit = (elem, eventName, detail) => {
  console.log("emit", detail);
  const event = new CustomEvent(eventName, { detail });
  elem.dispatchEvent(event);
};

const delegate = (target, eventName, selector, hanlder) => {
  const emitEvent = (event) => {
    const potentialElems = qsa(selector, target);

    for (const potentialElem of potentialElems) {
      if (potentialElem === event.target) {
        return hanlder.call(event.target, event);
      }
    }
  };
  on(target, eventName, emitEvent);
};

export { qs, qsa, on, emit, delegate };
