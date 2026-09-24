# Mechanical test log · Week 7

**23 Sep 2026 · local browser, academic simulated data only**

## Pass 1

- `node --test tests/*.test.mjs`: 8/8 passed.
- Browser form rejected missing category, short description and missing map point.
- A valid invented report `RC-015` appeared pending verification; simulated verification made payment **eligible** while closure stayed pending.
- Code review found that `Number("")` turns a blank motion field into zero. This would let an empty sample pass validation. The first browser automation attempt to clear the numeric control did not actually clear it, so that interaction alone is not cited as proof of the bug.

## Fix and pass 2

- Added `parseNumericField`: empty/whitespace returns `NaN`, and a regression test checks that the validation rejects it.
- `node --test tests/*.test.mjs`: 9/9 passed.
- Reloaded the local page and explicitly cleared the motion control with keyboard select-all/backspace. The browser showed “La muestra debe estar entre 0 y 3 g” and did **not** create a case.
- Added focus/scroll to the newly created case after submission, because on a narrow screen the result otherwise sits below the map. Browser retest showed `document.activeElement.id === "case-detail"` for the new case.

## Not yet evidenced

- No public redeploy has occurred, so the course's **test-fix-redeploy** criterion is not yet met.
- No real-driver or independent fresh-chat persona test was performed; any persona write-up must be labeled synthetic.
- Actual sensor permission behavior on a supported phone and intermittent connectivity have not been tested.

## Visual refinement pass

- Reloaded the local app after the CSS/HTML changes. Desktop and 390 × 844 mobile layouts rendered without overlapping elements or horizontal overflow in the checked views.
- On mobile, an invented report was submitted and focus moved to its newly created case. The form/map/ledger flow still works after the redesign.
- White text on the primary button improved from approximately 3.29:1 to 5.0:1 contrast by darkening the teal background.
- This is a local smoke test; no public deployment or independent persona test is claimed.

## Static release package

- `npm test`: 10/10 passed, including a build-manifest check that only `index.html`, CSS, JavaScript modules and the generated marker enter `dist/`.
- `npm run build` completed; the packaged app opened at `http://127.0.0.1:4177/dist/` with the main form, map and ledger visible. A narrow browser screenshot showed the refreshed layout intact.
- In that packaged app, an invented bache report created `RC-015`; simulated verification changed it from “Pendiente de verificar / Aún no elegible” to “Verificado · cierre pendiente / Pago elegible · no transferido.” This was a local browser smoke test, not a real payment or deployment.
- Saved local browser screenshots in `evidence/`: `local-build-mobile.png`, `local-build-form-mobile.png` and `local-build-case-mobile.png`. The case screenshot predates the browser reload; the case is deliberately not persistent.
- A persona test protocol is ready in `docs/PERSONA_TEST_PROTOCOL.md`. No fresh chat or participant observation has been performed.
- The dedicated public repository was created and the first nine local commits were pushed on 23 Sep 2026. A GitHub Pages workflow has been prepared, but no successful deployment or public URL has yet been verified.

## First public deployment and live test

- GitHub Actions run `35950091251` initially failed because Pages had not yet been enabled. After choosing “GitHub Actions” as the Pages source, rerun attempt #2 succeeded: build 9 s, deploy 8 s, HTTPS URL `https://rodrigobuilds3-creator.github.io/ruta-clara-week7/`.
- The HTTPS page loaded from the in-app browser without the authenticated GitHub session. An invented report `RC-015` was created and then rejected with a fictional reason.
- **Observed defect:** `RC-015` remained “Rechazado · corregible” alongside the verified `RC-014`, but the counter dropped from “2 abiertos” to “1 abierto.” The screenshot is `evidence/live-v1-rejected-counter.png`. The rejected case is not closed and still requires correction, so excluding it understated pending work.
- Fix: count every case except `closed` as unresolved and add a regression test for the rejected + verified combination. This entry records the fix locally; a second public deployment and retest are still required before claiming closure.

## Second public deployment and retest

- GitHub Actions run `35950343611` for commit `a91a261` succeeded (build 6 s, deploy 9 s). The CI suite passed 11/11 tests.
- In a fresh Chrome tab at the public HTTPS URL, an invented `RC-015` was rejected while `RC-014` stayed verified. The counter remained at “2 abiertos,” matching the two unresolved cases. Evidence: `evidence/live-v2-rejected-counter.png`.
- The previously open in-app-browser tab still showed “1 abierto” immediately after reload, while the fresh Chrome tab showed the fix. This is consistent with an older JavaScript module being cached; it is **not** evidence that the second deploy failed. To reduce that stale-session risk, the build now adds content-hash query versions to CSS, app.js and both imported modules. This additional packaging change has passed local tests but is not yet deployed at the time of this entry.
