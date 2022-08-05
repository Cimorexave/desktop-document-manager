const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require('path');
const fs = require('fs')
const pdf = require('pdf-parse')
const tabula = require('tabula-js')

function createWindow () {
// Create the browser window.
const win = new BrowserWindow({
	width: 900,
	height: 700,
	webPreferences: {
		enableRemoteModule: true,
		nodeIntegration: true,
		contextIsolation: false
	}
})

// Load the index.html of the app.
win.loadFile('./index.html')

// Open the DevTools.
//win.webContents.openDevTools()
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
// Listening the file request channel for a signal and performing the callback function inside it
ipcMain.on('file-request', (event) => {  
	// If the platform is 'win32' or 'Linux'
	if (process.platform !== 'darwin') {
	  // Resolves to a Promise and opens the dailog where you choose your path
	  dialog.showOpenDialog({
		  //the dailog properties
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
		  // if file selection wasn't cancelled; continue:
		if (!file.canceled) {
			// saving the path of the file choosen by user
		  const filepath = file.filePaths[0].toString();
		  console.log(filepath);
			//sending back the file path to the renderer on 'filepath' channel
		  event.reply('filepath', filepath)

		  //tabula-js to csv
			const t = tabula(filepath)
			console.log('CSV extrantion result: ***')
			t.extractCsv((err , data) => console.log(data))



			// Using file system module to read the file
			let dataBuffer = fs.readFileSync(filepath)
			//sending the read file to the renderer on dataBuffer channel
			event.reply('dataBuffer', dataBuffer)
			// Converting the read file to pdf
			pdf(dataBuffer).then((data) => {
				//console.log(data.text)
				//Sending bakc the converted file and it's info to user on renderer
				event.reply('text', data.text)
				event.reply('data', data)
			})
		  //event.reply('file', filepath);
		}  
	  }).catch(err => { //cathcing to see if any errors happened in the process
		console.log(err)
	  });
	} // Doing the same thing for MacOS
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

  // listening on the textarea-text channel for an event from renderer when 
  // the save as button is clicked
  ipcMain.on('textarea-text', (event, args) => {
		//creating a dialog to choose the path to save as
		dialog.showOpenDialog({ // Dialog properties
			title: 'Select the path to be saved',
			defaultPath: path.join(__dirname),
			buttonLabel: 'Select Direcetory',
			// Specifying the File Selector Property
			// Choosing the directory not a file with this property
			properties: ['openDirectory']
		}).then( file => { //promise resolved 
			//continue if choosing directory wasn't cancelled
			if (!file.canceled) {
				//the selected path
				const savePath = file.filePaths[0].toString()
				//writing the content of textarea into a new file
				//catching error / writing the file
				try {
					fs.writeFileSync(path.join(savePath, '/test.txt'), args)
				} catch(err) {
					console.error(err)
				}
				
			}
		})
  })
