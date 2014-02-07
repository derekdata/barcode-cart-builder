module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                background: true
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'www/js/**/*.js', 'www_test/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true,
                    angular: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'karma:unit:run']
        },
        connect: {
            web: {
                options: {
                    port: 9000,
                    bases: 'www/',
                    keepalive: true
                }
            }
        },
        concurrent: {
            dev: {
                tasks: ['watch', 'watch-tests', 'web'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        bower: {
            install: {
                //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
            }
        }
    });


    // grunt karma:unit:start watch
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-bower-task');

    grunt.registerTask('test', ['jshint', 'karma']);

    grunt.registerTask('web', ['connect:web']);
    grunt.registerTask('watch-tests', ['karma:unit']);
    grunt.registerTask('default', ['bower:install', 'concurrent:dev']);

};