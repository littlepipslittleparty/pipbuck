
export type RGB = {
  r: number;
  g: number;
  b: number;
};

/**
 * Checks that value is in [0, 255].
 * @param value
 */
export function isRgbValue(value: number): boolean {
  return value >= 0 && value <= 255;
}

export function isRGB(rgb: any): rgb is RGB {
    return typeof rgb === 'object'
        && typeof rgb.r === "number" && isRgbValue(rgb.r)
        && typeof rgb.g === "number" && isRgbValue(rgb.g)
        && typeof rgb.b === "number" && isRgbValue(rgb.b)
    ;
}

export type HSL = {
  h: number;
  s: number;
  l: number;
};

/**
 * Checks that value is in [0, 1].
 * @param value The value to check.
 */
export function isHslValue(value: number): boolean {
  return value >= 0 && value <= 1;
}

export function isHSL(hsl: any): hsl is HSL {
    return typeof hsl === 'object'
        && typeof hsl.h === "number" && isHslValue(hsl.h)
        && typeof hsl.s === "number" && isHslValue(hsl.s)
        && typeof hsl.l === "number" && isHslValue(hsl.l)
        && typeof hsl.a === "undefined"  // make sure we can't confuse this with HSLA.
    ;
}

export type HSLA = {
  h: number;
  s: number;
  l: number;
  a: number;
};

export function isHSLA(hsla: any): hsla is HSLA {
    return typeof hsla === 'object'
        && typeof hsla.h === "number" && isHslValue(hsla.h)
        && typeof hsla.s === "number" && isHslValue(hsla.s)
        && typeof hsla.l === "number" && isHslValue(hsla.l)
        && typeof hsla.a === "number" && isHslValue(hsla.a)
    ;
}

export type HSV = {
  h: number;
  s: number;
  v: number;
};


export function isHSV(hsv: any): hsv is HSV {
    return typeof hsv === 'object'
        && typeof hsv.h === "number" && isHslValue(hsv.h)
        && typeof hsv.s === "number" && isHslValue(hsv.s)
        && typeof hsv.v === "number" && isHslValue(hsv.v)
    ;
}

export type HexDigit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'a' | 'b' | 'c' | 'd' | 'e'| 'f' | 'A' | 'B' | 'C' | 'D' | 'E'| 'F';
export type HexColor<T extends string> =
    T extends `#${HexDigit}${HexDigit}${HexDigit}${infer Rest1}`
        ? (Rest1 extends ``
            ? T // three-digit hex color
            : (
                Rest1 extends `${HexDigit}${HexDigit}${HexDigit}`
                    ? T  // six-digit hex color
                    : never
            )
        )
        : never;
