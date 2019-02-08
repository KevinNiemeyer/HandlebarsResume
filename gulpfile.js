var gulp = require('gulp'),
  	connect = require('gulp-connect');
  	

gulp.task('connect', async function() {
  connect.server();
});

gulp.task('default', gulp.series('connect'));

