'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

gulp.task('static', function () {
    return gulp.src('**/*.js')
        .pipe($.excludeGitignore())
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError());
});

gulp.task('build:needle', function(){
    return gulp.src('./lib/**')
        .pipe(gulp.dest('./dist'));
});

gulp.task('build:template', function(){
    return gulp.src('./src/**')
        .pipe(gulp.dest('./dist'));
});

gulp.task('serve', function(){
    var settings = {
        server: {
            baseDir: './dist'
        }
    }
    browserSync.init(settings);

    gulp.watch(['./dist/**'])
    .on('change', browserSync.reload);
});

gulp.task('default', ['static', 'build:needle', 'build:template']);
