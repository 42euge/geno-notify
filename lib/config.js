import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { homedir } from "node:os";
import yaml from "js-yaml";

const DEFAULT_CONFIG_PATH = join(homedir(), ".geno", "notify.yaml");

export async function loadConfig(configPath) {
  const p = configPath || DEFAULT_CONFIG_PATH;
  const raw = await readFile(p, "utf8");
  return yaml.load(raw);
}
