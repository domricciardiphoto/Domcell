const { ipcRenderer } = require('electron');
var elements = document.getElementsByClassName('version');


for (let element of elements) {
  element.textContent = "Domcell 2023 Version. 8.2.17";
}


var input2 = document.getElementById("mypcrsearch");
input2.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        event.preventDefault();
        
        var inputValue = input2.value; // Gets the value of the input using pure JavaScript

        if (inputValue === '') {
            var url= 'https://www.pcrichard.com';
            ipcRenderer.send('open-url', url);
        } else {
            var url = 'https://www.pcrichard.com/search?q=' + inputValue;
            ipcRenderer.send('open-url', url);
        }     
        return false;  // Although this line is not strictly necessary, it's retained from the original code.
    }
});

var input = document.getElementById("customsearch");
input.addEventListener("keypress", function(event) {
if (event.key === "Enter") {
    event.preventDefault();
    
    var inputValue2 = input.value; // Gets the value of the input using pure JavaScript

    if (inputValue2 === '') {
         url2 = 'https://www.google.com/';
        ipcRenderer.send('open-url', url2);
    } else {
      url2 = 'https://www.google.com/search?q=' + inputValue2;
        ipcRenderer.send('open-url', url2);
    }     
    return false;  // Although this line is not strictly necessary, it's retained from the original code.
}
});







