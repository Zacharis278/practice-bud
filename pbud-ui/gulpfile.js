var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');

gulp.task('build-css', function() {
    gulp.src('app/shared/styles/main.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('app/styles'));
});

gulp.task('watch', function() {
    gulp.watch('app/shared/styles/*.scss', ['build-css']);
    gulp.watch('app/modules/*/styles/*.scss', ['build-css']);
});

gulp.task('default', ['build-css', 'watch']);