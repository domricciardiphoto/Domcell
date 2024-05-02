document.addEventListener('DOMContentLoaded', function () {
    const listTitleInput = document.getElementById('listTitle');
    const listAmountSelect = document.getElementById('listAmount');
    const listTypeSelect = document.getElementById('listType');
    const listItemsContainer = document.getElementById('listItems');
    const submitListButton = document.getElementById('submitList');
    const exportListButton = document.getElementById('exportList');
    const importListButton = document.getElementById('importList');
    const fileInput = document.getElementById('fileInputList');

    function initializeListAmountOptions() {
        for (let i = 1; i <= 10; i++) {
            let option = new Option(`${i} Item${i > 1 ? 's' : ''}`, i);
            listAmountSelect.add(option);
        }
        updateListInputs(1); // Initialize with 1 input field
    }

    function updateListInputs(numberOfItems) {
        listItemsContainer.innerHTML = '';
        for (let i = 1; i <= numberOfItems; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'form-control list-item-input';
            input.placeholder = `List Item ${i}`;
            listItemsContainer.appendChild(input);
        }
    }

    listAmountSelect.addEventListener('change', function () {
        updateListInputs(parseInt(this.value));
    });

    submitListButton.addEventListener('click', function () {
        const titleText = listTitleInput.value.trim();
        const items = Array.from(document.querySelectorAll('.list-item-input'))
                           .map(input => input.value.trim())
                           .filter(item => item !== '');

        const listContainer = document.querySelector('.interedit');

        // Create title element if title is provided
        if (titleText) {
            const titleElement = document.createElement('h3');
            titleElement.textContent = titleText;
            titleElement.style.marginBottom = '5px';
            listContainer.appendChild(titleElement);
        }

        // Create list element
        const listType = listTypeSelect.value === '1' ? 'ul' : 'ol';
        const listElement = document.createElement(listType);
        listElement.className = 'in910';

        // Append list items to list element
        items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            listElement.appendChild(listItem);
        });

        // Append the new list to the container without replacing existing content
        listContainer.appendChild(listElement);
        runexplorer();
        $('#listTitle').val('')
        $('.list-item-input').val('')
    });

    exportListButton.addEventListener('click', function () {
        const data = {
            title: listTitleInput.value,
            type: listTypeSelect.value,
            items: Array.from(document.querySelectorAll('.list-item-input')).map(input => input.value)
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.className = 'outsidelink';  // Add this class to distinguish this link from others
        a.href = url;
        a.download = 'list.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    importListButton.addEventListener('click', function () {
        fileInput.click();
    });

    fileInput.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const data = JSON.parse(event.target.result);
                listTitleInput.value = data.title;
                listTypeSelect.value = data.type;
                updateListInputs(data.items.length);
                data.items.forEach((item, index) => {
                    document.querySelectorAll('.list-item-input')[index].value = item;
                });
            };
            reader.readAsText(file);
        }
    });

    initializeListAmountOptions();
});