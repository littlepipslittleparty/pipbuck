let isFiniteFn;
if (typeof Number.isFinite === 'function') {
    isFiniteFn = Number.isFinite;
} else {
    isFiniteFn = function (n: number): boolean {
        return Number.isFinite(n);
    };
}

export const isisFinite = isFiniteFn;
