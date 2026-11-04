// One small diagram per law, drawn on a 200 x 140 grid. The markup is built from constants in
// this file, never from user input. Colours come from the `svg .ink`, `svg .acc` ... classes in
// globals.css, so the pictures follow the page's palette.

const R = (x: number, y: number, w: number, h: number, c = "soft", rx = 3, e = "") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" class="${c}" ${e}/>`;
const C = (x: number, y: number, r: number, c = "soft", e = "") =>
  `<circle cx="${x}" cy="${y}" r="${r}" class="${c}" ${e}/>`;
const L = (x1: number, y1: number, x2: number, y2: number, c = "ink", e = "") =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${c}" ${e}/>`;
const P = (d: string, c = "ink", e = "") => `<path d="${d}" class="${c}" ${e}/>`;
const T = (x: number, y: number, s: string, e = "") =>
  `<text x="${x}" y="${y}" text-anchor="middle" class="tx" ${e}>${s}</text>`;
const seq = (n: number) => Array.from({ length: n }, (_, i) => i);
const CURSOR = (x: number, y: number) =>
  P(`M${x} ${y} l0 20 l5.5 -4.5 l4.5 9 l3.5 -1.7 l-4.5 -9 l7 0z`, "inkf");

const ART: Record<string, () => string> = {
  "aesthetic-usability-effect": () =>
    R(20, 26, 72, 88, "ink", 4) + L(30, 48, 82, 48, "softs") + L(30, 62, 82, 62, "softs") + L(30, 76, 70, 76, "softs") + R(30, 92, 52, 12, "ink", 2) +
    R(108, 26, 72, 88, "soft", 12) + R(118, 42, 40, 6, "inkf", 3) + R(118, 56, 52, 6, "brn", 3) + R(118, 68, 36, 6, "brn", 3) + R(118, 88, 52, 16, "acc", 8) +
    P("M168 34 l2.5 6.5 6.5 2.5 -6.5 2.5 -2.5 6.5 -2.5 -6.5 -6.5 -2.5 6.5 -2.5z", "acc star"),
  "choice-overload": () =>
    seq(30).map((k) => {
      const i = k % 6, j = Math.floor(k / 6);
      return R(24 + i * 28, 18 + j * 23, 20, 16, ["soft", "soft", "brn", "acc", "mut"][(i * 7 + j * 3) % 5], 3);
    }).join(""),
  chunking: () =>
    seq(3).map((g) => seq(3).map((i) => C(34 + g * 62 + i * 15, 66, 6, "inkf")).join("") + L(27 + g * 62, 88, 63 + g * 62, 88, "accs")).join(""),
  "cognitive-bias": () =>
    P("M20 70 Q100 14 180 70 Q100 126 20 70Z", "ink") + C(100, 70, 24, "soft") + C(112, 64, 13, "acc") + C(117, 59, 4, "cd"),
  "cognitive-load": () =>
    R(58, 28, 84, 92, "ink", 6) + R(66, 94, 68, 18, "soft") + R(66, 72, 68, 18, "brn") + R(66, 50, 68, 18, "soft") + R(74, 12, 52, 26, "acc", 4),
  "doherty-threshold": () =>
    C(100, 74, 42, "ink") + R(92, 20, 16, 7, "inkf", 2) + P("M100 74 L100 40 A34 34 0 0 1 134 74Z", "acc") + L(100, 74, 100, 40, "ink") + T(100, 134, "400 MS"),
  "fitts-law": () =>
    CURSOR(24, 98) + L(40, 98, 122, 70, "softs", 'stroke-dasharray="5 5"') + C(150, 56, 32, "acc") + C(62, 30, 6, "brn"),
  flow: () =>
    L(30, 114, 30, 22, "softs") + L(30, 114, 180, 114, "softs") + P("M30 114 L180 36 L180 62 L58 114Z", "soft") +
    P("M36 108 C70 100 90 82 118 72 S158 50 172 44", "accs") + C(172, 44, 5, "acc"),
  "goal-gradient-effect": () =>
    seq(6).map((i) => { const h = 20 + i * 14; return R(28 + i * 24, 118 - h, 18, h, i === 5 ? "acc" : "soft", 3); }).join("") +
    L(20, 118, 184, 118, "softs") + L(157, 28, 157, 10, "ink") + P("M157 10 l16 6 l-16 6z", "inkf"),
  "hicks-law": () =>
    [30, 80, 130, 175].map((x) => L(100, 26, x, 72, "softs")).join("") + L(130, 72, 112, 116, "softs") + L(130, 72, 148, 116, "softs") +
    C(100, 26, 9, "acc") + [30, 80, 175].map((x) => C(x, 72, 7, "soft")).join("") + C(130, 72, 7, "brn") + C(112, 116, 5, "soft") + C(148, 116, 5, "acc"),
  "jakobs-law": () =>
    R(22, 18, 156, 104, "ink", 6) + L(22, 38, 178, 38, "ink") + C(33, 28, 2.5, "inkf") + C(42, 28, 2.5, "inkf") + R(32, 48, 24, 8, "inkf", 2) +
    [82, 106, 132].map((x) => R(x, 50, 18, 5, "soft", 2)).join("") + R(156, 46, 14, 12, "acc", 3) +
    R(32, 68, 70, 42, "soft", 4) + R(110, 68, 60, 18, "soft", 4) + R(110, 92, 60, 18, "soft", 4),
  "law-of-common-region": () =>
    R(22, 28, 70, 84, "ink", 12) + R(108, 28, 70, 84, "ink", 12) +
    C(44, 54, 6, "inkf") + C(70, 54, 6, "inkf") + C(57, 88, 6, "inkf") + C(130, 54, 6, "acc") + C(156, 54, 6, "acc") + C(143, 88, 6, "acc"),
  "law-of-pragnanz": () => R(26, 38, 64, 64, "ink", 3) + C(112, 70, 34, "ink") + P("M72 112 L112 34 L152 112Z", "accs"),
  "law-of-proximity": () =>
    [40, 100, 160].map((cx) => [[-9, -9], [9, -9], [-9, 9], [9, 9]].map(([dx, dy]) => C(cx + dx, 70 + dy, 5.5, "inkf")).join("")).join(""),
  "law-of-similarity": () =>
    seq(5).map((i) => seq(3).map((j) => {
      const x = 34 + i * 33, y = 32 + j * 34;
      return i % 2 === 0 ? C(x, y, 9, "acc") : R(x - 9, y - 9, 18, 18, "soft", 3);
    }).join("")).join(""),
  "law-of-uniform-connectedness": () =>
    L(34, 46, 86, 46, "accs") + L(34, 46, 60, 98, "accs") + L(86, 46, 60, 98, "accs") +
    C(34, 46, 7, "acc") + C(86, 46, 7, "acc") + C(60, 98, 7, "acc") + C(124, 46, 7, "soft") + C(160, 46, 7, "soft") + C(142, 98, 7, "soft"),
  "mental-model": () =>
    R(24, 30, 80, 70, "ink", 10) + R(96, 44, 80, 70, "accs", 10, 'stroke-dasharray="6 5"') + C(64, 65, 8, "soft") + C(136, 79, 8, "acc"),
  "millers-law": () =>
    seq(7).map((i) => R(22 + i * 23, 58, 17, 26, "soft", 3)).join("") + P("M22 48 v-10 h155 v10", "accs") + T(100, 112, "7 ± 2"),
  "occams-razor": () =>
    P("M24 100 C 40 20 60 120 80 50 S 110 130 130 40 S 160 100 176 40", "softs") + L(24, 100, 176, 40, "accs") + C(24, 100, 5, "inkf") + C(176, 40, 5, "acc"),
  "paradox-of-the-active-user": () =>
    R(46, 16, 108, 108, "ink", 6) + L(60, 38, 140, 38, "softs") + L(60, 52, 140, 52, "softs") + L(60, 66, 124, 66, "softs") + R(60, 84, 52, 18, "acc", 9) + CURSOR(122, 92),
  "pareto-principle": () =>
    [92, 60, 34, 22, 16, 12, 9, 6].map((h, i) => R(26 + i * 18, 118 - h, 13, h, i < 2 ? "acc" : "soft", 2)).join("") + L(20, 118, 184, 118, "softs") + T(150, 40, "80 / 20"),
  "parkinsons-law": () =>
    R(24, 34, 152, 18, "softs", 4, 'stroke-dasharray="5 5"') + R(24, 34, 66, 18, "acc", 4) + R(24, 88, 152, 18, "acc", 4) + L(100, 60, 100, 78, "ink") + P("M94 72 l6 6 l6 -6", "ink"),
  "peak-end-rule": () =>
    L(20, 118, 184, 118, "softs") + P("M24 90 L50 80 L76 96 L102 32 L128 84 L154 70 L176 56", "ink") + C(102, 32, 6, "acc") + C(176, 56, 6, "acc"),
  "postels-law": () =>
    P("M38 32 L162 32 L116 86 L116 112 L84 112 L84 86Z", "ink") + R(50, 10, 14, 14, "soft", 2) + C(98, 17, 7, "brn") + P("M128 24 l8 -14 l8 14z", "acc") + R(90, 118, 20, 14, "acc", 3),
  "selective-attention": () =>
    seq(7).map((i) => seq(4).map((j) => {
      const x = 34 + i * 22, y = 34 + j * 24;
      return C(x, y, 5, Math.hypot(x - 100, y - 70) < 30 ? "acc" : "soft");
    }).join("")).join("") + C(100, 70, 34, "accs"),
  "serial-position-effect": () =>
    [88, 50, 38, 32, 38, 50, 84].map((h, i) => R(26 + i * 22, 118 - h, 16, h, i === 0 || i === 6 ? "acc" : "soft", 3)).join("") + L(20, 118, 184, 118, "softs"),
  "teslers-law": () =>
    R(24, 34, 60, 72, "ink", 6) + L(34, 56, 74, 56, "softs") + L(34, 72, 60, 72, "softs") + R(116, 34, 60, 72, "ink", 6) +
    P("M126 90 l10 -30 l10 30 l10 -30 l10 30", "accs") + L(90, 70, 110, 70, "ink") + P("M104 64 l6 6 l-6 6", "ink"),
  "von-restorff-effect": () =>
    seq(5).map((i) => seq(3).map((j) => {
      const x = 36 + i * 32, y = 34 + j * 36;
      return i === 2 && j === 1 ? C(x, y, 12, "acc") : R(x - 10, y - 10, 20, 20, "soft", 3);
    }).join("")).join(""),
  "working-memory": () =>
    seq(7).map((i) => C(32 + i * 22, 70, 8, "acc", `opacity="${[1, 1, 1, 1, 0.5, 0.3, 0.15][i]}"`)).join("") + R(18, 50, 90, 40, "accs", 12),
  "zeigarnik-effect": () =>
    C(100, 70, 38, "softs") + P("M100 32 A38 38 0 1 1 63.9 58.3", "accs") + C(63.9, 58.3, 5, "acc") + T(100, 77, "80%", 'style="font-size:18px"'),
};

export function artSvg(slug: string) {
  return ART[slug]?.() ?? "";
}
