//changes jquery versions  // removed reset after delete

const $explorerContainer = $('#pullthecode2');
const $mobilePreview = $('#mobilepreview2');
const $pullTheCode = $('#pullthecode2');
const desktopHideCheckbox = $('#desktophidev2d');
const mobileHideCheckbox = $('#mobilehidev2d');
const debouncedUpdateMobilePreview = debounce(updateMobilePreview, 500);
var $in910 = $('.in910');
let lastSelectedElement = null;




let isShiftPressed = false;

document.addEventListener('keydown', function(event) {
    if (event.key === 'Shift') {
        isShiftPressed = true;
    }
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'Shift') {
        isShiftPressed = false;
    }
});

function selectAndHighlightElement(element, scrollElement = false) {
    const $pullthecode2 = $('#pullthecode2');
    const $element = $(element);

    if (!$element.length || !$pullthecode2.find($element).length) {
        return;
    }

    clearSelection();

    if (isShiftPressed) {
        $element.addClass('explorerselected , multiselected')
    } else {
        $('.explorerselected, .onblock, .interedit').removeClass('explorerselected onblock interedit');
        $('.multiselected').removeClass('multiselected')
        $element.addClass('explorerselected');
    }

    if (!$element.hasClass('liveelement')) {
        $element.addClass('onblock');
    } else {
        $element.addClass('interedit');
    }

    //this is new june 2024 added for A tag in explorer
    if($(element.explorerIndent).attr('data-tag') === 'A') {
        $('.indentselected').removeClass('indentselected')
        $(element.explorerIndent).addClass('indentselected')
        return false
       }

    $element.click();
    $('#contextMenu').hide();
    $('#myhtmleditor').val($element.html());

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




var runExplorerDebounced = debounce(function() {
    $('#explorer2').empty();
    const target = document.getElementById('pullthecode3');
    const explorer = document.getElementById('explorer2');

    const excludedClasses = [
        'informationcontent', 'layoutbuilder', 'sortable', 'layoutop2', 'experience-component',
        'experience-pcrs_assets-markup', 'liveelement', 'in910', 'layoutpale', 'layoutpale33',
        'layoutpale20', 'layoutpale25', 'layoutpale40', 'layoutpale50', 'layoutpale75',
        'layoutpale60', 'layoutpale80', 'layoutpale100', 'ui-sortable', 'ui-sortable-disabled',
        'liverow', 'droppable', 'ui-droppable', 'loading-lazy', 'promoimg21', 'ui-sortable-handle',
        'interedit', 'onblock', 'width50c2' , 'width50c3','timekeeper' , 'timekeeper21' , 'unselectable-text' , 'edit-mode'
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

            // Add an observer to detect deletion
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.removedNodes.forEach((removedNode) => {
                        if (removedNode === elements[i] && elements[i].explorerIndent) {
                            elements[i].explorerIndent.remove();
                            observer.disconnect();
                        }
                    });
                });
            });

            observer.observe(element, { childList: true, subtree: false });

            if (elements[i].children.length > 0) {
                exploreElements(elements[i], depth + 1, parentContainer);
            }
        }
    }

    



    function getSpecialLabel(element) {
        if (element.classList.contains('liveelement')) {
            return 'COMPONENT';

        }  else if (element.classList.contains('timekeeper')) {
            return 'TIME KEAPER ROW';
        }  else if (element.classList.contains('timekeeper21')) {
            return 'SCRIPT FOR DATES';
        } else if (element.classList.contains('liverow')) {
            return 'ROW';
        } else if (element.classList.contains('customspacer')) {
        return 'SPACER';
    }


        return null;
    }

    function getColorForTag(tag, element) {
        if (element.classList.contains('liverow')) {
            return '#007bff';
        } else if (element.classList.contains('liveelement')) {
            return '#ffc107';
        } else if (element.classList.contains('customspacer')) {
            return '#9c27b0';
        }
        return '#28a745';
    }

    function getClassDisplay(element) {
        let classesArray = Array.from(element.classList).filter(cls => !excludedClasses.includes(cls));
        return classesArray.length > 0 ? `<span style="font-size: smaller;"> (${classesArray.join(' ')})</span>` : '';
    }

    exploreElements(target);
}, 250);

// Add this event listener to handle deletions in #pullthecode2
const target = document.getElementById('pullthecode2');
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.removedNodes.forEach((removedNode) => {
            if (removedNode.nodeType === Node.ELEMENT_NODE) {
                if (removedNode.explorerIndent) {
                    removedNode.explorerIndent.remove();
                }
            }
        });
    });
});

observer.observe(target, { childList: true, subtree: true });



