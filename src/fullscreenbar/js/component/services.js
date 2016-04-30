uiCore.directive('guide', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_bg_guide_block">' 
        + '<div class="c60_fbar_guidemask"></div>' 
        + '<div class="c60_fbar_guideimg"></div>' 
        + '<ul class="c60_fbar_zhidao_ul_circle">' 
        + '<li class="c60_fbar_zh_uc_li_curr" ng-repeat="i in indexarray" ng-style="getcircleStyle($index)"></li>' 
        + '</ul>' 
        + '</div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 
        'coreUtils', 
        'Const', function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {};
            var guideel = angular.element($element[0].querySelector('.c60_fbar_guideimg'));
            $scope.currentIndex = 0;
            $scope.updateData = function(data) {
                var temp = $scope.compData.JS.stepconfig;
                var tmp = [];
                var css = [];
                for (var i = 0; i < 10; i++) {
                    if (temp["step" + i]) {
                        tmp.push(i);
                        css.push(temp["step" + i]);
                    }
                }
                $scope.indexarray = tmp;
                $scope.cssarray = css;
                $scope.maxindex = css.length - 1;
                $scope.ismessagestatuschange = false;
            
            }
            ;
            
            $scope.getcircleStyle = function(index) {
                if ($scope.indexarray.length > 1) {
                    if (index == $scope.currentIndex) {
                        return {
                            'background-color': ''
                        }
                    } else {
                        return {
                            'background-color': '#FFF'
                        }
                    }
                } else {
                    return {
                        'display': 'none'
                    }
                }
            }
            ;
            
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
                $element.css($scope.compData.css || {});
                $scope.updateData();
                $scope.drag();
            }
            ;
            
            $scope.currentIndex = 0;
            $scope.drag = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var _lastYPos = 0;
                var _lastXPos = 0;
                var _currentYPos = 0;
                var _currentXPos = 0;
                guideel.bind(_touchstart, function(e) {
                    
                    _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                
                });
                guideel.bind(_touchmove, function(e) {
                    
                    _currentXPos = e.touches ? e.touches[0].pageX : e.pageX;
                });
                var sendmessagestatuschange = function() {
                    if (false == $scope.ismessagestatuschange) {
                        //add by h00278783 点击弹框，上报状态消息-----------start---
                        if (top.tlbs.messageid != "") {
                            coreService.fireEvent($scope.cid, 'messagestatuschange', {
                                "messageid": top.tlbs.messageid
                            });
                        }
                        //add by h00278783 点击弹框，上报状态消息-----------end---
                    }
                }
                guideel.bind(_touchend, function(e) {
                    var xdistance = _currentXPos - _lastXPos;
                    sendmessagestatuschange();
                    $scope.ismessagestatuschange = true;
                    if (xdistance < 0) {
                        if ($scope.currentIndex < $scope.maxindex) {
                            $scope.currentIndex = $scope.currentIndex + 1
                        } 
                        else {
                            top.tlbs.notificationCdrData = null ;
                            $scope.hide();
                        }
                    
                    } else {
                        if ($scope.currentIndex > 0) {
                            $scope.currentIndex = $scope.currentIndex - 1;
                        }
                    }
                    guideel.css($scope.cssarray[$scope.currentIndex]);
                    $scope.$apply();
                
                });
            }
            ;
            
            $scope.hide = function() {
                $element.css({
                    "display": 'none'
                });
            }
            ;
            $scope.show = function(data) {
                top.tlbs.messageid = data.messageid || "";
                guideel.css($scope.cssarray[0]);
                $scope.currentIndex = 0;
                $element.css({
                    "display": 'block'
                });
            }
            ;
            $scope.eventMap["show"] = $scope.show;
            $scope.eventMap["hide"] = $scope.hide;
            
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
        
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'guide';
            $scope.init();
        }
    }
}
]);
uiCore.directive('togglebtn', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div ng-click="doclick();$event.preventDefault();$event.stopPropagation();" class="c60_fbar_toggle_btn" ccid="detailbtn"></div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 
        'coreUtils', 
        'Const', 
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.eventMap = {};
            $scope.compData = {
                JS: {},
                CSS: {}
            };
            var cur = 0;
            $scope.doclick = function() {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs['cid'], 'btn')
                    };
                    coreUtils.cdrService($scope.compData.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                //var cur = $element[0].getAttribute('state') || '0';
                //$element[0].setAttribute('state', cur == '0' ? '1' : '0');
                coreService.fireEvent($element.attr('cid'), 'toggle' + cur);
                cur = (cur == '0' ? '1' : '0');
                $element.css($scope.compData.JS['state' + cur] || {})
            }
            $scope.changState = function() {
                $element[0].setAttribute('state', '0');
            }
            $scope.eventMap['changState'] = $scope.changState;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                var jsProp = properties.JS || {};
                var cssProp = properties.CSS || {};
                $scope.jsProp = coreUtils.extendDeep($scope.compData.JS, jsProp);
                $scope.cssProp = coreUtils.extendDeep($scope.compData.CSS, cssProp);
                $scope.compData['JS'] = $scope.jsProp;
                $scope.compData['CSS'] = $scope.cssProp;
                $element.css($scope.compData.CSS || {})
                $element.css($scope.compData.JS['state' + cur] || {})
            }
            ;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'togglebtn';
            $scope.init();
        }
    }
}
]);
uiCore.directive('richtrafficdata', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        scope: {
            traffic: '=traffic',
            traffictime: '=traffictime'
        },
        template: '<div class="c60_fbar_liul_text">' 
        + '<p class="c60_fbar_liul_texth1 clearfloat">' 
        + '<span class="c60_fbar_liul_texth1span" ng-bind=remainnumvalue></span>' 
        + '<span class="c60_fbar_liul_texth1spanalarm">' 
        + '<span class="c60_fbar_liul_alarm" ng-bind=alarm></span>' 
        + '<b class="c60_fbar_liul_texth1b" ng-bind=remainfloatvalue></b>' 
        + '</span>' 
        + '</p>' 
        + '<p class="c60-trafficdata-desc">' 
        + '<span class="c60_fbar_liul_textpspan" ng-bind=unit></span>' 
        + '<b class="c60_fbar_liul_textpb" ng-bind=remaintips></b>' 
        + '</p>' 
        + '<p class="c60_fbar_date">' 
        + '<i class="c60_fbar_liul_textpi" ng-bind=traffictime></i>' 
        + '</p>' 
        + '</div>',
        controller: ["$scope", "$element", "$attrs", 'coreService', 
        'coreUtils', 
        'Const', function($scope, $element, $attrs, coreService, coreUtils, Const) {
            
            var integernum = angular.element($element[0].querySelector('.c60_fbar_liul_texth1span'));
            var floatnum = angular.element($element[0].querySelector('.c60_fbar_liul_texth1b'));
            var unit = angular.element($element[0].querySelector('.c60_fbar_liul_textpspan'));
            var desc = angular.element($element[0].querySelector('.c60_fbar_liul_textpb'));
            var alarmtext = angular.element($element[0].querySelector('.c60_fbar_liul_alarm'));
            //var tips = angular.element($element[0].querySelector('.c60_fbar_liul_textpb'));
            $scope.applyConfig = function() {
                var config = coreUtils.String2JSON($attrs['stateconfig']);
                config.num = config.num || {};
                config.desc = config.desc || {};
                config.exceeddesc = config.exceeddesc || config.desc;
                config.exceednum = config.exceednum || config.num;
                var remain = $scope.traffic.remainN.v;
                $scope.unit = $scope.traffic.remainN.u;
                var alarm = config.alarm || {};
                $scope.alarm = alarm.text || '';
                var temp = (Math.abs(remain) + '').split('.');
                $scope.remainnumvalue = temp[0]
                if (temp[1]) {
                    $scope.remainfloatvalue = '.' + temp[1]
                
                }
                var descstyle = remain > 0 ? config.desc.style : config.exceeddesc.style;
                var numstyle = remain > 0 ? config.num.style : config.exceednum.style;
                if (remain < 0) {
                    $scope.remaintips = $scope.traffic.desc.overflowdesc;
                
                } else {
                    $scope.remaintips = $scope.traffic.desc.remaindesc;
                
                }
                desc.css(descstyle || {});
                unit.css(descstyle || {});
                integernum.css(numstyle || {});
                floatnum.css(numstyle || {});
                alarmtext.css(alarm.style || {})
            
            }
            ;
            
            $scope.$watch($attrs, function() {
                //console.log($attrs.stateconfig)
                $scope.applyConfig();
            
            });
        }
        
        ],
        link: function($scope, $element, $attrs, ctl) {}
    }
}
]);
uiCore.directive('trafficdata', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_top_left">' 
        + '<p class="c60_fbar_top_leftp"><b class="c60_fbar_top_leftpb" ng-bind=value.desc></b><span class="c60_fbar_top_leftpspan" ng-bind=value.u></span></p>' 
        + '<p class="c60_fbar_top_leftp" ng-bind=value.v></p>' 
        + '</div>',
        scope: {
            value: '=value',
        },
        controller: ["$scope", "$element", "$attrs", 'coreService', 
        'coreUtils', 
        'Const', function($scope, $element, $attrs, coreService, coreUtils, Const) {}
        
        ],
        link: function() {}
    }
}
]);
uiCore.directive('summary', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_summary" event="noevent">' + '<abnormaltips ng-click="ballclick()" ng-show="compData.JS.errortipsshow"></abnormaltips>' + '<div class="c60_fbar_liul_tab">' + '<ul class="c60_fbar_liul_tab_ul">' + '<li class="c60_fbar_liul_tab_li" ccid="c60_fbar_liul_tab_li" ng-style="getFontColor($index)" ng-click="tabClick($event,$index,trafficlist.length,this);" ng-repeat="category in trafficlist" ng-bind=category.categoryname></li>' + '</ul>' + '</div>' + '<div class="c60_fbar_liul_tab_container_div"><dl ng-style="getWidth(trafficlist.length)" class="c60_fbar_liul_tab_container_dl">' + '<dd class="c60_fbar_liul_tab_container_dd" ng-repeat="traffic in trafficlist">' + '<div class="c60_fbar_liul_tab_container_dd_left"><trafficdata  value=traffic.leftdata></trafficdata></div>' + '<div class="c60_fbar_liul_tab_ul">' + '<trafficball ng-click="ballclick()" ccid="c60_fbar_trafficball" index=$index traffic=traffic traffictime=traffictime stateconfig="{{::compData.JS}}"></trafficball>' + '</div>' + '<div class="c60_fbar_liul_tab_container_dd_right"><trafficdata  value=traffic.rightdata></trafficdata></div>' + '</div></dd></dl></div></div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 
        'coreUtils', 
        'Const', "$compile", 
        function($scope, $element, $attrs, coreService, coreUtils, Const, $compile) {
            $scope.compData = {
                js: {},
                css: {}
            
            };
            $scope.eventMap = {};
            var dl = null ;
            var ballcontainer = null ;
            $scope.currentIndex = 0;
            $scope.getFontColor = function(index) {
                if (index == $scope.currentIndex) {
                    return {
                        'color': '#fff'
                    };
                
                } else
                    return {
                        'color': '#0d7164'
                    };
            
            }
            ;
            var tracingcdr = function(index) {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_liul_tab_li.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': $scope.trafficlist[index].category || '-1'
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_liul_tab_li.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
            }
            $scope.drag = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var _lastYPos = 0;
                var _lastXPos = 0;
                var _currentYPos = 0;
                var _currentXPos = 0;
                var ballcontainer = angular.element($element[0].querySelector('.c60_fbar_liul_tab_container_div'));
                var moveflag = false;
                ballcontainer.bind(_touchstart, function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    moveflag = false;
                    _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                
                });
                ballcontainer.bind(_touchmove, function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    _currentYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    _currentXPos = e.touches ? e.touches[0].pageX : e.pageX;
                    moveflag = true;
                
                });
                
                ballcontainer.bind(_touchend, function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    var xdistance = _currentXPos - _lastXPos;
                    var ydistance = _currentYPos - _lastYPos;
                    if (moveflag && Math.abs(xdistance) > 5) {
                        if (xdistance < 0) {
                            if ($scope.currentIndex < $scope.totallength - 1) {
                                $scope.currentIndex = $scope.currentIndex + 1;
                                tracingcdr($scope.currentIndex);
                            }
                        } else {
                            if ($scope.currentIndex > 0) {
                                $scope.currentIndex = $scope.currentIndex - 1;
                                tracingcdr($scope.currentIndex);
                            }
                        }
                        $scope.$apply();
                        
                        $scope.slideBall($scope.currentIndex, $scope.totallength);
                    }
                });
            
            }
            ;
            
            $scope.ballclick = function() {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_trafficball.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs['cid'], 'ball')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_trafficball.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($element.attr('cid'), "ballclick");
            
            }
            
            $scope.tabClick = function(e, index, length, el) {
                tracingcdr(index);
                e.preventDefault();
                e.stopPropagation();
                $scope.currentIndex = index;
                $scope.slideBall(index, length);
            
            }
            ;
            
            $scope.slideBall = function(index, length) {
                
                dl = dl || angular.element($element[0].querySelector('.c60_fbar_liul_tab_container_dl'));
                var percent = index * 100 / length;
                dl.css('-webkit-transform', 'translate(-' + percent + '%,0px)');
                dl.css('-moz-transform', 'translate(-' + percent + '%,0px)');
                dl.css('-ms-transform', 'translate(-' + percent + '%,0px)');
                dl.css('-o-transform', 'translate(-' + percent + '%,0px)');
            }
            ;
            $scope.getWidth = function(count) {
                $scope.totallength = count;
                return {
                    'width': (count * 100) + '%'
                };
            
            }
            ;
            
            var transferK = function(value) {
                return coreUtils.trafficValueTransferfromKB(value, Number($scope.compData.JS.floatnum || 2));
            }
            ;
            
            var transferTrafficdata = function(trafficarray) {
                var numfloat = Number($scope.compData.JS.floatnum || 2);
                if (trafficarray) {
                    var temp = null ;
                    for (var i = 0, len = trafficarray.length; i < len; i++) {
                        temp = trafficarray[i];
                        temp.ecid = $scope.cid;
                        var remain = Number(temp.total) - Number(temp.used);
                        var overflow = Number(temp.overflow);
                        var remainN;
                        var datadesc = $scope.compData.JS.datadesc[temp.categoryType + ''] || {
                            totaldesc: "总流量",
                            useddesc: '已用流量',
                            remaindesc: '剩余流量',
                            overflowdesc: '超出流量',
                            dayleftdesc: '日均可用'
                        };
                        temp.desc = datadesc;
                        var iskbunit = function(type) {
                            
                            return !type || type == '2';
                        
                        }
                        ;
                        
                        //only traffic data need transfer
                        if (iskbunit(temp.categoryType)) {
                            temp.totalN = transferK(temp.total);
                            temp.totalN.desc = datadesc.totaldesc;
                            temp.usedN = transferK(temp.used);
                            temp.usedN.desc = datadesc.useddesc;
                            if (temp.dateleft || (temp.dateleft == 0)) {
                                temp.dayleftN = transferK(temp.dateleft);
                                temp.dayleftN.desc = datadesc.dayleftdesc;
                            }
                        } else {
                            temp.totalN = {
                                v: coreUtils.formatNum(temp.total, numfloat),
                                u: temp.unit,
                                desc: datadesc.totaldesc
                            };
                            temp.usedN = {
                                v: coreUtils.formatNum(temp.used, numfloat),
                                u: temp.unit,
                                desc: datadesc.useddesc
                            };
                            if (temp.dateleft || (temp.dateleft == 0)) {
                                temp.dayleftN = {
                                    v: coreUtils.formatNum(temp.dateleft, numfloat),
                                    u: temp.unit,
                                    desc: datadesc.dayleftdesc
                                };
                            }
                        }
                        var showItems = ($scope.compData.JS.showItem || 'total,used').split(",");
                        temp.leftdata = temp[showItems[0] + 'N'] || {
                            v: '',
                            u: ''
                        };
                        temp.rightdata = temp[showItems[1] + 'N'] || {
                            v: '',
                            u: ''
                        };
                        if (overflow > 0) {
                            if (iskbunit(temp.categoryType)) {
                                remainN = transferK(overflow);
                            } else {
                                remainN = {
                                    v: coreUtils.formatNum(overflow, numfloat),
                                    u: temp.unit
                                };
                            }
                            remainN.v = 0 - remainN.v;
                        } else {
                            if (iskbunit(temp.categoryType)) {
                                remainN = transferK(remain);
                            } else {
                                remainN = {
                                    v: coreUtils.formatNum(remain, numfloat),
                                    u: temp.unit
                                }
                            }
                        }
                        if (remain != 0 && remainN.v == 0) {
                            remainN.v = 0.01;
                        }
                        temp.remainN = remainN;
                    }
                
                }
            }
            ;
            
            $scope.update = function(data) {
                if (data.respparam) {
                    var trafficlistemp;
                    $scope.totallength = 0;
                    if (data.respparam.trafficusage.traffics !== undefined && data.respparam.trafficusage.traffics !== '' && data.respparam.trafficusage.traffics !== null ) {
                        trafficlistemp = data.respparam.trafficusage.traffics;
                        transferTrafficdata(trafficlistemp);
                        
                        $scope.trafficlist = trafficlistemp;
                        $scope.traffictime = data.respparam.trafficusage.traffictime;
                        $scope.totallength = data.respparam.trafficusage.traffics.length;
                    }
                    
                    if ($scope.totallength == 0) {
                        $scope.compData.JS.errortipsshow = true;
                        $scope.showError({
                            'errorcode': 'nodata'
                        });
                    } else {
                        $scope.compData.JS.errortipsshow = false;
                    
                    }
                }
            }
            $scope.getparam = function(name) {
                try {
                    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
                    var r = top.window.location.search.substr(1).match(reg);
                    if (r != null )
                        return unescape(r[2]);
                    return "";
                } 
                catch (e) {
                
                }
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.JS = properties.JS || {};
                $element.css($scope.compData.css);
                $scope.drag();
                $scope.$broadcast('abnormaltipsinit', $scope.compData.JS.errortipsconfig);
                //用于appbar直接显示页面订购
                if ($scope.getparam('subscribeid') && $scope.getparam('appkey')) {
                    coreService.fireEvent($attrs['cid'], 'init1');
                    top.subscribeid = $scope.getparam('subscribeid');
                    //用于appbar有subscribeid时其他组件判断
                    top.subscribeid1 = top.subscribeid;
                } else {
                    coreService.fireEvent($attrs['cid'], 'init');
                }
                
                initCategoryTabStyle();
            }
            ;
            
            var initCategoryTabStyle = function() 
            {
                var elementTab = angular.element($element[0].querySelector('.c60_fbar_liul_tab'));
                var isShowCategoryTab = $scope.compData.JS.showCategoryTab && $scope.compData.JS.showCategoryTab == true;
                var showCategoryTab = isShowCategoryTab ? "visible" : "hidden";
                elementTab.css("visibility", showCategoryTab);
            }
            ;
            
            
            $scope.showError = function(data) {
                var errorcode = data.errorcode;
                $scope.compData.JS.errortipsshow = true;
                $scope.trafficlist = null ;
                //$scope.compData.JS.tipsconfig = $scope.compData.JS.errortips[errorcode] || $scope.compData.JS.errortips['default'];
                $scope.$broadcast('trafficquryerror', {
                    'errorcode': errorcode
                });
            }
            ;
            
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            $scope.changesrc = function(data) {
                if (data && data.ordersrc) {
                    top.tlbs.ordersrc = data.ordersrc;
                }
            }
            ;
            $scope.eventMap['changesrc'] = $scope.changesrc;
            $scope.eventMap['update'] = $scope.update;
            $scope.eventMap['showerror'] = $scope.showError;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            
            $scope.pageID = ctl.pageID;
            $scope.cid = $attrs['cid'];
            $scope.componentType = 'summary';
            $scope.init();
        
        }
    }
}
]);
uiCore.directive('trafficball', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_liul_tab_box"><div class="c60_fbar_liul_tab_cont"><div class="c60_fbar_trafficball"><div class="c60_fbar_trafficball_img"></div><richtrafficdata traffic=traffic traffictime=traffictime stateconfig="{{::config.descConfig}}"></richtrafficdata></div>',
        scope: {
            traffic: '=traffic',
            traffictime: '=traffictime',
            index: '=index'
        },
        controller: ["$scope", "$element", "$attrs", 'coreService', 
        'coreUtils', 
        'Const', "$timeout", 
        function($scope, $element, $attrs, coreService, coreUtils, Const, $timeout) {
            
            var $imageElement = angular.element($element[0].querySelector('.c60_fbar_trafficball_img'));
            $scope.updatecount = 0;
            $scope.getStates = function(value) {
                //在summary.js中传值是这样的stateconfig="{{::compData.js}}"
                var states = coreUtils.String2JSON($attrs.stateconfig);
                for (var i = 0; i < 10; i++) {
                    var state = states['state' + i];
                    if (state) {
                        if (value <= Number(state.maxvalue) && value > Number(state.minvalue)) {
                            return {
                                ballStyle: state.config.ballStyle,
                                imageStyle: state.config.imageStyle,
                                descConfig: state.config.descConfig
                            };
                        }
                    }
                }
                return {
                    ballStyle: {},
                    imageStyle: {},
                    descConfig: {}
                };
            }
            ;
            
            $scope.createAnmiateFrame = function() {
                var percent = $scope.currentpercent;
                var styleSheets = top.document.styleSheets;
                var ypos = (1 - percent) * 12.5;
                
                var animationName = 'ui-com-trafficball-wave-animation-' + $scope.index + '-' + $scope.updatecount;
                $scope.updatecount++;
                try {
                    
                    var sheets = top.document.styleSheets;
                    var lastSheet = null ;
                    var len = 0;
                    for (var i in sheets) {
                        /*add href check to avoid dynamilly added css override keyframe*/
                        //firefox 非同源css操作会报insecure错误，所以此处需要捕获异常
                        try {
                            if (sheets[i].cssRules && sheets[i].title != 'toolbar') {
                                lastSheet = sheets[i];
                                len = sheets[i].cssRules.length;
                                break;
                            }
                        } catch (e) {}
                    }
                    var csstext = animationName + ' { 0% {background-position: 0 ' + ypos + 'em;} 100% {background-position: 12.5em ' + ypos + 'em;}}';
                    
                    try {
                        lastSheet.insertRule('@-webkit-keyframes ' + csstext, len);
                    } catch (e) {
                        try {
                            lastSheet.insertRule('@-moz-keyframes ' + csstext, len);
                        } catch (e) {
                            try {
                                lastSheet.insertRule('@keyframes ' + csstext, len);
                            } catch (e) {
                                try {
                                    lastSheet.insertRule('@-o-keyframes ' + csstext, len);
                                } catch (e) {
                                    throw e;
                                }
                            }
                        }
                    
                    }
                    ;
                    
                    $imageElement.css({
                        '-webkit-animation': animationName + ' 1s linear infinite',
                        'animation': animationName + ' 1s infinite linear',
                        '-moz-animation': animationName + ' 1s infinite linear',
                        '-webkit-animation': animationName + ' 1s infinite linear',
                        '-o-animation': animationName + ' 1s infinite linear',
                        "-webkit-transform": "translate3d(0,0,0)",
                        "transform": "translate3d(0,0,0)",
                    })
                } catch (e) {
                    
                    $imageElement.css({
                        'background-position': '0px ' + ypos + 'em'
                    });
                
                }
            }
            ;
            
            $scope.show = function() {
                var param = $scope.traffic;
                if (param) {
                    var total = param.total || 0;
                    ;
                    var used = param.used || 0;
                    var remain = total - used;
                    remain = remain < 0 ? 0 : remain;
                    $scope.ecid = param.ecid;
                    
                    var remainPercentage = 0;
                    if (total != 0) {
                        remainPercentage = Number(remain / total * 100)
                    }
                    ;
                    
                    $scope.currentpercent = remainPercentage / 100;
                    $scope.createAnmiateFrame();
                    $timeout($scope.createAnmiateFrame, 2000);
                    var config = null ;
                    if (remainPercentage == 0) {
                        config = $scope.getStates(remainPercentage + 0.001);
                    } else {
                        config = $scope.getStates(remainPercentage)
                    }
                    if (config) {
                        $scope.config = config;
                        $imageElement.css(config.imageStyle || {});
                        $element.css(config.ballStyle || {});
                    
                    }
                
                }
            }
            ;
            
            $scope.$watch($attrs, function() {
                $scope.show();
            
            });
            $scope.init = function() {
                try {
                    var height = parseInt(top.window.innerHeight);
                    if (height <= 375) {
                        
                        $element.css({
                            'margin-top': '0em'
                        });
                    }
                } catch (e) {}
            
            }
            ;
        }
        
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.init();
        }
    }
}
]);
uiCore.directive('abnormaltips', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_abnormalwrapper">' 
        + '<div class="c60_fbar_abnormalicon">' 
        + '<span class="c60_fbar_abnormalspan"></span>' 
        + '</div>' 
        + '<div class="c60_fbar_abnormaldesc" ng-bind="compData.js.description"></div>' 
        + '</div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 
        'coreUtils', 
        'Const', function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.eventMap = {};
            $scope.compData = {
                js: {},
                css: {}
            };
            
            var wrapper = $element;
            var errorconfig = null ;
            var icon = angular.element($element[0].querySelector('.c60_fbar_abnormalicon'));
            var text = angular.element($element[0].querySelector('.c60_fbar_abnormalspan'));
            var desc = angular.element($element[0].querySelector('.c60_fbar_abnormaldesc'));
            $scope.init = function(data) {
                
                wrapper.css(data.CSS || {});
                icon.css(data.JS.icon || {});
                text.css(data.JS.text || {});
                desc.css(data.JS.desc || {});
                errorconfig = data.JS.errorcodetips;
            }
            ;
            
            $scope.show = function(data) {
                var config = errorconfig[data.errorcode] || errorconfig['default'] || {};
                var iconstyle = config.CSS || {};
                var description = config.JS ? config.JS.description : '';
                $scope.compData.js.description = description;
                icon.css(iconstyle);
            }
            $scope.$on('trafficquryerror', function(event, data) {
                $scope.show(data);
            
            });
            
            $scope.$on('abnormaltipsinit', function(event, data) {
                $scope.init(data);
            
            });
        
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'abnormaltips';
            //$scope.init();
        }
    }
}
]);
uiCore.directive('storefee', [function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_feewrapdiv"><div class="c60_fbar_feewrap">' 
        + '<div class="c60_fbar_feecontentwrap" >' 
        + '<div class="c60_fbar_feecons" ng-repeat="fee in feepkg">' 
        + '<div class="c60_fbar_feecon_title c60_fbar_clearfloat"><div class="c60_fbar_feecon_title_type ng-binding" style="background:{{fee.ccolor}}" ng-bind="fee.text==\'当前\'?fee.text:\'B\'"></div><div class="c60_fbar_feecon_title_price" style="background:{{fee.ccolor}}"><span class="c60_fbar_feecon_title_price_color" ><span class="c60_fbar_feecon_title_price_left_color" ng-bind="fee.name"></span><span class="c60_fbar_feecon_title_price_right_color" ng-bind="compData.JS.priceunit.value+fee.price"></span></span></div></div>' 
        + '<div class="c60_fbar_feecon_comwrap"><div ng-show="fee.comboProperies.length>0?true:false" class="c60_fbar_feecon_txt" ng-repeat="com in fee.comboProperies" ng-bind="compData.JS.keyconfig[com.key].key+\':\'+com.value" ng-style="compData.JS.cssconfig[fee.comboProperies.length].CSS"></div><div class="c60_fbar_feecon_effecttype" ng-show="fee.effecttype!=undefined&&fee.effecttype!=null&&fee.effecttype!=\'\'" ng-bind="compData.JS.effectconfig[fee.effecttype].value"></div><div class="c60_fbar_feecon_txtdesc" ng-style="compData.JS.txtdesc.CSS" ng-bind-html="to_trusted(fee.desc)"></div></div>' 
        + '</div>' 
        + '</div>' 
        + '<div class="c60_fbar_comments" ng-bind="compData.JS.comments.text"></div></div>' 
        + '<div class="c60_fbar_changeorderbtn"><button class="c60_fbar_btn_changeorderd" ccid="c60_fbar_btn_changeorderd" ng-click="changebtn()" ng-bind="btncon"></button></div>' 
        + '</div></div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 
        'coreUtils', '$sce', 
        'Const', function($scope, $element, $attrs, coreService, coreUtils, $sce, Const) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {},
                'JS': {}
            };
            var changebtn = angular.element($element[0].querySelector('.c60_fbar_btn_changeorderd'));
            $scope.to_trusted = function(text) {
                if (text != null  && text != undefined) {
                    text = text + '';
                    return $sce.trustAsHtml(text.replace(/\n/g, "<br/>"));
                } else {
                    return "";
                }
            }
            ;
            $scope.update = function(param) {
                if (param) {
                    
                    $scope.pmdatas = param.pmdatas || '',
                    $scope.feepkg = param.pmdata || '';
                    var ccolor = [$scope.feepkg[0].color, $scope.feepkg[1].color];
                    $scope.feepkg[0].ccolor = ccolor[1];
                    $scope.feepkg[1].ccolor = ccolor[0];
                    $scope.btncon = $scope.compData.JS.buttonconfig.text || '';
                    $scope.taskId = param.taskId || '';
                }
            }
            ;
            $scope.changebtn = function() {
                if (top.tlbs.messageid != "") {
                    coreService.fireEvent($scope.cid, 'messagestatuschange', {
                        "messageid": top.tlbs.messageid
                    });
                }
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.changeorderdbtn.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'btn'),
                        'iseComp': '1'
                    };
                    coreUtils.cdrService($scope.compData.JS.changeorderdbtn.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($scope.cid, 'receive', {
                    'pmdata': $scope.pmdatas,
                    'taskId': $scope.taskId
                });
            }
            ;
            $scope.eventMap['update'] = $scope.update;
            $scope.extendComponentData = function(componetData) {
                coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
                $element.css($scope.compData.CSS || {});
                $scope.extendComponentData(coreService.getInitProperties($scope.cid) || {});
            }
            ;
            
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'storefee';
            $scope.init();
        }
    }
}
]);
uiCore.directive('buoy', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_buoy" ccid="c60_fbar_buoy"><div class="c60_fbar_buoy_img">&nbsp;</div><div class="c60_fbar_buoy_value"><span class="c60_fbar_buoy_value_percent" ng-bind="compData.JS.value"></span></div></div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils', 'Const', '$timeout', '$interval', function($scope, $element, $attrs, coreService, coreUtils, Const, $timeout, $interval) {
            $scope.cid = $attrs.cid;
            $scope.compData = {
                js: {},
                css: {}
            };
            var keyframeindex = 0;
            $scope.eventMap = {};
            $scope.doclick = function() {
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click');
            }
            ;
            var $imageElement = angular.element($element[0].querySelector('.c60_fbar_buoy_img'));
            var $valueElement = angular.element($element[0].querySelector('.c60_fbar_buoy_value'));
            var $valuespan = angular.element($element[0].querySelector('.c60_fbar_buoy_value_percent'));
            var posx = 0;
            var posy = 0;
            var setPostion = function(posx, posy) {
                $element.css('-webkit-transform', 'translate(' + posx + 'px,' + posy + 'px)');
                $element.css('-moz-transform', 'translate(' + posx + 'px,' + posy + 'px)');
                $element.css('-ms-transform', 'translate(' + posx + 'px,' + posy + 'px)');
                $element.css('-o-transform', 'translate(' + posx + 'px,' + posy + 'px)');
            }
            ;
            $scope.getStates = function(value) {
                for (var i = 0; i < 10; i++) {
                    var state = $scope.compData.JS['state' + i];
                    if (state) {
                        if (value <= Number(state.maxvalue) && value > Number(state.minvalue)) {
                            return {
                                valueStyle: state.valueStyle,
                                imageStyle: state.imageStyle
                            };
                        }
                    }
                }
                return {
                    valueStyle: {},
                    imageStyle: {}
                };
            }
            ;
            $scope.createAnmiateFrame = function(percent) {
                var ypos = (1 - percent) * ($scope.compData.JS.height || 2.8);
                try {
                    keyframeindex++;
                    var csstext = "c60_fbar_buoy_wave_animation" + "_" + (keyframeindex) + "{0% {background-position: 0 " + ypos + "em;} 100% {background-position: 2.84em " + ypos + "em;}}";
                    var sheets = top.document.styleSheets;
                    var lastSheet = null ;
                    var len = 0;
                    var length = sheets.length;
                    for (var i in sheets) {
                        //firefox 非同源css操作会报insecure错误，所以此处需要捕获异常
                        try {
                            if (sheets[i].cssRules && sheets[i].title != 'toolbar') {
                                lastSheet = sheets[i];
                                len = sheets[i].cssRules.length;
                                break;
                            }
                        } 
                        catch (e) {}
                    }
                    try {
                        lastSheet.insertRule("@-webkit-keyframes " + csstext, len);
                    } catch (e) {
                        try {
                            lastSheet.insertRule("@keyframes  " + csstext, len);
                        } catch (e) {
                            try {
                                lastSheet.insertRule("@-moz-keyframes  " + csstext, len);
                            } catch (e) {
                                try {
                                    lastSheet.insertRule("@-o-keyframes  " + csstext, len);
                                } catch (e) {
                                    throw e;
                                }
                            }
                        }
                    }
                    
                    var tempvalue = [];
                    tempvalue.push("c60_fbar_buoy_wave_animation_" + keyframeindex);
                    tempvalue.push($scope.compData.JS.animation.duration || '1s');
                    tempvalue.push($scope.compData.JS.animation.times || 'infinite');
                    tempvalue.push($scope.compData.JS.animation.func || 'linear');
                    var cssvalue = tempvalue.join(" ");
                    var csstxt = {
                        "-moz-animation": cssvalue,
                        "-o-animation": cssvalue,
                        "-webkit-animation": cssvalue,
                        "animation": cssvalue
                    };
                    $imageElement.css(csstxt);
                } catch (e) {
                    console.log(e);
                    $imageElement.css({
                        'background-position': '0 ' + ypos + 'em',
                    });
                }
            }
            ;
            $scope.createJumpAnmiateFrame = function() {
                var position = (parseInt(top.window.getComputedStyle($element[0], null )['width']) - top.window.innerWidth) / 2;
                try {
                    var sheets = top.document.styleSheets;
                    var lastSheet = null ;
                    var len = 0;
                    for (var i = sheets.length - 1; i >= 0; i--) {
                        if (sheets[i].cssRules && sheets[i].href) {
                            lastSheet = sheets[i];
                            len = sheets[i].cssRules.length;
                            break;
                        }
                    }
                    try {
                        var csstext = "@-webkit-keyframes c60_fbar_buoy_jump_animation {0% {-webkit-transform: translate(" + position + "px, -300px);} 40% { -webkit-transform: translate(" + position + "px, -0px);} 60% {-webkit-transform: translate(" + position + "px, -80px);} 70% {-webkit-transform: translate(" + position + "px, -0px);} 80% {-webkit-transform: translate(" + position + "px, -30px);} 90% {-webkit-transform: translate(" + position + "px, 0px);} 100% {-webkit-transform: translate(" + position + "px, 0px);}}";
                        lastSheet.insertRule(csstext, len);
                    } catch (e) {
                        try {
                            lastSheet.insertRule("@keyframes c60_fbar_buoy_jump_animation {0% {transform: translate(-500px, -300px);} 40% { transform: translate(-500px, -0px);} 60% {transform: translate(-500px, -80px);} 70% {transform: translate(-500px, -0px);} 80% {transform: translate(-500px, -30px);} 90% {transform: translate(-500px, 0px);} 100% {transform: translate(-500px, 0px);}}", len);
                        } catch (e) {
                            try {
                                lastSheet.insertRule("@-moz-keyframes c60_fbar_buoy_jump_animation {0% {-moz-transform: translate(-500px, -300px);} 40% { -moz-transform: translate(-500px, -0px);} 60% {-moz-transform: translate(-500px, -80px);} 70% {-moz-transform: translate(-500px, -0px);} 80% {-moz-transform: translate(-500px, -30px);} 90% {-moz-transform: translate(-500px, 0px);} 100% {-moz-transform: translate(-500px, 0px);}}", len);
                            } catch (e) {
                                try {
                                    lastSheet.insertRule("@-o-keyframes c60_fbar_buoy_jump_animation {0% {-o-transform: translate(-500px, -300px);} 40% { -o-transform: translate(-500px, -0px);} 60% {-o-transform: translate(-500px, -80px);} 70% {-o-transform: translate(-500px, -0px);} 80% {-o-transform: translate(-500px, -30px);} 90% {-o-transform: translate(-500px, 0px);} 100% {-o-transform: translate(-500px, 0px);}}", len);
                                } catch (e) {
                                    throw e
                                }
                            }
                        }
                    }
                    $element.css($scope.compData.JS.jumpanimation);
                } catch (e) {
                    $element.css({
                        'display': 'block'
                    });
                }
            }
            
            $scope.showerror = function() {
                $imageElement.css($scope.compData.JS.defaultImageStyle || {});
            }
            ;
            
            $scope.show = function(data) {
                var respparam = data.respparam;
                if (respparam && respparam.trafficusage) {
                    var param = respparam.trafficusage;
                    
                    var total = param.total;
                    var used = param.used;
                    if ($scope.total == total && $scope.used == used) {
                        return;
                    } else {
                        $scope.total = total;
                        $scope.used = used;
                    }
                    
                    var remain = total - used;
                    remain = remain < 0 ? 0 : remain;
                    var floatcount = $scope.compData.JS.floatcount || 2;
                    var remainPercentage = "0";
                    if (total != 0) {
                        remainPercentage = Number(remain / total * 100).toFixed(floatcount);
                    } else {
                        $imageElement.css($scope.compData.JS.defaultImageStyle || {});
                        $valueElement.css($scope.compData.JS.defaultValueStyle || {});
                        return true;
                    }
                    if ($scope.compData.JS.threshold && Number(remainPercentage) > Number($scope.compData.JS.threshold)) {
                        $imageElement.css($scope.compData.JS.defaultImageStyle || {});
                        $valueElement.css($scope.compData.JS.defaultValueStyle || {});
                        return true;
                    }
                    $scope.createAnmiateFrame(remainPercentage / 100);
                    var config = null ;
                    if (remainPercentage == 0.00) {
                        config = $scope.getStates(Number(remainPercentage) + 0.001);
                    } else {
                        config = $scope.getStates(Number(remainPercentage))
                    }
                    if (config) {
                        $imageElement.css(config.imageStyle);
                        $valueElement.css(config.valueStyle);
                        if (config.valueStyle.color) {
                            $valuespan.css({
                                'color': config.valueStyle.color
                            });
                        }
                    }
                    var valueArray = remainPercentage.split(".");
                    if (valueArray.length == 2 && Number(valueArray[1]) == 0) {
                        remainPercentage = valueArray[0];
                    }
                    $scope.compData.JS.value = remainPercentage + '%';
                }
            
            }
            ;
            $scope.setInitPosition = function() {
                var pos = top.tlbs.ballpos;
                if (pos) {
                    if (Number(pos.x || '0') !== 0) {
                        posx = parseInt(top.window.getComputedStyle($element[0], null )['width']) - top.window.innerWidth;
                        posy = Number(pos.y || '0') * top.window.innerHeight;
                    } else {
                        posx = 0;
                        posy = Number(pos.y || '0') * top.window.innerHeight;
                    }
                }
                setPostion(posx, posy);
            
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.JS = properties.JS || {};
                $element.css($scope.compData.css);
                $imageElement.css($scope.compData.JS.defaultImageStyle || {});
                $valueElement.css($scope.compData.JS.defaultValueStyle || {});
                $scope.setInitPosition();
                if (top.tlbs.dayfirstflag == '1') {
                    $scope.createJumpAnmiateFrame();
                }
                if ($scope.compData.JS.timerstate) {
                    $scope.compData.JS.timerstate = false;
                    $scope.startAutoStateChangeTimer(null , null );
                }
                coreService.fireEvent($element.attr('cid'), 'init');
                
                //add by h00278783 09-06  DTS2015082904394 展示用户数统计不准 start
                var cdrConfig = {
                    'cdrType': 'uidisplaycdr',
                    'enable': true,
                    'storeData': false
                };
                var cdrDataOpen = {
                    'pageId': 'ibuoy',
                    'displayType': 1,
                    'displayResult': 0
                };
                coreUtils.cdrService(cdrConfig, cdrDataOpen);
                //add by h00278783 09-06  DTS2015082904394 展示用户数统计不准 end
            }
            ;
            $scope.drag = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var windowWidth = 0;
                var windowHeight = 0;
                var width = 0;
                var height = 0;
                var moveflag = false;
                $element.bind(_touchstart, function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    windowWidth = top.window.innerWidth;
                    windowHeight = top.window.innerHeight;
                    var _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    var _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                    var touch = function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        $scope.stopAutoStateChangeTimer();
                        var _currentYPos = e.touches ? e.touches[0].pageY : e.pageY;
                        var _currentXPos = e.touches ? e.touches[0].pageX : e.pageX;
                        var ydistance = _currentYPos - _lastYPos;
                        var xdistance = _currentXPos - _lastXPos;
                        _lastYPos = _currentYPos;
                        _lastXPos = _currentXPos;
                        if (Math.abs(ydistance) > 3 || Math.abs(xdistance) > 3 || moveflag) {
                            moveflag = true;
                            posx = posx + xdistance;
                            posy = posy + ydistance;
                            setPostion(posx, posy);
                        }
                    }
                    ;
                    var endTouch = function(e) {
                        try {
                            e.stopPropagation();
                            e.preventDefault();
                            $scope.startAutoStateChangeTimer();
                            if (!moveflag) {
                                var param = {
                                    "pageId": "ibuoy",
                                    "pageid": "summarypage"
                                };
                                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.cdrConfig)) {
                                    $scope.compData.JS['cdrData'] = {};
                                    $scope.compData.JS.cdrData = {
                                        'pageId': $scope.pageID,
                                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'btn'),
                                        'iseComp': '1'
                                    };
                                    
                                    coreUtils.cdrService($scope.compData.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                                
                                }
                                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click');
                            } else {
                                width = parseInt(top.window.getComputedStyle($element[0], null )['width']);
                                height = parseInt(top.window.getComputedStyle($element[0], null )['height']);
                                if (posx > 0) {
                                    posx = 0
                                } else if (Math.abs(posx) * 2 > windowWidth) {
                                    posx = 0 - windowWidth + width;
                                } else
                                    (posx = 0);
                                if (posy > 0) {
                                    posy = 0
                                } else if (Math.abs(posy) > windowHeight - height) {
                                    posy = 0 - windowHeight + height;
                                }
                                setPostion(posx, posy);
                                coreService.fireEvent($element.attr('cid'), 'positionchange', {
                                    x: Number(posx / windowWidth).toFixed(3),
                                    y: Number(posy / windowHeight).toFixed(3)
                                });
                            }
                        } 
                        finally {
                            moveflag = false;
                            top.document.removeEventListener(_touchmove, touch, false);
                            top.document.removeEventListener(_touchend, endTouch, false);
                        }
                    }
                    ;
                    top.document.addEventListener(_touchmove, touch, false);
                    top.document.addEventListener(_touchend, endTouch, false);
                });
            }
            ;
            $scope.startAutoStateChangeTimer = function(stateObject, deferred) {
                if (!$scope.compData.JS.timerstate) {
                    $scope.compData.JS.timerstate = true;
                    $scope.timerInterval = $interval(function() {
                        $scope.compData.JS.stateconfig.state = 0;
                        var state = $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state];
                        $element.css(state);
                        $interval.cancel($scope.timerInterval);
                        $scope.compData.JS.timerstate = false;
                    }, $scope.compData.JS.autostatechangetimeout)
                }
                if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            $scope.stopAutoStateChangeTimer = function(stateObject, deferred) {
                $interval.cancel($scope.timerInterval);
                $scope.compData.JS.stateconfig.state = 1;
                $scope.compData.JS.timerstate = false;
                var state = $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state];
                $element.css(state);
            }
            ;
            $scope.eventMap['startAutoStateChangeTimer'] = $scope.startAutoStateChangeTimer;
            $scope.eventMap['stopAutoStateChangeTimer'] = $scope.stopAutoStateChangeTimer;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            $scope.eventMap['show'] = $scope.show;
            $scope.eventMap['showerror'] = $scope.showerror;
            $scope.hide = function() {
                $element.css("display", "none");
            }
            ;
            $scope.eventMap['hide'] = $scope.hide;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'buoy';
            $scope.init();
            $scope.drag();
        }
    }
}
]);
uiCore.directive('store', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        /*template : '<div ng-class="{\'c60_fbar_store\':true}" class="c60_fbar_store">' + '<div ng-class="{\'c60_fbar_tab\':true}">' + '<ul ng-class="{\'c60_fbar_tabList\':true}" ng-style="getStyleWidth(revData,0);" id="dfdfdf" class="c60_fbar_tabList2">' + '<li ng-class="{\'c60_fbar_tabTitle\':true}" ng-repeat="category in revData" ng-style="tabCurrent($index,revData);" ccid="c60_fbar_tabcategory"  ng-click="categoryClick($index,category,true);$event.stopPropagation();"><span ng-bind="category.categoryname"></span>(<span ng-class="{\'c60_fbar_tabTitleNum\':true}" ng-bind="category.list.length"></span>)</li>' + '</ul>' + '</div>' + '<div ng-class="{\'c60_fbar_wrapper\':true}" class="c60_fbar_wrapper">' + '<div ng-class="{\'c60_fbar_packageList\':true}" ng-style="getStyleWidth(revData,1)">' + '<ul  ng-repeat="catagroy in revData"  ng-class="{\'c60_fbar_packagePriceDescList\':true}" ng-style="getStyleWidth(revData,2)" class="c60_fbar_ulwrapper" simplescroll>' + '<ntable  catatoryindex=$index param=catagroy ></ntable>' + '<div class="c60_fbar_store_no_more" ng-show="catagroy.list.length==0?true:false"><span ng-bind="no_more_title"></span><div ng-bind-html="to_trusted(no_more_desc)"></div></div></ul>' + '</div>' + '</div>' + '<div ng-if="compData.JS.showbottombuybtn" ng-class="{\'c60_fbar_fixedBtn\':true}" >' + '<button ng-class="{\'c60_fbar_BuyNowBtn\':true}" ng-style="buyNowBtnStyle()" ccid="c60_fbar_store_buybtn" ng-click="buyNow(1);$event.stopPropagation();" ng-bind="buyNowBtn()"></button>' + ' </div>' + '<div ng-class="{\'c60_fbar_bg_pop_block2\':true}"  ng-click="$event.stopPropagation();"><div class="c60_fbar_bg_pop_nopkg"></div></div>' + '<div ng-class="{\'c60_fbar_pop_block2\':true}">' + '<div ng-class="{\'c60_fbar_img_bgimg\':true}"></div>' + '<div ng-class="{\'c60_fbar_img_txt_info\':true}">' + '<table cellpadding="0" cellspacing="0" ng-class="{\'c60_fbar_img_txt_table\':true}">' + '<tr>' + '<td><span ng-class="{\'c60_fbar_haveatea\':true}" ng-style="popBlock(\'ico\')"></span></td>' + '<td>' + '<div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-bind="revConfirmData.phoneNo"></div>' + '<div ng-class="{\'c60_fbar_pop_txt1\':true}"><p ng-class="{\'c60_fbar_txt_green\':true}" ng-style="popBlock(\'packagename\')" ng-bind="revConfirmData.packageName"></p><p ng-class="{\'c60_fbar_pkgprice\':true}" class="c60_fbar_pkgprice" ng-bind="revConfirmData.packagePrice"></p></div>'
				+ '</td></tr><tr><td colspan="2"><div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-show="effectiveWayFlag==1?true:false"><span ng-class="{\'c60_fbar_sx_txt_out\':true}" >本套餐</span><span ng-class="{\'c60_fbar_sx_time\':true}"><span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_left\':true}" ng-style="effectiveLeftRight(1)" ccid="c60_fbar_store_effective1" ng-click="checkEffectiveClick(1);$event.stopPropagation();" ng-bind="revConfirmData.effectiveWay0"></span><span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_right\':true}" ng-style="effectiveLeftRight(2)" ccid="c60_fbar_store_effective2" ng-click="checkEffectiveClick(2);$event.stopPropagation();" ng-bind="revConfirmData.effectiveWay1"></span></span></div>'
				+ '<div ng-class="{\'c60_fbar_txt1\':true}" ng-show="effectiveWayFlag==0?true:false">本套餐<span ng-bind="revConfirmData.effectiveWay"></span></div><div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-show="effectiveWayFlag==2?true:false"><span ng-class="{\'c60_fbar_sx_txt_out\':true}" >本套餐</span><span ng-class="{\'c60_fbar_sx_time\':true}"><span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_left\':true}" ng-style="effectiveLeftRight2(1)" ccid="c60_fbar_store_effective_special1" ng-click="checkEffectiveClick2(1);$event.stopPropagation();" ng-bind="revConfirmData.effectiveWayspecial1"></span><span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_right\':true}" ng-style="effectiveLeftRight2(2)" ccid="c60_fbar_store_effective_special2" ng-click="checkEffectiveClick2(2);$event.stopPropagation();"  ng-bind="revConfirmData.effectiveWayspecial2"></span></span></div><div ng-class="{\'c60_fbar_pop_txt1\':true}"  ng-show="effectiveWayFlag==3?true:false"><span ng-class="{\'c60_fbar_sx_txt_out\':true}" >本套餐</span><div style="clear:both"></div><span ng-class="{\'c60_fbar_sx_time2\':true}" class="c60_fbar_sx_time2"><span ng-class="{\'c60_fbar_sx_month2 c60_fbar_br_circle_left\':true}" class="c60_fbar_sx_month2" ng-style="effectiveLeftRight2(1)" ccid="c60_fbar_store_effective_special1" ng-click="checkEffectiveClick2(1);$event.stopPropagation();" ng-bind="revConfirmData.effectiveWayspecial1"></span><span ng-class="{\'c60_fbar_sx_month2\':true}" class="c60_fbar_sx_month2" ng-style="effectiveLeftRight2(2)" ccid="c60_fbar_store_effective_special2" ng-click="checkEffectiveClick2(2);$event.stopPropagation();"  ng-bind="revConfirmData.effectiveWayspecial2"></span><span ng-class="{\'c60_fbar_sx_month3 c60_fbar_br_circle_right\':true}" ng-style="effectiveLeftRight2(3)" ccid="c60_fbar_store_effective_special3" ng-click="checkEffectiveClick2(3);$event.stopPropagation();"  ng-bind="revConfirmData.effectiveWayspecial3"></span></span></div></div><div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-bind="compData.JS.packageeffectstate.JS.specialdesc" ng-show="(effectiveWayFlag==2||effectiveWayFlag==3)?true:false" class="c60_fbar_pop_txt1" ng-style="popBlock(\'specialdescstyle\')"></div>' + '</td>' + '</tr>'
				+ '<tr class="c60_fbar_store_inputwarp" ng-show="compData.JS.checkCode.JS.isShow"><td colspan="2"><span style="float: left;font-size: 1em;padding-top: 0.1em;margin-right: 1em;width: 18%;height: 2.5em;line-height: 2.5em;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;" class="c60_fbar_inputTxt">验证码</span><span class="c60_fbar_inputNum" ng-bind="compData.JS.curNum"></span><span class="c60_fbar_inputNumRight" ng-bind="compData.JS.keyNum"></span></td></tr>'
				+ '</table>' + '</div>'
				+ '<div class="c60_fbar_store_keyboard"  ng-show="compData.JS.checkCode.JS.isShow"><ul class="c60_fbar_store_keyboard_warp c60_fbar_clearfloat"><li ng-repeat="item in compData.JS.keyboardNum track by $index" ng-bind="item" ng-click="numclick($index);$event.stopPropagation();" class="c60_fbar_store_keyboard_num"></li></ul></div>'
				+ '<div ng-class="{\'c60_fbar_img_txt_btn2\':true}">' + '<div ng-class="{\'c60_fbar_left_itbtn\':true}"  ng-style="popBlock(\'cancel\')"  ccid="c60_fbar_store_closebtn" ng-click="popBlockHide();$event.stopPropagation();">不了，谢谢</div>' + '<div ng-class="{\'c60_fbar_right_itbtn\':true}" ng-style="popBlock(\'submit\')"  ccid="c60_fbar_store_btn" ng-click="submitConfirm()">是的，确认</div>' + '</div>' + '</div>' + '</div>',
				 */
        template: '<div ng-class="{\'c60_fbar_store\':true}" class="c60_fbar_store"><div id="cdcdcd" ng-class="{\'c60_fbar_tab\':true}"><ul ng-class="{\'c60_fbar_tabList\':true}" id="dfdfdf" class="c60_fbar_tabList2"><li ng-class="{\'c60_fbar_tabTitle\':true}" ng-repeat="category in revData" ng-style="tabCurrent($index,revData);" ccid="c60_fbar_tabcategory"  ng-click="categoryClick($index,category,true);$event.stopPropagation();"><span ng-bind="category.categoryTitle"/></li></ul></div><div ng-class="{\'c60_fbar_wrapper\':true}" class="c60_fbar_wrapper"><div ng-class="{\'c60_fbar_packageList\':true}" ng-style="getStyleWidth(revData,1)"><ul  ng-repeat="catagroy in revData"  ng-class="{\'c60_fbar_packagePriceDescList\':true}" ng-style="getStyleWidth(revData,2)" class="c60_fbar_ulwrapper" simplescroll><ntable  catatoryindex=$index param=catagroy /><div class="c60_fbar_store_no_more" ng-show="catagroy.list.length==0?true:false"><span ng-bind="no_more_title"/><div ng-bind-html="to_trusted(no_more_desc)"/></div></ul></div></div><div ng-if="compData.JS.showbottombuybtn" ng-class="{\'c60_fbar_fixedBtn\':true}" ><button ng-class="{\'c60_fbar_BuyNowBtn\':true}" ng-style="buyNowBtnStyle()" ccid="c60_fbar_store_buybtn" ng-click="buyNow(1);$event.stopPropagation();" ng-bind="buyNowBtn()"/></div><div ng-class="{\'c60_fbar_bg_pop_block2\':true}"  ng-click="$event.stopPropagation();"><div class="c60_fbar_bg_pop_nopkg"/></div><div ng-class="{\'c60_fbar_pop_block2\':true}"><div ng-class="{\'c60_fbar_img_bgimg\':true}"/><div ng-class="{\'c60_fbar_img_txt_info\':true}"><table cellpadding="0" cellspacing="0" ng-class="{\'c60_fbar_img_txt_table\':true}"><tr><td><span ng-class="{\'c60_fbar_haveatea\':true}" ng-style="popBlock(\'ico\')"/></td><td><div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-bind="revConfirmData.phoneNo"/><div ng-class="{\'c60_fbar_pop_txt1\':true}"><p ng-class="{\'c60_fbar_txt_green\':true}" ng-style="popBlock(\'packagename\')" ng-bind="revConfirmData.packageName"/><p ng-class="{\'c60_fbar_pkgprice\':true}" class="c60_fbar_pkgprice" ng-bind="revConfirmData.packagePrice"/></div></td></tr><tr><td colspan="2"><div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-show="effectiveWayFlag==1?true:false"><span ng-class="{\'c60_fbar_sx_txt_out\':true}" >本套餐</span><span ng-class="{\'c60_fbar_sx_time\':true}"><span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_left\':true}" ng-style="effectiveLeftRight(1)" ccid="c60_fbar_store_effective1" ng-click="checkEffectiveClick(1);$event.stopPropagation();" ng-bind="revConfirmData.effectiveWay0"/><span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_right\':true}" ng-style="effectiveLeftRight(2)" ccid="c60_fbar_store_effective2" ng-click="checkEffectiveClick(2);$event.stopPropagation();" ng-bind="revConfirmData.effectiveWay1"/></span></div><div ng-class="{\'c60_fbar_txt1\':true}" ng-show="effectiveWayFlag==0?true:false">本套餐<span ng-bind="revConfirmData.effectiveWay"/></div><div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-show="effectiveWayFlag==2?true:false"><span ng-class="{\'c60_fbar_sx_txt_out\':true}" >本套餐</span><span ng-class="{\'c60_fbar_sx_time\':true}"><span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_left\':true}" ng-style="effectiveLeftRight2(1)" ccid="c60_fbar_store_effective_special1" ng-click="checkEffectiveClick2(1);$event.stopPropagation();" ng-bind="revConfirmData.effectiveWayspecial1"/><span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_right\':true}" ng-style="effectiveLeftRight2(2)" ccid="c60_fbar_store_effective_special2" ng-click="checkEffectiveClick2(2);$event.stopPropagation();"  ng-bind="revConfirmData.effectiveWayspecial2"/></span></div><div ng-class="{\'c60_fbar_pop_txt1\':true}"  ng-show="effectiveWayFlag==3?true:false"><span ng-class="{\'c60_fbar_sx_txt_out\':true}" >本套餐</span><div style="clear:both"/><span ng-class="{\'c60_fbar_sx_time2\':true}" class="c60_fbar_sx_time2"><span ng-class="{\'c60_fbar_sx_month2 c60_fbar_br_circle_left\':true}" class="c60_fbar_sx_month2" ng-style="effectiveLeftRight2(1)" ccid="c60_fbar_store_effective_special1" ng-click="checkEffectiveClick2(1);$event.stopPropagation();" ng-bind="revConfirmData.effectiveWayspecial1"/><span ng-class="{\'c60_fbar_sx_month2\':true}" class="c60_fbar_sx_month2" ng-style="effectiveLeftRight2(2)" ccid="c60_fbar_store_effective_special2" ng-click="checkEffectiveClick2(2);$event.stopPropagation();"  ng-bind="revConfirmData.effectiveWayspecial2"/><span ng-class="{\'c60_fbar_sx_month3 c60_fbar_br_circle_right\':true}" ng-style="effectiveLeftRight2(3)" ccid="c60_fbar_store_effective_special3" ng-click="checkEffectiveClick2(3);$event.stopPropagation();"  ng-bind="revConfirmData.effectiveWayspecial3"/></span></div></div><div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-bind="compData.JS.packageeffectstate.JS.specialdesc" ng-show="(effectiveWayFlag==2||effectiveWayFlag==3)?true:false" class="c60_fbar_pop_txt1" ng-style="popBlock(\'specialdescstyle\')"/></td></tr><tr class="c60_fbar_store_inputwarp" ng-show="compData.JS.checkCode.JS.isShow"><td colspan="2"><span style="float: left;font-size: 1em;padding-top: 0.1em;margin-right: 1em;width: 18%;height: 2.5em;line-height: 2.5em;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;" class="c60_fbar_inputTxt">验证码</span><span class="c60_fbar_inputNum" ng-bind="compData.JS.curNum"/><span class="c60_fbar_inputNumRight" ng-bind="compData.JS.keyNum"/></td></tr></table></div><div class="c60_fbar_store_keyboard"  ng-show="compData.JS.checkCode.JS.isShow"><ul class="c60_fbar_store_keyboard_warp c60_fbar_clearfloat"><li ng-repeat="item in compData.JS.keyboardNum track by $index" ng-bind="item" ng-click="numclick($index);$event.stopPropagation();" class="c60_fbar_store_keyboard_num"/></ul></div><div ng-class="{\'c60_fbar_img_txt_btn2\':true}"><div ng-class="{\'c60_fbar_left_itbtn\':true}"  ng-style="popBlock(\'cancel\')"  ccid="c60_fbar_store_closebtn" ng-click="popBlockHide();$event.stopPropagation();">不了，谢谢</div><div ng-class="{\'c60_fbar_right_itbtn\':true}" ng-style="popBlock(\'submit\')"  ccid="c60_fbar_store_btn" ng-click="submitConfirm()">是的，确认</div></div></div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", "$timeout", 'coreService', 'coreUtils', 'Const', '$sce', 
        function($scope, $element, $attrs, $timeout, coreService, coreUtils, Const, $sce) {
            $scope.cid = $attrs.cid;
            $scope.compData = {};
            $scope.selectedPkg = {};
            //初始化套餐类型对应被选中的套餐
            $scope.homeflag = 0;
            $scope.effectiveWayFlag = 0;
            //初始化生效方式时显示状态
            $scope.effectiveLeftRightFlag = 0;
            //初始化存在两种生效方式时立即生效状态
            $scope.effectiveLeftRightFlag2 = 0;
            $scope.flowUpshiftFlag = '1';
            //初始化二次确认确认后被传递的生效状态
            $scope.buyBtnType = {};
            //初始化套餐类型对应底部按钮文字
            $scope.currentCategoryId = undefined;
            //初始化当前套餐类型ID
            $scope.eventMap = {};
            $scope.orderedPackage = {};
            $scope.packageStatus = {};
            $scope.taskId = '';
            $scope.no_more_title = '';
            $scope.no_more_desc = '';
            $scope.effecttimevalue = '0';
            $scope.effectperiod = '0';
            $scope.monthpack = '1';
            $scope.globalpackages = {};
            $scope.to_trusted = function(text) {
                if (text != null  && text != undefined) {
                    text = text + '';
                    return $sce.trustAsHtml(text.replace(/\n/g, "<br/>"));
                } else {
                    return "";
                }
            }
            ;
            var buybtncanclick = true;
            //为防止页面响应慢，用户重复点击导致误点订购按钮
            var popupmask = undefined;
            //订购遮罩
            var confirmdialog = undefined;
            //确认框
            var submitconfirmbtn = true;
            //为防止页面响应慢，用户重复点击导致误点确认按钮
            var verify = undefined;
            //验证码输入框
            //标签类需要的总长度，如果标签类总长度不足100%，平均每个标签类平分剩余长度
            var categoryliTotalCssWidth = 0;
            var hundredwidth = 0;
            //记录标签类wrapper宽度
            //获取后台数据
            $scope.updateData = function(param, flag) {
                categoryliTotalCssWidth = 0;
                if (!flag) {
                    $scope.notFromStore = false;
                    $scope.taskId = '';
                }
                $scope.maxdisplaynum = parseInt($scope.compData.JS.tabTitleconfig.JS.maxdisplaynum);
                //可视区域显示TAB导航个数
                var word = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                if (param && param.respparam && param.respparam.packages) {
                    var temp = param.respparam.packages;
                    var pkg = null ;
                    var mn = 0;
                    $scope.no_more_title = $scope.compData.JS.nomoreconfig.JS.no_more_title;
                    $scope.no_more_desc = $scope.compData.JS.nomoreconfig.JS.no_more_desc;
                    $scope.maxdisplaynum = (param.respparam.packages.length >= $scope.maxdisplaynum && $scope.maxdisplaynum !== 0) ? $scope.maxdisplaynum : param.respparam.packages.length;
                    temp = param.respparam.packages;
                    for (var i = 0, len = temp.length; i < len; i++) {
                        temp[i].categoryTitle = temp[i].categoryname + '(' + (temp[i].list || []).length + ')';
                        categoryliTotalCssWidth += temp[i].categoryTitle.length;
                        var list = temp[i].list;
                        if (list != null  && list != undefined && list.length != 0) {
                            for (var j = 0, vlen = list.length; j < vlen; j++) {
                                pkg = list[j];
                                $scope.globalpackages[pkg.id] = pkg;
                                pkg.catagoryindex = i;
                                $scope.packageStatus[pkg.id] = pkg.status;
                                if ($scope.orderedPackage[pkg.id] == 1) {
                                    pkg.status = '0';
                                }
                                if (pkg.iscombo == '1') {
                                    pkg.iscomboflag = true;
                                    pkg.iscomboflag2 = (pkg.comboProperies == null  || pkg.comboProperies == undefined || pkg.comboProperies.length == 0) ? false : true;
                                    pkg.title = word[j];
                                    pkg.name = pkg.name;
                                } else {
                                    pkg.iscomboflag = false;
                                    pkg.iscomboflag2 = false;
                                    pkg.name = pkg.price;
                                }
                                
                                pkg.description = pkg.desc;
                                if (pkg.comboProperies != null  && pkg.comboProperies != undefined && pkg.comboProperies.length != 0) {
                                    var keyconfig = $scope.compData.JS.packagedescstate.JS.keyconfig
                                      , 
                                    traffickey = $scope.compData.JS.packagedescstate.JS.traffickeyconfig
                                      , 
                                    n = 0;
                                    pkg.properies = {};
                                    for (var k = 0; k < pkg.comboProperies.length; k++) {
                                        for (var m in keyconfig) {
                                            if (pkg.comboProperies[k].key == m) {
                                                if (pkg.iscombo == '1') {
                                                    if (keyconfig[m].unit == null  || keyconfig[m].unit == undefined)
                                                        keyconfig[m].unit = '';
                                                    pkg.properies[n] = keyconfig[m].key + '：' + pkg.comboProperies[k].value + keyconfig[m].unit;
                                                    n++;
                                                } else if (pkg.iscombo == '0') {
                                                    if (keyconfig[m].unit == null  || keyconfig[m].unit == undefined)
                                                        keyconfig[m].unit = '';
                                                    if (pkg.comboProperies[k].key == traffickey)
                                                        pkg.title = pkg.comboProperies[k].value + keyconfig[m].unit;
                                                } else {}
                                            }
                                        }
                                    }
                                }
                                pkg.categoryid = temp[i].categoryid;
                                var packageeffectstate = $scope.compData.JS.packageeffectstate.JS.stateconfig;
                                for (var n in packageeffectstate) {
                                    if (pkg.effecttype == n) {
                                        pkg.effectdesc = packageeffectstate[n].value;
                                    }
                                }
                            }
                        }
                        {
                            
                            var tabcontainerwrapper = angular.element($element[0].querySelector('[id="cdcdcd"]'));
                            var tabcontainer = angular.element($element[0].querySelector('[id="dfdfdf"]'));
                            hundredwidth = parseInt(top.window.getComputedStyle(tabcontainerwrapper[0], null )['width']);
                            var fontsize = parseInt(top.window.getComputedStyle(tabcontainer[0], null )['fontSize']);
                            //console.log('dfdf', fontsize,categoryliTotalCssWidth * fontsize, hundredwidth);
                            if (categoryliTotalCssWidth * fontsize < hundredwidth) {
                                tabcontainer.css({
                                    width: '100%'
                                });
                            } else {
                                tabcontainer.css({
                                    width: categoryliTotalCssWidth + 'em'
                                });
                            
                            }
                        
                        }
                    
                    }
                    //存储数据
                    $scope.revData = temp;
                    //param.respparam.packages;
                    var temppkg;
                    for (var i = 0, len = $scope.revData.length; i < len; i++) {
                        var categoryid = $scope.revData[i].categoryid;
                        //设置订购按钮文字
                        if ($scope.revData[i].list && $scope.revData[i].list && $scope.revData[i].list.length != 0) {
                            if ($scope.revData[i].list[0].iscombo != null  && $scope.revData[i].list[0].iscombo != undefined) {
                                if ($scope.revData[i].list[0].iscombo == 1) {
                                    $scope.buyBtnType[categoryid] = $scope.compData.JS.buynowbtnconfig.JS.stateconfig.text1;
                                } else {
                                    $scope.buyBtnType[categoryid] = $scope.compData.JS.buynowbtnconfig.JS.stateconfig.text0;
                                }
                            }
                            
                            //如果用户已经选择过该套餐，则不初始化该套餐
                            if (categoryid == $scope.currentCategoryId) {
                                //add by y00131156 at 20151117 begin
                                //if no other pkg can be ordered,display the first package or the package last ordered,
                                //else display the first pkg which can be ordered
                                var lastorderedpkgindex = -1;
                                
                                for (var tk = 0; tk < $scope.revData[i].list.length; tk++) {
                                    var tpkg = $scope.revData[i].list[tk];
                                    if (tpkg.status == '1') {
                                        $scope.selectedPkg[categoryid] = tpkg.id;
                                        $scope.compData.JS.packageIndex = tk;
                                        break;
                                    } else if (tpkg.id == $scope.userbuypkg) {
                                        lastorderedpkgindex = tk;
                                    
                                    }
                                }
                                
                                if (!$scope.selectedPkg[categoryid]) {
                                    if (lastorderedpkgindex != -1) {
                                        $scope.selectedPkg[categoryid] = $scope.userbuypkg;
                                        $scope.compData.JS.packageIndex = lastorderedpkgindex;
                                    
                                    } else {
                                        $scope.selectedPkg[categoryid] = $scope.revData[i].list[0].id;
                                        $scope.compData.JS.packageIndex = 0;
                                    }
                                }
                                //add by y00131156 at 20151117 end
                                continue;
                            }
                            $scope.selectedPkg[categoryid] = undefined;
                            for (var j = 0; j < $scope.revData[i].list.length; j++) {
                                temppkg = $scope.revData[i].list[j];
                                if (temppkg.status == '1') {
                                    $scope.selectedPkg[categoryid] = temppkg.id;
                                    if (!$scope.currentCategoryId) {
                                        $scope.currentCategoryId = categoryid;
                                        $scope.compData.JS.tabcategoryIndex = i;
                                        $scope.compData.JS.tabTitleconfig.JS.index = i;
                                        angular.element($element[0].querySelector('.c60_fbar_packageList')).css({
                                            'margin-left': -i * 100 + '%'
                                        });
                                        $scope.compData.JS.packageIndex = j;
                                    }
                                    break;
                                }
                            
                            }
                        } else {
                            $scope.buyBtnType[categoryid] = $scope.compData.JS.buynowbtnconfig.JS.stateconfig.text0;
                        }
                    }
                    
                    if (top.subscribeid) {
                        $scope.changeCurrentByOid({
                            'oid': top.subscribeid
                        });
                        top.subscribeid = undefined;
                    }
                }
            }
            ;
            
            //编辑套餐类型对应被选中的套餐ID
            $scope.setCurrentPkgid = function(pkgid) {
                var lastpkgid = $scope.selectedPkg[$scope.currentCategoryId];
                if (pkgid != null  && pkgid != undefined && pkgid != lastpkgid) {
                    $scope.selectedPkg[$scope.currentCategoryId] = pkgid;
                    return true;
                }
                return false;
            }
            ;
            //Tab菜单样式
            $scope.tabCurrent = function(index, pkg) {
                /*console.log(top.window.getComputedStyle(tabcontainer[0], null)['width'], categoryliTotalCssWidth);
							if (index != null && index != undefined && pkg != null && pkg != undefined) {
							if (pkg.length <= $scope.maxdisplaynum) {
							$scope.compData.JS.tabTitleconfig.JS.stateconfig.state0.width = 100 / pkg.length + '%';
							$scope.compData.JS.tabTitleconfig.JS.stateconfig.state1.width = 100 / pkg.length + '%';
							} else {
							$scope.compData.JS.tabTitleconfig.JS.stateconfig.state0.width = 1 / pkg.length * 100 + '%';
							$scope.compData.JS.tabTitleconfig.JS.stateconfig.state1.width = 1 / pkg.length * 100 + '%';
							}
							if ($scope.compData.JS.tabTitleconfig.JS.index == index) {
							return $scope.compData.JS.tabTitleconfig.JS.stateconfig.state1;
							} else {
							return $scope.compData.JS.tabTitleconfig.JS.stateconfig.state0;
							}
							}*/
                
                var tabcontainerwrapper = angular.element($element[0].querySelector('[id="cdcdcd"]'));
                var hundredwidth = parseInt(top.window.getComputedStyle(tabcontainerwrapper[0], null )['width']);
                var fontsize = parseInt(top.window.getComputedStyle(tabcontainerwrapper[0], null )['fontSize']) * 0.9;
                var width = 0;
                if (categoryliTotalCssWidth * fontsize < hundredwidth) {
                    
                    width = pkg[index].categoryTitle.length - 0.21 + (hundredwidth / fontsize - categoryliTotalCssWidth) / pkg.length + 'em';
                
                } else {
                    width = pkg[index].categoryTitle.length - 0.21 + 'em';
                }
                if ($scope.compData.JS.tabTitleconfig.JS.index == index) {
                    $scope.compData.JS.tabTitleconfig.JS.stateconfig.state1.width = width;
                    return $scope.compData.JS.tabTitleconfig.JS.stateconfig.state1;
                } else {
                    $scope.compData.JS.tabTitleconfig.JS.stateconfig.state0.width = width;
                    return $scope.compData.JS.tabTitleconfig.JS.stateconfig.state0;
                }
            
            }
            ;
            
            //计算选中标签类的位置，如果在可视范围以外，需要设置tabcontainer的位移
            var moveCategoryTab = (function() {
                //var tabcontainerwrapper = angular.element($element[0].querySelector('[id="cdcdcd"]'));
                var tabcontainer = angular.element($element[0].querySelector('[id="dfdfdf"]'));
                var translatex = 0;
                var execute = function(currentIndex) {
                    var totalWidth = hundredwidth;
                    var ulWidth = parseInt(top.window.getComputedStyle(tabcontainer[0], null )['width']);
                    var fontSize = parseInt(top.window.getComputedStyle(tabcontainer[0], null )['fontSize']);
                    if (totalWidth < ulWidth) {
                        if (currentIndex == $scope.revData.length - 1) {
                            translatex = totalWidth - ulWidth;
                        } else {
                            
                            //计算当前套餐标题是否在可视区域内
                            var posx1 = 0;
                            var posx2 = 0;
                            for (var i = 0; i < currentIndex; i++) {
                                posx1 = posx1 + $scope.revData[i].categoryTitle.length;
                            }
                            posx1 = posx1 * fontSize + translatex;
                            posx2 = posx1 + $scope.revData[currentIndex].categoryTitle.length * fontSize;
                            if (posx1 < 0) {
                                translatex = translatex - posx1 + 2 * fontSize;
                                if (translatex > 0) {
                                    translatex = 0;
                                }
                            
                            } else if (posx2 > totalWidth) {
                                
                                translatex = translatex + totalWidth - posx2;
                            }
                        
                        }
                        
                        tabcontainer.css('-webkit-transform', 'translate(' + translatex + 'px,0px)');
                        tabcontainer.css('-moz-transform', 'translate(' + translatex + 'px,0px)');
                        tabcontainer.css('-ms-transform', 'translate(' + translatex + 'px,0px)');
                        tabcontainer.css('-o-transform', 'translate(' + translatex + 'px,0px)');
                    
                    }
                }
                
                return execute;
            })();
            //Tab菜单点击事件
            $scope.categoryClick = function(index, catetory, flag) {
                if (index != null  && index != undefined && catetory != null  && catetory != undefined) {
                    $scope.compData.JS.tabcategoryIndex = index;
                    $scope.compData.JS.tabTitleconfig.JS.index = index;
                    $scope.currentCategoryId = catetory.categoryid;
                    angular.element($element[0].querySelector('.c60_fbar_packageList')).css({
                        'margin-left': -index * 100 + '%'
                    });
                    
                    //delete by y00131156 at 20151117 use moveCategoryTab replace the below function begin
                    //resolve zjyd when click recommanded pkg,the pkg category not show fully
                    /*var marginLeft = 0;
								if (Number(index) < Number($scope.maxdisplaynum)) {
								marginLeft = 0;
								} else {
								marginLeft = -100 / $scope.maxdisplaynum * (Number(index) - Number($scope.maxdisplaynum) + 1);
								}
								angular.element($element[0].querySelector('.c60_fbar_tabList2')).css({
								'margin-left' : marginLeft + '%'
								});*/
                    //delete by y00131156 at 20151117 use moveCategoryTab replace the below function end
                    moveCategoryTab(index);
                    if (flag) {
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.packagetitlebgstate.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': catetory.categoryid
                            };
                            //console.log('categoryClick');
                            coreUtils.cdrService($scope.compData.JS.packagetitlebgstate.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                    }
                }
            }
            ;
            //初始化套餐内容列表整体和个体宽度
            $scope.getStyleWidth = function(pkg, no) {
                if (pkg != null  && pkg != undefined && no != null  && no != undefined) {
                    if (no == 0) {
                    
                    //如果套餐类总宽度>100%,直接设置宽度
                    //如果套餐类总宽度<100%，设置100%
                    /*if (pkg.length <= $scope.maxdisplaynum) {
									return {
									width : '100%'
									};
									} else {
									return {
									width : pkg.length * 100 / $scope.maxdisplaynum + '%'
									};
									}*/
                    } else if (no == 1) {
                        return {
                            width: pkg.length * 100 + '%'
                        };
                    } else {
                        return {
                            width: (100 / (pkg.length)) + '%'
                        };
                    }
                }
            }
            ;
            //底部订购按钮样式
            $scope.buyNowBtnStyle = function() {
                if ($scope.selectedPkg[$scope.currentCategoryId] != null  && $scope.selectedPkg[$scope.currentCategoryId] != undefined && $scope.selectedPkg[$scope.currentCategoryId])
                    return $scope.compData.JS.buynowbtnconfig.JS.stateconfig.state;
                else
                    return $scope.compData.JS.buynowbtnconfig.JS.stateconfig.state1;
            
            }
            ;
            //底部订购按钮样式
            $scope.buyNowBtnStyleForEach = function(pkg) {
                if (pkg.status == '0' || $scope.orderedPackage[pkg.id] == 1 || pkg.ordering == 1)
                    return $scope.compData.JS.buynowbtnconfig.JS.stateconfig.state1;
                else
                    return $scope.compData.JS.buynowbtnconfig.JS.stateconfig.state;
            
            }
            ;
            //底部订购按钮文本
            $scope.buyNowBtn = function() {
                return $scope.buyBtnType[$scope.currentCategoryId];
            }
            ;
            
            $scope.buyNowBtnForEach = function(pkg) {
                var text = $scope.compData.JS.buynowbtnconfig.JS.stateconfig.text0 || '立即订购';
                if (pkg.iscombo == '1') {
                    text = $scope.compData.JS.buynowbtnconfig.JS.stateconfig.text1 || '预约升档';
                }
                return text;
            }
            ;
            
            $scope.hideConfirmDialog = function() {
                //将"是的，确认"按钮状态修改为不可点击，直到用户二维码才对位置
                $scope.compData.JS.confirmBtn = false;
                $scope.compData.JS.curNum = $scope.compData.JS.checkCode.JS.curNum;
                if (!verify) {
                    
                    verify = angular.element($element[0].querySelector('.c60_fbar_inputNum'))
                }
                verify.css({
                    'border': ''
                });
                if (!confirmdialog) {
                    confirmdialog = angular.element($element[0].querySelector('.c60_fbar_pop_block2'));
                }
                confirmdialog.css({
                    'z-index': '0',
                    'display': 'none'
                });
                if (!popupmask) {
                    popupmask = angular.element($element[0].querySelector('.c60_fbar_bg_pop_block2'));
                }
                
                popupmask.css({
                    'z-index': '0',
                    'display': 'none'
                });
            
            }
            
            //取消按钮关闭事件
            $scope.popBlockHide = function() {
                //将"是的，确认"按钮状态修改为不可点击，直到用户二维码才对位置
                /*$scope.compData.JS.confirmBtn = false;
							$scope.compData.JS.curNum = $scope.compData.JS.checkCode.JS.curNum;
							angular.element($element[0].querySelector('.c60_fbar_inputNum')).css({'border':''});
							angular.element($element[0].querySelector('.c60_fbar_bg_pop_block2')).css({
							'z-index' : '0',
							'display' : 'none'
							});
							angular.element($element[0].querySelector('.c60_fbar_pop_block2')).css({
							'z-index' : '0',
							'display' : 'none'
							});*/
                $scope.hideConfirmDialog();
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.popblockconfig.JS.uitracingcancel.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': $scope.pageID + "_" + 'canclebtn',
                        'taskId': $scope.taskId
                    };
                    coreUtils.cdrService($scope.compData.JS.popblockconfig.JS.uitracingcancel.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                //top.tlbs.cdrData = null;
            }
            ;
            //二次确认弹出层样式（小图片，套餐名，取消按钮，提交按钮）
            $scope.popBlock = function(type) {
                if (type != null  && type != undefined) {
                    if (type == 'ico') {
                        return $scope.compData.JS.popblockconfig.JS.icoconfig;
                    } else if (type == 'packagename') {
                        return $scope.compData.JS.popblockconfig.JS.packagenameconfig;
                    } else if (type == 'cancel') {
                        return $scope.compData.JS.popblockconfig.JS.btnconfig.state0;
                    } else if (type == 'submit') {
                        return $scope.compData.JS.popblockconfig.JS.btnconfig.state1;
                    } else if (type == 'specialdescstyle') {
                        return $scope.compData.JS.packageeffectstate.JS.specialdescstyle;
                    } else {}
                }
            }
            ;
            //二次确认弹出层存在多种生效方式时：立即和预约生效样式
            $scope.effectiveLeftRight = function(no) {
                if (no != null  && no != undefined) {
                    if (no == 1) {
                        if ($scope.effectiveLeftRightFlag == 1) {
                            return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state0;
                        } else {
                            return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state1;
                        }
                    } else {
                        if ($scope.effectiveLeftRightFlag == 0) {
                            return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state0;
                        } else {
                            return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state1;
                        }
                    }
                }
            }
            ;
            
            $scope.effectiveLeftRight2 = function(no) {
                if (no != null  && no != undefined) {
                    if (no == 1) {
                        if ($scope.effectiveLeftRightFlag2 == 0) {
                            return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state0;
                        } else {
                            return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state1;
                        }
                    } else if (no == 2) {
                        if ($scope.effectiveLeftRightFlag2 == 1) {
                            return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state0;
                        } else {
                            return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state1;
                        }
                    } else {
                        if ($scope.effectiveLeftRightFlag2 == 2) {
                            return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state0;
                        } else {
                            return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state1;
                        }
                    
                    }
                }
            }
            ;
            //二次确认弹出层存在多种生效方式时：点击事件
            $scope.checkEffectiveClick = function(no) {
                if (no != null  && no != undefined) {
                    if (no == 1) {
                        $scope.effectiveLeftRightFlag = 1;
                        $scope.flowUpshiftFlag = '0';
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.packageeffectstate.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': $scope.pageID + '_' + 'effectway_0'
                            };
                            coreUtils.cdrService($scope.compData.JS.packageeffectstate.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                    } else {
                        $scope.effectiveLeftRightFlag = 0;
                        $scope.flowUpshiftFlag = '1';
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.packageeffectstate.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': $scope.pageID + '_' + 'effectway_1'
                            };
                            coreUtils.cdrService($scope.compData.JS.packageeffectstate.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                    }
                }
            }
            ;
            $scope.checkEffectiveClick2 = function(no) {
                if (no != null  && no != undefined) {
                    if (no == 1) {
                        $scope.effectiveLeftRightFlag2 = 0;
                        $scope.effecttimevalue = '0';
                        $scope.effectperiod = '1';
                        $scope.flowUpshiftFlag = '0';
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.packageeffectstate.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': $scope.pageID + '_' + 'effectway_01'
                            };
                            coreUtils.cdrService($scope.compData.JS.packageeffectstate.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                    } else if (no == 2) {
                        $scope.effectiveLeftRightFlag2 = 1;
                        $scope.flowUpshiftFlag = '0';
                        $scope.effecttimevalue = '0';
                        $scope.effectperiod = '0';
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.packageeffectstate.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': $scope.pageID + '_' + 'effectway_02'
                            };
                            coreUtils.cdrService($scope.compData.JS.packageeffectstate.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                    } else {
                        $scope.effectiveLeftRightFlag2 = 2;
                        $scope.flowUpshiftFlag = '1';
                        $scope.effecttimevalue = '1';
                        $scope.effectperiod = '0';
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.packageeffectstate.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': $scope.pageID + '_' + 'effectway_12'
                            };
                            coreUtils.cdrService($scope.compData.JS.packageeffectstate.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                    }
                }
            }
            ;
            var auhidetimeout = null ;
            //根据id查询套餐
            $scope.getpkgById = function(pkgid) {
                return $scope.globalpackages[pkgid];
            }
            ;
            //获取后台数据-二次去人弹出层显示数据
            
            $scope.confirmData = function(param) {
                if (param != null  && param != undefined) {
                    $scope.revConfirmData = param.respparam;
                    if ($scope.revConfirmData.packageId != null  && $scope.revConfirmData.packageId != undefined && $scope.revConfirmData.effectiveWay != null  && $scope.revConfirmData.effectiveWay != undefined) {
                        var temp = {};
                        var pkg = $scope.getpkgById($scope.revConfirmData.packageId);
                        if (pkg) {
                            $scope.monthpack = pkg.isMonthPack + '';
                            temp.packagePrice = "" + pkg.price;
                        }
                        temp.phoneNo = $scope.revConfirmData.msisdn.replace($scope.revConfirmData.msisdn.substr($scope.revConfirmData.msisdn.length == 11 ? 3 : 4, 4), "****") + ', 您好。确认订购';
                        temp.packageName = $scope.revConfirmData.packageName;
                        
                        $scope.compData.JS.packageeffectstate.JS.specialstate = $scope.compData.JS.packageeffectstate.JS.specialstate + '';
                        $scope.compData.JS.packageeffectstate.JS.specialstateconfig = $scope.compData.JS.packageeffectstate.JS.specialstateconfig || {
                            "0": {
                                "value1": "当月生效",
                                "value2": "永久生效"
                            },
                            "1": {
                                "value": "预约生效"
                            }
                        };
                        temp.effectiveWayspecial1 = $scope.compData.JS.packageeffectstate.JS.specialstateconfig["0"].value1;
                        temp.effectiveWayspecial2 = $scope.compData.JS.packageeffectstate.JS.specialstateconfig["0"].value2;
                        temp.effectiveWayspecial3 = $scope.compData.JS.packageeffectstate.JS.specialstateconfig["1"].value;
                        
                        if ($scope.revConfirmData.effectiveWay == 0) {
                            if ($scope.compData.JS.packageeffectstate && $scope.compData.JS.packageeffectstate.JS.specialstate == '1' && $scope.monthpack == '0') {
                                $scope.effectiveWayFlag = 2;
                                $scope.effecttimevalue = '0';
                                $scope.effectperiod = '1';
                            } else {
                                temp.effectiveWay = $scope.compData.JS.packageeffectstate.JS.stateconfig[0].value;
                                $scope.effectiveWayFlag = 0;
                            }
                            $scope.flowUpshiftFlag = $scope.revConfirmData.effectiveWay;
                        } else if ($scope.revConfirmData.effectiveWay == 1) {
                            if ($scope.compData.JS.packageeffectstate.JS.specialstate == '1' && $scope.monthpack == '0') {
                                $scope.effectiveWayFlag = 0;
                                temp.effectiveWay = temp.effectiveWayspecial3;
                                $scope.effecttimevalue = '1';
                                $scope.effectperiod = '0';
                            
                            } else {
                                temp.effectiveWay = $scope.compData.JS.packageeffectstate.JS.stateconfig[1].value;
                                $scope.effectiveWayFlag = 0;
                            }
                            $scope.flowUpshiftFlag = $scope.revConfirmData.effectiveWay;
                        } else if ($scope.revConfirmData.effectiveWay == 2) {
                            if ($scope.compData.JS.packageeffectstate.JS.specialstate == '1' && $scope.monthpack == '0') {
                                $scope.effectiveWayFlag = 3;
                                $scope.effecttimevalue = '0';
                                $scope.effectperiod = '1';
                                $scope.flowUpshiftFlag = '0';
                            
                            } else {
                                temp.effectiveWay0 = $scope.compData.JS.packageeffectstate.JS.stateconfig[0].value;
                                temp.effectiveWay1 = $scope.compData.JS.packageeffectstate.JS.stateconfig[1].value;
                                $scope.effectiveWayFlag = 1;
                                $scope.flowUpshiftFlag = '1';
                            }
                        } else {
                            $scope.effectiveWayFlag = -1;
                            $scope.flowUpshiftFlag = $scope.revConfirmData.effectiveWay;
                        }
                        $scope.userbuypkg = $scope.revConfirmData.packageId;
                        $scope.revConfirmData = temp;
                        $scope.flag = 1;
                        submitconfirmbtn = false;
                        if (!confirmdialog) {
                            confirmdialog = angular.element($element[0].querySelector('.c60_fbar_pop_block2'));
                        }
                        if ($scope.compData.JS.checkCode.JS.isShow) {
                            //输出随机码
                            $scope.compData.JS.keyNum = $scope.compData.JS.keyboardNum[new Date().getTime() % $scope.compData.JS.checkCodelen];
                        }
                        
                        confirmdialog.css({
                            'z-index': '2047483647889',
                            'display': 'block'
                        });
                        if ($scope.compData.JS.checkCode.JS.isShow) {
                            confirmdialog.css({
                                'margin-bottom': '-10em'
                            });
                        }
                        setTimeout(function() {
                            submitconfirmbtn = true
                        }, Number($scope.compData.JS.delaysubmitbtn || 200));
                        auhidetimeout = setTimeout($scope.hideConfirmDialog, Number($scope.compData.JS.confirmPopupAutohide || 10) * 1000);
                        $scope.effectiveLeftRightFlag = 0;
                        $scope.effectiveLeftRightFlag2 = 0;
                    } else {
                        coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'clickTime');
                    }
                }
            }
            ;
            //底部订购和升档按钮事件-传递套餐ID
            $scope.buyNow = function(clickFrom) {
                if (auhidetimeout) {
                    clearTimeout(auhidetimeout);
                    auhidetimeout = null ;
                }
                if ($scope.currentCategoryId != null  && $scope.currentCategoryId != undefined && $scope.selectedPkg[$scope.currentCategoryId] != null  && $scope.selectedPkg[$scope.currentCategoryId] != undefined) {
                    angular.element($element[0].querySelector('.c60_fbar_bg_pop_block2')).css({
                        'z-index': '2047483647888',
                        'display': 'block'
                    });
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click0', {
                        "id": $scope.selectedPkg[$scope.currentCategoryId],
                        "epageId": top.tlbs.ordersrc
                    });
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.buynowbtnconfig.JS.cdrConfig)) {
                        var cdrConfig = angular.copy($scope.compData.JS.buynowbtnconfig.JS.cdrConfig.uitracingcdr);
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': $scope.pageID + "_" + 'buybtn'
                        };
                        if ($scope.notFromStore) {
                            cdrConfig['storeData'] = false;
                        }
                        coreUtils.cdrService(cdrConfig, $scope.compData.JS.cdrData);
                    }
                    
                    /*for (var i = 0, len = $scope.revData.length; i < len; i++) {
								if ($scope.currentCategoryId == $scope.revData[i].categoryid) {
								for (var j = 0, len2 = $scope.revData[i].list.length; j < len2; j++) {
								if ($scope.revData[i].list[j].id == $scope.selectedPkg[$scope.currentCategoryId]) {
								$scope.monthpack = $scope.revData[i].list[j].isMonthPack;
								return false;
								}
								}
								}
								}*/
                }
            }
            ;
            
            //底部订购和升档按钮事件-传递套餐ID
            
            $scope.buyNowForEach = function(pkg, cdrflag) {
                if (auhidetimeout) {
                    clearTimeout(auhidetimeout);
                    auhidetimeout = null ;
                }
                
                if (pkg) {
                    if (pkg.status == '0' || $scope.orderedPackage[pkg.id] == 1 || !buybtncanclick || pkg.ordering == 1) {
                        return
                    }
                    pkg.ordering = 1;
                    setTimeout(function() {
                        pkg.ordering = 0
                    }, Number($scope.buybtnclickinterval || 500));
                    if (!popupmask) {
                        popupmask = angular.element($element[0].querySelector('.c60_fbar_bg_pop_block2'));
                    }
                    popupmask.css({
                        'z-index': '2047483647888',
                        'display': 'block'
                    });
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click0', {
                        "id": pkg.id,
                        "epageId": top.tlbs.ordersrc
                    });
                    
                    if (cdrflag != '0' && coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.buynowbtnconfig.JS.cdrConfig)) {
                        var cdrConfig = angular.copy($scope.compData.JS.buynowbtnconfig.JS.cdrConfig.uitracingcdr);
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': $scope.pageID + "_" + 'buybtn',
                            'pkgid': pkg.id
                        };
                        if ($scope.notFromStore) {
                            cdrConfig['storeData'] = false;
                        }
                        coreUtils.cdrService(cdrConfig, $scope.compData.JS.cdrData);
                    }
                    
                    /*for (var i = 0, len = $scope.revData.length; i < len; i++) {
								if ($scope.currentCategoryId == $scope.revData[i].categoryid) {
								for (var j = 0, len2 = $scope.revData[i].list.length; j < len2; j++) {
								if ($scope.revData[i].list[j].id == $scope.selectedPkg[$scope.currentCategoryId]) {
								$scope.monthpack = $scope.revData[i].list[j].isMonthPack;
								return false;
								}
								}
								}
								}*/
                }
            }
            ;
            
            $scope.queryerror = function() {
                if (!popupmask) {
                    popupmask = angular.element($element[0].querySelector('.c60_fbar_bg_pop_block2'));
                }
                popupmask.css({
                    'z-index': '0',
                    'display': 'none'
                });
            
            }
            //二次确认弹出层中确定按钮事件-传递套餐ID+生效类型ID
            $scope.submitConfirm = function() {
                //当有二维码确认并且用户验证错误情况下，直接返回
                if ($scope.compData.JS.checkCode.JS.isShow && ($scope.compData.JS.confirmBtn == false)) {
                    return;
                }
                if (!submitconfirmbtn) {
                    return;
                }
                /*if (!confirmdialog) {
							confirmdialog = angular.element($element[0].querySelector('.c60_fbar_pop_block2'));
							}
							//将"是的，确认"按钮状态修改为不可点击，直到用户二维码才对位置
							$scope.compData.JS.confirmBtn = false;
							$scope.compData.JS.curNum = $scope.compData.JS.checkCode.JS.curNum;
							angular.element($element[0].querySelector('.c60_fbar_inputNum')).css({'border':''});
							confirmdialog.css({
							'z-index' : '0',
							'display' : 'none'
							});
							if (!popupmask) {
							popupmask = angular.element($element[0].querySelector('.c60_fbar_bg_pop_block2'));
							}

							popupmask.css({
							'z-index' : '0',
							'display' : 'none'
							});*/
                $scope.hideConfirmDialog();
                var inputData;
                if ($scope.compData.JS.packageeffectstate.JS.specialstate == '1' && $scope.monthpack == '0') {
                    inputData = {
                        "id": $scope.userbuypkg,
                        "flowUpshiftFlag": $scope.flowUpshiftFlag,
                        "saleid": "",
                        "epageId": top.tlbs.ordersrc,
                        "effecttime": {
                            "value": $scope.effecttimevalue
                        },
                        "effectperiod": {
                            "value": $scope.effectperiod
                        },
                        "isMonthPack": $scope.monthpack || ''
                    };
                
                } else {
                    inputData = {
                        "id": $scope.userbuypkg,
                        "flowUpshiftFlag": $scope.flowUpshiftFlag,
                        "saleid": "",
                        "epageId": top.tlbs.ordersrc,
                        "effecttime": {
                            "value": $scope.flowUpshiftFlag
                        },
                        "effectperiod": {
                            "value": $scope.flowUpshiftFlag == '0' ? '1' : '0'
                        },
                        "isMonthPack": $scope.monthpack || ''
                    };
                }
                if (null  != top.tlbs.cdrData) {
                    inputData['epageId'] = top.tlbs.cdrData.pageId || '';
                }
                
                inputData['taskId'] = $scope.taskId || '';
                
                //console.log(inputData)
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'clickSubmit', inputData);
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.popblockconfig.JS.uitracingsubmit.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': $scope.pageID + '_' + 'okbtn',
                        'taskId': $scope.taskId
                    };
                    coreUtils.cdrService($scope.compData.JS.popblockconfig.JS.uitracingsubmit.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                //top.tlbs.cdrData = null;
            }
            ;
            //套餐列表样式
            $scope.packageCurrent = function(pkg) {
                var style = '';
                if (pkg != null  && pkg != undefined) {
                    var categoryid = pkg.categoryid, 
                    style;
                    if ($scope.orderedPackage[pkg.id] == 1 && pkg.iscombo == 1) {
                        style = $scope.compData.JS.packagetitlebgstate.JS.stateconfig.state0;
                    } else if ($scope.orderedPackage[pkg.id] == 1 && pkg.iscombo != 1) {
                        style = $scope.compData.JS.packagetitlebgstate.JS.stateconfig.state2;
                    } else if (pkg.status == 1 && pkg.iscombo == 1 && pkg.id == $scope.selectedPkg[categoryid]) {
                        style = $scope.compData.JS.packagetitlebgstate.JS.stateconfig.state1;
                    } else if (pkg.status == 1 && pkg.iscombo == 1 && pkg.id !== $scope.selectedPkg[categoryid]) {
                        style = $scope.compData.JS.packagetitlebgstate.JS.stateconfig.state0;
                    } else if (pkg.status == 0 && pkg.iscombo == 1) {
                        style = $scope.compData.JS.packagetitlebgstate.JS.stateconfig.state0;
                    } else if (pkg.status == 1 && pkg.iscombo != 1 && pkg.id == $scope.selectedPkg[categoryid]) {
                        style = $scope.compData.JS.packagetitlebgstate.JS.stateconfig.state3;
                    } else if (pkg.status == 1 && pkg.iscombo != 1 && pkg.id !== $scope.selectedPkg[categoryid]) {
                        style = $scope.compData.JS.packagetitlebgstate.JS.stateconfig.state2;
                    } else if (pkg.status == 0 && pkg.iscombo != 1) {
                        style = $scope.compData.JS.packagetitlebgstate.JS.stateconfig.state2;
                    }
                    return style;
                }
            
            }
            ;
            //套餐列表中颜色块标题样式
            $scope.packageCurrent2 = function(pkg) {
                if (pkg != null  && pkg != undefined) {
                    var categoryid = pkg.categoryid, 
                    style;
                    if (pkg.status == 0 || $scope.orderedPackage[pkg.id] == 1) {
                        style = $scope.compData.JS.packagetitlestate.JS.stateconfig.state2;
                    } else if (pkg.id == $scope.selectedPkg[categoryid]) {
                        style = $scope.compData.JS.packagetitlestate.JS.stateconfig.state1;
                    } else {
                        style = $scope.compData.JS.packagetitlestate.JS.stateconfig.state0;
                    }
                    return style;
                }
            }
            ;
            //单个套餐点击事件
            
            $scope.packageClick = function(pkg, index, flag) {
                if (index != null  && index != undefined && pkg != null  && pkg != undefined) {
                    $scope.compData.JS.packageIndex = index;
                    //if (pkg.status == 1) //去掉如果套餐不能订购无法点击的限制
                    {
                        var notExpandedBefore = $scope.setCurrentPkgid(pkg.id);
                        //如果已经展开，不需要重复记录话单
                        if (flag && notExpandedBefore) {
                            //top.tlbs.cdrData = null;
                            if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.packagetitlebgstate.JS.cdrConfig)) {
                                $scope.compData.JS['cdrData'] = {};
                                $scope.compData.JS.cdrData = {
                                    'pageId': $scope.pageID,
                                    'componentId': pkg.oid
                                };
                                coreUtils.cdrService($scope.compData.JS.packagetitlebgstate.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                            }
                            buybtncanclick = false;
                            
                            setTimeout(function() {
                                buybtncanclick = true
                            }, Number($scope.compData.JS.delaybuybtn || 200));
                        
                        } else {
                            buybtncanclick = true;
                        }
                    }
                
                }
            }
            ;
            
            //升档包和非升档包详情信息显示隐藏（流量，语音，短信，套餐详情，生效方式）
            $scope.packagePriceDescContentHide = function(pkg) {
                if (pkg != null  && pkg != undefined) {
                    var categoryid = pkg.categoryid;
                    if (pkg.iscombo == 1) {
                        return $scope.compData.JS.packagedescstate.JS.stateconfig.state2;
                    } else if (pkg.id == $scope.selectedPkg[categoryid]) {
                        return $scope.compData.JS.packagedescstate.JS.stateconfig.state1;
                    } else {
                        return $scope.compData.JS.packagedescstate.JS.stateconfig.state0;
                    }
                }
            }
            ;
            
            $scope.delaytime = function(param) {
                if (param != null  && param != undefined) {
                    if (param.respparam.subscribtionstatus != null  && param.respparam.subscribtionstatus != undefined && param.respparam.subscribtionstatus == 0) {
                        var pkgid = $scope.selectedPkg[$scope.currentCategoryId];
                        $scope.selectedPkg[$scope.currentCategoryId] = undefined;
                        $scope.orderedPackage[pkgid] = 1;
                        $timeout(function() {
                            for (var i = 0; i < $scope.revData.length; i++) {
                                var list = $scope.revData[i].list;
                                for (var j = 0; j < list.length; j++) {
                                    for (var j = 0; j < list.length; j++) {
                                        if (pkgid == list[j].id) {
                                            $scope.orderedPackage[pkgid] = 0;
                                            $scope.revData[i].list[j].status = $scope.packageStatus[pkgid];
                                            // if($scope.packageStatus[pkgid]=='1'&&j==0)
                                            //$scope.packageClick(list[0]);
                                        }
                                    }
                                }
                            }
                        }, $scope.compData.JS.packagetitlebgstate.JS.stateconfig.settimer);
                    
                    }
                
                }
            }
            
            var marginLeft = 0;
            var tabcontainer = angular.element($element[0].querySelector('[id="dfdfdf"]'));
            
            //套餐切换
            $scope.changeCurrent = function(param, buyflag) {
                
                $scope.taskId = '';
                if (top.tlbs.cdrData) {
                    $scope.taskId = top.tlbs.cdrData.taskId || '';
                }
                $scope.notFromStore = true;
                var times = times || 0;
                var tipsel = angular.element($element[0].querySelector('.c60_fbar_bg_pop_nopkg'));
                var popblock = angular.element($element[0].querySelector('.c60_fbar_bg_pop_block2'));
                var confirmdiag = angular.element($element[0].querySelector('.c60_fbar_pop_block2'));
                confirmdiag.css({
                    'display': 'none',
                    'z-index': '0'
                });
                var hideTips = function() {
                    popblock.css({
                        'display': 'none',
                        'z-index': '0'
                    });
                    tipsel.css({
                        'display': 'none',
                        'z-index': '0'
                    });
                }
                ;
                var displayTips = function() {
                    tipsel[0].innerHTML = $scope.compData.JS.changingtips || '查询中...';
                    popblock.css({
                        'display': 'block',
                        'z-index': '2047483647888'
                    });
                    tipsel.css({
                        'display': 'block',
                        'z-index': '2047483647889'
                    });
                }
                ;
                var process = function() {
                    var pkg = $scope.setSelected(param);
                    if (pkg) {
                        hideTips();
                        if ((buyflag || $scope.compData.JS.directBuy) && pkg.status == '1') {
                            $scope.buyNowForEach(pkg, 0);
                        }
                    } else {
                        tipsel[0].innerHTML = $scope.compData.JS.nopkgtips || '对不起，未找到指定套餐。';
                        setTimeout(
                        hideTips, Number($scope.compData.JS.pkgnofoundautohide || 2) * 1000);
                    }
                }
                var remoteData = undefined;
                var onSuccess = function(data, status, headers) {
                    remoteData = data;
                    $scope.updateData(data, true);
                    process();
                }
                ;
                var onError = function(data, status, headers) {
                    tipsel.innerHTML = $scope.compData.JS.nopkgtips || '对不起，未找到指定套餐。';
                    setTimeout(
                    hideTips, Number($scope.compData.JS.pkgnofoundautohide || 2) * 1000);
                }
                ;
                
                displayTips();
                //如果 $scope.revData为空，触发查询
                if (!$scope.revData) {
                    coreUtils.sendRequest($scope.compData.JS.pkgservice || 'packagestore', {}, onSuccess, onError);
                } else {
                    process();
                }
            
            }
            ;
            
            $scope.setSelected = function(param) {
                if (param != null  && param != undefined) {
                    var pkgid = param.pkgid;
                    var categorys = $scope.revData || [];
                    for (var i = 0, len = categorys.length; i < len; i++) {
                        list = categorys[i].list;
                        for (var j = 0, llen = list.length; j < llen; j++) {
                            if (list[j].id == pkgid || list[j].oid == param.oid || list[j].oid == param.pkgoid) {
                                $scope.compData.JS.tabcategoryIndex = i;
                                categoryid = categorys[i].categoryid;
                                pkg = list[j];
                                $scope.categoryClick(i, categorys[i], false);
                                $scope.packageClick(pkg, j, false);
                                /*if (i <= 3) {
											marginLeft = 0;
											tabcontainer.css({
											'margin-left' : 0
											});
											} else {
											marginLeft =  - (i - 3) * 100 / 3;
											tabcontainer.css({
											'margin-left' :  - (i - 3) * 100 / 3 + '%'
											});
											}*/
                                if (list[j].status == "1") {
                                //$scope.taskId = param.taskId;
                                } else {
                                    $scope.selectedPkg[categoryid] = undefined;
                                }
                                return pkg;
                            }
                        }
                    }
                }
                return undefined;
            }
            ;
            
            $scope.changeCurrentByOid = function(param) {
                $scope.changeCurrent(param, true);
            
            }
            ;
            
            $scope.touchTab = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var _lastYPos = 0;
                var _lastXPos = 0;
                var _currentYPos = 0;
                var _currentXPos = 0;
                var translatex = 0;
                var tabcontainerwrapper = angular.element($element[0].querySelector('[id="cdcdcd"]'));
                var moveflag = false;
                tabcontainer.bind(_touchstart, function(e) {
                    _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                
                });
                tabcontainer.bind(_touchmove, function(e) {
                    _currentYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    _currentXPos = e.touches ? e.touches[0].pageX : e.pageX;
                    if (Math.abs(_currentXPos - _lastXPos) > 3 || moveflag) {
                        e.stopPropagation();
                        e.preventDefault();
                        moveflag = true;
                    }
                });
                tabcontainer.bind(_touchend, function(e) {
                    
                    var xdistance = _currentXPos - _lastXPos;
                    var ydistance = _currentYPos - _lastYPos;
                    
                    var currentIndex = $scope.compData.JS.tabcategoryIndex;
                    var maxIndex = ($scope.revData || []).length - 1;
                    if (moveflag) {
                        if (xdistance < 0) {
                            currentIndex++;
                            if (currentIndex > maxIndex) {
                                currentIndex = maxIndex;
                            }
                        
                        } else {
                            currentIndex--;
                            if (currentIndex < 0) {
                                currentIndex = 0;
                            }
                        }
                        $scope.categoryClick(currentIndex, $scope.revData[currentIndex], true)
                    }
                    moveflag = false;
                    
                    //var distance = 100 / $scope.maxdisplaynum;
                    //var maxWidth =  - ($scope.revData.length - $scope.maxdisplaynum) * distance;
                    //console.log(marginLeft+'---------'+distance+'+++++++++'+xdistance)
                    /*if ($scope.revData.length > $scope.maxdisplaynum) {
								if (xdistance < 0) {
								if (marginLeft - distance >= maxWidth) {
								tabcontainer.css({
								'margin-left' : marginLeft - distance + '%'
								});
								marginLeft = marginLeft - distance;
								} else {
								tabcontainer.css({
								'margin-left' : maxWidth + '%'
								});
								marginLeft = maxWidth;
								}
								} else {
								if (marginLeft + distance <= 0) {
								tabcontainer.css({
								'margin-left' : marginLeft + distance + '%'
								});
								marginLeft = marginLeft + distance;
								} else {
								tabcontainer.css({
								'margin-left' : 0
								});
								marginLeft = 0;
								}
								}
								}*/
                    $scope.$apply();
                });
            }
            ;
            //当点击数字列表时候处理函数
            $scope.numclick = function(index) {
                var curNum = $scope.compData.JS.keyboardNum[index];
                if (Number($scope.compData.JS.keyNum) == Number(curNum)) {
                    $scope.compData.JS.confirmBtn = true;
                    $scope.compData.JS.curNum = curNum;
                    angular.element($element[0].querySelector('.c60_fbar_inputNum')).css({
                        'border': ''
                    });
                } else {
                    $scope.compData.JS.curNum = $scope.compData.JS.checkCode.JS.errorTips;
                    $scope.compData.JS.confirmBtn = false;
                    angular.element($element[0].querySelector('.c60_fbar_inputNum')).css({
                        'border': '1px solid red'
                    });
                }
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData = coreUtils.extendDeep($scope.compData, properties);
                $element.css($scope.compData.CSS || {});
                var wrapper = angular.element($element[0].querySelector(".c60_fbar_wrapper"));
                wrapper.css($scope.compData.JS.wrappercss || {
                    "padding-bottom": "1em"
                });
                var pricetips = angular.element($element[0].querySelector(".c60_fbar_pkgprice"));
                pricetips.css($scope.compData.JS.pricetipscss || {
                    "font-size": "1em",
                    "color": "red"
                });
                //将配置中的数字转化为数组-----start
                if ($scope.compData.JS.checkCode.JS.isShow) {
                    var nums = $scope.compData.JS.checkCode.JS.nums;
                    if (nums == undefined || nums == null  || nums == "") {
                        nums = $scope.compData.JS.checkCode.JS.defaultNum;
                    }
                    var numarr = [];
                    $scope.compData.JS.checkCodelen = nums.length < 6 ? nums.length : 6;
                    for (var i = 0; i < $scope.compData.JS.checkCodelen; i++) {
                        numarr[i] = nums[i];
                    }
                    //输出选择数字列表
                    $scope.compData.JS.keyboardNum = numarr;
                    $scope.compData.JS.curNum = $scope.compData.JS.checkCode.JS.curNum;
                    //将"是的，确认"按钮状态修改为不可点击，直到用户二维码才对位置
                    $scope.compData.JS.confirmBtn = false;
                }
                //将配置中的数字转化为数组-----end
                coreService.fireEvent($element.attr('cid'), 'init');
                $scope.touchTab();
            
            }
            ;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            
            $scope.eventMap['changecurrent'] = $scope.changeCurrent;
            $scope.eventMap['changecurrentbyoid'] = $scope.changeCurrentByOid;
            $scope.eventMap['confirm'] = $scope.confirmData;
            $scope.eventMap['update'] = $scope.updateData;
            $scope.eventMap['delaytime'] = $scope.delaytime;
            $scope.eventMap['queryerror'] = $scope.queryerror;
            $scope.eventMap['hideConfirmDialog'] = $scope.hideConfirmDialog;
        
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'page';
            $scope.init();
        }
    }
}
]);

uiCore.directive('ntable', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<li ng-class="{\'c60_fbar_packagePriceDesc\':true}" ng-repeat="package in param.list" ng-style="packageCurrent(package)" >' + '<div ng-class="{\'c60_fbar_packagePriceDescTitle\':true}" ng-click="packageClick(package,$index,true);">' + '<div  ng-class="{\'c60_fbar_packagePriceDescTitleSize\':true}"  ng-style="packageCurrent2(package)" ng-bind="package.title"></div>' + '<div ng-class="{\'c60_fbar_packagePriceDescTitleContent\':true,\'c60_fbar_packagePriceDescTitleContent2\':package.iscombo==1}"  ng-style="packageCurrent2(package)"  >' + '<div ng-class="{\'c60_fbar_packagePriceDescTitleNameprice\':true}">' + '<p ng-class="{\'c60_fbar_packagePriceDescTitleName\':true}"  ng-bind="package.name"></p>' + '<p ng-class="{\'c60_fbar_packagePriceDescTitleprice\':true}" ng-show="package.iscomboflag" ng-bind="package.price"></p>' + '</div>' + '</div>' + '</div>' + '<div ng-class="{\'c60_fbar_packagePriceDescContent\':true}" class="c60_fbar_detail" ng-style="packagePriceDescContentHide(package)">' + '<div ng-show="package.iscomboflag">' + '<p ng-repeat="properies in package.properies" ng-class="{\'c60_fbar_packagePriceDescContentP\':true}"  ng-bind="properies"></p>' + '</div>' + '<p ng-class="{\'c60_fbar_packagePriceDescContentP2\':true}" ng-show="!(package.iscomboflag2)"  ng-bind-html="to_trusted(package.desc)"></p>' + '<p ng-class="{\'c60_fbar_packagePriceDescContentremarks\':true}" ng-bind="package.effectdesc"></p>' + '<button ng-if="!compData.JS.showbottombuybtn" ng-class="{\'c60_fbar_BuyNowBtn\':true}" ng-style="buyNowBtnStyleForEach(package)" ng-click="buyNowForEach(package);$event.stopPropagation();" ng-bind="buyNowBtnForEach(package)"></button>' + '</div>' + '</li>',
        scope: {
            param: '=param',
        },
        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils', 'Const', '$sce', 
        function($scope, $element, $attrs, coreService, coreUtils, Const, $sce) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.to_trusted = function(text) {
                if (text != null  && text != undefined) {
                    text = text + '';
                    return $sce.trustAsHtml(text.replace(/\n/g, "<br/>"));
                } else {
                    return "";
                }
            }
            ;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'page';
        }
    }
}
]);
uiCore.directive('ipopuppkgrec', [function() {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        scope: {},
        require: '^pid',
        template: '<div class="c60_fbar_tanchuang_bottom">' 
        + '<div class="c60_fbar_tanchuangpkgrec_wrapper"  ng-show="pkgflag"><div style="overflow:hidden" simplescroll><ipoppack ecid="cid" config="{{::compData.JS}}" ppid="pageID" ng-repeat="ipack in packagelist" taskid="taskId" ipack=ipack></ipoppack></div></div>' 
        + '<div class="c60_fbar_tuisong_name clearfloat" ng-show="pkgflag"><span class="c60_fbar_tuisong_name_txt" ng-bind="compData.JS.tuisong_name_txt.text"></span></div>' 
        + '<div class="c60_fbar_mainpkg" ng-show="!pkgflag"><ul class="c60_fbar_mainpkg_list">' 
        + '<li ng-click="liCkick(mainpkg.id);" ng-repeat="mainpkg in pmdata" ccid="c60_fbar_mainpkgtj">' 
        + '<div class="c60_fbar_mainpkg_title c60_fbar_clearfloat"><div class="c60_fbar_mainpkg_title_type" style="background:{{mainpkg.color}}" ng-bind="mainpkg.text"></div><div class="c60_fbar_mainpkg_title_price" ><div class="c60_fbar_mainpkg_title_pricebgcolor" style="background:{{mainpkg.color}}"></div><span class="c60_fbar_mainpkg_title_price_color" ></span></div></div>' 
        + '<div class="c60_fbar_mainpkg_title_names" ng-bind="mainpkg.name"></div>' 
        + '<div  class="c60_fbar_mainpkg_txt"><div class="c60_fbar_mainpkg_txt_scroll" ng-bind-html="to_trusted(mainpkg.desc)" simplescroll></div></div>' 
        + '</li></ul></div></div>',
        
        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils', 
        'Const', "$compile", '$interval', '$sce', 
        function($scope, $element, $attrs, coreService, coreUtils, Const, $compile, $interval, $sce) {
            
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.pkgflag = true;
            $scope.taskId = null ;
            $scope.to_trusted = function(text) {
                if (text != null  && text != undefined) {
                    text = text + '';
                    return $sce.trustAsHtml(text.replace(/\n/g, "<br/>"));
                } else {
                    return "";
                }
            }
            ;
            $scope.update = function(param) {
                $scope.taskId = param.taskId;
                if (param.pmdata) {
                    $scope.pkgflag = false;
                    var pmdata = param.pmdata;
                    $scope.pmdatas = param.pmdata;
                    $scope.ptaskId = param.pmdata.taskId;
                    if ($scope.compData.JS.colorconfig) {
                        pmdata.currentpackage.color = $scope.compData.JS.colorconfig['color0'];
                        pmdata.recommandpackage.color = $scope.compData.JS.colorconfig['color1'];
                    }
                    if ($scope.compData.JS.textconfig) {
                        pmdata.currentpackage.text = $scope.compData.JS.textconfig['text0'];
                        pmdata.recommandpackage.text = $scope.compData.JS.textconfig['text1'];
                    }
                    
                    $scope.pmdata = [pmdata.currentpackage || {}, pmdata.recommandpackage || {}];
                
                } else {
                    $scope.pkgflag = true;
                    var colorconfig = $scope.compData.JS.colorconfig;
                    var packagelist = param.packagelist || [];
                    var list = [];
                    var value = [];
                    var temp = [];
                    for (var i = 0, len = packagelist.length; i < len; i++) {
                        list = packagelist[i].list;
                        for (var j = 0, llen = list.length; j < llen; j++) {
                            var isnull = function(obj) {
                                for (var n in obj) {
                                    return true
                                }
                                return false;
                            }
                            ;
                            if (isnull(list[j])) {
                                if (isnull(list[j].comboProperies)) {
                                    for (var x = 0; x < list[j].comboProperies.length; x++) {
                                        
                                        if (list[j].comboProperies[x].key == '2') {
                                            list[j].value = list[j].comboProperies[x].value;
                                        }
                                    
                                    }
                                }
                                list[j].categoryname = packagelist[i].categoryname;
                                list[j].eid = $scope.cid;
                                list[j].color = colorconfig['color' + i];
                                temp.push(list[j]);
                            } else {
                            
                            }
                        }
                    }
                    
                    $scope.packagelist = temp;
                }
            
            }
            ;
            $scope.liCkick = function(id) {
                if (top.tlbs.popupTxtMove == true) {
                    return;
                }
                //add by h00278783 点击弹框，上报状态消息-----------start---
                if (top.tlbs.messageid != "") {
                    coreService.fireEvent($scope.cid, 'messagestatuschange', {
                        "messageid": top.tlbs.messageid
                    });
                }
                //add by h00278783 点击弹框，上报状态消息-----------end---
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.flux_bag_recomm.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': id,
                        'taskId': $scope.taskId,
                        'iseComp': '1'
                    };
                    coreUtils.cdrService($scope.compData.JS.flux_bag_recomm.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                var titlephone = $scope.compData.JS.phonetitle || '存费送机';
                var titlefee = $scope.compData.JS.feetitle || '存费送费';
                coreService.fireEvent($scope.cid, 'storefee', {
                    'pmdatas': $scope.pmdatas,
                    'pmdata': $scope.pmdata,
                    'taskId': $scope.ptaskId,
                    'linktype': $scope.compData.JS.linkconfig.linktype || '2',
                    'url': $scope.compData.JS.linkconfig.url || 'istorefee',
                    'stitle': $scope.pmdatas.isoffer == true || $scope.pmdatas.isoffer == 'true' ? titlephone : titlefee
                });
            }
            ;
            $scope.eventMap['update'] = $scope.update;
            $scope.extendComponentData = function(componetData) {
                coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
                $element.css($scope.compData.CSS || {});
                $scope.extendComponentData(coreService.getInitProperties($scope.cid) || {});
            }
            ;
            
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'ipopuppkgrec';
            scope.init();
        }
    };
}
]);
uiCore.directive('ipoppack', function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        scope: {
            ipack: '=ipack',
            pageID: '=ppid',
            taskId: '=taskid'
        },
        template: '<div  class="c60_fbar_flux_bag_recomm" ccid="c60_fbar_flux_bag_recomm">' + '<div class="c60_fbar_flux_bag_type_price c60_fbar_clearfloat"><div class="c60_fbar_flux_bag_type c60_fbar_bg_90c666" style="background:{{ipack.color}}" ng-bind="ipack.categoryname"></div><div class="c60_fbar_flux_bag_price c60_fbar_bg_90c666" style="background:{{ipack.color}}"><span class="c60_fbar_flux_bag_price_color" ng-bind="unitconfig+ipack.price"></span></div></div>' + '<div class="c60_fbar_flux_volume_txt" ng-bind="ipack.value"></div>' + 
        '</div>',
        controller: [
        "$scope", 
        "$element", 
        "$attrs", 
        'coreService', 
        'coreUtils', 
        'Const', 
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.touchLink = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var _lastYPos = 0;
                var _lastXPos = 0;
                var _currentYPos = 0;
                var _currentXPos = 0;
                var moveflag = false;
                var startflag = false;
                $element.bind(_touchstart, function(e) {
                    _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    moveflag = false;
                    startflag = true;
                });
                $element.bind(_touchmove, function(e) {
                    _currentYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    if (Math.abs(_currentYPos - _lastYPos) > 3) {
                        moveflag = true;
                    } else {
                        moveflag = false;
                    }
                });
                $element.bind(_touchend, function(e) {
                    //add by h00278783 点击弹框，上报状态消息-----------start---
                    try {
                        if (top.tlbs.messageid != "") {
                            coreService.fireEvent($scope.cid, 'messagestatuschange', {
                                "messageid": top.tlbs.messageid
                            });
                        }
                        //add by h00278783 点击弹框，上报状态消息-----------end---
                        
                        if (startflag == true && moveflag == false) {
                            var config = coreUtils.String2JSON($attrs['config']);
                            
                            if (coreUtils.cdrUtils.canWriteUITracingCDR(config.flux_bag_recomm.cdrConfig)) {
                                $scope.compData.JS['cdrData'] = {};
                                $scope.compData.JS.cdrData = {
                                    'pageId': $scope.pageID,
                                    'componentId': $scope.ipack.id,
                                    'taskId': $scope.taskId,
                                    'iseComp': '1'
                                };
                                coreUtils.cdrService(config.flux_bag_recomm.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                            }
                            
                            coreService.fireEvent($scope.ipack.eid, 'click0', {
                                'pkgid': $scope.ipack.id,
                                'taskid': $scope.taskId
                            });
                            coreService.fireEvent($scope.ipack.eid, 'click', {
                                'pkgid': $scope.ipack.id,
                                'pkgoid': $scope.ipack.oid,
                                'taskid': $scope.taskId
                            });
                        }
                    } 
                    finally {
                        
                        startflag = false;
                        moveflag = false;
                    }
                
                });
            }
            ;
            
            
            $scope.click = function(ipack) {
                //add by h00278783 点击弹框，上报状态消息-----------start---
                if (top.tlbs.messageid != "") {
                    coreService.fireEvent($scope.cid, 'messagestatuschange', {
                        "messageid": top.tlbs.messageid
                    });
                }
                //add by h00278783 点击弹框，上报状态消息-----------end---
                var config = coreUtils.String2JSON($attrs['config']);
                
                if (coreUtils.cdrUtils.canWriteUITracingCDR(config.flux_bag_recomm.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': ipack.id,
                        'taskId': $scope.taskId,
                        'iseComp': '1'
                    };
                    coreUtils.cdrService(config.flux_bag_recomm.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent(ipack.eid, 'click0', {
                    'pkgid': ipack.id,
                    'taskid': $scope.taskId
                });
                coreService.fireEvent(ipack.eid, 'click', {
                    'pkgid': ipack.id,
                    'taskid': $scope.taskId
                });
            
            }
            ;
            $scope.init = function() {
                var config = coreUtils.String2JSON($attrs['config']);
                $scope.unitconfig = config.unitconfig.unitisShow == true ? config.unitconfig.unit : '';
                $scope.touchLink();
            }
            ;
        }
        ],
        
        link: function($scope, $element, $attrs, ctl) {
            $scope.compData = {
                'JS': {},
                'CSS': {}
            };
            
            $scope.init();
        }
    }
});
uiCore.directive('ipopuptop', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        //            transclude: true,
        scope: {},
        template: '<div class="c60_fbar_tanchuang_top"><div class="c60_fbar_pop_close " id="c60_fbar_tctj_pop_close" ccid="c60_fbar_pop_close" ng-bind="compData.JS.popclose.text" ></div>' 
        + '<div class="c60_fbar_flux_info_wrap" ng-show="textflag"><div class="c60_fbar_flux_info c60_fbar_clearfloat" ng-show="toptextflag"><div class="c60_fbar_flux_big_txt" ng-bind="remaincomp.v"></div><div class="c60_fbar_flux_small_txt"><div class="c60_fbar_shengyu_txt" ng-bind="compData.JS.shengyu.JS.text"></div><div class="c60_fbar_shengyu_txt" ng-bind="remaincomp.u"></div></div></div></div>' 
        + '<div class="c60_fbar_flux_textmes c60_fbar_clearfloat" ng-show="!textflag" ng-bind="compData.JS.tipstext.text"></div>' 
        + '<div class="c60_fbar_alert_txt"><div class="C60_fbar_alert_texts" ng-bind-html="to_trusted(message)" ng-style="cus_style"  simplescroll style="overflow:hidden;"></div></div>' 
        + '<div class="c60_fbar_look_detail_btn" ccid="c60_fbar_look_detail_btn" ng-click="detail();$event.stopPropagation();$event.preventDefault();"><a class="c60_fbar_ld_btn_link" ng-bind="compData.JS.ld_btn_link.JS.text" ng-style="btn_style"></a></div>' 
        + '</div>',
        
        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils', 
        'Const', "$compile", '$interval', '$sce', 
        function($scope, $element, $attrs, coreService, coreUtils, Const, $compile, $interval, $sce) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {};
            $scope.summary = {};
            $scope.taskId = null ;
            $scope.textflag = true;
            $scope.toptextflag = true;
            var setting = {
                'K': 1024,
                'M': 1024 * 1024,
                'G': 1024 * 1024 * 1024,
                'T': 1024 * 1024 * 1024 * 1024
            };
            $scope.to_trusted = function(text) {
                if (text != null  && text != undefined) {
                    text = text + '';
                    return $sce.trustAsHtml(text.replace(/\n/g, "<br/>"));
                } else {
                    return "";
                }
            }
            ;
            
            $scope.transferK = function(value, keepfloat) {
                var n = keepfloat || 2;
                var result = 0;
                if (value < setting['M']) {
                    result = value / 1024;
                    return {
                        v: coreUtils.formatNum(result, n),
                        u: 'MB'
                    }
                
                } else if (value < setting['G']) {
                    result = value / 1024 / 1024;
                    return {
                        v: coreUtils.formatNum(result, n),
                        u: 'GB'
                    }
                } else {
                    result = value / 1024 / 1024 / 1024;
                    return {
                        v: coreUtils.formatNum(result, n),
                        u: 'TB'
                    }
                }
            
            }
            ;
            $scope.extendComponentData = function(componetData) {
                coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            var closeContainer = angular.element($element[0].querySelector('[id="c60_fbar_tctj_pop_close"]'));
            $scope.touchClose = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var _lastYPos = 0;
                var _lastXPos = 0;
                var _currentYPos = 0;
                var _currentXPos = 0;
                closeContainer.bind(_touchend, function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    coreService.fireEvent($scope.cid, 'notificationclose');
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.popclose.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, '', 'closeBtn')
                        };
                        coreUtils.cdrService($scope.compData.JS.popclose.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.$apply();
                    top.tlbs.notificationCdrData = null ;
                });
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
                //$scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $element.css($scope.compData.CSS || {});
                angular.element($element[0].querySelector('.flux_info')).css($scope.compData.JS.flux_info.CSS);
                angular.element($element[0].querySelector('.ld_btn_link')).css($scope.compData.JS.ld_btn_link.CSS);
                angular.element($element[0].querySelector('.c60_fbar_alert_txt')).css(($scope.compData.JS.c60_fbar_alert_txt || {}).CSS || {});
                
                //$scope.processConfig();
                $scope.touchClose();
            }
            ;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });
            $scope.update = function(param) {
                if (param.pmdata) {
                    $scope.textflag = false;
                    angular.element($element[0].querySelector('.C60_fbar_alert_texts')).css(($scope.compData.JS.alert_texts || {}).CSS || {});
                    var pmdata = param.pmdata;
                    $scope.pmdatas = param.pmdata;
                    $scope.ptaskId = param.pmdata.taskId;
                    pmdata.currentpackage.color = $scope.compData.JS.colorconfig['color0'];
                    pmdata.recommandpackage.color = $scope.compData.JS.colorconfig['color1'];
                    pmdata.currentpackage.text = $scope.compData.JS.textconfig['text0'];
                    pmdata.recommandpackage.text = $scope.compData.JS.textconfig['text1'];
                    $scope.pmdata = [pmdata.currentpackage || {}, pmdata.recommandpackage || {}];
                } else {
                    $scope.textflag = true;
                
                }
                $scope.message = param.message;
                $scope.cus_style = param.style || {};
                $scope.btn_style = param.btnstyle || {};
                
                if (param.traffic) {
                    $scope.traffic = param.traffic;
                    if (param.traffic.summary !== undefined && param.traffic.summary !== '' && param.traffic.summary !== null ) {
                        $scope.summary = param.traffic.summary[0] || [];
                        if ($scope.summary.remain == null  || $scope.summary.remain == '' || $scope.summary.remain == undefined) {
                            $scope.toptextflag = false;
                            angular.element($element[0].querySelector('.tbholder .c60_fbar_alert_txt')).css('margin-top', '1.4em');
                        } else {
                            $scope.remaincomp = $scope.transferK($scope.summary.remain);
                            $scope.toptextflag = true;
                        }
                    
                    }
                }
                
                
                
                $scope.taskId = param.taskId;
                
                top.tlbs.messageid = param.messageid || "";
            }
            $scope.eventMap['update'] = $scope.update;
            $scope.processConfig = function() {
                
                angular.element($element[0].querySelector('.c60_fbar_alert_txt')).css($scope.compData.JS.c60_fbar_alert_txt.CSS || {});
            }
            ;
            
            $scope.showNotification = function(eventObj) {
                if (null  != eventObj && null  != eventObj.notifyImage) {
                    preloadimages(eventObj.notifyImage).done(function() {
                        $element.css('display', 'block');
                        angular.element($element[0].querySelector('[id="imageholder"]')).css('background-image', "url('" + eventObj.notifyImage + "')");
                    });
                }
            }
            ;
            $scope.eventMap['showNotification'] = $scope.showNotification;
            
            /* $scope.closeNotification = function() {
                    coreService.fireEvent($scope.cid, 'notificationclose');
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.popclose.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID,'','closeBtn')
                        };
                        coreUtils.cdrService($scope.compData.JS.popclose.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }

                };*/
            
            $scope.notificationClick = function() {
                coreService.fireEvent($scope.cid, 'notificationClick');
            }
            ;
            
            $scope.detail = function() {
                if ($scope.pmdatas) {
                    var titlephone = $scope.compData.JS.phonetitle || '存费送机';
                    var titlefee = $scope.compData.JS.feetitle || '存费送费';
                    coreService.fireEvent($scope.cid, 'storefee', {
                        'pmdatas': $scope.pmdatas,
                        'pmdata': $scope.pmdata,
                        'taskId': $scope.ptaskId,
                        'linktype': $scope.compData.JS.ld_btn_link.JS.linktype || '2',
                        'url': $scope.compData.JS.ld_btn_link.JS.url || 'istorefee',
                        'stitle': $scope.pmdatas.isoffer == true || $scope.pmdatas.isoffer == 'true' ? titlephone : titlefee
                    });
                
                } else {
                    coreService.fireEvent($scope.cid, 'todetail');
                }
                
                //add by h00278783 点击弹框，上报状态消息-----------start---
                if (top.tlbs.messageid != "") {
                    coreService.fireEvent($scope.cid, 'messagestatuschange', {
                        "messageid": top.tlbs.messageid
                    });
                }
                //add by h00278783 点击弹框，上报状态消息-----------end---
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.detailbtn.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'detailbtn'),
                        'iseComp': '1'
                    };
                    coreUtils.cdrService($scope.compData.JS.detailbtn.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
            }
            
            var ThumbnailImageArray = [];
            
            function preloadimages(arr) {
                var loadedimages = 0
                var postaction = function() {}
                var arr = (typeof arr != "object") ? [arr] : arr
                
                function imageloadpost() {
                    loadedimages++;
                    if (loadedimages == arr.length) {
                        postaction(ThumbnailImageArray);
                        //call postaction and pass in newimages array as parameter
                    }
                }
                ;
                
                for (var i = 0; i < arr.length; i++) {
                    ThumbnailImageArray[i] = new Image();
                    ThumbnailImageArray[i].src = arr[i];
                    ThumbnailImageArray[i].onload = function() {
                        imageloadpost();
                    }
                    ;
                    ThumbnailImageArray[i].onerror = function() {
                        imageloadpost();
                    }
                    ;
                }
                return {
                    done: function(f) {
                        postaction = f || postaction
                    }
                };
            }
            ;
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'ipopuptop';
            scope.init();
        }
    };
}
]);
uiCore.directive('popupwelcome', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_popupwelcome"><div class="c60_fbar_wchbg_pop_block"></div>' + '<div class="c60_fbar_bg_piru" ng-style="pureWelcomeStyle(\'bg\')">' + '<div class="c60_fbar_piru_close" ccid="c60_fbar_popupwelcome_btnclose"   ng-style="pureWelcomeStyle(\'close\')"></div>' + '<div class="c60_fbar_piru_btn_txt">' + '<div class="c60_fbar_piru_txt"  ng-style="pureWelcomeStyle(\'message\')" ><p ng-bind-html="to_trusted(revData.message)" simplescroll></p></div>' + '<div class="c60_fbar_piru_btn"  ccid="c60_fbar_popupwelcome_btn" ng-style="pureWelcomeStyle(\'begin\')" ng-bind="nowbegin()"></div>' + '</div>' + '</div>' + '</div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", "$timeout", 'coreService', 'coreUtils', 'Const', '$sce', 
        function($scope, $element, $attrs, $timeout, coreService, coreUtils, Const, $sce) {
            $scope.cid = $attrs.cid;
            $scope.compData = {};
            $scope.eventMap = {};
            $scope.revData = {};
            $scope.to_trusted = function(text) {
                if (text != null  && text != undefined) {
                    text = text + '';
                    return $sce.trustAsHtml(text.replace(/\n/g, "<br/>"));
                } else {
                    return "";
                }
            }
            ;
            //获取后台数据
            $scope.updateData = function(param) {
                $element.css({
                    'display': 'block'
                });
                if (param != null  && param != undefined) {
                    if (param.message != null  && param.message != undefined) {
                        top.tlbs.messageid = param.messageid || "";
                        $scope.revData.message = param.message;
                    } else {
                        $scope.revData.message = '';
                    }
                
                }
                var time = $scope.compData.JS.closetime;
                //add by h00278783 当植入时候弹框，需要自动隐藏，消息中心不需要自动隐藏------start-----
                if (top.tlbs.messageid != "") {
                    $timeout(function() {
                        if ($element.css('display') != 'none') {
                            top.tlbs.notificationCdrData = null ;
                        }
                        $scope.hide();
                    }, time);
                }
                //add by h00278783 当植入时候弹框，需要自动隐藏，消息中心不需要自动隐藏------end-----
            }
            ;
            $scope.hide = function() {
                $element.css({
                    'display': 'none'
                });
            }
            ;
            var _touchstart = Const.touchEvent.start
              , 
            container = angular.element($element[0].querySelector('.c60_fbar_piru_btn'))
              , 
            container2 = angular.element($element[0].querySelector('.c60_fbar_piru_close'));
            
            container.bind(_touchstart, function(e) {
                e.stopPropagation();
                e.preventDefault();
                _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                $element.css({
                    'display': 'none'
                });
                //add by h00278783 点击弹框，上报状态消息-----------start---
                if (top.tlbs.messageid != "") {
                    coreService.fireEvent($scope.cid, 'messagestatuschange', {
                        "messageid": top.tlbs.messageid
                    });
                }
                //add by h00278783 点击弹框，上报状态消息-----------end---
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.popupbeginconfig.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'startbtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.popupbeginconfig.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
            });
            container2.bind(_touchstart, function(e) {
                e.stopPropagation();
                e.preventDefault();
                _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                $element.css({
                    'display': 'none'
                });
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.popupcloseconfig.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'closebtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.popupcloseconfig.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                top.tlbs.notificationCdrData = null ;
            });
            $scope.nowbegin = function() {
                return $scope.compData.JS.popupbeginconfig.JS.stateconfig.text;
            }
            $scope.pureWelcomeStyle = function(type) {
                if (type != null  && type != undefined) {
                    switch (type) {
                    case 'bg':
                        return $scope.compData.JS.popupbgconfig.JS.stateconfig.state;
                        break;
                    case 'close':
                        return $scope.compData.JS.popupcloseconfig.JS.stateconfig.state;
                        break;
                    case 'begin':
                        return $scope.compData.JS.popupbeginconfig.JS.stateconfig.state;
                        break;
                    case 'message':
                        return $scope.compData.JS.popupdescconfig.JS.stateconfig.state;
                        break;
                    default:
                        break;
                    }
                }
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData = coreUtils.extendDeep($scope.compData, properties);
                coreService.fireEvent($element.attr('cid'), 'init');
            }
            ;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            $scope.eventMap['update'] = $scope.updateData;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'popupwelcome';
            $scope.init();
        }
    }
}
]);
uiCore.directive('appdownload', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_appdownload" ng-style="getConfigStyle({appdownload:1})">' + '<div class="c60_fbar_app_result_con" ng-style="getapp_result_conStyle()">' + '<div class="c60_fbar_succ_img_con"><img class="c60_fbar_succ_img"  ng-src="{{appresulturl()}}"/></div>' + '<div class="c60_fbar_tips_txt" ng-bind="appresulttips()"></div>' + '<div class="c60_fbar_result_btn" ccid="c60_fbar_link_btn"><a class="c60_fbar_link_btn" ng-bind="appresulttxt()" ng-click="returnclick()"></a></div>' + '</div>' + '<div class="tbholder c60_fbar_download">' + '    <div class="c60_fbar_download_app" simplescroll>' + '        <div class="c60_fbar_download_app_list" ng-repeat="appCategory in appCategorys">' + '        	<div class="c60_fbar_download_app_list_title c60_fbar_clearfloat">' + '            	<span class="c60_fbar_dalt_colorline" ng-style="getColorStyle($index)"></span>' + '                <span class="c60_fbar_dalt_txt">' + '					<span class="c60_fbar_dalt_txt_tit">{{appCategory.categoryName}}</span>' + '					<span class="c60_fbar_dalt_txt_name" ng-style="getTxtStyle($index)">{{appCategory.description}}</span></span>' + '                 <a class="c60_fbar_dalt_link" ccid="c60_fbar_dalt_link" ng-style="getStyle()" ng-click="more(appCategory.appCategoryID,$index)" ng-bind="compData.JS.more.JS.text"></a>' + '           </div>' + '           <div class="c60_fbar_download_app_list_detail">' + '           	<ul class="c60_fbar_dald_ul c60_fbar_clearfloat">' + '               	<li class="c60_fbar_dald_li" ccid="c60_fbar_dald_li" ng-repeat="app in appCategory.apps" ng-click="download(app.link,app.iappID)">' + '                   	<img class="c60_fbar_dald_ul_img" ng-src="{{app.logourl}}" alt=""/>' + '                       <p class="c60_fbar_dald_ul_txt">{{app.appName}}</p>' + '                   </li>' + '               </ul>' + '           </div>' + '       </div>' + '  </div>' + '</div>' + '</div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 
        'coreUtils', 
        'Const', 
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.compData = {};
            $scope.eventMap = {};
            $scope.len1 = 7.2;
            $scope.download = function(link, iappID) {
                if (link != null  && link != undefined && link != "" && iappID != null  && iappID != undefined) {
                    window.open(link);
                    coreService.fireEvent($element.attr('cid'), 'gaingoldcoinchain', {
                        "id": iappID
                    });
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_dald_li.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': iappID
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_dald_li.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                }
            }
            $scope.getColorStyle = function(index) {
                if (index != null  && index != undefined) {
                    if (Number(index) % 2 == 0) {
                        return $scope.compData.JS.c60_fbar_dalt_colorline_green;
                    } else {
                        return $scope.compData.JS.c60_fbar_dalt_colorline_orange;
                    }
                }
            }
            $scope.getTxtStyle = function(index) {
                if (index != null  && index != undefined) {
                    if (Number(index) % 2 == 0) {
                        return $scope.compData.JS.c60_fbar_dalt_green_txt;
                    } else {
                        return $scope.compData.JS.c60_fbar_dalt_orange_txt;
                    }
                }
            }
            $scope.getStyle = function() {
                if ($scope.compData.JS != null  && $scope.compData.JS != undefined) {
                    if ($scope.compData.JS.more.CSS.isShow == true) {
                        return $scope.compData.JS.more.CSS.show;
                    } else {
                        return $scope.compData.JS.more.CSS.hide;
                    }
                }
            }
            $scope.getConfigStyle = function(input) {
                var classname;
                for (item in input) {
                    classname = item;
                    break;
                }
                if ($scope.compData.JS[classname] && $scope.compData.JS[classname].CSS) {
                    return $scope.compData.JS[classname].CSS;
                }
            }
            ;
            $scope.more = function(appCategoryID, index) {
                if ($scope.woChain != null  && $scope.woChain != undefined) {
                    if ($scope.woChain.auth == null  || $scope.woChain.auth == undefined || $scope.woChain.auth == "") {
                        var auth = "";
                    } else {
                        var auth = $scope.woChain.auth;
                    }
                    if ($scope.woChain.jsessionid == null  || $scope.woChain.jsessionid == undefined || $scope.woChain.jsessionid == "") {
                        var jsessionid = "";
                    } else {
                        var jsessionid = $scope.woChain.jsessionid;
                    }
                } else {
                    var auth = "";
                    var jsessionid = "";
                }
                var defaulturl = $scope.compData.JS.more.JS.link.defaulturl || '';
                var defaultstatus = $scope.compData.JS.more.JS.link.defaultstatus || '0';
                var urlLink = $scope.compData.JS.more.JS.link["url" + index] || defaulturl;
                var url = urlLink.replace("{auth}", auth);
                url = url.replace("{jsessionid}", jsessionid);
                if (Number($scope.compData.JS.more.JS.linktype["status" + index] || defaultstatus) == 1) {
                    window.open(url);
                } else {
                    coreService.fireEvent($element.attr('cid'), 'more', {
                        "url": url
                    });
                }
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_dalt_link.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': appCategoryID
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_dalt_link.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
            
            }
            $scope.changeStyle = function() {
                angular.element($element[0].querySelector('.tbholder .c60_fbar_download')).css({
                    "padding-top": '10em'
                });
            }
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.JS = properties.JS || {};
                $scope.paddingtop = $scope.compData.JS.appdownload.CSS;
                $element.css(properties.CSS);
                //coreService.fireEvent($element.attr('cid'), 'init');
            }
            ;
            
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            $scope.updateData = function(param) {
                if (param != null  && param != undefined && param.respparam != null  && param.respparam != undefined) {
                    $scope.respData = param.respparam;
                    if ($scope.respData.appdownload != null  && $scope.respData.appdownload != undefined && $scope.respData.appdownload.appCategorys != null  && $scope.respData.appdownload.appCategorys != undefined && $scope.respData.appdownload.appCategorys.length > 0) {
                        $scope.appCategorys = [];
                        var len = $scope.respData.appdownload.appCategorys.length;
                        var count = 0;
                        for (var j = 0; j < len; j++) {
                            if ($scope.respData.appdownload.appCategorys[j].apps.length > 0) {
                                
                                $scope.appCategorys[count] = $scope.respData.appdownload.appCategorys[j];
                                count++;
                            }
                        }
                        if ($scope.appCategorys.length == 0) {
                            $scope.showError();
                            return false;
                        }
                        $scope.showSuccess();
                        for (var i = 0; i < $scope.appCategorys.length; i++) {
                            var app = $scope.appCategorys[i].apps;
                            var l = Math.ceil(app.length / 5);
                            $scope.len1 = $scope.len1 + l * 5.5;
                        }
                        angular.element($element[0].querySelector('.c60_fbar_download_app')).attr('totalheight', $scope.len1 * 16 + "px");
                    } else {
                        $scope.showError();
                        return false;
                    }
                } else {
                    $scope.showError();
                    return false;
                }
            }
            ;
            $scope.gainGoldCoin = function(param) {
                if (param && param.respparam) {
                    $scope.gainGoldCoin = param.respparam;
                }
            }
            ;
            $scope.queryWoChain = function(param) {
                if (param && param.respparam) {
                    $scope.woChain = param.respparam.session;
                }
            }
            ;
            $scope.showError = function() {
                $scope.compData.JS.c60_fbar_app_result_con.JS.showconfig.status = 1;
                $scope.compData.JS.appdownload.CSS = {
                    'padding-top': '5em'
                };
                $element.css($scope.compData.JS.appdownload.CSS);
                angular.element($element[0].querySelector('.c60_fbar_download_app')).css({
                    'display': 'none'
                });
                coreService.fireEvent($element.attr('cid'), 'showerror');
            }
            ;
            $scope.showSuccess = function() {
                $scope.compData.JS.c60_fbar_app_result_con.JS.showconfig.status = 0;
                $scope.compData.JS.appdownload.CSS = $scope.paddingtop;
                $element.css($scope.compData.JS.appdownload.CSS);
                angular.element($element[0].querySelector('.c60_fbar_download_app')).css({
                    'display': 'block'
                });
                coreService.fireEvent($element.attr('cid'), 'showsucc');
            }
            ;
            $scope.error = function() {
                $scope.showError();
            }
            ;
            $scope.getapp_result_conStyle = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_app_result_con) {
                    if ($scope.compData.JS.c60_fbar_app_result_con.JS.showconfig.status == 0) {
                        return $scope.compData.JS.c60_fbar_app_result_con.JS.showconfig.status0;
                    } else {
                        return $scope.compData.JS.c60_fbar_app_result_con.JS.showconfig.status1;
                    }
                }
            }
            ;
            $scope.appresulturl = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_app_result_con) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_app_result_con.JS.statusconfig.status;
                    var imgUrl = $scope.compData.JS.c60_fbar_app_result_con.JS.statusconfig[status].imgUrl;
                    return imgUrl.replace(/'/g, '');
                }
            }
            ;
            $scope.appresulttxt = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_app_result_con) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_app_result_con.JS.statusconfig.status;
                    var btntxt = $scope.compData.JS.c60_fbar_app_result_con.JS.statusconfig[status].btntxt;
                    return btntxt;
                }
            }
            ;
            $scope.appresulttips = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_app_result_con) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_app_result_con.JS.statusconfig.status;
                    var tipstxt = $scope.compData.JS.c60_fbar_app_result_con.JS.statusconfig[status].tipstxt;
                    return tipstxt;
                }
            }
            ;
            $scope.returnclick = function() {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'goFirstPage')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'goFirstPage');
            }
            ;
            
            $scope.eventMap['update'] = $scope.updateData;
            $scope.eventMap['change'] = $scope.changeStyle;
            $scope.eventMap['gaingoldcoin'] = $scope.gainGoldCoin;
            $scope.eventMap['querywo'] = $scope.queryWoChain;
            $scope.eventMap['error'] = $scope.error;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'page';
            $scope.path = top.tlbs.templatePath;
            $scope.init();
        }
    }
}
]);
uiCore.directive('fbtn', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_fbtn"><div ng-bind="compData.js.text" class="c60_fbar_fbtn_txt"></div></div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 
        'coreUtils', 
        'Const', "$compile", "$timeout", function($scope, $element, $attrs, coreService, coreUtils, Const, $compile, $timeout) {
            $scope.compData = {
                js: {},
                css: {}
            
            };
            $scope.eventMap = {};
            var txtelement = angular.element($element[0].querySelector('.c60_fbar_fbtn_txt'));
            
            $scope.clickbtn = function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.js.cdrConfig)) {
                    $scope.compData.js['cdrData'] = {};
                    $scope.compData.js.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': $scope.cid
                    };
                    coreUtils.cdrService($scope.compData.js.cdrConfig.uitracingcdr, $scope.compData.js.cdrData);
                }
                if ($element.attr('cid') == 'closebtn') 
                {
                //								 var htmls = top.document.getElementsByTagName('html')[0];
                //								 var bodys = top.document.getElementsByTagName('body')[0];
                //								 htmls.style.overflowY='auto';
                //								 bodys.style.overflowY='auto';
                }
                coreService.fireEvent($element.attr('cid'), "btnclick");
            
            }
            ;
            
            $scope.showTxt = function(data) {
                if (data && data.text) {
                    if ($scope.cid == "messagebtn" && (Number(data.text) > 99)) {
                        $scope.compData.js.text = $scope.compData.js.defaultText;
                        txtelement.css($scope.compData.js.state1 || {});
                    } else {
                        $scope.compData.js.text = data.text;
                        txtelement.css($scope.compData.js.state0 || {});
                    }
                
                }
                txtelement.css({
                    "display": "block"
                });
            
            }
            ;
            
            $scope.hideTxt = function() {
                txtelement.css({
                    "display": "none"
                });
            
            }
            ;
            //add by h00278783 2015.06.23---小红点----start-----
            $scope.queryMessageStatusFunOne = function() {
                coreService.fireEvent($element.attr('cid'), 'queryMessageStatus');
            }
            ;
            $scope.eventMap['queryMessageStatusFunOne'] = $scope.queryMessageStatusFunOne;
            var queryMessageStatusFun = function() {
                coreService.fireEvent($element.attr('cid'), 'queryMessageStatus');
                $timeout(queryMessageStatusFun, Number($scope.compData.js.queryStatusTimer) * 1000);
            }
            ;
            //每隔一段时间查询下消息状态
            $scope.queryMsgBoxTimer = function() {
                queryMessageStatusFun();
            }
            ;
            $scope.eventMap['queryMsgBoxTimer'] = $scope.queryMsgBoxTimer;
            $scope.queryMsgBox = function(data) {
                if (data && data.respparam) {
                    if (Number(data.respparam.unreadmessages) > 0) {
                        $scope.showTxt({
                            "text": data.respparam.unreadmessages
                        });
                    } else {
                        $scope.hideTxt();
                    }
                }
            }
            ;
            $scope.eventMap['queryMsgBox'] = $scope.queryMsgBox;
            // add by h00278783 2015.06.23---小红点--end--
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.js = properties.JS || {};
                $element.css($scope.compData.css);
                txtelement.css($scope.compData.js.textstyle || {});
                $element[0].addEventListener(Const.touchEvent.end, $scope.clickbtn, false);
                //$element.bind(,)
                //DTS2015071506965
                //							$element.bind(Const.touchEvent.end, $scope.clickbtn);	
                coreService.fireEvent($element.attr('cid'), 'init');
            
            }
            ;
            
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            
            $scope.eventMap['hidetxt'] = $scope.hideTxt;
            $scope.eventMap['showtxt'] = $scope.showTxt;
        }
        
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.cid = $attrs['cid'];
            $scope.componentType = 'fbtn';
            $scope.init();
        }
    }
}
]);
uiCore.directive('packageactivity', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div>' + '<div class="c60_fbar_packageactivity" >' + '<div class="c60_fbar_pkgact_result_con" ng-style="gettaocan_result_conStyle()">' + '<div class="c60_fbar_succ_img_con"><img class="c60_fbar_succ_img"  ng-src="{{taocanresulturl()}}"/></div>' + '<div class="c60_fbar_tips_txt" ng-bind="taocanresulttips()"></div>' + '<div class="c60_fbar_result_btn" ccid="c60_fbar_link_btn"><a class="c60_fbar_link_btn" ng-bind="taocanresulttxt()" ng-click="returnclick()"></a></div>' + '</div>' + '<div class="c60_fbar_tc_activity_con">' + '<div class="c60_fbar_pwrapper"><div style="width:100%;height:100%;position:relative">' + '<ul simplescroll>' + '<li ng-repeat="package in respData.packages" ccid="c60_fbar_icon_click" ng-click="iconClick($index);$event.stopPropagation();">' + '<div class="c60_fbar_taocan_type_list">' + '<div class="c60_fbar_type_name c60_fbar_clearfloat">' + '<div class="c60_fbar_name">{{package.packageName}}（<span class="c60_fbar_txt_orange">{{package.packagePrice}}</span>{{package.priceUnit}}）</div>' + '<div class="c60_fbar_arrow_btn">' + '<span class="c60_fbar_arrow_right" ng-style="getIconStyle($index)"></span>' + '<span class="c60_fbar_buy_btn" ccid="c60_fbar_buy_btn" ng-click="popDown($index);$event.stopPropagation();" ng-style="getBtnStyle($index)">立即订购</span>' + '	</div>' + '</div>' + '<div class="c60_fbar_type_txt" ng-style="getOptionStyle($index)">{{package.packageDesc}}</div>' + '</div>' + '</li></ul></div>' + '</div>' + '<div class="c60_fbar_activity_tips">' + '<div class="c60_fbar_activity_tips_tit">活动须知</div>' + '  <div class="c60_fbar_activity_tips_txt">{{activityDesc}}</div>' + '<div>' + '</div>' + '</div>' + '<div ng-class="{\'c60_fbar_mbg_pop_block\':true}"  ng-click="$event.stopPropagation();" ng-show="flag"></div>' + '<div ng-class="{\'c60_fbar_mpop_block\':true}"  ng-show="flag">' + '<div ng-class="{\'c60_fbar_img_txt_info\':true}">' + '<table cellpadding="0" cellspacing="0" ng-class="{\'c60_fbar_img_txt_table\':true}">' + '<tr>' + '<td><span ng-class="{\'c60_fbar_haveatea\':true}" ng-style="popBlock(\'ico\')"></span></td>' + '<td>' + '<div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-bind="recedata.phoneNo"></div>' + '<div ng-class="{\'c60_fbar_pop_txt1\':true}">确认订购<span ng-class="{\'c60_fbar_txt_green\':true}" ng-style="popBlock(\'packagename\')" ng-bind="packageName"></span>？</div>' + '<div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-show="effectiveWayFlag==1?true:false"><span ng-class="{\'c60_fbar_sx_txt_out\':true}" >本套餐</span>' + '<span ng-class="{\'c60_fbar_sx_time\':true}"><span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_left\':true}" ng-style="effectiveLeftRight(1)" ccid="c60_fbar_pkgact_effective1" ng-click="checkEffectiveClick(1);$event.stopPropagation();" ng-bind="recedata.effectiveWay0"></span>' + '<span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_right\':true}" ng-style="effectiveLeftRight(2)" ccid="c60_fbar_pkgact_effective2" ng-click="checkEffectiveClick(2);$event.stopPropagation();" ng-bind="recedata.effectiveWay1"></span></span></div>' + '<div ng-class="{\'c60_fbar_txt1\':true}" ng-show="effectiveWayFlag==0?true:false">本套餐<span ng-bind="recedata.effectiveWay"></span></div></div>' + '</td>' + '</tr>' + '</table>' + '</div>' + '<div ng-class="{\'c60_fbar_img_txt_btn2\':true}">' + '<div ng-class="{\'c60_fbar_left_itbtn\':true}" ccid="c60_fbar_left_itbtn" ng-style="popBlock(\'cancel\')" ng-click="popBlockHide();$event.stopPropagation();">不了，谢谢</div>' + '<div ng-class="{\'c60_fbar_right_itbtn\':true}" ccid="c60_fbar_right_itbtn" ng-style="popBlock(\'submit\')"  ccid="c60_fbar_pkgact_btn" ng-click="popSubmit()">是的，确认</div>' + '</div>' + '</div>' + '</div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils', 
        'Const', 
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.compData = {};
            $scope.flag = false;
            $scope.eventMap = {};
            $scope.popDown = function(index) {
                $scope.obj = $scope.respData.packages[index];
                $scope.packageName = "【" + $scope.obj.packageName + "】";
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click0', {
                    "id": $scope.obj.packageID
                });
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_buy_btn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': $scope.obj.packageID
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_buy_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
            }
            ;
            $scope.popBlock = function(type) {
                if (type != null  && type != undefined) {
                    if (type == 'ico') {
                        return $scope.compData.JS.popblockconfig.JS.icoconfig;
                    } else if (type == 'packagename') {
                        return $scope.compData.JS.popblockconfig.JS.packagenameconfig;
                    } else if (type == 'cancel') {
                        return $scope.compData.JS.popblockconfig.JS.btnconfig.state0;
                    } else if (type == 'submit') {
                        return $scope.compData.JS.popblockconfig.JS.btnconfig.state1;
                    }
                }
            }
            ;
            $scope.effectiveLeftRight = function(no) {
                if (no != null  && no != undefined) {
                    if (no == 1) {
                        if ($scope.effectiveLeftRightFlag == 1) {
                            return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state0;
                        } else {
                            return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state1;
                        }
                    } else {
                        if ($scope.effectiveLeftRightFlag == 0) {
                            return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state0;
                        } else {
                            return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state1;
                        }
                    }
                }
            }
            ;
            $scope.checkEffectiveClick = function(no) {
                if (no != null  && no != undefined) {
                    if (no == 1) {
                        $scope.effectiveLeftRightFlag = 1;
                        $scope.flowUpshiftFlag = '0';
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_pkgact_effective1.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': $scope.pageID + "_" + 'effectway_0'
                            };
                            coreUtils.cdrService($scope.compData.JS.c60_fbar_pkgact_effective1.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                    } else {
                        $scope.effectiveLeftRightFlag = 0;
                        $scope.flowUpshiftFlag = '1';
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_pkgact_effective2.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': $scope.pageID + "_" + 'effectway_1'
                            };
                            coreUtils.cdrService($scope.compData.JS.c60_fbar_pkgact_effective2.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                    }
                }
            }
            ;
            
            $scope.getInfo = function(param) {
                if (param != null  && param != undefined) {
                    $scope.recedata = param.respparam;
                    if ($scope.recedata.packageId != null  && $scope.recedata.packageId != undefined && $scope.recedata.effectiveWay != null  && $scope.recedata.effectiveWay != undefined) {
                        var temp = {};
                        temp.phoneNo = $scope.recedata.msisdn.replace($scope.recedata.msisdn.substr($scope.recedata.msisdn.length == 11 ? 3 : 4, 4), "****") + '，您好';
                        if ($scope.recedata.effectiveWay == 0) {
                            temp.effectiveWay = $scope.compData.JS.packageeffectstate.JS.stateconfig[0].value;
                            $scope.effectiveWayFlag = 0;
                            $scope.flowUpshiftFlag = $scope.recedata.effectiveWay;
                        } else if ($scope.recedata.effectiveWay == 1) {
                            temp.effectiveWay = $scope.compData.JS.packageeffectstate.JS.stateconfig[1].value;
                            $scope.effectiveWayFlag = 0;
                            $scope.flowUpshiftFlag = $scope.recedata.effectiveWay;
                        } else if ($scope.recedata.effectiveWay == 2) {
                            temp.effectiveWay0 = $scope.compData.JS.packageeffectstate.JS.stateconfig[0].value;
                            temp.effectiveWay1 = $scope.compData.JS.packageeffectstate.JS.stateconfig[1].value;
                            $scope.effectiveWayFlag = 1;
                            $scope.flowUpshiftFlag = '1';
                        } else if ($scope.recedata.effectiveWay == 4) {
                            temp.effectiveWay = $scope.compData.JS.packageeffectstate.JS.stateconfig[4].value;
                            $scope.effectiveWayFlag = 0;
                            $scope.flowUpshiftFlag = $scope.recedata.effectiveWay;
                        } else {
                            coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'updaterror', {
                                "errorcode": $scope.compData.JS.errorcode
                            });
                            return false;
                        }
                        $scope.recedata = temp;
                        $scope.flag = 1;
                        angular.element($element[0].querySelector('.c60_fbar_mbg_pop_block')).css({
                            'z-index': '4444443647888'
                        });
                        angular.element($element[0].querySelector('.c60_fbar_mpop_block')).css({
                            'z-index': '4444443647889'
                        });
                        $scope.effectiveLeftRightFlag = 0;
                    } else {
                        coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'updaterror', {
                            "errorcode": $scope.compData.JS.errorcode
                        });
                    }
                } else {
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'updaterror', {
                        "errorcode": $scope.compData.JS.errorcode
                    });
                }
            }
            ;
            
            $scope.popBlockHide = function() {
                $scope.flag = false;
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_left_itbtn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'cancelbtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_left_itbtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                top.tlbs.cdrData = null ;
            }
            ;
            $scope.popSubmit = function() {
                var inputData = {
                    "id": $scope.obj.packageID,
                    "flowUpshiftFlag": $scope.flowUpshiftFlag,
                    "saleid": $scope.obj.saleID,
                    "epageId": top.tlbs.ordersrc
                };
                if (null  != top.tlbs.cdrData) {
                    inputData['epageId'] = top.tlbs.cdrData.pageId || '';
                }
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click1', inputData);
                $scope.flag = false;
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_pkgact_btn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'submitbtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_pkgact_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                top.tlbs.cdrData = null ;
            }
            $scope.iconClick = function(item) {
                $scope.compData.JS.native.JS.index = item;
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_icon_click.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'recordbtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_icon_click.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
            }
            ;
            
            $scope.getBtnStyle = function(index) {
                if (index == $scope.compData.JS.native.JS.index) {
                    return $scope.compData.JS.native.JS.btn.statusconfig.state0;
                } else {
                    return $scope.compData.JS.native.JS.btn.statusconfig.state;
                }
            }
            ;
            
            $scope.getIconStyle = function(index) {
                if (index == $scope.compData.JS.native.JS.index) {
                    return $scope.compData.JS.native.JS.icon.statusconfig.state;
                } else {
                    return $scope.compData.JS.native.JS.icon.statusconfig.state0;
                }
            }
            ;
            $scope.getOptionStyle = function(index) {
                if (index == $scope.compData.JS.native.JS.index) {
                    return $scope.compData.JS.native.JS.option.statusconfig.state0;
                } else {
                    return $scope.compData.JS.native.JS.option.statusconfig.state;
                }
            }
            ;
            $scope.updateData = function(param) {
                $scope.respData = param.respparam;
                if ($scope.respData && $scope.respData.packages && $scope.respData.packages.length > 0) {
                    $scope.showSuccess();
                } else {
                    $scope.showError();
                    return false;
                }
            }
            ;
            $scope.showError = function() {
                $scope.compData.JS.c60_fbar_pkgact_result_con.JS.showconfig.status = 1;
                angular.element($element[0].querySelector('.c60_fbar_pwrapper')).css({
                    'display': 'none'
                });
                angular.element($element[0].querySelector('.c60_fbar_activity_tips')).css({
                    "background-color": "#fff"
                });
                angular.element($element[0].querySelector('.c60_fbar_activity_tips_tit')).css({
                    'display': 'none'
                });
                angular.element($element[0].querySelector('.c60_fbar_activity_tips_txt')).css({
                    'display': 'none'
                });
                coreService.fireEvent($element.attr('cid'), 'showerror');
            }
            ;
            $scope.showSuccess = function() {
                $scope.compData.JS.c60_fbar_pkgact_result_con.JS.showconfig.status = 0;
                coreService.fireEvent($element.attr('cid'), 'showsucc');
            }
            ;
            $scope.gettaocan_result_conStyle = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_pkgact_result_con) {
                    if ($scope.compData.JS.c60_fbar_pkgact_result_con.JS.showconfig.status == 0) {
                        return $scope.compData.JS.c60_fbar_pkgact_result_con.JS.showconfig.status0;
                    } else {
                        return $scope.compData.JS.c60_fbar_pkgact_result_con.JS.showconfig.status1;
                    }
                }
            }
            ;
            $scope.taocanresulturl = function() {
                if ($scope.compData.JS != null  && $scope.compData.JS != undefined && $scope.compData.JS.c60_fbar_pkgact_result_con) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_pkgact_result_con.JS.statusconfig.status;
                    var imgUrl = $scope.compData.JS.c60_fbar_pkgact_result_con.JS.statusconfig[status].imgUrl;
                    return imgUrl.replace(/'/g, '');
                }
            }
            ;
            $scope.taocanresulttxt = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_pkgact_result_con) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_pkgact_result_con.JS.statusconfig.status;
                    var btntxt = $scope.compData.JS.c60_fbar_pkgact_result_con.JS.statusconfig[status].btntxt;
                    return btntxt;
                }
            }
            ;
            $scope.taocanresulttips = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_pkgact_result_con) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_pkgact_result_con.JS.statusconfig.status;
                    var tipstxt = $scope.compData.JS.c60_fbar_pkgact_result_con.JS.statusconfig[status].tipstxt;
                    return tipstxt;
                }
            }
            ;
            $scope.returnclick = function() {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'goFirstPage')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'goFirstPage');
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.JS = properties.JS || {};
                $element.css(properties.CSS);
                $scope.activityDesc = $scope.compData.JS.activityDesc;
            }
            ;
            $scope.initPage = function() {
                coreService.fireEvent($element.attr('cid'), 'init', {
                    "activityID": $scope.compData.JS.activityID
                });
            }
            ;
            $scope.error = function() {
                $scope.showError();
            }
            ;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            
            $scope.eventMap['update'] = $scope.updateData;
            $scope.eventMap['getInfo'] = $scope.getInfo;
            $scope.eventMap['initPage'] = $scope.initPage;
            $scope.eventMap['error'] = $scope.error;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'packageactivity';
            $scope.init();
        }
    }
}
]);
uiCore.directive('iframeholder', [
'coreService', 
'coreUtils', 
function(coreService, coreUtils) {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: '<div><iframe id="ciframe"></iframe></div>',
        scope: {},
        require: '^pid',
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        function($scope, $element, $attrs) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {
                    'width': '100%',
                    'height': '100%',
                    'position': 'relative'
                },
                'JS': {
                    'clickable': false,
                    'animation': false,
                    'clickevent': '',
                    'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                    },
                    'iframecfg': {
                        'CSS': {
                            'border': '0',
                            'position': 'absolute',
                            'top': '0',
                            'left': '0',
                            'width': '100%',
                            'height': '100%',
                        },
                        'JS': {
                            'preload': true,
                            'iframeUrl': ''
                        }
                    }
                }
            };
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $scope.customIframe = angular.element($element[0].querySelector('[id="ciframe"]'));
                $scope.processStyle();
                $scope.processConfig();
            }
            ;
            $scope.processStyle = function() {
                $element.css($scope.compData.CSS);
                $scope.customIframe.css($scope.compData.JS.iframecfg.CSS);
            }
            ;
            $scope.processConfig = function() {
                if ($scope.compData.JS.iframecfg.JS.preload) {
                    $scope.customIframe.removeAttr('src');
                    $scope.customIframe.attr('src', $scope.compData.JS.iframecfg.JS.iframeUrl);
                }
            }
            ;
            $scope.receive = function(input, deferred) {
                $scope.customIframe.removeAttr('src');
                $scope.customIframe.attr('src', input.url);
                if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            $scope.loadFrame = function(eventInput, deferred) {
                $scope.customIframe.removeAttr('src');
                $scope.customIframe.attr('src', $scope.compData.JS.iframecfg.JS.iframeUrl);
                if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            $scope.unloadFrame = function(eventInput, deferred) {
                $scope.customIframe.removeAttr('src');
                if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            $scope.updateFrameURL = function(eventInput, deferred) {
                $scope.compData.JS.iframecfg.JS.iframeUrl = eventInput.iframeUrl || '';
                if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            $scope.eventMap['receive'] = $scope.receive;
            $scope.eventMap['loadFrame'] = $scope.loadFrame;
            $scope.eventMap['unloadFrame'] = $scope.unloadFrame;
            $scope.eventMap['updateFrameURL'] = $scope.updateFrameURL;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
            });
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'iframeholder';
            scope.init();
        }
    };
}
]);
uiCore.directive('msgbox', function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        template: 
        '<div class="tbholder" style="display:block">' 
        + '   <div class="c60_fbar_bg_black_pop" ng-style="getbg_black_popStyle()">' 
        + '   <div class="c60_fbar_tips_txt" style="color:white;margin-top:0" ng-bind="compData.JS.bg_black_pop.JS.text"></div>' 
        + '   </div>'
        //反馈页面----------start--------------
        /*
			+'    <div class="c60_fbar_new_center_pop hwlhide">'
			+'        <div class="c60_fbar_ncp_top">'
			+'        	<div class="c60_fbar_ncp_tit">'
			+'                <span class="c60_fbar_ncp_tit_txt">反馈回复</span>'
			+'                <span class="c60_fbar_ncp_tit_close"></span>'
			+'            </div>'
			+'        	<div class="c60_fbar_ncp_bottom">'
			+'            	<div class="c60_fbar_ncpb_txt">Q：我在使用toolbar的时候，不想看见的时候能 让它隐藏么？用的时候再打开。</div>'
			+'                <div class="c60_fbar_ncpb_txt">A：尊敬的用户，您好。<br/>首先谢谢您的积极反馈，我们也正在极力打造这样一个便捷操作，方便toolbar用户。<br/>预计该功能在下次更新中能让您体验到，预祝您身体健康，工作顺利。</div>'
			+'            </div>'
			+'        </div>'
			+'    </div>'
			*/
        //反馈页面----------end--------------
        //这边是确认弹出页面--------------start----------------
         
        + '<div class="c60_fbar_bg_pop_block" ng-style="getbg_pop_blockStyle()" ng-click="$event.stopPropagation();"></div>' 
        + '<div class="c60_fbar_pop_block"  ng-style="getpop_blockStyle()">' 
        + '	<div class="c60_fbar_img_txt_info">' 
        + '    	<table cellpadding="0" cellspacing="0" class="c60_fbar_img_txt_table">' 
        + '        	<tr>' 
        + '            	<td><span class="c60_fbar_haveatea"></span></td>' 
        + '                <td>' 
        + '                	<div class="c60_fbar_txt"><span ng-bind="phoneFilter(phoneNumber)"></span><span ng-bind="compData.JS.c60_fbar_pop_block_text.JS.text1"></span></div>' 
        + '                	<div class="c60_fbar_txt"><span ng-bind="compData.JS.c60_fbar_pop_block_text.JS.text2"></span></div>' 
        + '                	<div class="c60_fbar_txt"><span ng-bind="compData.JS.c60_fbar_pop_block_text.JS.text3"></span></div>' 
        + '                </td>' 
        + '            </tr>' 
        + '        </table>' 
        + '    </div>' 
        + '    <div class="c60_fbar_img_txt_btn clearfloat">' 
        + '        <div class="c60_fbar_left_itbtn" ng-click="click(\'c60_fbar_left_itbtn\');" ng-bind="compData.JS.c60_fbar_left_itbtn.JS.text"></div>' 
        + '        <div class="c60_fbar_right_itbtn" ng-click="click(\'c60_fbar_right_itbtn\');" ng-bind="compData.JS.c60_fbar_right_itbtn.JS.text"></div>' 
        + '    </div>' 
        + '</div>'
        //这边是确认弹出页面--------------end----------------
         
        
        + '	<div class="c60_fbar_news_center_df" ng-bind="c60_fbar_news_center_dfText()" ng-click="click(\'c60_fbar_news_center_df\');$event.stopPropagation();"></div>' 
        + '    <div class="c60_fbar_news_center">' 
        + '    	<ul class="c60_fbar_nc_tabtit c60_fbar_clearfloat">' 
        + '        	<li ng-style="c60_fbar_nc_tabtitStyle(0)" ng-click="click(\'c60_fbar_nc_tabtit0\')"><span ng-bind="compData.JS.c60_fbar_nc_tabtit.JS.text0"></span><span ng-show="c60_fbar_nc_tabtitNum(0)"><span ng-bind="compData.JS.c60_fbar_nc_tabtit0span.JS.text0"></span><span ng-bind="compData.JS.c60_fbar_ncc_list.JS.unread0"></span><span ng-bind="compData.JS.c60_fbar_nc_tabtit0span.JS.text1"></span></span></li>' 
        + '          <li ng-style="c60_fbar_nc_tabtitStyle(1)" ng-click="click(\'c60_fbar_nc_tabtit1\')"><span ng-bind="compData.JS.c60_fbar_nc_tabtit.JS.text1"></span><span ng-show="c60_fbar_nc_tabtitNum(1)"><span ng-bind="compData.JS.c60_fbar_nc_tabtit1span.JS.text0"></span><span ng-bind="compData.JS.c60_fbar_ncc_list.JS.unread1"></span><span ng-bind="compData.JS.c60_fbar_nc_tabtit1span.JS.text1"></span></span></li>' 
        + '      </ul>' 
        + '      <div class="c60_fbar_msg_conlist" ng-style="c60_fbar_nc_conStyle(0)">' 
        + '        <div class="c60_fbar_nc_con c60_fbar_nc_container1" simplescroll>' 
        + '        	<div class="c60_fbar_ncc_list" ng-style="c60_fbar_ncc_listStyle0(item.status)" ng-repeat="item in respData[0].list" ng-click="c60_fbar_ncc_lb_icoClick0($index);$event.stopPropagation();">' 
        + '            	<div class="c60_fbar_ncc_list_top">' 
        + '                	<div class="c60_fbar_ncc_lt_tit c60_fbar_clearfloat">' 
        + '                    	<span class="c60_fbar_ncc_lt_title" ng-bind="getTitleType(item.category)"></span>' 
        + '                        <a class="c60_fbar_ncc_lt_looktxt" ng-click="c60_fbar_ncc_listClick0($index);$event.stopPropagation();" ng-bind="compData.JS.c60_fbar_ncc_lt_looktxt.JS.text"></a>' 
        + '                    </div>' 
        + '                    <div class="c60_fbar_ncc_lt_detailtxt" ng-bind-html="to_trusted(item.subject)"></div>' 
        + '                </div>' 
        + '                <div class="c60_fbar_ncc_list_bottom c60_fbar_clearfloat">' 
        + '                	  <span class="c60_fbar_ncc_lb_time" ng-bind="formatTime(item.date)"></span>' 
        + '                    <span class="c60_fbar_ncc_lb_ico_gray" ng-style="c60_fbar_ncc_lb_icoStyle(item.id)" ng-show="compData.JS.c60_fbar_ncc_list.JS.show" ></span>' 
        + '                </div>' 
        + '            </div>' 
        
        + '            <div class="c60_fbar_ncc_more0" ng-style="c60_fbar_ncc_moreStyle0();" ng-bind="compData.JS.c60_fbar_ncc_more0.JS.text" ng-click="click(\'c60_fbar_ncc_more0\')"></div>' 
        + '            <div class="c60_fbar_ncc_nomore0" ><span class="c60_fbar_ncc_nomore_icotxt">no more...</span></div>' 
        + '        </div>' 
        
        + '        <div class="c60_fbar_news_center_del" ng-show="compData.JS.c60_fbar_news_center_del.JS.show">' 
        + '            <div class="c60_fbar_news_center_delbtn" ng-style="c60_fbar_news_center_delbtnStyle()" ng-click="click(\'c60_fbar_news_center_del\')" ng-bind="compData.JS.c60_fbar_news_center_del.JS.text"></div>' 
        + '            <span class="c60_fbar_ncc_lb_ico_gray_all" ng-style="c60_fbar_ncc_lb_ico_gray_allStyle()" ng-click="c60_fbar_ncc_lb_ico_gray_allClick();$event.stopPropagation();"></span>' 
        + '        </div>' 
        
        + '       </div>' 
        
        
        + '      <div class="c60_fbar_msg_conlist" ng-style="c60_fbar_nc_conStyle(1)" >' 
        + '        <div class="c60_fbar_nc_con c60_fbar_nc_container2" simplescroll>' 
        + '        	<div class="c60_fbar_ncc_list" ng-click="c60_fbar_ncc_listClick1($index)" ng-style="c60_fbar_ncc_listStyle1(item.status)" ng-repeat="item in respData[1].list">' 
        + '            	<div class="c60_fbar_ncc_list_top">' 
        + '                	<div class="c60_fbar_ncc_lt_tit c60_fbar_clearfloat">' 
        + '                    	<span class="c60_fbar_ncc_lt_title" ng-bind="getTitleType(item.category)"></span>' 
        + '                    </div>' 
        + '                    <div class="c60_fbar_ncc_lt_detailtxt" ng-bind-html="to_trusted(item.subject)"></div>' 
        + '                </div>' 
        + '                <div class="c60_fbar_ncc_list_bottom c60_fbar_clearfloat">' 
        + '                	  <span class="c60_fbar_ncc_lb_time" ng-bind="formatTime(item.date)"></span>' 
        + '                    <span class="c60_fbar_ncc_lb_ico_gray" ng-style="c60_fbar_ncc_lb_icoStyle(item.id)" ng-show="compData.JS.c60_fbar_ncc_list.JS.show"></span>' 
        + '                </div>' 
        + '            </div>' 
        
        + '            <div class="c60_fbar_ncc_more1" ng-style="c60_fbar_ncc_moreStyle1();" ng-bind="compData.JS.c60_fbar_ncc_more1.JS.text" ng-click="click(\'c60_fbar_ncc_more1\')"></div>' 
        + '            <div class="c60_fbar_ncc_nomore1" ><span class="c60_fbar_ncc_nomore_icotxt">no more...</span></div>' 
        
        + '        </div>' 
        
        + '        <div class="c60_fbar_news_center_del" ng-show="compData.JS.c60_fbar_news_center_del.JS.show">' 
        + '            <div class="c60_fbar_news_center_delbtn" ng-style="c60_fbar_news_center_delbtnStyle()" ng-click="click(\'c60_fbar_news_center_del\')" ng-bind="compData.JS.c60_fbar_news_center_del.JS.text"></div>' 
        + '            <span class="c60_fbar_ncc_lb_ico_gray_all" ng-style="c60_fbar_ncc_lb_ico_gray_allStyle()" ng-click="c60_fbar_ncc_lb_ico_gray_allClick();$event.stopPropagation();"></span>' 
        + '        </div>' 
        
        + '       </div>' 
        + '</div>',
        scope: {},
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        'coreService', 
        'coreUtils', 
        'Const', 
        '$sce', 
        function($scope, $element, $attrs, coreService, coreUtils, Const, $sce) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            //页面元素配置项
            $scope.respData = {};
            $scope.phoneNumber = "";
            $scope.compData = {
                "CSS": {},
                "JS": {}
            };
            $scope.to_trusted = function(text) {
                if (text != null  && text != undefined) {
                    text = text + '';
                    return $sce.trustAsHtml(text.replace(/\n/g, "<br/>"));
                } else {
                    return "";
                }
            }
            ;
            $scope.phoneFilter = function(input) {
                if (input == undefined)
                    return '';
                var ret = input.substring(0, 3) + "****" + input.substring(7);
                return ret;
            }
            ;
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
                /*$timeout(function() {
                        $scope.$apply();
                    });*/
            }
            ;
            var stringToArray = function() {
                //记录选择删除的消息id
                $scope.compData.JS.c60_fbar_news_center_df.JS.msgids = [];
                $scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.index = 0;
                $scope.compData.JS.c60_fbar_news_center_df.JS.index = 0;
                //显示通用消息
                $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex = 0;
                //记录用户点击删除按钮，默认用户没有点击
                $scope.compData.JS.c60_fbar_news_center_df.JS.del = false;
                
                //记录用户是否查看更多或者删除按钮
                $scope.compData.JS.moreDel = "init";
                $scope.compData.JS.c60_fbar_ncc_list.JS.msgids = [];
                
                //未读消息
                $scope.compData.JS.c60_fbar_ncc_list.JS.unread0 = 0;
                $scope.compData.JS.c60_fbar_ncc_list.JS.unread1 = 0;
                //现在删除个数
                $scope.compData.JS.c60_fbar_news_center_df.JS.count = 0;
                //重新计算列表
                var ele = angular.element($element[0].querySelector('.c60_fbar_nc_con'));
                var totalDistance = "0";
                ele.css('-webkit-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                ele.css('-moz-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                ele.css('-o-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                ele.css('-ms-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                ele.css('transform', 'translate3d(0,' + totalDistance + 'px,0)');
                
                //初始化通用消息和业务消息
                $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum0 = 10;
                //通用消息目前总数
                $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum1 = 10;
                //业务消息目前总数
                $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastcurNum0 = 10;
                $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastcurNum1 = 10;
                $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum0 = 0;
                //通用消息上次返回总数
                $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum1 = 0;
                //业务消息上次返回总数
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid) || {});
                $element.css($scope.compData.css || {});
                stringToArray();
                //设置当前点击哪个更多查询，0表示通用消息，1表示业务消息，-1表示初始化
                $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.moreindex = -1;
                
                $scope.compData.JS.c60_fbar_news_center_del.JS.show = false;
                angular.element($element[0].querySelector('.c60_fbar_ncc_nomore0')).css("display", "none");
                angular.element($element[0].querySelector('.c60_fbar_ncc_more0')).css("display", "none");
                angular.element($element[0].querySelector('.c60_fbar_ncc_nomore1')).css("display", "none");
                angular.element($element[0].querySelector('.c60_fbar_ncc_more2')).css("display", "none");
                $scope.compData.JS.delete0 = 0;
                $scope.compData.JS.delete1 = 0;
            }
            ;
            $scope.formatTime = function(time) {
                if (time && time.length >= 14) {
                    return time.substring(0, 4) + "年" + time.substring(4, 6) + "月" + time.substring(6, 8) + "日 " + time.substring(8, 10) + ":" + time.substring(10, 12);
                }
            }
            ;
            $scope.c60_fbar_ncc_listStyle0 = function(input) {
                return $scope.compData.JS.c60_fbar_ncc_list.JS.stateconfig["state" + input];
            }
            ;
            $scope.c60_fbar_ncc_listStyle1 = function(input) {
                return $scope.compData.JS.c60_fbar_ncc_list.JS.stateconfig["state" + input];
            }
            ;
            $scope.c60_fbar_nc_tabtitStyle = function(index) {
                if (Number($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex) == Number(index)) {
                    return $scope.compData.JS.c60_fbar_nc_tabtit.JS.stateconfig.state0;
                } else {
                    return $scope.compData.JS.c60_fbar_nc_tabtit.JS.stateconfig.state1;
                }
            }
            ;
            $scope.getbg_black_popStyle = function() {
                if (Number($scope.compData.JS.bg_black_pop.JS.stateconfig.state) == 1) {
                    return $scope.compData.JS.bg_black_pop.JS.stateconfig.state1;
                } else {
                    return $scope.compData.JS.bg_black_pop.JS.stateconfig.state0;
                }
            }
            ;
            $scope.bg_black_popShow = function(msg) {
                $scope.compData.JS.bg_black_pop.JS.text = msg;
                $scope.compData.JS.bg_black_pop.JS.stateconfig.state = 1;
                angular.element($element[0].querySelector('.c60_fbar_bg_black_pop')).css({
                    'display': 'block'
                });
                setTimeout(function() {
                    //将弹框隐藏 
                    $scope.compData.JS.bg_black_pop.JS.stateconfig.state = 0;
                    angular.element($element[0].querySelector('.c60_fbar_bg_black_pop')).css({
                        'display': 'none'
                    });
                }, $scope.compData.JS.bg_black_pop.JS.stateconfig.time * 1000);
            }
            ;
            $scope.c60_fbar_nc_conStyle = function(index) {
                if (Number($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex) == Number(index)) {
                    return {
                        "display": "block"
                    };
                } else {
                    return {
                        "display": "none"
                    };
                }
            }
            ;
            $scope.getTitleType = function(type) {
                return $scope.compData.JS.titleType.JS[type];
            }
            ;
            //确认页面-----------start------------
            $scope.getbg_pop_blockStyle = function() {
                if (Number($scope.compData.JS.bg_pop_block.JS.stateconfig.status) == 0) {
                    return $scope.compData.JS.bg_pop_block.JS.stateconfig.status0;
                } else {
                    return $scope.compData.JS.bg_pop_block.JS.stateconfig.status1;
                }
            }
            ;
            $scope.getpop_blockStyle = function() {
                if (Number($scope.compData.JS.pop_block.JS.stateconfig.status) == 0) {
                    return $scope.compData.JS.pop_block.JS.stateconfig.status0;
                } else {
                    return $scope.compData.JS.pop_block.JS.stateconfig.status1;
                }
            }
            ;
            //确认页面-----------end------------
            //接收来自后台的数据:消息盒子列表请求
            $scope.queryMessageListRecvd = function(inputData) {
                if (inputData && inputData.respparam) {
                    //重置选择删除的记录
                    //                        $scope.compData.JS.c60_fbar_news_center_df.JS.msgids = [];
                    //                        $scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.index = 0;
                    //                        $scope.compData.JS.c60_fbar_ncc_list.JS.show = false;
                    //                        $scope.compData.JS.c60_fbar_news_center_del.JS.show = false;
                    //                        $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex = 0;
                    if (inputData.respparam.messages.length == 0) {
                        $scope.respData = {
                            "phoneNumber": inputData.respparam.phoneNumber,
                            "messages": [{
                                "type": "0",
                                //0:通知消息 1:业务消息
                                "messagenumber": "0",
                                "unreadmessagenumber": "0",
                                "list": [
                                ]
                            }, {
                                "type": "1",
                                "messagenumber": "0",
                                "unreadmessagenumber": "0",
                                "list": [
                                ]
                            
                            }
                            ]
                        };
                    } else if (inputData.respparam.messages.length == 2) {
                        $scope.respData = inputData.respparam.messages;
                        //重新计算列表
                        var ele = angular.element($element[0].querySelector('.c60_fbar_nc_container1'));
                        var totalDistance = "0";
                        ele.css('-webkit-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('-moz-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('-o-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('-ms-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        
                        ele = angular.element($element[0].querySelector('.c60_fbar_nc_container2'));
                        ele.css('-webkit-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('-moz-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('-o-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('-ms-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('transform', 'translate3d(0,' + totalDistance + 'px,0)');
                    }
                    //                    	console.log("$scope.compData.JS.moreDel",$scope.compData.JS.moreDel);
                    if ($scope.compData.JS.moreDel == "delete") {
                        $scope.compData.JS.c60_fbar_news_center_df.JS.msgids = [];
                        $scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.index = 0;
                        $scope.compData.JS.moreDel = "init";
                        //重新计算列表
                        var ele = angular.element($element[0].querySelector('.c60_fbar_nc_container1'));
                        var totalDistance = "0";
                        ele.css('-webkit-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('-moz-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('-o-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('-ms-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        
                        ele = angular.element($element[0].querySelector('.c60_fbar_nc_container2'));
                        ele.css('-webkit-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('-moz-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('-o-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('-ms-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        
                        //初始化通用消息和业务消息
                        $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum0 = 10;
                        //通用消息目前总数
                        $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum1 = 10;
                        //业务消息目前总数
                        $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastcurNum0 = 10;
                        $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastcurNum1 = 10;
                        $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum0 = 0;
                        //通用消息上次返回总数
                        $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum1 = 0;
                        //业务消息上次返回总数
                    } else if ($scope.compData.JS.moreDel == "more0") {
                        $scope.respData[0] = inputData.respparam.messages[0];
                        $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum0 = $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastcurNum0;
                        if ((Number($scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.index) == 1) && (($scope.compData.JS.delete0) == 1)) {
                            $scope.c60_fbar_ncc_lb_ico_gray_allClick("delmore");
                        }
                        $scope.compData.JS.moreDel = "init";
                    } else if ($scope.compData.JS.moreDel == "more1") {
                        $scope.respData[1] = inputData.respparam.messages[0];
                        $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum1 = $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastcurNum1;
                        if ((Number($scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.index) == 1) && (($scope.compData.JS.delete1) == 1)) {
                            $scope.c60_fbar_ncc_lb_ico_gray_allClick("delmore");
                        }
                        $scope.compData.JS.moreDel = "init";
                    } else {
                        $scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.index = 0;
                        $scope.compData.JS.c60_fbar_ncc_list.JS.show = false;
                        $scope.compData.JS.c60_fbar_news_center_del.JS.show = false;
                        $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.moreindex = -1;
                    }
                    
                    //初次查询
                    if (Number($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.moreindex) == -1) {
                        stringToArray();
                    }
                    //将电话号码初始化
                    $scope.phoneNumber = inputData.respparam.phoneNumber;
                    
                    $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum0 = $scope.respData[0].list.length;
                    $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum1 = $scope.respData[1].list.length;
                    
                    $scope.compData.JS.c60_fbar_ncc_list.JS.unread0 = Number($scope.respData[0].unreadmessagenumber);
                    $scope.compData.JS.c60_fbar_ncc_list.JS.unread1 = Number($scope.respData[1].unreadmessagenumber);
                
                }
            }
            ;
            $scope.c60_fbar_nc_tabtitNum = function(index) {
                //当未读为0时候隐藏
                if (index == 0) {
                    if (Number($scope.compData.JS.c60_fbar_ncc_list.JS.unread0) == 0) {
                        return false;
                    } else {
                        return true;
                    }
                }
                if (index == 1) {
                    if (Number($scope.compData.JS.c60_fbar_ncc_list.JS.unread1) == 0) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
            $scope.eventMap['queryMessageListRecvd'] = $scope.queryMessageListRecvd;
            
            $scope.c60_fbar_ncc_moreStyle0 = function() {
                if (Number($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex) == 0) {
                    if (Number($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum0) < 10) {
                        //展示no more
                        angular.element($element[0].querySelector('.c60_fbar_ncc_nomore0')).css("display", "block");
                        angular.element($element[0].querySelector('.c60_fbar_ncc_more0')).css("display", "none");
                        return;
                    }
                    if ($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum0 <= $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum0) {
                        //展示more
                        angular.element($element[0].querySelector('.c60_fbar_ncc_nomore0')).css("display", "none");
                        angular.element($element[0].querySelector('.c60_fbar_ncc_more0')).css("display", "block");
                        return;
                    } else {
                        //展示no more
                        angular.element($element[0].querySelector('.c60_fbar_ncc_nomore0')).css("display", "block");
                        angular.element($element[0].querySelector('.c60_fbar_ncc_more0')).css("display", "none");
                        return;
                    }
                } else {
                    //展示no more
                    angular.element($element[0].querySelector('.c60_fbar_ncc_nomore0')).css("display", "block");
                    angular.element($element[0].querySelector('.c60_fbar_ncc_more0')).css("display", "none");
                    return;
                }
            }
            ;
            $scope.c60_fbar_ncc_moreStyle1 = function() {
                
                if (Number($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex) == 1) {
                    if (Number($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum1) < 10) {
                        //展示no more
                        angular.element($element[0].querySelector('.c60_fbar_ncc_nomore1')).css("display", "block");
                        angular.element($element[0].querySelector('.c60_fbar_ncc_more1')).css("display", "none");
                        return;
                    }
                    if ($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum1 <= $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum1) {
                        //展示more
                        angular.element($element[0].querySelector('.c60_fbar_ncc_nomore1')).css("display", "none");
                        angular.element($element[0].querySelector('.c60_fbar_ncc_more1')).css("display", "block");
                        return;
                    } else {
                        //展示no more
                        angular.element($element[0].querySelector('.c60_fbar_ncc_nomore1')).css("display", "block");
                        angular.element($element[0].querySelector('.c60_fbar_ncc_more1')).css("display", "none");
                        return;
                    }
                } else {
                    //展示no more
                    angular.element($element[0].querySelector('.c60_fbar_ncc_nomore1')).css("display", "block");
                    angular.element($element[0].querySelector('.c60_fbar_ncc_more1')).css("display", "none");
                    return;
                }
            }
            ;
            $scope.c60_fbar_news_center_delbtnStyle = function() {
                if (Number($scope.compData.JS.c60_fbar_news_center_df.JS.count) != 0) {
                    $scope.compData.JS.c60_fbar_news_center_del.JS.stateconfig.state = "0";
                } else {
                    $scope.compData.JS.c60_fbar_news_center_del.JS.stateconfig.state = "1";
                }
                if (Number($scope.compData.JS.c60_fbar_news_center_del.JS.stateconfig.state) == "0") {
                    return $scope.compData.JS.c60_fbar_news_center_del.JS.stateconfig.state0;
                } else {
                    return $scope.compData.JS.c60_fbar_news_center_del.JS.stateconfig.state1;
                }
            }
            ;
            $scope.c60_fbar_ncc_lb_icoStyle = function(msgid) {
                if ($scope.compData.JS.c60_fbar_news_center_df.JS.msgids.length > 0) {
                    if ($scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] == true) {
                        $scope.compData.JS.c60_fbar_ncc_lb_ico.JS.stateconfig.state = 1;
                    } else {
                        $scope.compData.JS.c60_fbar_ncc_lb_ico.JS.stateconfig.state = 0;
                    }
                } else {
                    $scope.compData.JS.c60_fbar_ncc_lb_ico.JS.stateconfig.state = 0;
                }
                if (Number($scope.compData.JS.c60_fbar_ncc_lb_ico.JS.stateconfig.state) == 0) {
                    return $scope.compData.JS.c60_fbar_ncc_lb_ico.JS.stateconfig.state0;
                } else {
                    return $scope.compData.JS.c60_fbar_ncc_lb_ico.JS.stateconfig.state1;
                }
            }
            ;
            $scope.c60_fbar_ncc_lb_icoClick0 = function(index) {
                //当不是删除时候，点击没有效果
                if (Number($scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.index) == 0) {
                    return;
                }
                var msgid = $scope.respData[0].list[index].id;
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_ncc_lb_ico.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'lbico0')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_ncc_lb_ico.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                if ($scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] != true) {
                    $scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] = true;
                    $scope.compData.JS.c60_fbar_news_center_df.JS.count++;
                } else {
                    $scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] = false;
                    $scope.compData.JS.c60_fbar_news_center_df.JS.count--;
                }
            }
            ;
            $scope.c60_fbar_ncc_lb_icoClick1 = function(index) {
                var msgid = $scope.respData[1].list[index].id;
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_ncc_lb_ico.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'lbico1')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_ncc_lb_ico.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                if ($scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] != true) {
                    $scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] = true;
                    $scope.compData.JS.c60_fbar_news_center_df.JS.count++;
                } else {
                    $scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] = false;
                    $scope.compData.JS.c60_fbar_news_center_df.JS.count--;
                }
            }
            ;
            //点击每个通用消息，显示具体信息
            $scope.c60_fbar_ncc_listClick0 = function(index) {
                var msgid = $scope.respData[0].list[index].id;
                if (Number($scope.respData[0].list[index].status) == 0) {
                    $scope.compData.JS.c60_fbar_ncc_list.JS.msgids[msgid] = true;
                    if ($scope.compData.JS.c60_fbar_ncc_list.JS.unread0 > 0) {
                        $scope.compData.JS.c60_fbar_ncc_list.JS.unread0--;
                    }
                }
                $scope.respData[0].list[index].status = "1";
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_ncc_list.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'list0')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_ncc_list.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                //将需要查看的消息id发送给后台
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'queryMessageDetail', {
                    "messageid": msgid
                });
            }
            ;
            //点击每个通用消息，显示具体信息
            $scope.c60_fbar_ncc_listClick1 = function(index) {
                //当不是删除时候，点击没有效果
                if (Number($scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.index) == 1) {
                    $scope.c60_fbar_ncc_lb_icoClick1(index);
                } else {
                    var msgid = $scope.respData[1].list[index].id;
                    if (Number($scope.respData[1].list[index].status) == 0) {
                        $scope.compData.JS.c60_fbar_ncc_list.JS.msgids[msgid] = true;
                        if ($scope.compData.JS.c60_fbar_ncc_list.JS.unread1 > 0) {
                            $scope.compData.JS.c60_fbar_ncc_list.JS.unread1--;
                        }
                    }
                    $scope.respData[1].list[index].status = "1";
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_ncc_list1.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'list1')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_ncc_list1.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                }
            }
            ;
            $scope.c60_fbar_ncc_lb_ico_gray_allStyle = function() {
                //通知消息
                if (Number($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex) == 0) {
                    if (Number($scope.compData.JS.delete0) == 0) {
                        return $scope.compData.JS.c60_fbar_ncc_lb_ico_gray_all.JS.stateconfig.state0;
                    } else {
                        return $scope.compData.JS.c60_fbar_ncc_lb_ico_gray_all.JS.stateconfig.state1;
                    }
                } else {
                    if (Number($scope.compData.JS.delete1) == 0) {
                        return $scope.compData.JS.c60_fbar_ncc_lb_ico_gray_all.JS.stateconfig.state0;
                    } else {
                        return $scope.compData.JS.c60_fbar_ncc_lb_ico_gray_all.JS.stateconfig.state1;
                    }
                }
            }
            $scope.c60_fbar_ncc_lb_ico_gray_allClick = function(param) {
                //通知消息
                if (Number($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex) == 0) {
                    var list0 = $scope.respData[0].list;
                    var msgid;
                    //全部选择
                    if (param == "delmore") {
                        for (item in list0) {
                            msgid = list0[item].id;
                            if ($scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] != true) {
                                $scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] = true;
                                $scope.compData.JS.c60_fbar_news_center_df.JS.count++;
                            }
                        }
                        return;
                    }
                    if (Number($scope.compData.JS.delete0) == 0) {
                        $scope.compData.JS.delete0 = 1;
                        for (item in list0) {
                            msgid = list0[item].id;
                            if ($scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] != true) {
                                $scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] = true;
                                $scope.compData.JS.c60_fbar_news_center_df.JS.count++;
                            }
                        }
                    } else {
                        //全部取消
                        $scope.compData.JS.delete0 = 0;
                        for (item in list0) {
                            msgid = list0[item].id;
                            if ($scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] == true) {
                                $scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] = false;
                                $scope.compData.JS.c60_fbar_news_center_df.JS.count--;
                            }
                        }
                    }
                }
                //业务消息
                if (Number($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex) == 1) {
                    var list1 = $scope.respData[1].list;
                    var msgid;
                    //全部选择
                    if (param == "delmore") {
                        for (item in list1) {
                            msgid = list1[item].id;
                            if ($scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] != true) {
                                $scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] = true;
                                $scope.compData.JS.c60_fbar_news_center_df.JS.count++;
                            }
                        }
                        return;
                    }
                    if (Number($scope.compData.JS.delete1) == 0) {
                        $scope.compData.JS.delete1 = 1;
                        for (item in list1) {
                            msgid = list1[item].id;
                            if ($scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] != true) {
                                $scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] = true;
                                $scope.compData.JS.c60_fbar_news_center_df.JS.count++;
                            }
                        }
                    } else {
                        //全部取消
                        $scope.compData.JS.delete1 = 0;
                        for (item in list1) {
                            msgid = list1[item].id;
                            if ($scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] == true) {
                                $scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] = false;
                                $scope.compData.JS.c60_fbar_news_center_df.JS.count--;
                            }
                        }
                    }
                }
                //记录话单
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_ncc_lb_ico_gray_all.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'delallicon')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_ncc_lb_ico_gray_all.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
            }
            ;
            $scope.c60_fbar_news_center_dfText = function() {
                if (Number($scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.index) == 0) {
                    return $scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.text0
                } else {
                    return $scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.text1;
                }
            }
            ;
            //接收来自后台的数据:消息盒子删除请求返回,当前没有要求对返回进行处理
            $scope.deleteMessageDetailRecvd = function(inputData) {
                if (inputData && inputData.respparam) {
                    var ret = inputData.respparam.result
                    if (Number(ret) == 0) {
                        $scope.bg_black_popShow($scope.compData.JS.c60_fbar_right_itbtn.JS.text2);
                    } else {
                        $scope.bg_black_popShow($scope.compData.JS.c60_fbar_right_itbtn.JS.text3);
                    }
                    //重新发送请求列表
                    var param = {
                        "flag": "-2",
                        "startNum": "1",
                        "number": "10"
                    };
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'queryMessageList', param);
                }
            }
            ;
            $scope.eventMap['deleteMessageDetailRecvd'] = $scope.deleteMessageDetailRecvd;
            var myClick = {
                c60_fbar_news_center_df: function(param) {
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_news_center_df.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'centerdf')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_news_center_df.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    //重置选择删除的记录
                    $scope.compData.JS.c60_fbar_news_center_df.JS.msgids = [];
                    $scope.compData.JS.c60_fbar_news_center_df.JS.count = 0;
                    //点击删除
                    if (Number($scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.index) == 0) {
                        $scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.index = 1;
                        $scope.compData.JS.c60_fbar_ncc_list.JS.show = true;
                        $scope.compData.JS.c60_fbar_news_center_del.JS.show = true;
                        $scope.compData.JS.delete0 = 0;
                        $scope.compData.JS.delete1 = 0;
                    } else {
                        $scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.index = 0;
                        $scope.compData.JS.c60_fbar_ncc_list.JS.show = false;
                        $scope.compData.JS.c60_fbar_news_center_del.JS.show = false;
                    }
                },
                c60_fbar_news_center_del: function(param) {
                    if (Number($scope.compData.JS.c60_fbar_news_center_del.JS.stateconfig.state) == 1) {
                        return false;
                    }
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_news_center_del.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'centerdel')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_news_center_del.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    
                    $scope.compData.JS.bg_pop_block.JS.stateconfig.status = 1;
                    $scope.compData.JS.pop_block.JS.stateconfig.status = 1;
                },
                c60_fbar_nc_tabtit0: function(param) {
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_nc_tabtit0.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'tabtit0')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_nc_tabtit0.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex = 0;
                },
                c60_fbar_nc_tabtit1: function(param) {
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_nc_tabtit1.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'tabtit1')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_nc_tabtit1.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex = 1;
                },
                c60_fbar_left_itbtn: function(param) {
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_left_itbtn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'litbtn')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_left_itbtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.compData.JS.bg_pop_block.JS.stateconfig.status = 0;
                    $scope.compData.JS.pop_block.JS.stateconfig.status = 0;
                },
                c60_fbar_right_itbtn: function(param) {
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_right_itbtn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'ritbtn')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_right_itbtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.compData.JS.c60_fbar_news_center_df.JS.del = true;
                    $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.moreindex = $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex;
                    var msglist = $scope.compData.JS.c60_fbar_news_center_df.JS.msgids;
                    var idStr = "";
                    for (key in msglist) {
                        if (msglist[key] == true) {
                            idStr = idStr + "|" + key;
                        }
                    }
                    if (idStr.length >= 1) {
                        idStr = idStr.substring(1);
                    }
                    //将需要删除的消息id发送给后台
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'deleteMessageDetail', {
                        "messageid": idStr
                    });
                    $scope.compData.JS.bg_pop_block.JS.stateconfig.status = 0;
                    $scope.compData.JS.pop_block.JS.stateconfig.status = 0;
                    $scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.index = 0;
                    $scope.compData.JS.c60_fbar_ncc_list.JS.show = false;
                    $scope.compData.JS.c60_fbar_news_center_del.JS.show = false;
                    $scope.compData.JS.moreDel = "delete";
                    //重置选择删除的记录
                    $scope.compData.JS.c60_fbar_news_center_df.JS.msgids = [];
                    $scope.compData.JS.c60_fbar_news_center_df.JS.count = 0;
                },
                c60_fbar_ncc_more0: function(param) {
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_ncc_more0.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': 'c60_fbar_ncc_more0'
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_ncc_more0.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.moreindex = 0;
                    var curNum = Number($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum0) + Number($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.step);
                    curNum = "" + curNum;
                    $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastcurNum0 = curNum;
                    //发送给后台,请求需要 的数据
                    var param = {
                        "flag": "0",
                        "startNum": $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.startNum,
                        "number": curNum
                    };
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'queryMessageList', param);
                    $scope.compData.JS.moreDel = "more0";
                },
                c60_fbar_ncc_more1: function(param) {
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_ncc_more1.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': 'c60_fbar_ncc_more1'
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_ncc_more1.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.moreindex = 1;
                    
                    var curNum = Number($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum1) + Number($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.step);
                    curNum = "" + curNum;
                    $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastcurNum1 = curNum;
                    //发送给后台,请求需要 的数据
                    var param = {
                        "flag": "1",
                        "startNum": $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.startNum,
                        "number": curNum
                    };
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'queryMessageList', param);
                    $scope.compData.JS.moreDel = "more1";
                },
            };
            //处理所有点击事件
            $scope.click = function(classname, param) {
                if (classname == undefined || classname == null ) {
                    return false;
                }
                switch (classname) {
                case 'c60_fbar_news_center_df':
                    myClick.c60_fbar_news_center_df(param);
                    break;
                case 'c60_fbar_news_center_del':
                    myClick.c60_fbar_news_center_del(param);
                    break;
                case 'c60_fbar_nc_tabtit0':
                    myClick.c60_fbar_nc_tabtit0(param);
                    break;
                case 'c60_fbar_nc_tabtit1':
                    myClick.c60_fbar_nc_tabtit1(param);
                    break;
                case 'c60_fbar_left_itbtn':
                    myClick.c60_fbar_left_itbtn(param);
                    break;
                case 'c60_fbar_right_itbtn':
                    myClick.c60_fbar_right_itbtn(param);
                    break;
                case 'c60_fbar_ncc_more0':
                    myClick.c60_fbar_ncc_more0(param);
                    break;
                case 'c60_fbar_ncc_more1':
                    myClick.c60_fbar_ncc_more1(param);
                    break;
                default:
                
                }
            }
            ;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = "msgbox";
            $scope.init();
        }
    };
});
uiCore.directive('minetui', function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_my_con_tui">' 
        
        + '   <div class="c60_fbar_bg_black_pop" ng-style="getbg_black_popStyle()">' + '    <div class="c60_fbar_tips_txt" style="color:white;margin-top:0" ng-bind="compData.JS.bg_black_pop.JS.desc"></div>' + '   </div>' 
        
        + '   <div class="c60_fbar_sug_con">' + '    <textarea class="c60_fbar_sug_textarea" ng-focus="focus();" ng-blur="blur();" ng-model="compData.JS.c60_fbar_sug_textarea.JS.text"></textarea>' + '    <div class="c60_fbar_sug_btn_con">' + '     <a class="c60_fbar_sug_btn" ccid="c60_fbar_sug_btn" ng-style="getsug_btnStyle()" ng-click="sug_btnClick();" ng-bind="compData.JS.c60_fbar_sug_btn.JS.text"></a>' + '    </div>' + '   </div>' + '   <div class="c60_fbar_tuiding_tips" ng-bind="compData.JS.c60_fbar_tuiding_tips.JS.text">' + '   </div>' + '</div>',
        scope: {},
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        'coreService', 
        'coreUtils', 
        'Const', 
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            //当用户点击进去的时候，置空
            $scope.focus = function() {
                if ($scope.compData.JS.c60_fbar_sug_textarea.JS.text == $scope.compData.JS.c60_fbar_sug_textarea.JS.oldtext) {
                    $scope.compData.JS.c60_fbar_sug_textarea.JS.text = "";
                    $scope.compData.JS.c60_fbar_sug_btn.JS.stateconfig.state = 1;
                }
            
            }
            ;
            //当用户点击进去的时候，置空
            $scope.blur = function() {
                if ($scope.compData.JS.c60_fbar_sug_textarea.JS.text == "") {
                    $scope.compData.JS.c60_fbar_sug_textarea.JS.text = $scope.compData.JS.c60_fbar_sug_textarea.JS.oldtext;
                }
            }
            ;
            $scope.getsug_btnStyle = function() {
                if ($scope.compData.JS.c60_fbar_sug_textarea.JS.text == '') {
                    $scope.compData.JS.c60_fbar_sug_btn.JS.stateconfig.state = 1;
                } else {
                    $scope.compData.JS.c60_fbar_sug_btn.JS.stateconfig.state = 0;
                }
                if ($scope.compData.JS.c60_fbar_sug_btn.JS.stateconfig.state == 0) {
                    return $scope.compData.JS.c60_fbar_sug_btn.JS.stateconfig.state0;
                } else {
                    return $scope.compData.JS.c60_fbar_sug_btn.JS.stateconfig.state1;
                }
            }
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            //页面元素配置项
            $scope.compData = {
                "CSS": {},
                "JS": {}
            };
            $scope.getStyle = function(classname) {
                if ($scope.compData.JS[classname] && $scope.compData.JS[classname].CSS) {
                    return $scope.compData.JS[classname].CSS;
                }
            }
            ;
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
                /*$timeout(function() {
	                         $scope.$apply();
	                     });*/
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid) || {});
                $element.css($scope.compData.css || {});
                //记录当前输入框中的植
                $scope.compData.JS.c60_fbar_sug_textarea.JS.oldtext = $scope.compData.JS.c60_fbar_sug_textarea.JS.text;
            }
            ;
            $scope.getbg_black_popStyle = function() {
                if ($scope.compData.JS.bg_black_pop.JS.stateconfig.state == 1) {
                    return $scope.compData.JS.bg_black_pop.JS.stateconfig.state1;
                } else {
                    return $scope.compData.JS.bg_black_pop.JS.stateconfig.state0;
                }
            }
            ;
            $scope.bg_black_popShow = function(msg) {
                $scope.compData.JS.bg_black_pop.JS.desc = msg;
                $scope.compData.JS.bg_black_pop.JS.stateconfig.state = 1;
                angular.element($element[0].querySelector('.c60_fbar_bg_black_pop')).css({
                    'display': 'block'
                });
                setTimeout(function() {
                    //将弹框隐藏 
                    $scope.compData.JS.bg_black_pop.JS.stateconfig.state = 0;
                    angular.element($element[0].querySelector('.c60_fbar_bg_black_pop')).css({
                        'display': 'none'
                    });
                }, $scope.compData.JS.bg_black_pop.JS.stateconfig.time * 1000);
            }
            ;
            //提交退订内容
            $scope.sug_btnClick = function() {
                if ($scope.compData.JS.c60_fbar_sug_btn.JS.stateconfig.state == 1) {
                    return false;
                }
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_sug_btn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'seeyou')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_sug_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                
                var content = $scope.compData.JS.c60_fbar_sug_textarea.JS.text;
                if (content == '') {
                    $scope.bg_black_popShow($scope.compData.JS.c60_fbar_sug_textarea.JS.tips1);
                } else if (content == $scope.compData.JS.c60_fbar_sug_textarea.JS.oldtext) {
                    $scope.bg_black_popShow($scope.compData.JS.c60_fbar_sug_textarea.JS.tips2);
                } else {
                    top.tlbs.toolbarclose = "close";
                    //将反馈内容发送到后台
                    var param = {
                        "feedback": encodeURIComponent(content),
                        "componentId": "cminetui",
                        "pageId": "iminetui",
                        "templateId": top.tlbs.templateID
                    };
                    $scope.bg_black_popShow($scope.compData.JS.c60_fbar_sug_textarea.JS.tips3);
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'tuisubmit', param);
                    setTimeout(function() {
                        var param2 = {
                            "closeunit": 4,
                            "templateId": top.tlbs.templateID
                        };
                        coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'tuisubmitclose', param2);
                        $scope.compData.JS.c60_fbar_sug_textarea.JS.text = "";
                    }, $scope.compData.JS.c60_fbar_sug_btn.JS.time * 1000);
                }
            }
            ;
            //接收来自后台的数据
            $scope.getDataFromRet = function(inputData) {
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'tuisuccess');
                //						$scope.revData = inputData;
            }
            ;
            $scope.eventMap['getDataFromRet'] = $scope.getDataFromRet;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });
        
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = "cminetui";
            $scope.init();
        }
    };
});
uiCore.directive('ftsiappholder', [
'coreService', 
'coreUtils', 
'$timeout', 
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'AE',
        replace: true,
        template: '<div></div>',
        transclude: true,
        scope: {},
        require: '^pid',
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        '$compile', 
        '$templateCache', 
        '$interval', 
        '$timeout', 
        function($scope, $element, $attrs, $compile, $templateCache, $interval, $timeout) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {
                    position: "relative",
                    height: "100%",
                    width: "100%",
                    left: "0px",
                    top: "0px",
                    'background-color': '#fff'
                },
                'JS': {
                    backable: true,
                    closeable: true,
                    'cdr': true,
                    'clickable': false,
                    'animation': false,
                    'pageStack': [],
                    'apploadState': false,
                    'pagercompmapping': {},
                    'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                    },
                    'currentpageid': '',
                    'backimageconfig': {
                        'CSS': {
                            "background-repeat": "no-repeat",
                            "background-size": "1.6em 1.6em",
                            'height': "1.6em",
                            'left': "0.6em",
                            'position': "absolute",
                            'top': "0.4em",
                            'width': "1.6em",
                            "z-index": "2047483649"
                        },
                        'JS': {
                            'clickable': "true",
                            'stateconfig': {
                                'state': "0",
                                'state0': {
                                    "background-image": "none",
                                    'cursor': "auto"
                                },
                                'state1': {
                                    "background-image": "url('" + top.tlbs.templatePath + 
                                    "/images/toback.png')",
                                    'cursor': "pointer"
                                }
                            }
                        }
                    },
                    'backimageconfigtouch': {
                        'CSS': {
                            'display': "block",
                            'height': "2.4em",
                            'left': "0em",
                            'position': "absolute",
                            'top': "0em",
                            'width': "5em",
                            "z-index": "2047483649"
                        },
                        'JS': {
                            'clickable': "true",
                            'stateconfig': {
                                'state': "0"
                            },
                            'cdrConfig': {
                                'uitracingcdr': {
                                    'cdrType': 'uitracingcdr',
                                    'enable': true,
                                    'storeData': false
                                }
                            }
                        }
                    },
                    'closeimageconfig': {
                        CSS: {
                            "background-image": "url('" + top.tlbs.templatePath + "/images/close.png')",
                            "background-repeat": "no-repeat",
                            "background-size": "1.6em 1.6em",
                            cursor: "pointer",
                            height: "1.6em",
                            position: "absolute",
                            right: "0.6em",
                            top: "0.4em",
                            width: "1.6em",
                            "z-index": "2047483649"
                        },
                        JS: {
                            clickable: "true",
                            stateconfig: {
                                state: "0"
                            }
                        }
                    },
                    closeimageconfigtouch: {
                        CSS: {
                            display: "block",
                            height: "2.4em",
                            position: "absolute",
                            right: "0em",
                            top: "0em",
                            width: "5em",
                            "z-index": "2047483649"
                        },
                        JS: {
                            clickable: "true",
                            stateconfig: {
                                state: "0"
                            }
                        }
                    },
                    'progresswindowconfig': {
                        'CSS': {
                            position: "fixed",
                            height: "100%",
                            width: "100%",
                            left: "0px",
                            display: "none",
                            "z-index": "2047483649",
                            top: "0px",
                            background: "rgba(0,0,0,0.498039)"
                        },
                        'JS': {}
                    },
                    'progresstextconfig': {
                        'CSS': {
                            "background-color": "#4C4C4C",
                            "border-radius": ".1em .1em .1em .1em",
                            color: "white",
                            height: "2em",
                            "line-height": "1.8em",
                            margin: "0 auto",
                            position: "relative",
                            "text-align": "center",
                            top: "6.75em",
                            width: "8em"
                        },
                        'JS': {
                            'progresstext': 'Please Wait...'
                        }
                    },
                    'statusholderconfig': {
                        'CSS': {
                            'display': 'none',
                            'height': '4.5em',
                            'top': '30%',
                            'color': '#BDBDBD',
                            'border': '0.05em solid #F2F2F2',
                            'background-color': '#F9F9F9',
                            'position': 'absolute',
                            'width': '50%',
                            'left': '25%',
                            'line-height': '100%',
                            'text-align': 'left',
                            '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
                            'list-style': 'none outside none',
                            'padding': '0',
                            'z-index': '2047483649',
                        },
                        'JS': {
                            'statustext': '<p class="img"></p><p class="info"><i res="PLEASE_RELOAD">对不起！<br>服务器正忙.<br>请重试.</i></p>'
                        }
                    },
                    pagercompmapping: {
                        goldcoin: "goldcoinlayout"
                    }
                }
                /*'CSS': {},
                        'JS': {
                        'clickable': false,
                        'animation': false,
                        'pageStack': [],
                        'apploadState': false,
                        'pagercompmapping': {},
                        'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                        },
                        'currentpageid': '',
                        'backimageconfig': {
                        'CSS': {},
                        'JS': {
                        'clickable': false,
                        'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                        }
                        }
                        },
                        'closeimageconfig': {
                        'CSS': {},
                        'JS': {
                        'clickable': false,
                        'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                        }
                        }
                        },
                        'progresswindowconfig': {
                        'CSS': {
                        'width': '100%',
                        'height': '100%',
                        'display': 'none'
                        },
                        'JS': {

                        }
                        },
                        'progresstextconfig': {
                        'CSS': {
                        'position': 'relative',
                        'border-radius': '.1em .1em .1em .1em',
                        'width': '8em',
                        'height': '2em',
                        'line-height': '1.8em',
                        'top': '6.75em',
                        'text-align': 'center',
                        'background-color': '#4C4C4C',
                        'margin': '0 auto',
                        'color': 'white'
                        },
                        'JS': {
                        'progresstext': 'Please Wait...'
                        }
                        },
                        'statusholderconfig': {
                        'CSS': {
                        'display': 'none',
                        'height': '4.5em',
                        'top': '30%',
                        'color': '#BDBDBD',
                        'border': '0.05em solid #F2F2F2',
                        'background-color': '#F9F9F9',
                        'position': 'absolute',
                        'width': '50%',
                        'left': '25%',
                        'line-height': '100%',
                        'text-align': 'left',
                        '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
                        'list-style': 'none outside none',
                        'padding': '0',
                        'z-index': '2047483647',
                        },
                        'JS': {
                        'statustext': '<p class="img"></p><p class="info"><i res="PLEASE_RELOAD">对不起！<br>服务器正忙.<br>请重试.</i></p>'
                        }
                        }
                        }*/
            };
            $scope.compData.JS.previouspageid = '';
            $scope.pagechangeChangeTimer = null ;
            $scope.pageChangeFlag = true;
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            var loadAppObject = function() {}
            ;
            loadAppObject.prototype.eexecute = function() {
                if (!$scope.compData.JS.apploadState) {
                    var elementTemplateCache = $templateCache.get($attrs.templateurl);
                    elementTemplateCache = '<div id="progressholder"><div id="progresstextholder">{{compData.JS.progresstextconfig.JS.progresstext}}</div></div><div id="statusholder" class="reload"></div>' + elementTemplateCache;
                    $element.html(elementTemplateCache);
                    $compile($element.contents())($scope);
                    $scope.compData.JS.apploadState = true;
                    $scope.ctrlPageGroup = {};
                    $scope.progressHolderElement = angular.element($element[0].querySelector('[id="progressholder"]'));
                    $scope.progressTextHolderElement = angular.element($element[0].querySelector('[id="progresstextholder"]'));
                    $scope.statusHolder = angular.element($element[0].querySelector('[id="statusholder"]'));
                    $scope.titleBackImage = angular.element($element[0].querySelector('.c60_fbar_titlebackimage'));
                    var alllLoad = angular.element($element[0].querySelectorAll('[lload="0"]'));
                    for (var i = 0; i < alllLoad.length; i++) {
                        var localElement = angular.element(alllLoad[i]);
                        $scope.ctrlPageGroup[localElement.attr('pid')] = localElement;
                    }
                }
            }
            ;
            $scope.loadApps = function(stateObject, deferred) {
                var loadApp = new loadAppObject().eexecute();
                if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            $scope.eventMap['loadApps'] = $scope.loadApps;
            $scope.lloadApps = function(loadObject, deferred) {
                if (null  != loadObject.applist && loadObject.applist.length > 0) {
                    var pageidSplit = loadObject.applist.split(',');
                    var appArrayObj = new loadAppArray().eexecute(pageidSplit, deferred);
                } else if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            var loadAppArray = function() {}
            ;
            
            loadAppArray.prototype.eexecute = function(pageArray, deferred) {
                var i = 0
                  , 
                j = pageArray.length
                  , 
                count = 0
                  , 
                pageArrayIds = pageArray
                  , 
                deferred = deferred;
                var executeFunction = function(lKey) {
                    var pageObject = $scope.ctrlPageGroup[pageArrayIds[count]];
                    if (null  != pageObject && pageObject.attr('lload') == 0) {
                        new loadSingleApp(pageObject).eexecute();
                    }
                    count = count + 1;
                    if (count == j && null  != deferred) {
                        deferred.resolve();
                    }
                }
                ;
                $interval(executeFunction, 150, j, this.loadKey);
            }
            ;
            
            var loadSingleApp = function(singleAppObject) {
                this.singleAppObject = singleAppObject;
            }
            ;
            loadSingleApp.prototype.eexecute = function() {
                this.singleAppObject.attr('lload', '1');
            }
            ;
            $scope.eventMap['lloadApps'] = $scope.lloadApps;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $scope.loadApps();
                $scope.applyStyle();
                $scope.initNext();
                coreService.fireEvent($scope.cid, 'init', null );
                /* $timeout(function() {
                        $scope.loadApps();
                        $scope.applyStyle();
                        $scope.initNext();
                        coreService.fireEvent($scope.cid, 'init', null);
                        }, 500);*/
            }
            ;
            $scope.initNext = function() {
                $scope.statusHolder.css($scope.compData.JS.statusholderconfig.CSS);
                $scope.statusHolder[0].innerHTML = $scope.compData.JS.statusholderconfig.JS.statustext;
            }
            ;
            $scope.showStatus = function() {
                $scope.statusHolder.css('display', 'block');
            }
            ;
            $scope.hideStatusMessage = function() {
                $scope.statusHolder.css('display', 'none');
            }
            ;
            $scope.applyStyle = function() {
                if (null  != $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]) {
                    coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]);
                }
                $element.css($scope.compData.CSS);
                $scope.progressHolderElement.css($scope.compData.JS.progresswindowconfig.CSS);
                $scope.progressTextHolderElement.css($scope.compData.JS.progresstextconfig.CSS);
                if (null  != $scope.titleBackImage) {
                    if (null  != $scope.compData.JS.backimageconfig.JS.stateconfig['state' + $scope.compData.JS.backimageconfig.JS.stateconfig.state]) {
                        coreUtils.extendDeep($scope.compData.JS.backimageconfig.CSS, $scope.compData.JS.backimageconfig.JS.stateconfig['state' + $scope.compData.JS.backimageconfig.JS.stateconfig.state]);
                    }
                    $scope.titleBackImage.css($scope.compData.JS.backimageconfig.CSS);
                }
            }
            ;
            $scope.changeState = function(stateObject, deferred) {
                if (null  != stateObject && null  != stateObject.cstate) {
                    if ($scope.compData.JS.stateconfig.state != stateObject.cstate) {
                        $scope.compData.JS.stateconfig.state = stateObject.cstate;
                        $scope.applyStyle();
                        $scope.$evalAsync(
                        function() {
                            if (null  != deferred) {
                                if ($scope.compData.JS.animation) {
                                    //var _transitionEnd = /webkit/i.test(navigator.userAgent) ? 'webkitTransitionEnd' : 'transitionend';
                                    $element.on(top.tlbs.transitionendEvent, function(e) {
                                        deferred.resolve();
                                    });
                                } else {
                                    deferred.resolve();
                                }
                            }
                        });
                    } else if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            }
            ;
            $scope.eventMap['changeState'] = $scope.changeState;
            $scope.eventMap['showStatus'] = $scope.showStatus;
            $scope.changeCurrentPageIDB = function(pageIDConfig, deferred) {
                if (null  != pageIDConfig && null  != pageIDConfig.pageid && pageIDConfig.pageid.length > 0) {
                    if ($scope.compData.JS.progresswindowconfig.CSS['display'] == 'block') {
                        $scope.compData.JS.progresswindowconfig.CSS['display'] = 'none';
                    }
                    $scope.hideStatusMessage();
                    var rootComponentConfig = $scope.compData.JS.pagercompmapping[pageIDConfig.pageid];
                    if (null  != rootComponentConfig && rootComponentConfig.length > 0) {
                        var compScope = coreService.getComponentScope(rootComponentConfig);
                        if (null  != compScope) {
                            typeof compScope.showcb === 'function' && 
                            compScope.showcb();
                        }
                    }
                    if (null  != pageIDConfig.cpageid && pageIDConfig.cpageid != $scope.compData.JS.currentpageid) {
                        return;
                    }
                    if (pageIDConfig.pageid == $scope.compData.JS.currentpageid) {
                        return;
                    }
                    $scope.pageChangeFlag = true;
                    $scope.compData.JS.previouspageid = $scope.compData.JS.currentpageid;
                    $scope.compData.JS.currentpageid = pageIDConfig.pageid;
                    if (null  != pageIDConfig.state && '1' == pageIDConfig.state) {
                        $scope.compData.JS.pageStack.push(pageIDConfig.pageid);
                        if ($scope.compData.JS.pageStack.length > 1) {
                            $scope.compData.JS.backimageconfig.JS.stateconfig.state = 1;
                        } else {
                            $scope.compData.JS.backimageconfig.JS.stateconfig.state = 0;
                        }
                    } else {
                        $scope.compData.JS.pageStack = [];
                        $scope.compData.JS.pageStack.push(pageIDConfig.pageid);
                        $scope.compData.JS.backimageconfig.JS.stateconfig.state = 0;
                    }
                    $timeout(function() {
                        $scope.compData.JS.backimageconfigtouch.JS.stateconfig.state = $scope.compData.JS.backimageconfig.JS.stateconfig.state;
                        var currentpage = angular.element($element[0].querySelectorAll('[pid="' + pageIDConfig.pageid + '"]'));
                        var backable = currentpage[0].getAttribute('backable');
                        var closable = currentpage[0].getAttribute('closable');
                        $scope.compData.JS.backable = backable == '0' ? false : true;
                        $scope.compData.JS.closable = closable == '0' ? false : true;
                    }, 10);
                
                }
                if (null  != deferred) {
                    deferred.resolve();
                }
                $scope.applyStyle();
            }
            ;
            $scope.eventMap['changeCurrentPageIDB'] = $scope.changeCurrentPageIDB;
            var timer;
            
            function checkPageLoad(pageid) {
                var currentpage = angular.element($element[0].querySelectorAll('[pid="' + pageid + '"]'));
                var html = currentpage[0].innerHTML;
                if ("<div></div>" == html) {
                    timer = $timeout(function() {
                        checkPageLoad(pageid);
                    }, 50);
                } else {
                    if (timer) {
                        clearTimeout(timer);
                    }
                    coreService.fireEvent((currentpage[0].getAttribute('pagesrcid') || pageid) + 'show', 'recvd');
                }
            }
            ;
            $scope.changeCurrentPageID = function(pageIDConfig, deferred) {
                if (null  != pageIDConfig && null  != pageIDConfig.pageid && pageIDConfig.pageid.length > 0) {
                    if ($scope.compData.JS.progresswindowconfig.CSS['display'] == 'block') {
                        $scope.compData.JS.progresswindowconfig.CSS['display'] = 'none';
                    }
                    $scope.hideStatusMessage();
                    var rootComponentConfig = $scope.compData.JS.pagercompmapping[pageIDConfig.pageid];
                    if (null  != rootComponentConfig && rootComponentConfig.length > 0) {
                        var compScope = coreService.getComponentScope(rootComponentConfig);
                        if (null  != compScope) {
                            typeof compScope.showcb === 'function' && 
                            compScope.showcb();
                        }
                    }
                    if (null  != pageIDConfig.cpageid && pageIDConfig.cpageid != $scope.compData.JS.currentpageid) {
                        return;
                    }
                    if ($scope.compData.JS.cdr) {
                        var cdrConfig = {
                            'cdrType': 'uidisplaycdr',
                            'enable': true,
                            'storeData': false
                        };
                        var cdrDataOpen = {
                            'pageId': pageIDConfig.pageid,
                            'displayType': 1,
                            'displayResult': 0
                        };
                        if (pageIDConfig.pageid != $scope.compData.JS.currentpageid) {
                            var cdrDataClose = {
                                'pageId': $scope.compData.JS.currentpageid,
                                'displayType': 0,
                                'displayResult': 0
                            };
                            coreUtils.cdrService(cdrConfig, cdrDataOpen);
                            coreUtils.cdrService(cdrConfig, cdrDataClose);
                            //coreUtils.uiDisplayCdr($scope.compData.JS.currentpageid, 0, 0);
                            //coreUtils.uiDisplayCdr(pageIDConfig.pageid, 1, 0);
                        } else {
                            coreUtils.cdrService(cdrConfig, cdrDataOpen);
                            //coreUtils.uiDisplayCdr(pageIDConfig.pageid, 1, 0);
                        }
                    }
                    top.tlbs.currentpageid = pageIDConfig.pageid;
                    var currentpage = angular.element($element[0].querySelectorAll('[pid="' + pageIDConfig.pageid + '"]'));
                    if (pageIDConfig.pageid != $scope.compData.JS.currentpageid) {
                        $scope.pageChangeFlag = true;
                        $scope.compData.JS.previouspageid = $scope.compData.JS.currentpageid;
                        $scope.compData.JS.currentpageid = pageIDConfig.pageid;
                        if (null  != pageIDConfig.state && '1' == pageIDConfig.state) {
                            $scope.compData.JS.pageStack.push(pageIDConfig.pageid);
                            if ($scope.compData.JS.pageStack.length > 1) {
                                $scope.compData.JS.backimageconfig.JS.stateconfig.state = 1;
                            } else {
                                $scope.compData.JS.backimageconfig.JS.stateconfig.state = 0;
                            }
                        } else {
                            $scope.compData.JS.pageStack = [];
                            $scope.compData.JS.pageStack.push(pageIDConfig.pageid);
                            $scope.compData.JS.backimageconfig.JS.stateconfig.state = 0;
                        }
                        $timeout(function() {
                            $scope.compData.JS.backimageconfigtouch.JS.stateconfig.state = $scope.compData.JS.backimageconfig.JS.stateconfig.state;
                            var backable = currentpage[0].getAttribute('backable');
                            var closable = currentpage[0].getAttribute('closable');
                            $scope.compData.JS.backable = backable == '0' ? false : true;
                            $scope.compData.JS.closable = closable == '0' ? false : true;
                        }, 10);
                    }
                    var lload = currentpage[0].getAttribute('lload');
                    if (lload == '0') {
                        $scope.lloadApps({
                            "applist": pageIDConfig.pageid
                        });
                        checkPageLoad(pageIDConfig.pageid);
                    
                    } else if (pageIDConfig.reload != '0') {
                        coreService.fireEvent((currentpage[0].getAttribute('pagesrcid') || pageIDConfig.pageid) + 'show', 'recvd');
                    }
                }
                if (null  != deferred) {
                    deferred.resolve();
                }
                $scope.applyStyle();
            }
            ;
            $scope.eventMap['changeCurrentPageID'] = $scope.changeCurrentPageID;
            $scope.popPage = function(args, deferred) {
                top.tlbs.cdrData = null ;
                if (null  != $scope.compData.JS.pageStack) {
                    var poppage = $scope.compData.JS.pageStack.pop();
                    if (null  != poppage) {
                        if (poppage == $scope.compData.JS.currentpageid) {
                            $scope.popPage();
                        } else {
                            $scope.changeCurrentPageID({
                                'pageid': poppage,
                                'state': 1,
                                'reload': (args || {}).reload || '0'
                            }, deferred);
                        }
                    } else {
                        $scope.compData.JS.pageStack = [];
                        $scope.compData.JS.backimageconfig.JS.stateconfig.state = 0;
                    }
                }
                if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            $scope.eventMap['popPage'] = $scope.popPage;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
            });
            $scope.isCurrentPage = function(pageID) {
                return $scope.compData.JS.currentpageid == pageID ? true : false;
            }
            ;
            $scope.getPageClass = function(pageID) {
                return ($scope.compData.JS.previouspageid == pageID && $scope.pageChangeFlag) ? 'pprevious' : $scope.compData.JS.currentpageid == pageID ? 'pcurrent' : 'phidden';
            }
            ;
            $scope.showProgress = function(stateObject, deferred) {
                $scope.compData.JS.progresswindowconfig.CSS['display'] = 'block';
                if (null  != deferred) {
                    deferred.resolve();
                }
                $scope.applyStyle();
            }
            ;
            $scope.eventMap['showProgress'] = $scope.showProgress;
            $scope.hideProgress = function(stateObject, deferred) {
                $scope.compData.JS.progresswindowconfig.CSS['display'] = 'none';
                if (null  != deferred) {
                    deferred.resolve();
                }
                $scope.applyStyle();
            }
            ;
            $scope.eventMap['hideProgress'] = $scope.hideProgress;
            $scope.writeCPageOpenCDR = function(stateObject, deferred) {
                if ($scope.compData.JS.cdr) {
                    var cdrConfig = {
                        'cdrType': 'uidisplaycdr',
                        'enable': true,
                        'storeData': false
                    };
                    var cdrData = {
                        'pageId': $scope.compData.JS.currentpageid,
                        'displayType': 1,
                        'displayResult': 0
                    };
                    coreUtils.cdrService(cdrConfig, cdrData);
                    //coreUtils.uiDisplayCdr($scope.compData.JS.currentpageid, 1, 0);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            }
            ;
            $scope.writeCPageCloseCDR = function(stateObject, deferred) {
                top.tlbs.cdrData = null ;
                if ($scope.compData.JS.cdr) {
                    var cdrConfig = {
                        'cdrType': 'uidisplaycdr',
                        'enable': true,
                        'storeData': false
                    };
                    var cdrData = {
                        'pageId': $scope.compData.JS.currentpageid,
                        'displayType': 0,
                        'displayResult': 0
                    };
                    coreUtils.cdrService(cdrConfig, cdrData);
                    //coreUtils.uiDisplayCdr($scope.compData.JS.currentpageid, 0, 0);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            }
            ;
            $scope.$watch(function() {
                return $scope.compData.JS.previouspageid;
            }, function(newValue, oldValue) {
                if (null  != newValue && newValue.length > 0) {
                    $timeout.cancel($scope.pagechangeChangeTimer);
                    $scope.pagechangeChangeTimer = $timeout(function() {
                        $scope.pageChangeFlag = false;
                    }, 500);
                }
            });
            $scope.$on(
            "$destroy", 
            function(event) {
                $timeout.cancel($scope.pagechangeChangeTimer);
            }
            );
            $scope.eventMap['writeCPageOpenCDR'] = $scope.writeCPageOpenCDR;
            $scope.eventMap['writeCPageCloseCDR'] = $scope.writeCPageCloseCDR;
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = attrs['ppid'] || ctrl.pageID;
            scope.componentType = 'ftsiappholder';
            scope.init();
        }
    };
}
]);
uiCore.directive('ifscoupon', [
'coreService', 
'coreUtils', 
function(coreService, coreUtils) {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: '<div class="c60_fbar_my_privilege_con"><div simplescroll><div id="topImgBanner" class="c60_fbar_mp_barnner">' + 
        '<img class="c60_fbar_mp_barnner_img" ng-src="{{compData.JS.topImgBanner.JS.bannerImgURLForImg}}" alt=""/></div><div id="bottomListHolder" class="c60_fbar_mp_con">' + 
        '<div class="c60_fbar_mp_list" ng-repeat="data in compData.JS.couponData"><div class="c60_fbar_mp_list_top"><table class="c60_fbar_mp_list_top_table" cellpadding="0" cellspacing="0"><tbody><tr>' + 
        '<td ng-style={{::compData.JS.couponIndex.CSS}}>{{::$index+1}}</td><td><div class="c60_fbar_mp_lt_table_tit" ng-style={{::compData.JS.couponName.CSS}}>{{::data.couponname}}</div><div class="c60_fbar_mp_lt_table_tit_txt" ng-style={{::compData.JS.couponDesc.CSS}}>{{::data.description}}</div></td>' + 
        '<td class="c60_fbar_clearfloat" ccid="couponLink" ng-click="openCouponURL($index)"><span class="c60_fbar_mp_lt_table_tit_btn" ng-style={{::compData.JS.couponLink.CSS}}>{{::compData.JS.couponLink.JS.text}}</span></td></tr></tbody></table></div>' + 
        '<div class="c60_fbar_mp_list_bottom"><div class="c60_fbar_mp_lb_detail c60_fbar_clearfloat"><span class="c60_fbar_mp_lb_d_ico_01" ng-style={{::compData.JS.couponCodeText.CSS}}>{{::compData.JS.couponCodeText.JS.text}}</span>' + 
        '<span class="c60_fbar_mp_lb_d_txt" ng-style={{::compData.JS.couponCodeValue.CSS}}>{{::data.exchangecode}}</span></div><div class="c60_fbar_mp_lb_detail c60_fbar_clearfloat">' + 
        '<span class="c60_fbar_mp_lb_d_ico_02" ng-style={{::compData.JS.couponValidDateText.CSS}}>{{::compData.JS.couponValidDateText.JS.text}}</span><span class="c60_fbar_mp_lb_d_txt" ng-style={{::compData.JS.couponValidDateValue.CSS}}>{{::data.startdate+" - "+data.expiredate}}</span></div>' + 
        '<div class="c60_fbar_mp_lb_detail c60_fbar_clearfloat"><span class="c60_fbar_mp_lb_d_ico_03" ng-style={{::compData.JS.couponExDescText.CSS}}>{{::compData.JS.couponExDescText.JS.text}}</span>' + 
        '<span class="c60_fbar_mp_lb_d_txt" ng-style={{::compData.JS.couponExDescValue.CSS}}>{{::data.exchangedescrption}}</span></div></div></div></div></div></div>',
        scope: {},
        require: '^pid',
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        function($scope, $element, $attrs) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {
                    'height': '100%',
                    'width': '100%',
                    'position': 'relative'
                },
                'JS': {
                    'clickable': false,
                    'animation': false,
                    'clickevent': '',
                    'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                    },
                    'topImgBanner': {
                        'CSS': {
                            'height': '6em'
                        },
                        'JS': {
                            'bannerImgURL': "url('" + top.tlbs.templatePath + "/images/my_privilege_banner.png')",
                            'bannerImgURLForImg': ''
                        }
                    },
                    'bottomListHolder': {
                        'CSS': {
                        
                        },
                        'JS': {
                        
                        }
                    },
                    'couponIndex': {
                        'CSS': {
                            'color': '#f9807c'
                        },
                        'JS': {
                        
                        }
                    },
                    'couponName': {
                        'CSS': {
                            'width': '90%',
                            'font-size': '1em',
                            'color': '#222',
                            'white-space': 'nowrap',
                            'overflow': 'hidden',
                            'text-overflow': 'ellipsis'
                        },
                        'JS': {
                        
                        }
                    },
                    'couponDesc': {
                        'CSS': {
                            'width': '90%',
                            'font-size': '0.8em',
                            'color': '#ff7d55',
                            'white-space': 'nowrap',
                            'overflow': 'hidden',
                            'text-overflow': 'ellipsis',
                            'margin-top': '0.6em'
                        },
                        'JS': {
                        
                        }
                    },
                    'couponLink': {
                        'CSS': {
                            'float': 'right',
                            'width': '4.5em',
                            'height': '2.2em',
                            'line-height': '2.2em',
                            'background': '#ff7d55',
                            'color': '#fff',
                            'text-align': 'center',
                            'font-size': '1em',
                            'margin-right': '1.2em',
                            '-moz-border-radius': '2.2em',
                            '-webkit-border-radius': '2.2em',
                            'border-radius': '2.2em'
                        },
                        'JS': {
                            'text': '详情'
                        }
                    },
                    'couponCodeText': {
                        'CSS': {
                            'float': 'left',
                            'width': '5em',
                            'font-size': '0.8em',
                            'line-height': '1.8em',
                            'color': '#222',
                            'background': 'left center no-repeat',
                            'background-size': '1.2em 1.2em',
                            'padding-left': '1.5em',
                            'background-image': "url('" + top.tlbs.templatePath + "/images/my_privilege_ico_01.png')"
                        },
                        'JS': {
                            'text': '兑换码:'
                        }
                    },
                    'couponCodeValue': {
                        'CSS': {
                            'float': 'left',
                            'width': '65%',
                            'line-height': '1.8em',
                            'color': '#222',
                            'font-size': '0.8em'
                        },
                        'JS': {
                        
                        }
                    },
                    'couponValidDateText': {
                        'CSS': {
                            'float': 'left',
                            'width': '5em',
                            'font-size': '0.8em',
                            'line-height': '1.8em',
                            'color': '#222',
                            'background': 'left center no-repeat',
                            'background-size': '1.2em 1.2em',
                            'padding-left': '1.5em',
                            'background-image': "url('" + top.tlbs.templatePath + "/images/my_privilege_ico_02.png')"
                        },
                        'JS': {
                            'text': '兑换日期:'
                        }
                    },
                    'couponValidDateValue': {
                        'CSS': {
                            'float': 'left',
                            'width': '65%',
                            'line-height': '1.8em',
                            'color': '#ff7d55',
                            'font-size': '0.8em'
                        },
                        'JS': {
                        
                        }
                    },
                    'couponExDescText': {
                        'CSS': {
                            'float': 'left',
                            'width': '5em',
                            'font-size': '0.8em',
                            'line-height': '1.8em',
                            'color': '#222',
                            'background': 'left center no-repeat',
                            'background-size': '1.2em 1.2em',
                            'padding-left': '1.5em',
                            'background-image': "url('" + top.tlbs.templatePath + "/images/my_privilege_ico_03.png')"
                        },
                        'JS': {
                            'text': '使用方法:'
                        }
                    },
                    'couponExDescValue': {
                        'CSS': {
                            'float': 'left',
                            'width': '65%',
                            'line-height': '1.8em',
                            'color': '#222',
                            'font-size': '0.8em'
                        },
                        'JS': {
                        
                        }
                    }
                }
            };
            $scope.compData.JS.couponData = [];
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $scope.processConfig();
                $scope.processStyle();
            }
            ;
            $scope.processConfig = function() {
                $scope.compData.JS.topImgBanner.JS.bannerImgURLForImg = $scope.compData.JS.topImgBanner.JS.bannerImgURL.replace("url('", "").replace("')", "");
            }
            ;
            $scope.processStyle = function() {
                $scope.topImgBanner = angular.element($element[0].querySelector('[id="topImgBanner"]'));
                $scope.bottomListHolder = angular.element($element[0].querySelector('[id="bottomListHolder"]'));
                
                $element.css($scope.compData.CSS);
                $scope.topImgBanner.css($scope.compData.JS.topImgBanner.CSS);
                $scope.bottomListHolder.css($scope.compData.JS.bottomListHolder.CSS);
            }
            ;
            $scope.openCouponURL = function(index) {
                var couponData = $scope.compData.JS.couponData[index];
                //add by h00278783 cdr ----------start---------------
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.couponLink.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': $scope.compData.JS.couponData[index].couponid
                    };
                    coreUtils.cdrService($scope.compData.JS.couponLink.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                //add by h00278783 cdr ----------end---------------
                if (couponData.couponlink !== '' && couponData.couponlink !== undefined && couponData.couponlink !== null ) {
                    window.open(couponData.couponlink);
                }
            
            }
            ;
            $scope.updateCouponData = function(eventInput, deferred) {
                if (null  != eventInput && null  != eventInput.respparam.usercoupons) {
                    $scope.compData.JS.couponData = eventInput.respparam.usercoupons;
                }
                if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            $scope.eventMap['init'] = $scope.init;
            $scope.eventMap['updateCouponData'] = $scope.updateCouponData;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
            });
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'ifscoupon';
            scope.init();
        }
    };
}
]);
uiCore.directive('popupmessage', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_popuppure"><div class="c60_fbar_wchbg_pop_block"></div>' + '<div class="c60_fbar_wchpop_block">' + '<div class="c60_fbar_wchimg_txt_title"><span class="c60_fbar_wchyidong" ng-style="pureStyle(\'title\')" ng-bind="pureText(\'title\')"></span></div>' + '<div class="c60_fbar_wchimg_txt_info">' + '<div class="c60_fbar_wchpop_txt2"  ng-style="pureStyle(\'message\')" ng-bind-html="to_trusted(revData.message)"></div>' + '</div>' + '<div class="c60_fbar_wchimg_txt_btn clearfloat">' + '<div class="c60_fbar_wchleft_itbtn2" ng-bind="pureText(\'cancel\')" ccid="c60_fbar_popupmessage_btnclose"  ng-style="pureStyle(\'cancel\')"></div>' + '</div>' + '</div>' + '</div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", "$timeout", 'coreService', 'coreUtils', 'Const', '$sce', 
        function($scope, $element, $attrs, $timeout, coreService, coreUtils, Const, $sce) {
            $scope.cid = $attrs.cid;
            $scope.compData = {};
            $scope.eventMap = {};
            $scope.revData = {};
            $scope.to_trusted = function(text) {
                if (text != null  && text != undefined) {
                    text = text + '';
                    return $sce.trustAsHtml(text.replace(/\n/g, "<br/>"));
                } else {
                    return "";
                }
            }
            ;
            //获取后台数据
            $scope.updateData = function(param) {
                $element.css({
                    'display': 'block'
                });
                if (param != null  && param != undefined) {
                    if (param.message != null  && param.message != undefined) {
                        top.tlbs.messageid = param.messageid || "";
                        $scope.revData.message = param.message;
                    } else {
                        $scope.revData.message = '';
                    }
                
                }
                var time = $scope.compData.JS.closetime;
                //add by h00278783 当植入时候弹框，需要自动隐藏，消息中心不需要自动隐藏------start-----
                if (top.tlbs.messageid != "") {
                    $timeout(function() {
                        if ($element.css('display') != 'none') {
                            top.tlbs.notificationCdrData = null ;
                        }
                        $scope.hide();
                    }, time);
                }
                //add by h00278783 当植入时候弹框，需要自动隐藏，消息中心不需要自动隐藏------end-----
            }
            ;
            $scope.hide = function() {
                $element.css({
                    'display': 'none'
                });
            }
            ;
            var _touchstart = Const.touchEvent.start
              , 
            container = angular.element($element[0].querySelector('.c60_fbar_wchleft_itbtn2'));
            container.bind(_touchstart, function(e) {
                e.stopPropagation();
                e.preventDefault();
                _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                $element.css({
                    'display': 'none'
                });
                //add by h00278783 点击弹框，上报状态消息-----------start---
                if (top.tlbs.messageid != "") {
                    coreService.fireEvent($scope.cid, 'messagestatuschange', {
                        "messageid": top.tlbs.messageid
                    });
                }
                //add by h00278783 点击弹框，上报状态消息-----------end---
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.popupcloseconfig.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'closebtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.popupcloseconfig.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                top.tlbs.notificationCdrData = null ;
            });
            $scope.pureStyle = function(type) {
                if (type != null  && type != undefined) {
                    switch (type) {
                    case 'title':
                        return $scope.compData.JS.popuptitleconfig.JS.stateconfig.state;
                        break;
                    case 'cancel':
                        return $scope.compData.JS.popupbtnconfig.JS.stateconfig.state0;
                        break;
                    case 'message':
                        return $scope.compData.JS.popupcolorconfig.JS.stateconfig.state;
                        break;
                    default:
                        break;
                    }
                }
            }
            ;
            $scope.pureText = function(type) {
                if (type != null  && type != undefined) {
                    switch (type) {
                    case 'title':
                        return $scope.compData.JS.popuptitleconfig.JS.stateconfig.title;
                        break;
                    case 'cancel':
                        return $scope.compData.JS.popupbtnconfig.JS.stateconfig.title0;
                        break;
                    default:
                        break;
                    }
                }
            }
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData = coreUtils.extendDeep($scope.compData, properties);
                coreService.fireEvent($element.attr('cid'), 'init');
            }
            ;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            $scope.eventMap['update'] = $scope.updateData;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'popupmessage';
            $scope.init();
        }
    }
}
]);
uiCore.directive('linechart', [function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_linechartwrap"><div class="c60_fbar_linechart">' 
        + '<div class="c60_fbar_linechart_title"><span class="c60_fbar_linechart_titleicon"></span><span class="c60_fbar_linechart_titletext" ng-bind="chartText.JS.titletext.text"></span></div>' 
        + '<div class="c60_fbar_linechart_text"><span class="c60_fbar_linechart_used"><b class="c6_fbar_usedtext_text" ng-bind="chartText.JS.usedtext.text"></b><b class="c6_fbar_usedtext_value" ng-bind="avgused.v+avgused.u"></b></span><span class="c60_fbar_linechart_left"><b class="c6_fbar_usedtext_value" ng-bind="chartText.JS.lefttext.text"></b><b class="c6_fbar_usedtext_value" ng-bind="avgremain.v+avgremain.u"></b></span></div>' 
        + '<div class="c60_fbar_linewrap" ng-show="linewrapflag"><div class="c60_fbar_lineballwrap" id="c60_fbar_lineballwrap" style="position:absolute;top:0;" >' 
        + '<canvas id="lineChart" class="c60_fbar_lineCanvas" style="position:absolute;top:0;left:0;z-index:99">browser does not support the canvas element.</canvas>' 
        + '<div class="c60_fbar_lineballs"></div>' 
        + '</div></div>' 
        + '</div></div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 
        'coreUtils', 
        'Const', function($scope, $element, $attrs, coreService, coreUtils, Const) {
            var linchart = angular.element($element[0].querySelector('.tbholder .c60_fbar_linechart'));
            $scope.linewrapflag = false;
            $scope.compData = {
                'CSS': {},
                'JS': {}
            };
            var setting = {
                'K': 1024,
                'M': 1024 * 1024,
                'G': 1024 * 1024 * 1024,
                'T': 1024 * 1024 * 1024 * 1024
            };
            
            $scope.transferK = function(value, keepfloat) {
                var n = keepfloat || 2;
                return coreUtils.trafficValueTransferfromKB(value, n);
            
            }
            ;
            $scope.eventMap = {};
            $scope.init = function() {}
            ;
            $scope.showLine = function(config) {
                
                if (config) {
                    var chartConfig = config.JS.chartConfig || {};
                    $scope.chartText = config.JS.chartText || {};
                    //单位转换
                    if (config.trraficdata.avgremain && config.trraficdata.avgused && config.trraficdata.trafficchart) {
                        $scope.linewrapflag = true;
                        $scope.avgremain = $scope.transferK(config.trraficdata.avgremain.value);
                        $scope.avgused = $scope.transferK(config.trraficdata.avgused.value);
                        var trafficchart = config.trraficdata.trafficchart;
                        var drawLine = function() {
                            var lineballs = angular.element($element[0].querySelector('.c60_fbar_lineballs'))[0];
                            var canvas = top.document.getElementById('lineChart');
                            var canvaswrap = angular.element($element[0].querySelector('.c60_fbar_lineballwrap'));
                            var ctxt = canvas.getContext("2d");
                            
                            var lineDate = []
                              , lineValue = []
                              , traffic = [];
                            var list = [], currentC, bglinearray = [];
                            var trafficlen = trafficchart.length;
                            var myDate = new Date();
                            var day = myDate.getDate();
                            
                            if (trafficlen > 0) {
                                
                                if (trafficlen > chartConfig.showNumber) {
                                    canvaswrap.css({
                                        'right': '0px'
                                    });
                                } else if (trafficlen < chartConfig.showNumber) {
                                    canvaswrap.css({
                                        'left': '0px'
                                    });
                                } else if (trafficlen == chartConfig.showNumber) {
                                    canvaswrap.css({
                                        'right': '0px'
                                    });
                                }
                            }
                            
                            //将data放进数组lineDate,将value放进数组lineValue
                            var tralen;
                            if (trafficlen < 8 && trafficlen > 0) {
                                tralen = 7;
                            } else {
                                tralen = trafficlen;
                            }
                            for (var n = 0; n < tralen; n++) {
                                lineDate[n] = parseInt(n + 1);
                            }
                            for (var i = 0; i < trafficlen; i++) {
                                lineValue[i] = trafficchart[i].traffic;
                                traffic[i] = $scope.transferK(trafficchart[i].traffic);
                            }
                            lineValue.push(config.trraficdata.avgremain.value);
                            lineValue.push(config.trraficdata.avgused.value);
                            //计算spacing的大小定义canvas的宽度
                            var clientW = top.window.innerWidth
                              , clientH = top.window.innerHeight
                              , baseWidth = 320;
                            var ratio;
                            var metas = top.document.getElementsByName("viewport")[0];
                            var heads = top.document.getElementsByTagName('head')[0];
                            if (metas != undefined) {
                                var widthV = metas.getAttribute('content').split(',')[1].split('width=')[1];
                                if (/taobao/.test(top.window.location.href)) {
                                    if (/tmall|ju|jhs|taoshenghuo|app/.test(top.window.location.href)) {
                                        ratio = 1;
                                    } else {
                                        var value1 = parseFloat(metas.getAttribute('content').split(',')[0].split('initial-scale=')[1]).toFixed(2);
                                        ratio = Math.round(1 / value1 * 100) / 100;
                                    }
                                
                                } else {
                                    if (/163/.test(top.window.location.href)) {
                                        if (navigator.userAgent.indexOf("iPhone") != -1) {
                                            if (navigator.userAgent.indexOf("NewsApp") != -1) {
                                                ratio = 2;
                                            } else {
                                                ratio = 1;
                                            }
                                            if (/m.163/.test(top.window.location.href)) {
                                                ratio = 2;
                                            }
                                        
                                        } else if (navigator.userAgent.indexOf("Android") != -1) {
                                            if (navigator.userAgent.indexOf("NewsApp") != -1) {
                                                ratio = 1;
                                            } else {
                                                ratio = 1;
                                            }
                                            if (/m.163/.test(top.window.location.href)) {
                                                ratio = 2;
                                            }
                                        } else {
                                            ratio = 1;
                                        }
                                    } else {
                                        ratio = 1;
                                    }
                                
                                
                                }
                            } else {
                                ratio = top.window.innerWidth / 320;
                            }
                            var lastwidth = ratio == 1 ? 30 : 60;
                            chartConfig.xStartSpacing = ratio == 1 ? 30 : chartConfig.xStartSpacing;
                            chartConfig.spacing = parseInt((clientW - chartConfig.xStartSpacing - lastwidth) / parseInt(chartConfig.showNumber - 1));
                            var canvasWidth = parseInt((tralen - 1) * chartConfig.spacing) + parseInt(chartConfig.xStartSpacing) + lastwidth;
                            canvaswrap.css('width', canvasWidth + 'px');
                            canvas.setAttribute("width", canvasWidth + 'px');
                            canvas.setAttribute("height", 160 * ratio + 'px');
                            canvas.setAttribute("style", "border-bottom:1px solid #ccc");
                            //定义原点坐标,纵向刻度的范围
                            var originPointX = 0
                              , originPointY = 130 * ratio
                              , yheight = 100 * ratio;
                            //查找lineValue中的最大最小值
                            function getMaximin(arr, maximin) {
                                if (maximin == "max") {
                                    return Math.max.apply(Math, arr);
                                } else if (maximin == "min") {
                                    return Math.min.apply(Math, arr);
                                }
                            }
                            var maxnum = getMaximin(lineValue, "max");
                            var minnum = getMaximin(lineValue, "min");
                            var numcut = parseInt(maxnum - minnum);
                            //计算已用日均的高度，剩余日均的高度
                            var avgusedheight, avgremainheight;
                            avgusedheight = Math.abs(yheight / numcut * (config.trraficdata.avgused.value - minnum)),
                            avgremainheight = Math.abs(yheight / numcut * (config.trraficdata.avgremain.value - minnum));
                            //定义纵向起点，获取纵向背景线
                            var Starty0 = originPointY
                              , Startx0 = parseInt(originPointX + chartConfig.xStartSpacing)
                              , xpad = 0;
                            var yStartArray = []
                              , yEndArray = [];
                            var pointArray = []
                              , arraya = []
                              , Xcontentarray = [];
                            for (var j = 0; j < tralen; j++) {
                                var yy1 = parseInt(Starty0 - yheight)
                                  , yx1 = parseInt(Startx0 + xpad);
                                var py1 = parseInt(Starty0 - (yheight / numcut * (lineValue[j] - minnum)))
                                  , px1 = parseInt(Startx0 + xpad);
                                xpad = parseInt(xpad + chartConfig.spacing);
                                yStartArray[j] = [yx1 + "," + yy1];
                                yEndArray[j] = [yx1 + "," + Starty0];
                                
                                //获取折线圆点坐标
                                if (trafficlen == 1) {
                                    arraya[j] = {
                                        x: px1,
                                        y: py1
                                    }
                                } else if (trafficlen > 1) {
                                    arraya[j] = {
                                        x: px1,
                                        y: py1
                                    }
                                }
                                pointArray.push(arraya[j]);
                                //显示背景线
                                if (chartConfig.isShowBgLine) {
                                    
                                    ctxt.beginPath();
                                    ctxt.strokeStyle = chartConfig.bgLineColor;
                                    ctxt.lineWidth = chartConfig.bgLineWidth;
                                    ctxt.moveTo(yx1, yy1);
                                    ctxt.lineTo(yx1, Starty0);
                                    ctxt.stroke();
                                    ctxt.closePath();
                                }
                                //显示横向内容
                                if (chartConfig.isShowXContent) {
                                    if (j == (day - 1)) {
                                        var Xcontent = angular.element('<div class="c60_fbar_xcontents">' + chartConfig.todayText + '</div>')[0];
                                        Xcontentarray.push(Xcontent);
                                        lineballs.appendChild(Xcontent);
                                        angular.element(Xcontentarray[j]).css({
                                            'width': chartConfig.spacing + 'px',
                                            'left': parseInt(yx1) + 'px',
                                            'top': originPointY + 'px',
                                            'font': chartConfig.XContentCurrentFont,
                                            'color': chartConfig.XContentCurrentColor,
                                            'word-wrap': 'normal',
                                            'white-space': 'nowrap',
                                            'margin-left': -chartConfig.spacing * 0.5 + 'px'
                                        });
                                    } else {
                                        var Xcontent = angular.element('<div class="c60_fbar_xcontents">' + lineDate[j] + '</div>')[0];
                                        Xcontentarray.push(Xcontent);
                                        lineballs.appendChild(Xcontent);
                                        angular.element(Xcontentarray[j]).css({
                                            'width': chartConfig.spacing + 'px',
                                            'left': parseInt(yx1) + 'px',
                                            'top': originPointY + 'px',
                                            'font': chartConfig.XContentFont,
                                            'color': chartConfig.XContentColor,
                                            'margin-left': -chartConfig.spacing * 0.5 + 'px'
                                        });
                                    }
                                }
                            }
                            drawPolygon(ctxt);
                            //画多边形
                            function drawPolygon(ctxt) {
                                if (chartConfig.PolygonShow) {
                                    ctxt.beginPath();
                                    
                                    ctxt.moveTo(pointArray[0].x, pointArray[0].y);
                                    for (var xx = 0; xx < trafficlen - 1; xx++) {
                                        ctxt.fillStyle = chartConfig.PolygonColor;
                                        ctxt.lineTo(pointArray[xx + 1].x, pointArray[xx + 1].y);
                                    }
                                    ctxt.lineTo(pointArray[trafficlen - 1].x, Starty0);
                                    ctxt.lineTo(Startx0, Starty0);
                                    ctxt.fill();
                                    ctxt.closePath();
                                }
                            }
                            drawPolyLine(ctxt);
                            //画折线
                            function drawPolyLine() {
                                for (var x = 0; x < trafficlen - 1; x++) {
                                    
                                    if (chartConfig.polyLineShow) {
                                        ctxt.beginPath();
                                        ctxt.strokeStyle = chartConfig.lineColor;
                                        ctxt.lineWidth = chartConfig.lineWidth;
                                        ctxt.moveTo(pointArray[x].x, pointArray[x].y);
                                        ctxt.lineTo(pointArray[x + 1].x, pointArray[x + 1].y);
                                        ctxt.stroke();
                                        ctxt.closePath();
                                    }
                                }
                            }
                            //画圆
                            if (chartConfig.polyPointShow) {
                                drawCircle();
                            }
                            function drawCircle() {
                                var dot = []
                                  , 
                                dotdetail = [];
                                for (var i = 0; i < trafficlen; i++) {
                                    
                                    var linecircle = angular.element('<div class="c60_fbar_linecirclewrap"><div class="c60_fbar_linecircle"></div></div>')[0];
                                    var linecontent = angular.element('<div class="c60_fbar_linecontent">' + traffic[i].v + traffic[i].u + '</div>')[0];
                                    dot.push(linecircle);
                                    dotdetail.push(linecontent);
                                    lineballs.appendChild(linecircle);
                                    lineballs.appendChild(linecontent);
                                }
                                
                                //设置圆的样式
                                
                                for (var j = 0; j < trafficlen; j++) {
                                    angular.element(dot[j]).css({
                                        'left': pointArray[j].x + 'px',
                                        'top': pointArray[j].y + 'px'
                                    
                                    });
                                    angular.element(dotdetail[j]).css({
                                        'left': pointArray[j].x + 'px',
                                        'top': pointArray[j].y + 'px'
                                    
                                    });
                                    
                                    var _touchstart = Const.touchEvent.start
                                      , 
                                    _touchend = Const.touchEvent.end
                                      , 
                                    dotcontainer = angular.element(dot[j]);
                                    var f = (function(j) {
                                        
                                        var touch = function(e) {
                                            
                                            e.stopPropagation();
                                            e.preventDefault();
                                            
                                            for (var i = 0; i < trafficlen; i++) {
                                                if (i != j) {
                                                    
                                                    angular.element(dot[i]).removeClass('c60_fbar_curcircle').css({
                                                        '-webkit-transform': 'scale(1)',
                                                        '-moz-transform': 'scale(1)',
                                                        '-o-transform': 'scale(1)',
                                                        '-ms-transform': 'scale(1)',
                                                        'transform': 'scale(1)',
                                                        'margin-left': '-0.3em',
                                                        'margin-top': '-0.3em',
                                                    });
                                                    angular.element(dotdetail[i]).removeClass('c60_fbar_curcontent').css({
                                                        'display': 'none'
                                                    });
                                                }
                                            }
                                            angular.element(dot[j]).addClass('c60_fbar_curcircle').css({
                                                '-webkit-transform': 'scale(1.5)',
                                                '-moz-transform': 'scale(1.5)',
                                                '-o-transform': 'scale(1.5)',
                                                '-ms-transform': 'scale(1.5)',
                                                'transform': 'scale(1.5)',
                                                'margin-left': '-0.15em',
                                                'margin-top': '-0.15em',
                                            });
                                            angular.element(dotdetail[j]).addClass('c60_fbar_curcontent').css({
                                                'display': 'block'
                                            });
                                        
                                        }
                                        return touch;
                                    
                                    })(j)
                                    dotcontainer.bind(_touchstart, f);
                                
                                }
                            
                            }
                            //已用日均线
                            if (chartConfig.avgusedlineShow) {
                                var avgusedline = angular.element('<div class="c60_fbar_avgusedline"></div>')[0];
                                lineballs.appendChild(avgusedline);
                                var avgusedlines = angular.element($element[0].querySelector('.c60_fbar_avgusedline'));
                                if (metas != undefined) {
                                    avgusedlines.css('border-top', '1px solid #ccc');
                                }
                                var avgusedlineWidth = parseInt(pointArray[trafficlen - 1].x - originPointX)
                                  , avgusedlineHeight = Math.abs(parseInt(originPointY - avgusedheight));
                                avgusedlines.css({
                                    'top': avgusedlineHeight + 'px',
                                    'width': avgusedlineWidth + 'px',
                                    'border-color': chartConfig.avgusedlineStyle
                                });
                            
                            
                            
                            }
                            //剩余日均线
                            if (chartConfig.avgremainlineShow) {
                                var avgremainline = angular.element('<div class="c60_fbar_avgremainline"></div>')[0];
                                lineballs.appendChild(avgremainline);
                                var avgremainlines = angular.element($element[0].querySelector('.c60_fbar_avgremainline'));
                                if (metas != undefined) {
                                    avgremainlines.css('border-top', '1px dotted #ccc');
                                }
                                var avgremainlineWidth = parseInt(canvasWidth - pointArray[trafficlen - 1].x)
                                  , avgremainlineHeight = Math.abs(parseInt(originPointY - avgremainheight));
                                avgremainlines.css({
                                    'top': avgremainlineHeight + 'px',
                                    'left': parseInt(pointArray[trafficlen - 1].x - originPointX) + 'px',
                                    'width': avgremainlineWidth + 'px',
                                    'border-color': chartConfig.avgremainlineStyle
                                });
                            
                            }
                        
                        }
                        ;
                        drawLine();
                        if (chartConfig.showNumber < trafficchart.length) {
                            dragMove();
                        }
                    
                    } else {
                        linchart.css('height', '4em');
                        $scope.linewrapflag = false;
                    }
                
                }
            
            }
            ;
            
            var totaldistance = 0;
            
            //滑动canvas
            var dragMove = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var _lastYPos = 0;
                var _lastXPos = 0;
                var _currentYPos = 0;
                var _currentXPos = 0;
                var moveflag = false;
                var lineChart = angular.element($element[0].querySelector('#c60_fbar_lineballwrap'));
                lineChart.bind(_touchstart, function(e) {
                    
                    _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                    _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    moveflag = false;
                });
                lineChart.bind(_touchmove, function(e) {
                    
                    
                    _currentXPos = e.touches ? e.touches[0].pageX : e.pageX;
                    _currentYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    if (!moveflag && Math.abs(_currentYPos - _lastYPos) > Math.abs(_currentXPos - _lastXPos)) {
                        
                        return;
                    }
                    //if(Math.abs(_currentYPos - _lastYPos) == 0){
                    
                    if (Math.abs(_currentXPos - _lastXPos) > 3 || moveflag) {
                        e.stopPropagation();
                        e.preventDefault();
                        moveflag = true;
                        var canWidth = parseInt(lineChart.css('width'));
                        var screenWidth = top.window.innerWidth;
                        var leftdis = parseInt(canWidth - screenWidth);
                        if (moveflag) {
                            var xdistance = _currentXPos - _lastXPos;
                            _lastXPos = _currentXPos;
                            totaldistance = totaldistance + xdistance;
                            if (totaldistance <= 0) {
                                
                                totaldistance = 0;
                            } 
                            else if (totaldistance > leftdis) {
                                totaldistance = leftdis;
                            }
                            lineChart.css({
                                '-webkit-transform': 'translateX(' + totaldistance + 'px)'
                            });
                            lineChart.css({
                                '-moz-transform': 'translateX(' + totaldistance + 'px)'
                            });
                            lineChart.css({
                                '-o-transform': 'translateX(' + totaldistance + 'px)'
                            });
                            lineChart.css({
                                '-ms-transform': 'translateX(' + totaldistance + 'px)'
                            });
                            lineChart.css({
                                'transform': 'translateX(' + totaldistance + 'px)'
                            });
                        }
                    }
                    //}
                
                
                });
                lineChart.bind(_touchend, function(e) {
                    moveflag = false;
                });
            }
            ;
            
            $scope.$on('lineconfig', function(event, data) {
                $scope.showLine(data);
            
            });
        
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'linechart';
            $scope.init();
        }
    }
}
]);
uiCore.directive('tcdetail', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_taocan_xq">' + '<abnormaltips ng-show="errorflag"></abnormaltips>' + '<div class="c60_fbar_taocan_detailxq" ng-show="details && details.length>0"><div class="c60_fbar_detailwrapscroll" simplescroll>' + '<linechart ng-show="chartflag" config="{{::compData.js.lineChart}}"></linechart>' + '<div class="c60_fbar_taocan_xq_title" ><div class="c60_fbar_taocan_xq_title_text" ng-bind="compData.js.taocan_xq_title.text"></div><a class="c60_fbar_link_overbuy" ng-bind="compData.js.link_overbuy.JS.text" ccid="c60_fbar_link_overbuy" ng-click="oblink()" ng-show="showLink(\'link_overbuy\')"></a></div><div  class="c60_fbar_packwrap"><div class="c60_fbar_tcdetailscroll"><div ng-repeat="detail in details">' + '<div class="c60_fbar_taocan_block"><div class="c60_fbar_taocan_tit" ng-show="compData.js.taocan_detail.showCategory" ng-bind="detail.category"></div>' + '<tcpack  ng-repeat="tp in detail.item"  tpitem="tp"></tcpack>' + '</div></div><div class="c60_fbar_packwrapkb"></div></div></div></div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils', 
        'Const', "$compile", "$timeout", 
        function($scope, $element, $attrs, coreService, coreUtils, Const, $compile, $timeout) {
            $scope.cid = $attrs.cid;
            $scope.compData = {
                'CSS': {},
                'JS': {
                    "lineChart": {
                        "CSS": {},
                        "JS": {
                            "chartText": {
                                "CSS": {},
                                "JS": {
                                    "titletext": {
                                        "isShow": true,
                                        "text": "数据只含主套餐和叠加包流量，不含闲时和定向流量"
                                    },
                                    "usedtext": {
                                        "text": "已用日均:"
                                    },
                                    "lefttext": {
                                        
                                        "text": "剩余日均:"
                                    }
                                }
                            },
                            "chartConfig": {
                                "showNumber": 7,
                                "spacing": 100,
                                "xStartSpacing": 20,
                                "lineColor": "#73d7bd",
                                "lineWidth": 2,
                                "isShowBgLine": true,
                                "bgLineWidth": 2,
                                "bgLineColor": "#F2F1F1",
                                "isShowXContent": true,
                                "XContentColor": "#000",
                                "XContentCurrentColor": "#73d7bd",
                                "XContentCurrentFont": "bold 0.8em/2em Arial",
                                "XContentFont": "0.8em/2em Arial",
                                "polyLineShow": true,
                                "polyPointShow": true,
                                "polyPointColor": "#73d7bd",
                                "PolygonShow": true,
                                "PolygonColor": "rgba(152, 151, 151, 0.2)",
                                "avgusedlineShow": true,
                                "avgusedlineStyle": "#ccc",
                                "avgusedlineWidth": 1,
                                "avgremainlineShow": true,
                                "avgremainlineStyle": "#73d7bd",
                                "avgremainlineWidth": 1,
                                "todayText": "今天"
                            }
                        
                        }
                    },
                    'titleStyle': {
                        'JS': {
                            'state0': {
                                'top': '12.5em',
                                'padding': '0 1em',
                                'height': '2em',
                                'border-top': '1px solid #ccc'
                            },
                            'state1': {
                                'top': '0em',
                                'padding': '0em 1em',
                                'height': '2em',
                                'background': '#fff',
                                'border-top': 'none',
                                'z-index': '2047483650'
                            }
                        
                        }
                    }
                }
            };
            $scope.eventMap = {};
            $scope.errorflag = false;
            $scope.chartflag = false;
            //var titleStyle = angular.element($element[0].querySelector('.c60_fbar_taocan_xq_title'));
            //var packwrapStyle = angular.element($element[0].querySelector('.c60_fbar_packwrap'));
            var packwrapkbStyle = angular.element($element[0].querySelector('.c60_fbar_packwrapkb'));
            var setting = {
                'K': 1024,
                'M': 1024 * 1024,
                'G': 1024 * 1024 * 1024,
                'T': 1024 * 1024 * 1024 * 1024
            };
            $scope.showLink = function(classname) {
                if ($scope.compData.js[classname]) {
                    return $scope.compData.js[classname].JS.isShow;
                }
            }
            $scope.oblink = function() {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.js.link_overbuy.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'link')
                    };
                    coreUtils.cdrService($scope.compData.js.link_overbuy.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($scope.cid, 'linkbuy');
            }
            ;
            $scope.transferK = function(value, keepfloat) {
                var n = keepfloat || 2;
                return coreUtils.trafficValueTransferfromKB(value, n);
            
            }
            ;
            $scope.getStates = function(value) {
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                var states;
                if (properties.JS != undefined) {
                    var states = properties.JS;
                    for (var i = 0; i < 3; i++) {
                        var state = properties.JS['state' + i];
                        if (value <= state.maxvalue && value >= state.minvalue) {
                            return state.config
                        }
                    }
                
                }
            
            }
            ;
            $scope.error = function(data) {
                $scope.errorflag = true;
                $scope.$broadcast('trafficquryerror', {
                    'errorcode': data.errorcode
                });
            }
            ;
            var children, 
            wrapperDiv, 
            minHeight = 0, 
            totalHeight = 0;
            var isOpera = /preto/i.test(navigator.userAgent) || /opera/i.test(navigator.userAgent);
            var tcscroll = angular.element($element[0].querySelector('.c60_fbar_detailwrapscroll'));
            var packwrap = angular.element($element[0].querySelector('.c60_fbar_detailwrap'));
            
            var touchMove = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var totalDistance = 0;
                var _lastYPos = 0;
                var _currentYPos = 0;
                var ydistance = 0;
                var flag = false;
                var elHeight = 0;
                var parentHeight = 0;
                var touchstartflag = false;
                var touchstart = function(e) {
                    var transform = tcscroll[0].style['webkitTransform'] || tcscroll[0].style['mozTransform'] || tcscroll[0].style['msTransform'] || tcscroll[0].style['msTransform'] || tcscroll[0].style['oTransform'];
                    if (transform) {
                        totalDistance = transform.split(',')[1] && parseInt(transform.split(',')[1]);
                    } else {
                        totalDistance = 0;
                    }
                    touchstartflag = true;
                    elHeight = parseInt(packwrap['totalheight'] || top.window.getComputedStyle(tcscroll[0], null )['height']) + 20;
                    parentHeight = parseInt(packwrap['parentheight'] || top.window.getComputedStyle(tcscroll[0].parentNode, null )['height']);
                    _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    if (elHeight > parentHeight) {
                        top.document.addEventListener(_touchmove, touch, false);
                        
                        top.document.addEventListener(_touchend, endTouch, false);
                    }
                
                }
                
                var touch = function(e) {
                    if (touchstartflag) {
                        _currentYPos = e.touches ? e.touches[0].pageY : e.pageY;
                        
                        ydistance = _currentYPos - _lastYPos;
                        
                        if (Math.abs(ydistance) > 3 || flag) {
                            flag = true;
                            
                            e.stopPropagation();
                            e.preventDefault();
                        }
                        _lastYPos = _currentYPos;
                        totalDistance += ydistance;
                        
                        if (totalDistance > 0) {
                            totalDistance = 0;
                        } else if (totalDistance + elHeight <= parentHeight) {
                            
                            totalDistance = parentHeight - elHeight;
                        
                        
                        }
                        if (isOpera) {
                            tcscroll.css('-o-transform', 'translate(0,' + totalDistance + 'px)');
                            tcscroll.css('transform', 'translate(0,' + totalDistance + 'px)');
                        } else {
                            tcscroll.css('-webkit-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            tcscroll.css('-moz-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            tcscroll.css('-o-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            tcscroll.css('-ms-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            tcscroll.css('transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        }
                    }
                }
                ;
                var endTouch = function(e) {
                    if (flag) {
                        e.stopPropagation();
                        e.preventDefault();
                        flag = false;
                    }
                    touchstartflag = false;
                    top.document.removeEventListener(_touchmove, touch, false);
                    top.document.removeEventListener(_touchend, endTouch, false);
                }
                ;
                $element.bind(_touchstart, touchstart);
            }
            ;
            
            //$timeout(touchMove, 0);
            $scope.update = function(data) {
                
                if (data && data.respparam && data.respparam.trafficusage) {
                    if (data.respparam.trafficusage.details) {
                        var linechartss = [];
                        if (data.respparam.trafficusage.avgremain && data.respparam.trafficusage.avgused && data.respparam.trafficusage.trafficchart) {
                            var avgremain = data.respparam.trafficusage.avgremain;
                            var avgused = data.respparam.trafficusage.avgused;
                            var trafficchart = data.respparam.trafficusage.trafficchart || [];
                            
                            if (trafficchart.length > 0) {
                                linechartss = {
                                    'avgremain': avgremain,
                                    'avgused': avgused,
                                    'trafficchart': trafficchart
                                };
                                //titleStyle.css($scope.compData.js.titleStyle.JS.state0);
                                //packwrapStyle.css($scope.compData.js.packwrapStyle.JS.state0);
                                $scope.chartflag = true;
                            } else if (trafficchart.length == 0) {
                                $scope.chartflag = false;
                            }
                            
                            //packwrapkbStyle.css($scope.compData.JS.packwrapkbStyle.CSS);
                        
                        
                        } else {
                            $scope.chartflag = false;
                        }
                        
                        $scope.errorflag = false;
                        var temp = data.respparam.trafficusage.details || [];
                        var categorydetail;
                        var items;
                        var item;
                        for (var i = 0, len = temp.length; i < len; i++) {
                            categorydetail = temp[i];
                            items = categorydetail.item || [];
                            for (var j = 0, ilen = items.length; j < ilen; j++) {
                                item = items[j];
                                var left = item.total - item.used;
                                item.usagepercent = item.used / item.total * 100;
                                item.leftpercent = left / item.total * 100;
                                var remaintmp = {
                                    v: item.total - item.used,
                                    u: item.unit
                                };
                                if (item.categoryType == 2 || !item.categoryType) {
                                    remaintmp = $scope.transferK(item.total - item.used, Number($scope.compData.js.floatnum || 2));
                                }
                                item.remain = remaintmp.v;
                                item.remainunit = remaintmp.u;
                                var config = null ;
                                if (item.usagepercent == 0) {
                                    config = $scope.getStates(item.leftpercent + 0.001);
                                } else {
                                    config = $scope.getStates(item.leftpercent)
                                }
                                if (config) {
                                    item.imagestyle = config.faceStyle;
                                    item.linestyle = coreUtils.extendDeep({}, config.lineStyle || {});
                                }
                                if (item.linestyle) {
                                    
                                    item.linestyle.width = item.usagepercent + '%';
                                }
                            
                            }
                        }
                        $scope.details = temp;
                        $scope.compData.js.lineChart.trraficdata = linechartss;
                        $scope.$broadcast('lineconfig', $scope.compData.js.lineChart);
                        if ($scope.details.length == 0) {
                            $scope.error({
                                errorcode: 'nodata'
                            });
                        
                        }
                    } else {
                        $scope.error({
                            errorcode: 'default'
                        })
                    }
                } else {
                    $scope.errorflag = true;
                    $scope.details = undefined;
                }
            }
            ;
            $scope.hide = function() {
                
                $element.css({
                    'top': '100%'
                });
            
            }
            ;
            $scope.show = function() {
                angular.element($element[0].querySelector('.c60_fbar_curcircle')).css({
                    '-webkit-transform': 'scale(1)',
                    'transform': 'scale(1)',
                    'margin-left': '-0.3em',
                    'margin-top': '-0.3em',
                }).removeClass("c60_fbar_curcircle");
                angular.element($element[0].querySelector('.c60_fbar_curcontent')).css({
                    'display': 'none'
                }).removeClass("c60_fbar_curcontent");
                $element.css({
                    'top': '0%'
                });
            }
            $scope.init = function(param) {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.js = properties.JS || {};
                $scope.$broadcast('abnormaltipsinit', $scope.compData.js.errortipsconfig);
                coreService.fireEvent($element.attr('cid'), 'init');
            }
            ;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            $scope.eventMap['update'] = $scope.update;
            $scope.eventMap['hide'] = $scope.hide;
            $scope.eventMap['show'] = $scope.show;
            $scope.eventMap['error'] = $scope.error;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'tcdetail';
            $scope.init();
        }
    
    }

}
]);
uiCore.directive('tcpack', [function() {
    
    return {
        restrict: 'EA',
        require: '^?pid',
        replace: true,
        scope: {
            tpitem: '=tpitem',
        },
        template: '<div><div class="c60_fbar_taocan_type c60_fbar_clearfloat"><div class="c60_fbar_taocan_type_info" ng-bind="tpitem.packagename"></div><div class="c60_fbar_taocan_surplus_info" ng-bind="\'剩余\'+tpitem.remain +tpitem.remainunit"></div></div><div class="c60_fbar_line"><div class="c60_fbar_line_in_green lineStyle" ng-style="tpitem.linestyle"><span class="c60_fbar_faceStyle faceStyle" ng-style="tpitem.imagestyle"></span></div></div></div>',
        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils', 'Const', 
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            
            $scope.init = function() {}
            ;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.init();
        }
    }

}
]);
uiCore.directive('popuppuretext', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_popuppuretext"><div class="c60_fbar_wchbg_pop_block"></div>' + '<div class="c60_fbar_wchpop_block">' + '<div class="c60_fbar_wchimg_txt_title"><span class="c60_fbar_wchyidong" ng-style="pureTextStyle(\'title\')" ng-bind="pureTextText(\'title\')"></span></div>' + '<div class="c60_fbar_wchimg_txt_info">' + '<div class="c60_fbar_wchpop_txt2"  ng-style="pureTextStyle(\'message\')" ng-bind-html="to_trusted(revData.message)"></div>' + '</div>' + '<div class="c60_fbar_wchimg_txt_btn clearfloat">' + '<div class="c60_fbar_wchleft_itbtn"  ccid="c60_fbar_popuppuretext_btnclose"  ng-bind="pureTextText(\'cancel\')" ng-style="pureTextStyle(\'cancel\')"></div>' + '<div class="c60_fbar_wchright_itbtn"  ccid="c60_fbar_popuppuretext_btn" ng-bind="pureTextText(\'detail\')" ng-style="pureTextStyle(\'detail\')"></div>' + '</div>' + '</div>' + '</div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", "$timeout", 'coreService', 'coreUtils', 'Const', '$sce', 
        function($scope, $element, $attrs, $timeout, coreService, coreUtils, Const, $sce) {
            $scope.cid = $attrs.cid;
            $scope.compData = {};
            $scope.eventMap = {};
            $scope.revData = {};
            $scope.to_trusted = function(text) {
                if (text != null  && text != undefined) {
                    text = text + '';
                    return $sce.trustAsHtml(text.replace(/\n/g, "<br/>"));
                } else {
                    return "";
                }
            }
            ;
            //获取后台数据
            $scope.updateData = function(param) {
                $element.css({
                    'display': 'block'
                });
                if (param != null  && param != undefined) {
                    if (param.message != null  && param.message != undefined) {
                        top.tlbs.messageid = param.messageid || "";
                        $scope.revData.message = param.message;
                    } else {
                        $scope.revData.message = '';
                    }
                    if (param.campaign != null  && param.campaign != undefined) {
                        var temp = param.campaign;
                        //modify by y00131156 at 20150820 begin
                        //如果campainurl为空，取默认配置
                        $scope.revData.url = temp.url || $scope.compData.JS.popupbtnconfig.JS.url;
                        $scope.revData.linkType = temp.linkType || $scope.compData.JS.popupbtnconfig.JS.linktype;
                        //modify by y00131156 at 20150820 end
                    } else {
                        $scope.revData.url = $scope.compData.JS.popupbtnconfig.JS.url;
                        $scope.revData.linkType = $scope.compData.JS.popupbtnconfig.JS.linktype;
                    }
                    //add by y00131156 at 20150820 begin
                    //如果没有url，则不显示去看详情按钮
                    if (!$scope.compData.JS.popupbtnconfig.JS.url) {
                        $element[0].querySelector(".c60_fbar_wchright_itbtn").style.display = 'none';
                        $element[0].querySelector(".c60_fbar_wchleft_itbtn").style.width = '100%';
                    }
                    //add by y00131156 at 20150820 end
                
                
                }
                var time = $scope.compData.JS.closetime;
                //add by h00278783 当植入时候弹框，需要自动隐藏，消息中心不需要自动隐藏------start-----
                if (top.tlbs.messageid != "") {
                    $timeout(function() {
                        if ($element.css('display') != 'none') {
                            top.tlbs.notificationCdrData = null ;
                        }
                        $scope.hide();
                    }, time);
                }
                //add by h00278783 当植入时候弹框，需要自动隐藏，消息中心不需要自动隐藏------end-----
            }
            ;
            $scope.hide = function() {
                $element.css({
                    'display': 'none'
                });
            }
            ;
            var _touchstart = Const.touchEvent.start
              , 
            container = angular.element($element[0].querySelector('.c60_fbar_wchleft_itbtn'))
              , 
            container2 = angular.element($element[0].querySelector('.c60_fbar_wchright_itbtn'));
            
            container.bind(_touchstart, function(e) {
                e.stopPropagation();
                e.preventDefault();
                _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                $element.css({
                    'display': 'none'
                });
                //add by h00278783 点击弹框，上报状态消息-----------start---
                if (top.tlbs.messageid != "") {
                    coreService.fireEvent($scope.cid, 'messagestatuschange', {
                        "messageid": top.tlbs.messageid
                    });
                }
                //add by h00278783 点击弹框，上报状态消息-----------end---
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.popupbtnconfig.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'closebtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.popupbtnconfig.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                top.tlbs.notificationCdrData = null ;
            });
            container2.bind(_touchstart, function(e) {
                e.stopPropagation();
                e.preventDefault();
                _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                $element.css({
                    'display': 'none'
                })
                //add by h00278783 点击弹框，上报状态消息-----------start---
                if (top.tlbs.messageid != "") {
                    coreService.fireEvent($scope.cid, 'messagestatuschange', {
                        "messageid": top.tlbs.messageid
                    });
                }
                //add by h00278783 点击弹框，上报状态消息-----------end---
                $scope.compData.JS.popupbtnconfig.JS.linktype = $scope.compData.JS.popupbtnconfig.JS.linktype + '';
                /* if($scope.compData.JS.popupbtnconfig.JS.linktype=='0')
                        coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click0');
                     else
                        window.open($scope.compData.JS.popupbtnconfig.JS.url);*/
                coreService.fireEvent($element.attr('cid'), 'gotoPage', {
                    "linktype": $scope.revData.linkType,
                    "url": $scope.revData.url
                });
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.popupbtnconfig.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'returnbtn'),
                        'iseComp': '1'
                    };
                    coreUtils.cdrService($scope.compData.JS.popupbtnconfig.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
            });
            
            $scope.pureTextStyle = function(type) {
                if (type != null  && type != undefined) {
                    switch (type) {
                    case 'title':
                        return $scope.compData.JS.popuptitleconfig.JS.stateconfig.state;
                        break;
                    case 'cancel':
                        return $scope.compData.JS.popupbtnconfig.JS.stateconfig.state0;
                        break;
                    case 'detail':
                        return $scope.compData.JS.popupbtnconfig.JS.stateconfig.state1;
                        break;
                    case 'message':
                        return $scope.compData.JS.popupcolorconfig.JS.stateconfig.state;
                        break;
                    default:
                        break;
                    }
                }
            }
            ;
            $scope.pureTextText = function(type) {
                if (type != null  && type != undefined) {
                    switch (type) {
                    case 'title':
                        return $scope.compData.JS.popuptitleconfig.JS.stateconfig.title;
                        break;
                    case 'cancel':
                        return $scope.compData.JS.popupbtnconfig.JS.stateconfig.title0;
                        break;
                    case 'detail':
                        return $scope.compData.JS.popupbtnconfig.JS.stateconfig.title1;
                        break;
                    default:
                        break;
                    }
                }
            }
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData = coreUtils.extendDeep($scope.compData, properties);
                coreService.fireEvent($element.attr('cid'), 'init');
            }
            ;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            $scope.eventMap['update'] = $scope.updateData;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'popuppuretext';
            $scope.init();
        }
    }
}
]);
uiCore.directive('iapplink', [
'coreService', 
'coreUtils', 
'$timeout', 
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: '<div id="mainholder" ccid="mainholder"><ul class="c60_fbar_app_list"><li id="innerholder" ccid="c60_fbar_gcapplink" ng-style="getInnerholderStyle(app.JS.id)" ng-repeat="app in arrays" ng-click="appLinkClick(app.JS.id)"><div id="c60_fbar_appwrap" class="c60_fbar_appwrap" ng-style="getappwrapstyle()"><div class="c60_fbar_appimgwrap" ng-style="getConfigStyle(app.JS.id)"><div class="c60_fbar_app_textwrap" style="width:53%;float:right"><h5 id="appname" ng-style="getStyles(\'appname\')">{{app.JS.appname.JS.text}}</h5><p id="appdesc"  ng-style="getStyles(\'appdesc\')">{{app.JS.appdesc.JS.text}}</p></div></div></div></li></ul></div>',
        scope: {
            param: '=param'
        },
        require: '^pid',
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        function($scope, $element, $attrs) {
            $scope.cid = $attrs.cid;
            $scope.classid = '.' + $scope.cid;
            $scope.eventMap = {};
            $scope.compData = {};
            $scope.extendComponentData = function(componetData) {
                coreUtils.extendDeep($scope.compData, componetData);
                $scope.arrays = [];
                if ($scope.compData && $scope.compData.JS) {
                    var len = $scope.compData.JS.text.JS.len;
                    for (var i = 0; i < len; i++) {
                        $scope.arrays.push($scope.compData.JS[($scope.compData.JS.text.JS["text" + i])]);
                    }
                }
            }
            ;
            $scope.getappwrapstyle = function() {
                if ($scope.arrays.length == 1) {
                    return {
                        'width': '53%',
                        'margin': '0 auto'
                    }
                } else {
                    return {
                        'width': '100%',
                        'margin': '0 auto'
                    }
                }
            }
            ;
            $scope.getInnerholderStyle = function(input) {
                if (input) {
                    if ($scope.compData.JS[input] && $scope.compData.JS[input].JS) {
                        return $scope.compData.JS[input].JS.innerholder.CSS;
                    }
                }
            }
            ;
            $scope.getStyles = function(input) {
                if (input) {
                    if ($scope.compData.JS[input] && $scope.compData.JS[input].CSS) {
                        return $scope.compData.JS[input].CSS;
                    }
                }
            }
            ;
            $scope.getConfigStyle = function(input) {
                if (input) {
                    if ($scope.compData.JS[input] && $scope.compData.JS[input].JS) {
                        /*if($scope.arrays.length == 1){
	                        		$scope.compData.JS[input].JS.iconholder.CSS['background-position']='18% 40%';
	                        	}*/
                        return $scope.compData.JS[input].JS.iconholder.CSS;
                    }
                }
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $scope.processConfig();
            }
            ;
            $scope.appLinkClick = function(name) {
                if (name) {
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS[name].JS.mainholder.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, name)
                        };
                        coreUtils.cdrService($scope.compData.JS[name].JS.mainholder.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    coreService.fireEvent($scope.cid, name + 'Click');
                }
            }
            ;
            $scope.processConfig = function() {
                if ($scope.compData && $scope.compData.JS) {
                    //mainholder
                    $element.css($scope.compData.CSS);
                    //innerholder
                    //angular.element($element[0].querySelector('[id="innerholder"]')).css($scope.compData.JS.innerholder.CSS);
                    //iconholder
                    //angular.element($element[0].querySelector('[id="iconholder"]')).css($scope.compData.JS.iconholder.applink.CSS);
                    //appname
                    angular.element($element[0].querySelector('[id="appname"]')).css($scope.compData.JS.appname.CSS);
                    //appdesc
                    angular.element($element[0].querySelector('[id="appdesc"]')).css($scope.compData.JS.appdesc.CSS);
                }
            }
            ;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });
            $scope.hide = function() {
                $scope.compData.CSS.display = 'none';
                $element.css($scope.compData.CSS);
            }
            ;
            $scope.show = function() {
                $scope.compData.CSS.display = 'block';
                $element.css($scope.compData.CSS);
            }
            ;
            $scope.eventMap['show'] = $scope.show;
            $scope.eventMap['hide'] = $scope.hide;
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'iapplink';
            scope.init();
        }
    };
}
]);
uiCore.directive('dashboard', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_cesu_con_wrapper"><div class="c60_fbar_cesu_con" simplescroll><ul class="c60_fbar_cs_toptitle c60_fbar_clearfloat"><li><div class="c60_fbar_cs_toptitle_uptxt" ng-bind=compData.js.networktitle></div><div class="c60_fbar_cs_toptitle_downtxt" ng-bind=compData.js.network></div></li><li><div class="c60_fbar_cs_toptitle_uptxt" ng-bind=compData.js.speedtitle></div><div class="c60_fbar_cs_toptitle_downtxt" ng-bind=compData.js.speed></div></li></ul>' 
        + '<div class="c60_fbar_cs_plate"><div class="c60_fbar_cs_plate_bg"><div class="c60_fbar_cs_plate_point"></div><div class="c60_fbar_cs_plate_circle1"></div><div class="c60_fbar_cs_plate_uptxt" ng-bind=compData.js.network></div><div class="c60_fbar_cs_plate_downtxt"><div class="c60_fbar_cs_plate_downtxt_num" ng-bind=compData.js.speedvalue></div><div class="c60_fbar_cs_plate_downtxt_unit" ng-bind=compData.js.speedunit></div></div></div></div><div class="c60_fbar_cs_btn" ><span ng-click=speedtest() class="c60_fbar_cs_btn_link" ccid="c60_fbar_cs_btn_link" ng-bind=compData.js.btntext>开始测速</span></div>' 
        + '<div class="c60_fbar_cs_result"><div class="c60_fbar_cs_result_tit" ng-bind=compData.js.result></div>' 
        + '<div class="c60_fbar_csr_imgtxt c60_fbar_clearfloat"><div class="c60_fbar_csr_imgtxt_left"><span class="c60_fbar_csr_imgtxt_left_img"><img class="c60_fbar_csr_img_feiji" ng-src="{{compData.js.resultimg}}" alt=""></span></div><div class="c60_fbar_csr_imgtxt_right">' 
        + '<div class="c60_fbar_csr_itr_uptxt"><span ng-bind=compData.js.desc></span><span class="c60_fbar_csr_itr_orangetxt" ng-bind=compData.js.traffic></span><span class="c60_fbar_csr_itr_orangetxt" ng-bind=compData.js.inter>/S<span></div>' 
        + '<div class="c60_fbar_csr_itr_downtxt"><span ng-bind=compData.js.detail1></span><span class="c60_fbar_csr_itr_orangetxt" ng-bind=compData.js.percent></span><span ng-bind=compData.js.detail2></span></div></div></div>' 
        + '<div class="c60_fbar_cs_result_progess"><div class="c60_fbar_csr_progess_line"><div class="c60_fbar_csr_plt_line2 c60_fbar_csr_bg_73d7bd"></div><div class="c60_fbar_csr_plt_con"><span class="c60_fbar_csr_plt_ico" ng-repeat="image in imagelist"><img class="c60_fbar_csr_pl_ico c60_fbar_csr_bg_dcdcdc" ng-style="{{image.style}}" ng-src="{{image.src}}" alt=""/></span></div></div></div></div>' 
        + '<div class="c60_fbar_cs_tips"><div class="c60_fbar_cs_tips_tit" ng-bind=compData.js.tipstitle></div><div class="c60_fbar_cs_tips_txt" ng-bind=compData.js.tips></div></div></div></div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 
        'coreUtils', 
        'Const', function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.eventMap = {};
            $scope.compData = {};
            $scope.testing = false;
            var lineelement = angular.element($element[0].querySelector('.c60_fbar_csr_plt_line2'));
            var clickbtn = angular.element($element[0].querySelector('.c60_fbar_cs_btn_link'));
            var resultimage = angular.element($element[0].querySelector('.c60_fbar_csr_imgtxt_left_img'));
            var result = angular.element($element[0].querySelector('.c60_fbar_cs_result'));
            var tips = angular.element($element[0].querySelector('.c60_fbar_cs_tips'));
            var point = angular.element($element[0].querySelector('.c60_fbar_cs_plate_point'));
            var insertAnimateRule = function() {
                try {
                    var sheets = top.document.styleSheets;
                    var lastSheet = null ;
                    var len = 0;
                    for (var i = sheets.length - 1; i >= 0; i--) {
                        if (sheets[i].cssRules && sheets[i].title != 'toolbar') {
                            lastSheet = sheets[i];
                            len = sheets[i].cssRules.length;
                            break;
                        }
                    }
                    var csstext;
                    try {
                        csstext = "@-webkit-keyframes speedpoint_animation {0% {-webkit-transform: rotate(35deg);} 25% { -webkit-transform: rotate(135deg);} 50% {-webkit-transform: rotate(235deg);} 75% {-webkit-transform: rotate(135deg);} 100% {-webkit-transform: rotate(35deg);}}";
                        lastSheet.insertRule(csstext, len);
                    } catch (e) {
                        try {
                            csstext = "@keyframes speedpoint_animation {0% {transform: rotate(35deg);} 25% {transform: rotate(135deg);} 50% {transform: rotate(235deg);} 75% {transform: rotate(135deg);} 100% {transform: rotate(35deg);}}";
                            lastSheet.insertRule(csstext, len);
                        } catch (e) {
                            try {
                                csstext = "@-moz-keyframes speedpoint_animation {0% {-moz-transform: rotate(35deg);} 25% { -moz-transform: rotate(135deg);} 50% {-moz-transform: rotate(235deg);} 75% {-moz-transform: rotate(135deg);} 100% {-moz-transform: rotate(35deg);}}";
                                lastSheet.insertRule(csstext, len);
                                //lastSheet.insertRule("@-moz-keyframes c60_fbar_buoy_jump_animation {0% {-moz-transform: translate(-500px, -300px);} 40% { -moz-transform: translate(-500px, -0px);} 60% {-moz-transform: translate(-500px, -80px);} 70% {-moz-transform: translate(-500px, -0px);} 80% {-moz-transform: translate(-500px, -30px);} 90% {-moz-transform: translate(-500px, 0px);} 100% {-moz-transform: translate(-500px, 0px);}}", len);
                            } catch (e) {
                                try {
                                    csstext = "@-o-keyframes speedpoint_animation {0% {-o-transform: rotate(35deg);} 25% { -o-transform: rotate(135deg);} 50% {-o-transform: rotate(235deg);} 75% {-o-transform: rotate(135deg);} 100% {-o-transform: rotate(35deg);}}";
                                    lastSheet.insertRule(csstext, len);
                                } catch (e) {
                                    throw e
                                }
                            }
                        }
                    }
                } catch (e) {}
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.js = properties.JS || {};
                $scope.compData.js.btntext = $scope.compData.js.beforetesttext;
                $element.css($scope.compData.css);
                insertAnimateRule();
            }
            ;
            
            $scope.update = function(data) {
                $scope.compData.js = coreUtils.extendDeep($scope.compData.js, data.respparam);
            }
            ;
            
            $scope.getState = function(value) {
                var states = $scope.compData.js.speedconfig;
                var ret = {};
                var percent;
                var maxvalue;
                var minvalue;
                for (var i = 0; i < 10; i++) {
                    var state = states['state' + i];
                    if (state) {
                        if (state.maxvalue && state.minvalue) {
                            maxvalue = Number(state.maxvalue);
                            minvalue = Number(state.minvalue);
                            basepercent = Number(states['state' + (i - 1)].percent);
                            if (value <= maxvalue && value > minvalue) {
                                percent = basepercent + (state.percent - basepercent) * (value - minvalue) / (maxvalue - minvalue);
                                ret = {
                                    state: state,
                                    index: i,
                                    percent: percent
                                }
                                break;
                            }
                        
                        } else if (state.maxvalue) {
                            maxvalue = Number(state.maxvalue);
                            if (value <= maxvalue) {
                                percent = state.percent * value / maxvalue;
                                ret = {
                                    state: state,
                                    index: i,
                                    percent: percent
                                }
                                break;
                            }
                        } else if (state.minvalue) {
                            if (value > Number(state.minvalue)) {
                                ret = {
                                    state: state,
                                    index: i,
                                    percent: state.percent
                                }
                                break;
                            }
                        
                        }
                    
                    } else {
                        break;
                    }
                }
                return ret;
            }
            ;
            
            $scope.getImagelist = function(index) {
                var states = $scope.compData.js.speedconfig;
                var imagelist = [];
                var image;
                for (var i = 0; i < 10; i++) {
                    var state = states['state' + i];
                    
                    if (state) {
                        image = {};
                        image.src = state.imagesrc.replace(/'/g, '');
                        if (i <= index) {
                            image.style = $scope.compData.js.levelcss || {
                                'background-color': '#73d7bd'
                            }
                        } else {
                            image.style = $scope.compData.js.nolevelcss || {
                                'background-color': '#dcdcdc'
                            }
                        }
                        imagelist.push(image);
                    } else {
                        break;
                    }
                }
                return imagelist;
            }
            
            $scope.speedtest = function() {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.js.c60_fbar_cs_btn_link.JS.cdrConfig)) {
                    $scope.compData.js['cdrData'] = {};
                    $scope.compData.js.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs['cid'], 'btn')
                    };
                    coreUtils.cdrService($scope.compData.js.c60_fbar_cs_btn_link.JS.cdrConfig.uitracingcdr, $scope.compData.js.cdrData);
                }
                if ($scope.testing) {
                    return;
                }
                ;
                $scope.testing = true;
                $scope.compData.js.btntext = $scope.compData.js.testingtext;
                clickbtn.css($scope.compData.js.testingcss || {
                    'background-color': '#dcdcdc'
                });
                point.attr('class', 'c60_fbar_cs_plate_point c60_fbar_speedpoint_animation')
                var startTime;
                var endTime;
                var cost;
                var speed;
                var unit = 'KB';
                var inter = '/S';
                var src = $scope.compData.js.fileurl;
                var size = $scope.compData.js.filesize;
                var stateobj;
                var state;
                var index;
                var loadImage = new Image();
                var timeout = null ;
                var formate = function(num, count) {
                    var paddingcount = count || 2;
                    var value = 10;
                    var padding = [];
                    for (var i = 0; i < paddingcount - 1; i++) {
                        padding.push('0');
                    }
                    for (var i = 1; i < paddingcount; i++) {
                        if (num < value) {
                            return padding.join('') + num;
                        }
                        value = value * 10;
                        padding.pop();
                    }
                    return num;
                }
                ;
                
                var getTime = function(d) {
                    var tmp = [];
                    tmp.push(d.getFullYear());
                    tmp.push(formate(d.getMonth() + 1));
                    tmp.push(formate(d.getDate()));
                    tmp.push(formate(d.getHours()));
                    tmp.push(formate(d.getMinutes()));
                    tmp.push(formate(d.getSeconds()));
                    tmp.push(formate(d.getMilliseconds(), 3));
                    return tmp.join('');
                }
                ;
                var getDeg = function(speed) {
                    
                    var level = [0, 64, 128, 256, 512, 1024, 2048, 5120, 10240];
                    var mindeg = 15;
                    var degreerang = 30;
                    var index = 0;
                    var degree = 0;
                    
                    for (; index < level.length; index++) {
                        if (speed < level[index]) {
                            break
                        }
                    }
                    if (index == level.length) {
                        
                        index = level.length - 1;
                    }
                    
                    var maxvalue = level[index];
                    var minvalue = level[index - 1];
                    degree = 30 * (index - 1) + 30 * (speed - minvalue) / (maxvalue - minvalue);
                    if (degree > 240) {
                        degree = 245;
                    }
                    return degree;
                
                }
                ;
                var processError = function() {
                    point.attr('class', 'c60_fbar_cs_plate_point')
                    cleartimeout();
                    $scope.testing = false;
                    $scope.imagelist = $scope.getImagelist(-1);
                    $scope.compData.js = coreUtils.extendDeep($scope.compData.js, {
                        'speed': '--',
                        'speedvalue': '0.00',
                        'speedunit': 'KB/S',
                        'desc': $scope.compData.js.faildesc || '抱歉，测速失败超时',
                        'traffic': '',
                        'inter': '',
                        'detail1': $scope.compData.js.faildetail1 || '请重新测速或点击左上角按钮，返回首页看看',
                        'detail2': '',
                        'resultimg': $scope.compData.js.failimagesrc.replace(/'/g, ''),
                        'percent': ''
                    });
                    $scope.testing = false;
                    $scope.compData.js.btntext = $scope.compData.js.aftertesttext;
                    clickbtn.css($scope.compData.js.testedcss || {
                        'background-color': '#73d7bd'
                    });
                    lineelement.css({
                        'width': '0%'
                    });
                    resultimage.css({
                        'background-color': '#dcdcdc'
                    });
                    $scope.$apply();
                    result.css({
                        'display': 'block'
                    });
                    tips.css({
                        'display': 'none'
                    });
                    coreService.fireEvent($element.attr('cid'), 'updatefail');
                
                }
                ;
                loadImage.onload = function() {
                    try {
                        cleartimeout();
                        endTime = new Date();
                        cost = endTime.getTime() - startTime.getTime();
                        var tmpspeed = (size * 1000) / (cost * 1024);
                        var speeddata = coreUtils.trafficValueTransfer(tmpspeed, Number($scope.compData.js.floatnum || 2));
                        speed = speeddata.v;
                        unit = speeddata.u;
                        stateobj = $scope.getState(tmpspeed);
                        state = stateobj.state;
                        index = stateobj.index;
                        $scope.imagelist = $scope.getImagelist(index);
                        $scope.compData.js = coreUtils.extendDeep($scope.compData.js, {
                            'speed': speed + unit + inter,
                            'speedvalue': speed,
                            'speedunit': unit + inter,
                            'desc': state.desc || '平均网速：',
                            'traffic': speed + unit,
                            'inter': inter,
                            'detail1': state.detail1 || '当前网速击败了全国',
                            'detail2': state.detail2 || '的用户',
                            'resultimg': state.imagesrc.replace(/'/g, ''),
                            'percent': coreUtils.formatNum(stateobj.percent, Number($scope.compData.js.floatnum || 2)) + '%'
                        });
                        
                        lineelement.css({
                            'width': Math.min(Number(state.linewidthpercent), 100) + '%'
                        });
                        resultimage.css({
                            'background-color': '#73d7bd'
                        });
                        $scope.testing = false;
                        $scope.compData.js.btntext = $scope.compData.js.aftertesttext;
                        clickbtn.css($scope.compData.js.testedcss || {
                            'background-color': '#73d7bd'
                        });
                        $scope.$apply();
                        result.css({
                            'display': 'block'
                        });
                        tips.css({
                            'display': 'none'
                        });
                        var deg = 'rotate(' + getDeg(tmpspeed) + 'deg)';
                        point.css({
                            '-webkit-transform': deg,
                            'transform': deg,
                            '-moz-transform': deg,
                            '-o-transform': deg
                        });
                        point.attr('class', 'c60_fbar_cs_plate_point');
                        coreService.fireEvent($element.attr('cid'), 'updatesucess', {
                            "testStartTime": getTime(startTime),
                            "testEndTime": getTime(endTime),
                            "testSpeed": tmpspeed,
                            "range": stateobj.percent,
                            "text": $scope.compData.js.speed
                        });
                    } catch (e) {
                        
                        processError();
                    }
                }
                ;
                var cleartimeout = function() {
                    if (timeout) {
                        loadImage.onload = null ;
                        loadImage.onerror = null ;
                        clearTimeout(timeout);
                        timeout = null ;
                    }
                
                }
                ;
                
                loadImage.onerror = processError
                timeout = setTimeout(processError, Number($scope.compData.js.timeout || 5) * 1000);
                startTime = new Date();
                loadImage.src = src + '?' + new Date().getTime();
            }
            ;
            $scope.eventMap['update'] = $scope.update;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
        
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'dashboard';
            $scope.init();
        }
    }
}
]);
uiCore.directive('pid', function() {
    return {
        restrict: 'E',
        replace: false,
        template: '<div></div>',
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        function($scope, $element, $attrs) {
            this.pageID = $attrs['pid'];
        }
        ]
    };
});
uiCore.directive('iappiconholder', [
'coreService', 
'coreUtils', 
'$timeout', 
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        //template : '<div class="C60-apps"><a class="c60_fbar_apps_box C-topleft" ng-click="appclick(\'app1\')"><div class="C60-taocan-apps"><span class="c60_fbar_app_ico1"></span><h2 class="c60_fbar_app_title">套餐商店</h2></div></a><a class="c60_fbar_apps_box C-topright" ng-click="appclick(\'app2\')"><div class="C60-taocan-apps"><span class="c60_fbar_app_ico2"></span><h2 class="c60_fbar_app_title">赚流量</h2></div></a><a class="c60_fbar_apps_box C-bottomleft" ng-click="appclick(\'app3\')"><div class="C60-taocan-apps"><span class="c60_fbar_app_ico3"></span><h2 class="c60_fbar_app_title">最新活动</h2></div></a><a class="c60_fbar_apps_box C-bottomright" ng-click="appclick(\'app4\')"><div class="C60-taocan-apps"><span class="c60_fbar_app_ico4"></span><h2 class="c60_fbar_app_title">我的</h2></div></a></div>',
        template: '<div class="c60_fbar_appsholder">' 
        + '<div class="c60_fbar_drag" ccid="c60_fbar_drag" ng-click="drag();$event.preventDefault();$event.stopPropagation();"><b ng-class="{\'c60_fbar_bup\':compData.JS.currentStyle==\'dropdown\'}"></b></div>' 
        + '<div class="c60_fbar_apps"><a ng-repeat="app in compData.JS.appconfig"  appindex={{$index}} class="c60_fbar_apps_box" ccid="c60_fbar_apps_box"><div  appindex={{$index}} class="c60_fbar_app"><div  appindex={{$index}}  ng-show="compData.JS.remind.JS.pageid==app.pageid" ng-style="compData.JS.remind.CSS"></div><div  appindex={{$index}} class="c60_fbar_app_icon" ng-style="{\'background-image\':\'url(\'+app.defaultimage+\')\'}"></div><h2   appindex={{$index}} class="c60_fbar_app_title" ng-bind="app.name"></h2></div></a><div class="c60_fbar_app_hline"></div><div class="c60_fbar_app_vline"></div></div>'
        // + '<div class="c60_fbar_apps_borderr"></div><div class="c60_fbar_apps_borderb"></div>'
         
        + '</div>',
        scope: {
            param: '=param'
        },
        require: '^pid',
        controller: ["$scope", "$element", "$attrs", 'coreService', 
        'coreUtils', 
        'Const', 
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            //ng-click="appclick(app.appid,app.pageid,app.linktype,app.url,app.content);$event.stopPropagation();"
            $scope.cid = $attrs.cid;
            $scope.classid = '.' + $scope.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {},
                'JS': {}
            };
            $scope.compData.JS.currentStyle = 'dropdown';
            $scope.compData.JS.appconfig = top.tlbs.appholder || [];
            $scope.extendComponentData = function(componetData) {
                coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $scope.dragMove();
            }
            ;
            $scope.appLinkClick = function() {
                coreService.fireEvent($scope.cid, 'applinkClick');
            }
            ;
            
            $scope.dropup = function() {
                $scope.compData.JS.currentStyle = 'dropdown';
                $element.css($scope.compData.JS.uptyle || {
                    'top': '0em'
                });
            }
            ;
            
            $scope.dropdownaauto = function() {
                
                if (!useraction) {
                    $scope.dropdown();
                }
            }
            $scope.dropdown = function() {
                
                //							 var htmls = top.document.getElementsByTagName('html')[0];
                //							 var bodys = top.document.getElementsByTagName('body')[0];
                //							 htmls.style.overflow='hidden';
                //							 bodys.style.overflow='hidden';
                
                $scope.compData.JS.currentStyle = 'dropup';
                $element.css($scope.compData.JS.downstyle || {
                    'top': '8em'
                });
            }
            ;
            
            var useraction = false;
            $scope.drag = function() {
                tracingcdr(coreUtils.createCdrid($scope.pageID, '', 'dragbtn'));
                useraction = true;
                if ($scope.compData.JS.currentStyle == 'dropup') {
                    $scope.dropup();
                } else {
                    $scope.dropdown();
                }
            
            }
            var tracingcdr = function(ccid) {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_drag.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': ccid,
                        'iseComp': '1'
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_drag.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
            }
            $scope.dragMove = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var _lastYPos = 0;
                var _lastXPos = 0;
                var _currentYPos = 0;
                var _currentXPos = 0;
                var moveflag = false;
                var touchstartflag = false;
                $element.bind(_touchstart, function(e) {
                    moveflag = false;
                    touchstartflag = true;
                    _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                
                });
                $element.bind(_touchmove, function(e) {
                    
                    _currentYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    _currentXPos = e.touches ? e.touches[0].pageX : e.pageX;
                    if (Math.abs(_currentYPos - _lastYPos) > 3 || moveflag) {
                        e.stopPropagation();
                        e.preventDefault();
                        moveflag = true;
                    }
                
                });
                $element.bind(_touchend, function(e) {
                    try {
                        if (moveflag == true) {
                            var xdistance = _currentXPos - _lastXPos;
                            var ydistance = _currentYPos - _lastYPos;
                            if (ydistance < 0) {
                                //向上
                                useraction = true;
                                $scope.compData.JS.currentStyle = 'dropdown';
                                $element.css($scope.compData.JS.uptyle || {
                                    'top': '0em'
                                });
                                tracingcdr(coreUtils.createCdrid($scope.pageID, '', 'dragbtn'));
                            } else if (ydistance > 0) {
                                //向下
                                useraction = true;
                                $scope.compData.JS.currentStyle = 'dropup';
                                $element.css($scope.compData.JS.downstyle || {
                                    'top': '8em'
                                });
                                tracingcdr(coreUtils.createCdrid($scope.pageID, '', 'dragbtn'));
                            }
                        } else if (touchstartflag) {
                            var target = e.target;
                            e.preventDefault();
                            e.stopPropagation();
                            if (target.getAttribute('appindex')) {
                                var index = Number(target.getAttribute('appindex'));
                                var app = $scope.compData.JS.appconfig[index];
                                $scope.appclick(app.appid, app.pageid, app.linktype, app.url, app.content);
                            
                            }
                        
                        }
                    } 
                    finally {
                        moveflag = false;
                        touchstartflag = false;
                    }
                });
            
            }
            ;
            
            /*$scope.appclick = function (appid) {
						coreService.fireEvent($scope.cid, appid + 'click');
						};*/
            $scope.appclick = function(appid, pageid, linktype, linkurl, relatedcontent) {
                
                if (relatedcontent) {
                    coreService.fireEvent($element.attr('cid'), 'click', {
                        content: relatedcontent
                    });
                }
                tracingcdr(appid);
                if (linktype == '1') {
                    window.open(linkurl);
                } else {
                    //coreService.fireEvent($element.attr('cid'), 'click' + pageid + 'btn');
                    coreService.fireEvent($element.attr('cid'), 'clickappbtn', {
                        "pageid": pageid,
                        "reload": '1'
                    });
                }
            
            }
            ;
            $scope.gotopage = function(param) {
                coreService.fireEvent($element.attr('cid'), 'clickappbtn', {
                    "pageid": url
                });
            }
            ;
            
            $scope.topage = function(param) {
                var type = Number(param.linktype);
                var url = param.url;
                var title = param.title || '链接';
                if (url) {
                    switch (type) {
                    case 0:
                        window.open(url);
                        break;
                    case 1:
                        coreService.fireEvent($element.attr('cid'), 'embedpage', {
                            "url": url,
                            'stitle': title
                        });
                        break;
                    case 2:
                        param.pageid = url;
                        coreService.fireEvent($element.attr('cid'), 'clickappbtn', param);
                        break;
                    case 9:
                        break;
                    default:
                        window.open(url);
                    }
                    if (url != $scope.pageID && param.notify) {
                        coreService.fireEvent($element.attr('cid'), "initsummary");
                    }
                }
            }
            ;
            
            $scope.notifytopage = function(param) {
                var p = param;
                p.notify = true;
                $scope.topage(param);
            }
            ;
            $scope.eventMap['notifytopage'] = $scope.notifytopage;
            $scope.eventMap['topage'] = $scope.topage;
            $scope.eventMap['dropdown'] = $scope.dropdownaauto;
            $scope.eventMap['dropup'] = $scope.dropup;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
        
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'iappiconholder';
            scope.init();
        }
    };
}
]);
uiCore.directive('imagelist', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_imagelist">' + '<div class="c60_fbar_imagelist_wrapper" ng-style="wrapperstyle">' + '<div ng-style="image.imagestyle" ng-click="weblink($index,image);$event.stopPropagation()" ng-repeat="image in imagearray" class="c60_fbar_imagelist_image_container" ccid="c60_fbar_link_click">' + '</div></div>' + '<div class="c60_fbar_circle_dotted_con">' + '<span class="c60_fbar_circle_dotted" ng-repeat="image in imagearray" ng-style="getStyle($index)"></span>' + '</div>' + '</div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 
        'coreUtils', 
        'Const', 
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                CSS: {
                    "display": 'block'
                },
                JS: {}
            };
            
            $scope.updateData = function(param) {
                var temp = param.respparam.adlocation || [];
                $scope.wrapperstyle = {
                    'width': temp.length * 100 + '%'
                };
                $scope.totallength = temp.length;
                for (var i = 0; i < temp.length; i++) {
                    temp[i].imagestyle = {
                        'background-image': 'url(' + temp[i].imageurl + ')',
                        'width': (100 / temp.length) + '%'
                    };
                }
                $scope.imagearray = temp;
            }
            ;
            $scope.weblink = function(index, image) {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_link_click.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': image.CONTENTID
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_link_click.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($element.attr('cid'), 'gotoPage', {
                    linktype: image.linktype,
                    url: image.weblink
                });
            }
            ;
            $scope.getStyle = function(index) {
                if ($scope.totallength > 1) {
                    if (index == $scope.currentIndex) {
                        return {
                            'background-color': '#FFF'
                        }
                    } else {
                        return {
                            'background-color': ''
                        }
                    }
                } else {
                    return {
                        'display': 'none'
                    }
                }
            }
            ;
            
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.js = properties.JS || {};
                $scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
                $element.css($scope.compData.css || {});
                var param = {
                    'adlocation': $scope.compData.JS.adposid
                }
                coreService.fireEvent($element.attr('cid'), 'init', param);
                $scope.drag();
            }
            ;
            
            $scope.currentIndex = 0;
            $scope.drag = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var _lastYPos = 0;
                var _lastXPos = 0;
                var _currentYPos = 0;
                var _currentXPos = 0;
                var imagecontainer = angular.element($element[0].querySelector('.c60_fbar_imagelist_wrapper'));
                imagecontainer.bind(_touchstart, function(e) {
                    _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                
                });
                imagecontainer.bind(_touchmove, function(e) {
                    _currentYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    _currentXPos = e.touches ? e.touches[0].pageX : e.pageX;
                    if (Math.abs(_currentXPos - _lastXPos) > 3 || moveflag) {
                        e.stopPropagation();
                        e.preventDefault();
                        moveflag = true;
                    }
                });
                imagecontainer.bind(_touchend, function(e) {
                    var xdistance = _currentXPos - _lastXPos;
                    var ydistance = _currentYPos - _lastYPos;
                    if (xdistance < 0) {
                        if ($scope.currentIndex < $scope.totallength - 1) {
                            $scope.currentIndex = $scope.currentIndex + 1;
                        }
                    } else {
                        if ($scope.currentIndex > 0) {
                            $scope.currentIndex = $scope.currentIndex - 1;
                        }
                    }
                    $scope.$apply();
                    $scope.slide($scope.currentIndex, $scope.totallength);
                });
            }
            ;
            
            
            $scope.slide = function(index, length) {
                var imagecontainer = angular.element($element[0].querySelector('.c60_fbar_imagelist_wrapper'));
                var percent = index * 100 / length;
                var cssvalue = 'translate(-' + percent + '%,0px)';
                imagecontainer.css({
                    '-webkit-transform': cssvalue,
                    '-moz-transform': cssvalue,
                    '-ms-transform': cssvalue,
                    '-o-transform': cssvalue
                });
            }
            ;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            $scope.eventMap['update'] = $scope.updateData;
            $scope.hide = function() {
                $scope.compData.CSS.display = 'none';
                $element.css($scope.compData.CSS);
            }
            ;
            $scope.show = function() {
                $scope.compData.CSS.display = 'block';
                $element.css($scope.compData.CSS);
            }
            ;
            $scope.eventMap['show'] = $scope.show;
            $scope.eventMap['hide'] = $scope.hide;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'imagelist';
            $scope.init();
        }
    }
}
]);
uiCore.directive('minecoin', function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        template: //'<div>aaa</div>', 
        '<div ccid="c60_fbar_minecoin" ng-style="compData.JS.c60_fbar_minecoin.CSS">' 
        
        + '   <div class="c60_fbar_bg_black_pop" ng-style="getbg_black_popStyle()">' 
        + '    <div class="c60_fbar_tips_txt_coin" ng-bind="compData.JS.bg_black_pop.JS.desc"></div>' 
        + '   </div>' 
        
        + '   <div class="c60_fbar_my_coin_con" ><div simplescroll>' 
        + '    <div class="c60_fbar_my_coin_top c60_fbar_clearfloat">' 
        + '     <div class="c60_fbar_coin_img_txt">' 
        + '      <span class="c60_fbar_myjinbi"></span>' 
        + '      <div class="c60_fbar_money_txt">' 
        + '       <p class="c60_fbar_money_txt_p"><span class="c60_fbar_coin_type" ng-bind="compData.JS.c60_fbar_coin_type.JS.text"></span><span ng-bind="revData.respparam.total"></span></p>' 
        + '       <p class="c60_fbar_money_txt_p"><span class="c60_fbar_coin_detail"  ng-bind="compData.JS.c60_fbar_coin_detail.JS.text"></span><span ng-bind="revData.respparam.totaldata"></span></p>' 
        + '      </div>' 
        + '     </div>' 
        + '     <div class="c60_fbar_exchange_btn">' 
        + '      <a class="c60_fbar_exchange_btn_link" ccid="c60_fbar_exchange_btn_link" ng-style="getexchange_btnStyle()" ng-click="click(\'c60_fbar_exchange_btn_link\')"  ng-bind="compData.JS.c60_fbar_exchange_btn_link.JS.text"></a>' 
        + '     </div>' 
        + '    </div>' 
        
        + '    <div class="c60_fbar_exchange_flux_con" ng-show="isexchange_flux_conShow()">' 
        + '     <span class="c60_fbar_arrow_top"></span>' 
        + '     <p class="c60_fbar_tit"><span ng-bind="compData.JS.c60_fbar_tit1.JS.text"></span><span class="c60_fbar_tit_txt_gray" ng-bind="compData.JS.tit_txt_gray.JS.text" ng-show="compData.JS.tit_txt_gray.JS.isShow"></span></p>' 
        + '     <div class="c60_fbar_type c60_fbar_clearfloat">' 
        + '      <span class="c60_fbar_type_exchange" ccid="c60_fbar_type_exchange" ng-bind="compData.JS.c60_fbar_type_exchange.JS.text"></span>' 
        + '      <ul>' 
        + '       <li ng-repeat="item in coinTypes" ng-click="selectedClick($index)" ng-style="isSelected($index)" ng-bind="item.productname"></li>' 
        + '      </ul>' 
        + '     </div>' 
        + '     <div class="c60_fbar_mobile c60_fbar_clearfloat">' 
        + '      <span class="c60_fbar_type_exchange2" ng-bind="compData.JS.c60_fbar_mobile.JS.text"></span><span ng-bind="phoneFilter(revData.respparam.msisdn)"></span>' 
        + '      <span class="c60_fbar_mobile_txt_gray" ng-bind="compData.JS.c60_fbar_mobile_txt_gray.JS.text"></span>' 
        + '     </div>' 
        + '     <div class="c60_fbar_exchange_flux_btn" ccid="c60_fbar_exchange_flux_btn">' 
        + '      <a class="c60_fbar_exchange_flux_btn_link" ng-style="getexchange_flux_btn_linkStyle()" ng-click="click(\'c60_fbar_exchange_flux_btn\');" ng-bind="compData.JS.c60_fbar_exchange_flux_btn_link.JS.text"></a>' 
        + '     </div>' 
        + '    </div>' 
        
        + '    <ul class="c60_fbar_mycoin_tab c60_fbar_clearfloat" ng-style="getmycoin_tabStyle()">' 
        + '     <li ng-style="getStyleUp(0)" ccid="c60_fbar_mycoin_tab0" ng-click="handClick(0)"  ng-bind="compData.JS.c60_fbar_mycoin_tab0.JS.text"></li>' 
        + '     <li ng-style="getStyleUp(1)" ccid="c60_fbar_mycoin_tab1" ng-click="handClick(1)"  ng-bind="compData.JS.c60_fbar_mycoin_tab1.JS.text"></li>' 
        + '    </ul>'
        //					
         
        + '  <div class="c60_fbar_mycoin_date c60_fbar_money_detail0" ng-style="getmoney_detail0Style()" ng-show="isShow(0)"> ' 
        + '   <ul class="c60_fbar_mycoin_date_title c60_fbar_clearfloat"> ' 
        + '    <li ng-repeat="item in compData.JS.detail.money_detail0.head"><span ng-bind="item"></span></li> ' 
        + '   </ul> ' 
        + '   <div class="c60_fbar_mycoin_date_detail"> ' 
        + '    <ul class="c60_fbar_mycoin_date_detail_ul c60_fbar_clearfloat" ng-repeat="item in revData.respparam.detail"> ' 
        + '      <li><p ng-bind="dateFilter(item.time,true)"></p><p ng-bind="dateFilter(item.time,false)"></p></li> ' 
        + '      <li ng-bind="item.sourceName"></li> ' 
        + '      <li ng-bind="item.count"></li> ' 
        + '    </ul> ' 
        + '    <div class="c60_fbar_c60_toolbar_loading_more0" ccid="c60_fbar_c60_toolbar_loading_more0" ng-bind="compData.JS.c60_fbar_c60_toolbar_loading_more.JS.text" ng-style="getc60_fbar_c60_toolbar_loading_more0Style();" ng-click="click(\'c60_toolbar_loading_more\');$event.stopPropagation();">' 
        + '    </div>' 
        + '   </div> ' 
        + '   </div> ' 
        
        + '  <div class="c60_fbar_mycoin_date c60_fbar_money_detail1" ng-style="getmoney_detail1Style()" ng-show="isShow(1)"> ' 
        + '   <ul class="c60_fbar_mycoin_date_title c60_fbar_clearfloat"> ' 
        + '    <li ng-repeat="item in compData.JS.detail.money_detail1.head"><span ng-bind="item"></span></li> ' 
        + '   </ul> ' 
        + '   <div class="c60_fbar_mycoin_date_detail"> ' 
        + '    <ul class="c60_fbar_mycoin_date_detail_ul c60_fbar_clearfloat" ng-repeat="item in revData.respparam.history" > ' 
        + '      <li><p ng-bind="dateFilter(item.time,true)"></p><p ng-bind="dateFilter(item.time,false)"></p></li> ' 
        + '     <li><span ng-bind="item.data"></span><span ng-bind="item.unit"></span></li> ' 
        + '     <li><span ng-bind="item.cost"></span></li> ' 
        + '    </ul> ' 
        + '    <div class="c60_fbar_c60_toolbar_loading_more1" ccid="c60_fbar_c60_toolbar_loading_more1" ng-bind="compData.JS.c60_fbar_c60_toolbar_loading_more.JS.text" ng-style="getc60_fbar_c60_toolbar_loading_more1Style();" ng-click="click(\'c60_toolbar_loading_more\');$event.stopPropagation();">' 
        + '    </div>' 
        
        + '</div>' 
        + '   </div> ' 
        + '  </div>' 
        + '</div>',
        scope: {},
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        'coreService', 
        'coreUtils', 
        'Const', 
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            //页面元素配置项
            $scope.compData = {
                "CSS": {},
                "JS": {}
            };
            $scope.getexchange_flux_btn_linkStyle = function() {
                if ($scope.compData.JS.exchange_flux_btn_link.JS.stateconfig.state == 0) {
                    return $scope.compData.JS.exchange_flux_btn_link.JS.stateconfig.state0;
                } else {
                    return $scope.compData.JS.exchange_flux_btn_link.JS.stateconfig.state1;
                }
            }
            ;
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
                /*$timeout(function() {
	                         $scope.$apply();
	                     });*/
            }
            ;
            var stringToArray = function() {
                //金币明细标题内容
                var len = Number($scope.compData.JS.detail.money_detail0.len);
                $scope.compData.JS.detail.money_detail0.head = [];
                for (var i = 0; i < len; i++) {
                    $scope.compData.JS.detail.money_detail0.head.push($scope.compData.JS.detail.money_detail0["head" + i]);
                }
                //兑换历史标题内容
                len = Number($scope.compData.JS.detail.money_detail1.len);
                $scope.compData.JS.detail.money_detail1.head = [];
                for (var i = 0; i < len; i++) {
                    $scope.compData.JS.detail.money_detail1.head.push($scope.compData.JS.detail.money_detail1["head" + i]);
                }
                //初始化数据
            }
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid) || {});
                $element.css($scope.compData.css || {});
                //将后台字符串转换为数组
                stringToArray();
            }
            ;
            $scope.phoneFilter = function(input) {
                if (input == undefined)
                    return '';
                var ret = input.substring(0, 3) + "****" + input.substring(7);
                return ret;
            }
            ;
            $scope.dateFilter = function(input, flag) {
                if (input == undefined)
                    return '';
                if (flag) {
                    var ret = input.substring(0, 4) + "-" + input.substring(4, 6) 
                    + "-" + input.substring(6, 8)
                
                } else {
                    var ret = input.substring(8, 10) 
                    + ":" + input.substring(10, 12) + ":" + input.substring(12, 14);
                }
                return ret;
            }
            ;
            $scope.getbg_black_popStyle = function() {
                if ($scope.compData.JS.bg_black_pop.JS.stateconfig.state == 1) {
                    return $scope.compData.JS.bg_black_pop.JS.stateconfig.state1;
                } else {
                    return $scope.compData.JS.bg_black_pop.JS.stateconfig.state0;
                }
            }
            ;
            $scope.getexchange_btnStyle = function() {
                if ($scope.compData.JS.exchange_btn.JS.stateconfig.state == 0) {
                    return $scope.compData.JS.exchange_btn.JS.stateconfig.state0;
                } else {
                    return $scope.compData.JS.exchange_btn.JS.stateconfig.state1;
                }
            }
            ;
            $scope.isexchange_flux_conShow = function() {
                return $scope.compData.JS.exchange_flux_con.JS.stateconfig.state == 1 ? true : false;
            }
            ;
            
            var myClick = {
                c60_fbar_exchange_btn_link: function(param) {
                    //跟踪话单
                    //								if($scope.compData.JS.c60_fbar_exchange_btn_link.JS.uitracingflag == true){
                    //									  coreUtils.uiTracingCdr('',"c60_fbar_exchange_btn_link",$scope.pageID);//如果taskid没有的话，置为空''
                    //								}
                    //								
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_exchange_btn_link.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'exclink')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_exchange_btn_link.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    if ($scope.compData.JS.exchange_btn.JS.stateconfig.state == 0) {
                        //从接口查找金币种类
                        $scope.getCoinTypes();
                        $scope.compData.JS.exchange_btn.JS.stateconfig.state = 1;
                        $scope.compData.JS.exchange_flux_con.JS.stateconfig.state = 1;
                    
                    } else {
                        $scope.compData.JS.exchange_btn.JS.stateconfig.state = 0;
                        $scope.compData.JS.exchange_flux_con.JS.stateconfig.state = 0;
                    }
                },
                c60_fbar_exchange_flux_btn: function(param) {
                    if ($scope.compData.JS.exchange_flux_btn_link.JS.stateconfig.state == 1) {
                        return false;
                    }
                    $scope.compData.JS.exchange_flux_btn_link.JS.stateconfig.state = 1;
                    //跟踪话单
                    //								if($scope.compData.JS.c60_fbar_exchange_flux_btn.JS.uitracingflag == true){
                    //									  coreUtils.uiTracingCdr('',"c60_fbar_exchange_flux_btn",$scope.pageID);//如果taskid没有的话，置为空''
                    //								}
                    
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.exchange_flux_btn_link.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'excflux')
                        };
                        coreUtils.cdrService($scope.compData.JS.exchange_flux_btn_link.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    //获取到金币种类
                    var productid = $scope.coinTypes[$scope.compData.JS.exchange_flux_con.JS.stateconfig.index].productid;
                    //向后台发送请求
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'sendExchange', 
                    {
                        'dataID': productid,
                        'count': '1'
                    });
                },
                c60_toolbar_loading_more: function(param) {
                    //跟踪话单
                    //								if($scope.compData.JS.c60_toolbar_loading_more.JS.uitracingflag == true){
                    //									  coreUtils.uiTracingCdr('',"c60_toolbar_loading_more"+$scope.compData.JS.detail.index,$scope.pageID);//如果taskid没有的话，置为空''
                    //								}
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_toolbar_loading_more.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'more') + $scope.compData.JS.detail.index
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_toolbar_loading_more.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    if ($scope.compData.JS.detail.index == 0) {
                        $scope.compData.JS.detail.money_detail0.number = Number($scope.compData.JS.detail.money_detail0.number) + Number($scope.compData.JS.detail.step);
                        coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'init', {
                            'startNote': 1,
                            'noteNo': $scope.compData.JS.detail.money_detail0.number
                        });
                    } else {
                        $scope.compData.JS.detail.money_detail1.number = Number($scope.compData.JS.detail.money_detail1.number) + Number($scope.compData.JS.detail.step);
                        coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'init', {
                            'startNote': 1,
                            'noteNo': $scope.compData.JS.detail.money_detail1.number
                        });
                    }
                }
            };
            //处理所有点击事件
            $scope.click = function(classname, param) {
                if (classname == undefined || classname == null ) {
                    return false;
                }
                switch (classname) 
                {
                case 'c60_fbar_exchange_btn_link':
                    myClick.c60_fbar_exchange_btn_link(param);
                    break;
                case 'c60_fbar_exchange_flux_btn':
                    myClick.c60_fbar_exchange_flux_btn(param);
                    break;
                case 'c60_toolbar_loading_more':
                    myClick.c60_toolbar_loading_more(param);
                    break;
                default:
                
                }
            }
            ;
            $scope.selectedClick = function(index) {
                //跟踪话单
                //						if($scope.compData.JS.c60_fbar_type_exchange.JS.uitracingflag == true){
                //							  coreUtils.uiTracingCdr('',"c60_fbar_type_exchange",$scope.pageID);//如果taskid没有的话，置为空''
                //						}
                //						
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_type_exchange.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'typexc')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_type_exchange.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                $scope.compData.JS.exchange_flux_con.JS.stateconfig.index = index;
            }
            ;
            $scope.isSelected = function(index) {
                if ($scope.compData.JS.exchange_flux_con.JS.stateconfig.index == index) {
                    return $scope.compData.JS.exchange_flux_con.JS.stateconfig.state1;
                } else {
                    return $scope.compData.JS.exchange_flux_con.JS.stateconfig.state0;
                }
            }
            ;
            $scope.bg_black_popShow = function(msg) {
                $scope.compData.JS.bg_black_pop.JS.stateconfig.state = 1;
                angular.element($element[0].querySelector('.c60_fbar_bg_black_pop')).css({
                    'display': 'block'
                });
                setTimeout(function() {
                    //将弹框隐藏 
                    $scope.compData.JS.bg_black_pop.JS.stateconfig.state = 0;
                    angular.element($element[0].querySelector('.c60_fbar_bg_black_pop')).css({
                        'display': 'none'
                    });
                }, $scope.compData.JS.bg_black_pop.JS.stateconfig.time * 1000);
                $scope.compData.JS.bg_black_pop.JS.desc = msg;
            }
            ;
            //兑换成功后显示信息
            $scope.getExchangeRes = function(inputData) {
                if (inputData && inputData.respparam) {
                    var retd = inputData.respparam;
                    //兑换成功
                    if (retd.status == "success") {
                        var descId = $scope.compData.JS.exchange_flux_con.JS.respons["defaultSuccessCode"];
                        var descRev = "";
                        var invoice = '';
                        //当desc为空时候
                        if (inputData.respparam.desc == undefined || inputData.respparam.desc == "" || inputData.respparam.desc == null ) {
                            descRev = $scope.compData.JS.exchange_flux_con.JS.respons[descId];
                        } else {
                            //当desc没有对应的文字描述时候
                            var descTxt = $scope.compData.JS.exchange_flux_con.JS.respons[inputData.respparam.desc];
                            if (descTxt == undefined || descTxt == null  || descTxt == "") {
                                descRev = $scope.compData.JS.exchange_flux_con.JS.respons[descId] || "";
                            } else {
                                descRev = descTxt || "";
                            }
                        }
                        if (inputData.respparam.invoice) {
                            invoice = inputData.respparam.invoice;
                        }
                        var outputDesc = descRev 
                        + $scope.coinTypes[$scope.compData.JS.exchange_flux_con.JS.stateconfig.index].productname 
                        + $scope.compData.JS.tips1 + invoice + $scope.compData.JS.tips2;
                        $scope.bg_black_popShow(outputDesc);
                        //兑换成功之后需要刷新数据
                        coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'init', {
                            'startNote': '1',
                            'noteNo': '10'
                        });
                        var param = {
                            "respparam": {
                                "vaIncreased": (0 - Number(invoice))
                            }
                        };
                        coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'updateCoinsTotal', param);
                    } else {
                        //兑换失败
                        var descId = $scope.compData.JS.exchange_flux_con.JS.respons["defaultErrorCode"];
                        var descRev = "";
                        var invoice = '';
                        //当desc为空时候
                        if (inputData.respparam.desc == undefined || inputData.respparam.desc == "" || inputData.respparam.desc == null ) {
                            descRev = $scope.compData.JS.exchange_flux_con.JS.respons[descId];
                        } else {
                            //当desc没有对应的文字描述时候
                            var descTxt = $scope.compData.JS.exchange_flux_con.JS.respons[inputData.respparam.desc];
                            if (descTxt == undefined || descTxt == null  || descTxt == "") {
                                descRev = inputData.respparam.desc;
                            } else {
                                descRev = descTxt;
                            }
                        }
                        if (inputData.respparam.invoice) {
                            invoice = inputData.respparam.invoice
                        }
                        var outputDesc = descRev;
                        $scope.bg_black_popShow(outputDesc);
                    }
                    $scope.compData.JS.exchange_flux_btn_link.JS.stateconfig.state = 0;
                }
            }
            ;
            $scope.eventMap['getExchangeRes'] = $scope.getExchangeRes;
            $scope.getCoinTypes = function() {
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'getTypes');
            }
            ;
            //接收来自后台的数据
            $scope.getTypesFunc = function(inputData) {
                if (inputData.respparam.datas) {
                    if (inputData.respparam.datas.length > 0) {
                        //$scope.coinTypes  = inputData.respparam.datas;
                        var product = inputData.respparam.datas;
                        $scope.coinTypes = [];
                        var len = product.length;
                        if ($scope.compData.JS.maxtype == '' || $scope.compData.JS.maxtype == undefined || $scope.compData.JS.maxtype == null ) {
                            $scope.compData.JS.maxtype = 4;
                        }
                        var finallen = len > $scope.compData.JS.maxtype ? $scope.compData.JS.maxtype : len;
                        for (var i = 0; i < len; i++) {
                            if (i < finallen) {
                                $scope.coinTypes[i] = product[i] || {};
                            }
                        }
                        $scope.compData.JS.exchange_flux_btn_link.JS.stateconfig.state = 0;
                    } else {
                        $scope.compData.JS.exchange_flux_btn_link.JS.stateconfig.state = 1;
                    }
                }
            
            }
            ;
            $scope.eventMap['getTypesFunc'] = $scope.getTypesFunc;
            $scope.getStyleUp = function(index) {
                var flag = false;
                if ($scope.compData.JS.detail.index == index) {
                    return $scope.compData.JS.detail.state1;
                } else {
                    return $scope.compData.JS.detail.state0;
                }
            }
            ;
            $scope.isShow = function(index) {
                if ($scope.compData.JS.detail.index == index) {
                    return true;
                } else {
                    return false;
                }
            }
            ;
            $scope.getc60_fbar_c60_toolbar_loading_more0Style = function() {
                if (Number($scope.compData.JS.detail.money_detail0.number) <= Number($scope.compData.JS.detail.money_detail0.totalget)) {
                    angular.element($element[0].querySelector('.c60_fbar_c60_toolbar_loading_more0')).css({
                        'display': 'block'
                    });
                } else {
                    angular.element($element[0].querySelector('.c60_fbar_c60_toolbar_loading_more0')).css({
                        'display': 'none'
                    });
                }
            }
            $scope.getc60_fbar_c60_toolbar_loading_more1Style = function() {
                if (Number($scope.compData.JS.detail.money_detail1.number) <= Number($scope.compData.JS.detail.money_detail1.totalget)) {
                    angular.element($element[0].querySelector('.c60_fbar_c60_toolbar_loading_more1')).css({
                        'display': 'block'
                    });
                } else {
                    angular.element($element[0].querySelector('.c60_fbar_c60_toolbar_loading_more1')).css({
                        'display': 'none'
                    });
                }
            }
            $scope.handClick = function(index) {
                //跟踪话单
                //						if($scope.compData.JS.c60_fbar_mycoin_tab.JS.uitracingflag == true){
                //							  coreUtils.uiTracingCdr('',"c60_fbar_mycoin_tab"+index,$scope.pageID);//如果taskid没有的话，置为空''
                //						}
                //						
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_mycoin_tab.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'tab') + index
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_mycoin_tab.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                $scope.compData.JS.detail.index = index;
            }
            ;
            //接收来自后台的数据
            $scope.getDataFromRet = function(inputData) {
                if (inputData && inputData.respparam) {
                    $scope.revData = inputData;
                }
                //更新明细和历史
                if (inputData.respparam.detail) {
                    $scope.compData.JS.detail.money_detail0.totalget = inputData.respparam.detail.length;
                }
                if (inputData.respparam.history) {
                    $scope.compData.JS.detail.money_detail1.totalget = inputData.respparam.history.length;
                }
            }
            ;
            $scope.eventMap['getDataFromRet'] = $scope.getDataFromRet;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });
        
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = "cminecoin";
            $scope.init();
        }
    };
});
uiCore.directive('iimagenotification', [
'coreService', 
'coreUtils', 
'$timeout', 
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: '<div id="mainholder"><div id="notificationholder"><img class="imageholder" ccid="C60_fbar_imageholder" ng-src="{{campaign.image}}" ng-style="compData.JS.imageholder.CSS" ng-click="notificationClick()" /><div id="closeholder" class="C60_fbar_closeholder" ccid="C60_fbar_closeholder"  ng-bind="compData.JS.closeholder.JS.text"></div><div class="checkBtn" ng-show="compData.JS.checkBtn.JS.isShow" ccid="C60_fbar_checkBtn" ng-click="btnClick()" ng-style="compData.JS.checkBtn.CSS" ng-bind="compData.JS.checkBtn.JS.text"></div></div></div>',
        scope: {
            param: '=param'
        },
        require: '^pid',
        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils', 
        'Const', "$compile", '$interval', '$timeout', 
        function($scope, $element, $attrs, coreService, coreUtils, Const, $compile, $interval, $timeout) {
            $scope.cid = $attrs.cid;
            $scope.classid = '.' + $scope.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {},
                'JS': {
                
                }
            };
            $scope.campaign = {};
            $scope.taskId = "";
            $scope.btnClick = function() {
                //add by h00278783 点击弹框，上报状态消息-----------start---
                if (top.tlbs.messageid != "") {
                    coreService.fireEvent($scope.cid, 'messagestatuschange', {
                        "messageid": top.tlbs.messageid
                    });
                }
                //add by h00278783 点击弹框，上报状态消息-----------end---
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.checkBtn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': 'C60_fbar_checkBtn'
                    };
                    coreUtils.cdrService($scope.compData.JS.checkBtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                var campaign = $scope.campaign;
                window.open(campaign.url);
            
            }
            ;
            $scope.extendComponentData = function(componetData) {
                coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.upDate = function(param) {}
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.js = properties.JS || {};
                $scope.processConfig();
            
            }
            ;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });
            $scope.processConfig = function() {
                //mainholder
                $element.css($scope.compData.CSS);
                //notificationholder
                angular.element($element[0].querySelector('[id="notificationholder"]')).css($scope.compData.JS.notificationholder.CSS);
                //imageholder
                angular.element($element[0].querySelector('[id="imageholder"]')).css($scope.compData.JS.imageholder.CSS);
                //closeholder
                angular.element($element[0].querySelector('[id="closeholder"]')).css($scope.compData.JS.closeholder.CSS);
            }
            ;
            
            $scope.showNotification = function(eventObj) {
                if (null  != eventObj && null  != eventObj.campaign.image) {
                    $scope.taskId = eventObj.taskId;
                    $scope.campaign = eventObj.campaign;
                    top.tlbs.messageid = eventObj.messageid || "";
                    preloadimages($scope.campaign.image).done(function() {
                        $element.css('display', 'block');
                        // angular.element($element[0].querySelector('.imageholder')).css({'background':"url('" + eventObj.campaign.image + "') left top no-repeat",'background-size':'100% 100%'});
                        var time = $scope.compData.js.closeTime;
                        //add by h00278783 当植入时候弹框，需要自动隐藏，消息中心不需要自动隐藏------start-----
                        if (top.tlbs.messageid != "") {
                            $timeout(function() {
                                if ($element.css('display') != 'none') {
                                    top.tlbs.notificationCdrData = null ;
                                }
                                $scope.closeNotification();
                            }, time);
                        }
                        //add by h00278783 当植入时候弹框，需要自动隐藏，消息中心不需要自动隐藏------end-----                           
                    
                    
                    });
                }
            }
            ;
            $scope.eventMap['showNotification'] = $scope.showNotification;
            $scope.eventMap['update'] = $scope.upDate;
            var _touchstart = Const.touchEvent.start
              , 
            container = angular.element($element[0].querySelector('.C60_fbar_closeholder'));
            container.bind(_touchstart, function(e) {
                e.stopPropagation();
                e.preventDefault();
                _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                $element.css({
                    'display': 'none'
                });
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.closeholder.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'closebtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.closeholder.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                top.tlbs.notificationCdrData = null ;
            });
            $scope.closeNotification = function() {
                $element.css('display', 'none');
            }
            ;
            
            $scope.notificationClick = function() {
                //coreService.fireEvent($scope.cid, 'notificationClick');
                //var campaign = $scope.campaign;
                //add by h00278783 点击弹框，上报状态消息-----------start---
                if (top.tlbs.messageid != "") {
                    coreService.fireEvent($scope.cid, 'messagestatuschange', {
                        "messageid": top.tlbs.messageid
                    });
                }
                //add by h00278783 点击弹框，上报状态消息-----------end---
                
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.imageholder.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'taskId': $scope.taskId,
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'imagebtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.imageholder.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                //window.open($scope.campaign.url);
                $element.css('display', 'none');
                if ($scope.campaign.linkType == undefined)
                    $scope.campaign.linkType = '0';
                coreService.fireEvent($element.attr('cid'), 'gotoPage', {
                    "linktype": $scope.campaign.linkType,
                    "url": $scope.campaign.url
                });
            }
            ;
            
            var ThumbnailImageArray = [];
            
            function preloadimages(arr) {
                var loadedimages = 0;
                var postaction = function() {}
                ;
                var arr = (typeof arr != "object") ? [arr] : arr;
                
                function imageloadpost() {
                    loadedimages++;
                    if (loadedimages == arr.length) {
                        postaction(ThumbnailImageArray);
                        //call postaction and pass in newimages array as parameter
                    }
                }
                ;
                
                for (var i = 0; i < arr.length; i++) {
                    ThumbnailImageArray[i] = new Image();
                    ThumbnailImageArray[i].src = arr[i];
                    ThumbnailImageArray[i].onload = function() {
                        imageloadpost();
                    }
                    ;
                    ThumbnailImageArray[i].onerror = function() {
                        imageloadpost();
                    }
                    ;
                }
                return {
                    done: function(f) {
                        postaction = f || postaction
                    }
                };
            }
            ;
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'iimagenotification';
            scope.init();
        }
    };
}
]);
uiCore.directive('repackholder', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        scope: {},
        template: '<div class=" c60_fbar_taocan_tj"><div class="c60_fbar_sytips"><h1 class="c60_fbar_sytips_title"><span ng-bind-html="to_trusted(desc[0])"></span><b></b></h1><p class="c60_fbar_sytips_desc" ng-bind-html="to_trusted(desc[1])"></p></div>' + 
        '<div class="c60_fbar_package"><div style="overflow:hidden">' + 
        '<pack ppid="pageID" taskid="taskId" ecid=cid recommandations=recommandations stateconfig="{{::compData.JS.config}}" config="{{::compData.js}}"  ng-repeat="pack in recommandations" pack-color="pack.color" packid="pack.id" pack-name="pack.categoryname" pack-price="pack.price" pack-total="pack.value"></pack>' + 
        '</div>' + 
        '<div class="c60_fbar_package_more" ng-show="compData.js.moreflag.isShow"><a class="c60_fbar_package_more_a" ng-click="toPackageStore()" ng-bind="compData.JS.config.recommandationtitle"></a></div>' + 
        '</div></div>',
        controller: [
        "$scope", 
        "$element", 
        "$attrs", 
        'coreService', 
        'coreUtils', 
        'Const', 
        "$compile", 
        "$sce", 
        function($scope, $element, $attrs, coreService, coreUtils, 
        Const, $compile, $sce) {
            $scope.cid = $attrs.cid;
            $scope.compData = {
                'JS': {
                    'config': {
                        'packages': {
                            'margin-left': '0%',
                            'float': 'none',
                            'margin': '0 auto'
                        },
                    }
                },
                'CSS': {}
            
            };
            $scope.eventMap = {};
            $scope.recommandations = [];
            $scope.taskId = null ;
            $scope.to_trusted = function(text) {
                if (text != null  && text != undefined) {
                    text = text + '';
                    return $sce.trustAsHtml(text.replace(/\n/g, "<br/>"));
                } else {
                    return "";
                }
            }
            ;
            $scope.getDatavalue = function(comboProperies) {
                if (comboProperies) {
                    for (var j = 0; j < comboProperies.length; j++) {
                        if (comboProperies[j]) {
                            if (comboProperies[j].key == "2") {
                                return comboProperies[j].value
                            }
                        }
                    }
                }
                return '';
            }
            ;
            $scope.show = function() {
                if ($scope.recommandations.length > 0) {
                    setTimeout(function() {
                        coreService.fireEvent($element.attr('cid'), 'initfinished');
                    }, Number($scope.compData.js.showdelay || 1000));
                }
            }
            ;
            
            $scope.update = function(data) {
                if (data) {
                    var desc = data.respparam.desc || "";
                    $scope.taskId = data.respparam.taskId;
                    var descArray = desc.split('|');
                    $scope.desc = descArray;
                    var recommandations = data.respparam.recommandations;
                    //此变量用于判断是否有套餐数
                    $scope.recommandationlen = recommandations.length;
                    var temp = [];
                    var list = [];
                    var revData = $scope.revData;
                    var isnull = function(obj) {
                        for (var n in obj) {
                            return true
                        }
                        return false;
                    }
                    ;
                    var listTest = []
                      , 
                    m = 0;
                    for (var i = 0; i < recommandations.length; i++) {
                        list = recommandations[i].list;
                        for (var li = 0; li < list.length; li++) {
                            var value = $scope.getDatavalue(list[li].comboProperies);
                            listTest[m] = {
                                'categoryname': recommandations[i].categoryname || '',
                                'value': value,
                                'price': list[li].price || '',
                                'id': list[li].id
                            };
                            m++;
                        }
                    }
                    var len = Math.min($scope.compData.js.packnum, listTest.length);
                    for (var r = 0; r < len; r++) {
                        
                        $scope.recommandations[r] = listTest[r];
                        $scope.recommandations[r].color = $scope.compData.js.packcolor['color' + r] || ' ';
                    }
                    //coreService.fireEvent($element.attr('cid'), 'initfinished');
                    var cdrConfig = {
                        'cdrType': 'uinotiftracingcdr',
                        'enable': true,
                        'storeData': false
                    };
                    var cdrData = {
                        'taskId': $scope.taskId,
                        'componentId': 'c60_fbar_p_package',
                        'pageId': $scope.pageID,
                        'message': '',
                        'sresptime': '',
                        'functionid': ''
                    };
                    coreUtils.cdrService(cdrConfig, cdrData);
                }
                if ($scope.recommandationlen > 0) {
                    if ($scope.compData.js.packagestore) {
                        $scope.compData.JS.config.recommandationtitle = $scope.compData.js.packagestore.title1;
                    }
                
                } else {
                    if ($scope.compData.js.packagestore) {
                        $scope.compData.JS.config.recommandationtitle = $scope.compData.js.packagestore.title2;
                    }
                }
                $scope.show();
            }
            ;
            $scope.toPackageStore = function() {
                coreService.fireEvent($element.attr('cid'), 'topackagestore');
            }
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.js = properties.JS || {};
                if ($scope.compData.js.packagestore) {
                    $scope.compData.JS.config.recommandationtitle = $scope.compData.js.packagestore.title2;
                }
                coreService.fireEvent($element.attr('cid'), 'init');
            }
            ;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, 
            cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            $scope.eventMap['update'] = $scope.update;
            $scope.eventMap['show'] = $scope.show;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'repackholder';
            $scope.init();
        }
    
    }

}
]);

uiCore.directive('pack', function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^?pid',
        scope: {
            name: '=packName',
            price: '=packPrice',
            total: '=packTotal',
            color: '=packColor',
            pkgid: '=packid',
            ecid: '=ecid',
            recommandations: '=recommandations',
            pageID: '=ppid',
            taskId: '=taskid'
        },
        template: '<div class="c60_fbar_packs" ><div class="c60_fbar_p_package"><div ccid="c60_fbar_p_package" ng-click="tostore();$event.preventDefault();$event.stopPropagation();"><div class="c60_fbar_package_title " ccid="c60_fbar_package_title" >' + '<div class="c60_fbar_packagetip"><p class="c60_fbar_jybpackagetipp" style="background:{{color}}" ng-bind="name"></p></div>' + '<div class="c60_fbar_jybpackageprice" ><div class="c60_fbar_pricebgcolor" style="background:{{color}}"></div><p class="c60_fbar_packagepricep" ng-bind="price"></p></div></div>' + '<div class="c60_fbar_packagecont" ng-bind="total"></div></div>' + 
        '</div></div>',
        controller: [
        "$scope", 
        "$element", 
        "$attrs", 
        'coreService', 
        'coreUtils', 
        'Const', 
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            //var $element = angular.element($element[0].querySelector('.c60_fbar_packs'));
            $scope.changeStyle = function() {
                
                var states = coreUtils.String2JSON($attrs['stateconfig']);
                var list = $scope.recommandations;
                var len = list.length;
                if (len == 1) {
                    $element.css(states.packages);
                }
            }
            ;
            $scope.$watch($attrs, function() {
                $scope.changeStyle();
            });
            
            $scope.tostore = function() {
                var config = coreUtils.String2JSON($attrs['config']);
                if (coreUtils.cdrUtils.canWriteUITracingCDR(config.p_package.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': $scope.pkgid,
                        'taskId': $scope.taskId
                    };
                    coreUtils.cdrService(config.p_package.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                top.tlbs.ordersrc = $scope.pageID;
                coreService.fireEvent($scope.ecid, 'tostore', {
                    'pkgid': $scope.pkgid,
                    'taskid': $scope.taskId
                });
            }
            $scope.init = function() {}
            ;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.compData = {
                'JS': {},
                'CSS': {}
            };
        }
    }
});
uiCore.directive('goldcoinlayout', [
'coreService', 
'coreUtils', 
'$timeout', 
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: '<div id="mainholder">' + '<div class="c60_fbar_goldcoin_result_con" ng-style="gettaocan_result_conStyle()"><div class="c60_fbar_succ_img_con"><img class="c60_fbar_succ_img"  ng-src="{{taocanresulturl()}}"/></div><div class="c60_fbar_tips_txt" ng-bind="taocanresulttips()"></div><div class="c60_fbar_result_btn" ccid="c60_fbar_link_btn"><a class="c60_fbar_link_btn" ng-bind="taocanresulttxt()" ng-click="returnclick()"></a></div></div>' + '<div id="circleholder"><div id="circle"><div id="circletxt1">{{::compData.JS.circletxt1.JS.text}}</div><div id="circletxt2">{{compData.JS.circletxt2.JS.text}}</div><div id="circletxt3" ccid="circletxt3" ng-click="circletxt3Click();$event.stopPropagation();">{{::compData.JS.circletxt3.JS.text}}</div></div></div><div id="coinbtn1" ccid="coinbtn1" ng-click="coinbtn1Click()"><div id="coinbtn1text">{{::compData.JS.coinbtn1text.JS.text}}</div></div><div id="coinbtn2" ccid="coinbtn2" ng-click="coinbtn2Click()"><div id="coinbtn2text">{{::compData.JS.coinbtn2text.JS.text}}</div></div><div id="tipholder"><div id="tiptext"></div></div><div id="mainholder1" ng-transclude class="money-list-animate" ng-class="compData.JS.moneyListDisplay?\'showmlist\':\'hidemlist\'"></div></div>',
        scope: {
            param: '=param'
        },
        require: '^pid',
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        '$interval', 
        function($scope, $element, $attrs, $interval) {
            $scope.cid = $attrs.cid;
            $scope.classid = '.' + $scope.cid;
            $scope.startUp = true;
            $scope.runningCount = 0;
            $scope.eventMap = {};
            var intervalObject;
            $scope.compData = {
                'CSS': {
                    'width': '100%',
                    'height': '100%',
                    'background': '#ff7d55',
                    'text-align': 'center',
                    'position': 'relative',
                    'overflow-y': 'hidden',
                    'z-index': '2047483647'
                },
                'JS': {
                    'cdr': true,
                    'buttonEnable': false,
                    'moneyListDisplay': false,
                    'goldcoinAnimationTime': 2000,
                    'goldcoinToAnimate': 100,
                    'circleholder': {
                        'CSS': {
                            'width': '8.9em',
                            'height': '8.9em',
                            'text-align': 'center',
                            'background': '#ff7d55',
                            'border': '0.2em solid #fff',
                            '-moz-border-radius': '8.9em',
                            '-webkit-border-radius': '8.9em',
                            'border-radius': '8.9em',
                            'margin': '0 auto',
                            'margin-top': '4em'
                        },
                        'JS': {}
                    },
                    'circle': {
                        'CSS': {
                            'width': '8em',
                            'height': '8em',
                            'text-align': 'center',
                            'line-height': '8em',
                            'background': '#fff',
                            '-moz-border-radius': '8em',
                            '-webkit-border-radius': '8em',
                            'border-radius': '8em',
                            'position': 'relative'
                        },
                        'JS': {}
                    },
                    'circletxt1': {
                        'CSS': {
                            'width': '100%',
                            'color': '#222',
                            'line-height': 'normal',
                            'font-size': '0.875em',
                            'text-align': 'center',
                            'position': 'absolute',
                            'left': '0',
                            'top': '1.8em'
                        },
                        'JS': {
                            'text': '我的金币'
                        }
                    },
                    'circletxt2': {
                        'CSS': {
                            'color': '#222',
                            'font-size': '2em',
                            'line-height': '4em',
                            'text-align': 'center',
                            'padding-top': '0.2em'
                        },
                        'JS': {
                            'text': '0',
                            'newtext': '',
                            'datamapping': 'respparam.total'
                        }
                    },
                    'circletxt3': {
                        'CSS': {
                            'width': '100%',
                            'color': '#73d7bd',
                            'line-height': 'normal',
                            'font-size': '0.875em',
                            'text-align': 'center',
                            'position': 'absolute',
                            'left': '0',
                            'bottom': '1em'
                        },
                        'JS': {
                            'cdrConfig': {
                                'uitracingcdr': {
                                    'cdrType': 'uitracingcdr',
                                    'enable': true,
                                    'storeData': false
                                }
                            },
                            'text': '兑换流量'
                        }
                    },
                    'coinbtn1': {
                        'CSS': {
                            'width': '100%',
                            'text-align': 'center',
                            'margin-top': '1em'
                        },
                        'JS': {
                            'isEnables': 0,
                            'datamapping': 'respparam.signflag',
                            'cdrConfig': {
                                'uitracingcdr': {
                                    'cdrType': 'uitracingcdr',
                                    'enable': true,
                                    'storeData': false
                                }
                            },
                            "stateconfig": {
                                "state": 0,
                                "state0": {
                                    "background-color": "#fff",
                                },
                                "state1": {
                                    "background-color": "#cacecd",
                                }
                            }
                        }
                    },
                    "coinbtn1_second": {
                        "CSS": {},
                        "JS": {
                            'cdrConfig': {
                                'uitracingcdr': {
                                    'cdrType': 'uitracingcdr',
                                    'enable': true,
                                    'storeData': false
                                }
                            }
                        }
                    },
                    'coinbtn1text': {
                        'CSS': {
                            'display': 'inline-block',
                            'width': '45%',
                            'height': '3.5em',
                            'line-height': '3.5em',
                            'text-align': 'center',
                            'background': '#fff',
                            'color': '#222',
                            'font-size': '0.875em',
                            '  -moz-border-radius': '0.4em',
                            '-webkit-border-radius': '0.4em',
                            'border-radius': '0.4em'
                        },
                        'JS': {
                            'text': '签到送金币',
                            'text1': '恭喜您签到成功'
                        }
                    },
                    'coinbtn2': {
                        'CSS': {
                            'width': '100%',
                            'text-align': 'center',
                            'margin-top': '1em'
                        },
                        'JS': {
                            'isEnables': 1,
                            'cdrConfig': {
                                'uitracingcdr': {
                                    'cdrType': 'uitracingcdr',
                                    'enable': true,
                                    'storeData': false
                                }
                            }
                        }
                    },
                    'coinbtn2text': {
                        'CSS': {
                            'display': 'inline-block',
                            'width': '45%',
                            'height': '3.5em',
                            'line-height': '3.3em',
                            'text-align': 'center',
                            'background': '#ff7d55',
                            'color': '#222',
                            'font-size': '0.875em',
                            '-moz-border-radius': '0.4em',
                            '-webkit-border-radius': '0.4em',
                            'border-radius': '0.4em',
                            'border': '0.2em solid #fff',
                            '-webkit-box-sizing': 'border-box',
                            '-moz-box-sizing': 'border-box',
                            'box-sizing': 'border-box'
                        },
                        'JS': {
                            'text': '企业签到送金币'
                        }
                    },
                    'tipholder': {
                        'CSS': {
                            'width': '70%',
                            'height': '4em',
                            'background': 'rgba(0,0,0,0.5)',
                            'padding': '0.8em 1.5em',
                            'text-align': 'center',
                            'position': 'absolute',
                            'z-index': '101',
                            'left': '50%',
                            'margin-left': '-35%',
                            'bottom': '9em',
                            '-moz-border-radius': '4em',
                            '-webkit-border-radius': '4em',
                            'border-radius': '4em',
                            '-moz-box-sizing': 'border-box',
                            '-webkit-box-sizing': 'border-box',
                            'box-sizing': 'border-box',
                            'display': 'none'
                        },
                        'JS': {
                            'timeout': 3
                        }
                    },
                    'tiptext': {
                        'CSS': {
                            'color': '#fff',
                            'font-size': '0.875em'
                        },
                        'JS': {
                            'text': '今日签到成功，{1}个金币已存入您的金币账户',
                            'text1': '不好意思，刚刚没签上，麻烦您再签一次',
                            'text2': '不好意思，您已经签过到了，明天再来吧~',
                            'text3': '我也是醉了，系统出小差了.',
                            'coinsAdded': 0,
                            'datamapping': 'respparam.vaIncreased'
                        }
                    },
                    'coinholder': {
                        'CSS': {
                            'position': 'absolute',
                            'text-align': 'center',
                            'z-index': '9998',
                            'top': '-100px',
                            'width': '67px',
                            'height': '67px',
                            '-webkit-animation-iteration-count': '1',
                            '-webkit-animation-direction': 'normal, normal',
                            '-webkit-animation-timing-function': 'linear, ease-in',
                            '-moz-animation-iteration-count': '1',
                            '-moz-animation-direction': 'normal, normal',
                            '-moz-animation-timing-function': 'linear, ease-in',
                            'background-image': "url('" + top.tlbs.templatePath + "/images/gold.png?V=1')",
                            'background-position': '0 0',
                            'background-repeat': 'no-repeat',
                            'background-color': 'transparent',
                            'background-size': '100% 100%'
                        },
                        'JS': {}
                    },
                    'coinholderspan': {
                        'CSS': {
                            'position': 'absolute',
                            'display': 'block',
                            '-webkit-animation-iteration-count': '1',
                            '-webkit-animation-direction': 'alternate',
                            '-webkit-animation-timing-function': 'ease-in-out',
                            '-webkit-transform-origin': '50%-100%',
                            '-moz-animation-iteration-count': '1',
                            '-moz-animation-direction': 'alternate',
                            '-moz-animation-timing-function': 'ease-in-out',
                            '-moz-transform-origin': '50%-100%'
                        },
                        'JS': {}
                    },
                    "status": {
                        'CSS': {
                        
                        },
                        'JS': {
                            'datamapping': 'respparam.status',
                            'status': '0',
                            "status0": "2015521",
                            "status1": "2015522",
                            "status2": "2015523",
                            "status3": "2015524",
                        }
                    },
                    'c60_fbar_goldcoin_result_con': {
                        "CSS": {},
                        "JS": {
                            "showconfig": {
                                "status": "0",
                                "status0": {
                                    "display": "none"
                                },
                                "status1": {
                                    "display": "block"
                                }
                            },
                            "statusconfig": {
                                "status": "1",
                                "status1": {
                                    "tipstxt": "不要阻止我，我要去天台思考人生",
                                    "btntxt": "去首页看看",
                                    "imgUrl": top.tlbs.templatePath + "/images/404.jpg"
                                },
                                "status2": {
                                    "tipstxt": "攻程狮正在奋力开采中，敬请期待!",
                                    "btntxt": "去首页看看",
                                    "imgUrl": top.tlbs.templatePath + "/images/gongchengshi.jpg"
                                },
                                "status3": {
                                    "tipstxt": "我也是醉了，系统出小差了",
                                    "btntxt": "返回看看",
                                    "imgUrl": top.tlbs.templatePath + "/images/zuile.jpg"
                                }
                            }
                        }
                    },
                    "c60_fbar_link_btn": {
                        "CSS": {},
                        "JS": {
                            'cdrConfig': {
                                'uitracingcdr': {
                                    'cdrType': 'uitracingcdr',
                                    'enable': true,
                                    'storeData': false
                                }
                            }
                        }
                    }
                }
            };
            $scope.extendComponentData = function(componetData) {
                coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $scope.processConfig();
                var cssData = JSON.stringify($scope.compData.JS.coinholder.CSS);
                cssData = $scope.formatStyleData(cssData);
                coreService.commonServiceRef.appendStyle('.coinholder', '', cssData);
                cssData = JSON.stringify($scope.compData.JS.coinholderspan.CSS);
                cssData = $scope.formatStyleData(cssData);
                coreService.commonServiceRef.appendStyle('.coinholder span', '', cssData);
                coreService.fireEvent($scope.cid, 'init', null );
            }
            ;
            $scope.processConfig = function() {
                //mainholder
                $element.css($scope.compData.CSS);
                //circleholder
                var circleholder = angular.element($element[0].querySelector('[id="circleholder"]'));
                circleholder.css($scope.compData.JS.circleholder.CSS);
                try {
                    var height = parseInt(top.window.innerHeight);
                    if (height <= 400) {
                        circleholder.css({
                            'margin-top': '0.8em'
                        });
                    }
                } catch (e) {}
                
                //circle
                angular.element($element[0].querySelector('[id="circle"]')).css($scope.compData.JS.circle.CSS);
                //circletxt1
                angular.element($element[0].querySelector('[id="circletxt1"]')).css($scope.compData.JS.circletxt1.CSS);
                //circletxt2
                angular.element($element[0].querySelector('[id="circletxt2"]')).css($scope.compData.JS.circletxt2.CSS);
                //circletxt3
                angular.element($element[0].querySelector('[id="circletxt3"]')).css($scope.compData.JS.circletxt3.CSS);
                //coinbtn1
                angular.element($element[0].querySelector('[id="coinbtn1"]')).css($scope.compData.JS.coinbtn1.CSS);
                //coinbtn1text
                angular.element($element[0].querySelector('[id="coinbtn1text"]')).css($scope.compData.JS.coinbtn1text.CSS);
                //coinbtn2
                angular.element($element[0].querySelector('[id="coinbtn2"]')).css($scope.compData.JS.coinbtn2.CSS);
                //coinbtn2text
                angular.element($element[0].querySelector('[id="coinbtn2text"]')).css($scope.compData.JS.coinbtn2text.CSS);
                //tipholder
                angular.element($element[0].querySelector('[id="tipholder"]')).css($scope.compData.JS.tipholder.CSS);
                //tipholder
                angular.element($element[0].querySelector('[id="tiptext"]')).css($scope.compData.JS.tiptext.CSS);
            }
            ;
            $scope.updateCoinsData = function(eventObject) {
                coreService.fireEvent($scope.cid, 'coinUpdated');
                var totalCoins = $scope.extractData(eventObject, $scope.compData.JS.circletxt2.JS.datamapping);
                if (null  != totalCoins && totalCoins.length > 0) {
                    $scope.hideTip();
                    $scope.showSuccess();
                    $scope.compData.JS.buttonEnable = true;
                    $scope.compData.JS.circletxt2.JS.text = 0;
                    $scope.compData.JS.circletxt2.JS.newtext = $scope.extractData(eventObject, $scope.compData.JS.circletxt2.JS.datamapping) || $scope.compData.JS.circletxt2.JS.text;
                    $scope.compData.JS.tiptext.JS.coinsAdded = $scope.extractData(eventObject, $scope.compData.JS.tiptext.JS.datamapping) || $scope.compData.JS.tiptext.JS.coinsAdded;
                    $scope.compData.JS.coinbtn1.JS.isEnables = $scope.extractData(eventObject, $scope.compData.JS.coinbtn1.JS.datamapping) || $scope.compData.JS.coinbtn1.JS.isEnables;
                    if ($scope.compData.JS.coinbtn1.JS.isEnables == 0) {
                        angular.element($element[0].querySelector('[id="coinbtn1text"]')).text($scope.compData.JS.coinbtn1text.JS.text1);
                    } else {
                        angular.element($element[0].querySelector('[id="coinbtn1text"]')).text($scope.compData.JS.coinbtn1text.JS.text);
                    }
                    coreService.fireEvent($scope.cid, 'showsucc');
                    if ($scope.compData.JS.tiptext.JS.coinsAdded > 0 && ($scope.compData.JS.circletxt2.JS.text + $scope.compData.JS.tiptext.JS.coinsAdded) > $scope.compData.JS.circletxt2.JS.newtext) {
                        $scope.compData.JS.circletxt2.JS.newtext = $scope.compData.JS.circletxt2.JS.text + $scope.compData.JS.tiptext.JS.coinsAdded;
                    }
                    $scope.updateCoinCount();
                    if (!$scope.startUp && $scope.compData.JS.tiptext.JS.coinsAdded > 0) {
                        $scope.animationStart();
                        $scope.updateSuccessTip();
                        angular.element($element[0].querySelector('[id="coinbtn1text"]')).text($scope.compData.JS.coinbtn1text.JS.text1);
                        $scope.compData.JS.coinbtn1.JS.isEnables = 0;
                    } else {
                        $scope.startUp = false;
                    }
                } else {
                    $scope.compData.JS.buttonEnable = false;
                    $scope.hideTip();
                    coreService.fireEvent($scope.cid, 'showerror');
                    $scope.showError();
                    return false;
                }
            }
            ;
            $scope.showError = function() {
                //将提示页面显示出来，隐藏原来空白页面
                $scope.compData.JS.c60_fbar_goldcoin_result_con.JS.showconfig.status = 1;
                angular.element($element[0].querySelector('.c60_fbar_goldcoin_result_con')).css({
                    'background': '#fff'
                });
                angular.element($element[0].querySelector('[id="circleholder"]')).css({
                    'display': 'none'
                });
                angular.element($element[0].querySelector('[id="coinbtn1"]')).css({
                    'display': 'none'
                });
                angular.element($element[0].querySelector('[id="coinbtn2"]')).css({
                    'display': 'none'
                });
                angular.element($element[0].querySelector('[id="tipholder"]')).css({
                    'display': 'none'
                });
                $scope.compData.CSS.background = '#fff';
                $element.css($scope.compData.CSS);
            }
            ;
            $scope.showSuccess = function() {
                $scope.compData.JS.c60_fbar_goldcoin_result_con.JS.showconfig.status = 0;
                angular.element($element[0].querySelector('[id="circleholder"]')).css({
                    'display': 'block'
                });
                angular.element($element[0].querySelector('[id="coinbtn1"]')).css({
                    'display': 'block'
                });
                angular.element($element[0].querySelector('[id="coinbtn2"]')).css({
                    'display': 'block'
                });
                $scope.compData.CSS.background = '#ff7d55';
                $element.css($scope.compData.CSS);
            }
            ;
            $scope.gettaocan_result_conStyle = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_goldcoin_result_con != null  && $scope.compData.JS.c60_fbar_goldcoin_result_con != undefined) {
                    if ($scope.compData.JS.c60_fbar_goldcoin_result_con.JS.showconfig.status == 0) {
                        return $scope.compData.JS.c60_fbar_goldcoin_result_con.JS.showconfig.status0;
                    } else {
                        return $scope.compData.JS.c60_fbar_goldcoin_result_con.JS.showconfig.status1;
                    }
                }
            }
            ;
            $scope.taocanresulturl = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_goldcoin_result_con != null  && $scope.compData.JS.c60_fbar_goldcoin_result_con != undefined) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_goldcoin_result_con.JS.statusconfig.status;
                    var imgUrl = $scope.compData.JS.c60_fbar_goldcoin_result_con.JS.statusconfig[status].imgUrl;
                    return imgUrl.replace(/'/g, '');
                }
            }
            ;
            $scope.taocanresulttxt = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_goldcoin_result_con != null  && $scope.compData.JS.c60_fbar_goldcoin_result_con != undefined) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_goldcoin_result_con.JS.statusconfig.status;
                    var btntxt = $scope.compData.JS.c60_fbar_goldcoin_result_con.JS.statusconfig[status].btntxt;
                    return btntxt;
                }
            }
            ;
            $scope.taocanresulttips = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_goldcoin_result_con != null  && $scope.compData.JS.c60_fbar_goldcoin_result_con != undefined) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_goldcoin_result_con.JS.statusconfig.status;
                    var tipstxt = $scope.compData.JS.c60_fbar_goldcoin_result_con.JS.statusconfig[status].tipstxt;
                    return tipstxt;
                }
            }
            ;
            $scope.returnclick = function() {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig)) {
                    //if (null != $scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig && null != $scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig.uitracingcdr && $scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig.uitracingcdr.enable) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'goFirstPage')
                    };
                    //coreUtils.uiTracingCdr('', "c60_fbar_link_btn", $scope.pageID);
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'goFirstPage');
            }
            ;
            $scope.updateCoinsData2 = function(param) {
                $scope.compData.JS.tiptext.JS.coinsAdded = param.respparam.vaIncreased;
                $scope.compData.JS.status.JS.status = param.respparam.status;
                if ($scope.compData.JS.status.JS.status == $scope.compData.JS.status.JS.status1 || $scope.compData.JS.status.JS.status == $scope.compData.JS.status.JS.status3) {
                    if ($scope.compData.JS.tiptext.JS.coinsAdded != null  && $scope.compData.JS.tiptext.JS.coinsAdded != undefined) {
                        coreService.fireEvent($scope.cid, 'coinIncreased', param);
                        $scope.compData.JS.circletxt2.JS.newtext = Number($scope.compData.JS.circletxt2.JS.text) + Number($scope.compData.JS.tiptext.JS.coinsAdded);
                        $scope.updateCoinCount();
                        $scope.animationStart();
                        $scope.updateSuccessTip();
                        $scope.compData.JS.coinbtn1.JS.isEnables = 0;
                        angular.element($element[0].querySelector('[id="coinbtn1text"]')).text($scope.compData.JS.coinbtn1text.JS.text1);
                    } else {
                        $scope.updateFailesTip(true, $scope.compData.JS.tiptext.JS.text1);
                    }
                } else {
                    $scope.updateFailesTip(true, $scope.compData.JS.tiptext.JS.text1);
                }
                $scope.compData.JS.tiptext.JS.coinsAdded = 0;
                $scope.compData.JS.coinbtn1.JS.stateconfig.state = 0;
                angular.element($element[0].querySelector('[id="coinbtn1text"]')).css($scope.compData.JS.coinbtn1.JS.stateconfig.state0);
            }
            ;
            
            $scope.updateCoinsData3 = function(param) {
                $scope.compData.JS.tiptext.JS.coinsAdded = param.respparam.vaIncreased;
                if ($scope.compData.JS.tiptext.JS.coinsAdded != null  && $scope.compData.JS.tiptext.JS.coinsAdded != undefined) {
                    $scope.compData.JS.circletxt2.JS.text = Number($scope.compData.JS.circletxt2.JS.text) + Number($scope.compData.JS.tiptext.JS.coinsAdded);
                }
                if (param.respparam.status == $scope.compData.JS.status.JS.status1 || param.respparam.status == $scope.compData.JS.status.JS.status3) {
                    $scope.compData.JS.coinbtn1.JS.isEnables = 0;
                    angular.element($element[0].querySelector('[id="coinbtn1text"]')).text($scope.compData.JS.coinbtn1text.JS.text1);
                }
                $scope.compData.JS.tiptext.JS.coinsAdded = 0;
            }
            ;
            
            $scope.updateSuccessTip = function() {
                angular.element($element[0].querySelector('[id="tiptext"]')).text($scope.compData.JS.tiptext.JS.text.replace('{1}', $scope.compData.JS.tiptext.JS.coinsAdded));
                angular.element($element[0].querySelector('[id="tipholder"]')).css('display', 'block');
                $timeout(function() {
                    angular.element($element[0].querySelector('[id="tipholder"]')).css('display', 'none');
                    $scope.compData.JS.tiptext.JS.coinsAdded = 0;
                }, $scope.compData.JS.tipholder.JS.timeout * 1000);
            }
            ;
            $scope.updateFailesTip = function(withTimeout, text) {
                angular.element($element[0].querySelector('[id="tiptext"]')).text(text);
                angular.element($element[0].querySelector('[id="tipholder"]')).css('display', 'block');
                if (withTimeout) {
                    $timeout(function() {
                        angular.element($element[0].querySelector('[id="tipholder"]')).css('display', 'none');
                    }, $scope.compData.JS.tipholder.JS.timeout * 1000);
                }
            }
            ;
            $scope.hideTip = function() {
                angular.element($element[0].querySelector('[id="tipholder"]')).css('display', 'none');
            }
            ;
            
            $scope.hideMoney = function() {
                $scope.compData.JS.moneyListDisplay = false;
                coreService.fireEvent($scope.cid, 'moneyhide');
            }
            ;
            $scope.secondClickTip = function() {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.coinbtn1_second.JS.cdrConfig)) {
                    //if (null != $scope.compData.JS.coinbtn1_second.JS.cdrConfig && null != $scope.compData.JS.coinbtn1_second.JS.cdrConfig.uitracingcdr && $scope.compData.JS.coinbtn1_second.JS.cdrConfig.uitracingcdr.enable) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'personalSign')
                    };
                    coreUtils.cdrService($scope.compData.JS.coinbtn1_second.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    //coreUtils.uiTracingCdr('', "coinbtn1", $scope.pageID);
                }
                angular.element($element[0].querySelector('[id="tiptext"]')).text($scope.compData.JS.tiptext.JS.text2);
                angular.element($element[0].querySelector('[id="tipholder"]')).css('display', 'block');
                $timeout(function() {
                    angular.element($element[0].querySelector('[id="tipholder"]')).css('display', 'none');
                }, $scope.compData.JS.tipholder.JS.timeout * 1000);
            }
            $scope.error = function() {
                $scope.hideTip();
                coreService.fireEvent($scope.cid, 'showerror');
                $scope.showError();
            }
            $scope.eventMap['updateCoinsData'] = $scope.updateCoinsData;
            $scope.eventMap['updateCoinsData2'] = $scope.updateCoinsData2;
            $scope.eventMap['updateCoinsData3'] = $scope.updateCoinsData3;
            $scope.eventMap['hideMoney'] = $scope.hideMoney;
            $scope.eventMap['error'] = $scope.error;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });
            
            $scope.circletxt3Click = function() {
                coreService.fireEvent($scope.cid, 'circletxt3Click');
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.circletxt3.JS.cdrConfig)) {
                    //if (null != $scope.compData.JS.circletxt3.JS.cdrConfig && null != $scope.compData.JS.circletxt3.JS.cdrConfig.uitracingcdr && $scope.compData.JS.circletxt3.JS.cdrConfig.uitracingcdr.enable) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'trafficExchange')
                    };
                    coreUtils.cdrService($scope.compData.JS.circletxt3.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    //coreUtils.uiTracingCdr('', "circletxt3", $scope.pageID);
                }
            }
            ;
            
            $scope.coinbtn1Click = function() {
                if ($scope.compData.JS.coinbtn1.JS.stateconfig.state == 1) {
                    return false;
                }
                if ($scope.compData.JS.buttonEnable) {
                    if ($scope.compData.JS.coinbtn1.JS.isEnables == 1) {
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.coinbtn1.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': coreUtils.createCdrid($scope.pageID, '', 'personalSign')
                            };
                            coreUtils.cdrService($scope.compData.JS.coinbtn1.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                        $scope.compData.JS.coinbtn1.JS.stateconfig.state = 1;
                        angular.element($element[0].querySelector('[id="coinbtn1text"]')).css($scope.compData.JS.coinbtn1.JS.stateconfig.state1);
                        coreService.fireEvent($scope.cid, 'coinbtn1Click');
                    } else {
                        $scope.secondClickTip();
                    }
                }
            }
            ;
            
            $scope.coinbtn2Click = function() {
                if ($scope.compData.JS.buttonEnable && $scope.compData.JS.coinbtn2.JS.isEnables == 1) {
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.coinbtn2.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, '', 'companySign')
                        };
                        coreUtils.cdrService($scope.compData.JS.coinbtn2.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.compData.JS.moneyListDisplay = true;
                    coreService.fireEvent($scope.cid, 'coinbtn2Click');
                }
            }
            ;
            $scope.updateCoinCount = function() {
                if ($scope.runningCount == 0) {
                    var diff = Number($scope.compData.JS.circletxt2.JS.newtext) - Number($scope.compData.JS.circletxt2.JS.text);
                    $scope.compData.JS.circletxt2.JS.text = Number($scope.compData.JS.circletxt2.JS.text);
                    var count = Math.abs(diff);
                    
                    if (count > 100) {
                        
                        if (diff > 0) {
                            $scope.compData.JS.circletxt2.JS.text = Number($scope.compData.JS.circletxt2.JS.text) + count - 100;
                        
                        } else {
                            $scope.compData.JS.circletxt2.JS.text = Number($scope.compData.JS.circletxt2.JS.text) - count + 100;
                        }
                        count = 100;
                    }
                    $scope.runningCount = count;
                    
                    if (diff > 0) {
                        intervalObject = $interval(incrementCount, 10, count);
                    } else if (diff < 0) {
                        intervalObject = $interval(decrementCount, 10, count);
                    }
                }
            }
            ;
            
            function incrementCount() {
                if ($scope.compData.JS.circletxt2.JS.text <= $scope.compData.JS.circletxt2.JS.newtext) {
                    $scope.compData.JS.circletxt2.JS.text += 1;
                    $scope.runningCount -= 1;
                }
            }
            ;
            
            function decrementCount() {
                if ($scope.compData.JS.circletxt2.JS.text <= $scope.compData.JS.circletxt2.JS.newtext) {
                    $scope.compData.JS.circletxt2.JS.text -= 1;
                    $scope.runningCount -= 1;
                }
            }
            ;
            $element.on('$destroy', function() {
                $interval.cancel(intervalObject);
            });
            $scope.animationStart = function() {
                animationRule();
                for (var i = 0; i < 15; i++) {
                    $element[0].appendChild(createcoin());
                }
            }
            ;
            $scope.formatStyleData = function(styleData) {
                styleData = styleData.replace(/","/g, ';').replace(/":"/g, ':').replace(/\\/g, '').replace(/{"/, '{').replace(/"}/, '}');
                return styleData;
            }
            ;
            
            $scope.extractData = function(inputData, key) {
                if (null  != inputData && null  != key) {
                    var keys = key.split('.');
                    var keyData = inputData[keys[0]];
                    if (null  != keyData) {
                        for (var j = 1; j < keys.length; j++) {
                            keyData = keyData[keys[j]];
                        }
                        if (null  != keyData) {
                            return keyData;
                        } else {
                            return null ;
                        }
                    } else {
                        return null ;
                    }
                } else {
                    return null ;
                }
            }
            ;
            
            $scope.showcb = function() {
                $scope.compData.JS.moneyListDisplay = false;
            }
            ;
            
            function createcoin() {
                var html5iconElement = document.createElement('div');
                html5iconElement.className = 'coinholder';
                var html5icon = document.createElement('span');
                html5icon.innerHTML = '&nbsp;';
                html5iconElement.appendChild(html5icon);
                var fadeAndDropDuration = durationValue();
                var iconDelay = 1;
                html5iconElement.style.webkitAnimationName = 'fade, drop';
                html5iconElement.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;
                html5iconElement.style.webkitAnimationDelay = iconDelay;
                html5iconElement.style.MozAnimationName = 'fade, drop';
                html5iconElement.style.MozAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;
                html5iconElement.style.MozAnimationDelay = iconDelay;
                html5iconElement.style['left'] = randomInteger(10, 90) + '%';
                angular.element(html5iconElement).on(
                "webkitAnimationEnd oanimationend msAnimationEnd animationend", 
                function(event) {
                    var source = event.target || event.srcElement;
                    $element[0].removeChild(source);
                });
                return html5iconElement;
            }
            
            function animationRule() {
                var lastSheet = top.top.document.styleSheets[document.styleSheets.length - 1];
                var drop_height = top.window.innerHeight;
                try {
                    lastSheet.insertRule("@-webkit-keyframes drop { 0% { -webkit-transform: translate(0px, -50px); } 100% { -webkit-transform: translate(0px, " + drop_height + "px); } }", lastSheet.cssRules.length);
                } catch (e) {}
                try {
                    lastSheet.insertRule("@keyframes drop { 0% { transform: translate(0px, -50px); } 100% { transform: translate(0px, " + drop_height + "px); } }", lastSheet.cssRules.length);
                } catch (e) {}
                try {
                    lastSheet.insertRule("@-moz-keyframes drop { 0% { -moz-transform: translate(0px, -50px); } 100% { -moz-transform: translate(0px, " + drop_height + "px); } }", lastSheet.cssRules.length);
                } catch (e) {}
                try {
                    lastSheet.insertRule("@-o-keyframes drop { 0% { -o-transform: translate(0px, -50px); } 100% { -o-transform: translate(0px, " + drop_height + "px); } }", lastSheet.cssRules.length);
                } catch (e) {}
            }
            
            function durationValue() {
                return randomFloat(1, 3) + 's';
            }
            
            function randomFloat(low, high) {
                return low + Math.random() * (high - low);
            }
            
            function randomInteger(low, high) {
                return low + Math.floor(Math.random() * (high - low));
            }
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'goldcoinlayout';
            scope.init();
        }
    };
}
]);
uiCore.directive('money', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="gmainmoney">' + '<div class="c60_fbar_bg_black_pop" ng-style="getbg_black_popStyle()">' + '<div class="c60_fbar_tips_txt" ng-bind="compData.JS.bg_black_pop.JS.desc" style="color:white;margin-top:0"></div>' + '</div>' + '<div class="c60_fbar_myGold c60_fbar_titleNumDesc" >' + '<h5 class="c60_fbar_titleNumDesc-Title">我的金币<span class="c60_fbar_titleNumDesc-Num">{{compData.JS.respparam.total}}</span></h5>' + '<p class="c60_fbar_titleNumDesc-Desc"></p>' + '</div>' + '<div class="c60_fbar_money_result_con" ng-style="gettaocan_result_conStyle()">' + '<div class="c60_fbar_succ_img_con"><span class="c60_fbar_money_succ_img"  ng-style="taocanresulturl()"></span></div>' + '<div class="c60_fbar_tips_txt" ng-bind="taocanresulttips()"></div>' + '<div class="c60_fbar_result_btn" ccid="c60_fbar_link_btn"><a class="c60_fbar_link_btn" ng-bind="taocanresulttxt()" ng-click="returnclick()"></a></div>' + '</div>' + '<div class="c60_fbar_mwrapper"  id="gcwrapper">' + '<ul class="c60_fbar_cimgTitleList" simplescroll>' + '<li ng-repeat="commpany in compData.JS.respparam.commpany" ng-class="{\'c60_fbar_imgTitlem\':true}"><img ng-src="{{commpany.image}}" ng-class="{\'c60_fbar_imgTitle-Img\':true}" /><p ng-class="{\'c60_fbar_imgTitle-Title\':true}" >{{commpany.description}}</p><span ng-click="myclick(commpany,$index);$event.stopPropagation();" ng-class="{\'c60_fbar_imgTitle_Btn\':true}" >{{commpany.signflag==1?\'签到\':\'去逛逛\'}}</span></li>' + '</ul>' + '</div>' + '<div class="c60_fbar_bg_pop_block" ng-click="$event.stopPropagation();"></div>' + '<div class="c60_fbar_pop_block">' + '<div class="c60_fbar_img_txt_info">' + '<table cellpadding="0" cellspacing="0" class="c60_fbar_img_txt_table">' + '<tr>' + '<td><span class="c60_fbar_goldIcon" ng-style="getStyle({goldIcon:1})"></span></td>' + '<td>' + '<div class="c60_fbar_pop_txt3"><span  class="c60_fbar_pop_txt3">{{signRes}}</span><span  class="c60_fbar_pop_txt3 c60_fbar_txt_blue">{{commpanyname}}</span><span  class="c60_fbar_pop_txt3" ng-bind="signTips"></span><span  class="c60_fbar_pop_txt3" style="color:red;" ng-bind="vaIncreased"></span><span  class="c60_fbar_pop_txt3" ng-bind="signTips1"></span></div>' + '</td>' + '</tr>' + '</table>' + '</div>' + '<div class="c60_fbar_img_txt_btn c60_fbar_clearfloat">' + '<div class="c60_fbar_left_itbtn" ng-click="signOther()">{{signOtherComp}}</div>' + '<div class="c60_fbar_right_itbtn" ng-click="goShopping(golink)">{{rightbtnOption}}</div>' + '</div>' + '</div>' + '</div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 
        'coreUtils', 
        'Const', 
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.compData = {
                'CSS': {},
                'JS': {
                    "c60_fbar_imgTitle_Btn": {
                        "CSS": {},
                        "JS": {
                            "stateconfig": {
                                "state": 0,
                                "state0": {
                                    "background-color": "#fff",
                                },
                                "state1": {
                                    "background-color": "#cacecd",
                                }
                            }
                        }
                    }
                }
            };
            $scope.eventMap = {};
            var timeout = null ;
            $scope.getStyle = function(input) {
                var classname;
                for (item in input) {
                    classname = item;
                    break;
                }
                if ($scope.compData.JS[classname] && $scope.compData.JS[classname].CSS) {
                    return $scope.compData.JS[classname].CSS;
                }
            }
            ;
            $scope.getbg_black_popStyle = function() {
                if ($scope.compData.JS.bg_black_pop.JS.stateconfig.state == 1) {
                    return $scope.compData.JS.bg_black_pop.JS.stateconfig.state1;
                } else {
                    return $scope.compData.JS.bg_black_pop.JS.stateconfig.state0;
                }
            }
            ;
            $scope.bg_black_popShow = function(callback) {
                $scope.compData.JS.bg_black_pop.JS.stateconfig.state = 1;
                angular.element($element[0].querySelector('.c60_fbar_bg_black_pop')).css({
                    'display': 'block'
                });
                setTimeout(function() {
                    //将弹框隐藏 
                    $scope.compData.JS.bg_black_pop.JS.stateconfig.state = 0;
                    angular.element($element[0].querySelector('.c60_fbar_bg_black_pop')).css({
                        'display': 'none'
                    });
                }, $scope.compData.JS.bg_black_pop.JS.stateconfig.time * 1000);
            }
            ;
            $scope.popDown = function() {
                coreService.fireEvent($element.attr('cid'), 'showerror');
                angular.element($element[0].querySelector('.c60_fbar_bg_pop_block')).css({
                    'display': 'block'
                });
                angular.element($element[0].querySelector('.c60_fbar_pop_block')).css({
                    'display': 'block'
                });
                angular.element($element[0].querySelector('.c60_fbar_bg_pop_block')).css({
                    'z-index': '2047483647888'
                });
                angular.element($element[0].querySelector('.c60_fbar_pop_block')).css({
                    'z-index': '2047483647889'
                });
            }
            
            $scope.myclick = function(commpany, index) {
                if ($scope.compData.JS.c60_fbar_imgTitle_Btn.JS.stateconfig.state == 1) {
                    return false;
                }
                if (index != null  && index != undefined && commpany != null  && commpany != undefined) {
                    $scope.compData.JS.index = index;
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_imgTitle_Btn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': commpany.commpanyid
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_imgTitle_Btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.obj = commpany;
                    if (commpany.signflag == '1') {
                        $scope.compData.JS.c60_fbar_imgTitle_Btn.JS.stateconfig.state = 1;
                        angular.element($element[0].querySelectorAll('.c60_fbar_imgTitle_Btn')).css($scope.compData.JS.c60_fbar_imgTitle_Btn.JS.stateconfig.state1);
                        $scope.bg_black_popShow();
                        coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click0', {
                            "id": commpany.commpanyid
                        });
                    } else if (commpany.signflag == '0') {
                        window.open(commpany.link);
                    }
                }
            }
            ;
            
            $scope.signOther = function() {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_left_itbtn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'leftBtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_left_itbtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                angular.element($element[0].querySelector('.c60_fbar_bg_pop_block')).css({
                    'display': 'none'
                });
                angular.element($element[0].querySelector('.c60_fbar_pop_block')).css({
                    'display': 'none'
                });
                coreService.fireEvent($element.attr('cid'), 'showsucc');
            }
            
            $scope.goShopping = function(link) {
                if (link != null  && link != undefined) {
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_right_itbtn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'rightBtn')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_right_itbtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    if ($scope.compData.JS.sign.isFailed) {
                        angular.element($element[0].querySelector('.c60_fbar_bg_pop_block')).css({
                            'display': 'none'
                        });
                        angular.element($element[0].querySelector('.c60_fbar_pop_block')).css({
                            'display': 'none'
                        });
                    } else {
                        angular.element($element[0].querySelector('.c60_fbar_bg_pop_block')).css({
                            'display': 'none'
                        });
                        angular.element($element[0].querySelector('.c60_fbar_pop_block')).css({
                            'display': 'none'
                        });
                        window.open(link);
                    }
                    coreService.fireEvent($element.attr('cid'), 'showsucc');
                }
            }
            ;
            
            $scope.updateData = function(param) {
                $scope.compData.JS.respparam = param.respparam;
                if (param.respparam.commpany && param.respparam.total.length > 0 && param.respparam.commpany.length > 0) {
                    $scope.compData.JS.respparam.total = param.respparam.total;
                    $scope.showSuccess();
                } else {
                    $scope.showError();
                    return false;
                }
            }
            ;
            $scope.showError = function() {
                //将提示页面显示出来，隐藏原来空白页面
                $scope.compData.JS.c60_fbar_money_result_con.JS.showconfig.status = 1;
                angular.element($element[0].querySelector('.gmainmoney')).css({
                    'background': '#fff'
                });
                angular.element($element[0].querySelector('.c60_fbar_money_result_con')).css({
                    'background': '#fff'
                });
            }
            ;
            $scope.showSuccess = function() {
                $scope.compData.JS.c60_fbar_money_result_con.JS.showconfig.status = 0;
            }
            ;
            $scope.gettaocan_result_conStyle = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_money_result_con != null  && $scope.compData.JS.c60_fbar_money_result_con != undefined) {
                    if ($scope.compData.JS.c60_fbar_money_result_con.JS.showconfig.status == 0) {
                        return $scope.compData.JS.c60_fbar_money_result_con.JS.showconfig.status0;
                    } else {
                        return $scope.compData.JS.c60_fbar_money_result_con.JS.showconfig.status1;
                    }
                }
            }
            ;
            $scope.taocanresulturl = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_money_result_con != null  && $scope.compData.JS.c60_fbar_money_result_con != undefined) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_money_result_con.JS.statusconfig.status;
                    var imgUrl = $scope.compData.JS.c60_fbar_money_result_con.JS.statusconfig[status].imgUrl;
                    var imgval = imgUrl.replace(/'/g, '');
                    if (imgval) {
                        return {
                            "background-image": "url(" + imgval + ")"
                        };
                    } else {
                        return {};
                    }
                }
            }
            ;
            $scope.taocanresulttxt = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_money_result_con != null  && $scope.compData.JS.c60_fbar_money_result_con != undefined) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_money_result_con.JS.statusconfig.status;
                    var btntxt = $scope.compData.JS.c60_fbar_money_result_con.JS.statusconfig[status].btntxt;
                    return btntxt;
                }
            }
            ;
            $scope.taocanresulttips = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_money_result_con != null  && $scope.compData.JS.c60_fbar_money_result_con != undefined) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_money_result_con.JS.statusconfig.status;
                    var tipstxt = $scope.compData.JS.c60_fbar_money_result_con.JS.statusconfig[status].tipstxt;
                    return tipstxt;
                }
            }
            ;
            $scope.returnclick = function() {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'goFirstPage')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'goFirstPage');
            }
            ;
            $scope.updateCoinsTotal = function(param) {
                if (null  != param.respparam.vaIncreased || undefined != param.respparam.vaIncreased) {
                    $scope.compData.JS.respparam.total = Number($scope.compData.JS.respparam.total) + Number(param.respparam.vaIncreased);
                }
            }
            ;
            
            $scope.signData = function(param) {
                $scope.compData.JS.bg_black_pop.JS.stateconfig.state = 0;
                angular.element($element[0].querySelector('.c60_fbar_bg_black_pop')).css({
                    'display': 'none'
                });
                $scope.compData.JS.c60_fbar_imgTitle_Btn.JS.stateconfig.state = 0;
                angular.element($element[0].querySelectorAll('.c60_fbar_imgTitle_Btn')).css($scope.compData.JS.c60_fbar_imgTitle_Btn.JS.stateconfig.state0);
                if (param != null  && param != undefined) {
                    $scope.compData.JS.status = param.respparam.status;
                    $scope.compData.JS.desc = param.respparam.desc;
                    $scope.compData.JS.vaIncreased = param.respparam.vaIncreased;
                    if ($scope.compData.JS.status != null  && $scope.compData.JS.status != undefined) {
                        if ($scope.compData.JS.status == $scope.compData.JS.sign.status.status3 || $scope.compData.JS.status == $scope.compData.JS.sign.status.status1) {
                            $scope.compData.JS.respparam.total = Number($scope.compData.JS.respparam.total) + Number($scope.compData.JS.vaIncreased);
                            $scope.obj.signflag = '0';
                            $scope.signOtherComp = $scope.compData.JS.sign.option.option0;
                            $scope.rightbtnOption = $scope.compData.JS.sign.option.option2;
                            $scope.signRes = $scope.compData.JS.sign.text.text0.signRes;
                            $scope.signTips = $scope.compData.JS.sign.text.text0.signTips;
                            $scope.signTips1 = $scope.compData.JS.sign.text.text0.signTips1;
                            $scope.vaIncreased = $scope.compData.JS.vaIncreased;
                            $scope.commpanyname = $scope.obj.name;
                            $scope.golink = $scope.obj.link;
                            $scope.popDown();
                            coreService.fireEvent($scope.cid, 'coinIncreased', param);
                        } else if ($scope.compData.JS.status == $scope.compData.JS.sign.status.status4) {
                            $scope.obj.signflag = '0';
                            $scope.signOtherComp = $scope.compData.JS.sign.option.option1;
                            $scope.rightbtnOption = $scope.compData.JS.sign.option.option2;
                            $scope.signRes = $scope.compData.JS.sign.text.text1.signRes;
                            $scope.signTips = $scope.compData.JS.sign.text.text1.signTips;
                            $scope.signTips1 = "";
                            $scope.vaIncreased = "";
                            $scope.commpanyname = $scope.obj.name;
                            $scope.golink = $scope.obj.link;
                            $scope.popDown();
                        } else if ($scope.compData.JS.status == $scope.compData.JS.sign.status.status5) {
                            coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'updaterror', {
                                "errorcode": $scope.compData.JS.errorcode
                            });
                        } else {
                            $scope.compData.JS.sign.isFailed = true;
                            $scope.signOtherComp = $scope.compData.JS.sign.option.option1;
                            $scope.rightbtnOption = $scope.compData.JS.sign.option.option0;
                            $scope.signRes = $scope.compData.JS.sign.text.text2.signRes;
                            $scope.signTips = $scope.compData.JS.sign.text.text2.signTips;
                            $scope.signTips1 = "";
                            $scope.vaIncreased = "";
                            $scope.commpanyname = $scope.obj.name;
                            $scope.golink = $scope.obj.link;
                            $scope.compData.JS.vaIncreased = "";
                            $scope.popDown();
                        }
                    } else {
                        coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'updaterror', {
                            "errorcode": $scope.compData.JS.errorcode
                        });
                    }
                } else {
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'updaterror', {
                        "errorcode": $scope.compData.JS.errorcode
                    });
                }
            }
            ;
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $scope.compData.css = $scope.compData.CSS || {};
                $scope.compData.JS = $scope.compData.JS || {};
                $element.css($scope.compData.CSS);
                //coreService.fireEvent($element.attr('cid'), 'init',{"total": ""});
            }
            ;
            
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            
            $scope.eventMap['update'] = $scope.updateData;
            $scope.eventMap['signData'] = $scope.signData;
            $scope.eventMap['updateCoinsTotal'] = $scope.updateCoinsTotal;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'page';
            $scope.path = top.tlbs.templatePath;
            $scope.init();
        
        }
    }
}
]);
uiCore.directive('popupfeedback', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: 
        '<div style="display:none;">' 
        + '	  <div class="c60_fbar_bg_pop_block" ng-style="getbg_pop_blockStyle()" ng-click="$event.stopPropagation();"></div>' 
        + '    <div class="c60_fbar_new_center_pop">' 
        + '        <div class="c60_fbar_ncp_top">' 
        + '        	<div class="c60_fbar_ncp_tit">' 
        + '                <span class="c60_fbar_ncp_tit_txt" ng-bind="compData.JS.c60_fbar_ncp_tit_txt.JS.text"></span>' 
        + '                <span class="c60_fbar_ncp_tit_close" ccid="class="c60_fbar_ncp_tit_close" ng-click="c60_fbar_ncp_tit_closeClick()"></span>' 
        + '            </div>' 
        + '        <div style="height:12em;">' 
        + '        	<div class="c60_fbar_ncp_bottom" simplescroll>' 
        + '            	<div class="c60_fbar_ncpb_txt"><span ng-bind="compData.JS.c60_fbar_ncpb_txt.JS.text0"></span><span ng-bind="respData.feedback.question"></span></div>' 
        + '                <div class="c60_fbar_ncpb_txt"><span ng-bind="compData.JS.c60_fbar_ncpb_txt.JS.text1"></span><span class="c60_fbar_hwlfeedback"></span></div>' 
        + '            </div>' 
        + '        </div>' 
        
        + '        </div>' 
        + '    </div>' 
        + '</div>',
        
        scope: {},
        controller: ["$scope", "$element", "$attrs", "$timeout", 'coreService', 'coreUtils', 'Const', "$sce", 
        function($scope, $element, $attrs, $timeout, coreService, coreUtils, Const, $sce) {
            $scope.cid = $attrs.cid;
            $scope.compData = {
                "CSS": {},
                "JS": {}
            };
            $scope.eventMap = {};
            $scope.respData = {};
            $scope.trustAsHtml = function(text) {
                return $sce.trustAsHtml(text);
            }
            ;
            $scope.c60_fbar_ncp_tit_closeClick = function() {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_ncp_tit_close.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'closebtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_ncp_tit_close.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                top.tlbs.notificationCdrData = null ;
                $scope.hide();
            }
            ;
            $scope.getbg_pop_blockStyle = function() {
                if ($scope.compData.JS.bg_pop_block.JS.stateconfig.state == 0) {
                    return $scope.compData.JS.bg_pop_block.JS.stateconfig.state0;
                } else {
                    return $scope.compData.JS.bg_pop_block.JS.stateconfig.state1;
                }
            }
            ;
            
            //获取后台数据
            $scope.updateData = function(param) {
                if (param != null  && param != undefined) {
                    $scope.respData = param;
                    $element.css({
                        'display': 'block'
                    });
                    $scope.compData.JS.bg_pop_block.JS.stateconfig.state = 1;
                    angular.element($element[0].querySelector('.c60_fbar_hwlfeedback')).html(param.feedback.answer);
                }
            }
            ;
            $scope.eventMap['update'] = $scope.updateData;
            $scope.hide = function() {
                $scope.compData.JS.bg_pop_block.JS.stateconfig.state = 0;
                $element.css({
                    'display': 'none'
                });
            }
            ;
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
                /*$timeout(function() {
		                        $scope.$apply();
		                    });*/
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid) || {});
                $element.css($scope.compData.css || {});
            }
            ;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'popupfeedback';
            $scope.init();
        }
    }
}
]);
uiCore.directive('mine', function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        template: 
        '<div>' 
        
        + '   <div class="c60_fbar_bg_black_pop2" ng-style="getbg_black_popStyle()">' 
        + '    <div class="c60_fbar_tips_txt2" style="color:white;margin-top:0" ng-bind="compData.JS.bg_black_pop.JS.desc"></div>' 
        + '   </div>' 
        
        + '<div class="c60_fbar_my_con2" ng-style="getStyle(\'c60_fbar_my_con\')">' 
        + '   <div class="c60_fbar_my_top2 clearfloat" ng-style="getStyle(\'my_top\')" ng-show="compData.JS.c60_fbar_my_con.JS.isShow">' 
        + '    <div class="c60_fbar_my_img_txt2" ng-style="getStyle(\'my_img_txt\')">' 
        + '     <span class="c60_fbar_mybg_green2" ng-style="getStyle(\'c60_fbar_mybg_green\')" ng-show="compData.JS.c60_fbar_mybg_green.JS.isShow"></span>' 
        + '     <div class="c60_fbar_my_txt2" ng-style="getStyle(\'my_txt\')" ng-show="compData.JS.c60_fbar_c60_fbar_moblie.JS.isShow">' 
        + '      <p class="c60_fbar_moblie2" ng-bind="phoneFilter(revData.respparam.msisdn)" ng-style="getStyle(\'moblie\')"></p>' 
        + '     </div>' 
        + '    </div>' 
        + '    <div class="c60_fbar_attend_btn2" ccid="c60_fbar_attend_btn" ng-click="click(\'c60_fbar_attend_btn\');$event.stopPropagation();"  ng-show="compData.JS.c60_fbar_attend_btn.JS.isShow">' 
        + '     <a class="c60_fbar_attend_btn_link2" ng-style="getattend_btn_linkStyle()" ng-bind="getattend_btn_linkBtn()"></a>' 
        + '    </div>' 
        + '   </div>' 
        + '   <div class="c60_fbar_my_list_con2" ccid="c60_fbar_my_list_coin" ng-click="click(\'c60_fbar_my_list_coin\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_coin.JS.isShow">' 
        + '    <div class="c60_fbar_my_list2" ng-style="getStyle(\'my_list\')">' 
        + '     <div class="c60_fbar_my_list_detail2 clearfloat" ng-style="getStyle(\'my_list_detail\')">' 
        + '      <div class="c60_fbar_cointitle2" ng-style="getStyle(\'cointitle\')">' 
        + '       <span class="c60_fbar_my_coin2" ng-style="getStyle(\'c60_fbar_my_coin\')" ng-bind="compData.JS.c60_fbar_my_coin.JS.text"></span><span class="c60_fbar_coin_txt_bold" ng-bind="revData.respparam.total" ng-show="compData.JS.c60_fbar_coin_txt_bold.JS.isShow" ng-style="getStyle(\'c60_fbar_coin_txt_bold\')"></span>' 
        + '      </div>' 
        + '      <div class="c60_fbar_arrow_jump2">' 
        + '       <span class="c60_fbar_arrow_jump_text2" ng-show="compData.JS.c60_fbar_arrow_jump_text1.JS.isShow" ng-bind="compData.JS.c60_fbar_arrow_jump_text1.JS.text"></span>' 
        + '       <span class="c60_fbar_arrow_jump_ico2" ng-style="getStyle(\'c60_fbar_arrow_jump_ico1\')"></span>' 
        + '      </div>' 
        + '     </div>' 
        + '    </div>' 
        + '   </div>' 
        + ' <div class="c60_fbar_my_border_w" ng-show="compData.JS.c60_fbar_my_list_privilege.JS.isShow"><div class="c60_fbar_my_border"></div></div>' 
        + '   <div class="c60_fbar_my_list_con2 c60_fbar_my_list_con22" ccid="c60_fbar_my_list_privilege" ng-click="click(\'c60_fbar_my_list_privilege\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_privilege.JS.isShow">' 
        + '    <div class="c60_fbar_my_list2" ng-style="getStyle(\'my_list\')">' 
        + '     <div class="c60_fbar_my_list_detail2 clearfloat" ng-style="getStyle(\'my_list_detail\')">' 
        + '      <div class="c60_fbar_cointitle2" ng-style="getStyle(\'cointitle\')">' 
        + '       <span class="c60_fbar_set2" ng-style="getStyle(\'c60_fbar_privilege\')" ng-bind="compData.JS.c60_fbar_privilege.JS.text"></span><span class="c60_fbar_privilege_redpoint" ng-show="compData.JS.c60_fbar_my_list_privilege.JS.redPointShow"></span>' 
        + '      </div>' 
        + '      <div class="c60_fbar_arrow_jump2">' 
        + '       <span class="c60_fbar_arrow_jump_text2" ng-show="compData.JS.c60_fbar_arrow_jump_text2.JS.isShow" ng-bind="compData.JS.c60_fbar_arrow_jump_text2.JS.text"></span>' 
        + '       <span class="c60_fbar_arrow_jump_ico2" ng-style="getStyle(\'c60_fbar_arrow_jump_ico2\')"></span>' 
        + '      </div>' 
        + '     </div>' 
        + '    </div>' 
        + '   </div>' 
        + '   <div class="c60_fbar_my_list_con2" ccid="c60_fbar_my_list_set" ng-click="click(\'c60_fbar_my_list_set\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_set.JS.isShow">' 
        + '    <div class="c60_fbar_my_list2" ng-style="getStyle(\'my_list\')">' 
        + '     <div class="c60_fbar_my_list_detail2 clearfloat" ng-style="getStyle(\'my_list_detail\')">' 
        + '      <div class="c60_fbar_cointitle2" ng-style="getStyle(\'cointitle\')">' 
        + '       <span class="c60_fbar_set2" ng-style="getStyle(\'c60_fbar_set\')" ng-bind="compData.JS.c60_fbar_set.JS.text"></span>' 
        + '      </div>' 
        + '      <div class="c60_fbar_arrow_jump2">' 
        + '       <span class="c60_fbar_arrow_jump_text2" ng-show="compData.JS.c60_fbar_arrow_jump_text2.JS.isShow" ng-bind="compData.JS.c60_fbar_arrow_jump_text2.JS.text"></span>' 
        + '       <span class="c60_fbar_arrow_jump_ico2" ng-style="getStyle(\'c60_fbar_arrow_jump_ico2\')"></span>' 
        + '      </div>' 
        + '     </div>' 
        + '    </div>' 
        + '   </div>' 
        + '   <div class="c60_fbar_my_add_btn" ng-style="getStyle(\'c60_fbar_my_add_desktop\')" ng-show="compData.JS.c60_fbar_my_add_desktop.JS.isShow" ccid="c60_fbar_my_add_desktop" ng-click="click(\'c60_fbar_my_add_desktop\');$event.stopPropagation();" >' 
        + '     <span class="c60_fbar_my_add_btn_ico" ng-bind="compData.JS.c60_fbar_my_add_desktop_text.JS.text" ng-style="getStyle(\'c60_fbar_my_add_desktop_text\')" ></span>' 
        + '  </div>' 
        + '</div>' 
        + '</div>',
        scope: {},
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        'coreService', 
        'coreUtils', 
        'Const', 
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            //页面元素配置项
            $scope.compData = {
                "CSS": {},
                "JS": {
                    "stateconfig": {
                        "state": 0,
                        "state0": {
                            "background-color": "#fff",
                        },
                        "state1": {
                            "background-color": "#cacecd",
                        }
                    }
                }
            };
            $scope.getbg_black_popStyle = function() {
                if ($scope.compData.JS.bg_black_pop.JS.stateconfig.state == '1') {
                    return $scope.compData.JS.bg_black_pop.JS.stateconfig.state1;
                } else {
                    return $scope.compData.JS.bg_black_pop.JS.stateconfig.state0;
                }
            }
            ;
            $scope.getattend_btn_linkStyle = function() {
                if ($scope.compData.JS.attend_btn_link.JS.stateconfig.state == '0') {
                    return $scope.compData.JS.attend_btn_link.JS.stateconfig.state0;
                } else {
                    return $scope.compData.JS.attend_btn_link.JS.stateconfig.state1;
                }
            }
            ;
            $scope.getattend_btn_linkBtn = function() {
                if ($scope.compData.JS.attend_btn_link.JS.stateconfig.state == '0') {
                    return $scope.compData.JS.c60_fbar_attend_btn_link.JS.text1
                } else {
                    return $scope.compData.JS.c60_fbar_attend_btn_link.JS.text2;
                }
            }
            ;
            $scope.bg_black_popShow = function(msg) {
                $scope.compData.JS.bg_black_pop.JS.desc = msg;
                $scope.compData.JS.bg_black_pop.JS.stateconfig.state = '1';
                angular.element($element[0].querySelector('.c60_fbar_bg_black_pop2')).css({
                    'display': 'block'
                });
                setTimeout(function() {
                    //将弹框隐藏 
                    $scope.compData.JS.bg_black_pop.JS.stateconfig.state = '0';
                    angular.element($element[0].querySelector('.c60_fbar_bg_black_pop2')).css({
                        'display': 'none'
                    });
                }, parseInt($scope.compData.JS.bg_black_pop.JS.stateconfig.time) * 1000);
            }
            ;
            $scope.phoneFilter = function(input) {
                if (input == undefined)
                    return '';
                var ret = input.substring(0, 3) + "****" + input.substring(7);
                return ret;
            }
            ;
            $scope.getStyle = function(classname) {
                if ($scope.compData.JS[classname] && $scope.compData.JS[classname].CSS) {
                    return $scope.compData.JS[classname].CSS;
                }
            }
            ;
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
                /*$timeout(function() {
                         $scope.$apply();
                     });*/
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid) || {});
                $element.css($scope.compData.css || {});
                //                     coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'init',{'startNote':'1','noteNo':'10'});
            }
            ;
            //接收来自后台的数据
            $scope.getDataFromRet = function(inputData) {
                if (inputData && inputData.respparam) {
                    $scope.revData = inputData;
                    var ret = inputData.respparam;
                    //判断是否可以签到
                    if (ret.signflag == '1') {
                        $scope.compData.JS.attend_btn_link.JS.stateconfig.state = '0';
                    } else {
                        $scope.compData.JS.attend_btn_link.JS.stateconfig.state = '1';
                    }
                }
            }
            ;
            $scope.eventMap['getDataFromRet'] = $scope.getDataFromRet;
            $scope.signRet = function(inputData) {
                if (inputData && inputData.respparam) {
                    var ret = inputData.respparam;
                    if (ret.signtype == '111001') {
                        //签到成功
                        if (ret.status == '2015522' || ret.status == '2015524') {
                            $scope.compData.JS.attend_btn_link.JS.stateconfig.state = '1';
                            $scope.bg_black_popShow($scope.compData.JS.tips2 + ret.vaIncreased + $scope.compData.JS.tips3);
                            $scope.revData.respparam.total = Number($scope.revData.respparam.total) + Number(inputData.respparam.vaIncreased);
                            //var param={"respparam":inputData.respparam};
                            //coreService.fireEvent($scope.cid, 'updateCoinsTotal',param);
                        } else if (ret.status == '9206') {
                            //余额不足
                            $scope.compData.JS.attend_btn_link.JS.stateconfig.state = '1';
                            $scope.bg_black_popShow($scope.compData.JS.tips4);
                        } else {
                            //签到失败
                            angular.element($element[0].querySelector('.c60_fbar_attend_btn_link2')).css($scope.compData.JS.stateconfig.state0);
                            $scope.compData.JS.stateconfig.state = '0';
                            $scope.bg_black_popShow($scope.compData.JS.tips5);
                        }
                    } else {
                        //签到失败
                        angular.element($element[0].querySelector('.c60_fbar_attend_btn_link2')).css($scope.compData.JS.stateconfig.state0);
                        $scope.compData.JS.stateconfig.state = '0';
                        $scope.bg_black_popShow($scope.compData.JS.tips5);
                    }
                }
            }
            ;
            var myClick = {
                c60_fbar_my_list_coin: function(param) {
                    //跟踪话单
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_coin.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'coin')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_coin.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'coinclick');
                },
                c60_fbar_my_list_privilege: function(param) {
                    //跟踪话单
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_privilege.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'privilege')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_privilege.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'privilegeclick');
                },
                c60_fbar_my_list_set: function(param) {
                    //跟踪话单
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_set.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'set')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_set.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'mysetclick');
                },
                c60_fbar_attend_btn: function(param) {
                    if ($scope.compData.JS.stateconfig.state == '1') {
                        return false;
                    }
                    if ($scope.compData.JS.attend_btn_link.JS.stateconfig.state == '1') {
                        return false;
                    }
                    //跟踪话单
                    $scope.compData.JS.stateconfig.state = '1';
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_attend_btn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'attend')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_attend_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    angular.element($element[0].querySelector('.c60_fbar_attend_btn_link2')).css($scope.compData.JS.stateconfig.state1);
                    $scope.bg_black_popShow($scope.compData.JS.tips1);
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'myattendClick', {
                        "id": ""
                    });
                },
                c60_fbar_my_add_desktop: function(param) {
                    //*******************添加到桌面*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_add_desktop.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'desktop')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_add_desktop.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    var u = navigator.userAgent;
                    if (/(android|Android)/ig.test(u)) 
                    {
                        window.open($scope.compData.JS.c60_fbar_my_add_desktop.JS.androidurl);
                    } 
                    else if (/(iPhone|iPad|iOS|iphone|ipad|ios)/ig.test(u)) 
                    {
                        window.open($scope.compData.JS.c60_fbar_my_add_desktop.JS.iosurl);
                    } else if (u.indexOf('Windows Phone') > -1) {
                    
                    }
                }
            };
            //处理所有点击事件
            $scope.click = function(classname, param) {
                if (classname == undefined || classname == null ) {
                    return false;
                }
                switch (classname) 
                {
                case 'c60_fbar_my_list_coin':
                    myClick.c60_fbar_my_list_coin(param);
                    break;
                case 'c60_fbar_my_list_privilege':
                    myClick.c60_fbar_my_list_privilege(param);
                    break;
                case 'c60_fbar_my_add_desktop':
                    myClick.c60_fbar_my_add_desktop(param);
                    break;
                case 'c60_fbar_my_list_set':
                    myClick.c60_fbar_my_list_set(param);
                    break;
                case 'c60_fbar_attend_btn':
                    myClick.c60_fbar_attend_btn(param);
                    break;
                default:
                
                }
            }
            ;
            $scope.eventMap['signRet'] = $scope.signRet;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });
            
            $scope.updateCoinsTotal = function(param) {
                if (null  != param && null  != param.respparam && undefined != param.respparam && null  != param.respparam.vaIncreased && undefined != param.respparam.vaIncreased) {
                    $scope.revData.respparam.total = Number($scope.revData.respparam.total) + Number(param.respparam.vaIncreased);
                }
                if (param.respparam.status == '2015522' || param.respparam.status == '2015524') {
                    $scope.compData.JS.attend_btn_link.JS.stateconfig.state = '1';
                }
            }
            ;
            $scope.eventMap['updateCoinsTotal'] = $scope.updateCoinsTotal;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = "cmine";
            $scope.init();
        }
    };
});
uiCore.directive('iholdert', [
'coreService', 
'coreUtils', 
'$timeout', 
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: '<div {{param}} ng-transclude></div>',
        scope: {
            param: '=param'
        },
        require: '^pid',
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        '$compile', 
        '$templateCache', 
        '$timeout', 
        function($scope, $element, $attrs, $compile, $templateCache, $timeout) {
            $scope.cid = $attrs.cid;
            $scope.classid = '.' + $scope.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {},
                'JS': {
                    'clickable': false,
                    'animation': false,
                    'clickevent': '',
                    'stateconfig': {
                        'stylestates': '',
                        'extrastates': '',
                        'cstylestate': '',
                        'cextrastate': '',
                        'state': 0,
                        'estate': 0,
                        'state0': {},
                        'state1': {}
                    }
                }
            };
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $scope.processStyle();
                $scope.updateStyle();
                if (null  != $attrs.templateurl) {
                    $scope.getTemplate();
                }
            }
            ;
            $scope.getHolderStyle = function() {
                if (null  != $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]) {
                    return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]);
                }
            }
            ;
            $scope.handleClick = function() {
                coreService.fireEvent($scope.cid, ($scope.compData.JS.clickevent || '') + 'click' + $scope.compData.JS.stateconfig.state);
            }
            ;
            $scope.changeState = function(stateObject, deferred) {
                if (null  != stateObject && null  != stateObject.cstate) {
                    if ($scope.compData.JS.stateconfig.state != stateObject.cstate) {
                        $scope.compData.JS.stateconfig.state = stateObject.cstate;
                        $scope.updateStyle();
                        $scope.$evalAsync(
                        function() {
                            if (null  != deferred) {
                                if ($scope.compData.JS.animation) {
                                    //var _transitionEnd = /webkit/i.test(navigator.userAgent) ? 'webkitTransitionEnd' : 'transitionend';
                                    $element.on(top.tlbs.transitionendEvent, function(e) {
                                        deferred.resolve();
                                    });
                                } else {
                                    deferred.resolve();
                                }
                            }
                        });
                    } else if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            }
            ;
            $scope.changeExtraState = function(stateObject, deferred) {
                if ($scope.compData.JS.stateconfig.estate != stateObject.cstate) {
                    $scope.compData.JS.stateconfig.estate = stateObject.cstate;
                    $scope.updateStyle();
                }
                if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            $scope.hide = function() {
                $element.css({
                    'display': 'none'
                });
            }
            ;
            
            $scope.show = function(data) {
                $element.css({
                    'display': 'block'
                });
                var time = $scope.compData.JS.closetime;
                if (time) {
                    $timeout($scope.hide, time);
                }
            
            }
            ;
            $scope.eventMap['changeState'] = $scope.changeState;
            $scope.eventMap['hide'] = $scope.hide;
            $scope.eventMap['show'] = $scope.show;
            $scope.eventMap['changeExtraState'] = $scope.changeExtraState;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
            });
            $scope.$watch($scope.param, function(newValue) {
                if ($scope.param) {
                    $scope.compData = $scope.param;
                }
            });
            $scope.processStyle = function() {
                var cssData = JSON.stringify($scope.compData.CSS);
                cssData = $scope.formatStyleData(cssData);
                coreService.commonServiceRef.appendStyle($scope.classid, '', cssData);
                var styleStateArray = $scope.compData.JS.stateconfig.stylestates.split('|');
                var styleStateArrayLength = styleStateArray.length;
                var extraStateArray = $scope.compData.JS.stateconfig.extrastates.split('|');
                var extraStateArrayLength = extraStateArray.length;
                for (var i = 0; i < styleStateArrayLength; i++) {
                    var styleState = styleStateArray[i];
                    if (styleState.length > 0) {
                        cssData = JSON.stringify($scope.compData.JS.stateconfig[styleState]);
                        cssData = $scope.formatStyleData(cssData);
                        coreService.commonServiceRef.appendStyle($scope.classid, '.' + styleState, cssData);
                        for (var j = 0; j < extraStateArrayLength; j++) {
                            var extraState = extraStateArray[j];
                            if (extraState.length > 0) {
                                cssData = JSON.stringify($scope.compData.JS.stateconfig[extraState]);
                                cssData = $scope.formatStyleData(cssData);
                                coreService.commonServiceRef.appendStyle($scope.classid, '.' + styleState + '.' + extraState, cssData);
                            }
                        }
                    }
                }
                $element.addClass($scope.cid);
                if (null  != $scope.compData.JS.stateconfig.state) {
                    var currentState = 'state' + $scope.compData.JS.stateconfig.state;
                    $scope.compData.JS.stateconfig.stylestates = currentState;
                }
            }
            ;
            $scope.formatStyleData = function(styleData) {
                styleData = styleData.replace(/","/g, ';').replace(/":"/g, ':').replace(/\\/g, '').replace(/{"/, '{').replace(/"}/, '}');
                return styleData;
            }
            ;
            $scope.updateStyle = function() {
                $element.removeClass($scope.compData.JS.stateconfig.cstylestate);
                $element.removeClass($scope.compData.JS.stateconfig.cextrastate);
                $scope.compData.JS.stateconfig.cstylestate = 'state' + $scope.compData.JS.stateconfig.state;
                $element.addClass($scope.compData.JS.stateconfig.cstylestate);
                if ($scope.compData.JS.stateconfig.state != $scope.compData.JS.stateconfig.estate) {
                    $scope.compData.JS.stateconfig.cextrastate = 'state' + $scope.compData.JS.stateconfig.estate;
                    $element.addClass($scope.compData.JS.stateconfig.cextrastate);
                }
            }
            ;
            $scope.getTemplate = function() {
                var elementTemplateCache = $templateCache.get($attrs.templateurl);
                $element.html(elementTemplateCache);
                $compile($element.contents())($scope);
            }
            ;
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'iholdert';
            scope.init();
        }
    };
}
]);
uiCore.directive('activity', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div><div class="c60_fbar_activitywrapper">' + '<div class="c60_fbar_wrapper1">' + '<div class="c60_fbar_activity" simplescroll>' 
        
        + '<div class="c60_fbar_taocan_result_con">' + '<div class="c60_fbar_succ_img_con"><img class="c60_fbar_succ_img_act"  ng-src="{{compData.JS.statusconfig.status.imgUrl}}"/></div>' + '<div class="c60_fbar_tips_txt" ng-bind="compData.JS.statusconfig.status.tipstxt"></div>' + '<div class="c60_fbar_result_btn" ccid="c60_fbar_link_btn"><a class="c60_fbar_link_btn" ng-bind="compData.JS.statusconfig.status.btntxt" ng-click="returnclick()"></a></div>' + '</div>' 
        
        + '<ul class="c60_fbar_imgTitleDescList">' + '<li ng-repeat="imgTitleDesc in compData.JS.imgTitleDescs | objectSort: \'priority\'" ng-class="{\'c60_fbar_imgTitleDesc\':true}">' + '<a ng-click="imageclick(imgTitleDesc,$index)" ccid="c60_fbar_link_click"><img ng-src="{{imgTitleDesc.imageurl}}" ng-class="{\'c60_fbar_imgTitleDesc-Img\':true}"/></a>' + '<p ng-class="{\'c60_fbar_imgTitleDesc-Title\':true}" ng-bind="imgTitleDesc.title"></p>' + '<p ng-class="{\'c60_fbar_imgTitleDesc-Desc1\':true}" ng-bind="imgTitleDesc.description"></p></li>' + '</ul>' + '</div>' + '</div>' + '</div></div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 
        'coreUtils', 
        'Const', 
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.compData = {
                CSS: {},
                JS: {}
            };
            $scope.eventMap = {};
            
            
            $scope.updateData = function(param) {
                if (param.respparam) {
                    if (param.respparam.advertisement.maxprioritylist && param.respparam.advertisement.maxprioritylist.length > 0) {
                        angular.element($element[0].querySelector('.c60_fbar_imgTitleDescList')).css({
                            'display': 'block'
                        });
                        angular.element($element[0].querySelector('.c60_fbar_taocan_result_con')).css({
                            'display': 'none'
                        });
                        $scope.compData.JS.imgTitleDescs = [];
                        $scope.temp = [param.respparam.advertisement.maxprioritylist || [], param.respparam.advertisement.minprioritylist || []];
                        for (var i = 0; i < $scope.temp.length; i++) {
                            for (var j = 0; j < $scope.temp[i].length; j++) {
                                $scope.compData.JS.imgTitleDescs.push($scope.temp[i][j]);
                            }
                        }
                    } else {
                        angular.element($element[0].querySelector('.c60_fbar_imgTitleDescList')).css({
                            'display': 'none'
                        });
                        angular.element($element[0].querySelector('.c60_fbar_taocan_result_con')).css({
                            'display': 'block'
                        });
                    }
                }
            }
            ;
            
            $scope.errorupdate = function() {
                angular.element($element[0].querySelector('.c60_fbar_imgTitleDescList')).css({
                    'display': 'none'
                });
                angular.element($element[0].querySelector('.c60_fbar_taocan_result_con')).css({
                    'display': 'block'
                });
            }
            ;
            
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                var imgUrl = properties.JS.statusconfig.status.imgUrl;
                properties.JS.statusconfig.status.imgUrl = imgUrl.replace(/'/g, '');
                $scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
                $element.css($scope.compData.css || {});
                coreService.fireEvent($element.attr('cid'), 'init');
            }
            ;
            
            $scope.returnclick = function() {
                
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'btn')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'goFirstPage');
            }
            ;
            
            $scope.imageclick = function(imgTitleDesc, index) {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_link_click.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': imgTitleDesc.CONTENTID
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_link_click.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                
                coreService.fireEvent($element.attr('cid'), 'gotoPage', {
                    linktype: imgTitleDesc.linktype,
                    url: imgTitleDesc.weblink
                });
            }
            
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            $scope.eventMap['update'] = $scope.updateData;
            $scope.eventMap['errorupdate'] = $scope.errorupdate;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'page';
            $scope.init();
        }
    }
}
]);
uiCore.filter("objectSort", function() {
    var listSort = function(list, field) {
        if (list == undefined) {
            return
        }
        ;
        for (var i = 0; i < list.length - 1; i++) {
            for (var j = 0; j < list.length - i - 1; j++) {
                if (list[j][field] > list[j + 1][field]) {
                    var temp = list[j];
                    list[j] = list[j + 1];
                    list[j + 1] = temp;
                }
            }
        }
        return list;
    }
    ;
    return listSort;
});
uiCore.directive('loadingmask', function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_loadingmask">' 
        + '<div class="c60_fbar_loadingmask_datouwang8">' 
        + '<div class="c60_fbar_loadingmask_datouwang8-container c60_fbar_loadingmask_container1">' 
        + '<div class="c60_fbar_loadingmask_circle1 c60_fbar_loadingmask_container_div"></div>' 
        + '<div class="c60_fbar_loadingmask_circle2 c60_fbar_loadingmask_container1_circle2 c60_fbar_loadingmask_container_div"></div>' 
        + '<div class="c60_fbar_loadingmask_circle3 c60_fbar_loadingmask_container1_circle3 c60_fbar_loadingmask_container_div"></div>' 
        + '<div class="c60_fbar_loadingmask_circle4 c60_fbar_loadingmask_container1_circle4 c60_fbar_loadingmask_container_div"></div>' 
        + '</div>' 
        + '<div class="c60_fbar_loadingmask_datouwang8-container c60_fbar_loadingmask_container2">' 
        + '<div class="c60_fbar_loadingmask_circle1 c60_fbar_loadingmask_container2_circle1 c60_fbar_loadingmask_container_div"></div>' 
        + '<div class="c60_fbar_loadingmask_circle2 c60_fbar_loadingmask_container2_circle2 c60_fbar_loadingmask_container_div"></div>' 
        + '<div class="c60_fbar_loadingmask_circle3 c60_fbar_loadingmask_container2_circle3 c60_fbar_loadingmask_container_div"></div>' 
        + '<div class="c60_fbar_loadingmask_circle4 c60_fbar_loadingmask_container2_circle4 c60_fbar_loadingmask_container_div"></div>' 
        + '</div>' 
        + '<div class="c60_fbar_loadingmask_datouwang8-container c60_fbar_loadingmask_container3">' 
        + '<div class="c60_fbar_loadingmask_circle1 c60_fbar_loadingmask_container3_circle1 c60_fbar_loadingmask_container_div"></div>' 
        + '<div class="c60_fbar_loadingmask_circle2 c60_fbar_loadingmask_container3_circle2 c60_fbar_loadingmask_container_div"></div>' 
        + '<div class="c60_fbar_loadingmask_circle3 c60_fbar_loadingmask_container3_circle3 c60_fbar_loadingmask_container_div"></div>' 
        + '<div class="c60_fbar_loadingmask_circle4 c60_fbar_loadingmask_container3_circle4 c60_fbar_loadingmask_container_div"></div>' 
        + '</div>' 
        + '</div>' 
        + '<div class="c60_fbar_loadingmask_tips_txt_loading" ng-bind="compData.js.loadingtext"></div>' 
        + '</div>',
        scope: {},
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        'coreService', 
        'coreUtils', 
        'Const', 
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            var timeout = null ;
            $scope.compData = {};
            $scope.eventMap = {};
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.js = properties.JS || {};
                $scope.compData.js.loadingtext = $scope.compData.js.loadingtext || '加载中';
                $element.css($scope.compData.css);
            }
            ;
            $scope.show = function() {
                $element.css({
                    "display": "block"
                });
                timeout = setTimeout($scope.hide, $scope.compData.js.autohide || 10000)
            }
            ;
            
            $scope.hide = function() {
                $element.css({
                    "display": "none"
                });
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null ;
                }
            
            }
            ;
            $scope.eventMap['show'] = $scope.show;
            $scope.eventMap['hide'] = $scope.hide;
            $scope.$on($attrs['cid'] + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });
        
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = "loadingmask";
            $scope.init();
        }
    };
});
uiCore.directive('ipopupapprec', [function() {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: '<div ng-click="link()" ccid="c60_fbar_tanchuang_bottom" class="c60_fbar_tanchuang_bottom">' + 
        '<div class="c60_fbar_guess_mark_coin c60_fbar_clearfloat"><div class="c60_fbar_guess_mark_img" ng-style="compData.JS.guess_mark_img.CSS"></div><div class="c60_fbar_mark_txt"><div class="c60_fbar_mark_big_txt" ng-bind="compData.JS.mark_big_txt.text"></div><div class="c60_fbar_mark_small_txt" ng-bind="compData.JS.mark_small_txt.text"></div></div></div>' + 
        '<div class="c60_fbar_tuisong_name c60_fbar_clearfloat"><span class="c60_fbar_tuisong_name_txt" ng-bind="compData.JS.tuisong_name_txt.text"></span></div></div>',
        scope: {},
        require: '^pid',
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        'coreService', 
        'coreUtils', 
        'Const', 
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.compData = {
                'CSS': {},
                'JS': {
                
                }
            };
            $scope.link = function() {
                //add by h00278783 点击弹框，上报状态消息-----------start---
                if (top.tlbs.messageid != "") {
                    coreService.fireEvent($scope.cid, 'messagestatuschange', {
                        "messageid": top.tlbs.messageid
                    });
                }
                //add by h00278783 点击弹框，上报状态消息-----------end---
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.tanchuang_bottom.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'linkapp'),
                        'iseComp': '1'
                    };
                    coreUtils.cdrService($scope.compData.JS.tanchuang_bottom.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($element.attr('cid'), 'linkapp');
            
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.CSS = properties.CSS || {};
                $scope.compData.JS = properties.JS || {};
                $element.css(properties.CSS);
                coreService.fireEvent($element.attr('cid'), 'init');
            }
            ;
            
            
            
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
        
        }
        
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'ipopupapprec';
            scope.init();
        }
    };
}
]);
uiCore.directive('popupimgtext', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_popupimgtext"><div class="c60_fbar_wchbg_pop_block"></div>' + '<div class="c60_fbar_wchpop_block">' + '<div class="c60_fbar_wchimg_txt_info">' + '<table cellpadding="0" cellspacing="0" class="c60_fbar_wchimg_txt_table">' + '<tr>' + '<td><span class="c60_fbar_wchadv_img" ng-style="revData.imgstyle"></span></td>' + '<td style="display:inline-block;">' + '<div class="c60_fbar_wchpop_txt4_tit" ng-bind="revData.title" ng-style="pureTextStyle2(\'title\')"></div>' + '<div class="c60_fbar_wchpop_txt4"  ng-bind-html="to_trusted(revData.titledesc)" ng-style="pureTextStyle2(\'titledesc\')"></div>' + '</td>' + '</tr>' + '</table>' + '</div>' + '<div class="c60_fbar_wchimg_txt_btn clearfloat">' + '<div class="c60_fbar_wchleft_itbtn" ccid="c60_fbar_popupimgtext_btnclose"  ng-bind="pureTextBtn(\'cancel\')" ng-style="pureTextStyle2(\'cancel\')"></div>' + '<div class="c60_fbar_wchright_itbtn" ccid="c60_fbar_popupimgtext_btn"  ng-bind="pureTextBtn(\'detail\')" ng-style="pureTextStyle2(\'detail\')" ></div>' + '</div>' + '</div>' + '</div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", "$timeout", 'coreService', 'coreUtils', 'Const', '$sce', 
        function($scope, $element, $attrs, $timeout, coreService, coreUtils, Const, $sce) {
            $scope.cid = $attrs.cid;
            $scope.compData = {};
            $scope.eventMap = {};
            $scope.revData = {};
            $scope.to_trusted = function(text) {
                if (text != null  && text != undefined) {
                    text = text + '';
                    return $sce.trustAsHtml(text.replace(/\n/g, "<br/>"));
                } else {
                    return "";
                }
            }
            ;
            //获取后台数据
            $scope.updateData = function(param) {
                $element.css({
                    'display': 'block'
                });
                if (param != null  && param != undefined) {
                    if (param.campaign != null  && param.campaign != undefined) {
                        top.tlbs.messageid = param.messageid || "";
                        var temp = param.campaign;
                        $scope.revData.title = temp.name;
                        $scope.revData.titledesc = temp.desc;
                        $scope.revData.imgstyle = $scope.compData.JS.popuptitleconfig.JS.stateconfig.state2;
                        $scope.revData.imgstyle['background-image'] = 'url(' + temp.image + ')'
                        $scope.revData.url = temp.url;
                        $scope.revData.linkType = temp.linkType;
                    } else {
                        $scope.revData.title = '';
                        $scope.revData.titledesc = '';
                        $scope.revData.url = $scope.compData.JS.popupbtnconfig.JS.url;
                        $scope.revData.linkType = $scope.compData.JS.popupbtnconfig.JS.linktype;
                    }
                }
                var time = $scope.compData.JS.closetime;
                //add by h00278783 当植入时候弹框，需要自动隐藏，消息中心不需要自动隐藏------start-----
                if (top.tlbs.messageid != "") {
                    $timeout(function() {
                        if ($element.css('display') != 'none') {
                            top.tlbs.notificationCdrData = null ;
                        }
                        $scope.hide();
                    }, time);
                }
                //add by h00278783 当植入时候弹框，需要自动隐藏，消息中心不需要自动隐藏------end-----
            }
            ;
            $scope.hide = function() {
                $element.css({
                    'display': 'none'
                });
            }
            ;
            var _touchstart = Const.touchEvent.start
              , 
            container = angular.element($element[0].querySelector('.c60_fbar_wchleft_itbtn'))
              , 
            container2 = angular.element($element[0].querySelector('.c60_fbar_wchright_itbtn'));
            
            container.bind(_touchstart, function(e) {
                e.stopPropagation();
                e.preventDefault();
                _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                $element.css({
                    'display': 'none'
                });
                //add by h00278783 点击弹框，上报状态消息-----------start---
                if (top.tlbs.messageid != "") {
                    coreService.fireEvent($scope.cid, 'messagestatuschange', {
                        "messageid": top.tlbs.messageid
                    });
                }
                //add by h00278783 点击弹框，上报状态消息-----------end---
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.popupbtnconfig.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'closebtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.popupbtnconfig.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                top.tlbs.notificationCdrData = null ;
            });
            container2.bind(_touchstart, function(e) {
                e.stopPropagation();
                e.preventDefault();
                _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                $element.css({
                    'display': 'none'
                })
                //add by h00278783 点击弹框，上报状态消息-----------start---
                if (top.tlbs.messageid != "") {
                    coreService.fireEvent($scope.cid, 'messagestatuschange', {
                        "messageid": top.tlbs.messageid
                    });
                }
                //add by h00278783 点击弹框，上报状态消息-----------end---
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.popupbtnconfig.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'returnbtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.popupbtnconfig.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                //window.open($scope.revData.url);
                coreService.fireEvent($element.attr('cid'), 'gotoPage', {
                    "linktype": $scope.revData.linkType,
                    "url": $scope.revData.url
                });
            });
            $scope.pureTextStyle2 = function(type) {
                if (type != null  && type != undefined) {
                    switch (type) {
                    case 'title':
                        return $scope.compData.JS.popuptitleconfig.JS.stateconfig.state0;
                        break;
                    case 'titledesc':
                        return $scope.compData.JS.popuptitleconfig.JS.stateconfig.state1;
                        break;
                    case 'cancel':
                        return $scope.compData.JS.popupbtnconfig.JS.stateconfig.state0;
                        break;
                    case 'detail':
                        return $scope.compData.JS.popupbtnconfig.JS.stateconfig.state1;
                        break;
                    
                    default:
                        break;
                    }
                }
            }
            ;
            $scope.pureTextBtn = function(type) {
                if (type != null  && type != undefined) {
                    switch (type) {
                    case 'cancel':
                        return $scope.compData.JS.popupbtnconfig.JS.stateconfig.title0;
                        break;
                    case 'detail':
                        return $scope.compData.JS.popupbtnconfig.JS.stateconfig.title1;
                        break;
                    default:
                        break;
                    }
                }
            }
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData = coreUtils.extendDeep($scope.compData, properties);
                $element.css($scope.compData.css || {});
                coreService.fireEvent($element.attr('cid'), 'init');
            }
            ;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            $scope.eventMap['update'] = $scope.updateData;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'page';
            $scope.init();
        }
    }
}
]);
uiCore.directive('iappsearch', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: 
        '<div>' 
        + '<div class="c60_fbar_search">' 
        + '<div class="c60_fbar_search_box">' 
        + '<form class="c60_fbar_search_innerbox">' 
        + '<div class="c60_fbar_search_text">' 
        + '<input id="searchinput" type="text" name="fname" ng-model="searchkeys" class="c60_fbar_search_input1" placeholder="搜索应用"/>' 
        + '</div>' 
        + '<div class="c60_fbar_search_submit">' 
        + '<input type="submit" ccid="c60_fbar_search_submit" class="c60_fbar_search_input2" ng-click="submit()"/>' 
        + '</div>' 
        + '</form>' 
        + '</div>' 
        + '</div>' 
        + '</div>',
        
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 
        'coreUtils', 
        'Const', function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.compData = {};
            $scope.eventMap = {};
            $scope.changeStyle = function() {
            
            }
            
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
                angular.element($element[0].querySelector(".c60_fbar_search")).css($scope.compData.CSS || {});
                coreService.fireEvent($element.attr('cid'), 'init');
            }
            ;
            
            $scope.searchkeys = "";
            
            $scope.queryWoChain = function(param) {
                if (param && param.respparam) {
                    $scope.queryWoChain1 = param.respparam.session;
                }
            }
            ;
            
            $scope.submit = function() {
                var url1 = $scope.compData.JS.searchurl.iframeurl;
                if ($scope.queryWoChain1) {
                    if ($scope.queryWoChain1.auth == null  || $scope.queryWoChain1.auth == undefined) {
                        $scope.queryWoChain1.auth = "";
                    }
                    if ($scope.queryWoChain1.jsessionid == null  || $scope.queryWoChain1.jsessionid == undefined) {
                        $scope.queryWoChain1.jsessionid = "";
                    }
                    url1 = url1.replace("{jsessionid}", $scope.queryWoChain1.jsessionid);
                    url1 = url1.replace("{auth}", $scope.queryWoChain1.auth);
                
                } else {
                    url1 = url1.replace("{jsessionid}", "");
                    url1 = url1.replace("{auth}", "");
                }
                
                //mod by y00131156 at 20150821  begin
                //用户输入需要调用后台服务加密
                if ($scope.compData.JS.encodeflag != '0') {
                    var onSuccess = function(data, status, headers) {
                        url1 = url1.replace("{searchkeys}", (data.respparam.appsearch || {}).encodedstr || '');
                        coreService.fireEvent($scope.cid, 'urltranslate', {
                            "url": url1
                        });
                    }
                    ;
                    var onError = function() {
                        url1 = url1.replace("{searchkeys}", '');
                        coreService.fireEvent($scope.cid, 'urltranslate', {
                            "url": url1
                        });
                    }
                    ;
                    coreUtils.sendRequest($scope.compData.JS.encodeservcie || 'encodeservice', {
                        'str': encodeURI($scope.searchkeys),
                        'encodetype': $scope.compData.JS.encodetype || 'DES'
                    }, onSuccess, onError);
                } else {
                    url1 = url1.replace("{searchkeys}", $scope.searchkeys);
                    coreService.fireEvent($scope.cid, 'urltranslate', {
                        "url": url1
                    });
                }
                
                //url1=url1.replace("{searchkeys}",$scope.searchkeys);
                //coreService.fireEvent($scope.cid,'urltranslate',{"url":url1});
                //mod by y00131156 at 20150821  end
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_search_submit.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'sub')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_search_submit.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
            }
            $scope.hide = function() {
                $scope.compData.CSS.display = 'none';
                $element.css($scope.compData.CSS);
            }
            ;
            $scope.show = function() {
                $scope.compData.CSS.display = 'block';
                $element.css($scope.compData.CSS);
            }
            ;
            $scope.eventMap['querywo1'] = $scope.queryWoChain;
            $scope.eventMap['hide'] = $scope.hide;
            $scope.eventMap['show'] = $scope.show;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'iappsearch';
            $scope.init();
        }
    }
}
]);
uiCore.directive('guesspeek', function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_c60_toolbar_aodi_con">' + '<span class="c60_fbar_c60_toolbar_aodi_img" ccid="c60_toolbar_aodi_img" ng-style="getStyle(\'c60_toolbar_aodi_img\')" ng-click="click(\'c60_toolbar_aodi_img\')"></span>' + '<span class="c60_fbar_c60_toolbar_aodi_close" ccid="c60_fbar_c60_toolbar_aodi_close" ng-style="getStyle(\'c60_toolbar_aodi_close\')" ng-click="click(\'c60_toolbar_aodi_close\');$event.stopPropagation();" ng-bind="compData.JS.c60_toolbar_aodi_close.JS.text"></span>' + '</div>',
        scope: {},
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        'coreService', 
        'coreUtils', 
        'Const', 
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                "CSS": {},
                "JS": {}
            };
            var myClick = {
                //跳转到第三方页面
                c60_toolbar_aodi_img: function(param) {
                    if ($scope.compData.JS.compdata.imgLink) {
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_toolbar_aodi_img.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'pictClk')
                            };
                            coreUtils.cdrService($scope.compData.JS.c60_toolbar_aodi_img.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                        window.open($scope.compData.JS.compdata.imgLink);
                    }
                
                },
                c60_toolbar_aodi_close: function(param) {
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_toolbar_aodi_close.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'close')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_toolbar_aodi_close.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'goback');
                }
            };
            $scope.getStyle = function(classname) {
                if ($scope.compData.JS[classname] && $scope.compData.JS[classname].CSS) {
                    return $scope.compData.JS[classname].CSS;
                }
            }
            ;
            //处理所有点击事件
            $scope.click = function(classname, param) {
                if (classname == undefined || classname == null ) {
                    return false;
                }
                switch (classname) {
                case 'c60_toolbar_aodi_img':
                    myClick.c60_toolbar_aodi_img(param);
                    break;
                case 'c60_toolbar_aodi_close':
                    //返回到猜品牌页面
                    myClick.c60_toolbar_aodi_close(param);
                    break;
                default:
                
                }
            }
            ;
            $scope.getDataInit = function(inputData) {
                if (inputData != undefined && Object.keys(inputData).length > 0) {
                    $scope.compData.JS.compdata = inputData;
                    if ($scope.compData.JS.compdata && $scope.compData.JS.compdata.imgUrl) {
                        angular.element($element[0].querySelector('.c60_fbar_c60_toolbar_aodi_img')).css('background-image', 'url(' + $scope.compData.JS.compdata.imgUrl + ')');
                    }
                }
            }
            ;
            $scope.eventMap['getDataInit'] = $scope.getDataInit;
            
            //处理所有元素样式
            $scope.getStyle = function(classname) {
                if (classname == undefined || classname == null ) {
                    return false;
                }
                if ($scope.compData.JS[classname] && $scope.compData.JS[classname].CSS) {
                    return $scope.compData.JS[classname].CSS;
                }
            }
            ;
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid) || {});
                $element.css($scope.compData.css || {});
            }
            ;
            //接收来自后台的数据
            $scope.getDataFromRet = function(inputData) {
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'tuisuccess');
                //						$scope.revData = inputData;
            }
            ;
            $scope.eventMap['getDataFromRet'] = $scope.getDataFromRet;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });
        
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = "guesspeek";
            $scope.init();
        }
    };
});
uiCore.directive('my', function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        template: '<div>' + '<div class="c60_fbar_mine_result_waiting"><div class="c60_fbar_datouwang8"><div class="c60_fbar_datouwang8-container c60_fbar_container1"><div class="c60_fbar_circle1 c60_fbar_container_div"></div><div class="c60_fbar_circle2 c60_fbar_container1_circle2 c60_fbar_container_div"></div><div class="c60_fbar_circle3 c60_fbar_container1_circle3 c60_fbar_container_div"></div><div class="c60_fbar_circle4 c60_fbar_container1_circle4 c60_fbar_container_div"></div></div><div class="c60_fbar_datouwang8-container c60_fbar_container2"><div class="c60_fbar_circle1 c60_fbar_container2_circle1 c60_fbar_container_div"></div><div class="c60_fbar_circle2 c60_fbar_container2_circle2 c60_fbar_container_div"></div><div class="c60_fbar_circle3 c60_fbar_container2_circle3 c60_fbar_container_div"></div><div class="c60_fbar_circle4 c60_fbar_container2_circle4 c60_fbar_container_div"></div></div><div class="c60_fbar_datouwang8-container c60_fbar_container3"><div class="c60_fbar_circle1 c60_fbar_container3_circle1 c60_fbar_container_div"></div><div class="c60_fbar_circle2 c60_fbar_container3_circle2 c60_fbar_container_div"></div><div class="c60_fbar_circle3 c60_fbar_container3_circle3 c60_fbar_container_div"></div><div class="c60_fbar_circle4 c60_fbar_container3_circle4 c60_fbar_container_div"></div></div></div><div class="c60_fbar_tips_txt_loading ng-binding" ng-bind="compData.JS.loadingtext.JS.textdata">爱我，别走~~</div></div><div class="c60_fbar_mine_result" ><div><div class="c60_fbar_mine_result_con" ><div class="c60_fbar_mine_result_con_img"><span class="c60_fbar_mine_result_con_img_span" ng-show="compData.JS.c60_fbar_mine_result.JS.isShow"   ng-style="getStyle(\'c60_fbar_mine_result\')"></span></div><div class="c60_fbar_mine_result_title " ng-show="compData.JS.c60_fbar_mine_result.JS.isShow" ng-bind="compData.JS.c60_fbar_mine_result.JS.title"></div><div class="c60_fbar_mine_result_btn" ><a class="c60_fbar_my_result_link_btn" ng-show="compData.JS.c60_fbar_my_result_link_btn.JS.isShow" ng-click="click(\'c60_fbar_my_result_link_btn\');$event.stopPropagation();" ng-bind="compData.JS.c60_fbar_my_result_link_btn.JS.text"  ng-style="getStyle(\'c60_fbar_my_result_link_btn\')"></a></div></div></div></div>' + '<div class="c60_fbar_mine_tips" ng-style="getStyle(\'c60_fbar_mine_tips\')"><div class="c60_fbar_mine_tipstext" ng-style="getStyle(\'c60_fbar_mine_tipstext\')" ng-bind="compData.JS.c60_fbar_mine_tipstext.JS.waitmessage"></div></div><div class="c60_fbar_mine_pop_block"></div>' + '   <div class="c60_fbar_memberday_pop">' + '    <div class="c60_fbar_memberday_pop_top">' + '      <div class="c60_fbar_memberday_pop_tit">' + '         <span class="c60_fbar_memberday_pop_tit_txt" ng-bind="compData.JS.c60_fbar_my_head_member_tips.JS.title"></span>' + '         <span class="c60_fbar_memberday_pop_tit_close"  ccid="c60_fbar_my_tips_closebtn" ng-click="click(\'c60_fbar_my_tips_closebtn\');$event.stopPropagation();" ng-style="getStyle(\'c60_fbar_my_tips_closebtn\')"></span>' + '     </div>' + '     </div>' + '     <div class="c60_fbar_memberday_pop_bottom">' + '       <div class="c60_fbar_memberday_pop_bottom_txt" ng-bind-html="to_trusted(compData.JS.c60_fbar_my_head_member_tips.JS.text)"></div>' + '     </div>' + '   </div>	' + '   <div class="c60_fbar_qiandao_pop">' + '      <div class=" c60_fbar_qiandao_pop_top">' + '        <div class="c60_fbar_qiandao_pop_tit">' + '           <span class="c60_fbar_qiandao_pop_tit_txt" ng-bind="compData.JS.c60_fbar_my_head_attend_tips.JS.title"></span>' + '           <span class="c60_fbar_qiandao_pop_tit_close" ccid="c60_fbar_my_tips_closebtn" ng-click="click(\'c60_fbar_my_tips_closebtn\');$event.stopPropagation();"  ng-style="getStyle(\'c60_fbar_my_tips_closebtn\')"></span>' + '       </div>' + '     </div>' + '     <div class="c60_fbar_qiandao_pop_bottom" ng-show="signResultFlag==0">' + '       <div class="c60_fbar_qiandao_pop_bottom_txt" ng-show="vaIncreasedFlag==0"><i ng-bind="compData.JS.c60_fbar_my_head_attend_tips.JS.resultmessage.successmessagebegin"></i><span ng-bind="revData.respparam.vaIncreased"></span><i ng-bind="compData.JS.c60_fbar_my_head_attend_tips.JS.unit"></i></div>' + '       <div class="c60_fbar_qiandao_pop_bottom_txt" ng-show="vaIncreasedFlag==0" ng-bind="compData.JS.c60_fbar_my_head_attend_tips.JS.resultmessage.successmessageend"></div><div class="c60_fbar_qiandao_pop_bottom_txt" ng-show="vaIncreasedFlag==1" ng-bind="compData.JS.c60_fbar_my_head_attend_tips.JS.resultmessage.successmessage"></div>' + '       <div class="c60_fbar_qiandao_pop_bottom_btn" ng-show="compData.JS.c60_fbar_my_tips_successbtn.JS.isShow" ng-bind="compData.JS.c60_fbar_my_tips_successbtn.JS.text"  ccid="c60_fbar_my_tips_successbtn" ng-click="click(\'c60_fbar_my_tips_successbtn\');$event.stopPropagation();"  ng-style="getStyle(\'c60_fbar_my_head_attend_tips_textbtn\')"></div>' + '     </div>' + '     <div class="c60_fbar_qiandao_pop_bottom" ng-show="signResultFlag==1">' + '       <div class="c60_fbar_qiandao_pop_bottom_txt c60_fbar_qiandao_pop_bottom_txt2" ng-bind-html="to_trusted(compData.JS.c60_fbar_my_head_attend_tips.JS.resultmessage.failuremessage1)" ></div>' + '       <div class="c60_fbar_qiandao_pop_bottom_btn" ng-show="compData.JS.c60_fbar_my_tips_failurebtn.JS.isShow" ng-bind="compData.JS.c60_fbar_my_tips_failurebtn.JS.text" ng-click="click(\'c60_fbar_my_tips_failurebtn\');$event.stopPropagation();"  ng-style="getStyle(\'c60_fbar_my_head_attend_tips_textbtn\')"></div>' + '     </div>' + '     <div class="c60_fbar_qiandao_pop_bottom" ng-show="signResultFlag==2">' + '       <div class="c60_fbar_qiandao_pop_bottom_txt c60_fbar_qiandao_pop_bottom_txt2"  ng-bind-html="to_trusted(compData.JS.c60_fbar_my_head_attend_tips.JS.resultmessage.failuremessage2)" ></div>' + '       <div class="c60_fbar_qiandao_pop_bottom_btn" ccid="c60_fbar_my_tips_failurebtn" ng-click="click(\'c60_fbar_my_tips_failurebtn\');$event.stopPropagation();"  ng-bind="compData.JS.c60_fbar_my_tips_failurebtn.JS.text"  ng-style="getStyle(\'c60_fbar_my_head_attend_tips_textbtn\')"></div>' + '     </div>' + '   </div>' + '   <div class="c60_fbar_qiandao_rule_pop">' + '     <div class="c60_fbar_qiandao_rule_pop_top">' + '       <div class="c60_fbar_qiandao_rule_pop_tit">' + '         <span class="c60_fbar_qiandao_rule_pop_tit_txt"  ng-bind="compData.JS.c60_fbar_my_head_rule_tips.JS.title" ></span>' + '         <span class="c60_fbar_qiandao_rule_pop_tit_close" ccid="c60_fbar_my_tips_closebtn" ng-click="click(\'c60_fbar_my_tips_closebtn\');$event.stopPropagation();"  ng-style="getStyle(\'c60_fbar_my_tips_closebtn\')"></span>' + '       </div>' + '    </div>' + '    <div class="c60_fbar_qiandao_rule_pop_bottom">' + '        <div class="c60_fbar_qiandao_rule_pop_bottom_txt" ng-bind-html="to_trusted(compData.JS.c60_fbar_my_head_rule_tips.JS.listdesc1)"></div>' + '        <div class="c60_fbar_qiandao_rule_pop_bottom_txt" ng-bind-html="to_trusted(compData.JS.c60_fbar_my_head_rule_tips.JS.listdesc2)"></div>' + '        <div class="c60_fbar_qiandao_rule_pop_bottom_txt" ng-bind-html="to_trusted(compData.JS.c60_fbar_my_head_rule_tips.JS.listdesc3)"></div>' + '        <div class="c60_fbar_qiandao_rule_pop_bottom_linktxt"><i ng-bind="compData.JS.c60_fbar_my_head_rule_tips.JS.textbegin"></i><a class="c60_fbar_qiandao_rule_pop_bottom_orangelinktxt"  ng-style="getStyle(\'c60_fbar_my_rule_textbtn\')" ccid="c60_fbar_my_rule_textbtn" ng-click="click(\'c60_fbar_my_rule_textbtn\');$event.stopPropagation();"  ng-bind="compData.JS.c60_fbar_my_rule_textbtn.JS.text"></a><i ng-bind="compData.JS.c60_fbar_my_head_rule_tips.JS.textend"></i></div>' + '    </div> ' + '  </div>' + '<div class="c60_fbar_my_con" ><div class="c60_fbar_my_conscroll" simplescroll>' + '   <div class="c60_fbar_my_top clearfloat" >' + '    <div class="c60_fbar_my_img_txt">' + '     <span class="c60_fbar_my_head_ico" ng-style="getStyle(\'c60_fbar_my_head_ico\')" ng-show="compData.JS.c60_fbar_my_head_ico.JS.isShow"></span>' + '     <div class="c60_fbar_my_txt" >' + '      <p class="c60_fbar_moblie" ng-bind-html="to_trusted(phoneFilter(revData.respparam.msisdn))"></p>' + '     <div class="c60_fbar_my_level">' + '     <span class="c60_fbar_my_degree" ng-show="compData.JS.c60_fbar_my_head_degree.JS.isShow" ng-style="getStyle(\'c60_fbar_my_head_degree\')"><i class="c60_fbar_degreeunit" ng-bind="compData.JS.c60_fbar_my_head_degree.JS.text"></i> <i class="c60_fbar_degreenumber" ng-bind="revData.respparam.level"></i></span>' + '     <span class="c60_fbar_my_member" ng-show="compData.JS.c60_fbar_my_head_member.JS.isShow" ng-style="getStyle(\'c60_fbar_my_head_member\')"  ccid="c60_fbar_my_head_member"  ng-click="click(\'c60_fbar_my_head_member\');$event.stopPropagation();" ><i ng-bind="compData.JS.c60_fbar_my_head_member.JS.text"></i><i class="c60_fbar_my_head_member_redpoint" ng-show="RedPointFlag==true"></i></span>' + '     </div>' + '     </div>' + '    </div>' + '    <div class="c60_fbar_attend_btn" >' + '    <span class="c60_fbar_attend_rule" ng-show="compData.JS.c60_fbar_my_head_rule.JS.isShow" ng-style="getStyle(\'c60_fbar_my_head_rule\')" ng-bind="compData.JS.c60_fbar_my_head_rule.JS.text"  ccid="c60_fbar_my_head_rule"  ng-click="click(\'c60_fbar_my_head_rule\');$event.stopPropagation();"></span>' + '     <a class="c60_fbar_attend_btn_link" ng-style="getattend_btn_linkStyle()" ng-bind="c60_fbar_attend_btn_text" ccid="c60_fbar_my_attend_btn" ng-click="click(\'c60_fbar_attend_btn\');$event.stopPropagation();"  ng-show="compData.JS.c60_fbar_attend_btn_link.JS.isShow"></a>' + '    </div>' + '   </div>' + '   <div class="c60_fbar_my_list_con" >' + '<div class="c60_fbar_my_list c60_fbar_my_list_coin" ccid="c60_fbar_my_list_coin" ng-click="click(\'c60_fbar_my_list_coin\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_coin.JS.isShow">    <div class="c60_fbar_my_list_detail clearfloat">    <div class="c60_fbar_cointitle">    <span class="c60_fbar_mylist c60_fbar_my_list_coin" ng-style="getStyle(\'c60_fbar_my_list_coin\')" ng-bind="compData.JS.c60_fbar_my_list_coin.JS.text" ></span><span class="c60_fbar_my_list_coin_num " ng-style="getStyle(\'c60_fbar_my_list_coin_num\')" ng-show="compData.JS.c60_fbar_my_list_coin_num.JS.isShow"  ng-bind-html="to_trusted(unitFilter(revData.respparam.coin,\'mycoin\'))"></span>    </div>    <div class="c60_fbar_arrow_jump">       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_coin.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_coin.JS.c60_fbar_arrow_jump_text.JS.text"></span>       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_coin\')" ></span>    </div>     </div>    </div>   <div class="c60_fbar_my_border_w" ng-show="(compData.JS.c60_fbar_my_list_coin.JS.isShow&&compData.JS.c60_fbar_my_list_red.JS.isShow) || (compData.JS.c60_fbar_my_list_coin.JS.isShow&&compData.JS.c60_fbar_my_list_red.JS.isShow) || (compData.JS.c60_fbar_my_list_coin.JS.isShow&&compData.JS.c60_fbar_my_list_discount.JS.isShow) || (compData.JS.c60_fbar_my_list_coin.JS.isShow&&compData.JS.c60_fbar_my_list_privilege.JS.isShow)"><div class="c60_fbar_my_border"></div></div> <div class="c60_fbar_my_list c60_fbar_my_list_wealth"  ccid="c60_fbar_my_list_wealth" ng-click="click(\'c60_fbar_my_list_wealth\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_wealth.JS.isShow">' + '     <div class="c60_fbar_my_list_detail clearfloat" >' + '      <div class="c60_fbar_cointitle" >' + '       <span class="c60_fbar_mylist c60_fbar_my_list_wealth" ng-style="getStyle(\'c60_fbar_my_list_wealth\')" ng-bind="compData.JS.c60_fbar_my_list_wealth.JS.text"></span>' + '      </div>' + '      <div class="c60_fbar_arrow_jump">' + '       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_wealth.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_wealth.JS.c60_fbar_arrow_jump_text.JS.text"></span>' + '       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_wealth\')"></span>' + '      </div>' + '     </div>' + '    </div>' + '    <div class="c60_fbar_my_border_w" ng-show="(compData.JS.c60_fbar_my_list_wealth.JS.isShow&&compData.JS.c60_fbar_my_list_red.JS.isShow) || (compData.JS.c60_fbar_my_list_wealth.JS.isShow&&compData.JS.c60_fbar_my_list_discount.JS.isShow) || (compData.JS.c60_fbar_my_list_wealth.JS.isShow&&compData.JS.c60_fbar_my_list_privilege.JS.isShow)"><div class="c60_fbar_my_border"></div></div>' + '    <div class="c60_fbar_my_list_second" ng-show="showFlag==\'c60_fbar_my_list_wealth\'">' + '        <div class="c60_fbar_ml_second_con c60_fbar_my_bt_d8d8d8 c60_fbar_clearfloat" ng-show="compData.JS.c60_fbar_my_flowcurrency.JS.isShow">' + '           <div class="c60_fbar_ml_second_con_left"  ng-bind-html="to_trusted(unitFilter(revData.respparam.coin,\'coin\'))"></div>' + '           <div class="c60_fbar_ml_second_con_right"><span class="c60_fbar_ml_sc_right_btn" ccid="c60_fbar_my_flowcurrency" ng-click="click(\'c60_fbar_my_flowcurrency\');$event.stopPropagation();" ng-style="getStyle(\'c60_fbar_my_list_subitem_btn_link\')"  ng-bind="compData.JS.c60_fbar_my_flowcurrency.JS.c60_fbar_arrow_jump_text.JS.text"></span></div>' + '        </div>' + '         <div class="c60_fbar_my_border_w c60_fbar_my_border_w2"  ng-show="compData.JS.c60_fbar_my_luckdraw.JS.isShow"><div class="c60_fbar_my_border"></div></div>' + '        <div class="c60_fbar_ml_second_con c60_fbar_clearfloat"  ng-show="compData.JS.c60_fbar_my_luckdraw.JS.isShow">' + '           <div class="c60_fbar_ml_second_con_left" ng-bind-html="to_trusted(unitFilter(revData.respparam.wodou,\'wodou\'))" ></div>' + '           <div class="c60_fbar_ml_second_con_right"><span class="c60_fbar_ml_sc_right_btn" ccid="c60_fbar_my_luckdraw" ng-click="click(\'c60_fbar_my_luckdraw\');$event.stopPropagation();" ng-style="getStyle(\'c60_fbar_my_list_subitem_btn_link\')" ng-bind="compData.JS.c60_fbar_my_luckdraw.JS.c60_fbar_arrow_jump_text.JS.text"></span></div>' + '       </div>' + '    </div>' + '    <div class="c60_fbar_my_border_w" ng-show="showFlag==\'c60_fbar_my_list_wealth\'"><div class="c60_fbar_my_border"></div></div>' + '    <div class="c60_fbar_my_list c60_fbar_my_list_red"  ccid="c60_fbar_my_list_red" ng-click="click(\'c60_fbar_my_list_red\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_red.JS.isShow">' + '     <div class="c60_fbar_my_list_detail clearfloat" >' + '      <div class="c60_fbar_cointitle" >' + '       <span class="c60_fbar_mylist c60_fbar_my_list_red" ng-style="getStyle(\'c60_fbar_my_list_red\')" ng-bind="compData.JS.c60_fbar_my_list_red.JS.text"></span>' + '      </div>' + '      <div class="c60_fbar_arrow_jump">' + '       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_red.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_red.JS.c60_fbar_arrow_jump_text.JS.text"></span>' + '       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_red\')"></span>' + '      </div>' + '     </div>' + '    </div>' + '    <div class="c60_fbar_my_border_w" ng-show="(compData.JS.c60_fbar_my_list_red.JS.isShow&&compData.JS.c60_fbar_my_list_discount.JS.isShow) || (compData.JS.c60_fbar_my_list_red.JS.isShow&&compData.JS.c60_fbar_my_list_privilege.JS.isShow)"><div class="c60_fbar_my_border"></div></div>' + '    <div class="c60_fbar_my_list_second" ng-show="showFlag==\'c60_fbar_my_list_red\'">' + '        <div class="c60_fbar_ml_second_con c60_fbar_my_bt_d8d8d8 c60_fbar_clearfloat" ng-show="compData.JS.c60_fbar_my_list_red_openred.JS.isShow">' + '           <div class="c60_fbar_ml_second_con_left"  ng-bind="compData.JS.c60_fbar_my_list_red_openred.JS.text"></div>' + '           <div class="c60_fbar_ml_second_con_right"><span class="c60_fbar_ml_sc_right_btn" ccid="c60_fbar_my_list_red_openred" ng-click="click(\'c60_fbar_my_list_red_openred\');$event.stopPropagation();" ng-style="getStyle(\'c60_fbar_my_list_subitem_btn_link\')"  ng-bind="compData.JS.c60_fbar_my_list_red_openred.JS.c60_fbar_arrow_jump_text.JS.text"></span></div>' + '        </div>' + '         <div class="c60_fbar_my_border_w c60_fbar_my_border_w2"  ng-show="compData.JS.c60_fbar_my_list_red_hairred.JS.isShow"><div class="c60_fbar_my_border"></div></div>' + '        <div class="c60_fbar_ml_second_con c60_fbar_clearfloat"  ng-show="compData.JS.c60_fbar_my_list_red_hairred.JS.isShow">' + '           <div class="c60_fbar_ml_second_con_left" ng-bind="compData.JS.c60_fbar_my_list_red_hairred.JS.text" ></div>' + '           <div class="c60_fbar_ml_second_con_right"><span class="c60_fbar_ml_sc_right_btn" ccid="c60_fbar_my_list_red_hairred" ng-click="click(\'c60_fbar_my_list_red_hairred\');$event.stopPropagation();" ng-style="getStyle(\'c60_fbar_my_list_subitem_btn_link\')" ng-bind="compData.JS.c60_fbar_my_list_red_hairred.JS.c60_fbar_arrow_jump_text.JS.text"></span></div>' + '       </div>' + '    </div>' + '    <div class="c60_fbar_my_border_w" ng-show="showFlag==\'c60_fbar_my_list_red\'"><div class="c60_fbar_my_border"></div></div>' + '    <div class="c60_fbar_my_list c60_fbar_my_list_discount" ccid="c60_fbar_my_list_discount" ng-click="click(\'c60_fbar_my_list_discount\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_discount.JS.isShow">' + '     <div class="c60_fbar_my_list_detail clearfloat">' + '      <div class="c60_fbar_cointitle" >' + '       <span class="c60_fbar_mylist c60_fbar_my_list_discount" ng-style="getStyle(\'c60_fbar_my_list_discount\')" ng-bind="compData.JS.c60_fbar_my_list_discount.JS.text"></span>' + '      </div>' + '      <div class="c60_fbar_arrow_jump">' + '       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_discount.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_discount.JS.c60_fbar_arrow_jump_text.JS.text"></span>' + '       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_discount\')"></span>' + '      </div>' + '     </div>' + '    </div>' + '    <div class="c60_fbar_my_border_w" ng-show="showFlag==\'c60_fbar_my_list_discount\'"><div class="c60_fbar_my_border"></div></div>' + '    <div class="c60_fbar_my_list_second" ng-show="showFlag==\'c60_fbar_my_list_discount\'">' + '        <div class="c60_fbar_ml_second_con c60_fbar_my_bt_d8d8d8 c60_fbar_clearfloat" ng-show="compData.JS.c60_fbar_my_latestactivity.JS.isShow">' + '           <div class="c60_fbar_ml_second_con_left"  ng-bind="compData.JS.c60_fbar_my_latestactivity.JS.text"></div>' + '            <div class="c60_fbar_ml_second_con_middle"><div class="c60_fbar_ml_mysale_guaguaka" ng-style="getStyle(\'c60_fbar_my_latestactivity\')" >&nbsp;</div></div>' + '            <div class="c60_fbar_ml_second_con_right"><span class="c60_fbar_ml_sc_right_btn" ccid="c60_fbar_my_latestactivity" ng-click="click(\'c60_fbar_my_latestactivity\');$event.stopPropagation();" ng-style="getStyle(\'c60_fbar_my_list_subitem_btn_link\')"  ng-bind="compData.JS.c60_fbar_my_latestactivity.JS.c60_fbar_arrow_jump_text.JS.text"></span></div>' + '        </div>' + '         <div class="c60_fbar_my_border_w c60_fbar_my_border_w2"  ng-show="compData.JS.c60_fbar_my_preferences.JS.isShow"><div class="c60_fbar_my_border"></div></div>' + '        <div class="c60_fbar_ml_second_con c60_fbar_clearfloat"  ng-show="compData.JS.c60_fbar_my_preferences.JS.isShow">' + '           <div class="c60_fbar_ml_second_con_left" ng-bind="compData.JS.c60_fbar_my_preferences.JS.text" ></div>' + '           <div class="c60_fbar_ml_second_con_right"><span class="c60_fbar_ml_sc_right_btn" ccid="c60_fbar_my_preferences" ng-click="click(\'c60_fbar_my_preferences\');$event.stopPropagation();" ng-style="getStyle(\'c60_fbar_my_list_subitem_btn_link\')" ng-bind="compData.JS.c60_fbar_my_preferences.JS.c60_fbar_arrow_jump_text.JS.text"></span></div>' + '</div>' + '</div>' + '<div class="c60_fbar_my_border_w" ng-show="compData.JS.c60_fbar_my_list_discount.JS.isShow&&compData.JS.c60_fbar_my_list_privilege.JS.isShow"><div class="c60_fbar_my_border"></div></div>   <div class="c60_fbar_my_list c60_fbar_my_list_privilege" ccid="c60_fbar_my_list_privilege" ng-click="click(\'c60_fbar_my_list_privilege\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_privilege.JS.isShow">' + '    <div class="c60_fbar_my_list_detail clearfloat">' + '    <div class="c60_fbar_cointitle">' + '    <span class="c60_fbar_mylist c60_fbar_my_list_privilege" ng-style="getStyle(\'c60_fbar_my_list_privilege\')" ng-bind="compData.JS.c60_fbar_my_list_privilege.JS.text" ></span>' + '    </div>' + '    <div class="c60_fbar_arrow_jump">       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_privilege.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_privilege.JS.c60_fbar_arrow_jump_text.JS.text"></span>       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_privilege\')" ></span>' + '    </div>     </div>    </div>' + '</div>' + '   <div class="c60_fbar_my_list_con" ng-show="compData.JS.c60_fbar_my_list_growup.JS.isShow || compData.JS.c60_fbar_my_list_task.JS.isShow">' + '<div class="c60_fbar_my_list c60_fbar_my_list_growup" ccid="c60_fbar_my_list_growup" ng-click="click(\'c60_fbar_my_list_growup\');$event.stopPropagation();"  ng-show="compData.JS.c60_fbar_my_list_growup.JS.isShow">' + '     <div class="c60_fbar_my_list_detail clearfloat " >' + '      <div class="c60_fbar_cointitle" >' + '       <span class="c60_fbar_mylist c60_fbar_my_list_growup" ng-style="getStyle(\'c60_fbar_my_list_growup\')" ng-bind="compData.JS.c60_fbar_my_list_growup.JS.text"></span>' + '      </div>' + '      <div class="c60_fbar_arrow_jump">' + '       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_growup.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_growup.JS.c60_fbar_arrow_jump_text.JS.text"></span>' + '       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_growup\')"></span>' + '      </div>' + '     </div>' + '    </div>' + '    <div class="c60_fbar_my_border_w"  ng-show="compData.JS.c60_fbar_my_list_task.JS.isShow"><div class="c60_fbar_my_border" ng-show="compData.JS.c60_fbar_my_list_task.JS.isShow"></div></div>' + '    <div class="c60_fbar_my_list c60_fbar_my_list_task" ccid="c60_fbar_my_list_task" ng-click="click(\'c60_fbar_my_list_task\');$event.stopPropagation();"  ng-show="compData.JS.c60_fbar_my_list_task.JS.isShow">' + '     <div class="c60_fbar_my_list_detail clearfloat" >' + '      <div class="c60_fbar_cointitle" >' + '       <span class="c60_fbar_mylist c60_fbar_my_list_task" ng-style="getStyle(\'c60_fbar_my_list_task\')" ng-bind="compData.JS.c60_fbar_my_list_task.JS.text"></span>' + '      </div>' + '      <div class="c60_fbar_arrow_jump">' + '       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_task.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_task.JS.c60_fbar_arrow_jump_text.JS.text"></span>' + '       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_task\')"></span>' + '      </div>' + '     </div>' + '    </div>' + '   </div>' + '   <div class="c60_fbar_my_list_con " >' + '    <div class="c60_fbar_my_list c60_fbar_my_list_set"  ccid="c60_fbar_my_list_set" ng-click="click(\'c60_fbar_my_list_set\');$event.stopPropagation();"   ng-show="compData.JS.c60_fbar_my_list_set.JS.isShow">' + '     <div class="c60_fbar_my_list_detail clearfloat" >' + '      <div class="c60_fbar_cointitle">' + '       <span class="c60_fbar_mylist c60_fbar_my_list_set" ng-style="getStyle(\'c60_fbar_my_list_set\')" ng-bind="compData.JS.c60_fbar_my_list_set.JS.text"></span>' + '      </div>' + '      <div class="c60_fbar_arrow_jump">' + '       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_set.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_set.JS.c60_fbar_arrow_jump_text.JS.text"></span>' + '       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_set\')"></span>' + '      </div>' + '     </div>' + '    </div>' + '   </div>' + '   <div class="c60_fbar_my_add_btn" ng-style="getStyle(\'c60_fbar_my_add_desktop\')" ng-show="compData.JS.c60_fbar_my_add_desktop.JS.isShow" ccid="c60_fbar_my_add_desktop" ng-click="click(\'c60_fbar_my_add_desktop\');$event.stopPropagation();"><span class="c60_fbar_my_add_btn_ico" ng-bind="compData.JS.c60_fbar_my_add_desktop_text.JS.text" ng-style="getStyle(\'c60_fbar_my_add_desktop_text\')"></span></div>' + '   </div>' + '</div>' + '</div>',
        scope: {},
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        '$timeout', 
        'coreService', 
        'coreUtils', 
        'Const', 
        '$sce', 
        function($scope, $element, $attrs, $timeout, coreService, coreUtils, Const, $sce) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            //页面元素配置项
            $scope.compData = {
                "CSS": {},
                "JS": {}
            };
            
            $scope.to_trusted = function(text) {
                if (text != null  && text != undefined) {
                    text = text + '';
                    return $sce.trustAsHtml(text.replace(/\n/g, "<br/>"));
                } else {
                    return "";
                }
            }
            ;
            $scope.memberInfoFlag = false;
            //初始化是否获取到用户信息标记
            $scope.c60_fbar_attend_btn_text = '';
            //初始化签到按钮文字	
            $scope.c60_fbar_attend_btn_style = '';
            //初始化签到按钮样式
            $scope.RedPointFlag = false;
            //初始化小红点显示标记
            $scope.signResultFlag = -1;
            //签到结果标记           
            $scope.showFlag = '';
            //显示标记    
            $scope.vaIncreasedFlag = -1;
            //签到成功提醒类型标记 
            $scope.time = '';
            
            
            //签到按钮状态
            $scope.getattend_btn_linkStyle = function() {
                if ($scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state == '0') {
                    $scope.c60_fbar_attend_btn_text = $scope.compData.JS.c60_fbar_attend_btn_link.JS.text0;
                    $scope.c60_fbar_attend_btn_style = $scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state0;
                } else if ($scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state == '1') {
                    $scope.c60_fbar_attend_btn_text = $scope.compData.JS.c60_fbar_attend_btn_link.JS.text1;
                    $scope.c60_fbar_attend_btn_style = $scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state1;
                } else {
                    $scope.c60_fbar_attend_btn_text = $scope.compData.JS.c60_fbar_attend_btn_link.JS.text0;
                    $scope.c60_fbar_attend_btn_style = {
                        'background': '#ddd',
                        'color': '#FFFFFF'
                    };
                }
                
                return $scope.c60_fbar_attend_btn_style;
            }
            ;
            //手机号格式化
            $scope.phoneFilter = function(param) {
                if (param == undefined)
                    return '<i style="visibility:hidden">&nbsp;</i>';
                var phone = param.substring(0, 3) + "****" + param.substring(7);
                return phone;
            }
            ;
            //流量币和沃豆格式化
            $scope.unitFilter = function(param, type) {
                var total = 0;
                if (param == '' || param == undefined || Number(param) == 0) {
                    total = 0;
                } else {
                    total = parseInt(param).toString();
                    
                    if (parseInt(param) % 10000 == 0 && parseInt(param) !== 0) 
                    {
                        total = (parseInt(total) / 10000) + '万';
                    } else {
                        var m = (parseInt(total) / 10000).toString();
                        //total=(total>=10000)?m.substr(0,m.indexOf(".")+3)+'万':total;
                        var tfloatcount = Number($scope.compData.JS.tfloatcount || '2');
                        total = (total >= 10000) ? coreUtils.formatNum(parseInt(total) / 10000, tfloatcount) + '万' : total;
                    }
                
                }
                if (type == 'coin') {
                    num = $scope.compData.JS.c60_fbar_my_flowcurrency.JS.text + '<div class="c60_fbar_my_list_wealth_num">&nbsp;' + total + '&nbsp;</div>' + $scope.compData.JS.c60_fbar_my_flowcurrency.JS.unit;
                } else if (type == 'wodou') {
                    num = $scope.compData.JS.c60_fbar_my_luckdraw.JS.text + '<div class="c60_fbar_my_list_wealth_num">&nbsp;' + total + '&nbsp;</div>' + $scope.compData.JS.c60_fbar_my_luckdraw.JS.unit;
                } else {
                    num = total;
                }
                return num;
            }
            ;
            //样式赋值
            $scope.getStyle = function(classname) {
                if ($scope.compData.JS[classname] && $scope.compData.JS[classname].CSS) {
                    return $scope.compData.JS[classname].CSS;
                }
            }
            ;
            //箭头跳转样式赋值
            $scope.getJumpStyle = function(classname) {
                if (classname == $scope.showFlag && $scope.compData.JS[classname].JS.linktype == '2') {
                    return $scope.compData.JS.c60_fbar_arrow_jump_ico.JS.stateconfig.state1;
                } else {
                    return $scope.compData.JS.c60_fbar_arrow_jump_ico.JS.stateconfig.state0;
                }
            }
            ;
            //会员日小红点状态
            $scope.show = function() {
                angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({
                    'display': 'block'
                });
                angular.element($element[0].querySelector('.c60_fbar_qiandao_pop')).css({
                    'display': 'block'
                });
                if ($scope.signResultFlag == 0 || $scope.signResultFlag == 1) 
                {
                    $scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state = '1';
                } 
                else 
                {
                    $scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state = '0';
                }
                $scope.memberInfoFlag = true;
            }
            $scope.show2 = function() {
                angular.element($element[0].querySelector('.c60_fbar_mine_result')).css({
                    'display': 'block'
                });
            }
            //隐藏
            $scope.hide = function() {
                angular.element($element[0].querySelector('.c60_fbar_mine_tips')).css({
                    'display': 'none'
                });
            }
            ;
            //隐藏2
            /*$scope.hide2 = function() {
                	 angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({'display': 'none'});
                     angular.element($element[0].querySelector('.c60_fbar_memberday_pop')).css({'display': 'none'});
                     angular.element($element[0].querySelector('.c60_fbar_qiandao_rule_pop')).css({'display': 'none'});
                     angular.element($element[0].querySelector('.c60_fbar_qiandao_pop')).css({'display': 'none'});
                };*/
            //隐藏3
            $scope.hide3 = function() {
                angular.element($element[0].querySelector('.c60_fbar_mine_result_waiting')).css({
                    'display': 'none'
                });
            }
            ;
            //样式和初始值配置和入
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            //页面数据初始化
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid) || {});
                $element.css($scope.compData.css || {});
                coreService.fireEvent($element.attr('cid'), 'init');
            }
            ;
            //用户信息：接收来自后台的数据
            $scope.memberinfo = function(param) {
                $scope.time = $scope.compData.JS.c60_fbar_mine_tips.JS.closetime;
                if (param && param.respparam) {
                    if (param.respparam.level && param.respparam.level !== '' && param.respparam.level !== undefined && param.respparam.jsessionid && param.respparam.jsessionid !== '' && param.respparam.jsessionid !== undefined) {
                        angular.element($element[0].querySelector('.c60_fbar_mine_result_waiting')).css({
                            'display': 'none'
                        });
                        $scope.revData = param;
                        $scope.revData.respparam.coin = param.respparam.data[0].coin + '';
                        $scope.revData.respparam.wodou = param.respparam.data[0].wodou + '';
                        angular.element($element[0].querySelector('.c60_fbar_mine_result')).css({
                            'display': 'none'
                        });
                        angular.element($element[0].querySelector('.c60_fbar_my_con')).css({
                            'display': 'block'
                        });
                        //判断是否会员日
                        param.respparam.memberdate = param.respparam.memberdate + '';
                        $scope.RedPointFlag = (param.respparam.memberdate == '1') ? true : false;
                        //判断是否可以签到
                        param.respparam.signflag = param.respparam.signflag + '';
                        if (param.respparam.signflag == '1') {
                            $scope.memberInfoFlag = true;
                            $scope.c60_fbar_attend_btn_text = $scope.compData.JS.c60_fbar_attend_btn_link.JS.text0;
                            $scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state = '0';
                        } else if (param.respparam.signflag == '0') {
                            $scope.memberInfoFlag = true;
                            $scope.c60_fbar_attend_btn_text = $scope.compData.JS.c60_fbar_attend_btn_link.JS.text1;
                            $scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state = '1';
                        } else {
                            $scope.memberInfoFlag = false;
                            $scope.c60_fbar_attend_btn_text = $scope.compData.JS.c60_fbar_attend_btn_link.JS.text0;
                            $scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state = '0';
                        }
                    } 
                    else 
                    {
                        $timeout($scope.hide3, $scope.time);
                        $timeout($scope.show2, $scope.time);
                    }
                }
            }
            ;
            //签到成功：接收来自后台的数据
            $scope.signRet = function(param) {
                
                if (param && param.respparam) {
                    $scope.revData.respparam.jsessionid = param.respparam.jsessionid;
                    if (param.respparam.level !== '' && param.respparam.level && param.respparam.level !== undefined)
                        $scope.revData.respparam.level = param.respparam.level;
                    if (param.respparam.data[0].coin !== '' && param.respparam.data[0].coin && param.respparam.data[0].coin !== undefined)
                        $scope.revData.respparam.coin = param.respparam.data[0].coin;
                    if (param.respparam.data[0].wodou !== '' && param.respparam.data[0].wodou && param.respparam.data[0].wodou !== undefined)
                        $scope.revData.respparam.wodou = param.respparam.data[0].wodou;
                    if (param.respparam.vaIncreased !== '' && param.respparam.vaIncreased && param.respparam.vaIncreased !== undefined) 
                    {
                        var vafloatcount = Number($scope.compData.JS.vafloatcount || '0');
                        $scope.revData.respparam.vaIncreased = coreUtils.formatNum(Number(param.respparam.vaIncreased), vafloatcount);
                        $scope.vaIncreasedFlag = 0;
                    } else {
                        $scope.vaIncreasedFlag = 1;
                    }
                    $scope.signResultFlag = 0;
                }
                $timeout($scope.hide, $scope.time);
                $timeout($scope.show, $scope.time);
            }
            ;
            //签到失败
            $scope.error = function(param) {
                if (param) {
                    if (param.errorcode == "1-140-1-027") {
                        $scope.signResultFlag = 1;
                        $timeout($scope.hide, $scope.time);
                        $timeout($scope.show, $scope.time);
                    } else {
                        $scope.signResultFlag = 2;
                        $timeout($scope.hide, $scope.time);
                        $timeout($scope.show, $scope.time);
                    }
                }
            }
            //外链内嵌和直接外链处理   0:外链内嵌  1:直接外链跳转  2:展开子项
            $scope.linkEvent = function(type, eventName) {
                if ($scope.memberInfoFlag) {
                    if ($scope.compData.JS[type].JS.linktype == '0') {
                        var url = $scope.compData.JS[type].JS.url;
                        if (url.indexOf("{jsessionid}") != -1) {
                            url = url.replace("{jsessionid}", $scope.revData.respparam.jsessionid);
                        }
                        if (url.indexOf("{auth}") != -1) {
                            url = url.replace("{auth}", $scope.revData.respparam.auth);
                        }
                        if (url.indexOf("{msisdn}") != -1) {
                            url = url.replace("{msisdn}", $scope.revData.respparam.msisdn);
                        }
                        coreService.fireEvent($scope.cid, eventName, {
                            "url": url
                        });
                    } else if ($scope.compData.JS[type].JS.linktype == '1') {
                        var url = $scope.compData.JS[type].JS.url;
                        if (url.indexOf("{jsessionid}") != -1) {
                            url = url.replace("{jsessionid}", $scope.revData.respparam.jsessionid);
                        }
                        if (url.indexOf("{auth}") != -1) {
                            url = url.replace("{auth}", $scope.revData.respparam.auth);
                        }
                        if (url.indexOf("{msisdn}") != -1) {
                            url = url.replace("{msisdn}", $scope.revData.respparam.msisdn);
                        }
                        window.open(url);
                    } else {
                        $scope.showFlag == type ? $scope.showFlag = '' : $scope.showFlag = type;
                    }
                } else {
                    if ($scope.compData.JS[type].JS.linktype == '2') {
                        $scope.showFlag == type ? $scope.showFlag = '' : $scope.showFlag = type;
                    }
                }
            }
            //点击事件详情
            var myClick = {
                c60_fbar_my_result_link_btn: function(param) {
                    //*******************错误页面-返回首页按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_result_link_btn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'linkbtn')
                        };
                        angular.element($element[0].querySelector('.c60_fbar_mine_result')).css({
                            'display': 'none'
                        });
                        angular.element($element[0].querySelector('.c60_fbar_mine_result_waiting')).css({
                            'display': 'none'
                        });
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_result_link_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'backclick');
                },
                c60_fbar_my_head_member: function(param) {
                    //*******************会员日按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_head_member.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'member')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_head_member.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    if (!$scope.RedPointFlag) {
                        angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({
                            'display': 'block'
                        });
                        angular.element($element[0].querySelector('.c60_fbar_memberday_pop')).css({
                            'display': 'block'
                        });
                        //$timeout($scope.hide2, $scope.time);
                    } else {
                        $scope.linkEvent('c60_fbar_my_head_member', 'memberclick');
                    }
                },
                c60_fbar_my_head_rule: function(param) {
                    //*******************签到规则按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_head_rule.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'rule')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_head_rule.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({
                        'display': 'block'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_qiandao_rule_pop')).css({
                        'display': 'block'
                    });
                    //$timeout($scope.hide2, $scope.time);                   
                },
                c60_fbar_my_rule_textbtn: function(param) {
                    //*******************签到规则-欢乐抽奖按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_rule_textbtn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'textbtn')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_rule_textbtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_qiandao_rule_pop')).css({
                        'display': 'none'
                    });
                    $scope.linkEvent('c60_fbar_my_rule_textbtn', 'rulebtnclick');
                },
                c60_fbar_my_tips_closebtn: function(param) {
                    //*******************弹出层关闭按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_tips_closebtn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'closebtn')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_tips_closebtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_memberday_pop')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_qiandao_rule_pop')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_qiandao_pop')).css({
                        'display': 'none'
                    });
                },
                c60_fbar_attend_btn: function(param) {
                    //*******************签到按钮*******************	
                    if ($scope.memberInfoFlag == undefined)
                        return false;
                    if ($scope.memberInfoFlag) 
                    {
                        if ($scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state == '0') 
                        {
                            angular.element($element[0].querySelector('.c60_fbar_mine_tips')).css({
                                'display': 'block'
                            });
                            $scope.memberInfoFlag = undefined;
                            $scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state = '2';
                            coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'attendclick');
                        } 
                        else 
                        {
                            $scope.signResultFlag = 1;
                            angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({
                                'display': 'block'
                            });
                            angular.element($element[0].querySelector('.c60_fbar_qiandao_pop')).css({
                                'display': 'block'
                            });
                            //$timeout($scope.hide2, $scope.time); 
                        }
                    } 
                    else 
                    {
                        $scope.signResultFlag = 2;
                        angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({
                            'display': 'block'
                        });
                        angular.element($element[0].querySelector('.c60_fbar_qiandao_pop')).css({
                            'display': 'block'
                        });
                        //$timeout($scope.hide2, $scope.time); 
                    }
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_attend_btn_link.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'attend')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_attend_btn_link.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                },
                c60_fbar_my_tips_successbtn: function(param) {
                    //*******************签到-去抽奖按钮*******************		
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_tips_successbtn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'success')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_tips_successbtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_qiandao_pop')).css({
                        'display': 'none'
                    });
                    $scope.linkEvent('c60_fbar_my_tips_successbtn', 'successbtnclick');
                },
                c60_fbar_my_tips_failurebtn: function(param) {
                    //*******************签到-ok按钮*******************	
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_tips_failurebtn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'failure')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_tips_failurebtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_memberday_pop')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_qiandao_rule_pop')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_qiandao_pop')).css({
                        'display': 'none'
                    });
                },
                c60_fbar_my_list_coin: function(param) {
                    //*******************我的金币按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_coin.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'coin')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_coin.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'coinclick');
                },
                c60_fbar_my_list_wealth: function(param) {
                    //*******************我的财富按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_wealth.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'wealth')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_wealth.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.linkEvent('c60_fbar_my_list_wealth', 'wealthclick');
                },
                //                    c60_fbar_my_list_wealth: function(param) {
                //                        //*******************我的财富按钮*******************
                //                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_wealth.JS.cdrConfig)) {
                //                            $scope.compData.JS['cdrData'] = {};
                //                            $scope.compData.JS.cdrData = {
                //                                'pageId': $scope.pageID,
                //                                'componentId': 'c60_fbar_my_list_wealth'
                //                            };
                //                            coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_wealth.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                //                        }
                //                        $scope.linkEvent('c60_fbar_my_list_wealth', 'wealthclick');
                //                    },
                c60_fbar_my_flowcurrency: function(param) {
                    //*******************我的财富-兑换流量币按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_flowcurrency.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'flowcurrency')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_flowcurrency.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.linkEvent('c60_fbar_my_flowcurrency', 'flowcurrencyclick');
                },
                c60_fbar_my_luckdraw: function(param) {
                    //*******************我的财富-沃豆抽奖按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_luckdraw.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'luckdraw')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_luckdraw.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.linkEvent('c60_fbar_my_luckdraw', 'luckdrawclick');
                },
                c60_fbar_my_list_red: function(param) {
                    //*******************我的红包按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_red.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'red')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_red.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.linkEvent('c60_fbar_my_list_red', 'redclick');
                },
                c60_fbar_my_list_red_openred: function(param) {
                    //*******************我的红包-开红包按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_red_openred.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'openred')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_red_openred.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.linkEvent('c60_fbar_my_list_red_openred', 'openredclick');
                },
                c60_fbar_my_list_red_hairred: function(param) {
                    //*******************我的红包-发红包按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_red_hairred.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'hairred')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_red_hairred.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.linkEvent('c60_fbar_my_list_red_hairred', 'hairredclick');
                },
                c60_fbar_my_list_discount: function(param) {
                    //*******************我的优惠*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_discount.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'discount')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_discount.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    
                    $scope.linkEvent('c60_fbar_my_list_discount', 'discountclick');
                },
                c60_fbar_my_latestactivity: function(param) {
                    //*******************我的优惠-我要刮按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_latestactivity.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'latestactivity')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_latestactivity.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    
                    $scope.linkEvent('c60_fbar_my_latestactivity', 'latestactivityclick');
                },
                c60_fbar_my_preferences: function(param) {
                    //*******************我的优惠-去看看按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_preferences.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'preferences')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_preferences.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.linkEvent('c60_fbar_my_preferences', 'oldcustomerpreferencesclick');
                },
                c60_fbar_my_list_privilege: function(param) {
                    //*******************我的特权按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_privilege.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'privilege')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_privilege.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'privilegeclick');
                },
                c60_fbar_my_list_growup: function(param) {
                    //*******************我的成长按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_growup.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'growup')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_growup.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.linkEvent('c60_fbar_my_list_growup', 'growupclick');
                },
                c60_fbar_my_list_task: function(param) {
                    //*******************我的任务按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_task.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'task')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_task.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.linkEvent('c60_fbar_my_list_task', 'taskclick');
                },
                c60_fbar_my_list_set: function(param) {
                    //*******************设置按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_set.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'set')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_set.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'setclick');
                },
                c60_fbar_my_add_desktop: function(param) {
                    //*******************添加到桌面*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_add_desktop.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'desktop')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_add_desktop.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    var u = navigator.userAgent;
                    if (/(android|Android)/ig.test(u)) 
                    {
                        window.open($scope.compData.JS.c60_fbar_my_add_desktop.JS.androidurl);
                    } 
                    else if (/(iPhone|iPad|iOS|iphone|ipad|ios)/ig.test(u)) 
                    {
                        window.open($scope.compData.JS.c60_fbar_my_add_desktop.JS.iosurl);
                    } else if (u.indexOf('Windows Phone') > -1) {
                    
                    }
                }
            };
            //点击事件分割
            $scope.click = function(classname, param) {
                if (classname == undefined || classname == null ) {
                    return false;
                }
                switch (classname) {
                case 'c60_fbar_my_result_link_btn':
                    myClick.c60_fbar_my_result_link_btn(param);
                    break;
                case 'c60_fbar_my_head_member':
                    myClick.c60_fbar_my_head_member(param);
                    break;
                case 'c60_fbar_my_head_rule':
                    myClick.c60_fbar_my_head_rule(param);
                    break;
                case 'c60_fbar_my_rule_textbtn':
                    myClick.c60_fbar_my_rule_textbtn(param);
                    break;
                case 'c60_fbar_my_tips_closebtn':
                    myClick.c60_fbar_my_tips_closebtn(param);
                    break;
                case 'c60_fbar_attend_btn':
                    myClick.c60_fbar_attend_btn(param);
                    break;
                case 'c60_fbar_my_tips_successbtn':
                    myClick.c60_fbar_my_tips_successbtn(param);
                    break;
                case 'c60_fbar_my_tips_failurebtn':
                    myClick.c60_fbar_my_tips_failurebtn(param);
                    break;
                case 'c60_fbar_my_list_coin':
                    myClick.c60_fbar_my_list_coin(param);
                    break;
                case 'c60_fbar_my_list_wealth':
                    myClick.c60_fbar_my_list_wealth(param);
                    break;
                case 'c60_fbar_my_flowcurrency':
                    myClick.c60_fbar_my_flowcurrency(param);
                    break;
                case 'c60_fbar_my_luckdraw':
                    myClick.c60_fbar_my_luckdraw(param);
                    break;
                case 'c60_fbar_my_list_red':
                    myClick.c60_fbar_my_list_red(param);
                    break;
                case 'c60_fbar_my_list_red_openred':
                    myClick.c60_fbar_my_list_red_openred(param);
                    break;
                case 'c60_fbar_my_list_red_hairred':
                    myClick.c60_fbar_my_list_red_hairred(param);
                    break;
                case 'c60_fbar_my_list_discount':
                    myClick.c60_fbar_my_list_discount(param);
                    break;
                case 'c60_fbar_my_latestactivity':
                    myClick.c60_fbar_my_latestactivity(param);
                    break;
                case 'c60_fbar_my_preferences':
                    myClick.c60_fbar_my_preferences(param);
                    break;
                case 'c60_fbar_my_list_privilege':
                    myClick.c60_fbar_my_list_privilege(param);
                    break;
                case 'c60_fbar_my_list_growup':
                    myClick.c60_fbar_my_list_growup(param);
                    break;
                case 'c60_fbar_my_list_task':
                    myClick.c60_fbar_my_list_task(param);
                    break;
                case 'c60_fbar_my_list_set':
                    myClick.c60_fbar_my_list_set(param);
                    break;
                case 'c60_fbar_my_add_desktop':
                    myClick.c60_fbar_my_add_desktop(param);
                    break;
                default:
                    break;
                }
            }
            ;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, param, deferred) {
                $scope.eventMap[event](param);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });
            $scope.eventMap['memberinfo'] = $scope.memberinfo;
            $scope.eventMap['error'] = $scope.error;
            $scope.eventMap['signRet'] = $scope.signRet;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = "cmine";
            $scope.init();
        }
    };
});
uiCore.directive('ititlefts', [
'coreService', 
'coreUtils', 
'$timeout', 
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        scope: {
            param: '=param'
        },
        template: '<div {{param}}><imageholder cid="titleimage" ng-show="compData.JS.titleimageconfigflag" param="compData.JS.titleimageconfig"></imageholder><irichtext cid="titletext" param="compData.JS.titletextconfig"></irichtext></div>',
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        'coreService', 
        'coreUtils', 'Const', 
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                CSS: {
                    "z-index": "2047483648",
                    position: "relative",
                    width: "100%",
                    left: "0px",
                    top: "0px",
                    right: "0px",
                    height: "2.4em",
                    "line-height": "2.4em",
                    "text-align": "left",
                    "padding-left": "2.3em",
                    "border-bottom-width": "1px",
                    "border-bottom-style": "solid",
                    "border-bottom-color": "rgb(214,214,214)",
                    background: "rgb(248,248,248)",
                    "-webkit-box-sizing": "border-box",
                    "-moz-box-sizing": "border-box",
                    "box-sizing": "border-box"
                },
                JS: {
                    clickable: false,
                    stateconfig: {
                        state: "0"
                    },
                    titleimageconfig: {
                        CSS: {},
                        JS: {
                            stateconfig: {
                                state: "0"
                            }
                        }
                    },
                    titletextconfig: {
                        CSS: {
                            "text-align": "left",
                            color: "rgb(34,34,34)",
                            display: "block",
                            "font-size": "1em",
                            height: "2.4em",
                            "line-height": "2.4em"
                        },
                        JS: {
                            clickable: false,
                            stateconfig: {
                                state: "0"
                            }
                        }
                    }
                
                }
            };
            $scope.setEvents = function() {
                if ($scope.compData.JS.clickable) {
                    var _touchstart = Const.touchEvent.start;
                    var _touchmove = Const.touchEvent.move;
                    var _touchend = Const.touchEvent.end;
                    var _lastYPos = 0;
                    var _lastXPos = 0;
                    var _currentYPos = 0;
                    var _currentXPos = 0;
                    $element.bind(_touchend, function(e) {
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': coreUtils.createCdrid($scope.pageID, "", 'returnback')
                            };
                            coreUtils.cdrService($scope.compData.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                        coreService.fireEvent($scope.cid, 'click' + $scope.compData.JS.stateconfig.state);
                    });
                }
            }
            ;
            
            $scope.setState = function(data) {
                $scope.compData.JS.stateconfig.state = data.state;
            }
            ;
            
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $scope.applyStyle();
                $scope.setEvents();
            }
            ;
            
            $scope.applyStyle = function() {
                if (null  != $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]) {
                    coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]);
                }
                $element.css($scope.compData.CSS);
                //用于appbar有subscribeid时
                //                        if(top.subscribeid1){
                //                        $element.css({'padding-left':'0','left':'.7em','top':'.5em'});
                //                        }
            }
            ;
            
            $scope.$watch($scope.param, function(newValue) {
                if ($scope.param) {
                    $scope.compData = $scope.param;
                    $scope.applyStyle();
                }
            });
            $scope.updateTitleText = function(titleTextData, deferred) {
                $scope.compData.JS.titletextconfig.JS.textdata = titleTextData.stitle;
                if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            
            $scope.eventMap['updateState'] = $scope.setState;
            $scope.eventMap['updateTitleText'] = $scope.updateTitleText;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'ititlefts';
            $scope.init();
        }
    };
}
]);
uiCore.directive('receiveinfo', [function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_recevicer_info">' 
        + '<div class="c60_fbar_recevicer_info_con" ng-show="infoflag">' 
        + '<div class="c60_fbar_ri_type c60_fbar_clearfloat">' 
        + '<div class="c60_fbar_ri_type_left" ng-bind="compData.JS.receiveinfoname.text"></div>' 
        + '<div class="c60_fbar_ri_type_right"><span class="c60_fbar_ri_type_righttxt" ng-bind="offerdetails.name"></span></div>' 
        + '</div>' 
        + '<div class="c60_fbar_ri_type c60_fbar_clearfloat">' 
        + '<div class="c60_fbar_ri_type_left" ng-bind="compData.JS.receiveinfomemory.text"></div>' 
        + '<div class="c60_fbar_ri_type_right"><span class="c60_fbar_ri_type_righttxt" ng-bind="offerdetails.memory"></span></div>' 
        + '</div>' 
        + '<div class="c60_fbar_ri_type c60_fbar_clearfloat">' 
        + '<div class="c60_fbar_ri_type_left" ng-bind="compData.JS.receiveinfocolor.JS.text"></div>' 
        + '<div class="c60_fbar_ri_type_right c60_fbar_ri_type_colorcons"></div>' 
        + '</div>' 
        + '<div class="c60_fbar_ri_type c60_fbar_clearfloat">' 
        + '<div class="c60_fbar_ri_type_left" ng-bind="compData.JS.receiveinfopkg.text"></div>' 
        + '<div class="c60_fbar_ri_type_right"><span class="c60_fbar_ri_type_righttxt" ng-bind="offerdetails.tariff"></span></div>' 
        + '</div>' 
        + '</div>' 
        + '<div class="c60_fbar_recevicer_info_con"><div class="c60_fbar_ri_type c60_fbar_clearfloat">' 
        + '<div class="c60_fbar_ri_type_left c60_fbar_ri_type_width30" ng-bind="compData.JS.receiveinfoaddress.text"></div>' 
        + '<div class="c60_fbar_ri_type_right c60_fbar_ri_type_width65"><input type="text" ng-model="inputData" value placeholder="{{compData.JS.inputtext.text}}" class="c60_fbar_ri_type_address_input" /><div class="c60_fbar_ri_type_right c60_fbar_ri_type_width65 c60_fbar_tipstextcolor" ng-bind="compData.JS.inputtext.tips"></div></div>' 
        + '</div></div>' 
        + '<div class="c60_fbar_ri_banli_btn" ><span class="c60_fbar_ri_banli_btn_link" ccid="c60_fbar_ri_banli_btn_link" ng-click="confirmclick()" ng-style="compData.JS.button.CSS" ng-bind="compData.JS.button.JS.text"></span></div>' 
        + '<div class="c60_fbar_ri_tips">' 
        + '<div class="c60_fbar_ri_tips_tit" ng-bind="compData.JS.tiptitle.JS.text" ng-style="compData.JS.tiptitle.CSS"></div>' 
        + '<div class="c60_fbar_ri_tips_txt"></div>' 
        + '</div>' 
        + '</div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 
        'coreUtils', 
        'Const', function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.infoflag = false;
            var tipstxt = angular.element($element[0].querySelector('.c60_fbar_ri_tips_txt'));
            var colordivs = angular.element($element[0].querySelector('.c60_fbar_ri_type_colorcons'))[0];
            var colordot = []
              , colordotcontainer = [];
            $scope.compData = {
                'CSS': {},
                'JS': {}
            };
            $scope.confirmclick = function() {
                var offlinepacksubscription;
                if ($scope.infoflag == true) {
                    offlinepacksubscription = {
                        "address": encodeURIComponent($scope.inputData),
                        "color": $scope.colordatas,
                        "taskId": $scope.taskId
                    
                    }
                } else if ($scope.infoflag == false) {
                    offlinepacksubscription = {
                        "address": $scope.inputData,
                        "taskId": $scope.taskId
                    }
                } else {
                
                }
                if ($scope.inputData == undefined || $scope.inputData == '') {
                    angular.element($element[0].querySelector('.c60_fbar_tipstextcolor')).css('display', 'block');
                } else {
                    angular.element($element[0].querySelector('.c60_fbar_tipstextcolor')).css('display', 'none');
                    if (top.tlbs.messageid != "") {
                        coreService.fireEvent($scope.cid, 'messagestatuschange', {
                            "messageid": top.tlbs.messageid
                        });
                    }
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.confirmbtn.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'btn'),
                            'iseComp': '1'
                        };
                        coreUtils.cdrService($scope.compData.JS.confirmbtn.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'confirmclick', offlinepacksubscription);
                }
            }
            ;
            $scope.update = function(param) {
                if (param) {
                    var pmdata = param.pmdata || {};
                    $scope.taskId = param.taskId || '';
                    if (pmdata.isoffer == 'true' || pmdata.isoffer == true) {
                        $scope.infoflag = true;
                        $scope.offerdetails = pmdata.offerdetails;
                        var color = pmdata.offerdetails.colors;
                        if (($element[0].querySelector('.c60_fbar_ri_type_color_chose')) == null ) {
                            for (var i = 0; i < color.length; i++) {
                                var colorcon;
                                if (i == 0) {
                                    colorcon = angular.element('<div class="c60_fbar_ri_type_color_chose c60_fbar_cur" color="' + color[i].color + '" style="color:' + $scope.compData.JS.receiveinfocolor.CSS.color + '">' + color[i].name + '</div>')[0];
                                
                                } else {
                                    colorcon = angular.element('<div class="c60_fbar_ri_type_color_chose" color="' + color[i].color + '" style="color:' + $scope.compData.JS.receiveinfocolor.CSS.color + '">' + color[i].name + '</div>')[0];
                                }
                                colordot.push(colorcon);
                                colordivs.appendChild(colorcon);
                            }
                        } else {
                        
                        }
                        var cur = angular.element($element[0].querySelector('.c60_fbar_cur'));
                        cur.css({
                            "border": "3px solid #ff7a03",
                            "color": "#ff6600",
                            "background": "#fff"
                        });
                        $scope.colordatas = cur.attr('color');
                        for (var j = 0; j < colordot.length; j++) {
                            var _touchstart = Const.touchEvent.start
                              , _touchend = Const.touchEvent.end;
                            var colordotcontainer = angular.element(colordot[j]);
                            var f = (function(j) {
                                $scope.colordatas = angular.element(colordot[0]).attr('color');
                                var touch = function(e) {
                                    
                                    e.stopPropagation();
                                    e.preventDefault();
                                    
                                    for (var i = 0; i < colordot.length; i++) {
                                        if (i != j) {
                                            angular.element(colordot[i]).removeClass('c60_fbar_cur').css({
                                                "border": "3px solid #eee",
                                                "color": $scope.compData.JS.receiveinfocolor.CSS.color,
                                                "background": "#eee"
                                            });
                                        }
                                    }
                                    angular.element(colordot[j]).addClass('c60_fbar_cur').css({
                                        "border": "3px solid #ff7a03",
                                        "color": "#ff6600",
                                        "background": "#fff"
                                    });
                                    $scope.colordatas = angular.element(colordot[j]).attr('color');
                                }
                                return touch;
                            
                            })(j)
                            colordotcontainer.bind(_touchstart, f);
                        }
                    } else {
                        $scope.infoflag = false;
                    }
                    tipstxt.html($scope.compData.JS.tips_txt.text);
                } else {
                
                }
            
            }
            ;
            $scope.eventMap['update'] = $scope.update;
            $scope.extendComponentData = function(componetData) {
                coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
                $element.css($scope.compData.CSS || {});
                $scope.extendComponentData(coreService.getInitProperties($scope.cid) || {});
                coreService.fireEvent($element.attr('cid'), 'test');
            }
            ;
            
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'receiveinfo';
            $scope.init();
        }
    }
}
]);
uiCore.directive('taocanresult', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div><div class="c60_fbar_taocan_result_con1">' + '<div class="c60_fbar_datouwang8">' + '<div class="c60_fbar_datouwang8-container c60_fbar_container1">' + '<div class="c60_fbar_circle1 c60_fbar_container_div"></div>' + '<div class="c60_fbar_circle2 c60_fbar_container1_circle2 c60_fbar_container_div"></div>' + '<div class="c60_fbar_circle3 c60_fbar_container1_circle3 c60_fbar_container_div"></div>' + '<div class="c60_fbar_circle4 c60_fbar_container1_circle4 c60_fbar_container_div"></div>' + '</div>' + '<div class="c60_fbar_datouwang8-container c60_fbar_container2">' + '<div class="c60_fbar_circle1 c60_fbar_container2_circle1 c60_fbar_container_div"></div>' + '<div class="c60_fbar_circle2 c60_fbar_container2_circle2 c60_fbar_container_div"></div>' + '<div class="c60_fbar_circle3 c60_fbar_container2_circle3 c60_fbar_container_div"></div>' + '<div class="c60_fbar_circle4 c60_fbar_container2_circle4 c60_fbar_container_div"></div>' + '</div>' + '<div class="c60_fbar_datouwang8-container c60_fbar_container3">' + '<div class="c60_fbar_circle1 c60_fbar_container3_circle1 c60_fbar_container_div"></div>' + '<div class="c60_fbar_circle2 c60_fbar_container3_circle2 c60_fbar_container_div"></div>' + '<div class="c60_fbar_circle3 c60_fbar_container3_circle3 c60_fbar_container_div"></div>' + '<div class="c60_fbar_circle4 c60_fbar_container3_circle4 c60_fbar_container_div"></div>' + '</div>' + '</div>' + '<div class="c60_fbar_tips_txt_loading" ng-bind="compData.JS.loadingtext.JS.textdata"></div>' + '</div>' + '<div class="c60_fbar_taocan_result_con2">' + '<div class="c60_fbar_succ_img_con"><span class="c60_fbar_succ_img"  ng-style="{\'background-image\':\'url(\'+taocanresult.imgUrl+\')\'}"/></span></div>' + '<div class="c60_fbar_tips_txt1"></div>' + '<div class="c60_fbar_result_btn" ccid="c60_fbar_link_btn"><a class="c60_fbar_link_btn" ng-bind="taocanresult.btntxt" ng-click="returnclick(taocanresult.action)"></a></div>' + '</div></div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 
        'coreUtils', 
        'Const', 
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.compData = {
                CSS: {},
                JS: {}
            };
            $scope.eventMap = {};
            $scope.gobackClick = function() {}
            ;
            var loadingel = null ;
            var resultel = null ;
            var descel = null ;
            $scope.loadingData = function(param) {
                $element.css({
                    "display": "block"
                });
                loadingel.css({
                    'display': 'block'
                });
                resultel.css({
                    'display': 'none'
                });
            
            }
            ;
            
            $scope.errorData = function(param) {
                var JS = $scope.compData.JS.resultsconfig.JS;
                var temp = null ;
                if (param.errorcode != null  && param.errorcode != undefined) {
                    $scope.result = param.errorcode;
                    if (JS[$scope.result] != null  && JS[$scope.result] != undefined) {
                        temp = JS[$scope.result];
                    } else {
                        temp = JS['default'];
                    }
                } else {
                    temp = JS['default'];
                }
                loadingel.css({
                    'display': 'none'
                });
                resultel.css({
                    'display': 'block'
                });
                temp.imgUrl = temp.imgUrl.replace(/'/g, '');
                $scope.taocanresult = temp;
                descel.innerHTML = $scope.taocanresult.tipstxt;
                coreService.fireEvent($element.attr('cid'), 'changebackbtn', {
                    "state": temp.backaction || '0'
                });
            
            }
            $scope.updateData = function(param) {
                var JS = $scope.compData.JS.resultsconfig.JS;
                var temp = null ;
                if (param.respparam.subscribtionstatus != null  && param.respparam.subscribtionstatus != undefined && param.respparam.subscribtionstatus != "") {
                    $scope.result = param.respparam.subscribtionstatus;
                    //后台没有找到对应错误码，将原始接口错误信息直接通过suberrordesc返回到前台
                    if ($scope.result == JS['defaultErrorCode']) {
                        temp = JS['default'];
                        if (param.respparam.suberrordesc != "" && param.respparam.suberrordesc != null  && param.respparam.suberrordesc != undefined) {
                            temp.tipstxt = param.respparam.suberrordesc || "";
                        }
                    } else {
                        //找到对应的错误码
                        temp = JS[$scope.result];
                        //当返回的错误码前台没有对应信息后，显示默认错误码
                        if (temp == undefined || temp == null  || temp == "") {
                            temp = JS['default'];
                        }
                    }
                } else {
                    temp = JS['default'];
                }
                loadingel.css({
                    'display': 'none'
                });
                resultel.css({
                    'display': 'block'
                });
                temp.imgUrl = temp.imgUrl.replace(/'/g, '');
                $scope.taocanresult = temp;
                descel.innerHTML = $scope.taocanresult.tipstxt;
                coreService.fireEvent($element.attr('cid'), 'changebackbtn', {
                    "state": temp.backaction || '0'
                });
            }
            ;
            
            $scope.getparam = function(name) {
                try {
                    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
                    var r = top.window.location.search.substr(1).match(reg);
                    if (r != null )
                        return unescape(r[2]);
                    return "";
                } catch (e) {}
            }
            ;
            
            $scope.returnclick = function(type) {
                //                    coreUtils.addToLocalStorage("cdrcid", "c60_fbar_link_btn");
                if (type == '0') {
                    //用于appbar直接显示页面订购
                    if ($scope.getparam('appkey') && $scope.getparam('subscribeid'))
                        coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click1');
                    else {
                        coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click0');
                    }
                
                } else if (type == '1') {
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click1');
                } else if (type == '3') {
                    
                    $element.css({
                        'display': 'none'
                    });
                    loadingel.css({
                        'display': 'none'
                    });
                    resultel.css({
                        'display': 'none'
                    });
                
                }
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs['cid'], 'returnbtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
            }
            ;
            
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
                $element.css($scope.compData.CSS || {});
                loadingel = angular.element($element[0].querySelector('.c60_fbar_taocan_result_con1'));
                resultel = angular.element($element[0].querySelector('.c60_fbar_taocan_result_con2'));
                descel = $element[0].querySelector(".c60_fbar_tips_txt1");
                coreService.fireEvent($element.attr('cid'), 'init');
            }
            ;
            
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            $scope.eventMap['update'] = $scope.updateData;
            $scope.eventMap['error'] = $scope.errorData;
            $scope.eventMap['loading'] = $scope.loadingData;
        
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'page';
            $scope.init();
        }
    }
}
]);
uiCore.directive('guess', function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        template: '<div style="height:100%;background-color:#fff;">' + '  <div class="c60_fbar_bg_black_pop" ng-style="getbg_black_popStyle()">' + '	   <div class="c60_fbar_tips_txt" ng-bind="compData.JS.bg_black_pop.JS.desc" style="color:white;margin-top:0"></div>' + '  </div>' 
        
        + '<div class="c60_fbar_taocan_result_con c60_fbar_taocan_result_con_guess" ng-style="gettaocan_result_conStyle()">' + '<div class="c60_fbar_succ_img_con"><span class="c60_fbar_succ_img" ng-style="compData.JS.c60_fbar_taocan_result_con.JS.state.CSS"></span></div>' + '<div class="c60_fbar_tips_txt" ng-bind="compData.JS.c60_fbar_taocan_result_con.JS.state.tipstxt"></div>' + '<div class="c60_fbar_result_btn" ccid="c60_fbar_link_btn"><a class="c60_fbar_link_btn" ng-bind="compData.JS.c60_fbar_taocan_result_con.JS.state.btntxt" ng-click="returnclick()"></a></div>' + '</div>' 
        
        + '<div class="c60_fbar_bg_pop_block" ng-click="click(\'bg_pop_block\');"></div>' + '<div class="c60_fbar_pop_block">' + '<div class="c60_fbar_img_txt_info">' + '<table cellpadding="0" cellspacing="0" class="c60_fbar_img_txt_table">' + '<tr>' + '<td><span class="c60_fbar_goldIcon"></span></td>' + '<td>' + '<div class="c60_fbar_pop_txt3"><span  class="c60_fbar_pop_txt3" ng-show="compData.JS.tips0.isShow" ng-bind="compData.JS.tips0.text"></span>' + '<span  class="c60_fbar_pop_txt3" ng-show="compData.JS.tips1.isShow" ng-bind="compData.JS.tips1.text" ng-style="compData.JS.tips1.CSS"></span>' + '<span  class="c60_fbar_pop_txt3"  ng-show="compData.JS.tips2.isShow" ng-bind="compData.JS.tips2.text"></span>' + '<span  class="c60_fbar_pop_txt3" ng-show="compData.JS.tips3.isShow" ng-bind="compData.JS.tips3.text" ng-style="compData.JS.tips3.CSS"></span>' + '<span  class="c60_fbar_pop_txt3" ng-show="compData.JS.tips4.isShow" ng-bind="compData.JS.tips4.text"></span>' + '</div>' + '</td>' + '</tr>' + '</table>' + '</div>' + '<div class="c60_fbar_img_txt_btn c60_fbar_clearfloat">' + '<div class="c60_fbar_left_itbtn" ccid="c60_fbar_left_itbtn" ng-click="click(\'c60_fbar_left_itbtn\');$event.stopPropagation();" ng-bind="compData.JS.c60_fbar_left_itbtn.JS.text" ng-style="compData.JS.c60_fbar_left_itbtn.CSS"></div>' + '<div class="c60_fbar_right_itbtn" ccid="c60_fbar_right_itbtn" ng-click="click(\'c60_fbar_right_itbtn\');$event.stopPropagation();" ng-bind="compData.JS.c60_fbar_right_itbtn.JS.text" ng-style="compData.JS.c60_fbar_right_itbtn.CSS"></div>' + '</div>' + '</div>' + '	<div class="c60_fbar_guess_mark_con" ng-style="getguess_mark_conStyle()">' + '		<div class="c60_fbar_mark_banner" ccid="c60_fbar_mark_banner" ng-style="getStyle(\'c60_fbar_mark_banner\')" ng-click="click(\'c60_fbar_mark_banner\');">' + '	    	<span class="c60_fbar_tou_look" ccid="c60_fbar_tou_look" ng-click="click(\'c60_fbar_tou_look\');$event.stopPropagation();" ng-bind="compData.JS.c60_fbar_tou_look.JS.text"></span>' + '	    	<div class="c60_fbar_mark_banner_txt"><span ng-bind="compData.JS.c60_fbar_mark_banner_txt.JS.text"></span><span ng-bind="compData.JS.resp.guesslist[0].vaIncreased"></span><span ng-bind="compData.JS.c60_fbar_mark_banner_txt2.JS.text"></span></div>' + '	    </div>' + '	    <div class="c60_fbar_write_txt_zone">' + '	    	<div class="c60_fbar_mark_text_con">' + '	        	<span class="c60_fbar_mark_text" ng-repeat="item in compData.JS.wirte_txt_table.JS.answerlist track by $index" ng-bind="getItem($index)"></span>' 
        
        + '	        </div>' + '	    </div>' + '	    <div class="c60_fbar_wirte_txt_chose">' + '	    	<ul class="c60_fbar_wirte_txt_table c60_fbar_clearfloat">' + '	        	<li ng-repeat="item in compData.JS.wirte_txt_table.JS.wordlist track by $index" ng-bind="item" ng-click="wordclick($index);$event.stopPropagation();"></li>' + '	        </ul>' + '	    </div>' + '	</div>' + '</div>',
        scope: {},
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        'coreService', 
        'coreUtils', 
        'Const', 
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                "CSS": {},
                "JS": {}
            };
            $scope.getguess_mark_conStyle = function() {
                if ($scope.compData.JS.guess_mark_con.JS.stateconfig.state == 0) {
                    return $scope.compData.JS.guess_mark_con.JS.stateconfig.state0;
                } else {
                    return $scope.compData.JS.guess_mark_con.JS.stateconfig.state1;
                }
            }
            ;
            $scope.gettaocan_result_conStyle = function() {
                if ($scope.compData.JS.c60_fbar_taocan_result_con.JS.showconfig.state == 0) {
                    return $scope.compData.JS.c60_fbar_taocan_result_con.JS.showconfig.state0;
                } else {
                    return $scope.compData.JS.c60_fbar_taocan_result_con.JS.showconfig.state1;
                }
            }
            ;
            $scope.taocanresulturl = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_taocan_result_con) {
                    cssvalue = $scope.compData.JS.c60_fbar_taocan_result_con.JS.stateconfig['state' + $scope.compData.JS.c60_fbar_taocan_result_con.JS.stateconfig.state].CSS;
                    return cssvalue;
                }
            }
            $scope.taocanresulttxt = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_taocan_result_con) {
                    return $scope.compData.JS.c60_fbar_taocan_result_con.JS.stateconfig['state' + $scope.compData.JS.c60_fbar_taocan_result_con.JS.stateconfig.state].btntxt;
                }
            }
            $scope.taocanresulttips = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_taocan_result_con) {
                    return $scope.compData.JS.c60_fbar_taocan_result_con.JS.stateconfig['state' + $scope.compData.JS.c60_fbar_taocan_result_con.JS.stateconfig.state].tipstxt;
                }
            }
            $scope.returnclick = function() {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'goFirstPage')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'goFirstPage');
            }
            ;
            $scope.getbg_black_popStyle = function() {
                if ($scope.compData.JS.bg_black_pop.JS.stateconfig.state == 1) {
                    return $scope.compData.JS.bg_black_pop.JS.stateconfig.state1;
                } else {
                    return $scope.compData.JS.bg_black_pop.JS.stateconfig.state0;
                }
            }
            ;
            $scope.getItem = function(index) {
                return $scope.compData.JS.wirte_txt_table.JS.answerlistcollect[index];
            }
            ;
            $scope.bg_black_popShow = function(msg, callback) {
                $scope.compData.JS.bg_black_pop.JS.stateconfig.state = 1;
                angular.element($element[0].querySelector('.c60_fbar_bg_black_pop')).css({
                    'display': 'block'
                });
                setTimeout(function() {
                    //将弹框隐藏 
                    $scope.compData.JS.bg_black_pop.JS.stateconfig.state = 0;
                    angular.element($element[0].querySelector('.c60_fbar_bg_black_pop')).css({
                        'display': 'none'
                    });
                }, $scope.compData.JS.bg_black_pop.JS.stateconfig.time * 1000);
                $scope.compData.JS.bg_black_pop.JS.desc = msg;
            
            }
            ;
            $scope.bg_pop_blockShow = function() {
                return $scope.compData.JS.bg_pop_block.JS.show;
            }
            var reset = function() {
                $scope.compData.JS.wirte_txt_table.JS.answerapp = '';
                $scope.compData.JS.wirte_txt_table.JS.answerindex = 0;
                $scope.compData.JS.wirte_txt_table.JS.answerlistcollect = [];
            }
            $scope.wordclick = function(index) {
                //判断下当前是否可以继续猜，不能则停留在当前页面
                if ($scope.compData.JS.isGuessAble == false) {
                    $scope.bg_black_popShow($scope.compData.JS.tipstext1);
                    return false;
                }
                if ($scope.compData.JS.bg_black_pop.JS.stateconfig.state == 1) {
                    reset();
                    return false;
                }
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.wordclick.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'wordClick')
                    };
                    coreUtils.cdrService($scope.compData.JS.wordclick.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                $scope.compData.JS.wirte_txt_table.JS.answerlistcollect[$scope.compData.JS.wirte_txt_table.JS.answerindex] = $scope.compData.JS.wirte_txt_table.JS.wordlist[index];
                $scope.compData.JS.wirte_txt_table.JS.answerindex = $scope.compData.JS.wirte_txt_table.JS.answerindex + 1;
                $scope.compData.JS.wirte_txt_table.JS.answerapp = $scope.compData.JS.wirte_txt_table.JS.answerapp + $scope.compData.JS.wirte_txt_table.JS.wordlist[index];
                if ($scope.compData.JS.wirte_txt_table.JS.answerindex >= $scope.compData.JS.wirte_txt_table.JS.answerlen) {
                    if ($scope.compData.JS.wirte_txt_table.JS.answerapp == $scope.compData.JS.resp.guesslist[$scope.compData.JS.adindex].answer) {
                        if ($scope.compData.JS.resp.remainTimes <= 0) {
                            //如果猜过了，展示提示信息
                            $scope.bg_black_popShow($scope.compData.JS.tipstext1);
                            return false;
                        }
                        //检查企业id是否在目前列表 
                        /*if($scope.compData.JS.ids.length > 0){
									for(var i=0;i<$scope.compData.JS.ids.length;i++){
										if($scope.compData.JS.ids[i] == $scope.compData.JS.resp.guesslist[adindex].id){
											$scope.bg_black_popShow($scope.compData.JS.tipstext1);
											return false;
										}
									}
								}*/
                        sendGuess("guesssuc");
                        $scope.compData.JS.isGuessed = true;
                    } else {
                        $scope.compData.JS.wirte_txt_table.JS.answerapp = '';
                        $scope.bg_black_popShow($scope.compData.JS.tipstext2);
                        setTimeout(function() {
                            reset();
                        }, $scope.compData.JS.bg_black_pop.JS.stateconfig.time * 1000);
                    }
                }
                ;
            }
            ;
            //接收来自后台成功数据
            $scope.guesssucRet = function(inputData) {
                if (inputData && inputData.respparam) {
                    $scope.compData.JS.guesssucresp = inputData.respparam;
                    angular.element($element[0].querySelector('.c60_fbar_bg_pop_block')).css({
                        'display': 'block'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_pop_block')).css({
                        'display': 'inline'
                    });
                    //							成功返回码2015528
                    if ($scope.compData.JS.guesssucresp.status == '2015528') {
                        $scope.compData.JS.tips0.isShow = true;
                        $scope.compData.JS.tips1.isShow = true;
                        $scope.compData.JS.tips2.isShow = true;
                        $scope.compData.JS.tips3.isShow = true;
                        $scope.compData.JS.tips4.isShow = true;
                        $scope.compData.JS.tips0.text = $scope.compData.JS.tipsok.tipstext0;
                        $scope.compData.JS.tips1.text = $scope.compData.JS.answer;
                        $scope.compData.JS.tips2.text = $scope.compData.JS.tipsok.tipstext1;
                        $scope.compData.JS.tips3.text = inputData.respparam.vaIncreased;
                        $scope.compData.JS.tips4.text = $scope.compData.JS.tipsok.tipstext2;
                        var param = {
                            "respparam": {
                                "vaIncreased": inputData.respparam.vaIncreased
                            }
                        };
                        coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'updateCoinsTotal', param);
                    } else if ($scope.compData.JS.guesssucresp.status == '9206') {
                        $scope.compData.JS.tips0.isShow = true;
                        $scope.compData.JS.tips1.isShow = true;
                        $scope.compData.JS.tips2.isShow = true;
                        $scope.compData.JS.tips3.isShow = false;
                        $scope.compData.JS.tips4.isShow = false;
                        $scope.compData.JS.tips0.text = $scope.compData.JS.tipsfail.tipstext0;
                        $scope.compData.JS.tips1.text = $scope.compData.JS.answer;
                        $scope.compData.JS.tips2.text = $scope.compData.JS.tipsfail.tipstext1;
                    } else {
                        //other_error
                        $scope.compData.JS.tips0.text = $scope.compData.JS.tipserror.tipstext0;
                        $scope.compData.JS.tips0.isShow = true;
                        $scope.compData.JS.tips1.isShow = false;
                        $scope.compData.JS.tips2.isShow = false;
                        $scope.compData.JS.tips3.isShow = false;
                        $scope.compData.JS.tips4.isShow = false;
                    }
                }
            }
            ;
            $scope.eventMap['guesssucRet'] = $scope.guesssucRet;
            $scope.nodatarecvd = function() {
                $scope.showError();
            }
            $scope.eventMap['nodatarecvd'] = $scope.nodatarecvd;
            var myClick = {
                c60_fbar_mark_banner: function(param) {
                    if ($scope.compData.JS.resp.guesslist.length > 0) {
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_mark_banner.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'pictClick')
                            };
                            coreUtils.cdrService($scope.compData.JS.c60_fbar_mark_banner.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                        window.open($scope.compData.JS.resp.guesslist && $scope.compData.JS.resp.guesslist[0].tipslink);
                    }
                },
                c60_fbar_left_itbtn: function(param) {
                    //								if($scope.compData.JS.resp.remainTimes && $scope.compData.JS.resp.remainTimes!=undefined && $scope.compData.JS.resp.remainTimes<=0){
                    //									$scope.bg_black_popShow("不能再猜了哦,可以到官网逛一逛!",reset);
                    //									return false;
                    //								};
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_left_itbtn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'continue')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_left_itbtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    sendGuess("guessagain");
                    angular.element($element[0].querySelector('.c60_fbar_bg_pop_block')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_pop_block')).css({
                        'display': 'none'
                    });
                },
                c60_fbar_right_itbtn: function(param) {
                    if ($scope.compData.JS.resp.guesslist.length > 0) {
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_right_itbtn.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'officialWeb')
                            };
                            coreUtils.cdrService($scope.compData.JS.c60_fbar_right_itbtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                        window.open($scope.compData.JS.resp.guesslist && $scope.compData.JS.resp.guesslist[0].tipslink);
                    }
                },
                c60_fbar_tou_look: function(param) {
                    if ($scope.compData.JS.adindex >= $scope.compData.JS.wirte_txt_table.JS.wordlen) {
                        $scope.bg_black_popShow($scope.compData.JS.tipstext1);
                        return false;
                    }
                    var params = {};
                    if ($scope.compData.JS.resp.guesslist.length > 0) {
                        params = {
                            'imgUrl': $scope.compData.JS.resp.guesslist[$scope.compData.JS.adindex].tipsImage,
                            'imgLink': $scope.compData.JS.resp.guesslist[$scope.compData.JS.adindex].tipslink
                        };
                    }
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_tou_look.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'look')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_tou_look.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'peek');
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'peek2', params);
                },
                bg_pop_block: function(param) {
                    angular.element($element[0].querySelector('.c60_fbar_bg_pop_block')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_pop_block')).css({
                        'display': 'none'
                    });
                }
            }
            //处理所有点击事件
            $scope.click = function(classname, param) {
                if (classname == undefined || classname == null ) {
                    return false;
                }
                switch (classname) {
                case 'c60_fbar_left_itbtn':
                    myClick.c60_fbar_left_itbtn(param);
                    break;
                case 'c60_fbar_right_itbtn':
                    myClick.c60_fbar_right_itbtn(param);
                    break;
                case 'c60_fbar_tou_look':
                    myClick.c60_fbar_tou_look(param);
                    break;
                case 'bg_pop_block':
                    myClick.bg_pop_block(param);
                    break;
                case 'c60_fbar_mark_banner':
                    myClick.c60_fbar_mark_banner(param);
                    break;
                default:
                
                }
            }
            ;
            //处理所有元素样式
            $scope.getStyle = function(classname) {
                if (classname == undefined || classname == null ) {
                    return false;
                }
                if ($scope.compData.JS[classname] && $scope.compData.JS[classname].CSS) {
                    return $scope.compData.JS[classname].CSS;
                }
            }
            ;
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            var sendGuess = function(event) {
                if ("guessagain" == event) {
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || event);
                } else {
                    var adindex = $scope.compData.JS.adindex;
                    var item = $scope.compData.JS.resp.guesslist[adindex];
                    var param = {
                        "id": item.id
                    }
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || event, param);
                }
            }
            ;
            var stringToArray = function() {
                //企业数组
                //	                	 $scope.compData.JS.ids = [];
                $scope.compData.JS.wirte_txt_table = {
                    "CSS": {},
                    "JS": {}
                };
                $scope.compData.JS.wirte_txt_table.JS.answerlistcollect = [];
                $scope.compData.JS.wirte_txt_table.JS.answerlist = [];
                //初始化数据
                $scope.compData.JS.isGuessAble = true;
                $scope.compData.JS.isGuessed = false;
                $scope.compData.JS.remainTimes = 100;
                $scope.compData.JS.adindex = 0;
                $scope.compData.JS.answer = "";
                $scope.compData.JS.resp = {};
                $scope.compData.JS.guesssucresp = {};
                $scope.compData.JS.wirte_txt_table.JS.answerindex = 0;
                $scope.compData.JS.wirte_txt_table.JS.answerapp = 0;
                $scope.compData.JS.wirte_txt_table.JS.answerlen = 0;
                $scope.compData.JS.wirte_txt_table.JS.wordindex = 0;
                $scope.compData.JS.wirte_txt_table.JS.wordlen = 0;
            }
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid) || {});
                $element.css($scope.compData.css || {});
                //将后台字符串转换为数组
                stringToArray();
                //	                     sendGuess("guessagain");
            }
            ;
            $scope.showError = function() {
                //将提示页面显示出来，隐藏原来空白页面
                $scope.compData.JS.c60_fbar_taocan_result_con.JS.showconfig.state = 1;
                $scope.compData.JS.guess_mark_con.JS.stateconfig.state = 0;
            }
            
            function transData(param) {
                //首先判断remainTimes
                //DTS2015051808343 add by h00278783 start---------------
                if ((param.guesslist && param.guesslist.length <= 0) || (param.guesslist[0] && Object.keys(param.guesslist[0]).length <= 0)) {
                    $scope.compData.JS.isGuessAble = false;
                    if ($scope.compData.JS.isGuessed == false) {
                        $scope.showError();
                        return false;
                    } else {
                        //如果猜过了，展示提示信息
                        $scope.bg_black_popShow($scope.compData.JS.tipstext1);
                        return false;
                    }
                }
                reset();
                //这个时候将后台数据和组件信息绑定
                $scope.compData.JS.resp = param;
                var adindex = $scope.compData.JS.adindex;
                //DTS2015051808343 add by h00278783 end---------------
                var item = $scope.compData.JS.resp.guesslist[adindex];
                var words = item.words;
                if (words == null  || words == undefined || words.length <= 0) {
                    $scope.showError();
                    return false;
                }
                var wordlisttemp = [];
                //判断长度,不能超过系统限制的值
                var len = words.length;
                var maxlen = $scope.compData.JS.maxline * $scope.compData.JS.maxlist;
                
                len = len > maxlen ? maxlen : len;
                $scope.compData.JS.wirte_txt_table.JS.wordlist = [];
                for (var i = 0; i < len; i++) {
                    wordlisttemp[i] = words.charAt(i);
                }
                $scope.compData.JS.wirte_txt_table.JS.wordlist = wordlisttemp;
                
                var answer = item.answer;
                var answertemp = [];
                var len2 = answer.length;
                $scope.compData.JS.wirte_txt_table.JS.answerlist = [];
                for (var i = 0; i < len2; i++) {
                    answertemp[i] = answer.charAt(i);
                }
                angular.element($element[0].querySelector('.c60_fbar_mark_banner')).css('background-image', 'url(' + $scope.compData.JS.resp.guesslist[adindex].image + ')');
                $scope.compData.JS.wirte_txt_table.JS.answerlist = answertemp;
                $scope.compData.JS.wirte_txt_table.JS.answerlen = item.answer.length;
                $scope.compData.JS.wirte_txt_table.JS.wordlen = $scope.compData.JS.resp.guesslist.length;
                $scope.compData.JS.answer = $scope.compData.JS.resp.guesslist[adindex].answer;
            }
            ;
            //接收来自后台的数据
            $scope.getDataInit = function(inputData) {
                //解析words
                if (inputData && inputData.respparam) {
                    transData(inputData.respparam);
                } else {
                    //将提示页面显示出来，隐藏原来空白页面
                    $scope.showError();
                    return false;
                }
            }
            ;
            $scope.eventMap['getDataInit'] = $scope.getDataInit;
            //接收来自后台的数据
            $scope.getDataFromRet = function(inputData) {
            //						$scope.revData = inputData;
            }
            ;
            $scope.eventMap['getDataFromRet'] = $scope.getDataFromRet;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });
        
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = "guess";
            $scope.init();
        }
    };
});
uiCore.directive('mineset', function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        template: '<div>' 
        + '   <div class="c60_fbar_returnwrap" ng-click="returnbackclick()"><div class="c60_fbar_returnback" ccid="c60_fbar_returnback"></div></div>' 
        + '   <div class="c60_fbar_bg_black_pop" ng-style="getbg_black_popStyle()">' 
        + '    <div class="c60_fbar_tips_txt" style="color:white;margin-top:.7em;" ng-bind="compData.JS.bg_black_pop.JS.desc"></div>' 
        + '   </div>' 
        + '<div class="c60_fbar_bg_pop_block" ng-style="getbg_pop_blockStyle()" ng-click="$event.stopPropagation();"></div>' 
        + '<div class="c60_fbar_pop_block"  ng-style="getpop_blockStyle()">' 
        + '	<div class="c60_fbar_img_txt_info">' 
        + '    	<table cellpadding="0" cellspacing="0" class="c60_fbar_img_txt_table">' 
        + '        	<tr>' 
        + '            	<td><span class="c60_fbar_haveatea"></span></td>' 
        + '                <td>' 
        + '                	<div class="c60_fbar_txt1"><span ng-bind="compData.JS.c60_fbar_txt1.JS.text"></span>&nbsp;&nbsp;<span ng-style="compData.JS.c60_fbar_txt2.CSS"><span ng-bind="compData.JS.c60_fbar_txt5.JS.text"></span><span ng-bind="compData.JS.close_list_detail.JS.curText"></span><span ng-bind="compData.JS.c60_fbar_txt6.JS.text"></span></span>&nbsp;&nbsp;?</div>' 
        + '                    <div class="c60_fbar_txt1" ng-style="compData.JS.c60_fbar_txt3.CSS"><span ng-bind="compData.JS.c60_fbar_txt3.JS.text"></span>&nbsp;，&nbsp;<span ng-bind="compData.JS.close_list_detail.JS.curInfo"></span><span ng-bind="compData.JS.c60_fbar_txt4.JS.text"></span></div>' 
        + '                </td>' 
        + '            </tr>' 
        + '        </table>' 
        + '    </div>' 
        + '    <div class="c60_fbar_img_txt_btn clearfloat">' 
        + '        <div class="c60_fbar_left_itbtn" ng-click="c60_fbar_left_itbtnClick();" ng-bind="compData.JS.c60_fbar_left_itbtn.JS.text"></div>' 
        + '        <div class="c60_fbar_right_itbtn" ng-click="c60_fbar_right_itbtnClick();" ng-bind="compData.JS.c60_fbar_right_itbtn.JS.text"></div>' 
        + '    </div>' 
        + '</div>' 
        
        + '   <div class="c60_fbar_my_con_sz" ng-style="getStyle(\'my_con\')" ><div class="c60_fbar_my_con_div" simplescroll>'
        //个性化设置
         
        + '    <div class="c60_fbar_my_list_con c60_fbar_my_con_sz" ccid="c60_fbar_my_list_con4" ng-click="my_list_conClick(4)" ng-show="compData.JS.c60_fbar_gexinghua.JS.isShow">' 
        + '     <div class="c60_fbar_my_list">' 
        + '      <div class="c60_fbar_my_list_detail clearfloat">' 
        + '       <div class="c60_fbar_mytitle" ng-style="getStyle(\'mytitle\')">' 
        + '        <span class="c60_fbar_gexinghua" ng-style="compData.JS.c60_fbar_gexinghua.CSS" ng-bind="compData.JS.c60_fbar_gexinghua.JS.text"></span>' 
        + '       </div>' 
        + '       <div class="c60_fbar_arrow_down">' 
        + '        <span class="c60_fbar_arrow_down_ico" id="down_up" ng-style="getIconStyle(4)"></span>' 
        + '       </div>' 
        + '      </div>' 
        + '     </div>' 
        + '     <div class="c60_fbar_gexinghua_on" ng-style="getOptionStyle(4)" ng-click="$event.stopPropagation()" >'
        //展开的内容start
         
        + '			<div class="c60_fbar_gexinghua_con c60_fbar_hid">' 
        + '        	<div class="c60_fbar_gexinghua_detail">' 
        + '            	<div class="c60_fbar_gexinghua_detail_tit">日均流量低于 <span class="c60_fbar_gexinghua_detail_orangetxt" ng-bind="compData.JS.c60_fbar_gexinghua.JS.aveTrafficNotifyValue"></span> MB，提醒我</div>' 
        + '                <div class="c60_fbar_gxh_d_cbox_con">' 
        + '                	<span id="selectedline" class="c60_fbar_gxh_d_cbox_selected_line"></span>' 
        + '                	<ul id="avetraffic"class="c60_fbar_gexinghua_detail_chosebox c60_fbar_clearfloat" ccid="c60_fbar_touchslide_up">' 
        + '                        <li ng-repeat="item in compData.JS.avetraffic_chose.JS.text track by $index" ccid="c60_fbar_avetraffic_chose_txt" ng-click="choseTrafficNotify($index)" ng-bind="item"></li>' 
        + '                  </ul>' 
        + '                </div>' 
        + '            </div>' 
        + '            <div class="c60_fbar_gexinghua_detail">' 
        + '            	<div class="c60_fbar_gexinghua_detail_tit">流量消耗超过 <span class="c60_fbar_gexinghua_detail_orangetxt1" ng-bind="compData.JS.c60_fbar_gexinghua.JS.consumeTrafficNotifyValue"></span> %，提醒我</div>' 
        + '                <div class="c60_fbar_gxh_d_cbox_con">' 
        + '                	<span  id="selectedline1" class="c60_fbar_gxh_d_cbox_selected_line1"></span>' 
        + '                	<ul  id="consumeTrafficSet" class="c60_fbar_gexinghua_detail_chosebox c60_fbar_clearfloat" ccid="c60_fbar_touchslide_down">' 
        + ' 					<li ng-repeat="item in compData.JS.consumetraffic_chose.JS.text track by $index" ccid="c60_fbar_consumetr_chose_txt" ng-click="choseConsumeTrafficNotify($index)" ng-bind="item"></li>' 
        + '                  </ul>' 
        + '                </div>' 
        + '            </div>' 
        + '        </div>'
        //展开的内容end
         
        + '     </div>' 
        + '    </div>' 
        
        
        + '    <div class="c60_fbar_my_list_con c60_fbar_my_con_sz" ccid="c60_fbar_my_list_con1" ng-click="my_list_conClick(1)" >' 
        + '     <div class="c60_fbar_my_list">' 
        + '      <div class="c60_fbar_my_list_detail clearfloat">' 
        + '       <div class="c60_fbar_mytitle" ng-style="getStyle(\'mytitle\')">' 
        + '        <span class="c60_fbar_about" ng-style="compData.JS.c60_fbar_about.CSS" ng-bind="compData.JS.c60_fbar_about.JS.text"></span>' 
        + '       </div>' 
        + '       <div class="c60_fbar_arrow_down">' 
        + '        <span class="c60_fbar_arrow_down_ico" id="down_up" ng-style="getIconStyle(1)"></span>' 
        + '       </div>' 
        + '      </div>' 
        + '     </div>' 
        + '     <div class="c60_fbar_about_con" ng-style="getOptionStyle(1)" ng-click="$event.stopPropagation()" >' 
        + '      <h4 class="c60_fbar_about_tit"  ng-bind="compData.JS.textconfig.text2"></h4>' 
        + '      <div class="c60_fbar_about_txt_img">' 
        + '       <div class="c60_fbar_guanyu_img_left">' 
        + '        <span class="c60_fbar_guanyu1_img">&nbsp;</span><span class="c60_fbar_span_text" ng-bind="compData.JS.textconfig.text3"></span>' 
        + '        <span class="c60_fbar_span_text c60_fbar_font_bold"  ng-bind="compData.JS.textconfig.text4"></span><span class="c60_fbar_span_text" ng-bind="compData.JS.textconfig.text5"></span>' 
        + '        <span class="c60_fbar_span_text c60_fbar_font_bold"  ng-bind="compData.JS.textconfig.text6"></span><span class="c60_fbar_span_text" ng-bind="compData.JS.textconfig.text7"></span>' 
        + '        <span class="c60_fbar_span_text c60_fbar_font_bold" ng-bind="compData.JS.textconfig.text8"></span><span class="c60_fbar_span_text"  ng-bind="compData.JS.textconfig.text9"></span>' 
        + '        <span class="c60_fbar_span_text c60_fbar_font_bold" ng-bind="compData.JS.textconfig.text10"></span><span class="c60_fbar_span_text" ng-bind="compData.JS.textconfig.text11"></span>' 
        + '       </div>' 
        + '       <div class="c60_fbar_guanyu_img_right">' 
        + '        <span class="c60_fbar_guanyu2_img">&nbsp;</span><span ng-bind="compData.JS.textconfig.text12"></span>' 
        + '        <span class="c60_fbar_font_bold" ng-bind="compData.JS.textconfig.text13"></span><span ng-bind="compData.JS.textconfig.text14"></span>' 
        + '       </div>' 
        + '       <div class="c60_fbar_guanyu_img_left">' 
        + '        <span class="c60_fbar_guanyu3_img">&nbsp;</span><span  ng-bind="compData.JS.textconfig.text15"></span>' 
        + '       </div>' 
        + '       <div class="c60_fbar_guanyu_img_right">' 
        + '        <span class="c60_fbar_guanyu4_img">&nbsp;</span><span  ng-bind="compData.JS.textconfig.text16"></span>' 
        + '        <span class="c60_fbar_font_bold" ng-bind="compData.JS.textconfig.text17"></span></span><span ng-bind="compData.JS.textconfig.text18"></span>' 
        + '       </div>' 
        + '      </div>' 
        + '     </div>' 
        + '    </div>' 
        + '    <div class="c60_fbar_my_list_con c60_fbar_my_con_sz" ccid="c60_fbar_my_list_con2" ng-click="my_list_conClick(2)">' 
        + '     <div class="c60_fbar_my_list">' 
        + '      <div class="c60_fbar_my_list_detail clearfloat">' 
        + '       <div class="c60_fbar_mytitle" ng-style="getStyle(\'mytitle\')">' 
        + '        <span class="c60_fbar_feedback" ng-style="compData.JS.c60_fbar_feedback.CSS" ng-bind="compData.JS.c60_fbar_feedback.JS.text"></span>' 
        + '       </div>' 
        + '       <div class="c60_fbar_arrow_down">' 
        + '        <span class="c60_fbar_arrow_down_ico" id="down_up" ng-style="getIconStyle(2)"></span>' 
        + '       </div>' 
        + '      </div>' 
        + '     </div>' 
        + '    </div>' 
        
        + '    <div class="c60_fbar_my_list_confeed">' 
        + '     <div class="c60_fbar_feedback_con" ng-style="getOptionStyle(2)">' 
        + '      <div class="c60_fbar_feedback_tit" ccid="c60_fbar_feedback_tit" ng-bind="compData.JS.c60_fbar_feedback_tit.JS.text">' 
        + '      </div>' 
        + '      <div class="c60_fbar_feedback_chose clearfloat">' 
        + '       <span class="c60_fbar_feedback_chose_txt" ccid="c60_fbar_feedback_chose_txt" ng-repeat="item in compData.JS.feedback_chose.JS.text" ng-style="isSelected($index)" ng-click="feedbackChoseTxtClick($index);$event.stopPropagation();"><span ng-bind="item"></span></span>' 
        + '      </div>' 
        + '      <span><textarea class="c60_fbar_feedback_zone" ng-focus="focus()" ng-blur="blur()"  ng-style="isfeedback_zoneShow()" ng-model="compData.JS.feedback_zone.JS.text"></textarea></span>' 
        + '      <div class="c60_fbar_submit_btn clearfloat">' 
        + '       <span class="c60_fbar_tijiao_btn" ccid="c60_fbar_tijiao_btn" ng-style="gettijiao_btnStyle()" ng-click="tijiao_btnClick();$event.stopPropagation();" ng-bind="compData.JS.c60_fbar_tijiao_btn.JS.text"></span>' 
        + '       <span class="c60_fbar_tuiding" ng-click="tuidingClick();$event.stopPropagation();" ccid="c60_fbar_tuiding" ng-show="compData.JS.c60_fbar_tuiding.JS.isShow" ng-bind="compData.JS.c60_fbar_tuiding.JS.text"></span>' 
        + '      </div>' 
        + '     </div>' 
        + '    </div>' 
        
        + '    <div class="c60_fbar_my_list_con c60_fbar_my_con_sz" ccid="c60_fbar_my_list_con3" ng-click="my_list_conClick(3)">' 
        + '     <div class="c60_fbar_my_list">' 
        + '      <div class="c60_fbar_my_list_detail clearfloat">' 
        + '       <div class="c60_fbar_mytitle" ng-style="getStyle(\'mytitle\')">' 
        + '        <span class="c60_fbar_set_close" ng-style="compData.JS.c60_fbar_set_close.CSS" ng-bind="compData.JS.c60_fbar_set_close.JS.text"></span>' 
        + '       </div>' 
        + '       <div class="c60_fbar_arrow_down">' 
        + '        <span class="c60_fbar_arrow_down_ico" id="down_up" ng-style="getIconStyle(3)"></span>' 
        + '       </div>' 
        + '      </div>' 
        + '     </div>' 
        + '     <div class="c60_fbar_close_con" ng-style="getOptionStyle(3)" ng-click="$event.stopPropagation()">' 
        + '      <table class="c60_fbar_close_list_detail">' 
        + '       <tbody>' 
        + '        <tr ng-repeat="item in compData.JS.close_list_detail.JS.text" ng-show="item.isShow">' 
        + '         <td ng-bind="item.desc"></td>' 
        + '         <td><a class="c60_fbar_guanbi_btn" ccid="c60_fbar_guanbi_btn" ng-click="close_list_detailClick($index);$event.stopPropagation();" ng-bind="item.type"></a></td>' 
        + '        </tr>' 
        + '       </tbody>' 
        + '      </table>' 
        + '     </div>' 
        + '     </div>' 
        + '    </div>' 
        + '   </div>' 
        + '</div>',
        scope: {},
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        'coreService', 
        'coreUtils', 
        'Const', 
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.compData = {
                "CSS": {},
                "JS": {}
            };
            //当用户点击进去的时候，置空
            $scope.focus = function() {
                if ($scope.compData.JS.feedback_zone.JS.text == $scope.compData.JS.feedback_zone.JS.oldtext) {
                    $scope.compData.JS.feedback_zone.JS.text = "";
                    $scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state = 1;
                }
            }
            ;
            //当用户点击进去的时候，置空
            $scope.blur = function() {
                if ($scope.compData.JS.feedback_zone.JS.text == "") {
                    $scope.compData.JS.feedback_zone.JS.text = $scope.compData.JS.feedback_zone.JS.oldtext;
                }
            }
            ;
            $scope.gettijiao_btnStyle = function() {
                if ($scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.click == true) {
                    return $scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state1;
                }
                if ($scope.compData.JS.feedback_zone.JS.text == '') {
                    $scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state = 1;
                } else {
                    $scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state = 0;
                }
                if ($scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state == 0) {
                    return $scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state0;
                } else {
                    return $scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state1;
                }
            }
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            //页面元素配置项
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
                /*$timeout(function() {
	                         $scope.$apply();
	                     });*/
            }
            ;
            var stringToArray = function() {
                //关于内容
                //	                	var len = $scope.compData.JS.about_tit.JS.len;
                //						$scope.compData.JS.about_tit.JS.content = [];
                //						for(var i = 0;i<len;i++){
                //							$scope.compData.JS.about_tit.JS.content.push($scope.compData.JS.about_tit.JS["content"+i]);
                //						}
                //反馈内容
                len = $scope.compData.JS.feedback_chose.JS.len;
                //点击提交时候，记录下
                $scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.click = false;
                $scope.compData.JS.feedback_chose.JS.text = [];
                for (var i = 0; i < len; i++) {
                    $scope.compData.JS.feedback_chose.JS.text.push($scope.compData.JS.feedback_chose.JS["text" + i]);
                }
                //选择日均流量提醒内容
                len = $scope.compData.JS.avetraffic_chose.JS.len;
                
                $scope.compData.JS.avetraffic_chose.JS.text = [];
                for (var i = 0; i < len; i++) {
                    $scope.compData.JS.avetraffic_chose.JS.text.push($scope.compData.JS.avetraffic_chose.JS["text" + i]);
                }
                //选择消耗流量提醒内容
                len = $scope.compData.JS.consumetraffic_chose.JS.len;
                $scope.compData.JS.consumetraffic_chose.JS.text = [];
                for (var i = 0; i < len; i++) {
                    $scope.compData.JS.consumetraffic_chose.JS.text.push($scope.compData.JS.consumetraffic_chose.JS["text" + i]);
                }
                //关闭内容
                len = $scope.compData.JS.close_list_detail.JS.len;
                $scope.compData.JS.close_list_detail.JS.text = [];
                for (var i = 0; i < len; i++) {
                    $scope.compData.JS.close_list_detail.JS.text.push($scope.compData.JS.close_list_detail.JS["text" + i]);
                }
                //初始化数据
                //将之前反馈框中内容记录下来
                $scope.compData.JS.feedback_zone.JS.oldtext = $scope.compData.JS.feedback_zone.JS.text;
                $scope.compData.JS.feedback_chose.JS.content = $scope.compData.JS.feedback_chose.JS.text[$scope.compData.JS.feedback_chose.JS.index];
            }
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid) || {});
                $element.css($scope.compData.css || {});
                //将后台字符串转换为数组
                stringToArray();
                
                //resolve when scrol feedback,the parent page alse scroll
                (function() {
                    var inputbox = $element[0].querySelector('textarea');
                    var _lastYPos = 0;
                    var _currentYPos = 0;
                    var moveFlag = false;
                    var touchFlag = false;
                    var start = function(e) {
                        touchFlag = true;
                        _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    }
                    ;
                    var move = function(e) {
                        _currentYPos = e.touches ? e.touches[0].pageY : e.pageY;
                        if (Math.abs(_currentYPos - _lastYPos) > 3 || moveFlag || !touchFlag) {
                            moveFlag = true;
                            e.stopPropagation();
                            e.preventDefault();
                        }
                        _lastYPos = _currentYPos;
                    }
                    ;
                    var end = function(e) {
                        if (moveFlag) {
                            e.stopPropagation();
                            e.preventDefault();
                        }
                        _lastYPos = 0;
                        _currentYPos = 0;
                        touchFlag = false;
                        moveFlag = false;
                    }
                    ;
                    inputbox.addEventListener('touchstart', start);
                    inputbox.addEventListener('touchmove', move);
                    inputbox.addEventListener('touchend', end);
                
                })();
            }
            ;
            $scope.getStyle = function(classname) {
                if ($scope.compData.JS[classname] && $scope.compData.JS[classname].CSS) {
                    return $scope.compData.JS[classname].CSS;
                }
            }
            ;
            $scope.isSelected = function(index) {
                if ($scope.compData.JS.feedback_chose.JS.index == index) {
                    return $scope.compData.JS.feedback_chose.JS.stateconfig.status1;
                } else {
                    return $scope.compData.JS.feedback_chose.JS.stateconfig.status0;
                }
            }
            ;
            $scope.feedbackChoseTxtClick = function(index) {
                if ($scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.click == true) {
                    if (Number($scope.compData.JS.feedback_chose.JS.index) != Number(index)) {
                        angular.element($element[0].querySelector('.c60_fbar_tijiao_btn')).css(
                        {
                            "background-color": "#73d7bd",
                            "color": "#fff"
                        });
                        $scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state = 0;
                        $scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.click = false;
                    }
                }
                
                $scope.compData.JS.feedback_chose.JS.index = index;
                var texts = $scope.compData.JS.feedback_chose.JS.text;
                var len = texts.length;
                if (index == len - 1) {
                    $scope.compData.JS.feedback_chose.JS.index = index;
                    $scope.compData.JS.feedback_zone.JS.stateconfig.status = 1;
                } else {
                    //每次点击，记录下当前字符串
                    $scope.compData.JS.feedback_chose.JS.content = $scope.compData.JS.feedback_chose.JS.text[index];
                    $scope.compData.JS.feedback_zone.JS.stateconfig.status = 0;
                }
                //						//跟踪话单
                //						if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_feedback_chose_txt.JS.cdrConfig)) {
                //	                        $scope.compData.JS['cdrData'] = {};
                //	                        $scope.compData.JS.cdrData = {
                //	                            'pageId': $scope.pageID,
                //	                            'componentId': coreUtils.createCdrid($scope.pageID,$attrs.cid,'chosetxt')
                //	                        };
                //	                        coreUtils.cdrService($scope.compData.JS.c60_fbar_feedback_chose_txt.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                //	                    }
            }
            $scope.isfeedback_zoneShow = function() {
                if ($scope.compData.JS.feedback_zone.JS.stateconfig.status == 0) {
                    return $scope.compData.JS.feedback_zone.JS.stateconfig.status0;
                } else {
                    return $scope.compData.JS.feedback_zone.JS.stateconfig.status1;
                }
            }
            ;
            $scope.getbg_black_popStyle = function() {
                if ($scope.compData.JS.bg_black_pop.JS.stateconfig.state == 1) {
                    return $scope.compData.JS.bg_black_pop.JS.stateconfig.state1;
                } else {
                    return $scope.compData.JS.bg_black_pop.JS.stateconfig.state0;
                }
            }
            ;
            
            $scope.bg_black_popShow = function(msg) {
                $scope.compData.JS.bg_black_pop.JS.stateconfig.state = 1;
                angular.element($element[0].querySelector('.c60_fbar_bg_black_pop')).css({
                    'display': 'block'
                });
                setTimeout(function() {
                    //将弹框隐藏 
                    $scope.compData.JS.bg_black_pop.JS.stateconfig.state = 0;
                    angular.element($element[0].querySelector('.c60_fbar_bg_black_pop')).css({
                        'display': 'none'
                    });
                }, $scope.compData.JS.bg_black_pop.JS.stateconfig.time * 1000);
                $scope.compData.JS.bg_black_pop.JS.desc = msg;
            }
            ;
            
            //提交反馈内容
            $scope.tijiao_btnClick = function() {
                if (Number($scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state) != 1) {
                    //跟踪话单
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_tijiao_btn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'submit')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_tijiao_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    var curIndex = $scope.compData.JS.feedback_chose.JS.index;
                    var texts = $scope.compData.JS.feedback_chose.JS.text;
                    var len = texts.length;
                    var content = "";
                    var last = false;
                    //说明用户提交的是反馈框中内容
                    if (curIndex == len - 1) {
                        content = $scope.compData.JS.feedback_zone.JS.text;
                        last = true;
                    } else {
                        content = $scope.compData.JS.feedback_chose.JS.content;
                    }
                    if (content == '') {
                        $scope.bg_black_popShow($scope.compData.JS.feedback_zone.JS.tips1);
                    } else if (content == $scope.compData.JS.feedback_zone.JS.oldtext) {
                        $scope.bg_black_popShow($scope.compData.JS.feedback_zone.JS.tips2);
                    } else {
                        if (last == true) {
                            $scope.compData.JS.feedback_zone.JS.text = "";
                        }
                        $scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.click = true;
                        $scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state = 1;
                        angular.element($element[0].querySelector('.c60_fbar_tijiao_btn')).css(
                        {
                            "background-color": "#cacecd",
                            "color": "#999"
                        });
                        //将反馈内容发送到后台
                        var param = {
                            "feedback": encodeURIComponent(content),
                            "componentId": "cmineset",
                            "pageId": "imineset",
                            "templateId": "fullscreenbar"
                        };
                        coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'feedsubmit', param);
                    
                    }
                }
            }
            ;
            //当点击反馈
            $scope.feedFunc = function(inputData) {
                if (inputData && inputData.respparam && inputData.respparam.success == 'Feedback Submitted Successfully') {
                    $scope.bg_black_popShow($scope.compData.JS.tips.submittextSuccess);
                } else {
                    $scope.bg_black_popShow($scope.compData.JS.tips.submittextFail);
                }
            }
            ;
            //退订按钮,进入到退订页面
            $scope.tuidingClick = function() {
                //跟踪话单
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_tuiding.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'tuiding')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_tuiding.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'tuiclick');
            }
            ;
            $scope.getbg_pop_blockStyle = function() {
                if ($scope.compData.JS.bg_pop_block.JS.stateconfig.status == 0) {
                    return $scope.compData.JS.bg_pop_block.JS.stateconfig.status0;
                } else {
                    return $scope.compData.JS.bg_pop_block.JS.stateconfig.status1;
                }
            }
            ;
            $scope.getpop_blockStyle = function() {
                if ($scope.compData.JS.pop_block.JS.stateconfig.status == 0) {
                    return $scope.compData.JS.pop_block.JS.stateconfig.status0;
                } else {
                    return $scope.compData.JS.pop_block.JS.stateconfig.status1;
                }
            }
            ;
            $scope.c60_fbar_left_itbtnClick = function() {
                //跟踪话单
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_left_itbtn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'bule')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_left_itbtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                $scope.compData.JS.bg_pop_block.JS.stateconfig.status = 0;
                $scope.compData.JS.pop_block.JS.stateconfig.status = 0;
            }
            ;
            $scope.c60_fbar_right_itbtnClick = function() {
                top.tlbs.toolbarclose = "close";
                //跟踪话单
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_right_itbtn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'shide')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_right_itbtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                $scope.compData.JS.pop_block.JS.stateconfig.status = 0;
                $scope.compData.JS.bg_pop_block.JS.stateconfig.status = 0;
                var index = $scope.compData.JS.close_list_detail.JS.curIndex;
                //本日关闭
                var param = {
                    "closeunit": "1",
                    "cycle": "1",
                    "interval": "0",
                    "start": "1",
                    "componentId": 'cmineset',
                    "isSelfOperation": "true",
                    "pageId": "imineset",
                    "templateId": "fullscreenbar"
                }
                //本周关闭
                if (index == 1) {
                    param.closeunit = '2';
                }
                //本月关闭
                if (index == 2) {
                    param.closeunit = '3';
                }
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'close', param);
            }
            ;
            //关闭类型
            $scope.close_list_detailClick = function(index) {
                //跟踪话单
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_guanbi_btn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'guanbi') + index
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_guanbi_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                $scope.compData.JS.bg_pop_block.JS.stateconfig.status = 1;
                $scope.compData.JS.pop_block.JS.stateconfig.status = 1;
                $scope.compData.JS.close_list_detail.JS.curIndex = index;
                $scope.compData.JS.close_list_detail.JS.curText = $scope.compData.JS.close_list_detail.JS.text[index].type;
                $scope.compData.JS.close_list_detail.JS.curInfo = $scope.compData.JS.close_list_detail.JS.text[index].info;
            
            }
            ;
            //当点击关闭后关闭toolbar
            $scope.closeFunc = function() {
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'closeToolbar');
            }
            ;
            $scope.eventMap['closeFunc'] = $scope.closeFunc;
            $scope.eventMap['feedFunc'] = $scope.feedFunc;
            $scope.my_list_conClick = function(item) {
                //跟踪话单
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_tijiao_btn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'con') + item
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_tijiao_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                $scope.compData.JS.native.JS.index = item;
                if (item == $scope.compData.JS.native.JS.last) {
                    $scope.compData.JS.native.JS.index = -1;
                    $scope.compData.JS.native.JS.last = 0;
                } else {
                    $scope.compData.JS.native.JS.last = item;
                }
                angular.element($element[0].querySelector('.c60_fbar_my_con_div')).css('transform', 'translate3d(0px, 0px, 0px)');
                angular.element($element[0].querySelector('.c60_fbar_my_con_div')).css('-webkit-transform', 'translate3d(0px, 0px, 0px)');
                angular.element($element[0].querySelector('.c60_fbar_my_con_div')).css('-moz-transform', 'translate3d(0px, 0px, 0px)');
                angular.element($element[0].querySelector('.c60_fbar_my_con_div')).css('-ms-transform', 'translate3d(0px, 0px, 0px)');
                angular.element($element[0].querySelector('.c60_fbar_my_con_div')).css('-o-transform', 'translate3d(0px, 0px, 0px)');
            }
            ;
            $scope.getIconStyle = function(index) {
                if (index == $scope.compData.JS.native.JS.index) {
                    return $scope.compData.JS.native.JS.icon.stateconfig.state1;
                } else {
                    return $scope.compData.JS.native.JS.icon.stateconfig.state0;
                }
            }
            ;
            $scope.getOptionStyle = function(index) {
                if (index == $scope.compData.JS.native.JS.index) {
                    return $scope.compData.JS.native.JS.option.stateconfig.state1;
                } else {
                    return $scope.compData.JS.native.JS.option.stateconfig.state0;
                }
            }
            ;
            //选择日均流量提醒函数
            $scope.choseTrafficNotify = function(index) {
                //上面红线移动的距离
                angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line')).css('left', index * 10 + '%');
                $scope.compData.JS.c60_fbar_gexinghua.JS.aveTrafficNotifyValue = parseInt($scope.compData.JS.avetraffic_chose.JS["text" + index]);
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_avetraffic_chose_txt.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'avetraf')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_avetraffic_chose_txt.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
            }
            
            //选择消耗流量提醒函数
            $scope.choseConsumeTrafficNotify = function(index1) {
                //上面红线移动的距离
                angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line1')).css('left', index1 * 10 + "%");
                $scope.compData.JS.c60_fbar_gexinghua.JS.consumeTrafficNotifyValue = parseInt($scope.compData.JS.consumetraffic_chose.JS["text" + index1]);
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_consumetraffic_chose_txt.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'consutr')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_consumetraffic_chose_txt.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
            }
            //返回按钮点击
            $scope.returnbackclick = function() {
                var value1 = $scope.compData.JS.c60_fbar_gexinghua.JS.aveTrafficNotifyValue;
                var value2 = $scope.compData.JS.c60_fbar_gexinghua.JS.consumeTrafficNotifyValue;
                //如果用户没设置任何值，不发送保存报文请求
                if (value1 == $scope.initvalue1 && value2 == $scope.initvalue2)
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'setreturnback');
                else
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'setreturnback1', {
                        'avgremain': value1 * 1024,
                        'exceedpercent': value2
                    });
                //话单
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_returnback.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'return')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_returnback.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
            }
            
            //日均流量红线滑动
            var redlinewidth = angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line'))[0].offsetWidth;
            //红线长度
            $scope.dragMove = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var _lastYPos = 0;
                var _lastXPos = 0;
                var _currentYPos = 0;
                var _currentXPos = 0;
                var moveflag = false;
                var touchArea = angular.element($element[0].querySelector('#avetraffic'));
                var ulpaddingleft = angular.element($element[0].querySelector('.c60_fbar_gexinghua_con'));
                //屏幕可见宽度
                var screenWidth = top.window.innerWidth;
                //ul宽度
                var ulAveTrafficWidth = angular.element($element[0].querySelector('#avetraffic'))[0].offsetWidth;
                //计算ul左边长度
                var ulpaddingleft = (screenWidth - ulAveTrafficWidth) / 2;
                //用于判断是滑动的话单
                var slideup = false;
                touchArea.bind(_touchstart, function(e) {
                    redlinewidth = angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line'))[0].offsetWidth;
                    //红线长度
                    screenWidth = top.window.innerWidth;
                    //ul宽度
                    ulAveTrafficWidth = angular.element($element[0].querySelector('#avetraffic'))[0].offsetWidth;
                    //计算ul左边长度
                    ulpaddingleft = (screenWidth - ulAveTrafficWidth) / 2;
                    _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                    moveflag = true;
                
                });
                touchArea.bind(_touchmove, function(e) {
                    _currentXPos = e.touches ? e.touches[0].pageX : e.pageX;
                    if (Math.abs(_currentXPos - _lastXPos) > 3 || moveflag) {
                        e.stopPropagation();
                        e.preventDefault();
                        _lastXPos = _currentXPos;
                        slideup = true;
                        if (moveflag) {
                            if ((_currentXPos >= ulpaddingleft) && (_currentXPos <= ulAveTrafficWidth)) 
                            {
                                var aveTrafficNotifyValuePosition = parseInt((_currentXPos - ulpaddingleft) / redlinewidth);
                                if (aveTrafficNotifyValuePosition >= $scope.compData.JS.avetraffic_chose.JS.len - 1)
                                    angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line')).css({
                                        'right': "0",
                                        "left": "inherit"
                                    });
                                else
                                    angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line')).css('left', aveTrafficNotifyValuePosition * 10 + "%");
                                $scope.compData.JS.c60_fbar_gexinghua.JS.aveTrafficNotifyValue = parseInt($scope.compData.JS.avetraffic_chose.JS["text" + aveTrafficNotifyValuePosition]);
                            }
                        }
                    }
                
                });
                
                touchArea.bind(_touchend, function(e) {
                    if (moveflag && slideup) {
                        //跟踪话单
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_touchslide_up.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'slideup')
                            };
                            coreUtils.cdrService($scope.compData.JS.c60_fbar_touchslide_up.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                    }
                    moveflag = false;
                    slideup = false;
                    $scope.$apply();
                });
            
            
            
            }
            ;
            //流量消耗红线滑动
            $scope.dragMove1 = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var _lastYPos = 0;
                var _lastXPos = 0;
                var _currentYPos = 0;
                var _currentXPos = 0;
                var moveflag = false;
                var touchArea = angular.element($element[0].querySelector('#consumeTrafficSet'));
                var redline1 = angular.element($element[0].querySelector('#selectedline1'));
                var ulpaddingleft = angular.element($element[0].querySelector('.c60_fbar_gexinghua_con'));
                //屏幕可见宽度
                var screenWidth = top.window.innerWidth;
                //ul宽度
                var ulAveTrafficWidth = angular.element($element[0].querySelector('#consumeTrafficSet'))[0].offsetWidth;
                //计算ul左边长度
                var ulpaddingleft = (screenWidth - ulAveTrafficWidth) / 2;
                //用于判断是滑动的话单
                var slidedown = false;
                touchArea.bind(_touchstart, function(e) {
                    redlinewidth = angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line'))[0].offsetWidth;
                    //红线长度
                    screenWidth = top.window.innerWidth;
                    //ul宽度
                    ulAveTrafficWidth = angular.element($element[0].querySelector('#consumeTrafficSet'))[0].offsetWidth;
                    //计算ul左边长度
                    ulpaddingleft = (screenWidth - ulAveTrafficWidth) / 2;
                    _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                    moveflag = true;
                
                });
                touchArea.bind(_touchmove, function(e) {
                    _currentXPos = e.touches ? e.touches[0].pageX : e.pageX;
                    if (Math.abs(_currentXPos - _lastXPos) > 3 || moveflag) {
                        e.stopPropagation();
                        e.preventDefault();
                        slidedown = true;
                        _lastXPos = _currentXPos;
                        if (moveflag) {
                            if ((_currentXPos >= ulpaddingleft) && (_currentXPos <= ulAveTrafficWidth)) 
                            {
                                var consumeTrafficPosition = parseInt((_currentXPos - ulpaddingleft) / redlinewidth);
                                if (consumeTrafficPosition >= $scope.compData.JS.consumetraffic_chose.JS.len - 1)
                                    angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line1')).css({
                                        'right': "0",
                                        "left": "inherit"
                                    });
                                else
                                    angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line1')).css('left', consumeTrafficPosition * 10 + "%");
                                $scope.compData.JS.c60_fbar_gexinghua.JS.consumeTrafficNotifyValue = parseInt($scope.compData.JS.consumetraffic_chose.JS["text" + consumeTrafficPosition]);
                            
                            }
                        }
                    }
                });
                touchArea.bind(_touchend, function(e) {
                    if (moveflag && slidedown) {
                        //跟踪话单
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_touchslide_down.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'slidedown')
                            };
                            coreUtils.cdrService($scope.compData.JS.c60_fbar_touchslide_down.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                    }
                    moveflag = false;
                    slidedown = false;
                    
                    $scope.$apply();
                });
            
            }
            ;
            
            $scope.dragMove();
            $scope.dragMove1();
            
            //查询个性化设置初始日均流量值，流量百分比
            $scope.settingrecvd = function(param) {
                if (param && param.respparam) {
                    $scope.settingValue = param.respparam;
                    if ($scope.settingValue.avgremain != null  && $scope.settingValue.avgremain != undefined && $scope.settingValue.avgremain !== "") {
                        //日均流量初始值获取及红线移动初始化
                        $scope.compData.JS.c60_fbar_gexinghua.JS.aveTrafficNotifyValue = parseInt($scope.settingValue.avgremain) / 1024;
                        //个性化设置初始值
                        $scope.initvalue1 = $scope.compData.JS.c60_fbar_gexinghua.JS.aveTrafficNotifyValue;
                        var aveTrafficNotifyValue = $scope.compData.JS.c60_fbar_gexinghua.JS.aveTrafficNotifyValue;
                        if (aveTrafficNotifyValue / 5 > 9)
                            angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line')).css({
                                'right': "0",
                                "left": "inherit"
                            });
                        else
                            angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line')).css('left', aveTrafficNotifyValue / 5 * 10 + "%");
                    } else {
                        $scope.initvalue1 = $scope.settingValue.avgremain;
                    }
                    if ($scope.settingValue.exceedpercent != null  && $scope.settingValue.exceedpercent != undefined && $scope.settingValue.exceedpercent !== "") {
                        //剩余百分比初始值及红线移动初始化
                        $scope.compData.JS.c60_fbar_gexinghua.JS.consumeTrafficNotifyValue = parseInt($scope.settingValue.exceedpercent);
                        var consumeTrafficNotifyValue = $scope.compData.JS.c60_fbar_gexinghua.JS.consumeTrafficNotifyValue;
                        if ((consumeTrafficNotifyValue - 50) / 5 > 9) {
                            angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line1')).css({
                                'right': "0",
                                "left": "inherit"
                            });
                        } else if ((consumeTrafficNotifyValue - 50) / 5 < 0) {
                            angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line1')).css('left', 0);
                        } else {
                            angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line1')).css('left', (consumeTrafficNotifyValue - 50) / 5 * 10 + "%");
                        }
                    } else {
                        $scope.initvalue2 = $scope.settingValue.exceedpercent;
                    }
                }
            }
            ;
            //					$scope.show = function(){
            //						$scope.compa.JS.my_coin_con.JS.stateconfig.state = 1;
            //					};
            //					$scope.eventMap['show'] = $scope.show;
            $scope.eventMap['settingrecvd'] = $scope.settingrecvd;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });
        
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = "cmineset";
            $scope.init();
        }
    };
});
uiCore.directive('sitenavigation', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: ' <div class="c60_fbar_sitenavigation" ng-style="getConfigStyle({sitenavigation:1})">' 
        + ' <div class="c60_fbar_app_result_con" ng-style="getapp_result_conStyle()">' 
        + ' <div class="c60_fbar_succ_img_con"><img class="c60_fbar_succ_img"  ng-src="{{appresulturl()}}"/></div>' 
        + ' <div class="c60_fbar_tips_txt" ng-bind="appresulttips()"></div>' 
        + ' <div class="c60_fbar_result_btn" ccid="c60_fbar_link_btn">' 
        + ' <a class="c60_fbar_link_btn" ng-bind="appresulttxt()" ng-click="returnclick()"></a>' 
        + ' </div>' 
        + ' </div>' 
        + ' <div class="tbholder c60_fbar_navigation">' 
        + ' <div class="c60_fbar_navigation_site" simplescroll>' 
        + '	<div class="c60_fbar_navigation_site_detail">' 
        + ' <ul class="c60_fbar_navigation_ul c60_fbar_clearfloat">' 
        + ' <li class="c60_fbar_dald_li" ccid="c60_fbar_dald_li" ng-repeat="site in sites" ng-click="navigate(site.weblink,site.linktype)">' 
        + ' <div class="c60_fbar_site_detail">' 
        + ' <img class="c60_fbar_navigation_ul_img" ng-src="{{site.iconurl}}" alt=""/>' 
        + ' <p class="c60_fbar_navigation_ul_txt">{{site.title}}</p>' 
        + ' </div>' 
        + ' </li>' 
        + ' </ul>' 
        + ' </div>' 
        + ' </div>' 
        + ' </div>' 
        + ' </div>',
        
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils', 'Const', 
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.compData = {
                CSS: {},
                JS: {}
            };
            $scope.eventMap = {};
            
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
                $scope.paddingtop = $scope.compData.JS.sitenavigation.CSS;
                //                    $element.css($scope.compData.css || {});
                //                    coreService.fireEvent($element.attr('cid'), 'init');
                //                coreService.fireEvent($element.attr('cid'),'sitenavigation');
            }
            ;
            
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            
            $scope.updateData = function(param) {
                if (param != null  && param != undefined && param.respparam != null  && param.respparam != undefined) {
                    $scope.respData = param.respparam;
                    if ($scope.respData.website != null  && $scope.respData.website != undefined && $scope.respData.website.length > 0) {
                        $scope.sites = $scope.respData.website;
                        
                        $scope.showSuccess();
                        for (var i = 0; i < $scope.sites.length; i++) {
                            var sites = $scope.sites;
                            var l = Math.ceil(sites.length / 3);
                            $scope.len1 = $scope.len1 + l * 5.5;
                        }
                        angular.element($element[0].querySelector('.c60_fbar_navigation_site')).attr('totalheight', $scope.len1 * 16 + "px");
                    } else {
                        $scope.showError();
                        return false;
                    }
                } else {
                    $scope.showError();
                    return false;
                }
            }
            ;
            
            $scope.navigate = function(linkUrl, linkType) 
            {
                if (linkType == undefined || linkType == 0) {
                    window.open(linkUrl);
                } else {
                    coreService.fireEvent($element.attr('cid'), 'gotoPage', {
                        "linktype": linkType,
                        "url": linkUrl
                    });
                }
            }
            ;
            
            $scope.getConfigStyle = function(input) {
                var classname;
                for (item in input) {
                    classname = item;
                    break;
                }
                if ($scope.compData.JS[classname] && $scope.compData.JS[classname].CSS) {
                    return $scope.compData.JS[classname].CSS;
                }
            }
            ;
            
            $scope.getapp_result_conStyle = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_app_result_con) {
                    if ($scope.compData.JS.c60_fbar_app_result_con.JS.showconfig.status == 0) {
                        return $scope.compData.JS.c60_fbar_app_result_con.JS.showconfig.status0;
                    } else {
                        return $scope.compData.JS.c60_fbar_app_result_con.JS.showconfig.status1;
                    }
                }
            }
            ;
            
            $scope.appresulturl = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_app_result_con) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_app_result_con.JS.statusconfig.status;
                    var imgUrl = $scope.compData.JS.c60_fbar_app_result_con.JS.statusconfig[status].imgUrl;
                    return imgUrl.replace(/'/g, '');
                }
            }
            ;
            
            $scope.appresulttxt = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_app_result_con) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_app_result_con.JS.statusconfig.status;
                    var btntxt = $scope.compData.JS.c60_fbar_app_result_con.JS.statusconfig[status].btntxt;
                    return btntxt;
                }
            }
            ;
            $scope.appresulttips = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_app_result_con) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_app_result_con.JS.statusconfig.status;
                    var tipstxt = $scope.compData.JS.c60_fbar_app_result_con.JS.statusconfig[status].tipstxt;
                    return tipstxt;
                }
            }
            ;
            $scope.showError = function() {
                $scope.compData.JS.c60_fbar_app_result_con.JS.showconfig.status = 1;
                $scope.compData.JS.sitenavigation.CSS = {
                    'padding-top': '6em'
                };
                $element.css($scope.compData.JS.sitenavigation.CSS);
                angular.element($element[0].querySelector('.c60_fbar_navigation_site')).css({
                    'display': 'none'
                });
                //coreService.fireEvent($element.attr('cid'), 'showerror');
            }
            ;
            
            $scope.showSuccess = function() {
                $scope.compData.JS.c60_fbar_app_result_con.JS.showconfig.status = 0;
                $scope.compData.JS.sitenavigation.CSS = $scope.paddingtop;
                $element.css($scope.compData.JS.sitenavigation.CSS);
                angular.element($element[0].querySelector('.c60_fbar_navigation_site')).css({
                    'display': 'block'
                });
                //   coreService.fireEvent($element.attr('cid'), 'showsucc');
            }
            ;
            $scope.returnclick = function() {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'goFirstPage')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'goFirstPage');
            }
            ;
            $scope.eventMap['update'] = $scope.updateData;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'page';
            $scope.init();
        }
    }
}
]);
uiCore.directive('overed', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_overed_buy_con"><div style="overflow:hidden;height:100%" simplescroll>' + 
        '<overedpack stateconfig="{{::compData.JS.config}}" ordered=orderedProducts ng-repeat="opack in orderedProducts" opack-name="opack.name" opack-name="opack.name" opack-time="opack.orderedtime" opack-desc="opack.description"></overedpack>' + 
        '<div class="c60_fbar_no_more"><span>no more...</span></div>' + 
        '</div></div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils', 
        'Const', "$compile", 
        function($scope, $element, $attrs, coreService, coreUtils, Const, $compile) {
            $scope.cid = $attrs.cid;
            $scope.compData = {
                'CSS': {},
                'JS': {
                    'config': {
                        'up': {
                            'background': 'url("' + top.tlbs.templatePath + '/images/shengdangtip.png") center right no-repeat',
                            'background-size': '0.65em 0.65em',
                            'padding-right': '0.9em'
                        }
                    }
                
                }
            };
            $scope.eventMap = {};
            $scope.orderedProducts = [];
            $scope.update = function(data) {
                if (data && data.respparam && data.respparam.trafficusage) {
                    $scope.orderedProducts = data.respparam.trafficusage.orderedProducts;
                }
            }
            ;
            $scope.init = function(param) {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.js = properties.JS || {};
                coreService.fireEvent($element.attr('cid'), 'init');
            }
            ;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            $scope.eventMap['update'] = $scope.update;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'overed';
            $scope.init();
        }
    
    }

}
]);
uiCore.directive('overedpack', [function() {
    
    return {
        restrict: 'EA',
        require: '^?pid',
        replace: true,
        scope: {
            name: '=opackName',
            time: '=opackTime',
            desc: '=opackDesc',
            ordered: '=ordered',
        },
        template: '<div class="c60_fbar_overed_buy_list">' + 
        '<div class="c60_fbar_type_time c60_fbar_clearfloat">' + 
        '<div class="c60_fbar_type"><span class="c60_fbar_up" ng-bind="name"></span></div>' + 
        '<div class="c60_fbar_time" ng-bind="time"></div></div>' + 
        '<div class="c60_fbar_txt" ng-bind="desc"></div>' + 
        '</div>',
        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils', 'Const', 
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.changeStyle = function() {
                var states = coreUtils.String2JSON($attrs['stateconfig']);
                var element = angular.element($element[0].querySelector('.c60_fbar_up'));
                var name = $scope.name;
                if (name.indexOf("升级包") > 0) {
                    element.css(states.up);
                }
            }
            ;
            $scope.init = function() {
                $scope.changeStyle();
            }
            ;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.init();
        }
    }

}
]);
uiCore.directive('idivholder', [
'coreService', 
'coreUtils', 
'$timeout', 
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: '<div {{param}} ng-transclude></div>',
        scope: {
            param: '=param'
        },
        require: '^pid',
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        function($scope, $element, $attrs) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {},
                'JS': {
                    'clickable': false,
                    'animation': false,
                    'clickevent': '',
                    'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                    }
                }
            };
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
                /*$timeout(function() {
                            $scope.$apply();
                        });*/
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
            }
            ;
            $scope.getHolderStyle = function() {
                if (null  != $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]) {
                    return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]);
                }
            }
            ;
            $scope.handleClick = function() {
                coreService.fireEvent($scope.cid, ($scope.compData.JS.clickevent || '') + 'click' + $scope.compData.JS.stateconfig.state);
            }
            ;
            $scope.clickDisable = function() {}
            ;
            $scope.changeState = function(stateObject, deferred) {
                if (null  != stateObject && null  != stateObject.cstate) {
                    if ($scope.compData.JS.stateconfig.state != stateObject.cstate) {
                        //console.log('$scope.compData.JS.stateconfig.state:', $scope.compData.JS.stateconfig.state, 'stateObject.cstate:', stateObject.cstate, '$scope.cid:', $scope.cid);
                        $scope.compData.JS.stateconfig.state = stateObject.cstate;
                        $scope.applyStyle();
                        $scope.$evalAsync(
                        function() {
                            if (null  != deferred) {
                                if ($scope.compData.JS.animation) {
                                    //var _transitionEnd = /webkit/i.test(navigator.userAgent) ? 'webkitTransitionEnd' : 'transitionend';
                                    $element.on(top.tlbs.transitionendEvent, function(e) {
                                        deferred.resolve();
                                    });
                                } else {
                                    deferred.resolve();
                                }
                            }
                        });
                        /*$timeout(function() {
                                    $scope.$apply();
                                    if (null != deferred) {
                                        if ($scope.compData.JS.animation) {
                                            var _transitionEnd = /webkit/i.test(navigator.userAgent) ? 'webkitTransitionEnd' : 'transitionend';
                                            $element.on(_transitionEnd, function(e) {
                                                deferred.resolve();
                                            });
                                        } else {
                                            deferred.resolve();
                                        }
                                    }
                                });*/
                    } else if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            }
            ;
            $scope.applyStyle = function() {
                if (null  != $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]) {
                    coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]);
                }
                $element.css($scope.compData.CSS);
            }
            ;
            $scope.changeExtraState = function(stateObject, deferred) {
                if (null  != stateObject && null  != stateObject.cstate) {
                    $scope.compData.CSS = coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + stateObject.cstate]);
                    $scope.applyStyle();
                }
            }
            ;
            $scope.eventMap['changeState'] = $scope.changeState;
            $scope.eventMap['changeExtraState'] = $scope.changeExtraState;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
            });
            $scope.$on('stateChange', function(eventObj) {
                $scope.applyStyle();
            });
            $scope.$watch($scope.param, function(newValue) {
                if ($scope.param) {
                    //console.log('cid:', $scope.cid, '$scope.param:', $scope.param);
                    $scope.compData = $scope.param;
                    $scope.applyStyle();
                }
            });
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'idivholder';
            scope.init();
        }
    };
}
]);
uiCore.directive('tbparentisolator', [
function() {
    return {
        restrict: 'AE',
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        function($scope, $element, $attrs) {
            var _maxTimeMotionless = 300;
            var jqLite = angular.element
              , 
            copy = angular.copy
              , 
            forEach = angular.forEach
              , 
            isString = angular.isString
              , 
            extend = angular.extend;
            var children, wrapperDiv, minHeight = 0;
            var options = {
                'stopPropagation': false,
                'shouldBlurOnDrag': true
            }
              , 
            isInput = function(raw) {
                return raw && (raw.tagName === "INPUT" || 
                raw.tagName === "SELECT" || 
                raw.tagName === "TEXTAREA");
            }
              , 
            startDragState = function(point) {
                return {
                    origin: {
                        x: point.x,
                        y: point.y
                    },
                    pos: {
                        x: point.x,
                        y: point.y
                    },
                    distance: {
                        x: 0,
                        y: 0,
                        magnitude: 0
                    },
                    delta: {
                        x: 0,
                        y: 0,
                        magnitude: 0
                    },
                    
                    startedAt: Date.now(),
                    updatedAt: Date.now(),
                    
                    stopped: false,
                    active: true
                };
            }
              , 
            dragStart = function(e) {
                e = e.originalEvent || e;
                
                var target = jqLite(e.target || e.srcElement);
                
                options.stopPropagation && e.stopPropagation();
                
                var point = e.touches ? e.touches[0] : e;
                
                if (options.shouldBlurOnDrag && isInput(target)) {
                    document.activeElement && document.activeElement.blur();
                }
                
                self.state = startDragState({
                    x: point.pageX,
                    y: point.pageY
                });
            }
              , 
            dragMove = function(e) {
                e = e.originalEvent || e;
                var target = e.target;
                if (null  != self.state && self.state.active && !isInput(target)) {
                    e.preventDefault();
                }
            }
              , 
            dragEnd = function(e) {
                if (null  != self.state && self.state.active) {
                    e = e.originalEvent || e;
                    options.stopPropagation && e.stopPropagation();
                    self.state = {};
                }
            }
            ;
            $element.bind('touchstart', dragStart);
            $element.bind('touchmove', dragMove);
            $element.bind('touchend touchcancel', dragEnd);
            //$element.bind('mousedown', dragStart);
            //$element.bind('mousemove', dragMove);
            //$element.bind('mouseup mouseout', dragEnd);
        }
        ]
    };
}
]);
uiCore.directive('iresize', [
'$window', 
'$interval', 
function($window, $interval) {
    return {
        restrict: 'A',
        replace: false,
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        function($scope, $element, $attrs) {
            var w = angular.element(top.window);
            w.bind('resize', function() {
                $scope.$apply();
            });
            $scope.getWindowDimensions = function() {
                return {
                    'h': top.window.innerHeight,
                    'w': top.window.innerWidth
                };
            }
            ;
            $scope.$watch($scope.getWindowDimensions, function(newValue, oldValue) {
                $scope.rresize();
            }, true);
            
            $scope.prevWidth = 0;
            $scope.prevHeight = 0;
            $scope.currWidth = top.window.innerWidth;
            $scope.currHeight = top.window.innerHeight;
            $scope.rresize = function() {
                var baseHeight = 360
                  , 
                baseWidth = 320;
                $scope.currWidth = top.window.innerWidth;
                $scope.currHeight = top.window.innerHeight;
                var cFontSize = 0
                  , 
                newFontSize = 0;
                if ($scope.prevWidth == $scope.currWidth && $scope.currHeight != $scope.prevHeight && Math.min($scope.prevHeight, $scope.currHeight) / Math.max($scope.prevHeight, $scope.currHeight) >= 0.8) {
                    $scope.prevWidth = $scope.currWidth;
                    $scope.prevHeight = $scope.currHeight;
                    return;
                }
                if ($scope.prevWidth == $scope.currWidth && $scope.prevHeight == $scope.currHeight) {
                    return;
                }
                
                if ($scope.currWidth <= $scope.currHeight) {
                    cFontSize = $scope.currWidth / baseWidth;
                } else {
                    cFontSize = $scope.currHeight / baseHeight;
                }
                if (baseWidth * cFontSize > $scope.currWidth) {
                    cFontSize = $scope.currWidth / baseWidth;
                }
                var newSize = cFontSize * 18;
                //newSize = newSize < 10 ? 10 : newSize;
                newSize = newSize > 27 ? 27 : newSize;
                $element.css('font-size', newSize + 'px');
                $scope.prevWidth = $scope.currWidth;
                $scope.prevHeight = $scope.currHeight;
            }
            ;
        }
        ]
    };
}
]);
uiCore.directive('lresize', [
'$window', 
'$interval', 
function($window, $interval) {
    return {
        restrict: 'A',
        replace: false,
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        function($scope, $element, $attrs) {
            var w = angular.element(top.window);
            w.bind('resize', function() {
                $scope.$apply();
            });
            $scope.getWindowDimensions = function() {
                return {
                    'h': top.window.innerHeight,
                    'w': top.window.innerWidth,
                    'fs': parseFloat(top.window.getComputedStyle($element[0], null )['fontSize']),
                    width: (top.window.innerWidth || top.window.document.documentElement.clientWidth || top.window.document.body.clientWidth),
                    height: (top.window.innerHeight || top.window.document.documentElement.clientHeight || top.window.document.body.clientHeight),
                    'ph': top.window.getComputedStyle($element.parent()[0]).height,
                    'pw': parseFloat(top.window.getComputedStyle($element.parent()[0]).width),
                    'cw': $element.css('width')
                };
            }
            ;
            w.bind("scroll", function() {
                $scope.rresize();
            });
            $scope.$watch($scope.getWindowDimensions, function(newValue, oldValue) {
                $scope.rresize();
            }, true);
            var baseHeight = 360
              , 
            baseWidth = 320;
            $scope.prevWidth = 0;
            $scope.prevHeight = 0;
            $scope.rresize = function() {
                //console.log('top.document.documentElement.clientHeight:', top.document.documentElement.clientHeight, 'top.window.innerHeight:', top.window.innerHeight, 'top.window.pageYOffset:', top.window.pageYOffset);
                //console.log('top.document.documentElement.clientWidth:', top.document.documentElement.clientWidth, 'top.window.innerWidth:', top.window.innerWidth, 'top.window.pageXOffset:', top.window.pageXOffset);
                if ((top.window.innerWidth / top.document.documentElement.clientWidth) != 1) {
                    $element.css('bottom', top.document.documentElement.clientHeight - (top.window.pageYOffset + top.window.innerHeight) + 'px');
                    $element.css('position', 'absolute');
                    if ($element.css('width') != '0%') {
                        $element.css('right', '-' + top.window.pageXOffset + 'px');
                    } else if (top.window.pageXOffset == 0) {
                        $element.css('right', top.document.documentElement.clientWidth - top.window.innerWidth + 'px');
                    } else if (top.window.pageXOffset > 0) {
                        $element.css('right', '-' + top.window.pageXOffset + 'px');
                    }
                    //console.log($element.css('width'));
                } else {
                    $scope.setFontSize();
                    $element.css('position', 'fixed');
                    $element.css('bottom', '0px');
                    $element.css('right', '0px');
                }
                $element.css('-webkit-transform', 'scale(' + top.window.innerWidth / top.document.documentElement.clientWidth + ')');
                $element.css('-webkit-box-sizing', 'border-box');
                $element.css('box-sizing', 'border-box');
                $element.css('-webkit-transition', 'all 0.2s ease-in-out');
                $element.css('-webkit-transform-origin', '0 100%');
            
            }
            ;
            $scope.setFontSize = function() {
                $scope.currWidth = top.window.innerWidth;
                $scope.currHeight = top.window.innerHeight;
                var cFontSize = 0
                  , 
                newFontSize = 0;
                if ($scope.prevWidth == $scope.currWidth && $scope.currHeight != $scope.prevHeight && Math.min($scope.prevHeight, $scope.currHeight) / Math.max($scope.prevHeight, $scope.currHeight) >= 0.8) {
                    $scope.prevWidth = $scope.currWidth;
                    $scope.prevHeight = $scope.currHeight;
                    return;
                }
                if ($scope.prevWidth == $scope.currWidth && $scope.prevHeight == $scope.currHeight) {
                    return;
                }
                if ($scope.currWidth <= $scope.currHeight) {
                    cFontSize = $scope.currWidth / baseWidth;
                } else {
                    cFontSize = $scope.currHeight / baseHeight;
                }
                if (baseWidth * cFontSize > $scope.currWidth) {
                    cFontSize = $scope.currWidth / baseWidth;
                }
                var newSize = cFontSize * 18;
                $element.css('font-size', newSize + 'px');
                $scope.prevWidth = $scope.currWidth;
                $scope.prevHeight = $scope.currHeight;
                
                $scope.prevWidth = $scope.currWidth;
                $scope.prevHeight = $scope.currHeight;
            }
            ;
        }
        ]
    };
}
]);
uiCore.directive('iholder', [
'coreService', 
'coreUtils', 
'$timeout', 
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: '<div ng-click="compData.JS.clickable && handleClick();$event.preventDefault();$event.stopPropagation();" {{param}} ng-transclude></div>',
        scope: {
            param: '=param'
        },
        require: '^pid',
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        '$compile', 
        '$templateCache', 
        '$timeout', 
        function($scope, $element, $attrs, $compile, $templateCache, $timeout) {
            $scope.cid = $attrs.cid;
            $scope.classid = '.' + $scope.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {},
                'JS': {
                    'clickable': false,
                    'animation': false,
                    'clickevent': '',
                    'stateconfig': {
                        'stylestates': '',
                        'extrastates': '',
                        'cstylestate': '',
                        'cextrastate': '',
                        'state': 0,
                        'estate': 0,
                        'state0': {},
                        'state1': {}
                    }
                }
            };
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $scope.processStyle();
                $scope.updateStyle();
                if (null  != $attrs.templateurl) {
                    $scope.getTemplate();
                }
            }
            ;
            $scope.getHolderStyle = function() {
                if (null  != $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]) {
                    return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]);
                }
            }
            ;
            $scope.handleClick = function() {
                coreService.fireEvent($scope.cid, ($scope.compData.JS.clickevent || '') + 'click' + $scope.compData.JS.stateconfig.state);
            }
            ;
            $scope.changeState = function(stateObject, deferred) {
                if (null  != stateObject && null  != stateObject.cstate) {
                    if ($scope.compData.JS.stateconfig.state != stateObject.cstate) {
                        $scope.compData.JS.stateconfig.state = stateObject.cstate;
                        $scope.updateStyle();
                        $scope.$evalAsync(
                        function() {
                            if (null  != deferred) {
                                if ($scope.compData.JS.animation) {
                                    //var _transitionEnd = /webkit/i.test(navigator.userAgent) ? 'webkitTransitionEnd' : 'transitionend';
                                    $element.on(top.tlbs.transitionendEvent, function(e) {
                                        deferred.resolve();
                                    });
                                } else {
                                    deferred.resolve();
                                }
                            }
                        });
                    } else if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            }
            ;
            $scope.changeExtraState = function(stateObject, deferred) {
                if ($scope.compData.JS.stateconfig.estate != stateObject.cstate) {
                    $scope.compData.JS.stateconfig.estate = stateObject.cstate;
                    $scope.updateStyle();
                }
                if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            
            $scope.hide = function(input) {
                $element.css({
                    'display': 'none'
                });
            }
            ;
            
            $scope.show = function(data) {
                $element.css({
                    'display': 'block'
                });
                var time = $scope.compData.JS.closetime;
                //add by h00278783 消息盒子点击查看详细，不设置定时器-------start------
                if (data && (data.messageid == undefined)) {
                    return false;
                }
                //add by h00278783 消息盒子点击查看详细，不设置定时器-------end------
                if (time) {
                    //记录到当前弹框消息messageid
                    top.tlbs.messageid = data.messageid;
                    $timeout(function() {
                        if ($element.css('display') != 'none') {
                            top.tlbs.notificationCdrData = null ;
                        }
                        $scope.hide();
                    }, time);
                }
            
            }
            ;
            $scope.eventMap['changeState'] = $scope.changeState;
            $scope.eventMap['hide'] = $scope.hide;
            $scope.eventMap['show'] = $scope.show;
            $scope.eventMap['changeExtraState'] = $scope.changeExtraState;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
            });
            $scope.$watch($scope.param, function(newValue) {
                if ($scope.param) {
                    $scope.compData = $scope.param;
                }
            });
            $scope.processStyle = function() {
                var cssData = JSON.stringify($scope.compData.CSS);
                cssData = $scope.formatStyleData(cssData);
                coreService.commonServiceRef.appendStyle($scope.classid, '', cssData);
                var styleStateArray = $scope.compData.JS.stateconfig.stylestates.split('|');
                var styleStateArrayLength = styleStateArray.length;
                var extraStateArray = $scope.compData.JS.stateconfig.extrastates.split('|');
                var extraStateArrayLength = extraStateArray.length;
                for (var i = 0; i < styleStateArrayLength; i++) {
                    var styleState = styleStateArray[i];
                    if (styleState.length > 0) {
                        cssData = JSON.stringify($scope.compData.JS.stateconfig[styleState]);
                        cssData = $scope.formatStyleData(cssData);
                        coreService.commonServiceRef.appendStyle($scope.classid, '.' + styleState, cssData);
                        for (var j = 0; j < extraStateArrayLength; j++) {
                            var extraState = extraStateArray[j];
                            if (extraState.length > 0) {
                                cssData = JSON.stringify($scope.compData.JS.stateconfig[extraState]);
                                cssData = $scope.formatStyleData(cssData);
                                coreService.commonServiceRef.appendStyle($scope.classid, '.' + styleState + '.' + extraState, cssData);
                            }
                        }
                    }
                }
                $element.addClass($scope.cid);
                if (null  != $scope.compData.JS.stateconfig.state) {
                    var currentState = 'state' + $scope.compData.JS.stateconfig.state;
                    $scope.compData.JS.stateconfig.stylestates = currentState;
                }
            }
            ;
            $scope.formatStyleData = function(styleData) {
                styleData = styleData.replace(/","/g, ';').replace(/":"/g, ':').replace(/\\/g, '').replace(/{"/, '{').replace(/"}/, '}');
                return styleData;
            }
            ;
            $scope.updateStyle = function() {
                $element.removeClass($scope.compData.JS.stateconfig.cstylestate);
                $element.removeClass($scope.compData.JS.stateconfig.cextrastate);
                $scope.compData.JS.stateconfig.cstylestate = 'state' + $scope.compData.JS.stateconfig.state;
                $element.addClass($scope.compData.JS.stateconfig.cstylestate);
                if ($scope.compData.JS.stateconfig.state != $scope.compData.JS.stateconfig.estate) {
                    $scope.compData.JS.stateconfig.cextrastate = 'state' + $scope.compData.JS.stateconfig.estate;
                    $element.addClass($scope.compData.JS.stateconfig.cextrastate);
                }
            }
            ;
            $scope.getTemplate = function() {
                var elementTemplateCache = $templateCache.get($attrs.templateurl);
                $element.html(elementTemplateCache);
                $compile($element.contents())($scope);
            }
            ;
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'iholder';
            scope.init();
        }
    };
}
]);
uiCore.directive('ihtmltext', [
'coreService', 
'coreUtils', 
'$timeout', 
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        scope: {
            param: '=param'
        },
        template: '<div {{param}}></div>',
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        'coreService', 
        'coreUtils', 
        function($scope, $element, $attrs, coreService, coreUtils) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {},
                'JS': {
                    'textdata': '',
                    'clickable': false,
                    'dataMapping': '',
                    'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                    }
                }
            };
            $scope.handleClick = function() {
                coreService.fireEvent($scope.cid, 'click' + $scope.compData.JS.stateconfig.state);
            }
            ;
            $scope.clickDisable = function() {}
            ;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
                /*$timeout(function() {
                            $scope.$apply();
                        });*/
            }
            ;
            $scope.init = function() {
                if ($scope.cid) {
                    coreService.registerComponentInstance($scope.cid, $scope);
                    $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                }
                coreUtils.extendDeep($scope.compData, $scope.param || {});
                $scope.updateHTML($scope.compData.JS.textdata);
                $scope.applyStyle();
            }
            ;
            /*$scope.getTextStyle = function() {
                        if (0 == $scope.compData.JS.stateconfig.state) {
                            return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig.state0);
                        } else {
                            return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig.state1);
                        }
                    };*/
            $scope.$watch(function() {
                return $element.attr('itext');
            }, function(newValue) {
                if (null  != newValue) {
                    $scope.updateHTML(newValue);
                }
            });
            $scope.$watch($scope.param, function(newValue) {
                if ($scope.param) {
                    $scope.compData = $scope.param;
                    $scope.applyStyle();
                }
            });
            $scope.$watch($scope.compData, function() {
                if (null  != $scope.compData.JS.textdata) {
                    $scope.updateHTML($scope.compData.JS.textdata);
                }
            });
            $scope.updateHTML = function(htmlData) {
                //$element[0].innerHTML = '<marquee direction="up" height="100%" scrollamount="2">' + htmlData + '</marquee>';
                $element[0].innerHTML = htmlData;
            }
            ;
            $scope.updateHTMLText = function(args) {
                if ($scope.compData.JS.dataMapping) {
                    $scope.updateHTML(coreUtils.transfer(args, $scope.compData.JS.dataMapping));
                }
            }
            ;
            $scope.eventMap['text.update'] = $scope.updateHTMLText;
            $scope.applyStyle = function() {
                if (null  != $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]) {
                    coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]);
                }
                $element.css($scope.compData.CSS);
            }
            ;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'ihtmltext';
            $scope.init();
        }
    };
}
]);
uiCore.directive('irichtext', [
'coreService', 
'coreUtils', 
'$timeout', 
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        scope: {
            param: '=param'
        },
        template: '<div ng-click="compData.JS.clickable?handleClick():clickDisable();" {{param}}>{{compData.JS.textdata}}</div>',
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        'coreService', 
        'coreUtils', 
        function($scope, $element, $attrs, coreService, coreUtils) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {},
                'JS': {
                    'textdata': '',
                    'clickable': false,
                    'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                    }
                }
            };
            $scope.handleClick = function() {
                coreService.fireEvent($scope.cid, 'click' + $scope.compData.JS.stateconfig.state);
            }
            ;
            $scope.clickDisable = function() {}
            ;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
                /*$timeout(function() {
                            $scope.$apply();
                        });*/
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $scope.applyStyle();
            }
            ;
            /*$scope.getTextStyle = function() {
                        if (0 == $scope.compData.JS.stateconfig.state) {
                            return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig.state0);
                        } else {
                            return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig.state1);
                        }
                    };*/
            $scope.$watch($scope.param, function(newValue) {
                if ($scope.param) {
                    $scope.compData = $scope.param;
                    $scope.applyStyle();
                }
            });
            $scope.applyStyle = function() {
                if (null  != $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]) {
                    coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]);
                }
                $element.css($scope.compData.CSS);
            }
            ;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'irichtext';
            $scope.init();
        }
    };
}
]);
uiCore.directive('pvctrl', [
'coreService', 
'coreUtils', 
'$timeout', 
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'A',
        replace: false,
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        '$interval', 
        function($scope, $element, $attrs, $interval) {
            $scope.cid = 'pvctrl';
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.ctrlPageGroup = {};
                var alllLoad = angular.element($element[0].querySelectorAll('[lload="0"]'));
                for (var i = 0; i < alllLoad.length; i++) {
                    var localElement = angular.element(alllLoad[i]);
                    $scope.ctrlPageGroup[localElement.attr('pid')] = localElement;
                }
            }
            ;
            //0:chinese word  1:english word or num 2:标点符号
            function checkword(str) {
                var regCh = new RegExp("[\\u4E00-\\u9FA5\uFE30-\uFFA0]+","g");
                var regNumEng = new RegExp("[0-9a-zA-z]+","g");
                if (regCh.test(str) == true) {
                    return 15;
                } else if (regNumEng.test(str) == true) {
                    return 1;
                } else {
                    return 15;
                }
            }
            function getEncodeMsg(message) {
                var newStr = "";
                var count = 0, temp = 0, i;
                for (i = 0; i < message.length; i++) {
                    temp = count + checkword(message[i]);
                    if (temp > 1000) {
                        break;
                    } else {
                        count = temp;
                    }
                }
                if (i == message.length) {
                    return message;
                } else {
                    return message.substring(0, i);
                }
            }
            $scope.lloadApps = function(loadObject, deferred) {
                if (null  != loadObject.applist && loadObject.applist.length > 0) {
                    var pageidSplit = loadObject.applist.split(',');
                    var appArrayObj = new loadAppArray().eexecute(pageidSplit, deferred);
                    var serverRespTime = loadObject.sresptime || '';
                    var cdrConfig = {
                        'cdrType': 'uinotiftracingcdr',
                        'enable': true,
                        'storeData': false
                    };
                    var cdrData = {
                        'taskId': loadObject.taskId,
                        'componentId': pageidSplit[0],
                        'pageId': pageidSplit[0],
                        'message': encodeURIComponent(encodeURIComponent(getEncodeMsg(loadObject.message || ''))),
                        'sresptime': serverRespTime,
                        'functionid': loadObject.functionid
                    };
                    coreUtils.cdrService(cdrConfig, cdrData);
                    top.tlbs.notificationCdrData = cdrData;
                } else if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            var loadAppArray = function() {
            
            }
            ;
            
            loadAppArray.prototype.eexecute = function(pageArray, deferred) {
                var i = 0
                  , 
                j = pageArray.length
                  , 
                count = 0
                  , 
                pageArrayIds = pageArray
                  , 
                deferred = deferred;
                var executeFunction = function(lKey) {
                    var loadingPageId = pageArrayIds[count];
                    var pageObject = $scope.ctrlPageGroup[loadingPageId];
                    if (null  != pageObject && pageObject.attr('lload') == 0) {
                        pageObject.attr('lload', '1');
                        var cdrConfig = {
                            'cdrType': 'uidisplaycdr',
                            'enable': true,
                            'storeData': false
                        };
                        var cdrData = {
                            'pageId': loadingPageId,
                            'displayType': 1,
                            'displayResult': 0
                        };
                        coreUtils.cdrService(cdrConfig, cdrData);
                    }
                    count = count + 1;
                    if (count == j && null  != deferred) {
                        $timeout(function() {
                            deferred.resolve();
                        });
                    }
                }
                ;
                $interval(executeFunction, 10, j, this.loadKey);
            }
            ;
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'pvctrl';
            scope.init();
        }
    };
}
]);
uiCore.directive("iappbuttonholder", ["coreService", "coreUtils", "$timeout", "Const", "$window", function(c, a, b, d, e) {
    return {
        restrict: "AE",
        replace: true,
        template: '<div ng-style="compData.CSS" ><div ng-style="compData.JS.appbuttoncontainer.CSS"><div  ng-style="compData.JS.appbutton.CSS" ng-repeat="apps in compData.JS.dataset | limitTo:compData.JS.maxcount" id="news_app_{{$index}}" ng-click="compData.JS.clickable?handleClick({{$index}}):clickDisable();$event.stopPropagation();"><imageholder cid="appimage" dynamicproperties="{\'CSS\':{\'background-image\':apps.imageurl}}" param="compData.JS.appbutton.JS.imageconfig"></imageholder><irichtext cid="apptext" param="settextdata(compData.JS.appbutton.JS.textconfig,apps.title)"></irichtext></div></div></div>',
        scope: {
            param: "=param"
        },
        require: "^pid",
        controller: ["$scope", "$element", "$attrs", function(h, g, f) {
            h.cid = f.cid;
            h.index = 0;
            h.maxindex = 0;
            h.eventMap = {};
            h.imageset = {};
            h.compData = {};
            h.handleClick = function(i) {
                i = h.compData.JS.dataset[i].weblink;
                if (null  != i && i.length != 0) {
                    c.commonServiceRef.dynamicService(null , {
                        serviceType: "urlservice",
                        openurl: i
                    })
                }
            }
            ;
            h.clickDisable = function() {}
            ;
            h.settextdata = function(j, i) {
                j.JS.textdata = i;
                return j
            }
            ;
            h.extendComponentData = function(i) {
                h.compData = a.extendDeep(h.compData, i);
                b(function() {
                    h.$apply()
                })
            }
            ;
            h.init = function() {
                c.registerComponentInstance(h.cid, h);
                h.extendComponentData(c.getInitProperties(h.cid));
                h.maxindex = h.compData.JS.maxcount;
                this.setNewsappData(window.newsparam)
            }
            ;
            h.setNewsappData = function(i) {
                if (h.compData.JS.newsappsConfigRespPath) {
                    h.compData.JS.dataset = a.transfer(i, h.compData.JS.newsappsConfigRespPath)
                }
                if (null  != h.compData.JS.dataset && h.compData.JS.dataset.length < h.compData.JS.maxcount) {
                    h.maxindex = h.compData.JS.dataset.length
                }
            }
            ;
            h.eventMap.setNewsappData = h.setNewsappData;
            h.$on(h.cid + "_handleEvent", function(l, j, k, i) {
                h.eventMap[j](k, i)
            })
        }
        ],
        link: function(h, g, f, i) {
            h.pageID = f.ppageid || i.pageID;
            h.componentType = "iappbuttonholder";
            h.init()
        }
    }
}
]);
uiCore.directive('ifit', [
'$window', 
'coreService', 
function($window) {
    return {
        restrict: 'A',
        replace: false,
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        '$window', 
        function($scope, $element, $attrs, $window, coreService) {
            var w = angular.element(top.window);
            //mod by s00900236 at 2015-03-20 begin
            //reason:DTS2015031903381 added fontsize watch on width change
            $scope.getDimentions = function() {
                return {
                    width: (top.window.innerWidth || top.window.document.documentElement.clientWidth || top.window.document.body.clientWidth),
                    height: (top.window.innerHeight || top.window.document.documentElement.clientHeight || top.window.document.body.clientHeight),
                    'h': top.window.innerHeight,
                    'w': top.window.innerWidth,
                    'ph': top.window.getComputedStyle($element.parent()[0]).height,
                    'pw': parseFloat(top.window.getComputedStyle($element.parent()[0]).width),
                    'fs': parseFloat(top.window.getComputedStyle($element[0], null )['fontSize'])
                }
            }
            ;
            //mod by s00900236 2015-03-20 end
            $scope.$watch($scope.getDimentions, function(newValue, oldValue) {
                $scope.rresize();
            }, true);
            $scope.rresize = function() {
                var dimention = $scope.getDimentions();
                var minusValue = $element.attr('ifit');
                var isNumber = !isNaN(parseFloat(minusValue)) && isFinite(minusValue);
                var fontSize = dimention.fs;
                var totalWidth = dimention.pw;
                if (!isNumber) {
                    if (totalWidth > 0) {
                        var firstChildWidth = 0;
                        var siblings = $element.parent().children();
                        for (i = 0; i < siblings.length; i++) {
                            var singleElement = siblings[i];
                            if (null  == singleElement.attributes['ifit']) {
                                firstChildWidth += parseFloat(top.window.getComputedStyle(singleElement).width);
                            }
                        }
                        var minusEM = firstChildWidth / fontSize;
                        if (minusValue == "bnBar") 
                        {
                            $element.css('width', (((totalWidth / fontSize) - minusEM) - 1) + 'em');
                        } else 
                        {
                            $element.css('width', ((totalWidth / fontSize) - minusEM) + 'em');
                        }
                    
                    }
                } else {
                    var winnerWidth = dimention.width;
                    if (minusValue == 0) {
                        $element.css('width', (winnerWidth / fontSize) + 'em');
                    } else if (totalWidth > 0) {
                        $element.css('width', ((totalWidth / fontSize) - minusValue) + 'em');
                    }
                }
            }
            
            $scope.$watch(function() {
                return $element.attr('ifit');
            }, function(newValue) {
                $scope.rresize();
            });
            
            w.bind('resize', function() {
                $scope.$apply();
            });
        }
        ]
    };
}
]);
uiCore.directive('logodock', function() {
    return {
        restrict: 'A',
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        '$timeout', 
        '$window', 
        'coreService', 
        'coreUtils', 
        function($scope, $element, $attrs, $timeout, $window, coreService, coreUtils) {
            var _maxTimeMotionless = 300;
            var getBrowserDimensions = function() {
                return {
                    width: (top.window.innerWidth || top.window.document.documentElement.clientWidth || top.window.document.body.clientWidth),
                    height: (top.window.innerHeight || top.window.document.documentElement.clientHeight || top.window.document.body.clientHeight)
                };
            }
            ;
            $scope.moved = false;
            var winnerHeight = getBrowserDimensions().height
              , 
            elementHeight = 0;
            var jqLite = angular.element
              , 
            copy = angular.copy
              , 
            forEach = angular.forEach
              , 
            isString = angular.isString
              , 
            extend = angular.extend;
            var children, wrapperDiv, minHeight = 0;
            var options = {
                'stopPropagation': false,
                'shouldBlurOnDrag': false
            }
              , 
            moveDragState = function(state, point) {
                state.delta = distanceBetween(point, state.pos);
                state.distance = distanceBetween(point, state.origin);
                state.pos = {
                    x: point.x,
                    y: point.y
                };
                state.updatedAt = Date.now();
            }
              , 
            distanceBetween = function(p2, p1) {
                var dist = {
                    x: p2.x - p1.x,
                    y: p2.y - p1.y
                };
                dist.magnitude = Math.sqrt(dist.x * dist.x + dist.y * dist.y);
                return dist;
            }
              , 
            isInput = function(raw) {
                return raw && (raw.tagName === "INPUT" || 
                raw.tagName === "SELECT" || 
                raw.tagName === "TEXTAREA");
            }
              , 
            startDragState = function(point) {
                return {
                    origin: {
                        x: point.x,
                        y: point.y
                    },
                    pos: {
                        x: point.x,
                        y: point.y
                    },
                    distance: {
                        x: 0,
                        y: 0,
                        magnitude: 0
                    },
                    delta: {
                        x: 0,
                        y: 0,
                        magnitude: 0
                    },
                    
                    startedAt: Date.now(),
                    updatedAt: Date.now(),
                    
                    stopped: false,
                    active: true
                };
            }
              , 
            dragStart = function(e) {
                winnerHeight = getBrowserDimensions().height;
                elementHeight = parseFloat(top.window.getComputedStyle($element[0]).height);
                e = e.originalEvent || e;
                
                var target = jqLite(e.target || e.srcElement);
                
                options.stopPropagation && e.stopPropagation();
                
                var point = e.touches ? e.touches[0] : e;
                
                if (options.shouldBlurOnDrag && isInput(target)) {
                    document.activeElement && document.activeElement.blur();
                }
                //console.log('START point.clientY:' + point.clientY);
                self.state = startDragState({
                    x: point.clientX,
                    y: point.clientY
                });
            }
              , 
            dragMove = function(e) {
                e = e.originalEvent || e;
                
                if (null  != self.state && self.state.active) {
                    $scope.moved = true;
                    e.preventDefault();
                    options.stopPropagation && e.stopPropagation();
                    
                    var point = e.touches ? e.touches[0] : e;
                    point = {
                        x: point.clientX,
                        y: point.clientY
                    };
                    var timeSinceLastMove = Date.now() - self.state.updatedAt;
                    
                    if (timeSinceLastMove > _maxTimeMotionless) {
                        self.state = startDragState(point);
                    }
                    moveDragState(self.state, point);
                    if (self.state.pos.y <= 0) {
                        $element.parent().parent().css({
                            'top': '0px'
                        });
                    } else if (self.state.pos.y <= (winnerHeight - elementHeight)) {
                        $element.parent().parent().css({
                            'top': self.state.pos.y + 'px'
                        });
                    }
                    coreService.commonServiceRef.schedulerService({
                        'on': 'autoclose'
                    }, {
                        "cycle": "1",
                        "interval": "5000",
                        "start": "2"
                    });
                }
            }
              , 
            dragEnd = function(e) {
                if (null  != self.state && self.state.active && null  != self.state.distance && $scope.moved == true) {
                    $scope.moved = false;
                    e = e.originalEvent || e;
                    options.stopPropagation && e.stopPropagation();
                    var dockPosition = top.tlbs.dockPosition || false;
                    if (self.state.pos.y >= (winnerHeight / 2)) {
                        if (dockPosition) {
                            coreService.fireEvent($element.attr('cid'), 'moveBottom', {});
                            top.tlbs.dockPosition = false;
                            var dockUpdateActionChain = {
                                on: 'toolbardockupdate'
                            };
                            coreService.commonServiceRef.remoteService(dockUpdateActionChain, {
                                'dockposition': false
                            });
                        }
                        $element.parent().parent().css({
                            'bottom': '0px',
                            'top': 'initial'
                        });
                    } else {
                        if (!dockPosition) {
                            coreService.fireEvent($element.attr('cid'), 'moveTop', {});
                            top.tlbs.dockPosition = true;
                            var dockUpdateActionChain = {
                                on: 'toolbardockupdate'
                            };
                            coreService.commonServiceRef.remoteService(dockUpdateActionChain, {
                                'dockposition': true
                            });
                        }
                        $element.parent().parent().css({
                            'top': '0px',
                            'bottom': 'initial'
                        });
                    }
                    self.state.updatedAt = Date.now();
                    self.state.stopped = (self.state.updatedAt - self.state.startedAt) > _maxTimeMotionless;
                    self.state = {};
                }
            }
              , 
            scroll = function() {
                $element.bind('touchstart', dragStart);
                $element.bind('touchmove', dragMove);
                $element.bind('touchend touchcancel', dragEnd);
                $element.bind('mousedown', dragStart);
                $element.bind('mousemove', dragMove);
                $element.bind('mouseup mouseout', dragEnd);
            }
            ;
            $timeout(scroll, 0);
        }
        ],
        link: function($scope, $element, $attrs) {}
    };
});
uiCore.directive('slider', [
'coreService', 
'coreUtils', 
'$timeout', 
'Const', 
'$window', 
function(coreService, coreUtils, $timeout, Const, $window) {
    return {
        restrict: 'AE',
        replace: true,
        template: '<div  ng-click="compData.JS.clickable?handleClick():clickDisable();$event.stopPropagation();" ><div style="position:relative;"><div ng-swipe-right="swiperight();" ng-swipe-left="swipeleft();"  ng-style="compData.CSS" ></div><div ng-show="compData.JS.enabletitle" ng-style="compData.JS.titleconfig.CSS"></div></div> <div ng-show="compData.JS.enablebullets" ng-style="compData.JS.bulletcontainerconfig.CSS"> <div ng-style="compData.JS.bulletconfig.CSS" ng-click="changeStatebyIndex($index);$event.stopPropagation();" ng-repeat="app in compData.JS.dataset | limitTo:compData.JS.maxcount" id="slider_bullet_{{$index}}"></div></div></div>',
        scope: {
            param: '=param'
        },
        require: '^pid',
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        function($scope, $element, $attrs) {
            $scope.cid = $attrs.cid;
            $scope.index = 0;
            $scope.maxindex = 0;
            $scope.eventMap = {};
            
            $scope.imageset = {}
            $scope.compData = {};
            
            $scope.handleClick = function() {
                if ($scope.compData.JS.dataset[$scope.index].weblink && $scope.compData.JS.dataset[$scope.index].weblink.split("http").length > 1) {
                    $window.open($scope.compData.JS.dataset[$scope.index].weblink);
                
                } else {
                    $window.open("http://" + $scope.compData.JS.dataset[$scope.index].weblink);
                }
            
            }
            ;
            $scope.clickDisable = function() {}
            ;
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.swipeleft = function() {
                $scope.index = $scope.index + 1;
                if ($scope.index > parseInt($scope.maxindex - 1)) {
                    $scope.index = parseInt($scope.maxindex - 1);
                }
                $scope.changeState($scope.index);
            }
            ;
            $scope.swiperight = function() {
                $scope.index = $scope.index - 1;
                
                if ($scope.index < 0) {
                    $scope.index = 0;
                }
                $scope.changeState($scope.index);
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $scope.maxindex = $scope.compData.JS.maxcount;
            }
            ;
            
            $scope.setAdvertiseData = function(respData, deferred) {
                $scope.index = 0;
                if (null  != deferred) {
                    deferred.resolve();
                }
                if ($scope.compData.JS.sliderConfigRespPath) {
                    $scope.compData.JS.dataset = coreUtils.transfer(respData, $scope.compData.JS.sliderConfigRespPath);
                }
                $timeout(function() {
                    if ($scope.maxindex > 0) {
                        angular.element($element[0].children[0].children[0]).css({
                            'height': $scope.compData.JS.sliderheight
                        });
                        $scope.changeState(0);
                    }
                });
                
                if (null  != $scope.compData.JS.dataset && $scope.compData.JS.dataset.length < $scope.compData.JS.maxcount) {
                    $scope.maxindex = $scope.compData.JS.dataset.length;
                }
                
                if (null  != $scope.compData.JS.dataset && $scope.compData.JS.dataset.length == 0) {
                    angular.element($element[0].children[0].children[0]).css({
                        'height': '0%'
                    });
                } else {
                    angular.element($element[0].children[0].children[0]).css({
                        'height': $scope.compData.JS.sliderheight,
                        'margin': $scope.compData.JS.slidermargin
                    });
                }
            
            }
            ;
            
            $scope.changeStatebyIndex = function(indexno) {
                $scope.changeState(indexno);
                $scope.index = indexno;
            }
            
            $scope.changeState = function(indexno) {
                
                var bulletIcon = $element[0].querySelector('#slider_bullet_' + indexno);
                
                if ($scope.compData.JS.dataset) {
                    
                    for (i = 0; i <= $scope.maxindex - 1; i++) {
                        angular.element($element[0].querySelector('#slider_bullet_' + i)).css({
                            'background-color': $scope.compData.JS.bulletconfig.JS.stateconfig.state0.background_color
                        });
                    }
                }
                angular.element(bulletIcon).css({
                    'background-color': $scope.compData.JS.bulletconfig.JS.stateconfig.state1.background_color
                });
                
                
                if ($scope.compData.JS.dataset) {
                    
                    
                    
                    if ($scope.compData.JS.dataset[indexno].imageurl) {
                        angular.element($element[0].children[0].children[0]).css({
                            'background-image': 'url("' + $scope.compData.JS.dataset[indexno].imageurl + '")',
                        });
                    }
                    if ($scope.compData.JS.dataset[indexno].title) {
                        angular.element($element[0].children[0].children[1]).html($scope.compData.JS.dataset[indexno].title);
                    }
                
                }
            
            }
            ;
            
            $scope.eventMap['setAdvertiseData'] = $scope.setAdvertiseData;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
            });
            
            
            $scope.$watch($scope.param, function(newValue) {
                if ($scope.param) {
                    $scope.compData = $scope.param;
                }
            });
        
        
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = attrs.ppageid || ctrl.pageID;
            scope.componentType = 'slider';
            scope.init();
        }
    };
}
]);
uiCore.directive('pid', function() {
    return {
        restrict: 'A',
        replace: false,
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        function($scope, $element, $attrs) {
            this.pageID = $attrs['pid'];
        }
        ]
    };
});
uiCore.directive('idropdownlist', [
'coreService', 
'coreUtils', 
'$timeout', 
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        scope: {
            param: '=param'
        },
        template: '<div><horizontal-container param="compData.JS.sgH1" class="idropdownhorizantalline" ><horizontal-container  param="compData.JS.sgH1r1" class="idropdownhorizantalline" ><richtext param="compData.JS.sgpackeffectiveetime" ></richtext></horizontal-container><horizontal-container  param="compData.JS.sgH1r2" ><div class="idropdownlistmain" >' + 
        '<select ng-click="handleClick1($event);" ng-change="handleClick();" ng-style="compData.CSS"   ng-model="compData.JS.selectedValue" ng-options="key.name  for key in compData.JS.Dataset" ></select>' + 
        '</div></horizontal-container></horizontal-container><horizontal-container param="compData.JS.sgH2" class="idropdownhorizantalline" ng-show="isShowSecondList"><horizontal-container param="compData.JS.sgH2r1" class="idropdownhorizantalline"  ><richtext param="compData.JS.sgpackeffectiveetime1"  ></richtext></horizontal-container><horizontal-container param="compData.JS.sgH2r2"  ><div class="idropdownlistmain" >' + 
        '<select ng-click="handleClick2($event);" class="ui_com_second_dropdown"  ng-disabled="disablelist" ng-style="compData.CSS"   ng-model="compData.JS.selectedValue2" ng-options="key as key.name for key in compData.JS.Dataset2" ></select>' + 
        '</div></horizontal-container></horizontal-container></div>',
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        'coreService', 
        'coreUtils', 
        function($scope, $element, $attrs, coreService, coreUtils) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {},
                'JS': {
                    'textdata': '',
                    'clickable': false,
                    'setflag': '1',
                    'key1': 'time',
                    'key2': 'period',
                    'selectedValue': '',
                    'selectedValue2': '',
                    'opacity': '0.2',
                    'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                    },
                    "sgpackeffectiveetime": {
                        "CSS": {
                            "color": "#999999",
                            "font-size": "0.55em",
                            "font-family": "Microsoft Yahei",
                            "width": "100%",
                            "text-align": "center",
                            "display": "table-cell",
                            "vertical-align": "middle"
                        },
                        "JS": {
                            "text": "生效时间:"
                        }
                    },
                    "sgpackeffectiveetime1": {
                        "CSS": {
                            "color": "#999999",
                            "font-size": "0.55em",
                            "font-family": "Microsoft Yahei",
                            "width": "100%",
                            "text-align": "center",
                            "display": "table-cell",
                            "vertical-align": "middle"
                        },
                        "JS": {
                            "text": "生效时长:"
                        }
                    },
                    'sgH1': {
                        "CSS": {},
                        "JS": {
                            "sgH1": {
                                "border": "none",
                                "box-shadow": "none",
                                "display": "flex",
                                "extendable": false,
                                "height": "2em",
                                "position": "relative",
                                "width": "100%"
                            },
                            "type": "sgH1"
                        }
                    },
                    'sgH1r1': {
                        "CSS": {},
                        "JS": {
                            "sgH1r1": {
                                "border": "none",
                                "box-shadow": "none",
                                display: "table",
                                "extendable": false,
                                "height": "2em",
                                "position": "relative",
                                "width": "22%",
                                "background-color": "#F6F6F6"
                            },
                            "type": "sgH1r1"
                        }
                    },
                    'sgH1r2': {
                        "CSS": {},
                        "JS": {
                            "sgH1r2": {
                                "border": "none",
                                "box-shadow": "none",
                                "display": "table",
                                "extendable": false,
                                "height": "2em",
                                "position": "relative"
                            },
                            "type": "sgH1r2"
                        }
                    },
                    'sgH2': {
                        "CSS": {},
                        "JS": {
                            "sgH2": {
                                "border": "none",
                                "box-shadow": "none",
                                "display": "flex",
                                "extendable": false,
                                "height": "2em",
                                "position": "relative",
                                "width": "100%"
                            },
                            "type": "sgH2"
                        }
                    },
                    'sgH2r1': {
                        "CSS": {},
                        "JS": {
                            "sgH2r1": {
                                "border": "none",
                                "box-shadow": "none",
                                display: "table",
                                "extendable": false,
                                "height": "2em",
                                "position": "relative",
                                "width": "22%",
                                "background-color": "#F6F6F6"
                            },
                            "type": "sgH2r1"
                        }
                    },
                    'sgH2r2': {
                        "CSS": {},
                        "JS": {
                            "sgH2r2": {
                                "border": "none",
                                "box-shadow": "none",
                                "display": "table",
                                "extendable": false,
                                "height": "2em",
                                "position": "relative"
                            },
                            "type": "sgH2r2"
                        }
                    },
                },
            };
            $scope.handleClick1 = function(e) {
                e.stopPropagation();
            }
            ;
            $scope.handleClick2 = function(e) {
                e.stopPropagation();
            }
            ;
            $scope.handleClick = function() {
                if ($scope.isMonthPack)
                    return;
                if ($scope.compData.JS.selectedValue.value == $scope.compData.JS.setflag) {
                    $scope.disablelist = true;
                    $scope.secondDropdown.css({
                        'opacity': $scope.compData.JS.opacity
                    });
                    $scope.compData.JS.selectedValue2 = $scope.compData.JS.Dataset2[0];
                } else {
                    $scope.disablelist = false;
                    //when switch to immediate,default value should be changed,to do this value need configuable.
                    $scope.compData.JS.selectedValue2 = $scope.compData.JS.Dataset2[1];
                    $scope.secondDropdown.css({
                        'opacity': '1.0'
                    });
                }
                $timeout(function() {
                    $scope.$apply();
                });
            }
            ;
            $scope.disablelist = false;
            $scope.isShowSecondList = true;
            $scope.clickDisable = function() {}
            ;
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
                $timeout(function() {
                    $scope.$apply();
                });
            }
            ;
            $scope.getData = function(eventData) {
                $scope.edata = coreUtils.extendDeep({}, eventData);
                if ($scope.edata.isMonthPack) {
                    $scope.isMonthPack = parseInt($scope.edata.isMonthPack);
                }
                if ($scope.isMonthPack) {
                    $scope.isShowSecondList = false;
                    $scope.compData.JS.selectedValue2 = $scope.compData.JS.Dataset2[0];
                } else
                    $scope.isShowSecondList = true;
            }
            ;
            $scope.refresh = function(eventData) {
                $scope.compData.JS.selectedValue = $scope.compData.JS.Dataset[0];
                $scope.compData.JS.selectedValue2 = $scope.compData.JS.Dataset2[1];
                $scope.disablelist = false;
                $scope.secondDropdown.css({
                    'opacity': '1.0'
                });
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                var DatasetTemp = $scope.compData.JS.Dataset;
                var Dataset2Temp = $scope.compData.JS.Dataset2;
                
                $scope.compData.JS.Dataset = [];
                $scope.compData.JS.Dataset2 = [];
                for (var i in DatasetTemp) {
                    
                    $scope.compData.JS.Dataset.push(DatasetTemp[i]);
                }
                for (var i in Dataset2Temp) {
                    
                    $scope.compData.JS.Dataset2.push(Dataset2Temp[i]);
                }
                $scope.compData.JS.selectedValue = $scope.compData.JS.Dataset[0];
                $scope.compData.JS.selectedValue2 = $scope.compData.JS.Dataset2[1];
            }
            ;
            $scope.eventMap['data.update'] = $scope.getData;
            $scope.eventMap['refresh'] = $scope.refresh;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
            });
        }
        ],
        compile: function(element, attributes) {
            return {
                pre: function($scope, element, attributes, $controller, transcludeFn) {
                    $scope.pageID = $controller.pageID;
                    $scope.componentType = 'idropdownlist';
                    $scope.init();
                
                },
                post: function($scope, $element, attributes, $controller, transcludeFn) {
                    var dropdown = $element[0].querySelector('.ui_com_second_dropdown');
                    $scope.secondDropdown = angular.element(dropdown);
                }
            }
        },
    
    };
}
]);
uiCore.directive('tbresize', [
'$window', 
'$interval', 
function($window, $interval) {
    return {
        restrict: 'A',
        replace: false,
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        function($scope, $element, $attrs) {
            var isPhonePage = function() {
                var viewport = top.document.getElementsByName('viewport');
                
                if (!viewport || viewport.length == 0) {
                    
                    return false;
                } else {
                    return true;
                }
            }
            ;
            //fullscreenbar cancel resize function
            if (top.barresizetype == '1') {
                var scale = function() {
                    
                    if (/window/ig.test(navigator.userAgent)) {
                        $element.css({
                            'font-size': '16px'
                        });
                    } else {
                        var width = parseInt(top.window.innerWidth);
                        var height = parseInt(top.window.innerHeight);
                        
                        if (width < 319) {
                            $element.css({
                                'font-size': '12px'
                            });
                        } else if (width >= 320 && width < 359) {
                            $element.css({
                                'font-size': '14px'
                            });
                        } else if (width >= 360 && width < 399) {
                            if (height <= 485) {
                                $element.css({
                                    'font-size': '14px'
                                });
                            } else if (height < 530) {
                                $element.css({
                                    'font-size': '15px'
                                });
                            } else {
                                $element.css({
                                    'font-size': '16px'
                                });
                            }
                        
                        } else if (width >= 400 && width < 479) {
                            if (height < 740) {
                                $element.css({
                                    'font-size': '19px'
                                });
                            } else {
                                $element.css({
                                    'font-size': '20px'
                                });
                            }
                        } else if (width >= 480 && width < 539) {
                            $element.css({
                                'font-size': '20px'
                            });
                        } else if (width >= 540 && width < 639) {
                            $element.css({
                                'font-size': '22px'
                            });
                        } else if (width >= 640 && width < 719) {
                            $element.css({
                                'font-size': '28px'
                            });
                        } else if (width >= 720 && width < 879) {
                            $element.css({
                                'font-size': '32px'
                            });
                        } else if (width >= 880 && width < 959) {
                            $element.css({
                                'font-size': '36px'
                            });
                        } else if (width >= 960 && width < 1079) {
                            $element.css({
                                'font-size': '44px'
                            });
                        } else if (width >= 1080 && width < 1280) {
                            $element.css({
                                'font-size': '48px'
                            });
                        } else if (width >= 1280) {
                            $element.css({
                                'font-size': '56px'
                            });
                        }
                    }
                }
                ;
                
                scale();
                top.window.addEventListener('load', scale);
                $interval(function() {
                    scale();
                }, 3000);
                return;
            }
            $scope.pWidth = 0;
            $scope.pHeight = 0;
            
            $scope.resize = function() {
                var baseHeight = 360
                  , 
                baseWidth = 320;
                
                $scope.cWidth = top.window.innerWidth;
                $scope.cHeight = top.window.innerHeight;
                var cFontSize = 0
                  , 
                newFontSize = 0;
                if ($scope.pWidth == $scope.cWidth) {
                    return;
                }
                if ($scope.pWidth == $scope.cWidth && $scope.cHeight != $scope.pHeight && Math.min($scope.pHeight, $scope.cHeight) / Math.max($scope.pHeight, $scope.cHeight) >= 0.8) {
                    $scope.pWidth = $scope.cWidth;
                    $scope.pHeight = $scope.cHeight;
                    return;
                }
                if ($scope.pWidth == $scope.cWidth && $scope.pHeight == $scope.cHeight) {
                    return;
                }
                if ($scope.cWidth <= $scope.cHeight) {
                    cFontSize = $scope.cWidth / baseWidth;
                } else {
                    cFontSize = $scope.cHeight / baseHeight;
                }
                if (baseWidth * cFontSize > $scope.cWidth) {
                    cFontSize = $scope.cWidth / baseWidth;
                }
                var newSize = cFontSize * 18;
                //newSize = newSize < 10 ? 10 : newSize;
                //newSize = newSize > 27 ? 27 : newSize;
                $element.css('font-size', newSize + 'px');
                $scope.pWidth = $scope.cWidth;
                $scope.pHeight = $scope.cHeight;
            }
            ;
            $scope.resizeForPreview = function(w, h) {
                var baseheight = 360
                  , 
                baseWidth = 320;
                
                if (w <= h) {
                    cFontSize = w / baseWidth;
                } else {
                    cFontSize = h / baseHeight;
                }
                var newSize = cFontSize * 18;
                $element.css('font-size', newSize + 'px');
            }
            ;
            //tlbm preview no need set resize interval
            if (top.tlbs.w && top.tlbs.h) {
                $scope.resizeForPreview(parseInt(top.tlbs.w), parseInt(top.tlbs.h));
            } else {
                $scope.cWidth = top.window.innerWidth;
                $scope.cHeight = top.window.innerHeight;
                
                var w = angular.element(top.window);
                w.bind('resize', function() {
                    $scope.resize();
                });
                $scope.resize();
                $scope.intervalObject = $interval(function() {
                    $scope.resize();
                }, 10);
            }
        }
        ]
    };
}
]);
/*
iradioselectiondiv: component for customized radio selection Box.
setSelectionValue(): method used to get the data from serivce. need to fire once data got received though event chain.
 $scope.compData.JS.selectedValue : gives selected value.
*/
uiCore.directive('iradioselectiondiv', [
'coreService', 
'coreUtils', 
'$timeout', 
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'EA',
        replace: false,
        require: '^pid',
        scope: {
            param: '=param'
        },
        template: '<div ng-style="compData.CSS"><div ng-click="handleClick({{$index}});$event.stopPropagation();"  ng-style="compData.JS.radiobutton.CSS"  ng-repeat="key in compData.JS.dataset" id="radio_options_{{$index}}" >{{key.name}}</div></div>',
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        'coreService', 
        'coreUtils', 
        function($scope, $element, $attrs, coreService, coreUtils) {
            $scope.cid = $attrs.cid;
            $scope.index = 0;
            $scope.eventMap = {};
            $scope.compData = {
            
            };
            $scope.handleClick = function(indexno) {
                $scope.changeState(indexno);
            }
            ;
            $scope.changeState = function(indexno) {
                $scope.index = indexno;
                var bulletIcon = $element[0].querySelector('#radio_options_' + indexno);
                
                for (i = 0; i <= $element.children().children().length - 1; i++) {
                    angular.element($element[0].querySelector('#radio_options_' + i))
                    .css($scope.compData.JS.radiobutton.JS.inactiveCSS);
                }
                angular.element(bulletIcon).css($scope.compData.JS.radiobutton.JS.activeCSS);
                
                //for getting the selected value
                $scope.compData.JS.selectedValue = $scope.compData.JS.dataset[$scope.index];
            }
            ;
            $scope.clickDisable = function() {}
            ;
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
                $timeout(function() {
                    $scope.$apply();
                });
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                //$scope.setSelectionValue(window.responseparam);
            }
            ;
            /*
                                   $scope.getSelectedValue = function() {

                                       return $scope.compData.JS.dataset[$scope.index];

                                   };*/
            
            $scope.setSelectionValue = function(respData) {
                if ($scope.compData.JS.selectionConfigRespPath) {
                    $scope.compData.JS.dataset = coreUtils.transfer(respData, $scope.compData.JS.selectionConfigRespPath);
                }
                $timeout(function() {
                    $scope.$apply();
                    $scope.changeState(0);
                });
            }
            ;
            //$scope.eventMap['getSelectedValue'] = $scope.getSelectedValue;
            $scope.eventMap['setSelectionValue'] = $scope.setSelectionValue;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
            });
        
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'iradioselectiondiv';
            $scope.init();
        }
    };
}
]);
uiCore.directive('vscroll', function() {
    return {
        restrict: 'A',
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        '$timeout', 
        'Const', 
        function($scope, $element, $attrs, $timeout, Const) {
            var children, 
            wrapperDiv, 
            minHeight = 0, 
            totalHeight = 0;
            var isOpera = /preto/i.test(navigator.userAgent) || /opera/i.test(navigator.userAgent);
            var wrapper = function() {
                children = $element.children();
                wrapperDiv = angular.element('<div class="ui-com-vscroll-wrapper"></div>');
                //setHeight();
                wrapperDiv.append(children);
                $element.append(wrapperDiv);
            }
              , 
            setHeight = function() {
                minHeight = parseInt(top.window.getComputedStyle($element[0], null )['height']);
                totalHeight = 0;
                style = null ;
                for (var i = 0; i < children.length; i++) {
                    style = top.window.getComputedStyle(children[i], null );
                    totalHeight += children[i].offsetHeight + parseInt(style['marginTop']) + parseInt(style['marginBottom']);
                }
                //in ios6 in some page,when scroll,last record can't show completely,so here add 12 to avoid,to do:analyze why
                totalHeight = totalHeight + 12;
                if (totalHeight < minHeight) {
                    totalHeight = minHeight;
                }
                var fontSize = parseInt(top.window.getComputedStyle($element[0], null )['fontSize']);
                wrapperDiv.css('height', totalHeight / fontSize + 'em');
            }
              , 
            bind = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var totalDistance = 0;
                
                var flag = false;
                $element.bind(_touchstart, function(e) {
                    setHeight();
                    var transform = wrapperDiv[0].style['webkitTransform'] || wrapperDiv[0].style['mozTransform'] || wrapperDiv[0].style['msTransform'] || wrapperDiv[0].style['msTransform'] || wrapperDiv[0].style['oTransform'];
                    if (transform) {
                        totalDistance = transform.split(',')[1] && parseInt(transform.split(',')[1]);
                    } else {
                        totalDistance = 0;
                    }
                    var _lastYPos = e.touches ? e.touches[0].pageY : e.pageY
                      , 
                    target = e.target
                      , 
                    touch = function(e) {
                        //e.stopPropagation();
                        //e.preventDefault();
                        var _currentYPos = e.touches ? e.touches[0].pageY : e.pageY;
                        var ydistance = _currentYPos - _lastYPos;
                        if (Math.abs(ydistance) > 3) {
                            if (!flag) {
                                flag = true;
                            }
                            e.stopPropagation();
                            e.preventDefault();
                        }
                        _lastYPos = _currentYPos;
                        totalDistance += ydistance;
                        //for scroll performance,user transform:
                        if (totalDistance > 0) {
                            totalDistance = 0;
                        } else if (totalHeight + totalDistance < minHeight) {
                            totalDistance = minHeight - totalHeight;
                        }
                        if (isOpera) {
                            wrapperDiv.css('-o-transform', 'translate(0,' + totalDistance + 'px)');
                            wrapperDiv.css('transform', 'translate(0,' + totalDistance + 'px)');
                        } else {
                            wrapperDiv.css('-webkit-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            wrapperDiv.css('-moz-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            wrapperDiv.css('-o-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            wrapperDiv.css('-ms-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            wrapperDiv.css('transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        }
                        
                        //$element[0].scrollTop -= ydistance;
                    }
                      , 
                    endTouch = function(e) {
                        if (flag) {
                            e.stopPropagation();
                            e.preventDefault();
                            flag = false;
                        }
                        top.document.removeEventListener(_touchmove, touch, false);
                        top.document.removeEventListener(_touchend, endTouch, false);
                    }
                    ;
                    top.document.addEventListener(_touchmove, touch, false);
                    top.document.addEventListener(_touchend, endTouch, false);
                });
            }
              , 
            scroll = function() {
                bind();
                wrapper();
            }
            ;
            /*
				$scope.eventMap = $scope.eventMap||{};
				$scope.eventMap['recoverposition'] = function(){
				wrapperDiv.css('-webkit-transform', 'translate3d(0,0,0)');
				wrapperDiv.css('-moz-transform', 'translate3d(0,0,0)');
				wrapperDiv.css('-o-transform', 'translate3d(0,0,0)');
				wrapperDiv.css('-ms-transform', 'translate3d(0,0,0)');
				wrapperDiv.css('transform', 'translate3d(0,0,0)');

				};*/
            $timeout(scroll, 0);
        }
        ],
        link: function($scope, $element, $attrs) {}
    };
});
//usage:<hpanel hcroll>
// this directive can be use to scroll left or rihgt
//element which use this directive need define width
uiCore.directive('hscroll', function() {
    return {
        restrict: 'A',
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        '$timeout', 
        'Const', 
        function($scope, $element, $attrs, $timeout, Const) {
            var children, wrapperDiv, minHeight = 0, scrollDiv = angular.element('<div style="height:100%;overflow:hidden;"></div>'), 
            wrapper = function() {
                children = $element.children();
                minWidth = parseInt(top.window.getComputedStyle($element[0], null )['width']);
                wrapperDiv = angular.element('<div class="ui-com-hscroll-wrapper" style="height:100%;"></div>');
                setWidth();
                wrapperDiv.append(children);
                scrollDiv.append(wrapperDiv);
                $element.append(scrollDiv);
                if ($scope.hscrollType == "1") 
                {
                    $element.append('<div class="ui-com-hscroll-left-arrow"></div><div  class="ui-com-hscroll-right-arrow"></div>');
                }
            
            }
            , 
            setWidth = function() {
                var totalWidth = 0;
                style = null ;
                for (var i = 0; i < children.length; i++) {
                    style = top.window.getComputedStyle(children[i], null );
                    totalWidth += children[i].offsetWidth + parseInt(style['marginLeft']) + parseInt(style['marginRight']);
                
                }
                if (totalWidth < minWidth) {
                    totalWidth = minWidth;
                }
                var fontSize = parseInt(top.window.getComputedStyle($element[0], null )['fontSize']);
                
                //console.log(children.length * parseFloat($scope.compData.JS.tabStyle.defaultStyle.width.substring(0,$scope.compData.JS.tabStyle.defaultStyle.width.indexOf('em'))));
                //console.log("minWidth:"+widdd);
                //console.log("widhh:"+totalWidth+"..." + fontSize+"..."+totalWidth / fontSize);
                
                
                //wrapperDiv.css('width', (totalWidth-10 / fontSize)+ 'em');
                wrapperDiv.css('width', (totalWidth / fontSize) + 'em');
            
            }
            , 
            getWidth = function() {
            
            /*
                    	var totalWidth = 0; 
                             style = null;
                         for (var i = 0; i < scrollDiv[0].children.length; i++) {
                             style = top.window.getComputedStyle(children[i], null);
                             totalWidth += children[i].offsetWidth + parseInt(style['marginLeft']) + parseInt(style['marginRight']);
                            
                         }
                         if (totalWidth < minWidth) {
                             totalWidth = minWidth;
                         }
                      */
            
            //console.log(children.length * parseFloat($scope.compData.JS.tabStyle.defaultStyle.width.substring(0,$scope.compData.JS.tabStyle.defaultStyle.width.indexOf('em'))));
            //console.log("minWidth:"+widdd);
            //console.log("widhh:"+totalWidth+"..." + fontSize+"..."+totalWidth / fontSize);
            //console.log(" Width1:",totalWidth);
            // wrapperDiv.css('width', (totalWidth / fontSize)-10+ 'em');
            // return totalWidth;
            }
            , 
            bind = function() {
                var _touchstart = Const.touchEvent.start
                  , 
                _touchmove = Const.touchEvent.move
                  , 
                _touchend = Const.touchEvent.end;
                scrollDiv.bind(_touchstart, function(e) {
                    //e.stopPropagation();
                    //e.preventDefault();
                    setWidth();
                    
                    
                    var fontSize = parseInt(top.window.getComputedStyle($element[0], null )['fontSize']);
                    
                    var _lastXPos = e.touches ? e.touches[0].pageX : e.pageX
                      , 
                    target = e.target
                      , 
                    touch = function(e) {
                        //e.stopPropagation();
                        //e.preventDefault();
                        var _currentXPos = e.touches ? e.touches[0].pageX : e.pageX;
                        var xdistance = _currentXPos - _lastXPos;
                        // console.log("current postion:"+_currentXPos);
                        // console.log("last postion:"+_lastXPos);
                        _lastXPos = _currentXPos;
                        scrollDiv[0].scrollLeft -= xdistance;
                        
                        //console.log(" Width2:",parseInt(scrollDiv[0].offsetWidth+scrollDiv[0].scrollLeft),"width2:",wrapperDiv[0].offsetWidth);
                        
                        if ($scope.hscrollType == "1") 
                        {
                            if (parseInt(scrollDiv[0].scrollLeft) <= 0) 
                            {
                                angular.element($element[0].querySelector('.ui-com-hscroll-right-arrow')).css('opacity', '1.15');
                            } 
                            else if (parseInt(scrollDiv[0].offsetWidth + scrollDiv[0].scrollLeft) + 2 >= wrapperDiv[0].offsetWidth) 
                            {
                                angular.element($element[0].querySelector('.ui-com-hscroll-left-arrow')).css('opacity', '1.15');
                            } 
                            else 
                            {
                                angular.element($element[0].querySelector('.ui-com-hscroll-left-arrow')).css('opacity', '1.15');
                                angular.element($element[0].querySelector('.ui-com-hscroll-right-arrow')).css('opacity', '1.15');
                            
                            }
                        }
                    
                    }
                      , 
                    touchstart = function(e) 
                    {
                    
                    //console.log("display DIV width:"+scrollDiv[0].offsetWidth);
                    //console.log("max container width:"+wrapperDiv[0].offsetWidth);
                    //console.log("moved left position:"+scrollDiv[0].scrollLeft);
                    
                    /*
								 * if($scope.hscrollType=="1")
	                             {
									if(parseInt(scrollDiv[0].scrollLeft)<=0)
									{
									angular.element($element[0].querySelector('.ui-com-hscroll-right-arrow')).css('opacity','1.15');
									}
									else if(parseInt(scrollDiv[0].offsetWidth+scrollDiv[0].scrollLeft)>=wrapperDiv[0].offsetWidth)
									{
									angular.element($element[0].querySelector('.ui-com-hscroll-left-arrow')).css('opacity','1.15');
									}
									else
									{
									angular.element($element[0].querySelector('.ui-com-hscroll-left-arrow')).css('opacity','1.15');
									angular.element($element[0].querySelector('.ui-com-hscroll-right-arrow')).css('opacity','1.15');
									
									}
								}
								 */
                    
                    
                    
                    }
                      , 
                    endTouch = function(e) {
                        //e.stopPropagation();
                        //e.preventDefault();
                        angular.element($element[0].querySelector('.ui-com-hscroll-left-arrow')).css('opacity', '0');
                        angular.element($element[0].querySelector('.ui-com-hscroll-right-arrow')).css('opacity', '0');
                        
                        top.document.removeEventListener(_touchmove, touch, false);
                        top.document.removeEventListener(_touchend, endTouch, false);
                    }
                    ;
                    //top.document.addEventListener(_touchstart, touchstart, false);
                    top.document.addEventListener(_touchmove, touch, false);
                    top.document.addEventListener(_touchend, endTouch, false);
                });
            }
            , 
            scroll = function() {
                bind();
                wrapper();
            }
            ;
            $timeout(scroll, 0);
        }
        ],
        link: function($scope, element, $attrs) {
            //        	console.log("hscrolltype1",$attrs['hscrolltype']);
            
            $scope.hscrollType = $attrs['hscrolltype'];
            var eleft = element[0].offsetLeft;
            var etop = element[0].offsetTop;
            var eWidth = element[0].offsetWidth;
            var eHeight = element[0].offsetHeight;
            //             console.log(element[0].offset);
        }
    };
});
uiCore.directive('sscroll', function() {
    return {
        restrict: 'A',
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        '$timeout', 
        '$window', 
        'coreService', 
        function($scope, $element, $attrs, $timeout, $window, coreService) {
            var w = angular.element(top.window);
            var direction = $attrs['sscroll'];
            var isHorizontal = ('h' == direction);
            var isVerticle = ('v' == direction);
            var isHorizontalWithImage = ('hi' == direction);
            var _maxTimeMotionless = 300;
            var jqLite = angular.element
              , 
            copy = angular.copy
              , 
            forEach = angular.forEach
              , 
            isString = angular.isString
              , 
            extend = angular.extend;
            var children, wrapperDiv, minHeight = 0;
            var options = {
                'stopPropagation': false,
                'shouldBlurOnDrag': true
            }
              , 
            wrapper = function() {
                children = $element.children();
                wrapperDiv = angular.element('<div style="height:100%;width:100%;overflow:hidden;"></div>');
                wrapperDiv.append(children);
                $element.append(wrapperDiv);
                if (isHorizontalWithImage) {
                    angular.element($element.parent()[0]).append('<div class="ui-com-hscroll-left-arrow"></div><div  class="ui-com-hscroll-right-arrow"></div>');
                }
            }
              , 
            getContentRect = function(raw) {
                var style = top.window.getComputedStyle(raw);
                var offTop = parseInt(style.getPropertyValue('margin-top'), 10) + 
                parseInt(style.getPropertyValue('padding-top'), 10);
                var offLeft = parseInt(style.getPropertyValue('margin-left'), 10) + 
                parseInt(style.getPropertyValue('padding-left'), 10);
                var offRight = parseInt(style.getPropertyValue('margin-right'), 10) + 
                parseInt(style.getPropertyValue('padding-right'), 10);
                var offBottom = parseInt(style.getPropertyValue('margin-bottom'), 10) + 
                parseInt(style.getPropertyValue('padding-bottom'), 10);
                
                var ttop = parseInt(style.getPropertyValue('top'), 10);
                var bottom = parseInt(style.getPropertyValue('bottom'), 10);
                var left = parseInt(style.getPropertyValue('left'), 10);
                var right = parseInt(style.getPropertyValue('right'), 10);
                
                var height = parseFloat(style.getPropertyValue('height'), 10);
                var width = parseFloat(style.getPropertyValue('width'), 10);
                return {
                    top: offTop + (isNaN(ttop) ? 0 : ttop),
                    bottom: offBottom + (isNaN(bottom) ? 0 : bottom),
                    height: height,
                    width: width,
                    left: offLeft + (isNaN(left) ? 0 : left),
                    right: offRight + (isNaN(right) ? 0 : right)
                };
            }
              , 
            setHeight = function() {
                if (null  != children) {
                    var totalHeight = 0;
                    var fontSize = parseFloat(top.window.getComputedStyle($element[0], null )['fontSize']);
                    for (var i = 0; i < children.length; i++) {
                        var contentRect = getContentRect(children[i]);
                        totalHeight += (contentRect.height + contentRect.top + contentRect.bottom);
                    }
                    wrapperDiv.css('height', totalHeight / fontSize + 'em');
                }
            }
              , 
            setWidth = function() {
                if (null  != children) {
                    var totalWidth = 0;
                    var fontSize = parseFloat(top.window.getComputedStyle($element[0], null )['fontSize']);
                    for (var i = 0; i < children.length; i++) {
                        var contentRect = getContentRect(children[i]);
                        totalWidth += (contentRect.width + contentRect.left + contentRect.right);
                    }
                    if ($attrs['cid'] == 'iholder21') {
                        wrapperDiv.css('width', (totalWidth / fontSize) + 0.3 + 'em');
                    } else {
                        wrapperDiv.css('width', (totalWidth / fontSize) + 'em');
                    }
                }
            }
              , 
            moveDragState = function(state, point) {
                state.delta = distanceBetween(point, state.pos);
                state.distance = distanceBetween(point, state.origin);
                state.pos = {
                    x: point.x,
                    y: point.y
                };
                state.updatedAt = Date.now();
            }
              , 
            distanceBetween = function(p2, p1) {
                var dist = {
                    x: p2.x - p1.x,
                    y: p2.y - p1.y
                };
                dist.magnitude = Math.sqrt(dist.x * dist.x + dist.y * dist.y);
                return dist;
            }
              , 
            isInput = function(raw) {
                return raw && (raw.tagName === "INPUT" || 
                raw.tagName === "SELECT" || 
                raw.tagName === "TEXTAREA");
            }
              , 
            startDragState = function(point) {
                return {
                    origin: {
                        x: point.x,
                        y: point.y
                    },
                    pos: {
                        x: point.x,
                        y: point.y
                    },
                    distance: {
                        x: 0,
                        y: 0,
                        magnitude: 0
                    },
                    delta: {
                        x: 0,
                        y: 0,
                        magnitude: 0
                    },
                    
                    startedAt: Date.now(),
                    updatedAt: Date.now(),
                    
                    stopped: false,
                    active: true
                };
            }
              , 
            dragStart = function(e) {
                e = e.originalEvent || e;
                
                var target = jqLite(e.target || e.srcElement);
                
                options.stopPropagation && e.stopPropagation();
                
                var point = e.touches ? e.touches[0] : e;
                
                if (options.shouldBlurOnDrag && isInput(target)) {
                    document.activeElement && document.activeElement.blur();
                }
                
                self.state = startDragState({
                    x: point.pageX,
                    y: point.pageY
                });
                if (isHorizontalWithImage) {
                    showScrollImage();
                }
            }
              , 
            dragMove = function(e) {
                e = e.originalEvent || e;
                
                if (null  != self.state && self.state.active) {
                    e.preventDefault();
                    options.stopPropagation && e.stopPropagation();
                    
                    var point = e.touches ? e.touches[0] : e;
                    point = {
                        x: point.pageX,
                        y: point.pageY
                    };
                    var timeSinceLastMove = Date.now() - self.state.updatedAt;
                    
                    if (timeSinceLastMove > _maxTimeMotionless) {
                        self.state = startDragState(point);
                    }
                    moveDragState(self.state, point);
                    if (isHorizontal || isHorizontalWithImage) {
                        $element[0].scrollLeft -= self.state.delta.x;
                    }
                    if (isVerticle) {
                        $element[0].scrollTop -= self.state.delta.y;
                    }
                    
                    if (isHorizontalWithImage) {
                        showScrollImage();
                        coreService.commonServiceRef.schedulerService({
                            'on': 'autoclose'
                        }, {
                            "cycle": "1",
                            "interval": "5000",
                            "start": "2"
                        });
                    }
                }
            }
              , 
            dragEnd = function(e) {
                if (null  != self.state && self.state.active) {
                    e = e.originalEvent || e;
                    options.stopPropagation && e.stopPropagation();
                    
                    self.state.updatedAt = Date.now();
                    self.state.stopped = (self.state.updatedAt - self.state.startedAt) > _maxTimeMotionless;
                    self.state = {};
                    if (isHorizontalWithImage) {
                        hideScrollImage();
                    }
                }
            }
              , 
            scroll = function() {
                wrapper();
                if (isHorizontal || isHorizontalWithImage) {
                    setWidth();
                }
                if (isVerticle) {
                    setHeight();
                }
                $element.bind('touchstart', dragStart);
                $element.bind('touchmove', dragMove);
                $element.bind('touchend touchcancel', dragEnd);
                $element.bind('mousedown', dragStart);
                $element.bind('mousemove', dragMove);
                $element.bind('mouseup mouseout', dragEnd);
            }
              , 
            showScrollImage = function() {
                if ($element[0].offsetWidth < wrapperDiv[0].offsetWidth) {
                    var elementDiementions = getContentRect($element[0]);
                    if (parseFloat($element[0].scrollLeft) <= 0) {
                        angular.element($element.parent()[0].querySelector('.ui-com-hscroll-right-arrow')).css({
                            'opacity': '1.15',
                            'display': 'block'
                        });
                        angular.element($element.parent()[0].querySelector('.ui-com-hscroll-left-arrow')).css({
                            'opacity': '0',
                            'display': 'none'
                        });
                    } else if (parseFloat(elementDiementions.width + elementDiementions.left + elementDiementions.right + $element[0].scrollLeft + 2) >= wrapperDiv[0].offsetWidth) {
                        angular.element($element.parent()[0].querySelector('.ui-com-hscroll-left-arrow')).css({
                            'opacity': '1.15',
                            'display': 'block'
                        });
                        angular.element($element.parent()[0].querySelector('.ui-com-hscroll-right-arrow')).css({
                            'opacity': '0',
                            'display': 'none'
                        });
                    } else {
                        angular.element($element.parent()[0].querySelector('.ui-com-hscroll-left-arrow')).css({
                            'opacity': '1.15',
                            'display': 'block'
                        });
                        angular.element($element.parent()[0].querySelector('.ui-com-hscroll-right-arrow')).css({
                            'opacity': '1.15',
                            'display': 'block'
                        });
                    
                    }
                }
            }
              , 
            hideScrollImage = function() {
                angular.element($element.parent()[0].querySelector('.ui-com-hscroll-left-arrow')).css({
                    'opacity': '0',
                    'display': 'none'
                });
                angular.element($element.parent()[0].querySelector('.ui-com-hscroll-right-arrow')).css({
                    'opacity': '0',
                    'display': 'none'
                });
            }
            ;
            
            $scope.getParentDimentions = function() {
                if (null  != children) {
                    return {
                        'h': top.window.getComputedStyle(children[0]).height,
                        'w': top.window.getComputedStyle(children[0]).width
                    }
                }
                return {};
            }
            ;
            $scope.$watch($scope.getParentDimentions, function(newValue, oldValue) {
                if (isHorizontal || isHorizontalWithImage) {
                    setWidth();
                }
                if (isVerticle) {
                    setHeight();
                }
            }, true);
            $timeout(scroll, 0);
            
            w.bind('resize', function() {
                $scope.$apply();
            });
        }
        ],
        link: function($scope, $element, $attrs) {}
    };
});
uiCore.directive('ibutton', [
'coreService', 
'coreUtils', 
'$timeout', 
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        scope: {
            param: '=param'
        },
        template: '<div ng-click="compData.JS.clickable?handleClick():clickDisable();$event.stopPropagation();" {{param}}><div id="buttontextdiv">{{compData.JS.buttontext}}<div></div>',
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        'coreService', 
        'coreUtils', 
        function($scope, $element, $attrs, coreService, coreUtils) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {},
                'JS': {
                    'buttontext': '',
                    'clickable': false,
                    'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                    },
                    'buttontextstyle': {
                        'CSS': {
                            'font-size': '0.8em'
                        },
                        'JS': {
                        
                        }
                    }
                }
            };
            $scope.handleClick = function() {
                coreService.fireEvent($scope.cid, 'click' + $scope.compData.JS.stateconfig.state);
            }
            ;
            $scope.clickDisable = function() {}
            ;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
                $timeout(function() {
                    $scope.$apply();
                });
            }
            ;
            $scope.init = function() {
                $scope.compData = $scope.param;
                $scope.applyStyle();
            }
            ;
            /*$scope.getButtonStyle = function() {
                        if (0 == $scope.compData.JS.stateconfig.state) {
                            return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig.state0);
                        } else {
                            return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig.state1);
                        }
                    };*/
            $scope.$watch($scope.param, function(newValue) {
                if ($scope.param) {
                    $scope.compData = $scope.param;
                    $scope.applyStyle();
                }
            });
            $scope.applyStyle = function() {
                if (null  != $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]) {
                    coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]);
                }
                $element.css($scope.compData.CSS);
                angular.element($element[0].querySelector('[id="buttontextdiv"]')).css($scope.compData.JS.buttontextstyle.CSS);
            }
            ;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'ibutton';
            $scope.init();
        }
    };
}
]);
uiCore.directive('percentage', function() {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            percent: '=',
        },
        require: '^pid',
        template: '<div class=\'ui-com-percentage\'><div class=\'ui-com-percentage-value\'></div><div class=\'ui-com-percentage-image\'></div></div>',
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        'coreService', 
        '$timeout', 
        'coreUtils', 
        function($scope, $element, $attrs, coreService, $timeout, coreUtils) {
            $scope.setPercent = function(percent) {
                $scope.percent = percent;
            }
            ;
            $scope.showPercentage = function() {
                $scope.jsProp.styleSet = coreUtils.String2JSON($attrs['styleset']);
                angular.element($element[0].querySelector('.ui-com-percentage-value')).css({
                    'background-color': $scope.getPercentageColor().activecolor,
                    'width': $scope.percent + '%'
                });
                if (($attrs['showpercentageimage'] == "true") && ($scope.getPercentageColor().activeimage)) {
                    angular.element($element[0].querySelector('.ui-com-percentage-image')).css({
                        'background-image': $scope.getPercentageColor().activeimage,
                        'left': ($scope.percent - 1) + '%'
                    });
                }
            }
            ;
            $scope.getPercentageColor = function() {
                var valueSet = undefined;
                for (p in $scope.jsProp.styleSet) {
                    var dataSet = p.split("_");
                    if (dataSet.length > 0) {
                        if (parseInt(dataSet[0]) <= $scope.percent && $scope.percent <= parseInt(dataSet[1])) {
                            return $scope.jsProp.styleSet[p];
                        }
                    }
                }
                return $scope.jsProp.styleSet.defaultset.activecolor;
            }
            ;
            $scope.init = function() {
                var defaultJsProp = {}
                  , 
                properties = coreService.getInitProperties($attrs['cid']) || {}
                  , 
                jsProp = properties.JS || {}
                  , 
                cssProp = properties.CSS || {}
                  , 
                jsData = coreUtils.String2JSON($attrs['jsdata'])
                  , 
                cssData = coreUtils.String2JSON($attrs['cssdata']);
                $scope.jsProp = coreUtils.extendDeep(defaultJsProp, jsProp, jsData);
                $scope.cssProp = coreUtils.extendDeep(cssProp, cssData);
                $element.css($scope.cssProp);
                $timeout($scope.showPercentage, 0);
            }
            ;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'percentage';
            $scope.init();
        }
    };
});
uiCore.directive('simplescroll', function() {
    return {
        restrict: 'A',
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        '$timeout', 
        'Const', 
        function($scope, $element, $attrs, $timeout, Const) {
            var children, 
            wrapperDiv, 
            minHeight = 0, 
            totalHeight = 0;
            var isOpera = /preto/i.test(navigator.userAgent) || /opera/i.test(navigator.userAgent);
            var bind = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var totalDistance = 0;
                var _lastYPos = 0;
                var _currentYPos = 0;
                var ydistance = 0;
                var flag = false;
                var elHeight = 0;
                var parentHeight = 0;
                var touchstartflag = false;
                var touchstart = function(e) {
                    top.tlbs.popupTxtMove = false;
                    var transform = $element[0].style['webkitTransform'] || $element[0].style['mozTransform'] || $element[0].style['msTransform'] || $element[0].style['msTransform'] || $element[0].style['oTransform'];
                    if (transform) {
                        totalDistance = transform.split(',')[1] && parseInt(transform.split(',')[1]);
                    } else {
                        totalDistance = 0;
                    }
                    touchstartflag = true;
                    elHeight = parseInt($attrs['totalheight'] || top.window.getComputedStyle($element[0], null )['height']) + 20;
                    parentHeight = parseInt($attrs['parentheight'] || top.window.getComputedStyle($element[0].parentNode, null )['height']);
                    _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    if (elHeight > parentHeight) {
                        top.document.addEventListener(_touchmove, touch, false);
                        
                        top.document.addEventListener(_touchend, endTouch, false);
                    }
                
                }
                
                var touch = function(e) {
                    if (touchstartflag) {
                        _currentYPos = e.touches ? e.touches[0].pageY : e.pageY;
                        
                        ydistance = _currentYPos - _lastYPos;
                        
                        if (Math.abs(ydistance) > 3 || flag) {
                            top.tlbs.popupTxtMove = true;
                            flag = true;
                            e.stopPropagation();
                            e.preventDefault();
                        }
                        
                        _lastYPos = _currentYPos;
                        totalDistance += ydistance;
                        
                        if (totalDistance > 0) {
                            totalDistance = 0;
                        } else if (totalDistance + elHeight <= parentHeight) {
                            
                            totalDistance = parentHeight - elHeight;
                        }
                        if (isOpera) {
                            $element.css('-o-transform', 'translate(0,' + totalDistance + 'px)');
                            $element.css('transform', 'translate(0,' + totalDistance + 'px)');
                        } else {
                            $element.css('-webkit-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            $element.css('-moz-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            $element.css('-o-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            $element.css('-ms-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            $element.css('transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        }
                    }
                }
                ;
                var endTouch = function(e) {
                    if (flag) {
                        e.stopPropagation();
                        e.preventDefault();
                        flag = false;
                    }
                    touchstartflag = false;
                    top.document.removeEventListener(_touchmove, touch, false);
                    top.document.removeEventListener(_touchend, endTouch, false);
                }
                ;
                $element.bind(_touchstart, touchstart);
            }
            ;
            
            $timeout(bind, 0);
        }
        ],
        link: function($scope, $element, $attrs) {}
    };
});
uiCore.directive('imageholder', [
'coreService', 
'coreUtils', 
'$timeout', 
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'AE',
        replace: true,
        template: '<div ng-click="compData.JS.clickable && handleClick();$event.preventDefault();compData.JS.stopp && $event.stopPropagation()" {{param}}></div>',
        scope: {
            param: '=param',
            dynamicproperties: '=dynamicproperties'
        },
        require: '^pid',
        controller: [
        '$scope', 
        '$element', 
        '$attrs', 
        function($scope, $element, $attrs) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {},
                'JS': {
                    'clickable': false,
                    'stopp': false,
                    'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                    },
                    'cdrConfig': {
                    
                    }
                }
            };
            $scope.changeState = function(stateObject, deferred) {
                if (null  != stateObject && null  != stateObject.cstate) {
                    if ($scope.compData.JS.stateconfig.state != stateObject.cstate) {
                        $scope.compData.JS.stateconfig.state = stateObject.cstate;
                        $scope.applyStyle();
                        $scope.$evalAsync(
                        function() {
                            if (null  != deferred) {
                                if ($scope.compData.JS.animation) {
                                    //var _transitionEnd = /webkit/i.test(navigator.userAgent) ? 'webkitTransitionEnd' : 'transitionend';
                                    $element.on(top.tlbs.transitionendEvent, function(e) {
                                        deferred.resolve();
                                    });
                                } else {
                                    deferred.resolve();
                                }
                            }
                        });
                    }
                } else if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            $scope.handleClick = function() {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.cdrConfig)) {
                    var pageID = top.tlbs.currentpageid || $scope.pageID;
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': pageID,
                        'componentId': $scope.cid
                    };
                    coreUtils.cdrService($scope.compData.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($scope.cid, 'click' + $scope.compData.JS.stateconfig.state);
            }
            ;
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.eventMap['changeState'] = $scope.changeState;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                
                $scope.$watch($scope.dynamicproperties, function(newValue) {
                    if ($scope.dynamicproperties) {
                        $scope.update();
                    }
                });
                $scope.applyStyle();
            }
            ;
            
            $scope.update = function() {
                if (typeof $scope.dynamicproperties == 'string') {
                    $scope.dynamicproperties = coreUtils.String2JSON($scope.dynamicproperties);
                }
                if ($scope.dynamicproperties.CSS['background-image'] != "") {
                    $element.css({
                        "background-image": 'url("' + $scope.dynamicproperties.CSS['background-image'] + '")'
                    });
                }
            }
            ;
            
            /*$scope.getImageStyle = function() {
                        if (0 == $scope.compData.JS.stateconfig.state) {
                            return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig.state0);
                        } else {
                            return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig.state1);
                        }
                    };*/
            $scope.applyStyle = function() {
                if (null  != $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]) {
                    coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]);
                }
                $element.css($scope.compData.CSS);
            }
            ;
            $scope.$on('stateChange', function(eventObj) {
                $scope.applyStyle();
            });
            $scope.$watch($scope.param, function(newValue) {
                if ($scope.param) {
                    $scope.compData = $scope.param;
                    $scope.applyStyle();
                }
            });
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'imageholder';
            scope.init();
        }
    };
}
]);