$(document).ready(function() {
    // Initialize components
    runExplorerDebounced();
    liverowactivy();
    deleteElement();
    enabledrop();
    
    // Other initialization
    initializeFileImport();
    initializeDragAndDrop();
    initializeHtmlCopy();
    initializeDelete();
});

// Function to initialize file import
function initializeFileImport() {
    $('#fileInput').change(function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const fileContents = e.target.result;
                $('#pullthecode2').html(fileContents);
                updateComponents();
            };
            reader.readAsText(file);
        }
    });
}

// Function to initialize drag and drop
function initializeDragAndDrop() {
    $(".droppable").droppable({
        drop: function(event, ui) {
            const mysize = $(ui.draggable).attr('size');
            const mypale = $(ui.draggable).attr('pale');
            if (mysize && mysize !== "") {
                $(this).append('<div class="' + mysize + ' in910 layoutpale layoutpale' + mypale + '"></div>');
            }
            updateMobilePreview();
        }
    });
}

// Function to copy HTML to elements
function initializeHtmlCopy() {
    const htmlToCopy = '<img class="loading-lazy promoimg21 in910" src="https://staging-na01-pcrichard.demandware.net/on/demandware.static/-/Library-Sites-PCRichardSharedLibrary/default/dw3744730c/pim-content/blog-DC231-electric-dryers-2x.png" data-src="https://staging-na01-pcrichard.demandware.net/on/demandware.static/-/Library-Sites-PCRichardSharedLibrary/default/dw3744730c/pim-content/blog-DC231-electric-dryers-2x.png" alt="Electric Heat Pump Dryers">';
    $('#pullthecode2 .droppable').each(function(index, element) {
        $(element).html(htmlToCopy);
    });
}

// Function to initialize delete operation
function initializeDelete() {
    $('.deleterow').off('click').on('click', function() {
        const $selectedElement = $('.explorerselected');
        if ($selectedElement.length) {
            captureState();
            $selectedElement.remove();
            updateMobilePreview();
        }
    });
}

// Function to update mobile preview
function updateMobilePreview() {
    $('#mobilepreview2').html($('#pullthecode2').html());
}

// Function to update components
function updateComponents() {
    liverowactivy();
    enabledrop();
    initializeHtmlCopy();
    initializeDelete();
}

// Function to capture the current state
function captureState() {
    const currentState = $('#pullthecode2').html();
    undoStack.push(currentState);
    redoStack = [];
}

// Function to debounce execution
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Example of runExplorerDebounced function definition
const runExplorerDebounced = debounce(function() {
    runexplorer();
}, 1000);

// Assuming these functions are defined elsewhere in your code
function runexplorer() {
    // Your implementation
}

function liverowactivy() {
    $('#pullthecode2').on('click', '.liverow', function() {
        $('.onblock').removeClass('onblock');
        $(this).addClass('onblock');
        $('#desktophidev2d').prop('checked', $(this).hasClass('hideonlyondesktop'));
        $('#mobilehidev2d').prop('checked', $(this).hasClass('hideonlyonmobile'));
    });
}

function enabledrop() {
    $(".droppable").droppable({
        drop: function(event, ui) {
            const mysize = $(ui.draggable).attr('size');
            const mypale = $(ui.draggable).attr('pale');
            if (mysize && mysize !== "") {
                $(this).append('<div class="' + mysize + ' in910 layoutpale layoutpale' + mypale + '"></div>');
            }
            updateMobilePreview();
        }
    });
}

// Example of undo/redo stack management
let undoStack = [];
let redoStack = [];

function undoChange() {
    if (undoStack.length > 0) {
        const lastState = undoStack.pop();
        redoStack.push($('#pullthecode2').html());
        $('#pullthecode2').html(lastState);
        updateMobilePreview();
    }
}

function redoChange() {
    if (redoStack.length > 0) {
        const nextState = redoStack.pop();
        undoStack.push($('#pullthecode2').html());
        $('#pullthecode2').html(nextState);
        updateMobilePreview();
    }
}