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

let undoStack = [];
let redoStack = []; // Stack for redo functionality

// Function to capture the current state before making changes
function captureState() {
    const currentState = $('#pullthecode2').html(); // Adjust selector as needed
    undoStack.push(currentState);
    redoStack = []; // Clear redo stack since new action resets the future path
}

// Function to undo to the last state
function undoChange() {
    if (undoStack.length > 0) {
        const lastState = undoStack.pop();
        redoStack.push($('#pullthecode2').html()); // Push current state to redoStack before undoing
        $('#pullthecode2').html(lastState); // Adjust selector as needed
    }
}

// Function to redo to the next state
function redoChange() {
    if (redoStack.length > 0) {
        const nextState = redoStack.pop();
        undoStack.push($('#pullthecode2').html()); // Push current state to undoStack before redoing
        $('#pullthecode2').html(nextState); // Adjust selector as needed
    }
}

// Restore --------------------------------------------------




function paragraphfunctions() {
    $('p').off('click').on('contextmenu', function (e) {
        e.preventDefault()
        $('.interedit').removeClass('interedit')
        $(this).parent('.in910').addClass('interedit')
        document.getElementById("myModalcontent").style.display = "block";

        $('#yesBtn99').on('click', function () {
            $('.interedit').empty()
            document.getElementById("myModalcontent").style.display = "none";
            $('#findthecode2').text($('#pullthecode2').html());
            //explorerpostload()
        })

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
            $('.interedit p').addClass('clampclassd')
            ptagid = $('.interedit p').attr('id')
            $('.interedit').append('<span class="readmoreclampdbutton" onclick="toggleReadMore(' + ptagid + ')">Read More</span>')
            toggleReadMore(ptagid)
            $('.hidescripts').show()
        } else {
            $('.interedit p').removeClass('clampclassd')
            $('.interedit').find('span.readmoreclampdbutton').remove();
        }
    })



}






$("#sidetoolset").delay(600).animate({
    opacity: 1
}, 1000); // 1000 milliseconds = 1 second


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




