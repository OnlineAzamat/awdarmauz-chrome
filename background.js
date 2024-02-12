chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {  
  const messageText = {
    "text": message.text,
    "lang_from": "en",
    "lang_to": "kaa"
  };

  fetch('https://api.diyarbek.uz/awdarma/', messageText)
      .then(data => {
        chrome.tabs.executeScript({
          code: `
            const selectedElement = window.getSelection().focusNode.parentElement;
            const translationBox = document.createElement('div');
            translationBox.classList.add('translation-box');
            translationBox.innerHTML = \`
              <p class="original-text">Original Text: ${message.text}</p>
              <p class="translated-text">Translated Text: ${data?.data?.awdarma}</p>
            \`;
            selectedElement.parentNode.insertBefore(translationBox, selectedElement.nextSibling);
          `
        });
      });
});