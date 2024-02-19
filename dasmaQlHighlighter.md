# DasmaQlHighlighter

A module for highlighting DasmaQL queries.

## Usage

To use the DasmaQlHighlighter module, first import the module and create an instance by passing in configuration options:

```javascript
import { dasmaQlHighlighter } from "dasmaQl";

const options = {
  htmlWrapper: "span",
  prefixClass: "highlight",
  fields: ["name", "description", "tags"],
};

const highlighter = dasmaQlHighlighter(options);

const query =
  'name = function() and description not like "text" and tags not between (1,22.2) order by name, tags';
const highlightedQuery = highlighter.highlight(query);

console.log(highlightedQuery);
// Output: '<span class="dasma-field">name</span> <span class="dasma-operator">=</span> <span class="dasma-function">function()</span> <span class="dasma-misc">and</span> <span class="dasma-field">description</span> <span class="dasma-operator">not like</span> <span class="dasma-string">text</span> <span class="dasma-field">and</span> <span class="dasma-field">tags</span> <span class="dasma-operator">not between</span> (<span class="dasma-number">1</span>,<span class="dasma-number">22.2</span>) <span class="dasma-misc">order by</span> <span class="dasma-field">name</span>, <span class="dasma-field">description</span>'
```

## API

### `DasmaQlHighlighter`

DasmaQlHighlighter class for providing highlight functionality.

### `DasmaQlHighlighterOptions`

Options for configuring the DasmaQlHighlighter.

- `htmlWrapper`?: <string>: The HTML element wrapper for highlighted terms. Default value: `span`.
- `prefixClass`?: <string>: The prefix class for CSS styling of highlighted terms. Default value: `highlight`.
- `fields`?: <string[]>: An array of valid fields for the highlighter.

### `DasmaQlHighlighter`

DasmaQlHighlighter class for providing autocomplete functionality.

#### `constructor(options: DasmaQlHighlighterOptions)`

Constructs a new DasmaQlHighlighter instance.

### `highlight(qlString)`

Highlights a DasmaQL query string.

- `qlString` <string>: The DasmaQL query string to highlight.

**Returns**: The highlighted query string.

### `dasmaQlHighlighter(options: DasmaQlHighlighterOptions): DasmaQlHighlighter`

Factory function for creating DasmaQlAutocomplete instances.

- `options`: The options to configure DasmaQlHighlighterOptions.
- Returns: A new DasmaQlHighlighter instance.
