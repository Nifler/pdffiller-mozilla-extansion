function convertToPdf(url, width, height) {

    var serverUrl = 'http://mozilla-apps.pdffillers.com/index.php/api/pdf_converter';
    var convertRequest = $.post(serverUrl, {
        url: url,
        width: width,
        height: height
    }, function (json) {
        var filename = json.name+'.pdf';
        var fileUrl = json.url;
        console.log('DONE CONVERT');
        sendToPdffillerAPI(fileUrl, filename, 'ext');
    }, 'json').
        done(function() {
            console.log('done');
    }).
        fail(function() {
            hideExtLoader(false);
            console.log('fail convert');
    }).
        always(function(){
            console.log('always')
    });

}
