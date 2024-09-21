module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    // sourceType: 'module',
  },
  plugins: ["vue", "prettier"],
  rules: {
    curly: ["error", "all"],
    "no-console": ["error", { allow: ["warn", "error"] }],
    "vue/script-indent": ["error", 2, { baseIndent: 1 }],
    "style/indent": "off",
    "vue/html-self-closing": "off",
    "vue/custom-event-name-casing": ["error", "kebab-case"],
    "vue/no-textarea-mustache": "off",
  },
};
