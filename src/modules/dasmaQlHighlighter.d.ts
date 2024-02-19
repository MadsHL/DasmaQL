/**
 * Declaration file for the 'dasmaQlHighlighter' module.
 */
declare module "dasmaQlHighlighter" {
  /**
   * Options for configuring DasmaQlHighlighter.
   */
  interface DasmaQlHighlighterOptions {
    /**
     * The HTML element wrapper for highlighted terms.
     */
    htmlWrapper?: string;
    /**
     * The prefix class for CSS styling of highlighted terms.
     */
    prefixClass?: string;
    /**
     * An array of valid fields for the highlighter.
     */
    fields?: string[];
  }

  /**
   * DasmaQlHighlighter class for highlighting DasmaQL queries.
   */
  class DasmaQlHighlighter {
    /**
     * Constructs a new DasmaQlHighlighter instance.
     * @param options The options to configure DasmaQlHighlighter.
     */
    constructor(options: DasmaQlHighlighterOptions);

    /**
     * Highlights a DasmaQL query string.
     * @param qlString The DasmaQL query string to highlight.
     * @returns The highlighted query string.
     */
    highlight(qlString: string): string;
  }

  /**
   * Factory function for creating DasmaQlHighlighter instances.
   * @param options The options to configure DasmaQlHighlighter.
   * @returns A new DasmaQlHighlighter instance.
   */
  function dasmaQlHighlighter(
    options: DasmaQlHighlighterOptions,
  ): DasmaQlHighlighter;
}
export { dasmaQlHighlighter };
