# Design review · Ruta Clara

**23 Sep 2026 · refinement stage · desktop and 390 × 844 mobile viewport**

## First impression

The original screen made the concept clear but felt like a plain academic dashboard: the same white card treatment covered the form, map and case ledger, and the primary action competed with a large headline. The redesigned shell uses a focused product hero, a distinct workbench and clearer status cards while keeping “demo / invented data” explicit.

## Findings and changes

| Finding | Severity | Change |
| --- | --- | --- |
| Primary task was below a white editorial intro without a strong CTA | Moderate | Added a clear hero CTA and top navigation to report, map, cases and principles |
| Form, map and case ledger shared weak visual hierarchy | Moderate | Added a dark product surface, workbench heading, tighter panel system and colored status states |
| Decorative hero could delay the report form on a narrow screen | Moderate | Kept the visual on desktop, hid it at the mobile breakpoint; report CTA remains visible in the first viewport |
| Original teal button on white had about 3.29:1 contrast | Moderate | Darkened to `#087d75`; white text now has about 5.0:1 contrast |
| Several controls were below a 44 px touch target | Moderate | Raised small, text and workflow controls to at least 44 px high |
| “0 datos personales” sounded like a guarantee despite free-text entry | Moderate | Replaced it with the verifiable demo statement “0 envíos externos” |

## What remained intentionally unchanged

- The form, map and ledger stay in the same task order; data semantics and workflow rules were not redesigned.
- All reports, ML outputs, verification actions and authority closure are labeled simulated.
- No live safety benefit, real payment, validated route or team vote is implied.
- Focus still moves to the new case after submission, including on mobile.

## Verification

The refreshed page rendered at desktop and 390 × 844. A new invented report could be submitted on mobile and the resulting case received focus. Unit tests should be rerun after this UI-only change. This is a design refinement and local test, **not** a public redeployment or independent persona test.
