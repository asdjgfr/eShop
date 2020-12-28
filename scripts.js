const action = process.argv[2];
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const buildPath = path.join(__dirname, "build");
const serverDevPath = path.join(__dirname, "server", "dev");

try {
  fs.accessSync(buildPath, fs.constants.F_OK);
} catch (error) {
  fs.mkdirSync(buildPath);
}

const actions = {
  async install() {
    // 安装桌面的依赖
    const installWeb = spawn("yarn", [], {
      cwd: path.resolve(__dirname, "client/web"),
      shell: true,
    });
    await spawnCB(installWeb, "web依赖");
  },
  "dev:web"() {
    const build = spawn("yarn", ["start"], {
      cwd: path.resolve(__dirname, "client/web"),
      shell: true,
    });
    spawnCB(build, "web开发");
  },
  async "build:server"(isDev = false) {
    // 服务端打包
    const cwd = path.resolve(__dirname, "server");
    try {
      fs.accessSync(path.join(buildPath, "server"), fs.constants.F_OK);
    } catch (error) {
      fs.mkdirSync(path.join(buildPath, "server"));
    }
    try {
      fs.accessSync(serverDevPath, fs.constants.F_OK);
    } catch (error) {
      fs.mkdirSync(serverDevPath);
    }
    try {
      fs.unlinkSync(server);
      console.log("移除上次打包文件成功！");
    } catch (e) {}
    // 复制配置文件
    fs.copyFileSync(
      path.join(cwd, "src", "config.json"),
      isDev
        ? path.join(serverDevPath, "config.json")
        : path.join(buildPath, "server", "config.json")
    );
    console.log("复制配置文件成功！");
    if (!isDev) {
      fs.copyFileSync(
        path.join(cwd, "package.json"),
        path.join(buildPath, "server", "package.json")
      );
      console.log("复制package.json成功！");
      fs.copyFileSync(
        path.join(cwd, "yarn.lock"),
        path.join(buildPath, "server", "yarn.lock")
      );
      console.log("复制yarn.lock成功！");
    }
    console.log("重新打包中！");
    console.log(serverDevPath);
    const build = isDev
      ? spawn("tsc", [`--outDir ${serverDevPath}`], {
          cwd,
          shell: true,
          env: process.env,
        })
      : spawn("tsc", {
          cwd,
          shell: true,
          env: process.env,
        });
    await spawnCB(build, "服务端打包");
  },
  async "build:web"() {
    // web桌面打包
    const build = spawn("yarn", ["build"], {
      cwd: path.resolve(__dirname, "client/web"),
      shell: true,
    });
    await spawnCB(build, "web打包");
  },
  async build() {
    await this["build:server"]();
    await this["build:web"]();
  },
  async "dev:server"() {
    await this["build:server"](true);
    const server = spawn("node", ["app.js"], {
      cwd: serverDevPath,
      shell: true,
    });
    await spawnCB(server, "后台服务");
  },
};

actions[action]();

function spawnCB(cp, prefix) {
  cp.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  cp.stderr.on("data", (data) => {
    console.log(data.toString());
  });

  cp.on("error", (err) => {
    console.error("启动子进程失败", err);
  });
  return new Promise((resolve) => {
    cp.on("close", () => {
      console.log(`${prefix}结束`);
      resolve(cp);
    });
  });
}
