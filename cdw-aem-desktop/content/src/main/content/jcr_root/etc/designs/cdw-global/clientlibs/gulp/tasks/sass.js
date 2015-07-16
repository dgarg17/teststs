var gulp         = require('gulp');
//var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
//var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').sass;
var autoprefixer = require('gulp-autoprefixer');
var cssImport = require('gulp-cssimport');

gulp.task('sass', function () {
    return gulp.src(config.src)
        //.pipe(sourcemaps.init())
        .pipe(sass(config.settings))
        .on('error', handleErrors)
        .pipe(cssImport())
        .pipe(minifyCSS())
        //.pipe(sourcemaps.write())
        //.pipe(autoprefixer({ browsers: ['last 2 version'] }))
        .pipe(gulp.dest(config.dest));
        //.pipe(browserSync.reload({stream:true}));
});
