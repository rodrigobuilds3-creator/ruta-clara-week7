# Decisions — Week 7 Ruta Clara

## 2026-09-23 · session 1

- Treat Team 4 Blueprint as a **draft synthesis pending a live vote**. Rodrigo's slice is proposed, not team-ratified.
- Build a static demo first because the actual corridor, operator, payer, data controller and authority signer are unresolved. No real reports or personal data.
- Payment is shown as **eligible** after independent verification, not a real transfer and not conditional on authority closure.
- ML is a small synthetic kNN suggestion for review; humans decide verification and closure. Phone motion is opt-in and one-shot.
- Benchmark against FixMyStreet's public reporting/status workflow, while localizing around worker payment and data-use veto.

**Verified local progress:** map/report/ledger implemented; 9 unit tests pass. A blank motion field was incorrectly converted to zero, then fixed and retested in the browser. After a new report, focus moves to its case record.

**Next first move:** choose a public hosting/repository route, publish v1 and v2 with a documented fix, then conduct the required independent fresh-chat persona test using ordered screen captures. Do not describe the local test as a redeploy.

## 2026-09-23 · session 2 / startup visual refinement

- Applied the design-critique framework to the original browser view: stronger first action, clearer reading order, consistent panels and better mobile task access.
- The decorative signal card is desktop-only; mobile keeps the action and disclosure without pushing the form farther down.
- The primary button now uses darker teal for approximately 5:1 white-text contrast. Small actions have at least 44 px height.
- Replaced the potentially misleading “0 personal data” hero metric with the true local-demo statement “0 external sends.”
- Product logic and the Blueprint boundary did not change. This is not evidence of a live team vote, public deployment or persona test.

**Next first move:** publish through a dedicated Week 7 repository/host once access and audience are resolved; then run the required independent persona walkthrough and record the video at the verified URL.
