// Karma configuration
// Generated on Thu Feb 06 2014 07:39:10 GMT-0500 (EST)

module.exports = function (config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '',


        // frameworks to use
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'www/components/ionic/release/js/ionic.js',
            'www/components/angular/angular.js',
            'www/components/angular-mocks/angular-mocks.js',
            'www/components/angular-mocks/angular-resource.js',
            'www/components/angular-animate/angular-animate.js',
            'www/components/angular-route/angular-route.js',
            'www/components/angular-touch/angular-touch.js',
            'www/components/angular-sanitize/angular-sanitize.js',
            'www/components/angular-ui-router/release/angular-ui-router.js',
            'www/components/ionic/release/js/ionic-angular.js',
            'www/js/**/*.js',
            'www/js/*.js',
            'www_test/**/*.js'
        ],

        // list of files to exclude
        exclude: [

        ],


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DEBUG,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['PhantomJS'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
