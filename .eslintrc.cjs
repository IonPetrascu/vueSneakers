/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', '@vue/eslint-config-standard-with-typescript'],
  overrides: [
    {
      files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}', 'cypress/support/**/*.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended']
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'prefer-const': 'warn',
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }]
  }
}
