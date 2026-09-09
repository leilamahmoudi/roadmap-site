import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const phasesDir = path.join(__dirname, "../content/phases");
const commandsDir = path.join(__dirname, "../.claude/commands");

const phaseFiles = fs
  .readdirSync(phasesDir)
  .filter((f) => f.endsWith(".mdx"))
  .sort();

let synced = 0;

for (const file of phaseFiles) {
  const content = fs.readFileSync(path.join(phasesDir, file), "utf8");

  const match = content.match(/## Example Prompt\n+```\n([\s\S]*?)```/);
  if (!match) {
    console.warn(`No example prompt found in ${file}, skipping.`);
    continue;
  }

  const prompt = match[1].trimEnd();
  const slug = file.replace(/^\d+-/, "").replace(/\.mdx$/, "");
  const phaseNumber = parseInt(file.match(/^(\d+)-/)?.[1], 10);
  const commandFile = path.join(commandsDir, `phase${phaseNumber}.md`);

  fs.writeFileSync(commandFile, prompt + "\n");
  console.log(`Synced ${file} → .claude/commands/phase${phaseNumber}.md`);
  synced++;
}

console.log(`\n${synced} command(s) synced.`);
