let db, notebookDb;
const dbName = "DB";
const storeName = "notes";
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

// Open IndexedDB for both general use and notebook-specific content
const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onupgradeneeded = function (event) {
            db = event.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName);
            }
        };

        request.onsuccess = function (event) {
            db = event.target.result;
            resolve();
        };

        request.onerror = function (event) {
            $('.terminal').append("Database error:", event.target.errorCode);
            reject(event.target.errorCode);
        };
    });
};

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
            $('.terminal').append('Database error:', event.target.errorCode);
            reject(event.target.errorCode);
        };
    });
}

// Save notes to IndexedDB
const saveNotes = (tab) => {
    if (!db || !tab) return;
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);
    const notes = editor.getValue();
    const request = store.put(notes, tab);

    request.onerror = function (event) {
        $('.terminal').append("Failed to save notes:", event.target.errorCode);
    };
};

// Load notes from IndexedDB
const loadNotes = (tab) => {
    if (!db || !tab) return;
    const transaction = db.transaction([storeName], "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.get(tab);

    request.onsuccess = function (event) {
        editor.setValue(event.target.result || "");
    };

    request.onerror = function (event) {
        $('.terminal').append("Failed to load notes for tab:", tab, event.target.errorCode);
    };
};

// Save tab list to IndexedDB
const saveTabList = () => {
    if (!db) return;
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);
    const tabList = Array.from(document.querySelectorAll('.tab')).map(t => t.textContent.replace(/ ×$/, '').trim());
    const request = store.put(tabList, tabListKey);

    request.onerror = function (event) {
        $('.terminal').append("Failed to save tab list:", event.target.errorCode);
    };
};

// Load tab list from IndexedDB
const loadTabList = () => {
    if (!db) return;
    const transaction = db.transaction([storeName], "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.get(tabListKey);

    request.onsuccess = function (event) {
        const tabList = event.target.result || ["Page 1"];
        tabList.forEach((tabName, index) => addTab(tabName, index === 0));
        switchTab(tabList[0]);
    };

    request.onerror = function (event) {
        $('.terminal').append("Failed to load tab list:", event.target.errorCode);
    };
};

// Save theme to IndexedDB
const saveTheme = (theme) => {
    if (!db) return;
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.put(theme, themeKey);

    request.onerror = function (event) {
        $('.terminal').append("Failed to save theme:", event.target.errorCode);
    };
};

// Load theme from IndexedDB
const loadTheme = () => {
    if (!db) return;
    const transaction = db.transaction([storeName], "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.get(themeKey);

    request.onsuccess = function (event) {
        const theme = event.target.result || "3024-night";
        editor.setOption("theme", theme);
        loadThemeCSS(theme);
        document.getElementById("themeSelect").value = theme;
    };

    request.onerror = function (event) {
        $('.terminal').append("Failed to load theme:", event.target.errorCode);
    };
};

// Save notebook content to IndexedDB
async function saveNotebookContent(content) {
    if (!notebookDb) {
        await openNotebookDB();
    }

    return new Promise((resolve, reject) => {
        const transaction = notebookDb.transaction(['DomcellcontentStore'], 'readwrite');
        const store = transaction.objectStore('DomcellcontentStore');
        const request = store.put({ id: 'savedContent', htmlContent: content });  // Save using 'savedContent' key

        request.onsuccess = function () {
             $('.terminal').append('Content successfully saved to DomcellDB.');
            resolve();
        };

        request.onerror = function (event) {
            $('.terminal').append('Failed to save content:', event.target.errorCode);
            reject(event.target.errorCode);
        };
    });
}

// Load notebook content from IndexedDB
function loadFromDatabase() {
    const request = indexedDB.open('DomcellDB');

    request.onerror = function(event) {
        $('.terminal').append("Database error:", event.target.errorCode);
    };

    request.onsuccess = function(event) {
        notebookDb = event.target.result;
        const transaction = notebookDb.transaction(['DomcellcontentStore'], "readonly");
        const store = transaction.objectStore('DomcellcontentStore');
        const getRequest = store.get('savedContent');  // Retrieve using 'savedContent' key

        getRequest.onsuccess = function(event) {
            const result = event.target.result;

            if (result) {
                let content = result.htmlContent;
                editor.setValue(content);
            } else {
                console.warn("No content found for key 'savedContent'.");
            }
        };

        getRequest.onerror = function(event) {
            $('.terminal').append("Error fetching data:", event.target.errorCode);
        };
    };
}

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
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);
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
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);
    store.clear().onsuccess = () => {
        document.getElementById("tabs").innerHTML = '';
        addTab("Page 1", true);
        switchTab("Page 1");
    };
};

