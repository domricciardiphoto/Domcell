  createnewlist = 1
    listaddition = 0
    layoutmode = 0
    outsidelink = 0
    outsidelink2 = 0
    outsidelink3 = 0
    choosehtag = '0'
    mylisttype = 0;
    var html = $('#pullthecode2').html()
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


    function beautifyHtml(html) {
    var tab = '\t'; // You can choose something else for indentation
    var result = '';
    var indent= '';

    html.split(/>\s*</).forEach(function(element) {
        if (element.match(/^\/\w/)) {
            indent = indent.substring(tab.length); // Decrease indent
        }

        result += indent + '<' + element + '>\n';

        if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("input")) { // Increase indent
            indent += tab;              
        }
    });

    return result.substring(1, result.length-3);
}


    function clickanddeleterows() {
        $('.liverow').on('click', function () {
            $('.onblock').removeClass('onblock')
            $(this).addClass('onblock')
        })
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


    function loadnewcontent() {
       
        $('#pullthecode .promoimg21 , #pullthecode2 .promoimg21').removeAttr('src')
        $('#pullthecode #cinputval1').removeAttr('src')
        $('#findthecode').text($('#pullthecode').html());
        $('#findthecode2').text($('#pullthecode2').html());
        $('#myhtmleditor').val($('.interedit').html())
     
    
        var html = $('#pullthecode2').html()
        var beautifiedHtml = beautifyHtml(html);
        $('#beautycode').val(beautifiedHtml)


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


        $(".interedit").mousedown(function () {
            // When mouse button is pressed down, start a timer
            timeout = setTimeout(function () {
                // Code to execute when the item has been held for 2 seconds
                console.log("Item held for 2 seconds or more");
                // Add your desired actions here
            }, 2000); // 2000 milliseconds = 2 seconds
        }).mouseup(function () {
            // When mouse button is released, clear the timer
            clearTimeout(timeout);
        });


        var element = $('#findthecode2');
        var content = element.text();

        // Define the words you want to remove
        var wordsToRemove = ['liveelement', 'in910', 'layoutpale', 'layoutpale50', 'liverow', 'droppable',
            'ui-droppable', 'layoutbuilder', 'sortable', 'layoutop2', 'ui-', 'layoutpale100', ' ui-',
            'layoutpale30', 'layoutpale20', , 'layoutpale33', 'onblock', 'interedit',
            'https://staging-na01-pcrichard.demandware.net/on/demandware.static/-/Library-Sites-PCRichardSharedLibrary/default/dw0d66f82d/',
            'promoimg21', 'ui--disabled', 'style=""', 'ui--handle ', 'ui- ui--handle'
        ];

        // Loop through the words and remove them from the content
        wordsToRemove.forEach(function (word) {
            content = content.replace(new RegExp('\\b' + word + '\\b', 'g'), '');
        });

        // Set the modified content back to the element
        element.text(content);



        $('#pullthecode #cinputval1').attr('src', $('#pullthecode #cinputval1').attr('data-src'))
        $('#pullthecode .promoimg21 , #pullthecode2 .promoimg21').each(function () {
            newsrc = $(this).attr('data-src')
            $(this).attr('src', newsrc)
        })

        $('#mobilepreview').delay(2000).html($('#pullthecode').html())
        $('#mobilepreview2').delay(2000).html($('#pullthecode2').html())


        $('#findthecode2').text(function (index, oldText) {
            return oldText.replace(/https:\/\/www\.pcrichard\.com/g, '');
        });

        $('#EditandSubmitAL').on('click', function () {
            $('.interedit').html($('#myhtmleditor').val())
            loadnewcontent()
        })

        $('#codeloaderpcrview').html($('#pullthecode2').html())

    }

    resizeHandle.addEventListener('mousedown', function (e) {
        e.preventDefault();
        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', stopResize);
    });

    function resize(e) {
        $('#resizable-div').width('62%').css('background-color', '#fff').css('float', 'right').css('max-width', '62%')
        resizableDiv.style.width = e.clientX - resizableDiv.getBoundingClientRect().left + 'px';
        resizableDiv.style.height = e.clientY - resizableDiv.getBoundingClientRect().top + 'px';
        $('#clearandrestart').hide()
    }

    function stopResize() {
        $('#programming').show()
        $('#resizable-div').width('62%').css('background-color', 'rgb(37, 37, 37)').css('float', 'left')
        window.removeEventListener('mousemove', resize);
        $('#clearandrestart').show()
    }


    $('#submitnewcode').on('click', function () {
        newsubmit = $('#fixthecode').val()
        $('.editable').html(newsubmit).removeClass('editable').css('background-color', 'transparent')

        loadnewcontent()
    })


    $('.deletecode').on('click', function () {
        $('.editable').remove()
        $('.interedit').remove()
        // $('.editable').parent('ul').remove()
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
    });





    $('.whattypeofimage').on('click', function () {
        $('.typeofim').hide()
        openimagebuilder = '.' + $(this).attr('openimagebuilder');
        $(openimagebuilder).slideDown()

        if(openimagebuilder === '.productimage') {
            $('#mycompimagelist , #clicktoloadlocalfiles').hide()
        } else {
            $('#mycompimagelist , #clicktoloadlocalfiles').show()
        }
        $('.whattypeofimage').css('background-color', '#334')
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

        $('a').not('.outsidelink').on('click', function (e) {
            e.preventDefault();
            currentAnchor = this; // Store the current anchor element
            wheretogo = $(this).attr('href');
            openModal('https://www.pcrichard.com' + wheretogo);
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
            var anchor3 = '<a href="' + whatsthelink3 + '">' + selectedText3 + '</a>';
        } else {
            var anchor3 = '<a href="' + whatsthelink3 + '" target="_blank">' + selectedText3 + '</a>';
        }

        var range = selection.getRangeAt(0);
        if (layoutmode === 1) {
            var newNode = document.createElement('div');
            newNode.innerHTML = anchor2;
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

        $('a').not('.outsidelink').on('click', function (e) {
            e.preventDefault();
            currentAnchor = this; // Store the current anchor element
            wheretogo = $(this).attr('href');
            openModal('https://www.pcrichard.com' + wheretogo);
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




































    document.getElementById('cinput1').addEventListener('input', function () {

        $('.showthepreviewimage').css('opacity', '1').css('pointer-events', 'all')
        $('.showthepreviewimage').each(function () {
            previewurld =
                'https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BFXM_PRD/on/demandware.static/-/Sites-pcrichard-master-product-catalog/default/images/hires/'
            imageprefix = $(this).attr('prefix');
            $(this).attr('src', previewurld + imageprefix + $('#cinput1').val() + '.jpg')
        })


        var imgs = document.getElementsByTagName('img');
for (var i = 0, j = imgs.length; i < j; i++) {
    if (imgs[i].classList.contains('showthepreviewimage')) { // Check if the image has the specific class
        // Hide parent <div> initially until image is confirmed to load
        imgs[i].parentNode.style.display = 'none';

        imgs[i].onload = function() {
            this.parentNode.style.display = ''; // Show the parent <div> of the image
        };

        imgs[i].onerror = function(e) {
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

        }


    })



    document.getElementById('mytoolsview').addEventListener('change', function () {
        if (this.checked) {
            $('#programming').addClass('fullscreend').hide()
            $('#fullscreenresort').css('width', '80%').css('margin-left', '2%')
            //  $('.internalscroller').css('max-height', 'none').css('overflow-y', 'unset')
            //  $(' #pullthecode2').hide()
            //   $('.fullscreenmode').css('padding', '0px ').css('margin-left', '0px')

            $('#resizable-div').delay(500).animate({
                width: '100%'
            }, 500);
            $('#legend').hide()
            $('.hamburger').show()
            $('.textaligner svg').css('width', '100%')
            //  $('.hideinfullscreen').hide()
            //  $('.mymobile , #pullthecode2').css('float', 'right')
            //  $(' #pullthecode2').css('width', '70%').show()
            $('.imgbuild').css('width', '96%')

        } else {
            $('.textaligner svg').css('width', '40%')
            $('.fullscreenresort').css('widht', '100%').css('margin-left', '0%')
            $('.hamburger').hide()
            $('.fullscreenmode').css('padding', '1% ')
            $('#resizable-div').css('width', '62%')
            $('#programming').removeClass('fullscreend').fadeIn()
            $('.internalscroller').css('max-height', '725px').css('overflow-y', 'auto')
            $('#legend').show()
            $('.hideinfullscreen').show()
            $('.mymobile , #pullthecode2').css('float', 'left')
            $(' #pullthecode2').css('width', '62%')
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


    /*
        document.getElementById('myCheckbox').addEventListener('change', function () {
            if (this.checked) {
                $('#cinput2').css('opacity', '1')
                $('.trev21').prepend('<h2 class="cinputval2">' + $('#cinput2').val() + '</h2>')
            } else {
                $('#cinput2').css('opacity', '0.5')
                $('.cinputval2').remove()
                loadnewcontent()
            }
        });
    */




    $(document).ready(function () {
        var mysize
        let timeout;







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
            $('.interedit').removeClass('interedit')
            my100layout = eval($(this).attr('layout'));
            $('.informationcontent').append(my100layout)
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


$('#closeembed').on('click' , function() {
    $('#mymatrix4').hide()
    $('#programming').show()
$('#resizable-div').show()
$('#firstmatrix').click()
})

    


        $('.openthematrix').on('click', function () {
            whatmatrix = '#' + $(this).attr('mymatrix')
            $('.closethematrix').hide()
            $(whatmatrix).toggle()
            $('.openthematrixopen').removeClass('openthematrixopen')
            $('.openthematrixopen2').removeClass('openthematrixopen')
            $(this).addClass('openthematrixopen')
            if(whatmatrix === '#mymatrix3') {
              loadnewcontent()
                $('.stage2 , #pullthecode2 , #mobilepreview2').hide()
            } 
            
            if(whatmatrix === '#mymatrix4') {
             $('#programming').hide()
             $('#resizable-div').hide()
            }
            
            if(whatmatrix === '#mymatrix') {
                $('.stage2 , #pullthecode2 , #mobilepreview2').show()
            }

            if(whatmatrix === '#mymatrix1') {
                $('.stage2 , #pullthecode2 , #mobilepreview2').show()
            }

            if(whatmatrix === '#mymatrix2') {
                $('.stage2 , #pullthecode2 , #mobilepreview2').show()
            }
           
        })

        


        $('#addrow1x1').on('click', function () {
            $('.interedit').removeClass('interedit')
            $('.onblock').html(
                '<div class="width100c liveelement in910 layoutpale  layoutpale100 interedit"></div>'
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





        $('#fileInput').change(function (event) {
            $('.informationcontent').css('opacity', '0.3')
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
                alert("No file selected or an error occurred.");
            }

            setTimeout(function () {

                $('.in910').on('click', function () {
                    $('.in910').removeClass('interedit')
                    $(this).addClass('interedit')
                    $('#myhtmleditor').val($(this).html())
                })

                $('.liverow').on('click', function () {
                    $('.liverow').removeClass('onblock')
                    $(this).addClass('onblock')
                })

                $(".draggable").draggable({
                    revert: "valid"
                })

                $('#selectionclear').on('click', function () {
                    $('.interedit').removeClass('interedit')
                })





                loadnewcontent()
                $('.informationcontent').css('opacity', '1')
            }, 2000);



        });





        $('#addrow2x2').on('click', function () {
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
            $('.interedit').removeClass('interedit')
            $('.onblock').html(
                '<div class="width33c liveelement in910 layoutpale layoutpale33 interedit"></div><div class="width33c liveelement in910 layoutpale layoutpale33"></div><div class="width33c liveelement in910 layoutpale layoutpale33"></div>'
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
            $('.interedit').removeClass('interedit')
            $('.onblock').html(
                '<div class="width20c liveelement in910 layoutpale layoutpale25 interedit"></div><div class="width20c liveelement in910 layoutpale layoutpale25"></div><div class="width20c liveelement in910 layoutpale layoutpale25"></div><div class="width20c liveelement in910 layoutpale layoutpale25"></div>'
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



        $('#addrowc1xc1').on('click', function () {
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


        $('#addactiverow').on('click', function () {
            $('.layoutbuilder').append(
                '<div class="width100c  layoutpale layoutpale100 liverow droppable onblock"><div class="width100c in910 layoutpale layoutpale100 interedit"></div></div>'
            )

            $('.liverow').on('click', function () {
                $('.liverow').removeClass('onblock')
                $(this).addClass('onblock')
            })



            $('.liveelement').on('click', function () {
                $('#myhtmleditor').val($(this).html())

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



                layoutmode = 1

            })

            loadnewcontent()
        })



        $('.addrow').on('click', function () {
            $('.dropsection').slideDown()
            $('.onblock').removeClass('onblock')
            $('.layoutbuilder').append(
                '<div class="width100c  layoutpale layoutpale100 liverow droppable onblock"></div>')

            $('.liverow').on('click', function () {
                $('.liverow').removeClass('onblock')
                $(this).addClass('onblock')
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

                        $('#EditandSubmitAL').on('click', function () {
                            $('.interedit').html($('#myhtmleditor').val())
                            loadnewcontent()
                        })
                        $('#myhtmleditor').val($(this).html())


                        layoutmode = 1

                    })
                    loadnewcontent()
                }
            });



        })









        var currentAnchor = null;

        /*
        $('#showmobile').on('click' , function() {
            $('.mymobile').slideDown()
            $(this).hide()
            $('#showmobile2').show()
        })


        $('#showmobile2').on('click' , function() {
            $('.mymobile').slideUp()
            $(this).hide()
            $('#showmobile').show()
        })

        */



        $('#showthepromotionalimage').on('click', function () {
            imagename01 = $(this).attr('src');

            if ($('#cinput1bpromotional').val() == '') {
                $('.imagemessage').slideDown().delay(2000).slideUp()
                return false
            } else {

                imagedata2 = '<img class="loading-lazy promoimg21 in910" data-src="' + imagename01 +
                    '" alt="' + $('#cinput1bpromotional').val() + '">'
                $('.interedit').html(imagedata2).removeClass('.interedit')
            }
            loadnewcontent()
        })



        $('.showthepreviewimage').on('click', function () {
            //var select = document.getElementById("myDropdown");
            //select.selectedIndex = $(this).attr('num');
            imageselect = $(this).attr('prefix')
            imagename00 = $('#cinput1').val()

            imageheader =
                '<div class="pd-header-tag width100c" style="margin-bottom:10px"><h3 class="t-h5-style in910" id="ocinsertcontent2369">' +
                $('#cinput1c').val() + '</h3></div>'

            if ($('#cinput1b').val() == '') {

                $('.imagemessage').slideDown().delay(2000).slideUp()
                return false
            } else {


                if ($('#cinput1c').val() == '') {
                    imagedata =
                        '<div class="width100c"><img class="loading-lazy promoimg21 in910" data-src="https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BFXM_PRD/on/demandware.static/-/Sites-pcrichard-master-product-catalog/default/images/hires/' +
                        imageselect + imagename00 + '.jpg?sw=400&sh=400&sm=fit" alt="' + $(
                            '#cinput1b').val() + '"></div>'
                } else {
                    imagedata = imageheader +
                        '<div class="width100c"><img class="loading-lazy promoimg21 in910" data-src="https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BFXM_PRD/on/demandware.static/-/Sites-pcrichard-master-product-catalog/default/images/hires/' +
                        imageselect + imagename00 + '.jpg?sw=400&sh=400&sm=fit" alt="' + $(
                            '#cinput1b').val() + '"></div>'
                }





                $('.interedit').html(imagedata).removeClass('.interedit')
                loadnewcontent()

            }



        })


        $('.layoutbuttons').on('click', function () {
            $('.layoutbuttons').css('background-color', '#333').css('color', '#fff')
            $(this).css('background-color', '#ccc').css('color', '#000')
        })


        $('#clearandrestart').on('click', function () {
            location.reload()
        })



        $('#choosehtag').on('change', function () {
            choosehtag = $(this).val()

        })


        $('#cinput1-clickh2-comp').on('click', function () {

            var min = 1000;
            var max = 9999;
            var randomFourDigit = Math.floor(Math.random() * (max - min + 1)) + min;

            if (choosehtag === '0') {
                $('.interedit').append(
                    '<div class="pd-header-tag width100c"><h2 class="t-h4-style  c-blue in910" id="ocinsertcontent' +
                    randomFourDigit + '">' + $('#cinput1h2').val() + '</h2></div>').removeClass(
                    'interedit')
            } else {
                $('.interedit').append(
                    '<div class="pd-header-tag width100c"><h3 class="t-h4-style  c-blue in910" id="ocinsertcontent' +
                    randomFourDigit + '">' + $('#cinput1h2').val() + '</h3></div>').removeClass(
                    'interedit')
            }


            loadnewcontent()
            $('#cinput1h2').val('')
        })

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

            //$('#showmobile2').show()
            //$('#showmobile').hide()




            $('a').not('.outsidelink').on('click', function (e) {
                e.preventDefault();
                currentAnchor = this; // Store the current anchor element
                wheretogo = $(this).attr('href');
                openModal('https://www.pcrichard.com' + wheretogo);
            });

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
            $('.expand').css('width', '48%')
            $('#cinput1-clickv2').hide()
            $('#myDropdown').hide()
            //  $('#showmobile2').show()
            //$('#showmobile').hide()

            $('.simplehide').show()
            $('.simpleshow').hide()

            $('.layoutop2').html($('.layoutop1').html())

            $('#mobilepreview2').show()
            $('#mobilepreview').hide()

            $('a').not('.outsidelink').on('click', function (e) {
                e.preventDefault();
                currentAnchor = this; // Store the current anchor element
                wheretogo = $(this).attr('href');
                openModal('https://www.pcrichard.com' + wheretogo);
            });


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
            var min = 1000;
            var max = 9999;
            var randomFourDigit = Math.floor(Math.random() * (max - min + 1)) + min;
            $('.interedit').append('<p>' + $('#cinput3a').val() + '</p>')
            $('#cinput3a').val('')
            layoutmode = 0
            loadnewcontent()

            $('a').not('outsidelink').on('click', function (e) {
                e.preventDefault();
                currentAnchor = this; // Store the current anchor element
                wheretogo = $(this).attr('href');
                openModal('https://www.pcrichard.com' + wheretogo);
            });


            $('.clearsection').on('click', function () {
                $('.interedit').html('')
            })


        })



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

            $('a').not('.outsidelink').on('click', function (e) {
                e.preventDefault();
                currentAnchor = this; // Store the current anchor element
                wheretogo = $(this).attr('href');
                openModal('https://www.pcrichard.com' + wheretogo);
            });

        })


$('#wraparoundselect').on('change' , function() {
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
    $('#reverseimage').hide()
   }
})


$('#wraparoundproductnumber').on('input' , function() {
    getthewraparoundnumber = $(this).val()
    $('.showthepreviewimage2').css('opacity', '1').css('pointer-events', 'all')
        $('.showthepreviewimage2').each(function () {
            previewurld2 =
                'https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BFXM_PRD/on/demandware.static/-/Sites-pcrichard-master-product-catalog/default/images/hires/'
            imageprefix2 = $(this).attr('prefix');
            $(this).attr('src', previewurld2 + imageprefix2 + $('#wraparoundproductnumber').val() + '.jpg?sw=300&sh=300&sm=fit')


            var imgs = document.getElementsByTagName('img');
for (var i = 0, j = imgs.length; i < j; i++) {
    if (imgs[i].classList.contains('showthepreviewimage2')) { // Check if the image has the specific class
        // Hide parent <div> initially until image is confirmed to load
        imgs[i].parentNode.style.display = 'none';

        imgs[i].onload = function() {
            this.parentNode.style.display = ''; // Show the parent <div> of the image
        };

        imgs[i].onerror = function(e) {
            this.parentNode.style.display = 'none'; // Hide the parent <div> of the image
        };
    }
}

        })

        $('.showthepreviewimage2').on('click' , function() {

if ($('#wraparoundalt').val() === '') {
    $('.imagemessage').slideDown().delay(2000).slideUp()
    return false
} 


if($('#reverseimage').val() === 'yes') {
    $('.interedit').html('<img style="width:45% !important" alt="'+$('#wraparoundalt').val()+'"'+'src="'+$(this).attr('src')+'"'+'/>'+'<p>'+$('#wraparoundimage').val()+'</p>')
} else {
    $('.interedit').html(' <div style="flex: 0 1 auto; max-width:45%;float: left;"><img  alt="'+$('#wraparoundalt').val()+'"'+'src="'+$(this).attr('src')+'"'+'/> </div></div>'+'<div style="align-items: flex-start;"><div style="flex: 1 1 auto" ><p>'+$('#wraparoundimage').val()+'</p></div>')
}



})

})



        $('#wraparoundsubmit').on('click', function () {
           
            wraptext = '<p >' + $('#wraparoundimage').val() + '</p>'
            wrapcatalogselect = $('#wraparoundselect').val()
            wrapimagefilename = $('#wraparoundfilename').val()
            wrapimagealt = $('#wraparoundalt').val()
        

            if(wrapcatalogselect === 'product') {
               
                wrapfullimage =
                '<img class="loading-lazy promoimg21 in910" style="width:45% !important" data-src="https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BFXM_PRD/on/demandware.static/-/Sites-pcrichard-master-product-catalog/default/images/hires/Z_'+wrapimagefilename+'.jpg?sw=400&amp;sh=400&amp;sm=fit" alt="'+wrapimagealt+'" src="#">'
                $('.interedit').html('<div class="width100c">' + wrapfullimage + wraptext + '</div>')
            }
            if(wrapcatalogselect === 'promo') {
              
                wrapfullimage =
                '<img class="loading-lazy promoimg21 in910" style="width:45% !important" data-src="https://www.pcrichard.com/on/demandware.static/-/Sites-pcrichard-master-articles-catalog/default/images/promo/'+ wrapimagefilename+'?sw=400&amp;sh=400&amp;sm=fit" alt="'+wrapimagealt+'" src="#">'
                $('.interedit').html('<div class="width100c">' + wrapfullimage + wraptext + '</div>')
            }
            
            if(wrapcatalogselect === 'blog') {
              
                wrapfullimage =
                '<img class="loading-lazy promoimg21 in910" style="width:45% !important" data-src="https://www.pcrichard.com/on/demandware.static/-/Sites-pcrichard-master-articles-catalog/default/images/blog/'+ wrapimagefilename+'?sw=400&amp;sh=400&amp;sm=fit" alt="'+wrapimagealt+'" src="#">'
                $('.interedit').html('<div class="width100c">' + wrapfullimage + wraptext + '</div>')
            }
           

            loadnewcontent()
        })



        $('#cinput2').on('input', function (e) {
            $('.cinputval2').text($(this).val())
            loadnewcontent()
        })




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

                $('#pullthecode #cinputval1').attr('src', actualimg)

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


        $('.texttype').click(function () {
            var selection = window.getSelection();
            if (!selection.rangeCount) return;
            var selectedText = selection.toString();
            var textwrapper = $(this).val();

            // Create a new HTML element with the selected text wrapped in the specified tag
            var contentwrapped = '<' + textwrapper + '>' + selectedText + '</' + textwrapper + '>';

            // Get the selected range
            var range = selection.getRangeAt(0);

            // Create a new document fragment with the wrapped content
            var fragment = range.createContextualFragment(contentwrapped);

            // Replace the selected text with the new HTML
            range.deleteContents();
            range.insertNode(fragment);

            // Update any elements you want with the modified HTML
            loadnewcontent()
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



            $('a').not('.outsidelink').on('click', function (e) {
                e.preventDefault();
                currentAnchor = this; // Store the current anchor element
                wheretogo = $(this).attr('href');
                openModal('https://www.pcrichard.com' + wheretogo);
            });


        });

        $('#closediag').on('click', function () {
            document.getElementById("myModal").style.display = "none";
            currentAnchor = null;
        });

        //--------------------


        $('.textaligner').on('click', function () {
            cssadd = $(this).attr('cssadd')
            $('.interedit p').css('text-align', cssadd);
            $('.interedit .pd-header-tag h2').css('text-align', cssadd);
            $('.interedit .pd-header-tag h3').css('text-align', cssadd);
            editorcopy = $('.interedit').html()
            $('#myhtmleditor').val(editorcopy)
            loadnewcontent()
        })

        $('#textaligner2').on('change', function () {
            var cssadd = $(this).val();

            $('.interedit p, .interedit .pd-header-tag h2, .interedit .pd-header-tag h3')
                .removeClass(
                    'addpadding0 addpadding10 addpadding20 addpadding40 addpadding60 addpadding80 addpadding100'
                )
                .addClass(cssadd);

            var editorcopy = $('.interedit').html();
            $('#myhtmleditor').val(editorcopy);
            loadnewcontent();
        });


        $('.textaligner3').on('click', function () {
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

            // Clear the selection
            // window.getSelection().removeAllRanges();
        });




        // $('#myCheckbox').click()
        $('#layout2').click()
        //  $('#addrow').click()



        $('#cinputval1').attr('src',
            'https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BFXM_PRD/on/demandware.static/-/Sites-pcrichard-master-product-catalog/default/dwf8295540/images/hires/Z_RF18A5101SR.jpg?sw=300&amp;sh=300&amp;sm=fit'
        )

    });




$('#beautycode').on('input' , function() {
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
            $('#showthepromotionalimage').attr('src',
                'https://www.pcrichard.com/on/demandware.static/-/Sites-pcrichard-master-articles-catalog/default/images' +
                $('#catalogselector').val() + desktoppictures)
        })

    });