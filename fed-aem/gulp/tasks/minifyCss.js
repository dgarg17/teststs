var gulp      = require('gulp');
var config    = require('../config').css;
var minifyCSS = require('gulp-minify-css');
var handleErrors = require('../util/handleErrors');

gulp.task('minifyCss', ['sass'], function() {
  return gulp.src(config.src)
    .pipe(minifyCSS())
    .pipe(gulp.dest(config.dest))
})
