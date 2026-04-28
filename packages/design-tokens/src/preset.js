/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        cream: {
          0: "var(--color-cream-0)",
          50: "var(--color-cream-50)",
          100: "var(--color-cream-100)",
          200: "var(--color-cream-200)"
        },
        charcoal: {
          600: "var(--color-charcoal-600)",
          700: "var(--color-charcoal-700)",
          800: "var(--color-charcoal-800)",
          900: "var(--color-charcoal-900)"
        },
        terra: {
          accent: "var(--color-terra-accent)",
          "accent-hover": "var(--color-terra-accent-hover)",
          muted: "var(--color-terra-muted)"
        },
        surface: {
          elevated: "var(--color-surface-elevated)"
        },
        border: {
          subtle: "var(--color-border-subtle)"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "ui-serif", "serif"],
        sans: [
          "var(--font-body)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ]
      },
      boxShadow: {
        soft: "var(--shadow-soft)"
      },
      borderRadius: {
        card: "var(--radius-card)"
      },
      spacing: {
        grid: "var(--grid-base)"
      }
    }
  }
};
