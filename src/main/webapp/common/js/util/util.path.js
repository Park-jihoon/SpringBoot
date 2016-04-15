/*********************************************************
 // Path 관련 유틸리티
 **********************************************************/
$Util.Path = {
    path: function (url) {
        var ln = url.indexOf("?");
        return (ln != -1) ? url.substring(0, ln) : url;
    },
    pathOnly: function (url) {
        url = this.path(url);
        var ln = url.lastIndexOf("/", ln);
        return (ln != -1) ? url.substring(0, ln + 1) : url;
    },
    fileName: function (url) {
        url = this.path(url);
        var ln = url.lastIndexOf("/");
        return (ln != -1) ? url.substring(ln + 1) : url;
    },
    extension: function (url) {
        url = this.fileName(url);
        var ln = url.lastIndexOf(".");
        return (ln != -1) ? url.substring(ln + 1) : url;
    },
    fileNameOnly: function (url) {
        url = this.fileName(url);
        var ln = url.lastIndexOf(".");
        return (ln != -1) ? url.substring(0, ln) : url;
    },
    host: function (url) {
        var ln = url.indexOf("http://") > -1 ? 7 : 0;
        return url.substring(ln, url.indexOf("/", ln));
    },
    queryString: function (url, name) {
        var n = url.indexOf("?");
        var qStr = (n != -1) ? url.substring(n + 1) : "";
        if (!name) {
            return qStr;
        } else {
            var qVal = "";
            var pars = qStr.split("&");
            for (var i = 0; i < pars.length; i++) {
                var nameVal = pars[i].split("=");
                if (nameVal[0] == name) {
                    qVal = nameVal[1];
                    break;
                }
            }
            return qVal;
        }
    },
    test: function (url) {
        alert(
            "url=" + url + "\r\r" +
            "host=" + this.host(url) + "\r" +
            "path=" + this.path(url) + "\r" +
            "pathOnly=" + this.pathOnly(url) + "\r" +
            "fileName=" + this.fileName(url) + "\r" +
            "extension=" + this.extension(url) + "\r" +
            "fileNameOnly=" + this.fileNameOnly(url) + "\r" +
            "queryString=" + this.queryString(url) + "\r"
        );
    }
}