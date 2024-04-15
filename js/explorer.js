function runexplorer() {
    $('#explorer').empty();  // Clear the existing content
    const target = document.getElementById('pullthecode2');
    const explorer = document.getElementById('explorer');

    let lastSelectedElement = null; // Track the last selected element for removing highlights

    // List of classes to exclude from display
    const excludedClasses = [
        'informationcontent', 'layoutbuilder', 'sortable', 'layoutop2', 'experience-component',
        'experience-pcrs_assets-markup', 'liveelement', 'in910', 'layoutpale', 'layoutpale33',
        'layoutpale20', 'layoutpale25', 'layoutpale40', 'layoutpale50', 'layoutpale75',
        'layoutpale60', 'layoutpale80', 'layoutpale100', 'ui-sortable', 'ui-sortable-disabled',
        'liverow', 'droppable', 'ui-droppable', 'loading-lazy', 'promoimg21', 'ui-sortable-handle',
        'interedit', 'onblock'
    ];

    function exploreElements(element, depth = 0, parentContainer = explorer) {
        let elements = element.children;
        for (let i = 0; i < elements.length; i++) {
            let tagLabel = elements[i].tagName;
            let specialLabel = getSpecialLabel(elements[i]);
            let labelColor = getColorForTag(tagLabel, elements[i]);
            let classDisplay = getClassDisplay(elements[i]);

            const details = document.createElement('div');
            details.className = 'indent';
            details.style.marginLeft = `${depth * 20}px`;
            details.setAttribute('data-tag', specialLabel || tagLabel);
            details.innerHTML = `<strong style="color: ${labelColor};">${specialLabel || tagLabel}</strong>${classDisplay}`;
            parentContainer.appendChild(details);

            // Store a reference to the explorer indent on the DOM element for easy access
            elements[i].explorerIndent = details;

            details.addEventListener('click', function() {
                selectAndHighlightElement(elements[i]);
            });

            elements[i].addEventListener('click', function(event) {
                event.stopPropagation(); // Stop propagation to avoid nested element click issues
                selectAndHighlightElement(elements[i], true);
            });

            if (elements[i].children.length > 0) {
                exploreElements(elements[i], depth + 1, parentContainer);
            }
        }
    }

    function selectAndHighlightElement(element, scrollElement = false) {
        if (lastSelectedElement) {
            lastSelectedElement.classList.remove('explorerselected');
            lastSelectedElement.explorerIndent.classList.remove('indentselected');
        }
        element.classList.add('explorerselected');
        element.explorerIndent.classList.add('indentselected');
        element.explorerIndent.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        if (scrollElement) {
            element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }
        lastSelectedElement = element; // Update last selected element
    }

    function getSpecialLabel(element) {
        if (element.classList.contains('liveelement')) {
            return 'COMPONENT';
        } else if (element.classList.contains('liverow')) {
            return 'ROW';
        }
        return null;
    }

    function getColorForTag(tag, element) {
        if (element.classList.contains('liverow')) {
            return '#007bff'; // Blue
        } else if (element.classList.contains('liveelement')) {
            return '#ffc107'; // Yellow
        }
        return '#28a745'; // Green
    }

    function getClassDisplay(element) {
        let classesArray = Array.from(element.classList).filter(cls => !excludedClasses.includes(cls));
        return classesArray.length > 0 ? `<span style="font-size: smaller;">(${classesArray.join(' ')})</span>` : '';
    }

    exploreElements(target);
}