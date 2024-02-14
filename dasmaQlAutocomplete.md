# DasmaQlAutocomplete

This module provides autocomplete functionality for the DasmaQL query language.

## Usage

To use the DasmaQlAutocomplete module, first import the module and create an instance by passing in configuration options:

```javascript
import { dasmaQlAutocomplete } from 'dasmaQl';

const options = {
  fields: ['field1', 'field2', 'field3'],
  callbackSearchParameter: () => {
    // return search parameters
  },
  maxSuggestionsFields: 5,
  qlString: '[Your Initial DasmaQL Query String]'
};

const autocomplete = dasmaQlAutocomplete(options);
```

### Get Suggestions

To get autocomplete suggestions based on a position in the query string, use the `getSuggestions` method:

```javascript
const position = 10;

const suggestions = autocomplete.getSuggestions(position);
```

The `qlString` parameter is optional and defaults to the initial qlString passed during initialization.

### Insert Suggestion

To insert a suggestion into the query string at a specific position, use the `insertSuggestion` method:

```javascript
const position = 10;
const suggested = 'field1';

const modifiedQlString = autocomplete.insertSuggestion(position, suggested);
```

The `qlString` parameter is optional and defaults to the initial qlString passed during initialization.

### Refresh Autocomplete

To refresh the autocomplete with a new query string, use the `refresh` method:

```javascript
const newQlString = '[Your New DasmaQL Query String]';

autocomplete.refresh(newQlString);
```

## API
### `DasmaQlAutocompleteOptions`

Options for configuring DasmaQlAutocomplete.

- `fields?: string[]`: An array of valid fields for autocomplete suggestions.
- `callbackSearchParameter?: () => any[]`: A callback function to search for parameters.
- `maxSuggestionsFields?: number`: The maximum number of suggestion fields to return.
- `qlString?: string`: The initial DasmaQL query string.

### `DasmaQlAutocomplete`

DasmaQlAutocomplete class for providing autocomplete functionality.

#### `constructor(options: DasmaQlAutocompleteOptions)`

Constructs a new DasmaQlAutocomplete instance.

- `options`: The options to configure DasmaQlAutocomplete.

#### `getSuggestions(position: number, qlString?: string): any[]`

Gets autocomplete suggestions based on position and query string.

- `position`: The cursor position within the query string.
- `qlString`: The DasmaQL query string (optional, defaults to initial qlString).
- Returns: An array of autocomplete suggestions.

#### `insertSuggestion(position: number, suggested: string, qlString?: string): string`

Inserts a suggestion into the query string at a specific position.

- `position`: The cursor position within the query string.
- `suggested`: The suggested string to insert.
- `qlString`: The DasmaQL query string (optional, defaults to initial qlString).
- Returns: The modified query string with the suggestion inserted.

#### `refresh(qlString: string): void`

Refreshes the autocomplete with a new query string.

- `qlString`: The new DasmaQL query string.

### `dasmaQlAutocomplete(options: DasmaQlAutocompleteOptions): DasmaQlAutocomplete`

Factory function for creating DasmaQlAutocomplete instances.

- `options`: The options to configure DasmaQlAutocomplete.
- Returns: A new DasmaQlAutocomplete instance.