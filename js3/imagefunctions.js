function imagefunctions() {
    $('img.promoimg21').on("contextmenu", function (e) {
        e.preventDefault(); // Prevent the default context menu
        currentImage = $(this); // Set the current image
        $('#customModal').show(); // Show the custom modal
    });
    $('a img').on('click', function (e) {
        e.preventDefault()
    })

    $('#noBtn').click(function () {
        // Find the <a> tag by using a more generic selector that looks for <a> tags with an <img> inside
        var $link = $('a:has(img)');

        // Extract the <img> element from the <a> tag
        var $img = $link.find('img');

        // Replace the <a> tag with the <img> element
        $link.replaceWith($img);
        runexplorer()
        $('#myModal').hide()
    });


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
        runexplorer()
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
    runexplorer()
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
    runexplorer()

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



    //runexplorer();
    imagefunctions()
    updateMobilePreview()

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



    //runexplorer();
    imagefunctions()
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
        //runexplorer();
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