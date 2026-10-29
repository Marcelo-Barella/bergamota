/**
 * Programmatic Bergamota design tokens (cream / terracotta / calm type rhythm).
 */

export const color = {
  surface: {
    base: "#faf8f5",
    muted: "#f3efe8",
    elevated: "#ebe4da",
    paper: "#fffcf7"
  },
  ink: {
    primary: "#2c2824",
    secondary: "#5c534a",
    muted: "#7a7268",
    subtle: "#9c9488"
  },
  accent: {
    terracotta: "#ba5c45",
    terracottaHover: "#a34f39",
    terracottaForeground: "#fffcf9"
  },
  outline: "#d4cbc0",
  focus: "#8b5a42"
};

export const space = {
  unit: 8,
  gutter: {
    xs: "16px",
    sm: "24px",
    md: "32px",
    lg: "40px",
    xl: "48px",
    section: "96px"
  }
};

export const radius = {
  sm: "8px",
  md: "12px",
  lg: "20px",
  pill: "9999px"
};

export const font = {
  display: '"Fraunces", ui-serif, Georgia, serif',
  body: '"Source Sans 3", ui-sans-serif, system-ui, sans-serif'
};

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px"
};

export default {
  color,
  space,
  radius,
  font,
  breakpoints
};
