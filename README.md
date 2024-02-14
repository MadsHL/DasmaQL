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

## Usage and API
DasmaQL provides a suite of tools to support developers in effectively utilizing the query language. Below are detailed guides and API descriptions for our key modules, designed to assist in implementing autocomplete features, syntax highlighting, and understanding the syntax rules of DasmaQL. Additionally, developers can delve into the technical specifications within our TypeScript declaration files, which are richly commented for deeper insights.

Module Documentation
* **Autocomplete Module**: The `dasmaQlAutocomplete` module offers suggestions for completing queries based on the current context, significantly speeding up the coding process. [Read the dasmaQlAutocomplete guide](./dasmaQlAutocomplete.md).
* **Highlighter Module**: With `dasmaQlHighlighter`, developers can implement syntax highlighting to improve code readability and facilitate debugging. [Explore the dasmaQlHighlighter documentation](./dasmaQlHighlighter.md).
* **Syntax Module**: The `dasmaQlSyntax` module provides a comprehensive overview of DasmaQL's syntax rules, ensuring the creation of valid and efficient queries. [Dive into the dasmaQlSyntax details](./dasmaQlSyntax.md).

### TypeScript Declaration Files
For an in-depth look at the DasmaQL API, the TypeScript declaration files (*.d.ts) located in the src/modules directory contain extensive JSDoc comments detailing functions, parameters, return types, and more. These files are invaluable for developers seeking to understand the intricacies of the DasmaQL modules.

Navigate to TypeScript Declaration Files: [View TypeScript Declaration Files](./src/modules)


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
- **Version:** 0.1.4
- **Description:** Self-contained query tool for data selection with a simple and intuitive language.
- **Author:** Mads Hansen Lund
- **License:** GPL-3.0-or-later