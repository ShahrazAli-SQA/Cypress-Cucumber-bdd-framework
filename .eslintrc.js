module.exports = {
  extends: [
    "standard",
    "plugin:cypress/recommended",
    "plugin:chai-friendly/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "cypress/no-assigning-return-values": "error",
    "cypress/assertion-before-screenshot": "warn",
    "cypress/no-async-tests": "error",
    "cypress/no-pause": "error",
  },
  globals: {
    cy: true,
    Cypress: true,
    expect: true,
    assert: true,
  },
  plugins: ["cypress", "chai-friendly", "prettier", "import"],
  env: {
    "cypress/globals": true,
  },
  root: true,
};