function deleteElement() {
    $('.deleterow').off('click').on('click', function() {
        debouncedCaptureState();

        // Get the elements to be deleted
        const elementsToDelete = document.querySelectorAll('.explorerselected');

        // Apply the transition class
        elementsToDelete.forEach(element => {
            element.classList.add('delete-transition');
        });

        // Wait for the transition to complete
        setTimeout(() => {
            // Remove the elements from the DOM
            elementsToDelete.forEach(element => {
                if (element && element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            });
            debouncedUpdateMobilePreview();
            //$('#clearandrestartbuttonrefresh').click()
        }, 500); // Match the duration of the CSS transition
       
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

$('#EditandSubmitAL').off('click').on('click', function () {
    $('.explorerselected').html($('#myhtmleditor').val());
    debouncedUpdateMobilePreview() ;
});


function atag(wheretogo) {
  
    var target = $(e.target);
    if (!target.is('a')) {
        target = target.closest('a');
    }
    e.preventDefault();
    var wheretogo = target.attr('href');
    gotothelinkfunction(wheretogo);

    /*
 var target = $(e.target);
        if (!target.is('a')) {
            target = target.closest('a');
        }
        e.preventDefault();
        var wheretogo = target.attr('href');
        gotothelinkfunction(wheretogo);

    */
    return false
}



$(".draggable").off('draggable').draggable({
    revert: "valid",
    start: function() {
        $('#pullthecode2').css('opacity' , '0.7')
    },
    stop: function() {
        $('#pullthecode2').css('opacity' , '1');
    
    }
});

function releaseMemory() {
    if (window.intervalId) clearInterval(window.intervalId);
    if (window.timeoutId) clearTimeout(window.timeoutId);

    console.log('Memory released');

    if (Array.isArray(window.largeArray)) window.largeArray.length = 0;
    if (typeof window.largeObject === 'object') {
        Object.keys(window.largeObject).forEach(key => delete window.largeObject[key]);
    }

}

function checkADACompliance() {
    const codeDiv = document.getElementById('pullthecode2');
    const codeAsHTML = codeDiv.innerHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

    // Create a temporary element to hold the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = codeAsHTML;

    // Append the temporary element to the body
    document.body.appendChild(tempDiv);

    // Run axe-core on the temporary element
    axe.run(tempDiv, function (err, results) {
      if (err) throw err;

      const resultsDiv = document.getElementById('results21aaa');

      // Filter out "duplicate-id" violations
      const filteredViolations = results.violations.filter(violation => violation.id !== 'duplicate-id');

      if (filteredViolations.length) {
        filteredViolations.forEach(violation => {
          const violationDiv = document.createElement('div');
          violationDiv.className = 'violation';

          const violationTitle = document.createElement('h3');
          violationTitle.textContent = violation.id;

          const violationDescription = document.createElement('p');
          violationDescription.textContent = violation.description;

          const violationHelp = document.createElement('p');
          violationHelp.innerHTML = `<a class="outsidelink" href="${violation.helpUrl}" target="_blank">Learn more</a>`;

          violationDiv.appendChild(violationTitle);
          violationDiv.appendChild(violationDescription);
          violationDiv.appendChild(violationHelp);

          violation.nodes.forEach(node => {
            const nodeElement = document.createElement('div');
            nodeElement.innerHTML = `<p><strong>Element:</strong> <code>${node.html}</code></p>`;
            nodeElement.innerHTML += `<p><strong>Target:</strong> ${node.target.join(', ')}</p>`;
            nodeElement.innerHTML += `<p><strong>Failure Summary:</strong> ${node.failureSummary}</p>`;
            violationDiv.appendChild(nodeElement);
          });

          resultsDiv.appendChild(violationDiv);
        });
      } else {
        resultsDiv.innerHTML = '<p>No accessibility issues found.</p>';
      }

      // Clean up by removing the temporary element
      document.body.removeChild(tempDiv);
    });
  }




function enabledrop() {
    $(".droppable").off('droppable').droppable({
        drop: function (event, ui) {
            
            var mysize = $(ui.draggable).attr('size');
            var mypale = $(ui.draggable).attr('pale');
           
            $('.interedit').removeClass('interedit');
            if (mysize !== undefined && mysize !== "") {
                $(this).append('<div class="' + mysize + ' in910 layoutpale interedit layoutpale' + mypale + '"></div>');
            }
            debouncedUpdateMobilePreview() ;
           releaseMemory() 
        }
    });
}

function editElement(clickedElement) {
    captureState();
    var targetElement = $(clickedElement).data('linkedElement');
    if (!$(targetElement).is('.edit-mode')) {
        var originalContent = $(targetElement).html();
        if (originalContent === undefined || originalContent === null) {
            originalContent = ''; // Default to empty string if originalContent is undefined or null
        }
        var textarea = $('<textarea>', {
            class: 'editor-input',
            id: 'editor-input22',
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














$(document).on('contextmenu', '.indent, .indentselected', function(e) {
    e.preventDefault();
    
    $(this).click()
    $('#contextMenu').css({
        display: "block",
        left: "50%",
        top: "451px"
    }).data('clickedElement', this);
    $('.cmenulist').hide()
    $('#converterh').hide()
    $('#converterh').show()
    $('#loadimage').hide()
    if ($(this).data('tag') === 'IMG') {
        $('#contextMenu #edit, #contextMenu #component, #contextMenu #empty, #contextMenu #textarea , #converterh').hide();
         $('#loadimage').show()
    } else if ($(this).data('tag') === 'COMPONENT') {
        $('#contextMenu #component , #contextMenu #textarea, #converterh').hide();
        $('.cmenulist').hide()
        $('.compaddsystem').show()

        
    } 
    else if ($(this).data('tag') === 'ROW') {
        $('.cmenulist, #converterh').hide()
        $('.rowaddsystem').show()
        $(' #adder-row-b, #adder-row-a').show()
    } 
    
    else if ($(this).data('tag') === 'A') {
        $('#contextMenu #component, #contextMenu #empty, #contextMenu #textarea, #converterh').hide();
    } else if ($(this).data('tag') === 'P') {
        $('#contextMenu #component, #contextMenu #empty ,#converterh').hide();
    } else if ($(this).data('tag') === 'VIDEO') {
        $('#contextMenu #component, #contextMenu #edit, #contextMenu #empty, #contextMenu #textarea, #converterh').hide();
    } else if ($(this).data('tag') === 'SCRIPT') {
        $('#contextMenu #component, #contextMenu #edit, #contextMenu #empty, #contextMenu #duplicate, #contextMenu #textarea, #converterh').hide();
    }else if ($(this).data('tag') === 'FIGURE' || $(this).data('tag') === 'DIV') {
        $('#contextMenu #component,  #contextMenu #empty,  #contextMenu #textarea, #converterh').hide();
    }else if ($(this).data('tag') === 'SCRIPT FOR DATES' ) {
        $('#contextMenu #component,  #contextMenu #empty,  #contextMenu #textarea, #converterh , #contextMenu #duplicate , #contextMenu #edit ').hide();
    }


    else if ($(this).data('tag') === 'TEXTAREA') {
        $('#contextMenu #component, #contextMenu #edit, #contextMenu #empty, #contextMenu #duplicate, #duplicate #delete, #converterh').hide();
        $('#contextMenu #textarea').show();
        return false;
    } else if ($(this).data('tag') === 'LI' || $(this).data('tag') === 'OL') {
        $('#contextMenu #component, #contextMenu #empty, #contextMenu #textarea , #converterh').hide();
    }
    
    else if 
    
    ($(this).data('tag') === 'H1' || $(this).data('tag') === 'H2' || $(this).data('tag') === 'H3' || $(this).data('tag') === 'H4' || $(this).data('tag') === 'h1' || $(this).data('tag') === 'h2' || $(this).data('tag') === 'h3' || $(this).data('tag') === 'h4' || $(this).data('tag') === 'h5' ) {
        $('#contextMenu #component, #contextMenu #empty, #contextMenu #textarea ').hide();
        $('#converterh').show()
    }
    
    
    else if ($(this).data('tag') === 'SOURCE' || $(this).data('tag') === 'TRACK') {
        $('#contextMenu #component, #contextMenu #edit, #contextMenu #empty, #contextMenu #duplicate, #contextMenu #textarea , #converterh').hide();
    } else {
        $('#contextMenu #edit, #contextMenu #component, #contextMenu #empty, #contextMenu #duplicate').show();
    }
//$(this).click()
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
            $('#contextMenu').hide();
            debouncedUpdateMobilePreview() ;
            $('#clearandrestartbuttonrefresh').click()
            break;
        case 'duplicate':
            duplicateElement(clickedElement);
            debouncedUpdateMobilePreview() ;
            break;


        case 'converterh':
                $('#customModalhtag').show()
                $('#contextMenu').hide();
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
            $(clickedElement).click()
            $('.explorerselected').empty();
            debouncedUpdateMobilePreview() ;
            break;
        case 'close':
            $('#contextMenu').hide();
            break;
        case 'edit':
            editElement(clickedElement);
            break;
          
    }
   // $('#contextMenu').hide();
   
});


$('#closeconverter').on('click', function() {
    $('#customModalhtag').hide()
})

$('#converhtagdoit').on('click' , function() {
converthtag = $('#htagselecterh').val()
converthtaghtml = $('.explorerselected').html()
var converthtag = $('#htagselecterh').val();
$('.explorerselected').each(function() {
    var currentTag = $(this).prop('tagName').toLowerCase();
    if (currentTag.startsWith('h')) {
        var newContent = $(this).html();
        var newElement = $('<' + converthtag + '/>').html(newContent).addClass('explorerselected');
        $(this).replaceWith(newElement);
    }
});
})

function setImportantStyle(element, property, value) {
    element.each(function() {
        this.style.setProperty(property, value, 'important');
    });
}

$('#converhtagdoitcolor').on('click', function() {
    var selectedColor = $('#htagselecterh21').val();
    setImportantStyle($('.explorerselected'), 'color', selectedColor);
});


$('#asdf1').off('click').on('click' , function() {
   add_selection = $('#adder-comp-a').val()
   $('.explorerselected').before('<div class="width'+add_selection+'c liveelement in910 layoutpale  layoutpale'+add_selection+'"></div>');

})

$('#asdf2').off('click').on('click' , function() {
    add_selection = $('#adder-comp-b').val()
    $('.explorerselected').after('<div class="width'+add_selection+'c liveelement in910 layoutpale  layoutpale'+add_selection+'"></div>');

})

$('#asdf3').off('click').on('click' , function() {
    add_selection = $('#adder-row-a').val()
    $('.explorerselected').before('<div class="width'+add_selection+'c layoutpale layoutpale'+add_selection+' liverow droppable onblock ui-droppable onblock"></div>')

})

$('#asdf4').off('click').on('click' , function() {
    add_selection = $('#adder-row-b').val()
    $('.explorerselected').after('<div class="width'+add_selection+'c layoutpale layoutpale'+add_selection+' liverow droppable onblock ui-droppable onblock"></div>')

})



$(document).not('#myhtmleditor').on('click', function() {
    $('#contextMenu').hide();
    $('.explorerselected').removeClass('explorerselected');
    debouncedUpdateMobilePreview() ;
});



function gotothelinkfunction(wheretogo) {

    document.getElementById("myModal").style.display = "block";
    $('#yesBtn').off('click').on('click', function () {


        if (wheretogo.includes('https://')) {
            window.open(wheretogo, '_blank');
            document.getElementById("myModal").style.display = "none";
        } else {
            window.open('https://www.pcrichard.com' + wheretogo, '_blank');
            document.getElementById("myModal").style.display = "none";

        }

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
   // runexplorer()
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


createnewlist = 1
listaddition = 0
layoutmode = 0
outsidelink = 0
outsidelink2 = 0
outsidelink3 = 0
choosehtag = '0'
mylisttype = 0;
var html = $('#pullthecode2').html()
var currentImage; // To keep track of the current right-clicked image
var selectedText = ''; // To keep track of the highlighted text
var savedSelection; // To keep track of the highlighted text selection
var colorswatch = 0;
var colorswatch2 = 0;
var headernewcolor = ''
var headernewcolor2 = 'style="color:#034694 !important"'
var htmlcodeyesno = 0;
var htmlcodeyesno2 = 0;
var faqyes = 0;
var mycount = 0
var addmut = 0;
var whatcheckingsizeview = 0;

// Restore --------------------------------------------------



// Initialize the diff-match-patch library
let dmp = new diff_match_patch();
let previousState = $('#pullthecode2').html();


let undoStack = [];
let redoStack = [];

// Function to capture the current state before making changes
function captureState() {
    const currentState = $('#pullthecode2').html(); // Adjust selector as needed
    undoStack.push(currentState);
    redoStack = []; // Clear redo stack since new action resets the future path
}

// Debounced version of captureState to reduce frequency
const debouncedCaptureState = debounce(captureState, 500);

function resetTransitionStyles() {

    $('#pullthecode2 .delete-transition').each(function() {
        $(this).removeClass('delete-transition').css('opacity', '1');
    });
}




// Restore --------------------------------------------------



function paragraphfunctions() {
    $('p , h2 , h3 , h4').not('.fr-element p').off('click').on('contextmenu', function (e) {
        e.preventDefault()
       
        $('.interedit').removeClass('interedit')
        $(this).parent('.in910').addClass('interedit')
        document.getElementById("myModalcontent").style.display = "block";

        $('#yesBtn99').on('click', function () {
            $('.interedit').empty()
            document.getElementById("myModalcontent").style.display = "none";
            $('#findthecode2').text($('#pullthecode2').html());

        })

        if ($(this).hasClass('clampclassd')) {
            $('#optionb4').prop('checked', true);
        }

        $('#yescopyBtn99').on('click', function () {
            var textToCopy = $('.interedit').children('p').text();
            navigator.clipboard.writeText(textToCopy).then(function () {
                console.log('Text copied to clipboard');
            }).catch(function (error) {
                console.error('Error copying text: ', error);
            });
            document.getElementById("myModalcontent").style.display = "none";
        })

        $('#closediag99').on('click', function () {
            document.getElementById("myModalcontent").style.display = "none";
            $('#optionb4').prop('checked', false);
        })
    })


    function toggleReadMore(ptagid) {

        $('.readmoreclampdbutton').on('click', function () {
            var currentText = $(this).text();
            $('#' + ptagid).toggleClass("expanded");
            if (currentText === "Read More") {
                $(this).text('Read Less');
                return false
            } else {
                $(this).text('Read More');
                return false
            }

        })

    }


    $('#optionb4').on('change', function () {
        if (this.checked) {
            $('.interedit p').addClass('clampclassd');
            ptagid = $('.interedit p').attr('id');
    
            // Remove any existing "Read More" buttons before adding a new one
            $('.interedit').find('span.readmoreclampdbutton').remove();
    
            $('.interedit').append('<span class="readmoreclampdbutton" onclick="toggleReadMore(\'' + ptagid + '\')">Read More</span>');
            toggleReadMore(ptagid);
            $('.hidescripts').show();
            return false;
        } else {
            $('.interedit p').removeClass('clampclassd');
            $('.interedit').find('span.readmoreclampdbutton').remove();
        }
    });



}



$('.openclose').on('click', function () {
    var opendropdown = '.' + $(this).attr('openclose'); // Get the target element.

    // Hide all other elements except the current dropdown to avoid it being affected by `.hide()`.
    $('.toolboxlayoutoptions, .tools').not(opendropdown).hide();

    // Toggle the current dropdown based on its visibility.
    if ($(opendropdown).is(':visible')) {
        $(opendropdown).slideUp();
        $(this).find('.myindicator').html('+'); // Update the indicator to '+'
    } else {
        $(opendropdown).slideDown();
        $(this).find('.myindicator').html('-'); // Update the indicator to '-'
    }
});




$('.thetopbox').on('click', function () {
    whichboxtoopen = $(this).attr('whatbox')
    $('.thetopbox').css('background-color', 'transparent').css('color', '#f7f7f7')
    $(this).css('background-color', '#191818').css('color', '#fff')

    if (whichboxtoopen === 'Tools') {


        $('#myhtmleditor').show()
        $('.internalscroller').show()
        $('.toolboxhide').show()
        $('.toolboxlayoutoptions').hide()
        $('#Importer').hide()
        $('.htmlimporter').hide()
        $('.myrowbuilder21').hide()
        $('.myrowbuilder').hide()
        $('#layoutbuilder-oc2').hide()
        $('#layoutbuilder-oc').hide()
        $('.layoutbuilder-oc').hide()
        $('.blogbuilder').hide()
        $('#explorerpanel').hide()
       // $('.internalscroller').css('max-height' , $(window).height())

    }
    if (whichboxtoopen == 'Rows') {
        $('#layoutbuilder-oc2').css('display', 'none')
        $('#myhtmleditor').show()
        $('.internalscroller').show()
        $('.titlebuilder-oc').hide()
        $('.imagebuilder').hide()
        $('.videocomponent').hide()
        $('.mylinkbuilder').hide()
        $('.openclose').hide()
        $('.toolboxhide').show()
        $('.toolboxlayoutoptions').hide()
        $('.layoutbuilder-oc').hide()
        $('.myrowbuilder').slideDown()
        $('#Importer').hide()
        $('.htmlimporter').hide()
        $('.blogbuilder').hide()
        $('#explorerpanel').hide()

    }
    if (whichboxtoopen == 'Import') {
        $('.layoutbuilder-oc').hide()
        $('.mylinkbuilder').hide()
        $('.myrowbuilder').hide()
        $('.toolboxlayoutoptions').hide()
        $('#layoutbuilder-oc2').css('display', 'none')
        $('.titlebuilder-oc').hide()
        $('#Importer').show()
        $('#Importer').click()
        $('.blogbuilder').hide()
        $('#explorerpanel').hide()
        $('#layoutbuilder-oc').hide()
        $('.codechanger').show()

    }
    if (whichboxtoopen == 'Layout') {

        $('#layoutbuilder-oc2').css('display', 'block')
        $('#myhtmleditor').hide()
        $('.internalscroller').hide()
        $('.toolboxhide').hide()
        $('.toolboxlayoutoptions').show()
        $('.layoutbuilder-oc').show()
        $('#layoutbuilder-oc').show()
        $('#Importer').hide()
        $('.htmlimporter').hide()
        $('.blogbuilder').hide()
        $('#explorerpanel').hide()
    }
    if (whichboxtoopen == 'Blog') {
        $('#layoutbuilder-oc2').css('display', 'none')
        $('#myhtmleditor').hide()
        $('.internalscroller').hide()
        $('.toolboxhide').hide()
        $('.toolboxlayoutoptions').hide()
        $('#Importer').hide()
        $('.htmlimporter').hide()
        $('.layoutbuilder-oc').hide()
        $('.blogbuilder').show()
        $('#layoutbuilder-oc').hide()
        $('#explorerpanel').hide()
    }

    if (whichboxtoopen == 'FileExplorer') {
        $('#layoutbuilder-oc2').css('display', 'none')
        $('.internalscroller').hide()
        $('.toolboxhide').hide()
        $('.toolboxlayoutoptions').hide()
        $('#Importer').hide()
        $('.htmlimporter').hide()
        $('.layoutbuilder-oc').hide()
        $('#layoutbuilder-oc').hide()
        $('#explorerpanel').show()
        $('#myhtmleditor').show()
        $('.toolboxhide').show()
    }

})


var darkvalue = 0

$('.openthematrix').on('click', function () {
    $('#myModalcontentviewers').hide()
    var whatmatrix = '#' + $(this).attr('mymatrix');
    switch (whatmatrix) {
        case '#mymatrix2':
        $('img.loading-lazy').each(function () {
            $(this).attr('src', $(this).attr('data-src'))
           
        })
      $('#results21aaa').hide()
        $('#mobilepreview2').hide()
        $('#mymatrix6').hide()
        $('#pullthecode2').animate({'width' : '65%'}).show().css('min-height' , $(document).height() -100).css('max-height' , $(document).height() -100)
        $('#resizable-div').hide().animate({'width' : '72%'}).show()
        $('#sidetoolset').show()
        $('.stage2 , #pullthecode2 ').show();
        $('#programming').show()
        $('#explorer2').parent('div').show()
        $('#mymatrix3').hide()
        $('#explorer2').css('max-height' ,'500px')
        $('#mobilepreview2').show()
        $('#mymatrix1').hide()
        $('#explorer2').show()
        $('#mymatrix6').hide()
        $('.codechanger').show()
        break;
        case '#mymatrix4':
            var element = document.getElementById("pullthecode3");
            if (element) {
                element.style.removeProperty('width');
                element.style.removeProperty('transform');
            }
    
                $('#mymatrix4').slideDown()
                $('#codeloaderpcrview').html($('#pullthecode2').html())
                $('#programming, #resizable-div').hide();
                $('#fullembedcodeddd').show()
                $('#fullinterface').hide()
                $('#mymatrix6').hide()
                $('body').css('background-color', '#333')
    
                $('#codeloaderpcrview .readmoreclampdbutton').on('click', function () {
                    $(this).prev('p.clampclassd').toggleClass('expanded');
                })
    
    
    
                $('.readmoreclampdbutton').on('click', function () {
                    var currentText = $(this).text();
                    $('#' + ptagid).toggleClass("expanded");
                    if (currentText === "Read More") {
                        $(this).text('Read Less');
                        return false
                    } else {
                        $(this).text('Read More');
                        return false
                    }
                })
    
    
    
    
                if (whatcheckingsizeview == 2) {
                    $('#pcrmobileview').click()
                }
                break;
        case '#mymatrix9':
                    $('.stage2 , #pullthecode2 , #mobilepreview2').hide();
                    $('.colorlegend').hide()
                    $('#versionList').parent('div').parent('div').hide()
                    $('#programming').hide()
                    $('#resizable-div').animate({'width' : '100%'})
                    $('#explorer2').hide()
                    $('#mymatrix9').show()
                    $('#sidetoolset').hide()
                    $('#mymatrix1').hide()
                    $('#mymatrix3').hide().removeClass('bottomclassviewers')
                    $('#mymatrix6').hide()

                    break;
        case '#mymatrix1':
           
            $('#resizable-div').animate({'width' : '71%'} , function() {
                $('#programming').show()
            })
                    $('#mymatrix6').hide()
                    $('#explorer2').hide()
                    $('#mymatrix3').removeClass('bottomclassviewers').hide()
                    $('#sidetoolset').hide()
                    $('#mymatrix1').show()
                    var element = document.getElementById("pullthecode3");
                    if (element) {
                        element.style.removeProperty('width');
                        element.style.removeProperty('transform');
                    }
            
            
                        $('.stage2 , #pullthecode2 , #mobilepreview2').hide();
                        $('.colorlegend').hide()
                        $('#hidemainmobile').hide()
                        $('#thisisthefinalcode').show()
                        $('#results21aaa').show()
                      $('.codechanger').hide()
            
                        $('img.loading-lazy').each(function () {
                            $(this).attr('src', '#')
                        })
            
            
                        $('#findthecode2').text($('#pullthecode2').html());
            
                        var divElement = document.getElementById('thisisthefinalcode');
            
            // Get the text content of the div
            var textContent = divElement.textContent || divElement.innerText;
            
            // Get the character count
            var characterCount = textContent.length;
            
                        $('#charactercount').html('Character Count ' + '<span style="color:yellow">'+characterCount+' </span>' + ' - Maximum ECP to Salesforce Characters is 16,000' )
            
                        var element = $('#findthecode2');
                        var content = element.text();
            
                        // Define the words you want to remove
                        var wordsToRemove = ['liveelement', 'in910', 'layoutpale', 'layoutpale50', 'liverow', ' ui-droppable', 'droppable',
                            'ui-droppable', 'layoutbuilder', 'sortable', 'layoutop2', 'layoutpale100',
                            'layoutpale30', 'layoutpale20', 'layoutpale33', 'onblock', 'interedit', 'edit-mode', 'explorerselected',
                            'https://staging-na01-pcrichard.demandware.net/on/demandware.static/-/Library-Sites-PCRichardSharedLibrary/default/dw0d66f82d/',
                            'promoimg21', 'ui--disabled', 'style=""', 'ui--handle ', 'ui- ui--handle','unselectable-text',
                            'https://staging-na01-pcrichard.demandware.net', 'programoverflow', '/on/demandware.static/-/Library-Sites-PCRichardSharedLibrary/default/dw3744730c/' , 'https://www.pcrichard.com/on/demandware.static/-/Sites-pcrichard-master-articles-catalog/default/dw543ecf73'
                        ];
            
                        // Loop through the words and remove them from the content
                        wordsToRemove.forEach(function (word) {
                            var pattern;
                            if (word.startsWith('ui-')) {
                                // Special pattern for strings starting with 'ui-', remove leading/trailing spaces in pattern
                                pattern = new RegExp('(?:^|\\s)' + word + '(?=\\s|$)', 'g');
                            } else {
                                // Default pattern using word boundaries
                                pattern = new RegExp('\\b' + word + '\\b', 'g');
                            }
                            content = content.replace(pattern, '');
                        });
            
                        // Set the modified content back to the element
                        element.text(content.replaceAll('&times;', 'x').replaceAll('&alpha;', 'a').replaceAll('&reg;', '<span class="myregd"></span>').replaceAll('&trade;', '<span class="mytraded"></span>').replaceAll('&mdash;', '-').replaceAll('&ndash;', '-').replaceAll('™', '<span class="mytraded"></span>').replaceAll('®', '<span class="myregd"></span>').replaceAll('°', '&deg;'));
            
            
            
            
                        finalcheck = $('#findthecode2').html()
                        $('#findthecode2').html(finalcheck.replaceAll('α', 'a').replaceAll('×', 'x').replaceAll('–', '-').replaceAll('’', "'").replaceAll('class="width100c     ui-', 'class="width100c').replaceAll('&times;', 'x').replaceAll('&alpha;', 'a').replaceAll('&reg;', '<span class="myregd"></span>').replaceAll('&trade;', '<span class="mytraded"></span>').replaceAll('&mdash;', '--').replaceAll('&ndash;', '-').replaceAll('™', '<span class="mytraded"></span>').replaceAll('®', '<span class="myregd"></span>').replaceAll('°', '&deg;'))
                        checkADACompliance();
                        break;
        case '#mymatrix6':
            $('#explorer2').hide()
            $('#mymatrix3').hide()
                            $('.stage2 , #pullthecode2 , #mobilepreview2').hide();
                            $('#hidemainmobile').hide()
                            $('.colorlegend').hide()
                            $('#mymatrix6').show()
                            $("#sidetoolset").hide()
                            $('#mymatrix1').hide()
                            listAllDriveFiles();
                            
                            break;
        case '#mymatrix-dark':
if(darkvalue === 0) {
    darkvalue = 1
    $('#pullthecode2').css('filter', 'invert(100%)');
} else {
    darkvalue = 0
    $('#pullthecode2').css('filter', 'invert(0%)');
}

        
        break;
        case '#mymatrix-hmobile':      
        var newHeightForExplorer = $(window).height();
        $('#mobilepreview2').hide()
        $('#mymatrix6').hide()
        $('#pullthecode2').hide().animate({'width' : '65%'}).fadeIn()
        $('#resizable-div').hide().animate({'width' : '72%'}).fadeIn()
        $('#explorer2').show().animate({'max-height': newHeightForExplorer}, 400);
        $('#sidetoolset').show()
        $('.stage2 , #pullthecode2 ').show();
        $('#programming').show()
        $('#explorer2').parent('div').show()
        $('#mymatrix3').hide()
        break;
        case '#mymatrix3':

            var html = $('#pullthecode3').html()
            var beautifiedHtml = beautifyHtml(html);
            $('#beautycode').val(beautifiedHtml)
            $('#mymatrix3').css('max-height' , $(window).height()-70+'px').removeClass('bottomclassviewers').css('width' , '44%').css('position' , 'relative')
            $('#pullthecode2').css('max-height' , $(window).height()-80+'px')
            $('#mymatrix3').css('height' , $(window).height()-70+'px').css('margin-top' , '0%')
            $('#pullthecode2').css('height' , $(window).height()-80+'px')
            $('#mymatrix6').hide()
            $('#programming').hide()
            $('#sidetoolset').hide()
            $('#mymatrix2').hide()
            $('#mobilepreview2').parent('div').hide()
            $('#resizable-div').delay(600).animate({'width' : '100%'})
            $('#pullthecode2').hide().animate({'width' : '53%'}).fadeIn()
            $('#beautycode').animate({'height' : $('#pullthecode2').height()-60})
            
            $('#mymatrix3').hide().animate({'width' : '44%'}).fadeIn()
            $('#beautycode').animate({'min-height' : $(document).height() - 145}).animate({'max-height' : $(document).height() - 145})
            break;
        case '#mymatrix-review':
$('#sidetoolset').hide()
            $("#pullthecode2").resizable({
                minWidth: 1024
            });
            $("#pullthecode2").animate({
                'max-height': '400'
            })
            $("#pullthecode2").animate({
                'min-height': '400'
            })

            $("#mymatrix3").animate({
                'width': '100%' , 'max-height' : '200px'
            }).css('margin-top' , '0%')

            $("#beautycode").animate({
               'max-height' : '200px'
            })

            $('#mymatrix3').fadeIn()


$('#pullthecode2').animate({'width' : '94%'})
$('#resizable-div').animate({'width' : '100%'})
$('#mobilepreview2').parent('div').hide()
$('#programming').hide()

            break;
        case '#mymatrix7':
            $('#outslidepluginsout').attr('src', 'help.html')
            $('#pluginsandtools').click()
            break;

               $('#myModalcontentviewers').click()
                 //$('#firstmatrix').click()
                 $('#pullthecode2').css('filter', 'invert(0%)').css('width' , '65%').css('min-height' , '650px');
                 $('#sidetoolset').show()
                 $('#explorer2').show().animate({'max-height' : '540px'})
                 $('#mobilepreview2').show().parent('div').show()
                 $('#mymatrix3').hide()
                 $('#programming').show()
                 $('#resizable-div').animate({'width' : '72%'})
                 $('#matrix3').hide()
                break;
                        } 
})


$('#showversioningmodal').on('click' , function() {
    $('#versioningmodalshow').show();
    
})

$('#CloseVersionModal').on('click' , function() {
    $('#versioningmodalshow').fadeOut()
})

$('#pcrdesktopview').on('click', function () {
    whatcheckingsizeview = 0
    $("#fullembedcodeddd2").animate({
        'width': '1024px'
    })
    $('#fullembedcodeddd').css('max-width', 'none').css('margin-left', '0%')
    $('.morebutt').not('#closeembed').css('background-color', '#fff').css('color', '#333')
    $(this).css('background-color', '#333').css('color', '#fff')
    $('body').css('background-color', '#333')
    $('#codeloaderpcrview').find('.makeit100now').each(function () {
        $(this).removeClass('makeit100now')
    });
    $('#codeloaderpcrview').find('.makeit50now').each(function () {
        $(this).removeClass('makeit50now')
    })
    $('#codeloaderpcrview').find('.hideonlyonmobile').each(function () {
        $(this).show()
    })
    $('#codeloaderpcrview').find('.hideonlyondesktop').each(function () {
        $(this).hide()
    })

    $("#fullembedcodeddd2").resizable({
        minWidth: 1024
    });
    $("#fullembedcodeddd2").animate({
        'max-height': '900'
    })

})


$('#pcrtabletview').on('click', function () {
    whatcheckingsizeview = 1
    $("#fullembedcodeddd2").animate({
        'width': '768px'
    })
  


    $('#fullembedcodeddd').css('max-width', '769px').css('margin-left', '6%')
    $('.morebutt').not('#closeembed').css('background-color', '#fff').css('color', '#333')
    $(this).css('background-color', '#333').css('color', '#fff')
    $('body').css('background-color', '#333')
    $('#codeloaderpcrview').find('.makeit100now').each(function () {
        $(this).removeClass('makeit100now')
    });
    $('#codeloaderpcrview').find('.makeit50now').each(function () {
        $(this).removeClass('makeit50now')
    })
    $('#codeloaderpcrview').find('.hideonlyonmobile').each(function () {
        $(this).show()
    })
    $('#codeloaderpcrview').find('.hideonlyondesktop').each(function () {
        $(this).hide()
    })

    $("#fullembedcodeddd2").resizable({
        minWidth: 768
    });

    $("#fullembedcodeddd2").animate({
        'max-height': '800'
    })


})



$('#pcrmobileview').on('click', function () {
    whatcheckingsizeview = 2
    $("#fullembedcodeddd2").animate({
        'width': '390px'
    })

    $("#fullembedcodeddd2").animate({
        'max-height': '500px'
    })
    $('#fullembedcodeddd').css('max-width', '400px').css('margin-left', '7.85%')
    $('.morebutt').not('#closeembed').css('background-color', '#fff').css('color', '#333')
    $(this).css('background-color', '#333').css('color', '#fff')
    $('body').css('background-color', '#333')

    $('#codeloaderpcrview').find('.width50c2').each(function () {
        $(this).addClass('makeit100now');
    });

    $('#codeloaderpcrview').find('.width50c3').each(function () {
        $(this).addClass('makeit50now')
    })


    $('#codeloaderpcrview').find('.hideonlyonmobile').each(function () {
        $(this).hide()
    })

    $('#codeloaderpcrview').find('.hideonlyondesktop').each(function () {
        $(this).show()
    })
    $("#fullembedcodeddd2").resizable({
        minWidth: 320
    });

})


$('#closeembed').on('click', function () {
    // $('#pcrdesktopview').click()
    $('#mymatrix4').hide()
    $('#programming').show()
    $('#resizable-div').show()
    $('#firstmatrix').click()
    $('#fullembedcodeddd').hide()
    $('#fullinterface').show()
    $('body').css('background-color', '#333')
    $('#codeloaderpcrview').find('.width50c2').each(function () {
        $(this).addClass('makeit100now');
    });

    $('#codeloaderpcrview').find('.width50c3').each(function () {
        $(this).addClass('makeit50now')
    })
})

$('#whatsnewwb').on('click', function () {
    $('#pluginsandtools').click()
    $('#outslidepluginsout').attr('src', 'release-notes.html')
})

$('.outsideplugins').on('click', function () {
    wto = $(this).attr('whaturl');
    $('#outslidepluginsout').attr('src', wto)
    $('.outsideplugins').css('background-color', '#000')
    $(this).css('background-color', '#333')
})

document.getElementById('mytoolsview').addEventListener('change', function () {
    if (this.checked) {
        $('#programming').addClass('fullscreend').hide()
       // $('#fullscreenresort').css('width', '80%').css('margin-left', '2%')
        $('#resizable-div').delay(500).animate({
            width: '100%'
        }, 500);
        $('#legend').hide()
        $('.hamburger').show()
        $('.textaligner svg').css('width', '100%')
        $('.hideinfullscreen').hide()
        $('.imgbuild').css('width', '96%')

    } else {
        $('.textaligner svg').css('width', '40%')
       // $('.fullscreenresort').css('widht', '100%').css('margin-left', '0%')
        $('.hamburger').hide()
        $('.fullscreenmode').css('padding', '1% ')
        $('#resizable-div').css('width', '70%')
        $('#programming').removeClass('fullscreend').fadeIn()
        $('.internalscroller').css('max-height', '725px').css('overflow-y', 'auto')
        $('#legend').show()
        $('.hideinfullscreen').show()
        $('.mymobile , #pullthecode2').css('float', 'left')
        $(' #pullthecode2').css('width', '64%')
        $('.imgbuild').css('width', '98%')
    }


})

$('.hamburger').on('click', function () {
    $('#programming').slideToggle()
})




document.getElementById('mysort').addEventListener('change', function () {
    if (this.checked) {
        $("#pullthecode3").sortable({
            disabled: false
        });
        $('.informationcontent').children().css('cursor', 'grab');
    } else {
        $("#pullthecode3").sortable({
            disabled: true
        });
        $('.informationcontent').children().css('cursor', '');
     
        $('#clearandrestartbuttonrefresh').click()
    }
});

document.getElementById('mysortcomponents').addEventListener('change', function () {
    const sortableElements = $("div.layoutpale").not('h2 , p');

    if (this.checked) {
        sortableElements.sortable({
            disabled: false
        });
    } else {

        sortableElements.sortable({
            disabled: true
        });
        sortableElements.sortable('disable');
        $('.informationcontent').children().css('cursor', '');
        $('#clearandrestartbuttonrefresh').click();

    }
});












$('#clearandrestartbuttonrefresh').on('click', function () {
    location.reload()
})



$('.pcrcloseicon').on('click', function () {
    $('#codeloaderpcrview').toggle()
})

function updateSliderValuerow(value) {
    document.getElementById('sliderValuerow').textContent = value;
}

function updateSliderValuecomp(value) {
    document.getElementById('sliderValuecomp1').textContent = value;
}

$('#versionList').on('change' , function() {
   $('#revertVersionBtn').click()
})



$('.hover-item').each(function () { // Iterate over each .hover-item
    var timeoutId; // Variable to hold the timeout, unique to each .hover-item

    $(this).hover(
        function () {
            // Clear any timeout to prevent it from hiding prematurely
            clearTimeout(timeoutId);
            // Show this popup
            $(this).find('.popup').removeClass('hidden').addClass('visible');
        },
        function () {
            // Reference to the popup that needs to be hidden
            var $popup = $(this).find('.popup');
            // Set a timeout to hide this popup
            timeoutId = setTimeout(function () {
                $popup.removeClass('visible').addClass('hidden');
            }, 300); // Adjust delay here
        }
    );
});


$('.clearsection').on('click', function () {
    captureState()
    $('.explorerselected').empty()
   
})

function beautifyHtml(html) {
    var tab = '\t'; // You can choose something else for indentation
    var result = '';
    var indent = '';

    html.split(/>\s*</).forEach(function (element) {
        if (element.match(/^\/\w/)) {
            indent = indent.substring(tab.length); // Decrease indent
        }

        result += indent + '<' + element + '>\n';

        if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("input")) { // Increase indent
            indent += tab;
        }
    });

    return result.substring(1, result.length - 3);
}

document.getElementById('mobilehidev2d').addEventListener('input', function () {
    if (this.checked) {
        $('.explorerselected').addClass('hideonlyonmobile')
        updateMobilePreview()
       
    } else {
        $('.explorerselected').removeClass('hideonlyonmobile')
        updateMobilePreview()
       
    }

})


document.getElementById('desktophidev2d').addEventListener('input', function () {
    if (this.checked) {
        $('.explorerselected').addClass('hideonlyondesktop')
        updateMobilePreview()
       
    } else {
        $('.explorerselected').removeClass('hideonlyondesktop')
        updateMobilePreview()
       
    }

})


/*---former convert
$('.texttype').click(function () {
    captureState()
    // Assuming this function captures the current state for undo functionality
   var selection = window.getSelection();
   if (!selection.rangeCount) return;
   var selectedText = selection.toString();
   var textWrapper = $(this).val();
   var headerNewColor = ''; // Assuming this variable is declared elsewhere or will be used later

   // Create a new HTML element with the selected text wrapped in the specified tag
   var contentWrapped = '<' + textWrapper + ' ' + headerNewColor + '>' + selectedText + '</' + textWrapper + '>';

   // Get the selected range
   var range = selection.getRangeAt(0);

   // Create a new document fragment with the wrapped content
   var fragment = range.createContextualFragment(contentWrapped);

   // Replace the selected text with the new HTML
   range.deleteContents();
   range.insertNode(fragment);

   // Collapsing the range after insertion is optional and depends on the desired UX
   // range.collapse(false);

   // Clear the selection to prevent confusion
   selection.removeAllRanges();

   // Assuming you're doing some post-processing on another element's content
   var element = $('#findthecode2');
   var content = $('#pullthecode2').html(); // Use .html() instead of .text() if you're working with HTML content

   // Your content replacement logic seems to be cleaning up specific HTML entities and classes
   // Ensure this logic is correctly applied to the content you're manipulating
   content = content.replaceAll('&times;', 'x')
       .replaceAll('&alpha;', 'a')
       .replaceAll('&reg;', '<span class="myregd"></span>')
       .replaceAll('&trade;', '<span class="mytraded"></span>')
       .replaceAll('&mdash;', '-')
       .replaceAll('&ndash;', '-')
       .replaceAll('™', '<span class="mytraded"></span>')
       .replaceAll('®', '<span class="myregd"></span>');

   element.html(content); // Use .html() if the content includes HTML tags
   
   // Load new content after updating the DOM
   runexplorer()
   $('#mobilepreview2').html($('#pullthecode2').html());
});

*/

$('.texttype').off('click').on('click', function () {
    captureState(); // Assuming this function captures the current state for undo functionality

    var selection = window.getSelection();
    if (!selection.rangeCount) return;
    var selectedText = selection.toString();
    var textWrapper = $(this).val();
    var headerNewColor = ''; // Assuming this variable is declared elsewhere or will be used later

    // Create a new HTML element with the selected text wrapped in the specified tag
    var contentWrapped = '<' + textWrapper + ' ' + headerNewColor + '>' + selectedText + '</' + textWrapper + '>';

    // Get the selected range and the original content
    var range = selection.getRangeAt(0);
    var originalContent = range.startContainer.nodeValue;
    var startText = originalContent.substring(0, range.startOffset);
    var endText = originalContent.substring(range.endOffset, originalContent.length);

    // Create a new document fragment with the wrapped content and the remaining parts
    var fragment = document.createDocumentFragment();
    fragment.appendChild(document.createTextNode(startText)); // Adds text before the selection
    fragment.appendChild(range.createContextualFragment(contentWrapped)); // Adds the wrapped selection
    fragment.appendChild(document.createTextNode(endText)); // Adds text after the selection

    // Replace the original content in the node with the new content
    range.startContainer.nodeValue = '';
    range.insertNode(fragment);

    // Clear the selection to prevent confusion
    selection.removeAllRanges();

    // Load new content after updating the DOM
   
    updateMobilePreview()
    $('#beautycode').val($('#pullthecode3').html())
});


$('#colorDisplay').off('click').on('click', function () {
    captureState(); // Assuming this function captures the current state for undo functionality

    var selection = window.getSelection();
    if (!selection.rangeCount) return;
    var selectedText = selection.toString();
    var textWrapper = "span style='color:"+$(this).css('background-color')+"'"
    var headerNewColor = ''; // Assuming this variable is declared elsewhere or will be used later

    // Create a new HTML element with the selected text wrapped in the specified tag
    var contentWrapped = '<' + textWrapper + ' ' + headerNewColor + '>' + selectedText + '</' + textWrapper + '>';

    // Get the selected range and the original content
    var range = selection.getRangeAt(0);
    var originalContent = range.startContainer.nodeValue;
    var startText = originalContent.substring(0, range.startOffset);
    var endText = originalContent.substring(range.endOffset, originalContent.length);

    // Create a new document fragment with the wrapped content and the remaining parts
    var fragment = document.createDocumentFragment();
    fragment.appendChild(document.createTextNode(startText)); // Adds text before the selection
    fragment.appendChild(range.createContextualFragment(contentWrapped)); // Adds the wrapped selection
    fragment.appendChild(document.createTextNode(endText)); // Adds text after the selection

    // Replace the original content in the node with the new content
    range.startContainer.nodeValue = '';
    range.insertNode(fragment);

    // Clear the selection to prevent confusion
    selection.removeAllRanges();

    // Load new content after updating the DOM
   
    updateMobilePreview()
    $('#beautycode').val($('#pullthecode3').html())
});






$('#colorPickerManuelactivate').off('click').on('click', function () {
    captureState(); // Assuming this function captures the current state for undo functionality
    var selection = window.getSelection();
    if (!selection.rangeCount) return;
    var selectedText = selection.toString();
    var textWrapper = "span style='color:"+$('#colorPickerManuel').text()+"'"
    var headerNewColor = ''; // Assuming this variable is declared elsewhere or will be used later

    // Create a new HTML element with the selected text wrapped in the specified tag
    var contentWrapped = '<' + textWrapper + ' ' + headerNewColor + '>' + selectedText + '</' + textWrapper + '>';

    // Get the selected range and the original content
    var range = selection.getRangeAt(0);
    var originalContent = range.startContainer.nodeValue;
    var startText = originalContent.substring(0, range.startOffset);
    var endText = originalContent.substring(range.endOffset, originalContent.length);

    // Create a new document fragment with the wrapped content and the remaining parts
    var fragment = document.createDocumentFragment();
    fragment.appendChild(document.createTextNode(startText)); // Adds text before the selection
    fragment.appendChild(range.createContextualFragment(contentWrapped)); // Adds the wrapped selection
    fragment.appendChild(document.createTextNode(endText)); // Adds text after the selection

    // Replace the original content in the node with the new content
    range.startContainer.nodeValue = '';
    range.insertNode(fragment);

    // Clear the selection to prevent confusion
    selection.removeAllRanges();

    // Load new content after updating the DOM
   
    updateMobilePreview()
    $('#beautycode').val($('#pullthecode3').html())
});

















$('.textaligner3').off('click').on('click', function () {
    captureState()
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);
        var brElement = document.createElement('br');
        range.insertNode(brElement);
        // Batch DOM update: wrap text nodes in a single operation
        $('.interedit').contents().filter(function () {
            return this.nodeType === 3 && $.trim(this.nodeValue) !== '';
        }).wrap('<p></p>');
    }
    // Update #myhtmleditor and #mobilepreview2 at the end of the function
    var intereditHTML = $('.interedit').html();
    $('#myhtmleditor').val('');
    updateMobilePreview()
    $('#beautycode').val($('#pullthecode3').html())
    //runexplorer()
});



$('.textaligner').off('click').on('click', function () {
   
    var $interedit = $('.interedit');
    var cssadd = $(this).attr('cssadd');
    // Apply styles in a batched manner
    $interedit.css('text-align', cssadd);
    $interedit.find('p, .pd-header-tag').css('text-align', cssadd);
    $interedit.find('.pd-header-tag').css({'text-align': cssadd,'line-height': '116%' });

    // Adjust styles via function efficiently
    $interedit.find('.pd-header-tag h2, .pd-header-tag h3').attr('style', function (i, style) {
        return (style || '') + '; margin-bottom: 0px !important;';
    });

    // Reduce the number of times the DOM is queried and modified
    var editorcopy = $interedit.html();
    $('#myhtmleditor').val(editorcopy);
   
    updateMobilePreview()
    $('#beautycode').val($('#pullthecode3').html())
});



// text functions -----------------------------------------------------------------------


$('.ipsom').on('click', function () {
    ipsom =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit dom is great esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    $('#cinput3a').val(ipsom)
   //$('.fr-element').html(ipsom)
})

function appendNewContent(content) {
    $('.interedit').append('<div class="htmlonly">' + content + '</div>');
    $('#cinput3a').val('');
}

function setupClearSection() {
    $('.clearsection').off('click').on('click', function () {
        $('.interedit').html('');
    });
}



function setupContextMenu() {
    $('.htmlonly').off('click').on('contextmenu', function (e) {
        e.preventDefault();
        $('.interedit').removeClass('interedit');
        $(this).parent('.in910').addClass('interedit');
        $("#myModalcontent").show();
    });
}

function setupModalInteractions() {
    $('#yesBtn99').off('click').on('click', function () {
        $('.interedit').empty();
        $("#myModalcontent").hide();
        $('#findthecode2').text($('#pullthecode2').html());
    });

    $('#yescopyBtn99').off('click').on('click', function () {
        var textToCopy = $('.interedit').children('p').text();
        navigator.clipboard.writeText(textToCopy)
            .then(function () {
                console.log('Text copied to clipboard');
            })
            .catch(function (error) {
                console.error('Error copying text: ', error);
            });
        $("#myModalcontent").hide();
    });

    $('#closediag99').off('click').on('click', function () {
        $("#myModalcontent").hide();
        $('#optionb4').prop('checked', false);
    });






}

$('#cinput3-comp').on('click', function () {
    captureState()
    var newval = $('#cinput3a').val();
    if (newval === '') {
        return false;
    }

    var min = 1000;
    var max = 9999;
    var randomFourDigit = Math.floor(Math.random() * (max - min + 1)) + min;

    if (htmlcodeyesno === 0 && htmlcodeyesno2 === 0) {
        $('.interedit').append('<p id="ptag' + randomFourDigit + '">' + newval + '</p>');
        $('#cinput3a').val('');
    } else {
        appendNewContent(newval);
        setupClearSection();
        setupContextMenu();
        setupModalInteractions();
    }
   
    paragraphfunctions()
    updateMobilePreview()
    $('#beautycode').val($('#pullthecode3').html())
    return false;
});



// swatch function

$('#textaligner2 , #textaligner2a , #textaligner2b').on('change', function () {
    var cssadd = $(this).val();
    $('.interedit').removeClass(
        'addpadding0 addpadding10 addpadding20 addpadding40 addpadding60 addpadding80 addpadding100'
    ).addClass(cssadd);

    editorcopy = $('.interedit').html();
    $('#myhtmleditor').val(editorcopy);
   
});

$('#choosehtag').on('change', function () {
    choosehtag = $(this).val()

})

$(document).on('input', '#faqyes', function () {
    faqyes = this.checked ? 1 : 0;
});

$('#colorswatch').on('click', function () {
    mycolorswatch()
})

$('#colorswatch2').on('click', function () {
    mycolorswatch2()
})

function mycolorswatch2() {
    if (colorswatch2 == 0) {
        $('#colorswatch2').css('background-color', '#333')
        headernewcolor2 = 'style="color:#333 !important"'
        colorswatch2 = 1
    } else {
        $('#colorswatch2').css('background-color', '#034694')
        colorswatch2 = 0
        headernewcolor2 = 'style="color:#034694 !important"'
    }
}



//-------- h function

function appendContent(tag, hasIcon) {
    var randomFourDigit = getRandomFourDigit(1000, 9999);
    var content = $('#cinput1h2').val();
    var html = `<div class="pd-header-tag width100c">`;

    if (hasIcon) {
        html += `<div class="icon_box"> </div>`;
    }

    html += `<${tag} class="t-h4-style in910" ${headernewcolor2} id="ocinsertcontent${randomFourDigit}">${content}</${tag}></div>`;

    $('.interedit').append(html).removeClass('interedit');
}

function getRandomFourDigit(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$('#cinput1-clickh2-comp').on('click', function () {
    if ($('#cinput1h2').val() === '') {
        return false;
    }

    switch (choosehtag) {
        case '0':
            appendContent('h2', faqyes === 1);
            break;
        case '2':
            appendContent('h4', faqyes === 1);
            break;
        default:
            appendContent('h3', false);
            break;
    }

    $('#cinput1h2').val(''); // Clear the input field after appending content
    updateMobilePreview()
    $('#beautycode').val($('#pullthecode3').html())
});

// end text functions -----------------------------------------------------------------------


// link functions --------------------------------------------------------------------------
document.getElementById('linktooutside').addEventListener('change', function () {
    if (this.checked) {

        outsidelink = 1
    } else {

        outsidelink = 0
    }

})


document.getElementById('linktooutside2').addEventListener('change', function () {
    if (this.checked) {

        outsidelink2 = 1
    } else {

        outsidelink2 = 0
    }

})


document.getElementById('linktooutside3').addEventListener('change', function () {
    if (this.checked) {

        outsidelink3 = 1
    } else {

        outsidelink3 = 0
    }

})

$('#linkmaker').click(function () {
    captureState()
    if ($('#whatsthelink').val().includes('pcrichard.com') ||  $('#whatsthelink').val().includes('staging-na01-pcrichard.com')) {
        $('#message2').slideDown().delay(2000).slideUp()
        return false;
    }
    var selection = window.getSelection();
    if (!selection.rangeCount) return; // Exit if no selection
    var selectedText = selection.toString();
    var whatsthelink = $('#whatsthelink').val();

    if (outsidelink === 0) {
        var anchor = '<a href="' + whatsthelink + '">' + selectedText + '</a>';
    } else {
        var anchor = '<a href="' + whatsthelink + '" target="_blank">' + selectedText + '</a>';
    }

    var range = selection.getRangeAt(0);
    if (layoutmode === 1) {
        var newNode = document.createElement('div');
        newNode.innerHTML = anchor;
        range.deleteContents();
        range.insertNode(newNode.firstChild);


    } else {
        var newNode = document.createElement('div');
        newNode.innerHTML = anchor;
        range.deleteContents();
        range.insertNode(newNode.firstChild);

    }
   
    $('a').not('.googledrive').not('.outsidelink').not('.list-button').on('click', function (e) {
        var target = $(e.target);
        if (!target.is('a')) {
            target = target.closest('a');
        }
        e.preventDefault();
        var wheretogo = target.attr('href');
        gotothelinkfunction(wheretogo);

        $('#noBtn').off('click').on('click', function () {
            var target = $(e.target);
            if (!target.is('a')) {
                target = target.closest('a');
            }
            target.replaceWith(target.text());
            //runexplorer();
            document.getElementById("myModal").style.display = "none";
        });
    });
    $('#beautycode').val($('#pullthecode3').html())
});



//not used but available
$('#linkmakerimg').click(function () {
  

    // Get the element with the class 'explorerselected'
    var explorerSelectedElement = document.querySelector('.explorerselected');
    if (!explorerSelectedElement) {
        console.log('No element with class "explorerselected" found');
        return; // Exit if no such element
    }

    // Store the HTML content of the selected element
    var selectedHTML = explorerSelectedElement.outerHTML;
    console.log('Selected HTML: ', selectedHTML);

    // Get the link to create from the input field
    var whatsthelink = $('#whatsthelink3').val();
    console.log('Link to create: ', whatsthelink);

    // Create the anchor node
    var anchorNode = document.createElement('a');
    anchorNode.href = whatsthelink;
    if (outsidelink3 !== 0) {
        anchorNode.target = '_blank';
    }
    console.log('Anchor node created');

    // Set the inner HTML of the anchor node to the selected HTML
    anchorNode.innerHTML = selectedHTML;
    console.log('Anchor node after setting inner HTML: ', anchorNode.outerHTML);

    // Replace the original selected element with the new anchor node
    explorerSelectedElement.replaceWith(anchorNode);
    console.log('Original element replaced with anchor node');

    // Update the hidden input with the new HTML
    $('#beautycode').val($('#pullthecode3').html());
    console.log('Code updated in hidden input');
});



$('#linkmaker3').click(function () {

    if ($('#whatsthelink3').val().includes('pcrichard.com') || $('#whatsthelink3').val().includes('staging-na01-pcrichard.com')) {
        $('#message2').slideDown().delay(2000).slideUp();
        return false;
    }

    var selection = window.getSelection();
    if (!selection.rangeCount) return; // Exit if no selection

    var range = selection.getRangeAt(0);
    var whatsthelink = $('#whatsthelink3').val();

    // Create the anchor node
    var anchorNode = document.createElement('a');
    anchorNode.href = whatsthelink;
    if (outsidelink3 !== 0) {
        anchorNode.target = '_blank';
    }

    // Extract the contents of the range and append to the anchor node
    var content = range.extractContents();
    anchorNode.appendChild(content);

    // Insert the anchor node back into the range
    range.insertNode(anchorNode);

    // Remove the original selection and select the newly created anchor
    selection.removeAllRanges();
    var newRange = document.createRange();
    newRange.selectNode(anchorNode);
    selection.addRange(newRange);

    // Ensure proper handling of clicks on the newly created links
    $('a').not('.googledrive').not('.outsidelink').not('.list-button').on('click', function (e) {
        var target = $(e.target);
        if (!target.is('a')) {
            target = target.closest('a');
        }
        e.preventDefault();
        var wheretogo = target.attr('href');
        gotothelinkfunction(wheretogo);

        $('#noBtn').off('click').on('click', function () {
            var target = $(e.target);
            if (!target.is('a')) {
                target = target.closest('a');
            }
            target.replaceWith(target.text());
            //runexplorer();
            document.getElementById("myModal").style.display = "none";
        });
    });

    $('#beautycode').val($('#pullthecode3').html());
});





$('#closediag').on('click', function () {
    document.getElementById("myModal").style.display = "none";
    currentAnchor = null;
});



function getCurrentDateTime() {
    // Get current date and time
    const now = new Date();

    // Get date components
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Get timezone offset
    const timezoneOffset = -now.getTimezoneOffset(); // Reverse offset to get offset in minutes
    const offsetHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0');
    const offsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0');
    const timezoneSign = timezoneOffset < 0 ? '-' : '+';

    // Construct formatted date string
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezoneSign}${offsetHours}:${offsetMinutes}`;

    return formattedDateTime;
}

// Get current date and time
getCurrentDateTime()


function createVideoElement(videoFilename, videoCaptions, videoPoster , videoseotitle , videoseodescription) {
    const currentDateTime = getCurrentDateTime();

const basePathvideo = 'https://d2vxgxvhgubbj8.cloudfront.net/videos/7106/'
const basePathimg = 'https://d2vxgxvhgubbj8.cloudfront.net/thumbnails/7106/'
const basePathvtt = 'https://d2vxgxvhgubbj8.cloudfront.net/subs/7106/'

    const videoSrc = `${basePathvideo}${videoFilename}`;
    const captionsSrc = `${basePathvtt}${videoCaptions}`;
    const posterSrc = `${basePathimg}${videoPoster}`;

    // JavaScript object for schema.org JSON
    const schemaOrgData = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": videoseotitle,
        "description": videoseodescription,
        "thumbnailUrl": posterSrc,
        "uploadDate": currentDateTime,
        "duration": "PT2M",
        "contentUrl": videoSrc,
        "embedUrl": videoSrc,
        "publisher": {
            "@type": "Organization",
            "name": "P.C. Richard & Son",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.pcrichard.com/images/pim-content/pcrmainlogo.png"
            }
        }
    };

    // Convert JavaScript object to JSON string
    const schemaOrgJson = JSON.stringify(schemaOrgData);

    // HTML template
    return `<video aria-label="Video Player" class="videoPlayer" controls poster="${posterSrc}" tabindex="0">
                <source src="${videoSrc}" type="video/mp4">
                <track kind="captions" label="English" src="${captionsSrc}" srclang="en">
                Your browser does not support the video tag.
            </video>
            <script type="application/ld+json">
                ${schemaOrgJson}
            </script>`;
}


$(document).on('click', '#submitvideofile', function () {
    const videoFilename = $('#videofilename').val();
    const videoCaptions = $('#videocaptions').val();
    const videoPoster = $('#videoposter').val();
    const videoseotitle = $('#videoseotitle').val();
    const videoseodescription = $('#videoseodescription').val();
    const videoElement = createVideoElement(videoFilename, videoCaptions, videoPoster , videoseotitle , videoseodescription);
    $('.interedit').html(videoElement);
    $('#beautycode').val($('#pullthecode3').html())
    //runexplorer()
});


//----------------------- list

$('#mylistamount').on('change', function () {
    $('.lister').hide()
    originallist = 1
    amountoflist = $(this).val()
    while (originallist <= amountoflist) {
        $('#list' + originallist).slideDown()
        originallist++
    }
})

$('#mylisttype').on('change', function () {
    mylisttype = $(this).val()
})



$('#listsubmit').on('click', function () {

    // var listwidthselected = $('#mylistwidth').val()
    var list1 = '';
    var list2 = '';
    var list3 = '';
    var list4 = '';
    var list5 = '';
    var list6 = '';
    var list7 = '';
    var list8 = '';
    var list9 = '';
    var list10 = '';
    var listtitle = $('#listtitle-d').val();
    if ($('#list1').is(':visible')) {
        list1 = '<li>' + $('#list1').val() + '</li>';
    }

    if ($('#list2').is(':visible')) {
        list2 = '<li>' + $('#list2').val() + '</li>';
    }

    if ($('#list3').is(':visible')) {
        list3 = '<li>' + $('#list3').val() + '</li>';
    }

    if ($('#list4').is(':visible')) {
        list4 = '<li>' + $('#list4').val() + '</li>';
    }


    if ($('#list5').is(':visible')) {
        list5 = '<li>' + $('#list5').val() + '</li>';
    }

    if ($('#list6').is(':visible')) {
        list6 = '<li>' + $('#list6').val() + '</li>';
    }

    if ($('#list7').is(':visible')) {
        list7 = '<li>' + $('#list7').val() + '</li>';
    }

    if ($('#list8').is(':visible')) {
        list8 = '<li>' + $('#list8').val() + '</li>';
    }

    if ($('#list9').is(':visible')) {
        list9 = '<li>' + $('#list9').val() + '</li>';
    }

    if ($('#list10').is(':visible')) {
        list10 = '<li>' + $('#list10').val() + '</li>';
    }

    $('#mylisttype').on('change', function () {
        mylisttype = $(this).val()
    })


    if (mylisttype === '0') {

        if (listtitle === '') {
            $('.interedit').append('<ol id="listcontent' + listaddition + '" class="in910 ' + $(
                    '#mylistwidth').val() + '"> ' + list1 + list2 + list3 + list4 + list5 + list6 +
                list7 +
                list8 + list9 + list10 + ' </ol>').removeClass('.interedit')
        } else {
            $('.interedit').append('<h3 style="margin-bottom:5px">' + listtitle +
                '</h3><ol id="listcontent' + listaddition + '" class="in910 ' + $(
                    '#mylistwidth').val() + '"> ' + list1 + list2 + list3 + list4 + list5 + list6 +
                list7 +
                list8 + list9 + list10 + ' </ol>').removeClass('.interedit')
        }

    } else {

        if (listtitle === '') {
            $('.interedit').append('<ul id="listcontent' + listaddition + '" class="in910 ' + $(
                    '#mylistwidth').val() + '"> ' + list1 + list2 + list3 + list4 + list5 + list6 +
                list7 +
                list8 + list9 + list10 + ' </ul>').removeClass('.interedit')
        } else {
            $('.interedit').append('<h3 style="margin-bottom:5px">' + listtitle +
                '</h3><ul id="listcontent' + listaddition + '" class="in910 ' + $(
                    '#mylistwidth').val() + '"> ' + list1 + list2 + list3 + list4 + list5 + list6 +
                list7 +
                list8 + list9 + list10 + ' </ul>').removeClass('.interedit')
        }

    }
    listaddition++
    $('.lister').val('')
    $('#listtitle-d').val('')
    updateMobilePreview()
   


    $('#beautycode').val($('#pullthecode3').html())


})

$('#newlist').on('click', function () {
    createnewlist = 1
    $('.lister').val('')
    $('#newlist').fadeOut()
    $('#listsubmit').text('Submit List').css('background-color', '#334').css('color', '#fff')
})


// key commands----------------------------

function deleteHighlightedText() {
    // Capture the current state before deletion for undo functionality
    document.execCommand('delete', false, ''); // Use execCommand for simplicity
    redoStack = []; // Clear redoStack as the future path is reset
}

function undoChange() {
    if (undoStack.length > 0) {
        const lastState = undoStack.pop();
        redoStack.push($('#beautycode').html()); // Push current state to redoStack before undoing
        $('#beautycode').html(lastState); // Adjust selector as needed
    }
}



$(document).keydown(function (e) {
    // Function to handle event triggering in a cleaner way
    function handleButtonAction(selector) {
        $(selector).trigger('click');
    }

    if ((e.ctrlKey || e.metaKey) && !e.shiftKey) {
        switch (e.key) {
            case 'b':
                e.preventDefault();
                captureState();
                handleButtonAction('#theboldtext');
                break;
            case 'z':
                e.preventDefault();
                undoChange();
                break;
            case 'y':
                e.preventDefault();
                redoChange();
                break;
            case 'Delete':
                e.preventDefault();
                captureState();
              //  deleteHighlightedText();
                break;
            case 'e':
                e.preventDefault();
                captureState();
                handleButtonAction('#superscriptbutton');
                break;
            case 'd':
                e.preventDefault();
                captureState();
                handleButtonAction('#subscriptbutton');
                break;
            case 'i':
                e.preventDefault();
                captureState();
                handleButtonAction('#italicbutton');
                break;
            case 'u':
                e.preventDefault();
                captureState();
                handleButtonAction('#underlinebutton');
                break;
        }
        // Consolidate runexplorer calls to a single place if possible
    } else if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault();
        captureState();
        handleButtonAction('#breakbuttonlive');
       
    }
});


// Images ------------------------------------------------




$("#sidetoolset").delay(600).animate({
    opacity: 1
}, 1000); // 1000 milliseconds = 1 second





function gotothelinkfunction(wheretogo) {

    document.getElementById("myModal").style.display = "block";
    $('#yesBtn').off('click').on('click', function () {


        if (wheretogo.includes('https://')) {
            window.open(wheretogo, '_blank');
            document.getElementById("myModal").style.display = "none";
        } else {
            window.open('https://www.pcrichard.com' + wheretogo, '_blank');
            document.getElementById("myModal").style.display = "none";

        }

    });
}



$('#submitUrl').click(function () {

    var url = $('#imageUrl').val(); // Get URL from input field
    if (url && url !== "http://") {
        if (currentImage.parent('a').length === 0) {
            currentImage.wrap('<a class="" href="' + url + '"></a>');
        } else {
            currentImage.parent('a').attr('href', url);
        }
    }
    $('#urlModal').hide(); // Hide the URL modal
   

    $('a img').off('click').on('click', function (e) {
        e.preventDefault()
        var target = $(e.target);
        if (!target.is('a')) {
            target = target.closest('a');
        }
        var wheretogo = target.attr('href');
        gotothelinkfunction(wheretogo);

    })


});


//--effects ---------------------------------------------------------

let isProgrammaticChangeRowMarginTop2 = false; // Flag to control the execution

$('#RowBackgroundColorlist').on('change', function () {
    // Skip this handler if the change event was triggered programmatically
    if (isProgrammaticChangeRowMarginTop2) {
        return;
    }

    var selectedOption = $(this).find('option:selected');
    var backgroundColor = selectedOption.val();
    var textColor = selectedOption.attr('value1');

    $('.onblock').each(function () {
        var style = $(this).attr('style');
        if (typeof style !== 'undefined' && style !== false) {
            var newStyle = style.replace(/background-color\s*:\s*[^;]+;?/gi, '');
            newStyle += 'background-color: ' + backgroundColor + ' !important;';
            $(this).attr('style', newStyle);
        } else {
            $(this).attr('style', 'background-color: ' + backgroundColor + ' !important;');
        }
    });

    $('.onblock p').each(function () {
        this.style.setProperty('color', textColor, 'important');
    });

    // Indicate that the next change event will be triggered programmatically
    isProgrammaticChangeRowMarginTop2 = true;
    $(this).val('none').change(); // This will not cause the handler to execute its logic again
    isProgrammaticChangeRowMarginTop2 = false; // Reset the flag immediately

   
    updateMobilePreview()
    $('#beautycode').val($('#pullthecode3').html())
});


$('#Row-Border-Radius').on('change', function () {
    var selectedOption = $(this).find('option:selected');
    var boxmargin = selectedOption.attr('value')
    $('.onblock').css('border-radius', boxmargin)
    $('#Row-Border-Radius').prop('selectedIndex', 0);
   
    updateMobilePreview()
    $('#beautycode').val($('#pullthecode3').html())
})


$('#Row-Padding-Radius').on('change', function () {
    var selectedOption = $(this).find('option:selected');
    var boxpadding = selectedOption.attr('value')
    var maxtakin = 0; // Default value
    var $onblock = $('.onblock'); // Cache the jQuery selector

    // Check for each class and update maxtakin accordingly
    if ($onblock.hasClass('width100c')) {
        maxtakin = 101;
    }
    if ($onblock.hasClass('width50c')) {
        maxtakin = 50;
    }
    if ($onblock.hasClass('width33c')) {
        maxtakin = 33;
    }
    if ($onblock.hasClass('width25c')) {
        maxtakin = 25;
    }
    if ($onblock.hasClass('width20c')) {
        maxtakin = 20;
    }
    var boxmaxwidth = ((maxtakin - 1) - parseFloat(selectedOption.attr('value') * 2)) + '%'

    $('.onblock').css('padding', boxpadding + '%').css('margin-left', '0px').css('max-width', boxmaxwidth)
    $('#Row-Padding-Radius').prop('selectedIndex', 0);
   
    updateMobilePreview()
    $('#beautycode').val($('#pullthecode3').html())
})

$('#body-color').on('change', function () {
    var selectedOption = $(this).find('option:selected');
    var bodycolor = selectedOption.attr('value');
    $('.informationcontent').attr('style', 'background-color: ' + bodycolor + ' !important;');
   
    updateMobilePreview()
    $('#beautycode').val($('#pullthecode3').html())
});

$('#comp-color').on('change', function () {
    var selectedOption = $(this).find('option:selected');
    var bodycolor = selectedOption.attr('value')
    $('.interedit').attr('style', 'background-color: ' + bodycolor + ' !important;');

   
    updateMobilePreview()
    $('#beautycode').val($('#pullthecode3').html())
});

$('#comp-font').on('change', function () {
    var selectedOption = $(this).find('option:selected');
    var bodyfont = selectedOption.attr('value')
    $('.interedit').css('font-family', bodyfont)

   
    updateMobilePreview()
    $('#beautycode').val($('#pullthecode3').html())
});


function updateSliderValuerow(value) {
    document.getElementById('sliderValuerow').textContent = value;
}

function updateSliderValuecomp(value) {
    document.getElementById('sliderValuecomp1').textContent = value;
}

$(function () {
    $(".slider").slider({
        // Configure the slider options here
        stop: function (event, ui) {
            var value = ui.value; // The value of the slider
            var sliderId = $(this).attr("id"); // Get the ID of the slider

            // Call the relevant function based on the slider ID
            switch (sliderId) {
                case "slider33":
                    updateSliderValue33(value);
                    break;
                case "slider66":
                    updateSliderValue66(value);
                    break;
                case "slider99":
                    updateSliderValue99(value);
                    break;
                case "slider00":
                    updateSliderValue00(value);
                    break;
                case "slider11":
                    updateSliderValue11(value);
                    break;
                case "slider22":
                    updateSliderValue22(value);
                    break;
                case "slider2":
                    updateSliderValue2(value);
                    break;
                case "slider3":
                    updateSliderValue3(value);
                    break;
                default:
                    console.log("Unhandled slider ID");
            }
        }
    });
});

function updateSliderValue33(value) {
    document.getElementById('sliderValue33').textContent = value;
    var maxLeftValue = (100 - value) / 2 + "%";
    $('.interedit').css({
        'max-width': value + '%',
        'margin-left': maxLeftValue
    });
    commonUpdateActions();
}

function updateSliderValue66(value) {
    document.getElementById('sliderValue66').innerText = value;
    $('.interedit p').css('font-size', value + 'em');
    commonUpdateActions();
}

function updateSliderValue99(value) {
    document.getElementById('sliderValue99').innerText = value;
    $('.interedit').css('padding', value + 'px');
    commonUpdateActions();
}

function updateSliderValue00(value) {
    document.getElementById('sliderValue00').innerText = value;
    $('.interedit p').css('line-height', value + 'px');
    commonUpdateActions();
}

function updateSliderValue11(value) {
    document.getElementById('sliderValue11').innerText = value;
    $('.interedit').css('border-radius', value + 'px');
    commonUpdateActions();
}

function updateSliderValue22(value) {
    document.getElementById('sliderValue22').innerText = value;
    $('.interedit p').css('margin-top', value + 'px');
    commonUpdateActions();
}

function updateSliderValue2(value) {
    document.getElementById('sliderValue2').textContent = value;
    $('.interedit').css('margin-top', value + 'px');
    commonUpdateActions();
}

function updateSliderValue3(value) {
    document.getElementById('sliderValue3').textContent = value;
    $('.interedit').css({
        'padding': value + 'px',
        'max-width': '-webkit-fill-available'
    });
    commonUpdateActions();
}

function commonUpdateActions() {
    updateMobilePreview()
}

function updateSliderValue4(value) {
    document.getElementById('sliderValue4').textContent = value;
    $('.onblock').css('border-radius', value + 'px')
    updateMobilePreview()
}

function updateSliderValue4spacer(value) {
    document.getElementById('rangeSlider4spacer').textContent = value;
    $('.onblock').css('min-height', value + 'px').addClass('customspacer').removeClass('liverow')
    updateMobilePreview()
}


function updateSliderValue_row(value) {
    document.getElementById('sliderValue4_row').textContent = value;
    $('.onblock').css('margin-top', value + 'px')
    updateMobilePreview()
}




$('.selectall').on('click', function () {
    var range = document.createRange();
    range.selectNodeContents(this);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    // Try to copy the selected text to the clipboard
    try {
        // Copy the selected text to the clipboard
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copy command was ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }

});

$(function () {
    var maxWidthPercentage = 27;
    var maxWidthInPixels = $(window).width() * (maxWidthPercentage / 100);
    var minWidthPixels = 300; // Minimum width in pixels for #programming

    $("#fullembedcodeddd2").resizable({
        minWidth: 320
    });
    // Initialize resizable on #programming with adjusted calculations
    $("#programming").resizable({
        maxWidth: maxWidthInPixels,
        minWidth: minWidthPixels,
        resize: function (event, ui) {
            var parentWidth = ui.element.parent().width();
            var programmingWidth = ui.size.width;
            // Adjust the calculation for remaining width, considering potential padding/border
            var remainingWidth = parentWidth - programmingWidth - 2; // Adjust the subtraction value as needed

            // Ensure the resizable-div does not wrap under programming
            $("#resizable-div").width(Math.max(remainingWidth - 40, 0)); // Ensure non-negative width
        }
    });

    // Optional: Update on window resize
    $(window).resize(function () {
        var maxWidthInPixels = $(window).width() * (maxWidthPercentage / 100);
        $("#programming").resizable("option", "maxWidth", maxWidthInPixels);
    });

    // CSS adjustments for consistent sizing
    $("#programming, #resizable-div").css('box-sizing', 'border-box');
});




async function listAllDriveFiles(folderId = '10VO7M5g_oRnzaZDNSp0zLmL382O5Tn91') {
    async function fetchFiles(folderId, filesList = []) {
        let apiKey = a231 + a2312 + 'jVh9Q-kgc'; // Example API key
        let response = await fetch(
            `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}`
        );
        let data = await response.json();
        let files = data.files || [];

        for (let file of files) {
            // If the file is a folder, recursively fetch its files
            if (file.mimeType === 'application/vnd.google-apps.folder') {
                await fetchFiles(file.id, filesList);
            } else {
                filesList.push(file); // Add non-folder files to the list
            }
        }
    }

    let allFiles = [];
    await fetchFiles(folderId, allFiles);

    // Sort all files alphabetically by name
    allFiles.sort((a, b) => a.name.localeCompare(b.name));

    let output = ''; // Initialize output HTML
    let ulCounter = 0; // Counter for <ul> elements
    let currentFirstLetter = '';
    let previousFirstLetter = '';

    for (let file of allFiles) {
        $('a.googledrive').on('click', function (e) {
            
            e.preventDefault();
            //alert('hi3')
            var target = $(e.target);
            var wheretogo = target.attr('href');
           atag(wheretogo)
        });
        currentFirstLetter = file.name.charAt(0).toLowerCase();
        if (currentFirstLetter !== previousFirstLetter) {
            // Whenever the first letter changes, check if we need to wrap previous <ul>s in a <div>
            if (ulCounter % 3 === 0) {
                if (ulCounter !== 0) { // Close the previous div if it's not the first group
                    output += '</div>';
                }
                output +=
                    '<div class="width33cg">'; // Start a new div for every group of three <ul>s
            }
            if (previousFirstLetter !== '') {
                output += '</ul>'; // Close the previous list if it's not the first iteration
            }
            output += '<ul>'; // Start a new list for the new first letter
            ulCounter++; // Increment <ul> counter



        }

        let displayName = file.name.replace('.txt', ''); // Example display name modification
        // Append each file link to the output HTML
        output +=
            `<li><a title="Download the file of - ${displayName} -" style="color:#fff" class="googledrive" href="https://drive.google.com/uc?export=download&id=${file.id}"  return false" download="${file.name}">${displayName} &#8595;</a></li>`;

        previousFirstLetter =
            currentFirstLetter; // Update the letter tracker for the next iteration

    }

    output += '</ul>'; // Close the last list
    if (ulCounter % 3 !== 0 || ulCounter === 0) {
        output +=
            '</div>'; // Ensure the closing div is added for the last group if it's not a full group of three
    }

    // Display the output HTML
    document.getElementById('driveContents').innerHTML = output;
}

// Initial call to list files


/*
$('#toptoolstoggle').on('click', function () {
    $('#toptoolsblock').slideToggle()
})
*/



const $mobilePreview2 = $('#mobilepreview2');
const $pullTheCode2 = $('#pullthecode2');

function updateMobilePreview() {
    $mobilePreview.html($pullTheCode.html());
   
}

//----------------------------------------------
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
        enabledrop()
    });
}

function commonUpdates() {
    enabledrop();
   
    debouncedUpdateMobilePreview() 
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



//-----------------------------------------------



$('#addrow').on('click', function () {
    $('.onblock').removeClass('onblock');
    $('.internalbuttons').slideDown()
    $('.layoutbuilder').append(
        '<div class="width100c  layoutpale layoutpale100 liverow droppable onblock"></div>')
  
    enabledrop()
    $('#beautycode').val($('#pullthecode3').html())
    })


$('.addrow').on('click', function () {
    var layout = $(this).data('layout').split(','); // Get layout configuration from data attribute
    var html = '<div class="width100c">';

    // Dynamically create the columns based on the layout configuration
    layout.forEach(function (size, index) {
        var onblock = index === 0 ? 'onblock' : ''; // Add 'onblock' class to the first element
        html += `<div class="width${size}c width50c2 layoutpale layoutpale${size} liverow droppable ${onblock}"></div>`;
    });

    html += '</div>';

    // Perform common actions

    $('.onblock').removeClass('onblock');
    $('.layoutbuilder').append(html);
  
    enabledrop()
    $('#beautycode').val($('#pullthecode3').html())
});

$('.addrowslider').on('click' , function() {
    html = '<div class="width100c programoverflow"><div class="width100c subscrollerdiv"><div class="width33c layoutpale layoutpale33 liverow droppable onblock ui-droppable"></div><div class="width33c layoutpale layoutpale33 liverow droppable ui-droppable"></div><div class="width33c layoutpale layoutpale33 liverow droppable ui-droppable"></div></div></div>'
    $('.layoutbuilder').append(html);
    $('.onblock').removeClass('onblock');
    $('#beautycode').val($('#pullthecode3').html())
   
})


$('.addrowslider50').on('click' , function() {
    html = '<div class="width100c programoverflow"><div class="width100c subscrollerdiv"><div class="width50c layoutpale layoutpale50 liverow droppable onblock ui-droppable"></div><div class="width50c layoutpale layoutpale50 liverow droppable ui-droppable"></div></div></div>'
    $('.layoutbuilder').append(html);
    $('.onblock').removeClass('onblock');
 
    $('#beautycode').val($('#pullthecode3').html())
})


$('#addrowc1xc1').on('click', function () {

    $('.informationcontent').append(
        '<div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width100c liveelement in910 layoutpale layoutpale100 "></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div></div>'
    );


 
    enabledrop()
   
    $('#beautycode').val($('#pullthecode3').html())
})

$('#addrowcxc').on('click', function () {

    $('.informationcontent').append(
        '<div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable onblock"><div class="width100c liveelement in910 layoutpale layoutpale100 "></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div></div>'
    );
   
    enabledrop()
   
    $('#beautycode').val($('#pullthecode3').html())
})

$('#addrowc2xc8').on('click', function () {

    $('.informationcontent').append(
        '<div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable onblock"><div class="width100c liveelement in910 layoutpale layoutpale100"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width20c width50c2 liveelement in910 layoutpale layoutpale20"></div><div class="width80c width50c2 liveelement in910 layoutpale layoutpale25"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width80c width50c2 liveelement in910 layoutpale layoutpale25"></div><div class="width20c width50c2 liveelement in910 layoutpale layoutpale20"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width20c width50c2 liveelement in910 layoutpale layoutpale20"></div><div class="width80c width50c2 liveelement in910 layoutpale layoutpale25"></div></div>'
    );

    enabledrop()
   
    $('#beautycode').val($('#pullthecode3').html())
})

$('#addrowc4xc6').on('click', function () {

    $('.informationcontent').append(
        '<div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable onblock"><div class="width100c liveelement in910 layoutpale layoutpale100 "></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width40c width50c2 liveelement in910 layoutpale layoutpale40"></div><div class="width60c width50c2 liveelement in910 layoutpale layoutpale60"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width40c width50c2 liveelement in910 layoutpale layoutpale40"></div><div class="width60c width50c2 liveelement in910 layoutpale layoutpale60"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width40c width50c2 liveelement in910 layoutpale layoutpale40"></div><div class="width60c width50c2 liveelement in910 layoutpale layoutpale60"></div></div>'
    );

  
    enabledrop()
    $('#beautycode').val($('#pullthecode3').html())
    
})

//------------------------------------------------------------------------------------------------------------------

$('#addrow1x1 , #addrow1x1a').on('click', function () {
    $('.interedit').removeClass('interedit') 
    captureState()
    $('.interedit').removeClass('interedit')
    $('.explorerselected').removeClass('explorerselected')
    $('.onblock').append('<div class="width100c liveelement in910 layoutpale  layoutpale100 explorerselected interedit"></div>')
    
    
    enabledrop()
   
    $('#beautycode').val($('#pullthecode3').html())
})

$('#addrow2x2 , #addrow2x2a').on('click', function () {
    $('.interedit').removeClass('interedit')
    captureState()
    $('.interedit').removeClass('interedit')
    $('.explorerselected').removeClass('explorerselected')
    $('.onblock').append(
        '<div class="width50c  width50c2 liveelement in910 layoutpale layoutpale50 interedit explorerselected"></div><div class="width50c  width50c2 liveelement in910 layoutpale  layoutpale50"></div>'
    );

    enabledrop()
    $('#beautycode').val($('#pullthecode3').html())
})


$('#addrow3x3a').on('click', function () {
    $('.interedit').removeClass('interedit')
    captureState()
    $('.interedit').removeClass('interedit')
    $('.explorerselected').removeClass('explorerselected')
    $('.onblock').append(
        '<div class="width33c width50c2 liveelement in910 layoutpale layoutpale33 explorerselected interedit"></div><div class="width33c width50c2 liveelement in910 layoutpale layoutpale33"></div><div class="width33c width50c2 liveelement in910 layoutpale layoutpale33"></div>'
    );

    enabledrop()
    $('#beautycode').val($('#pullthecode3').html())
})



$('#addrow25x4a').on('click', function () {
    $('.interedit').removeClass('interedit')
    captureState()
    $('.interedit').removeClass('interedit')
    $('.explorerselected').removeClass('explorerselected')
    $('.onblock').append(
        '<div class="width25c width50c3 liveelement unselectable-text in910 layoutpale layoutpale25 explorerselected interedit"></div><div class="width25c width50c3 liveelement unselectable-text in910 layoutpale layoutpale25"></div><div class="width25c width50c3 liveelement unselectable-text in910 layoutpale layoutpale25"></div><div class="width25c width50c3 liveelement unselectable-text in910 layoutpale layoutpale25"></div>'
    );

    enabledrop()
    $('#beautycode').val($('#pullthecode3').html())
})





$('#addrow2x8').on('click', function () {
    $('.interedit').removeClass('interedit')
    captureState()
    $('.interedit').removeClass('interedit')
    $('.explorerselected').removeClass('explorerselected')
    $('.onblock').append(
        '<div class="width20c width50c2 liveelement in910 layoutpale layoutpale20 interedit explorerselected"></div><div class="width80c width50c2 liveelement in910 layoutpale layoutpale25"></div>'
    );
  
    enabledrop()
    $('#beautycode').val($('#pullthecode3').html())
})

$('#addrow4x6').on('click', function () {
    $('.interedit').removeClass('interedit')
    captureState()
    $('.interedit').removeClass('interedit')
    $('.explorerselected').removeClass('explorerselected')
    $('.onblock').append(
        '<div class="width40c width50c2 liveelement in910 layoutpale layoutpale40 interedit explorerselected"></div><div class="width60c width50c2  liveelement in910 layoutpale layoutpale60"></div>'
    );

    enabledrop()
    $('#beautycode').val($('#pullthecode3').html())
})


$('#addrow4x6a').on('click', function () {
    $('.interedit').removeClass('interedit')
    captureState()
    $('.interedit').removeClass('interedit')
    $('.explorerselected').removeClass('explorerselected')
    $('.onblock').append(
        '<div class="width60c width50c2  liveelement in910 layoutpale interedit layoutpale60 interedit explorerselected"></div><div class="width40c width50c2 liveelement in910 layoutpale layoutpale40"></div>'
    );

    enabledrop()
   
    $('#beautycode').val($('#pullthecode3').html())
})


$('#addrow2x7').on('click', function () {
    $('.interedit').removeClass('interedit')
    captureState()
    $('.interedit').removeClass('interedit')
    $('.explorerselected').removeClass('explorerselected')
    $('.onblock').append(
        '<div class="width25c width50c2 liveelement in910 layoutpale layoutpale25 interedit explorerselected"></div><div class="width75c width50c2 liveelement in910 layoutpale layoutpale75"></div>'
    );
 
    enabledrop()
   
    $('#beautycode').val($('#pullthecode3').html())
})

$('#addrow3x3').on('click', function () {
    $('.interedit').removeClass('interedit')
    captureState()
    $('.interedit').removeClass('interedit')
    $('.explorerselected').removeClass('explorerselected')
    $('.onblock').append(
        '<div class="width33c width50c2 liveelement in910 layoutpale layoutpale33 interedit explorerselected"></div><div class="width33c width50c2 liveelement in910 layoutpale layoutpale33"></div><div class="width33c width50c2 liveelement in910 layoutpale layoutpale33"></div>'
    );


    enabledrop()
   

    $('#beautycode').val($('#pullthecode3').html())
})


$('#addrow4x4').on('click', function () {
    $('.interedit').removeClass('interedit')
    captureState()
    $('.interedit').removeClass('interedit')
    $('.explorerselected').removeClass('explorerselected')
    $('.onblock').append(
        '<div class="width20c width50c3 liveelement in910 layoutpale layoutpale25  interedit explorerselected"></div><div class="width20c width50c3 liveelement in910 layoutpale layoutpale25"></div><div class="width20c width50c3 liveelement in910 layoutpale layoutpale25"></div><div class="width20c width50c3 liveelement in910 layoutpale layoutpale25"></div>'
    );
 
    enabledrop()
   
    $('#beautycode').val($('#pullthecode3').html())
})

//----------------------


$('.addrow-click').on('click' , function() {
    captureState()
    $('.addrow100').click()
    $('#beautycode').val($('#pullthecode3').html())
})

function imagefunctions() {
    $('img.promoimg21').on("contextmenu", function (e) {
        e.preventDefault(); // Prevent the default context menu
        currentImage = $(this); // Set the current image
        $('#customModal').show(); // Show the custom modal
    });
    $('a img').on('click', function (e) {
        e.preventDefault()
    })

    $(document).on("contextmenu", "img.promoimg21", function (e) {
        e.preventDefault(); // Prevent the default context menu
        currentImage = $(this); // Set the current image
        $('#customModal').show(); // Show the custom modal
    });

    $('#noBtn').click(function(event) {
        event.preventDefault();

        console.log('currently broken')

        $('#myModal').hide();
    });
    $('#beautycode').val($('#pullthecode3').html())
}



$('.whattypeofimage').on('click', function () {
    $('.typeofim').hide()
    openimagebuilder = '.' + $(this).attr('openimagebuilder');
    $(openimagebuilder).slideDown()

    if (openimagebuilder === '.productimage') {
        $('#mycompimagelist , #clicktoloadlocalfiles').hide()
    } else {
        $('#mycompimagelist , #clicktoloadlocalfiles').show()
    }
    $('.whattypeofimage').css('background-color', 'transparent')
    $(this).css('background-color', '#666')
    $('#beautycode').val($('#pullthecode3').html())
})

document.getElementById('cinput1').addEventListener('input', function () {

    $('.showthepreviewimage').css('pointer-events', 'all')
    $('.showthepreviewimage').each(function () {
        previewurld =
            'https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BFXM_PRD/on/demandware.static/-/Sites-pcrichard-master-product-catalog/default/images/hires/'
        imageprefix = $(this).attr('prefix');
        $(this).attr('src', previewurld + imageprefix + $('#cinput1').val() + '.jpg')
    })


    var imgs = document.getElementsByTagName('img');
    for (var i = 0, j = imgs.length; i < j; i++) {
        if (imgs[i].classList.contains(
                'showthepreviewimage')) { // Check if the image has the specific class
            // Hide parent <div> initially until image is confirmed to load
            imgs[i].parentNode.style.display = 'none';

            imgs[i].onload = function () {
                this.parentNode.style.display = ''; // Show the parent <div> of the image
            };

            imgs[i].onerror = function (e) {
                this.parentNode.style.display = 'none'; // Hide the parent <div> of the image
            };
        }
    }
    $('#beautycode').val($('#pullthecode3').html())

})

$('.showthepreviewimage').on('click', function () {

    if ($('#cinput1b').val() == '') {

        $('.imagemessage').slideDown().delay(2000).slideUp()
        return false
    } else {
        imageselect = $(this).attr('prefix')
        imagename00 = $('#cinput1').val()
        newval2 = $('#cinput1b').val()
        var newvalstripped2 = newval2.replace(/"/g , '').replace('®' , '').replace('™' , '');
        imageheader = $('#cinput1c').val()
        if ($('#cinput1c').val() == '') {
            imagedata =
                '<div class="width100c"><img class="loading-lazy promoimg21 in910" src="https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BFXM_PRD/on/demandware.static/-/Sites-pcrichard-master-product-catalog/default/images/hires/' +
                imageselect + imagename00 + '.jpg?sw=400&sh=400&sm=fit" data-src="https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BFXM_PRD/on/demandware.static/-/Sites-pcrichard-master-product-catalog/default/images/hires/' +
                imageselect + imagename00 + '.jpg?sw=400&sh=400&sm=fit" alt="' + newvalstripped2 +
                '"></div>'
        } else {
            imagedata = imageheader +
                '<div class="width100c"><img class="loading-lazy promoimg21 in910" src="https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BFXM_PRD/on/demandware.static/-/Sites-pcrichard-master-product-catalog/default/images/hires/' +
                imageselect + imagename00 + '.jpg?sw=400&sh=400&sm=fit" data-src="https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BFXM_PRD/on/demandware.static/-/Sites-pcrichard-master-product-catalog/default/images/hires/' +
                imageselect + imagename00 + '.jpg?sw=400&sh=400&sm=fit" alt="' + newvalstripped2 +
                '"></div>'
        }
        $('.interedit').append(imagedata).removeClass('.interedit')
        //runexplorer()
        imagefunctions()
    }

})

$('#cancelUrl').click(function () {
    $('#urlModal').hide(); // Hide the URL modal
});

$('#deleteImage').click(function () {
    currentImage.parent('a').remove();
    currentImage.parent('div').remove();
    currentImage.remove(); // Remove the image
    $('#customModal').hide();
    // Hide the custom modal
    //runexplorer()
});

$('#closeModal').click(function () {
    $('#customModal').hide(); // Hide the custom modal without any action
});

$('#wrapImage').click(function () {
    $('#customModal').hide(); // Hide the custom modal
    $('#urlModal').show(); // Show the URL modal
});

$('#submitUrl').click(function () {

    var url = $('#imageUrl').val(); // Get URL from input field
    if (url && url !== "http://") {
        if (currentImage.parent('a').length === 0) {
            currentImage.wrap('<a class="" href="' + url + '"></a>');
        } else {
            currentImage.parent('a').attr('href', url);
        }
    }
    $('#urlModal').hide(); // Hide the URL modal
    //runexplorer()

});

document.getElementById('catalogselector').addEventListener('change', function () {
    catalogselector = $('#catalogselector').val()
    promotionalsource ='https://www.pcrichard.com/on/demandware.static/-/Sites-pcrichard-master-articles-catalog/default/images' +catalogselector;
    pimsource = 'https://staging-na01-pcrichard.demandware.net/on/demandware.static/-/Library-Sites-PCRichardSharedLibrary/default/dw3744730c'+catalogselector;

if (catalogselector === '/blog/') {
    imagelivesource = promotionalsource
} else {
    imagelivesource = pimsource
}
$('#showthepromotionalimage').attr('src', imagelivesource + $('#cinput1promotional').val())  
})

document.getElementById('clicktoloadlocalfiles').addEventListener('click', function () {
    document.getElementById('imgfileInput').click(); // Simulate file input click
    $('#loadedimagemessage').show()
});


document.getElementById('imgfileInput').addEventListener('change', function (event) {
    const files = event.target.files; // Get selected files
    const imageListDiv = document.getElementById('mycompimagelist');

    imageListDiv.innerHTML = ''; // Clear the div before adding new images

    // Loop through files, filter for images, and display them with filenames
    for (const file of files) {
        if (file.type.startsWith('image/')) {
            const imgContainer = document.createElement('div'); // Container for image and filename
            imgContainer.className = 'myloadedimages'; // Assign class to the container

            const img = document.createElement('img');
            const filenameDiv = document.createElement('div'); // Element for the filename
            filenameDiv.className = 'myloadedfilenames'; // Assign class to the filename div

            img.src = URL.createObjectURL(file);
            img.style.width = '100px'; // Example size, adjust as needed
            img.onload = function () {
                URL.revokeObjectURL(img.src); // Free memory when the image is loaded
            };

            filenameDiv.textContent = file.name; // Set the text to the file name
            filenameDiv.style.textAlign = 'center'; // Center align the filename

            imgContainer.appendChild(img);
            imgContainer.appendChild(filenameDiv); // Append the filename below the image
            imageListDiv.appendChild(imgContainer);
        }
    }


    $('.myloadedimages').on('click', function () {
        var desktoppictures = $(this).children('.myloadedfilenames').text()
        $('#cinput1promotional , #wraparoundfilename').val(desktoppictures)
        catalogselector = $('#catalogselector').val()
        promotionalsource = 'https://www.pcrichard.com/on/demandware.static/-/Sites-pcrichard-master-articles-catalog/default/images/' + catalogselector;
        pimsource = 'https://staging-na01-pcrichard.demandware.net/on/demandware.static/-/Library-Sites-PCRichardSharedLibrary/default/dw3744730c'+catalogselector;

        if (catalogselector === '/blog/') {
            imagelivesource = promotionalsource
        } else {
            imagelivesource = pimsource
        }

        $('#showthepromotionalimage').attr('src', imagelivesource + desktoppictures)
    })


    $('#beautycode').val($('#pullthecode3').html())
});




$('#showthepromotionalimage').on('click', function () {
    imagename01 = $(this).attr('src');


    if ($('#catalogselector').val() === 'pim-content/') {
        pimPromotional = 'pimpromotional'
    } else {
        pimPromotional = ''

    }



    if ($('#cinput1bpromotional').val() == '') {
        $('.imagemessage').slideDown().delay(2000).slideUp()
        return false
    } else {
        var newval3 = $('#cinput1bpromotional').val()
        var newvalstripped = newval3.replace(/"/g , '').replace('®' , '').replace('™' , '');
        var imagedata2 = '<img class="loading-lazy promoimg21 in910 '+ pimPromotional +'" src="' + imagename01 + '" data-src="' + imagename01 +
            '" alt="' + newvalstripped + '">'
        $('.interedit').append(imagedata2).removeClass('.interedit')

    }


    $('#closeModal').click(function () {
        $('#customModal').hide(); // Hide the custom modal without any action
    });



   
    imagefunctions()
    debouncedUpdateMobilePreview() 

})



$('#wraparoundsubmit').on('click', function () {

    if ($('#wraparoundalt').val() === '') {
        $('.imagemessage').slideDown().delay(2000).slideUp()
        return false
    }

    wraptext = '<p >' + $('#wraparoundimage').val() + '</p>'
    wrapcatalogselect = $('#wraparoundselect').val()
    wrapimagefilename = $('#wraparoundfilename').val()
    wrapimagealt = $('#wraparoundalt').val()

    if ($('#reverseimage').val() === 'yes') {
        imagefloat = 'right'
    } else {
        imagefloat = 'left'
    }


    if (wrapcatalogselect === 'product') {

        wrapfullimage =
            '<img class="loading-lazy promoimg21 in910" style="width:45% !important; padding:0.5%" data-src="https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BFXM_PRD/on/demandware.static/-/Sites-pcrichard-master-product-catalog/default/images/hires/Z_' +
            wrapimagefilename + '.jpg?sw=400&amp;sh=400&amp;sm=fit" alt="' + wrapimagealt +
            '" src="#">'
        $('.interedit').html('<div class="width100c">' + wrapfullimage + wraptext + '</div>')
    }
    if (wrapcatalogselect === 'promo') {

        wrapimagefilename2 =
            'https://staging-na01-pcrichard.demandware.net/on/demandware.static/-/Sites-pcrichard-master-articles-catalog/default/images/promo/' +
            wrapimagefilename + '?sw=400&amp;sh=400&amp;sm=fit'
        wrapimagestyle = 'flex: 0 1 auto; max-width:50%;padding: 0.5%;float:' + imagefloat + ';'
        $('.interedit').html('<div style="' + wrapimagestyle +
            '"><img class="loading-lazy promoimg21 in910" alt="' + wrapimagealt +
            '" src="' + wrapimagefilename2 + '" data-src="' + wrapimagefilename2 +
            '"/></div></div><div style="align-items: flex-start;"><div style="flex: 1 1 auto" >' +
            wraptext + '</div>')
    }

    if (wrapcatalogselect === 'blog') {

        wrapimagefilename2 =
            'https://staging-na01-pcrichard.demandware.net/on/demandware.static/-/Sites-pcrichard-master-articles-catalog/default/images/blog/' +
            wrapimagefilename + '?sw=400&amp;sh=400&amp;sm=fit'
        wrapimagestyle = 'flex: 0 1 auto; max-width:50%;padding: 0.5%;float:' + imagefloat + ';'
        $('.interedit').html('<div style="' + wrapimagestyle +
            '"><img class="loading-lazy promoimg21 in910" alt="' + wrapimagealt +
            '" src="' + wrapimagefilename2 + '" data-src="' + wrapimagefilename2 +
            '"/></div></div><div style="align-items: flex-start;"><div style="flex: 1 1 auto" >' +
            wraptext + '</div>')


    }



   
    imagefunctions()
    $('#beautycode').val($('#pullthecode3').html())
})







$('#wraparoundproductnumber').on('input', function () {
    getthewraparoundnumber = $(this).val()
    $('.showthepreviewimage2').css('pointer-events', 'all')
    $('.showthepreviewimage2').each(function () {
        previewurld2 =
            'https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BFXM_PRD/on/demandware.static/-/Sites-pcrichard-master-product-catalog/default/images/hires/'
        imageprefix2 = $(this).attr('prefix');
        $(this).attr('src', previewurld2 + imageprefix2 + $('#wraparoundproductnumber')
            .val() + '.jpg?sw=300&sh=300&sm=fit')


        var imgs = document.getElementsByTagName('img');
        for (var i = 0, j = imgs.length; i < j; i++) {
            if (imgs[i].classList.contains(
                    'showthepreviewimage2'
                )) { // Check if the image has the specific class
                // Hide parent <div> initially until image is confirmed to load
                imgs[i].parentNode.style.display = 'none';

                imgs[i].onload = function () {
                    this.parentNode.style.display =
                        ''; // Show the parent <div> of the image
                };

                imgs[i].onerror = function (e) {
                    this.parentNode.style.display =
                        'none'; // Hide the parent <div> of the image
                };
            }
        }

    })

    $('.showthepreviewimage2').on('click', function () {

        if ($('#wraparoundalt').val() === '') {
            $('.imagemessage').slideDown().delay(2000).slideUp()
            return false
        }


        if ($('#reverseimage').val() === 'yes') {
            imagefloat = 'right'
        } else {
            imagefloat = 'left'
        }

        $('.interedit').html(
            ' <div style="flex: 0 1 auto; max-width:50%;padding: 0.5%;float:' +
            imagefloat + ';"><img  alt="' +
            $('#wraparoundalt').val() + '"' + 'src="' + $(this).attr('src') +
            '"' + '/> </div></div>' +
            '<div style="align-items: flex-start;"><div style="flex: 1 1 auto" ><p>' +
            $('#wraparoundimage').val() + '</p></div>')
       
        imagefunctions()

    })

})










document.getElementById('cinput1promotional').addEventListener('input', function () {
    catalogselector = $('#catalogselector').val()
    promotionalsource = 'https://www.pcrichard.com/on/demandware.static/-/Sites-pcrichard-master-articles-catalog/default/images/' + catalogselector;
    pimsource = 'https://staging-na01-pcrichard.demandware.net/on/demandware.static/-/Library-Sites-PCRichardSharedLibrary/default/dw3744730c'+catalogselector;

    if (catalogselector === '/blog/') {
        imagelivesource = promotionalsource
    } else {
        imagelivesource = pimsource
    }

    $('#showthepromotionalimage').attr('src', imagelivesource + $('#cinput1promotional').val())
})


/*
function postimg() {
    $('img.promoimg21').on("contextmenu", function (e) {
        e.preventDefault(); // Prevent the default context menu
        currentImage = $(this); // Set the current image
        $('#customModal').show(); // Show the custom modal
    });

    $('#closeModal').click(function () {
        $('#customModal').hide(); // Hide the custom modal without any action
    });

    $('#deleteImage').click(function () {
        currentImage.parent('a').remove();
        currentImage.remove(); // Remove the image
        $('#customModal').hide();
        // Hide the custom modal
       
    });

    $('#wrapImage').click(function () {
        $('#customModal').hide(); // Hide the custom modal
        $('#urlModal').show(); // Show the URL modal
    });


}

*/


function postimg() {
    let currentImage = null;

    // Right-click context menu on images with class 'promoimg21'
    $('img.promoimg21').on("contextmenu", function (e) {
        e.preventDefault(); // Prevent the default context menu
        currentImage = $(this); // Set the current image
        $('#customModal').show(); // Show the custom modal
    });

    // Close modal button click
    $('#closeModal').click(function () {
        $('#customModal').hide(); // Hide the custom modal without any action
        currentImage = null; // Reset the current image
    });

    // Delete image button click
    $('#deleteImage').click(function () {
        if (currentImage) {
            const parentAnchor = currentImage.parent('a');

            // Apply the transition class for smooth deletion
            currentImage.addClass('delete-transition');
            if (parentAnchor.length) {
                parentAnchor.addClass('delete-transition');
            }

            // Wait for the transition to complete before removing the elements
            setTimeout(() => {
                if (parentAnchor.length) {
                    parentAnchor.remove();
                } else {
                    currentImage.remove();
                }
                debouncedUpdateMobilePreview();
            }, 500); // Match the duration of the CSS transition

            $('#customModal').hide(); // Hide the custom modal
            currentImage = null; // Reset the current image
        }
    });

    // Wrap image with URL button click
    $('#wrapImage').click(function () {
        $('#customModal').hide(); // Hide the custom modal
        $('#urlModal').show(); // Show the URL modal
    });

    // Submit URL button click
    $('#submitUrl').click(function () {
        const url = $('#imageUrl').val(); // Get URL from input field
        if (url && url !== "http://") {
            if (currentImage) {
                if (currentImage.parent('a').length === 0) {
                    currentImage.wrap('<a href="' + url + '"></a>');
                } else {
                    currentImage.parent('a').attr('href', url);
                }
            }
        }
        $('#urlModal').hide(); // Hide the URL modal
        currentImage = null; // Reset the current image
    });

    // Handle image link click
    $('a img').on('click', function (e) {
        e.preventDefault();
        const target = $(e.target).closest('a');
        if (target.length) {
            const wheretogo = target.attr('href');
            gotothelinkfunction(wheretogo);
        }
    });
}



function pushtomobile() {
    $('#mobilepreview2').html($('.informationcontent').html());
    $('#pullthecode2').slideDown()
    $('#mobilepreview2').slideDown()
    $('#explorer2').slideDown()
   
}

$('#import' ).on('click', function () {
    $('#pullthecode2').children('div').children('.informationcontent').html('')
    $('#fileInput').click();

})

$('#importstart' ).on('click', function () {
    $('#pullthecode2').children('div').children('.informationcontent').html('')
    $('#fileInput').click();
    $('#uniqueModal').fadeOut()
})

$('#fileInput').change(function (event) {
    $('#pullthecode2').hide()
    $('#mobilepreview2').hide()
    $('#explorer2').hide()
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const fileContents = e.target.result;
            $('#pullthecode2').children('div').children('.informationcontent').html(fileContents);
            postimg()
            $('a').not('.googledrive').not('.outsidelink').not('.list-button').on('click', function (e) {
                var target = $(e.target);
                if (!target.is('a')) {
                    target = target.closest('a');
                }
                e.preventDefault();
                var wheretogo = target.attr('href');
                gotothelinkfunction(wheretogo);
    
                $('#noBtn').off('click').on('click', function () {
                    var target = $(e.target);
                    if (!target.is('a')) {
                        target = target.closest('a');
                    }
                    target.replaceWith(target.text());
                    //runexplorer();
                    document.getElementById("myModal").style.display = "none";
                });
            });
        };

        reader.readAsText(file);
        setTimeout(() => {
            enabledrop()
        }, 2000);

        $('a').not('.googledrive').not('.outsidelink').not('.list-button').on('click', function (e) {
            var target = $(e.target);
            if (!target.is('a')) {
                target = target.closest('a');
            }
            e.preventDefault();
            var wheretogo = target.attr('href');
            gotothelinkfunction(wheretogo);

            $('#noBtn').off('click').on('click', function () {
                var target = $(e.target);
                if (!target.is('a')) {
                    target = target.closest('a');
                }
                target.replaceWith(target.text());
                //runexplorer();
                document.getElementById("myModal").style.display = "none";
            });
        });
    

    } else {

    }

    setTimeout(pushtomobile, 2000);


})


function attachTripleClickHandlerToImportedContent() {
    // Select all <div> elements with the class 'importedContent'
    const elements = document.querySelectorAll('.importedContent');

    elements.forEach(function (element) {
        let clickCount = 0; // Initialize click counter
        let clickTimer = null; // Initialize timer

        element.addEventListener('click', function () {
            clickCount++; // Increment click count on each click

            if (clickCount === 1) {
                // Start a timer if this is the first click
                clickTimer = setTimeout(function () {
                    clickCount = 0; // Reset click count after the timeout
                }, 400); // Set timeout (400ms). Adjust as needed.
            } else if (clickCount === 3) {
                // If it's the third click, make the content editable
                element.contentEditable = "true";
                element.focus(); // Optional: bring focus to the editable element

                clearTimeout(clickTimer); // Clear the timer
                clickCount = 0; // Reset click count
            }
        });

        // Add keypress event listener to handle Enter key
        element.addEventListener('keypress', function (event) {
            // Check if the Enter key was pressed
            if (event.key === 'Enter' || event.keyCode === 13) {
                event.preventDefault(); // Prevent default action (important if inside a form)
               
            }
        });
    });
}







document.getElementById('fileimport').addEventListener('change', function () {
    var file = this.files[0];
    if (!file) return; // Exit if no file is selected

    // Function to display content for .html and .txt files
    function displayDirectContent(fileContent) {
        // Process and display the file content directly without conversion
        var processedContent = fileContent.replace(/https:\/\/www\.pcrichard\.com/g, '');
        var $content = $('<div>').html(processedContent);
        $content.find('h1, h2 , h3 , h4 ,h5').addClass('t-h4-style').css('color', 'rgb(3, 70, 148)').wrap('<div class="pd-header-tag width100c"></div>');
        $content.find('a').filter(function () {
            return $.trim($(this).text()) === '' && $(this).children().length === 0;
        }).remove();
        $('.hidecss').show();
        $('.onblock').removeClass('onblock');
        $('.internalbuttons').slideDown();
        $('.informationcontent').append(
            '<div class="width100c layoutpale layoutpale100 liverow droppable onblock">' +
            '<div class="width100c liveelement in910 layoutpale layoutpale100 importedContent interedit">' +
            $content.html() + '</div></div>'
        );

        attachEventHandlers();

        attachTripleClickHandlerToImportedContent();
    }

    // Function to display content, specifically for converting .docx to HTML
    function displayConvertedContent(htmlContent) {

        // Similar to displayDirectContent but specifically for .docx conversion results

        var processedHtmlContent = htmlContent.replace(/https:\/\/www\.pcrichard\.com/g, '');
        var $htmlContent = $('<div>').html(processedHtmlContent);
        $htmlContent.find('h1, h2 , h3 , h4 ,h5').addClass('t-h4-style').css('color', 'rgb(3, 70, 148)').wrap('<div class="pd-header-tag width100c layoutpale layoutpale100 liverow droppable"><div class="width100c liveelement in910 layoutpale  layoutpale100"></div></div>');

        $htmlContent.find('p').wrap('<div class="width100c layoutpale layoutpale100 liverow droppable"><div class="width100c liveelement in910 layoutpale  layoutpale100"></div></div>');

        $htmlContent.find('a').filter(function () {
            return $.trim($(this).text()) === '' && $(this).children().length === 0;
        }).remove();

        $('.hidecss').show();
        $('.onblock').removeClass('onblock');
        $('.internalbuttons').slideDown();

        $('.informationcontent').append(
            '<div class="width100c layoutpale layoutpale100 liverow droppable onblock">' +
            '<div class="width100c liveelement in910 layoutpale layoutpale100 importedContent interedit">' +
            $htmlContent.html() + '</div></div>'
        );

        pushtomobile()
        attachEventHandlers();
        attachTripleClickHandlerToImportedContent();
      
        $('a').not('.googledrive').not('.outsidelink').not('.list-button').on('click', function (e) {
            var target = $(e.target);
            if (!target.is('a')) {
                target = target.closest('a');
            }
            e.preventDefault();
            var wheretogo = target.attr('href');
            gotothelinkfunction(wheretogo);

            $('#noBtn').off('click').on('click', function () {
                var target = $(e.target);
                if (!target.is('a')) {
                    target = target.closest('a');
                }
                target.replaceWith(target.text());
                //runexplorer();
                document.getElementById("myModal").style.display = "none";
            });
        });
    }

    // Attach event handlers for dynamically added content
    function attachEventHandlers() {

paragraphfunctions() 


       

    }

    // Determine file type and process accordingly
    if (file.name.endsWith('.docx')) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var arrayBuffer = e.target.result;
            mammoth.convertToHtml({
                    arrayBuffer: arrayBuffer
                })
                .then(function (result) {
                    displayConvertedContent(result.value); // Display the converted HTML
                })
                .catch(function (err) {
                    console.log(err);
                });
        };
        reader.readAsArrayBuffer(file);
    } else {
        // For .txt or .html, read as text and display directly
        var reader = new FileReader();
        reader.onload = function (e) {
            var fileContent = e.target.result;
            displayDirectContent(fileContent);
        };
        reader.readAsText(file);
    }

   
    paragraphfunctions()

  
    setTimeout(() => {
        

        const observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                if (mutation.type === 'childList' || mutation.type === 'subtree') {
                  //  updateExplorer();
          
                    break;
                }
            }
        });
        observer.observe(document.querySelector('#pullthecode2'), { childList: true, subtree: true });



    }, 2000);

 

});



