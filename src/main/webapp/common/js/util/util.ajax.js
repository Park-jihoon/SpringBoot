$Util.Ajax = {
    Params: "",
    /**
     * Ajax 요청 메소드

     * parameters :
     *   - execUrl
     *   - action
     *   - param
     *   - handler
     **/
    Request: function (method, options) {
        if (options[2] != "use:cache") {
            $Util.Ajax.Params = options[2];
        }
        var pars = "action={0}&{1}&dummy={2}".format(options[1], $Util.Ajax.Params, $Util.Misc.randomValue());
        new Ajax.Request(options[0], {
            method: method,
            parameters: pars,
            onComplete: options[3]
        });
    },
    Get: function (options) {
        $Util.Ajax.Request("get", options);
    },
    Post: function (options) {
        $Util.Ajax.Request("post", options);
    }
}