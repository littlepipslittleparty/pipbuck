// basically some approaches from the internet, squeezed through my linter.
import type {
  RGB,
  HSL,
  HSLA,
  HSV,
} from './types';
import {
  isHSL,
  isHSLA,
  isRGB,
} from './types';

type HexColor = string;

/**
 * Converts a color component to hex.
 *
 * @param c
 * @returns {string}
 *
 * @see https://stackoverflow.com/a/5624139/3423324
 */
function componentToHex(c: number): string {
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

/**
 * Converts `rgb = {r, g, b}` to `#rrggbb` hex.
 *
 * @param rgb {{r: number, g: number, b: number}}
 * @returns {string} The hex string `#RRGGBB`
 * @see https://stackoverflow.com/a/5624139/3423324
 */
export function RGBtoHex(rgb: RGB): HexColor {
  return `#${componentToHex(rgb.r)}${componentToHex(rgb.g)}${componentToHex(rgb.b)}` as HexColor;
}

/**
 * Converts `#rrggbb` to `rgb = {r, g, b}`.
 *
 * @param hex {string} The hex string: `#RRGGBB`.
 * @returns {{r: number, g: number, b: number}} The RGBs.
 * @see https://stackoverflow.com/a/5624139/3423324
 */
export function HexToRGB(hex: HexColor): RGB | null {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const convertedHex = (hex as string).replace(
    shorthandRegex,
    (m: string, r: string, g: string, b: string) => r + r + g + g + b + b,
  );

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(convertedHex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}


/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param r {number} The red color value
 * @param g {number} The green color value
 * @param b {number} The blue color value
 * @return {{h: number, s: number,  l: number }} The HSL representation
   * @see http://rgb2hsl.nichabi.com/javascript-function.php
 */
export function RGBtoHSL(r: number, g: number, b: number): HSL;  // eslint-disable-line no-unused-vars,max-len
export function RGBtoHSL(r: RGB): HSL;  // eslint-disable-line no-unused-vars,max-len
export function RGBtoHSL(r: number | RGB, g?: number, b?: number): HSL {
  if (isRGB(r)) {
    if (g !== undefined && b !== undefined) {
      throw new Error(
        'If you provide an RGB object as first "r" parameter, '
        + 'you shouldn\'t specify the two other parameters "g" and "b".'
        + '',
      );
    }
    return RGBtoHSL(r.r, r.g, r.b);
  }
  if (g === undefined || b === undefined) {
    throw new Error('If you don\'t provide an RGB object as first "r" parameter, you must specify the two other parameters "g" and "b".')
  }
  const calculatedR = r / 255;
  const calculatedG = g / 255;
  const calculatedB = b / 255;

  const max = Math.max(calculatedR, calculatedG, calculatedB);
  const min = Math.min(calculatedR, calculatedG, calculatedB);
  let h = 0; // default for achromatic
  let s = 0; // default for achromatic
  let l = (max + min) / 2;

  if (max !== min) {
    // not achromatic
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case calculatedR:
        h = (calculatedG - calculatedB) / d + (calculatedG < calculatedB ? 6 : 0);
        break;
      case calculatedG:
        h = (calculatedB - calculatedR) / d + 2;
        break;
      case calculatedB:
        h = (calculatedR - calculatedG) / d + 4;
        break;
      default: throw new Error('max case not found.');
    }

    h /= 6; // https://stackoverflow.com/2353211/#comment52742002_9493060
  }
  h = Math.floor(h * 360);
  s = Math.floor(s * 100);
  l = Math.floor(l * 100);
  return { h, s, l };
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param h The hue
 * @param s The saturation
 * @param l The lightness
 * @returns {} The RGB representation
 * @see http://hsl2rgb.nichabi.com/javascript-function.php
 */
export function HSLtoRGB(h: number, s: number, l: number): RGB;  // eslint-disable-line no-unused-vars,max-len
export function HSLtoRGB(h: HSL): RGB;  // eslint-disable-line no-unused-vars,max-len
export function HSLtoRGB(h: number | HSL, s?: number, l?: number): RGB {
  if (isHSL(h, true)) {
    if (s !== undefined && l !== undefined) {
      throw new Error(
        'If you provide an HSL object as first "h" parameter, '
        + 'you shouldn\'t specify the two other parameters "s" and "l".'
        + '',
      );
    }
    return HSLtoRGB(h.h, h.s, h.l);
  }
  if (s === undefined || l === undefined) {
    throw new Error(
      'If you don\'t provide an HSL object as first "h" parameter, '
      + 'you must specify the two other parameters "s" and "l".'
      + '',
    );
  }
  let r;
  let g;
  let b;
  let computedH: number = !Number.isFinite(h) ? 0 : h;
  let computedS: number = !Number.isFinite(s) ? 0 : s;
  let computedL: number = !Number.isFinite(l) ? 0 : l;

  computedH /= 60;
  if (computedH < 0) {
    computedH = 6 - (-computedH % 6);
  }
  computedH %= 6;
  computedS = Math.max(0, Math.min(1, computedS / 100));
  computedL = Math.max(0, Math.min(1, l / 100));

  const c = (1 - Math.abs((2 * computedL) - 1)) * computedS;
  const x = c * (1 - Math.abs((computedH % 2) - 1));

  if (computedH < 1) {
    r = c;
    g = x;
    b = 0;
  } else if (computedH < 2) {
    r = x;
    g = c;
    b = 0;
  } else if (computedH < 3) {
    r = 0;
    g = c;
    b = x;
  } else if (computedH < 4) {
    r = 0;
    g = x;
    b = c;
  } else if (computedH < 5) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  const m = computedL - c / 2;
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
}

/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and v in the set [0, 1].
 *
 * @param r {number} The red color value
 * @param g {number} The green color value
 * @param b {number} The blue color value
 * @return {{h: number, s: number,  v: number }} The HSV representation
 */
export function RGBtoHSV(r: number, g: number, b: number): HSV {
  const calculatedR = r / 255;
  const calculatedG = g / 255;
  const calculatedB = b / 255;

  const max = Math.max(calculatedR, calculatedG, calculatedB); const
    min = Math.min(calculatedR, calculatedG, calculatedB);
  let h;
  const v = max;

  const d = max - min;
  const s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case calculatedR:
        h = (calculatedG - calculatedB) / d + (calculatedG < calculatedB ? 6 : 0);
        break;
      case calculatedG:
        h = (calculatedB - calculatedR) / d + 2;
        break;
      case calculatedB:
        h = (calculatedR - calculatedG) / d + 4;
        break;
      default: throw new Error('max not found');
    }
    h /= 6;
  }

  return { h, s, v };
}

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param h {number}  The hue.
 * @param s {number}  The saturation.
 * @param v {number}  The brightness.
 * @return {{r: number, g: number,  b: number }}  The RGB representation
 */
