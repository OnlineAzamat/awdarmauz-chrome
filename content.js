
  document.addEventListener('mouseup', () => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      createModal(selectedText);
    }
  });
  
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
