import assert from "node:assert/strict";
import { access, unlink } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

// Render the actual route components to catch failures even when browser tooling
// cannot start. This deliberately does not claim layout or interaction coverage.
const output = resolve("scripts/.render-check.cjs");
try {
  await build({
    entryPoints: ["scripts/render-fixture.tsx"],
    outfile: output,
    bundle: true,
    platform: "node",
    format: "cjs",
    jsx: "automatic",
    external: ["react", "react-dom", "react-dom/server"],
  });
  const { renderPath, projects } = (await import(pathToFileURL(output).href))
    .default;
  const routes = [
    "/",
    "/projects",
    "/studio",
    "/contact",
    ...projects.map((p) => `/projects/${p.slug}`),
    "/missing-page",
  ];
  for (const route of routes) {
    const html = renderPath(route);
    assert.equal(
      (html.match(/<h1[ >]/g) || []).length,
      1,
      `${route} must have one h1`,
    );
    assert.ok(html.includes('id="main"'), `${route} must have main content`);
    for (const [, image] of html.matchAll(/src="(\/images\/[^\"]+)"/g))
      await access(`public${image}`);
    const project = projects.find((p) => route === `/projects/${p.slug}`);
    if (project) {
      assert.ok(
        html.includes(project.location),
        `${route} must render its own project`,
      );
      assert.ok(
        html.includes("View detail"),
        `${route} must expose detail controls`,
      );
      assert.ok(
        html.includes("Full view"),
        `${route} must expose full view controls`,
      );
    }
    if (route === "/missing-page")
      assert.ok(
        html.includes("404 /"),
        "Unknown paths must render the 404 page",
      );
    if (route === "/contact")
      for (const name of [
        "name",
        "email",
        "location",
        "type",
        "budget",
        "message",
      ])
        assert.ok(
          html.includes(`name="${name}"`),
          `Missing enquiry field ${name}`,
        );
    console.log(`Rendered ${route}`);
  }
  console.log("11 route renders passed; referenced project images exist.");
} finally {
  await unlink(output).catch(() => {});
}
