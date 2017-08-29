var browserSync = require('browser-sync').create();
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jsonminify = require('gulp-jsonminify'),
    flatten = require('gulp-flatten'),
    fs = require('fs'),
    dateFormat = require('dateformat');

// ---------- CONFIG ----------
var dest = {
    styles: 'Public/Styles',
    scripts: 'Public/Scripts',
    templates: 'Public/Templates',
    content: 'Public/Content',
    assets: 'Public/Assets',
    languages: 'Public/Languages'
}
// ---------- [END] CONFIG ----------

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        open: false
    });
});

gulp.task('styles', function () {
    return gulp.src([
        'Private/Assets/Config/Styles/Styles.scss',
        'Private/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(concat('Styles.css'))
        .pipe(gulp.dest(dest.styles));
})

gulp.task('scripts', function () {
    return gulp.src([
        'Private/Config/Scripts/Angular/Variables.js',
        'Private/Config/Scripts/Angular/App.js',
        'Private/Config/Scripts/Angular/Router.js',
        'Private/Config/Scripts/Angular/Services/**/*.js',
        'Private/Config/Scripts/Angular/Directives/**/*.js',
        'Private/Config/Scripts/Functions.js',
        'Private/Site/**/*.js',
        'Private/Pages/**/*.js'])
        .pipe(concat('App.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(dest.scripts));
});

gulp.task('templates', function () {
    return gulp.src('Private/Config/Templates/*.html')
        .pipe(gulp.dest(dest.templates));
});

gulp.task('content', function () {
    return gulp.src('Private/**/*.html')
        .pipe(flatten())
        .pipe(gulp.dest(dest.content));
});

gulp.task('assets', function () {
    return gulp.src('Private/Assets/**/*')
        .pipe(gulp.dest(dest.assets));
});

gulp.task('languages', function () {
    return gulp.src('Private/Languages/*.json')
        .pipe(jsonminify())
        .pipe(gulp.dest(dest.languages));
});

gulp.task('watch', function () {
    gulp.watch(['Private/**/*.scss'], ['styles'])
    gulp.watch(['Private/**/*.js'], ['scripts'])
    gulp.watch(['Private/Config/Templates/*.html'], ['templates'])
    gulp.watch(['Private/**/*.html'], ['content'])
    gulp.watch(['Private/Assets/**/*'], ['assets'])
    gulp.watch(['Private/Languages/*.json'], ['languages'])
})

gulp.task('cachefile', function(cb){
    var now = new Date();
    now = dateFormat(now, 'yyyy/mm/dd-hh:MM TT');
        fs.writeFile('Public/cachefile', 'Last full build: ' + now, cb);
    return;
});

gulp.task('run', function () {
    gulp.start('styles', 'scripts', 'templates', 'content', 'assets', 'languages', 'cachefile');
})


gulp.task('default', function () {
    gulp.start('browser-sync', 'styles', 'scripts', 'templates', 'content', 'assets', 'languages', 'watch', 'cachefile');
});