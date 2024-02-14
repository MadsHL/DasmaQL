const {dasmaQlParser, dasmaQlHighlightParser, dasmaQlSuggestionParser} = require("../parsers");
const {dasmaQlProcessor, dasmaQlHighlightProcessor, dasmaQlSuggestionProcessor} = require("../processors");

class DasmaQlSyntax {

    #invalidFields = [];

    constructor(options) {
        this.options = this.#prepareOptions(options);
        this.syntaxProcessor = this.#configureSyntaxProcessor(this.options);
    }

    parse(qlString) {
        this.#invalidFields = [];

        let model = null;
        let error = null;
        try {
            model = dasmaQlParser.parse(qlString, this.syntaxProcessor);
        } catch (e) {
            error = e;
        }

        return {
            model,
            validation: {
                error,
                valid: !error && !this.#invalidFields.length,
                invalidFields: this.#invalidFields
            }
        };
    }

    #prepareOptions(options) {
        const validFields = (options?.fields || []).map(field => field.trim());
        return {validFields};
    }

    #configureSyntaxProcessor(options) {
        if (!options.validFields.length) {
            return dasmaQlProcessor;
        }

        const syntaxProcessor = Object.assign({}, dasmaQlProcessor);
        if (options.validFields.length) {
            syntaxProcessor.validateTerm = term => this.#validateTerm(term, options.validFields);
            syntaxProcessor.validateOrder = order => this.#validateOrder(order, options.validFields);
        }
        return syntaxProcessor;
    }

    #validateTerm(term, validFields) {
        if (!validFields.includes(term.field)) {
            this.#pushIfNotExists(this.#invalidFields, term.field);
        }
    }

    #validateOrder(order, validFields) {
        for (const o of order) {
            if (!validFields.includes(o.field)) {
                this.#pushIfNotExists(this.#invalidFields, o.field);
            }
        }
    }

    #pushIfNotExists(existingArray, element) {
        if (!existingArray.includes(element)) {
            existingArray.push(element);
        }
    }
}

function dasmaQlSyntax(options) {
    return new DasmaQlSyntax(options);
}

module.exports = dasmaQlSyntax;
