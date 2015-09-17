var gulp = require('gulp');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var ejsmin = require('gulp-ejsmin');
var nodemon = require('gulp-nodemon');
var buffer = require('vinyl-buffer');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync').create();



var paths = {
    js: ['./src/js/**/*.js', './src/js/*.js'],
    styles: './src/styles/*.less',
    html: ['./src/html/*.ejs', './src/html/**/*.ejs']
};

gulp.task('build-js', function () {
    return browserify('./src/js/main.js')
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream());
});

gulp.task('build-less', function() {
    return gulp.src(paths.styles)
        .pipe(less())
        .pipe(minifyCss())
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
});

gulp.task('build-html', function() {
    return gulp.src(paths.html)
        .pipe(ejsmin({removeComment: true}))
        .pipe(gulp.dest('./build/html'))
        .pipe(browserSync.stream());
});

gulp.task('run', ['build-js', 'build-less', 'build-html'], function(cb) {
    var called = false;
    browserSync.init({
        proxy: 'http://localhost:8888',
        port: 3000
    });

    nodemon({
        script: 'app.js',
        env: {
            'NODE_ENV': 'development'
        },
        watch: ['app.js', './server/**/**/*.js', './server/**/*.js', './server/*.js']
    })
        .on('start', function onStart() {
            if (!called) {
                cb();
                called = true;
            }
        })
        .on('restart', function onRestart() {
            setTimeout(function reload() {
                browserSync.reload({
                    stream: false
                });
            }, 500);
        });

    gulp.watch(paths.js, ['build-js']);
    gulp.watch(paths.styles, ['build-less']);
    gulp.watch(paths.html, ['build-html']);
});

gulp.task('default', ['run']);