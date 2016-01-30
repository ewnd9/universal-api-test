var file = process.argv[4];

var preprocessors = {};
preprocessors[file] = [
  'webpack',
  'env'
];

var conf = {
  browsers: [
    'PhantomJS'
  ],
  files: [
    process.argv[5],
    {
      pattern: file,
      watched: false
    }
  ],
  frameworks: [
    'mocha'
  ],
  preprocessors: preprocessors,
  reporters: [
    'dots'
  ],
  plugins: [
    'karma-mocha',
    'karma-env-preprocessor',
    'karma-phantomjs-launcher',
    'karma-sauce-launcher',
    'karma-webpack',
    'karma-chrome-launcher'
  ],
  envPreprocessor: process.argv[6].split(','),
  singleRun: true,
  webpack: {
    module: {
      loaders: [
        { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' }
      ],
    },
    watch: true
  },
  webpackServer: {
    noInfo: true,
  }
};

if (process.env.SAUCE_USERNAME) {
  var customLaunchers = {
    'SL_Chrome': {
      base: 'SauceLabs',
      browserName: 'chrome'
    }
  };

  conf.browsers = Object.keys(customLaunchers);
  conf.customLaunchers = customLaunchers;
  conf.reporters.push('saucelabs');
  conf.plugins.push('karma-sauce-launcher');
  conf.sauceLabs = {
    testName: 'Karma and Sauce Labs demo'
  };
}

module.exports = function(config) {
  config.set(conf);
};
