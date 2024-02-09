const assert = require("assert");
const {dasmaQlHighlightParser} = require("../../src/parsers");
const {dasmaQlHighlightProcessor} = require("../../src/processors");

describe('Grammar Tests', () => {
    const expression = "(field1 >= \"value 1\" OR field2 != function()) AND (field3 in (\"value3.1\", \"value3.2\") OR field4 = \"value4\" AND field5 between (1,99.9)) ORDER BY field1, field2 asc, field3 desc # This is a comment"
    describe('DasmaQL Parser', function () {
        it(`should highlight \"${expression}\"`, () => {
            const result = dasmaQlHighlightParser.parse(expression, dasmaQlHighlightProcessor);

            assert.deepStrictEqual(result, [
                "<span class=\"dasma-ql-misc\">(</span>",
                "<span class=\"dasma-ql-field\">field1</span>",
                "<span class=\"dasma-ql-misc\"> </span>",
                "<span class=\"dasma-ql-operator\">&gt;=</span>",
                "<span class=\"dasma-ql-misc\"> </span>",
                "<span class=\"dasma-ql-string\">&quot;value 1&quot;</span>",
                "<span class=\"dasma-ql-misc\"> </span>",
                "<span class=\"dasma-ql-clauses\">OR</span>",
                "<span class=\"dasma-ql-misc\"> </span>",
                "<span class=\"dasma-ql-field\">field2</span>",
                "<span class=\"dasma-ql-misc\"> </span>",
                "<span class=\"dasma-ql-operator\">!=</span>",
                "<span class=\"dasma-ql-misc\"> </span>",
                "<span class=\"dasma-ql-function\">function()</span>",
                "<span class=\"dasma-ql-misc\">) </span>",
                "<span class=\"dasma-ql-clauses\">AND</span>",
                "<span class=\"dasma-ql-misc\"> (</span>",
                "<span class=\"dasma-ql-field\">field3</span>",
                "<span class=\"dasma-ql-misc\"> </span>",
                "<span class=\"dasma-ql-clauses\">in</span>",
                "<span class=\"dasma-ql-misc\"> (</span>",
                "<span class=\"dasma-ql-string\">&quot;value3.1&quot;</span>",
                "<span class=\"dasma-ql-misc\">, </span>",
                "<span class=\"dasma-ql-string\">&quot;value3.2&quot;</span>",
                "<span class=\"dasma-ql-misc\">) </span>",
                "<span class=\"dasma-ql-clauses\">OR</span>",
                "<span class=\"dasma-ql-misc\"> </span>",
                "<span class=\"dasma-ql-field\">field4</span>",
                "<span class=\"dasma-ql-misc\"> </span>",
                "<span class=\"dasma-ql-operator\">=</span>",
                "<span class=\"dasma-ql-misc\"> </span>",
                "<span class=\"dasma-ql-string\">&quot;value4&quot;</span>",
                "<span class=\"dasma-ql-misc\"> </span>",
                "<span class=\"dasma-ql-clauses\">AND</span>",
                "<span class=\"dasma-ql-misc\"> </span>",
                "<span class=\"dasma-ql-field\">field5</span>",
                "<span class=\"dasma-ql-misc\"> </span>",
                "<span class=\"dasma-ql-clauses\">between</span>",
                "<span class=\"dasma-ql-misc\"> (</span>",
                "<span class=\"dasma-ql-number\">1</span>",
                "<span class=\"dasma-ql-misc\">,</span>",
                "<span class=\"dasma-ql-number\">99.9</span>",
                "<span class=\"dasma-ql-misc\">)) </span>",
                "<span class=\"dasma-ql-clauses\">ORDER</span>",
                "<span class=\"dasma-ql-misc\"> </span>",
                "<span class=\"dasma-ql-clauses\">BY</span>",
                "<span class=\"dasma-ql-misc\"> </span>",
                "<span class=\"dasma-ql-field\">field1</span>",
                "<span class=\"dasma-ql-misc\">, </span>",
                "<span class=\"dasma-ql-field\">field2</span>",
                "<span class=\"dasma-ql-misc\"> </span>",
                "<span class=\"dasma-ql-order\">asc</span>",
                "<span class=\"dasma-ql-misc\">, </span>",
                "<span class=\"dasma-ql-field\">field3</span>",
                "<span class=\"dasma-ql-misc\"> </span>",
                "<span class=\"dasma-ql-order\">desc</span>",
                "<span class=\"dasma-ql-misc\"> </span>",
                "<span class=\"dasma-ql-comment\"># This is a comment</span>"
            ]);
        });
    });
});
