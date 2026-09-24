import { predictTriage } from "./lib/model.js";
import { BOUNDS, createCase, correctCase, transitionCase, validateReport, countUnresolved, pointToGeo, geoToPoint, parseNumericField } from "./lib/workflow.js";

const $ = (id) => document.getElementById(id);
const svgNS = "http://www.w3.org/2000/svg";
const state = { items: [], selectedId: null, point: null, editingId: null, nextNumber: 15 };
const STATUS = { submitted: "Pendiente de verificar", verified: "Verificado · cierre pendiente", rejected: "Rechazado · corregible", closed: "Cerrado (demo)" };
const TRIAGE = { rutina: "Revisión ordinaria", revisar: "Revisar pronto", priorizar: "Priorizar revisión" };

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function svg(tag, attributes = {}) {
  const node = document.createElementNS(svgNS, tag);
  for (const [name, value] of Object.entries(attributes)) node.setAttribute(name, String(value));
  return node;
}

function seed() {
  const first = createCase({ category: "Bache", description: "Bache antes de una parada ficticia; requiere revisión en campo.", lat: 19.5584, lon: -99.265, peakG: 0.49, repeats: 2, triage: "priorizar" }, "RC-014", "22 sep · 08:20");
  state.items = [transitionCase(first, "verify", "22 sep · 15:10")];
  state.selectedId = "RC-014";
}

function nowLabel() { return new Intl.DateTimeFormat("es-MX", { dateStyle: "medium", timeStyle: "short" }).format(new Date()); }

function setPoint(point) {
  state.point = point;
  $("location-output").textContent = point ? `${point.lat.toFixed(5)}, ${point.lon.toFixed(5)} · punto ilustrativo` : "Aún no elegida";
  $("location-error").textContent = "";
  renderMap();
}

function renderMap() {
  const markerLayer = $("map-markers");
  const selectedLayer = $("selected-marker");
  markerLayer.replaceChildren();
  selectedLayer.replaceChildren();
  for (const item of state.items) {
    const { x, y } = geoToPoint(item.lat, item.lon);
    const circle = svg("circle", { cx: x * 600, cy: y * 330, r: 8, fill: item.status === "closed" ? "#647f88" : "#d17b3e", stroke: "#fff", "stroke-width": 3 });
    const title = svg("title"); title.textContent = `${item.id}: ${STATUS[item.status]} (simulado)`;
    circle.append(title); markerLayer.append(circle);
  }
  if (state.point) {
    const { x, y } = geoToPoint(state.point.lat, state.point.lon);
    selectedLayer.append(svg("circle", { cx: x * 600, cy: y * 330, r: 14, fill: "#f0b34f", stroke: "#fff", "stroke-width": 4 }));
    selectedLayer.append(svg("circle", { cx: x * 600, cy: y * 330, r: 4, fill: "#183451" }));
  }
}

function getInput() {
  const peakG = parseNumericField($("peak-g").value);
  const repeats = parseNumericField($("repeats").value);
  let triage = null;
  try { triage = predictTriage({ peakG, repeats }).label; } catch { /* validation below displays the error */ }
  return { category: $("category").value, description: $("description").value, lat: state.point?.lat, lon: state.point?.lon, peakG, repeats, triage };
}

function updateTriage() {
  const input = getInput();
  $("char-count").textContent = `${input.description.length}/240`;
  $("triage-text").textContent = input.triage ? `${TRIAGE[input.triage]} · kNN con ejemplos inventados. Sugerencia para un humano; no prueba el riesgo ni decide pago o sanción.` : "Ingresa una muestra válida para ver una sugerencia. No decide por nadie.";
}

function showErrors(errors) {
  for (const field of ["category", "description", "location", "motion", "repeats"]) $(`${field}-error`).textContent = errors[field] || "";
  const first = Object.keys(errors)[0];
  if (first) ({ category: $("category"), description: $("description"), location: $("route-map"), motion: $("peak-g"), repeats: $("repeats") })[first].focus();
}

function resetForm() {
  $("report-form").reset();
  $("peak-g").value = "0.35";
  $("repeats").value = "2";
  state.editingId = null;
  $("submit-button").firstChild.textContent = "Crear reporte de prueba ";
  $("cancel-edit").hidden = true;
  $("sensor-status").textContent = "Valor inicial simulado: 0.35 g · 2 observaciones.";
  setPoint(null);
  showErrors({});
  updateTriage();
}

