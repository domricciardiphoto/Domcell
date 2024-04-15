$('#explorer').empty()
const target = document.getElementById('pullthecode2');
const explorer = document.getElementById('explorer');

function exploreElements(element, depth = 0) {
    let elements = element.children;
    for (let i = 0; i < elements.length; i++) {
        const isLiveRow = elements[i].classList.contains('liverow');
        const isLiveElement = elements[i].classList.contains('liveelement');

        let tagLabel = elements[i].tagName; // Default tag label
        let contentDescription = ''; // Default to show 'Empty' instead of content

        if (isLiveRow && tagLabel === 'DIV') {
            tagLabel = 'ROW'; // Change tag label for 'liverow'
        }

        if (isLiveElement && tagLabel === 'DIV') {
            tagLabel = 'COMPONENT'; // Change tag label for 'liveelement'
        }

        // Create a display for each element with indentation based on depth
        const details = document.createElement('div');
        details.className = 'indent';
        details.style.marginLeft = `${depth * 20}px`; // Increase indentation per level
        details.innerHTML = `<strong>${tagLabel}</strong>: <em>${contentDescription}</em>`;
        explorer.appendChild(details);

        // Recursively explore child elements
        if (elements[i].children.length > 0) {
            exploreElements(elements[i], depth + 1);
        }
    }
}

// Start exploring from the target div
exploreElements(target);