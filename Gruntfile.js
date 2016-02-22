/**
 * Created by itaysh on 7/27/15.
 */

'use strict';

module.exports = function (grunt) {

    var VENDOR_TARGET = 'build/vendor/';
    //var VENDOR_STYLE_TARGET = 'build/css/vendor/';

    grunt.initConfig({
        clean: {
            main: {
                src: [VENDOR_TARGET + '**/*']
            },
            build: {
                src: 'build/**/*'
            },
            dist: {
                src: 'dist/**/*'
            }
        },
        copy: {
            build: {
                files: [
                    {
                        src: 'src/img/*',
                        dest: 'build/img/'
                    },
                    {
                        src: 'src/css/main.css',
                        dest: 'build/css/main.css'
                    },
                    {
                        src: 'node_modules/react/dist/react-with-addons.js',
                        dest: VENDOR_TARGET + 'react.js'
                    },
                    {
                        src: 'node_modules/react-dom/dist/react-dom.js',
                        dest: VENDOR_TARGET + 'react-dom.js'
                    },
                    {
                        src: 'node_modules/requirejs/require.js',
                        dest: VENDOR_TARGET + 'require.js'
                    },
                    {
                        src: 'node_modules/lodash/index.js',
                        dest: VENDOR_TARGET + 'lodash.js'
                    },
                    {
                        src: 'node_modules/requirejs/require.js',
                        dest: VENDOR_TARGET + 'require.js'
                    },
                    {
                        expand: true,
                        cwd: 'src/img/',
                        src: '**/*',
                        dest: 'build/img'
                    },
                    {
                        expand: true,
                        cwd: 'src/js',
                        src: '**/*.js',
                        dest: 'build/js'
                    },
                    {
                        src: 'src/index.html',
                        dest: 'build/index.html'
                    }
                ]
            },
            dist: {
                files: [
                    {
                        src: 'build/vendor/require.js',
                        dest: 'dist/vendor/require.js'
                    },
                    {
                        expand: true,
                        cwd: 'build/img/',
                        src: '**/*',
                        dest: 'dist/img'
                    }
                ]
            }
        },
        eslint: {
            src: [
                'src/js/**/*.*',
                'src/tests/**/*.js',
                '!src/js/plugins/**',
                'Gruntfile.js'
            ]
        },
        babel: {
            options: {
                sourceMap: false,
                blacklist: ['strict']
            },
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/js/',
                        src: ['**/*.jsx'],
                        dest: 'build/js/',
                        ext: '.js'
                    }
                ]
            }
        },
        watch: {
            dev: {
                files: [
                    'src/**/*.css',
                    'src/**/*.jsx',
                    'src/js/**/*.js',
                    '!src/js/components/**/*.js',
                    '!src/js/*.js',
                    'Gruntfile.js'
                ],
                tasks: ['default'],
                options: {
                    debounceDelay: 500
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'build/js',
                    mainConfigFile: 'build/js/main.js',
                    out: 'dist/js/main.min.js',
                    name: 'main',
                    optimization: 'uglify',
                    preserveLicenseComments: false
                }
            }
        },
        processhtml: {
            build: {
                files: {
                    'dist/index.html': ['build/index.html']
                }
            }
        },
        cssmin: {
            main: {
                files: [{
                    expand: true,
                    src: 'main.css',
                    dest: 'dist/css/main',
                    cwd: 'build/css',
                    ext: '.min.css'
                }]
            }
        },
        karma: {
            unit: {
                port: 9999,
                singleRun: true,
                configFile: 'karma.conf.js',
                client: {
                    captureConsole: false
                }
            },
            debug: {
                port: 9999,
                singleRun: false,
                configFile: 'karma.conf.js',
                browser: ['Chrome']
            }
        },
        umd: {
            //all: {
            //    options: {
            //        src: 'node_modules/react-stub-context/dist/index.js',
            //        dest: VENDOR_TARGET + 'stubContext.js',
            //        objectToExport: 'stubContext',
            //        amdModuleId: 'stubContext',
            //        deps: {
            //            'default': ['react', 'require', 'exports', 'module'],
            //            amd: ['react', 'require', 'exports', 'module']
            //        }
            //    }
            //},
            //Firebase: {
            //    options: {
            //        src: 'node_modules/firebase/lib/firebase-web.js',
            //        dest: VENDOR_TARGET + 'firebase.js',
            //        objectToExport: 'Firebase',
            //        amdModuleId: 'Firebase',
            //        deps: {
            //            'default': ['require', 'exports', 'module'],
            //            amd: ['require', 'exports', 'module']
            //        }
            //    }
            //}
        }
    });
    grunt.loadNpmTasks('grunt-scss-lint');
    grunt.registerTask('log', function (text) {
        grunt.log.writeln(text);
    });

    require('jit-grunt')(grunt);

    grunt.registerTask('lint', ['eslint']);
    grunt.registerTask('compile', ['babel']);
    grunt.registerTask('test', ['karma']);
    grunt.registerTask('build', ['clean:build', 'compile', 'copy:build']); //grunt.registerTask('build', ['lint', 'clean:build', 'compile', 'copy:build']);
    grunt.registerTask('default', ['build', 'test']);
};
