const {dasmaQlSuggestionParser} = require("../parsers");
const {dasmaQlSuggestionProcessor} = require("../processors");


class DasmaQlHighlighter {

    constructor(options) {
        this.options = this.#prepareOptions(options);
    }
    highlight(qlString) {
        const tokens = dasmaQlSuggestionParser.parse(qlString, dasmaQlSuggestionProcessor)
        let evaluation = {offset: 0, index: 0, result: qlString};
        tokens.forEach(token => {
            evaluation = this.#evaluateToken(token, evaluation);
        });

        return evaluation.result;
    }

    #evaluateToken(token, evaluation) {
        switch (token.type) {
            case "parameter":
                let newEvaluation = this.#parser(token.field, evaluation, "field")
                newEvaluation = this.#parser(token.operator, newEvaluation, "operator")

                return this.#parser(token.input, newEvaluation, token.input.type);
            default:
                return this.#parser(token, evaluation, token.type);
        }
    }

    #prepareOptions(options) {
        const htmlWrapper = options?.htmlWrapper || "span"
        const prefixClass = options?.prefixClass || "dasma"


        return {htmlWrapper, prefixClass};
    }

    #parser(token, evaluation, clazz) {
        if(this.#skip(token, evaluation)) {
            return evaluation;
        }
        const replacement = `<${this.options.htmlWrapper} class="${this.options.prefixClass}-${clazz}">${this.#getValue(token)}</${this.options.htmlWrapper}>`;

        const qlString = evaluation.result;
        const location = token.location;
        const start = location.start + evaluation.offset;
        const end = location.end  + evaluation.offset;

        const newOffset = evaluation.offset + replacement.length - end + start;
        const highlighted = qlString.substring(0, start) + replacement + qlString.substring(end);

        return {
            offset: newOffset,
            index: location.end,
            result: highlighted
        }
    }

    #getValue(token) {
        if(token?.input && typeof token.input === 'string') {
            return this.#escapeHTML(token.input);
        }
        if(token?.value && typeof token.value === 'string') {
            return this.#escapeHTML(token.value);
        }
        return token ? this.#escapeHTML(token) : "";
    }

    #escapeHTML(str) {
        return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

    #skip(token, result) {
        return token.location.start < result.index;
    }


}

function dasmaQlHighlighter(options) {
    return new DasmaQlHighlighter(options);
}


module.exports = dasmaQlHighlighter