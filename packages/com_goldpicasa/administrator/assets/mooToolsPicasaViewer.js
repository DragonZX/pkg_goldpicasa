var goldGalleryDebug = !0,
    goldGalleryDebug = !1,
    maxResult = 10,
    totalResult = 0,
    thumbsize = "48c",
    slimBoxParms = {
        overlayOpacity: 0.4,
        resizeDuration: 200,
        overlayFadeDuration: 200
    },
    picasaImgSizes = [32, 48, 64, 72, 94, 104, 110, 128, 144, 150, 160, 200, 220, 288, 320, 400, 512, 576, 640, 720, 800, 912, 1024, 1152, 1280, 1440, 1600],
    imagesListFeed, imagesListFeedCurrentId = 0,
    goldGallerySlimBoxParms = {
        overlayOpacity: 0.4,
        resizeDuration: 100,
        overlayFadeDuration: 100,
        autoSize: 1
    },
    goldpicasa = {
        maxResults: 20,
        startIndex: 1,
        thumbnailSize: 140,
        thumbnailSize: "144",
        croped: "c",
        imgmax: "1600",
        slimboxImageTitle: 1,
        showSummary: 1,
        slimboxImageTitle: 3
    };

function showNotFound() {
    if ("Checking..." == document.getElementById("goldnotfoundfullnameStatus").innerHTML) {
        var a = '<div id="system-message-container"><dl id="system-message"><dt class="error">Error</dt><dd class="error message"><ul><li>' + JLIB_HTML_NO_RECORDS_FOUND + "</li></ul></dd></dl></div>";
        document.getElementById("goldnotfoundfullnameStatus").innerHTML = a
    }
}

function goldPicasaInject(a) {
    var b = document.getElementsByTagName("head")[0],
        c = document.createElement("script");
    c.type = "text/javascript";
    c.src = a;
    b.appendChild(c)
}

function mooToolsPicasaCheck() {
    setTimeout("showNotFound()", 4E3);
    var a = document.getElementById("goldnotfoundname").value;
    1 < a.search("picasaweb.google.com") && (a = a.match(/([0-9]+)/), a = a[0]);
    1 < a.search("plus.google.com") && (a = a.match(/([0-9]+)/), a = a[0]);
    document.getElementById("goldnotfoundfullnameStatus").innerHTML = "Checking...";
    thumbsize = "160c";
    albumid = (new URI).getData("albumid");
    url = "http" + goldpicasaSSL + "://picasaweb.google.com/data/feed/base/user/" + a + "?category=album&alt=json&callback=viewAlbumListStart&access=public&thumbsize=" +
        thumbsize;
    url += "&max-results=20";
    goldPicasaInject(url);
    return !1
}

function getImages(a) {
    url = "http" + goldpicasaSSL + "://picasaweb.google.com/data/feed/base/user/" + goldpicasa.userId + "/albumid/" + goldpicasa.albumId + "?category=photo&alt=json&callback=viewImagesListStart&thumbsize=" + goldpicasa.thumbnailSize + goldpicasa.croped + "&imgmax=" + goldpicasa.imgmax;
    url += "&max-results=" + goldpicasa.maxResults;
    url += "&start-index=" + a;
    goldGalleryDebug && console.log("IMAGES: \n" + url);
    goldPicasaInject(url);
    return !1
}

function backToAlbums() {
    $("goldPicasaTabAlbums").setStyle("display", "block");
    $("goldPicasaTabImages").setStyle("display", "none");
    $("goldPicasaTabImagesPager").setStyle("display", "none");
    document.getElementById("goldPicasaTabImagesLimitBox").style.display = "none";
    return !1
}

function backToImages() {
    $("goldPicasaTabAlbums").setStyle("display", "none");
    $("goldPicasaTabImages").setStyle("display", "block");
    $("goldPicasaTabImagesPager").setStyle("display", "block");
    $("goldPicasaTabImagesImageinfo").setStyle("display", "none");
    $("goldPicasaTabImagesLimitBox").setStyle("display", "block");
    return !1
}

