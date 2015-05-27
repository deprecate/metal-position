var isparta = require('isparta');
var metaljs = require('metaljs');

var babelOptions = {
  resolveModuleSource: metaljs.renameAlias,
  sourceMap: 'both'
};

module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai', 'source-map-support', 'commonjs'],

    files: [
      'node_modules/closure-templates/soyutils.js',
      'bower_components/**/*.js',
      'src/**/*.js',
      'test/**/*.js'
    ],

    preprocessors: {
      'src/**/*.js': ['coverage', 'commonjs'],
      'bower_components/**/*.js': ['babel', 'commonjs'],
      'test/**/*.js': ['babel', 'commonjs']
    },

    browsers: ['Chrome'],

    reporters: ['coverage', 'progress'],

    babelPreprocessor: {options: babelOptions},

    coverageReporter: {
      instrumenters: {isparta : isparta},
      instrumenter: {'**/*.js': 'isparta'},
      instrumenterOptions: {isparta: {babel: babelOptions}},
      reporters: [
        {type: 'html'},
        {type: 'lcov', subdir: 'lcov'},
        {type: 'text-summary'}
      ]
    }
  });
};
