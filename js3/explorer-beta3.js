// Constants for UI elements
const $explorerContainer = $('#pullthecode2');
const $mobilePreview = $('#mobilepreview2');
const desktopHideCheckbox = $('#desktophidev2d');
const mobileHideCheckbox = $('#mobilehidev2d');

// Main initialization function
function initializeApp() {
    attachEventHandlers();
    initializeObserver();
}

// Attaches all event handlers to their respective elements
function attachEventHandlers() {
    $('.draggable').draggable({ revert: "valid", stop: updateMobilePreview });
    $('.droppable').droppable({ drop: handleDrop });
    $('#EditandSubmitAL').on('click', submitChanges);
    $('.deleterow').on('click', deleteElement);
    $explorerContainer.on('click', '.liverow', handleRowClick);
    $(document).on('contextmenu', '.indent', handleContextMenu).on('click', closeContextMenu);
    $('#contextMenu ul li').click(contextMenuAction);
    $(window).on('resize', debounce(updateExplorer, 250));
}



// Handles the deletion of elements
function deleteElement() {
    captureState();
    $('.explorerselected').remove();
    updateMobilePreview();
}

// Handles the click on rows to update visibility checks
function handleRowClick() {
    $('.onblock').removeClass('onblock');
    $(this).addClass('onblock');
    desktopHideCheckbox.prop('checked', $(this).hasClass('hideonlyondesktop'));
    mobileHideCheckbox.prop('checked', $(this).hasClass('hideonlyonmobile'));
}

// Updates the mobile preview HTML content
function updateMobilePreview() {
    $mobilePreview.html($explorerContainer.html());
}

// Handles dropping elements into droppable zones
function handleDrop(event, ui) {
    const $draggable = $(ui.draggable);
    const size = $draggable.attr('size');
    const pale = $draggable.attr('pale');
    if (size) {
        $(this).append(`<div class="${size} layoutpale layoutpale${pale} interedit"></div>`);
        updateMobilePreview();
    }
}

// Submits changes and updates the preview
function submitChanges() {
    $('.explorerselected').html($('#myhtmleditor').val());
    updateMobilePreview();
}

// Handles right-click context menu
function handleContextMenu(e) {
    e.preventDefault();
    $('#contextMenu').css({
        display: "block",
        left: e.pageX,
        top: e.pageY
    }).data('clickedElement', this);
    return false;
}

// Closes the context menu
function closeContextMenu() {
    $('#contextMenu').hide();
    $('.explorerselected').removeClass('explorerselected');
    updateMobilePreview();
}

// Performs actions from the context menu
function contextMenuAction() {
    const action = $(this).attr('id');
    const $clickedElement = $($('#contextMenu').data('clickedElement'));
    switch (action) {
        case 'delete':
            captureState();
            $clickedElement.data('linkedElement').remove();
            $clickedElement.remove();
            updateMobilePreview();
            break;
        case 'duplicate':
            duplicateElement($clickedElement);
            updateMobilePreview();
            break;
        case 'edit':
            editElement($clickedElement);
            break;
    }
}

// Debounce function to limit rate of function calls
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
}

// Mutation observer to handle DOM changes
function initializeObserver() {

    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            if (mutation.type === 'childList' || mutation.type === 'subtree') {
                updateExplorer();
                break;
            }
        }
    });
    observer.observe(document.querySelector('#pullthecode2'), { childList: true, subtree: true });
}

// Run the application
initializeApp();



