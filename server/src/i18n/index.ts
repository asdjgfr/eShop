import * as YAML from "yaml";
import { join } from "path";
import { readFileSync } from "fs-extra";

const projectConfig = YAML.parse(
  readFileSync(join(__dirname, "..", "config", "project.yml"), "utf8"),
);

const i18n = {};
try {
  Object.assign(
    i18n,
    YAML.parse(
      readFileSync(`./languages/${projectConfig.language}.yml`, "utf8"),
    ),
  );
} catch (e) {
  Object.assign(
    i18n,
    YAML.parse(readFileSync("./languages/zh_cn.yml", "utf8")),
  );
}

export default i18n;
