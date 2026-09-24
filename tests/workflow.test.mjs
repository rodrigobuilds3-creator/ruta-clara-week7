import test from "node:test";
import assert from "node:assert/strict";
import { BOUNDS, createCase, correctCase, transitionCase, validateReport, countUnresolved, pointToGeo, geoToPoint, parseNumericField } from "../lib/workflow.js";

const input = { category: "Bache", description: "Bache ficticio junto al punto A.", lat: 19.558, lon: -99.263, peakG: 0.49, repeats: 2, triage: "priorizar" };

test("un reporte válido no tiene errores", () => assert.deepEqual(validateReport(input), {}));
test("un campo numérico vacío no se transforma en cero", () => {
  assert.ok(Number.isNaN(parseNumericField("")));
  assert.ok(Number.isNaN(parseNumericField("   ")));
  assert.equal(parseNumericField("0.49"), .49);
  assert.ok(validateReport({ ...input, peakG: parseNumericField("") }).motion);
});
test("rechaza texto corto, coordenadas fuera de mapa y telemetría extrema", () => {
  const errors = validateReport({ ...input, description: "breve", lat: 30, peakG: 4, repeats: 0 });
  assert.deepEqual(Object.keys(errors).sort(), ["description", "location", "motion", "repeats"]);
});
test("se paga por verificación, no por cierre", () => {
  const original = createCase(input, "RC-001", "t1");
  assert.equal(original.paymentEligible, false);
  const verified = transitionCase(original, "verify", "t2");
  assert.equal(verified.paymentEligible, true);
  assert.equal(verified.status, "verified");
  assert.equal(countUnresolved([verified]), 1);
  const closed = transitionCase(verified, "close", "t3", "Reparación ficticia confirmada");
  assert.equal(closed.paymentEligible, true);
  assert.equal(countUnresolved([closed]), 0);
  assert.match(closed.history.at(-1).action, /Cierre firmado en simulación/);
});
test("no se puede cerrar sin verificación o sin remedio", () => {
  const original = createCase(input, "RC-002", "t1");
  assert.throws(() => transitionCase(original, "close", "t2", "Reparación ficticia confirmada"));
  const verified = transitionCase(original, "verify", "t2");
  assert.throws(() => transitionCase(verified, "close", "t3", "breve"));
});
test("rechazo requiere motivo y permite corrección sin pago automático", () => {
  const original = createCase(input, "RC-003", "t1");
  assert.throws(() => transitionCase(original, "reject", "t2", "no"));
  const rejected = transitionCase(original, "reject", "t2", "Falta una ubicación revisable");
  assert.equal(rejected.paymentEligible, false);
  const corrected = correctCase(rejected, { ...input, description: "Bache corregido en punto ficticio A." }, "t3");
  assert.equal(corrected.status, "submitted");
  assert.equal(corrected.paymentEligible, false);
  assert.equal(corrected.history.length, 3);
});
test("un reporte rechazado y corregible sigue contando como abierto", () => {
  const original = createCase(input, "RC-004", "t1");
  const rejected = transitionCase(original, "reject", "t2", "Falta una ubicación revisable");
  const verified = transitionCase(createCase(input, "RC-005", "t1"), "verify", "t2");
  assert.equal(countUnresolved([rejected, verified]), 2);
  assert.equal(countUnresolved([correctCase(rejected, input, "t3"), verified]), 2);
});
test("geodatos de mapa regresan a la ubicación elegida", () => {
  const geo = pointToGeo(.5, .5);
  assert.ok(geo.lat >= BOUNDS.minLat && geo.lat <= BOUNDS.maxLat);
  const point = geoToPoint(geo.lat, geo.lon);
  assert.ok(Math.abs(point.x - .5) < .0002);
  assert.ok(Math.abs(point.y - .5) < .0002);
});
