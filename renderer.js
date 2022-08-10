 //rendering file to add functionlaity to the application e.g. front-end user interface
 //importing the ipc for the renderer
const {ipcRenderer} = require('electron')

// selecting the elements from DOM interface index.html
const uploadFile = document.getElementById('upload');
const textarea = document.getElementById('textarea');
const filepathDOM = document.getElementById('filepath');
const numbOfPages = document.getElementById('numbofpages')
const metaData = document.getElementById('metadata')
const preview = document.getElementById('preview')
const clearBtn = document.getElementById('clear')
const saveBtn = document.getElementById('save')

// This state object doesn't play a role in the programm but was made for tracking the development process to be made easier 
// you can ignore it every time you see it in the code!
const state = {
  fileIsUploaded: false
}
if (!state.fileIsUploaded) metaData.style.display = 'none'
preview.style.display = 'none'
clearBtn.style.display = 'none'

//by clicking the clear button the file will be removed
clearBtn.addEventListener('click', () => {
  //removing elements that aren't needed from displaying on the interface
  //emptying the result textarea
  //tuning the textarea size to it's initial smaller size
  preview.style.display = 'none';
  textarea.innerHTML = '';
  saveBtn.style.display = 'none';
  state.fileIsUploaded = false;
  metaData.style.display = 'none';
  textarea.style.width = '500px';
  textarea.style.height = '300px';
  clearBtn.style.display = 'none';
})
//upon clicking upload file, request the file from the main process
uploadFile.addEventListener('click', () => {
  //sending a signal to the main process when the upload button is clicked
  //this signal is sent on the channel 'file-request' without any files.
  //Just a sign which tells the main process to start doing it's thing.
	ipcRenderer.send('file-request');
  });
  
  ipcRenderer.on('html', (event, html) => {
    textarea.innerHTML = html;
  })
  //upon receiving a file, process accordingly
  ipcRenderer.on('text', (event, text) => {
    state.fileIsUploaded = true;
    metaData.style.display = 'block'
	//console.log('recieved data from the main process:', text)
	  textarea.innerHTML = text;
    saveBtn.style.display = 'block'
    clearBtn.style.display = 'block'
  })
// Listening on the 'data' channel form the main process and resolving the callback function inside
  ipcRenderer.on('data', (event, data) => {
    state.fileIsUploaded = true;
	  // Showing file data on DOM and displaying other elements
    metaData.style.display = 'block'
    clearBtn.style.display = 'block'
    console.log('recieved data from the main process:', data)
    numbOfPages.innerText = data.numpages;
  })
// Listening on the 'filepath' channel for the file path choosen by the user and sent from main.js
  ipcRenderer.on('filepath', (event, filepath) => {
    state.fileIsUploaded = true;
	  // Showing file data on DOM and displaying other elements
    metaData.style.display = 'block'
    clearBtn.style.display = 'block'
    console.log('recieved data from the main process:', filepath)
    console.log(filepath.length)
	  //Displaying file path on the interface
    filepathDOM.innerText = filepath;

    // Displaying the pdf file in the preview
    preview.style.display = 'block';
    preview.style.width = '500px';
    preview.style.height = '690px';
    preview.src = filepath;

  })
// Listening on dataBuffer channel 
  ipcRenderer.on('dataBuffer', (event, dataBuffer) => {
    state.fileIsUploaded = true;
	  // Displaying assets accordingly 
    clearBtn.style.display = 'block'
    metaData.style.display = 'block'
    console.log('recieved data from the main process:', dataBuffer)
  })

  //listening on a click for saving button
  saveBtn.addEventListener('click', () => {
    //sending a request to main.js and the converted text from the text are on the textarea-text channel to save it as a file
    ipcRenderer.send('textarea-text', textarea.innerHTML)
  })
