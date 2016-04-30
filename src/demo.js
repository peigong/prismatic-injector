(function(global){
    var html = '<button type="button" id="demo">点我</button>';
    var container = document.createElement('div');
    container.innerHTML = html;
    var btn = container.getElementsByTagName('button')[0];
    btn.onclick = function(){
        alert('大爷您好，我是' + this.id + '，很高兴为您服务！');
    };
    global.inject(container);
})(__PI__);
