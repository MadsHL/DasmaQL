/**
 * Declaration file for the 'dasmaQlSyntax' module.
 */
declare module "dasmaQlSyntax" {
  /**
   * Options for configuring DasmaQlSyntax.
   */
  interface DasmaQlSyntaxOptions {
    /**
     * An array of valid fields for the DasmaQL syntax.
     */
    fields?: string[];
  }

  /**
   * Result of the validation process.
   */
  interface ValidationResult {
    /**
     * Error object if validation failed, otherwise null.
     */
    error: Error | null;
    /**
     * Indicates whether the validation succeeded.
     */
    valid: boolean;
    /**
     * Array of invalid fields found during validation.
     */
    invalidFields: string[];
  }

  /**
   * Represents the parsed model with validation results.
   */
  interface QlModel {
    /**
     * The parsed model.
     */
    model: any;
    /**
     * Validation results of the parsed model.
     */
    validation: ValidationResult;
  }

  /**
   * DasmaQlSyntax class for parsing DasmaQL queries.
   */
  class DasmaQlSyntax {
    /**
     * Constructs a new DasmaQlSyntax instance.
     * @param options The options to configure DasmaQlSyntax.
     */
    constructor(options: DasmaQlSyntaxOptions);

    /**
     * Parses a DasmaQL query string.
     * @param qlString The DasmaQL query string to parse.
     * @returns The parsed model with validation results.
     */
    parse(qlString: string): QlModel;
  }

  /**
   * Factory function for creating DasmaQlSyntax instances.
   * @param options The options to configure DasmaQlSyntax.
   * @returns A new DasmaQlSyntax instance.
   */
  function dasmaQlSyntax(options: DasmaQlSyntaxOptions): DasmaQlSyntax;
}
export = { dasmaQlSyntax };
