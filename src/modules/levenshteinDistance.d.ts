/**
 * Calculates the Levenshtein distance between two strings.
 * @param a The first string.
 * @param b The second string.
 * @returns The Levenshtein distance between the two strings.
 */
export function levenshteinDistance(a: string, b: string): number;

/**
 * Sorts an array of elements based on their Levenshtein distance to a search string.
 * Elements can be either strings or objects with a 'label' property.
 * @param elements The array of elements to sort.
 * @param search The search string to compare elements against.
 * @returns An array of elements sorted by their Levenshtein distance to the search string.
 */
export function levenshteinSearchSort(
  elements: Array<string | { label: string }>,
  search: string,
): Array<string | { label: string }>;
