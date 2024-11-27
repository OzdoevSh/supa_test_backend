module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'max-len': ['error', { code: 120 }],
    'no-useless-constructor': 'off',
    'import/extensions': 'off',
    semi: ['error', 'always'],
    'no-unused-vars': [
      'error',
      {
        args: 'none',
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
