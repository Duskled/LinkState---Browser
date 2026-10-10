'use strict';

/* =========================================================
   LINKSTATE BROWSER
   Electron Main Process
========================================================= */

const { app, BrowserWindow, Menu, ipcMain, shell } = require('electron');
const path = require('node:path');
const fs = require('node:fs');

// Handle creating desktop/start menu shortcuts on install
if (require('electron-squirrel-startup')) {
    app.quit();
}

let mainWindow;
let fileToOpen = null;
const activeDownloads = new Map();

/* =========================================================
   SINGLE INSTANCE LOCK & OS FILE ASSOCIATION (WINDOWS/LINUX)
========================================================= */

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    // This runs if the user double-clicks a file while the app is already open
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
            
            // Find the .onestate file in the arguments
            const fileArg = commandLine.find(arg => arg.endsWith('.onestate'));
            if (fileArg && fs.existsSync(fileArg)) {
                try {
                    const content = fs.readFileSync(fileArg, 'utf8');
                    mainWindow.webContents.send('open-file-content', content);
                } catch (e) {
                    console.error("Failed to read .onestate file");
                }
            }
        }
    });

    // Check args when the app is completely closed
    const initialFileArg = process.argv.find(arg => arg.endsWith('.onestate'));
    if (initialFileArg) {
        fileToOpen = initialFileArg;
    }

    app.whenReady().then(() => {
        app.setAppUserModelId('com.linkstate.browser');
        createWindow();

        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow();
            }
        });
    });
}

/* =========================================================
   DOWNLOAD ACTIONS (PAUSE, RESUME, CANCEL) & FILE LOCATION
========================================================= */
ipcMain.on('download-action', (event, { action, filename }) => {
    const item = activeDownloads.get(filename);
    if (item) {
        if (action === 'pause') item.pause();
        else if (action === 'resume') item.resume();
        else if (action === 'cancel') {
            item.cancel();
            activeDownloads.delete(filename);
        }
    }
});

ipcMain.on('open-file-location', (event, filename) => {
    const fullPath = path.join(app.getPath('downloads'), filename);
    if (fs.existsSync(fullPath)) {
        shell.showItemInFolder(fullPath);
    } else {
        // Fallback: just opens the downloads folder if the file was moved
        shell.openPath(app.getPath('downloads'));
    }
});

/* =========================================================
   CREATE MAIN WINDOW
========================================================= */

function createWindow() {

    mainWindow = new BrowserWindow({
        width: 1300,
        height: 820,
        minWidth: 760,
        minHeight: 560,

        // POINTS TO YOUR ICON IN THE BUILD FOLDER
        icon: path.join(__dirname, '../build/icon.ico'),

        backgroundColor: '#090a0a',
        title: 'LINKSTATE Browser',
        show: false,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false,
            webviewTag: true
        }
    });

    Menu.setApplicationMenu(null);
    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        
        // Push file data to the UI if opened via double click when app was closed
        if (fileToOpen && fs.existsSync(fileToOpen)) {
            try {
                const content = fs.readFileSync(fileToOpen, 'utf8');
                mainWindow.webContents.send('open-file-content', content);
            } catch (e) {
                console.error("Failed to read .onestate file");
            }
        }
    });

    // =====================================================
    // TRACK STANDARD WEB DOWNLOADS
    // =====================================================
    mainWindow.webContents.session.on('will-download', (event, item) => {
        const fileName = item.getFilename();
        const startTime = Date.now();
        
        // Store item so we can control it
        activeDownloads.set(fileName, item);
        
        if (mainWindow) {
            mainWindow.webContents.send('download-started', fileName);
        }
        
        item.on('updated', (event, state) => {
            if (mainWindow) {
                mainWindow.webContents.send('download-progress', {
                    filename: fileName,
                    received: item.getReceivedBytes(),
                    total: item.getTotalBytes(),
                    startTime: startTime,
                    state: state // 'progressing' or 'interrupted'
                });
            }
        });
        
        item.once('done', (event, state) => {
            activeDownloads.delete(fileName);
            
            if (state === 'completed' && mainWindow) {
                mainWindow.webContents.send('download-completed', fileName);
            } else if (state === 'cancelled' && mainWindow) {
                mainWindow.webContents.send('download-cancelled', fileName);
            }
        });
    });

    mainWindow.webContents.setWindowOpenHandler(() => {
        return { action: 'deny' };
    });

    mainWindow.webContents.on('will-navigate', (event, targetUrl) => {
        const currentUrl = mainWindow.webContents.getURL();
        if (currentUrl && targetUrl !== currentUrl) {
            event.preventDefault();
        }
    });
}

// OS File Association Logic (macOS)
app.on('open-file', (event, filePath) => {
    event.preventDefault();
    if (filePath.endsWith('.onestate')) {
        if (mainWindow && mainWindow.isReadyToShow) {
            try {
                const content = fs.readFileSync(filePath, 'utf8');
                mainWindow.webContents.send('open-file-content', content);
            } catch(e) {}
        } else {
            fileToOpen = filePath;
        }
    }
});

/* =========================================================
   CLOSE APPLICATION
========================================================= */

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});