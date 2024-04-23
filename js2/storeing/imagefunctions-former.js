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



