var goldGallerySlimBoxParms = {
        overlayOpacity: 0.4,
        resizeDuration: 200,
        overlayFadeDuration: 200
    },
    pagerAlbumsRendered = !1,
    gpgTrDaInt = !1,
    goldGalleryDebug = !0,
    goldGalleryDebug = !1,
    goldPicasaDo = "",
    goldpicasaAlbumsArray = [],
    goldpicasaSSL = "",
    goldpicasaAlbumlistPart = !1;
window.onload = function() {
    window.jQuery && jQuery.noConflict()
};
var goldPicasaEntityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;"
};

function goldPicasaEscapeHtml(a) {
    return String(a).replace(/[&<>"'\/]/g, function(a) {
        return goldPicasaEntityMap[a]
    })
}

function addParameterToURL(a, c, b) {
    c = c + "=" + escape(b);
    b = "&";
    if (0 > a.indexOf("?")) b = "?";
    else {
        var d = a.slice(-1);
        "&" == d && (b = "");
        "?" == d && (b = "")
    }
    return a + (b + c)
}

function goldPicasaInject(a) {
    var c = document.getElementsByTagName("head")[0],
        b = document.createElement("script");
    b.type = "text/javascript";
    b.src = a;
    c.appendChild(b)
}

function setSlimBoxParms(a) {
    goldpicasaAlbumsArray[a] && (goldpicasa = goldpicasaAlbumsArray[a]);
    goldGallerySlimBoxParms.overlayOpacity = goldpicasa.slimboxOverlayopacity;
    goldGallerySlimBoxParms.overlayFadeDuration = goldpicasa.slimboxOverlayFadeDuration;
    goldGallerySlimBoxParms.resizeDuration = goldpicasa.slimboxResizeDuration;
    goldGallerySlimBoxParms.captionAnimationDuration = goldpicasa.slimboxCaptionAnimationDuration;
    goldGallerySlimBoxParms.imageFadeDuration = goldpicasa.slimboxImageFadeDuration;
    goldGallerySlimBoxParms.autoSize =
        goldpicasa.autoSize;
    goldGallerySlimBoxParms.counterText = COM_GOLDPICASA_IMAGE_1_OF_10;
    goldGalleryDebug && console.log(goldGallerySlimBoxParms)
}

function goldGalleryGetAlbums(a) {
    var c = document.id,
        b = {};
    a && 0 < a && (goldpicasa.startIndex = a);
    a = "";
    a = "http" + goldpicasaSSL + "://picasaweb.google.com/data/feed/api/user/" + goldpicasa.userId + "?category=album&alt=json&callback=goldGalleryAlbumsList&access=public";
    a += "&thumbsize=" + goldpicasa.albumsThumbnailSize + goldpicasa.albumsCroped + "&max-results=" + goldpicasa.albumsMaxResults + "&start-index=" + goldpicasa.startIndex;
    goldGalleryDebug && (b.url = a, b.goldpicasa = goldpicasa, console.log(b));
    c("goldGallerySpinner").setStyle("display",
        "block");
    goldPicasaInject(a)
}

