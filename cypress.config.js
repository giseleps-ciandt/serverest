const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    env: {
      apiUrl: 'https://serverest.dev',
      grepTags: process.env.GREP_TAGS || '',
    },
    specPattern: 'cypress/e2e/**/*.cy.js',
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'ServeRest - Test Report',
      embeddedScreenshots: true,
      inlineAssets: true,
    },
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)

      on('before:browser:launch', (browser, launchArgs) => {
        const grepTags = config.env.grepTags
        if (grepTags) {
          launchArgs.args.push(`--grep=${grepTags}`)
        }
        return launchArgs
      })

      return config
    },
  },
})
