const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    saveVersion: (data) => ipcRenderer.invoke('save-version', data),
    getVersions: (projectId) => ipcRenderer.invoke('get-versions', projectId),
    revertVersion: (data) => ipcRenderer.invoke('revert-version', data)
});