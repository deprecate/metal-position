var isparta = require('isparta');
var istanbul = require('browserify-istanbul');
var metaljs = require('metaljs');
var renamer = require('browserify-imports-renamer');

module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai', 'browserify'],

    files: [
      'node_modules/closure-templates/soyutils.js',
      'src/**/*.js',
      'test/**/*.js'
    ],

    preprocessors: {
      'src/**/*.js': ['browserify'],
      'test/**/*.js': ['browserify']
    },

    browserify: {
      transform: [renamer({renameFn: metaljs.renameAlias}), istanbul({
        defaultIgnore: false,
        instrumenter: isparta
      })],
      debug: true
    },

    browsers: ['Chrome'],

    reporters: ['coverage', 'progress'],

    coverageReporter: {
      ignore: ['**/bower_components/**', '**/test/**', '**/*.soy.js'],
      reporters: [
        {type: 'text-summary'},
        {type: 'html'},
        { type: 'lcov', subdir: 'lcov' }
      ]
    }
  });
};
