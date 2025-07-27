chrome.runtime.sendMessage({ type: "START_SCREENSHOTS" });

chrome.runtime.sendMessage({ type: "GET_HISTORY" }, (response) => {
  if (response && response.history) {
    console.log("Browsing history:", response.history);
    // You can process the history here as needed
  }
});

const pageText: string = document.body.innerText;
console.log("Page text:", pageText);