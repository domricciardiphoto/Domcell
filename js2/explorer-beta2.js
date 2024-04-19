$('#EditandSubmitAL').on('click', function () {
    $('.explorerselected').html($('#myhtmleditor').val())
    $('#mobilepreview2').html($('#pullthecode2').html());
    runexplorer();
})

$(".draggable").draggable({
    revert: "valid"
});

function enabledrop() {
    $(".droppable").droppable({

        drop: function (event, ui) {
            var mysize = $(ui.draggable).attr('size');
            var mypale = $(ui.draggable).attr('pale');
            $('.interedit').removeClass('interedit')
            if (mysize !== undefined && mysize !== "") {
                $(this).append('<div class="' + mysize + ' in910 layoutpale interedit layoutpale' + mypale + '"></div>');

            }

            $('#mobilepreview2').html($('#pullthecode2').html());
            runexplorer();

        }

    })
}



function editElement(clickedElement) {
    // Retrieve the linked HTML element from the `.indent` data
    var targetElement = $(clickedElement).data('linkedElement');

    // Check if the target element is already in edit mode to avoid re-initialization
    if (!$(targetElement).is('.edit-mode')) {
        var originalContent = $(targetElement).html();

        // Create an input field for editing text
        var input = $('<input>', {
            type: 'text',
            value: originalContent.trim(),
            class: 'editor-input',
            css: {
                width: '100%',
            },
            blur: function() {
                // When user clicks outside the input, update the element and remove input
                $(targetElement).html($(this).val()).removeClass('edit-mode');
                 // Refresh the explorer view if needed
                 runexplorer()
            },
            keyup: function(e) {
                if (e.key === 'Enter') {
                    // Save on Enter key and remove input field
                    $(this).blur();
                }
            }
        });

        // Handle clicks on the input to prevent link activation if inside an <a> tag
        input.on('click', function(event) {
            event.stopPropagation(); // Prevent the click from propagating to parent <a> tags
            event.preventDefault();  // Prevent any default action triggered by the click
        });

        // Replace the target element's content with the input field and focus it
        $(targetElement).html(input).addClass('edit-mode');
        input.focus();
    }
    
}



function duplicateElement(clickedElement) {
    var originalElement = $(clickedElement).data('linkedElement');
    var clone = $(originalElement).clone();
    $(originalElement).after(clone);

}

