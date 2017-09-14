function convertToPdf(url) {

    var storageUrl = 'http://nifler.com/pdfreactor';
    var pdfreactorUrl = 'https://cloud.pdfreactor.com/service/rest';
    var storage = "http://nifler.com/pdfreactorStorage/";

    var pdfReactor = new PDFreactor(pdfreactorUrl);
    var config = {
        document: url,
    }
    console.log('start convert');
    pdfReactor.convert(config, function(result) {
        var documentBody = result.document;
        var filename = "fromext";
        console.log(result.document);
        $.post(storageUrl, {
            filename: filename,
            documentBody: documentBody
        }, function (json) {
            var fileUrl = storage+json.url;
            console.log('json.url',fileUrl);
            sendToPdffillerAPI(fileUrl, filename+'.pdf', 'ext');
        }, 'json');
    });
}
