module.exports = {
    env: {
      browser: false, // Change from true to false since it's a Node.js project
      node: true, 
      es2021: true,
    },
    extends: [
      "eslint:recommended",
      "airbnb-base",  // Uses Airbnb's base JS rules
      "prettier" // Ensures compatibility with Prettier
    ],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: "module",
    },
    rules: {
      "eqeqeq": "error", // Enforce strict equality (===)
      "no-console": "warn", // Show warnings for console.log
    },
  };
  