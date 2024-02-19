const dasmaQlParserTestCases = [
  {
    expression: 'field = "value"',
    expected: {
      expression: {
        term: {
          type: "equal",
          field: "field",
          value: {
            type: "string",
            value: "value",
          },
        },
      },
    },
  },
  {
    expression: '"field one" = "value"',
    expected: {
      expression: {
        term: {
          type: "equal",
          field: "field one",
          value: {
            type: "string",
            value: "value",
          },
        },
      },
    },
  },
  {
    expression: 'field=    "value"',
    expected: {
      expression: {
        term: {
          type: "equal",
          field: "field",
          value: {
            type: "string",
            value: "value",
          },
        },
      },
    },
  },
  {
    expression: 'field="value"',
    expected: {
      expression: {
        term: {
          type: "equal",
          field: "field",
          value: {
            type: "string",
            value: "value",
          },
        },
      },
    },
  },
  {
    expression: 'field!="value"',
    expected: {
      expression: {
        term: {
          type: "not_equal",
          field: "field",
          value: {
            type: "string",
            value: "value",
          },
        },
      },
    },
  },
  {
    expression: 'field<>"value"',
    expected: {
      expression: {
        term: {
          type: "not_equal",
          field: "field",
          value: {
            type: "string",
            value: "value",
          },
        },
      },
    },
  },
  {
    expression: "field>=999",
    expected: {
      expression: {
        term: {
          type: "greater_or_equal",
          field: "field",
          value: {
            type: "number",
            value: 999,
          },
        },
      },
    },
  },
  {
    expression: "field<=999",
    expected: {
      expression: {
        term: {
          type: "less_or_equal",
          field: "field",
          value: {
            type: "number",
            value: 999,
          },
        },
      },
    },
  },
  {
    expression: "field>999",
    expected: {
      expression: {
        term: {
          type: "greater",
          field: "field",
          value: {
            type: "number",
            value: 999,
          },
        },
      },
    },
  },
  {
    expression: "field<999",
    expected: {
      expression: {
        term: {
          type: "less",
          field: "field",
          value: {
            type: "number",
            value: 999,
          },
        },
      },
    },
  },
  {
    expression: 'field~="value"',
    expected: {
      expression: {
        term: {
          type: "like",
          field: "field",
          value: {
            type: "string",
            value: "value",
          },
        },
      },
    },
  },
  {
    expression: 'field~"value"',
    expected: {
      expression: {
        term: {
          type: "like",
          field: "field",
          value: {
            type: "string",
            value: "value",
          },
        },
      },
    },
  },
  {
    expression: 'field like "value"',
    expected: {
      expression: {
        term: {
          type: "like",
          field: "field",
          value: "value",
        },
      },
    },
  },
  {
    expression: 'field in ["value"]',
    expected: {
      expression: {
        term: {
          type: "in",
          field: "field",
          values: [
            {
              type: "string",
              value: "value",
            },
          ],
        },
      },
    },
  },
  {
    expression: 'field in ["value1", "value2", "value3"]',
    expected: {
      expression: {
        term: {
          type: "in",
          field: "field",
          values: [
            {
              type: "string",
              value: "value1",
            },
            {
              type: "string",
              value: "value2",
            },
            {
              type: "string",
              value: "value3",
            },
          ],
        },
      },
    },
  },
  {
    expression: 'field in ["value1,", ",value2", "va,lue3"]',
    expected: {
      expression: {
        term: {
          type: "in",
          field: "field",
          values: [
            {
              type: "string",
              value: "value1,",
            },
            {
              type: "string",
              value: ",value2",
            },
            {
              type: "string",
              value: "va,lue3",
            },
          ],
        },
      },
    },
  },
  {
    expression: 'field in [111, ", " , "value2", 333, 444, 555, 666]',
    expected: {
      expression: {
        term: {
          type: "in",
          field: "field",
          values: [
            {
              type: "number",
              value: 111,
            },
            {
              type: "string",
              value: ", ",
            },
            {
              type: "string",
              value: "value2",
            },
            {
              type: "number",
              value: 333,
            },
            {
              type: "number",
              value: 444,
            },
            {
              type: "number",
              value: 555,
            },
            {
              type: "number",
              value: 666,
            },
          ],
        },
      },
    },
  },
  {
    expression: "field between (222, 333)",
    expected: {
      expression: {
        term: {
          type: "between",
          field: "field",
          left: {
            type: "number",
            value: 222,
          },
          right: {
            type: "number",
            value: 333,
          },
        },
      },
    },
  },
  {
    expression: "field between 222 and 333",
    expected: {
      expression: {
        term: {
          type: "between",
          field: "field",
          left: {
            type: "number",
            value: 222,
          },
          right: {
            type: "number",
            value: 333,
          },
        },
      },
    },
  },
  {
    expression: "field=999",
    expected: {
      expression: {
        term: {
          type: "equal",
          field: "field",
          value: {
            type: "number",
            value: 999,
          },
        },
      },
    },
  },
  {
    expression: "field=999.666",
    expected: {
      expression: {
        term: {
          type: "equal",
          field: "field",
          value: {
            type: "number",
            value: 999.666,
          },
        },
      },
    },
  },
  {
    expression: "field=functionTest()",
    expected: {
      expression: {
        term: {
          type: "equal",
          field: "field",
          value: {
            type: "function",
            value: "functionTest",
          },
        },
      },
    },
  },
  {
    expression: 'field1 = "value1" OR field2 = "value2"',
    expected: {
      expression: {
        operator: {
          type: "or",
          left: {
            term: {
              type: "equal",
              field: "field1",
              value: {
                type: "string",
                value: "value1",
              },
            },
          },
          right: {
            term: {
              type: "equal",
              field: "field2",
              value: {
                type: "string",
                value: "value2",
              },
            },
          },
        },
      },
    },
  },
  {
    expression: 'field1 = "value1" AND field2 = "value2"',
    expected: {
      expression: {
        operator: {
          type: "and",
          left: {
            term: {
              type: "equal",
              field: "field1",
              value: {
                type: "string",
                value: "value1",
              },
            },
          },
          right: {
            term: {
              type: "equal",
              field: "field2",
              value: {
                type: "string",
                value: "value2",
              },
            },
          },
        },
      },
    },
  },
  {
    expression:
      '(field1 = "value1" OR field2 = "value2" OR field3 = "value3") AND field4 = "value4" AND field5 = "value5" AND field6 = "value6" order by field1 desc',
    expected: {
      expression: {
        operator: {
          type: "and",
          left: {
            group: {
              operator: {
                type: "or",
                left: {
                  term: {
                    type: "equal",
                    field: "field1",
                    value: {
                      type: "string",
                      value: "value1",
                    },
                  },
                },
                right: {
                  operator: {
                    type: "or",
                    left: {
                      term: {
                        type: "equal",
                        field: "field2",
                        value: {
                          type: "string",
                          value: "value2",
                        },
                      },
                    },
                    right: {
                      term: {
                        type: "equal",
                        field: "field3",
                        value: {
                          type: "string",
                          value: "value3",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          right: {
            operator: {
              type: "and",
              left: {
                term: {
                  type: "equal",
                  field: "field4",
                  value: {
                    type: "string",
                    value: "value4",
                  },
                },
              },
              right: {
                operator: {
                  type: "and",
                  left: {
                    term: {
                      type: "equal",
                      field: "field5",
                      value: {
                        type: "string",
                        value: "value5",
                      },
                    },
                  },
                  right: {
                    term: {
                      type: "equal",
                      field: "field6",
                      value: {
                        type: "string",
                        value: "value6",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      order: [
        {
          field: "field1",
          baseOrder: "desc",
        },
      ],
    },
  },
  {
    expression:
      '(field1 = "value1" OR field2 != 2024-12-24) AND (field3 in ("value3.1", "value3.2") OR field4 = 10m AND field5 between (1,9)) ORDER BY field1, field2 asc, field3 desc',
    expected: {
      expression: {
        operator: {
          type: "and",
          left: {
            group: {
              operator: {
                type: "or",
                left: {
                  term: {
                    type: "equal",
                    field: "field1",
                    value: {
                      type: "string",
                      value: "value1",
                    },
                  },
                },
                right: {
                  term: {
                    type: "not_equal",
                    field: "field2",
                    value: {
                      type: "date",
                      value: "2024-12-24",
                    },
                  },
                },
              },
            },
          },
          right: {
            group: {
              operator: {
                type: "or",
                left: {
                  term: {
                    type: "in",
                    field: "field3",
                    values: [
                      {
                        type: "string",
                        value: "value3.1",
                      },
                      {
                        type: "string",
                        value: "value3.2",
                      },
                    ],
                  },
                },
                right: {
                  operator: {
                    type: "and",
                    left: {
                      term: {
                        type: "equal",
                        field: "field4",
                        value: {
                          type: "time",
                          value: "10M",
                        },
                      },
                    },
                    right: {
                      term: {
                        type: "between",
                        field: "field5",
                        left: {
                          type: "number",
                          value: 1,
                        },
                        right: {
                          type: "number",
                          value: 9,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      order: [
        {
          field: "field1",
          baseOrder: "asc",
        },
        {
          field: "field2",
          baseOrder: "asc",
        },
        {
          field: "field3",
          baseOrder: "desc",
        },
      ],
    },
  },
  {
    expression:
      'field1 not in (1,2) and field2 not like "text" and field3 not between (1,22.2) # this is a comment so this should be ignored -> field1 = "value1" OR field2 = "value2"',
    expected: {
      expression: {
        operator: {
          type: "and",
          left: {
            term: {
              type: "not_in",
              field: "field1",
              values: [
                {
                  type: "number",
                  value: 1,
                },
                {
                  type: "number",
                  value: 2,
                },
              ],
            },
          },
          right: {
            operator: {
              type: "and",
              left: {
                term: {
                  type: "not_like",
                  field: "field2",
                  value: "text",
                },
              },
              right: {
                term: {
                  type: "not_between",
                  field: "field3",
                  left: {
                    type: "number",
                    value: 1,
                  },
                  right: {
                    type: "number",
                    value: 22.2,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
];
export { dasmaQlParserTestCases };
