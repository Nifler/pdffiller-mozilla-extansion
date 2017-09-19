function convertToPdf(url, width, height) {

    var serverUrl = 'http://firefox.loc/index.php/api/pdf_converter';
    var storageUrl = 'http://aqua.nifler.vizl.org/public/Files/';

    $.post(serverUrl, {
        url: url,
        width: width,
        height: height
    }, function (json) {
        var filename = json.name+'.pdf';
        var fileUrl = storageUrl+json.url;
        sendToPdffillerAPI(fileUrl, filename, 'ext');
    }, 'json');
}
