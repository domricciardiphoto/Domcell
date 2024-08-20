let database, notebookDb;
const dbName2 = "DB";
const storeName2 = "notes";
const themeKey = "theme";
const tabListKey = "tabList";
const notebookDbName = 'DomcellDB';
const notebookStoreName = 'DomcellcontentStore';
let activeTab = null;
let tabToDelete = null;

// Initialize CodeMirror
const editor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
    mode: 'htmlmixed',
    theme: '3024-night',
    lineNumbers: true,
    lineWrapping: true,
    lint: true,
    gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    extraKeys: {
        "Ctrl-Space": "autocomplete",
        "Ctrl-F": "findPersistent",
        "Ctrl-H": "replace"
    },
    autoCloseBrackets: true,
    autoCloseTags: true,
    matchBrackets: true,
    highlightSelectionMatches: {
        showToken: /\w/,
        annotateScrollbar: true
    },
    smartIndent: true,
    styleActiveLine: true,
    foldGutter: true,
    showCursorWhenSelecting: true,
    inputStyle: 'contenteditable'
});

editor.setSize('100%', '100%');
document.querySelector('.CodeMirror , textarea').setAttribute('spellcheck', 'true');

// Open IndexedDB
const openDB2 = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName2, 1);

        request.onupgradeneeded = function (event) {
            database = event.target.result;
            if (!database.objectStoreNames.contains(storeName2)) {
                database.createObjectStore(storeName2);
            }
        };

        request.onsuccess = function (event) {
            database = event.target.result;
            resolve();
        };

        request.onerror = function (event) {
            console.error("Database error:", event.target.errorCode);
            reject(event.target.errorCode);
        };
    });
};

// Save notes to IndexedDB
const saveNotes = (tab) => {
    if (!database || !tab) return;
    const transaction = database.transaction([storeName2], "readwrite");
    const store = transaction.objectStore(storeName2);
    const notes = editor.getValue();
    const request = store.put(notes, tab);

    request.onerror = function (event) {
        console.error("Failed to save notes:", event.target.errorCode);
    };
};

// Load notes from IndexedDB
const loadNotes = (tab) => {
    if (!database || !tab) return;
    const transaction = database.transaction([storeName2], "readonly");
    const store = transaction.objectStore(storeName2);
    const request = store.get(tab);

    request.onsuccess = function (event) {
        editor.setValue(event.target.result || "");
    };

    request.onerror = function (event) {
        console.error("Failed to load notes for tab:", tab, event.target.errorCode);
    };
};

// Save tab list to IndexedDB
const saveTabList = () => {
    if (!database) return;
    const transaction = database.transaction([storeName2], "readwrite");
    const store = transaction.objectStore(storeName2);
    const tabList = Array.from(document.querySelectorAll('.tab')).map(t => t.textContent.replace(/ ×$/, '').trim());
    const request = store.put(tabList, tabListKey);

    request.onerror = function (event) {
        console.error("Failed to save tab list:", event.target.errorCode);
    };
};

// Load tab list from IndexedDB
const loadTabList = () => {
    if (!database) return;
    const transaction = database.transaction([storeName2], "readonly");
    const store = transaction.objectStore(storeName2);
    const request = store.get(tabListKey);

    request.onsuccess = function (event) {
        const tabList = event.target.result || ["Page 1"];
        tabList.forEach((tabName, index) => addTab(tabName, index === 0));
        switchTab(tabList[0]);
    };

    request.onerror = function (event) {
        console.error("Failed to load tab list:", event.target.errorCode);
    };
};

// Save theme to IndexedDB
const saveTheme = (theme) => {
    if (!database) return;
    const transaction = database.transaction([storeName2], "readwrite");
    const store = transaction.objectStore(storeName2);
    const request = store.put(theme, themeKey);

    request.onerror = function (event) {
        console.error("Failed to save theme:", event.target.errorCode);
    };
};

// Load theme from IndexedDB
const loadTheme = () => {
    if (!database) return;
    const transaction = database.transaction([storeName2], "readonly");
    const store = transaction.objectStore(storeName2);
    const request = store.get(themeKey);

    request.onsuccess = function (event) {
        const theme = event.target.result || "3024-night";
        editor.setOption("theme", theme);
        loadThemeCSS(theme);
        document.getElementById("themeSelect").value = theme;
    };

    request.onerror = function (event) {
        console.error("Failed to load theme:", event.target.errorCode);
    };
};

