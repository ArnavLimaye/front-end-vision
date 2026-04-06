/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        "light-bg": "rgb(var(--light-bg) / <alpha-value>)",
        "muted-text": "rgb(var(--muted-text) / <alpha-value>)",
        "gray-header": "rgb(var(--gray-header) / <alpha-value>)",
        "gray-text": "rgb(var(--gray-text) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          dark: "rgb(var(--primary-dark) / <alpha-value>)",
          light: "rgb(var(--primary-light) / <alpha-value>)",
        },
        text: {
          primary: "rgb(var(--text-primary) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary) / <alpha-value>)",
          disabled: "rgb(var(--text-disabled) / <alpha-value>)",
          inverse: "rgb(var(--text-inverse) / <alpha-value>)",
        },
        bg: {
          primary: "rgb(var(--bg-primary) / <alpha-value>)",
          secondary: "rgb(var(--bg-secondary) / <alpha-value>)",
          input: "rgb(var(--bg-input) / <alpha-value>)",
          disabled: "rgb(var(--bg-disabled) / <alpha-value>)",
          neutral: "rgb(var(--bg-neutral) / <alpha-value>)",
          dark: "rgb(var(--bg-dark) / <alpha-value>)",
        },
        border: {
          DEFAULT: "rgb(var(--border) / <alpha-value>)",
          primary: "rgb(var(--border-primary) / <alpha-value>)",
          secondary: "rgb(var(--border-secondary) / <alpha-value>)",
          neutral: "rgb(var(--border-neutral) / <alpha-value>)",
          error: "rgb(var(--border-error) / <alpha-value>)",
          disabled: "rgb(var(--border-disabled) / <alpha-value>)",
        },
        success: "rgb(var(--success) / <alpha-value>)",
        error: "rgb(var(--error) / <alpha-value>)",
        "success-light": "rgb(var(--success-light) / <alpha-value>)",
        "status-warning": "rgb(var(--status-warning) / <alpha-value>)",
        "status-success": "rgb(var(--status-success) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        primary: ["Poppins", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        xs: ["12px", { lineHeight: "1.185em" }],
        sm: ["14px", { lineHeight: "1.185em" }],
        base: ["16px", { lineHeight: "1.185em" }],
      },
      borderRadius: {
        "2xl": "16px",
        input: "8px",
        button: "8px",
      },
      boxShadow: {
        button: "0px 4px 16px 0px rgba(0, 0, 0, 0.12)",
        card: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover": "0 4px 16px rgba(0,0,0,0.08)",
        knob: "0px 3px 1px 0px rgba(0,0,0,0.06), 0px 3px 8px 0px rgba(0,0,0,0.15)",
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(90deg, #30AB84 0%, #108E66 100%)",
        "dark-gradient": "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      },
    },
  },
  plugins: [],
};
