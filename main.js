const { app, BrowserWindow } = require('electron')
const path = require('node:path')

function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 1200,
        height: 1000, 
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })

    // and load the index.html of the app.
    win.loadFile('index.html')
    
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') app.quit()
})