// Load CSS for the selected theme
const loadThemeCSS = (theme) => {
    const existingLink = document.getElementById('themeStylesheet');
    if (existingLink) {
        existingLink.parentNode.removeChild(existingLink);
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.id = 'themeStylesheet';
    link.href = `https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.7/theme/${theme}.min.css`;
    document.head.appendChild(link);
};

// Add new tab
const addTab = (tabName, isDefault = false) => {
    const tabs = document.getElementById("tabs");
    const tab = document.createElement("div");
    tab.className = "tab";
    tab.innerHTML = isDefault ? `<span>${tabName}</span>` :
        `<span>${tabName}</span> <button class="close-tab" onclick="showDeleteModal(event, '${tabName}')">×</button>`;
    tab.onclick = (e) => {
        if (e.target.tagName !== 'BUTTON') switchTab(tabName);
    };
    tabs.appendChild(tab);
};

// Show delete confirmation modal
const showDeleteModal = (event, tabName) => {
    event.stopPropagation();
    tabToDelete = tabName;
    document.getElementById("deleteModalMessage").textContent =
        `Are you sure you want to delete the tab "${tabName}"?`;
    document.getElementById("deleteModal").style.display = "flex";
};

// Hide delete confirmation modal
const hideDeleteModal = () => {
    document.getElementById("deleteModal").style.display = "none";
    tabToDelete = null;
};

// Delete a tab
const deleteTab = () => {
    if (!tabToDelete) return;
    const transaction = database.transaction([storeName2], "readwrite");
    const store = transaction.objectStore(storeName2);
    store.delete(tabToDelete).onsuccess = () => {
        const tabElement = Array.from(document.querySelectorAll('.tab')).find(t => t.textContent.includes(tabToDelete));
        if (tabElement) tabElement.remove();

        saveTabList();
        if (activeTab === tabToDelete) {
            const remainingTabs = document.querySelectorAll('.tab');
            if (remainingTabs.length > 0) {
                switchTab(remainingTabs[0].textContent.replace(/ ×$/, '').trim());
            } else {
                activeTab = "Page 1";
                editor.setValue("");
                addTab("Page 1", true);
            }
        }
        hideDeleteModal();
    };
};

// Switch tab
const switchTab = (tabName) => {
    if (activeTab !== null) saveNotes(activeTab);
    activeTab = tabName;
    loadNotes(tabName);
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    const tab = Array.from(document.querySelectorAll('.tab')).find(t => t.textContent.includes(tabName));
    if (tab) tab.classList.add('active');
};

// Clear all tabs and IndexedDB
const clearAllTabs = () => {
    const transaction = database.transaction([storeName2], "readwrite");
    const store = transaction.objectStore(storeName2);
    store.clear().onsuccess = () => {
        document.getElementById("tabs").innerHTML = '';
        addTab("Page 1", true);
        switchTab("Page 1");
    };
};

// Initialize the application
const initialize = async () => {
    try {
        await openDB2();
        loadTabList();
        loadTheme();
        loadFontSize();
    } catch (error) {
        console.error("Failed to initialize database:", error);
    }
};

// Show modal for adding a new tab
const showModal = () => {
    document.getElementById("modal").style.display = "flex";
};

// Hide modal
const hideModal = () => {
    document.getElementById("modal").style.display = "none";
    document.getElementById("tabNameInput").value = "";
};

// Confirm adding new tab
const confirmAddTab = () => {
    const tabName = document.getElementById("tabNameInput").value.trim();
    if (tabName && !Array.from(document.querySelectorAll('.tab')).some(t => t.textContent.includes(tabName))) {
        addTab(tabName);
        saveTabList();
        hideModal();
    } else {
        alert("Invalid or duplicate tab name.");
    }
};

// Theme change event listener
document.getElementById("themeSelect").addEventListener("change", (event) => {
    const selectedTheme = event.target.value;
    editor.setOption("theme", selectedTheme);
    loadThemeCSS(selectedTheme);
    saveTheme(selectedTheme);
});

// Event listener for icon buttons
document.getElementById("addTab").onclick = showModal;
document.getElementById("clearTabs").onclick = clearAllTabs;
document.getElementById("importLive").onclick = importLivePage;
document.getElementById("importFile").onclick = () => document.getElementById('fileInput').click();

document.getElementById("closeModal").onclick = hideModal;
document.getElementById("confirmAddTab").onclick = confirmAddTab;
document.getElementById("confirmDelete").onclick = deleteTab;
document.getElementById("cancelDelete").onclick = hideDeleteModal;

// Save notes and tab list every 5 seconds
setInterval(() => {
    saveNotes(activeTab);
    saveTabList();
}, 5000);

// Handle theme and language changes
function changeEditorMode(mode) {
    editor.setOption('mode', mode);
}

document.getElementById('languageSelect').addEventListener('change', function () {
    const selectedMode = this.value;
    changeEditorMode(selectedMode);
});

// Save font size to localStorage
const saveFontSize = (size) => {
    localStorage.setItem('fontSize', size);
};

// Load font size from localStorage
const loadFontSize = () => {
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        setEditorFontSize(savedFontSize);
        document.getElementById('fontSizeSlider').value = savedFontSize;
    }
};

