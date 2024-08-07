const { app, BrowserWindow, ipcMain, Menu, globalShortcut, shell } = require('electron');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');
const path = require('path');
const fs = require('fs');

// Setup logging
log.transports.file.resolvePath = () => path.join(app.getPath('logs'), 'main.log');

// Define paths and variables
const appDataPath = app.getPath('userData');
const windowStateFile = path.join(appDataPath, 'windowState.json');
let win;
let splash;
let aboutWindow;
let mobileOnlyWindow;
let tabletOnlyWindow;
let whatsNewWindow;


// Helper function to save window state
function saveWindowState(window) {
  const windowState = {
    width: window.getBounds().width,
    height: window.getBounds().height,
    x: window.getBounds().x,
    y: window.getBounds().y,
  };
  fs.writeFileSync(windowStateFile, JSON.stringify(windowState));
}

// Create splash screen
function createSplashScreen() {
  splash = new BrowserWindow({
    width: 1091,
    height: 300,
    frame: false, // Make the window frameless
    alwaysOnTop: true,
    transparent: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  splash.loadFile(path.join(__dirname, 'splash.html'));
}

// Create main window
function createMainWindow() {
  let initialState = {};

  if (fs.existsSync(windowStateFile)) {
    try {
      initialState = JSON.parse(fs.readFileSync(windowStateFile));
    } catch (err) {
      log.error('Failed to read window state file:', err);
    }
  }

  try {
    const newWindow = new BrowserWindow({
      title: 'Domcell 10',
      icon: path.join(__dirname, 'assets', 'icons', 'app-icon.png'),
      hasShadow: true,
      darkTheme: true,
      visualEffectState: 'active',
      titleBarOverlay: true,
      allowRunningInsecureContent: false,
      navigateOnDragDrop: true,
      width: initialState.width || 1024,
      height: initialState.height || 768,
      minWidth: 1024,
      minHeight: 768,
      x: initialState.x,
      y: initialState.y,
      show: false, // Start hidden
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: false,
        preload: path.join(__dirname, 'preload.js'),
      },
    });

    newWindow.loadFile(path.join(__dirname, 'gettingstarted-new.html'));

    newWindow.on('ready-to-show', () => {
      setTimeout(() => {
        try {
          if (splash && !splash.isDestroyed()) { // Check if splash is not destroyed
            splash.close();
          }
          newWindow.show();
        } catch (error) {
          log.error('Error during splash screen transition:', error);
        }
      }, 3000); // Delay duration
    });

    newWindow.on('close', () => saveWindowState(newWindow));

    newWindow.webContents.on('console-message', (event, level, message) => {
      if (message.includes("'Autofill.enable' wasn't found")) {
        event.preventDefault();
      }
    });

    return newWindow; // Return the created window instance
  } catch (error) {
    log.error('Error creating main window:', error);
  }
}

// Create other windows
function createAboutWindow() {
  try {
    aboutWindow = new BrowserWindow({
      title: 'About Domcell',
      icon: path.join(__dirname, 'assets', 'icons', 'app-icon.png'),
      width: 500,
      height: 550,
      hasShadow: true,
      darkTheme: true,
      visualEffectState: 'active',
      titleBarOverlay: true,
      titleBarStyle: 'hidden',
      alwaysOnTop: true,
      center: true,
      resizable: false,
      frame: false,
      autoHideMenuBar: true,
      roundedCorners: true,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js'),
      },
    });

    aboutWindow.loadFile(path.join(__dirname, 'about.html'));

    ipcMain.on('close-window', () => {
      aboutWindow.close();
    });
  } catch (error) {
    log.error('Error creating about window:', error);
  }
}

function createMobileOnlyWindow() {
  try {
    mobileOnlyWindow = new BrowserWindow({
      title: 'Mobile P.C. Richard & Son',
      width: 390,
      height: 844,
      hasShadow: true,
      resizable: false,
      titleBarOverlay: false,
      autoHideMenuBar: true,
      roundedCorners: true,
    });
    mobileOnlyWindow.loadURL('https://www.pcrichard.com');
  } catch (error) {
    log.error('Error creating mobile-only window:', error);
  }
}

function createTabletOnlyWindow() {
  try {
    tabletOnlyWindow = new BrowserWindow({
      title: 'Tablet P.C. Richard & Son',
      width: 768,
      height: 1024,
      hasShadow: true,
      resizable: false,
      titleBarOverlay: false,
      autoHideMenuBar: true,
      roundedCorners: true,
    });
    tabletOnlyWindow.loadURL('https://www.pcrichard.com');
  } catch (error) {
    log.error('Error creating tablet-only window:', error);
  }
}

function createWhatsNewWindow() {
  try {
    whatsNewWindow = new BrowserWindow({
      title: 'What\'s New in Domcell',
      icon: path.join(__dirname, 'assets', 'icons', 'app-icon.png'),
      width: 700,
      height: 500,
      hasShadow: true,
      darkTheme: true,
      visualEffectState: 'active',
      titleBarOverlay: true,
      allowRunningInsecureContent: true,
      titleBarStyle: 'hidden',
      alwaysOnTop: true,
      center: true,
      resizable: false,
      frame: false,
      autoHideMenuBar: true,
      roundedCorners: true,
    });

    whatsNewWindow.loadFile(path.join(__dirname, 'release-notes.html'));
  } catch (error) {
    log.error('Error creating what\'s new window:', error);
  }
}

