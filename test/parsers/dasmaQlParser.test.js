const assert = require("assert");
const {dasmaQlParserTestCases} = require("./dasmaQlParser.testdata");
const {dasmaQlParser} = require("../../src/parsers");
const {dasmaQlProcessor} = require("../../src/processors");

describe('Grammar Tests', () => {
    describe('DasmaQL Parser', function () {
        dasmaQlParserTestCases.forEach(testCase => {
            it(`should parse \"${testCase.expression}\"`, () => {
                const result = dasmaQlParser.parse(testCase.expression, dasmaQlProcessor);

                assert.deepStrictEqual(result, testCase.expected);
            });
        });

        it(`should detect invalid ql code`, () => {
            const invalidQl = "This invalid QL code";
            assert.throws(() => dasmaQlParser.parse(invalidQl, dasmaQlProcessor), err => {
                assert.ok(err.expected && Array.isArray(err.expected));

                assert.ok(err.expected.some(item => item.type === "other" && item.description === "required whitespace"));

                assert.deepStrictEqual(err.location, {
                    source: undefined,
                    "start": {"offset": 7, "line": 1, "column": 8},
                    "end": {"offset": 8, "line": 1, "column": 9}
                });

                assert.strictEqual(err.message, "Expected required whitespace but \"v\" found.");

                return true;
            })
        });
    });
});
