//rendering file to add functionlaity to the application e.g. front-end
const electron = require('electron');
const path = require('path');
const {ipcRenderer} = require('electron')
const pdf = require('pdf-parse')
const fs = require('fs')

// Importing dialog module using remote
//const dialog = electron.remote.dialog;

var uploadFile = document.getElementById('upload');
var textarea = document.getElementById('textarea')

//upon clicking upload file, request the file from the main process
uploadFile.addEventListener('click', () => {
	ipcRenderer.send('file-request');
  });
  
  //upon receiving a file, process accordingly
  ipcRenderer.on('file', (event, file) => {
	console.log('obtained file from main process: ' + file);
	let dataBuffer = fs.readFileSync(file)
	pdf(dataBuffer).then((data)=>{
		console.log(data)
		textarea.innerText = data.text
	})
  });

/*
// Defining a Global file path Variable to store
// user-selected file
global.filepath = undefined;

uploadFile.addEventListener('click', () => {
// If the platform is 'win32' or 'Linux'
	if (process.platform !== 'darwin') {
		// Resolves to a Promise<Object>
		dialog.showOpenDialog({
			title: 'Select the File to be uploaded',
			defaultPath: path.join(__dirname, '../assets/'),
			buttonLabel: 'Upload',
			// Restricting the user to only Text Files.
			filters: [
				{
					name: 'Text Files',
					extensions: ['txt', 'docx']
				}, ],
			// Specifying the File Selector Property
			properties: ['openFile']
		}).then(file => {
			// Stating whether dialog operation was
			// cancelled or not.
			console.log(file.canceled);
			if (!file.canceled) {
			// Updating the GLOBAL filepath variable
			// to user-selected file.
			global.filepath = file.filePaths[0].toString();
			console.log(global.filepath);
			}
		}).catch(err => {
			console.log(err)
		});
	}
	else {
		// If the platform is 'darwin' (macOS)
		dialog.showOpenDialog({
			title: 'Select the File to be uploaded',
			defaultPath: path.join(__dirname, '../assets/'),
			buttonLabel: 'Upload',
			filters: [
				{
					name: 'Text Files',
					extensions: ['txt', 'docx']
				}, ],
			// Specifying the File Selector and Directory
			// Selector Property In macOS
			properties: ['openFile', 'openDirectory']
		}).then(file => {
			console.log(file.canceled);
			if (!file.canceled) {
			global.filepath = file.filePaths[0].toString();
			console.log(global.filepath);
			}
		}).catch(err => {
			console.log(err)
		});
	}
});
*/