grunt-grunticon-pigment [![npm](https://img.shields.io/npm/v/grunt-grunticon-pigment.svg?style=flat-square)](https://www.npmjs.com/package/grunt-grunticon-pigment) [![Build Status](https://img.shields.io/travis/springload/grunt-grunticon-pigment.svg?style=flat-square)](https://travis-ci.org/springload/grunt-grunticon-pigment)
===========================

> A collection of grunt tasks around filamentgroup's grunticon, that also creates colourised versions of svg images

With grunticon-pigment we combined several grunt tasks into one handy plugin. It's basically copies [grunticon](https://github.com/filamentgroup/grunticon)'s funciontality, applies some new default values and adds the ability to create colour variations without significantly increasing filesize.

### A mystical CSS icon solution

grunticon is a [Grunt.js](https://github.com/cowboy/grunt/) task that makes it easy to manage icons and background images for all devices, preferring HD (retina) SVG icons but also provides fallback support for standard definition browsers, and old browsers alike. From a CSS perspective, it's easy to use, as it generates a class referencing each icon, and doesn't use CSS sprites.

grunticon takes a [folder of SVG/PNG files](https://github.com/filamentgroup/grunticon/tree/master/example/source) (typically, icons that you've drawn in an application like Adobe Illustrator), and [outputs them](https://github.com/filamentgroup/grunticon/tree/master/example/output) to CSS in 3 formats: [svg data urls](https://github.com/filamentgroup/grunticon/blob/master/example/output/icons.data.svg.css), [png data urls](https://github.com/filamentgroup/grunticon/blob/master/example/output/icons.data.png.css), and [a third fallback CSS file with references to regular png images](https://github.com/filamentgroup/grunticon/blob/master/example/output/icons.fallback.css), which are also automatically [generated and placed in a folder](https://github.com/filamentgroup/grunticon/tree/master/example/output/png).

grunticon also generates [a small bit of JavaScript and CSS](https://github.com/filamentgroup/grunticon/blob/master/tasks/grunticon/static/grunticon.loader.js) to drop into your site, which asynchronously loads the appropriate icon CSS depending on a browser's capabilities, and a preview HTML file with that loader script in place.


## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-grunticon-pigment --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-grunticon-pigment');
```

## The "grunticon_pigment" task

### Overview
In your project's Gruntfile, add a section named `grunticon_pigment` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  grunticon_pigment: {
    foo: {
        files: [{
            cwd: 'example/source',
            dest: 'example/output'
        }],
        options: {
            ...
        }
    },
  },
});
```


### Options

#### options.svgFolder
Type: `String`
Default value: `"source"`

The name of the folder containing the source svg files.

#### options.svgColorFolder
Type: `String`
Default value: `"source-colourise"`

The name of the folder containing the source svg files that get colourised.

*Please note* All elements of the svg files must be within one grouped element at root level.
Only shapes will be colourised, so make sure, to convert strokes into outlines (Object > Path > Outline Stroke in Illustrator) before saving your svg.
Please also have a look at [Creating SVG Artwork](#creating-svg-artwork) in the Tips section.

#### options.svgColors
Type: `Array`
Default value: `"[]"`

Array of colour variations in hex format.

#### options.datasvgcss
Type: `String`
Default value: `"icons-data-svg.css"`

The name of the generated CSS file containing SVG data uris.

#### options.datapngcss
Type: `String`
Default value: `"icons-data-png.css"`

The name of the generated CSS file containing PNG data uris.

#### options.urlpngcss
Type: `String`
Default value: `"icons-fallback.css"`

The name of the generated CSS file containing external png url references.

#### options.previewhtml
Type: `String`
Default value: `"icons-preview.html"`

The name of the generated HTML preview file.

#### options.loadersnippet
Type: `String`
Default value: `"grunticon-loader.txt"`

 The name of the generated text file containing the grunticon loading snippet.

#### options.pngfolder
Type: `String`
Default value: `"png"`

 The name of the generated folder containing the generated PNG images.

#### options.pngpath
Type: `String`
Default value: value of `options.pngfolder`

Allows you to specify a custom URL to serve fallback PNGs at.

Example:

```
{
    pngpath: "/assets/icons/png"
}
```

Will generate PNG fallbacks like:

```
.i-bar {
	background-image: url('/assets/icons/png/bar.png');
	background-repeat: no-repeat;
}
```

#### options.cssprefix
Type: `String`
Default value: `".i-"`

a string to prefix all css classes with.

#### options.customselectors
Type: `Object`

Allows you to specify custom selectors (in addition to the generated `cssprefix + filename - extension` class) for individual files.

Example:

```
{
	"foo": [".i-bar", ".baz"]
}
```

will produce:

```
.i-bar,
.bar,
.i-foo {
	//css
}
```

You can also use an asterisk in your custom selector!

Examples:

```
customselectors: {
  "*": [".i-$1:before", ".i-$1-what", ".hey-$1"]
},
prefix: ".i-"
```

Should give the file bear.svg the css
```
.i-bear:before,
.i-bear-what,
.hey-bear,
.i-bear {
 // CSS THINGS
}
```

And if there are files bear.svg and cat.svg, the css should be like:

```
.i-bear:before,
.i-bear-what,
.hey-bear,
.i-bear {
 // CSS THINGS
}

.i-cat:before,
.i-cat-what,
.hey-cat,
.i-cat {
 // CSS THINGS
}
```

This should give you more flexibility with your selectors.

#### options.defaultWidth
Type: `String`
Default value: `"32px"`

a string that MUST be defined in px that will be the size of the PNG if there is no width given in the SVG element.

#### options.defaultHeight
Type: `String`
Default value: `"32px"`

similar to defaultWidth, but for height

#### options.previewTemplate
Type: `String`
Default value: Goes to the example/preview.hbs file

Takes a path to the template that will be used for the preview.html. Example of .hbs file contents:

```
<!doctype HTML>
<html>
  <head>
    <title>Icons Preview!</title>
    <style>
      body {
        background-image: linear-gradient(#eee 25%, transparent 25%, transparent), linear-gradient(#eee 25%, transparent 25%, transparent), linear-gradient(transparent 75%, #eee 75%), linear-gradient(transparent 75%, #eee 75%);
        width: 100%;
        background-size: 10px 10px;
      }
    </style>
    <script>
      {{{loaderText}}}
      grunticon(["icons-data-svg.css", "icons-data-png.css", "icons-fallback.css"]);
    </script>
  <noscript><link href="icons-fallback.css" rel="stylesheet"></noscript>
  </head>
  <body>
    {{#each icons}}
      {{#with this}}
      <pre><code>{{prefix}}{{name}}:</code></pre><div class="{{prefixClass}}{{name}}" style="width: {{width}}px; height: {{height}}px;" ></div><hr/>
      {{/with}}
    {{/each}}
</body>
</html>
```

#### options.tmpDir
Type: `String`
Default value: `"grunticon-tmp"`

Let's you specify a tmp-folder. Useful when having multiple grunticon tasks and using [grunt-concurrent](https://github.com/sindresorhus/grunt-concurrent "grunt-concurrent on github").

#### options.template
Type: `String`
Default value: `""`

Location of a handlebars template that will allow you to structure your
CSS file the way that you choose. As more data becomes available via
[directory-encoder](https://github.com/filamentgroup/directory-encoder),
more options will be available for you to tap into during templating.


Example of .hbs file contents:

```
{{#each customselectors}}{{this}},{{/each}}
{{prefix}}{{name}} {
	background-image: url('{{datauri}}');
	background-repeat: no-repeat;
}
```


#### options.colors

Allows you to predefine colors as variables that can be used in filename color configuration.


#### Automating color variations

Grunticon allows you to output any icon in different colors simply by changing its filename to the following syntax: `myfilename.colors-red-aa0000-gray.svg`. In this example, any color names or hexidecimal values that follow `colors-` and are separated by a dash will be used to generate additional icons of that color. By default, each icon will be assigned a numbered class name for CSS use. You can improve the class naming conventions by defining color variables in your Gruntfile's `colors` option shown above. When defined, you can reference a color variable in place of a color in your file names, and the generated classes will use that variable name as well. See the `Gruntfile.js`'s `colors` option and the sample bear svg for an example of color automation.

*A note on filesize impact:* Adding color variations of an icon involves creating duplicates of that icon's SVG source in the CSS, so unfortunately, each color variation will cause an increase in filesize. However, transferring CSS with gzip compression can negate much of this filesize increase, and we highly recommend always transferring with gzip. In testing, we found that creating a color variation of every icon in our example set increased overall size by 25%, rather than 100% as a raw text duplicate would increase. That said, size increases for non-SVG-supporting browsers will be more dramatic, as the fallback PNGs will not have the heavy transfer compression as SVG enjoys. We advise using this feature on a case-by-case basis to ensure overhead is kept to a minimum.
To avoid blowing up filesize, please use the svgColors option

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  grunticon_pigment: {
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
        svgColors: ["#ffffff", "#A6CC85"],

        // css file path prefix - this defaults to "/" and will be placed before the "dest" path when stylesheets are loaded.
        // This allows root-relative referencing of the CSS. If you don't want a prefix path, set to to ""
        cssbasepath: "",
        customselectors: {
            "twitter": [".alternative-selector"]
        },

        // templates for css output and preview page
        template: "template/default-css.hbs",
        previewTemplate:  "template/preview-custom.hbs"
    },
    files: [{
        cwd: 'example/source',
        dest: 'example/output'
    }],
  },
});
```





## Browser testing results for icon output

The generated asynchronous CSS loader script delivers an appropriate icon stylesheet depending on a device/browser's capabilities. Grunticon is supported in cases where icon fonts fail.

Browsers that render the SVG data url stylesheet:
- IE9
- Chrome 14+ (maybe older too?)
- Safari 4+ (maybe older too?)
- Firefox 3.6+ (maybe older too?)
- Opera 15+
- iOS 3+ Safari and Chrome
- Android 4.0 Chrome (caveat: SVG icons do not scale in vector, but do appear to draw in high-resolution)
- Android 4.0 ICS Browser
- BlackBerry Playbook

Browsers that receive the PNG data url stylesheet:
- IE8
- All versions of Opera, Opera Mini, and Opera Mobile before Chrome integration (v 15)
- Android 2.3 Browser
- Android 2.2 Browser
- Android 2.1 Browser
- Android 1.6 Browser
- Android 1.5 Browser

Browsers that receive the fallback png request:
- IE7
- IE6
- Non-JavaScript environments

View the full support spreadsheet [here](https://docs.google.com/spreadsheet/ccc?key=0Ag5_yGvxpINRdHFYeUJPNnZMWUZKR2ItMEpRTXZPdUE#gid=0). Feel free to edit it if you find anything new.

The test page can be found [here](http://filamentgroup.com/examples/grunticon-icon-test/).

## Tips

### Serving compressed CSS
One of the great benefits to data uris is the ability to compress the images heavily via gzip compression. Be sure to enable gzip of CSS on your server, as it'll cut your icon transfer size greatly.

### Creating SVG Artwork

The workflow we've been using so far involves creating a new Illustrator file with the artboard set to the desired size of the icon you want set in the CSS.

Export the artwork by choosing File > Save as...  In the dialog, choose "SVG" as the format and enter a name for the file (this wil be used as your class name later, so keep it free of any disallowed CSS class characters like `.`, `{`, `(`, `)`, etc.

In the Save SVG dialog that opens up, there are lots of options. SVG has a ton of formats, so here are a few tips we've learned.

- SVG Profile: Seems like SVG 1.1 Tiny is really well supported across even older mobile platforms so if you have simple artwork that doesn't use gradients or opacity this will yield a smaller and more compatible graphic. If you want to use all the fancy effects, save artwork as SVG 1.1.
- Type: Convert to outline before export.
- Subsetting: None, I usually convert all text to outlines ahead of time
- Images: Embed
- Don't check "Preserve Illustrator editing" to reduce file size
- Don't check "Responsive" unless you want the fallback pngs to get defaultWidth and defaultHeight.

## Warnings
* If your files have `#`, `.`, `>`, or any other css selecting character in their names, they will likely be improperly processed.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* Version 0.2.5: Upgraded npm dependencies and removed postinstall script
* Version 0.2.0: First stable release
