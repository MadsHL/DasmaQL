# DasmaQL - Work in Progress
DasmaQL is a self-contained query tool designed for data selection with a simple and intuitive language. This project is currently a work in progress, aiming to develop a query language parser that can be utilized for structuring a backend application.

## DasmaQL Language Description
DasmaQL is a flexible query language designed to express and manipulate data queries in a structured format. It supports a variety of operations, including conditionals, ordering, and functions, making it suitable for a wide range of data analysis and manipulation tasks.

### Syntax Overview
#### Expressions
Expressions are the core of DasmaQL queries, allowing for complex data manipulation through logical operations such as `AND` and `OR`, as well as grouping with parentheses `()`.

#### Ordering
DasmaQL supports ordering results using `ORDER BY` followed by one or more field names, optionally specifying `ASC` (ascending) or `DESC` (descending) order.

##### Conditions
Conditions in DasmaQL are built using terms that compare fields against values or other fields. Supported operators include:

* `=`: Equal to
* `!=` / <>: Not equal to
* `>=`: Greater than or equal to
* `<=`: Less than or equal to
* `>`: Greater than
* `<`: Less than
* `~=` / `~`: Like (for pattern matching)

#### Functions
DasmaQL allows for calling functions as part of expressions, providing extensibility for custom data processing and analysis.

##### Special Constructs
* `IN`: Checks if a field's value is within a specified list of values.
* `NOT IN`: The inverse of `IN`.
* `BETWEEN`: Checks if a field's value falls within a specified range.
* `NOT BETWEEN`: The inverse of `BETWEEN`.
* `LIKE`: Performs pattern matching against a field's value.
* `NOT LIKE`: The inverse of `LIKE`.

##### Comments
DasmaQL supports comments using the `#` / `--` symbol. Comments are ignored by the parser and can be placed anywhere whitespace is allowed.

### Example Query

```sql
field1 = "value1" AND field2 >= 100 ORDER BY field3 DESC, field4 ASC -- This is a comment
```

This query checks for records where `field1` is equal to `"value1"` and `field2` is greater than or equal to `100`, orders the results by `field3` in descending order and then by `field4` in ascending order, ignoring the comment.

## Installation

You can install DasmaQL via npm:

```bash
npm install dasmaql
```

## Usage
Once completed, a backend application will demonstrate how to effectively use the result of the DasmaQL parser.

### Parsing a Query
You can use DasmaQL to parse a DasmaQL query string and obtain a structured model:
```javascript
const dasmaQl = require('dasmaql');

const qlString = 'field1 = value1 and field2 > value2';
const { model, validation } = dasmaQl().parse(qlString);

console.log('Parsed Model:', model);
console.log('Validation:', validation);
```

### Highlighting a Query
DasmaQL also provides a method to highlight a DasmaQL query string:
```javascript
const dasmaQl = require('dasmaql');

const qlString = 'field1 = value1 and field2 > value2';
const highlightedQuery = dasmaQl().highlight(qlString);

console.log('Highlighted Query:', highlightedQuery);
```

### Parsing a Query with Options
You can parse a query with custom options to validate against specific fields and functions:
```javascript
const dasmaQl = require('dasmaql');

const options = {
    fields: ['field1', 'field2'],
    functions: ['function1', 'function2']
};
const qlString = 'field1 = function1() and field2 > value';
const { model, validation } = dasmaQl().parse(qlString, options);

console.log('Parsed Model:', model);
console.log('Validation:', validation);
```

## API Reference
`dasmaQl(options?: object)`
Initializes `DasmaQl` with the specified options, if any. This function returns an object that provides access to the `parse` and `highlight` methods.

* `options`: An optional object that may contain configuration settings for parsing and highlighting. The structure and specific options for this object will depend on the implementation details of DasmaQl.


`parse(qlString: string): { model: object, validation: object }`

Parses the given DasmaQL query string and returns a structured model along with validation details.

* `qlString`: The DasmaQL query string to parse.

`highlight(qlString: string): string`

Highlights the given DasmaQL query string for better readability.

* `qlString`: The DasmaQL query string to highlight.

## Data Structures
`model`

A structured representation of the parsed DasmaQL query.

`validation`

Validation details including whether the query is valid or not, and any invalid fields or functions encountered during parsing.

## Contributing to DasmaQL

We're thrilled you're interested in contributing to DasmaQL! Contributions from the community are crucial for the continued improvement and success of this project. There are many ways you can contribute, from writing code and fixing bugs to improving documentation or reporting issues.

### Ways to Contribute

#### Reporting Issues
If you encounter a bug or have a suggestion for enhancing DasmaQL, please first check the [issue tracker](https://github.com/MadsHL/DasmaQL/issues) to see if it has been reported. If not, feel free to open a new issue. When creating an issue, provide as much detail as possible to help us understand the problem or enhancement.

#### Code Contributions
Whether you're fixing a bug or adding a new feature, your code contributions are welcome. Here’s how you can contribute to the codebase:

* **Fork and Clone**: Fork the DasmaQL repository and clone it locally to make your changes.
* **Create a New Branch**: Make your changes in a new git branch.
* **Make Your Changes**: Implement your feature or bug fix.
* **Test Your Changes**: Ensure that your changes do not break any existing functionality.
* **Submit a Pull Request**: Once your changes are ready, submit a pull request to the main repository for review.

#### Improving Documentation
Great documentation is key to helping users and developers understand DasmaQL. If you see areas that need improvement or want to add examples, guides, or tutorials, don't hesitate to contribute.

### Pull Request Guidelines

When submitting a pull request, please keep the following guidelines in mind:

* ***Describe Your Changes***: Provide a detailed description of the changes in your pull request. If it fixes an open issue, include a link to the issue.
* ***Small, Focused Changes***: Keep your pull requests small and focused on a single issue or feature. This makes it easier to review and merge your contributions.
* ***Follow the Code Style***: Ensure your code adheres to the existing style of the project to maintain consistency.

## Project Details
- **Name:** DasmaQL
- **Version:** 0.1.2
- **Description:** Self-contained query tool for data selection with a simple and intuitive language.
- **Author:** Mads Hansen Lund
- **License:** GPL-3.0-or-later