$Util.SFU = {
    create: function (settings) {
        var uploader, prevFile, id, errFile;

        uploader = new plupload.Uploader($.extend({
            runtimes: "flash",
            url: "/com/FileUpload_e.do",
            max_file_size: '100mb',
            flash_swf_url: "/common/js/plupload/plupload.flash.swf",
            multipart: true
        }, settings, {
            container: $(settings.container).attr("id"),
            browse_button: $(settings.browse_button).attr("id")
        }));

        uploader.bind("Init", function (up, res) {
            if (typeof settings.defaultUploadText == "undefined") {
                settings.defaultUploadText = true;
            }
            if (typeof settings.display == "undefined") {
                settings.display = settings.container;
            }
            if (typeof settings.initValue != "undefined" && settings.initValue.name != "") {
                var file = settings.initValue;
                createUploadedText(file);
            }
        });

        uploader.init();

        uploader.bind("FilesAdded", function (up, files) {
            for (var i = 1; i < files.length; i++) {
                up.removeFile(files[i]);
            }
            var file = files[0];
            // 에러가 있는 파일인 경우 취소
            if (errFile == file) return;
            // 먼저 업로드한 내역이 있으면 삭제
            if (prevFile && $("#" + prevFile.id)) {
                $("#" + prevFile.id).remove();
            }
            $(settings.display).append(
                '<div id="' + file.id + '" class="plupload_file">' +
                '<div class=plupload_progress>' +
                '<div class=plupload_progress_container>' +
                '<div class=plupload_progress_bar></div>' +
                '</div>' +
                '</div>' +
                file.name + ' (' + plupload.formatSize(file.size) + ') <b></b>' +
                '</div>');
            prevFile = file;
            window.setTimeout(function () {
                up.start();
            }, 1000);
        });

        uploader.bind('FileUploaded', function (up, file, res) {
            file.path = res.response;
            if (settings.defaultUploadText) {
                createUploadedText(file);
            } else {
                $("#" + file.id).remove();
            }
            if (settings.onFileUploaded) settings.onFileUploaded(file, up);
        });

        uploader.bind("UploadProgress", function (up, file) {
            var fileID = "#" + file.id;
            if ($(fileID).find("b").size() > 0) {
                $(fileID).find("b").html(file.percent + "%");
                $(fileID).find(".plupload_progress_bar").css("width", file.percent + "px");
            }
        });

        uploader.bind('Error', function (up, err) {
            errFile = err.file;
            switch (err.code) {
                case plupload.INIT_ERROR :
                    if (!confirm("파일을 첨부하기 위해서는 'Adobe Flash Player'를 설치해야 합니다.\r\r설치 하시겠습니까?")) {
                        window.open("http://get.adobe.com/kr/flashplayer/");
                    }
                    break;
                case plupload.FILE_SIZE_ERROR :
                    alert("업로드 용량이 초과되었습니다.");
                    break;
                case plupload.FILE_EXTENSION_ERROR :
                    alert("허용되지 않는 확장자입니다.");
                    break;
            }
        });

        function createUploadedText(file) {
            var html = "<img src='/common/images/icon_x.gif' align='absmiddle' class=btn onclick=\"$Util.SFU.removeFile(event {2})\"><a href='/com/FileDownload.do?path={3}' target='_blank'> {0}</a>".format(
                file.name, file.size, settings.onFileDeleted ? ", " + settings.onFileDeleted : "", file.path
            );
            if ($("#" + file.id).size() > 0) {
                $("#" + file.id).html(html);
            } else {
                var id = plupload.guid();
                var div = $($T("div")).attr("id", id);
                div.html(html);
                $(settings.display).append(div);
                prevFile = div;
            }
        }
    },
    removeFile: function (event, delegateFunc) {
        var element = event.target ? event.target : event.srcElement;
        $(element).parent().remove();
        if (delegateFunc) delegateFunc();
    }
};

//사용예
//$Util.SFU.create({
//	display : "messageList",
//	container : "selfBtn",
//	browse_button : "selfBtn_browse",
//	onFileUploaded : function(file) {
//		alert("name={0}, size={1}".format(file.name, file.size));
//	},
//	onFileDeleted : "onFileDeleted"
//});