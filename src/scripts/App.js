import ComponentManifest from "./ComponentManifest";

export default class App {
  DATA_ATTRIBUTE = {
    INSTANCE: "instance",
    COMPONENT: "component",
    COMPONENT_OPTIONS: "component-options"
  };

  init() {
    this.createComponents(document.documentElement);
  }

  createComponents(scope) {
    /* eslint-disable */
    scope = scope ? scope : document.body;
    /* eslint-enable */
    const componentNodes = scope.querySelectorAll(
      `[data-${this.DATA_ATTRIBUTE.COMPONENT}]`
    );
    const components = [...componentNodes];
    if (scope.hasAttribute(`[data-${this.DATA_ATTRIBUTE.COMPONENT}]`)) {
      components.push(scope);
    }
    const componentsLength = components.length;
    let i = 0;
    for (i = 0; i !== componentsLength; i += 1) {
      this.registerComponent(components[i]);
    }
  }

  registerComponent(component) {
    const name = component.getAttribute(
      `data-${this.DATA_ATTRIBUTE.COMPONENT}`
    );
    const options = JSON.parse(
      component.getAttribute(`data-${this.DATA_ATTRIBUTE.COMPONENT_OPTIONS}`)
    );
    const Constructor = ComponentManifest[name];
    const instance = new Constructor(component, options);

    return instance;
  }
}
