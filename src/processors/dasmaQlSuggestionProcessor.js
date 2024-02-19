function parseLocation(location) {
  return {
    line: location.start.line - 1,
    start: location.start.offset,
    end: location.end.offset,
  };
}

function flattenInput(input) {
  if (!input) {
    return "";
  }
  let result = input;
  if (Array.isArray(input)) {
    const flattened = input.reduce(
      (acc, val) => acc.concat(flattenInput(val)),
      [],
    );
    result = flattened.join("");
  }
  return result;
}

export const dasmaQlSuggestionProcessor = {
  suggest: (location, input, suggestions, type) => {
    const inputStr = flattenInput(input);
    return {
      type: type || "misc",
      input: inputStr,
      location: parseLocation(location),
      suggestions,
    };
  },
  suggestField: (self, location, input) => {
    const inputStr = flattenInput(input);
    return {
      type: "field",
      input: inputStr,
      location: parseLocation(location),
      suggestions: () => self.findFields(inputStr),
    };
  },
  suggestParameter: (self, location, field, operator, parameter) => {
    const defaultParameter = parameter
      ? parameter
      : {
          value: "",
          type: "unknown",
          location: {
            line: location.start.line - 1,
            start: location.end.offset,
            end: location.end.offset,
          },
        };

    return {
      type: "parameter",
      field,
      operator,
      input: defaultParameter,
      suggestions: () =>
        self.findParameters(field.input, defaultParameter.value),
    };
  },
  parameter: (self, location, type, input) => {
    const parameter = flattenInput(input);
    return {
      value: parameter,
      type: type,
      location: parseLocation(location),
    };
  },
  findFields: () => {
    return [];
  },
  findParameters: () => {
    return [];
  },
};
