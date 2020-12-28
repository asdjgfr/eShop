const action = process.argv[2];
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const buildPath = path.join(__dirname, "build");

try {
  fs.accessSync(buildPath, fs.constants.F_OK);
} catch (error) {
  fs.mkdirSync(buildPath);
}

try {
  fs.accessSync(path.join(buildPath, "server"), fs.constants.F_OK);
} catch (error) {
  fs.mkdirSync(path.join(buildPath, "server"));
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
  async "build:server"() {
    // 服务端打包
    const cwd = path.resolve(__dirname, "server");
    try {
      fs.unlinkSync(server);
      console.log("移除上次打包文件成功！");
    } catch (e) {}
    // 复制配置文件
    fs.copyFileSync(
      path.join(cwd, "src", "config.json"),
      path.join(buildPath, "server", "config.json")
    );
    console.log("复制配置文件成功！");

    console.log("重新打包中！");
    const build = spawn("tsc", {
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
    await this["build:server"]();
    const server = spawn("node", ["app.js"], {
      cwd: path.join(buildPath, "server"),
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
