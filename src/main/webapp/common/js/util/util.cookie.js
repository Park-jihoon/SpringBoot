/*********************************************************
 // Cookie 관련 유틸리티

 * $Util.Cookie.getCookie
 - 쿠키의 값을 반환한다.
 - Parameters
 - cookieName : 쿠키명

 - cookieDomain : 쿠키 도메인명
 Ex)
 $Util.Cookie.getCookie("m_id", "intranet");
 **********************************************************/
$Util.Cookie = {
    getServerCookie: function (cookieName, cookieDomain) {
        if (!cookieDomain) cookieDomain = $Config.CookieDomain;
        thisCookie = document.cookie.split("; ");
        for (var i = 0; i < thisCookie.length; i++) {
            var n = thisCookie[i].indexOf("=");
            if (cookieDomain == thisCookie[i].substring(0, n)) {
                subCookie = thisCookie[i].substring(n + 1).split("&");
                for (var j = 0; j < subCookie.length; j++) {
                    if (cookieName == subCookie[j].split("=")[0])
                        return unescape(decodeURI(subCookie[j].split("=")[1]));
                }
            }
        }
        return "";
    },
    getCookie: function (cookieName) {
        thisCookie = document.cookie.split("; ");
        for (var i = 0; i < thisCookie.length; i++) {
            var n = thisCookie[i].indexOf("=");
            if (cookieName == thisCookie[i].substring(0, n)) {
                return unescape(thisCookie[i].substring(n + 1));
            }
        }
        return "";
    },
    setCookie: function (cookieName, cookieValue, expires) {
        if (this.getCookie(cookieName) != "") this.delCookie(cookieName);
        document.cookie = "{0}={1};path=/".format(cookieName, escape(cookieValue)) + (expires == null ? "" : ";expires=" + expires.toGMTString());
    },
    delCookie: function (cookieName) {
        var expdate = new Date();
        expdate.setTime(expdate.getTime() - (1000 * 60 * 60 * 24 * 30 * 12 ));
        document.cookie = "{0}={1};path=/".format(cookieName, escape("")) + (expdate == null ? "" : ";expires=" + expdate.toGMTString());
    }
}