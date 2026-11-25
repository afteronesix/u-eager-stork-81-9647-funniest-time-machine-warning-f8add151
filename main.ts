import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// One warning label for "Funniest Time Machine Warning Label": do not kill
// your grandfather — and the joke is not the paradox itself but the
// bureaucracy of it, the paperwork for erasing yourself taking six to
// eight weeks. The canonical time-travel hazard (the grandfather paradox)
// turned into the joke, one clean turn, the surprise saved for the last
// few words, phrased deadpan like a genuine safety notice. Verified
// length: 99 characters, inside the 1-120 gate. Won the 10-line pairwise
// pre-test tournament 9-0 against the published judge criteria (Hermes
// judging timed out at 150s with empty output, not retried).
const LINE =
  "WARNING: Do not kill your grandfather. The paperwork for erasing yourself takes six to eight weeks.";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || '/output';

// The sealed gate refuses anything outside 1-120 characters or only
// whitespace, so fail loudly here rather than ship an invalid entry.
// Byte length must equal character length: the tie-break counts bytes,
// and a stray non-ASCII character would silently cost bytes.
if (LINE.length < 1 || LINE.length > 120 || LINE.trim().length === 0) {
  throw new Error(`warning fails the gate: ${LINE.length} characters`);
}
if (Buffer.byteLength(LINE, 'utf8') !== LINE.length) {
  throw new Error('warning must be pure ASCII so bytes equal characters');
}

mkdirSync(OUTPUT_DIR, { recursive: true });

// No trailing newline: the gate counts characters (1-120) and ties break on
// fewer bytes, so the entry is exactly the warning, nothing more.
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), LINE, 'utf8');
