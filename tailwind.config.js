/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(234, 100%, 50%)',
        accent: 'hsl(40, 90%, 50%)',
        bg: 'hsl(230, 60%, 95%)',
        surface: 'hsl(0, 0%, 100%)',
        danger: 'hsl(10, 80%, 50%)',
        success: 'hsl(160, 70%, 50%)',
        muted: {
          foreground: 'hsl(215, 20%, 65%)'
        }
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px'
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px'
      },
      boxShadow: {
        'card': '0 4px 12px hsla(0, 0%, 0%, 0.08)',
        'hover': '0 6px 16px hsla(0, 0%, 0%, 0.12)'
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
