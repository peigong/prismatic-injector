# 针头脚本配置规范 #

## 构建配置 needle.json ##

> 此配置文件用于配置针头脚本的构建，以及服务器桩的输出。

	{
	    "name": "n.js",
	    "revisioning": false,
	    "namespace": "__PI__",
		"server": "",
	    "opt": "opt.do"
	}

各配置节意义如下：

- **name：**构建输出的针头脚本文件名
- **revisioning：**是否为文件名增加版本号
- **namespace：**全局命名空间名称。如果设置为'random'，则使用随机生成的标识。全部小写化后作为针头脚本元素的ID。
- **server：**调度服务器。设置为空字符串，则使用与脚本脚本平级的路径。
- **opt：**调度服务名。
