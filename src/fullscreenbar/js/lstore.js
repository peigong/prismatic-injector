window.XdUtils = window.XdUtils || function() {
    return {
        extend: function(c, e) {
            var d = e || {}, b;
            for (b in c)
                c.hasOwnProperty(b) && (d[b] = c[b]);
            return d
        }
    }
}();
(function() {
    function c(b, a) {
        var c = XdUtils.extend(a, d);
        c.id = b;
        parent.postMessage(JSON.stringify(c), "*")
    }
    function e(b) {
        var a;
        try {
            a = JSON.parse(b.data)
        } catch (e) {}
        if (a && "cross-domain-local-message" === a.namespace)
            if ("set" === a.action) {
                b = a.id;
                var d = a.key;
                a = a.value;
                localStorage.setItem(d, a);
                a = {
                    success: localStorage.getItem(d) === a
                };
                c(b, a)
            } else
                "get" === a.action ? (b = a.id,
                a = a.key,
                d = localStorage.getItem(a),
                c(b, {
                    key: a,
                    value: d
                })) : "remove" === a.action ? (b = a.id,
                localStorage.removeItem(a.key),
                c(b, {})) : "key" === a.action ? (b = 
                a.id,
                a = localStorage.key(a.key),
                c(b, {
                    key: a
                })) : "clear" === a.action && (a = a.id,
                localStorage.clear(),
                c(a, {}))
    }
    var d = {
        namespace: "cross-domain-local-message"
    };
    window.addEventListener ? window.addEventListener("message", e, !1) : window.attachEvent("onmessage", e);
    parent.postMessage(JSON.stringify({
        namespace: "cross-domain-local-message",
        id: "iframe-ready"
    }), "*")
})();