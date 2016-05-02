'use strict';

var del = require('del');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

gulp.task('clean', function(){
    del(['dist']);
});

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

gulp.task('build:parasitifer', function(){
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('build:templates', function(){
    return gulp.src('./src/templates/**')
        .pipe(gulp.dest('./dist/templates'));
});

gulp.task('build:stub', function(){
    return gulp.src('./src/stub/**')
        .pipe(gulp.dest('./dist/stub'));
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

gulp.task('default', ['clean', 'build:needle', 'build:parasitifer', 'build:templates', 'build:stub']);
