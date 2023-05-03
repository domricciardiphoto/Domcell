

const { ipcRenderer } = require('electron');
const ipc = ipcRenderer




///// CLOSE APP
closeBtn.addEventListener('click' , () => {
  
    ipc.send(closeApp)
})