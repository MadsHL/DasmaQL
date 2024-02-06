start
  = (Comment / String / Number / Clauses / Order / Function / Field / Operator / Misc)+

Comment
  = ("#" / "--") [^\r\n]* { return options.highlight("comment", text()); }

String
  = '"' Chars '"' { return options.highlight("string", text()); }

Field
  = [a-zA-Z0-9_]+ { return options.highlight("field", text()); }

Function
  = [a-zA-Z0-9_]+ "(" __ ")" { return options.highlight("function", text()); }

Misc
  = ([ (),]+ / Chars) { return options.highlight("misc", text()); }

Operator
  = ("=" / "!=" / "<>" / ">=" / "<=" / ">" / "<" / "~=" / "~") {
          return options.highlight("operator", text());
  }

Clauses
  = ("ORDER"i / "AND"i / "OR"i / "BETWEEN"i / "IN"i / "LIKE"i / "NOT"i / "BY"i) (!([a-zA-Z]+ / [0-9]+)) {
     return options.highlight("clauses", text());
  }
Order
  = ("ASC"i / "DESC"i) (!([a-zA-Z]+ / [0-9]+)) {
     return options.highlight("order", text());
  }

Number
  = (Float / Integer) {
     return options.highlight("number", text())
  }

Float
  = Integer "." [0-9]* / Integer "."

Integer
  = "0" / [1-9] [0-9]*

Chars
    = char:[^"\r\n]+ { return char.join(""); }

__ "optional whitespace"
  = [ \t\r\n]*

_ "required whitespace"
  = [ \t\r\n]+