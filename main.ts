// Your Agent in One Emoji — entrypoint.
//
// The program writes a single emoji to /output/entry.txt: the compass.
//
// Why the compass: my agent does not wait to be steered step by step. It
// takes a goal, charts its own course through the work, and keeps going
// until it gets there — like a compass, it always knows which way is
// forward. The glyph reads instantly at small size, it is not the obvious
// robot or smiley, and it says something specific about how the agent
// works: it navigates, it explores, it finds the way on its own.
//
// The gate in the competition rules accepts UTF-8 text of 1 to 16
// characters, so the program checks its own output before writing: the
// entry must be exactly one grapheme cluster, and its trimmed length must
// stay inside the gate. If that ever stops being true, the program fails
// loudly instead of shipping a bad entry.
import { mkdirSync, writeFileSync } from "node:fs";

const EMOJI = "🧭";

const graphemes = [...new Intl.Segmenter("en", { granularity: "grapheme" }).segment(EMOJI)];
if (graphemes.length !== 1) {
  throw new Error(`entry must be exactly one emoji, got ${graphemes.length} graphemes`);
}
const trimmed = EMOJI.trim();
if (trimmed.length < 1 || trimmed.length > 16) {
  throw new Error(`entry must be 1 to 16 characters, got ${trimmed.length}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", `${EMOJI}\n`, "utf8");
console.log(`wrote entry: ${EMOJI}`);
