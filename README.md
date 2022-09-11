## Electron PDF to text converter

This is a desktop application built by ElectronJS. As the name suggests, upload your pdf file and it will be converted into a text format. 
There is also a preview of your uploaded file. Click the clear button to unload your file.

Technologies and keywords in this project: `Electron` , `Inter Process Communication (IPC) ` , `node-modules` , `DOM manipulation` , `pdf-parse`.

## Test

This project will soon go through procudtion once more features are added and the finall production file will be uploaded here.
Untill then you can use and see the app by following these steps: <br>

1 - download the files of this project to your local machine. (This application is compatible with Mac, Windows & Linux OS.) <br>

2 - cd command line in the root directory of the project and run: 'npm i'. All the dependencies and modules will be installed automatically. Make sure you have node installed on your system. If not, just google nodeJS and download it quickly. (Extract the files and right click to open with visual studio. Then open the vs code integrated terminal or simply hit Contrl+`. In the terminal run the "npm i" command.) <br>
3 - Afterwards, also in the command line, run: 'npm start'. <br>
4 - Enjoy! <br>

## How does it work?

In your development server when you run the application the first entry point or the file that will be read is the main.js file as you can see in the information about the project package.json. <br>
In the main.js file as you can see first there are some packages and modules that are imported and used in the application. You'll see what are they used for later. <br>
Then there is the createWindow funciton which is defined and called immediately afterwards. it's obviously creating the window which is an instance of a browser. inside some properties are defined for it. it's using the BrowserWindow tool procided by default by electron. <br>
After creating the window it's telling it to look for the window's user interface template in the index.html file at line 19. From there you can see the template and interface being defined in that file. <br>
Pay attention that there is another javascript file is connectd to the interface index.html and named renderer.js and it's duty is to manage the interface. <br>
Although JavaScript is single threaded by nature but in the electron template there usually is a pseudo parellel process going on. The main process at main.js 
runs while user interface is handled by the renderer.js file. <br>
These two processes run in parallel to manage the application. Also there is the preload.js script which loads every time the app runs once. It's usually used to load some assets or data or history to handle in multiple use. But not in this case. As you can see I disonnected this script from the main process but didn't delete it. <br>
Heading to the renderer file where the workfow of the application exists you can see the ipcRenderer module imported from electron dependencies then I have selected a bunch of elemnts from the DOM index.html to add functionalities and modifying their stylings. Speaking of which you can find the default styling of the DOM at in the style.css file <br>
There are two types of functions defined in this file. The first is to add a click event to call a callback function when the click happens. In these cases usually you see sending an ipc request like ipcRenderer.send('textarea-text', textarea.innerHTML). The second type is to do something when a request from the main process is sent to the renderer file and it looks like ipcRenderer.on('text', (event, text) => {...}). <br>
IPC stands for inter-process communication. Since the renderer.js file and main.js are running in parallel and they are different types (one is ESmodule and the other is CommonJS) they can't do everything. Like the main process can't handle and doesn't have access to the DOM interface. And the renderer can't use certain node modules like the engine that converts the pdf file to text itself. If you are familliar with web development think of the renderer.js file as what it is that controls your user interface adn manages it and send request and recieves them back from the main.js process which can be thought of as a server where requests and data recieved from the renderer are processed and sent back to the interface to be displayed. <br>
when using .on method in both these files it meanst listening for a request on the certain channel. ipcMain.on('textarea-text', (event, args) => {...}) means the main process is listening for a request on the 'textarea-text' channel and whenever that is triggered it fires the callback function that recievs the event and the arguemenst that were sent from the renderer and does something with it. You can see the same concept in the renderer like ipcRenderer.on('text', (event, text) => {...}) <br>
when using .send method it is sending a request to the other process on the certain channel that it mentions and the arguements and data that it wants to send. like event.send('text', data.text) in the main process or ipcRenderer.send('textarea-text', textarea.innerHTML) in the renderer. <br>
This is pretty much how the application works. by clicking the upload file there is a request sent to the main process from the renderer on the 'file-request' channel; Where the main process listen for it on that channel and uses the pre-built electron dialog widnow to look for directories and choose a pdf file and when chosen it closes and converts the file into text and sends it back to the renderer process on the 'text' and 'data' channel for the converted text and te pdf file data; Where it listens for those signals and shows them on the DOM for the user to see. <br>
The same flow happens for other button like save button where you choose a path to save your converted text or the clear button to clear the file you've uploaded. <br>
There are more information and details commented in the files itself where you can read and follow the code.
