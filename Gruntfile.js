/*global module:false*/
module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    pkg: grunt.file.readJSON('bower.json'),
    meta: {
      banner : '/*!\n' +
      ' * <%= pkg.name %> v<%= pkg.version %> - <%= pkg.description %>\n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.authors.join(", ") %> - <%= pkg.homepage %>\n' +
      ' * License: <%= pkg.license %>\n' +
      ' */\n\n',
      output : '<%= pkg.name %>.js',
      outputMin : '<%= pkg.name %>.min.js'
    },

    rig: {
      options : {
        banner : '<%= meta.banner %>'
      },
      dist: {
        files: {
          'newrelic-timing.js' : ['src/newrelic-timing.js'],
          'newrelic-timing-angular.js' : ['src/newrelic-timing-angular.js']
        }
      }
    },

    uglify: {
      options : {
        banner : '<%= meta.banner %>',
        report: 'gzip'
      },
      dist: {
        files : {
          'newrelic-timing.min.js': 'newrelic-timing.js',
          'newrelic-timing-angular.min.js': 'newrelic-timing-angular.js'
        }
      }
    },

    jshint: {
      prebuild : {
        options : {
          jshintrc : '.jshintrc'
        },
        files : {
          src : [
            'Gruntfile.js',
            'src/*.js'
          ]
        }
      },
      tests : {
        options : grunt.util._.merge(
          grunt.file.readJSON('.jshintrc'),
          grunt.file.readJSON('spec/.jshintrc')),
        files : {
          src : ['spec/*.js']
        }
      },
      postbuild : {
        options : {
          jshintrc : '.jshintrc'
        },
        files :{
          src : ['<%= meta.output %>']
        }
      }
    },

    jasmine : {
      options : {
        specs : 'spec/*.js'
      },
      src : [
        'src/newrelic-timing.js',
        'src/newrelic-timing-angular.js'
      ]
    },

    watch: {
      options : {
        atBegin : true
      },
      files: [
        'src/*.js',
        'spec/*.js',
        'Gruntfile.js',
        'package.json'
      ],
      tasks: 'default'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-rigger');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['jshint:prebuild', 'jshint:tests', 'jasmine']);
  grunt.registerTask('default', ['test', 'rig', 'jshint:postbuild', 'uglify']);
};
