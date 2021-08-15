// Modules to control application life and create native browser window
const {
    app,
    BrowserWindow,
    ipcMain
  } = require("electron");
  const path = require("path");
  const fs = require("fs");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

async function createWindow() {

  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js") // use a preload script
    }
  });

  // Load app
  win.loadFile(path.join(__dirname, "index.html"));

  // rest of code..
}

app.on("ready", createWindow);

ipcMain.on("toMain", (event, args) => {
//    setInterval(()=>{
  fs.readFile("data.json", (error, data) => {

       let responseObj = JSON.parse(data)
       console.log(data);
       console.log(responseObj);
       win.webContents.send("fromMain", responseObj);
    });
//},10000)
});