/**
 * Options for configuring DasmaQlSyntax.
 */
export interface QlSyntaxOptions {
  /**
   * An array of valid fields for the DasmaQL syntax.
   */
  fields?: string[];
}

/**
 * Represents the expected structure of an error object.
 */
interface ErrorExpected {
  type: string;
  description: string;
}

/**
 * Represents the location of an error.
 */
interface Location {
  offset: number;
  line: number;
  column: number;
}

/**
 * Represents the location range of an error.
 */
interface ErrorLocation {
  start: Location;
  end: Location;
}

/**
 * Represents an error object with expected, found, and location properties.
 */
interface SyntaxError {
  expected: (
    | ErrorExpected
    | { type: string; text: string; ignoreCase: boolean }
  )[];
  found: string;
  location: ErrorLocation;
  name: string;
}

/**
 * Result of the validation process.
 */
export interface ValidationResult {
  /**
   * Error object if validation failed, otherwise null.
   */
  error: SyntaxError | null;
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
 * Represents a value in the query expression.
 */
export interface QlValue {
  /**
   * The type of the value (e.g., "string", "number", "boolean", "string[]").
   */
  type: string;
  /**
   * The actual value.
   */
  value: string | number | boolean | string[];
}

/**
 * Represents a term in the query expression.
 */
export interface QlTerm {
  /**
   * The type of the term.
   */
  type: string;
  /**
   * The field associated with the term.
   */
  field: string;
  /**
   * The value of the term.
   */
  value: QlValue;
}

/**
 * Represents an operator in the query expression.
 */
export interface QlOperator {
  /**
   * The type of the operator.
   */
  type: string;
  /**
   * The left side of the operator, which can be another group or a term.
   */
  left: QlGroup | QlTerm;
  /**
   * The right side of the operator, which can be another group or a term.
   */
  right: QlGroup | QlTerm;
}

/**
 * Represents a group in the query expression.
 */
export interface QlGroup {
  /**
   * The group, which can be an operator or a term.
   */
  group: QlOperator | QlTerm;
}

/**
 * Represents the overall expression in the query.
 */
export interface QlExpression {
  /**
   * The expression containing an operator.
   */
  expression: {
    /**
     * The operator of the expression.
     */
    operator: QlOperator;
  };
  /**
   * Optional order of fields.
   */
  order?: QlOrder[];
}

/**
 * Represents the order of fields in the query.
 */
export interface QlOrder {
  /**
   * The field to order by.
   */
  field: string;
  /**
   * The base order of the field (e.g., "asc", "desc").
   */
  baseOrder: string;
}

/**
 * Represents the parsed model with validation results.
 */
export interface QlModel {
  /**
   * The parsed model.
   */
  model: QlExpression;
  /**
   * Validation results of the parsed model.
   */
  validation: ValidationResult;
}

/**
 * DasmaQlSyntax class for parsing DasmaQL queries.
 */
export declare class QlSyntax {
  /**
   * Constructs a new DasmaQlSyntax instance.
   * @param options The options to configure DasmaQlSyntax.
   */
  constructor(options: QlSyntaxOptions);

  /**
   * Parses a DasmaQL query string.
   * @param qlString The DasmaQL query string to parse.
   * @returns The parsed model with validation results.
   */
  parse(qlString: string): QlModel;
}

export function dasmaQlSyntax(options: QlSyntaxOptions): QlSyntax;
