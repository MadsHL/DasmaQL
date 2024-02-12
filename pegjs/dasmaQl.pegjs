{
  const trim = str => str.trim();
}

start
  = Comment
  / Expression

Expression
  = OrderBy

OrderBy
  = logic:Or _ ("ORDER"i) _ ("BY"i) _ order:OrderByFields __ Comment? { return options.expression(logic, order) }
  / logic:Or Comment? { return options.expression(logic) }

OrderByFields
  = field:TermField order:OrderByOrder?  __ "," __ fields:OrderByFields? {
      return options.orderBy(options, field, order, [...fields]);
    }
  / field:TermField order:OrderByOrder? {
      return options.orderBy(options,  field, order);
    }

OrderByOrder
  = _ order:("ASC"i / "DESC"i) { return order.toLowerCase(); }

Or
  = left:And _ ("OR"i) _ right:Or { return options.operator("or", left, right); }
  / And

And
  = left:Term _ ("AND"i) _ right:And { return options.operator("and", left, right); }
  / Term

Term
  = "(" __ group:Expression __ ")" { return options.group(group); }
  / field:TermField  __ operator:Operator __ value:TermValue { return options.term(options, operator, field, value) ; }
  / TermIn
  / TermNotIn
  / TermBetween
  / TermNotBetween
  / TermLike
  / TermNotLike

TermIn
  = field:TermField _ ("IN"i) _ "(" __ values:TermValueList __ ")" { return options.termArray(options, "in", field, values); }
  / field:TermField _ ("IN"i) _ "[" __ values:TermValueList __ "]" { return options.termArray(options, "in", field, values); }

TermNotIn
  = field:TermField _ ("NOT IN"i) _ "(" __ values:TermValueList __ ")" { return options.termArray(options, "not_in", field, values); }
  / field:TermField _ ("NOT IN"i) _ "[" __ values:TermValueList __ "]" { return options.termArray(options, "not_in", field, values); }

TermBetween
  = field:TermField _ ("BETWEEN"i) _ "(" __ from:TermValue __ "," __ to:TermValue __ ")" { return options.termPair(options, "between", field, from, to); }
  / field:TermField _ ("BETWEEN"i) _ from:TermValue _ ("AND"i) _ to:TermValue __ { return options.termPair(options, "between", field, from, to); }

TermNotBetween
  = field:TermField _ ("NOT BETWEEN"i) _ "(" __ from:TermValue __ "," __ to:TermValue __ ")" { return options.termPair(options, "not_between", field, from, to); }
  / field:TermField _ ("NOT BETWEEN"i) _ from:TermValue _ ("AND"i) _ to:TermValue __ { return options.termPair(options, "not_between", field, from, to); }

TermLike
        = field:TermField _ ("LIKE"i) _ value:String { return options.term(options, "like", field, value); }

TermNotLike
        = field:TermField _ ("NOT LIKE"i) _ value:String { return options.term(options, "not_like", field, value); }

TermValueList
  = value:TermValue __ values:(__ "," __ TermValue)* {
      const valueList = [value];
      for (const item of values) {
        valueList.push(item[3]);
      }
      return valueList;
    }

Operator
  = "=" { return "equal" }
  / "!=" { return "not_equal" }
  / "<>" { return "not_equal" }
  / ">=" { return "greater_or_equal" }
  / "<=" { return "less_or_equal" }
  / ">" { return "greater" }
  / "<" { return "less" }
  / "~=" { return "like" }
  / "~" { return "like" }

TermValue
  = value:Time { return options.parameter(options, "time", value); }
  / value:Date { return options.parameter(options, "date", value); }
  / value:Number { return options.parameter(options, "number", value); }
  / value:String { return options.parameter(options, "string", value); }
  / functionName:FunctionName "(" __ ")" { return options.parameter(options, "function", functionName); }

FunctionName
  = char:[^"()]+ { return char.join(""); }

Number
  = (Float / Integer) {
     return parseFloat(text())
  }

Float
  = Integer "." [0-9]* / Integer "."

Integer
  = "0" / [1-9] [0-9]*

TermField
  = field:[a-zA-Z0-9_]+ { return field.join(""); }
  / field:String { return field; }

Date
  = '"' date:DateFormat '"' { return date; }
  / "'" date:DateFormat "'" { return date; }
  / date:DateFormat { return date; }

DateFormat
  = day:Day "/" month:Month "/" year:Year { return year + "-" + month + "-" + day }
  / day:Day "-" month:Month "-" year:Year { return year + "-" + month + "-" + day }
  / year:Year "/" month:Month "/" day:Day { return year + "-" + month + "-" + day }
  / year:Year "-" month:Month "-" day:Day { return year + "-" + month + "-" + day }

Day
  = day:("0" [1-9] / [1-2][0-9] / "3" [0-1]) { return day.join("") }

Month
  = month:("0" [1-9] / "1" [0-2]) { return month.join("") }

Year
  = year:([0-9][0-9][0-9][0-9]) { return year.join("") }

Time
  = Integer ("m"i / "h"i / "d"i / "y"i) { return text().toUpperCase() }


String
  = '"' string:DoubleQuotedChars '"'? { return string }
  / "'" string:SingleQuotedChars "'"? { return string }

DoubleQuotedChars
  = char:[^"\r\n]+ { return char.join(""); }

SingleQuotedChars
  = char:[^'\r\n]+ { return char.join(""); }

__ "optional whitespace"
  = ([ \t\r\n]*)

_ "required whitespace"
  = ([ \t\r\n]+)

Comment
  = __ ("#" / "--") [^\r\n]* { }

