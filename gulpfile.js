'use strict';

var del = require('del');
var gen = require('random-gen');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

var settings = require('./needle.json');
if('random' === settings.namespace){ // 如果命名空间设置为'random'，则使用随机生成的标识
    settings.namespace = gen.upper(8); // 8个随机大写字符的标识
}
settings.id = settings.namespace.toLowerCase();

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
    .pipe($.sourcemaps.init())
    .pipe($.replace('__PI__', settings.namespace))
    .pipe($.replace('opt.do', settings.opt))
    .pipe($.uglify())
    .pipe($.rename(settings.name))
    .pipe($.if(settings.revisioning, $.rev()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'))
    .pipe($.rev.manifest())
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
