function doPostNumSeachHidden() {
    $("#postNum_keyword").val("");
    $("#postNumList > tbody").children().remove();
    $("<tr><td colspan='2'>검색어를 입력하세요.</td></tr>").appendTo("#postNumList > tbody");
    $("#postNumSearch_wrap").hide();
    return;
};
function doPostNumSearch() {
    if ($("#postNum_keyword").val() == "") {
        alert("검색어를 입력하세요");
        $("#postNum_keyword").focus();
        return false;
    }
    $("#postNumList > tbody").children().remove();
    $.post(
        "/com/ajax/COM_Post.do",
        {"postNum_keyword": $("#postNum_keyword").val()},
        function (data, status) {
            if (data.length == 0) {
                $("<tr><td colspan='2'>등록된 주소가 없습니다.</td></tr>").appendTo("#postNumList > tbody");
                return;
            }
            for (var i = 0; i < data.length; i++) {
                $("<tr><td>{1}-{2}</td><td class='a_link_name al'><a href='#afterPostNumSearch'>{0}</a></td></tr>".format(
                    data[i].address, data[i].zipcode.substring(0, 3), data[i].zipcode.substring(3, 6)
                )).appendTo("#postNumList > tbody");
            }
            $("#postNumList > tbody  td.a_link_name").click(function () {
                var address = $(this).text().replace(/\d+[~\-]\d+$/, "");
                var post = $(this).prev().text();
                //address = address.replace(/\d+[~\-]\d+$/,"");
                post_on_click(address, post);
                doPostNumSeachHidden();
            });

        },
        "json"
    );
};
//var post_on_click=function (address1,post){alert("default :"+address1);};

function showSearchPostNo(callback, postion) {
    if (typeof(centerAddr) == "undefined") centerAddr = null;
    var wrap = $("#postNumSearch_wrap");
    if (wrap.size() == 0) {
        wrap = $("<div id=\"postNumSearch_wrap\"></div>").appendTo("body");
        wrap.load("/layer/postSearch.do", function () {
            var addrList = centerAddr != null ? centerAddr.split(" ") : [];
            var keyword = addrList.length >= 2 ? addrList[2].endsWith("구") ? addrList[3] : addrList[2] : null;
            if (keyword != null) {
                $("#postNum_keyword").val(keyword).focusin(function () {
                    $("#postNum_keyword").val("");
                });
                doPostNumSearch();
            }
            if (callback) {
                post_on_click = callback;
            }
            $("#postNum_keyword").keydown(function (e) {
                if (e.keyCode == 13) {
                    doPostNumSearch();
                }
            });
        }).show();
    } else {
        var addrList = centerAddr != null ? centerAddr.split(" ") : [];
        var keyword = addrList.length >= 2 ? addrList[2].endsWith("구") ? addrList[3] : addrList[2] : null;
        if (keyword != null) {
            $("#postNum_keyword").val(keyword).focusin(function () {
                $("#postNum_keyword").val("");
            });
            doPostNumSearch();
        }
        wrap.show();
    }
    wrap.position(postion).draggable({handle: $("#postNumSearch_wrap")});
    ;

}
