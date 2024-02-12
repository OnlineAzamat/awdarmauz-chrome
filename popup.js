chrome.contextMenus.onClicked.addListener(genericOnClick);

function genericOnClick(info) {
  function textTranslated() {
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
              selectedElement.parentNode.insertBefore(translationBox, selectedElement.nextSibling);`
          });
        });
    });
  }

  switch (info.menuItemId) {
    default: textTranslated;
  }
}
chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: "Text to Awdarma.uz",
    contexts: ['selection'],
    id: 'selection'
  }
    // function () {
    //   const selectedText = window.getSelection().toString().trim();
    //   if (selectedText) {
    //     createModal(selectedText);
    //   }
      
    //   function createModal(text) {
    //     const modalElement = document.createElement('div');
    //     modalElement.id = 'text-modal';
    //     modalElement.innerHTML = `
    //       <div class="modal-overlay"></div>
    //       <div class="modal-content">
    //         <h2>Selected Text</h2>
    //         <p>${text}</p>
    //         <button id="close-modal">Close</button>
    //       </div>
    //     `;
      
    //     document.body.appendChild(modalElement);
      
    //     const closeButton = document.getElementById('close-modal');
    //     closeButton.addEventListener('click', () => {
    //       modalElement.remove();
    //     });
    //   }  
    // }
  )

  // Intentionally create an invalid item, to show off error checking in the
  // create callback.
  chrome.contextMenus.create(
    { title: 'Oops', parentId: 999, id: 'errorItem' },
    function () {
      if (chrome.runtime.lastError) {
        console.log('Got expected error: ' + chrome.runtime.lastError.message);
      }
    }
  );
});