import fg from "fast-glob";
import fs from "fs-extra";
import * as path from "node:path";
import { printNode, zodToTs } from "zod-to-ts";
import { ThemeRaw } from "../src/utils/theme";

const GENERATED_FILES_DIR = "__generated__";
const globs = process.argv.pop();

if (!globs || !globs.trim()) {
  throw new Error(
    "Please provide glob patterns (space separated) as arguments to match your prompts"
  );
}

const prompts = fg.sync(["./src/chains/theme/**/**.prompt.md"]);

if (prompts.length === 0) {
  throw new Error("No theme prompt files found");
}

const { node: theme } = zodToTs(
  ThemeRaw.omit({ fontSize: true, borderRadius: true, spacing: true }),
  "Theme"
);

const filePath = path.dirname(prompts[0]);
const generatedDir = path.join(filePath, GENERATED_FILES_DIR);

if (!fs.existsSync(generatedDir)) {
  fs.mkdirSync(generatedDir, { recursive: true });
}

const generatedPath = path.join(generatedDir, `prompt-theme-types.ts`);

fs.ensureFileSync(generatedPath);

fs.writeFileSync(
  generatedPath,
  `export const types = \`type Theme = ${printNode(theme).replace(
    /[\n\s\t]/gm,
    ""
  )}\`;\n`
);
// eslint-disable-next-line no-console
console.log(`Done generating types for for ${generatedPath}`);
