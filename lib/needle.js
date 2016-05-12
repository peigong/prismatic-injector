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
})();
