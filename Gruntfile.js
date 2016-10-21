/*
 * grunt-grunticon-pigment
 * https://github.com/springload/grunticon-pigment
 *
 * Copyright (c) 2014 Thomas Winter
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        paths: {
            grunticons: 'examples/',
            css: 'result/',
        },

        watch: {
            files: '<config:lint.files>',
            tasks: 'default'
        },

        grunticon_pigment: {
            foo: {
                files: [{
                    cwd: '<%= paths.grunticons %>',
                    dest: '<%= paths.css %>'
                }],
                options: {

                    // CSS filenames
                    datasvgcss: "icons-data-svg.css",
                    datapngcss: "icons-data-png.css",
                    urlpngcss: "icons-fallback.css",

                    // preview HTML filename
                    previewhtml: "icons-preview.html",

                    // grunticon loader code snippet filename
                    loadersnippet: "grunticon-loader.js",

                    // folder name (within cwd) for svg files
                    svgFolder: "source",
                    svgColorFolder: "source-colourise",

                    // folder name (within dest) for png output
                    pngfolder: "png",

                    // prefix for CSS classnames
                    cssprefix: ".i-",

                    defaultWidth: "32px",
                    defaultHeight: "32px",

                    // colours for svg colourising
                    svgColors: ["#ffffff", "#f24785", "#7dc265"],

                    // css file path prefix - this defaults to "/" and will be placed before the "dest" path when stylesheets are loaded.
                    // This allows root-relative referencing of the CSS. If you don't want a prefix path, set to to ""
                    cssbasepath: "",
                    customselectors: {
                        "twitter": [".alternative-selector"]
                    },

                    // templates for css output and preview page
                    template: "<%= paths.grunticons %>default-css.hbs",
                    previewTemplate:  "<%= paths.grunticons %>preview.hbs"

                }
            }
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                'lib/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        }
    });

    // Load local tasks.
    grunt.loadTasks('tasks');

    grunt.loadNpmTasks( 'grunt-contrib-jshint' );

    // Default task.
    grunt.registerTask('skip-tests', ['jshint', 'grunticon_pigment:foo']);
    grunt.registerTask('travis', ['jshint', 'svgmin', 'grunticon_pigment:foo']);
    grunt.registerTask('default', ['travis']);

};
