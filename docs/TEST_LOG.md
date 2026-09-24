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
