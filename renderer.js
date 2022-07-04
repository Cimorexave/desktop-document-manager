//rendering file to add functionlaity to the application e.g. front-end
const {ipcRenderer} = require('electron')
const pdf = require('pdf-parse')

// Importing dialog module using remote
//const dialog = electron.remote.dialog;
var uploadFile = document.getElementById('upload');
var textarea = document.getElementById('textarea');
var filepathDOM = document.getElementById('filepath');
var numbOfPages = document.getElementById('numbofpages')
//var convertBtn = document.getElementsByClassName('convertBtn');
const state = {
  fileIsUploaded: false
}

//upon clicking upload file, request the file from the main process
uploadFile.addEventListener('click', () => {
	ipcRenderer.send('file-request');
  });
  
  //upon receiving a file, process accordingly
  ipcRenderer.on('text', (event, text) => {
    state.fileIsUploaded = true;
	//console.log('recieved data from the main process:', text)
	textarea.innerHTML = text;
  })

  ipcRenderer.on('data', (event, data) => {
    state.fileIsUploaded = true;
    console.log('recieved data from the main process:', data)
    numbOfPages.innerText = data.numpages;
  })

  ipcRenderer.on('filepath', (event, filepath) => {
    state.fileIsUploaded = true;
    console.log('recieved data from the main process:', filepath)
    filepathDOM.innerText = filepath;
  })