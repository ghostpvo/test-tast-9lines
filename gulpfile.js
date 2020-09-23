'use strict';

var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglifyjs'),
    cssnano     = require('gulp-cssnano'),
    rename      = require('gulp-rename'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    cache       = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');

gulp.task('scss', function () {
    return gulp.src('src/scss/core.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(cssnano())
        .pipe(rename({
            basename: 'styles',
            suffix: '.min'
        }))
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('js-vendor', function() {
    return gulp.src([
            'src/js/vendor/jquery.js',
            'src/js/vendor/foundation.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

gulp.task('scripts', function() {
    return gulp.src([
            'src/js/app/**/*.js'
        ])
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

gulp.task('img', function() {
    return gulp.src('src/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('build/img'));
});

gulp.task('build-html', function() {
    return gulp.src('src/pages/**/*')
        .pipe(gulp.dest('build'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'build'
        },
        notify: false
    });
});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('watch', ['browser-sync', 'scss', 'js-vendor', 'scripts', 'img', 'build-html', 'clear'], function () {
  gulp.watch('src/scss/**/*.scss', ['scss']);
  gulp.watch('src/pages/**/*', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
  gulp.watch('src/img/**/*', browserSync.reload);
});

gulp.task('default', ['watch']);
