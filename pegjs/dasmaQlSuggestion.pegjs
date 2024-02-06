{{
    function flattenExpressions(expressions) {
        let flatList = [];
        for (const expr of expressions) {
            if (Array.isArray(expr)) {
                flatList.push(...flattenExpressions(expr)); // Rekursivt flade dybere arrays ud
            } else if (expr && typeof expr === 'object') {
                flatList.push(expr); // Tilføj ikke-null udtryk direkte til listen
            }
        }
        return flatList.filter(e => e !== null && e !== undefined); // Fjern null/undefined værdier
    }
}}

start
  = expressions:(__ (Comment / Logic / FallBack) )* {
    return flattenExpressions(expressions);
  }

Logic
  = LogicExpression _? Logic?

LogicExpression
  = Term ((_ (Or / And) _ / _ OrOrder / _ OrderBy _? OrderByTerms?/_ (Or / And)?))?

FieldExpression
  = Term / __ Field _? (Operator / ComplexOperator)?

OrderBy
  = input:("O"i "R"i? "D"i? "E"i? "R"i? _? "B"i? "Y"i?) { return options.suggest(location(), input, ["ORDER BY"]); }

OrderByTerms
  = Field __ Order? ","? __ OrderByTerms?

Order
  = input:("D"i "E"i? "S"i? "C"i?) { return options.suggest(location(), input, ["DESC"]); }
  / input:("A"i "S"i? "C"i?) { return options.suggest(location(), input, ["ASC"]); }
  / input:(_) { return options.suggest(location(), input, [" ASC", " DESC"]); }

OrOrder
  = input:("O"i "R"i?) !_ !Chars { return options.suggest(location(), input, ["OR", "ORDER BY"]); }

And
  = input:("A"i "N"i? "D"i?) { return options.suggest(location(), input, ["AND"]); }

Or
  = input:("O"i "R"i?) { return options.suggest(location(), input, ["OR"]); }


Between
  = input:("B"i "E"i? "T"i? "W"i? "E"i? "E"i? "N"i?) { return options.suggest(location(), input, ["BETWEEN"]); }

Like
  = input:("L"i "I"i? "K"i? "E"i?) { return options.suggest(location(), input, ["LIKE"]); }

In
  = input:("I"i "N"i?) { return options.suggest(location(), input, ["IN"]); }

Not
  = input:("N"i "O"i? "T"i?) { return options.suggest(location(), input, ["NOT", "NOT LIKE", "NOT BETWEEN"]); }

NotLike
  = input:("NOT"i _ "L"i "I"i? "K"i? "E"i?) { return options.suggest(location(), input, ["NOT LIKE"]); }

NotBetween
  = input:("NOT"i _ "B"i "E"i? "T"i? "W"i? "E"i? "E"i? "N"i?) { return options.suggest(location(), input, ["NOT BETWEEN"]); }

NotIn
  = input:("NOT"i _ "I"i "N"i?) { return options.suggest(location(), input, ["NOT In"]); }

ComplexOperator
  = Between
  / Like
  / In
  / NotBetween
  / NotLike
  / NotIn

Operator
  = input:("!" "="? / (">" "="?) / "<" ("="?/">"?) / "~" "="? / "=") {
    return options.suggest(location(), input, ["=", "!=", "<>", ">=", "<=", ">", "<", "~"]);
  }

Field
  = input:([a-zA-Z0-9_]+) { return options.suggestField(options, location(), input); }
  / input:('"' Chars '"'?) { return options.suggestField(options, location(), input); }

Parameter
  = input:(__ (([a-zA-Z0-9_]+) / ('"' Chars '"'?))) { return options.parameter(location(), input); }

Parameters
  = parameter:Parameter __ (_ "AND" _ / __ "," __) __ rest:Parameters? {
    return [parameter].concat(rest);
  }
  / parameter:Parameter __ {
    return [parameter];
  }


Term
  = field:Field __ Operator __ parameter:Parameter? {
      return options.suggestParameter(options, location(), field, parameter)
  }
  / field:Field _ ComplexOperator _ [(\[]* __ parameters:Parameters? [)\]]* {
      return parameters.map(parameter => options.suggestParameter(options, location(), field, parameter));
  }
  / field:Field _ (ComplexOperator)
  / field:Field __ (Operator)?


Chars
  = char:[^"\r\n]+ { return char; }

FallBack
  = . { return null }

Comment
  = ("#" / "--") [^\r\n]* { return null }

__ "optional whitespace"
  = [ \t\r\n]*

_ "required whitespace"
  = [ \t\r\n]+