function goldGalleryAlbumsList(a) {
    var c = document.id;
    goldGalleryDebug && console.log(a);
    c("goldGalleryMainDiv").innerHTML = "";
    goldpicasa.totalResult = a.feed.openSearch$totalResults.$t;
    c("goldGallerySpinner").setStyle("display", "none");
    goldpicasa.welcomeTitle[1] && (c("goldGalleryMainDiv").innerHTML += '<h3 class="goldGalleryh3Title">' + goldpicasa.welcomeTitle + "</h3>");
    var b = "";
    "0" === goldpicasa.borderAlbumsType && (b += "border:0;");
    "1" === goldpicasa.borderAlbumsType && (b += "border:1px solid " + goldpicasa.borderAlbumsColor +
        ";padding:0;");
    "1" < goldpicasa.borderAlbumsType && (b += "border:1px solid " + goldpicasa.borderAlbumsColor + ";padding:" + 2 * goldpicasa.borderAlbumsType + "px;");
    goldpicasa.borderAlbumsBackgroundColor && (b += "background-color:" + goldpicasa.borderAlbumsBackgroundColor + ";");
    goldGalleryDebug && (photolisttmp = a);
    var d = "width:" + (goldpicasa.albumsThumbnailSize + 2 + 4 * goldpicasa.borderAlbumsType) + "px;height:" + (goldpicasa.albumsThumbnailSize + ("1" == goldpicasa.showAlbumNameAlbumList ? 38 : 2)) + "px;",
        d = d + ("margin-right:" + goldpicasa.borderAlbumsThumbnailMargin +
            "px;margin-bottom:" + goldpicasa.borderAlbumsThumbnailMargin + "px;");
    goldGalleryDebug && console.log("DIVWIDTH: " + d);
    if (!a.feed.entry) return goldGalleryDebug && console.log("NO ENTRY " + goldpicasa.totalResult), !1;
    var g = "";
    "u" != goldpicasa.albumsCroped && (g = ' width="' + goldpicasa.albumsThumbnailSize + '" height="' + goldpicasa.albumsThumbnailSize + '" ');
    var e = 0;
    "1" < goldpicasa.borderAlbumsType && (e = 2 * goldpicasa.borderAlbumsType);
    a.feed.entry.each(function(a, l) {
        if (0 == a.gphoto$numphotos.$t) return null;
        if (a.gphoto$albumType &&
            "ScrapBook" == a.gphoto$albumType.$t && 0 == goldpicasa.showScrapBook) return goldpicasa.totalResult--, null;
        var h = a.title.$t,
            f = a.media$group.media$thumbnail[0].url,
            p = a.gphoto$numphotos.$t,
            m = a.id.$t.indexOf("albumid/") + 8,
            q = a.id.$t.indexOf("?"),
            m = a.id.$t.slice(m, q),
            q = addParameterToURL(location.href, "album", m),
            m = "";
        "1" == goldpicasa.showAlbumNameAlbumList && (m = h);
        var k = "goldGalleryImgContainer",
            h = "goldGalleryAlbumTitle";
        "box" === goldpicasa.theme && (k = "ggdfigure cap-bot", h = "ggdfigcaption", d = "width:" + goldpicasa.albumsThumbnailSize +
            ";", d += "margin-right:" + goldpicasa.borderAlbumsThumbnailMargin + "px;margin-bottom:" + goldpicasa.borderAlbumsThumbnailMargin + "px;");
        k = "" + ('<div class="' + k + '" style="' + d + '" title="' + goldPicasaEscapeHtml(a.title.$t) + '" >');
        k += '<a href="' + q + '">';
        "clasic" === goldpicasa.theme && goldpicasa.showAlbumFilesNumber && (k += '<span class="photoCount" style="margin-left:' + (8 + e) + "px;margin-top:" + (8 + e) + 'px;">' + p + "</span>");
        k += '<img src="' + f + '" alt="Loading..." class="gpgImgTheme' + goldpicasa.theme + '" style="' + b + '" ' + g + " >";
        f = "";
        "box" === goldpicasa.theme ? (m = "" + ('<span class="ggdAlbumtitle">' + m + "</span>"), 1 < a.summary.$t.length && (m += '<span class="ggdSummary">' + a.summary.$t + "</span>"), f = f + '<div class="ggdAlbumFoot">' + ('<div class="ggdCountBottom" title="' + p + " " + goldPicasaEscapeHtml(COM_GOLDPICASA_IMAGES) + '">' + p + "</div>"), f += "</div>") : k += "</a>";
        k = k + ('<span class="' + h + '">' + m + "</span>") + f;
        "box" === goldpicasa.theme && (k += "</a>");
        k += "</div>";
        c("goldGalleryMainDiv").innerHTML += k
    });
    !1 == pagerAlbumsRendered && renderAlbumsPager();
    setTimeout("goldPicasaCheckDo()",
        2E3)
}

