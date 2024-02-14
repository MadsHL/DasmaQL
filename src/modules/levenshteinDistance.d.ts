declare module 'levenshteinDistance' {
    /**
     * Calculates the Levenshtein distance between two strings.
     * @param a The first string.
     * @param b The second string.
     * @returns The Levenshtein distance between the two strings.
     */
    function levenshteinDistance(a: string, b: string): number;

    export = levenshteinDistance;
}
