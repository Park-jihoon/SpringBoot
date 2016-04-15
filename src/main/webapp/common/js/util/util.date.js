$Util.Date = {
    dateFormat: function (sDate, df, empty_msg) {
        if (sDate.trim() == "")
            return !empty_msg ? "N/A" : empty_msg;
        var dateVal = new Object();
        var dateFormat = df;
        var dateLen = sDate.length;
        // yyyy, yy
        if (dateLen >= 4) {
            dateVal["yyyy"] = sDate.substring(0, 4);
            dateVal["yy"] = sDate.substring(2, 4);
        }
        // mm
        if (dateLen >= 6) dateVal["mm"] = sDate.substring(4, 6);
        // dd
        if (dateLen >= 8) dateVal["dd"] = sDate.substring(6, 8);
        // hh
        if (dateLen >= 10) dateVal["hh"] = sDate.substring(8, 10);
        // mi
        if (dateLen >= 12) dateVal["mi"] = sDate.substring(10, 12);
        // ss
        if (dateLen >= 14) dateVal["ss"] = sDate.substring(12, 14);

        for (var key in dateVal) {
            dateFormat = dateFormat.replace(key, dateVal[key]);
        }

        return dateLen >= 4 ? dateFormat : "";
    },
    getDayCount: function (sDate) {
        var d = sDate;
        if (d.length > 8) d = d.substring(0, 8);
        var now = new Date();
        var tDate = new Date(this.dateFormat(d, "yyyy"), this.dateFormat(d, "mm") - 1, this.dateFormat(d, "dd"))
        return parseInt((now - tDate) / 86400 / 1000);
    }
}