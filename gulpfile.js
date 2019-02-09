var gulp = require('gulp'),
  	connect = require('gulp-connect'),
  	cache = require('gulp-cache');

gulp.task('connect', async function() {
  connect.server();

});

gulp.task('default', gulp.series('connect'));

