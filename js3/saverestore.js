function clearIndexedDB() {
    const dbName = 'DomcellDB';  // Ensure this matches the database used throughout your app
    const storeName = 'DomcellcontentStore';  // Ensure this matches the store name used in your app

    // Open a connection to your database
    var request = indexedDB.open(dbName, 1);

    request.onerror = function(event) {
        console.error("Database error: " + event.target.errorCode);
    };

    request.onupgradeneeded = function(event) {
        // Handle any upgrades or initial setup here if needed
        var db = event.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: 'id' });
        }
    };

    request.onsuccess = function(event) {
        var db = event.target.result;

        // Create a transaction on the correct store with readwrite permissions
        var transaction = db.transaction([storeName], "readwrite");
        var objectStore = transaction.objectStore(storeName);

        // Clear all the data in the object store
        var clearRequest = objectStore.clear();

        clearRequest.onsuccess = function() {
            // Data cleared successfully
            console.log("IndexedDB data cleared successfully.");
            window.clearAndRestartClicked = true;
            location.reload();  // Reload the page to reset everything after clearing the data
        };

        clearRequest.onerror = function(event) {
            console.error("Clear operation failed: ", event.target.errorCode);
        };
    };
}






$(document).ready(function() {
    const contentArea = $('#pullthecode2');
    const urlModal = $('#urlModal');
    const desktopHideCheckbox = $('#desktophidev2d');
    const mobileHideCheckbox = $('#mobilehidev2d');
    const dbName = 'DomcellDB';
    const storeName = 'DomcellcontentStore';
    let db;

    // Initialize IndexedDB
    function initDB() {
        const request = indexedDB.open(dbName, 1);

        request.onupgradeneeded = function(event) {
            db = event.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, { keyPath: 'id' });
            }
        };

        request.onsuccess = function(event) {
            db = event.target.result;
            loadContent(); // Load content once DB is initialized
        };

        request.onerror = function(event) {
            console.error('Error opening IndexedDB:', event.target.errorCode);
        };
    }

    // Save content to IndexedDB
    function saveContent(content) {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.put({ id: 'savedContent', htmlContent: content });

        request.onsuccess = function() {
            console.log('Content saved to IndexedDB successfully!');
        };

        request.onerror = function(event) {
            console.error('Error saving content to IndexedDB:', event.target.errorCode);
        };
    }

    // Load content from IndexedDB
    function loadContent() {
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get('savedContent');

        request.onsuccess = function(event) {
            const data = event.target.result;
            if (data) {
                contentArea.html(data.htmlContent);
            }
            initializeUI();
        };

        request.onerror = function(event) {
            console.error('Error loading content from IndexedDB:', event.target.errorCode);
        };
    }

    // Initialize UI components after content is loaded
    function initializeUI() {
        runexplorer();
        enabledrop();
        imagefunctions();
        paragraphfunctions();
        $mobilePreview.html($pullTheCode.html());
    }

    // Event handling for links
    $('body').on('click', 'a:not(.googledrive, .outsidelink)', function(e) {
        e.preventDefault();
        const target = $(e.target).closest('a');
        gotothelinkfunction(target.attr('href'));
        imagefunctions();
    });

    // Cancel URL modal
    $('#cancelUrl').click(function() {
        urlModal.hide();
        runexplorer();
    });

    // Handle class toggles

 
    /*
    $('.liverow').click(function() {
        $('.onblock').removeClass('onblock');
        $(this).addClass('onblock');
        desktopHideCheckbox.prop('checked', $(this).hasClass('hideonlyondesktop'));
        mobileHideCheckbox.prop('checked', $(this).hasClass('hideonlyonmobile'));
    });
*/
   

    // Clear storage and restart application
    $('#clearandrestartbutton').click(function() {
        clearIndexedDB(); // Call the function to clear IndexedDB
    });

    // Save data before unloading the page
    $(window).on('beforeunload', function() {
        if (!window.clearAndRestartClicked) {
            saveContent(contentArea.html());
        }
    });

    // Initialize the IndexedDB
    initDB();
});