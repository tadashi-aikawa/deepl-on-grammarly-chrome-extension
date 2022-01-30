const deeplTokenInput = document.querySelector("#deepl-api-token");

const saveButton = document.querySelector("#save-options");

async function saveOptions() {
  chrome.storage.sync.set(
    { "deepl-api-token": deeplTokenInput.value },
    function () {
      if (chrome.runtime.error) {
        console.error(chrome.runtime.error);
      }
    }
  );
}
async function restoreOptions() {
  chrome.storage.sync.get(["deepl-api-token"], (items) => {
    deeplTokenInput.value = items["deepl-api-token"];
  });
}

saveButton.addEventListener("click", saveOptions);
document.addEventListener("DOMContentLoaded", restoreOptions);
