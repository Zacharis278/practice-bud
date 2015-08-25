var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');

gulp.task('build-css', function() {
    gulp.src('app/shared/styles/main.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('app/styles'));
});

gulp.task('copy-fonts', function() {
   gulp.src('app/bower_components/font-awesome/fonts/*')
       .pipe(gulp.dest('app/fonts'));
});

gulp.task('watch', function() {
    gulp.watch('app/shared/styles/*.scss', ['build-css']);
    gulp.watch('app/modules/*/styles/*.scss', ['build-css']);
});

gulp.task('default', ['copy-fonts', 'build-css', 'watch']);