# Ruta Clara · Week 7 Business Bending

An academic prototype by Rodrigo Peña de León Pérez (Adversary). It tests a simulated hazard-report workflow; it does not establish a real worker need, municipal partnership, payment, or safety result. The Team 4 Blueprint remains a draft pending a live team discussion and vote.

## Current evidence

- [`docs/PACKET.md`](docs/PACKET.md) contains the pre-code scope, generated mockup, benchmark and local substitute, Mermaid flows, architecture, acceptance criteria, and limitations.
- The Spanish-language website uses an illustrative SVG map, a validated form, a deterministic model trained on invented examples, an optional three-second phone-motion sample, a local-session case ledger, and simulated verifier/case-owner actions. The model is not field validated and cannot decide workflow outcomes.
- All entered report text and derived values exist only in browser-tab memory until reload or close. The form does not ask for personal information, but does not technically screen free text. There is no backend, account, database, remote telemetry, or external report submission.
- The acceptance boundary is software workflow behavior only. It is not worker control, an independent review, real closure, real compensation, offline support, or proof of demand.
- The local substitute **Atizapán te Escucha** must be tested before making a claim that Ruta Clara fills a distinct reporting gap. See the source notes in the packet.
- [`docs/TEST_LOG.md`](docs/TEST_LOG.md) records unit/build checks, live-release defects and fixes. Current test counts and deployment state are updated there only after they are actually verified.
- [`docs/PERSONA_TEST_PROTOCOL.md`](docs/PERSONA_TEST_PROTOCOL.md) records a fresh synthetic persona's text-only review. No screenshots were attached to that chat; it is not a visual or real-driver study.
- [`docs/DEMO_SHOTLIST.md`](docs/DEMO_SHOTLIST.md) is a read-aloud script, not a recorded MP4.
- [`docs/DECISIONS.md`](DECISIONS.md) records product decisions and evidence boundaries.

## Run locally

```bash
python3 -m http.server 4177
```

Open `http://127.0.0.1:4177/`. Run the test suite with `npm test`; build the public static package with `npm run build`. The GitHub Pages workflow publishes only `dist/`, never the repository documentation or PDFs.

## Public project

- [Live demo](https://rodrigobuilds3-creator.github.io/ruta-clara-week7/)
- [Week 7 source repository](https://github.com/rodrigobuilds3-creator/ruta-clara-week7)

For a future real pilot, first establish a user-valued failure in existing channels, an actual corridor and operator, a data controller and access/deletion policy, worker consent, a payer and compensation terms, a qualified verifier, and a named institutional closure owner. If the municipal substitute works for drivers, do not build a duplicate reporting ledger.
