from pathlib import Path
from html import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Image, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT.parents[3] / "output" / "pdf" / "PACKET_Rodrigo_Pena_WEEK7.pdf"
IMAGE = ROOT / "assets" / "mockup-generated.png"
NAVY = colors.HexColor("#183451")
TEAL = colors.HexColor("#3F7780")
AMBER = colors.HexColor("#E9AD53")
INK = colors.HexColor("#233949")
SLATE = colors.HexColor("#60737E")
LINE = colors.HexColor("#DCE5E6")
PALE = colors.HexColor("#F2F7F5")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="KickerX", fontName="Helvetica-Bold", fontSize=8, leading=11, textColor=TEAL, spaceAfter=8))
styles.add(ParagraphStyle(name="TitleX", fontName="Helvetica-Bold", fontSize=27, leading=29, textColor=NAVY, spaceAfter=8))
styles.add(ParagraphStyle(name="SubX", fontName="Helvetica", fontSize=10.5, leading=15, textColor=SLATE, spaceAfter=8))
styles.add(ParagraphStyle(name="H1X", fontName="Helvetica-Bold", fontSize=17, leading=21, textColor=NAVY, spaceBefore=4, spaceAfter=10))
styles.add(ParagraphStyle(name="H2X", fontName="Helvetica-Bold", fontSize=11, leading=14, textColor=INK, spaceBefore=10, spaceAfter=5))
styles.add(ParagraphStyle(name="BodyX", fontName="Helvetica", fontSize=8.8, leading=12.7, textColor=INK, spaceAfter=7))
styles.add(ParagraphStyle(name="SmallX", fontName="Helvetica", fontSize=7.4, leading=10.5, textColor=SLATE, spaceAfter=6))
styles.add(ParagraphStyle(name="BulletX", fontName="Helvetica", fontSize=8.4, leading=12, textColor=INK, leftIndent=11, firstLineIndent=-7, spaceAfter=4))
styles.add(ParagraphStyle(name="BoxX", fontName="Helvetica-Bold", fontSize=8.1, leading=11, textColor=NAVY, alignment=TA_CENTER))
styles.add(ParagraphStyle(name="TableX", fontName="Helvetica", fontSize=7.6, leading=10.5, textColor=INK))
styles.add(ParagraphStyle(name="TableHX", fontName="Helvetica-Bold", fontSize=7.6, leading=10, textColor=colors.white))

def p(text, style="BodyX"):
    return Paragraph(text, styles[style])

def bullets(items):
    return [p("- " + item, "BulletX") for item in items]

def grid(rows, widths, header=False):
    converted = []
    for row_index, row in enumerate(rows):
        converted.append([p(cell, "TableHX" if header and row_index == 0 else "TableX") if isinstance(cell, str) else cell for cell in row])
    table = Table(converted, colWidths=widths, repeatRows=1 if header else 0, hAlign="LEFT")
    commands = [("VALIGN", (0, 0), (-1, -1), "TOP"), ("GRID", (0, 0), (-1, -1), .4, LINE), ("LEFTPADDING", (0, 0), (-1, -1), 7), ("RIGHTPADDING", (0, 0), (-1, -1), 7), ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6)]
    if header:
        commands.append(("BACKGROUND", (0, 0), (-1, 0), NAVY))
    table.setStyle(TableStyle(commands))
    return table

def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, letter[1] - .34 * inch, letter[0], .34 * inch, stroke=0, fill=1)
    canvas.setFont("Helvetica-Bold", 7)
    canvas.setFillColor(AMBER)
    canvas.drawString(.55 * inch, letter[1] - .22 * inch, "RUTA CLARA  /  BUSINESS BENDING  /  WEEK 7")
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(SLATE)
    canvas.drawRightString(letter[0] - .55 * inch, .34 * inch, f"Rodrigo Peña de León Pérez  |  {doc.page}")
    canvas.restoreState()

