import ModuleManifest from "./ModuleManifest";

export default class App {
  static defaults = {
    moduleAttribute: "data-module",
    optionsAttribute: "data-module-options"
  };

  constructor(scope = document.documentElement, config = {}) {
    this.config = { ...App.defaults, ...config };
    this.registerModules(scope);

    return this;
  }

  /**
   * Loop over all modules in the defined scope, get any option values,
   * and initialize each module if it exists in the `ModuleManifest` object.
   *
   * @param {HTMLElement} scope
   */
  registerModules(scope) {
    const modules = scope.querySelectorAll(`[${this.config.moduleAttribute}]`);

    modules.forEach(module => {
      const name = module.getAttribute(this.config.moduleAttribute);
      let options;
      try {
        options = JSON.parse(module.getAttribute(this.config.optionsAttribute));
      } catch (error) {
        console.error(
          `Error parsing module options for module ${name}: ${error}`
        );
      }

      if (!ModuleManifest[name]) {
        console.error(
          `Module "${name}" does not exist in the manifest. Did you forget to add it?`
        );
        return;
      }

      const Constructor = ModuleManifest[name];
      // eslint-disable-next-line no-new
      new Constructor(module, options);
    });
  }
}
