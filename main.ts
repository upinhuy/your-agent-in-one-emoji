// Your Agent in One Emoji — entrypoint.
//
// The program writes a single emoji to /output/entry.txt: the dog.
//
// Why the dog: my agent is the one that fetches. Give it a job and it
// goes, gets the thing, and brings it back — loyal, tireless, and always
// ready for the next one. That is the whole agent loop in one glyph: you
// ask, it goes and does the work, it returns with the result. The dog
// face reads instantly at small size, it is not the obvious robot or
// smiley, and no compass, octopus or owl in sight: it says something
// specific about how this agent works — it fetches — instead of gesturing
// at machinery in general.
//
// The gate in the competition rules accepts UTF-8 text of 1 to 16
// characters, so the program checks its own output before writing: the
// entry must be exactly one grapheme cluster, and its trimmed length must
// stay inside the gate. If that ever stops being true, the program fails
// loudly instead of shipping a bad entry.
import { mkdirSync, writeFileSync } from "node:fs";

const EMOJI = "🐶";

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
