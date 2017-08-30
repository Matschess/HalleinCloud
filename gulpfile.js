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
    styles: 'Web/Styles',
    scripts: 'Web/Scripts',
    indexHtml: 'Web/',
    templates: 'Web/Templates',
    content: 'Web/Content',
    assets: 'Web/Assets',
    languages: 'Web/Languages'
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
        'Resources/Assets/Config/Styles/Styles.scss',
        'Resources/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(concat('Styles.css'))
        .pipe(gulp.dest(dest.styles));
})

gulp.task('scripts', function () {
    return gulp.src([
        'Resources/Config/Scripts/Angular/Variables.js',
        'Resources/Config/Scripts/Angular/App.js',
        'Resources/Config/Scripts/Angular/Router.js',
        'Resources/Config/Scripts/Angular/Services/**/*.js',
        'Resources/Config/Scripts/Angular/Directives/**/*.js',
        'Resources/Config/Scripts/Functions.js',
        'Resources/Site/**/*.js',
        'Resources/Pages/**/*.js'])
        .pipe(concat('App.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(dest.scripts));
});

gulp.task('index-html', function () {
    return gulp.src('Resources/Site/index.html')
        .pipe(gulp.dest(dest.indexHtml));
});

gulp.task('templates', function () {
    return gulp.src('Resources/Config/Templates/*.html')
        .pipe(gulp.dest(dest.templates));
});

gulp.task('content', function () {
    return gulp.src('Resources/**/*.html')
        .pipe(flatten())
        .pipe(gulp.dest(dest.content));
});

gulp.task('assets', function () {
    return gulp.src('Resources/Assets/**/*')
        .pipe(gulp.dest(dest.assets));
});

gulp.task('languages', function () {
    return gulp.src('Resources/Languages/*.json')
        .pipe(jsonminify())
        .pipe(gulp.dest(dest.languages));
});

gulp.task('watch', function () {
    gulp.watch(['Resources/**/*.scss'], ['styles'])
    gulp.watch(['Resources/**/*.js'], ['scripts'])
    gulp.watch(['Resources/Site/index.html'], ['index-html'])
    gulp.watch(['Resources/Config/Templates/*.html'], ['templates'])
    gulp.watch(['Resources/**/*.html'], ['content'])
    gulp.watch(['Resources/Assets/**/*'], ['assets'])
    gulp.watch(['Resources/Languages/*.json'], ['languages'])
})

gulp.task('cachefile', function(cb){
    var now = new Date();
    now = dateFormat(now, 'yyyy/mm/dd-hh:MM TT');
        fs.writeFile('Web/cachefile', 'Last full build: ' + now, cb);
    return;
});

gulp.task('build', function () {
    gulp.start('styles', 'scripts', 'index-html', 'templates',  'content', 'assets', 'languages', 'cachefile');
})


gulp.task('default', function () {
    gulp.start('browser-sync', 'styles', 'scripts', 'index-html', 'templates', 'content', 'assets', 'languages', 'watch', 'cachefile');
});