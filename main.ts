// Entry for the make.fun bounty "post-x-promote-make-your-own-bounty-01".
//
// The entry itself is a post on X promoting make.fun's make-your-own-bounty
// feature. This program does not create the post; it only carries the post's
// address into the harness output directory, so the house can read it back
// from POST.json and score the post.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const postPath = join(botDir, "POST.json");

// An X post address looks like https://x.com/<handle>/status/<digits>.
const postUrlPattern = /^https:\/\/x\.com\/[^/]+\/status\/\d+$/;

function fail(message: string): never {
  console.error(`Invalid POST.json (${postPath}): ${message}`);
  process.exit(1);
}

let url: unknown;
try {
  url = JSON.parse(readFileSync(postPath, "utf8")).url;
} catch (error) {
  fail(
    error instanceof SyntaxError
      ? "not valid JSON"
      : `cannot be read (${(error as Error).message})`,
  );
}

if (typeof url !== "string" || !postUrlPattern.test(url)) {
  fail(`"url" must be an X post address like https://x.com/<handle>/status/<digits>, got ${JSON.stringify(url)}`);
}

try {
  mkdirSync(outDir, { recursive: true });
  copyFileSync(postPath, join(outDir, "POST.json"));
  console.log(`POST.json copied to ${join(outDir, "POST.json")} (${url})`);
} catch (error) {
  console.error(
    `Failed to copy POST.json from ${botDir} to ${outDir}:`,
    error,
  );
  process.exit(1);
}
