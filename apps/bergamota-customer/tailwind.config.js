/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@bergamota-kit/design-tokens/preset")],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ]
};