function runexplorer() {
    
    $('#explorer2').empty();    // Clear the existing content
    const target = document.getElementById('pullthecode3');
    const explorer = document.getElementById('explorer2');

    let lastSelectedElement = null; // Track the last selected element for removing highlights

    const excludedClasses = [
        'informationcontent', 'layoutbuilder', 'sortable', 'layoutop2', 'experience-component',
        'experience-pcrs_assets-markup', 'liveelement', 'in910', 'layoutpale', 'layoutpale33',
        'layoutpale20', 'layoutpale25', 'layoutpale40', 'layoutpale50', 'layoutpale75',
        'layoutpale60', 'layoutpale80', 'layoutpale100', 'ui-sortable', 'ui-sortable-disabled',
        'liverow', 'droppable', 'ui-droppable', 'loading-lazy', 'promoimg21', 'ui-sortable-handle',
        'interedit', 'onblock', 'width50c2' , 'width50c3'
    ];

    function exploreElements(element, depth = 0, parentContainer = explorer) {
        let elements = element.children;
        for (let i = 0; i < elements.length; i++) {
            let tagLabel = elements[i].tagName;
            let specialLabel = getSpecialLabel(elements[i]);
            let labelColor = getColorForTag(tagLabel, elements[i]);
            let classDisplay = getClassDisplay(elements[i]);
            let linkDetails = ''; // Initialize empty link details string
    
            // Check if the element is an anchor tag and add its text and href attribute to the display
            if (elements[i].tagName.toLowerCase() === 'a' && elements[i].hasAttribute('href')) {
                let linkedText = elements[i].textContent.trim(); // Get the text content of the link
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
            // Store a reference to the explorer indent on the DOM element for easy access
            elements[i].explorerIndent = details;
    
            details.addEventListener('click', function() {
                selectAndHighlightElement(elements[i]);
            });
    
            elements[i].addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent event propagation
                selectAndHighlightElement(elements[i], true);
            });
    
            if (elements[i].children.length > 0) {
                exploreElements(elements[i], depth + 1, parentContainer);
            }
        }
    }

    function selectAndHighlightElement(element, scrollElement = false) {
        // First, check if the element is actually present in the DOM within #pullthecode2
        if (!element || !$('#pullthecode2').find(element).length) {
                                                            // console.error('Element not found in #pullthecode2 or is undefined');
            return; // Exit the function if element is not found or is undefined
        }
    
        clearSelection(); // Assuming this function clears any prior selections properly
        $('.explorerselected').removeClass('explorerselected');

    
        // Since the element exists and is part of #pullthecode2, add the class
        element.classList.add('explorerselected');

        // Trigger a click, assuming you're simulating a click event for some functionality
        $(element).click(); // Using jQuery here since your setup appears to integrate it
        $('#contextMenu').hide(); // Assuming you want to hide some contextual menu
        $('#myhtmleditor').val($('.explorerselected').html()); // Update HTML editor value
    
        // Handle visual selection and scrolling if needed
        if (element.explorerIndent) {
            element.explorerIndent.classList.add('indentselected');
            element.explorerIndent.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }
        if (scrollElement && element.scrollIntoView) {
            element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }
        lastSelectedElement = element; // Update last selected element
    }

    function clearSelection() {
        if (lastSelectedElement) {
            lastSelectedElement.classList.remove('explorerselected');
            if (lastSelectedElement.explorerIndent) {
                lastSelectedElement.explorerIndent.classList.remove('indentselected');
            }
        }
    }

   $('.liverow').on('click' , function() {
    $('.onblock').removeClass('onblock')
$(this).addClass('onblock')
   })

   $('.in910').on('click' , function() {
     $('.interedit').removeClass('interedit')
     $(this).addClass('interedit')
   })

    

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
            return '#007bff'; // Blue
        } else if (element.classList.contains('liveelement')) {
            return '#ffc107'; // Yellow
        }
        return '#28a745'; // Green
    }

    function getClassDisplay(element) {
        let classesArray = Array.from(element.classList).filter(cls => !excludedClasses.includes(cls));
        return classesArray.length > 0 ? `<span style="font-size: smaller;"> (${classesArray.join(' ')})</span>` : '';
    }

    exploreElements(target);
    
}


$(document).on('contextmenu', '.indent', function(e) {
    e.preventDefault();
    $('#contextMenu').css({
        display: "block",
        left: e.pageX,
        top: e.pageY
    }).data('clickedElement', this); // Attach the clicked element data to the context menu
    return false;
});



$('#contextMenu ul li').click(function() {
    var action = $(this).attr('id');
    var clickedElement = $('#contextMenu').data('clickedElement');
    switch (action) {
        case 'delete':
            var correspondingElement = $(clickedElement).data('linkedElement');
            $(correspondingElement).remove(); // Remove the corresponding element in #pullthecode3
            $(clickedElement).remove(); // Remove the `.indent`
            $('#mobilepreview2').html($('#pullthecode2').html());
            runexplorer();
            break;
            case 'duplicate':
            duplicateElement(clickedElement);
            $('#mobilepreview2').html($('#pullthecode2').html());
            runexplorer()
            break;
        case 'component':
            $('#addrow1x1a').click()
            break;
            case 'empty':
                $('.explorerselected').empty()
                $('#mobilepreview2').html($('#pullthecode2').html());
                runexplorer()
            break;
        case 'edit':
            editElement(clickedElement);
            break;
    }
    $('#contextMenu').hide(); // Hide the menu after action
});


$('#fullinterface').on('click' , function() {
    $('#contextMenu').hide();
})



$(document).not('#myhtmleditor').on('click', function() {
    $('#contextMenu').hide();
   $('.explorerselected').removeClass('explorerselected')
   $('#mobilepreview2').html($('#pullthecode2').html());

});

function gotothelinkfunction(wheretogo) {
    document.getElementById("myModal").style.display = "block";
    $('#yesBtn').off('click').on('click', function () {
        window.open('https://www.pcrichard.com' + wheretogo, '_blank');
        document.getElementById("myModal").style.display = "none";
    });

}

