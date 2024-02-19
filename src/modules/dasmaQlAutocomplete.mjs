import { levenshteinSearchSort } from "./levenshteinDistance.mjs";
import { dasmaQlSuggestionProcessor } from "../processors/dasmaQlSuggestionProcessor.js";
import * as dasmaQlSuggestionParser from "../parsers/dasmaQlSuggestionParser.cjs";

class DasmaQlAutocomplete {
  #tokens;
  #qlString;
  #autocompleteProcessor;

  constructor(options) {
    this.options = this.#prepareOptions(options);
    this.#autocompleteProcessor = this.#configureAutocompleteProcessor(
      this.options,
    );
    this.refresh(options?.qlString);
  }

  getInput(position, qlString) {
    this.refresh(qlString);
    const token = this.#findTokenAtPosition(position);
    return token?.input || token?.value;
  }
  getSuggestions(position, qlString) {
    this.refresh(qlString);
    const token = this.#findTokenAtPosition(position);
    if (!token?.suggestions) {
      return [];
    }

    return typeof token.suggestions === "function"
      ? token.suggestions()
      : token.suggestions;
  }

  insertSuggestion(position, suggested, qlString) {
    this.refresh(qlString);
    const token = this.#findTokenAtPosition(position);
    if (!token) {
      return this.#qlString;
    }

    const qlStringWithReplaced = this.#replaceToken(
      this.#qlString,
      token,
      suggested,
    );
    this.refresh(qlStringWithReplaced);
    return qlStringWithReplaced;
  }

  refresh(qlString) {
    if (qlString?.length > 0 && this.#qlString !== qlString) {
      this.#qlString = qlString;
      this.#tokens = dasmaQlSuggestionParser.parse(
        qlString,
        this.#autocompleteProcessor,
      );
    }
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
            suggestions: token.suggestions,
          };
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
    return (
      token &&
      token.location.start <= position &&
      position <= token.location.end
    );
  }

  #replaceToken(qlString, token, replacement) {
    return (
      qlString.substring(0, token.location.start) +
      replacement +
      qlString.substring(token.location.end)
    );
  }

  #configureAutocompleteProcessor(options) {
    const autocompleteProcessor = Object.assign({}, dasmaQlSuggestionProcessor);

    autocompleteProcessor.withQoutes = false;
    autocompleteProcessor.findFields = (search) => {
      return this.#searchField(this.#cleanString(search));
    };
    autocompleteProcessor.findParameters = (field, search) =>
      options.callbackSearchParameter(
        this.#cleanString(field),
        this.#cleanString(search),
      );

    return autocompleteProcessor;
  }

  #searchField(search) {
    if (!search) {
      return this.options.fields.slice(0, this.options.maxSuggestionsFields);
    }

    return levenshteinSearchSort(this.options.fields, search).slice(
      0,
      this.options.maxSuggestionsFields,
    );
  }

  #cleanString(str) {
    return str?.replace(/^['"]|['"]$/g, "");
  }
  #prepareOptions(options) {
    const fields = (options?.fields || []).map((field) => field.trim()).sort();
    const callbackSearchParameter =
      options?.callbackSearchParameter || (() => []);
    const maxSuggestionsFields = options?.maxSuggestionsFields || 10;

    return { fields, callbackSearchParameter, maxSuggestionsFields };
  }
}

export function dasmaQlAutocomplete(options) {
  return new DasmaQlAutocomplete(options);
}
