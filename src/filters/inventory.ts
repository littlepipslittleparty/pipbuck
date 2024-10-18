/**
 * Converts `0` to `'--'`.
 *
 * Also does that with any falsy values.
 */
export function dashedZero(value: number): string {
    if (!value || value === 0) {
        return '--';
    }
    return value.toString();
}

export default {
    dashedZero,
};
