# CLAUDE.md

Guidance for working in this repo. It's a [One Design Company](https://onedesigncompany.com) Craft CMS starter, built on Craft 5 + DDEV + Vite + Tailwind CSS v4.

## Stack

- **CMS**: Craft CMS 5, PHP 8.4, Twig templates
- **Local env**: DDEV (Docker) — see [README.md](README.md) for full setup
- **Build**: Vite 6 via `vite-plugin-craftcms`
- **CSS**: Tailwind CSS v4 (CSS-first config, no `tailwind.config.js`)
- **Plugins**: SEOMatic, Typogrify, Imager X, Formie, Hyper, Servd Asset Storage, Sherlock (CSP)

## Critical rule: always run commands through DDEV

Never run `npm`, `composer`, or `craft` directly on the host. This project's `esbuild`/Vite setup is compiled for the container's architecture — running `npm install` outside DDEV breaks the dev server (see README "Common Pitfalls"). Always prefix commands:

```
ddev npm install
ddev npm run start
ddev composer require foo/bar
ddev craft <command>
```

## Directory structure

- `app/templates/` — Twig templates. `_layout.twig` is the base layout, `_partials/` holds includes (Vite's manifest partial is auto-generated here, do not hand-edit `_partials/vite.twig`).
- `app/config/` — Craft project config (YAML), synced via `ddev craft project-config/apply`. Don't hand-edit generated project-config YAML; make changes in the Craft control panel and let it export, or use `craft generator` for code.
- `src/entry.html` — Vite build entry; references `src/scripts/main.js` and `src/styles/main.css`.
- `src/scripts/` — JS source.
- `src/styles/` — CSS source. `main.css` imports Tailwind and the theme layers (`theme.css`, `typography.css`, `skip-link.css`).
- `src/static/` — Static assets served from the Vite public dir.

## Tailwind v4 conventions

- No `tailwind.config.js`. Theme customization happens in [src/styles/theme.css](src/styles/theme.css) via `@theme`.
- `--*: initial;` in `theme.css` intentionally strips Tailwind's default theme so only explicitly defined design tokens are available as utilities. When a design calls for a color/spacing/font value, add it as a CSS variable under `@theme` rather than reaching for an arbitrary value or Tailwind's defaults.
- Prettier auto-sorts Tailwind classes (`prettier-plugin-tailwindcss`, configured against `./src/styles/main.css`) — don't hand-order classes, just run Prettier.

## Static assets in templates/CSS

Vite resolves static assets from `src/static/` as the root — always use absolute paths:

```twig
<img src="{{ vite.url('/images/sprout.jpg') }}" alt="" />
```

```css
src: url('/fonts/fira-code-v21-latin-regular.woff2') format('woff2');
```

## Formatting & linting

- Prettier handles Twig, JS, and CSS formatting (`@zackad/prettier-plugin-twig`, `prettier-plugin-tailwindcss`). Run before committing; don't hand-format.
- ESLint (`eslint:recommended` + `plugin:compat/recommended`) runs on `src/`. `npm run lint` (via DDEV) fixes what it can.
- `printWidth` is 180 — don't fight the formatter by wrapping lines manually.

## Craft project config

Config changes made in the control panel export to `app/config/project/*.yaml`. When pulling changes from a teammate or another environment, run `ddev craft project-config/apply` rather than resolving YAML conflicts by hand where possible.
