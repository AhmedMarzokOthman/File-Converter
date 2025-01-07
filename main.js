const { app, BrowserWindow, } = require('electron');
const url = require('url');
const path = require('path');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: "File Converter",
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true, // Enable Node.js integration
            contextIsolation: false,
        },
    });

    // const startUrl = url.format({
    //     pathname: path.join(__dirname, 'index.html'),
    //     protocol: 'file:',
    // });

    mainWindow.loadFile(path.join(__dirname, 'index.html'));
    // mainWindow.loadURL(startUrl);

}

app.whenReady().then(createMainWindow);