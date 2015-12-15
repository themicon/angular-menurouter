var $ = require('gulp-load-plugins')(),
    gulp = require('gulp'),
    PluginError = $.util.PluginError;

var paths = {
    src: 'source/',
    dist: 'dist/'
};

var source = [
    paths.src + '*.module.js',
    paths.src + '*.js'
];

// JS
gulp.task('default', function() {
    return gulp.src(source)
        .pipe($.concat('angular-menurouter.js'))
        .pipe($.jsvalidate())
        .pipe(gulp.dest(paths.dist))
        .pipe($.uglify())
        .pipe($.rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(paths.dist))
        ;
});