function tabsWorker(tabs) {
    var activeTab = tabs[0];
    var pdf;
    pdf = (activeTab.url.substr(-4).toLowerCase() == '.pdf');
    var name = 'name.pdf';
    if (pdf) {
        sendToPdffillerAPI(activeTab.url, name, 'ext');
    } else {
        convertToPdf(activeTab.url, activeTab.width, activeTab.height);
    }
}

function openPage() {
    var querying = browser.tabs.query({active: true}) ;
    querying.then(tabsWorker);
}

browser.browserAction.onClicked.addListener(openPage);
