const $mobilePreview2 = $('#mobilepreview2');
const $pullTheCode2 = $('#pullthecode2');

// Function to update mobile preview
function updateMobilePreview() {
    $mobilePreview2.html($pullTheCode2.html());
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

function addClickHandler(selector, sliderId, widthSelector, additionalClass, targetSelector, htmlTemplate) {
    $(selector).on('click', function () {
        const numberOfItems = parseInt(document.getElementById(sliderId).textContent);
        const widthValue = $(widthSelector).val();
        const mobileWidth = $(widthSelector).find('option:selected').attr('value2') || ''; // Handling no value2 attribute case

        let htmlString = '';
        for (let i = 0; i < numberOfItems; i++) {
            htmlString += htmlTemplate(widthValue, mobileWidth, additionalClass);
        }
        $(targetSelector).append(htmlString);

        commonUpdates();
        bindElementClick();
    });
}

function commonUpdates() {
    enabledrop();
    updateMobilePreview();
}

function bindElementClick() {
    $('.liveelement').off('click').on('click', function () { // Turn off existing handlers to avoid duplicates
        $('.interedit').removeClass('interedit');
        $('.explorerselected').removeClass('explorerselected');
        $(this).addClass('explorerselected interedit');
    });
}

function layoutHtmlTemplate(width, mobileWidth, additionalClass) {
    // Check if additionalClass contains "in910"
    if (additionalClass.includes("in910")) {
        // If it does, return an empty string
        return '';
    } else {
        // Otherwise, construct the HTML as before
        return `<div class="width${width}c ${mobileWidth} ${additionalClass} layoutpale layoutpale${width} liverow droppable ui-droppable"></div>`;
    }
}

function componentHtmlTemplate(width, mobileWidth, additionalClass) {
    return `<div class="width${width}c ${additionalClass} liveelement in910 layoutpale layoutpale${width}"></div>`;
}

// Configure layout additions
addClickHandler('.createlayoutslider', 'sliderValuerow', '#selectwidthrow', 'layoutpale', '.informationcontent', layoutHtmlTemplate);

// Configure component additions
addClickHandler('.createcomponentslider', 'sliderValuecomp1', '#selectwidthcomp', '', '.onblock', componentHtmlTemplate);

$('#addrow').on('click', function () {
    $('.onblock').removeClass('onblock');
    $('.internalbuttons').slideDown();
    $('.layoutbuilder').append(
        '<div class="width100c  layoutpale layoutpale100 liverow droppable onblock"></div>'
    );
    updateMobilePreview();
    enabledrop();
});

$('.addrow').on('click', function () {
    var layout = $(this).data('layout').split(','); // Get layout configuration from data attribute
    var html = '<div class="width100c">';

    // Dynamically create the columns based on the layout configuration
    layout.forEach(function (size, index) {
        var onblock = index === 0 ? 'onblock' : ''; // Add 'onblock' class to the first element
        html += `<div class="width${size}c layoutpale layoutpale${size} liverow droppable ${onblock}"></div>`;
    });

    html += '</div>';

    // Perform common actions

    $('.onblock').removeClass('onblock');
    $('.layoutbuilder').append(html);
    updateMobilePreview();
    enabledrop();
});

$('.addrowslider').on('click', function() {
    var html = '<div class="width100c programoverflow"><div class="width100c subscrollerdiv"><div class="width33c layoutpale layoutpale33 liverow droppable onblock ui-droppable"></div><div class="width33c layoutpale layoutpale33 liverow droppable ui-droppable"></div><div class="width33c layoutpale layoutpale33 liverow droppable ui-droppable"></div></div></div>';
    $('.layoutbuilder').append(html);
    $('.onblock').removeClass('onblock');
    updateMobilePreview();
    enabledrop();
});

$('.addrowslider50').on('click', function() {
    var html = '<div class="width100c programoverflow"><div class="width100c subscrollerdiv"><div class="width50c layoutpale layoutpale50 liverow droppable onblock ui-droppable"></div><div class="width50c layoutpale layoutpale50 liverow droppable ui-droppable"></div></div></div>';
    $('.layoutbuilder').append(html);
    $('.onblock').removeClass('onblock');
    updateMobilePreview();
    enabledrop();
});

$('#addrowc1xc1').on('click', function () {
    $('.informationcontent').append(
        '<div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width100c liveelement in910 layoutpale layoutpale100 "></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div></div>'
    );

    updateMobilePreview();
    enabledrop();
});

$('#addrowcxc').on('click', function () {
    $('.informationcontent').append(
        '<div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable onblock"><div class="width100c liveelement in910 layoutpale layoutpale100 "></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div></div>'
    );
    updateMobilePreview();
    enabledrop();
});

$('#addrowc2xc8').on('click', function () {
    $('.informationcontent').append(
        '<div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable onblock"><div class="width100c liveelement in910 layoutpale layoutpale100"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width20c width50c2 liveelement in910 layoutpale layoutpale20"></div><div class="width80c width50c2 liveelement in910 layoutpale layoutpale25"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width80c width50c2 liveelement in910 layoutpale layoutpale25"></div><div class="width20c width50c2 liveelement in910 layoutpale layoutpale20"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width20c width50c2 liveelement in910 layoutpale layoutpale20"></div><div class="width80c width50c2 liveelement in910 layoutpale layoutpale25"></div></div>'
    );
    updateMobilePreview();
    enabledrop();
});

$('#addrowc4xc6').on('click', function () {
    $('.informationcontent').append(
        '<div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable onblock"><div class="width100c liveelement in910 layoutpale layoutpale100 "></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width40c width50c2 liveelement in910 layoutpale layoutpale40"></div><div class="width60c width50c2 liveelement in910 layoutpale layoutpale60"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width40c width50c2 liveelement in910 layoutpale layoutpale40"></div><div class="width60c width50c2 liveelement in910 layoutpale layoutpale60"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width40c width50c2 liveelement in910 layoutpale layoutpale40"></div><div class="width60c width50c2 liveelement in910 layoutpale layoutpale60"></div></div>'
    );

    updateMobilePreview();
    enabledrop();
});

$('#addrow1x1 , #addrow1x1a').on('click', function () {
    $('.interedit').removeClass('interedit');
    captureState();
    $('.interedit').removeClass('interedit');
    $('.explorerselected').removeClass('explorerselected');
    $('.onblock').append('<div class="width100c liveelement in910 layoutpale layoutpale100 explorerselected interedit"></div>');

    updateMobilePreview();
    enabledrop();
});

$('#addrow2x2 , #addrow2x2a').on('click', function () {
    $('.interedit').removeClass('interedit');
    captureState();
    $('.interedit').removeClass('interedit');
    $('.explorerselected').removeClass('explorerselected');
    $('.onblock').append(
        '<div class="width50c width50c2 liveelement in910 layoutpale layoutpale50 interedit explorerselected"></div><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div>'
    );

    updateMobilePreview();
    enabledrop();
});

$('#addrow2x8').on('click', function () {
    $('.interedit').removeClass('interedit');
    captureState();
    $('.interedit').removeClass('interedit');
    $('.explorerselected').removeClass('explorerselected');
    $('.onblock').append(
        '<div class="width20c width50c2 liveelement in910 layoutpale layoutpale20 interedit explorerselected"></div><div class="width80c width50c2 liveelement in910 layoutpale layoutpale25"></div>'
    );
    updateMobilePreview();
    enabledrop();
});

$('#addrow4x6').on('click', function () {
    $('.interedit').removeClass('interedit');
    captureState();
    $('.interedit').removeClass('interedit');
    $('.explorerselected').removeClass('explorerselected');
    $('.onblock').append(
        '<div class="width40c width50c2 liveelement in910 layoutpale layoutpale40 interedit explorerselected"></div><div class="width60c width50c2 liveelement in910 layoutpale layoutpale60"></div>'
    );
    updateMobilePreview();
    enabledrop();
});

$('#addrow4x6a').on('click', function () {
    $('.interedit').removeClass('interedit');
    captureState();
    $('.interedit').removeClass('interedit');
    $('.explorerselected').removeClass('explorerselected');
    $('.onblock').append(
        '<div class="width60c width50c2 liveelement in910 layoutpale interedit layoutpale60 interedit explorerselected"></div><div class="width40c width50c2 liveelement in910 layoutpale layoutpale40"></div>'
    );
    updateMobilePreview();
    enabledrop();
});

$('#addrow2x7').on('click', function () {
    $('.interedit').removeClass('interedit');
    captureState();
    $('.interedit').removeClass('interedit');
    $('.explorerselected').removeClass('explorerselected');
    $('.onblock').append(
        '<div class="width25c width50c2 liveelement in910 layoutpale layoutpale25 interedit explorerselected"></div><div class="width75c width50c2 liveelement in910 layoutpale layoutpale75"></div>'
    );
    updateMobilePreview();
    enabledrop();
});

$('#addrow3x3').on('click', function () {
    $('.interedit').removeClass('interedit');
    captureState();
    $('.interedit').removeClass('interedit');
    $('.explorerselected').removeClass('explorerselected');
    $('.onblock').append(
        '<div class="width33c width50c2 liveelement in910 layoutpale layoutpale33 interedit explorerselected"></div><div class="width33c width50c2 liveelement in910 layoutpale layoutpale33"></div><div class="width33c width50c2 liveelement in910 layoutpale layoutpale33"></div>'
    );

    updateMobilePreview();
    enabledrop();
});

$('#addrow4x4').on('click', function () {
    $('.interedit').removeClass('interedit');
    captureState();
    $('.interedit').removeClass('interedit');
    $('.explorerselected').removeClass('explorerselected');
    $('.onblock').append(
        '<div class="width20c width50c3 liveelement in910 layoutpale layoutpale25 interedit explorerselected"></div><div class="width20c width50c3 liveelement in910 layoutpale layoutpale25"></div><div class="width20c width50c3 liveelement in910 layoutpale layoutpale25"></div><div class="width20c width50c3 liveelement in910 layoutpale layoutpale25"></div>'
    );
    updateMobilePreview();
    enabledrop();
});

$('.addrow-click').on('click', function() {
    captureState();
    $('.addrow100').click();
});

// Example of undo/redo stack management
let undoStack = [];
let redoStack = [];

function captureState() {
    const currentState = $('#pullthecode2').html();
    undoStack.push(currentState);
    redoStack = [];
}

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