$('#export').on('click', function () {
    // Get the content from the codeview div
    var content = $('#pullthecode2').children('div').children('.informationcontent').html();

    

    // Copy the content to the clipboard
    const el = document.createElement('textarea');
    el.value = content;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    var blob = new Blob([content], {
        type: 'text/plain'
    });
    var url = URL.createObjectURL(blob);

    // Create a download link
    var a = document.createElement('a');
    a.href = url;
    a.target = '_blank';

    namethatfile = $('#nametextfile').val();

    if (namethatfile === '') {
        a.download = 'Domcell-Pagebuilder.txt';
    } else {
        a.download = namethatfile + '.txt';
    }

    a.click();

    // Clean up the object URL
    URL.revokeObjectURL(url);
});



$('#exportfinalcodetofile').off('click').on('click', function () {
    // Get the content from the codeview div
    var content2 = $('#thisisthefinalcode').text();

    // Copy the content to the clipboard
    const el2 = document.createElement('textarea');
    el2.value = content2; // Corrected variable name
    document.body.appendChild(el2);
    el2.select();
    document.execCommand('copy');
    document.body.removeChild(el2);

    var blob2 = new Blob([content2], { // Corrected variable name
        type: 'text/plain'
    });
    var url2 = URL.createObjectURL(blob2);

    // Create a download link
    var a2 = document.createElement('a');
    a2.href = url2;
    // Removed a2.target = '_blank';

    var namethatfile2 = $('#nametextfile').val();

    if (namethatfile2 === '') {
        a2.download = 'Domcell-Pagebuilder.txt';
    } else {
        a2.download = namethatfile2 + '.txt';
    }

    a2.click();

    // Clean up the object URL
    URL.revokeObjectURL(url2);
});