$('.openthematrix').on('click', function () {
    $('#sidetoolset').hide()
    $('#explorer2').hide()
    var whatmatrix = '#' + $(this).attr('mymatrix');
    $('.closethematrix').hide();
    $(whatmatrix).toggle();
    $('.openthematrixopen').removeClass('openthematrixopen');
    $(this).addClass('openthematrixopen');
    $('.colorlegend').hide()
    switch (whatmatrix) {
        case '#mymatrix1':
            $('.stage2 , #pullthecode2 , #mobilepreview2').hide();
            $('.colorlegend').hide()
            $('#hidemainmobile').hide()
            $('#thisisthefinalcode').show()

            $('img.loading-lazy').each(function () {
                $(this).attr('src', '#')
            })


            $('#findthecode2').text($('#pullthecode2').html());



            var element = $('#findthecode2');
            var content = element.text();

            // Define the words you want to remove
            var wordsToRemove = ['liveelement', 'in910', 'layoutpale', 'layoutpale50', 'liverow', ' ui-droppable', 'droppable',
                'ui-droppable', 'layoutbuilder', 'sortable', 'layoutop2', 'layoutpale100',
                'layoutpale30', 'layoutpale20', 'layoutpale33', 'onblock', 'interedit', 'explorerselected',
                'https://staging-na01-pcrichard.demandware.net/on/demandware.static/-/Library-Sites-PCRichardSharedLibrary/default/dw0d66f82d/',
                'promoimg21', 'ui--disabled', 'style=""', 'ui--handle ', 'ui- ui--handle',
                'https://staging-na01-pcrichard.demandware.net', 'programoverflow', '/on/demandware.static/-/Library-Sites-PCRichardSharedLibrary/default/dw3744730c/'
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
            element.text(content.replaceAll('&times;', 'x').replaceAll('&alpha;', 'a').replaceAll('&reg;', '<span class="myregd"></span>').replaceAll('&trade;', '<span class="mytraded"></span>').replaceAll('&mdash;', '-').replaceAll('&ndash;', '-').replaceAll('™', '<span class="mytraded"></span>').replaceAll('®', '<span class="myregd"></span>'));




            finalcheck = $('#findthecode2').html()
            $('#findthecode2').html(finalcheck.replaceAll('α', 'a').replaceAll('×', 'x').replaceAll('–', '-').replaceAll('’', "'").replaceAll('class="width100c     ui-', 'class="width100c').replaceAll('&times;', 'x').replaceAll('&alpha;', 'a').replaceAll('&reg;', '<span class="myregd"></span>').replaceAll('&trade;', '<span class="mytraded"></span>').replaceAll('&mdash;', '--').replaceAll('&ndash;', '-').replaceAll('™', '<span class="mytraded"></span>').replaceAll('®', '<span class="myregd"></span>'))
            break;
        case '#mymatrix2':
            $('img.loading-lazy').each(function () {
                $(this).attr('src', $(this).attr('data-src'))
            })

            $('#sidetoolset').show()
            $('.stage2 , #pullthecode2 , #mobilepreview2').show();
            $('.colorlegend').hide()
            $('#hidemainmobile').show()
            $('#explorer2').show()
            break;
        case '#mymatrix3':

            $('.stage2 , #pullthecode2 , #mobilepreview2').hide();
            $('.colorlegend').hide()
            $('#hidemainmobile').hide()
            var html = $('#pullthecode2').html()
            var beautifiedHtml = beautifyHtml(html);
            $('#beautycode').val(beautifiedHtml)
            break;
        case '#mymatrix4':
            $('#codeloaderpcrview').html($('#pullthecode2').html())
            $('#programming, #resizable-div').hide();
            $('#fullembedcodeddd').show()
            $('#fullinterface').hide()
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

        case '#mymatrix5':
            $('.stage2 , #pullthecode2 , #mobilepreview2').hide();
            break;
        case '#mymatrix6':
            $('.stage2 , #pullthecode2 , #mobilepreview2').hide();
            $('#hidemainmobile').hide()
            $('.colorlegend').hide()
            listAllDriveFiles();
            break;
        case '#mymatrix7':

            $('#outslidepluginsout').attr('src', 'help.html')
            $('#pluginsandtools').click()
            break;
        case '#mymatrix9':
            $('.stage2 , #pullthecode2 , #mobilepreview2').hide();
            $('.colorlegend').hide()
            break;

    }

});


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

})



$('#pcrmobileview').on('click', function () {
    whatcheckingsizeview = 2
    $("#fullembedcodeddd2").animate({
        'width': '390px'
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
        $('#fullscreenresort').css('width', '80%').css('margin-left', '2%')
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
        $('.fullscreenresort').css('widht', '100%').css('margin-left', '0%')
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
        $(".sortable").sortable();
        $(".sortable").sortable('enable');
        $('.informationcontent').children().css('cursor', 'grab !important')

    } else {
        $(".sortable").sortable();
        $(".sortable").sortable('disable');
        $('#mobilepreview2').html($('#pullthecode2').html());
        runexplorer();
    }
})


document.getElementById('mysortcomponents').addEventListener('change', function () {
    if (this.checked) {
        $("div.layoutpale").not('h2 , p').sortable();
        $("div.layoutpale").not('h2 , p').sortable('enable');

    } else {
        $("div.layoutpale").not('h2 , p').sortable();
        $("div.layoutpale").not('h2 , p').sortable('disable');
        $('#mobilepreview2').html($('#pullthecode2').html());
        runexplorer();
    }
})





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

$('.deleterow').on('click', function () {
    captureState()
    $('.explorerselected').remove()
    runexplorer();
})

$('.clearsection').on('click', function () {
    captureState()
    $('.explorerselected').empty()
    runexplorer();
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
        $('#mobilepreview2').html($('#pullthecode2').html());
        runexplorer();
    } else {
        $('.explorerselected').removeClass('hideonlyonmobile')
        $('#mobilepreview2').html($('#pullthecode2').html());
        runexplorer();
    }

})


