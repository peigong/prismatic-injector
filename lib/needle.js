(function(){
    /**
    * 定义全局命名空间。
    * TODO: 全局命名空间的名字应该每次构建使用随机的标识。
    */
    var global_key = '__PI__';
    var win = top;
    var global = win[global_key] = win[global_key] || {};
    var that = this;
    that.settings = null;
    function getSettings(){
        var settings = that.settings || {};
        return settings;
    }
    function init(settings){
        that.settings = settings;
        var scripts = settings.scripts || [],
            styles = settings.styles || [];
        var head = top.document.getElementsByTagName("head")[0];
        styles.forEach(function(style){
            var link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.charset = "utf-8";
            link.href = style;
            head.appendChild(link)
        });
        var html = '<html><head><meta http-equiv="content-type" content="text/html; charset=utf-8" />';
        html += '<script>var ' + global_key + ' = top.' + global_key + ';\x3c/script>';
        scripts.forEach(function(script){
            html += '<script src="' + script + '">\x3c/script>';
        });
        html += '</head></html>';
        var iframe = document.createElement('iframe');
        iframe.style.display = "none";
        win.document.body.appendChild(iframe);
        try{
            var doc = iframe.contentWindow.document;
            doc.write(html);
            doc.close()
        }catch(ex){
        }
    }

    function inject(element){
        win.document.body.appendChild(element);
    }

    global.init = init;
    global.getSettings = getSettings;
    global.inject = inject;
})();

(function(global){
    global.init({
        name: 'demo',
        description: '基本机制演示DEMO',
        template: '',
        service: '',
        scripts: [
            './fullscreenbar/js/angular.js',
            './fullscreenbar/js/ui-core.js',
            './fullscreenbar/js/component/services.js',
            './fullscreenbar/js/pages/templates.js',
            './fullscreenbar/js/lstore.js',
            './fullscreenbar/js/insert.js'
            //'./demo.js'
        ],
        styles: [
            './fullscreenbar/css/angular.css',
            './fullscreenbar/css/components.css'
            //'./demo.css'
        ]
    });
})(__PI__);