function clearIndexedDB() {
    const dbName = 'DomcellDB';  // Ensure this matches the database used throughout your app
    const storeName = 'DomcellcontentStore';  // Ensure this matches the store name used in your app

    // Open a connection to your database
    var request = indexedDB.open(dbName, 1);

    request.onerror = function(event) {
        console.error("Database error: " + event.target.errorCode);
    };

    request.onupgradeneeded = function(event) {
        // Handle any upgrades or initial setup here if needed
        var db = event.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: 'id' });
        }
    };

    request.onsuccess = function(event) {
        var db = event.target.result;

        // Create a transaction on the correct store with readwrite permissions
        var transaction = db.transaction([storeName], "readwrite");
        var objectStore = transaction.objectStore(storeName);

        // Clear all the data in the object store
        var clearRequest = objectStore.clear();

        clearRequest.onsuccess = function() {
            // Data cleared successfully
            console.log("IndexedDB data cleared successfully.");
            window.clearAndRestartClicked = true;
            location.reload();  // Reload the page to reset everything after clearing the data
        };

        clearRequest.onerror = function(event) {
            console.error("Clear operation failed: ", event.target.errorCode);
        };
    };
}






$(document).ready(function() {
    const contentArea = $('#pullthecode2');
    const urlModal = $('#urlModal');
    const desktopHideCheckbox = $('#desktophidev2d');
    const mobileHideCheckbox = $('#mobilehidev2d');
    const dbName = 'DomcellDB';
    const storeName = 'DomcellcontentStore';
    let db;

 

    // Initialize IndexedDB
    function initDB() {
        const request = indexedDB.open(dbName, 1);

        request.onupgradeneeded = function(event) {
            db = event.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, { keyPath: 'id' });
            }
        };

        request.onsuccess = function(event) {
            db = event.target.result;
            loadContent(); // Load content once DB is initialized
        };

        request.onerror = function(event) {
            console.error('Error opening IndexedDB:', event.target.errorCode);
           
        };
    }

 
    
    function saveContent(content) {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.put({ id: 'savedContent', htmlContent: content });

        request.onsuccess = function() {
           // console.log('Content saved to IndexedDB successfully!');
        };

        request.onerror = function(event) {
            console.error('Error saving content to IndexedDB:', event.target.errorCode);
        };
    }


  
    function checkElementContent() {
        var element = document.getElementById('pullthecode3');
        if (element.innerHTML.trim() === '') {
            $('.unique-modal').fadeIn()
        } 
    }




    function loadContent() {
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get('savedContent');

        request.onsuccess = function(event) {
            const data = event.target.result;
            if (data) {
                contentArea.html(data.htmlContent);
                document.querySelector('.unique-modal').style.display = 'none'; // Hide the modal if content 

               
              
            } else {
                document.querySelector('.unique-modal').style.display = 'block'; // Show the modal if no content exists
               

                  if (parent && parent.document) {
        // Hide the element with id 'headerstart' in the parent document
        var headerElement = parent.document.getElementById('headerstart');
        if (headerElement) {
            headerElement.style.display = 'none';
        }}
            }
            initializeUI();
            $('a').not('.googledrive').not('.outsidelink').not('.list-button').on('click', function (e) {
                var target = $(e.target);
                if (!target.is('a')) {
                    target = target.closest('a');
                }
                e.preventDefault();
                var wheretogo = target.attr('href');
                gotothelinkfunction(wheretogo);
    
                $('#noBtn').off('click').on('click', function () {
                    var target = $(e.target);
                    if (!target.is('a')) {
                        target = target.closest('a');
                    }
                    target.replaceWith(target.text());
                    //runexplorer();
                    document.getElementById("myModal").style.display = "none";
                });
            });
        };

        request.onerror = function(event) {
            console.error('Error loading content from IndexedDB:', event.target.errorCode);
        };

     
       setTimeout(() => {
         checkElementContent()
       }, 100);
        
    }


   



    // Initialize UI components after content is loaded
    function initializeUI() {
   
        enabledrop();
        imagefunctions();
        paragraphfunctions();
        $mobilePreview.html($pullTheCode.html());
    }

    // Event handling for links
    $('body').on('click', 'a:not(.googledrive, .outsidelink)', function(e) {
        e.preventDefault();
        const target = $(e.target).closest('a');
        gotothelinkfunction(target.attr('href'));
        imagefunctions();
    });

    // Cancel URL modal
    $('#cancelUrl').click(function() {
        urlModal.hide();
       
    });

    // Handle class toggles

 
    /*
    $('.liverow').click(function() {
        $('.onblock').removeClass('onblock');
        $(this).addClass('onblock');
        desktopHideCheckbox.prop('checked', $(this).hasClass('hideonlyondesktop'));
        mobileHideCheckbox.prop('checked', $(this).hasClass('hideonlyonmobile'));
    });
*/
   

    // Clear storage and restart application
    $('#clearandrestartbutton').click(function() {
        clearIndexedDB(); // Call the function to clear IndexedDB
       // $('#clearVersionsBtn').click()
    });

    // Save data before unloading the page
    $(window).on('beforeunload', function() {
        if (!window.clearAndRestartClicked) {
            saveContent(contentArea.html());
        }
    });

    // Initialize the IndexedDB
    initDB();
  


    var versionvvv = 1;
    var saveInterval;
    
    function startSaveInterval() {
        saveInterval = setInterval(function() {
            saveContent(contentArea.html()); // Assuming contentArea is a jQuery object
            var infoElement = $('.saveinfo');
            infoElement.text('Workspace Saved');  // Update text immediately
    
            setTimeout(function() {
                infoElement.text('Saved Version (' + versionvvv + ')');
                versionvvv++;
            }, 2500);
        }, 60000);  // Repeat every 60000ms (60 seconds)
    }
    
    // Start the initial interval
    startSaveInterval();
    
    $('#savetomemory').on('click', function() {
        clearInterval(saveInterval);  // Clear the existing interval
        saveContent(contentArea.html());  // Save content immediately on click
        var infoElement = $('.saveinfo');
        infoElement.text('Workspace Saved');  // Update text immediately
    
        setTimeout(function() {
            infoElement.text('Saved Version (' + versionvvv + ')');
            versionvvv++;
        }, 2500);
    
        startSaveInterval();  // Restart the interval
    });



    var textContent = $('.editor-input').val(); // Extract just the text from the textarea
    $('.editor-input').replaceWith(textContent);

});



