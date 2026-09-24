import test from "node:test";
import assert from "node:assert/strict";
import { TRAINING, predictTriage } from "../lib/model.js";

test("modelo usa filas sintéticas y vecinos explícitos", () => {
  assert.equal(TRAINING.length, 8);
  const result = predictTriage({ peakG: .63, repeats: 4 });
  assert.equal(result.label, "priorizar");
  assert.equal(result.neighbors.length, 3);
});
test("modelo es determinista y no acepta valores fuera de rango", () => {
  assert.deepEqual(predictTriage({ peakG: .2, repeats: 2 }), predictTriage({ peakG: .2, repeats: 2 }));
  assert.throws(() => predictTriage({ peakG: -1, repeats: 1 }));
  assert.throws(() => predictTriage({ peakG: .2, repeats: 11 }));
});