OUT.parent.mkdir(parents=True, exist_ok=True)
doc = SimpleDocTemplate(str(OUT), pagesize=letter, topMargin=.58 * inch, bottomMargin=.55 * inch, leftMargin=.55 * inch, rightMargin=.55 * inch, title="Ruta Clara - Packet Week 7", author="Rodrigo Peña de León Pérez")
story = []
story += [Spacer(1, .08 * inch), p("PRE-CODE PRODUCT PACKET · 23 SEPTEMBER 2026", "KickerX"), p("Ruta Clara", "TitleX"), p("Paid hazard knowledge with verification and accountable closure", "SubX"), p("Rodrigo Peña de León Pérez · Team 4 · Adversary · academic simulation", "SmallX")]
cover_right = [p("The problem", "H2X"), p("A colectivo driver knows where a road hazard repeatedly appears, yet that knowledge is rarely paid for, independently verified or visibly resolved. A sensor trace can easily become a worker score or a silent autonomous-training asset."), p("Exact user", "H2X"), p("A consenting driver with an older vehicle and patchy connectivity. Secondary demo roles: independent verifier and authority/concession-holder case owner. No real operator or institution is represented."), p("Success before the module closes", "H2X"), p("At a live demo URL, choose an illustrative location, submit a validated report, see synthetic ML triage, verify it, see payment become <b>eligible before closure</b>, and record a signed demo remedy. Unresolved cases remain visible."), p("Status", "H2X"), p("Team 4's Blueprint is a draft synthesis: bets and Rodrigo's slice still need live debate and confirmation. Route, stop pair, operator, payer and data controller remain TBD.", "SmallX")]
image = Image(str(IMAGE), width=2.5 * inch, height=4.43 * inch)
story += [grid([[image, cover_right]], [2.6 * inch, 4.78 * inch]), Spacer(1, .15 * inch), p("Image-generated mockup", "H2X"), p("The visual is an AI-generated design reference, not a screenshot of a working service. Its route, street and case are illustrative. The edit made payment independent of authority closure.", "SmallX"), PageBreak()]

story += [p("1. How the slice works", "H1X"), p("Driver opt-in → pin and short report → validation → synthetic kNN triage → local demo ledger → independent verification or reasoned rejection → payment eligible on verification → authority/concession-holder remedy and closure. ML never makes the verification or closure decision."), p("Flowchart", "H2X")]
flow_rows = [
    ["Driver chooses point + report", "Validate input", "kNN suggests review"],
    ["Local demo case", "Verifier decides", "Payment eligible / correctable"],
    ["Case stays open", "Owner records remedy", "Demo closure signed"],
]
flow = grid(flow_rows, [2.46 * inch] * 3)
flow.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), PALE), ("BOX", (0, 0), (-1, -1), 1, TEAL)]))
story += [flow, p("Mermaid flowchart and actor swimlane are in <b>docs/PACKET.md</b>, the canonical packet source.", "SmallX"), p("Actor swimlane", "H2X"), grid([
    ["Actor", "Action", "Decision right"],
    ["Driver", "Opt in, pin, describe, correct", "Can decline and correct own contribution"],
    ["Client-side system", "Validate and show synthetic kNN suggestion", "No sanction, payout or closure decision"],
    ["Independent verifier (demo)", "Review evidence, verify or reject with reason", "Makes verification decision"],
    ["Authority/case owner (demo)", "Record remedy and sign case closure", "Makes closure decision; cannot erase unresolved history"],
], [1.55 * inch, 3.0 * inch, 2.83 * inch], header=True), p("Benchmark", "H2X"), p("<link href='https://fixmystreet.org/how-it-works/' color='#276b71'>FixMyStreet</link> is the clearest comparable public-reporting workflow: geographically pinned issues route to responsible bodies and remain visible with updates. Ruta Clara localizes this to one Mexican colectivo corridor and adds paid, correctable worker knowledge plus a shadow-clause veto. This is a relevant benchmark, not a measured global ranking."), p("Three-year view", "H2X"), p("A consented test could become a maintained corridor evidence service linking driver knowledge to verified hazards and accountable repairs. Aggregated passenger reliability is added only if cost, data quality and worker burden support it. The product never becomes a driver score or silent autonomous-training pipeline; any broader use needs new worker approval, compensation and an income-protecting transition."), PageBreak()]

