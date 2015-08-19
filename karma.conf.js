var metal = require('gulp-metal');

var babelOptions = {
  resolveModuleSource: metal.renameAlias,
  sourceMap: 'both'
};

module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai', 'source-map-support', 'commonjs'],

    files: [
      'bower_components/soyutils/soyutils.js',
      'bower_components/metal/src/**/*.js',
      'src/**/*.js',
      'test/**/*.js'
    ],

    preprocessors: {
      'src/**/*.js': ['babel', 'commonjs'],
      'bower_components/metal/**/*.js': ['babel', 'commonjs'],
      'test/**/*.js': ['babel', 'commonjs']
    },

    browsers: ['Chrome'],

    babelPreprocessor: {options: babelOptions}
  });
}
