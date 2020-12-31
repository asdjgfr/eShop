import * as YAML from "yaml";
import { readFileSync } from "fs-extra";
import { projectConfig } from "../common/untils/getConfig";

const i18n = {};
try {
  Object.assign(
    i18n,
    YAML.parse(
      readFileSync(
        `./languages/${projectConfig.getProjectConfig.language}.yml`,
        "utf8",
      ),
    ),
  );
} catch (e) {
  Object.assign(
    i18n,
    YAML.parse(readFileSync("./languages/zh_cn.yml", "utf8")),
  );
}

export default i18n;
