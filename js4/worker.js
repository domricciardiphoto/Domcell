self.onmessage = function(e) {
    const data = e.data;
    if (data.action === 'deleteElements') {
        // Perform heavy computation if necessary (e.g., logging, complex processing)
        // For this example, simply returning the data
        const result = {
            action: 'deleteElements',
            elements: data.elements
        };
        self.postMessage(result);
    }
};

self.onmessage = function(e) {
    const { action, draggableAttrs } = e.data;
    if (action === 'processDroppable') {
        const { mysize, mypale } = draggableAttrs;
        let result = '';
        if (mysize !== undefined && mysize !== "") {
            result = '<div class="' + mysize + ' in910 layoutpale interedit layoutpale' + mypale + '"></div>';
        }
        self.postMessage({ result });
    }
};
