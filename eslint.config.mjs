import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: {
        // Browser globals
        window: "readonly",
        document: "readonly",
        console: "readonly",
        localStorage: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        requestAnimationFrame: "readonly",
        performance: "readonly",
        IntersectionObserver: "readonly",
        FormData: "readonly",
        fetch: "readonly",
        Headers: "readonly",
        // Custom globals
        ManayApp: "readonly",
        showWaitlist: "readonly",
        manayApp: "writable",
        gtag: "readonly"
      }
    },
    rules: {
      "no-console": "off",
      "no-unused-vars": ["warn", { "vars": "local", "args": "none", "varsIgnorePattern": "^_" }],
      "no-undef": "error",
      "no-redeclare": "error",
      "prefer-const": "warn",
      "no-var": "warn",
      "object-shorthand": "warn",
      "prefer-template": "warn",
      "eqeqeq": ["error", "always"],
      "curly": ["off", "all"],
      "no-eval": "error",
      "no-with": "error",
      "no-bitwise": "error",
      "no-useless-escape": "error"
    }
  }
];
