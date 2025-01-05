const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const sharp = require('sharp');


function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: "File Converter",
        width: 1200,
        height: 800,
    });

    const startUrl = url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
    });

    mainWindow.loadURL(startUrl);
}

app.whenReady().then(createMainWindow);