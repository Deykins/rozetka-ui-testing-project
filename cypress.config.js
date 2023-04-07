const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
  chromeWebSecurity: false,
  viewportHeight: 1080,
  viewportWidth: 1920,
  env: {
    rozetka_homepage: "https://rozetka.pl/"
  }

  },
});
