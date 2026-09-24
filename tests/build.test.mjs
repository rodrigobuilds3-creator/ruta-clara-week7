import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

test("build includes only the public static app and preserves module links", async () => {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
  execFileSync(process.execPath, ["scripts/build.mjs"], { cwd: root });

  assert.deepEqual((await readdir(join(root, "dist"))).sort(),
    [".ruta-clara-build", "app.js", "index.html", "lib", "style-v2.css"].sort());
  assert.deepEqual((await readdir(join(root, "dist", "lib"))).sort(),
    ["model.js", "workflow.js"]);

  const html = await readFile(join(root, "dist", "index.html"), "utf8");
  const app = await readFile(join(root, "dist", "app.js"), "utf8");
  assert.match(html, /\.\/style-v2\.css/);
  assert.match(html, /\.\/app\.js/);
  assert.match(app, /\.\/lib\/model\.js/);
  assert.match(app, /\.\/lib\/workflow\.js/);
});