// Set editor font size
const setEditorFontSize = (size) => {
    editor.getWrapperElement().style.fontSize = `${size}px`;
    editor.refresh();
};

// Initialize font size slider
document.getElementById('fontSizeSlider').addEventListener('input', (event) => {
    const fontSize = event.target.value;
    setEditorFontSize(fontSize);
    saveFontSize(fontSize);
});

// Load the saved font size on startup
loadFontSize();

// Function to create a new button and textarea
function createButtonAndTextarea(content) {
    saveTabList();
    const editorElement = document.getElementById('code-editor');
    if (editorElement) {
        editor.setValue(content);
    }
}

// Function to fetch HTML from IndexedDB and create elements
function importLivePage() {
    const dbName2 = "DomcellDB";
    const storeName2 = "DomcellcontentStore";
    let database;

    const request = indexedDB.open(dbName2);

    request.onerror = function (event) {
        console.error("Database error:", event.target.errorCode);
    };

    request.onsuccess = function (event) {
        database = event.target.result;
        const transaction = database.transaction([storeName2], "readonly");
        const store = transaction.objectStore(storeName2);
        const getRequest = store.get("savedContent");

        getRequest.onsuccess = function (event) {
            const result = event.target.result;

            if (result) {
                let content = result.htmlContent;
                content = content.replace(/\\"/g, '"');
                content = content.replace(/\\n/g, '\n');

                createButtonAndTextarea(content);
            } else {
                console.warn("No content found for key 'savedContent'.");
            }
        };

        getRequest.onerror = function (event) {
            console.error("Error fetching data:", event.target.errorCode);
        };
    };
}

// Handle the file selection and read its content
document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const content = e.target.result;
            createButtonAndTextarea(content);
        };

        reader.onerror = function (e) {
            console.error("Error reading file:", e.target.error);
        };

        reader.readAsText(file);
    } else {
        console.warn("No file selected.");
    }
});

$('#codePreview').on('click', function () {
    if ($('.codepreview').is(':visible')) {
        $('.codepreview').slideUp();
        $('.CodeMirror').animate({ 'width': '100%' });
        $('#codePreview').html('<i class="fas fa-eye"></i>');
    } else {
        $('.CodeMirror').animate({ 'width': '50%' });
        $('.codepreview').slideDown();
        $('.codepreview').html($('.CodeMirror-line').text());
        $('#codePreview').html('<i class="fas fa-eye-slash"></i>');
    }
});

function synchronizePreview() {
    $('.codepreview').html(editor.getValue());
}

editor.on('change', function (instance) {
    var content = instance.getValue();
    $('.codepreview').html(content);
    synchronizePreview();

    
});

editor.on("inputRead", function onInputRead(editor, input) {
    if (input.text[0] === "." || input.text[0] === "<" || input.text[0] === "{") {
        editor.showHint();
    }
});

