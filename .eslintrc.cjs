module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'semi': 'error',
    'quotes': [
      'error',
      'single'
    ],
    'no-trailing-spaces': 'error',
    'no-var': 'error',
    'newline-per-chained-call': 'error',
    'newline-after-var': [
      'error',
      'always'
    ],
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'padded-blocks': [
      'error',
      'always'
    ],
    'indent': [
      'error',
      2,
      {
        'ImportDeclaration': 'first'
      }
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        'max': 1
      }
    ],
    'no-magic-numbers': 'off'
  },
};
