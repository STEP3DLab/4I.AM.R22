const isTest = process.env.VITEST === 'true' || process.env.NODE_ENV === 'test';

export default {
  plugins: isTest
    ? {}
    : {
        tailwindcss: {},
        autoprefixer: {},
      },
};
