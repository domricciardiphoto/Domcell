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
    // Remove any previous event listeners to avoid multiple bindings
    $('.deleterow').off('click').on('click', function () {
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

    function selectAndHighlightElement(element, scrollElement = false) {
        const $pullthecode2 = $('#pullthecode2');
        const $element = $(element);
    
        if (!$element.length || !$pullthecode2.find($element).length) {
            return;
        }
    
        clearSelection();
        $('.explorerselected, .onblock, .interedit').removeClass('explorerselected onblock interedit');
    
        $element.addClass('explorerselected');
        if (!$element.hasClass('liveelement')) {
            $element.addClass('onblock');
        } else {
            $element.addClass('interedit');
        }
    
        $element.click();
        $('#contextMenu').hide();
        $('#myhtmleditor').val($element.html());
    
        // Optimize by moving this outside of the event handler if possible
        $('.deleterow').off('click').on('click', function () {
            captureState();
            if ($element.hasClass('explorerselected')) {
                $element.remove();
                updateMobilePreview();
            }
        });
    
        if (element.explorerIndent) {
            $('.indentselected').removeClass('indent indentselected');
            $(element.explorerIndent).addClass('indentselected').get(0).scrollIntoView({
                behavior: 'auto', block: 'nearest', inline: 'start'
            });
        }
        if (scrollElement) {
            $element.get(0).scrollIntoView({
                behavior: 'auto', block: 'nearest', inline: 'start'
            });
        }
    
        window.lastSelectedElement = element;
    
        if ($('#mobilehidev2d').is(':visible')) {
            desktopHideCheckbox.prop('checked', $element.hasClass('hideonlyondesktop'));
            mobileHideCheckbox.prop('checked', $element.hasClass('hideonlyonmobile'));
        }
    }
    function clearSelection() {
        if (lastSelectedElement) {
            lastSelectedElement.classList.remove('explorerselected');
            if (lastSelectedElement.explorerIndent) {
                lastSelectedElement.explorerIndent.classList.remove('indentselected');
            }
        }
    }

    $(document).on('click', '.in910', function() {
        $('.interedit').removeClass('interedit');
        $(this).addClass('interedit');
    });

    function getSpecialLabel(element) {
        if (element.classList.contains('liveelement')) {
            return 'COMPONENT';
        } else if (element.classList.contains('liverow')) {
            return 'ROW';
        }
        return null;
    }

    function getColorForTag(tag, element) {
        if (element.classList.contains('liverow')) {
            return '#007bff';
        } else if (element.classList.contains('liveelement')) {
            return '#ffc107';
        }
        return '#28a745';
    }

    function getClassDisplay(element) {
        let classesArray = Array.from(element.classList).filter(cls => !excludedClasses.includes(cls));
        return classesArray.length > 0 ? `<span style="font-size: smaller;"> (${classesArray.join(' ')})</span>` : '';
    }

    exploreElements(target);
}

$(document).on('contextmenu', '.indent, .indentselected', function(e) {
    e.preventDefault();
    $('#contextMenu').css({
        display: "block",
        left: "50%",
        top: "451px"
    }).data('clickedElement', this);

    if ($(this).data('tag') === 'IMG') {
        $('#contextMenu #edit, #contextMenu #component, #contextMenu #empty, #contextMenu #textarea').hide();
    } else if ($(this).data('tag') === 'COMPONENT') {
        $('#contextMenu #component , #contextMenu #textarea').hide();
    } else if ($(this).data('tag') === 'A') {
        $('#contextMenu #component, #contextMenu #empty, #contextMenu #textarea').hide();
    } else if ($(this).data('tag') === 'H4' || $(this).data('tag') === 'H5') {
        $('#contextMenu #component, #contextMenu #empty, #contextMenu #textarea').hide();
    } else if ($(this).data('tag') === 'P') {
        $('#contextMenu #component, #contextMenu #empty').hide();
    } else if ($(this).data('tag') === 'VIDEO') {
        $('#contextMenu #component, #contextMenu #edit, #contextMenu #empty, #contextMenu #textarea').hide();
    } else if ($(this).data('tag') === 'SCRIPT') {
        $('#contextMenu #component, #contextMenu #edit, #contextMenu #empty, #contextMenu #duplicate, #contextMenu #textarea').hide();
    } else if ($(this).data('tag') === 'TEXTAREA') {
        $('#contextMenu #component, #contextMenu #edit, #contextMenu #empty, #contextMenu #duplicate, #duplicate #delete').hide();
        $('#contextMenu #textarea').show();
        return false;
    } else if ($(this).data('tag') === 'LI' || $(this).data('tag') === 'H2' || $(this).data('tag') === 'H3' || $(this).data('tag') === 'OL') {
        $('#contextMenu #component, #contextMenu #empty, #contextMenu #textarea').hide();
    } else if ($(this).data('tag') === 'SOURCE' || $(this).data('tag') === 'TRACK') {
        $('#contextMenu #component, #contextMenu #edit, #contextMenu #empty, #contextMenu #duplicate, #contextMenu #textarea ').hide();
    } else {
        $('#contextMenu #edit, #contextMenu #component, #contextMenu #empty, #contextMenu #duplicate').show();
    }

    return false;
});

$('#contextMenu ul li').click(function() {
    var action = $(this).attr('id');
    var clickedElement = $('#contextMenu').data('clickedElement');
    switch (action) {
        case 'delete':
            captureState();
            var correspondingElement = $(clickedElement).data('linkedElement');
            $(correspondingElement).remove();
            $(clickedElement).remove();
            updateMobilePreview();
            break;
        case 'duplicate':
            duplicateElement(clickedElement);
            updateMobilePreview();
            break;
        case 'component':
            $('#addrow1x1a').click();
            break;
        case 'textarea':
            var textContent = $('.editor-input').val();
            $('.editor-input').parent().removeClass('edit-mode');
            if (textContent) {
                $('.editor-input').replaceWith(textContent);
            }
            break;
        case 'empty':
            captureState();
            $('.explorerselected').empty();
            updateMobilePreview();
            break;
        case 'close':
            break;
        case 'edit':
            editElement(clickedElement);
            break;
    }
    $('#contextMenu').hide();
});

$(document).not('#myhtmleditor').on('click', function() {
    $('#contextMenu').hide();
    $('.explorerselected').removeClass('explorerselected');
    updateMobilePreview();
});

function gotothelinkfunction(wheretogo) {
    document.getElementById("myModal").style.display = "block";
    $('#yesBtn').off('click').on('click', function () {
        window.open('https://www.pcrichard.com' + wheretogo, '_blank');
        document.getElementById("myModal").style.display = "none";
    });
}

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

var myEfficientFn = debounce(function() {
    // All the taxing stuff you do
}, 250);

window.addEventListener('resize', myEfficientFn);

runExplorerDebounced();
liverowactivy();
deleteElement(); // Ensure deleteElement is called during initialization

function cleartextarea() {
    var textContent = $('.editor-input').val();
    if (textContent) {
        $('.editor-input').parent().removeClass('edit-mode');
        $('.editor-input').replaceWith(textContent);
    }
}

function main() {
    console.log('function ran');

    const observerCallback = function(mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList' || mutation.type === 'subtree') {
                runExplorerDebounced();
                break;
            }
        }
    };

    const observerConfig = { childList: true, subtree: true };

    const observer = new MutationObserver(observerCallback);

    observer.observe(document.querySelector('#pullthecode2'), observerConfig);
}

main();