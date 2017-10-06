function convertToPdf(url, width, height) {

    var serverUrl = 'http://mozilla-apps.pdffillers.com/index.php/api/pdf_converter';

    $.post(serverUrl, {
        url: url,
        width: width,
        height: height
    }, function (json) {
        var filename = json.name+'.pdf';
        var fileUrl = json.url;
        sendToPdffillerAPI(fileUrl, filename, 'ext');
    }, 'json');
}
