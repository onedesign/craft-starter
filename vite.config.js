import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { vitePluginCraftCms } from 'vite-plugin-craftcms';
import viteRestart from 'vite-plugin-restart';
import eslint from '@rollup/plugin-eslint';

// In development, nginx proxies this path through to the Vite server (see .ddev/nginx/vite.conf),
// so assets and HMR are same-origin on whatever host the site is loaded from (ddev.site, a tunnel, a LAN IP).
const DEV_BASE = '/__vite/';

// Mirrors vite-plugin-craftcms's default template, but writes root-relative dev URLs instead of a fixed origin.
function craftTemplate({ head = [], body = [], basePath = '', mode = 'production' }) {
  const isDev = mode === 'development';
  const devRoot = DEV_BASE.replace(/\/$/, '');
  const rewrite = (element, attribute) => {
    const value = element.getAttribute(attribute);
    if (value) {
      element.setAttribute(attribute, value.replace('./', `${devRoot}/src/`));
    }
  };
  head.concat(body).forEach((element) => {
    rewrite(element, 'src');
    rewrite(element, 'href');
  });

  let headString = head.map((element) => element.outerHTML).join('');
  const endBodyString = body.map((element) => element.outerHTML).join('');
  const rootPath = isDev ? devRoot : basePath;
  if (isDev) {
    headString = `<script type="module" src="${devRoot}/@vite/client"></script>${headString}`;
  }

  return `
{%- macro url(path) -%}{{ '${rootPath}' | replace('/\\\\/$/', '') }}{{ path }}{%- endmacro -%}
{% html at head %}${headString}{% endhtml %}
{% html at endBody %}${endBodyString}{% endhtml %}
`.trim();
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    base: command === 'serve' ? DEV_BASE : '/dist/',
    css: {
      devSourcemap: true,
    },
    publicDir: './src/static',
    server: {
      port: 3000,
      host: '0.0.0.0',
      strictPort: true,
    },
    build: {
      emptyOutDir: true,
      manifest: true,
      outDir: './app/web/dist/',
      rollupOptions: {
        input: './src/entry.html',
        plugins: [
          eslint({
            include: '**/*.+(vue|js|jsx|ts|tsx)',
            throwOnError: true,
          }),
        ],
      },
    },
    plugins: [
      tailwindcss(),
      vitePluginCraftCms({
        outputFile: './app/templates/_partials/vite.twig',
        template: craftTemplate,
      }),
      viteRestart({
        reload: ['./app/templates/**/*'],
      }),
    ],
  };
});
