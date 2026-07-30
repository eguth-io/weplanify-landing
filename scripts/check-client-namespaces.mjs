#!/usr/bin/env node
/**
 * Guards the invariant behind `clientNamespaces` in src/i18n/client-namespaces.ts.
 *
 * The root locale layout only hands the client provider the namespaces that
 * client code actually reads, instead of the whole ~500 KB catalog. That list is
 * hand-maintained, so this walks the real client boundary and fails the build if
 * the two ever drift apart.
 *
 * The client boundary is every file carrying "use client", plus everything those
 * files import transitively — a module without the directive still ships to the
 * browser when a client component imports it, and next-intl's `useTranslations`
 * is isomorphic, so the directive alone cannot tell you where it runs.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";

const SRC = resolve(process.cwd(), "src");
const LIST = join(SRC, "i18n", "client-namespaces.ts");
const EXTS = [".tsx", ".ts", ".jsx", ".js"];

const walk = (dir, out = []) => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (EXTS.some((x) => p.endsWith(x))) out.push(p);
  }
  return out;
};

const read = (f) => readFileSync(f, "utf8");

/** Resolve an import specifier to a file inside src/, or null if external. */
const resolveImport = (spec, fromFile) => {
  let base;
  if (spec.startsWith("@/")) base = join(SRC, spec.slice(2));
  else if (spec.startsWith(".")) base = resolve(dirname(fromFile), spec);
  else return null; // node_modules
  for (const e of EXTS) if (existsSync(base + e)) return base + e;
  for (const e of EXTS) {
    const idx = join(base, "index" + e);
    if (existsSync(idx)) return idx;
  }
  return existsSync(base) && statSync(base).isFile() ? base : null;
};

const importsOf = (file) =>
  [...read(file).matchAll(/(?:from|import)\s*["']([^"']+)["']/g)]
    .map((m) => resolveImport(m[1], file))
    .filter(Boolean);

const namespacesIn = (file) =>
  [...read(file).matchAll(/useTranslations\(\s*["']([^"']+)["']/g)].map((m) => m[1]);

// 1. Client boundary roots: files with the "use client" directive.
const all = walk(SRC);
const roots = all.filter((f) => /^\s*["']use client["']/m.test(read(f)));

// 2. Transitive closure of their imports — this is what ships to the browser.
const closure = new Set();
const stack = [...roots];
while (stack.length) {
  const f = stack.pop();
  if (closure.has(f)) continue;
  closure.add(f);
  for (const dep of importsOf(f)) if (!closure.has(dep)) stack.push(dep);
}

// 3. Namespaces read from inside that closure.
const needed = new Set();
for (const f of closure) for (const ns of namespacesIn(f)) needed.add(ns);

// 4. Compare against the declared list.
const declared = new Set(
  [...read(LIST).matchAll(/^\s*["']([a-zA-Z0-9_]+)["']\s*,/gm)].map((m) => m[1])
);

const missing = [...needed].filter((n) => !declared.has(n)).sort();
const extra = [...declared].filter((n) => !needed.has(n)).sort();

if (missing.length) {
  console.error(
    "\n✗ i18n client payload: namespace(s) read by client code but not passed to " +
      "NextIntlClientProvider.\n  Add to src/i18n/client-namespaces.ts, or these render " +
      "as raw keys in the browser:\n" +
      missing.map((n) => `    - ${n}`).join("\n") +
      "\n"
  );
  process.exit(1);
}

if (extra.length) {
  console.error(
    "\n✗ i18n client payload: namespace(s) declared but no longer read by any client " +
      "code.\n  Remove from src/i18n/client-namespaces.ts — they are dead weight on every " +
      "page:\n" +
      extra.map((n) => `    - ${n}`).join("\n") +
      "\n"
  );
  process.exit(1);
}

console.log(
  `✓ i18n client payload: ${needed.size} namespace(s) shipped, ` +
    `matching ${closure.size} files in the client boundary.`
);
