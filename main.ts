import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";

const text = "The wedding photo faced the wall.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const target = path.join(outDir, "entry.txt");

try {
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(target, text, "utf8");
} catch {
  const fallbackDir = path.join(process.cwd(), "output");
  fs.mkdirSync(fallbackDir, { recursive: true });
  const fallback = path.join(fallbackDir, "entry.txt");
  try {
    fs.writeFileSync(fallback, text, "utf8");
  } catch {
    fs.writeFileSync(path.join(os.tmpdir(), "entry.txt"), text, "utf8");
  }
}
