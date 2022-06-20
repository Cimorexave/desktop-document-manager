// running script
console.log("app initalized...")

//importing modules

//electron modules to create a windoe and initialize the application
const { app, BrowserWindow } = require('electron')
//using path module to load the preload.js file
const path = require('path')

// creating the application window and it's base properties
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  // reading the web dom for the window
  win.loadFile('index.html')
}
// telling the app to creat the app window only when the app ready promise is fulfilled
 app.whenReady().then(() => {
    createWindow()
  })
//closing the app on exit 
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  