document.getElementById('convertBtn').addEventListener('click', () => {
    const fileInput = document.getElementById('csvFileInput');
    const progressBar = document.getElementById('progressBar');
    const statusReport = document.getElementById('statusReport');
    let convertedCount = 0;
    let failedCount = 0;

    // Retrieve user settings
    const includeHeader = document.getElementById('includeHeader').checked;
    const filenameSuffix = document.getElementById('filenameSuffix').value || '';

    if (fileInput.files.length > 0) {
        progressBar.style.width = '0%'; // Reset progress bar
        progressBar.innerText = '0%';
        const totalFiles = fileInput.files.length;
        Array.from(fileInput.files).forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = function(event) {
                try {
                    const csvContent = event.target.result;
                    const vttContent = csvToVtt(csvContent, includeHeader);
                    downloadVttFile(vttContent, file.name.replace('.csv', '') + filenameSuffix + '.vtt');
                    convertedCount++;
                } catch (error) {
                    console.error("Conversion failed for file:", file.name, error);
                    failedCount++;
                }
                updateProgress(index + 1, totalFiles);
            };
            reader.onerror = () => {
                console.error("Failed to read file:", file.name);
                failedCount++;
                updateProgress(index + 1, totalFiles);
            };
            reader.readAsText(file);
        });
    } else {
        alert('Please select at least one CSV file.');
    }

    function updateProgress(processedFiles, totalFiles) {
        const progressPercentage = (processedFiles / totalFiles) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        progressBar.innerText = `${progressPercentage.toFixed(0)}%`;

        if (processedFiles === totalFiles) {
            statusReport.innerHTML = `Conversion completed. Success: ${convertedCount}, Failed: ${failedCount}`;
        }
    }
});

