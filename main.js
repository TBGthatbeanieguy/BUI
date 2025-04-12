const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: false, // Recommended for security
      contextIsolation: true, // Recommended for security
      preload: path.join(__dirname, 'preload.js') // Optional: for secure communication
    }
  });

  mainWindow.loadFile('ECX.html'); // Load your HTML file

  // Open DevTools (for debugging)
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});