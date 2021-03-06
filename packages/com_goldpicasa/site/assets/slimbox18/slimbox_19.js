var Slimbox = function() {
    function y() {
        var a = n.getScroll(),
            b = n.getSize();
        $$(e, p).setStyle("left", a.x + b.x / 2);
        G && k.setStyles({
            left: a.x,
            top: a.y,
            width: b.x,
            height: b.y
        })
    }

    function H(a) {
        ["object", I ? "select" : "embed"].forEach(function(b) {
            Array.forEach(document.getElementsByTagName(b), function(b) {
                a && (b._slimbox = b.style.visibility);
                b.style.visibility = a ? "hidden" : b._slimbox
            })
        });
        k.style.display = a ? "" : "none";
        var b = a ? "addEvent" : "removeEvent";
        n[b]("scroll", y)[b]("resize", y);
        document[b]("keydown", Q)
    }

    function Q(a) {
        a = a.code;
        return c.closeKeys.contains(a) ? z() : c.nextKeys.contains(a) ? J() : c.previousKeys.contains(a) ? K() : !1
    }

    function K() {
        return A(q)
    }

    function J() {
        return A(r)
    }

    function A(a) {
        0 <= a && (l = a, s = f[a][0], q = (l || (c.loop ? f.length : 0)) - 1, r = (l + 1) % f.length || (c.loop ? 0 : -1), L(), e.className = "lbLoading", d = new Image, d.onload = R, d.src = s);
        return !1
    }

    function S(a, b, c, d) {
        var e = d / c;
        c >= a && 1 >= e ? (c = a, d = c * e) : d >= b && (d = b, c = d / e);
        return [c, d]
    }

    function R() {
        e.className = "";
        v.set(0);
        window_width = window.getSize().x - 40;
        window_height = window.getSize().y - 100;
        if (0 < c.autoSize) {
            var a = S(window_width, window_height, d.width, d.height),
                b = a[0] + "px " + a[1] + "px";
            d.width = a[0];
            d.height = a[1];
            m.setStyles({
                backgroundImage: "url(" + s + ")",
                display: "",
                "background-size": b
            })
        } else m.setStyles({
            backgroundImage: "url(" + s + ")",
            display: ""
        });
        B.setStyle("width", d.width);
        $$(B, w, x).setStyle("height", d.height);
        M.set("html", f[l][1] || "");
        N.set("html", (1 < f.length && c.counterText || "").replace(/{x}/, l + 1).replace(/{y}/, f.length));
        0 <= q && (O.src = f[q][0]);
        0 <= r && (P.src = f[r][0]);
        g = m.offsetWidth;
        h = m.offsetHeight;
        var u = Math.max(0, C - h / 2),
            a = 0,
            u = u - 30;
        e.offsetHeight != h && (a = t.start({
            height: h,
            top: u
        }));
        e.offsetWidth != g && (a = t.start({
            width: g,
            marginLeft: -g / 2
        }));
        b = function() {
            p.setStyles({
                width: g,
                top: u + h,
                marginLeft: -g / 2,
                visibility: "hidden",
                display: ""
            });
            v.start(1)
        };
        a ? t.chain(b) : b()
    }

    function T() {
        0 <= q && (w.style.display = "");
        0 <= r && (x.style.display = "");
        D.set(-E.offsetHeight).start(0);
        p.style.visibility = ""
    }

    function L() {
        d.onload = null;
        d.src = O.src = P.src = s;
        t.cancel();
        v.cancel();
        D.cancel();
        $$(w, x, m, p).setStyle("display", "none")
    }

    function z() {
        0 <= l && (L(), l = q = r = -1, e.style.display = "none", F.cancel().chain(H).start(0));
        return !1
    }
    var n = window,
        I = Browser.ie6,
        c, f, l = -1,
        s, q, r, G, C, g, h, d = {},
        O = new Image,
        P = new Image,
        k, e, m, B, w, x, p, E, M, N, F, t, v, D, U = document.id;
    n.addEvent("domready", function() {
        U(document.body).adopt($$(k = new Element("div#lbOverlay", {
            events: {
                click: z
            }
        }), e = new Element("div#lbCenter"), p = new Element("div#lbBottomContainer")).setStyle("display", "none"));
        m = (new Element("div#lbImage")).inject(e).adopt(B = (new Element("div", {
            styles: {
                position: "relative"
            }
        })).adopt(w =
            new Element("a#lbPrevLink[href=#]", {
                events: {
                    click: K
                }
            }), x = new Element("a#lbNextLink[href=#]", {
            events: {
                click: J
            }
        })));
        E = (new Element("div#lbBottom")).inject(p).adopt(new Element("a#lbCloseLink[href=#]", {
            events: {
                click: z
            }
        }), M = new Element("div#lbCaption"), N = new Element("div#lbNumber"), new Element("div", {
            styles: {
                clear: "both"
            }
        }))
    });
    Element.implement({
        slimbox: function(a, b) {
            $$(this).slimbox(a, b);
            return this
        }
    });
    Elements.implement({
        slimbox: function(a, b, c) {
            b = b || function(a) {
                    return [a.href, a.title]
                };
            c = c || function() {
                    return !0
                };
            var d = this;
            d.removeEvents("click").addEvent("click", function() {
                var e = d.filter(c, this);
                return Slimbox.open(e.map(b), e.indexOf(this), a)
            });
            return d
        }
    });
    return {
        open: function(a, b, d) {
            c = Object.append({
                loop: !1,
                overlayOpacity: 0.8,
                overlayFadeDuration: 400,
                resizeDuration: 400,
                resizeTransition: !1,
                initialWidth: 250,
                initialHeight: 250,
                imageFadeDuration: 400,
                captionAnimationDuration: 400,
                counterText: "Image {x} of {y}",
                closeKeys: [27, 88, 67],
                previousKeys: [37, 80],
                nextKeys: [39, 78],
                autoSize: !1
            }, d || {});
            F = new Fx.Tween(k, {
                property: "opacity",
                duration: c.overlayFadeDuration
            });
            t = new Fx.Morph(e, Object.append({
                duration: c.resizeDuration,
                link: "chain"
            }, c.resizeTransition ? {
                    transition: c.resizeTransition
                } : {}));
            v = new Fx.Tween(m, {
                property: "opacity",
                duration: c.imageFadeDuration,
                onComplete: T
            });
            D = new Fx.Tween(E, {
                property: "margin-top",
                duration: c.captionAnimationDuration
            });
            "string" == typeof a && (a = [
                [a, b]
            ], b = 0);
            C = n.getScrollTop() + n.getHeight() / 2;
            g = c.initialWidth;
            h = c.initialHeight;
            e.setStyles({
                top: Math.max(0, C - h / 2),
                width: g,
                height: h,
                marginLeft: -g / 2,
                display: ""
            });
            if (G = I || k.currentStyle && "fixed" != k.currentStyle.position) k.style.position = "absolute";
            F.set(0).start(c.overlayOpacity);
            y();
            H(1);
            f = a;
            c.loop = c.loop && 1 < f.length;
            return A(b)
        }
    }
}();