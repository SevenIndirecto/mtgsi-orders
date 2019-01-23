module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/recommended', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: [2, 'always'],
    'comma-dangle': [0, 'always-multiline'],
    'object-shorthand': ['error', 'methods'],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
