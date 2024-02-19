import assert from "assert";
import { dasmaQlAutocomplete } from "../../src/index.mjs";

describe("DasmaQlAutocomplete", function () {
  const sampleQlString =
    'field1 = "value1" OR field2 != 2024-12-24 AND (anotherField in ("value3.1", "value3.2") OR field4 = value4() AND field5 between (1,9)) ORDER BY field1, field2 asc, field3 desc -- This is a comment';
  let autocomplete;

  beforeEach(function () {
    autocomplete = dasmaQlAutocomplete({
      fields: ["field1", "field2", "field3"],
      callbackSearchParameter: (field, searchString) => {
        if (field === "field1" && searchString === "value1") {
          return ["field1:value1", "field1:value2", "field1:value3"];
        }

        return ["value"];
      },
      qlString: sampleQlString,
    });
  });

  describe("#getSuggestions()", function () {
    it("should return an array of suggestions for field", function () {
      const position = 26; // Position in the sampleQlString where suggestions can be expected
      const suggestions = autocomplete.getSuggestions(position);
      assert.deepStrictEqual(suggestions, ["field2", "field1", "field3"]);
    });

    it("should return an array of suggestions for parameter", function () {
      const position = 13; // Position in the sampleQlString where no suggestions are available
      const suggestions = autocomplete.getSuggestions(position);
      assert(Array.isArray(suggestions));
      assert.deepStrictEqual(suggestions, [
        "field1:value1",
        "field1:value2",
        "field1:value3",
      ]);
    });
  });

  describe("#insertSuggestion()", function () {
    it("should return a modified QL string with the suggested token inserted at the given position", function () {
      const position = 17; // Position in the sampleQlString where a suggestion can be inserted
      const suggested = "newValue";
      const modifiedQlString = autocomplete.insertSuggestion(
        position,
        suggested,
      );
      assert.equal(modifiedQlString.includes(suggested), true);
    });

    it("should return the original QL string if no token is suggested", function () {
      const position = 46; // Position in the sampleQlString where no suggestion is made
      const suggested = "newValue";
      const modifiedQlString = autocomplete.insertSuggestion(
        position,
        suggested,
      );
      assert.equal(modifiedQlString.includes(suggested), false);
    });
  });
});
