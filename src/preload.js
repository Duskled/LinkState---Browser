// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    // Listens for double-clicked .linkstate files from the OS
    onOpenFile: (callback) => ipcRenderer.on('open-file-content', (_event, content) => callback(content)),
    
    // Download Tracking
    onDownloadStarted: (callback) => ipcRenderer.on('download-started', (_event, filename) => callback(filename)),
    onDownloadProgress: (callback) => ipcRenderer.on('download-progress', (_event, data) => callback(data)),
    onDownloadCompleted: (callback) => ipcRenderer.on('download-completed', (_event, filename) => callback(filename)),
    onDownloadCancelled: (callback) => ipcRenderer.on('download-cancelled', (_event, filename) => callback(filename)),
    
    // UI Action Senders
    downloadAction: (data) => ipcRenderer.send('download-action', data),
    openFileLocation: (filename) => ipcRenderer.send('open-file-location', filename)
});