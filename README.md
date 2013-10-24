# grunt-bower-depend

> Handle Bower dependencies via Grunt. This task allows you to run `bower install` from Grunt and then copy specific library files wherever they're needed in your application with a single task.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-bower-depend --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-bower-depend');
```

## The "bower_depend" task

### Overview
In your project's Gruntfile, add a section named `bower_depend` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  bower_depend: {
    options: {
      // Task-specific options go here.
      copy: true
    },
    your_target: {
      // Target-specific file lists and/or options go here.
      files: [{
        'expand': true,
        'cwd': 'bower_components/jquery/',
        'src': ['jquery.*js'],
        'dest': 'tmp/lib/'
      }]
    },
  },
})
```

### Options

#### options.copy
Type: `Boolean`
Default value: `false`

A boolean value for whether to copy dependencies installed via bower

### Usage Examples

#### Default Options
In this example, the default option simply executes the `bower install` command.

```js
grunt.initConfig({
  bower_depend: {
    options: {}
  },
})
```

#### Custom Options
In this example, the default `bower install` command is executed, then since the `copy` option is `true` the specified files are copied from the new bower_components into the lib folder.

```js
grunt.initConfig({
  bower_depend: {
    options: {
      copy: true
    },
    files: [{
      'expand': true,
      'cwd': 'bower_components/jquery/',
      'src': ['jquery.*js'],
      'dest': 'tmp/lib/'
    }]
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
 * 2013-10-24   v0.1.0   Initial Release with install and copy functionality
