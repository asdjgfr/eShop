const path = require("path");
const fs = require("fs-extra");
const electronInstaller = require("electron-winstaller");
const cachePath = path.resolve("./dist/cache");
const winPath = path.join(cachePath, "yinma-win32-x64");

async function build() {
  console.log("开始准备打包");

  try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: winPath,
      outputDirectory: path.resolve("./dist"),
      authors: "https://www.2077tech.com",
      exe: "yinma.exe",
      version: "0.0.1",
      noMsi: true,
      setupIcon: path.resolve("logo", "logo.ico"), //生成的exe文件的图标文件地址
      setupExe: "yinma-setup-win64-0.0.1.exe",
    });
    console.log("打包成功");
    fs.removeSync(cachePath);
  } catch (e) {
    console.log(`No dice: ${e.message}`);
  }
}
build();
