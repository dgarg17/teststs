var gulp    = require('gulp');
var config  = require('../config').js;
var uglify = require('gulp-uglify');

gulp.task('uglifyJs', ['browserify'], function () {
  console.log('Running JS minify on ' + config.src + ' to ' + config.dest);
  return gulp.src(config.src)
    .pipe(uglify())
    .pipe(gulp.dest(config.dest))
});
