var gulp = require('gulp'),
// Requires the gulp-sass plugin
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create(),
  useref = require('gulp-useref');

gulp.task('default', ['connect']);  

gulp.task('hello', async function() {
  console.log('Hello Zell');
});

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(gulp.dest('app/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})


// Gulp watch syntax for multiple watchers
//gulp.task('watch', function(){
//  gulp.watch('app/scss/**/*.scss', gulp.series('sass')); 
  // Other watchers
//})

//tell Gulp where to find the server, in this case, the app folder
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

// Watchers
gulp.task('watch', function() {
  gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
})
