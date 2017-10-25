module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai-dom', 'chai', 'riot'],
    plugins: [
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-chrome-launcher',
      'karma-babel-preprocessor',
      'karma-chai',
      'karma-chai-dom',
      'karma-riot'
    ],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'test/spec/*.js',
      'riot/*.tag',
      {pattern: 'img/*', watched: false, included: false, served: true}
    ],
    preprocessors: {
      'riot/*.tag': ['riot', 'babel']
    },
    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },
    proxies: {
      '/img/': '/base/img/'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    reporters: ['mocha'],
    singleRun: true,
    concurrency: Infinity
  })
}
