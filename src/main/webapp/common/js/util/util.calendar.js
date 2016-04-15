/*********************************************************
 // Calendar

 * $Util.Calendar.showCalendar
 - 현재 날짜의 Calendar를 레이어로 보여준다.
 - Parameters
 - inputName : 날짜 선택시에 날짜가 들어갈 element 이름
 - formatStyle : 날짜 선택시에 전달될 날짜 포맷(ex: yyyy-mm-dd)
 Ex)
 $Util.Calendar.showCalendar("nowDate", "yyyy.mm.dd");

 **********************************************************/
$Util.Calendar = {
    curDate: new Date(),
    dateArray: ["Sun", "Mon", "Thu", "Web", "Thr", "Fri", "Sat"],
    inputName: "",
    formatStyle: "",
    calendarLayerName: "c_calendarLayer",
    layerLeft: "",
    layerTop: "",
    layerRight: "",
    layerBottom: "",
    curMonthData: {},
    showCalendar: function (inputName, formatStyle) {
        this.inputName = inputName;
        this.formatStyle = !formatStyle ? "" : formatStyle;
        this.curDate = new Date();
        if (!$(this.calendarLayerName)) this.initCalendar();
        this.createCalendar();

        var tObj = $(this.calendarLayerName);
        if (tObj.style.display == "none") {
            var pe = event;
            tObj.style.left = pe.x - pe.offsetX;
            tObj.style.top = pe.y - pe.offsetY + pe.srcElement.height;
            //tObj.style.zIndex = parent.drg_nZIndexCount++;
            tObj.style.zIndex = 600;
            tObj.style.display = "";
            tObj.onmouseover = this.endCloseLayer;
            tObj.onmouseout = this.startCloseLayer;
            //$Util.UI.startCloseLayer(tObj.id);
        } else {
            tObj.onmouseover = null;
            tObj.onmouseout = null;
            tObj.style.display = "none";
        }
        //parent.document.onmouseup = this.captureClick;
    },
    captureClick: function () {
        var x = event.x;
        var y = event.y;
        //if(x < this.layerLeft || x > this.layerRight || y < this.layerTop || y > this.layerBottom) {
        //	$(this.calendarLayerName).style.display = "none";
        //	this.releaseClick();
        //}
        alert("x={0}, y={1}, left={2}, top={3}, right={4}, bottom={5}".format(
            x, y, Calendar.layerLeft, Calendar.layerTop, Calendar.layerRight, Calendar.layerBottom
        ));
        return true;
    },
    releaseClick: function () {
        document.onmouseup = null;
    },
    initCalendar: function () {
        // 레이어

        var div = $T("div");
        div.id = this.calendarLayerName;
        div.style.position = "absolute";
        div.style.width = "180";
        div.style.display = "none";
        var table = $T("table");
        table.id = "c_calendar_list";
        table.cellPadding = "0";
        table.cellSpacing = "1";
        table.width = "100%";
        table.className = "table_area";
        var tbody = $T("tbody");
        // 월 네비게이션 바

        var oTr = $T("tr");
        oTd = $T("td");
        oTable = $T("table");
        oTbody = $T("tbody");
        oTd.colSpan = "7";
        oTd.bgColor = "#ffffff";
        oTable.width = "100%";
        var nTr = $T("tr");
        nTr.align = "center";
        nTr.bgColor = "#ffffff";
        for (var i = 1; i <= 3; i++) eval("var nTd" + i + " = $T('td');");
        nTd1.innerHTML = "<img src=/_common/images/left_btn01.gif style='cursor:hand' onclick='$Util.Calendar.goPrevMonth()'>";
        nTd2.id = "c_calendarLabel";
        nTd2.innerText = this.curDate.format("yyyy.mm");
        nTd3.innerHTML = "<img src=/_common/images/right_btn01.gif style='cursor:hand' onclick='$Util.Calendar.goNextMonth()'>";
        for (var i = 1; i <= 3; i++) eval('nTr.appendChild(nTd' + i + ');');
        oTbody.appendChild(nTr);
        oTable.appendChild(oTbody);
        oTd.appendChild(oTable);
        oTr.appendChild(oTd);
        tbody.appendChild(oTr);
        // 요일바

        var tr = $T("tr");
        tr.height = "22";
        tr.bgColor = "#ededed";
        tr.align = "center";
        for (var i = 0; i < this.dateArray.length; i++) {
            var td = $T("td");
            td.innerHTML = "<span class=txt_gray_9px>" + this.dateArray[i] + "</span>";
            td.style.color = "#6E9CB4";
            td.style.fontSize = "9px";
            td.style.fontWeight = "bold";
            td.style.backgroundColor = "#EBF5F7";
            td.style.width = "22px";
            td.align = "center";
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
        table.appendChild(tbody);
        div.appendChild(table);
        //div.onmouseover = this.endCloseLayer;
        //div.onmouseout = this.startCloseLayer;
        document.body.appendChild(div);
    },
    startCloseLayer: function () {
        $Util.UI.startCloseLayer($Util.Calendar.calendarLayerName);
    },
    endCloseLayer: function () {
        $Util.UI.endCloseLayer($Util.Calendar.calendarLayerName);
    },

    createCalendar: function () {

        $("c_calendarLabel").innerHTML = "<span class=txt_orange_9px><b>" + this.curDate.format("yyyy.mm") + "</b></span>";

        var firstDate = new Date(this.curDate);
        firstDate.setDate(1);
        var weekDay = 0;
        var tr;
        var tObj = $("c_calendar_list");
        $Util.UI.initTableList(tObj, 2);
        while (firstDate.getMonth() == this.curDate.getMonth()) {
            if (weekDay == 0) {
                tr = $T("tr");
                tr.align = "center";
                tr.bgColor = "#ffffff";
                tr.height = "15";
                tr.vAlign = "top";
            }
            var td = $T("td");
            td.style.padding = "2px";
            if (firstDate.getDay() == weekDay) {
                td.innerHTML = "<span style=cursor:hand onclick=\"$Util.Calendar.setDate('{0} ({1})')\">{2}</span>".format(
                    firstDate.getDate().toString().paddingBefore("0", 2), this.dateArray[firstDate.getDay()], firstDate.getDate()
                );

                // 주말
                if (weekDay == 0 || weekDay == 6) {
                    td.style.color = "gray";
                    td.style.backgroundColor = "#EBF5F7";
                }

                // 오늘,
                if (firstDate.format("yyyymmdd") == new Date().format("yyyymmdd")) {
                    td.bgColor = "#CC6600";
                    td.style.color = "white";
                    td.style.fontWeight = "bold";
                }

                // 휴일(달력관리와 연동)
                if ($Util.Calendar.curMonthData[firstDate.format("yyyymmdd")] && $Util.Calendar.curMonthData[firstDate.format("yyyymmdd")][1] == "True") {
                    td.style.color = "gray";
                    td.style.backgroundColor = "#EBF5F7";
                    td.title = $Util.Calendar.curMonthData[firstDate.format("yyyymmdd")][0].replace(/<[b][r]>/ig, "\n");
                }

                firstDate.setDate(firstDate.getDate() + 1);
            }
            tr.appendChild(td);
            weekDay = ++weekDay % 7;
            if (weekDay == 0) {
                tObj.tBodies[0].appendChild(tr);
            }
        }
        if (weekDay != 0) {
            for (var i = weekDay; i < 7; i++) {
                var td = $T("td");
                tr.appendChild(td);
            }
            tObj.tBodies[0].appendChild(tr);
        }
    },
    setDate: function (day) {
        var tObj = $(this.inputName);
        var date = this.curDate.format("yyyy-mm-") + day;
        // 유저 커스텀 포매팅

        if (this.formatStyle != "") {
            date = $Util.Date.dateFormat(this.curDate.format("yyyymm") + day.substr(0, 2), this.formatStyle);
        }
        if (tObj.tagName == "INPUT") {
            tObj.value = date;
        } else {
            tObj.innerText = date;
        }
        this.releaseClick();
        $(this.calendarLayerName).onmouseover = null;
        $(this.calendarLayerName).onmouseout = null;
        $(this.calendarLayerName).style.display = "none";
    },
    goPrevMonth: function () {
        this.curDate.setMonth(this.curDate.getMonth() - 1);
        this.createCalendar();

    },
    goNextMonth: function () {
        this.curDate.setMonth(this.curDate.getMonth() + 1);
        this.createCalendar();
    }
}