# prismatic-injector  [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url] #

> 棱镜注射器

## 针头脚本 ##

针头脚本用于注入宿主页面，并调度后续流程。

## 注入针头脚本 ##

通过注入系统，向宿主页面注入如下脚本：

	<script id='__pi__' charset='utf-8' src='http://localhost:3080/needle.js'></script>

脚本各部分含义：

- `http://localhost:3080`：部署针头脚本的域名（IP\端口）及路径。
- `needle.js`：针头脚本文件名。实际应用中，可以使用其他名称。
- `__pi__`：脚本元素的ID。与脚本中的全局命名空间保持同名，并全部小写。

## 配置构建系统 ##

通过`needle.json`配置构建系统，能够自定义：

- 针头脚本文件名，及是否增加版本号
- 针头脚本元素ID
- 全局命名空间名称
- 调度服务器
- 调度服务名

具体参见：[针头脚本的构建(./doc/needle.md)](./doc/needle.md)

## 接口规范 ##

- [针头脚本的构建](./doc/needle.md)
- [模板选择服务接口规范](./doc/opt.md)
- [模板开发规范](./doc/template.md)
- [针头脚本公共方法](./doc/advanced.md)

[travis-image]: https://travis-ci.org/peigong/prismatic-injector.svg?branch=master
[travis-url]: https://travis-ci.org/peigong/prismatic-injector
[daviddm-image]: https://david-dm.org/peigong/prismatic-injector.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/peigong/prismatic-injector
[coveralls-image]: https://coveralls.io/repos/peigong/prismatic-injector/badge.svg
[coveralls-url]: https://coveralls.io/r/peigong/prismatic-injector
