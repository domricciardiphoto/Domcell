$('#EditandSubmitAL').on('click', function () {
    $('.explorerselected').html($('#myhtmleditor').val())
    $('#mobilepreview2').html($('#pullthecode2').html());
      
})


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
                ;  // Refresh the explorer view if needed
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
    runexplorer();
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
            runexplorer()
            break;
            case 'duplicate':
            duplicateElement(clickedElement);
            break;
        case 'component':
            $('#addrow1x1a').click()
            break;
            case 'empty':
                $('.explorerselected').empty()
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


