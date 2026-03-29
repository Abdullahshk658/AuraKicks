import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./store/**/*.{ts,tsx}",
    "./utils/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1440px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        brand: {
          50: "#fff8f1",
          100: "#ffe8c9",
          200: "#ffd285",
          300: "#ffbc40",
          400: "#f8a100",
          500: "#e88e00",
          600: "#b96a00",
          700: "#864c00",
          800: "#5d3400",
          900: "#311b00"
        },
        slateGlow: {
          900: "#06070b",
          800: "#0f1117",
          700: "#151925"
        }
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top, rgba(255,188,64,0.18), transparent 32%), linear-gradient(180deg, rgba(15,17,23,0.98), rgba(6,7,11,1))",
        "card-sheen":
          "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.01) 45%, rgba(255,188,64,0.08) 100%)"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(248, 161, 0, 0.12)",
        card: "0 20px 40px rgba(0, 0, 0, 0.25)"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      fontFamily: {
        sans: ["var(--font-manrope)"],
        display: ["var(--font-sora)"]
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.45s ease-out"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;

