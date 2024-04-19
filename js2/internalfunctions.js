$('.createlayoutslider').on('click', function () {
    var addmutiplerows = parseInt(document.getElementById('sliderValuerow').textContent);
    var whatwidthisit = $('#selectwidthrow').val()
    var whatmobilewith = $('#selectwidthrow').find('option:selected').attr('value2');

    var mycount = 0; // Initialize `mycount` before the loop
    while (mycount < addmutiplerows) { // Corrected variable name here
        $('.informationcontent').append(
            '<div class="width' + whatwidthisit + 'c ' + whatmobilewith + ' layoutpale layoutpale' + whatwidthisit + ' liverow droppable ui-droppable"><div class="width100c liveelement in910 layoutpale layoutpale100"></div></div>'
        );
        mycount++; // Increment `mycount` to eventually meet the loop's exit condition
    }

    enabledrop()
    runexplorer()
    $('#mobilepreview2').html($('#pullthecode2').html());
});

$('.createcomponentslider').on('click', function () {

    var addmutiplecomps = parseInt(document.getElementById('sliderValuecomp1').textContent);
    var whatwidthisit = $('#selectwidthcomp').val()

    var mycount = 0;
   
    while (mycount < addmutiplecomps) { // Corrected variable name here
        $('.explorerselected').append(
            '<div class="width' + whatwidthisit + 'c liveelement in910 layoutpale layoutpale' + whatwidthisit + '"></div>'
        );
        mycount++; // Increment `mycount` to eventually meet the loop's exit condition
    }

    runexplorer()
    $('#mobilepreview2').html($('#pullthecode2').html());
})



$('#addrow').on('click', function () {
    $('.onblock').removeClass('onblock');
    $('.internalbuttons').slideDown()
    $('.layoutbuilder').append(
        '<div class="width100c  layoutpale layoutpale100 liverow droppable onblock"></div>')
   $('#mobilepreview2').html($('#pullthecode2').html());
    enabledrop()
    runexplorer();
    })


$('.addrow').on('click', function () {
    var layout = $(this).data('layout').split(','); // Get layout configuration from data attribute
    var html = '<div class="width100c">';

    // Dynamically create the columns based on the layout configuration
    layout.forEach(function (size, index) {
        var onblock = index === 0 ? 'onblock' : ''; // Add 'onblock' class to the first element
        html += `<div class="width${size}c layoutpale layoutpale${size} liverow droppable ${onblock}"></div>`;
    });

    html += '</div>';

    // Perform common actions

    $('.onblock').removeClass('onblock');
    $('.layoutbuilder').append(html);
    $('#mobilepreview2').html($('#pullthecode2').html());
    enabledrop()
    runexplorer();
});


$('#addrowc1xc1').on('click', function () {

    $('.informationcontent').append(
        '<div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width100c liveelement in910 layoutpale layoutpale100 "></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div></div>'
    );


    $('#mobilepreview2').html($('#pullthecode2').html());
    enabledrop()
    runexplorer();
    
})

$('#addrowcxc').on('click', function () {

    $('.informationcontent').append(
        '<div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable onblock"><div class="width100c liveelement in910 layoutpale layoutpale100 "></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div><div class="width50c width50c2 liveelement in910 layoutpale layoutpale50"></div></div>'
    );
    $('#mobilepreview2').html($('#pullthecode2').html());
    enabledrop()
    runexplorer();
   
})

$('#addrowc2xc8').on('click', function () {

    $('.informationcontent').append(
        '<div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable onblock"><div class="width100c liveelement in910 layoutpale layoutpale100"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width20c width50c2 liveelement in910 layoutpale layoutpale20"></div><div class="width80c width50c2 liveelement in910 layoutpale layoutpale25"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width80c width50c2 liveelement in910 layoutpale layoutpale25"></div><div class="width20c width50c2 liveelement in910 layoutpale layoutpale20"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width20c width50c2 liveelement in910 layoutpale layoutpale20"></div><div class="width80c width50c2 liveelement in910 layoutpale layoutpale25"></div></div>'
    );
    $('#mobilepreview2').html($('#pullthecode2').html());
    enabledrop()
    runexplorer();
 
})

