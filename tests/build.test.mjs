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

test("visible sensor and model copy names the data and limits without ML jargon", async () => {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
  const html = await readFile(join(root, "index.html"), "utf8");
  const app = await readFile(join(root, "app.js"), "utf8");
  const workflow = await readFile(join(root, "lib", "workflow.js"), "utf8");

  assert.ok(html.includes("Movimiento del teléfono (opcional · prueba de 3 s)"));
  assert.ok(html.includes("calcula un pico (g): la mayor variación de movimiento respecto a la gravedad en esa lectura"));
  assert.ok(html.includes("Después descarta los eventos crudos."));
  assert.ok(html.includes("El pico y el número de observaciones se conservan sólo en la memoria de esta pestaña"));
  assert.ok(html.includes("para probar cómo una señal opcional podría alimentar una sugerencia de revisión"));
  assert.ok(html.includes("la mayor variación de movimiento respecto a la gravedad"));
  assert.ok(html.includes("no es un umbral validado para detectar baches"));
  assert.ok(html.includes("No usa GPS, no activa seguimiento continuo ni registra una ruta."));
  assert.ok(html.includes("El modelo también usa observaciones inventadas."));
  assert.ok(html.includes("Ayuda automática de revisión"));
  assert.ok(html.includes("no validado en campo"));
  assert.ok(!html.includes("kNN"));
  assert.ok(!app.includes("kNN con ejemplos inventados"));
  assert.ok(html.includes("01 / REPORTE DE PRUEBA"));
  assert.ok(html.includes("Reporte breve"));
  assert.ok(!html.includes("≈ 1 min"));
  assert.ok(!html.includes("CONTRIBUCIÓN VOLUNTARIA"));
  assert.ok(html.includes("2</strong> roles simulados"));
  assert.ok(html.includes("Un reporte de prueba."));
  assert.ok(html.includes("Principios para definir antes de un piloto."));
  assert.ok(html.includes("esta demo no transfiere pagos") || html.includes("Esta demo no calcula ni transfiere pagos."));
  assert.ok(!html.includes("Pago por saber"));
  assert.ok(!html.includes("Principios que no se negocian."));
  assert.ok(html.includes("No ingreses datos personales; el texto capturado permanece en la memoria temporal de esta pestaña."));
  assert.ok(html.includes("verificación y cierre simulados"));
  assert.ok(!html.includes("verificación independiente"));
  assert.ok(html.includes("ni se guardan en un servidor"));
  assert.ok(app.includes("Verificación simulada · cierre pendiente"));
  assert.ok(workflow.includes("Verificador (simulado)"));
  assert.ok(!workflow.includes("Verificador independiente"));
  assert.ok(app.includes("Elegibilidad hipotética (demo)"));
  assert.ok(app.includes("No hay pagador ni monto reales, y no se transfiere dinero."));
  assert.ok(!app.includes("Pago elegible · no transferido"));
  assert.ok(workflow.includes("elegibilidad hipotética de pago (demo)"));
});
