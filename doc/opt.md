# 模板选择服务接口规范 #

> 模板选择服务用于选择推送到客户端的展示模板。

## 请求 ##

请求的服务器和服务名由构建配置文件 `needle.json` 定义：

- **server：**调度服务器。设置为空字符串，则使用与脚本脚本平级的路径。
- **opt：**调度服务名。

### 参数 ###

无。

## 响应 ##

服务选中模板后，向前端返回以下脚本，以供初始化：

	(function(global){
	    global && global.init({
	        template: '',
	        service: '',
	        name: '',
	        description: '',
	        scripts: [
	        ],
	        styles: [
	        ]
	    });
	})(__PI__);

脚本各部分含义：

- **template：**存放模板的基础路径。
- **service：**为模板提供数据服务的基础地址。
- **name：**模板名称。需要确保通过`{template}/{name}`路径查找到模板的根目录。
- **description：**模板的描述信息。由模板配置`template.json`定义。
- **scripts：**需要系统依次加载的脚本文件地址，基于模板根目录查找。由模板配置`template.json`定义。
- **styles：**需要系统依次加载的样式文件地址，基于模板根目录查找。由模板配置`template.json`定义。
