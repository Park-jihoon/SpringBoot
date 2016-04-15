/**
 *  주민등록번호의 유효성을 체크한다.

 */
function isValidJuminNo(jumin1, jumin2, ssnType) {
    var ssnName = "외국인";
    if (ssnType == "A") {
        ssnName = "주민";
    }
    if (jumin1 == "" || jumin2 == "" || jumin1 == null || jumin2 == null || (jumin1 + jumin2).length != 13) {
        alert(ssnName + "등록번호를 적어주세요.");
        return false;
    }

    var yy = jumin1.substr(0, 2);        // 년도
    var mm = jumin1.substr(2, 2);        // 월
    var dd = jumin1.substr(4, 2);        // 일
    var genda = jumin2.substr(0, 1);        // 성별
    var msg, ss, cc;

    // 숫자가 아닌 것을 입력한 경우
    if (!isNumeric(jumin1)) {
        alert(ssnName + "등록번호 앞자리를 숫자로 입력하세요.");
        return false;
    }

    // 길이가 6이 아닌 경우
    if (jumin1.length != 6) {
        alert(ssnName + "등록번호 앞자리를 6자리로 입력하세요.");
        return false;
    }

    // 첫번째 자료에서 연월일(YYMMDD) 형식 중 기본 구성 검사
    if (yy < "00"
        || yy > "99"
        || mm < "01"
        || mm > "12"
        || dd < "01"
        || dd > "31") {
        alert(ssnName + "등록번호 앞자리를 연월일에 맞춰 입력하세요.");
        return false;
    }

    // 숫자가 아닌 것을 입력한 경우
    if (!isNumeric(jumin2)) {
        alert(ssnName + "등록번호 뒷자리를 숫자로 입력하세요.");
        return false;
    }

    // 길이가 7이 아닌 경우
    if (jumin2.length != 7) {
        alert(ssnName + "등록번호 뒷자리를 7자리로 입력하세요.");
        return false;
    }


    // 성별부분이 1 ~ 4 , 5 ~ 8 가 아닌 경우
    if (ssnType == "A" && (genda < "1" || genda > "4")) {
        alert(ssnName + "등록번호 뒷자리를 다시 입력하세요.");
        return false;
    } else if (ssnType == "B" && (genda < "5" || genda > "8")) {
        alert(ssnName + "등록번호 뒷자리를 다시 입력하세요.");
        return false;
    }

    // 연도 계산 - 1 또는 2: 1900년대, 3 또는 4: 2000년대
    cc = (genda == "1" || genda == "2" || genda == "5" || genda == "6") ? "19" : "20";
    // 첫번째 자료에서 연월일(YYMMDD) 형식 중 날짜 형식 검사

    // Check Digit 검사
    if (!isSSN(jumin1, jumin2, ssnType)) {
        alert("입력한 " + ssnName + "등록번호를 검토한 후, 다시 입력하세요.");
        return false;
    }
    return true;
}


function isNumeric(s) {
    for (i = 0; i < s.length; i++) {
        c = s.substr(i, 1);
        if (c < "0" || c > "9") return false;
    }
    return true;
}


function isSSN(s1, s2, ssnType) {
    n = 2;
    sum = 0;
    for (i = 0; i < s1.length; i++)
        sum += parseInt(s1.substr(i, 1)) * n++;
    for (i = 0; i < s2.length - 1; i++) {
        sum += parseInt(s2.substr(i, 1)) * n++;
        if (n == 10) n = 2;
    }
    if (ssnType == "A")
        c = 11 - sum % 11;
    if (c == 11) c = 1;
    if (c == 10) c = 0;
    else if (ssnType == "B")
        c = ((((11 - (sum % 11)) % 10 + 2) % 10));
    if (c != parseInt(s2.substr(6, 1))) return false;
    else return true;
}
