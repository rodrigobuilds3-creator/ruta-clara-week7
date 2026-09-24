// Tiny supervised kNN model. Every training row below is invented for this demo.
// This predicts review attention, not crash risk, driver quality, or truth.
export const TRAINING = [
  { peakG: 0.08, repeats: 1, label: "rutina" },
  { peakG: 0.15, repeats: 1, label: "rutina" },
  { peakG: 0.21, repeats: 2, label: "revisar" },
  { peakG: 0.28, repeats: 1, label: "revisar" },
  { peakG: 0.35, repeats: 3, label: "revisar" },
  { peakG: 0.49, repeats: 2, label: "priorizar" },
  { peakG: 0.62, repeats: 4, label: "priorizar" },
  { peakG: 0.77, repeats: 3, label: "priorizar" },
];

export function predictTriage({ peakG, repeats }, k = 3) {
  if (!Number.isFinite(peakG) || peakG < 0 || peakG > 3) throw new RangeError("peakG inválido");
  if (!Number.isInteger(repeats) || repeats < 1 || repeats > 10) throw new RangeError("repeats inválido");
  const nearest = TRAINING.map((row, index) => ({
    ...row,
    index,
    distance: Math.hypot((peakG - row.peakG) / 0.8, (repeats - row.repeats) / 4),
  })).sort((a, b) => a.distance - b.distance || a.index - b.index).slice(0, k);
  const votes = new Map();
  for (const row of nearest) votes.set(row.label, (votes.get(row.label) ?? 0) + 1);
  const order = ["rutina", "revisar", "priorizar"];
  const label = order.sort((a, b) => (votes.get(b) ?? 0) - (votes.get(a) ?? 0))[0];
  return { label, neighbors: nearest.map(({ peakG: g, repeats: r, label: l }) => ({ peakG: g, repeats: r, label: l })) };
}
