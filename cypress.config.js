const { defineConfig } = require("cypress");
// const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const cucumber = require("cypress-cucumber-preprocessor").default;
module.exports = defineConfig({
  env: {
    phoneNumber: "",
    password: "",

    adminURL: "https://daoproptech.admin2.dev.daoproptech.com/dashboard",
    adminUSERNAME: "",
    adminPASSWORD: "",

    investorURL: "https://id.dev.daoproptech.com/public/login",
    investorUSERNAME: "",
    investorPASSWORD: "",

    affiliateURL:
      "https://affiliates.dev.daoproptech.com/login?returnUrl=%2Finvestors%2Fleads",
    affiliateUSERNAME: "",
    affiliatePASSWORD: "",

    allureReuseAfterSpec: true,
    allure: true,
  },

  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    overwrite: true,
    html: true,
    json: true,
    reportDir: "cypress/report",
    reportFilename: "report",
    inline: true,
  },

  e2e: {
    defaultCommandTimeout: 60000,
    requestTimeout: 50000,
    pageLoadTimeout: 100000,
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
      require("cypress-mochawesome-reporter/plugin")(on);
      // allureWriter(on, config);
      // return config;
    },
    specPattern: "**/*.feature",
    experimentalRunAllSpecs: true,
    watchForFileChanges: false,
    retries: 2,
  },
});
