module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        tertiary: {
          DEFAULT: "hsl(var(--tertiary))",
          foreground: "hsl(var(--tertiary-foreground))",
        },
        neutral: {
          DEFAULT: "hsl(var(--neutral))",
          foreground: "hsl(var(--neutral-foreground))",
        },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        gray: {
          50: "hsl(210, 20%, 98%)",
          100: "hsl(210, 15%, 95%)",
          200: "hsl(210, 15%, 90%)",
          300: "hsl(210, 10%, 80%)",
          400: "hsl(210, 10%, 65%)",
          500: "hsl(210, 9%, 50%)",
          600: "hsl(210, 10%, 40%)",
          700: "hsl(210, 12%, 25%)",
          800: "hsl(210, 15%, 15%)",
          900: "hsl(210, 20%, 10%)",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        headline: ['"DM Sans"', "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.563rem',
        '3xl': '2.083rem',
        '4xl': '2.777rem',
        '5xl': '3.703rem',
      },
      spacing: {
        '4': '1rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
        '24': '6rem',
        '32': '8rem',
        '48': '12rem',
        '64': '16rem',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        'gradient-1': 'linear-gradient(135deg, hsl(245, 70%, 55%) 0%, hsl(255, 75%, 50%) 100%)',
        'gradient-2': 'linear-gradient(135deg, hsl(245, 25%, 90%) 0%, hsl(255, 25%, 80%) 100%)',
        'button-border-gradient': 'linear-gradient(135deg, hsl(245, 70%, 55%), hsl(255, 75%, 50%))',
      },
    },
  },
  plugins: [],
}
