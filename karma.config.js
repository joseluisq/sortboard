const realBrowser = String(process.env.BROWSER).match(/^(1|true)$/gi)
const travisLaunchers = {
  chrome_travis: {
    base: 'Chrome',
    flags: ['--no-sandbox']
  }
}

const localBrowsers = realBrowser ? Object.keys(travisLaunchers) : ['Chrome']

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'karma-typescript'],
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-spec-reporter',
      'karma-typescript'
    ],
    karmaTypescriptConfig: {
      tsconfig: "./tsconfig.json",
    },
    client: {
      // leave Jasmine Spec Runner output visible in browser
      clearContext: false
    },
    files: [
      { pattern: 'src/**/*.ts' },
      { pattern: 'test/**/*.ts' }
    ],
    preprocessors: {
      'src/**/*.ts': ['karma-typescript'],
      'test/**/*.ts': ['karma-typescript']
    },
    karmaTypescriptConfig: {
      tsconfig: "./tsconfig.json"
    },
    reporters: ['spec', 'karma-typescript'],
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: localBrowsers,
    singleRun: true
  })
}
