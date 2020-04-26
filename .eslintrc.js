// Eslint - linting utility for JavaScript and JSX
module.exports = {
  settings: {
    "import/resolver": {
      node: {
        paths: ["/src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    },
    react: {
      version: "detect"
    }
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    ENV_CONFIG: "readonly",
    MPU_API_CONFIG: "readonly",
    STAGE_API_CONFIG: "readonly",
    WEB_API_CONFIG: "readonly",
    FILLFLOOR_API_CONFIG: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "prettier"],
  rules: {
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".tsx"] }
    ],
    complexity: ["error", 20],
    "react/prop-types": 0,
    "linebreak-style": 0,
    "prettier/prettier": "error",
    quotes: ["error", "double"],
    "no-multiple-empty-lines": "error",
    semi: ["error", "always"],
    "react/display-name": "off"
  }
};
