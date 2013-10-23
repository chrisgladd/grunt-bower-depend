/*
 * grunt-bower-depend
 * https://github.com/chrisgladd/grunt-bower-depend
 *
 * Copyright (c) 2013 Chris Gladd
 * Licensed under the MIT license.
 */

'use strict';

//Load Dependency
var bower = require('bower');
var path = require('path');
var fs = require('fs');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('bower_depend', 'Handle Bower Dependencies', function() {

    var options = this.options({
      "encoding": grunt.file.defaultEncoding
    });

    grunt.verbose.writeflags(options, 'Options');

    //Load a renderer for output
    var renderer = new (require('bower/lib/renderers/StandardRenderer'))('install',{color:true,cwd:process.cwd()});
    //Asynchonous onFinish function for grunt
    var done = this.async();
    var files = this.files;

    var onInstallLog = function(log){ renderer.log(log); };

    var onInstallPrompt = function(prompt,callback){
      renderer.prompt(prompt).then(function(answer){
        callback(answer);
      });
    };

    var onInstallError = function(err){
      renderer.error(err);
      done(false);
    };

    var onInstallFinished = function(data){
      renderer.end(data);

      grunt.verbose.writeln("COPY: " + options.copy);
      if(options.copy === true){
        var dest, isExpandedPair;
        files.forEach(function(filePair) {
          isExpandedPair = filePair.orig.expand || false;

          filePair.src.forEach(function(src){
            if(detectDestType(filePair.dest) === 'directory'){
              dest = (isExpandedPair) ? filePair.dest : 
                       unixifyPath(path.join(filePair.dest, src));
            }else{
              dest = filePair.dest;
            }

            if(grunt.file.isDir(src)){
              grunt.verbose.writeln('Creating ' + dest.cyan);
              grunt.file.mkdir(dest);
            }else{
              grunt.verbose.writeln('Copying ' + src.cyan + ' -> ' + dest.cyan);
              grunt.file.copy(src, dest, options);
            }
          });
        });
      }

      done();
    };

    bower.commands.install()
    .on('log', onInstallLog)
    .on('prompt', onInstallPrompt)
    .on('error', onInstallError)
    .on('end', onInstallFinished);
  });

  var detectDestType = function(dest) {
    if (grunt.util._.endsWith(dest, '/')) {
      return 'directory';
    } else {
      return 'file';
    }
  };
  
  var unixifyPath = function(filepath) {
    if (process.platform === 'win32') {
      return filepath.replace(/\\/g, '/');
    } else {
      return filepath;
    }
  };
};
