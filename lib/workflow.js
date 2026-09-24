export const BOUNDS = Object.freeze({ minLat: 19.53, maxLat: 19.59, minLon: -99.29, maxLon: -99.23 });
export const CATEGORIES = Object.freeze(["Bache", "Obstrucción", "Señalización", "Otro"]);

export function parseNumericField(value) {
  if (typeof value === "string" && value.trim() === "") return NaN;
  return Number(value);
}

export function validateReport(input) {
  const errors = {};
  const description = String(input.description ?? "").trim();
  if (!CATEGORIES.includes(input.category)) errors.category = "Elige una categoría.";
  if (description.length < 12 || description.length > 240) errors.description = "Describe el riesgo en 12 a 240 caracteres.";
  if (!Number.isFinite(input.lat) || !Number.isFinite(input.lon) || input.lat < BOUNDS.minLat || input.lat > BOUNDS.maxLat || input.lon < BOUNDS.minLon || input.lon > BOUNDS.maxLon) errors.location = "Elige un punto dentro del mapa ilustrativo.";
  if (!Number.isFinite(input.peakG) || input.peakG < 0 || input.peakG > 3) errors.motion = "La muestra debe estar entre 0 y 3 g.";
  if (!Number.isInteger(input.repeats) || input.repeats < 1 || input.repeats > 10) errors.repeats = "Elige entre 1 y 10 observaciones.";
  return errors;
}

export function createCase(input, id, now) {
  const errors = validateReport(input);
  if (Object.keys(errors).length) throw new Error(JSON.stringify(errors));
  return {
    id,
    category: input.category,
    description: input.description.trim(),
    lat: input.lat,
    lon: input.lon,
    peakG: input.peakG,
    repeats: input.repeats,
    triage: input.triage,
    status: "submitted",
    paymentEligible: false,
    remedy: "",
    history: [{ at: now, actor: "Conductor (demo)", action: "Reporte enviado" }],
  };
}

export function transitionCase(item, action, now, note = "") {
  const reason = String(note).trim();
  if (action === "verify" && item.status === "submitted") return {
    ...item, status: "verified", paymentEligible: true,
    history: [...item.history, { at: now, actor: "Verificador (simulado)", action: "Verificación simulada; elegibilidad hipotética de pago (demo)" }],
  };
  if (action === "reject" && item.status === "submitted" && reason.length >= 12) return {
    ...item, status: "rejected", paymentEligible: false,
    history: [...item.history, { at: now, actor: "Verificador (simulado)", action: `Rechazado en la demo: ${reason}` }],
  };
  if (action === "close" && item.status === "verified" && reason.length >= 12) return {
    ...item, status: "closed", remedy: reason,
    history: [...item.history, { at: now, actor: "Responsable del caso (simulado)", action: `Cierre registrado en la demo: ${reason}` }],
  };
  throw new Error("Transición no permitida o motivo demasiado corto.");
}

export function correctCase(item, input, now) {
  if (!["submitted", "rejected"].includes(item.status)) throw new Error("Solo se corrigen reportes pendientes o rechazados.");
  const errors = validateReport(input);
  if (Object.keys(errors).length) throw new Error(JSON.stringify(errors));
  return {
    ...item,
    category: input.category,
    description: input.description.trim(),
    lat: input.lat, lon: input.lon, peakG: input.peakG, repeats: input.repeats, triage: input.triage,
    status: "submitted", paymentEligible: false,
    history: [...item.history, { at: now, actor: "Conductor (demo)", action: "Reporte corregido y reenviado" }],
  };
}

export function countUnresolved(items) { return items.filter(item => item.status !== "closed").length; }

export function pointToGeo(x, y) {
  const boundedX = Math.max(0, Math.min(1, x));
  const boundedY = Math.max(0, Math.min(1, y));
  return {
    lat: Number((BOUNDS.maxLat - boundedY * (BOUNDS.maxLat - BOUNDS.minLat)).toFixed(5)),
    lon: Number((BOUNDS.minLon + boundedX * (BOUNDS.maxLon - BOUNDS.minLon)).toFixed(5)),
  };
}

export function geoToPoint(lat, lon) {
  return { x: (lon - BOUNDS.minLon) / (BOUNDS.maxLon - BOUNDS.minLon), y: (BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat) };
}
