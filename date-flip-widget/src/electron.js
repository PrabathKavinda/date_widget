const path = require('path');
const { app, BrowserWindow, Tray, Menu } = require('electron');
const isDev = require('electron-is-dev');

let mainWindow;
let tray;

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
  mainWindow.loadURL(
    isDev 
      ? 'http://localhost:3000' 
      : `file://${path.join(__dirname, 'build/index.html')}`
  );

  // Create system tray icon
  tray = new Tray(path.join(__dirname, 'path/to/icon.png')); // Replace with your icon path
  const contextMenu = Menu.buildFromTemplate([
    { 
      label: 'Show', 
      click: () => mainWindow.show() 
    },
    { 
      label: 'Exit', 
      click: () => app.quit() 
    }
  ]);
  tray.setToolTip('Your Widget Name');
  tray.setContextMenu(contextMenu);

  // Optional: Open DevTools in development
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  // Hide to system tray instead of closing
  mainWindow.on('close', (event) => {
    event.preventDefault();
    mainWindow.hide();
  });
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