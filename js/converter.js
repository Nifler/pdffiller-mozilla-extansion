function convertPopup(){
    $('body').prepend('<button id="pdf-convert">konvert</button>');
    $('#pdf-convert').hide();
}

function convertToPdf() {
    var elem = getElement();
    var name = getName();
    var doc = new jsPDF();

    doc.fromHTML(elem, 15, 15, {
        'width': 170
    });

    setTimeout(function(){
        doc.save(name);
    }, 1000 * 2);
}

function getElement() {
    return $('body').get(0);    // не работает
}

function getName() {
    return document.domain+'.pdf';
}