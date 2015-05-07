module.exports = function (grunt) {
    'use strict';
    // Project configuration
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        srcPath: './src',
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= props.license %> */\n',
        // Task configuration
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: ['./','./src']
                }
            }
        },
        testem: {
            environment1: {
                // List of files to attach
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'src/**/*.js',
                    'src/**/*.spec.js'
                ],
                // Options that will be passed to Testem
                options: {
                    parallel: 8,
                    launch_in_ci: ['PhantomJS', 'Firefox', 'Safari'],
                    launch_in_dev: ['PhantomJS', 'Firefox', 'Safari']
                }
            }
        },
        shell: {
            'build-jsx': {
                command: [
                    'jsx -x jsx <%= srcPath %>/jsx/ <%= srcPath %>/js/react/',
                    'rm -rf <%= srcPath %>/js/react/.module-cache/'
                ].join(' && '),
                stdout: true,
                failOnError: true
            }
        },

        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['lib/re image.js'],
                dest: 'dist/re image.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/re image.min.js'
            }
        },
        jshint: {
            options: {
                node: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                eqnull: true,
                browser: true,
                globals: { jQuery: true },
                boss: true
            },
            gruntfile: {
                src: 'gruntfile.js'
            },
            lib_test: {
                src: ['lib/**/*.js', 'test/**/*.js']
            }
        },
        includeSource: {
            options: {
                basePath: './src',
                baseUrl: ''
            },
            myTarget: {
                files: {
                    'src/index.html': 'src/index.tpl.html'
                }
            }
        },
        less: {
            dev: {
                options: {
                    paths: ['./src/css']
                },
                files: {
                    './src/css/main.css': './src/less/**/*.less'
                }
            }
        },
        wiredep: {
            task: {
                src: ['./src/index.tpl.html']
            },
            options: {
            }
        },
        watch: {
            options: {
                livereload: true
            },
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            html: {
                files: ['src/**/*.tpl.html'],
                tasks: ['includeSource']
            },
            less: {
                files: ['src/**/*.less'],
                tasks: ['less:dev']
            },
            jsx: {
                files: ['src/**/*.jsx'],
                tasks: ['jsx', 'includeSource']
            },
            js: {
                files: ['src/**/*.js'],
                tasks: ['includeSource']
            }

        }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-testem');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-less');


    // Default task
    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
    grunt.registerTask('dev', ['jsx', 'less:dev', 'includeSource', 'connect', 'watch']);
    grunt.registerTask('jsx', ['shell:build-jsx']);
    grunt.registerTask('test', ['testem:environment1']);

};

