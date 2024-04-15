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



let undoStack = [];
let redoStack = []; // Stack for redo functionality

// Function to capture the current state before making changes
function captureState() {
    const currentState = $('.interedit').html(); // Adjust selector as needed
    undoStack.push(currentState);
    redoStack = []; // Clear redo stack since new action resets the future path
}

// Function to undo to the last state
function undoChange() {
    if (undoStack.length > 0) {
        const lastState = undoStack.pop();
        redoStack.push($('.interedit').html()); // Push current state to redoStack before undoing
        $('.interedit').html(lastState); // Adjust selector as needed
    }
}

// Function to redo to the next state
function redoChange() {
    if (redoStack.length > 0) {
        const nextState = redoStack.pop();
        undoStack.push($('.interedit').html()); // Push current state to undoStack before redoing
        $('.interedit').html(nextState); // Adjust selector as needed
    }
}

// Function to delete highlighted text
function deleteHighlightedText() {
    captureState(); // Capture the current state before deletion for undo functionality
    document.execCommand('delete', false, ''); // Use execCommand for simplicity
    redoStack = []; // Clear redoStack as the future path is reset
}


   
function clickanddeleterows() {
    $('.liverow').on('click', function () {
        $('.onblock').removeClass('onblock')
        $(this).addClass('onblock')


        if ($(this).hasClass('hideonlyondesktop')) {
            $('#desktophidev2d').prop('checked', true);
        } else {
            $('#desktophidev2d').prop('checked', false);
        }

        if ($(this).hasClass('hideonlyonmobile')) {
            $('#mobilehidev2d').prop('checked', true);
        } else {
            $('#mobilehidev2d').prop('checked', false);
        }
    })
}
   
   
   
   
   
   
   function imagemodification() {
        $('img.promoimg21').on("contextmenu", function (e) {
            e.preventDefault(); // Prevent the default context menu
            currentImage = $(this); // Set the current image
            $('#customModal').show(); // Show the custom modal
        
        });

        $('#wrapImage').click(function () {
            $('#customModal').hide(); // Hide the custom modal
            $('#urlModal').show(); // Show the URL modal
        });

        $('#deleteImage').click(function () {
            currentImage.parent('a').remove();
            currentImage.remove(); // Remove the image
            $('#customModal').hide();
            // Hide the custom modal
            loadnewcontent()
        });

        $('#closeModal').click(function () {
            $('#customModal').hide(); // Hide the custom modal without any action
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
            loadnewcontent()

        });

        $('#cancelUrl').click(function () {
            $('#urlModal').hide(); // Hide the URL modal
            loadnewcontent()
        });

        
        $('a').not('.outsidelink').not('.googledrive').on('click', function (e) {
            e.preventDefault();
            wheretogo = $(this).attr('href');
            gotothelinkfunction(wheretogo)

            var $clickedLink = $(this);

            $('#noBtn').off('click').on('click', function () {
                $clickedLink.replaceWith($clickedLink.text());
                loadnewcontent()
                document.getElementById("myModal").style.display =
                    "none";
            })

        });


    }
  




    runexplorer();  // Initialize the explorer 
    imagemodification()







    function saveSelection() {
        if (window.getSelection) {
            var sel = window.getSelection();
            if (sel.rangeCount > 0) {
                savedSelection = sel.getRangeAt(0);
            }
        }
    }

    function restoreSelection() {
        var selection = window.getSelection();
        if (savedSelection) {
            try {
                selection.removeAllRanges();
            } catch (ex) {
                document.body.createTextRange().select();
                document.selection.empty();
            }

            selection.addRange(savedSelection);
        }
    }


    function mycolorswatch() {
        if (colorswatch == 0) {
            $('#colorswatch').css('background-color', '#333')
            headernewcolor = 'style="color:#333 !important"'
            colorswatch = 1
        } else {
            $('#colorswatch').css('background-color', '#034694')
            colorswatch = 0
            headernewcolor = ''
        }
    }

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


    function gotothelinkfunction(wheretogo) {
        document.getElementById("myModal").style.display = "block";
        $('#yesBtn').off('click').on('click', function () {
            window.open('https://www.pcrichard.com' + wheretogo, '_blank');
            document.getElementById("myModal").style.display = "none";
        });

    }

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



    function highlightedbackground() {

        var onblockElement = document.querySelector('.onblock');
        var selectElement = document.getElementById('RowBackgroundColorlist');

        if (onblockElement && selectElement) {
            var style = getComputedStyle(onblockElement);
            var onblockBackgroundColor = style.backgroundColor;

            // Normalize the color string to ensure consistent spacing
            var normalizedColor = onblockBackgroundColor.replace(/\s+/g, '');

            // Iterate through each option in the select element
            Array.from(selectElement.options).forEach(function (option) {
                var optionValue = option.value.replace(/\s+/g, '');
                if (optionValue === normalizedColor) {
                    // Set the matching option as selected
                    option.selected = true;
                }
            });
        }

        /*    
        var $element = $('.onblock'); // Assuming 'this' refers to the element you want to check
        if ($element.hasClass('selectedtand')) {
            $('#optionb1').prop('checked', false);
            $('#optionb2').prop('checked', true);
            $('#optionb3').prop('checked', false);
        } else if ($element.hasClass('selectedblued')) {
            $('#optionb1').prop('checked', false);
            $('#optionb2').prop('checked', false);
            $('#optionb3').prop('checked', true);
        } else {
            $('#optionb1').prop('checked', true);
            $('#optionb2').prop('checked', false);
            $('#optionb3').prop('checked', false);
        }
        $('input[type=radio][name=backgroundcolor]').change(function() {
            // Get the 'rowbackgroundcolor' attribute of the selected radio button
            var bgColor = $(this).attr('rowbackgroundcolor');
           $('.onblock').removeClass('selectedcleard').removeClass('selectedtand').removeClass('selectedblued')
            $('.onblock').addClass(bgColor)
        });

*/

    }


    var beautifiedHtml

    var wid100code1 =
        '<div class="width100c layoutpale layoutpale100 liverow droppable  ui-droppable"><div class="width100c  in910 layoutpale layoutpale100 interedit"></div></div>'
    var wid100code2 =
        '<div class="width100c layoutpale layoutpale100 liverow droppable  ui-droppable"><div class="width100c  in910 layoutpale layoutpale100 interedit"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable  ui-droppable"><div class="width100c  in910 layoutpale layoutpale100"></div></div>'
    var wid100code3 =
        '<div class="width100c layoutpale layoutpale100 liverow droppable  ui-droppable"><div class="width100c  in910 layoutpale layoutpale100 interedit"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable  ui-droppable"><div class="width100c  in910 layoutpale layoutpale100"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable  ui-droppable"><div class="width100c  in910 layoutpale layoutpale100"></div></div>'
    var wid100code4 =
        '<div class="width100c layoutpale layoutpale100 liverow droppable  ui-droppable"><div class="width100c  in910 layoutpale layoutpale100 interedit"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable  ui-droppable"><div class="width100c  in910 layoutpale layoutpale100"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width100c  in910 layoutpale layoutpale100"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable  ui-droppable"><div class="width100c  in910 layoutpale layoutpale100"></div></div>'

    var wid100code5 =
        '<div class="width100c layoutpale layoutpale100 liverow droppable  ui-droppable"><div class="width100c  in910 layoutpale layoutpale100 interedit"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable  ui-droppable"><div class="width100c  in910 layoutpale layoutpale100"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width100c  in910 layoutpale layoutpale100"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable  ui-droppable"><div class="width100c  in910 layoutpale layoutpale100"></div></div></div><div class="width100c layoutpale layoutpale100 liverow droppable  ui-droppable"><div class="width100c  in910 layoutpale layoutpale100"></div></div>'

    var wid100code6 =
        '<div class="width100c layoutpale layoutpale100 liverow droppable  ui-droppable"><div class="width100c  in910 layoutpale layoutpale100 interedit"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable  ui-droppable"><div class="width100c  in910 layoutpale layoutpale100"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width100c  in910 layoutpale layoutpale100"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable  ui-droppable"><div class="width100c  in910 layoutpale layoutpale100"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable  ui-droppable"><div class="width100c  in910 layoutpale layoutpale100"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable  ui-droppable"><div class="width100c  in910 layoutpale layoutpale100"></div></div>'


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


  


    const resizableDiv = document.getElementById('resizable-div');
    const resizeHandle = document.getElementById('resize-handle');


    function destructiveoptions() {
        $('.clearsection').on('click', function () {
            $('.interedit').html('')
        })

        $('#selectionclear').on('click', function () {
            $('.interedit').removeClass('interedit')
        })

        $('.interedit').on('click', function () {
            $('#myhtmleditor').val($(this).html())
        })
    }


    function loadnewcontent2() {
       

        $('.liveelement').on('click', function () {
            $('.liveelement').removeClass('interedit')
            $(this).addClass('interedit')
        })

      

        $('.liveelement').on('click', function () {
            $('.liveelement').removeClass('interedit')
            $(this).addClass('interedit')

            $('.clearsection').on('click', function () {
                $('.interedit').html('')
            })

            $('#selectionclear').on('click', function () {
                $('.interedit').removeClass('interedit')
            })

            $('.interedit').on('click', function () {
                editorcopy = $(this).html()

                $('#myhtmleditor').val(editorcopy)
                $('#EditandSubmitAL').show()


            })


            $('a').not('.outsidelink').not('.googledrive').on('click', function (e) {
                e.preventDefault();
                wheretogo = $(this).attr('href');
                gotothelinkfunction(wheretogo)
    
                var $clickedLink = $(this);
    
                $('#noBtn').off('click').on('click', function () {
                    $clickedLink.replaceWith($clickedLink.text());
                    loadnewcontent()
                    document.getElementById("myModal").style.display =
                        "none";
                })
    
            });

            $('#myhtmleditor').val($(this).html())




        })

        $('p , h2 , h3 , h4 , h5, strong').on('click' , function() {
            $('.interedit').not(this).removeClass('interedit')
            $(this).parent('.liveelement').addClass('interedit')
            $('#myhtmleditor').val($(this).parent('interedit').html())
        })

        $('#mobilepreview2').html($('#pullthecode2').html());
        captureState()
        runexplorer();  
        imagemodification()
        clickanddeleterows()


        
    }


    function loadnewcontent() {

        function enableEditing(paragraph) {
            // Store original paragraph's attributes
            const originalAttributes = {
                id: paragraph.id,
                class: paragraph.className
            };

            // Create a contenteditable div and set its HTML to the paragraph's inner HTML
            const editableDiv = document.createElement('div');
            editableDiv.setAttribute('contenteditable', 'true');
            editableDiv.innerHTML = paragraph.innerHTML; // Use innerHTML to capture and set the current content

            // Apply the original paragraph's ID and class to the editable div
            editableDiv.id = originalAttributes.id;
            editableDiv.className = originalAttributes.class;

            // Swap out the paragraph with the editable div
            paragraph.replaceWith(editableDiv);
            editableDiv.focus();

            // Function to save changes
            const saveChanges = () => {
                // Create a new paragraph to replace the editable div
                const newParagraph = document.createElement('p');
                newParagraph.innerHTML = editableDiv.innerHTML; // Transfer the edited content

                // Reapply the original attributes
                newParagraph.id = originalAttributes.id;
                newParagraph.className = originalAttributes.class;

                editableDiv.replaceWith(newParagraph); // Replace the editable div with the new paragraph
                attachDoubleClickHandler(newParagraph); // Re-attach the double-click handler to the new paragraph
                updateDynamicContent();

                $('p').off().on('contextmenu', function (e) {
                    e.preventDefault()
                    $('.interedit').removeClass('interedit')
                    $(this).parent('.in910').addClass('interedit')
                    document.getElementById("myModalcontent").style.display = "block";

                    $('#yesBtn99').on('click', function () {
                        $('.interedit').empty()
                        document.getElementById("myModalcontent").style.display = "none";
                        $('#findthecode2').text($('#pullthecode2').html());
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

            };

            // Save changes on Enter key press (consider disabling if multi-line editing is needed)
            editableDiv.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault(); // Prevent default Enter behavior in contenteditable
                    saveChanges();

                    loadnewcontent()
                }
            });

            // Save changes on blur (losing focus)
            editableDiv.addEventListener('blur', saveChanges);
        }

        function attachDoubleClickHandler(paragraph) {
            let clickCount = 0; // Initialize click counter
            let clickTimer = null; // Initialize timer
        
            paragraph.addEventListener('click', function() {
                clickCount++; // Increment click count on each click
        
                if (clickCount === 1) {
                    // Start a timer if this is the first click
                    clickTimer = setTimeout(function() {
                        clickCount = 0; // Reset click count after the timeout
                    }, 500); // Set timeout (400ms). Adjust as needed.
                } else if (clickCount === 3) {
                    // If it's the third click, call the function to enable editing
                    enableEditing(paragraph);
        
                    clearTimeout(clickTimer); // Clear the timer
                    clickCount = 0; // Reset click count
                }
            });
        }

        // Initial attachment of the double-click handler to all paragraphs
        document.querySelectorAll('.interedit p').forEach(attachDoubleClickHandler);

        function updateDynamicContent() {
            $('#findthecode2').text($('#pullthecode2').html());
            $('#myhtmleditor').val($('.interedit').html());
            $('#mobilepreview2').delay(1000).html($('#pullthecode2').html());
        }





        $('p').off().on('contextmenu', function (e) {
            e.preventDefault()
            $('.interedit').removeClass('interedit')
            $(this).parent('.in910').addClass('interedit')
            document.getElementById("myModalcontent").style.display = "block";

            $('#yesBtn99').on('click', function () {
                $('.interedit').empty()
                document.getElementById("myModalcontent").style.display = "none";
                $('#findthecode2').text($('#pullthecode2').html());
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



        function setupContextMenu(selector89) {
            $(selector89).off().on('contextmenu', function (e) {
                e.preventDefault();
                $('.interedit').removeClass('interedit');
                $(this).parent('div').parent('.in910').addClass('interedit');
                document.getElementById("myModalcontent").style.display = "block";

                $('#yesBtn99').off('click').on('click', function () {
                    $('.interedit').empty();
                    document.getElementById("myModalcontent").style.display = "none";
                    $('#findthecode2').text($('#pullthecode2').html());
                });

                $('#yescopyBtn99').off('click').on('click', function () {
                    var textToCopy89 = $('.interedit').children('div').children(selector89).text();
                    navigator.clipboard.writeText(textToCopy89).then(function () {
                        console.log('Text copied to clipboard');
                    }).catch(function (error) {
                        console.error('Error copying text: ', error);
                    });
                    document.getElementById("myModalcontent").style.display = "none";
                });

                $('#closediag99').off('click').on('click', function () {
                    document.getElementById("myModalcontent").style.display = "none";
                });
            });
        }

        setupContextMenu('h2');
        setupContextMenu('h3');


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


        $('.interedit').on('click', function () {
            $('#myhtmleditor').val($(this).html())
        })

        $(".draggable").draggable({
            revert: "valid"
        });

        $(".droppable").droppable({
            drop: function (event, ui) {
                var mysize = $(ui.draggable).attr('size');
                var mypale = $(ui.draggable).attr('pale');
                $('.interedit').removeClass('interedit')
                if (mysize !== undefined && mysize !== "") {
                    $(this).append('<div class="' + mysize +
                        ' in910 layoutpale interedit layoutpale' + mypale +
                        '"></div>');

                }

                $('.liveelement').on('click', function () {
                    $('.liveelement').removeClass('interedit')
                    $(this).addClass('interedit')
                    //$('#fixthecode').val($(this).html())
                    $('.clearsection').on('click', function () {
                        $('.interedit').html('')
                        loadnewcontent()
                    })

                    $('#selectionclear').on('click', function () {
                        $('.interedit').removeClass('interedit')
                    })

                    $('.interedit').on('click', function () {
                        editorcopy = $(this).html()

                        $('#myhtmleditor').val(editorcopy)
                        $('#EditandSubmitAL').show()

                    })

                  


                    $('#myhtmleditor').val($(this).html())




                    layoutmode = 1

                })
                loadnewcontent()

            }


        });

        $('.promoimg21 , #pullthecode2 .promoimg21').removeAttr('src')
        $(' #cinputval1').removeAttr('src')
        $('#findthecode2').text($('#pullthecode2').html());
        $('#myhtmleditor').val($('.interedit').html())


        var html = $('#pullthecode2').html()
        var beautifiedHtml = beautifyHtml(html);
        $('#beautycode').val(beautifiedHtml)


    




       





        $('#closetutorial , #closetutorial2  ,#closetutorial3 ').on('click', function () {
            $('#firstmatrix').click()
        })

        $(".droppable").droppable({
            drop: function (event, ui) {
                var mysize = $(ui.draggable).attr('size');
                var mypale = $(ui.draggable).attr('pale');
                $('.interedit').removeClass('interedit')
                if (mysize !== undefined && mysize !== "") {
                    $(this).append('<div class="' + mysize +
                        ' in910 layoutpale interedit layoutpale' + mypale +
                        '"></div>');

                }


                $('.liveelement').on('click', function () {


                    $('.liveelement').removeClass('interedit')
                    $(this).addClass('interedit')
                    //$('#fixthecode').val($(this).html())
                    $('.clearsection').on('click', function () {
                        $('.interedit').html('')
                        loadnewcontent()
                    })

                    $('#selectionclear').on('click', function () {
                        $('.interedit').removeClass('interedit')
                    })



                    $('#EditandSubmitAL').on('click', function () {

                        $('.interedit').html($('#myhtmleditor').val())
                        loadnewcontent()
                    })



                    layoutmode = 1

                })
                loadnewcontent()
            }
        });


        var element = $('#findthecode2');
        var content = element.text();

        // Define the words you want to remove
        var wordsToRemove = ['liveelement', 'in910', 'layoutpale', 'layoutpale50', 'liverow', 'droppable',
            'ui-droppable', 'layoutbuilder', 'sortable', 'layoutop2', 'ui-', 'layoutpale100', ' ui-',
            'layoutpale30', 'layoutpale20', , 'layoutpale33', 'onblock', 'interedit',
            'https://staging-na01-pcrichard.demandware.net/on/demandware.static/-/Library-Sites-PCRichardSharedLibrary/default/dw0d66f82d/',
            'promoimg21', 'ui--disabled', 'style=""', 'ui--handle ', 'ui- ui--handle',
            'https://staging-na01-pcrichard.demandware.net'
        ];

        // Loop through the words and remove them from the content
        wordsToRemove.forEach(function (word) {
            content = content.replace(new RegExp('\\b' + word + '\\b', 'g'), '')

        });

        // Set the modified content back to the element
        element.text(content.replaceAll('&times;', 'x').replaceAll('&alpha;', 'a').replaceAll('&reg;', '<span class="myregd"></span>').replaceAll('&trade;', '<span class="mytraded"></span>').replaceAll('&mdash;', '-').replaceAll('&ndash;', '-').replaceAll('™', '<span class="mytraded"></span>').replaceAll('®', '<span class="myregd"></span>'));




        $('#pullthecode2 .promoimg21').each(function () {
            newsrc = $(this).attr('data-src')
            $(this).attr('src', newsrc)
        })


        $('#mobilepreview2').delay(2000).html($('#pullthecode2').html())


        $('#findthecode2').text(function (index, oldText) {
            return oldText.replace(/https:\/\/www\.pcrichard\.com/g, '');
        });

     

        $('#codeloaderpcrview').html($('#pullthecode2').html())
        runexplorer()
        clickanddeleterows()

    }



    $('#submitnewcode').on('click', function () {
        newsubmit = $('#fixthecode').val()
        $('.editable').html(newsubmit).removeClass('editable').css('background-color', 'transparent')
        loadnewcontent()
        clickanddeleterows()
    })


    $('.deletecode').on('click', function () {
        $('.editable').remove()
        $('.interedit').remove()
        $('#fixthecode').val('')
        loadnewcontent()
    })


    $('.deleterow').on('click', function () {
        $('.onblock').remove()
        loadnewcontent()
    })

    $('.deleterowfull').on('click', function () {
        $('.informationcontent').html('')
        loadnewcontent()
    })


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

    // Use event delegation to handle dynamically added elements and to avoid repeated jQuery selectors
    $(document).on('click', '#submitvideofile', function () {
        const videoFilename = $('#videofilename').val();
        const videoCaptions = $('#videocaptions').val();
        const videoPoster = $('#videoposter').val();
        const videoElement = createVideoElement(videoFilename, videoCaptions, videoPoster);
        $('.interedit').html(videoElement);

        loadnewcontent()
    });





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
        $(this).css('background-color', '#333')
    })

    $('#mylistamount').on('change', function () {
        $('.lister').hide()
        originallist = 1
        amountoflist = $(this).val()
        while (originallist <= amountoflist) {
            $('#list' + originallist).slideDown()
            originallist++
        }
    })


    $('#newlist').on('click', function () {
        createnewlist = 1
        $('.lister').val('')
        $('#newlist').fadeOut()
        $('#listsubmit').text('Submit List').css('background-color', '#334').css('color', '#fff')
    })

    $('#listsubmit').on('click', function () {

        $(this).text('Update List').css('background-color', 'red').css('color', '#fff')
        $('#newlist').fadeIn()
        var listwidthselected = $('#mylistwidth').val()
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




        if (createnewlist === 1) {
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
            createnewlist = 0
        } else {
            editlistneg = '#listcontent' + (listaddition - 1)
            $(editlistneg).html('' + list1 + list2 + list3 + list4 + list5 + list6 + list7 + list8 + list9 +
                list10 + '')
        }


        loadnewcontent()

    })






   



  



    document.getElementById('mobilehidev2d').addEventListener('input', function () {
        if (this.checked) {
            $('.onblock').addClass('hideonlyonmobile')
            loadnewcontent()
        } else {
            $('.onblock').removeClass('hideonlyonmobile')
            loadnewcontent()
        }

    })


    document.getElementById('desktophidev2d').addEventListener('input', function () {
        if (this.checked) {
            $('.onblock').addClass('hideonlyondesktop')
            loadnewcontent()
        } else {
            $('.onblock').removeClass('hideonlyondesktop')
            loadnewcontent()
        }

    })




    document.getElementById('htmlcodeyesno').addEventListener('input', function () {
        if (this.checked) {
            htmlcodeyesno = 1
        } else {
            htmlcodeyesno = 0
        }

    })

    document.getElementById('htmlcodeyesno2').addEventListener('input', function () {
        if (this.checked) {
            htmlcodeyesno2 = 1
        } else {
            htmlcodeyesno2 = 0
        }

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


    })


    document.getElementById('cinput1promotional').addEventListener('input', function () {
        catalogselector = $('#catalogselector').val()
        promotionalsource =
            'https://www.pcrichard.com/on/demandware.static/-/Sites-pcrichard-master-articles-catalog/default/images/' +
            catalogselector;
        $('#showthepromotionalimage').attr('src', promotionalsource + $('#cinput1promotional').val())
    })


    document.getElementById('catalogselector').addEventListener('change', function () {
        catalogselector = $('#catalogselector').val()
        promotionalsource =
            'https://www.pcrichard.com/on/demandware.static/-/Sites-pcrichard-master-articles-catalog/default/images/' +
            catalogselector;
        $('#showthepromotionalimage').attr('src', promotionalsource + $('#cinput1promotional').val())
    })


    document.getElementById('mysort').addEventListener('change', function () {
        if (this.checked) {
            $(".sortable").sortable();
            $(".sortable").sortable('enable');
            $('.informationcontent').children().css('cursor', 'grab !important')
        } else {
            $(".sortable").sortable();
            $(".sortable").sortable('disable');
            loadnewcontent()
        }
    })


    document.getElementById('mysortcomponents').addEventListener('change', function () {
        if (this.checked) {
            $("div.layoutpale").not('h2 , p').sortable();
            $("div.layoutpale").not('h2 , p').sortable('enable');

        } else {
            $("div.layoutpale").not('h2 , p').sortable();
            $("div.layoutpale").not('h2 , p').sortable('disable');
            loadnewcontent()
        }
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


    $('#linkmaker2').on('click', function () {

        if ($('#whatsthelink2').val().includes('pcrichard.com') || $('#whatsthelink2').val().includes(
                'https://') || $('#whatsthelink2').val().includes('www') || $('#whatsthelink2').val()
            .includes('staging-na01-pcrichard')) {
            $('#message2').slideDown().delay(2000).slideUp()
            return false;
        }
        var selection = window.getSelection();
        if (!selection.rangeCount) return; // Exit if no selection
        var selectedText2 = selection.toString();
        var whatsthelink2 = $('#whatsthelink2').val();
    
    
    
        if (outsidelink2 === 0) {
            var anchor2 = '<a href="' + whatsthelink2 + '">' + selectedText2 + '</a>';
        } else {
            var anchor2 = '<a href="' + whatsthelink2 + '" target="_blank">' + selectedText2 + '</a>';
        }
    
        var range = selection.getRangeAt(0);
        if (layoutmode === 1) {
            var newNode = document.createElement('div');
            newNode.innerHTML = anchor2;
            range.deleteContents();
            range.insertNode(newNode.firstChild);
    
    
        } else {
            var newNode = document.createElement('div');
            newNode.innerHTML = anchor2;
            range.deleteContents();
            range.insertNode(newNode.firstChild);
    
        }
    
        loadnewcontent()
    
    
        function openModal(wheretogo) {
            document.getElementById("myModal").style.display = "block";
            $('#yesBtn').on('click', function () {
                window.open(wheretogo, '_blank');
                document.getElementById("myModal").style.display = "none";
            });
    
    
        }
    
    
    
        $('#noBtn').on('click', function () {
            if (currentAnchor) {
                $(currentAnchor).contents().unwrap(); // Remove the link but keep the text
                loadnewcontent()
                currentAnchor = null;
                document.getElementById("myModal").style.display = "none";
            }
        });
    
    })
    
    
    
  











    $('.ipsom').on('click', function () {
        ipsom =
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit dom is great esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        $('#cinput3a').val(ipsom)
    })



    document.getElementById('editmode').addEventListener('change', function () {
        if (this.checked) {

            $('#editcontentbox').slideDown()
            $('.in910').removeClass('editable');
            $('.stage1').slideUp()
            $('#clearandrestart').hide()
            $('.in910').on('click', function () {
                $('.in910').removeClass('editable')
                $(this).addClass('editable')
                editthisbox = $(this).attr('id')

                $('#fixthecode').val($('#' + editthisbox).html())

            })
        } else {

            $('.stage1').slideDown()
            $('.in910').removeClass('editable');
            $('#editcontentbox').slideUp()
            $('#clearandrestart').slideDown()


        }
    });

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

        loadnewcontent();
    });


    $('#Row-Border-Radius').on('change', function () {
        var selectedOption = $(this).find('option:selected');
        var boxmargin = selectedOption.attr('value')
        $('.onblock').css('border-radius', boxmargin)
        $('#Row-Border-Radius').prop('selectedIndex', 0);
        loadnewcontent();
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
        var boxmaxwidth = ((maxtakin -1) - parseFloat(selectedOption.attr('value')*2)) + '%'

        $('.onblock').css('padding', boxpadding+'%').css('margin-left' , '0px').css('max-width' , boxmaxwidth )
        $('#Row-Padding-Radius').prop('selectedIndex', 0);
        loadnewcontent();
    })

    $('#body-color').on('change', function () {
        var selectedOption = $(this).find('option:selected');
        var bodycolor = selectedOption.attr('value');
        $('.informationcontent').attr('style', 'background-color: ' + bodycolor + ' !important;');
        loadnewcontent();
    });

    $('#comp-color').on('change', function () {
        var selectedOption = $(this).find('option:selected');
        var bodycolor = selectedOption.attr('value')
        $('.interedit').attr('style', 'background-color: ' + bodycolor + ' !important;');
     
        loadnewcontent();
    });

    $('#comp-font').on('change', function () {
        var selectedOption = $(this).find('option:selected');
        var bodyfont = selectedOption.attr('value')
        $('.interedit').css('font-family' , bodyfont)
     
        loadnewcontent();
    });


    $('.outsideplugins').on('click' , function() {
       wto = $(this).attr('whaturl');
       $('#outslidepluginsout').attr('src' , wto)
       $('.outsideplugins').css('background-color' , '#000')
       $(this).css('background-color' , '#333')
       loadnewcontent();
    })


    function updateSliderValuerow(value) {
        document.getElementById('sliderValuerow').textContent = value;
    }

    function updateSliderValue33(value) {
        document.getElementById('sliderValue33').textContent = value;
        maxleftvalue = (100 - value)/2+"%"
        $('.interedit').css('max-width', value + '%').css('margin-left' , maxleftvalue)
        loadnewcontent();
    }


     function updateSliderValue66(value) {
    document.getElementById('sliderValue66').innerText = value;
    $('.interedit p').css('font-size', value + 'em')
    loadnewcontent();
}

function updateSliderValue99(value) {
    document.getElementById('sliderValue99').innerText = value;
    $('.interedit p').css('padding', value + 'px')
}


function updateSliderValue00(value) {
    document.getElementById('sliderValue00').innerText = value;
    $('.interedit p').css('line-height', value + 'px')
}

function updateSliderValue11(value) {
    document.getElementById('sliderValue11').innerText = value;
    $('.interedit').css('border-radius', value + 'px')
}

function updateSliderValue22(value) {
    document.getElementById('sliderValue22').innerText = value;
    $('.interedit p').css('margin-top', value + 'px')
}

    
    $('.createlayoutslider').on('click', function() {
        var addmutiplerows = parseInt(document.getElementById('sliderValuerow').textContent);
        $('.hidecss').show();
        $('.interedit').removeClass('interedit');
    
        var mycount = 0; // Initialize `mycount` before the loop
        while (mycount < addmutiplerows) { // Corrected variable name here
            $('.informationcontent').append(
                '<div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width100c liveelement in910 layoutpale layoutpale100"></div></div>'
            );
            mycount++; // Increment `mycount` to eventually meet the loop's exit condition
        }

        $('.liveelement').on('click', function () {
            $('.interedit').removeClass('interedit')
            $(this).addClass('interedit')
            $('#myhtmleditor').val($(this).html())
        })

        destructiveoptions()
        clickanddeleterows()
        loadnewcontent()


    });

    function updateSliderValue(value) {
        document.getElementById('sliderValue').textContent = value;
        $('.interedit p').css('line-height', value + 'px')
        $('.interedit h2').css('line-height', value + 'px')
        $('.interedit h3').css('line-height', value + 'px')
        $('.interedit h4').css('line-height', value + 'px')
        loadnewcontent();
    }

    function updateSliderValue2(value) {
        document.getElementById('sliderValue2').textContent = value;
        $('.onblock').css('margin-top', value + 'px')
        loadnewcontent();
    }

    function updateSliderValue3(value) {
        document.getElementById('sliderValue3').textContent = value;
        $('.onblock').css('padding', value + 'px').css('max-width' , '-webkit-fill-available')
        loadnewcontent();
    }

    function updateSliderValue4(value) {
        document.getElementById('sliderValue4').textContent = value;
        $('.onblock').css('border-radius', value + 'px')
        loadnewcontent();
    }

    let isProgrammaticChangeRowMarginTop = false; // Flag to control the execution

    /*
    $('#Row-Margin-Top').on('change', function () {
        if (!isProgrammaticChangeRowMarginTop) {
            var selectedOption = $(this).find('option:selected');
            var boxmargin = selectedOption.attr('value');
            $('.onblock').css('margin-top', boxmargin + 'px').addClass('nomar');

            // Set the flag to true before the programmatic change
            isProgrammaticChangeRowMarginTop = true;
            $(this).val('none').change();

            // Reset the flag after the change
            isProgrammaticChangeRowMarginTop = false;
        }
        loadnewcontent();
    });
*/

    $(document).ready(function () {
        var mysize
        let timeout;

        $('#colorswatch').on('click', function () {
            mycolorswatch()
        })

        $('#colorswatch2').on('click', function () {
            mycolorswatch2()
        })


        $('#hidemainmobile').on('click', function () {
            var $mobilePreview = $('#mobilepreview2');
            var $pullTheCode = $('#pullthecode2');
            var isVisible = $mobilePreview.is(':visible');
            myhide = $(this).attr('myhide')

            if (myhide === '0') {
                // If mobile preview is currently visible, hide it, change width of pullthecode2, and update the button text
                $mobilePreview.hide();
                $pullTheCode.delay(200).animate({
                    'width': '91%',
                    'max-width': '1600px'
                });
                $(this).text('Show Mobile');
                $('#hidemainmobile').attr('myhide', '1')
            } else {
                // If mobile preview is currently hidden, show it, reset width of pullthecode2, and update the button text
                $pullTheCode.delay(200).animate({
                    'width': '66%',
                    'max-width': 'auto'
                }, function () {
                    $mobilePreview.show();
                    $('#hidemainmobile').attr('myhide', '0')
                });


                $(this).text('Hide Mobile');
            }
        });

        $(function() {
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
                resize: function(event, ui) {
                    var parentWidth = ui.element.parent().width();
                    var programmingWidth = ui.size.width;
                    // Adjust the calculation for remaining width, considering potential padding/border
                    var remainingWidth = parentWidth - programmingWidth - 2; // Adjust the subtraction value as needed
        
                    // Ensure the resizable-div does not wrap under programming
                    $("#resizable-div").width(Math.max(remainingWidth - 40, 0)); // Ensure non-negative width
                }
            });
        
            // Optional: Update on window resize
            $(window).resize(function() {
                var maxWidthInPixels = $(window).width() * (maxWidthPercentage / 100);
                $("#programming").resizable("option", "maxWidth", maxWidthInPixels);
            });
        
            // CSS adjustments for consistent sizing
            $("#programming, #resizable-div").css('box-sizing', 'border-box');
        });

        $('#whatsnewwb').on('click' , function() {
            $('#pluginsandtools').click()
            $('#outslidepluginsout').attr('src' , 'release-notes.html')
        })

        $('.thetopbox').on('click', function () {
            whichboxtoopen = $(this).attr('whatbox')
           $('.thetopbox').css('background-color', 'transparent').css('color', '#f7f7f7')
           $(this).css('background-color', '#191818').css('color', '#fff')

            if (whichboxtoopen === 'Tools') {

               
                $('#myhtmleditor').show()
                $('.internalscroller').show()
                $('.toolboxhide').show()
                $('.toolboxlayoutoptions').hide()
                
                $('.openclose').show()
                $('#Importer').hide()
                $('.htmlimporter').hide()
                $('.myrowbuilder21').hide()
                $('.myrowbuilder').hide()
                $('#layoutbuilder-oc2').hide()
                $('#layoutbuilder-oc').hide()
                $('.layoutbuilder-oc').hide()
                $('.blogbuilder').hide()
                $('#explorerpanel').hide()
            } if (whichboxtoopen == 'Rows') {
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
            $('.openclose').hide()
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
        }
         if (whichboxtoopen == 'Layout') {
                $('#layoutbuilder-oc2').css('display', 'block')
                $('#myhtmleditor').hide()
                $('.internalscroller').hide()
                $('.toolboxhide').hide()
                $('.toolboxlayoutoptions').show()
                $('.layoutbuilder-oc').show()
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
            $('#myhtmleditor').hide()
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



        $('.openclose').on('click', function () {

            var openclose = $(this).attr('openclose');
            $('.myindicator').text('+')

            if ($('.' + openclose).is(':visible')) {

                $('.' + openclose).slideUp();
                $(this).children('div').children('span.myindicator').text('+')
            } else {

                $('.' + openclose).slideDown();
                $(this).children('div').children('span.myindicator').text('-')
            }
            $('.tools').not('.' + openclose).hide()


            $('.openclose').css('background-color', 'transparent');
            $(this).css('background-color', '#666');

        });




        $('.hamburger').on('click', function () {
            $('#programming').slideToggle()
        })


        $('.layoutloader').on('click', function () {
            $('.hidecss').show()
            $('.interedit').removeClass('interedit')
            my100layout = eval($(this).attr('layout'));
           // my100layout = JSON.parse($(this).attr('layout'));
            $('.informationcontent').append(my100layout);
            $('.internalbuttons').slideDown()
            $('.in910').on('click', function () {
                $('.in910').removeClass('interedit')
                $(this).addClass('interedit')

            })


            $('.clearsection').on('click', function () {
                $('.interedit').html('')
            })

            $('#selectionclear').on('click', function () {
                $('.interedit').removeClass('interedit')
            })


            clickanddeleterows()
            loadnewcontent()
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


        document.addEventListener('keydown', function (event) {
            // Check if 'Control' is pressed along with 'B'
            if (event.ctrlKey && event.key === 'b') {
                
                event.preventDefault();
                captureState();

                var selection = window.getSelection();
                if (!selection.rangeCount) return;
                var selectedText = selection.toString();
                var textwrapper = $(this).val();

                // Create a new HTML element with the selected text wrapped in the specified tag
                var contentwrapped = '<strong>' + selectedText + '</strong>';

                // Get the selected range
                var range = selection.getRangeAt(0);

                // Create a new document fragment with the wrapped content
                var fragment = range.createContextualFragment(contentwrapped);

                // Replace the selected text with the new HTML
                range.deleteContents();
                range.insertNode(fragment);

                // Update any elements you want with the modified HTML
                loadnewcontent()
              
            }
        });

        document.addEventListener('keydown', function (event) {
            // Check if 'Shift' is pressed along with 'Enter'
            if (event.shiftKey && event.key === 'Enter') {
                event.preventDefault();
                // Your custom code goes here
                var selection = window.getSelection();

                if (selection.rangeCount > 0) {
                    var range = selection.getRangeAt(0);
                    var brElement = document.createElement('br');
                    range.insertNode(brElement);
                    $('.interedit').contents().filter(function () {
                        return this.nodeType === 3 && $.trim(this.nodeValue) !== '';
                    }).wrap('<p></p>');
                }

                $('#myhtmleditor').val($('.interedit').html());
                loadnewcontent();

            }
        });


        $('.openthematrix').on('click', function () {

            $('#sidetoolset').hide()

            var whatmatrix = '#' + $(this).attr('mymatrix');
            $('.closethematrix').hide();
            $(whatmatrix).toggle();
            $('.openthematrixopen').removeClass('openthematrixopen');
            $(this).addClass('openthematrixopen');

            switch (whatmatrix) {
                case '#mymatrix1':
                    loadnewcontent()
                    $('.stage2 , #pullthecode2 , #mobilepreview2').hide();
                    $('.colorlegend').hide()
                    $('#hidemainmobile').hide()
                    finalcheck = $('#findthecode2').html()
                    $('#findthecode2').html(finalcheck.replaceAll('α', 'a').replaceAll('×', 'x').replaceAll('–', '-').replaceAll('’', "'").replaceAll('class="width100c     ui-', 'class="width100c').replaceAll('&times;', 'x').replaceAll('&alpha;', 'a').replaceAll('&reg;', '<span class="myregd"></span>').replaceAll('&trade;', '<span class="mytraded"></span>').replaceAll('&mdash;', '--').replaceAll('&ndash;', '-').replaceAll('™', '<span class="mytraded"></span>').replaceAll('®', '<span class="myregd"></span>'))
                    break;
                case '#mymatrix2':
                    loadnewcontent();
                    $('#sidetoolset').show()
                    $('.stage2 , #pullthecode2 , #mobilepreview2').show();
                    $('.colorlegend').hide()
                    $('#hidemainmobile').show()
                    break;
                case '#mymatrix3':
                    loadnewcontent();
                    $('.stage2 , #pullthecode2 , #mobilepreview2').hide();
                    $('.colorlegend').hide()
                    $('#hidemainmobile').hide()
                    break;
                case '#mymatrix4':
                    loadnewcontent();
                
                    $('#programming, #resizable-div').hide();
                    $('#fullembedcodeddd').show()
                    $('#fullinterface').hide()
                    $('body').css('background-color', '#333')

                    $('#codeloaderpcrview .readmoreclampdbutton').on('click', function () {
                        $(this).prev('p.clampclassd').toggleClass('expanded');
                    })


                    $('a').not('.outsidelink').not('.googledrive').on('click', function (e) {
                        e.preventDefault();
                        wheretogo = $(this).attr('href');
                        gotothelinkfunction(wheretogo)
    
                        var $clickedLink = $(this);
    
                        $('#noBtn').off('click').on('click', function () {
                            $clickedLink.replaceWith($clickedLink.text());
                            loadnewcontent()
                            document.getElementById("myModal").style.display =
                                "none";
                        })
    
                    });



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

                    $('.colorlegend').hide()


if( whatcheckingsizeview == 2) {
    $('#pcrmobileview').click()
}


                    break;

                case '#mymatrix5':
                    loadnewcontent();
                    $('.stage2 , #pullthecode2 , #mobilepreview2').hide();




                    break;


                case '#mymatrix6':
                    loadnewcontent();
                    $('.stage2 , #pullthecode2 , #mobilepreview2').hide();
                    $('#hidemainmobile').hide()
                    $('.colorlegend').hide()
                    break;


                case '#mymatrix7':
                    loadnewcontent();
                    $('.stage2 , #pullthecode2 , #mobilepreview2').hide();
                    $('.colorlegend').show()
                    break;



                case '#mymatrix9':
                    loadnewcontent();
                    $('.stage2 , #pullthecode2 , #mobilepreview2').hide();
                    $('.colorlegend').hide()
                    break;

            }

        });


        $('#addrow1x1 , #addrow1x1a').on('click', function () {
            $('.interedit').removeClass('interedit')
            $('.onblock').html(
                '<div class="width100c liveelement in910 layoutpale  layoutpale100 interedit"></div>'
            );


            $('.liveelement').on('click', function () {
                $('.interedit').removeClass('interedit')
                $(this).addClass('interedit')

            })

            var html = $('#pullthecode2').html()
            var beautifiedHtml = beautifyHtml(html);
            $('#beautycode').val(beautifiedHtml)
            destructiveoptions()
            clickanddeleterows()
            loadnewcontent()
        })


        $('#myhelp2').on('click', function () {

            $('#myhelp').click()

        })

        $('#ace').on('click', function () {
            $('#myace').click()
        })


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

        $('#import').on('click', function () {
            $('#pullthecode2').children('div').children('.informationcontent').html('')
            $('#fileInput').click();

        })


        $('.pcrcloseicon').on('click', function () {
            $('#codeloaderpcrview').toggle()

        })


        $('#fileInput').change(function (event) {
            // $('.informationcontent').css('opacity', '0.3')
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    const fileContents = e.target.result;
                    $('#pullthecode2').children('div').children('.informationcontent').html(
                        fileContents);
                };

                reader.readAsText(file);



                $('.interedit').on('click', function () {
                    editorcopy = $(this).html()

                    $('#myhtmleditor').val(editorcopy)
                    $('#EditandSubmitAL').show()

                })

            } else {
                // Handle the case where no file was selected or an error occurred.
                // $('#pullthecode2').append('No file was imported')
            }


            setTimeout(function () {

                $('.in910').on('click', function () {
                
                    $('.in910').removeClass('interedit')
                    $(this).addClass('interedit')
                    $('#myhtmleditor').val($(this).html())
                })

             

                $(".draggable").draggable({
                    revert: "valid"
                })

                $('#selectionclear').on('click', function () {
                    $('.interedit').removeClass('interedit')
                })

                $('p').off().on('contextmenu', function (e) {
                    e.preventDefault()
                    $('.interedit').removeClass('interedit')
                    $(this).parent('.in910').addClass('interedit')
                    document.getElementById("myModalcontent").style.display = "block";

                    $('#yesBtn99').on('click', function () {
                        $('.interedit').empty()
                        document.getElementById("myModalcontent").style.display = "none";
                        $('#findthecode2').text($('#pullthecode2').html());
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


                $('a').not('.outsidelink').not('.googledrive').on('click', function (e) {
                    e.preventDefault();
                    wheretogo = $(this).attr('href');
                    gotothelinkfunction(wheretogo)

                    var $clickedLink = $(this);

                    $('#noBtn').off('click').on('click', function () {
                        $clickedLink.replaceWith($clickedLink.text());
                        
                        document.getElementById("myModal").style.display =
                            "none";
                    })

                });

                $('.liveelement').on('click', function () {

                    $('.liveelement').removeClass('interedit')
                    $(this).addClass('interedit')
                    //$('#fixthecode').val($(this).html())
                    $('.clearsection').on('click', function () {
                        $('.interedit').html('')
                      
                    })

                    $('#selectionclear').on('click', function () {
                        $('.interedit').removeClass('interedit')
                    })

                    $('.interedit').on('click', function () {
                        editorcopy = $(this).html()

                        $('#myhtmleditor').val(editorcopy)
                        $('#EditandSubmitAL').show()

                    })

                  
                    $('#myhtmleditor').val($(this).html())


                    layoutmode = 1

                })

               


                
            
                $('.informationcontent').css('opacity', '1')
                $('img.promoimg21').on("contextmenu", function (e) {
                    e.preventDefault(); // Prevent the default context menu
                    currentImage = $(this); // Set the current image
                    $('#customModal').show(); // Show the custom modal

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
                    

                });

                $('#cancelUrl').click(function () {
                    $('#urlModal').hide(); // Hide the URL modal
                    
                });

                $('#deleteImage').click(function () {
                    currentImage.parent('a').remove();
                    currentImage.remove(); // Remove the image
                    $('#customModal').hide();
                    // Hide the custom modal
                    
                });

                $('#closeModal').click(function () {
                    $('#customModal')
                        .hide(); // Hide the custom modal without any action
                });
                loadnewcontent2()
            }, 2000);

           

        });




     













        $('#addrow2x2').on('click', function () {
            $('.hidecss').show()
            $('.interedit').removeClass('interedit')
            $('.onblock').html(
                '<div class="width50c  width50c2 liveelement in910 layoutpale layoutpale50 interedit"></div><div class="width50c  width50c2 liveelement in910 layoutpale  layoutpale50"></div>'
            );



            $('.liveelement').on('click', function () {
                $('.interedit').removeClass('interedit')
                $(this).addClass('interedit')
            })
            destructiveoptions()
            clickanddeleterows()
            loadnewcontent()
            var html = $('#pullthecode2').html()
            var beautifiedHtml = beautifyHtml(html);
            $('#beautycode').val(beautifiedHtml)
        })

        $('#addrow3x3').on('click', function () {
            $('.hidecss').show()
            $('.interedit').removeClass('interedit')
            $('.onblock').html(
                '<div class="width33c width50c2 liveelement in910 layoutpale layoutpale33 interedit"></div><div class="width33c width50c2 liveelement in910 layoutpale layoutpale33"></div><div class="width33c width50c2 liveelement in910 layoutpale layoutpale33"></div>'
            );


            $('.liveelement').on('click', function () {
                $('.interedit').removeClass('interedit')
                $(this).addClass('interedit')
            })
            destructiveoptions()
            clickanddeleterows()
            loadnewcontent()
        })


        $('#addrow4x4').on('click', function () {
            $('.hidecss').show()
            $('.interedit').removeClass('interedit')
            $('.onblock').html(
                '<div class="width20c width50c3 liveelement in910 layoutpale layoutpale25  interedit"></div><div class="width20c width50c3 liveelement in910 layoutpale layoutpale25"></div><div class="width20c width50c3 liveelement in910 layoutpale layoutpale25"></div><div class="width20c width50c3 liveelement in910 layoutpale layoutpale25"></div>'
            );


            $('.liveelement').on('click', function () {
                $('.interedit').removeClass('interedit')
                $(this).addClass('interedit')
            })
            destructiveoptions()
            clickanddeleterows()
            loadnewcontent()
        })

        $('#addrow2x8').on('click', function () {
            $('.hidecss').show()
            $('.interedit').removeClass('interedit')
            $('.onblock').html(
                '<div class="width20c width50c2 liveelement in910 layoutpale layoutpale20 interedit"></div><div class="width80c width50c2 liveelement in910 layoutpale layoutpale25"></div>'
            );


            $('.liveelement').on('click', function () {
                $('.interedit').removeClass('interedit')
                $(this).addClass('interedit')
            })
            destructiveoptions()
            clickanddeleterows()
            loadnewcontent()
        })

        $('#addrow4x6').on('click', function () {
            $('.hidecss').show() 
            $('.interedit').removeClass('interedit')
            $('.onblock').html(
                '<div class="width40c width50c2 liveelement in910 layoutpale layoutpale40"></div><div class="width60c width50c2  liveelement in910 layoutpale interedit layoutpale60"></div>'
            );

            $('.liveelement').on('click', function () {
                $('.interedit').removeClass('interedit')
                $(this).addClass('interedit')
            })
            destructiveoptions()
            clickanddeleterows()
            loadnewcontent()
        })


        $('#addrow4x6a').on('click', function () {
            $('.hidecss').show()
            $('.interedit').removeClass('interedit')
            $('.onblock').html(
                '<div class="width60c width50c2  liveelement in910 layoutpale interedit layoutpale60"></div><div class="width40c width50c2 liveelement in910 layoutpale layoutpale40"></div>'
            );

            $('.liveelement').on('click', function () {
                $('.interedit').removeClass('interedit')
                $(this).addClass('interedit')
            })
            destructiveoptions()
            clickanddeleterows()
            loadnewcontent()
        })

        $('#addrow2x7').on('click', function () {
            $('.hidecss').show()
            $('.interedit').removeClass('interedit')
            $('.onblock').html(
                '<div class="width25c width50c2 liveelement in910 layoutpale layoutpale25 interedit"></div><div class="width75c width50c2 liveelement in910 layoutpale layoutpale75"></div>'
            );

            $('.liveelement').on('click', function () {
                $('.interedit').removeClass('interedit')
                $(this).addClass('interedit')
            })
            destructiveoptions()
            clickanddeleterows()
            loadnewcontent()

        })



        $('#addrowc1xc1').on('click', function () {
            $('.hidecss').show()
            $('.interedit').removeClass('interedit')
            $('.informationcontent').append(
                '<div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width100c liveelement in910 layoutpale layoutpale100 interedit"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div></div>'
            );


            $('.liveelement').on('click', function () {
                $('.interedit').removeClass('interedit')
                $(this).addClass('interedit')
                $('#myhtmleditor').val($(this).html())
            })

            destructiveoptions()
            clickanddeleterows()
            loadnewcontent()
        })

        $('#addrowcxc').on('click', function () {
            $('.hidecss').show()
            $('.informationcontent').append(
                '<div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable onblock"><div class="width100c liveelement in910 layoutpale layoutpale100 "></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div></div>'
            );


            $('.liveelement').on('click', function () {
                $('.interedit').removeClass('interedit')
                $(this).addClass('interedit')
                $('#myhtmleditor').val($(this).html())
            })
            destructiveoptions()
            clickanddeleterows()
            loadnewcontent()
        })

        $('#addrowc2xc8').on('click', function () {
            $('.hidecss').show()
            $('.informationcontent').append(
                '<div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable onblock"><div class="width100c liveelement in910 layoutpale layoutpale100"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width20c width50c2 liveelement in910 layoutpale layoutpale20"></div><div class="width80c width50c2 liveelement in910 layoutpale layoutpale25"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width80c width50c2 liveelement in910 layoutpale layoutpale25"></div><div class="width20c width50c2 liveelement in910 layoutpale layoutpale20"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width20c width50c2 liveelement in910 layoutpale layoutpale20"></div><div class="width80c width50c2 liveelement in910 layoutpale layoutpale25"></div></div>'
            );


            $('.liveelement').on('click', function () {
                $('.interedit').removeClass('interedit')
                $(this).addClass('interedit')
                $('#myhtmleditor').val($(this).html())
            })
            destructiveoptions()
            clickanddeleterows()
            loadnewcontent()
        })



        $('#addrowc4xc6').on('click', function () {
            $('.hidecss').show()
            $('.informationcontent').append(
                '<div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable onblock"><div class="width100c liveelement in910 layoutpale layoutpale100 interedit"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width40c width50c2 liveelement in910 layoutpale layoutpale40"></div><div class="width60c width50c2 liveelement in910 layoutpale layoutpale60"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width40c width50c2 liveelement in910 layoutpale layoutpale40"></div><div class="width60c width50c2 liveelement in910 layoutpale layoutpale60"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width40c width50c2 liveelement in910 layoutpale layoutpale40"></div><div class="width60c width50c2 liveelement in910 layoutpale layoutpale60"></div></div>'
            );


            $('.liveelement').on('click', function () {
                $('.interedit').removeClass('interedit')
                $(this).addClass('interedit')
                $('#myhtmleditor').val($(this).html())
            })
            destructiveoptions()
            clickanddeleterows()
            loadnewcontent()
        })

        $('#addactiverow').on('click', function () {
            $('.hidecss').show()
            $('.layoutbuilder').append(
                '<div class="width100c  layoutpale layoutpale100 liverow droppable onblock"><div class="width100c in910 layoutpale layoutpale100 interedit"></div></div>'
            )

           



            $('.liveelement').on('click', function () {
                $('#myhtmleditor').val($(this).html())
                $('.hidecss').show()
                $('.liveelement').removeClass('interedit')
                $(this).addClass('interedit')
                //$('#fixthecode').val($(this).html())
                $('.clearsection').on('click', function () {
                    $('.interedit').html('')
                    loadnewcontent()
                })

                $('#selectionclear').on('click', function () {
                    $('.interedit').removeClass('interedit')
                })

                $('.interedit').on('click', function () {
                    editorcopy = $(this).html()

                    $('#myhtmleditor').val(editorcopy)
                    $('#EditandSubmitAL').show()

                })

              

                layoutmode = 1

            })

            loadnewcontent()
        })







        $('.addrow50').on('click', function () {
            $('.internalbuttons').slideDown()
            $('.hidecss').show()
            $('.onblock').removeClass('onblock')
            $('.layoutbuilder').append(
                '<div class="width100c" ><div class="width50c width50c2  layoutpale layoutpale50 liverow droppable onblock"></div><div class="width50c width50c2 layoutpale layoutpale50 liverow droppable "></div></div>'
            )

         
            highlightedbackground()
            loadnewcontent()

        })


        $('.addrow25').on('click', function () {
            $('.internalbuttons').slideDown()
            $('.hidecss').show()
            $('.onblock').removeClass('onblock')
            $('.layoutbuilder').append(
                '<div class="width100c" ><div class="width25c width50c3  layoutpale layoutpale25 liverow droppable onblock"></div><div class="width25c width50c3 layoutpale layoutpale25 liverow droppable "></div><div class="width25c width50c3 layoutpale layoutpale25 liverow droppable "></div><div class="width25c width50c3 layoutpale layoutpale25 liverow droppable "></div></div>'
            )

      
           

            $('#myhtmleditor').val($(this).html())
            highlightedbackground()
            loadnewcontent()

        })


        $('.addrow4060').on('click', function () {
            $('.internalbuttons').slideDown()
            $('.hidecss').show()
            $('.onblock').removeClass('onblock')
            $('.layoutbuilder').append(
                '<div class="width100c" ><div class="width40c width50c3  layoutpale layoutpale40 liverow droppable onblock"></div><div class="width60c width50c3 layoutpale layoutpale60 liverow droppable "></div></div>'
            )

     

          
            $('#myhtmleditor').val($(this).html())

            loadnewcontent()

        })

        $('.addrow30x3').on('click', function () {
            $('.internalbuttons').slideDown()
            $('.hidecss').show()
            $('.onblock').removeClass('onblock')
            $('.layoutbuilder').append(
                '<div class="width100c"><div class="width33c width50c2  layoutpale layoutpale33 liverow droppable onblock"></div><div class="width33c width50c2 layoutpale layoutpale33 liverow droppable "></div><div class="width33c width50c2 layoutpale layoutpale33 liverow droppable "></div></div>'
            )

     

           
            $('#myhtmleditor').val($(this).html())

            loadnewcontent()

        })











        $('.addrow6040').on('click', function () {
            $('.internalbuttons').slideDown()
            $('.hidecss').show()
            $('.onblock').removeClass('onblock')
            $('.layoutbuilder').append(
                '<div class="width100c" ><div class="width60c width50c3 layoutpale layoutpale60 liverow droppable "></div><div class="width40c width50c3  layoutpale layoutpale40 liverow droppable onblock"></div></div>'
            )

     

         
            $('#myhtmleditor').val($(this).html())
            highlightedbackground()
            loadnewcontent()

        })

        $('.addrow-click').on('click', function () {
            $('.hidecss').show()
            $('.addrow').click()
            clickanddeleterows()
        })

        $('.addrow').on('click', function () {
            $('.hidecss').show()
            $('.onblock').removeClass('onblock');
            $('.internalbuttons').slideDown()
            $('.layoutbuilder').append(
                '<div class="width100c  layoutpale layoutpale100 liverow droppable onblock"></div>')





            $(".draggable").draggable({
                revert: "valid"
            });

            $(".droppable").droppable({
                drop: function (event, ui) {
                    var mysize = $(ui.draggable).attr('size');
                    var mypale = $(ui.draggable).attr('pale');
                    $('.interedit').removeClass('interedit')
                    $('.hidecss').show()
                    if (mysize !== undefined && mysize !== "") {
                        $(this).append('<div class="' + mysize +
                            ' in910 layoutpale interedit layoutpale' + mypale +
                            '"></div>');

                    }

                    $('.liveelement').on('click', function () {


                        $('.liveelement').removeClass('interedit')
                        $(this).addClass('interedit')
                        //$('#fixthecode').val($(this).html())
                        $('.clearsection').on('click', function () {
                            $('.interedit').html('')
                            loadnewcontent()
                        })

                        $('#selectionclear').on('click', function () {
                            $('.interedit').removeClass('interedit')
                        })

                        $('.interedit').on('click', function () {
                            editorcopy = $(this).html()

                            $('#myhtmleditor').val(editorcopy)
                            $('#EditandSubmitAL').show()

                        })

                      
                        $('#myhtmleditor').val($(this).html())


                        layoutmode = 1

                    })
                    loadnewcontent()
                }
            });



        })


        var currentAnchor = null;


        $('#showthepromotionalimage').on('click', function () {
            imagename01 = $(this).attr('src');

            if ($('#cinput1bpromotional').val() == '') {
                $('.imagemessage').slideDown().delay(2000).slideUp()
                return false
            } else {
                newval3 = $('#cinput1bpromotional').val()
                imagedata2 = '<img class="loading-lazy promoimg21 in910" data-src="' + imagename01 +
                    '" alt="' + newval3 + '">'
                $('.interedit').append(imagedata2).removeClass('.interedit')

            }


            $('img.promoimg21').on("contextmenu", function (e) {
                e.preventDefault(); // Prevent the default context menu
                currentImage = $(this); // Set the current image
                $('#customModal').show(); // Show the custom modal
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
                loadnewcontent()

            });

            $('#cancelUrl').click(function () {
                $('#urlModal').hide(); // Hide the URL modal
                loadnewcontent()
            });


            $('#deleteImage').click(function () {
                currentImage.parent('a').remove();
                currentImage.remove(); // Remove the image
                $('#customModal').hide();
                // Hide the custom modal
                loadnewcontent()
            });

            $('#closeModal').click(function () {
                $('#customModal').hide(); // Hide the custom modal without any action
            });

            loadnewcontent()

        })


        $('.showthepreviewimage').on('click', function () {

            imageselect = $(this).attr('prefix')
            imagename00 = $('#cinput1').val()

            imageheader =
                '<div class="pd-header-tag width100c" style="margin-bottom:10px"><h3 class="t-h6-style in910" id="ocinsertcontent2369">' +
                $('#cinput1c').val() + '</h3></div>'

            if ($('#cinput1b').val() == '') {

                $('.imagemessage').slideDown().delay(2000).slideUp()
                return false
            } else {

                newval2 = $('#cinput1b').val()

                if ($('#cinput1c').val() == '') {
                    imagedata =
                        '<div class="width100c"><img class="loading-lazy promoimg21 in910" data-src="https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BFXM_PRD/on/demandware.static/-/Sites-pcrichard-master-product-catalog/default/images/hires/' +
                        imageselect + imagename00 + '.jpg?sw=400&sh=400&sm=fit" alt="' + newval2 +
                        '"></div>'
                } else {
                    imagedata = imageheader +
                        '<div class="width100c"><img class="loading-lazy promoimg21 in910" data-src="https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BFXM_PRD/on/demandware.static/-/Sites-pcrichard-master-product-catalog/default/images/hires/' +
                        imageselect + imagename00 + '.jpg?sw=400&sh=400&sm=fit" alt="' + newval2 +
                        '"></div>'
                }


                $('.interedit').append(imagedata).removeClass('.interedit')
                loadnewcontent()
                //---------------------------------------------------------


                $('img.promoimg21').on("contextmenu", function (e) {
                    e.preventDefault(); // Prevent the default context menu
                    currentImage = $(this); // Set the current image
                    $('#customModal').show(); // Show the custom modal

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


                    $('a').on('click', function (e) {
                        e.preventDefault();

                        $('a').not('.outsidelink').not('.googledrive').on('click', function (e) {
                            wheretogo = null
                            e.preventDefault();
                            wheretogo = $(this).attr('href');
                            gotothelinkfunction(wheretogo)
                            var $clickedLink = $(this);

                            $('#noBtn').off('click').on('click', function () {
                                $clickedLink.replaceWith($clickedLink
                                    .text());
                                loadnewcontent()
                                document.getElementById("myModal").style
                                    .display = "none";
                            })

                        })

                    })

                    loadnewcontent()

                });

                $('#cancelUrl').click(function () {
                    $('#urlModal').hide(); // Hide the URL modal
                    loadnewcontent()
                });

                $('#deleteImage').click(function () {
                    currentImage.parent('a').remove();
                    currentImage.remove(); // Remove the image
                    $('#customModal').hide();
                    // Hide the custom modal
                    loadnewcontent()
                });

                $('#closeModal').click(function () {
                    $('#customModal').hide(); // Hide the custom modal without any action
                });

                //--------------------------------------------------------

            }



        })


        $('.layoutbuttons').on('click', function () {
            $('.layoutbuttons').css('background-color', '#333').css('color', '#fff')
            $(this).css('background-color', '#ccc').css('color', '#000')
        })


        $('#clearandrestart').on('click', function () {
              localStorage.clear();
            location.reload()
        })



        $('#choosehtag').on('change', function () {
            choosehtag = $(this).val()

        })


        $(document).on('input', '#faqyes', function () {
            faqyes = this.checked ? 1 : 0;
        });

        // Bind click handler to the button or element
        $('#cinput1-clickh2-comp').on('click', function () {

            if ($('#cinput1h2').val() === '') {
                return false;
            }



            var min = 1000;
            var max = 9999;
            var randomFourDigit = Math.floor(Math.random() * (max - min + 1)) + min;

            // Your existing logic
            if (choosehtag === '0') {

                if (faqyes == 1) {
                    $('.interedit').append(
                        '<div class="pd-header-tag width100c"><div class="icon_box"> </div><h2 class="t-h4-style in910" ' +
                        headernewcolor2 + ' id="ocinsertcontent' +
                        randomFourDigit + '">' + $('#cinput1h2').val() + '</h2></div>'
                    ).removeClass('interedit');
                } else {
                    $('.interedit').append(
                        '<div class="pd-header-tag width100c"><h2 class="t-h4-style in910" ' +
                        headernewcolor2 + ' id="ocinsertcontent' +
                        randomFourDigit + '">' + $('#cinput1h2').val() + '</h2></div>'
                    ).removeClass('interedit');
                }
            }


            if (choosehtag === '2') {

                if (faqyes == 1) {
                    $('.interedit').append(
                        '<div class="pd-header-tag width100c"><div class="icon_box"> </div><h4 class="t-h4-style in910" ' +
                        headernewcolor2 + ' id="ocinsertcontent' +
                        randomFourDigit + '">' + $('#cinput1h2').val() + '</h4></div>'
                    ).removeClass('interedit');
                } else {
                    $('.interedit').append(
                        '<div class="pd-header-tag width100c"><h4 class="t-h4-style in910" ' +
                        headernewcolor2 + ' id="ocinsertcontent' +
                        randomFourDigit + '">' + $('#cinput1h2').val() + '</h4></div>'
                    ).removeClass('interedit');
                }
            } else {
                $('.interedit').append(
                    '<div class="pd-header-tag width100c"><h3 class="t-h6-style in910" ' +
                    headernewcolor2 + ' id="ocinsertcontent' +
                    randomFourDigit + '">' + $('#cinput1h2').val() + '</h3></div>'
                ).removeClass('interedit');
            }

            loadnewcontent(); // Ensure this function is defined elsewhere
            $('#cinput1h2').val(''); // Clear the input field
        });


        //--- end function
        $('#cinput1-clickh2').on('click', function () {

            var min = 1000;
            var max = 9999;
            var randomFourDigit = Math.floor(Math.random() * (max - min + 1)) + min;

            if (layoutmode === 1) {

                $('.interedit').append(
                    '<div class="pd-header-tag width100c"><h2 class="t-h4-style  c-blue in910" id="ocinsertcontent' +
                    randomFourDigit + '">' + $('#cinput1h2').val() + '</h2></div>').removeClass(
                    'interedit')


                layoutmode = 0
            } else {

                $('.informationcontent').append(
                    '<div class="pd-header-tag width100c"><h2 class="t-h4-style  c-blue in910" id="ocinsertcontent' +
                    randomFourDigit + '">' + $('#cinput1h2').val() + '</h2></div>')
            }


            loadnewcontent()
            $('#cinput1h2').val('')
        })


        $('#layout1').on('click', function () {
            $('.videocomponent').hide()
            $('.stage2').slideUp()
            $('.informationcontent').html('')
            $('.mysort').hide()
            $('.layout1').show()
            $('.layout2').hide()
            $('#cinput1-click').show()
            $('#myTEXTwidth').show()
            $('#layout1reverse').fadeIn()
            $('#layout150').fadeIn()
            $('#layout120').fadeIn()
            $('#layout160').fadeIn()
            $('.layoutop1').html($('.layoutop2').html())
            $('#mobilepreview').show()
            $('#mobilepreview2').hide()
            $('#mylistwidth').show()
            $('.stage2a').show()
            $('.expand').css('width', '100%')
            $('#cinput1-clickv2').show()
            $('#myDropdown').show()
            $('.simplehide').hide()
            $('.simpleshow').show()
        })

        $('#layout2').on('click', function () {

            $('.stage2').slideDown()
            $('.mysort').show()
            $('.layout2').show()
            $('.layout1').hide()
            $('#cinput1-click').hide()
            $('#myTEXTwidth').hide()
            $('#layout1reverse').hide()
            $('#layout150').hide()
            $('#layout120').hide()
            $('#layout160').hide()
            $('#mylistwidth').hide()
            $('.stage2a').hide()
            $('.expand').css('width', '35%')
            $('#cinput1-clickv2').hide()
            $('#myDropdown').hide()
            $('.simplehide').show()
            $('.simpleshow').hide()
            $('.layoutop2').html($('.layoutop1').html())
            $('#mobilepreview2').show()
            $('#mobilepreview').hide()

        })

        $('#layout1reverse').on('click', function () {
            var parent = $('#reversmodify');
            var divs = parent.children($('#reversmodify').children('div:first'), $('#reversmodify')
                .children('div').eq(1));
            parent.append(divs.get().reverse());
            loadnewcontent()
        })

        $('#layout150').on('click', function () {

            var parent = $('#reversmodify');
            $('#reversmodify').children('div:first').removeClass().addClass('width50c')
            $('#reversmodify').children('div').eq(1).removeClass().addClass('width50c').addClass(
                'trev21')
            loadnewcontent()
        })

        $('#layout120').on('click', function () {
            var parent = $('#reversmodify');
            $('#reversmodify').children('div:first').removeClass().addClass('width20c')
            $('#reversmodify').children('div').eq(1).removeClass().addClass('width80c').addClass(
                'trev21')
            loadnewcontent()
        })


        $('#layout160').on('click', function () {
            var parent = $('#reversmodify');
            $('#reversmodify').children('div:first').removeClass().addClass('width60c')
            $('#reversmodify').children('div').eq(1).removeClass().addClass('width40c').addClass(
                'trev21')
            loadnewcontent()
        })



        $('#cinput3-comp').on('click', function () {

            captureState()

            if ($('#cinput3a').val() === '') {
                return false;
            }

            var min = 1000;
            var max = 9999;
            var randomFourDigit = Math.floor(Math.random() * (max - min + 1)) + min;


            newval = $('#cinput3a').val()


            if (htmlcodeyesno === 0 & htmlcodeyesno2 === 0) {
                $('.interedit').append('<p id="ptag' + randomFourDigit + '">' + newval + '</p>');
                loadnewcontent()
                $('#cinput3a').val('')
                   layoutmode = 0
                   $('.clearsection').on('click', function () {
                    $('.interedit').html('')
                })

                $('a').not('.outsidelink').not('.googledrive').on('click', function (e) {
                    wheretogo = null
                    e.preventDefault();
                    wheretogo = $(this).attr('href');
                    gotothelinkfunction(wheretogo)
                    var $clickedLink = $(this);
    
                    $('#noBtn').off('click').on('click', function () {
                        $clickedLink.replaceWith($clickedLink.text());
                        loadnewcontent()
                        document.getElementById("myModal").style.display = "none";
                    })
    
                });
                
                return false;
            } if (htmlcodeyesno2 === 1) {
              
                captureState()
                $('.informationcontent').parent('div').parent('div').prepend('<div class="htmlonly">'+newval+'</div>')
                loadnewcontent()
                $('#cinput3a').val('')
                $('.clearsection').on('click', function () {
                    $('.interedit').html('')
                })

                $('a').not('.outsidelink').not('.googledrive').on('click', function (e) {
                    wheretogo = null
                    e.preventDefault();
                    wheretogo = $(this).attr('href');
                    gotothelinkfunction(wheretogo)
                    var $clickedLink = $(this);
    
                    $('#noBtn').off('click').on('click', function () {
                        $clickedLink.replaceWith($clickedLink.text());
                        loadnewcontent()
                        document.getElementById("myModal").style.display = "none";
                    })
    
                });

                $('.htmlonly').off().on('contextmenu', function (e) {
                    e.preventDefault()
                    $('.interedit').removeClass('interedit')
                    $(this).parent('.in910').addClass('interedit')
                    document.getElementById("myModalcontent").style.display = "block";

                    $('#yesBtn99').on('click', function () {
                        $('.interedit').empty()
                        document.getElementById("myModalcontent").style.display = "none";
                        $('#findthecode2').text($('#pullthecode2').html());
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


                $(".htmlonly").dblclick(function() {
                    $(this).attr("contenteditable", "true");
                    $(this).focus();
                  });


                  $(".htmlonly").blur(function() {
                    loadContent();
                  });


            layoutmode = 0
                return false;
            } else {
      
                captureState()
                $('.interedit').append('<div class="htmlonly">'+newval+'</div>')
                loadnewcontent()
                $('#cinput3a').val('')
                $('.clearsection').on('click', function () {
                    $('.interedit').html('')
                })

                $('a').not('.outsidelink').not('.googledrive').on('click', function (e) {
                    wheretogo = null
                    e.preventDefault();
                    wheretogo = $(this).attr('href');
                    gotothelinkfunction(wheretogo)
                    var $clickedLink = $(this);
    
                    $('#noBtn').off('click').on('click', function () {
                        $clickedLink.replaceWith($clickedLink.text());
                        loadnewcontent()
                        document.getElementById("myModal").style.display = "none";
                    })
    
                });

                $('.htmlonly').off().on('contextmenu', function (e) {
                    e.preventDefault()
                    $('.interedit').removeClass('interedit')
                    $(this).parent('.in910').addClass('interedit')
                    document.getElementById("myModalcontent").style.display = "block";

                    $('#yesBtn99').on('click', function () {
                        $('.interedit').empty()
                        document.getElementById("myModalcontent").style.display = "none";
                        $('#findthecode2').text($('#pullthecode2').html());
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

                $(".htmlonly").dblclick(function() {
                    $(this).attr("contenteditable", "true");
                    $(this).focus();
                  });


                  $(".htmlonly").blur(function() {
                    loadContent();
                  });


            layoutmode = 0
            }

            

           

            


        })


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
            loadnewcontent()
        })


        function adjustHeight() {
            $('#pullthecode2').height($(document).height() - 350);
        }

        $('#cinput3').on('click', function (e) {

            var min = 1000;
            var max = 9999;
            var randomFourDigit = Math.floor(Math.random() * (max - min + 1)) + min;
            if (layoutmode === 0) {
                $('.informationcontent').append('<div class="' + $('#myTEXTwidth').val() +
                    '"><p class="in910" id="ocinsertcontent' + randomFourDigit +
                    '">' + $(
                        '#cinput3a').val() + '</p></div>')

                $('#cinput3a').val('')
            } else {
                $('.interedit').append('<p>' + $('#cinput3a').val() + '</p>').removeClass('interedit');
                $('#cinput3a').val('')
                layoutmode = 0
            }

            loadnewcontent()

        })


        $('#wraparoundselect').on('change', function () {
            shouldishowproductimages = $(this).val()
            if (shouldishowproductimages === 'product') {
                $('#blogproductlist').show()
                $('#wraparoundfilename').hide()
                $('#wraparoundproductnumber').show()
                $('#wraparoundsubmit').hide()
                $('#reverseimage').show()
            } else {

                $('#blogproductlist').hide()
                $('#wraparoundfilename').show()
                $('#wraparoundproductnumber').hide()
                $('#wraparoundsubmit').show()

            }
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

            })

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

            $('img.promoimg21').on("contextmenu", function (e) {
                e.preventDefault();
                currentImage = $(this); // Set the current image
                $('#customModal').show(); // Show the custom modal
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
                loadnewcontent()

            });

            $('#cancelUrl').click(function () {
                $('#urlModal').hide(); // Hide the URL modal
                loadnewcontent()
            });

            $('#deleteImage').click(function () {
                currentImage.parent('a').remove();
                currentImage.remove(); // Remove the image
                $('#customModal').hide();
                // Hide the custom modal
                loadnewcontent()
            });

            $('#closeModal').click(function () {
                $('#customModal').hide(); // Hide the custom modal without any action
            });

            loadnewcontent()
        })



        $('#cinput2').on('input', function (e) {
            $('.cinputval2').text($(this).val())
            loadnewcontent()
        })


        adjustHeight();

        $(window).resize(function () {
            adjustHeight();
        });


        $('#cinput1-clickv2').on('click', function () {

            imageselect = $('#myDropdown').val()
            imagedata = '<div class="' + $('#myIMGwidth').val() +
                '"><img class="loading-lazy promoimg21 in910" data-src="https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BFXM_PRD/on/demandware.static/-/Sites-pcrichard-master-product-catalog/default/images/hires/' +
                imageselect + $('#cinput1').val() + '.jpg?sw=400&sh=400&sm=fit" alt="' + $(
                    '#cinput1b').val() + '"></div>'

            if (layoutmode === 1) {
                $('.interedit').append(imagedata).removeClass('interedit')
                //
            } else {
                $('.informationcontent').append(imagedata)
            }

            loadnewcontent()
        })

        $('#cinput1-click').on('click', function (e) {

            imageselect = $('#myDropdown').val()

            if ($('#cinput1b').val() == '') {

                $('.imagemessage').slideDown().delay(2000).slideUp()
                return false
            } else {
                actualimg0 = ''
                actualimg =
                    'https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BFXM_PRD/on/demandware.static/-/Sites-pcrichard-master-product-catalog/default/dwf8295540/images/hires/' +
                    imageselect + $('#cinput1').val() + '.jpg?sw=300&amp;sh=300&amp;sm=fit';
                actualalt = $('#cinput1b').val()
                $('#cinputval1').attr('src', actualimg0).attr('loading', 'lazy').attr('itemprop',
                    'image').attr('data-src', actualimg).attr('alt', actualalt);
                loadnewcontent()

               

            }

        })


        $('#myDropdown').on('change', function () {
            $('#cinput1-click').click()
        })


        $('#modellinkmaker').on('click', function () {
            document.getElementById("myModal2").style.display = "block";
        })


        function openModal(wheretogo) {
            document.getElementById("myModal").style.display = "block";
            $('#yesBtn').on('click', function () {
                window.open(wheretogo, '_blank');
                document.getElementById("myModal").style.display = "none";
            });

            $('#noBtn').on('click', function () {
                if (currentAnchor) {
                    $(currentAnchor).contents().unwrap(); // Remove the link but keep the text
                    loadnewcontent()
                    currentAnchor = null;
                    document.getElementById("myModal").style.display = "none";
                }
            });
        }

        loadnewcontent()


      
        // Key Commands
        $(document).keydown(function (e) {
            if (e.key === 'z' && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
                e.preventDefault(); // Prevent default undo behavior
                captureState();
                undoChange();
               
            } else if (e.key === 'y' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault(); // Prevent default redo behavior
                captureState();
                redoChange();
            } else if (e.key === 'Delete' && e.ctrlKey) {
                e.preventDefault(); // Prevent default delete behavior
                deleteHighlightedText();
            } else if (e.key === 'e' && e.ctrlKey) {
                e.preventDefault();
                captureState();
                $('#superscriptbutton').click()
            } else if (e.key === 'd' && e.ctrlKey) {
                e.preventDefault();
                captureState();
                $('#subscriptbutton').click()
                captureState();
            }
        });



        $('.texttype').click(function () {
            captureState(); // Assuming this function captures the current state for undo functionality
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
            captureState();
            // Load new content after updating the DOM

        });







        $('#linkmaker').click(function () {

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


            loadnewcontent()



            $('a').not('.outsidelink').not('.googledrive').on('click', function (e) {
                wheretogo = null
                e.preventDefault();
                wheretogo = $(this).attr('href');
                gotothelinkfunction(wheretogo)
                var $clickedLink = $(this);

                $('#noBtn').off('click').on('click', function () {
                    $clickedLink.replaceWith($clickedLink.text());
                    loadnewcontent()
                    document.getElementById("myModal").style.display = "none";
                })

            });


        });

        $('#closediag').on('click', function () {
            document.getElementById("myModal").style.display = "none";
            currentAnchor = null;
        });



        $('#layoutbuilder-oc2').click()


        $('.textaligner').on('click', function () {
            cssadd = $(this).attr('cssadd')
            $('.interedit').css('text-align', cssadd);
            $('.interedit p').css('text-align', cssadd)
            $('.interedit .pd-header-tag').css('text-align', cssadd).css('line-height' , '116%');
            $('.interedit .pd-header-tag h2 ,.interedit .pd-header-tag h3').attr('style', function(i, style) {
                return style + ';margin-bottom: 0px !important;';
            });
           // $('.interedit .pd-header-tag h3').css('text-align', cssadd);
            editorcopy = $('.interedit').html()
            $('#myhtmleditor').val(editorcopy)
            loadnewcontent()
        })

        $('#textaligner2 , #textaligner2a , #textaligner2b').on('change', function () {
            var cssadd = $(this).val();
            $('.interedit').removeClass(
                'addpadding0 addpadding10 addpadding20 addpadding40 addpadding60 addpadding80 addpadding100'
            ).addClass(cssadd);

            editorcopy = $('.interedit').html();
            $('#myhtmleditor').val(editorcopy);
            loadnewcontent();
        });




        $('.textaligner3').on('click', function () {
            captureState();
            var selection = window.getSelection();

            if (selection.rangeCount > 0) {
                var range = selection.getRangeAt(0);
                var brElement = document.createElement('br');
                range.insertNode(brElement);
                $('.interedit').contents().filter(function () {
                    return this.nodeType === 3 && $.trim(this.nodeValue) !== '';
                }).wrap('<p></p>');
            }
            $('#myhtmleditor').val($('.interedit').html());
            loadnewcontent();
        });


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


        $('#layout2').click()

        $('#cinputval1').attr('src',
            'https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BFXM_PRD/on/demandware.static/-/Sites-pcrichard-master-product-catalog/default/dwf8295540/images/hires/Z_RF18A5101SR.jpg?sw=300&amp;sh=300&amp;sm=fit'
        )

    });


    $('#beautycode').on('input', function () {
        $('#pullthecode2').html($('#beautycode').val())

        $('.liveelement').on('click', function () {
            $('.interedit').removeClass('interedit')
            $(this).addClass('interedit')
        })
        clickanddeleterows()
        destructiveoptions()
        loadnewcontent();
    })

    document.getElementById('clicktoloadlocalfiles').addEventListener('click', function () {
        document.getElementById('imgfileInput').click(); // Simulate file input click
        $('#loadedimagemessage').show()
    });

    $("#sidetoolset").delay(600).animate({
        opacity: 1
    }, 1000); // 1000 milliseconds = 1 second

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
            $('#showthepromotionalimage').attr('src',
                'https://www.pcrichard.com/on/demandware.static/-/Sites-pcrichard-master-articles-catalog/default/images' +
                $('#catalogselector').val() + desktoppictures)
        })



    });

    /* Mac Version March 24th */


    $(document).ready(function () {
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
    });



    
    function attachTripleClickHandlerToImportedContent() {
        // Select all <div> elements with the class 'importedContent'
        const elements = document.querySelectorAll('.importedContent');
    
        elements.forEach(function(element) {
            let clickCount = 0; // Initialize click counter
            let clickTimer = null; // Initialize timer
    
            element.addEventListener('click', function() {
                clickCount++; // Increment click count on each click
    
                if (clickCount === 1) {
                    // Start a timer if this is the first click
                    clickTimer = setTimeout(function() {
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
            element.addEventListener('keypress', function(event) {
                // Check if the Enter key was pressed
                if (event.key === 'Enter' || event.keyCode === 13) {
                    event.preventDefault(); // Prevent default action (important if inside a form)
                    loadnewcontent(); // Call the loadContent function
                }
            });
        });
    }













    document.getElementById('fileimport').addEventListener('change', function() {
        var file = this.files[0];
        if (!file) return; // Exit if no file is selected
    
        // Function to display content for .html and .txt files
        function displayDirectContent(fileContent) {
            // Process and display the file content directly without conversion
            var processedContent = fileContent.replace(/https:\/\/www\.pcrichard\.com/g, '');
            var $content = $('<div>').html(processedContent);
            $content.find('h1, h2 , h3 , h4 ,h5').addClass('t-h4-style').wrap('<div class="pd-header-tag width100c"></div>');
            $content.find('a').filter(function() {
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
            loadnewcontent()
            attachTripleClickHandlerToImportedContent();
        }
    
        // Function to display content, specifically for converting .docx to HTML
        function displayConvertedContent(htmlContent) {
            // Similar to displayDirectContent but specifically for .docx conversion results

            var processedHtmlContent = htmlContent.replace(/https:\/\/www\.pcrichard\.com/g, '');
            var $htmlContent = $('<div>').html(processedHtmlContent);
            $htmlContent.find('h1, h2 , h3 , h4 ,h5').addClass('t-h4-style').wrap('<div class="pd-header-tag width100c"></div>');
            $htmlContent.find('a').filter(function() {
                return $.trim($(this).text()) === '' && $(this).children().length === 0;
            }).remove();
        
            $('.hidecss').show();
            $('.onblock').removeClass('onblock');
            $('.internalbuttons').slideDown();
            $('.informationcontent').append(
                '<div class="width100c layoutpale layoutpale100 liverow droppable onblock">' + 
                '<div class="width100c liveelement in910 layoutpale layoutpale100 importedContent interedit">' + 
                $htmlContent.html()  + '</div></div>'
            );
    
            attachEventHandlers();
            loadnewcontent()
            attachTripleClickHandlerToImportedContent();
        }
    
        // Attach event handlers for dynamically added content
        function attachEventHandlers() {
           
 
    
            $('a').not('.outsidelink').not('.googledrive').on('click', function(e) {
                e.preventDefault();
                var wheretogo = $(this).attr('href');
                gotothelinkfunction(wheretogo); // Assuming this function is defined elsewhere
            });
        }
    
        // Determine file type and process accordingly
        if (file.name.endsWith('.docx')) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var arrayBuffer = e.target.result;
                mammoth.convertToHtml({arrayBuffer: arrayBuffer})
                    .then(function(result) {
                        displayConvertedContent(result.value); // Display the converted HTML
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            };
            reader.readAsArrayBuffer(file);
        } else {
            // For .txt or .html, read as text and display directly
            var reader = new FileReader();
            reader.onload = function(e) {
                var fileContent = e.target.result;
                displayDirectContent(fileContent);
            };
            reader.readAsText(file);
        }
    });




     $(document).ready(function() {



    var savedContent = localStorage.getItem("savedContent");
    if(savedContent) {
        $('#pullthecode2').html(savedContent);

        
        imagemodification()
        $('.liveelement').on('click', function () {
            $('.liveelement').removeClass('interedit')
            $(this).addClass('interedit')
            //$('#fixthecode').val($(this).html())
            $('.clearsection').on('click', function () {
                $('.interedit').html('')
                loadnewcontent()
            })

            $('#selectionclear').on('click', function () {
                $('.interedit').removeClass('interedit')
            })

            $('.interedit').on('click', function () {
                editorcopy = $(this).html()

                $('#myhtmleditor').val(editorcopy)
                $('#EditandSubmitAL').show()

            })

        
           

   

            $('#EditandSubmitAL').on('click', function () {

                $('.interedit').html($('#myhtmleditor').val())
                loadnewcontent()
                
            })
            $('#myhtmleditor').val($(this).html())
            



            layoutmode = 1

        })
        loadnewcontent2()
     
        $('a').not('.outsidelink').not('.googledrive').on('click', function (e) {
            e.preventDefault();
            wheretogo = $(this).attr('href');
            gotothelinkfunction(wheretogo)

            var $clickedLink = $(this);

            $('#noBtn').off('click').on('click', function () {
                $clickedLink.replaceWith($clickedLink.text());
                loadnewcontent()
                document.getElementById("myModal").style.display =
                    "none";
            })

        });
        
    }
    
});

// Function to save the current state of the content area
function saveContent() {
    localStorage.setItem("savedContent", $('#pullthecode2').html());
}

// Example of manually triggering save on a specific action
$('#saveButton').on('click', function() {
    saveContent();
});


// Use setInterval for periodic saving, with a content check to ensure efficiency
var lastSavedContent = $('#pullthecode2').html();
setInterval(function() {
    var currentContent = $('#pullthecode2').html();
    if(currentContent !== lastSavedContent) {
        saveContent();
        lastSavedContent = currentContent;
    }
}, 15000);





//--------------------------------------------------------------------------------- broken

document.body.addEventListener('dblclick', function(event) {
    if (event.target.classList.contains('slider-control')) {
        event.target.setAttribute('contenteditable', 'true');
        event.target.focus();
    }
});

document.body.addEventListener('keydown', function(event) {
    if (event.target.classList.contains('slider-control') && event.key === 'Enter') {
        event.preventDefault(); // Prevent the newline or any other default behavior
        event.target.blur();  // Manually remove focus to trigger the blur event
    }
});

document.body.addEventListener('blur', function(event) {
    if (event.target.classList.contains('slider-control') && event.target.isContentEditable) {
        event.target.setAttribute('contenteditable', 'false');
        const sliderId = event.target.parentElement.getAttribute('for');
        const slider = document.getElementById(sliderId);
        const newValue = parseInt(event.target.textContent, 10);

        if (!isNaN(newValue) && newValue >= parseInt(slider.min) && newValue <= parseInt(slider.max)) {
            slider.value = newValue;
            const inputEvent = new Event('input', {
                bubbles: true,
                cancelable: true,
            });
            slider.dispatchEvent(inputEvent);  // Dispatch the input event manually
        } else {
            // Reset to current slider value if input is invalid
            event.target.textContent = slider.value;
        }
    }
}, true);

function updateSliderValue(value, sliderId) {
    const label = document.querySelector(`label[for="${sliderId}"] .slider-control`);
    if (label) {
        label.textContent = value;
    }
}

document.body.addEventListener('input', function(event) {
    if (event.target.classList.contains('slider')) {
        updateSliderValue(event.target.value, event.target.id);
    }
});

clickanddeleterows()