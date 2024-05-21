
const $explorerContainer = $('#pullthecode2');
const $mobilePreview = $('#mobilepreview2');
const $pullTheCode = $('#pullthecode2');
const desktopHideCheckbox = $('#desktophidev2d');
const mobileHideCheckbox = $('#mobilehidev2d');
var $in910 = $('.in910');

var runExplorerDebounced = debounce(function() {
    runexplorer();
}, 1000);

function updateMobilePreview() {
    $mobilePreview.html($pullTheCode.html());
}

function deleteElement() {
    $('.deleterow').off('click').on('click', function() {
        const $selectedElement = $('.explorerselected');
        if ($selectedElement.length) {
            captureState();
            $selectedElement.remove();
            updateMobilePreview();
        }
    });
}

function liverowactivy() {
    $explorerContainer.on('click', '.liverow', function () {
        $('.onblock').removeClass('onblock');
        $(this).addClass('onblock');
        $('#desktophidev2d').prop('checked', $(this).hasClass('hideonlyondesktop'));
        $('#mobilehidev2d').prop('checked', $(this).hasClass('hideonlyonmobile'));
    });
}

$('#EditandSubmitAL').on('click', function () {
    $('.explorerselected').html($('#myhtmleditor').val());
    updateMobilePreview();
});

$(".draggable").draggable({
    revert: "valid",
    stop: function() {}
});

function enabledrop() {
    $(".droppable").droppable({
        drop: function (event, ui) {
            var mysize = $(ui.draggable).attr('size');
            var mypale = $(ui.draggable).attr('pale');
            $('.interedit').removeClass('interedit');
            if (mysize !== undefined && mysize !== "") {
                $(this).append('<div class="' + mysize + ' in910 layoutpale interedit layoutpale' + mypale + '"></div>');
            }
            updateMobilePreview();
        }
    });
}

function editElement(clickedElement) {
    captureState();
    var targetElement = $(clickedElement).data('linkedElement');
    if (!$(targetElement).is('.edit-mode')) {
        var originalContent = $(targetElement).html();
        var textarea = $('<textarea>', {
            class: 'editor-input',
            css: {
                width: '98%',
                height: 'auto',
                resize: 'vertical'
            },
            text: originalContent.trim(),
            blur: function() {
                $(targetElement).html($(this).val()).removeClass('edit-mode');
            },
            keyup: function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    $(this).blur();
                }
            }
        });
        textarea.on('click', function(event) {
            event.stopPropagation();
            event.preventDefault();
        });
        $(targetElement).html(textarea).addClass('edit-mode');
        textarea.focus();
    }
}

function duplicateElement(clickedElement) {
    captureState();
    var originalElement = $(clickedElement).data('linkedElement');
    var clone = $(originalElement).clone();
    $(originalElement).after(clone);
}

function runexplorer() {
    $('#explorer2').empty();
    const target = document.getElementById('pullthecode3');
    const explorer = document.getElementById('explorer2');

    let lastSelectedElement = null;

    const excludedClasses = [
        'informationcontent', 'layoutbuilder', 'sortable', 'layoutop2', 'experience-component',
        'experience-pcrs_assets-markup', 'liveelement', 'in910', 'layoutpale', 'layoutpale33',
        'layoutpale20', 'layoutpale25', 'layoutpale40', 'layoutpale50', 'layoutpale75',
        'layoutpale60', 'layoutpale80', 'layoutpale100', 'ui-sortable', 'ui-sortable-disabled',
        'liverow', 'droppable', 'ui-droppable', 'loading-lazy', 'promoimg21', 'ui-sortable-handle',
        'interedit', 'onblock', 'width50c2' , 'width50c3'
    ];

    function exploreElements(element, depth = 0, parentContainer = explorer) {
        if (!element) {
            console.error('Invalid element provided to exploreElements');
            return;
        }

        let elements = element.children;
        if (!elements || elements.length === 0) {
            console.info('No children found for element:', element);
            return;
        }

        for (let i = 0; i < elements.length; i++) {
            let tagLabel = elements[i].tagName;
            let specialLabel = getSpecialLabel(elements[i]);
            let labelColor = getColorForTag(tagLabel, elements[i]);
            let classDisplay = getClassDisplay(elements[i]);
            let linkDetails = '';

            if (elements[i].tagName.toLowerCase() === 'a' && elements[i].hasAttribute('href')) {
                let linkedText = elements[i].textContent.trim();
                let hrefAttribute = elements[i].getAttribute('href');
                linkDetails = ` <span style="color: #fff;">("${linkedText}") - href: = <span style="color:yellow">${hrefAttribute}</span></span>`;
            }

            const details = document.createElement('div');
            details.className = 'indent';
            details.style.marginLeft = `${depth * 20}px`;
            details.setAttribute('data-tag', specialLabel || tagLabel);
            details.innerHTML = `<strong style="color: ${labelColor};">${specialLabel || tagLabel}</strong>${classDisplay}${linkDetails}`;
            parentContainer.appendChild(details);
            $(details).data('linkedElement', elements[i]);
            elements[i].explorerIndent = details;

            details.addEventListener('click', function() {
                selectAndHighlightElement(elements[i]);
            });

            elements[i].addEventListener('click', function(event) {
                event.stopPropagation();
                selectAndHighlightElement(elements[i], true);
            });

            if (elements[i].children.length > 0) {
                exploreElements(elements[i], depth + 1, parentContainer);
            }
        }
    }
