/*********************************************************
 // Effect
 **********************************************************/
$Util.Effect = {
    dummyLayer: null,
    targetObj: null,
    moveTimes: 0,
    maxTimes: 3,
    moveRate: [0.2, 0.4, 0.8, 1],
    initPos: [],
    targetPos: [],


    /*******************************************
     * 레이어 Grow Effect Start
     **/
    showLayer: function (tObj) {
        this.dummyLayer = $("dummy_layer");
        this.targetObj = tObj;
        var d = this.dummyLayer;
        var t = this.targetObj;
        d.style.width = 0;
        d.style.height = 0;
        d.style.backgroundColor = "";
        this.moveTimes = 0;
        this.initPos = [event.x + document.body.scrollLeft, event.y + document.body.scrollTop];
        d.style.display = "";
        t.style.display = "";
        this.targetPos = [t.offsetWidth, t.offsetHeight, t.offsetLeft, t.offsetTop];
        t.style.display = "none";
        this.growLayer();
    },
    growLayer: function () {
        if (this.moveTimes++ == this.maxTimes) {
            this.completeGrowLayer();
            return;
        }
        var d = this.dummyLayer;
        var p = this.moveRate[this.moveTimes - 1];
        // 더미 레이어 사이즈 & 위치 변경
        d.style.width = this.targetPos[0] * p;
        d.style.height = this.targetPos[1] * p;
        d.style.left = this.initPos[0] + (this.targetPos[2] - this.initPos[0]) * p;
        d.style.top = this.initPos[1] + (this.targetPos[3] - this.initPos[1]) * p;
        setTimeout('$Util.Effect.growLayer()', 20);
    },
    completeGrowLayer: function () {
        this.dummyLayer.style.display = "none";
        this.targetObj.style.display = "";
    },
    /**
     * 레이어 Grow Effect End
     *******************************************/
    /*******************************************
     * 레이어 Shrink Effect Start
     **/
    hideLayer: function (tObj) {
        this.dummyLayer = $("dummy_layer");
        this.targetObj = tObj;
        var d = this.dummyLayer;
        var t = this.targetObj;
        d.style.width = 0;
        d.style.height = 0;
        d.style.backgroundColor = "";
        this.moveTimes = 0;
        this.initPos = [event.x + document.body.scrollLeft, event.y + document.body.scrollTop];
        d.style.display = "";
        t.style.display = "";
        this.targetPos = [t.offsetWidth, t.offsetHeight, t.offsetLeft, t.offsetTop];
        t.style.display = "none";
        this.shrinkLayer();
    },
    shrinkLayer: function () {
        if (this.moveTimes++ == this.maxTimes) {
            this.completeShrinkLayer();
            return;
        }
        var d = this.dummyLayer;
        var p = this.moveRate[this.maxTimes - this.moveTimes];
        // 더미 레이어 사이즈 & 위치 변경

        d.style.width = this.targetPos[0] * p;
        d.style.height = this.targetPos[1] * p;
        d.style.left = this.initPos[0] + (this.targetPos[2] - this.initPos[0]) * p;
        d.style.top = this.initPos[1] + (this.targetPos[3] - this.initPos[1]) * p;
        setTimeout('$Util.Effect.shrinkLayer()', 20);
    },
    completeShrinkLayer: function () {
        this.dummyLayer.style.display = "none";
    }
    /**
     * 레이어 Grow Effect End
     *******************************************/
}