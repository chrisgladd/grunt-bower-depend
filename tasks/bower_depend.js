/*
 * grunt-bower-depend
 * https://github.com/chrisgladd/grunt-bower-depend
 *
 * Copyright (c) 2013 Chris Gladd
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('bower_depend', 'Handle Bower Dependencies', function() {

    //Load bower
    var bower = require('bower');
    //Load a renderer for output
    var renderer = new (require('bower/lib/renderers/StandardRenderer'))('install',{color:true,cwd:process.cwd()});
    //Asynchonous onFinish function for grunt
    var done = this.async();

    bower.commands.install()
    .on('log',function(log){
      renderer.log(log);
    })
    .on('prompt',function(prompt,callback){
      renderer.prompt(prompt).then(function(answer){
        callback(answer);
      });
    })
    .on('error',function(err){
      renderer.error(err);
      done(false);
    })
    .on('end',function(data){
      renderer.end(data);
      done();
    });

    /*// Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });*/
  });
};
