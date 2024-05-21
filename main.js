const {app, BrowserWindow, ipcMain, Menu, globalShortcut, shell,} = require('electron')

const {autoUpdater} = require('electron-updater');

const log = require('electron-log');
const path = require('path')
const ipc = ipcMain;


const fs = require('fs');
const appDataPath = app.getPath('userData');
const windowStateFile = path.join(appDataPath, 'windowState.json');

log.transports.file.resolvePath = () => path.join('logs/main.log');
let ver = app.getVersion()
log.log("Application version " + ver)
let win;
let aboutWindow;
let mobileonly;
let tabletonly;
let whatsnewpage;
let howtoospage;
let createhtmlminiferpage;
let createbannerpage21;
let BadgeBuilderpage;
let createmenubuilder21
let createbeta





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
  let initialState = {};

  if (fs.existsSync(windowStateFile)) {
    try {
      initialState = JSON.parse(fs.readFileSync(windowStateFile));
    } catch (err) {
      console.error('Failed to read window state file:', err);
    }
  }

  win = new BrowserWindow({
    title: 'Domcell 9',
    icon: path.join(__dirname, 'assets', 'icons', 'app-icon.png'),
    hasShadow: true,
    darkTheme: true,
    visualEffectState: 'active',
    titleBarOverlay: true,
    allowRunningInsecureContent: true,
    navigateOnDragDrop: true,
    width: initialState.width || 1368, // Use saved dimensions if available
    height: initialState.height || 912,
    minWidth: 1024,
    minHeight: 768,
    x: initialState.x,
    y: initialState.y,

    webPreferences: {
      nodeIntegration:true,
      contextIsolation:false, 
      devTools:true,
    }

  })




  win.loadFile(path.join(__dirname, 'gettingstarted.html'))



 

  // Save window state on close
  win.on('close', () => {
    const windowState = {
      width: win.getBounds().width,
      height: win.getBounds().height,
      x: win.getBounds().x,
      y: win.getBounds().y
    };
    fs.writeFileSync(windowStateFile, JSON.stringify(windowState));
  });




  ipcMain.on('open-url', (event, url) => {
    shell.openExternal(url);
  });

 
  
}


ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});




 

function createhtmlminifer() {

  createhtmlminiferpage = new BrowserWindow({
    title: 'HTML MINIFER',
    hasShadow: true,
    darkTheme: true,
    visualEffectState: 'active',
    center: true,
    autoHideMenuBar: true,
    roundedCorners: true,
    width: 1200,
    height: 1000,
  })

  createhtmlminiferpage.loadURL('https://www.willpeavy.com/tools/minifier/')

}



function createseotopcontent() {
  win.loadFile(path.join(__dirname, 'tool-topcopybuilder.html'))
}


function createbannerschedular() {

  createbannerpage21 = new BrowserWindow({
    title: 'Banner Scheduler',
    hasShadow: true,
    darkTheme: true,
    visualEffectState: 'active',
    center: true,
    autoHideMenuBar: true,
    roundedCorners: true,
    width: 1200,
    height: 1000,
  })

  createbannerpage21.loadFile('bannersheduler.html')

}

function createmenubuilder() {

  createmenubuilder21 = new BrowserWindow({
    title: 'Round Menu Builder',
    hasShadow: true,
    darkTheme: true,
    visualEffectState: 'active',
    center: true,
    autoHideMenuBar: true,
    roundedCorners: true,
    webPreferences: {
      nodeIntegration:true,
      contextIsolation:false, 
    },
    width: 1200,
    height: 1000,
  })

  createmenubuilder21.loadFile('tool-roundmenu.html')
  
}





function createAboutWindow() {

  aboutWindow = new BrowserWindow({
    title: 'About Domcell',
    icon: `${__dirname}assets/icons/app-icon.png`,
    width: 500,
    height: 500,
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
      nodeIntegration:true,
      contextIsolation:false, 
  }
  })


  aboutWindow.loadFile('about.html')
  ipcMain.on('close-window', () => {
    aboutWindow.close();
})

}


function whatsnew() {
  whatsnewpage = new BrowserWindow({

    title: 'Whats New in Domcell',
    icon: `${__dirname}assets/icons/app-icon.png`,
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
    
  }),
  whatsnewpage.loadFile('release-notes.html')
}



function howtoos() {
  howtoospage = new BrowserWindow({

    title: 'Domcell How To..',
    icon: `${__dirname}assets/icons/app-icon.png`,
    width: 1000,
    height: 500,
    hasShadow: true,
    darkTheme: true,
    visualEffectState: 'active',
    titleBarOverlay: true,
    allowRunningInsecureContent: true,
    titleBarStyle: 'hidden',
    alwaysOnTop: true,
    center: true,
    frame: false,
    autoHideMenuBar: true,
    roundedCorners: true
  }),
  howtoospage.loadFile('howtoo.html')
}


