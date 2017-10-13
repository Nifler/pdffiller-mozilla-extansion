function convertToPdf(url, width, height) {
    console.log(url, width, height);
    var serverUrl = config.converter_server_url;
    $.post(serverUrl, {
        url: url,
        width: width,
        height: height
    }, function (json) {
        var filename = json.name+'.pdf';
        var fileUrl = json.url;
        sendToPdffillerAPI(fileUrl, filename, 'ext');
    }, 'json').
        fail(function() {
            hideExtLoader(false, 'Page cannot be converted to PDF.');
    });

}
