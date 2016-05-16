(function(){
    /**
    * 定义全局命名空间。
    * TODO: 全局命名空间的名字应该每次构建使用随机的标识。
    */
    var global_key = '__PI__';
    var win = top, doc = win.document;
    var global = win[global_key] = win[global_key] || {};
    var that = this;
    var separator = '/';
    var opt = 'opt.do';

    /*--------> 核心方法 START <--------*/
    that.settings = null;

    /**
    * 获取模板的配置。
    */
    function getSettings(){
        var settings = that.settings || {};
        return settings;
    }

    /**
    * 系统初始化。
    * @param {Object} settings 模板的配置。
    */
    function init(settings){
        that.settings = settings;

        var template = settings.template || '',
            name = settings.name,
            scripts = settings.scripts || [],
            styles = settings.styles || [];
        var head = doc.head || doc.getElementsByTagName("head")[0];

        styles.forEach(function(style){
            var link = doc.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.charset = "utf-8";
            link.href = [template, name, style].join(separator);
            head.appendChild(link)
        });
        var html = '<html><head><meta http-equiv="content-type" content="text/html; charset=utf-8" />';
        html += '<script>var ' + global_key + ' = top.' + global_key + ';\x3c/script>';
        scripts.forEach(function(script){
            html += '<script src="' + [template, name, script].join(separator) + '">\x3c/script>';
        });
        html += '</head></html>';
        var iframe = doc.createElement('iframe');
        iframe.style.display = "none";
        doc.body.appendChild(iframe);
        try{
            var d = iframe.contentWindow.document;
            d.write(html);
            d.close()
        }catch(ex){
        }
    }

    /**
    * 向宿主页面注入定义完毕的DOM元素。
    * @param {DomElement} element 定义完毕的DOM元素。
    */
    function inject(element){
        doc.body.appendChild(element);
    }

    global.init = init;
    global.getSettings = getSettings;
    global.inject = inject;
    /*--------> 核心方法 END <--------*/

    /*--------> 辅助工具类方法 START <--------*/

    /*--------> 辅助工具类方法 START <--------*/
    /**
    * 类型检查。
    * @param {String} type 类型名。
    * @param {Unknown} o 待检查的变量。
    * @return {Boolean} 是否是指定的类型。
    */
    function isType(type, o){
        return Object.prototype.toString.call(o) === '[object ' + type + ']';
    }

    /**
    * 检查是否是对象类型。
    * @param {Unknown} o 待检查的变量。
    * @return {Boolean} 是否是对象类型。
    */
    function isObject(o){
        return isType('Object', o);;
    }

    /**
    * 检查是否是布尔类型。
    * @param {Unknown} o 待检查的变量。
    * @return {Boolean} 是否是布尔类型。
    */
    function isBoolean(o){
        return isType('Boolean', o);;
    }

    /**
    * 用一个或多个其他对象来扩展一个对象，返回被扩展的对象。
    * 如果第一个参数设置为true，则返回一个深层次的副本，递归地复制找到的任何对象。否则的话，副本会与原对象共享结构。未定义的属性将不会被复制，从对象的原型继承的属性也不会被复制。第二个及以后的参数，不是对象类型都会被忽略。
    * @param {Boolean} deep 如果设为true，则递归合并【可选】。
    * @param target 待修改对象。
    * @param {Object} object1 待合并到第一个对象的对象【可选】。
    * @param {Object} objectN 待合并到第一个对象的对象【可选】。
    * @return {Object} 被扩展的对象。
    */
    function extend(){
        var deep, dest;
        var args = [].slice.call(arguments);
        deep = args.shift();
        if(isBoolean(deep)){
            dest = args.shift();
            while (!isObject(dest)) {
                dest = args.shift();
            }
        }else{
            dest = deep;
            deep = false;
        }
        args.forEach(function(src){
            if(isObject(src)){
                for(var key in src){
                    if(src.hasOwnProperty(key)){
                        if(isObject(src[key]) && deep){
                            dest[key] = extend(deep, dest[key], src[key]);
                        }else{
                            dest[key] = src[key];
                        }
                    }
                }
            }
        });
        return dest;
    }
    global.util = {
        isType: isType,
        isObject: isObject,
        isBoolean: isBoolean,
        extend: extend
    };
    /*--------> 辅助工具类方法 END <--------*/

    /*--------> 配置类方法 START <--------*/
    global.config = (function(){
        var config = {};
        function get(key){
            var o = config,
                i, temp;
            var keys = key.split('.');
            for(i = 0; i < keys.length; i++){
                temp = o[keys[i]];
                if('undefined' === typeof temp){
                    return null;
                }else{
                    o = temp;
                }
            }
            return o;
        }
        function set(key, val){
            var o = config,
                i, ky, temp;
            var keys = key.split('.'),
                k = keys.pop();
            for(i = 0; i < keys.length; i++){
                ky = keys[i];
                temp = o[ky];
                if('undefined' === typeof temp){
                    o = o[ky] = {};
                }else if(isObject(temp)){
                    o = temp;
                }else{
                    throw new Error('Warning:');
                }
            }
            temp = o[k];
            if(isObject(temp) && isObject(val)){
                temp = extend(temp, val);
            }else{
                o[k] = val;
            }
            return config;
        }
        return {
            get: get,
            set: set
        };
    })();
    /*--------> 配置类方法 END <--------*/

    /*--------> 自动执行 START <--------*/
    // @if AUTO
    var needle = doc.getElementById(global_key.toLowerCase());
    var server = needle.src.split(separator);
    server.pop();
    server.push(opt);
    server = server.join(separator);
    // @endif
    // @if !AUTO
    var server = '/* @echo SERVER */';
    server = [server, opt].join(separator);
    // @endif

    var head = doc.head || doc.getElementsByTagName("head")[0];
    var script = doc.createElement('script');
    script.charset = 'utf-8';
    script.src = server;
    head.appendChild(script);
    /*--------> 自动执行 END <--------*/
})();
