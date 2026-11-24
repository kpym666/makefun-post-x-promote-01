// Entry for the make.fun bounty "post-x-promote-make-your-own-bounty-01".
//
// The entry itself is a post on X promoting make.fun's make-your-own-bounty
// feature. This program does not create the post; it only carries the post's
// address into the harness output directory, so the house can read it back
// from POST.json and score the post.

import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

try {
  mkdirSync(outDir, { recursive: true });
  copyFileSync(join(botDir, "POST.json"), join(outDir, "POST.json"));
  console.log(`POST.json copied to ${join(outDir, "POST.json")}`);
} catch (error) {
  console.error(
    `Failed to copy POST.json from ${botDir} to ${outDir}:`,
    error,
  );
  process.exit(1);
}
