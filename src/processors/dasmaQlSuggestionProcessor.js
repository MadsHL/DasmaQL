function parseLocation(location) {
    return {
        line: location.start.line - 1,
        start: location.start.offset,
        end: location.end.offset,
    }
}

function flattenInput(input) {
    if (!input) {
        return "";
    }
    if (Array.isArray(input)) {
        const flattened = input.reduce((acc, val) => acc.concat(flattenInput(val)), []);
        return flattened.join("");
    } else if (typeof input === 'string') {
        return input.replace(/"/g, "");
    }
    return input;
}

const dasmaQlSuggestionProcessor = {
    suggest: (location, input, suggestions) => {
        const inputStr = flattenInput(input);
        return {
            type: "misc",
            input: inputStr,
            location: parseLocation(location),
            suggestions
        }
    },
    suggestField: (self, location, input) => {
        const inputStr = flattenInput(input);
        const suggestions = self.findFields(inputStr)
        return {
            type: "field",
            input: inputStr,
            location: parseLocation(location),
            suggestions
        }
    },
    suggestParameter: (self, location, field, parameter) => {

        const defaultParameter = parameter ? parameter : {
            input: "",
            location: {
                line: location.start.line - 1,
                start: location.end.offset,
                end: location.end.offset,
            }
        }

        const suggestions = self.findParameters(field.input, defaultParameter.input)
        return {
            type: "parameter",
            field: field.input,
            input: defaultParameter.input,
            location: defaultParameter.location,
            suggestions
        }
    },
    parameter: (location, input) => {
        const parameter = flattenInput(input);
        return {
            input: parameter,
            location: parseLocation(location)
        }
    },
    findFields: (field) => {
        return [];
    },
    findParameters: (field, parameter) => {
        return [];
    },
}

module.exports = dasmaQlSuggestionProcessor;