const {dasmaQlParser, dasmaQlHighlightParser} = require("../parsers");
const {dasmaQlProcessor, dasmaQlHighlightProcessor} = require("../processors");

class DasmaQl {

    #invalidFields = [];
    #invalidFunctions = [];

    constructor(options) {
        this.options = this.#prepareOptions(options);
        this.syntaxProcessor = this.#configureSyntaxProcessor(this.options);
    }

    highlight(qlString) {
        return dasmaQlHighlightParser.parse(qlString, dasmaQlHighlightProcessor).join("");
    }

    parse(qlString) {
        this.#invalidFields = [];
        this.#invalidFunctions = [];

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
                valid: !error && !this.#invalidFields.length && !this.#invalidFunctions.length,
                invalidFields: this.#invalidFields,
                invalidFunctions: this.#invalidFunctions,
            }
        };
    }

    #prepareOptions(options) {
        const validFields = (options?.fields || []).map(field => field.trim());
        const validFunctions = (options?.functions || []).map(functionName => functionName.replace(/\(\s*\)/, "").trim());
        return {validFields, validFunctions};
    }

    #configureSyntaxProcessor(options) {
        if (!options.validFields.length && options.validFunctions.length) {
            return
        }

        const syntaxProcessor = Object.assign({}, dasmaQlProcessor);
        if (options.validFields.length) {
            syntaxProcessor.validateTerm = term => this.#validateTerm(term, options.validFields);
            syntaxProcessor.validateOrder = order => this.#validateOrder(order, options.validFields);
        }
        if (options.validFunctions.length) {
            syntaxProcessor.validateParameter = parameter => this.#validateParameter(parameter, options.validFunctions);
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

    #validateParameter(parameter, validFunctions) {
        if (parameter.type === 'function' && !validFunctions.includes(parameter.value)) {
            this.#pushIfNotExists(this.#invalidFunctions, parameter.value);
        }
    }

    #pushIfNotExists(existingArray, element) {
        if (!existingArray.includes(element)) {
            existingArray.push(element);
        }
    }
}

function dasmaQl(options) {
    return new DasmaQl(options);
}

module.exports = dasmaQl;
