'use strict';
module.exports = function(grunt, configs) {
	grunt.config.set('uglify', {
        options : {
            mangle: false, // changes function and variable names
            compress: true,
            preserveComments: false,
            sourceMap: true,
        },
        my_target: {
            files : {
                'dist/ng-kit.rest-resource.min.js': [
                    'src/rest-resource.js',
                    'src/rest-resource.*.js',
                ],
            }
        },
	});
    grunt.loadNpmTasks('grunt-contrib-uglify');
};
