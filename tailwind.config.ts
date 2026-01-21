import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      sans: [
        "Inter",
        "system-ui",
        "Segoe UI",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
    },
    extend: {
      fontFamily: {
        neue: [
          'Neue Haas Grotesk Display',
          "system-ui",
          "Segoe UI",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        bg: {
          DEFAULT: "#F6F8FC",
          subtle: "#F0F3F9",
          background: '#F5F6FA',
        },
        main_blue:{
          100: '#003EFF',
        },
        surface: "#FFFFFF",
        
        primary: {
          DEFAULT: "#1E5EFF",
          600: "#1B53E6",
          700: "#1747C7",
        },
        text: {
          DEFAULT: "#0F172A",
          body: "#697598",
          muted: "#334155",
          soft: "#64748B",
         soft_2 : "#4F4F4F",
         dark_gray: "#373B47",
         gray_3: "#666F77"
        },
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        gray: {
          25: "#FCFCFD",
          50: "#F9FAFB",
          100: "#F2F4F7",
          200: "#E4E7EC",
          300: "#D0D5DD",
          400: "#98A2B3",
          // #F5F6FA
          500: "#667085",
          600: "#475467",
          700: "#344054",
          background: '#F5F6FA'
        },

      },
      borderRadius: {
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 8px 24px rgba(20, 25, 38, 0.08)",
        hover: "0 12px 28px rgba(20, 25, 38, 0.12)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.4)",
      },
    },
  }, 
  plugins: [
    function ({ addUtilities }: { addUtilities: (utilities: Record<string, any>) => void }) {
      addUtilities({
        ".focus-ring": {
          outline: "2px solid transparent",
          outlineOffset: "2px",
          boxShadow: "0 0 0 3px rgba(30,94,255,0.35)",
        },
      });
    },
  ],
} satisfies Config;
