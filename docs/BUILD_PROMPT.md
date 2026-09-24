# Implementation prompt for coding agent — Ruta Clara Week 7

Use `docs/PACKET.md` as the source of product scope. Build an accessible, responsive static app with no backend and no real-person data. Keep “piloto simulado” visible. Use invented cases and illustrative Atizapán corridor coordinates, not a claim of a validated route.

Implement in small, testable increments:

1. A mobile-first report screen with a tappable SVG geodata map. Acceptance: keyboard and pointer users can pick an illustrative point; selected latitude/longitude are visible; no geolocation permission is requested automatically.
2. A validated report form. Acceptance: category, description (12–240 chars) and point are required; errors are inline and announced; user can correct a report; unsafe HTML is never injected.
3. A tiny, explicit k-nearest-neighbors model trained only on synthetic labeled motion samples. Acceptance: deterministic output, named features/labels and clear “suggestion only” copy; never drives sanctions, closure or payment.
4. Optional one-shot phone-motion capture, with simulation fallback. Acceptance: explicit opt-in, no continuous listener after sample, no upload, no raw trace stored.
5. A local workflow ledger with demo-role controls. Acceptance: only independent-verifier action can verify; only case-owner action can close with remedy/sign-off; driver can correct own submitted/rejected report; payment becomes *eligible* on verification, not claimed paid; unresolved cases stay visible.
6. A privacy/limits panel and a concise case history. Acceptance: shadow clause is visible; no personal identifiers, real payout, real authority submission or safety-effect claim.

Use Node built-in tests for pure logic and browser smoke tests. Commit plan for an isolated project repository: (1) packet and scaffold, (2) map/form, (3) ML/sensor, (4) ledger/privacy, (5) tests and copy. Deploy v1 after core flow and v2 after test fixes. Record only real commit/deploy URLs and test results; do not fabricate them. End each session by updating `DECISIONS.md` with decisions and tomorrow's first move, then commit/push when configured.
