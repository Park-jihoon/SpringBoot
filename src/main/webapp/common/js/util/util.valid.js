$Util.Valid = {
    formValidCheck: function (targetForm, checkList, options) {
        var rules = {}, messages = {};
        for (var name in checkList) {
            var rule = checkList[name];
            var desc = "";
            rules[name] = {};
            messages[name] = {};
            for (var key in rule) {
                switch (key) {
                    case "desc" :
                        desc = rule[key];
                        break;
                    default :
                        rules[name][key] = rule[key];
                        if ($Config.FormMsg[key]) {
                            messages[name][key] = $Config.FormMsg[key].format(rule[key]);
                        }
                        break;
                }
            }
        }
        targetForm.validate($.extend(
            {rules: rules, messages: messages},
            options
        ));
    },
    calcAgeForSSN: function (element) {
        var ssn = $(element).text();
        ssn = ssn.replace(/-|\s/g, "");
        alert($(element).text());
        var lno = ssn.substr(0, 6);
        var rno = ssn.substr(6);
        var date = new Date();
        var cy = date.getYear();
        var cm = date.getMonth();
        var cd = date.getDate();

        var firstNo;
        var lastNo = lno.substring(0, 2);
        var gubunNo = rno.substring(0, 1);

        /**
         Case 0, 9: firstNo = "18"
         Case 1, 2, 5, 6: firstNo = "19"
         Case 3, 4, 7, 8: firstNo = "20"
         */
        if (gubunNo == "0" || gubunNo == "9") {
            firstNo = "18" + lastNo;
        } else if (gubunNo == "1" || gubunNo == "2" || gubunNo == "5" || gubunNo == "6") {
            firstNo = "19" + lastNo;
        } else if (gubunNo == "3" || gubunNo == "4" || gubunNo == "7" || gubunNo == "8") {
            firstNo = "20" + lastNo;
        }

        var by = Number(firstNo);

        var bdate = new Date(0, parseInt(lno.substr(2, 2)), parseInt(lno.substr(4, 2))); //출생 월일
        var cdate = new Date(0, cm, cd);
        (bdate < cdate) ? aged = cy - by : aged = cy - by - 1; //생일이 지나지 않으면 1을 뺀다

        $(element).append("&nbsp;&nbsp;&nbsp;(만&nbsp;" + aged + "&nbsp;세)");
        return element; //만나이를 반환한다
    },
    pi: function (src) {
        src = src.replace(/,/ig, "");
        var pInt = parseInt(src, 10);
        return isNaN(pInt) ? 0 : pInt;
    },
    em: function (src) {
        return pi(src.replace(/,/ig, "").replace("원", ""));
    },
    CheckElements: function () {
        for (var i = 0; i < arguments.length; i++) {
            if (!$Util.Valid.CheckElement(arguments[i][0], arguments[i][1])) return false;
        }
        return true;
    },
    CheckElement: function (element, elementValid) {
        var valids = elementValid.split(";");
        var name = "";
        for (var i = 0; i < valids.length; i++) {
            if (valids[i] == "") continue;
            var valid = valids[i].split("=");
            if (valid[0].trim().toLowerCase() == "name") {
                name = valid[1].trim().toLowerCase();
                break;
            }
        }
        for (var i = 0; i < valids.length; i++) {
            if (valids[i] == "") continue;
            var valid = valids[i].split("=");
            switch (valid[0].trim().toLowerCase()) {
                case "no-empty":
                    var msg = valid[1] ? valid[1] : $Config.FormMsg.Empty;
                    msg = msg.replace("@name", name);
                    if (!$Util.Valid.CheckBlank(element, msg, true)) return false;
                    break;
                case "char-set":
                    var msg = valid[2] ? valid[2] : $Config.FormMsg.Charset;
                    msg = msg.replace("@name", name);
                    switch (valid[1].trim().toLowerCase()) {
                        case "onlynum":
                            var regex = new RegExp("[^0-9]+");
                            if (!$Util.Valid.CheckString(element, msg, regex)) return false;
                            break;
                        case "numeric":
                            var regex = new RegExp("[^0-9-,]+");
                            if (!$Util.Valid.CheckString(element, msg, regex)) return false;
                            break;
                        case "number":
                            var regex = new RegExp("[^0-9-,.]+");
                            if (!$Util.Valid.CheckString(element, msg, regex)) return false;
                            break;
                        case "alphabet":
                            var regex = new RegExp("[^A-Za-z]+");
                            if (!$Util.Valid.CheckString(element, msg, regex)) return false;
                            break;
                        case "alpha-num":
                            var regex = new RegExp("[^A-Za-z0-9]+");
                            if (!$Util.Valid.CheckString(element, msg, regex)) return false;
                            break;
                    }
                    break;
                case "min":
                    var msg = valid[2] ? valid[2] : $Config.FormMsg.Min;
                    var len = parseInt(valid[1].trim());
                    msg = msg.replace("@length", len);
                    msg = msg.replace("@name", name);
                    if (!$Util.Valid.CheckLength(element, len, -1, msg, true)) return false;
                    break;
                case "max":
                    var msg = valid[2] ? valid[2] : $Config.FormMsg.Max;
                    var len = parseInt(valid[1].trim());
                    msg = msg.replace("@length", len);
                    msg = msg.replace("@name", name);
                    if (!$Util.Valid.CheckLength(element, -1, len, msg, true)) return false;
                    break;
                case "maxb":
                    var msg = valid[2] ? valid[2] : $Config.FormMsg.MaxB;
                    var len = parseInt(valid[1].trim());
                    msg = msg.replace("@length", len);
                    msg = msg.replace("@name", name);
                    if ($Util.Valid.GetByteLength($(element).val()) > len) {
                        alert(msg);
                        element.focus();
                        return false;
                    }
                    break;
            }
        }
        return true;
    },
    CheckString: function (obj, msg, regex) {
        if (regex.test(obj.val())) {
            alert(msg);
            obj.focus();
            return false;
        }
        return true;
    },
    CheckBlank: function (obj, msg, doFocus) {
        if (obj.val().replace(/ /ig, "") == "") {
            alert(msg);
            if (doFocus && obj.type != "hidden")
                obj.focus();
            return false;
        }
        return true;
    },
    CheckLength: function (obj, min, max, msg, doFocus) {
        var length = obj.val().length;
        if ((min > 0 && length < min) || (max > 0 && length > max)) {
            alert(msg);
            if (doFocus)
                obj.focus();
            return false;
        }
        return true;
    },
    GetByteLength: function (src) {
        var len = 0;
        for (var i = 0; i < src.length; i++) {
            len++;
            if ((src.charCodeAt(i) < 0) || (src.charCodeAt(i) > 127)) len++;
        }
        return len;
    }
};