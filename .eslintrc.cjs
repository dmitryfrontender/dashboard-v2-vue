/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-airbnb-with-typescript"
  ],
  plugins: [
    "unused-imports"
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    "global-require": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": ["error", {
      "devDependencies": [
        "**/*.test.js",
        "**/*.spec.js",
        "**/*.test.ts",
        "**/*.spec.ts",
        "*.config.*"
      ]
    }],
    "@typescript-eslint/comma-dangle": ["error", "never"],
    "comma-dangle": ["error", "never"],
    "unused-imports/no-unused-imports": "error",
    "import/no-cycle": ["error", { "allowUnsafeDynamicCyclicDependency": true }],
    "vue/max-attributes-per-line": ["error", {
      "singleline": {
        "max": 1
      },
      "multiline": {
        "max": 1
      }
    }],
    "vue/html-closing-bracket-newline": ["error", {
      "singleline": "never",
      "multiline": "always"
    }],
    "vue/max-len": ["error", {
      "code": 120,
      "template": 120,
    }],
  }
};
