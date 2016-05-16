'use strict';

var fs = require('fs');
var del = require('del');
var gen = require('random-gen');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

// 导入配置文件
var settings = require('./needle.json');
if('random' === settings.namespace){ // 如果命名空间设置为'random'，则使用随机生成的标识
    settings.namespace = gen.upper(8); // 8个随机大写字符的标识
}
settings.id = settings.namespace.toLowerCase();

// 清理构建输出
gulp.task('clean', function(){
    return del.sync(['dist', '.tmp', 'coverage']);
});

// 预处理针头脚本
gulp.task('pre-process', ['clean'], function(){
    return gulp.src('./lib/needle.js')
    .pipe($.preprocess({ context: { AUTO: !settings.server, SERVER: settings.server } }))
    .pipe($.replace('__PI__', settings.namespace))
    .pipe($.replace('opt.do', settings.opt))
    .pipe(gulp.dest('./.tmp/processed'));
});

// 代码静态检查
gulp.task('static', ['pre-process'], function () {
    return gulp.src('./.tmp/processed/*.js')
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

// 构建针头脚本
gulp.task('build:needle', ['pre-process'], function(){
    return gulp.src('./.tmp/processed/needle.js')
    .pipe($.sourcemaps.init())
    .pipe($.uglify())
    .pipe($.rename(settings.name))
    .pipe($.if(settings.revisioning, $.rev()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'))
    .pipe($.rev.manifest())
    .pipe(gulp.dest('./dist'));
});

// 输出针头脚本的ID和文件名
gulp.task('build:name', ['build:needle'], function(){
    var name = settings.name;
    var conf = { script: { id: settings.id } };

    if(settings.revisioning){
        var manifest = require('./dist/rev-manifest.json');
        if(manifest.hasOwnProperty(name)){
            name = manifest[name];
        }
    }
    conf.script.filename = name;

    fs.writeFile('inject.json', JSON.stringify(conf, null, 4));
});

// 预处理单元测试
gulp.task('pre-unit', ['clean'], function(){
    return gulp.src('./test/**')
    .pipe($.replace('__pi__', settings.id))
    .pipe($.replace('opt.do', settings.opt))
    .pipe($.replace('__PI__', settings.namespace))
    .pipe(gulp.dest('./.tmp/unit'));
});

// 预处理待测脚本
gulp.task('pre-test', ['pre-process'], function(){
    return gulp.src('./.tmp/processed/needle.js')
    .pipe($.istanbul())
    .pipe(gulp.dest('./.tmp/test'));
});

// 执行自动化测试
gulp.task('test', ['pre-process', 'pre-unit', 'pre-test'], function(done){
    return gulp.src('./.tmp/unit/**/*.html')
    .pipe($.qunit())
    .pipe($.istanbul.writeReports());
});

// 发布代码覆盖率文件
gulp.task('coveralls', ['test'], function(){
    if(!process.env.CI){
        return;
    }
    return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
    .pipe($.coveralls());
});

// 默认任务
gulp.task('default', ['clean', 'static', 'build:needle', 'test', 'coveralls', 'build:name']);
