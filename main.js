const { app, BrowserWindow, ipcMain, Menu, globalShortcut, shell } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');
const fs = require('fs');

// Constants for default window settings
const DEFAULT_WIDTH = 1024;
const DEFAULT_HEIGHT = 768;
const appDataPath = app.getPath('userData');
const windowStateFile = path.join(appDataPath, 'windowState.json');

// Global variables for windows
let ver = app.getVersion();
let win;
let splash;
let aboutWindow;


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

// Create about window
function createAboutWindow() {
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
    }
  });

  aboutWindow.loadFile('about.html');
  ipcMain.on('close-window', () => {
    aboutWindow.close();
  });
}



function createNotebookWindow() {
  aboutWindow = new BrowserWindow({
    title: 'Personal Notebook >',
    icon: path.join(__dirname, 'assets', 'icons', 'app-icon.png'),
    width: 1024,
    height: 768,
    hasShadow: true,
    darkTheme: true,
    visualEffectState: 'active',
    titleBarOverlay: true,
    center: true,
    resizable: true,
    frame: true,
    autoHideMenuBar: true,
    roundedCorners: true
  });

  aboutWindow.loadFile('notebook.html');
  ipcMain.on('close-window', () => {
    aboutWindow.close();
  });
}



ipcMain.on('open-notebook-window', () => {
  createNotebookWindow();
});









// Create main window
function createMainWindow() {
  let initialState = {};

  // Load initial state from file if it exists
  if (fs.existsSync(windowStateFile)) {
    try {
      initialState = JSON.parse(fs.readFileSync(windowStateFile));
    } catch (err) {
      console.error('Failed to read window state file:', err);
      initialState = {}; // Fallback to empty state
    }
  }

  win = new BrowserWindow({
    // Basic window settings
    title: 'Domcell 10',
    icon: path.join(__dirname, 'assets', 'icons', 'app-icon.png'),
    show: false, // Start hidden until ready

    // Appearance and behavior
    hasShadow: true,
    darkTheme: true,
    visualEffectState: 'active',
    titleBarOverlay: true,
    allowRunningInsecureContent: false,
    navigateOnDragDrop: true,

    // Window size and position
    width: initialState.width || DEFAULT_WIDTH,
    height: initialState.height || DEFAULT_HEIGHT,
    minWidth: DEFAULT_WIDTH,
    minHeight: DEFAULT_HEIGHT,
    x: initialState.x,
    y: initialState.y,

    // Web preferences for security
    webPreferences: {
      nodeIntegration: false, // Disable Node integration
      contextIsolation: true, // Enable context isolation
      enableRemoteModule: false, // Disable remote module
      preload: path.join(__dirname, 'preload.js'), // Preload script for secure access
    },
  });

  // Load the main content file
  win.loadFile(path.join(__dirname, 'gettingstarted-new.html'));

  // Show the window once ready to avoid flickering
  win.once('ready-to-show', () => {
    setTimeout(() => {
      if (splash && !splash.isDestroyed()) {
        splash.close();
      }
      win.show();
    }, 3500); // 3 seconds delay
  });

  // Save the window state when closing
  win.on('close', () => {
    const windowState = {
      width: win.getBounds().width,
      height: win.getBounds().height,
      x: win.getBounds().x,
      y: win.getBounds().y,
    };
    fs.writeFileSync(windowStateFile, JSON.stringify(windowState));
  });

  // Handle console messages to filter specific warnings
  win.webContents.on('console-message', (event, level, message, line, sourceId) => {
    if (message.includes("'Autofill.enable' wasn't found")) {
      event.preventDefault();
    }
  });

  // IPC handlers for opening URLs externally
  ipcMain.on('open-url', (event, url) => {
    shell.openExternal(url);
  });
}

// IPC handler for app version
ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

// Function to go to the home page
function goHomePage() {
  win.loadFile(path.join(__dirname, 'gettingstarted-new.html'));
}

