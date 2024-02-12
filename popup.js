// A generic onclick callback function.
chrome.contextMenus.onClicked.addListener(genericOnClick);

// A generic onclick callback function.
function genericOnClick(info) {
  switch (info.menuItemId) {
    case 'radio':
      // Radio item function
      console.log('Radio item clicked. Status:', info.checked);
      break;
    default:
      // Standard context menu item function
      console.log('Standard context menu item clicked.');
  }
}
chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: "Text to Awdarma.uz",
    contexts: ['selection'],
    id: 'selection'
  },
    function () {
      const selectedText = window.getSelection().toString().trim();
      if (selectedText) {
        createModal(selectedText);
      }
      
      function createModal(text) {
        const modalElement = document.createElement('div');
        modalElement.id = 'text-modal';
        modalElement.innerHTML = `
          <div class="modal-overlay"></div>
          <div class="modal-content">
            <h2>Selected Text</h2>
            <p>${text}</p>
            <button id="close-modal">Close</button>
          </div>
        `;
      
        document.body.appendChild(modalElement);
      
        const closeButton = document.getElementById('close-modal');
        closeButton.addEventListener('click', () => {
          modalElement.remove();
        });
      }  
    }
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