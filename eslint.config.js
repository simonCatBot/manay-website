module.exports = {
  env: {
    browser: true,
    es2024: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  globals: {
    ManayApp: 'readonly',
    showWaitlist: 'readonly',
    manayApp: 'writable'
  },
  rules: {
    'no-console': 'off', // Allow console in this project
    'no-unused-vars': ['warn', { 'vars': 'local', 'args': 'none' }],
    'no-undef': 'error',
    'no-redeclare': 'error',
    'no-implicit-globals': 'error',
    'prefer-const': 'warn',
    'no-var': 'warn',
    'object-shorthand': 'warn',
    'prefer-template': 'warn',
    'no-alert': 'off',
    'eqeqeq': ['error', 'always'],
    'curly': ['error', 'all'],
    'no-eval': 'error',
    'no-with': 'error',
    'no-plusplus': 'off',
    'no-bitwise': 'error',
    'strict': ['error', 'function']
  }
};
