$('.openthematrix').on('click', function () {
    $('#mymatrix1').hide()
    $('#myModalcontentviewers').hide()
    var whatmatrix = '#' + $(this).attr('mymatrix');
    switch (whatmatrix) {
        case '#mymatrix2':
        $('img.loading-lazy').each(function () {
            $(this).attr('src', $(this).attr('data-src'))
           
        })
      $('#results21aaa').hide()
        $('#mobilepreview2').hide()
        $('#mymatrix6').hide()
        $('#pullthecode2').animate({'width' : '65%'}).show().css('min-height' , $(document).height() -100).css('max-height' , $(document).height() -100)
        $('#resizable-div').hide().animate({'width' : '72%'}).show()
        $('#sidetoolset').show()
        $('.stage2 , #pullthecode2 ').show();
        $('#programming').show()
        $('#explorer2').parent('div').show()
        $('#mymatrix3').hide()
        $('#explorer2').css('max-height' ,$(document).height() /1.9)
        $('#mobilepreview2').show()
        $('#mymatrix1').hide()
        $('#explorer2').show()
        $('#mymatrix6').hide()
        $('.codechanger').show()
        break;
        case '#mymatrix4':
            var element = document.getElementById("pullthecode3");
            if (element) {
                element.style.removeProperty('width');
                element.style.removeProperty('transform');
            }
    
                $('#mymatrix4').slideDown()
                $('#codeloaderpcrview').html($('#pullthecode2').html())
                $('#programming, #resizable-div').hide();
                $('#fullembedcodeddd').show()
                $('#fullinterface').hide()
                $('#mymatrix6').hide()
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
        case '#mymatrix9':
                    $('.stage2 , #pullthecode2 , #mobilepreview2').hide();
                    $('.colorlegend').hide()
                    $('#versionList').parent('div').parent('div').hide()
                    $('#programming').hide()
                    $('#resizable-div').animate({'width' : '100%'})
                    $('#explorer2').hide()
                    $('#mymatrix9').show()
                    $('#sidetoolset').hide()
                    $('#mymatrix1').hide()
                    $('#mymatrix3').hide().removeClass('bottomclassviewers')
                    $('#mymatrix6').hide()

                    break;
        case '#mymatrix1':
           
            $('#resizable-div').animate({'width' : '71%'} , function() {
                $('#programming').show()
            })
                    $('#mymatrix6').hide()
                    $('#explorer2').hide()
                    $('#mymatrix3').removeClass('bottomclassviewers').hide()
                    $('#sidetoolset').hide()
                    $('#mymatrix1').show()
                    var element = document.getElementById("pullthecode3");
                    if (element) {
                        element.style.removeProperty('width');
                        element.style.removeProperty('transform');
                    }
            
            
                        $('.stage2 , #pullthecode2 , #mobilepreview2').hide();
                        $('.colorlegend').hide()
                        $('#hidemainmobile').hide()
                        $('#thisisthefinalcode').show()
                        $('#results21aaa').show()
                      $('.codechanger').hide()
            
                        $('img.loading-lazy').each(function () {
                            $(this).attr('src', '#')
                        })
            
            
                        $('#findthecode2').text($('#pullthecode2').html());
            
                        var divElement = document.getElementById('thisisthefinalcode');
            
            // Get the text content of the div
            var textContent = divElement.textContent || divElement.innerText;
            
            // Get the character count
            var characterCount = textContent.length;
            
                        $('#charactercount').html('Character Count ' + '<span style="color:yellow">'+characterCount+' </span>' + ' - Maximum ECP to Salesforce Characters is 16,000' )
            
                        var element = $('#findthecode2');
                        var content = element.text();
            
                        // Define the words you want to remove
                        var wordsToRemove = ['liveelement', 'in910', 'layoutpale', 'layoutpale50', 'liverow', ' ui-droppable', 'droppable',
                            'ui-droppable', 'layoutbuilder', 'sortable', 'layoutop2', 'layoutpale100',
                            'layoutpale30', 'layoutpale20', 'layoutpale33', 'onblock', 'interedit', 'edit-mode', 'explorerselected',
                            'https://staging-na01-pcrichard.demandware.net/on/demandware.static/-/Library-Sites-PCRichardSharedLibrary/default/dw0d66f82d/',
                            'promoimg21', 'ui--disabled', 'style=""', 'ui--handle ', 'ui- ui--handle','unselectable-text','experience-component', 'experience-pcrs_assets-markup',
                            'https://staging-na01-pcrichard.demandware.net', 'programoverflow', '/on/demandware.static/-/Library-Sites-PCRichardSharedLibrary/default/dw3744730c/' , 'https://www.pcrichard.com/on/demandware.static/-/Sites-pcrichard-master-articles-catalog/default/dw543ecf73'
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
                        element.text(content.replaceAll('&times;', 'x').replaceAll('&alpha;', 'a').replaceAll('&reg;', '<span class="myregd"></span>').replaceAll('&trade;', '<span class="mytraded"></span>').replaceAll('&mdash;', '-').replaceAll('&ndash;', '-').replaceAll('™', '<span class="mytraded"></span>').replaceAll('®', '<span class="myregd"></span>').replaceAll('°', '&deg;'));
            
            
            
            
                        finalcheck = $('#findthecode2').html()
                        $('#findthecode2').html(finalcheck.replaceAll('α', 'a').replaceAll('×', 'x').replaceAll('–', '-').replaceAll('’', "'").replaceAll('class="width100c     ui-', 'class="width100c').replaceAll('&times;', 'x').replaceAll('&alpha;', 'a').replaceAll('&reg;', '<span class="myregd"></span>').replaceAll('&trade;', '<span class="mytraded"></span>').replaceAll('&mdash;', '--').replaceAll('&ndash;', '-').replaceAll('™', '<span class="mytraded"></span>').replaceAll('®', '<span class="myregd"></span>').replaceAll('°', '&deg;'))
                        checkADACompliance();
                        break;
        case '#mymatrix6':
            $('#explorer2').hide()
            $('#mymatrix3').hide()
                            $('.stage2 , #pullthecode2 , #mobilepreview2').hide();
                            $('#hidemainmobile').hide()
                            $('.colorlegend').hide()
                            $('#mymatrix6').show()
                            $("#sidetoolset").hide()
                            $('#mymatrix1').hide()
                            listAllDriveFiles();
                            
                            break;
        case '#mymatrix-dark':
if(darkvalue === 0) {
    darkvalue = 1
    $('#pullthecode2').css('filter', 'invert(100%)');
} else {
    darkvalue = 0
    $('#pullthecode2').css('filter', 'invert(0%)');
}

        
        break;
        case '#mymatrix-hmobile':      
        var newHeightForExplorer = $(window).height();
        $('#mobilepreview2').hide()
        $('#mymatrix6').hide()
        $('#pullthecode2').animate({'width' : '65%'}).animate({'min-height' : $(window).height()-90+'px' })
        $('#resizable-div').animate({'width' : '72%'})
        $('#explorer2').show().animate({'max-height': newHeightForExplorer}, 400);
        $('#sidetoolset').show()
        $('.stage2 , #pullthecode2 ').show();
        $('#programming').show()
        $('#explorer2').parent('div').show()
        $('#mymatrix3').hide()
        break;
        case '#mymatrix3':

            var html = $('#pullthecode3').html()
            var beautifiedHtml = beautifyHtml(html);
            $('#beautycode').val(beautifiedHtml)
            $('#mymatrix3').css('max-height' , $(window).height()-70+'px').removeClass('bottomclassviewers').css('width' , '44%').css('position' , 'relative')
            $('#pullthecode2').css('max-height' , $(window).height()-80+'px')
            $('#mymatrix3').css('height' , $(window).height()-70+'px').css('margin-top' , '0%')
            $('#pullthecode2').css('height' , $(window).height()-80+'px')
            $('#mymatrix6').hide()
            $('#programming').hide()
            $('#sidetoolset').hide()
            $('#mymatrix2').hide()
            $('#mobilepreview2').parent('div').hide()
            $('#resizable-div').delay(600).animate({'width' : '100%'})
            $('#pullthecode2').hide().animate({'width' : '53%'}).fadeIn()
            $('#beautycode').animate({'height' : $('#pullthecode2').height()-60})
            
            $('#mymatrix3').hide().animate({'width' : '44%'}).fadeIn()
            $('#beautycode').animate({'min-height' : $(document).height() - 145}).animate({'max-height' : $(document).height() - 145})
            break;

            case '#mymatrix-codeview':
            $('#box2u').click()

          

            // Perform animations and show elements after completion
            $("#pullthecode2, #resizable-div, #beautycode").hide();
$('#mobilepreview2').show()
            $.when(
                $("#pullthecode2").animate({'max-height': $(window).height() / 2.32}, 0)
                                 .animate({'min-height': $(window).height() / 2.32}, 0),
                $('#resizable-div').animate({'max-height': $(window).height() - 20}, 0)
                                  .animate({'min-height': $(window).height() - 20}, 0),
                $('#beautycode').animate({'max-height': $(window).height() / 2.83}, 0)
                                .animate({'min-height': $(window).height() / 2.83}, 0)
            ).done(function() {
                // Show all elements after all animations are complete
                $("#pullthecode2, #resizable-div, #beautycode").show();
            });

            $('#explorer2').animate({'max-height' : $(window).height() / 1.85})
            $('#beautycode').animate({'width' : '90%'}).animate({'margin-left' : '5%'})
            break;
        case '#mymatrix-review':
            $('#sidetoolset').hide()
           // $("#pullthecode2").resizable({
          //      minWidth: 1024
           // });
            $("#pullthecode2").animate({
                'max-height': '400'
            })
            $("#pullthecode2").animate({
                'min-height': '400'
            })
            $('#resizable-div').animate({'max-height' : '50%'})
            $("#mymatrix3").animate({
                'width': '100%' , 'max-height' : '200px'
            }).css('margin-top' , '0%')

            $("#beautycode").animate({
               'max-height' : '200px'
            })

            $("#beautycode").animate({
                'width' : '93%'
             })


             $("#beautycode").animate({
                'margin-left' : '.5%'
             })

            $('#mymatrix3').fadeIn()


$('#pullthecode2').animate({'width' : '94%'})
$('#resizable-div').animate({'width' : '98%'})
$('#resizable-div').animate({'min-height' : $(window).height() / 1.8})
$('#mobilepreview2').parent('div').hide()
$('#programming').hide()

            break;
        case '#mymatrix7':
            $('#outslidepluginsout').attr('src', 'help.html')
            $('#pluginsandtools').click()
            break;

               $('#myModalcontentviewers').click()
                 //$('#firstmatrix').click()
                 $('#pullthecode2').css('filter', 'invert(0%)').css('width' , '65%').css('min-height' , '650px');
                 $('#sidetoolset').show()
                 $('#explorer2').show().animate({'max-height' : '540px'})
                 $('#mobilepreview2').show().parent('div').show()
                 $('#mymatrix3').hide()
                 $('#programming').show()
                 $('#resizable-div').animate({'width' : '72%'})
                 $('#matrix3').hide()
                break;
                        } 
})