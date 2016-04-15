/*********************************************************
 // UI 관련 유틸리티
 **********************************************************/
$Util.UI = {
    formatNumber: function (num, emptyMsg, floatDigit) {
        var isMinus = false;
        num = num + "";
        if (num.substring(0, 1) == "-") {
            isMinus = true;
            num = num.substring(1);
        }
        if (num == "") return emptyMsg;
        if (num.indexOf(".") > -1 && num.split(".")[1].length > floatDigit) {
            num = num.split(".")[0] + "." + num.split(".")[1].substr(0, floatDigit);
        }
        if (isNaN(parseInt(num))) return "NaN";
        var tmpNumStr = new String(num);
        // See if we need to put in the commas
        if (num >= 1000 || num <= -1000) {
            var iStart = tmpNumStr.indexOf(".");
            if (iStart < 0)
                iStart = tmpNumStr.length;
            iStart -= 3;
            while (iStart >= 1) {
                tmpNumStr = tmpNumStr.substring(0, iStart) + "," + tmpNumStr.substring(iStart, tmpNumStr.length)
                iStart -= 3;
            }
        }
        if (isMinus) tmpNumStr = "-" + tmpNumStr;
        return tmpNumStr;
    },
    toFormatNumber: function () {
        var sObj = event.srcElement;
        var sValue = sObj.value.trim().replace(/,/ig, "");
        if (isNaN(sValue) || sValue == "") sValue = 0;
        sObj.value = $Util.UI.formatNumber(parseInt(sValue, 10));
    },
    showCalendar: function (element, format) {
        $(element).datepicker({
            dateFormat: format || "yy-mm-dd",
            changeMonth: true,
            changeYear: true,
            locale: "ko",
            showMonthAfterYear: true,
            monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
            dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
            dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"]
        }).attr("readonly", "readonly");
    },
    popup: function (url, width, height, popName) {
        return window.open(
            url,
            popName,
            "toolbar=no,scrollbar=no,width={0},height={1}".format(width, height)
        );
    },
    popup2: function (url, width, height, popName, addProps) {
        return window.open(
            url,
            popName,
            "toolbar=no,scrollbars=yes,width={0},height={1}{2}".format(width, height, addProps ? addProps : "")
        );
    },
    formatFile: function (fileName, fileSize) {
        var fileTemplate = "<input type='hidden' name='fileName' value='#fileName#'/><input type='hidden' name='fileSize' value='#fileSize#'/>" +
            "<img src='/adm/images/icon_x.gif' style='cursor:pointer' onclick=\"$(this).up('div').remove();\" align='absmiddle'> " +
            "<a href='/ccbs/popup/CCB_FileDownload.do?fileName=#fileName#'>#fileName#</a> (#fileSizeStr#)";
        var div = $($T("div")).addClassName("uploadedFile").update(fileTemplate
                .replace(new RegExp("#fileName#", "ig"), fileName)
                .replace(new RegExp("#fileSize#", "ig"), fileSize)
                .replace(new RegExp("#fileSizeStr#", "ig"), $Util.UI.formatFileSize(fileSize))
        );
        return div;
    },
    formatFileSize: function (fileSize) {
        if (fileSize < 1024) return "{0}byte".format(fileSize);
        fileSize = fileSize / 1024;
        if (fileSize < 1024) return "{0}KB".format($Util.UI.formatNumber(fileSize, "", 1));
        fileSize = fileSize / 1024;
        if (fileSize < 1024) return "{0}MB".format($Util.UI.formatNumber(fileSize, "", 1));
    },
    showAt: function (element, x, y) {
        $(element).setStyle({left: x + 'px', top: y + 'px'});
        $(element).show();
    },
    showAtElement: function (element, position, srcElement) {
        var sObj = srcElement ? srcElement : event.srcElement;
        var pos = sObj.cumulativeOffset();
        var tObj = $(element);
        var addPos = [0, 0];
        if (position) {
            switch (position) {
                case "left-top" :
                    addPos[0] = sObj.wWidth();
                    break;
                case "left-bottom" :
                    addPos[0] = sObj.width();
                    addPos[1] = tObj.height() * -1 + sObj.height();
                    break;
                case "right-top" :
                    addPos[0] = tObj.width() * -1;
                    break;
                case "right-bottom" :
                    addPos[0] = tObj.width() * -1;
                    addPos[1] = tObj.height() * -1 + sObj.height();
                    break;
                case "center" :
                    addPos[0] = (sObj.width() - tObj.width()) / 2;
                    addPos[1] = (sObj.height() - tObj.height()) / 2;
                    break;
                case "center-top" :
                    addPos[0] = (sObj.getWidth() - tObj.width()) / 2;
                    addPos[1] = sObj.getHeight();
                    break;
                case "screen-center" :
                    var body = $$("body")[0];
                    pos = [0, 0];
                    addPos[0] = (body.getWidth() - tObj.getWidth()) / 2 + document.documentElement.scrollLeft;
                    addPos[1] = (body.clientHeight - tObj.getHeight()) / 2 + document.documentElement.scrollTop;
                    break;
            }
        }
        $Util.UI.showAt(element, pos[0] + addPos[0], pos[1] + addPos[1]);
    },
    showTooltip: function (element) {
        var sObj = $(element);
        var tooltipDiv = $("#util_TooltipDiv");
        if (tooltipDiv.size() == 0) {
            tooltipDiv = $($T("div"))
                .attr("id", "util_TooltipDiv")
                .css({
                    "position": "absolute",
                    "zIndex": "9999",
                    "left": "0px",
                    "top": "0px",
                    "border": "1px solid #888888",
                    "font-weight": "bold",
                    "backgroundColor": "#f2f2f2",
                    "padding": "3px 5px 3px 5px"
                });
            $("body").append(tooltipDiv);
        }
        tooltipDiv.html(sObj.attr("caption")).show();
        tooltipDiv.position({of: sObj, my: "left top", at: "right top"});
    },
    hideTooltip: function () {
        $("#util_TooltipDiv").hide();
    },
    resizeString: function (text, len) {
        if (text.length <= len) return text;
        return "<a title=\"{0}\">{1}...</a>".format(text, text.substring(0, len));
    },
    resizeImage: function (img, maxW, maxH) {
        var imgW = img.width;
        var imgH = img.height;
        var g = new Array;
        var newW;
        var newH;

        if (imgW < maxW && imgH < maxH) { // 가로세로가 축소할 값보다 작을 경우
            newW = imgW;
            newH = imgH;
        } else {
            if (imgW > imgH) { // 원크기 가로가 세로보다 크면
                newW = maxW;
                newH = Math.ceil(imgH * maxW / imgW);
            } else if (imgW <= imgH) { //원크기의 세로가 가로보다 크면
                newW = Math.ceil(imgW * maxH / imgH);
                newH = maxH;
            } else {
                newW = maxW;
                newH = maxH;
            }
            if (newW > maxW) { // 구해진 가로값이 축소 가로보다 크면
                newW = maxW;
                newH = Math.ceil(imgH * maxW / imgW);
            }
            if (newH > maxH) { // 구해진 세로값이 축소 세로값가로보다 크면
                newW = Math.ceil(imgW * maxH / imgH);
                newH = maxH;
            }
        }

        if (imgW > maxW || imgH > maxH) {
            img.width = newW;
            img.height = newH;
        }
    },
    showAlwaysOnTop: function () {
        var ly = event.srcElement;

        var ly_left = ly.offsetLeft;
        var ly_top = ly.offsetTop;
        var ly_right = ly.offsetLeft + ly.offsetWidth;
        var ly_bottom = ly.offsetTop + ly.offsetHeight;

        var elements = document.body.getElementsByTagName("SELECT");
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            if (el.type == "select-one" && el.getAttribute("autoHide") != "no") {
                var el_left = el_top = 0;
                var obj = el;
                if (obj.offsetParent) {
                    while (obj.offsetParent) {
                        el_left += obj.offsetLeft;
                        el_top += obj.offsetTop;
                        obj = obj.offsetParent;
                    }
                }
                el_left += el.clientLeft;
                el_top += el.clientTop;
                el_right = el_left + el.clientWidth;
                el_bottom = el_top + el.clientHeight;

                if ((el_left >= ly_left && el_top >= ly_top && el_left <= ly_right && el_top <= ly_bottom) ||
                    (el_right >= ly_left && el_right <= ly_right && el_top >= ly_top && el_top <= ly_bottom) ||
                    (el_left >= ly_left && el_bottom >= ly_top && el_right <= ly_right && el_bottom <= ly_bottom) ||
                    (el_left >= ly_left && el_left <= ly_right && el_bottom >= ly_top && el_bottom <= ly_bottom)) {
                    el.style.visibility = "hidden";
                } else {
                    el.style.visibility = "";
                }
            }
        }
    },
    initTableList: function (tObj, startIndex) {
        for (var i = tObj.tBodies[0].childNodes.length; i > startIndex; i--) {
            tObj.tBodies[0].removeChild(tObj.tBodies[0].childNodes[i - 1]);
        }
    },
    showOverlay: function () {
        var body = $("body");
        var bWidth = body.width();
        var bHeight = body.height();
        var height = document.documentElement.scrollHeight > bHeight ? document.documentElement.scrollHeight : bHeight;
        var width = document.documentElement.scrollWidth > bWidth ? document.documentElement.scrollWidth : bWidth;
        $("#divOverlay").css({"width": width, "height": height});
        $("#divOverlay").fadeIn();
    },
    closeOverlay: function () {
        $("#divOverlay").fadeOut();
    },
    doPrint: function () {
        var printWin = window.open("about:blank", "printWindow");
        var header = "<html><head><style>td{font-size:11px}</style><link href='/ccb/css/default.css' rel='stylesheet' type='text/css'/><link href='/ccb/css/style.css' rel='stylesheet' type='text/css'/><link href='/ccb/css/ccb_text.css' rel='stylesheet' type='text/css'/></head><body>";
        var footer = "</body></html>";
        printWin.document.write(header + $("content").innerHTML + footer);
        printWin.document.close();
        $Util.UI.convertTagForPrint(printWin.document.body);
        printWin.focus();
        printWin.print();
        //printWin.close();
    },
    doAdminPrint: function () {
        var printWin = window.open("about:blank", "printWindow");
        var header = "<html><head><style>td{font-size:11px}</style><link href='/adm/css/style.css' rel='stylesheet' type='text/css'/><link href='/adm/css/text.css' rel='stylesheet' type='text/css'/></head><body>";
        var footer = "</body></html>";
        printWin.document.write(header + $("content").innerHTML + footer);
        printWin.document.close();
        $Util.UI.convertTagForPrint(printWin.document.body);
        printWin.focus();
        printWin.print();
        //printWin.close();
    },
    convertTagForPrint: function (bodyElement) {
        // input 태그
        $A(bodyElement.getElementsByTagName("input")).each(function (element) {
            if (element.type == "text") {
                element.outerHTML = "{0}&nbsp;".format(element.value);
            }
        });
        // textArea 태그
        $A(bodyElement.getElementsByTagName("textarea")).each(function (element) {
            $(element).up().innerHTML = "{0}&nbsp;".format(element.value.escapeTag());
        });
    },
    displayFile: function (fileName, fileSize) {
        var fileTemplate = "<a href='/ccbs/popup/CCB_FileDownload.do?fileName=#fileName#'>#fileName# (#fileSizeStr#)</a>";
        if (fileName.endsWith(".png") || fileName.endsWith(".gif") || fileName.endsWith(".jpg")) {
            fileTemplate += "&nbsp;<span class='btn' onclick=\"$Util.UI.previewImage('#fileName#')\"><b>[이미지보기]</b></span>";
        }
        var div = $($T("div")).addClassName("uploadedFile").update(fileTemplate
                .replace(new RegExp("#fileName#", "ig"), fileName)
                .replace(new RegExp("#fileSizeStr#", "ig"), $Util.UI.formatFileSize(fileSize))
        );
        return div;
    },
    previewImage: function (fileName) {
        $Util.UI.showOverlay();
        $("divOverlay").observe("click", $Util.UI.closePreview);
        var body = $$("body")[0];
        var div = $("divImagePreview");
        if (!div) {
            div = $($T("div")).setStyle({
                "zIndex": "1000",
                "position": "absolute",
                "padding": "10px",
                "border": "1px solid #888888",
                "backgroundColor": "#ffffff"
            })
            div.id = "divImagePreview";
            body.insert(div);
        }
        div.update("<img src='/ccbs/popup/CCB_FileDownload.do?fileName={0}'/>".format(
            fileName
        ));
        $Util.UI.showAtElement(div, "screen-center", body);
    },
    closePreview: function () {
        $Util.UI.closeOverlay();
        $("divImagePreview").hide();
    }
}
/**************************************************************************************/
/******************************* Generate HTML ****************************************/
/**************************************************************************************/
document.write("<div id='divOverlay' style='position:absolute;top:0px;left:0px;z-index:1000;width:0px;height:0px;background-color:#000;display:none;opacity:0.4;filter:alpha(opacity=40)' onpropertychange='$Util.UI.showAlwaysOnTop()'></div>");