(function(global){
    var settings = global.getSettings();
    top.tlbs = {};
    top.tlbs.templateID = settings.name;
    top.tlbs.toolbarURL = top.tlbs.templatePath = [settings.template, settings.name, ''].join('/');
    top.tlbs.servicePath = [settings.service, settings.name, ''].join('/');

    top.tlbs.sresptime = "20160326112132";
    top.tlbs.dockPosition = false;
    top.tlbs.ballpos = {
        "x": "-0.895",
        "y": "-0.211"
    };
    top.tlbs.dayfirstflag = "0";
    top.tlbs.firstflag = "0";
    top.tlbs.appholder = [{
        appid: "5",
        appcategory: "0",
        apptype: "",
        linktype: "1",
        pageid: "",
        pagemastercomponentid: "",
        supportedlangid: "1",
        uitracingflag: "1",
        url: "http://tb.ifeng.com/index.shtml",
        name: "看新闻",
        defaultimage: "http://toolbar.url.bi/Public/tb/images/_default_1457419016031.png",
        clickedimage: "http://toolbar.url.bi/Public/tb/images/_Clicked_1457419014599.png",
        content: "0"
    }, {
        appid: "2",
        appcategory: "0",
        apptype: "",
        linktype: "0",
        pageid: "iactivity",
        pagemastercomponentid: "",
        supportedlangid: "1",
        uitracingflag: "1",
        url: "",
        name: "天天惠",
        defaultimage: "http://toolbar.url.bi/Public/tb/images/zuixinhuodong_default_1457418690987.png",
        clickedimage: "http://toolbar.url.bi/Public/tb/images/zuixinhuodong_Clicked_1457418700729.png",
        content: "0"
    }, {
        appid: "3",
        appcategory: "0",
        apptype: "",
        linktype: "0",
        pageid: "iappdownload",
        pagemastercomponentid: "",
        supportedlangid: "1",
        uitracingflag: "1",
        url: "",
        name: "玩游戏",
        defaultimage: "http://toolbar.url.bi/Public/tb/images/_default_1457418794869.png",
        clickedimage: "http://toolbar.url.bi/Public/tb/images/_Clicked_1457418804420.png",
        content: "0"
    }, {
        appid: "4",
        appcategory: "0",
        apptype: "",
        linktype: "0",
        pageid: "imineset",
        pagemastercomponentid: "",
        supportedlangid: "1",
        uitracingflag: "1",
        url: "",
        name: "我的",
        defaultimage: "http://toolbar.url.bi/Public/tb/images/wode_default_1457418902827.png",
        clickedimage: "http://toolbar.url.bi/Public/tb/images/wode_Clicked_1457418903497.png",
        content: "0"
    }];
    top.tlbs.csession = "461878259";
})(__PI__);
