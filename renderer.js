//rendering file to add functionlaity to the application e.g. front-end
const {ipcRenderer} = require('electron')
const pdf = require('pdf-parse')

// Importing dialog module using remote
//const dialog = electron.remote.dialog;
var uploadFile = document.getElementById('upload');
var textarea = document.getElementById('textarea');
//var convertBtn = document.getElementsByClassName('convertBtn');


//upon clicking upload file, request the file from the main process
uploadFile.addEventListener('click', () => {
	ipcRenderer.send('file-request');
  });
  
  //upon receiving a file, process accordingly
  ipcRenderer.on('text', (event, text) => {
	console.log('recieved data from the main process:', text)
	textarea.innerHTML = text;
  })
  /*
  ipcRenderer.on('file', (event, file) => {
	console.log('obtained file from main process: ' + file);
  });
*/