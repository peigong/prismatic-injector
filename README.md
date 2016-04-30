# prismatic-injector  [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] #

> 棱镜注射器

## 模板选择服务接口规范 ##

### 请求 ###

### 响应 ###

## 模板开发规范 ##

### 公共方法 ###

### 模板配置 ###

### 模板样式规范 ###

模板中的所有样式，最终将被注入宿主页面。

为了避免与宿主页面发生样式冲突，务必严格的定义模板样式的命名空间。

命名空间建议：

### 模板脚本规范 ###

尽量使用公共方法提供的配置管理工具，不要使用全局变量传递配置数据。

### 模板内容服务 ###

## 端口号 ##

- 8080：宿主页面端口
- 8081：针头脚本地址端口
- 8082：模板选择服务端口
- 8083：模板库地址端口
- 8084：模板内容服务端口

[travis-image]: https://travis-ci.org/peigong/prismatic-injector.svg?branch=master
[travis-url]: https://travis-ci.org/peigong/prismatic-injector
[daviddm-image]: https://david-dm.org/peigong/prismatic-injector.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/peigong/prismatic-injector
