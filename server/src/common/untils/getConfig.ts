import * as YAML from "yaml";
import { join } from "path";
import { readFileSync } from "fs-extra";

export const projectConfig = {
  get getProjectConfig() {
    return YAML.parse(
      readFileSync(
        join(__dirname, "..", "..", "config", "project.yml"),
        "utf8",
      ),
    );
  },
};
