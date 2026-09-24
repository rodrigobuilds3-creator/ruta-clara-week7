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