// Initialize the application
const initialize = async () => {
    try {
        await openDB();
        await openNotebookDB();
        loadTabList();
        loadTheme();
        loadFontSize();
        loadFromDatabase();
    } catch (error) {
        $('.terminal').append("Failed to initialize database:", error);
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
      

        $('#changemodelname').text('Invalid or duplicate tab name.');

        setTimeout(function() {
            $('#changemodelname').text('Enter the name for the new page:');
        }, 5000);
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
    const request = indexedDB.open(notebookDbName);

    request.onerror = function (event) {
        $('.terminal').append("Database error:", event.target.errorCode);
    };

    request.onsuccess = function (event) {
        notebookDb = event.target.result;
        const transaction = notebookDb.transaction([notebookStoreName], "readonly");
        const store = transaction.objectStore(notebookStoreName);
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
            $('.terminal').append("Error fetching data:", event.target.errorCode);
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
            $('.terminal').append("Error reading file:", e.target.error);
        };

        reader.readAsText(file);
    } else {
         $('.terminal').append("No file selected.");
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

editor.on('change', async function (instance) {
    const content = instance.getValue();
    $('.codepreview').html(content);
    synchronizePreview();
    try {
        await saveNotebookContent(content);
         $('.terminal').append('Content saved to IndexedDB.');
    } catch (error) {
        $('.terminal').append('Failed to save content:', error);
    }
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

        $('#changemodelname').text('Please enter a file name.');

        setTimeout(function() {
            $('#changemodelname').text('Enter the name for the new page:');
        }, 5000);
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
        }
    }
}

window.addEventListener('load', handleAutoClick);

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
    if (clickedElement.tagName === 'IMG') {
        highlightElementCode(clickedElement);
    } else {
        synchronizeSelection();
    }
});

function highlightElementCode(element) {
    const elementHtml = element.outerHTML;

    const normalizedElementHtml = normalizeText(elementHtml).replace(/\s+/g, '');

    const originalContent = editor.getValue();
    const { normalizedText: normalizedContent, indexMap } = normalizeTextWithMapping(originalContent);

    const startIndex = normalizedContent.indexOf(normalizedElementHtml);
    if (startIndex !== -1) {
        const endIndex = startIndex + normalizedElementHtml.length;

        const originalStartIndex = indexMap[startIndex];
        const originalEndIndex = indexMap[endIndex - 1] + 1;

        const startPos = editor.posFromIndex(originalStartIndex);
        const endPos = editor.posFromIndex(originalEndIndex);

        editor.setSelection(startPos, endPos);
        editor.focus();
        editor.refresh();
    } else {
         $('.terminal').append("Element HTML not found in content.");
    }
}

function synchronizeSelection() {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText) {
        const normalizedSelectedText = normalizeText(selectedText).replace(/\s+/g, '');

        const originalContent = editor.getValue();
        const { normalizedText: normalizedContent, indexMap } = normalizeTextWithMapping(originalContent);

        const startIndex = normalizedContent.indexOf(normalizedSelectedText);
        if (startIndex !== -1) {
            const endIndex = startIndex + normalizedSelectedText.length;

            const originalStartIndex = indexMap[startIndex];
            const originalEndIndex = indexMap[endIndex - 1] + 1;

            const startPos = editor.posFromIndex(originalStartIndex);
            const endPos = editor.posFromIndex(originalEndIndex);

            editor.setSelection(startPos, endPos);
            editor.focus();
            editor.refresh();
        } else {
            $('.terminal').append("Normalized text not found in content.");
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

        if (!/\s/.test(char)) {
            normalizedText.push(char);
            indexMap[normalizedIndex] = i;
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
