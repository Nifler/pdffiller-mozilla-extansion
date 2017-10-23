function tabsWorker(tabs) {
    var activeTab = tabs[0];
    var pdf;
    pdf = (activeTab.url.substr(-4).toLowerCase() == '.pdf');
    var name = 'name.pdf';
    if (pdf) {
        showExtLoader();
        sendToPdffillerAPI(activeTab.url, name, 'ext');
    } else {
        showExtLoader();
        convertToPdf(activeTab.url, activeTab.width, activeTab.height);
    }
}

function openPage() {
    var querying = browser.tabs.query({active: true}) ;
    querying.then(tabsWorker);
}

browser.browserAction.onClicked.addListener(openPage);

function showExtLoader() {
    browser.tabs.executeScript({code: 'showLoader()'});
}

function hideExtLoader(suxxess, message) {
    browser.tabs.executeScript({code: 'hideLoader()'});
    if (!suxxess) {
        var message = message || "Something went wrong";
        browser.tabs.executeScript({code: 'showError(\''+message+'\')'});
    }
}
