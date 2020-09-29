export default class Hello {
  static defaults = {
    timeOfDay: "morning"
  };

  constructor(element, options) {
    this.element = element;
    this.options = { ...Hello.defaults, ...options };

    this.init();
  }

  init() {
    this.enable();
  }

  enable() {
    this.element.innerText = `Good ${this.options.timeOfDay}!`;

    return this;
  }
}
