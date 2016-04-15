$(function () {
    $.ajaxSetup({
        beforeSend: function (xhr) {
            xhr.setRequestHeader("AJAX", true);
        },
        error: function (xhr, status, err) {
            if (xhr.status == 401) {
                alert("인증에 실패 했습니다. 로그인 페이지로 이동합니다.");
                location.href = "/login/index.do?r=NOT";
            } else if (xhr.status == 403) {
                alert("세션이 만료가 되었습니다. 로그인 페이지로 이동합니다.");
                location.href = "/login/index.do?r=NOT";
            } else if (xhr.status == 200) {
                alert("클라이언트의 요청은 했으나 세션이 만료가 되었습니다. 로그인 페이지로 이동합니다.");
                location.href = "/login/index.do?r=NOT";
            }
        }
    });

});