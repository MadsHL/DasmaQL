/**
 * Declaration file for the 'dasmaQlAutocomplete' module.
 */
declare module 'dasmaQlAutocomplete' {
    /**
     * Options for configuring DasmaQlAutocomplete.
     */
    interface DasmaQlAutocompleteOptions {
        /**
         * An array of valid fields for autocomplete suggestions.
         */
        fields?: string[];
        /**
         * A callback function to search for parameters.
         */
        callbackSearchParameter?: () => any[];
        /**
         * The maximum number of suggestion fields to return.
         */
        maxSuggestionsFields?: number;
        /**
         * The initial DasmaQL query string.
         */
        qlString?: string;
    }

    /**
     * DasmaQlAutocomplete class for providing autocomplete functionality.
     */
    class DasmaQlAutocomplete {
        /**
         * Constructs a new DasmaQlAutocomplete instance.
         * @param options The options to configure DasmaQlAutocomplete.
         */
        constructor(options: DasmaQlAutocompleteOptions);

        /**
         * Gets the input string at the specified position in the DasmaQL query string.
         * @param position The cursor position within the query string.
         * @param qlString The DasmaQL query string (optional, defaults to initial qlString).
         * @returns The string at the specified position.
         */
        getInput(position: number, qlString?: string): string;

        /**
         * Gets autocomplete suggestions based on position and query string.
         * @param position The cursor position within the query string.
         * @param qlString The DasmaQL query string (optional, defaults to initial qlString).
         * @returns An array of autocomplete suggestions.
         */
        getSuggestions(position: number, qlString?: string): any[];

        /**
         * Inserts a suggestion into the query string at a specific position.
         * @param position The cursor position within the query string.
         * @param suggested The suggested string to insert.
         * @param qlString The DasmaQL query string (optional, defaults to initial qlString).
         * @returns The modified query string with the suggestion inserted.
         */
        insertSuggestion(position: number, suggested: string, qlString?: string): string;

        /**
         * Refreshes the autocomplete with a new query string.
         * @param qlString The new DasmaQL query string.
         */
        refresh(qlString: string): void;
    }

    /**
     * Factory function for creating DasmaQlAutocomplete instances.
     * @param options The options to configure DasmaQlAutocomplete.
     * @returns A new DasmaQlAutocomplete instance.
     */
    function dasmaQlAutocomplete(options: DasmaQlAutocompleteOptions): DasmaQlAutocomplete;

    export {dasmaQlAutocomplete};
}
