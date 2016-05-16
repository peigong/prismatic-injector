# 针头脚本公共方法 #

## 核心方法 ##

- global.init(Object settings)：系统初始化。
- global.getSettings()：获取模板的配置。
- global.inject(DomElement element)：向宿主页面注入定义完毕的DOM元素。

## 配置类方法 ##

- global.config.set(key, val)：写入配置。key可以是以`.`号分隔的字符串。
- global.config.get(key)：读取配置。key可以是以`.`号分隔的字符串。

## 辅助工具类方法 ##

- Boolean global.util.isType(String type, Unknown o)：类型检查。
- Boolean global.util.isObject(Unknown o)：检查是否是对象类型。
- Boolean global.util.isBoolean(Unknown o)：检查是否是布尔类型。
- Object global.util.extend(target,[object1],[objectN])：用一个或多个其他对象来扩展一个对象，返回被扩展的对象。
