// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function captureState() {
    const currentState = $('#pullthecode2').html();
    undoStack.push(currentState);
    redoStack = [];
}

const debouncedCaptureState = debounce(captureState, 500);

// Main logic
$(document).ready(function () {
    const $explorerContainer = $('#pullthecode2');
    const $mobilePreview = $('#mobilepreview2');
    const $pullTheCode = $('#pullthecode2');
    const desktopHideCheckbox = $('#desktophidev2d');
    const mobileHideCheckbox = $('#mobilehidev2d');
    const debouncedUpdateMobilePreview = debounce(updateMobilePreview, 500);
    let lastSelectedElement = null;
    let isShiftPressed = false;

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Shift') {
            isShiftPressed = true;
        }
    });

    document.addEventListener('keyup', function (event) {
        if (event.key === 'Shift') {
            isShiftPressed = false;
        }
    });

    function selectAndHighlightElement(element, scrollElement = false) {
        const $pullthecode2 = $('#pullthecode2');
        const $element = $(element);

        if (!$element.length || !$pullthecode2.find($element).length) {
            return;
        }

        clearSelection();

        if (isShiftPressed) {
            $element.addClass('explorerselected multiselected');
        } else {
            $('.explorerselected, .onblock, .interedit').removeClass('explorerselected onblock interedit');
            $('.multiselected').removeClass('multiselected');
            $element.addClass('explorerselected');
        }

        if (!$element.hasClass('liveelement')) {
            $element.addClass('onblock');
        } else {
            $element.addClass('interedit');
        }

        if ($(element.explorerIndent).attr('data-tag') === 'A') {
            $('.indentselected').removeClass('indentselected');
            $(element.explorerIndent).addClass('indentselected');
            return false;
        }

        $element.click();
        $('#contextMenu').hide();
        $('#myhtmleditor').val($element.html());

        if (element.explorerIndent) {
            $('.indentselected').removeClass('indent indentselected');
            $(element.explorerIndent).addClass('indentselected').get(0).scrollIntoView({
                behavior: 'auto', block: 'nearest', inline: 'start'
            });
        }

        if (scrollElement) {
            $element.get(0).scrollIntoView({
                behavior: 'auto', block: 'nearest', inline: 'start'
            });
        }

        window.lastSelectedElement = element;

        if ($('#mobilehidev2d').is(':visible')) {
            desktopHideCheckbox.prop('checked', $element.hasClass('hideonlyondesktop'));
            mobileHideCheckbox.prop('checked', $element.hasClass('hideonlyonmobile'));
        }
    }

    function clearSelection() {
        if (lastSelectedElement) {
            lastSelectedElement.classList.remove('explorerselected');
            if (lastSelectedElement.explorerIndent) {
                lastSelectedElement.explorerIndent.classList.remove('indentselected');
            }
        }
    }

    const runExplorerDebounced = debounce(function () {
        $('#explorer2').empty();
        const target = document.getElementById('pullthecode3');
        const explorer = document.getElementById('explorer2');

        const excludedClasses = [
            'informationcontent', 'layoutbuilder', 'sortable', 'layoutop2', 'experience-component',
            'experience-pcrs_assets-markup', 'liveelement', 'in910', 'layoutpale', 'layoutpale33',
            'layoutpale20', 'layoutpale25', 'layoutpale40', 'layoutpale50', 'layoutpale75',
            'layoutpale60', 'layoutpale80', 'layoutpale100', 'ui-sortable', 'ui-sortable-disabled',
            'liverow', 'droppable', 'ui-droppable', 'loading-lazy', 'promoimg21', 'ui-sortable-handle',
            'interedit', 'onblock', 'width50c2', 'width50c3', 'timekeeper', 'timekeeper21', 'unselectable-text', 'edit-mode'
        ];

        function exploreElements(element, depth = 0, parentContainer = explorer) {
            if (!element) {
                console.error('Invalid element provided to exploreElements');
                return;
            }

            let elements = element.children;
            if (!elements || elements.length === 0) {
                console.info('No children found for element:', element);
                return;
            }

            for (let i = 0; i < elements.length; i++) {
                let tagLabel = elements[i].tagName;
                let specialLabel = getSpecialLabel(elements[i]);
                let labelColor = getColorForTag(tagLabel, elements[i]);
                let classDisplay = getClassDisplay(elements[i]);
                let linkDetails = '';

                if (elements[i].tagName.toLowerCase() === 'a' && elements[i].hasAttribute('href')) {
                    let linkedText = elements[i].textContent.trim();
                    let hrefAttribute = elements[i].getAttribute('href');
                    linkDetails = ` <span style="color: #fff;">("${linkedText}") - href: = <span style="color:yellow">${hrefAttribute}</span></span>`;
                }

                const details = document.createElement('div');
                details.className = 'indent';
                details.style.marginLeft = `${depth * 20}px`;
                details.setAttribute('data-tag', specialLabel || tagLabel);
                details.innerHTML = `<strong style="color: ${labelColor};">${specialLabel || tagLabel}</strong>${classDisplay}${linkDetails}`;
                parentContainer.appendChild(details);
                $(details).data('linkedElement', elements[i]);
                elements[i].explorerIndent = details;

                details.addEventListener('click', function () {
                    selectAndHighlightElement(elements[i]);
                });

                elements[i].addEventListener('click', function (event) {
                    event.stopPropagation();
                    selectAndHighlightElement(elements[i], true);
                });

                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        mutation.removedNodes.forEach((removedNode) => {
                            if (removedNode === elements[i] && elements[i].explorerIndent) {
                                elements[i].explorerIndent.remove();
                                observer.disconnect();
                            }
                        });
                    });
                });

                observer.observe(element, { childList: true, subtree: false });

                if (elements[i].children.length > 0) {
                    exploreElements(elements[i], depth + 1, parentContainer);
                }
            }
        }

        function getSpecialLabel(element) {
            if (element.classList.contains('liveelement')) {
                return 'COMPONENT';
            } else if (element.classList.contains('timekeeper')) {
                return 'TIMEKEEPER ROW';
            } else if (element.classList.contains('timekeeper21')) {
                return 'SCRIPT FOR DATES';
            } else if (element.classList.contains('liverow')) {
                return 'ROW';
            } else if (element.classList.contains('customspacer')) {
                return 'SPACER';
            }
            return null;
        }

        function getColorForTag(tag, element) {
            if (element.classList.contains('liverow')) {
                return '#007bff';
            } else if (element.classList.contains('liveelement')) {
                return '#ffc107';
            } else if (element.classList.contains('customspacer')) {
                return '#9c27b0';
            }
            return '#28a745';
        }

        function getClassDisplay(element) {
            let classesArray = Array.from(element.classList).filter(cls => !excludedClasses.includes(cls));
            return classesArray.length > 0 ? `<span style="font-size: smaller;"> (${classesArray.join(' ')})</span>` : '';
        }

        exploreElements(target);
    }, 250);

    const target = document.getElementById('pullthecode2');
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.removedNodes.forEach((removedNode) => {
                if (removedNode.nodeType === Node.ELEMENT_NODE) {
                    if (removedNode.explorerIndent) {
                        removedNode.explorerIndent.remove();
                    }
                }
            });
        });
    });

    observer.observe(target, { childList: true, subtree: true });

    function deleteElement() {
        $('.deleterow').off('click').on('click', function () {
            debouncedCaptureState();
            const elementsToDelete = document.querySelectorAll('.explorerselected');
            elementsToDelete.forEach(element => {
                element.classList.add('delete-transition');
            });

            setTimeout(() => {
                elementsToDelete.forEach(element => {
                    if (element && element.parentNode) {
                        element.parentNode.removeChild(element);
                    }
                });
                debouncedUpdateMobilePreview();
            }, 500);
        });
    }

    function liverowactivy() {
        $explorerContainer.on('click', '.liverow', function () {
            $('.onblock').removeClass('onblock');
            $(this).addClass('onblock');
            $('#desktophidev2d').prop('checked', $(this).hasClass('hideonlyondesktop'));
            $('#mobilehidev2d').prop('checked', $(this).hasClass('hideonlyonmobile'));
        });
    }

    $('#EditandSubmitAL').off('click').on('click', function () {
        $('.explorerselected').html($('#myhtmleditor').val());
        debouncedUpdateMobilePreview();
    });

    $(".draggable").off('draggable').draggable({
        revert: "valid",
        start: function () {
            $('#pullthecode2').css('opacity', '0.7');
        },
        stop: function () {
            $('#pullthecode2').css('opacity', '1');
        }
    });

    function releaseMemory() {
        if (window.intervalId) clearInterval(window.intervalId);
        if (window.timeoutId) clearTimeout(window.timeoutId);
        if (Array.isArray(window.largeArray)) window.largeArray.length = 0;
        if (typeof window.largeObject === 'object') {
            Object.keys(window.largeObject).forEach(key => delete window.largeObject[key]);
        }
    }

    function enabledrop() {
        $(".droppable").off('droppable').droppable({
            drop: function (event, ui) {
                const mysize = $(ui.draggable).attr('size');
                const mypale = $(ui.draggable).attr('pale');

                $('.interedit').removeClass('interedit');
                if (mysize !== undefined && mysize !== "") {
                    $(this).append('<div class="' + mysize + ' in910 layoutpale interedit layoutpale' + mypale + '"></div>');
                }
                debouncedUpdateMobilePreview();
                releaseMemory();
            }
        });
    }

    function updateMobilePreview() {
        $mobilePreview.html($pullTheCode.html());
    }

    function beautifyHtml(html) {
        const tab = '\t';
        let result = '';
        let indent = '';

        html.split(/>\s*</).forEach(function (element) {
            if (element.match(/^\/\w/)) {
                indent = indent.substring(tab.length);
            }

            result += indent + '<' + element + '>\n';

            if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("input")) {
                indent += tab;
            }
        });

        return result.substring(1, result.length - 3);
    }

    $('#beautycode').val(beautifyHtml($('#pullthecode3').html()));

    function setImportantStyle(element, property, value) {
        element.each(function () {
            this.style.setProperty(property, value, 'important');
        });
    }

    // Initialize functions
    liverowactivy();
    deleteElement();

    // Main observer for changes
    function main() {
        const observerCallback = function (mutationsList) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList' || mutation.type === 'subtree') {
                    runExplorerDebounced();
                    break;
                }
            }
        };

        const observerConfig = { childList: true, subtree: true };
        const observer = new MutationObserver(observerCallback);
        observer.observe(document.querySelector('#pullthecode2'), observerConfig);
    }

    main();

    // Event Listeners
    $('.openclose').on('click', function () {
        const opendropdown = '.' + $(this).attr('openclose');
        $('.toolboxlayoutoptions, .tools').not(opendropdown).hide();

        if ($(opendropdown).is(':visible')) {
            $(opendropdown).slideUp();
            $(this).find('.myindicator').html('+');
        } else {
            $(opendropdown).slideDown();
            $(this).find('.myindicator').html('-');
        }
    });

    $('.thetopbox').on('click', function () {
        const whichboxtoopen = $(this).attr('whatbox');
        $('.thetopbox').css('background-color', 'transparent').css('color', '#f7f7f7');
        $(this).css('background-color', '#191818').css('color', '#fff');

        switch (whichboxtoopen) {
            case 'Tools':
                $('#myhtmleditor').show();
                $('.internalscroller').show();
                $('.toolboxhide').show();
                $('.toolboxlayoutoptions').hide();
                $('#Importer').hide();
                $('.htmlimporter').hide();
                $('.myrowbuilder21').hide();
                $('.myrowbuilder').hide();
                $('#layoutbuilder-oc2').hide();
                $('#layoutbuilder-oc').hide();
                $('.layoutbuilder-oc').hide();
                $('.blogbuilder').hide();
                $('#explorerpanel').hide();
                break;
            case 'Rows':
                $('#layoutbuilder-oc2').css('display', 'none');
                $('#myhtmleditor').show();
                $('.internalscroller').show();
                $('.titlebuilder-oc').hide();
                $('.imagebuilder').hide();
                $('.videocomponent').hide();
                $('.mylinkbuilder').hide();
                $('.openclose').hide();
                $('.toolboxhide').show();
                $('.toolboxlayoutoptions').hide();
                $('.layoutbuilder-oc').hide();
                $('.myrowbuilder').slideDown();
                $('#Importer').hide();
                $('.htmlimporter').hide();
                $('.blogbuilder').hide();
                $('#explorerpanel').hide();
                break;
            case 'Import':
                $('.layoutbuilder-oc').hide();
                $('.mylinkbuilder').hide();
                $('.myrowbuilder').hide();
                $('.toolboxlayoutoptions').hide();
                $('#layoutbuilder-oc2').css('display', 'none');
                $('.titlebuilder-oc').hide();
                $('#Importer').show();
                $('#Importer').click();
                $('.blogbuilder').hide();
                $('#explorerpanel').hide();
                $('#layoutbuilder-oc').hide();
                $('.codechanger').show();
                break;
            case 'Layout':
                $('#layoutbuilder-oc2').css('display', 'block');
                $('#myhtmleditor').hide();
                $('.internalscroller').hide();
                $('.toolboxhide').hide();
                $('.toolboxlayoutoptions').show();
                $('.layoutbuilder-oc').show();
                $('#layoutbuilder-oc').show();
                $('#Importer').hide();
                $('.htmlimporter').hide();
                $('.blogbuilder').hide();
                $('#explorerpanel').hide();
                break;
            case 'Blog':
                $('#layoutbuilder-oc2').css('display', 'none');
                $('#myhtmleditor').hide();
                $('.internalscroller').hide();
                $('.toolboxhide').hide();
                $('.toolboxlayoutoptions').hide();
                $('#Importer').hide();
                $('.htmlimporter').hide();
                $('.layoutbuilder-oc').hide();
                $('.blogbuilder').show();
                $('#layoutbuilder-oc').hide();
                $('#explorerpanel').hide();
                break;
            case 'FileExplorer':
                $('#layoutbuilder-oc2').css('display', 'none');
                $('.internalscroller').hide();
                $('.toolboxhide').hide();
                $('.toolboxlayoutoptions').hide();
                $('#Importer').hide();
                $('.htmlimporter').hide();
                $('.layoutbuilder-oc').hide();
                $('#layoutbuilder-oc').hide();
                $('#explorerpanel').show();
                $('#myhtmleditor').show();
                $('.toolboxhide').show();
                break;
        }
    });

    $('.openthematrix').on('click', function () {
        $('#results21aaa').hide();
        $('#sidetoolset').hide();
        $('#explorer2').hide();
        const whatmatrix = '#' + $(this).attr('mymatrix');
        $('.closethematrix').hide();
        $(whatmatrix).toggle();
        $('.openthematrixopen').removeClass('openthematrixopen');
        $(this).addClass('openthematrixopen');
        $('.colorlegend').hide();

        switch (whatmatrix) {
            case '#mymatrix1':
                const element = document.getElementById("pullthecode3");
                if (element) {
                    element.style.removeProperty('width');
                    element.style.removeProperty('transform');
                }
                $('.stage2 , #pullthecode2 , #mobilepreview2').hide();
                $('.colorlegend').hide();
                $('#hidemainmobile').hide();
                $('#thisisthefinalcode').show();
                $('#results21aaa').show();
                $('.codechanger').hide();
                $('img.loading-lazy').each(function () {
                    $(this).attr('src', '#');
                });
                $('#findthecode2').text($('#pullthecode2').html());
                const divElement = document.getElementById('thisisthefinalcode');
                const textContent = divElement.textContent || divElement.innerText;
                const characterCount = textContent.length;
                $('#charactercount').html('Character Count ' + '<span style="color:yellow">' + characterCount + ' </span>' + ' - Maximum ECP to Salesforce Characters is 16,000');
                const element2 = $('#findthecode2');
                let content = element2.text();
                const wordsToRemove = ['liveelement', 'in910', 'layoutpale', 'layoutpale50', 'liverow', ' ui-droppable', 'droppable',
                    'ui-droppable', 'layoutbuilder', 'sortable', 'layoutop2', 'layoutpale100',
                    'layoutpale30', 'layoutpale20', 'layoutpale33', 'onblock', 'interedit', 'edit-mode', 'explorerselected',
                    'https://staging-na01-pcrichard.demandware.net/on/demandware.static/-/Library-Sites-PCRichardSharedLibrary/default/dw0d66f82d/',
                    'promoimg21', 'ui--disabled', 'style=""', 'ui--handle ', 'ui- ui--handle', 'unselectable-text',
                    'https://staging-na01-pcrichard.demandware.net', 'programoverflow', '/on/demandware.static/-/Library-Sites-PCRichardSharedLibrary/default/dw3744730c/'
                ];
                wordsToRemove.forEach(function (word) {
                    let pattern;
                    if (word.startsWith('ui-')) {
                        pattern = new RegExp('(?:^|\\s)' + word + '(?=\\s|$)', 'g');
                    } else {
                        pattern = new RegExp('\\b' + word + '\\b', 'g');
                    }
                    content = content.replace(pattern, '');
                });
                element2.text(content.replaceAll('&times;', 'x').replaceAll('&alpha;', 'a').replaceAll('&reg;', '<span class="myregd"></span>').replaceAll('&trade;', '<span class="mytraded"></span>').replaceAll('&mdash;', '-').replaceAll('&ndash;', '-').replaceAll('™', '<span class="mytraded"></span>').replaceAll('®', '<span class="myregd"></span>').replaceAll('°', '&deg;'));
                finalcheck = $('#findthecode2').html();
                $('#findthecode2').html(finalcheck.replaceAll('α', 'a').replaceAll('×', 'x').replaceAll('–', '-').replaceAll('’', "'").replaceAll('class="width100c     ui-', 'class="width100c').replaceAll('&times;', 'x').replaceAll('&alpha;', 'a').replaceAll('&reg;', '<span class="myregd"></span>').replaceAll('&trade;', '<span class="mytraded"></span>').replaceAll('&mdash;', '--').replaceAll('&ndash;', '-').replaceAll('™', '<span class="mytraded"></span>').replaceAll('®', '<span class="myregd"></span>').replaceAll('°', '&deg;'));
                checkADACompliance();
                break;
            case '#mymatrix2':
                $('img.loading-lazy').each(function () {
                    $(this).attr('src', $(this).attr('data-src'));
                });
                $('#sidetoolset').show();
                $('.stage2 , #pullthecode2 , #mobilepreview2').show();
                $('.colorlegend').hide();
                $('#hidemainmobile').show();
                $('#explorer2').show();
                $('#clearandrestartbuttonrefresh').click();
                $('#results21aaa').hide();
                break;
            case '#mymatrix3':
                $('#pullthecode2').show();
                $('#pullthecode2').animate({ 'max-height': '440px' });
                $('#sidetoolset').show();
                const html = $('#pullthecode3').html();
                const beautifiedHtml = beautifyHtml(html);
                $('#beautycode').val(beautifiedHtml);
                $('#programming').fadeIn();
                $('#mobilepreview2').parent('div').hide();
                $('#pullthecode2').animate({ 'width': '93%' });
                $('#resizable-div').animate({ 'width': '72%' });
                break;
            case '#mymatrix4':
                const element4 = document.getElementById("pullthecode3");
                if (element4) {
                    element4.style.removeProperty('width');
                    element4.style.removeProperty('transform');
                }
                $('#codeloaderpcrview').html($('#pullthecode2').html());
                $('#programming, #resizable-div').hide();
                $('#fullembedcodeddd').show();
                $('#fullinterface').hide();
                $('body').css('background-color', '#333');
                $('#codeloaderpcrview .readmoreclampdbutton').on('click', function () {
                    $(this).prev('p.clampclassd').toggleClass('expanded');
                });
                $('.readmoreclampdbutton').on('click', function () {
                    const currentText = $(this).text();
                    $('#' + ptagid).toggleClass("expanded");
                    if (currentText === "Read More") {
                        $(this).text('Read Less');
                    } else {
                        $(this).text('Read More');
                    }
                });
                if (whatcheckingsizeview === 2) {
                    $('#pcrmobileview').click();
                }
                break;
            case '#mymatrix5':
                $('.stage2 , #pullthecode2 , #mobilepreview2').hide();
                break;
            case '#mymatrix6':
                $('.stage2 , #pullthecode2 , #mobilepreview2').hide();
                $('#hidemainmobile').hide();
                $('.colorlegend').hide();
                listAllDriveFiles();
                break;
            case '#mymatrix-dark':
                $('#sidetoolset, #explorer2').show();
                $('#pullthecode2').css('filter', 'invert(100%)');
                $('.stage2 , #pullthecode2 , #mobilepreview2').show();
                const newHeightForExplorer = $(window).height() - 530;
                $('#explorer2').animate({ 'max-height': newHeightForExplorer }, 400);
                break;
            case '#mymatrix-review':
                $("#pullthecode2").resizable({
                    minWidth: 1024
                });
                $("#pullthecode2").animate({
                    'max-height': '900'
                });
                $('#mymatrix3').fadeIn();
                $('#pullthecode2').animate({ 'width': '94%' });
                $('#resizable-div').animate({ 'width': '100%' });
                $('#mobilepreview2').parent('div').hide();
                $('#programming').hide();
                break;
            case '#mymatrix-hmobile':
                const newHeightForExplorer2 = $(window).height();
                $('#mobilepreview2').hide();
                $('#pullthecode2').animate({ 'width': '65%' });
                $('#resizable-div').animate({ 'width': '72%' });
                $('#explorer2').show().animate({ 'max-height': newHeightForExplorer2 }, 400);
                $('#sidetoolset').show();
                $('.stage2 , #pullthecode2 ').show();
                $('#programming').show();
                $('#explorer2').parent('div').show();
                break;
            case '#mymatrix7':
                $('#outslidepluginsout').attr('src', 'help.html');
                $('#pluginsandtools').click();
                break;
            case '#mymatrix9':
                $('.stage2 , #pullthecode2 , #mobilepreview2').hide();
                $('.colorlegend').hide();
                $('#versionList').parent('div').parent('div').hide();
                $('#programming').hide();
                $('#resizable-div').animate({ 'width': '100%' });
                break;
        }

        $('.openthematrixopen').on('click', function () {
            $('#firstmatrix').click();
        });
    });

    $('#showversioningmodal').on('click', function () {
        $('#versioningmodalshow').show();
    });

    $('#CloseVersionModal').on('click', function () {
        $('#versioningmodalshow').fadeOut();
    });

    $('#pcrdesktopview').on('click', function () {
        whatcheckingsizeview = 0;
        $("#fullembedcodeddd2").animate({
            'width': '1024px'
        });
        $('#fullembedcodeddd').css('max-width', 'none').css('margin-left', '0%');
        $('.morebutt').not('#closeembed').css('background-color', '#fff').css('color', '#333');
        $(this).css('background-color', '#333').css('color', '#fff');
        $('body').css('background-color', '#333');
        $('#codeloaderpcrview').find('.makeit100now').each(function () {
            $(this).removeClass('makeit100now');
        });
        $('#codeloaderpcrview').find('.makeit50now').each(function () {
            $(this).removeClass('makeit50now');
        });
        $('#codeloaderpcrview').find('.hideonlyonmobile').each(function () {
            $(this).show();
        });
        $('#codeloaderpcrview').find('.hideonlyondesktop').each(function () {
            $(this).hide();
        });
        $("#fullembedcodeddd2").resizable({
            minWidth: 1024
        });
        $("#fullembedcodeddd2").animate({
            'max-height': '900'
        });
    });

    $('#pcrtabletview').on('click', function () {
        whatcheckingsizeview = 1;
        $("#fullembedcodeddd2").animate({
            'width': '768px'
        });
        $('#fullembedcodeddd').css('max-width', '769px').css('margin-left', '6%');
        $('.morebutt').not('#closeembed').css('background-color', '#fff').css('color', '#333');
        $(this).css('background-color', '#333').css('color', '#fff');
        $('body').css('background-color', '#333');
        $('#codeloaderpcrview').find('.makeit100now').each(function () {
            $(this).removeClass('makeit100now');
        });
        $('#codeloaderpcrview').find('.makeit50now').each(function () {
            $(this).removeClass('makeit50now');
        });
        $('#codeloaderpcrview').find('.hideonlyonmobile').each(function () {
            $(this).show();
        });
        $('#codeloaderpcrview').find('.hideonlyondesktop').each(function () {
            $(this).hide();
        });
        $("#fullembedcodeddd2").resizable({
            minWidth: 768
        });
        $("#fullembedcodeddd2").animate({
            'max-height': '800'
        });
    });

    $('#pcrmobileview').on('click', function () {
        whatcheckingsizeview = 2;
        $("#fullembedcodeddd2").animate({
            'width': '390px'
        });
        $("#fullembedcodeddd2").animate({
            'max-height': '500px'
        });
        $('#fullembedcodeddd').css('max-width', '400px').css('margin-left', '7.85%');
        $('.morebutt').not('#closeembed').css('background-color', '#fff').css('color', '#333');
        $(this).css('background-color', '#333').css('color', '#fff');
        $('body').css('background-color', '#333');
        $('#codeloaderpcrview').find('.width50c2').each(function () {
            $(this).addClass('makeit100now');
        });
        $('#codeloaderpcrview').find('.width50c3').each(function () {
            $(this).addClass('makeit50now');
        });
        $('#codeloaderpcrview').find('.hideonlyonmobile').each(function () {
            $(this).hide();
        });
        $('#codeloaderpcrview').find('.hideonlyondesktop').each(function () {
            $(this).show();
        });
        $("#fullembedcodeddd2").resizable({
            minWidth: 320
        });
    });

    $('#closeembed').on('click', function () {
        $('#mymatrix4').hide();
        $('#programming').show();
        $('#resizable-div').show();
        $('#firstmatrix').click();
        $('#fullembedcodeddd').hide();
        $('#fullinterface').show();
        $('body').css('background-color', '#333');
        $('#codeloaderpcrview').find('.width50c2').each(function () {
            $(this).addClass('makeit100now');
        });
        $('#codeloaderpcrview').find('.width50c3').each(function () {
            $(this).addClass('makeit50now');
        });
    });

    $('#whatsnewwb').on('click', function () {
        $('#pluginsandtools').click();
        $('#outslidepluginsout').attr('src', 'release-notes.html');
    });

    $('.outsideplugins').on('click', function () {
        const wto = $(this).attr('whaturl');
        $('#outslidepluginsout').attr('src', wto);
        $('.outsideplugins').css('background-color', '#000');
        $(this).css('background-color', '#333');
    });

    document.getElementById('mytoolsview').addEventListener('change', function () {
        if (this.checked) {
            $('#programming').addClass('fullscreend').hide();
            $('#resizable-div').delay(500).animate({
                width: '100%'
            }, 500);
            $('#legend').hide();
            $('.hamburger').show();
            $('.textaligner svg').css('width', '100%');
            $('.hideinfullscreen').hide();
            $('.imgbuild').css('width', '96%');
        } else {
            $('.textaligner svg').css('width', '40%');
            $('.hamburger').hide();
            $('.fullscreenmode').css('padding', '1% ');
            $('#resizable-div').css('width', '70%');
            $('#programming').removeClass('fullscreend').fadeIn();
            $('.internalscroller').css('max-height', '725px').css('overflow-y', 'auto');
            $('#legend').show();
            $('.hideinfullscreen').show();
            $('.mymobile , #pullthecode2').css('float', 'left');
            $('#pullthecode2').css('width', '64%');
            $('.imgbuild').css('width', '98%');
        }
    });

    $('.hamburger').on('click', function () {
        $('#programming').slideToggle();
    });

    document.getElementById('mysort').addEventListener('change', function () {
        if (this.checked) {
            $("#pullthecode3").sortable({
                disabled: false
            });
            $('.informationcontent').children().css('cursor', 'grab');
        } else {
            $("#pullthecode3").sortable({
                disabled: true
            });
            $('.informationcontent').children().css('cursor', '');
            $('#clearandrestartbuttonrefresh').click();
        }
    });

    document.getElementById('mysortcomponents').addEventListener('change', function () {
        const sortableElements = $("div.layoutpale").not('h2 , p');

        if (this.checked) {
            sortableElements.sortable({
                disabled: false
            });
        } else {
            sortableElements.sortable({
                disabled: true
            });
            sortableElements.sortable('disable');
            $('.informationcontent').children().css('cursor', '');
            $('#clearandrestartbuttonrefresh').click();
        }
    });

    $('#clearandrestartbuttonrefresh').on('click', function () {
        location.reload();
    });

    $('.pcrcloseicon').on('click', function () {
        $('#codeloaderpcrview').toggle();
    });

    function updateSliderValuerow(value) {
        document.getElementById('sliderValuerow').textContent = value;
    }

    function updateSliderValuecomp(value) {
        document.getElementById('sliderValuecomp1').textContent = value;
    }

    $('#versionList').on('change', function () {
        $('#revertVersionBtn').click();
    });

    $('.hover-item').each(function () {
        let timeoutId;
        $(this).hover(
            function () {
                clearTimeout(timeoutId);
                $(this).find('.popup').removeClass('hidden').addClass('visible');
            },
            function () {
                const $popup = $(this).find('.popup');
                timeoutId = setTimeout(function () {
                    $popup.removeClass('visible').addClass('hidden');
                }, 300);
            }
        );
    });

    $('.clearsection').on('click', function () {
        captureState();
        $('.explorerselected').empty();
    });

    document.getElementById('mobilehidev2d').addEventListener('input', function () {
        if (this.checked) {
            $('.explorerselected').addClass('hideonlyonmobile');
            updateMobilePreview();
        } else {
            $('.explorerselected').removeClass('hideonlyonmobile');
            updateMobilePreview();
        }
    });

    document.getElementById('desktophidev2d').addEventListener('input', function () {
        if (this.checked) {
            $('.explorerselected').addClass('hideonlyondesktop');
            updateMobilePreview();
        } else {
            $('.explorerselected').removeClass('hideonlyondesktop');
            updateMobilePreview();
        }
    });

    // Download the script as a file
    function downloadFile(filename, content) {
        const blob = new Blob([content], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    const scriptContent = $('script').text();
    $('#downloadScript').on('click', function () {
        downloadFile('script.js', scriptContent);
    });
});
