let interval;

function setTranslationButton() {
  if (!document.querySelector("[data-name=document-content]")) {
    return;
  }

  // 翻訳エリア
  const translationAreaElm = document.createElement("div");
  translationAreaElm.className = "translation-area";

  // 翻訳後テキストエリア
  const translatedTextArea = document.createElement("div");
  translatedTextArea.className = "translation-text-area";
  translationAreaElm.appendChild(translatedTextArea);

  // Loading
  const loadingElm = document.createElement("img");
  loadingElm.src =
    "https://publish-01.obsidian.md/access/35d05cd1bf5cc500e11cc8ba57daaf88/Attachments/mimizou-momochi.gif";
  loadingElm.style.display = "none";

  const loadingContainer = document.createElement("div");
  loadingContainer.className = "loading";
  loadingContainer.appendChild(loadingElm);

  translationAreaElm.appendChild(loadingContainer);

  // 翻訳ボタン
  const translationButtonElm = document.createElement("button");
  translationButtonElm.innerText = "翻訳(A)";
  translationButtonElm.accessKey = "A";
  translationButtonElm.className = "translation-button";
  translationButtonElm.onclick = () => {
    translatedTextArea.innerText = "";
    translationButtonElm.style.display = "none";
    loadingElm.style.display = "inline-block";

    chrome.runtime.sendMessage(
      {
        action: "translate",
        payload: {
          text: document.querySelector(".ql-editor").innerText,
        },
      },
      function (response) {
        translationButtonElm.style.display = "inline-block";
        loadingElm.style.display = "none";
        if (response.error) {
          window.alert(
            "DeepL APIとの通信に失敗しました。認証キーが正しく設定されているか、通信が繋がるかを確認してください"
          );
          return;
        }

        translatedTextArea.innerText = response.value.translations
          .map((x) => x.text)
          .join("\n---\n");
      }
    );
  };
  translationAreaElm.appendChild(translationButtonElm);

  // 本体の下部に配置
  document.querySelector("#page").appendChild(translationAreaElm);

  clearInterval(interval);
}

interval = setInterval(setTranslationButton, 1000);
