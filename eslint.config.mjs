import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        ManayApp: "readonly",
        showWaitlist: "readonly",
        manayApp: "writable"
      }
    },
    rules: {
      "no-console": "off",
      "no-unused-vars": ["warn", { "vars": "local", "args": "none" }],
      "no-undef": "error",
      "no-redeclare": "error",
      "prefer-const": "warn",
      "no-var": "warn",
      "object-shorthand": "warn",
      "prefer-template": "warn",
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],
      "no-eval": "error",
      "no-with": "error",
      "no-bitwise": "error",
      "strict": ["error", "function"]
    }
  }
];
