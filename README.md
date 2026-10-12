# FORMA Studio

Live demo: [View site](https://forma-studio-three-chi.vercel.app) | [GitHub repository](https://github.com/mohliman/forma-studio)

An independent, fictional architecture and interior design portfolio. All six projects are architectural concepts, not buildings designed or completed by a real studio.

## Run locally

Requires Node.js 20.19+ (or 22.12+) and npm.

```sh
npm install
npm run dev
```

Open the local address printed by Vite (normally http://127.0.0.1:5173).

```sh
npm run check
npm run format:check
node scripts/verify-render.mjs
npm run build
npm run preview
```

Production output is in `dist/`. The static host rewrites unknown paths to `index.html` so `/projects/courtyard-house` and other client-side routes work on direct visits. The GitHub repository is connected to Vercel; `vercel.json` provides the route fallback and pushes to `main` deploy automatically.

## Structure

- `src/App.tsx`: shared navigation, footer, reusable project cards, route pages and demo form.
- `src/Editorial.tsx`: monograph cover, editorial plates, six project directions and accessible concept/detail image controls.
- `src/editorial.css`: publication grid, per-project arrangements and deliberate mobile compositions.
- `src/data.ts`: typed project data, copy, proposed materials and image descriptions.
- `src/styles.css`: design tokens, editorial layouts, responsive rules, focus states and reduced-motion support. Tailwind v4 is integrated through its Vite plugin; bespoke compositions use named CSS classes.
- `public/images/`: optimised, locally stored WebP concept images.
- `public/favicon.svg`: custom FORMA monogram.
- `assets-source.json`: image generation provenance and complete prompt set.
- `scripts/optimize-images.mjs`: local source-to-WebP preparation. Source paths refer to this machine's generated images; production assets are already included.
- `scripts/verify-render.mjs`: actual route rendering and image-reference smoke checks; does not verify browser layout or interactions.

## Design decisions

FORMA is composed as an architectural monograph. A large DM Sans masthead introduces one dominant concept image and a narrow annotation rail. Bodoni Moda supplies project titles and editorial statements; DM Sans supports readable body copy and navigation. Warm paper, ink and oxidised red index labels carry through the twelve-column publication grid. Different projects use different arrangements within courtyard, horizon and interior families. Mobile layouts reconsider image framing and reading order instead of uniformly stacking every block. The concept/detail control crops the same generated image and clearly labels the change. Motion focuses on this change of attention rather than blanket fade-and-slide reveals. Scrolling stays native, text remains visible, and reduced-motion preferences disable transitions. See `DESIGN.md` for the rationale.

## Demo-only behaviour

The enquiry form checks required fields, email shape and a minimum 20-character project description. Error messages are associated with fields; focus moves to the first error. A valid submission clears all fields and explicitly confirms that no enquiry was sent. There is no network submission, browser storage, backend, analytics, authentication or integration. Use invented information when trying the form. The fictional studio offers no actual professional services.

## Asset sources

All six architectural visualizations were generated using the built-in image generation tool for this project. Full generation prompts and original paths are in `assets-source.json`. No external architectural photographs are used. Each project uses one image; the detail study is explicitly labelled as a crop from that view, rather than another angle or a separate building. The images illustrate design ideas and are not construction documentation.

DM Sans and Bodoni Moda are bundled from their Fontsource packages and licensed under the SIL Open Font License. Their licence files are included in `public/licenses/` and in the font packages. Lucide icons use the ISC licence. Framework and library notices remain in their packages.

See `VERIFICATION.md` for the browser checks and their limits.

## Limitations

This is a portfolio demonstration, with no enquiry delivery or content management. Fictional project locations refer to imagined settings. Generated visualizations can contain architectural details that are not buildable. Each concept has a single generated view with a detail crop; additional coordinated views have not been commissioned. Responsive browser verification does not replace testing on physical devices or a full assistive-technology audit.