// Select all elements with the class 'effectuslink' and add a click event listener
document.querySelectorAll('.effectuslink').forEach(function (element) {
    element.addEventListener('click', function () {
        window.open('https://pcr.effectuspartners.com/login', 'Effectus PIM',
            'width=1024,height=768');
    });
});

// Select all elements with the class 'salesforcelink' and add a click event listener
document.querySelectorAll('.salesforcelink').forEach(function (element) {
    element.addEventListener('click', function () {
        window.open(
            'https://staging-na01-pcrichard.demandware.net/on/demandware.store/Sites-Site/default/ViewApplication-DisplayWelcomePage',
            'Salesforce Staging', 'width=1024,height=768');
    });
});

// Open the save file modal
function openSaveFileModal() {
    document.getElementById('saveFileModal').style.display = 'flex';
}

// Close the save file modal
function closeSaveFileModal() {
    document.getElementById('saveFileModal').style.display = 'none';
}

// Save file when confirmed
function confirmSaveFile() {
    const fileName = document.getElementById('fileNameInput').value.trim();
    const fileType = document.getElementById('fileTypeSelect').value;
    const content = editor.getValue();

    if (!fileName) {
        alert('Please enter a file name.');
        return;
    }

    const fullFileName = `${fileName}.${fileType}`;
    downloadContent(fullFileName, content);

    closeSaveFileModal();
}

// Event listeners for modal buttons
document.getElementById('saveFile').onclick = openSaveFileModal;
document.getElementById('saveFileCancel').onclick = closeSaveFileModal;
document.getElementById('saveFileConfirm').onclick = confirmSaveFile;

// Function to download the content as a file
function downloadContent(filename, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
}

function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const queries = queryString.split("&");

    queries.forEach(query => {
        const [key, value] = query.split("=");
        params[key] = decodeURIComponent(value || "");
    });

    return params;
}

function handleAutoClick() {
    const params = getQueryParams();
    if (params.triggerClick === "true") {
        const importLiveButton = document.getElementById('importLive');
        if (importLiveButton) {
            importLiveButton.click();
            console.log('Import Live button automatically clicked based on URL parameter');
        }
    }
}

window.addEventListener('load', handleAutoClick);

async function openNotebookDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(notebookDbName, 1);

        request.onupgradeneeded = function (event) {
            notebookDb = event.target.result;
            if (!notebookDb.objectStoreNames.contains(notebookStoreName)) {
                notebookDb.createObjectStore(notebookStoreName, { keyPath: 'id' });
            }
        };

        request.onsuccess = function (event) {
            notebookDb = event.target.result;
            resolve();
        };

        request.onerror = function (event) {
            console.error('Database error:', event.target.errorCode);
            reject(event.target.errorCode);
        };
    });
}

function saveNotebookContent(content) {
    return new Promise((resolve, reject) => {
        const transaction = notebookDb.transaction([notebookStoreName], 'readwrite');
        const store = transaction.objectStore(notebookStoreName);
        const request = store.put({ id: 'notebookContent', htmlContent: content });

        request.onsuccess = function () {
            console.log('Notebook content saved to DB successfully.');
            resolve();
        };

        request.onerror = function (event) {
            console.error('Failed to save notebook content:', event.target.errorCode);
            reject(event.target.errorCode);
        };
    });
}

window.addEventListener('load', async function () {
    await openNotebookDB();

    // Listen for a message to save the content
    window.addEventListener('message', async function (event) {
        if (event.data === 'saveNotebookContent') {
            const contentToSave = editor.getValue();
            await saveNotebookContent(contentToSave);
            window.parent.postMessage('notebookContentSaved', '*');
        }
    });

    // Beautify the code when the editor loads
    beautifyCode();
});

function beautifyCode() {
    const content = editor.getValue();
    const beautifiedContent = html_beautify(content, {
        indent_size: 2,
        wrap_line_length: 80,
        preserve_newlines: true,
        max_preserve_newlines: 2,
        end_with_newline: true
    });
    editor.setValue(beautifiedContent);
}

// Initialize the application and functionality
initialize();

$('#beautify').on('click', function() {
    beautifyCode();
});









