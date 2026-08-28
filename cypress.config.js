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
        // Firefox-specific args for CI/CD environments
        if (browser.name === 'firefox') {
          launchArgs.args.push('-new-instance')
          launchArgs.args.push('-no-remote')
          launchArgs.args.push('-no-profile')
          // Disable sandbox and other security features for CI/CD
          if (process.env.CI) {
            // Use a temporary profile to avoid permission issues
            launchArgs.args.push('-profile')
            launchArgs.args.push('/tmp/cypress-firefox-profile')
          }
        }
        // Chrome-specific args for CI/CD environments
        if (browser.name === 'chrome' || browser.name === 'chromium') {
          launchArgs.args.push('--no-sandbox')
          launchArgs.args.push('--disable-gpu')
        }
        return launchArgs
      })

      return config
    },
  },
})
