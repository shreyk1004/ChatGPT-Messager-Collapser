// contentScript.js

let selectedMessages = [];
let collapseContainer = null;
let collapsedRect = null;

document.addEventListener('click', function(event) {
    const targetElement = event.target.closest('.text-message');

    if (targetElement) {
        toggleMessageSelection(targetElement);
        showOrHideCollapseButton();
    } else if (collapsedRect && event.target === collapsedRect) {
        expandMessages();
    }
});

function toggleMessageSelection(message) {
    message.classList.toggle('selected');
    message.style.border = message.classList.contains('selected') ? '2px solid white' : '';
    message.style.borderRadius = '5px';
    selectedMessages = [...document.querySelectorAll('.text-message.selected')];
}

function showOrHideCollapseButton() {
    if (selectedMessages.length > 0) {
        if (!collapseContainer) {
            createCollapseButton();
        }
        positionCollapseButton();
    } else {
        removeCollapseButton();
    }
}

function createCollapseButton() {
    collapseContainer = document.createElement('div');
    const button = document.createElement('button');
    button.textContent = 'Collapse';
    // Style the button
    button.style.border = '1px solid #ADD8E6';
    button.style.borderRadius = '5px';
    button.style.padding = '5px 10px';
    button.style.cursor = 'pointer';
    button.style.backgroundColor = '#ADD8E6'; // Light blue color for the button
    collapseContainer.appendChild(button);
    document.body.appendChild(collapseContainer);
    button.addEventListener('click', collapseSelectedMessages);
}

function positionCollapseButton() {
    const lastSelected = selectedMessages[selectedMessages.length - 1];
    const { top, height } = lastSelected.getBoundingClientRect();
    const verticalCenter = top + height / 2 + window.scrollY;

    collapseContainer.style.position = 'fixed';
    collapseContainer.style.right = '20px'; // 20px from the right edge of the viewport
    collapseContainer.style.top = `${verticalCenter}px`; // Centered vertically next to the selected messages
    collapseContainer.style.transform = 'translateY(-50%)';
    collapseContainer.style.display = 'block';
}

function collapseSelectedMessages() {
    // Create the collapsed rectangle if it doesn't exist
    collapsedRect = document.createElement('div');
    collapsedRect.textContent = 'Collapsed Messages';
    // Style the collapsed rectangle
    collapsedRect.style.border = '1px solid #ADD8E6';
    collapsedRect.style.borderRadius = '5px';
    collapsedRect.style.padding = '5px 10px';
    collapsedRect.style.backgroundColor = '#ADD8E6'; // Light blue color for the bar
    collapsedRect.style.cursor = 'pointer';
    collapsedRect.style.marginTop = '10px';
    collapsedRect.style.display = 'block'; // Ensure it is visible

    const messagesContainer = selectedMessages[0].parentNode;
    messagesContainer.insertBefore(collapsedRect, selectedMessages[0]); // Place collapsedRect above the first selected message

    selectedMessages.forEach(message => message.style.display = 'none');
    removeCollapseButton();
}

function expandMessages() {
    selectedMessages.forEach(message => {
        message.style.display = 'block'; // Restore the message
        message.classList.remove('selected');
        message.style.border = ''; // Clear the selection border
    });
    selectedMessages = [];
    if (collapsedRect) {
        collapsedRect.remove();
        collapsedRect = null;
    }
}

function removeCollapseButton() {
    if (collapseContainer) {
        collapseContainer.remove();
        collapseContainer = null;
    }
}