export function HSBtoRGB(h: number, s: number, v: number): RGB {
  let r;
  let g;
  let b;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
    default: throw new Error('strange number');
  }

  return { r: r * 255, g: g * 255, b: b * 255 };
}

/**
 * Converts HSL to a CSS string.
 * Either the hex format `"#RRGGBB"` without alpha,
 * or `"rgba(R, G, B, A)"` if a numeric alpha is given.
 *
 * @param h {number|{h: number, s: number, l: number, a: number}|{h:number,s:number,l:number}}
 *        Hue. 0° - 359°
 * @param s {number?} Saturation. 0% - 100%.
 * @param l {number?} Luminescence. 0% - 100%.
 * @param a {number?|null}
 *    Alpha. 0% - 100%. Or null/undefined/NaN if you want the hex color instead of a rgba(…) result.
 * @returns {string}
 *    Either the hex format `"#RRGGBB"` without alpha,
 *    or `"rgba(R, G, B, A)"` if a numeric alpha is given.
 */
export function hsl(h: number, s: number, l: number, a?: number|null): string;  // eslint-disable-line no-unused-vars,max-len
export function hsl(h: HSL|HSLA): string;  // eslint-disable-line no-unused-vars,max-len
export function hsl(h: number|HSL|HSLA, s?: number, l?: number, a?: number|null): string {
  if (isHSLA(h, true)) {
    if (s !== undefined && l !== undefined && a !== undefined) {
      throw new Error(
        'If you provide an HSL(A) object as first "h" parameter, '
        + 'you shouldn\'t specify the two other parameters "s", "l" and "a".'
        + '',
      );
    }
    return hsl(h.h, h.s, h.l, h.a);
  }
  if (isHSL(h, true)) {
    if (s !== undefined && l !== undefined && a !== undefined) {
      throw new Error(
        'If you provide an HSL(A) object as first "h" parameter, '
        + 'you shouldn\'t specify the two other parameters "s", "l" and "a".'
        + '',
      );
    }
    return hsl(h.h, h.s, h.l);
  }
  if (s === undefined || l === undefined) {
    throw new Error(
      'If you don\'t provide an HSL object as first "h" parameter, '
      + 'you must specify the two other parameters "s" and "l". "a" is optional.'
      + '',
    );
  }
  const HSLs = {
    h: Number.isFinite(h) ? h % 360 : 0,  // 0° - 359°, 360° == 0°
    s: Number.isFinite(s) ? Math.min(Math.max(s, 0), 100) : 0, // 0% - 100%
    l: Number.isFinite(l) ? Math.min(Math.max(l, 0), 100) : 0, // 0% - 100%
  };
  const RGBs = HSLtoRGB(HSLs);
  if (a === undefined || a === null || !Number.isFinite(a)) {
    // use hex "#RRGGBB"
    return RGBtoHex(RGBs);
  }
  // use hex "rgba(R, G, B, A)"
  const { r, g, b } = RGBs;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/**
 * Converts a hex value to HSL, returning null if it can't be parsed.
 * @return {{h: number, s: number, l: number} | null}
 */
export function HexToHSL(hex: HexColor): HSL | null {
  const rgb = HexToRGB(hex);
  if (rgb === null) {
    return null;
  }
  return RGBtoHSL(rgb);
}
