// Entry dates are plain YYYY-MM-DD strings. Everything here works in UTC with fixed English
// names, so the server and the browser always agree and nothing depends on the clock.

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const pad = (n: number) => String(n).padStart(2, "0");

export function parseIso(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m0: m - 1, d };
}

export const toIso = (y: number, m0: number, d: number) => `${y}-${pad(m0 + 1)}-${pad(d)}`;

const utc = (iso: string) => {
  const { y, m0, d } = parseIso(iso);
  return Date.UTC(y, m0, d);
};

/** Whole days from b to a. */
export const dayDiff = (a: string, b: string) => Math.round((utc(a) - utc(b)) / 86_400_000);

/** "Tuesday 27 October" */
export function formatLong(iso: string) {
  const { m0, d } = parseIso(iso);
  return `${WEEKDAYS[new Date(utc(iso)).getUTCDay()]} ${d} ${MONTHS[m0]}`;
}

export const monthLabel = (y: number, m0: number) => `${MONTHS[m0]} ${y}`;
export const daysInMonth = (y: number, m0: number) => new Date(Date.UTC(y, m0 + 1, 0)).getUTCDate();
/** Blank cells before the 1st when weeks start on Monday. */
export const mondayOffset = (y: number, m0: number) => (new Date(Date.UTC(y, m0, 1)).getUTCDay() + 6) % 7;
