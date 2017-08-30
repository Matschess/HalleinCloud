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
    styles: 'Resources/Public/Styles',
    scripts: 'Resources/Public/Scripts',
    templates: 'Resources/Public/Templates',
    content: 'Resources/Public/Content',
    assets: 'Resources/Public/Assets',
    languages: 'Resources/Public/Languages'
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
        'Resources/Private/Assets/Config/Styles/Styles.scss',
        'Resources/Private/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(concat('Styles.css'))
        .pipe(gulp.dest(dest.styles));
})

gulp.task('scripts', function () {
    return gulp.src([
        'Resources/Private/Config/Scripts/Angular/Variables.js',
        'Resources/Private/Config/Scripts/Angular/App.js',
        'Resources/Private/Config/Scripts/Angular/Router.js',
        'Resources/Private/Config/Scripts/Angular/Services/**/*.js',
        'Resources/Private/Config/Scripts/Angular/Directives/**/*.js',
        'Resources/Private/Config/Scripts/Functions.js',
        'Resources/Private/Site/**/*.js',
        'Resources/Private/Pages/**/*.js'])
        .pipe(concat('App.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(dest.scripts));
});

gulp.task('templates', function () {
    return gulp.src('Resources/Private/Config/Templates/*.html')
        .pipe(gulp.dest(dest.templates));
});

gulp.task('content', function () {
    return gulp.src('Resources/Private/**/*.html')
        .pipe(flatten())
        .pipe(gulp.dest(dest.content));
});

gulp.task('assets', function () {
    return gulp.src('Resources/Private/Assets/**/*')
        .pipe(gulp.dest(dest.assets));
});

gulp.task('languages', function () {
    return gulp.src('Resources/Private/Languages/*.json')
        .pipe(jsonminify())
        .pipe(gulp.dest(dest.languages));
});

gulp.task('watch', function () {
    gulp.watch(['Resources/Private/**/*.scss'], ['styles'])
    gulp.watch(['Resources/Private/**/*.js'], ['scripts'])
    gulp.watch(['Resources/Private/Config/Templates/*.html'], ['templates'])
    gulp.watch(['Resources/Private/**/*.html'], ['content'])
    gulp.watch(['Resources/Private/Assets/**/*'], ['assets'])
    gulp.watch(['Resources/Private/Languages/*.json'], ['languages'])
})

gulp.task('cachefile', function(cb){
    var now = new Date();
    now = dateFormat(now, 'yyyy/mm/dd-hh:MM TT');
        fs.writeFile('Resources/Public/cachefile', 'Last full build: ' + now, cb);
    return;
});

gulp.task('run', function () {
    gulp.start('styles', 'scripts', 'templates', 'content', 'assets', 'languages', 'cachefile');
})


gulp.task('default', function () {
    gulp.start('browser-sync', 'styles', 'scripts', 'templates', 'content', 'assets', 'languages', 'watch', 'cachefile');
});