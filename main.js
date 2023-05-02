const {app, BrowserWindow} = require('electron')
const path = require('path')
const {autoUpdater} = require('electron-updater');
const log = require('electron-log');
log.transports.file.resolvePath = () => path.join('C:/Users/domin/Desktop/domcell', 'logs/main.log');
log.log("Application version "+ app.getVersion())
log.info("Hello, log");
log.warn("Some problem appears");
let win;

function createWindow() {
  win = new BrowserWindow({width:300 , height:400})
  console.log(path.join(__dirname, 'index.html')) 
  win.loadFile(path.join(__dirname, 'index.html'))
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
  createWindow()
  autoUpdater.checkForUpdatesAndNotify()
})