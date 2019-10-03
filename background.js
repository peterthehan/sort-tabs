const compareTabs = (tabA, tabB) => {
  if (tabA.hostname < tabB.hostname) {
    return -1;
  }
  if (tabA.hostname > tabB.hostname) {
    return 1;
  }
  if (tabA.title < tabB.title) {
    return -1;
  }
  if (tabA.title > tabB.title) {
    return 1;
  }

  return 0;
};

chrome.browserAction.onClicked.addListener(_ => {
  chrome.tabs.query({ currentWindow: true }, tabs => {
    const mapped = tabs.map(tab => ({
      tab,
      hostname: new URL(tab.url).hostname.replace(/^www\./, '').toLowerCase(),
      title: tab.title.toLowerCase()
    }));

    mapped.sort(compareTabs);
    mapped.forEach(({ tab }, index) => chrome.tabs.move(tab.id, { index }));
  });
});
