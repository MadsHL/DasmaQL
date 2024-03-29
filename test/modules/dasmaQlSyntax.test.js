import assert from "assert";
import { dasmaQlSyntax } from "../../src/modules/dasmaQlSyntax.mjs";

describe("DasmaQlSyntax", function () {
  it("should parse a valid query string with options", () => {
    const options = {
      fields: ["field1", "field2", "field3"],
      functions: ["validFunction"],
    };
    const qlString =
      'field1 = validFunction() and field2 not like "text" and field3 not between (1,22.2) order by field1, field2';
    const { model, validation } = dasmaQlSyntax(options).parse(qlString);

    // Validate the result
    assert.ok(model, "Model should not be null");
    assert.strictEqual(validation.valid, true, "Validation should be valid");
    assert.strictEqual(
      validation.invalidFields.length,
      0,
      "There should be no invalid fields",
    );
  });

  it("should parse a valid query string without options", () => {
    const qlString =
      'field1 not in (1,2) and field2 not like "text" and field3 not between (1,22.2) order by field1, field2';
    const { model, validation } = dasmaQlSyntax().parse(qlString);

    // Validate the result
    assert.ok(model, "Model should not be null");
    assert.strictEqual(validation.valid, true, "Validation should be valid");
    assert.strictEqual(
      validation.invalidFields.length,
      0,
      "There should be no invalid fields",
    );
  });

  it("should handle parsing errors", () => {
    const qlString = "invalid query string"; // This will cause a parsing error
    const { model, validation } = dasmaQlSyntax().parse(qlString);

    // Validate the result
    assert.strictEqual(
      model,
      null,
      "Model should be null due to parsing error",
    );
    assert.strictEqual(
      validation.valid,
      false,
      "Validation should be invalid due to parsing error",
    );
    assert.strictEqual(
      validation.error instanceof Error,
      true,
      "There should be a parsing error",
    );
  });

  it("should handle invalid fields in the query string", () => {
    const options = {
      fields: ["field1", "field2", "field3"],
      functions: ["validFunction"],
    };
    const qlString =
      'invalidField = validFunction() and field2 not like "text" and field3 not between (1,22.2) order by field1, field2';
    const { model, validation } = dasmaQlSyntax(options).parse(qlString);

    // Validate the result
    assert.ok(model, "Model should not be null");
    assert.strictEqual(validation.valid, false, "Validation should be invalid");
    assert.strictEqual(
      validation.invalidFields.length,
      1,
      "There should be one invalid field",
    );
    assert.strictEqual(
      validation.invalidFields[0],
      "invalidField",
      "The invalid field name should be in the list",
    );
  });
});
