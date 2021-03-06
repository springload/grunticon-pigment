'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        paths: {
            grunticons: 'examples/',
            css: 'result/',
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

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        }
    });

    // Load local tasks.
    grunt.loadTasks('tasks');

    // Default task.
    grunt.registerTask('default', ['grunticon_pigment:foo']);
};
