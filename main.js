var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var dialog = require('dialog');

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Open the devtools.
  mainWindow.openDevTools();

  //mainWindow.loadUrl("http://google.ru");

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  var ipc = require('ipc');

  ipc.on('asynchronous-message', function(event, arg) {
    console.log(arg);
    dialog.showErrorBox('error',arg);
    var m_window = new BrowserWindow({ width: 800, height: 600, show:false });
    m_window.loadUrl(arg);
    event.sender.send('asynchronous-reply', m_window.document);


  });

  ipc.on('synchronous-message', function(event, arg) {
    console.log(arg);
    var m_window = new BrowserWindow({ width: 800, height: 600, show:false });
    m_window.loadUrl(arg);
    event.returnValue = m_window.document;
  });

});
