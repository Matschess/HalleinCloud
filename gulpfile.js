var browserSync = require('browser-sync').create();
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    bulkSass = require('gulp-sass-bulk-import'),
    autoprefixer = require('gulp-autoprefixer'),
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
    media: 'Web/Assets',
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
    return gulp.src('Resources/Config/Styles/Styles.scss')
        .pipe(bulkSass())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(concat('Styles.css'))
        .pipe(gulp.dest(dest.styles));
})

gulp.task('scripts', function () {
    return gulp.src([
        'Resources/Config/Scripts/Globals/Variables.js',
        'Resources/Config/Scripts/App.js',
        'Resources/Config/Scripts/Router.js',
        'Resources/Site/Assets/Scripts/**/*.js',
        'Resources/Site/SiteController.js',
        'Resources/Site/Components/**/*.js',
        'Resources/Site/Pages/**/*.js'])
        .pipe(concat('App.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(dest.scripts));
});

gulp.task('index-html', function () {
    return gulp.src('Resources/Site/index.html')
        .pipe(gulp.dest(dest.indexHtml));
});

gulp.task('templates', function () {
    return gulp.src('Resources/Site/Templates/*.html')
        .pipe(gulp.dest(dest.templates));
});

gulp.task('content', function () {
    return gulp.src([
        'Resources/Site/Components/**/*.html',
        'Resources/Site/Pages/**/*.html'])
        .pipe(flatten())
        .pipe(gulp.dest(dest.content));
});

gulp.task('media', function () {
    return gulp.src('Resources/Media/**/*')
        .pipe(gulp.dest(dest.media));
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
    gulp.watch(['Resources/Site/Templates/*.html'], ['templates'])
    gulp.watch(['Resources/Site/Components/**/*.html', 'Resources/Site/Pages/**/*.html'], ['content'])
    gulp.watch(['Resources/Media/**/*'], ['media'])
    gulp.watch(['Resources/Languages/*.json'], ['languages'])
})

gulp.task('cachefile', function(cb){
    var now = new Date();
    now = dateFormat(now, 'yyyy/mm/dd-hh:MM TT');
        fs.writeFile('Web/cachefile', 'Last full build: ' + now, cb);
    return;
});

gulp.task('build', function () {
    gulp.start('styles', 'scripts', 'index-html', 'templates',  'content', 'media', 'languages', 'cachefile');
})


gulp.task('default', function () {
    gulp.start('browser-sync', 'styles', 'scripts', 'index-html', 'templates', 'content', 'media', 'languages', 'watch', 'cachefile');
});