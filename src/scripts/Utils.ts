/**
 * Returns a unique number. Will not repeat numbers.
 * Useful for #key s in svelte.
 */
export function uniqID() {
    uniqID['nextId'] ??= 0;

    return uniqID['nextId']++;
}

// why is this not built in...
export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);