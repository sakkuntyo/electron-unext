/*
const { app, BrowserWindow,Menu } = require('electron')

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  win.loadURL('https://video.unext.jp/')

  win.webContents.on('context-menu', (event, params) => {
    const template = [
      { label: 'コピー', role: 'copy', enabled: params.editFlags.canCopy },
      { label: '貼り付け', role: 'paste', enabled: params.editFlags.canPaste },
      { label: '切り取り', role: 'cut', enabled: params.editFlags.canCut },
      { label: '再読み込み', role: 'reload' },
      { label: '開発者ツール', role: 'toggleDevTools' }
    ];

    const menu = Menu.buildFromTemplate(template);
    menu.popup({ window: win });
  });
}

app.disableHardwareAcceleration();

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
*/

/*
const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const os = require("os");
const fs = require("fs");

// 1) GPU無効化（whenReadyより前）
app.disableHardwareAcceleration();

// 2) userData / cache の保存先を “書ける場所” に固定（whenReadyより前）
const base = path.join(os.homedir(), "electron-profile-unext");
const userDataDir = path.join(base, "userData");
const diskCacheDir = path.join(base, "diskCache");

try {
  fs.mkdirSync(userDataDir, { recursive: true });
  fs.mkdirSync(diskCacheDir, { recursive: true });
} catch (e) {
  console.error("Failed to create profile dirs:", e);
}

app.setPath("userData", userDataDir);
// Chromium のディスクキャッシュ先も明示（効く環境が多い）
app.commandLine.appendSwitch("disk-cache-dir", diskCacheDir);

// 参考: ここでログ出し（起動時の確認用）
console.log("home:", os.homedir());
console.log("userData:", app.getPath("userData"));
console.log("diskCacheDir:", diskCacheDir);

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      // ※必要ならここに preload を足す
      // preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL("https://video.unext.jp/");

  win.webContents.on("context-menu", (event, params) => {
    const template = [
      { label: "コピー", role: "copy", enabled: params.editFlags.canCopy },
      { label: "貼り付け", role: "paste", enabled: params.editFlags.canPaste },
      { label: "切り取り", role: "cut", enabled: params.editFlags.canCut },
      { type: "separator" },
      { label: "再読み込み", role: "reload" },
      { label: "開発者ツール", role: "toggleDevTools" },
    ];

    const menu = Menu.buildFromTemplate(template);
    menu.popup({ window: win });
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
*/

const { app } = require("electron");
const { spawn } = require("child_process");
const path = require("path");
const os = require("os");

app.whenReady().then(() => {
  // Chromeのパス（環境に合わせて調整）
  const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

  const profileDir = path.join(os.homedir(), "chrome-profile-unext");
  const url = "https://video.unext.jp/";

  spawn(chrome, [
    `--app=${url}`,
    `--user-data-dir=${profileDir}`,
    "--new-window",
    "--disable-gpu",
    "--disable-gpu-compositing",
  ], { detached: true, stdio: "ignore" }).unref();

  app.quit();
});