function csvToVtt(csvText, includeHeader) {
    let vttText = includeHeader ? "WEBVTT\n\n" : "";
    const lines = csvText.split("\n");
    lines.forEach((line, index) => {
        if (line.trim()) {
            const parts = line.split(",");
            if (parts.length >= 3) {
                const startTime = parts[0].trim();
                const endTime = parts[1].trim();
                const text = parts.slice(2).join(",").trim();
                vttText += `${index}\n${startTime} --> ${endTime}\n${text}\n\n`;
            }
        }
    });
    return vttText;
}

function downloadVttFile(vttText, filename) {
    const blob = new Blob([vttText], { type: 'text/vtt' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none"; // Hide the element
    a.href = url;
    a.download = filename; // Set the download name
    a.className = "outsidelink"; // Prevent modal trigger
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

document.addEventListener('DOMContentLoaded', function () {
   
    const listTitleInput = document.getElementById('listTitle');
    const listAmountSelect = document.getElementById('listAmount');
    const listTypeSelect = document.getElementById('listType');
    const listItemsContainer = document.getElementById('listItems');
    const submitListButton = document.getElementById('submitList');
    const exportListButton = document.getElementById('exportList');
    const importListButton = document.getElementById('importList');
    const fileInput = document.getElementById('fileInputList');

    function initializeListAmountOptions() {
        for (let i = 1; i <= 10; i++) {
            let option = new Option(`${i} Item${i > 1 ? 's' : ''}`, i);
            listAmountSelect.add(option);
        }
        updateListInputs(1); // Initialize with 1 input field
    }

    function updateListInputs(numberOfItems) {
        listItemsContainer.innerHTML = '';
        for (let i = 1; i <= numberOfItems; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'form-control list-item-input';
            input.placeholder = `List Item ${i}`;
            listItemsContainer.appendChild(input);
        }
       
    }

    listAmountSelect.addEventListener('change', function () {
        updateListInputs(parseInt(this.value));
    });

    submitListButton.addEventListener('click', function () {
        const titleText = listTitleInput.value.trim();
        const items = Array.from(document.querySelectorAll('.list-item-input'))
                           .map(input => input.value.trim())
                           .filter(item => item !== '');

        const listContainer = document.querySelector('.interedit');

        // Create title element if title is provided
        if (titleText) {
            const titleElement = document.createElement('h3');
            titleElement.textContent = titleText;
            titleElement.style.marginBottom = '5px';
            listContainer.appendChild(titleElement);
        }

        // Create list element
        const listType = listTypeSelect.value === '1' ? 'ul' : 'ol';
        const listElement = document.createElement(listType);
        listElement.className = 'in910';

        // Append list items to list element
        items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            listElement.appendChild(listItem);
        });

        // Append the new list to the container without replacing existing content
        listContainer.appendChild(listElement);
       
        $('#listTitle').val('')
        $('.list-item-input').val('')
    });

    exportListButton.addEventListener('click', function () {
        const data = {
            title: listTitleInput.value,
            type: listTypeSelect.value,
            items: Array.from(document.querySelectorAll('.list-item-input')).map(input => input.value)
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.className = 'outsidelink';  // Add this class to distinguish this link from others
        a.href = url;
        a.download = 'list.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    importListButton.addEventListener('click', function () {
        fileInput.click();
    });

    fileInput.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const data = JSON.parse(event.target.result);
                listTitleInput.value = data.title;
                listTypeSelect.value = data.type;
                updateListInputs(data.items.length);
                data.items.forEach((item, index) => {
                    document.querySelectorAll('.list-item-input')[index].value = item;
                });
            };
            reader.readAsText(file);
        }
    });

    initializeListAmountOptions();
    
});

