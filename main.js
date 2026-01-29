const { app } = require("electron");
const { spawn } = require("child_process");
const path = require("path");
const os = require("os");

app.whenReady().then(() => {
  // Chromeのパス（環境に合わせて調整）
  const chrome = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

  const profileDir = path.join(os.homedir(), "edge-profile-electron-unext");
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
