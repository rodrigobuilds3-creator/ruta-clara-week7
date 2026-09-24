# Decisions — Week 7 Ruta Clara

## 2026-09-23 · session 1

- Treat Team 4 Blueprint as a **draft synthesis pending a live vote**. Rodrigo's slice is proposed, not team-ratified.
- Build a static demo first because the actual corridor, operator, payer, data controller and authority signer are unresolved. No real reports or personal data.
- Payment is shown as **eligible** after independent verification, not a real transfer and not conditional on authority closure.
- ML is a small synthetic kNN suggestion for review; humans decide verification and closure. Phone motion is opt-in and one-shot.
- Benchmark against FixMyStreet's public reporting/status workflow, while localizing around worker payment and data-use veto.

**Verified local progress:** map/report/ledger implemented; 9 unit tests pass. A blank motion field was incorrectly converted to zero, then fixed and retested in the browser. After a new report, focus moves to its case record.

**Next first move:** choose a public hosting/repository route, publish v1 and v2 with a documented fix, then conduct the required independent fresh-chat persona test using ordered screen captures. Do not describe the local test as a redeploy.
