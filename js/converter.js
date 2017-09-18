function convertToPdf(url, width, height) {

    var storageUrl = 'http://firefox.loc';

    $.post(storageUrl, {
        url: url,
        width: width,
        height: height
    }, function (json) {
        var filename = json.name;
        var fileUrl = json.url;
        sendToPdffillerAPI(fileUrl, filename, 'ext');
    }, 'json');
}
