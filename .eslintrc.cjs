module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['html'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.mjs'],
      },
    },
  },
  rules: {
    'import/no-unresolved': ['error', { ignore: ['^https?://'] }],
    'no-console': ['warn', { allow: ['error', 'warn', 'info'] }],
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      env: {
        browser: false,
        node: true,
      },
      globals: {
        document: 'readonly',
        window: 'readonly',
      },
    },
  ],
};
