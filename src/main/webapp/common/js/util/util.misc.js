/*********************************************************
 // 기타 유틸리티
 **********************************************************/
$Util.Misc = {
    randomValue: function () {
        var mydate = new Date;
        var myday = mydate.getDate();
        var mymonth = mydate.getMonth() + 1;
        var myyear = ((mydate.getYear() < 100) ? "19" : "") + mydate.getYear();
        var myyear = myyear.substring(2, 4);
        var myhour = mydate.getHours();
        var myminutes = mydate.getMinutes();
        var myseconds = mydate.getSeconds();

        if (myday < 10) myday = "0" + myday;
        if (mymonth < 10) mymonth = "0" + mymonth;
        if (myhour < 10) myhour = "0" + myhour;
        if (myminutes < 10) myminutes = "0" + myminutes;
        if (myseconds < 10) myseconds = "0" + myseconds;

        var datearray = new Array(mymonth, myday, myyear, myhour, myminutes, myseconds);
        var uniq = "";

        for (i = 0; i < datearray.length; i++) {
            for (z = 0; z < 2; z++) {
                var which = Math.round(Math.random() * 1);
                if (which == 0) {
                    x = String.fromCharCode(64 + (Math.round(Math.random() * 25) + 1));
                } else {
                    x = String.fromCharCode(47 + (Math.round(Math.random() * 9) + 1));
                }
                uniq += x;
            }
            uniq += datearray[i];
        }
        return uniq;
    }
}