function submitReport(event) {
  event.preventDefault();
  const input = getInput();
  const errors = validateReport(input);
  showErrors(errors);
  const message = $("form-message");
  if (Object.keys(errors).length) { message.textContent = "Revisa los campos señalados."; message.classList.add("error-message"); return; }
  message.classList.remove("error-message");
  try {
    if (state.editingId) {
      const index = state.items.findIndex(item => item.id === state.editingId);
      state.items[index] = correctCase(state.items[index], input, nowLabel());
      state.selectedId = state.editingId;
      message.textContent = `${state.editingId} corregido y reenviado en esta demo.`;
    } else {
      const id = `RC-${String(state.nextNumber++).padStart(3, "0")}`;
      state.items.unshift(createCase(input, id, nowLabel()));
      state.selectedId = id;
      message.textContent = `${id} creado solo en esta sesión de demostración.`;
    }
    resetForm();
    render();
    $("case-detail").focus();
    $("case-detail").scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) { message.textContent = error.message; message.classList.add("error-message"); }
}

function startCorrection(item) {
  state.editingId = item.id;
  $("category").value = item.category;
  $("description").value = item.description;
  $("peak-g").value = String(item.peakG);
  $("repeats").value = String(item.repeats);
  $("submit-button").firstChild.textContent = `Guardar corrección de ${item.id} `;
  $("cancel-edit").hidden = false;
  setPoint({ lat: item.lat, lon: item.lon });
  updateTriage();
  $("report-title").scrollIntoView({ behavior: "smooth", block: "start" });
  $("category").focus();
}

function fact(label, value) { const box = el("div"); box.append(el("small", "", label), el("strong", "", value)); return box; }

function renderCaseDetail() {
  const root = $("case-detail"); root.replaceChildren();
  const item = state.items.find(row => row.id === state.selectedId);
  if (!item) { root.append(el("p", "muted", "Elige un caso para revisar su historia.")); return; }
  root.append(el("h3", "", `${item.id} · ${item.category}`), el("p", "detail-sub", "Caso inventado · sin unidad ni persona identificable"));
  root.append(el("p", "detail-description", item.description));
  const facts = el("div", "detail-facts");
  facts.append(fact("Estado", STATUS[item.status]), fact("Contribución", item.paymentEligible ? "Pago elegible · no transferido" : "Aún no elegible"), fact("Sugerencia ML", TRIAGE[item.triage] || "Sin clasificación"), fact("Responsable real", "Por asignar antes de piloto"));
  root.append(facts);
  if (item.remedy) root.append(el("p", "detail-description", `Remedio registrado en simulación: ${item.remedy}`));
  const history = el("ol", "history");
  for (const event of item.history) history.append(el("li", "", `${event.at} · ${event.actor}: ${event.action}`));
  root.append(history);
  const box = el("div", "workflow-box");
  box.append(el("h4", "", "Controles de roles simulados"));
  if (item.status === "submitted") {
    const label = el("label", "", "Motivo para rechazar (mín. 12 caracteres)"); label.htmlFor = "decision-note";
    const note = el("textarea"); note.id = "decision-note"; note.maxLength = 240; note.placeholder = "Explica qué evidencia falta (ejemplo inventado)";
    const actions = el("div", "workflow-actions");
    const verify = el("button", "", "Simular verificación independiente"); verify.type = "button"; verify.onclick = () => act(item, "verify", "");
    const reject = el("button", "danger", "Simular rechazo"); reject.type = "button"; reject.onclick = () => act(item, "reject", note.value);
    const correct = el("button", "", "Corregir como conductor"); correct.type = "button"; correct.onclick = () => startCorrection(item);
    actions.append(verify, reject, correct); box.append(label, note, actions);
  } else if (item.status === "rejected") {
    const actions = el("div", "workflow-actions"); const correct = el("button", "", "Corregir y reenviar"); correct.type = "button"; correct.onclick = () => startCorrection(item); actions.append(correct); box.append(actions);
  } else if (item.status === "verified") {
    box.append(el("p", "detail-sub", "El pago sería elegible ya; no depende del cierre. Falta un pagador y monto reales."));
    const label = el("label", "", "Remedio y firma de cierre simulados (mín. 12 caracteres)"); label.htmlFor = "remedy-note";
    const note = el("textarea"); note.id = "remedy-note"; note.maxLength = 240; note.placeholder = "Ej. Reparación confirmada en visita ficticia";
    const actions = el("div", "workflow-actions"); const close = el("button", "", "Simular cierre por autoridad"); close.type = "button"; close.onclick = () => act(item, "close", note.value); actions.append(close); box.append(label, note, actions);
  } else { box.append(el("p", "detail-sub", "Historial conservado en esta sesión. Ninguna entidad real recibió el caso.")); }
  root.append(box);
}