function renderAlbumsPager() {
    var a = document.id;
    pagerAlbumsRendered = !0;
    var c = "",
        b = Math.ceil(goldpicasa.totalResult / goldpicasa.albumsMaxResults);
    if (1 == b) return !1;
    a("goldGalleryPager").innerHTML = '<br style="clear:both;">';
    var d = 1,
        d = 1,
        g = c = "";
    1 == goldpicasa.customPager && (g = " goldcustom");
    for (var e = 1; e <= b; e++) 1 == e ? (d = 1, c = " style='color:red' ") : (c = "", d = goldpicasa.albumsMaxResults * (e - 1), d++), d = "goldGalleryGetAlbums(" + d + "); $$('#goldGalleryPager input').setStyle('color', ''); this.setStyle('color', 'red'); myFx.toElement('goldGalleryMainDiv');", c =
        '<input type="button" value="' + e + ' " onclick="' + d + '" class="button' + g + '"  ' + c + " /> ", a("goldGalleryPager").innerHTML += c
}

function goldGalleryGetAlbumImages(a, c) {
    var b = document.id;
    goldpicasaAlbumsArray[c] && (goldpicasa = goldpicasaAlbumsArray[c]);
    setSlimBoxParms(c);
    var d = {};
    a && 0 < a && (goldpicasa.startIndex = a);
    url = "http" + goldpicasaSSL + "://picasaweb.google.com/data/feed/base/user/" + goldpicasa.userId + "/albumid/" + goldpicasa.albumId + "?category=photo&alt=json&callback=goldGalleryViewPhotoList&thumbsize=" + goldpicasa.thumbnailSize + goldpicasa.croped + "&imgmax=" + goldpicasa.imgmax;
    url += "&max-results=" + goldpicasa.maxResults;
    url += "&start-index=" +
        goldpicasa.startIndex;
    goldGalleryDebug && (d.url = url, d.goldpicasa = goldpicasa, console.log(d));
    b("goldGallerySpinner" + c).setStyle("display", "block");
    goldPicasaInject(url)
}

