module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: [
    'vue'
  ],
  rules: {
    // 0-'off' 1-'warn' 2-'error'
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    semi: [2, 'always'],
    'no-extra-semi': 2,
    'space-before-function-paren': [0, 'always'],
    'no-else-return': 2,
    'no-empty-function': 2,
    'multiline-comment-style': 2,
    'no-inline-comments': 2,
    'no-lonely-if': 2,
    'no-multi-assign': 2,
    'no-trailing-spaces': [2, {skipBlankLines: true}],
    'standard/object-curly-even-spacing': [2, 'never'],
    'standard/array-bracket-even-spacing': [2, 'never'],
    'object-curly-spacing': [2, 'never']
  }
};
