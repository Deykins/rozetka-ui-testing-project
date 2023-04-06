const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx,feature}",
    excludeSpecPattern: "cypress/e2e/other/*.js",
    chromeWebSecurity: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
    env: {
      ozetka_homepage: "https://rozetka.pl/"
  }

  },
});
