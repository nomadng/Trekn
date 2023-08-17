module.exports = {
  settings: {
    'import/resolver': {
      alias: [['@root', '.']],
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'warn',
    semi: 'off',
    complexity: ['error', 20],
    'max-statements': ['error', 40],
    'max-depth': ['error', 3],
    'max-lines-per-function': ['error', 100],
    'import/prefer-default-export': 0,
    'implicit-arrow-linebreak': 0,
    'no-trailing-spaces': 0,
    'operator-linebreak': 0,
    'max-len': ['error', { code: 120 }],
    'comma-dangle': 0,
    'consistent-return': 0,
    'no-use-before-define': 0,
    'linebreak-style': 0,
    'no-underscore-dangle': 0,
    'no-useless-catch': 0,
    'no-param-reassign': 0,
    'class-methods-use-this': 0,
    'no-unused-vars': 0,
    'no-plusplus': 0,
  },
}
