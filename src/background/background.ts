let screenshotInterval: number | null = null;

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.type === "GET_HISTORY") {
    chrome.history.search({ text: '', maxResults: 2 }, (results) => {
      sendResponse({ history: results });
    });
    return true;
  }
  if (request.type === "START_SCREENSHOTS") {
    if (screenshotInterval) clearInterval(screenshotInterval);
    screenshotInterval = window.setTimeout(() => {
      chrome.tabs.captureVisibleTab(chrome.windows.WINDOW_ID_CURRENT, { format: "png" }, (dataUrl) => {
        console.log("Screenshot taken");
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }
        chrome.downloads.download({
          url: dataUrl,
          filename: `screenshot_${Date.now()}.png`
        });
      });
    }, 0);
    sendResponse({ started: true });
  }
});

chrome.commands.onCommand.addListener((shortcut) => {
  console.log('lets reload');
  console.log(shortcut);
  if (shortcut.includes("+M")) {
    chrome.runtime.reload();
  }
});