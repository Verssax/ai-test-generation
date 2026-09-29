const { defineConfig } = require('cypress');

module.exports = defineConfig({
    projectId: process.env.CYPRESS_RECORD_KEY,
    e2e: {
      baseUrl: 'https://modivo.ua',
      defaultCommandTimeout: 10000,
      viewportWidth: 1440,
      viewportHeight: 900,
    },
  });