var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', function () {
    gulp.watch('assets/scss/*.scss', ['build-css']);
});

gulp.task('build-css', function () {
    return gulp.src('assets/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('assets/css'));
});