function adjustMaxHeight() {
    $('#pullthecode2').css('max-height', $(window).height() - 70);
    $('#explorer2').css('max-height', $(window).height() - 570);
    $('.internalscroller').css('max-height', $(window).height() - 435);
}

// Run the function initially
adjustMaxHeight();

// Bind the function to the window resize event
$(window).resize(function() {
    adjustMaxHeight();
});





let searchIndex = -1;
let searchResults = [];

$(document).ready(function() {
    $('#beautycode').on('input', function() {
       
        $('#pullthecode3').html($('#beautycode').val());
        $('#mobilepreview2 #pullthecode3').html($('#beautycode').val());


        $('.totalinternalcontent').find('img').each(function() {
            var $img = $(this);
            if (!$img.hasClass('promoimg21')) {
                $img.addClass('promoimg21');
            }

            $('.totalinternalcontent').find('a').not('.googledrive').not('.outsidelink').not('.list-button').on('click', function (e) {
                e.preventDefault();
                var target = $(e.target);
                if (!target.is('a')) {
                    target = target.closest('a');
                }
                e.preventDefault();
                var wheretogo = target.attr('href');
                gotothelinkfunction(wheretogo);
        
                $('#noBtn').off('click').on('click', function () {
                    var target = $(e.target);
                    if (!target.is('a')) {
                        target = target.closest('a');
                    }
                    target.replaceWith(target.text());
                    //runexplorer();
                    document.getElementById("myModal").style.display = "none";
                });
            });



        });

        // Reset the search when the content changes
        resetFind();
    });

    $('#searchText').on('input', function() {
        // Reset the search when the search term changes
        resetFind();
    });

    $('#beautycode').on('focus', function() {
        $('#mobilepreview2 #pullthecode3').html($('#beautycode').val());
    });
});

