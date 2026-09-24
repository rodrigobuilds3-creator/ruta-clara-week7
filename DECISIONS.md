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

**Next first move at that time:** publish through a dedicated Week 7 repository/host once access and audience are resolved; then run the required independent persona walkthrough and record the video at the verified URL.

## 2026-09-24 · session 3 / public release and evidence audit

- The dedicated GitHub repository is public, the GitHub Pages URL is live over HTTPS, and three public deployments have succeeded. The repository history has 13 meaningful commits; CI ran the test/build workflow. Do not pad or restate counts without checking the current release history.
- The public synthetic test exposed a real unresolved-case counter defect: a rejected-but-correctable report disappeared from the count. The code now counts every case except `closed` as unresolved; the regression is tested and the public retest passed. Content-hash asset URLs were then deployed to reduce stale-module risk. A stale cached HTML tab can still require a fresh versioned document.
- Locked functional acceptance is deliberately narrower than the product hypothesis: “A user can complete, correct, and inspect a simulated hazard-report workflow with simulated verification and closure, while the app preserves unresolved cases and prevents the ML output from deciding payment eligibility, sanctions, verification, closure, or truth.” WhatsApp/spreadsheet comparative performance, user demand, crash reduction, and institutional effectiveness are outside acceptance and untested.
- “Worker-controlled” describes design intent, not demonstrated governance capability. The app has no actual worker identity, access-control, deletion/retention policy, real payment, authority endpoint, or operating institution. Verifier and case-owner actions are simulations; the app is not a real worker-controlled service.
- A material local substitute was identified: the Municipality of Atizapán describes “Atizapán te Escucha” as a geolocated channel for municipal service requests, including potholes, routed to the relevant directorate and followed through resolution. This is an official municipal description, not independently verified performance today or evidence that a named corridor uses the app. Ruta Clara must not claim a unique pothole-reporting/closure function without first testing the existing service and confirming driver need.
- The synthetic-persona chat is a distinct test artifact. It is not a driver interview or field study. If screenshots are not actually transmitted to that chat, the record must say so and limit the persona findings to the text evidence supplied.
- Course feedback is applied: name an accountable payer/owner before any real-pilot claim; distinguish the regulator and operator; don't imply official authorization; don't claim that IMSS enrollment data establishes income loss; and do not describe the 2017 EOD peak-trip shares as the share of all transit users.

**Next actions:** finish and preserve the fresh Brain and Business chats; complete a clearly labeled synthetic UI review; update the packet and persona record to separate observed implementation from hypotheses; deliver the PDFs and video scripts. No Brightspace submission or team-vote claim has been made.
