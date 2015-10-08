var gulp      = require('gulp');
var config    = require('../config').production;
var minifyCSS = require('gulp-minify-css');
var handleErrors = require('../util/handleErrors');

gulp.task('minifyCss', ['sass'], function() {
  return gulp.src(config.cssSrc)
    .pipe(minifyCSS())
    .pipe(gulp.dest(config.cssDest))
})
