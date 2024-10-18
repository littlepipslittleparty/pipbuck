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

// eslint-disable-next-line max-len
// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export function isRGB(rgb: any): rgb is RGB {
    return rgb !== null
        && typeof rgb === 'object'
        && typeof rgb.r === 'number' && isRgbValue(rgb.r)
        && typeof rgb.g === 'number' && isRgbValue(rgb.g)
        && typeof rgb.b === 'number' && isRgbValue(rgb.b)
        && true;
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

/**
 * Checks that value for H is in [0, 359].
 * @param value The value to check.
 */
export function isHslIntegerHValue(value: number): boolean {
    return value >= 0 && value <= 359;
}

/**
 * Checks that value for S, L or A is in [0, 100].
 * @param value The value to check.
 */
export function isHslIntegerSLAValue(value: number): boolean {
    return value >= 0 && value <= 100;
}

// eslint-disable-next-line max-len
// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export function isHSL(hsl: any, bigNumbers: boolean): hsl is HSL {
    return typeof hsl === 'object'
        && typeof hsl.h === 'number' && (!bigNumbers ? isHslValue(hsl.h) : isHslIntegerHValue(hsl.h))
        && typeof hsl.s === 'number' && (!bigNumbers ? isHslValue(hsl.s) : isHslIntegerSLAValue(hsl.s))
        && typeof hsl.l === 'number' && (!bigNumbers ? isHslValue(hsl.l) : isHslIntegerSLAValue(hsl.l))
        && typeof hsl.a === 'undefined'  // make sure we can't confuse this with HSLA.
        && true;
}

export type HSLA = {
    h: number;
    s: number;
    l: number;
    a: number;
};

// eslint-disable-next-line max-len
// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export function isHSLA(hsla: any, bigNumbers: boolean): hsla is HSLA {
    return typeof hsla === 'object'
        && typeof hsla.h === 'number' && (!bigNumbers ? isHslValue(hsla.h) : isHslIntegerHValue(hsla.h))
        && typeof hsla.s === 'number' && (!bigNumbers ? isHslValue(hsla.s) : isHslIntegerSLAValue(hsla.s))
        && typeof hsla.l === 'number' && (!bigNumbers ? isHslValue(hsla.l) : isHslIntegerSLAValue(hsla.l))
        && typeof hsla.a === 'number' && (!bigNumbers ? isHslValue(hsla.a) : isHslIntegerSLAValue(hsla.a))
        && true;
}

export type HSV = {
    h: number;
    s: number;
    v: number;
};

// eslint-disable-next-line max-len
// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export function isHSV(hsv: any, bigNumbers: boolean): hsv is HSV {
    return typeof hsv === 'object'
        && typeof hsv.h === 'number' && (!bigNumbers ? isHslValue(hsv.h) : isHslIntegerHValue(hsv.h))
        && typeof hsv.s === 'number' && (!bigNumbers ? isHslValue(hsv.s) : isHslIntegerSLAValue(hsv.s))
        && typeof hsv.v === 'number' && (!bigNumbers ? isHslValue(hsv.v) : isHslIntegerSLAValue(hsv.v))
        && true;
}

export type HexDigit =
    '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | 'a'
    | 'b'
    | 'c'
    | 'd'
    | 'e'
    | 'f'
    | 'A'
    | 'B'
    | 'C'
    | 'D'
    | 'E'
    | 'F';

export type HexColor<T extends string> =
    T extends `#${HexDigit}${HexDigit}${HexDigit}${infer Rest1}`
        ? (Rest1 extends ''
            ? T // three-digit hex color
            : (
                Rest1 extends `${HexDigit}${HexDigit}${HexDigit}`
                    ? T  // six-digit hex color
                    : never
                )
            )
        : never;
