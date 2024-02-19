# DasmaQlSyntax

A module for parsing and validating DasmaQL queries.

## Usage

```typescript
import { dasmaQlSyntax } from "dasmaQl";

// Configure DasmaQlSyntax
const options: DasmaQlSyntaxOptions = {
  fields: ["field1", "field2", "field3"],
};

// Create a new instance of DasmaQlSyntax
const parser = dasmaQlSyntax(options);

// Parse a DasmaQL query string
const qlString = "...";
const result: ParsedModel = parser.parse(qlString);

console.log(result.model);
console.log(result.validation.error);
console.log(result.validation.valid);
console.log(result.validation.invalidFields);
```

## API

### `DasmaQlSyntax`

Represents the class for parsing DasmaQL queries.

#### Constructor

```typescript
constructor(options: DasmaQlSyntaxOptions)
```

Creates a new instance of DasmaQlSyntax with the specified options.

#### Methods

##### `parse`

```typescript
parse(qlString: string): ParsedModel
```

Parses a DasmaQL query string and returns the parsed model with validation results.

#### Interfaces

##### `DasmaQlSyntaxOptions`

Options for configuring DasmaQlSyntax.

###### Properties

- `fields?: string[]` - An array of valid fields for the DasmaQL syntax.

##### `ParsedModel`

Represents the parsed model with validation results.

###### Properties

- `model: any` - The parsed model.
- `validation: ValidationResult` - Validation results of the parsed model.

##### `ValidationResult`

Result of the validation process.

###### Properties

- `error: Error | null` - Error object if validation failed, otherwise null.
- `valid: boolean` - Indicates whether the validation succeeded.
- `invalidFields: string[]` - Array of invalid fields found during validation.

### `function dasmaQlSyntax`

Factory function for creating DasmaQlSyntax instances.

#### Parameters

- `options: DasmaQlSyntaxOptions` - The options to configure DasmaQlSyntax.

#### Returns

- `DasmaQlSyntax` - A new DasmaQlSyntax instance.
