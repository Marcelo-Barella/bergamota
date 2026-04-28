/**
 * Tailwind-friendly preset hooks for bergamota (v4 CSS-first themes).
 * Import theme.css before `tailwindcss` in your global stylesheet.
 */

export const themeCssExport = "@bergamota/design-tokens/theme.css";

/** Same values as tokens.mjs; useful for SSR or codegen. */
export { default as tokens, color, space, radius, font } from "./tokens.mjs";

export default {
  themeCssExport
};
