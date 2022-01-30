async function translate(text, authKey) {
  const query = new URLSearchParams({
    auth_key: authKey,
    text,
    target_lang: "JA",
  });

  const res = await fetch(`https://api-free.deepl.com/v2/translate?${query}`);
  return res.json();
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "translate") {
    chrome.storage.sync.get(["deepl-api-token"], (items) => {
      translate(request.payload.text, items["deepl-api-token"])
        .then((translated) => {
          sendResponse({ value: translated });
        })
        .catch((e) => {
          sendResponse({ error: e });
        });
    });
  }

  return true;
});
