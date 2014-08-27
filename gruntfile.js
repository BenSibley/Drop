module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    'js/*.js',
                    '!js/profile-uploader.js'
                ],
                dest: 'js/build/production.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'js/build/production.min.js': 'js/build/production.js',
                    'js/build/profile-uploader.min.js': 'js/profile-uploader.js'
                }
            }
        },
        watch: {
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['sass/*.scss'],
                tasks: ['sass', 'autoprefixer', 'cssjanus', 'cssmin'],
                options: {
                    livereload: true,
                    spawn: false
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'style.css': 'sass/style.scss'
                }
            }
        },
        autoprefixer: {
            dist: {
                options: {
                    browsers: ['last 1 version', '> 1%', 'ie 8']
                },
                src: 'style.css',
                dest: 'style.css'
            }
        },
        cssmin: {
            combine: {
                files: {
                    'style.min.css': ['style.css'],
                    'css/rtl.min.css': ['css/rtl.css']
                }
            }
        },
        makepot: {
            target: {
                options: {
                    domainPath: '/languages',
                    potFilename: 'drop.pot',
                    type: 'wp-theme'
                }
            }
        },
        compress: {
            main: {
                options: {
                    archive: '/Users/bensibley/Desktop/drop.zip'
                },
                files: [
                    {
                        src: ['**', '!node_modules/**','!sass/**', '!gruntfile.js', '!package.json', '!/.git/','!/.idea/','!/.sass-cache/','!**.DS_Store'],
                        filter: 'isFile'
                    }
                ]
            }
        },
        cssjanus: {
            dev: {
                options: {
                    swapLtrRtlInUrl: false // replace 'ltr' with 'rtl'
                },
                src: ['style.css'],
                dest: 'css/rtl.css'
            }
        },
        phpcs: {
            application: {
                dir: ['*.php']
            }/*,
            options: {
                tabWidth: 4
            }*/
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-wp-i18n');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-cssjanus');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'watch', 'sass', 'autoprefixer', 'cssmin','makepot','compress','cssjanus','phpcs']);

};