function goldGalleryViewPhotoList(a) {
    var c = document.id;
    goldGalleryDebug && console.log(a);
    var b = a.feed.id.$t.substr(a.feed.id.$t.lastIndexOf("/") + 1);
    goldpicasaAlbumsArray[b] && (goldpicasa = goldpicasaAlbumsArray[b]);
    var d = "goldGalleryMainDiv" + b;
    if (!goldPicasaCzekCwa(d, b)) return !1;
    goldGalleryDebug && console.log(d);
    c(d).innerHTML = "";
    c("goldGallerySpinner" + b).setStyle("display", "none");
    var g = a.feed.title.$t;
    goldpicasa.totalResult = a.feed.openSearch$totalResults.$t;
    2 < goldpicasa.customAlbumName.length && 1 == goldpicasa.showAlbumName ?
        c(d).innerHTML += '<h3 class="goldGalleryh3Title">' + goldpicasa.customAlbumName + "</h3>" : 1 == goldpicasa.showAlbumName && (c(d).innerHTML += '<h3 class="goldGalleryh3Title">' + a.feed.title.$t + "</h3>");
    if (0 == goldpicasa.totalResult) return c(d).innerHTML += "<p>Total images: 0</p>", !1;
    1 == goldpicasa.showSummary && (c(d).innerHTML += '<p style="margin-bottom:3px;margin-top:3px;">' + a.feed.subtitle.$t + "</p>");
    var e = "";
    "0" === goldpicasa.borderType && (e += "border:0;");
    "1" === goldpicasa.borderType && (e += "border:1px solid " + goldpicasa.borderColor +
        ";padding:0;");
    "1" < goldpicasa.borderType && (e += "border:1px solid " + goldpicasa.borderColor + ";padding:" + 2 * goldpicasa.borderType + "px;");
    goldpicasa.borderBackgroundColor && (e += "background-color:" + goldpicasa.borderBackgroundColor + ";");
    "0" < goldpicasa.borderType && (e += "margin-right:" + goldpicasa.marginRight * goldpicasa.borderType + "px;", e += "margin-bottom:" + goldpicasa.marginBottom * goldpicasa.borderType + "px;");
    goldGalleryDebug && (photolisttmp = a);
    var n = goldpicasa.thumbnailSize;
    "u" == goldpicasa.croped && (n = "");
    goldGalleryDebug &&
    (console.log("window.history.length = " + window.history.length), console.log("goldpicasaAlbumlistPart = " + goldpicasaAlbumlistPart), console.log("goldpicasa.showBackButton = " + goldpicasa.showBackButton));
    if (goldpicasa.showBackButton && !0 == goldpicasaAlbumlistPart && 1 < window.history.length) {
        var l = goldpicasa.thumbnailSize / 4;
        73 > goldpicasa.thumbnailSize && (l = 2);
        var h = "display:inline-block;width:" + (goldpicasa.thumbnailSize + 1) + "px;text-align:center;";
        "0" < goldpicasa.borderType ? (h += "margin-right:" + goldpicasa.marginRight *
                goldpicasa.borderType + "px;", h += "margin-bottom:" + goldpicasa.marginBottom * goldpicasa.borderType + "px;", h += "padding:" + 2 * goldpicasa.borderType + "px;") : (h += "margin-right:" + (goldpicasa.marginRight - 1) + "px;", h += "margin-bottom:" + goldpicasa.marginBottom + "px;");
        c(d).adopt((new Element("a", {
            onclick: "window.history.back();return false;",
            "class": "goldpicasaBackLink",
            title: COM_GOLDPICASA_JPREVIOUS,
            style: h
        })).adopt(new Element("img", {
            src: "/components/com_goldpicasa/assets/img/back-icon-1.png",
            "class": "goldpicasaBackButton",
            alt: "back",
            style: "cursor: pointer;margin-top:" + l + "px;vertical-align: top;background-color:transparent;"
        })))
    }
    var f = "",
        l = "" + (".goldPicasaThumbA { margin-right:" + goldpicasa.marginRight + "px; margin-bottom:" + goldpicasa.marginBottom + "px; }"),
        f = f + ("<style>" + l + "</style>");
    a.feed.entry.each(function(a, b) {
        var c = a.title.$t;
        if (2 == goldpicasa.slimboxImageTitle) c = "";
        else if (3 == goldpicasa.slimboxImageTitle) {
            var d = c.split(".").pop().toLowerCase();
            if ("jpg" == d || "png" == d || "gif" == d || "jpeg" == d) c = ""
        }
        var d = a.media$group.media$content[0].url,
            g = a.media$group.media$thumbnail[0].url,
            h = a.media$group.media$title.$t,
            l = a.media$group.media$description.$t;
        f += '<div class="goldPicasaThumbA" title="' + goldPicasaEscapeHtml(c) + '">';
        f += '<a href="' + d + '" target="_blank" class="lightbox" rel="goldPicasaModal[gold]" oldfile="' + h + '" title="' + goldPicasaEscapeHtml(c) + '">';
        f += '<img src="' + g + '" alt="" width="' + n + '" height="' + n + '" style="' + e + '" />';
        if (1 < c.length || 1 < l.length) f += '<div class="ggdfigcaptionPhotos"><div class="ggdSummary">' + c + "</div></div>";
        f += "</a>";
        f += "</div>"
    });
    f += '<br style="clear: both;">';
    c(d).innerHTML += f;
    if ("modal" == goldpicasa.displayMethod) {
        var p = "";
        "show" == goldpicasa.slimboxAlbumname && (p = "Album: <u>" + g + "</u>&nbsp; ");
        16 == goldpicasa.jversion ? $$("#" + d + " a").filter(function(a) {
                return a.href && a.firstChild && a.firstChild.src
            }).slimbox(goldGallerySlimBoxParms, function(a) {
                return [a.href, (a.title ? a.title + "<br>" : "") + p + " " + ("current" == goldpicasa.slimboxImageLink || "orginal" == goldpicasa.slimboxImageLink ? 'File:  <a href="' + ("orginal" == goldpicasa.slimboxImageLink ?
                        a.href.replace("s" + goldpicasa.imgmax, "d") : a.href) + '" target="_blank">' + a.getAttribute("oldfile") + "</a>" : "")]
            }) : 15 == goldpicasa.jversion && $$($$("#" + d + " a").filter(function(a) {
                return a.rel && a.rel.test(/^goldPicasaModal/i)
            })).slimbox(goldGallerySlimBoxParms, null, function(a) {
                return this == a || 8 < this.rel.length && this.rel == a.rel
            })
    }
    renderPager(b);
    setTimeout("goldPicasaCheckDo()", 2E3)
}

