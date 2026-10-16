const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    onOpenFile: (callback) => ipcRenderer.on('open-file-content', (_event, content) => callback(content)),

    onDownloadStarted: (callback) => ipcRenderer.on('download-started', (_event, filename) => callback(filename)),
    onDownloadProgress: (callback) => ipcRenderer.on('download-progress', (_event, data) => callback(data)),
    onDownloadCompleted: (callback) => ipcRenderer.on('download-completed', (_event, filename) => callback(filename)),
    onDownloadCancelled: (callback) => ipcRenderer.on('download-cancelled', (_event, filename) => callback(filename)),

    downloadAction: (data) => ipcRenderer.send('download-action', data),
    openFileLocation: (filename) => ipcRenderer.send('open-file-location', filename)
});