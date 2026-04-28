# @bergamota-kit/design-tokens

CSS custom properties and Tailwind preset for Bergamota surfaces.

## Install

Workspace: add `"@bergamota-kit/design-tokens": "workspace:*"` (or npm `file:` path) to your app.

Peer: `tailwindcss` >= 3.4.

## Tailwind

```js
// tailwind.config.ts
module.exports = {
  presets: [require('@bergamota-kit/design-tokens/preset')],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}']
};
```

## CSS

Import tokens before `@tailwind` directives:

```css
@import '@bergamota-kit/design-tokens/css/tokens.css';
```
