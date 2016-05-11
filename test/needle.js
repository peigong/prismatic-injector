(function(global){
    var separator = '/';
    var id = '__pi__',
        opt = 'opt.do';

    module('预置环境检查');
    test('检查宿主环境', function(){
        var ele = document.getElementById(id);
        ok(!!ele, '存在切面脚本引用');
        equal(ele.id, id, '切面脚本引用符合要求');
    });

    module('测试针头脚本全局方法和行为');
    test('检查全局命名空间', function(){
        ok(!!global, '全局命名空间已定义');
        equal(typeof global.init, 'function', 'global.init 方法存在');
        equal(typeof global.getSettings, 'function', 'global.getSettings 方法存在');
        equal(typeof global.inject, 'function', 'global.inject 方法存在');
    });
    test('检查调度opt.do的创建', function(){
        var ele = document.getElementById(id);
        var src = ele.src.split(separator);
        src.pop();
        src.push(opt);
        src = src.join(separator);
        var selector = 'script[src$="' + opt + '"]';
        var scripts = document.querySelectorAll(selector);
        equal(scripts.length, 1, 'opt.do 调度脚本创建正确');
    });

    module('测试针头脚本的方法');
    test('检查 global.init 和 global.getSettings 方法', function(){
        var foo = {
            template: 'foo',
            name: 'foo',
            description: 'foo',
            scripts: ['foo.js'],
            styles: ['foo.css']
        };
        global.init(foo);
        var bar = global.getSettings();
        equal(bar.name, foo.name, '配置名节点正确');
        equal(bar.description, foo.description, '配置描述节点正确');
        equal(bar.scripts[0], foo.scripts[0], '配置脚本节点正确');
        equal(bar.styles[0], foo.styles[0], '配置样式节点正确');

        var iframe = document.querySelector('iframe'),
            doc = iframe.contentWindow.document;
        var selector;
        selector = 'script[src="' + [foo.template, foo.name, 'foo.js'].join(separator) + '"]';
        var scripts = doc.querySelectorAll(selector);
        equal(scripts.length, 1, '根据配置在iframe中创建脚本节点正确');
        selector = 'link[href="' + [foo.template, foo.name, 'foo.css'].join(separator) + '"]';
        var styles = document.querySelectorAll(selector);
        equal(styles.length, 1, '根据配置在宿主页面中创建样式节点正确');
    });
    test('检查 global.inject 方法', function(){
        var iframe = document.querySelector('iframe'),
            doc = iframe.contentWindow.document;
        var foo = doc.createElement('foo');
        global.inject(foo);
        var bar = document.querySelectorAll('foo');
        equal(bar.length, 1, '检查注入在iframe中创建的节点');
    });
})(__PI__);
