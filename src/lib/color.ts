/* Colour maths for per-app accents. Inputs are six-digit hex strings. */
export type Rgb = [number, number, number];

export const hexToRgb = (hex: string): Rgb => {
  const m = /^#([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) throw new Error(`Not a #rrggbb colour: ${hex}`);
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

export const rgbToHex = ([r, g, b]: Rgb): string =>
  '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');

const channel = (c: number): number => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};

/** Relative luminance per WCAG 2. */
export const luminance = (hex: string): number => {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

/** WCAG contrast ratio between two colours, 1 to 21. */
export const contrast = (a: string, b: string): number => {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
};

/** The accent, darkened in 8 % steps until it reads on white at `min` contrast. */
export const linkColor = (hex: string, min = 3): string => {
  let rgb = hexToRgb(hex);
  let out = rgbToHex(rgb);
  let guard = 0;
  while (contrast(out, '#ffffff') < min && guard < 40) {
    rgb = rgb.map((v) => Math.max(0, Math.round(v * 0.92))) as Rgb;
    out = rgbToHex(rgb);
    guard += 1;
  }
  return out;
};

/** "r g b" for CSS `rgb(var(--accent-rgb) / 12%)`. */
export const rgbTriplet = (hex: string): string => hexToRgb(hex).join(' ');
