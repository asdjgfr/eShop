const action = process.argv[2];
const { spawn } = require("child_process");
const path = require("path");

const actions = {
  install() {
    // 安装桌面的依赖
    const install = spawn("yarn", [], {
      cwd: path.resolve(__dirname, "web/desktop"),
      shell: true,
    });
    spawnCB(install, "web桌面依赖");
  },
  build() {
    const build = spawn("yarn", ["build"], {
      cwd: path.resolve(__dirname, "web/desktop"),
      shell: true,
    });
    spawnCB(build, "web桌面打包");
  },
  "dev:d"() {
    this["dev:server"]();
    const build = spawn("yarn", ["start"], {
      cwd: path.resolve(__dirname, "web/desktop"),
      shell: true,
    });
    spawnCB(build, "web桌面开发");
  },
  "dev:server"() {
    const server = spawn("go", ["run", "main.go"], {
      cwd: path.resolve(__dirname, "server"),
      shell: true,
    });
    spawnCB(server, "后台服务");
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

  cp.on("close", () => {
    console.log(`${prefix}结束`);
  });

  cp.on("error", (err) => {
    console.error("启动子进程失败", err);
  });
}
