function  restoremyplace() {
    let undoStack = [];
    let redoStack = []; // Stack for redo functionality

    // Function to capture the current state before making changes
    function captureState() {
        const currentState = $('.interedit').html(); // Adjust selector as needed
        undoStack.push(currentState);
        redoStack = []; // Clear redo stack since new action resets the future path
    }

    // Function to undo to the last state
    function undoChange() {
        if (undoStack.length > 0) {
            const lastState = undoStack.pop();
            redoStack.push($('.interedit').html()); // Push current state to redoStack before undoing
            $('.interedit').html(lastState); // Adjust selector as needed
        }
    }

    // Function to redo to the next state
    function redoChange() {
        if (redoStack.length > 0) {
            const nextState = redoStack.pop();
            undoStack.push($('.interedit').html()); // Push current state to undoStack before redoing
            $('.interedit').html(nextState); // Adjust selector as needed
        }
    }

    // Function to delete highlighted text
    function deleteHighlightedText() {
        captureState(); // Capture the current state before deletion for undo functionality
        document.execCommand('delete', false, ''); // Use execCommand for simplicity
        redoStack = []; // Clear redoStack as the future path is reset
    }

    // Key Commands
    $(document).keydown(function (e) {
        if (e.key === 'z' && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
            e.preventDefault(); // Prevent default undo behavior
            undoChange();
        } else if (e.key === 'y' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault(); // Prevent default redo behavior
            redoChange();
        } else if (e.key === 'Delete' && e.ctrlKey) {
            e.preventDefault(); // Prevent default delete behavior
            deleteHighlightedText();
        } else if (e.key === 'e' && e.ctrlKey) {
            e.preventDefault();
            $('#superscriptbutton').click()
        } else if (e.key === 'd' && e.ctrlKey) {
            e.preventDefault();
            $('#subscriptbutton').click()
        }
    });

}