function findNext() {
    const textarea = document.getElementById('beautycode');
    const searchText = document.getElementById('searchText').value;
    const content = textarea.value;

    if (!searchText) {
        return;
    }

    if (searchResults.length === 0) {
        // Find all instances of the search text
        searchResults = [];
        let startIndex = 0;
        let index;

        while ((index = content.toLowerCase().indexOf(searchText.toLowerCase(), startIndex)) > -1) {
            searchResults.push(index);
            startIndex = index + searchText.length;
        }

        if (searchResults.length === 0) {
            alert('Text not found');
            return;
        }
    }

    // Move to the next result
    searchIndex = (searchIndex + 1) % searchResults.length;
    const startIndex = searchResults[searchIndex];
    const endIndex = startIndex + searchText.length;

    // Select the found text
    textarea.focus();
    textarea.setSelectionRange(startIndex, endIndex);
}

function resetFind() {
    searchIndex = -1;
    searchResults = [];
}



$('.unique-box').delay(600).fadeIn(800)



function bringbackthehomebutton() {
    if (parent && parent.document) {
        // Hide the element with id 'headerstart' in the parent document
        var headerElement = parent.document.getElementById('headerstart');
        var headerElement2 = parent.document.getElementById('add-tab');
        if (headerElement) {
            headerElement.style.display = 'block';
        }

        if (headerElement2) {
            headerElement2.style.display = 'block';
        }
    }
}


document.querySelectorAll('.unique-box').forEach(box => {
    box.addEventListener('click', function() {

        switch (this.id) {
            case 'box1u':
                // Action for box 1
                $('div.thetopbox[whatbox="Layout"]').click()
                $("#uniqueModal").hide("fold", {horizFirst: true}, 1000);
                bringbackthehomebutton()  
                break;
            case 'box2u':
                // Action for box 2
                var dothemath = $(document).height()

                $('#beautycode').val($('#pullthecode3').html())
               $('#mymatrix3').css('position' , 'absolute').css('height' , 'auto').css('width' , '72%').animate({'max-height' : 'auto'})
               $('#mymatrix3').addClass('bottomclassviewers').css('wdith' , '73%').css('margin-top' , '-41%').show()
               $('#resizable-div').animate({'min-height' : dothemath -5})
        
                $('#pullthecode2').animate({'min-height' : dothemath / 2})
                $('#beautycode').animate({'min-height' :dothemath / 3})

                $('#pullthecode2').animate({'max-height' : dothemath / 2})
                $('#beautycode').animate({'max-height' :dothemath / 3})

                
                $('div.thetopbox[whatbox="Tools"]').click()
                $('#tools1').click()
                $("#uniqueModal").hide("fold", {horizFirst: true}, 1000);
                bringbackthehomebutton()

                
                $('#mymatrix6').hide()
                $('#pullthecode2').show()
                $('#mymatrix3').show()
                $('#sidetoolset').show()
                $('#mobilepreview2').show()

                $('#explorer2').show().animate({'max-height' : dothemath / 2})
                $('#programming').animate({'max-height' : dothemath -25})
                break;
            case 'box3u':
                // Action for box 3
                //$('.unique-box').hide()
                $('#importstart').click()
                bringbackthehomebutton()
                break;
            case 'box4u':
                $('#pluginsandtools').click()
                $('button.outsideplugins[whaturl="bannersheduler-v2.html"]').click()
                $("#uniqueModal").hide("fold", {horizFirst: true}, 1000);
                bringbackthehomebutton()
                break;
                case 'box5u':
                    $('#pullthecode3').empty()
                    $('div.thetopbox[whatbox="Tools"]').click()  
                    $('#tools4').click()
                    $('.addrow-click').click()
                    $('#addrow1x1a').delay(800).click()
                    $("#uniqueModal").hide("fold", {horizFirst: true}, 1000);
                    bringbackthehomebutton()
                 break;
                 case 'box6u':
                    $('div.openthematrix[mymatrix="mymatrix6"]').click()
                    $("#uniqueModal").hide("fold", {horizFirst: true}, 1000);
                    bringbackthehomebutton()
                 break;

                 case 'box7u':
                    //$('div.openthematrix[mymatrix="mymatrix6"]').click()
                    $('#fileimport').click()
                    $("#uniqueModal").hide("fold", {horizFirst: true}, 1000);
                    $('#mymatrix3').hide()
                    bringbackthehomebutton()
                 break;


                 case 'box8u':
                    //$('div.openthematrix[mymatrix="mymatrix6"]').click()
                    $('#showVersionsBtn').click()
                    $('.unique-box ').fadeOut()
                    bringbackthehomebutton()
                 break;

                 

            default:
                console.log('Unknown box clicked');
        }
       
    });
});

$('.closemodalbutton').on('click' , function() {
    $("#uniqueModal").hide("fold", {horizFirst: true}, 1000);
    bringbackthehomebutton()
})

$('.closeapllicationbutton').on('click' , function() {
    parent.location.href = 'gettingstarted-new.html';
})

$('.outsideplugins2').on('click' , function() {
    $('#clearandrestartbuttonrefresh').click()
})


const dbName = "layoutDB";
const storeName = "positions";

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onupgradeneeded = event => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, { keyPath: "id" });
            }
        };

        request.onsuccess = event => resolve(event.target.result);
        request.onerror = event => reject(event.target.error);
    });
}

function savePosition(position) {
    openDB().then(db => {
        const transaction = db.transaction([storeName], "readwrite");
        const store = transaction.objectStore(storeName);
        store.put({ id: "layout", position });
    });
}

function getPosition() {
    return new Promise((resolve, reject) => {
        openDB().then(db => {
            const transaction = db.transaction([storeName], "readonly");
            const store = transaction.objectStore(storeName);
            const request = store.get("layout");

            request.onsuccess = event => resolve(event.target.result ? event.target.result.position : null);
            request.onerror = event => reject(event.target.error);
        });
    });
}
$('#reverse').on('click', function () {
    let position;
    if ($('#programming').next().is('#resizable-div')) {
        $('#resizable-div').insertBefore('#programming');
        position = "resizable-div-first";
    } else {
        $('#programming').insertBefore('#resizable-div');
        position = "programming-first";
    }
    savePosition(position);
});

$(document).ready(function () {
    getPosition().then(position => {
        if (position === "resizable-div-first" && $('#programming').next().is('#resizable-div')) {
            $('#resizable-div').insertBefore('#programming');
        } else if (position === "programming-first" && $('#resizable-div').next().is('#programming')) {
            $('#programming').insertBefore('#resizable-div');
        }
    });
});


$('#viewchange').on('click' , function() {
    $('#myModalcontentviewers').show()
})

$('.closeviewers').on('click' , function() {
    $('#myModalcontentviewers').hide()
})

$('#fecthID').on('click' , function() {
    $('#fetchmyid').show()
})

$('#fetchmyid .close').on('click', function() {
    $('#fetchmyid').hide()
})



let db;
const request = indexedDB.open('MarginTopDB', 1);

request.onupgradeneeded = function(event) {
    db = event.target.result;
    const store = db.createObjectStore('positions', { keyPath: 'id' });
};

request.onsuccess = function(event) {
    db = event.target.result;
    loadPositions();
};

request.onerror = function(event) {
    console.error('Database error:', event.target.errorCode);
};

function savePositions(elements) {
    const transaction = db.transaction(['positions'], 'readwrite');
    const store = transaction.objectStore('positions');

    elements.each(function(index) {
        const id = $(this).attr('id') || `embed-${index}`; // Ensure each element has a unique ID
        const position = {
            id: id,
            marginTop: $(this).css('margin-top')
        };
        store.put(position);
    });
}

function loadPositions() {
    const transaction = db.transaction(['positions'], 'readonly');
    const store = transaction.objectStore('positions');
    const request = store.getAll();

    request.onsuccess = function(event) {
        const positions = event.target.result;
        positions.forEach(position => {
            const element = $(parent.document.getElementById(position.id));
            if (element.length) {
                element.css('margin-top', position.marginTop);
            }
        });
    };

    request.onerror = function(event) {
        console.error('Database error:', event.target.errorCode);
    };
}

$('#hidemytabs').on('click', function() {
    const headerElements = $(parent.document.getElementsByTagName('embed')); // wrap with jQuery
    headerElements.each(function() {
        const currentMarginTop = $(this).css('margin-top');
        if (currentMarginTop === '-39px' || currentMarginTop === '-39px') {
            $(this).animate({ 'margin-top': '0px' }, 500);
            $('#uniqueModal').css('margin-top' , '0px')
            var tabElementstart = parent.document.getElementById('add-tab');
            tabElementstart.style.display = 'block'
        } else {
            $(this).animate({ 'margin-top': '-39px' }, 500);
            $('#uniqueModal').css('margin-top' , '33px')
        }
    });

    // Save positions after animation
    setTimeout(function() {
        savePositions(headerElements);
    }, 600); // Ensure it runs after the animation completes
});




// script.js
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('pullthecode2');
    let history = [];
    let historyIndex = -1;
  
    // Save the current state of the container to the history
    function saveHistory() {
      // If the current history index is not at the latest entry, remove all entries after the current index
      if (historyIndex < history.length - 1) {
        history = history.slice(0, historyIndex + 1);
      }
      history.push(container.innerHTML);
      historyIndex = history.length - 1;
    }
  
    // Undo the last change
    function undo() {
      if (historyIndex > 0) {
        historyIndex--;
        container.innerHTML = history[historyIndex];
      }
    }
  
    // Redo the undone change (if any)
    function redo() {
      if (historyIndex < history.length - 1) {
        historyIndex++;
        container.innerHTML = history[historyIndex];
      }
    }
  
    // Initialize the history with the current state
    saveHistory();
  
    // Add event listener for the container input to save history on changes
    container.addEventListener('input', saveHistory);
  
    // Add event listener for keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        undo();
      } else if (e.ctrlKey && e.key === 'y') {
        e.preventDefault();
        redo();
      }
    });
  });

  $('#pullthecode2').on('input', function() {
    $('#beautycode').val($('#pullthecode2').html());
  });

  $('#loadimage').on('click', function() {
    $('.explorerselected').each(function() {
        const currentSrc = $(this).attr('src');
        const baseUrl = 'https://www.pcrichard.com/on/demandware.static/-/Sites-pcrichard-master-articles-catalog/default/dw543ecf73';
        // Check if the currentSrc already contains the baseUrl
        if (!currentSrc.includes(baseUrl)) {
            const newSrc = baseUrl + currentSrc;
            $(this).attr('src', newSrc).addClass('promoimg21');
        }
    });
    $('#beautycode').val($('#pullthecode2').html());
});