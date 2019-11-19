module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['prettier', 'prettier/@typescript-eslint'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'warn',
    '@typescript-eslint/explicit-member-accessibility': 'error',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'],
      rules: {
        'comma-dangle': ['warn', 'always-multiline'],
      },
    },
  ],
  settings: {
    react: {
      version: '16.10',
    },
  },
};
