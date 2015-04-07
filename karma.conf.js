var isparta = require('isparta');
var istanbul = require('browserify-istanbul');

module.exports = function (config) {
	config.set({
		frameworks: ['mocha', 'chai', 'browserify'],

		files: [
			'node_modules/metaljs/node_modules/closure-templates/soyutils.js',
			'src/**/*.js',
			'test/**/*.js'
		],

		preprocessors: {
			'src/**/*.js': ['browserify'],
			'test/**/*.js': ['browserify']
		},

		browserify: {
			transform: [istanbul({
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
