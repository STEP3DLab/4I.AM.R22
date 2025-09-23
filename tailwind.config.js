export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html}',
    './assets/**/*.{html,js}',
  ],
  theme: {
    extend: {
      maxWidth: {
        '6xl': '64rem',
        '7xl': '72rem',
        '8xl': '88rem',
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        soft: '0 6px 24px rgba(0,0,0,.06)',
        'soft-md': '0 10px 30px rgba(0,0,0,.08)',
      },
      colors: {
        ink: {
          950: 'var(--neutral-950)',
          900: 'var(--neutral-900)',
          800: 'var(--neutral-800)',
          700: 'var(--neutral-700)',
          600: 'var(--neutral-600)',
          500: 'var(--neutral-500)',
          400: 'var(--neutral-400)',
        },
      },
    },
  },
  plugins: [],
};