function renderPager(a) {
    var c = document.id;
    if (1 > goldpicasa.showPager) return goldGalleryDebug && console.log("Skipping pager"), !1;
    if (10 < c("goldGalleryPager" + a).innerHTML.replace(/^\s+|\s+$/g, "").length) return !1;
    goldpicasaAlbumsArray[a] && (goldpicasa = goldpicasaAlbumsArray[a]);
    var b = "",
        d = Math.ceil(goldpicasa.totalResult / goldpicasa.maxResults);
    if (1 == d) return !1;
    c("goldGalleryPager" + a).innerHTML = "";
    var g = 1,
        g = 1,
        e = b = "";
    1 == goldpicasa.customPager && (e = " goldcustom");
    for (i = 1; i <= d; i++) 1 == i ? (g = 1, b = " style='color:red' ") :
        (b = "", g = goldpicasa.maxResults * (i - 1), g++), g = "goldGalleryGetAlbumImages(" + g + ", '" + a + "'); $$('#goldGalleryPager" + a + " input').setStyle('color', ''); this.setStyle('color', 'red'); myFx.toElement('goldGallerySpinner" + a + "');", b = '<input type="button" value="' + i + ' " onclick="' + g + '" class="button' + e + '"  ' + b + " /> ", c("goldGalleryPager" + a).innerHTML += b
}

function goldPicasaCzekCwa(a, c) {
    return gpgTrDaInt && new Date > gpgTrDaInt ? (document.getElementById("goldGallerySpinner" + c).style.display = "none", el = Element("div", {
            id: "tr" + a.toString()
        }), el.set("html", goldPicasaGetDec("R29sZCBQaWNhc2EgR2FsbGVyeSAtIHRyaWFsIHZlcnNpb24gZXhwaXJlZA==")), el.inject($(a), "top"), !1) : !0
}
var tmp77 = !1;

function goldPicasaShowAlbumInfoView(a) {
    goldGalleryDebug && (console.log(a), tmp77 = a);
    var c = a.entry.summary.$t;
    $("com_goldpicasa_universal_form_name_name").value = a.entry.title.$t;
    var b, d = a.entry.link[1].href;
    b = '<table border="0" width="99%" style="float: left;"><tr><td valign="top" width="160px">';
    b += '<a href="' + d + '" target="_blank"><img src="' + a.entry.media$group.media$thumbnail[0].url + '" alt="Loading..." /></a>';
    b += "</td>";
    b += '<td valign="top">';
    b += '<p style="font-size:1.3em;">' + COM_GOLDPICASA_ALBUM_NAME +
        ': <a href="' + d + '" target="_blank">' + a.entry.title.$t + "</a>";
    b += "<br /><br />" + COM_GOLDPICASA_USER + ': <a href="' + a.entry.author[0].uri.$t + '" target="_blank">' + a.entry.gphoto$nickname.$t + "</a>";
    b += "</p>";
    b += '<p style="font-size:1.2em;">';
    b += capitaliseFirstLetter(COM_GOLDPICASA_IMAGES) + ": <b>" + a.entry.gphoto$numphotos.$t + "</b>";
    b += "<br />";
    b += COM_GOLDPICASA_PUBLISHED + ": <b>" + a.entry.published.$t.slice(0, 10) + "</b>";
    b += "<br />";
    b += COM_GOLDPICASA_UPDATED + ": <b>" + a.entry.updated.$t.slice(0, 10) + "</b>";
    c[1] &&
    (b += "<br />Summary: <b>", b += c, b += "</b>");
    b += "</p>";
    b += "</td>";
    b += "</tr>";
    b += "</table>";
    $("goldPisacsaAlbumInfo").innerHTML += b
}