// Add event listener for clicks on .codepreview
$('.codepreview').on('click', function(event) {
    const clickedElement = event.target;
    // Check if the clicked target is an image or element
    if (clickedElement.tagName === 'IMG') {
        highlightElementCode(clickedElement);
    } else {
        // If not an image, try to highlight text selection
        synchronizeSelection();
    }
});

function highlightElementCode(element) {
    // Get the outer HTML of the element
    const elementHtml = element.outerHTML;
    console.log("Clicked Element HTML:", elementHtml);

    // Normalize the outer HTML to match the CodeMirror content
    const normalizedElementHtml = normalizeText(elementHtml).replace(/\s+/g, '');
    console.log("Normalized Element HTML:", normalizedElementHtml);

    // Get the normalized content and index mapping from CodeMirror
    const originalContent = editor.getValue();
    const { normalizedText: normalizedContent, indexMap } = normalizeTextWithMapping(originalContent);
    console.log("Normalized CodeMirror Content:", normalizedContent);

    // Find the start index of the element HTML in the normalized content
    const startIndex = normalizedContent.indexOf(normalizedElementHtml);
    if (startIndex !== -1) {
        const endIndex = startIndex + normalizedElementHtml.length;
        console.log("Start Index in Normalized Content:", startIndex, "End Index:", endIndex);

        // Use the index map to find the original indices
        const originalStartIndex = indexMap[startIndex];
        const originalEndIndex = indexMap[endIndex - 1] + 1; // End is exclusive

        console.log("Original Start Index:", originalStartIndex, "Original End Index:", originalEndIndex);

        // Convert the indices to CodeMirror positions
        const startPos = editor.posFromIndex(originalStartIndex);
        const endPos = editor.posFromIndex(originalEndIndex);

        console.log("Start Position in CodeMirror:", startPos, "End Position:", endPos);

        // Set the selection in CodeMirror
        editor.setSelection(startPos, endPos);
        editor.focus();
        editor.refresh(); // Ensure the editor updates its display
    } else {
        console.warn("Element HTML not found in CodeMirror content.");
    }
}

function synchronizeSelection() {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    console.log("Selected Text:", selectedText);

    if (selectedText) {
        // Normalize the selected text
        const normalizedSelectedText = normalizeText(selectedText).replace(/\s+/g, '');
        console.log("Normalized Selected Text:", normalizedSelectedText);

        // Get the normalized content and index mapping from CodeMirror
        const originalContent = editor.getValue();
        const { normalizedText: normalizedContent, indexMap } = normalizeTextWithMapping(originalContent);
        console.log("Normalized CodeMirror Content:", normalizedContent);

        // Find the start index in the normalized content
        const startIndex = normalizedContent.indexOf(normalizedSelectedText);
        if (startIndex !== -1) {
            const endIndex = startIndex + normalizedSelectedText.length;
            console.log("Start Index in Normalized Content:", startIndex, "End Index:", endIndex);

            // Use the index map to find the original indices
            const originalStartIndex = indexMap[startIndex];
            const originalEndIndex = indexMap[endIndex - 1] + 1; // End is exclusive

            console.log("Original Start Index:", originalStartIndex, "Original End Index:", originalEndIndex);

            // Convert the indices to CodeMirror positions
            const startPos = editor.posFromIndex(originalStartIndex);
            const endPos = editor.posFromIndex(originalEndIndex);

            console.log("Start Position in CodeMirror:", startPos, "End Position:", endPos);

            // Set the selection in CodeMirror
            editor.setSelection(startPos, endPos);
            editor.focus();
            editor.refresh(); // Ensure the editor updates its display
        } else {
            console.warn("Normalized text not found in CodeMirror content.");
        }
    } else {
        console.warn("No text selected.");
    }
}

function normalizeTextWithMapping(text) {
    const normalizedText = [];
    const indexMap = [];
    let normalizedIndex = 0;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        // Only add non-space characters to the normalized text
        if (!/\s/.test(char)) {
            normalizedText.push(char);
            indexMap[normalizedIndex] = i; // Map normalized index to original index
            normalizedIndex++;
        }
    }

    return { normalizedText: normalizedText.join(''), indexMap };
}

function normalizeText(text) {
    return text.replace(/\s+/g, ' ').trim();
}



$('.codepreview').on('mouseup', function() {
    synchronizeSelection();
});