story += [p("2. What is and is not being built", "H1X"), p("Scope cut", "H2X"), *bullets(["No ride-hailing, dispatch, passenger tracking, driver ranking, autonomous driving or real payouts.", "No institutional case submission, real corridor claim or measured safety-improvement claim.", "No personal data, continuous motion tracking or hidden reuse of driver knowledge."]), p("Dragon Stack and architecture", "H2X"), grid([
    ["Layer", "Implementation", "Guardrail"],
    ["Geodata/maps", "Illustrative lat/lon SVG route and selectable pin", "Not a validated route or stop pair"],
    ["ML", "Small k-nearest-neighbors model on invented labeled motion examples", "Suggestion only; no sanctions or closure"],
    ["Phone telemetry", "One opt-in local motion window, plus simulated fallback", "Discard raw events; no continuous tracking"],
    ["Ledger", "Validated local in-memory case state and human demo role actions", "No backend, identifiers, secrets or real transfer"],
], [1.25 * inch, 3.15 * inch, 2.98 * inch], header=True), p("Blueprint acceptance gates", "H2X"), *bullets(["Before a real pilot, identify actual corridor/stop pair, operator, payer, controller, independent verifier and closure signer. All remain TBD.", "A real outcome claim needs a two-week baseline and route/time measures: waits, crowding, breakdowns, verified hazards, response, unresolved cases, false positives, driver burden and cost. Report count is not fewer crashes.", "Passenger view, if added, is aggregate only; contradictory data gets human review. No automatic dispatch, subsidy or sanction.", "Participation and knowledge must be voluntary, paid, correctable, access-limited and retention-limited.", "Shadow clause: no employment surveillance, insurance/licensing scores or autonomous-training reuse without fresh worker approval, compensation and income protection. Declining costs no route or job.", "Old-vehicle and intermittent-connectivity fit, support and maintenance budget require field validation."]), PageBreak()]

story += [p("3. Verification and handoff", "H1X"), p("Security floor", "H2X"), *bullets(["No secrets in code or repository; no backend or API key is used.", "No real personal data is entered or stored; demo cases are labeled invented.", "Every text/numeric form field has bounds; dynamic user text is inserted as text, never raw HTML.", "A real personal-data pilot would need authentication, access controls and row-level data protection before launch."]), p("Test plan", "H2X"), *bullets(["Unit tests: report validation, legal state transitions, payment timing, map-coordinate conversion and deterministic kNN.", "Browser flow: invalid fields, pin, submit, verify, reject/correct, leave open and close with a remedy.", "Mechanical bug-fix-retest cycle and a second deployment must be evidenced, not merely promised.", "Synthetic-persona test needs a fresh chat and ordered screenshots; log confusion and fix the worst issue. It is not field research.", "Check live HTTPS URL, five commits, two real deployments, three-minute demo + 30-second reflection, and required PDFs before submission."]), p("Current verified status", "H2X"), p("Local prototype and unit tests exist. A blank motion input was found to be parsed as zero, fixed with explicit empty-value handling, and covered by a regression test. Browser retest confirmed the field is now rejected. Public deployment, independent persona chat, five commits, two deployments and demo video are not yet evidenced."), p("Open decisions / launch blockers", "H2X"), p("Exact corridor and stop pair; operator; independent verifier; authority/concession-holder signer; payer and amount; data controller, retention and correction process; worker approval of any new data use. The Blueprint does not record a unanimous vote or completed live debate."), p("Source files", "H2X"), p("docs/PACKET.md contains the complete packet and Mermaid diagrams. docs/BUILD_PROMPT.md contains acceptance criteria and a five-commit/two-deployment plan. This PDF is a review copy, not evidence that outstanding steps occurred.", "SmallX")]

doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
print(OUT)
