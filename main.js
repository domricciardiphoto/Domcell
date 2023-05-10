const {app, BrowserWindow, ipcMain, Menu, globalShortcut, shell,} = require('electron')
const {autoUpdater} = require('electron-updater');

const log = require('electron-log');
const path = require('path')
const ipc = ipcMain;

log.transports.file.resolvePath = () => path.join('C:/Users/domin/Desktop/domcell', 'logs/main.log');
let ver = app.getVersion()
log.log("Application version " + ver)
log.log('enable content isolation before build')
let win;
let aboutWindow;
let mobileonly;
let tabletonly;




function createmobileonly() {
  mobileonly = new BrowserWindow({
    title: 'Mobile P.C. Richard & Son',
    width: 390,
    height: 844,
    hasShadow: true,
    resizable: false,
    titleBarOverlay: false,
    autoHideMenuBar: true,
    roundedCorners: true

  })
  mobileonly.loadURL('https://www.pcrichard.com')
}

function createtabletonly() {
  tabletonly = new BrowserWindow({
    title: 'Mobile P.C. Richard & Son',
    width: 768,
    height: 1024,
    hasShadow: true,
    resizable: false,
    titleBarOverlay: false,
    autoHideMenuBar: true,
    roundedCorners: true

  })
  tabletonly.loadURL('https://www.pcrichard.com')
}



function createMainWindow() {
  win = new BrowserWindow({
    title: 'Domcell Badge Builder',
    icon: `${__dirname}assets/icons/app-icon.png`,
    width: 1920,
    height: 1080,
    hasShadow: true,
    darkTheme: true,
    visualEffectState: 'active',
    titleBarOverlay: true,
    allowRunningInsecureContent: true,
    navigateOnDragDrop: true,
    webPreferences: {
      nodeIntegration:true,
      contextIsolation:true, 
      devTools:true,
      preload: path.join(__dirname, 'assets/preload.js')
    }

  })
  win.loadFile(path.join(__dirname, 'intro.html'))

}


function createMainWindow2() {
 win.loadFile(path.join(__dirname, 'contentbuilder.html'))
}

function createMainWindow3() {
  win.loadFile(path.join(__dirname, 'badgebuilder.html'))
 }
 


function createAboutWindow() {

  aboutWindow = new BrowserWindow({
    title: 'About Domcell Badge Builder',
    icon: `${__dirname}assets/icons/app-icon.png`,
    width: 500,
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
    roundedCorners: true

  })


  aboutWindow.loadFile('about.html')

}



function gotogoogle() {
  shell.openExternal("http://www.google.com")
}




function gotostaging() {
  shell.openExternal("https://staging-na01-pcrichard.demandware.net/on/demandware.store/Sites-Site/default/ViewApplication-DisplayWelcomePage")
}

function gotodev() {
  shell.openExternal("https://development-na01-pcrichard.demandware.net/on/demandware.store/Sites-Site/default/ViewApplication-DisplayWelcomePage")
}

function gotopim() {
  shell.openExternal("https://pcr.effectuspartners.com/login")
}




function pcrstaging() {
  shell.openExternal("https://storefront:PCRS2021@staging-na01-pcrichard.demandware.net")
}

function pcrdev() {
  shell.openExternal("https://sfccdev.pcrichard.com/")
}

function gohome() {
  win.loadFile(path.join(__dirname, 'index.html')) 
}




autoUpdater.on("update-available", (info) => {
  log.info("update available")
})

autoUpdater.on("update-not-available", (info) => {
  log.info("update not available")
})

autoUpdater.on('error', (err) => {
  log.info('Error in auto-updater. ' + err)
})


autoUpdater.on("download-progress", (progressTrack) => {
  log.info("\n\ndownload-progress")
  log.info(progressTrack)
})

autoUpdater.on("checking-for-update", () => {
  log.info("checking for update")
})

autoUpdater.on("download-progress", () => {
  log.info("download progress")
})

autoUpdater.on("update-downloaded", () => {
  log.info("update downloaded")
})




app.on('ready', () => {
  createMainWindow()
  autoUpdater.checkForUpdatesAndNotify()
  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(mainMenu)
  globalShortcut.register('CTRL+R', () => mainWindow.reload())
  globalShortcut.register('CTRL+D', () => mainWindow.toggleDevTools())



})





const menu = [

  {
    label: 'Home',
    click: gohome
  },
  {
    role: 'separator'
  },


  {
    label: 'Tools >',
    submenu: [
     


      {
        label: 'Open Additonal Window',
        click: createMainWindow
      },

      {
        label: "Reload Application and Clear",
        role: 'reload'
      },

      {
        role: 'separator'
      },


        {
        label: 'Overview Content Full Screen',
        click: createMainWindow2
      },


      {
        label: 'Badge Builder Full Screen',
        click: createMainWindow3
      },


      {
        role: 'separator'
      },

      {
        label: "Open Google Browser",
        click: gotogoogle,
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

  { label: "Links To CMS >",
  
  submenu: [
{ 
  label: 'SALESFORCE (STAGING)',
  click:  gotostaging
},
{
  label: 'SALESFORCE (DEV)',
  click:  gotodev
},
{
  label: 'EFFECTUS PIM',
  click:  gotopim
}


  ]
  },

  {
    role: 'separator'
  },


  {
    label: 'DEV SITES >',
    submenu: [
{
  label:"PCR STAGING",
  click: pcrstaging,

},
{
  label:"PCR DEVELOPMENT",
  click: pcrdev,
}

    ]

  },

  {
    role: 'separator'
  },


  {
    label: "Mobile / Tablet Viewers of PCR >",
    submenu: [
   
      {
        label: "View Mobile PCR",
        click: createmobileonly
      },
      

      {
        label: "View Tablet PCR",
        click: createtabletonly
      },
    ]
  },


  {
    role: 'separator'
  },


  {
    label: 'About Domcell',
    click: createAboutWindow,
  },






]