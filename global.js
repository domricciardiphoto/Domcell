const { ipcRenderer } = require('electron');
var elements = document.getElementsByClassName('version');


for (let element of elements) {
  element.textContent = "2023 Ver. 7.0.0 incl. badge CSS Ver. Beta 9";
}


var input = document.getElementById("mypcrsearch");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        
        var inputValue = input.value; // Gets the value of the input using pure JavaScript

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
        
        var inputValue = input.value; // Gets the value of the input using pure JavaScript

        if (inputValue === '') {
             url = 'https://www.google.com/';
            ipcRenderer.send('open-url', url);
        } else {
          url = 'https://www.google.com/search?q=' + inputValue;
            ipcRenderer.send('open-url', url);
        }     
        return false;  // Although this line is not strictly necessary, it's retained from the original code.
    }
});


$(document).ready(function() {
  alert('hi')
})

