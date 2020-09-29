import ModuleManifest from "./ModuleManifest";

export default class App {
  static defaults = {
    moduleAttribute: "data-module",
    optionsAttribute: "data-module-options"
  };

  constructor(scope = document, config = {}) {
    this.config = { ...App.defaults, ...config };
    this.registerModules(scope);

    return this;
  }

  registerModules(scope) {
    const modules = scope.querySelectorAll(`[${this.config.moduleAttribute}]`);

    // Loop over each component so we can register it
    modules.forEach(module => {
      const name = module.getAttribute(this.config.moduleAttribute);
      let options;
      try {
        options = JSON.parse(module.getAttribute(this.config.optionsAttribute));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          `Error parsing module options for module ${name}: ${error}`
        );
      }

      if (!ModuleManifest[name]) {
        // eslint-disable-next-line no-console
        console.error(
          `Module "${name}" does not exist in the manifest. Did you forget to add it?`
        );
        return;
      }

      const Constructor = ModuleManifest[name];
      // eslint-disable-next-line no-new
      new Constructor(module, options);
    });
  }}
