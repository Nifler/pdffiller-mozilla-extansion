function tabsWorker(tabs) {
    var activeTab = tabs[0];
    var pdf;
    pdf = (activeTab.url.substr(-4).toLowerCase() == '.pdf');
    var name = 'name.pdf';
    if (pdf) {
        sendToPdffillerAPI(activeTab.url, name, 'ext');
    } else {
        showPopup();
    }
}
function openPage() {
    var querying = browser.tabs.query({active: true}) ;
    querying.then(tabsWorker);
}

function showPopup() {

    var showPopup = '$("#pdf-convert").show();';

    var executing = browser.tabs.executeScript({
        code: showPopup
    });
    executing.then(onExecuted, onError);
}

browser.browserAction.onClicked.addListener(openPage);
