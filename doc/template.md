# 模板开发规范 #

## 公共方法 ##

使用如下空壳包装需要调用公共方法的脚本：

	(function(global){
	})(__PI__);

备注：如果不使用公共方法，可以不用空壳包装。

可以在脚本中调用的公共方法如下：

- **global.getSettings()：**获取模板的配置。
- **global.inject(DomElement element)：**向宿主页面注入定义完毕的DOM元素。
- **global.config.set(key, val)：**写入配置。key可以是以`.`号分隔的字符串。
- **global.config.get(key)：**读取配置。key可以是以`.`号分隔的字符串。

更多公共方法，参见[针头脚本公共方法](./advanced.md)。

## 配置规范 ##

在模板根目录下，放置配置文件`template.json`，内容如下：

	{
        name: '',
        description: '',
        scripts: [
        ],
        styles: [
        ]
    }

配置文件各字段意义如下：

- **name：**模板名称。
- **description：**模板的描述信息。
- **scripts：**需要系统依次加载的脚本文件地址，基于模板根目录查找。
- **styles：**需要系统依次加载的样式文件地址，基于模板根目录查找。

## 样式规范 ##

模板中的所有样式，最终将被注入宿主页面。

为了避免与宿主页面发生样式冲突，务必严格的定义模板样式的命名空间。

命名空间建议：

- 使用id等权重高的样式名。
- 使用特殊的属性名或属性值。

## 脚本规范 ##

TODO:尽量使用公共方法提供的配置管理工具，不要使用全局变量传递配置数据。

在脚本中创建DOM元素，并使用javascript附加元素行为，最后调用公共方法`global.inject`注入到宿主页面。

## 工程规范 ##

- `src/templates`目录存放模板源文件。
- `src/templates/template.json`作为模板的配置文件。
- `src/stub`目录下存放为模板提供数据服务的桩数据文件。
- 把数据服务路径中的`/`替换为`-`作为桩数据文件名，后缀是`.json`。
- 需要把`src/templates`目录下的模板源文件，复制构建到`dist/templates/{template-name}`目录中。
- 需要把`src/stub`目录下的桩数据文件，复制构建到`dist/stub`目录中。

## 数据服务规范 ##

模板中调用的数据服务使用JSONP协议。

数据服务具体的请求和响应的格式，由具体的产品需求确定。