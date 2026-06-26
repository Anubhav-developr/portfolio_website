import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#070807",
          900: "#0e1110",
          800: "#151a18",
          700: "#222926"
        },
        ivory: "#f4f0e8",
        muted: "#a9afa8",
        copper: "#c47b4d",
        citron: "#c9ff64",
        teal: "#4dd4bd"
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        velvet: "0 32px 90px rgba(0, 0, 0, 0.38)",
        rim: "inset 0 1px 0 rgba(255,255,255,0.12), 0 24px 70px rgba(0,0,0,0.42)"
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.14) 1px, transparent 0)",
        "mesh-field":
          "linear-gradient(135deg, rgba(77,212,189,0.16), transparent 30%), linear-gradient(315deg, rgba(196,123,77,0.16), transparent 34%)"
      }
    }
  },
  plugins: []
};

export default config;