function showImageInfo(a) {
    $("gptii_imgSize").empty();
    imagesListFeedCurrentId = a;
    $("goldPicasaTabImages").setStyle("display", "none");
    $("goldPicasaTabImagesPager").setStyle("display", "none");
    $("goldPicasaTabImagesImageinfo").setStyle("display", "block");
    $("goldPicasaTabImagesLimitBox").setStyle("display", "none");
    goldGalleryDebug && console.log(imagesListFeed.entry[a]);
    $("goldPicasaTabImagesImageinfo");
    $("goldPicasaTabImagesImageinfoHeader").innerHTML = '<input type="button" value="back" class="goldpicasaBrowseButton" onclick="return backToImages()" style="font-size:1.6em;">';
    $("goldPicasaTabImagesImageinfo").getElement("h3").innerHTML = imagesListFeed.entry[a].title.$t;
    $("gptii_thumb").src = imagesListFeed.entry[a].media$group.media$thumbnail[0].url;
    var b;
    b = "" + ("Published: " + imagesListFeed.entry[a].published.$t.substr(0, 10) + " &nbsp;&nbsp;|&nbsp; ");
    b += "Updated: " + imagesListFeed.entry[a].updated.$t.substr(0, 10) + " &nbsp;&nbsp;|&nbsp; ";
    b += "Biggest size: <b>" + imagesListFeed.entry[a].media$group.media$content[0].height + "x" + imagesListFeed.entry[a].media$group.media$content[0].width +
        "</b> px ";
    b += ' &rarr; <a href="' + imagesListFeed.entry[a].media$group.media$content[0].url + '" target="_blank">Link</a/>';
    $("goldPicasaTabImagesImageinfo").getElement("p.gptii_dscr").innerHTML = b;
    for (i = 0; i < picasaImgSizes.length; i++) picasaImgSizes[i] <= imagesListFeed.entry[a].media$group.media$content[0].height && (new Element("option", {
        text: picasaImgSizes[i]
    })).inject($("gptii_imgSizeThumb"));
    $("gptii_imgSizeThumb").options[11].selected = 1;
    for (i = b = 0; i < picasaImgSizes.length; i++) picasaImgSizes[i] <= imagesListFeed.entry[a].media$group.media$content[0].height &&
    ((new Element("option", {
        text: picasaImgSizes[i]
    })).inject($("gptii_imgSize")), b = i);
    $("gptii_imgSize").options[b].selected = 1;
    generateHtmlImage();
    return !1
}

function generateHtmlImage() {
    (new Date).getTime();
    var a = $("gptii_imgSizeThumb").value,
        b = $("gptii_imgSize").value,
        c = imagesListFeed.entry[imagesListFeedCurrentId].media$group.media$content[0].url,
        d = imagesListFeed.entry[imagesListFeedCurrentId].media$group.media$thumbnail[0].url,
        e = c.split("/");
    e[e.length - 2] = "s" + a;
    c = e.join("/");
    e = d.split("/");
    e[e.length - 2] = "s" + b;
    d = e.join("/");
    b = a = "";
    !0 == $("gptii_targetBlank").checked && (b = ' target="_blank" ');
    e = "";
    0 < $("gptii_class").value.length && (e = ' class="' + $("gptii_class").value +
        '" ');
    var m = "";
    0 < $("gptii_rel").value.length && (m = ' rel="' + $("gptii_rel").value + '" ');
    "1" === $$("input[name=gptii_htmltype]:checked")[0].value ? (a = a + ('<a href="' + d + '" ' + b + "" + e + "" + m + ">") + ('<img src="' + c + '" >'), a += "</a>") : "2" === $$("input[name=gptii_htmltype]:checked")[0].value && (a += '<img src="' + d + '" >');
    $("gptii_textarea").value = a;
    $("gptii_preview").innerHTML = a;
    return !1
}

