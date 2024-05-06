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
        //runexplorer();
    });

    $('#wrapImage').click(function () {
        $('#customModal').hide(); // Hide the custom modal
        $('#urlModal').show(); // Show the URL modal
    });


}



function pushtomobile() {
    $('#mobilepreview2').html($('.informationcontent').html());
    $('#pullthecode2').slideDown()
    $('#mobilepreview2').slideDown()
    $('#explorer2').slideDown()
    //runexplorer();
}

$('#import').on('click', function () {
    $('#pullthecode2').children('div').children('.informationcontent').html('')
    $('#fileInput').click();

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
                //explorerpostload(); // Call the loadContent function
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
                    updateExplorer();
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

