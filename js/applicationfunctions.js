



$('#EditandSubmitAL').on('click', function () {
    $('.interedit').html($('#myhtmleditor').val())
    loadnewcontent()
})








$('#pcrdesktopview').on('click', function () {
    whatcheckingsizeview = 0
    $("#fullembedcodeddd2").animate({'width' : '1024px'})
    $('#fullembedcodeddd').css('max-width', 'none').css('margin-left', '0%').css('background-color', '#333')
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
    $("#fullembedcodeddd2").animate({'width' : '768px'})
    $('#fullembedcodeddd').css('max-width', '769px').css('margin-left', '6%').css('background-color', '#333')
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
    $("#fullembedcodeddd2").animate({'width' : '390px'})
    $('#fullembedcodeddd').css('max-width', '400px').css('margin-left', '7.85%').css('background-color', '#333')
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


$('#linkmaker3').on('click', function () {
     
    
    if ($('#whatsthelink3').val().includes('pcrichard.com') || $('#whatsthelink3').val().includes(
            'https://') || $('#whatsthelink2').val().includes('www') || $('#whatsthelink3').val()
        .includes('staging-na01-pcrichard')) {
        $('#message2').slideDown().delay(2000).slideUp()
        return false;
    }
    var selection = window.getSelection();
    if (!selection.rangeCount) return; // Exit if no selection
    var selectedText3 = selection.toString();
    var whatsthelink3 = $('#whatsthelink3').val();



    if (outsidelink3 === 0) {
        
         anchor3 = '<a href="' + whatsthelink3 + '">' + selectedText3 + '</a>';
    } else {
       
         anchor3 = '<a href="' + whatsthelink3 + '" target="_blank">' + selectedText3 + '</a>';
    }

    var range = selection.getRangeAt(0);
    if (layoutmode === 1) {
      
        var newNode = document.createElement('div');
        newNode.innerHTML = anchor3;
        range.deleteContents();
        range.insertNode(newNode.firstChild);


    } else {
     
        var newNode = document.createElement('div');
        newNode.innerHTML = anchor3;
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

    $('#noBtn').on('click', function () {
        if (currentAnchor) {
            $(currentAnchor).contents().unwrap(); // Remove the link but keep the text
            loadnewcontent()
            currentAnchor = null;
            document.getElementById("myModal").style.display = "none";
        }
    });

    


})