document.getElementById('desktophidev2d').addEventListener('input', function () {
    if (this.checked) {
        $('.explorerselected').addClass('hideonlyondesktop')
        $('#mobilepreview2').html($('#pullthecode2').html());
        runexplorer();
    } else {
        $('.explorerselected').removeClass('hideonlyondesktop')
        $('#mobilepreview2').html($('#pullthecode2').html());
        runexplorer();
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
    runexplorer();
    $('#mobilepreview2').html($('#pullthecode2').html());
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
    $('#mobilepreview2').html($('#pullthecode2').html());
    runexplorer()
});



$('.textaligner').off('click').on('click', function () {
   
    var $interedit = $('.interedit');
    var cssadd = $(this).attr('cssadd');
    console.log(cssadd)
    // Apply styles in a batched manner
    $interedit.css('text-align', cssadd);
    $interedit.find('p, .pd-header-tag').css('text-align', cssadd);
    $interedit.find('.pd-header-tag').css({
        'text-align': cssadd,
        'line-height': '116%'
    });

    // Adjust styles via function efficiently
    $interedit.find('.pd-header-tag h2, .pd-header-tag h3').attr('style', function (i, style) {
        return (style || '') + '; margin-bottom: 0px !important;';
    });

    // Reduce the number of times the DOM is queried and modified
    var editorcopy = $interedit.html();
    $('#myhtmleditor').val(editorcopy);
    runexplorer();
    $('#mobilepreview2').html($('#pullthecode2').html());
});



// text functions -----------------------------------------------------------------------


$('.ipsom').on('click', function () {
    ipsom =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit dom is great esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    $('#cinput3a').val(ipsom)
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
    runexplorer();
    paragraphfunctions()
    $('#mobilepreview2').html($('#pullthecode2').html());
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
    runexplorer();
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
    $('#mobilepreview2').html($('#pullthecode2').html());
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
    if ($('#whatsthelink').val().includes('pcrichard.com') || $('#whatsthelink').val().includes(
            'https://') || $('#whatsthelink').val().includes('www') || $('#whatsthelink').val()
        .includes('staging-na01-pcrichard')) {
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
    runexplorer();
    $('a').not('#convertBtn').not('.list-button').not('.googledrive').not('.outsidelink').on('click', function (e) {
        var target = $(e.target);
        if (!target.is('a')) {
            target = target.closest('a');
        }
        e.preventDefault();
        var wheretogo = target.attr('href');
        gotothelinkfunction(wheretogo);


    });

});



$('#linkmaker3').click(function () {

    if ($('#whatsthelink3').val().includes('pcrichard.com') || $('#whatsthelink3').val().includes(
            'https://') || $('#whatsthelink3').val().includes('www') || $('#whatsthelink3').val()
        .includes('staging-na01-pcrichard')) {
        $('#message2').slideDown().delay(2000).slideUp()
        return false;
    }
    var selection = window.getSelection();
    if (!selection.rangeCount) return; // Exit if no selection
    var selectedText = selection.toString();
    var whatsthelink = $('#whatsthelink3').val();

    if (outsidelink3 === 0) {
        var anchor = '<a href="' + whatsthelink + '">' + selectedText + '</a>';
    } else {
        var anchor = '<a href="' + whatsthelink + '" target="_blank">' + selectedText + '</a>';
    }

    var range = selection.getRangeAt(0);

    var newNode = document.createElement('div');
    newNode.innerHTML = anchor;
    range.deleteContents();
    range.insertNode(newNode.firstChild);

    runexplorer();
    $('a').not('.googledrive').not('.outsidelink').on('click', function (e) {
    
        var target = $(e.target);
        if (!target.is('a')) {
            target = target.closest('a');
        }
        e.preventDefault();
        var wheretogo = target.attr('href');
        gotothelinkfunction(wheretogo);


    });

});



$('#closediag').on('click', function () {
    document.getElementById("myModal").style.display = "none";
    currentAnchor = null;
});




function createVideoElement(videoFilename, videoCaptions, videoPoster) {
    const basePath =
        'https://staging-na01-pcrichard.demandware.net/on/demandware.static/-/Library-Sites-PCRichardSharedLibrary/default/dw0d66f82d/videos/';
    const videoSrc = `${basePath}${videoFilename}.mp4`;
    const captionsSrc = `${basePath}${videoCaptions}.vtt`;
    const posterSrc = `${basePath}${videoPoster}.jpg`;

    return `<video aria-label="Video Player" class="videoPlayer" controls poster="${posterSrc}" tabindex="0">
        <source src="${videoSrc}" type="video/mp4">
        <track kind="captions" label="English" src="${captionsSrc}" srclang="en">
        Your browser does not support the video tag.
    </video>`;
}


$(document).on('click', '#submitvideofile', function () {
    const videoFilename = $('#videofilename').val();
    const videoCaptions = $('#videocaptions').val();
    const videoPoster = $('#videoposter').val();
    const videoElement = createVideoElement(videoFilename, videoCaptions, videoPoster);
    $('.interedit').html(videoElement);
    runexplorer()
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
    $('#mobilepreview2').html($('#pullthecode2').html());
    runexplorer();





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
        runexplorer(); // Consolidate runexplorer calls to a single place if possible
    } else if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault();
        captureState();
        handleButtonAction('#breakbuttonlive');
        runexplorer();
    }
});