$('#addrowc4xc6').on('click', function () {

    $('.informationcontent').append(
        '<div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable onblock"><div class="width100c liveelement in910 layoutpale layoutpale100 "></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width40c width50c2 liveelement in910 layoutpale layoutpale40"></div><div class="width60c width50c2 liveelement in910 layoutpale layoutpale60"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width40c width50c2 liveelement in910 layoutpale layoutpale40"></div><div class="width60c width50c2 liveelement in910 layoutpale layoutpale60"></div></div><div class="width100c layoutpale layoutpale100 liverow droppable ui-droppable"><div class="width40c width50c2 liveelement in910 layoutpale layoutpale40"></div><div class="width60c width50c2 liveelement in910 layoutpale layoutpale60"></div></div>'
    );

    $('#mobilepreview2').html($('#pullthecode2').html());
    enabledrop()
    runexplorer();
    
})

//------------------------------------------------------------------------------------------------------------------

$('#addrow1x1 , #addrow1x1a').on('click', function () {
    $('.interedit').removeClass('interedit') 
    $('.onblock').html(
        '<div class="width100c liveelement in910 layoutpale  layoutpale100"></div>'
    );

    $('#mobilepreview2').html($('#pullthecode2').html());
    enabledrop()
    runexplorer();

})

$('#addrow2x2').on('click', function () {
    $('.interedit').removeClass('interedit')
    $('.onblock').html(
        '<div class="width50c  width50c2 liveelement in910 layoutpale layoutpale50 interedit"></div><div class="width50c  width50c2 liveelement in910 layoutpale  layoutpale50"></div>'
    );

    $('#mobilepreview2').html($('#pullthecode2').html());
    enabledrop()
    runexplorer();
})

$('#addrow2x8').on('click', function () {
    $('.interedit').removeClass('interedit')
    $('.onblock').html(
        '<div class="width20c width50c2 liveelement in910 layoutpale layoutpale20 interedit"></div><div class="width80c width50c2 liveelement in910 layoutpale layoutpale25"></div>'
    );
    $('#mobilepreview2').html($('#pullthecode2').html());
    enabledrop()
    runexplorer();
})

$('#addrow4x6').on('click', function () {
    $('.interedit').removeClass('interedit')
    $('.onblock').html(
        '<div class="width40c width50c2 liveelement in910 layoutpale layoutpale40"></div><div class="width60c width50c2  liveelement in910 layoutpale interedit layoutpale60"></div>'
    );
    $('#mobilepreview2').html($('#pullthecode2').html());
    enabledrop()
    runexplorer();
})


$('#addrow4x6a').on('click', function () {
    $('.interedit').removeClass('interedit')
    $('.onblock').html(
        '<div class="width60c width50c2  liveelement in910 layoutpale interedit layoutpale60"></div><div class="width40c width50c2 liveelement in910 layoutpale layoutpale40"></div>'
    );
    $('#mobilepreview2').html($('#pullthecode2').html());
    enabledrop()
    runexplorer();
   
})


$('#addrow2x7').on('click', function () {
    $('.interedit').removeClass('interedit')
    $('.onblock').html(
        '<div class="width25c width50c2 liveelement in910 layoutpale layoutpale25 interedit"></div><div class="width75c width50c2 liveelement in910 layoutpale layoutpale75"></div>'
    );
    $('#mobilepreview2').html($('#pullthecode2').html());
    enabledrop()
    runexplorer();

})

$('#addrow3x3').on('click', function () {
    $('.interedit').removeClass('interedit')
    $('.onblock').html(
        '<div class="width33c width50c2 liveelement in910 layoutpale layoutpale33 interedit"></div><div class="width33c width50c2 liveelement in910 layoutpale layoutpale33"></div><div class="width33c width50c2 liveelement in910 layoutpale layoutpale33"></div>'
    );

    $('#mobilepreview2').html($('#pullthecode2').html());
    enabledrop()
    runexplorer();


})


$('#addrow4x4').on('click', function () {
 
    $('.interedit').removeClass('interedit')
    $('.onblock').html(
        '<div class="width20c width50c3 liveelement in910 layoutpale layoutpale25  interedit"></div><div class="width20c width50c3 liveelement in910 layoutpale layoutpale25"></div><div class="width20c width50c3 liveelement in910 layoutpale layoutpale25"></div><div class="width20c width50c3 liveelement in910 layoutpale layoutpale25"></div>'
    );
    $('#mobilepreview2').html($('#pullthecode2').html());
    enabledrop()
    runexplorer();

})

//----------------------


$('.addrow-click').on('click' , function() {
    $('.addrow100').click()
})