function act(item, action, note) {
  try {
    const index = state.items.findIndex(row => row.id === item.id);
    state.items[index] = transitionCase(state.items[index], action, nowLabel(), note);
    $("form-message").textContent = `${item.id}: cambio registrado solo en la demo.`;
    $("form-message").classList.remove("error-message");
    render();
  } catch (error) {
    $("form-message").textContent = error.message;
    $("form-message").classList.add("error-message");
    $("form-message").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

function render() {
  renderMap();
  const unresolved = countUnresolved(state.items);
  $("unresolved-count").textContent = `${unresolved} ${unresolved === 1 ? "abierto" : "abiertos"}`;
  const list = $("case-list"); list.replaceChildren();
  for (const item of state.items) {
    const button = el("button", `case-row${state.selectedId === item.id ? " active" : ""}`); button.type = "button";
    button.setAttribute("aria-pressed", String(state.selectedId === item.id));
    const label = el("span"); label.append(el("strong", "", `${item.id} · ${item.category}`), el("small", "", `${item.history.at(-1).at} · caso simulado`));
    button.append(label, el("span", `status-badge status-${item.status}`, STATUS[item.status]));
    button.onclick = () => { state.selectedId = item.id; render(); };
    list.append(button);
  }
  renderCaseDetail();
}

async function captureMotion() {
  const status = $("sensor-status");
  if (!("DeviceMotionEvent" in window)) { status.textContent = "Este navegador no ofrece movimiento. Usa la muestra simulada."; return; }
  try {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
      const permission = await DeviceMotionEvent.requestPermission();
      if (permission !== "granted") { status.textContent = "Permiso no concedido. Puedes usar la muestra simulada."; return; }
    }
    status.textContent = "Capturando durante 3 segundos; no se guarda una traza...";
    let peak = 0, samples = 0;
    const handler = (event) => {
      const a = event.accelerationIncludingGravity;
      if (![a?.x, a?.y, a?.z].every(Number.isFinite)) return;
      const magnitude = Math.hypot(a.x, a.y, a.z);
      peak = Math.max(peak, Math.abs(magnitude - 9.81) / 9.81);
      samples++;
    };
    window.addEventListener("devicemotion", handler);
    await new Promise(resolve => window.setTimeout(resolve, 3000));
    window.removeEventListener("devicemotion", handler);
    if (!samples) { status.textContent = "No llegaron datos del sensor. Usa la muestra simulada."; return; }
    $("peak-g").value = Math.min(3, peak).toFixed(2);
    status.textContent = `Muestra local capturada: ${$("peak-g").value} g. Los ${samples} eventos crudos se descartaron.`;
    updateTriage();
  } catch { status.textContent = "No se pudo leer el sensor. Usa la muestra simulada."; }
}

function init() {
  seed();
  $("report-form").addEventListener("submit", submitReport);
  $("cancel-edit").addEventListener("click", resetForm);
  for (const id of ["description", "peak-g", "repeats"]) $(id).addEventListener("input", updateTriage);
  $("example-point").addEventListener("click", () => setPoint({ lat: 19.558, lon: -99.263 }));
  $("sim-button").addEventListener("click", () => { $("peak-g").value = "0.49"; $("repeats").value = "2"; $("sensor-status").textContent = "Muestra inventada: 0.49 g · 2 observaciones. No proviene de un vehículo."; updateTriage(); });
  $("sensor-button").addEventListener("click", captureMotion);
  $("route-map").addEventListener("click", (event) => {
    const rect = $("route-map").getBoundingClientRect();
    setPoint(pointToGeo((event.clientX - rect.left) / rect.width, (event.clientY - rect.top) / rect.height));
  });
  $("route-map").addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setPoint({ lat: 19.558, lon: -99.263 }); }
    const step = 0.002;
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
      event.preventDefault();
      const point = state.point ?? { lat: 19.558, lon: -99.263 };
      setPoint({ lat: Math.max(BOUNDS.minLat, Math.min(BOUNDS.maxLat, point.lat + (event.key === "ArrowUp" ? step : event.key === "ArrowDown" ? -step : 0))), lon: Math.max(BOUNDS.minLon, Math.min(BOUNDS.maxLon, point.lon + (event.key === "ArrowRight" ? step : event.key === "ArrowLeft" ? -step : 0))) });
    }
  });
  updateTriage(); render();
}

init();
