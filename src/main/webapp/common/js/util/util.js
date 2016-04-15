/* String Prototype */
String.prototype.format = function () {
    var s = this != null ? this : "";
    for (var i = 0; i < arguments.length; i++) {
        var re = new RegExp("\\{" + i + "\\}", "ig");
        s = s.replace(re, arguments[i]);
    }
    return s;
};
String.prototype.escapeTag = function () {
    var s = this != null ? this : "";
    s = s.replace(/\'/ig, "&#039;");
    s = s.replace(/\"/ig, "&#34;");
    s = s.replace(/</ig, "&lt;");
    s = s.replace(/>/ig, "&gt;");
    s = s.replace(/\n/ig, "<br>");
    return s;
};
String.prototype.unEscapeTag = function () {
    var s = this != null ? this : "";
    s = s.replace(/&#039;/ig, "\'");
    s = s.replace(/&#34;/ig, "\"");
    s = s.replace(/&lt;/ig, "<");
    s = s.replace(/&gt;/ig, ">");
    s = s.replace(/<br>/ig, "\n");
    s = s.replace(/&nbsp;/ig, " ");
    s = s.replace(/&amp;/ig, "&");
    return s;
};
String.prototype.forInput = function () {
    var s = this != null ? this : "";
    s = s.replace(/&/ig, "&amp;");
    s = s.replace(/\'/ig, "&#039;");
    s = s.replace(/\"/ig, "&#34;");
    s = s.replace(/</ig, "&lt;");
    s = s.replace(/>/ig, "&gt;");
    return s;
};
String.prototype.paddingBefore = function (str, len) {
    var s = this != null ? this : "";
    var sLen = s.length;
    if (sLen >= len) return s;
    for (var i = 0; i < (len - sLen); i++) {
        s = str + s;
    }
    return s;
};
String.prototype.paddingAfter = function (str, len) {
    var s = this != null ? this : "";
    var sLen = s.length;
    if (sLen >= len) return s;
    for (var i = 0; i < (len - sLen); i++) {
        s = s + str;
    }
    return s;
};
String.prototype.trim = function () {
    var s = this != null ? this : "";
    var i = 0;
    // Left Trim
    while (s.charAt(i++) == " ");
    s = s.substring(i - 1);
    // Right Trim
    i = s.length;
    while (s.charAt(--i) == " ");
    s = s.substring(0, i + 1);
    return s;
};
String.prototype.resize = function (len) {
    var s = this != null ? this : "";
    if (s.length > len) s = s.substring(0, len) + "...";
    return s;
};
String.prototype.textBoxFormat = function () {
    var s = this != null ? this : "";
    s = s.replace(/\\'/ig, "\\\\");
    return s;
};
String.prototype.startsWith = function (compare) {
    var s = this != null ? this : "";
    //alert(s + "--" + compare + "==" + s.indexOf(compare));
    return s.indexOf(compare) == 0;
};
String.prototype.endsWith = function (compare) {
    var s = this != null ? this : "";
    return s.lastIndexOf(compare) == (s.length - compare.length);
};

/* Date Prototype */
Date.prototype.format = function (df) {
    var dateVal = new Object();
    var dateFormat = df;
    // yyyy, yy
    dateVal["yyyy"] = this.getFullYear().toString();
    dateVal["yy"] = dateVal["yyyy"].substring(2);
    // mm
    dateVal["mm"] = (this.getMonth() + 1).toString().paddingBefore("0", 2);
    // dd
    dateVal["dd"] = this.getDate().toString().paddingBefore("0", 2);
    // hh
    dateVal["hh"] = this.getHours().toString().paddingBefore("0", 2);
    // mi
    dateVal["mi"] = this.getMinutes().toString().paddingBefore("0", 2);
    // ss
    dateVal["ss"] = this.getSeconds().toString().paddingBefore("0", 2);

    for (var key in dateVal) {
        dateFormat = dateFormat.replace(key, dateVal[key]);
    }

    return dateFormat;
};

/* Element Accessor */
function $T(tagName) {
    return document.createElement(tagName);
}
function $S(name) {
    var elements = document.getElementsByName(name);
    return elements;
}
function $HR(flag) {
    return $Util.Right.hasRight(flag);
}

/* Utility Function */
var $Util = {};

$Util.loadScript = function () {
    for (var i = 0; i < arguments.length; i++)
        document.write("<script type='text/javascript' src='/common/js/util/{0}.js'></script>".format(arguments[i]));
};

// Load util sub script.
$Util.loadScript(
    "util.ui",
    "util.valid",
    "util.ajax",
    "util.misc",
    "util.date",
    "util.cookie",
    "util.fu",
    "util.sfu"
);

// 검색 버튼 클릭시
function doSearch(method) {
    if (event.srcElement.tagName == "INPUT") {
        if (event.keyCode != 13) {
            return true;
        } else {
            this.curpage = 1;
            method();
            return false;
        }
    } else {
        this.curpage = 1;
        method();
    }
    ;
}

/* jQuery Extention */
$.fn.outerHTML = function () {
    return $("<div/>").append($(this).clone()).html();
};
