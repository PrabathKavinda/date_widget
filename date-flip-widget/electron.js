const path = require('path');
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 350,
    height: 600,
    frame: false, // Removes standard window frame
    transparent: true, // Allows transparent background
    alwaysOnTop: true, // Keeps widget on top of other windows
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  // Load the app
  if (isDev) {
    // In development, wait for the React server to be ready
    setTimeout(() => {
      mainWindow.loadURL('http://localhost:3000');
    }, 2000);
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, 'build/index.html')}`);
  }

  // Optional: Open DevTools in development
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
}

app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});