function capitaliseFirstLetter(a) {
    return a.charAt(0).toUpperCase() + a.slice(1)
}

function goldPicasaGetDo() {
    return window.location.hostname.replace(/([a-zA-Z0-9]+.)/, "")
}

function goldPicasaDoStr() {
    var a = "",
        a = "x | ",
        c = goldPicasaGetDec(goldPicasaDo);
    return a = '<div style="background:red;color:#FFFFFF;padding: 2px 4px;display:block;font-size:0.9em;font-weight:bold;"><span onclick="this.parentNode.style.display=\'none\'">' + a + "</span>" + goldPicasaGetDec("R29sZCBQaWNhc2EgR2FsbGVyeSBXQVJOSU5HOiBUaGUgcHJvcGVyIGRvbWFpbiBpczog") + ' <a style="color:#ccc;" href="http://' + c + '">' + c + "</a></div>"
}
function goldPicasaCheckDo(){if(!1==goldPicasaCheckDoPoszlo)return!1;goldPicasaCheckDoPoszlo=!0;}

function getDomain(a) {
    if (null == a || 0 == a.length) return !1;
    a = a.toLowerCase();
    var c = a.indexOf("/"); - 1 < c && (a = a.substring(0, c));
    var c = a.split("."),
        b = c.length;
    if (3 > b) return a;
    a = c[b - 1];
    var d;
    d = c[b - 2];
    goldGalleryDebug && (console.log(c), console.log("len: " + b), console.log("lastPart: " + a), console.log("secondPart: " + d));
    return 0 <= b ? c.splice(b - 2, 2).join(".") : !1
}
var Gpgstringcheck = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    stringcheck: function(a) {
        var c = "",
            b, d, g, e, n, l = 0;
        for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); l < a.length;) b = Gpgstringcheck._keyStr.indexOf(a.charAt(l++)), d = Gpgstringcheck._keyStr.indexOf(a.charAt(l++)), e = Gpgstringcheck._keyStr.indexOf(a.charAt(l++)), n = Gpgstringcheck._keyStr.indexOf(a.charAt(l++)), b = b << 2 | d >> 4, d = (d & 15) << 4 | e >> 2, g = (e & 3) << 6 | n, c += String.fromCharCode(b), 64 != e && (c += String.fromCharCode(d)), 64 != n && (c +=
            String.fromCharCode(g));
        return c = Gpgstringcheck._utf8_stringcheck(c)
    },
    _utf8_stringcheck: function(a) {
        for (var c = "", b = 0, d = c1 = c2 = 0; b < a.length;) d = a.charCodeAt(b), 128 > d ? (c += String.fromCharCode(d), b++) : 191 < d && 224 > d ? (c2 = a.charCodeAt(b + 1), c += String.fromCharCode((d & 31) << 6 | c2 & 63), b += 2) : (c2 = a.charCodeAt(b + 1), c3 = a.charCodeAt(b + 2), c += String.fromCharCode((d & 15) << 12 | (c2 & 63) << 6 | c3 & 63), b += 3);
        return c
    }
};

function goldPicasaGetDec(a) {
    return Gpgstringcheck.stringcheck(a)
};
goldGalleryDebug = false;
goldPicasaDo = 'c3VubGlmZS1mbS5jb20=';
goldPicasaWe = '3.3.4';
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
