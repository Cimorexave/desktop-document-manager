//rendering file to add functionlaity to the application e.g. front-end

const {dialog } = require('electron');

const  selectBtn = document.querySelector('.selectFile')
selectBtn.addEventListener("click", chooseFile)
 const chooseFile = (event) => {
    console.log('clicked select file')
    dialog.showOpenDialogSync(mainWindow, {
        properties: ['openFile', 'openDirectory']
      }, function (file) {
        if (file !== undefined) {
            // handle files

        }})
 }