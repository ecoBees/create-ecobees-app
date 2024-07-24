module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    "prefer-const": "error",
    eqeqeq: ["error", "always"],
    "prettier/prettier": "error",
    // Express specific rules
    "no-unused-expressions": "error",
    "no-param-reassign": "error",
    "no-return-await": "error",
    "no-throw-literal": "error",
    "no-useless-concat": "error",
  },
  ignorePatterns: ["dist", "node_modules", "*.js"],
};
