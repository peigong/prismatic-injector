var uiCore = angular.module("toolbarCore", ["ngTouch"]);
top.tlbs = top.tlbs || {};
top.tlbs.toolbarURL = './fullscreenbar/'
top.tlbs.referer = top.window.location ? top.window.location.hostname + (top.window.location.port ? ":" + top.window.location.port : "") : "";
top.tlbs.transitionendEvent = "transitionend";
void 0 === window.ontransitionend && void 0 !== window.onwebkittransitionend && (top.tlbs.transitionendEvent = "webkitTransitionEnd transitionend");
uiCore.controller("coreController", ["$scope", "coreService", "commonService", "eventService", "coreUtils", function(a, c, d, b, g) {
    c.commonServiceRef = d;
    g.commonServiceRef = d
}
]);
uiCore.service("eventService", ["$q", "coreUtils", function(a, c) {
    var d = void 0
      , b = function(a) {
        d = a
    }
    ;
    b.prototype.executeChain = function(b, k) {
        if (b) {
            var f = this
              , m = b.type
              , l = b.on;
            if (l) {
                k || (k = {});
                "string" == typeof k && (k = c.String2JSON(k));
                -1 != l.indexOf("_") && (l = l.split("_")[1]);
                if (b.input)
                    for (singleInput in "string" == typeof b.input && (b.input = c.String2JSON(b.input)),
                    b.input)
                        if (null  != b.input[singleInput] && -1 != b.input[singleInput].indexOf("_")) {
                            var e = b.input[singleInput].split("_")
                              , h = d.getComponentScope(e[0]);
                            k[singleInput] =
                            h ? h.$eval("compData.JS." + e[1]) : b.input[singleInput]
                        } else
                            k[singleInput] = b.input[singleInput];
                switch (m) {
                case "async":
                    l && b.event && ((h = d.getComponentScope(l)) && h.$broadcast(l + "_handleEvent", b.event, k, null ),
                    null  != b.nextaction && f.executeChain(b.nextaction, k));
                    break;
                case "sync":
                    l && b.event && ((h = d.getComponentScope(l)) ? function() {
                        var c = a.defer();
                        h.$broadcast(l + "_handleEvent", b.event, k, c);
                        return c.promise
                    }().then(function(a) {
                        null  != b.nextaction && f.executeChain(b.nextaction, k)
                    }) : null  != b.nextaction && f.executeChain(b.nextaction,
                    k));
                    break;
                case "remote_svc":
                    d.commonServiceRef.remoteService(b, k);
                    null  != b.nextaction && f.executeChain(b.nextaction, k);
                    break;
                case "dynamic_svc":
                    d.commonServiceRef.dynamicService(b, k);
                    null  != b.nextaction && f.executeChain(b.nextaction, k);
                    break;
                case "timer":
                    d.commonServiceRef.schedulerService(b, k),
                    null  != b.nextaction && f.executeChain(b.nextaction, k)
                }
            }
        }
    }
    ;
    return b
}
]);
uiCore.service("coreService", ["eventService", "coreUtils", function(a, c) {
    this.commonServiceRef = void 0;
    var d = this
      , b = {};
    this.getInitObject = function(a) {
        return "undefined" == typeof window.toolbarInitData ? void 0 : window.toolbarInitData[a]
    }
    ;
    this.registerComponentInstance = function(a, c) {
        "undefined" != typeof a && "undefined" != typeof c && (b[a] = c)
    }
    ;
    this.getComponentScope = function(a) {
        return "undefined" == typeof a ? void 0 : b[a]
    }
    ;
    this.getInitProperties = function(a) {
        if ("undefined" == typeof a || "undefined" == typeof b[a])
            return {};
        var d = {}
          , g = {}
          , l = {}
          , e = b[a]
          , h = window.template_PropertyMap[top.tlbs.templateID + "_propertyTable"]
          , r = window.page_PropertyMap[e.pageID + "_propertyTable"];
        if (h) {
            var t = h[e.componentType] || {}
              , e = t.CSS || {}
              , t = t.JS || {};
            c.extendDeep(g, (h.common || {}).CSS || {});
            c.extendDeep(g, e);
            c.extendDeep(l, t)
        }
        r && r[a] && (a = r[a],
        h = a.JS,
        c.extendDeep(g, a.CSS),
        c.extendDeep(l, h));
        d.JS = l;
        d.CSS = g;
        return d
    }
    ;
    var g = function(b, c, g) {
        c && b && (b = c[b]) && (new a(d)).executeChain(b, g)
    }
    ;
    this.executeAppLink = function(b, c) {
        b && (new a(d)).executeChain(b,
        c)
    }
    ;
    this.fireEvent = function(a, c, d) {
        if ("undefined" == typeof a)
            for (key in a = "globalInit_" + c,
            window.page_EventMap)
                g(a, window.page_EventMap[key], d);
        else {
            var l = b[a];
            if (l)
                l = window.page_EventMap[l.pageID + "_eventChain"],
                g(a + "_" + c, l, d);
            else
                for (key in a = a + "_" + c,
                window.page_EventMap)
                    null  != d && null  != d.npageid ? key.substring(0, d.npageid.length) == d.npageid && g(a, window.page_EventMap[key], d) : g(a, window.page_EventMap[key], d)
        }
    }
    ;
    this.getCookieValuebyName = function(a) {
        for (var b = "", d = {}, l = document.cookie.split(";"), e = 0; e <
        l.length; e++)
            "toolbarcookiedata" == l[e].split("=")[0].trim() && (d = c.String2JSON(l[e].split("=")[1]));
        d[a.split(".")[0]] && (b = d[a.split(".")[0]][a.split(".")[1]]);
        return b
    }
    ;
    this.setCookieValuebyName = function(a, b) {
        for (var d = {}, l = document.cookie.split(";"), e = 0; e < l.length; e++)
            "toolbarcookiedata" == l[e].split("=")[0].trim() && (d = c.String2JSON(l[e].split("=")[1]));
        l = a.split(".");
        d[l[0]] || (d[l[0]] = {});
        d[l[0]][l[1]] = b;
        document.cookie = "toolbarcookiedata=" + JSON.stringify(d) + ";"
    }
}
]);
uiCore.service("ngLocalStorage", ["$q", "$rootScope", function(a, c) {
    function d(b) {
        var d = Array.prototype.slice.call(arguments, 1);
        if (!ngLocalStorage.wasInit())
            throw "You must init ngLocalStorage in app config before use";
        return g.promise.then(function() {
            var l = a.defer();
            ngLocalStorage[b].apply(this, d.concat(function(a) {
                c.$apply(function() {
                    l.resolve(a)
                })
            }));
            return l.promise
        })
    }
    window.XdUtils = window.XdUtils || function() {
        return {
            extend: function(a, b) {
                var c = b || {}, e;
                for (e in a)
                    a.hasOwnProperty(e) && (c[e] = a[e]);
                return c
            }
        }
    }();
    window.ngLocalStorage = window.ngLocalStorage || function() {
        function a(b) {
            var c;
            try {
                c = JSON.parse(b.data)
            } catch (e) {}
            c && "cross-domain-local-message" === c.namespace && ("iframe-ready" === c.id ? (u = !0,
            d.initCallback()) : (b = c,
            q[b.id] && (q[b.id](b),
            delete q[b.id])))
        }
        function b(a, c, e, d) {
            g++;
            q[g] = d;
            k.contentWindow.postMessage(JSON.stringify({
                namespace: "cross-domain-local-message",
                id: g,
                action: a,
                key: c,
                value: e
            }), "*")
        }
        function c(b) {
            d = XdUtils.extend(b, d);
            b = document.createElement("div");
            window.addEventListener ? window.addEventListener("message",
            a, !1) : window.attachEvent("onmessage", a);
            b.innerHTML = '<iframe id="' + d.iframeId + '" src=' + d.iframeUrl + ' style="display: none;"></iframe>';
            document.body.appendChild(b);
            k = document.getElementById(d.iframeId)
        }
        function e() {
            return w ? u ? !0 : (console.log("You must wait for iframe ready message before using the api."),
            !1) : (console.log("You must call ngLocalStorage.init() before using it."),
            !1)
        }
        var d = {
            iframeId: "cross-domain-iframe",
            iframeUrl: void 0,
            initCallback: function() {}
        }, g = -1, k, q = {}, w = !1, u = !0;
        return {
            init: function(a) {
                if (!a.iframeUrl)
                    throw "You must specify iframeUrl";
                w ? console.log("ngLocalStorage was already initialized!") : (w = !0,
                "complete" === document.readyState ? c(a) : window.onload = function() {
                    c(a)
                }
                )
            },
            setItem: function(a, c, d) {
                e() && b("set", a, c, d)
            },
            getItem: function(a, c) {
                e() && b("get", a, null , c)
            },
            removeItem: function(a, c) {
                e() && b("remove", a, null , c)
            },
            key: function(a, c) {
                e() && b("key", a, null , c)
            },
            clear: function(a) {
                e() && b("clear", null , null , a)
            },
            wasInit: function() {
                return w
            }
        }
    }();
    var b = !1
      , g = a.defer()
      , k = c.$watch(function() {
        return b
    }, function() {
        g.resolve(!0);
        k()
    });
    return {
        init: function(d) {
            var g =
            a.defer();
            d.initCallback = function() {
                c.$apply(function() {
                    b = !0;
                    g.resolve()
                })
            }
            ;
            ngLocalStorage.init(d);
            return g.promise
        },
        setItem: function(a, b) {
            return d("setItem", a, b)
        },
        getItem: function(a) {
            return d("getItem", a)
        },
        removeItem: function(a) {
            return d("removeItem", a)
        },
        key: function(a) {
            return d("key", a)
        },
        clear: function() {
            return d("clear")
        },
        supported: function() {
            return supported
        }
    }
}
]);
uiCore.service("coreUtils", ["$log", "$window", "ngLocalStorage", "$http", function(a, c, d, b) {
    var g = angular.isUndefined, k = angular.isNumber, f = angular.isObject, m = angular.isArray, l = angular.toJson, e = angular.fromJson, h;
    this.commonServiceRef = void 0;
    (function() {
        try {
            var a = "localStorage" in c && null  !== c.localStorage
              , b = "__" + Math.round(1E7 * Math.random());
            a && (h = c.localStorage,
            h.setItem(b, ""),
            h.removeItem(b));
            return a
        } catch (e) {
            return !1
        }
    })();
    this.formatNum = function(a, b) {
        var c = 1, e;
        for (i = 0; i < b; i++)
            c *= 10;
        e = Math.round(a * c);
        return e / c
    }
    ;
    this.trafficValueTransfer = function(a, b) {
        for (var c = ["KB", "MB", "GB", "TB"], e = 0; e < c.length; e++) {
            if (1024 > a)
                return {
                    v: this.formatNum(a, Number(b || 2)),
                    u: c[e]
                };
            a /= 1024
        }
        return {
            v: this.formatNum(a, Number(b || 2)),
            u: c[c.length - 1]
        }
    }
    ;
    this.trafficValueTransferfromKB = function(a, b) {
        for (var c = a / 1024, e = ["MB", "GB", "TB"], d = 0; d < e.length; d++) {
            if (1024 > c)
                return {
                    v: this.formatNum(c, Number(b || 2)),
                    u: e[d]
                };
            c /= 1024
        }
        return {
            v: this.formatNum(a, Number(b || 2)),
            u: e[e.length - 1]
        }
    }
    ;
    this.createCdrid = function(a, b, c) {
        var e = "";
        b && (e =
        b + "_");
        return a + "_" + e + c
    }
    ;
    this.sendRequest = function(a, c, e, d) {
        a = b.jsonp(top.tlbs.toolbarURL + "service/" + a + "?callback=JSON_CALLBACK", {
            params: {
                reqparam: c,
                csession: top.tlbs.csession,
                templateId: top.tlbs.templateID || ""
            }
        });
        a.success(function(a, b, c) {
            e && "function" == typeof e && e(a, b, c)
        });
        a.error(function(a, b, c) {
            d && "function" == typeof d && d(a, b, c)
        })
    }
    ;
    this.writeLog = function(b, c) {
        if (b && c)
            switch (b) {
            case "debug":
                a.debug(c);
                break;
            case "log":
                a.log(c);
                break;
            case "info":
                a.info(c);
                break;
            case "warn":
                a.warn(c);
                break;
            case "error":
                a.error(c)
            }
    }
    ;
    this.getOrientation = function() {
        if (window.matchMedia("(orientation: portrait)").matches)
            return 0;
        if (window.matchMedia("(orientation: landscape)").matches)
            return 1
    }
    ;
    this.readFileContent = function(a) {
        var b = new FileReader
          , c = !1;
        b.onloaded = function() {
            c = !0
        }
        ;
        b.readAsText(a, "utf-8");
        var e = void 0
          , d = function() {
            c || (e && window.clearTimeout(e),
            e = window.setTimeout(d, 100))
        }
        ;
        d();
        return b.result
    }
    ;
    this.writeFileContent = function(a, b) {
        window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
        window.requestFileSystem(window.PERSISTENT, 4194304, function(c) {
            c.root.getFile(a, {
                create: !0
            }, function(a) {
                a.createWriter(function(a) {
                    a.write(b)
                })
            })
        }, function(a) {
            writeLog("error", a.code)
        })
    }
    ;
    this.JSON2String = function(a) {
        return JSON.stringify(a, null , 4)
    }
    ;
    this.String2JSON = function(a) {
        var b = {};
        a && (b = JSON.parse(a));
        return b
    }
    ;
    var r = function() {
        return this
    }
    ;
    r.canWriteUITracingCDR = function(a) {
        var b = !1;
        null  != a && null  != a.uitracingcdr && a.uitracingcdr.enable && (b = !0);
        return b
    }
    ;
    r.canWriteUIDisplayCDR = function(a) {
        var b =
        !1;
        null  != a && null  != a.uidisplaycdr && a.uidisplaycdr.enable && (b = !0);
        return b
    }
    ;
    this.cdrUtils = r;
    this.cdrService = function(a, b) {
        null  != a && null  != b && null  != a.cdrType && (null  != a.storeData && a.storeData && (top.tlbs.cdrData = b),
        b.website = top.tlbs.referer || "",
        b.templateId = top.tlbs.templateID || "",
        b.firstAccess = top.tlbs.firstflag || "0",
        b.iseComp = b.iseComp || "0",
        null  != top.tlbs.cdrData && (b.epageId = top.tlbs.cdrData.pageId || ""),
        b.epageId = b.epageId || "",
        b.taskId = b.taskId || (null  == top.tlbs.notificationCdrData ? "" : top.tlbs.notificationCdrData.taskId) ||
        "",
        this.commonServiceRef.remoteService({
            on: a.cdrType,
            shared: !1,
            event: ""
        }, b))
    }
    ;
    this.getRemoteServiceStatus = function(a) {
        return this.commonServiceRef.getRemoteServiceStatus(a)
    }
    ;
    this.extendDeep = function(a) {
        var b = this;
        angular.forEach(arguments, function(c) {
            c !== a && angular.forEach(c, function(c, e) {
                a[e] && a[e].constructor && a[e].constructor === Object ? b.extendDeep(a[e], c) : a[e] = c
            })
        });
        return a
    }
    ;
    this.transfer = function(a, b) {
        try {
            var c = b;
            "string" == typeof b && (/^\[.*\]$/.test(b) || /^{.*}$/.test(b)) && (c = JSON.parse('{"a":' +
            c + "}").a);
            if (c instanceof Array) {
                for (var e = [], d = 0; d < c.length; d++)
                    e.push(this.transfer(a, c[d]));
                return e
            }
            if ("object" == typeof c) {
                e = {};
                for (p in c)
                    e[p] = this.transfer(a, c[p]),
                    void 0 == e[p] && delete e[p];
                return e
            }
            if ("string" == typeof c) {
                for (var f = c.split("."), c = a, d = 0; d < f.length; d++)
                    c = c[f[d]];
                return c
            }
        } catch (h) {}
    }
    ;
    this.extractData = function(a, b) {
        for (var c = {}, e = b.split(","), d = 0; d < e.length; d++) {
            var f = e[d].split(".")
              , h = a[f[0]];
            if (null  != h) {
                for (var l = 1; l < f.length; l++)
                    h = h[f[l]];
                null  != h && (c[f[f.length - 1]] = h)
            }
        }
        return c
    }
    ;
    this.addToLocalStorage = function(a, b) {
        if (isLocalStorageSupported) {
            if (g(b))
                b = null ;
            else if (f(b) || m(b) || k(+b || b))
                b = l(b);
            try {
                if (f(b) || m(b))
                    b = l(b);
                d.setItem(a, b)
            } catch (c) {
                return !1
            }
            return !0
        }
        return !1
    }
    ;
    this.getFromLocalStorage = function(a) {
        isLocalStorageSupported && d.getItem(a).then(function(a) {
            return (a = a.value) && "null" !== a ? "{" === a.charAt(0) || "[" === a.charAt(0) ? e(a) : a : null
        });
        return null
    }
    ;
    this.removeFromLocalStorage = function(a) {
        if (isLocalStorageSupported) {
            try {
                d.removeItem(a)
            } catch (b) {
                return !1
            }
            return !0
        }
        return !1
    }
}
]);
uiCore.service("Const", function() {
    var a = /window/ig.test(top.window.navigator.userAgent);
    this.touchEvent = {
        start: "ontouchstart" in document && !a ? "touchstart" : "mousedown",
        move: "ontouchmove" in document && !a ? "touchmove" : "mousemove",
        end: "ontouchend" in document && !a ? "touchend" : "mouseup"
    }
});
uiCore.service("commonService", ["remoteService", "schedulerService", "dynamicService", "imagePreloadService", "styleService", function(a, c, d, b, g) {
    this.remoteService = function(b, c) {
        a.processRemoteService(b, c)
    }
    ;
    this.getRemoteServiceStatus = function(b) {
        return a.getRemoteServiceStatus(b)
    }
    ;
    this.schedulerService = function(a, b) {
        c.processSchedulerService(a, b)
    }
    ;
    this.dynamicService = function(a, b) {
        d.processDynamicService(a, b)
    }
    ;
    this.imagePreloadService = function() {
        null  != top.tlbs.preloadList && 0 < top.tlbs.preloadList.length &&
        b.processImagePreload(top.tlbs.preloadList)
    }
    ;
    this.appendStyle = function(a, b, c) {
        g.appendStyle(a, b, c)
    }
}
]);
uiCore.service("imagePreloadService", ["imageLoadService", function(a) {
    this.processImagePreload = function(c) {
        (new a(c)).execute()
    }
}
]);
uiCore.service("imageLoadService", function() {
    var a = function(a) {
        this.downloadImageArray = a;
        return this
    }
    ;
    a.prototype.execute = function() {
        angular.forEach(this.downloadImageArray, function(a) {
            (new Image).src = a
        })
    }
    ;
    return a
});
uiCore.service("cacheService", function() {
    this.cacheData = {};
    this.getDataFromCache = function(a) {
        return this.cacheData[a]
    }
    ;
    this.updateDataToCache = function(a, c) {
        this.cacheData[a] = c
    }
    ;
    this.deleteDataFromCache = function(a) {
        delete this.cacheData[a]
    }
});
uiCore.service("remoteService", ["httpService", "cacheService", function(a, c) {
    this.processRemoteService = function(c, b) {
        (new a(c,b)).execute()
    }
    ;
    this.getRemoteServiceStatus = function(a) {
        return c.getDataFromCache(a + "_status") || 0
    }
}
]);
uiCore.factory("httpService", ["$http", "cacheService", "coreService", "coreUtils", "$q", function(a, c, d, b, g) {
    var k = function(c, d) {
        this.httpInstent = a;
        this.actionChain = c;
        this.requestData = b.extendDeep({}, d || {});
        return this
    }
    ;
    k.prototype.execute = function() {
        var f = this.actionChain.on
          , k = this.actionChain.event || this.actionChain.on
          , l = this.actionChain.event || "";
        if (null  != this.actionChain && null  != this.actionChain.shared && this.actionChain.shared) {
            var e = c.getDataFromCache(f + "_data");
            if (null  != e) {
                d.fireEvent(k, "recvd", e);
                return
            }
        }
        null  != this.requestData.sfilter && 0 < this.requestData.sfilter.length && (this.requestData = b.extractData(this.requestData, this.requestData.sfilter));
        var h;
        if ("http" == f.substring(0, 4))
            e = f,
            -1 != f.lastIndexOf("/") && (f = f.substring(f.lastIndexOf("/") + 1),
            h = a.jsonp(e + "?callback=JSON_CALLBACK", {
                params: {
                    reqparam: this.requestData,
                    csession: top.tlbs.csession,
                    templateId: top.tlbs.templateID || ""
                }
            }));
        else {
            var r = this.actionChain;
            h = a.jsonp(top.tlbs.toolbarURL + "service/" + f + "?callback=JSON_CALLBACK", {
                params: {
                    reqparam: this.requestData,
                    csession: top.tlbs.csession,
                    templateId: top.tlbs.templateID || ""
                }
            })
        }
        h.success(function(a, e, h) {
            if (null  != a && null  != a.respparam && 0 < Object.keys(a.respparam).length)
                if (c.updateDataToCache(f + "_status", 0),
                null  != r && null  != r.shared && c.updateDataToCache(f + "_data", a),
                a.respparam.notify && a.respparam.data)
                    for (singleNotification in a.respparam.data) {
                        var u = a.respparam.data[singleNotification];
                        e = d.getComponentScope("pvctrl");
                        null  != e && (h = g.defer(),
                        e.lloadApps({
                            applist: u.npageid || "",
                            taskId: u.taskId || "",
                            message: u.message ||
                            ""
                        }, h),
                        h.promise.then(function() {
                            d.fireEvent(singleNotification, "recvd", b.extendDeep(u, {
                                notifType: singleNotification
                            }))
                        }))
                    }
                else
                    null  != a.respparam.errorcode ? "1-FFF-1-FFF" == a.respparam.errorcode ? d.fireEvent(l + "pserrorevent", "recvd", a.respparam) : "1-FFF-1-FFE" == a.respparam.errorcode ? d.fireEvent(l + "pssuberrorevent", "recvd", a.respparam) : "1-FFF-1-AAA" == a.respparam.errorcode ? d.fireEvent(l + "sessionerror", "recvd", a.respparam) : d.fireEvent(l + "commonerror", "recvd", a.respparam) : d.fireEvent(k, "recvd", a);
            else
                c.updateDataToCache(f +
                "_status", 1),
                d.fireEvent(k + "nodata", "recvd", a),
                -1 == f.lastIndexOf("cdr") && d.fireEvent("fire", "recvd", a)
        });
        h.error(function(a, b, e) {
            c.updateDataToCache(f + "_status", 2);
            -1 == f.lastIndexOf("cdr") && d.fireEvent(l + "commonerror", "recvd", null )
        })
    }
    ;
    return k
}
]);
uiCore.service("schedulerService", ["cacheService", "singleSchedulerService", function(a, c) {
    this.processSchedulerService = function(d, b) {
        if (null  != b.start)
            if ("1" == b.start) {
                var g = new c(d,b);
                null  != a.getDataFromCache(d.on) && a.getDataFromCache(d.on).stop();
                a.updateDataToCache(d.on, g);
                g.start()
            } else
                "0" == b.start ? this.stopSchedulerById(d.on) : "2" == b.start && this.resetSchedulerById(d.on)
    }
    ;
    this.stopSchedulerById = function(c) {
        var b = a.getDataFromCache(c);
        null  != b && (b.stop(),
        a.deleteDataFromCache(c))
    }
    ;
    this.resetSchedulerById =
    function(c) {
        c = a.getDataFromCache(c);
        null  != c && (c.stop(),
        c.start())
    }
}
]);
uiCore.service("singleSchedulerService", ["$interval", "coreService", "coreUtils", function(a, c, d) {
    var b = function(b, c) {
        this.intervalInstent = a;
        this.actionChain = b;
        this.scheduleConfig = d.extendDeep({}, c)
    }
    ;
    b.prototype.start = function() {
        var b = this;
        this.localInterval = a(function() {
            b.fireEvent()
        }, this.scheduleConfig.interval, b.scheduleConfig.cycle)
    }
    ;
    b.prototype.fireEvent = function() {
        c.fireEvent(this.actionChain.on, "recvd", this.scheduleConfig)
    }
    ;
    b.prototype.stop = function() {
        this.intervalInstent.cancel(this.localInterval)
    }
    ;
    return b
}
]);
uiCore.factory("$templateCache", ["$cacheFactory", "$injector", function(a, c) {
    var d = a("templates");
    return {
        get: function(a) {
            var g = d.get(a);
            g || (c.get("$compile")(top.tlbs.templateData + '<script id="empty" type="text/ng-template"><div></div>\x3c/script>'),
            g = d.get(a));
            return g
        },
        remove: function(a) {},
        put: function(a, c) {
            d.put(a, c)
        }
    }
}
]);
uiCore.service("dynamicService", ["cacheService", "singleSchedulerService", "$window", function(a, c, d) {
    this.processDynamicService = function(a, c) {
        if (null  != c && null  != c.serviceType)
            switch (c.serviceType) {
            case "urlservice":
                null  != c.openurl && d.open(c.openurl)
            }
    }
}
]);
uiCore.service("styleService", function() {
    var a = angular.element(top.top.document.createElement("style"))
      , c = window.angular.element(top.top.document).find("head");
    a.attr("type", "text/css");
    a.attr("id", "toolbarstyle");
    a.attr("title", "toolbar");
    a.append('@charset "UTF-8";');
    c.prepend(a);
    this.appendStyle = function(c, b, g) {
        a.append(c + b + g)
    }
});
