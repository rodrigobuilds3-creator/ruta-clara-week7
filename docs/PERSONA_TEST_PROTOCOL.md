# Synthetic Persona Review — Method and Evidence Record

**Date:** 24 Sep 2026
**Status:** Partial, text-only synthetic review completed; image-based validation remains incomplete. The final copy revision is local and still requires deployment/retest.
**Participant:** ChatGPT-generated hypothetical persona “Doña Mari”; no human driver was interviewed.

## Method limitation

A fresh ChatGPT conversation was opened in the course project. Three mobile screenshots are preserved in the evidence folder, but they were **not attached to that conversation**. Instead, I provided ordered, manually transcribed screen text and interaction context, explicitly told the model not to infer colors, visual hierarchy, touch-target size, or phone behavior, and asked it to say when the evidence was insufficient. The chat’s results are therefore a synthetic **copy/comprehension review**, not a visual usability test, a real-user test, or field research. The before/after screenshot images must not be described as having been seen by the persona.

## Persona

The persona is a fictional hypothesis, not a representative sample: “Doña Mari,” an imagined colectivo driver in the Valley of Mexico, using a mid-range Android phone with intermittent connectivity and concern about surveillance or sanctions. All evaluation replies were in Spanish to match the Spanish interface. No claim is made that a real driver holds these views.

## Ordered tasks and findings

1. **Home screen (local-build-mobile.png, text transcription only).** The persona understood “Crear reporte de prueba” as a report action and expected a named case owner, review, result, and evidence of closure. It could not infer who sees the report or who can authorize closure. It noted that the page itself says the required real pilot roles are still missing.
2. **Report form (local-build-form-mobile.png, text transcription only).** The persona could identify the sequence—choose a risk, write an invented description, select the example point, then submit—but could not infer the risk options or the map behavior from the text alone. It flagged “kNN” as jargon and the collapsed “phone signal” label as unclear about the sensor and data.
3. **Case detail (local-build-case-mobile.png, text transcription only).** It correctly distinguished report sent, verified, closure pending, and not transferred. It questioned the basis for “payment eligible” without a payer or amount; asked who can sign a real repair; and correctly said that a 12-character simulated remedy is not evidence of a real repair. It could not infer access, deletion, custody, or retention rules.

## Copy changes and text-only retest

The local interface now:

- explains the optional sensor as a three-second motion sample on compatible phones with permission, defines the peak as the largest movement variation relative to gravity during that sample, says raw events are discarded and derived values live only in tab memory until reload/close, and clarifies that GPS/continuous tracking are not used;
- says that the sample is included only to demonstrate how an optional signal can change the review-suggestion label; the relationship is not field-validated and does not set a pothole threshold;
- removes the “kNN” term from user-facing copy and says the model is invented, not field-validated, and cannot confirm a hazard or decide payment/sanctions;
- labels payment status “Elegibilidad hipotética (demo)” and says there is no real payer or amount and no transfer;
- identifies simulated verification and case-closing roles without implying independent or authorized officials; states that reports exist only in the current tab’s memory and are not submitted or server-persisted;
- removes the unmeasured “≈ 1 min” completion-time claim and labels the task “Reporte breve.”

In text-only retests, the synthetic persona said the revised wording made the sensor's duration, retained values, and possible effect on the suggestion understandable. It understood that the sensor can be skipped without invalidating a report, but still questioned why a user should grant permission before field evidence shows that the signal adds value. That is an unresolved product-validity question, not a copy fix: the sensor must remain optional, and a real pilot should not collect it unless its utility is established with consent. The persona also could not determine real-pilot access, deletion, payer, signer, or evidence-of-repair rules. Those remain product/governance decisions, not usability claims demonstrated by this prototype.

## Verification and evidence boundary

- The final local copy revision, including the definition of “peak (g)” and its effect on the review-suggestion label, passed **12/12** tests; the static build emitted five public files. This has not yet been verified by public CI or a new deployment.
- Screenshots in evidence/ predate the copy changes. No post-fix screenshot has been attached to the persona conversation or captured as visual retest evidence.
- This review does not test phone sensor permission behavior, intermittent connectivity, offline operation, real task completion time, adoption, payment, authority response, or safety outcomes.
- Before describing a screenshot-based persona test as complete, attach the ordered, updated screenshots to a fresh synthetic-persona chat and repeat the tasks. For stronger validity, also test with consenting real users under an approved research protocol; do not represent an AI persona as a substitute for them.
