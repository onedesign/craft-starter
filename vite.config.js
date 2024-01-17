const path = require('path');
import * as dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), 'app/.env') });
import { vitePluginCraftCms } from 'vite-plugin-craftcms';
import { defineConfig, loadEnv } from 'vite';
import eslint from '@rollup/plugin-eslint';
import viteRestart from 'vite-plugin-restart';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  let serverOrigin;
  if (process.env.PRIMARY_SITE_URL) {
    serverOrigin = process.env.PRIMARY_SITE_URL.endsWith('/')
      ? process.env.PRIMARY_SITE_URL.slice(0, -1)
      : process.env.PRIMARY_SITE_URL;
  }

  return {
    base: command === 'serve' ? '' : '/dist/',
    css: {
      devSourcemap: true,
    },
    publicDir: './src/static',
    server: {
      origin: serverOrigin ? `${serverOrigin}:3000` : 'localhost',
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
      vitePluginCraftCms({
        outputFile: './app/templates/_partials/vite.twig',
      }),
      viteRestart({
        reload: ['./app/templates/**/*'],
      }),
    ],
  };
});
