const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require('path');
const fs = require('fs')
const pdf = require('pdf-parse')

function createWindow () {
// Create the browser window.
const win = new BrowserWindow({
	width: 800,
	height: 600,
	webPreferences: {
		enableRemoteModule: true,
		nodeIntegration: true,
		contextIsolation: false
	}
})

// Load the index.html of the app.
win.loadFile('./index.html')

// Open the DevTools.
win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// This method is equivalent to 'app.on('ready', function())'
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
// On macOS it is common for applications and their menu bar
// To stay active until the user quits explicitly with Cmd + Q
if (process.platform !== 'darwin') {
	app.quit()
}
})

app.on('activate', () => {
// On macOS it's common to re-create a window in the
// app when the dock icon is clicked and there are no
// other windows open.
if (BrowserWindow.getAllWindows().length === 0) {
	createWindow()
}
})

// Syncing renderer process form creating the dialog


ipcMain.on('file-request', (event) => {  
	// If the platform is 'win32' or 'Linux'
	if (process.platform !== 'darwin') {
	  // Resolves to a Promise<Object>
	  dialog.showOpenDialog({
		title: 'Select the File to be uploaded',
		defaultPath: path.join(__dirname),
		buttonLabel: 'Upload',
		// Restricting the user to only PDF Files.
		filters: [ 
		{ 
		   name: 'PDF Files'
		}, ],
		// Specifying the File Selector Property
		properties: ['openFile']
	  }).then(file => {
		// Stating whether dialog operation was
		// cancelled or not.
		console.log(file.canceled);
		if (!file.canceled) {
		  const filepath = file.filePaths[0].toString();
		  console.log(filepath);
		  event.reply('filepath', filepath)

			let dataBuffer = fs.readFileSync(filepath)
			pdf(dataBuffer).then((data) => {
				console.log(data.text)
				event.reply('text', data.text)
				event.reply('data', data)
			})
		  //event.reply('file', filepath);
		}  
	  }).catch(err => {
		console.log(err)
	  });
	}
	else {
	  // If the platform is 'darwin' (macOS)
	  dialog.showOpenDialog({
		title: 'Select the File to be uploaded',
		defaultPath: path.join(__dirname),
		buttonLabel: 'Upload',
		filters: [ 
		{ 
		   name: 'PDF Files'
		}, ],
		// Specifying the File Selector and Directory 
		// Selector Property In macOS
		properties: ['openFile', 'openDirectory']
	  }).then(file => {
		console.log(file.canceled);
		if (!file.canceled) {
		const filepath = file.filePaths[0].toString();
		console.log(filepath);
		let dataBuffer = fs.readFileSync(filepath)
			pdf(dataBuffer).then((data) => {
				console.log(data.text)
				event.send('text', data.text)
			})
		//event.send('file', filepath);
	  }  
	}).catch(err => {
		console.log(err)
	  });
	}
  });