function fullscreenOverviewcontent() {
  Overviewcontentpage = new BrowserWindow({
    title: 'Overview Content',
    hasShadow: true,
    darkTheme: true,
    width: 1820,
    height: 1080,
    icon: `${__dirname}assets/icons/app-icon.png`,
    autoHideMenuBar: true
  })
  Overviewcontentpage.loadFile('test.html')
}




function fullscreenBadgeBuilder() {
 BadgeBuilderpage = new BrowserWindow({
  title: 'Badge Builder',
  hasShadow: true,
  darkTheme: true,
  width: 1820,
  height: 1080,
  icon: `${__dirname}assets/icons/app-icon.png`,
  autoHideMenuBar: true,
  })
  BadgeBuilderpage.loadFile('tool-badgebuilder-beta.html')
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
  win.loadFile(path.join(__dirname, 'gettingstarted.html')) 
}

function featurerequest() {
  shell.openExternal("mailto:dom.ricciardi@pcrichard.com?Subject=Feature Request For Domcell "+ver+"&body=I am Using App Version "+ver)
}


function addminifertoindex() {
  win.loadFile(path.join(__dirname, 'fullscreen2.html'))
}

function addbadgebuildertoindex() {
  win.loadFile(path.join(__dirname, 'tool-badgebuilder.html'))
}

function addOverviewcontenttoindex() {
  win.loadFile(path.join(__dirname, 'test.html'))
}

function addBannerSchedulertoindex() {
  win.loadFile(path.join(__dirname, 'tool-bannersheduler.html'))
}

function videoplayerbuilder() {

  win.loadFile(path.join(__dirname, 'tool-videobuilder.html'))
}


function createMenuWindowtoindex() {
  win.loadFile(path.join(__dirname, 'tool-roundmenu-beta.html'))
}

function createbreadcumb() {
  win.loadFile(path.join(__dirname, 'tool-breadcrumbbuilder.html'))
}


function createbreadcumb2() {
  win.loadFile(path.join(__dirname, 'tool-seo-breadcrumb-builder.html'))
}

function gotogithub() {
  shell.openExternal("https://github.com/domricciardiphoto/Domcell")
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
  globalShortcut.register('CTRL+Delete', () => win.reload())
  //globalShortcut.register('CTRL+D', () => win.toggleDevTools())
  //globalShortcut.register('F1', () => gohome())


  globalShortcut.register('F11', () => {
    if(win) {
      win.setFullScreen(!win.isFullScreen());
    }
  });

})



const isMac = process.platform === 'darwin'



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
    label: 'Home',
    click: gohome
  },
  {
    role: 'separator'
  },

  {
  label:"HTML Builder Tools >",
  submenu:[
{
label:"Product badge Builder",
click: addbadgebuildertoindex
},


{
  label:'Bubble Menu Builder',
  click:createMenuWindowtoindex
},

{
  label:"Breadcumbs Builder",
  click:createbreadcumb
},

{
  label:"Special Catagory Breadcumbs",
  click:createbreadcumb2
},
  

{
  label:"SEO Top Content Builder",
  click: createseotopcontent
},


{
  label:"Banner Scheduler",
  click: addBannerSchedulertoindex
},


{
  label:"Video Player Builder",
  click: videoplayerbuilder
},


{
  role: 'separator'
},


{
  label:"HTML Minifer",
  click: addminifertoindex
},


{
  label:"Webpage Builder (New)",
  click: addOverviewcontenttoindex
},


{
  role: 'separator'
},



{
  label: "Builders in a New Window",
  submenu: [
    {
      label: 'Full Screen: Overview Content',
      click: fullscreenOverviewcontent
    },
  
  
    {
      label: 'Full Screen: Badge Builder',
      click: fullscreenBadgeBuilder
    },
  
    {
      label: "Full Screen: HTML Minifier",
      click: createhtmlminifer
    },
    {
      label: "Full Screen: Banner Scheduler",
      click: createbannerschedular
    },

    

    {
      label: "Full Screen: Menu Builder",
      click: createmenubuilder
    }
  
    
  ]
  },



  ],

  

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


{
  label: "PCR Staging and CMS >",
  submenu: [
    { label: "Links To CMS",
  
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
      label: 'Staging Sites',
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

  ]



},









  {
    role: 'separator'
  },


  {
    label: "Viewers of PCR Site >",
    submenu: [
   
      {
        label: "View: Mobile PCR",
        click: createmobileonly
      },
      

      {
        label: "View: Tablet PCR",
        click: createtabletonly
      },
    ]
  },


  {
    role: 'separator'
  },


 

{
label:'Help >',
submenu: [
  {
    label: "Whats New!",
    click: whatsnew
  },

  {
    label: "Domcell Documentation",
click:howtoos
  },

  {
    label: "Feature Request",
    click: featurerequest
  },

  {
    label: 'Domcell on Github',
    click: gotogithub,
  },
  
 
  {
    label: 'About Domcell',
    click: createAboutWindow,
  }

  


]

}




]



const { exec } = require('child_process');

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