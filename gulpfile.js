'use strict';

var del = require('del');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

var src = './lib/needle.js';

gulp.task('clean', function(){
    del(['dist', 'test-tmp', 'coverage']);
});

gulp.task('static', function () {
    return gulp.src(src)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

gulp.task('build:needle', function(){
    return gulp.src(src)
    .pipe($.uglify())
    .pipe($.rename('n.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('pre-test', function(){
    return gulp.src(src)
    .pipe($.istanbul())
    .pipe(gulp.dest('./test-tmp'));
});

gulp.task('test', ['pre-test'], function(done){
    return gulp.src('./test/**/*.html')
    .pipe($.qunit())
    .pipe($.istanbul.writeReports());
});

gulp.task('coveralls', ['test'], function(){
    if(!process.env.CI){
        return;
    }
    return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
    .pipe($.coveralls());
});

gulp.task('default', ['clean', 'static', 'build:needle', 'test', 'coveralls']);
