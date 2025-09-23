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
    },
  },
  plugins: [],
};
