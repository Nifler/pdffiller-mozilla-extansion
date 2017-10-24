var app = window.app = window.app || {};
$(function(){
    setTimeout(searchLink, 1000 * 2);
    $(window).on('hashchange',function(){
        setTimeout(searchLink, 1000);
    });
    $(document).on('mouseover', '.pdffiller-link', function(){
        $(this).addClass('T-I-JW');
    });
    $(document).on('mouseout', '.pdffiller-link', function(){
        $(this).removeClass('T-I-JW');
    });
    $(document).on('click', '.sendToPdfFiller', function(){
        var url = $(this).data('url');
        var tmp = url.split('/');
        var name = tmp[tmp.length - 1];
        showLoader();
        sendToPdffillerAPI(url, name);
    });
});
function checkJsEditor(){
    var flashVersion = swfobject.getFlashPlayerVersion();
    return (flashVersion.major == 0);
}
function sendToPdffillerAPI(url, filename, source){

    $.post(config.api_url, {
        source: 1,
        filename: filename,
        pdf_url: url,
        type: 'firefox.ext',
        out: 'json'
    }, function (json) {
        var projectUrl = json.url;
        if(checkJsEditor()){
            projectUrl+='?call=JS';
        }

        if(json.id == false) {
            hideExtLoader(false);
            return;
        }
        if(source == 'ext') {
            hideExtLoader(true);
            browser.tabs.create({
                url: projectUrl
            });
            return;
        }
        hideLoader();
        if(json.result){
            window.open(projectUrl, '_blank');
        } else {
            hideExtLoader(false);
            showError(json.message);
        }
    }, 'json').
    fail(function(){
        hideExtLoader(false);
        hideLoader();
        showError();
    });
}
function searchLink() {
    var links = $('a');
    if(links.length){
        links.each(function(){
            var href = $(this).attr('href');
            var type = false;
            if(typeof href != 'undefined'){
                type = href.substr(href.length - 4).toLowerCase();
            }
            if(type == '.pdf'){
                if( href.substr(0,1) == '/'){
                    href = window.location.origin + href;
                }
                if( href.substr(0,4) != 'http'){
                    href = window.location.href + href;
                }
                var pos = $(this).position();
                var left = pos.left + $(this).outerWidth(false) + 10;
                var top = pos.top + $(this).outerHeight(false) - 22;
                $(this).after('<span class="sendToPdfFillerEmpty"></span><div class="sendToPdfFiller" data-url="'+ href +'"' +
                    ' style="left: '+ left +'px; top: '+ top +'px;" title="Open with PDFfiller"><img src="'+ app.browser.getUrl('img/icon-open.png') +'"></div>');

            }
        });
    }
}
function showLoader() {
    $('body').append(
        '<div id="filler-loader">' +
        '<div class="loader-wrap">' +
        '<div class="loader-icon"><img src="'+ app.browser.getUrl('img/loader.gif') +'"></div>' +
        '<div class="loader-text">Loading, please wait...</div>' +
        '</div>' +
        '</div>'
    )
}
function hideLoader() {
    $('#filler-loader').remove();
}
function showError(message, delay) {
    var message = message || "Something went wrong";
    var delay = delay || 3000;
    $('body').append(
        '<div id="filler-error">' +
        '<div class="error-wrap">' +
        '<div class="error-text">'+ message +'</div>' +
        '</div>' +
        '</div>'
    );
    if (delay > 0){
        setTimeout(hideError, delay);
    }
}
function hideError() {
    $('#filler-error').remove();
}
