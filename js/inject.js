var app = window.app = window.app || {};
$(function(){
    setTimeout(gmail, 1000 * 2);
    setTimeout(searchLink, 1000 * 2);
    setTimeout(convertPopup, 1000 * 2);
    $(window).on('hashchange',function(){
        setTimeout(gmail, 1000);
        setTimeout(searchLink, 1000);
    });
    $(document).on('click', '.adf.ads', function(){
        setTimeout(gmail, 1000);
    });
    $(document).on('mouseover', '.pdffiller-link', function(){
        $(this).addClass('T-I-JW');
    });
    $(document).on('mouseout', '.pdffiller-link', function(){
        $(this).removeClass('T-I-JW');
    });
    $(document).on('click', '.pdffiller-link', function(){
        var attachment = $(this).parents('.aZo.N5jrZb');
        var file = attachment.attr('download_url').split(':');
        var name = decodeURI(file[1]);
        var url = file[2] + ':' + file[3];
        getFile(url, name, 'GMAIL');
    });
    $(document).on('click', '.sendToPdfFiller', function(){
        var url = $(this).data('url');
        var tmp = url.split('/');
        var name = tmp[tmp.length - 1];
        showLoader();
        sendToPdffillerAPI(url, name);
    });
    $(document).on('click', '#pdf-convert', function(){
        convertToPdf();
    });
});

function gmail() {
    var files = $('.aZo.N5jrZb');

    if(files.length){
        files.each(function(){
            var file = $(this).attr('download_url').split(':');
            var type = file[0].substr(file[0].length - 3);
            var name = file[1];
            var url = file[2] + ':' + file[3];

            if(type == 'pdf'){
                var html = '<div class="pdffiller-link T-I J-J5-Ji aQv T-I-ax7 L3" role="button" tabindex="0" ' +
                    'aria-label="Open with PDFfiller" data-tooltip="Open with PDFfiller" style="-webkit-user-select: none;">' +
                    '<div class="aYt J-J5-Ji aYr" ' +
                    'style="height: 25px; width: 31px; color: white; font-weight: normal; background: none;">Open</div></div>';
                if($(this).find('.aQw .pdffiller-link').length == 0){
                    $(this).find('.aQw').append(html)
                }
            }
        });
    }
}
function getFile(url, filename, type){
    var type = type || 'CHROME.EXT';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if(xhr.status == 200) {
                var file = base64ArrayBuffer(xhr.response);
                switch (type){
                    case 'GMAIL':
                        var from = $('.iv .gD').attr('email');
                        var subject = $('.nH .ha .hP').html();
                        sendToPdffillerGmailApi(file, filename, from, subject);
                        break;
                    case 'CHROME.EXT':
                        sendToPdffillerAPI(file, filename);
                        break;
                }
            } else {
                hideLoader();
            }
        }
    };
    xhr.send(null);
    showLoader();
}
function sendToPdffillerAPI(url, filename, source){
    $.post(config.api_url, {
        source: 1,
        filename: filename,
        pdf_url: url,
        type: 'chrome.ext',
        out: 'json'
    }, function (json) {
        if(source == 'ext') {
            browser.tabs.create({
                url: json.url
            });
            return;
        }
        hideLoader();
        if(json.result){
            window.open(json.url, '_blank');
        } else {
            showError(json.message);
        }
    }, 'json').error(function(){
        hideLoader();
        showError();
    });
}
function sendToPdffillerGmailApi(file, filename, from, subject){
    $.post(config.api_url, {
        filename: filename,
        pdf_file: file,
        type: 'GMAIL',
        from: from,
        subject: subject,
        out: 'json'
    }, function (json) {
        hideLoader();
        if(json.result){
            window.open(json.url, '_blank');
        } else {
            showError(json.message);
        }
    }, 'json').error(function(){
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
                type = href.substr(href.length - 4);
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
