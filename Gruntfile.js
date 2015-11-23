var dotenv, fs;

dotenv = require('dotenv');
fs = require('fs');

module.exports = function (grunt) {
  'use strict';
  if (fs.existsSync('.env')) {
    dotenv.load();
  }

  // Project configuration.
  grunt.initConfig({

    // Read the package.json (optional)
    pkg: grunt.file.readJSON('package.json'),

    // Metadata.
    meta: {
      basePath: '',
      srcPathCss: 'src/scss/',
      srcPathJs: 'src/app/',
      deployPath: 'public/build/assets/',
      copyHtml: 'public/build/html/',
      buildApp: 'public/build/app/'
    },

    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> ',

    // Task configuration.
    includeSource: {
      options: {
        basePath: 'public/build',
        baseUrl: '/'
      },
      myTarget: {
        files: {
          'public/index.html': 'src/index.html'
        }
      }
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: [
          '<%= meta.srcPathJs %>app.mdl.js',
          '<%= meta.srcPathJs %>init.js',
          '<%= meta.srcPathJs %>app.ctl.js',
          '<%= meta.srcPathJs %>routes/**/*.mdl.js',
          '<%= meta.srcPathJs %>routes/**/*.ctl.js',
          '<%= meta.srcPathJs %>routes/**/*.drv.js',
          '<%= meta.srcPathJs %>directives/**/*.mdl.js',
          '<%= meta.srcPathJs %>directives/**/*.drv.js',
          '<%= meta.srcPathJs %>services/**/*.mdl.js',
          '<%= meta.srcPathJs %>services/**/*.svc.js',
          '<%= meta.srcPathJs %>services/**/*.ctl.js',
          '<%= meta.srcPathJs %>filters/**/*.mdl.js',
          '<%= meta.srcPathJs %>filters/**/*.flt.js',
          '<%= meta.srcPathJs %>components/**/*.mdl.js',
          '<%= meta.srcPathJs %>components/**/*.drv.js'
        ],
        dest: '<%= meta.buildApp %><%= pkg.name %>.js'
      }
    },

    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= meta.buildApp %>',
          src: '*.js',
          dest: '<%= meta.buildApp %>'
        }]
      }
    },

    ngconstant: {
      build: {
        options: {
          dest: 'src/app/init.js',
          name: 'finciero.config',
          wrap: '(function () {\n\'use strict\'\n\n {%= __ngModule %} })();'
        },
        constants: {
          CATEGORY_API_URL: 'http://finciero-business.herokuapp.com/api'
        }
      },
      test: {
        options: {
          dest: 'src/app/init.js',
          name: 'finciero.config',
          wrap: '(function () {\n\'use strict\'\n\n {%= __ngModule %} })();'
        },
        constants: {
          CATEGORY_API_URL: 'http://localhost:' + process.env.PORT + '/api'
        }
      }
    },

    sass: {
      dist: {
        options: {
          includePaths: [
            'src/../public/bower_components/bourbon/dist/',
            'src/styles/'
          ],
          bundleExec: true
        },
        files: [{
          expand: true,
          cwd: 'src/',
          src: [
            'styles/app.scss',
            'scss/style.scss',
            'scss/reset.scss',
            'styles/app.scss',
            'app/{,**/}*.scss'
          ],
          dest: 'public/.tmp/',
          ext: '.css'
        }]
      }
    },

    cssmin: {
      build: {
        files: [{
          expand: true,
          cwd: 'public/.tmp/',
          src: [
            '*.css'
          ],
          dest: '<%= meta.deployPath %>css/',
          ext: '.min.css'
        }]
      }
    },

    uglify: {
      build: {
        files: {
          '<%= meta.buildApp %><%= pkg.name %>.min.js': [
            '<%= meta.buildApp %><%= pkg.name %>.js'
          ]
        }
      }
    },

    copy: {
      dist: {
        files: [
          {
            dest: '<%= meta.buildApp %>',
            src: [
              '**/routes/**/*.html',
              '**/directives/**/*.html',
              '**/components/**/*.html',
            ],
            cwd: '<%= meta.srcPathJs %>',
            expand: true
          },
          {
            dest: 'public/build/assets/img/',
            src: [
              '**/*.{jpg,png,gif}'
            ],
            cwd: 'src/img',
            expand: true
          }, {
            dest: 'public/',
            src: [
              'index.html'
            ],
            cwd: 'src/',
            flatten: true,
            expand: true
          }
        ]
      }
    },

    wiredep: {
      options: {},
      app: {
        src: [
          'public/index.html'   // .html support...
        ],
        ignorePath:  /\.\.\//
      }
    },

    clean: {
      dist: {
        files: [{
          src: [
            '.tmp',
            'public/.tmp'
          ]
        }]
      }
    },

    watch: {
      scripts: {
        files: [
          '<%= meta.srcPathCss %>**/*.scss',
          '<%= meta.srcPathJs %>**/*.scss',
          '<%= meta.srcPathJs %>**/*.js',
          'src/index.html'
        ],
        tasks: [
          'clean',
          'sass',
          // 'cssmin',
          'ngconstant:test',
          'concat',
          'ngAnnotate',
          'uglify',
          'copy',
          'includeSource:myTarget',
          'wiredep',
        ],
        options: {
          livereload: {
            port: 8001
          }
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-include-source');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-ng-constant');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('build', [
    'sass',
    'cssmin',
    'ngconstant:build',
    'concat',
    'ngAnnotate',
    'uglify',
    'copy',
    'wiredep',
    'includeSource:myTarget'
  ]);

  grunt.registerTask('dev', [
    'clean',
    'sass',
    // 'cssmin',
    'ngconstant:test',
    'concat',
    'ngAnnotate',
    'uglify',
    'copy',
    'includeSource:myTarget',
    'wiredep',
    'watch'
  ]);

  grunt.registerTask('default', 'dev');
  grunt.registerTask('heroku:production', 'build');
};
