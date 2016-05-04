'use strict';

var del = require('del');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

var src = './lib/needle.js';

gulp.task('clean', function(){
    del(['dist/**']);
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

gulp.task('default', ['clean', 'static', 'build:needle']);
