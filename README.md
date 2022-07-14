## Electron PDF to text converter

This is a desktop application built by ElectronJS. As the name suggests, upload your pdf file and it will be converted into a text format. 
There is also a preview of your uploaded file. Click the clear button to unload your file.

Technologies and keywords in this project: `Electron` , `Inter Process Communication (ICP) ` , `node-modules` , `DOM manipulation` , `pdf-parse`.

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
