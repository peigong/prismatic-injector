'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('static', function () {
    return gulp.src('**/*.js')
        .pipe($.excludeGitignore())
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError());
});

gulp.task('default', ['static']);
