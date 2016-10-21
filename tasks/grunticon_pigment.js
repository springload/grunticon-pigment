/*
 * grunt-grunticon-pigment
 * https://github.com/springload/grunticon-pigment
 *
 * Copyright (c) 2014 Thomas Winter
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    var path = require( 'path' );
    var pkg = grunt.file.readJSON( path.join( __dirname, "..", "package.json") );

    // The cool way to load your grunt tasks
    var cwd = process.cwd();
    process.chdir( path.join( __dirname, "..") );
    Object.keys( pkg.dependencies ).forEach( function( dep ){
        if( dep.substring( 0, 6 ) === 'grunt-' ) {
            grunt.loadNpmTasks( dep );
        }
    });
    process.chdir(cwd);

    var description = "A collection of grunt tasks around filamentgroup's grunt-grunticon. Creates colourised versions of svg images.";
    grunt.registerMultiTask("grunticon_pigment", description, function() {

        // get the config
        var config = this.options({
            datasvgcss: "icons-data-svg.css",
            datapngcss: "icons-data-png.css",
            urlpngcss: "icons-fallback.css",
            previewhtml: "preview.html",
            customselectors: {},
            cssprefix: ".i-",
            defaultWidth: "32px",
            defaultHeight: "32px",
            colors: {},
            pngfolder: "png",
            pngpath: "",
            template: "",
            svgColors: [],
            svgFolder: "source",
            svgColorFolder: "source-colourise",
            distDir: "grunticon-dist",
            tmpDir: "grunticon-tmp",
            previewTemplate: path.join( __dirname, "..", "examples", "preview.hbs" )
        });

        config.src = this.files[0].orig.cwd;
        config.dest = this.files[0].orig.dest;

        config.buildFolder = path.join( config.src, config.tmpDir );
        config.distFolder = path.join( config.src, config.distDir );

        // Pass config to our grunt tasks...
        grunt.config.set('clean', {
            icons: {
                src: [ config.dest + "/" + config.pngfolder]
            },
            build: {
                src: [ config.buildFolder, config.distFolder]
            }
        });
        grunt.config.set('copy', {
            icons: {
                files: [
                    {
                        expand: true,
                        src: config.src + '/' + config.svgFolder + '/*',
                        dest: config.buildFolder,
                        flatten: true
                    }
                ]
            },
            colourise_icons: {
                files: [
                    {
                        expand: true,
                        src: config.src + "/" + config.svgColorFolder + "/*",
                        dest: config.buildFolder,
                        flatten: true
                    }
                ]
            },
            grunticons: {
                files: [
                    {
                        expand: true,
                        cwd: config.src,
                        src: [config.distDir + '/*.css', config.distDir + '/*.html', config.distDir + '/png/*'],
                        dest: config.dest,
                        rename: function(dest, matchedSrcPath, options) {
                            // var newSourcePath = matchedSrcPath.replace("/("+config.distDir+"\/")/,"");
                            var re = new RegExp(config.distDir + "\/");
                            var newSourcePath = matchedSrcPath.replace(re,"");
                            return path.join(dest, newSourcePath);
                        },
                        flatten: false
                    }
                ]
            }
        });
        grunt.config.set('svgmin', {
            colourise_icons: {
                files: [{
                    expand: true,
                    cwd: config.buildFolder,
                    src: ['**/*.svg'],
                    dest: config.buildFolder,
                    ext: '.svg'
                }]
            },
            icons: {
                files: [{
                    expand: true,
                    cwd: config.src + '/' + config.svgFolder,
                    src: ['**/*.svg'],
                    dest: config.buildFolder,
                    ext: '.svg'
                }]
            }
        });

        grunt.config.set('grunticon', {
            icons: {
                files: [{
                    expand: true,
                    cwd: config.buildFolder,
                    src: ['*.svg', '*.png'],
                    dest: config.distFolder
                }],
                options: config // pass the whole config
            }
        });

        grunt.config.set('dom_munger', {
            colourise_icons: {
                options: {
                    read: [
                        {selector:'svg',attribute:'height',writeto:'iconHeight'},
                        {selector:'svg',attribute:'width',writeto:'iconWidth'}
                    ],
                    update: {selector:'svg > *:first-child', attribute:'id', value:'a'},
                    callback: function($){

                        var colors = config.svgColors; //grunt.option('colours');
                        var icon_count = colors.length+1; // include black icon without offset
                        var icon_height = String(grunt.config("dom_munger.data.iconHeight")).replace("px","");
                        var icon_width = String(grunt.config("dom_munger.data.iconWidth")).replace("px","");

                        // remove all fill attributes, because they can't be overridden when we duplicate them
                        $('svg *').removeAttr("fill");

                        // set new document dimensions
                        $('svg').attr("height", (icon_height*icon_count)+"px");
                        $('svg').attr("viewBox", "0 0 " + icon_width + " " + (icon_height*icon_count) );

                        // duplicate root node for each colour
                        for (var i = 0; i < colors.length; i++) {
                            var offset = icon_height * (parseFloat(i)+1);
                            var color = colors[i];
                            var xlink = "<use xlink:href=\"#a\" y=\""+offset+"\" fill=\""+color+"\" />";
                            $('svg').append(xlink);
                        }

                    }
                },
                src: config.buildFolder + '/*.svg'
            }
        });

        // fix css descendant selector for grunticon's customselectors
        grunt.config.set('replace', {
            icons: {
                src: config.distFolder + '/*.css',
                overwrite: true,
                replacements: [
                    {
                        from: "&gt;",
                        to: ">"
                    }
                ]
            }
        });

        grunt.task.run('clean:icons');
        grunt.task.run('copy:colourise_icons');
        grunt.task.run('dom_munger:colourise_icons');
        grunt.task.run('svgmin:icons');
        grunt.task.run('copy:icons');
        grunt.task.run('grunticon:icons');
        grunt.task.run('replace:icons');
        grunt.task.run('copy:grunticons');
        grunt.task.run('clean:build');

    });



};
