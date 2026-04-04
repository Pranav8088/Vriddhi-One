/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "error-container": "#fce8e8",
        "surface": "#ffffff",
        "primary-container": "#e0fbfc",
        "on-surface": "#1e293b",
        "on-error-container": "#991b1b",
        "on-tertiary-fixed-variant": "#4d2700",
        "on-error": "#ffffff",
        "surface-tint": "#06b6d4",
        "on-secondary-fixed": "#1e1b4b",
        "tertiary-container": "#ffedd5",
        "tertiary-fixed-dim": "#fcd34d",
        "on-surface-variant": "#64748b",
        "on-primary-container": "#164e63",
        "surface-variant": "#f1f5f9",
        "on-tertiary": "#ffffff",
        "surface-container-highest": "#e2e8f0",
        "primary-fixed-dim": "#67e8f9",
        "error-dim": "#f87171",
        "tertiary": "#f59e0b",
        "inverse-surface": "#0f172a",
        "error": "#ef4444",
        "secondary-dim": "#a78bfa",
        "surface-container-low": "#f8fafc",
        "on-primary": "#ffffff",
        "on-background": "#1e293b",
        "outline-variant": "#cbd5e1",
        "on-primary-fixed-variant": "#155e75",
        "secondary-fixed": "#ddd6fe",
        "on-secondary": "#ffffff",
        "secondary-fixed-dim": "#c4b5fd",
        "secondary": "#8b5cf6",
        "on-tertiary-container": "#7c2d12",
        "tertiary-dim": "#fbbf24",
        "on-secondary-fixed-variant": "#4c1d95",
        "surface-dim": "#f1f5f9",
        "inverse-primary": "#06b6d4",
        "on-tertiary-fixed": "#451a03",
        "primary-dim": "#22d3ee",
        "background": "#ffffff",
        "primary": "#06b6d4",
        "surface-container-high": "#f1f5f9",
        "on-primary-fixed": "#083344",
        "on-secondary-container": "#2e1065",
        "secondary-container": "#ede9fe",
        "outline": "#94a3b8",
        "surface-container-lowest": "#ffffff",
        "inverse-on-surface": "#f8fafc",
        "surface-bright": "#ffffff",
        "surface-container": "#f8fafc",
        "tertiary-fixed": "#fbbf24",
        "primary-fixed": "#06b6d4"
      },
      fontFamily: {
        "headline": ["Space Grotesk", "sans-serif"],
        "body": ["Manrope", "sans-serif"],
        "label": ["Inter", "sans-serif"]
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "gradient-shift": "gradient-shift 15s ease infinite",
        "reveal-up": "reveal-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "ripple": "ripple 0.6s linear"
      },
      keyframes: {
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.1" },
          "50%": { opacity: "0.2" }
        },
        "gradient-shift": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" }
        },
        "reveal-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fadeInUp": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "ripple": {
          "to": {
            transform: "scale(4)",
            opacity: "0"
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
