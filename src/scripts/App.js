import ModuleManifest from "./ModuleManifest";

export default class App {
  static defaults = {
    moduleAttribute: "data-module",
    optionsAttribute: "data-module-options"
  };

  constructor(scope = document, config = {}) {
    this.config = { ...config, ...App.defaults };
    this.registerModules(scope);

    return this;
  }

  registerModules(scope) {
    const modules = scope.querySelectorAll(`[${this.config.moduleAttribute}]`);

    // Loop over each component so we can register it
    modules.forEach(module => {
      const name = module.getAttribute(this.config.moduleAttribute);
      const options = JSON.parse(
        module.getAttribute(this.config.optionsAttribute)
      );

      const Constructor = ModuleManifest[name];
      // eslint-disable-next-line no-new
      new Constructor(module, options);
    });
  }}