// Function to open external links
function openExternalLink(url) {
  try {
    shell.openExternal(url);
  } catch (error) {
    log.error('Error opening external link:', error);
  }
}

// Application lifecycle events
app.on('ready', () => {
  try {
    app.commandLine.appendSwitch('enable-accelerated-2d-canvas');
    app.commandLine.appendSwitch('enable-gpu-rasterization');
    app.commandLine.appendSwitch('ignore-gpu-blacklist');
    app.commandLine.appendSwitch('enable-webgl');
    app.commandLine.appendSwitch('disable-software-rasterizer');

    createSplashScreen();
    win = createMainWindow(); // Create the initial main window

    autoUpdater.checkForUpdatesAndNotify();

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

    if (!globalShortcut.register('CTRL+Delete', () => win.reload())) {
      log.error('CTRL+Delete shortcut registration failed.');
    }

    if (!globalShortcut.register('F11', () => {
      if (win) {
        const isFullScreen = win.isFullScreen();
        win.setFullScreen(!isFullScreen);
        Menu.setApplicationMenu(isFullScreen ? mainMenu : null); // Hide menu when entering fullscreen
      }
    })) {
      log.error('F11 shortcut registration failed.');
    }
  } catch (error) {
    log.error('Error during app initialization:', error);
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    win = createMainWindow();
  }
});

// AutoUpdater events
autoUpdater.on('update-available', () => log.info('Update available.'));
autoUpdater.on('update-not-available', () => log.info('Update not available.'));
autoUpdater.on('error', (err) => log.error('Error in auto-updater:', err));
autoUpdater.on('download-progress', (progressTrack) => log.info('Download progress:', progressTrack));
autoUpdater.on('update-downloaded', () => log.info('Update downloaded.'));

// IPC Handlers
ipcMain.handle('run-command', (event, command) => {
  return new Promise((resolve, reject) => {
    require('child_process').exec(command, (err, stdout) => {
      if (err) {
        reject(err);
      } else {
        resolve(stdout);
      }
    });
  });
});

// Menu template
const isMac = process.platform === 'darwin';
const menuTemplate = [
  ...(isMac ? [{
    label: 'DOMCELL',
    submenu: [
      { role: 'services' },
      { type: 'separator' },
      { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
      { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
      { type: 'separator' },
      { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
      { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
      { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
      { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' },
    ],
  }] : []),
  { label: 'Home', click: () => win.loadFile(path.join(__dirname, 'gettingstarted.html')) },
  { type: 'separator' },
  {
    label: 'Tools >',
    submenu: [
      // { label: 'Open Additional Window', click: createMainWindow }, // Use function to open additional windows
      { label: 'Reload Application and Clear', role: 'reload' },
      { label: 'Open Google Browser', click: () => openExternalLink('http://www.google.com') },
      { role: 'toggleDevTools' },
      { label: 'Quit', accelerator: 'Ctrl+Q', click: () => app.quit() },
    ],
  },
  { type: 'separator' },
  {
    label: 'PCR Staging and CMS >',
    submenu: [
      {
        label: 'Links To CMS',
        submenu: [
          { label: 'SALESFORCE (STAGING)', click: () => openExternalLink('https://staging-na01-pcrichard.demandware.net/on/demandware.store/Sites-Site/default/ViewApplication-DisplayWelcomePage') },
          { label: 'SALESFORCE (DEV)', click: () => openExternalLink('https://development-na01-pcrichard.demandware.store/Sites-Site/default/ViewApplication-DisplayWelcomePage') },
          { label: 'EFFECTUS PIM', click: () => openExternalLink('https://pcr.effectuspartners.com/login') },
        ],
      },
      {
        label: 'Staging Sites',
        submenu: [
          { label: 'PCR STAGING', click: () => openExternalLink('https://storefront:PCRS2021@staging-na01-pcrichard.demandware.net') },
          { label: 'PCR DEVELOPMENT', click: () => openExternalLink('https://sfccdev.pcrichard.com/') },
        ],
      },
    ],
  },
  { type: 'separator' },
  {
    label: 'Viewers of PCR Site >',
    submenu: [
      { label: 'View: Mobile PCR', click: createMobileOnlyWindow },
      { label: 'View: Tablet PCR', click: createTabletOnlyWindow },
    ],
  },
  { type: 'separator' },
  {
    label: 'Help >',
    submenu: [
      { label: "What's New!", click: createWhatsNewWindow },
      { label: 'Feature Request', click: () => openExternalLink(`mailto:dom.ricciardi@pcrichard.com?Subject=Feature Request For Domcell ${app.getVersion()}&body=I am Using App Version ${app.getVersion()}`) },
      { label: 'Domcell on Github', click: () => openExternalLink('https://github.com/domricciardiphoto/Domcell') },
      { label: 'About Domcell', click: createAboutWindow },
    ],
  },
];