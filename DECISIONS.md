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

## 2026-09-24 · session 4 / public-copy release and falsification

- The Brain Bending exchange began at 14:04:57 UTC and continued past 14:44:57 UTC. It rejected the 74.1% EOD shorthand and retained only INEGI's period-specific 2017 ZMVM shares: 72.8%, 72.9%, and 76.0% of public-transport trips at morning, midday, and evening peak. The national position is an allocation hypothesis with one progressively rising evidence bar for human-driven and autonomous options, not a claim that Mexico has no AV law or that one side has already proven safer.
- For the separate product hypothesis, Atizapán te Escucha is the direct local pothole-reporting substitute. The official 2025 rules describe a phone-and-confirmation requirement for web reports and three-year retention of generated personal data; these are system properties, not evidence that drivers object. If existing channels do the job, or no payer and accountable closer emerge, kill Ruta Clara. No driver, corridor, payer, team vote, or pilot is being claimed.
- The text-only synthetic persona review explained the optional three-second motion summary and could skip it, but still questioned whether the signal adds value. No screenshots were attached to the chat and the existing screenshots predate the revised UI. The visual screenshot-based persona requirement remains incomplete; no human driver was interviewed.
- The revised interface and documentation were pushed as commit `fd0604c`. GitHub Actions run `36014715432` completed successfully in 28 seconds. Local tests pass 12/12 and the build emits five files. The live public smoke test created a fictional report, rejected it while preserving the two-open count, corrected/resubmitted it, simulated verification, and closed it; the count returned to one while the seeded case remained open. No external authority received the test case.
- Current public history at this code release: 14 meaningful commits and four successful deployments. No MP4 has been recorded and nothing has been submitted to Brightspace.

**Next actions:** finalize the English brief, raw chat exports, packet, persona limitations report, and large-type demo/reflection PDFs. Keep the MP4 and Brightspace submission explicitly outstanding for Rodrigo; do not represent the text-only synthetic review as a visual or human study.
