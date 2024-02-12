const {dasmaQlSuggestionParser} = require("../parsers");
const {dasmaQlSuggestionProcessor, dasmaQlProcessor} = require("../processors");

class DasmaQlAutocomplete {
    #tokens;
    #qlString;
    #autocompleteProcessor;

    constructor(qlString, options) {
      //  this.options = this.#prepareOptions(options);
        this.#autocompleteProcessor = this.#configureAutocompleteProcessor(options);
        this.#init(qlString);
    }

    getSuggestions(position) {
        const token = this.#findTokenAtPosition(position);
        if(!token?.suggestions) {
            return [];
        }

        return typeof token.suggestions === 'function' ? token.suggestions() : token.suggestions;
    }

    insertSuggestion(position, suggested) {
        const token = this.#findTokenAtPosition(position);
        if(!token) {
            return this.#qlString;
        }

        const qlString = this.#replaceToken(this.#qlString, token, suggested)
        this.#init(qlString);
        return qlString;
    }

    #findTokenAtPosition(position) {
        for (const token of this.#tokens) {
            const foundToken = this.#findFirstToken(position, token);
            if (foundToken !== null) {
                return foundToken;
            }
        }
        return null;
    }

    #findFirstToken(position, token) {
        let foundToken = null;
        switch (token.type) {
            case "parameter":
                if (this.#hasPosition(position, token.field)) {
                    foundToken = token.field;
                }
                if (this.#hasPosition(position, token.operator)) {
                    foundToken = token.operator;
                }
                if (this.#hasPosition(position, token.input)) {
                    foundToken = token.input;
                    foundToken = {
                        ...token.input,
                        suggestions: token.suggestions
                    }
                }
                break;
            default:
                if (this.#hasPosition(position, token)) {
                    foundToken = token;
                }
        }
        return foundToken;
    }

    #hasPosition(position, token) {
        return token && token.location.start <= position && position <= token.location.end;
    }

    #replaceToken(qlString, token, replacement) {
        return qlString.substring(0, token.location.start) + replacement + qlString.substring(token.location.end);
    }

    #init(qlString) {
        this.#qlString = qlString;
        this.#tokens = dasmaQlSuggestionParser.parse(qlString, this.#autocompleteProcessor);
    }

    #configureAutocompleteProcessor(options) {
        const autocompleteProcessor = Object.assign({}, dasmaQlSuggestionProcessor);

        autocompleteProcessor.withQoutes = false;
        autocompleteProcessor.findFields = options?.callbackSearchField || (() => []);
        autocompleteProcessor.findParameters = options?.callbackSearchParameter || (() => []);

        return autocompleteProcessor;
    }
}


function dasmaQlAutocomplete(qlString, options) {
    return new DasmaQlAutocomplete(qlString, options);
}


module.exports = dasmaQlAutocomplete;