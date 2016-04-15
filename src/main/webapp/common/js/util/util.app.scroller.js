if (!$Util.App) $Util.App = {};
$Util.App.Scroller = {
    placer: null,
    imageAreaID: "util_app_scroller_imageArea",
    prevDivID: "util_app_scroller_prevDiv",
    nextDivID: "util_app_scroller_nextDiv",
    width: 400,
    height: 100,
    imgIndex: 0,
    isMoving: false,

    init: function (placer, width, height) {
        this.placer = $(placer);
        if (width) this.width = width;
        if (height) this.height = height;
        // Create Scroller
        this.create();
        // Add click event
        var prevDivObj = $(this.prevDivID);
        var nextDivObj = $(this.nextDivID);
        prevDivObj.observe("click", function () {
            if ($Util.App.Scroller.imgIndex == 0 || $Util.App.Scroller.isMoving) return;
            var imgArea = $($Util.App.Scroller.imageAreaID);
            var images = imgArea.descendants();
            var amtX = parseFloat(images[$Util.App.Scroller.imgIndex - 1].getStyle("width")) + 10;
            Effect.MoveBy(imgArea, 0, amtX);
            $Util.App.Scroller.imgIndex--;
            $Util.App.Scroller.isMoving = true;
            setTimeout(function () {
                $Util.App.Scroller.isMoving = false;
            }, 1000);
        });
        nextDivObj.observe("click", function () {
            var imgArea = $($Util.App.Scroller.imageAreaID);
            var images = imgArea.descendants();
            if ($Util.App.Scroller.imgIndex == images.length - 1 || $Util.App.Scroller.isMoving) return;
            var amtX = parseFloat(images[$Util.App.Scroller.imgIndex].getStyle("width")) + 10;
            Effect.MoveBy(imgArea, 0, -amtX);
            $Util.App.Scroller.imgIndex++;
            $Util.App.Scroller.isMoving = true;
            setTimeout(function () {
                $Util.App.Scroller.isMoving = false;
            }, 1000);
        });
        // Add mouse over/out event
        //prevDivObj.observe("mouseover", function() { $(event.srcElement).setStyle({"background-color":"#34ABFA"}); })
        //prevDivObj.observe("mouseout", function() { $(event.srcElement).setStyle({"background-color":"#ffffff"}); })
        //nextDivObj.observe("mouseover", function() { $(event.srcElement).setStyle({"background-color":"#34ABFA"}); })
        //nextDivObj.observe("mouseout", function() { $(event.srcElement).setStyle({"background-color":"#ffffff"}); })
    },
    add: function (imgArray) {
        var imageArea = $(this.imageAreaID);
        imgArray.each(function (imgPath) {
            var img = $($T("img")).setStyle({"margin": "5px", "cursor": "pointer", "display": "inline"});
            img.src = imgPath;
            img.observe("load", function () {
                $Util.UI.resizeImage(event.srcElement, 120, $Util.App.Scroller.height - 10);
            });
            img.observe("click", function () {
                window.open(event.srcElement.src);
            });
            imageArea.appendChild(img);
        });
    },
    show: function () {
        this.placer.down().show();
    },
    create: function () {
        this.placer.innerHTML = "\
<table cellpadding=0 cellspacing=1 border=0' style='display:none'> \
	<tr bgcolor='#ffffff'> \
		<td style='text-align:center;cursor:pointer;' id='{1}'><a><img src='/img/template/case06/btn_prev_01.png' alt='prev' /></a></td> \
		<td><div style='position:relative;z-index:1100;width:{3};height:{4};overflow:hidden;' nowrap><div id='{0}' style='z-index:1000;text-align:left;'></div></div></td> \
		<td style='text-align:center;cursor:pointer;' id='{2}'><a><img src='/img/template/case06/btn_next_01.png' alt='next' /></a></td> \
	</td> \
</table>".format(this.imageAreaID, this.prevDivID, this.nextDivID, this.width, this.height);
    }
}