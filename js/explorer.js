function runexplorer() {
    $('#explorer').empty();  // Clear the existing content
    const target = document.getElementById('pullthecode2');
    const explorer = document.getElementById('explorer');

    // List of classes to exclude from display
    const excludedClasses = [
        'informationcontent', 'layoutbuilder', 'sortable', 'layoutop2', 'experience-component',
        'experience-pcrs_assets-markup', 'liveelement', 'in910', 'layoutpale', 'layoutpale33',
        'layoutpale20', 'layoutpale25', 'layoutpale40', 'layoutpale50', 'layoutpale75',
        'layoutpale60', 'layoutpale80', 'layoutpale100', 'ui-sortable', 'ui-sortable-disabled',
        'liverow', 'droppable', 'ui-droppable', 'loading-lazy', 'promoimg21', 'ui-sortable-handle',
        'interedit', 'onblock'
    ];

    // Function to explore elements and create the explorer structure
    function exploreElements(element, depth = 0, parentContainer = explorer) {
        let elements = element.children;
        for (let i = 0; i < elements.length; i++) {
            let tagLabel = elements[i].tagName;
            let specialLabel = getSpecialLabel(elements[i]);  // Determine if it needs a special label like COMPONENT or ROW
            let labelColor = getColorForTag(tagLabel, elements[i]); // This function might need adjustment if color is based on specialLabel
            let classDisplay = getClassDisplay(elements[i]);

            const details = document.createElement('div');
            details.className = 'indent';
            details.style.marginLeft = `${depth * 20}px`;
            details.setAttribute('data-tag', specialLabel || tagLabel); // Use special label for CSS or default to tag name
            details.innerHTML = `<strong style="color: ${labelColor};">${specialLabel || tagLabel}</strong>&nbsp;&nbsp;${classDisplay}: <em>&nbsp;</em>`;
            parentContainer.appendChild(details);

            details.addEventListener('click', function() {
                $('.indent').removeClass('indentselected');
                details.classList.add('indentselected');
                elements[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
            });

            if (elements[i].children.length > 0) {
                exploreElements(elements[i], depth + 1, parentContainer);
            }
        }
    }

    // Determine special labels based on element classes
    function getSpecialLabel(element) {
        if (element.classList.contains('liveelement')) {
            return 'COMPONENT';
        } else if (element.classList.contains('liverow')) {
            return 'ROW';
        }
        return null; // Return null if no special label is needed
    }

    // Retrieve the color for the tag based on its type
    function getColorForTag(tag, element) {
        if (element.classList.contains('liverow')) {
            return '#007bff'; // Blue
        } else if (element.classList.contains('liveelement')) {
            return '#ffc107'; // Yellow
        }
        return '#28a745'; // Green
    }

    // Filter classes and prepare display format
    function getClassDisplay(element) {
        let classesArray = Array.from(element.classList).filter(cls => !excludedClasses.includes(cls));
        return classesArray.length > 0 ? `<span style="font-size: smaller;"> (${classesArray.join(' ')})</span>` : '';
    }

    // Start exploring from the target div
    exploreElements(target);
}