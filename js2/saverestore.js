var savedContent = localStorage.getItem("savedContent");



if (savedContent) {
    $('#pullthecode2').html(savedContent);
    $('#mobilepreview2').html($('#pullthecode2').html());
    enabledrop()
    runexplorer();
    postimg()
    $('a').not('.googledrive').not('.outsidelink').on('click', function (e) {
        var target = $(e.target);
        if (!target.is('a')) {
            target = target.closest('a');
        }
        e.preventDefault();
        var wheretogo = target.attr('href');
        gotothelinkfunction(wheretogo);

        $('#noBtn').off('click').on('click', function (e) {
            var target = $(e.target);
            if (!target.is('a')) {
                target = target.closest('a');
            }
            target.replaceWith(target.text());
            runexplorer();
            document.getElementById("myModal").style.display = "none";
        });
    });

    $('a img').on('click' , function(e) {
        e.preventDefault()
       
    })

    $('#cancelUrl').click(function () {
        $('#urlModal').hide(); // Hide the URL modal
        runexplorer();
    });

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


// Function to save the current state of the content area
/*
function saveContent(content) {
    localStorage.setItem("savedContent", content);
}

$('#saveButton').on('click', function () {
    var content = $('#pullthecode2').html();
    saveContent(content);
});
*/


/*
var lastSavedContent = $('#pullthecode2').html();
setInterval(function () {
    var currentContent = $('#pullthecode2').html();
    if (currentContent !== lastSavedContent) {
        saveContent(currentContent);
        lastSavedContent = currentContent;
    }
}, 25000);

*/

var clearAndRestartClicked = false;

// Event listener for the button
$('#clearandrestartbutton').click(function() {
    clearAndRestartClicked = true; // Set the flag
    localStorage.clear(); // Clear all localStorage data
    location.reload(); // Reload the page
});

// Modify the beforeunload event
window.addEventListener('beforeunload', function() {
    // Check if the button click flag is false
    if (!clearAndRestartClicked) {
        var contentToSave = $('#pullthecode2').html(); // Get the content of the element
        localStorage.setItem('savedContent', contentToSave); // Save it to localStorage
    }
});

$(document).ready(function() {
    var savedContent = localStorage.getItem('savedContent'); // Retrieve the saved content
    if (savedContent) {
        $('#pullthecode2').html(savedContent); // Set the content of the element if there is any saved
        runexplorer()
        imagefunctions()
        $('a').not('.googledrive').not('.outsidelink').on('click', function (e) {
            var target = $(e.target);
            if (!target.is('a')) {
                target = target.closest('a');
            }
            e.preventDefault();
            var wheretogo = target.attr('href');
            gotothelinkfunction(wheretogo);
            imagefunctions()
        
        });
    }
});