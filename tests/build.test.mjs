import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
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
  const shortHash = (content) => createHash("sha256").update(content).digest("hex").slice(0, 12);
  const css = await readFile(join(root, "dist", "style-v2.css"));
  const model = await readFile(join(root, "dist", "lib", "model.js"));
  const workflow = await readFile(join(root, "dist", "lib", "workflow.js"));
  assert.ok(html.includes(`./style-v2.css?v=${shortHash(css)}`));
  assert.ok(html.includes(`./app.js?v=${shortHash(app)}`));
  assert.ok(app.includes(`./lib/model.js?v=${shortHash(model)}`));
  assert.ok(app.includes(`./lib/workflow.js?v=${shortHash(workflow)}`));
});