function viewImagesListStart(a) {
    $("goldPicasaTabImagesLimitBox").setStyle("display", "block");
    goldpicasa.totalResult = a.feed.openSearch$totalResults.$t;
    goldGalleryDebug && console.log(a);
    if (0 == goldpicasa.totalResult) return $("goldPicasaTabImages").innerHTML += "<p>Total images: 0</p>", !1;
    1 == goldpicasa.showSummary && ($("goldPicasaTabImages").innerHTML += '<p style="margin-bottom:3px;margin-top:3px;">' + a.feed.subtitle.$t + "</p>");
    goldGalleryDebug && (photolisttmp = a);
    imagesListFeed = a.feed;
    var b = "",
        c = "",
        c = c + '<input type="button" value="back" class="goldpicasaBrowseButton" onclick="return backToAlbums()" style="font-size:1.6em;">',
        c = c + ("&nbsp; <b>" + a.feed.title.$t + "</b> Photos: " + goldpicasa.totalResult),
        c = c + '<ul class="goldGalleryImagesUl">',
        d = 0;
    a.feed.entry.each(function(a, m) {
        var f = a.title.$t;
        if (2 == goldpicasa.slimboxImageTitle) f = "";
        else if (3 == goldpicasa.slimboxImageTitle) {
            var h = f.split(".").pop().toLowerCase();
            if ("jpg" == h || "png" == h || "gif" == h || "jpeg" == h) f = ""
        }
        var h = a.media$group.media$content[0].url,
            k = a.media$group.media$thumbnail[0].url,
            l = a.id.$t.indexOf("albumid/") + 8,
            g = a.id.$t.indexOf("?");
        a.id.$t.slice(l, g);
        b = "";
        b += '<div class="goldGalleryImgPanel">';
        b += '<input type="button" class="button" value="INFO" onclick="return showImageInfo(' + d + ' );">';
        b += " ";
        b += '<span class="hasTipGold" title="' + f + '">' + f + "</span>";
        b += "</div>";
        c += "<li>";
        c += '<a href="' + h + '" class="goldGalleryImgModal" target="_blank"><img src="' + k + '"></a>' + b + " ";
        c += "<br>";
        c += "</li>";
        d++
    });
    c += "</ul>";
    $("goldPicasaTabAlbums").setStyle("display", "none");
    $("goldPicasaTabImages").setStyle("display", "block");
    $("goldPicasaTabImagesPager").setStyle("display", "block");
    $("goldPicasaTabImages").innerHTML =
        c;
    renderImagesPager();
    for (d = 0; d < document.getElementById("goldGallerylimitBox").options.length; d++) document.getElementById("goldGallerylimitBox").options[d].value == goldpicasa.maxResults && (document.getElementById("goldGallerylimitBox").options[d].selected = !0);
    new Tips($$(".hasTipGold"), {
        maxTitleChars: 150,
        fixed: !1
    });
    $$(".goldGalleryImgModal").filter(function(a) {
        return a.href && a.firstChild && a.firstChild.src
    }).slimbox(goldGallerySlimBoxParms, function(a) {
        return [a.href, (a.title ? a.title + "<br>" : "") + " " + ("current" ==
        goldpicasa.slimboxImageLink || "orginal" == goldpicasa.slimboxImageLink ? 'File:  <a href="' + ("orginal" == goldpicasa.slimboxImageLink ? a.href.replace("s" + goldpicasa.imgmax, "d") : a.href) + '" target="_blank">' + a.getAttribute("oldfile") + "</a>" : "")]
    })
}

function viewAlbumListStart(a) {
    document.getElementById("goldnotfoundfullnameStatus").innerHTML = "";
    var b = a.feed.author[0].uri.$t,
        c = a.feed.author[0].name.$t;
    if (0 == a.feed.openSearch$totalResults.$t) return document.getElementById("photos").innerHTML = "<h3>User exist but 0 albums found</h3><h1>Add new photos to Picasa to finish configuration.</h1>", !1;
    document.getElementById("photos").innerHTML = "";
    $("navigate").adopt(new Element("a", {
        href: b,
        html: "View <u>" + c + "'s</u> gallery at Picasa",
        title: "View " + c + "'s gallery at Picasa",
        "class": "picasalink",
        target: "_blank"
    }));
    a.feed.entry.each(function(a) {
        var b = a.title.$t,
            c = a.media$group.media$thumbnail[0].url,
            f = a.id.$t.indexOf("albumid/") + 8,
            h = a.id.$t.indexOf("?"),
            f = a.id.$t.slice(f, h);
        (new URI).setData("albumid", f);
        f = a.published.$t;
        f = f.substr(8, 2) + "-" + f.substr(5, 2) + "-" + f.substr(0, 4);
        $("photos").adopt((new Element("div", {
            "class": "image-container"
        })).adopt((new Element("a", {
            href: a.link[1].href,
            target: "_blank"
        })).adopt(new Element("img", {
            src: c,
            alt: b
        }), new Element("p", {
            html: b + "<br />" +
            f,
            "class": "date"
        }))))
    });
    a = b.lastIndexOf("/");
    b = b.slice(a + 1);
    document.getElementById("goldnotfoundid").value = b;
    document.getElementById("goldnotfoundfullname").value = c;
    document.getElementById("tableFound").style.display = "inline";
    document.getElementById("fieldsetSearch").style.display = "none";
    document.getElementById("goldPicasaTabImagesLimitBox").style.display = "none"
}

