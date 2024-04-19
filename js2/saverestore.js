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
function saveContent() {
    localStorage.setItem("savedContent", $('#pullthecode2').html());

}

// Example of manually triggering save on a specific action
$('#saveButton').on('click', function () {
    saveContent();
});


// Use setInterval for periodic saving, with a content check to ensure efficiency
var lastSavedContent = $('#pullthecode2').html();
setInterval(function () {
    var currentContent = $('#pullthecode2').html();
    if (currentContent !== lastSavedContent) {
        saveContent();
        lastSavedContent = currentContent;
    }
}, 15000);