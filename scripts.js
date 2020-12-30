const action = process.argv[2];
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs-extra");

const buildPath = path.join(__dirname, "build");

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
      fs.unlinkSync(cwd);
    } catch (error) {}
    fs.copySync(
      path.join(cwd, "package.json"),
      path.join(buildPath, "package.json")
    );
    fs.copySync(path.join(cwd, "yarn.lock"), path.join(buildPath, "yarn.lock"));
    fs.copySync(path.join(cwd, "config"), path.join(buildPath, "config"));
    const build = spawn("yarn", ["build"], {
      cwd,
      shell: true,
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
    const server = spawn("yarn", ["dev"], {
      cwd: path.resolve(__dirname, "server"),
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
