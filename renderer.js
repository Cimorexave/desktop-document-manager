//rendering file to add functionlaity to the application e.g. front-end
const {ipcRenderer} = require('electron')

// Importing dialog module using remote
//const dialog = electron.remote.dialog;
const uploadFile = document.getElementById('upload');
const textarea = document.getElementById('textarea');
const filepathDOM = document.getElementById('filepath');
const numbOfPages = document.getElementById('numbofpages')
const metaData = document.getElementById('metadata')
const preview = document.getElementById('preview')
const clearBtn = document.getElementById('clear')
const saveBtn = document.getElementById('saveAs')
//var convertBtn = document.getElementsByClassName('convertBtn');
const state = {
  fileIsUploaded: false
}
if (!state.fileIsUploaded) metaData.style.display = 'none'
preview.style.display = 'none'

//by clicking the clear button the file will be removed
clearBtn.addEventListener('click', () => {
  preview.style.display = 'none';
  textarea.innerHTML = '';
  state.fileIsUploaded = false;
  metaData.style.display = 'none';
  textarea.style.width = '500px';
  textarea.style.height = '300px';
})
//upon clicking upload file, request the file from the main process
uploadFile.addEventListener('click', () => {
	ipcRenderer.send('file-request');
  });

  //upon clicking save button request the path from the main process
  saveBtn.addEventListener('click', () => {
    ipcRenderer.send('path-request')
  })

  
  
  //upon receiving a file, process accordingly
  ipcRenderer.on('text', (event, text) => {
    state.fileIsUploaded = true;
    metaData.style.display = 'block'
	//console.log('recieved data from the main process:', text)
	textarea.innerHTML = text;
  })

  ipcRenderer.on('data', (event, data) => {
    state.fileIsUploaded = true;
    metaData.style.display = 'block'
    console.log('recieved data from the main process:', data)
    numbOfPages.innerText = data.numpages;
  })

  ipcRenderer.on('filepath', (event, filepath) => {
    state.fileIsUploaded = true;
    metaData.style.display = 'block'
    console.log('recieved data from the main process:', filepath)
    console.log(filepath.length)
    filepathDOM.innerText = filepath;

    //putting the pdf file into preview
    preview.style.display = 'block';
    preview.style.width = '500px';
    preview.style.height = '690px';
    preview.src = filepath;

  })

  ipcRenderer.on('dataBuffer', (event, dataBuffer) => {
    state.fileIsUploaded = true;
    metaData.style.display = 'block'
    console.log('recieved data from the main process:', dataBuffer)
  })