// Images ------------------------------------------------




$("#sidetoolset").delay(600).animate({
    opacity: 1
}, 1000); // 1000 milliseconds = 1 second





function gotothelinkfunction(wheretogo) {
    document.getElementById("myModal").style.display = "block";
    $('#yesBtn').off('click').on('click', function () {
        window.open('https://www.pcrichard.com' + wheretogo, '_blank');
        document.getElementById("myModal").style.display = "none";
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
    runexplorer();

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

    runexplorer();
    $('#mobilepreview2').html($('#pullthecode2').html());
});


$('#Row-Border-Radius').on('change', function () {
    var selectedOption = $(this).find('option:selected');
    var boxmargin = selectedOption.attr('value')
    $('.onblock').css('border-radius', boxmargin)
    $('#Row-Border-Radius').prop('selectedIndex', 0);
    runexplorer();
    $('#mobilepreview2').html($('#pullthecode2').html());
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
    runexplorer();
    $('#mobilepreview2').html($('#pullthecode2').html());
})

$('#body-color').on('change', function () {
    var selectedOption = $(this).find('option:selected');
    var bodycolor = selectedOption.attr('value');
    $('.informationcontent').attr('style', 'background-color: ' + bodycolor + ' !important;');
    runexplorer();
    $('#mobilepreview2').html($('#pullthecode2').html());
});

$('#comp-color').on('change', function () {
    var selectedOption = $(this).find('option:selected');
    var bodycolor = selectedOption.attr('value')
    $('.interedit').attr('style', 'background-color: ' + bodycolor + ' !important;');

    runexplorer();
    $('#mobilepreview2').html($('#pullthecode2').html());
});

$('#comp-font').on('change', function () {
    var selectedOption = $(this).find('option:selected');
    var bodyfont = selectedOption.attr('value')
    $('.interedit').css('font-family', bodyfont)

    runexplorer();
    $('#mobilepreview2').html($('#pullthecode2').html());
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
    $('#mobilepreview2').html($('#pullthecode2').html());
}

function updateSliderValue4(value) {
    document.getElementById('sliderValue4').textContent = value;
    $('.onblock').css('border-radius', value + 'px')
    $('#mobilepreview2').html($('#pullthecode2').html());
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


$('#toptoolstoggle').on('click', function () {
    $('#toptoolsblock').slideToggle()
})



