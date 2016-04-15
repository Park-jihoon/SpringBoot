/*********************************************************
 // 권한 체크
 **********************************************************/
$Util.Right = {
    doRightCheck: function () {
        try {
            var rights = $($Config.RightName) ? $($Config.RightName).value : "00000";
            var contents = document.body;
            for (var tag in $Config.RightCheckTag) {
                var elements = contents.getElementsByTagName(tag);
                for (var i = 0; i < elements.length; i++) {
                    for (var j = 0; j < $Config.RightSymbol.length; j++) {
                        $Util.Right.applyRightToElement(
                            elements[i],
                            rights.substring(j, j + 1),
                            $Config.RightSymbol[j]
                        )
                    }
                }
            }
        } catch (e) {
        }
    },
    applyRightToElement: function (element, right, flag) {
        if (element.getAttribute("checkRight") == flag && right == "1") {
            switch (element.tagName) {
                case "IMG" :
                    element.style.display = "";
                    break;
            }
        }
    },
    hasRight: function (flag) {
        var rights = $($Config.RightName).value;
        var hr = false;
        var count = 0;
        for (var j = 0; j < $Config.RightSymbol.length; j++) {
            if (rights.substring(j, j + 1) == "1" && $Config.RightSymbol[j] == flag) hr = true;
        }
        return hr;
    }
}