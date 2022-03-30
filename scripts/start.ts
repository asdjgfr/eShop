import { execFileSync, spawn } from "child_process";
import { join } from "path";
import { series } from "gulp";
import type { TaskFunctionCallback } from "gulp";
import { platform } from "os";

const wt = join(process.env.LOCALAPPDATA!, "Microsoft/WindowsApps/wt.exe");
const commands = [
  {
    desc: "后端服务开发环境",
    commands: ["pnpm", "start:dev"],
    cwd: join(__dirname, "../server"),
  },
  {
    desc: "web开发环境",
    commands: ["pnpm", "dev"],
    cwd: join(__dirname, "../web"),
  },
];

export function startTerminal(
  commands: string | string[],
  cwd: string,
  newTerminal = true
) {
  const runCommands = Array.isArray(commands) ? commands : [commands];

  if (newTerminal) {
    execFileSync(wt, ["new-tab", "-d", cwd, "PWSH", "-c", ...runCommands]);
    return Promise.resolve();
  } else {
    return new Promise((resolve, reject) => {
      const ls = spawn("pnpm", runCommands, {
        cwd,
        shell: true,
      });

      ls.stdout.on("data", (data) => {
        console.log(`${data}\n`);
      });

      ls.stderr.on("data", (data) => {
        reject(data);
      });

      ls.on("close", (code) => {
        resolve(code);
      });
    });
  }
}

export async function startDev(cb: TaskFunctionCallback) {
  const osPlatform = platform();
  if (osPlatform === "win32") {
    for (let i = 0; i < commands.length; i++) {
      const c = commands[i];
      console.log(c.desc);
      startTerminal(c.commands, c.cwd, i !== 0)
        .then(console.log)
        .catch(Error);
    }
  } else {
    throw Error("暂时只支持 windows 平台");
  }
  cb();
}

export const dev = series(startDev);
