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
            runexplorer();
            $('img.loading-lazy').each(function() {
                $(this).attr('src' , $(this).attr('data-src'))
            })
            $('#mobilepreview2').html($('#pullthecode2').html());
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

                runexplorer();
                

            });

            $('#cancelUrl').click(function () {
                $('#urlModal').hide(); // Hide the URL modal
                runexplorer();
            });

            $('#deleteImage').click(function () {
                currentImage.parent('a').remove();
                currentImage.remove(); // Remove the image
                $('#customModal').hide();
                // Hide the custom modal
                runexplorer();
            });

            $('#closeModal').click(function () {
                $('#customModal').hide(); // Hide the custom modal without any action
            });

            //--------------------------------------------------------

        }

      


    })
