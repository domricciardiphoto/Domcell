const {app, BrowserWindow, Menu, globalShortcut, shell , Notification} = require('electron')
const path = require('path')
const {autoUpdater} = require('electron-updater');
const log = require('electron-log');
log.transports.file.resolvePath = () => path.join('C:/Users/domin/Desktop/domcell', 'logs/main.log');
log.log("Application version "+ app.getVersion())
log.info("When is a raven like a writting desk?");
let win;
let aboutWindow


//Send Notification
function notifyUser(options) {
  new Notification(options.title , options)
}



function createMainWindow() {
  win = new BrowserWindow({
    title: 'Domcell Badge Builder',
    title: 'Domcell Badge Builder',
    icon: `${__dirname}assets/icons/app-icon.png`,
    width: 1920,
    height: 1080,
    hasShadow: true,
    darkTheme: true,
    visualEffectState: 'active',
    titleBarOverlay: true,
    allowRunningInsecureContent: true,
    navigateOnDragDrop:true,

  })
  console.log(path.join(__dirname, 'index.html')) 
  win.loadFile(path.join(__dirname, 'index.html'))
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
   center:true,
   resizable:false,
   frame:false,
   autoHideMenuBar:true,
   roundedCorners:true

  })
  aboutWindow.loadFile('about.html')

}



function gotogoogle() {
  shell.openExternal("http://www.google.com")
}








autoUpdater.on("update-available" , (info) => {
  log.info("update available")
})

autoUpdater.on("update-not-available" , (info) => {
  log.info("update not available")
})

autoUpdater.on('error' , (err) => {
  log.info('Error in auto-updater. ' + err)
})


autoUpdater.on("download-progress" , (progressTrack) => {
log.info("\n\ndownload-progress")
log.info(progressTrack)
})

autoUpdater.on("checking-for-update" , () => {
  log.info("checking for update")
})

autoUpdater.on("download-progress" , () => {
  log.info("download progress")
})

autoUpdater.on("update-downloaded" , () => {
  log.info("update downloaded")
})




app.on('ready' , () => {
  createMainWindow()
  autoUpdater.checkForUpdatesAndNotify()
  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(mainMenu)
  globalShortcut.register('CTRL+R', () => mainWindow.reload())
  globalShortcut.register('CTRL+D', () => mainWindow.toggleDevTools())



})





const menu = [
  {
    role: 'fileMenu'
},

{
role: 'separator'
},


  {
      label: 'Tools',
      submenu: [

       

          {
              label: 'Open Additonal Window',
              click: createMainWindow
          },


          { 
              label:"Reload Window",
              role: 'reload'
          },
          
          {
              role: 'cut'
          },

          {
              role: 'copy'
          },

          {
              role: 'paste'
          },
          
          {
              role: 'toggleDevTools'
          },

          {
              label: "Google",
              click: gotogoogle,
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
              label: 'About',
              click: createAboutWindow,
  },

 
     

]




