/*********************************************************
 // Effect
 **********************************************************/
$Util.Message = {
    messageWindowID: "c_messageWindow",
    messagePlace: "c_messagePlace",
    messageLogID: "c_messageLog",
    messageLog: "",

    alert: function (message, log) {
        if (!$(this.messageWindowID)) this.init();
        $(this.messagePlace).innerHTML = "<img src=/admin/common/images/icon_alert.gif align=absmiddle> {0}".format(message);
        this.messageLog = log;
        this.show();
    },
    error: function (message, log) {
        if (!$(this.messageWindowID)) this.init();
        $(this.messagePlace).innerHTML = "<img src=/admin/common/images/icon_alert.gif align=absmiddle> {0}".format(message);
        this.messageLog = log;
        this.show();
    },
    info: function (message, log) {
        if (!$(this.messageWindowID)) this.init();
        $(this.messagePlace).innerHTML = "<img src=/admin/common/images/icon_info.gif align=absmiddle> {0}".format(message);
        this.messageLog = log;
        this.show();
    },
    show: function () {
        var tObj = $(this.messageWindowID);
        tObj.style.pixelLeft = (document.body.clientWidth - tObj.offsetWidth) / 2 + document.body.scrollLeft;
        tObj.style.pixelTop = (document.body.clientHeight - tObj.offsetHeight) / 2 + document.body.scrollTop;
        $(this.messageLogID).style.display = this.messageLog ? "" : "none";
        tObj.style.display = "";
    },
    showLog: function () {
        messageLogWindow = window.open("about:blank");
        messageLogWindow.document.write(this.messageLog);
        //alert(this.messageLog);
    },
    init: function () {
        var div = $T("div");
        div.id = this.messageWindowID;
        div.style.position = "absolute";
        div.style.zIndex = 1000;
        div.className = "shadow";
        div.onpropertychange = $Util.UI.showAlwaysOnTop;
        div.innerHTML = " \
			<table cellpadding='0' cellspacing='1' border='0' width='400' class=table_area> \
				<tr> \
					<td style='padding:5px' bgcolor=white> \
						<table class=title_type1_1_table> \
							<tr> \
								<td onmousedown=\"$Util.UI.dragLayer('{0}');\"> \
									<table cellspacing=0 cellpadding=0 border=0 width=100%> \
										<tr> \
											<td class=title_type1_1_bullet></td> \
											<td class=title_type1_1_title>Message</td> \
											<td class=title_type1_1_btn align=right style='padding-right:12px'> \
											<img src='/admin/common/images/icon_close.gif' class=btn onclick=\"$Util.UI.hideLayer($('{0}'));\"/> \
											</td> \
										</tr> \
									</table> \
								</td> \
							</tr> \
						</table> \
						<table cellpadding='0' cellspacing='0' border='0' width='100%'> \
							<tr><td style='height:6px'></td></tr> \
							<tr> \
								<td style='padding:0 3px' id='{1}' align=center height=30></td> \
							</tr> \
							<tr id='{2}'> \
								<td align=right><font style='font-family:arial;font-size:10px;cursor:hand' onclick='$Util.Message.showLog()'>log</font></td> \
							</tr> \
						</table> \
					</td> \
				</tr> \
			</table>".format(this.messageWindowID, this.messagePlace, this.messageLogID);
        document.body.appendChild(div);
    }
}