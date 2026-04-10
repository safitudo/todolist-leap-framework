/**
 * Smoke tests — human-authored guardrails
 * These verify the generated app actually works in a browser context.
 * Catches: missing files, broken imports, TypeScript served to browser, etc.
 */

import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const SRC = join(__dirname, "../src");

describe("Build output sanity", () => {
  it("src/index.html exists", () => {
    expect(existsSync(join(SRC, "index.html"))).toBe(true);
  });

  it("index.html loads .js files, not .ts", () => {
    const html = readFileSync(join(SRC, "index.html"), "utf-8");
    // Must have at least one .js script
    expect(html).toMatch(/\.js["']/);
    // Must NOT load .ts files — browsers can't execute TypeScript
    expect(html).not.toMatch(/<script[^>]+src=["'][^"']+\.ts["']/);
  });

  it("all script src files exist on disk", () => {
    const html = readFileSync(join(SRC, "index.html"), "utf-8");
    const srcMatches = html.matchAll(/src=["']([^"']+)["']/g);
    for (const match of srcMatches) {
      const file = match[1];
      if (file.startsWith("http")) continue; // skip CDN
      expect(existsSync(join(SRC, file)), `Missing file: ${file}`).toBe(true);
    }
  });

  it("generated .js files have no imports from outside src/", () => {
    const jsFiles = ["app.js"];
    for (const file of jsFiles) {
      const path = join(SRC, file);
      if (!existsSync(path)) continue;
      const content = readFileSync(path, "utf-8");
      // No imports reaching outside src/ (like ../schemas/)
      expect(content).not.toMatch(/from\s+["']\.\.\/(?!src)/);
    }
  });

  it("no .ts imports in .js files", () => {
    const jsFiles = ["app.js"];
    for (const file of jsFiles) {
      const path = join(SRC, file);
      if (!existsSync(path)) continue;
      const content = readFileSync(path, "utf-8");
      // .js files must not import .ts files
      expect(content).not.toMatch(/from\s+["'][^"']+\.ts["']/);
    }
  });
});
