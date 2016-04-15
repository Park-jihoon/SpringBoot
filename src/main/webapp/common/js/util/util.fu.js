$Util.FU = {
    uploaders: {},
    upIds: [],
    userSelectFileCount: null,
    userFileUploadedCount: null,

    create: function (settings) {
        if (typeof plupload == "undefined") return;
        if ($(settings.container).size() == 0) return;

        if (!$(settings.container).attr("id")) $(settings.container).attr('id', plupload.guid());

        var uploader = new plupload.Uploader($.extend({
            runtimes: 'gears,flash,silverlight',
            max_file_size: '10mb',
            multipart: true,
            url: "/com/FileUpload_e.do",
            flash_swf_url: '/common/js/plupload/plupload.flash.swf',
            silverlight_xap_url: '/common/js/plupload/plupload.silverlight.xap',
            dragdrop: true,
            guid: plupload.guid()
        }, settings, {
            container: $(settings.container).attr("id"),
            browse_button: $(settings.browse_button).attr("id")
        }));

        uploader.bind("Init", function (up, params) {
            $(up.settings.container).attr("title", "Using runtime: " + params.runtime);
            if (up.features.dragdrop && up.settings.dragdrop) {
                up.settings.drop_element = up.settings.container;
                $(up.settings.container).children(up.settings.fileList).html("여기로 파일을 드래그하세요");
            }
        });

        uploader.init();
        $Util.FU.upIds.push(uploader.settings.guid);
        $Util.FU.uploaders[uploader.settings.guid] = uploader;

        uploader.bind("FilesAdded", function (up, files) {
            // 메시지 삭제
            if ($(up.settings.container).children(up.settings.fileList).find("div").size() == 0) {
                $(up.settings.container).children(up.settings.fileList).html("");
            }
            $(files).each(function (i, file) {
                $(up.settings.fileList).append(
                    '<div id="' + file.id + '" class="plupload_file">' +
                    '<div class=plupload_progress>' +
                    '<div class=plupload_progress_container>' +
                    '<div class=plupload_progress_bar></div>' +
                    '</div>' +
                    '</div>' +
                    file.name + ' (' + plupload.formatSize(file.size) + ') <b></b>' +
                    '</div>');
                $Util.FU.userSelectFileCount++;
            });
            window.setTimeout(function () {
                up.start();
            }, 1000);
        });

        uploader.bind("FileUploaded", function (up, file, res) {
            file.path = res.response;
            $Util.FU.createUploadedText(file, up);
            $Util.FU.userFileUploadedCount++;
        });

        uploader.bind("UploadProgress", function (up, file) {
            var fileID = "#" + file.id;
            if ($(fileID).find("b").size() > 0) {
                $(fileID).find("b").html(file.percent + "%");
                $(fileID).find(".plupload_progress_bar").css("width", file.percent + "px");
            }
        });

        uploader.bind("Error", function (up, err) {
            var errorMsg = "";
            switch (err.code) {
                case plupload.INIT_ERROR :
                    errorMsg = "<div>파일을 첨부하기 위해서는 'Adobe Flash Player'를 설치해야 합니다. <a href='http://get.adobe.com/kr/flashplayer/' target='_blank'>[다운로드]</a></div>";
                    break;
                case plupload.FILE_SIZE_ERROR :
                    errorMsg = "<div>'{0}' 파일이 업로드 용량을 초과하였습니다. <a href='/component/upload_guide.hwp' target='_blank'>[이용안내]</a></div>".format(err.file.name);
                    break;
            }
            $(up.settings.fileList).append(errorMsg);
            $Util.FU.userFileUploadedCount++;
        });
    },
    createUploadedText: function (file, up) {
        // 메시지 삭제
        if ($(up.settings.container).children(up.settings.fileList).find("div").size() == 0) {
            $(up.settings.container).children(up.settings.fileList).html("");
        }
        var html = "<img src='/common/images/icon_x.gif' align='absmiddle' class=btn onclick=\"$Util.FU.removeFile(event, '{4}')\"><a href='/com/FileDownload.do?path={3}' target='_blank'> {2}</a><input type='hidden' name='fileName' value='{0}'/><input type='hidden' name='fileSize' value='{1}'/><input type='hidden' name='filePath' value='{3}'/>".format(
            file.name, file.size,
            file.name.substring(file.name.lastIndexOf("/") + 1),
            file.path ? file.path : file.name,
            up.settings.guid
        );
        if ($(file.id)) {
            $("#" + file.id).html(html);
        } else {
            $(fileList).append("<div>{0}</div>".format(html));
        }
    },
    removeFile: function (event, uploader_guid) {
        var up = $Util.FU.uploaders[uploader_guid ? uploader_guid : $Util.FU.upIds[0]];
        element = event.target ? event.target : event.srcElement;
        $(element).parent().remove();
        if (up.features.dragdrop && up.settings.dragdrop && $("#" + up.settings.container).children(up.settings.fileList).find("div").length == 0) {
            $("#" + up.settings.container).children(up.settings.fileList).html("여기로 파일을 드래그하세요");
        }
    },
    isComplete: function () {
        return $Util.FU.userSelectFileCount == $Util.FU.userFileUploadedCount;
    }
};

$(function () {
    $Util.FU.create({
        max_file_size: '100mb',
        container: "#upload_container",
        fileList: "#fileList",
        browse_button: "#pickfiles"
    });
});