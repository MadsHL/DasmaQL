const dasmaQlProcessor = {
    expression: (logic, order) => {
        if (order) {
            return {expression: {...logic}, order}
        }
        return {expression: {...logic}};
    },
    operator: (operator, left, right) => {
        return {operator: {type: operator, left, right}};
    },
    group: (group) => {
        return {group: group.expression};
    },
    term: (self, operator, field, value) => {
        const term = {term: {type: operator, field, value}};
        self.validateTerm(term.term);
        return term;
    },
    termArray: (self, operator, field, values) => {
        const term =  {term: {type: operator, field, values}};
        self.validateTerm(term.term);
        return term;
    },
    termPair: (self, operator, field, left, right) => {
        const term =  {term: {type: operator, field, left, right}};
        self.validateTerm(term.term);
        return term;
    },
    parameter: (self, type, value) => {
        const parameter = {type: type, value: value};
        self.validateParameter(parameter);
        return parameter;
    },
    orderBy: (self, field, order, fields) => {
        const baseOrder = order ? order : 'asc';

        const orderBy = fields ? [{field, baseOrder}, ...fields] :  [{field, baseOrder}];
        self.validateOrder(orderBy);
        return orderBy;
    },
    validateParameter: (parameter) => {},
    validateTerm: (term) => {},
    validateOrder: (order) => {}
};

module.exports = dasmaQlProcessor;