// Function to send a feature request
function sendFeatureRequest() {
  shell.openExternal(`mailto:dom.ricciardi@pcrichard.com?Subject=Feature Request For Domcell ${ver}&body=I am Using App Version ${ver}`);
}

// Function to open the GitHub page
function openGithubPage() {
  shell.openExternal('https://github.com/domricciardiphoto/Domcell');
}

// App ready event
app.on('ready', () => {
  createSplashScreen();
  createMainWindow();
  autoUpdater.checkForUpdatesAndNotify();
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  // Register global shortcuts
  globalShortcut.register('CTRL+Delete', () => win.reload());

  globalShortcut.register('F11', () => {
    if (win) {
      const isFullScreen = win.isFullScreen();
      win.setFullScreen(!isFullScreen);
      Menu.setApplicationMenu(isFullScreen ? mainMenu : null); // Hide menu when entering fullscreen
    }
  });
});

// Check for macOS platform
const isMac = process.platform === 'darwin';

// Define the application menu
const menu = [
  ...(isMac ? [{
    label: 'DOMCELL',
    submenu: [{
        role: 'services'
      },
      {
        type: 'separator'
      },
      { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
      { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
      { type: "separator" },
      { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
      { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
      { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
      { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" },
      {
        type: 'separator'
      },
      {
        role: 'hide'
      },
      {
        role: 'hideothers'
      },
      {
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        role: 'quit'
      }
    ]
  }] : []),

  {
    label: 'Tools >',
    submenu: [
      {
        label: "Reload Application and Clear",
        role: 'reload'
      },
      {
        role: 'toggleDevTools'
      },
      {
        label: 'Quit',
        accelerator: 'Ctrl+Q',
        click: () => app.quit()
      },
    ]
  },
  {
    role: 'separator'
  },
  {
    label: 'Help >',
    submenu: [{
        label: "Feature Request",
        click: sendFeatureRequest
      },
      {
        label: 'Domcell on Github',
        click: openGithubPage
      }, {
        label: 'About Domcell',
        click: createAboutWindow,
      }
    ]
  },{
    label: 'Personal Notebook',
    click: createNotebookWindow,
  }
];

// Import and use child process for command execution
const { exec } = require('child_process');

// IPC handler for running shell commands
ipcMain.handle('run-command', (event, command) => {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve(stdout);
      }
    });
  });
});

// IPC handler for saving a version
ipcMain.handle('save-version', async (event, { projectId, versionName, content }) => {
  const versionNumber = db.prepare('SELECT IFNULL(MAX(version_number), 0) + 1 AS version_number FROM project_versions WHERE project_id = ?').get(projectId).version_number;
  const stmt = db.prepare('INSERT INTO project_versions (project_id, version_number, version_name, content) VALUES (?, ?, ?, ?)');
  stmt.run(projectId, versionNumber, versionName, content);
  return { message: 'Version saved successfully' };
});

// IPC handler for getting versions
ipcMain.handle('get-versions', async (event, projectId) => {
  const rows = db.prepare('SELECT version_number, version_name, created_at FROM project_versions WHERE project_id = ? ORDER BY version_number DESC').all(projectId);
  return rows;
});

// IPC handler for reverting a version
ipcMain.handle('revert-version', async (event, { projectId, versionNumber }) => {
  const row = db.prepare('SELECT content FROM project_versions WHERE project_id = ? AND version_number = ?').get(projectId, versionNumber);
  return row.content;
});

// IPC handler for clearing versions
ipcMain.handle('clear-versions', async () => {
  db.exec('DELETE FROM project_versions');
  return { message: 'All versions cleared successfully' };
});

// IPC handler for deleting a version
ipcMain.handle('delete-version', async (event, { projectId, versionNumber }) => {
  const stmt = db.prepare('DELETE FROM project_versions WHERE project_id = ? AND version_number = ?');
  stmt.run(projectId, versionNumber);
  return { message: 'Version deleted successfully' };
});

// Handle app closing
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle app activation
app.on('activate', function () {
  if (win === null) {
    createMainWindow();
  }
});
