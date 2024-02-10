chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const inputText = document.getElementsByClassName("input-text")[0];
  const outputText = document.getElementsByClassName("translated-text")[0];

  inputText.textContent = message.text;
  let selectedElement = window.getSelection().focusNode.parentElement;
  console.log(selectedElement);
  
  if (message.text && message.action === "translate-in-page") {
    const messageText = {
      "text": message.text,
      "lang_from": "en",
      "lang_to": "kaa"
    };

    fetch(`https://api.diyarbek.uz/awdarma/${messageText}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let translatedText = data?.awdarma;
        
        let selectedElement = window.getSelection().focusNode.parentElement;
        outputText.textContent = translatedText;
        selectedElement.parentNode.insertBefore(outputText, selectedElement.nextSibling);
      });
  }
});
