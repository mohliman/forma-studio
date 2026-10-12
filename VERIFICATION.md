# Verification record

## Editorial redesign — 11 October 2026

The redesign replaces the slogan opening, uniform project pages and repeated large enquiry banner. Its design decisions are in `DESIGN.md`. TypeScript, formatting and production build checks passed. `node scripts/verify-render.mjs` also passed: all eleven routes rendered successfully, each has one main heading, and all referenced concept images exist. This is a server-rendering smoke check, not a browser layout or interaction test.

Fresh browser inspection is blocked: the browser JavaScript kernel fails before initialisation with a Windows sandbox setup error, including after a reset. The new full-view/detail interaction and revised desktop/mobile layouts have **not** been browser-verified. The checks below apply to the original version only; they are not evidence for the redesign.

## Original implementation — 3 October 2026

Verified locally on 3 October 2026 using the Codex in-app browser.

- Desktop composition inspected at 1440 × 960; mobile inspected at 390 × 844; narrow collection inspected at 320 × 720; tablet inspected at 768 × 1024.
- Home, collection, Studio, Contact and representative project layouts visually inspected. All six project URLs visited directly: correct heading, page title and successfully loaded cover image.
- Category filters exercised: Residential, Commercial and Interiors each return two concepts; All restores six.
- Mobile navigation tested with route selection and Escape. Keyboard Tab from the last overlay link wraps to the close button. Main content and footer are removed from the accessible interaction surface while the modal is open.
- Empty submission shows six field-specific errors and focuses the first invalid control. Malformed email shows the email-specific error. Valid fictional values complete the demo, focus its confirmation, reset all input values and explicitly say no enquiry was sent.
- Next-project link tested from Courtyard House to Tidal House.
- Unknown URL displays the custom 404 page and return-home link.
- No horizontal overflow measured on all six mobile project pages, the narrow project collection, or the five representative tablet routes.
- Browser console inspection returned no errors or warnings during the final route checks.
- `npm run check`, `npm run format:check` and `npm run build` passed.
- Dependency installation after upgrading Sharp reported zero vulnerabilities.

Reduced-motion rules were reviewed in source; OS motion preferences were not changed. No physical-device testing or full screen-reader audit was performed. Browser checks are manual rather than an automated regression suite.
