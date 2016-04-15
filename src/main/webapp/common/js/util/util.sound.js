/*********************************************************
 // 기타 유틸리티
 **********************************************************/
$Util.Sound = {
    urls: {},
    id: 0,

    play: function (url) {
        if ($("sound_{0}".format(this.urls[url]))) return;
        if (!this.urls[url]) this.urls[url] = this.id++;
        var bgsound = $T("bgsound");
        bgsound.id = "sound_{0}".format(this.urls[url]);
        bgsound.src = url;
        bgsound.loop = -1;
        bgsound.autostart = true;
        $$('body')[0].appendChild(bgsound);
    },
    stop: function (url) {
        if (this.urls[url] == null) return;
        $("sound_{0}".format(this.urls[url])).removeNode(true);
        this.urls[url] = null;
    }
}