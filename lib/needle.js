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

    /*--------> 公共方法 START <--------*/
    that.settings = null;
    function getSettings(){
        var settings = that.settings || {};
        return settings;
    }

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

    function inject(element){
        doc.body.appendChild(element);
    }

    global.init = init;
    global.getSettings = getSettings;
    global.inject = inject;
    /*--------> 公共方法 END <--------*/

    /*--------> 辅助工具类方法 START <--------*/

    /*--------> 辅助工具类方法 START <--------*/
    function isObject(o){
        return Object.prototype.toString.call(o) === '[object Object]';
    }
    global.util = {
        isObject: isObject
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
                Object.assign(temp, val);
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
