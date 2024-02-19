import assert from "assert";
import { dasmaQlHighlighter } from "../../src/modules/dasmaQlHighlighter.mjs";

describe("DasmaQlHighlighter", function () {
  it("should highlight a query string correctly using default options", () => {
    const highlighter = dasmaQlHighlighter();
    const qlString = "field1 = 'value' and field2 > 10";
    const highlighted = highlighter.highlight(qlString);

    assert.strictEqual(
      highlighted,
      '<span class="dasma-field ">field1</span> <span class="dasma-operator ">=</span> <span class="dasma-string ">&apos;value&apos;</span> <span class="dasma-misc ">and</span> <span class="dasma-field ">field2</span> <span class="dasma-operator ">&gt;</span> <span class="dasma-number ">10</span>',
    );
  });

  it("should apply custom HTML wrapper and prefix class correctly", () => {
    const options = {
      htmlWrapper: "div",
      prefixClass: "custom",
    };
    const highlighter = dasmaQlHighlighter(options);
    const qlString = "field1 = 'value'";
    const highlighted = highlighter.highlight(qlString);

    assert.strictEqual(
      highlighted,
      '<div class="custom-field ">field1</div> <div class="custom-operator ">=</div> <div class="custom-string ">&apos;value&apos;</div>',
    );
  });

  it("should not highlight invalid fields when valid fields are specified", () => {
    const options = {
      fields: ["field1", "field3"], // field2 is not valid
    };
    const highlighter = dasmaQlHighlighter(options);
    const qlString = "field1 = 'value' and field2 > 10";
    const highlighted = highlighter.highlight(qlString);

    assert.strictEqual(
      highlighted,
      '<span class="dasma-field ">field1</span> <span class="dasma-operator ">=</span> <span class="dasma-string ">&apos;value&apos;</span> <span class="dasma-misc ">and</span> <span class="dasma-field dasma-error">field2</span> <span class="dasma-operator ">&gt;</span> <span class="dasma-number ">10</span>',
    );
  });

  it("should escape HTML in input correctly", () => {
    const highlighter = dasmaQlHighlighter();
    const qlString = "field1 = '<script>alert(\"xss\")</script>'";
    const highlighted = highlighter.highlight(qlString);

    assert.strictEqual(
      highlighted,
      '<span class="dasma-field ">field1</span> <span class="dasma-operator ">=</span> <span class="dasma-string ">&apos;&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;&apos;</span>',
    );
  });

  it("should handle complex queries with multiple operators and functions", () => {
    const options = {
      fields: ["field1", "field2", "field3"],
      functions: ["validFunction"],
    };
    const highlighter = dasmaQlHighlighter(options);
    const qlString =
      "field1 = validFunction() and field2 not like 'text' and field3 not between (1, 22.2) order by field1, field2";
    const highlighted = highlighter.highlight(qlString);

    // Check for highlighting of fields, functions, and operators
    assert.strictEqual(
      highlighted,
      '<span class="dasma-field ">field1</span> <span class="dasma-operator ">=</span> <span class="dasma-function ">validFunction()</span> <span class="dasma-misc ">and</span> <span class="dasma-field ">field2</span> <span class="dasma-operator ">not like</span> <span class="dasma-string ">&apos;text&apos;</span> <span class="dasma-misc ">and</span> <span class="dasma-field ">field3</span> <span class="dasma-operator ">not between</span> (<span class="dasma-number ">1</span>, <span class="dasma-number ">22.2</span>) <span class="dasma-misc ">order by</span> <span class="dasma-field ">field1</span>, <span class="dasma-field ">field2</span>',
    );
  });
});