function searchAgain() {
    document.getElementById("tableFound").style.display = "none";
    document.getElementById("fieldsetSearch").style.display = "inline";
    document.getElementById("navigate").innerHTML = "";
    document.getElementById("photos").innerHTML = ""
}

function viewAlbumsTable(a) {
    scroll(0, 0);
    tmpList = a;
    var b = a.feed.author[0].uri.$t;
    totalResult = a.feed.openSearch$totalResults.$t;
    var c;
    c = "" + ("<img src='" + a.feed.gphoto$thumbnail.$t + "' style='float: left; margin-right:5px;'  />");
    c += "<big><a href='" + b + "' target='_blank'   >" + a.feed.gphoto$nickname.$t + "</a><img style='margin:3px 0 -2px 5px;' src='components/com_goldpicasa/assets/img/picasa.png' /></big><br />";
    c += "<br />" + COM_GOLDPICASA_ALBUMS + " : " + totalResult + "<br />";
    b = a.feed.updated.$t.slice(0, 10);
    c += COM_GOLDPICASA_UPDATED + ": " + b.slice(2);
    $("goldPicasaInfoDivNewUser").innerHTML = c;
    $("goldPicasaMainTableTbody").innerHTML = "";
    $("goldGallerySpinner").setStyle("visibility", "hidden");
    var d = 0;
    if (!a.feed.entry) return $("goldPicasaInfoDivNewUser").innerHTML += "<h1>NO ENTRY</h1>", console.log("NO ENTRY"), !1;
    goldGalleryDebug && console.log(a);
    a.feed.entry.each(function(a) {
        var b = a.title.$t + " <small>(" + a.gphoto$numphotos.$t + " " + COM_GOLDPICASA_IMAGES + ")</small>",
            c = a.media$group.media$thumbnail[0].url,
            h = c.replace("s48",
                "s288"),
            k = a.id.$t.indexOf("albumid/") + 8,
            l = a.id.$t.indexOf("?"),
            g = a.id.$t.slice(k, l),
            k = a.published.$t.slice(0, 10),
            l = a.updated.$t.slice(0, 10);
        summary = a.summary.$t;
        trClass = d % 2;
        var p = a.gphoto$user.$t,
            q = a.gphoto$id.$t;
        onc = "return false";
        var n = trStyle = "",
            n = a.title.$t,
            n = n.replace(/'/g, ""),
            n = n.replace(/"/g, "");
        !0 == modaliframe && (onc = "if (window.parent) { window.parent.jSelectGold_com_goldpicasa_universal_form_name('" + g + "', '" + n + "', '" + p + "');}", trStyle = "cursor:pointer");
        g = "" + ('<tr class="row' + trClass + '"  style="' +
            trStyle + '" >');
        g += '<td class="center"><a href="' + a.link[1].href + '" target="_blank"  class="hasTip" title="' + COM_GOLDPICASA_SHOW_ON_PICASA + '" ><img src="components/com_goldpicasa/assets/img/picasa.png" alt="link" /></a></td>';
        g += '<td onclick="' + onc + '" class="goldPicasaNoPadding"><img width="50px" src="' + c + '" class="hasTip" title="' + ("<img src='" + h + "' alt='Loading...' />") + '" alt="Loading" class="hasTipGold"  /></td>';
        g += '<td class="center">' + ('<input type="button" value="' + COM_GOLDPICASA_BROWSE + '" onclick="goldpicasa.albumId=\'' +
            q + '\';getImages(1)" class="goldpicasaBrowseButton hasTip" style="padding:8px 4px;" title="' + COM_GOLDPICASA_BROWSE + " " + COM_GOLDPICASA_IMAGES + '">') + "</td>";
        g += '<td onclick="' + onc + '" class="date"><h3 style="margin: 3px 0;">' + b + "</h3>" + summary + "</td>";
        g += '<td onclick="' + onc + '" class="center">' + k + "</td>";
        g += '<td onclick="' + onc + '" class="center">' + l + "</td>";
        $("goldPicasaMainTableTbody").innerHTML += g + "</tr>";
        d++
    });
    JTooltips = new Tips($$(".hasTip"), {});
    renderPager();
    return !0
}
var renderPagerInput = 1;

function getAlbumList(a) {
    backToAlbums();
    renderPagerInput = a;
    goldpicasa.userId = goldGalleryUsername;
    var b = {};
    url = "http" + goldpicasaSSL + "://picasaweb.google.com/data/feed/api/user/" + goldGalleryUsername + "?category=album&alt=json&callback=viewAlbumsTable&access=public&thumbsize=" + thumbsize;
    url += "&max-results=" + maxResult;
    url += "&start-index=" + a;
    goldGalleryDebug && console.log("ALBUMS\n" + url);
    goldGalleryDebug && (b.url = url, console.log(b));
    $("goldGallerySpinner").setStyle("visibility", "visible");
    goldPicasaInject(url)
}

function renderImagesPager() {
    var a = "",
        b = Math.ceil(goldpicasa.totalResult / goldpicasa.maxResults);
    $("goldPicasaTabImagesPager").innerHTML = "";
    a = 1;
    if (1 == b) return !1;
    for (i = 1; i <= b; i++) 1 == i ? a = 1 : (a = goldpicasa.maxResults * (i - 1), a++), a = '<input type="button" value="' + i + ' " onclick="return getImages(' + a + ");this.style.color='red';\" id=\"renderPagerInput" + a + '" class="goldpicasaBrowseButton" /> ', $("goldPicasaTabImagesPager").innerHTML += a, (a = $("renderPagerInput" + renderPagerInput)) && a.setStyle("color", "red");
    return !1
}

function renderPager() {
    var a = "",
        b = Math.ceil(totalResult / maxResult);
    $("goldGalleryPager").innerHTML = "";
    for (i = a = 1; i <= b; i++) 1 == i ? a = 1 : (a = maxResult * (i - 1), a++), a = '<input type="button" value="' + i + ' " onclick="getAlbumList(' + a + ");this.style.color='red';\" id=\"renderPagerInput" + a + '" class="goldpicasaBrowseButton" /> ', $("goldGalleryPager").innerHTML += a, (a = $("renderPagerInput" + renderPagerInput)) && a.setStyle("color", "red")
}

function rememberToSaveAlbumselect() {
    window.parent.$("goldPisacsaSelectAlbumselectDiv") && (window.parent.$("goldPisacsaSelectAlbumselectDiv").innerHTML = '<h4 style="color:red;">' + COM_GOLDPICASA_REMEMBER_SAVE_CHANGES + "</h4>")
}

function viewSavedAlbumsAlbumselect() {
    var a = window.parent.$("com_goldpicasa_universal_form_name_id").value;
    if (4 > a.length) return !1;
    var a = JSON.decode(a),
        b = "";
    a.albums.each(function(a) {
        console.log(a);
        hParams = ' albumId="' + a.id + '" albumThumb="' + a.thumb + '" albumTitle="' + a.title + '" userId="' + a.userId + '" userName="' + a.userName + '" ';
        b += '<div class="albumselectBox" ' + hParams + ">";
        b += '<a class="title" title="' + a.userName + '" href="#">' + a.userName + "</a>";
        b += '<p class="title" title="' + a.title + '">' + a.title + "</p>";
        b += '<img src="' + a.thumb + '" />';
        b += '&nbsp;&nbsp;<div class="removeAlbum" onclick="removeAlbum(this)">' + JACTION_DELETE + "</div>";
        b += "</div>"
    });
    $("albumselectDrop").innerHTML += b
}

function getAlbumListAlbumselect(a) {
    renderPagerInput = a;
    goldpicasa.userId = goldGalleryUsername;
    maxResult = 20;
    thumbsize = "104c";
    var b = {};
    url = "http" + goldpicasaSSL + "://picasaweb.google.com/data/feed/api/user/" + goldGalleryUsername + "?category=album&alt=json&callback=viewAlbumsTableAlbumselect&access=public&thumbsize=" + thumbsize;
    url += "&max-results=" + maxResult;
    url += "&start-index=" + a;
    goldGalleryDebug && console.log("ALBUMS\n" + url);
    goldGalleryDebug && (b.url = url, console.log(b));
    $("goldGallerySpinner").setStyle("visibility",
        "visible");
    goldPicasaInject(url)
}

function viewAlbumsTableAlbumselect(a) {
    goldGalleryDebug && console.log("viewAlbumsTableAlbumselect");
    tmpList = a;
    var b = a.feed.author[0].name.$t;
    totalResult = a.feed.openSearch$totalResults.$t;
    var c = 0;
    if (!a.feed.entry) return $("albumselectAllAlbums").innerHTML += "<h1>NO ENTRY</h1>", console.log("NO ENTRY"), !1;
    goldGalleryDebug && console.log(a);
    var d = $("albumselectAllAlbums").innerHTML = "",
        e = "";
    a.feed.entry.each(function(a) {
        var f = a.gphoto$numphotos.$t,
            h = a.title.$t,
            k = a.media$group.media$thumbnail[0].url;
        k.replace("s48",
            "s288");
        var l = a.id.$t.indexOf("albumid/") + 8,
            g = a.id.$t.indexOf("?"),
            l = a.id.$t.slice(l, g);
        a.published.$t.slice(0, 10);
        a.updated.$t.slice(0, 10);
        e = ' albumId="' + l + '" albumThumb="' + k + '" albumTitle="' + h + '" userId="' + a.gphoto$user.$t + '" userName="' + b + '" ';
        d += '<div class="albumselectBox" ' + e + ">";
        d += '<a class="title" title="' + b + '" href="#">' + b + "</a>";
        d += '<p class="title" title="' + h + '">' + h + "</p>";
        d += '<img src="' + k + '" />';
        d += '<div class="filesCount" title="' + COM_GOLDPICASA_IMAGES + ": " + f + '">' + f + "</div>";
        d += '<div class="removeAlbum" onclick="removeAlbum(this)">' +
            JACTION_DELETE + "</div>";
        d += "</div>";
        c++
    });
    $("albumselectAllAlbums").innerHTML += d;
    $("goldGallerySpinner").setStyle("visibility", "hidden");
    renderPagerAlbumselect();
    makeDragable();
    return !0
}

function getAlbumsFromAlbumselect() {
    var a = {
        albums: []
    };
    $$("#albumselectDrop DIV.albumselectBox").each(function(b) {
        a.albums.push({
            title: b.getAttribute("albumTitle").replace(/'/g, " "),
            id: b.getAttribute("albumId"),
            thumb: b.getAttribute("albumThumb"),
            userId: b.getAttribute("userId"),
            userName: b.getAttribute("userName").replace(/'/g, " ")
        })
    });
    rememberToSaveAlbumselect();
    return JSON.encode(a)
}

function renderPagerAlbumselect() {
    var a = "",
        b = Math.ceil(totalResult / maxResult);
    $("albumselectPager").innerHTML = "";
    for (i = a = 1; i <= b; i++) 1 == i ? a = 1 : (a = maxResult * (i - 1), a++), a = '<input type="button" value="' + i + ' " onclick="getAlbumListAlbumselect(' + a + ");this.style.color='red';\" id=\"renderPagerInput" + a + '" class="goldpicasaBrowseButton" /> ', $("albumselectPager").innerHTML += a, (a = $("renderPagerInput" + renderPagerInput)) && a.setStyle("color", "red")
}

function removeAlbum(a) {
    a.getParent().destroy()
}

function makeDragable() {
    $$("#albumselectAllAlbums DIV").addEvent("mousedown", function(a) {
        a.stop();
        var b = this,
            c = b.clone().setStyles(b.getCoordinates()).setStyles({
                opacity: 0.7,
                position: "absolute"
            }).inject(document.body);
        (new Drag.Move(c, {
            droppables: $("albumselectDrop"),
            onDrop: function(a, c) {
                a.destroy();
                null != c && (b.clone().inject(c), c.highlight("#7389AE", "#FFF"));
                new Sortables($$("#albumselectDrop"), {
                    constrain: !0,
                    clone: !0
                })
            },
            onEnter: function(a, b) {
                b.tween("background-color", "#98B5C1")
            },
            onLeave: function(a,
                              b) {
                b.tween("background-color", "#FFF")
            },
            onCancel: function(a) {
                a.destroy()
            }
        })).start(a)
    });
    return !1
}

function test1() {
    console.log("test1");
    setTimeout("testTimeout()", 3E3);
    (new Request.JSONP({
        url: "http://picasaweb.google.com/data/feed/api/user/106090612468579067889_?category=album&alt=json&access=public&thumbsize=48u&max-results=10&start-index=1",
        onComplete: function(a) {
            console.log("onComplete");
            console.log(a)
        },
        onCancel: function(a) {
            console.log("onCancel")
        },
        onTimeout: function(a) {
            console.log("onTimeout")
        },
        onRequest: function(a) {
            console.log("onRequest")
        }
    })).send();
    console.log("END")
}

function test2(a) {
    console.log(a)
}

function testTimeout() {
    console.log("testTimeout")
}

function getHidden() {
    document.getElementById("goldGalleryMainDiv").innerHTML = "";
    var a = document.getElementById("hidden_url").value;
    console.log(a);
    var b = a.split("/");
    console.log(b);
    for (var c = !1, d = !1, e = 0; e < b.length; e++) !0 == c && (c = b[e]), "photos" == b[e] && (c = !0), !0 == d && (d = b[e]), "albums" == b[e] && (d = !0), console.log(b[e]);
    console.log("--------");
    console.log(c);
    console.log(d);
    b = d.lastIndexOf("?");
    0 < b && (d = d.substr(0, b));
    console.log(d);
    if (!isNumber(d)) return $("goldGalleryInfoDiv").innerHTML = "<h1>ALBUM NOT FOUND</h1>", !1;
    if (!isNumber(c)) return $("goldGalleryInfoDiv").innerHTML = "<h1>USER NOT FOUND</h1>", !1;
    if (!a[5]) return console.log("nic"), $("goldGalleryMainDiv").innerHTML = "Url?", !1;
    goldGalleryDebug && console.log(a);
    id = d;
    a = "";
    a = "http" + goldpicasaSSL + "://picasaweb.google.com/data/feed/base/user/" + c + "/albumid/" + id + "?category=photo&alt=json&callback=goldGalleryPhotoListCheck&thumbsize=" + thumbsize + "&imgmax=600";
    a += "&max-results=30&start-index=1";
    unlistedFound = !1;
    $("goldGalleryInfoDiv").innerHTML = "Checking...";
    setTimeout("showNotFoundUnlisted()",
        4E3);
    try {
        goldPicasaInject(a)
    } catch (m) {
        $("goldGalleryInfoDiv").innerHTML = "ERROR!!!!!!!!!!!!!!!!!!", console.log(m)
    }
}

function goldGalleryPhotoListCheck(a) {
    goldGalleryDebug && console.log(a);
    var b;
    b = "<h3>Success</h3>";
    b += "Total: " + a.feed.openSearch$totalResults.$t + "<br /><br />";
    $("goldGalleryInfoDiv").innerHTML = b;
    a.feed.entry.each(function(a, b) {
        var e = a.title.$t,
            m = a.media$group.media$content[0].url,
            f = a.media$group.media$thumbnail[0].url,
            h = a.media$group.media$title.$t,
            k = a.id.$t.indexOf("albumid/") + 8,
            l = a.id.$t.indexOf("?");
        a.id.$t.slice(k, l);
        $("goldGalleryMainDiv").adopt((new Element("a", {
            href: m,
            title: e,
            target: "_blank",
            "class": "lightbox",
            rel: "goldPicasaModal[gold]",
            oldfile: h
        })).adopt(new Element("img", {
            src: f,
            alt: "",
            style: "margin:0 5px 5px 0;border:1px solid #ccc;"
        })))
    });
    unlistedFound = !0
}

function isNumber(a) {
    return !isNaN(parseFloat(a)) && isFinite(a)
}
var unlistedFound = !1;

function showNotFoundUnlisted() {
    !1 == unlistedFound && ($("goldGalleryInfoDiv").innerHTML = '<h1 style="color:red;">NOT FOUND</h1>')
}

function capitaliseFirstLetter(a) {
    return a.charAt(0).toUpperCase() + a.slice(1)
};