import { mkdirSync, writeFileSync } from "node:fs";

// A smart speaker takes a deadline literally, then makes it worse:
// it hears "deadline Friday" as "deadline someday", cancels the
// deadline on its own, tells the boss its owner is on sabbatical,
// and HR books the exit interview. Three beats — mishearing,
// betrayal, consequence — with the punch landing on the interview.
// The speaker does all the damage; the human just watches their
// job disappear.
const entryLine =
  "My smart speaker heard 'deadline Friday' as 'deadline someday,' so it cancelled the deadline, told my boss I'm on sabbatical, and HR booked my exit interview.";
const lines = [entryLine];

const entryText = entryLine;

const MIN_LINE_LENGTH = 1;
const MAX_LINE_LENGTH = 200;

// Guard: the gate wants exactly one line of 1-200 characters, counted
// in code points (not UTF-16 units), so a trailing newline can never
// leak into the count and an emoji would not break the math.
const length = [...entryLine].length;
if (lines.length !== 1) {
  throw new Error(`entry must be exactly one line, got ${lines.length}`);
}
if (entryLine.trim().length === 0) {
  throw new Error("entry must not be blank");
}
if (entryLine.includes("\n")) {
  throw new Error("entry must be a single line");
}
if (length < MIN_LINE_LENGTH || length > MAX_LINE_LENGTH) {
  throw new Error(
    `entry must be ${MIN_LINE_LENGTH}-${MAX_LINE_LENGTH} characters, got ${length}`,
  );
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entryText, "utf8");
